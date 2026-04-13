// src/modules/job/job.routes.ts

import { Router, Request, Response } from "express";
import { processJobs } from "./job.worker";

const router = Router();

router.post("/run", async (_req: Request, res: Response) => {
  await processJobs();

  return res.json({
    message: "Jobs processed manually",
  });
});

export default router;
