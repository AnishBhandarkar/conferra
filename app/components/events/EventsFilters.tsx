"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function EventsFilters() {

    const router = useRouter();
    const searchParams = useSearchParams();

    const [search, setSearch] = useState(searchParams.get("search") || "");
    const mode = searchParams.get("mode") || "";

    const applyFilters = () => {

        const params = new URLSearchParams(searchParams.toString());

        if (search) params.set("search", search);
        else params.delete("search");

        router.push(`/events?${params.toString()}`);
    };

    const setMode = (value: string) => {

        const params = new URLSearchParams(searchParams.toString());

        if (value) params.set("mode", value);
        else params.delete("mode");

        router.push(`/events?${params.toString()}`);
    };

    return (
        <div className="flex flex-col md:flex-row gap-4 items-center">

            <input
                type="text"
                placeholder="Search events..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border rounded-md px-3 py-2 w-full md:w-80"
            />

            <button
                onClick={applyFilters}
                className="px-4 py-2 border rounded-md"
            >
                Search
            </button>

            <div className="flex gap-2">

                <button
                    onClick={() => setMode("")}
                    className={`px-3 py-2 border rounded-md ${!mode ? "bg-foreground text-background" : ""}`}
                >
                    All
                </button>

                <button
                    onClick={() => setMode("ONLINE")}
                    className={`px-3 py-2 border rounded-md ${mode === "ONLINE" ? "bg-foreground text-background" : ""}`}
                >
                    Online
                </button>

                <button
                    onClick={() => setMode("OFFLINE")}
                    className={`px-3 py-2 border rounded-md ${mode === "OFFLINE" ? "bg-foreground text-background" : ""}`}
                >
                    Offline
                </button>

            </div>

        </div>
    );
}