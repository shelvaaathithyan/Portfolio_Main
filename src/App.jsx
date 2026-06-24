import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import MainScreen from './components/MainScreen';
import LoadingScreen from './components/LoadingScreen';
import NeuralNetwork from './components/NeuralNetwork';
import Spotlight from './components/Spotlight';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import CommandPalette from './components/CommandPalette';
import CollaborationSimulation from './components/CollaborationSimulation';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSimulationOpen, setIsSimulationOpen] = useState(false);

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <BrowserRouter>
      <NeuralNetwork />
      <Spotlight />
      <ScrollProgress />
      <Navbar />
      <CommandPalette />
      <CollaborationSimulation isOpen={isSimulationOpen} onClose={() => setIsSimulationOpen(false)} />
      <Routes>
        <Route path="/" element={<MainScreen onOpenSimulation={() => setIsSimulationOpen(true)} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
