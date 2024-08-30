import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "./firebase.config";

const db = getFirestore(app);

async function fetchData() {
  try {
    const todocsCol = collection(db, "events");
    const snapshot = await getDocs(todocsCol);
    console.log(snapshot);
    // Further processing of snapshot if needed
  } catch (error) {
    console.error("Error fetching documents: ", error);
  }
}
fetchData();
