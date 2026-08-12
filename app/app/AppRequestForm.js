"use client";

import { useState } from "react";
import styles from "./app.module.css";

export default function AppRequestForm() {
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [submitting, setSubmitting] = useState(false);

  async function submitRequest(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity() || submitting) return;

    setSubmitting(true);
    setStatus({ type: "pending", message: "Sending your request…" });

    const data = Object.fromEntries(new FormData(form).entries());
    const payload = {
      ...data,
      requestType: "Employer request",
      service: data.specialty,
      contactMethod: "Phone or WhatsApp",
    };

    try {
      const response = await fetch("/api/requests", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "The request could not be sent.");
      }

      form.reset();
      setStatus({
        type: "success",
        message: "Your request was saved. We will contact you after reviewing the task.",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : "The request could not be sent.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={submitRequest}>
      <label>
        Name or company
        <input name="name" autoComplete="organization" maxLength="120" required />
      </label>
      <label>
        Phone number
        <input name="phone" type="tel" autoComplete="tel" maxLength="50" placeholder="+374…" required />
      </label>
      <label>
        City or region
        <input name="location" autoComplete="address-level2" maxLength="120" placeholder="For example: Yerevan" required />
      </label>
      <label>
        Work format
        <select name="workFormat" defaultValue="" required>
          <option value="" disabled>Select work format</option>
          <option value="Remote">Remote</option>
          <option value="On-site">On-site</option>
          <option value="Hybrid or not decided">Hybrid or not decided</option>
        </select>
      </label>
      <label className={styles.fullField}>
        What specialist do you need?
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
      <label className={styles.fullField}>
        Describe the work
        <textarea
          name="details"
          rows="5"
          maxLength="3000"
          placeholder="Describe the task, preferred deadline, and any important technical details…"
          required
        />
      </label>
      <button className={styles.submitButton} type="submit" disabled={submitting}>
        {submitting ? "Sending…" : "Send employer request"}
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
