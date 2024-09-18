"use client";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import cube from "./cube.jpg";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import dayjs from "dayjs";
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

gsap.registerPlugin(ScrollTrigger);

const primaryColor = "#1162fb";
const secondaryColor = "#000000";
const textColor = "#ffffff";
const text2Color = "#ffffff";

const Viewer = ({ data }) => {
  const parallax = useRef();
  const bgRef = useRef();
  const descriptionRef = useRef();
  const descContainerRef = useRef();
  const {
    title,
    organization,
    date,
    time,
    where,
    head1,
    body1,
    logo,
    features,
  } = data;
  features.push(["lol"]);
  const delay = features.length < 0 ? 10 : 4;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { duration: 1 },
        scrollTrigger: {
          trigger: parallax.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });
      const tl2 = gsap.timeline({
        defaults: { duration: 1 },
        scrollTrigger: {
          trigger: parallax.current,
          start: "top top",
          end: "bottom bottom",
          scrub: delay,
        },
      });
      tl.to(bgRef.current, { y: "+=500" }, 0);
      tl2.to(descriptionRef.current, { opacity: 1 }, -1.7);
      tl2.to(descContainerRef.current, { margin: 0 }, -1.7);
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <div className="min-h-screen relative" style={{ color: textColor }}>
        <div className="absolute inset-0 -z-10">
          <Image
            ref={bgRef}
            src={cube}
            alt="cube"
            className="w-full h-full object-cover"
          />
        </div>
        {/* container */}
        <div className="w-full min-h-screen relative">
          {/* Nav */}
          <nav
            className="h-20 top-0 left-0 w-full absolute flex items-center justify-between px-8"
            style={{ color: textColor }}
          >
            <h2 className="text-2xl font-bold">Logo</h2>
          </nav>
          {/* body */}
          <div className="md:grid grid-cols-2 min-h-screen justify-items-center flex justify-center flex-col gap-10 md:gap-0 items-center p-8">
            <div className="flex justify-center flex-col gap-5 items-center md:items-start">
              <p className="text-lg font-semibold">{organization}</p>
              <h1 className="special-font text-6xl md:text-7xl font-bold">
                {title}
              </h1>
              <EventCountdown date={date} time={time} where={where} />
            </div>

            <div className="flex justify-center flex-col items-center md:items-start">
              <BTN />
            </div>
          </div>
        </div>
      </div>
      {features.length > 0 && (
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
                <div
                  key={item}
                  className="bg-white bg-opacity-10 p-6 rounded-lg"
                >
                  <h3 className="text-2xl font-semibold mb-4">
                    Feature {item}
                  </h3>
                  <p className="mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                </div>
              ))}
              <div className="bg-white bg-opacity-10 p-6 rounded-lg">
                <h3 className="text-2xl font-semibold mb-4">Add Feature Btn</h3>
                <p className="mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      <div
        ref={descriptionRef}
        className={`min-h-screen flex justify-center flex-col items-center md:items-start gap-10 md:gap-0 md:grid grid-cols-2 justify-items-center ${
          features.length > 0 && "opacity-0"
        } p-8`}
        style={{
          backgroundColor: secondaryColor,
          color: textColor,
        }}
      >
        <Image
          src={cube}
          alt="second photo"
          className="w-3/4 h-auto object-cover rounded-lg shadow-lg"
          style={{
            height: "90%",
          }}
        />
        <div
          ref={descContainerRef}
          className="flex w-full h-full justify-start md:justify-center p-5 md:p-0 flex-col gap-5"
          style={{ marginLeft: "-1000px" }}
        >
          <h1 className="special-font text-5xl md:text-6xl font-bold">
            {head1}
          </h1>
          <p className="text-lg">{body1}</p>
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

const EventCountdown = ({ date, time, where }) => {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = dayjs(`${date} ${time}`);

    const timer = setInterval(() => {
      const now = dayjs();
      const diff = targetDate.diff(now, "second");

      if (diff <= 0) {
        clearInterval(timer);
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(diff / (3600 * 24));
        const hours = Math.floor((diff % (3600 * 24)) / 3600);
        const minutes = Math.floor((diff % 3600) / 60);
        const seconds = diff % 60;

        setCountdown({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [date, time]);

  const formatNumber = (num) => num.toString().padStart(2, "0");

  return (
    <div>
      <div className="flex flex-col items-center md:flex-row gap-2">
        <p className="text-xl">{dayjs(date).format("D MMMM YYYY")}</p>
        <p>-</p>
        <p>{where}</p>
      </div>
      <br/>
      <div className="text-3xl font-bold">
        {countdown.days !== 0 && `${countdown.days} days `}
        {formatNumber(countdown.hours)}:{formatNumber(countdown.minutes)}:
        {formatNumber(countdown.seconds)}
      </div>
    </div>
  );
};

export default Viewer;
