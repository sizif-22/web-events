"use client";
import EventCard from "./eventCard";
import CreateEventCard from "./createEventCard";
import { useSelector } from "react-redux";
import WarningCard from "../components/warning";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebase.user";
import { doc, getDoc } from "firebase/firestore";
const Console = () => {
  const { isLoggedIn, isVerified, events } = useSelector(
    (state) => state.user.userState
  );
  const [eventObjs, setEventObjs] = useState([]);
  useEffect(() => {
    if (!events.length) return;

    const fetchEvents = async () => {
      try {
        const eventDocs = await Promise.all(
          events.map(async (eventId) => {
            const eventSnap = await getDoc(doc(db, "events", eventId));
            return eventSnap.exists() ? { id: eventId, ...eventSnap.data() } : null;
          })
        );
        setEventObjs(eventDocs.filter(Boolean));
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, [events]);

  return isLoggedIn && isVerified ? (
    <div className="bg-[#999] p-8 min-h-screen">
      <div className="w-full md:h-[30vh] h-[20vh] bg-[#D9D9D9] rounded-lg shadow-md relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-4/5 bg-[#d9d9d97a] backdrop-blur-sm rounded-lg shadow-lg p-6 border border-gray-200">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">
            Your Projects
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-1 justify-items-center lg:grid-cols-2 xl:grid-cols-3 gap-6 max-h-[60vh] overflow-y-auto md:p-4">
            <CreateEventCard />
            {eventObjs.map((event, index) => (
              <EventCard key={index} {...event} />
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="h-screen w-screen bg-slate-200">
      <WarningCard
        title="Access Restricted"
        description="You must be logged in with a verified account to access this page."
      />
    </div>
  );
};

export default Console;
