"use client";
import { useState, useEffect } from "react";
import { checkIfEventExist, fetchEvent } from "@/app/firebase/firestore.events";
import Loading from "@/app/components/loading/loading";
import Theme1 from "@/app/theme/theme1/theme1";
// import Theme2 from "@/app/theme/theme2/theme2";

// import Viewer from "@/app/template/template1/viewer";

const EventPage = ({ params }) => {
  const [exist, setExist] = useState(null);
  const [event, setEvent] = useState(null);
  const [theme, setTheme] = useState("");
  useEffect(() => {
    const fetching = async () => {
      const res = await checkIfEventExist(params.eventId);
      if (res) {
        const data = await fetchEvent(params.eventId);
        if (data) {
          setEvent(data);
          setTheme(data.theme);
        }
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
      {theme == "Theme1" ? (
        <Theme1 data={event} eventId={params.eventId} editor={false} />
      ) : // <Theme2 data={event} eventId={params.eventId} editor={false} />
      null}
    </div>
  );
};

export default EventPage;
