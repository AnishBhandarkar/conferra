import { REFRESH_TOKEN_COOKIE, REFRESH_TOKEN_EXPIRY_MS } from "@/lib/auth/constants";
import { setAuthCookies } from "@/lib/auth/cookies";
import { generateAccessToken, generateRefreshToken, hashToken } from "@/lib/auth/tokens";
import { RefreshToken } from "@/models/RefreshToken";
import { User } from "@/models/User";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(): Promise<NextResponse> {
    try {
        const cookieStore = await cookies();
        const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE)?.value;

        if (!refreshToken) {
            return NextResponse.json(
                { message: "Refresh token missing" },
                { status: 401 }
            );
        }

        const hashedToken = hashToken(refreshToken);

        const tokenDoc = await RefreshToken.findOne({
            tokenHash: hashedToken
        });

        if (!tokenDoc) {
            return NextResponse.json(
                { message: "Invalid refresh token" },
                { status: 401 }
            );
        }

        // check expiration
        if (tokenDoc.expiresAt < new Date()) {
            await RefreshToken.deleteOne({ _id: tokenDoc._id });

            return NextResponse.json(
                { message: "Refresh token expired" },
                { status: 401 }
            );
        }

        const user = await User.findById(tokenDoc.user);

        if (!user) {
            await RefreshToken.deleteOne({ _id: tokenDoc._id });

            return NextResponse.json(
                { message: "User not found" },
                { status: 401 }
            );
        }

        // Rotation step
        await RefreshToken.deleteOne({ _id: tokenDoc._id });

        const accessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken();
        const hashedRefreshToken = hashToken(newRefreshToken);

        await new RefreshToken({
            tokenHash: hashedRefreshToken,
            user: user._id,
            expiresAt: new Date(Date.now() + REFRESH_TOKEN_EXPIRY_MS) // 7 days
        }).save();


        const response = NextResponse.json(
            {
                message: "Token refreshed",
                user: {
                    userId: user._id,
                    email: user.email,
                    name: user.name,
                    role: user.role
                }
            },
            { status: 200 }
        );

        setAuthCookies(response, accessToken, newRefreshToken);
        return response;
    } catch (error) {
        console.error("Refresh Error: ", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}