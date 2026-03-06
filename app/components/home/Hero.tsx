import Link from "next/link";

export default function Hero() {
    return (
        <section className="py-20">

            <div className="max-w-3xl mx-auto text-center">

                {/* Headline */}
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                    Discover and Attend the Best Tech Events
                </h1>

                {/* Description */}
                <p className="mt-6 text-lg text-gray-500">
                    Find conferences, meetups, and hackathons happening around you.
                    Create events and connect with the developer community.
                </p>

                {/* CTA Buttons */}
                <div className="mt-8 flex justify-center gap-4">

                    <Link
                        href="/events"
                        className="bg-foreground text-background px-6 py-3 rounded-md font-medium hover:opacity-90 transition"
                    >
                        Browse Events
                    </Link>

                    <Link
                        href="/create-event"
                        className="border border-foreground px-6 py-3 rounded-md font-medium hover:bg-foreground/10 transition"
                    >
                        Create Event
                    </Link>

                </div>

            </div>

        </section>
    );
}