import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Shield, Globe, Cpu, Lock, Radio, Eye, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const SOLUTIONS = [
  {
    icon: Shield, code: 'SOL-01', href: '/sol/01',
    title: '전장 인텔리전스 AI',
    subtitle: 'Battlefield Intelligence',
    desc: '다중 센서 데이터를 통합 분석하여 전장 상황을 실시간으로 인식하고 위협 우선순위를 자동 결정합니다.',
    tags: ['다중센서 융합', 'LSTM 패턴 인식', '자동 위협 분류'],
    color: '#00d4ff',
  },
  {
    icon: Lock, code: 'SOL-02', href: '/sol/02',
    title: '사이버 위협 탐지',
    subtitle: 'Cyber Threat Detection',
    desc: '국방망 및 군 통신 인프라에 대한 사이버 침투를 실시간으로 탐지하고 자동 대응합니다.',
    tags: ['침투 탐지', '이상 행위 분석', '자동 격리 대응'],
    color: '#ff2d55',
  },
  {
    icon: Globe, code: 'SOL-03', href: '/sol/03',
    title: '지역 정보 분석',
    subtitle: 'GEOINT Analytics',
    desc: '위성·항공 영상과 지리 데이터를 AI로 분석하여 적 시설, 이동 패턴, 전략적 위협 요소를 식별합니다.',
    tags: ['GEOINT', '위성 영상 분석', '이동 추적'],
    color: '#00ff88',
  },
  {
    icon: Radio, code: 'SOL-04', href: '/sol/04',
    title: '신호 인텔리전스',
    subtitle: 'SIGINT Processing',
    desc: 'AI 기반 전자기 신호 분류 및 통신 패턴 분석으로 적의 통신·레이더 신호를 자동 분석합니다.',
    tags: ['전자신호 분류', '주파수 분석', '통신 패턴'],
    color: '#ffcc00',
  },
  {
    icon: Eye, code: 'SOL-05', href: '/sol/05',
    title: '광학 영상 AI',
    subtitle: 'IMINT Vision AI',
    desc: '드론·감시 카메라 영상을 실시간 분석하여 침투자 탐지, 차량 분류, 위험 행동 식별을 자동화합니다.',
    tags: ['실시간 객체 탐지', '행동 분석', '자동 경보'],
    color: '#ff6b35',
  },
  {
    icon: Cpu, code: 'SOL-06', href: '/sol/06',
    title: '전략 의사결정 AI',
    subtitle: 'Decision Support AI',
    desc: '수집된 모든 인텔리전스를 종합하여 지휘관의 전략적 의사결정을 위한 시나리오 분석 및 대응안을 제시합니다.',
    tags: ['시나리오 시뮬레이션', '위험도 평가', '대응안 생성'],
    color: '#c084fc',
  },
]

export default function SolutionsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="solutions" className="relative bg-[#0a0a0a] py-28 overflow-hidden">
      {/* 배경 글로우 */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[400px] opacity-[0.04] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at bottom left, #c084fc, transparent)' }} />
      <div className="absolute top-0 right-0 w-[400px] h-[300px] opacity-[0.04] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top right, #00d4ff, transparent)' }} />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* 헤더 */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }} className="mb-16">
          <p className="text-[#00d4ff]/50 text-[10px] tracking-[0.3em] uppercase font-black mb-4">Defense Solutions</p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="font-black text-white text-[2rem] sm:text-[3rem] lg:text-[3.75rem] leading-[1.05] tracking-tight max-w-xl">
              핵심 방산 AI 솔루션
            </h2>
            <p className="text-white/35 text-sm max-w-xs leading-relaxed sm:text-right">
              6대 AI 시스템으로 대한민국 방위 인텔리전스를 강화합니다.
            </p>
          </div>
        </motion.div>

        {/* 솔루션 카드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SOLUTIONS.map((sol, i) => {
            const Icon = sol.icon
            return (
              <motion.div key={sol.code}
                initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.08 }}>
                <Link to={sol.href}
                  className="group block bg-white/[0.03] border border-white/8 rounded-2xl p-7 hover:bg-white/[0.06] hover:border-white/15 transition-all duration-400 h-full">

                  {/* 상단 */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: `${sol.color}15`, border: `1px solid ${sol.color}25` }}>
                      <Icon className="w-5 h-5" style={{ color: sol.color }} />
                    </div>
                    <span className="text-[9px] font-black tracking-[0.2em]" style={{ color: sol.color }}>
                      {sol.code}
                    </span>
                  </div>

                  <p className="text-[9px] font-bold tracking-[0.15em] text-white/30 uppercase mb-1.5">
                    {sol.subtitle}
                  </p>
                  <h3 className="font-black text-white text-xl mb-3 group-hover:text-white transition-colors leading-tight">
                    {sol.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-5 group-hover:text-white/65 transition-colors">
                    {sol.desc}
                  </p>

                  {/* 태그 */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {sol.tags.map((tag) => (
                      <span key={tag} className="text-[9px] font-medium px-2.5 py-1 rounded-full"
                        style={{ color: sol.color, background: `${sol.color}12`, border: `1px solid ${sol.color}20` }}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* 하단 호버 */}
                  <div className="flex items-center gap-1 text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: sol.color }}>
                    자세히 보기 <ChevronRight className="w-3 h-3" />
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
