import Link from "next/link";
import { IEvent } from "@/types/event";
import Image from "next/image";

interface Props {
    event: IEvent;
}

export default function EventCard({ event }: Props) {

    const date = new Date(event.startDate);

    const formattedDate = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric"
    });

    const formattedTime = date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit"
    });

    return (
        <Link
            href={`/events/${event._id}`}
            className="block border border-foreground/10 rounded-lg overflow-hidden hover:shadow-md transition"
        >

            <div className="relative h-48 w-full overflow-hidden">
                <Image
                    src={event.coverImage}
                    alt={event.title}
                    fill
                    className="object-cover"
                />
            </div>

            <div className="p-4 space-y-2">

                <h3 className="font-semibold text-lg line-clamp-2">
                    {event.title}
                </h3>

                <div className="text-sm text-foreground/70 space-y-1">

                    <p>📍 {event.location}</p>

                    <p>📅 {formattedDate}</p>

                    <p>⏰ {formattedTime}</p>

                </div>

            </div>

        </Link>
    );
}