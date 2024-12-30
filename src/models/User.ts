import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/database/firebase";
import { FirebaseError } from "firebase/app";
import { IAuthUserReturn } from "@/interface/User";

class User {
    async authUser(email: string, password: string): Promise<IAuthUserReturn> {
        try {
            const signIn = await signInWithEmailAndPassword(auth, email, password)
            return {
                signIn,
                success: true,
            };
        } catch (error) {
            if (error instanceof FirebaseError)
                return {
                    error: error,
                    success: false,
                    errorCode: error.code
                };
            return {
                errorCode: "",
                success: false,
            };
        }
    }

    async signOut() {
        try {
            const out = await auth.signOut()
            return {
                out,
                success: true,
            }
        } catch (error) {
            if (error instanceof FirebaseError)
                return {
                    error: error,
                    success: false,
                    errorCode: error.code
                };
            return {
                errorCode: "",
                success: false,
            };
        }
    }
}

export default User
