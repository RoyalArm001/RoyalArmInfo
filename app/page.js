import fs from "node:fs";
import path from "node:path";
import Hero from "./portfolio/Hero";
import Hero3D from "./portfolio/Hero3D";
import PortfolioInteractions from "./portfolio/PortfolioInteractions";
import PortfolioNavigation from "./portfolio/PortfolioNavigation";
import "./portfolio/portfolio.css";

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
  const markup = getPortfolioMarkup();
  const [, content] = markup.split(/<!-- Hero Section -->[\s\S]*?<!-- About Me Section -->/);
  return (
    <main id="main-content" className="portfolio-page">
      <Hero3D fixed />
      <PortfolioNavigation />
      <Hero />
      <div className="portfolio-markup" dangerouslySetInnerHTML={{ __html: content }} />
      <PortfolioInteractions />
    </main>
  );
}
