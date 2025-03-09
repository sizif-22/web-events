"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Alert from "../components/alert/alert";
import { uploadEventImage } from "../firebase/firebase.storage";
import { checkIfEventExist, addEvent } from "../firebase/firestore.events";
import CollapsibleSection from "./collapsibleSection";
import ColorPicker from "./colorPicker";
import InputField from "./inputField";
import {
  handleDate,
  handleTime,
  handleWhere,
  handlePrimaryColor,
  handleSecondaryColor,
  handleAccentColor,
  handleTextColor,
} from "@/lib/editor.data";
import {
  handleValid,
  handleShowFormEditor,
  handleLoading,
} from "@/lib/editor.data.consts";

const SideBar = ({ theme }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [id, setId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [where, setWhere] = useState("");
  const [error, setError] = useState(false);
  const [routeName, setRouteName] = useState("");
  const [errormessage, setErrorMessage] = useState(
    "Route field can't be empty"
  );

  const { userId, email, firstName, lastName, plan, accountType } = useSelector(
    (state) => state.user.userState
  );
  // console.log(email,plan);
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
    colors,
    footer,
  } = useSelector((state) => state.editor);

  useEffect(() => {
    if (routeName === "") {
      return;
    }
    const newId = routeName.toLowerCase().trim().replace(/\s+/g, "-");
    setId(newId);
    const checkRoute = async () => {
      const exist = await checkIfEventExist(newId);
      setErrorMessage(exist ? "This title is already taken" : "");
      dispatch(handleValid(!exist));
    };
    checkRoute();
  }, [routeName, dispatch]);

  const handleEventCreation = async () => {
    if (plan?.credit === 0 && accountType === "Organizer") return;
    dispatch(handleLoading(true));
    setError(false);

    if (!date || !time || !where) {
      setError(true);
      dispatch(handleLoading(false));
      return;
    }

    try {
      let logoUrl = "",
        image1Url = "",
        image2Url = "";

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
        organizer: {
          name: `${firstName} ${lastName}`,
          email,
          userId,
        },
        organization,
        nofparticipants: 0,
        head1,
        body1,
        logo: logoUrl,
        img1: image1Url,
        img2: image2Url,
        features,
        featuresTitle,
        date,
        time,
        location: where,
        form,
        theme,
        colors,
        footer,
      };

      await addEvent(id, eventObject);
      router.replace("/console");
    } catch (error) {
      console.error("Error creating event:", error);
      setError(true);
      dispatch(handleLoading(false));
    }
  };

  return (
    <div className="col-span-1 h-screen bg-slate-800 p-6 overflow-y-auto">
      <div className="mb-6">
        {routeName === "" && <Alert description="Route field can't be empty" />}
        {!valid && <Alert description={errormessage} />}
        {error && <Alert description="You have to fill all the fields" />}
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <InputField
            label="Route Name"
            name="routeName"
            onChange={(e) => setRouteName(e.target.value)}
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
        </div>

        <CollapsibleSection title="Theme Colors">
          <ColorPicker
            label="Primary Color"
            color={colors.primary}
            onChange={(color) => dispatch(handlePrimaryColor(color))}
          />
          <ColorPicker
            label="Secondary Color"
            color={colors.secondary}
            onChange={(color) => dispatch(handleSecondaryColor(color))}
          />
          <ColorPicker
            label="Accent Color"
            color={colors.accent}
            onChange={(color) => dispatch(handleAccentColor(color))}
          />
          <ColorPicker
            label="Text Color"
            color={colors.text}
            onChange={(color) => dispatch(handleTextColor(color))}
          />
        </CollapsibleSection>

        <button
          className="w-full bg-white/10 text-white p-3 rounded-md hover:bg-white/20 transition-colors"
          onClick={() => dispatch(handleShowFormEditor(!showFormEditor))}
        >
          Toggle Form Editor
        </button>
      </div>

      {routeName !== "" && valid && (
        <button
          className={`fixed z-40 bottom-6 right-6  text-white px-6 py-3 rounded-md transition-colors shadow-lg ${
            plan?.credit === 0 && accountType === "Organizer"
              ? "bg-gray-700 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
          onClick={handleEventCreation}
        >
          {plan?.credit === 0 && accountType === "Organizer"
            ? "Quota exceeded 🔒"
            : "Create Event"}
        </button>
      )}
    </div>
  );
};

export default SideBar;
