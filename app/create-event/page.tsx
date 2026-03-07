import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function CreateEventPage() {

    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken");

    if (!token) {
        redirect("/login?redirect=/create-event&reason=auth-required");
    }

    return (
        <>
            <h3>Welcome to Create Event</h3>
        </>
    )
}