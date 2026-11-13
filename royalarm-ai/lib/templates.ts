import "server-only";
import type { PlanId, TemplateSummary } from "./catalog-types";
import { RequestError } from "./http";
import { getActivePlan, planAllows } from "./plans";

type TemplateDefinition = TemplateSummary & { instructions: string };

const templates: TemplateDefinition[] = [
  {
    slug: "network-architecture",
    title: "Ցանցային ճարտարապետություն · FortiGate / MikroTik",
    titleEn: "Network Architecture · FortiGate / MikroTik",
    description: "VLAN սեգմենտացիա, IP/CIDR հաշվարկներ, NAT/VPN և երթուղիչների կարգավորում Սիփանի ստանդարտներով։",
    descriptionEn: "VLAN segmentation, IP/CIDR subnetting, NAT/VPN policies, and MikroTik/FortiGate setup tailored to Sipan's stack.",
    examplePrompts: [
      "192.168.10.0/24 ցանցը բաժանիր 4 VLAN-ի՝ Mgmt, Office, VoIP և CCTV",
      "FortiGate 7.6-ում IPSec VPN ու Dual WAN failover կազմիր",
    ],
    requiredPlan: "free",
    category: "engineering",
    badgeHy: "Սիփանի ստեք",
    instructions: "Act as a senior network architect tailored to Sipan Danielyan (FortiGate 7.6, MikroTik RouterOS, Aruba/UniFi, Grandstream VoIP). Provide exact subnet masks, VLAN segmentation, firewall policy logic, Safe Mode / backup precautions, and diagnostic verification commands.",
  },
  {
    slug: "server-infrastructure",
    title: "Սերվերներ, AD, Proxmox և TrueNAS",
    titleEn: "Servers, Active Directory, Proxmox & TrueNAS",
    description: "Windows Server / AD կառավարում, Proxmox վիրտուալիզացիա, TrueNAS SCALE պահեստավորում և 3-2-1 Backup պլան։",
    descriptionEn: "Windows Server / AD administration, Proxmox VE virtualization, TrueNAS storage, and 3-2-1 backup architecture.",
    examplePrompts: [
      "Ստուգիր Active Directory + File Sharing իրավունքների անվտանգ կառուցվածքը",
      "Proxmox VM-երի ZFS snapshot և TrueNAS backup ռազմավարություն գծիր",
    ],
    requiredPlan: "free",
    category: "engineering",
    badgeHy: "Ինֆրակառուցվածք",
    instructions: "Act as an enterprise systems engineer specializing in Windows Server / Active Directory, File Sharing GPOs, Proxmox VE KVM/LXC, TrueNAS SCALE/CORE, and Nextcloud. Include snapshot/backup warnings and CLI verification steps.",
  },
  {
    slug: "cybersecurity-audit",
    title: "Կիբեռանվտանգություն և NOC Ախտորոշում",
    titleEn: "Cybersecurity & NOC Diagnostics",
    description: "Կապի խափանումների վերլուծություն (L1–L7), Firewall կանոնների ստուգում, NVR/CCTV անվտանգություն և լոգերի աուդիտ։",
    descriptionEn: "Root-cause NOC troubleshooting (L1–L7), NGFW audit, Hikvision/Dahua camera VLAN isolation, and log diagnostics.",
    examplePrompts: [
      "Ինչպե՞ս մեկուսացնել Hikvision/Dahua տեսախցիկների ցանցը կորպորատիվ AD-ից",
      "Ստուգիր packet drop ու DNS կորստի հիմնական պատճառները FortiGate-ում",
    ],
    requiredPlan: "free",
    category: "security",
    badgeHy: "NSE Աուդիտ",
    instructions: "Act as a cybersecurity and NOC diagnostics analyst (Fortinet NSE 1-3 mindset). Break issues down from Layer 1/PoE through Layer 7, isolate untrusted IoT/CCTV segments, provide exact diagnostic commands, and never overclaim telemetry not observed.",
  },
  {
    slug: "software-advisor",
    title: "RoyalArm Store Ծրագրային Խորհրդատու",
    titleEn: "RoyalArm Store Software Advisor",
    description: "Անվտանգ, պաշտոնական ծրագրերի ընտրություն աշխատանքի, ցանցային թեստավորման և սպասարկման համար։",
    descriptionEn: "Curate verified official software from the RoyalArm Store catalog for sysadmins, networking, and workstation setup.",
    examplePrompts: [
      "Ո՞ր ցանցային ու համակարգային գործիքներն են պարտադիր IT ադմինի ֆլեշկայում",
      "Գտիր պաշտոնական հղումներ Winbox, Wireshark և Ventoy ծրագրերի համար",
    ],
    requiredPlan: "free",
    category: "engineering",
    badgeHy: "Store Կատալոգ",
    instructions: "Recommend verified, official software from RoyalArm Software Store (/shop?search=...) including MobaXterm, Winbox, Wireshark, Ventoy, Process Explorer, VeraCrypt, and system utilities, noting OS and license details.",
  },
  {
    slug: "general",
    title: "Ընդհանուր ինժեներական զրույց",
    titleEn: "General conversation",
    description: "Հարցրու, ուսումնասիրիր գաղափարներ կամ պարզիր բարդ տեխնիկական և ամենօրյա թեմաները։",
    descriptionEn: "Ask questions, explore ideas, or make a complex topic clearer.",
    examplePrompts: ["Օգնիր ինձ հասկանալ այս գաղափարը։", "Help me plan a useful project."],
    requiredPlan: "free",
    category: "general",
    instructions: "Be a thoughtful general-purpose assistant. Ask one clarifying question when it would materially improve the answer.",
  },
  {
    slug: "daily-english",
    title: "Ամենօրյա անգլերեն",
    titleEn: "Daily English practice",
    description: "Կարճ, հանգիստ երկխոսություններ՝ բառապաշարն ու վստահությունը զարգացնելու համար։",
    descriptionEn: "Short, supportive conversations to build vocabulary and confidence.",
    examplePrompts: ["Let's practice ordering breakfast.", "Help me talk about my weekend."],
    requiredPlan: "free",
    category: "language",
    instructions: "Act as a patient English tutor. Use natural everyday English, adapt to the learner's level, ask one question at a time, and gently correct errors with a short explanation. Explain difficult points in Armenian unless the learner asks for English.",
  },
  {
    slug: "translation",
    title: "Հայերեն–անգլերեն թարգմանություն",
    titleEn: "Armenian–English translation",
    description: "Թարգմանիր երկու ուղղությամբ՝ պահպանելով տեխնիկական և բնական իմաստն ու տոնը։",
    descriptionEn: "Translate both ways while preserving meaning, tone, and natural phrasing.",
    examplePrompts: ["Թարգմանիր սա բնական անգլերենով։", "Translate this email into Armenian and keep it polite."],
    requiredPlan: "free",
    category: "language",
    instructions: "Translate between Armenian and English in either direction. Preserve meaning, register, and formatting. Return the translation first; mention ambiguity briefly only when it affects meaning. Do not add a lesson unless asked.",
  },
  {
    slug: "travel",
    title: "Ճամփորդական զրույցներ",
    titleEn: "Travel conversations",
    description: "Փորձիր օդանավակայանի, հյուրանոցի, ռեստորանի և ճանապարհի իրավիճակները։",
    descriptionEn: "Practice airport, hotel, restaurant, and getting-around situations.",
    examplePrompts: ["Role-play checking in at a hotel.", "Help me ask for directions politely."],
    requiredPlan: "free",
    category: "language",
    instructions: "Role-play practical travel conversations in clear, natural English. Play the other speaker, keep turns short, and after the learner responds provide one useful correction or phrase. Explain in Armenian if helpful.",
  },
  {
    slug: "work-it-english",
    title: "Աշխատանքային և ՏՏ անգլերեն",
    titleEn: "Work and IT English",
    description: "Վարժվիր տեխնիկական քննարկումներին, նամակներին ու աշխատանքային հանդիպումներին։",
    descriptionEn: "Practice technical discussions, emails, and professional meetings.",
    examplePrompts: ["Help me explain a server outage to a client.", "Practice a short IT support call with me."],
    requiredPlan: "pro",
    category: "language",
    instructions: "Be an English tutor for professional and IT situations. Simulate realistic workplace conversations, use accurate technical terminology, and give concise corrections and alternative professional phrasing after each learner turn.",
  },
  {
    slug: "programming-delphi",
    title: "Ծրագրավորում և Delphi",
    titleEn: "Programming and Delphi",
    description: "Քննարկիր կոդը, ճարտարապետությունը, սխալների որոնումն ու Delphi-ն։",
    descriptionEn: "Explore code, architecture, debugging, and Delphi programming.",
    examplePrompts: ["Explain this Delphi compiler error.", "Review my code for edge cases and performance."],
    requiredPlan: "pro",
    category: "engineering",
    instructions: "Act as a careful programming partner with strong Delphi/Object Pascal knowledge. Explain assumptions, identify edge cases, and provide correct, focused code examples. Never claim to have run code or inspected files that were not provided.",
  },
  {
    slug: "voice-practice",
    title: "Ձայնային զրույցի փորձ",
    titleEn: "Voice conversation practice",
    description: "Օգտագործիր խոսափողն ու բարձրաձայն ընթերցումը՝ անգլերեն խոսակցություն փորձելու համար։",
    descriptionEn: "Use your microphone and read-aloud controls to practice spoken English.",
    examplePrompts: ["Let's practice introducing ourselves aloud.", "Help me rehearse a travel conversation by voice."],
    requiredPlan: "pro",
    category: "language",
    instructions: "Run a spoken-English practice conversation. Keep each reply easy to say aloud, ask one question at a time, and offer a short pronunciation or grammar tip after the learner's answer. Voice input and read-aloud are browser features; do not claim to hear audio unless it arrives as text.",
  },
];

export function getTemplateSummaries(): TemplateSummary[] {
  return templates.map(({ instructions: _instructions, ...summary }) => summary);
}

export function getAccessibleTemplateSummaries(): TemplateSummary[] {
  const activePlan = getActivePlan();
  return getTemplateSummaries().filter((template) => planAllows(activePlan, template.requiredPlan));
}

export function getTemplateSummary(slug: string): TemplateSummary | undefined {
  const template = templates.find((item) => item.slug === slug);
  if (!template) return undefined;
  const { instructions: _instructions, ...summary } = template;
  return summary;
}

export function resolveTemplateInstructions(slug: unknown) {
  if (slug !== undefined && (typeof slug !== "string" || !slug)) {
    throw new RequestError("Choose a valid assistant template.", 400);
  }
  const chosenSlug = typeof slug === "string" ? slug : "general";
  const template = templates.find((item) => item.slug === chosenSlug);
  if (!template) throw new RequestError("That assistant template does not exist.", 400);
  if (!planAllows(getActivePlan(), template.requiredPlan)) {
    throw new RequestError("This template requires the Pro plan configured for this application.", 403);
  }
  return template.instructions;
}

export function canUseTemplate(template: TemplateSummary): boolean {
  return planAllows(getActivePlan(), template.requiredPlan);
}
