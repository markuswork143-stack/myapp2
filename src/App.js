
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import TabMenu from './TabMenu';

import Home from './components/Home/Home';

import About from './components/About/About';

function App() {
  return (
    <div className="container mt-4">
      <TabMenu />
      <div className="mt-3">
        <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
