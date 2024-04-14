import {checkingCredentials, login, logout} from "./authSlice";
import {signInWithGoogle, signInWithEmail, signUpWithEmail} from "../../../settings/firebase/providers";

export const checkingAuthentication = () => {
    return async (dispatch) => {
        dispatch(checkingCredentials())
    }
}

export const startGoogleSignIn = () => {
    return async (dispatch) => {
        dispatch(checkingCredentials())

        const result = await signInWithGoogle();
        if (!result.ok) {
            return dispatch(logout())

        }
            return dispatch(login(result))
    }
}

export const startEmailSignIn = (email, password, name) => {
    return async (dispatch) => {
        dispatch(checkingCredentials())
        const result = await signInWithEmail(email, password);
        if (!result.ok) {
            return dispatch(logout(result))
        }
        return dispatch(login(result))
    }
}

export const startEmailSignUp = (email, password, name) => {
    return async (dispatch) => {
        dispatch(checkingCredentials())

        const result = await signUpWithEmail(email, password);
        if (!result.ok) {
            return dispatch(logout())
        }
        return dispatch(login(result))
    }
}