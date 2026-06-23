import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import ProjectsPage from './components/ProjectsPage';
import AboutPage from './components/AboutPage';
import LoadingScreen from './components/LoadingScreen';
import LightRays from './components/LightRays';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <>
      <LightRays />
      <BrowserRouter>
        <Routes>
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="about" element={<AboutPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
