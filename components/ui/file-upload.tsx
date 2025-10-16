import { cn } from "@/lib/utils";
import React, { useRef, useState } from "react";
import { motion } from "motion/react";
import { IconUpload } from "@tabler/icons-react";
import { useDropzone } from "react-dropzone";

const mainVariant = {
  initial: { x: 0, y: 0 },
  animate: { x: 20, y: -20, opacity: 0.9 },
};

export const FileUpload = ({
  onChange,
}: {
  onChange?: (files: File[]) => void;
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Allow both images and videos
  const handleFileChange = (newFiles: File[]) => {
    const validFiles = newFiles.filter(
      (f) => f.type.startsWith("image/") || f.type.startsWith("video/")
    );
    if (validFiles.length === 0) {
      setError("Only images or videos are supported.");
      return;
    }

    const combined = [...files, ...validFiles].slice(0, 2);
    if (combined.length > 2) {
      setError("You can upload a maximum of 2 files.");
      return;
    }

    setFiles(combined);
    setError(null);
    onChange && onChange(combined);
  };

  const handleClick = () => {
    if (files.length >= 2) {
      setError("Maximum 2 files allowed.");
      return;
    }
    fileInputRef.current?.click();
  };

  const { getRootProps, isDragActive } = useDropzone({
    multiple: true,
    noClick: true,
    onDrop: handleFileChange,
    onDropRejected: () => setError("Unsupported file."),
  });

  return (
    <div className="w-full" {...getRootProps()}>
      <motion.div
        onClick={handleClick}
        whileHover="animate"
        className={cn(
          "p-10 group/file block rounded-lg cursor-pointer w-full relative overflow-hidden",
          files.length >= 2 && "cursor-not-allowed opacity-80"
        )}
      >
        <input
          ref={fileInputRef}
          id="file-upload-handle"
          type="file"
          multiple
          accept="image/*,video/*"
          onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
          className="hidden"
        />

        <div className="flex flex-col items-start justify-center">
          <p className="font-sans font-bold text-neutral-700 text-base md:text-2xl">
            Upload Facial Media
          </p>
          <p className="font-sans text-neutral-400 text-base mt-2">
            Upload up to 2 images or videos for identity verification.
          </p>

          <div className="relative w-full mt-10 max-w-xl mx-auto">
            {files.map((file, idx) => (
              <motion.div
                key={"file" + idx}
                layoutId={idx === 0 ? "file-upload" : "file-upload-" + idx}
                className="relative overflow-hidden z-40 bg-white flex flex-col items-start justify-start md:h-24 p-4 mt-4 w-full mx-auto rounded-md shadow-sm"
              >
                <div className="flex justify-between w-full items-center gap-4">
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    layout
                    className="text-base text-neutral-700 truncate max-w-xs"
                  >
                    {file.name}
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    layout
                    className="rounded-lg px-2 py-1 w-fit shrink-0 text-sm text-neutral-600 bg-gray-100"
                  >
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </motion.p>
                </div>

                <div className="flex text-sm md:flex-row flex-col items-start md:items-center w-full mt-2 justify-between text-neutral-600">
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    layout
                    className="px-1 py-0.5 rounded-md bg-gray-100"
                  >
                    {file.type}
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    layout
                  >
                    modified {new Date(file.lastModified).toLocaleDateString()}
                  </motion.p>
                </div>
              </motion.div>
            ))}

            {files.length < 2 && (
              <motion.div
                layoutId="file-upload"
                variants={mainVariant}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative z-40 bg-white flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md shadow-[0px_10px_50px_rgba(0,0,0,0.1)]"
              >
                {isDragActive ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-neutral-600 flex flex-col items-center"
                  >
                    Drop it
                    <IconUpload className="h-4 w-4 text-neutral-600" />
                  </motion.p>
                ) : (
                  <IconUpload className="h-4 w-4 text-neutral-600" />
                )}
              </motion.div>
            )}

            {error && (
              <p className="mt-4 text-sm text-red-500 font-medium">{error}</p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
