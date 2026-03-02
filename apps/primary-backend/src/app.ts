import { Elysia } from "elysia";
import { app as authApp } from "./module/auth";
import { app as apiKeyApp } from "./module/apiKeys";
import { app as modelsApp } from "./module/models";
import { app as paymentsApp } from "./module/payments";
import cors from "@elysiajs/cors"
import "dotenv/config";

export const app = new Elysia()
.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true
    })
  )
  .use(authApp)
  .use(apiKeyApp)
  .use(modelsApp)
  .use(paymentsApp)

export type App = typeof app;


