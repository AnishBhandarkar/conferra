import cron from "node-cron";
import { Event } from "@/models/Event";
import { Registration } from "@/models/Registration";
import cloudinary from "@/lib/cloudinary";
import { logger } from "@/lib/logger";


/**
 * Cleanup Expired Events Job
 *
 * Purpose:
 * This scheduled job automatically removes events that have passed their end date.
 *
 * Why this is needed:
 * - Prevents the database from accumulating expired events.
 * - Ensures users cannot register for events that already ended.
 * - Cleans up associated resources such as:
 *    • registrations linked to the event
 *    • Cloudinary images uploaded for the event banner
 *
 * Schedule:
 * Runs once per day using node-cron.
 *
 * Cleanup Flow:
 * 1. Find events where endDate < current time
 * 2. Delete event banner image from Cloudinary
 * 3. Remove associated registrations
 * 4. Delete the event document
 *
 * Notes:
 * - MongoDB TTL index alone cannot be used because we must also remove
 *   external resources (Cloudinary images) and related registrations.
 * - This job ensures data consistency across the system.
 */

export function startEventCleanupJob() {

    // Runs once per day (midnight)
    cron.schedule("0 0 * * *", async () => {

        try {
            const now = new Date();

            const expiredEvents = await Event.find({
                endDate: { $lt: now }
            });

            for (const event of expiredEvents) {
                logger.info({ eventId: event._id }, "Cleaning expired event");

                if (event.cloudinaryPublicId) {
                    await cloudinary.uploader.destroy(event.cloudinaryPublicId);
                }

                await Registration.deleteMany({
                    event: event._id
                });

                await Event.deleteOne({
                    _id: event._id
                });
            }

        } catch (error) {
            logger.error(error, "Event cleanup job failed");
        }
    });
}