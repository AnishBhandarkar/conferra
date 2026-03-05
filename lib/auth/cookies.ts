import { NextResponse } from "next/server";
import { ACCESS_TOKEN_COOKIE, ACCESS_TOKEN_MAX_AGE, REFRESH_TOKEN_COOKIE, REFRESH_TOKEN_MAX_AGE } from "./constants";

export const setAuthCookies = (response: NextResponse, accessToken: string, refreshToken: string): void => {
    response.cookies.set(ACCESS_TOKEN_COOKIE, accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: ACCESS_TOKEN_MAX_AGE
    });

    response.cookies.set(REFRESH_TOKEN_COOKIE, refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: REFRESH_TOKEN_MAX_AGE
    });
}

export const clearAuthCookies = (response: NextResponse): void => {
    response.cookies.delete(ACCESS_TOKEN_COOKIE);
    response.cookies.delete(REFRESH_TOKEN_COOKIE);
};