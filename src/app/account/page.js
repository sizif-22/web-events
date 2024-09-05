"use client";
import Image from "next/image";
import EventCard from "./event.card";
import { useState, useEffect } from "react";
import Loading from "../components/loading/loading";
import { useRouter } from "next/navigation";
import { logout } from "../firebase/firebase.auth";

export default function Account() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [accountType, setAccountType] = useState("Organizer");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userState = JSON.parse(sessionStorage.getItem("userState"));
      if (!userState?.isLoggedIn) {
        router.push("/");
      } else {
        setFirstName(userState.firstName);
        setLastName(userState.lastName);
        setEmail(userState.email);
        setPhotoUrl(userState.photoUrl);
        setCompanyName(userState.companyName);
        setAccountType(userState.accountType);
        setLoading(false);
      }
    }
  }, [router]);
  const handleLogOut = () => {
    logout();
    router.push("/");
  };

  const events = [
    {
      id: 1,
      image: "/path-to-event-image-1.jpg",
      title: "Annual Charity Run",
      description:
        "Join us for a fun and energetic charity run to support a good cause.",
      date: "2024-09-10T10:00:00",
    },
    {
      id: 2,
      image: "/path-to-event-image-2.jpg",
      title: "Tech Conference 2024",
      description:
        "A conference bringing together tech enthusiasts from all over the world.",
      date: "2024-10-15T09:00:00",
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Section */}
          <div className="w-full md:col-span-1">
            <div className="bg-white shadow-md rounded-lg p-4 text-center">
              <div className="relative">
                <Image
                  src={photoUrl}
                  alt="Profile Picture"
                  className="rounded-full mx-auto"
                  width={150}
                  height={150}
                />
                <button className="absolute bottom-0 right-4 bg-blue-500 text-white rounded-full p-2 shadow-md">
                  ✏️
                </button>
              </div>
              <h2 className="text-xl font-semibold mt-4">
                {firstName + " " + lastName}
              </h2>
              <p className="text-gray-500 mt-2">{accountType} Account</p>{" "}
              {/* Account Type Display */}
            </div>
          </div>

          {/* Account Details Section */}
          <div className="w-full md:col-span-2">
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-2xl font-semibold mb-4">Account Details</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="border p-2 rounded">{firstName}</div>
                  <div className="border p-2 rounded">{lastName}</div>
                </div>
                <div className="border p-2 rounded w-full">{email}</div>
                <div className="border p-2 rounded w-full">{companyName}</div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600">
                  Update Account
                </button>
              </form>
            </div>

            {/* Event Cards Section */}
            <div className="bg-white shadow-md rounded-lg p-6 mt-6">
              <h3 className="text-2xl font-semibold mb-4">Your Events</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {events.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6 mt-6">
              <h3 className="text-2xl font-semibold mb-4">Settings</h3>
              <button
                className="text-red-500 hover:underline"
                onClick={handleLogOut}
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
