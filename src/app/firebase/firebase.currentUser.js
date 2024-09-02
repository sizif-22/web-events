import { getFirestore, doc, getDoc } from "firebase/firestore";
import { auth } from "./firebase.auth";
const db = getFirestore();

const getCurrentUserData  = async () => {
  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const userDoc = doc(db, "users", user.uid);
          const userSnapshot = await getDoc(userDoc);
          
          if (userSnapshot.exists()) {
            resolve(userSnapshot.data());
          } else {
            resolve(null);
          }
        } catch (error) {
          reject(error);
        }
      } else {
        resolve(null);
      }
    });
  });
};

export { getCurrentUserData  };
