import Image from "next/image";
import EventCard from "./event.card"; // Import the EventCard component

export default function Account() {
  const accountType = "Organizer"; // Example account type, can be dynamic based on your application logic

  // Example events data, this should be dynamically fetched in a real application
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

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Section */}
          <div className="col-span-1">
            <div className="bg-white shadow-md rounded-lg p-4 text-center">
              <div className="relative">
                <Image
                  src="/path-to-profile-pic.jpg"
                  alt="Profile Picture"
                  className="rounded-full mx-auto"
                  width={150}
                  height={150}
                />
                <button className="absolute bottom-0 right-4 bg-blue-500 text-white rounded-full p-2 shadow-md">
                  ✏️
                </button>
              </div>
              <h2 className="text-xl font-semibold mt-4">Sherif Lotfy</h2>
              <p className="text-gray-500 mt-2">{accountType} Account</p>{" "}
              {/* Account Type Display */}
            </div>
          </div>

          {/* Account Details Section */}
          <div className="col-span-2">
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-2xl font-semibold mb-4">Account Details</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="border p-2 rounded"
                    value="Sherif"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="border p-2 rounded"
                    value="Lotfy"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  className="border p-2 rounded w-full"
                  value="Sherif@gmail.com"
                />
                <input
                  type="text"
                  placeholder="Company Name"
                  className="border p-2 rounded w-full"
                  value="Masons"
                />
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
              <button className="text-red-500 hover:underline">Log out</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
