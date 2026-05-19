import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
// Import placeholder pages (we will implement these next)
import Publications from './pages/Publications';
import PublicationDetail from './pages/PublicationDetail';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import CV from './pages/CV';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen font-sans bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 selection:bg-ag-green/20 selection:text-ag-deep">
        <Navigation />
        
        <main className="pt-20"> {/* Add padding top to account for fixed navbar */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/publications" element={<Publications />} />
            <Route path="/publications/:slug" element={<PublicationDetail />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/cv" element={<CV />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;