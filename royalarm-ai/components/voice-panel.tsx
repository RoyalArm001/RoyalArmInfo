"use client";
import { useEffect, useRef, useState } from "react";
import type { Message } from "@/lib/history";
import type { Preferences } from "@/lib/learning/schema";
import { learningContext } from "@/lib/learning/storage";
import { AUDIO_NOTICE } from "@/lib/identity";
import { microphoneError, Recorder, SpeechPlayer } from "@/lib/voice/audio";
import { RealtimeVoice, type VoiceState } from "@/lib/voice/realtime";
type Props = { prefs: Preferences; history: Message[]; onTranscript: (id: string, role: "user" | "assistant", text: string) => void; onRecorded: (text: string) => Promise<string | undefined>; onActive: (active: boolean) => void };
export function VoicePanel({ prefs, history, onTranscript, onRecorded, onActive }: Props) {
  const [state, setState] = useState<VoiceState>("idle"); const [error, setError] = useState(""); const [caption, setCaption] = useState("");
  const [micMuted, setMicMuted] = useState(false); const [speakerMuted, setSpeakerMuted] = useState(false); const [recording, setRecording] = useState(false);
  const realtime = useRef<RealtimeVoice | null>(null); const recorder = useRef<Recorder | null>(null); const player = useRef<SpeechPlayer | null>(null); const request = useRef<AbortController | null>(null);
  const active = state !== "idle" && state !== "error";
  useEffect(() => { onActive(active || recording); }, [active, recording, onActive]);
  useEffect(() => {
    function close() { realtime.current?.close(); recorder.current?.cancel(); player.current?.stop(); request.current?.abort(); setRecording(false); }
    function hidden() { if (document.hidden) close(); }
    window.addEventListener("pagehide", close); document.addEventListener("visibilitychange", hidden);
    return () => { close(); window.removeEventListener("pagehide", close); document.removeEventListener("visibilitychange", hidden); };
  }, []);
  function end() { realtime.current?.close(); recorder.current?.cancel(); player.current?.stop(); request.current?.abort(); setRecording(false); setState("idle"); }
  async function start() {
    if (active) return; end(); setError(""); setMicMuted(false); setSpeakerMuted(false); setState("connecting");
    const voice = new RealtimeVoice({ state: setState, caption: setCaption, transcript: onTranscript, error: setError }); realtime.current = voice;
    try { await voice.start(prefs, await learningContext(prefs), history); }
    catch (error) { voice.close(); setState("error"); setError(microphoneError(error)); }
  }
  async function record() {
    end(); setError(""); setState("connecting"); const device = new Recorder(); recorder.current = device;
    try {
      await device.start(async (blob) => {
        setRecording(false); setState("thinking"); const abort = new AbortController(); request.current = abort;
        try {
          const response = await fetch("/api/transcribe", { method: "POST", headers: { "Content-Type": blob.type }, body: blob, signal: abort.signal });
          const data = await response.json(); if (!response.ok) throw new Error(data.error || "Transcription failed.");
          if (!data.text?.trim()) throw new Error("No speech was recognized. Try again or type your message.");
          setCaption(data.text); const answer = await onRecorded(data.text);
          if (abort.signal.aborted) return;
          if (answer && !speakerMuted) { setState("speaking"); const speech = new SpeechPlayer(); player.current = speech; await speech.speak(answer, prefs.voice); }
          setState("idle");
        } catch (error) { if (!abort.signal.aborted) { setState("error"); setError(microphoneError(error)); } }
      }, (message) => { setRecording(false); setState("error"); setError(message); });
      setRecording(true); setState("listening");
    } catch (error) { device.cancel(); setState("error"); setError(microphoneError(error)); }
  }
  return <section className="voice-panel" aria-label="Voice conversation"><p lang="hy">{AUDIO_NOTICE}</p><p className="subtle">AI-generated voice. Armenian TTS is documented; Armenian recognition and Realtime quality need a live check. Text explanations remain available.</p>
    <div className="toolbar"><span role="status" className={recording || active ? "recording-state" : ""}>{recording ? "● Recording · maximum 30 seconds" : state}</span>
      {!active && <><button onClick={() => void start()}>Start conversation</button><button onClick={() => void record()}>Record a message</button></>}
      {recording && <button onClick={() => recorder.current?.finish()}>Stop recording & send</button>}
      {active && <><button onClick={() => { realtime.current?.muteMicrophone(!micMuted); setMicMuted(!micMuted); }} disabled={recording}>{micMuted ? "Unmute microphone" : "Mute microphone"}</button><button onClick={() => { realtime.current?.muteSpeaker(!speakerMuted); if (!speakerMuted) player.current?.stop(); setSpeakerMuted(!speakerMuted); }}>{speakerMuted ? "Unmute speaker" : "Mute speaker"}</button><button onClick={() => { realtime.current?.interrupt(); player.current?.stop(); }}>Stop speech</button><button onClick={end}>End conversation</button></>}
      {active && !recording && prefs.turnMode === "push" && <button disabled={micMuted || state === "connecting"} onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); realtime.current?.pushStart(); }} onPointerUp={() => realtime.current?.pushEnd()} onPointerCancel={() => realtime.current?.muteMicrophone(true)} onKeyDown={(e) => { if (e.code === "Space" && !e.repeat) { e.preventDefault(); realtime.current?.pushStart(); } }} onKeyUp={(e) => { if (e.code === "Space") { e.preventDefault(); realtime.current?.pushEnd(); } }}>Hold to talk</button>}
    </div>
    {caption && <p className="voice-caption" aria-live="polite" dir="auto">{caption}</p>}
    {error && <p role="alert" className="error-text">{error} <button onClick={() => void realtime.current?.resumeAudio().catch(() => setError("Playback is still blocked. Check browser audio permissions."))}>Enable audio</button></p>}
  </section>;
}
