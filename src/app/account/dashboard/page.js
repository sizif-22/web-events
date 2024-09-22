"use client";
import { useState, useEffect } from "react";
import { fetchEvent } from "@/app/firebase/firestore.events";
import Loading from "@/app/components/loading/loading";
import { exportToExcel } from "@/xlax/xlax";
import "./darshboard.css";
import { db } from "@/app/firebase/firebase.firestore";
import { doc, collection, onSnapshot } from "firebase/firestore";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState(null);
  const [eventLink, setEventLink] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
  const [joined, setJoined] = useState([]);
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

  useEffect(() => {
    if (id) {
      const eventDocRef = doc(db, "events", id);
      const joinedCollectionRef = collection(eventDocRef, "joined");

      const unsubscribe = onSnapshot(
        joinedCollectionRef,
        (snapshot) => {
          const joinedDataArray = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setJoined(joinedDataArray);
        },
        (error) => {
          console.error("Error fetching joined data: ", error);
        }
      );
      return () => unsubscribe();
    }
  }, [id]);

  const handleClick = () => {
    exportToExcel(event.form, joined, id);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(eventLink);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const navigateToEvent = () => {
    window.open(eventLink, "_blank");
  };

  if (loading) {
    return <Loading />;
  }

  // Format the date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="div-container">
      <div className="card">
        <h1 className="title">Event Dashboard</h1>
        <div className="content">
          <h2 className={"eventTitle"}>{event.title}</h2>
          <p className={"date"}>Date: {formatDate(event.date)}</p>
          <div className={"linkContainer"}>
            <label htmlFor="eventLink" className={"label"}>
              Event Link
            </label>
            <div className={"inputGroup"}>
              <input
                id="eventLink"
                value={eventLink}
                readOnly
                className={"input"}
              />
              <button onClick={copyLink} className={"copyButton"}>
                {copySuccess ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
          <button onClick={navigateToEvent} className={"navigateButton"}>
            Go to Event Page
          </button>
          <button onClick={handleClick} className={"navigateButton"}>
            Export
          </button>
          {event.description && (
            <div className={"descriptionContainer"}>
              <h3 className={"descriptionTitle"}>Description</h3>
              <p className={"description"}>{event.description}</p>
            </div>
          )}
        </div>
      </div>
      {/* <div className="bg-sky-600 card">{JSON.stringify(joined)}</div> */}
    </div>
  );
};

export default Dashboard;
