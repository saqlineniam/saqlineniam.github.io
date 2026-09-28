import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, FileText, FolderGit2, CornerDownLeft, Compass } from 'lucide-react';
import { search } from '../lib/search';

const kindIcon = { Page: Compass, Project: FolderGit2, Paper: FileText };

const CommandPalette = ({ open, onClose }) => {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const results = useMemo(() => search(query), [query]);

  useEffect(() => {
    if (open) {
      setQuery('');
      setActive(0);
    }
  }, [open]);

  useEffect(() => setActive(0), [query]);

  const go = (item) => {
    if (!item) return;
    onClose();
    navigate(item.to);
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(a + 1, results.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
    else if (e.key === 'Enter') { e.preventDefault(); go(results[active]); }
    else if (e.key === 'Escape') onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.12 }}
          className="fixed inset-0 z-50 bg-zinc-950/40 backdrop-blur-sm flex items-start justify-center p-4 pt-[12vh]"
          onMouseDown={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="w-full max-w-xl card bg-white dark:bg-zinc-900 shadow-2xl overflow-hidden"
            onMouseDown={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="Search"
          >
            <div className="flex items-center gap-3 px-4 border-b border-zinc-200 dark:border-zinc-800">
              <Search size={18} className="text-zinc-400 shrink-0" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Search projects, papers, pages…"
                className="w-full py-4 bg-transparent outline-none focus-visible:outline-none text-zinc-900 dark:text-white placeholder:text-zinc-400"
                aria-label="Search query"
              />
              <kbd className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500">Esc</kbd>
            </div>
            <ul className="max-h-[50vh] overflow-y-auto p-2" role="listbox">
              {results.length === 0 && (
                <li className="px-3 py-8 text-center text-sm text-zinc-500">No results for “{query}”.</li>
              )}
              {results.map((item, i) => {
                const Icon = kindIcon[item.kind];
                return (
                  <li key={item.to} role="option" aria-selected={i === active}>
                    <button
                      onClick={() => go(item)}
                      onMouseMove={() => setActive(i)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left ${
                        i === active ? 'bg-emerald-50 dark:bg-emerald-950/40' : ''
                      }`}
                    >
                      <Icon size={16} className={i === active ? 'text-ag-deep dark:text-ag-green' : 'text-zinc-400'} />
                      <span className="flex-1 min-w-0 truncate text-sm text-zinc-800 dark:text-zinc-200">{item.title}</span>
                      <span className="text-xs text-zinc-400 shrink-0">{item.kind}</span>
                      {i === active && <CornerDownLeft size={14} className="text-zinc-400 shrink-0" />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
