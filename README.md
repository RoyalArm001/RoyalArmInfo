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

- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`
- `ADMIN_PASSWORD`
- `ADMIN_SESSION_SECRET`

Their expected format is documented in `.env.example`. Do not upload a real
`.env` file or commit production secrets.

## Structure

- `app/` — Next.js App Router pages, API routes, SEO files, and components
- `lib/` — Upstash Redis and admin authentication helpers
- `public/` — runtime images, icons, CSS, and browser scripts
- `index.html` — homepage content read during the Next.js build
