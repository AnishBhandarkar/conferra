import { connectDB } from "@/lib/db";
import { Event } from "@/models/Event";
import { Registration } from "@/models/Registration";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";

export async function POST(request: Request, context: { params: Promise<{ eventId: string }> }) {
    try {
        await connectDB();

        const { eventId } = await context.params;

        const user = await getCurrentUser();

        if (!user) {
            return Response.json({ message: "Invalid user" }, { status: 404 });
        }

        const event = await Event.findById(eventId);

        if (!event) {
            return Response.json({ message: "Event not found" }, { status: 404 });
        }

        if (event.attendeesCount >= event.capacity) {
            return Response.json({ message: "Event full" }, { status: 400 });
        }

        // duplicate prevention
        const existing = await Registration.findOne({
            user: user.userId,
            event: eventId
        });

        if (existing) {
            return Response.json({ message: "Already registered" }, { status: 409 });
        }

        await Registration.create({
            user: user.userId,
            event: eventId
        });

        event.attendeesCount += 1;
        await event.save();

        return Response.json({ success: "Registration succesful" }, { status: 201 });
    } catch (error) {
        console.error(`Error during registration: ${error}`);
        return Response.json({ success: "Registration failed" }, { status: 500 });
    }
}