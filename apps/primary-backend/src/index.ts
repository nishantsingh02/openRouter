// import { Elysia } from "elysia";
// import { app as authApp } from "./module/auth";
// import {app as apiKeyApp} from "./module/apiKeys"
// import {app as modelsApp} from "./module/models"
// import {app as paymentsApp} from "./module/payments"
// import "dotenv/config";

// const app = new Elysia().use(authApp).use(apiKeyApp).use(modelsApp).use(paymentsApp).listen(3000);

// console.log(
//   `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
// );


import { app } from "./app";

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);


