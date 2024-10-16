import {addDoc, collection, deleteDoc, doc, getDocs} from "firebase/firestore";
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
        const rmDoc = await deleteDoc(doc(database, collectionName, deletedId));
        console.log('aabbcc', rmDoc);
    } catch (e) {
        console.error("Error deleting document: ", e);
    }
}

export async function deletaAllDB(collectionName) {
    try {
        const allDocs = await getDocs(collection(database, collectionName));
        allDocs.forEach((doc) => {
            deleteDB(doc.id, 'goals');
        });
    } catch (e) {
        console.error("Error deleting all documents: ", e);
    }
}

export async function addWarningField(collectionName, goalId) {
    try {
        const docRef = doc(database, collectionName, goalId);
        await updateDoc(docRef, {
            warning: true,
        });
    } catch (e) {
        console.error("Error adding warning field: ", e);
    }

}