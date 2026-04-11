import { motion } from 'framer-motion';
import { ArrowRight, Leaf } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-texture">
      {/* Abstract background blobs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-acid/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-[30rem] h-[30rem] bg-emerald-900/40 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10 w-full grid md:grid-cols-12 gap-12 items-center">
        
        <div className="md:col-span-8 md:pr-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="px-3 py-1 text-xs font-mono rounded-full border border-acid/30 text-acid bg-acid/5">
              Research Assistant @ SUST
            </span>
            <span className="text-slate-400 text-sm font-mono flex items-center gap-1">
              <Leaf size={14} className="text-emerald-500" /> Food Eng. & Tea Tech
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight mb-6"
          >
            Bridging <span className="text-transparent bg-clip-text bg-gradient-to-r from-acid to-emerald-400">Computer Vision</span> & Precision Horticulture.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl font-light"
          >
            I develop data-driven models for non-destructive quality analysis of food systems, hyperspectral imaging, and drone-based agricultural mapping.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4"
          >
            <a href="#publications" className="px-8 py-4 bg-acid text-forest-900 font-bold rounded-full hover:bg-acid-hover transition-colors flex items-center gap-2">
              View Publications <ArrowRight size={18} />
            </a>
            <a href="mailto:saklain35@student.sust.edu" className="px-8 py-4 glass-panel rounded-full font-medium hover:bg-white/5 transition-colors">
              Contact Me
            </a>
          </motion.div>
        </div>

        {/* Right side decorative element / Profile conceptual */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="md:col-span-4 hidden md:block"
        >
          <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden glass-panel border-acid/20 p-2 group">
            <div className="w-full h-full bg-forest-800 rounded-2xl overflow-hidden relative">
              {/* Overlay grid mimicking ML tracking */}
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjA0LCAyNTUsIDAsIDAuMikiLz48L3N2Zz4=')] opacity-50 z-10" />
              
              {/* Abstract structural representation instead of direct photo (adjust as needed) */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/40 to-forest-900 flex items-center justify-center">
                 <div className="w-32 h-32 border border-acid/30 rounded-full animate-pulse flex items-center justify-center">
                    <div className="w-24 h-24 border border-acid/50 rounded-full flex items-center justify-center">
                       <Leaf className="text-acid/70" size={32} />
                    </div>
                 </div>
              </div>

              {/* Bounding box UI accent */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-acid opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-acid opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;