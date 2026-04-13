// src/modules/auth/auth.controller.ts

import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { registerSchema, loginSchema } from "./auth.schema";

const authService = new AuthService();

export class AuthController {
  async register(req: Request, res: Response) {
    const parsed = registerSchema.parse(req.body);

    const { confirmPassword, ...data } = parsed;

    const result = await authService.register(data);

    return res.status(201).json(result);
  }

  async login(req: Request, res: Response) {
    const data = loginSchema.parse(req.body);

    const result = await authService.login(data);

    return res.json(result);
  }
}
