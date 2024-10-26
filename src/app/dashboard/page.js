"use client";
import React, { useState, useEffect } from "react";
import {
  Users,
  Calendar,
  BarChart3,
  Settings,
  Trash2,
  Edit,
  Eye,
  Search,
  Download,
} from "lucide-react";
import { fetchAllEvents } from "../firebase/firestore.events";
import { fetchAllUsers } from "../firebase/firebase.user";

const formatTimestamp = ({ seconds, nanoseconds }) => {
//   console.log(obj);
//   const seconds = obj;
  const date = new Date(seconds * 1000); // Convert seconds to milliseconds

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds_part = date.getSeconds().toString().padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds_part}`;
};

const OwnerDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [organizers, setOrganizers] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const allEvents = await fetchAllEvents();
      const users = await fetchAllUsers();
      setOrganizers(users);
      setEvents(allEvents);
      setLoading(false);
      console.log(allEvents);
      console.log(users);
    };

    fetchData();
  }, []);

  const determineEventStatus = (dateTime) => {
    const eventDate = new Date(dateTime);
    const now = new Date();
    if (eventDate > now) return "Upcoming";
    if (eventDate < now) return "Completed";
    return "Active";
  };

  // Search Component
  const SearchBar = () => (
    <div className="relative mb-6">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="text-gray-400" size={20} />
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Search events, organizers..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );

  // Analytics Overview Component
  const AnalyticsOverview = () => (
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
          {events.reduce(
            (acc, event) => acc + (event.participants?.length || 0),
            0
          )}
        </div>
        <div className="text-sm text-gray-500">Across all events</div>
      </div>
    </div>
  );

  // Organizers Table Component
  const OrganizersTable = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 flex justify-between items-center border-b border-gray-200">
        <h2 className="text-xl font-semibold">Organizers</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          <Download size={16} />
          Export Data
        </button>
      </div>
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="p-4 text-left">Organizer Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Company</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {organizers.map((organizer) => (
                <tr key={organizer.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    {organizer.firstName + " " + organizer.lastName}
                  </td>
                  <td className="p-4">{organizer.email}</td>
                  <td className="p-4">{organizer.companyName || "-"}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        className="p-2 text-yellow-600 hover:bg-yellow-50 rounded"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Events Table Component
  const EventsTable = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 flex justify-between items-center border-b border-gray-200">
        <h2 className="text-xl font-semibold">Events</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          <Download size={16} />
          Export Data
        </button>
      </div>
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="p-4 text-left">Event Name</th>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-left">organizer Email</th>
                <th className="p-4 text-left"></th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{event.title}</td>
                  <td className="p-4">{formatTimestamp(event.dateTime)}</td>
                  <td className="p-4">{event.organizer}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        event.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : event.status === "Upcoming"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {event.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        className="p-2 text-yellow-600 hover:bg-yellow-50 rounded"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Owner Dashboard</h1>
      </div>

      <SearchBar />

      <div className="mb-6">
        <div className="flex gap-2 border-b border-gray-200">
          {[
            { id: "overview", icon: BarChart3, label: "Overview" },
            { id: "organizers", icon: Users, label: "Organizers" },
            { id: "events", icon: Calendar, label: "Events" },
            { id: "settings", icon: Settings, label: "Settings" },
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
            <AnalyticsOverview />
            <EventsTable />
          </>
        )}
        {activeTab === "organizers" && <OrganizersTable />}
        {activeTab === "events" && <EventsTable />}
        {activeTab === "settings" && (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Platform Settings</h2>
            <p>Settings content coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerDashboard;
