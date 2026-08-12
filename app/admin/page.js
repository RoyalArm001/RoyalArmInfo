"use client";

import { useEffect, useState } from "react";
import styles from "./admin.module.css";

const tabs = [
  { id: "employers", label: "Գործատուների հայտեր", icon: "fas fa-briefcase" },
  { id: "specialists", label: "Մասնագետների դիմումներ", icon: "fas fa-user-tie" },
];

function formatDate(value) {
  try {
    return new Intl.DateTimeFormat("hy-AM", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(value));
  } catch {
    return value;
  }
}

function Field({ label, children, wide = false }) {
  if (!children) return null;
  return (
    <div className={wide ? styles.wideField : ""}>
      <dt>{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}

function EmployerCard({ item }) {
  return (
    <article className={styles.card}>
      <div className={styles.cardHeader}>
        <div>
          <p className={styles.cardType}>Գործատու / պատվիրատու</p>
          <h2>{item.name}</h2>
        </div>
        <span className={styles.newBadge}>Նոր հայտ</span>
      </div>
      <time dateTime={item.createdAt}>{formatDate(item.createdAt)}</time>
      <dl className={styles.details}>
        <Field label="Հեռախոս">
          <a href={`tel:${item.phone}`}>{item.phone}</a>
        </Field>
        <Field label="Քաղաք / մարզ">{item.location}</Field>
        <Field label="Պահանջվող մասնագետ">{item.service}</Field>
        <Field label="Աշխատանքի ձևաչափ">{item.workFormat}</Field>
        <Field label="Հայտի տեսակ">{item.requestType}</Field>
        <Field label="Կապի եղանակ">{item.contactMethod}</Field>
        <Field label="Աշխատանքի նկարագրություն" wide>
          <span className={styles.multiline}>{item.details}</span>
        </Field>
      </dl>
    </article>
  );
}

function SpecialistCard({ item }) {
  return (
    <article className={styles.card}>
      <div className={styles.cardHeader}>
        <div>
          <p className={styles.cardType}>ՏՏ մասնագետ</p>
          <h2>{item.name}</h2>
        </div>
        <span className={styles.specialistBadge}>Նոր դիմում</span>
      </div>
      <time dateTime={item.createdAt}>{formatDate(item.createdAt)}</time>
      <dl className={styles.details}>
        <Field label="Հեռախոս">
          <a href={`tel:${item.phone}`}>{item.phone}</a>
        </Field>
        <Field label="Էլ․ փոստ">
          {item.email ? <a href={`mailto:${item.email}`}>{item.email}</a> : null}
        </Field>
        <Field label="Քաղաք / մարզ">{item.location}</Field>
        <Field label="Մասնագիտացում">{item.specialty}</Field>
        <Field label="Փորձ">{item.experience}</Field>
        <Field label="Աշխատանքի ձևաչափ">{item.workFormat}</Field>
        <Field label="Հմտություններ" wide>
          <span className={styles.multiline}>{item.skills}</span>
        </Field>
        <Field label="Պորտֆոլիո / LinkedIn" wide>
          {item.portfolio ? (
            <a href={item.portfolio} target="_blank" rel="noreferrer">Բացել հղումը ↗</a>
          ) : null}
        </Field>
        <Field label="Լրացուցիչ տեղեկություն" wide>
          <span className={styles.multiline}>{item.details}</span>
        </Field>
      </dl>
    </article>
  );
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [employerRequests, setEmployerRequests] = useState(null);
  const [specialistApplications, setSpecialistApplications] = useState(null);
  const [activeTab, setActiveTab] = useState("employers");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const authenticated = employerRequests !== null && specialistApplications !== null;

  async function load() {
    setLoading(true);
    try {
      const [employerResponse, specialistResponse] = await Promise.all([
        fetch("/api/requests", { cache: "no-store" }),
        fetch("/api/specialist-applications", { cache: "no-store" }),
      ]);

      if (employerResponse.status === 401 || specialistResponse.status === 401) {
        setEmployerRequests(null);
        setSpecialistApplications(null);
        return;
      }

      if (!employerResponse.ok || !specialistResponse.ok) {
        throw new Error("Տվյալները հնարավոր չեղավ բեռնել։ Ստուգեք Upstash-ի կարգավորումները։");
      }

      const [employerData, specialistData] = await Promise.all([
        employerResponse.json(),
        specialistResponse.json(),
      ]);
      setEmployerRequests(employerData.requests);
      setSpecialistApplications(specialistData.applications);
      setMessage("");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Տվյալները հնարավոր չեղավ բեռնել։");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function login(event) {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const result = await response.json();
      if (!response.ok) {
        setMessage(result.error || "Սխալ գաղտնաբառ։");
        return;
      }
      setPassword("");
      setMessage("");
      await load();
    } catch {
      setMessage("Մուտքը ժամանակավորապես անհասանելի է։");
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setEmployerRequests(null);
    setSpecialistApplications(null);
    setMessage("");
  }

  if (!authenticated) {
    return (
      <main id="main-content" data-admin-page className={styles.loginPage}>
        <form onSubmit={login} className={styles.loginCard}>
          <span className={styles.adminLabel}>RoyalArm Admin</span>
          <h1>Մուտք ադմին պանել</h1>
          <p>Մուտք գործեք գործատուների հայտերը և մասնագետների դիմումները տեսնելու համար։</p>
          <label>
            <span>Գաղտնաբառ</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
            />
          </label>
          <button type="submit" disabled={loading}>
            {loading ? "Ստուգվում է…" : "Մուտք գործել"}
          </button>
          <p className={styles.message} aria-live="polite">{message}</p>
        </form>
      </main>
    );
  }

  const activeItems = activeTab === "employers" ? employerRequests : specialistApplications;

  return (
    <main id="main-content" data-admin-page className={styles.dashboard}>
      <div className={styles.dashboardInner}>
        <header className={styles.dashboardHeader}>
          <div>
            <span className={styles.adminLabel}>RoyalArm Admin</span>
            <h1>Միջնորդ հարթակի կառավարում</h1>
            <p>Գործատուների հայտերն ու մասնագետների դիմումները պահպանվում են առանձին։</p>
          </div>
          <div className={styles.headerActions}>
            <button type="button" className={styles.refreshButton} onClick={load} disabled={loading}>
              <i className="fas fa-sync-alt" aria-hidden="true" />
              {loading ? "Թարմացվում է…" : "Թարմացնել"}
            </button>
            <button type="button" className={styles.logoutButton} onClick={logout}>Դուրս գալ</button>
          </div>
        </header>

        <section className={styles.summaryGrid} aria-label="Հայտերի ամփոփում">
          <button
            type="button"
            className={`${styles.summaryCard} ${activeTab === "employers" ? styles.summaryCardActive : ""}`}
            onClick={() => setActiveTab("employers")}
          >
            <span className={styles.summaryIcon}><i className="fas fa-briefcase" aria-hidden="true" /></span>
            <span><small>Գործատուների հայտեր</small><strong>{employerRequests.length}</strong></span>
          </button>
          <button
            type="button"
            className={`${styles.summaryCard} ${activeTab === "specialists" ? styles.summaryCardActive : ""}`}
            onClick={() => setActiveTab("specialists")}
          >
            <span className={styles.summaryIcon}><i className="fas fa-user-tie" aria-hidden="true" /></span>
            <span><small>Մասնագետների դիմումներ</small><strong>{specialistApplications.length}</strong></span>
          </button>
        </section>

        <div className={styles.tabs} role="tablist" aria-label="Ադմին բաժիններ">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              id={`${tab.id}-tab`}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`${tab.id}-panel`}
              className={activeTab === tab.id ? styles.activeTab : ""}
              onClick={() => setActiveTab(tab.id)}
            >
              <i className={tab.icon} aria-hidden="true" />
              {tab.label}
              <span>{tab.id === "employers" ? employerRequests.length : specialistApplications.length}</span>
            </button>
          ))}
        </div>

        <section
          id={`${activeTab}-panel`}
          role="tabpanel"
          aria-labelledby={`${activeTab}-tab`}
          className={styles.panel}
        >
          <div className={styles.panelHeading}>
            <div>
              <h2>{activeTab === "employers" ? "Գործատուների հայտեր" : "Մասնագետների դիմումներ"}</h2>
              <p>
                {activeTab === "employers"
                  ? "Պահանջվող աշխատանքի և մասնագետի տվյալներ"
                  : "Մասնագիտացման, փորձի և հասանելիության տվյալներ"}
              </p>
            </div>
            <strong>{activeItems.length}</strong>
          </div>

          {message ? <p className={styles.dashboardMessage} aria-live="polite">{message}</p> : null}

          <div className={styles.cardGrid}>
            {activeItems.map((item) => (
              activeTab === "employers"
                ? <EmployerCard key={item.id} item={item} />
                : <SpecialistCard key={item.id} item={item} />
            ))}
          </div>

          {!activeItems.length ? (
            <div className={styles.emptyState}>
              <i className={activeTab === "employers" ? "fas fa-inbox" : "fas fa-user-plus"} aria-hidden="true" />
              <h3>{activeTab === "employers" ? "Գործատուների հայտեր դեռ չկան" : "Մասնագետների դիմումներ դեռ չկան"}</h3>
              <p>Նոր տվյալները կհայտնվեն այստեղ՝ համապատասխան ձևն ուղարկելուց հետո։</p>
            </div>
          ) : null}
        </section>
      </div>
    </main>
  );
}
