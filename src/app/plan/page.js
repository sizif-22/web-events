"use client";
import Loading from "../components/loading/loading";
import NavBar from "../components/nav";
import { checkLoggedIn ,checkVerified } from "../firebase/firebase.auth";
import Plan from "./plan";
import { useState, useEffect, createContext } from "react";

export const userDataPlan = createContext();

export default function Plans() {
  const [userState, setUserState] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem("userState")) {
      const data = JSON.parse(sessionStorage.getItem("userState"));
      setUserState(data); // Set the state
      setLoading(false);
    } else {
      const checkAuth = async () => {
        const isLoggedIn = await checkLoggedIn();
        const isVerified = await checkVerified();

        if (typeof window !== "undefined" && isLoggedIn) {
          const userData = await getUser();
          const user = userData.data();

          const newUserState = {
            isLoggedIn,
            isVerified,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            photoUrl: user.photoUrl,
            companyName: user.companyName,
            accountType: user.accountType,
          };

          setUserState(newUserState);

          sessionStorage.setItem("userState", JSON.stringify(newUserState));
        }
        setLoading(false);
      };

      checkAuth();
    }
  }, []);

  // Log userState when it changes
  useEffect(() => {
    if (userState) {
    }
  }, [userState]);

  return loading ? (
    <Loading />
  ) : (
    <userDataPlan.Provider value={userState}> 
      <div className="h-screen">
        <div className="plans-page p-6 bg-gray-100 min-h-screen">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Choose Your Plan
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <Plan
              title={"Plan 1"}
              description={"Basic features and support"}
              price={"$20"}
            />
            <Plan
              title={"Plan 2"}
              description={"Advanced features and priority support"}
              price={"$50"}
            />
            <Plan
              title={"Plan 3"}
              description={"All features plus dedicated support"}
              price={"$60"}
            />
          </div>
        </div>
      </div>
    </userDataPlan.Provider>
  );
}
