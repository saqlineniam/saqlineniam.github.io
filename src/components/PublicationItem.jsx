import { Link } from 'react-router-dom';
import { ExternalLink, FileText, FolderGit2 } from 'lucide-react';
import CiteButton from './CiteButton';
import { doiUrl } from '../lib/cite';

export const Authors = ({ authors }) => {
  const parts = authors.split('Niam, S.');
  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 && <strong className="font-semibold text-zinc-900 dark:text-white">Niam, S.</strong>}
        </span>
      ))}
    </>
  );
};

export const StatusBadge = ({ pub }) => {
  const inPrep = pub.status !== 'Published';
  return (
    <span
      className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
        inPrep
          ? 'bg-sky-50 text-sky-700 dark:bg-sky-950/50 dark:text-sky-300'
          : pub.type === 'Journal Article'
            ? 'bg-emerald-50 text-ag-deep dark:bg-emerald-950/50 dark:text-ag-green'
            : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300'
      }`}
    >
      {inPrep ? pub.status : pub.type === 'Journal Article' ? 'Journal' : 'Conference'}
    </span>
  );
};

const PublicationItem = ({ pub, compact = false }) => {
  const url = doiUrl(pub);
  return (
    <article className="group py-6 first:pt-0 border-b last:border-0 border-zinc-200 dark:border-zinc-800">
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <StatusBadge pub={pub} />
        <span className="text-xs text-zinc-500 dark:text-zinc-400">{pub.year}</span>
      </div>
      <h3 className={`font-semibold text-zinc-900 dark:text-white leading-snug mb-2 ${compact ? 'text-base' : 'text-lg'}`}>
        <Link to={`/publications/${pub.slug}`} className="hover:text-ag-deep dark:hover:text-ag-green transition-colors">
          {pub.title.replace(/\.$/, '')}
        </Link>
      </h3>
      {!compact && (
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-1">
          <Authors authors={pub.authors} />
        </p>
      )}
      <p className="text-sm italic text-zinc-500 dark:text-zinc-400">{pub.journal}</p>

      {!compact && (
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-4">
          {url && (
            <a href={url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-ag-deep dark:hover:text-ag-green">
              <ExternalLink size={14} /> {/^arxiv:/i.test(pub.doi) ? 'arXiv' : 'Paper'}
            </a>
          )}
          {pub.pdf && (
            <a href={pub.pdf} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-ag-deep dark:hover:text-ag-green">
              <FileText size={14} /> Poster
            </a>
          )}
          {pub.projectSlug && (
            <Link to={`/projects/${pub.projectSlug}`} className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-ag-deep dark:hover:text-ag-green">
              <FolderGit2 size={14} /> Project
            </Link>
          )}
          {pub.status === 'Published' && <CiteButton pub={pub} />}
          <Link to={`/publications/${pub.slug}`} className="text-sm font-medium text-ag-deep dark:text-ag-green hover:underline ml-auto">
            Details →
          </Link>
        </div>
      )}
    </article>
  );
};

export default PublicationItem;
