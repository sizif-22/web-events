"use client";
import { checkVerified } from "../firebase/firebase.auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Theme from "./theme";
import Loading from "../components/loading/loading";

export default function Template() {
  const router = useRouter();
  const [verified, setVerified] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const isVerified = await checkVerified();
      setVerified(isVerified);
      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className=" h-screen w-screen flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  if (!verified) {
    router.push("./");
    return null;
  }

  return (
    <div>
      <Theme
        Title={"Card Title"}
        path={"./eventCreation"}
        description={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco.`}
      />
    </div>
  );
}
