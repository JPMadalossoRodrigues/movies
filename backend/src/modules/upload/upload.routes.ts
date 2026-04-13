// src/modules/upload/upload.routes.ts

import { Router } from "express";
import { UploadController } from "./upload.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { upload } from "../../middlewares/upload.middleware";

const router = Router();
const controller = new UploadController();

router.post(
  "/",
  authMiddleware,
  upload.single("file"),
  controller.upload.bind(controller),
);

export default router;
