"use client";
import { useState, useEffect } from "react";
import { fetchEvent } from "@/app/firebase/firestore.events";
import Loading from "@/app/components/loading/loading";
import EventDetails from "./event.details";
import MailHistory from "./mail.history";
import ScheduleEmail from "./schedule.email";
import "./darshboard.css";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState(null);
  const [eventLink, setEventLink] = useState("");
  const searchParams = new URLSearchParams(window.location.search);
  const id = searchParams.get("id");

  useEffect(() => {
    const fetch = async () => {
      if (id) {
        const res = await fetchEvent(id);
        if (res) {
          setEvent(res);
          setEventLink(`${window.location.origin}/events/${id}`);
          setLoading(false);
        }
      }
    };
    fetch();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-center">{event.title}</h1>
        <p className="text-xl text-gray-600 text-center mt-2">Dashboard</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <EventDetails event={event} eventLink={eventLink} id={id} />
        <div className=" flex flex-col justify-between">
          <MailHistory eventId={id} />
        </div>
        <div className=" flex flex-col justify-between">
          <ScheduleEmail eventId={id} />
        </div>
      </div>
    </div>
  );
}
