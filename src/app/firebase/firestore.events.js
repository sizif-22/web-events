import * as firestore from "firebase/firestore";
import { app } from "./firebase.config";
import { getUser, updateUser } from "./firebase.firestore";

const db = firestore.getFirestore(app);
//fetch all events
async function fetchData() {
  try {
    const todocsCol = firestore.collection(db, "events");
    const snapshot = await firestore.getDocs(todocsCol);
    const eventsList = snapshot.docs.map((event) => event.data());
    console.log(eventsList);
  } catch (error) {
    console.error("Error fetching documents: ", error);
  }
}

const addEvent = async (data) => {
  // data is an object with a variable called 'title'
  const collectionRef = firestore.collection(db, "events");
  const userData = await getUser();
  const user = userData.data();
  console.log("user data : ", user);

  try {
    // Use the title as the document ID
    const title = String(data.title).toLowerCase();
    const docRef = firestore.doc(collectionRef, title);
    await firestore.setDoc(docRef, data);

    // Update the user's events with the new document ID
    updateUser({ events: [...user.events, data.title] });
    console.log("Event added successfully!");
  } catch (e) {
    console.error(`There was an error: ${e}`);
  }
};

const checkIfEventExist = async (id) => {
  try {
    const docRef = firestore.doc(db, "events", id);

    const docSnap = await firestore.getDoc(docRef);

    return docSnap.exists();
  } catch (error) {
    console.error("Error checking if event exists: ", error);
    return false;
  }
};
//fetch a specific event with its id
const fetchEvent = async (id) => {
  try {
    const docRef = firestore.doc(db, "events", id);

    const docSnap = await firestore.getDoc(docRef);

    return docSnap.data();
  } catch (error) {
    console.error("Error checking if event exists: ", error);
    return {};
  }
};

export { fetchData, addEvent, checkIfEventExist, fetchEvent };
