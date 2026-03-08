/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { Event } from "@/models/Event";
import { Registration } from "@/models/Registration";
import { redirect } from "next/navigation";
import { ProfileHeader } from "../components/profile/ProfileHeader";
import { CreatedEventsSection } from "../components/profile/CreatedEventsSection";
import { RegisteredEventsSection } from "../components/profile/RegisteredEventsSection";

export default async function ProfilePage() {

    const user = await getCurrentUser();

    if (!user) redirect("/login");

    const createdEvents = await Event.find({
        organizer: user.userId
    })
        .sort({ startDate: -1 })
        .limit(10)
        .lean();

    const registrations = await Registration
        .find({ user: user.userId })
        .populate("event")
        .limit(10)
        .lean();

    const registeredEvents = registrations.map((r: any) => r.event);

    return (

        <div className="max-w-5xl mx-auto py-10 space-y-10">
            {/* USER INFO */}
            <ProfileHeader user={user} />

            {/* CREATED EVENTS */}
            <CreatedEventsSection createdEvents={createdEvents} />

            {/* REGISTERED EVENTS */}
            <RegisteredEventsSection registeredEvents={registeredEvents} />
        </div>

    );
}