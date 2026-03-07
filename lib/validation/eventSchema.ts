import { z } from "zod";

export const createEventSchema = z
    .object({

        title: z
            .string()
            .min(3, "Title must be at least 3 characters")
            .max(100, "Title cannot exceed 100 characters"),

        description: z
            .string()
            .min(10, "Description must be at least 10 characters")
            .max(1000, "Description cannot exceed 1000 characters"),

        venue: z
            .string()
            .min(2, "Venue must be at least 2 characters")
            .optional(),

        location: z
            .string()
            .min(2, "Location is required"),

        startDate: z.coerce.date(),

        endDate: z.coerce.date().optional(),

        mode: z.enum(["ONLINE", "OFFLINE"]),

        capacity: z.coerce
            .number()
            .int()
            .min(1, "Capacity must be at least 1"),

        tags: z.array(z.string()).default([]),

        agenda: z.array(z.string()).default([])

    })

    .refine(
        (data) => {
            if (!data.endDate) return true;
            return data.endDate > data.startDate;
        },
        {
            message: "End date must be after start date",
            path: ["endDate"]
        }
    );