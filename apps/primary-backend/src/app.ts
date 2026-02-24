import { Elysia } from "elysia";
import { app as authApp } from "./module/auth";
import { app as apiKeyApp } from "./module/apiKeys";
import { app as modelsApp } from "./module/models";
import { app as paymentsApp } from "./module/payments";
import "dotenv/config";

export const app = new Elysia()
  .use(authApp)
  .use(apiKeyApp)
  .use(modelsApp)
  .use(paymentsApp)

export type App = typeof app;


