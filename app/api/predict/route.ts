import { Client } from "@gradio/client";
import { NextRequest, NextResponse } from "next/server";

// Gradio server URL - update this with your actual URL
const GRADIO_URL = "https://e4e13d29c805de1586.gradio.live/";

export async function POST(request: NextRequest) {
  try {
    // Get the form data from the request
    const formData = await request.formData();
    
    // Get uploaded files and captured image/video
    const uploads = formData.getAll("uploads") as File[];
    const capture = formData.get("capture") as File;

    // Validate that we have the required files
    if (!capture || uploads.length === 0) {
      return NextResponse.json(
        { error: "Missing required files. Please upload images and capture a photo/video." },
        { status: 400 }
      );
    }

    console.log("📁 Received files:");
    uploads.forEach((file, index) => {
      console.log(`  - Upload ${index + 1}: ${file.name} (${file.type}, ${(file.size / 1024).toFixed(2)} KB)`);
    });
    console.log(`  - Capture: ${capture.name} (${capture.type}, ${(capture.size / 1024).toFixed(2)} KB)`);

    // Convert the first uploaded image to blob (img_A_pil)
    const uploadedImageBlob = new Blob([await uploads[0].arrayBuffer()], {
      type: uploads[0].type,
    });

    // Convert the captured media (image or video) to blob (img_B_pil)
    const capturedMediaBlob = new Blob([await capture.arrayBuffer()], {
      type: capture.type,
    });

    console.log(`📤 Processing: ${uploads[0].name} vs ${capture.name}`);

    // Connect to the Gradio client
    console.log("🔗 Connecting to Gradio server:", GRADIO_URL);
    const client = await Client.connect(GRADIO_URL);

    // Make prediction using the exact structure from your example
    console.log("🤖 Making prediction with model: mobilenetv3");
    const result = await client.predict("/predict", {
      model_choice: "mobilenetv3",
      img_A_pil: uploadedImageBlob,
      img_B_pil: capturedMediaBlob,
    });

    console.log("✅ Prediction complete!");
    console.log("📊 Result data:", result.data);

    // Parse and format the response
    const responseData = {
      liveliness_score: result.data[0] || 0,
      matching_score: result.data[1] || 0,
      authenticity_label: result.data[2] || "unknown",
      raw_data: result.data,
    };

    return NextResponse.json(responseData);

  } catch (error) {
    console.error("❌ Error in Gradio prediction:", error);
    
    return NextResponse.json(
      {
        error: "Failed to process prediction",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}