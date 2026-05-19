type LogoProps = {
  /**
   * Tailwind classes that control the font-size of the "MEHI" text.
   * The florones below scale proportionally via em units, so passing
   * e.g. `text-5xl md:text-7xl` resizes the whole mark coherently.
   */
  className?: string;
  title?: string;
};

const FLORON_LINES: ReadonlyArray<readonly [string, string, string, string]> = [
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
];

function Floron({ colorClass }: { colorClass: string }) {
  return (
    <svg
      viewBox="-10 -10 20 20"
      fill="none"
      aria-hidden="true"
      className={`h-[0.34em] w-[0.34em] ${colorClass}`}
    >
      <circle cx="0" cy="0" r="2" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        {FLORON_LINES.map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
        ))}
      </g>
    </svg>
  );
}

export default function Logo({ className = "", title = "MEHI" }: LogoProps) {
  return (
    <div
      role="img"
      aria-label={title}
      className={`inline-flex flex-col items-center leading-none select-none ${className}`}
    >
      <span className="font-display font-bold tracking-[0.06em] text-tinta">
        MEHI
      </span>
      <div className="mt-[0.22em] flex items-center justify-center gap-[0.28em]">
        <Floron colorClass="text-ciruela" />
        <Floron colorClass="text-lavanda" />
        <Floron colorClass="text-pizarra" />
      </div>
    </div>
  );
}
