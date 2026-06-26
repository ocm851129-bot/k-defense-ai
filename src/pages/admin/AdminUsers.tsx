import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Users, Plus, Pencil, Trash2, ChevronLeft } from 'lucide-react'
import { motion } from 'framer-motion'
import { useBoard, type Operator } from '../../contexts/BoardContext'
import ConfirmDialog from '../../components/ui/ConfirmDialog'
import Toggle from '../../components/ui/Toggle'

const ROLES: Operator['role'][] = ['관리자', '분석관', '운영관', '관찰관']
const ROLE_COLORS: Record<Operator['role'], string> = {
  '관리자': '#ff2d55', '분석관': '#00d4ff', '운영관': '#00ff88', '관찰관': '#ffcc00',
}

export default function AdminUsers() {
  const { operators, isAdmin, addOperator, updateOperator, deleteOperator } = useBoard()
  const [editId, setEditId] = useState<string | null>(null)
  const [writing, setWriting] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null)
  const [form, setForm] = useState({ name: '', rank: '', unit: '', role: '분석관' as Operator['role'], active: true })

  if (!isAdmin) return <Navigate to="/admin" />

  function openWrite() {
    setForm({ name: '', rank: '', unit: '', role: '분석관', active: true })
    setWriting(true); setEditId(null)
  }
  function openEdit(id: string) {
    const op = operators.find((o) => o.id === id)!
    setForm({ name: op.name, rank: op.rank, unit: op.unit, role: op.role, active: op.active })
    setEditId(id); setWriting(false)
  }
  function submit() {
    if (editId) { updateOperator(editId, form); setEditId(null) }
    else { addOperator(form); setWriting(false) }
  }

  return (
    <div className="min-h-screen bg-[#020b18] pt-4 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <Link to="/admin" className="flex items-center gap-1.5 text-[10px] text-[#4a7a9b] hover:text-[#00d4ff] mb-2 transition-colors">
              <ChevronLeft className="w-3.5 h-3.5" /> 관리자 대시보드
            </Link>
            <h1 className="text-2xl font-black text-white flex items-center gap-2">
              <Users className="w-6 h-6 text-[#c084fc]" /> 운영자 관리
            </h1>
          </div>
          <button onClick={openWrite}
            className="flex items-center gap-1.5 clip-corner-sm px-4 py-2 bg-[#c084fc] text-[#020b18] text-[10px] font-black tracking-[0.1em] uppercase">
            <Plus className="w-3.5 h-3.5" /> 운영자 등록
          </button>
        </div>

        {/* Form */}
        {(writing || editId) && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="clip-corner bg-[#041526]/80 border border-[#c084fc]/20 p-5 mb-5">
            <div className="text-[10px] font-black tracking-[0.2em] text-[#c084fc] uppercase mb-4">{editId ? '운영자 수정' : '운영자 등록'}</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="bg-[#020b18] border border-[#0a3050] text-[12px] text-[#8ab8d4] px-3 py-2 outline-none focus:border-[#c084fc]/50" placeholder="성명 *" />
              <input value={form.rank} onChange={(e) => setForm({ ...form, rank: e.target.value })}
                className="bg-[#020b18] border border-[#0a3050] text-[12px] text-[#8ab8d4] px-3 py-2 outline-none focus:border-[#c084fc]/50" placeholder="계급/직급" />
              <input value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })}
                className="bg-[#020b18] border border-[#0a3050] text-[12px] text-[#8ab8d4] px-3 py-2 outline-none focus:border-[#c084fc]/50" placeholder="부서/단위" />
              <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as Operator['role'] })}
                className="bg-[#020b18] border border-[#0a3050] text-[12px] text-[#8ab8d4] px-3 py-2 outline-none focus:border-[#c084fc]/50">
                {ROLES.map((r) => <option key={r}>{r}</option>)}
              </select>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <label className="text-[10px] text-[#4a7a9b]">활성 상태</label>
              <Toggle checked={form.active} onChange={() => setForm({ ...form, active: !form.active })} color="#c084fc" size="sm" />
            </div>
            <div className="flex gap-2">
              <button onClick={() => { setWriting(false); setEditId(null) }}
                className="px-4 py-2 border border-[#0a3050] text-[10px] font-bold text-[#4a7a9b] hover:border-[#c084fc]/30 clip-corner-sm transition-all">취소</button>
              <button onClick={submit} disabled={!form.name}
                className="px-6 py-2 bg-[#c084fc] text-[#020b18] text-[10px] font-black clip-corner-sm hover:bg-[#d0a0ff] disabled:opacity-40">
                {editId ? '수정 완료' : '등록'}
              </button>
            </div>
          </motion.div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-4 gap-3 mb-5">
          {ROLES.map((role) => {
            const count = operators.filter((o) => o.role === role).length
            return (
              <div key={role} className="clip-corner-sm bg-[#041526]/80 border border-[#00d4ff]/10 p-3 text-center">
                <div className="text-xl font-black number-mono mb-1" style={{ color: ROLE_COLORS[role] }}>{count}</div>
                <div className="text-[9px] text-[#4a7a9b]">{role}</div>
              </div>
            )
          })}
        </div>

        {/* Table */}
        <div className="clip-corner bg-[#041526]/80 border border-[#00d4ff]/10 overflow-hidden">
          <div className="grid grid-cols-[2fr_80px_1fr_80px_80px_60px_80px] gap-0 px-5 py-2.5 border-b border-[#0a3050] text-[9px] font-black tracking-[0.12em] text-[#4a7a9b] uppercase">
            <span>성명</span><span>계급</span><span>부서</span><span>권한</span><span>상태</span><span>최근로그인</span><span className="text-right">관리</span>
          </div>
          {operators.map((op, i) => (
            <motion.div key={op.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
              className="grid grid-cols-[2fr_80px_1fr_80px_80px_60px_80px] gap-0 px-5 py-3 border-b border-[#0a3050]/50 last:border-0 items-center">
              <div>
                <div className="text-[12px] font-bold text-white">{op.name}</div>
                <div className="text-[9px] text-[#4a7a9b]">{op.createdAt} 등록</div>
              </div>
              <span className="text-[11px] text-[#8ab8d4]">{op.rank}</span>
              <span className="text-[11px] text-[#8ab8d4] truncate">{op.unit}</span>
              <span className="text-[9px] font-black px-1.5 py-0.5 w-fit" style={{ color: ROLE_COLORS[op.role], background: `${ROLE_COLORS[op.role]}15` }}>{op.role}</span>
              <div className="flex items-center gap-1.5">
                <Toggle checked={op.active} onChange={() => updateOperator(op.id, { active: !op.active })} color="#00ff88" size="sm" />
              </div>
              <span className="text-[9px] font-mono text-[#4a7a9b]">{op.lastLogin.slice(0, 10) || '-'}</span>
              <div className="flex items-center gap-1.5 justify-end">
                <button onClick={() => openEdit(op.id)} className="p-1 text-[#4a7a9b] hover:text-[#00d4ff] transition-colors"><Pencil className="w-3.5 h-3.5" /></button>
                <button onClick={() => setDeleteTarget(op.id)} className="p-1 text-[#4a7a9b] hover:text-[#ff2d55] transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <ConfirmDialog open={!!deleteTarget} title="운영자 삭제" message="이 운영자 계정을 삭제합니다." danger confirmLabel="삭제"
        onConfirm={() => { deleteOperator(deleteTarget!); setDeleteTarget(null) }}
        onCancel={() => setDeleteTarget(null)} />
    </div>
  )
}
