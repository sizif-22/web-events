"use client";
import { useEffect } from "react";
import { checkLoggedIn, checkVerified } from "./firebase/firebase.auth";
import { getUser } from "./firebase/firebase.firestore";

export default function Home() {
  useEffect(() => {
    const checkAuth = async () => {
      const isLoggedIn = await checkLoggedIn();
      const isVerified = await checkVerified();
      if (typeof window !== "undefined") {
        if (isLoggedIn) {
          let firstName = (await getUser()).data().firstName;
          let lastName = (await getUser()).data().lastName;
          let photoUrl = (await getUser()).data().photoUrl;
          let email = (await getUser()).data().email;
          let companyName = (await getUser()).data().companyName;
          let accountType = (await getUser()).data().accountType;
          let userState = {
            isLoggedIn,
            isVerified,
            email,
            firstName,
            lastName,
            photoUrl,
            companyName,
            accountType,
          };
          sessionStorage.setItem("userState", JSON.stringify(userState));
        } else {
          let userState = {
            isLoggedIn,
          };
          sessionStorage.setItem("userState", JSON.stringify(userState));
        }
      }
    };

    checkAuth();
  }, []);
  return (
    <div className="flex-1 m-1 rounded-md bg-gray-900 overflow-y-auto p-2 custom-div">
      <p>About:</p>
      <p>Long content here that might overflow...</p>
    </div>
  );
}
