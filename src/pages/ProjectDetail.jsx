import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Code, Video, CheckCircle, XCircle, TrendingUp, Lightbulb, X, ZoomIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/projects';

const statusConfig = {
  failed:      { icon: XCircle,     color: 'text-red-500',    bg: 'bg-red-50',    border: 'border-red-200'   },
  breakthrough:{ icon: TrendingUp,  color: 'text-blue-600',   bg: 'bg-blue-50',   border: 'border-blue-200'  },
  improved:    { icon: CheckCircle, color: 'text-green-600',  bg: 'bg-green-50',  border: 'border-green-200' },
  current:     { icon: CheckCircle, color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-200'},
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
          className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4"
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
              className="absolute -top-10 right-0 text-white/70 hover:text-white transition-colors flex items-center gap-1.5 text-sm"
            >
              <X size={18} /> Close
            </button>
            <img
              src={img.src}
              alt={img.alt}
              className="w-full rounded-xl object-contain max-h-[85vh] shadow-2xl"
            />
            {img.caption && (
              <p className="text-white/60 text-xs text-center mt-3 leading-relaxed px-4">
                {img.caption}
              </p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const MetricBar = ({ value, max = 100, highlight }) => (
  <div className="flex items-center gap-2">
    <div className="flex-1 bg-slate-100 rounded-full h-1.5 overflow-hidden">
      <div
        className={`h-full rounded-full ${highlight ? 'bg-uga-red' : 'bg-slate-400'}`}
        style={{ width: `${(value / max) * 100}%` }}
      />
    </div>
    <span className={`text-xs font-mono w-10 text-right ${highlight ? 'font-bold text-slate-900' : 'text-slate-500'}`}>
      {value}%
    </span>
  </div>
);

const ModelComparison = ({ data }) => (
  <section className="mb-14">
    <h2 className="font-serif text-2xl font-bold text-slate-900 mb-2">Model Selection</h2>
    <p className="text-sm text-slate-500 mb-6">{data.note}</p>
    <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200">
            <th className="text-left px-4 py-3 font-semibold text-slate-700 text-xs uppercase tracking-wide">Model</th>
            <th className="text-left px-4 py-3 font-semibold text-slate-700 text-xs uppercase tracking-wide">Mode</th>
            <th className="px-4 py-3 font-semibold text-slate-700 text-xs uppercase tracking-wide text-right">Precision</th>
            <th className="px-4 py-3 font-semibold text-slate-700 text-xs uppercase tracking-wide text-right">Recall</th>
            <th className="px-4 py-3 font-semibold text-slate-700 text-xs uppercase tracking-wide min-w-[140px]">MAP@50</th>
            <th className="px-4 py-3 font-semibold text-slate-700 text-xs uppercase tracking-wide min-w-[140px]">MAP@50-95</th>
          </tr>
        </thead>
        <tbody>
          {data.models.map((model, i) => {
            const rows = [['Box', model.box], model.mask ? ['Mask', model.mask] : null].filter(Boolean);
            return rows.map(([mode, metrics], j) => (
              <tr
                key={`${i}-${j}`}
                className={`border-b border-slate-100 ${model.chosen ? 'bg-red-50/40' : j === 0 && i % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'}`}
              >
                {j === 0 && (
                  <td rowSpan={rows.length} className={`px-4 py-3 font-semibold align-middle ${model.chosen ? 'text-uga-red' : 'text-slate-800'}`}>
                    {model.name}{model.chosen && <span className="ml-1.5 text-[10px] bg-uga-red text-white px-1.5 py-0.5 rounded font-bold uppercase tracking-wide">Selected</span>}
                  </td>
                )}
                <td className="px-4 py-3 text-slate-500 text-xs font-mono">{mode}</td>
                <td className="px-4 py-3 text-right text-slate-600">{metrics.precision}%</td>
                <td className="px-4 py-3 text-right text-slate-600">{metrics.recall}%</td>
                <td className="px-4 py-3"><MetricBar value={metrics.map50} highlight={model.chosen} /></td>
                <td className="px-4 py-3"><MetricBar value={metrics.map5095} max={85} highlight={model.chosen} /></td>
              </tr>
            ));
          })}
        </tbody>
      </table>
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
        <section className="mb-14">
          <h2 className="font-serif text-2xl font-bold text-slate-900 mb-6">Pipeline</h2>
          <div className="space-y-3">
            {d.pipeline.map((s, i) => (
              <div key={i} className="flex gap-4 bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-900 text-white text-sm font-bold flex items-center justify-center">
                  {s.step}
                </span>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">{s.label}</p>
                  <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
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
        <section className="mb-14">
          <h2 className="font-serif text-2xl font-bold text-slate-900 mb-6">What Worked (and What Didn't)</h2>
          <div className="space-y-4">
            {d.iterations.map((it, i) => {
              const cfg = statusConfig[it.status] || statusConfig.improved;
              const Icon = cfg.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className={`border rounded-xl p-6 ${cfg.bg} ${cfg.border}`}
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      <Icon size={18} className={cfg.color} />
                      <span className="font-mono text-xs font-bold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                        {it.version}
                      </span>
                      <span className="font-semibold text-slate-800">{it.title}</span>
                    </div>
                    {it.metric && (
                      <span className={`text-xs font-bold px-3 py-1 rounded-full border ${cfg.border} ${cfg.color} bg-white whitespace-nowrap`}>
                        {it.metric}
                      </span>
                    )}
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">{it.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </section>
      )}

      {/* Results */}
      {d.results && (
        <section className="mb-14">
          <h2 className="font-serif text-2xl font-bold text-slate-900 mb-6">Results</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(d.results).map(([key, val]) => {
              const labels = {
                reidRate: 'RE-ID Rate', reidCount: 'Plants Matched',
                medianMatchDist: 'Median Match Dist.', maxMatchDist: 'Max Match Dist.',
                newP2Plants: 'New P2 Plants', unmatchedP1: 'Unmatched P1',
                processingSpeed: 'Processing Speed',
              };
              return (
                <div key={key} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm text-center">
                  <p className="text-2xl font-bold text-slate-900 mb-1">{val}</p>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">{labels[key] || key}</p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Key Insights */}
      {d.insights && (
        <section className="mb-14">
          <h2 className="font-serif text-2xl font-bold text-slate-900 mb-6">Key Insights</h2>
          <div className="space-y-3">
            {d.insights.map((insight, i) => (
              <div key={i} className="flex gap-3 bg-amber-50 border border-amber-200 rounded-xl p-5">
                <Lightbulb size={18} className="text-amber-500 flex-shrink-0 mt-0.5" />
                <p className="text-slate-700 text-sm leading-relaxed">{insight}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Results & Plots */}
      {d.images && d.images.length > 0 && (
        <section className="mb-14">
          <h2 className="font-serif text-2xl font-bold text-slate-900 mb-6">Results & Plots</h2>
          <div className="space-y-6">
            {/* Wide images — full width */}
            {wideImages.map((img, i) => (
              <figure key={`wide-${i}`}>
                <div
                  className="relative group cursor-zoom-in rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-slate-50"
                  onClick={() => onImageClick(img)}
                >
                  <img src={img.src} alt={img.alt} className="w-full object-contain" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <ZoomIn size={28} className="text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow" />
                  </div>
                </div>
                {img.caption && (
                  <figcaption className="text-xs text-slate-500 text-center mt-2 leading-relaxed">{img.caption}</figcaption>
                )}
              </figure>
            ))}

            {/* Non-wide images — side by side for comparison */}
            {gridImages.length > 0 && (
              <div className={`grid gap-6 ${gridImages.length > 1 ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
                {gridImages.map((img, i) => (
                  <figure key={`grid-${i}`}>
                    <div
                      className="relative group cursor-zoom-in rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-slate-50"
                      onClick={() => onImageClick(img)}
                    >
                      <img src={img.src} alt={img.alt} className="w-full object-contain max-h-72" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <ZoomIn size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow" />
                      </div>
                    </div>
                    {img.caption && (
                      <figcaption className="text-xs text-slate-500 text-center mt-2 leading-relaxed">{img.caption}</figcaption>
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
        <h1 className="font-serif text-3xl font-bold text-slate-900 mb-4">Project Not Found</h1>
        <Link to="/projects" className="text-uga-red hover:underline inline-flex items-center gap-2">
          <ArrowLeft size={16} /> Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <>
      <Lightbox img={lightboxImg} onClose={() => setLightboxImg(null)} />

      <div className="relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none -z-10 h-[50vh]"></div>

        <div className="max-w-5xl mx-auto px-6 md:px-12 pt-16 pb-24">

          <Link to="/projects" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 mb-10 transition-colors">
            <ArrowLeft size={16} /> Back to Projects
          </Link>

          {/* Header */}
          <header className="mb-12">
            <div className="mb-6">
              <span className="text-xs font-bold tracking-wider text-slate-500 uppercase bg-slate-100 px-3 py-1.5 rounded">
                {project.category}
              </span>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight"
            >
              {project.title}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex flex-wrap gap-2 mb-8"
            >
              {project.tags.map(tag => (
                <span key={tag} className="text-xs font-medium px-3 py-1.5 rounded-md border bg-slate-50 text-slate-600 border-slate-200">
                  {tag}
                </span>
              ))}
            </motion.div>

            <div className={`flex flex-col ${project.thumbnail ? 'md:flex-row md:gap-10 md:items-start' : ''}`}>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-slate-600 leading-relaxed md:flex-1"
              >
                {project.story}
              </motion.p>

              {project.thumbnail && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.25 }}
                  className="mt-6 md:mt-0 md:w-64 md:shrink-0"
                >
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full rounded-xl border border-slate-200 shadow-sm object-cover"
                  />
                </motion.div>
              )}
            </div>

            {project.github && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-8">
                <a href="https://github.com/saqlineniam" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded font-medium hover:bg-slate-800 transition-colors">
                  <Code size={16} /> View Code on GitHub
                </a>
              </motion.div>
            )}
          </header>

          <div className="w-full h-px bg-slate-200 mb-16"></div>

          {/* YouTube embed — only for video projects without full implementation details */}
          {project.youtubeId && !project.implementationDetails && (
            <section className="mb-16">
              <h2 className="font-serif text-2xl font-bold text-slate-900 mb-6">Demo</h2>
              <div className="w-full aspect-video bg-black rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
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

          {/* YouTube embed for projects that have both video AND implementation details */}
          {project.youtubeId && project.implementationDetails && (
            <div className="mb-14">
              <div className="w-full aspect-video bg-black rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <iframe
                  width="100%" height="100%"
                  src={`https://www.youtube.com/embed/${project.youtubeId}`}
                  title={`${project.title} Demo`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}

          {/* No media section if only a thumbnail — thumbnail lives on the project card */}
          {!project.youtubeId && !project.implementationDetails && (
            <section className="mb-16">
              <div className="w-full aspect-video bg-slate-100 rounded-2xl border border-slate-200 flex flex-col items-center justify-center text-slate-400 group mb-6 overflow-hidden relative">
                <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
                <Video size={48} className="mb-4 opacity-50" />
                <p className="font-mono text-sm text-center px-4">{project.imageLabel || 'Media coming soon'}</p>
              </div>
            </section>
          )}

          {/* Implementation Details or placeholder */}
          {project.implementationDetails ? (
            <ImplementationDetails d={project.implementationDetails} onImageClick={setLightboxImg} />
          ) : (
            <section className="mb-16">
              <h2 className="font-serif text-2xl font-bold text-slate-900 mb-6">Implementation Details</h2>
              <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
                <p className="text-slate-500 leading-relaxed italic">
                  A deeper technical write-up — architecture, challenges, and results — will be added here soon.
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
