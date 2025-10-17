"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FileUpload } from "@/components/ui/file-upload";
import { LiveCameraSection } from "@/components/ui/live-camera";
import { Button } from "@/components/ui/button";
import { Client } from "@gradio/client";

const Page = () => {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const [cameraFile, setCameraFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Gradio server URL
  const GRADIO_URL = "https://e4e13d29c805de1586.gradio.live/";

  const handleFileUpload = (myFiles: File[]) => {
    const renamed = myFiles.map(
      (f, i) => new File([f], `upload_${i + 1}.jpg`, { type: f.type })
    );
    setFiles(renamed);
    console.log(`✅ ${renamed.length} file(s) uploaded`);
  };

  const handleCameraCapture = (file: File) => {
    const renamed = new File(
      [file],
      file.type.includes("video") ? "capture.mp4" : "capture.jpg",
      { type: file.type }
    );
    setCameraFile(renamed);
    console.log(`✅ Camera captured: ${renamed.name}`);
  };

  const handleSubmit = async () => {
    // Check if we have at least files or camera
    if (files.length === 0 && !cameraFile) {
      alert("Please upload images or capture from camera before submitting.");
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("🔗 Connecting to Gradio server:", GRADIO_URL);

      // Convert files to blobs for Gradio
      let uploadedImageBlob: Blob;
      let capturedMediaBlob: Blob;

      // Get the first uploaded file
      if (files.length > 0) {
        uploadedImageBlob = new Blob([await files[0].arrayBuffer()], {
          type: files[0].type,
        });
      }

      // Get camera capture or use second uploaded file
      if (cameraFile) {
        capturedMediaBlob = new Blob([await cameraFile.arrayBuffer()], {
          type: cameraFile.type,
        });
      } else if (files.length > 1) {
        capturedMediaBlob = new Blob([await files[1].arrayBuffer()], {
          type: files[1].type,
        });
      } else {
        // Use same file for both if only one uploaded
        capturedMediaBlob = uploadedImageBlob!;
      }

      // Connect to Gradio client
      const client = await Client.connect(GRADIO_URL);

      console.log("🤖 Making prediction with model: mobilenetv3");

      // Make prediction
      const result = await client.predict("/predict", {
        model_choice: "mobilenetv3",
        img_A_pil: uploadedImageBlob!,
        img_B_pil: capturedMediaBlob,
      });

      console.log("✅ Prediction complete!");
      console.log("📊 Result data:", result.data);

      // Parse the result
      const liveliness_score = result.data[0] || 0;
      const matching_score = result.data[1] || 0;
      const authenticity_label = result.data[2] || "unknown";

      // Navigate to result page with data
      router.push(
        `/result?liveliness=${liveliness_score}&matching=${matching_score}&auth=${authenticity_label}`
      );
    } catch (err) {
      console.error("❌ Error:", err);
      alert(
        err instanceof Error
          ? err.message
          : "Submission failed. Check console for details."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const canSubmit = files.length > 0 || cameraFile !== null;

  return (
    <section className="relative min-h-screen px-6 md:px-16 py-24 md:py-12 gap-8 overflow-hidden flex flex-col items-center justify-center">
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
        RealID: AI-Powered Identity Verification
      </h1>
      <h2 className="text-lg md:text-xl text-gray-700 mb-6">
        Upload your images or capture live footage to verify authenticity.
      </h2>

      <div className="flex flex-col md:flex-row items-center justify-between w-full gap-8">
        <div className="w-full flex flex-col items-center justify-center bg-white rounded-xl border p-6 space-y-6">
          <FileUpload onChange={handleFileUpload} />
          <p className="text-gray-500 text-base">
            Accepted formats: JPEG, PNG. Max file size: 5MB per image.
          </p>
          {files.length > 0 && (
            <p className="text-green-600 font-semibold">
              ✅ {files.length} file(s) ready
            </p>
          )}
        </div>

        <div className="w-full h-full flex flex-col items-center justify-center bg-white rounded-xl border p-6 space-y-4">
          <LiveCameraSection onCapture={handleCameraCapture} />
          {cameraFile && (
            <p className="text-green-600 font-semibold">✅ Camera captured</p>
          )}
        </div>
      </div>

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
    </section>
  );
};

export default Page;
