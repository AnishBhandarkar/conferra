export default function PrivacyPage() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-16 space-y-8">

            <h1 className="text-4xl font-bold">
                Privacy Policy
            </h1>

            <p className="text-foreground/70">
                Your privacy is important to us. This Privacy Policy explains how
                Conferra collects, uses, and protects your information when you
                use our platform.
            </p>

            <section className="space-y-3">
                <h2 className="text-xl font-semibold">Information We Collect</h2>

                <p className="text-foreground/70">
                    When you create an account or register for events, we may collect
                    personal information such as your name and email address.
                </p>
            </section>

            <section className="space-y-3">
                <h2 className="text-xl font-semibold">How We Use Information</h2>

                <p className="text-foreground/70">
                    We use collected information to operate the platform,
                    provide event registration functionality, and improve
                    the overall user experience.
                </p>
            </section>

            <section className="space-y-3">
                <h2 className="text-xl font-semibold">Data Protection</h2>

                <p className="text-foreground/70">
                    We implement appropriate technical and organizational
                    measures to safeguard your information.
                </p>
            </section>

            <p className="text-sm text-foreground/60 pt-10">
                This platform is a demonstration project built for educational purposes.
            </p>

        </div>
    );
}