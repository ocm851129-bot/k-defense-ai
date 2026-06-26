import { useState } from 'react'
import { Search, Plus, Tag, Pencil, Trash2, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import BoardLayout from '../../components/board/BoardLayout'
import Pagination from '../../components/board/Pagination'
import {
  useBoard, SEC_COLORS, STATUS_COLORS,
  type ReportCategory, type SecLevel, type ReportStatus,
} from '../../contexts/BoardContext'
import ConfirmDialog from '../../components/ui/ConfirmDialog'

const PAGE_SIZE = 8
const CATEGORIES: ReportCategory[] = ['위협분석', '사이버', 'GEOINT', 'SIGINT', 'IMINT', '의사결정', '기술동향']
const SEC_LEVELS: SecLevel[] = ['PUBLIC', 'INTERNAL', 'RESTRICTED', 'CLASSIFIED']
const SOURCES = ['SOL-01', 'SOL-02', 'SOL-03', 'SOL-04', 'SOL-05', 'SOL-06', '종합']
const STATUSES: ReportStatus[] = ['DRAFT', 'REVIEW', 'PUBLISHED']
const STATUS_KO: Record<ReportStatus, string> = { DRAFT: '초안', REVIEW: '검토중', PUBLISHED: '발행' }

export default function ReportBoard() {
  const { reports, isAdmin, addReport, updateReport, deleteReport } = useBoard()
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [catFilter, setCatFilter] = useState<ReportCategory | 'ALL'>('ALL')
  const [viewId, setViewId] = useState<string | null>(null)
  const [editId, setEditId] = useState<string | null>(null)
  const [writing, setWriting] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null)

  const [form, setForm] = useState({
    title: '', summary: '', content: '', author: '', authorUnit: '',
    source: 'SOL-01', category: '위협분석' as ReportCategory,
    secLevel: 'INTERNAL' as SecLevel, status: 'DRAFT' as ReportStatus,
    tags: '', confidence: 80,
  })

  const filtered = reports
    .filter((r) => catFilter === 'ALL' || r.category === catFilter)
    .filter((r) => !search || r.title.includes(search) || r.summary.includes(search))
    .sort((a, b) => b.date.localeCompare(a.date))

  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const viewReport = reports.find((r) => r.id === viewId)

  function openWrite() {
    setForm({ title: '', summary: '', content: '', author: '', authorUnit: '', source: 'SOL-01', category: '위협분석', secLevel: 'INTERNAL', status: 'DRAFT', tags: '', confidence: 80 })
    setWriting(true); setViewId(null); setEditId(null)
  }
  function openEdit(id: string) {
    const r = reports.find((x) => x.id === id)!
    setForm({ title: r.title, summary: r.summary, content: r.content, author: r.author, authorUnit: r.authorUnit, source: r.source, category: r.category, secLevel: r.secLevel, status: r.status, tags: r.tags.join(', '), confidence: r.confidence ?? 80 })
    setEditId(id); setWriting(false); setViewId(null)
  }
  function submit() {
    const tags = form.tags.split(',').map((t) => t.trim()).filter(Boolean)
    if (editId) { updateReport(editId, { ...form, tags }); setEditId(null) }
    else { addReport({ ...form, tags }); setWriting(false) }
  }

  // ── View ──
  if (viewReport) {
    return (
      <BoardLayout>
        <div className="max-w-4xl">
          <button onClick={() => setViewId(null)} className="flex items-center gap-1.5 text-[10px] text-[#4a7a9b] hover:text-[#00d4ff] mb-5 transition-colors">← 목록으로</button>
          <div className="clip-corner bg-[#041526]/80 border border-[#00d4ff]/10 p-6">
            <div className="flex items-start gap-3 mb-5 pb-5 border-b border-[#0a3050]">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="text-[9px] font-black text-[#00d4ff] bg-[#00d4ff]/15 px-1.5 py-0.5">{viewReport.source}</span>
                  <span className="text-[9px] font-black text-[#8ab8d4] bg-[#0a3050] px-1.5 py-0.5">{viewReport.category}</span>
                  <span className="text-[9px] font-black px-1.5 py-0.5" style={{ color: SEC_COLORS[viewReport.secLevel], background: `${SEC_COLORS[viewReport.secLevel]}15` }}>{viewReport.secLevel}</span>
                  <span className="text-[9px] font-black px-1.5 py-0.5" style={{ color: STATUS_COLORS[viewReport.status], background: `${STATUS_COLORS[viewReport.status]}15` }}>{STATUS_KO[viewReport.status]}</span>
                </div>
                <h2 className="text-xl font-black text-white mb-2">{viewReport.title}</h2>
                <div className="flex items-center gap-4 text-[10px] text-[#4a7a9b]">
                  <span>{viewReport.author} ({viewReport.authorUnit})</span>
                  <span>{viewReport.date}</span>
                  {viewReport.confidence && <span className="flex items-center gap-1 text-[#00d4ff]">신뢰도 {viewReport.confidence}%</span>}
                </div>
              </div>
              {isAdmin && (
                <div className="flex gap-2">
                  <button onClick={() => openEdit(viewReport.id)} className="p-1.5 text-[#4a7a9b] hover:text-[#00d4ff] transition-colors"><Pencil className="w-4 h-4" /></button>
                  <button onClick={() => setDeleteTarget(viewReport.id)} className="p-1.5 text-[#4a7a9b] hover:text-[#ff2d55] transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div>
              )}
            </div>
            <p className="text-[12px] text-[#00d4ff]/80 italic mb-5 pb-5 border-b border-[#0a3050]">{viewReport.summary}</p>
            <div className="text-[13px] text-[#8ab8d4] leading-relaxed whitespace-pre-line mb-6">{viewReport.content}</div>
            {viewReport.tags.length > 0 && (
              <div className="flex items-center gap-2 pt-4 border-t border-[#0a3050]">
                <Tag className="w-3.5 h-3.5 text-[#4a7a9b]" />
                {viewReport.tags.map((t) => <span key={t} className="text-[9px] text-[#4a7a9b] bg-[#0a3050] px-2 py-0.5">#{t}</span>)}
              </div>
            )}
          </div>
        </div>
        <ConfirmDialog open={!!deleteTarget} title="보고서 삭제" message="이 보고서를 삭제합니다." danger confirmLabel="삭제"
          onConfirm={() => { deleteReport(deleteTarget!); setDeleteTarget(null); setViewId(null) }}
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
            <div className="text-[10px] font-black tracking-[0.2em] text-[#00d4ff] uppercase mb-5">{editId ? '보고서 수정' : '보고서 등록'}</div>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[9px] font-black text-[#4a7a9b] uppercase tracking-[0.1em] block mb-1.5">출처 AI</label>
                  <select value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value })}
                    className="w-full bg-[#020b18] border border-[#0a3050] text-[12px] text-[#8ab8d4] px-3 py-2 outline-none focus:border-[#00d4ff]/50">
                    {SOURCES.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[9px] font-black text-[#4a7a9b] uppercase tracking-[0.1em] block mb-1.5">분류</label>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as ReportCategory })}
                    className="w-full bg-[#020b18] border border-[#0a3050] text-[12px] text-[#8ab8d4] px-3 py-2 outline-none focus:border-[#00d4ff]/50">
                    {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[9px] font-black text-[#4a7a9b] uppercase tracking-[0.1em] block mb-1.5">보안 등급</label>
                  <select value={form.secLevel} onChange={(e) => setForm({ ...form, secLevel: e.target.value as SecLevel })}
                    className="w-full bg-[#020b18] border border-[#0a3050] text-[12px] text-[#8ab8d4] px-3 py-2 outline-none focus:border-[#00d4ff]/50">
                    {SEC_LEVELS.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-[9px] font-black text-[#4a7a9b] uppercase tracking-[0.1em] block mb-1.5">제목 *</label>
                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full bg-[#020b18] border border-[#0a3050] text-[13px] text-white px-3 py-2.5 outline-none focus:border-[#00d4ff]/50" placeholder="보고서 제목" />
              </div>
              <div>
                <label className="text-[9px] font-black text-[#4a7a9b] uppercase tracking-[0.1em] block mb-1.5">요약</label>
                <input value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })}
                  className="w-full bg-[#020b18] border border-[#0a3050] text-[12px] text-[#8ab8d4] px-3 py-2 outline-none focus:border-[#00d4ff]/50" placeholder="한 줄 요약" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })}
                  className="w-full bg-[#020b18] border border-[#0a3050] text-[12px] text-[#8ab8d4] px-3 py-2 outline-none focus:border-[#00d4ff]/50" placeholder="작성자" />
                <input value={form.authorUnit} onChange={(e) => setForm({ ...form, authorUnit: e.target.value })}
                  className="w-full bg-[#020b18] border border-[#0a3050] text-[12px] text-[#8ab8d4] px-3 py-2 outline-none focus:border-[#00d4ff]/50" placeholder="부서" />
              </div>
              <div>
                <label className="text-[9px] font-black text-[#4a7a9b] uppercase tracking-[0.1em] block mb-1.5">내용 *</label>
                <textarea rows={12} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })}
                  className="w-full bg-[#020b18] border border-[#0a3050] text-[12px] text-[#8ab8d4] px-3 py-2.5 outline-none focus:border-[#00d4ff]/50 resize-none"
                  placeholder="## 개요&#10;&#10;## 분석 내용&#10;&#10;## 권고사항" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[9px] font-black text-[#4a7a9b] uppercase tracking-[0.1em] block mb-1.5">상태</label>
                  <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as ReportStatus })}
                    className="w-full bg-[#020b18] border border-[#0a3050] text-[12px] text-[#8ab8d4] px-3 py-2 outline-none focus:border-[#00d4ff]/50">
                    {STATUSES.map((s) => <option key={s} value={s}>{STATUS_KO[s]}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[9px] font-black text-[#4a7a9b] uppercase tracking-[0.1em] block mb-1.5">신뢰도 {form.confidence}%</label>
                  <input type="range" min={0} max={100} value={form.confidence}
                    onChange={(e) => setForm({ ...form, confidence: Number(e.target.value) })}
                    className="w-full mt-2 accent-[#00d4ff]" />
                </div>
                <div>
                  <label className="text-[9px] font-black text-[#4a7a9b] uppercase tracking-[0.1em] block mb-1.5">태그</label>
                  <input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })}
                    className="w-full bg-[#020b18] border border-[#0a3050] text-[12px] text-[#8ab8d4] px-3 py-2 outline-none focus:border-[#00d4ff]/50" placeholder="AI, 사이버, 2026" />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => { setWriting(false); setEditId(null) }}
                  className="flex-1 py-2.5 border border-[#0a3050] text-[11px] font-bold text-[#4a7a9b] hover:border-[#00d4ff]/30 transition-all clip-corner-sm">취소</button>
                <button onClick={submit} disabled={!form.title || !form.content}
                  className="flex-1 py-2.5 bg-[#00d4ff] text-[#020b18] text-[11px] font-black tracking-[0.1em] clip-corner-sm hover:bg-[#00eeff] disabled:opacity-40 transition-all">
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
    <BoardLayout title="보고서" subtitle={`총 ${filtered.length}건`}
      actions={isAdmin ? (
        <button onClick={openWrite} className="flex items-center gap-1.5 clip-corner-sm px-4 py-2 bg-[#00d4ff] text-[#020b18] text-[10px] font-black tracking-[0.1em] uppercase">
          <Plus className="w-3.5 h-3.5" /> 보고서 등록
        </button>
      ) : undefined}
    >
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <div className="flex items-center gap-1 bg-[#041526]/80 border border-[#0a3050] px-3 py-2 flex-1 max-w-xs">
          <Search className="w-3.5 h-3.5 text-[#4a7a9b]" />
          <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            className="bg-transparent text-[12px] text-[#8ab8d4] outline-none placeholder:text-[#2a4a5e] flex-1"
            placeholder="보고서 검색..." />
        </div>
        <div className="flex flex-wrap gap-1">
          {(['ALL', ...CATEGORIES] as const).map((c) => (
            <button key={c} onClick={() => { setCatFilter(c); setPage(1) }}
              className={`px-3 py-1.5 text-[9px] font-black clip-corner-sm transition-all ${catFilter === c ? 'bg-[#00d4ff] text-[#020b18]' : 'border border-[#0a3050] text-[#4a7a9b] hover:border-[#00d4ff]/30'}`}>
              {c === 'ALL' ? '전체' : c}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {paginated.map((report, i) => (
          <motion.div key={report.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            onClick={() => setViewId(report.id)}
            className="clip-corner bg-[#041526]/80 border border-[#00d4ff]/10 p-4 cursor-pointer group hover:border-[#00d4ff]/30 transition-all">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-[9px] font-black text-[#00d4ff] bg-[#00d4ff]/15 px-1.5 py-0.5">{report.source}</span>
              <span className="text-[9px] font-black text-[#8ab8d4] bg-[#0a3050] px-1.5 py-0.5">{report.category}</span>
              <span className="text-[9px] font-black px-1.5 py-0.5" style={{ color: STATUS_COLORS[report.status], background: `${STATUS_COLORS[report.status]}15` }}>{STATUS_KO[report.status]}</span>
              <span className="ml-auto text-[9px] font-black px-1.5 py-0.5" style={{ color: SEC_COLORS[report.secLevel], background: `${SEC_COLORS[report.secLevel]}15` }}>{report.secLevel}</span>
            </div>
            <h3 className="text-[13px] font-black text-white mb-1.5 group-hover:text-[#00d4ff] transition-colors line-clamp-2">{report.title}</h3>
            <p className="text-[11px] text-[#4a7a9b] mb-3 line-clamp-2">{report.summary}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[9px] text-[#4a7a9b]">
                <span>{report.author}</span><span>·</span><span>{report.date}</span>
                {report.confidence && <span className="text-[#00d4ff]">신뢰도 {report.confidence}%</span>}
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-[#4a7a9b] group-hover:text-[#00d4ff] transition-colors" />
            </div>
          </motion.div>
        ))}
        {paginated.length === 0 && (
          <div className="col-span-2 py-16 text-center text-[12px] text-[#4a7a9b]">보고서가 없습니다.</div>
        )}
      </div>

      <Pagination page={page} total={filtered.length} pageSize={PAGE_SIZE} onChange={setPage} />
      <ConfirmDialog open={!!deleteTarget} title="보고서 삭제" message="이 보고서를 삭제합니다." danger confirmLabel="삭제"
        onConfirm={() => { deleteReport(deleteTarget!); setDeleteTarget(null) }}
        onCancel={() => setDeleteTarget(null)} />
    </BoardLayout>
  )
}
