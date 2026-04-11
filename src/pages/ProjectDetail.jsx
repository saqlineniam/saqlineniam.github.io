import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Code, Image as ImageIcon, Video } from 'lucide-react';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';

const ProjectDetail = () => {
  const { slug } = useParams();
  const project = projects.find(p => p.slug === slug);

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto px-6 pt-32 pb-24 text-center">
        <h1 className="font-serif text-3xl font-bold text-slate-900 mb-4">Project Not Found</h1>
        <Link to="/projects" className="text-uga-red hover:underline inline-flex items-center gap-2">
          <ArrowLeft size={16} /> Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none -z-10 h-[50vh]"></div>

      <div className="max-w-5xl mx-auto px-6 md:px-12 pt-16 pb-24">
        
        <Link to="/projects" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 mb-10 transition-colors">
          <ArrowLeft size={16} /> Back to Projects
        </Link>

        {/* Header Section */}
        <header className="mb-12">
          <div className="mb-6">
            <span className="text-xs font-bold tracking-wider text-slate-500 uppercase bg-slate-100 px-3 py-1.5 rounded">
              {project.category}
            </span>
          </div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight"
          >
            {project.title}
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap gap-2 mb-8"
          >
            {project.tags.map(tag => (
              <span key={tag} className="text-xs font-medium px-3 py-1.5 rounded-md border bg-slate-50 text-slate-600 border-slate-200">
                {tag}
              </span>
            ))}
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-600 leading-relaxed max-w-3xl"
          >
            {project.story}
          </motion.p>

          {project.github && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-8"
            >
              <a href="https://github.com/saqlineniam" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded font-medium hover:bg-slate-800 transition-colors">
                <Code size={16} /> View Code on GitHub
              </a>
            </motion.div>
          )}
        </header>

        <div className="w-full h-px bg-slate-200 mb-16"></div>

        {/* Project Media / Demo Section */}
        <section className="mb-16">
          <h2 className="font-serif text-2xl font-bold text-slate-900 mb-6">Demo & Visuals</h2>
          
          {project.youtubeId ? (
            <div className="w-full aspect-video bg-black rounded-2xl border border-slate-200 overflow-hidden mb-6 shadow-sm">
              <iframe 
                width="100%" 
                height="100%" 
                src={`https://www.youtube.com/embed/${project.youtubeId}`} 
                title={`${project.title} Demo`}
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
              ></iframe>
            </div>
          ) : project.thumbnail ? (
            <div className="w-full aspect-video bg-slate-100 rounded-2xl border border-slate-200 overflow-hidden mb-6 shadow-sm relative group cursor-pointer hover:border-uga-red/50 transition-colors">
               <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
            </div>
          ) : (
            <div className="w-full aspect-video bg-slate-100 rounded-2xl border border-slate-200 flex flex-col items-center justify-center text-slate-400 hover:border-uga-red/50 transition-colors cursor-pointer group mb-6 overflow-hidden relative">
              <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
              <Video size={48} className="mb-4 opacity-50 group-hover:opacity-100 group-hover:text-uga-red transition-all" />
              <p className="font-mono text-sm group-hover:text-uga-red transition-colors text-center px-4">[ Main Video/GIF Placeholder: {project.imageLabel} ]</p>
            </div>
          )}

          {/* Secondary Images Grid (Hidden when YouTube video is present, per your previous instruction, but we'll show it for non-video projects) */}
          {!project.youtubeId && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="aspect-[4/3] bg-slate-50 rounded-xl border border-slate-200 flex flex-col items-center justify-center text-slate-400 hover:bg-slate-100 transition-colors cursor-pointer group relative overflow-hidden">
                 <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
                 <ImageIcon size={32} className="mb-3 opacity-50 group-hover:text-slate-600" />
                 <p className="font-mono text-xs text-center px-4">[ Supplementary Image / Graph ]</p>
              </div>
              <div className="aspect-[4/3] border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition-colors">
                <span className="text-slate-400 text-sm font-medium">+ Add More Media</span>
              </div>
            </div>
          )}
        </section>

        {/* Implementation Details Section */}
        <section className="mb-16">
          <h2 className="font-serif text-2xl font-bold text-slate-900 mb-6">Implementation Details</h2>
          <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm prose prose-slate max-w-none">
            <p className="text-slate-600 leading-relaxed">
              <em>(Use this space to write a deeper technical dive into the architecture, challenges, and results of the project. Explain the data pipeline, the model choices, and how you evaluated success.)</em>
            </p>
            <ul className="text-slate-600">
              <li><strong>Dataset/Source:</strong> Describe what data was used.</li>
              <li><strong>Architecture:</strong> Explain the pipeline (e.g. YOLOv9 -&gt; BoTSORT).</li>
              <li><strong>Challenges:</strong> Describe obstacles like loop closure, occlusions, or compute limits.</li>
              <li><strong>Results:</strong> Share metrics (mAP, RMSE, Tracking Accuracy).</li>
            </ul>
          </div>
        </section>

      </div>
    </div>
  );
};

export default ProjectDetail;