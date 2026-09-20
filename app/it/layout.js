import styles from "../app/app.module.css";
import ItAppNav from "./ItAppNav";
import RequestModal from "./RequestModal";
import SpecialistJoinModal from "./SpecialistJoinModal";

const appOrigin = "https://it.royalarm.uk";

export const metadata = {
  metadataBase: new URL(appOrigin),
  applicationName: "RoyalArm IT",
  manifest: `${appOrigin}/manifest.webmanifest`,
  appleWebApp: {
    capable: true,
    title: "RoyalArm IT",
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: [
      { url: `${appOrigin}/assets/royalarm-logo-32.png`, sizes: "32x32", type: "image/png" },
      { url: `${appOrigin}/assets/royalarm-logo-192.png`, sizes: "192x192", type: "image/png" },
      { url: `${appOrigin}/assets/royalarm-logo-512.png`, sizes: "512x512", type: "image/png" },
    ],
    shortcut: `${appOrigin}/assets/royalarm-logo-32.png`,
    apple: [{ url: `${appOrigin}/assets/royalarm-logo-180.png`, sizes: "180x180", type: "image/png" }],
  },
};

export default function ItAppLayout({ children }) {
  return (
    <main id="main-content" className={`royalarm-it-app ${styles.page}`}>
      <div className={styles.animatedBackdrop} aria-hidden="true">
        <span className={`${styles.backdropOrb} ${styles.backdropOrbRed}`} />
        <span className={`${styles.backdropOrb} ${styles.backdropOrbCyan}`} />
        <span className={styles.backdropScanLine} />
      </div>

      <div className={styles.shell}>
        <ItAppNav />
        {children}
      </div>

      <SpecialistJoinModal />
      <RequestModal />
    </main>
  );
}
