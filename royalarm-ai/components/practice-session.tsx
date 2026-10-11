"use client";
import { useEffect, useState } from "react";
export function PracticeSession({ minutes, busy, send }: { minutes: number; busy: boolean; send: (text: string) => void }) {
  const [remaining, setRemaining] = useState<number | null>(null);
  useEffect(() => { if (remaining === null || remaining <= 0) return; const timer = setTimeout(() => setRemaining((n) => n === null ? null : n - 1), 1000); return () => clearTimeout(timer); }, [remaining]);
  return <div className="toolbar"><button disabled={busy || (remaining !== null && remaining > 0)} onClick={() => { setRemaining(minutes * 60); send(`Start a ${minutes}-minute practical English session at my selected level. Ask one short question.`); }}>Start practice</button>{remaining !== null && <><span role="timer">{Math.floor(remaining / 60)}:{String(remaining % 60).padStart(2, "0")}{remaining === 0 ? " · Time for your review" : " remaining"}</span><button disabled={busy} onClick={() => { setRemaining(null); send("Finish this practice session. Give a short review of what we actually practiced, one useful correction, and a next step. Use Armenian for any explanation."); }}>Finish & review</button></>}</div>;
}
