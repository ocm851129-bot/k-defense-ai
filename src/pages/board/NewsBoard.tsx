import { useState } from 'react'
import { Search, Plus, Tag, Pencil, Trash2, ChevronRight, ExternalLink, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import BoardLayout from '../../components/board/BoardLayout'
import Pagination from '../../components/board/Pagination'
import {
  useBoard, NEWS_TYPE_COLORS, NEWS_CATEGORY_COLORS,
  type NewsType, type NewsCategory, type NewsSource,
} from '../../contexts/BoardContext'
import ConfirmDialog from '../../components/ui/ConfirmDialog'

const PAGE_SIZE = 9
const NEWS_TYPES: NewsType[] = ['뉴스', '전략', '사업화']
const CATEGORIES: NewsCategory[] = ['한국방산', '북한', '미국', '중국', '러시아', '유럽', '중동', '아시아', '우크라이나', '사이버', '우주', '기술']
const SOURCES: NewsSource[] = ['국방일보', '연합뉴스', '38North', 'CSIS', 'IISS', 'Reuters', 'Defense News', 'Breaking Defense', 'Jane\'s', '기타']

export default function NewsBoard() {
  const { news, isAdmin, addNews, updateNews, deleteNews, incrementView } = useBoard()
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState<NewsType | 'ALL'>('ALL')
  const [catFilter, setCatFilter] = useState<NewsCategory | 'ALL'>('ALL')
  const [viewId, setViewId] = useState<string | null>(null)
  const [editId, setEditId] = useState<string | null>(null)
  const [writing, setWriting] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null)

  const [form, setForm] = useState({
    title: '', summary: '', content: '', source: '국방일보' as NewsSource, sourceUrl: '',
    category: '한국방산' as NewsCategory, newsType: '뉴스' as NewsType,
    tags: '', important: false,
  })

  const filtered = news
    .filter((n) => typeFilter === 'ALL' || n.newsType === typeFilter)
    .filter((n) => catFilter === 'ALL' || n.category === catFilter)
    .filter((n) => !search || n.title.includes(search) || n.summary.includes(search) || n.tags.some((t) => t.includes(search)))
    .sort((a, b) => (b.important === a.important ? b.date.localeCompare(a.date) : b.important ? 1 : -1))

  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const viewNews = news.find((n) => n.id === viewId)

  function openWrite() {
    setForm({ title: '', summary: '', content: '', source: '국방일보', sourceUrl: '', category: '한국방산', newsType: '뉴스', tags: '', important: false })
    setWriting(true); setViewId(null); setEditId(null)
  }
  function openEdit(id: string) {
    const n = news.find((x) => x.id === id)!
    setForm({ title: n.title, summary: n.summary, content: n.content, source: n.source, sourceUrl: n.sourceUrl ?? '', category: n.category, newsType: n.newsType, tags: n.tags.join(', '), important: n.important })
    setEditId(id); setWriting(false); setViewId(null)
  }
  function submit() {
    const tags = form.tags.split(',').map((t) => t.trim()).filter(Boolean)
    const payload = { ...form, sourceUrl: form.sourceUrl || undefined, tags }
    if (editId) { updateNews(editId, payload); setEditId(null) }
    else { addNews(payload); setWriting(false) }
  }

  // ── View ──
  if (viewNews) {
    return (
      <BoardLayout>
        <div className="max-w-4xl">
          <button onClick={() => setViewId(null)} className="flex items-center gap-1.5 text-[10px] text-[#4a7a9b] hover:text-[#00d4ff] mb-5 transition-colors">← 목록으로</button>
          <div className="clip-corner bg-[#041526]/80 border border-[#00d4ff]/10 p-6">
            <div className="flex items-start gap-3 mb-5 pb-5 border-b border-[#0a3050]">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="text-[9px] font-black px-1.5 py-0.5" style={{ color: NEWS_TYPE_COLORS[viewNews.newsType], background: `${NEWS_TYPE_COLORS[viewNews.newsType]}15` }}>{viewNews.newsType}</span>
                  <span className="text-[9px] font-black px-1.5 py-0.5" style={{ color: NEWS_CATEGORY_COLORS[viewNews.category], background: `${NEWS_CATEGORY_COLORS[viewNews.category]}15` }}>{viewNews.category}</span>
                  <span className="text-[9px] font-black text-[#4a7a9b] bg-[#0a3050] px-1.5 py-0.5">{viewNews.source}</span>
                  {viewNews.important && <span className="flex items-center gap-0.5 text-[9px] font-black text-[#ffcc00]"><Star className="w-3 h-3 fill-[#ffcc00]" />주요</span>}
                </div>
                <h2 className="text-xl font-black text-white mb-2">{viewNews.title}</h2>
                <div className="flex items-center gap-4 text-[10px] text-[#4a7a9b]">
                  <span>{viewNews.date}</span>
                  <span>조회 {viewNews.views}</span>
                  {viewNews.sourceUrl && (
                    <a href={viewNews.sourceUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[#00d4ff] hover:text-[#00eeff]">
                      원문 보기 <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
              {isAdmin && (
                <div className="flex gap-2">
                  <button onClick={() => openEdit(viewNews.id)} className="p-1.5 text-[#4a7a9b] hover:text-[#00d4ff] transition-colors"><Pencil className="w-4 h-4" /></button>
                  <button onClick={() => setDeleteTarget(viewNews.id)} className="p-1.5 text-[#4a7a9b] hover:text-[#ff2d55] transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div>
              )}
            </div>
            <p className="text-[12px] text-[#00d4ff]/80 italic mb-5 pb-5 border-b border-[#0a3050]">{viewNews.summary}</p>
            <div className="text-[13px] text-[#8ab8d4] leading-relaxed whitespace-pre-line mb-6">{viewNews.content}</div>
            {viewNews.tags.length > 0 && (
              <div className="flex items-center gap-2 pt-4 border-t border-[#0a3050] flex-wrap">
                <Tag className="w-3.5 h-3.5 text-[#4a7a9b]" />
                {viewNews.tags.map((t) => <span key={t} className="text-[9px] text-[#4a7a9b] bg-[#0a3050] px-2 py-0.5">#{t}</span>)}
              </div>
            )}
          </div>
        </div>
        <ConfirmDialog open={!!deleteTarget} title="뉴스 삭제" message="이 뉴스를 삭제합니다." danger confirmLabel="삭제"
          onConfirm={() => { deleteNews(deleteTarget!); setDeleteTarget(null); setViewId(null) }}
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
            <div className="text-[10px] font-black tracking-[0.2em] text-[#00d4ff] uppercase mb-5">{editId ? '뉴스 수정' : '뉴스 등록'}</div>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[9px] font-black text-[#4a7a9b] uppercase tracking-[0.1em] block mb-1.5">유형</label>
                  <select value={form.newsType} onChange={(e) => setForm({ ...form, newsType: e.target.value as NewsType })}
                    className="w-full bg-[#020b18] border border-[#0a3050] text-[12px] text-[#8ab8d4] px-3 py-2 outline-none focus:border-[#00d4ff]/50">
                    {NEWS_TYPES.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[9px] font-black text-[#4a7a9b] uppercase tracking-[0.1em] block mb-1.5">분류</label>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as NewsCategory })}
                    className="w-full bg-[#020b18] border border-[#0a3050] text-[12px] text-[#8ab8d4] px-3 py-2 outline-none focus:border-[#00d4ff]/50">
                    {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[9px] font-black text-[#4a7a9b] uppercase tracking-[0.1em] block mb-1.5">출처</label>
                  <select value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value as NewsSource })}
                    className="w-full bg-[#020b18] border border-[#0a3050] text-[12px] text-[#8ab8d4] px-3 py-2 outline-none focus:border-[#00d4ff]/50">
                    {SOURCES.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-[9px] font-black text-[#4a7a9b] uppercase tracking-[0.1em] block mb-1.5">제목 *</label>
                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full bg-[#020b18] border border-[#0a3050] text-[13px] text-white px-3 py-2.5 outline-none focus:border-[#00d4ff]/50" placeholder="뉴스 제목" />
              </div>
              <div>
                <label className="text-[9px] font-black text-[#4a7a9b] uppercase tracking-[0.1em] block mb-1.5">요약</label>
                <input value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })}
                  className="w-full bg-[#020b18] border border-[#0a3050] text-[12px] text-[#8ab8d4] px-3 py-2 outline-none focus:border-[#00d4ff]/50" placeholder="한 줄 요약" />
              </div>
              <div>
                <label className="text-[9px] font-black text-[#4a7a9b] uppercase tracking-[0.1em] block mb-1.5">원문 URL</label>
                <input value={form.sourceUrl} onChange={(e) => setForm({ ...form, sourceUrl: e.target.value })}
                  className="w-full bg-[#020b18] border border-[#0a3050] text-[12px] text-[#8ab8d4] px-3 py-2 outline-none focus:border-[#00d4ff]/50" placeholder="https://..." />
              </div>
              <div>
                <label className="text-[9px] font-black text-[#4a7a9b] uppercase tracking-[0.1em] block mb-1.5">내용 *</label>
                <textarea rows={12} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })}
                  className="w-full bg-[#020b18] border border-[#0a3050] text-[12px] text-[#8ab8d4] px-3 py-2.5 outline-none focus:border-[#00d4ff]/50 resize-none"
                  placeholder="■ 출처:&#10;&#10;【주요 내용】" />
              </div>
              <div className="grid grid-cols-2 gap-3 items-end">
                <div>
                  <label className="text-[9px] font-black text-[#4a7a9b] uppercase tracking-[0.1em] block mb-1.5">태그</label>
                  <input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })}
                    className="w-full bg-[#020b18] border border-[#0a3050] text-[12px] text-[#8ab8d4] px-3 py-2 outline-none focus:border-[#00d4ff]/50" placeholder="K9, 수출, 2026" />
                </div>
                <label className="flex items-center gap-2 text-[11px] text-[#8ab8d4] font-bold cursor-pointer pb-2.5">
                  <input type="checkbox" checked={form.important} onChange={(e) => setForm({ ...form, important: e.target.checked })} className="accent-[#ffcc00]" />
                  주요 뉴스로 표시
                </label>
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
    <BoardLayout title="국방뉴스" subtitle={`총 ${filtered.length}건 — 뉴스·전략·사업화 통합 수집`}
      actions={isAdmin ? (
        <button onClick={openWrite} className="flex items-center gap-1.5 clip-corner-sm px-4 py-2 bg-[#00d4ff] text-[#020b18] text-[10px] font-black tracking-[0.1em] uppercase">
          <Plus className="w-3.5 h-3.5" /> 뉴스 등록
        </button>
      ) : undefined}
    >
      <div className="flex flex-wrap items-center gap-3 mb-3">
        <div className="flex items-center gap-1 bg-[#041526]/80 border border-[#0a3050] px-3 py-2 flex-1 max-w-xs">
          <Search className="w-3.5 h-3.5 text-[#4a7a9b]" />
          <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            className="bg-transparent text-[12px] text-[#8ab8d4] outline-none placeholder:text-[#2a4a5e] flex-1"
            placeholder="뉴스·전략·사업 검색..." />
        </div>
        <div className="flex flex-wrap gap-1">
          {(['ALL', ...NEWS_TYPES] as const).map((t) => (
            <button key={t} onClick={() => { setTypeFilter(t); setPage(1) }}
              className={`px-3 py-1.5 text-[10px] font-black clip-corner-sm transition-all ${typeFilter === t ? 'bg-[#00d4ff] text-[#020b18]' : 'border border-[#0a3050] text-[#4a7a9b] hover:border-[#00d4ff]/30'}`}>
              {t === 'ALL' ? '전체' : t}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-1 mb-5">
        {(['ALL', ...CATEGORIES] as const).map((c) => (
          <button key={c} onClick={() => { setCatFilter(c); setPage(1) }}
            className={`px-2.5 py-1 text-[9px] font-bold clip-corner-sm transition-all ${catFilter === c ? 'bg-[#0a3050] text-[#00d4ff] border border-[#00d4ff]/40' : 'border border-[#0a3050]/60 text-[#4a7a9b] hover:border-[#00d4ff]/30'}`}>
            {c === 'ALL' ? '전체국가' : c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {paginated.map((n, i) => (
          <motion.div key={n.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            onClick={() => { setViewId(n.id); incrementView(n.id, 'news') }}
            className="clip-corner bg-[#041526]/80 border border-[#00d4ff]/10 p-4 cursor-pointer group hover:border-[#00d4ff]/30 transition-all flex flex-col">
            <div className="flex items-center gap-1.5 mb-2 flex-wrap">
              <span className="text-[9px] font-black px-1.5 py-0.5" style={{ color: NEWS_TYPE_COLORS[n.newsType], background: `${NEWS_TYPE_COLORS[n.newsType]}15` }}>{n.newsType}</span>
              <span className="text-[9px] font-black px-1.5 py-0.5" style={{ color: NEWS_CATEGORY_COLORS[n.category], background: `${NEWS_CATEGORY_COLORS[n.category]}15` }}>{n.category}</span>
              {n.important && <Star className="w-3 h-3 fill-[#ffcc00] text-[#ffcc00] ml-auto" />}
            </div>
            <h3 className="text-[13px] font-black text-white mb-1.5 group-hover:text-[#00d4ff] transition-colors line-clamp-2">{n.title}</h3>
            <p className="text-[11px] text-[#4a7a9b] mb-3 line-clamp-2 flex-1">{n.summary}</p>
            <div className="flex items-center justify-between pt-2 border-t border-[#0a3050]/60">
              <div className="flex items-center gap-1.5 text-[9px] text-[#4a7a9b]">
                <span>{n.source}</span><span>·</span><span>{n.date}</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-[#4a7a9b] group-hover:text-[#00d4ff] transition-colors" />
            </div>
          </motion.div>
        ))}
        {paginated.length === 0 && (
          <div className="col-span-3 py-16 text-center text-[12px] text-[#4a7a9b]">뉴스가 없습니다.</div>
        )}
      </div>

      <Pagination page={page} total={filtered.length} pageSize={PAGE_SIZE} onChange={setPage} />
      <ConfirmDialog open={!!deleteTarget} title="뉴스 삭제" message="이 뉴스를 삭제합니다." danger confirmLabel="삭제"
        onConfirm={() => { deleteNews(deleteTarget!); setDeleteTarget(null) }}
        onCancel={() => setDeleteTarget(null)} />
    </BoardLayout>
  )
}
