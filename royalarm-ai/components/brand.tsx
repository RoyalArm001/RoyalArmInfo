import { Sparkles } from "lucide-react";
export function Brand({ large = false }: { large?: boolean }) {
  return <span className={`brand-mark ${large ? "large" : ""}`} aria-hidden="true"><Sparkles size={large ? 32 : 22} strokeWidth={1.5} /></span>;
}
