import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Terminal, ChevronRight, Shield, Zap, Activity } from 'lucide-react'
import { Link } from 'react-router-dom'
import GlobeVisualization from './GlobeVisualization'

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260618_174853_aac61aa2-0f3f-4cf1-bc78-7f657dd11164.mp4'

const TYPING_TEXTS = [
  'AI 기반 방위 인텔리전스 플랫폼',
  '실시간 위협 탐지 시스템',
  '전략적 안보 분석 솔루션',
  '차세대 방산 AI 기술',
]

const STATUS_LINES = [
  { delay: 0,   text: '> INITIALIZING K-DEFENSE AI INTELLIGENCE PLATFORM...' },
  { delay: 0.4, text: '> LOADING NEURAL NETWORK MODELS [████████████] 100%' },
  { delay: 0.8, text: '> ESTABLISHING SECURE CONNECTIONS TO 34 SECTORS...' },
  { delay: 1.2, text: '> ALL SYSTEMS OPERATIONAL ✓' },
]

const STATS = [
  { icon: Activity, value: '99.7%', label: '탐지 정확도' },
  { icon: Zap,      value: '<0.3s', label: '실시간 분석' },
  { icon: Shield,   value: '2,400+', label: '위협 패턴 DB' },
  { icon: Terminal, value: '6개',    label: 'AI 모듈' },
]

// ── 타이핑 텍스트 ─────────────────────────────────────────────────────────────

function TypingText() {
  const [idx, setIdx]           = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => {
    const target = TYPING_TEXTS[idx]
    if (!deleting) {
      if (displayed.length < target.length) {
        timer.current = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 55)
      } else {
        timer.current = setTimeout(() => setDeleting(true), 2200)
      }
    } else {
      if (displayed.length > 0) {
        timer.current = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 28)
      } else {
        setDeleting(false)
        setIdx((p) => (p + 1) % TYPING_TEXTS.length)
      }
    }
    return () => clearTimeout(timer.current)
  }, [displayed, deleting, idx])

  return (
    <span className="text-[#00d4ff]">
      {displayed}
      <span className="animate-[blink_1s_step-end_infinite]">|</span>
    </span>
  )
}

// ── 메인 컴포넌트 ─────────────────────────────────────────────────────────────

export default function HeroSection() {
  return (
    <section id="home" className="relative w-full min-h-screen flex flex-col overflow-hidden">

      {/* ── 비디오 배경 ── */}
      <video
        autoPlay loop muted playsInline
        className="absolute inset-0 w-full h-full object-cover [object-position:80%_center] md:[object-position:right_center] lg:[object-position:center_center]"
      >
        <source src={VIDEO_URL} type="video/mp4" />
      </video>

      {/* ── 오버레이 ── */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#020b18]/88 via-[#041526]/72 to-[#020b18]/82" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,212,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,212,255,0.02)_1px,transparent_1px)] bg-[length:48px_48px]" />
      <div className="absolute top-0 right-0 w-[55%] h-[70%] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top right, rgba(0,212,255,0.07) 0%, transparent 65%)' }} />

      {/* ── 콘텐츠 레이어 — 전역 Navbar 높이(AlertTicker 28px + Navbar 56px) 아래부터 시작 ── */}
      <div className="relative z-10 flex flex-col flex-1 px-4 sm:px-8 lg:px-12 pt-[calc(1.75rem+3.5rem+1.5rem)] pb-6 sm:pb-10 lg:pb-14">

        {/* ── 메인 콘텐츠 ── */}
        <div className="flex flex-col xl:flex-row xl:items-end gap-8 mt-auto">

          {/* 왼쪽 컬럼 */}
          <div className="flex-1">

            {/* LIVE 배지 */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse" />
              <span className="text-[9px] font-black tracking-[0.3em] text-[#00ff88] uppercase">
                System Online · Meta ICT Defense Division
              </span>
            </motion.div>

            {/* 터미널 부트 라인 */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
              className="font-mono text-[10px] space-y-1 mb-7">
              {STATUS_LINES.map((l, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: l.delay, duration: 0.4 }}
                  className={i === STATUS_LINES.length - 1 ? 'text-[#00ff88]' : 'text-[#4a7a9b]'}>
                  {l.text}
                </motion.div>
              ))}
            </motion.div>

            {/* 메인 헤딩 */}
            <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
              className="mb-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-none tracking-tight">
                <span className="block text-white">K-DEFENSE</span>
                <span className="block text-[#00d4ff]" style={{ textShadow: '0 0 40px rgba(0,212,255,0.5)' }}>
                  AI INTELLIGENCE
                </span>
              </h1>
            </motion.div>

            {/* 타이핑 서브타이틀 */}
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg font-light text-[#8ab8d4] mb-2 min-h-[28px]">
              <TypingText />
            </motion.p>

            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}
              className="text-sm text-[#4a7a9b] max-w-lg mb-8 leading-relaxed">
              메타아이씨티의 6대 AI 시스템이 실시간으로 전장·사이버·위성·신호·영상·의사결정 인텔리전스를 통합 분석합니다.
            </motion.p>

            {/* CTA 버튼 */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-3 mb-10">
              <Link to="/command"
                className="flex items-center gap-2 px-7 py-3.5 bg-[#00d4ff] text-[#020b18] text-[11px] font-black tracking-[0.12em] uppercase hover:bg-[#00eeff] transition-all">
                <Terminal className="w-4 h-4" /> 통합 지휘 센터 <ChevronRight className="w-4 h-4" />
              </Link>
              <Link to="/weapons"
                className="flex items-center gap-2 px-7 py-3.5 border border-[#00d4ff]/30 text-[#00d4ff] text-[11px] font-black tracking-[0.12em] uppercase hover:border-[#00d4ff]/60 hover:bg-[#00d4ff]/5 transition-all">
                무기 DB 조회
              </Link>
            </motion.div>

            {/* 스탯 카드 */}
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.7 }}
              className="grid grid-cols-4 gap-2">
              {STATS.map(({ icon: Icon, value, label }) => (
                <div key={label}
                  className="bg-black/30 backdrop-blur-md border border-[#00d4ff]/10 p-3 text-center hover:border-[#00d4ff]/25 transition-all">
                  <Icon className="w-3.5 h-3.5 text-[#00d4ff]/60 mx-auto mb-1.5" />
                  <div className="text-lg font-black text-white font-mono">{value}</div>
                  <div className="text-[8px] font-bold tracking-[0.1em] text-[#4a7a9b] uppercase">{label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* 오른쪽 컬럼 — 글로브 */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.0, delay: 0.3 }}
            className="hidden xl:flex flex-col items-center shrink-0"
          >
            {/* 글로브 헤더 필 */}
            <div className="flex items-center gap-2 mb-3 px-4 py-2 bg-black/30 backdrop-blur-md border border-[#00d4ff]/15 self-stretch">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse" />
              <span className="text-[9px] font-black tracking-[0.2em] text-[#00d4ff] uppercase flex-1">
                Global Threat Monitor // Live
              </span>
              <span className="text-[8px] font-mono text-[#ff2d55]">7 ACTIVE THREATS</span>
            </div>
            <div className="border border-[#00d4ff]/12 bg-black/20 backdrop-blur-sm">
              <GlobeVisualization />
            </div>
          </motion.div>
        </div>
      </div>

      {/* 하단 페이드 */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#020b18] to-transparent pointer-events-none" />
    </section>
  )
}
