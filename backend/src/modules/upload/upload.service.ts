// src/modules/upload/upload.service.ts

import { randomUUID } from "crypto";
import { uploadFile } from "../../config/storage";
import { Errors } from "../../errors/errors";

export class UploadService {
  async upload(file: Express.Multer.File) {
    if (!file) {
      throw Errors.BAD_REQUEST("File not provided");
    }

    const extension = file.originalname.split(".").pop();
    const fileName = `${randomUUID()}.${extension}`;

    const url = await uploadFile({
      file: file.buffer,
      filename: fileName,
      mimetype: file.mimetype,
    });

    return { url };
  }
}
