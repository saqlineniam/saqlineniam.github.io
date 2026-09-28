import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, FileText, FolderGit2 } from 'lucide-react';
import CiteButton from '../components/CiteButton';
import Lightbox from '../components/Lightbox';
import NotFound from './NotFound';
import { Authors, StatusBadge } from '../components/PublicationItem';
import { publications } from '../data/publications';
import { doiUrl } from '../lib/cite';
import useTitle from '../lib/useTitle';

const PublicationDetail = () => {
  const { slug } = useParams();
  const [lightboxImg, setLightboxImg] = useState(null);
  const pub = publications.find((p) => p.slug === slug);
  useTitle(pub ? pub.title.replace(/\.$/, '') : 'Not found');

  if (!pub) return <NotFound what="publication" />;

  const url = doiUrl(pub);
  const photos = (pub.images || []).filter((img) => img.src);

  return (
    <>
      <Lightbox img={lightboxImg} onClose={() => setLightboxImg(null)} />
      <div className="max-w-3xl mx-auto px-4 sm:px-5 md:px-8 pt-6 md:pt-10">
        <Link to="/publications" className="inline-flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white mb-8">
          <ArrowLeft size={14} /> Publications
        </Link>

        <motion.header initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <StatusBadge pub={pub} />
            <span className="text-sm text-zinc-500 dark:text-zinc-400">{pub.year}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tighter text-zinc-900 dark:text-white leading-[1.06] mb-6">
            {pub.title.replace(/\.$/, '')}
          </h1>
          <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed mb-2"><Authors authors={pub.authors} /></p>
          <p className="text-base italic text-zinc-700 dark:text-zinc-300 mb-8">{pub.journal}</p>

          <div className="flex flex-wrap items-center gap-3">
            {url && (
              <a href={url} target="_blank" rel="noreferrer" className="btn btn-primary">
                <ExternalLink size={16} /> Read the paper
              </a>
            )}
            {pub.pdf && (
              <a href={pub.pdf} target="_blank" rel="noreferrer" className="btn btn-ghost">
                <FileText size={16} /> Poster (PDF)
              </a>
            )}
            {pub.projectSlug && (
              <Link to={`/projects/${pub.projectSlug}`} className="btn btn-ghost">
                <FolderGit2 size={16} /> Related project
              </Link>
            )}
            {pub.status === 'Published' && (
              <span className="px-2"><CiteButton pub={pub} /></span>
            )}
          </div>
        </motion.header>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white mb-4">Summary</h2>
          <p className="text-base text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-line">{pub.background}</p>
        </section>

        {pub.pdf && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white mb-4">Poster</h2>
            <div className="aspect-[3/4] md:aspect-[4/3] rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900">
              <iframe src={pub.pdf} className="w-full h-full" title={`${pub.title} poster`} loading="lazy" />
            </div>
            <p className="text-sm text-zinc-500 mt-2">
              Can’t see it? <a href={pub.pdf} target="_blank" rel="noreferrer" className="text-ag-deep dark:text-ag-green underline">Open the PDF</a>.
            </p>
          </section>
        )}

        {photos.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white mb-4">From the lab</h2>
            <div className="grid grid-cols-2 gap-3">
              {photos.map((img) => (
                <figure key={img.id}>
                  <button
                    onClick={() => setLightboxImg({ src: img.src, alt: img.caption, caption: img.caption })}
                    className="block w-full aspect-[4/3] overflow-hidden rounded-xl cursor-zoom-in"
                    aria-label={`Enlarge: ${img.caption}`}
                  >
                    <img src={img.src} alt={img.caption} loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </button>
                  <figcaption className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">{img.caption}</figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default PublicationDetail;
