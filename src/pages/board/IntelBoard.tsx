import { useState } from 'react'
import { Search, Plus, Pencil, Trash2 } from 'lucide-react'
import { motion } from 'framer-motion'
import BoardLayout from '../../components/board/BoardLayout'
import Pagination from '../../components/board/Pagination'
import {
  useBoard, SEC_COLORS, INTEL_TYPE_COLORS, STATUS_COLORS,
  type IntelType, type SecLevel, type IntelStatus,
} from '../../contexts/BoardContext'
import ConfirmDialog from '../../components/ui/ConfirmDialog'

const PAGE_SIZE = 9
const TYPES: IntelType[] = ['THREAT', 'CYBER', 'SIGNAL', 'IMAGE', 'SECTOR', 'STRATEGIC']
const TYPE_KO: Record<IntelType, string> = { THREAT: '위협', CYBER: '사이버', SIGNAL: '신호', IMAGE: '영상', SECTOR: '구역', STRATEGIC: '전략' }
const STATUSES: IntelStatus[] = ['ACTIVE', 'PENDING', 'RESOLVED', 'ARCHIVED']
const STATUS_KO: Record<IntelStatus, string> = { ACTIVE: '활성', PENDING: '검토', RESOLVED: '해결', ARCHIVED: '보관' }
const THREAT_LEVELS = ['CRITICAL', 'HIGH', 'MED', 'LOW'] as const
const THREAT_COLORS: Record<string, string> = { CRITICAL: '#ff2d55', HIGH: '#ff6b35', MED: '#ffcc00', LOW: '#00ff88' }
const SEC_LEVELS: SecLevel[] = ['PUBLIC', 'INTERNAL', 'RESTRICTED', 'CLASSIFIED']
const SOURCES = ['SOL-01', 'SOL-02', 'SOL-03', 'SOL-04', 'SOL-05', 'SOL-06', '종합분석']

export default function IntelBoard() {
  const { intels, isAdmin, addIntel, updateIntel, deleteIntel } = useBoard()
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState<IntelType | 'ALL'>('ALL')
  const [statusFilter, setStatusFilter] = useState<IntelStatus | 'ALL'>('ALL')
  const [viewId, setViewId] = useState<string | null>(null)
  const [editId, setEditId] = useState<string | null>(null)
  const [writing, setWriting] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null)

  const [form, setForm] = useState({
    title: '', description: '', detail: '', author: '', source: 'SOL-01',
    type: 'THREAT' as IntelType, secLevel: 'RESTRICTED' as SecLevel,
    status: 'ACTIVE' as IntelStatus, threatLevel: 'HIGH' as typeof THREAT_LEVELS[number],
    confidence: 80, tags: '',
  })

  const filtered = intels
    .filter((i) => typeFilter === 'ALL' || i.type === typeFilter)
    .filter((i) => statusFilter === 'ALL' || i.status === statusFilter)
    .filter((i) => !search || i.title.includes(search) || i.description.includes(search))
    .sort((a, b) => b.date.localeCompare(a.date))

  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const viewIntel = intels.find((i) => i.id === viewId)

  function openWrite() {
    setForm({ title: '', description: '', detail: '', author: '', source: 'SOL-01', type: 'THREAT', secLevel: 'RESTRICTED', status: 'ACTIVE', threatLevel: 'HIGH', confidence: 80, tags: '' })
    setWriting(true); setViewId(null); setEditId(null)
  }
  function openEdit(id: string) {
    const it = intels.find((x) => x.id === id)!
    setForm({ title: it.title, description: it.description, detail: it.detail, author: it.author, source: it.source, type: it.type, secLevel: it.secLevel, status: it.status, threatLevel: it.threatLevel, confidence: it.confidence, tags: it.tags.join(', ') })
    setEditId(id); setWriting(false); setViewId(null)
  }
  function submit() {
    const tags = form.tags.split(',').map((t) => t.trim()).filter(Boolean)
    if (editId) { updateIntel(editId, { ...form, tags }); setEditId(null) }
    else { addIntel({ ...form, tags }); setWriting(false) }
  }

  // ── View ──
  if (viewIntel) {
    return (
      <BoardLayout>
        <div className="max-w-4xl">
          <button onClick={() => setViewId(null)} className="flex items-center gap-1.5 text-[10px] text-[#4a7a9b] hover:text-[#00d4ff] mb-5 transition-colors">← 목록으로</button>
          <div className="clip-corner bg-[#041526]/80 border p-6" style={{ borderColor: `${THREAT_COLORS[viewIntel.threatLevel]}40` }}>
            <div className="h-0.5 -mt-6 mb-5" style={{ background: THREAT_COLORS[viewIntel.threatLevel] }} />
            <div className="flex items-start justify-between gap-4 mb-5 pb-5 border-b border-[#0a3050]">
              <div>
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="text-[9px] font-black px-1.5 py-0.5" style={{ color: INTEL_TYPE_COLORS[viewIntel.type], background: `${INTEL_TYPE_COLORS[viewIntel.type]}15` }}>{TYPE_KO[viewIntel.type]}</span>
                  <span className="text-[9px] font-black px-1.5 py-0.5" style={{ color: THREAT_COLORS[viewIntel.threatLevel], background: `${THREAT_COLORS[viewIntel.threatLevel]}15` }}>{viewIntel.threatLevel}</span>
                  <span className="text-[9px] font-black px-1.5 py-0.5" style={{ color: STATUS_COLORS[viewIntel.status], background: `${STATUS_COLORS[viewIntel.status]}15` }}>{STATUS_KO[viewIntel.status]}</span>
                  <span className="text-[9px] font-black px-1.5 py-0.5" style={{ color: SEC_COLORS[viewIntel.secLevel], background: `${SEC_COLORS[viewIntel.secLevel]}15` }}>{viewIntel.secLevel}</span>
                </div>
                <h2 className="text-xl font-black text-white mb-2">{viewIntel.title}</h2>
                <div className="flex items-center gap-4 text-[10px] text-[#4a7a9b]">
                  <span>{viewIntel.source}</span><span>{viewIntel.author}</span>
                  <span>{viewIntel.date}</span>
                  <span style={{ color: THREAT_COLORS[viewIntel.threatLevel] }}>신뢰도 {viewIntel.confidence}%</span>
                </div>
              </div>
              {isAdmin && (
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => openEdit(viewIntel.id)} className="p-1.5 text-[#4a7a9b] hover:text-[#00d4ff]"><Pencil className="w-4 h-4" /></button>
                  <button onClick={() => setDeleteTarget(viewIntel.id)} className="p-1.5 text-[#4a7a9b] hover:text-[#ff2d55]"><Trash2 className="w-4 h-4" /></button>
                </div>
              )}
            </div>
            <p className="text-[13px] text-[#00d4ff]/80 italic mb-5 pb-5 border-b border-[#0a3050]">{viewIntel.description}</p>
            <div className="bg-[#020b18]/60 border border-[#0a3050] p-4 font-mono text-[11px] leading-relaxed text-[#8ab8d4] whitespace-pre-line mb-5">{viewIntel.detail}</div>
            {viewIntel.tags.length > 0 && (
              <div className="flex gap-2 flex-wrap pt-4 border-t border-[#0a3050]">
                {viewIntel.tags.map((t) => <span key={t} className="text-[9px] text-[#4a7a9b] bg-[#0a3050] px-2 py-0.5">#{t}</span>)}
              </div>
            )}
            {/* Status actions */}
            {isAdmin && (
              <div className="flex gap-2 mt-5 pt-5 border-t border-[#0a3050]">
                {STATUSES.filter((s) => s !== viewIntel.status).map((s) => (
                  <button key={s} onClick={() => updateIntel(viewIntel.id, { status: s })}
                    className="px-3 py-1.5 text-[9px] font-black clip-corner-sm border transition-all"
                    style={{ color: STATUS_COLORS[s], borderColor: `${STATUS_COLORS[s]}40`, background: `${STATUS_COLORS[s]}10` }}>
                    → {STATUS_KO[s]}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <ConfirmDialog open={!!deleteTarget} title="인텔 삭제" message="이 인텔리전스 데이터를 삭제합니다." danger confirmLabel="삭제"
          onConfirm={() => { deleteIntel(deleteTarget!); setDeleteTarget(null); setViewId(null) }}
          onCancel={() => setDeleteTarget(null)} />
      </BoardLayout>
    )
  }

  // ── Write/Edit ──
  if (writing || editId) {
    return (
      <BoardLayout>
        <div className="max-w-3xl">
          <button onClick={() => { setWriting(false); setEditId(null) }} className="flex items-center gap-1.5 text-[10px] text-[#4a7a9b] hover:text-[#00d4ff] mb-5 transition-colors">← 목록으로</button>
          <div className="clip-corner bg-[#041526]/80 border border-[#00d4ff]/10 p-6">
            <div className="text-[10px] font-black tracking-[0.2em] text-[#00d4ff] uppercase mb-5">{editId ? '인텔 수정' : '인텔 등록'}</div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: '유형', field: 'type', opts: TYPES.map((t) => ({ v: t, l: TYPE_KO[t] })) },
                  { label: '위협레벨', field: 'threatLevel', opts: THREAT_LEVELS.map((t) => ({ v: t, l: t })) },
                  { label: '보안등급', field: 'secLevel', opts: SEC_LEVELS.map((s) => ({ v: s, l: s })) },
                  { label: '상태', field: 'status', opts: STATUSES.map((s) => ({ v: s, l: STATUS_KO[s] })) },
                ].map(({ label, field, opts }) => (
                  <div key={field}>
                    <label className="text-[9px] font-black text-[#4a7a9b] uppercase tracking-[0.1em] block mb-1.5">{label}</label>
                    <select value={(form as unknown as Record<string, string>)[field]} onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                      className="w-full bg-[#020b18] border border-[#0a3050] text-[12px] text-[#8ab8d4] px-3 py-2 outline-none focus:border-[#00d4ff]/50">
                      {opts.map(({ v, l }) => <option key={v} value={v}>{l}</option>)}
                    </select>
                  </div>
                ))}
              </div>
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full bg-[#020b18] border border-[#0a3050] text-[13px] text-white px-3 py-2.5 outline-none focus:border-[#00d4ff]/50" placeholder="인텔리전스 제목 *" />
              <input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full bg-[#020b18] border border-[#0a3050] text-[12px] text-[#8ab8d4] px-3 py-2 outline-none focus:border-[#00d4ff]/50" placeholder="한 줄 요약" />
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[9px] font-black text-[#4a7a9b] uppercase tracking-[0.1em] block mb-1.5">출처</label>
                  <select value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value })}
                    className="w-full bg-[#020b18] border border-[#0a3050] text-[12px] text-[#8ab8d4] px-3 py-2 outline-none focus:border-[#00d4ff]/50">
                    {SOURCES.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[9px] font-black text-[#4a7a9b] uppercase tracking-[0.1em] block mb-1.5">신뢰도 {form.confidence}%</label>
                  <input type="range" min={0} max={100} value={form.confidence}
                    onChange={(e) => setForm({ ...form, confidence: Number(e.target.value) })}
                    className="w-full mt-2 accent-[#00d4ff]" />
                </div>
              </div>
              <textarea rows={8} value={form.detail} onChange={(e) => setForm({ ...form, detail: e.target.value })}
                className="w-full bg-[#020b18] border border-[#0a3050] text-[11px] text-[#8ab8d4] font-mono px-3 py-2.5 outline-none focus:border-[#00d4ff]/50 resize-none"
                placeholder="탐지 시각: ...\n탐지 수단: ...\n\n상세 분석:\n..." />
              <div className="grid grid-cols-2 gap-3">
                <input value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })}
                  className="w-full bg-[#020b18] border border-[#0a3050] text-[12px] text-[#8ab8d4] px-3 py-2 outline-none focus:border-[#00d4ff]/50" placeholder="분석관" />
                <input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })}
                  className="w-full bg-[#020b18] border border-[#0a3050] text-[12px] text-[#8ab8d4] px-3 py-2 outline-none focus:border-[#00d4ff]/50" placeholder="태그 (쉼표 구분)" />
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => { setWriting(false); setEditId(null) }}
                  className="flex-1 py-2.5 border border-[#0a3050] text-[11px] font-bold text-[#4a7a9b] hover:border-[#00d4ff]/30 transition-all clip-corner-sm">취소</button>
                <button onClick={submit} disabled={!form.title}
                  className="flex-1 py-2.5 bg-[#00d4ff] text-[#020b18] text-[11px] font-black tracking-[0.1em] clip-corner-sm hover:bg-[#00eeff] disabled:opacity-40">
                  {editId ? '수정 완료' : '등록'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </BoardLayout>
    )
  }

  // ── List ──
  return (
    <BoardLayout title="인텔리전스" subtitle={`총 ${filtered.length}건 · 활성 ${intels.filter((i) => i.status === 'ACTIVE').length}건`}
      actions={isAdmin ? (
        <button onClick={openWrite} className="flex items-center gap-1.5 clip-corner-sm px-4 py-2 bg-[#00d4ff] text-[#020b18] text-[10px] font-black tracking-[0.1em] uppercase">
          <Plus className="w-3.5 h-3.5" /> 인텔 등록
        </button>
      ) : undefined}
    >
      <div className="flex flex-wrap gap-2 mb-5">
        <div className="flex items-center gap-1 bg-[#041526]/80 border border-[#0a3050] px-3 py-2 flex-1 max-w-xs">
          <Search className="w-3.5 h-3.5 text-[#4a7a9b]" />
          <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            className="bg-transparent text-[12px] text-[#8ab8d4] outline-none placeholder:text-[#2a4a5e] flex-1" placeholder="검색..." />
        </div>
        <div className="flex flex-wrap gap-1">
          {(['ALL', ...TYPES] as const).map((t) => (
            <button key={t} onClick={() => { setTypeFilter(t); setPage(1) }}
              className={`px-2.5 py-1.5 text-[9px] font-black clip-corner-sm transition-all ${typeFilter === t ? 'bg-[#00d4ff] text-[#020b18]' : 'border border-[#0a3050] text-[#4a7a9b] hover:border-[#00d4ff]/30'}`}>
              {t === 'ALL' ? '전체' : TYPE_KO[t as IntelType]}
            </button>
          ))}
        </div>
        <div className="flex gap-1">
          {(['ALL', ...STATUSES] as const).map((s) => (
            <button key={s} onClick={() => { setStatusFilter(s); setPage(1) }}
              className={`px-2.5 py-1.5 text-[9px] font-black clip-corner-sm transition-all ${statusFilter === s ? 'text-[#020b18]' : 'border border-[#0a3050] text-[#4a7a9b] hover:border-[#00d4ff]/30'}`}
              style={statusFilter === s ? { background: s === 'ALL' ? '#00d4ff' : STATUS_COLORS[s as IntelStatus] } : {}}>
              {s === 'ALL' ? '전체' : STATUS_KO[s as IntelStatus]}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {paginated.map((intel, i) => (
          <motion.div key={intel.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            onClick={() => setViewId(intel.id)}
            className="clip-corner bg-[#041526]/80 border cursor-pointer group transition-all p-4"
            style={{ borderColor: `${THREAT_COLORS[intel.threatLevel]}30` }}
          >
            <div className="h-0.5 -mt-4 mb-3" style={{ background: `${THREAT_COLORS[intel.threatLevel]}60` }} />
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-[8px] font-black px-1.5 py-0.5" style={{ color: INTEL_TYPE_COLORS[intel.type], background: `${INTEL_TYPE_COLORS[intel.type]}15` }}>{TYPE_KO[intel.type]}</span>
              <span className="text-[8px] font-black px-1.5 py-0.5" style={{ color: THREAT_COLORS[intel.threatLevel], background: `${THREAT_COLORS[intel.threatLevel]}15` }}>{intel.threatLevel}</span>
              <span className="ml-auto text-[8px] font-black px-1.5 py-0.5" style={{ color: STATUS_COLORS[intel.status], background: `${STATUS_COLORS[intel.status]}15` }}>{STATUS_KO[intel.status]}</span>
            </div>
            <h3 className="text-[12px] font-black text-white mb-1.5 group-hover:text-[#00d4ff] transition-colors line-clamp-2">{intel.title}</h3>
            <p className="text-[10px] text-[#4a7a9b] mb-3 line-clamp-2">{intel.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-black text-[#00d4ff]">{intel.source}</span>
                <span className="text-[9px] text-[#4a7a9b]">{intel.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-12 h-1 bg-[#0a3050] rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${intel.confidence}%`, background: THREAT_COLORS[intel.threatLevel] }} />
                </div>
                <span className="text-[9px] font-mono" style={{ color: THREAT_COLORS[intel.threatLevel] }}>{intel.confidence}%</span>
              </div>
            </div>
          </motion.div>
        ))}
        {paginated.length === 0 && (
          <div className="col-span-3 py-16 text-center text-[12px] text-[#4a7a9b]">인텔리전스 데이터가 없습니다.</div>
        )}
      </div>
      <Pagination page={page} total={filtered.length} pageSize={PAGE_SIZE} onChange={setPage} />
    </BoardLayout>
  )
}
