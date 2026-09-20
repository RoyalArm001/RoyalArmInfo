# Sipan Danielyan — Portfolio

Next.js portfolio for IT support, network engineering, server administration,
Hikvision CCTV, monitoring systems, web development, and remote service requests.

## Run locally

Requires Node.js 24.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Verify a production build

```bash
npm ci
npm run build
npm start
```

## Deploy to Vercel

The repository root is the Next.js project root, so Vercel should detect the
**Next.js** framework automatically. Keep the Root Directory empty and use the
default install, build, and output settings.

Add these variables in **Vercel → Project Settings → Environment Variables**
for both Production and Preview:

- `ROYALARM_IT_REDIS_REST_URL`
- `ROYALARM_IT_REDIS_REST_TOKEN`
- `ROYALARM_IT_ADMIN_PASSWORD`
- `ROYALARM_IT_SESSION_SECRET`

Their expected format is documented in `.env.example`. Do not upload a real
`.env` file or commit production secrets.

## Structure

- `app/` — Next.js App Router pages, API routes, SEO files, and components
- `lib/` — Upstash Redis and admin authentication helpers
- `public/` — runtime images, icons, CSS, and browser scripts
- `index.html` — homepage content read during the Next.js build

## Portfolio experience

The homepage retains its existing content in `index.html`; its hero is rendered
by `app/portfolio/Hero.js`. Homepage styles are scoped in
`app/portfolio/portfolio.css`, so the IT app and admin keep their own layouts.

`Hero3D` loads Three.js after hydration. `ParticleField` batches the particles in
one GPU buffer and uses shaders for ambient motion, pointer displacement, and
click ripples. `NetworkSphere` batches the orbital paths. There are two scene
draw calls, without a full-screen bloom pass or particle DOM elements.

The scene uses up to 16,000 particles on desktop and 5,000 on mobile, caps pixel
density, and reduces quality after sustained slow frames. The particle scene is
rendered as a fixed background across the full homepage, remaining visible behind
the sections while scrolling. Rendering stops when the homepage leaves the
viewport or the browser tab is hidden. Reduced-motion users get a static scene;
a pause control is available otherwise. A CSS illustration remains visible if
WebGL2 is unavailable or its context is lost.

CV files live in `public/cv/`. Each language has separate preview and download
links in the existing Resume section. Translation strings remain in
`public/i18n/translations.json`.
