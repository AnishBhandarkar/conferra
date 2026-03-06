import Link from "next/link";

export default function Footer() {
    return (
        <footer className="border-t mt-12">

            <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between gap-6">

                {/* Brand */}
                <div>
                    <h2 className="text-lg font-semibold">Conferra</h2>
                    <p className="text-sm text-gray-500 mt-2">
                        Discover and attend the best tech events.
                    </p>
                </div>

                {/* Links */}
                <div className="flex gap-6 text-sm">

                    <Link href="/events">
                        Events
                    </Link>

                    <Link href="/create-event">
                        Create Event
                    </Link>

                    <Link href="/about">
                        About
                    </Link>

                </div>

            </div>

            {/* Bottom Bar */}
            <div className="text-center text-sm text-gray-500 pb-6">
                © {new Date().getFullYear()} Conferra. All rights reserved.
            </div>

        </footer>
    );
}