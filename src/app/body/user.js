"use client";
import { useState, useEffect } from "react";
import { getUser } from "../firebase/firebase.firestore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Loading from "../components/loading/loading";

const UsEr = () => {
  const router = useRouter();
  const [fname, setFname] = useState("");
  const [imgUrl, setImgUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUser().then((res) => {
      setFname(res.data().firstName);
      setImgUrl(res.data().photoUrl);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <div
        className="inline-flex justify-between items-center transition-all hover:bg-gray-800 bg-transparent p-2 rounded-lg m-0 h-14 cursor-pointer"
        onClick={() => {
          router.push("/account");
        }}
      >
        <p className="mr-2 text-white">{fname} |</p>
        <div className="h-16 w-16 rounded-full overflow-hidden ml-2 p-0 flex justify-center items-center">
          {imgUrl && (
            <Image
              src={imgUrl}
              width={60}
              height={60}
              className="object-cover p-0"
              alt="test"
            />
          )}
        </div>
      </div>
    );
  }
};

export default UsEr;
