import { AuthModel } from "./models";
import { prisma } from "db";
import "dotenv/config";
import { status } from "elysia";
import { jwt } from "@elysiajs/jwt";

export abstract class AuthService {
    // This method only returns a boolean using early return pattern
  static async signIn({ email, password }: AuthModel.signInSchema) {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      return {CorrectCredentials: false };
    }

    if (!await Bun.password.verify(password, user.password)) {
        return {CorrectCredentials: false }
    }

    return {CorrectCredentials: true, userId: user.id.toString() }
  }

  static async signUp({ email, password }: AuthModel.signUpSchema) {
    const user = await prisma.user.create({
      data: {
        email,
        password: await Bun.password.hash(password),
      },
    });
    return user.id;
  }
}
