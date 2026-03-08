export default function ContactPage() {
    return (
        <div className="max-w-3xl mx-auto px-6 py-16 space-y-10">

            <header className="space-y-3">
                <h1 className="text-4xl font-bold">Contact</h1>

                <p className="text-foreground/70">
                    Have questions, feedback, or partnership inquiries?
                    We&apos;d love to hear from you.
                </p>
            </header>

            <div className="border rounded-lg p-6 space-y-4">

                <div>
                    <p className="font-medium">Email</p>
                    <p className="text-foreground/70">support@conferra.dev</p>
                </div>

                <div>
                    <p className="font-medium">Community</p>
                    <p className="text-foreground/70">
                        Join discussions with other developers and organizers.
                    </p>
                </div>

                <div>
                    <p className="font-medium">Partnerships</p>
                    <p className="text-foreground/70">
                        Interested in collaborating? Reach out and let&apos;s talk.
                    </p>
                </div>

            </div>

        </div>
    );
}