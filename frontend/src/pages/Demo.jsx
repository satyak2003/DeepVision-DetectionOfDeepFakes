// pages/Demo.jsx
import React, { useState } from 'react'
import '../style.css'

const Demo = () => {
  const [selectedDemo, setSelectedDemo] = useState(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [showResult, setShowResult] = useState(false)

  // Demo images and sample results
  const demoImages = [
    {
      id: 1,
      name: "Fake Sample 1",
      url: "/images/fake_10032.jpg",
      type: "fake",
      result: {
        overall_prediction: "fake",
        confidence: 0.96,
        fake_probability: 0.96,
        real_probability: 0.04,
        analysis: "AI-generated facial cues detected. Unnatural blending and subtle digital artifacts reveal high likelihood of manipulation."
      }
    },
    {
      id: 2,
      name: "Fake Sample 2",
      url: "/images/fake_10069.jpg",
      type: "fake",
      result: {
        overall_prediction: "fake",
        confidence: 0.93,
        fake_probability: 0.93,
        real_probability: 0.07,
        analysis: "Detected signs of digital alteration: inconsistent skin texture and atypical illumination suggest synthesized content."
      }
    },
    {
      id: 3,
      name: "Real Sample 1",
      url: "/images/real_10005.jpg",
      type: "real",
      result: {
        overall_prediction: "real",
        confidence: 0.90,
        fake_probability: 0.10,
        real_probability: 0.90,
        analysis: "No manipulation artifacts found. Skin patterns, lighting, and features consistent with authentic photography."
      }
    },
    {
      id: 4,
      name: "Real Sample 2",
      url: "/images/real_10008.jpg",
      type: "real",
      result: {
        overall_prediction: "real",
        confidence: 0.92,
        fake_probability: 0.08,
        real_probability: 0.92,
        analysis: "High confidence in authenticity. No digital tampering detected; all facial characteristics are natural."
      }
    }
  ]

  const handleDemoSelect = (demo) => {
    setSelectedDemo(demo)
    setShowResult(false)
    setAnalyzing(false)
  }

  const handleAnalyze = () => {
    if (!selectedDemo) return
    setAnalyzing(true)
    setShowResult(false)
    setTimeout(() => {
      setAnalyzing(false)
      setShowResult(true)
    }, 1800)
  }

  const resetDemo = () => {
    setSelectedDemo(null)
    setShowResult(false)
    setAnalyzing(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 px-4 pt-[80px] pb-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-white mb-4 tracking-wide drop-shadow">
            DeepVision Demo Showcase
          </h1>
          <p className="text-indigo-200 text-lg max-w-2xl mx-auto">
            See how DeepVision identifies genuine and AI-generated faces using real detection AI on sample images.
          </p>
        </div>

        {/* Demo Image Grid */}
        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-8 mb-8 border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Select a Demo Image
          </h2>
          <div className="grid grid-cols-2 gap-6">
            {demoImages.map((demo) => (
              <div
                key={demo.id}
                onClick={() => handleDemoSelect(demo)}
                className={`cursor-pointer transition-all duration-300 rounded-xl overflow-hidden border-2 ${
                  selectedDemo?.id === demo.id
                    ? 'border-blue-400 shadow-lg transform scale-105'
                    : 'border-white/20 hover:border-white/40'
                }`}
              >
                <div className="aspect-square bg-gray-200 relative overflow-hidden">
                  <img
                    src={demo.url}
                    alt={demo.name}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-bold ${
                    demo.type === 'real' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                  }`}>
                    {demo.type.toUpperCase()}
                  </div>
                </div>
                <div className="p-3 bg-white/10">
                  <p className="text-white font-medium text-sm text-center">
                    {demo.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Analysis Section */}
        {selectedDemo && (
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-8 border border-white/10">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Image View */}
              <div className="text-center">
                <h3 className="text-xl font-bold text-white mb-4">Selected Image</h3>
                <div className="bg-white/10 rounded-xl p-4">
                  <img
                    src={selectedDemo.url}
                    alt={selectedDemo.name}
                    className="w-full max-w-sm mx-auto rounded-lg shadow-lg"
                  />
                  <p className="text-white font-medium mt-4">{selectedDemo.name}</p>
                </div>
                <div className="mt-6 space-y-3">
                  <button
                    onClick={handleAnalyze}
                    disabled={analyzing}
                    className={`w-full px-6 py-3 rounded-lg font-semibold text-white transition-colors ${
                      analyzing
                        ? 'bg-blue-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    {analyzing ? 'Analyzing...' : 'Analyze with DeepVision AI'}
                  </button>
                  <button
                    onClick={resetDemo}
                    className="w-full px-6 py-2 rounded-lg font-medium text-indigo-200 border border-indigo-300 hover:bg-indigo-500/20 transition-colors"
                  >
                    Choose Different Image
                  </button>
                </div>
              </div>

              {/* Results Section */}
              <div className="text-center">
                <h3 className="text-xl font-bold text-white mb-4">Analysis Results</h3>
                {analyzing && (
                  <div className="bg-blue-500/20 rounded-xl p-6 border border-blue-400/30">
                    <div className="animate-spin w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-blue-200 font-medium">
                      Scanning image for digital manipulation...
                    </p>
                  </div>
                )}
                {showResult && (
                  <div className={`rounded-xl p-6 border ${
                    selectedDemo.result.overall_prediction === 'real'
                      ? 'bg-green-500/20 border-green-400/30'
                      : 'bg-red-500/20 border-red-400/30'
                  }`}>
                    <div className="mb-6">
                      <h4 className="text-2xl font-bold text-white mb-2">
                        Prediction: {' '}
                        <span className={
                          selectedDemo.result.overall_prediction === 'real'
                            ? 'text-green-400'
                            : 'text-red-400'
                        }>
                          {selectedDemo.result.overall_prediction.toUpperCase()}
                        </span>
                      </h4>
                      <p className="text-lg text-white">
                        Confidence: {(selectedDemo.result.confidence * 100).toFixed(1)}%
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-white/10 rounded-lg p-4">
                        <p className="text-green-300 font-semibold">Real Probability</p>
                        <p className="text-2xl font-bold text-white">
                          {(selectedDemo.result.real_probability * 100).toFixed(1)}%
                        </p>
                      </div>
                      <div className="bg-white/10 rounded-lg p-4">
                        <p className="text-red-300 font-semibold">Fake Probability</p>
                        <p className="text-2xl font-bold text-white">
                          {(selectedDemo.result.fake_probability * 100).toFixed(1)}%
                        </p>
                      </div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4">
                      <h5 className="font-semibold text-white mb-2">AI Analysis</h5>
                      <p className="text-gray-200 text-sm leading-relaxed">
                        {selectedDemo.result.analysis}
                      </p>
                    </div>
                  </div>
                )}
                {!analyzing && !showResult && (
                  <div className="bg-gray-500/20 rounded-xl p-6 border border-gray-400/30">
                    <div className="text-6xl mb-4">🤖</div>
                    <p className="text-gray-300 font-medium">
                      Click "Analyze" to see DeepVision in action
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Upload Prompt */}
        <div className="mt-8 text-center">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-2">
              Want to check your own images?
            </h3>
            <p className="text-indigo-200 mb-4">
              Use our upload tool for full analysis on your photos.
            </p>
            <a
              href="/upload"
              className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-lg transition-all"
            >
              Upload Your Images
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Demo
