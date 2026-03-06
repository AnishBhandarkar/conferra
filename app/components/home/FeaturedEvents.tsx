import { connectDB } from "@/lib/db";
import EventCard from "../events/EventCard";
import { Event } from "@/models/Event";

export default async function FeaturedEvents() {
    await connectDB();

    const events = await Event.find({})
        .sort({ createdAt: -1 })
        .limit(6)
        .lean();

    return (
        <section className="mt-16">

            <h2 className="text-2xl font-bold mb-6">
                Featured Events
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                {events.map((event) => (
                    <EventCard key={event._id} event={event} />
                ))}

            </div>

        </section>
    );
}