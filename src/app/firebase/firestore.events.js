import * as firestore from "firebase/firestore";
import { app } from "./firebase.config";
import { getUser, updateUser } from "./firebase.user";

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
const addEvent = async (id, data) => {
  const collectionRef = firestore.collection(db, "events");
  const userData = await getUser();
  const user = userData.data();
  const { date, time, ...restData } = data;
  const dateTimeString = `${date}T${time}`;
  const dateTime = firestore.Timestamp.fromDate(new Date(dateTimeString));
  const updatedData = {
    ...restData,
    dateTime,
    date,
    time,
  };

  try {
    const docRef = firestore.doc(collectionRef, id);
    await firestore.setDoc(docRef, updatedData);
    await updateUser({ events: [...user.events, id] });
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

const addJoinedEvent = async (eventId, joinedData) => {
  try {
    const eventDocRef = firestore.doc(db, "events", eventId);
    const joinedCollectionRef = firestore.collection(
      eventDocRef,
      "participants"
    );
    const newJoinedDocRef = firestore.doc(joinedCollectionRef);
    const dataWithTimestamp = {
      ...joinedData,
      joinedAt: firestore.serverTimestamp(),
    };
    await firestore.setDoc(newJoinedDocRef, dataWithTimestamp);
    console.log("Joined event added successfully!");
    return newJoinedDocRef.id;
  } catch (error) {
    console.error("Error adding joined event: ", error);
    throw error;
  }
};
const fetchAllEvents = async () => {
  try {
    const eventsCollectionRef = firestore.collection(db, "events");

    const querySnapshot = await firestore.getDocs(eventsCollectionRef);
    let eventsArray = [];
    const eventsObject = querySnapshot.docs.reduce((acc, doc) => {
      acc[doc.id] = {
        id: doc.id,
        ...doc.data(),
      };
      eventsArray.push(acc[doc.id]);
      return acc;
    }, {});

    return eventsArray;
  } catch (error) {
    console.error("Error fetching all events: ", error);
    throw error;
  }
};
export {
  db,
  fetchData,
  addEvent,
  checkIfEventExist,
  fetchEvent,
  addJoinedEvent,
  fetchAllEvents,
};
