import { config } from 'dotenv';
config({ path: '../../../packages/db/.env' });

import Elysia from "elysia";
import { AuthModel } from "./models";
import { AuthService } from "./service";
import { secrets } from 'bun';
import jwt from '@elysiajs/jwt';


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
    .use(
        jwt({
            name: "jwt",
            secret: process.env.JWT_SECRET!
        })
    )
    .post("/sign-in", async ( { jwt, body, status, cookie: { auth } } ) => {
        const {CorrectCredentials, userId} = await AuthService.signIn({email: body.email, password: body.password})
        if(CorrectCredentials && userId) {
            const value = await jwt.sign({ userId })
            // so it set the token to the header automatically we do not need to return the token in the body
            auth.set({
            value, // userId for sign the token
            httpOnly: true,
            maxAge: 7 * 86400,
        })
        return {
            message: "Signed in successfully"
        }
        } else {
            return status(400, {
                message: "Invalid username or password"
            })
        }
    }, {
        body: AuthModel.signupSchema,
        response: {
            200: AuthModel.signinResponse,
            400: AuthModel.signinInvalid
        }
    })