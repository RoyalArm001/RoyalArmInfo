"use client";

export default function SoftwareImage({ src, alt = "", ...props }) {
  return <img {...props} src={src || "/assets/LogoArm.png"} alt={alt} onError={(event) => {
    const image = event.currentTarget;
    if (!image.src.endsWith("/assets/LogoArm.png")) image.src = "/assets/LogoArm.png";
  }} />;
}
