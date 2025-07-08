"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ScheduleEmail({ eventId }) {
  const router = useRouter();
  const [emailContent, setEmailContent] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");

  const handleScheduleEmail = async () => {
    if (!emailContent || !scheduledTime) {
      alert("Please fill in both email content and scheduled time");
      return;
    }

    // Check if scheduled time is at least 2 minutes ahead
    const scheduledDate = new Date(scheduledTime);
    const now = new Date();
    if (scheduledDate - now < 2 * 60 * 1000) {
      alert("Scheduled time must be at least 2 minutes in the future.");
      return;
    }

    try {
      const response = await fetch(`/api/event`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: emailContent,
          id: eventId,
          date: new Date(scheduledTime).toISOString(),
        }),
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

  return (
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
            className="w-full h-[300px] p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={10}
            cols={20}
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
          className="w-full bg-blue-600 text-white px-4 py-3 rounded hover:bg-blue-700">
          Schedule Email
        </button>
      </div>
    </div>
  );
}
