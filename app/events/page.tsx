/* eslint-disable @typescript-eslint/no-explicit-any */
import {connectDB} from "@/lib/db";
import { Event } from "@/models/Event";
import EventCard from "../components/events/EventCard";
import EventsFilters from "../components/events/EventsFilters";
import Pagination from "../components/events/Pagination";

const PAGE_SIZE = 3;

interface Props {
    searchParams: Promise<{
        page?: string;
        search?: string;
        mode?: string;
    }>;
}

export default async function EventsPage({ searchParams }: Props) {

    const params = await searchParams;

    const page = Number(params.page) || 1;
    const search = params.search || "";
    const mode = params.mode || "";

    await connectDB();

    const query: any = {};

    if (mode) {
        query.mode = mode;
    }

    if (search) {
        query.$or = [
            { title: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
            { tags: { $regex: search, $options: "i" } }
        ];
    }

    const events = await Event.find(query)
        .sort({ startDate: 1 })
        .skip((page - 1) * PAGE_SIZE)
        .limit(PAGE_SIZE)
        .lean();

    const totalEvents = await Event.countDocuments(query);

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

            <EventsFilters />

            <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                {events.map((event) => (
                    <EventCard key={event._id.toString()} event={event} />
                ))}

            </section>

            <Pagination page={page} totalPages={totalPages} />

        </div>
    );
}