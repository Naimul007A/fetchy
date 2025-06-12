// Tiktok Configurations
export const ENABLE_TIKTOK = true;
// Instagram Configurations
export const ENABLE_INSTAGRAM = true;
// Facebook Configurations
export const ENABLE_FACEBOOK = true;
// Youtube Configurations
export const ENABLE_YOUTUBE = false;


// LOGGER
export const DOWNLOADER_SESSION_TTL = 120; // 2 minutes
export const SEND_TO_DISCORD = true;
export const LOGGER_CACHE_TTL = 60 * 10; // 10 minutes



// Redis
export const UPSTASH_URL = process.env.NEXT_UPSTASH_REDIS_REST_URL ?? "";
export const UPSTASH_TOKEN = process.env.NEXT_UPSTASH_REDIS_REST_TOKEN ?? "";