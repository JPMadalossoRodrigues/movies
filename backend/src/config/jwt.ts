import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { env } from "./env";
import { Errors } from "../errors/errors";

type TokenPayload = {
  sub: number;
};

export function generateToken(payload: TokenPayload): string {
  const options: SignOptions = {
    expiresIn: env.JWT_EXPIRES_IN as SignOptions["expiresIn"],
  };

  return jwt.sign(payload, env.JWT_SECRET, options);
}

export function verifyToken(token: string): TokenPayload {
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);

    if (typeof decoded !== "object" || decoded === null) {
      throw Errors.UNAUTHORIZED("Invalid token");
    }

    const payload = decoded as JwtPayload;

    if (!payload.sub) {
      throw Errors.UNAUTHORIZED("Invalid token");
    }

    return {
      sub: Number(payload.sub),
    };
  } catch {
    throw Errors.UNAUTHORIZED("Invalid token");
  }
}
