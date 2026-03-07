import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import EventForm from "../components/events/EventForm";

export default async function CreateEventPage() {

    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken");

    if (!token) {
        redirect("/login?redirect=/create-event&reason=auth-required");
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-10">

            <h1 className="text-3xl font-bold mb-8">
                Create Event
            </h1>

            <EventForm />

        </div>
    );
}