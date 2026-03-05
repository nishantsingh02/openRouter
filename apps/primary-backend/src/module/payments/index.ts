import { config } from 'dotenv';
// config({ path: '../../../packages/db/.env' });
config({ path: '../../../../../packages/db/.env' });

import jwt from "@elysiajs/jwt";
import Elysia from "elysia";
import { PaymentsModel } from "./models";
import { PaymentsService } from "./service";

export const app = new Elysia({ prefix: "payments" })
    .use(
        jwt({
            name: 'jwt',
            secret: process.env.JWT_SECRET!
        })
    )
    .resolve(async ({ cookie: { auth }, status, jwt }) => {
        if (!auth) {
            return status(401)
        }

        const decoded = await jwt.verify(auth.value as string);

        if (!decoded || !decoded.userId) {
            return status(401)
        }

        return {
            userId: decoded.userId as string
        }
    })
    .post("/onramp", async ({ userId, status }) => {
        try {
            const credits = await PaymentsService.onramp(Number(userId));
            return {
                message: "Onramp successful" as const,
                credits
            }
        } catch (e) {
            return status(411, {
                message: "Onramp failed" as const
            })
        }
    }, {
        response: {
            200: PaymentsModel.onrampResponseSchema,
            411: PaymentsModel.onrampFailedResponseSchema
        }
    })