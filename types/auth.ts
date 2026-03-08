export interface TokenUser {
    _id: string;
    email: string;
    name: string
}

export interface AccessTokenPayload {
    userId: string;
    email: string;
    name: string
}