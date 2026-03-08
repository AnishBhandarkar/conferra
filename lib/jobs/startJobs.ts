import { logger } from "../logger";
import { startEventCleanupJob } from "./cleanupExpiredEvents";

let jobsStarted = false;

export function startJobs() {
    if (jobsStarted) {
        logger.debug('Background jobs already running');
        return;
    }

    logger.info("Starting background jobs");

    startEventCleanupJob();

    jobsStarted = true;
}