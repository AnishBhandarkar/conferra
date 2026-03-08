import { Schema, model, Types, models } from "mongoose";

const registrationSchema = new Schema(
    {
        user: {
            type: Types.ObjectId,
            ref: "User",
            required: true
        },
        event: {
            type: Types.ObjectId,
            ref: "Event",
            required: true
        }
    }, { timestamps: true }
);

// prevent duplicate registration
registrationSchema.index(
    { user: 1, event: 1 },
    { unique: true }
);

export const Registration = models.Registration || model("Registration", registrationSchema);