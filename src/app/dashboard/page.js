"use client";
import React, { useState, useEffect } from "react";
import { Users, Calendar, BarChart3, Settings } from "lucide-react";
import AnalyticsOverview from "./AnalyticsOverview";
import OrganizersTable from "./OrganizersTable";
import EventsTable from "./EventsTable";
import { fetchAllEvents } from "../firebase/firestore.events";
import { fetchAllUsers } from "../firebase/firebase.user";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import SearchBar from "./SearchBar";
import Loading from "../components/loading/loading";

const OwnerDashboard = () => {
  const userState = useSelector((state) => state.user.userState);
  const { isLoggedIn, isVerified, accountType } = userState;
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [organizers, setOrganizers] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchOrganizersData = async () => {
    const users = await fetchAllUsers();
    setOrganizers(users);
  };
  const fetchEventsData = async () => {
    const allEvents = await fetchAllEvents();
    setEvents(allEvents);
    setLoading(false);
  };

  useEffect(() => {
    fetchOrganizersData();
    fetchEventsData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (
    isLoggedIn &&
    isVerified &&
    (accountType === "Owner" || accountType === "admin")
  ) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Owner Dashboard</h1>
        </div>

        <SearchBar organizers={organizers} events={events} />

        <div className="mb-6">
          <div className="flex gap-2 border-b border-gray-200">
            {[
              { id: "overview", icon: BarChart3, label: "Overview" },
              { id: "organizers", icon: Users, label: "Organizers" },
              { id: "events", icon: Calendar, label: "Events" },
              // { id: "settings", icon: Settings, label: "Settings" },
            ].map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 px-4 py-2 border-b-2 ${
                  activeTab === id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {activeTab === "overview" && (
            <>
              <AnalyticsOverview events={events} organizers={organizers} />
              <EventsTable events={events} onClick={fetchEventsData} />
            </>
          )}
          {activeTab === "organizers" && (
            <OrganizersTable
              organizers={organizers}
              onClick={fetchOrganizersData}
            />
          )}
          {activeTab === "events" && (
            <EventsTable events={events} onClick={fetchEventsData} />
          )}
          {/* {activeTab === "settings" && (
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Platform Settings</h2>
              <p>Settings content coming soon...</p>
            </div>
          )} */}
        </div>
      </div>
    );
  } else {
    router.replace("/_notFound");
  }
};

export default OwnerDashboard;
