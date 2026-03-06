import { Schema, model, models } from "mongoose";
import { IEvent } from "@/types/event";

const eventSchema = new Schema<IEvent>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: [100, 'Title cannot exceed 100 characters']
        },

        description: {
            type: String,
            required: true,
            trim: true,
            maxlength: [1000, 'Description cannot exceed 1000 characters']
        },

        coverImage: {
            type: String,
            required: [true, 'Image URL is required']
        },

        venue: {
            type: String,
            trim: true,
        },

        location: {
            type: String,
            trim: true,
            required: [true, 'Location is required'],
            index: true,
        },

        startDate: {
            type: Date,
            required: true
        },

        endDate: {
            type: Date,
            required: true
        },

        mode: {
            type: String,
            enum: ["ONLINE", "OFFLINE"],
            required: true,
        },

        capacity: {
            type: Number,
            min: 1,
        },

        attendeesCount: {
            type: Number,
            default: 0,
        },

        organizer: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        tags: {
            type: [String],
            default: [],
            index: true,
        },

        agenda: {
            type: [String],
            default: [],
        },

        paid: {
            type: Boolean,
            default: false,
        },

        price: {
            type: Number,
            min: 0,
        }
    },
    {
        timestamps: true,
    }
);

export const Event = models.Event || model<IEvent>("Event", eventSchema);