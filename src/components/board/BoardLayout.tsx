import { type ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FileText, Radio, Database, Settings, ChevronRight, Shield } from 'lucide-react'
import { useBoard } from '../../contexts/BoardContext'

const BOARD_MENUS = [
  { href: '/board/notices', label: '공지사항', icon: FileText, badge: 'notices' },
  { href: '/board/reports', label: '보고서', icon: Radio, badge: 'reports' },
  { href: '/board/intel', label: '인텔리전스', icon: Database, badge: 'intels' },
]

interface Props {
  children: ReactNode
  title?: string
  subtitle?: string
  actions?: ReactNode
}

export default function BoardLayout({ children, title, subtitle, actions }: Props) {
  const location = useLocation()
  const { notices, reports, intels, isAdmin } = useBoard()

  const counts: Record<string, number> = {
    notices: notices.length,
    reports: reports.length,
    intels: intels.length,
  }

  return (
    <div className="min-h-screen bg-[#020b18] pt-6 pb-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Board header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="relative w-7 h-7">
            <div className="absolute inset-0 bg-[#00d4ff]/20 rotate-45" />
            <Shield className="absolute inset-0 m-auto w-4 h-4 text-[#00d4ff]" />
          </div>
          <div>
            <div className="text-[9px] font-black tracking-[0.25em] text-[#00d4ff]/70 uppercase">K-Defense AI</div>
            <div className="text-[12px] font-black text-white uppercase tracking-[0.1em]">운영 관리 시스템</div>
          </div>
          {isAdmin && (
            <Link to="/admin" className="ml-auto flex items-center gap-1.5 text-[9px] font-black text-[#ffcc00] border border-[#ffcc00]/30 px-2 py-1 clip-corner-sm hover:bg-[#ffcc00]/10 transition-all">
              <Settings className="w-3 h-3" /> 관리자 모드
            </Link>
          )}
        </div>

        {/* Tab nav */}
        <div className="flex gap-1 mb-6 border-b border-[#0a3050]">
          {BOARD_MENUS.map(({ href, label, icon: Icon, badge }) => {
            const active = location.pathname === href || location.pathname.startsWith(href + '/')
            return (
              <Link
                key={href}
                to={href}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-[11px] font-black tracking-[0.08em] border-b-2 -mb-[1px] transition-all ${
                  active
                    ? 'border-[#00d4ff] text-[#00d4ff]'
                    : 'border-transparent text-[#4a7a9b] hover:text-[#8ab8d4]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
                <span className={`text-[8px] font-black px-1.5 py-0.5 rounded-sm ${active ? 'bg-[#00d4ff]/15 text-[#00d4ff]' : 'bg-[#0a3050] text-[#4a7a9b]'}`}>
                  {counts[badge]}
                </span>
              </Link>
            )
          })}
        </div>

        {/* Page header */}
        {(title || actions) && (
          <div className="flex items-end justify-between mb-5">
            <div>
              {title && (
                <h1 className="text-2xl font-black text-white">{title}</h1>
              )}
              {subtitle && (
                <p className="text-[12px] text-[#4a7a9b] mt-1">{subtitle}</p>
              )}
            </div>
            {actions && <div className="flex items-center gap-2">{actions}</div>}
          </div>
        )}

        {children}
      </div>
    </div>
  )
}

// Breadcrumb helper
export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <div className="flex items-center gap-1.5 text-[10px] text-[#4a7a9b] mb-4">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <ChevronRight className="w-3 h-3" />}
          {item.href ? (
            <Link to={item.href} className="hover:text-[#00d4ff] transition-colors">{item.label}</Link>
          ) : (
            <span className="text-[#8ab8d4]">{item.label}</span>
          )}
        </span>
      ))}
    </div>
  )
}
