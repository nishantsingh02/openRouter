import { config } from 'dotenv';
config({ path: '../../../packages/db/.env' });

import Elysia, { status } from "elysia";
import jwt from "@elysiajs/jwt";
import { ApiKeyModel } from "../apiKeys/models";
import { ApiKeyService } from "./service";

export const app = new Elysia({ prefix: "/api-keys" })
    .use(
        jwt({
            name: 'jwt',
            secret: process.env.JWT_SECRET!
        })
    )
    // read cookies and extract the needed part like userId in this case.
    .resolve(async ({cookie: { auth }, status, jwt}) => {
        if(!auth) {
            return status(401)
        }

        const decoded = await jwt.verify(auth.value as string);

        if(!decoded || !decoded.userId) {
            return status(401)
        }
        return {
            userId: decoded.userId as string // this is now avalable for other routes
        }
    })
    .post("/", async ({ userId, body }) => {
        const {apiKey, id} = await ApiKeyService.createApiKey(body.name, Number(userId))
        return {
            id,
            apiKey
        }
    }, {
        body: ApiKeyModel.createApiKeySchema,
        response: {
            200: ApiKeyModel.createApiKeyResponse
        }
    })
    .get("/", async ({userId}) => {
        const apiKeys = await ApiKeyService.getApikeys(Number(userId))
        return {
            apiKeys
        }
    }, {
        response: {
            200: ApiKeyModel.getApiKeyResponseSchema
        }
    })
    .put("/", async ({ userId, body, status }) => {
        try {
            await ApiKeyService.updateApiKeyDisabled(Number(body.id), (Number(userId)), body.disable);
            return {
                message: "Disabling API-KEY successfully"
            }
        } catch (err) {
            return status(411, {
                message: "Disabling API-KEY unsuccessfully"
            })
        }
    }, {
        body: ApiKeyModel.updateApiKeySchema ,
        response: {
            200: ApiKeyModel.updateApiKeyResponse,
            411: ApiKeyModel.updateApiKeyFailedResponse
        }
    })
    .delete("/:id", async ({userId , params: { id }, status}) => {
        try {
            await ApiKeyService.deleteApiKey(Number(userId),  Number(id));
            return {
                message: "API-KEY deleted successfully"
            }
        } catch (e) {
            return status(411, {
                message: "Disabling API-KEY unsuccessfully"
            })
        }
    }, {
        response: {
            200: ApiKeyModel.deleteApiKeyResponse,
            411: ApiKeyModel.deleteApiKeyFailedResponse
        }
    })