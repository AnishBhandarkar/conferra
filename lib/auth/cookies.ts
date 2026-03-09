import { NextResponse } from "next/server";
import { ACCESS_TOKEN_COOKIE, ACCESS_TOKEN_MAX_AGE, CSRF_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE, REFRESH_TOKEN_MAX_AGE } from "./constants";

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

export const setCSRFTkenCookies = (response: NextResponse, csrfToken: string): void => {
    response.cookies.set(CSRF_TOKEN_COOKIE, csrfToken, {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
    });
}

export const clearAuthCookies = (response: NextResponse): void => {
    response.cookies.delete(ACCESS_TOKEN_COOKIE);
    response.cookies.delete(REFRESH_TOKEN_COOKIE);
    response.cookies.delete(CSRF_TOKEN_COOKIE);
};

export const getCSRFCookieInClient = (cookie: string): string | undefined => {
    return cookie
        .split("; ")
        .find(row => row.startsWith("csrfToken="))
        ?.split("=")[1];
}