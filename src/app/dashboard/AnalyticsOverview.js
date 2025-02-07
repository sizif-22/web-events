"use client";
import { Users, Calendar, BarChart3 } from "lucide-react";
import { db } from "../firebase/firebase.user";
import * as firestore from "firebase/firestore";
import { useState, useEffect } from "react";
const AnalyticsOverview = ({ organizers, events }) => {
  const [totalParticipants, setTotalParticipants] = useState(0);
  useEffect(() => {
    const fetchTotalParticipants = async () => {
      let total = 0;

      if (!events || events.length === 0) return;

      try {
        const counts = await Promise.all(
          events.map(async (event) => {
            const path = firestore.collection(
              db,
              "events",
              event.id,
              "participants"
            );
            const snapshot = await firestore.getDocs(path);
            return snapshot.size;
          })
        );

        total = counts.reduce((acc, count) => acc + count, 0);
        setTotalParticipants(total);
      } catch (error) {
        console.error("Error fetching participants:", error);
      }
    };

    fetchTotalParticipants();
  }, [events]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center gap-2 mb-2 text-lg font-semibold">
          <Users size={20} />
          Total Organizers
        </div>
        <div className="text-3xl font-bold">{organizers.length}</div>
        <div className="text-sm text-gray-500">
          Active organizers on platform
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center gap-2 mb-2 text-lg font-semibold">
          <Calendar size={20} />
          Total Events
        </div>
        <div className="text-3xl font-bold">{events.length}</div>
        <div className="text-sm text-gray-500">Events created on platform</div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center gap-2 mb-2 text-lg font-semibold">
          <BarChart3 size={20} />
          Total Participants
        </div>
        <div className="text-3xl font-bold">
          {/*  */}
          {totalParticipants}
        </div>
        <div className="text-sm text-gray-500">Across all events</div>
      </div>
    </div>
  );
};
export default AnalyticsOverview;
