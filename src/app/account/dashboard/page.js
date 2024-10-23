"use client";
import { useState, useEffect } from "react";
import { fetchEvent } from "@/app/firebase/firestore.events";
import Loading from "@/app/components/loading/loading";
import { exportToExcel } from "@/xlax/xlax";
import "./darshboard.css";
import { db } from "@/app/firebase/firebase.firestore";
import { doc, collection, onSnapshot } from "firebase/firestore";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [eventLink, setEventLink] = useState("");
  const [emailContent, setEmailContent] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
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

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const copyLink = () => {
    navigator.clipboard.writeText(eventLink);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const navigateToEvent = () => {
    window.open(eventLink, "_blank");
  };

  const handleScheduleEmail = async () => {
    if (!emailContent || !scheduledTime) {
      alert("Please fill in both email content and scheduled time");
      return;
    }

    try {
      const response = await fetch('https://eventy-back-production.up.railway.app/api/event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: emailContent,
          id: id,
          date: new Date(scheduledTime).toISOString()
        })
      });

      if (response.ok) {
        alert("Email scheduled successfully!");
        setEmailContent("");
        setScheduledTime("");
      } else {
        alert("Failed to schedule email. Please try again.");
      }
    } catch (error) {
      console.error("Error scheduling email:", error);
      alert("Error scheduling email. Please try again.");
    }
  };

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
        {/* Left Column - Event Details */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Event Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Date
                </label>
                <p className="text-lg">{formatDate(event.date)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Description
                </label>
                <p className="text-gray-700">{event.description}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Event Link
                </label>
                <div className="flex">
                  <input
                    type="text"
                    readOnly
                    value={eventLink}
                    className="flex-1 p-2 border border-gray-300 rounded-l focus:outline-none"
                  />
                  <button
                    onClick={copyLink}
                    className="px-4 py-2 bg-blue-600 text-white rounded-r hover:bg-blue-700"
                  >
                    {copySuccess ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button
                onClick={navigateToEvent}
                className="w-full bg-blue-600 text-white px-4 py-3 rounded hover:bg-blue-700"
              >
                Go to Event Page
              </button>
              <button 
                onClick={handleClick}
                className="w-full bg-green-600 text-white px-4 py-3 rounded hover:bg-green-700"
              >
                Export Data
              </button>
            </div>
          </div>
        </div>

        {/* Middle Column - Registered Participants */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">
            Registered Participants
          </h2>
          <div className="overflow-y-auto max-h-[600px]">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Joined</th>
                </tr>
              </thead>
              <tbody>
                {joined.map((person, index) => (
                  <tr key={person.id} className="border-t">
                    <td className="px-4 py-3">{person.name}</td>
                    <td className="px-4 py-3">{person.email}</td>
                    <td className="px-4 py-3">{formatDate(person.joinedAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column - Email Scheduler */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Schedule Email</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Content
              </label>
              <textarea
                placeholder="Enter email content..."
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={10}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Schedule Time
              </label>
              <input
                type="datetime-local"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={handleScheduleEmail}
              className="w-full bg-blue-600 text-white px-4 py-3 rounded hover:bg-blue-700"
            >
              Schedule Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}