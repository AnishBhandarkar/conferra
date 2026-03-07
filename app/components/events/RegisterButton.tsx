"use client";

import { toast } from "sonner";

export default function RegisterButton() {

    const handleRegister = () => {
        toast("Registration feature coming soon!");
    };

    return (
        <button
            onClick={handleRegister}
            className="bg-foreground text-background px-6 py-3 rounded-md font-medium hover:opacity-90 transition"
        >
            Register
        </button>
    );
}