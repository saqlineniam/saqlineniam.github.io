import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, Mail } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { GitHubIcon } from './BrandIcons';
import { profile } from '../data/profile';

const links = [
  { path: '/', label: 'About', end: true },
  { path: '/projects', label: 'Projects' },
  { path: '/publications', label: 'Publications' },
  { path: '/cv', label: 'CV' },
];

const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform);

const Navigation = ({ onSearch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setIsOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-40 px-3 pt-3">
      <div
        className={`mx-auto max-w-5xl h-14 pl-1.5 pr-1.5 flex items-center justify-between gap-2 rounded-full border transition-[background-color,border-color,box-shadow] duration-300 ${
          scrolled || isOpen ? 'nav-glass' : 'border-transparent'
        }`}
      >
        <Link to="/" className="flex items-center gap-2.5 rounded-full pr-3 shrink-0" aria-label={`${profile.name} — home`}>
          <img src={profile.avatar} alt="" width="40" height="40" className="w-10 h-10 rounded-full object-cover ring-1 ring-zinc-900/10 dark:ring-white/15" />
          <span className="hidden sm:inline font-semibold tracking-tight text-zinc-900 dark:text-white">{profile.name}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-0.5" aria-label="Main">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.end}
              className={({ isActive }) =>
                `relative px-3.5 py-1.5 text-sm font-medium rounded-full transition-colors ${
                  isActive ? 'text-zinc-900 dark:text-white' : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-zinc-900/[.06] dark:bg-white/10"
                      transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <button
            onClick={onSearch}
            className="flex items-center gap-2 h-10 px-2.5 md:pl-3.5 md:pr-2 rounded-full text-sm text-zinc-500 dark:text-zinc-400 md:border border-zinc-200 dark:border-white/10 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-300 dark:hover:border-white/20 transition-colors"
            aria-label="Search the site"
          >
            <Search size={16} />
            <span className="hidden lg:inline">Search</span>
            <kbd className="hidden md:inline font-mono text-[11px] px-1.5 py-0.5 rounded-md bg-zinc-100 dark:bg-white/10 text-zinc-500 dark:text-zinc-400">
              {isMac ? '⌘' : 'Ctrl'} K
            </kbd>
          </button>
          <a
            href={profile.links.github}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:grid place-items-center w-10 h-10 rounded-full text-zinc-500 dark:text-zinc-400 hover:bg-zinc-900/[.06] dark:hover:bg-white/10 hover:text-zinc-900 dark:hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <GitHubIcon size={18} />
          </a>
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden grid place-items-center w-10 h-10 rounded-full text-zinc-600 dark:text-zinc-300 hover:bg-zinc-900/[.06] dark:hover:bg-white/10"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="md:hidden mx-auto max-w-5xl mt-2 p-2 rounded-3xl border nav-glass"
            aria-label="Mobile"
          >
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.end}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-2xl text-base font-medium ${
                    isActive ? 'bg-zinc-900/[.06] dark:bg-white/10 text-zinc-900 dark:text-white' : 'text-zinc-600 dark:text-zinc-300'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <a href={`mailto:${profile.email}`} className="flex items-center gap-2 px-4 py-3 rounded-2xl text-base font-medium text-emerald-700 dark:text-emerald-400">
              <Mail size={16} /> Email me
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navigation;
