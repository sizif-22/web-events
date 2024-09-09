"use client";
import { useEffect, useState } from "react";
import Template1 from "../template/template1/main";
import { useSelector } from "react-redux";
import Loading from "../components/loading/loading";
import { useRouter } from "next/navigation";
export default function EventCreation() {
  const router = useRouter();
  const [load, setLoad] = useState(false);
  const { loading, allowTochangeRoute } = useSelector((state) => state.editor);
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
  return load ? (
    <Loading />
  ) : (
    <div className="bg-slate-500">
      <div className="grid grid-cols-5">
        <div className="col-span-1 h-screen">test</div>
        <div className="col-span-4">
          <Template1 Edit={true} />
        </div>
      </div>
    </div>
  );
}
