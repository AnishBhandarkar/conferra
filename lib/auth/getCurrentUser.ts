import { cookies } from "next/headers";
import { verifyAccessToken } from "./tokens";
import { AccessTokenPayload } from "@/types/auth";

export async function getCurrentUser(): Promise<AccessTokenPayload | null> {

    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) return null;

    try {
        const user = verifyAccessToken(token);
        return user;
    } catch {
        return null;
    }
}