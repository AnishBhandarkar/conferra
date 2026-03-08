import { connectDB } from "@/lib/db";
import { Event } from "@/models/Event";
import { Registration } from "@/models/Registration";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { logger } from "@/lib/logger";

export async function POST(request: Request, context: { params: Promise<{ eventId: string }> }) {
    const requestId = crypto.randomUUID();

    try {
        await connectDB();

        const { eventId } = await context.params;

        const user = await getCurrentUser();

        if (!user) {
            logger.warn({ requestId }, 'Unauthorized registration attempt');
            return Response.json({ message: "Invalid user" }, { status: 404 });
        }

        logger.info({ requestId, userId: user.userId, eventId }, 'Event registration attempt');

        const event = await Event.findById(eventId);

        if (!event) {
            logger.warn({ requestId, userId: user.userId, eventId }, 'Event not found');
            return Response.json({ message: "Event not found" }, { status: 404 });
        }

        if (event.attendeesCount >= event.capacity) {
            logger.warn({
                requestId,
                userId: user.userId,
                eventId,
                capacity: event.capacity,
                attendees: event.attendeesCount
            }, 'Event full');
            return Response.json({ message: "Event full" }, { status: 400 });
        }

        // duplicate prevention
        const existing = await Registration.findOne({
            user: user.userId,
            event: eventId
        });

        if (existing) {
            logger.warn({ requestId, userId: user.userId, eventId }, 'Duplicate registration');
            return Response.json({ message: "Already registered" }, { status: 409 });
        }

        await Registration.create({
            user: user.userId,
            event: eventId
        });

        event.attendeesCount += 1;
        await event.save();

        logger.info({ requestId, userId: user.userId, eventId }, 'Registration successful');

        return Response.json({ success: "Registration succesful" }, { status: 201 });
    } catch (error) {
        logger.error({
            requestId,
            eventId: (await context.params).eventId,
            err: error instanceof Error ? error.message : 'Unknown error'
        }, 'Event registration failed');

        return Response.json({ success: "Event registration failed" }, { status: 500 });
    }
}