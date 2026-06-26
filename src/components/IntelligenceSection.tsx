import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { AlertTriangle, CheckCircle, Clock, TrendingUp, Globe, Cpu, Eye, Lock, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAlerts, LEVEL_COLORS } from '../contexts/AlertContext'

const INITIAL_EVENTS = [
  { time: '14:32:07', type: 'ALERT', msg: '비정상 신호 패턴 탐지 — 구역 7-B', icon: AlertTriangle, color: '#ff2d55' },
  { time: '14:31:44', type: 'INFO', msg: 'AI 모델 v3.8 업데이트 완료', icon: CheckCircle, color: '#00ff88' },
  { time: '14:30:19', type: 'SCAN', msg: '해상 이동 물체 패턴 분석 중...', icon: Clock, color: '#00d4ff' },
  { time: '14:29:55', type: 'ALERT', msg: '전자기 간섭 이상 감지 — L 대역', icon: AlertTriangle, color: '#ffcc00' },
  { time: '14:28:33', type: 'INFO', msg: '위성 데이터 동기화 완료 (KSat-12)', icon: CheckCircle, color: '#00ff88' },
  { time: '14:27:11', type: 'TREND', msg: '북쪽 구역 활동 빈도 +34% 상승', icon: TrendingUp, color: '#ff6b35' },
]

const THREAT_LEVELS = [
  { region: '북방 경계선', level: 'HIGH', score: 87, color: '#ff2d55', href: '/sol/01' },
  { region: '해상 감시 구역', level: 'MED', score: 52, color: '#ffcc00', href: '/sol/05' },
  { region: '사이버 방어망', level: 'LOW', score: 23, color: '#00ff88', href: '/sol/02' },
  { region: '공중 감시 레이더', level: 'MED', score: 61, color: '#ffcc00', href: '/sol/01' },
  { region: '전자전 모니터링', level: 'HIGH', score: 79, color: '#ff6b35', href: '/sol/04' },
]

const AI_MODULES = [
  { icon: Globe, name: '지역 위협 분석', desc: '34개 모니터링 구역', active: true, href: '/sol/03' },
  { icon: Cpu, name: '패턴 인식 엔진', desc: 'LSTM 이상 탐지', active: true, href: '/sol/01' },
  { icon: Eye, name: '광학 인텔리전스', desc: '위성/드론 AI 분석', active: false, href: '/sol/05' },
  { icon: Lock, name: '사이버 방어 AI', desc: '실시간 침투 차단', active: true, href: '/sol/02' },
]

function LiveEventFeed() {
  const { alerts } = useAlerts()
  const [events, setEvents] = useState(INITIAL_EVENTS)

  useEffect(() => {
    if (alerts.length > 0) {
      const latest = alerts[0]
      const icon = latest.level === 'CRITICAL' || latest.level === 'HIGH' ? AlertTriangle
        : latest.level === 'INFO' ? CheckCircle : TrendingUp
      const newEvent = {
        time: latest.timestamp,
        type: latest.level,
        msg: `[${latest.source}] ${latest.title} — ${latest.message}`,
        icon,
        color: LEVEL_COLORS[latest.level],
      }
      setEvents((prev) => [newEvent, ...prev].slice(0, 8))
    }
  }, [alerts])

  return (
    <div className="bg-[#041526]/80 border border-[#00d4ff]/10 clip-corner p-5 h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse" />
          <span className="text-[10px] font-black tracking-[0.2em] text-[#00d4ff] uppercase">Live Event Feed</span>
        </div>
        <span className="text-[9px] text-[#4a7a9b] font-mono">AUTO-REFRESH</span>
      </div>
      <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
        {events.map((ev, i) => {
          const Icon = ev.icon
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-start gap-3 py-2 border-b border-[#0a3050]/50 last:border-0"
            >
              <Icon className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: ev.color }} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span
                    className="text-[8px] font-black tracking-[0.12em] px-1.5 py-0.5"
                    style={{ color: ev.color, background: `${ev.color}15` }}
                  >
                    {ev.type}
                  </span>
                  <span className="text-[9px] text-[#4a7a9b] font-mono">{ev.time}</span>
                </div>
                <p className="text-[11px] text-[#8ab8d4] leading-tight line-clamp-1">{ev.msg}</p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

function ThreatMatrix() {
  return (
    <div className="bg-[#041526]/80 border border-[#00d4ff]/10 clip-corner p-5">
      <div className="text-[10px] font-black tracking-[0.2em] text-[#00d4ff] uppercase mb-4">Threat Assessment Matrix</div>
      <div className="space-y-3">
        {THREAT_LEVELS.map((t) => (
          <Link key={t.region} to={t.href} className="block group">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] text-[#8ab8d4] group-hover:text-white transition-colors">{t.region}</span>
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-black" style={{ color: t.color }}>{t.level}</span>
                <span className="text-[10px] font-mono text-white">{t.score}</span>
                <ChevronRight className="w-3 h-3 text-[#4a7a9b] group-hover:text-[#00d4ff] transition-colors" />
              </div>
            </div>
            <div className="h-1.5 bg-[#0a3050] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${t.score}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, ${t.color}88, ${t.color})` }}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

function AIModules() {
  return (
    <div className="bg-[#041526]/80 border border-[#00d4ff]/10 clip-corner p-5">
      <div className="text-[10px] font-black tracking-[0.2em] text-[#00d4ff] uppercase mb-4">AI Module Status</div>
      <div className="grid grid-cols-2 gap-3">
        {AI_MODULES.map((mod) => {
          const Icon = mod.icon
          return (
            <Link
              key={mod.name}
              to={mod.href}
              className={`p-3 border rounded transition-all group ${
                mod.active
                  ? 'border-[#00d4ff]/20 bg-[#00d4ff]/5 hover:border-[#00d4ff]/40'
                  : 'border-[#0a3050] bg-transparent opacity-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Icon className={`w-4 h-4 ${mod.active ? 'text-[#00d4ff]' : 'text-[#4a7a9b]'}`} />
                <div
                  className={`w-1.5 h-1.5 rounded-full ${
                    mod.active ? 'bg-[#00ff88] animate-pulse' : 'bg-[#4a7a9b]'
                  }`}
                />
              </div>
              <div className="text-[10px] font-bold text-white mb-0.5 group-hover:text-[#00d4ff] transition-colors">{mod.name}</div>
              <div className="text-[9px] text-[#4a7a9b]">{mod.desc}</div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default function IntelligenceSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="intelligence" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#020b18] via-[#041526]/40 to-[#020b18]" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-px bg-[#00d4ff]" />
                <span className="text-[10px] font-black tracking-[0.3em] text-[#00d4ff] uppercase">Intelligence Center</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                실시간 <span className="text-[#00d4ff] glow-text">인텔리전스</span> 대시보드
              </h2>
              <p className="mt-3 text-sm text-[#4a7a9b] max-w-lg">
                AI 엔진이 수집·분석·분류한 위협 데이터를 실시간으로 시각화합니다.
              </p>
            </div>
            <Link
              to="/command"
              className="hidden md:flex items-center gap-2 clip-corner-sm px-4 py-2 border border-[#00d4ff]/30 text-[#00d4ff] text-[10px] font-black tracking-[0.1em] uppercase hover:bg-[#00d4ff]/10 transition-all"
            >
              지휘 센터 <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-4"
        >
          <div className="lg:col-span-1">
            <LiveEventFeed />
          </div>
          <div className="lg:col-span-2 flex flex-col gap-4">
            <ThreatMatrix />
            <AIModules />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
