import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Pin, Search, Plus, Eye, Tag, Trash2, Pencil } from 'lucide-react'
import { motion } from 'framer-motion'
import BoardLayout from '../../components/board/BoardLayout'
import Pagination from '../../components/board/Pagination'
import {
  useBoard, SEC_COLORS, NOTICE_CATEGORY_COLORS,
  type NoticeCategory, type SecLevel,
} from '../../contexts/BoardContext'
import ConfirmDialog from '../../components/ui/ConfirmDialog'

const PAGE_SIZE = 10
const CATEGORIES: NoticeCategory[] = ['공지', '긴급', '보안', '작전', '일반']
const SEC_LEVELS: SecLevel[] = ['PUBLIC', 'INTERNAL', 'RESTRICTED', 'CLASSIFIED']

export default function NoticeBoard() {
  const { notices, isAdmin, addNotice, updateNotice, deleteNotice, incrementView } = useBoard()
  useNavigate()
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [catFilter, setCatFilter] = useState<NoticeCategory | 'ALL'>('ALL')
  const [viewId, setViewId] = useState<string | null>(null)
  const [editId, setEditId] = useState<string | null>(null)
  const [writing, setWriting] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null)

  // Form state
  const [form, setForm] = useState({
    title: '', content: '', author: '', authorUnit: '',
    category: '공지' as NoticeCategory, secLevel: 'INTERNAL' as SecLevel,
    pinned: false, tags: '',
  })

  const filtered = notices
    .filter((n) => catFilter === 'ALL' || n.category === catFilter)
    .filter((n) => !search || n.title.includes(search) || n.content.includes(search) || n.tags.includes(search))
    .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0) || b.date.localeCompare(a.date))

  const pinned = filtered.filter((n) => n.pinned)
  const normal = filtered.filter((n) => !n.pinned)
  const paginated = [...pinned, ...normal].slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const viewNotice = notices.find((n) => n.id === viewId)

  function openWrite() {
    setForm({ title: '', content: '', author: '', authorUnit: '', category: '공지', secLevel: 'INTERNAL', pinned: false, tags: '' })
    setWriting(true)
    setViewId(null)
    setEditId(null)
  }
  function openEdit(id: string) {
    const n = notices.find((x) => x.id === id)!
    setForm({ title: n.title, content: n.content, author: n.author, authorUnit: n.authorUnit, category: n.category, secLevel: n.secLevel, pinned: n.pinned, tags: n.tags.join(', ') })
    setEditId(id)
    setWriting(false)
    setViewId(null)
  }
  function submit() {
    const tags = form.tags.split(',').map((t) => t.trim()).filter(Boolean)
    if (editId) {
      updateNotice(editId, { ...form, tags })
      setEditId(null)
    } else {
      addNotice({ ...form, tags })
      setWriting(false)
    }
  }

  // ── View Detail ────────────────────────────────────────────────────────
  if (viewNotice) {
    return (
      <BoardLayout>
        <div className="max-w-4xl">
          <button onClick={() => setViewId(null)} className="flex items-center gap-1.5 text-[10px] text-[#4a7a9b] hover:text-[#00d4ff] mb-5 transition-colors">
            ← 목록으로
          </button>
          <div className="clip-corner bg-[#041526]/80 border border-[#00d4ff]/10 p-6">
            {/* Header */}
            <div className="flex items-start gap-3 mb-5 pb-5 border-b border-[#0a3050]">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  {viewNotice.pinned && <span className="flex items-center gap-1 text-[8px] font-black text-[#ffcc00] bg-[#ffcc00]/15 px-1.5 py-0.5"><Pin className="w-2.5 h-2.5" /> 고정</span>}
                  <span className="text-[9px] font-black px-1.5 py-0.5" style={{ color: NOTICE_CATEGORY_COLORS[viewNotice.category], background: `${NOTICE_CATEGORY_COLORS[viewNotice.category]}15` }}>{viewNotice.category}</span>
                  <span className="text-[9px] font-black px-1.5 py-0.5" style={{ color: SEC_COLORS[viewNotice.secLevel], background: `${SEC_COLORS[viewNotice.secLevel]}15` }}>{viewNotice.secLevel}</span>
                </div>
                <h2 className="text-xl font-black text-white mb-2">{viewNotice.title}</h2>
                <div className="flex items-center gap-4 text-[10px] text-[#4a7a9b]">
                  <span>{viewNotice.author} ({viewNotice.authorUnit})</span>
                  <span>{viewNotice.date}</span>
                  <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {viewNotice.views}</span>
                </div>
              </div>
              {isAdmin && (
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => openEdit(viewNotice.id)} className="p-1.5 text-[#4a7a9b] hover:text-[#00d4ff] transition-colors"><Pencil className="w-4 h-4" /></button>
                  <button onClick={() => setDeleteTarget(viewNotice.id)} className="p-1.5 text-[#4a7a9b] hover:text-[#ff2d55] transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div>
              )}
            </div>
            {/* Content */}
            <div className="text-[13px] text-[#8ab8d4] leading-relaxed whitespace-pre-line mb-6">{viewNotice.content}</div>
            {/* Tags */}
            {viewNotice.tags.length > 0 && (
              <div className="flex items-center gap-2 pt-4 border-t border-[#0a3050]">
                <Tag className="w-3.5 h-3.5 text-[#4a7a9b]" />
                {viewNotice.tags.map((t) => <span key={t} className="text-[9px] text-[#4a7a9b] bg-[#0a3050] px-2 py-0.5">#{t}</span>)}
              </div>
            )}
          </div>
        </div>
        <ConfirmDialog open={!!deleteTarget} title="공지 삭제" message="이 공지를 삭제합니다." danger confirmLabel="삭제"
          onConfirm={() => { deleteNotice(deleteTarget!); setDeleteTarget(null); setViewId(null) }}
          onCancel={() => setDeleteTarget(null)} />
      </BoardLayout>
    )
  }

  // ── Write / Edit Form ──────────────────────────────────────────────────
  if (writing || editId) {
    return (
      <BoardLayout>
        <div className="max-w-3xl">
          <button onClick={() => { setWriting(false); setEditId(null) }} className="flex items-center gap-1.5 text-[10px] text-[#4a7a9b] hover:text-[#00d4ff] mb-5 transition-colors">← 목록으로</button>
          <div className="clip-corner bg-[#041526]/80 border border-[#00d4ff]/10 p-6">
            <div className="text-[10px] font-black tracking-[0.2em] text-[#00d4ff] uppercase mb-5">
              {editId ? '공지 수정' : '공지 등록'}
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[9px] font-black text-[#4a7a9b] uppercase tracking-[0.1em] block mb-1.5">분류</label>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as NoticeCategory })}
                    className="w-full bg-[#020b18] border border-[#0a3050] text-[12px] text-[#8ab8d4] px-3 py-2 outline-none focus:border-[#00d4ff]/50 transition-colors">
                    {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[9px] font-black text-[#4a7a9b] uppercase tracking-[0.1em] block mb-1.5">보안 등급</label>
                  <select value={form.secLevel} onChange={(e) => setForm({ ...form, secLevel: e.target.value as SecLevel })}
                    className="w-full bg-[#020b18] border border-[#0a3050] text-[12px] text-[#8ab8d4] px-3 py-2 outline-none focus:border-[#00d4ff]/50 transition-colors">
                    {SEC_LEVELS.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-[9px] font-black text-[#4a7a9b] uppercase tracking-[0.1em] block mb-1.5">제목 *</label>
                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full bg-[#020b18] border border-[#0a3050] text-[13px] text-white px-3 py-2.5 outline-none focus:border-[#00d4ff]/50 transition-colors"
                  placeholder="공지 제목을 입력하세요" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[9px] font-black text-[#4a7a9b] uppercase tracking-[0.1em] block mb-1.5">작성자</label>
                  <input value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })}
                    className="w-full bg-[#020b18] border border-[#0a3050] text-[12px] text-[#8ab8d4] px-3 py-2 outline-none focus:border-[#00d4ff]/50"
                    placeholder="홍길동" />
                </div>
                <div>
                  <label className="text-[9px] font-black text-[#4a7a9b] uppercase tracking-[0.1em] block mb-1.5">부서/단위</label>
                  <input value={form.authorUnit} onChange={(e) => setForm({ ...form, authorUnit: e.target.value })}
                    className="w-full bg-[#020b18] border border-[#0a3050] text-[12px] text-[#8ab8d4] px-3 py-2 outline-none focus:border-[#00d4ff]/50"
                    placeholder="작전통제실" />
                </div>
              </div>
              <div>
                <label className="text-[9px] font-black text-[#4a7a9b] uppercase tracking-[0.1em] block mb-1.5">내용 *</label>
                <textarea rows={10} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })}
                  className="w-full bg-[#020b18] border border-[#0a3050] text-[12px] text-[#8ab8d4] px-3 py-2.5 outline-none focus:border-[#00d4ff]/50 resize-none transition-colors"
                  placeholder="공지 내용을 입력하세요..." />
              </div>
              <div>
                <label className="text-[9px] font-black text-[#4a7a9b] uppercase tracking-[0.1em] block mb-1.5">태그 (쉼표 구분)</label>
                <input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })}
                  className="w-full bg-[#020b18] border border-[#0a3050] text-[12px] text-[#8ab8d4] px-3 py-2 outline-none focus:border-[#00d4ff]/50"
                  placeholder="위협, 긴급, 2026" />
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="pinned" checked={form.pinned} onChange={(e) => setForm({ ...form, pinned: e.target.checked })} className="accent-[#00d4ff]" />
                <label htmlFor="pinned" className="text-[11px] text-[#8ab8d4] cursor-pointer">상단 고정</label>
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

  // ── List ───────────────────────────────────────────────────────────────
  return (
    <BoardLayout
      title="공지사항"
      subtitle={`총 ${filtered.length}건`}
      actions={
        isAdmin ? (
          <button onClick={openWrite} className="flex items-center gap-1.5 clip-corner-sm px-4 py-2 bg-[#00d4ff] text-[#020b18] text-[10px] font-black tracking-[0.1em] uppercase">
            <Plus className="w-3.5 h-3.5" /> 공지 등록
          </button>
        ) : undefined
      }
    >
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <div className="flex items-center gap-1 bg-[#041526]/80 border border-[#0a3050] px-3 py-2 flex-1 max-w-xs">
          <Search className="w-3.5 h-3.5 text-[#4a7a9b]" />
          <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            className="bg-transparent text-[12px] text-[#8ab8d4] outline-none placeholder:text-[#2a4a5e] flex-1"
            placeholder="제목·내용·태그 검색..." />
        </div>
        <div className="flex gap-1">
          {(['ALL', ...CATEGORIES] as const).map((c) => (
            <button key={c} onClick={() => { setCatFilter(c); setPage(1) }}
              className={`px-3 py-1.5 text-[9px] font-black tracking-[0.1em] clip-corner-sm transition-all ${catFilter === c ? 'bg-[#00d4ff] text-[#020b18]' : 'border border-[#0a3050] text-[#4a7a9b] hover:border-[#00d4ff]/30'}`}>
              {c === 'ALL' ? '전체' : c}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="clip-corner bg-[#041526]/80 border border-[#00d4ff]/10 overflow-hidden">
        {/* Table header */}
        <div className="grid grid-cols-[48px_1fr_80px_80px_70px_60px] gap-0 px-4 py-2.5 border-b border-[#0a3050] text-[9px] font-black tracking-[0.12em] text-[#4a7a9b] uppercase">
          <span>번호</span><span>제목</span><span>분류</span><span>보안등급</span><span>작성일</span><span className="text-right">조회</span>
        </div>
        {paginated.length === 0 && (
          <div className="py-16 text-center text-[12px] text-[#4a7a9b]">게시글이 없습니다.</div>
        )}
        {paginated.map((notice, i) => (
          <motion.div
            key={notice.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
            onClick={() => { setViewId(notice.id); incrementView(notice.id, 'notice') }}
            className="grid grid-cols-[48px_1fr_80px_80px_70px_60px] gap-0 px-4 py-3 border-b border-[#0a3050]/50 last:border-0 cursor-pointer hover:bg-[#00d4ff]/3 transition-colors group items-center"
          >
            <span className="text-[10px] font-mono text-[#4a7a9b]">
              {notice.pinned ? <Pin className="w-3 h-3 text-[#ffcc00]" /> : filtered.length - (filtered.indexOf(notice))}
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                {notice.pinned && <span className="text-[8px] font-black text-[#ffcc00] bg-[#ffcc00]/10 px-1 shrink-0">고정</span>}
                <span className="text-[12px] font-bold text-white group-hover:text-[#00d4ff] transition-colors truncate">{notice.title}</span>
                {notice.tags.length > 0 && <span className="text-[9px] text-[#4a7a9b] shrink-0">[{notice.tags.length}]</span>}
              </div>
              <span className="text-[10px] text-[#4a7a9b]">{notice.author} · {notice.authorUnit}</span>
            </div>
            <span className="text-[9px] font-black" style={{ color: NOTICE_CATEGORY_COLORS[notice.category] }}>{notice.category}</span>
            <span className="text-[9px] font-black" style={{ color: SEC_COLORS[notice.secLevel] }}>{notice.secLevel}</span>
            <span className="text-[10px] font-mono text-[#4a7a9b]">{notice.date}</span>
            <span className="text-[10px] font-mono text-[#4a7a9b] text-right flex items-center justify-end gap-1">
              <Eye className="w-3 h-3" />{notice.views}
            </span>
          </motion.div>
        ))}
      </div>

      <Pagination page={page} total={filtered.length} pageSize={PAGE_SIZE} onChange={setPage} />

      <ConfirmDialog open={!!deleteTarget} title="공지 삭제" message="이 공지를 삭제합니다." danger confirmLabel="삭제"
        onConfirm={() => { deleteNotice(deleteTarget!); setDeleteTarget(null) }}
        onCancel={() => setDeleteTarget(null)} />
    </BoardLayout>
  )
}
