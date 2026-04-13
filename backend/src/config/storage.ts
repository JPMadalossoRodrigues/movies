// src/config/storage.ts

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { env } from "./env";
import { Errors } from "../errors/errors";

const s3 = new S3Client({
  region: "auto",
  endpoint: env.R2_ENDPOINT,
  credentials: {
    accessKeyId: env.R2_ACCESS_KEY,
    secretAccessKey: env.R2_SECRET_KEY,
  },
});

type UploadParams = {
  file: Buffer;
  filename: string;
  mimetype: string;
};

export async function uploadFile({
  file,
  filename,
  mimetype,
}: UploadParams): Promise<string> {
  const fileKey = filename;

  try {
    await s3.send(
      new PutObjectCommand({
        Bucket: env.R2_BUCKET,
        Key: fileKey,
        Body: file,
        ContentType: mimetype,
      }),
    );

    return `${env.R2_ENDPOINT}/${env.R2_BUCKET}/${fileKey}`;
  } catch (error) {
    console.error(error);
    throw Errors.INTERNAL("File upload failed");
  }
}
