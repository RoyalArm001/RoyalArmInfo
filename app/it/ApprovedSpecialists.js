"use client";

import { useEffect, useState } from "react";
import styles from "../app/app.module.css";

function initials(name) {
  return String(name || "IT")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export default function ApprovedSpecialists() {
  const [state, setState] = useState({ loading: true, specialists: [] });

  useEffect(() => {
    let active = true;

    fetch("/api/specialists", { cache: "no-store" })
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok) throw new Error(result.error);
        return result.specialists;
      })
      .then((specialists) => {
        if (active) setState({ loading: false, specialists });
      })
      .catch(() => {
        if (active) setState({ loading: false, specialists: [] });
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className={styles.approvedDirectory}>
      <div className={styles.directoryHeading}>
        <div>
          <span>ADMIN-VERIFIED DIRECTORY</span>
          <h3>Approved specialists</h3>
        </div>
        <strong>{state.loading ? "…" : state.specialists.length}</strong>
      </div>

      {state.loading ? (
        <p className={styles.directoryState}>Loading approved profiles…</p>
      ) : state.specialists.length ? (
        <div className={styles.approvedGrid}>
          {state.specialists.map((specialist) => (
            <article className={styles.approvedCard} key={specialist.id}>
              <div className={styles.profileTop}>
                <span className={styles.profileAvatar} aria-hidden="true">
                  {initials(specialist.name)}
                </span>
                <div>
                  <h4>{specialist.name}</h4>
                  <p>{specialist.specialty}</p>
                </div>
                <span className={styles.verifiedBadge} title="Approved by RoyalArm IT">
                  <i className="fas fa-check" aria-hidden="true" /> Verified
                </span>
              </div>
              <dl className={styles.profileFacts}>
                <div><dt>Location</dt><dd>{specialist.location}</dd></div>
                <div><dt>Experience</dt><dd>{specialist.experience}</dd></div>
                <div><dt>Work format</dt><dd>{specialist.workFormat}</dd></div>
              </dl>
              <p className={styles.profileSkills}>{specialist.skills}</p>
              {specialist.portfolio ? (
                <a href={specialist.portfolio} target="_blank" rel="noreferrer">
                  View professional profile <span aria-hidden="true">↗</span>
                </a>
              ) : null}
            </article>
          ))}
        </div>
      ) : (
        <div className={styles.directoryEmpty}>
          <i className="fas fa-user-shield" aria-hidden="true" />
          <div>
            <strong>Profiles are published after review</strong>
            <p>Approved IT specialists will appear here. Unverified applications remain private.</p>
          </div>
        </div>
      )}
    </div>
  );
}
