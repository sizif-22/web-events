"use client";
import { useEffect, useState } from "react";
import { addEvent } from "@/app/firebase/firestore.events";
import standards from "./standards.json";
import { getUser } from "@/app/firebase/firebase.firestore";
import Loading from "@/app/components/loading/loading";
import { useRouter } from "next/navigation";
const Editor = () => {
  const router = useRouter();
  const [title, setTitle] = useState(`${standards.title}`);
  const [description, setDescription] = useState(`${standards.description}`);
  const [loading, setLoading] = useState(false);
  const handleClick = async () => {
    setLoading(true);
    const userData = await getUser();
    const user = userData.data();
    const data = {
      title,
      description,
      organizer: user.email,
    };
    addEvent(data);
    router.push("/account");
  };

  return loading ? (
    <Loading />
  ) : (
    <div className="bg-white h-screen">
      <label htmlFor="title">Title : </label>
      <input
        name="title"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        value={title}
      />
      <br />
      <label htmlFor="description">Description : </label>
      <input
        htmlFor="description"
        onChange={(e) => {
          setDescription(e.target.value);
        }}
        value={description}
      />
      <button onClick={handleClick}>Save</button>
    </div>
  );
};
export default Editor;
