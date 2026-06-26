import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ThreatPoint {
  id: string
  x: number
  y: number
  level: 'CRITICAL' | 'HIGH' | 'MED' | 'LOW'
  label: string
  region: string
}

const THREAT_POINTS: ThreatPoint[] = [
  { id: 'KR-N', x: 72.5, y: 31.5, level: 'CRITICAL', label: '한반도 북부', region: '동아시아' },
  { id: 'CH-E', x: 70, y: 33, level: 'HIGH', label: '동중국해', region: '동아시아' },
  { id: 'RU-E', x: 75, y: 22, level: 'MED', label: '러시아 극동', region: '동아시아' },
  { id: 'ME-1', x: 55, y: 38, level: 'HIGH', label: '중동 분쟁지', region: '중동' },
  { id: 'EU-1', x: 48, y: 24, level: 'MED', label: '동유럽 불안', region: '유럽' },
  { id: 'AF-1', x: 50, y: 48, level: 'LOW', label: '아프리카 분쟁', region: '아프리카' },
  { id: 'SA-1', x: 30, y: 55, level: 'LOW', label: '남미 분쟁', region: '남미' },
  { id: 'KR-S', x: 73, y: 34.5, level: 'HIGH', label: '서해 해상', region: '동아시아' },
]

const LEVEL_COLORS: Record<string, string> = {
  CRITICAL: '#ff2d55',
  HIGH: '#ff6b35',
  MED: '#ffcc00',
  LOW: '#00ff88',
}

function WorldMapSVG() {
  return (
    <svg
      viewBox="0 0 100 60"
      className="absolute inset-0 w-full h-full"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Simplified continents */}
      {/* North America */}
      <path d="M5,10 Q8,8 12,10 Q18,9 22,14 Q24,18 22,24 Q20,30 18,32 Q16,34 14,33 Q12,34 10,32 Q8,28 7,24 Q5,18 5,10Z" fill="#0a2a40" stroke="#00d4ff" strokeWidth="0.2" strokeOpacity="0.3" />
      {/* South America */}
      <path d="M18,35 Q22,33 25,36 Q27,40 26,46 Q24,52 22,55 Q20,57 18,55 Q15,52 14,48 Q13,42 15,38Z" fill="#0a2a40" stroke="#00d4ff" strokeWidth="0.2" strokeOpacity="0.3" />
      {/* Europe */}
      <path d="M42,10 Q46,8 50,10 Q53,12 52,16 Q50,18 48,20 Q46,22 44,20 Q42,18 42,14Z" fill="#0a2a40" stroke="#00d4ff" strokeWidth="0.2" strokeOpacity="0.3" />
      {/* Africa */}
      <path d="M44,22 Q50,20 53,24 Q55,28 54,34 Q52,40 50,44 Q48,48 46,47 Q43,46 42,42 Q40,36 40,30 Q40,24 44,22Z" fill="#0a2a40" stroke="#00d4ff" strokeWidth="0.2" strokeOpacity="0.3" />
      {/* Asia */}
      <path d="M52,8 Q58,6 68,8 Q74,10 78,12 Q80,14 82,16 Q84,18 82,22 Q78,24 74,28 Q70,30 66,28 Q62,26 58,24 Q54,22 52,18 Q50,14 52,8Z" fill="#0a2a40" stroke="#00d4ff" strokeWidth="0.2" strokeOpacity="0.3" />
      {/* Korea highlight */}
      <path d="M72,30 Q74,29 75,31 Q75,34 74,36 Q72,37 71,36 Q70,34 71,31Z" fill="#00d4ff" fillOpacity="0.15" stroke="#00d4ff" strokeWidth="0.3" strokeOpacity="0.6" />
      {/* Australia */}
      <path d="M74,38 Q80,36 84,40 Q86,44 84,48 Q80,50 76,48 Q72,46 72,42 Q72,38 74,38Z" fill="#0a2a40" stroke="#00d4ff" strokeWidth="0.2" strokeOpacity="0.3" />
      {/* Grid lines */}
      {[0, 20, 40, 60, 80, 100].map((x) => (
        <line key={`v${x}`} x1={x} y1="0" x2={x} y2="60" stroke="#00d4ff" strokeOpacity="0.04" strokeWidth="0.3" />
      ))}
      {[0, 20, 40, 60].map((y) => (
        <line key={`h${y}`} x1="0" y1={y} x2="100" y2={y} stroke="#00d4ff" strokeOpacity="0.04" strokeWidth="0.3" />
      ))}
    </svg>
  )
}

export default function WorldThreatMap() {
  const [activePoint, setActivePoint] = useState<ThreatPoint | null>(null)
  const [pulse, setPulse] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setPulse((p) => p + 1), 2000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative w-full overflow-hidden" style={{ height: 340 }}>
      {/* BG */}
      <div className="absolute inset-0 bg-[#020b18]" />
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 72% 33%, rgba(0,212,255,0.06) 0%, transparent 60%)',
        }}
      />

      <WorldMapSVG />

      {/* Threat points */}
      {THREAT_POINTS.map((point) => {
        const color = LEVEL_COLORS[point.level]
        return (
          <div
            key={point.id}
            className="absolute cursor-pointer"
            style={{ left: `${point.x}%`, top: `${point.y}%`, transform: 'translate(-50%, -50%)' }}
            onMouseEnter={() => setActivePoint(point)}
            onMouseLeave={() => setActivePoint(null)}
          >
            {/* Pulse rings */}
            {point.level === 'CRITICAL' || point.level === 'HIGH' ? (
              <>
                <div
                  key={pulse}
                  className="absolute rounded-full border"
                  style={{
                    width: 24, height: 24,
                    top: '50%', left: '50%',
                    transform: 'translate(-50%, -50%)',
                    borderColor: color,
                    animation: 'pulse-ring 2s ease-out infinite',
                    opacity: 0,
                  }}
                />
                <div
                  className="absolute rounded-full border"
                  style={{
                    width: 14, height: 14,
                    top: '50%', left: '50%',
                    transform: 'translate(-50%, -50%)',
                    borderColor: color,
                    animation: 'pulse-ring 2s ease-out 0.6s infinite',
                    opacity: 0,
                  }}
                />
              </>
            ) : null}
            {/* Core dot */}
            <div
              className="w-3 h-3 rounded-full relative z-10"
              style={{ background: color, boxShadow: `0 0 8px ${color}` }}
            />
          </div>
        )
      })}

      {/* Tooltip */}
      <AnimatePresence>
        {activePoint && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute z-20 pointer-events-none"
            style={{
              left: `${Math.min(activePoint.x + 3, 70)}%`,
              top: `${Math.max(activePoint.y - 10, 5)}%`,
            }}
          >
            <div
              className="clip-corner-sm bg-[#041526]/95 backdrop-blur-sm border px-3 py-2"
              style={{ borderColor: `${LEVEL_COLORS[activePoint.level]}40` }}
            >
              <div className="flex items-center gap-2 mb-0.5">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: LEVEL_COLORS[activePoint.level] }} />
                <span className="text-[8px] font-black" style={{ color: LEVEL_COLORS[activePoint.level] }}>
                  {activePoint.level}
                </span>
              </div>
              <div className="text-[11px] font-bold text-white whitespace-nowrap">{activePoint.label}</div>
              <div className="text-[9px] text-[#4a7a9b]">{activePoint.region}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend */}
      <div className="absolute bottom-3 left-3 flex items-center gap-3">
        {Object.entries(LEVEL_COLORS).map(([level, color]) => (
          <div key={level} className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full" style={{ background: color }} />
            <span className="text-[8px] text-[#4a7a9b] font-mono">{level}</span>
          </div>
        ))}
      </div>

      {/* Top label */}
      <div className="absolute top-3 left-3 text-[9px] font-mono text-[#4a7a9b]">
        GLOBAL THREAT MONITOR // LIVE
      </div>
      <div className="absolute top-3 right-3 flex items-center gap-1.5">
        <div className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse" />
        <span className="text-[9px] font-mono text-[#00ff88]">{THREAT_POINTS.length} ZONES MONITORED</span>
      </div>
    </div>
  )
}
