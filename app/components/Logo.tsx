type LogoProps = {
  className?: string;
  title?: string;
};

const FLORON_LINES = [
  ["0", "-9", "0", "-3.5"],
  ["0", "3.5", "0", "9"],
  ["-9", "0", "-3.5", "0"],
  ["3.5", "0", "9", "0"],
  ["-6.4", "-6.4", "-2.5", "-2.5"],
  ["2.5", "2.5", "6.4", "6.4"],
  ["6.4", "-6.4", "2.5", "-2.5"],
  ["-2.5", "2.5", "-6.4", "6.4"],
  ["-3.5", "-8.2", "-1.3", "-3.2"],
  ["1.3", "3.2", "3.5", "8.2"],
  ["3.5", "-8.2", "1.3", "-3.2"],
  ["-1.3", "3.2", "-3.5", "8.2"],
  ["-8.2", "-3.5", "-3.2", "-1.3"],
  ["3.2", "1.3", "8.2", "3.5"],
  ["-8.2", "3.5", "-3.2", "1.3"],
  ["3.2", "-1.3", "8.2", "-3.5"],
] as const;

function Floron({ x, color }: { x: number; color: string }) {
  return (
    <g transform={`translate(${x}, 85)`}>
      <circle cx="0" cy="0" r="2" fill={color} />
      <g stroke={color} strokeWidth="1.5" strokeLinecap="round">
        {FLORON_LINES.map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
        ))}
      </g>
    </g>
  );
}

export default function Logo({ className = "h-12 w-auto", title = "MEHI" }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 280 120"
      fill="none"
      role="img"
      aria-label={title}
      className={className}
    >
      <title>{title}</title>
      <text
        x="140"
        y="55"
        textAnchor="middle"
        fontFamily="var(--font-playfair), Georgia, serif"
        fontWeight="700"
        fontSize="58"
        fill="#1A1A2E"
        letterSpacing="4"
      >
        MEHI
      </text>
      <Floron x={105} color="#8B2480" />
      <Floron x={140} color="#D8B4E2" />
      <Floron x={175} color="#6B8DB5" />
    </svg>
  );
}
