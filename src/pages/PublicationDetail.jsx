import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Image as ImageIcon, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { publications } from '../data/publications';

const PublicationDetail = () => {
  const { slug } = useParams();
  const pub = publications.find(p => p.slug === slug);

  if (!pub) {
    return (
      <div className="max-w-4xl mx-auto px-6 pt-32 pb-24 text-center">
        <h1 className="font-serif text-3xl font-bold text-slate-900 mb-4">Publication Not Found</h1>
        <Link to="/publications" className="text-uga-red hover:underline inline-flex items-center gap-2">
          <ArrowLeft size={16} /> Back to Publications
        </Link>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none -z-10 h-[50vh]"></div>

      <div className="max-w-4xl mx-auto px-6 md:px-12 pt-16 pb-24">
        
        <Link to="/publications" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 mb-10 transition-colors">
          <ArrowLeft size={16} /> Back to Publications
        </Link>

        {/* Header Section */}
        <header className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-bold tracking-wider text-slate-500 uppercase bg-slate-100 px-2 py-1 rounded">
              {pub.type}
            </span>
            <span className="text-sm font-medium text-uga-red">{pub.year}</span>
          </div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight"
          >
            {pub.title}
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="prose prose-slate max-w-none mb-8"
          >
            <p className="text-lg text-slate-600 leading-relaxed">
              {pub.authors.split('Niam, S.').map((part, i, arr) => 
                <span key={i}>
                  {part}
                  {i < arr.length - 1 && <strong className="text-slate-900 border-b-2 border-uga-red/30">Niam, S.</strong>}
                </span>
              )}
            </p>
            <p className="text-slate-800 font-medium italic">
              Published in: {pub.journal}
            </p>
          </motion.div>

          {pub.link !== "#" && (
            <motion.a 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              href={pub.link} 
              target="_blank" 
              rel="noreferrer" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded font-medium hover:bg-slate-800 transition-colors"
            >
              <ExternalLink size={16} /> View Official Source / DOI
            </motion.a>
          )}

          {pub.pdf && (
            <motion.a 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              href={pub.pdf} 
              target="_blank" 
              rel="noreferrer" 
              className="inline-flex items-center gap-2 ml-4 px-6 py-3 border-2 border-uga-red text-uga-red rounded font-bold hover:bg-uga-red hover:text-white transition-colors"
            >
              <FileText size={16} /> View Poster PDF
            </motion.a>
          )}
        </header>

        <div className="w-full h-px bg-slate-200 mb-16"></div>

        {/* Narrative / Background Section */}
        <section className="mb-16">
          <h2 className="font-serif text-2xl font-bold text-slate-900 mb-6">Research Background & Narrative</h2>
          <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
            <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
              {pub.background}
            </p>
          </div>
        </section>

        {/* Embedded Poster PDF Viewer */}
        {pub.pdf && (
          <section className="mb-16">
            <h2 className="font-serif text-2xl font-bold text-slate-900 mb-6">Poster Presentation</h2>
            <div className="w-full aspect-[1/1.4] md:aspect-[4/3] bg-slate-100 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
              <iframe 
                src={pub.pdf} 
                className="w-full h-full border-none" 
                title={`${pub.title} Poster`}
              >
                <p>Your browser does not support PDFs. <a href={pub.pdf}>Download the PDF</a>.</p>
              </iframe>
            </div>
          </section>
        )}

        {/* Lab Pictures / Gallery Section */}
        <section>
          <h2 className="font-serif text-2xl font-bold text-slate-900 mb-6">Lab Gallery</h2>
          <p className="text-slate-500 mb-8">Behind the scenes photos from the data collection, experimentation, and analysis phases.</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {pub.images.map((img) => (
              <div key={img.id} className="group relative aspect-[4/3] bg-slate-100 rounded-xl border border-slate-200 overflow-hidden flex flex-col items-center justify-center cursor-pointer hover:border-slate-300 transition-colors">
                {img.src ? (
                  <img src={img.src} alt={img.caption} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                ) : (
                  <>
                    <ImageIcon size={32} className="text-slate-300 mb-3 group-hover:text-slate-400 transition-colors" />
                    <p className="text-sm font-mono text-slate-400 px-6 text-center group-hover:text-slate-500 transition-colors">
                      {img.caption}
                    </p>
                  </>
                )}
                {/* Caption Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white text-sm font-medium">{img.caption}</p>
                </div>
              </div>
            ))}
            
            {/* Add New Picture Slot */}
            <div className="aspect-[4/3] border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition-colors">
              <span className="text-slate-400 text-sm font-medium">+ Add More Images Later</span>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default PublicationDetail;