import "server-only";
import fs from "node:fs";
import path from "node:path";

export type StoreProductSummary = {
  id: string;
  slug: string;
  title: string;
  developer: string;
  license: string;
  os: string;
  primaryCategory: string;
  categories: string[];
  description?: string;
  descriptionHy?: string;
  officialSite?: string;
};

export type CidrSummary = {
  input: string;
  ip: string;
  prefix: number;
  mask: string;
  wildcard: string;
  network: string;
  broadcast: string;
  firstHost: string;
  lastHost: string;
  gatewaySuggestion: string;
  dhcpStart: string;
  dhcpEnd: string;
  totalAddresses: number;
  usableHosts: number;
  scope: "RFC1918 Private" | "CGNAT (RFC6598)" | "Loopback" | "Public / Special";
};

export type SubnetSlice = {
  index: number;
  cidr: string;
  network: string;
  broadcast: string;
  gateway: string;
  usableRange: string;
  usableHosts: number;
};

export const SIPAN_PROFILE = {
  fullNameHy: "Սիփան Դանիելյան",
  fullNameEn: "Sipan Danielyan",
  brand: "RoyalArm",
  locationHy: "Երևան · Կեչուտ, Հայաստան",
  locationEn: "Yerevan · Kechut, Armenia",
  roles: [
    "Mota-Engil — ՏՏ տեխնիկ (2026 հոկտեմբեր – մինչ օրս)",
    "SmartTech Building, Engineering and Security Technologies — IT Network Engineer (2026 մայիս – մինչ օրս)",
    "Moselle Armenia Jermuk — IT Network Engineer (2024 դեկտեմբեր – 2026 մայիս)",
    "Armath Engineering Laboratory — Ռոբոտաշինության ուսուցիչ և խմբակավար (2019 – 2025)",
  ],
  certifications: [
    "Fortinet NSE 1, NSE 2, NSE 3 Certified in Cybersecurity",
    "FortiGate 7.6 Operator Self-Paced",
    "Cybersecurity and Cloud Fundamentals 1.0",
    "Introduction to Next Generation Firewall 1.0",
    "Planet Training Center — Windows Server, Proxmox VM Maintenance",
    "VS LESSON STUDIO — Ծրագրավորում (Delphi) և ՏՏ",
  ],
  coreStack: [
    "FortiGate NGFW (VLAN, WAN, IPSec/SSL VPN, NAT/VIP, Firewall Policies, Log Diagnostics)",
    "MikroTik RouterOS / Winbox, Aruba, UniFi, Grandstream VoIP",
    "Windows Server, Active Directory (AD DS), DNS, DHCP, GPO, Windows File Sharing",
    "Proxmox VE (KVM/LXC), Backup Server, TrueNAS SCALE / CORE, Nextcloud",
    "Hikvision & Dahua CCTV / NVR / PoE Infrastructure",
    "Delphi / Object Pascal, Next.js, TypeScript, PowerShell, Linux Bash",
  ],
  sites: {
    portfolio: "https://www.royalarm.uk",
    cvHy: "https://www.royalarm.uk/cv/hy",
    cvEn: "https://www.royalarm.uk/cv/en",
    itPlatform: "https://it.royalarm.uk",
    store: "https://shop.royalarm.uk",
    ai: "https://ai.royalarm.uk",
  },
} as const;

const FALLBACK_PRODUCTS: StoreProductSummary[] = [
  {
    id: "winbox",
    slug: "winbox",
    title: "MikroTik Winbox",
    developer: "MikroTik",
    license: "Freeware",
    os: "Windows",
    primaryCategory: "utilities",
    categories: ["network", "utilities", "admin"],
    descriptionHy: "MikroTik RouterOS սարքերի արագ GUI և MAC-level կառավարման գործիք։",
    officialSite: "https://mikrotik.com/download",
  },
  {
    id: "mobaxterm",
    slug: "mobaxterm",
    title: "MobaXterm",
    developer: "Mobatek",
    license: "Freeware Home Edition",
    os: "Windows",
    primaryCategory: "dev",
    categories: ["dev", "network", "utilities", "system"],
    descriptionHy: "SSH, SFTP, RDP, VNC և X11 տերմինալային համալիր գործիք ՏՏ ադմինների համար։",
    officialSite: "https://mobaxterm.mobatek.net/",
  },
  {
    id: "wireshark",
    slug: "wireshark",
    title: "Wireshark",
    developer: "Wireshark Foundation",
    license: "Open Source (GPLv2)",
    os: "Windows, macOS, Linux",
    primaryCategory: "utilities",
    categories: ["network", "security", "utilities"],
    descriptionHy: "Ցանցային փաթեթների խորը վերլուծիչ՝ L2–L7 տրաֆիկի ախտորոշման համար։",
    officialSite: "https://www.wireshark.org/",
  },
  {
    id: "ventoy",
    slug: "ventoy",
    title: "Ventoy",
    developer: "Longpanda",
    license: "Open Source (GPLv3)",
    os: "Windows, Linux",
    primaryCategory: "utilities",
    categories: ["utilities", "system"],
    descriptionHy: "Multi-boot USB ստեղծող՝ ISO/WIM/IMG ֆայլերի համար առանց կրկնակի ֆորմատի։",
    officialSite: "https://www.ventoy.net/",
  },
  {
    id: "veracrypt",
    slug: "veracrypt",
    title: "VeraCrypt",
    developer: "IDRIX",
    license: "Open Source (Apache 2.0)",
    os: "Windows, macOS, Linux",
    primaryCategory: "utilities",
    categories: ["security", "utilities"],
    descriptionHy: "Կրիպտոգրաֆիկ սկավառակների և կոնտեյներների անվտանգ գաղտնագրում։",
    officialSite: "https://www.veracrypt.fr/",
  },
  {
    id: "process-explorer",
    slug: "process-explorer",
    title: "Sysinternals Process Explorer",
    developer: "Microsoft Sysinternals",
    license: "Freeware",
    os: "Windows",
    primaryCategory: "utilities",
    categories: ["system", "utilities", "security"],
    descriptionHy: "Windows պրոցեսների, DLL-ների և հավելվածների ռեսուրսների խորը դիտարկում։",
    officialSite: "https://learn.microsoft.com/sysinternals/",
  },
  {
    id: "chrome",
    slug: "google-chrome",
    title: "Google Chrome",
    developer: "Google LLC",
    license: "Freeware",
    os: "Windows, macOS, Linux",
    primaryCategory: "browsers",
    categories: ["browsers", "utilities"],
    descriptionHy: "Արագ և պաշտպանված վեբ բրաուզեր։",
    officialSite: "https://www.google.com/chrome/",
  },
];

let cachedProducts: StoreProductSummary[] | null = null;

export function getStoreProducts(): StoreProductSummary[] {
  if (cachedProducts) return cachedProducts;

  const candidates = [
    path.join(process.cwd(), "lib", "shopData.js"),
    path.join(process.cwd(), "..", "lib", "shopData.js"),
  ];

  for (const filePath of candidates) {
    try {
      if (!fs.existsSync(filePath)) continue;
      const raw = fs.readFileSync(filePath, "utf8");
      const marker = "export const PRODUCTS = ";
      const start = raw.indexOf(marker);
      if (start < 0) continue;
      const jsonStart = raw.indexOf("[", start);
      const endSemi = raw.lastIndexOf("];");
      if (jsonStart < 0 || endSemi < jsonStart) continue;
      const parsed = JSON.parse(raw.slice(jsonStart, endSemi + 1)) as Array<Record<string, unknown>>;
      if (Array.isArray(parsed) && parsed.length > 0) {
        cachedProducts = parsed.map((item) => ({
          id: String(item.id ?? ""),
          slug: String(item.slug ?? item.id ?? ""),
          title: String(item.title ?? ""),
          developer: String(item.developer ?? "Official Vendor"),
          license: String(item.license ?? "Freeware"),
          os: String(item.os ?? "Cross-platform"),
          primaryCategory: String(item.primaryCategory ?? "utilities"),
          categories: Array.isArray(item.categories) ? item.categories.map(String) : [],
          description: typeof item.description === "string" ? item.description : undefined,
          descriptionHy: typeof item.descriptionHy === "string" ? item.descriptionHy : undefined,
          officialSite: typeof item.officialSite === "string" ? item.officialSite : undefined,
        }));
        return cachedProducts;
      }
    } catch {
      // Fallback to compact built-in list when shopData.js is unavailable.
    }
  }

  cachedProducts = FALLBACK_PRODUCTS;
  return cachedProducts;
}

const SOFTWARE_SYNONYMS: Record<string, string[]> = {
  "ցանց": ["network", "winbox", "wireshark", "putty", "mobaxterm", "nmap", "advanced ip", "angry ip"],
  "տերմինալ": ["ssh", "putty", "mobaxterm", "terminal", "winscp"],
  "ssh": ["mobaxterm", "putty", "winscp", "powershell"],
  "բրաուզեր": ["chrome", "firefox", "brave", "edge", "opera"],
  "արխիվ": ["7-zip", "winrar", "bandizip"],
  "հակավիրուս": ["antivirus", "malware", "security", "kaspersky", "eset", "defender", "veracrypt"],
  "անվտանգ": ["security", "veracrypt", "wireshark", "nmap", "bitwarden", "keepass", "vpn"],
  "ֆլեշ": ["ventoy", "rufus", "balena"],
  "usb": ["ventoy", "rufus", "balena"],
  "ծրագրավոր": ["vscode", "code", "python", "git", "delphi", "notepad", "postman"],
  "օֆիս": ["libreoffice", "office", "pdf", "foxit", "sumatra"],
  "նկար": ["faststone", "paint", "gimp", "sharex", "greenshot"],
  "վիդեո": ["vlc", "obs", "handbrake"],
  "համակարգ": ["sysinternals", "process", "hwinfo", "cpu-z", "crystaldisk", "wiztree", "everything"],
};

export function searchStoreCatalog(query: string, limit = 5): StoreProductSummary[] {
  const products = getStoreProducts();
  const normalized = query.toLowerCase();
  const tokens = normalized
    .split(/[^\p{L}\p{N}._-]+/u)
    .filter((token) => token.length >= 2);

  const expandedTokens = new Set(tokens);
  for (const [key, expansions] of Object.entries(SOFTWARE_SYNONYMS)) {
    if (normalized.includes(key)) {
      expansions.forEach((word) => expandedTokens.add(word));
    }
  }

  const scored = products
    .map((product) => {
      const hay = `${product.title} ${product.id} ${product.slug} ${product.developer} ${product.primaryCategory} ${product.categories.join(" ")} ${product.descriptionHy ?? ""} ${product.description ?? ""}`.toLowerCase();
      let score = 0;
      if (normalized.includes(product.title.toLowerCase()) || normalized.includes(product.id.toLowerCase())) {
        score += 20;
      }
      for (const token of expandedTokens) {
        if (product.title.toLowerCase().includes(token) || product.id.toLowerCase().includes(token)) {
          score += 8;
        } else if (hay.includes(token)) {
          score += 3;
        }
      }
      return { product, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((item) => item.product);
}

function ipToUint32(ip: string): number | null {
  const parts = ip.split(".");
  if (parts.length !== 4) return null;
  let value = 0;
  for (const part of parts) {
    if (!/^\d+$/.test(part)) return null;
    const octet = Number(part);
    if (octet < 0 || octet > 255) return null;
    value = ((value << 8) | octet) >>> 0;
  }
  return value;
}

function uint32ToIp(value: number): string {
  return [
    (value >>> 24) & 255,
    (value >>> 16) & 255,
    (value >>> 8) & 255,
    value & 255,
  ].join(".");
}

function classifyIpv4Scope(ipUint: number): CidrSummary["scope"] {
  const a = (ipUint >>> 24) & 255;
  const b = (ipUint >>> 16) & 255;
  if (a === 10 || (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168)) {
    return "RFC1918 Private";
  }
  if (a === 100 && b >= 64 && b <= 127) return "CGNAT (RFC6598)";
  if (a === 127) return "Loopback";
  return "Public / Special";
}

export function analyzeIpv4Cidr(rawText: string): { summary: CidrSummary; splits?: SubnetSlice[] } | null {
  const cidrMatch = rawText.match(/\b(\d{1,3}(?:\.\d{1,3}){3})\/(\d{1,2})\b/);
  let ipStr = cidrMatch?.[1];
  let prefix = cidrMatch ? Number(cidrMatch[2]) : NaN;

  if (!cidrMatch) {
    const bareIp = rawText.match(/\b((?:10|172|192)\.\d{1,3}\.\d{1,3}\.\d{1,3})\b/);
    if (!bareIp) return null;
    ipStr = bareIp[1];
    prefix = 24;
  }

  if (!ipStr || !Number.isInteger(prefix) || prefix < 0 || prefix > 32) return null;
  const ipUint = ipToUint32(ipStr);
  if (ipUint === null) return null;

  const maskUint = prefix === 0 ? 0 : (0xffffffff << (32 - prefix)) >>> 0;
  const wildcardUint = (~maskUint) >>> 0;
  const networkUint = (ipUint & maskUint) >>> 0;
  const broadcastUint = (networkUint | wildcardUint) >>> 0;
  const totalAddresses = Math.pow(2, 32 - prefix);

  let usableHosts = Math.max(0, totalAddresses - 2);
  let firstHostUint = networkUint + 1;
  let lastHostUint = broadcastUint - 1;
  if (prefix === 32) {
    usableHosts = 1;
    firstHostUint = networkUint;
    lastHostUint = networkUint;
  } else if (prefix === 31) {
    usableHosts = 2;
    firstHostUint = networkUint;
    lastHostUint = broadcastUint;
  }

  const dhcpStartUint = usableHosts >= 30 ? networkUint + 20 : firstHostUint;
  const dhcpEndUint = usableHosts >= 30 ? Math.min(lastHostUint, networkUint + 220) : lastHostUint;

  const summary: CidrSummary = {
    input: `${ipStr}/${prefix}`,
    ip: ipStr,
    prefix,
    mask: uint32ToIp(maskUint),
    wildcard: uint32ToIp(wildcardUint),
    network: uint32ToIp(networkUint),
    broadcast: uint32ToIp(broadcastUint),
    firstHost: uint32ToIp(firstHostUint >>> 0),
    lastHost: uint32ToIp(lastHostUint >>> 0),
    gatewaySuggestion: uint32ToIp(firstHostUint >>> 0),
    dhcpStart: uint32ToIp(dhcpStartUint >>> 0),
    dhcpEnd: uint32ToIp(dhcpEndUint >>> 0),
    totalAddresses,
    usableHosts,
    scope: classifyIpv4Scope(networkUint),
  };

  // Check if user requested subnetting/VLAN splitting (e.g. "4 vlan", "split 4", "բաժանիր 4")
  const splitMatch = rawText.match(/(?:split|divide|բաժան\p{L}*|մաս\p{L}*|vlan\p{L}*|ենթացանց\p{L}*)\s*[:=-]?\s*(\d{1,2})|\b(\d{1,2})\s*(?:subnet|subnets|vlan|vlans|մաս|ենթացանց)/iu);
  const requestedCount = Number(splitMatch?.[1] || splitMatch?.[2] || 0);
  if (requestedCount >= 2 && requestedCount <= 16 && prefix <= 29) {
    const bitsNeeded = Math.ceil(Math.log2(requestedCount));
    const subPrefix = prefix + bitsNeeded;
    if (subPrefix <= 30) {
      const blockSize = Math.pow(2, 32 - subPrefix);
      const splits: SubnetSlice[] = [];
      for (let i = 0; i < requestedCount; i++) {
        const subNet = (networkUint + i * blockSize) >>> 0;
        const subBroadcast = (subNet + blockSize - 1) >>> 0;
        splits.push({
          index: i + 1,
          cidr: `${uint32ToIp(subNet)}/${subPrefix}`,
          network: uint32ToIp(subNet),
          broadcast: uint32ToIp(subBroadcast),
          gateway: uint32ToIp((subNet + 1) >>> 0),
          usableRange: `${uint32ToIp((subNet + 1) >>> 0)} – ${uint32ToIp((subBroadcast - 1) >>> 0)}`,
          usableHosts: blockSize - 2,
        });
      }
      return { summary, splits };
    }
  }

  return { summary };
}

export function analyzeCctvSizing(rawText: string) {
  const camMatch = rawText.match(/\b(\d{1,3})\s*(?:camera|cameras|cam|խցիկ|տեսախցիկ|չանել|ch\b)/iu);
  const cameras = camMatch ? Math.min(256, Math.max(1, Number(camMatch[1]))) : 16;
  const daysMatch = rawText.match(/\b(\d{1,3})\s*(?:day|days|օր|օրվա)/iu);
  const days = daysMatch ? Math.min(365, Math.max(1, Number(daysMatch[1]))) : 30;
  const mpMatch = rawText.match(/\b(2|4|5|6|8|12)\s*mp\b/iu);
  const is4k = /4k|8\s*mp/iu.test(rawText);
  const mp = is4k ? 8 : mpMatch ? Number(mpMatch[1]) : 4;

  // Realistic H.265 continuous bitrate guidelines (Mbps per camera)
  const bitratePerCamMbps = mp <= 2 ? 2.0 : mp <= 4 ? 3.5 : mp <= 5 ? 4.5 : 7.0;
  const totalMbps = Number((cameras * bitratePerCamMbps).toFixed(1));
  // 1 Mbps for 1 day = ~10.8 GB; TB = (Mbps * 86400 * days) / 8 / 1e12
  const storageTbExact = (totalMbps * 86_400 * days) / 8 / 1_000_000;
  const recommendedTb = Math.ceil(storageTbExact * 1.15); // +15% filesystem/safety overhead
  const poeTypicalWatts = cameras * 7;
  const poeMaxBudgetWatts = cameras * 15.4;

  return {
    cameras,
    days,
    mp,
    bitratePerCamMbps,
    totalMbps,
    storageTbExact: Number(storageTbExact.toFixed(2)),
    recommendedTb,
    poeTypicalWatts: Math.round(poeTypicalWatts),
    poeMaxBudgetWatts: Math.round(poeMaxBudgetWatts),
  };
}

const BILINGUAL_IT_LEXICON: Array<{ en: string; hy: string; ru: string; noteHy: string }> = [
  { en: "subnet mask", hy: "ենթացանցի դիմակ", ru: "маска подсети", noteHy: "Որոշում է IP հասցեի ցանցային և հոսթային հատվածները" },
  { en: "gateway", hy: "անցուղի (հիմնական դարպաս)", ru: "шлюз по умолчанию", noteHy: "Երթուղիչի IP հասցեն, որով տրաֆիկը դուրս է գալիս այլ ցանցեր" },
  { en: "firewall policy", hy: "ֆայրվոլի կանոն", ru: "политика межсетевого экрана", noteHy: "Որոշում է թույլատրված/արգելված տրաֆիկը գոտիների միջև" },
  { en: "port forwarding", hy: "պորտերի ուղղորդում (DNAT / VIP)", ru: "проброс портов", noteHy: "Արտաքին IP/պորտից հարցումը փոխանցում է ներքին սերվերին" },
  { en: "backup", hy: "պահուստային կրկնօրինակում", ru: "резервное копирование", noteHy: "Կանոն 3-2-1՝ տվյալների անվտանգ վերականգնման համար" },
  { en: "failover", hy: "ավտոմատ պահեստային անցում", ru: "отказоустойчивое переключение", noteHy: "Հիմնական կապուղու խափանման դեպքում անցում երկրորդ ISP-ին" },
  { en: "latency", hy: "ուշացում (ping/պատասխանի ժամանակ)", ru: "задержка сети", noteHy: "Փաթեթի երկկողմանի անցման ժամանակը միլիվայրկյաններով" },
  { en: "packet loss", hy: "փաթեթների կորուստ", ru: "потеря пакетов", noteHy: "Երբ ուղարկված փաթեթները չեն հասնում նշանակակետին" },
  { en: "virtual machine", hy: "վիրտուալ մեքենա", ru: "виртуальная машина", noteHy: "Մեկուսացված օպերացիոն համակարգ Proxmox կամ այլ հիպերվիզորում" },
  { en: "active directory", hy: "Active Directory (կենտրոնացված դոմենային կառավարում)", ru: "Active Directory (доменная служба)", noteHy: "Օգտատերերի, համակարգիչների և GPO քաղաքականությունների կառավարում" },
  { en: "access violation", hy: "հիշողության հասանելիության սխալ", ru: "ошибка доступа к памяти", noteHy: "Delphi/Win32-ում հաճախ առաջանում է nil pointer կամ ազատված օբյեկտ կանչելիս" },
  { en: "troubleshoot", hy: "ախտորոշել և շտկել խնդիրը", ru: "диагностировать неисправность", noteHy: "Փուլային ստուգում պատճառը գտնելու համար" },
];

export function lookupBilingualTerms(text: string) {
  const q = text.toLowerCase();
  const hits = BILINGUAL_IT_LEXICON.filter(
    (entry) =>
      q.includes(entry.en) ||
      q.includes(entry.hy.toLowerCase()) ||
      q.includes(entry.ru.toLowerCase()) ||
      q.split(/\s+/).some((w) => w.length >= 3 && (entry.en.includes(w) || entry.hy.toLowerCase().includes(w)))
  );
  return hits.slice(0, 6);
}

