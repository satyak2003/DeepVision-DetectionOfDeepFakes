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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-blue-600 dark:text-blue-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 12v8m0-8l-3-3m3 3l3-3m5-4h-6a4 4 0 00-8 0H5"
            />
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-purple-600 dark:text-purple-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.866v4.268a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-green-600 dark:text-green-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 14l9-5-9-5-9 5 9 5zM12 14l6.16-3.422a12.083 12.083 0 01.339 6.323l-6.499-3.423zm-6.16-3.422L6 17.5a12.083 12.083 0 01-.34-6.323L12 14z"
            />
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
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-12 w-12 text-yellow-600 dark:text-yellow-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 16h-1v-4h-1m1-4h.01M12 18a6 6 0 100-12 6 6 0 000 12z"
    />
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