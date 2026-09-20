import styles from "../app/app.module.css";
import InstallAppButton from "./InstallAppButton";
import OpenSpecialistModalButton from "./OpenSpecialistModalButton";
import OpenRequestModalLink from "./OpenRequestModalLink";

const appDomain = "https://it.royalarm.uk";

const serviceCompanies = [
  {
    name: "Smart Tech LLC",
    url: "https://www.smarttechllc.am/",
    services: "Security systems, CCTV, structured networks, electrical work, automation, and smart systems.",
    tags: ["CCTV", "Networks", "Automation"],
  },
  {
    name: "IT Support LLC",
    url: "https://itsupport.am/",
    services: "Managed IT support, network maintenance, cybersecurity, cloud integration, backup, and recovery.",
    tags: ["IT support", "Cloud", "Security"],
  },
  {
    name: "GURU",
    url: "https://www.itguru.am/",
    services: "Computer support, server installation and maintenance, networks, VPN, Wi-Fi, and monitoring.",
    tags: ["Servers", "Networks", "Support"],
  },
  {
    name: "DOXX",
    url: "https://www.doxx.am/services/",
    services: "Managed business networks, Wi-Fi, firewalls, racks, and infrastructure support services.",
    tags: ["Managed IT", "Wi-Fi", "Infrastructure"],
  },
  {
    name: "Reset",
    url: "https://www.reset.am/",
    services: "Server and storage maintenance, networking, hardware support, IT consulting, and software services.",
    tags: ["Hardware", "Servers", "Consulting"],
  },
];

export const metadata = {
  applicationName: "RoyalArm IT",
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
  appleWebApp: {
    capable: true,
    title: "RoyalArm IT",
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: [
      { url: "/assets/royalarm-logo-32.png", sizes: "32x32", type: "image/png" },
      { url: "/assets/royalarm-logo-192.png", sizes: "192x192", type: "image/png" },
      { url: "/assets/royalarm-logo-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/assets/royalarm-logo-32.png",
    apple: [{ url: "/assets/royalarm-logo-180.png", sizes: "180x180", type: "image/png" }],
  },
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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section id="app-top" className={styles.hero} aria-labelledby="app-title">
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>IT specialist matching in Armenia</span>
            <h1 id="app-title">Find the right IT specialist for your work</h1>
            <p className={styles.lead}>
              Describe your task. RoyalArm IT reviews the request and helps connect you with a
              suitable specialist for remote or on-site work.
            </p>

            <div className={styles.actions}>
              <OpenRequestModalLink className={styles.primaryAction}>
                Request a specialist
              </OpenRequestModalLink>
              <OpenSpecialistModalButton className={styles.secondaryAction}>
                Join as a specialist
              </OpenSpecialistModalButton>
            </div>
            <InstallAppButton />
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

      <article className={styles.companyPost} aria-labelledby="it-companies-title">
        <header className={styles.companyPostHeader}>
          <div>
            <span className={styles.eyebrow}>IT directory post</span>
            <h2 id="it-companies-title">IT service companies in Armenia</h2>
          </div>
          <p>
            A short list of companies with relevant IT infrastructure, support, network, server,
            or security-system services. Check the official website before ordering.
          </p>
        </header>

        <div className={styles.companyGrid}>
          {serviceCompanies.map((company, index) => (
            <section className={styles.companyCard} key={company.name}>
              <div className={styles.companyCardTop}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{company.name}</h3>
              </div>
              <p>{company.services}</p>
              <div className={styles.companyTags} aria-label={`${company.name} service areas`}>
                {company.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
              <a href={company.url} target="_blank" rel="noopener noreferrer">
                Visit official website <span aria-hidden="true">↗</span>
              </a>
            </section>
          ))}
        </div>

        <p className={styles.companyDisclaimer}>
          Independent informational list. Inclusion does not imply a RoyalArm partnership or endorsement.
        </p>
      </article>
    </>
  );
}
