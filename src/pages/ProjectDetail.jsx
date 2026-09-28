import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  AppWindow, ArrowLeft, ArrowRight, CheckCircle2, XCircle, TrendingUp, Lightbulb, ZoomIn, Globe, Box, FileText, Workflow, BarChart3, History, Gauge, PlayCircle, BookOpen,
} from 'lucide-react';
import { GitHubIcon } from '../components/BrandIcons';
import Lightbox from '../components/Lightbox';
import Thumb from '../components/Thumb';
import NotFound from './NotFound';
import { projects } from '../data/projects';
import { publications } from '../data/publications';
import useTitle from '../lib/useTitle';

const statusStyle = {
  failed:       { icon: XCircle,      label: 'Failed',       dot: 'bg-red-500',     text: 'text-red-600 dark:text-red-400' },
  breakthrough: { icon: TrendingUp,   label: 'Breakthrough', dot: 'bg-sky-500',     text: 'text-sky-600 dark:text-sky-400' },
  improved:     { icon: CheckCircle2, label: 'Improved',     dot: 'bg-emerald-500', text: 'text-ag-deep dark:text-ag-green' },
  current:      { icon: CheckCircle2, label: 'Current',      dot: 'bg-zinc-900 dark:bg-white', text: 'text-zinc-900 dark:text-white' },
};

const resultLabels = {
  reidRate: 'Re-ID rate', reidCount: 'Matched plants', medianMatchDist: 'Median match distance', maxMatchDist: 'Max match distance',
  newP2Plants: 'New in pass 2', unmatchedP1: 'Unmatched pass 1', processingSpeed: 'Processing speed',
  bestModel: 'Best model', bestR2: 'Best R²', rmse: 'RMSE', mae: 'MAE', infrastructure: 'Infrastructure',
  mAP50: 'mAP@50', mAP5095: 'mAP@50–95', uniqueCount: 'Unique plants', latency: 'Latency', fps: 'FPS', motionEst: 'Motion estimation',
  heldOutGain: 'Score vs best rule, unseen ~30-acre fields (576 missions)', flightDates: 'Flight dates where the RL beats the best rule',
  dateTypeWins: 'Date × field-type cases won', wholeFieldGain: 'Score vs best rule, whole real fields',
  smallFields: 'Small held-out fields vs best rule', safety: 'Stranded, illegal or unsampled in 1,300+ missions',
};
const labelFor = (k) => resultLabels[k] || k.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase());

const Section = ({ id, icon: Icon, title, children }) => (
  <section id={id} className="mb-16 scroll-mt-28">
    <h2 className="flex items-center gap-3 text-2xl md:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white mb-6">
      <span className="w-9 h-9 shrink-0 rounded-xl grid place-items-center bg-emerald-500/10 ring-1 ring-emerald-500/20">
        <Icon size={17} className="text-emerald-700 dark:text-emerald-400" />
      </span>
      {title}
    </h2>
    {children}
  </section>
);

const fmt = (v) => (typeof v === 'number' ? v.toFixed(1) : v);
const bestCls = (on) => (on ? 'font-bold text-zinc-900 dark:text-white' : '');

// Neutral bars; the selected model is green and the best value per column (within a task) is bold.
const MetricBar = ({ value, chosen, best }) => (
  <div className="flex items-center gap-2 min-w-[120px]">
    <div className="flex-1 h-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
      <div className={`h-full rounded-full ${chosen ? 'bg-ag-green' : 'bg-zinc-300 dark:bg-zinc-600'}`} style={{ width: `${value}%` }} />
    </div>
    <span className={`text-xs font-mono tabular-nums w-10 text-right ${bestCls(best)}`}>{fmt(value)}</span>
  </div>
);

const ModelTable = ({ data }) => {
  const best = {};
  data.models.forEach((m) =>
    [['Box', m.box], ['Mask', m.mask]].forEach(([task, r]) => {
      if (!r) return;
      ['precision', 'recall', 'map50', 'map5095'].forEach((k) => { best[task + k] = Math.max(best[task + k] ?? 0, r[k]); });
    })
  );
  const isBest = (task, k, v) => v === best[task + k];

  return (
    <>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">{data.note}</p>
      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-800 text-left text-xs font-semibold text-zinc-500 dark:text-zinc-400">
              <th className="px-4 py-3">Model</th>
              <th className="px-4 py-3">Task</th>
              <th className="px-4 py-3 text-right">Precision</th>
              <th className="px-4 py-3 text-right">Recall</th>
              <th className="px-4 py-3">mAP@50</th>
              <th className="px-4 py-3">mAP@50–95</th>
            </tr>
          </thead>
          <tbody>
            {data.models.map((m) => {
              const rows = [['Box', m.box], m.mask && ['Mask', m.mask]].filter(Boolean);
              return rows.map(([task, r], j) => (
                <tr key={m.name + task} className={`border-b last:border-0 border-zinc-100 dark:border-zinc-800 ${m.chosen ? 'bg-emerald-50/60 dark:bg-emerald-950/20' : ''}`}>
                  {j === 0 && (
                    <td rowSpan={rows.length} className="px-4 py-3 align-top font-semibold text-zinc-900 dark:text-white whitespace-nowrap">
                      {m.name}
                      {m.chosen && <span className="block mt-1 w-fit text-[11px] font-semibold px-2 py-0.5 rounded-full bg-ag-green text-zinc-950">Selected</span>}
                    </td>
                  )}
                  <td className="px-4 py-3 text-zinc-500">{task}</td>
                  <td className={`px-4 py-3 text-right font-mono tabular-nums ${bestCls(isBest(task, 'precision', r.precision))}`}>{fmt(r.precision)}</td>
                  <td className={`px-4 py-3 text-right font-mono tabular-nums ${bestCls(isBest(task, 'recall', r.recall))}`}>{fmt(r.recall)}</td>
                  <td className="px-4 py-3"><MetricBar value={r.map50} chosen={m.chosen} best={isBest(task, 'map50', r.map50)} /></td>
                  <td className="px-4 py-3"><MetricBar value={r.map5095} chosen={m.chosen} best={isBest(task, 'map5095', r.map5095)} /></td>
                </tr>
              ));
            })}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">All values in %. Bold marks the best score in each column for that task (box or mask).</p>
    </>
  );
};

// Generic comparison table from implementationDetails.tables: { title, note, columns, rows, highlight }.
const DataTable = ({ t }) => (
  <>
    {t.note && <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">{t.note}</p>}
    <div className="card overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-zinc-200 dark:border-zinc-800 text-left text-xs font-semibold text-zinc-500 dark:text-zinc-400">
            {t.columns.map((c, i) => (
              <th key={c} className={`px-4 py-3 whitespace-nowrap ${i ? 'text-right' : ''}`}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {t.rows.map((row) => {
            const hl = row[0] === t.highlight;
            return (
              <tr key={row[0]} className={`border-b last:border-0 border-zinc-100 dark:border-zinc-800 ${hl ? 'bg-emerald-50/60 dark:bg-emerald-950/20' : ''}`}>
                {row.map((cell, i) => (
                  <td
                    key={i}
                    className={`px-4 py-3 ${i ? 'text-right font-mono tabular-nums whitespace-nowrap' : ''} ${
                      hl ? 'font-semibold text-emerald-800 dark:text-emerald-300' : i ? 'text-zinc-700 dark:text-zinc-300' : 'text-zinc-900 dark:text-white'
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </>
);

const Figure = ({ img, onOpen }) => (
  <figure>
    <button onClick={() => onOpen(img)} className="group relative block w-full card overflow-hidden p-2 cursor-zoom-in" aria-label={`Enlarge: ${img.alt}`}>
      <img src={img.src} alt={img.alt} loading="lazy" className="w-full rounded-lg" />
      <span className="absolute top-4 right-4 p-2 rounded-full bg-white/90 dark:bg-zinc-900/90 opacity-0 group-hover:opacity-100 transition-opacity">
        <ZoomIn size={16} />
      </span>
    </button>
    {img.caption && <figcaption className="text-sm text-zinc-500 dark:text-zinc-400 mt-3 leading-relaxed">{img.caption}</figcaption>}
  </figure>
);

const ProjectDetail = () => {
  const { slug } = useParams();
  const [lightboxImg, setLightboxImg] = useState(null);
  const index = projects.findIndex((p) => p.slug === slug);
  const project = projects[index];
  useTitle(project ? project.title : 'Not found');

  if (!project) return <NotFound what="project" />;

  const d = project.implementationDetails || {};
  const pub = project.publication && publications.find((p) => p.slug === project.publication);
  const repo = typeof project.github === 'string' ? project.github : null;
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const wideImages = (d.images || []).filter((i) => i.wide);
  const gridImages = (d.images || []).filter((i) => !i.wide);

  const toc = [
    d.overview && ['overview', 'Overview'],
    project.youtubeId && ['video', 'Demo video'],
    d.pipeline && ['pipeline', 'Pipeline'],
    d.modelComparison && ['models', 'Model benchmark'],
    ...(d.tables || []).map((t, i) => [`table-${i}`, t.title]),
    d.iterations && ['iterations', 'Iteration log'],
    d.insights && ['insights', 'Key insights'],
    (d.results || d.images) && ['results', 'Results'],
  ].filter(Boolean);

  return (
    <>
      <Lightbox img={lightboxImg} onClose={() => setLightboxImg(null)} />

      <div className="max-w-6xl mx-auto px-4 sm:px-5 md:px-8 pt-6 md:pt-10">
        <nav className="text-sm text-zinc-500 dark:text-zinc-400 mb-8" aria-label="Breadcrumb">
          <Link to="/projects" className="inline-flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-white">
            <ArrowLeft size={14} /> Projects
          </Link>
          <span className="mx-2">/</span>
          <Link to={`/projects?category=${encodeURIComponent(project.category)}`} className="hover:text-zinc-900 dark:hover:text-white">{project.category}</Link>
        </nav>

        {/* Header */}
        <header className="grid md:grid-cols-12 gap-8 md:gap-12 mb-14">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="md:col-span-7">
            <h1 className="text-4xl md:text-[3.4rem] font-semibold tracking-tighter text-zinc-900 dark:text-white leading-[1.04] mb-6">{project.title}</h1>
            {project.highlight && (
              <p className="flex items-baseline gap-3 mb-6">
                <span className="text-4xl font-semibold tracking-tighter text-emerald-700 dark:text-emerald-400">{project.highlight.value}</span>
                <span className="font-mono text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400">{project.highlight.label}</span>
              </p>
            )}
            <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed mb-8">{project.story}</p>

            <div className="flex flex-wrap gap-3 mb-8">
              {project.webApp && (
                <a href={project.webApp} target="_blank" rel="noreferrer" className="btn btn-accent">
                  <AppWindow size={16} /> Open the web app
                </a>
              )}
              {repo && (
                <a href={repo} target="_blank" rel="noreferrer" className="btn btn-primary">
                  <GitHubIcon size={16} /> Source code
                </a>
              )}
              {project.streamlitUrl && (
                <a href={project.streamlitUrl} target="_blank" rel="noreferrer" className="btn btn-accent">
                  <Globe size={16} /> Live demo
                </a>
              )}
              {project.dockerHubUrl && (
                <a href={project.dockerHubUrl} target="_blank" rel="noreferrer" className="btn btn-ghost">
                  <Box size={16} /> Docker image
                </a>
              )}
              {pub && (
                <Link to={`/publications/${pub.slug}`} className="btn btn-ghost">
                  <FileText size={16} /> Paper ({pub.year})
                </Link>
              )}
            </div>

            <ul className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <li key={tag}>
                  <Link to={`/projects?tag=${encodeURIComponent(tag)}`} className="chip">
                    {tag}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="md:col-span-5">
            <Thumb src={project.thumbnail} alt={project.title} category={project.category} label={project.imageLabel} className="aspect-[4/3] rounded-3xl border border-zinc-200 dark:border-white/10 shadow-xl shadow-zinc-900/5" />
          </motion.div>
        </header>

        <div className="grid lg:grid-cols-12 gap-10">
          {/* Table of contents */}
          {toc.length > 1 && (
            <aside className="hidden lg:block lg:col-span-3">
              <nav className="sticky top-28" aria-label="On this page">
                <p className="eyebrow mb-4">On this page</p>
                <ul className="space-y-1 border-l border-zinc-200 dark:border-zinc-800">
                  {toc.map(([id, label]) => (
                    <li key={id}>
                      <a href={`#${id}`} className="block -ml-px pl-4 py-1 text-sm text-zinc-600 dark:text-zinc-400 border-l border-transparent hover:border-emerald-500 hover:text-zinc-900 dark:hover:text-white">
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>
          )}

          <div className={toc.length > 1 ? 'lg:col-span-9 min-w-0' : 'lg:col-span-12 max-w-3xl'}>
            {d.overview && (
              <Section id="overview" icon={BookOpen} title="Overview">
                <p className="text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">{d.overview}</p>
              </Section>
            )}

            {project.youtubeId && (
              <Section id="video" icon={PlayCircle} title="Demo video">
                <div className="aspect-video rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-black">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube-nocookie.com/embed/${project.youtubeId}`}
                    title={`${project.title} demo`}
                    loading="lazy"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </Section>
            )}

            {d.pipeline && (
              <Section id="pipeline" icon={Workflow} title="Pipeline">
                <ol className="relative border-l-2 border-zinc-200 dark:border-zinc-800 ml-3 space-y-6">
                  {d.pipeline.map((s) => (
                    <li key={s.step} className="pl-8 relative">
                      <span className="absolute -left-[15px] top-0 w-7 h-7 rounded-full bg-white dark:bg-zinc-950 border-2 border-ag-green text-xs font-bold flex items-center justify-center text-ag-deep dark:text-ag-green">
                        {s.step}
                      </span>
                      <h3 className="font-semibold text-zinc-900 dark:text-white mb-1">{s.label}</h3>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{s.desc}</p>
                    </li>
                  ))}
                </ol>
              </Section>
            )}

            {d.modelComparison && (
              <Section id="models" icon={BarChart3} title="Model benchmark">
                <ModelTable data={d.modelComparison} />
              </Section>
            )}

            {(d.tables || []).map((t, i) => (
              <Section key={t.title} id={`table-${i}`} icon={BarChart3} title={t.title}>
                <DataTable t={t} />
              </Section>
            ))}

            {d.iterations && (
              <Section id="iterations" icon={History} title="Iteration log">
                <div className="space-y-4">
                  {d.iterations.map((it) => {
                    const s = statusStyle[it.status] || statusStyle.improved;
                    return (
                      <div key={it.version} className="card p-5">
                        <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                          <div>
                            <span className="text-xs font-mono text-zinc-500">{it.version}</span>
                            <h3 className="font-semibold text-zinc-900 dark:text-white">{it.title}</h3>
                          </div>
                          <div className="text-right">
                            <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${s.text}`}>
                              <span className={`w-2 h-2 rounded-full ${s.dot}`} /> {s.label}
                            </span>
                            {it.metric && <p className="text-sm font-semibold text-zinc-900 dark:text-white mt-0.5">{it.metric}</p>}
                          </div>
                        </div>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{it.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </Section>
            )}

            {d.insights && (
              <Section id="insights" icon={Lightbulb} title="Key insights">
                <ul className="grid md:grid-cols-2 gap-4">
                  {d.insights.map((text, i) => (
                    <li key={i} className="p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/25 border border-emerald-100 dark:border-emerald-900/40 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                      {text}
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            {(d.results || d.images) && (
              <Section id="results" icon={Gauge} title="Results">
                {d.results && (
                  <dl className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
                    {Object.entries(d.results).map(([k, v]) => (
                      <div key={k} className="card p-4">
                        <dt className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">{labelFor(k)}</dt>
                        <dd className="text-lg font-bold text-zinc-900 dark:text-white leading-tight">{v}</dd>
                      </div>
                    ))}
                  </dl>
                )}
                <div className="space-y-8">
                  {wideImages.map((img) => <Figure key={img.src} img={img} onOpen={setLightboxImg} />)}
                  {gridImages.length > 0 && (
                    <div className="grid sm:grid-cols-2 gap-6">
                      {gridImages.map((img) => <Figure key={img.src} img={img} onOpen={setLightboxImg} />)}
                    </div>
                  )}
                </div>
              </Section>
            )}

            {!project.implementationDetails && !project.youtubeId && (
              <div className="card p-8 text-center text-zinc-500 dark:text-zinc-400 mb-16">
                A detailed write-up for this project is coming soon.
              </div>
            )}
          </div>
        </div>

        {/* Prev / next */}
        <nav className="grid sm:grid-cols-2 gap-4 pt-10 border-t border-zinc-200 dark:border-zinc-800" aria-label="More projects">
          <Link to={`/projects/${prev.slug}`} className="group card card-hover p-5">
            <span className="text-xs text-zinc-500 flex items-center gap-1"><ArrowLeft size={13} /> Previous</span>
            <span className="block mt-1 font-semibold text-zinc-900 dark:text-white group-hover:text-ag-deep dark:group-hover:text-ag-green line-clamp-2">{prev.title}</span>
          </Link>
          <Link to={`/projects/${next.slug}`} className="group card card-hover p-5 sm:text-right">
            <span className="text-xs text-zinc-500 flex items-center gap-1 sm:justify-end">Next <ArrowRight size={13} /></span>
            <span className="block mt-1 font-semibold text-zinc-900 dark:text-white group-hover:text-ag-deep dark:group-hover:text-ag-green line-clamp-2">{next.title}</span>
          </Link>
        </nav>
      </div>
    </>
  );
};

export default ProjectDetail;
