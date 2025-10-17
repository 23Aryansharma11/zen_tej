"use client";

import { Client } from "@gradio/client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FileUpload } from "@/components/ui/file-upload";
import { LiveCameraSection } from "@/components/ui/live-camera";
import { Button } from "@/components/ui/button";

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
    if (files.length === 0 && !cameraFile) {
      alert("Please upload images or capture from camera before submitting.");
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("🔗 Connecting to Gradio server:", GRADIO_URL);

      // Prepare blobs safely
      const uploadedImageBlob =
        files.length > 0
          ? new Blob([await files[0].arrayBuffer()], { type: files[0].type })
          : null;

      let capturedMediaBlob: Blob | null = null;
      if (cameraFile) {
        capturedMediaBlob = new Blob([await cameraFile.arrayBuffer()], {
          type: cameraFile.type,
        });
      } else if (files.length > 1) {
        capturedMediaBlob = new Blob([await files[1].arrayBuffer()], {
          type: files[1].type,
        });
      } else {
        capturedMediaBlob = uploadedImageBlob;
      }

      if (!uploadedImageBlob || !capturedMediaBlob) {
        alert("Files missing required for prediction.");
        setIsSubmitting(false);
        return;
      }

      // Connect to Gradio client
      const client = await Client.connect(GRADIO_URL);

      console.log("🤖 Making prediction with model: mobilenetv3");

      const result = await client.predict("/predict", {
        model_choice: "edgenext",
        img_A_pil: uploadedImageBlob,
        img_B_pil: capturedMediaBlob,
      });

      console.log("✅ Prediction complete!");
      console.log("📊 Result data:", result.data);

      console.log(result);

      const report = result.data?.[2] ?? "";

      console.log(report);

      // Extract match score
      const matchScoreMatch = report.match(
        /Match Score \(Cosine\).*?`([\d.]+)`/
      );
      const matching_score = matchScoreMatch
        ? parseFloat(matchScoreMatch[1])
        : 0;

      // Determine authenticity label keyword
      let authenticity_label = "Unknown";
      if (report.includes("REJECT IDENTITY")) {
        authenticity_label = "Rejected";
      } else if (report.includes("MATCH")) {
        authenticity_label = "Authentic";
      }

      // Liveliness score extraction (optional, example parsing FAKE Confidence Score)
      const fakeScoreMatch = report.match(/FAKE Confidence Score.*?`([\d.]+)`/);
      const liveliness_score = fakeScoreMatch
        ? parseFloat(fakeScoreMatch[1])
        : 0;

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

      <div className="flex flex-col md:flex-row items-center justify-center w-full gap-8">
        <iframe
          src="https://d977616d1fcfc833ae.gradio.live/"
          width="850"
          height="1000"
          allow="camera; microphone"
        ></iframe>
      </div>
    </section>
  );
};

export default Page;
