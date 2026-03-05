import { Schema, model, models } from "mongoose";

const refreshTokenSchema = new Schema(
    {
        tokenHash: {
            type: String,
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        expiresAt: {
            type: Date,
            required: true,
        }
    },
    { timestamps: true }
);

// TTL index for automatic cleanup
refreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const RefreshToken = models.RefreshToken || model("RefreshToken", refreshTokenSchema);
