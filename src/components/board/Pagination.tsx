import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Props {
  page: number
  total: number
  pageSize: number
  onChange: (p: number) => void
}

export default function Pagination({ page, total, pageSize, onChange }: Props) {
  const totalPages = Math.ceil(total / pageSize)
  if (totalPages <= 1) return null

  const pages: (number | '...')[] = []
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || Math.abs(i - page) <= 2) pages.push(i)
    else if (pages[pages.length - 1] !== '...') pages.push('...')
  }

  return (
    <div className="flex items-center justify-center gap-1 mt-8">
      <button
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        className="w-8 h-8 flex items-center justify-center border border-[#0a3050] text-[#4a7a9b] hover:border-[#00d4ff]/40 hover:text-[#00d4ff] disabled:opacity-30 transition-all clip-corner-sm"
      >
        <ChevronLeft className="w-3.5 h-3.5" />
      </button>
      {pages.map((p, i) =>
        p === '...' ? (
          <span key={i} className="w-8 h-8 flex items-center justify-center text-[#4a7a9b] text-[11px]">…</span>
        ) : (
          <button
            key={p}
            onClick={() => onChange(p as number)}
            className={`w-8 h-8 flex items-center justify-center text-[11px] font-black border transition-all clip-corner-sm ${
              p === page
                ? 'bg-[#00d4ff] border-[#00d4ff] text-[#020b18]'
                : 'border-[#0a3050] text-[#4a7a9b] hover:border-[#00d4ff]/40 hover:text-[#00d4ff]'
            }`}
          >
            {p}
          </button>
        )
      )}
      <button
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        className="w-8 h-8 flex items-center justify-center border border-[#0a3050] text-[#4a7a9b] hover:border-[#00d4ff]/40 hover:text-[#00d4ff] disabled:opacity-30 transition-all clip-corner-sm"
      >
        <ChevronRight className="w-3.5 h-3.5" />
      </button>
    </div>
  )
}
