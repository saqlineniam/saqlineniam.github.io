import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Code, Video, CheckCircle, XCircle, TrendingUp, Lightbulb, X, ZoomIn, Info, BarChart3, Binary, Activity, Globe, Box, Layout, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/projects';

const statusConfig = {
  failed:      { icon: XCircle,     color: 'text-red-500',    bg: 'bg-red-50 dark:bg-red-950/30',    border: 'border-red-200 dark:border-red-900/50'   },
  breakthrough:{ icon: TrendingUp,  color: 'text-tech-blue',   bg: 'bg-tech-blue/5 dark:bg-tech-blue/10',   border: 'border-tech-blue/20 dark:border-tech-blue/30'  },
  improved:    { icon: CheckCircle, color: 'text-ag-green',  bg: 'bg-ag-green/5 dark:bg-ag-green/10',  border: 'border-ag-green/20 dark:border-ag-green/30' },
  current:     { icon: CheckCircle, color: 'text-slate-900 dark:text-white', bg: 'bg-slate-50 dark:bg-slate-800', border: 'border-slate-200 dark:border-slate-700'},
};

const Lightbox = ({ img, onClose }) => {
  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {img && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-slate-950/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative max-w-5xl w-full"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors flex items-center gap-2 text-xs font-black uppercase tracking-widest"
            >
              <X size={18} /> Close Escape
            </button>
            <img
              src={img.src}
              alt={img.alt}
              className="w-full rounded-2xl object-contain max-h-[80vh] shadow-2xl border border-white/10"
            />
            {img.caption && (
              <p className="text-white/60 text-[10px] font-medium text-center mt-6 leading-relaxed max-w-2xl mx-auto uppercase tracking-wider">
                {img.caption}
              </p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const MetricBar = ({ value, max = 100, highlight }) => {
  const getProgressColor = (val) => {
    if (val >= 95) return 'bg-ag-green shadow-[0_0_8px_rgba(16,185,129,0.4)]';
    if (val >= 90) return 'bg-tech-blue shadow-[0_0_8px_rgba(14,165,233,0.3)]';
    if (val >= 80) return 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.3)]';
    return 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.3)]';
  };

  const getTextColor = (val) => {
    if (val >= 95) return 'text-ag-green';
    if (val >= 90) return 'text-tech-blue';
    if (val >= 80) return 'text-amber-600';
    return 'text-red-600';
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ${getProgressColor(value)}`}
          style={{ width: `${(value / max) * 100}%` }}
        />
      </div>
      <span className={`text-[10px] font-black w-10 text-right ${getTextColor(value)}`}>
        {value}%
      </span>
    </div>
  );
};

const ModelComparison = ({ data }) => (
  <section className="mb-20">
    <div className="flex items-center gap-3 mb-8">
       <BarChart3 size={20} className="text-ag-green" />
       <h2 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">Model Benchmarking</h2>
    </div>
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl">
      <div className="p-6 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest leading-relaxed">
          <span className="text-ag-green">Comparative Analysis:</span> {data.note}
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Architecture</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Analysis</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest text-right">Precision</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest text-right">Recall</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest min-w-[160px]">mAP @ .50</th>
            </tr>
          </thead>
          <tbody>
            {data.models.map((model, i) => {
              const rows = [['Box Detection', model.box], model.mask ? ['Instance Mask', model.mask] : null].filter(Boolean);
              return rows.map(([mode, metrics], j) => (
                <tr
                  key={`${i}-${j}`}
                  className={`border-b border-slate-100 dark:border-slate-800 transition-colors group ${model.chosen ? 'bg-ag-green/[0.03] dark:bg-ag-green/5' : 'hover:bg-slate-50/50 dark:hover:bg-slate-800/50'}`}
                >
                  {j === 0 && (
                    <td rowSpan={rows.length} className="px-8 py-6 align-middle border-r border-slate-100 dark:border-slate-800">
                      <div className="flex flex-col gap-1">
                        <span className={`text-sm font-black uppercase tracking-tight ${model.chosen ? 'text-ag-green' : 'text-slate-900 dark:text-white'}`}>{model.name}</span>
                        {model.chosen && <span className="text-[7px] w-fit bg-ag-green text-slate-950 px-2 py-0.5 rounded-full font-black uppercase tracking-widest shadow-[0_0_10px_rgba(16,185,129,0.3)]">Primary Model</span>}
                      </div>
                    </td>
                  )}
                  <td className="px-8 py-6 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{mode}</td>
                  <td className="px-8 py-6 text-right text-xs font-mono text-slate-600 dark:text-slate-400 font-bold">{metrics.precision}%</td>
                  <td className="px-8 py-6 text-right text-xs font-mono text-slate-600 dark:text-slate-400 font-bold">{metrics.recall}%</td>
                  <td className="px-8 py-6"><MetricBar value={metrics.map50} highlight={model.chosen} /></td>
                </tr>
              ));
            })}
          </tbody>
        </table>
      </div>
    </div>
  </section>
);

const ImplementationDetails = ({ d, onImageClick }) => {
  const wideImages = d.images ? d.images.filter(img => img.wide) : [];
  const gridImages = d.images ? d.images.filter(img => !img.wide) : [];

  return (
    <>
      {/* Pipeline */}
      {d.pipeline && (
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-10">
             <Binary size={20} className="text-tech-blue" />
             <h2 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">Execution Pipeline</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {d.pipeline.map((s, i) => (
              <div key={i} className="flex gap-4 cyber-card p-6 rounded-2xl bg-white dark:bg-slate-900">
                <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-slate-900 dark:bg-ag-green text-white dark:text-slate-900 text-[10px] font-black flex items-center justify-center">
                  0{s.step}
                </span>
                <div>
                  <p className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest mb-2">{s.label}</p>
                  <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Model Comparison */}
      {d.modelComparison && <ModelComparison data={d.modelComparison} />}

      {/* Iteration History */}
      {d.iterations && (
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-10">
             <Activity size={20} className="text-slate-900 dark:text-white" />
             <h2 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">Optimization Log</h2>
          </div>
          <div className="space-y-4">
            {d.iterations.map((it, i) => {
              const cfg = statusConfig[it.status] || statusConfig.improved;
              const Icon = cfg.icon;
              return (
                <div key={i} className={`cyber-card p-8 rounded-2xl border-l-4 ${cfg.border} bg-white dark:bg-slate-900 transition-all hover:translate-x-1`}>
                  <div className="flex items-start justify-between gap-6 mb-4">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${cfg.bg} ${cfg.color}`}>
                        <Icon size={16} />
                      </div>
                      <div>
                        <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-1">Version {it.version}</span>
                        <span className="font-bold text-slate-900 dark:text-white">{it.title}</span>
                      </div>
                    </div>
                    {it.metric && (
                      <div className="text-right">
                        <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-1">Result</span>
                        <span className={`text-xs font-black ${cfg.color}`}>{it.metric}</span>
                      </div>
                    )}
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed max-w-3xl">{it.desc}</p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Key Insights */}
      {d.insights && (
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
             <Lightbulb size={20} className="text-ag-green" />
             <h2 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">Critical Findings</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {d.insights.map((insight, i) => (
              <div key={i} className="flex gap-4 bg-slate-900 dark:bg-slate-950 p-6 rounded-2xl group overflow-hidden relative border border-slate-800 dark:border-slate-800">
                <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 rounded-full -mr-8 -mt-8"></div>
                <div className="w-1 h-full bg-ag-green absolute left-0 top-0"></div>
                <p className="text-slate-300 dark:text-slate-300 text-xs leading-relaxed relative z-10">{insight}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Results & Visuals */}
      {(d.results || (d.images && d.images.length > 0)) && (
        <section className="mb-24">
          <div className="flex items-center gap-3 mb-12">
             <ZoomIn size={20} className="text-slate-900 dark:text-white" />
             <h2 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">Visual Analytics</h2>
          </div>
          
          <div className="space-y-12">
            {/* Wide images (progression chart) */}
            {wideImages.map((img, i) => (
              <figure key={`wide-${i}`} className="relative">
                <div
                  className="group cursor-zoom-in rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2 shadow-xl"
                  onClick={() => onImageClick(img)}
                >
                  <img src={img.src} alt={img.alt} className="w-full rounded-2xl" />
                  <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/20 transition-all flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/90 shadow-2xl flex items-center justify-center scale-0 group-hover:scale-100 transition-transform">
                       <ZoomIn size={24} className="text-slate-900" />
                    </div>
                  </div>
                </div>
                {img.caption && (
                  <figcaption className="text-[10px] font-bold text-slate-400 dark:text-slate-500 text-center mt-6 uppercase tracking-[0.2em]">{img.caption}</figcaption>
                )}
              </figure>
            ))}

            {/* Stat Grid */}
            {d.results && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(d.results).map(([key, val]) => {
                  const labels = {
                    reidRate: 'Accuracy', reidCount: 'Matches',
                    medianMatchDist: 'Median Dist.', maxMatchDist: 'Max Dist.',
                    newP2Plants: 'Novel IDs', unmatchedP1: 'Missed P1',
                    processingSpeed: 'Latency',
                  };
                  return (
                    <div key={key} className="cyber-card p-6 rounded-2xl bg-white dark:bg-slate-900 text-center">
                      <div className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">{labels[key] || key}</div>
                      <div className="text-xl font-black text-slate-900 dark:text-white">{val}</div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Map Grid */}
            {gridImages.length > 0 && (
              <div className={`grid gap-8 ${gridImages.length > 1 ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
                {gridImages.map((img, i) => (
                  <figure key={`grid-${i}`}>
                    <div
                      className="relative group cursor-zoom-in rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-2 shadow-lg"
                      onClick={() => onImageClick(img)}
                    >
                      <img src={img.src} alt={img.alt} className="w-full rounded-2xl" />
                      <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/10 transition-all flex items-center justify-center">
                        <ZoomIn size={24} className="text-white opacity-0 group-hover:opacity-100" />
                      </div>
                    </div>
                    {img.caption && (
                      <figcaption className="text-[9px] font-black text-slate-400 dark:text-slate-500 text-center mt-4 uppercase tracking-widest leading-relaxed px-4">{img.caption}</figcaption>
                    )}
                  </figure>
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};

const ProjectDetail = () => {
  const { slug } = useParams();
  const [lightboxImg, setLightboxImg] = useState(null);
  const project = projects.find(p => p.slug === slug);

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto px-6 pt-32 pb-24 text-center">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-8 uppercase tracking-widest">Project Not Found</h1>
        <Link to="/projects" className="text-ag-green font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:underline">
          <ArrowLeft size={16} /> Return to Archives
        </Link>
      </div>
    );
  }

  const githubUrl = typeof project.github === 'string' ? project.github : "https://github.com/saqlineniam";

  return (
    <>
      <Lightbox img={lightboxImg} onClose={() => setLightboxImg(null)} />

      <div className="relative min-h-screen">
        <div className="absolute inset-0 bg-grid-pattern opacity-40 dark:opacity-20 pointer-events-none -z-10 h-[50vh]"></div>

        <div className="max-w-5xl mx-auto px-6 md:px-12 pt-16 pb-24">

          <Link to="/projects" className="inline-flex items-center gap-2 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest hover:text-ag-green mb-16 transition-colors group">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Research Archives
          </Link>

          {/* Header */}
          <header className="mb-20">
            <div className="flex items-center gap-2 text-ag-green font-black text-[10px] uppercase tracking-[0.3em] mb-6">
              <div className="w-8 h-px bg-ag-green"></div>
              {project.category}
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-8 leading-tight tracking-tight"
            >
              {project.title}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex flex-wrap gap-2 mb-12"
            >
              {project.tags.map(tag => (
                <span key={tag} className="text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded border bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-800">
                  {tag}
                </span>
              ))}
            </motion.div>

            <div className={`grid grid-cols-1 ${project.thumbnail ? 'md:grid-cols-12 md:gap-16' : ''} items-start`}>
              <div className="md:col-span-8">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl text-slate-500 dark:text-slate-400 font-light leading-relaxed italic border-l-4 border-slate-100 dark:border-slate-800 pl-8"
                >
                  {project.story}
                </motion.p>
                
                {project.github && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-10 flex flex-wrap gap-4">
                    <a href={githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 dark:bg-ag-green text-white dark:text-slate-900 rounded-xl text-sm font-bold hover:bg-slate-800 dark:hover:bg-ag-green/90 transition-all shadow-xl shadow-slate-200 dark:shadow-ag-green/10">
                      <Code size={18} /> Source Intelligence
                    </a>
                    {project.paperUrl && (
                      <Link 
                        to={project.slug === "seed-germination-mlflow" ? "/publications/germination-uplift-plasma" : project.paperUrl} 
                        target={project.slug === "seed-germination-mlflow" ? "_self" : "_blank"}
                        className="inline-flex items-center gap-3 px-8 py-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-xl"
                      >
                        <FileText size={18} /> Research Paper
                      </Link>
                    )}
                  </motion.div>
                )}
              </div>

              {project.thumbnail && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.25 }}
                  className="md:col-span-4 mt-12 md:mt-0"
                >
                  <div className="bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-2xl rotate-2">
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-full rounded-xl object-cover  hover:-0 transition-all duration-700"
                    />
                  </div>
                </motion.div>
              )}
            </div>
          </header>

          <div className="w-full h-px bg-slate-100 dark:bg-slate-800 mb-20"></div>

          {/* MLOps Live Demo Buttons */}
          {project.streamlitUrl && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-20 p-8 md:p-12 rounded-3xl bg-slate-900 text-white relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-ag-green/10 blur-[100px] rounded-full"></div>
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                <div className="max-w-xl text-center md:text-left">
                  <h3 className="text-2xl font-bold mb-4">Interactive MLOps Demo</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-0">
                    Interact with the trained models in real-time. Test how different plasma parameters affect germination uplift using the live predictor, or explore the full training history and metrics via the Docker environment.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                  <a 
                    href={project.streamlitUrl} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-ag-green text-slate-950 rounded-xl text-sm font-black hover:bg-ag-green/90 transition-all shadow-xl shadow-ag-green/20"
                  >
                    <Globe size={18} /> Launch Predictor
                  </a>
                  {project.dockerHubUrl && (
                    <a 
                      href={project.dockerHubUrl} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-white/20 text-white rounded-xl text-sm font-bold hover:bg-white/5 transition-all"
                    >
                      <Box size={18} /> Docker Hub
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Media Sections */}
          {project.youtubeId && (
            <section className="mb-20">
              <div className="flex items-center gap-3 mb-10">
                 <Video size={20} className="text-red-600" />
                 <h2 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">Deployment Footage</h2>
              </div>
              <div className="w-full aspect-video bg-slate-950 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xl relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-transparent z-10"></div>
                <iframe
                  width="100%" height="100%"
                  src={`https://www.youtube.com/embed/${project.youtubeId}`}
                  title={`${project.title} Demo`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </section>
          )}

          {/* Technical Deep Dive */}
          {project.implementationDetails ? (
            <ImplementationDetails d={project.implementationDetails} onImageClick={setLightboxImg} />
          ) : (
            <section className="mb-20">
              <div className="flex items-center gap-3 mb-10">
                 <Info size={20} className="text-slate-400 dark:text-slate-500" />
                 <h2 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">Technical Analysis</h2>
              </div>
              <div className="cyber-card p-12 rounded-3xl border-dashed border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <p className="text-slate-400 dark:text-slate-500 text-sm leading-relaxed text-center font-bold uppercase tracking-widest opacity-50">
                  Full research report currently in documentation phase.
                </p>
              </div>
            </section>
          )}

        </div>
      </div>
    </>
  );
};

export default ProjectDetail;
