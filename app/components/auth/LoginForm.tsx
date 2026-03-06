"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LoginForm() {

    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error("Email and password are required");
            return;
        }

        setLoading(true);

        try {

            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message || "Login failed");
                setLoading(false);
                return;
            }

            toast.success("Login successful");

            router.push("/");
            router.refresh();

        } catch {
            toast.error("Something went wrong");
        }

        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">

            {/* Email */}
            <div className="space-y-1">
                <label className="text-sm font-medium">
                    Email
                </label>

                <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full border border-foreground/20 rounded-md px-4 py-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-foreground/40"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            {/* Password */}
            <div className="space-y-1">
                <label className="text-sm font-medium">
                    Password
                </label>

                <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full border border-foreground/20 rounded-md px-4 py-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-foreground/40"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            {/* Submit */}
            <button
                type="submit"
                disabled={loading}
                className="w-full bg-foreground text-background py-2 rounded-md font-medium hover:opacity-90 transition disabled:opacity-50"
            >
                {loading ? "Logging in..." : "Login"}
            </button>

        </form>
    );
}