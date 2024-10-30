"use client";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputField from "@/app/eventEditor/inputField";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Trash2,
} from "lucide-react";
import {
  updateCompanyInfo,
  updateContactInfo,
  addLocation,
  removeLocation,
  addQuickLink,
  removeQuickLink,
  updateSocialLink,
} from "@/lib/editor.data";

const Footer = ({ primaryColor, text2Color }) => {
  const dispatch = useDispatch();
  const { footer } = useSelector((state) => state.editor);
  const [showPopUp, setShowPopUp] = useState(false);
  const [popUpType, setPopUpType] = useState(null);

  const handleClickOutside = useCallback((e) => {
    if (!e.target.closest(".pop-up-container")) {
      setShowPopUp(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  const PopUpContent = () => {
    if (popUpType === "quickLink") {
      let link = { label: "", url: "" };
      const addLink = () => {
        if (link.label == "" || link.url == "") {
          setShowPopUp(false);
          return;
        }
        dispatch(addQuickLink(link));
        setShowPopUp(false);
      };
      return (
        <div className="bg-slate-700 w-80 p-10 text-white pop-up-container opacity-100 rounded-md flex flex-col">
          <div className="flex justify-between items-center">
            <span className="text-sm text-white/60">Quick Link</span>
          </div>
          <InputField
            label="Label"
            onChange={(e) => {
              link.label = e.target.value;
            }}
            required
          />
          <InputField
            label="URL"
            onChange={(e) => {
              link.url = e.target.value;
            }}
            required
          />
          <button
            className="px-4 py-2 rounded-md active:opacity-80 active:scale-95 transition-all bg-white/10 text-white placeholder-white/50 border border-white/20 focus:border-white/40 focus:outline-none"
            onClick={addLink}
          >
            Save
          </button>
        </div>
      );
    } else if (popUpType === "location") {
      let location = { city: "", country: "" };
      const addLocationfunc = () => {
        if (location.city == "" || location.country == "") {
          setShowPopUp(false);
          return;
        }
        dispatch(addLocation(location));
        setShowPopUp(false);
      };
      return (
        <div className="bg-slate-700 h-80 w-80 p-10 text-white pop-up-container opacity-100 rounded-md flex flex-col">
          <div className="flex justify-between items-center">
            <span className="text-sm text-white/60">Location</span>
          </div>
          <InputField
            label="City"
            onChange={(e) => {
              location.city = e.target.value;
            }}
            required
          />
          <InputField
            label="Country"
            onChange={(e) => {
              location.country = e.target.value;
            }}
            required
          />
          <button
            className="px-4 py-2 rounded-md active:opacity-80 active:scale-95 transition-all bg-white/10 text-white placeholder-white/50 border border-white/20 focus:border-white/40 focus:outline-none"
            onClick={addLocationfunc}
          >
            Save
          </button>
        </div>
      );
    } else if (popUpType === "companyInfo") {
      let companyData = {
        name: footer.companyInfo.name,
        slogan: footer.companyInfo.slogan,
        socialLinks: {
          facebook: footer.socialLinks.facebook,
          twitter: footer.socialLinks.twitter,
          instagram: footer.socialLinks.instagram,
          linkedin: footer.socialLinks.linkedin,
        },
      };

      const updateCompany = () => {
        dispatch(updateCompanyInfo({ field: "name", value: companyData.name }));
        dispatch(
          updateCompanyInfo({ field: "slogan", value: companyData.slogan })
        );

        // Update social links
        Object.entries(companyData.socialLinks).forEach(([platform, url]) => {
          dispatch(updateSocialLink({ platform, url }));
        });

        setShowPopUp(false);
      };

      return (
        <div className="bg-slate-700 w-[600px] p-10 text-white pop-up-container opacity-100 rounded-md grid grid-cols-2 gap-10">
          <div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-white/60">Company Information</span>
            </div>
            <InputField
              label="Company Name"
              value={companyData.name}
              onChange={(e) => {
                companyData.name = e.target.value;
              }}
              required
            />
            <div className="mb-4">
              <label className="text-white block mb-2">Slogan</label>
              <textarea
                className="w-full p-2 rounded-md bg-white/10 text-white placeholder-white/50 border border-white/20 focus:border-white/40 focus:outline-none transition-colors"
                defaultValue={companyData.slogan}
                onChange={(e) => {
                  companyData.slogan = e.target.value;
                }}
              />
            </div>
          </div>
          {/* Social Media Links */}
          <div className="space-y-4">
            <h4 className="text-sm text-white/60">Social Media Links</h4>
            <InputField
              label="Facebook"
              value={companyData.socialLinks.facebook}
              onChange={(e) => {
                companyData.socialLinks.facebook = e.target.value;
              }}
            />
            <InputField
              label="Twitter"
              value={companyData.socialLinks.twitter}
              onChange={(e) => {
                companyData.socialLinks.twitter = e.target.value;
              }}
            />
            <InputField
              label="Instagram"
              value={companyData.socialLinks.instagram}
              onChange={(e) => {
                companyData.socialLinks.instagram = e.target.value;
              }}
            />
            <InputField
              label="LinkedIn"
              value={companyData.socialLinks.linkedin}
              onChange={(e) => {
                companyData.socialLinks.linkedin = e.target.value;
              }}
            />
          </div>

          <button
            className="col-span-2 px-4 py-2 mt-4 rounded-md active:opacity-80 active:scale-95 transition-all bg-white/10 text-white placeholder-white/50 border border-white/20 focus:border-white/40 focus:outline-none"
            onClick={updateCompany}
          >
            Save
          </button>
        </div>
      );
    } else if (popUpType === "contactInfo") {
      let email = footer.contactInfo.email;
      let phoneNumber = footer.contactInfo.phone;
      const updateContacts = () => {
        dispatch(updateContactInfo({ email, phone: phoneNumber }));
        setShowPopUp(false);
      };
      return (
        <div className="bg-slate-700 h-80 w-80 p-10 text-white pop-up-container opacity-100 rounded-md flex flex-col">
          <div className="flex justify-between items-center">
            <span className="text-sm text-white/60">Contact Information</span>
          </div>
          <InputField
            label="Email"
            value={footer.contactInfo.email}
            onChange={(e) => {
              email = e.target.value;
            }}
          />
          <InputField
            label="Phone"
            value={footer.contactInfo.phone}
            onChange={(e) => {
              phoneNumber = e.target.value;
            }}
          />
          <button
            className="px-4 py-2 rounded-md active:opacity-80 active:scale-95 transition-all bg-white/10 text-white placeholder-white/50 border border-white/20 focus:border-white/40 focus:outline-none"
            onClick={updateContacts}
          >
            Save
          </button>
        </div>
      );
    }
    return null;
  };

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
      {showPopUp && (
        <div
          className="h-screen w-screen absolute flex justify-center items-center top-0 left-0 z-50"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
        >
          <div className="pop-up-container">{PopUpContent()}</div>
        </div>
      )}
      <footer
        className="py-10 z-30"
        style={{ backgroundColor: primaryColor, color: text2Color }}
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
              <br />
              <button
                className="hover:underline cursor-pointer"
                onClick={() => {
                  setPopUpType("companyInfo");
                  setShowPopUp(true);
                }}
              >
                Edit
              </button>
            </div>

            {/* Rest of the footer sections remain the same */}
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
                <button
                  className="hover:underline cursor-pointer"
                  onClick={() => {
                    setPopUpType("contactInfo");
                    setShowPopUp(true);
                  }}
                >
                  Edit
                </button>
              </div>
            </div>

            {/* Locations */}
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
                    <Trash2
                      className="text-red-500 cursor-pointer"
                      size={16}
                      onClick={() => {
                        dispatch(removeLocation(index));
                      }}
                    />
                  </div>
                ))}
                <div>
                  <button
                    className="hover:underline cursor-pointer"
                    onClick={() => {
                      setPopUpType("location");
                      setShowPopUp(true);
                    }}
                  >
                    + Add Location
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Links */}
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
                    <Trash2
                      className="text-red-500 cursor-pointer"
                      size={16}
                      onClick={() => {
                        dispatch(removeQuickLink(index));
                      }}
                    />
                  </li>
                ))}
                <li>
                  <button
                    onClick={() => {
                      setPopUpType("quickLink");
                      setShowPopUp(true);
                    }}
                  >
                    + Add Quick Link
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t h-fit border-gray-700">
            <p className="text-center">
              &copy; {new Date().getFullYear()} {footer.companyInfo.name}. All
              rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
