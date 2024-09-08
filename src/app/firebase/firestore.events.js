import * as firestore from "firebase/firestore";
import { app } from "./firebase.config";
import { getUser, updateUser } from "./firebase.firestore";

const db = firestore.getFirestore(app);
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
  const collection = firestore.collection(db, "events");
  const userData = await getUser();
  const user = userData.data();
  console.log("user data : ", user);
  try {
    firestore.addDoc(collection, data).then((res) => {
      updateUser({ events: [...user.events, res.id] });
    });
    console.log("event add successfully! ");
  } catch (e) {
    console.error(`there is an error : ${e}`);
  }
};

export { fetchData, addEvent };
