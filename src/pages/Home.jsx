import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, Cpu, Database, Zap, Binary, Microscope, Drone, Bot } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const categories = [
    {
      title: "Biological Systems",
      icon: <Microscope size={24} className="text-ag-green" />,
      items: ["Food Engineering", "Seed Physiology", "Post-harvest Quality", "Tea Technology"]
    },
    {
      title: "Machine Intelligence",
      icon: <Binary size={24} className="text-tech-blue" />,
      items: ["Computer Vision", "Deep Learning", "MLOps & Docker", "Reinforcement Learning"]
    },
    {
      title: "Autonomous Robotics",
      icon: <Bot size={24} className="text-slate-900" />,
      items: ["UAV Mapping", "Visual Odometry", "ROS2 Systems", "SLAM Frameworks"]
    }
  ];

  return (
    <div className="relative">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none -z-10 h-screen"></div>
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-ag-green/5 blur-[120px] rounded-full -z-10"></div>
      <div className="absolute bottom-1/4 left-0 w-1/4 h-1/4 bg-tech-blue/5 blur-[100px] rounded-full -z-10"></div>

      <div className="max-w-5xl mx-auto px-6 md:px-12 pt-16 pb-24">

        {/* Hero Section: The Architect Narrative */}
        <section className="mb-32 grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-6xl md:text-7xl font-bold text-slate-900 dark:text-white leading-tight mb-6">
                Saklain Niam
              </h1>
              
              <p className="text-2xl text-slate-600 dark:text-slate-300 font-light leading-relaxed max-w-2xl mb-8">
                Architecting the <span className="text-ag-deep dark:text-ag-green font-medium italic underline decoration-ag-green/30">Intelligence</span> between biological systems and autonomous machines.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/projects" className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 dark:bg-ag-green text-white dark:text-slate-900 rounded-lg hover:bg-slate-800 dark:hover:bg-ag-green/90 transition-all shadow-lg shadow-slate-200/50 dark:shadow-ag-green/10 text-sm font-semibold">
                  Explore Research <ArrowRight size={18} />
                </Link>
                <Link to="/cv" className="inline-flex items-center gap-2 px-8 py-4 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-all text-sm font-semibold">
                  Technical Stack
                </Link>
              </div>
            </motion.div>
          </div>

          <div className="md:col-span-4 flex justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative group"
            >
              <div className="absolute -inset-4 bg-gradient-to-tr from-ag-green/20 to-tech-blue/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative w-full max-w-[300px] aspect-[4/5] bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
                <img src="/images/profile.png" alt="Saklain Niam" className="w-full h-full object-cover rounded-xl" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 flex items-center justify-center rotate-12 group-hover:rotate-0 transition-transform">
                <div className="text-center">
                  <div className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase mb-1">Status</div>
                  <div className="text-sm font-black text-ag-green">GRADUATE</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* The Ag-Intelligence Stack */}
        <section className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Research Framework</h2>
            <div className="h-px bg-slate-200 dark:bg-slate-800 flex-grow"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Visual connector lines for desktop */}
            <div className="hidden md:block absolute top-1/2 left-1/3 right-1/3 h-[2px] bg-gradient-to-r from-ag-green/20 via-tech-blue/20 to-slate-200 dark:to-slate-800 -z-10"></div>
            
            {categories.map((cat, idx) => (
              <div key={cat.title} className="relative">
                <div className="mb-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm flex items-center justify-center">
                    {cat.icon}
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white uppercase tracking-tighter">{cat.title}</h3>
                </div>
                <ul className="space-y-3">
                  {cat.items.map(item => (
                    <li key={item} className="flex items-center gap-3 text-slate-600 dark:text-slate-400 group hover:text-slate-900 dark:hover:text-white transition-colors">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 group-hover:bg-ag-green transition-colors"></div>
                      <span className="text-sm font-medium tracking-tight">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Case Study */}
        <section className="mb-32">
           <div className="flex items-center justify-between gap-4 mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Featured Research</h2>
            <Link to="/publications" className="text-sm font-bold text-ag-green hover:underline">Full Portfolio</Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Link to="/projects/cauliflower-reid-drone" className="group cyber-card rounded-2xl overflow-hidden flex flex-col">
              <div className="aspect-video bg-slate-100 dark:bg-slate-800 overflow-hidden relative">
                <img src="/images/cauliflower.jpg" alt="Drone Mapping" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 left-4 px-3 py-1 bg-ag-green text-white text-[10px] font-black uppercase tracking-widest rounded-full">Primary Study</div>
              </div>
              <div className="p-8">
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-ag-green transition-colors leading-snug">
                  Cabbage Re-ID Across GPS-Free Drone Passes
                </h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                  Developed a SeqSLAM-inspired pipeline for plant-level tracking across asynchronous UAV fly-overs.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-500 dark:text-slate-400 rounded uppercase">Visual Odometry</span>
                  <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-500 dark:text-slate-400 rounded uppercase">YOLOv9-seg</span>
                </div>
              </div>
            </Link>

            <div className="flex flex-col gap-6">
              <div 
                onClick={() => navigate('/publications/strawberry-edible-coatings')}
                className="cyber-card p-6 rounded-2xl border-l-4 border-l-ag-green cursor-pointer group"
              >
                <div className="text-xs font-black text-ag-green uppercase tracking-widest mb-2">LWT Food Science • 2025</div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-ag-green transition-colors">Bio-based Edible Coating</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-2 italic">"Optimizing bio-coatings for strawberry shelf life using predictive regression models."</p>
                <a 
                  href="https://doi.org/10.1016/J.LWT.2025.118548" 
                  target="_blank" 
                  rel="noreferrer" 
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1 text-xs font-bold text-slate-900 dark:text-white hover:underline"
                >
                  <ExternalLink size={14} /> View Publication
                </a>
              </div>

              <div 
                onClick={() => navigate('/publications/germination-uplift-plasma')}
                className="cyber-card p-6 rounded-2xl border-l-4 border-l-tech-blue cursor-pointer group"
              >
                <div className="text-xs font-black text-tech-blue uppercase tracking-widest mb-2">Seed Technology • 2025</div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-tech-blue transition-colors">Plasma Parameter Prediction</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-2 italic">"Extra Trees models achieving R² = 0.92 for germination uplift forecasting."</p>
                <a 
                  href="https://arxiv.org/abs/2510.23657v1" 
                  target="_blank" 
                  rel="noreferrer" 
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1 text-xs font-bold text-slate-900 dark:text-white hover:underline"
                >
                  <ExternalLink size={14} /> arXiv Preprint
                </a>
              </div>

              <div className="bg-slate-900 dark:bg-ag-deep p-8 rounded-2xl text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000"></div>
                <h4 className="text-lg font-bold mb-2">Technical Projects</h4>
                <p className="text-slate-400 dark:text-slate-300 text-sm mb-6">Explore the full archive of computer vision and robotics implementations.</p>
                <Link to="/projects" className="inline-flex items-center gap-2 text-ag-green dark:text-ag-green font-bold text-sm">
                  View All Projects <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Home;