import { useState, useEffect } from 'react'
import { useAlerts } from '../contexts/AlertContext'

const STATIC_TICKERS = [
  'SYSTEM ONLINE · ALL SENSORS NOMINAL',
  'AI MODEL v3.8 ACTIVE · 99.7% DETECTION ACCURACY',
  'MONITORING 34 SECTORS · 5/6 NODES ACTIVE',
  'SIGINT SWEEP IN PROGRESS · 6 FREQUENCIES',
  'SATELLITE KSat-12 PASS SCHEDULED 15:23 KST',
  'CYBER DEFENSE SHIELD ACTIVE · 1,247 THREATS BLOCKED TODAY',
]

function LiveClock() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const update = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('ko-KR', { hour12: false }) + ' KST')
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])
  return <span className="text-[9px] font-mono text-[#00d4ff]/60 whitespace-nowrap">{time}</span>
}

export default function AlertTicker() {
  const { alerts, unreadCount } = useAlerts()

  const tickerItems = [
    ...alerts.slice(0, 5).map((a) => `[${a.source}] ${a.title} — ${a.message}`),
    ...STATIC_TICKERS,
  ]
  const fullText = tickerItems.join('   ·   ')

  return (
    <div className="hidden sm:flex fixed top-0 left-0 right-0 z-[60] h-7 bg-[#041526] border-b border-[#00d4ff]/15 items-center overflow-hidden">
      {/* Live badge */}
      <div className="shrink-0 flex items-center gap-2 px-3 h-full bg-[#00d4ff]/10 border-r border-[#00d4ff]/20">
        <div className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse" />
        <span className="text-[9px] font-black tracking-[0.2em] text-[#00d4ff] whitespace-nowrap">LIVE</span>
      </div>

      {/* Alert count */}
      {unreadCount > 0 && (
        <div className="shrink-0 flex items-center gap-1.5 px-3 h-full bg-[#ff2d55]/10 border-r border-[#ff2d55]/20">
          <div className="w-1.5 h-1.5 rounded-full bg-[#ff2d55] animate-pulse" />
          <span className="text-[9px] font-black text-[#ff2d55] whitespace-nowrap">ALERT {unreadCount}</span>
        </div>
      )}

      {/* Scrolling text */}
      <div className="flex-1 overflow-hidden">
        <div
          className="flex whitespace-nowrap text-[9px] font-mono text-[#4a7a9b] tracking-[0.08em]"
          style={{ animation: 'ticker-scroll 60s linear infinite' }}
        >
          <span className="pr-16">{fullText}</span>
          <span className="pr-16">{fullText}</span>
        </div>
      </div>

      {/* Clock */}
      <div className="shrink-0 px-3 border-l border-[#00d4ff]/15">
        <LiveClock />
      </div>

      <style>{`
        @keyframes ticker-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}
