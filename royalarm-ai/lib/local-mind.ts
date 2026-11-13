import "server-only";
import type { ContextMessage } from "./limits";
import type { ModelSummary, ThinkingProfileId } from "./catalog-types";
import type { TutorContext } from "./learning/schema";
import {
  SIPAN_PROFILE,
  analyzeCctvSizing,
  analyzeIpv4Cidr,
  lookupBilingualTerms,
  searchStoreCatalog,
} from "./sipan-knowledge";

export type LocalReply = {
  reasoning: string;
  content: string;
  domain: string;
};

type Lang = "hy" | "en" | "ru";

type DomainId =
  | "cidr"
  | "vlan"
  | "fortigate"
  | "mikrotik"
  | "server-ad-proxmox"
  | "cctv"
  | "delphi-dev"
  | "software-store"
  | "translation"
  | "english-practice"
  | "sipan-profile"
  | "simplify"
  | "general";

function detectLanguage(text: string): Lang {
  const lower = text.toLowerCase();
  if (/in english|english only|անգլերեն գրիր/.test(lower) && !/թարգման.*հայերեն/.test(lower)) return "en";
  if (/հայերեն գրիր|in armenian|по-армянски/.test(lower)) return "hy";
  if (/[\u0530-\u058F]/.test(text)) return "hy";
  if (/[\u0400-\u04FF]/.test(text)) return "ru";
  return "en";
}

function classifyDomain(
  prompt: string,
  contextText: string,
  tutor: TutorContext,
  templateId?: string
): DomainId {
  const q = prompt.toLowerCase();
  const combined = `${prompt}\n${contextText}`.toLowerCase();

  if (/ավելի պարզ|հակիրճ|բացատրիր պարզ|simpler|summarize/.test(q)) return "simplify";
  if (tutor.mode === "translation" || templateId === "translation" || /թարգման|translate|перевед/.test(q)) {
    return "translation";
  }
  if (tutor.mode === "practice" || templateId === "daily-english" || templateId === "travel" || templateId === "work-it-english" || templateId === "voice-practice") {
    return "english-practice";
  }

  if (/\b\d{1,3}(?:\.\d{1,3}){3}(?:\/\d{1,2})?\b/.test(prompt) || /subnet|cidr|vlsm|ենթացանց|маска/.test(q)) {
    return "cidr";
  }
  if (/cctv|hikvision|dahua|nvr|camera|poe|խցիկ|տեսախցիկ|камер/.test(q)) {
    return "cctv";
  }
  if (/fortigate|fortios|fortinet|ngfw|ipsec|ssl.?vpn|nat\b|vip\b|sniffer|firewall|ֆայրվոլ/.test(q)) {
    return "fortigate";
  }
  if (/mikrotik|routeros|winbox|cap.?sman|wireguard|failover|dual.?wan/.test(q)) {
    return "mikrotik";
  }
  if (/vlan|aruba|unifi|grandstream|switch|trunk|սվիչ|ցանցային ճարտարապետ/.test(q) || templateId === "network-architecture") {
    return "vlan";
  }
  if (/proxmox|truenas|zfs|active directory|windows server|\bad\b|gpo|nextcloud|backup|pbs|սերվեր|պահուստ|վիրտուալ/.test(q) || templateId === "server-infrastructure") {
    return "server-ad-proxmox";
  }
  if (/delphi|object pascal|firedac|vcl|fmx|access violation|next\.js|typescript|powershell|bash|կոդ|ծրագրավոր|script|սկրիպտ/.test(q) || templateId === "programming-delphi") {
    return "delphi-dev";
  }
  if (/store|shop\.royalarm|ծրագիր|ծրագրեր|download|ներբեռն|բրաուզեր|antivirus|ventoy|wireshark|mobaxterm|chrome|utility|app\b|software/.test(q) || templateId === "software-advisor") {
    return "software-store";
  }
  if (/սիփան|sipan|royalarm|cv\b|պորտֆոլիո|portfolio|mota-engil|smarttech|moselle|քո մասին|who are you|ով ես/.test(q)) {
    return "sipan-profile";
  }

  // Inherit domain for short follow-ups ("CLI տուր", "հաջորդ քայլը", "check logs")
  if (prompt.trim().length < 80 && contextText) {
    if (/fortigate|firewall|vpn/.test(combined)) return "fortigate";
    if (/mikrotik|routeros/.test(combined)) return "mikrotik";
    if (/proxmox|truenas|active directory/.test(combined)) return "server-ad-proxmox";
    if (/vlan|aruba|unifi/.test(combined)) return "vlan";
    if (/delphi|next\.js|typescript/.test(combined)) return "delphi-dev";
  }

  if (templateId === "cybersecurity-audit") return "fortigate";
  return "general";
}

function profileLabelHy(persona: ThinkingProfileId) {
  switch (persona) {
    case "architect":
      return "Սիփան · Ցանցային և Համակարգային Ճարտարապետ";
    case "diagnostic":
      return "NOC Ախտորոշիչ · Root-Cause Վերլուծություն";
    case "developer":
      return "Համակարգային Ծրագրավորող · Delphi / Web";
    case "mentor":
      return "Երկլեզու Տեխնիկական Մենթոր (Հայ ↔ EN)";
  }
}

function buildReasoningTrace({
  lang,
  domain,
  model,
  tutor,
  notes,
}: {
  lang: Lang;
  domain: DomainId;
  model: ModelSummary;
  tutor: TutorContext;
  notes: string[];
}): string {
  const persona = tutor.persona ?? "architect";
  const depth = tutor.depth ?? "deep";
  if (lang === "hy") {
    return [
      `• **Մոդել / Շարժիչ․** ${model.displayName} (\`${model.id}\`)`,
      `• **Մտածողության պրոֆիլ․** ${profileLabelHy(persona)} · Խորություն՝ \`${depth === "deep" ? "Խորը վերլուծություն" : "Արագ"}\``,
      `• **Հայտնաբերված տիրույթ․** \`${domain}\``,
      ...notes.map((n) => `• ${n}`),
    ].join("\n");
  }
  return [
    `• **Engine:** ${model.displayName} (\`${model.id}\`)`,
    `• **Profile:** \`${persona}\` · Depth: \`${depth}\``,
    `• **Detected Domain:** \`${domain}\``,
    ...notes.map((n) => `• ${n}`),
  ].join("\n");
}

function buildRouterOsCidrSnippet(
  summary: NonNullable<ReturnType<typeof analyzeIpv4Cidr>>["summary"],
  splits: NonNullable<ReturnType<typeof analyzeIpv4Cidr>>["splits"],
  lang: Lang
): string {
  const safeHint =
    lang === "hy"
      ? "# MikroTik RouterOS (միացրու Safe Mode [Ctrl+X] մինչ փոփոխելը)"
      : "# MikroTik RouterOS (enable Safe Mode [Ctrl+X] before applying)";

  if (splits?.length) {
    const vlanCmds = splits
      .map((s) => {
        const vid = s.index * 10;
        const prefix = s.cidr.split("/")[1];
        return `/interface vlan add name=vlan${vid} vlan-id=${vid} interface=bridge-lan
/ip address add address=${s.gateway}/${prefix} interface=vlan${vid} comment="VLAN ${vid}"`;
      })
      .join("\n");
    return `${safeHint}
${vlanCmds}`;
  }

  return `${safeHint}
/ip address add address=${summary.gatewaySuggestion}/${summary.prefix} interface=bridge-lan comment="RoyalArm Gateway"
/ip pool add name=pool-lan ranges=${summary.dhcpStart}-${summary.dhcpEnd}
/ip dhcp-server network add address=${summary.network}/${summary.prefix} gateway=${summary.gatewaySuggestion} dns-server=${summary.gatewaySuggestion},1.1.1.1`;
}

function respondCidr(prompt: string, lang: Lang, deep: boolean) {
  const calc = analyzeIpv4Cidr(prompt);
  if (!calc) return null;
  const { summary, splits } = calc;

  if (lang === "hy") {
    let body = `### IPv4 / CIDR Ճշգրիտ Հաշվարկ՝ \`${summary.input}\`

| Պարամետր | Արժեք |
| :--- | :--- |
| **Network ID** | \`${summary.network}/${summary.prefix}\` |
| **Subnet Mask / Wildcard** | \`${summary.mask}\` / \`${summary.wildcard}\` |
| **Gateway (առաջարկվող)** | \`${summary.gatewaySuggestion}\` |
| **Օգտագործելի տիրույթ** | \`${summary.firstHost}\` – \`${summary.lastHost}\` |
| **Broadcast** | \`${summary.broadcast}\` |
| **Հասանելի հոսթեր** | **${summary.usableHosts}** (${summary.totalAddresses} ընդամենը) · \`${summary.scope}\` |
| **Առաջարկվող DHCP Pool** | \`${summary.dhcpStart}\` – \`${summary.dhcpEnd}\` |`;

    if (splits?.length) {
      body += `\n\n### Ենթացանցերի Բաժանում (${splits.length} VLAN / Subnet)\n\n| # | Subnet CIDR | Gateway | Օգտագործելի IP տիրույթ | Հոսթեր |\n| :--- | :--- | :--- | :--- | :--- |\n`;
      body += splits
        .map((s) => `| VLAN ${s.index * 10} | \`${s.cidr}\` | \`${s.gateway}\` | \`${s.usableRange}\` | ${s.usableHosts} |`)
        .join("\n");
    }

    if (deep) {
      const ros = buildRouterOsCidrSnippet(summary, splits, lang);
      body += `\n\n### Արագ կոնֆիգուրացիա (MikroTik RouterOS & FortiGate)
\`\`\`routeros
${ros}
\`\`\`

\`\`\`text
# FortiGate CLI (Interface օրինակ)
config system interface
    edit "internal_lan"
        set ip ${summary.gatewaySuggestion} ${summary.mask}
        set allowaccess ping https ssh
    next
end
\`\`\`
- **Ստուգում․** \`/ip address print\`, \`/ip dhcp-server lease print\` (MikroTik) կամ \`get system interface\` (FortiGate)։`;
    }

    return {
      notes: [
        `Հաշվարկվեց IPv4 ցանց \`${summary.network}/${summary.prefix}\` (${summary.usableHosts} հոսթ)${splits ? ` և բաժանվեց ${splits.length} ենթացանցի` : ""}`,
        "Պատրաստվեցին MikroTik & FortiGate ստուգված կաղապարները՝ Safe Mode զգուշացմամբ",
      ],
      content: body,
    };
  }

  let body = `### Exact IPv4 / CIDR Analysis for \`${summary.input}\`

| Field | Value |
| :--- | :--- |
| **Network ID** | \`${summary.network}/${summary.prefix}\` |
| **Subnet Mask / Wildcard** | \`${summary.mask}\` / \`${summary.wildcard}\` |
| **Suggested Gateway** | \`${summary.gatewaySuggestion}\` |
| **Usable Host Range** | \`${summary.firstHost}\` – \`${summary.lastHost}\` |
| **Broadcast** | \`${summary.broadcast}\` |
| **Usable Hosts** | **${summary.usableHosts}** (${summary.totalAddresses} total) · \`${summary.scope}\` |
| **Recommended DHCP Pool** | \`${summary.dhcpStart}\` – \`${summary.dhcpEnd}\` |`;

  if (splits?.length) {
    body += `\n\n### VLAN / Subnet Allocation (${splits.length} segments)\n\n| Segment | CIDR | Gateway | Host Range | Hosts |\n| :--- | :--- | :--- | :--- | :--- |\n`;
    body += splits
      .map((s) => `| VLAN ${s.index * 10} | \`${s.cidr}\` | \`${s.gateway}\` | \`${s.usableRange}\` | ${s.usableHosts} |`)
      .join("\n");
  }

  if (deep) {
    body += `\n\n### Ready RouterOS Starter\n\`\`\`routeros\n${buildRouterOsCidrSnippet(summary, splits, lang)}\n\`\`\``;
  }

  return {
    notes: [`Computed binary mask & host bounds for ${summary.network}/${summary.prefix}`],
    content: body,
  };
}

function respondFortiGate(prompt: string, lang: Lang, deep: boolean) {
  const isVpn = /vpn|ipsec|ssl/i.test(prompt);
  const isNat = /nat|vip|port forward|forwarding/i.test(prompt);

  if (lang === "hy") {
    const focus = isVpn
      ? "IPSec / SSL-VPN թունելների և IKE բանակցության ախտորոշում"
      : isNat
      ? "NAT / Virtual IP (VIP) ու պորտերի ուղղորդման ստուգում"
      : "FortiGate 7.6 NGFW քաղաքականությունների, կապուղիների և լոգերի ախտորոշում";

    const content = `### FortiGate NGFW — ${focus}

1. **Պահուստավորում փոփոխությունից առաջ (պարտադիր)**
   \`\`\`text
   execute backup config flash pre-change-bak
   \`\`\`
2. **Տրաֆիկի հոսքի իրական ախտորոշում (Flow Trace + Sniffer)**
   \`\`\`text
   diagnose sniffer packet any "host <TARGET_IP> and port <PORT>" 4 0 l
   diagnose debug reset
   diagnose debug flow filter addr <TARGET_IP>
   diagnose debug flow show function-name enable
   diagnose debug flow trace start 20
   diagnose debug enable
   \`\`\`
   *(Ստուգումից հետո անջատիր՝ \`diagnose debug disable\`)*
${
  isVpn
    ? `3. **VPN Phase 1 / Phase 2 ստուգում**
   \`\`\`text
   get vpn ipsec tunnel summary
   diagnose vpn ike gateway list
   diagnose vpn tunnel list
   \`\`\`
   - Համոզվիր, որ Phase 2 selectors-ը (Local/Remote subnet), DH group-ը, Pre-Shared Key-ը և NAT-T-ն համընկնում են երկու կողմում, ու կա համապատասխան Firewall Policy (երկու ուղղությամբ)։`
    : isNat
    ? `3. **VIP և Central/Policy NAT ստուգում**
   - Համոզվիր, որ \`Virtual IP (VIP)\` օբյեկտի External Interface-ը կոնկրետ WAN-ն է կամ \`any\`, իսկ Firewall Policy-ում \`Destination\`-ը ընտրված է հենց այդ VIP օբյեկտը (ոչ թե ներքին IP-ն)։
   - Պահիր \`NAT\`-ը **disabled** ներքին սերվեր գնացող VIP քաղաքականությունում, եթե սերվերին պետք է տեսնել կլիենտի իրական IP-ն։`
    : `3. **Policy & SD-WAN / Dual WAN ստուգում**
   \`\`\`text
   get router info routing-table all
   diagnose sys sdwan health-check
   get system performance status
   \`\`\`
   - Ստուգիր Policy ID-ների հերթականությունը (ավելի նեղ Deny/VIP կանոնները՝ վերևում) և \`Log Allowed Traffic\` միացված լինելը ախտորոշման ընթացքում։`
}${
      deep
        ? `\n\n4. **Երկարաժամկետ Անվտանգություն (Fortinet NSE Best Practice)**
   - Մի թող Admin HTTPS/SSH հասանելիությունը բաց WAN ինտերֆեյսի վրա առանց \`Trusted Hosts\`-ի կամ Management VPN-ի։
   - Ստեղծիր առանձին գոտիներ/VLAN-ներ՝ Management, Corp AD, VoIP և CCTV սարքերի միջև։`
        : ""
    }`;

    return {
      notes: [focus, "Ներառված են FortiOS 7.6 CLI flow trace, routing և անվտանգային քայլեր"],
      content,
    };
  }

  return {
    notes: ["FortiGate NGFW diagnostic trace & verification commands prepared"],
    content: `### FortiGate NGFW Diagnostics & Verification

1. **Snapshot config first:** \`execute backup config flash pre-change\`
2. **Verify packet flow & policy match:**
   \`\`\`text
   diagnose debug reset
   diagnose debug flow filter addr <TARGET_IP>
   diagnose debug flow show function-name enable
   diagnose debug flow trace start 20
   diagnose debug enable
   \`\`\`
3. **Check routing & interface counters:**
   \`\`\`text
   get router info routing-table all
   diagnose sys sdwan health-check
   \`\`\`
4. Disable debug after capture: \`diagnose debug disable\`.`,
  };
}

function respondMikrotik(prompt: string, lang: Lang) {
  const isFailover = /failover|dual|isp|2 wan|wan/i.test(prompt);
  if (lang === "hy") {
    return {
      notes: ["MikroTik RouterOS v7 կոնֆիգուրացիա և Safe Mode պաշտպանություն"],
      content: `### MikroTik RouterOS — Ինժեներական Կարգավորում և Ստուգում

> **Կարևոր.** Միացրու **Safe Mode** (\`Ctrl+X\` Winbox/Terminal-ում), որպեսզի կապի կորստի դեպքում սխալ կանոնը ավտոմատ հետ գլորվի։

${
  isFailover
    ? `**Dual-WAN Failover (RouterOS v7 check-gateway)**
\`\`\`routeros
/ip route
add dst-address=0.0.0.0/0 gateway=1.1.1.1 scope=10 target-scope=12 check-gateway=ping distance=1 comment="ISP1-Primary"
add dst-address=1.1.1.1/32 gateway=<ISP1_GW> scope=10 target-scope=11
add dst-address=0.0.0.0/0 gateway=8.8.8.8 scope=10 target-scope=12 check-gateway=ping distance=2 comment="ISP2-Backup"
add dst-address=8.8.8.8/32 gateway=<ISP2_GW> scope=10 target-scope=11
\`\`\`
`
    : `**Անվտանգ Firewall + Diagnostics հիմնական ստուգում**
\`\`\`routeros
/tool ping address=1.1.1.1 count=5
/tool torch interface=ether1 port=any
/ip firewall filter print stats where !disabled
/export terse file=backup-before-edit
\`\`\`
`
}- Եթե օգտագործում ես **FastTrack** և միաժամանակ **IPSec / Simple Queues**, բացառիր IPSec/Queue տրաֆիկը FastTrack կանոնից (\`ipsec-policy=out,none\`), հակառակ դեպքում թունելի արագությունը կընկնի կամ queue-ն չի աշխատի։`,
    };
  }
  return {
    notes: ["RouterOS v7 diagnostics & failover pattern"],
    content: `### MikroTik RouterOS Operations Checklist
- Enable **Safe Mode (\`Ctrl+X\`)** before touching bridge VLANs or firewall input/forward chains.
- Export clean state first: \`/export terse file=pre-edit-backup\`.
- Live telemetry checks: \`/tool torch\`, \`/ip route print\`, \`/interface bridge vlan print\`.`,
  };
}

function respondVlanMatrix(lang: Lang, deep: boolean) {
  if (lang === "hy") {
    return {
      notes: ["Ձեռնարկության VLAN սեգմենտացիա՝ FortiGate + Aruba/UniFi/MikroTik + Grandstream + CCTV"],
      content: `### Կորպորատիվ VLAN Ճարտարապետություն (Սիփանի Ստանդարտ Ստեք)

| VLAN ID | Անվանում | Ենթացանց (/24) | Նշանակություն և Իզոլյացիա |
| :--- | :--- | :--- | :--- |
| **VLAN 10** | \`MGMT\` | \`10.10.10.0/24\` | Aruba/UniFi սվիչներ, FortiGate/MikroTik, iDRAC/Proxmox Web UI *(մուտք միայն Admin VPN/Jump host-ից)* |
| **VLAN 20** | \`CORP_AD\` | \`10.10.20.0/24\` | Աշխատակայաններ, Active Directory DNS/DC, Ընդհանուր ֆայլեր |
| **VLAN 30** | \`VOIP\` | \`10.10.30.0/24\` | Grandstream IP հեռախոսներ և PBX *(QoS / DSCP EF առաջնահերթություն)* |
| **VLAN 40** | \`CCTV_SEC\` | \`10.10.40.0/24\` | Hikvision / Dahua IP տեսախցիկներ և NVR *(արգելված է մուտքը դեպի AD և Ինտերնետ)* |
| **VLAN 50** | \`GUEST_WIFI\` | \`10.10.50.0/24\` | Հյուրերի Wi-Fi *(Client Isolation + միայն WAN ելք)* |
| **VLAN 99** | \`BLACKHOLE\` | — | Չօգտագործվող սվիչ պորտերի մեկուսացում |

${
  deep
    ? `**Սվիչ և Firewall ոսկե կանոններ.**
1. Սվիչի Uplink պորտերը FortiGate-ի և Proxmox-ի հետ միացրու որպես **Trunk** (tagged բոլոր աշխատանքային VLAN-ները)։
2. Արգելիր **VLAN 40 (CCTV)**-ից ցանկացած մուտք դեպի **VLAN 20 (AD)** և **VLAN 10 (MGMT)** — միայն NVR կամ Admin Jump host IP-ին բացիր RTSP/HTTP(S) պորտը։
3. Սվիչներում միացրու **DHCP Snooping** և **BPDU Guard** Access պորտերի վրա։`
    : ""
}`,
    };
  }
  return {
    notes: ["Zero-trust VLAN segmentation matrix across Mgmt, Corp AD, VoIP, CCTV, Guest"],
    content: `### Enterprise VLAN Matrix
- **VLAN 10 (MGMT):** Network gear & hypervisors (Admin-only ACL)
- **VLAN 20 (CORP_AD):** Workstations & Domain Controllers
- **VLAN 30 (VOIP):** Grandstream telephony with QoS priority
- **VLAN 40 (CCTV):** Hikvision/Dahua NVR & cameras isolated from Corp/WAN
- **VLAN 50 (GUEST):** Isolated Wi-Fi with Internet-only egress`,
  };
}

function respondCctv(prompt: string, lang: Lang) {
  const stats = analyzeCctvSizing(prompt);
  if (lang === "hy") {
    return {
      notes: [`Հաշվարկվեց ${stats.cameras} տեսախցիկ (${stats.mp}MP) · ${stats.days} օր արխիվի համար`],
      content: `### Տեսահսկման (Hikvision / Dahua) PoE և Արխիվի Հաշվարկ

| Պարամետր | Հաշվարկված արժեք |
| :--- | :--- |
| **Տեսախցիկներ և Թույլատրություն** | **${stats.cameras} հատ** · ${stats.mp} MP (H.265 ստանդարտ) |
| **Հոսք (Bitrate)** | ~\`${stats.bitratePerCamMbps} Mbps\`/խցիկ · Ընդհանուր՝ **\`${stats.totalMbps} Mbps\`** |
| **Սկավառակի ծավալ (${stats.days} օր)** | Մաքուր՝ \`${stats.storageTbExact} TB\` · **Առաջարկվող՝ \`${stats.recommendedTb} TB\`** (+15% պահուստ) |
| **PoE Հզորության Բյուջե** | Միջին՝ ~\`${stats.poeTypicalWatts} W\` · Առավելագույն IR/Peak (802.3af)՝ **\`${stats.poeMaxBudgetWatts} W\`** |

- **Անվտանգության և կայունության խորհուրդ.**
  - Օգտագործիր Surveillance կարգի սկավառակներ (WD Purple / Seagate SkyHawk) և մեկուսացրու տեսախցիկները առանձին **CCTV VLAN**-ում առանց դեպի ինտերնետ ազատ ելքի։
  - NVR հեռավար դիտումը կազմակերպիր միայն **VPN (FortiGate IPSec/SSL կամ WireGuard)** միջոցով՝ ոչ ուղղակի Port Forwarding-ով \`554 / 8000 / 37777\` պորտերի վրա։`,
    };
  }
  return {
    notes: [`Computed CCTV sizing: ${stats.cameras}x ${stats.mp}MP for ${stats.days} days`],
    content: `### CCTV Storage & PoE Estimate (${stats.cameras}x ${stats.mp}MP · ${stats.days}d)
- **Aggregate Bitrate:** ~\`${stats.totalMbps} Mbps\` (${stats.bitratePerCamMbps} Mbps/cam H.265)
- **Recommended NVR Storage:** **${stats.recommendedTb} TB** (raw ~${stats.storageTbExact} TB + 15% overhead)
- **PoE Budget:** ~${stats.poeTypicalWatts} W typical / **${stats.poeMaxBudgetWatts} W** max headroom`,
  };
}

function respondServersAdProxmox(prompt: string, lang: Lang) {
  const isProxmox = /proxmox|zfs|vm|lxc|truenas|backup|pbs|սերվեր/i.test(prompt);
  if (lang === "hy") {
    return {
      notes: ["Windows Server / AD, Proxmox VE, TrueNAS և 3-2-1 պահուստավորման ստուգացանկ"],
      content: isProxmox
        ? `### Proxmox VE, TrueNAS և Backup Server Ախտորոշում / Ճարտարապետություն

1. **Փոփոխությունից առաջ Snapshot և Վիճակի ստուգում**
   \`\`\`bash
   pveversion -v
   qm list && pct list
   zpool status -x
   free -h && df -hT
   \`\`\`
2. **ZFS & TrueNAS SCALE/CORE Առողջություն**
   - Հիշողություն (ARC)․ ZFS-ի համար պահիր առանձին RAM բյուջե, իսկ VM սկավառակների վրա օգտագործիր **SSD/NVMe Mirror** կամ **RAIDZ1/RAIDZ2**՝ ըստ IOPS կարիքի։
   - Ներառիր **Scheduled ZFS Scrub** ամսական 1-2 անգամ և S.M.A.R.T. email ծանուցումներ։
3. **3-2-1 Պահուստավորման Կանոն (PBS + TrueNAS)**
   - **Proxmox Backup Server (PBS)**-ը ապահովում է deduplication և dirty-bitmap արագ incremental backup-ներ։
   - Ստուգիր իրական վերականգնումը (test restore) փորձնական VM-ի վրա, ոչ թե միայն «OK» լոգը։`
        : `### Windows Server, Active Directory & File Sharing Ստուգացանկ

1. **AD և DNS ճշգրտության արագ թեստ**
   \`\`\`powershell
   dcdiag /test:DNS /v
   repadmin /replsummary
   gpupdate /force
   gpresult /r
   \`\`\`
2. **Ոսկե կանոններ File Sharing-ի և GPO-ի համար**
   - Հաճախորդների ցանցային քարտի **առաջնային DNS-ը** միշտ պետք է լինի ներքին **Domain Controller IP-ն** (երբեք ոչ արտաքին \`8.8.8.8\`, թե չէ GPO-ն ու AD Login-ը կդանդաղեն կամ կձախողվեն)։
   - Ֆայլային թղթապանակներում տուր **Share Permissions = Authenticated Users (Full/Change)**, իսկ իրական մանրակրկիտ սահմանափակումները կարգավորիր **NTFS Security Groups**-ով։
   - Պահիր AD System State + կրիտիկական ֆայլերի ավտոմատ կրկնօրինակում Backup Server / TrueNAS-ում։`,
    };
  }
  return {
    notes: ["Enterprise Proxmox / TrueNAS / Active Directory checklist generated"],
    content: `### Infrastructure Operations Checklist (AD / Proxmox / TrueNAS)
- **Active Directory:** Verify primary client DNS points only to internal DCs; inspect health with \`dcdiag /v\` & \`repadmin /replsummary\`.
- **Proxmox & TrueNAS:** Check \`zpool status -x\`, ensure ZFS RAM headroom, take snapshots prior to upgrades, and periodically run restore drills from PBS.`,
  };
}

function respondDelphiAndDev(prompt: string, lang: Lang) {
  const isDelphi = /delphi|pascal|vcl|fmx|firedac|access violation/i.test(prompt);
  if (lang === "hy") {
    return {
      notes: [isDelphi ? "Delphi / Object Pascal կոդի անվտանգություն և memory lifecycle" : "Next.js / TypeScript & System Automation վերլուծություն"],
      content: isDelphi
        ? `### Delphi / Object Pascal — Կայունություն և Սխալների Ախտորոշում

Ամենատարածված խնդիրներից խուսափելու համար (հատկապես \`Access Violation\` և memory leak).

\`\`\`pascal
procedure TServiceRunner.ProcessSafeData;
var
  JsonObj: TJSONObject;
begin
  JsonObj := TJSONObject.Create;
  try
    // Միշտ ստուգիր Assigned() օգտագործելուց առաջ
    JsonObj.AddPair('status', 'ok');
    // Հիշողության արտահոսքից խուսափելու համար try..finally
  finally
    FreeAndNil(JsonObj); // Ազատում և դարձնում nil՝ կրկնակի Free-ից պաշտպանելու համար
  end;
end;
\`\`\`

- **Ստուգացանկ․**
  1. Երբեք մի փոխանցիր \`TThread\`-ից ուղղակիորեն VCL/FMX UI-ին առանց \`TThread.Queue\` կամ \`TThread.Synchronize\`-ի։
  2. Միացրու **ReportMemoryLeaksOnShutdown := True;** debug ռեժիմում (\`*.dpr\`)։
  3. FireDAC հարցումներում միշտ օգտագործիր parameterized queries (\`ParamByName\`)՝ SQL injection-ը բացառելու համար։`
        : `### Համակարգային և Վեբ Ծրագրավորման Ստուգացանկ (Next.js / Automation)

- **Ճարտարապետություն և Անվտանգություն.**
  1. Սերվերային secret բանալիները պահիր միայն \`.env.local\` / Vercel Secrets-ում (\`server-only\` մոդուլով)։
  2. API Route-երում վավերացրու մուտքային payload-ը **Zod**-ով, սահմանիր request size ու rate-limit պաշտպանություն և timeout-ներ (` + "`AbortSignal.timeout`" + `)։
  3. Բաժանիր մաքուր helper-ները UI կոմպոնենտներից, որպեսզի կոդը լինի հեշտ թեստավորվող և կանխատեսելի։

\`\`\`ts
// Անվտանգ timeout + abort օրինակ API հարցման համար
const controller = new AbortController();
const timer = setTimeout(() => controller.abort(), 15_000);
try {
  const res = await fetch(endpoint, { signal: controller.signal, cache: "no-store" });
  if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
} finally {
  clearTimeout(timer);
}
\`\`\``,
    };
  }
  return {
    notes: [isDelphi ? "Delphi resource safety pattern" : "Clean TypeScript/Next.js engineering guidance"],
    content: isDelphi
      ? "Use `try..finally` with `FreeAndNil()`, enable `ReportMemoryLeaksOnShutdown := True` in debug builds, and marshal thread UI updates via `TThread.Queue`."
      : "Validate external payloads with Zod, bound request sizes/timeouts via `AbortController`, and isolate server-only secrets.",
  };
}

function respondStoreSearch(prompt: string, lang: Lang) {
  const hits = searchStoreCatalog(prompt, 5);
  const items = hits.length > 0 ? hits : searchStoreCatalog("winbox wireshark ventoy mobaxterm chrome", 5);

  if (lang === "hy") {
    const listMd = items
      .map((item, idx) => {
        const desc = item.descriptionHy || item.description || "Ստուգված պաշտոնական ծրագիր";
        return `${idx + 1}. **${item.title}** (${item.developer} · \`${item.license}\` · ${item.os})\n   - ${desc}\n   - [RoyalArm Store որոնում: ${item.title}](/shop?search=${encodeURIComponent(item.title)}) · [Մանրամասներ](/shop/${encodeURIComponent(item.slug)})`;
      })
      .join("\n\n");

    return {
      notes: [`Ստուգվեց RoyalArm Software Store կատալոգը (${items.length} համապատասխան արդյունք)`],
      content: `### RoyalArm Store — Ստուգված Պաշտոնական Ծրագրեր

Բոլոր ծրագրերը հղված են **միայն պաշտոնական վենդորների կայքերին** (առանց վիրուսների ու փոփոխված installer-ների)․

${listMd}

> Կարող ես նաև բացել ամբողջ կատալոգը՝ [shop.royalarm.uk](https://shop.royalarm.uk)։`,
    };
  }

  const listEn = items
    .map(
      (item, idx) =>
        `${idx + 1}. **${item.title}** (${item.developer} · \`${item.license}\`)\n   - [RoyalArm Store Search: ${item.title}](/shop?search=${encodeURIComponent(item.title)})`
    )
    .join("\n\n");

  return {
    notes: [`Searched RoyalArm Store catalog (${items.length} matches)`],
    content: `### Verified Official Software from RoyalArm Store\n\n${listEn}`,
  };
}

function respondSipanProfile(lang: Lang) {
  if (lang === "hy") {
    return {
      notes: ["Սիփան Դանիելյանի հաստատված CV և էկոհամակարգի տվյալների ամփոփում"],
      content: `### ${SIPAN_PROFILE.fullNameHy} · RoyalArm Ինժեներական Պրոֆիլ

- **Դիրք և փորձ․** ՏՏ տեխնիկ և Ցանցային ճարտարագետ (*Mota-Engil*, *SmartTech Building*, *Moselle Armenia Jermuk*, *Armath Robotics*)։
- **Հավաստագրեր․** \`Fortinet NSE 1 / NSE 2 / NSE 3\`, \`FortiGate 7.6 Operator\`, Windows Server / Proxmox VM, VS LESSON STUDIO (Ծրագրավորում / ՏՏ)։
- **Հիմնական ուղղություններ․**
${SIPAN_PROFILE.coreStack.map((line) => `  - ${line}`).join("\n")}

**Կայքեր և Հարթակներ.**
- Պորտֆոլիո և CV՝ [royalarm.uk](${SIPAN_PROFILE.sites.portfolio}) · [Հայերեն CV](/cv/hy) · [English CV](/cv/en)
- ՏՏ Մասնագետների Հարթակ՝ [it.royalarm.uk](${SIPAN_PROFILE.sites.itPlatform})
- Անվտանգ Ծրագրերի Store՝ [shop.royalarm.uk](${SIPAN_PROFILE.sites.store})`,
    };
  }
  return {
    notes: ["Retrieved verified Sipan Danielyan CV and RoyalArm links"],
    content: `### ${SIPAN_PROFILE.fullNameEn} — IT Technician & Network Engineer
- **Experience:** Mota-Engil, SmartTech Building, Moselle Armenia Jermuk, Armath Engineering Lab.
- **Certifications:** Fortinet NSE 1–3, FortiGate 7.6 Operator, Windows Server & Proxmox VM, Programming (Delphi).
- **Links:** [Portfolio](${SIPAN_PROFILE.sites.portfolio}) · [CV](/cv/en) · [IT Platform](${SIPAN_PROFILE.sites.itPlatform}) · [Software Store](${SIPAN_PROFILE.sites.store})`,
  };
}

function respondTranslationOrTutor(prompt: string, lang: Lang, domain: DomainId, tutor: TutorContext) {
  const lexiconHits = lookupBilingualTerms(prompt);
  if (domain === "translation") {
    const quoted = prompt.match(/«([^»]+)»/)?.[1] || prompt.replace(/^(թարգմանիր|translate|переведи)[^:：]*[:：]?\s*/iu, "").trim();
    const lexiconTable = lexiconHits.length
      ? `\n\n### Տեխնիկական և Առանցքային Բառարան (Հաստատված Համարժեքներ)\n| English | Հայերեն | Ծանոթություն |\n| :--- | :--- | :--- |\n` +
        lexiconHits.map((h) => `| \`${h.en}\` | **${h.hy}** | ${h.noteHy} |`).join("\n")
      : "";

    return {
      notes: [
        `Մշակվեց երկլեզու տերմինաբանական բազայով (${lexiconHits.length} ուղղակի տեխնիկական համընկնում)`,
        "Անցանց ռեժիմում բառացի թարգմանության փոխարեն պահպանվում են ճշգրիտ ՏՏ տերմինները",
      ],
      content:
        lang === "hy"
          ? `### Թարգմանական Վերլուծություն (Local Offline Engine)\n\nՏրված հատվածը՝ *«${quoted.slice(0, 260)}»*։${lexiconTable || "\n\nԱմբողջական նախադասության կոնտեքստային թարգմանության համար կարող ես միացնել նաև **Ollama** լոկալ մոդելը կամ **Google/OpenAI** բանալին, իսկ ցանկացած ՏՏ տերմին (\`gateway\`, \`firewall policy\`, \`backup\`, \`subnet mask\`, \`failover\`, \`access violation\`) ես անմիջապես վերլուծում եմ տեղում։"}`
          : `### Translation & Technical Terminology Analysis\n\nInput: *"${quoted.slice(0, 260)}"*${lexiconTable}`,
    };
  }

  // English practice tutor offline
  const hasPastError = /\byesterday\b.*\bgo\b/i.test(prompt);
  const correctionBlock = hasPastError
    ? `**Correction:** *"I yesterday go..."* → *"Yesterday, I went..."*\n- *Հայերեն բացատրություն.* \`go\` բայի անցյալ ժամանակը **\`went\`** է, և \`yesterday\`-ը սովորաբար դրվում է նախադասության սկզբում կամ վերջում։`
    : lexiconHits.length > 0
    ? `**Useful IT Terms:**\n` + lexiconHits.map((h) => `- **${h.en}** — ${h.hy} (*${h.noteHy}*)`).join("\n")
    : `**Good effort!** Keep sentences short and clear (\`Subject + Verb + Object\`).`;

  return {
    notes: [`Practice level: ${tutor.level} · Topic: ${tutor.topic} · Saved mistakes reviewed: ${tutor.mistakes.length}`],
    content: `### Անգլերենի Պրակտիկա (Մակարդակ՝ ${tutor.level} · Թեմա՝ ${tutor.topic})

${correctionBlock}

**Next question for you:**
> *What network, server, or daily task did you work on today?* (Կարող ես պատասխանել կարճ անգլերեն կամ հայերեն՝ կթարգմանենք միասին։)`,
  };
}

function respondSimplify(prompt: string, previousAssistantText: string, lang: Lang) {
  const source = previousAssistantText || prompt.match(/«([^»]+)»/)?.[1] || prompt;
  const cleanLines = source
    .split("\n")
    .map((line) => line.replace(/^#+\s*/, "").trim())
    .filter((line) => line && !line.startsWith("```") && !line.startsWith("|"))
    .slice(0, 5);

  if (lang === "hy") {
    return {
      notes: ["Առանձնացվեցին ամենակարևոր 3-5 գործնական կետերը՝ պարզ ու հակիրճ ձևով"],
      content: `### Պարզ և Հակիրճ Ամփոփում

${cleanLines.length ? cleanLines.map((l, i) => `${i + 1}. ${l}`).join("\n") : "Հիմնական միտքը՝ ստուգիր կապը շերտ առ շերտ (ֆիզիկական պորտ -> IP/Gateway -> Firewall -> Սերվիս) և պահիր պահուստային կրկնօրինակում փոփոխությունից առաջ։"}`,
    };
  }
  return {
    notes: ["Distilled response into concise action points"],
    content: `### Simplified Summary\n\n${cleanLines.map((l, i) => `${i + 1}. ${l}`).join("\n")}`,
  };
}

function respondGeneralStructured(prompt: string, lang: Lang, tutor: TutorContext) {
  const clean = prompt.trim();
  const persona = tutor.persona ?? "architect";
  const depth = tutor.depth ?? "deep";

  if (lang === "hy") {
    return {
      notes: [
        `Հարցը վերլուծվեց «${profileLabelHy(persona)}» պրոֆիլով`,
        "Կառուցվեց գործնական պլան՝ ստուգման և ռիսկերի նվազեցման քայլերով",
      ],
      content: `### Ինժեներական Վերլուծություն և Գործողությունների Պլան

**Նպատակը.** *«${clean.slice(0, 180)}${clean.length > 180 ? "…" : ""}»*

1. **Համատեքստ և Շրջանակ.** Ճշգրիտ գնահատիր մուտքային տվյալները (IP/VLAN, OS տարբերակ, սերվիսի լոգեր կամ պահանջվող ֆունկցիոնալություն)։
2. **Քայլ առ Քայլ Լուծում.**
   - Եթե սա ցանցային/սերվերային խնդիր է՝ նշիր կոնկրետ սարքը (\`FortiGate\`, \`MikroTik\`, \`Proxmox\`, \`AD\`) կամ IP/CIDR-ը, և ես ակնթարթորեն կկազմեմ պատրաստի CLI ու ստուգման պլան։
   - Եթե սա ծրագրավորման առաջադրանք է (\`Delphi\`, \`Next.js\`, \`PowerShell\`, \`Bash\`)՝ ուղարկիր կոդի հատվածը կամ սխալի տեքստը։
   - Եթե փնտրում ես անվտանգ ծրագիր՝ գրիր ծրագրի անունը կամ նպատակը, կստուգեմ **RoyalArm Store**-ից։
${
  depth === "deep"
    ? `3. **Ռիսկերի Կանխարգելում և Ստուգում.** Մինչ արտադրական միջավայրում փոփոխությունը՝ ստեղծիր կոնֆիգուրացիայի պահուստային կրկնօրինակում (snapshot / \`export\` / \`backup\`) և ունեցիր հետադարձի (rollback) տարբերակ։`
    : ""
}`,
    };
  }

  return {
    notes: [`Analyzed with local profile '${persona}' (${depth})`],
    content: `### Structured Local Analysis

**Goal:** *${clean.slice(0, 180)}${clean.length > 180 ? "…" : ""}*

1. **Scope & Baseline:** Identify the target system (\`FortiGate\`, \`MikroTik\`, \`Proxmox\`, \`Active Directory\`, \`Delphi\`, or \`Next.js\`) and exact failure symptoms or requirements.
2. **Execution:** Pass an IPv4 CIDR (e.g. \`192.168.10.0/24\`), device name, software query, or error log for exact calculations, CLI templates, and Store links.
3. **Verification & Safety:** Always snapshot/export configuration before production edits and verify connectivity after applying changes.`,
  };
}

export function runLocalReasoning({
  messages,
  model,
  tutor,
  templateId,
}: {
  messages: ContextMessage[];
  model: ModelSummary;
  tutor: TutorContext;
  templateId?: string;
}): LocalReply {
  const latestUser = [...messages].reverse().find((m) => m.role === "user")?.content ?? "";
  const prevMessages = messages.slice(0, -1).map((m) => m.content).join("\n");
  const prevAssistant = [...messages].slice(0, -1).reverse().find((m) => m.role === "assistant")?.content ?? "";

  const lang = detectLanguage(latestUser);
  const deep = tutor.depth !== "fast";
  const effectivePersona: ThinkingProfileId =
    model.reasoningMode === "diagnostic"
      ? "diagnostic"
      : model.reasoningMode === "bilingual"
      ? "mentor"
      : tutor.persona ?? "architect";

  const effectiveTutor: TutorContext = { ...tutor, persona: effectivePersona };
  const domain = classifyDomain(latestUser, prevMessages, effectiveTutor, templateId);

  let result: { notes: string[]; content: string } | null = null;
  if (domain === "cidr") result = respondCidr(latestUser, lang, deep);
  if (!result && domain === "fortigate") result = respondFortiGate(latestUser, lang, deep);
  if (!result && domain === "mikrotik") result = respondMikrotik(latestUser, lang);
  if (!result && domain === "vlan") result = respondVlanMatrix(lang, deep);
  if (!result && domain === "cctv") result = respondCctv(latestUser, lang);
  if (!result && domain === "server-ad-proxmox") result = respondServersAdProxmox(latestUser, lang);
  if (!result && domain === "delphi-dev") result = respondDelphiAndDev(latestUser, lang);
  if (!result && domain === "software-store") result = respondStoreSearch(latestUser, lang);
  if (!result && domain === "sipan-profile") result = respondSipanProfile(lang);
  if (!result && domain === "simplify") result = respondSimplify(latestUser, prevAssistant, lang);
  if (!result && (domain === "translation" || domain === "english-practice")) {
    result = respondTranslationOrTutor(latestUser, lang, domain, effectiveTutor);
  }
  if (!result) result = respondGeneralStructured(latestUser, lang, effectiveTutor);

  const reasoning = buildReasoningTrace({
    lang,
    domain,
    model,
    tutor: effectiveTutor,
    notes: result.notes,
  });

  return {
    reasoning,
    content: result.content,
    domain,
  };
}

