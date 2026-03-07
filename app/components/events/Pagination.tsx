"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function Pagination({ page, totalPages }: { page: number, totalPages: number }) {

    const router = useRouter();
    const searchParams = useSearchParams();

    const goToPage = (newPage: number) => {

        const params = new URLSearchParams(searchParams.toString());
        params.set("page", String(newPage));

        router.push(`/events?${params.toString()}`);
    };

    return (
        <div className="flex justify-center items-center gap-4">

            <button
                disabled={page <= 1}
                onClick={() => goToPage(page - 1)}
                className="px-4 py-2 border rounded-md disabled:opacity-40"
            >
                Previous
            </button>

            <span className="text-sm">
                Page {page} of {totalPages}
            </span>

            <button
                disabled={page >= totalPages}
                onClick={() => goToPage(page + 1)}
                className="px-4 py-2 border rounded-md disabled:opacity-40"
            >
                Next
            </button>

        </div>
    );
}