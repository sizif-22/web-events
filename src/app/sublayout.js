"use client";
import store from "@/lib/store";
import { Provider } from "react-redux";
import { useState, useEffect } from "react";
import Loading from "./components/loading/loading";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./firebase/firebase.user";
import { checkLoggedIn, checkVerified } from "./firebase/firebase.auth";
import { handleUserState } from "@/lib/user.data";

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
  const userState = useSelector((state) => state.user.userState);
  const fetchUserData = async () => {
    const isLoggedIn = await checkLoggedIn();
    if (isLoggedIn) {
      const userData = await getUser();
      const user = userData.data();
      const isVerified = await checkVerified();
      const userObject = {
        isLoggedIn,
        isVerified,
        email: user.email,
        events: user.events,
        firstName: user.firstName,
        lastName: user.lastName,
        photoUrl: user.photoUrl,
        companyName: user.companyName,
        accountType: user.accountType,
      };
      dispatch(handleUserState(userObject));
    } else {
      const userObject = {
        isLoggedIn,
      };
      dispatch(handleUserState(userObject));
    }
    setLoading(false);
    // console.log(userState);
  };
  useEffect(() => {
    fetchUserData();
  }, []);
  return loading ? <Loading /> : <>{child}</>;
};
export default SubLayout;
