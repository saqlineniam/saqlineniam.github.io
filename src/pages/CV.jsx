import { motion } from 'framer-motion';
import { Download, ExternalLink } from 'lucide-react';

const CV = () => {
  return (
    <div className="relative">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none -z-10 h-[50vh]"></div>

      <div className="max-w-4xl mx-auto px-6 md:px-12 pt-16 pb-24">
        
        <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-4xl md:text-5xl font-bold text-slate-900 mb-4"
            >
              Curriculum Vitae
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-slate-600 font-light"
            >
              Academic background, technical competencies, and professional experience.
            </motion.p>
          </div>
          
          <motion.a 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            href="/pdfs/CV_Saklain_Niam.pdf"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded font-medium hover:bg-slate-800 transition-colors shrink-0"
          >
            <Download size={16} /> Download PDF
          </motion.a>
        </header>

        <div className="space-y-16">
          
          {/* Education */}
          <section>
            <h2 className="font-serif text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
              <span className="w-8 h-px bg-uga-red"></span> Education
            </h2>
            
            <div className="space-y-8 ml-4 md:ml-11 border-l-2 border-slate-100 pl-6 relative">
              
              <div className="relative">
                <div className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border-2 border-slate-300 bg-white"></div>
                <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-1 mb-2">
                  <h3 className="text-xl font-bold text-slate-900">Shahjalal University of Science and Technology (SUST)</h3>
                  <span className="text-sm font-bold tracking-wider text-slate-400 uppercase">2019 – 2024</span>
                </div>
                <p className="text-slate-800 font-medium mb-3">BSc (Engineering) in Food Engineering and Tea Technology</p>
                <ul className="list-disc list-outside ml-5 text-slate-600 space-y-1 leading-relaxed">
                  <li><strong>CGPA:</strong> 3.46 / 4.00</li>
                  <li><strong>Thesis:</strong> Impact of alginate, guar gum, and pectin-based edible coatings on strawberry shelf life.</li>
                </ul>
              </div>

            </div>
          </section>

          {/* Professional Experience */}
          <section>
            <h2 className="font-serif text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
              <span className="w-8 h-px bg-uga-red"></span> Experience
            </h2>
            
            <div className="space-y-8 ml-4 md:ml-11 border-l-2 border-slate-100 pl-6 relative">
              
              <div className="relative">
                <div className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border-2 border-slate-300 bg-white"></div>
                <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-1 mb-2">
                  <h3 className="text-xl font-bold text-slate-900">Dept. of Food Engineering and Tea Technology, SUST</h3>
                  <span className="text-sm font-bold tracking-wider text-slate-400 uppercase">May 2024 – Present</span>
                </div>
                <p className="text-slate-800 font-medium mb-3">Research Assistant</p>
                <p className="text-slate-600 leading-relaxed">
                  Conducted research under Dr. Iftekhar Ahmad, integrating machine learning with non-thermal processing and post-harvest preservation to extend perishable food shelf life.
                </p>
              </div>

            </div>
          </section>

          {/* Technical Skills */}
          <section>
            <h2 className="font-serif text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
              <span className="w-8 h-px bg-uga-red"></span> Technical Skills
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ml-0 md:ml-11">
              
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">Programming & ML</h3>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li><strong className="text-slate-800">Languages:</strong> Python, LaTeX</li>
                  <li><strong className="text-slate-800">Computer Vision:</strong> OpenCV, Transfer Learning, Vision Transformers</li>
                  <li><strong className="text-slate-800">Machine Learning:</strong> Neural Networks, Reinforcement Learning (DQN)</li>
                  <li><strong className="text-slate-800">Geospatial/Climate:</strong> Kriging (pyKrige), Causal Analysis (PCMCI), Heatwave Analysis</li>
                  <li><strong className="text-slate-800">Bioinformatics:</strong> chEMBL, RDKit</li>
                </ul>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">Lab & Statistics</h3>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li><strong className="text-slate-800">Wet Lab:</strong> Chemical & Microbiological Analysis, Bioactives Extraction, Thermal/Non-Thermal Processing</li>
                  <li><strong className="text-slate-800">Instruments:</strong> GC, HPLC, Spectrophotoscopy, E-Nose</li>
                  <li><strong className="text-slate-800">Statistics:</strong> Variance tests, PCA, LDA</li>
                  <li><strong className="text-slate-800">Software:</strong> Statistica, Minitab, SuperPro, OriginPro</li>
                </ul>
              </div>

            </div>
          </section>

          {/* Scores & Training */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-12 ml-0 md:ml-11">
            
            <div>
              <h2 className="font-serif text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                Test Scores
              </h2>
              <ul className="space-y-4">
                <li className="flex flex-col gap-1 border-l-2 border-slate-200 pl-4">
                  <strong className="text-slate-900">GRE: 306</strong>
                  <span className="text-sm text-slate-600">Quant 162 — Verbal 144 — Analytical 3</span>
                </li>
                <li className="flex flex-col gap-1 border-l-2 border-slate-200 pl-4">
                  <strong className="text-slate-900">IELTS: 7.0</strong>
                  <span className="text-sm text-slate-600">Reading 8 — Listening 7.5 — Speaking 7 — Writing 6</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                Trainings & Workshops
              </h2>
              <ul className="space-y-4">
                <li className="flex flex-col gap-1 border-l-2 border-slate-200 pl-4">
                  <strong className="text-slate-900 text-sm">Quality Control and Unit Operation in Food Industry</strong>
                  <span className="text-xs text-slate-500">TICI, Bangladesh (Jan-Feb 2023)</span>
                </li>
                <li className="flex flex-col gap-1 border-l-2 border-slate-200 pl-4">
                  <strong className="text-slate-900 text-sm">Agro-Processing, Preservation, and Marketing</strong>
                  <span className="text-xs text-slate-500">BRRI, Bangladesh (Nov 2022)</span>
                </li>
                <li className="flex flex-col gap-1 border-l-2 border-slate-200 pl-4">
                  <strong className="text-slate-900 text-sm">International Tea Trade for Belt and Road Countries</strong>
                  <span className="text-xs text-slate-500">Zhangzhou College, China (Nov 2022)</span>
                </li>
              </ul>
            </div>

          </section>

          {/* References */}
          <section>
            <h2 className="font-serif text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
              <span className="w-8 h-px bg-uga-red"></span> References
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ml-0 md:ml-11">
              
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-1">Dr. Iftekhar Ahmad</h4>
                <p className="text-sm text-slate-600 mb-3">Professor, Dept. of Food Engineering and Tea Technology, SUST</p>
                <a href="mailto:iftekhar-ttc@sust.edu" className="text-xs font-medium text-uga-red hover:underline flex items-center gap-1">
                  iftekhar-ttc@sust.edu <ExternalLink size={12} />
                </a>
              </div>

              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-1">Dr. G M Rabiul Islam</h4>
                <p className="text-sm text-slate-600 mb-3">Professor, Dept. of Food Engineering and Tea Technology, SUST</p>
                <a href="mailto:rabi-ttc@sust.edu" className="text-xs font-medium text-uga-red hover:underline flex items-center gap-1">
                  rabi-ttc@sust.edu <ExternalLink size={12} />
                </a>
              </div>

              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-1">Md. Amjad Patwary</h4>
                <p className="text-sm text-slate-600 mb-3">Assistant Professor, Dept. of Food Engineering and Tea Technology, SUST</p>
                <a href="mailto:amjad-fet@sust.edu" className="text-xs font-medium text-uga-red hover:underline flex items-center gap-1">
                  amjad-fet@sust.edu <ExternalLink size={12} />
                </a>
              </div>

            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default CV;