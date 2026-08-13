"use client";

import { useEffect, useState } from "react";
import styles from "../app/app.module.css";
import {
  enablePushNotifications,
  goToOfficialApp,
  isIosDevice,
  isOfficialAppHost,
  isStandalone,
  registerAppWorker,
} from "./pwa";

export default function PwaHeaderControls() {
  const [installEvent, setInstallEvent] = useState(null);
  const [standalone, setStandalone] = useState(false);
  const [ios, setIos] = useState(false);
  const [onOfficialHost, setOnOfficialHost] = useState(true);
  const [notifyState, setNotifyState] = useState("default");
  const [hint, setHint] = useState("");

  useEffect(() => {
    const official = isOfficialAppHost();
    setOnOfficialHost(official);
    setStandalone(isStandalone());
    setIos(isIosDevice());
    setNotifyState(window.Notification?.permission || "unsupported");
    registerAppWorker().catch(() => {});

    function captureInstallPrompt(event) {
      event.preventDefault();
      setInstallEvent(event);
      if (new URLSearchParams(window.location.search).has("install")) {
        event.prompt();
      }
    }

    function markInstalled() {
      setInstallEvent(null);
      setStandalone(true);
      enablePushNotifications()
        .then((state) => setNotifyState(state === "granted" ? "granted" : state))
        .catch(() => {});
    }

    window.addEventListener("beforeinstallprompt", captureInstallPrompt);
    window.addEventListener("appinstalled", markInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", captureInstallPrompt);
      window.removeEventListener("appinstalled", markInstalled);
    };
  }, []);

  useEffect(() => {
    if (!hint) return undefined;
    const timer = window.setTimeout(() => setHint(""), 4200);
    return () => window.clearTimeout(timer);
  }, [hint]);

  async function installApp() {
    if (!isOfficialAppHost()) {
      goToOfficialApp("/?install=1");
      return;
    }

    if (installEvent) {
      await installEvent.prompt();
      const choice = await installEvent.userChoice;
      setInstallEvent(null);
      if (choice.outcome === "accepted") {
        setStandalone(true);
        enablePushNotifications()
          .then((state) => setNotifyState(state === "granted" ? "granted" : state))
          .catch(() => {});
      }
      return;
    }

    if (ios) {
      setHint("Safari: Share → Add to Home Screen");
      return;
    }

    setHint("Open it.royalarm.uk, then Install app");
  }

  async function enableNotifications() {
    if (!isOfficialAppHost()) {
      goToOfficialApp("/?install=1");
      return;
    }

    if (ios && !standalone) {
      setHint("Install the app first, then enable notifications");
      return;
    }

    const state = await enablePushNotifications();
    setNotifyState(state === "granted" ? "granted" : state);
    if (state === "granted") setHint("Notifications are on");
    else if (state === "denied") setHint("Notifications are blocked in the browser");
    else if (state === "unsupported") setHint("This browser does not support notifications");
  }

  const showInstall = !standalone;

  return (
    <div className={styles.pwaControls}>
      {showInstall ? (
        <button
          type="button"
          className={styles.pwaButton}
          onClick={installApp}
          aria-label="Install app from it.royalarm.uk"
          title="Install it.royalarm.uk"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 3v10.2" />
            <path d="m8.2 10.4 3.8 3.8 3.8-3.8" />
            <path d="M6 16.5v2.2A1.3 1.3 0 0 0 7.3 20h9.4A1.3 1.3 0 0 0 18 18.7v-2.2" />
          </svg>
        </button>
      ) : null}

      <button
        type="button"
        className={`${styles.pwaButton} ${notifyState === "granted" ? styles.pwaButtonOn : ""}`}
        onClick={enableNotifications}
        aria-label={notifyState === "granted" ? "Notifications on" : "Enable notifications"}
        title={notifyState === "granted" ? "Notifications on" : "Enable notifications"}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6.8 16.6h10.4l-1.1-1.3V11a4.1 4.1 0 1 0-8.2 0v4.3Z" />
          <path d="M10.2 18.4a1.8 1.8 0 0 0 3.6 0" />
        </svg>
      </button>

      {hint ? <span className={styles.pwaHint}>{hint}</span> : null}
      {!onOfficialHost && showInstall ? (
        <span className={styles.srOnly}>Installs https://it.royalarm.uk</span>
      ) : null}
    </div>
  );
}
