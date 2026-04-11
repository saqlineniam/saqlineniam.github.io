import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="relative">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-50 pointer-events-none -z-10 h-[70vh]"></div>

      <div className="max-w-5xl mx-auto px-6 md:px-12 pt-16 pb-24">
        
        {/* Hero Section */}
        <section className="mb-24 grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-uga-red font-medium tracking-widest text-sm uppercase mb-4">
                MSc Student & GRA
              </h2>
              <h1 className="font-serif text-5xl md:text-6xl font-bold text-slate-900 leading-tight mb-6">
                Saklain Niam
              </h1>
              <p className="text-xl text-slate-600 font-light leading-relaxed max-w-2xl">
                Bridging Computer Vision & Precision Horticulture. Dedicated to non-destructive quality analysis of food systems and advanced drone-based crop mapping.
              </p>
              
              <div className="mt-8 flex gap-4">
                <Link to="/cv" className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded hover:bg-slate-800 transition-colors text-sm font-medium">
                  View Full CV
                </Link>
                <a href="mailto:saklain35@student.sust.edu" className="inline-flex items-center gap-2 px-6 py-3 border border-slate-200 text-slate-700 rounded hover:border-slate-300 hover:bg-slate-50 transition-colors text-sm font-medium">
                  Contact Me
                </a>
              </div>
            </motion.div>
          </div>
          
          <div className="md:col-span-4 flex justify-end">
            {/* Minimalist Profile Representation */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full max-w-[280px] aspect-[3/4] bg-slate-100 rounded-lg border border-slate-200 relative overflow-hidden flex items-center justify-center shadow-sm"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-100 to-slate-50"></div>
              <img src="/images/profile.jpg" alt="Saklain Niam" className="relative z-10 w-full h-full object-cover object-top" />
              {/* Subtle Red Accent Line */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-uga-red"></div>
            </motion.div>
          </div>
        </section>

        <div className="grid md:grid-cols-12 gap-16">
          
          {/* Left Column: Research Narrative & Featured Research */}
          <div className="md:col-span-8 space-y-16">
            
            <section>
              <h3 className="font-serif text-2xl font-bold text-slate-900 mb-6 border-b border-slate-200 pb-2">
                Education
              </h3>
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="md:w-1/4 shrink-0 text-slate-500 font-medium text-sm pt-1">
                    Aug 2026 – Present
                  </div>
                  <div className="md:w-3/4">
                    <h4 className="text-lg font-bold text-slate-900">University of Georgia (UGA)</h4>
                    <p className="text-uga-red font-medium mb-2">MSc Student, Department of Horticulture</p>
                    <ul className="list-disc list-outside ml-5 text-slate-600 space-y-1 text-sm leading-relaxed">
                      <li>Graduate Research Assistant (GRA) at the Precision Horticulture Lab.</li>
                    </ul>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="md:w-1/4 shrink-0 text-slate-500 font-medium text-sm pt-1">
                    2019 – 2024
                  </div>
                  <div className="md:w-3/4">
                    <h4 className="text-lg font-bold text-slate-900">Shahjalal University of Science and Technology (SUST)</h4>
                    <p className="text-uga-red font-medium mb-2">BSc, Food Engineering and Tea Technology</p>
                    <ul className="list-disc list-outside ml-5 text-slate-600 space-y-1 text-sm leading-relaxed">
                      <li>CGPA: 3.46 / 4.00</li>
                      <li><strong>Thesis:</strong> Impact of alginate, guar gum, and pectin-based edible coatings on strawberry shelf life.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h3 className="font-serif text-2xl font-bold text-slate-900 mb-6 border-b border-slate-200 pb-2 flex items-center justify-between">
                Featured Research
                <Link to="/publications" className="text-sm font-sans font-medium text-uga-red hover:underline flex items-center gap-1">
                  View All <ArrowRight size={14} />
                </Link>
              </h3>
              
              <div className="space-y-6">
                {/* Paper 1 */}
                <div className="group border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow bg-white relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-uga-red opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="flex flex-col md:flex-row gap-4 justify-between items-start">
                    <div>
                      <p className="text-xs font-bold tracking-wider text-slate-400 uppercase mb-2">LWT - Food Science and Technology • 2025</p>
                      <h4 className="font-serif text-lg font-bold text-slate-900 mb-2 group-hover:text-uga-red transition-colors">
                        Machine learning-based optimization of alginate, guar gum, and pectin-based edible coatings for extended strawberry shelf life.
                      </h4>
                      <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                        First-author publication demonstrating the application of ML models to optimize bio-coatings, extending post-harvest quality preservation.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <a href="https://doi.org/10.1016/J.LWT.2025.118548" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded transition-colors">
                      <ExternalLink size={12} /> DOI Link
                    </a>
                  </div>
                </div>

                {/* Transition Summary */}
                <div className="bg-slate-50 border border-slate-100 rounded-lg p-6">
                  <h4 className="font-serif text-lg font-bold text-slate-800 mb-2">
                    Ongoing: Precision Agriculture Lab, UGA
                  </h4>
                  <p className="text-sm text-slate-600">
                    My current role involves developing drone-based agricultural mapping, including real-time UAV tomato plant counting, weed mapping using Faster RCNN, and Ground Robot-Based Lettuce Phenotyping.
                  </p>
                  <Link to="/projects" className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-uga-red hover:underline">
                    Explore Technical Projects <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </section>

          </div>

          {/* Right Column: Recent News Sidebar */}
          <div className="md:col-span-4">
            <div className="bg-white border border-slate-200 rounded-lg p-6 sticky top-24">
              <h3 className="font-serif text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                Recent News
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-uga-red opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-uga-red"></span>
                </span>
              </h3>
              
              <div className="space-y-6">
                <div className="relative pl-4 border-l-2 border-slate-100">
                  <div className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-slate-300"></div>
                  <p className="text-xs font-bold text-uga-red mb-1">AUGUST 2026</p>
                  <p className="text-sm text-slate-700">Starting as an MSc student and Graduate Research Assistant (GRA) at the Precision Agriculture Lab, University of Georgia.</p>
                </div>

                <div className="relative pl-4 border-l-2 border-slate-100">
                  <div className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-slate-300"></div>
                  <p className="text-xs font-bold text-slate-500 mb-1">MAY 2025</p>
                  <p className="text-sm text-slate-700">Published first-author paper in <em>LWT</em> on machine learning optimization for strawberry edible coatings.</p>
                </div>

                <div className="relative pl-4 border-l-2 border-slate-100">
                  <div className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-slate-300"></div>
                  <p className="text-xs font-bold text-slate-500 mb-1">EARLY 2025</p>
                  <p className="text-sm text-slate-700">Presented integrating seed traits and plasma parameters framework at the Int. Plant Tissue Culture & Biotech Conference.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;