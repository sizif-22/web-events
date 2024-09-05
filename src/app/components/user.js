"use client";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Import router for navigation
import { userData } from "../page";

const UsEr = () => {
  const router = useRouter(); // Initialize the router

  return (
    <userData.Consumer>
      {(e) => {
        return (
          <div
            className="flex items-center gap-1 space-x-2 cursor-pointer p-2 rounded-lg hover:bg-gray-200 transition-colors hover:text-black duration-300"
            onClick={() => router.push("/account")} // Use router to navigate
          >
            {e.firstName}
            {/* Fixed firstName */}
            <div className="h-12 w-12 rounded-full overflow-hidden flex justify-center items-center bg-gray-300 max-w-16">
              <Image
                src={e.photoUrl} // Fixed photoUrl
                width={48}
                height={48}
                className="object-cover"
                alt="User Profile"
              />
            </div>
          </div>
        );
      }}
    </userData.Consumer>
  );
};
export default UsEr;
