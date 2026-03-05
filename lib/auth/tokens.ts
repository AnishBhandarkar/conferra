import { TokenUser } from "@/types/auth";
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_EXPIRES_IN, REFRESH_TOKEN_BYTES } from "./constants";
import crypto from "crypto";

export const generateAccessToken = (user: TokenUser): string => {
    return jwt.sign(
        {
            userId: user._id,
            email: user.email,
            role: user.role
        },
        process.env.JWT_ACCESS_SECRET!,
        {
            expiresIn: ACCESS_TOKEN_EXPIRES_IN
        });
};

export const generateRefreshToken = (): string => {
    return crypto.randomBytes(REFRESH_TOKEN_BYTES).toString('hex');
};

export const hashToken = (token: string): string => {
    return crypto.createHash('sha256').update(token).digest('hex');
};