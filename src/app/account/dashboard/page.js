// "use client";
// import { useState, useEffect } from "react";
// import { fetchEvent } from "@/app/firebase/firestore.events";
// import Loading from "@/app/components/loading/loading";
// import { exportToExcel } from "@/xlax/xlax";
// import "./darshboard.css";
// import { db } from "@/app/firebase/firebase.firestore";
// import { doc, collection, onSnapshot } from "firebase/firestore";

// const Dashboard = () => {
//   const [loading, setLoading] = useState(true);
//   const [event, setEvent] = useState(null);
//   const [eventLink, setEventLink] = useState("");
//   const [copySuccess, setCopySuccess] = useState(false);
//   const [joined, setJoined] = useState([]);
//   const searchParams = new URLSearchParams(window.location.search);
//   const id = searchParams.get("id");

//   useEffect(() => {
//     const fetch = async () => {
//       if (id) {
//         const res = await fetchEvent(id);
//         if (res) {
//           setEvent(res);
//           setEventLink(`${window.location.origin}/events/${id}`);
//           setLoading(false);
//         }
//       }
//     };
//     fetch();
//   }, [id]);

//   useEffect(() => {
//     if (id) {
//       const eventDocRef = doc(db, "events", id);
//       const joinedCollectionRef = collection(eventDocRef, "joined");

//       const unsubscribe = onSnapshot(
//         joinedCollectionRef,
//         (snapshot) => {
//           const joinedDataArray = snapshot.docs.map((doc) => ({
//             id: doc.id,
//             ...doc.data(),
//           }));
//           setJoined(joinedDataArray);
//         },
//         (error) => {
//           console.error("Error fetching joined data: ", error);
//         }
//       );
//       return () => unsubscribe();
//     }
//   }, [id]);

//   const handleClick = () => {
//     exportToExcel(event.form, joined, id);
//   };

//   const copyLink = () => {
//     navigator.clipboard.writeText(eventLink);
//     setCopySuccess(true);
//     setTimeout(() => setCopySuccess(false), 2000);
//   };

//   const navigateToEvent = () => {
//     window.open(eventLink, "_blank");
//   };

//   if (loading) {
//     return <Loading />;
//   }

//   // Format the date
//   const formatDate = (date) => {
//     return new Date(date).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   return (
//     <div className="div-container">
//       <div className="card">
//         <h1 className="title">Event Dashboard</h1>
//         <div className="content">
//           <h2 className={"eventTitle"}>{event.title}</h2>
//           <p className={"date"}>Date: {formatDate(event.date)}</p>
//           <div className={"linkContainer"}>
//             <label htmlFor="eventLink" className={"label"}>
//               Event Link
//             </label>
//             <div className={"inputGroup"}>
//               <input
//                 id="eventLink"
//                 value={eventLink}
//                 readOnly
//                 className={"input"}
//               />
//               <button onClick={copyLink} className={"copyButton"}>
//                 {copySuccess ? "Copied!" : "Copy"}
//               </button>
//             </div>
//           </div>
//           <button onClick={navigateToEvent} className={"navigateButton"}>
//             Go to Event Page
//           </button>
//           <button onClick={handleClick} className={"navigateButton"}>
//             Export
//           </button>
//           {event.description && (
//             <div className={"descriptionContainer"}>
//               <h3 className={"descriptionTitle"}>Description</h3>
//               <p className={"description"}>{event.description}</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
"use client";
import { useState } from 'react';

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [emailContent, setEmailContent] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  
  // Mock data for demonstration
  const event = {
    title: "Tech Conference 2024",
    date: new Date("2024-12-15T09:00:00").toISOString(),
    description: "Join us for an exciting day of technology talks, workshops, and networking opportunities. Our conference brings together industry leaders, innovators, and developers for a full day of learning and collaboration. Don't miss out on this opportunity to expand your knowledge and network with peers.",
  };
  
  const mockJoinedPeople = [
    { name: "John Doe", email: "john@example.com", joinedAt: "2024-09-15T10:00:00" },
    { name: "Jane Smith", email: "jane@example.com", joinedAt: "2024-09-16T11:30:00" },
    { name: "Bob Johnson", email: "bob@example.com", joinedAt: "2024-09-17T09:15:00" },
    { name: "Alice Brown", email: "alice@example.com", joinedAt: "2024-09-18T14:20:00" },
  ];

  const eventLink = "https://example.com/events/tech-conf-2024";

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

  const handleScheduleEmail = () => {
    if (!emailContent || !scheduledTime) {
      alert("Please fill in both email content and scheduled time");
      return;
    }
    alert("Email scheduled successfully!");
    setEmailContent("");
    setScheduledTime("");
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
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
                <label className="block text-sm font-medium text-gray-500">Date</label>
                <p className="text-lg">{formatDate(event.date)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Description</label>
                <p className="text-gray-700">{event.description}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Event Link</label>
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
              <button className="w-full bg-blue-600 text-white px-4 py-3 rounded hover:bg-blue-700">
                Go to Event Page
              </button>
              <button className="w-full bg-green-600 text-white px-4 py-3 rounded hover:bg-green-700">
                Export Data
              </button>
            </div>
          </div>
        </div>

        {/* Middle Column - Registered Participants */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Registered Participants</h2>
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
                {mockJoinedPeople.map((person, index) => (
                  <tr key={index} className="border-t">
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