import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import MainScreen from './components/MainScreen';
import LoadingScreen from './components/LoadingScreen';
import NeuralNetwork from './components/NeuralNetwork';
import Spotlight from './components/Spotlight';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <BrowserRouter>
      <NeuralNetwork />
      <Spotlight />
      <ScrollProgress />
      <Navbar />
      <Routes>
        <Route path="/" element={<MainScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
