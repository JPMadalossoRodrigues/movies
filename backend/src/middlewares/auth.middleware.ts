// src/middlewares/auth.middleware.ts

import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../config/jwt";
import { Errors } from "../errors/errors";

export function authMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw Errors.UNAUTHORIZED("Token not provided");
  }

  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer" || !token) {
    throw Errors.UNAUTHORIZED("Invalid token format");
  }

  const decoded = verifyToken(token);

  req.user = {
    id: decoded.sub,
  };

  next();
}
