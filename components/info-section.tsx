"use client";

import React from "react";
import { Cpu, ShieldCheck, Video, UserCheck, Eye } from "lucide-react";
import { motion } from "framer-motion";

const InfoSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-black max-w-4xl mx-auto p-8 space-y-8 font-sans"
    >
      <h1 className="text-3xl font-bold border-b  pb-3">
        Deepfake Detection Model Proposal
      </h1>

      <div className="space-y-4">
        <p>
          We propose a <strong>Dual-Stream Deepfake Detection Model</strong> that combines
          semantic and artifact features for robust and interpretable detection.
        </p>

        <ul className="list-disc list-inside space-y-2">
          <li>
            <Cpu className="inline-block mr-2" size={18} />
            <strong>RGB Stream (EdgeNeXt / EfficientNet):</strong> extracts high-level facial
            semantics.
          </li>
          <li>
            <ShieldCheck className="inline-block mr-2" size={18} />
            <strong>Artifact Stream:</strong> uses learnable high-pass filters and error-level
            analysis to expose manipulation artifacts.
          </li>
          <li>
            <UserCheck className="inline-block mr-2" size={18} />
            <strong>Cross-Attention Fusion:</strong> integrates both streams, emphasizing artifact
            evidence in key facial regions.
          </li>
          <li>
            <Video className="inline-block mr-2" size={18} />
            <strong>Multi-Head Output:</strong> produces global fake probability and patch-level
            heatmap.
          </li>
          <li>
            <Eye className="inline-block mr-2" size={18} />
            <strong>DINO Distillation:</strong> aligns student features with a pretrained ViT
            teacher for better generalization.
          </li>
          <li>
            <strong>Adversarial & Ensemble Training:</strong> improves robustness and stability
            across manipulation types.
          </li>
        </ul>
      </div>

      <h2 className="text-2xl font-semibold border-b border-gray-400 pb-2">Proposed Solution</h2>
      <p>aur yeah ahi proposted solution</p>

      <h2 className="text-2xl font-semibold border-b border-gray-400 pb-2">Challenge</h2>
      <p>aur challenge me yeah daal de:</p>

      <h3 className="text-xl font-bold mt-4">Problem Statement</h3>
      <p>
        Design, train, and deploy a unified <strong>eKYC system</strong> that can perform both
        identity verification and forgery detection. Given two or more facial inputs (images or
        video frames), the model should accurately determine whether they belong to the same person
        and whether the media is authentic or manipulated.
      </p>

      <h3 className="text-xl font-bold mt-4">Expected Inputs and Outputs:</h3>
      <ul className="list-disc list-inside space-y-2">
        <li>Input: Two facial images or a short selfie video.</li>
        <li>
          Output: (1) Match Score, (2) Liveness Score, and (3) Authenticity Label.
        </li>
        <li>
          Deployable as a microservice or integrated into mobile/web apps with real-time
          verification.
        </li>
      </ul>

      <h3 className="text-xl font-bold mt-4">Objectives</h3>
      <ol className="list-decimal list-inside space-y-2">
        <li>Develop lightweight and accurate models for identity verification and forgery detection.</li>
        <li>Ensure robustness to real-world variations such as lighting, pose, expression, and occlusion.</li>
        <li>Optimize inference for real-time use on limited hardware (e.g., Colab GPU, mobile devices).</li>
        <li>Demonstrate explainability through score visualization or attention maps.</li>
        <li>Integrate the model into a functional application prototype (web or mobile).</li>
      </ol>
    </motion.section>
  );
};

export default InfoSection;
