"use client";
import { useState, useEffect } from "react";
import { db } from "@/app/firebase/firebase.user";
import {
  doc,
  collection,
  onSnapshot,
  getDoc,
  query,
  orderBy,
} from "firebase/firestore";

function formatTimestamp({ seconds, nanoseconds }) {
  const date = new Date(seconds * 1000);

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds_part = date.getSeconds().toString().padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds_part}`;
}

export default function MailHistory({ eventId }) {
  const [messages, setMessages] = useState([]);
  const [messageIds, setMessageIds] = useState([]);

  useEffect(() => {
    if (!eventId) return;

    // Listen to changes in the event document
    const eventRef = doc(db, "events", eventId);
    const eventUnsubscribe = onSnapshot(eventRef, (eventSnapshot) => {
      if (eventSnapshot.exists()) {
        const newMessageIds = eventSnapshot.data().messages || [];
        setMessageIds(newMessageIds);
      }
    });

    // Listen to changes in the messages collection
    const messagesQuery = query(
      collection(db, "messages"),
      orderBy("date", "desc")
    );

    const messagesUnsubscribe = onSnapshot(
      messagesQuery,
      (snapshot) => {
        const eventMessages = snapshot.docs
          .filter((doc) => messageIds.includes(doc.id))
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

        setMessages(eventMessages);
      },
      (error) => {
        console.error("Error fetching messages: ", error);
      }
    );

    // Cleanup both listeners
    return () => {
      eventUnsubscribe();
      messagesUnsubscribe();
    };
  }, [eventId, messageIds]); // Added messageIds as dependency

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Message History</h2>
      <div className="overflow-y-auto h-[400px] space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`p-4 rounded-lg ${
              message.sent
                ? "bg-green-50 border border-green-200"
                : "bg-blue-50 border border-blue-200"
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <span
                className={`text-sm font-medium ${
                  message.sent ? "text-green-600" : "text-blue-600"
                }`}
              >
                {message.sent ? "Sent" : "Scheduled"}
              </span>
              <span className="text-sm text-gray-500">
                {formatTimestamp(message.date)}
              </span>
            </div>
            <p className="text-gray-700 whitespace-pre-wrap">
              {message.content}
            </p>
            {message.sent && (
              <div className="mt-2 text-sm text-gray-500">
                <div>Sent to: {message.recipientCount} recipients</div>
                <div>Sent at: {formatTimestamp(message.sentAt)}</div>
              </div>
            )}
          </div>
        ))}
        {messages.length === 0 && (
          <p className="text-gray-500 text-center py-4">No messages yet</p>
        )}
      </div>
    </div>
  );
}
