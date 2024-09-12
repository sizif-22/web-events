import { auth } from "./firebase.auth";
import { app } from "./firebase.config";
import * as firestore from "firebase/firestore";

const db = firestore.getFirestore(app);
const users = firestore.collection(db, "user");

// User Collection ...

const addUser = async ({
  firstName,
  lastName,
  companyName,
  email,
  photoUrl,
}) => {
  try {
    await firestore.addDoc(users, {
      firstName,
      lastName,
      companyName,
      events: [],
      email,
      photoUrl,
      accountType: "Organizer",
    });
    console.log("User added");
  } catch (e) {
    console.error(`The error is: ${e}`);
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

const updateUserWithEmail = async (email, updates) => {
  try {
    const userQuery = firestore.query(
      users,
      firestore.where("email", "==", email)
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

const getEvents = async (userDoc) => {
  const user = userDoc.data();
  const eventIds = user.events || [];
  const eventsList = await Promise.all(
    eventIds.map(async (eventId) => {
      const eventRef = firestore.doc(db, "events", eventId);
      const eventDoc = await firestore.getDoc(eventRef);
      return { id: eventDoc.id, ...eventDoc.data() };
    })
  );
  return eventsList;
};

export { db, addUser, updateUser, getUser, updateUserWithEmail, getEvents };
