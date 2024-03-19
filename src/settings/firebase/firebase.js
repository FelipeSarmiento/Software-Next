import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {collection, doc, getDoc, getFirestore, setDoc} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBxqy1ctshYk5CHBBnJ_xkU2F-WhjYyQsU",
    authDomain: "myportfolio-5c02c.firebaseapp.com",
    projectId: "myportfolio-5c02c",
    storageBucket: "myportfolio-5c02c.appspot.com",
    messagingSenderId: "268138940621",
    appId: "1:268138940621:web:ba710c319b25a8b55c8184",
    measurementId: "G-K0VR7R4TC3"
};

const app = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(app);
export const db = getFirestore(app);

export async function fetchDataFromFirestore(idUser) {
    const collectionRef = collection(db, `/itemsDashboard/dashboard/itemsDashboard/`);
    const resp = await getDoc(doc(collectionRef, idUser))
    if (resp.data() !== undefined) {
        if (Object.keys(resp.data()).length > 0) {
            return resp.data();
        }
    }
    await setDoc(doc(collectionRef, idUser), {});
    return undefined;

}

export async function saveDataToFirestore(data, idUser) {
    const dataToSave = {...data}
    const newDoc = doc(collection(db, '/itemsDashboard/dashboard/itemsDashboard/'), idUser);
    await setDoc(newDoc, dataToSave, {merge: true});
}