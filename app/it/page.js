import AppRequestForm from "../app/AppRequestForm";
import styles from "../app/app.module.css";
import ItAppNav from "./ItAppNav";
import SpecialistApplicationForm from "./SpecialistApplicationForm";

const appDomain = "https://it.royalarm.uk";

const specialistAreas = [
  {
    icon: "fas fa-headset",
    title: "IT support",
    text: "Remote diagnostics, computers, operating systems, and day-to-day technical support.",
  },
  {
    icon: "fas fa-network-wired",
    title: "Networks and servers",
    text: "Network engineers, system administrators, Proxmox, TrueNAS, Nextcloud, and monitoring.",
  },
  {
    icon: "fas fa-video",
    title: "CCTV and security",
    text: "Hikvision cameras, NVR/DVR, access systems, installation, and maintenance specialists.",
  },
  {
    icon: "fas fa-code",
    title: "Web and software",
    text: "Websites, business tools, integrations, automation, and custom software development.",
  },
];

export const metadata = {
  title: "Find an IT Specialist in Armenia | RoyalArm IT",
  description:
    "Send your IT task to RoyalArm IT and get matched with a suitable support, network, server, CCTV, web, or software specialist in Armenia.",
  keywords: [
    "find IT specialist Armenia",
    "IT contractor Armenia",
    "network engineer Armenia",
    "system administrator Armenia",
    "IT jobs Armenia",
    "RoyalArm IT",
    "Sipan Danielyan",
    "ՏՏ մասնագետ Հայաստան",
  ],
  alternates: { canonical: appDomain },
  openGraph: {
    title: "RoyalArm IT | Find the Right IT Specialist",
    description:
      "Describe the work and receive a suitable IT specialist recommendation for remote or on-site work in Armenia.",
    url: appDomain,
    type: "website",
  },
};

export default function AppLandingPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "RoyalArm IT",
    description:
      "An intermediary web application connecting employers and customers with suitable IT specialists in Armenia.",
    url: appDomain,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires a modern web browser",
    featureList: [
      "Submit an employer IT request",
      "Apply as an IT specialist",
      "Match remote and on-site IT work with relevant specialists",
      "Manage both application types in the RoyalArm admin panel",
    ],
    author: {
      "@type": "Person",
      "@id": "https://royalarm.store/#person",
      name: "Sipan Danielyan",
      jobTitle: "IT Programmer and Network Engineer",
    },
  };

  return (
    <main id="main-content" className={`royalarm-it-app ${styles.page}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className={styles.shell}>
        <ItAppNav />

        <section id="app-top" className={styles.hero} aria-labelledby="app-title">
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>IT specialist matching in Armenia</span>
            <h1 id="app-title">Find the right IT specialist for your work</h1>
            <p className={styles.lead}>
              Describe your task. RoyalArm IT reviews the request and helps connect you with a
              suitable specialist for remote or on-site work.
            </p>

            <div className={styles.actions}>
              <a className={styles.primaryAction} href="#app-request">Request a specialist</a>
              <a className={styles.secondaryAction} href="#specialist-join">Join as a specialist</a>
            </div>
            <p className={styles.appAddress}>Official app domain: <strong>it.royalarm.uk</strong></p>
          </div>

          <div className={styles.appPreview} aria-label="RoyalArm IT matching process">
            <div className={styles.previewTopbar}>
              <span /><span /><span />
              <strong>ROYALARM / IT</strong>
            </div>
            <div className={styles.previewBody}>
              <span className={styles.online}><i /> Matching platform online</span>
              <p>One clear place for IT work requests and specialist applications.</p>
              <div className={styles.previewStats}>
                <span><strong>01</strong> Describe the task</span>
                <span><strong>02</strong> Request is reviewed</span>
                <span><strong>03</strong> Get a suitable specialist</span>
              </div>
            </div>
          </div>
        </section>

        <section id="app-benefits" className={styles.trustStrip} aria-label="Platform benefits">
          <div><strong>Relevant matching</strong><span>The specialist is selected according to the actual task.</span></div>
          <div><strong>Two-sided platform</strong><span>Employers send work; IT specialists submit their experience.</span></div>
          <div><strong>Across Armenia</strong><span>Remote and on-site opportunities are supported.</span></div>
        </section>

        <section id="specialists" className={styles.specialistsSection} aria-labelledby="specialists-title">
          <div className={styles.sectionHeading}>
            <span className={styles.eyebrow}>Specialist areas</span>
            <h2 id="specialists-title">Who can be matched to your task</h2>
            <p>
              Send the work requirements first. We review the scope and recommend a relevant
              specialist instead of showing unverified profiles.
            </p>
          </div>
          <div className={styles.specialistGrid}>
            {specialistAreas.map((area) => (
              <article className={styles.specialistCard} key={area.title}>
                <span className={styles.specialistIcon} aria-hidden="true">
                  <i className={area.icon} />
                </span>
                <h3>{area.title}</h3>
                <p>{area.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="app-request" className={styles.requestSection} aria-labelledby="request-title">
          <div className={styles.requestIntro}>
            <span className={styles.eyebrow}>For employers and customers</span>
            <h2 id="request-title">Request an IT specialist</h2>
            <p>
              Tell us what needs to be done, where the work is located, and the preferred format.
              Your request is saved in the employer section of the RoyalArm admin panel.
            </p>
            <a href="tel:+37491733633" className={styles.phoneLink}>+374 91 733633</a>
          </div>
          <AppRequestForm />
        </section>

        <section
          id="specialist-join"
          className={`${styles.requestSection} ${styles.specialistJoinSection}`}
          aria-labelledby="join-title"
        >
          <div className={styles.requestIntro}>
            <span className={styles.eyebrow}>For IT professionals</span>
            <h2 id="join-title">Join the specialist network</h2>
            <p>
              Share your specialization, experience, and preferred work format. Your application
              is kept separately and reviewed when a suitable request is received.
            </p>
            <p className={styles.privacyNote}>
              Your information is visible only in the protected RoyalArm admin panel.
            </p>
          </div>
          <SpecialistApplicationForm />
        </section>
      </div>
    </main>
  );
}
