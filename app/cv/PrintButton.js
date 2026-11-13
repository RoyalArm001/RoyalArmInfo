"use client";

export default function PrintButton({ children }) {
  return <button type="button" onClick={() => window.print()}>{children}</button>;
}
