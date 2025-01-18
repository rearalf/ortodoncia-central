import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/database/firebase";
import { FirebaseError } from "firebase/app";
import { IAuthUserReturn, IUpdateUserParams } from "@/interface/User";

class User {
  async authUser(email: string, password: string): Promise<IAuthUserReturn> {
    try {
      const signIn = await signInWithEmailAndPassword(auth, email, password);
      return {
        signIn,
        success: true,
      };
    } catch (error) {
      if (error instanceof FirebaseError)
        return {
          error: error,
          success: false,
          errorCode: error.code,
        };
      return {
        errorCode: "",
        success: false,
      };
    }
  }

  async signOut() {
    try {
      const out = await auth.signOut();
      return {
        out,
        success: true,
      };
    } catch (error) {
      if (error instanceof FirebaseError)
        return {
          error: error,
          success: false,
          errorCode: error.code,
        };
      return {
        errorCode: "",
        success: false,
      };
    }
  }

  async authGetUser() {
    try {
      return auth.currentUser;
    } catch (error) {}
  }

  async updateUser(params: IUpdateUserParams) {
    try {
      const user = auth.currentUser;
      if (user) {
        const update = updateProfile(user, {
          displayName: params.displayName,
          photoURL: params.photoURL,
        });
        return {
          update,
          success: true,
        };
      } else {
        return {
          errorCode: "Not User",
          success: false,
        };
      }
    } catch (error) {
      if (error instanceof FirebaseError)
        return {
          error: error,
          success: false,
          errorCode: error.code,
        };
      return {
        errorCode: "",
        success: false,
      };
    }
  }
}

export default User;
