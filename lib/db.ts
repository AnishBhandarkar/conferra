import mongoose from "mongoose";

/**
 * MongoDB connection URI from environment variables.
 * 
 * In Next.js, environment variables are automatically loaded
 * from `.env.local` into `process.env`.
 * No need for dotenv.config().
 */
const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
    /**
     * Fail fast if DB URI is missing.
     * This prevents the app from running in an invalid state.
     */
    throw new Error("MONGODB_URI environment variable is not defined");
}

/**
 * We use a global variable to prevent multiple connections
 * during development.
 *
 * Why?
 * Next.js dev mode re-evaluates modules on file changes.
 * Without this pattern, each reload creates a new DB connection.
 *
 * In production, modules are evaluated once, so this is safe.
 */
interface MongooseGlobal {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

// Extend globalThis to store cached connection
const globalWithMongoose = global as typeof globalThis & {
    mongoose?: MongooseGlobal;
};

if (!globalWithMongoose.mongoose) {
    globalWithMongoose.mongoose = {
        conn: null,
        promise: null,
    };
}

/**
 * Connect to MongoDB using singleton pattern.
 */
export async function connectDB() {
    // If already connected, reuse existing connection
    if (globalWithMongoose.mongoose!.conn) {
        return globalWithMongoose.mongoose!.conn;
    }

    // If connection promise doesn't exist, create one
    if (!globalWithMongoose.mongoose!.promise) {
        globalWithMongoose.mongoose!.promise = mongoose.connect(MONGODB_URI);
    }

    // Await connection and cache it
    globalWithMongoose.mongoose!.conn =
        await globalWithMongoose.mongoose!.promise;

    return globalWithMongoose.mongoose!.conn;
}