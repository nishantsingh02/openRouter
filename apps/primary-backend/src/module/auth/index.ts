import { config } from 'dotenv';
config({ path: '../../../packages/db/.env' });

import Elysia, { status } from "elysia";
import { AuthModel } from "./models";
import { AuthService } from "./service";


export const app = new Elysia({ prefix: "/auth" })
    .post("/sign-up", async ({ body, status }) => {
        try {
            const userId = await AuthService.signUp({email: body.email, password: body.password})
        return {
            id: String(userId) // bcz we store userId as int not string in db
        }
        } catch (e) {
            console.error(e)
            return status(400, {
                message: "Error while signing up"
            })
        }
    }, {
        body: AuthModel.signupSchema,
        response: {
            200 : AuthModel.signupResponse,
            400 : AuthModel.signupInvalid
        }
    })
    .post("/sign-in", async ( {body} ) => {
        const token = await AuthService.signIn({email: body.email, password: body.password})
        return {
            token: String(token)
        }
    }, {
        body: AuthModel.signupSchema,
        response: {
            200: AuthModel.signinResponse,
            400: AuthModel.signinInvalid
        }
    })