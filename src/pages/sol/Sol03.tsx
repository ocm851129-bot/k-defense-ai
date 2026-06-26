import { motion } from 'framer-motion'
import { Globe, Camera, Layers, ChevronLeft, Target, Eye, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import SolControlBar from '../../components/SolControlBar'
import { useSystem } from '../../contexts/SystemContext'

const GEO_TARGETS = [
  { id: 'GEO-001', type: '지하 시설물', lat: '38.1234N', lng: '127.4521E', area: '남포 지구', change: '+12%', risk: 'HIGH', lastUpdate: '14:52' },
  { id: 'GEO-002', type: '이동 차량 군집', lat: '38.4512N', lng: '126.8834E', area: '사리원 북부', change: '+340%', risk: 'CRITICAL', lastUpdate: '14:49' },
  { id: 'GEO-003', type: '항공기 격납고', lat: '39.0123N', lng: '125.7654E', area: '순안 공항', change: '+5%', risk: 'MED', lastUpdate: '14:45' },
  { id: 'GEO-004', type: '해안 방어 시설', lat: '38.7891N', lng: '124.5532E', area: '서해 해안', change: '-2%', risk: 'LOW', lastUpdate: '14:40' },
  { id: 'GEO-005', type: '물류 집결지', lat: '39.2341N', lng: '126.1234E', area: '평양 남부', change: '+87%', risk: 'HIGH', lastUpdate: '14:38' },
]

const SATELLITE_PASSES = [
  { sat: 'KSat-12', time: '15:23', coverage: '한반도 전역', res: '0.3m', status: 'SCHEDULED' },
  { sat: 'KSat-07', time: '16:45', coverage: '서해 및 황해', res: '0.5m', status: 'SCHEDULED' },
  { sat: 'COSMO-4', time: '14:18', coverage: '비무장지대', res: '1.0m', status: 'COMPLETED' },
]

const RISK_COLORS: Record<string, string> = {
  CRITICAL: '#ff2d55',
  HIGH: '#ff6b35',
  MED: '#ffcc00',
  LOW: '#00ff88',
}

function MapVisualization() {
  return (
    <div className="relative bg-[#020b18] border border-[#00d4ff]/10 overflow-hidden" style={{ height: 280 }}>
      <svg viewBox="0 0 400 280" className="w-full h-full">
        <defs>
          <pattern id="grid3" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#00d4ff" strokeOpacity="0.06" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="400" height="280" fill="url(#grid3)" />
        {/* Simplified peninsula outline */}
        <path d="M100,30 Q130,25 160,35 Q190,30 220,40 Q240,45 250,60 Q255,80 245,100 Q235,120 230,140 Q220,160 210,175 Q200,190 195,200 Q188,210 180,220 Q170,230 165,235" fill="none" stroke="#1a3a5a" strokeWidth="1.5" />
        {/* DMZ line */}
        <line x1="100" y1="130" x2="260" y2="130" stroke="#ff2d55" strokeWidth="1" strokeDasharray="4,2" strokeOpacity="0.6" />
        <text x="265" y="134" fontSize="6" fill="#ff2d55">DMZ</text>
        {/* Target blips */}
        {[
          { x: 155, y: 100, risk: 'HIGH', id: 'GEO-001' },
          { x: 130, y: 85, risk: 'CRITICAL', id: 'GEO-002' },
          { x: 110, y: 65, risk: 'MED', id: 'GEO-003' },
          { x: 95, y: 95, risk: 'LOW', id: 'GEO-004' },
          { x: 140, y: 110, risk: 'HIGH', id: 'GEO-005' },
        ].map((t) => (
          <g key={t.id}>
            <circle cx={t.x} cy={t.y} r="5" fill={`${RISK_COLORS[t.risk]}30`} stroke={RISK_COLORS[t.risk]} strokeWidth="0.8" />
            <circle cx={t.x} cy={t.y} r="2" fill={RISK_COLORS[t.risk]} />
            <text x={t.x + 7} y={t.y + 3} fontSize="5" fill="#8ab8d4">{t.id}</text>
          </g>
        ))}
        {/* Satellite coverage arc */}
        <ellipse cx="180" cy="100" rx="120" ry="80" fill="none" stroke="#00d4ff" strokeOpacity="0.1" strokeWidth="0.5" strokeDasharray="3,2" />
        <text x="290" y="50" fontSize="6" fill="#00d4ff" opacity="0.6">KSat 커버리지</text>
      </svg>
      <div className="absolute top-2 left-2 text-[8px] font-mono text-[#4a7a9b]">GEOINT MAP // 보안등급: CLASSIFIED</div>
      <div className="absolute bottom-2 right-2 text-[8px] font-mono text-[#4a7a9b]">좌표계: WGS-84 // 축척: 1:500K</div>
    </div>
  )
}

export default function Sol03() {
  const sys = useSystem()
  return (
    <div className="min-h-screen bg-[#020b18] pt-6 pb-0">
      <div className="max-w-7xl mx-auto px-6">
        <Link to="/" className="inline-flex items-center gap-2 text-[11px] font-bold text-[#4a7a9b] hover:text-[#00d4ff] tracking-[0.1em] mb-8 transition-colors">
          <ChevronLeft className="w-4 h-4" /> 메인으로 돌아가기
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[9px] font-black tracking-[0.2em] text-[#00ff88] bg-[#00ff88]/10 px-2 py-1">SOL-03</span>
            <div className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse" />
            <span className="text-[10px] text-[#00ff88] font-bold tracking-[0.15em]">IMAGERY ONLINE</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-2">
            지역 정보 <span className="text-[#00ff88] glow-text">GEOINT 분석</span>
          </h1>
          <p className="text-sm text-[#4a7a9b]">위성·항공 영상 AI 분석 · 시설물 식별 · 변화 탐지</p>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 space-y-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <div className="text-[10px] font-black tracking-[0.2em] text-[#00d4ff] uppercase mb-2">GEOINT 분석 맵</div>
              <MapVisualization />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="clip-corner bg-[#041526]/80 border border-[#00d4ff]/10 p-5">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-4 h-4 text-[#00ff88]" />
                <span className="text-[10px] font-black tracking-[0.2em] text-[#00d4ff] uppercase">탐지 표적 목록</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-[11px]">
                  <thead>
                    <tr className="border-b border-[#0a3050]">
                      {['ID', '유형', '좌표', '지역', '변화율', '위험도', '갱신'].map((h) => (
                        <th key={h} className="text-left py-2 pr-3 text-[9px] font-black tracking-[0.1em] text-[#4a7a9b] uppercase">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {GEO_TARGETS.map((t) => (
                      <tr key={t.id} className="border-b border-[#0a3050]/40 hover:bg-[#00ff88]/3">
                        <td className="py-2.5 pr-3 font-mono text-[#00d4ff]">{t.id}</td>
                        <td className="py-2.5 pr-3 text-[#8ab8d4]">{t.type}</td>
                        <td className="py-2.5 pr-3 font-mono text-[11px] text-[#4a7a9b]">{t.lat}<br />{t.lng}</td>
                        <td className="py-2.5 pr-3 text-[#8ab8d4]">{t.area}</td>
                        <td className="py-2.5 pr-3">
                          <span className="font-bold" style={{ color: t.change.startsWith('+') ? '#ff6b35' : '#00ff88' }}>{t.change}</span>
                        </td>
                        <td className="py-2.5 pr-3">
                          <span className="text-[9px] font-black" style={{ color: RISK_COLORS[t.risk] }}>{t.risk}</span>
                        </td>
                        <td className="py-2.5 font-mono text-[#4a7a9b]">{t.lastUpdate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>

          <div className="xl:col-span-1 space-y-4">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}
              className="grid grid-cols-2 gap-3">
              {[
                { icon: Eye, label: '탐지 표적', value: '5', color: '#00ff88' },
                { icon: Camera, label: '위성 통과', value: '3회', color: '#00d4ff' },
                { icon: TrendingUp, label: '변화 탐지', value: '12건', color: '#ffcc00' },
                { icon: Layers, label: '분석 레이어', value: '7', color: '#c084fc' },
              ].map(({ icon: Icon, label, value, color }) => (
                <div key={label} className="clip-corner-sm bg-[#041526]/80 border border-[#00d4ff]/10 p-3 text-center">
                  <Icon className="w-4 h-4 mx-auto mb-1.5" style={{ color }} />
                  <div className="text-xl font-black number-mono" style={{ color }}>{value}</div>
                  <div className="text-[9px] text-[#4a7a9b] mt-0.5">{label}</div>
                </div>
              ))}
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
              className="clip-corner bg-[#041526]/80 border border-[#00d4ff]/10 p-5">
              <div className="text-[10px] font-black tracking-[0.2em] text-[#00d4ff] uppercase mb-4">위성 통과 일정</div>
              <div className="space-y-3">
                {SATELLITE_PASSES.map((s) => (
                  <div key={s.sat} className="p-3 border border-[#0a3050] rounded">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[11px] font-bold text-white">{s.sat}</span>
                      <span className={`text-[9px] font-black ${s.status === 'COMPLETED' ? 'text-[#4a7a9b]' : 'text-[#00ff88]'}`}>
                        {s.status}
                      </span>
                    </div>
                    <div className="text-[10px] text-[#4a7a9b]">{s.time} KST · {s.coverage}</div>
                    <div className="text-[9px] text-[#00d4ff] mt-0.5">해상도: {s.res}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}
              className="clip-corner bg-[#041526]/80 border border-[#00ff88]/15 p-5">
              <div className="flex items-center gap-2 mb-3">
                <Globe className="w-4 h-4 text-[#00ff88]" />
                <span className="text-[10px] font-black tracking-[0.2em] text-[#00ff88] uppercase">AI 분석 요약</span>
              </div>
              <div className="bg-[#020b18]/60 border border-[#0a3050] p-3 font-mono text-[10px] leading-relaxed text-[#8ab8d4]">
                <span className="text-[#00ff88]">[GEOINT-AI]</span> 사리원 북부 차량 집결 이상 감지<br />
                변화율 +340%. 24h 비교 분석 결과 병력 이동 패턴 62%, 물자 이동 38% 추정.<br />
                <span className="text-[#ffcc00]">위성 KSat-12 15:23 통과 시 고해상도 재확인 예정<span className="cursor-blink">_</span></span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <SolControlBar moduleId="sol03">
        <div className="bg-[#020b18]/60 border border-[#0a3050] p-4 clip-corner-sm">
          <div className="text-[9px] font-black tracking-[0.15em] text-[#4a7a9b] uppercase mb-2">위성 촬영</div>
          <button
            onClick={sys.requestSatelliteTask}
            disabled={sys.system.satelliteTasking}
            className="w-full py-2 text-[10px] font-black text-[#020b18] bg-[#00ff88] clip-corner-sm hover:bg-[#00ffaa] transition-all disabled:opacity-50"
          >
            {sys.system.satelliteTasking ? '요청 중...' : '긴급 촬영 요청'}
          </button>
        </div>
      </SolControlBar>
    </div>
  )
}
