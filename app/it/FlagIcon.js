export function FlagIcon({ code, className }) {
  if (code === "hy") {
    return (
      <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
        <rect width="24" height="8" y="0" fill="#D90012" />
        <rect width="24" height="8" y="8" fill="#0033A0" />
        <rect width="24" height="8" y="16" fill="#F2A800" />
      </svg>
    );
  }

  if (code === "ru") {
    return (
      <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
        <rect width="24" height="8" y="0" fill="#FFFFFF" />
        <rect width="24" height="8" y="8" fill="#0039A6" />
        <rect width="24" height="8" y="16" fill="#D52B1E" />
      </svg>
    );
  }

  return (
    <svg className={className} viewBox="0 0 60 30" aria-hidden="true">
      <rect width="60" height="30" fill="#012169" />
      <path d="M0 0l60 30M60 0L0 30" stroke="#fff" strokeWidth="6" />
      <path d="M0 0l60 30M60 0L0 30" stroke="#C8102E" strokeWidth="4" />
      <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10" />
      <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  );
}
