// src/errors/errors.ts

import { AppError } from "./AppError";

export const Errors = {
  BAD_REQUEST: (message = "Bad request") =>
    new AppError({
      message,
      statusCode: 400,
      code: "BAD_REQUEST",
    }),

  UNAUTHORIZED: (message = "Unauthorized") =>
    new AppError({
      message,
      statusCode: 401,
      code: "UNAUTHORIZED",
    }),

  FORBIDDEN: (message = "Forbidden") =>
    new AppError({
      message,
      statusCode: 403,
      code: "FORBIDDEN",
    }),

  NOT_FOUND: (message = "Resource not found") =>
    new AppError({
      message,
      statusCode: 404,
      code: "NOT_FOUND",
    }),

  CONFLICT: (message = "Conflict") =>
    new AppError({
      message,
      statusCode: 409,
      code: "CONFLICT",
    }),

  INTERNAL: (message = "Internal server error") =>
    new AppError({
      message,
      statusCode: 500,
      code: "INTERNAL_ERROR",
      isOperational: false,
    }),
};
