import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(2).trim(),
    email: z.string().email().toLowerCase().trim(),
    password: z.string().min(6),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// 🔥 tipo da REQUEST (com confirmPassword)
export type RegisterRequest = z.infer<typeof registerSchema>;

// 🔥 tipo da SERVICE (sem confirmPassword)
export type RegisterInput = Omit<RegisterRequest, "confirmPassword">;

export const loginSchema = z.object({
  email: z.string().email().toLowerCase().trim(),
  password: z.string().min(1),
});

export type LoginInput = z.infer<typeof loginSchema>;
