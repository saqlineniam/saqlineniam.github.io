# saqlineniam.github.io

Portfolio of Saklain Niam — https://saqlineniam.github.io

React 19 + Vite + Tailwind CSS 4, deployed to GitHub Pages by GitHub Actions on every push to `main`.

## Updating content

All content lives in three data files. You rarely need to touch the page code.

| File | What it holds |
| --- | --- |
| `src/data/profile.js` | Name, bio, links, research areas, "currently working on", experience, education, training, skills, test scores, references |
| `src/data/projects.js` | Projects (cards, filters, search and case-study pages are generated from this) |
| `src/data/publications.js` | Papers (list, detail pages, APA/BibTeX citations and the CV list are generated from this) |

### Adding a project

Add an object to `projects` in `src/data/projects.js`:

```js
{
  id: 16,                                  // any unique number
  slug: "my-new-project",                  // URL: /projects/my-new-project
  summary: "One sentence shown on cards.",
  title: "My New Project",
  category: "Computer Vision",             // Robotics & RL | Computer Vision | Food Science & Biotech | Side Projects
  story: "A paragraph shown at the top of the project page.",
  tags: ["YOLOv8", "Python"],              // clickable; filter the project list
  thumbnail: "/images/my-project.webp",    // optional; a placeholder is shown otherwise
  featured: false,                         // true = shown on the home page (the first one gets the big card)
  highlight: { value: "83%", label: "re-ID across 372 plants" }, // optional headline metric badge
  github: "https://github.com/saqlineniam/repo", // optional; only full URLs show a button
  publication: "paper-slug",               // optional; links to a paper in publications.js
  youtubeId: "abc123",                     // optional; embeds a demo video
  streamlitUrl: "https://…",               // optional; "Live demo" button
  implementationDetails: { … },            // optional; see the cabbage project for the full format
}
```

`implementationDetails` supports `overview`, `pipeline`, `modelComparison`, `tables`, `iterations`, `insights`, `results` and `images`. Each section appears only if present. See the Amiga project for `tables` (generic comparison tables) and the cabbage project for `modelComparison`.

### Adding a paper

Add an object to `publications` in `src/data/publications.js`. Set `status: "Published"` to enable the Cite button, `doi` to generate citation links, `pdf` to embed a poster, and `projectSlug` to link a project.

### Styling text

In `profile.js`, wrap a word in `*asterisks*` to render it in the serif-italic accent style (e.g. the tagline and the contact heading).

### Images

Put images in `public/images/` and reference them as `/images/…`. Please use WebP or JPEG and keep them under about 1600 px wide. Phone photos and PNG exports are often 5–10 MB each and make the site slow.

## Running locally

```bash
npm install
npm run dev       # http://localhost:5173 with live reload
npm run build     # production build into dist/
npm run preview   # serve the production build
```

`npm run build` also runs `scripts/postbuild.mjs`, which writes a page shell per route (correct titles in link previews), `404.html`, `sitemap.xml` and `robots.txt`.

## Deploying

Push to `main`. `.github/workflows/deploy.yml` builds the site and publishes `dist/` to GitHub Pages. Don't commit `dist/` or `node_modules/`; both are git-ignored.
