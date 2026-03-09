import crypto from "crypto";
import { cookies } from "next/headers";

export function generateCSRFToken() {
    return crypto.randomBytes(32).toString("hex");
}

export function verifyCSRFToken(cookieToken: string, headerToken: string) {
    return cookieToken === headerToken;
}

export async function validateCSRF(request: Request): Promise<boolean> {
    const cookieStore = await cookies();
    const csrfCookie = cookieStore.get("csrfToken")?.value;
    const csrfHeader = request.headers.get("x-csrf-token");

    if (!csrfCookie || !csrfHeader) {
        return false;
    }

    return verifyCSRFToken(csrfCookie, csrfHeader);
}