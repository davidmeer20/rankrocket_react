import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage.jsx';
import StatsOverview from './StatsOverview.jsx';
import AnalyzeByPages from './AnalyzeByPages.jsx';
import { createPageUrl } from './components/utils.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path={createPageUrl('LandingPage')} element={<LandingPage />} />
        <Route path={createPageUrl('StatsOverview')} element={<StatsOverview />} />
        <Route path={createPageUrl('AnalyzeByPages')} element={<AnalyzeByPages />} />
        {/* Fallback route */}
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;