"use client";

import { useState } from "react";
import styles from "../app/app.module.css";

export default function SpecialistApplicationForm() {
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [submitting, setSubmitting] = useState(false);

  async function submitApplication(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity() || submitting) return;

    setSubmitting(true);
    setStatus({ type: "pending", message: "Sending your application…" });

    try {
      const response = await fetch("/api/specialist-applications", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form).entries())),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "The application could not be sent.");
      }

      form.reset();
      setStatus({
        type: "success",
        message: "Your application was saved. We will contact you when a suitable opportunity appears.",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : "The application could not be sent.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={submitApplication}>
      <label>
        Full name
        <input name="name" autoComplete="name" maxLength="120" required />
      </label>
      <label>
        Phone number
        <input name="phone" type="tel" autoComplete="tel" maxLength="50" placeholder="+374…" required />
      </label>
      <label>
        Email (optional)
        <input name="email" type="email" autoComplete="email" maxLength="180" />
      </label>
      <label>
        City or region
        <input name="location" autoComplete="address-level2" maxLength="120" required />
      </label>
      <label>
        Main specialization
        <select name="specialty" defaultValue="" required>
          <option value="" disabled>Select a specialization</option>
          <option value="IT support specialist">IT support specialist</option>
          <option value="Network engineer">Network engineer</option>
          <option value="Server and system administrator">Server and system administrator</option>
          <option value="CCTV and Hikvision specialist">CCTV and Hikvision specialist</option>
          <option value="Web or software developer">Web or software developer</option>
          <option value="Other IT specialist">Other IT specialist</option>
        </select>
      </label>
      <label>
        Experience
        <select name="experience" defaultValue="" required>
          <option value="" disabled>Select experience</option>
          <option value="Less than 1 year">Less than 1 year</option>
          <option value="1–3 years">1–3 years</option>
          <option value="3–5 years">3–5 years</option>
          <option value="5+ years">5+ years</option>
        </select>
      </label>
      <label className={styles.fullField}>
        Preferred work format
        <select name="workFormat" defaultValue="" required>
          <option value="" disabled>Select work format</option>
          <option value="Remote">Remote</option>
          <option value="On-site">On-site</option>
          <option value="Remote and on-site">Remote and on-site</option>
        </select>
      </label>
      <label className={styles.fullField}>
        Skills and technologies
        <textarea
          name="skills"
          rows="4"
          maxLength="2000"
          placeholder="For example: Proxmox, MikroTik, Windows Server, Hikvision, React…"
          required
        />
      </label>
      <label className={styles.fullField}>
        Portfolio or LinkedIn (optional)
        <input name="portfolio" type="url" inputMode="url" maxLength="500" placeholder="https://…" />
      </label>
      <label className={styles.fullField}>
        Additional information (optional)
        <textarea name="details" rows="4" maxLength="3000" />
      </label>
      <button className={styles.submitButton} type="submit" disabled={submitting}>
        {submitting ? "Sending…" : "Send specialist application"}
      </button>
      <p
        className={`${styles.formStatus} ${status.type === "error" ? styles.error : ""}`}
        aria-live="polite"
      >
        {status.message}
      </p>
    </form>
  );
}
