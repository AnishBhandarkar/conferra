import { Schema, models, model } from "mongoose";

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
        }
    },
    {
        timestamps: true,
    }
);

/**
 * Prevent model overwrite in dev (Next hot reload issue)
 */
export const User = models.User || model("User", UserSchema);