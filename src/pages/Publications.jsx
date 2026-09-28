import { useState } from 'react';
import { Link } from 'react-router-dom';
import PublicationItem from '../components/PublicationItem';
import { publications } from '../data/publications';
import useTitle from '../lib/useTitle';

const filters = {
  All: () => true,
  Journal: (p) => p.type === 'Journal Article' && p.status === 'Published',
  Conference: (p) => p.type === 'Conference Paper' && p.status === 'Published',
  'In preparation': (p) => p.status !== 'Published',
};

const Publications = () => {
  useTitle('Publications');
  const [filter, setFilter] = useState('All');

  const list = publications.filter(filters[filter]);
  const years = [...new Set(list.map((p) => p.year))].sort((a, b) => b - a);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-5 md:px-8 pt-10 md:pt-14">
      <header className="mb-10">
        <p className="eyebrow mb-4">Research output</p>
        <h1 className="text-5xl md:text-6xl font-semibold tracking-tighter text-zinc-900 dark:text-white mb-5">
          Publications
          <sup className="ml-2 font-mono text-base md:text-lg font-normal tracking-normal text-zinc-400 dark:text-zinc-500">{publications.length}</sup>
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Peer-reviewed papers and conference work at the intersection of food science and machine learning. Use <strong className="font-semibold text-zinc-800 dark:text-zinc-200">Cite</strong> to copy APA or BibTeX.
        </p>
      </header>

      <div className="flex flex-wrap gap-2 mb-12" role="tablist" aria-label="Publication type">
        {Object.keys(filters).map((f) => {
          const n = publications.filter(filters[f]).length;
          return (
            <button
              key={f}
              role="tab"
              aria-selected={filter === f}
              onClick={() => setFilter(f)}
              className={`h-10 px-4 rounded-full text-sm font-medium border transition-colors ${
                filter === f
                  ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 border-transparent'
                  : 'bg-white/70 dark:bg-white/[.03] border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-white/25'
              }`}
            >
              {f} <span className="opacity-50 ml-0.5 font-mono text-xs">{n}</span>
            </button>
          );
        })}
      </div>

      <div className="space-y-14">
        {years.map((year) => (
          <section key={year} className="grid md:grid-cols-[6rem_1fr] gap-2 md:gap-8">
            <h2 className="accent text-zinc-300 dark:text-zinc-700 text-5xl leading-none md:sticky md:top-28 self-start">{year}</h2>
            <div className="card px-6 md:px-8 pt-6 md:pt-8 pb-2">
              {list.filter((p) => p.year === year).map((pub) => (
                <PublicationItem key={pub.id} pub={pub} />
              ))}
            </div>
          </section>
        ))}
      </div>

      <aside className="mt-14 card spotlight p-6 md:p-8">
        <p className="eyebrow mb-3">In the works</p>
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-white mb-2">Manuscripts in progress</h2>
        <p className="text-[15px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Two papers are being prepared: GPS-free{' '}
          <Link to="/projects/cauliflower-reid-drone" className="text-emerald-700 dark:text-emerald-400 font-medium hover:underline">UAV plant re-identification</Link>
          {' '}and real-time{' '}
          <Link to="/projects/uav-tomato-weed-mapping" className="text-emerald-700 dark:text-emerald-400 font-medium hover:underline">tomato segmentation</Link>
          {' '}under varying light conditions.
        </p>
      </aside>
    </div>
  );
};

export default Publications;
