// src/modules/movies/movies.schema.ts

import { z } from "zod";

const dateTransform = z.string().transform((val) => new Date(val));

export const createMovieSchema = z.object({
  title: z.string().min(1),
  originalTitle: z.string().optional(),
  description: z.string().optional(),
  releaseDate: dateTransform,
  duration: z.number().positive(),
  budget: z.number().nonnegative().optional(),
  revenue: z.number().nonnegative().optional(),
  rating: z.string().optional(),
  language: z.string(),
  genres: z.array(z.string().transform((g) => g.toLowerCase().trim())),
  trailerUrl: z.string().url().optional(),
});

export const updateMovieSchema = createMovieSchema.partial();

export const queryMoviesSchema = z.object({
  page: z
    .string()
    .optional()
    .transform((v) => Number(v) || 1),

  search: z.string().optional(),

  genres: z
    .string()
    .optional()
    .transform((v) =>
      v ? v.split(",").map((g) => g.toLowerCase().trim()) : undefined,
    ),

  minDuration: z
    .string()
    .optional()
    .transform((v) => (v ? Number(v) : undefined)),
  maxDuration: z
    .string()
    .optional()
    .transform((v) => (v ? Number(v) : undefined)),

  releaseDateStart: z
    .string()
    .optional()
    .transform((v) => (v ? new Date(v) : undefined)),
  releaseDateEnd: z
    .string()
    .optional()
    .transform((v) => (v ? new Date(v) : undefined)),
});

export type CreateMovieInput = z.infer<typeof createMovieSchema>;
export type UpdateMovieInput = z.infer<typeof updateMovieSchema>;
export type QueryMoviesInput = z.infer<typeof queryMoviesSchema>;
