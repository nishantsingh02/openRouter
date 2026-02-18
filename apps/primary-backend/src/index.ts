import { Elysia } from "elysia";
import { app as authApp } from "./module/auth";

const app = new Elysia().use(authApp).listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);


