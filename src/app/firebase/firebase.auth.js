//firebase/firebase.auth.js

import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { app } from "./firebase.config";
import Cookies from 'js-cookie';

const auth = getAuth(app);

const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const token = await userCredential.user.getIdToken();

    document.cookie = `authToken=${token}; path=/`;

    console.log("User logged in and token saved");
  } catch (error) {
    console.error("Error logging in:", error);
  }
};

// const checkLoggedIn = () => {
//   const token = document.cookie
//     .split("; ")
//     .find((row) => row.startsWith("authToken"))
//     .split("=")[1];

//   if (token) {
//     onAuthStateChanged(auth, (user) => {
//       if (user) {
//         return true;
//       } else {
//         return false;
//       }
//     });
//   } else {
//     return false;
//   }
// };
const checkLoggedIn = async () => {
  // Get the auth token from cookies
  const token = Cookies.get('authToken');

  if (token) {
    return new Promise((resolve) => {
      // Assuming onAuthStateChanged is an async function or returns a promise
      onAuthStateChanged(auth, (user) => {
        if (user) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  } else {
    return false;
  }
};
const logout = async () => {
  try {
    await signOut(auth);
    document.cookie = `authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    console.log("User logged out and token removed");
  } catch (error) {
    console.error("Error logging out:", error);
  }
};

export { login, checkLoggedIn, logout };
