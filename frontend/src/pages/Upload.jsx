import React, { useState, useCallback, useRef } from "react";
import { CloudArrowUpIcon, InformationCircleIcon } from "@heroicons/react/24/outline";

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [aiDetected, setAiDetected] = useState(null); // null = no check yet, true/false = result
  const [dragActive, setDragActive] = useState(false);

  const inputRef = useRef(null);

  const resetState = () => {
    setSelectedFile(null);
    setPreviewURL(null);
    setAiDetected(null);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    processFile(file);
  };

  const processFile = (file) => {
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      setPreviewURL(URL.createObjectURL(file));
      setAiDetected(null);
    } else {
      resetState();
      alert("Please select a valid image file.");
    }
  };

  // Drag and drop handlers
  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    if (e.type === "dragleave") setDragActive(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!selectedFile) return;

    // Simulate processing and detection result - replace with actual API call
    // Here, randomly set AI detected or not for demonstration:
    const detected = Math.random() < 0.5;
    setAiDetected(detected);
  };

  return (
    <div className="flex min-h-screen justify-center px-4 pt-[80px] pb-12 bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 items-start">
      <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-white/20 p-10 shadow-2xl backdrop-blur-md">
        <header className="mb-6 text-center">
          <h2 className="flex items-center justify-center text-3xl font-extrabold tracking-wide text-white drop-shadow">
            <CloudArrowUpIcon className="h-8 w-8 mr-2 text-indigo-400" />
            Deepfake Image Detector
          </h2>
          <p className="mt-2 text-indigo-200 font-medium">
            Upload an image to check if it’s AI-generated or not!
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6" aria-label="Image upload form">
          {/* Drag & Drop zone */}
          <div
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") inputRef.current?.click();
            }}
            className={`relative cursor-pointer rounded-lg border-2 border-dashed border-indigo-400 bg-white/30 px-6 py-16 text-center transition-colors 
              ${dragActive ? "bg-indigo-600/30 border-indigo-600" : ""}
            `}
          >
            <input
              ref={inputRef}
              id="imageUpload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
              aria-describedby="fileUploadDescription"
            />
            <CloudArrowUpIcon className="mx-auto mb-4 h-12 w-12 text-indigo-400" aria-hidden="true" />
            <p className="text-indigo-200 font-semibold">
              Drag and drop an image here, or <span className="text-blue-300 underline">browse files</span>
            </p>
            <p id="fileUploadDescription" className="mt-2 text-xs text-indigo-300">
              Supported file types: JPG, PNG, GIF, etc.
            </p>
          </div>

          {/* Preview */}
          {previewURL && (
            <div className="flex flex-col items-center space-y-2">
              <img
                src={previewURL}
                alt={`Preview of ${selectedFile.name}`}
                className="max-h-56 w-auto rounded-md border-2 border-blue-400 shadow-lg"
              />
              <span className="text-indigo-200 text-sm font-medium">{selectedFile.name}</span>
              <button
                type="button"
                onClick={resetState}
                className="mt-1 rounded-md border border-red-500 bg-red-600 px-3 py-1 text-sm font-semibold text-white hover:bg-red-700 transition"
                aria-label="Remove selected image"
              >
                Remove Image
              </button>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!selectedFile}
            className={`w-full rounded-lg px-6 py-3 font-bold transition 
              ${selectedFile
                ? "bg-gradient-to-r from-indigo-500 to-blue-500 text-white hover:from-indigo-700 hover:to-blue-700 shadow-lg"
                : "bg-indigo-200 text-indigo-400 cursor-not-allowed"
              }
            `}
            aria-disabled={!selectedFile}
          >
            Check Image {selectedFile ? "" : "(Select an image first)"}
          </button>
        </form>

        {/* AI Detection Result */}
        {aiDetected !== null && (
          <div
            className={`mt-8 rounded-lg border px-6 py-5 text-center text-white font-semibold drop-shadow-md
              ${aiDetected ? "bg-red-600 border-red-700" : "bg-green-600 border-green-700"}
            `}
            role="alert"
            aria-live="polite"
          >
            <InformationCircleIcon className="inline h-6 w-6 mr-2 align-middle" />
            {aiDetected
              ? "Warning: The uploaded image is detected as AI-generated."
              : "The uploaded image appears to be genuine."}
          </div>
        )}

        {/* Instructions Section */}
        <section className="mt-12 rounded-lg bg-indigo-900/70 p-5 text-indigo-300 text-sm leading-relaxed">
          <h3 className="mb-2 font-semibold text-white tracking-wide text-lg">How to use this tool:</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Upload a clear image file (JPG, PNG, GIF, etc.)</li>
            <li>The AI will analyze the image and check for signs of deepfake manipulation.</li>
            <li>Results will display below once analysis is complete.</li>
            <li>Note: This is a demo interface. The detection feature will be enabled soon.</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Upload;
