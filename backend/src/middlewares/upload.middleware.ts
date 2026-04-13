// src/middlewares/upload.middleware.ts

import multer from "multer";
import { Errors } from "../errors/errors";

const MAX_SIZE = 5 * 1024 * 1024; // 5MB

const storage = multer.memoryStorage();

function fileFilter(
  _req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) {
  const allowedTypes = ["image/jpeg", "image/png"];

  if (!allowedTypes.includes(file.mimetype)) {
    return cb(
      Errors.BAD_REQUEST("Invalid file type. Only JPEG and PNG allowed."),
    );
  }

  cb(null, true);
}

export const upload = multer({
  storage,
  limits: {
    fileSize: MAX_SIZE,
  },
  fileFilter,
});
