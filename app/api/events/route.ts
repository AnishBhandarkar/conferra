/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDB } from "@/lib/db";
import { Event } from "@/models/Event";
import { createEventSchema } from "@/lib/validation/eventSchema";
import { sanitizeInput } from "@/lib/security/sanitize";
import { verifyAccessToken } from "@/lib/auth/tokens";
import { cookies } from "next/headers";
import { uploadImage } from "@/lib/uploads/uploadImage";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export async function POST(request: Request) {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
        return Response.json(
            { message: "Unauthorized" },
            { status: 401 }
        );
    }

    const user = verifyAccessToken(token);

    const formData = await request.formData();

    // Handle image
    const file = formData.get("image") as File;
    if (!file) {
        return Response.json(
            { message: "Image is required" },
            { status: 400 }
        );
    }

    if (!file.type.startsWith("image/")) {
        return Response.json(
            { message: "Only image files are allowed" },
            { status: 400 }
        );
    }

    if (file.size > MAX_FILE_SIZE) {
        return Response.json(
            { message: "Image must be smaller than 5MB" },
            { status: 400 }
        );
    }

    const imageUrl = await uploadImage(file);

    // Validate and sanitize rest of form data
    const rawData = Object.fromEntries(formData.entries());

    const parsed = createEventSchema.safeParse({
        ...rawData,
        tags: formData.getAll("tags"),
        agenda: formData.getAll("agenda")
    });

    if (!parsed.success) {
        const issue = parsed.error.issues[0];

        return Response.json(
            {
                message: issue.message,
                field: issue.path[0]
            },
            { status: 400 }
        );
    }

    const cleanData = sanitizeInput(parsed.data);

    const event = await Event.create({
        ...cleanData,
        coverImage: imageUrl,
        organizer: user.userId,
        attendeesCount: 0
    });

    return Response.json({
        eventId: event._id
    });
}