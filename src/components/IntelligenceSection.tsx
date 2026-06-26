import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { AlertTriangle, CheckCircle, TrendingUp, Globe, Cpu, Eye, Lock, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAlerts, LEVEL_COLORS } from '../contexts/AlertContext'

const INITIAL_EVENTS = [
  { time: '14:32:07', type: 'ALERT', msg: '이동식 발사대(TEL) 7대 동창리 집결 포착', color: '#ff2d55', icon: AlertTriangle },
  { time: '14:31:44', type: 'INFO',  msg: 'SOL-03 위성 데이터 동기화 완료',           color: '#00ff88', icon: CheckCircle },
  { time: '14:30:19', type: 'SCAN',  msg: '서해 고속정 NLL 남측 3km 접근 감시 중',    color: '#00d4ff', icon: TrendingUp },
  { time: '14:29:55', type: 'ALERT', msg: 'Zero-Day CVE-2025-44721 침투 시도 탐지',   color: '#ffcc00', icon: AlertTriangle },
  { time: '14:28:33', type: 'INFO',  msg: '만리경-2호 한반도 상공 통과 (D+16회)',     color: '#00ff88', icon: CheckCircle },
  { time: '14:27:11', type: 'TREND', msg: '북방 구역 차량 활동 빈도 +87% 상승',       color: '#ff6b35', icon: TrendingUp },
]

const THREAT_MATRIX = [
  { region: '북방 경계선',    level: 'CRITICAL', score: 92, color: '#ff2d55', href: '/sol/01' },
  { region: '해상 감시 구역', level: 'HIGH',     score: 76, color: '#ff6b35', href: '/sol/05' },
  { region: '사이버 방어망',  level: 'HIGH',     score: 71, color: '#ff6b35', href: '/sol/02' },
  { region: '공중 감시 레이더', level: 'MED',    score: 54, color: '#ffcc00', href: '/sol/01' },
  { region: '전자전 모니터링', level: 'MED',     score: 48, color: '#ffcc00', href: '/sol/04' },
]

const AI_MODULES = [
  { icon: Globe, name: '지역 위협 분석',  desc: '34개 모니터링 구역', active: true,  href: '/sol/03', color: '#00d4ff' },
  { icon: Cpu,   name: '패턴 인식 엔진', desc: 'LSTM 이상 탐지',    active: true,  href: '/sol/01', color: '#00ff88' },
  { icon: Eye,   name: '광학 인텔리전스', desc: '위성/드론 AI 분석', active: false, href: '/sol/05', color: '#ff6b35' },
  { icon: Lock,  name: '사이버 방어 AI', desc: '실시간 침투 차단',   active: true,  href: '/sol/02', color: '#ff2d55' },
]

export default function IntelligenceSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { alerts } = useAlerts()
  const [events, setEvents] = useState(INITIAL_EVENTS)

  useEffect(() => {
    if (!alerts.length) return
    const a = alerts[0]
    setEvents((prev) => [{
      time: a.timestamp, type: a.level,
      msg: `[${a.source}] ${a.title} — ${a.message}`,
      color: LEVEL_COLORS[a.level],
      icon: a.level === 'CRITICAL' || a.level === 'HIGH' ? AlertTriangle : CheckCircle,
    }, ...prev].slice(0, 8))
  }, [alerts])

  return (
    <section id="intelligence" className="relative bg-[#0a0a0a] py-28 overflow-hidden">
      {/* 상단 청록 글로우 */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[200px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(0,212,255,0.06) 0%, transparent 70%)' }} />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* 헤더 */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14">
          <div>
            <p className="text-[#00d4ff]/50 text-[10px] tracking-[0.3em] uppercase font-black mb-3">
              Intelligence Center
            </p>
            <h2 className="font-black text-white text-[2rem] sm:text-[3rem] lg:text-[3.5rem] leading-[1.05] tracking-tight">
              실시간 위협 인텔리전스
            </h2>
            <p className="mt-3 text-white/40 text-sm max-w-md leading-relaxed">
              AI 엔진이 수집·분석·분류한 위협 데이터를 실시간으로 시각화합니다.
            </p>
          </div>
          <Link to="/command"
            className="hidden sm:flex items-center gap-2 px-5 py-2.5 border border-[#00d4ff]/25 text-[#00d4ff] text-[10px] font-black tracking-[0.1em] uppercase hover:bg-[#00d4ff]/8 transition-all rounded-full whitespace-nowrap">
            지휘 센터 <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>

        {/* 그리드 */}
        <motion.div initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* 라이브 이벤트 피드 */}
          <div className="bg-white/[0.03] backdrop-blur-sm border border-white/8 rounded-2xl p-6 h-full">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse" />
                <span className="text-[10px] font-black tracking-[0.2em] text-[#00d4ff] uppercase">Live Feed</span>
              </div>
              <span className="text-[8px] font-mono text-white/25">AUTO-REFRESH</span>
            </div>
            <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
              {events.map((ev, i) => {
                const Icon = ev.icon
                return (
                  <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="flex items-start gap-3 py-2.5 border-b border-white/5 last:border-0">
                    <Icon className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: ev.color }} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[7px] font-black px-1.5 py-0.5 rounded"
                          style={{ color: ev.color, background: `${ev.color}18` }}>
                          {ev.type}
                        </span>
                        <span className="text-[8px] text-white/25 font-mono">{ev.time}</span>
                      </div>
                      <p className="text-[11px] text-white/60 leading-tight line-clamp-1">{ev.msg}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* 위협 매트릭스 + AI 모듈 */}
          <div className="lg:col-span-2 flex flex-col gap-5">

            {/* 위협 매트릭스 */}
            <div className="bg-white/[0.03] backdrop-blur-sm border border-white/8 rounded-2xl p-6">
              <p className="text-[10px] font-black tracking-[0.2em] text-[#00d4ff] uppercase mb-5">
                Threat Assessment Matrix
              </p>
              <div className="space-y-4">
                {THREAT_MATRIX.map((t) => (
                  <Link key={t.region} to={t.href} className="block group">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-white/70 group-hover:text-white transition-colors">{t.region}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-[9px] font-black" style={{ color: t.color }}>{t.level}</span>
                        <span className="text-sm font-mono text-white">{t.score}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-white/20 group-hover:text-white/50 transition-colors" />
                      </div>
                    </div>
                    <div className="h-1 bg-white/8 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: `${t.score}%` }}
                        viewport={{ once: true }} transition={{ duration: 1, ease: 'easeOut' }}
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, ${t.color}60, ${t.color})` }} />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* AI 모듈 상태 */}
            <div className="bg-white/[0.03] backdrop-blur-sm border border-white/8 rounded-2xl p-6">
              <p className="text-[10px] font-black tracking-[0.2em] text-[#00d4ff] uppercase mb-5">
                AI Module Status
              </p>
              <div className="grid grid-cols-2 gap-3">
                {AI_MODULES.map((mod) => {
                  const Icon = mod.icon
                  return (
                    <Link key={mod.name} to={mod.href}
                      className={`p-4 rounded-xl border transition-all group ${
                        mod.active
                          ? 'border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]'
                          : 'border-white/5 bg-transparent opacity-40'
                      }`}>
                      <div className="flex items-center justify-between mb-3">
                        <Icon className="w-4 h-4" style={{ color: mod.active ? mod.color : '#4a7a9b' }} />
                        <div className={`w-1.5 h-1.5 rounded-full ${mod.active ? 'bg-[#00ff88] animate-pulse' : 'bg-white/20'}`} />
                      </div>
                      <div className="text-xs font-bold text-white mb-0.5 group-hover:text-[#00d4ff] transition-colors">{mod.name}</div>
                      <div className="text-[10px] text-white/35">{mod.desc}</div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
