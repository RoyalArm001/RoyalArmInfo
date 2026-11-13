"use client";

import { useEffect, useState } from "react";

export function buildAiHref(basePath: string, subpath: string) {
  if (!subpath || subpath === "/") return basePath || "/";
  if (subpath.startsWith("/?")) return `${basePath || ""}${subpath}`;
  const clean = subpath.startsWith("/") ? subpath : `/${subpath}`;
  return `${basePath}${clean}`;
}

export function useAiBasePath() {
  const [basePath, setBasePath] = useState("");

  useEffect(() => {
    if (window.location.pathname === "/ai" || window.location.pathname.startsWith("/ai/")) {
      const frame = window.requestAnimationFrame(() => setBasePath("/ai"));
      return () => window.cancelAnimationFrame(frame);
    }
  }, []);

  return (subpath: string) => buildAiHref(basePath, subpath);
}

