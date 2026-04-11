import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Camera, Globe, FlaskConical, Bot, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';

const getTagColor = (tag) => {
  const t = tag.toLowerCase();
  if (["yolov9", "yolov8", "loftr", "botsort", "mask rcnn", "faster rcnn", "fpn", "rpn", "cnn", "object detection", "instance segmentation", "segmentation", "counting", "trajectory tracking", "activity recognition", "image classification", "aerial imagery", "uav", "real-time tracking"].includes(t)) {
    return "bg-blue-50 text-blue-600 border-blue-200"; // CV/Vision: blue
  }
  if (["era5", "pcmci+", "tigramite", "event synchronization", "walktrap", "netcdf", "geospatial analysis", "flood analysis", "homography"].includes(t)) {
    return "bg-teal-50 text-teal-600 border-teal-200"; // Climate/Geo: teal
  }
  if (["scikit-learn", "mlflow", "feature engineering", "machine learning", "ml", "optimization", "pytorch"].includes(t)) {
    return "bg-purple-50 text-purple-600 border-purple-200"; // ML/Stats: purple
  }
  if (["food science", "sensory science", "tea", "rdkit", "chembl", "smiles", "cheminformatics", "lwt 2025", "applied food research 2026", "iptcb 2025"].includes(t)) {
    return "bg-amber-50 text-amber-700 border-amber-200"; // Food Science: amber
  }
  return "bg-slate-100 text-slate-600 border-slate-200"; // General Python/OpenCV: gray
};

const getCategoryIcon = (category) => {
  switch (category) {
    case "Computer Vision & Robotics": return <Bot size={48} className="text-blue-200 opacity-50" />;
    case "Climate & Geospatial": return <Globe size={48} className="text-teal-200 opacity-50" />;
    case "Food Science & Biotech": return <FlaskConical size={48} className="text-amber-200 opacity-50" />;
    default: return <Camera size={48} className="text-slate-200 opacity-50" />;
  }
};

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={`group bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col hover:shadow-xl hover:-translate-y-1 hover:border-uga-red/50 transition-all duration-300 relative ${
        project.featured ? 'md:col-span-2 md:flex-row' : ''
      }`}
    >
      {/* Featured Accent Line */}
      {project.featured && (
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-uga-red z-10"></div>
      )}

      {/* Image Area */}
      <Link to={`/projects/${project.slug}`} className={`relative bg-slate-50 flex items-center justify-center overflow-hidden shrink-0 cursor-pointer ${
        project.featured ? 'w-full md:w-2/5 aspect-video md:aspect-auto border-b md:border-b-0 md:border-r border-slate-200' : 'w-full aspect-video border-b border-slate-200'
      }`}>
        <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
        {project.thumbnail ? (
          <img src={project.thumbnail} alt={project.title} className="relative z-10 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
        ) : (
          <div className="relative z-10 flex flex-col items-center justify-center p-6 text-center">
            {getCategoryIcon(project.category)}
            <p className="mt-3 text-xs font-mono text-slate-400 group-hover:text-uga-red/70 transition-colors">
              {project.imageLabel}
            </p>
          </div>
        )}
      </Link>

      {/* Content Area */}
      <div className="p-6 md:p-8 flex flex-col flex-1">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <span className="text-xs font-bold tracking-wider text-slate-500 uppercase">
            {project.category}
          </span>
        </div>
        
        <Link to={`/projects/${project.slug}`} className={`font-serif font-bold text-slate-900 mb-3 block hover:text-uga-red transition-colors ${
          project.featured ? 'text-2xl md:text-3xl' : 'text-xl'
        }`}>
          {project.title}
        </Link>
        
        <p className="text-sm text-slate-600 leading-relaxed mb-6 flex-1">
          {project.story}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map(tag => (
            <span key={tag} className={`text-[10px] font-medium px-2 py-1 rounded-md border ${getTagColor(tag)}`}>
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100 mt-auto">
          <div>
            {project.github && (
              <a href="https://github.com/saqlineniam" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded text-xs font-medium hover:bg-slate-800 transition-colors">
                <Code size={14} /> View Code
              </a>
            )}
          </div>
          
          <Link to={`/projects/${project.slug}`} className="inline-flex items-center gap-1 text-sm font-medium text-uga-red opacity-0 group-hover:opacity-100 transition-opacity">
            View Details <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [activeTab, setActiveTab] = useState("All");
  
  const categories = ["All", "Computer Vision & Robotics", "Climate & Geospatial", "Food Science & Biotech"];

  const filteredProjects = projects.filter(p => 
    activeTab === "All" ? true : p.category === activeTab
  );

  return (
    <div className="relative min-h-screen">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-50 pointer-events-none -z-10 h-[50vh]"></div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 pt-16 pb-24">
        
        {/* Hero Section */}
        <header className="mb-16 md:mb-20 max-w-3xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight"
          >
            Technical Projects
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-slate-600 font-light leading-relaxed border-l-4 border-uga-red pl-6"
          >
            I build systems that make sense of fields, plants, and climate — using cameras, drones, and causal models.
          </motion.p>
        </header>

        {/* Filter Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap items-center gap-2 md:gap-3 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === cat 
                  ? 'bg-slate-900 text-white shadow-md' 
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode='popLayout'>
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </div>
  );
};

export default Projects;