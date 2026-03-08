export default function TermsPage() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-16 space-y-8">

            <h1 className="text-4xl font-bold">
                Terms of Service
            </h1>

            <p className="text-foreground/70">
                By using Conferra, you agree to the following terms and conditions.
            </p>

            <section className="space-y-3">
                <h2 className="text-xl font-semibold">Use of the Platform</h2>

                <p className="text-foreground/70">
                    Users must provide accurate information and use the platform
                    responsibly when creating or registering for events.
                </p>
            </section>

            <section className="space-y-3">
                <h2 className="text-xl font-semibold">Organizer Responsibilities</h2>

                <p className="text-foreground/70">
                    Event organizers are responsible for providing accurate
                    event details and ensuring events comply with applicable laws.
                </p>
            </section>

            <section className="space-y-3">
                <h2 className="text-xl font-semibold">Limitation of Liability</h2>

                <p className="text-foreground/70">
                    Conferra provides a platform for event discovery and registration.
                    We are not responsible for the conduct or outcomes of individual events.
                </p>
            </section>

            <p className="text-sm text-foreground/60 pt-10">
                This platform is a demonstration project built for educational purposes.
            </p>

        </div>
    );
}