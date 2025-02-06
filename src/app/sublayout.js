"use client";
import store from "@/lib/store";
import { Provider } from "react-redux";
import { useState, useEffect } from "react";
import Loading from "./components/loading/loading";
import { useDispatch } from "react-redux";
import { db } from "./firebase/firebase.user";
import { checkLoggedIn, auth } from "./firebase/firebase.auth";
import { handleUserState } from "@/lib/user.data";
import * as firestore from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import useAuthListener from "./hooks/useAuthListener";
const SubLayout = ({ child }) => {

  return (
    <Provider store={store}>
      <SubLayout2 child={child} />
    </Provider>
  );
};

const SubLayout2 = ({ child }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    const isLoggedIn = await checkLoggedIn();
    if (isLoggedIn && auth.currentUser) {
      try {
        const userRef = firestore.query(
          firestore.collection(db, "user"),
          firestore.where("email", "==", auth.currentUser.email)
        );

        // Firestore listener for user data updates
        const unsubscribeFirestore = firestore.onSnapshot(
          userRef,
          async (querySnapshot) => {
            if (!querySnapshot.empty) {
              const user = querySnapshot.docs[0].data();
              const userObject = {
                isLoggedIn,
                isVerified: auth.currentUser.emailVerified, // Directly check auth state
                email: user.email,
                username: user.username,
                events: user.events,
                firstName: user.firstName,
                lastName: user.lastName,
                photoUrl: user.photoUrl,
                companyName: user.companyName,
                accountType: user.accountType,
              };
              console.log(userObject);
              dispatch(handleUserState(userObject));
            } else {
              console.log("No user document found");
            }
            if (loading) setLoading(false);
          }
        );

        // Auth listener to track email verification changes
        const unsubscribeAuth = onAuthStateChanged(getAuth(), (user) => {
          if (user) {
            dispatch(
              handleUserState({
                isLoggedIn: true,
                isVerified: user.emailVerified, // Store only serializable data
              })
            );
          }
        });

        return () => {
          unsubscribeFirestore();
          unsubscribeAuth();
        };
      } catch (error) {
        console.error("Error in fetchUserData:", error);
        setLoading(false);
      }
    } else {
      dispatch(handleUserState({ isLoggedIn: false }));
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = fetchUserData();

    return () => {
      if (typeof unsubscribe === "function") {
        unsubscribe();
      }
    };
  }, []);

  return loading ? <Loading /> : <>{child}</>;
};

export default SubLayout;
// "use client";
// import store from "@/lib/store";
// import { Provider } from "react-redux";
// import { useState, useEffect } from "react";
// import Loading from "./components/loading/loading";
// import { useDispatch } from "react-redux";
// import { db } from "./firebase/firebase.user";
// import { checkLoggedIn, auth } from "./firebase/firebase.auth";
// import { handleUserState } from "@/lib/user.data";
// import * as firestore from "firebase/firestore";
// import { getAuth, onAuthStateChanged } from "firebase/auth";

// const SubLayout = ({ child }) => {
//   return (
//     <Provider store={store}>
//       <SubLayout2 child={child} />
//     </Provider>
//   );
// };

// const SubLayout2 = ({ child }) => {
//   const dispatch = useDispatch();
//   const [loading, setLoading] = useState(true);

//   const fetchUserData = async () => {
//     const isLoggedIn = await checkLoggedIn();
//     if (isLoggedIn && auth.currentUser) {
//       try {
//         const userRef = firestore.query(
//           firestore.collection(db, "user"),
//           firestore.where("email", "==", auth.currentUser.email)
//         );

//         // Firestore listener for user data updates
//         const unsubscribeFirestore = firestore.onSnapshot(
//           userRef,
//           async (querySnapshot) => {
//             if (!querySnapshot.empty) {
//               const user = querySnapshot.docs[0].data();
//               const userObject = {
//                 isLoggedIn,
//                 isVerified: auth.currentUser.emailVerified, // Directly check auth state
//                 email: user.email,
//                 username: user.username,
//                 events: user.events,
//                 firstName: user.firstName,
//                 lastName: user.lastName,
//                 photoUrl: user.photoUrl,
//                 companyName: user.companyName,
//                 accountType: user.accountType,
//               };
//               console.log(userObject);
//               dispatch(handleUserState(userObject));
//             } else {
//               console.log("No user document found");
//             }
//             if (loading) setLoading(false);
//           }
//         );

//         return unsubscribeFirestore; // Return Firestore unsubscribe function
//       } catch (error) {
//         console.error("Error in fetchUserData:", error);
//         setLoading(false);
//       }
//     } else {
//       dispatch(handleUserState({ isLoggedIn: false }));
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     let unsubscribe;
//     if (!auth.currentUser) return; // Prevent running if there's no authenticated user

//     const runFetchUserData = async () => {
//       unsubscribe = await fetchUserData(); // Store unsubscribe function
//     };

//     runFetchUserData();

//     return () => {
//       if (unsubscribe) unsubscribe(); // Clean up Firestore listener
//     };
//   }, [auth.currentUser]); // Only re-run when auth state changes

//   // Auth listener to track email verification changes
//   useEffect(() => {
//     const unsubscribeAuth = onAuthStateChanged(getAuth(), (user) => {
//       if (user) {
//         dispatch(
//           handleUserState({
//             isLoggedIn: true,
//             isVerified: user.emailVerified, // Update verification status in real-time
//           })
//         );
//       }
//     });

//     return () => unsubscribeAuth(); // Cleanup auth listener
//   }, []);

//   return loading ? <Loading /> : <>{child}</>;
// };

// export default SubLayout;
