import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { HomePage } from './pages/HomePage';
import { MomentPage } from './pages/MomentPage';

const ScrollToTop: React.FC = () => {
  const { pathname, state } = useLocation();

  useEffect(() => {
    // If state specifically requested a scroll target (like returning to #moments), don't force top (0,0)
    const hasScrollTarget = Boolean((state as { scrollTo?: string } | null)?.scrollTo);
    if (!hasScrollTarget) {
      window.scrollTo(0, 0);
    }
  }, [pathname, state]);

  return null;
};

export const App: React.FC = () => {
  return (
    <>
      <ScrollToTop />
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/moments/:id" element={<MomentPage />} />
        {/* Fallback: redirect unknown routes to home */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </>
  );
};

export default App;
