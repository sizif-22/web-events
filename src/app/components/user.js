"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Loading from "../components/loading/loading";

const UsEr = () => {
  const router = useRouter();
  const [fname, setFname] = useState("");
  const [imgUrl, setImgUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userState = JSON.parse(sessionStorage.getItem("userState"));
      if (userState) {
        setFname(userState.firstName);
        setImgUrl(userState.photoUrl);
      }
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <div
        className="flex items-center space-x-2 cursor-pointer p-2 rounded-lg hover:bg-gray-200 transition-colors duration-300"
        onClick={() => router.push("/account")}
      >
        <h3 className="text-white font-semibold">{fname}</h3>
        <div className="h-12 w-12 rounded-full overflow-hidden flex justify-center items-center bg-gray-300">
          {imgUrl && (
            <Image
              src={imgUrl}
              width={48}
              height={48}
              className="object-cover"
              alt="User Profile"
            />
          )}
        </div>
      </div>
    );
  }
};

export default UsEr;
