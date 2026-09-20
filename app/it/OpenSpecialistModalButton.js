"use client";

export default function OpenSpecialistModalButton({ className, children }) {
  function openModal() {
    window.dispatchEvent(new CustomEvent("royalarm:open-specialist-modal"));
  }

  return (
    <button type="button" className={className} onClick={openModal}>
      {children}
    </button>
  );
}
