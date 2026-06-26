import { Shield, Terminal } from 'lucide-react'
import { Link } from 'react-router-dom'

const SOL_LINKS = [
  { code: 'SOL-01', label: '전장 AI', href: '/sol/01' },
  { code: 'SOL-02', label: '사이버 방어', href: '/sol/02' },
  { code: 'SOL-03', label: 'GEOINT', href: '/sol/03' },
  { code: 'SOL-04', label: 'SIGINT', href: '/sol/04' },
  { code: 'SOL-05', label: 'IMINT', href: '/sol/05' },
  { code: 'SOL-06', label: '의사결정 AI', href: '/sol/06' },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-[#00d4ff]/08 mt-8">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00d4ff]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 bg-[#00d4ff]/15 rotate-45" />
                <Shield className="absolute inset-0 m-auto w-4 h-4 text-[#00d4ff]" />
              </div>
              <div>
                <div className="text-[9px] font-bold tracking-[0.3em] text-[#00d4ff]/60 uppercase">Meta ICT</div>
                <div className="text-[13px] font-black tracking-[0.12em] text-white uppercase">K-Defense AI Intelligence</div>
              </div>
            </div>
            <p className="text-[12px] text-[#4a7a9b] leading-relaxed max-w-xs mb-4">
              메타아이씨티의 AI 기술로 대한민국 방위 인텔리전스를 혁신합니다. 6대 AI 시스템이 24/7 실시간 분석을 제공합니다.
            </p>
            <Link
              to="/command"
              className="clip-corner-sm inline-flex items-center gap-1.5 px-4 py-2 bg-[#00d4ff]/10 border border-[#00d4ff]/30 text-[#00d4ff] text-[10px] font-black tracking-[0.12em] uppercase hover:bg-[#00d4ff]/20 transition-all"
            >
              <Terminal className="w-3 h-3" />
              지휘 센터 접속
            </Link>
          </div>

          {/* Solutions */}
          <div>
            <div className="text-[9px] font-black tracking-[0.2em] text-[#00d4ff] uppercase mb-4">AI 솔루션</div>
            <ul className="space-y-2">
              {SOL_LINKS.map((s) => (
                <li key={s.code}>
                  <Link
                    to={s.href}
                    className="flex items-center gap-2 text-[11px] text-[#4a7a9b] hover:text-[#00d4ff] transition-colors"
                  >
                    <span className="text-[8px] font-black text-[#00d4ff]/40">{s.code}</span>
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <div className="text-[9px] font-black tracking-[0.2em] text-[#00d4ff] uppercase mb-4">플랫폼</div>
            <ul className="space-y-2">
              {[
                { label: '메인', href: '/' },
                { label: '인텔리전스 센터', href: '/#intelligence' },
                { label: '성능 분석', href: '/#analytics' },
                { label: '보고서', href: '/#reports' },
                { label: '도입 문의', href: '/#contact' },
                { label: '통합 지휘 센터', href: '/command' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className="text-[11px] text-[#4a7a9b] hover:text-[#00d4ff] transition-colors block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-[#0a3050] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse" />
              <span className="text-[9px] font-bold text-[#00ff88] uppercase tracking-[0.15em]">All Systems Operational</span>
            </div>
            <span className="text-[#2a4a5e] text-[9px]">·</span>
            <span className="text-[9px] font-mono text-[#4a7a9b]">v2.4.0</span>
          </div>
          <p className="text-[10px] text-[#2a4a5e]">
            © 2026 메타아이씨티 주식회사. All rights reserved.
          </p>
          <p className="text-[9px] font-mono text-[#2a4a5e]">
            CLASSIFIED SYSTEM // AUTHORIZED ACCESS ONLY
          </p>
        </div>
      </div>
    </footer>
  )
}
