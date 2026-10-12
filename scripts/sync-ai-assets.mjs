import { cpSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// The repository deploys several sites together. Keep the AI source assets in
// its standalone app while publishing a separate namespace for the root app.
const repository = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const destination = resolve(repository, "public/ai-assets");
mkdirSync(destination, { recursive: true });
cpSync(resolve(repository, "royalarm-ai/public"), destination, { recursive: true });
