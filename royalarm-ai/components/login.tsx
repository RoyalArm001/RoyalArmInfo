"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, LockKeyhole, LoaderCircle } from "lucide-react";
import { Brand } from "./brand";

export function Login({ onSuccess, expired = false }: { onSuccess: () => void; expired?: boolean }) {
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Sign-in failed. Please try again.");
      setPassword("");
      onSuccess();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Unable to connect. Try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="login-screen">
      <a className="login-home" href="https://royalarm.uk">
        RoyalArm<span className="text-cyan-300">.</span>
      </a>
      <section className="login-card">
        <Brand large />
        <p className="eyebrow">YOUR PERSONAL AI SPACE</p>
        <h1>
          Welcome to <span>RoyalArm AI</span>
        </h1>
        <p className="muted">A little clarity. A fresh idea. Your next step.</p>
        <div className="private-label">
          <LockKeyhole size={14} /> Private, single-user access
        </div>
        <form onSubmit={submit}>
          <label htmlFor="password">Your password</label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            autoFocus
            required
            maxLength={512}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your private password"
            disabled={busy}
          />
          {expired && (
            <p className="notice">
              Your session expired. Sign in to continue; your history is still on this device.
            </p>
          )}
          {error && (
            <p className="error-text" role="alert">
              {error}
            </p>
          )}
          <button type="submit" className="primary-button" disabled={busy || !password}>
            {busy ? (
              <LoaderCircle size={17} className="spin" />
            ) : (
              <>
                Enter your workspace <ArrowRight size={17} />
              </>
            )}
          </button>
        </form>
        <p className="privacy-note">
          History is stored on this device.
          <br />
          Messages are sent to OpenAI for replies.
        </p>
      </section>
      <footer className="login-footer">
        <a href="https://royalarm.uk">royalarm.uk</a>
        <span>•</span>
        <a href="https://youtube.com/@RoyalArm001" target="_blank" rel="noreferrer">
          YouTube ↗
        </a>
      </footer>
    </main>
  );
}
