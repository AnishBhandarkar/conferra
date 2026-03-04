import { Schema, models, model } from "mongoose";

/**
 * User Roles: USER and ADMIN
 */
export enum UserRole {
    USER = "USER",
    ADMIN = "ADMIN",
}

/**
 * User Schema Definition
 */
const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true, // ensures no duplicate users
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true,
        },

        role: {
            type: String,
            enum: Object.values(UserRole),
            default: UserRole.USER,
        },
    },
    {
        timestamps: true,
    }
);

/**
 * Prevent model overwrite in dev (Next hot reload issue)
 */
export const User = models.User || model("User", UserSchema);