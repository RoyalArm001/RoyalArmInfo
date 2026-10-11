import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RoyalArm AI — Your personal AI space",
  description: "Private personal AI chat by RoyalArm.",
  robots: { index: false, follow: false },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#080f1e" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body><div className="ai-root">{children}</div></body></html>;
}
