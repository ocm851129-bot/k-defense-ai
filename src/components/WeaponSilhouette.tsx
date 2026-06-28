import type { WeaponCategory } from '../data/weapons'

interface Props {
  category: WeaponCategory
  color?: string
  className?: string
}

export default function WeaponSilhouette({ category, color = '#00d4ff', className = '' }: Props) {
  const c = color

  const svgs: Partial<Record<WeaponCategory, React.ReactNode>> = {
    // ── 전투기 ──────────────────────────────
    AIRCRAFT: (
      <svg viewBox="0 0 200 100" className={className}>
        <g style={{ filter: `drop-shadow(0 0 6px ${c}80)` }}>
          <polygon points="100,10 60,60 80,58 80,75 88,70 100,75 112,70 120,75 120,58 140,60" fill={c+'20'} stroke={c} strokeWidth="1.2"/>
          <polygon points="60,60 40,75 65,68" fill={c+'15'} stroke={c} strokeWidth="1"/>
          <polygon points="140,60 160,75 135,68" fill={c+'15'} stroke={c} strokeWidth="1"/>
          <line x1="80" y1="62" x2="120" y2="62" stroke={c} strokeWidth="0.8" strokeDasharray="3,2"/>
          <circle cx="95" cy="45" r="4" fill={c+'30'} stroke={c} strokeWidth="0.8"/>
          <line x1="100" y1="72" x2="100" y2="88" stroke={c} strokeWidth="1"/>
          <line x1="92" y1="85" x2="108" y2="85" stroke={c} strokeWidth="1.5"/>
        </g>
        <text x="100" y="98" textAnchor="middle" fontSize="7" fill={c} fontFamily="monospace" opacity="0.6">FIGHTER</text>
      </svg>
    ),
    // ── 탄도미사일 ──────────────────────────
    ICBM: (
      <svg viewBox="0 0 200 100" className={className}>
        <g style={{ filter: `drop-shadow(0 0 6px ${c}80)` }}>
          <polygon points="100,8 90,30 90,80 110,80 110,30" fill={c+'15'} stroke={c} strokeWidth="1.2"/>
          <polygon points="90,80 85,90 115,90 110,80" fill={c+'20'} stroke={c} strokeWidth="1"/>
          <line x1="85" y1="55" x2="75" y2="70" stroke={c} strokeWidth="1"/>
          <line x1="115" y1="55" x2="125" y2="70" stroke={c} strokeWidth="1"/>
          <circle cx="100" cy="25" r="3" fill={c+'50'} stroke={c} strokeWidth="1"/>
          <path d="M85,90 Q80,95 85,100 Q100,95 115,100 Q120,95 115,90" fill={c+'30'} stroke={c} strokeWidth="0.8"/>
          {/* trajectory arc */}
          <path d="M30,90 Q100,20 170,90" fill="none" stroke={c} strokeWidth="0.6" strokeDasharray="4,3" opacity="0.5"/>
          <circle cx="170" cy="90" r="3" fill={c+'40'} stroke={c} strokeWidth="0.8"/>
        </g>
        <text x="100" y="98" textAnchor="middle" fontSize="7" fill={c} fontFamily="monospace" opacity="0.6">BALLISTIC MISSILE</text>
      </svg>
    ),
    // ── 순항미사일 ──────────────────────────
    CRUISE: (
      <svg viewBox="0 0 200 100" className={className}>
        <g style={{ filter: `drop-shadow(0 0 6px ${c}80)` }}>
          <path d="M40,50 L140,45 L165,50 L140,55 L40,55 Z" fill={c+'15'} stroke={c} strokeWidth="1.2"/>
          <polygon points="165,50 180,50 170,44 168,56" fill={c+'25'} stroke={c} strokeWidth="1"/>
          <polygon points="40,45 40,55 25,52 25,48" fill={c+'20'} stroke={c} strokeWidth="1"/>
          <line x1="90" y1="45" x2="80" y2="32" stroke={c} strokeWidth="1"/>
          <line x1="80" y1="32" x2="110" y2="32" stroke={c} strokeWidth="1"/>
          <path d="M40,55 Q60,70 90,68 Q100,65 100,55" fill={c+'10'} stroke={c} strokeWidth="0.8"/>
          <circle cx="100" cy="50" r="3" fill={c+'40'} stroke={c} strokeWidth="0.8"/>
          <path d="M20,80 Q80,55 160,50" fill="none" stroke={c} strokeWidth="0.5" strokeDasharray="4,3" opacity="0.4"/>
        </g>
        <text x="100" y="95" textAnchor="middle" fontSize="7" fill={c} fontFamily="monospace" opacity="0.6">CRUISE MISSILE</text>
      </svg>
    ),
    // ── 잠수함 ──────────────────────────────
    SUBMARINE: (
      <svg viewBox="0 0 200 100" className={className}>
        <g style={{ filter: `drop-shadow(0 0 6px ${c}80)` }}>
          <ellipse cx="100" cy="58" rx="70" ry="20" fill={c+'12'} stroke={c} strokeWidth="1.2"/>
          <rect x="85" y="35" width="30" height="25" rx="4" fill={c+'20'} stroke={c} strokeWidth="1"/>
          <rect x="92" y="28" width="6" height="12" fill={c+'25'} stroke={c} strokeWidth="0.8"/>
          <rect x="102" y="30" width="4" height="8" fill={c+'25'} stroke={c} strokeWidth="0.8"/>
          <line x1="30" y1="58" x2="170" y2="58" stroke={c} strokeWidth="0.5" strokeDasharray="4,3" opacity="0.3"/>
          <circle cx="145" cy="53" r="3" fill={c+'30'} stroke={c} strokeWidth="0.8"/>
          <circle cx="160" cy="54" r="3" fill={c+'30'} stroke={c} strokeWidth="0.8"/>
          <path d="M30,60 Q40,75 30,78" fill="none" stroke={c} strokeWidth="1"/>
          <path d="M170,60 Q160,75 170,78" fill="none" stroke={c} strokeWidth="1"/>
        </g>
        <text x="100" y="95" textAnchor="middle" fontSize="7" fill={c} fontFamily="monospace" opacity="0.6">SUBMARINE</text>
      </svg>
    ),
    // ── 수상함 ──────────────────────────────
    NAVAL: (
      <svg viewBox="0 0 200 100" className={className}>
        <g style={{ filter: `drop-shadow(0 0 6px ${c}80)` }}>
          <polygon points="25,70 30,55 170,55 175,70 175,75 25,75" fill={c+'12'} stroke={c} strokeWidth="1.2"/>
          <rect x="65" y="38" width="70" height="18" fill={c+'18'} stroke={c} strokeWidth="1"/>
          <rect x="80" y="28" width="25" height="12" fill={c+'22'} stroke={c} strokeWidth="0.8"/>
          <line x1="92" y1="18" x2="92" y2="28" stroke={c} strokeWidth="1"/>
          <line x1="92" y1="18" x2="108" y2="18" stroke={c} strokeWidth="1"/>
          <circle cx="90" cy="44" r="3" fill={c+'40'} stroke={c} strokeWidth="0.8"/>
          <circle cx="120" cy="44" r="4" fill={c+'20'} stroke={c} strokeWidth="1"/>
          <line x1="145" y1="42" x2="160" y2="38" stroke={c} strokeWidth="1.2"/>
          <path d="M25,75 Q100,88 175,75" fill={c+'08'} stroke={c} strokeWidth="0.6"/>
        </g>
        <text x="100" y="97" textAnchor="middle" fontSize="7" fill={c} fontFamily="monospace" opacity="0.6">WARSHIP</text>
      </svg>
    ),
    // ── 전차 ────────────────────────────────
    GROUND: (
      <svg viewBox="0 0 200 100" className={className}>
        <g style={{ filter: `drop-shadow(0 0 6px ${c}80)` }}>
          <rect x="35" y="55" width="130" height="28" rx="3" fill={c+'12'} stroke={c} strokeWidth="1.2"/>
          <rect x="50" y="38" width="100" height="20" rx="2" fill={c+'18'} stroke={c} strokeWidth="1"/>
          <line x1="150" y1="48" x2="180" y2="46" stroke={c} strokeWidth="2"/>
          <circle cx="57" cy="78" r="10" fill={c+'15'} stroke={c} strokeWidth="1"/>
          <circle cx="83" cy="78" r="10" fill={c+'15'} stroke={c} strokeWidth="1"/>
          <circle cx="109" cy="78" r="10" fill={c+'15'} stroke={c} strokeWidth="1"/>
          <circle cx="135" cy="78" r="10" fill={c+'15'} stroke={c} strokeWidth="1"/>
          <circle cx="57" cy="78" r="5" fill={c+'30'} stroke={c} strokeWidth="0.8"/>
          <circle cx="83" cy="78" r="5" fill={c+'30'} stroke={c} strokeWidth="0.8"/>
          <circle cx="109" cy="78" r="5" fill={c+'30'} stroke={c} strokeWidth="0.8"/>
          <circle cx="135" cy="78" r="5" fill={c+'30'} stroke={c} strokeWidth="0.8"/>
          <rect x="35" y="73" width="130" height="8" fill={c+'10'} stroke={c} strokeWidth="0.5"/>
          <circle cx="95" cy="45" r="5" fill={c+'20'} stroke={c} strokeWidth="0.8"/>
        </g>
        <text x="100" y="98" textAnchor="middle" fontSize="7" fill={c} fontFamily="monospace" opacity="0.6">MAIN BATTLE TANK</text>
      </svg>
    ),
    // ── 지대공 미사일 ────────────────────────
    SAM: (
      <svg viewBox="0 0 200 100" className={className}>
        <g style={{ filter: `drop-shadow(0 0 6px ${c}80)` }}>
          <rect x="30" y="68" width="60" height="12" rx="2" fill={c+'20'} stroke={c} strokeWidth="1"/>
          <polygon points="60,20 55,68 65,68" fill={c+'15'} stroke={c} strokeWidth="1"/>
          <polygon points="53,40 45,55 52,52" fill={c+'20'} stroke={c} strokeWidth="0.8"/>
          <polygon points="67,40 75,55 68,52" fill={c+'20'} stroke={c} strokeWidth="0.8"/>
          <rect x="110" y="55" width="70" height="15" rx="2" fill={c+'18'} stroke={c} strokeWidth="1"/>
          <circle cx="145" cy="48" r="15" fill="none" stroke={c} strokeWidth="0.8" strokeDasharray="3,2"/>
          <circle cx="145" cy="48" r="8" fill={c+'15'} stroke={c} strokeWidth="1"/>
          <line x1="145" y1="33" x2="145" y2="55" stroke={c} strokeWidth="0.8"/>
          <line x1="130" y1="48" x2="160" y2="48" stroke={c} strokeWidth="0.8"/>
          {/* intercept arc */}
          <path d="M60,20 Q120,5 145,40" fill="none" stroke={c} strokeWidth="0.6" strokeDasharray="3,2" opacity="0.5"/>
        </g>
        <text x="100" y="97" textAnchor="middle" fontSize="7" fill={c} fontFamily="monospace" opacity="0.6">SAM SYSTEM</text>
      </svg>
    ),
    // ── 드론/UAV ────────────────────────────
    UAV: (
      <svg viewBox="0 0 200 100" className={className}>
        <g style={{ filter: `drop-shadow(0 0 6px ${c}80)` }}>
          <ellipse cx="100" cy="52" rx="18" ry="8" fill={c+'15'} stroke={c} strokeWidth="1.2"/>
          <line x1="82" y1="52" x2="40" y2="50" stroke={c} strokeWidth="1.5"/>
          <line x1="118" y1="52" x2="160" y2="50" stroke={c} strokeWidth="1.5"/>
          <ellipse cx="40" cy="50" rx="10" ry="4" fill={c+'20'} stroke={c} strokeWidth="0.8"/>
          <ellipse cx="160" cy="50" rx="10" ry="4" fill={c+'20'} stroke={c} strokeWidth="0.8"/>
          <polygon points="100,44 94,58 106,58" fill={c+'25'} stroke={c} strokeWidth="0.8"/>
          <polygon points="100,58 97,68 103,68" fill={c+'20'} stroke={c} strokeWidth="0.8"/>
          <line x1="90" y1="60" x2="82" y2="72" stroke={c} strokeWidth="0.8"/>
          <line x1="110" y1="60" x2="118" y2="72" stroke={c} strokeWidth="0.8"/>
          <circle cx="100" cy="52" r="3" fill={c+'40'} stroke={c} strokeWidth="0.8"/>
          {/* camera */}
          <circle cx="100" cy="60" r="4" fill={c+'20'} stroke={c} strokeWidth="1"/>
        </g>
        <text x="100" y="90" textAnchor="middle" fontSize="7" fill={c} fontFamily="monospace" opacity="0.6">UNMANNED AERIAL VEHICLE</text>
      </svg>
    ),
    // ── 헬리콥터 ────────────────────────────
    HELICOPTER: (
      <svg viewBox="0 0 200 100" className={className}>
        <g style={{ filter: `drop-shadow(0 0 6px ${c}80)` }}>
          <ellipse cx="85" cy="55" rx="35" ry="18" fill={c+'12'} stroke={c} strokeWidth="1.2"/>
          <rect x="55" y="45" width="30" height="20" rx="3" fill={c+'18'} stroke={c} strokeWidth="1"/>
          <line x1="20" y1="45" x2="150" y2="43" stroke={c} strokeWidth="2"/>
          <line x1="85" y1="43" x2="85" y2="45" stroke={c} strokeWidth="0.8"/>
          <polygon points="120,55 155,50 155,60" fill={c+'20'} stroke={c} strokeWidth="1"/>
          <line x1="150" y1="52" x2="165" y2="48" stroke={c} strokeWidth="1.5"/>
          <line x1="165" y1="48" x2="168" y2="55" stroke={c} strokeWidth="1.5"/>
          <line x1="65" y1="73" x2="60" y2="85" stroke={c} strokeWidth="1"/>
          <line x1="60" y1="85" x2="100" y2="85" stroke={c} strokeWidth="1.5"/>
          <line x1="100" y1="85" x2="95" y2="73" stroke={c} strokeWidth="1"/>
          <line x1="55" y1="53" x2="42" y2="62" stroke={c} strokeWidth="1"/>
        </g>
        <text x="100" y="97" textAnchor="middle" fontSize="7" fill={c} fontFamily="monospace" opacity="0.6">ATTACK HELICOPTER</text>
      </svg>
    ),
    // ── 자주포/포병 ─────────────────────────
    ARTILLERY: (
      <svg viewBox="0 0 200 100" className={className}>
        <g style={{ filter: `drop-shadow(0 0 6px ${c}80)` }}>
          <rect x="40" y="60" width="110" height="20" rx="3" fill={c+'12'} stroke={c} strokeWidth="1.2"/>
          <rect x="55" y="45" width="60" height="18" rx="2" fill={c+'18'} stroke={c} strokeWidth="1"/>
          <line x1="115" y1="50" x2="168" y2="32" stroke={c} strokeWidth="2.5"/>
          <line x1="168" y1="32" x2="173" y2="30" stroke={c} strokeWidth="3"/>
          <circle cx="60" cy="78" r="9" fill={c+'15'} stroke={c} strokeWidth="1"/>
          <circle cx="130" cy="78" r="9" fill={c+'15'} stroke={c} strokeWidth="1"/>
          <circle cx="60" cy="78" r="4" fill={c+'30'} stroke={c} strokeWidth="0.8"/>
          <circle cx="130" cy="78" r="4" fill={c+'30'} stroke={c} strokeWidth="0.8"/>
          <rect x="40" y="75" width="110" height="6" fill={c+'10'} stroke={c} strokeWidth="0.5"/>
          {/* trajectory */}
          <path d="M172,30 Q160,8 130,20 Q110,28 100,40" fill="none" stroke={c} strokeWidth="0.5" strokeDasharray="3,2" opacity="0.4"/>
        </g>
        <text x="100" y="97" textAnchor="middle" fontSize="7" fill={c} fontFamily="monospace" opacity="0.6">SELF-PROPELLED ARTILLERY</text>
      </svg>
    ),
    // ── 다연장로켓 ─────────────────────────
    MLRS: (
      <svg viewBox="0 0 200 100" className={className}>
        <g style={{ filter: `drop-shadow(0 0 6px ${c}80)` }}>
          <rect x="40" y="60" width="100" height="18" rx="2" fill={c+'12'} stroke={c} strokeWidth="1.2"/>
          <rect x="65" y="42" width="60" height="22" rx="2" fill={c+'18'} stroke={c} strokeWidth="1"/>
          {[75,85,95,105,115].map((x, i) => (
            <line key={i} x1={x} y1="42" x2={x+10} y2="25" stroke={c} strokeWidth="1.5"/>
          ))}
          {[75,85,95,105,115].map((x, i) => (
            <circle key={i} cx={x+10} cy="25" r="2" fill={c+'50'} stroke={c} strokeWidth="0.5"/>
          ))}
          <circle cx="55" cy="76" r="8" fill={c+'15'} stroke={c} strokeWidth="1"/>
          <circle cx="125" cy="76" r="8" fill={c+'15'} stroke={c} strokeWidth="1"/>
          <circle cx="55" cy="76" r="4" fill={c+'30'} stroke={c} strokeWidth="0.8"/>
          <circle cx="125" cy="76" r="4" fill={c+'30'} stroke={c} strokeWidth="0.8"/>
          <rect x="40" y="72" width="100" height="7" fill={c+'10'} stroke={c} strokeWidth="0.5"/>
        </g>
        <text x="100" y="97" textAnchor="middle" fontSize="7" fill={c} fontFamily="monospace" opacity="0.6">MULTIPLE ROCKET LAUNCHER</text>
      </svg>
    ),
  }

  const svgMap: Record<WeaponCategory, WeaponCategory> = {
    ICBM: 'ICBM', IRBM: 'ICBM', SRBM: 'ICBM', SLBM: 'ICBM',
    CRUISE: 'CRUISE', ASM: 'CRUISE', AAM: 'CRUISE', SSM: 'CRUISE',
    AIRCRAFT: 'AIRCRAFT',
    HELICOPTER: 'HELICOPTER',
    NAVAL: 'NAVAL',
    SUBMARINE: 'SUBMARINE',
    GROUND: 'GROUND',
    ARTILLERY: 'ARTILLERY',
    MLRS: 'MLRS',
    SAM: 'SAM',
    UAV: 'UAV',
    SATELLITE: 'SATELLITE',
    NUCLEAR: 'ICBM',
    CYBER: 'CYBER',
    PISTOL: 'GROUND', RIFLE: 'GROUND', SMG: 'GROUND',
    SNIPER: 'GROUND', MG: 'GROUND', SHOTGUN: 'GROUND', LAUNCHER: 'MLRS',
  }

  const key = svgMap[category] as WeaponCategory
  return (
    <div className={`w-full ${className}`}>
      {svgs[key] ?? svgs['AIRCRAFT']}
    </div>
  )
}
