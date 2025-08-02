import React from 'react';
import { Link } from 'react-router-dom';
//import Register from '../../pages/register';

function Navbar() {
  return (
    <nav className="bg-deep-blue/95 fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-white hover:text-gray-300 transition-colors">
                DeepVision
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Login
            </Link>
            <Link to = "/register" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;