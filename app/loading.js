export default function Loading() {
  return (
    <div className="route-loading-shell" role="status" aria-live="polite" aria-label="Loading page">
      <div className="route-loading-card">
        <div className="route-loading-spinner" aria-hidden="true">
          <span />
        </div>
        <strong>ROYALARM</strong>
        <span>Loading route…</span>
      </div>
    </div>
  );
}
