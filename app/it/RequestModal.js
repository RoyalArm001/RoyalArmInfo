"use client";

import { useEffect, useRef, useState } from "react";
import styles from "../app/app.module.css";
import AppRequestForm from "../app/AppRequestForm";

export default function RequestModal() {
  const [open, setOpen] = useState(false);
  const closeButtonRef = useRef(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    function openModal() {
      setOpen(true);
    }

    window.addEventListener("royalarm:open-request-modal", openModal);
    return () => window.removeEventListener("royalarm:open-request-modal", openModal);
  }, []);

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }

      if (event.key !== "Tab") return;
      const focusable = dialogRef.current?.querySelectorAll(
        'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href]',
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [open]);

  return (
    <div
      className={`${styles.modalOverlay} ${open ? styles.modalOverlayOpen : ""}`}
      aria-hidden={!open}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) setOpen(false);
      }}
    >
      <section
        ref={dialogRef}
        className={`${styles.modalPanel} ${styles.requestModalPanel}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="request-modal-title"
      >
        <button
          ref={closeButtonRef}
          type="button"
          className={styles.modalClose}
          aria-label="Close employer request"
          tabIndex={open ? 0 : -1}
          onClick={() => setOpen(false)}
        >
          <span aria-hidden="true">×</span>
        </button>

        <div className={styles.modalHeading}>
          <span className={styles.eyebrow}>IT work request</span>
          <h2 id="request-modal-title">Tell us what specialist you need</h2>
          <p>Answer the short questionnaire. Your request goes directly to the protected admin panel.</p>
        </div>

        <AppRequestForm />
      </section>
    </div>
  );
}
