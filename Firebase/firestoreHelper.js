import {
    addDoc, collection,
    deleteDoc, doc, getDocs,
    setDoc, getDoc
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
    try {
        const querySnapshot = await getDocs(collection(database, collectionName));
        const data = [];
        if (!querySnapshot.empty) {
            querySnapshot.forEach((docdata) => {
                data.push(docdata.data());
            });
        }
        return data;
    } catch (e) {
        console.error("Error getting documents: ", e);
    }
}

export async function getOneDoc(id, collectionName) {
    try {
        const docRef = doc(database, collectionName, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            console.error("No such document!");
            return null;
        }
    } catch (e) {
        console.error("Error getting document: ", e);
    }
}

export async function updateDoc(id, collectionName, data) {
    try {
        const docRef = doc(database, collectionName, id);
        await setDoc(docRef, data, { merge: true });
    } catch (e) {
        console.error("Error updating document: ", e);
    }
}
