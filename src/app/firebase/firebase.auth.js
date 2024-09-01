//firebase/firebase.auth.js

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { app } from "./firebase.config";
import Cookies from "js-cookie";

const auth = getAuth(app);

const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const token = await userCredential.user.getIdToken();
    Cookies.set("authToken", token, { expires: 30 });
    window.location.href = "/";

    console.log("User logged in and token saved");
  } catch (error) {
    console.error("Error logging in:", error);
  }
};

const checkLoggedIn = async () => {
  const token = Cookies.get("authToken");
  if (token) {
    return new Promise((resolve) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          if (user.emailVerified) {
            resolve(true);
          } else {
            resolve(false);
          }
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
    Cookies.remove("authToken");
    console.log("User logged out and token removed");
  } catch (error) {
    console.error("Error logging out:", error);
  }
};

const signup = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await sendEmailVerification(userCredential.user);
    const token = await userCredential.user.getIdToken();
    Cookies.set("authToken", token, { expires: 30 });
  } catch (error) {
    console.log("error is :" + error.message);
  }
};

export { auth, login, logout, checkLoggedIn, signup };
