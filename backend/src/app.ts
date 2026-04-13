// src/app.ts

import express, { Request, Response, NextFunction } from "express";
import cors from "cors";

import { env } from "./config/env";

import authRoutes from "./modules/auth/auth.routes";
import movieRoutes from "./modules/movies/movies.routes";
import uploadRoutes from "./modules/upload/upload.routes";
import jobRoutes from "./modules/job/job.routes";

import { errorMiddleware } from "./middlewares/error.middleware";
import { Errors } from "./errors/errors";

const app = express();

// CORS controlado por env
app.use(
  cors({
    origin: env.CORS_ORIGIN,
  }),
);

// body parser
app.use(express.json());

// healthcheck
app.get("/health", (_req: Request, res: Response) => {
  return res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

// rotas
app.use("/auth", authRoutes);
app.use("/movies", movieRoutes);
app.use("/upload", uploadRoutes);
app.use("/jobs", jobRoutes);

// rota não encontrada
app.use((_req: Request, _res: Response, next: NextFunction) => {
  next(Errors.NOT_FOUND("Route not found"));
});

// error handler (último)
app.use(errorMiddleware);

export { app };
