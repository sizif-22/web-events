"use client";
import {
  handleTitle,
  handleOrganization,
  handleHead1,
  handleBody1,
  handleFeatures,
  handleFeatureHead,
  handleFeatureBody,
  handleFeaturesTitle,
} from "@/lib/editor.data";
import { useDispatch, useSelector } from "react-redux";
import {
  Mail,
  Phone,
  ArrowRight,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import Input from "@/app/components/file upload/input";
import Image from "next/image";
const Editor = () => {
  const dispatch = useDispatch();
  const { features, img1Url, img2Url, logoUrl } = useSelector(
    (state) => state.editor
  );
  const primaryColor = "#1162fb";
  const secondaryColor = "#000000";
  const textColor = "#ffffff";
  const text2Color = "#ffffff";

  const BTN = () => {
    return (
      <button
        onClick={() => console.log("the button is clicked")}
        className="font-bold py-3 px-6 rounded-full transition-all duration-300 flex items-center space-x-2 w-fit"
        style={{
          backgroundColor: primaryColor,
          color: text2Color,
        }}
      >
        <span>Join Now</span>
        <ArrowRight size={20} />
      </button>
    );
  };

  return (
    <>
      <div
        className="min-h-screen relative bg-transparent"
        style={{ color: textColor }}
      >
        <div
          className="absolute w-full h-full"
          style={{ backgroundColor: secondaryColor }}
        ></div>
        <div className="absolute inset-0">
          {img1Url && (
            <Image
              src={img1Url}
              alt=""
              width={1000}
              height={1000}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* container */}
        <div className="w-full min-h-screen relative">
          <div className="absolute z-10 flex items-center justify-center right-16 top-16">
            <Input imgPos={"img1"} />
          </div>
          {/* Nav */}
          <nav
            className="h-20 top-0 left-0 w-full absolute flex items-center justify-between px-8"
            style={{ color: textColor }}
          >
            <div className="flex items-center gap-2">
              {logoUrl && (
                <Image
                  src={logoUrl}
                  alt=""
                  width={1000}
                  height={1000}
                  className="w-auto h-16 object-cover"
                />
              )}
              <p>Add Your Logo :</p>
              <Input imgPos={"logo"} />
            </div>
          </nav>
          {/* body */}
          <div className="md:grid grid-cols-2 min-h-screen justify-items-center flex justify-center flex-col gap-10 md:gap-0 items-center p-8">
            <div className="flex justify-center flex-col gap-3 items-center md:items-start">
              <input
                type="text"
                className="text-lg font-semibold bg-transparent"
                placeholder="Organizer name"
                onChange={(e) => {
                  dispatch(handleOrganization(e.target.value));
                }}
              />
              <input
                type="text"
                className="special-font w-full text-6xl md:text-6xl m-0 font-bold bg-transparent"
                placeholder="The title"
                onChange={(e) => {
                  dispatch(handleTitle(e.target.value));
                }}
              />
              <p className="text-xl">where & when</p>
              <div className="text-3xl font-bold">00:00:00</div>
            </div>

            <div className="flex justify-center flex-col items-center md:items-start">
              <BTN />
            </div>
          </div>
        </div>
      </div>
      <div
        className="py-24 z-30"
        style={{
          backgroundColor: primaryColor,
          color: text2Color,
        }}
      >
        <div className="container mx-auto px-4">
          <input
            className="text-4xl font-bold mb-8 bg-transparent"
            placeholder="Featured Content"
            onChange={(e) => dispatch(handleFeaturesTitle(e.target.value))}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, fIndex) => (
              <div
                key={fIndex}
                className="bg-white bg-opacity-10 p-6 rounded-lg"
              >
                <input
                  className="text-2xl font-semibold mb-4 bg-transparent"
                  placeholder="head"
                  onChange={(e) =>
                    dispatch(
                      handleFeatureHead({
                        value: e.target.value,
                        index: fIndex,
                      })
                    )
                  }
                />
                <textarea
                  className="text-2xl font-semibold mb-4 bg-transparent min-h-20 "
                  placeholder="body"
                  onChange={(e) =>
                    dispatch(
                      handleFeatureBody({
                        value: e.target.value,
                        index: fIndex,
                      })
                    )
                  }
                ></textarea>
              </div>
            ))}
            <div
              className="bg-white bg-opacity-10 p-6 rounded-lg"
              onClick={() => dispatch(handleFeatures({ head: "", body: "" }))}
            >
              <h3 className="text-2xl font-semibold mb-4">Add Feature Btn</h3>
              <p className="mb-4">
                <SvgBtn />
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        className="min-h-screen flex justify-center flex-col items-center md:items-start gap-10 md:gap-0 md:grid grid-cols-2 justify-items-center p-8"
        style={{
          backgroundColor: secondaryColor,
          color: textColor,
        }}
      >
        <div
          className="w-3/4 h-auto object-cover rounded-lg shadow-lg relative"
          style={{ backgroundColor: primaryColor, height: "90%" }}
        >
          <div className="absolute z-10 flex items-center justify-center w-full h-full">
            <Input imgPos={"img2"} />
          </div>
          {img2Url && (
            <Image
              alt={""}
              src={img2Url}
              width={1000}
              height={1000}
              className=" object-cover w-full h-full rounded-lg"
            />
          )}
        </div>

        <div className="flex w-full h-full justify-start md:justify-center p-5 md:p-0 flex-col gap-5">
          <input
            type="text"
            className="special-font text-5xl md:text-6xl font-bold bg-transparent"
            placeholder="Head ..."
            onChange={(e) => {
              dispatch(handleHead1(e.target.value));
            }}
          />
          <textarea
            className="text-lg bg-transparent  min-h-40"
            placeholder="Body ..."
            onChange={(e) => {
              dispatch(handleBody1(e.target.value));
            }}
          ></textarea>
          <BTN />
        </div>
      </div>
      {/* footer */}
      <footer
        className="py-16 z-30"
        style={{ backgroundColor: primaryColor, color: textColor }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <h3 className="text-2xl font-bold mb-4">Company Name</h3>
              <p className="mb-4">Providing innovative solutions since 20XX</p>
              <div className="flex space-x-4">
                <Facebook className="cursor-pointer" />
                <Twitter className="cursor-pointer" />
                <Instagram className="cursor-pointer" />
                <Linkedin className="cursor-pointer" />
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Us</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Mail size={18} />
                  <p>contact@example.com</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone size={18} />
                  <p>+1 (123) 456-7890</p>
                </div>
              </div>
            </div>

            {/* Locations */}
            <div>
              <h3 className="text-xl font-bold mb-4">Our Locations</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <MapPin size={18} />
                  <p>New York, NY</p>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin size={18} />
                  <p>San Francisco, CA</p>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin size={18} />
                  <p>London, UK</p>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:underline">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-700">
            <p className="text-center">
              &copy; {new Date().getFullYear()} Company Name. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

const SvgBtn = () => {
  return (
    <button
      title="Add New File"
      className="group cursor-pointer outline-none hover:rotate-90 duration-300"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="50px"
        height="50px"
        viewBox="0 0 24 24"
        className="stroke-zinc-400 fill-none group-hover:fill-zinc-800 group-active:stroke-zinc-200 group-active:fill-zinc-600 group-active:duration-0 duration-300"
      >
        <path
          d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
          strokeWidth={1.5}
        />
        <path d="M8 12H16" strokeWidth={1.5} />
        <path d="M12 16V8" strokeWidth={1.5} />
      </svg>
    </button>
  );
};

export default Editor;
