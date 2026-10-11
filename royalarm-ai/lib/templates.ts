import "server-only";
import type { PlanId, TemplateSummary } from "./catalog-types";
import { RequestError } from "./http";
import { getActivePlan, planAllows } from "./plans";

type TemplateDefinition = TemplateSummary & { instructions: string };

const templates: TemplateDefinition[] = [
  {
    slug: "general",
    title: "Ընդհանուր զրույց",
    titleEn: "General conversation",
    description: "Հարցրու, ուսումնասիրիր գաղափարներ կամ պարզիր բարդ թեմաները։",
    descriptionEn: "Ask questions, explore ideas, or make a complex topic clearer.",
    examplePrompts: ["Օգնիր ինձ հասկանալ այս գաղափարը։", "Help me plan a useful project."],
    requiredPlan: "free",
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
    instructions: "Act as a patient English tutor. Use natural everyday English, adapt to the learner's level, ask one question at a time, and gently correct errors with a short explanation. Explain difficult points in Armenian unless the learner asks for English.",
  },
  {
    slug: "translation",
    title: "Հայերեն–անգլերեն թարգմանություն",
    titleEn: "Armenian–English translation",
    description: "Թարգմանիր երկու ուղղությամբ՝ պահպանելով իմաստը, տոնն ու բնական հնչողությունը։",
    descriptionEn: "Translate both ways while preserving meaning, tone, and natural phrasing.",
    examplePrompts: ["Թարգմանիր սա բնական անգլերենով։", "Translate this email into Armenian and keep it polite."],
    requiredPlan: "free",
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
