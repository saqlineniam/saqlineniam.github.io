import { motion } from 'framer-motion';
import { Download, ExternalLink, Cpu, FlaskConical, Globe, BookOpen, GraduationCap, Award, Mail, Music, Bot, Layers, Terminal, Database, Microscope } from 'lucide-react';

const CV = () => {
  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none -z-10 h-[60vh]"></div>

      <div className="max-w-5xl mx-auto px-6 md:px-12 pt-16 pb-24">
        
        <header className="mb-20 flex flex-col md:flex-row md:items-start justify-between gap-10">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-ag-green font-black text-[10px] uppercase tracking-[0.3em] mb-4"
            >
              <div className="w-8 h-px bg-ag-green"></div>
              Technical Profile
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6"
            >
              Curriculum Vitae
            </motion.h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 font-light leading-relaxed">
              Architecting the intersection of <span className="text-ag-deep dark:text-ag-green font-medium italic underline decoration-ag-green/30">Computer Vision</span>, <span className="text-tech-blue dark:text-tech-blue font-medium italic underline decoration-tech-blue/30">Robotics</span>, and <span className="text-slate-900 dark:text-white font-medium italic underline decoration-slate-400/30">Food Engineering</span>.
            </p>
          </div>
          
          <div className="flex flex-col gap-3">
             <button className="inline-flex items-center gap-3 px-6 py-3 bg-slate-900 dark:bg-ag-green text-white dark:text-slate-900 rounded-xl text-sm font-bold hover:bg-slate-800 dark:hover:bg-ag-green/90 transition-all shadow-xl shadow-slate-200 dark:shadow-ag-green/10">
               <Download size={18} /> Export PDF
             </button>
             <a href="mailto:saklain35@student.sust.edu" className="inline-flex items-center gap-3 px-6 py-3 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-900 transition-all">
               <Mail size={18} /> Contact
             </a>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          
          {/* Main Content (Left) */}
          <div className="md:col-span-8 space-y-20">
            
            {/* Education */}
            <section>
              <div className="flex items-center gap-4 mb-10">
                <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center">
                   <GraduationCap size={20} className="text-slate-900 dark:text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">Education</h2>
              </div>
              
              <div className="space-y-12 ml-5 border-l border-slate-100 dark:border-slate-800 pl-10 relative">
                <div className="relative">
                  <div className="absolute -left-[45px] top-1 h-2.5 w-2.5 rounded-full bg-ag-green shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                  <div className="mb-2">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">University of Georgia</h3>
                    <div className="text-sm font-black text-ag-green uppercase tracking-widest mt-1">Starting Aug 2026</div>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 font-medium mb-4">MS in Horticulture</p>
                  <div className="cyber-card p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700 mt-1.5"></div>
                        <span><strong>Research Focus:</strong> Advanced Robotics in Agriculture</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute -left-[45px] top-1 h-2.5 w-2.5 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                  <div className="mb-2">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white opacity-50 dark:opacity-40">Shahjalal University of Science and Technology</h3>
                    <div className="text-sm font-black text-ag-green uppercase tracking-widest mt-1">2019 – 2024</div>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 font-medium mb-4">BSc (Engineering) in Food Engineering and Tea Technology</p>
                  <div className="cyber-card p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700 mt-1.5"></div>
                        <span><strong>CGPA:</strong> 3.46 / 4.00</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700 mt-1.5"></div>
                        <span><strong>Major Thesis:</strong> Impact of alginate, guar gum, and pectin-based edible coatings on strawberry shelf life.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Research Experience */}
            <section>
              <div className="flex items-center gap-4 mb-10">
                <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center">
                   <Award size={20} className="text-slate-900 dark:text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">Experience</h2>
              </div>
              
              <div className="space-y-12 ml-5 border-l border-slate-100 dark:border-slate-800 pl-10 relative">
                <div className="relative">
                  <div className="absolute -left-[45px] top-1 h-2.5 w-2.5 rounded-full bg-ag-green shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                  <div className="mb-2">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Graduate Research Assistant</h3>
                    <div className="text-sm font-black text-ag-green uppercase tracking-widest mt-1">Starting Aug 2026</div>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 font-medium mb-1">Precision Horticulture Lab, Tifton</p>
                    <p className="text-slate-500 dark:text-slate-400 font-bold text-sm mb-4">University of Georgia</p>                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    Incoming researcher focusing on autonomous robotics and computer vision systems for high-throughput phenotyping and precision horticultural management.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[45px] top-1 h-2.5 w-2.5 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                  <div className="mb-2">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white opacity-50 dark:opacity-40">Research Assistant</h3>
                    <div className="text-sm font-black text-tech-blue uppercase tracking-widest mt-1">May 2024 – Present</div>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 font-medium mb-4">Dept. of Food Engineering and Tea Technology, SUST</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    Conducting research under Dr. Iftekhar Ahmad, integrating machine learning with non-thermal processing and post-harvest preservation to extend perishable food shelf life.
                  </p>
                </div>
              </div>
            </section>

            {/* Trainings - Flat Layout */}
            <section>
              <div className="flex items-center gap-4 mb-10">
                <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center">
                   <BookOpen size={20} className="text-slate-900 dark:text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">Technical Trainings</h2>
              </div>
              
              <div className="space-y-8 ml-5">
                {[
                  { title: "Quality Control and Unit Operation", inst: "TICI, Bangladesh", date: "Jan - Feb 2023", desc: "Intensive training on industrial food processing and quality assurance protocols." },
                  { title: "Agro-Processing & Preservation", inst: "BRRI, Bangladesh", date: "Nov 2022", desc: "Workshop focusing on sustainable post-harvest technologies and value addition." },
                  { title: "International Tea Trade (Online)", inst: "Zhangzhou College, China", date: "Nov 2022", desc: "Global tea economics, processing technology, and trade certification." },
                ].map((item) => (
                  <div key={item.title} className="border-b border-slate-100 dark:border-slate-800 pb-8 last:border-0">
                    <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 mb-2">
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white">{item.title}</h4>
                      <span className="text-[10px] font-black text-ag-green uppercase tracking-widest">{item.date}</span>
                    </div>
                    <p className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tight mb-2">{item.inst}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Extracurricular - Flat Layout */}
            <section>
              <div className="flex items-center gap-4 mb-10">
                <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center">
                   <Music size={20} className="text-slate-900 dark:text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">Extracurricular</h2>
              </div>
              
              <div className="ml-5">
                <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 mb-4">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Shikorh Cultural Club</h3>
                  <span className="text-[10px] font-black text-ag-green uppercase tracking-widest">2023 - 2024</span>
                </div>
                <p className="text-lg font-medium text-slate-700 dark:text-slate-300 mb-3 italic">Publication Secretary</p>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl">
                  Directed the editorial workflow for departmental publications and cultural newsletters. Facilitated cross-disciplinary collaboration between engineering cohorts and creative arts initiatives, managing both digital and print production cycles.
                </p>
              </div>
            </section>

          </div>

          {/* Sidebar (Right) */}
          <div className="md:col-span-4 space-y-12">
            
            {/* Computing Stack */}
            <div className="bg-slate-900 dark:bg-slate-950 rounded-3xl p-8 text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-ag-green/10 blur-[60px] rounded-full"></div>
               <h3 className="text-lg font-bold mb-8 flex items-center gap-2">
                 <Terminal size={20} className="text-ag-green" /> Skills
               </h3>
               
               <div className="space-y-8">
                 <div>
                   <h4 className="text-[10px] font-black text-ag-green uppercase tracking-[0.2em] mb-4">Programming & ML</h4>
                   <div className="flex flex-wrap gap-2">
                     {["Python", "LaTeX", "OpenCV", "PyTorch", "Vision Transformers", "Autoencoders", "Reinforcement Learning"].map(s => (
                       <span key={s} className="text-[9px] bg-white/5 border border-white/10 px-2 py-1 rounded text-white">{s}</span>
                     ))}
                   </div>
                 </div>

                 <div>
                   <h4 className="text-[10px] font-black text-tech-blue uppercase tracking-[0.2em] mb-4">Robotics & DevOps</h4>
                   <div className="flex flex-wrap gap-2">
                     {["ROS 2", "SLAM", "Docker", "MLOps"].map(s => (
                       <span key={s} className="text-[9px] bg-white/5 border border-white/10 px-2 py-1 rounded font-bold text-tech-blue/80">{s}</span>
                     ))}
                   </div>
                 </div>
               </div>
            </div>

            {/* Lab & Stats */}
            <div className="cyber-card p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <FlaskConical size={20} className="text-ag-green" /> Lab & Analysis
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-3">Food Science</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Bioactive Extraction", "Physicochemical Analysis", "Chemical Formulation", "Non-thermal Processing"].map(s => (
                      <span key={s} className="text-[9px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-1 rounded font-medium">{s}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-3">Analytical Instruments</h4>
                  <div className="flex flex-wrap gap-2">
                    {["GC", "HPLC", "E-Nose", "Spectrophotoscopy"].map(s => (
                      <span key={s} className="text-[9px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-1 rounded font-medium">{s}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-3">Stats & Bioinformatics</h4>
                  <div className="flex flex-wrap gap-2">
                    {["PCA / LDA", "Variance Tests", "PCMCI", "RDKit", "chEMBL"].map(s => (
                      <span key={s} className="text-[9px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-1 rounded font-medium">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Test Scores */}
            <div className="cyber-card p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-slate-900 dark:text-white mb-6">Test Scores</h3>
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between items-end mb-3">
                    <span className="text-sm font-bold text-slate-600 dark:text-slate-400">IELTS Overall</span>
                    <span className="text-xl font-black text-slate-900 dark:text-white">7.0</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[{l:'Reading', v:8.0}, {l:'Listening', v:7.5}, {l:'Speaking', v:7.0}, {l:'Writing', v:6.0}].map(s => (
                      <div key={s.l} className="bg-slate-50 dark:bg-slate-800 p-2 rounded text-center">
                        <div className="text-[8px] font-black text-slate-400 dark:text-slate-500 uppercase">{s.l}</div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white">{s.v}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-end mb-3">
                    <span className="text-sm font-bold text-slate-600 dark:text-slate-400">GRE Overall</span>
                    <span className="text-xl font-black text-slate-900 dark:text-white">306</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[{l:'Quant', v:162}, {l:'Verbal', v:144}, {l:'AWA', v:3.0}].map(s => (
                      <div key={s.l} className="bg-slate-50 dark:bg-slate-800 p-2 rounded text-center">
                        <div className="text-[8px] font-black text-slate-400 dark:text-slate-500 uppercase">{s.l}</div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white">{s.v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* References */}
            <div className="p-8 space-y-6">
              <h3 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">References</h3>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">Dr. Iftekhar Ahmad</p>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase mb-1">Professor, SUST</p>
                <a href="mailto:iftekhar-ttc@sust.edu" className="text-[10px] text-ag-green font-bold">iftekhar-ttc@sust.edu</a>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">Dr. G M Rabiul Islam</p>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase mb-1">Professor, SUST</p>
                <a href="mailto:rabi-ttc@sust.edu" className="text-[10px] text-ag-green font-bold">rabi-ttc@sust.edu</a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CV;