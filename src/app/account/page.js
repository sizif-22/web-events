"use client";
import Image from "next/image";
import EventCard from "./event.card";
import { logout } from "../firebase/firebase.auth";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import WarningCard from "../components/warning";
export default function Account() {
  const router = useRouter();
  const { userState } = useSelector((state) => state.user);
  const { isLoggedIn } = userState;
  if (!isLoggedIn) {
    return (
      <div className="h-screen w-screen bg-slate-200">
        <WarningCard
          title="Access Restricted"
          description="You must be logged in with a verified account to access this page."
        />
      </div>
    );
  }
  const {
    firstName,
    lastName,
    email,
    photoUrl,
    events,
    companyName,
    accountType,
  } = userState;
  console.log('url : ',photoUrl);
  const handleLogOut = () => {
    logout();
    router.push("/");
  };
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
                  width={300}
                  height={300}
                  className="rounded-full mx-auto w-40 h-40 object-cover"
                />
                <button className="absolute bottom-0 right-4 bg-blue-500 text-white rounded-full p-2 shadow-md">
                  ✏️
                </button>
              </div>
              <h2 className="text-xl font-semibold mt-4">
                {firstName + " " + lastName}
              </h2>
              <p className="text-gray-500 mt-2">{accountType} Account</p>
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
              </form>
            </div>

            {/* Event Cards Section */}
            <div className="bg-white shadow-md rounded-lg p-6 mt-6">
              <h3 className="text-2xl font-semibold mb-4">Your Events</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {events.length > 0 ? (
                  events.map((eventId) => (
                    <EventCard key={eventId} eventId={eventId} />
                  ))
                ) : (
                  <p className="text-gray-500">You have no events yet.</p>
                )}
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
