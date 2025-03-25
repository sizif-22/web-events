"use client";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import NavBar from "./components/nav";
import weImg from "/webbingEvents.png";
import Image from "next/image";
const Card = ({ title, children }) => (
  <div className="bg-white shadow-md rounded-lg overflow-hidden w-2/3">
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2">{title}</div>
      {children}
    </div>
  </div>
);

const Button = ({ children, onClick, variant = "primary" }) => (
  <button
    onClick={onClick}
    className={`px-5 py-2 rounded-3xl  transition-colors ${
      variant === "primary"
        ? "bg-blue-600 text-white hover:bg-blue-700"
        : "bg-white text-blue-600 border border-blue-600 hover:bg-blue-50"
    }`}
  >
    {children}
  </button>
);

const Home = () => {
  const userState = useSelector((state) => state.user.userState);
  const { isLoggedIn } = userState;
  const router = useRouter();

  const handlegetstartedbtn = () => {
    if (isLoggedIn) {
      router.push("/console");
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="flex flex-col bg-[#0a0a0a]">
      <NavBar  />
      <div className="h-[88vh] md:grid flex  grid-cols-2 place-items-center px-[20px] md:px-[120px]">
        <div className=" flex flex-col items-start md:pr-14">
          <h className="text-5xl text-white">
            Create & Share Your Event Website <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">Effortlessly</span>
          </h>
          <p className="text-[#999] text-xl mt-5">
            Easily build a custom event website, share it with friends, clients,
            or anyone, and manage everything in one place. Track bookings and
            stay organized with a seamless event management experience.
          </p>
          <button
            className="font-bold w-36 py-2 text-lg bg-[#3A31D8] hover:bg-[#463fcc] border-2 border-[#3A31D8] transition-all duration-300  rounded-[11px] text-white mt-10"
            onClick={handlegetstartedbtn}
          >
            Get Started
          </button>
        </div>
        <div className="justify-end w-full hidden md:flex">
          <Image src={weImg} alt="Webbing Events" width={350} height={350} />
        </div>
      </div>
    </div>
  );
};

export default Home;
