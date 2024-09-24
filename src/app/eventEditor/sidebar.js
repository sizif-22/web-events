"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Alert from "../components/alert/alert";
import { uploadEventImage } from "../firebase/firebase.storage";
import { checkIfEventExist, addEvent } from "../firebase/firestore.events";
import { handleDate, handleTime, handleWhere } from "@/lib/editor.data";
import {
  handleValid,
  handleShowFormEditor,
  handleLoading,
} from "@/lib/editor.data.consts";
const SideBar = ({ theme }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [id, setId] = useState("");

  const [logoUrl, setLogoUrl] = useState();
  const [image1Url, setImage1Url] = useState();
  const [image2Url, setImage2Url] = useState();

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [where, setWhere] = useState("");
  const [error, setError] = useState(false);
  const [routeName, setRouteName] = useState("");
  const [errormessage, setErrorMessage] = useState(
    "Route field can't be empty"
  );

  const { email } = useSelector((state) => state.user.userState);
  const { valid, showFormEditor } = useSelector((state) => state.editorConsts);
  const {
    title,
    organization,
    head1,
    body1,
    logo,
    img1,
    img2,
    features,
    form,
    featuresTitle,
  } = useSelector((state) => state.editor);
  useEffect(() => {
    console.log("img1 :", img1);
  }, [img1]);
  useEffect(() => {
    if (routeName == "") {
      console.log("l2", routeName);
      return;
    } else {
      const newId = routeName.toLowerCase().trim().replace(/\s+/g, "-");
      setId(newId);
      const func = async () => {
        const exist = await checkIfEventExist(newId);
        setErrorMessage(exist ? "This title is already taken" : "");
        dispatch(handleValid(!exist));
      };
      func();
    }
  }, [routeName]);
  const handleEventCreation = async () => {
    dispatch(handleLoading(true));
    setError(false);

    if (!date || !time || !where) {
      setError(true);
      dispatch(handleLoading(false));
      return;
    }

    // try {
      let logoUrl ="", image1Url="", image2Url="";

      if (logo) {
        logoUrl = await uploadEventImage({ dir: "EventImages", file: logo });
      }
      if (img1) {
        image1Url = await uploadEventImage({ dir: "EventImages", file: img1 });
      }
      if (img2) {
        image2Url = await uploadEventImage({ dir: "EventImages", file: img2 });
      }

      const eventObject = {
        title,
        organizer: email,
        organization,
        head1,
        body1,
        logo: logoUrl,
        img1: image1Url,
        img2: image2Url,
        features,
        featuresTitle,
        date,
        time,
        where,
        form,
        theme,
      };

      console.log(eventObject);
      await addEvent(id, eventObject);
      router.push("/account");
   // } catch (error) {
      //console.error("Error creating event:", error);
      //setError(true);
   // }
  };
  const handleRoute = async (e) => {
    const value = e.target.value;
    setRouteName(value);
  };

  return (
    <div className="col-span-1 h-screen relative p-3">
      <div className="mt-5 mb-5">
        {routeName == "" && (
          <Alert description={"Route field can't be empty"} />
        )}
        {!valid && <Alert description={errormessage} />}
        {error && <Alert description="You have to fill all the fields" />}
      </div>

      <div className="space-y-4">
        <InputField
          label="Route Name"
          name="routeName"
          onChange={handleRoute}
          required
        />
        <InputField
          label="Event Date"
          name="date"
          type="date"
          onChange={(e) => {
            setDate(e.target.value);
            dispatch(handleDate(e.target.value));
          }}
          required
        />
        <InputField
          label="Event Time"
          name="time"
          type="time"
          onChange={(e) => {
            setTime(e.target.value);
            dispatch(handleTime(e.target.value));
          }}
          required
        />
        <InputField
          label="Event Location"
          name="where"
          onChange={(e) => {
            setWhere(e.target.value);
            dispatch(handleWhere(e.target.value));
          }}
          required
        />

        <button
          className="bg-slate-400 text-black p-2 rounded-md hover:opacity-80 transition-all"
          onClick={() => dispatch(handleShowFormEditor(!showFormEditor))}
        >
          Toggle Form Editor
        </button>
      </div>

      {routeName != "" && valid && (
        <button
          className="bg-slate-400 text-black p-2 rounded-md hover:opacity-80 transition-all absolute bottom-5 right-5"
          onClick={handleEventCreation}
        >
          Create
        </button>
      )}
    </div>
  );
};

const InputField = ({ label, name, type = "text", onChange, required }) => (
  <div>
    <label htmlFor={name} className="text-white">
      {label} {required && <span className="text-red-600">*</span>}
    </label>
    <input
      type={type}
      name={name}
      onChange={onChange}
      className="w-full mt-1 p-2 rounded-md"
    />
  </div>
);

export default SideBar;
