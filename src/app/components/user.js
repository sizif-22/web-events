"use client";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Import router for navigation
// import { userData } from "../page";
import { useSelector } from "react-redux";
const UsEr = () => {
  const userState = useSelector((state) => state.user.userState);
  const { firstName, photoUrl } = userState;
  const router = useRouter(); // Initialize the router

  return (
    <div
      className="inline-flex items-center justify-center gap-1 cursor-pointer p-2 rounded-lg hover:bg-gray-200 transition-colors hover:text-black duration-300"
      onClick={() => router.push("/account")}
    >
      {firstName}
      {/* Fixed firstName */}
      <div className="max-h-12 max-w-12 rounded-full overflow-hidden flex justify-center items-center ">
        <Image
          src={photoUrl} // Fixed photoUrl
          width={200}
          height={200}
          className="w-16 h-16 object-cover"
          alt="User Profile"
        />
      </div>
    </div>
  );
};
export default UsEr;
