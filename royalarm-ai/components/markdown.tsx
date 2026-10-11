"use client";

import { Children, isValidElement, useRef, useState, type ReactNode } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Check, Copy } from "lucide-react";

export function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [status, setStatus] = useState("");
  async function copy() {
    try { await navigator.clipboard.writeText(text); setStatus("Copied"); }
    catch { setStatus("Copy unavailable"); }
    setTimeout(() => setStatus(""), 2000);
  }
  return <button className="copy-button" onClick={copy} aria-label={label} title={label}>
    {status === "Copied" ? <Check size={13} /> : <Copy size={13} />}<span aria-live="polite">{status || label}</span>
  </button>;
}

function CodeBlock({ children }: { children?: ReactNode }) {
  const ref = useRef<HTMLPreElement>(null);
  const child = Children.toArray(children)[0];
  const className = isValidElement<{ className?: string }>(child) ? child.props.className ?? "" : "";
  const language = /language-([\w+-]+)/.exec(className)?.[1] ?? "code";
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);
  async function copy() {
    try { await navigator.clipboard.writeText(ref.current?.textContent ?? ""); setCopied(true); }
    catch { setFailed(true); }
    setTimeout(() => { setCopied(false); setFailed(false); }, 2000);
  }
  return <div className="code-block"><div className="code-toolbar"><span>{language}</span>
    <button onClick={copy} className="copy-button" aria-label="Copy code"><Copy size={13} /><span aria-live="polite">{failed ? "Copy unavailable" : copied ? "Copied" : "Copy code"}</span></button>
  </div><pre ref={ref}>{children}</pre></div>;
}

export function MessageMarkdown({ content }: { content: string }) {
  return <div className="markdown" dir="auto"><Markdown remarkPlugins={[remarkGfm]} skipHtml components={{
    pre: ({ children }) => <CodeBlock>{children}</CodeBlock>,
    a: ({ href, children }) =>
      href && !href.toLowerCase().startsWith("javascript:") ? (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      ) : (
        <span>{children}</span>
      ),
    // No remote images: text-only replies cannot trigger tracking requests.
    img: ({ alt }) => <span>{alt ? `[Image: ${alt}]` : "[Image]"}</span>,
  }}>{content}</Markdown></div>;
}
