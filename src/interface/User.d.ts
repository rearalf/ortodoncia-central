import { FirebaseError } from "firebase/app";
import { UserCredential, UserInfo } from "firebase/auth";

interface IAuthUserReturn {
    signIn?: UserCredential;
    success: boolean;
    error?: FirebaseError;
    errorCode?: string;
}

interface IUserState extends UserInfo {}
