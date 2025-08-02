import React, { useState } from 'react';

// Use icons if you want: import { CloudArrowUpIcon } from '@heroicons/react/outline';

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (file) setPreviewURL(URL.createObjectURL(file));
    else setPreviewURL(null);
  };

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
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-indigo-900 font-medium bg-white/60 border border-indigo-300 rounded-lg cursor-pointer focus:outline-none shadow-inner py-2 px-3"
            />
          </div>
          {previewURL && (
            <div className="mb-6 flex flex-col items-center">
              <img
                src={previewURL}
                alt="Preview"
                className="max-h-56 mb-2 rounded-md border-2 border-blue-400 shadow-lg"
              />
              <span className="text-xs text-indigo-200">{selectedFile.name}</span>
            </div>
          )}
          <button
            type="submit"
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
      </div>
    </div>
  );
};

export default Upload;
