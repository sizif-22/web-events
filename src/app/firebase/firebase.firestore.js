import { auth } from "./firebase.auth";
import { app } from "./firebase.config";
import * as firestore from "firebase/firestore";
const db = firestore.getFirestore(app);
const users = firestore.collection(db, "user");

//user Collection ...

const addUser = async (firstName, lastName, email, photoUrl) => {
  try {
    await firestore.addDoc(users, {
      firstName,
      lastName,
      email,
      photoUrl,
    });
    console.log("user added");
  } catch (e) {
    console.error(`the error is : ${e}`);
  }
};

const updateUser = async (updates) => {
  try {
    const userQuery = firestore.query(
      users,
      firestore.where("email", "==", auth.currentUser.email)
    );
    const querySnapshot = await firestore.getDocs(userQuery);
    if (querySnapshot.empty) {
      console.log("No matching user found");
      return;
    }
    const userDoc = querySnapshot.docs[0];
    const userDocRef = firestore.doc(db, "user", userDoc.id);
    await firestore.updateDoc(userDocRef, updates);
    console.log("User updated");
  } catch (e) {
    console.error(`The error is: ${e}`);
  }
};

const getUser = async () => {
  try {
    const userQuery = firestore.query(
      users,
      firestore.where("email", "==", auth.currentUser.email)
    );
    const querySnapshot = await firestore.getDocs(userQuery);
    if (querySnapshot.empty) {
      console.log("No matching user found");
      return null;
    }
    const userDoc = querySnapshot.docs[0];
    return userDoc;
  } catch (e) {
    console.error(`The error is: ${e}`);
    return null;
  }
};

export { addUser, updateUser , getUser };