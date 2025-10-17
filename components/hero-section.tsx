"use client";

import { motion } from "framer-motion";
import { Compare } from "@/components/ui/compare";
import { PointerHighlight } from "@/components/ui/pointer-highlight";

import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="relative flex flex-col-reverse md:flex-row items-center justify-between min-h-screen px-6 md:px-16 py-24 md:py-12 overflow-hidden">
      {/* Text Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full md:w-1/2 flex flex-col items-start text-center md:text-left gap-4 md:gap-6"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
          RealID
        </h1>

        <p className="text-lg md:text-xl text-gray-700 max-w-xl">
          Secure Identities in the Age of AI
          <br />
          <PointerHighlight>
            <span className="text-blue-600 font-semibold px-4 py-2">
              Detect. Verify. Trust.
            </span>
          </PointerHighlight>
        </p>

        <p className="text-gray-500 max-w-md leading-relaxed">
          AI-driven identity verification that goes beyond surface checks.
          Real-time deepfake detection, liveness analysis, and explainable
          insights — engineered to establish trust at scale.
        </p>

        <div className="flex flex-wrap gap-4 mt-6">
          <Link
            href="https://e4e13d29c805de1586.gradio.live/"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all duration-300 shadow-sm hover:shadow-md"
          >
            View Demo
          </Link>
          <button className="px-6 py-3 border border-gray-400 hover:border-gray-600 text-gray-800 rounded-xl font-medium transition-all duration-300">
            Learn More
          </button>
        </div>
      </motion.div>

      {/* Visual Comparison */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
        className="relative w-full md:w-1/2 flex justify-center mb-8 md:mb-0"
      >
        <div className="shadow-2xl rounded-2xl overflow-hidden">
          <Compare
            firstImage="/person1.png"
            secondImage="/res.png"
            firstImageClassName="object-cover object-center"
            secondImageClassname="object-cover object-center"
            className="h-[250px] w-[220px] md:h-[480px] md:w-[480px]"
            slideMode="hover"
            autoplay
            autoplayDuration={4000}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
