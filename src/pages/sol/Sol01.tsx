import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Activity, AlertTriangle, CheckCircle, Radar, Target, ChevronLeft, Zap, ToggleLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import SolControlBar from '../../components/SolControlBar'
import { useSystem as _useSystem } from '../../contexts/SystemContext'
import Toggle from '../../components/ui/Toggle'

const SENSOR_FEEDS = [
  { id: 'RADAR-A4', type: '지상 레이더', status: 'ACTIVE', signal: 92, lat: '37.5N', lng: '126.8E' },
  { id: 'SAT-KS12', type: '위성 광학', status: 'ACTIVE', signal: 87, lat: '38.2N', lng: '127.1E' },
  { id: 'DRONE-T7', type: '무인기 감시', status: 'SCANNING', signal: 74, lat: '37.9N', lng: '126.5E' },
  { id: 'EW-NODE3', type: '전자전 센서', status: 'ACTIVE', signal: 96, lat: '37.4N', lng: '127.4E' },
  { id: 'ACC-B2', type: '음향 센서', status: 'STANDBY', signal: 45, lat: '37.7N', lng: '126.9E' },
  { id: 'IR-C9', type: '적외선 감지', status: 'ACTIVE', signal: 88, lat: '38.0N', lng: '127.6E' },
]

const THREAT_EVENTS = [
  { time: '14:47:22', threat: '이동식 발사대 식별', priority: 'CRITICAL', confidence: 94, sector: 'A-7' },
  { time: '14:45:11', threat: '비정상 차량 집결', priority: 'HIGH', confidence: 81, sector: 'B-3' },
  { time: '14:43:58', threat: '레이더 스푸핑 시도', priority: 'HIGH', confidence: 77, sector: 'C-1' },
  { time: '14:40:34', threat: '통신 트래픽 급증', priority: 'MED', confidence: 68, sector: 'D-2' },
  { time: '14:38:19', threat: '야간 활동 패턴 이상', priority: 'MED', confidence: 72, sector: 'A-4' },
]

const PRIORITY_COLORS: Record<string, string> = {
  CRITICAL: '#ff2d55',
  HIGH: '#ff6b35',
  MED: '#ffcc00',
  LOW: '#00ff88',
}

function RadarMap() {
  const [angle, setAngle] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setAngle((a) => (a + 2) % 360), 50)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="relative w-full aspect-square max-w-xs mx-auto">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        {[25, 50, 75, 100].map((r) => (
          <circle key={r} cx="100" cy="100" r={r} fill="none" stroke="#00d4ff" strokeOpacity="0.15" strokeWidth="0.5" />
        ))}
        <line x1="100" y1="0" x2="100" y2="200" stroke="#00d4ff" strokeOpacity="0.1" strokeWidth="0.5" />
        <line x1="0" y1="100" x2="200" y2="100" stroke="#00d4ff" strokeOpacity="0.1" strokeWidth="0.5" />
        <defs>
          <linearGradient id="sweep" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#00d4ff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d={`M100,100 L${100 + Math.cos((angle * Math.PI) / 180) * 100},${100 + Math.sin((angle * Math.PI) / 180) * 100}`}
          stroke="#00d4ff" strokeWidth="1.5" strokeOpacity="0.8"
        />
        {[
          { x: 130, y: 60, label: 'A-7', hot: true },
          { x: 80, y: 140, label: 'B-3', hot: true },
          { x: 155, y: 110, label: 'C-1', hot: false },
          { x: 60, y: 80, label: 'D-2', hot: false },
        ].map((blip) => (
          <g key={blip.label}>
            <circle cx={blip.x} cy={blip.y} r="3" fill={blip.hot ? '#ff2d55' : '#00ff88'} />
            <circle cx={blip.x} cy={blip.y} r="6" fill="none" stroke={blip.hot ? '#ff2d55' : '#00ff88'} strokeOpacity="0.4" strokeWidth="0.5" />
            <text x={blip.x + 6} y={blip.y + 4} fontSize="8" fill="#8ab8d4">{blip.label}</text>
          </g>
        ))}
        <text x="100" y="16" textAnchor="middle" fontSize="7" fill="#4a7a9b">N</text>
        <text x="100" y="198" textAnchor="middle" fontSize="7" fill="#4a7a9b">S</text>
        <text x="12" y="104" textAnchor="middle" fontSize="7" fill="#4a7a9b">W</text>
        <text x="188" y="104" textAnchor="middle" fontSize="7" fill="#4a7a9b">E</text>
      </svg>
    </div>
  )
}

export default function Sol01() {
  const [sensorStates, setSensorStates] = useState<Record<string, boolean>>(
    Object.fromEntries(SENSOR_FEEDS.map((s) => [s.id, true]))
  )
  const [radarSpeed, setRadarSpeed] = useState(4)

  return (
    <div className="min-h-screen bg-[#020b18] pt-6 pb-0">
      <div className="max-w-7xl mx-auto px-6">
        {/* Back */}
        <Link to="/" className="inline-flex items-center gap-2 text-[11px] font-bold text-[#4a7a9b] hover:text-[#00d4ff] tracking-[0.1em] mb-8 transition-colors">
          <ChevronLeft className="w-4 h-4" /> 메인으로 돌아가기
        </Link>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[9px] font-black tracking-[0.2em] text-[#00d4ff] bg-[#00d4ff]/10 px-2 py-1">SOL-01</span>
            <div className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse" />
            <span className="text-[10px] text-[#00ff88] font-bold tracking-[0.15em]">SYSTEM ONLINE</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-2">
            전장 <span className="text-[#00d4ff] glow-text">인텔리전스 AI</span>
          </h1>
          <p className="text-sm text-[#4a7a9b]">다중 센서 융합 · 실시간 위협 탐지 · 자동 우선순위 결정</p>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left: Radar + Sensor Feeds */}
          <div className="xl:col-span-1 space-y-4">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
              className="clip-corner bg-[#041526]/80 border border-[#00d4ff]/10 p-5">
              <div className="text-[10px] font-black tracking-[0.2em] text-[#00d4ff] uppercase mb-4">전장 레이더 맵</div>
              <RadarMap />
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
              className="clip-corner bg-[#041526]/80 border border-[#00d4ff]/10 p-5">
              <div className="text-[10px] font-black tracking-[0.2em] text-[#00d4ff] uppercase mb-4">센서 네트워크</div>
              <div className="space-y-2">
                {SENSOR_FEEDS.map((s) => (
                  <div key={s.id} className="flex items-center gap-3 py-2 border-b border-[#0a3050]/50 last:border-0">
                    <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                      s.status === 'ACTIVE' ? 'bg-[#00ff88] animate-pulse' :
                      s.status === 'SCANNING' ? 'bg-[#ffcc00] animate-pulse' : 'bg-[#4a7a9b]'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between">
                        <span className="text-[10px] font-bold text-white">{s.id}</span>
                        <span className="text-[9px] font-mono text-[#00d4ff]">{s.signal}%</span>
                      </div>
                      <div className="text-[9px] text-[#4a7a9b]">{s.type} · {s.lat} {s.lng}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Threat Events + Stats */}
          <div className="xl:col-span-2 space-y-4">
            {/* KPI row */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
              className="grid grid-cols-4 gap-3">
              {[
                { icon: Radar, label: '활성 센서', value: '5/6', color: '#00d4ff' },
                { icon: Target, label: '탐지 위협', value: '5', color: '#ff2d55' },
                { icon: Zap, label: '분석 속도', value: '0.3s', color: '#ffcc00' },
                { icon: Activity, label: '정확도', value: '94%', color: '#00ff88' },
              ].map(({ icon: Icon, label, value, color }) => (
                <div key={label} className="clip-corner-sm bg-[#041526]/80 border border-[#00d4ff]/10 p-4 text-center">
                  <Icon className="w-4 h-4 mx-auto mb-2" style={{ color }} />
                  <div className="text-xl font-black number-mono" style={{ color }}>{value}</div>
                  <div className="text-[9px] text-[#4a7a9b] mt-1">{label}</div>
                </div>
              ))}
            </motion.div>

            {/* Threat Table */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="clip-corner bg-[#041526]/80 border border-[#00d4ff]/10 p-5">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-4 h-4 text-[#ff2d55]" />
                <span className="text-[10px] font-black tracking-[0.2em] text-[#00d4ff] uppercase">실시간 위협 탐지 로그</span>
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse" />
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-[11px]">
                  <thead>
                    <tr className="border-b border-[#0a3050]">
                      {['시각', '위협 내용', '우선순위', '신뢰도', '구역'].map((h) => (
                        <th key={h} className="text-left py-2 pr-4 text-[9px] font-black tracking-[0.12em] text-[#4a7a9b] uppercase">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {THREAT_EVENTS.map((e, i) => (
                      <tr key={i} className="border-b border-[#0a3050]/50 hover:bg-[#00d4ff]/3">
                        <td className="py-2.5 pr-4 font-mono text-[#4a7a9b]">{e.time}</td>
                        <td className="py-2.5 pr-4 text-[#8ab8d4]">{e.threat}</td>
                        <td className="py-2.5 pr-4">
                          <span className="text-[9px] font-black px-1.5 py-0.5"
                            style={{ color: PRIORITY_COLORS[e.priority], background: `${PRIORITY_COLORS[e.priority]}15` }}>
                            {e.priority}
                          </span>
                        </td>
                        <td className="py-2.5 pr-4">
                          <div className="flex items-center gap-2">
                            <div className="w-12 h-1 bg-[#0a3050] rounded-full overflow-hidden">
                              <div className="h-full bg-[#00d4ff] rounded-full" style={{ width: `${e.confidence}%` }} />
                            </div>
                            <span className="text-[#00d4ff] font-mono">{e.confidence}%</span>
                          </div>
                        </td>
                        <td className="py-2.5 font-mono text-[#8ab8d4]">{e.sector}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* AI Analysis Panel */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="clip-corner bg-[#041526]/80 border border-[#00d4ff]/10 p-5">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-4 h-4 text-[#00ff88]" />
                <span className="text-[10px] font-black tracking-[0.2em] text-[#00d4ff] uppercase">AI 전술 분석 요약</span>
              </div>
              <div className="bg-[#020b18]/60 border border-[#0a3050] p-4 font-mono text-[11px] leading-relaxed text-[#8ab8d4]">
                <span className="text-[#00d4ff]">[AI-INTEL v3.8]</span> 분석 완료 — 2026-06-20 14:47 KST<br />
                <br />
                <span className="text-[#ffcc00]">▶ CRITICAL:</span> 구역 A-7에서 이동식 발사대 식별 (신뢰도 94%). LSTM 패턴 모델 기반
                이전 36시간 이동 궤적과 92% 일치. 즉각 대응 권고.<br />
                <br />
                <span className="text-[#ff6b35]">▶ HIGH:</span> 구역 B-3 차량 집결 패턴 — 전일 대비 340% 증가. 위협 유형 분류: 보급/물자 이동 가능성 68%, 전술 집결 32%.<br />
                <br />
                <span className="text-[#00ff88]">▶ STATUS:</span> 전체 6개 센서 중 5개 정상 운용. EW-NODE3 신호 강도 최고치(96%).
                다음 자동 분석 주기: 15:00 KST<span className="cursor-blink">_</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Sensor individual toggles */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          className="clip-corner bg-[#041526]/80 border border-[#00d4ff]/10 p-5 mt-4">
          <div className="flex items-center gap-2 mb-4">
            <ToggleLeft className="w-4 h-4 text-[#00d4ff]" />
            <span className="text-[10px] font-black tracking-[0.2em] text-[#00d4ff] uppercase">센서 노드 개별 제어</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {SENSOR_FEEDS.map((s) => (
              <div key={s.id} className="flex items-center justify-between p-3 border border-[#0a3050] clip-corner-sm">
                <div>
                  <div className="text-[10px] font-bold text-white">{s.id}</div>
                  <div className="text-[9px] text-[#4a7a9b]">{s.type}</div>
                </div>
                <Toggle
                  checked={sensorStates[s.id]}
                  onChange={() => setSensorStates((prev) => ({ ...prev, [s.id]: !prev[s.id] }))}
                  color="#00d4ff"
                  size="sm"
                />
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-[#0a3050]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] text-[#4a7a9b]">레이더 스캔 속도</span>
              <span className="text-[11px] font-black text-[#00d4ff] font-mono">{radarSpeed}s / 회전</span>
            </div>
            <input type="range" min={1} max={10} value={radarSpeed}
              onChange={(e) => setRadarSpeed(Number(e.target.value))}
              className="w-full accent-[#00d4ff]" />
          </div>
        </motion.div>
      </div>

      {/* Control Bar */}
      <SolControlBar moduleId="sol01">
        <div className="bg-[#020b18]/60 border border-[#0a3050] p-4 clip-corner-sm">
          <div className="text-[9px] font-black tracking-[0.15em] text-[#4a7a9b] uppercase mb-3">활성 센서</div>
          <div className="text-2xl font-black text-[#00d4ff] number-mono">
            {Object.values(sensorStates).filter(Boolean).length}/{SENSOR_FEEDS.length}
          </div>
          <div className="text-[9px] text-[#4a7a9b] mt-1">개 노드 온라인</div>
        </div>
      </SolControlBar>
    </div>
  )
}
