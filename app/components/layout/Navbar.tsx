import Link from "next/link";
import { cookies } from "next/headers";
import LogoutButton from "./LogoutButton";

export default async function Navbar() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const isLoggedIn = !!accessToken;

  return (
    <header className="border-b bg-white">

      <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold text-gray-900"
        >
          Conferra
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-6 text-sm font-medium text-gray-700">

          <Link
            href="/events"
            className="hover:text-black transition"
          >
            Events
          </Link>

          {!isLoggedIn ? (
            <>
              <Link
                href="/login"
                className="hover:text-black transition"
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
              >
                Signup
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/create-event"
                className="hover:text-black transition"
              >
                Create Event
              </Link>

              <Link
                href="/profile"
                className="hover:text-black transition"
              >
                Profile
              </Link>

              <LogoutButton />
            </>
          )}
        </div>

      </nav>
    </header>
  );
}