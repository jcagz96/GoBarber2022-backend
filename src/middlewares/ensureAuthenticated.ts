import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';
import AppError from '../errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Invalid JWT token', 401);
  }

  const [, token] = authHeader.split(' '); // similiar to: authHeader.split(' ')[1]

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as TokenPayload;

    request.user = { id: sub }; // similiar to override a type

    console.log(decoded);
    return next();
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
}
