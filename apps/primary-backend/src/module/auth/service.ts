import { AuthModel } from "./models";
import {prisma} from "db"
import "dotenv/config";

export abstract class AuthService {
    static async signIn({email, password}: AuthModel.signInSchema) {
       
    }

    static async signUp( {email, password}: AuthModel.signUpSchema ) {
        const user = await prisma.user.create({
            data: {
                email,
                password
            }
        })
        return user.id
    }
}

