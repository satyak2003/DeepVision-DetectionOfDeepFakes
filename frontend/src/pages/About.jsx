// pages/About.jsx
import React from 'react'

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 px-6 pt-[80px] pb-12 flex flex-col items-center text-white">
      {/* Logo */}
      <div className="mb-10">
        <img
          src="/DV_logo.png"
          alt="DeepVision Logo"
          className="w-48 h-auto mx-auto"
          loading="lazy"
        />
      </div>

      {/* About Section */}
      <section className="max-w-3xl text-center mb-12 px-4">
        <h1 className="text-4xl font-extrabold mb-6 tracking-wide drop-shadow">
          About DeepVision
        </h1>
        <p className="text-lg leading-relaxed text-indigo-200">
          DeepVision is a cutting-edge AI-powered deepfake detection system,
          leveraging advanced convolutional neural networks to identify AI-generated
          or digitally tampered images with high accuracy. Our models analyze subtle
          artifacts and inconsistencies invisible to the human eye, helping you ensure
          image authenticity and trustworthiness in today’s digital media landscape.
        </p>
      </section>

      {/* Developed By */}
      <section className="max-w-2xl text-center mb-10 px-4">
        <h2 className="text-3xl font-semibold mb-6 underline decoration-blue-400">
          Developed By
        </h2>

        <ul className="space-y-5 text-indigo-300">
          <li>
            <a
              href="https://github.com/satyak2003"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors font-medium"
            >
              Satya Karthik R
            </a>
          </li>
          <li>
            <a
              href="https://github.com/SandeepJena2004"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors font-medium"
            >
              Sandeep Kumar Jena
            </a>
          </li>
          <li>
            <a
              href="https://github.com/ShamanthJoshi123"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors font-medium"
            >
              Shamanth S Joshi
            </a>
          </li>
          <li>
            <a
              href="https://github.com/Sudhanva03"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors font-medium"
            >
              Sudhanva H Rao
            </a>
          </li>
        </ul>
      </section>

      {/* Footer */}
      <footer className="mt-auto pt-10 pb-6 text-center text-indigo-400 text-sm select-none">
        <img
          src="/DV_logo.png"
          alt="DeepVision Logo Small"
          className="mx-auto w-20 mb-3 opacity-40"
          loading="lazy"
        />
        <p>© 2025 Deepfake Face Detection</p>
        <p>Current date: Saturday, August 02, 2025, 6 PM IST</p>
      </footer>
    </div>
  )
}

export default About
