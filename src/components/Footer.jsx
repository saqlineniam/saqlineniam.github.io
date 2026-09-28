import { Link } from 'react-router-dom';
import { GitHubIcon, LinkedInIcon } from './BrandIcons';
import CopyEmail from './CopyEmail';
import Accent from './Accent';
import { profile } from '../data/profile';

const Footer = () => (
  <footer id="contact" className="mt-28 border-t border-zinc-200/80 dark:border-white/[.06]">
    <div className="max-w-6xl mx-auto px-5 md:px-8 pt-16 md:pt-24 pb-10">
      <div className="grid lg:grid-cols-12 gap-10 lg:items-end">
        <div className="lg:col-span-8">
          <p className="eyebrow mb-5">Get in touch</p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tighter leading-[1.02] text-zinc-900 dark:text-white max-w-3xl">
            <Accent text={profile.contact.heading} />
          </h2>
          <p className="mt-6 max-w-xl text-base md:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">{profile.contact.blurb}</p>
        </div>
        <div className="lg:col-span-4 flex flex-col items-start lg:items-end gap-3">
          <CopyEmail email={profile.email} />
          <div className="flex gap-3">
            <a href={profile.links.github} target="_blank" rel="noreferrer" className="btn btn-ghost">
              <GitHubIcon size={17} /> GitHub
            </a>
            <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="btn btn-ghost">
              <LinkedInIcon size={17} /> LinkedIn
            </a>
          </div>
        </div>
      </div>

      <div className="mt-16 pt-6 border-t border-zinc-200/80 dark:border-white/[.06] flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-4 text-sm text-zinc-500 dark:text-zinc-400">
        <p>© {new Date().getFullYear()} {profile.name}</p>
        <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer">
          <Link to="/" className="hover:text-zinc-900 dark:hover:text-white">About</Link>
          <Link to="/projects" className="hover:text-zinc-900 dark:hover:text-white">Projects</Link>
          <Link to="/publications" className="hover:text-zinc-900 dark:hover:text-white">Publications</Link>
          <Link to="/cv" className="hover:text-zinc-900 dark:hover:text-white">CV</Link>
        </nav>
      </div>
    </div>
  </footer>
);

export default Footer;
