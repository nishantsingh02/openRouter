import { config } from "dotenv";
config({ path: "../../../packages/db/.env" });

import { Elysia } from "elysia";
import { AuthModel } from "./models";
import { AuthService } from "./service";
import jwt from "@elysiajs/jwt";

export const app = new Elysia({ prefix: "/auth" })
  .post(
    "/sign-up",
    async ({ body, status }) => {
      try {
        const userId = await AuthService.signUp({
          email: body.email,
          password: body.password,
        });
        return {
          id: String(userId), // bcz we store userId as int not string in db
        };
      } catch (e) {
        console.error(e);
        return status(400, {
          message: "Error while signing up",
        });
      }
    },
    {
      body: AuthModel.signupSchema,
      response: {
        200: AuthModel.signupResponse,
        400: AuthModel.signupInvalid,
      },
    },
  )
  .use(
    jwt({
      name: "jwt",
      secret: process.env.JWT_SECRET!,
    }),
  )
  .post(
    "/sign-in",
    async ({ jwt, body, status, cookie: { auth } }) => {
      const { CorrectCredentials, userId } = await AuthService.signIn({
        email: body.email,
        password: body.password,
      });
      if (CorrectCredentials && userId) {
        const value = await jwt.sign({ userId });
        // Set the JWT as an httpOnly cookie so the frontend sends it automatically
        auth.set({
          value,
          httpOnly: true,
          maxAge: 7 * 86400,
          path: "/",
          sameSite: "none",
          secure: false,
        });
        return {
          message: "Signed in successfully",
        };
      } else {
        return status(403, {
          message: "Invalid username or password",
        });
      }
    },
    {
      body: AuthModel.signinSchema,
      response: {
        200: AuthModel.signinResponse,
        403: AuthModel.signinInvalid,
      },
    },
  );
