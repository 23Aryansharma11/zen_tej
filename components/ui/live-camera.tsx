"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { Camera, Video } from "lucide-react";

export function LiveCameraSection({
  onCapture,
}: {
  onCapture?: (file: File) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const [mode, setMode] = useState<"photo" | "video">("photo");
  const [isRecording, setIsRecording] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    const initCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: mode === "video",
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        console.error("Camera access denied:", err);
      }
    };

    initCamera();
    return () => {
      stream?.getTracks().forEach((t) => t.stop());
    };
  }, [mode]);

  // 📸 Capture Photo
  const capturePhoto = () => {
    if (!canvasRef.current || !videoRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], "capture.jpg", { type: "image/jpeg" });
        setPreview(URL.createObjectURL(file));
        onCapture && onCapture(file);
      }
    }, "image/jpeg");
  };

  // 🎥 Start Recording
  const startRecording = () => {
    if (!stream) return;
    const recorder = new MediaRecorder(stream);
    const chunks: BlobPart[] = [];

    recorder.ondataavailable = (e) => chunks.push(e.data);
    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: "video/mp4" });
      const file = new File([blob], "capture.mp4", { type: "video/mp4" });
      setPreview(URL.createObjectURL(file));
      onCapture && onCapture(file);
    };

    recorder.start();
    mediaRecorderRef.current = recorder;
    setIsRecording(true);
  };

  // 🛑 Stop Recording
  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center space-y-4">
      <div className="flex gap-4 mb-4">
        <Button
          variant={mode === "photo" ? "default" : "outline"}
          onClick={() => setMode("photo")}
        >
          <Camera /> Photo
        </Button>
        <Button
          variant={mode === "video" ? "default" : "outline"}
          onClick={() => setMode("video")}
        >
          <Video /> Video
        </Button>
      </div>

      <div className="relative w-full max-w-lg aspect-video bg-black rounded-lg overflow-hidden">
        {!preview ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative"
          >
            {mode === "photo" ? (
              <img
                src={preview}
                alt="Captured Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <video
                src={preview}
                controls
                className="w-full h-full object-cover"
              />
            )}
          </motion.div>
        )}
      </div>

      {!preview && (
        <div className="flex gap-4">
          {mode === "photo" && (
            <Button onClick={capturePhoto}>Take Photo</Button>
          )}
          {mode === "video" &&
            (!isRecording ? (
              <Button onClick={startRecording}>Start Recording</Button>
            ) : (
              <Button variant="destructive" onClick={stopRecording}>
                Stop Recording
              </Button>
            ))}
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
