import AppError from "@shared/errors/AppError";
import { Request, Response, NextFunction } from "express";
import { RateLimiterRedis } from 'rate-limiter-flexible';
import redis from 'redis';
import Redis, { Redis as RedisClient } from 'ioredis';
import cacheConfig from '@config/cache';


/* const redisClient = redis.createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
}) */
const redisClient = new Redis(cacheConfig.config.redis);

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'ratelimit',
  points: 10, // 10 requests
  duration: 1, // per 1 second by IP
});

export default async function rateLimiter(request: Request, response: Response, next: NextFunction): Promise<void> {
  try {
    await limiter.consume(request.ip);
    return next();
  } catch (error) {
    throw new AppError('Too many Request', 429);
  }
}
