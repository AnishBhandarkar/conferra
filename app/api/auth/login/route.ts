import { REFRESH_TOKEN_EXPIRY_MS } from "@/lib/auth/constants";
import { setAuthCookies } from "@/lib/auth/cookies";
import { comparePassword } from "@/lib/auth/password";
import { generateAccessToken, generateRefreshToken, hashToken } from "@/lib/auth/tokens";
import { RefreshToken } from "@/models/RefreshToken";
import { User } from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { message: "Email and password required" },
                { status: 400 }
            );
        }

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json(
                { message: "Invalid credentials" },
                { status: 401 }
            );
        }

        const passwordMatch = await comparePassword(password, user.password);

        if (!passwordMatch) {
            return NextResponse.json(
                { message: "Invalid credentials" },
                { status: 401 }
            );
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken();
        const hashedRefreshToken = hashToken(refreshToken);

        await new RefreshToken({
            tokenHash: hashedRefreshToken,
            user: user._id,
            expiresAt: new Date(Date.now() + REFRESH_TOKEN_EXPIRY_MS) // 7 days
        }).save();


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
        return response;
    } catch (error) {
        console.error("Login Error: ", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}