import { Document, Types } from "mongoose";

export interface IEvent extends Document {
    title: string;
    description: string;
    coverImage: string;
    venue: string;
    location?: string;
    startDate: Date;
    endDate?: Date;
    mode: "ONLINE" | "OFFLINE";
    capacity: number;
    attendeesCount: number;
    organizer: Types.ObjectId;
    tags: string[];
    agenda: string[];
    createdAt: Date;
    updatedAt: Date;
    cloudinaryPublicId: string
};