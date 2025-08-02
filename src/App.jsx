import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Login from '../pages/login';
import Home from '../pages/Home';
import Register from '../pages/register';
import Upload from '../pages/Upload';
import Learn from '../pages/Learn';
import Demo from '../pages/Demo';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-darker-blue">
        <Navbar />
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/' element={<Hero/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/upload' element={<Upload/>}/>
          <Route path='/learn' element={<Learn/>}/>
          <Route path='/demo' element={<Demo/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;