import * as fireAuth from "firebase/auth";
import { app } from "./firebase.config";
import Cookies from "js-cookie";
const auth = fireAuth.getAuth(app);

let currentUser = auth.currentUser || null;

const login = async (email, password) => {
  try {
    const userCredential = await fireAuth.signInWithEmailAndPassword(
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
      fireAuth.onAuthStateChanged(auth, (user) => {
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
const verify = async () => {
  return new Promise((resolve, reject) => {
    fireAuth.onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (!user.emailVerified) {
          try {
            await fireAuth.sendEmailVerification(user);

            resolve(true);
          } catch (error) {
            reject(error);
          }
        } else {
          resolve(false);
        }
      } else {
        resolve(false);
      }
    });
  });
};

const checkVerified = async () => {
  const token = Cookies.get("authToken");
  if (token) {
    return new Promise((resolve) => {
      fireAuth.onAuthStateChanged(auth, (user) => {
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
    await fireAuth.signOut(auth);
    Cookies.remove("authToken");
    sessionStorage.removeItem("userState");
  } catch (error) {}
};

const signup = async (email, password) => {
  try {
    const userCredential = await fireAuth.createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await fireAuth.sendEmailVerification(userCredential.user);
    const token = await userCredential.user.getIdToken();
    Cookies.set("authToken", token, { expires: 30 });
    // window.location.href = "/";
    console.log("User signed up and token saved");
  } catch (error) {
    console.error("Error signing up:", error);
  }
};

export {
  auth,
  login,
  logout,
  checkLoggedIn,
  signup,
  checkVerified,
  verify,
  currentUser,
};
