import { projects } from '../data/projects';
import { publications } from '../data/publications';

// Flat list of everything the command palette can jump to.
export const searchIndex = [
  { kind: 'Page', title: 'About', to: '/', text: 'home about bio research areas uga university of georgia precision horticulture lab robotics' },
  { kind: 'Page', title: 'Projects', to: '/projects', text: 'projects portfolio implementations' },
  { kind: 'Page', title: 'Publications', to: '/publications', text: 'papers publications research journal conference' },
  { kind: 'Page', title: 'CV', to: '/cv', text: 'cv resume education experience skills test scores references uga georgia horticulture sust graduate research assistant' },
  ...projects.map((p) => ({
    kind: 'Project',
    title: p.title,
    to: `/projects/${p.slug}`,
    text: [p.category, p.summary, p.story, ...(p.tags || [])].join(' '),
  })),
  ...publications.map((p) => ({
    kind: 'Paper',
    title: p.title.replace(/\.$/, ''),
    to: `/publications/${p.slug}`,
    text: [p.journal, p.year, p.authors, p.background].join(' '),
  })),
];

export function search(query, limit = 8) {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) return searchIndex.slice(0, limit);
  return searchIndex
    .map((item) => {
      const title = item.title.toLowerCase();
      const body = item.text.toLowerCase();
      let score = 0;
      for (const t of terms) {
        if (title.includes(t)) score += 3;
        else if (body.includes(t)) score += 1;
        else return null;
      }
      return { item, score };
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.item);
}
