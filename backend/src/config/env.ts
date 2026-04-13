import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  PORT: z
    .string()
    .default("3000")
    .transform((val) => Number(val)),

  DATABASE_URL: z.string().min(1),

  JWT_SECRET: z.string().min(1),
  JWT_EXPIRES_IN: z.string().min(1),

  CORS_ORIGIN: z.string().default("*"),

  R2_ENDPOINT: z.string().min(1),
  R2_ACCESS_KEY: z.string().min(1),
  R2_SECRET_KEY: z.string().min(1),
  R2_BUCKET: z.string().min(1),

  RESEND_API_KEY: z.string(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("❌ Invalid environment variables:", parsedEnv.error.format());
  throw new Error("Invalid environment variables");
}

export const env = parsedEnv.data;
