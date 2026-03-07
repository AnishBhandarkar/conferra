import Link from "next/link";

export default function Footer() {
    return (
        <footer className="border-t border-foreground/10 mt-16">

            <div className="max-w-6xl mx-auto px-4 py-12 grid gap-10 md:grid-cols-3">

                {/* Brand */}
                <div className="space-y-3">
                    <h2 className="text-xl font-semibold tracking-tight">
                        Conferra
                    </h2>

                    <p className="text-sm text-foreground/70 max-w-sm">
                        Discover, explore, and attend curated tech events.
                        From meetups to global conferences.
                    </p>
                </div>

                {/* Product Links */}
                <div className="space-y-3">
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground/60">
                        Product
                    </h3>

                    <div className="flex flex-col gap-2 text-sm">
                        <Link
                            href="/events"
                            className="hover:text-foreground transition"
                        >
                            Browse Events
                        </Link>

                        <Link
                            href="/create-event"
                            className="hover:text-foreground transition"
                        >
                            Create Event
                        </Link>
                    </div>
                </div>

                {/* Company Links */}
                <div className="space-y-3">
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground/60">
                        Company
                    </h3>

                    <div className="flex flex-col gap-2 text-sm">
                        <Link
                            href="/about"
                            className="hover:text-foreground transition"
                        >
                            About
                        </Link>

                        <Link
                            href="/contact"
                            className="hover:text-foreground transition"
                        >
                            Contact
                        </Link>
                    </div>
                </div>

            </div>

            {/* Bottom Bar */}
            <div className="border-t border-foreground/10">

                <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between text-sm text-foreground/60 gap-3">

                    <p>
                        © {new Date().getFullYear()} Conferra. All rights reserved.
                    </p>

                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-foreground transition">
                            Privacy
                        </Link>

                        <Link href="/terms" className="hover:text-foreground transition">
                            Terms
                        </Link>
                    </div>

                </div>

            </div>

        </footer>
    );
}