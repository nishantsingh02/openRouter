import { t } from "elysia";

export namespace AuthModel {
    export const signinSchema = t.Object({
        email: t.String(),
        password: t.String()
    })
    export type signInSchema = typeof signinSchema.static

    export const signinResponse = t.Object({
        token: t.String()
    })
    export type signInResponseSchema = typeof signinResponse.static

    export const signinInvalid = t.Object({
        message: t.Literal("'Invalid username or password'")
    })
    export type signInInvalid = typeof signinInvalid.static
    
    // ----------------------------------------

    export const signupSchema = t.Object({
        email: t.String(),
        password: t.String()
    })
    export type signUpSchema = typeof signupSchema.static

    export const signupResponse = t.Object({
        id: t.String()
    })
    export type signUpResponseSchema = typeof signupResponse.static

    export const signupInvalid = t.Object({
        message: t.Literal("Error while signing up")
    })
    export type signUpInvalid = typeof signupInvalid.static
}