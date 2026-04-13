// src/modules/movies/movies.controller.ts

import { Request, Response } from "express";
import { MoviesService } from "./movies.service";
import {
  createMovieSchema,
  updateMovieSchema,
  queryMoviesSchema,
} from "./movies.schema";
import { z } from "zod";

const service = new MoviesService();

// schema simples pra params
const idSchema = z.object({
  id: z.string().transform((v) => Number(v)),
});

export class MoviesController {
  async create(req: Request, res: Response) {
    const data = createMovieSchema.parse(req.body);

    const movie = await service.create(data, req.user.id);

    return res.status(201).json(movie);
  }

  async findAll(req: Request, res: Response) {
    const query = queryMoviesSchema.parse(req.query);

    const result = await service.findAll(query, req.user.id);

    return res.json(result);
  }

  async findById(req: Request, res: Response) {
    const { id } = idSchema.parse(req.params);

    const movie = await service.findById(id, req.user.id);

    return res.json(movie);
  }

  async update(req: Request, res: Response) {
    const { id } = idSchema.parse(req.params);
    const data = updateMovieSchema.parse(req.body);

    const movie = await service.update(id, data, req.user.id);

    return res.json(movie);
  }

  async delete(req: Request, res: Response) {
    const { id } = idSchema.parse(req.params);

    await service.delete(id, req.user.id);

    return res.status(204).send();
  }
}
