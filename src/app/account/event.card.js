"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { fetchEvent } from "../firebase/firestore.events";
const EventCard = ({ eventId }) => {
  const [event, setEvent] = useState({});
  useEffect(() => {
    const fetchingEventData = async () => {
      const theEvent = await fetchEvent(eventId);
      setEvent(theEvent);
    };
    fetchingEventData();
  }, []);
  const router = useRouter();
  const handleClick = () => {
    // router.push(`/events/${eventId}`);
    router.push(`/account/dashboard?id=${eventId}`);
  };
  console.log(event.dateTime);
  return (
    <div
      className="bg-white shadow-md rounded-lg p-4 transition transform hover:scale-105 hover:shadow-lg"
      onClick={handleClick}
    >
      <Image
        src={event.image}
        alt={event.title}
        width={600}
        height={300}
        objectFit="cover"
        className="rounded-lg"
      />
      <h3 className="text-xl font-semibold mt-4">{event.title}</h3>
      <p className="text-gray-500 mt-2">
        {typeof event.dateTime != "undefined" &&
          event.dateTime.toDate().toLocaleString()}
      </p>
    </div>
  );
};
export default EventCard;
