export default function StatusDot({ label }: { label: string }) {
  return (
    <span className="status-dot" role="status" aria-label={label}>
      <span className="status-dot__pip" aria-hidden="true" />
      <span className="status-dot__label">{label}</span>
    </span>
  );
}
