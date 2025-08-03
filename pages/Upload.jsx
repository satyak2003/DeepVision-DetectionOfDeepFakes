import React, { useState } from 'react';

// Use icons if you want: import { CloudArrowUpIcon } from '@heroicons/react/outline';

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
<<<<<<< Updated upstream
=======
  const [aiDetected, setAiDetected] = useState(null); // null = no check yet, true/false = result
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const inputRef = useRef(null);

  const resetState = () => {
    setSelectedFile(null);
    setPreviewURL(null);
    setAiDetected(null);
    setError(null);
  };
>>>>>>> Stashed changes

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (file) setPreviewURL(URL.createObjectURL(file));
    else setPreviewURL(null);
  };

<<<<<<< Updated upstream
  const handleSubmit = (event) => {
    event.preventDefault();
    alert('Feature coming soon!');
  };

  return (
    <div className="flex items-start justify-center min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 px-4 pt-[80px] pb-12">
      <div className="bg-white/20 backdrop-blur-md shadow-2xl rounded-2xl p-10 w-full max-w-lg border border-white/10">
        <h2 className="text-3xl font-extrabold mb-3 text-center text-white tracking-wide drop-shadow">
          Deepfake Image Detector
        </h2>
        <p className="mb-8 text-center text-indigo-200 font-medium">
          Upload an image to check if it’s AI-generated or not!
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-indigo-100 font-semibold mb-3 text-lg" htmlFor="imageUpload">
              Select Image File
            </label>
=======
  const processFile = (file) => {
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      setPreviewURL(URL.createObjectURL(file));
      setAiDetected(null);
      setError(null);
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile || loading) return;

    setLoading(true);
    setError(null);
    setAiDetected(null);

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await fetch('http://127.0.0.1:5000/api/predict', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const result = await response.json();
      
      // Map backend response to UI state
      // "Deepfake" = true (AI detected), "Real" = false (genuine)
      setAiDetected(result.prediction === "Deepfake");
      
    } catch (error) {
      console.error('Error:', error);
      setError(error.message || 'Failed to analyze image. Please try again.');
    } finally {
      setLoading(false);
    }
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
            Upload an image to check if it's AI-generated or not!
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
>>>>>>> Stashed changes
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
<<<<<<< Updated upstream
              className="block w-full text-sm text-indigo-900 font-medium bg-white/60 border border-indigo-300 rounded-lg cursor-pointer focus:outline-none shadow-inner py-2 px-3"
            />
=======
              className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
              aria-describedby="fileUploadDescription"
              disabled={loading}
            />
            <CloudArrowUpIcon className="mx-auto mb-4 h-12 w-12 text-indigo-400" aria-hidden="true" />
            <p className="text-indigo-200 font-semibold">
              {loading ? "Processing..." : "Drag and drop an image here, or"} 
              {!loading && <span className="text-blue-300 underline"> browse files</span>}
            </p>
            <p id="fileUploadDescription" className="mt-2 text-xs text-indigo-300">
              Supported file types: JPG, PNG, GIF, etc.
            </p>
>>>>>>> Stashed changes
          </div>
          {previewURL && (
            <div className="mb-6 flex flex-col items-center">
              <img
                src={previewURL}
                alt="Preview"
                className="max-h-56 mb-2 rounded-md border-2 border-blue-400 shadow-lg"
              />
<<<<<<< Updated upstream
              <span className="text-xs text-indigo-200">{selectedFile.name}</span>
=======
              <span className="text-indigo-200 text-sm font-medium">{selectedFile.name}</span>
              <button
                type="button"
                onClick={resetState}
                disabled={loading}
                className="mt-1 rounded-md border border-red-500 bg-red-600 px-3 py-1 text-sm font-semibold text-white hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Remove selected image"
              >
                Remove Image
              </button>
>>>>>>> Stashed changes
            </div>
          )}
          <button
            type="submit"
<<<<<<< Updated upstream
            disabled={!selectedFile}
            className={`w-full font-bold py-2 px-4 rounded-lg transition
              ${selectedFile 
                ? 'bg-gradient-to-r from-indigo-500 to-blue-500 text-white hover:from-indigo-700 hover:to-blue-700 shadow-lg'
                : 'bg-indigo-200 text-indigo-400 cursor-not-allowed'
              }`
            }
          >
            Check Image (Coming Soon)
          </button>
        </form>
=======
            disabled={!selectedFile || loading}
            className={`w-full rounded-lg px-6 py-3 font-bold transition 
              ${selectedFile && !loading
                ? "bg-gradient-to-r from-indigo-500 to-blue-500 text-white hover:from-indigo-700 hover:to-blue-700 shadow-lg"
                : "bg-indigo-200 text-indigo-400 cursor-not-allowed"
              }
            `}
            aria-disabled={!selectedFile || loading}
          >
            {loading ? "Analyzing Image..." : `Check Image ${selectedFile ? "" : "(Select an image first)"}`}
          </button>
        </form>

        {/* Error Message */}
        {error && (
          <div className="mt-6 rounded-lg border border-red-700 bg-red-600 px-6 py-5 text-center text-white font-semibold drop-shadow-md" role="alert">
            <InformationCircleIcon className="inline h-6 w-6 mr-2 align-middle" />
            Error: {error}
          </div>
        )}

        {/* AI Detection Result */}
        {aiDetected !== null && !error && (
          <div
            className={`mt-8 rounded-lg border px-6 py-5 text-center text-white font-semibold drop-shadow-md
              ${aiDetected ? "bg-red-600 border-red-700" : "bg-green-600 border-green-700"}
            `}
            role="alert"
            aria-live="polite"
          >
            <InformationCircleIcon className="inline h-6 w-6 mr-2 align-middle" />
            {aiDetected
              ? "⚠️ Warning: This image appears to be AI-generated (Deepfake detected)"
              : "✅ This image appears to be genuine (Real image)"}
          </div>
        )}

        {/* Instructions Section */}
        <section className="mt-12 rounded-lg bg-indigo-900/70 p-5 text-indigo-300 text-sm leading-relaxed">
          <h3 className="mb-2 font-semibold text-white tracking-wide text-lg">How to use this tool:</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Upload a clear image file (JPG, PNG, GIF, etc.)</li>
            <li>The AI will analyze the image and check for signs of deepfake manipulation.</li>
            <li>Results will display below once analysis is complete.</li>
            <li>Green indicates a genuine image, red indicates potential AI generation.</li>
          </ul>
        </section>
>>>>>>> Stashed changes
      </div>
    </div>
  );
};

export default Upload;
