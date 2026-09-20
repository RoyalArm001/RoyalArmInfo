"use client";

import { useEffect, useRef, useState } from "react";
import styles from "../app/app.module.css";
import SpecialistApplicationForm from "./SpecialistApplicationForm";

export default function SpecialistJoinModal() {
  const [open, setOpen] = useState(false);
  const closeButtonRef = useRef(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    function openModal() {
      setOpen(true);
    }

    window.addEventListener("royalarm:open-specialist-modal", openModal);
    return () => window.removeEventListener("royalarm:open-specialist-modal", openModal);
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
        className={styles.modalPanel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="specialist-modal-title"
      >
        <button
          ref={closeButtonRef}
          type="button"
          className={styles.modalClose}
          aria-label="Close specialist application"
          tabIndex={open ? 0 : -1}
          onClick={() => setOpen(false)}
        >
          <span aria-hidden="true">×</span>
        </button>

        <div className={styles.modalHeading}>
          <span className={styles.eyebrow}>For IT professionals</span>
          <h2 id="specialist-modal-title">Join the specialist network</h2>
          <p>
            Add your professional information and send it for review. Your profile appears in the
            Specialists section only after administrator approval.
          </p>
          <p className={styles.privacyNote}>
            Phone, email, and additional notes stay private in the protected admin panel.
          </p>
        </div>

        <SpecialistApplicationForm />
      </section>
    </div>
  );
}
