const appOrigin = "https://it.royalarm.uk";

export default function manifest() {
  return {
    id: `${appOrigin}/`,
    name: "RoyalArm IT",
    short_name: "RoyalArm IT",
    description:
      "A mobile web app connecting employers and customers with suitable IT specialists in Armenia.",
    start_url: `${appOrigin}/`,
    scope: `${appOrigin}/`,
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#020617",
    theme_color: "#2563eb",
    categories: ["business", "productivity", "utilities"],
    icons: [
      {
        src: `${appOrigin}/assets/royalarm-logo-192.png`,
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: `${appOrigin}/assets/royalarm-logo-512.png`,
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
