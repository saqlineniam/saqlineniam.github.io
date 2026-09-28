import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Accent from './Accent';

// Numbered section header: "01 / Focus" over "Research *areas*".
const SectionHeading = ({ index, eyebrow, title, action, to, id }) => (
  <div id={id} className="flex items-end justify-between gap-4 mb-8 scroll-mt-28">
    <div>
      {(index || eyebrow) && (
        <p className="eyebrow mb-3">
          {index && <span className="text-zinc-400 dark:text-zinc-500">{index} / </span>}
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tighter text-zinc-900 dark:text-white">
        <Accent text={title} />
      </h2>
    </div>
    {action && to && (
      <Link to={to} className="group shrink-0 inline-flex items-center gap-1.5 text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white">
        {action} <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
      </Link>
    )}
  </div>
);

export default SectionHeading;
