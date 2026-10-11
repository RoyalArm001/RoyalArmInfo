"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import {
  Sparkles,
  Send,
  Square,
  Clock,
  BookOpen,
  Mic,
  Volume2,
  VolumeX,
  Languages,
  GraduationCap,
  MessageCircle,
  FileText,
  RotateCcw,
  ExternalLink,
  Plus,
  HelpCircle,
  LogOut,
  SlidersHorizontal,
  ShoppingBag,
  X,
} from "lucide-react";
import { Login } from "./login";
import { useWorkspace } from "@/lib/use-workspace";
import { GREETING } from "@/lib/identity";
import { MessageMarkdown } from "./markdown";
import { AiOrb, type OrbState } from "./ai-orb";
import { AmbientBackground } from "./ambient-background";
import { HistoryDrawer } from "./history-drawer";
import { VocabularyPanel } from "./vocabulary-panel";
import { TranscriptDrawer } from "./transcript-drawer";
import {
  loadVocabulary,
  saveVocabularyItem,
  deleteVocabularyItem,
  type VocabularyItem,
} from "@/lib/history";
import type { ModelSummary, PlanId, TemplateSummary } from "@/lib/catalog-types";

type SpeechRecognitionEventLike = {
  results: ArrayLike<ArrayLike<{ transcript: string }>>;
};

type SpeechRecognitionLike = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
  start: () => void;
  stop: () => void;
};

type BrowserWindow = Window & {
  SpeechRecognition?: new () => SpeechRecognitionLike;
  webkitSpeechRecognition?: new () => SpeechRecognitionLike;
  webkitAudioContext?: typeof AudioContext;
};

interface ChatProps {
  initialAuthenticated?: boolean;
  models?: ModelSummary[];
  defaultModelId?: string;
  activePlan?: PlanId;
  initialTemplate?: TemplateSummary;
}

export function Chat({
  initialAuthenticated = true,
  models = [],
  defaultModelId,
  activePlan = "free",
  initialTemplate,
}: ChatProps) {
  const [authenticated, setAuthenticated] = useState(true);
  const [sessionExpired, setSessionExpired] = useState(false);
  const ws = useWorkspace(() => {
    setSessionExpired(true);
  });

  const [draft, setDraft] = useState("");
  const selectedModelId = ws.active?.modelId ?? defaultModelId ?? "";
  const [historyOpen, setHistoryOpen] = useState(false);
  const [vocabOpen, setVocabOpen] = useState(false);
  const [transcriptOpen, setTranscriptOpen] = useState(false);

  // Vocabulary & Learning items
  const [vocabulary, setVocabulary] = useState<VocabularyItem[]>([]);

  // Voice, Microphone & Speech States
  const [voiceActivated, setVoiceActivated] = useState(false);
  const [speakerEnabled, setSpeakerEnabled] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [micVolume, setMicVolume] = useState(0);
  const [hasSpokenGreeting, setHasSpokenGreeting] = useState(false);

  // Conversational Voice Modulation Settings
  const [voicePitch, setVoicePitch] = useState<number>(1.0);
  const [voiceRate, setVoiceRate] = useState<number>(1.0);
  const [voicePreset, setVoicePreset] = useState<string>("natural");
  const [modulationOpen, setModulationOpen] = useState(false);

  const MODULATION_PRESETS = [
    { id: "natural", nameHy: "🌿 Բնական", pitch: 1.05, rate: 1.0 },
    { id: "pro_tech", nameHy: "💻 ՏՏ Pro", pitch: 0.92, rate: 1.12 },
    { id: "tutor", nameHy: "🎓 Ուսուցիչ", pitch: 1.0, rate: 0.88 },
    { id: "cosmic", nameHy: "🌌 Տիեզերք", pitch: 0.82, rate: 0.94 },
    { id: "robotic", nameHy: "🤖 AI Synth", pitch: 1.35, rate: 1.25 },
  ];

  function applyVoicePreset(presetId: string) {
    const preset = MODULATION_PRESETS.find((p) => p.id === presetId);
    if (preset) {
      setVoicePreset(presetId);
      setVoicePitch(preset.pitch);
      setVoiceRate(preset.rate);
    }
  }

  function testVoiceSample() {
    triggerVoiceActivation();
    speakText("Բարև, ես RoyalArm AI-ն եմ։ Ձայնային մոդուլացիան ակտիվ է։ Hello, voice modulation is ready!");
  }

  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const speechRecognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const templateStarted = useRef(false);

  // Load vocabulary from IndexedDB
  useEffect(() => {
    let mounted = true;
    loadVocabulary()
      .then((items) => {
        if (mounted) setVocabulary(items);
      })
      .catch(() => {});
    return () => {
      mounted = false;
      stopMicrophone();
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Initialize template if provided
  useEffect(() => {
    if (!ws.ready || !initialTemplate || templateStarted.current) return;
    templateStarted.current = true;
    const mode =
      initialTemplate.slug === "translation"
        ? "translation"
        : ["daily-english", "travel", "work-it-english", "voice-practice"].includes(
            initialTemplate.slug
          )
        ? "practice"
        : "general";
    ws.preferences({ mode });
    ws.create(initialTemplate, defaultModelId);
  }, [defaultModelId, initialTemplate, ws.ready]);

  // Adjust textarea height dynamically
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        140
      )}px`;
    }
  }, [draft]);

  // Active messages
  const messages = ws.active?.messages || [];
  const currentQuestion = [...messages].reverse().find((m) => m.role === "user");
  const lastAssistant =
    [...messages].reverse().find((m) => m.role === "assistant") || {
      id: "initial-greeting",
      role: "assistant" as const,
      content: GREETING,
      status: "complete" as const,
    };

  // Determine actual Orb State
  let orbState: OrbState = "idle";
  if (!speakerEnabled && !isListening) {
    orbState = "muted";
  } else if (isListening) {
    orbState = "listening";
  } else if (ws.busy) {
    orbState = "thinking";
  } else if (speaking) {
    orbState = "speaking";
  } else if (lastAssistant.status === "error" || lastAssistant.status === "interrupted") {
    orbState = "error";
  } else {
    orbState = "idle";
  }

  // Speak assistant text
  function speakText(text: string) {
    if (!speakerEnabled || typeof window === "undefined" || !("speechSynthesis" in window))
      return;
    window.speechSynthesis.cancel();

    const clean = text
      .replace(/```[\s\S]*?```/g, "Code block omitted.")
      .replace(/`([^`]+)`/g, "$1")
      .replace(/[*_#>[\]()]/g, "")
      .trim();

    if (!clean) return;

    const utterance = new SpeechSynthesisUtterance(clean);
    const hasArmenian = /[\u0530-\u058F]/.test(clean);
    utterance.lang = hasArmenian ? "hy-AM" : "en-US";
    utterance.pitch = voicePitch;
    utterance.rate = voiceRate;

    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }

  // Voice activation handler:
  // "Speak the greeting only after voice has been activated."
  function triggerVoiceActivation() {
    if (!voiceActivated) {
      setVoiceActivated(true);
      if (!hasSpokenGreeting && messages.length <= 1) {
        setHasSpokenGreeting(true);
        speakText(GREETING);
      }
    }
  }

  // Real Microphone Audio Analyser via Web Audio API
  async function startMicrophone() {
    triggerVoiceActivation();
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      const browserWindow = window as BrowserWindow;
      const AudioCtx = window.AudioContext || browserWindow.webkitAudioContext;
      if (!AudioCtx) throw new Error("Web Audio is unavailable in this browser.");
      const audioCtx = new AudioCtx();
      audioContextRef.current = audioCtx;

      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);

      const buffer = new Uint8Array(analyser.frequencyBinCount);

      const updateVolume = () => {
        if (!mediaStreamRef.current) return;
        analyser.getByteFrequencyData(buffer);
        let sum = 0;
        for (let i = 0; i < buffer.length; i++) {
          sum += buffer[i];
        }
        const avg = sum / buffer.length;
        const normalized = Math.min(avg / 90, 1);
        setMicVolume(normalized);
        animFrameRef.current = requestAnimationFrame(updateVolume);
      };

      updateVolume();
      setIsListening(true);

      const SpeechRecognitionClass =
        browserWindow.SpeechRecognition || browserWindow.webkitSpeechRecognition;

      if (SpeechRecognitionClass) {
        const recognition = new SpeechRecognitionClass();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = ws.prefs.mode === "practice" ? "en-US" : "hy-AM";

        recognition.onresult = (event) => {
          const transcript = Array.from(event.results)
            .map((result) => result[0].transcript)
            .join("");
          setDraft(transcript);
        };

        recognition.onend = () => {
          stopMicrophone();
        };

        recognition.onerror = () => {
          stopMicrophone();
        };

        speechRecognitionRef.current = recognition;
        recognition.start();
      }
    } catch (err) {
      console.error("Microphone access denied or error:", err);
      stopMicrophone();
    }
  }

  function stopMicrophone() {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
    if (speechRecognitionRef.current) {
      try {
        speechRecognitionRef.current.stop();
      } catch {}
      speechRecognitionRef.current = null;
    }
    setIsListening(false);
    setMicVolume(0);
  }

  function toggleMicrophone() {
    if (isListening) {
      stopMicrophone();
      if (draft.trim()) {
        void send(draft);
      }
    } else {
      startMicrophone();
    }
  }

  function toggleSpeaker() {
    triggerVoiceActivation();
    const next = !speakerEnabled;
    setSpeakerEnabled(next);
    if (!next && speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    }
  }

  function handleOrbClick() {
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    } else if (!isListening) {
      startMicrophone();
    } else {
      stopMicrophone();
    }
  }

  async function send(text = draft) {
    const trimmed = text.trim();
    if (!trimmed || ws.busy) return;

    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    }
    stopMicrophone();
    setDraft("");

    const answer = await ws.send(trimmed, false, false, selectedModelId);
    if (answer && speakerEnabled && voiceActivated) {
      speakText(answer);
    }
  }

  function handleStop() {
    ws.stop();
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    }
    stopMicrophone();
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void send();
    }
  }

  function handleChipAction(action: "translate" | "simpler" | "listen" | "save") {
    const text = lastAssistant.content;
    if (!text) return;

    if (action === "listen") {
      triggerVoiceActivation();
      speakText(text);
    } else if (action === "translate") {
      const hasArmenian = /[\u0530-\u058F]/.test(text);
      const prompt = hasArmenian
        ? `Թարգմանիր սա բնական անգլերենով՝ «${text.slice(0, 300)}»`
        : `Թարգմանիր սա գեղեցիկ և բնական հայերենով՝ «${text.slice(0, 300)}»`;
      ws.preferences({ mode: "translation" });
      void send(prompt);
    } else if (action === "simpler") {
      void send(
        `Խնդրում եմ այս պատասխանը բացատրիր ավելի պարզ, հասկանալի և հակիրճ՝ «${text.slice(0, 250)}»`
      );
    } else if (action === "save") {
      const words = text
        .replace(/[*_#`[\]()]/g, "")
        .split(/[\s,.:;!?—]+/)
        .filter((w) => w.length >= 3 && w.length <= 25);
      const candidate = words[0] || "Նոր բառ";
      const newItem: VocabularyItem = {
        id: crypto.randomUUID(),
        word: candidate,
        meaning: "Հատված զրույցից",
        context: text.slice(0, 80) + "…",
        addedAt: Date.now(),
      };
      saveVocabularyItem(newItem);
      setVocabulary([newItem, ...vocabulary]);
      setVocabOpen(true);
    }
  }

  async function signOut() {
    try {
      await fetch("/api/session", { method: "DELETE" });
    } catch {}
    ws.create();
    setDraft("");
    setHasSpokenGreeting(false);
  }

  return (
    <div className="futuristic-container">
      {/* Ambient Celestial Canvas Layer */}
      <AmbientBackground />

      {/* Top Navigation Bar */}
      <header className="top-nav-bar">
        {/* Brand */}
        <a href="https://royalarm.uk" className="brand-section">
          <div className="brand-sparkle-badge" aria-hidden="true">
            <Sparkles size={18} />
          </div>
          <div className="brand-title-wrap">
            <span className="brand-title">
              RoyalArm <span className="text-cyan-400">AI</span>
            </span>
            <span className="brand-subtitle">Հայկական խելացի տարածք</span>
          </div>
        </a>

        {/* Compact Mode Switcher */}
        <div className="mode-switch-segmented" role="tablist">
          <button
            className={`mode-tab-btn ${ws.prefs.mode === "general" ? "active" : ""}`}
            onClick={() => ws.preferences({ mode: "general" })}
            role="tab"
            aria-selected={ws.prefs.mode === "general"}
          >
            <MessageCircle size={14} />
            <span>Զրույց</span>
          </button>
          <button
            className={`mode-tab-btn ${ws.prefs.mode === "practice" ? "active" : ""}`}
            onClick={() => ws.preferences({ mode: "practice" })}
            role="tab"
            aria-selected={ws.prefs.mode === "practice"}
          >
            <GraduationCap size={14} />
            <span>Անգլերեն</span>
          </button>
          <button
            className={`mode-tab-btn ${ws.prefs.mode === "translation" ? "active" : ""}`}
            onClick={() => ws.preferences({ mode: "translation" })}
            role="tab"
            aria-selected={ws.prefs.mode === "translation"}
          >
            <Languages size={14} />
            <span>Թարգմանություն</span>
          </button>
        </div>

        {/* Top Right Actions */}
        <div className="top-actions-row">
          <span className="active-plan-chip">{activePlan.toUpperCase()}</span>
          {models.length > 0 && <label className="model-selector">
            <span>Model</span>
            <select
              aria-label="AI model"
              value={selectedModelId}
              disabled={ws.busy}
              onChange={(event) => ws.setModel(event.target.value)}
            >
              {models.map((model) => (
                <option
                  key={`${model.provider}:${model.id}`}
                  value={model.id}
                  disabled={!model.selectable}
                >
                  {model.displayName}
                  {!model.selectable
                    ? model.availability === "plan-locked"
                      ? " (Pro plan required)"
                      : " (Unavailable)"
                    : ""}
                </option>
              ))}
            </select>
          </label>}
          <Link className="nav-action-pill" href="/templates">Templates</Link>
          <Link className="nav-action-pill" href="/plans">Plans</Link>
          <a
            className="nav-action-pill text-cyan-300 hover:text-cyan-200 border-cyan-500/30"
            href="/shop"
            title="RoyalArm Store — Ծրագրերի կատալոգ (Windows, Network.am ոճով)"
          >
            <ShoppingBag size={14} className="text-cyan-400" />
            <span className="hidden sm:inline">Store</span>
          </a>
          <button
            className="nav-action-pill"
            onClick={() => {
              ws.create();
              setDraft("");
              setHasSpokenGreeting(false);
            }}
            aria-label="New conversation"
            title="New conversation (Նոր զրույց)"
          >
            <Plus size={15} />
            <span className="hidden sm:inline">New conversation</span>
          </button>

          <button
            className="nav-action-pill"
            onClick={() => setVocabOpen(true)}
            aria-label="Բառապաշար և առաջընթաց"
            title="Բառապաշար և առաջընթաց"
          >
            <BookOpen size={15} />
            <span className="hidden sm:inline">Բառապաշար</span>
            <span className="count-badge">{vocabulary.length}</span>
          </button>

          <button
            className="nav-action-pill"
            onClick={() => setHistoryOpen(true)}
            aria-label="Open navigation"
            title="Զրույցների պատմություն"
          >
            <Clock size={15} />
            <span className="hidden sm:inline">Պատմություն</span>
          </button>

          <button
            className="nav-action-pill"
            onClick={signOut}
            aria-label="New conversation"
            title="Մաքրել և սկսել նորից (Restart)"
          >
            <RotateCcw size={14} />
            <span className="hidden sm:inline">Նորից</span>
          </button>

        </div>
      </header>

      {/* Main Conversational Showcase (Center Stage) */}
      <main className="ai-orb-stage">
        {/* Futuristic Stage Header */}
        <div className="conversation-stage-header text-center mb-3">
          <h1 className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-200 via-white to-violet-200">
            What’s on your mind?
          </h1>
          <p className="text-xs text-cyan-300/80 mt-1">
            {ws.prefs.mode === "practice"
              ? "English Practice • Interactive AI Tutor"
              : ws.prefs.mode === "translation"
              ? "Translation Mode • English & Armenian"
              : "Հայկական խելացի տարածք • Ստեղծված Սիփանի կողմից"}
          </p>
        </div>

        {/* The Animated Dimensional Fluid AI Orb */}
        <AiOrb
          state={orbState}
          micVolume={micVolume}
          onOrbClick={handleOrbClick}
        />

        {/* Conversation Focus Area (Stationary Readable Area) */}
        <div className="conversation-focus-area mt-4">
          {/* Current Question Glass Card */}
          {currentQuestion && (
            <div className="current-question-card animate-fadeIn">
              <span className="question-chip-label">Ձեր հարցը</span>
              <p className="question-text user-content">{currentQuestion.content}</p>
            </div>
          )}

          {/* Current Response Showcase Card */}
          <div className="current-response-card">
            <div className="response-card-header">
              <div className="response-author-tag">
                <Sparkles size={14} />
                <span>
                  RoyalArm AI •{" "}
                  {ws.prefs.mode === "practice"
                    ? "English Practice"
                    : ws.prefs.mode === "translation"
                    ? "Translation Mode"
                    : "Assistant"}
                </span>
              </div>
              {messages.length > 2 && (
                <button
                  className="action-chip transcript-link-chip"
                  onClick={() => setTranscriptOpen(true)}
                  aria-label="Դիտել ամբողջական պատմությունը"
                >
                  <FileText size={13} />
                  <span>Ամբողջ պատմությունը ({messages.length})</span>
                </button>
              )}
            </div>

            {/* Response Body Text */}
            <div className="response-body-text">
              {lastAssistant.status === "streaming" && !lastAssistant.content ? (
                <div className="streaming-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              ) : (
                <MessageMarkdown content={lastAssistant.content || GREETING} />
              )}

              {lastAssistant.status === "streaming" && lastAssistant.content && (
                <span className="inline-block w-2 h-4 ml-1 bg-cyan-400 animate-pulse align-middle" />
              )}

              {(lastAssistant.status === "error" ||
                lastAssistant.status === "interrupted") && (
                <div className="message-error flex items-center justify-between gap-3 p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-200 text-xs sm:text-sm mt-3">
                  <span>
                    {lastAssistant.status === "interrupted"
                      ? lastAssistant.error ||
                        "This reply was interrupted. You can retry it."
                      : lastAssistant.error ||
                        "The connection ended before the reply finished. Try again."}
                  </span>
                  <button
                    className="retry-btn px-3 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs font-medium transition-colors"
                    onClick={() => void ws.send("", true, false, selectedModelId)}
                    aria-label="Retry reply"
                  >
                    Retry reply
                  </button>
                </div>
              )}
            </div>

            {/* Compact Action Chips */}
            <div className="action-chips-container">
              <a
                href="/shop"
                className="action-chip text-cyan-300 border-cyan-500/30 hover:border-cyan-400"
                title="Որոնել և բեռնել ստուգված ծրագրեր Store-ում (Windows, Network.am ոճով)"
              >
                <ShoppingBag size={13} className="text-cyan-400" />
                <span>Store Ծրագրեր</span>
              </a>

              <button
                className="action-chip"
                onClick={() => handleChipAction("translate")}
                title="Թարգմանել հայերենի կամ անգլերենի"
              >
                <Languages size={13} className="text-cyan-400" />
                <span>Թարգմանել</span>
              </button>

              <button
                className="action-chip"
                onClick={() => handleChipAction("simpler")}
                title="Բացատրել ավելի պարզ և մատչելի"
              >
                <HelpCircle size={13} className="text-violet-400" />
                <span>Ավելի պարզ</span>
              </button>

              <button
                className="action-chip"
                onClick={() => handleChipAction("listen")}
                title="Լսել բարձրաձայն"
              >
                <Volume2 size={13} className="text-sky-400" />
                <span>Լսել</span>
              </button>

              <button
                className="action-chip"
                onClick={() => handleChipAction("save")}
                title="Պահել բառը բառապաշարում"
              >
                <BookOpen size={13} className="text-amber-400" />
                <span>Պահել բառը</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Control Dock (Bottom Center Island) */}
      <footer className="floating-dock-wrapper">
        {/* Floating Voice Modulation Controls Box */}
        {modulationOpen && (
          <div className="voice-modulation-panel animate-fadeIn mb-3 p-3 sm:p-4 rounded-2xl bg-slate-900/95 border border-cyan-500/40 backdrop-blur-2xl shadow-2xl text-xs max-w-md mx-auto w-full">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
              <div className="flex items-center gap-2 text-cyan-300 font-semibold">
                <SlidersHorizontal size={14} className="text-cyan-400" />
                <span>Խոսակցական Ձայնային Մոդուլացիա</span>
              </div>
              <button
                type="button"
                onClick={() => setModulationOpen(false)}
                className="text-slate-400 hover:text-slate-200"
                aria-label="Փակել"
              >
                <X size={14} />
              </button>
            </div>

            {/* Presets */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {MODULATION_PRESETS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className={`px-2.5 py-1 rounded-lg border text-[11px] font-medium transition-all ${
                    voicePreset === p.id
                      ? "bg-cyan-500/25 border-cyan-400 text-cyan-200 shadow-[0_0_10px_rgba(0,242,254,0.25)]"
                      : "bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800"
                  }`}
                  onClick={() => applyVoicePreset(p.id)}
                >
                  {p.nameHy}
                </button>
              ))}
            </div>

            {/* Sliders */}
            <div className="space-y-2.5 mb-3">
              <div>
                <div className="flex justify-between text-[11px] text-slate-300 mb-1">
                  <span>Տոնայնություն (Pitch):</span>
                  <span className="font-mono text-cyan-300">{voicePitch.toFixed(2)}x</span>
                </div>
                <input
                  type="range"
                  min="0.6"
                  max="1.6"
                  step="0.05"
                  value={voicePitch}
                  onChange={(e) => {
                    setVoicePitch(parseFloat(e.target.value));
                    setVoicePreset("custom");
                  }}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-slate-300 mb-1">
                  <span>Արագություն (Speed):</span>
                  <span className="font-mono text-cyan-300">{voiceRate.toFixed(2)}x</span>
                </div>
                <input
                  type="range"
                  min="0.7"
                  max="1.5"
                  step="0.05"
                  value={voiceRate}
                  onChange={(e) => {
                    setVoiceRate(parseFloat(e.target.value));
                    setVoicePreset("custom");
                  }}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={testVoiceSample}
                className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-[11px] font-medium transition-colors"
              >
                <Volume2 size={13} />
                <span>Փորձարկել Ձայնը</span>
              </button>
              <button
                type="button"
                onClick={() => applyVoicePreset("natural")}
                className="py-1.5 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-slate-200 text-[11px] transition-colors"
              >
                Լռելյայն
              </button>
            </div>
          </div>
        )}

        <div className="floating-dock">
          {/* Microphone with Real Volume Reactivity */}
          <button
            className={`dock-mic-btn ${isListening ? "active-listening" : ""}`}
            onClick={toggleMicrophone}
            aria-label={
              isListening ? "Անջատել խոսափողը" : "Միացնել խոսափողը (Microphone)"
            }
            title={isListening ? "Անջատել խոսափողը" : "Խոսեք RoyalArm AI-ի հետ"}
          >
            <Mic size={20} />
          </button>

          {/* Text Input */}
          <textarea
            ref={textareaRef}
            className="dock-text-input"
            placeholder={
              ws.prefs.mode === "practice"
                ? "Practice English or ask in Armenian..."
                : ws.prefs.mode === "translation"
                ? "Գրեք տեքստը թարգմանության համար..."
                : "Գրեք հարցը կամ խոսեք..."
            }
            aria-label="Message RoyalArm AI"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            disabled={ws.busy}
          />

          {/* Control Group */}
          <div className="dock-controls-group">
            {/* Speaker Toggle */}
            <button
              className={`dock-icon-btn ${
                speakerEnabled ? "text-cyan-300" : "text-slate-500"
              }`}
              onClick={toggleSpeaker}
              title={
                speakerEnabled
                  ? "Ձայնը միացված է (Mute voice)"
                  : "Ձայնն անջատված է (Unmute voice)"
              }
              aria-label={speakerEnabled ? "Ձայնը միացված է" : "Ձայնն անջատված է"}
            >
              {speakerEnabled ? <Volume2 size={17} /> : <VolumeX size={17} />}
            </button>

            {/* Voice Modulation Toggle */}
            <button
              className={`dock-icon-btn ${
                modulationOpen ? "text-cyan-300 bg-cyan-500/20" : "text-slate-400 hover:text-cyan-300"
              }`}
              onClick={() => setModulationOpen((v) => !v)}
              title="Ձայնի մոդուլացիա (Pitch, Speed, Presets)"
              aria-label="Ձայնի մոդուլացիա"
            >
              <SlidersHorizontal size={17} />
            </button>

            {/* Stop or New Conversation */}
            {ws.busy || speaking ? (
              <button
                className="dock-stop-btn"
                onClick={handleStop}
                aria-label="Stop generating"
                title="Կանգնեցնել (Stop)"
              >
                <Square size={13} fill="currentColor" />
                <span className="hidden sm:inline">Կանգնեցնել</span>
              </button>
            ) : (
              <button
                className="dock-icon-btn"
                onClick={() => {
                  ws.create();
                  setDraft("");
                  setHasSpokenGreeting(false);
                }}
                aria-label="New conversation"
                title="New conversation (Ավարտել զրույցը)"
              >
                <RotateCcw size={16} />
              </button>
            )}

            {/* Send Button */}
            {!ws.busy && (
              <button
                className="dock-send-btn"
                onClick={() => void send()}
                disabled={!draft.trim()}
                aria-label="Send message"
                title="Ուղարկել հաղորդագրությունը"
              >
                <Send size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Footer Links */}
        <div className="dock-footer-links">
          <a href="https://royalarm.uk" target="_blank" rel="noopener noreferrer">
            royalarm.uk
          </a>
          <span>•</span>
          <a
            href="https://youtube.com/@RoyalArm001"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1"
          >
            YouTube <ExternalLink size={10} />
          </a>
          <span>•</span>
          <span className="text-slate-500">Conversations stay in IndexedDB on this device</span>
        </div>
      </footer>

      {/* History Drawer */}
      <HistoryDrawer
        isOpen={historyOpen}
        onClose={() => setHistoryOpen(false)}
        conversations={ws.conversations}
        activeId={ws.activeId}
        onSelectConversation={(id) => {
          ws.select(id);
          setDraft("");
        }}
        onNewConversation={() => {
          ws.create();
          setDraft("");
          setHasSpokenGreeting(false);
        }}
        onDeleteConversation={(id) => {
          void ws.remove(id);
        }}
      />

      {/* Vocabulary & Progress Drawer */}
      <VocabularyPanel
        isOpen={vocabOpen}
        onClose={() => setVocabOpen(false)}
        items={vocabulary}
        onDeleteItem={(id) => {
          deleteVocabularyItem(id);
          setVocabulary(vocabulary.filter((v) => v.id !== id));
        }}
        onAddItem={(word, meaning, context) => {
          const item: VocabularyItem = {
            id: crypto.randomUUID(),
            word,
            meaning,
            context,
            addedAt: Date.now(),
          };
          saveVocabularyItem(item);
          setVocabulary([item, ...vocabulary]);
        }}
        totalConversations={ws.conversations.length}
        activeMode={ws.prefs.mode}
      />

      {/* Transcript Drawer */}
      <TranscriptDrawer
        isOpen={transcriptOpen}
        onClose={() => setTranscriptOpen(false)}
        title={ws.active?.title || "Զրույց"}
        messages={messages}
      />
    </div>
  );
}
