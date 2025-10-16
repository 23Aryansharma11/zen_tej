"use client";

import React, { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

// ✅ Separate component that actually uses useSearchParams()
const ResultContent = () => {
  const router = useRouter();
  const params = useSearchParams();

  const liveliness = parseFloat(params.get("liveliness") || "0");
  const matching = parseFloat(params.get("matching") || "0");
  const authenticity = params.get("auth") || "Unknown";

  const isAuthentic = authenticity.toLowerCase() === "authentic";

  return (
    <section className="flex flex-col items-center justify-center min-h-screen px-6 md:px-16 py-24 w-full relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-lg rounded-2xl p-10 max-w-2xl w-full text-center space-y-6 border"
      >
        <h1 className="text-3xl font-bold text-gray-900">
          Verification Result
        </h1>
        <p className="text-gray-600">
          AI-driven evaluation of your identity submission.
        </p>

        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className={`rounded-xl p-6 mt-6 ${
            isAuthentic ? "bg-green-50" : "bg-red-50"
          }`}
        >
          <h2
            className={`text-4xl font-bold ${
              isAuthentic ? "text-green-600" : "text-red-600"
            }`}
          >
            {authenticity.toUpperCase()}
          </h2>
          <p className="mt-2 text-gray-700">
            The submitted media was analyzed using advanced deepfake and
            liveness detection algorithms.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="p-6 rounded-xl bg-blue-50">
            <p className="text-gray-500 font-medium">Liveliness Score</p>
            <p className="text-3xl font-bold text-blue-600">
              {liveliness.toFixed(2)}
            </p>
          </div>
          <div className="p-6 rounded-xl bg-purple-50">
            <p className="text-gray-500 font-medium">Matching Score</p>
            <p className="text-3xl font-bold text-purple-600">
              {matching.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="mt-10">
          <Button
            onClick={() => router.push("/")}
            className="bg-blue-600 hover:bg-blue-700 px-8 py-3"
          >
            Run Another Verification
          </Button>
        </div>
      </motion.div>
    </section>
  );
};

// ✅ Wrap with Suspense at top-level export
const ResultPage = () => {
  return (
    <Suspense fallback={<div className="text-center p-20">Loading...</div>}>
      <ResultContent />
    </Suspense>
  );
};

export default ResultPage;
