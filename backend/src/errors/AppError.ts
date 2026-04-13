// src/errors/AppError.ts

export type ErrorCode =
  | "BAD_REQUEST"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "CONFLICT"
  | "INTERNAL_ERROR";

type ErrorOptions = {
  message: string;
  statusCode: number;
  code: ErrorCode;
  isOperational?: boolean;
};

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: ErrorCode;
  public readonly isOperational: boolean;

  constructor(options: ErrorOptions) {
    super(options.message);

    this.statusCode = options.statusCode;
    this.code = options.code;
    this.isOperational = options.isOperational ?? true;

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}
