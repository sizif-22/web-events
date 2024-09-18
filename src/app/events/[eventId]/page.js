"use client";
import { useState, useEffect } from "react";
import { checkIfEventExist, fetchEvent } from "@/app/firebase/firestore.events";
import Loading from "@/app/components/loading/loading";
import Viewer from "@/app/template/theme1/viewer";
// import Viewer from "@/app/template/template1/viewer";

const EventPage = ({ params }) => {
  const [exist, setExist] = useState(null);
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetching = async () => {
      const res = await checkIfEventExist(params.eventId);
      if (res) {
        const data = await fetchEvent(params.eventId);
        if (data) {
          setEvent(data);
        }
        console.log("event data is : ", event);
      }
      setExist(res);
    };
    fetching();
  }, []);

  return exist == null ? (
    <Loading />
  ) : exist == false ? (
    <></>
  ) : (
    <div>
      <Viewer data={event} />
    </div>
  );
};

export default EventPage;
