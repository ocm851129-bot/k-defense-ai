import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const STATS = [
  { value: 997, label: '위협 탐지 정확도', unit: '',    accent: '#00d4ff', display: (n: number) => `${(n / 10).toFixed(1)}%` },
  { value: 3,   label: '평균 응답 시간',   unit: 'sec', accent: '#00ff88', display: (n: number) => `0.${n}s` },
  { value: 34,  label: '모니터링 구역',    unit: '개',  accent: '#ffcc00', display: (n: number) => `${n}개` },
  { value: 487, label: '일일 분석 데이터', unit: '만+', accent: '#ff6b35', display: (n: number) => `${n * 10}만+` },
]

const CHART_DATA = [62, 45, 78, 55, 88, 72, 91, 68, 84, 76, 93, 87]
const MONTHS = ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']

const THREAT_TREND = [
  { label: '핵·미사일 활동', val: 87, color: '#ff2d55' },
  { label: '사이버 침투 시도', val: 74, color: '#ff6b35' },
  { label: '해상 침범 빈도',  val: 52, color: '#ffcc00' },
  { label: '무인기 침범',     val: 68, color: '#c084fc' },
]

function CountUp({ to, display, accent, inView }: { to: number; display: (n: number) => string; accent: string; inView: boolean }) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!inView) return
    let start: number
    const raf = (ts: number) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / 1800, 1)
      setVal(Math.floor((1 - Math.pow(1 - p, 3)) * to))
      if (p < 1) requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  }, [inView, to])
  return <span style={{ color: accent }}>{display(val)}</span>
}

export default function AnalyticsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const maxVal = Math.max(...CHART_DATA)

  return (
    <section id="analytics" className="relative bg-[#f8f6f2] py-28 overflow-hidden font-inter">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00d4ff]/20 to-transparent" />

      <div ref={ref} className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* 헤더 */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }} className="text-center mb-16">
          <p className="text-gray-400 text-[10px] tracking-[0.3em] uppercase font-black mb-4">Analytics & Performance</p>
          <h2 className="font-askan text-gray-900 text-[2rem] sm:text-[3rem] lg:text-[3.75rem] leading-[1.05] tracking-tight">
            AI 분석 성능 지표
          </h2>
          <p className="mt-4 text-gray-400 text-sm max-w-lg mx-auto leading-relaxed">
            K-Defense AI 시스템이 24시간 처리하는 실시간 위협 분석 현황
          </p>
        </motion.div>

        {/* 스탯 카드 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {STATS.map((s, i) => (
            <motion.div key={s.label}
              initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 text-center shadow-sm">
              <div className="font-askan text-3xl sm:text-4xl mb-3">
                <CountUp to={s.value} display={s.display} accent={s.accent} inView={inView} />
              </div>
              <p className="text-gray-500 text-xs sm:text-sm">{s.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

          {/* 월별 위협 활동 차트 */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-[10px] font-black tracking-[0.2em] text-gray-400 uppercase mb-1">Monthly Threat Activity</p>
                <p className="text-sm font-semibold text-gray-700">2026년 위협 활동 지수 추이</p>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#00d4ff]" />
                <span className="text-[10px] text-gray-400">위협 지수</span>
              </div>
            </div>
            <div className="flex items-end gap-1.5 h-40">
              {CHART_DATA.map((val, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                  <motion.div
                    initial={{ height: 0 }} animate={inView ? { height: `${(val / maxVal) * 100}%` } : { height: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 + i * 0.05, ease: 'easeOut' }}
                    className="w-full rounded-t-lg relative overflow-hidden"
                    style={{ background: `linear-gradient(180deg, #00d4ff, #00d4ff44)`, minHeight: 4 }}>
                    <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20" />
                  </motion.div>
                  <span className="text-[8px] text-gray-400 font-mono">{MONTHS[i]}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 위협 유형별 강도 */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <p className="text-[10px] font-black tracking-[0.2em] text-gray-400 uppercase mb-6">위협 유형별 강도</p>
            <div className="space-y-5">
              {THREAT_TREND.map((t, i) => (
                <motion.div key={t.label}
                  initial={{ opacity: 0, x: -12 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.6 + i * 0.08 }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">{t.label}</span>
                    <span className="text-sm font-mono font-bold" style={{ color: t.color }}>{t.val}</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${t.val}%` }}
                      viewport={{ once: true }} transition={{ duration: 1, ease: 'easeOut', delay: 0.1 }}
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg, ${t.color}60, ${t.color})` }} />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
