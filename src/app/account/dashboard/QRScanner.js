import React, { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { Camera, StopCircle, X, CheckCircle } from "lucide-react";
import { db } from "@/app/firebase/firebase.user";
import { updateDoc, doc } from "firebase/firestore";

const Toast = ({ message, type, onClose }) => (
  <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg animate-in fade-in slide-in-from-top-2 ${
    type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
  }`}>
    {type === 'success' ? (
      <CheckCircle className="h-5 w-5" />
    ) : (
      <X className="h-5 w-5" />
    )}
    <p className="font-medium">{message}</p>
    <button onClick={onClose} className="ml-4">
      <X className="h-4 w-4 hover:opacity-80" />
    </button>
  </div>
);

const QRScanner = ({ eventId }) => {
  const [error, setError] = useState("");
  const [scanning, setScanning] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const scannerRef = useRef(null);
  
  const handleResult = async (decodedText) => {
    setError("");
    scannerRef.current.pause(true);
    
    if (eventId === decodedText.substring(0, eventId.length)) {
      const userId = decodedText.substring(eventId.length + 2);
      const userDoc = doc(db, "events", eventId, "participants", userId);
      try {
        await updateDoc(userDoc, { attended: true });
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
        }, 3000);
      } catch (error) {
        setError("Failed to update attendance status");
      }
    } else {
      setError("Invalid QR code for this event");
    }
    
    setTimeout(() => {
      scannerRef.current.resume();
    }, 1000);
  };

  useEffect(() => {
    scannerRef.current = new Html5Qrcode("qr-reader");
    return () => {
      if (scannerRef.current?.isScanning) {
        scannerRef.current.stop().catch();
      }
      scannerRef.current?.clear();
    };
  }, []);

  const startScanner = async () => {
    try {
      setError("");
      setScanning(true);
      await scannerRef.current.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1,
          showTorchButtonIfSupported: true,
          hideControls: true,
        },
        handleResult,
        (errorMessage) => {
        }
      );
    } catch (err) {
      setError(err.message || "Failed to start scanner");
      setScanning(false);
    }
  };

  const stopScanner = async () => {
    try {
      await scannerRef.current?.stop();
      setScanning(false);
    } catch (err) {
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 space-y-4 relative">
      {/* Success Toast */}
      {showSuccess && (
        <Toast 
          message="Attendance recorded successfully"
          type="success"
          onClose={() => setShowSuccess(false)}
        />
      )}
      
      {/* Error Toast */}
      {error && (
        <Toast 
          message={error}
          type="error"
          onClose={() => setError("")}
        />
      )}

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Camera className="h-6 w-6" />
          <h2 className="text-xl font-semibold">QR Code Scanner</h2>
        </div>

        <button
          onClick={scanning ? stopScanner : startScanner}
          className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${
            scanning
              ? "bg-red-500 hover:bg-red-600 text-white"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          {scanning ? (
            <>
              <StopCircle className="h-5 w-5" />
              Stop Scanning
            </>
          ) : (
            <>
              <Camera className="h-5 w-5" />
              Start Scanning
            </>
          )}
        </button>
      </div>

      <div className="relative aspect-square w-full overflow-hidden rounded-lg border bg-gray-100">
        <div
          id="qr-reader"
          className="w-full h-full [&_video]:object-cover [&_video]:h-full [&_video]:w-full [&_img]:hidden"
        />
      </div>
    </div>
  );
};

export default QRScanner;