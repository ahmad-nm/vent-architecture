import GeometricGrid from "./GeometricGrid";

/**
 * PatternAccent Component
 * Places geometric patterns at specific positions within a section
 * Used for decorative corner/edge placements
 */
export default function PatternAccent({
  pattern = "stairs",
  position = "top-left", // 'top-left', 'top-right', 'bottom-left', 'bottom-right', 'center'
  squareSize = 60,
  opacity = 0.2,
  hideOnMobile = true,
}) {
  const positionMap = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0",
    "bottom-left": "bottom-0 left-0",
    "bottom-right": "bottom-0 right-0",
    center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
  };

  return (
    <div
      className={`absolute z-0 ${positionMap[position]} ${
        hideOnMobile ? "hidden lg:block" : "block"
      }`}
      style={{ pointerEvents: "none" }}
    >
      <GeometricGrid
        pattern={pattern}
        squareSize={squareSize}
        opacity={opacity}
      />
    </div>
  );
}
