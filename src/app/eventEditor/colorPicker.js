"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Pipette, Copy, Check } from "lucide-react";

const hsvToRgb = (h, s, v) => {
  s = s / 100;
  v = v / 100;
  const i = Math.floor(h / 60);
  const f = h / 60 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);
  let r, g, b;
  switch (i % 6) {
    case 0:
      [r, g, b] = [v, t, p];
      break;
    case 1:
      [r, g, b] = [q, v, p];
      break;
    case 2:
      [r, g, b] = [p, v, t];
      break;
    case 3:
      [r, g, b] = [p, q, v];
      break;
    case 4:
      [r, g, b] = [t, p, v];
      break;
    case 5:
      [r, g, b] = [v, p, q];
      break;
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
};

const rgbToHex = (r, g, b) => {
  return `#${[r, g, b]
    .map((x) => x.toString(16).padStart(2, "0"))
    .join("")}`.toUpperCase();
};

const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

const rgbToHsv = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  let h,
    s = max === 0 ? 0 : d / max,
    v = max;

  switch (max) {
    case min:
      h = 0;
      break;
    case r:
      h = (g - b) / d + (g < b ? 6 : 0);
      break;
    case g:
      h = (b - r) / d + 2;
      break;
    case b:
      h = (r - g) / d + 4;
      break;
  }
  h = Math.round(h * 60);
  s = Math.round(s * 100);
  v = Math.round(v * 100);

  return { h, s, v };
};

const ColorPicker = ({ label, color, onChange }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [currentColor, setCurrentColor] = useState(color);
  const [inputValue, setInputValue] = useState(color);
  const [copied, setCopied] = useState(false);
  const [hsv, setHsv] = useState({ h: 0, s: 100, v: 100 });

  // Update color from HSV
  const updateFromHsv = useCallback(
    (h, s, v) => {
      const rgb = hsvToRgb(h, s, v);
      const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
      setCurrentColor(hex);
      setInputValue(hex);
      onChange?.(hex);
      setHsv({ h, s, v });
    },
    [onChange]
  );

  // Initialize HSV from color prop
  useEffect(() => {
    const rgb = hexToRgb(color);
    if (rgb) {
      const { h, s, v } = rgbToHsv(rgb.r, rgb.g, rgb.b);
      setHsv({ h, s, v });
      setInputValue(color);
    }
  }, [color]);

  const handleInputChange = (e) => {
    let value = e.target.value;
    setInputValue(value); // Always update the input value for smooth typing

    // Remove any spaces and make uppercase
    value = value.replace(/\s/g, "").toUpperCase();

    // Add # if it's missing and the user starts typing
    if (value.length > 0 && !value.startsWith("#")) {
      value = "#" + value;
    }

    // Only update the color when we have a valid hex
    if (/^#[0-9A-F]{6}$/i.test(value)) {
      handleColorChange(value);
    }
  };

  const handleColorChange = (newColor) => {
    if (/^#[0-9A-F]{6}$/i.test(newColor)) {
      const upperColor = newColor.toUpperCase();
      setCurrentColor(upperColor);
      setInputValue(upperColor);
      onChange?.(upperColor);

      const rgb = hexToRgb(newColor);
      if (rgb) {
        const { h, s, v } = rgbToHsv(rgb.r, rgb.g, rgb.b);
        setHsv({ h, s, v });
      }
    }
  };

  const handleEyeDropper = async () => {
    try {
      if (!window.EyeDropper) {
        alert("Your browser doesn't support the EyeDropper API");
        return;
      }
      const eyeDropper = new window.EyeDropper();
      const result = await eyeDropper.open();
      handleColorChange(result.sRGBHex);
    } catch (e) {
      console.log("EyeDropper failed:", e);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentColor);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClickOutside = useCallback((e) => {
    if (!e.target.closest(".color-picker-container")) {
      setShowPicker(false);
    }
  }, []);

  useEffect(() => {
    if (showPicker) {
      window.addEventListener("mousedown", handleClickOutside);
      return () => window.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showPicker, handleClickOutside]);

  return (
    <div className="color-picker-container relative">
      {label && <label className="text-white block mb-2">{label}</label>}
      <div className="flex items-center gap-2">
        <div
          className="w-10 h-10 rounded-md cursor-pointer border border-white shadow-sm hover:shadow-md transition-shadow"
          style={{ backgroundColor: currentColor }}
          onClick={() => setShowPicker(!showPicker)}
        />
        <div className="flex items-center gap-2 bg-white/10 rounded-md p-1">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            maxLength={7}
            className="w-24 bg-transparent text-white text-sm px-2 focus:outline-none"
            placeholder="#FFFFFF"
          />
          <button
            onClick={handleEyeDropper}
            className="p-1 hover:bg-white/10 rounded transition-colors"
            title="Pick color from screen"
          >
            <Pipette className="w-4 h-4 text-white" />
          </button>
          <button
            onClick={copyToClipboard}
            className="p-1 hover:bg-white/10 rounded transition-colors"
            title="Copy hex code"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-400" />
            ) : (
              <Copy className="w-4 h-4 text-white" />
            )}
          </button>
        </div>
      </div>

      {showPicker && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40">
          <div className="bg-white p-4 rounded-lg shadow-xl border border-gray-200">
            <div className="space-y-4">
              <div className="relative w-64 h-48">
                <div
                  className="absolute inset-0 rounded-lg cursor-pointer"
                  style={{
                    backgroundColor: `hsl(${hsv.h}, 100%, 50%)`,
                    backgroundImage: `
                      linear-gradient(to right, #fff 0%, transparent 100%),
                      linear-gradient(to bottom, transparent 0%, #000 100%)
                    `,
                  }}
                  onClick={(e) => {
                    const rect = e.target.getBoundingClientRect();
                    const x = Math.min(
                      Math.max((e.clientX - rect.left) / rect.width, 0),
                      1
                    );
                    const y = Math.min(
                      Math.max((e.clientY - rect.top) / rect.height, 0),
                      1
                    );
                    updateFromHsv(hsv.h, x * 100, (1 - y) * 100);
                  }}
                />
                <div
                  className="absolute w-4 h-4 rounded-full border-2 border-white shadow-md transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                  style={{
                    backgroundColor: currentColor,
                    left: `${hsv.s}%`,
                    top: `${100 - hsv.v}%`,
                  }}
                />
              </div>

              <div className="relative h-4">
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={hsv.h}
                  className="w-full h-full rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, 
                      #FF0000 0%,
                      #FFFF00 17%,
                      #00FF00 33%,
                      #00FFFF 50%,
                      #0000FF 67%,
                      #FF00FF 83%,
                      #FF0000 100%
                    )`,
                  }}
                  onChange={(e) => {
                    const hue = parseInt(e.target.value);
                    updateFromHsv(hue, hsv.s, hsv.v);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
