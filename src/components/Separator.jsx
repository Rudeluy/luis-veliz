export function Separator({ color = "#0f0f1a" }) {
  return (
    <div className="w-full overflow-hidden leading-none">
      <svg viewBox="0 0 500 80" preserveAspectRatio="none" className="w-full h-20">
        <path
          d="M0,0 C150,80 350,0 500,80 L500,00 L0,0 Z"
          style={{ fill: color }}
        />
      </svg>
    </div>
  );
}
