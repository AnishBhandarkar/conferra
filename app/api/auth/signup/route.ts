import { User } from "@/models/User";
import { NextResponse } from "next/server";
import { hashPassword } from "@/lib/auth/password";
import { generateAccessToken, generateRefreshToken, hashToken } from "@/lib/auth/tokens";
import { RefreshToken } from "@/models/RefreshToken";
import { REFRESH_TOKEN_EXPIRY_MS } from "@/lib/auth/constants";
import { setAuthCookies } from "@/lib/auth/cookies";
import { connectDB } from "@/lib/db";

export async function POST(request: Request): Promise<NextResponse> {
    try {
        await connectDB();
        
        const { email, password, ...rest } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { message: "Email and password required" },
                { status: 400 }
            );
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { message: 'Email already registered' },
                { status: 409 }
            );
        }

        const hashedPassword = await hashPassword(password);

        const user = new User({
            ...rest,
            email,
            password: hashedPassword
        });
        await user.save();

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
                message: "Signup successful",
                user: {
                    userId: user._id,
                    email: user.email,
                    name: user.name,
                    role: user.role
                }
            },
            { status: 201 }
        );

        setAuthCookies(response, accessToken, refreshToken);
        return response;
    } catch (error) {
        console.error("Signup Error: ", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}