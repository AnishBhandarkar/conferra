import RegisterButton from "@/app/components/events/RegisterButton";
import { connectDB } from "@/lib/db";
import { Event } from "@/models/Event";
import Image from "next/image";
import { notFound } from "next/navigation";

interface Props {
    params: Promise<{ eventId: string }>;
}

export default async function EventDetailPage({ params }: Props) {

    const { eventId } = await params;

    await connectDB();

    const event = await Event.findById(eventId).lean();

    if (!event) {
        notFound();
    }

    const date = new Date(event.startDate);

    return (
        <div className="max-w-5xl mx-auto px-4 py-10 space-y-10">

            {/* Cover Image */}
            <div className="relative h-80 w-full rounded-xl overflow-hidden">
                <Image
                    src={event.coverImage}
                    alt={event.title}
                    fill
                    className="object-cover"
                />
            </div>

            {/* Title + Register */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                <div className="space-y-2">

                    <h1 className="text-3xl font-bold tracking-tight">
                        {event.title}
                    </h1>

                    <div className="text-sm text-foreground/70 space-y-1">

                        <p>📍 {event.venue}, {event.location}</p>

                        <p>📅 {date.toLocaleDateString()}</p>

                        <p>⏰ {date.toLocaleTimeString()}</p>

                        <p>🌐 {event.mode}</p>

                    </div>

                </div>

                <RegisterButton />

            </div>

            {/* Event Meta */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border border-foreground/10 rounded-lg p-4">

                <div>
                    <p className="text-sm text-foreground/60">Capacity</p>
                    <p className="font-medium">{event.capacity}</p>
                </div>

                <div>
                    <p className="text-sm text-foreground/60">Registered</p>
                    <p className="font-medium">{event.attendeesCount}</p>
                </div>

                <div>
                    <p className="text-sm text-foreground/60">Price</p>
                    <p className="font-medium">
                        {event.paid ? `₹${event.price}` : "Free"}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-foreground/60">Mode</p>
                    <p className="font-medium">{event.mode}</p>
                </div>

            </div>

            {/* Description */}
            <section className="space-y-3">

                <h2 className="text-xl font-semibold">
                    About the Event
                </h2>

                <p className="text-foreground/80 leading-relaxed">
                    {event.description}
                </p>

            </section>

            {/* Agenda */}
            <section className="space-y-3">

                <h2 className="text-xl font-semibold">
                    Agenda
                </h2>

                <ul className="list-disc pl-5 space-y-1 text-foreground/80">
                    {event.agenda.map((item: string, index: number) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>

            </section>

            {/* Tags */}
            <section className="space-y-3">

                <h2 className="text-xl font-semibold">
                    Tags
                </h2>

                <div className="flex flex-wrap gap-2">

                    {event.tags.map((tag: string) => (
                        <span
                            key={tag}
                            className="px-3 py-1 border border-foreground/10 rounded-full text-sm"
                        >
                            #{tag}
                        </span>
                    ))}

                </div>

            </section>

            {/* Organizer Placeholder */}
            <section className="space-y-3">

                <h2 className="text-xl font-semibold">
                    Organizer
                </h2>

                <div className="border border-foreground/10 rounded-lg p-4">

                    <p className="font-medium">
                        Tech Community
                    </p>

                    <p className="text-sm text-foreground/70">
                        Organizer information will appear here.
                    </p>

                </div>

            </section>

        </div>
    );
}