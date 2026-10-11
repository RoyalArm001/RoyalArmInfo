# RoyalArm AI

**RoyalArm AI** is a personal AI chat website built with Next.js App Router, TypeScript, Tailwind CSS, and the official OpenAI SDK. Designed for deployment on Vercel at [ai.royalarm.uk](https://ai.royalarm.uk).

---

## Quick Start

### 1. Run RoyalArm AI
```bash
# Enter the application directory
cd royalarm-ai

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
# Set OPENAI_API_KEY, CHAT_PASSWORD (12+ chars), and SESSION_SECRET (32+ chars)

# Run dev server
npm run dev
```

Alternatively, from the repository root:
```bash
npm run dev
```

---

## Features

- **Streaming Responses**: Real-time server-side streaming via `/api/chat` using official OpenAI SDK.
- **Privacy First (`store: false`)**:
  - No database on the server (no Supabase, MySQL).
  - No server logging of conversations.
  - History stored in browser **IndexedDB** on the user's device.
  - OpenAI API called with `store: false` to ensure no model training or persistent retention.
- **Single-User Password Login**:
  - Protected with server-only `CHAT_PASSWORD` and `SESSION_SECRET`.
  - Cryptographically signed HMAC-SHA256 HttpOnly session cookies.
- **Multi-Conversation Support**: Create, rename, switch, and delete conversations locally; restored across reloads.
- **Controls & Error Handling**:
  - Enter to send, Shift+Enter for new line.
  - "Stop generating" abort button via `AbortController`.
  - Clear alerts for missing configuration, failed requests, and interrupted streams with retry button.
- **Safe Markdown Rendering**: Fenced code blocks with language labels and one-click copy buttons.
- **Dark Navy & Cyan Interface**: Responsive palette (`#050913`, `#0a1326`, cyan `#06b6d4` / `#22d3ee`) styled for phones and desktops.
- **Customizable Assistant Instructions**: System prompt isolated in `royalarm-ai/lib/system-prompt.ts`.
- **Branding & Footer**: Links to [royalarm.uk](https://royalarm.uk) and [youtube.com/@RoyalArm001](https://youtube.com/@RoyalArm001).

---

## Deployment & Custom Domain

Detailed instructions for Vercel deployment, environment variables, and binding `ai.royalarm.uk` are documented in [royalarm-ai/README.md](./royalarm-ai/README.md).
