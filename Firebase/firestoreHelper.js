import {
    addDoc, collection,
    deleteDoc, doc, getDocs,
    setDoc
} from "firebase/firestore";
import { database } from "./firebaseSetup";

export async function writeToDB(collectionName, data) {
    try {
        const docRef = await addDoc(collection(database, collectionName), data);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export async function deleteDB(deletedId, collectionName) {
    try {
        const rmDoc = await deleteDoc(doc(database, collectionName, deletedId));
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
    if (goalId === 'No ID') {
        console.log("No ID provided");
    }
    try {
        const docRef = doc(database, collectionName, goalId);
        await setDoc(docRef, { warning: true }, { merge: true });
    } catch (e) {
        console.error("Error adding warning field: ", e);
    }
}

export async function getAllDocs(collectionName) {
    const querySnapshot = await getDocs(collection(database, collectionName));
    const data = [];
    try{
    if (querySnapshot.empty) {
    querySnapshot.forEach((doc) => {
        data.push(doc.data());
    });
    return data;
} }catch (e) {
    console.error("Error getting documents: ", e);
}
}
