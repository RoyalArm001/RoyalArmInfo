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
  SlidersHorizontal,
  ShoppingBag,
  X,
  Cpu,
  Brain,
  ShieldCheck,
  Network,
  Server,
  Terminal,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  PanelLeft,
  MessageSquare,
  Trash2,
  Zap,
} from "lucide-react";
import { useWorkspace } from "@/lib/use-workspace";
import { GREETING } from "@/lib/identity";
import { useAiBasePath } from "@/lib/ai-routes";
import { MessageMarkdown } from "./markdown";
import { SpeechPlayer } from "@/lib/voice/audio";
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
import type {
  ModelSummary,
  PlanId,
  TemplateSummary,
  ThinkingProfileId,
} from "@/lib/catalog-types";

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

type LocalEngineStatus = {
  localMindReady: boolean;
  cloudConfigured: boolean;
  ollamaReachable: boolean;
  installedOllamaModels: string[];
};

const THINKING_PROFILES: Array<{
  id: ThinkingProfileId;
  labelHy: string;
  hintHy: string;
}> = [
  { id: "architect", labelHy: "Ճարտարապետ", hintHy: "MikroTik · FortiGate · AD · Proxmox" },
  { id: "diagnostic", labelHy: "Ախտորոշիչ", hintHy: "Root-Cause · Flow · Անվտանգություն" },
  { id: "developer", labelHy: "Կոդ / Delphi", hintHy: "Delphi · Next.js · Scripts" },
  { id: "mentor", labelHy: "Մենթոր", hintHy: "Հայ ↔ EN · Բացատրություն" },
];

const QUICK_STARTERS = [
  {
    title: "CIDR / VLAN Բաժանում",
    meta: "192.168.10.0/24 → 4 VLAN + CLI",
    prompt: "192.168.10.0/24 ցանցը բաժանիր 4 VLAN-ի՝ Mgmt, Office, VoIP և CCTV",
    icon: "network" as const,
  },
  {
    title: "FortiGate 7.6 Ախտորոշում",
    meta: "Sniffer · Debug Flow · VIP / VPN",
    prompt: "FortiGate-ում տրաֆիկի խափանում կա․ տուր sniffer, debug flow և NAT/VIP ստուգման քայլերը",
    icon: "shield" as const,
  },
  {
    title: "MikroTik Dual-WAN Failover",
    meta: "RouterOS v7 · Safe Mode",
    prompt: "MikroTik RouterOS v7-ում գրիր Dual-WAN failover սկրիպտ Safe Mode նախազգուշացմամբ",
    icon: "terminal" as const,
  },
  {
    title: "Proxmox, AD & 3-2-1 Backup",
    meta: "Windows Server · ZFS · PBS",
    prompt: "Ստուգիր Active Directory DNS-ի, Proxmox ZFS-ի և 3-2-1 backup պլանի ոսկե կանոնները",
    icon: "server" as const,
  },
  {
    title: "CCTV PoE և NVR Հաշվարկ",
    meta: "16x 4MP Hikvision · 30 օր",
    prompt: "16 հատ 4MP Hikvision տեսախցիկ 30 օր արխիվի համար․ հաշվիր սկավառակը և PoE բյուջեն",
    icon: "cpu" as const,
  },
  {
    title: "Store Անվտանգ Ծրագրեր",
    meta: "Winbox · MobaXterm · Wireshark",
    prompt: "Գտիր ցանցային ու համակարգային ադմինի անվտանգ ծրագրեր RoyalArm Store-ից",
    icon: "shop" as const,
  },
];

const MODULATION_PRESETS = [
  { id: "natural", nameHy: "🌿 Բնական", pitch: 1.05, rate: 1.0 },
  { id: "pro_tech", nameHy: "💻 ՏՏ Pro", pitch: 0.92, rate: 1.12 },
  { id: "tutor", nameHy: "🎓 Ուսուցիչ", pitch: 1.0, rate: 0.88 },
  { id: "cosmic", nameHy: "🌌 Տիեզերք", pitch: 0.82, rate: 0.94 },
  { id: "robotic", nameHy: "🤖 AI Synth", pitch: 1.35, rate: 1.25 },
];

interface ChatProps {
  initialAuthenticated?: boolean;
  models?: ModelSummary[];
  defaultModelId?: string;
  activePlan?: PlanId;
  initialTemplate?: TemplateSummary;
  initialModelId?: string;
}

export function Chat({
  models = [],
  defaultModelId,
  activePlan = "free",
  initialTemplate,
  initialModelId,
}: ChatProps) {
  const aiHref = useAiBasePath();
  const ws = useWorkspace();

  const [draft, setDraft] = useState("");
  const resolvedInitialModel = initialModelId ?? defaultModelId ?? "";
  const selectedModelId = ws.active?.modelId ?? resolvedInitialModel;
  const selectedModel = models.find((m) => m.id === selectedModelId) ?? models[0];

  const [historyOpen, setHistoryOpen] = useState(false);
  const [vocabOpen, setVocabOpen] = useState(false);
  const [transcriptOpen, setTranscriptOpen] = useState(false);
  const [railConfirmDeleteId, setRailConfirmDeleteId] = useState<string | null>(null);
  const [reasoningExpanded, setReasoningExpanded] = useState(true);
  const [copiedReply, setCopiedReply] = useState(false);
  const [engineStatus, setEngineStatus] = useState<LocalEngineStatus | null>(null);

  // Vocabulary & Learning items
  const [vocabulary, setVocabulary] = useState<VocabularyItem[]>([]);

  // Voice, Microphone & Speech States
  const autoRead = useRef(false);
  const playbackVersion = useRef(0);
  const speechPlayer = useRef<SpeechPlayer | null>(null);
  const [voiceError, setVoiceError] = useState("");
  const [speakerEnabled, setSpeakerEnabled] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [micVolume, setMicVolume] = useState(0);

  // Voice Modulation
  const [voicePitch, setVoicePitch] = useState<number>(1.0);
  const [voiceRate, setVoiceRate] = useState<number>(1.0);
  const [voicePreset, setVoicePreset] = useState<string>("natural");
  const [modulationOpen, setModulationOpen] = useState(false);

  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const speechRecognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const templateStarted = useRef(false);
  const modelApplied = useRef(false);

  function applyVoicePreset(presetId: string) {
    const preset = MODULATION_PRESETS.find((p) => p.id === presetId);
    if (preset) {
      setVoicePreset(presetId);
      setVoicePitch(preset.pitch);
      setVoiceRate(preset.rate);
    }
  }

  function testVoiceSample() {
    void speakText("Բարև։ Սա Սիփանի RoyalArm AI ձայնային մոդուլացիայի փորձարկումն է։");
  }

  // Probe live local Ollama & cloud telemetry + load IndexedDB vocabulary
  useEffect(() => {
    let mounted = true;
    loadVocabulary()
      .then((items) => {
        if (mounted) setVocabulary(items);
      })
      .catch(() => {});

    fetch("/api/local-models")
      .then((res) => (res.ok ? res.json() : null))
      .then((data: LocalEngineStatus | null) => {
        if (mounted && data) setEngineStatus(data);
      })
      .catch(() => {});

    return () => {
      mounted = false;
      stopMicrophone();
      stopSpeech();
    };
  }, []);

  // Apply ?template=... once workspace is ready
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
    ws.create(initialTemplate, initialModelId ?? defaultModelId);
  }, [defaultModelId, initialModelId, initialTemplate, ws.ready]);

  // Apply ?model=... if explicitly linked from /models
  useEffect(() => {
    if (!ws.ready || !initialModelId || initialTemplate || modelApplied.current) return;
    modelApplied.current = true;
    const target = models.find((m) => m.id === initialModelId && m.selectable);
    if (target) ws.setModel(target.id);
  }, [initialModelId, initialTemplate, models, ws.ready]);

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

  // Conversation slices (keep active turn .user-content & .markdown unique!)
  const messages = ws.active?.messages || [];
  const nonGreeting = messages.filter((m) => m.source !== "greeting");
  const lastUserIndex = messages.findLastIndex((m) => m.role === "user");
  const currentQuestion = lastUserIndex >= 0 ? messages[lastUserIndex] : undefined;
  const previousMessages =
    lastUserIndex > 0
      ? messages.slice(0, lastUserIndex).filter((m) => m.source !== "greeting")
      : [];
  const lastAssistant =
    (lastUserIndex >= 0
      ? [...messages.slice(lastUserIndex + 1)].reverse().find((m) => m.role === "assistant")
      : [...messages].reverse().find((m) => m.role === "assistant")) || {
      id: "initial-greeting",
      role: "assistant" as const,
      content: GREETING,
      status: "complete" as const,
    };

  let orbState: OrbState = "idle";
  if (isListening) orbState = "listening";
  else if (ws.busy) orbState = "thinking";
  else if (speaking) orbState = "speaking";
  else if (lastAssistant.status === "error" || lastAssistant.status === "interrupted") orbState = "error";

  function stopSpeech() {
    playbackVersion.current++;
    window.speechSynthesis?.cancel();
    speechPlayer.current?.stop();
    setSpeaking(false);
  }

  async function speakText(text: string) {
    stopSpeech();
    setVoiceError("");
    const version = playbackVersion.current;
    const clean = text
      .replace(/```[\s\S]*?```/g, " ")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/[`*_#>|]/g, "")
      .trim();
    if (!clean) return;
    const lang = /[Ա-ֆ]/.test(clean) ? "hy" : /[А-яЁё]/.test(clean) ? "ru" : "en";
    const synth = window.speechSynthesis;
    const voice = synth?.getVoices().find((item) => item.lang.toLowerCase().split(/[-_]/)[0] === lang);
    setSpeaking(true);

    async function playOnline() {
      if (version !== playbackVersion.current) return;
      const player = (speechPlayer.current ??= new SpeechPlayer());
      try {
        let remaining = clean;
        while (remaining && version === playbackVersion.current) {
          const boundary = remaining.lastIndexOf(" ", 4000);
          const end = remaining.length <= 4000 ? remaining.length : boundary > 0 ? boundary : 4000;
          await player.speak(remaining.slice(0, end), ws.prefs.voice, voiceRate);
          remaining = remaining.slice(end).trimStart();
        }
      } catch {
        if (version === playbackVersion.current) {
          player.stop();
          setVoiceError(
            "Ձայնային ծառայությունն անհասանելի է։ Կարող եք սարքի կարգավորումներում ավելացնել պատասխանի լեզվի ձայնը։"
          );
        }
      } finally {
        if (version === playbackVersion.current) setSpeaking(false);
      }
    }

    if (!voice) return playOnline();
    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.voice = voice;
    utterance.lang = voice.lang;
    utterance.pitch = voicePitch;
    utterance.rate = voiceRate;
    utterance.onend = () => {
      if (version === playbackVersion.current) setSpeaking(false);
    };
    utterance.onerror = () => {
      void playOnline();
    };
    synth.speak(utterance);
  }

  async function startMicrophone(prefix = "") {
    stopSpeech();
    setVoiceError("");
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
        for (let i = 0; i < buffer.length; i++) sum += buffer[i];
        setMicVolume(Math.min(sum / buffer.length / 90, 1));
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
          setDraft(prefix + transcript);
        };
        recognition.onend = () => stopMicrophone();
        recognition.onerror = () => stopMicrophone();
        speechRecognitionRef.current = recognition;
        recognition.start();
      } else {
        stopMicrophone();
        setVoiceError("Այս դիտարկիչը չի աջակցում խոսքի ճանաչմանը։ Հարցը կարող եք գրել։");
      }
    } catch {
      setVoiceError("Խոսափողը հասանելի չէ։ Ստուգեք դիտարկիչի թույլտվությունը։");
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
      if (draft.trim()) void send(draft);
    } else {
      void startMicrophone();
    }
  }

  function toggleSpeaker() {
    autoRead.current = !autoRead.current;
    setSpeakerEnabled(autoRead.current);
    if (!autoRead.current) stopSpeech();
  }

  function handleOrbClick() {
    if (speaking) stopSpeech();
    else if (!isListening) void startMicrophone();
    else stopMicrophone();
  }

  async function send(text = draft, retry = false) {
    const trimmed = text.trim();
    if ((!trimmed && !retry) || ws.busy || !ws.ready) return;

    if (speaking) stopSpeech();
    stopMicrophone();
    setDraft("");

    const version = playbackVersion.current;
    const answer = await ws.send(trimmed, retry, false, selectedModelId);
    if (answer && autoRead.current && version === playbackVersion.current) {
      void speakText(answer);
    }
  }

  function handleStop() {
    ws.stop();
    if (speaking) stopSpeech();
    stopMicrophone();
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void send();
    }
  }

  async function copyLastReply() {
    try {
      await navigator.clipboard.writeText(lastAssistant.content || GREETING);
      setCopiedReply(true);
      setTimeout(() => setCopiedReply(false), 1800);
    } catch {}
  }

  function handleChipAction(action: "translate" | "simpler" | "deeper" | "listen" | "save") {
    const text = lastAssistant.content;
    if (!text) return;

    if (action === "listen") {
      if (speaking) stopSpeech();
      else void speakText(text);
    } else if (action === "translate") {
      const hasArmenian = /[\u0530-\u058F]/.test(text);
      const prompt = hasArmenian
        ? `Թարգմանիր սա բնական անգլերենով՝ «${text.slice(0, 300)}»`
        : `Թարգմանիր սա գեղեցիկ և բնական հայերենով՝ «${text.slice(0, 300)}»`;
      ws.preferences({ mode: "translation" });
      void send(prompt);
    } else if (action === "simpler") {
      void send(`Խնդրում եմ այս պատասխանը բացատրիր ավելի պարզ, հասկանալի և հակիրճ՝ «${text.slice(0, 250)}»`);
    } else if (action === "deeper") {
      ws.preferences({ depth: "deep" });
      void send(`Խորացրու նախորդ վերլուծությունը CLI հրամաններով, անվտանգային ռիսկերով և ստուգման թեստերով։`);
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
      void saveVocabularyItem(newItem);
      setVocabulary([newItem, ...vocabulary]);
      setVocabOpen(true);
    }
  }

  function resetSession() {
    ws.create(undefined, selectedModelId);
    setDraft("");
    stopSpeech();
  }

  const localModels = models.filter((m) => m.engine === "local");
  const ollamaModels = models.filter((m) => m.engine === "ollama");
  const cloudModels = models.filter((m) => m.engine === "openai");

  return (
    <div className="ai-command-layout">
      <AmbientBackground />

      {/* Desktop Engineering Command Rail */}
      <aside className="command-rail" aria-label="Զրույցների և էկոհամակարգի վահանակ">
        <div className="rail-head">
          <a href="https://royalarm.uk" className="brand-section">
            <div className="brand-sparkle-badge" aria-hidden="true">
              <Sparkles size={17} />
            </div>
            <div className="brand-title-wrap">
              <span className="brand-title">
                RoyalArm <span className="text-cyan-400">AI</span>
              </span>
              <span className="brand-subtitle">Սիփանի Ինժեներական Միջուկ</span>
            </div>
          </a>

          <div className="rail-telemetry-grid">
            <div className="rail-telemetry-chip">
              <span className="telemetry-dot online" />
              <span>Local Mind v3</span>
            </div>
            <div className="rail-telemetry-chip">
              <span className={`telemetry-dot ${engineStatus?.ollamaReachable ? "online" : "standby"}`} />
              <span>{engineStatus?.ollamaReachable ? "Ollama Live" : "Ollama Standby"}</span>
            </div>
          </div>

          <button
            className="new-chat-dock-btn mt-2"
            onClick={resetSession}
            aria-label="New conversation"
            title="New conversation (Նոր զրույց)"
          >
            <Plus size={15} />
            <span>New conversation</span>
          </button>
        </div>

        <div className="rail-section-label">Վերջին զրույցներ</div>
        <div className="rail-history-list">
          {ws.conversations.map((conv) => {
            const isActive = conv.id === ws.activeId;
            const isConfirming = railConfirmDeleteId === conv.id;
            return (
              <div
                key={conv.id}
                className={`rail-history-item ${isActive ? "is-active" : ""}`}
                onClick={() => {
                  stopSpeech();
                  ws.select(conv.id);
                  setDraft("");
                }}
              >
                <MessageSquare size={14} className="text-cyan-400/75 shrink-0" />
                <span className="rail-history-title">{conv.title || "Նոր զրույց"}</span>
                {isConfirming ? (
                  <button
                    type="button"
                    className="rail-confirm-delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      void ws.remove(conv.id);
                      setRailConfirmDeleteId(null);
                    }}
                  >
                    Ջնջել
                  </button>
                ) : (
                  <button
                    type="button"
                    className="rail-delete-btn"
                    aria-label={`Delete ${conv.title}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setRailConfirmDeleteId(conv.id);
                    }}
                  >
                    <Trash2 size={12} />
                  </button>
                )}
              </div>
            );
          })}
        </div>

        <div className="rail-footer">
          <div className="rail-nav-links">
            <Link href={aiHref("/models")} className="rail-nav-link">
              <Cpu size={14} /> <span>Մոդելներ</span>
            </Link>
            <Link href={aiHref("/templates")} className="rail-nav-link">
              <Brain size={14} /> <span>Շաբլոններ</span>
            </Link>
            <Link href={aiHref("/plans")} className="rail-nav-link">
              <Zap size={14} /> <span>Պլաններ</span>
            </Link>
            <a href="https://shop.royalarm.uk" className="rail-nav-link text-cyan-300">
              <ShoppingBag size={14} /> <span>Store</span>
            </a>
          </div>
          <div className="rail-eco-links">
            <a href="https://royalarm.uk">royalarm.uk</a>
            <span>·</span>
            <a href="https://it.royalarm.uk">it.royalarm.uk</a>
          </div>
        </div>
      </aside>

      {/* Main Command Canvas */}
      <div className="futuristic-container ai-command-main">
        {/* Top Navigation Bar */}
        <header className="top-nav-bar">
          <div className="flex items-center gap-2.5 min-w-0">
            <button
              type="button"
              className="nav-action-pill drawer-trigger-btn"
              onClick={() => setHistoryOpen(true)}
              aria-label="Open navigation"
              title="Բացել պատմությունը և նավարկումը"
            >
              <PanelLeft size={16} />
              <span className="hidden md:inline">Պատմություն</span>
            </button>

            {/* Visible Grouped Model Selector */}
            {models.length > 0 && (
              <label className="model-selector command-model-picker">
                <Cpu size={14} className="text-cyan-400 shrink-0 hidden sm:inline" />
                <select
                  aria-label="AI model"
                  value={selectedModelId}
                  disabled={ws.busy}
                  onChange={(event) => ws.setModel(event.target.value)}
                >
                  {localModels.length > 0 && (
                    <optgroup label="Arm Local Mind (Լոկալ 100%)">
                      {localModels.map((model) => (
                        <option key={`local:${model.id}`} value={model.id} disabled={!model.selectable}>
                          {model.displayName}
                        </option>
                      ))}
                    </optgroup>
                  )}
                  {ollamaModels.length > 0 && (
                    <optgroup label="Ollama Local Daemon">
                      {ollamaModels.map((model) => (
                        <option key={`ollama:${model.id}`} value={model.id} disabled={!model.selectable}>
                          {model.displayName}
                          {!model.selectable ? " (Unavailable)" : ""}
                        </option>
                      ))}
                    </optgroup>
                  )}
                  {cloudModels.length > 0 && (
                    <optgroup label="Cloud & Open-Source API">
                      {cloudModels.map((model) => (
                        <option key={`cloud:${model.id}`} value={model.id} disabled={!model.selectable}>
                          {model.displayName}
                          {!model.selectable
                            ? model.availability === "plan-locked"
                              ? " (Pro plan required)"
                              : " (API key needed)"
                            : ""}
                        </option>
                      ))}
                    </optgroup>
                  )}
                </select>
              </label>
            )}
          </div>

          {/* Mode Switcher */}
          <div className="mode-switch-segmented" role="tablist">
            <button
              className={`mode-tab-btn ${ws.prefs.mode === "general" ? "active" : ""}`}
              onClick={() => ws.preferences({ mode: "general" })}
              role="tab"
              aria-selected={ws.prefs.mode === "general"}
            >
              <MessageCircle size={14} />
              <span>Ինժեներ / Զրույց</span>
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

          {/* Right Quick Actions */}
          <div className="top-actions-row">
            <span className="active-plan-chip hidden sm:inline-flex">
              {selectedModel?.engine === "local"
                ? "LOCAL"
                : selectedModel?.engine === "ollama"
                ? "OLLAMA"
                : activePlan.toUpperCase()}
            </span>

            <button
              className="nav-action-pill"
              onClick={() => setVocabOpen(true)}
              aria-label="Բառապաշար և առաջընթաց"
              title="Բառապաշար և առաջընթաց"
            >
              <BookOpen size={14} />
              <span className="hidden lg:inline">Բառապաշար</span>
              <span className="count-badge">{vocabulary.length}</span>
            </button>

            <Link className="nav-action-pill hidden md:inline-flex" href={aiHref("/models")} title="Մոդելների կատալոգ">
              <Cpu size={14} />
              <span className="hidden xl:inline">Մոդելներ</span>
            </Link>

            <button
              className="nav-action-pill"
              onClick={resetSession}
              title="Սկսել նոր զրույց"
              aria-label="Նոր զրույց"
            >
              <RotateCcw size={14} />
            </button>
          </div>
        </header>

        {/* Tailored Thinking Profile & Depth Telemetry Bar */}
        <div className="persona-telemetry-bar">
          <div className="persona-pills" role="group" aria-label="Մտածողության պրոֆիլ (Thinking Profile)">
            <span className="persona-bar-label">
              <Brain size={13} className="text-cyan-400" />
              <span>Մտածողություն․</span>
            </span>
            {THINKING_PROFILES.map((profile) => {
              const active = (ws.prefs.persona ?? "architect") === profile.id;
              return (
                <button
                  key={profile.id}
                  type="button"
                  className={`persona-pill ${active ? "active" : ""}`}
                  title={profile.hintHy}
                  onClick={() => ws.preferences({ persona: profile.id })}
                >
                  {profile.labelHy}
                </button>
              );
            })}
          </div>

          <div className="depth-toggle-group" role="group" aria-label="Վերլուծության խորություն">
            <button
              type="button"
              className={`depth-btn ${ws.prefs.depth === "fast" ? "active" : ""}`}
              onClick={() => ws.preferences({ depth: "fast" })}
            >
              Արագ
            </button>
            <button
              type="button"
              className={`depth-btn ${(ws.prefs.depth ?? "deep") === "deep" ? "active" : ""}`}
              onClick={() => ws.preferences({ depth: "deep" })}
            >
              Խորը վերլուծություն
            </button>
          </div>
        </div>

        {/* Main Center Stage */}
        <main className="ai-orb-stage">
          {/* Welcome Showcase Card + Orb (expanded when starting fresh, compact when chatting) */}
          <div className={`chat-intro command-hero ${nonGreeting.length > 0 ? "is-compact" : ""}`}>
            <div className="command-hero-copy">
              <div className="hero-engine-badge">
                <span className="telemetry-dot online" />
                <span>
                  {selectedModel?.displayName || "Arm Local Core"} ·{" "}
                  {THINKING_PROFILES.find((p) => p.id === (ws.prefs.persona ?? "architect"))?.hintHy}
                </span>
              </div>
              <h1>
                {ws.prefs.mode === "practice"
                  ? "Անգլերենի փորձասենյակ"
                  : ws.prefs.mode === "translation"
                  ? "Երկլեզու թարգմանիչ"
                  : nonGreeting.length === 0
                  ? "Ինչո՞վ օգնեմ այսօր, Սիփան։"
                  : "RoyalArm AI Աշխատասեղան"}
              </h1>
              <p>
                {selectedModel?.taglineHy ||
                  "Լոկալ ինժեներական մտածողություն՝ FortiGate, MikroTik, Proxmox, AD, CCTV, Delphi և RoyalArm Store կատալոգի համար։"}
              </p>
            </div>
            <AiOrb state={orbState} micVolume={micVolume} onOrbClick={handleOrbClick} />
          </div>

          {/* Sipan Engineering Quick Launch Cards (shown before first question) */}
          {nonGreeting.length === 0 && (
            <section className="quick-starters-grid" aria-label="Արագ ինժեներական մեկնարկներ">
              {QUICK_STARTERS.map((starter) => (
                <button
                  key={starter.title}
                  type="button"
                  className="starter-card"
                  onClick={() => void send(starter.prompt)}
                  disabled={ws.busy}
                >
                  <div className="starter-card-top">
                    <span className="starter-icon">
                      {starter.icon === "network" && <Network size={15} />}
                      {starter.icon === "shield" && <ShieldCheck size={15} />}
                      {starter.icon === "terminal" && <Terminal size={15} />}
                      {starter.icon === "server" && <Server size={15} />}
                      {starter.icon === "cpu" && <Cpu size={15} />}
                      {starter.icon === "shop" && <ShoppingBag size={15} />}
                    </span>
                    <span className="starter-meta">{starter.meta}</span>
                  </div>
                  <strong>{starter.title}</strong>
                </button>
              ))}
            </section>
          )}

          {/* Earlier Multi-Turn Thread (keeps active turn .markdown/.user-content unique) */}
          {previousMessages.length > 0 && (
            <div className="thread-history-list">
              {previousMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`thread-turn-card ${msg.role === "user" ? "from-user" : "from-assistant"}`}
                >
                  <span className="thread-turn-author">
                    {msg.role === "user" ? "Դու" : "RoyalArm AI"}
                  </span>
                  {msg.role === "user" ? (
                    <p className="thread-turn-user">{msg.content}</p>
                  ) : (
                    <MessageMarkdown content={msg.content} className="thread-markdown" />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Active Conversation Focus Area */}
          <div className="conversation-focus-area mt-3">
            {currentQuestion && (
              <div className="current-question-card animate-fadeIn">
                <span className="question-chip-label">Հարցում</span>
                <p className="question-text user-content">{currentQuestion.content}</p>
              </div>
            )}

            <div className="current-response-card">
              <div className="response-card-header">
                <div className="response-author-tag">
                  <Sparkles size={14} />
                  <span>
                    RoyalArm AI · {lastAssistant.engine === "local" || (!lastAssistant.engine && selectedModel?.engine === "local")
                      ? "Լոկալ Միտք"
                      : lastAssistant.engine === "ollama"
                      ? "Ollama"
                      : lastAssistant.engine === "local-fallback"
                      ? "Local Fallback"
                      : ws.prefs.mode === "practice"
                      ? "Անգլերեն"
                      : ws.prefs.mode === "translation"
                      ? "Թարգմանություն"
                      : "Ինժեներ"}
                  </span>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    className="listen-reply"
                    disabled={ws.busy || !lastAssistant.content}
                    onClick={() => handleChipAction("listen")}
                    aria-pressed={speaking}
                  >
                    {speaking ? <Square size={14} /> : <Volume2 size={15} />}
                    {speaking ? "Կանգնեցնել ձայնը" : "Լսել պատասխանը"}
                  </button>

                  <button
                    type="button"
                    className="action-chip"
                    onClick={() => void copyLastReply()}
                    title="Պատճենել ամբողջ պատասխանը"
                  >
                    {copiedReply ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                    <span>{copiedReply ? "Պատճենված է" : "Պատճենել"}</span>
                  </button>

                  {messages.length > 2 && (
                    <button
                      className="action-chip transcript-link-chip"
                      onClick={() => setTranscriptOpen(true)}
                      aria-label="Դիտել ամբողջական պատմությունը"
                    >
                      <FileText size={13} />
                      <span>Պատմություն ({messages.length})</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Local / Chain-of-Thought Reasoning Trace Accordion */}
              {lastAssistant.reasoning && (
                <div className="reasoning-trace-box">
                  <button
                    type="button"
                    className="reasoning-trace-toggle"
                    onClick={() => setReasoningExpanded((v) => !v)}
                    aria-expanded={reasoningExpanded}
                  >
                    <span className="flex items-center gap-2">
                      <Brain size={14} className="text-cyan-400" />
                      <span>Մտածողության ընթացքը · Reasoning Trace</span>
                    </span>
                    {reasoningExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                  </button>
                  {reasoningExpanded && (
                    <div className="reasoning-trace-body">
                      <MessageMarkdown content={lastAssistant.reasoning} className="reasoning-markdown" />
                    </div>
                  )}
                </div>
              )}

              {voiceError && (
                <p className="voice-feedback" role="status">
                  {voiceError}
                </p>
              )}

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

                {(lastAssistant.status === "error" || lastAssistant.status === "interrupted") && (
                  <div className="message-error flex items-center justify-between gap-3 p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-200 text-xs sm:text-sm mt-3">
                    <span>
                      {lastAssistant.status === "interrupted"
                        ? lastAssistant.error || "This reply was interrupted. You can retry it."
                        : lastAssistant.error || "The connection ended before the reply finished. Try again."}
                    </span>
                    <button
                      className="retry-btn px-3 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs font-medium transition-colors"
                      onClick={() => void send("", true)}
                      aria-label="Retry reply"
                    >
                      Retry reply
                    </button>
                  </div>
                )}
              </div>

              {/* Compact Action Chips */}
              <div className="action-chips-container">
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

                {currentQuestion && (
                  <button
                    className="action-chip"
                    onClick={() => handleChipAction("deeper")}
                    title="Ավելացնել CLI, ստուգումներ և անվտանգային ռիսկեր"
                  >
                    <Terminal size={13} className="text-emerald-400" />
                    <span>Ավելի խորը տեխնիկական</span>
                  </button>
                )}

                {currentQuestion && lastAssistant.status === "complete" && (
                  <button
                    className="action-chip"
                    disabled={ws.busy || isListening}
                    onClick={() => {
                      const prefix = draft.trim()
                        ? draft.trimEnd() + " "
                        : "Նախորդ պատասխանում խնդրում եմ ուղղել հետևյալը․ ";
                      textareaRef.current?.focus();
                      void startMicrophone(prefix);
                    }}
                  >
                    <Mic size={13} />
                    <span>Ձայնով ուղղում</span>
                  </button>
                )}

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

        {/* Bottom Floating Control Dock */}
        <footer className="floating-dock-wrapper">
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
            <button
              className={`dock-mic-btn ${isListening ? "active-listening" : ""}`}
              onClick={toggleMicrophone}
              aria-label={isListening ? "Անջատել խոսափողը" : "Միացնել խոսափողը (Microphone)"}
              title={isListening ? "Անջատել խոսափողը" : "Խոսեք RoyalArm AI-ի հետ"}
            >
              <Mic size={19} />
            </button>

            <textarea
              ref={textareaRef}
              className="dock-text-input"
              placeholder={
                ws.prefs.mode === "practice"
                  ? "Practice English or ask in Armenian..."
                  : ws.prefs.mode === "translation"
                  ? "Գրեք տեքստը թարգմանության համար..."
                  : "Գրեք հարցը, IP/CIDR (օր. 192.168.10.0/24), FortiGate/MikroTik կամ ծրագրի անուն..."
              }
              aria-label="Message RoyalArm AI"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
              disabled={ws.busy}
            />

            <div className="dock-controls-group">
              <button
                className={`dock-icon-btn ${speakerEnabled ? "text-cyan-300" : "text-slate-500"}`}
                onClick={toggleSpeaker}
                title={
                  speakerEnabled
                    ? "Անջատել պատասխանների ավտոմատ ընթերցումը"
                    : "Ավտոմատ կարդալ պատասխանները"
                }
                aria-pressed={speakerEnabled}
                aria-label="Ավտոմատ կարդալ պատասխանները"
              >
                {speakerEnabled ? <Volume2 size={17} /> : <VolumeX size={17} />}
              </button>

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
                  onClick={resetSession}
                  aria-label="Restart conversation"
                  title="Նոր զրույց"
                >
                  <RotateCcw size={16} />
                </button>
              )}

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

          <div className="dock-footer-links">
            <a href="https://royalarm.uk" target="_blank" rel="noopener noreferrer">
              royalarm.uk
            </a>
            <span>•</span>
            <Link href={aiHref("/templates")}>Շաբլոններ</Link>
            <span>•</span>
            <Link href={aiHref("/models")}>Մոդելներ</Link>
            <span>•</span>
            <a
              href="https://youtube.com/@RoyalArm001"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1"
            >
              YouTube <ExternalLink size={10} />
            </a>
          </div>
        </footer>
      </div>

      {/* Drawers */}
      <HistoryDrawer
        isOpen={historyOpen}
        onClose={() => setHistoryOpen(false)}
        conversations={ws.conversations}
        activeId={ws.activeId}
        onSelectConversation={(id) => {
          stopSpeech();
          ws.select(id);
          setDraft("");
        }}
        onNewConversation={resetSession}
        onDeleteConversation={(id) => {
          void ws.remove(id);
        }}
      />

      <VocabularyPanel
        isOpen={vocabOpen}
        onClose={() => setVocabOpen(false)}
        items={vocabulary}
        onDeleteItem={(id) => {
          void deleteVocabularyItem(id);
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
          void saveVocabularyItem(item);
          setVocabulary([item, ...vocabulary]);
        }}
        totalConversations={ws.conversations.length}
        activeMode={ws.prefs.mode}
      />

      <TranscriptDrawer
        isOpen={transcriptOpen}
        onClose={() => setTranscriptOpen(false)}
        title={ws.active?.title || "Զրույց"}
        messages={messages}
      />
    </div>
  );
}
