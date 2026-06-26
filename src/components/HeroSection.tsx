import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260618_174853_aac61aa2-0f3f-4cf1-bc78-7f657dd11164.mp4'

const FEATURE_PILLS = ['Smart Therapy', 'Real-time Healing', 'Insights into outcomes']

const NAV_LINKS = ['Story', 'Benefits', 'Connect']

// ── Aurai 핀휠 로고 ───────────────────────────────────────────────────────────

function AuraiLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 256 256" className={className} fill="currentColor" aria-hidden="true">
      <path d="M 228 0 C 172.772 0 128 44.772 128 100 L 128 0 L 0 0 L 0 28 C 0 83.228 44.772 128 100 128 L 0 128 L 0 256 L 28 256 C 83.228 256 128 211.228 128 156 L 128 256 L 256 256 L 256 228 C 256 172.772 211.228 128 156 128 L 256 128 L 256 0 Z" />
    </svg>
  )
}

// ── 메인 컴포넌트 ─────────────────────────────────────────────────────────────

export default function HeroSection() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [email, setEmail]       = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    alert(`Thank you! We'll reach out to ${email}`)
    setEmail('')
  }

  return (
    <section className="relative w-full h-screen overflow-hidden font-inter">

      {/* ── 비디오 배경 ── */}
      <video
        autoPlay loop muted playsInline
        className="absolute inset-0 w-full h-full object-cover [object-position:80%_center] md:[object-position:right_center] lg:[object-position:center_center]"
      >
        <source src={VIDEO_URL} type="video/mp4" />
      </video>

      {/* ── 콘텐츠 레이어 ── */}
      <div className="absolute inset-0 z-10 flex flex-col px-4 sm:px-10 lg:px-12 py-4 sm:py-8">

        {/* ── 내비게이션 ── */}
        <nav className="flex items-center justify-between">

          {/* 왼쪽 글래스 필 */}
          <div className="bg-black/20 backdrop-blur-md rounded-2xl border border-white/10 px-4 py-2.5 sm:px-6 sm:py-4 flex items-center">
            <AuraiLogo className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
            <span className="font-askan text-white text-base sm:text-xl tracking-wide ml-2">
              Aurai
            </span>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="메뉴"
              className="ml-4 sm:ml-32 md:ml-64 lg:ml-96 text-white focus:outline-none"
            >
              {menuOpen
                ? <X className="w-5 h-5" />
                : <Menu className="w-5 h-5" />
              }
            </button>
          </div>

          {/* 오른쪽 버튼 (데스크톱) */}
          <button className="hidden sm:block bg-white text-gray-900 font-medium text-sm px-6 py-3 rounded-full hover:bg-white/90 transition-colors">
            Join the list
          </button>
        </nav>

        {/* ── 모바일 메뉴 ── */}
        {menuOpen && (
          <div className="sm:hidden absolute top-[4.5rem] left-4 right-4 bg-black/30 backdrop-blur-xl rounded-2xl p-5 border border-white/10 z-20">
            <div className="flex flex-col gap-4">
              {NAV_LINKS.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  className="text-white font-medium hover:text-white/80 transition-colors"
                >
                  {item}
                </a>
              ))}
              <button className="w-full mt-2 bg-white text-gray-900 font-medium text-sm px-6 py-3 rounded-full hover:bg-white/90 transition-colors">
                Join the list
              </button>
            </div>
          </div>
        )}

        {/* 모바일 스페이서 */}
        <div className="flex-1 sm:hidden" />

        {/* ── 메인 콘텐츠 ── */}
        <div className="flex flex-col sm:flex-1 sm:flex-row sm:items-end pb-4 sm:pb-12 lg:pb-16 sm:mt-auto gap-4 sm:gap-0">

          {/* 왼쪽 컬럼 */}
          <div className="flex flex-col gap-4">

            {/* 헤딩 */}
            <h1 className="font-askan text-white text-[2rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] leading-[1.05] tracking-tight max-w-[700px]">
              Your calm is always within.
            </h1>

            {/* 서브타이틀 */}
            <p className="text-white/70 text-xs sm:text-base md:text-lg max-w-[520px] leading-relaxed">
              Aurai is your always-on wellness companion. Built by leading therapists,
              it brings you the care and clarity right when you need it.
            </p>

            {/* 이메일 폼 */}
            <form
              onSubmit={handleSubmit}
              className="relative flex items-center bg-black/30 backdrop-blur-md rounded-full border border-white/10 max-w-[480px]"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 bg-transparent text-white placeholder-white/50 text-sm px-4 sm:px-6 py-3 sm:py-4 outline-none min-w-0"
              />
              <button
                type="submit"
                className="absolute right-1.5 bg-white text-gray-900 text-xs sm:text-sm font-medium px-3 sm:px-6 py-2 sm:py-3 rounded-full hover:bg-white/90 transition-colors whitespace-nowrap"
              >
                Join the list
              </button>
            </form>

            {/* 피처 필 (모바일) */}
            <div className="flex sm:hidden flex-wrap gap-2 mt-2">
              {FEATURE_PILLS.map((pill) => (
                <span
                  key={pill}
                  className="bg-black/30 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full border border-white/10"
                >
                  {pill}
                </span>
              ))}
            </div>
          </div>

          {/* 오른쪽 컬럼 — 피처 필 (데스크톱) */}
          <div className="hidden sm:flex flex-col items-end gap-2 self-end ml-auto">
            {FEATURE_PILLS.map((pill) => (
              <span
                key={pill}
                className="bg-black/30 backdrop-blur-md text-white text-xs sm:text-sm px-4 py-2 rounded-full border border-white/10"
              >
                {pill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
