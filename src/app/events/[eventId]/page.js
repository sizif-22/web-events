"use client";
import { useState, useEffect } from "react";
import { checkIfEventExist, fetchEvent } from "@/app/firebase/firestore.events";
import Loading from "@/app/components/loading/loading";
import Viewer from "@/app/template/template1/viewer";
const EventPage = ({ params }) => {
  const [exist, setExist] = useState(null);
  const [event, setEvent] = useState(null);
  useEffect(() => {
    checkIfEventExist(params.eventId).then((res) => {
      if (res) {
        fetchEvent(params.eventId).then((res) => {
          setEvent(res);
        });
      }
      setExist(res);
      console.log(res);
    });
  }, []);

  return exist == null ? (
    <Loading />
  ) : exist == false ? (
    <></>
  ) : (
    <div>
      <Viewer data={JSON.stringify(event)} />
    </div>
  );
};

export default EventPage;
