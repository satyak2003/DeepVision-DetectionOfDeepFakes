import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-darker-blue">
        <Navbar />
        <Hero />
      </div>
    </Router>
  );
}

export default App;