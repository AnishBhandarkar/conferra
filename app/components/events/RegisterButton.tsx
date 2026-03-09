"use client";

import { getCSRFCookieInClient } from "@/lib/auth/cookies";
import { IEvent } from "@/types/event";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
    event: IEvent,
    isLoggedIn: boolean
    isRegistered: boolean
}

export default function RegisterButton({ event, isLoggedIn, isRegistered }: Props) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    if (event.attendeesCount >= event.capacity) {
        toast.message("Event full");
    }

    const handleRegister = async () => {
        if (!isLoggedIn) {
            router.replace(
                `/login?redirect=/events/${event._id.toString()}&reason=auth-required`
            );
            return;
        }

        try {
            setLoading(true);
            const csrfToken = getCSRFCookieInClient(document.cookie);

            if (!csrfToken) {
                throw new Error("Missing CSRF token");
            }

            const res = await fetch(`/api/events/${event._id.toString()}/register`, {
                method: "POST",
                headers: {
                    "x-csrf-token": csrfToken
                }
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message || "Registration failed");
                return;
            }

            toast.success("Successfully registered!");

            // refresh page so attendeesCount updates
            router.refresh();

        } catch {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            disabled={event.attendeesCount >= event.capacity || isRegistered}
            onClick={handleRegister}
            className="cursor-pointer bg-foreground text-background px-6 py-3 rounded-md font-medium transition 
             hover:opacity-90 
             disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
            {loading ? "Registering" :
                isRegistered ? "Registered" :
                    event.attendeesCount >= event.capacity ? "Sold Out" :
                        "Register Now"
            }
        </button>
    );
}