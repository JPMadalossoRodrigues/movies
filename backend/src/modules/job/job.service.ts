// src/modules/job/job.service.ts

import { prisma } from "../../database/prisma";
import { Prisma } from "@prisma/client";

export class JobService {
  async create(data: {
    type: string;
    payload: Prisma.InputJsonValue;
    runAt: Date;
  }) {
    return prisma.job.create({
      data: {
        ...data,
        status: "pending",
      },
    });
  }
  async getPendingJobs() {
    return prisma.job.findMany({
      where: {
        status: "pending",
        runAt: {
          lte: new Date(),
        },
        attempts: {
          lt: 5,
        },
      },
      orderBy: {
        runAt: "asc",
      },
    });
  }

  async markAsProcessing(id: number) {
    return prisma.job.update({
      where: { id },
      data: { status: "processing" },
    });
  }

  async markAsDone(id: number) {
    return prisma.job.update({
      where: { id },
      data: { status: "done" },
    });
  }

  async markAsFailed(id: number, attempts: number) {
    const newAttempts = attempts + 1;

    return prisma.job.update({
      where: { id },
      data: {
        attempts: newAttempts,
        status: newAttempts >= 5 ? "failed" : "pending",
      },
    });
  }
}
