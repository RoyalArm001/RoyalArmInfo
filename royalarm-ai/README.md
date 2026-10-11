# RoyalArm AI

**RoyalArm AI** is a sleek, secure personal AI text chat assistant deployed on Vercel at [ai.royalarm.uk](https://ai.royalarm.uk).

Built with **Next.js App Router**, **TypeScript**, and **Tailwind CSS**. The chat interface and local history work before an AI provider is connected.

---

## Key Features

- **Arm AI connection**: Server-side AI integration can be configured when provider credentials are available. Until then, the UI and local history are usable, but AI replies are unavailable.
- **Server-Enforced Plans and Model Selection**: Free and Pro model catalogs, actual model IDs sent to the provider, per-plan request budgets, and access checks on every protected provider route. The active personal plan is configured by the server; browser storage cannot unlock Pro.
- **Reusable Assistant Templates**: General, English practice, Armenian–English translation, travel, work/IT English, Delphi/programming, and voice practice. Template instructions are held on the server; favorites are stored locally.
- **Plans, Model Catalog, Previews**: `/plans`, `/models`, `/preview/free`, `/preview/pro`, `/templates`, and `/templates/[slug]`. Demo pages do not change plans or take payment.
- **Strict Privacy by Design**:
  - **Zero Server Databases**: No Supabase, MySQL, or backend conversation store.
  - **No Content Logging**: Server routes never log conversation messages.
  - **OpenAI `store: false`**: OpenAI does not retain messages for model training or evals.
  - **Local Device Storage**: Conversations are stored locally on the user's device in **IndexedDB**.
- **Multi-Conversation Management**: Create, view, switch, and delete conversations with history restored across browser reloads.
- **No password screen**: The application opens directly. API routes validate same-origin requests and apply rate limits.
- **Rich Aesthetics**: Responsive dark navy theme (`#050913`, `#0a1326`) with neon cyan accents (`#06b6d4`, `#22d3ee`).
- **Safe Markdown & Code Blocks**: Clean markdown rendering, fenced code blocks with language badges, and one-click copy buttons.
- **Controls & Error Recovery**:
  - Enter to send, Shift+Enter for newline.
  - Real-time "Stop generating" abort button via `AbortController`.
  - Clear error states and one-click "Retry" for interrupted streams.
- **Separate Assistant Prompt Module**: Assistant instructions isolated in `lib/system-prompt.ts` for straightforward customization.
- **Footer Links**: Direct links to [royalarm.uk](https://royalarm.uk) and [youtube.com/@RoyalArm001](https://youtube.com/@RoyalArm001).

---

## File Structure

```
royalarm-ai/
├── app/
│   ├── api/
│   │   ├── chat/route.ts        # Server-side model/template access checks and streaming
│   │   ├── realtime/route.ts    # Protected ephemeral realtime credentials
│   │   ├── speech/route.ts      # Protected text-to-speech
│   │   ├── transcribe/route.ts  # Protected audio transcription
│   │   └── translate/route.ts   # Protected Armenian–English translation
│   ├── models/, plans/, templates/, preview/ # Catalog and demonstration pages
│   ├── globals.css              # Custom dark navy & cyan styles, animations
│   ├── icon.svg                 # SVG favicon
│   ├── layout.tsx               # Root HTML layout with viewport & metadata
│   └── page.tsx                 # Server entry checking session and loading Chat
├── components/
│   ├── brand.tsx                # Sparkle emblem brand icon
│   ├── chat.tsx                 # Main chat client: IndexedDB, streaming, sidebar
│   └── markdown.tsx             # Safe markdown renderer with copyable code blocks
├── lib/
│   ├── history.ts               # Local browser IndexedDB client database wrapper
│   ├── http.ts                  # Request validation, sameOrigin & JSON parsing
│   ├── limits.ts                # Request byte, char, token, and context bounds
│   ├── rate-limit.ts            # Rate limiting helper
│   ├── read-stream.ts           # NDJSON streaming reader for client
│   ├── system-prompt.ts         # Server-only assistant instructions module
│   └── validate-chat.ts         # Payload validation for chat messages
├── .env.example                 # Example environment variables template
├── next.config.ts               # Next.js configuration and security headers
├── package.json                 # Dependencies and build scripts
├── postcss.config.mjs           # PostCSS configuration with Tailwind
└── tsconfig.json                # TypeScript configuration
```

---

## Local Setup

### 1. Prerequisites
- Node.js 20 or higher (Node 24 recommended)
- An API key is optional. Without one, the app runs in local-only mode: conversations and learning data are saved in IndexedDB, but AI replies are not generated.

### 2. Installation
```bash
# Navigate to the project directory
cd royalarm-ai

# Install dependencies
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Configure these server-only values to enable live AI replies. Leave the key unset to use local-only mode:
```env
# Optional server-only provider key
OPENAI_API_KEY=sk-...

# Server-side application plan and model IDs
AI_ACTIVE_PLAN=free
OPENAI_FREE_MODEL=gpt-4.1-mini
OPENAI_FREE_ECONOMY_MODEL=gpt-4o-mini
OPENAI_PRO_MODEL=gpt-4.1

```

See [`.env.example`](./.env.example) for optional context/output budgets, rate limits, plan display prices, and provider model configuration. Only set a price after configuring a real price. Plan display prices are informational; this personal app deliberately has no checkout or plan-switch UI.

### Free/Pro, model availability, and provider billing

`AI_ACTIVE_PLAN` is an operator-controlled server setting (`free` by default). Pro access is checked by the server on each AI request. It is not read from local storage. The Free app plan uses economical configured models; Pro adds the configured advanced model and larger application request budgets.

**Free is an application plan, not a promise of free provider API usage.** Requests use the configured provider credentials and may incur charges. Provider billing, usage tiers, quotas, and rate limits are managed separately by the provider. This app does not promise complimentary API credits or a provider free quota. Models without an API key are shown as unavailable; Pro-locked models remain visible but cannot be selected.

The model registry's documented maximum limits are based on the provider's model pages. Current published text API prices can be supplied via the optional `OPENAI_*_USD_PER_MILLION` settings; prices are not displayed unless both input and output values for a model are configured. Verify prices and account access against the official live sources before configuring:

- [OpenAI API model catalog](https://developers.openai.com/api/docs/models)
- [OpenAI API pricing](https://developers.openai.com/api/docs/pricing)
- [OpenAI API usage tiers and rate limits](https://developers.openai.com/api/docs/guides/rate-limits)
- [Google Cloud Translation pricing](https://cloud.google.com/translate/pricing)

The built-in catalog defaults are `gpt-4.1-mini` (1,047,576 context / 32,768 output tokens), `gpt-4o-mini` (128,000 / 16,384), and `gpt-4.1` (1,047,576 / 32,768). The server's configurable request budgets default below those provider maximums and are capped by them. Published text prices checked for reference are $0.40/$1.60, $0.15/$0.60, and $2/$8 per million input/output tokens respectively; these values are not shown unless explicitly configured, and provider prices may change.

### Templates and local data

Open `/templates` to search, filter by plan, and save local favorites. A template launch starts a new IndexedDB conversation with the standard Armenian greeting, then the API resolves that template's trusted server-side instructions. Conversation, template ID, selected model ID, and learning data are kept in IndexedDB; storing an ID in the browser never grants access. `/preview/free` and `/preview/pro` are clearly labeled demonstrations only.

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (or the port specified by Next.js) in your browser.

### 5. Verify Production Build
```bash
npm run build
npm run start
```

---

## Vercel Deployment

1. **Push your code to GitHub / GitLab**.
2. **Import into Vercel**:
   - Go to [vercel.com](https://vercel.com) and click **Add New... → Project**.
   - Select your repository.
   - If the repository has `royalarm-ai` in a subdirectory, set **Root Directory** to `royalarm-ai`.
   - Vercel automatically detects the **Next.js** framework.
3. **Set Environment Variables**:
   Under **Project Settings → Environment Variables**, add:
   - `OPENAI_API_KEY` — Optional server-only provider key (mark as sensitive); omit it for local-only mode.
   - `OPENAI_MODEL` — e.g. `gpt-4o-mini`
4. **Deploy**: Click **Deploy**. Vercel will build and launch your site.

---

## Custom Domain Setup (`ai.royalarm.uk`)

To bind your custom domain to your Vercel deployment:

1. **Add Domain in Vercel**:
   - Go to **Project Settings → Domains**.
   - Enter `ai.royalarm.uk` and click **Add**.
2. **Configure DNS Records**:
   - Log in to your DNS provider for `royalarm.uk` (e.g. Cloudflare, Namecheap, Route 53).
   - Add a CNAME record:
     | Type  | Name | Value / Target          | TTL  |
     |-------|------|-------------------------|------|
     | CNAME | `ai` | `cname.vercel-dns.com.` | Auto |
   - *(If using Cloudflare, set proxy status to DNS Only or Full/Strict SSL)*.
3. **SSL Certificate**:
   - Vercel automatically issues and renews a free Let's Encrypt SSL/TLS certificate once DNS propagation completes (usually within 1-5 minutes).
4. **Test Domain**:
   - Visit `https://ai.royalarm.uk` to verify secure HTTPS connection and authentication.

---

## License & Credits

Developed for **RoyalArm** ([royalarm.uk](https://royalarm.uk)).
Official YouTube: [youtube.com/@RoyalArm001](https://youtube.com/@RoyalArm001).
