// src/modules/movies/movies.routes.ts

import { Router } from "express";
import { MoviesController } from "./movies.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/validate.middleware";
import {
  createMovieSchema,
  updateMovieSchema,
  queryMoviesSchema,
} from "./movies.schema";

const router = Router();
const controller = new MoviesController();

router.use(authMiddleware);

router.post(
  "/",
  validate({ body: createMovieSchema }),
  controller.create.bind(controller),
);

router.get(
  "/",
  validate({ query: queryMoviesSchema }),
  controller.findAll.bind(controller),
);

router.get("/:id", controller.findById.bind(controller));

router.put(
  "/:id",
  validate({ body: updateMovieSchema }),
  controller.update.bind(controller),
);

router.delete("/:id", controller.delete.bind(controller));

export default router;
