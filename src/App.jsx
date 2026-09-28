import { lazy, Suspense, useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import CommandPalette from './components/CommandPalette';
import Home from './pages/Home';

const Projects = lazy(() => import('./pages/Projects'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const Publications = lazy(() => import('./pages/Publications'));
const PublicationDetail = lazy(() => import('./pages/PublicationDetail'));
const CV = lazy(() => import('./pages/CV'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Re-mounts page content on navigation so each page fades in.
const PageTransition = ({ children }) => {
  const { pathname } = useLocation();
  return <div key={pathname} className="page-enter">{children}</div>;
};

function App() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const openPalette = useCallback(() => setPaletteOpen(true), []);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      } else if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) {
        e.preventDefault();
        setPaletteOpen(true);
      }
    };
    // Feeds the cursor position to .spotlight cards for their hover glow.
    const onPointer = (e) => {
      const el = e.target.closest?.('.spotlight');
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      el.style.setProperty('--my', `${e.clientY - r.top}px`);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('pointermove', onPointer, { passive: true });
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('pointermove', onPointer);
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <Router>
        <ScrollToTop />
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-3 focus:py-2 focus:rounded-lg focus:bg-white focus:text-zinc-900">
          Skip to content
        </a>
        <div className="relative isolate min-h-screen flex flex-col font-sans text-zinc-900 dark:text-zinc-100">
          <div className="aurora" aria-hidden="true" />
          <div className="grid-lines" aria-hidden="true" />

          <Navigation onSearch={openPalette} />
          <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />

          <main id="main" className="pt-20 flex-1">
            <Suspense fallback={<div className="min-h-[60vh]" />}>
              <PageTransition>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/projects/:slug" element={<ProjectDetail />} />
                  <Route path="/publications" element={<Publications />} />
                  <Route path="/publications/:slug" element={<PublicationDetail />} />
                  <Route path="/cv" element={<CV />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </PageTransition>
            </Suspense>
          </main>

          <Footer />
        </div>
      </Router>
    </MotionConfig>
  );
}

export default App;
