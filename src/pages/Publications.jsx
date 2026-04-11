import { ExternalLink, FileText, Code, Quote, ArrowRight } from 'lucide-react';
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
      className="group bg-white border border-slate-200 rounded-xl p-6 md:p-8 hover:shadow-lg transition-all duration-300 relative overflow-hidden"
    >
      {/* Featured Accent Line */}
      {pub.featured && (
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-uga-red"></div>
      )}

      <div className="flex flex-col md:flex-row gap-6 justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold tracking-wider text-slate-500 uppercase bg-slate-100 px-2 py-1 rounded">
                {pub.type}
              </span>
              <span className="text-sm font-medium text-uga-red">{pub.year}</span>
              {pub.status === "In Preparation" && (
                <span className="text-xs font-bold tracking-wider text-amber-600 uppercase bg-amber-50 px-2 py-1 rounded">
                  In Preparation
                </span>
              )}
            </div>
            
            <Link to={`/publications/${pub.slug}`} className="hidden md:flex items-center gap-1 text-sm font-medium text-uga-red opacity-0 group-hover:opacity-100 transition-opacity">
              View Lab Details <ArrowRight size={16} />
            </Link>
          </div>
          
          <Link to={`/publications/${pub.slug}`} className="block font-serif text-xl md:text-2xl font-bold text-slate-900 mb-3 leading-snug hover:text-uga-red transition-colors">
            {pub.title}
          </Link>
          
          <p className="text-sm text-slate-600 mb-2 leading-relaxed">
            {pub.authors.split('Niam, S.').map((part, i, arr) => 
              <span key={i}>
                {part}
                {i < arr.length - 1 && <strong className="text-slate-900">Niam, S.</strong>}
              </span>
            )}
          </p>
          
          <p className="text-sm font-medium text-slate-800 italic mb-6">
            {pub.journal}
          </p>
        </div>

        {/* Placeholder or actual image for featured paper */}
        {pub.featured && (
          <Link to={`/publications/${pub.slug}`} className="hidden md:flex shrink-0 w-32 h-32 bg-slate-50 border border-slate-200 rounded-lg items-center justify-center relative overflow-hidden hover:border-uga-red transition-colors group/img cursor-pointer">
            {pub.slug === 'strawberry-edible-coatings' ? (
              <img src="/images/strawberries/main.jpg" alt="Strawberry Coatings" className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500" />
            ) : (
              <>
                <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
                <p className="text-[10px] text-slate-400 font-mono text-center px-2 relative z-10 group-hover/img:text-uga-red transition-colors">[ Lab Gallery ]</p>
              </>
            )}
          </Link>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-6 border-t border-slate-100">
        <div className="flex flex-wrap gap-3">
          {pub.link !== "#" && (
            <a href={pub.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded text-xs font-medium hover:bg-slate-800 transition-colors">
              <ExternalLink size={14} /> DOI / Paper
            </a>
          )}
          <button className="inline-flex items-center gap-2 px-4 py-2 border border-slate-200 text-slate-600 rounded text-xs font-medium hover:bg-slate-50 transition-colors opacity-50 cursor-not-allowed" title="PDF coming soon">
            <FileText size={14} /> PDF
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 border border-slate-200 text-slate-600 rounded text-xs font-medium hover:bg-slate-50 transition-colors">
            <Quote size={14} /> BibTeX
          </button>
          {pub.title.includes('Machine learning') && (
            <a href="https://github.com/saqlineniam" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 border border-slate-200 text-slate-600 rounded text-xs font-medium hover:bg-slate-50 transition-colors">
              <Code size={14} /> Code
            </a>
          )}
        </div>
        
        {/* Mobile Detail Link */}
        <Link to={`/publications/${pub.slug}`} className="md:hidden flex items-center gap-1 text-sm font-medium text-uga-red">
          Lab Details <ArrowRight size={14} />
        </Link>
      </div>
    </motion.div>
  );
};

const Publications = () => {
  const featuredPubs = publications.filter(p => p.featured);
  const otherPubs = publications.filter(p => !p.featured);

  return (
    <div className="relative">
      <div className="max-w-4xl mx-auto px-6 md:px-12 pt-16 pb-24">
        
        <header className="mb-16">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 mb-4">Publications</h1>
          <p className="text-lg text-slate-600 font-light leading-relaxed max-w-2xl">
            An archive of my peer-reviewed articles, conference proceedings, and ongoing manuscripts focused on precision horticulture and food engineering.
          </p>
        </header>

        {/* Featured Publications Section */}
        <section className="mb-16">
          <h2 className="font-serif text-2xl font-bold text-slate-900 mb-8 border-b border-slate-200 pb-2">
            Featured Research
          </h2>
          <div className="space-y-8">
            {featuredPubs.map((pub, index) => (
              <PaperCard key={pub.id} pub={pub} index={index} />
            ))}
          </div>
        </section>

        {/* All Other Publications Section */}
        <section>
          <h2 className="font-serif text-2xl font-bold text-slate-900 mb-8 border-b border-slate-200 pb-2">
            Conference Papers & Preprints
          </h2>
          <div className="space-y-6">
            {otherPubs.map((pub, index) => (
              <PaperCard key={pub.id} pub={pub} index={index + featuredPubs.length} />
            ))}
          </div>
        </section>

        {/* Ongoing Work Note */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 p-8 bg-slate-50 border border-slate-200 rounded-xl text-center"
        >
          <h3 className="font-serif text-lg font-bold text-slate-900 mb-2">Current Lab Focus (UGA Tifton)</h3>
          <p className="text-slate-600 text-sm max-w-xl mx-auto">
            Currently preparing manuscripts on real-time UAV-based tomato plant counting and accurate instance re-identification of cauliflower plants using drones.
          </p>
        </motion.div>

      </div>
    </div>
  );
};

export default Publications;