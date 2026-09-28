import { useState, useRef, useEffect } from 'react';
import { Quote, Copy, Check } from 'lucide-react';
import { toAPA, toBibTeX } from '../lib/cite';

const CiteButton = ({ pub, className = '' }) => {
  const [open, setOpen] = useState(false);
  const [format, setFormat] = useState('APA');
  const [copied, setCopied] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const esc = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', esc);
    return () => { document.removeEventListener('mousedown', close); document.removeEventListener('keydown', esc); };
  }, [open]);

  const text = format === 'APA' ? toAPA(pub) : toBibTeX(pub);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch { /* clipboard blocked; text is still selectable */ }
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOpen(!open); }}
        className={`inline-flex items-center gap-1.5 text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-ag-deep dark:hover:text-ag-green ${className}`}
        aria-expanded={open}
      >
        <Quote size={14} /> Cite
      </button>
      {open && (
        <div
          className="absolute z-30 left-0 md:left-auto md:right-0 mt-2 w-[min(90vw,30rem)] card bg-white dark:bg-zinc-900 shadow-xl p-3"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex gap-1 p-0.5 rounded-lg bg-zinc-100 dark:bg-zinc-800">
              {['APA', 'BibTeX'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFormat(f)}
                  className={`px-3 py-1 text-xs font-semibold rounded-md ${format === f ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm' : 'text-zinc-500'}`}
                >
                  {f}
                </button>
              ))}
            </div>
            <button onClick={copy} className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-full bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200">
              {copied ? <><Check size={13} /> Copied</> : <><Copy size={13} /> Copy</>}
            </button>
          </div>
          <pre className="text-xs leading-relaxed whitespace-pre-wrap break-words font-mono text-zinc-700 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-950 rounded-lg p-3 max-h-60 overflow-auto select-all">
            {text}
          </pre>
        </div>
      )}
    </div>
  );
};

export default CiteButton;
