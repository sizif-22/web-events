"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Theme1 from "../theme/theme1/theme1";
import Theme2 from "../theme/theme2/theme2";
import Loading from "../components/loading/loading";
import WarningCard from "../components/warning";
import SideBar from "./sidebar";
import FormEditor from "./formEditor";
import { handleShowFormEditor } from "@/lib/editor.data.consts";

export default function EventCreation() {
  const [theme, setTheme] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();

  const { isLoggedIn, isVerified } = useSelector(
    (state) => state.user.userState
  );
  const { showFormEditor, allowTochangeRoute } = useSelector(
    (state) => state.editorConsts
  );

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setTheme(searchParams.get("theme"));
    setLoading(false);
  }, []);

  useEffect(() => {
    if (allowTochangeRoute) {
      router.push("./account");
    }
  }, [allowTochangeRoute, router]);

  if (!isLoggedIn || !isVerified) {
    return (
      <div className="h-screen w-screen bg-slate-200">
        <WarningCard
          title="Access Restricted"
          description="You must be logged in with a verified account to access this page."
        />
      </div>
    );
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="bg-slate-500 relative">
      <FormEditorOverlay
        show={showFormEditor}
        onClose={() => dispatch(handleShowFormEditor(false))}
      />
      <div className="grid grid-cols-5">
        <SideBar theme={theme} />
        <div className="col-span-4 h-screen overflow-y-scroll">
          {theme === "Theme1" ? (
            <Theme1 editor={true} />
          ) : (
            <Theme2 editor={true} />
          )}
        </div>
      </div>
    </div>
  );
}

const FormEditorOverlay = ({ show, onClose }) => (
  <>
    <div
      onClick={onClose}
      className={`absolute w-screen h-screen bg-black z-10 opacity-50 ${
        !show && "hidden"
      }`}
    />
    <div
      className={`absolute w-1/2 left-1/4 h-screen overflow-y-scroll bg-white z-20 rounded-md p-2 ${
        !show && "hidden"
      }`}
    >
      <FormEditor />
    </div>
  </>
);
