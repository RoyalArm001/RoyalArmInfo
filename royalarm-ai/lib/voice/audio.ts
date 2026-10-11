export function microphoneError(error: unknown) {
  const name = error instanceof DOMException ? error.name : "";
  if (name === "NotAllowedError" || name === "SecurityError") return "Microphone permission was denied or dismissed. Text chat still works; enable microphone access in your browser to retry.";
  if (name === "NotFoundError") return "No microphone was found. Connect one and try again.";
  if (name === "NotReadableError") return "The microphone is unavailable or in use by another app.";
  return error instanceof Error ? error.message : "Audio could not start. Text chat is still available.";
}
export async function microphone(signal: AbortSignal) {
  if (!navigator.mediaDevices?.getUserMedia) throw new Error("This browser cannot access a microphone. Use a supported browser over HTTPS.");
  const pending = navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true }, video: false });
  let abandoned = false;
  let timer: ReturnType<typeof setTimeout>;
  const onAbort = () => { abandoned = true; };
  signal.addEventListener("abort", onAbort, { once: true });
  pending.then((stream) => { if (abandoned || signal.aborted) stream.getTracks().forEach((track) => track.stop()); }).catch(() => {});
  try {
    const stream = await Promise.race([pending, new Promise<never>((_, reject) => { timer = setTimeout(() => { abandoned = true; reject(new Error("Microphone permission is still pending. Allow it in your browser, then try again.")); }, 20_000); })]);
    if (signal.aborted) { stream.getTracks().forEach((track) => track.stop()); throw new DOMException("Cancelled", "AbortError"); }
    return stream;
  } finally { clearTimeout(timer!); signal.removeEventListener("abort", onAbort); }
}

export class SpeechPlayer {
  private audio: HTMLAudioElement | null = null;
  private request: AbortController | null = null;
  private url: string | null = null;
  stop() { this.request?.abort(); this.request = null; this.audio?.pause(); this.audio = null; if (this.url) URL.revokeObjectURL(this.url); this.url = null; }
  async speak(text: string, voice: string) {
    this.stop(); const controller = new AbortController(); this.request = controller;
    const audio = new Audio(); this.audio = audio;
    const response = await fetch("/api/speech", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text: text.slice(0, 4000), voice }), signal: controller.signal });
    if (!response.ok) throw new Error((await response.json()).error || "Read-aloud is unavailable.");
    const blob = await response.blob(); if (controller.signal.aborted) return;
    this.url = URL.createObjectURL(blob); audio.src = this.url;
    await audio.play().catch(() => { throw new Error("Your browser blocked playback. Press Listen again to allow audio."); });
    await new Promise<void>((resolve, reject) => { audio.onended = () => { this.stop(); resolve(); }; audio.onerror = () => { this.stop(); reject(new Error("Audio playback failed.")); }; controller.signal.addEventListener("abort", () => resolve(), { once: true }); });
  }
}

export class Recorder {
  private stream: MediaStream | null = null;
  private recorder: MediaRecorder | null = null;
  private controller: AbortController | null = null;
  private timer: ReturnType<typeof setTimeout> | undefined;
  private discard = false;
  async start(onReady: (blob: Blob) => void, onError: (error: string) => void) {
    this.cancel(); this.discard = false; const controller = new AbortController(); this.controller = controller;
    if (typeof MediaRecorder === "undefined") throw new Error("Recording is not supported by this browser.");
    const stream = await microphone(controller.signal); this.stream = stream;
    const mime = ["audio/webm;codecs=opus", "audio/mp4", "audio/ogg;codecs=opus", "audio/webm"].find((type) => MediaRecorder.isTypeSupported(type));
    if (!mime) { this.cancel(); throw new Error("No supported recording format is available."); }
    const recorder = new MediaRecorder(stream, { mimeType: mime, audioBitsPerSecond: 64000 }); this.recorder = recorder;
    const chunks: Blob[] = []; let size = 0;
    recorder.ondataavailable = (event) => { size += event.data.size; if (size > 3 * 1024 * 1024) { this.cancel(); onError("Recording is too large. Try a shorter message."); } else chunks.push(event.data); };
    recorder.onerror = () => { this.cancel(); onError("Recording failed. Your microphone may be in use."); };
    recorder.onstop = () => { clearTimeout(this.timer); stream.getTracks().forEach((track) => track.stop()); if (!this.discard && !controller.signal.aborted) onReady(new Blob(chunks, { type: mime })); };
    recorder.start(250); this.timer = setTimeout(() => this.finish(), 30_000);
  }
  finish() { clearTimeout(this.timer); if (this.recorder?.state === "recording") this.recorder.stop(); this.stream?.getTracks().forEach((track) => track.stop()); }
  cancel() { this.discard = true; this.controller?.abort(); this.finish(); this.stream = null; this.recorder = null; }
}
