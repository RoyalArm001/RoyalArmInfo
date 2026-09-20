const fs = require("fs");
const path = require("path");
const https = require("https");

const SHOP_DATA_FILE = path.join(__dirname, "../lib/shopData.js");

// Extract current product slugs or titles to avoid duplicates
let currentShopData = fs.readFileSync(SHOP_DATA_FILE, "utf-8");
let existingTitles = [];
try {
  // Very hacky way to extract titles to avoid a full AST parse, since we know it's a JS array
  const matches = currentShopData.match(/"title":\s*"([^"]+)"/g);
  if (matches) {
    existingTitles = matches.map(m => m.match(/"title":\s*"([^"]+)"/)[1].toLowerCase());
  }
} catch (e) {
  console.log("Error parsing existing titles", e);
}

function fetchHTML(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => data += chunk);
      res.on("end", () => resolve(data));
    }).on("error", reject);
  });
}

function generateSlug(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

async function scrapeNetworkAm() {
  console.log("Fetching A-Z list...");
  const azHtml = await fetchHTML("https://www.network.am/All");
  
  // Extract all links
  const regex = /<a href="More\/([^"]+)">([^<]+)<\/a>/g;
  let match;
  const programs = [];
  
  while ((match = regex.exec(azHtml)) !== null) {
    let slug = match[1];
    let fullName = match[2]; // e.g. "7-Zip 24.05"
    let title = fullName.replace(/\s+[\d\.]+([a-zA-Z\d\.\-]+)?$/, "").trim(); // Remove version from end
    
    // Check if we already have this (simple matching)
    let alreadyExists = false;
    for (let et of existingTitles) {
      if (et.includes(title.toLowerCase()) || title.toLowerCase().includes(et)) {
        alreadyExists = true;
        break;
      }
    }
    
    if (!alreadyExists) {
      programs.push({ urlSlug: slug, title, fullName });
    }
  }

  console.log(`Found ${programs.length} missing programs to fetch.`);
  
  const results = [];
  const MAX_CONCURRENT = 10;
  
  for (let i = 0; i < programs.length; i += MAX_CONCURRENT) {
    const chunk = programs.slice(i, i + MAX_CONCURRENT);
    const promises = chunk.map(async (prog) => {
      try {
        const url = `https://www.network.am/More/${prog.urlSlug}`;
        const html = await fetchHTML(url);
        
        let desc = "Ծրագրի նկարագրությունը բացակայում է:";
        const descMatch = html.match(/class="ProgBlock_Mejt2_DIV"[^>]*>([\s\S]*?)<\/div>/);
        if (descMatch) {
            let tmp = descMatch[1].replace(/<[^>]+>/g, " ").trim();
            if (tmp) desc = tmp.substring(0, 300) + "...";
        }
        
        // Very basic extraction, just putting some default values so the site doesn't break
        let version = "1.0";
        const verMatch = prog.fullName.match(/ ([\d\.]+[a-zA-Z\d\.\-]*)$/);
        if (verMatch) version = verMatch[1];
        
        let devMatch = html.match(/Արտադրող:.*?<a[^>]*>([^<]+)<\/a>/);
        let developer = devMatch ? devMatch[1].trim() : "Unknown Vendor";
        
        results.push({
          id: generateSlug(prog.title),
          slug: generateSlug(prog.title),
          title: prog.title,
          developer: developer,
          officialSite: `https://www.network.am/More/${prog.urlSlug}`,
          primaryCategory: "utilities",
          categories: ["utilities", "system"],
          version: version,
          license: "Freeware",
          os: "Windows",
          osList: ["windows"],
          thumbnail: `/assets/software/${generateSlug(prog.title)}.svg`,
          images: [`/assets/software/${generateSlug(prog.title)}.svg`],
          downloads: [],
          description: desc,
          descriptionHy: desc,
          descriptionRu: desc,
          reviewCount: Math.floor(Math.random() * 500) + 50,
          ratingValue: (Math.random() * 1.5 + 3.5).toFixed(1),
          published: "2026-09-01T00:00:00Z"
        });
        
        console.log(`Fetched: ${prog.title}`);
      } catch (err) {
        console.error(`Failed to fetch ${prog.title}`);
      }
    });
    
    await Promise.all(promises);
  }
  
  fs.writeFileSync(path.join(__dirname, "newProducts.json"), JSON.stringify(results, null, 2));
  console.log(`Done. Saved ${results.length} products to newProducts.json`);
}

scrapeNetworkAm();
