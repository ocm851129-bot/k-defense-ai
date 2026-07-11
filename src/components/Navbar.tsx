import { useState, useEffect, useRef, useCallback } from 'react'
import {
  Shield, Menu, X, Bell, Terminal, Settings,
  FileText, Database, Radio, LayoutGrid, LogIn, Crosshair,
  Home, ChevronDown, Globe, Cpu, Newspaper,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAlerts, LEVEL_COLORS } from '../contexts/AlertContext'
import { useSystem, THREAT_LEVEL_COLORS } from '../contexts/SystemContext'
import { useBoard } from '../contexts/BoardContext'

// 섹션 링크 (모바일 메뉴에만 표시)
const SECTION_LINKS = [
  { label: '홈',          href: '/', sectionId: null, icon: Home },
  { label: '인텔리전스',  href: '/#intelligence', sectionId: 'intelligence', icon: Shield },
  { label: '솔루션',      href: '/#solutions',    sectionId: 'solutions',    icon: Terminal },
  { label: '보고서',      href: '/#reports',      sectionId: 'reports',      icon: FileText },
  { label: '문의하기',    href: '/#contact',      sectionId: 'contact',      icon: Radio },
]

const BOARD_LINKS = [
  { label: '공지사항',   href: '/board/notices', icon: FileText },
  { label: '국방뉴스',   href: '/board/news',    icon: Newspaper },
  { label: '보고서',     href: '/board/reports', icon: Radio },
  { label: '인텔리전스', href: '/board/intel',   icon: Database },
]

const PAGE_LINKS = [
  { label: '무기 DB',      href: '/weapons',        icon: Crosshair },
  { label: '세계 모니터', href: '/monitor/world',  icon: Globe },
  { label: '기술 모니터', href: '/monitor/tech',   icon: Cpu },
  { label: 'CONTROL',      href: '/control',        icon: Settings },
  { label: 'COMMAND',      href: '/command',        icon: Terminal },
]

const MONITOR_LINKS = [
  { label: '세계 군사·안보 모니터', href: '/monitor/world', icon: Globe },
  { label: '글로벌 기술 인프라 모니터', href: '/monitor/tech', icon: Cpu },
]

export default function Navbar() {
  const [scrolled, setScrolled]       = useState(false)
  const [mobileOpen, setMobileOpen]   = useState(false)
  const [alertOpen, setAlertOpen]     = useState(false)
  const [boardOpen, setBoardOpen]     = useState(false)
  const [monitorOpen, setMonitorOpen] = useState(false)

  const { alerts, unreadCount, markAllRead } = useAlerts()
  const { system } = useSystem()
  const { notices, isAdmin } = useBoard()
  const location  = useLocation()
  const navigate  = useNavigate()

  const boardRef   = useRef<HTMLDivElement>(null)
  const alertRef   = useRef<HTMLDivElement>(null)
  const monitorRef = useRef<HTMLDivElement>(null)

  const isCommandPage  = location.pathname === '/command'
  const isControlPage  = location.pathname === '/control'
  const isWeaponsPage  = location.pathname === '/weapons'
  const isBoardPage    = location.pathname.startsWith('/board') || location.pathname.startsWith('/admin')
  const isMonitorPage  = location.pathname.startsWith('/monitor')
  const isHomePage     = location.pathname === '/'

  // 스크롤 감지
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // 외부 클릭 닫기
  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (boardRef.current    && !boardRef.current.contains(e.target as Node))    setBoardOpen(false)
      if (alertRef.current    && !alertRef.current.contains(e.target as Node))    setAlertOpen(false)
      if (monitorRef.current  && !monitorRef.current.contains(e.target as Node))  setMonitorOpen(false)
    }
    document.addEventListener('mousedown', fn)
    return () => document.removeEventListener('mousedown', fn)
  }, [])

  // 섹션 스크롤
  const scrollTo = useCallback((e: React.MouseEvent, sectionId: string | null) => {
    e.preventDefault()
    setMobileOpen(false)
    setBoardOpen(false)
    if (!sectionId) {
      if (isHomePage) window.scrollTo({ top: 0, behavior: 'smooth' })
      else navigate('/')
      return
    }
    if (isHomePage) {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/')
      setTimeout(() => document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' }), 350)
    }
  }, [isHomePage, navigate])

  const hasBg = scrolled || isBoardPage || isCommandPage || isControlPage || isWeaponsPage || isMonitorPage
  const pinnedCount = notices.filter(n => n.pinned).length

  return (
    <header className={`fixed top-0 sm:top-7 left-0 right-0 z-50 transition-all duration-300 ${
      hasBg ? 'bg-[#020b18]/97 backdrop-blur-xl shadow-lg shadow-black/30 border-b border-[#00d4ff]/10' : 'bg-transparent'
    }`}>
      <nav className="max-w-7xl mx-auto px-4 md:px-6 h-14 flex items-center justify-between gap-2">

        {/* ── 로고 ── */}
        <a href="/" onClick={e => scrollTo(e, null)}
          className="flex items-center gap-2.5 group shrink-0 min-w-0">
          <div className="relative w-7 h-7 shrink-0">
            <div className="absolute inset-0 bg-[#00d4ff]/20 rounded rotate-45 group-hover:bg-[#00d4ff]/30 transition-colors" />
            <Shield className="absolute inset-0 m-auto w-4 h-4 text-[#00d4ff]" />
          </div>
          <div className="flex flex-col leading-none min-w-0">
            <span className="text-[7px] font-bold tracking-[0.25em] text-[#00d4ff]/60 uppercase">Meta ICT</span>
            <span className="text-[10px] font-black tracking-[0.08em] text-white uppercase whitespace-nowrap">K-Defense AI</span>
          </div>
        </a>

        {/* ── 데스크탑 네비게이션 (1024px 이상) ── */}
        <div className="hidden lg:flex items-center gap-0 flex-1 min-w-0 justify-center">
          {/* HOME */}
          <a href="/" onClick={e => scrollTo(e, null)}
            className={`px-2.5 py-2 text-[10px] font-bold tracking-[0.1em] whitespace-nowrap transition-colors hover:text-[#00d4ff] ${
              isHomePage ? 'text-[#00d4ff]' : 'text-[#8ab8d4]'
            }`}>
            HOME
          </a>

          {/* 게시판 드롭다운 */}
          <div ref={boardRef} className="relative">
            <button onClick={() => setBoardOpen(v => !v)}
              className={`flex items-center gap-1 px-2.5 py-2 text-[10px] font-bold tracking-[0.1em] whitespace-nowrap transition-colors ${
                isBoardPage || boardOpen ? 'text-[#00d4ff]' : 'text-[#8ab8d4] hover:text-[#00d4ff]'
              }`}>
              <LayoutGrid className="w-3 h-3 shrink-0" />
              게시판
              {pinnedCount > 0 && (
                <span className="w-3.5 h-3.5 bg-[#ff2d55] rounded-full text-[7px] font-black text-white flex items-center justify-center shrink-0">
                  {pinnedCount}
                </span>
              )}
              <ChevronDown className={`w-2.5 h-2.5 transition-transform ${boardOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {boardOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.12 }}
                  className="absolute top-full left-0 mt-1 w-40 bg-[#041526]/99 backdrop-blur-xl border border-[#00d4ff]/20 shadow-xl z-50 overflow-hidden"
                  style={{ borderRadius: '0 0 4px 4px' }}
                >
                  {BOARD_LINKS.map(({ href, label, icon: Icon }) => (
                    <Link key={href} to={href} onClick={() => setBoardOpen(false)}
                      className={`flex items-center gap-2 px-3 py-2.5 text-[11px] font-bold border-b border-[#0a3050]/50 last:border-0 transition-colors ${
                        location.pathname === href ? 'text-[#00d4ff] bg-[#00d4ff]/5' : 'text-[#8ab8d4] hover:text-[#00d4ff] hover:bg-[#00d4ff]/4'
                      }`}>
                      <Icon className="w-3 h-3 shrink-0" />{label}
                    </Link>
                  ))}
                  <Link to="/admin" onClick={() => setBoardOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-[10px] text-[#ffcc00]/70 hover:text-[#ffcc00] border-t border-[#0a3050] transition-colors">
                    <Settings className="w-3 h-3 shrink-0" />관리자
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 무기DB */}
          <Link to="/weapons"
            className={`flex items-center gap-1 px-2.5 py-2 text-[10px] font-bold tracking-[0.1em] whitespace-nowrap transition-colors ${
              isWeaponsPage ? 'text-[#ff6b35]' : 'text-[#8ab8d4] hover:text-[#ff6b35]'
            }`}>
            <Crosshair className="w-3 h-3 shrink-0" />무기DB
          </Link>

          {/* 글로벌 모니터 드롭다운 */}
          <div ref={monitorRef} className="relative">
            <button onClick={() => setMonitorOpen(v => !v)}
              className={`flex items-center gap-1 px-2.5 py-2 text-[10px] font-bold tracking-[0.1em] whitespace-nowrap transition-colors ${
                isMonitorPage || monitorOpen ? 'text-[#00ff88]' : 'text-[#8ab8d4] hover:text-[#00ff88]'
              }`}>
              <Globe className="w-3 h-3 shrink-0" />
              모니터
              <ChevronDown className={`w-2.5 h-2.5 transition-transform ${monitorOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {monitorOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.12 }}
                  className="absolute top-full left-0 mt-1 w-52 bg-[#041526]/99 backdrop-blur-xl border border-[#00ff88]/20 shadow-xl z-50 overflow-hidden"
                  style={{ borderRadius: '0 0 4px 4px' }}>
                  {MONITOR_LINKS.map(({ href, label, icon: Icon }) => (
                    <Link key={href} to={href} onClick={() => setMonitorOpen(false)}
                      className={`flex items-center gap-2 px-3 py-2.5 text-[11px] font-bold border-b border-[#0a3050]/50 last:border-0 transition-colors ${
                        location.pathname === href ? 'text-[#00ff88] bg-[#00ff88]/5' : 'text-[#8ab8d4] hover:text-[#00ff88] hover:bg-[#00ff88]/4'
                      }`}>
                      <Icon className="w-3 h-3 shrink-0" />{label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 구분선 */}
          <div className="w-px h-4 bg-[#0a3050] mx-1 shrink-0" />

          {/* CONTROL */}
          <Link to="/control"
            className={`flex items-center gap-1 px-2.5 py-2 text-[10px] font-bold tracking-[0.1em] whitespace-nowrap transition-colors ${
              isControlPage ? 'text-[#ffcc00]' : 'text-[#8ab8d4] hover:text-[#ffcc00]'
            }`}>
            <Settings className="w-3 h-3 shrink-0" />CONTROL
          </Link>

          {/* COMMAND */}
          <Link to="/command"
            className={`flex items-center gap-1 px-2.5 py-2 text-[10px] font-bold tracking-[0.1em] whitespace-nowrap transition-colors ${
              isCommandPage ? 'text-[#00d4ff]' : 'text-[#8ab8d4] hover:text-[#00d4ff]'
            }`}>
            <Terminal className="w-3 h-3 shrink-0" />COMMAND
          </Link>
        </div>

        {/* ── 우측 액션 ── */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* 위협 레벨 (md 이상) */}
          <Link to="/control"
            className="hidden md:flex items-center gap-1.5 px-2 py-1 border transition-all hover:opacity-80 shrink-0"
            style={{
              borderColor: `${THREAT_LEVEL_COLORS[system.globalThreatLevel]}40`,
              background:  `${THREAT_LEVEL_COLORS[system.globalThreatLevel]}10`,
            }}>
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: THREAT_LEVEL_COLORS[system.globalThreatLevel] }} />
            <span className="text-[8px] font-black tracking-[0.1em] whitespace-nowrap" style={{ color: THREAT_LEVEL_COLORS[system.globalThreatLevel] }}>
              {system.globalThreatLevel}
            </span>
          </Link>

          {/* 어드민 */}
          {isAdmin ? (
            <Link to="/admin"
              className="hidden md:flex items-center gap-1 px-2 py-1 text-[8px] font-black text-[#ffcc00] border border-[#ffcc00]/30 hover:bg-[#ffcc00]/10 transition-all shrink-0">
              <Settings className="w-3 h-3" />ADMIN
            </Link>
          ) : (
            <Link to="/admin" className="hidden md:flex p-1.5 text-[#4a7a9b] hover:text-[#ffcc00] transition-colors">
              <LogIn className="w-3.5 h-3.5" />
            </Link>
          )}

          {/* 경보 벨 */}
          <div ref={alertRef} className="relative">
            <button onClick={() => { setAlertOpen(v => !v); setMobileOpen(false) }}
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
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.12 }}
                  className="absolute top-full right-0 mt-1 w-72 sm:w-80 bg-[#041526]/99 backdrop-blur-xl border border-[#00d4ff]/15 shadow-xl z-50"
                >
                  <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#0a3050]">
                    <span className="text-[10px] font-black tracking-[0.15em] text-[#00d4ff]">경보 피드</span>
                    <button onClick={markAllRead} className="text-[9px] text-[#4a7a9b] hover:text-[#00d4ff]">모두 읽음</button>
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    {alerts.slice(0, 8).map(a => (
                      <div key={a.id} className={`px-3 py-2 border-b border-[#0a3050]/50 last:border-0 ${a.read ? 'opacity-50' : ''}`}>
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-[8px] font-black px-1.5 py-0.5"
                            style={{ color: LEVEL_COLORS[a.level], background: `${LEVEL_COLORS[a.level]}15` }}>
                            {a.level}
                          </span>
                          <span className="text-[8px] text-[#4a7a9b] ml-auto font-mono">{a.timestamp}</span>
                        </div>
                        <div className="text-[10px] font-bold text-white">{a.title}</div>
                        <div className="text-[9px] text-[#4a7a9b] line-clamp-1">{a.message}</div>
                      </div>
                    ))}
                    {alerts.length === 0 && <div className="px-4 py-5 text-center text-[11px] text-[#4a7a9b]">경보 없음</div>}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 지휘 센터 CTA (데스크탑만) */}
          <Link to="/command"
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-[#00d4ff] text-[#020b18] text-[9px] font-black tracking-[0.1em] uppercase hover:bg-[#00eeff] transition-colors shrink-0">
            <Terminal className="w-3 h-3" />지휘 센터
          </Link>

          {/* 모바일 햄버거 */}
          <button onClick={() => { setMobileOpen(v => !v); setAlertOpen(false) }}
            className="lg:hidden w-9 h-9 flex items-center justify-center text-[#00d4ff] hover:bg-[#00d4ff]/10 rounded transition-colors">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* ── 모바일 풀스크린 메뉴 ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="lg:hidden bg-[#020b18]/99 backdrop-blur-xl border-t border-[#00d4ff]/10 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 py-3 space-y-0.5 max-h-[80vh] overflow-y-auto">

              {/* 섹션 이동 */}
              <div className="pb-2 mb-2 border-b border-[#0a3050]">
                <div className="text-[8px] font-black tracking-[0.2em] text-[#4a7a9b] uppercase px-2 mb-1.5">메인 페이지</div>
                <div className="grid grid-cols-2 gap-1">
                  {SECTION_LINKS.map(link => {
                    const Icon = link.icon
                    return (
                      <a key={link.label} href={link.href}
                        onClick={e => scrollTo(e, link.sectionId)}
                        className="flex items-center gap-2 px-3 py-2.5 text-[12px] font-bold text-[#8ab8d4] hover:text-[#00d4ff] hover:bg-[#00d4ff]/5 rounded transition-colors">
                        <Icon className="w-3.5 h-3.5 shrink-0 text-[#00d4ff]/50" />
                        {link.label}
                      </a>
                    )
                  })}
                </div>
              </div>

              {/* 게시판 */}
              <div className="pb-2 mb-2 border-b border-[#0a3050]">
                <div className="text-[8px] font-black tracking-[0.2em] text-[#4a7a9b] uppercase px-2 mb-1.5">게시판</div>
                <div className="grid grid-cols-2 gap-1">
                  {BOARD_LINKS.map(({ href, label, icon: Icon }) => (
                    <Link key={href} to={href} onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-2 px-3 py-2.5 text-[12px] font-bold rounded transition-colors ${
                        location.pathname === href ? 'text-[#00d4ff] bg-[#00d4ff]/8' : 'text-[#8ab8d4] hover:text-[#00d4ff] hover:bg-[#00d4ff]/5'
                      }`}>
                      <Icon className="w-3.5 h-3.5 shrink-0 text-[#00d4ff]/50" />{label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* 글로벌 모니터 */}
              <div className="pb-2 mb-2 border-b border-[#0a3050]">
                <div className="text-[8px] font-black tracking-[0.2em] text-[#4a7a9b] uppercase px-2 mb-1.5">글로벌 모니터</div>
                <div className="grid grid-cols-1 gap-1">
                  {MONITOR_LINKS.map(({ href, label, icon: Icon }) => (
                    <Link key={href} to={href} onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-2 px-3 py-2.5 text-[12px] font-bold rounded transition-colors ${
                        location.pathname === href ? 'text-[#00ff88] bg-[#00ff88]/8' : 'text-[#8ab8d4] hover:text-[#00ff88] hover:bg-[#00ff88]/5'
                      }`}>
                      <Icon className="w-3.5 h-3.5 shrink-0 text-[#00ff88]/50" />{label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* 주요 페이지 */}
              <div className="pb-2 mb-2 border-b border-[#0a3050]">
                <div className="text-[8px] font-black tracking-[0.2em] text-[#4a7a9b] uppercase px-2 mb-1.5">플랫폼</div>
                <div className="grid grid-cols-2 gap-1">
                  {PAGE_LINKS.filter(l => !l.href.startsWith('/monitor')).map(({ href, label, icon: Icon }) => (
                    <Link key={href} to={href} onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-2 px-3 py-2.5 text-[12px] font-bold rounded transition-colors ${
                        location.pathname === href ? 'text-[#00d4ff] bg-[#00d4ff]/8' : 'text-[#8ab8d4] hover:text-[#00d4ff] hover:bg-[#00d4ff]/5'
                      }`}>
                      <Icon className="w-3.5 h-3.5 shrink-0 text-[#00d4ff]/50" />{label}
                    </Link>
                  ))}
                  <Link to="/admin" onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 px-3 py-2.5 text-[12px] font-bold text-[#ffcc00]/80 hover:text-[#ffcc00] hover:bg-[#ffcc00]/5 rounded transition-colors">
                    <Settings className="w-3.5 h-3.5 shrink-0 text-[#ffcc00]/50" />ADMIN
                  </Link>
                </div>
              </div>

              {/* 위협 레벨 + 지휘센터 */}
              <div className="flex items-center gap-2 pt-1">
                <div className="flex items-center gap-1.5 px-3 py-2 border flex-1 justify-center"
                  style={{
                    borderColor: `${THREAT_LEVEL_COLORS[system.globalThreatLevel]}40`,
                    background:  `${THREAT_LEVEL_COLORS[system.globalThreatLevel]}10`,
                  }}>
                  <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: THREAT_LEVEL_COLORS[system.globalThreatLevel] }} />
                  <span className="text-[10px] font-black" style={{ color: THREAT_LEVEL_COLORS[system.globalThreatLevel] }}>
                    THREAT: {system.globalThreatLevel}
                  </span>
                </div>
                <Link to="/command" onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-[#00d4ff] text-[#020b18] text-[10px] font-black uppercase hover:bg-[#00eeff] transition-colors shrink-0">
                  <Terminal className="w-3.5 h-3.5" />지휘 센터
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
