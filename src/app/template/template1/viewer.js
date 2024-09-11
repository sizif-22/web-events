"use client";
import Loading from "@/app/components/loading/loading";
import { useEffect, useState } from "react";
const Viewer = ({ data }) => {
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState({});
  useEffect(() => {
    const theData = JSON.parse(data);
    if (theData != null) {
      // console.log(theData);
      setEvent(theData);
      setLoading(false);
    }
  }, [data]);
  return loading ? (
    <Loading />
  ) : (
    <div className="flex flex-col h-screen w-full p-8 bg-gray-900 text-gray-200">
      <h2 className="mb-4 border-b border-gray-600 pb-2 text-2xl font-semibold">
        {event.title}
      </h2>
      <div className="flex flex-1 justify-between items-start">
        <div className="flex-1 mr-4 bg-gray-800 p-4 rounded-lg overflow-auto">
          <p>{event.description}</p>
        </div>
        <div className="flex-1 max-w-xs bg-gray-800 p-4 rounded-lg">
          <img
            src={event.img}
            alt={event.title}
            className="w-full h-auto rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};
export default Viewer;
