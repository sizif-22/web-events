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
    const link = String(event.title).toLowerCase().split(" ").join("-");
    router.push(`/events/${link}`);
  };
  return (
    <div
      className="bg-white shadow-md rounded-lg p-4 transition transform hover:scale-105 hover:shadow-lg"
      onClick={handleClick}
    >
      <Image
        src={event.image}
        alt={event.title}
        className="rounded-lg"
        width={600}
        height={300}
        objectFit="cover"
      />
      <h3 className="text-xl font-semibold mt-4">{event.title}</h3>
      <p className="text-gray-600 mt-2">{event.description}</p>
      <p className="text-gray-500 mt-2">
        {new Date(event.date).toLocaleString()}
      </p>
    </div>
  );
};
export default EventCard;
