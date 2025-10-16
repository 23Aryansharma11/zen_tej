"use client";

import React, { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import { LiveCameraSection } from "@/components/ui/live-camera";
import { Button } from "@/components/ui/button";

const Page = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [cameraFile, setCameraFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMsg, setResponseMsg] = useState<string | null>(null);

  // ✅ Handle file uploads
  const handleFileUpload = (myFiles: File[]) => {
    // Rename uploaded images for backend consistency
    const renamed = myFiles.map(
      (f, i) => new File([f], `upload_${i + 1}.jpg`, { type: f.type })
    );
    setFiles(renamed);
    console.log("📂 Uploaded Files:", renamed);
  };

  // ✅ Handle camera captures
  const handleCameraCapture = (file: File) => {
    const renamed = new File(
      [file],
      file.type.includes("video") ? "capture.mp4" : "capture.jpg",
      { type: file.type }
    );
    setCameraFile(renamed);
    console.log("🎥 Captured from camera:", renamed);
  };

  // ✅ Submit both image(s) + camera capture
  const handleSubmit = async () => {
    if (!cameraFile || files.length === 0) return;
    setIsSubmitting(true);
    setResponseMsg(null);

    try {
      const formData = new FormData();
      files.forEach((f) => formData.append("uploads", f));
      formData.append("capture", cameraFile);

      const res = await fetch("http://localhost:3000/api/predict", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to submit data");

      const data = await res.json();
      setResponseMsg(`✅ Success: ${JSON.stringify(data)}`);
    } catch (err: any) {
      console.error("❌ Error:", err);
      setResponseMsg("❌ Submission failed. Check console or backend logs.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const canSubmit = files.length > 0 && cameraFile !== null;

  return (
    <section className="relative min-h-screen px-6 md:px-16 py-24 md:py-12 gap-8 overflow-hidden flex flex-col items-center justify-center">
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
        RealID: AI-Powered Identity Verification
      </h1>
      <h2 className="text-lg md:text-xl text-gray-700 mb-6">
        Upload your images or capture live footage to verify authenticity.
      </h2>

      <div className="flex flex-col md:flex-row items-center justify-between w-full gap-8">
        {/* File upload section */}
        <div className="w-full flex flex-col items-center justify-center bg-white rounded-xl border p-6 space-y-6">
          <FileUpload onChange={handleFileUpload} />
          <p className="text-gray-500 text-base">
            Accepted formats: JPEG, PNG. Max file size: 5MB per image.
          </p>
          {files.length > 0 && (
            <div className="w-full max-w-sm text-sm text-gray-600">
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

      {/* Submit button */}
      <div className="mt-8">
        <Button
          onClick={handleSubmit}
          disabled={!canSubmit || isSubmitting}
          className={`px-8 py-4 text-lg font-semibold ${
            canSubmit ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400"
          }`}
        >
          {isSubmitting ? "Submitting..." : "Submit for Verification"}
        </Button>
      </div>

      {/* Response feedback */}
      {responseMsg && (
        <p className="mt-6 text-sm text-gray-700 max-w-xl text-center">
          {responseMsg}
        </p>
      )}
    </section>
  );
};

export default Page;
