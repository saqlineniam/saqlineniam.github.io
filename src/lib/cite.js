// Citation helpers built from the entries in data/publications.js.

const clean = (s) => (s || '').trim().replace(/\.$/, '');

const isArxiv = (pub) => /^arxiv:/i.test(pub.doi || '');

export const doiUrl = (pub) => {
  if (!pub.doi) return pub.link && pub.link !== '#' ? pub.link : '';
  if (isArxiv(pub)) return `https://arxiv.org/abs/${pub.doi.replace(/^arxiv:/i, '')}`;
  return `https://doi.org/${pub.doi}`;
};

// Keep the final initial's period ("Shifat, A. S.") — only titles get their trailing period stripped.
const authorList = (authors) => {
  const a = (authors || '').trim();
  return /\.$/.test(a) ? a : `${a}.`;
};

export const toAPA = (pub) => {
  const url = doiUrl(pub);
  return `${authorList(pub.authors)} (${pub.year}). ${clean(pub.title)}. ${pub.journal}.${url ? ' ' + url : ''}`;
};

// "Niam, S., Ahmad, I., & Rayhan, M. A." -> "Niam, S. and Ahmad, I. and Rayhan, M. A."
const bibAuthors = (authors) =>
  authorList(authors)
    .replace(/,?\s*&\s*/g, ', ')
    .split(/(?<=\.),\s*/)
    .map((a) => a.trim())
    .filter(Boolean)
    .join(' and ');

export const toBibTeX = (pub) => {
  const first = (pub.authors.split(',')[0] || 'niam').toLowerCase().replace(/[^a-z]/g, '');
  const word = clean(pub.title).split(/\s+/).find((w) => w.length > 3)?.toLowerCase().replace(/[^a-z]/g, '') || 'paper';
  const isJournal = /journal/i.test(pub.type);
  const fields = [
    ['title', `{${clean(pub.title)}}`],
    ['author', bibAuthors(pub.authors)],
    [isJournal ? 'journal' : 'booktitle', pub.journal],
    ['year', pub.year],
  ];
  if (pub.doi && !isArxiv(pub)) fields.push(['doi', pub.doi]);
  if (isArxiv(pub)) fields.push(['eprint', pub.doi.replace(/^arxiv:/i, '')], ['archivePrefix', 'arXiv']);
  const url = doiUrl(pub);
  if (url) fields.push(['url', url]);
  const body = fields.map(([k, v]) => `  ${k} = {${v}}`).join(',\n');
  return `@${isJournal ? 'article' : 'inproceedings'}{${first}${pub.year}${word},\n${body}\n}`;
};
