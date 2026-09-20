"use client";

import { useRef, useState } from "react";
import styles from "./app.module.css";

const stepFields = [
  ["name", "phone", "email", "contactMethod"],
  ["service", "details", "workFormat", "location"],
  ["urgency", "preferredDate", "budget"],
];

export default function AppRequestForm() {
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef(null);

  function validateStep() {
    const form = formRef.current;
    if (!form) return false;

    for (const name of stepFields[step]) {
      const field = form.elements.namedItem(name);
      if (field && !field.checkValidity()) {
        field.reportValidity();
        field.focus();
        return false;
      }
    }
    return true;
  }

  function nextStep() {
    if (!validateStep()) return;
    setStatus({ type: "idle", message: "" });
    setStep((current) => Math.min(current + 1, 2));
  }

  async function submitRequest(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!validateStep() || !form.reportValidity() || submitting) return;

    setSubmitting(true);
    setStatus({ type: "pending", message: "Sending your request…" });

    const data = Object.fromEntries(new FormData(form).entries());
    const schedule = [
      `Urgency: ${data.urgency}`,
      `Preferred date: ${data.preferredDate || "Not specified"}`,
      `Budget: ${data.budget || "Not specified"}`,
      data.email ? `Email: ${data.email}` : "",
    ].filter(Boolean).join("\n");

    const payload = {
      ...data,
      requestType: "Employer request",
      details: `${data.details}\n\n${schedule}`,
    };

    try {
      const response = await fetch("/api/requests", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (!response.ok) throw new Error(result.error || "The request could not be sent.");

      form.reset();
      setStatus({
        type: "success",
        message: "Your request was sent. We will review it and contact you.",
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
    <form ref={formRef} className={`${styles.form} ${styles.questionnaireForm}`} onSubmit={submitRequest}>
      <div className={styles.formProgress} aria-label={`Step ${step + 1} of 3`}>
        {["Contact", "Task", "Timing"].map((label, index) => (
          <span className={index <= step ? styles.formProgressActive : ""} key={label}>
            <i>{index + 1}</i>{label}
          </span>
        ))}
      </div>

      <fieldset className={`${styles.formStep} ${step === 0 ? styles.formStepActive : ""}`}>
        <legend>How can we contact you?</legend>
        <label>
          Name or company
          <input name="name" autoComplete="name organization" maxLength="120" required />
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
          Preferred contact method
          <select name="contactMethod" defaultValue="Phone call" required>
            <option value="Phone call">Phone call</option>
            <option value="WhatsApp">WhatsApp</option>
            <option value="Telegram">Telegram</option>
            <option value="Email">Email</option>
          </select>
        </label>
      </fieldset>

      <fieldset className={`${styles.formStep} ${step === 1 ? styles.formStepActive : ""}`}>
        <legend>What work needs to be done?</legend>
        <label className={styles.fullField}>
          Required service or specialist
          <select name="service" defaultValue="" required>
            <option value="" disabled>Select the work type</option>
            <option value="IT support and device diagnostics">IT support and device diagnostics</option>
            <option value="Network installation or repair">Network installation or repair</option>
            <option value="Server, Proxmox, TrueNAS or Nextcloud">Server, Proxmox, TrueNAS or Nextcloud</option>
            <option value="CCTV, Hikvision or access control">CCTV, Hikvision or access control</option>
            <option value="Monitoring, Zabbix, Nagios or Netdata">Monitoring, Zabbix, Nagios or Netdata</option>
            <option value="Website or software development">Website or software development</option>
            <option value="Other IT work">Other IT work</option>
          </select>
        </label>
        <label className={styles.fullField}>
          Describe the task and expected result
          <textarea
            name="details"
            rows="5"
            maxLength="3000"
            placeholder="What is not working, what should be installed, or what result do you need?"
            required
          />
        </label>
        <label>
          Work format
          <select name="workFormat" defaultValue="" required>
            <option value="" disabled>Select work format</option>
            <option value="Remote">Remote</option>
            <option value="On-site">On-site</option>
            <option value="Remote or on-site">Remote or on-site</option>
          </select>
        </label>
        <label>
          Work location
          <input name="location" autoComplete="address-level2" maxLength="120" placeholder="City, region, or Remote" required />
        </label>
      </fieldset>

      <fieldset className={`${styles.formStep} ${step === 2 ? styles.formStepActive : ""}`}>
        <legend>When do you need the work?</legend>
        <label className={styles.fullField}>
          Urgency
          <select name="urgency" defaultValue="" required>
            <option value="" disabled>Select urgency</option>
            <option value="Emergency — service is stopped">Emergency — service is stopped</option>
            <option value="Within 24 hours">Within 24 hours</option>
            <option value="Within 2–3 days">Within 2–3 days</option>
            <option value="Planned work">Planned work</option>
          </select>
        </label>
        <label>
          Preferred date (optional)
          <input name="preferredDate" type="date" />
        </label>
        <label>
          Approximate budget (optional)
          <select name="budget" defaultValue="">
            <option value="">Not decided</option>
            <option value="Up to 30,000 AMD">Up to 30,000 AMD</option>
            <option value="30,000–100,000 AMD">30,000–100,000 AMD</option>
            <option value="100,000–300,000 AMD">100,000–300,000 AMD</option>
            <option value="300,000+ AMD">300,000+ AMD</option>
            <option value="Need an estimate">Need an estimate</option>
          </select>
        </label>
      </fieldset>

      <div className={styles.formNavigation}>
        {step > 0 ? (
          <button type="button" className={styles.formBackButton} onClick={() => setStep((current) => current - 1)}>
            Back
          </button>
        ) : <span />}
        {step < 2 ? (
          <button type="button" className={styles.formNextButton} onClick={nextStep}>
            Continue <span aria-hidden="true">→</span>
          </button>
        ) : (
          <button className={styles.formNextButton} type="submit" disabled={submitting}>
            {submitting ? "Sending…" : "Send request"}
          </button>
        )}
      </div>

      <p className={`${styles.formStatus} ${status.type === "error" ? styles.error : ""}`} aria-live="polite">
        {status.message}
      </p>
    </form>
  );
}
