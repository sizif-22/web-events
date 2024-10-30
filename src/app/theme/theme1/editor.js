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
import { ArrowRight } from "lucide-react";
import Input from "@/app/components/file upload/input";
import Image from "next/image";
import { useEffect, useState } from "react";
import Footer from "./components/footer";
import SvgBtn from "./components/svgBtn";
const Editor = () => {
  const dispatch = useDispatch();
  const { features, img1Url, img2Url, logoUrl, colors } = useSelector(
    (state) => state.editor
  );
  const [primaryColor, setPrimaryColor] = useState(colors.primary);
  const [secondaryColor, setSecondaryColor] = useState(colors.secondary);
  const [textColor, setTextColor] = useState(colors.accent);
  const [text2Color, setText2Color] = useState(colors.text);

  useEffect(() => {
    setPrimaryColor(colors.primary);
    setSecondaryColor(colors.secondary);
    setTextColor(colors.accent);
    setText2Color(colors.text);
  }, [colors]);
  const BTN = () => {
    return (
      <button
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
                placeholder="Title"
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
      <Footer primaryColor={primaryColor} text2Color={text2Color} />
    </>
  );
};
export default Editor;
