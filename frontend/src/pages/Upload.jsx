import React, { useState, useCallback, useRef } from "react";
import { 
  CloudArrowUpIcon, 
  CheckCircleIcon, 
  ExclamationTriangleIcon,
  CpuChipIcon,
  FaceSmileIcon
} from "@heroicons/react/24/outline";

const API_ENDPOINT = "http://127.0.0.1:5000/api/predict";

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [aiDetected, setAiDetected] = useState(null);
  const [confidence, setConfidence] = useState(null);
  const [modelType, setModelType] = useState("deepfake"); // Default selection
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const inputRef = useRef(null);

  const resetState = () => {
    setSelectedFile(null);
    setPreviewURL(null);
    setAiDetected(null);
    setConfidence(null);
    setErrorMessage('');
  };

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      processFile(event.target.files[0]);
    }
  };

  const processFile = (file) => {
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      setPreviewURL(URL.createObjectURL(file));
      setAiDetected(null); // Reset results when new image is picked
    } else {
      alert("Please select a valid image file.");
    }
  };

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
    if (!selectedFile) return;

    setIsLoading(true);
    setErrorMessage('');

    const formData = new FormData();
    formData.append('image', selectedFile);
    // Send the selected model type to backend
    formData.append('model_type', modelType);

    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) throw new Error(`Server Error: ${response.statusText}`);

      const data = await response.json();
      
      const isFake = data.label === 'Deepfake';
      setAiDetected(isFake);
      setConfidence(data.confidence ? Math.round(data.confidence * 100) : null);

    } catch (error) {
      console.error('Error:', error);
      setErrorMessage("Failed to connect to the server.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen justify-center px-4 pt-[80px] pb-12 bg-gradient-to-br from-slate-900 to-slate-800 items-start font-sans">
      <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
        
        <header className="mb-8 text-center">
          <h2 className="flex items-center justify-center text-3xl font-bold tracking-tight text-white">
            <CloudArrowUpIcon className="h-8 w-8 mr-3 text-blue-400" />
            DeepVision
          </h2>
          <p className="mt-3 text-slate-400 text-sm">
            Advanced AI Detection System
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* --- MODEL SELECTION DROPDOWN --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div 
              onClick={() => setModelType("deepfake")}
              className={`cursor-pointer rounded-xl border p-4 transition-all duration-200 flex items-center
                ${modelType === "deepfake" 
                  ? "bg-blue-600/20 border-blue-500" 
                  : "bg-white/5 border-white/10 hover:bg-white/10"}
              `}
            >
              <FaceSmileIcon className={`h-8 w-8 mr-3 ${modelType === "deepfake" ? "text-blue-400" : "text-slate-500"}`}/>
              <div>
                <h3 className="text-white font-semibold text-sm">Face Manipulation</h3>
                <p className="text-xs text-slate-400">Best for Deepfakes & Swaps</p>
              </div>
            </div>

            <div 
              onClick={() => setModelType("genai")}
              className={`cursor-pointer rounded-xl border p-4 transition-all duration-200 flex items-center
                ${modelType === "genai" 
                  ? "bg-purple-600/20 border-purple-500" 
                  : "bg-white/5 border-white/10 hover:bg-white/10"}
              `}
            >
              <CpuChipIcon className={`h-8 w-8 mr-3 ${modelType === "genai" ? "text-purple-400" : "text-slate-500"}`}/>
              <div>
                <h3 className="text-white font-semibold text-sm">Generative AI</h3>
                <p className="text-xs text-slate-400">Best for Midjourney/DALL-E</p>
              </div>
            </div>
          </div>
          
          {/* Upload Area */}
          <div
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            className={`relative cursor-pointer rounded-xl border-2 border-dashed px-6 py-12 text-center transition-all duration-200 ease-in-out
              ${dragActive 
                ? "border-blue-500 bg-blue-500/10" 
                : "border-slate-600 hover:border-slate-500 hover:bg-white/5"
              }
            `}
          >
            <input ref={inputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden"/>
            
            {!previewURL ? (
              <>
                <CloudArrowUpIcon className="mx-auto h-12 w-12 text-slate-500" />
                <p className="mt-4 text-sm text-slate-300 font-medium">
                  <span className="text-blue-400">Click to upload</span> or drag and drop
                </p>
              </>
            ) : (
              <div className="relative">
                <img src={previewURL} alt="Preview" className="mx-auto max-h-64 rounded-lg shadow-lg" />
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); resetState(); }}
                  className="absolute -top-3 -right-3 rounded-full bg-red-500 p-1.5 text-white shadow-md hover:bg-red-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* Detect Button */}
          <button
            type="submit"
            disabled={!selectedFile || isLoading}
            className={`w-full rounded-xl py-3.5 font-semibold text-white shadow-lg transition-all duration-200
              ${!selectedFile || isLoading
                ? "bg-slate-700 text-slate-400 cursor-not-allowed"
                : modelType === 'deepfake' 
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500"
                  : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500"
              }
            `}
          >
            {isLoading ? "Running Analysis..." : `Detect with ${modelType === 'deepfake' ? 'Deepfake' : 'GenAI'} Model`}
          </button>
        </form>

        {/* Results */}
        {aiDetected !== null && (
          <div className={`mt-8 overflow-hidden rounded-2xl border backdrop-blur-md transition-all duration-500
            ${aiDetected ? "bg-red-500/10 border-red-500/30" : "bg-green-500/10 border-green-500/30"}`}
          >
            <div className="p-6 text-center">
              {aiDetected ? (
                <ExclamationTriangleIcon className="mx-auto h-12 w-12 text-red-500 mb-3" />
              ) : (
                <CheckCircleIcon className="mx-auto h-12 w-12 text-green-500 mb-3" />
              )}
              
              <h3 className={`text-2xl font-bold ${aiDetected ? "text-red-400" : "text-green-400"}`}>
                {aiDetected ? "FAKE DETECTED" : "REAL IMAGE"}
              </h3>
              
              {confidence && (
                <div className="mt-4 inline-flex items-center rounded-full bg-white/5 px-4 py-1 border border-white/10">
                  <span className="text-sm text-slate-300 mr-2">Confidence:</span>
                  <span className={`font-bold ${aiDetected ? "text-red-400" : "text-green-400"}`}>{confidence}%</span>
                </div>
              )}
            </div>
          </div>
        )}

        {errorMessage && <p className="mt-4 text-center text-red-400 text-sm">{errorMessage}</p>}

      </div>
    </div>
  );
};

export default Upload;