import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { RefreshToken } from "@/models/RefreshToken";
import { REFRESH_TOKEN_COOKIE } from "@/lib/auth/constants";
import { hashToken } from "@/lib/auth/tokens";
import { clearAuthCookies } from "@/lib/auth/cookies";

export async function POST(): Promise<NextResponse> {
    try {
        const cookieStore = await cookies();
        const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE)?.value;

        if (refreshToken) {
            const hashedToken = hashToken(refreshToken);

            await RefreshToken.deleteOne({
                tokenHash: hashedToken
            });
        }

        const response = NextResponse.json(
            { message: "Logout successful" },
            { status: 200 }
        );

        clearAuthCookies(response);

        return response;

    } catch (error) {
        console.error("Logout Error:", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}