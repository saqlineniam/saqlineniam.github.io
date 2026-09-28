// Runs after `vite build` (cross-platform, unlike `cp`).
// - Writes an HTML shell per route with the right <title>/description, so deep links
//   return 200 and link previews (LinkedIn, Slack) show the page's own title.
// - Writes 404.html (SPA fallback for unknown URLs), sitemap.xml and robots.txt.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';
import { projects } from '../src/data/projects.js';
import { publications } from '../src/data/publications.js';
import { profile } from '../src/data/profile.js';

const SITE = 'https://saqlineniam.github.io';
const dist = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const shell = readFileSync(join(dist, 'index.html'), 'utf8');

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

const routes = [
  { path: '/projects', title: 'Projects', desc: `Agricultural computer vision, robotics and food-science ML projects by ${profile.name}.` },
  { path: '/publications', title: 'Publications', desc: `Peer-reviewed papers and conference work by ${profile.name}.` },
  { path: '/cv', title: 'CV', desc: `Curriculum vitae of ${profile.name}: experience, education, skills and publications.` },
  ...projects.map((p) => ({ path: `/projects/${p.slug}`, title: p.title, desc: p.summary })),
  ...publications.map((p) => ({ path: `/publications/${p.slug}`, title: p.title.replace(/\.$/, ''), desc: `${p.journal}, ${p.year}.` })),
];

const render = ({ path, title, desc }) => {
  const fullTitle = `${title} · ${profile.name}`;
  return shell
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(fullTitle)}</title>`)
    .replace(/(<meta property="og:title" content=")[^"]*/, `$1${esc(fullTitle)}`)
    .replace(/(<meta name="description" content=")[^"]*/, `$1${esc(desc)}`)
    .replace(/(<meta property="og:description" content=")[^"]*/, `$1${esc(desc)}`)
    .replace(/(<meta property="og:url" content=")[^"]*/, `$1${SITE}${path}/`);
};

for (const route of routes) {
  const dir = join(dist, ...route.path.split('/').filter(Boolean));
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), render(route));
}

writeFileSync(join(dist, '404.html'), shell);

const urls = ['/', ...routes.map((r) => `${r.path}/`)];
writeFileSync(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((u) => `  <url><loc>${SITE}${u}</loc></url>`)
    .join('\n')}\n</urlset>\n`
);
writeFileSync(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);

console.log(`postbuild: ${routes.length} route pages, 404.html, sitemap.xml (${urls.length} URLs), robots.txt`);
