import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { RefreshToken } from "@/models/RefreshToken";
import { REFRESH_TOKEN_COOKIE } from "@/lib/auth/constants";
import { hashToken } from "@/lib/auth/tokens";
import { clearAuthCookies } from "@/lib/auth/cookies";
import { connectDB } from "@/lib/db";
import { logger } from "@/lib/logger";

export async function POST(): Promise<NextResponse> {
    const requestLogger = logger.child({
        requestId: crypto.randomUUID(),
        endpoint: 'logout'
    });

    try {
        requestLogger.info('Logout attempt started');

        await connectDB();

        requestLogger.debug('Database connected');

        const cookieStore = await cookies();
        const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE)?.value;

        if (refreshToken) {
            requestLogger.info('Refresh token found in cookies');
            const hashedToken = hashToken(refreshToken);

            const result = await RefreshToken.deleteOne({
                tokenHash: hashedToken
            });

            // Log whether token was actually deleted
            if (result.deletedCount > 0) {
                requestLogger.info({ deletedCount: result.deletedCount }, 'Refresh token deleted from database');
            } else {
                requestLogger.warn('Refresh token not found in database - possible tampering or already expired');
            }
        } else {
            requestLogger.warn('No refresh token found in cookies - user may be already logged out');
        }

        const response = NextResponse.json(
            { message: "Logout successful" },
            { status: 200 }
        );

        clearAuthCookies(response);

        requestLogger.info('Auth cookies cleared, logout successful');

        return response;

    } catch (error) {
        requestLogger.error(
            {
                err: error,
                errorMessage: error instanceof Error ? error.message : 'Unknown error',
                errorStack: error instanceof Error ? error.stack : undefined,
                errorType: error instanceof Error ? error.constructor.name : typeof error
            },
            'Logout error occurred'
        );
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}