"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

export default function LoginPageToast() {

    const searchParams = useSearchParams();
    const reason = searchParams.get("reason");

    useEffect(() => {

        if (reason === "auth-required") {
            toast.info("Please login to create an event.");
        }

    }, [reason]);

    return null;
}