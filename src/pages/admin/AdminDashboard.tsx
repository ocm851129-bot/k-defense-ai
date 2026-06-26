import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Shield, FileText, Radio, Database, Users, Settings,
  LogOut, ChevronRight, Plus, Trash2, Crosshair,
} from 'lucide-react'
import { useBoard, NOTICE_CATEGORY_COLORS, STATUS_COLORS } from '../../contexts/BoardContext'
import { useWeapons } from '../../contexts/WeaponsContext'
import ConfirmDialog from '../../components/ui/ConfirmDialog'

const THREAT_COLORS: Record<string, string> = { CRITICAL: '#ff2d55', HIGH: '#ff6b35', MED: '#ffcc00', LOW: '#00ff88' }

function LoginGate({ onLogin }: { onLogin: (pw: string) => boolean }) {
  const [pw, setPw] = useState('')
  const [err, setErr] = useState(false)
  function submit() {
    if (!onLogin(pw)) { setErr(true); setTimeout(() => setErr(false), 1500) }
    setPw('')
  }
  return (
    <div className="min-h-screen bg-[#020b18] flex items-center justify-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="clip-corner bg-[#041526]/90 border border-[#00d4ff]/20 p-8 w-full max-w-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 bg-[#00d4ff]/20 rotate-45" />
            <Shield className="absolute inset-0 m-auto w-4 h-4 text-[#00d4ff]" />
          </div>
          <div>
            <div className="text-[9px] font-black tracking-[0.25em] text-[#00d4ff]/70 uppercase">K-Defense AI</div>
            <div className="text-[13px] font-black text-white">관리자 로그인</div>
          </div>
        </div>
        <div className="mb-2">
          <label className="text-[9px] font-black text-[#4a7a9b] uppercase tracking-[0.1em] block mb-2">관리자 패스워드</label>
          <input
            type="password" value={pw}
            onChange={(e) => setPw(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && submit()}
            className={`w-full bg-[#020b18] border text-[13px] text-white px-4 py-3 outline-none transition-colors ${err ? 'border-[#ff2d55]' : 'border-[#0a3050] focus:border-[#00d4ff]/50'}`}
            placeholder="패스워드 입력..."
          />
          {err && <p className="text-[10px] text-[#ff2d55] mt-1.5">패스워드가 올바르지 않습니다.</p>}
        </div>
        <p className="text-[9px] text-[#2a4a5e] mb-5">기본 패스워드: META2026</p>
        <button onClick={submit}
          className="clip-corner w-full py-3 bg-[#00d4ff] text-[#020b18] text-[11px] font-black tracking-[0.12em] uppercase hover:bg-[#00eeff] transition-colors">
          로그인
        </button>
        <Link to="/board/notices" className="block text-center mt-3 text-[10px] text-[#4a7a9b] hover:text-[#00d4ff] transition-colors">
          게시판으로 돌아가기
        </Link>
      </motion.div>
    </div>
  )
}

export default function AdminDashboard() {
  const { notices, reports, intels, operators, isAdmin, login, logout, deleteNotice, deleteReport, deleteIntel } = useBoard()
  const { weapons, changeLogs } = useWeapons()
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; type: 'notice' | 'report' | 'intel' } | null>(null)

  if (!isAdmin) return <LoginGate onLogin={login} />

  const stats = [
    { icon: FileText,   label: '공지사항',     value: notices.length,   sub: `고정 ${notices.filter((n) => n.pinned).length}건`,             color: '#00d4ff', href: '/admin/notices' },
    { icon: Radio,      label: '보고서',        value: reports.length,   sub: `발행 ${reports.filter((r) => r.status === 'PUBLISHED').length}건`, color: '#00ff88', href: '/admin/reports' },
    { icon: Database,   label: '인텔리전스',    value: intels.length,    sub: `활성 ${intels.filter((i) => i.status === 'ACTIVE').length}건`,    color: '#ff6b35', href: '/admin/intel' },
    { icon: Crosshair,  label: '무기 데이터베이스', value: weapons.length, sub: `변경로그 ${changeLogs.length}건`,                            color: '#ff6b35', href: '/admin/weapons' },
    { icon: Users,      label: '운영자',        value: operators.length, sub: `활성 ${operators.filter((o) => o.active).length}명`,             color: '#c084fc', href: '/admin/users' },
  ]

  return (
    <div className="min-h-screen bg-[#020b18] pt-4 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Settings className="w-4 h-4 text-[#ffcc00]" />
              <span className="text-[9px] font-black tracking-[0.25em] text-[#ffcc00] uppercase">Admin Dashboard</span>
            </div>
            <h1 className="text-2xl font-black text-white">관리자 <span className="text-[#ffcc00]">대시보드</span></h1>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/board/notices" className="text-[10px] font-bold text-[#4a7a9b] hover:text-[#00d4ff] transition-colors">게시판</Link>
            <Link to="/command" className="text-[10px] font-bold text-[#4a7a9b] hover:text-[#00d4ff] transition-colors">지휘센터</Link>
            <button onClick={logout} className="flex items-center gap-1.5 text-[10px] font-bold text-[#ff2d55]/70 hover:text-[#ff2d55] transition-colors">
              <LogOut className="w-3.5 h-3.5" /> 로그아웃
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map(({ icon: Icon, label, value, sub, color, href }) => (
            <Link key={label} to={href}
              className="clip-corner bg-[#041526]/80 border border-[#00d4ff]/10 p-5 group hover:border-[#00d4ff]/30 transition-all block">
              <div className="flex items-center justify-between mb-3">
                <Icon className="w-5 h-5" style={{ color }} />
                <ChevronRight className="w-3.5 h-3.5 text-[#4a7a9b] group-hover:text-[#00d4ff] transition-colors" />
              </div>
              <div className="text-3xl font-black number-mono mb-1" style={{ color }}>{value}</div>
              <div className="text-[10px] font-bold text-white">{label}</div>
              <div className="text-[9px] text-[#4a7a9b] mt-0.5">{sub}</div>
            </Link>
          ))}
        </div>

        {/* Admin nav */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {[
            { href: '/admin/notices',  label: '공지 관리',   icon: FileText },
            { href: '/admin/reports',  label: '보고서 관리', icon: Radio },
            { href: '/admin/intel',    label: '인텔 관리',   icon: Database },
            { href: '/admin/weapons',  label: '무기DB 관리', icon: Crosshair },
            { href: '/admin/users',    label: '운영자 관리', icon: Users },
          ].map(({ href, label, icon: Icon }) => (
            <Link key={href} to={href}
              className="flex items-center gap-1.5 px-4 py-2 border border-[#0a3050] text-[10px] font-black text-[#4a7a9b] hover:border-[#ffcc00]/40 hover:text-[#ffcc00] transition-all clip-corner-sm">
              <Icon className="w-3.5 h-3.5" /> {label}
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
          {/* Recent Notices */}
          <div className="clip-corner bg-[#041526]/80 border border-[#00d4ff]/10 p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-black tracking-[0.15em] text-[#00d4ff] uppercase">최근 공지사항</span>
              <Link to="/admin/notices" className="text-[9px] text-[#4a7a9b] hover:text-[#00d4ff] flex items-center gap-1">관리 <ChevronRight className="w-3 h-3" /></Link>
            </div>
            <div className="space-y-2">
              {notices.slice(0, 5).map((n) => (
                <div key={n.id} className="flex items-center gap-2 py-1.5 border-b border-[#0a3050]/50 last:border-0">
                  <span className="text-[8px] font-black shrink-0 px-1 py-0.5" style={{ color: NOTICE_CATEGORY_COLORS[n.category], background: `${NOTICE_CATEGORY_COLORS[n.category]}15` }}>{n.category}</span>
                  <span className="text-[11px] text-white flex-1 truncate">{n.title}</span>
                  <div className="flex gap-1 shrink-0">
                    <button onClick={() => setDeleteTarget({ id: n.id, type: 'notice' })} className="p-0.5 text-[#4a7a9b] hover:text-[#ff2d55] transition-colors"><Trash2 className="w-3 h-3" /></button>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/admin/notices" className="flex items-center justify-center gap-1.5 mt-3 py-2 border border-[#0a3050] text-[9px] font-black text-[#4a7a9b] hover:border-[#00d4ff]/30 hover:text-[#00d4ff] transition-all clip-corner-sm">
              <Plus className="w-3 h-3" /> 공지 등록
            </Link>
          </div>

          {/* Recent Reports */}
          <div className="clip-corner bg-[#041526]/80 border border-[#00d4ff]/10 p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-black tracking-[0.15em] text-[#00d4ff] uppercase">최근 보고서</span>
              <Link to="/admin/reports" className="text-[9px] text-[#4a7a9b] hover:text-[#00d4ff] flex items-center gap-1">관리 <ChevronRight className="w-3 h-3" /></Link>
            </div>
            <div className="space-y-2">
              {reports.slice(0, 5).map((r) => (
                <div key={r.id} className="flex items-center gap-2 py-1.5 border-b border-[#0a3050]/50 last:border-0">
                  <span className="text-[8px] font-black shrink-0 text-[#00d4ff] bg-[#00d4ff]/10 px-1 py-0.5">{r.source}</span>
                  <span className="text-[11px] text-white flex-1 truncate">{r.title}</span>
                  <span className="text-[8px] font-black px-1 py-0.5 shrink-0" style={{ color: STATUS_COLORS[r.status], background: `${STATUS_COLORS[r.status]}15` }}>
                    {r.status === 'PUBLISHED' ? '발행' : r.status === 'REVIEW' ? '검토' : '초안'}
                  </span>
                  <button onClick={() => setDeleteTarget({ id: r.id, type: 'report' })} className="p-0.5 text-[#4a7a9b] hover:text-[#ff2d55] transition-colors shrink-0"><Trash2 className="w-3 h-3" /></button>
                </div>
              ))}
            </div>
            <Link to="/admin/reports" className="flex items-center justify-center gap-1.5 mt-3 py-2 border border-[#0a3050] text-[9px] font-black text-[#4a7a9b] hover:border-[#00d4ff]/30 hover:text-[#00d4ff] transition-all clip-corner-sm">
              <Plus className="w-3 h-3" /> 보고서 등록
            </Link>
          </div>

          {/* Intel alerts */}
          <div className="clip-corner bg-[#041526]/80 border border-[#00d4ff]/10 p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-black tracking-[0.15em] text-[#00d4ff] uppercase">활성 인텔리전스</span>
              <Link to="/admin/intel" className="text-[9px] text-[#4a7a9b] hover:text-[#00d4ff] flex items-center gap-1">관리 <ChevronRight className="w-3 h-3" /></Link>
            </div>
            <div className="space-y-2">
              {intels.filter((i) => i.status === 'ACTIVE').slice(0, 5).map((intel) => (
                <div key={intel.id} className="flex items-center gap-2 py-1.5 border-b border-[#0a3050]/50 last:border-0">
                  <div className="w-1.5 h-1.5 rounded-full shrink-0 animate-pulse" style={{ background: THREAT_COLORS[intel.threatLevel] }} />
                  <span className="text-[11px] text-white flex-1 truncate">{intel.title}</span>
                  <span className="text-[8px] font-black shrink-0" style={{ color: THREAT_COLORS[intel.threatLevel] }}>{intel.threatLevel}</span>
                  <button onClick={() => setDeleteTarget({ id: intel.id, type: 'intel' })} className="p-0.5 text-[#4a7a9b] hover:text-[#ff2d55] transition-colors shrink-0"><Trash2 className="w-3 h-3" /></button>
                </div>
              ))}
              {intels.filter((i) => i.status === 'ACTIVE').length === 0 && (
                <div className="py-6 text-center text-[11px] text-[#4a7a9b]">활성 인텔 없음</div>
              )}
            </div>
            <Link to="/admin/intel" className="flex items-center justify-center gap-1.5 mt-3 py-2 border border-[#0a3050] text-[9px] font-black text-[#4a7a9b] hover:border-[#00d4ff]/30 hover:text-[#00d4ff] transition-all clip-corner-sm">
              <Plus className="w-3 h-3" /> 인텔 등록
            </Link>
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={!!deleteTarget}
        title="삭제 확인"
        message="이 항목을 삭제합니다."
        danger confirmLabel="삭제"
        onConfirm={() => {
          if (!deleteTarget) return
          if (deleteTarget.type === 'notice') deleteNotice(deleteTarget.id)
          if (deleteTarget.type === 'report') deleteReport(deleteTarget.id)
          if (deleteTarget.type === 'intel') deleteIntel(deleteTarget.id)
          setDeleteTarget(null)
        }}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  )
}
