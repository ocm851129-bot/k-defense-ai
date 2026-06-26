import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, Activity, Shield, Zap, Terminal } from 'lucide-react'
import { Link } from 'react-router-dom'
import ParticleField from './ParticleField'
import GlobeVisualization from './GlobeVisualization'

const TYPING_TEXTS = [
  'AI 기반 방위 인텔리전스 플랫폼',
  '실시간 위협 탐지 시스템',
  '전략적 안보 분석 솔루션',
  '차세대 방산 AI 기술',
]

function TypingText() {
  const [textIdx, setTextIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => {
    const target = TYPING_TEXTS[textIdx]
    if (!deleting) {
      if (displayed.length < target.length) {
        timerRef.current = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 55)
      } else {
        timerRef.current = setTimeout(() => setDeleting(true), 2000)
      }
    } else {
      if (displayed.length > 0) {
        timerRef.current = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 30)
      } else {
        setDeleting(false)
        setTextIdx((p) => (p + 1) % TYPING_TEXTS.length)
      }
    }
    return () => clearTimeout(timerRef.current)
  }, [displayed, deleting, textIdx])

  return (
    <span className="text-[#00d4ff]">
      {displayed}
      <span className="cursor-blink">|</span>
    </span>
  )
}

// Animated hexagonal grid pattern
function HexGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="absolute right-0 top-0 w-[60%] h-full opacity-[0.04]" viewBox="0 0 400 600">
        {Array.from({ length: 8 }, (_, row) =>
          Array.from({ length: 6 }, (_, col) => {
            const x = col * 60 + (row % 2) * 30
            const y = row * 52
            const points = Array.from({ length: 6 }, (__, i) => {
              const angle = (Math.PI / 3) * i - Math.PI / 6
              return `${x + 28 * Math.cos(angle)},${y + 28 * Math.sin(angle)}`
            }).join(' ')
            return (
              <polygon
                key={`${row}-${col}`}
                points={points}
                fill="none"
                stroke="#00d4ff"
                strokeWidth="0.5"
              />
            )
          })
        )}
      </svg>
    </div>
  )
}

// Terminal-style status lines
function StatusLines() {
  const lines = [
    { delay: 0, text: '> INITIALIZING K-DEFENSE AI INTELLIGENCE PLATFORM...' },
    { delay: 0.4, text: '> LOADING NEURAL NETWORK MODELS [████████████] 100%' },
    { delay: 0.8, text: '> ESTABLISHING SECURE CONNECTIONS TO 34 SECTORS...' },
    { delay: 1.2, text: '> ALL SYSTEMS OPERATIONAL ✓' },
  ]
  return (
    <div className="font-mono text-[10px] space-y-1 mb-8">
      {lines.map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: line.delay, duration: 0.4 }}
          className={i === lines.length - 1 ? 'text-[#00ff88]' : 'text-[#4a7a9b]'}
        >
          {line.text}
        </motion.div>
      ))}
    </div>
  )
}

const stats = [
  { icon: Activity, value: '99.7%', label: '탐지 정확도' },
  { icon: Zap, value: '<0.3s', label: '실시간 분석' },
  { icon: Shield, value: '2,400+', label: '위협 패턴 DB' },
  { icon: Terminal, value: '6개', label: 'AI 모듈' },
]

export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* BG layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#020b18] via-[#041526]/60 to-[#020b18]" />
      <div className="absolute inset-0 grid-bg" />
      <HexGrid />

      {/* Particle field */}
      <div className="absolute inset-0 pointer-events-none">
        <ParticleField count={70} color="#00d4ff" />
      </div>

      {/* Radial glow top-right */}
      <div
        className="absolute top-0 right-0 w-[50%] h-[60%] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top right, rgba(0,212,255,0.06) 0%, transparent 70%)' }}
      />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00d4ff]/50 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-16 w-full">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-center">

          {/* Left: Text content */}
          <div>
            {/* Live badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-6"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse" />
              <span className="text-[9px] font-black tracking-[0.3em] text-[#00ff88] uppercase">
                System Online · Meta ICT Defense Division
              </span>
            </motion.div>

            {/* Terminal lines */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <StatusLines />
            </motion.div>

            {/* Main heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mb-4"
            >
              <h1 className="text-5xl md:text-7xl font-black leading-none tracking-tight">
                <span className="block text-white">K-DEFENSE</span>
                <span className="block glow-text text-[#00d4ff]">AI INTELLIGENCE</span>
              </h1>
            </motion.div>

            {/* Typing text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl font-light text-[#8ab8d4] mb-3 min-h-[32px]"
            >
              <TypingText />
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-sm text-[#4a7a9b] max-w-lg mb-10 leading-relaxed"
            >
              메타아이씨티의 6대 AI 시스템이 실시간으로 전장·사이버·위성·신호·영상·의사결정 인텔리전스를 통합 분석합니다.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/command"
                className="clip-corner flex items-center gap-2 px-8 py-3.5 bg-[#00d4ff] text-[#020b18] text-[11px] font-black tracking-[0.12em] uppercase hover:bg-[#00eeff] transition-all"
              >
                <Terminal className="w-4 h-4" />
                통합 지휘 센터
                <ChevronRight className="w-4 h-4" />
              </Link>
              <a
                href="#solutions"
                className="clip-corner flex items-center gap-2 px-8 py-3.5 border border-[#00d4ff]/30 text-[#00d4ff] text-[11px] font-black tracking-[0.12em] uppercase hover:border-[#00d4ff]/60 hover:bg-[#00d4ff]/5 transition-all"
              >
                솔루션 보기
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="grid grid-cols-4 gap-3 mt-12"
            >
              {stats.map(({ icon: Icon, value, label }) => (
                <div
                  key={label}
                  className="clip-corner-sm bg-[#041526]/80 border border-[#00d4ff]/10 p-4 glow-border text-center"
                >
                  <Icon className="w-4 h-4 text-[#00d4ff]/60 mx-auto mb-2" />
                  <div className="text-xl font-black text-white number-mono">{value}</div>
                  <div className="text-[9px] font-bold tracking-[0.1em] text-[#4a7a9b] uppercase mt-0.5">{label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: 3D Globe */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.0, delay: 0.3 }}
            className="hidden xl:flex justify-center items-center"
          >
            <div className="relative">
              {/* 외부 글로우 링 */}
              <div className="absolute inset-0 rounded-full pointer-events-none"
                style={{ boxShadow: '0 0 80px 20px rgba(0,212,255,0.08), 0 0 160px 40px rgba(0,212,255,0.04)' }} />
              <GlobeVisualization />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#020b18] to-transparent pointer-events-none" />
    </section>
  )
}
