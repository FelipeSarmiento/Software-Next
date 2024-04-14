import {
    signInWithPopup,
    GoogleAuthProvider,
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile
} from 'firebase/auth';

import {FirebaseAuth} from './firebase';

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        const user = result.user;
        const {displayName, email, uid} = user;
        return {
            ok: true,
            displayName,
            email,
            uid
        };
    } catch (error) {
        console.error(error)
    }
}
export const signInWithEmail = async (_email, password) => {
    try {
        const result = await signInWithEmailAndPassword(FirebaseAuth, _email, password).then((userCredentials) => {
            const {displayName, email, uid} = userCredentials.user;
            return {
                ok: true,
                displayName,
                email,
                uid
            };
        }).catch((error) => {
            return {
                ok: false,
                displayName: null,
                email: null,
                uid: null,
                errorMessage: (error.code === 'auth/invalid-credential' ? 'Invalid credentials' : error.code)
            };
        });
        return result;
    } catch (error) {
        console.error('error: ' + error)
    }

}
export const signUpWithEmail = async (_email, password, _name) => {
    try {
        let result = await createUserWithEmailAndPassword(FirebaseAuth, _email, password)
        await updateProfile(result.user, {
            displayName: _name
        })
        const user = result.user;
        const { email, uid} = user;
        return {
            ok: true,
            displayName: _name,
            email,
            uid
        };
    }
    catch (error) {
        console.error(error)
    }
}