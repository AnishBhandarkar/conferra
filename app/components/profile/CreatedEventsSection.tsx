import { IEvent } from "@/types/event";
import EventRowCard from "./EventRowCard";

export function CreatedEventsSection({createdEvents}: {createdEvents: IEvent[]}) {
    return (
        <section className="space-y-4">
            <h2 className="text-xl font-semibold">
                Created Events
            </h2>

            {createdEvents.length === 0 && (
                <p className="text-sm text-muted-foreground">
                    No events created yet
                </p>
            )}

            {createdEvents.map((event: IEvent) => (
                <EventRowCard key={event._id.toString()} event={event} />
            ))}
        </section>
    );
}