import { FirebaseError } from "firebase/app";
import { UserCredential } from "firebase/auth";

interface IAuthUserReturn {
    signIn?: UserCredential;
    success: boolean;
    error?: FirebaseError;
    errorCode?: string;
}