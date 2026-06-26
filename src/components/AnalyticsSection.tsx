import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { TrendingUp, Database, Cpu, Globe } from 'lucide-react'

type StatItem = {
  icon: typeof Database
  value: number
  suffix: string
  label: string
  unit: string
  color: string
  decimal?: number
  displayFn: (n: number) => string
}

const STATS: StatItem[] = [
  {
    icon: Database,
    value: 487,
    suffix: '',
    label: '일일 분석 데이터포인트',
    unit: '십만 건',
    color: '#00d4ff',
    displayFn: (n) => `${n * 10}만+`,
  },
  {
    icon: TrendingUp,
    value: 997,
    suffix: '%',
    label: '위협 탐지 정확도',
    unit: '',
    color: '#00ff88',
    displayFn: (n) => `${(n / 10).toFixed(1)}%`,
  },
  {
    icon: Cpu,
    value: 3,
    suffix: 's',
    label: '평균 응답 시간',
    unit: '',
    color: '#ffcc00',
    displayFn: (n) => `0.${n}s`,
  },
  {
    icon: Globe,
    value: 34,
    suffix: '',
    label: '모니터링 구역',
    unit: '개',
    color: '#ff6b35',
    displayFn: (n) => `${n}개`,
  },
]

const CHART_DATA = [62, 45, 78, 55, 88, 72, 91, 68, 84, 76, 93, 87]
const MONTHS = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']

function AnimatedStat({ stat, inView }: { stat: StatItem; inView: boolean }) {
  const [count, setCount] = useState(0)
  const Icon = stat.icon

  useEffect(() => {
    if (!inView) return
    let startTime: number
    const duration = 2200
    const step = (ts: number) => {
      if (!startTime) startTime = ts
      const progress = Math.min((ts - startTime) / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(ease * stat.value))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, stat.value])

  return (
    <div className="clip-corner bg-[#041526]/80 border border-[#00d4ff]/10 p-6 glow-border text-center">
      <Icon className="w-5 h-5 mx-auto mb-4" style={{ color: stat.color }} />
      <div className="text-3xl font-black number-mono mb-1" style={{ color: stat.color }}>
        {stat.displayFn(count)}
      </div>
      <div className="text-[10px] font-bold tracking-[0.1em] text-[#4a7a9b] uppercase leading-tight">
        {stat.label}
      </div>
    </div>
  )
}

export default function AnalyticsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const maxVal = Math.max(...CHART_DATA)

  return (
    <section id="analytics" className="relative py-24">
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#020b18] via-[#041526]/30 to-[#020b18]" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#00d4ff]" />
            <span className="text-[10px] font-black tracking-[0.3em] text-[#00d4ff] uppercase">Analytics & Performance</span>
            <div className="w-8 h-px bg-[#00d4ff]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            AI <span className="text-[#00d4ff] glow-text">분석</span> 성능 지표
          </h2>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <AnimatedStat stat={stat} inView={inView} />
            </motion.div>
          ))}
        </div>

        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="clip-corner bg-[#041526]/80 border border-[#00d4ff]/10 p-6 glow-border"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-[10px] font-black tracking-[0.2em] text-[#00d4ff] uppercase mb-1">
                Monthly Threat Activity Index
              </div>
              <div className="text-xs text-[#4a7a9b]">2025년 위협 활동 지수 추이</div>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-[#00d4ff]" />
              <span className="text-[10px] text-[#4a7a9b]">위협 활동 지수</span>
            </div>
          </div>

          <div className="flex items-end gap-2 h-40">
            {CHART_DATA.map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <motion.div
                  initial={{ height: 0 }}
                  animate={inView ? { height: `${(val / maxVal) * 100}%` } : { height: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 + i * 0.05, ease: 'easeOut' }}
                  className="w-full rounded-t-sm relative overflow-hidden"
                  style={{
                    background: `linear-gradient(180deg, #00d4ff, #00d4ff44)`,
                    minHeight: 4,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/10" />
                </motion.div>
                <span className="text-[8px] text-[#4a7a9b] font-mono">{MONTHS[i]}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
