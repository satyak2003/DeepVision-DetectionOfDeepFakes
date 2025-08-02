// pages/Learn.jsx
import React, { useState } from 'react'
import '../style.css'

const Learn = () => {
  const [activeSection, setActiveSection] = useState(null)

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section)
  }

  return (
    <div className="flex items-start justify-center min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 px-4 pt-[80px] pb-12">
      <div className="bg-white/20 backdrop-blur-md shadow-2xl rounded-2xl p-10 w-full max-w-4xl border border-white/10">
        <h1 className="text-4xl font-extrabold mb-6 text-center text-white tracking-wide drop-shadow">
          Understanding Deepfake Detection with CNNs
        </h1>
        <p className="mb-10 text-center text-indigo-200 font-medium text-lg leading-relaxed">
          DeepVision leverages advanced Convolutional Neural Networks (CNNs) and state-of-the-art computer vision techniques to detect AI-generated images with up to 96.2% accuracy across multiple architectures.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-blue-500/20 p-6 rounded-xl border border-blue-400/30">
            <h3 className="text-xl font-bold text-white mb-3">🎯 Detection Accuracy</h3>
            <ul className="text-blue-100 space-y-2">
              <li>• <strong>EfficientNet-B4:</strong> 96.2% accuracy</li>
              <li>• <strong>ResNet-50:</strong> 92.4% accuracy</li>
              <li>• <strong>Custom CNN:</strong> 89.1% accuracy</li>
            </ul>
          </div>
          <div className="bg-purple-500/20 p-6 rounded-xl border border-purple-400/30">
            <h3 className="text-xl font-bold text-white mb-3">⚡ Performance Metrics</h3>
            <ul className="text-purple-100 space-y-2">
              <li>• <strong>Processing Time:</strong> 0.3-1.2 seconds</li>
              <li>• <strong>Supported Formats:</strong> JPEG, PNG, WebP</li>
              <li>• <strong>Max Image Size:</strong> 10MB per file</li>
            </ul>
          </div>
        </div>

        <div className="space-y-6 text-gray-300">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
              <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-bold">1</span>
              What Are Deepfakes?
            </h2>
            <div className="ml-11 space-y-3">
              <p className="leading-relaxed">
                Deepfakes are AI-generated synthetic media where a person appears to say or do things they never actually did. Created using <strong>Generative Adversarial Networks (GANs)</strong>, these fake images and videos have become increasingly sophisticated and harder to detect with the naked eye.
              </p>
              <p className="leading-relaxed">
                Common deepfake generation methods include <strong>FaceSwap</strong>, <strong>Face2Face</strong>, <strong>FaceShifter</strong>, and <strong>NeuralTextures</strong>, each leaving unique digital fingerprints that our CNN models are trained to identify.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
              <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-bold">2</span>
              CNN Architecture & Transfer Learning
            </h2>
            <div className="ml-11 space-y-3">
              <p className="leading-relaxed">
                Our system employs multiple CNN architectures optimized for different use cases:
              </p>
              <div className="bg-gray-800/50 p-4 rounded-lg mt-3">
                <h4 className="text-lg font-semibold text-blue-300 mb-2">EfficientNet-B4 (Recommended)</h4>
                <p className="text-sm text-gray-300 mb-2">
                  Uses compound scaling methodology for optimal balance between accuracy and efficiency. Pre-trained on ImageNet with 19M parameters.
                </p>
                <code className="text-green-300 text-xs block bg-gray-900 p-2 rounded mt-2">
                  Input → EfficientNet Backbone → GlobalAvgPool → Dense(512) → Dropout(0.5) → Output(1)
                </code>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <h4 className="text-lg font-semibold text-orange-300 mb-2">Custom Lightweight CNN</h4>
                <p className="text-sm text-gray-300 mb-2">
                  Designed for fast inference with only 2M parameters, perfect for web deployment and real-time applications.
                </p>
                <code className="text-green-300 text-xs block bg-gray-900 p-2 rounded mt-2">
                  Conv2D(32) → BatchNorm → MaxPool → Conv2D(64) → Conv2D(128) → GAP → Dense(512) → Output(1)
                </code>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
              <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-bold">3</span>
              Training Datasets & Data Augmentation
            </h2>
            <div className="ml-11 space-y-3">
              <p className="leading-relaxed">
                Our models are trained on comprehensive datasets totaling over 200,000 images:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="bg-red-500/20 p-3 rounded-lg border border-red-400/30">
                  <h4 className="font-semibold text-red-200">FaceForensics++</h4>
                  <p className="text-sm text-red-100">1,000 videos with 4 manipulation methods</p>
                </div>
                <div className="bg-green-500/20 p-3 rounded-lg border border-green-400/30">
                  <h4 className="font-semibold text-green-200">DFDC Dataset</h4>
                  <p className="text-sm text-green-100">124,000 videos from Facebook's challenge</p>
                </div>
                <div className="bg-yellow-500/20 p-3 rounded-lg border border-yellow-400/30">
                  <h4 className="font-semibold text-yellow-200">CelebDF</h4>
                  <p className="text-sm text-yellow-100">High-quality celebrity deepfakes</p>
                </div>
              </div>
              <p className="leading-relaxed mt-4">
                <strong>Data augmentation techniques</strong> include rotation (±20°), width/height shifts (±20%), brightness adjustment (0.8-1.2x), horizontal flipping, and Gaussian noise injection to improve model robustness.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
              <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-bold">4</span>
              Advanced Detection Techniques
            </h2>
            <div className="ml-11 space-y-3">
              <p className="leading-relaxed">
                Our CNNs detect deepfakes by identifying subtle artifacts invisible to human eyes:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <h4 className="font-semibold text-cyan-300 mb-2">Pixel-Level Artifacts</h4>
                  <ul className="text-sm space-y-1 text-gray-300">
                    <li>• Compression inconsistencies</li>
                    <li>• Unusual noise patterns</li>
                    <li>• Color space anomalies</li>
                    <li>• Edge blending irregularities</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-cyan-300 mb-2">Facial Feature Analysis</h4>
                  <ul className="text-sm space-y-1 text-gray-300">
                    <li>• Eye movement patterns</li>
                    <li>• Skin texture consistency</li>
                    <li>• Lighting direction mismatches</li>
                    <li>• Temporal inconsistencies</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
              <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-bold">5</span>
              Processing Pipeline
            </h2>
            <div className="ml-11 space-y-3">
              <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-4 rounded-lg">
                <div className="flex flex-wrap items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="bg-blue-500 text-white px-2 py-1 rounded">1</span>
                    <span>Image Upload</span>
                  </div>
                  <span>→</span>
                  <div className="flex items-center space-x-2">
                    <span className="bg-green-500 text-white px-2 py-1 rounded">2</span>
                    <span>Face Detection</span>
                  </div>
                  <span>→</span>
                  <div className="flex items-center space-x-2">
                    <span className="bg-orange-500 text-white px-2 py-1 rounded">3</span>
                    <span>Preprocessing</span>
                  </div>
                  <span>→</span>
                  <div className="flex items-center space-x-2">
                    <span className="bg-purple-500 text-white px-2 py-1 rounded">4</span>
                    <span>CNN Inference</span>
                  </div>
                  <span>→</span>
                  <div className="flex items-center space-x-2">
                    <span className="bg-red-500 text-white px-2 py-1 rounded">5</span>
                    <span>Results</span>
                  </div>
                </div>
              </div>
              <p className="leading-relaxed">
                Each uploaded image undergoes automated face detection using <strong>OpenCV Haar cascades</strong>, followed by preprocessing (resize to 224×224px, normalization), and finally CNN inference with confidence scoring.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
              <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-bold">6</span>
              Limitations & Challenges
            </h2>
            <div className="ml-11 space-y-3">
              <div className="bg-yellow-600/20 p-4 rounded-lg border border-yellow-400/30">
                <h4 className="font-semibold text-yellow-200 mb-2">⚠️ Current Limitations</h4>
                <ul className="text-sm space-y-1 text-yellow-100">
                  <li>• Performance may vary with extremely high-quality deepfakes</li>
                  <li>• Best results achieved with clear, frontal face images</li>
                  <li>• Model trained primarily on Western faces (working to expand diversity)</li>
                  <li>• Detection accuracy decreases with heavily compressed images</li>
                </ul>
              </div>
              <p className="leading-relaxed">
                As deepfake generation technology advances, detection methods must continuously evolve. Our models are regularly retrained on new datasets to maintain high accuracy against emerging techniques.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
              <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-bold">7</span>
              Real-World Applications
            </h2>
            <div className="ml-11 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-indigo-500/20 p-4 rounded-lg border border-indigo-400/30">
                  <h4 className="font-semibold text-indigo-200 mb-2">🛡️ Security & Verification</h4>
                  <p className="text-sm text-indigo-100">Identity verification, document authentication, forensic analysis</p>
                </div>
                <div className="bg-green-500/20 p-4 rounded-lg border border-green-400/30">
                  <h4 className="font-semibold text-green-200 mb-2">📰 Media & Journalism</h4>
                  <p className="text-sm text-green-100">News verification, fact-checking, content moderation</p>
                </div>
                <div className="bg-red-500/20 p-4 rounded-lg border border-red-400/30">
                  <h4 className="font-semibold text-red-200 mb-2">⚖️ Legal & Evidence</h4>
                  <p className="text-sm text-red-100">Court evidence validation, digital forensics, legal proceedings</p>
                </div>
                <div className="bg-purple-500/20 p-4 rounded-lg border border-purple-400/30">
                  <h4 className="font-semibold text-purple-200 mb-2">🎓 Education & Research</h4>
                  <p className="text-sm text-purple-100">Academic research, AI literacy, cybersecurity training</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <footer className="mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-600/30 to-purple-600/30 p-6 rounded-xl border border-blue-400/30">
            <h3 className="text-xl font-semibold text-white mb-3">Ready to Test DeepVision?</h3>
            <p className="text-indigo-200 mb-4">
              Experience our state-of-the-art deepfake detection technology with your own images
            </p>
            <div className="flex justify-center space-x-4">
              <a href="/upload" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors font-semibold">
                Upload Images
              </a>
              <a href="/demo" className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg transition-colors font-semibold">
                Try Demo
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Learn
