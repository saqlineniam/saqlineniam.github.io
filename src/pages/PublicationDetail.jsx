import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Image as ImageIcon, FileText, Microscope, FlaskConical, Beaker, Layers, Code, Database } from 'lucide-react';
import { motion } from 'framer-motion';
import { publications } from '../data/publications';

const PublicationDetail = () => {
  const { slug } = useParams();
  const pub = publications.find(p => p.slug === slug);

  if (!pub) {
    return (
      <div className="max-w-4xl mx-auto px-6 pt-32 pb-24 text-center">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-8 uppercase tracking-widest">Research Record Not Found</h1>
        <Link to="/publications" className="text-ag-green font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:underline">
          <ArrowLeft size={16} /> Return to Bibliography
        </Link>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 bg-grid-pattern opacity-40 dark:opacity-20 pointer-events-none -z-10 h-[50vh]"></div>

      <div className="max-w-4xl mx-auto px-6 md:px-12 pt-16 pb-24">
        
        <Link to="/publications" className="inline-flex items-center gap-2 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest hover:text-ag-green mb-16 transition-colors group">
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Research Records
        </Link>

        {/* Header Section */}
        <header className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-[10px] font-black tracking-widest text-white bg-slate-900 dark:bg-ag-green dark:text-slate-900 px-3 py-1 rounded-full uppercase">
              {pub.type}
            </span>
            <div className="w-8 h-px bg-ag-green"></div>
            <span className="text-[10px] font-black text-ag-green uppercase tracking-[0.2em]">{pub.year} Collection</span>
          </div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-8 leading-tight tracking-tight"
          >
            {pub.title}
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <div className="text-xl text-slate-500 dark:text-slate-400 font-light leading-relaxed mb-6 italic border-l-4 border-slate-100 dark:border-slate-800 pl-8">
              {pub.authors.split('Niam, S.').map((part, i, arr) => 
                <span key={i}>
                  {part}
                  {i < arr.length - 1 && <strong className="text-slate-900 dark:text-white font-bold underline decoration-ag-green/30">Niam, S.</strong>}
                </span>
              )}
            </div>
            <div className="inline-flex items-center gap-3 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest bg-slate-50 dark:bg-slate-900 px-4 py-2 rounded-lg border border-slate-100 dark:border-slate-800">
               <Layers size={14} className="text-ag-green" />
               Source: <span className="text-slate-900 dark:text-white">{pub.journal}</span>
            </div>
          </motion.div>

          <div className="flex flex-wrap gap-4">
            {pub.link !== "#" && (
              <motion.a 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                href={pub.link} 
                target="_blank" 
                rel="noreferrer" 
                className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 dark:bg-ag-green text-white dark:text-slate-900 rounded-xl text-sm font-bold hover:bg-slate-800 dark:hover:bg-ag-green/90 transition-all shadow-xl shadow-slate-200 dark:shadow-ag-green/10"
              >
                <ExternalLink size={18} /> Official DOI Record
              </motion.a>
            )}

            {pub.pdf && (
              <motion.a 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                href={pub.pdf} 
                target="_blank" 
                rel="noreferrer" 
                className="inline-flex items-center gap-3 px-8 py-4 border-2 border-ag-green text-ag-green rounded-xl text-sm font-bold hover:bg-ag-green hover:text-white transition-all shadow-xl shadow-ag-green/10"
              >
                <FileText size={18} /> Research Poster
              </motion.a>
            )}

            {pub.projectSlug && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Link 
                  to={`/projects/${pub.projectSlug}`}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-xl"
                >
                  <Code size={18} /> View Implementation
                </Link>
              </motion.div>
            )}
          </div>
        </header>

        <div className="w-full h-px bg-slate-100 dark:bg-slate-800 mb-20"></div>

        {/* Narrative / Background Section */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-10">
             <Beaker size={20} className="text-ag-green" />
             <h2 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">Abstract & Methodology</h2>
          </div>
          <div className="cyber-card p-10 rounded-3xl bg-white dark:bg-slate-900 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-ag-green/5 rounded-full -mr-16 -mt-16"></div>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed whitespace-pre-wrap relative z-10">
              {pub.background}
            </p>
          </div>
        </section>

        {/* Embedded Poster PDF Viewer */}
        {pub.pdf && (
          <section className="mb-20">
             <div className="flex items-center gap-3 mb-10">
               <Layers size={20} className="text-tech-blue" />
               <h2 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">Technical Poster</h2>
            </div>
            <div className="w-full aspect-[1/1.4] md:aspect-[4/3] bg-slate-950 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-ag-green z-10"></div>
              <iframe 
                src={pub.pdf} 
                className="w-full h-full border-none" 
                title={`${pub.title} Poster`}
              >
                <p>PDF visualization unavailable. <a href={pub.pdf} className="text-ag-green underline">Direct Download</a>.</p>
              </iframe>
            </div>
          </section>
        )}

        {/* Lab Pictures / Gallery Section */}
        <section className="mb-24">
          <div className="flex items-center gap-3 mb-10">
             <Microscope size={20} className="text-slate-900 dark:text-white" />
             <h2 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">Analytical Documentation</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {pub.images.map((img) => (
              <div key={img.id} className="group relative aspect-[4/3] bg-white dark:bg-slate-900 p-2 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-lg overflow-hidden flex flex-col items-center justify-center cursor-pointer hover:shadow-2xl transition-all duration-500">
                {img.src ? (
                  <img src={img.src} alt={img.caption} className="w-full h-full object-cover rounded-2xl  hover:-0 transition-all duration-700 group-hover:scale-105" />
                ) : (
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-300 dark:text-slate-600 group-hover:text-ag-green transition-colors">
                      <ImageIcon size={32} />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 px-10 text-center leading-relaxed">
                      {img.caption}
                    </p>
                  </div>
                )}
                
                {/* Caption Overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-slate-950/80 backdrop-blur-md px-4 py-3 rounded-xl border border-white/10 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                  <p className="text-white text-[10px] font-black uppercase tracking-widest">{img.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer Archive Note */}
        <div className="pt-20 border-t border-slate-100 dark:border-slate-800 text-center">
           <p className="text-[10px] font-black text-slate-300 dark:text-slate-700 uppercase tracking-[0.4em]">Digital Repository of Saklain Niam — Verified Research Data</p>
        </div>

      </div>
    </div>
  );
};

export default PublicationDetail;