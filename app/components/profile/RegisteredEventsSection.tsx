import { IEvent } from "@/types/event";
import EventRowCard from "./EventRowCard";

export function RegisteredEventsSection({ registeredEvents }: { registeredEvents: IEvent[] }) {
    return (
        <section className="space-y-4">
            <h2 className="text-xl font-semibold">
                Registered Events
            </h2>

            {registeredEvents.length === 0 && (
                <p className="text-sm text-muted-foreground">
                    No registered events
                </p>
            )}

            {registeredEvents.map((event: IEvent) => (
                <EventRowCard key={event._id.toString()} event={event} />
            ))}
        </section>
    );
}