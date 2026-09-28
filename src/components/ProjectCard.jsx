import { Link } from 'react-router-dom';
import { ArrowUpRight, PlayCircle, Globe, FileText, BookOpen, AppWindow } from 'lucide-react';
import Thumb from './Thumb';

// Small badges that tell a visitor what's behind the card before they click.
const Badges = ({ project }) => {
  const items = [
    project.webApp && ['Web app', AppWindow],
    project.implementationDetails && ['Case study', BookOpen],
    project.youtubeId && ['Video', PlayCircle],
    project.streamlitUrl && ['Live demo', Globe],
    project.publication && ['Paper', FileText],
  ].filter(Boolean);
  if (!items.length) return <span />;
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map(([label, Icon]) => (
        <span key={label} className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600 dark:bg-white/[.06] dark:text-zinc-300">
          <Icon size={12} /> {label}
        </span>
      ))}
    </div>
  );
};

// Headline metric, e.g. "83% re-ID across 372 plants".
const Highlight = ({ h, overlay = false }) =>
  overlay ? (
    <span className="glass-chip">
      <span className="text-emerald-300">{h.value}</span>
      <span className="font-medium text-white/85">{h.label}</span>
    </span>
  ) : (
    <span className="text-sm leading-tight">
      <span className="font-semibold text-emerald-700 dark:text-emerald-400">{h.value}</span>{' '}
      <span className="text-zinc-500 dark:text-zinc-400">{h.label}</span>
    </span>
  );

const Category = ({ children }) => (
  <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400">{children}</span>
);

const Arrow = () => (
  <ArrowUpRight size={18} className="shrink-0 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
);

const zoom = 'group-hover:scale-[1.04] transition-transform duration-700 ease-out';

/**
 * variant: "default" (grid card), "feature" (large, image grows to fill), "compact" (horizontal row)
 */
const ProjectCard = ({ project, variant = 'default' }) => {
  const to = `/projects/${project.slug}`;

  if (variant === 'compact') {
    return (
      <Link to={to} className="group card card-hover spotlight overflow-hidden flex h-full">
        <Thumb src={project.thumbnail} alt="" category={project.category} className="w-28 sm:w-40 shrink-0" imgClassName={zoom} />
        <div className="flex flex-col gap-1.5 p-4 sm:p-5 min-w-0 flex-1">
          <Category>{project.category}</Category>
          <h3 className="font-semibold leading-snug tracking-tight text-zinc-900 dark:text-white line-clamp-3">{project.title}</h3>
          <p className="hidden sm:block text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-2">{project.summary}</p>
          <div className="mt-auto pt-2 flex items-end justify-between gap-3">
            {project.highlight ? <Highlight h={project.highlight} /> : <Badges project={project} />}
            <Arrow />
          </div>
        </div>
      </Link>
    );
  }

  const feature = variant === 'feature';
  return (
    <Link to={to} className="group card card-hover spotlight overflow-hidden flex flex-col h-full">
      <Thumb
        src={project.thumbnail}
        alt=""
        category={project.category}
        label={project.imageLabel}
        className={feature ? 'flex-1 min-h-[16rem]' : 'aspect-[16/10]'}
        imgClassName={zoom}
      >
        {project.highlight && (
          <div className="absolute left-3 top-3">
            <Highlight h={project.highlight} overlay />
          </div>
        )}
      </Thumb>
      <div className={`flex flex-col gap-2.5 ${feature ? 'p-6 md:p-8' : 'p-5 flex-1'}`}>
        <Category>{project.category}</Category>
        <h3 className={`font-semibold tracking-tight leading-snug text-zinc-900 dark:text-white ${feature ? 'text-2xl md:text-[1.7rem]' : 'text-lg'}`}>
          {project.title}
        </h3>
        {feature ? (
          <>
            <p className="md:hidden text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{project.summary}</p>
            <p className="hidden md:block text-[15px] text-zinc-600 dark:text-zinc-400 leading-relaxed">{project.story}</p>
          </>
        ) : (
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-3">{project.summary}</p>
        )}
        <div className="mt-auto pt-3 flex items-end justify-between gap-3">
          <Badges project={project} />
          <Arrow />
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
