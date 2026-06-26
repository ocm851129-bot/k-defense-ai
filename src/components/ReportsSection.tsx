import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FileText, ChevronRight, Clock, Tag } from 'lucide-react'

const REPORTS = [
  {
    category: '위협 분석',
    date: '2026-06-18',
    title: '2026년 상반기 사이버 위협 동향 분석 보고서',
    desc: 'AI 기반 탐지 엔진이 분석한 국방 분야 사이버 위협 패턴과 대응 전략을 종합합니다.',
    tags: ['사이버보안', 'AI분석', '2026상반기'],
    color: '#ff2d55',
    level: 'RESTRICTED',
  },
  {
    category: '지역 인텔리전스',
    date: '2026-06-15',
    title: '한반도 주변 전략 환경 변화 및 AI 모니터링 현황',
    desc: '위성 데이터와 오픈소스 인텔리전스를 AI로 융합 분석한 전략 환경 평가서입니다.',
    tags: ['지역분석', 'GEOINT', '전략평가'],
    color: '#00d4ff',
    level: 'CLASSIFIED',
  },
  {
    category: '기술 동향',
    date: '2026-06-12',
    title: '방산 AI 기술 트렌드: 자율 시스템과 인텔리전스 융합',
    desc: '글로벌 방산 AI 기술 동향과 메타아이씨티의 R&D 방향성을 정리한 기술 보고서입니다.',
    tags: ['AI기술', '자율시스템', 'R&D'],
    color: '#00ff88',
    level: 'INTERNAL',
  },
  {
    category: '신호 인텔리전스',
    date: '2026-06-10',
    title: '전자전 환경에서의 AI 신호 분류 성능 평가',
    desc: 'LSTM 기반 신호 분류 모델의 전자전 환경 적용 성능 테스트 결과와 개선 방안을 담습니다.',
    tags: ['SIGINT', '전자전', '성능평가'],
    color: '#ffcc00',
    level: 'INTERNAL',
  },
  {
    category: '작전 분석',
    date: '2026-06-07',
    title: 'AI 기반 의사결정 지원 시스템 운용 현황 리포트',
    desc: '전방 지휘소에 배치된 AI 의사결정 지원 시스템의 운용 효과와 개선 사항을 보고합니다.',
    tags: ['의사결정AI', '지휘통제', '운용평가'],
    color: '#ff6b35',
    level: 'RESTRICTED',
  },
  {
    category: '연구 결과',
    date: '2026-06-03',
    title: '멀티모달 인텔리전스 융합 알고리즘 연구 성과',
    desc: '이미지·신호·텍스트 데이터를 통합 처리하는 멀티모달 AI 아키텍처의 연구 성과를 공개합니다.',
    tags: ['멀티모달AI', '알고리즘', '연구성과'],
    color: '#c084fc',
    level: 'INTERNAL',
  },
]

const LEVEL_COLORS: Record<string, string> = {
  RESTRICTED: '#ff2d55',
  CLASSIFIED: '#ff6b35',
  INTERNAL: '#00ff88',
}

export default function ReportsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="reports" className="relative py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-[#020b18] via-[#041526]/20 to-[#020b18]" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#00d4ff]" />
              <span className="text-[10px] font-black tracking-[0.3em] text-[#00d4ff] uppercase">Intelligence Reports</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white">
              최신 <span className="text-[#00d4ff] glow-text">보고서</span>
            </h2>
          </div>
          <a
            href="#"
            className="hidden md:flex items-center gap-1.5 text-[11px] font-bold tracking-[0.1em] text-[#00d4ff] hover:text-white transition-colors"
          >
            전체 보기 <ChevronRight className="w-3.5 h-3.5" />
          </a>
        </motion.div>

        {/* Report Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {REPORTS.map((report, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="clip-corner bg-[#041526]/80 border border-[#00d4ff]/10 p-5 glow-border group cursor-pointer"
            >
              {/* Top Meta */}
              <div className="flex items-center justify-between mb-4">
                <span
                  className="text-[9px] font-black tracking-[0.15em] px-2 py-1"
                  style={{ color: report.color, background: `${report.color}12`, border: `1px solid ${report.color}25` }}
                >
                  {report.category}
                </span>
                <span
                  className="text-[8px] font-black tracking-[0.12em] px-2 py-1"
                  style={{ color: LEVEL_COLORS[report.level], background: `${LEVEL_COLORS[report.level]}12` }}
                >
                  {report.level}
                </span>
              </div>

              <div className="flex items-center gap-1.5 mb-3">
                <FileText className="w-3.5 h-3.5 text-[#4a7a9b]" />
                <div className="flex items-center gap-1 text-[10px] text-[#4a7a9b]">
                  <Clock className="w-2.5 h-2.5" />
                  <span className="font-mono">{report.date}</span>
                </div>
              </div>

              <h3 className="text-[13px] font-black text-white mb-2 leading-snug group-hover:text-[#00d4ff] transition-colors line-clamp-2">
                {report.title}
              </h3>
              <p className="text-[11px] text-[#4a7a9b] leading-relaxed mb-4 line-clamp-2">
                {report.desc}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {report.tags.map((tag) => (
                  <span key={tag} className="flex items-center gap-1 text-[9px] text-[#4a7a9b]">
                    <Tag className="w-2 h-2" />
                    {tag}
                  </span>
                ))}
              </div>

              {/* Read More */}
              <div className="flex items-center gap-1 text-[10px] font-bold text-[#00d4ff]/0 group-hover:text-[#00d4ff] transition-colors">
                보고서 열람 <ChevronRight className="w-3 h-3" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
