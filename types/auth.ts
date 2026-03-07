export interface TokenUser {
    _id: string;
    email: string;
    role: string;
}

export interface AccessTokenPayload {
    userId: string;
    email: string;
    role: "USER" | "ADMIN";
}