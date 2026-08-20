const ICONS = {
  grua: (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 58h30" strokeLinecap="round" />
      <path d="M14 58V30l32-14v10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M46 26l10 4-4 8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 30l-6 4v4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="18" cy="55" r="3" />
      <circle cx="30" cy="55" r="3" />
    </svg>
  ),
  telehandler: (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="8" y="34" width="20" height="14" rx="1" />
      <path d="M22 40L52 18" strokeLinecap="round" />
      <path d="M48 14h6v8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M50 22l-6 4v4h8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="14" cy="50" r="4" />
      <circle cx="24" cy="50" r="4" />
    </svg>
  ),
  camabaja: (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 42h6l4-8h30l6 8h10" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="14" y="34" width="30" height="6" />
      <circle cx="14" cy="48" r="4" />
      <circle cx="24" cy="48" r="4" />
      <circle cx="50" cy="48" r="4" />
    </svg>
  ),
};

export default function MachineryIcon({ category, className }) {
  return <div className={className}>{ICONS[category] || ICONS.grua}</div>;
}
