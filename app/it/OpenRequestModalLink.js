"use client";

export default function OpenRequestModalLink({ className, children }) {
  function openRequest(event) {
    event.preventDefault();
    window.dispatchEvent(new CustomEvent("royalarm:open-request-modal"));
  }

  return (
    <a href="#request" className={className} onClick={openRequest}>
      {children}
    </a>
  );
}
