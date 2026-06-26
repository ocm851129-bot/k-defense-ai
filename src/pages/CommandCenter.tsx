import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Shield, Activity, AlertTriangle, Lock, Globe, Radio, Eye, Cpu,
  ChevronRight, Maximize2, TrendingUp, Zap, BarChart2,
} from 'lucide-react'
import WorldThreatMap from '../components/WorldThreatMap'
import { useAlerts, LEVEL_COLORS } from '../contexts/AlertContext'

const SOL_LINKS = [
  { id: 'SOL-01', href: '/sol/01', icon: Shield, color: '#00d4ff', label: '전장 AI' },
  { id: 'SOL-02', href: '/sol/02', icon: Lock, color: '#ff2d55', label: '사이버' },
  { id: 'SOL-03', href: '/sol/03', icon: Globe, color: '#00ff88', label: 'GEOINT' },
  { id: 'SOL-04', href: '/sol/04', icon: Radio, color: '#ffcc00', label: 'SIGINT' },
  { id: 'SOL-05', href: '/sol/05', icon: Eye, color: '#ff6b35', label: 'IMINT' },
  { id: 'SOL-06', href: '/sol/06', icon: Cpu, color: '#c084fc', label: '의사결정 AI' },
]

// Mini live chart component
function MiniSparkline({ color }: { color: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dataRef = useRef<number[]>(Array.from({ length: 30 }, () => Math.random() * 60 + 20))
  const animRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const W = canvas.width
    const H = canvas.height

    const draw = () => {
      dataRef.current = [...dataRef.current.slice(1), Math.random() * 60 + 20]
      ctx.clearRect(0, 0, W, H)

      const data = dataRef.current
      const max = Math.max(...data)
      const min = Math.min(...data)
      const range = max - min || 1

      ctx.beginPath()
      data.forEach((v, i) => {
        const x = (i / (data.length - 1)) * W
        const y = H - ((v - min) / range) * H * 0.85
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y)
      })
      ctx.strokeStyle = color
      ctx.lineWidth = 1.5
      ctx.stroke()

      // Fill
      ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.closePath()
      ctx.fillStyle = `${color}18`
      ctx.fill()

      animRef.current = setTimeout(() => requestAnimationFrame(draw), 200) as unknown as number
    }
    draw()
    return () => clearTimeout(animRef.current)
  }, [color])

  return <canvas ref={canvasRef} width={120} height={40} className="w-full opacity-80" />
}

// Real-time counter with fluctuation
function LiveMetric({ base, delta, color, label, unit = '' }: {
  base: number; delta: number; color: string; label: string; unit?: string
}) {
  const [value, setValue] = useState(base)
  useEffect(() => {
    const id = setInterval(() => {
      setValue((v) => Math.max(0, v + (Math.random() - 0.5) * delta * 2))
    }, 1500)
    return () => clearInterval(id)
  }, [base, delta])
  return (
    <div className="text-center">
      <div className="text-2xl font-black number-mono transition-all" style={{ color }}>
        {value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value.toFixed(0)}{unit}
      </div>
      <div className="text-[9px] text-[#4a7a9b] mt-0.5">{label}</div>
    </div>
  )
}

function SystemHealthBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-16 text-[9px] text-[#4a7a9b] text-right shrink-0">{label}</div>
      <div className="flex-1 h-1.5 bg-[#0a3050] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}80, ${color})` }}
        />
      </div>
      <span className="text-[9px] font-mono text-white w-8 shrink-0">{value}%</span>
    </div>
  )
}

// Sol mini panel
function SolMiniPanel({ sol }: { sol: typeof SOL_LINKS[number] }) {
  const Icon = sol.icon
  const [status] = useState(Math.random() > 0.15 ? 'ONLINE' : 'DEGRADED')
  return (
    <Link
      to={sol.href}
      className="clip-corner-sm bg-[#041526]/80 border border-[#00d4ff]/10 p-4 group hover:border-current transition-all block"
      style={{ '--tw-border-opacity': 1 } as React.CSSProperties}
    >
      <div className="flex items-center justify-between mb-3">
        <div
          className="w-8 h-8 clip-corner-sm flex items-center justify-center"
          style={{ background: `${sol.color}15`, border: `1px solid ${sol.color}30` }}
        >
          <Icon className="w-4 h-4" style={{ color: sol.color }} />
        </div>
        <div className="flex items-center gap-1.5">
          <div className={`w-1.5 h-1.5 rounded-full ${status === 'ONLINE' ? 'bg-[#00ff88] animate-pulse' : 'bg-[#ffcc00]'}`} />
          <span className="text-[8px] font-bold" style={{ color: status === 'ONLINE' ? '#00ff88' : '#ffcc00' }}>
            {status}
          </span>
        </div>
      </div>
      <div className="text-[9px] font-black tracking-[0.1em] mb-0.5" style={{ color: sol.color }}>{sol.id}</div>
      <div className="text-[11px] font-bold text-white mb-2 group-hover:text-[#00d4ff] transition-colors">{sol.label}</div>
      <MiniSparkline color={sol.color} />
      <div className="mt-2 flex items-center gap-1 text-[9px] text-[#4a7a9b] group-hover:text-[#00d4ff] transition-colors">
        상세 보기 <ChevronRight className="w-3 h-3" />
      </div>
    </Link>
  )
}

export default function CommandCenter() {
  const { alerts, unreadCount, markAllRead } = useAlerts()

  return (
    <div className="min-h-screen bg-[#020b18] pt-4 pb-20">
      <div className="max-w-[1600px] mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6"
        >
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse" />
              <span className="text-[9px] font-black tracking-[0.25em] text-[#00ff88] uppercase">All Systems Operational</span>
            </div>
            <h1 className="text-3xl font-black text-white">
              통합 <span className="text-[#00d4ff] glow-text">지휘 센터</span>
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/" className="text-[10px] font-bold text-[#4a7a9b] hover:text-[#00d4ff] tracking-[0.1em] transition-colors">
              메인 플랫폼
            </Link>
            <div className="w-px h-4 bg-[#0a3050]" />
            <span className="text-[9px] font-mono text-[#4a7a9b]">
              {new Date().toLocaleDateString('ko-KR')} // KST
            </span>
          </div>
        </motion.div>

        {/* Top KPI Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-5"
        >
          {[
            { base: 87, delta: 3, color: '#ff2d55', label: '종합 위협도', unit: '' },
            { base: 99.7, delta: 0.2, color: '#00ff88', label: '탐지 정확도', unit: '%' },
            { base: 1247, delta: 20, color: '#00d4ff', label: '차단된 위협', unit: '' },
            { base: 34, delta: 0, color: '#ffcc00', label: '모니터링 구역', unit: '' },
            { base: 5, delta: 0, color: '#00ff88', label: '활성 AI 모듈', unit: '/6' },
            { base: 0.3, delta: 0.1, color: '#c084fc', label: '평균 응답(s)', unit: 's' },
          ].map((m) => (
            <div key={m.label} className="clip-corner-sm bg-[#041526]/80 border border-[#00d4ff]/10 p-3">
              <LiveMetric {...m} />
            </div>
          ))}
        </motion.div>

        {/* Main grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

          {/* Left: World map + alerts */}
          <div className="xl:col-span-2 space-y-5">

            {/* World Threat Map */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="clip-corner bg-[#041526]/80 border border-[#00d4ff]/10 overflow-hidden"
            >
              <div className="flex items-center justify-between px-5 pt-4 pb-2">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#00d4ff]" />
                  <span className="text-[10px] font-black tracking-[0.2em] text-[#00d4ff] uppercase">Global Threat Monitor</span>
                </div>
                <Maximize2 className="w-3.5 h-3.5 text-[#4a7a9b]" />
              </div>
              <WorldThreatMap />
            </motion.div>

            {/* SOL-01~06 Mini Panels */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <BarChart2 className="w-4 h-4 text-[#00d4ff]" />
                <span className="text-[10px] font-black tracking-[0.2em] text-[#00d4ff] uppercase">6대 AI 시스템 현황</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {SOL_LINKS.map((sol) => <SolMiniPanel key={sol.id} sol={sol} />)}
              </div>
            </motion.div>

            {/* System Health */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="clip-corner bg-[#041526]/80 border border-[#00d4ff]/10 p-5"
            >
              <div className="flex items-center gap-2 mb-4">
                <Activity className="w-4 h-4 text-[#00d4ff]" />
                <span className="text-[10px] font-black tracking-[0.2em] text-[#00d4ff] uppercase">시스템 리소스 현황</span>
              </div>
              <div className="space-y-3">
                {[
                  { label: 'AI 처리 코어', value: 78, color: '#00d4ff' },
                  { label: '데이터 파이프라인', value: 92, color: '#00ff88' },
                  { label: '네트워크 대역폭', value: 61, color: '#ffcc00' },
                  { label: '스토리지 I/O', value: 45, color: '#c084fc' },
                  { label: '보안 방화벽', value: 99, color: '#00ff88' },
                  { label: '위성 링크', value: 87, color: '#00d4ff' },
                ].map((h) => <SystemHealthBar key={h.label} {...h} />)}
              </div>
            </motion.div>
          </div>

          {/* Right: Alert Feed + Quick Actions */}
          <div className="xl:col-span-1 space-y-5">

            {/* Alert Feed */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="clip-corner bg-[#041526]/80 border border-[#00d4ff]/10 p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-[#ff2d55]" />
                  <span className="text-[10px] font-black tracking-[0.2em] text-[#00d4ff] uppercase">실시간 경보</span>
                  {unreadCount > 0 && (
                    <span className="text-[8px] font-black bg-[#ff2d55] text-white px-1.5 py-0.5 rounded-sm">
                      {unreadCount}
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button onClick={markAllRead} className="text-[9px] text-[#4a7a9b] hover:text-[#00d4ff] transition-colors">
                    모두 읽음
                  </button>
                )}
              </div>

              <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                {alerts.length === 0 ? (
                  <div className="text-center py-8 text-[11px] text-[#4a7a9b]">경보 없음</div>
                ) : (
                  alerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={`p-3 border transition-all ${
                        alert.read ? 'border-[#0a3050] opacity-60' : 'border-[#00d4ff]/10'
                      }`}
                      style={!alert.read ? { borderLeft: `2px solid ${LEVEL_COLORS[alert.level]}` } : {}}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="text-[8px] font-black px-1.5 py-0.5"
                          style={{ color: LEVEL_COLORS[alert.level], background: `${LEVEL_COLORS[alert.level]}15` }}
                        >
                          {alert.level}
                        </span>
                        <span className="text-[9px] text-[#4a7a9b]">{alert.source}</span>
                        <span className="text-[8px] font-mono text-[#4a7a9b] ml-auto">{alert.timestamp}</span>
                      </div>
                      <div className="text-[11px] font-bold text-white mb-0.5">{alert.title}</div>
                      <div className="text-[10px] text-[#4a7a9b] leading-tight">{alert.message}</div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="clip-corner bg-[#041526]/80 border border-[#00d4ff]/10 p-5"
            >
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-4 h-4 text-[#00d4ff]" />
                <span className="text-[10px] font-black tracking-[0.2em] text-[#00d4ff] uppercase">24시간 통계</span>
              </div>
              {[
                { label: '탐지된 위협', value: '1,892', change: '+14%', up: true },
                { label: '차단된 공격', value: '1,247', change: '+8%', up: true },
                { label: '분석 데이터량', value: '487M건', change: '+22%', up: true },
                { label: '오탐지율', value: '0.3%', change: '-0.1%', up: false },
                { label: '평균 대응 시간', value: '0.3s', change: '-15%', up: false },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center justify-between py-2 border-b border-[#0a3050]/50 last:border-0">
                  <span className="text-[11px] text-[#8ab8d4]">{stat.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] font-black text-white number-mono">{stat.value}</span>
                    <span className={`text-[9px] font-bold ${stat.up ? 'text-[#00ff88]' : 'text-[#ff2d55]'}`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Action Panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 }}
              className="clip-corner bg-[#041526]/80 border border-[#00d4ff]/10 p-5"
            >
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-4 h-4 text-[#ffcc00]" />
                <span className="text-[10px] font-black tracking-[0.2em] text-[#00d4ff] uppercase">빠른 액션</span>
              </div>
              <div className="space-y-2">
                {[
                  { label: '전 구역 경계 강화', color: '#ff2d55', sol: '/sol/01' },
                  { label: '사이버 격리 모드', color: '#ff6b35', sol: '/sol/02' },
                  { label: '위성 긴급 촬영 요청', color: '#00ff88', sol: '/sol/03' },
                  { label: 'AI 시나리오 재분석', color: '#c084fc', sol: '/sol/06' },
                ].map((action) => (
                  <Link
                    key={action.label}
                    to={action.sol}
                    className="flex items-center gap-3 p-3 border border-[#0a3050] hover:border-current transition-all group"
                    style={{ '--tw-border-opacity': '0.4' } as React.CSSProperties}
                  >
                    <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: action.color }} />
                    <span className="text-[11px] text-[#8ab8d4] group-hover:text-white transition-colors flex-1">
                      {action.label}
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#4a7a9b] group-hover:text-white" />
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
