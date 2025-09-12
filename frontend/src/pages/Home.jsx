import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8 flex flex-col items-center pt-24">
      <header className="mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
          Welcome to Deepfake Detector
        </h1>
        <p className="mt-4 text-gray-700 dark:text-gray-300 max-w-xl text-center">
          Use the options below to upload images, try a demo, or learn more about AI-generated deepfakes.
        </p>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl w-full">
        <Link
          to="/upload"
          className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center space-y-4"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-cloud-arrow-up-fill" viewBox="0 0 16 16">
  <path d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2m2.354 5.146a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0z"/>
</svg>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Upload</h2>
          <p className="text-gray-600 dark:text-gray-400 text-center">
            Upload your images to detect deepfakes.
          </p>
        </Link>

        <Link
          to="/demo"
          className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center space-y-4"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-collection-play" viewBox="0 0 16 16">
  <path d="M2 3a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 0-1h-11A.5.5 0 0 0 2 3m2-2a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7A.5.5 0 0 0 4 1m2.765 5.576A.5.5 0 0 0 6 7v5a.5.5 0 0 0 .765.424l4-2.5a.5.5 0 0 0 0-.848z"/>
  <path d="M1.5 14.5A1.5 1.5 0 0 1 0 13V6a1.5 1.5 0 0 1 1.5-1.5h13A1.5 1.5 0 0 1 16 6v7a1.5 1.5 0 0 1-1.5 1.5zm13-1a.5.5 0 0 0 .5-.5V6a.5.5 0 0 0-.5-.5h-13A.5.5 0 0 0 1 6v7a.5.5 0 0 0 .5.5z"/>
</svg>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Demo</h2>
          <p className="text-gray-600 dark:text-gray-400 text-center">
            Try a preloaded demo to see how detection works.
          </p>
        </Link>

        <Link
          to="/learn"
          className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center space-y-4"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-mortarboard-fill" viewBox="0 0 16 16">
  <path d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917z"/>
  <path d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466z"/>
</svg>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Learn</h2>
          <p className="text-gray-600 dark:text-gray-400 text-center">
            Explore educational content on deepfakes and detection.
          </p>
        </Link>

       <Link
  to="/about"
  className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center space-y-4"
>
  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
</svg>
  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">About</h2>
  <p className="text-gray-600 dark:text-gray-400 text-center">
    Learn more about Deepfake Detector and the team.
  </p>
</Link>

      </main>
    </div>
  );
};

export default Home;