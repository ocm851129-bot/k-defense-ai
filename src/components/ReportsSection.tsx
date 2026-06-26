import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ChevronRight, Clock } from 'lucide-react'

const REPORTS = [
  {
    category: '위협 분석', date: '2026-06-18',
    title: '2026 상반기 사이버 위협 동향 분석',
    desc: 'AI 기반 탐지 엔진이 분석한 국방 분야 사이버 위협 패턴과 대응 전략을 종합합니다.',
    tags: ['사이버보안', 'AI분석'],
    accent: '#ff2d55', level: 'RESTRICTED',
  },
  {
    category: '지역 인텔리전스', date: '2026-06-15',
    title: '한반도 주변 전략 환경 변화 및 AI 모니터링',
    desc: '위성 데이터와 오픈소스 인텔리전스를 AI로 융합 분석한 전략 환경 평가서입니다.',
    tags: ['지역분석', 'GEOINT'],
    accent: '#00d4ff', level: 'CLASSIFIED',
  },
  {
    category: '기술 동향', date: '2026-06-12',
    title: '방산 AI 기술 트렌드: 자율 시스템과 융합',
    desc: '글로벌 방산 AI 기술 동향과 메타아이씨티 R&D 방향성을 정리한 기술 보고서입니다.',
    tags: ['AI기술', '자율시스템'],
    accent: '#00ff88', level: 'INTERNAL',
  },
  {
    category: '신호 인텔리전스', date: '2026-06-10',
    title: 'AI 신호 분류 성능 평가 — 전자전 환경',
    desc: 'LSTM 기반 신호 분류 모델의 전자전 환경 적용 성능 테스트 결과와 개선 방안을 담습니다.',
    tags: ['SIGINT', '전자전'],
    accent: '#ffcc00', level: 'INTERNAL',
  },
  {
    category: '작전 분석', date: '2026-06-07',
    title: 'AI 기반 의사결정 지원 시스템 운용 리포트',
    desc: '전방 지휘소에 배치된 AI 의사결정 지원 시스템의 운용 효과와 개선 사항을 보고합니다.',
    tags: ['의사결정AI', '지휘통제'],
    accent: '#ff6b35', level: 'RESTRICTED',
  },
  {
    category: '연구 결과', date: '2026-06-03',
    title: '멀티모달 인텔리전스 융합 알고리즘 연구',
    desc: '이미지·신호·텍스트 데이터를 통합 처리하는 멀티모달 AI 아키텍처의 연구 성과를 공개합니다.',
    tags: ['멀티모달AI', '알고리즘'],
    accent: '#c084fc', level: 'INTERNAL',
  },
]

const LEVEL_BADGE: Record<string, { color: string; bg: string }> = {
  RESTRICTED: { color: '#ff2d55', bg: '#ff2d5518' },
  CLASSIFIED: { color: '#ff6b35', bg: '#ff6b3518' },
  INTERNAL:   { color: '#00ff88', bg: '#00ff8818' },
}

export default function ReportsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="reports" className="relative bg-[#f8f6f2] py-28 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00d4ff]/15 to-transparent" />

      <div ref={ref} className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* 헤더 */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14">
          <div>
            <p className="text-gray-400 text-[10px] tracking-[0.3em] uppercase font-black mb-4">Intelligence Reports</p>
            <h2 className="font-black text-gray-900 text-[2rem] sm:text-[3rem] lg:text-[3.75rem] leading-[1.05] tracking-tight">
              최신 보고서
            </h2>
          </div>
          <a href="/board/reports"
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
            전체 보기 <ChevronRight className="w-4 h-4" />
          </a>
        </motion.div>

        {/* 보고서 카드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {REPORTS.map((r, i) => {
            const badge = LEVEL_BADGE[r.level]
            return (
              <motion.article key={i}
                initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="group bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md hover:border-gray-200 transition-all cursor-pointer flex flex-col">

                {/* 상단 메타 */}
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[9px] font-bold px-2.5 py-1 rounded-full"
                    style={{ color: r.accent, background: `${r.accent}12`, border: `1px solid ${r.accent}20` }}>
                    {r.category}
                  </span>
                  <span className="text-[8px] font-bold px-2 py-1 rounded"
                    style={{ color: badge.color, background: badge.bg }}>
                    {r.level}
                  </span>
                </div>

                {/* 날짜 */}
                <div className="flex items-center gap-1.5 mb-3">
                  <Clock className="w-3 h-3 text-gray-300" />
                  <span className="text-[10px] text-gray-400 font-mono">{r.date}</span>
                </div>

                <h3 className="text-sm font-semibold text-gray-900 mb-2 leading-snug group-hover:text-gray-700 transition-colors line-clamp-2 flex-1">
                  {r.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed mb-4 line-clamp-2">
                  {r.desc}
                </p>

                {/* 태그 + 읽기 */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                  <div className="flex gap-1.5">
                    {r.tags.map((t) => (
                      <span key={t} className="text-[9px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">{t}</span>
                    ))}
                  </div>
                  <span className="text-[10px] font-medium text-gray-300 group-hover:text-gray-500 transition-colors flex items-center gap-1">
                    열람 <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
