// src/modules/auth/auth.routes.ts

import { Router } from "express";
import { AuthController } from "./auth.controller";
import { validate } from "../../middlewares/validate.middleware";
import { registerSchema, loginSchema } from "./auth.schema";

const router = Router();
const controller = new AuthController();

router.post(
  "/register",
  validate({ body: registerSchema }),
  controller.register.bind(controller),
);

router.post(
  "/login",
  validate({ body: loginSchema }),
  controller.login.bind(controller),
);

export default router;
