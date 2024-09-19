"use client";
import {
  handleTitle,
  handleOrganization,
  handleHead1,
  handleBody1,
} from "@/lib/editor.data";
import { useDispatch } from "react-redux";
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
const Editor = () => {
  const dispatch = useDispatch();

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
        className="min-h-screen relative"
        style={{ color: textColor, backgroundColor: secondaryColor }}
      >
        <div className="absolute inset-0 -z-10"></div>
        {/* container */}
        <div className="w-full min-h-screen relative">
          {/* Nav */}
          <nav
            className="h-20 top-0 left-0 w-full absolute flex items-center justify-between px-8"
            style={{ color: textColor }}
          >
            <div className="flex items-center gap-2">
              <p>Add Your Logo :</p>
              <Input />
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
          <h2 className="text-4xl font-bold mb-8">Featured Content</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white bg-opacity-10 p-6 rounded-lg">
                <h3 className="text-2xl font-semibold mb-4">Feature {item}</h3>
                <p className="mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            ))}
            <div className="bg-white bg-opacity-10 p-6 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4">Add Feature Btn</h3>
              <p className="mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
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
          className="w-3/4 h-auto object-cover rounded-lg shadow-lg"
          style={{ backgroundColor: primaryColor, height: "90%" }}
        ></div>

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

export default Editor;
 