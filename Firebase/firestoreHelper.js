import {addDoc, collection, deleteDoc, getDocs} from "firebase/firestore";
import {database} from "./firebaseSetup";

export async function writeToDB(collectionName, data) {
    try {
    const docRef = await addDoc(collection(database, collectionName), data);
    console.log(docRef);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export async function deleteDB(deletedId, collectionName) {
    try {
        const rmDoc = await deleteDoc(collection(database, collectionName), deletedId);
        console.log('aabbcc', rmDoc);
    } catch (e) {
        console.error("Error deleting document: ", e);
    }
}

export async function deletaAllDB(collectionName) {
    try {
        const allDocs = await getDocs(collection(database, collectionName));
        allDocs.forEach((doc) => {
            deleteDB(doc.id, collection(database, collectionName));
        });
    } catch (e) {
        console.error("Error deleting all documents: ", e);
    }
}