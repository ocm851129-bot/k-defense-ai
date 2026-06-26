import { Link } from 'react-router-dom'
import { Shield, Terminal } from 'lucide-react'

const SOL_LINKS = [
  { code: 'SOL-01', label: '전장 AI',    href: '/sol/01' },
  { code: 'SOL-02', label: '사이버 방어', href: '/sol/02' },
  { code: 'SOL-03', label: 'GEOINT',     href: '/sol/03' },
  { code: 'SOL-04', label: 'SIGINT',     href: '/sol/04' },
  { code: 'SOL-05', label: 'IMINT',      href: '/sol/05' },
  { code: 'SOL-06', label: '의사결정 AI', href: '/sol/06' },
]

const NAV_LINKS = [
  { label: '메인',        href: '/' },
  { label: '인텔리전스',   href: '/#intelligence' },
  { label: '성능 분석',   href: '/#analytics' },
  { label: '무기 데이터베이스', href: '/weapons' },
  { label: '보고서',      href: '/#reports' },
  { label: '도입 문의',   href: '/#contact' },
]

export default function Footer() {
  return (
    <footer className="relative bg-[#0a0a0a] border-t border-white/[0.05] font-inter">

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-14">

          {/* 브랜드 */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="relative w-8 h-8 shrink-0">
                <div className="absolute inset-0 bg-[#00d4ff]/15 rotate-45" />
                <Shield className="absolute inset-0 m-auto w-4 h-4 text-[#00d4ff]" />
              </div>
              <div>
                <div className="text-[8px] font-bold tracking-[0.3em] text-[#00d4ff]/50 uppercase">Meta ICT</div>
                <div className="text-sm font-black tracking-[0.1em] text-white uppercase">K-Defense AI Intelligence</div>
              </div>
            </div>
            <p className="text-white/35 text-sm leading-relaxed max-w-xs mb-6">
              메타아이씨티의 AI 기술로 대한민국 방위 인텔리전스를 혁신합니다. 6대 AI 시스템이 24/7 실시간 분석을 제공합니다.
            </p>
            <Link to="/command"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#00d4ff]/10 border border-[#00d4ff]/25 text-[#00d4ff] text-[10px] font-black tracking-[0.12em] uppercase rounded-full hover:bg-[#00d4ff]/15 transition-all">
              <Terminal className="w-3.5 h-3.5" /> 지휘 센터 접속
            </Link>
          </div>

          {/* AI 솔루션 */}
          <div>
            <p className="text-[9px] font-black tracking-[0.2em] text-white/25 uppercase mb-5">AI 솔루션</p>
            <ul className="space-y-3">
              {SOL_LINKS.map((s) => (
                <li key={s.code}>
                  <Link to={s.href}
                    className="flex items-center gap-2 text-sm text-white/40 hover:text-white/80 transition-colors">
                    <span className="text-[8px] font-black text-[#00d4ff]/30">{s.code}</span>
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 플랫폼 */}
          <div>
            <p className="text-[9px] font-black tracking-[0.2em] text-white/25 uppercase mb-5">플랫폼</p>
            <ul className="space-y-3">
              {NAV_LINKS.map((item) => (
                <li key={item.label}>
                  <Link to={item.href}
                    className="text-sm text-white/40 hover:text-white/80 transition-colors block">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 하단 바 */}
        <div className="pt-8 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse" />
              <span className="text-[9px] font-bold text-[#00ff88] uppercase tracking-[0.15em]">All Systems Operational</span>
            </div>
            <span className="text-white/15 text-[9px]">·</span>
            <span className="text-[9px] font-mono text-white/25">v2.4.0</span>
          </div>
          <p className="text-[10px] text-white/20">© 2026 메타아이씨티 주식회사. All rights reserved.</p>
          <p className="text-[9px] font-mono text-white/15">CLASSIFIED SYSTEM // AUTHORIZED ACCESS ONLY</p>
        </div>
      </div>
    </footer>
  )
}
