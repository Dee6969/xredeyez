/**
 * Clinical pulse divider — an EKG trace that draws itself as it enters.
 * The medical wing's one signature motion. Static for reduced-motion.
 */
export default function PulseDivider() {
  return (
    <div className="pulse-divider" aria-hidden>
      <svg viewBox="0 0 600 40" preserveAspectRatio="none">
        <path
          className="pulse-divider-trace"
          d="M0 20 H210 L228 20 L240 6 L252 34 L264 12 L274 20 H600"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
