import mongoose from "mongoose";
import { Event } from "../models/Event";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function seedEvents() {
    try {

        await mongoose.connect(process.env.MONGODB_URI!);

        console.log("DB connected");

        // await Event.deleteMany();

        const events = [
            {
                title: "React Bangalore Meetup",
                description: "Meet React developers from Bangalore.",
                coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475",
                venue: "Koramangala Startup Hub",
                location: "Bangalore",
                startDate: new Date("2026-04-12T18:30:00"),
                endDate: new Date("2026-04-12T21:00:00"),
                mode: "OFFLINE",
                capacity: 120,
                attendeesCount: 0,
                organizer: "65b000000000000000000001",
                tags: ["react", "frontend"],
                agenda: ["Intro", "React 19 Features", "Networking"],
                paid: false,
                price: 0
            },
            {
                title: "GraphQL India Conference",
                description: "Deep dive into GraphQL ecosystem.",
                coverImage: "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
                venue: "Tech Convention Center",
                location: "Hyderabad",
                startDate: new Date("2026-05-02T10:00:00"),
                endDate: new Date("2026-05-02T17:00:00"),
                mode: "OFFLINE",
                capacity: 300,
                attendeesCount: 0,
                organizer: "65b000000000000000000001",
                tags: ["graphql", "backend"],
                agenda: ["GraphQL Basics", "Apollo Server", "Scaling APIs"],
                paid: true,
                price: 999
            },
            {
                title: "Next.js Global Summit",
                description: "Learn about the future of Next.js.",
                coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
                venue: "Online",
                location: "Virtual",
                startDate: new Date("2026-06-10T19:00:00"),
                endDate: new Date("2026-06-10T21:00:00"),
                mode: "ONLINE",
                capacity: 1000,
                attendeesCount: 0,
                organizer: "65b000000000000000000001",
                tags: ["nextjs", "react"],
                agenda: ["Server Components", "App Router", "Scaling Next Apps"],
                paid: false,
                price: 0
            }
        ];

        await Event.insertMany(events);

        console.log("Events seeded successfully");

        process.exit();

    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

seedEvents();