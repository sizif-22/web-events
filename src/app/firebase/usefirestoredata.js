import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "./firebase.config";

const db = getFirestore(app);
async function fetchData() {
  try {
    const todocsCol = collection(db, "events");
    const snapshot = await getDocs(todocsCol);
    const eventsList = snapshot.docs.map((event) => event.data());
    console.log(eventsList);
  } catch (error) {
    console.error("Error fetching documents: ", error);
  }
}


async function addData() {
  const eventsCollection = collection(db, "events");
  try {
    await addDoc(eventsCollection, {
      name: "my new Event",
    });
    console.log("event add successfully! ");
  } catch (e) {
    console.error(`there is an error : ${e}`);
  }
}

export {fetchData , addData};