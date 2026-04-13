// src/modules/upload/upload.controller.ts

import { Request, Response } from "express";
import { UploadService } from "./upload.service";

const service = new UploadService();

export class UploadController {
  async upload(req: Request, res: Response) {
    const result = await service.upload(req.file as Express.Multer.File);

    return res.status(201).json(result);
  }
}
