"use client";

import React, { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import { LiveCameraSection } from "@/components/ui/live-camera"; // adjust import path

const Page = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [cameraFile, setCameraFile] = useState<File | null>(null);

  const handleFileUpload = (myFiles: File[]) => {
    setFiles(myFiles);
    console.log("📂 Uploaded Files:", myFiles);
  };

  const handleCameraCapture = (file: File) => {
    setCameraFile(file);
    console.log("🎥 Captured from camera:", file);
  };
  //
  return (
    <section className="relative min-h-screen px-6 md:px-16 py-24 md:py-12 gap-8 overflow-hidden flex flex-col items-center justify-center">
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
        Deepfake-Proof Identity Verification
      </h1>
      <h2 className="text-lg md:text-xl text-gray-700">
        Choose your preferred method for a secure and trustworthy eKYC
        experience.
      </h2>
      {/* File upload section */}
      <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4">
        <div className="w-full flex flex-col items-center justify-center bg-white rounded-xl border p-6 space-y-14">
          <FileUpload onChange={handleFileUpload} />
          <p className="text-gray-500 text-base">
            Accepted formats: JPEG, PNG. Max file size: 5MB per image.
          </p>

          {files.length > 0 && (
            <div className="w-full max-w-sm mt-4 text-sm text-gray-600">
              <p>✅ Uploaded: {files.map((f) => f.name).join(", ")}</p>
            </div>
          )}
        </div>

        {/* Live camera section */}
        <div className="w-full h-full flex flex-col items-center justify-center bg-white rounded-xl border p-6 space-y-4">
          <LiveCameraSection onCapture={handleCameraCapture} />
          {cameraFile && (
            <p className="text-sm text-gray-600">
              ✅ Captured: {cameraFile.name} (
              {(cameraFile.size / 1024 / 1024).toFixed(2)} MB)
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Page;
