import { REFRESH_TOKEN_EXPIRY_MS } from "@/lib/auth/constants";
import { setAuthCookies } from "@/lib/auth/cookies";
import { comparePassword } from "@/lib/auth/password";
import { generateAccessToken, generateRefreshToken, hashToken } from "@/lib/auth/tokens";
import { connectDB } from "@/lib/db";
import { RefreshToken } from "@/models/RefreshToken";
import { User } from "@/models/User";
import { NextResponse } from "next/server";
import { logger } from "@/lib/logger";

export async function POST(request: Request): Promise<NextResponse> {
    // Start with request context for correlation
    const requestId = crypto.randomUUID();
    const childLogger = logger.child({ requestId, endpoint: 'login' });

    try {
        childLogger.info('Login attempt started');

        await connectDB();
        childLogger.debug('Database connected');

        const { email, password } = await request.json();
        // Log sanitized request info (never log passwords!)
        childLogger.info({ email }, 'Login credentials received');

        if (!email || !password) {
            childLogger.warn({ email: email ? 'provided' : 'missing' }, 'Missing credentials');
            return NextResponse.json(
                { message: "Email and password required" },
                { status: 400 }
            );
        }

        const user = await User.findOne({ email });

        if (!user) {
            childLogger.warn({ email }, 'Login failed - user not found');
            return NextResponse.json(
                { message: "Invalid credentials" },
                { status: 401 }
            );
        }

        childLogger.info({ userId: user._id }, 'User found, verifying password');

        const passwordMatch = await comparePassword(password, user.password);

        if (!passwordMatch) {
            childLogger.warn({ userId: user._id, email }, 'Login failed - invalid password');
            return NextResponse.json(
                { message: "Invalid credentials" },
                { status: 401 }
            );
        }

        childLogger.info({ userId: user._id }, 'Password verified, generating tokens');

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken();
        const hashedRefreshToken = hashToken(refreshToken);

        await new RefreshToken({
            tokenHash: hashedRefreshToken,
            user: user._id,
            expiresAt: new Date(Date.now() + REFRESH_TOKEN_EXPIRY_MS) // 7 days
        }).save();

        childLogger.info({ userId: user._id }, 'Refresh token saved');

        const response = NextResponse.json(
            {
                message: "Login successful",
                user: {
                    userId: user._id,
                    email: user.email,
                    name: user.name,
                    role: user.role
                }
            },
            { status: 200 }
        );

        setAuthCookies(response, accessToken, refreshToken);

        childLogger.info({
            userId: user._id,
            email: user.email
        }, 'Login successful - cookies set');

        return response;
    } catch (error) {
        childLogger.error(
            {
                err: error,
                errorMessage: error instanceof Error ? error.message : 'Unknown error',
                errorStack: error instanceof Error ? error.stack : undefined
            },
            'Login error occurred'
        );
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}