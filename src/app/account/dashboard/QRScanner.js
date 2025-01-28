'use client';

import React, { useEffect, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { Camera } from 'lucide-react';

const QRScanner = () => {
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    const html5QrCode = new Html5Qrcode("qr-reader");
    
    const startScanner = async () => {
      try {
        setScanning(true);
        await html5QrCode.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
            aspectRatio: 1,
            showTorchButtonIfSupported: true,
            // Disable default UI elements to prevent duplicate rendering
            hideControls: true,
          },
          (decodedText) => {
            setResult(decodedText);
            setError('');
          },
          (errorMessage) => {
            // console.log(errorMessage);
          }
        );
      } catch (err) {
        // setError(err.message || 'Failed to start scanner');
        // setScanning(false);
      }
    };

    startScanner();

    return () => {
      if (html5QrCode?.isScanning) {
        html5QrCode.stop().catch();
      }
    };
  }, []);

  return (
    <div className="w-full max-w-md mx-auto p-4 space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Camera className="h-6 w-6" />
        <h2 className="text-xl font-semibold">QR Code Scanner</h2>
      </div>

      {error && (
        <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-lg">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      )}

      <div className="relative aspect-square w-full overflow-hidden rounded-lg border bg-gray-100">
        <div 
          id="qr-reader" 
          className="w-full h-full [&_video]:object-cover [&_video]:h-full [&_video]:w-full [&_img]:hidden"
        />
      </div>

      {result && (
        <div className="p-4 border rounded-lg bg-gray-100">
          <p className="font-medium">Scanned Result:</p>
          <p className="break-all">{result}</p>
        </div>
      )}

      {!scanning && !error && (
        <div className="p-4 bg-blue-100 text-blue-700 rounded-lg">
          <p className="font-bold">Starting Camera</p>
          <p>Please wait while we initialize the camera...</p>
        </div>
      )}
    </div>
  );
};

export default QRScanner;