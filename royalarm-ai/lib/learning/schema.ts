import { z } from "zod";
export const levelSchema = z.enum(["A1", "A2", "B1", "B2", "C1", "C2"]);
export const modeSchema = z.enum(["general", "practice", "translation"]);
const short = z.string().max(2000);
export const preferencesSchema = z.object({
  level: levelSchema.default("A1"), mode: modeSchema.default("general"),
  topic: z.enum(["daily life", "work", "travel", "computers", "programming", "Delphi"]).default("daily life"),
  sessionMinutes: z.union([z.literal(5), z.literal(10)]).default(5),
  voice: z.enum(["marin", "cedar", "alloy", "coral", "sage", "verse"]).default("marin"), turnMode: z.enum(["auto", "push"]).default("auto"),
  timezone: z.string().max(80).refine((value) => { try { new Intl.DateTimeFormat("en", { timeZone: value }); return true; } catch { return false; } }).default("Asia/Yerevan"),
  reminders: z.boolean().default(false), reminderTime: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/).default("19:00"),
  quietStart: z.number().int().min(0).max(23).default(22), quietEnd: z.number().int().min(0).max(23).default(8), lastReminderDate: z.string().max(20).default(""),
}).strict();
export type Preferences = z.infer<typeof preferencesSchema>;
export const DEFAULT_PREFERENCES = preferencesSchema.parse({});
export const entrySchema = z.object({
  id: z.string().min(1).max(150), kind: z.enum(["word", "phrase", "dialogue"]), term: z.string().min(1).max(4000),
  translation: short.default(""), definition: short.default(""), example: z.string().max(4000).default(""),
  level: levelSchema.default("A1"), estimatedLevel: z.boolean().default(true), source: z.string().max(500), license: z.string().max(200), normalized: z.string().max(4000).optional(),
}).strict();
export type LearningEntry = z.infer<typeof entrySchema>;
export const progressSchema = z.object({ id: z.string().max(150), due: z.number().finite().nonnegative(), interval: z.number().min(0).max(3650), repetitions: z.number().int().min(0).max(100000), learned: z.boolean() }).strict();
export type Progress = z.infer<typeof progressSchema>;
export const mistakeSchema = z.object({ id: z.string().max(150), original: short, correction: short, count: z.number().int().min(1).max(100000), updatedAt: z.number().finite() }).strict();
export type Mistake = z.infer<typeof mistakeSchema>;
export const tutorContextSchema = z.object({ mode: modeSchema.default("general"), level: levelSchema.default("A1"), topic: z.string().max(50).default("daily life"), mistakes: z.array(z.object({ original: short, correction: short })).max(3).default([]), words: z.array(z.string().max(100)).max(8).default([]) }).strict();
export type TutorContext = z.infer<typeof tutorContextSchema>;
