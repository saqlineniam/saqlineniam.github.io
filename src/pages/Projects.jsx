import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Camera, Globe, FlaskConical, Bot, ArrowRight, Cpu, Drone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';

const getTagColor = (tag) => {
  const t = tag.toLowerCase();
  if (["yolov9", "yolov8", "loftr", "botsort", "mask rcnn", "faster rcnn", "fpn", "rpn", "cnn", "object detection", "instance segmentation", "segmentation", "counting", "trajectory tracking", "activity recognition", "image classification", "aerial imagery", "uav", "real-time tracking"].includes(t)) {
    return "bg-tech-blue/10 text-tech-blue border-tech-blue/20 dark:bg-tech-blue/20 dark:text-tech-blue dark:border-tech-blue/30"; // CV/Vision: blue
  }
  if (["era5", "pcmci+", "tigramite", "event synchronization", "walktrap", "netcdf", "geospatial analysis", "flood analysis", "homography"].includes(t)) {
    return "bg-ag-green/10 text-ag-green border-ag-green/20 dark:bg-ag-green/20 dark:text-ag-green dark:border-ag-green/30"; // Climate/Geo: green
  }
  if (["scikit-learn", "mlflow", "feature engineering", "machine learning", "ml", "optimization", "pytorch"].includes(t)) {
    return "bg-slate-900 text-white border-slate-900 dark:bg-ag-green dark:text-slate-900 dark:border-ag-green"; // ML/Stats: dark/green
  }
  if (["food science", "sensory science", "tea", "rdkit", "chembl", "smiles", "cheminformatics", "lwt 2025", "applied food research 2026", "iptcb 2025"].includes(t)) {
    return "bg-ag-deep/10 text-ag-deep border-ag-deep/20 dark:bg-ag-deep/20 dark:text-ag-deep dark:border-ag-deep/30"; // Food Science: deep green
  }
  return "bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700"; // General gray
};

const getCategoryIcon = (category) => {
  switch (category) {
    case "Computer Vision & Robotics": return <Drone size={48} className="text-tech-blue/20 dark:text-tech-blue/40" />;
    case "Climate & Geospatial": return <Globe size={48} className="text-ag-green/20 dark:text-ag-green/40" />;
    case "Food Science & Biotech": return <FlaskConical size={48} className="text-ag-deep/20 dark:text-ag-deep/40" />;
    default: return <Camera size={48} className="text-slate-200 dark:text-slate-700" />;
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
      className={`group cyber-card rounded-2xl overflow-hidden flex flex-col relative ${
        project.featured ? 'md:col-span-2 md:flex-row' : ''
      }`}
    >
      {/* Featured Accent Line */}
      {project.featured && (
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-ag-green z-10"></div>
      )}

      {/* Image Area */}
      <Link to={`/projects/${project.slug}`} className={`relative bg-slate-50 dark:bg-slate-800 flex items-center justify-center overflow-hidden shrink-0 cursor-pointer ${
        project.featured ? 'w-full md:w-2/5 aspect-video md:aspect-auto border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-700' : 'w-full aspect-video border-b border-slate-200 dark:border-slate-700'
      }`}>
        <div className="absolute inset-0 bg-grid-pattern opacity-30 dark:opacity-20"></div>
        {project.thumbnail ? (
          <img src={project.thumbnail} alt={project.title} className="relative z-10 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        ) : (
          <div className="relative z-10 flex flex-col items-center justify-center p-6 text-center">
            {getCategoryIcon(project.category)}
            <p className="mt-3 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 group-hover:text-ag-green transition-colors">
              {project.imageLabel || "Research Data"}
            </p>
          </div>
        )}
      </Link>

      {/* Content Area */}
      <div className="p-8 flex flex-col flex-1">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <span className="text-[10px] font-black tracking-widest text-slate-400 dark:text-slate-500 uppercase">
            {project.category}
          </span>
        </div>
        
        <Link to={`/projects/${project.slug}`} className={`font-bold text-slate-900 dark:text-white mb-4 block hover:text-ag-green transition-colors ${
          project.featured ? 'text-3xl' : 'text-xl'
        }`}>
          {project.title}
        </Link>
        
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-8 flex-1">
          {project.story}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map(tag => (
            <span key={tag} className={`text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded border ${getTagColor(tag)}`}>
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-6 border-t border-slate-100 dark:border-slate-800 mt-auto">
          <Link to={`/projects/${project.slug}`} className="inline-flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white group-hover:text-ag-green transition-colors">
            Analysis Report <ArrowRight size={14} />
          </Link>
          
          {project.github && (
            <a href="https://github.com/saqlineniam" target="_blank" rel="noreferrer" className="text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
              <Code size={18} />
            </a>
          )}
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
      <div className="absolute inset-0 bg-grid-pattern opacity-40 dark:opacity-20 pointer-events-none -z-10 h-[60vh]"></div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 pt-16 pb-24">
        
        <header className="mb-20 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-ag-green font-black text-[10px] uppercase tracking-[0.3em] mb-4"
          >
            <div className="w-8 h-px bg-ag-green"></div>
            Research Portfolio
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white mb-8 leading-[1.1]"
          >
            Technical Implementations
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 font-light leading-relaxed max-w-2xl"
          >
            Documenting the engineering process from <span className="text-slate-900 dark:text-white font-medium">UAV visual odometry</span> to <span className="text-slate-900 dark:text-white font-medium">biochemical predictive modeling</span>.
          </motion.p>
        </header>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap items-center gap-2 mb-16"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 border ${
                activeTab === cat 
                  ? 'bg-slate-900 dark:bg-ag-green text-white dark:text-slate-900 border-slate-900 dark:border-ag-green shadow-xl shadow-slate-200 dark:shadow-ag-green/10' 
                  : 'bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-500 border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-10">
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