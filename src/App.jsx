import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
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
      <div className="min-h-screen bg-paper text-slate-800 font-sans selection:bg-uga-red/20 selection:text-uga-red">
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
      </div>
    </Router>
  );
}

export default App;