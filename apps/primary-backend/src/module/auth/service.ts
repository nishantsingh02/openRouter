import { AuthModel } from "./models";

export abstract class AuthService {
    static async signIn({email, password}: AuthModel.signInSchema) {
        // db call to check the user exist or not
        return "123"
    }

    static async signUp( {email, password}: AuthModel.signUpSchema ) {
        return "token-123"
    }
}

