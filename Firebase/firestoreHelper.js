import {addDoc, collection} from "firebase/firestore";
import {database} from "./firebaseSetup";

export default async function writeToDB(collectionName, data) {
    try {
    const docRef = await addDoc(collection(database, collectionName), data);
    console.log(docRef);
    } catch (e) {
        console.error("Error adding document: ", e);
    }


}