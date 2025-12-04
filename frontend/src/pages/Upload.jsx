import React, { useState, useCallback, useRef } from "react";
import { 
  CloudArrowUpIcon, 
  CheckCircleIcon, 
  ExclamationTriangleIcon,
  CpuChipIcon,
  FaceSmileIcon,
  EyeIcon
} from "@heroicons/react/24/outline";

const API_ENDPOINT = "https://carloss203-deepvision-backend.hf.space/api/predict";

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  const resetState = () => {
    setSelectedFile(null);
    setPreviewURL(null);
    setResults(null);
  };

  const processFile = (file) => {
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      setPreviewURL(URL.createObjectURL(file));
      setResults(null);
    } else {
      alert("Please select a valid image file.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await fetch(API_ENDPOINT, { method: 'POST', body: formData });
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error:', error);
      alert("Failed to connect to backend");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrag = useCallback((e) => { e.preventDefault(); e.stopPropagation(); setDragActive(e.type === "dragenter" || e.type === "dragover"); }, []);
  const handleDrop = useCallback((e) => { e.preventDefault(); e.stopPropagation(); setDragActive(false); if (e.dataTransfer.files[0]) processFile(e.dataTransfer.files[0]); }, []);

  return (
    <div className="flex min-h-screen justify-center px-4 pt-[80px] pb-12 bg-gradient-to-br from-slate-900 to-slate-800 items-start font-sans">
      <div className="w-full max-w-4xl rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
        
        <header className="mb-8 text-center">
          <h2 className="flex items-center justify-center text-3xl font-bold tracking-tight text-white">
            <CloudArrowUpIcon className="h-8 w-8 mr-3 text-blue-400" />
            DeepVision Dual-Scan
          </h2>
          <p className="mt-2 text-slate-400 text-sm">Visualizing AI Perception & Detection</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* LEFT COLUMN: UPLOAD */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div
              onDragEnter={handleDrag} onDragOver={handleDrag} onDragLeave={handleDrag} onDrop={handleDrop}
              onClick={() => inputRef.current?.click()}
              className={`cursor-pointer rounded-xl border-2 border-dashed px-6 py-10 text-center transition-all ${dragActive ? "border-blue-500 bg-blue-500/10" : "border-slate-600 hover:border-slate-500 hover:bg-white/5"}`}
            >
              <input ref={inputRef} type="file" accept="image/*" onChange={(e) => processFile(e.target.files[0])} className="hidden"/>
              {!previewURL ? (
                <div className="text-slate-400">Click or Drag Image Here</div>
              ) : (
                <img src={previewURL} alt="Original" className="mx-auto max-h-64 rounded-lg shadow-lg object-contain" />
              )}
            </div>

            <button type="submit" disabled={!selectedFile || isLoading} className="w-full rounded-xl py-3.5 font-semibold text-white bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 transition">
              {isLoading ? "Analyzing..." : "Scan Image"}
            </button>
          </form>

          {/* RIGHT COLUMN: RESULTS */}
          <div className="space-y-4">
            {!results && !isLoading && (
              <div className="h-full flex items-center justify-center text-slate-500 border border-white/5 rounded-xl bg-white/5">
                <p>Results will appear here</p>
              </div>
            )}

            {isLoading && (
              <div className="h-full flex flex-col items-center justify-center text-blue-400 space-y-4">
                <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
                <p>Extracting Faces & Analyzing Artifacts...</p>
              </div>
            )}

            {results && !results.error && (
              <>
                {/* FINAL VERDICT */}
                <div className={`p-4 rounded-xl text-center border ${results.final_verdict.includes("Real") ? "bg-green-500/20 border-green-500" : "bg-red-500/20 border-red-500"}`}>
                  <h2 className="text-2xl font-extrabold text-white">{results.final_verdict}</h2>
                </div>

                {/* DEBUG VIEW: WHAT AI SAW */}
                {results.debug_image && (
                  <div className="bg-black/40 p-4 rounded-xl border border-white/10 flex items-center space-x-4">
                    <div className="relative group">
                        <img 
                          src={`data:image/jpeg;base64,${results.debug_image}`} 
                          alt="AI Input" 
                          className="h-24 w-24 rounded-lg border border-slate-500 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                            <span className="text-xs text-white">224x224 Input</span>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-white font-bold flex items-center text-sm">
                            <EyeIcon className="h-4 w-4 mr-2 text-blue-400"/>
                            AI Vision Input
                        </h4>
                        <p className="text-xs text-slate-400 mt-1">
                            This is the exact cropped region the Deepfake Model analyzed.
                        </p>
                    </div>
                  </div>
                )}

                {/* METRICS GRID */}
                <div className="grid grid-cols-2 gap-3">
                    <div className={`p-3 rounded-lg border ${results.genai_analysis.is_detected ? "bg-purple-500/10 border-purple-500/50" : "bg-slate-700/30 border-slate-600"}`}>
                        <div className="flex items-center mb-1">
                            <CpuChipIcon className="h-4 w-4 mr-2 text-slate-300"/>
                            <span className="text-xs font-bold text-slate-200">GenAI Score</span>
                        </div>
                        <span className="text-lg font-mono text-white">{Math.round(results.genai_analysis.confidence * 100)}%</span>
                    </div>

                    <div className={`p-3 rounded-lg border ${results.deepfake_analysis.is_detected ? "bg-red-500/10 border-red-500/50" : "bg-slate-700/30 border-slate-600"}`}>
                        <div className="flex items-center mb-1">
                            <FaceSmileIcon className="h-4 w-4 mr-2 text-slate-300"/>
                            <span className="text-xs font-bold text-slate-200">Deepfake Score</span>
                        </div>
                        <span className="text-lg font-mono text-white">{Math.round(results.deepfake_analysis.confidence * 100)}%</span>
                    </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;