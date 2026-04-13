// src/modules/auth/auth.service.ts

import bcrypt from "bcrypt";
import { prisma } from "../../database/prisma";
import { Errors } from "../../errors/errors";
import { generateToken } from "../../config/jwt";

import { RegisterInput, LoginInput } from "./auth.schema";

export class AuthService {
  async register(data: RegisterInput) {
    const { name, email, password } = data;

    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      throw Errors.CONFLICT("Email already in use");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const token = generateToken({ sub: user.id });

    return { token };
  }

  async login(data: LoginInput) {
    const { email, password } = data;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw Errors.UNAUTHORIZED("Invalid credentials");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw Errors.UNAUTHORIZED("Invalid credentials");
    }

    const token = generateToken({ sub: user.id });

    return { token };
  }
}
