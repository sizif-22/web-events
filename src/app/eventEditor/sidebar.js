"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Alert from "../components/alert/alert";
import { uploadEventImage } from "../firebase/firebase.storage";
import { checkIfEventExist, addEvent } from "../firebase/firestore.events";
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

const CollapsibleSection = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-t border-white/20 pt-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-white text-lg font-semibold pb-2 hover:text-white/80 transition-colors"
      >
        <span>{title}</span>
        <span
          className={`transform transition-transform duration-200 ${
            isOpen ? "rotate-0" : "-rotate-90"
          }`}
        >
          ▽
        </span>
      </button>
      <div
        className={`transition-all duration-200 overflow-hidden ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-4 pt-4">{children}</div>
      </div>
    </div>
  );
};

const ColorPicker = ({ label, color, onChange }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [currentColor, setCurrentColor] = useState(color);

  const handleColorChange = (newColor) => {
    setCurrentColor(newColor);
    onChange(newColor);
  };

  const handleClickOutside = (e) => {
    if (!e.target.closest(".color-picker-container")) {
      setShowPicker(false);
    }
  };

  useEffect(() => {
    if (showPicker) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showPicker]);

  return (
    <div className="relative color-picker-container">
      <label className="text-white block mb-2">{label}</label>
      <div className="flex items-center gap-2">
        <div
          className="w-10 h-10 rounded-md cursor-pointer border border-white shadow-sm hover:shadow-md transition-shadow"
          style={{ backgroundColor: currentColor }}
          onClick={() => setShowPicker(!showPicker)}
        />
        <input
          type="text"
          value={currentColor}
          onChange={(e) => handleColorChange(e.target.value)}
          className="w-28 p-1 rounded-md text-sm bg-white/10 text-white"
        />
      </div>

      {showPicker && (
        <div className="absolute left-0 mt-2 z-50">
          <div className="bg-white p-4 rounded-lg shadow-xl border border-gray-200">
            <div className="relative">
              <div
                className="w-48 h-48 rounded-lg cursor-pointer"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 50%, rgba(0, 0, 0, 1) 100%), linear-gradient(to right, rgba(128, 128, 128, 1) 0%, rgba(128, 128, 128, 0) 100%)",
                }}
                onClick={(e) => {
                  const rect = e.target.getBoundingClientRect();
                  const x = (e.clientX - rect.left) / rect.width;
                  const y = (e.clientY - rect.top) / rect.height;
                  const color = `rgb(${Math.round(255 * (1 - y))}, ${Math.round(
                    255 * (1 - y)
                  )}, ${Math.round(255 * (1 - y))})`;
                  handleColorChange(color);
                }}
              >
                <div
                  className="absolute w-4 h-4 rounded-full border-2 border-white shadow-md transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    backgroundColor: currentColor,
                    top: "50%",
                    left: "50%",
                  }}
                />
              </div>
              <div className="mt-2">
                <input
                  type="range"
                  min="0"
                  max="360"
                  className="w-full h-4 rounded-lg appearance-none bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-red-500"
                  onChange={(e) => {
                    const hue = e.target.value;
                    handleColorChange(`hsl(${hue}, 100%, 50%)`);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const InputField = ({ label, name, type = "text", onChange, required }) => (
  <div className="mb-4">
    <label htmlFor={name} className="text-white block mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      name={name}
      onChange={onChange}
      className="w-full p-2 rounded-md bg-white/10 text-white placeholder-white/50 border border-white/20 focus:border-white/40 focus:outline-none transition-colors"
      required={required}
    />
  </div>
);

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
    colors,
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
        colors,
      };

      await addEvent(id, eventObject);
      router.push("/account");
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
          className="fixed z-40 bottom-6 right-6 bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors shadow-lg"
          onClick={handleEventCreation}
        >
          Create Event
        </button>
      )}
    </div>
  );
};

export default SideBar;
