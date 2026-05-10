import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, GraduationCap } from 'lucide-react';
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
              <h1 className="font-serif text-5xl md:text-6xl font-bold text-slate-900 leading-tight mb-6">
                Saklain Niam
              </h1>
              <p className="text-xl text-slate-600 font-light leading-relaxed max-w-2xl">
                Working at the intersection of Computer Vision, Robotics, and Precision Agriculture — building drone-based crop mapping systems and applying machine learning to food engineering challenges.
              </p>

              <div className="mt-8 flex gap-4">
                <Link to="/cv" className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded hover:bg-slate-800 transition-colors text-sm font-medium">
                  View Full CV
                </Link>
                <a href="mailto:saklain35@student.sust.edu" className="inline-flex items-center gap-2 px-6 py-3 border border-slate-200 text-slate-700 rounded hover:border-slate-300 hover:bg-slate-50 transition-colors text-sm font-medium">
                  Contact Me
                </a>
              </div>

              <div className="mt-5 flex items-center gap-5">
                <a href="https://www.linkedin.com/in/saklain-niam-4a5a50b0/" target="_blank" rel="noreferrer" title="LinkedIn" className="flex items-center gap-1.5 text-[#0077B5] hover:opacity-80 transition-opacity text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  <span className="font-medium">LinkedIn</span>
                </a>
                <a href="https://scholar.google.com/citations?user=2zChObIAAAAJ&hl=en&oi=ao" target="_blank" rel="noreferrer" title="Google Scholar" className="flex items-center gap-1.5 text-[#4285F4] hover:opacity-80 transition-opacity text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5h3.6v1.4c0 .5.4.9 1 .9h.8v8.8c-.5.3-.8.8-.8 1.4 0 .9.7 1.6 1.6 1.6h11.6c.9 0 1.6-.7 1.6-1.6 0-.6-.3-1.1-.8-1.4v-8.8h.8c.5 0 1-.4 1-.9V9.5H24L12 0z"/></svg>
                  <span className="font-medium">Scholar</span>
                </a>
                <a href="https://www.instagram.com/saqlineniam/" target="_blank" rel="noreferrer" title="Instagram" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity text-sm" style={{color: '#E1306C'}}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
                  <span className="font-medium">Instagram</span>
                </a>
              </div>
            </motion.div>
          </div>

          <div className="md:col-span-4 flex justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full max-w-[280px] aspect-[3/4] bg-slate-100 rounded-lg border border-slate-200 relative overflow-hidden flex items-center justify-center shadow-sm"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-100 to-slate-50"></div>
              <img src="/images/profile.jpg" alt="Saklain Niam" className="relative z-10 w-full h-full object-cover object-top" />
              <div className="absolute bottom-0 left-0 w-full h-1 bg-uga-red"></div>
            </motion.div>
          </div>
        </section>

        <div className="space-y-16">

          {/* Education */}
          <section>
            <h3 className="font-serif text-2xl font-bold text-slate-900 mb-6 border-b border-slate-200 pb-2">
              Education
            </h3>
            <div className="flex flex-col md:flex-row md:items-start gap-4">
              <div className="md:w-1/5 shrink-0 text-slate-500 font-medium text-sm pt-1">
                2019 – 2024
              </div>
              <div className="md:w-4/5">
                <h4 className="text-lg font-bold text-slate-900">Shahjalal University of Science and Technology (SUST)</h4>
                <p className="text-uga-red font-medium mb-2">BSc, Food Engineering and Tea Technology</p>
                <ul className="list-disc list-outside ml-5 text-slate-600 space-y-1 text-sm leading-relaxed">
                  <li>CGPA: 3.46 / 4.00</li>
                  <li><strong>Thesis:</strong> Impact of alginate, guar gum, and pectin-based edible coatings on strawberry shelf life.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Skills */}
          <section>
            <h3 className="font-serif text-2xl font-bold text-slate-900 mb-6 border-b border-slate-200 pb-2">
              Skills
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-slate-200 rounded-xl p-5">
                <h4 className="font-bold text-slate-900 mb-3 text-sm uppercase tracking-wider">Computer Vision & ML</h4>
                <ul className="list-disc list-outside ml-4 space-y-1.5 text-sm text-slate-600">
                  <li>Python, OpenCV</li>
                  <li>YOLO, Vision Transformers</li>
                  <li>Transfer Learning, Neural Networks</li>
                  <li>Reinforcement Learning (DQN)</li>
                  <li>Instance Segmentation, Object Tracking</li>
                </ul>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-5">
                <h4 className="font-bold text-slate-900 mb-3 text-sm uppercase tracking-wider">Robotics & Precision Ag</h4>
                <ul className="list-disc list-outside ml-4 space-y-1.5 text-sm text-slate-600">
                  <li>UAV / Drone Systems</li>
                  <li>Ground Robot Phenotyping</li>
                  <li>Geospatial Analysis (pyKrige, PCMCI)</li>
                  <li>Remote Sensing</li>
                  <li>Hyperspectral Imaging</li>
                </ul>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-5">
                <h4 className="font-bold text-slate-900 mb-3 text-sm uppercase tracking-wider">Lab & Analysis</h4>
                <ul className="list-disc list-outside ml-4 space-y-1.5 text-sm text-slate-600">
                  <li>GC, HPLC, E-Nose, Spectrophotoscopy</li>
                  <li>Non-thermal Processing</li>
                  <li>PCA, LDA, Variance Tests</li>
                  <li>Statistica, Minitab, OriginPro</li>
                  <li>LaTeX, MLflow</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 border-l-4 border-uga-red bg-slate-50 rounded-r-xl px-6 py-5 flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex items-center gap-2 shrink-0">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-uga-red opacity-60"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-uga-red"></span>
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-uga-red">Currently Learning</span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Actively learning <span className="font-semibold text-slate-800">ROS2</span> and <span className="font-semibold text-slate-800">SLAM</span>. Goal: close the gap between vision-based crop mapping and robots that can act on that information autonomously.
              </p>
            </div>
          </section>

          {/* Featured Research */}
          <section>
            <h3 className="font-serif text-2xl font-bold text-slate-900 mb-6 border-b border-slate-200 pb-2 flex items-center justify-between">
              Featured Research
              <Link to="/publications" className="text-sm font-sans font-medium text-uga-red hover:underline flex items-center gap-1">
                View All <ArrowRight size={14} />
              </Link>
            </h3>

            <div className="space-y-6">
              <Link to="/projects/cauliflower-reid-drone" className="group block border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow bg-white relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-uga-red opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <p className="text-xs font-bold tracking-wider text-slate-400 uppercase mb-2">Computer Vision & Robotics • Ongoing</p>
                <h4 className="font-serif text-lg font-bold text-slate-900 mb-2 group-hover:text-uga-red transition-colors">
                  Cabbage Plant Re-Identification Across GPS-Free Drone Loop Passes
                </h4>
                <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                  A SeqSLAM-inspired pipeline using YOLOv9c-seg, BoTSORT, and phase correlation visual odometry to re-identify 372 plants across dual drone passes with no GPS — achieving 83% RE-ID rate.
                </p>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-uga-red">
                  View project details <ArrowRight size={12} />
                </span>
              </Link>

              <div className="group border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow bg-white relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-uga-red opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <p className="text-xs font-bold tracking-wider text-slate-400 uppercase mb-2">LWT - Food Science and Technology • 2025</p>
                <h4 className="font-serif text-lg font-bold text-slate-900 mb-2 group-hover:text-uga-red transition-colors">
                  Machine learning-based optimization of alginate, guar gum, and pectin-based edible coatings for extended strawberry shelf life.
                </h4>
                <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                  First-author publication demonstrating the application of ML models to optimize bio-coatings, extending post-harvest quality preservation.
                </p>
                <a href="https://doi.org/10.1016/J.LWT.2025.118548" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded transition-colors">
                  <ExternalLink size={12} /> DOI Link
                </a>
              </div>

              <div className="bg-slate-50 border border-slate-100 rounded-lg p-6">
                <h4 className="font-serif text-lg font-bold text-slate-800 mb-2">
                  Ongoing Technical Research
                </h4>
                <p className="text-sm text-slate-600">
                  I am actively developing drone-based agricultural mapping pipelines, including real-time UAV plant counting, instance segmentation using YOLO architectures, and ground robot-based phenotyping systems.
                </p>
                <Link to="/projects" className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-uga-red hover:underline">
                  Explore Technical Projects <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default Home;