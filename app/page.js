import fs from "node:fs";
import path from "node:path";
import LiveHackMap from "./LiveHackMap";

function getPortfolioMarkup() {
  const source = fs.readFileSync(path.join(process.cwd(), "index.html"), "utf8");
  const body = source.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? "";

  return body
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(
      /<!-- Add a real (?:LinkedIn|GitHub) URL before making this item visible\. -->\s*<li class="hidden">[\s\S]*?<\/li>/gi,
      ""
    )
    .replace(
      /<!-- Add a real (?:LinkedIn|GitHub) URL before making this link visible\. -->\s*<a[^>]*class="group hidden"[^>]*>[\s\S]*?<\/a>/gi,
      ""
    )
    .replace(/<!-- Contact Section -->[\s\S]*?<\/section>/i, "")
    .replace(
      /(\s)(src|href)="(?![a-z][a-z0-9+.-]*:|#|\/)([^"]+)"/gi,
      '$1$2="/$3"'
    );
}

export default function HomePage() {
  return (
    <>
      <LiveHackMap />
      <main id="main-content" dangerouslySetInnerHTML={{ __html: getPortfolioMarkup() }} />
    </>
  );
}
