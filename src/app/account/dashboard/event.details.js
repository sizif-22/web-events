// "use client";
// import { useState, useEffect } from "react";
// import { db } from "@/app/firebase/firebase.user";
// import { collection, doc, onSnapshot } from "firebase/firestore";
// import { exportToExcel } from "@/xlax/xlax";
// export default function EventDetails({ event, eventLink, id }) {
//   const [copySuccess, setCopySuccess] = useState(false);
//   const [joined, setJoined] = useState([]);

//   useEffect(() => {
//     if (id) {
//       const eventDocRef = doc(db, "events", id);
//       const joinedCollectionRef = collection(eventDocRef, "participants");
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

//   const formatDate = (date) => {
//     return new Date(date).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   const copyLink = () => {
//     navigator.clipboard.writeText(eventLink);
//     setCopySuccess(true);
//     setTimeout(() => setCopySuccess(false), 2000);
//   };

//   const navigateToEvent = () => {
//     window.open(eventLink, "_blank");
//   };

//   return (
//     <div className="space-y-6">
//       <div className="bg-white rounded-lg shadow-md p-6">
//         <h2 className="text-xl font-semibold mb-4">Event Details</h2>
//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-500">
//               Date
//             </label>
//             <p className="text-lg">{formatDate(event.date)}</p>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-500">
//               Description
//             </label>
//             <p className="text-gray-700">{event.description}</p>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-500 mb-1">
//               Event Link
//             </label>
//             <div className="flex">
//               <input
//                 type="text"
//                 readOnly
//                 value={eventLink}
//                 className="flex-1 p-2 border border-gray-300 rounded-l focus:outline-none"
//               />
//               <button
//                 onClick={copyLink}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-r hover:bg-blue-700"
//               >
//                 {copySuccess ? "Copied!" : "Copy"}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="bg-white rounded-lg shadow-md p-6">
//         <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
//         <div className="space-y-3">
//           <button
//             onClick={navigateToEvent}
//             className="w-full bg-blue-600 text-white px-4 py-3 rounded hover:bg-blue-700"
//           >
//             Go to Event Page
//           </button>
//           <button
//             onClick={() => exportToExcel(event.form, joined, id)}
//             className="w-full bg-green-600 text-white px-4 py-3 rounded hover:bg-green-700"
//           >
//             Export Data
//           </button>
//         </div>
//       </div>

//       <div className="bg-white rounded-lg shadow-md p-6">
//         {/* add a QR SCanner here */}
//       </div>
//     </div>
//   );
// }
"use client";
import { useState, useEffect } from "react";
import { db } from "@/app/firebase/firebase.user";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { exportToExcel } from "@/xlax/xlax";
import QRScanner from "./QRScanner";

export default function EventDetails({ event, eventLink, id }) {
  const [copySuccess, setCopySuccess] = useState(false);
  const [joined, setJoined] = useState([]);
  const [qrResult, setQrResult] = useState("");
  
  const [qrscan, setQrscan] = useState('No result');
  const handleScan = data => {
      if (data) {
          setQrscan(data)
      }
  }
  const handleError = err => {
  console.error(err)
  }

  useEffect(() => {
    if (id) {
      const eventDocRef = doc(db, "events", id);
      const joinedCollectionRef = collection(eventDocRef, "participants");
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

  return (
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
            onClick={() => exportToExcel(event.form, joined, id)}
            className="w-full bg-green-600 text-white px-4 py-3 rounded hover:bg-green-700"
          >
            Export Data
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">QR Scanner</h2>
        <div style={{marginTop:30}}>
                <QRScanner />
            </div>
      </div>
    </div>
  );
}

