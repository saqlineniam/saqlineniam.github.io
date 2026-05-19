import { ExternalLink, FileText, Code, Quote, ArrowRight, Microscope, FlaskConical } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { publications } from '../data/publications';

const PaperCard = ({ pub, index }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group cyber-card rounded-2xl p-8 md:p-10 relative overflow-hidden mb-8"
    >
      {/* Type Badge */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-[10px] font-black tracking-widest text-white bg-slate-900 px-3 py-1 rounded-full uppercase">
          {pub.type}
        </span>
        <span className="text-[10px] font-black tracking-widest text-ag-green uppercase">
          {pub.year}
        </span>
        {pub.status === "In Preparation" && (
          <span className="text-[10px] font-black tracking-widest text-tech-blue uppercase border border-tech-blue/30 px-3 py-1 rounded-full">
            In Pipeline
          </span>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-10 justify-between items-start">
        <div className="flex-1">
          <Link to={`/publications/${pub.slug}`} className="block text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4 leading-tight hover:text-ag-green transition-colors">
            {pub.title}
          </Link>
          
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-3 leading-relaxed">
            {pub.authors.split('Niam, S.').map((part, i, arr) => 
              <span key={i}>
                {part}
                {i < arr.length - 1 && <strong className="text-slate-900 dark:text-white font-bold underline decoration-ag-green/30">Niam, S.</strong>}
              </span>
            )}
          </p>
          
          <div className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-slate-200 italic mb-8">
            <div className="w-4 h-px bg-slate-300 dark:bg-slate-700"></div>
            {pub.journal}
          </div>
        </div>

        {/* Featured Visual */}
        {pub.featured && (
          <div className="hidden md:flex shrink-0 w-40 h-40 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl items-center justify-center relative overflow-hidden group-hover:border-ag-green/30 transition-colors">
            {pub.slug === 'strawberry-edible-coatings' ? (
              <img src="/images/strawberries/main.jpg" alt="Strawberry Coatings" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
            ) : (
              <div className="relative z-10 flex flex-col items-center gap-2 opacity-20 group-hover:opacity-100 transition-opacity">
                <Microscope size={32} className="text-ag-green" />
                <span className="text-[8px] font-black uppercase tracking-tighter dark:text-slate-300">Analytical View</span>
              </div>
            )}
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-6 pt-8 border-t border-slate-100 dark:border-slate-800">
        <div className="flex flex-wrap gap-4">
          {pub.link !== "#" && (
            <a href={pub.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-slate-100 hover:text-ag-green transition-colors">
              <ExternalLink size={14} /> Full Text
            </a>
          )}
          <a href="#" className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 dark:text-slate-600 cursor-not-allowed">
            <FileText size={14} /> Dataset
          </a>
          <button className="inline-flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-slate-100 hover:text-ag-green transition-colors">
            <Quote size={14} /> Cite
          </button>
        </div>
        
        <Link to={`/publications/${pub.slug}`} className="inline-flex items-center gap-2 text-xs font-bold text-ag-green hover:underline">
          Analysis Details <ArrowRight size={14} />
        </Link>
      </div>
    </motion.div>
  );
};

const Publications = () => {
  const featuredPubs = publications.filter(p => p.featured);
  const otherPubs = publications.filter(p => !p.featured);

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none -z-10 h-[50vh]"></div>

      <div className="max-w-5xl mx-auto px-6 md:px-12 pt-16 pb-24">
        
        <header className="mb-20 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-tech-blue font-black text-[10px] uppercase tracking-[0.3em] mb-4"
          >
            <div className="w-8 h-px bg-tech-blue"></div>
            Academic Records
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">Research & Publications</h1>
          <p className="text-xl text-slate-500 dark:text-slate-400 font-light leading-relaxed">
            Documenting findings at the intersection of <span className="text-ag-deep dark:text-ag-green font-medium italic underline decoration-ag-green/30">Food Science</span> and <span className="text-slate-900 dark:text-white font-medium italic underline decoration-tech-blue/30">Artificial Intelligence</span>.
          </p>
        </header>

        {/* Featured Publications Section */}
        <section className="mb-24">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-[0.2em] whitespace-nowrap">Peer-Reviewed Journals</h2>
            <div className="h-px bg-slate-200 dark:bg-slate-800 flex-grow"></div>
          </div>
          <div>
            {featuredPubs.map((pub, index) => (
              <PaperCard key={pub.id} pub={pub} index={index} />
            ))}
          </div>
        </section>

        {/* All Other Publications Section */}
        <section className="mb-24">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-[0.2em] whitespace-nowrap">Symposiums & Preprints</h2>
            <div className="h-px bg-slate-200 dark:bg-slate-800 flex-grow"></div>
          </div>
          <div>
            {otherPubs.map((pub, index) => (
              <PaperCard key={pub.id} pub={pub} index={index + featuredPubs.length} />
            ))}
          </div>
        </section>

        {/* Pipeline Note */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="p-12 bg-slate-900 rounded-3xl text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-ag-green/10 blur-[100px] rounded-full"></div>
          <h3 className="text-2xl font-bold text-white mb-4 relative z-10">Ongoing Manuscripts</h3>
          <p className="text-slate-400 text-sm max-w-xl mx-auto relative z-10 leading-relaxed">
            Currently refining two primary research papers focusing on <span className="text-white">UAV-based plant Re-ID</span> and <span className="text-white">real-time tomato segmentation</span> in varying luminosity environments.
          </p>
          <div className="mt-8 flex justify-center gap-2 relative z-10">
            <div className="w-1.5 h-1.5 rounded-full bg-ag-green animate-pulse"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-ag-green animate-pulse [animation-delay:0.2s]"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-ag-green animate-pulse [animation-delay:0.4s]"></div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Publications;