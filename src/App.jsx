import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import MainScreen from './components/MainScreen';
import LoadingScreen from './components/LoadingScreen';
import LightRays from './components/LightRays';
import Navbar from './components/Navbar';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <BrowserRouter>
      <LightRays />
      <Navbar />
      <Routes>
        <Route path="/" element={<MainScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
