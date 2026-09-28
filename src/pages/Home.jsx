import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Bot, ScanEye, Cpu, FlaskConical, GraduationCap } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from '../components/BrandIcons';
import ProjectCard from '../components/ProjectCard';
import PublicationItem from '../components/PublicationItem';
import SectionHeading from '../components/SectionHeading';
import CopyEmail from '../components/CopyEmail';
import Accent from '../components/Accent';
import { profile, researchAreas, currently, toolbox } from '../data/profile';
import { projects } from '../data/projects';
import { publications } from '../data/publications';
import useTitle from '../lib/useTitle';

const areaIcons = { Bot, ScanEye, Cpu, FlaskConical };

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.2, 0.7, 0.2, 1] },
});

const PulseDot = () => (
  <span className="relative flex h-2 w-2">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
  </span>
);

const Home = () => {
  useTitle();
  const featured = projects.filter((p) => p.featured);
  const published = publications.filter((p) => p.status === 'Published');
  const recentPubs = [...published].sort((a, b) => b.year - a.year).slice(0, 4);
  const firstAuthor = published.filter((p) => p.authors.trim().startsWith('Niam')).length;

  const stats = [
    [projects.length, 'Projects', '/projects'],
    [published.length, 'Publications', '/publications'],
    [firstAuthor, '1st author', '/publications'],
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-5 md:px-8 pt-4 md:pt-8">
      {/* ---------- Bento hero ---------- */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-4" aria-label="Introduction">
        <motion.div {...rise(0)} className="card spotlight md:col-span-8 p-7 sm:p-10 md:p-12 flex flex-col">
          <div className="flex items-center gap-3 mb-10">
            <img src={profile.avatar} alt="" width="44" height="44" className="md:hidden w-11 h-11 rounded-full object-cover ring-1 ring-zinc-900/10 dark:ring-white/15" />
            <span className="chip">
              <PulseDot /> {profile.role} · {profile.orgShort}
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tighter leading-[0.95] text-zinc-900 dark:text-white">
            {profile.name}
          </h1>
          <p className="mt-6 text-xl sm:text-2xl lg:text-[1.7rem] leading-snug tracking-tight text-zinc-700 dark:text-zinc-300 max-w-2xl">
            <Accent text={profile.tagline} />
          </p>
          <p className="mt-5 text-base leading-relaxed text-zinc-500 dark:text-zinc-400 max-w-xl">{profile.bio[0]}</p>

          <div className="mt-auto pt-10 flex flex-wrap items-center gap-3">
            <Link to="/projects" className="btn btn-primary">
              See my work <ArrowRight size={16} />
            </Link>
            <CopyEmail email={profile.email} />
            <a href={profile.links.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="btn btn-ghost btn-icon">
              <GitHubIcon size={18} />
            </a>
            <a href={profile.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="btn btn-ghost btn-icon">
              <LinkedInIcon size={18} />
            </a>
            <a href={profile.links.scholar} target="_blank" rel="noreferrer" aria-label="Google Scholar" className="btn btn-ghost btn-icon">
              <GraduationCap size={18} />
            </a>
          </div>
        </motion.div>

        <motion.div {...rise(0.08)} className="hidden md:block md:col-span-4 card overflow-hidden relative min-h-[30rem]">
          <img
            src={profile.photo}
            alt={`Portrait of ${profile.name}`}
            width="720"
            height="900"
            fetchPriority="high"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </motion.div>

        <motion.div {...rise(0.14)} className="md:col-span-5 grid grid-cols-3 gap-4">
          {stats.map(([n, label, to]) => (
            <Link key={label} to={to} className="group card card-hover spotlight p-4 sm:p-5 flex flex-col justify-between gap-6 min-h-[8.5rem]">
              <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400">{label}</span>
              <span className="text-4xl sm:text-5xl font-semibold tracking-tighter text-zinc-900 dark:text-white">{n}</span>
            </Link>
          ))}
        </motion.div>

        <motion.div {...rise(0.2)} className="md:col-span-7 card p-6 flex flex-col gap-4">
          <p className="eyebrow flex items-center gap-2">
            <PulseDot /> Now
          </p>
          <ul className="grid gap-3">
            {currently.map((c) => (
              <li key={c.text}>
                <Link to={c.link} className="group flex items-start justify-between gap-4 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white">
                  <span>{c.text}</span>
                  <ArrowUpRight size={16} className="mt-1 shrink-0 text-zinc-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors" />
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      </section>

      {/* ---------- Toolbox ticker ---------- */}
      <section className="mt-4 card py-4 px-2" aria-label="Toolbox">
        <div className="marquee">
          <ul className="marquee-track">
            {[...toolbox, ...toolbox].map((tool, i) => (
              <li key={i} aria-hidden={i >= toolbox.length || undefined} className="flex items-center gap-8 pr-8 font-mono text-sm text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
                {tool}
                <span className="w-1 h-1 rounded-full bg-emerald-500/70" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Research areas ---------- */}
      <section className="mt-28">
        <SectionHeading index="01" eyebrow="Focus" title="Research *areas*" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {researchAreas.map((area) => {
            const Icon = areaIcons[area.icon];
            return (
              <div key={area.key} className="card spotlight reveal p-6 flex flex-col">
                <div className="w-10 h-10 mb-10 rounded-xl grid place-items-center bg-emerald-500/10 ring-1 ring-emerald-500/20">
                  <Icon size={19} className="text-emerald-700 dark:text-emerald-400" />
                </div>
                <h3 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-white">{area.title}</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mt-2 mb-6">{area.desc}</p>
                <ul className="mt-auto flex flex-wrap gap-1.5">
                  {area.items.map((item) => (
                    <li key={item} className="chip">{item}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* ---------- Featured projects (bento) ---------- */}
      <section className="mt-28">
        <SectionHeading index="02" eyebrow="Selected work" title="Featured *projects*" action={`All ${projects.length} projects`} to="/projects" />
        <div className="grid md:grid-cols-12 gap-4">
          {featured[0] && (
            <div className="reveal md:col-span-7 md:row-span-4">
              <ProjectCard project={featured[0]} variant="feature" />
            </div>
          )}
          {featured.slice(1, 5).map((p) => (
            <div key={p.id} className="reveal md:col-span-5">
              <ProjectCard project={p} variant="compact" />
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Publications ---------- */}
      <section className="mt-28 grid md:grid-cols-12 gap-8">
        <div className="md:col-span-4">
          <SectionHeading index="03" eyebrow="Research output" title="Recent *publications*" />
          <p className="text-[15px] text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6 -mt-3">
            Peer-reviewed work in food science and agricultural machine learning, including {firstAuthor} first-author papers.
          </p>
          <div className="flex flex-col items-start gap-2">
            <Link to="/publications" className="group inline-flex items-center gap-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white">
              All publications <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <a href={profile.links.scholar} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white">
              Google Scholar <ArrowUpRight size={15} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>
        <div className="reveal md:col-span-8 card p-6 md:p-8">
          {recentPubs.map((pub) => (
            <PublicationItem key={pub.id} pub={pub} compact />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
