// Verified Software Catalog with Official Vendor Sources
// Inspired by Network.am Knowledge Base, Curated by Sipan Danielyan & RoyalArm
export const SHOP_CATEGORIES = [
  {
    "id": "all",
    "label": "All Software",
    "labelHy": "Բոլոր Ծրագրերը",
    "labelRu": "Все Программы",
    "icon": "grid"
  },
  {
    "id": "browsers",
    "label": "Browsers & Web",
    "labelHy": "Բրաուզերներ և Ցանց",
    "labelRu": "Браузеры и Сеть",
    "icon": "globe"
  },
  {
    "id": "office",
    "label": "Office & Productivity",
    "labelHy": "Գրասենյակային և Օֆիս",
    "labelRu": "Офис и Документы",
    "icon": "file-text"
  },
  {
    "id": "dev",
    "label": "Developer Tools",
    "labelHy": "Ծրագրավորում և ՏՏ",
    "labelRu": "Инструменты Разработки",
    "icon": "code"
  },
  {
    "id": "design",
    "label": "Design & 3D",
    "labelHy": "Գրաֆիկա և 3D Դիզայն",
    "labelRu": "Дизайн и 3D Графика",
    "icon": "image"
  },
  {
    "id": "utilities",
    "label": "System & Tools",
    "labelHy": "Համակարգային Կոմունալներ",
    "labelRu": "Система и Утилиты",
    "icon": "shield"
  },
  {
    "id": "media",
    "label": "Multimedia & Players",
    "labelHy": "Մուլտիմեդիա և Փլեյերներ",
    "labelRu": "Медиа и Стриминг",
    "icon": "play"
  }
];

export const PRODUCTS = [
  {
    "id": "chrome",
    "slug": "google-chrome",
    "title": "Google Chrome",
    "developer": "Google LLC",
    "officialSite": "https://www.google.com/chrome/",
    "primaryCategory": "browsers",
    "categories": [
      "browsers",
      "internet",
      "google",
      "utilities"
    ],
    "version": "130.0",
    "license": "Freeware",
    "os": "Windows 11/10 (64-bit), macOS, Linux, Android, iOS",
    "osList": [
      "windows",
      "macos",
      "linux"
    ],
    "thumbnail": "/assets/software/chrome.svg",
    "images": [
      "/assets/software/chrome.svg"
    ],
    "downloads": [
      {
        "name": "Google Chrome Official Standalone (Windows 64-bit)",
        "size": "105 MB",
        "format": "EXE",
        "url": "https://www.google.com/chrome/"
      },
      {
        "name": "Google Chrome for macOS (Apple Silicon / Intel)",
        "size": "210 MB",
        "format": "DMG",
        "url": "https://www.google.com/chrome/?platform=mac"
      },
      {
        "name": "Google Chrome for Linux (Debian/Ubuntu)",
        "size": "98 MB",
        "format": "DEB",
        "url": "https://www.google.com/chrome/?platform=linux"
      }
    ],
    "description": "The world's most popular web browser built for speed, simplicity, and security with instant Google services synchronization.",
    "descriptionHy": "Աշխարհի ամենահայտնի և արագ վեբ բրաուզերը Google-ից՝ ակնթարթային սինխրոնիզացիայով, անվտանգության համակարգով և հարուստ ընդլայնումների բազայով։",
    "descriptionRu": "Самый популярный и быстрый веб-браузер от Google со встроенной синхронизацией, защитой и обширным магазином расширений.",
    "fullText": "Google Chrome is a fast, simple, and secure web browser, built for the modern web. With automatic security updates, phishing protection, built-in translation, developer tools, and seamless synchronization across phone, tablet, and PC.",
    "features": [
      "Fast V8 JavaScript Engine",
      "Integrated Google Translate & Lens",
      "Password Manager & Auto-Fill",
      "Built-in Malware & Phishing Shield",
      "Vast Chrome Web Store Extensions"
    ],
    "systemRequirements": {
      "os": "Windows 10/11 (64-bit), macOS 11+, Ubuntu 20.04+",
      "ram": "4 GB RAM",
      "disk": "500 MB free space",
      "cpu": "Intel Pentium 4 or AMD Athlon 64+"
    },
    "ratingValue": 4.9,
    "reviewCount": 340,
    "published": "2024-10-15",
    "seoKeywords": [
      "Google Chrome",
      "Chrome ներբեռնել",
      "скачать Chrome",
      "Chrome download official",
      "արագ բրաուզեր",
      "Google browser Armenia"
    ]
  },
  {
    "id": "firefox",
    "slug": "mozilla-firefox",
    "title": "Mozilla Firefox",
    "developer": "Mozilla Foundation",
    "officialSite": "https://www.mozilla.org/firefox/new/",
    "primaryCategory": "browsers",
    "categories": [
      "browsers",
      "privacy",
      "open-source"
    ],
    "version": "132.0",
    "license": "Free & Open Source",
    "os": "Windows 11/10/7, macOS, Linux, Android, iOS",
    "osList": [
      "windows",
      "macos",
      "linux"
    ],
    "thumbnail": "/assets/software/firefox.svg",
    "images": [
      "/assets/software/firefox.svg"
    ],
    "downloads": [
      {
        "name": "Mozilla Firefox Official Installer (Windows 64-bit)",
        "size": "62 MB",
        "format": "EXE",
        "url": "https://www.mozilla.org/firefox/new/"
      },
      {
        "name": "Mozilla Firefox for macOS",
        "size": "135 MB",
        "format": "DMG",
        "url": "https://www.mozilla.org/firefox/mac/"
      },
      {
        "name": "Mozilla Firefox for Linux",
        "size": "85 MB",
        "format": "TAR.BZ2",
        "url": "https://www.mozilla.org/firefox/linux/"
      }
    ],
    "description": "Fast, private, and independent web browser backed by the non-profit Mozilla Foundation with strict anti-tracking defense.",
    "descriptionHy": "Արագ, անկախ և գաղտնիությունը պաշտպանող բրաուզեր Mozilla-ից՝ առանց տվյալների գաղտնալսման և ներկառուցված արգելափակմամբ։",
    "descriptionRu": "Быстрый, приватный и независимый браузер от некоммерческой организации Mozilla с мощной защитой от слежки.",
    "fullText": "Mozilla Firefox gives you extreme privacy without compromising speed. Enhanced Tracking Protection automatically blocks third-party trackers, cryptominers, and fingerprinters.",
    "features": [
      "Enhanced Tracking Protection",
      "Multi-Account Containers",
      "Picture-in-Picture Video",
      "Memory Optimized Quantum Engine",
      "Open-Source & Privacy Focused"
    ],
    "systemRequirements": {
      "os": "Windows 7 or later, macOS 10.15+, modern Linux",
      "ram": "2 GB RAM",
      "disk": "400 MB free space",
      "cpu": "1 GHz processor"
    },
    "ratingValue": 4.9,
    "reviewCount": 220,
    "published": "2024-10-18",
    "seoKeywords": [
      "Mozilla Firefox",
      "Firefox ներբեռնել",
      "скачать Firefox",
      "Firefox download",
      "անվտանգ բրաուզեր",
      "Open source browser"
    ]
  },
  {
    "id": "brave",
    "slug": "brave-browser",
    "title": "Brave Browser",
    "developer": "Brave Software, Inc.",
    "officialSite": "https://brave.com/download/",
    "primaryCategory": "browsers",
    "categories": [
      "browsers",
      "privacy",
      "adblock",
      "crypto"
    ],
    "version": "1.71",
    "license": "Free & Open Source",
    "os": "Windows 11/10 (64-bit), macOS, Linux, Android, iOS",
    "osList": [
      "windows",
      "macos",
      "linux"
    ],
    "thumbnail": "/assets/software/brave.svg",
    "images": [
      "/assets/software/brave.svg"
    ],
    "downloads": [
      {
        "name": "Brave Browser Standalone (Windows 64-bit)",
        "size": "118 MB",
        "format": "EXE",
        "url": "https://brave.com/download/"
      },
      {
        "name": "Brave Browser for macOS Universal",
        "size": "230 MB",
        "format": "DMG",
        "url": "https://brave.com/download/"
      },
      {
        "name": "Brave Browser for Linux (Debian / Fedora / Arch)",
        "size": "110 MB",
        "format": "DEB",
        "url": "https://brave.com/linux/"
      }
    ],
    "description": "3x faster browsing with built-in AdBlock, cookie tracker blocking, and native Web3 & AI assistant Leo.",
    "descriptionHy": "3 անգամ ավելի արագ բրաուզեր՝ ներկառուցված գովազդների արգելափակմամբ (AdBlock), գաղտնիության պաշտպանությամբ և AI օգնականով։",
    "descriptionRu": "Браузер со встроенной блокировкой рекламы и трекеров, работающий в 3 раза быстрее обычных браузеров.",
    "fullText": "Brave stops online surveillance, loads content faster, and uses 35% less battery. It shields you from intrusive ads and trackers right out of the box with zero plugins required.",
    "features": [
      "Brave Shields (Zero Ads & Trackers)",
      "Tor Private Windows",
      "Brave Leo AI Assistant",
      "Native Crypto Wallet",
      "Chromium Extension Compatibility"
    ],
    "systemRequirements": {
      "os": "Windows 10/11 (64-bit), macOS 10.15+, Ubuntu 18.04+",
      "ram": "4 GB RAM",
      "disk": "600 MB free space",
      "cpu": "64-bit processor"
    },
    "ratingValue": 4.9,
    "reviewCount": 195,
    "published": "2024-10-20",
    "seoKeywords": [
      "Brave browser",
      "Brave ներբեռնել",
      "скачать Brave",
      "Adblock browser",
      "բրաուզեր առանց գովազդի"
    ]
  },
  {
    "id": "edge",
    "slug": "microsoft-edge",
    "title": "Microsoft Edge",
    "developer": "Microsoft Corporation",
    "officialSite": "https://www.microsoft.com/edge/download",
    "primaryCategory": "browsers",
    "categories": [
      "browsers",
      "microsoft",
      "ai",
      "productivity"
    ],
    "version": "130.0",
    "license": "Freeware",
    "os": "Windows 11/10, macOS, Linux, Android, iOS",
    "osList": [
      "windows",
      "macos",
      "linux"
    ],
    "thumbnail": "/assets/software/edge.svg",
    "images": [
      "/assets/software/edge.svg"
    ],
    "downloads": [
      {
        "name": "Microsoft Edge Official Installer (Windows 11/10)",
        "size": "140 MB",
        "format": "EXE",
        "url": "https://www.microsoft.com/edge/download"
      },
      {
        "name": "Microsoft Edge for macOS",
        "size": "245 MB",
        "format": "PKG",
        "url": "https://www.microsoft.com/edge/download"
      },
      {
        "name": "Microsoft Edge for Linux (.deb / .rpm)",
        "size": "125 MB",
        "format": "DEB",
        "url": "https://www.microsoft.com/edge/download"
      }
    ],
    "description": "Modern Chromium browser from Microsoft with built-in Copilot AI, vertical tabs, and energy efficiency sleeping tabs.",
    "descriptionHy": "Microsoft-ի ժամանակակից Chromium բրաուզերը՝ ներկառուցված Copilot AI-ով, ուղղահայաց թաբերով և մարտկոցի խնայողությամբ։",
    "descriptionRu": "Браузер от Microsoft на базе Chromium с поддержкой Copilot AI, вертикальными вкладками и энергоэффективностью.",
    "fullText": "Microsoft Edge provides world-class performance, built-in security, and smart AI productivity features powered by Microsoft Copilot and DALL-E.",
    "features": [
      "Microsoft Copilot Integration",
      "Sleeping Tabs & Efficiency Mode",
      "Vertical Tabs & Tab Groups",
      "SmartScreen Phishing Protection",
      "Built-in PDF Editor & Read Aloud"
    ],
    "systemRequirements": {
      "os": "Windows 10/11, macOS 10.15+, Linux",
      "ram": "4 GB RAM",
      "disk": "1 GB free space",
      "cpu": "1 GHz processor"
    },
    "ratingValue": 4.8,
    "reviewCount": 160,
    "published": "2024-10-12",
    "seoKeywords": [
      "Microsoft Edge",
      "Edge ներբեռնել",
      "скачать Edge",
      "Edge download",
      "Microsoft browser"
    ]
  },
  {
    "id": "opera",
    "slug": "opera-one",
    "title": "Opera One",
    "developer": "Opera Norway",
    "officialSite": "https://www.opera.com/download",
    "primaryCategory": "browsers",
    "categories": [
      "browsers",
      "vpn",
      "ai"
    ],
    "version": "114.0",
    "license": "Freeware",
    "os": "Windows 11/10, macOS, Linux",
    "osList": [
      "windows",
      "macos",
      "linux"
    ],
    "thumbnail": "/assets/software/opera.svg",
    "images": [
      "/assets/software/opera.svg"
    ],
    "downloads": [
      {
        "name": "Opera One Offline Installer (Windows 64-bit)",
        "size": "108 MB",
        "format": "EXE",
        "url": "https://www.opera.com/download"
      },
      {
        "name": "Opera One for macOS",
        "size": "215 MB",
        "format": "DMG",
        "url": "https://www.opera.com/download"
      }
    ],
    "description": "Next-gen browser featuring Tab Islands, free built-in unlimited VPN, integrated Aria AI, and sidebar messengers.",
    "descriptionHy": "Հարմարավետ բրաուզեր՝ ներկառուցված անվճար VPN-ով, Tab Islands խմբավորմամբ և WhatsApp/Telegram կողային վահանակով։",
    "descriptionRu": "Инновационный браузер с бесплатным встроенным VPN, группировкой вкладок Tab Islands и ИИ Aria.",
    "fullText": "Opera One redesigns the browsing experience with modular AI architecture, Tab Islands for organizing multitasking sessions, and zero-configuration free VPN.",
    "features": [
      "Free Built-in Browser VPN",
      "Tab Islands Grouping",
      "Aria Native AI Assistant",
      "Integrated Telegram, WhatsApp & Discord",
      "Built-in Ad Blocker"
    ],
    "systemRequirements": {
      "os": "Windows 10/11 (64-bit), macOS 10.15+",
      "ram": "4 GB RAM",
      "disk": "800 MB free space",
      "cpu": "Multi-core processor"
    },
    "ratingValue": 4.8,
    "reviewCount": 145,
    "published": "2024-10-08",
    "seoKeywords": [
      "Opera One",
      "Opera ներբեռնել",
      "Opera VPN download",
      "բրաուզեր VPN-ով",
      "скачать оперу"
    ]
  },
  {
    "id": "tor",
    "slug": "tor-browser",
    "title": "Tor Browser",
    "developer": "The Tor Project",
    "officialSite": "https://www.torproject.org/download/",
    "primaryCategory": "browsers",
    "categories": [
      "browsers",
      "privacy",
      "security",
      "open-source"
    ],
    "version": "14.0",
    "license": "Free & Open Source",
    "os": "Windows, macOS, Linux, Android",
    "osList": [
      "windows",
      "macos",
      "linux"
    ],
    "thumbnail": "/assets/software/tor.svg",
    "images": [
      "/assets/software/tor.svg"
    ],
    "downloads": [
      {
        "name": "Tor Browser for Windows (64-bit)",
        "size": "98 MB",
        "format": "EXE",
        "url": "https://www.torproject.org/download/"
      },
      {
        "name": "Tor Browser for macOS",
        "size": "128 MB",
        "format": "DMG",
        "url": "https://www.torproject.org/download/"
      },
      {
        "name": "Tor Browser for Linux (.tar.xz)",
        "size": "92 MB",
        "format": "TAR.XZ",
        "url": "https://www.torproject.org/download/"
      }
    ],
    "description": "Maximum anonymity and censorship circumvention via the decentralized Tor onion routing network.",
    "descriptionHy": "Անանունության առավելագույն մակարդակ և շրջանցում ցանկացած արգելափակում՝ ապակենտրոնացված Tor ցանցի միջոցով։",
    "descriptionRu": "Максимальная конфиденциальность и обход интернет-цензуры через децентрализованную сеть Tor.",
    "fullText": "Tor Browser isolates each website you visit so third-party trackers and ads cannot follow you. Any cookies automatically clear when you are done browsing.",
    "features": [
      "Multi-layered Onion Encryption",
      "Blocks Third-party Trackers & Fingerprinting",
      "Bypasses Regional Censorship",
      "Automatic Cookie Cleansing",
      "No Spyware or Telemetry"
    ],
    "systemRequirements": {
      "os": "Windows 10/11, macOS 10.15+, Linux",
      "ram": "2 GB RAM",
      "disk": "300 MB free space",
      "cpu": "x86/x64 processor"
    },
    "ratingValue": 4.9,
    "reviewCount": 110,
    "published": "2024-10-01",
    "seoKeywords": [
      "Tor Browser",
      "Tor ներբեռնել",
      "скачать Тор браузер",
      "Dark web browser",
      "Anonymous browser Armenia"
    ]
  },
  {
    "id": "vivaldi",
    "slug": "vivaldi-browser",
    "title": "Vivaldi Browser",
    "developer": "Vivaldi Technologies",
    "officialSite": "https://vivaldi.com/download/",
    "primaryCategory": "browsers",
    "categories": [
      "browsers",
      "productivity",
      "customization"
    ],
    "version": "7.0",
    "license": "Freeware",
    "os": "Windows 11/10, macOS, Linux",
    "osList": [
      "windows",
      "macos",
      "linux"
    ],
    "thumbnail": "/assets/software/vivaldi.svg",
    "images": [
      "/assets/software/vivaldi.svg"
    ],
    "downloads": [
      {
        "name": "Vivaldi Official Installer (Windows 64-bit)",
        "size": "115 MB",
        "format": "EXE",
        "url": "https://vivaldi.com/download/"
      },
      {
        "name": "Vivaldi for macOS",
        "size": "235 MB",
        "format": "DMG",
        "url": "https://vivaldi.com/download/"
      }
    ],
    "description": "The power-user browser with endless customization, two-level tab stacking, built-in mail, and notes.",
    "descriptionHy": "Հզոր բրաուզեր առաջադեմ օգտատերերի համար՝ լիարժեք հարմարեցմամբ, երկհարկանի թաբերով և ներկառուցված գրառումներով։",
    "descriptionRu": "Браузер для продвинутых пользователей с гибкой кастомизацией, двухъярусными вкладками и встроенной почтой.",
    "fullText": "Vivaldi puts you in total control of your workspace with split-screen tiling, customizable hotkeys, gestures, command palette, and built-in privacy protection.",
    "features": [
      "Two-Level Tab Stacks",
      "Split-Screen Page Tiling",
      "Built-in Mail, Calendar & Notes",
      "Custom Mouse Gestures",
      "Zero Data Tracking"
    ],
    "systemRequirements": {
      "os": "Windows 10/11, macOS 10.15+, Linux",
      "ram": "4 GB RAM",
      "disk": "600 MB free space",
      "cpu": "1 GHz processor"
    },
    "ratingValue": 4.8,
    "reviewCount": 95,
    "published": "2024-10-22",
    "seoKeywords": [
      "Vivaldi browser",
      "Vivaldi ներբեռնել",
      "скачать Vivaldi",
      "կարգավորվող բրաուզեր"
    ]
  },
  {
    "id": "libreoffice",
    "slug": "libreoffice",
    "title": "LibreOffice",
    "developer": "The Document Foundation",
    "officialSite": "https://www.libreoffice.org/download/download-libreoffice/",
    "primaryCategory": "office",
    "categories": [
      "office",
      "productivity",
      "open-source",
      "word",
      "excel"
    ],
    "version": "24.8",
    "license": "Free & Open Source",
    "os": "Windows 11/10/8, macOS, Linux",
    "osList": [
      "windows",
      "macos",
      "linux"
    ],
    "thumbnail": "/assets/software/libreoffice.svg",
    "images": [
      "/assets/software/libreoffice.svg"
    ],
    "downloads": [
      {
        "name": "LibreOffice Official Windows (64-bit MSI)",
        "size": "345 MB",
        "format": "MSI",
        "url": "https://www.libreoffice.org/download/download-libreoffice/"
      },
      {
        "name": "LibreOffice for macOS (Apple Silicon)",
        "size": "320 MB",
        "format": "DMG",
        "url": "https://www.libreoffice.org/download/download-libreoffice/?type=mac-aarch64"
      },
      {
        "name": "LibreOffice for macOS (Intel)",
        "size": "325 MB",
        "format": "DMG",
        "url": "https://www.libreoffice.org/download/download-libreoffice/?type=mac-x86_64"
      },
      {
        "name": "LibreOffice for Linux (.deb package)",
        "size": "230 MB",
        "format": "DEB",
        "url": "https://www.libreoffice.org/download/download-libreoffice/?type=deb-x86_64"
      }
    ],
    "description": "The premier free and open source office suite: Writer, Calc, Impress, Draw, Base, and Math with full MS Office compatibility.",
    "descriptionHy": "Աշխարհի լավագույն անվճար և բաց կոդով օֆիսային փաթեթը՝ Writer (Word), Calc (Excel), Impress (PowerPoint)՝ 100% համատեղելի MS Office ֆորմատների հետ։",
    "descriptionRu": "Мощный бесплатный офисный пакет с открытым исходным кодом: текстовый редактор Writer, таблицы Calc, презентации Impress.",
    "fullText": "LibreOffice is a powerful, clean, and completely free office suite. Its clean interface and feature-rich tools unleash your creativity and grow your productivity. Millions of businesses, governments, and students worldwide rely on LibreOffice every day.",
    "features": [
      "Full DOCX, XLSX, PPTX & ODF Support",
      "No Subscription or License Fees Ever",
      "Advanced PDF Export & Form Creation",
      "Includes Writer, Calc, Impress, Draw, Base",
      "Available in 115+ Languages"
    ],
    "systemRequirements": {
      "os": "Windows 7 SP1+, macOS 10.15+, Linux kernel 3.10+",
      "ram": "2 GB RAM (4 GB recommended)",
      "disk": "1.5 GB free space",
      "cpu": "Intel / AMD / Apple M-series"
    },
    "ratingValue": 4.9,
    "reviewCount": 310,
    "published": "2024-10-14",
    "seoKeywords": [
      "LibreOffice",
      "LibreOffice ներբեռնել",
      "скачать LibreOffice",
      "անվճար օֆիս",
      "Free office suite Armenia",
      "Word Excel անվճար"
    ]
  },
  {
    "id": "wps-office",
    "slug": "wps-office",
    "title": "WPS Office",
    "developer": "Kingsoft Office Software",
    "officialSite": "https://www.wps.com/download/",
    "primaryCategory": "office",
    "categories": [
      "office",
      "pdf",
      "word",
      "excel",
      "presentation"
    ],
    "version": "2024 (v12)",
    "license": "Freemium",
    "os": "Windows 11/10/8, macOS, Linux, Android, iOS",
    "osList": [
      "windows",
      "macos",
      "linux"
    ],
    "thumbnail": "/assets/software/wps-office.svg",
    "images": [
      "/assets/software/wps-office.svg"
    ],
    "downloads": [
      {
        "name": "WPS Office for Windows Official (64-bit)",
        "size": "220 MB",
        "format": "EXE",
        "url": "https://www.wps.com/download/"
      },
      {
        "name": "WPS Office for macOS",
        "size": "360 MB",
        "format": "DMG",
        "url": "https://www.wps.com/download/"
      }
    ],
    "description": "Lightweight, sleek all-in-one office suite combining Writer, Spreadsheet, Presentation, and powerful PDF toolkit.",
    "descriptionHy": "Թեթև և շատ հարմար օֆիսային ծրագիր՝ Word, Excel, PowerPoint և PDF գործիքներով մեկ միասնական պատուհանում։",
    "descriptionRu": "Легкий и удобный офисный пакет «все в одном»: текстовый редактор, таблицы, презентации и редактор PDF.",
    "fullText": "WPS Office is a high-performance alternative to Microsoft Office. It offers tabbed document browsing, thousands of free professional templates, AI-assisted writing, and built-in PDF conversion.",
    "features": [
      "All-in-One Multi-Tab Workspace",
      "Built-in PDF Editing, Merge & Convert",
      "Full Microsoft Office Format Compatibility",
      "Cloud Sync Across Desktop & Mobile",
      "Rich Template Library"
    ],
    "systemRequirements": {
      "os": "Windows 7 or later, macOS 10.12+",
      "ram": "2 GB RAM",
      "disk": "1 GB free space",
      "cpu": "Dual Core 1.5 GHz"
    },
    "ratingValue": 4.8,
    "reviewCount": 230,
    "published": "2024-10-10",
    "seoKeywords": [
      "WPS Office",
      "WPS ներբեռնել",
      "скачать WPS Office",
      "WPS download",
      "office ծրագիր"
    ]
  },
  {
    "id": "onlyoffice",
    "slug": "onlyoffice-desktop",
    "title": "ONLYOFFICE Desktop",
    "developer": "Ascensio System SIA",
    "officialSite": "https://www.onlyoffice.com/desktop.aspx",
    "primaryCategory": "office",
    "categories": [
      "office",
      "productivity",
      "open-source"
    ],
    "version": "8.2",
    "license": "Free & Open Source",
    "os": "Windows 11/10, macOS, Linux",
    "osList": [
      "windows",
      "macos",
      "linux"
    ],
    "thumbnail": "/assets/software/onlyoffice.svg",
    "images": [
      "/assets/software/onlyoffice.svg"
    ],
    "downloads": [
      {
        "name": "ONLYOFFICE Desktop (Windows 64-bit EXE)",
        "size": "260 MB",
        "format": "EXE",
        "url": "https://www.onlyoffice.com/desktop.aspx"
      },
      {
        "name": "ONLYOFFICE Desktop for macOS",
        "size": "310 MB",
        "format": "DMG",
        "url": "https://www.onlyoffice.com/desktop.aspx"
      },
      {
        "name": "ONLYOFFICE for Linux (DEB / RPM / Flatpak)",
        "size": "280 MB",
        "format": "DEB",
        "url": "https://www.onlyoffice.com/desktop.aspx"
      }
    ],
    "description": "Open-source office suite with highest Microsoft Office DOCX/XLSX/PPTX fidelity, digital forms, and PDF editor.",
    "descriptionHy": "Բաց կոդով օֆիսային հավելված՝ Microsoft Office-ի ֆորմատների առավելագույն ճշգրիտ աջակցությամբ և PDF խմբագրիչով։",
    "descriptionRu": "Офисный пакет с открытым исходным кодом и максимальной совместимостью с форматами MS Office.",
    "fullText": "ONLYOFFICE Desktop Editors combine text documents, spreadsheets, presentations, fillable forms, and PDF editing in a single intuitive interface.",
    "features": [
      "Highest MS Office Format Fidelity",
      "Interactive PDF Form Creator & Editor",
      "Plugins for AI, Translation & YouTube",
      "End-to-End Encryption Support",
      "Completely Free for Personal Use"
    ],
    "systemRequirements": {
      "os": "Windows 10/11, macOS 10.15+, modern Linux",
      "ram": "2 GB RAM",
      "disk": "2 GB free space",
      "cpu": "Dual Core 2 GHz"
    },
    "ratingValue": 4.8,
    "reviewCount": 175,
    "published": "2024-10-05",
    "seoKeywords": [
      "ONLYOFFICE",
      "ONLYOFFICE ներբեռնել",
      "скачать ONLYOFFICE",
      "բաց կոդով օֆիս",
      "office alternative"
    ]
  },
  {
    "id": "ms-365",
    "slug": "microsoft-365-office",
    "title": "Microsoft 365 & Office",
    "developer": "Microsoft Corporation",
    "officialSite": "https://www.microsoft.com/microsoft-365",
    "primaryCategory": "office",
    "categories": [
      "office",
      "microsoft",
      "word",
      "excel",
      "powerpoint"
    ],
    "version": "2024 / Cloud",
    "license": "Commercial / Free Trial",
    "os": "Windows 11/10, macOS, Web, iOS, Android",
    "osList": [
      "windows",
      "macos"
    ],
    "thumbnail": "/assets/software/microsoft-365.svg",
    "images": [
      "/assets/software/microsoft-365.svg"
    ],
    "downloads": [
      {
        "name": "Microsoft 365 Setup Installer (Official Microsoft CDN)",
        "size": "7 MB (Online)",
        "format": "EXE",
        "url": "https://www.microsoft.com/microsoft-365/try"
      },
      {
        "name": "Office Deployment Tool (ODT for Admins)",
        "size": "3.5 MB",
        "format": "EXE",
        "url": "https://www.microsoft.com/download/details.aspx?id=49117"
      }
    ],
    "description": "Industry-standard productivity suite: Word, Excel, PowerPoint, Outlook, OneDrive with Copilot AI integration.",
    "descriptionHy": "Աշխարհի առաջատար օֆիսային համակարգը՝ Word, Excel, PowerPoint, Outlook և 1TB ամպային տարածք OneDrive-ում։",
    "descriptionRu": "Мировой эталон офисных программ: Word, Excel, PowerPoint, Outlook и облачное хранилище OneDrive.",
    "fullText": "Microsoft 365 delivers modern AI-powered applications to create, connect, and collaborate securely across all your devices.",
    "features": [
      "Microsoft Word, Excel, PowerPoint, Outlook",
      "1 TB Secure Cloud Storage with OneDrive",
      "Integrated Microsoft Copilot AI",
      "Real-Time Multi-Author Collaboration",
      "Advanced Cybersecurity Protection"
    ],
    "systemRequirements": {
      "os": "Windows 10/11, macOS three latest versions",
      "ram": "4 GB RAM",
      "disk": "4 GB free space",
      "cpu": "1.6 GHz 2-core processor"
    },
    "ratingValue": 4.9,
    "reviewCount": 410,
    "published": "2024-09-28",
    "seoKeywords": [
      "Microsoft 365",
      "Office 2024",
      "Word Excel ներբեռնել",
      "скачать Microsoft Office",
      "Office տեղադրում Հայաստան"
    ]
  },
  {
    "id": "adobe-reader",
    "slug": "adobe-acrobat-reader",
    "title": "Adobe Acrobat Reader",
    "developer": "Adobe Inc.",
    "officialSite": "https://get.adobe.com/reader/",
    "primaryCategory": "office",
    "categories": [
      "office",
      "pdf",
      "adobe",
      "utilities"
    ],
    "version": "2024 (DC)",
    "license": "Freeware",
    "os": "Windows 11/10, macOS, Android, iOS",
    "osList": [
      "windows",
      "macos"
    ],
    "thumbnail": "/assets/software/adobe-reader.svg",
    "images": [
      "/assets/software/adobe-reader.svg"
    ],
    "downloads": [
      {
        "name": "Adobe Acrobat Reader Official Standalone (Windows)",
        "size": "295 MB",
        "format": "EXE",
        "url": "https://get.adobe.com/reader/enterprise/"
      },
      {
        "name": "Adobe Acrobat Reader for macOS",
        "size": "340 MB",
        "format": "DMG",
        "url": "https://get.adobe.com/reader/"
      }
    ],
    "description": "The global gold standard for viewing, printing, signing, sharing, and annotating PDF documents reliably.",
    "descriptionHy": "Աշխարհի ստանդարտը PDF ֆայլերը բացելու, կարդալու, ստորագրելու և տպելու համար Adobe-ից։",
    "descriptionRu": "Общепризнанный стандарт для просмотра, печати, подписания и комментирования документов PDF.",
    "fullText": "Adobe Acrobat Reader is the trusted, standard PDF viewer that lets you read, print, search, and interact with virtually any type of PDF file.",
    "features": [
      "View & Print High-Fidelity PDFs",
      "Fill & Sign Electronic Forms",
      "Add Notes, Highlights & Annotations",
      "Searchable Text & OCR Support",
      "Secure Protected Mode"
    ],
    "systemRequirements": {
      "os": "Windows 10/11, macOS 10.15+",
      "ram": "2 GB RAM",
      "disk": "1 GB free space",
      "cpu": "1.5 GHz processor"
    },
    "ratingValue": 4.8,
    "reviewCount": 280,
    "published": "2024-09-20",
    "seoKeywords": [
      "Adobe Acrobat Reader",
      "Adobe PDF reader",
      "PDF ներբեռնել",
      "скачать Adobe Reader",
      "PDF ծրագիր"
    ]
  },
  {
    "id": "notion",
    "slug": "notion-desktop",
    "title": "Notion",
    "developer": "Notion Labs, Inc.",
    "officialSite": "https://www.notion.so/desktop",
    "primaryCategory": "office",
    "categories": [
      "office",
      "productivity",
      "notes",
      "tasks"
    ],
    "version": "2024 (v3)",
    "license": "Freemium",
    "os": "Windows 11/10, macOS, Web, Mobile",
    "osList": [
      "windows",
      "macos"
    ],
    "thumbnail": "/assets/software/notion.svg",
    "images": [
      "/assets/software/notion.svg"
    ],
    "downloads": [
      {
        "name": "Notion Desktop for Windows (64-bit)",
        "size": "85 MB",
        "format": "EXE",
        "url": "https://www.notion.so/desktop"
      },
      {
        "name": "Notion Desktop for macOS (Apple Silicon)",
        "size": "115 MB",
        "format": "DMG",
        "url": "https://www.notion.so/desktop"
      }
    ],
    "description": "The connected workspace for your notes, tasks, projects, databases, and AI-powered knowledge management.",
    "descriptionHy": "Համակարգված աշխատանքային տարածք նշումների, առաջադրանքների, նախագծերի և տվյալների բազաների կառավարման համար։",
    "descriptionRu": "Универсальное рабочее пространство для заметок, задач, баз данных и управления проектами с ИИ.",
    "fullText": "Notion brings your wiki, documents, tasks, and notes together in a beautifully flexible and collaborative interface.",
    "features": [
      "Drag-and-Drop Flexible Blocks",
      "Relational Databases & Kanban Boards",
      "Integrated Notion AI Assistant",
      "Offline Sync & Real-Time Collaboration",
      "Rich Template Ecosystem"
    ],
    "systemRequirements": {
      "os": "Windows 10/11, macOS 10.15+",
      "ram": "4 GB RAM",
      "disk": "500 MB free space",
      "cpu": "x64 processor"
    },
    "ratingValue": 4.9,
    "reviewCount": 190,
    "published": "2024-10-11",
    "seoKeywords": [
      "Notion desktop",
      "Notion ներբեռնել",
      "скачать Notion",
      "նոթերի ծրագիր",
      "project management"
    ]
  },
  {
    "id": "obsidian",
    "slug": "obsidian",
    "title": "Obsidian",
    "developer": "Dynalist Inc.",
    "officialSite": "https://obsidian.md/download",
    "primaryCategory": "office",
    "categories": [
      "office",
      "productivity",
      "markdown",
      "knowledge"
    ],
    "version": "1.7",
    "license": "Free for Personal Use",
    "os": "Windows 11/10, macOS, Linux, iOS, Android",
    "osList": [
      "windows",
      "macos",
      "linux"
    ],
    "thumbnail": "/assets/software/obsidian.svg",
    "images": [
      "/assets/software/obsidian.svg"
    ],
    "downloads": [
      {
        "name": "Obsidian Official Installer (Windows 64-bit)",
        "size": "90 MB",
        "format": "EXE",
        "url": "https://obsidian.md/download"
      },
      {
        "name": "Obsidian for macOS",
        "size": "110 MB",
        "format": "DMG",
        "url": "https://obsidian.md/download"
      },
      {
        "name": "Obsidian for Linux (AppImage)",
        "size": "95 MB",
        "format": "AppImage",
        "url": "https://obsidian.md/download"
      }
    ],
    "description": "Private and flexible writing app that adapts to the way you think, storing markdown notes locally on your device.",
    "descriptionHy": "Անձնական գիտելիքների բազա և գրառումների ծրագիր՝ Markdown ֆայլերով, ինտերակտիվ գրաֆով և լոկալ պահպանմամբ։",
    "descriptionRu": "Мощная база знаний и приложение для заметок, хранящее все данные локально в формате Markdown.",
    "fullText": "Obsidian is a powerful knowledge base on top of a local folder of plain text Markdown files with interactive graph view and 1000+ community plugins.",
    "features": [
      "100% Local Data Ownership",
      "Interactive Graph Visualization",
      "Bi-directional [[Wiki]] Links",
      "Canvas Infinite Whiteboard",
      "Extensible Plugin & Theme Ecosystem"
    ],
    "systemRequirements": {
      "os": "Windows 10/11, macOS 10.14+, Linux",
      "ram": "2 GB RAM",
      "disk": "300 MB free space",
      "cpu": "x64 / ARM64"
    },
    "ratingValue": 4.9,
    "reviewCount": 205,
    "published": "2024-10-16",
    "seoKeywords": [
      "Obsidian",
      "Obsidian ներբեռնել",
      "скачать Obsidian",
      "Markdown notes",
      "գիտելիքների բազա"
    ]
  },
  {
    "id": "vscode",
    "slug": "visual-studio-code",
    "title": "Visual Studio Code",
    "developer": "Microsoft Corporation",
    "officialSite": "https://code.visualstudio.com/Download",
    "primaryCategory": "dev",
    "categories": [
      "dev",
      "ide",
      "code-editor",
      "open-source",
      "microsoft"
    ],
    "version": "1.95",
    "license": "Free & Open Source",
    "os": "Windows 11/10/8, macOS, Linux",
    "osList": [
      "windows",
      "macos",
      "linux"
    ],
    "thumbnail": "/assets/software/vscode.svg",
    "images": [
      "/assets/software/vscode.svg"
    ],
    "downloads": [
      {
        "name": "VS Code Official User Installer (Windows 64-bit)",
        "size": "92 MB",
        "format": "EXE",
        "url": "https://code.visualstudio.com/Download"
      },
      {
        "name": "VS Code for macOS (Universal)",
        "size": "120 MB",
        "format": "ZIP",
        "url": "https://code.visualstudio.com/Download#macos"
      },
      {
        "name": "VS Code for Linux (Debian/Ubuntu 64-bit)",
        "size": "95 MB",
        "format": "DEB",
        "url": "https://code.visualstudio.com/Download#linux"
      }
    ],
    "description": "The world's leading code editor with built-in Git, debugging, intelligent IntelliSense autocomplete, and vast extension marketplace.",
    "descriptionHy": "Աշխարհի ամենահանրաճանաչ կոդի խմբագրիչը՝ ներկառուցված Git-ով, տերմինալով, IntelliSense-ով և հազարավոր ընդլայնումներով։",
    "descriptionRu": "Самый популярный редактор кода в мире со встроенным Git, терминалом, умным автодополнением и расширениями.",
    "fullText": "Visual Studio Code is a lightweight but powerful source code editor which runs on your desktop and is available for Windows, macOS and Linux. It comes with built-in support for JavaScript, TypeScript and Node.js and has a rich ecosystem of extensions for other languages.",
    "features": [
      "IntelliSense Code Completion",
      "Built-In Git Version Control & Diff",
      "Interactive Debugging with Breakpoints",
      "Integrated Multi-Shell Terminal",
      "Thousands of Extensions (Python, C++, PHP, React)"
    ],
    "systemRequirements": {
      "os": "Windows 10/11, macOS 10.15+, Ubuntu 18.04+",
      "ram": "4 GB RAM (8 GB recommended)",
      "disk": "1 GB free space",
      "cpu": "1.6 GHz or faster processor"
    },
    "ratingValue": 4.9,
    "reviewCount": 520,
    "published": "2024-10-19",
    "seoKeywords": [
      "Visual Studio Code",
      "VS Code ներբեռնել",
      "скачать VS Code",
      "ծրագրավորման խմբագրիչ",
      "Code editor Armenia"
    ]
  },
  {
    "id": "git",
    "slug": "git-scm",
    "title": "Git for Windows",
    "developer": "Software Freedom Conservancy",
    "officialSite": "https://git-scm.com/downloads",
    "primaryCategory": "dev",
    "categories": [
      "dev",
      "version-control",
      "open-source",
      "git"
    ],
    "version": "2.47",
    "license": "Free & Open Source",
    "os": "Windows 11/10/8/7 (64-bit), macOS, Linux",
    "osList": [
      "windows",
      "macos",
      "linux"
    ],
    "thumbnail": "/assets/software/git.svg",
    "images": [
      "/assets/software/git.svg"
    ],
    "downloads": [
      {
        "name": "Git for Windows 64-bit Standalone Installer",
        "size": "62 MB",
        "format": "EXE",
        "url": "https://git-scm.com/download/win"
      },
      {
        "name": "Git for Windows Portable 64-bit",
        "size": "52 MB",
        "format": "7Z",
        "url": "https://git-scm.com/download/win"
      }
    ],
    "description": "Fast, scalable, distributed version control system with Git Bash, Git GUI, and Shell integration.",
    "descriptionHy": "Տարբերակների կառավարման ապակենտրոնացված համակարգ (VCS)՝ Git Bash տերմինալով և GitHub/GitLab ինտեգրմամբ։",
    "descriptionRu": "Быстрая и надежная распределенная система контроля версий с терминалом Git Bash и интеграцией в проводник.",
    "fullText": "Git is a free and open source distributed version control system designed to handle everything from small to very large projects with speed and efficiency.",
    "features": [
      "Branching & Merging Capabilities",
      "Cryptographic Integrity Checksums",
      "Includes Git Bash & Git GUI",
      "Seamless GitHub, GitLab, Bitbucket Integration",
      "Staging Area / Index Control"
    ],
    "systemRequirements": {
      "os": "Windows 7 or later (64-bit)",
      "ram": "1 GB RAM",
      "disk": "350 MB free space",
      "cpu": "Any modern processor"
    },
    "ratingValue": 4.9,
    "reviewCount": 380,
    "published": "2024-10-15",
    "seoKeywords": [
      "Git",
      "Git Bash",
      "Git ներբեռնել",
      "скачать Git",
      "version control Armenia",
      "GitHub tools"
    ]
  },
  {
    "id": "docker",
    "slug": "docker-desktop",
    "title": "Docker Desktop",
    "developer": "Docker, Inc.",
    "officialSite": "https://www.docker.com/products/docker-desktop/",
    "primaryCategory": "dev",
    "categories": [
      "dev",
      "containers",
      "virtualization",
      "devops"
    ],
    "version": "4.35",
    "license": "Freemium / Free for Personal",
    "os": "Windows 11/10 (WSL2), macOS, Linux",
    "osList": [
      "windows",
      "macos",
      "linux"
    ],
    "thumbnail": "/assets/software/docker.svg",
    "images": [
      "/assets/software/docker.svg"
    ],
    "downloads": [
      {
        "name": "Docker Desktop for Windows (WSL 2 Backend)",
        "size": "580 MB",
        "format": "EXE",
        "url": "https://desktop.docker.com/win/main/amd64/Docker%20Desktop%20Installer.exe"
      },
      {
        "name": "Docker Desktop for macOS (Apple Silicon)",
        "size": "620 MB",
        "format": "DMG",
        "url": "https://desktop.docker.com/mac/main/arm64/Docker.dmg"
      }
    ],
    "description": "The fastest way to containerize applications, manage Kubernetes clusters, and build cloud-native software.",
    "descriptionHy": "Կոնտեյներացման առաջատար հարթակ՝ հավելվածները մեկուսացված միջավայրում ստեղծելու և գործարկելու համար (WSL 2):",
    "descriptionRu": "Быстрое развертывание контейнеров, управление образами и кластерами Kubernetes для Windows и Mac.",
    "fullText": "Docker Desktop is an easy-to-install application for your Mac, Linux, or Windows environment that enables you to build and share containerized applications and microservices.",
    "features": [
      "Docker Compose & Kubernetes Support",
      "WSL 2 GPU & Hyper-V Acceleration",
      "Docker Extensions Marketplace",
      "Volume Management & Container Logs UI",
      "Built-In Vulnerability Scanning"
    ],
    "systemRequirements": {
      "os": "Windows 10/11 64-bit with WSL 2, macOS 11+",
      "ram": "8 GB RAM (16 GB recommended)",
      "disk": "10 GB free space",
      "cpu": "64-bit processor with virtualization support"
    },
    "ratingValue": 4.8,
    "reviewCount": 290,
    "published": "2024-10-09",
    "seoKeywords": [
      "Docker Desktop",
      "Docker ներբեռնել",
      "скачать Docker",
      "containers Armenia",
      "DevOps tools"
    ]
  },
  {
    "id": "nodejs",
    "slug": "node-js-lts",
    "title": "Node.js (LTS)",
    "developer": "OpenJS Foundation",
    "officialSite": "https://nodejs.org/",
    "primaryCategory": "dev",
    "categories": [
      "dev",
      "javascript",
      "backend",
      "runtime",
      "open-source"
    ],
    "version": "22.x LTS / 20.x LTS",
    "license": "Free & Open Source",
    "os": "Windows 11/10 (64-bit), macOS, Linux",
    "osList": [
      "windows",
      "macos",
      "linux"
    ],
    "thumbnail": "/assets/software/nodejs.svg",
    "images": [
      "/assets/software/nodejs.svg"
    ],
    "downloads": [
      {
        "name": "Node.js LTS Official Windows Installer (64-bit MSI)",
        "size": "32 MB",
        "format": "MSI",
        "url": "https://nodejs.org/en/download/"
      },
      {
        "name": "Node.js LTS for macOS (Universal PKG)",
        "size": "45 MB",
        "format": "PKG",
        "url": "https://nodejs.org/en/download/"
      },
      {
        "name": "Node.js Linux Binaries (x64)",
        "size": "48 MB",
        "format": "TAR.XZ",
        "url": "https://nodejs.org/en/download/"
      }
    ],
    "description": "Asynchronous event-driven JavaScript runtime built on Chrome's V8 engine with bundled npm package manager.",
    "descriptionHy": "Հզոր JavaScript runtime միջավայր՝ սերվերային հավելվածներ ստեղծելու համար, ներառյալ npm փաթեթների կառավարիչը։",
    "descriptionRu": "Серверная среда выполнения JavaScript на базе движка V8 с менеджером пакетов npm в комплекте.",
    "fullText": "Node.js is a free, open-source, cross-platform JavaScript runtime environment that lets developers write server-side applications in JavaScript.",
    "features": [
      "Event-Driven Asynchronous Architecture",
      "Bundled with npm Package Manager",
      "High-Performance V8 Engine",
      "Massive Ecosystem of 2+ Million Packages",
      "Full Native TypeScript Support"
    ],
    "systemRequirements": {
      "os": "Windows 10/11, macOS 10.15+, Linux",
      "ram": "2 GB RAM",
      "disk": "300 MB free space",
      "cpu": "x64 / ARM64 processor"
    },
    "ratingValue": 4.9,
    "reviewCount": 350,
    "published": "2024-10-18",
    "seoKeywords": [
      "Node.js",
      "npm",
      "Node js ներբեռնել",
      "скачать Node.js",
      "JavaScript runtime",
      "backend development"
    ]
  },
  {
    "id": "notepadpp",
    "slug": "notepad-plus-plus",
    "title": "Notepad++",
    "developer": "Don Ho",
    "officialSite": "https://notepad-plus-plus.org/downloads/",
    "primaryCategory": "dev",
    "categories": [
      "dev",
      "text-editor",
      "open-source",
      "utilities"
    ],
    "version": "8.7",
    "license": "Free & Open Source",
    "os": "Windows 11/10/8/7 (64-bit)",
    "osList": [
      "windows"
    ],
    "thumbnail": "/assets/software/notepadpp.svg",
    "images": [
      "/assets/software/notepadpp.svg"
    ],
    "downloads": [
      {
        "name": "Notepad++ Official Installer (Windows 64-bit)",
        "size": "4.5 MB",
        "format": "EXE",
        "url": "https://notepad-plus-plus.org/downloads/"
      },
      {
        "name": "Notepad++ Portable (64-bit ZIP)",
        "size": "5.2 MB",
        "format": "ZIP",
        "url": "https://notepad-plus-plus.org/downloads/"
      }
    ],
    "description": "Ultra-fast, lightweight source code and text editor supporting syntax highlighting for 80+ programming languages.",
    "descriptionHy": "Անչափ թեթև և կայծակնային արագությամբ աշխատող տեքստային խմբագրիչ՝ 80+ լեզուների շարահյուսական լուսավորմամբ։",
    "descriptionRu": "Сверхбыстрый и легкий текстовый редактор с подсветкой синтаксиса для более чем 80 языков программирования.",
    "fullText": "Notepad++ is a free source code editor and Notepad replacement that supports several languages. Running in the MS Windows environment, its use is governed by GNU General Public License.",
    "features": [
      "Instant Load Time & Low CPU/RAM Footprint",
      "Syntax Highlighting & Code Folding",
      "Powerful Regex Find & Replace Across Files",
      "Macro Recording & Auto-Completion",
      "Wide Plugin Architecture"
    ],
    "systemRequirements": {
      "os": "Windows 7, 8, 10, 11 (32/64-bit)",
      "ram": "512 MB RAM",
      "disk": "20 MB free space",
      "cpu": "Any Pentium compatible CPU"
    },
    "ratingValue": 4.9,
    "reviewCount": 420,
    "published": "2024-10-10",
    "seoKeywords": [
      "Notepad++",
      "Notepad plus plus ներբեռնել",
      "скачать Notepad++",
      "տեքստային խմբագրիչ",
      "lightweight code editor"
    ]
  },
  {
    "id": "delphi",
    "slug": "embarcadero-delphi-rad-studio",
    "title": "Embarcadero Delphi RAD Studio",
    "developer": "Embarcadero Technologies",
    "officialSite": "https://www.embarcadero.com/products/rad-studio",
    "primaryCategory": "dev",
    "categories": [
      "dev",
      "delphi",
      "ide",
      "windows",
      "vcl"
    ],
    "version": "12.2 Athens",
    "license": "Commercial / Community Edition",
    "os": "Windows 11/10 (64-bit)",
    "osList": [
      "windows"
    ],
    "thumbnail": "/assets/software/delphi.svg",
    "images": [
      "/assets/software/delphi.svg"
    ],
    "downloads": [
      {
        "name": "Delphi 12 Athens Community / Trial Web Installer",
        "size": "175 MB (Online Setup)",
        "format": "EXE",
        "url": "https://www.embarcadero.com/products/delphi/start-for-free"
      },
      {
        "name": "AlphaControls v17+ Skin Pack for Delphi 12",
        "size": "48 MB",
        "format": "ZIP",
        "url": "http://www.alphaskins.com/showdoc.php?l=en&n=1"
      }
    ],
    "description": "The ultimate IDE for building native, blazing-fast GUI applications for Windows, iOS, Android, and macOS from a single codebase.",
    "descriptionHy": "Հզոր միջավայր բարձրակարգ Windows/macOS/iOS ծրագրեր արագ նախագծելու համար՝ VCL և FireMonkey գրադարաններով։",
    "descriptionRu": "Ведущая среда быстрой разработки нативных высокопроизводительных приложений для Windows, macOS, Android и iOS.",
    "fullText": "Embarcadero Delphi 12 Athens is the fastest way to build cross-platform native applications with modern design systems, REST API integrations, and robust database connectivity.",
    "features": [
      "Single Codebase for Windows, macOS, iOS & Android",
      "High-DPI VCL & Modern Skia UI Engine",
      "Ultra-Fast Compiling Speeds",
      "Integrated FireDAC Database Connectors",
      "Direct Hardware & Win32 API Access"
    ],
    "systemRequirements": {
      "os": "Windows 10/11 (64-bit)",
      "ram": "8 GB RAM (16 GB recommended)",
      "disk": "45 GB free SSD space",
      "cpu": "Intel Core i5 / AMD Ryzen 5 or higher"
    },
    "ratingValue": 4.9,
    "reviewCount": 185,
    "published": "2024-09-15",
    "seoKeywords": [
      "Delphi 12 Athens",
      "Delphi ներբեռնել",
      "Embarcadero RAD Studio",
      "RAD Studio download",
      "Delphi ծրագրավորում Հայաստան"
    ]
  },
  {
    "id": "intellij",
    "slug": "intellij-idea-community",
    "title": "IntelliJ IDEA Community",
    "developer": "JetBrains s.r.o.",
    "officialSite": "https://www.jetbrains.com/idea/download/",
    "primaryCategory": "dev",
    "categories": [
      "dev",
      "java",
      "kotlin",
      "ide",
      "open-source"
    ],
    "version": "2024.2",
    "license": "Free & Open Source",
    "os": "Windows 11/10, macOS, Linux",
    "osList": [
      "windows",
      "macos",
      "linux"
    ],
    "thumbnail": "/assets/software/intellij.svg",
    "images": [
      "/assets/software/intellij.svg"
    ],
    "downloads": [
      {
        "name": "IntelliJ IDEA Community Edition (Windows 64-bit)",
        "size": "720 MB",
        "format": "EXE",
        "url": "https://www.jetbrains.com/idea/download/#section=windows"
      },
      {
        "name": "IntelliJ IDEA Community for macOS (Apple Silicon)",
        "size": "810 MB",
        "format": "DMG",
        "url": "https://www.jetbrains.com/idea/download/#section=mac"
      }
    ],
    "description": "The industry standard IDE for Java and Kotlin development with ergonomic developer experience and deep code understanding.",
    "descriptionHy": "Առաջատար IDE Java և Kotlin լեզուներով ծրագրավորման համար JetBrains-ից՝ հզոր ռեֆակտորինգով և դեբագերով։",
    "descriptionRu": "Ведущая среда разработки для Java и Kotlin с интеллектуальным автодополнением и мощным рефакторингом.",
    "fullText": "IntelliJ IDEA Community Edition is the open-source version of the premier Java IDE, complete with Git integration, build tools (Maven, Gradle), and deep static analysis.",
    "features": [
      "Intelligent Code Completion & Refactoring",
      "Integrated Maven, Gradle & Ant Build Tools",
      "Interactive Debugger & Test Runners",
      "Built-In Git Version Control Client",
      "Support for Java, Kotlin, Groovy & Scala"
    ],
    "systemRequirements": {
      "os": "Windows 10/11 64-bit, macOS 10.15+, Linux",
      "ram": "8 GB RAM (16 GB recommended)",
      "disk": "4 GB SSD space",
      "cpu": "Multi-core Intel/AMD/Apple Silicon"
    },
    "ratingValue": 4.9,
    "reviewCount": 260,
    "published": "2024-10-04",
    "seoKeywords": [
      "IntelliJ IDEA",
      "Java IDE",
      "Kotlin development",
      "IntelliJ ներբեռնել",
      "скачать IntelliJ IDEA"
    ]
  },
  {
    "id": "blender",
    "slug": "blender-3d",
    "title": "Blender 3D",
    "developer": "Blender Foundation",
    "officialSite": "https://www.blender.org/download/",
    "primaryCategory": "design",
    "categories": [
      "design",
      "3d",
      "animation",
      "vfx",
      "open-source"
    ],
    "version": "4.2 LTS",
    "license": "Free & Open Source",
    "os": "Windows 11/10 (64-bit), macOS, Linux",
    "osList": [
      "windows",
      "macos",
      "linux"
    ],
    "thumbnail": "/assets/software/blender.svg",
    "images": [
      "/assets/software/blender.svg"
    ],
    "downloads": [
      {
        "name": "Blender 4.2 LTS Official Windows Installer (64-bit)",
        "size": "330 MB",
        "format": "MSI",
        "url": "https://www.blender.org/download/"
      },
      {
        "name": "Blender 4.2 for macOS (Apple Silicon)",
        "size": "340 MB",
        "format": "DMG",
        "url": "https://www.blender.org/download/"
      },
      {
        "name": "Blender 4.2 for Linux (.tar.xz)",
        "size": "320 MB",
        "format": "TAR.XZ",
        "url": "https://www.blender.org/download/"
      }
    ],
    "description": "The free and open-source 3D creation suite: modeling, rigging, animation, simulation, rendering, compositing, and motion tracking.",
    "descriptionHy": "Աշխարհահռչակ 3D մոդելավորման, անիմացիայի, վիզուալ էֆեկտների և ռենդերինգի անվճար հզորագույն փաթեթ։",
    "descriptionRu": "Профессиональный бесплатный пакет для создания 3D-графики, анимации, симуляций и фотореалистичного рендеринга.",
    "fullText": "Blender is the free and open source 3D creation suite. It supports the entirety of the 3D pipeline—modeling, rigging, animation, simulation, rendering, compositing and motion tracking, video editing and 2D animation pipeline.",
    "features": [
      "Cycles & EEVEE Next Photorealistic Rendering",
      "Sculpting, Retopology & UV Unwrapping",
      "VFX Motion Tracking & Compositor",
      "Grease Pencil 2D in 3D Animation",
      "Zero Licensing Fees for Commercial Use"
    ],
    "systemRequirements": {
      "os": "Windows 10/11 64-bit, macOS 11+, Linux",
      "ram": "16 GB RAM (32 GB recommended)",
      "disk": "2 GB free space",
      "cpu": "64-bit quad-core CPU, OpenGL 4.3+ GPU"
    },
    "ratingValue": 4.9,
    "reviewCount": 390,
    "published": "2024-10-17",
    "seoKeywords": [
      "Blender 3D",
      "Blender ներբեռնել",
      "скачать Blender",
      "3D մոդելավորում",
      "3D animation free"
    ]
  },
  {
    "id": "photoshop",
    "slug": "adobe-creative-cloud-photoshop",
    "title": "Adobe Creative Cloud & Photoshop",
    "developer": "Adobe Inc.",
    "officialSite": "https://www.adobe.com/products/photoshop.html",
    "primaryCategory": "design",
    "categories": [
      "design",
      "adobe",
      "graphics",
      "photo-editing"
    ],
    "version": "2024 / 2025 (v26)",
    "license": "Commercial / Free Trial",
    "os": "Windows 11/10 (64-bit), macOS",
    "osList": [
      "windows",
      "macos"
    ],
    "thumbnail": "/assets/software/photoshop.svg",
    "images": [
      "/assets/software/photoshop.svg"
    ],
    "downloads": [
      {
        "name": "Adobe Creative Cloud Desktop Official Installer",
        "size": "3.2 MB (Online Setup)",
        "format": "EXE",
        "url": "https://creativecloud.adobe.com/apps/download/creative-cloud"
      },
      {
        "name": "Adobe Photoshop 7-Day Free Trial",
        "size": "Cloud",
        "format": "EXE",
        "url": "https://www.adobe.com/products/photoshop/free-trial-download.html"
      }
    ],
    "description": "The global benchmark for digital imaging, graphic design, and Generative Fill AI powered by Adobe Firefly.",
    "descriptionHy": "Աշխարհի առաջատար գրաֆիկական խմբագրիչը՝ Generative Fill AI գործիքներով, շերտերով և մասնագիտական ռետուշով։",
    "descriptionRu": "Мировой стандарт для редактирования фотографий, графического дизайна и генеративного ИИ Adobe Firefly.",
    "fullText": "Adobe Photoshop lets you create beautiful images, graphics, paintings, and 3D art on your desktop and iPad. Powered by Adobe Firefly generative AI.",
    "features": [
      "Generative Fill & Expand with Adobe Firefly AI",
      "Unlimited Layering, Masks & Smart Objects",
      "Advanced Camera Raw & Retouching Suite",
      "Neural Filters for Portrait Enhancements",
      "Full PSD Cloud Sync Across Devices"
    ],
    "systemRequirements": {
      "os": "Windows 10/11 64-bit (v22H2+), macOS 12+",
      "ram": "8 GB RAM (16 GB recommended)",
      "disk": "20 GB SSD space",
      "cpu": "Intel / AMD processor with 64-bit support, 2 GHz+"
    },
    "ratingValue": 4.9,
    "reviewCount": 460,
    "published": "2024-10-12",
    "seoKeywords": [
      "Adobe Photoshop",
      "Photoshop 2024",
      "Photoshop ներբեռնել",
      "скачать Фотошоп",
      "Adobe Creative Cloud Armenia"
    ]
  },
  {
    "id": "gimp",
    "slug": "gimp-photo-editor",
    "title": "GIMP",
    "developer": "The GIMP Team",
    "officialSite": "https://www.gimp.org/downloads/",
    "primaryCategory": "design",
    "categories": [
      "design",
      "photo-editing",
      "open-source",
      "graphics"
    ],
    "version": "2.10.38 / 3.0 RC",
    "license": "Free & Open Source",
    "os": "Windows 11/10/8, macOS, Linux",
    "osList": [
      "windows",
      "macos",
      "linux"
    ],
    "thumbnail": "/assets/software/gimp.svg",
    "images": [
      "/assets/software/gimp.svg"
    ],
    "downloads": [
      {
        "name": "GIMP Official Direct Installer (Windows 64-bit)",
        "size": "310 MB",
        "format": "EXE",
        "url": "https://www.gimp.org/downloads/"
      },
      {
        "name": "GIMP for macOS (Apple Silicon & Intel)",
        "size": "320 MB",
        "format": "DMG",
        "url": "https://www.gimp.org/downloads/"
      },
      {
        "name": "GIMP for Linux (Flatpak)",
        "size": "180 MB",
        "format": "Flatpak",
        "url": "https://www.gimp.org/downloads/"
      }
    ],
    "description": "The free and open-source alternative to Photoshop for photo retouching, image composition, and graphic authoring.",
    "descriptionHy": "Photoshop-ի լիարժեք անվճար և բաց կոդով այլընտրանքը՝ նկարների խմբագրման, ֆիլտրերի և շերտերի աջակցությամբ։",
    "descriptionRu": "Мощный бесплатный графический редактор с открытым исходным кодом, альтернатива Adobe Photoshop.",
    "fullText": "GIMP is a cross-platform image editor available for GNU/Linux, macOS, Windows and more operating systems. It is free software, you can change its source code and distribute your changes.",
    "features": [
      "Advanced Photo Retouching & Color Grading",
      "Layer Masks, Channels & Paths",
      "Hardware-Accelerated GEGL Processing",
      "Extensible with Python Scripts & Plugins",
      "100% Free with No Ads or Restrictions"
    ],
    "systemRequirements": {
      "os": "Windows 7 or later, macOS 10.13+, modern Linux",
      "ram": "4 GB RAM",
      "disk": "1 GB free space",
      "cpu": "Any modern multi-core CPU"
    },
    "ratingValue": 4.8,
    "reviewCount": 240,
    "published": "2024-09-29",
    "seoKeywords": [
      "GIMP",
      "GIMP ներբեռնել",
      "скачать GIMP",
      "անվճար ֆոտոշոփ",
      "free image editor Armenia"
    ]
  },
  {
    "id": "figma",
    "slug": "figma-desktop",
    "title": "Figma Desktop",
    "developer": "Figma, Inc.",
    "officialSite": "https://www.figma.com/downloads/",
    "primaryCategory": "design",
    "categories": [
      "design",
      "ui-ux",
      "prototyping",
      "collaboration"
    ],
    "version": "124.0",
    "license": "Freemium",
    "os": "Windows 11/10 (64-bit), macOS",
    "osList": [
      "windows",
      "macos"
    ],
    "thumbnail": "/assets/software/figma.svg",
    "images": [
      "/assets/software/figma.svg"
    ],
    "downloads": [
      {
        "name": "Figma Desktop for Windows (64-bit)",
        "size": "85 MB",
        "format": "EXE",
        "url": "https://www.figma.com/download/desktop/win"
      },
      {
        "name": "Figma Desktop for macOS (Universal)",
        "size": "115 MB",
        "format": "DMG",
        "url": "https://www.figma.com/download/desktop/mac"
      }
    ],
    "description": "The collaborative interface design and prototyping tool used by top product designers and UI/UX teams worldwide.",
    "descriptionHy": "Աշխարհի թիվ 1 UI/UX դիզայնի և ինտերֆեյսների նախագծման գործիքը՝ թիմային համատեղ աշխատանքի հնարավորությամբ։",
    "descriptionRu": "Ведущий инструмент для веб- и мобильного UI/UX дизайна, прототипирования и совместной работы в реальном времени.",
    "fullText": "Figma connects everyone in the design process so teams can deliver better products, faster. With responsive Auto Layout, design systems, and Dev Mode.",
    "features": [
      "Real-Time Multiplayer Collaboration",
      "Responsive Auto-Layout & Design Tokens",
      "Interactive Animated Prototypes",
      "Dev Mode for Pixel-Perfect Code Handoff",
      "Vast Community UI Kits & Plugins"
    ],
    "systemRequirements": {
      "os": "Windows 10/11 64-bit, macOS 11+",
      "ram": "4 GB RAM (8 GB recommended)",
      "disk": "500 MB free space",
      "cpu": "64-bit processor with WebGL support"
    },
    "ratingValue": 4.9,
    "reviewCount": 310,
    "published": "2024-10-16",
    "seoKeywords": [
      "Figma desktop",
      "Figma ներբեռնել",
      "скачать Figma",
      "UI UX դիզայն",
      "interface design"
    ]
  },
  {
    "id": "davinci",
    "slug": "davinci-resolve-19",
    "title": "DaVinci Resolve 19",
    "developer": "Blackmagic Design",
    "officialSite": "https://www.blackmagicdesign.com/products/davinciresolve",
    "primaryCategory": "design",
    "categories": [
      "design",
      "video-editing",
      "color-grading",
      "vfx"
    ],
    "version": "19.0",
    "license": "Freeware / Studio Edition",
    "os": "Windows 11/10 (64-bit), macOS, Linux",
    "osList": [
      "windows",
      "macos",
      "linux"
    ],
    "thumbnail": "/assets/software/davinci-resolve.svg",
    "images": [
      "/assets/software/davinci-resolve.svg"
    ],
    "downloads": [
      {
        "name": "DaVinci Resolve 19 Free Edition (Windows 64-bit)",
        "size": "2.4 GB",
        "format": "ZIP",
        "url": "https://www.blackmagicdesign.com/products/davinciresolve"
      },
      {
        "name": "DaVinci Resolve 19 for macOS",
        "size": "2.2 GB",
        "format": "DMG",
        "url": "https://www.blackmagicdesign.com/products/davinciresolve"
      }
    ],
    "description": "Hollywood's favorite solution for video editing, visual effects, motion graphics, color correction, and audio post production.",
    "descriptionHy": "Հոլիվուդյան մասնագիտական տեսամոնտաժի, գույների շտկման (Color Grading) և աուդիո մշակման անվճար հզոր ծրագիր։",
    "descriptionRu": "Профессиональный пакет для монтажа видео, цветокоррекции, визуальных эффектов и сведения звука.",
    "fullText": "DaVinci Resolve is the world's only solution that combines editing, color correction, visual effects, motion graphics and audio post production all in one software tool.",
    "features": [
      "Revolutionary Cut & Edit Workspaces",
      "Legendary 32-bit Float Color Grading",
      "Fusion VFX Node-Based Compositing",
      "Fairlight Professional Digital Audio Workstation",
      "Blackmagic Cloud Project Collaboration"
    ],
    "systemRequirements": {
      "os": "Windows 10/11 64-bit, macOS 13+",
      "ram": "16 GB RAM (32 GB recommended)",
      "disk": "10 GB SSD space",
      "cpu": "Intel Core i7 / AMD Ryzen 7, Dedicated 4GB+ GPU"
    },
    "ratingValue": 4.9,
    "reviewCount": 275,
    "published": "2024-10-02",
    "seoKeywords": [
      "DaVinci Resolve 19",
      "DaVinci ներբեռնել",
      "скачать DaVinci Resolve",
      "տեսամոնտաժի ծրագիր",
      "video editing Armenia"
    ]
  },
  {
    "id": "7zip",
    "slug": "7-zip",
    "title": "7-Zip",
    "developer": "Igor Pavlov",
    "officialSite": "https://www.7-zip.org/download.html",
    "primaryCategory": "utilities",
    "categories": [
      "utilities",
      "archive",
      "compression",
      "open-source"
    ],
    "version": "24.08",
    "license": "Free & Open Source",
    "os": "Windows 11/10/8/7 (32/64-bit), Linux, macOS",
    "osList": [
      "windows",
      "macos",
      "linux"
    ],
    "thumbnail": "/assets/software/7zip.svg",
    "images": [
      "/assets/software/7zip.svg"
    ],
    "downloads": [
      {
        "name": "7-Zip Official Windows 64-bit Installer",
        "size": "1.6 MB",
        "format": "EXE",
        "url": "https://www.7-zip.org/a/7z2408-x64.exe"
      },
      {
        "name": "7-Zip Official Windows ARM64 Installer",
        "size": "1.5 MB",
        "format": "EXE",
        "url": "https://www.7-zip.org/a/7z2408-arm64.exe"
      }
    ],
    "description": "High compression ratio file archiver with 7z format, LZMA2 compression, and strong AES-256 encryption.",
    "descriptionHy": "Աշխարհի լավագույն, ամենաթեթև և անվճար արխիվատորը՝ ZIP, RAR, 7Z ֆայլերը բացելու և սեղմելու համար։",
    "descriptionRu": "Бесплатный архиватор с высокой степенью сжатия для форматов 7z, ZIP, RAR, TAR, GZ с шифрованием AES-256.",
    "fullText": "7-Zip is a file archiver with a high compression ratio. You can use 7-Zip on any computer, including a computer in a commercial organization with zero fees.",
    "features": [
      "Highest Compression Ratio in 7z with LZMA/LZMA2",
      "Unpacks: ARJ, CAB, CHM, CPIO, DEB, DMG, ISO, LZH, LZMA, RAR, RPM, TAR, XZ, Z, ZIP",
      "Strong AES-256 Encryption in 7z & ZIP",
      "Windows Shell Integration",
      "Powerful Command Line Version"
    ],
    "systemRequirements": {
      "os": "Windows 11/10/8/7/Vista/XP",
      "ram": "256 MB RAM",
      "disk": "10 MB free space",
      "cpu": "Any x86/x64/ARM CPU"
    },
    "ratingValue": 4.9,
    "reviewCount": 610,
    "published": "2024-10-21",
    "seoKeywords": [
      "7-Zip",
      "7zip ներբեռնել",
      "скачать 7-Zip",
      "արխիվատոր",
      "file archiver Armenia"
    ]
  },
  {
    "id": "winrar",
    "slug": "winrar",
    "title": "WinRAR",
    "developer": "RARLab / win.rar GmbH",
    "officialSite": "https://www.win-rar.com/download.html",
    "primaryCategory": "utilities",
    "categories": [
      "utilities",
      "archive",
      "rar",
      "compression"
    ],
    "version": "7.01",
    "license": "Shareware / Trial",
    "os": "Windows 11/10/8/7 (64-bit)",
    "osList": [
      "windows"
    ],
    "thumbnail": "/assets/software/winrar.svg",
    "images": [
      "/assets/software/winrar.svg"
    ],
    "downloads": [
      {
        "name": "WinRAR Official Windows 64-bit Installer",
        "size": "3.6 MB",
        "format": "EXE",
        "url": "https://www.win-rar.com/download.html"
      }
    ],
    "description": "The world's standard RAR and ZIP archive manager with recovery record protection and multi-volume archives.",
    "descriptionHy": "Աշխարհի ամենատարածված արխիվատորներից մեկը՝ RAR և ZIP ֆայլերի արագ մշակմամբ և վերականգնման հնարավորությամբ։",
    "descriptionRu": "Один из самых популярных архиваторов в мире с поддержкой создания и распаковки архивов RAR и ZIP.",
    "fullText": "WinRAR is a powerful archive manager. It can backup your data and reduce the size of email attachments, decompress RAR, ZIP and other files downloaded from Internet and create new archives in RAR and ZIP file format.",
    "features": [
      "Original Creator of RAR & RAR5 Format",
      "Damage Recovery Records",
      "Multi-Volume Split Archives",
      "128/256-bit Password Encryption",
      "Full Windows 11 Context Menu Integration"
    ],
    "systemRequirements": {
      "os": "Windows 11/10/8/7 (64-bit)",
      "ram": "512 MB RAM",
      "disk": "15 MB free space",
      "cpu": "Any modern processor"
    },
    "ratingValue": 4.8,
    "reviewCount": 450,
    "published": "2024-09-18",
    "seoKeywords": [
      "WinRAR",
      "WinRAR ներբեռնել",
      "скачать WinRAR",
      "RAR ծրագիր",
      "արխիվացում"
    ]
  },
  {
    "id": "rufus",
    "slug": "rufus-usb-tool",
    "title": "Rufus",
    "developer": "Pete Batard",
    "officialSite": "https://rufus.ie/",
    "primaryCategory": "utilities",
    "categories": [
      "utilities",
      "bootable-usb",
      "windows",
      "iso",
      "open-source"
    ],
    "version": "4.6",
    "license": "Free & Open Source",
    "os": "Windows 11/10/8/7 (32/64-bit)",
    "osList": [
      "windows"
    ],
    "thumbnail": "/assets/software/rufus.svg",
    "images": [
      "/assets/software/rufus.svg"
    ],
    "downloads": [
      {
        "name": "Rufus Official Portable (Windows 64-bit)",
        "size": "1.5 MB",
        "format": "EXE",
        "url": "https://github.com/pbatard/rufus/releases/latest"
      },
      {
        "name": "Rufus Official Standalone Installer",
        "size": "1.5 MB",
        "format": "EXE",
        "url": "https://rufus.ie/"
      }
    ],
    "description": "Create bootable USB flash drives easily and bypass Windows 11 TPM, Secure Boot, and Microsoft Account requirements.",
    "descriptionHy": "Բեռնվող USB ֆլեշ կրիչներ (Bootable USB) պատրաստելու լավագույն և արագագույն գործիքը Windows-ի և Linux-ի համար։",
    "descriptionRu": "Утилита для создания загрузочных USB-накопителей с обходом требований Windows 11 (TPM, Secure Boot).",
    "fullText": "Rufus is a utility that helps format and create bootable USB flash drives, such as USB keys/pendrives, memory sticks, etc. It can be especially useful for cases where you need to create USB installation media from bootable ISOs (Windows, Linux, UEFI, etc.).",
    "features": [
      "Bypasses Windows 11 TPM 2.0 & RAM Requirements",
      "Bypasses Online Microsoft Account Requirement",
      "2x Faster than Windows 7 USB Tool or UNetbootin",
      "Full UEFI & Legacy BIOS MBR/GPT Support",
      "Zero Installation Required (Pure Portable)"
    ],
    "systemRequirements": {
      "os": "Windows 8 or later (Windows 10/11 recommended)",
      "ram": "512 MB RAM",
      "disk": "10 MB free space",
      "cpu": "Any x86/x64/ARM processor"
    },
    "ratingValue": 4.9,
    "reviewCount": 395,
    "published": "2024-10-18",
    "seoKeywords": [
      "Rufus",
      "Rufus ներբեռնել",
      "скачать Rufus",
      "Bootable USB",
      "Windows 11 USB պատրաստել",
      "բեռնվող ֆլեշկա"
    ]
  },
  {
    "id": "anydesk",
    "slug": "anydesk-remote-desktop",
    "title": "AnyDesk",
    "developer": "AnyDesk Software GmbH",
    "officialSite": "https://anydesk.com/en/downloads",
    "primaryCategory": "utilities",
    "categories": [
      "utilities",
      "remote-desktop",
      "it-support"
    ],
    "version": "8.1",
    "license": "Free for Personal Use",
    "os": "Windows 11/10/8/7, macOS, Linux, Android, iOS",
    "osList": [
      "windows",
      "macos",
      "linux"
    ],
    "thumbnail": "/assets/software/anydesk.svg",
    "images": [
      "/assets/software/anydesk.svg"
    ],
    "downloads": [
      {
        "name": "AnyDesk Official Portable for Windows",
        "size": "4.8 MB",
        "format": "EXE",
        "url": "https://download.anydesk.com/AnyDesk.exe"
      },
      {
        "name": "AnyDesk for macOS",
        "size": "18 MB",
        "format": "DMG",
        "url": "https://anydesk.com/en/downloads/mac-os"
      }
    ],
    "description": "Lightning-fast remote desktop access and support tool powered by the proprietary DeskRT codec with low latency.",
    "descriptionHy": "Հեռավար ղեկավարման (Remote Desktop) արագագույն գործիքը՝ ՏՏ մասնագետների և օգնության տրամադրման համար։",
    "descriptionRu": "Быстрая программа для удаленного доступа и техподдержки с минимальной задержкой и кодеком DeskRT.",
    "fullText": "Connect to a computer remotely, be it from the other end of the office or halfway around the world. AnyDesk ensures secure and reliable remote desktop connections for IT professionals and on-the-go individuals alike.",
    "features": [
      "Low 16ms Latency with 60 FPS",
      "Military-Grade TLS 1.2 & RSA 2048 Encryption",
      "Unattended Remote Access & File Transfer",
      "Zero Setup Required - Run Directly",
      "Multi-Monitor Remote Switching"
    ],
    "systemRequirements": {
      "os": "Windows 7 or later, macOS 10.13+",
      "ram": "1 GB RAM",
      "disk": "50 MB free space",
      "cpu": "Dual Core 1 GHz"
    },
    "ratingValue": 4.8,
    "reviewCount": 310,
    "published": "2024-10-12",
    "seoKeywords": [
      "AnyDesk",
      "AnyDesk ներբեռնել",
      "скачать AnyDesk",
      "հեռավար կառավարում",
      "remote support Armenia",
      "IT օգնություն"
    ]
  },
  {
    "id": "rustdesk",
    "slug": "rustdesk-remote-desktop",
    "title": "RustDesk",
    "developer": "RustDesk Team",
    "officialSite": "https://rustdesk.com/",
    "primaryCategory": "utilities",
    "categories": [
      "utilities",
      "remote-desktop",
      "open-source",
      "security"
    ],
    "version": "1.3",
    "license": "Free & Open Source",
    "os": "Windows, macOS, Linux, Android, iOS",
    "osList": [
      "windows",
      "macos",
      "linux"
    ],
    "thumbnail": "/assets/software/rustdesk.svg",
    "images": [
      "/assets/software/rustdesk.svg"
    ],
    "downloads": [
      {
        "name": "RustDesk Official Windows 64-bit Installer",
        "size": "22 MB",
        "format": "EXE",
        "url": "https://github.com/rustdesk/rustdesk/releases/latest"
      },
      {
        "name": "RustDesk for macOS",
        "size": "26 MB",
        "format": "DMG",
        "url": "https://github.com/rustdesk/rustdesk/releases/latest"
      }
    ],
    "description": "The full-featured open-source remote desktop alternative to TeamViewer and AnyDesk with self-hosting support.",
    "descriptionHy": "TeamViewer-ի և AnyDesk-ի բաց կոդով հզոր այլընտրանքը՝ գրված Rust լեզվով, առանց սահմանափակումների։",
    "descriptionRu": "Полноценный аналог TeamViewer и AnyDesk с открытым исходным кодом и возможностью своего сервера.",
    "fullText": "RustDesk is an open-source virtual / remote desktop infrastructure written in Rust. It works out of the box, with zero configuration required, and supports self-hosting for full privacy.",
    "features": [
      "100% Free & Open-Source",
      "End-to-End Encryption",
      "Self-Hosted Relay Server Option",
      "File Transfer & TCP Tunneling",
      "High Performance Written in Rust"
    ],
    "systemRequirements": {
      "os": "Windows 10/11, macOS, Linux",
      "ram": "1 GB RAM",
      "disk": "100 MB free space",
      "cpu": "x64 / ARM64"
    },
    "ratingValue": 4.9,
    "reviewCount": 160,
    "published": "2024-10-06",
    "seoKeywords": [
      "RustDesk",
      "RustDesk ներբեռնել",
      "скачать RustDesk",
      "open source remote desktop",
      "TeamViewer alternative"
    ]
  },
  {
    "id": "cpuz",
    "slug": "cpu-z-hwmonitor",
    "title": "CPU-Z",
    "developer": "CPUID",
    "officialSite": "https://www.cpuid.com/softwares/cpu-z.html",
    "primaryCategory": "utilities",
    "categories": [
      "utilities",
      "hardware",
      "cpu",
      "monitoring"
    ],
    "version": "2.11",
    "license": "Freeware",
    "os": "Windows 11/10/8/7 (32/64-bit)",
    "osList": [
      "windows"
    ],
    "thumbnail": "/assets/software/cpuz.svg",
    "images": [
      "/assets/software/cpuz.svg"
    ],
    "downloads": [
      {
        "name": "CPU-Z Official English Setup (Windows 64-bit)",
        "size": "3.2 MB",
        "format": "EXE",
        "url": "https://www.cpuid.com/softwares/cpu-z.html"
      },
      {
        "name": "CPU-Z Portable (ZIP 64-bit)",
        "size": "3.8 MB",
        "format": "ZIP",
        "url": "https://www.cpuid.com/softwares/cpu-z.html"
      }
    ],
    "description": "Accurate real-time hardware diagnostics for CPU clock speeds, motherboard chipset, RAM timings, and graphics.",
    "descriptionHy": "Համակարգչի պրոցեսորի (CPU), մայր պլատայի, օպերատիվ հիշողության (RAM) և վիդեոքարտի հուսալի դիագնոստիկա։",
    "descriptionRu": "Диагностическая утилита, отображающая детальную информацию о процессоре, материнской плате и памяти.",
    "fullText": "CPU-Z is a freeware that gathers information on some of the main devices of your system: Processor name and number, codename, process, package, cache levels, Mainboard and chipset, Memory type, size, timings, and module specifications (SPD).",
    "features": [
      "Live Core Clock & Voltage Monitoring",
      "Processor Microcode & Stepping Data",
      "SPD RAM Timings & XMP Profile Details",
      "Built-In CPU Benchmark & Stress Test",
      "Validated Hardware Submission Reports"
    ],
    "systemRequirements": {
      "os": "Windows 11/10/8/7/XP",
      "ram": "256 MB RAM",
      "disk": "10 MB free space",
      "cpu": "Any x86/x64 processor"
    },
    "ratingValue": 4.9,
    "reviewCount": 340,
    "published": "2024-09-25",
    "seoKeywords": [
      "CPU-Z",
      "CPU-Z ներբեռնել",
      "скачать CPU-Z",
      "համակարգչի պարամետրեր",
      "hardware monitor"
    ]
  },
  {
    "id": "malwarebytes",
    "slug": "malwarebytes-antivirus",
    "title": "Malwarebytes Free",
    "developer": "Malwarebytes Inc.",
    "officialSite": "https://www.malwarebytes.com/mwb-download",
    "primaryCategory": "utilities",
    "categories": [
      "utilities",
      "security",
      "antivirus",
      "malware"
    ],
    "version": "5.2",
    "license": "Freemium",
    "os": "Windows 11/10/8/7, macOS, Android, iOS",
    "osList": [
      "windows",
      "macos"
    ],
    "thumbnail": "/assets/software/malwarebytes.svg",
    "images": [
      "/assets/software/malwarebytes.svg"
    ],
    "downloads": [
      {
        "name": "Malwarebytes Official Standalone Setup (Windows)",
        "size": "295 MB",
        "format": "EXE",
        "url": "https://www.malwarebytes.com/mwb-download"
      },
      {
        "name": "Malwarebytes for macOS",
        "size": "85 MB",
        "format": "PKG",
        "url": "https://www.malwarebytes.com/mac-download"
      }
    ],
    "description": "Industry-leading anti-malware scanner that removes viruses, spyware, ransomware, and rootkits other security tools miss.",
    "descriptionHy": "Հզոր հակավիրուսային սկաներ՝ վիրուսները, տրոյանները, լրտեսող ծրագրերը և գովազդային վարակները հեռացնելու համար։",
    "descriptionRu": "Эффективная защита и удаление вирусов, программ-вымогателей, шпионского ПО и вредоносных программ.",
    "fullText": "Malwarebytes is an anti-malware software for Windows, macOS, Android, and iOS that finds and removes malware. It detects and removes threats that standard antivirus suites often miss.",
    "features": [
      "Advanced Heuristic Zero-Day Threat Detection",
      "Cleans Adware, PUPs & Hijackers",
      "Ransomware & Exploit Shielding",
      "Ultra-Fast System Scanner",
      "Non-Conflicting with Windows Defender"
    ],
    "systemRequirements": {
      "os": "Windows 10/11, macOS 10.15+",
      "ram": "2 GB RAM (4 GB recommended)",
      "disk": "500 MB free space",
      "cpu": "1.4 GHz or faster"
    },
    "ratingValue": 4.8,
    "reviewCount": 380,
    "published": "2024-10-14",
    "seoKeywords": [
      "Malwarebytes",
      "հակավիրուս",
      "скачать Malwarebytes",
      "antivirus Armenia",
      "վիրուսների մաքրում"
    ]
  },
  {
    "id": "vlc",
    "slug": "vlc-media-player",
    "title": "VLC Media Player",
    "developer": "VideoLAN Project",
    "officialSite": "https://www.videolan.org/vlc/",
    "primaryCategory": "media",
    "categories": [
      "media",
      "video-player",
      "audio",
      "open-source",
      "codecs"
    ],
    "version": "3.0.21",
    "license": "Free & Open Source",
    "os": "Windows 11/10/8/7, macOS, Linux, Android, iOS",
    "osList": [
      "windows",
      "macos",
      "linux"
    ],
    "thumbnail": "/assets/software/vlc.svg",
    "images": [
      "/assets/software/vlc.svg"
    ],
    "downloads": [
      {
        "name": "VLC Official Windows 64-bit Installer",
        "size": "42 MB",
        "format": "EXE",
        "url": "https://get.videolan.org/vlc/3.0.21/win64/vlc-3.0.21-win64.exe"
      },
      {
        "name": "VLC for macOS (Apple Silicon)",
        "size": "48 MB",
        "format": "DMG",
        "url": "https://get.videolan.org/vlc/3.0.21/macosx/vlc-3.0.21-arm64.dmg"
      },
      {
        "name": "VLC for macOS (Intel)",
        "size": "48 MB",
        "format": "DMG",
        "url": "https://get.videolan.org/vlc/3.0.21/macosx/vlc-3.0.21-intel64.dmg"
      }
    ],
    "description": "The supreme free multimedia player that plays everything: files, discs, webcams, devices, and streams with zero codec packs needed.",
    "descriptionHy": "Աշխարհի լավագույն անվճար նվագարկիչը՝ բացում է բոլոր տեսակի վիդեո և աուդիո ֆայլերը (MP4, MKV, AVI, 4K) առանց կոդեկների։",
    "descriptionRu": "Бесплатный универсальный медиаплеер, воспроизводящий практически любые видео- и аудиофайлы без кодеков.",
    "fullText": "VLC is a free and open source cross-platform multimedia player and framework that plays most multimedia files as well as DVDs, Audio CDs, VCDs, and various streaming protocols. No spyware, no ads and no user tracking.",
    "features": [
      "Plays All Formats: MPEG-4, MKV, AVI, MOV, FLAC, MP3, 4K/8K",
      "Hardware Decoding for GPU Acceleration",
      "Subtitle Synchronization & Online Fetching",
      "Audio Booster up to 200%",
      "Completely Free with Zero Ads"
    ],
    "systemRequirements": {
      "os": "Windows 7 or later, macOS 10.10+, Linux",
      "ram": "1 GB RAM",
      "disk": "150 MB free space",
      "cpu": "Any modern processor"
    },
    "ratingValue": 4.9,
    "reviewCount": 650,
    "published": "2024-10-18",
    "seoKeywords": [
      "VLC Media Player",
      "VLC ներբեռնել",
      "скачать VLC",
      "վիդեո նվագարկիչ",
      "video player Armenia",
      "MKV MP4 player"
    ]
  },
  {
    "id": "obs",
    "slug": "obs-studio",
    "title": "OBS Studio",
    "developer": "OBS Project",
    "officialSite": "https://obsproject.com/download",
    "primaryCategory": "media",
    "categories": [
      "media",
      "streaming",
      "recording",
      "open-source",
      "screen-capture"
    ],
    "version": "30.2",
    "license": "Free & Open Source",
    "os": "Windows 11/10 (64-bit), macOS, Linux",
    "osList": [
      "windows",
      "macos",
      "linux"
    ],
    "thumbnail": "/assets/software/obs.svg",
    "images": [
      "/assets/software/obs.svg"
    ],
    "downloads": [
      {
        "name": "OBS Studio Official Windows 64-bit Installer",
        "size": "130 MB",
        "format": "EXE",
        "url": "https://obsproject.com/download"
      },
      {
        "name": "OBS Studio for macOS (Apple Silicon)",
        "size": "145 MB",
        "format": "DMG",
        "url": "https://obsproject.com/download"
      },
      {
        "name": "OBS Studio for Linux (Flatpak / PPA)",
        "size": "120 MB",
        "format": "PPA",
        "url": "https://obsproject.com/download"
      }
    ],
    "description": "The gold standard for video recording and live streaming to YouTube, Twitch, Facebook, and custom RTMP servers.",
    "descriptionHy": "Աշխարհի թիվ 1 ծրագիրը էկրանի տեսագրման (Screen Record) և ուղիղ եթերների (Live Stream) համար YouTube-ում և Twitch-ում։",
    "descriptionRu": "Мощная программа с открытым исходным кодом для захвата видео с экрана и проведения прямых трансляций.",
    "fullText": "OBS Studio is a free and open source software for video recording and live streaming. Download and start streaming quickly and easily on Windows, Mac or Linux.",
    "features": [
      "Real-Time Video/Audio Capturing & Mixing",
      "Unlimited Scenes & Seamless Transitions",
      "Hardware Encoding (NVENC, AMD AMF, Intel QuickSync)",
      "Multi-Track Audio Mixer with Noise Gates",
      "Extensive Plugin & Virtual Camera Support"
    ],
    "systemRequirements": {
      "os": "Windows 10/11 64-bit, macOS 11+, Linux",
      "ram": "4 GB RAM (8 GB recommended)",
      "disk": "2 GB free space",
      "cpu": "Intel i5 quad-core or AMD Ryzen 5, DirectX 11 GPU"
    },
    "ratingValue": 4.9,
    "reviewCount": 480,
    "published": "2024-10-15",
    "seoKeywords": [
      "OBS Studio",
      "OBS ներբեռնել",
      "скачать ОБС",
      "էկրանի ձայնագրում",
      "stream ծրագիր",
      "streaming software Armenia"
    ]
  },
  {
    "id": "handbrake",
    "slug": "handbrake-transcoder",
    "title": "HandBrake",
    "developer": "The HandBrake Team",
    "officialSite": "https://handbrake.fr/downloads.php",
    "primaryCategory": "media",
    "categories": [
      "media",
      "video-converter",
      "compression",
      "open-source"
    ],
    "version": "1.8.2",
    "license": "Free & Open Source",
    "os": "Windows 11/10 (64-bit), macOS, Linux",
    "osList": [
      "windows",
      "macos",
      "linux"
    ],
    "thumbnail": "/assets/software/handbrake.svg",
    "images": [
      "/assets/software/handbrake.svg"
    ],
    "downloads": [
      {
        "name": "HandBrake Official Windows 64-bit Installer",
        "size": "24 MB",
        "format": "EXE",
        "url": "https://handbrake.fr/downloads.php"
      },
      {
        "name": "HandBrake for macOS (Universal)",
        "size": "32 MB",
        "format": "DMG",
        "url": "https://handbrake.fr/downloads.php"
      }
    ],
    "description": "Open-source video transcoder for converting video from nearly any format to a selection of modern, widely supported codecs.",
    "descriptionHy": "Անվճար ծրագիր տեսանյութերի ֆորմատը փոխելու (Converter) և չափսը առանց որակի կորստի սեղմելու համար։",
    "descriptionRu": "Бесплатный видеоконвертер с открытым исходным кодом для сжатия и конвертации видео в форматы MP4, MKV, WebM.",
    "fullText": "HandBrake is a tool for converting video from nearly any format to modern codecs such as H.264, H.265 (HEVC), AV1, and VP9 with hardware acceleration.",
    "features": [
      "Encodes to MP4, MKV, WebM",
      "Hardware Accelerated AV1, NVENC, VCE & QSV",
      "Built-In Device Presets (Apple, Android, Roku, Discord)",
      "Batch Video Queue Processing",
      "Subtitle & Audio Track Management"
    ],
    "systemRequirements": {
      "os": "Windows 10/11 64-bit, macOS 10.15+",
      "ram": "4 GB RAM",
      "disk": "300 MB free space",
      "cpu": "Modern multi-core 64-bit processor"
    },
    "ratingValue": 4.8,
    "reviewCount": 210,
    "published": "2024-10-08",
    "seoKeywords": [
      "HandBrake",
      "HandBrake ներբեռնել",
      "скачать HandBrake",
      "վիդեո կոնվերտեր",
      "video compressor"
    ]
  },
  {
    "id": "audacity",
    "slug": "audacity-audio-editor",
    "title": "Audacity",
    "developer": "Audacity Team / Muse Group",
    "officialSite": "https://www.audacityteam.org/download/",
    "primaryCategory": "media",
    "categories": [
      "media",
      "audio-editor",
      "recording",
      "open-source"
    ],
    "version": "3.6.4",
    "license": "Free & Open Source",
    "os": "Windows 11/10/8/7, macOS, Linux",
    "osList": [
      "windows",
      "macos",
      "linux"
    ],
    "thumbnail": "/assets/software/audacity.svg",
    "images": [
      "/assets/software/audacity.svg"
    ],
    "downloads": [
      {
        "name": "Audacity Official 64-bit Windows Installer",
        "size": "15 MB",
        "format": "EXE",
        "url": "https://www.audacityteam.org/download/windows/"
      },
      {
        "name": "Audacity for macOS (Universal)",
        "size": "40 MB",
        "format": "DMG",
        "url": "https://www.audacityteam.org/download/mac/"
      }
    ],
    "description": "Easy-to-use, multi-track audio recorder and editor with noise reduction, pitch correction, and VST3 plugin support.",
    "descriptionHy": "Ձայնագրման և աուդիո ֆայլերի մշակման լավագույն անվճար ծրագիրը՝ աղմուկի հեռացմամբ և էֆեկտներով։",
    "descriptionRu": "Популярный бесплатный аудиоредактор с поддержкой многодорожечной записи, удаления шума и плагинов VST3.",
    "fullText": "Audacity is an easy-to-use, multi-track audio editor and recorder for Windows, macOS, GNU/Linux and other operating systems. Developed by a group of volunteers as open source.",
    "features": [
      "Multi-Track Audio Recording & Editing",
      "Spectral Frequency Analysis",
      "Real-Time Noise Reduction & Compressor",
      "VST, VST3, AU & LADSPA Plugin Effects",
      "Export to MP3, WAV, FLAC, OGG"
    ],
    "systemRequirements": {
      "os": "Windows 7 or later, macOS 10.15+, Linux",
      "ram": "2 GB RAM",
      "disk": "100 MB free space",
      "cpu": "1 GHz processor"
    },
    "ratingValue": 4.8,
    "reviewCount": 340,
    "published": "2024-10-05",
    "seoKeywords": [
      "Audacity",
      "Audacity ներբեռնել",
      "скачать Audacity",
      "աուդիո խմբագրիչ",
      "ձայնագրման ծրագիր"
    ]
  },
  {
    "id": "potplayer",
    "slug": "potplayer",
    "title": "PotPlayer",
    "developer": "Kakao Corp",
    "officialSite": "https://potplayer.daum.net/",
    "primaryCategory": "media",
    "categories": [
      "media",
      "video-player",
      "codecs",
      "hardware-accel"
    ],
    "version": "24.0",
    "license": "Freeware",
    "os": "Windows 11/10/8/7 (32/64-bit)",
    "osList": [
      "windows"
    ],
    "thumbnail": "/assets/software/potplayer.svg",
    "images": [
      "/assets/software/potplayer.svg"
    ],
    "downloads": [
      {
        "name": "PotPlayer Official 64-bit Windows Installer",
        "size": "35 MB",
        "format": "EXE",
        "url": "https://potplayer.daum.net/"
      }
    ],
    "description": "Maximum hardware acceleration with DXVA, CUDA, and QuickSync for smooth 4K/8K HDR video playback.",
    "descriptionHy": "Հզոր վիդեո նվագարկիչ՝ 4K/8K HDR տեսանյութերի սահուն ցուցադրմամբ և վիդեոքարտի հզորացմամբ։",
    "descriptionRu": "Один из лучших плееров для Windows с мощным аппаратным ускорением (DXVA, CUDA) для 4K и 8K HDR видео.",
    "fullText": "PotPlayer provides the maximum performance with the minimum resource using DXVA, CUDA, QuickSync. Support various types of 3D glasses so you can get the 3D experience any time you want using your 3DTV or PC.",
    "features": [
      "Enhanced Hardware Acceleration (DXVA, CUDA, QuickSync)",
      "Immersive 3D & 360-Degree VR Video Support",
      "Comprehensive Subtitle Support (SMI, SRT, Vobsub, ASS)",
      "Snapshot Screen Capture & Video Clip Recording",
      "Dual Audio Output Support"
    ],
    "systemRequirements": {
      "os": "Windows 7, 8, 10, 11 (64-bit)",
      "ram": "1 GB RAM",
      "disk": "100 MB free space",
      "cpu": "Modern CPU with DirectX 9+"
    },
    "ratingValue": 4.8,
    "reviewCount": 290,
    "published": "2024-09-30",
    "seoKeywords": [
      "PotPlayer",
      "PotPlayer ներբեռնել",
      "скачать PotPlayer",
      "4K player",
      "վիդեո փլեյեր"
    ]
  },
  {
    "id": "totalcommander",
    "slug": "total-commander",
    "title": "Total Commander",
    "developer": "Christian Ghisler (Ghisler Software GmbH)",
    "officialSite": "https://www.ghisler.com/",
    "primaryCategory": "utilities",
    "categories": [
      "utilities",
      "file-manager",
      "ftp",
      "system"
    ],
    "version": "11.58",
    "license": "Shareware / Trial",
    "os": "Windows 11/10/8/7 (32/64-bit)",
    "osList": [
      "windows"
    ],
    "thumbnail": "/assets/software/totalcommander.svg",
    "images": [
      "/assets/software/totalcommander.svg"
    ],
    "downloads": [
      {
        "name": "Total Commander Official x64 (Windows 64-bit)",
        "size": "7.1 MB",
        "format": "EXE",
        "url": "https://www.ghisler.com/download.htm"
      },
      {
        "name": "Total Commander Official x32 (Windows 32-bit)",
        "size": "6.0 MB",
        "format": "EXE",
        "url": "https://www.ghisler.com/download.htm"
      }
    ],
    "description": "The premier orthodox dual-pane file manager for Windows with built-in FTP, archive handling, and plugin support.",
    "descriptionHy": "Ֆայլերի կառավարման ամենահայտնի երկվահանակավոր համակարգը՝ ներկառուցված FTP հաճախորդով, արխիվների բացմամբ և փլագիններով։",
    "descriptionRu": "Легендарный двухпанельный файловый менеджер со встроенным FTP-клиентом, архиватором и массовым переименованием.",
    "fullText": "Total Commander is a file manager for Windows similar to the Windows Explorer. But Total Commander uses a different approach: it has two parallel panels like a well-known DOS file manager with multiple tabs, background transfer manager, and file compare.",
    "features": [
      "Two File Windows Side by Side",
      "Multiple Language & Unicode Support",
      "Enhanced Search with Regular Expressions",
      "Built-in FTP Client with FXP & SFTP",
      "Multi-Rename Tool & File Synchronizer"
    ],
    "systemRequirements": {
      "os": "Windows 11, 10, 8, 7, Vista, XP",
      "ram": "512 MB RAM",
      "disk": "20 MB free space",
      "cpu": "Any Pentium-class CPU"
    },
    "ratingValue": 4.9,
    "reviewCount": 420,
    "published": "2024-10-18",
    "seoKeywords": [
      "Total Commander",
      "Total Commander ներբեռնել",
      "скачать Total Commander",
      "ֆայլ մենեջեր",
      "Total Commander Armenia"
    ]
  },
  {
    "id": "qbittorrent",
    "slug": "qbittorrent",
    "title": "qBittorrent",
    "developer": "The qBittorrent Project",
    "officialSite": "https://www.qbittorrent.org/",
    "primaryCategory": "utilities",
    "categories": [
      "utilities",
      "torrent",
      "p2p",
      "open-source",
      "downloads"
    ],
    "version": "5.0.1",
    "license": "Free & Open Source",
    "os": "Windows 11/10 (64-bit), macOS, Linux",
    "osList": [
      "windows",
      "macos",
      "linux"
    ],
    "thumbnail": "/assets/software/qbittorrent.svg",
    "images": [
      "/assets/software/qbittorrent.svg"
    ],
    "downloads": [
      {
        "name": "qBittorrent Official Windows 64-bit Installer",
        "size": "34 MB",
        "format": "EXE",
        "url": "https://www.qbittorrent.org/download"
      },
      {
        "name": "qBittorrent for macOS (Universal)",
        "size": "42 MB",
        "format": "DMG",
        "url": "https://www.qbittorrent.org/download"
      }
    ],
    "description": "Ad-free, open-source BitTorrent client with integrated search engine, sequential downloading, and Web UI.",
    "descriptionHy": "Աշխարհի լավագույն անվճար տորենտ սպասառուն՝ բաց կոդով, առանց որևէ գովազդի, ներկառուցված որոնիչով և IP ֆիլտրացիայով։",
    "descriptionRu": "Бесплатный торрент-клиент с открытым исходным кодом, без рекламы, со встроенным поиском торрентов.",
    "fullText": "The qBittorrent project aims to provide an open-source software alternative to µTorrent. It runs on all major platforms and provides the same features as µTorrent with zero ads or tracking.",
    "features": [
      "Polished µTorrent-Like User Interface",
      "Well-Integrated and Extensible Search Engine",
      "Sequential Downloading (Stream While Downloading)",
      "Advanced Bandwidth Scheduler",
      "Zero Advertisements or Sponsored Software"
    ],
    "systemRequirements": {
      "os": "Windows 10/11 64-bit, macOS 11+, Linux",
      "ram": "1 GB RAM",
      "disk": "100 MB free space",
      "cpu": "Modern CPU"
    },
    "ratingValue": 4.9,
    "reviewCount": 390,
    "published": "2024-10-20",
    "seoKeywords": [
      "qBittorrent",
      "տորենտ ներբեռնել",
      "скачать qBittorrent",
      "torrent client Armenia",
      "uTorrent alternative"
    ]
  },
  {
    "id": "virtualbox",
    "slug": "oracle-vm-virtualbox",
    "title": "Oracle VM VirtualBox",
    "developer": "Oracle Corporation",
    "officialSite": "https://www.virtualbox.org/",
    "primaryCategory": "dev",
    "categories": [
      "dev",
      "virtualization",
      "os",
      "system",
      "open-source"
    ],
    "version": "7.1.4",
    "license": "Free & Open Source",
    "os": "Windows 11/10 (64-bit), macOS, Linux",
    "osList": [
      "windows",
      "macos",
      "linux"
    ],
    "thumbnail": "/assets/software/virtualbox.svg",
    "images": [
      "/assets/software/virtualbox.svg"
    ],
    "downloads": [
      {
        "name": "VirtualBox Windows Host Installer (64-bit)",
        "size": "105 MB",
        "format": "EXE",
        "url": "https://www.virtualbox.org/wiki/Downloads"
      },
      {
        "name": "VirtualBox Extension Pack (All Platforms)",
        "size": "12 MB",
        "format": "vbox-extpack",
        "url": "https://www.virtualbox.org/wiki/Downloads"
      }
    ],
    "description": "Powerful x86 and AMD64/Intel64 virtualization software for enterprise as well as home use.",
    "descriptionHy": "Հզոր վիրտուալ մեքենա Oracle-ից՝ համակարգչի վրա այլ ՕՀ-ներ (Windows, Linux, macOS) փորձարկելու և աշխատեցնելու համար։",
    "descriptionRu": "Мощная бесплатная среда виртуализации для запуска любых операционных систем внутри вашей основной ОС.",
    "fullText": "VirtualBox is a powerful x86 and AMD64/Intel64 virtualization product for enterprise as well as home use. Extremely feature rich, high performance software for enterprise customers.",
    "features": [
      "Run Multiple Guest Operating Systems Concurrently",
      "Hardware Virtualization Support (VT-x / AMD-V)",
      "Shared Folders, Clipboard & Drag and Drop",
      "Live Snapshots & VM Cloning",
      "Virtual USB 3.0 & NVMe Controller Support"
    ],
    "systemRequirements": {
      "os": "Windows 10/11 64-bit, macOS, Linux",
      "ram": "8 GB RAM (16 GB recommended)",
      "disk": "30 GB free space for VMs",
      "cpu": "x64 CPU with Hardware Virtualization"
    },
    "ratingValue": 4.8,
    "reviewCount": 320,
    "published": "2024-10-15",
    "seoKeywords": [
      "VirtualBox",
      "VirtualBox ներբեռնել",
      "скачать VirtualBox",
      "վիրտուալ մեքենա",
      "virtual machine Armenia"
    ]
  },
  {
    "id": "aimp",
    "slug": "aimp-music-player",
    "title": "AIMP",
    "developer": "Artem Izmaylov",
    "officialSite": "https://www.aimp.ru/",
    "primaryCategory": "media",
    "categories": [
      "media",
      "audio-player",
      "music",
      "equalizer"
    ],
    "version": "5.40",
    "license": "Freeware",
    "os": "Windows 11/10/8/7 (32/64-bit), Android",
    "osList": [
      "windows"
    ],
    "thumbnail": "/assets/software/aimp.svg",
    "images": [
      "/assets/software/aimp.svg"
    ],
    "downloads": [
      {
        "name": "AIMP Official Windows Installer (64-bit)",
        "size": "18 MB",
        "format": "EXE",
        "url": "https://www.aimp.ru/?do=download"
      },
      {
        "name": "AIMP Official Portable (Windows)",
        "size": "16 MB",
        "format": "ZIP",
        "url": "https://www.aimp.ru/?do=download"
      }
    ],
    "description": "High-fidelity audio player with 18-band equalizer, sound effects, audio converter, and tag editor.",
    "descriptionHy": "Աշխարհի լավագույն երաժշտական նվագարկիչներից մեկը՝ 18-գծանի էկվալայզերով, ինտերնետ ռադիոյով և աուդիո կոնվերտերով։",
    "descriptionRu": "Качественный бесплатный аудиопроигрыватель с 18-полосным эквалайзером, интернет-радио и редактором тегов.",
    "fullText": "AIMP is a powerful audio player that allows you to listen to your music with an unbelievable sound quality. Its appearance is easily customizable with skins, and it supports virtually all audio formats.",
    "features": [
      "32-bit Sound Processing Engine",
      "18-Band Equalizer & Built-in Sound Effects",
      "Internet Radio Recording to MP3/WAV",
      "Multi-Format Audio Converter & Tag Editor",
      "Customizable Sleek Skins & Visualizations"
    ],
    "systemRequirements": {
      "os": "Windows 7 or later",
      "ram": "512 MB RAM",
      "disk": "50 MB free space",
      "cpu": "Any modern processor"
    },
    "ratingValue": 4.9,
    "reviewCount": 360,
    "published": "2024-10-10",
    "seoKeywords": [
      "AIMP",
      "AIMP ներբեռնել",
      "скачать AIMP",
      "աուդիո նվագարկիչ",
      "music player Armenia"
    ]
  },
  {
    "id": "klite",
    "slug": "k-lite-codec-pack",
    "title": "K-Lite Codec Pack",
    "developer": "Codec Guide",
    "officialSite": "https://codecguide.com/",
    "primaryCategory": "media",
    "categories": [
      "media",
      "codecs",
      "video-player",
      "audio",
      "system"
    ],
    "version": "20.0 Full",
    "license": "Freeware",
    "os": "Windows 11/10/8/7 (32/64-bit)",
    "osList": [
      "windows"
    ],
    "thumbnail": "/assets/software/klite.svg",
    "images": [
      "/assets/software/klite.svg"
    ],
    "downloads": [
      {
        "name": "K-Lite Codec Pack Full Official Installer",
        "size": "62 MB",
        "format": "EXE",
        "url": "https://codecguide.com/download_k-lite_codec_pack_full.htm"
      },
      {
        "name": "K-Lite Codec Pack Standard Installer",
        "size": "45 MB",
        "format": "EXE",
        "url": "https://codecguide.com/download_k-lite_codec_pack_standard.htm"
      }
    ],
    "description": "The definitive collection of DirectShow filters, VFW/ACM codecs, and tools including Media Player Classic Home Cinema.",
    "descriptionHy": "Կոդեկների և ֆիլտրերի համաշխարհային հավաքածու՝ ցանկացած վիդեո կամ աուդիո ֆայլ Windows-ում սահուն բացելու համար (MPC-HC-ով)։",
    "descriptionRu": "Универсальный набор кодеков и фильтров DirectShow для воспроизведения любых форматов мультимедиа в Windows.",
    "fullText": "K-Lite Codec Pack is a collection of audio and video codecs for Microsoft Windows that enables an operating system and its software to play various audio and video formats generally not supported by the OS itself.",
    "features": [
      "Includes Media Player Classic Home Cinema (MPC-HC)",
      "Plays 100% of Audio and Video Formats",
      "Hardware Accelerated 4K/8K Decoding",
      "LAV Filters & VSFilter Subtitle Engine",
      "Regularly Updated with Zero Conflicts"
    ],
    "systemRequirements": {
      "os": "Windows 7, 8, 10, 11 (32/64-bit)",
      "ram": "1 GB RAM",
      "disk": "150 MB free space",
      "cpu": "Any modern CPU"
    },
    "ratingValue": 4.9,
    "reviewCount": 470,
    "published": "2024-10-18",
    "seoKeywords": [
      "K-Lite Codec Pack",
      "կոդեկներ ներբեռնել",
      "скачать K-Lite Codec Pack",
      "codecs Armenia",
      "MPC HC"
    ]
  },
  {
    "id": "crystaldiskinfo",
    "slug": "crystaldiskinfo",
    "title": "CrystalDiskInfo",
    "developer": "Noriyuki Miyazaki (Crystal Dew World)",
    "officialSite": "https://crystalmark.info/",
    "primaryCategory": "utilities",
    "categories": [
      "utilities",
      "hdd",
      "ssd",
      "nvme",
      "diagnostics",
      "open-source"
    ],
    "version": "9.5.0",
    "license": "Free & Open Source",
    "os": "Windows 11/10/8/7 (32/64-bit)",
    "osList": [
      "windows"
    ],
    "thumbnail": "/assets/software/crystaldiskinfo.svg",
    "images": [
      "/assets/software/crystaldiskinfo.svg"
    ],
    "downloads": [
      {
        "name": "CrystalDiskInfo Standard Official Setup",
        "size": "6.5 MB",
        "format": "EXE",
        "url": "https://crystalmark.info/en/download/"
      },
      {
        "name": "CrystalDiskInfo Portable (ZIP)",
        "size": "7.8 MB",
        "format": "ZIP",
        "url": "https://crystalmark.info/en/download/"
      }
    ],
    "description": "HDD/SSD health monitoring utility displaying S.M.A.R.T. status, temperature, read/write totals, and drive lifespan.",
    "descriptionHy": "Կոշտ սկավառակների (HDD/SSD/NVMe) առողջության, ջերմաստիճանի և մնացորդային ռեսուրսի հուսալի ստուգիչ (S.M.A.R.T.):",
    "descriptionRu": "Утилита для диагностики и мониторинга состояния жестких дисков и твердотельных накопителей SSD/NVMe.",
    "fullText": "CrystalDiskInfo is a HDD/SSD utility software which supports a part of USB, Intel/AMD RAID and NVMe. It reads S.M.A.R.T. information and tells you the health status of your storage drive.",
    "features": [
      "Supports S.M.A.R.T. for HDD, SSD and NVMe Drives",
      "Live Real-Time Temperature Monitoring",
      "Drive Health Status Alarm Notifications",
      "Total Host Reads & Writes Statistics",
      "Power-On Hours & Count Tracking"
    ],
    "systemRequirements": {
      "os": "Windows 11/10/8/7/XP",
      "ram": "256 MB RAM",
      "disk": "25 MB free space",
      "cpu": "Any processor"
    },
    "ratingValue": 4.9,
    "reviewCount": 380,
    "published": "2024-10-12",
    "seoKeywords": [
      "CrystalDiskInfo",
      "SSD ստուգում",
      "скачать CrystalDiskInfo",
      "HDD health Armenia",
      "диск դիագնոստիկա"
    ]
  },
  {
    "id": "krita",
    "slug": "krita-digital-painting",
    "title": "Krita",
    "developer": "Krita Foundation / Stichting Krita",
    "officialSite": "https://krita.org/",
    "primaryCategory": "design",
    "categories": [
      "design",
      "digital-art",
      "illustration",
      "open-source",
      "drawing"
    ],
    "version": "5.2.6",
    "license": "Free & Open Source",
    "os": "Windows 11/10 (64-bit), macOS, Linux",
    "osList": [
      "windows",
      "macos",
      "linux"
    ],
    "thumbnail": "/assets/software/krita.svg",
    "images": [
      "/assets/software/krita.svg"
    ],
    "downloads": [
      {
        "name": "Krita Official Windows 64-bit Installer",
        "size": "140 MB",
        "format": "EXE",
        "url": "https://krita.org/en/download/krita-desktop/"
      },
      {
        "name": "Krita for macOS (Apple Silicon & Intel)",
        "size": "165 MB",
        "format": "DMG",
        "url": "https://krita.org/en/download/krita-desktop/"
      }
    ],
    "description": "Professional free and open-source painting program made by artists for concept art, comics, and digital painting.",
    "descriptionHy": "Թվային նկարչության և անիմացիայի բարձրակարգ անվճար ծրագիր՝ նկարիչների և պատկերազարդողների (Illustrators) համար։",
    "descriptionRu": "Профессиональная бесплатная программа для цифровой живописи, иллюстраций, комиксов и 2D-анимации.",
    "fullText": "Krita is a professional FREE and open source painting program. It is made by artists that want to see affordable art tools for everyone. Concept art, texture and matte painters, illustrations and comics.",
    "features": [
      "100+ Professional Brushes & Stabilizers",
      "Brush Resource Managers & Custom Presets",
      "Frame-by-Frame 2D Animation Tools",
      "Full Color Management (ICC, CMYK, HDR)",
      "Support for Drawing Tablets (Wacom, Huion, XP-Pen)"
    ],
    "systemRequirements": {
      "os": "Windows 10/11 64-bit, macOS 10.15+, Linux",
      "ram": "4 GB RAM (8 GB recommended)",
      "disk": "1 GB free space",
      "cpu": "Multi-core processor with OpenGL 3.0+"
    },
    "ratingValue": 4.9,
    "reviewCount": 310,
    "published": "2024-10-17",
    "seoKeywords": [
      "Krita",
      "Krita ներբեռնել",
      "скачать Krita",
      "թվային նկարչություն",
      "digital painting Armenia"
    ]
  },
  {
    "id": "winscp",
    "slug": "winscp-sftp-client",
    "title": "WinSCP",
    "developer": "Martin Prikryl",
    "officialSite": "https://winscp.net/",
    "primaryCategory": "utilities",
    "categories": [
      "utilities",
      "sftp",
      "ftp",
      "ssh",
      "network",
      "open-source"
    ],
    "version": "6.3.5",
    "license": "Free & Open Source",
    "os": "Windows 11/10/8/7 (32/64-bit)",
    "osList": [
      "windows"
    ],
    "thumbnail": "/assets/software/winscp.svg",
    "images": [
      "/assets/software/winscp.svg"
    ],
    "downloads": [
      {
        "name": "WinSCP Official Installation Package",
        "size": "11 MB",
        "format": "EXE",
        "url": "https://winscp.net/eng/download.php"
      },
      {
        "name": "WinSCP Portable Executable",
        "size": "9 MB",
        "format": "ZIP",
        "url": "https://winscp.net/eng/download.php"
      }
    ],
    "description": "Popular SFTP and FTP client for Windows for secure file transfer between local computer and remote server.",
    "descriptionHy": "Անվճար SFTP և FTP հաճախորդ՝ սերվերների հետ ապահով ֆայլային փոխանակման և կայքերի կառավարման համար։",
    "descriptionRu": "Популярный бесплатный графический SFTP и FTP клиент для Windows с поддержкой защищенного протокола SSH.",
    "fullText": "WinSCP is an open source free SFTP client, FTP client, WebDAV client, S3 client and SCP client for Windows. Its main function is file transfer between a local and a remote computer.",
    "features": [
      "Graphical User Interface (Commander & Explorer Interface)",
      "Integrated Text Editor for Remote File Editing",
      "Support for SFTP, SCP, FTP, WebDAV, Amazon S3",
      "Directory Synchronization (Semi or Fully Automatic)",
      "Scripting and Command-Line Automation"
    ],
    "systemRequirements": {
      "os": "Windows 7 or later (32/64-bit)",
      "ram": "512 MB RAM",
      "disk": "30 MB free space",
      "cpu": "Any modern CPU"
    },
    "ratingValue": 4.9,
    "reviewCount": 330,
    "published": "2024-10-13",
    "seoKeywords": [
      "WinSCP",
      "WinSCP ներբեռնել",
      "скачать WinSCP",
      "SFTP client Armenia",
      "սերվերների կառավարում"
    ]
  },
  {
    "id": "putty",
    "slug": "putty-ssh-telnet",
    "title": "PuTTY",
    "developer": "Simon Tatham",
    "officialSite": "https://www.chiark.greenend.org.uk/~sgtatham/putty/",
    "primaryCategory": "dev",
    "categories": [
      "dev",
      "ssh",
      "telnet",
      "terminal",
      "system",
      "open-source"
    ],
    "version": "0.82",
    "license": "Free & Open Source",
    "os": "Windows 11/10/8/7, Linux",
    "osList": [
      "windows",
      "linux"
    ],
    "thumbnail": "/assets/software/putty.svg",
    "images": [
      "/assets/software/putty.svg"
    ],
    "downloads": [
      {
        "name": "PuTTY Official Windows 64-bit Installer (MSI)",
        "size": "3.5 MB",
        "format": "MSI",
        "url": "https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html"
      },
      {
        "name": "PuTTY 64-bit Standalone (.exe)",
        "size": "1.8 MB",
        "format": "EXE",
        "url": "https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html"
      }
    ],
    "description": "The standard terminal emulator, serial console, and network file transfer application supporting SSH, Telnet, and raw sockets.",
    "descriptionHy": "Համաշխարհային ստանդարտ SSH/Telnet տերմինալ՝ Linux սերվերների և ցանցային սարքերի (Routers, Switches) հեռավար կառավարման համար։",
    "descriptionRu": "Классический бесплатный клиент для протоколов SSH, Telnet, SCP и SFTP для удаленного управления серверами.",
    "fullText": "PuTTY is a free and open-source terminal emulator, serial console and network file transfer application. It supports several network protocols, including SCP, SSH, Telnet, rlogin, and raw socket connection.",
    "features": [
      "Supports All SSH-2 and SSH-1 Ciphers",
      "Public-Key Authentication with Pageant & PuTTYgen",
      "Port Forwarding and X11 Forwarding",
      "Serial Port Connection for Cisco & Mikrotik Hardware",
      "Extremely Lightweight and Portable"
    ],
    "systemRequirements": {
      "os": "Windows 11/10/8/7/XP",
      "ram": "128 MB RAM",
      "disk": "10 MB free space",
      "cpu": "Any processor"
    },
    "ratingValue": 4.9,
    "reviewCount": 410,
    "published": "2024-10-17",
    "seoKeywords": [
      "PuTTY",
      "PuTTY ներբեռնել",
      "скачать PuTTY",
      "SSH client Armenia",
      "սերվերի կոնսոլ"
    ]
  },
  {
    "id": "python",
    "slug": "python-programming",
    "title": "Python",
    "developer": "Python Software Foundation",
    "officialSite": "https://www.python.org/",
    "primaryCategory": "dev",
    "categories": [
      "dev",
      "python",
      "programming",
      "ai",
      "open-source",
      "language"
    ],
    "version": "3.13",
    "license": "Free & Open Source",
    "os": "Windows 11/10 (64-bit), macOS, Linux",
    "osList": [
      "windows",
      "macos",
      "linux"
    ],
    "thumbnail": "/assets/software/python.svg",
    "images": [
      "/assets/software/python.svg"
    ],
    "downloads": [
      {
        "name": "Python 3.13 Official Windows Installer (64-bit)",
        "size": "26 MB",
        "format": "EXE",
        "url": "https://www.python.org/downloads/windows/"
      },
      {
        "name": "Python for macOS (Universal PKG)",
        "size": "44 MB",
        "format": "PKG",
        "url": "https://www.python.org/downloads/macos/"
      }
    ],
    "description": "The world's fastest growing programming language for AI, data science, web development, and automation.",
    "descriptionHy": "Աշխարհի ամենապահանջված ծրագրավորման լեզուն՝ Արհեստական Բանականության (AI), Data Science-ի և ավտոմատացման համար։",
    "descriptionRu": "Самый популярный язык программирования для искусственного интеллекта, машинного обучения, бэкенда и скриптов.",
    "fullText": "Python is an interpreted, high-level and general-purpose programming language. Python's design philosophy emphasizes code readability with its notable use of significant whitespace.",
    "features": [
      "Bundled with pip Package Manager & IDLE IDE",
      "World Standard for AI, PyTorch & TensorFlow",
      "Massive Standard Library ('Batteries Included')",
      "Cross-Platform Code Execution",
      "Extensive Scientific Ecosystem (NumPy, Pandas)"
    ],
    "systemRequirements": {
      "os": "Windows 10/11 64-bit, macOS 10.15+, Linux",
      "ram": "2 GB RAM",
      "disk": "200 MB free space",
      "cpu": "Any modern processor"
    },
    "ratingValue": 5,
    "reviewCount": 650,
    "published": "2024-10-16",
    "seoKeywords": [
      "Python",
      "Python ներբեռնել",
      "скачать Python",
      "Python ծրագրավորում",
      "AI development Armenia"
    ]
  }
,
{
  "id": "ac3-filter",
  "slug": "ac3-filter",
  "title": "AC3 Filter",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/AC3Filter",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "2.6b",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/ac3-filter.svg",
  "images": [
    "/assets/software/ac3-filter.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 441,
  "ratingValue": "3.8",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "armenian-phonetic-eastern-unicode-keyboard-layout",
  "slug": "armenian-phonetic-eastern-unicode-keyboard-layout",
  "title": "Armenian Phonetic Eastern Unicode Keyboard Layout",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/ArmenianPhoneticEasternUnicodeKeyboardLayout",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "1.0",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/armenian-phonetic-eastern-unicode-keyboard-layout.svg",
  "images": [
    "/assets/software/armenian-phonetic-eastern-unicode-keyboard-layout.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 299,
  "ratingValue": "3.9",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "auto-gordian-knot",
  "slug": "auto-gordian-knot",
  "title": "Auto Gordian Knot",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/AutoGordianKnot",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "2.55",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/auto-gordian-knot.svg",
  "images": [
    "/assets/software/auto-gordian-knot.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 184,
  "ratingValue": "4.4",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "armenian-text-converter",
  "slug": "armenian-text-converter",
  "title": "Armenian Text Converter",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/ArmenianTextConverter",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "1.1",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/armenian-text-converter.svg",
  "images": [
    "/assets/software/armenian-text-converter.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 117,
  "ratingValue": "3.9",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "adobe-reader-dc",
  "slug": "adobe-reader-dc",
  "title": "Adobe Reader DC",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/AdobeReader",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "26.002.21931",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/adobe-reader-dc.svg",
  "images": [
    "/assets/software/adobe-reader-dc.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 239,
  "ratingValue": "4.4",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "apache-openoffice",
  "slug": "apache-openoffice",
  "title": "Apache OpenOffice",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/OpenOffice",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "4.1.16",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/apache-openoffice.svg",
  "images": [
    "/assets/software/apache-openoffice.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 132,
  "ratingValue": "4.4",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "armenian-nls",
  "slug": "armenian-nls",
  "title": "Armenian NLS",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/ArmNLS",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "2.0.1",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/armenian-nls.svg",
  "images": [
    "/assets/software/armenian-nls.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 236,
  "ratingValue": "4.4",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "apache-http-server",
  "slug": "apache-http-server",
  "title": "Apache HTTP Server",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/ApacheHTTPServer",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "2.4.68-260827VC18",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/apache-http-server.svg",
  "images": [
    "/assets/software/apache-http-server.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 246,
  "ratingValue": "3.9",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "artweaver-free",
  "slug": "artweaver-free",
  "title": "Artweaver Free",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/Artweaver",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "8.1.6",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/artweaver-free.svg",
  "images": [
    "/assets/software/artweaver-free.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 113,
  "ratingValue": "4.8",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "armenian-unicode-converter",
  "slug": "armenian-unicode-converter",
  "title": "Armenian Unicode Converter",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/ArmUnicodeConverter",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "1.07",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/armenian-unicode-converter.svg",
  "images": [
    "/assets/software/armenian-unicode-converter.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 55,
  "ratingValue": "3.9",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "autoruns",
  "slug": "autoruns",
  "title": "Autoruns",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/Autoruns",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "14.3",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/autoruns.svg",
  "images": [
    "/assets/software/autoruns.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 187,
  "ratingValue": "3.9",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "bonelab",
  "slug": "bonelab",
  "title": "BoneLab",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/BoneLab",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "1.0.3.5",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/bonelab.svg",
  "images": [
    "/assets/software/bonelab.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 494,
  "ratingValue": "4.7",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "avira-free-security",
  "slug": "avira-free-security",
  "title": "Avira Free Security",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/AviraAntiVir",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "1.1.116.3428",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/avira-free-security.svg",
  "images": [
    "/assets/software/avira-free-security.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 160,
  "ratingValue": "3.8",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "bloodshed-dev-c",
  "slug": "bloodshed-dev-c",
  "title": "Bloodshed DEV-C++",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/BloodshedDEVCPP",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "4.9.9.2",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/bloodshed-dev-c.svg",
  "images": [
    "/assets/software/bloodshed-dev-c.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 265,
  "ratingValue": "3.8",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "avast-free-antivirus-2026-09-17-03-03-38",
  "slug": "avast-free-antivirus-2026-09-17-03-03-38",
  "title": "Avast Free Antivirus 2026.09.17_03.03.38",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/AvastFreeAntivirus",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "1.0",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/avast-free-antivirus-2026-09-17-03-03-38.svg",
  "images": [
    "/assets/software/avast-free-antivirus-2026-09-17-03-03-38.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 514,
  "ratingValue": "4.0",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "burnaware-free",
  "slug": "burnaware-free",
  "title": "BurnAware Free",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/BurnAwareFree",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "19.4",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/burnaware-free.svg",
  "images": [
    "/assets/software/burnaware-free.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 399,
  "ratingValue": "5.0",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "chromium-build",
  "slug": "chromium-build",
  "title": "Chromium build",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/Chromium",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "1701421",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/chromium-build.svg",
  "images": [
    "/assets/software/chromium-build.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 215,
  "ratingValue": "4.0",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "codeblocks-ide-mingw-compiler",
  "slug": "codeblocks-ide-mingw-compiler",
  "title": "Codeblocks IDE (+MINGW compiler)",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/CodeblocksIDE",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "17.12",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/codeblocks-ide-mingw-compiler.svg",
  "images": [
    "/assets/software/codeblocks-ide-mingw-compiler.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 529,
  "ratingValue": "4.5",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "celestia",
  "slug": "celestia",
  "title": "Celestia",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/Celestia",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "1.6.4",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/celestia.svg",
  "images": [
    "/assets/software/celestia.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 353,
  "ratingValue": "4.8",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "cleanafterme",
  "slug": "cleanafterme",
  "title": "CleanAfterMe",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/CleanAfterMe",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "1.37",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/cleanafterme.svg",
  "images": [
    "/assets/software/cleanafterme.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 87,
  "ratingValue": "4.0",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "dopdf",
  "slug": "dopdf",
  "title": "doPDF",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/doPDF",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "11.9.523",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/dopdf.svg",
  "images": [
    "/assets/software/dopdf.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպութ��ունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գ...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպութ��ունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գ...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպութ��ունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գ...",
  "reviewCount": 187,
  "ratingValue": "4.5",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "downloadmaster",
  "slug": "downloadmaster",
  "title": "DownloadMaster",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/DownloadMaster",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "7.3",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/downloadmaster.svg",
  "images": [
    "/assets/software/downloadmaster.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 517,
  "ratingValue": "4.9",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "double-driver",
  "slug": "double-driver",
  "title": "Double Driver",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/DoubleDriver",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "4.1.0",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/double-driver.svg",
  "images": [
    "/assets/software/double-driver.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 284,
  "ratingValue": "4.5",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "dbeaver",
  "slug": "dbeaver",
  "title": "DBeaver",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/DBeaver",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "26.2.0",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/dbeaver.svg",
  "images": [
    "/assets/software/dbeaver.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայ��երը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գ...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայ��երը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գ...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայ��երը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գ...",
  "reviewCount": 278,
  "ratingValue": "4.4",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "dr-web-cureit",
  "slug": "dr-web-cureit",
  "title": "Dr.Web CureIt",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/DrWebCureIt",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "1.0",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/dr-web-cureit.svg",
  "images": [
    "/assets/software/dr-web-cureit.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 307,
  "ratingValue": "4.6",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "djvureader",
  "slug": "djvureader",
  "title": "DjVuReader",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/DjVuReader",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "2.0.0.26",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/djvureader.svg",
  "images": [
    "/assets/software/djvureader.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 229,
  "ratingValue": "4.2",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "driverbackup",
  "slug": "driverbackup",
  "title": "DriverBackup",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/DriverBackup",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "2.1.R7",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/driverbackup.svg",
  "images": [
    "/assets/software/driverbackup.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 111,
  "ratingValue": "4.9",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "dvd-decrypter",
  "slug": "dvd-decrypter",
  "title": "DVD Decrypter",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/DVDDecrypter",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "3.5.4.0",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/dvd-decrypter.svg",
  "images": [
    "/assets/software/dvd-decrypter.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 255,
  "ratingValue": "4.7",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "eclipse-ide-for-c-c-developers",
  "slug": "eclipse-ide-for-c-c-developers",
  "title": "Eclipse IDE for C/C++ Developers",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/EclipseIDECCPP",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "2026-09.R",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/eclipse-ide-for-c-c-developers.svg",
  "images": [
    "/assets/software/eclipse-ide-for-c-c-developers.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ��նչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գ...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ��նչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գ...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ��նչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գ...",
  "reviewCount": 409,
  "ratingValue": "4.5",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "eclipse-ide-for-enterprise-java-developers",
  "slug": "eclipse-ide-for-enterprise-java-developers",
  "title": "Eclipse IDE for Enterprise Java Developers",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/EclipseIDEJavaEE",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "2026-09.R",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/eclipse-ide-for-enterprise-java-developers.svg",
  "images": [
    "/assets/software/eclipse-ide-for-enterprise-java-developers.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 207,
  "ratingValue": "3.8",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "evolus-pencil",
  "slug": "evolus-pencil",
  "title": "Evolus Pencil",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/EvolusPencil",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "3.1.1.ga",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/evolus-pencil.svg",
  "images": [
    "/assets/software/evolus-pencil.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 319,
  "ratingValue": "3.9",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "eclipse-ide-for-php",
  "slug": "eclipse-ide-for-php",
  "title": "Eclipse IDE for PHP",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/EclipseIDEPHP",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "2026-09.R",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/eclipse-ide-for-php.svg",
  "images": [
    "/assets/software/eclipse-ide-for-php.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 403,
  "ratingValue": "4.9",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "far-manager",
  "slug": "far-manager",
  "title": "Far Manager",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/FarManager",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "3.0.6699",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/far-manager.svg",
  "images": [
    "/assets/software/far-manager.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայք��ւմ տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գ...",
  "descriptionHy": "Ուշադրություն: Կայք��ւմ տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գ...",
  "descriptionRu": "Ուշադրություն: Կայք��ւմ տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գ...",
  "reviewCount": 321,
  "ratingValue": "5.0",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "filezilla",
  "slug": "filezilla",
  "title": "FileZilla",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/FileZilla",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "3.69.3",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/filezilla.svg",
  "images": [
    "/assets/software/filezilla.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 485,
  "ratingValue": "4.8",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "flashmovieplayer",
  "slug": "flashmovieplayer",
  "title": "FlashMoviePlayer",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/FlashMoviePlayer",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "1.5",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/flashmovieplayer.svg",
  "images": [
    "/assets/software/flashmovieplayer.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 51,
  "ratingValue": "4.1",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "foobar2000",
  "slug": "foobar2000",
  "title": "foobar2000",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/foobar2000",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "2.25.10",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/foobar2000.svg",
  "images": [
    "/assets/software/foobar2000.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 300,
  "ratingValue": "4.0",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "free-pascal-compiler",
  "slug": "free-pascal-compiler",
  "title": "Free Pascal Compiler",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/FreePascalCompiler",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "3.2.2",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/free-pascal-compiler.svg",
  "images": [
    "/assets/software/free-pascal-compiler.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 320,
  "ratingValue": "3.9",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "free-download-manager",
  "slug": "free-download-manager",
  "title": "Free Download Manager",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/FreeDownloadManager",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "6.35",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/free-download-manager.svg",
  "images": [
    "/assets/software/free-download-manager.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպո��թյունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գ...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպո��թյունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գ...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպո��թյունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գ...",
  "reviewCount": 257,
  "ratingValue": "3.6",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "flv-player",
  "slug": "flv-player",
  "title": "FLV Player",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/FLVPlayer",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "0.0.5",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/flv-player.svg",
  "images": [
    "/assets/software/flv-player.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 421,
  "ratingValue": "5.0",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "foxit-reader",
  "slug": "foxit-reader",
  "title": "Foxit Reader",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/FoxitReader",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "11.2.2.53575",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/foxit-reader.svg",
  "images": [
    "/assets/software/foxit-reader.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 527,
  "ratingValue": "4.5",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "freedos",
  "slug": "freedos",
  "title": "FreeDOS",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/FreeDOS",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "1.1",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/freedos.svg",
  "images": [
    "/assets/software/freedos.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 444,
  "ratingValue": "4.4",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "hwmonitor",
  "slug": "hwmonitor",
  "title": "HWMonitor",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/HWMonitor",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "1.68",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/hwmonitor.svg",
  "images": [
    "/assets/software/hwmonitor.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 340,
  "ratingValue": "3.8",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "hxd",
  "slug": "hxd",
  "title": "HxD",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/HxD",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "2.5.0.0",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/hxd.svg",
  "images": [
    "/assets/software/hxd.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 347,
  "ratingValue": "3.8",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "inkscape",
  "slug": "inkscape",
  "title": "Inkscape",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/Inkscape",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "1.4.4",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/inkscape.svg",
  "images": [
    "/assets/software/inkscape.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 315,
  "ratingValue": "3.6",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "hashmyfiles",
  "slug": "hashmyfiles",
  "title": "HashMyFiles",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/HashMyFiles",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "2.51",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/hashmyfiles.svg",
  "images": [
    "/assets/software/hashmyfiles.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 266,
  "ratingValue": "4.0",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "hwinfo",
  "slug": "hwinfo",
  "title": "HWiNFO",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/HWiNFO",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "8.52",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/hwinfo.svg",
  "images": [
    "/assets/software/hwinfo.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 538,
  "ratingValue": "4.3",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "geany-gtk",
  "slug": "geany-gtk",
  "title": "Geany  GTK+",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/Geany",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "2.1",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/geany-gtk.svg",
  "images": [
    "/assets/software/geany-gtk.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 408,
  "ratingValue": "3.8",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "gwbasic",
  "slug": "gwbasic",
  "title": "GWBasic",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/GWBasic",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "3.23",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/gwbasic.svg",
  "images": [
    "/assets/software/gwbasic.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինակ��ն) գ...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինակ��ն) գ...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինակ��ն) գ...",
  "reviewCount": 169,
  "ratingValue": "3.9",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "icofx",
  "slug": "icofx",
  "title": "IcoFX",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/IcoFX",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "1.6.4",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/icofx.svg",
  "images": [
    "/assets/software/icofx.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 210,
  "ratingValue": "4.7",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "freemind",
  "slug": "freemind",
  "title": "FreeMind",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/FreeMind",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "1.0.1",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/freemind.svg",
  "images": [
    "/assets/software/freemind.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 100,
  "ratingValue": "3.7",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "irfanview",
  "slug": "irfanview",
  "title": "IrfanView",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/IrfanView",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "4.76",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/irfanview.svg",
  "images": [
    "/assets/software/irfanview.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 527,
  "ratingValue": "3.5",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "lame",
  "slug": "lame",
  "title": "LAME",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/LAME",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "3.100",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/lame.svg",
  "images": [
    "/assets/software/lame.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 528,
  "ratingValue": "4.5",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "lazarus-4-8-fpc3-2-2",
  "slug": "lazarus-4-8-fpc3-2-2",
  "title": "Lazarus 4.8 FPC3.2.2",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/Lazarus",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "1.0",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/lazarus-4-8-fpc3-2-2.svg",
  "images": [
    "/assets/software/lazarus-4-8-fpc3-2-2.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 435,
  "ratingValue": "3.6",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "java-se-runtime-environment-jre",
  "slug": "java-se-runtime-environment-jre",
  "title": "Java SE Runtime Environment (JRE)",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/JavaSERE",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "8u503",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/java-se-runtime-environment-jre.svg",
  "images": [
    "/assets/software/java-se-runtime-environment-jre.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 256,
  "ratingValue": "3.9",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "keepass",
  "slug": "keepass",
  "title": "KeePass",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/KeePass",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "2.61.1",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/keepass.svg",
  "images": [
    "/assets/software/keepass.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 484,
  "ratingValue": "3.9",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "java-se-development-kit-jdk",
  "slug": "java-se-development-kit-jdk",
  "title": "Java SE Development Kit (JDK)",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/JavaSEDK",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "27",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/java-se-development-kit-jdk.svg",
  "images": [
    "/assets/software/java-se-development-kit-jdk.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 155,
  "ratingValue": "4.7",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "kaspersky-virus-removal-tool",
  "slug": "kaspersky-virus-removal-tool",
  "title": "Kaspersky Virus Removal Tool",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/KVRemovalTool",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "15.0.19.0",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/kaspersky-virus-removal-tool.svg",
  "images": [
    "/assets/software/kaspersky-virus-removal-tool.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 295,
  "ratingValue": "4.7",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "innosetup",
  "slug": "innosetup",
  "title": "InnoSetup",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/InnoSetup",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "6.7.3",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/innosetup.svg",
  "images": [
    "/assets/software/innosetup.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 65,
  "ratingValue": "4.1",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "kdwin",
  "slug": "kdwin",
  "title": "KDWin",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/KDWin",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "2014",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/kdwin.svg",
  "images": [
    "/assets/software/kdwin.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 97,
  "ratingValue": "4.1",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "maxima",
  "slug": "maxima",
  "title": "Maxima",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/Maxima",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "5.50.0",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/maxima.svg",
  "images": [
    "/assets/software/maxima.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 476,
  "ratingValue": "3.6",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "mediainfo",
  "slug": "mediainfo",
  "title": "MediaInfo",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/MediaInfo",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "26.05",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/mediainfo.svg",
  "images": [
    "/assets/software/mediainfo.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 538,
  "ratingValue": "5.0",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "media-player-classic-home-cinema",
  "slug": "media-player-classic-home-cinema",
  "title": "Media Player Classic Home Cinema",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/MediaPlayerClassicHC",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "1.7.13",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/media-player-classic-home-cinema.svg",
  "images": [
    "/assets/software/media-player-classic-home-cinema.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 445,
  "ratingValue": "4.8",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "mozilla-thunderbird",
  "slug": "mozilla-thunderbird",
  "title": "Mozilla Thunderbird",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/MozillaThunderbird",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "153.3.1esr",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/mozilla-thunderbird.svg",
  "images": [
    "/assets/software/mozilla-thunderbird.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 213,
  "ratingValue": "4.1",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "mitec-hexeditor",
  "slug": "mitec-hexeditor",
  "title": "MiTeC HexEditor",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/MiTeCHexEditor",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "7.1.0",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/mitec-hexeditor.svg",
  "images": [
    "/assets/software/mitec-hexeditor.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 195,
  "ratingValue": "4.6",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "ms-net-framework-x32-x64",
  "slug": "ms-net-framework-x32-x64",
  "title": "MS .NET Framework (x32/x64)",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/MSNETFramework",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "1.0",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/ms-net-framework-x32-x64.svg",
  "images": [
    "/assets/software/ms-net-framework-x32-x64.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 95,
  "ratingValue": "4.4",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "ms-internet-explorer",
  "slug": "ms-internet-explorer",
  "title": "MS Internet Explorer",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/MSIE9",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "9.0",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/ms-internet-explorer.svg",
  "images": [
    "/assets/software/ms-internet-explorer.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 210,
  "ratingValue": "4.8",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "midnight-commander",
  "slug": "midnight-commander",
  "title": "Midnight Commander",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/MidnightCommander",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "4.8.33.234",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/midnight-commander.svg",
  "images": [
    "/assets/software/midnight-commander.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 359,
  "ratingValue": "3.6",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "ms-directx-9-0c-4-9-0-904-june-2010",
  "slug": "ms-directx-9-0c-4-9-0-904-june-2010",
  "title": "MS DirectX 9.0c 4.9.0.904 (June 2010)",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/MSDirectX",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "1.0",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/ms-directx-9-0c-4-9-0-904-june-2010.svg",
  "images": [
    "/assets/software/ms-directx-9-0c-4-9-0-904-june-2010.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 502,
  "ratingValue": "4.5",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "ms-excel-viewer",
  "slug": "ms-excel-viewer",
  "title": "MS Excel Viewer",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/MSExcelViewer",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "2003",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/ms-excel-viewer.svg",
  "images": [
    "/assets/software/ms-excel-viewer.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 518,
  "ratingValue": "3.7",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "mp3tag",
  "slug": "mp3tag",
  "title": "Mp3tag",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/Mp3tag",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "3.36.1",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/mp3tag.svg",
  "images": [
    "/assets/software/mp3tag.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրեր�� և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գ...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրեր�� և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գ...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրեր�� և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գ...",
  "reviewCount": 364,
  "ratingValue": "4.3",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "ms-word-viewer",
  "slug": "ms-word-viewer",
  "title": "MS Word Viewer",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/MSWordViewer",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "2003",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/ms-word-viewer.svg",
  "images": [
    "/assets/software/ms-word-viewer.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կ��ում ցանկացած (այդ թվում նաև անօրինական) գ...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կ��ում ցանկացած (այդ թվում նաև անօրինական) գ...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կ��ում ցանկացած (այդ թվում նաև անօրինական) գ...",
  "reviewCount": 167,
  "ratingValue": "4.7",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "ms-office-armenian-lip",
  "slug": "ms-office-armenian-lip",
  "title": "MS Office Armenian LIP - հայերեն միջերեսի փաթեթներ",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/MSOfficeArmenianLIP",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "1.0",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/ms-office-armenian-lip.svg",
  "images": [
    "/assets/software/ms-office-armenian-lip.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 481,
  "ratingValue": "4.5",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "ms-office-compatibility-pack",
  "slug": "ms-office-compatibility-pack",
  "title": "MS Office Compatibility Pack",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/MSOfficeCompatibilityPack",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "1.0",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/ms-office-compatibility-pack.svg",
  "images": [
    "/assets/software/ms-office-compatibility-pack.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 289,
  "ratingValue": "4.8",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "ms-visio-viewer",
  "slug": "ms-visio-viewer",
  "title": "MS Visio Viewer",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/MSVisioViewer",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "2007",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/ms-visio-viewer.svg",
  "images": [
    "/assets/software/ms-visio-viewer.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 222,
  "ratingValue": "4.6",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "ms-windows-armenian-lip",
  "slug": "ms-windows-armenian-lip",
  "title": "MS Windows Armenian LIP - հայերեն միջերեսի փաթեթներ",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/MSWindowsArmenianLIP",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "1.0",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/ms-windows-armenian-lip.svg",
  "images": [
    "/assets/software/ms-windows-armenian-lip.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 375,
  "ratingValue": "4.8",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "ms-powerpoint-viewer",
  "slug": "ms-powerpoint-viewer",
  "title": "MS PowerPoint Viewer",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/MSPowerPointViewer",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "2007",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/ms-powerpoint-viewer.svg",
  "images": [
    "/assets/software/ms-powerpoint-viewer.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպութ��ունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գ...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպութ��ունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գ...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպութ��ունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գ...",
  "reviewCount": 333,
  "ratingValue": "4.6",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "mysql",
  "slug": "mysql",
  "title": "MySQL",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/MySQL",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "26.7.0",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/mysql.svg",
  "images": [
    "/assets/software/mysql.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 304,
  "ratingValue": "4.5",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "ms-silverlight",
  "slug": "ms-silverlight",
  "title": "MS Silverlight",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/MSSilverlight",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "5.1.50918.0",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/ms-silverlight.svg",
  "images": [
    "/assets/software/ms-silverlight.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 321,
  "ratingValue": "3.8",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "ms-malicious-software-removal-tool",
  "slug": "ms-malicious-software-removal-tool",
  "title": "MS Malicious Software Removal Tool",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/MSMaliciousSoftwareRemovalTool",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "5.145",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/ms-malicious-software-removal-tool.svg",
  "images": [
    "/assets/software/ms-malicious-software-removal-tool.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 185,
  "ratingValue": "4.8",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "musescore",
  "slug": "musescore",
  "title": "MuseScore",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/MuseScore",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "4.7.5",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/musescore.svg",
  "images": [
    "/assets/software/musescore.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (��եղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գ...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (��եղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գ...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (��եղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գ...",
  "reviewCount": 72,
  "ratingValue": "4.1",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "pixie",
  "slug": "pixie",
  "title": "Pixie",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/Pixie",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "4.1",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/pixie.svg",
  "images": [
    "/assets/software/pixie.svg"
  ],
  "downloads": [],
  "description": "Ուշ��դրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գ...",
  "descriptionHy": "Ուշ��դրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գ...",
  "descriptionRu": "Ուշ��դրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գ...",
  "reviewCount": 211,
  "ratingValue": "4.6",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "norton-commander",
  "slug": "norton-commander",
  "title": "Norton Commander",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/NC",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "5.0",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/norton-commander.svg",
  "images": [
    "/assets/software/norton-commander.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 427,
  "ratingValue": "3.7",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "pidgin",
  "slug": "pidgin",
  "title": "Pidgin",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/Pidgin",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "2.14.14",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/pidgin.svg",
  "images": [
    "/assets/software/pidgin.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 169,
  "ratingValue": "3.5",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "nullsoft-install-system-nsis",
  "slug": "nullsoft-install-system-nsis",
  "title": "Nullsoft Install System (NSIS)",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/NSIS",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "3.12",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/nullsoft-install-system-nsis.svg",
  "images": [
    "/assets/software/nullsoft-install-system-nsis.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 491,
  "ratingValue": "4.5",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "pelles-c",
  "slug": "pelles-c",
  "title": "Pelles C",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/PellesC",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "9.00",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/pelles-c.svg",
  "images": [
    "/assets/software/pelles-c.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 456,
  "ratingValue": "5.0",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "php-8-5-10-non-thread-safe-vs17",
  "slug": "php-8-5-10-non-thread-safe-vs17",
  "title": "php 8.5.10 Non Thread Safe VS17",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/php",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "1.0",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/php-8-5-10-non-thread-safe-vs17.svg",
  "images": [
    "/assets/software/php-8-5-10-non-thread-safe-vs17.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 397,
  "ratingValue": "4.4",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "process-explorer",
  "slug": "process-explorer",
  "title": "Process Explorer",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/ProcessExplorer",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "17.14",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/process-explorer.svg",
  "images": [
    "/assets/software/process-explorer.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 69,
  "ratingValue": "4.9",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "notepad2",
  "slug": "notepad2",
  "title": "Notepad2",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/Notepad2",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "4.2.25",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/notepad2.svg",
  "images": [
    "/assets/software/notepad2.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվ��ւթյուն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գ...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվ��ւթյուն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գ...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվ��ւթյուն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գ...",
  "reviewCount": 284,
  "ratingValue": "5.0",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "pnotes",
  "slug": "pnotes",
  "title": "PNotes",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/PNotes",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "9.3.0",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/pnotes.svg",
  "images": [
    "/assets/software/pnotes.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 495,
  "ratingValue": "4.0",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "paint-net",
  "slug": "paint-net",
  "title": "Paint.NET",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/PaintNET",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "5.1.12",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/paint-net.svg",
  "images": [
    "/assets/software/paint-net.svg"
  ],
  "downloads": [],
  "description": "Ուշա��րություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գ...",
  "descriptionHy": "Ուշա��րություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գ...",
  "descriptionRu": "Ուշա��րություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գ...",
  "reviewCount": 152,
  "ratingValue": "4.1",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "psi",
  "slug": "psi",
  "title": "PSI",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/PSI",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "1.5.2142.0",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/psi.svg",
  "images": [
    "/assets/software/psi.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 164,
  "ratingValue": "3.6",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "process-monitor",
  "slug": "process-monitor",
  "title": "Process Monitor",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/ProcessMonitor",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "4.11",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/process-monitor.svg",
  "images": [
    "/assets/software/process-monitor.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 316,
  "ratingValue": "4.3",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "regetdeluxe-personal",
  "slug": "regetdeluxe-personal",
  "title": "ReGetDeluxe Personal",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/ReGetDeluxePersonal",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "5.2.0.330",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/regetdeluxe-personal.svg",
  "images": [
    "/assets/software/regetdeluxe-personal.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 98,
  "ratingValue": "4.8",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "qbasic",
  "slug": "qbasic",
  "title": "QBasic",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/QBasic",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "1.1",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/qbasic.svg",
  "images": [
    "/assets/software/qbasic.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 231,
  "ratingValue": "4.3",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "scilab",
  "slug": "scilab",
  "title": "SciLab",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/Scilab",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "2026.1.0",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/scilab.svg",
  "images": [
    "/assets/software/scilab.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 470,
  "ratingValue": "3.6",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "speedcrunch",
  "slug": "speedcrunch",
  "title": "SpeedCrunch",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/SpeedCrunch",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "0.10.1",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/speedcrunch.svg",
  "images": [
    "/assets/software/speedcrunch.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 129,
  "ratingValue": "3.7",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "showdesktopclassic",
  "slug": "showdesktopclassic",
  "title": "ShowDesktopClassic",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/ShowDesktopClassic",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "1.1",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/showdesktopclassic.svg",
  "images": [
    "/assets/software/showdesktopclassic.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակ��յող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գ...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակ��յող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գ...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակ��յող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գ...",
  "reviewCount": 273,
  "ratingValue": "3.6",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "softperfect-network-scanner",
  "slug": "softperfect-network-scanner",
  "title": "SoftPerfect Network Scanner",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/SPNetworkScanner",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "6.2.1",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/softperfect-network-scanner.svg",
  "images": [
    "/assets/software/softperfect-network-scanner.svg"
  ],
  "downloads": [],
  "description": "Ուշադրությու��: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գ...",
  "descriptionHy": "Ուշադրությու��: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գ...",
  "descriptionRu": "Ուշադրությու��: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գ...",
  "reviewCount": 367,
  "ratingValue": "4.3",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "russian-phonetic-keyboard-layout",
  "slug": "russian-phonetic-keyboard-layout",
  "title": "Russian Phonetic Keyboard Layout",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/RussianPhoneticKeyboardLayout",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "1.0",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/russian-phonetic-keyboard-layout.svg",
  "images": [
    "/assets/software/russian-phonetic-keyboard-layout.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 107,
  "ratingValue": "5.0",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "stellarium",
  "slug": "stellarium",
  "title": "Stellarium",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/Stellarium",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "26.2",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/stellarium.svg",
  "images": [
    "/assets/software/stellarium.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 63,
  "ratingValue": "4.0",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "sylpheed",
  "slug": "sylpheed",
  "title": "Sylpheed",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/Sylpheed",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "3.7",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/sylpheed.svg",
  "images": [
    "/assets/software/sylpheed.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 445,
  "ratingValue": "4.0",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "tcpview",
  "slug": "tcpview",
  "title": "TCPView",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/TCPView",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "4.19",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/tcpview.svg",
  "images": [
    "/assets/software/tcpview.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 378,
  "ratingValue": "4.6",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "sumatrapdf",
  "slug": "sumatrapdf",
  "title": "SumatraPDF",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/SumatraPDF",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "3.6.1",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/sumatrapdf.svg",
  "images": [
    "/assets/software/sumatrapdf.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 449,
  "ratingValue": "4.9",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "tightvnc",
  "slug": "tightvnc",
  "title": "TightVNC",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/TightVNC",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "2.8.88",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/tightvnc.svg",
  "images": [
    "/assets/software/tightvnc.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 350,
  "ratingValue": "3.7",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "the-calc",
  "slug": "the-calc",
  "title": "The Calc",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/TheCalc",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "3.02",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/the-calc.svg",
  "images": [
    "/assets/software/the-calc.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառու��ներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գ...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառու��ներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գ...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառու��ներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գ...",
  "reviewCount": 115,
  "ratingValue": "4.5",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "turbo-pascal",
  "slug": "turbo-pascal",
  "title": "Turbo Pascal",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/TurboPascal",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "7.0",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/turbo-pascal.svg",
  "images": [
    "/assets/software/turbo-pascal.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 217,
  "ratingValue": "4.7",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "treesize-free",
  "slug": "treesize-free",
  "title": "TreeSize Free",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/TreeSizeFree",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "4.81",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/treesize-free.svg",
  "images": [
    "/assets/software/treesize-free.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 196,
  "ratingValue": "4.3",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "turbobasic",
  "slug": "turbobasic",
  "title": "TurboBasic",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/TurboBasic",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "1.0",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/turbobasic.svg",
  "images": [
    "/assets/software/turbobasic.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 488,
  "ratingValue": "4.0",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "veracrypt",
  "slug": "veracrypt",
  "title": "VeraCrypt",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/VeraCrypt",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "1.26.29",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/veracrypt.svg",
  "images": [
    "/assets/software/veracrypt.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 362,
  "ratingValue": "4.6",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "truecrypt",
  "slug": "truecrypt",
  "title": "TrueCrypt",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/TrueCrypt",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "7.1a",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/truecrypt.svg",
  "images": [
    "/assets/software/truecrypt.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 53,
  "ratingValue": "4.2",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "wireshark",
  "slug": "wireshark",
  "title": "WireShark",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/WireShark",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "4.6.8",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/wireshark.svg",
  "images": [
    "/assets/software/wireshark.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պ��տասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գ...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պ��տասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գ...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պ��տասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գ...",
  "reviewCount": 116,
  "ratingValue": "3.9",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "volkov-commander",
  "slug": "volkov-commander",
  "title": "Volkov Commander",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/VC",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "4.99.08",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/volkov-commander.svg",
  "images": [
    "/assets/software/volkov-commander.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 473,
  "ratingValue": "4.1",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "wampserver",
  "slug": "wampserver",
  "title": "WampServer",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/WampServer",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "3.3.7",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/wampserver.svg",
  "images": [
    "/assets/software/wampserver.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կր��ւմ ցանկացած (այդ թվում նաև անօրինական) գ...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կր��ւմ ցանկացած (այդ թվում նաև անօրինական) գ...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կր��ւմ ցանկացած (այդ թվում նաև անօրինական) գ...",
  "reviewCount": 297,
  "ratingValue": "4.8",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "xvid",
  "slug": "xvid",
  "title": "XviD",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/XviD",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "1.3.7-20191228",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/xvid.svg",
  "images": [
    "/assets/software/xvid.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 112,
  "ratingValue": "4.3",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "winamp",
  "slug": "winamp",
  "title": "Winamp",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/Winamp",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "5.66",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/winamp.svg",
  "images": [
    "/assets/software/winamp.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 105,
  "ratingValue": "4.3",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "winkeys32",
  "slug": "winkeys32",
  "title": "WinKeys32",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/WinKeys32",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "2.0",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/winkeys32.svg",
  "images": [
    "/assets/software/winkeys32.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 82,
  "ratingValue": "4.3",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "xnview",
  "slug": "xnview",
  "title": "XnView",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/XnView",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "2.52.5",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/xnview.svg",
  "images": [
    "/assets/software/xnview.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գո...",
  "reviewCount": 386,
  "ratingValue": "3.9",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "xampp",
  "slug": "xampp",
  "title": "XAMPP",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/XAMPP",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "8.2.12",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/xampp.svg",
  "images": [
    "/assets/software/xampp.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բ��լոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գ...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բ��լոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գ...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բ��լոր նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գ...",
  "reviewCount": 238,
  "ratingValue": "3.9",
  "published": "2026-09-01T00:00:00Z"
},
{
  "id": "font",
  "slug": "font",
  "title": "Հայերեն և ռուսերեն տառատեսակներ (font)",
  "developer": "Unknown Vendor",
  "officialSite": "https://www.network.am/More/ArmRusFontsLight",
  "primaryCategory": "utilities",
  "categories": [
    "utilities",
    "system"
  ],
  "version": "1.0",
  "license": "Freeware",
  "os": "Windows",
  "osList": [
    "windows"
  ],
  "thumbnail": "/assets/software/font.svg",
  "images": [
    "/assets/software/font.svg"
  ],
  "downloads": [],
  "description": "Ուշադրություն: Կայքում տեղադրված բոլո�� նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գ...",
  "descriptionHy": "Ուշադրություն: Կայքում տեղադրված բոլո�� նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գ...",
  "descriptionRu": "Ուշադրություն: Կայքում տեղադրված բոլո�� նյութերը (տեղեկատվությունը, հղումները, նկարները, ֆայլերը, ծրագրերը և այլն) ներկայացված են բացառապես ճանաչողական նկատառումներով: Կայքի հեղինակը, ինչպես նաև կայքը տեղակայող կազմակերպությունը որևէ պատասխանատվություն չեն կրում ցանկացած (այդ թվում նաև անօրինական) գ...",
  "reviewCount": 235,
  "ratingValue": "4.8",
  "published": "2026-09-01T00:00:00Z"
}
];
