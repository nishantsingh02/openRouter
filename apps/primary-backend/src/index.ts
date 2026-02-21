import { Elysia } from "elysia";
import { app as authApp } from "./module/auth";
import {app as apiKeyApp} from "./module/apiKeys"
import "dotenv/config";

const app = new Elysia().use(authApp).use(apiKeyApp).listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);


