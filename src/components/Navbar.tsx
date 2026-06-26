import { useState, useEffect, useRef } from 'react'
import { Shield, Menu, X, ChevronRight, Bell, Terminal, Settings, FileText, Database, Radio, LayoutGrid, LogIn, Crosshair } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { useAlerts, LEVEL_COLORS } from '../contexts/AlertContext'
import { useSystem, THREAT_LEVEL_COLORS } from '../contexts/SystemContext'
import { useBoard } from '../contexts/BoardContext'

const NAV_LINKS = [
  { label: 'HOME', href: '/', isRoute: true },
  { label: 'INTELLIGENCE', href: '/#intelligence', isRoute: true },
  { label: 'SOLUTIONS', href: '/#solutions', isRoute: true },
]

const BOARD_LINKS = [
  { label: '공지사항', href: '/board/notices', icon: FileText },
  { label: '보고서', href: '/board/reports', icon: Radio },
  { label: '인텔리전스', href: '/board/intel', icon: Database },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [alertOpen, setAlertOpen] = useState(false)
  const [boardOpen, setBoardOpen] = useState(false)
  const { alerts, unreadCount, markAllRead } = useAlerts()
  const { system } = useSystem()
  const { notices, isAdmin } = useBoard()
  const location = useLocation()
  const isCommandPage = location.pathname === '/command'
  const isControlPage = location.pathname === '/control'
  const isBoardPage = location.pathname.startsWith('/board') || location.pathname.startsWith('/admin')
  const boardRef = useRef<HTMLLIElement | null>(null)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (boardRef.current && !boardRef.current.contains(e.target as Node)) setBoardOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const pinnedCount = notices.filter((n) => n.pinned).length

  return (
    <header
      className={`fixed top-7 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || isBoardPage
          ? 'bg-[#020b18]/97 backdrop-blur-xl border-b border-[#00d4ff]/10'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group shrink-0">
          <div className="relative w-7 h-7">
            <div className="absolute inset-0 bg-[#00d4ff]/20 rounded rotate-45 group-hover:bg-[#00d4ff]/30 transition-colors" />
            <Shield className="absolute inset-0 m-auto w-4 h-4 text-[#00d4ff]" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-[8px] font-bold tracking-[0.3em] text-[#00d4ff]/70 uppercase">Meta ICT</span>
            <span className="text-[11px] font-black tracking-[0.1em] text-white uppercase">K-Defense AI</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden xl:flex items-center gap-0.5 flex-1">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <Link
                to={link.href}
                className="relative px-3 py-2 text-[10px] font-bold tracking-[0.12em] text-[#8ab8d4] hover:text-[#00d4ff] transition-colors group"
              >
                {link.label}
                <span className="absolute bottom-1 left-3 right-3 h-px bg-[#00d4ff] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </Link>
            </li>
          ))}

          {/* Board dropdown */}
          <li ref={(el) => { boardRef.current = el }} className="relative">
            <button
              onClick={() => setBoardOpen(!boardOpen)}
              className={`flex items-center gap-1 px-3 py-2 text-[10px] font-bold tracking-[0.12em] transition-colors ${isBoardPage ? 'text-[#00d4ff]' : 'text-[#8ab8d4] hover:text-[#00d4ff]'}`}
            >
              <LayoutGrid className="w-3 h-3" />
              게시판
              {pinnedCount > 0 && (
                <span className="w-4 h-4 bg-[#ff2d55] rounded-full text-[7px] font-black text-white flex items-center justify-center">{pinnedCount}</span>
              )}
            </button>
            <AnimatePresence>
              {boardOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.96 }}
                  className="absolute top-10 left-0 w-44 bg-[#041526]/98 backdrop-blur-xl border border-[#00d4ff]/15 clip-corner z-50"
                >
                  {BOARD_LINKS.map(({ href, label, icon: Icon }) => (
                    <Link key={href} to={href} onClick={() => setBoardOpen(false)}
                      className={`flex items-center gap-2.5 px-4 py-2.5 text-[11px] font-bold transition-colors border-b border-[#0a3050]/50 last:border-0 ${
                        location.pathname === href ? 'text-[#00d4ff] bg-[#00d4ff]/5' : 'text-[#8ab8d4] hover:text-[#00d4ff] hover:bg-[#00d4ff]/3'
                      }`}>
                      <Icon className="w-3.5 h-3.5" /> {label}
                    </Link>
                  ))}
                  <div className="border-t border-[#0a3050] px-4 py-2">
                    <Link to="/admin" onClick={() => setBoardOpen(false)}
                      className="flex items-center gap-2 text-[10px] text-[#ffcc00]/70 hover:text-[#ffcc00] transition-colors">
                      <Settings className="w-3 h-3" /> 관리자 모드
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>

          <li>
            <Link to="/weapons"
              className={`flex items-center gap-1 px-3 py-2 text-[10px] font-bold tracking-[0.12em] transition-colors ${location.pathname === '/weapons' ? 'text-[#ff6b35]' : 'text-[#8ab8d4] hover:text-[#ff6b35]'}`}>
              <Crosshair className="w-3 h-3" /> 무기DB
            </Link>
          </li>
          <li>
            <Link to="/control"
              className={`flex items-center gap-1 px-3 py-2 text-[10px] font-bold tracking-[0.12em] transition-colors ${isControlPage ? 'text-[#ffcc00]' : 'text-[#8ab8d4] hover:text-[#ffcc00]'}`}>
              <Settings className="w-3 h-3" /> CONTROL
            </Link>
          </li>
          <li>
            <Link to="/command"
              className={`flex items-center gap-1 px-3 py-2 text-[10px] font-bold tracking-[0.12em] transition-colors ${isCommandPage ? 'text-[#00d4ff]' : 'text-[#8ab8d4] hover:text-[#00d4ff]'}`}>
              <Terminal className="w-3 h-3" /> COMMAND
            </Link>
          </li>
        </ul>

        {/* Right Actions */}
        <div className="hidden xl:flex items-center gap-2 shrink-0">
          {/* Threat level */}
          <Link to="/control"
            className="flex items-center gap-1.5 px-2 py-1 border clip-corner-sm transition-all hover:opacity-80"
            style={{ borderColor: `${THREAT_LEVEL_COLORS[system.globalThreatLevel]}40`, background: `${THREAT_LEVEL_COLORS[system.globalThreatLevel]}10` }}>
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: THREAT_LEVEL_COLORS[system.globalThreatLevel] }} />
            <span className="text-[8px] font-black tracking-[0.12em]" style={{ color: THREAT_LEVEL_COLORS[system.globalThreatLevel] }}>
              {system.globalThreatLevel}
            </span>
          </Link>

          {/* Admin quick link */}
          {isAdmin ? (
            <Link to="/admin" className="flex items-center gap-1 px-2 py-1 text-[8px] font-black text-[#ffcc00] border border-[#ffcc00]/30 clip-corner-sm hover:bg-[#ffcc00]/10 transition-all">
              <Settings className="w-3 h-3" /> ADMIN
            </Link>
          ) : (
            <Link to="/admin" className="p-1.5 text-[#4a7a9b] hover:text-[#ffcc00] transition-colors">
              <LogIn className="w-3.5 h-3.5" />
            </Link>
          )}

          {/* Alert bell */}
          <div className="relative">
            <button onClick={() => setAlertOpen(!alertOpen)}
              className="relative w-8 h-8 flex items-center justify-center text-[#8ab8d4] hover:text-[#00d4ff] transition-colors">
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#ff2d55] rounded-full text-[7px] font-black text-white flex items-center justify-center">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>
            <AnimatePresence>
              {alertOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="absolute top-10 right-0 w-80 bg-[#041526]/98 backdrop-blur-xl border border-[#00d4ff]/15 clip-corner z-50"
                >
                  <div className="flex items-center justify-between px-4 py-3 border-b border-[#0a3050]">
                    <span className="text-[10px] font-black tracking-[0.15em] text-[#00d4ff] uppercase">경보 피드</span>
                    <button onClick={markAllRead} className="text-[9px] text-[#4a7a9b] hover:text-[#00d4ff]">모두 읽음</button>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {alerts.slice(0, 10).map((a) => (
                      <div key={a.id} className={`px-4 py-2.5 border-b border-[#0a3050]/50 last:border-0 ${a.read ? 'opacity-50' : ''}`}>
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-[8px] font-black px-1.5 py-0.5" style={{ color: LEVEL_COLORS[a.level], background: `${LEVEL_COLORS[a.level]}15` }}>{a.level}</span>
                          <span className="text-[9px] text-[#4a7a9b] ml-auto font-mono">{a.timestamp}</span>
                        </div>
                        <div className="text-[11px] font-bold text-white">{a.title}</div>
                        <div className="text-[10px] text-[#4a7a9b]">{a.message}</div>
                      </div>
                    ))}
                    {alerts.length === 0 && <div className="px-4 py-6 text-center text-[11px] text-[#4a7a9b]">경보 없음</div>}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Command CTA */}
          <Link to="/command"
            className="clip-corner-sm flex items-center gap-1.5 px-3 py-1.5 bg-[#00d4ff] text-[#020b18] text-[9px] font-black tracking-[0.1em] uppercase hover:bg-[#00eeff] transition-colors">
            <Terminal className="w-3 h-3" />
            지휘 센터
          </Link>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="xl:hidden text-[#00d4ff] p-2">
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden bg-[#020b18]/98 backdrop-blur-xl border-t border-[#00d4ff]/10"
          >
            <div className="px-6 py-4 space-y-1">
              {[...NAV_LINKS, ...BOARD_LINKS.map((b) => ({ label: b.label, href: b.href, isRoute: true })),
                { label: '무기 데이터베이스', href: '/weapons', isRoute: true },
                { label: 'CONTROL', href: '/control', isRoute: true },
                { label: 'COMMAND CENTER', href: '/command', isRoute: true },
                { label: 'ADMIN', href: '/admin', isRoute: true },
              ].map((link) => (
                <Link key={link.href} to={link.href} onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 py-2.5 text-[11px] font-bold tracking-[0.12em] text-[#8ab8d4] hover:text-[#00d4ff] border-b border-[#0a3050] transition-colors">
                  <ChevronRight className="w-3 h-3 text-[#00d4ff]/40" />
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
