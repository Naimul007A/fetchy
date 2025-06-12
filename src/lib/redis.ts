import Redis from "ioredis";

let redis: Redis | null = null;

export const getRedis = () => {
  if (!redis) {
    redis = new Redis(process.env.NEXT_REDIS_URL);
  }
  return redis;
};
