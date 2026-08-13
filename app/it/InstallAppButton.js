"use client";

import { useEffect, useState } from "react";
import styles from "../app/app.module.css";
import { enablePushNotifications, goToOfficialApp, isIosDevice, isOfficialAppHost, isStandalone, registerAppWorker } from "./pwa";

export default function InstallAppButton() {
  const [installEvent, setInstallEvent] = useState(null);
  const [isIOS, setIsIOS] = useState(false);
  const [installed, setInstalled] = useState(false);
  const [ready, setReady] = useState(false);
  const [onOfficialHost, setOnOfficialHost] = useState(true);
  const [showIOSHelp, setShowIOSHelp] = useState(false);

  useEffect(() => {
    setInstalled(isStandalone());
    setIsIOS(isIosDevice());
    setOnOfficialHost(isOfficialAppHost());
    setReady(true);
    registerAppWorker().catch(() => {});

    function captureInstallPrompt(event) {
      event.preventDefault();
      setInstallEvent(event);
    }

    function markInstalled() {
      setInstallEvent(null);
      setInstalled(true);
      enablePushNotifications().catch(() => {});
    }

    window.addEventListener("beforeinstallprompt", captureInstallPrompt);
    window.addEventListener("appinstalled", markInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", captureInstallPrompt);
      window.removeEventListener("appinstalled", markInstalled);
    };
  }, []);

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
        setInstalled(true);
        enablePushNotifications().catch(() => {});
      }
      return;
    }

    if (isIOS) {
      setShowIOSHelp((current) => !current);
    }
  }

  if (!ready || installed) return null;
  if (onOfficialHost && !installEvent && !isIOS) return null;

  return (
    <div className={styles.installBlock}>
      <button type="button" className={styles.installButton} onClick={installApp}>
        <i className="fas fa-mobile-alt" aria-hidden="true" />
        Install mobile web app
      </button>
      {isIOS && showIOSHelp ? (
        <p className={styles.iosInstallHelp} aria-live="polite">
          Safari: Share → Add to Home Screen
        </p>
      ) : null}
    </div>
  );
}
