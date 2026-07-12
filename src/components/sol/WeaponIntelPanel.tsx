import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Database, Search, X } from 'lucide-react'
import {
  WEAPONS, CATEGORY_KO, ORIGIN_KO, STATUS_KO,
  type WeaponSystem, type WeaponCategory, type WeaponOrigin, type ThreatRating,
} from '../../data/weapons'

const THREAT_COLOR: Record<ThreatRating, string> = {
  CRITICAL: '#ff2d55', HIGH: '#ff6b35', MED: '#ffcc00', LOW: '#00ff88',
}
const STATUS_COLOR: Record<string, string> = {
  OPERATIONAL: '#00ff88', DEVELOPMENT: '#ffcc00', TESTING: '#00d4ff', SUSPECTED: '#ff6b35', RETIRED: '#4a7a9b',
}

interface WeaponIntelPanelProps {
  title: string
  color: string
  /** 이 SOL 도메인에 맞는 카테고리로 기본 목록 제한 (미지정 시 전체) */
  categories?: WeaponCategory[]
  /** 기본 선택 출처 필터 */
  defaultOrigin?: WeaponOrigin | 'ALL'
  /** 출처 필터 버튼 목록 */
  originOptions?: (WeaponOrigin | 'ALL')[]
  /** 카드 클릭 시 상위 페이지에 알림 */
  onSelect?: (w: WeaponSystem) => void
}

const DEFAULT_ORIGINS: (WeaponOrigin | 'ALL')[] = ['ALL', 'DPRK', 'RUSSIA', 'CHINA', 'USA', 'ROK', 'NATO']

export default function WeaponIntelPanel({
  title, color, categories, defaultOrigin = 'ALL', originOptions = DEFAULT_ORIGINS, onSelect,
}: WeaponIntelPanelProps) {
  const [search, setSearch] = useState('')
  const [origin, setOrigin] = useState<WeaponOrigin | 'ALL'>(defaultOrigin)
  const [threat, setThreat] = useState<ThreatRating | 'ALL'>('ALL')
  const [selected, setSelected] = useState<WeaponSystem | null>(null)

  const domainPool = useMemo(() =>
    categories && categories.length > 0 ? WEAPONS.filter(w => categories.includes(w.category)) : WEAPONS,
  [categories])

  const filtered = useMemo(() => {
    return domainPool.filter(w => {
      if (origin !== 'ALL' && w.origin !== origin) return false
      if (threat !== 'ALL' && w.threatRating !== threat) return false
      if (search) {
        const q = search.toLowerCase()
        return w.name.toLowerCase().includes(q) || w.nameEng.toLowerCase().includes(q) || w.tags.some(t => t.toLowerCase().includes(q))
      }
      return true
    }).slice(0, 100)
  }, [domainPool, origin, threat, search])

  const threatCounts = (['CRITICAL', 'HIGH', 'MED', 'LOW'] as ThreatRating[]).map(t => ({
    label: t, count: domainPool.filter(w => w.threatRating === t && (origin === 'ALL' || w.origin === origin)).length, color: THREAT_COLOR[t],
  }))

  function selectWeapon(w: WeaponSystem) {
    setSelected(prev => prev?.id === w.id ? null : w)
    onSelect?.(w)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      {/* 필터 바 */}
      <div className="clip-corner bg-[#041526]/80 border p-4" style={{ borderColor: `${color}25` }}>
        <div className="flex items-center gap-2 mb-3">
          <Database className="w-4 h-4" style={{ color }} />
          <span className="text-[11px] font-black tracking-[0.2em]" style={{ color }}>{title}</span>
          <span className="ml-auto text-[9px] text-[#4a7a9b] font-mono">{filtered.length}종 표시 / 도메인 {domainPool.length}종</span>
        </div>
        <div className="relative mb-3">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#4a7a9b]" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="무기명·태그 검색..."
            className="w-full bg-[#020b18] border border-[#0a3050] pl-8 pr-3 py-2 text-[11px] text-white placeholder-[#4a7a9b] focus:outline-none"
            style={{ borderColor: search ? `${color}50` : undefined }} />
          {search && <button onClick={() => setSearch('')} className="absolute right-2.5 top-1/2 -translate-y-1/2"><X className="w-3.5 h-3.5 text-[#4a7a9b]" /></button>}
        </div>
        <div className="flex gap-2 flex-wrap">
          <div className="flex gap-1 flex-wrap">
            {originOptions.map(o => (
              <button key={o} onClick={() => setOrigin(o)}
                className="px-2 py-1 text-[9px] font-black border transition-all"
                style={origin === o ? { borderColor: color, color, background: `${color}10` } : { borderColor: '#0a3050', color: '#4a7a9b' }}>
                {o === 'ALL' ? '전체' : (ORIGIN_KO[o] ?? o)}
              </button>
            ))}
          </div>
          <div className="flex gap-1 ml-auto">
            {([{ k: 'ALL' as const, l: '전체' }, { k: 'CRITICAL' as const, l: '위급' }, { k: 'HIGH' as const, l: '높음' }, { k: 'MED' as const, l: '중간' }, { k: 'LOW' as const, l: '낮음' }]).map(({ k, l }) => (
              <button key={k} onClick={() => setThreat(k)}
                className="px-2 py-1 text-[9px] font-black border transition-all"
                style={threat === k
                  ? { borderColor: k === 'ALL' ? color : THREAT_COLOR[k as ThreatRating], color: k === 'ALL' ? color : THREAT_COLOR[k as ThreatRating], background: `${k === 'ALL' ? color : THREAT_COLOR[k as ThreatRating]}10` }
                  : { borderColor: '#0a3050', color: '#4a7a9b' }}>
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* 무기 목록 */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-[65vh] overflow-y-auto pr-1">
            {filtered.map(weapon => {
              const tc = THREAT_COLOR[weapon.threatRating]
              const sc = STATUS_COLOR[weapon.status] ?? '#4a7a9b'
              const isSelected = selected?.id === weapon.id
              return (
                <motion.button key={weapon.id} onClick={() => selectWeapon(weapon)}
                  whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                  className="text-left p-3 border transition-all"
                  style={isSelected ? { borderColor: color, background: `${color}08` } : { borderColor: '#0a3050', background: 'rgba(4,21,38,0.6)' }}>
                  <div className="flex items-start justify-between gap-1 mb-1.5">
                    <span className="text-[11px] font-black text-white leading-tight">{weapon.name}</span>
                    <span className="text-[8px] font-black px-1.5 py-0.5 border shrink-0" style={{ color: tc, borderColor: `${tc}50`, background: `${tc}10` }}>{weapon.threatRating}</span>
                  </div>
                  <div className="text-[9px] text-[#8ab8d4] mb-1.5 line-clamp-1">{weapon.nameEng}</div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[8px] font-mono text-[#4a7a9b]">{CATEGORY_KO[weapon.category] ?? weapon.category}</span>
                    <span className="text-[8px] font-black" style={{ color: sc }}>{STATUS_KO[weapon.status] ?? weapon.status}</span>
                    <span className="text-[8px] font-mono text-[#4a7a9b] ml-auto">{weapon.origin}</span>
                  </div>
                  {isSelected && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-2 pt-2 border-t border-[#0a3050]">
                      <p className="text-[9px] text-[#8ab8d4] mb-2 line-clamp-3">{weapon.description}</p>
                      <div className="grid grid-cols-2 gap-x-3 gap-y-0.5">
                        {weapon.specs.range && <div className="text-[8px]"><span className="text-[#4a7a9b]">사거리</span> <span style={{ color }}>{weapon.specs.range}</span></div>}
                        {weapon.specs.speed && <div className="text-[8px]"><span className="text-[#4a7a9b]">속도</span> <span style={{ color }}>{weapon.specs.speed}</span></div>}
                        {weapon.specs.guidance && <div className="text-[8px]"><span className="text-[#4a7a9b]">유도</span> <span className="text-[#ffcc00]">{weapon.specs.guidance}</span></div>}
                        {weapon.specs.firstDeployed && <div className="text-[8px]"><span className="text-[#4a7a9b]">배치</span> <span className="text-white">{weapon.specs.firstDeployed}</span></div>}
                        {weapon.specs.manufacturer && <div className="text-[8px] col-span-2"><span className="text-[#4a7a9b]">제조</span> <span className="text-white">{weapon.specs.manufacturer}</span></div>}
                      </div>
                      <div className="mt-1.5 flex gap-1 flex-wrap">
                        {weapon.tags.slice(0, 4).map(t => <span key={t} className="text-[7px] px-1 py-0.5 bg-[#0a3050] text-[#8ab8d4]">{t}</span>)}
                      </div>
                      <div className="mt-2 h-1 bg-[#0a3050]"><div className="h-full" style={{ width: `${weapon.confidence}%`, background: color }} /></div>
                      <div className="text-[7px] text-[#4a7a9b] mt-0.5">정보 신뢰도 {weapon.confidence}%</div>
                    </motion.div>
                  )}
                </motion.button>
              )
            })}
            {filtered.length === 0 && <div className="col-span-2 text-center py-12 text-[#4a7a9b] text-[11px]">검색 결과 없음</div>}
          </div>
        </div>

        {/* 우측: 통계 + 상세 */}
        <div className="space-y-3">
          <div className="clip-corner bg-[#041526]/80 border p-4" style={{ borderColor: `${color}20` }}>
            <div className="text-[10px] font-black mb-3 tracking-[0.1em]" style={{ color }}>▶ 위협도 분포</div>
            {threatCounts.map(({ label, count, color: c }) => (
              <div key={label} className="mb-2">
                <div className="flex justify-between text-[9px] mb-0.5">
                  <span style={{ color: c }}>{label}</span>
                  <span className="text-white font-black">{count}</span>
                </div>
                <div className="h-1.5 bg-[#020b18]">
                  <motion.div className="h-full" style={{ background: c }}
                    initial={{ width: 0 }} animate={{ width: `${domainPool.length ? Math.min(100, (count / domainPool.length) * 400) : 0}%` }} transition={{ duration: 0.8 }} />
                </div>
              </div>
            ))}
          </div>

          {selected && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="clip-corner bg-[#041526]/80 border border-[#ffcc00]/30 p-4">
              <div className="text-[9px] font-black text-[#ffcc00] mb-2 tracking-[0.1em]">▶ 선택 무기 인텔</div>
              <div className="text-[13px] font-black text-white mb-1">{selected.name}</div>
              <div className="text-[9px] text-[#8ab8d4] mb-3">{selected.nameEng}</div>
              <p className="text-[10px] text-[#8ab8d4] leading-relaxed mb-3">{selected.description}</p>
              {selected.wikiUrl && (
                <a href={selected.wikiUrl} target="_blank" rel="noopener noreferrer" className="mt-2 flex items-center gap-1 text-[9px] hover:underline" style={{ color }}>
                  Wikipedia 참조 →
                </a>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
