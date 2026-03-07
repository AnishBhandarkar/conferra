"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface EventFormState {
    title: string;
    description: string;
    venue: string;
    location: string;
    startDate: string;
    endDate: string;
    mode: "ONLINE" | "OFFLINE";
    capacity: string;
    tags: string;
    agenda: string[];
}

export default function EventForm() {
    const router = useRouter();

    const [form, setForm] = useState<EventFormState>({
        title: "",
        description: "",
        venue: "",
        location: "",
        startDate: "",
        endDate: "",
        mode: "ONLINE",
        capacity: "",
        tags: "",
        agenda: [""],
    });

    const [image, setImage] = useState<File | null>(null);

    const [loading, setLoading] = useState(false);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type } = e.target;

        if (type === "checkbox") {
            const checked = (e.target as HTMLInputElement).checked;
            setForm(prev => ({ ...prev, [name]: checked }));
        } else {
            setForm(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleAgendaChange = (index: number, value: string) => {
        const updated = [...form.agenda];
        updated[index] = value;

        setForm(prev => ({
            ...prev,
            agenda: updated
        }));
    };

    const addAgendaItem = () => {
        setForm(prev => ({
            ...prev,
            agenda: [...prev.agenda, ""]
        }));
    };

    const handleImageChange = (file: File) => {

        const MAX_FILE_SIZE = 5 * 1024 * 1024;

        if (file.size > MAX_FILE_SIZE) {
            toast.error("Image must be smaller than 5MB");
            return;
        }

        if (!file.type.startsWith("image/")) {
            toast.error("Only image files allowed");
            return;
        }

        setImage(file);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (loading) return;

        setLoading(true);

        try {
            if (!form.title || !form.description || !form.location) {
                toast.error("Please fill required fields");
                return;
            }

            const formData = new FormData();

            formData.append("title", form.title);
            formData.append("description", form.description);
            formData.append("venue", form.venue);
            formData.append("location", form.location);
            formData.append("startDate", form.startDate);
            formData.append("endDate", form.endDate);
            formData.append("mode", form.mode);
            formData.append("capacity", form.capacity);

            const tagsArray = form.tags
                .split(",")
                .map(t => t.trim())
                .filter(Boolean);

            tagsArray.forEach(tag => formData.append("tags", tag));

            form.agenda
                .filter(Boolean)
                .forEach(item => formData.append("agenda", item));

            if (image) formData.append("image", image);

            const res = await fetch("/api/events", {
                method: "POST",
                body: formData
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message);
                setLoading(false);
                return;
            }

            toast.success("Event created successfully");

            router.push(`/events/${data.eventId}`);
        } catch {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-10 max-w-3xl"
        >

            {/* Basic Info */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">Basic Information</h2>

                <input
                    name="title"
                    placeholder="Event title"
                    value={form.title}
                    onChange={handleChange}
                    className="border p-3 w-full rounded"
                />

                <textarea
                    name="description"
                    placeholder="Event description"
                    value={form.description}
                    onChange={handleChange}
                    className="border p-3 w-full rounded min-h-[120px]"
                />

                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageChange(file);
                    }}
                />
            </section>

            {/* Location */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">Location</h2>

                <input
                    name="venue"
                    placeholder="Venue"
                    value={form.venue}
                    onChange={handleChange}
                    className="border p-3 w-full rounded"
                />

                <input
                    name="location"
                    placeholder="City / Location"
                    value={form.location}
                    onChange={handleChange}
                    className="border p-3 w-full rounded"
                />
            </section>

            {/* Schedule */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">Schedule</h2>

                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="datetime-local"
                        name="startDate"
                        value={form.startDate}
                        onChange={handleChange}
                        className="border p-3 rounded"
                    />

                    <input
                        type="datetime-local"
                        name="endDate"
                        value={form.endDate}
                        onChange={handleChange}
                        className="border p-3 rounded"
                    />
                </div>
            </section>

            {/* Mode */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">Event Mode</h2>

                <div className="flex gap-6">
                    <label className="flex gap-2">
                        <input
                            type="radio"
                            name="mode"
                            value="ONLINE"
                            checked={form.mode === "ONLINE"}
                            onChange={handleChange}
                        />
                        Online
                    </label>

                    <label className="flex gap-2">
                        <input
                            type="radio"
                            name="mode"
                            value="OFFLINE"
                            checked={form.mode === "OFFLINE"}
                            onChange={handleChange}
                        />
                        Offline
                    </label>
                </div>
            </section>

            {/* Capacity */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">Capacity</h2>

                <input
                    type="number"
                    name="capacity"
                    min="1"
                    placeholder="Max attendees"
                    value={form.capacity}
                    onChange={handleChange}
                    className="border p-3 w-full rounded"
                />
            </section>

            {/* Tags */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">Tags</h2>

                <input
                    name="tags"
                    placeholder="react,nextjs,graphql"
                    value={form.tags}
                    onChange={handleChange}
                    className="border p-3 w-full rounded"
                />
            </section>

            {/* Agenda */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">Agenda</h2>

                {form.agenda.map((item, index) => (
                    <input
                        key={index}
                        value={item}
                        placeholder={`Agenda item ${index + 1}`}
                        onChange={e => handleAgendaChange(index, e.target.value)}
                        className="border p-3 w-full rounded"
                    />
                ))}

                <button
                    type="button"
                    onClick={addAgendaItem}
                    className="text-sm underline"
                >
                    + Add agenda item
                </button>
            </section>

            <button
                disabled={loading}
                className="bg-foreground text-background px-6 py-3 rounded font-medium disabled:opacity-50"
            >
                {loading ? "Creating Event..." : "Create Event"}
            </button>

        </form>
    );
}