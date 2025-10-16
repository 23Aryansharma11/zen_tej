"use client";

import { Compare } from "@/components/ui/compare";
import Link from "next/link";
const HeroSection = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row items-center justify-between min-h-screen px-6 md:px-16 py-24 md:py-12">
      <div className="relative z-10 w-full md:w-1/2 flex flex-col items-start gap-2 md:gap-6 text-center md:text-left">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
          Deepfake-Proof eKYC
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-xl">
          Secure Identities in the Age of AI <br />
          <span className="text-blue-600 font-semibold">
            Detect. Verify. Trust.
          </span>
        </p>
        <p className="text-gray-500 max-w-md">
          AI-driven identity verification that sees beyond deception. Real-time
          deepfake detection, liveness authentication, and explainable insights
          — all optimized for trust at scale.
        </p>

        <div className="flex flex-wrap gap-4 mt-4">
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all duration-300">
            Learn More
          </button>
          <Link
            href={"/upload"}
            className="px-6 py-3 border border-gray-400 hover:border-gray-600 text-gray-800 rounded-xl font-medium transition-all duration-300"
          >
            View Demo
          </Link>
        </div>
      </div>

      <div className="relative z-10 w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
        <Compare
          firstImage="/person1.png"
          secondImage="/result.png"
          firstImageClassName="object-cover object-left-top"
          secondImageClassname="object-cover object-left-top"
          className="h-[250px] w-[200px] md:h-[500px] md:w-[500px]"
          slideMode="hover"
        />
      </div>
    </div>
  );
};

export default HeroSection;
