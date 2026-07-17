/**
 * Ilustración vectorial propia: cinco piezas que se conectan a un centro,
 * como el plano de un negocio. Sin imágenes de stock.
 */
export function MapIllustration({ className = '' }: { className?: string }) {
  const nodes = [
    { x: 90, y: 40, fill: '#ffc42e', label: 'Vendes' },
    { x: 210, y: 60, fill: '#ff6f5c', label: 'Cliente' },
    { x: 250, y: 175, fill: '#5573c9', label: 'Entrega' },
    { x: 130, y: 210, fill: '#ff6f5c', label: 'IA' },
    { x: 40, y: 150, fill: '#ffc42e', label: 'Tú' },
  ]
  const cx = 160
  const cy = 125

  return (
    <svg
      viewBox="0 0 300 250"
      className={className}
      role="img"
      aria-label="Cinco piezas de un negocio conectándose alrededor de un centro"
    >
      <defs>
        <linearGradient id="hub" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2a3f8c" />
          <stop offset="100%" stopColor="#141d42" />
        </linearGradient>
        <filter id="soft" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="6" stdDeviation="7" floodColor="#141d42" floodOpacity="0.18" />
        </filter>
      </defs>

      {/* Conexiones */}
      <g stroke="#adc0eb" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="1 8">
        {nodes.map((n, i) => (
          <line key={i} x1={cx} y1={cy} x2={n.x} y2={n.y} />
        ))}
      </g>

      {/* Nodos exteriores */}
      {nodes.map((n, i) => (
        <g key={i} filter="url(#soft)" className="animate-float" style={{ animationDelay: `${i * 0.4}s` }}>
          <circle cx={n.x} cy={n.y} r="20" fill="#fff" />
          <circle cx={n.x} cy={n.y} r="20" fill="none" stroke={n.fill} strokeWidth="3.5" />
          <circle cx={n.x} cy={n.y} r="7" fill={n.fill} />
        </g>
      ))}

      {/* Centro */}
      <g filter="url(#soft)">
        <rect x={cx - 34} y={cy - 24} width="68" height="48" rx="14" fill="url(#hub)" />
        <rect x={cx - 20} y={cy - 11} width="40" height="6" rx="3" fill="#ffc42e" />
        <rect x={cx - 20} y={cy + 1} width="28" height="5" rx="2.5" fill="#7f99dc" />
        <rect x={cx - 20} y={cy + 11} width="34" height="5" rx="2.5" fill="#7f99dc" />
      </g>
    </svg>
  )
}
