import { connectDB } from "@/lib/db";
import { Event } from "@/models/Event";
import EventCard from "../components/events/EventCard";
import Pagination from "../components/events/Pagination";

const PAGE_SIZE = 3;

interface Props {
    searchParams: Promise<{ page?: string }>;
}

export default async function EventsPage({ searchParams }: Props) {

    const params = await searchParams;

    const page = Number(params.page) || 1;

    await connectDB();

    const events = await Event.find({})
        .sort({ startDate: 1 })
        .skip((page - 1) * PAGE_SIZE)
        .limit(PAGE_SIZE)
        .lean();

    const totalEvents = await Event.countDocuments();

    const totalPages = Math.ceil(totalEvents / PAGE_SIZE);

    return (
        <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">

            <header className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">
                    Browse Events
                </h1>

                <p className="text-sm text-foreground/70">
                    Discover upcoming tech events and meetups.
                </p>
            </header>

            <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                {events.map((event) => (
                    <EventCard key={event._id.toString()} event={event} />
                ))}

            </section>

            <Pagination page={page} totalPages={totalPages} />

        </div>
    );
}