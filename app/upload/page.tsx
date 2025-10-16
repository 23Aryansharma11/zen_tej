"use client";

import React, { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";

const page = () => {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileUpload = (myFiles: File[]) => {
    setFiles(myFiles);
    console.log(myFiles[0]);
  };

  return (
    <section className="relative flex flex-col md:flex-row items-center justify-between min-h-screen px-6 md:px-16 py-24 md:py-12 overflow-hidden">
      {/* File upload section */}
      <div className="w-full h-full flex flex-col items-center justify-center bg-white rounded-xl border p-6">
        <FileUpload onChange={handleFileUpload} />
        <p>Accepted formats: JPEG, PNG. Max file size: 5MB per image.</p>
      </div>
      {/* live camera section */}
      <FileUpload onChange={handleFileUpload} />
    </section>
  );
};

export default page;
