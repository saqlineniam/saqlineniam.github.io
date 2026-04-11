import { motion } from 'framer-motion';
import { ExternalLink, FileText } from 'lucide-react';

const publications = [
  {
    title: "Machine learning-based optimization of alginate, guar gum, and pectin-based edible coatings for extended strawberry shelf life.",
    journal: "LWT - Food Science and Technology",
    year: "2025",
    doi: "10.1016/J.LWT.2025.118548",
    link: "https://doi.org/10.1016/J.LWT.2025.118548",
    type: "Journal"
  },
  {
    title: "Comprehensive Analysis of Tea Concentrates with Machine Learning–Assisted Sensory Characterization.",
    journal: "Applied Food Research",
    year: "2026",
    doi: "10.2139/SSRN.5398137",
    link: "https://doi.org/10.2139/SSRN.5398137",
    type: "Journal"
  },
  {
    title: "A machine learning framework integrating seed traits and plasma parameters for predicting germination uplift in crops.",
    journal: "Int. Plant Tissue Culture & Biotech Conf.",
    year: "2025",
    doi: "arXiv:2510.23657v1",
    link: "https://arxiv.org/abs/2510.23657v1",
    type: "Conference"
  }
];

const PublicationGallery = () => {
  return (
    <section id="publications" className="py-24 bg-forest-800/50">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-4 flex items-center gap-4">
            <span className="w-12 h-[2px] bg-acid inline-block"></span>
            Selected Publications
          </h2>
        </div>

        <div className="space-y-6">
          {publications.map((pub, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group glass-panel p-6 md:p-8 rounded-2xl hover:border-acid/30 transition-all flex flex-col md:flex-row gap-6 items-start md:items-center justify-between"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`text-xs font-mono px-2 py-1 rounded-md ${pub.type === 'Journal' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-500/20 text-blue-400'}`}>
                    {pub.type}
                  </span>
                  <span className="text-slate-400 text-sm font-mono">{pub.year}</span>
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 group-hover:text-acid transition-colors">
                  {pub.title}
                </h3>
                <p className="text-slate-400 italic">
                  {pub.journal}
                </p>
              </div>

              <a 
                href={pub.link} 
                target="_blank" 
                rel="noreferrer"
                className="shrink-0 flex items-center gap-2 px-5 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-colors font-mono text-sm group-hover:border-acid/50 group-hover:text-acid"
              >
                <FileText size={16} />
                {pub.doi.includes('arXiv') ? 'arXiv' : 'DOI'}
                <ExternalLink size={14} />
              </a>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-12 p-6 rounded-2xl border border-dashed border-white/10 bg-black/20 text-center"
        >
          <p className="text-slate-400">
            <span className="text-acid">Ongoing:</span> Real-time UAV-based Tomato Plant Counting and Weed Mapping for Small-Scale Agricultural Fields.
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default PublicationGallery;