"use client";
import { createContext, useEffect, useState } from "react";
import { checkLoggedIn, checkVerified } from "./firebase/firebase.auth";
import { getUser } from "./firebase/firebase.firestore";
import NavBar from "./components/nav";
import Loading from "./components/loading/loading";
import HowToCreateEvent from "./HomePage body/howToCreateEvent";
import Overview from "./HomePage body/overview";

export const userData = createContext();

const Home = () => {
  const [userState, setUserState] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const isLoggedIn = await checkLoggedIn();
      const isVerified = await checkVerified();

      if (typeof window !== "undefined" && isLoggedIn) {
        const userData = await getUser();
        const user = userData.data();

        setUserState({
          isLoggedIn,
          isVerified,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          photoUrl: user.photoUrl,
          companyName: user.companyName,
          accountType: user.accountType,
        });

        sessionStorage.setItem(
          "userState",
          JSON.stringify({
            isLoggedIn,
            isVerified,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            photoUrl: user.photoUrl,
            companyName: user.companyName,
            accountType: user.accountType,
          })
        );
      }
      setLoading(false);
    };

    checkAuth();
  }, []);
  {
    return loading ? (
      <div className="h-screen flex justify-center items-center">
        <Loading />
      </div>
    ) : (
      <div className="flex flex-col min-h-screen bg-gray-100 text-gray-800">
        <div className="flex-1 flex flex-col lg:flex-row">
          <div className="flex-1 flex flex-col">
            <userData.Provider value={userState}>
              <NavBar className="bg-blue-600 text-white" />
            </userData.Provider>
            <main className="flex-1 p-6 bg-white">
              <div className="ml-auto mr-auto bg-gray-500 h-screen max-w-6xl">
                <Overview/>
                <HowToCreateEvent/>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
};

export default Home;
