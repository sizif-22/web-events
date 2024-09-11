"use client";
import { useEffect, useState } from "react";
import { checkLoggedIn, checkVerified } from "../firebase/firebase.auth";
import { usePathname } from "next/navigation";
import { handleUserState } from "@/lib/user.data";
import { getUser } from "../firebase/firebase.firestore";
import { useDispatch, useSelector } from "react-redux";
const SetData = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user.userState);

  const fetchUserData = async () => {
    const isLoggedIn = await checkLoggedIn();
    const isVerified = await checkVerified();
    if (isLoggedIn) {
      const userData = await getUser();
      const user = userData.data();

      const newUserState = {
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
      if (newUserState != userState) {
        dispatch(handleUserState(newUserState));
      } else {
        const newUserState = {
          isLoggedIn: false,
        };
        
        dispatch(handleUserState(newUserState));
      }
    }
  };

  useEffect(() => {
    fetchUserData();
    // console.log(userState);
    //there is an issue with this dependancy...
  }, [userState]);

  const pathName = usePathname();
  useEffect(() => {
    console.log(pathName);
  }, [pathName]);
  return <></>;
};
export default SetData;
