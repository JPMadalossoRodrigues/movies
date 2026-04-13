// src/middlewares/error.middleware.ts

import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";
import { Errors } from "../errors/errors";

export function errorMiddleware(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  // erro conhecido da aplicação
  if (err instanceof AppError) {
    if (!err.isOperational) {
      console.error(err);
    }

    res.status(err.statusCode).json({
      message: err.message,
      code: err.code,
    });

    return;
  }

  // erro desconhecido (bug)
  console.error(err);

  const internalError = Errors.INTERNAL();

  res.status(internalError.statusCode).json({
    message: internalError.message,
    code: internalError.code,
  });
}
