// src/modules/job/job.worker.ts

import { JobService } from "./job.service";
import { prisma } from "../../database/prisma";
import { Resend } from "resend";
import { env } from "../../config/env";

const jobService = new JobService();
const resend = new Resend(env.RESEND_API_KEY);

async function processJobs() {
  const jobs = await jobService.getPendingJobs();

  for (const job of jobs) {
    try {
      await jobService.markAsProcessing(job.id);

      switch (job.type) {
        case "release_email": {
          const { movieId, userId } = job.payload as {
            movieId: number;
            userId: number;
          };

          const movie = await prisma.movie.findUnique({
            where: { id: movieId },
            include: { user: true },
          });

          if (!movie) {
            throw new Error("Movie not found");
          }

          await resend.emails.send({
            from: "onboarding@resend.dev",
            to: movie.user.email,
            subject: `🎬 ${movie.title} chegou!`,
            html: `
              <h1>${movie.title}</h1>
              <p>O filme que você cadastrou acabou de lançar!</p>
              <p>Data de lançamento: ${new Date(movie.releaseDate).toLocaleDateString()}</p>
            `,
          });

          console.log(`Email enviado para ${movie.user.email}`);
          break;
        }

        default:
          throw new Error(`Unknown job type: ${job.type}`);
      }

      await jobService.markAsDone(job.id);
    } catch (error) {
      console.error("Job error:", error);
      await jobService.markAsFailed(job.id, job.attempts);
    }
  }
}

export function startJobWorker() {
  setInterval(() => {
    processJobs();
  }, 5000);
}

export { processJobs };
