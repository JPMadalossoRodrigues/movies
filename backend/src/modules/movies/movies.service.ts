// src/modules/movies/movies.service.ts

import { prisma } from "../../database/prisma";
import { Errors } from "../../errors/errors";
import { JobService } from "../job/job.service";

import {
  CreateMovieInput,
  UpdateMovieInput,
  QueryMoviesInput,
} from "./movies.schema";

const LIMIT = 10;
const jobService = new JobService();

export class MoviesService {
  async create(data: CreateMovieInput, userId: number) {
    const movie = await prisma.movie.create({
      data: {
        ...data,
        userId,
      },
    });

    // regra de negócio
    if (data.releaseDate > new Date()) {
      await jobService.create({
        type: "release_email",
        payload: {
          movieId: movie.id,
          userId,
        },
        runAt: data.releaseDate,
      });
    }

    return movie;
  }

  async findAll(query: QueryMoviesInput, userId: number) {
    const {
      page,
      search,
      genres,
      minDuration,
      maxDuration,
      releaseDateStart,
      releaseDateEnd,
    } = query;

    const where: any = {
      userId,
      AND: [],
    };

    if (minDuration || maxDuration) {
      where.AND.push({
        duration: {
          gte: minDuration,
          lte: maxDuration,
        },
      });
    }

    if (releaseDateStart || releaseDateEnd) {
      where.AND.push({
        releaseDate: {
          gte: releaseDateStart,
          lte: releaseDateEnd,
        },
      });
    }

    if (genres?.length) {
      where.AND.push({
        genres: {
          hasSome: genres,
        },
      });
    }

    if (search) {
      where.AND.push({
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { originalTitle: { contains: search, mode: "insensitive" } },
        ],
      });
    }

    const skip = (page - 1) * LIMIT;

    const [data, total] = await Promise.all([
      prisma.movie.findMany({
        where,
        skip,
        take: LIMIT,
        orderBy: { createdAt: "desc" },
      }),
      prisma.movie.count({ where }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit: LIMIT,
        totalPages: Math.ceil(total / LIMIT),
      },
    };
  }

  async findById(id: number, userId: number) {
    const movie = await prisma.movie.findFirst({
      where: { id, userId },
    });

    if (!movie) {
      throw Errors.NOT_FOUND("Movie not found");
    }

    return movie;
  }

  async update(id: number, data: UpdateMovieInput, userId: number) {
    const exists = await prisma.movie.findFirst({
      where: { id, userId },
    });

    if (!exists) {
      throw Errors.NOT_FOUND("Movie not found");
    }

    return prisma.movie.update({
      where: { id },
      data,
    });
  }

  async delete(id: number, userId: number) {
    const exists = await prisma.movie.findFirst({
      where: { id, userId },
    });

    if (!exists) {
      throw Errors.NOT_FOUND("Movie not found");
    }

    await prisma.movie.delete({
      where: { id },
    });
  }
}
