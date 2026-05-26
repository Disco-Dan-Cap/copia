import { COPIA_MARK_PATHS, COPIA_MARK_VIEWBOX } from "./copia-mark";

/**
 * Renders the Leaf Wave motif <defs> (the mark symbol + the sparse/medium
 * pattern tilings) once into the DOM. Mount this a single time in the app
 * shell; any number of <LeafWave> instances then reference it via url(#...).
 * Pattern geometry mirrors brand/copia-motif-system.html exactly.
 */
export function LeafWaveDefs() {
  return (
    <svg
      width={0}
      height={0}
      aria-hidden
      style={{ position: "absolute" }}
    >
      <defs>
        <symbol id="copia-mark" viewBox={COPIA_MARK_VIEWBOX}>
          {COPIA_MARK_PATHS.map((d, i) => (
            <path key={i} fill="currentColor" d={d} />
          ))}
        </symbol>

        <pattern
          id="leafWave-sparse"
          x={0}
          y={0}
          width={340}
          height={380}
          patternUnits="userSpaceOnUse"
        >
          <g transform="translate(170 120) rotate(-22) scale(0.14) translate(-317 -442)" fill="currentColor">
            <use href="#copia-mark" />
          </g>
          <g transform="translate(0 310) rotate(35) scale(0.14) translate(-317 -442)" fill="currentColor">
            <use href="#copia-mark" />
          </g>
          <g transform="translate(340 310) rotate(35) scale(0.14) translate(-317 -442)" fill="currentColor">
            <use href="#copia-mark" />
          </g>
        </pattern>

        <pattern
          id="leafWave-medium"
          x={0}
          y={0}
          width={220}
          height={250}
          patternUnits="userSpaceOnUse"
        >
          <g transform="translate(110 80) rotate(-15) scale(0.11) translate(-317 -442)" fill="currentColor">
            <use href="#copia-mark" />
          </g>
          <g transform="translate(0 205) rotate(28) scale(0.11) translate(-317 -442)" fill="currentColor">
            <use href="#copia-mark" />
          </g>
          <g transform="translate(220 205) rotate(28) scale(0.11) translate(-317 -442)" fill="currentColor">
            <use href="#copia-mark" />
          </g>
        </pattern>
      </defs>
    </svg>
  );
}
