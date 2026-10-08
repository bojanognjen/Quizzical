# Quizzical

A small trivia quiz built with Next.js, React and TypeScript. Questions come from the [Open Trivia DB](https://opentdb.com/).

Live demo: https://bojanognjen.github.io/Quizzical/

## Scripts

```bash
npm install
npm run dev      # start dev server at http://localhost:3000/Quizzical
npm run build    # static export to out/
npm run lint
npm run deploy   # build and publish out/ to GitHub Pages
```

## Project structure

```
src/
├── app/
│   ├── layout.tsx       # root layout: <html>, <body>, global styles, page title
│   ├── page.tsx         # the / route, renders <Quiz />
│   ├── globals.css      # CSS reset / globals
│   ├── app.css          # app styles
│   └── icon.svg         # favicon
├── components/          # Quiz (client component), StartScreen, GameScreen, Question
├── api/trivia.ts        # fetches and decodes questions
└── types.ts             # shared API types
```

The app is built as a static export (`output: "export"` in `next.config.ts`) so it can be hosted on GitHub Pages. `public/.nojekyll` stops GitHub Pages from hiding the `_next/` folder.