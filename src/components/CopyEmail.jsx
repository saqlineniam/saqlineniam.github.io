import { useState } from 'react';
import { Mail, Copy, Check } from 'lucide-react';

// Email pill: the address opens the mail app, the icon copies it to the clipboard.
const CopyEmail = ({ email, className = '' }) => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <span className={`btn btn-ghost pl-4 pr-1.5 gap-0 max-w-full ${className}`}>
      <a href={`mailto:${email}`} className="flex items-center gap-2 min-w-0 pr-3 hover:text-emerald-700 dark:hover:text-emerald-400">
        <Mail size={16} className="shrink-0" />
        <span className="truncate">{email}</span>
      </a>
      <button
        onClick={copy}
        className="shrink-0 w-8 h-8 rounded-full grid place-items-center text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-white/10 dark:hover:text-white transition-colors"
        aria-label={copied ? 'Email address copied' : 'Copy email address'}
        title={copied ? 'Copied!' : 'Copy'}
      >
        {copied ? <Check size={15} className="text-emerald-600 dark:text-emerald-400" /> : <Copy size={15} />}
      </button>
    </span>
  );
};

export default CopyEmail;
