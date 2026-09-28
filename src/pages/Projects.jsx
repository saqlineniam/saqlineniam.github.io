import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import { projects } from '../data/projects';
import useTitle from '../lib/useTitle';

const ALL = 'All';

const matches = (p, q) => {
  if (!q) return true;
  const hay = [p.title, p.summary, p.story, p.category, ...p.tags].join(' ').toLowerCase();
  return q.toLowerCase().split(/\s+/).every((t) => hay.includes(t));
};

const pill = (active) =>
  `shrink-0 h-10 px-4 rounded-full text-sm font-medium border transition-colors ${
    active
      ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 border-transparent'
      : 'bg-white/70 dark:bg-white/[.03] border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-white/25'
  }`;

const Projects = () => {
  useTitle('Projects');
  const [params, setParams] = useSearchParams();
  const category = params.get('category') || ALL;
  const tag = params.get('tag') || '';
  const q = params.get('q') || '';

  const update = (key, value) => {
    const next = new URLSearchParams(params);
    if (value && value !== ALL) next.set(key, value); else next.delete(key);
    setParams(next, { replace: true });
  };

  const categories = useMemo(() => {
    const counts = {};
    projects.forEach((p) => { counts[p.category] = (counts[p.category] || 0) + 1; });
    return [[ALL, projects.length], ...Object.entries(counts)];
  }, []);

  const filtered = projects.filter(
    (p) => (category === ALL || p.category === category) && (!tag || p.tags.includes(tag)) && matches(p, q)
  );

  const hasFilters = category !== ALL || tag || q;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-5 md:px-8 pt-10 md:pt-14">
      <header className="mb-10 max-w-3xl">
        <p className="eyebrow mb-4">Portfolio</p>
        <h1 className="text-5xl md:text-6xl font-semibold tracking-tighter text-zinc-900 dark:text-white mb-5">
          Projects
          <sup className="ml-2 font-mono text-base md:text-lg font-normal tracking-normal text-zinc-400 dark:text-zinc-500">{projects.length}</sup>
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
          From UAV visual odometry and plant tracking to predictive models for food science. Case studies include the full pipeline, what <span className="accent">failed</span>, and the numbers.
        </p>
      </header>

      <div className="sticky top-[4.75rem] z-20 -mx-4 px-4 sm:-mx-5 sm:px-5 md:mx-0 md:px-0 py-3 mb-8 bg-[#fafafa]/85 dark:bg-zinc-950/85 backdrop-blur-md">
        <div className="flex flex-col md:flex-row gap-3 md:items-center">
          <label className="relative flex-1 md:max-w-xs">
            <span className="sr-only">Search projects</span>
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="search"
              value={q}
              onChange={(e) => update('q', e.target.value)}
              placeholder="Search e.g. YOLO, drone, tea"
              className="w-full h-10 pl-10 pr-4 rounded-full border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900/60 text-sm outline-none focus-visible:outline-none focus:border-emerald-500"
            />
          </label>
          <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0" role="tablist" aria-label="Category">
            {categories.map(([cat, n]) => (
              <button key={cat} role="tab" aria-selected={category === cat} onClick={() => update('category', cat)} className={pill(category === cat)}>
                {cat} <span className="opacity-50 ml-0.5 font-mono text-xs">{n}</span>
              </button>
            ))}
          </div>
        </div>
        {hasFilters && (
          <div className="flex flex-wrap items-center gap-2 mt-3 text-sm">
            <span className="text-zinc-500">{filtered.length} result{filtered.length !== 1 && 's'}</span>
            {tag && (
              <button onClick={() => update('tag', '')} className="chip hover:border-emerald-500/50">
                tag: {tag} <X size={13} />
              </button>
            )}
            <button onClick={() => setParams({}, { replace: true })} className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white underline underline-offset-2">
              Clear all
            </button>
          </div>
        )}
      </div>

      {filtered.length === 0 ? (
        <p className="py-20 text-center text-zinc-500">No projects match. Try a different search.</p>
      ) : (
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.2 }}
              >
                <ProjectCard project={p} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};

export default Projects;
