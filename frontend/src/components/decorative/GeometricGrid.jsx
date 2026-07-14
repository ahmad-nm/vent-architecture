/**
 * GeometricGrid Component
 * Creates structured geometric patterns using square shape images
 * Different pattern types: staircase, random, scattered, etc.
 */
import squarePattern from "@/assets/icons/square_shape.png";

const PATTERN_TYPES = {
  // Staircase pattern - ascending diagonal
  stairs: [
    [1, 0, 0, 0],
    [1, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 1, 1],
  ],

  // L-shape
  lshape: [
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 1, 1, 1],
  ],

  // Scattered blocks
  scattered: [
    [1, 0, 1, 0],
    [0, 1, 0, 1],
    [1, 0, 1, 0],
    [0, 1, 0, 1],
  ],

  // Vertical bars
  bars: [
    [1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1],
  ],

  // Corner accent
  corner: [
    [1, 1, 0, 0],
    [1, 1, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],

  // T-shape
  tshape: [
    [1, 1, 1, 1, 1],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
  ],

  // Diamond-like
  diamond: [
    [0, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [0, 1, 1, 0],
  ],

  // Random cluster
  cluster: [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ],
};

export default function GeometricGrid({
  pattern = "stairs",
  squareSize = 60,
  gap = 0,
  opacity = 0.25,
  className = "",
  style = {},
}) {
  const patternGrid = PATTERN_TYPES[pattern] || PATTERN_TYPES.stairs;
  const rows = patternGrid.length;
  const cols = Math.max(...patternGrid.map((row) => row.length));

  const width = cols * squareSize;
  const height = rows * squareSize;

  return (
    <div
      className={`pointer-events-none ${className}`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        position: "relative",
        ...style,
      }}
    >
      {patternGrid.map((row, rowIdx) =>
        row.map((cell, colIdx) => (
          cell === 1 && (
            <img
              key={`${rowIdx}-${colIdx}`}
              src={squarePattern}
              alt="pattern"
              className="geometric-square"
              style={{
                position: "absolute",
                left: `${colIdx * squareSize}px`,
                top: `${rowIdx * squareSize}px`,
                width: `${squareSize}px`,
                height: `${squareSize}px`,
                opacity: opacity,
                filter: "brightness(0) invert(1)",
                pointerEvents: "none",
                display: "block",
              }}
            />
          )
        ))
      )}
      <style>{`
        .geometric-square {
          max-width: none !important;
          max-height: none !important;
          object-fit: contain !important;
        }
      `}</style>
    </div>
  );
}
