export function PenArrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`pen-arrow ${className ?? ''}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export function SectionTopic({
  label,
  color = 'var(--accent)',
}: {
  label: string;
  color?: string;
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        marginBottom: 20,
      }}
    >
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: color,
        }}
      />
      <span className="label" style={{ color }}>
        {label}
      </span>
    </div>
  );
}