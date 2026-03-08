import { IEvent } from "@/types/event";
import Link from "next/link";

export default function EventRowCard({ event }: { event: IEvent }) {

  return (

    <Link
      href={`/events/${event._id}`}
      className="flex justify-between items-center border rounded-lg p-4 hover:bg-foreground/5 transition"
    >
      <div>
        <p className="font-medium">
          {event.title}
        </p>

        <p className="text-sm text-foreground/70">
          {event.venue}
        </p>
      </div>

      <p className="text-sm text-foreground/60">
        {new Date(event.startDate).toLocaleDateString()}
      </p>
    </Link>
  );
}