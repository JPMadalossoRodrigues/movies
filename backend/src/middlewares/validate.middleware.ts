// src/middlewares/validate.middleware.ts

import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";
import { Errors } from "../errors/errors";

type Schemas = {
  body?: ZodSchema;
  query?: ZodSchema;
  params?: ZodSchema;
};

export function validate(schemas: Schemas) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    try {
      if (schemas.body) {
        req.body = schemas.body.parse(req.body);
      }

      if (schemas.query) {
        req.query = schemas.query.parse(req.query);
      }

      if (schemas.params) {
        req.params = schemas.params.parse(req.params);
      }

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const message = error.errors.map((e) => e.message).join(", ");
        throw Errors.BAD_REQUEST(message);
      }

      throw error;
    }
  };
}
