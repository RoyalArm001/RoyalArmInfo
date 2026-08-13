import styles from "../../app/app.module.css";
import ApprovedSpecialists from "../ApprovedSpecialists";

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
  title: "Approved IT Specialists in Armenia | RoyalArm IT",
  description: "Browse RoyalArm IT specialist areas and administrator-approved IT professionals in Armenia.",
  alternates: { canonical: "https://it.royalarm.uk/specialists" },
};

export default function SpecialistsPage() {
  return (
    <section id="specialists" className={styles.specialistsSection} aria-labelledby="specialists-title">
      <div className={styles.sectionHeading}>
        <span className={styles.eyebrow}>Specialist areas</span>
        <h1 id="specialists-title">Find a verified IT specialist</h1>
        <p>
          Review the available areas and administrator-approved profiles. Private contact data is
          never shown publicly.
        </p>
      </div>

      <div className={styles.specialistGrid}>
        {specialistAreas.map((area) => (
          <article className={styles.specialistCard} key={area.title}>
            <span className={styles.specialistIcon} aria-hidden="true">
              <i className={area.icon} />
            </span>
            <h2>{area.title}</h2>
            <p>{area.text}</p>
          </article>
        ))}
      </div>
      <ApprovedSpecialists />
    </section>
  );
}
