"use client";
import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import BTN from "@/app/components/viewerPage.btn";
import { ScrollTrigger } from "gsap/all";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import EventCountdown from "@/app/components/countDown";

gsap.registerPlugin(ScrollTrigger);

const Viewer = ({ data, eventId }) => {
  const {
    title,
    organization,
    date,
    time,
    where,
    head1,
    body1,
    logo,
    img1,
    img2,
    features,
    featuresTitle,
    form,
    colors,
    footer,
  } = data;
  console.log(colors);
  const primaryColor = colors.primary;
  const secondaryColor = colors.secondary;
  const textColor = colors.accent;
  const text2Color = colors.text;

  const parallax1 = useRef();
  const parallax2 = useRef();
  const bgRef = useRef();
  const descriptionRef = useRef();
  const descContainerRef = useRef();
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { duration: 1 },
        scrollTrigger: {
          trigger: parallax1.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });
      const tl2 = gsap.timeline({
        defaults: { duration: 1 },
        scrollTrigger: {
          trigger: parallax2.current,
          start: "top bottom",
          end: "bottom bottom",
          scrub: true,
        },
      });
      tl.to(bgRef.current, { y: "+=600" }, 0);
      tl2.to(descContainerRef.current, { margin: 0 }, 0);
    });
    return () => ctx.revert();
  }, []);

  const SocialIcon = ({ platform, Icon }) => {
    const url = footer.socialLinks[platform.toLowerCase()];
    return url ? (
      <a href={url} target="_blank" rel="noopener noreferrer">
        <Icon className="cursor-pointer hover:opacity-80" />
      </a>
    ) : null;
  };

  return (
    <>
      <div className="min-h-screen relative" style={{ color: textColor }}>
        <div
          className="absolute inset-0 -z-10"
          style={{ backgroundColor: secondaryColor }}
        ></div>
        {img1 && (
          <div className="absolute inset-0 -z-10">
            <Image
              ref={bgRef}
              width={1000}
              height={1000}
              src={img1}
              alt="cube"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* container */}
        <div className="w-full min-h-screen relative">
          {/* Nav */}
          <nav
            className="h-20 top-0 left-0 w-full absolute flex items-center justify-between px-8"
            style={{ color: textColor }}
          >
            {logo && (
              <Image
                src={logo}
                alt=""
                width={1000}
                height={1000}
                className="w-auto h-16 object-cover"
              />
            )}
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
              <BTN
                backgroundColor={primaryColor}
                color={text2Color}
                form={form}
                eventId={eventId}
              />
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
            <h2 className="text-4xl font-bold mb-8">{featuresTitle}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white bg-opacity-10 p-6 rounded-lg"
                >
                  <h3 className="text-2xl font-semibold mb-4">
                    {feature.head}
                  </h3>
                  <p className="mb-4">{feature.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <div ref={parallax2}>
        <div
          ref={descriptionRef}
          className="min-h-screen flex justify-center flex-col items-center md:items-start gap-10 md:gap-0 md:grid grid-cols-2 justify-items-center p-8"
          style={{
            backgroundColor: secondaryColor,
            color: textColor,
          }}
        >
          <Image
            src={img2}
            width={1000}
            height={1000}
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
            <BTN
              backgroundColor={primaryColor}
              color={text2Color}
              form={form}
              eventId={eventId}
            />
          </div>
        </div>
      </div>
      {/* footer */}
      <footer
        className="py-10 z-30"
        style={{ backgroundColor: primaryColor, color: textColor }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <h3 className="text-2xl font-bold mb-4">
                {footer.companyInfo.name}
              </h3>
              <p className="mb-4">{footer.companyInfo.slogan}</p>
              <div className="flex space-x-4">
                <SocialIcon platform="Facebook" Icon={Facebook} />
                <SocialIcon platform="Twitter" Icon={Twitter} />
                <SocialIcon platform="Instagram" Icon={Instagram} />
                <SocialIcon platform="LinkedIn" Icon={Linkedin} />
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Us</h3>
              <div className="space-y-2">
                {footer.contactInfo.email != "" && (
                  <div className="flex items-center space-x-2">
                    <Mail size={18} />
                    <p>{footer.contactInfo.email}</p>
                  </div>
                )}
                {footer.contactInfo.phone != "" && (
                  <div className="flex items-center space-x-2">
                    <Phone size={18} />
                    <p>{footer.contactInfo.phone}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Locations */}
            {footer.locations.length > 0 && (
              <div>
                <h3 className="text-xl font-bold mb-4">Our Locations</h3>
                <div className="space-y-2">
                  {footer.locations.map((location, index) => (
                    <div
                      key={index}
                      className="flex w-52 justify-between items-center"
                    >
                      <div className="inline-flex items-center space-x-2">
                        <MapPin size={18} />
                        <p>
                          {location.city}, {location.country}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* Quick Links */}
            {footer.quickLinks.length > 0 && (
              <div>
                <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  {footer.quickLinks.map((link, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center w-52"
                    >
                      <a href={link.url} className="hover:underline">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
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

export default Viewer;
