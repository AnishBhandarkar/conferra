export default function AboutPage() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-16 space-y-10">

            <header className="space-y-4">
                <h1 className="text-4xl font-bold">
                    About Conferra
                </h1>

                <p className="text-lg text-foreground/70">
                    Conferra helps developers discover, host, and attend high-quality tech events.
                    Whether you&apos;re organizing a meetup or searching for your next conference,
                    Conferra makes connecting with the tech community simple.
                </p>
            </header>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Our Mission</h2>

                <p className="text-foreground/80">
                    We believe knowledge grows faster when shared.
                    Conferra aims to make it easier for developers to discover events,
                    learn from each other, and build stronger technical communities.
                </p>
            </section>

            <section className="grid md:grid-cols-3 gap-6 pt-6">

                <div className="border rounded-lg p-6 space-y-2">
                    <h3 className="font-semibold">Discover Events</h3>
                    <p className="text-sm text-foreground/70">
                        Explore tech meetups, workshops, and conferences happening around you.
                    </p>
                </div>

                <div className="border rounded-lg p-6 space-y-2">
                    <h3 className="font-semibold">Host Events</h3>
                    <p className="text-sm text-foreground/70">
                        Organizers can create and manage events effortlessly.
                    </p>
                </div>

                <div className="border rounded-lg p-6 space-y-2">
                    <h3 className="font-semibold">Build Community</h3>
                    <p className="text-sm text-foreground/70">
                        Meet developers, share knowledge, and grow together.
                    </p>
                </div>

            </section>

            <p className="text-sm text-foreground/60 pt-10">
                This platform is a demonstration project built for educational purposes.
            </p>

        </div>
    );
}