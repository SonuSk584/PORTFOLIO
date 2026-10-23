# Sonu Thakur — Portfolio

React 18 + Vite + Tailwind CSS v4 + Framer Motion + lucide-react.

## Run locally
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run preview    # test the production build
```

## Update content
Everything lives in `src/data/portfolio.js`. Add an item to `projects`, `skills`, `experience`, `certifications` or `faq` (the "Ask Sonu" answers) and save. Images go in `public/images/`.

## Contact form (free, Web3Forms)
1. Get a key at https://web3forms.com (enter your email, the key is mailed to you).
2. `cp .env.example .env` and set `VITE_WEB3FORMS_KEY=your-key` (restart `npm run dev`).
3. On Vercel/Netlify/Render add the same variable in the project's environment settings.

## Deploy
- Vercel / Netlify: import the repo; build `npm run build`, output `dist`.
- Render (Static Site): build `npm install && npm run build`, publish directory `dist`.

## Keyboard
`Ctrl/Cmd + K` or `/` opens the palette. Type a question (more than one word) to use Ask Sonu.
