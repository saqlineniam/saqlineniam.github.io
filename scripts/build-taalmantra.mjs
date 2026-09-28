// Builds the TaalMantra web app (https://github.com/saqlineniam/TaalMantra) into
// dist/taalmantra, so it is served at https://saqlineniam.github.io/taalmantra/.
// Run after `npm run build` (which empties dist/). The deploy workflow runs both.
import { execSync } from 'node:child_process';
import { rmSync, existsSync, readFileSync, writeFileSync, readdirSync, copyFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = 'https://github.com/saqlineniam/TaalMantra.git';
const BASE = '/taalmantra/';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = join(root, '.taalmantra');
const out = join(root, 'dist', 'taalmantra');
const extras = join(root, 'scripts', 'taalmantra-web'); // icons + web manifest

const sh = (command, cwd) => {
  console.log(`> ${command}`);
  execSync(command, { cwd, stdio: 'inherit' });
};

if (!existsSync(join(root, 'dist', 'index.html'))) {
  console.error('Run `npm run build` first: dist/ is missing.');
  process.exit(1);
}

// Always start from a fresh shallow clone of the latest main.
rmSync(src, { recursive: true, force: true });
sh(`git clone --depth 1 ${REPO} .taalmantra`, root);
sh('npm ci --no-audit --no-fund', src);
sh(`npx vite build --base=${BASE} --outDir "${out}" --emptyOutDir`, src);

// Web-only extras: favicon, home-screen icons and manifest.
for (const file of readdirSync(extras)) copyFileSync(join(extras, file), join(out, file));

// The app is styled for its dark theme, which needs class="dark" on <html>.
// Also link the icons and manifest. Each step is skipped if the app already has it.
const indexPath = join(out, 'index.html');
let html = readFileSync(indexPath, 'utf8');
html = html.replace(/<html([^>]*)>/, (tag, attrs) => {
  if (/\bclass="[^"]*\bdark\b/.test(attrs)) return tag;
  if (/\bclass="/.test(attrs)) return `<html${attrs.replace(/\bclass="/, 'class="dark ')}>`;
  return `<html${attrs} class="dark">`;
});
const head = [
  !/name="description"/.test(html) && '<meta name="description" content="TaalMantra: Indian classical metronome with tabla rhythm cycles, a tanpura drone and raag guides for riyaz. By Saklain Niam." />',
  !/name="theme-color"/.test(html) && '<meta name="theme-color" content="#020617" />',
  !/rel="icon"/.test(html) && `<link rel="icon" type="image/svg+xml" href="${BASE}favicon.svg" />`,
  !/rel="apple-touch-icon"/.test(html) && `<link rel="apple-touch-icon" href="${BASE}apple-touch-icon.png" />`,
  !/rel="manifest"/.test(html) && `<link rel="manifest" href="${BASE}manifest.webmanifest" />`,
].filter(Boolean);
html = html.replace('</head>', `    ${head.join('\n    ')}\n  </head>`);
writeFileSync(indexPath, html);

console.log(`TaalMantra web app built into dist/taalmantra (served at ${BASE}).`);
