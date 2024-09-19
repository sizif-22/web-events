"use client";
import { useEffect, useState } from "react";
import Editor from "../theme/theme1/editor";
import Loading from "../components/loading/loading";
import { useRouter } from "next/navigation";
import { uploadEventImage } from "../firebase/firebase.storage";
import { handleValid, handleShowFormEditor } from "@/lib/editor.data.consts";
import WarningCard from "../components/warning";
import { useDispatch, useSelector } from "react-redux";
import FormEditor from "./formEditor";
import { checkIfEventExist } from "../firebase/firestore.events";
import Alert from "../components/alert/alert";
import { handleDate, handleTime, handleWhere } from "@/lib/editor.data";
import { addEvent } from "../firebase/firestore.events";
export default function EventCreation() {
  const router = useRouter();
  const userState = useSelector((state) => state.user.userState);
  const { isLoggedIn, isVerified, email } = userState;
  const { valid, showFormEditor, loading, allowTochangeRoute } = useSelector(
    (state) => state.editorConsts
  );
  const { title, organization, head1, body1, logo, features, form } =
    useSelector((state) => state.editor);
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
  const [logoUrl, setLogoUrl] = useState("");
  const [routeName, setRouteName] = useState();
  const [errormessage1, setErrorMessage1] = useState(
    "route field can't be Empty"
  );
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [where, setWhere] = useState();
  const [error, setError] = useState(false);

  const hanldeEventCreation = async () => {
    setError(false);
    setLoad(true);
    if (!date || !time || !where) {
      setError(true);
    }
    if (logo) {
      const Url = await uploadEventImage({
        dir: "EventImages",
        file: logo,
      });
      setLogoUrl(Url);
    }

    const eventObject = {
      title,
      organizer: email,
      organization,
      head1,
      body1,
      logo: logoUrl,
      features,
      date,
      time,
      where,
      form,
    };
    await addEvent(routeName, eventObject);
    router.push("/account");
  };

  const handleRoute = async (e) => {
    setRouteName(e.target.value);
    const id = String(e.target.value).toLowerCase().split(" ").join("-");
    if (id) {
      const exist = await checkIfEventExist(id);
      if (exist) {
        setErrorMessage1("this title is already token");
      }
      dispatch(handleValid(!exist));
    } else {
      setErrorMessage1("route field can't be Empty");
      dispatch(handleValid(false));
    }
  };
  useEffect(() => {
    if (allowTochangeRoute) {
      router.push("./account");
    }
  }, [allowTochangeRoute]);

  useEffect(() => {
    if (!load) {
      setLoad(loading);
    }
  }, [loading]);

  if (!isLoggedIn || !isVerified) {
    return (
      <div className="h-screen w-screen bg-slate-200">
        <WarningCard
          title="Access Restricted"
          description="You must be logged in with a verified account to access this page."
        />
      </div>
    );
  } else {
    return load ? (
      <Loading />
    ) : (
      <div className="bg-slate-500 relative">
        {/* form */}
        <div
          onClick={() => {
            dispatch(handleShowFormEditor(!showFormEditor));
          }}
          className={`absolute w-screen h-screen bg-black z-10 opacity-50 ${
            !showFormEditor && "hidden"
          }`}
        ></div>
        <div
          className={`absolute w-1/2 left-1/4 h-screen overflow-y-scroll bg-white z-20 rounded-md p-2  ${
            !showFormEditor && "hidden"
          }`}
        >
          <FormEditor />
        </div>

        <div className="grid grid-cols-5">
          {/* sidebar */}
          <div className="col-span-1 h-screen relative">
            <div className="inline-flex h-20 flex-col mt-5 ml-2 gap-5 rounded-md">
              {!valid && <Alert description={errormessage1} />}

              {error && (
                <Alert description={"you have to full all the fields"} />
              )}
            </div>

            {/* body */}
            <div className="mt-20 p-3">
              <label htmlFor="routeName" className="text-white">
                {" "}
                Route Name <span className="text-red-600">*</span>
              </label>
              <br />
              <input
                type="text"
                name="routeName"
                placeholder="routeName"
                onChange={handleRoute}
              />
              <br />
              <br />
              <label htmlFor="date" className="text-white">
                {" "}
                Event Date <span className="text-red-600">*</span>
              </label>
              <br />
              <input
                type="date"
                name="date"
                onChange={(e) => {
                  setDate(e.target.value);
                  dispatch(handleDate(e.target.value));
                }}
              />
              <br />
              <br />
              <label htmlFor="time" className="text-white">
                {" "}
                Event Time <span className="text-red-600">*</span>
              </label>
              <br />
              <input
                type="time"
                name="time"
                onChange={(e) => {
                  setTime(e.target.value);
                  dispatch(handleTime(e.target.value));
                }}
              />
              <br />
              <br />
              <label htmlFor="where" className="text-white">
                {" "}
                Event Location <span className="text-red-600">*</span>
              </label>
              <br />
              <input
                type="text"
                name="where"
                onChange={(e) => {
                  setWhere(e.target.value);
                  dispatch(handleWhere(e.target.value));
                }}
              />
              <br />
              <br />
              <button
                className="bg-slate-400 text-black p-3 pt-1 pb-1 active:scale-105 rounded-md transition-all hover:opacity-80"
                onClick={() => {
                  dispatch(handleShowFormEditor(!showFormEditor));
                }}
              >
                showFormEditor
              </button>
            </div>

            {valid && (
              <button
                className="bg-slate-400 text-black p-3 pt-1 pb-1 active:scale-105 rounded-md transition-all hover:opacity-80 absolute bottom-5 right-5"
                onClick={hanldeEventCreation}
              >
                Save
              </button>
            )}
          </div>
          {/* /sidebar */}

          <div className="col-span-4 h-screen overflow-y-scroll">
            <Editor />
          </div>
        </div>
      </div>
    );
  }
}
