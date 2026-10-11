import type { RealtimeServerEvent } from "openai/resources/realtime/realtime";
import type { Preferences, TutorContext } from "../learning/schema";
import type { Message } from "../history";
import { GREETING } from "../identity";
import { microphone } from "./audio";
export type VoiceState = "idle" | "connecting" | "listening" | "thinking" | "speaking" | "error";
type Callbacks = { state: (state: VoiceState) => void; caption: (text: string) => void; transcript: (id: string, role: "user" | "assistant", text: string) => void; error: (text: string) => void };
export class RealtimeVoice {
  private pc: RTCPeerConnection | null = null;
  private channel: RTCDataChannel | null = null;
  private stream: MediaStream | null = null;
  private audio: HTMLAudioElement | null = null;
  private abort: AbortController | null = null;
  private deadline: ReturnType<typeof setTimeout> | undefined;
  private readyTimer: ReturnType<typeof setTimeout> | undefined;
  private captions = new Map<string, string>();
  private greeted = false;
  private greetingItem: string | null = null;
  private turnMode: "auto" | "push" = "auto";
  private muted = false;
  constructor(private cb: Callbacks) {}
  private send(event: object) { if (this.channel?.readyState === "open") this.channel.send(JSON.stringify(event)); }
  close() {
    this.abort?.abort(); this.abort = null; clearTimeout(this.deadline); clearTimeout(this.readyTimer);
    this.stream?.getTracks().forEach((track) => track.stop()); this.stream = null;
    this.channel?.close(); this.channel = null; this.pc?.close(); this.pc = null;
    this.audio?.pause(); if (this.audio) this.audio.srcObject = null; this.audio = null;
    this.cb.state("idle"); this.captions.clear();
  }
  interrupt() { this.send({ type: "response.cancel" }); this.send({ type: "output_audio_buffer.clear" }); this.cb.state("listening"); }
  muteMicrophone(muted: boolean) { this.muted = muted; this.stream?.getAudioTracks().forEach((track) => { track.enabled = !muted && this.turnMode === "auto"; }); if (muted) this.send({ type: "input_audio_buffer.clear" }); }
  muteSpeaker(muted: boolean) { if (this.audio) this.audio.muted = muted; }
  async resumeAudio() { await this.audio?.play(); }
  pushStart() { if (this.muted) return; this.interrupt(); this.send({ type: "input_audio_buffer.clear" }); this.stream?.getAudioTracks().forEach((track) => { track.enabled = true; }); }
  pushEnd() { this.stream?.getAudioTracks().forEach((track) => { track.enabled = false; }); this.send({ type: "input_audio_buffer.commit" }); this.send({ type: "response.create" }); this.cb.state("thinking"); }
  async start(prefs: Preferences, tutor: TutorContext, history: Message[]) {
    this.close(); this.cb.state("connecting"); this.turnMode = prefs.turnMode; this.muted = false; this.greeted = false; this.greetingItem = null;
    if (typeof RTCPeerConnection === "undefined") throw new Error("WebRTC is unavailable. Use the recording fallback.");
    const abort = new AbortController(); this.abort = abort;
    this.stream = await microphone(abort.signal);
    this.stream.getAudioTracks().forEach((track) => { track.enabled = false; });
    const tokenResponse = await fetch("/api/realtime", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ tutor, turnMode: prefs.turnMode, voice: prefs.voice }), signal: abort.signal });
    if (!tokenResponse.ok) throw new Error((await tokenResponse.json()).error || "Realtime is unavailable. Try recording a message.");
    const token = await tokenResponse.json(); if (typeof token.value !== "string") throw new Error("Invalid voice credentials.");
    const pc = new RTCPeerConnection(); this.pc = pc;
    const audio = new Audio(); audio.autoplay = true; this.audio = audio;
    pc.ontrack = (event) => { audio.srcObject = event.streams[0]; void audio.play().catch(() => this.cb.error("Tap Enable audio to allow speaker playback.")); };
    for (const track of this.stream.getTracks()) pc.addTrack(track, this.stream);
    const channel = pc.createDataChannel("oai-events"); this.channel = channel;
    channel.onopen = () => {
      clearTimeout(this.readyTimer);
      // Seed only a bounded tail; never copy the entire learning database.
      for (const message of history.filter((m) => m.status === "complete" && m.source !== "greeting").slice(-8)) this.send({ type: "conversation.item.create", item: { type: "message", role: message.role, content: [{ type: message.role === "user" ? "input_text" : "output_text", text: message.content.slice(0, 2000) }] } });
      this.send({ type: "response.create", response: { instructions: `Read exactly this greeting once, and nothing else: ${GREETING}` } });
      this.deadline = setTimeout(() => { this.close(); this.cb.error("Voice session ended after 10 minutes. Start another when ready."); }, 10 * 60_000);
    };
    channel.onmessage = (event) => { try { this.event(JSON.parse(event.data)); } catch { this.cb.error("A voice event could not be read. End the conversation and reconnect."); } };
    pc.onconnectionstatechange = () => { if (["failed", "disconnected"].includes(pc.connectionState)) { this.close(); this.cb.state("error"); this.cb.error("Voice connection lost. Saved transcripts remain available; reconnect or use recording."); } };
    const offer = await pc.createOffer(); await pc.setLocalDescription(offer);
    const response = await fetch("https://api.openai.com/v1/realtime/calls", { method: "POST", headers: { Authorization: `Bearer ${token.value}`, "Content-Type": "application/sdp" }, body: offer.sdp, signal: abort.signal });
    if (!response.ok) throw new Error("Realtime connection failed. Try the recording fallback.");
    if (abort.signal.aborted) return;
    await pc.setRemoteDescription({ type: "answer", sdp: await response.text() });
    this.readyTimer = setTimeout(() => { if (channel.readyState !== "open") { this.close(); this.cb.state("error"); this.cb.error("Voice connection timed out. Try the recording fallback."); } }, 20_000);
  }
  private event(event: RealtimeServerEvent) {
    if (event.type === "input_audio_buffer.speech_started") { this.interrupt(); this.cb.caption(""); }
    if (event.type === "input_audio_buffer.speech_stopped") this.cb.state("thinking");
    if (event.type === "response.created") this.cb.state("thinking");
    if (event.type === "response.output_audio_transcript.delta") {
      const text = (this.captions.get(event.item_id) ?? "") + event.delta; this.captions.set(event.item_id, text); this.cb.caption(text); this.cb.state("speaking");
      if (!this.greeted) this.greetingItem = event.item_id;
    }
    if (event.type === "conversation.item.input_audio_transcription.completed") this.cb.transcript(event.item_id, "user", event.transcript);
    if (event.type === "response.output_audio_transcript.done") {
      if (this.greeted && event.item_id !== this.greetingItem) this.cb.transcript(event.item_id, "assistant", event.transcript);
      this.captions.delete(event.item_id);
    }
    if (event.type === "output_audio_buffer.stopped" || event.type === "output_audio_buffer.cleared") {
      this.greeted = true; this.muteMicrophone(this.muted); this.cb.state("listening");
    }
    if (event.type === "response.done" && event.response.status === "failed") this.cb.error("The voice response failed. You can try another turn or use text.");
    if (event.type === "error" && event.error.code !== "response_cancel_not_active") this.cb.error(event.error.message);
  }
}
