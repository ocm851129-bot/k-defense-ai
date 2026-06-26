import { useState, useMemo } from 'react'
import { Search, Shield, Globe, TrendingUp, ChevronRight, X, Crosshair, Zap, Cpu, BarChart3, Building2, Package } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  WEAPONS, CATEGORY_KO, CATEGORY_COLOR, ORIGIN_COLOR, ORIGIN_KO,
  STATUS_KO, STATUS_COLOR, THREAT_COLORS,
  type WeaponSystem, type WeaponCategory, type WeaponOrigin, type WeaponStatus, type ThreatRating,
} from '../data/weapons'
import {
  COUNTRY_PROFILES, CONTRACTORS, EXPORT_DEALS, K_DEFENSE_EXPORT,
  type CountryDefenseProfile,
} from '../data/defenseIndustry'

// ── 상수 ───────────────────────────────────────────────────────────────────────

type TabId = 'weapons' | 'countries' | 'industry' | 'exports'

const TABS: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: 'weapons',   label: '무기 데이터베이스', icon: Crosshair },
  { id: 'countries', label: '국가별 방산 현황',  icon: Globe },
  { id: 'industry',  label: '방산업체',           icon: Building2 },
  { id: 'exports',   label: 'K-방산 수출',        icon: TrendingUp },
]

const ALL_CATEGORIES = Object.keys(CATEGORY_KO) as WeaponCategory[]
const ALL_ORIGINS: WeaponOrigin[] = ['ROK', 'DPRK', 'USA', 'CHINA', 'RUSSIA']
const ALL_STATUSES: WeaponStatus[] = ['OPERATIONAL', 'DEVELOPMENT', 'TESTING', 'SUSPECTED', 'RETIRED']
const THREAT_LEVELS: ThreatRating[] = ['CRITICAL', 'HIGH', 'MED', 'LOW']

const DEAL_STATUS_COLOR: Record<string, string> = {
  CONTRACTED: '#00d4ff', DELIVERED: '#00ff88', NEGOTIATING: '#ffcc00', CANCELLED: '#4a7a9b',
}
const DEAL_STATUS_KO: Record<string, string> = {
  CONTRACTED: '계약', DELIVERED: '납품완료', NEGOTIATING: '협상중', CANCELLED: '취소',
}

// ── 메인 컴포넌트 ───────────────────────────────────────────────────────────────

export default function WeaponsDB() {
  const [tab, setTab] = useState<TabId>('weapons')
  const [selectedWeapon, setSelectedWeapon] = useState<WeaponSystem | null>(null)
  const [selectedCountry, setSelectedCountry] = useState<CountryDefenseProfile | null>(null)

  // weapon filters
  const [search, setSearch]         = useState('')
  const [filterOrigin, setFilterOrigin]   = useState<WeaponOrigin | 'ALL'>('ALL')
  const [filterCat, setFilterCat]   = useState<WeaponCategory | 'ALL'>('ALL')
  const [filterStatus, setFilterStatus] = useState<WeaponStatus | 'ALL'>('ALL')
  const [filterThreat, setFilterThreat] = useState<ThreatRating | 'ALL'>('ALL')

  const filtered = useMemo(() => {
    return WEAPONS.filter((w) => {
      if (filterOrigin !== 'ALL' && w.origin !== filterOrigin) return false
      if (filterCat    !== 'ALL' && w.category !== filterCat)  return false
      if (filterStatus !== 'ALL' && w.status !== filterStatus)  return false
      if (filterThreat !== 'ALL' && w.threatRating !== filterThreat) return false
      if (search) {
        const q = search.toLowerCase()
        return w.name.toLowerCase().includes(q) ||
          w.nameEng.toLowerCase().includes(q) ||
          w.description.toLowerCase().includes(q) ||
          w.tags.some((t) => t.toLowerCase().includes(q))
      }
      return true
    })
  }, [search, filterOrigin, filterCat, filterStatus, filterThreat])

  const stats = useMemo(() => ({
    total: WEAPONS.length,
    byOrigin: ALL_ORIGINS.map((o) => ({ code: o, count: WEAPONS.filter((w) => w.origin === o).length })),
    critical: WEAPONS.filter((w) => w.threatRating === 'CRITICAL').length,
    operational: WEAPONS.filter((w) => w.status === 'OPERATIONAL').length,
  }), [])

  return (
    <div className="min-h-screen px-4 md:px-8 py-8 max-w-7xl mx-auto">

      {/* ── 헤더 ── */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 bg-[#00d4ff]/10 border border-[#00d4ff]/30 flex items-center justify-center">
            <Crosshair className="w-4 h-4 text-[#00d4ff]" />
          </div>
          <div>
            <p className="text-[9px] font-black tracking-[0.3em] text-[#00d4ff]/60 uppercase">K-Defense AI · SOL-01</p>
            <h1 className="text-2xl font-black text-white tracking-wide">무기 정보 데이터베이스</h1>
          </div>
        </div>
        <p className="text-[12px] text-[#4a7a9b] ml-11">한국군 · 북한 · 주변국 방위전력 통합 정보 서비스 — {stats.total}개 무기체계</p>

        {/* KPI 바 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">
          {[
            { label: '총 무기체계', value: stats.total, unit: '종', color: '#00d4ff' },
            { label: 'CRITICAL 위협', value: stats.critical, unit: '종', color: '#ff2d55' },
            { label: '실전배치 확인', value: stats.operational, unit: '종', color: '#00ff88' },
            { label: 'K-방산 수출', value: '140', unit: '억$', color: '#ffcc00' },
          ].map((kpi) => (
            <div key={kpi.label} className="clip-corner bg-[#041526]/60 border border-[#0a3050] p-3">
              <div className="text-[9px] font-bold tracking-[0.12em] text-[#4a7a9b] mb-1">{kpi.label}</div>
              <div className="text-2xl font-black" style={{ color: kpi.color }}>{kpi.value}<span className="text-sm ml-1 font-bold text-[#4a7a9b]">{kpi.unit}</span></div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 탭 ── */}
      <div className="flex items-center gap-1 mb-6 border-b border-[#0a3050] overflow-x-auto pb-0">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => setTab(id)}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-[11px] font-black tracking-[0.1em] whitespace-nowrap transition-all border-b-2 -mb-px ${
              tab === id ? 'text-[#00d4ff] border-[#00d4ff]' : 'text-[#4a7a9b] border-transparent hover:text-[#8ab8d4]'
            }`}>
            <Icon className="w-3.5 h-3.5" />{label}
          </button>
        ))}
      </div>

      {/* ══════════════════════════════ TAB: 무기 DB ══════════════════════════════ */}
      {tab === 'weapons' && (
        <div className="flex gap-5">
          {/* 목록 패널 */}
          <div className={`flex-1 min-w-0 transition-all ${selectedWeapon ? 'hidden md:block md:w-[45%] md:flex-none' : ''}`}>
            {/* 필터 */}
            <div className="space-y-2 mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#4a7a9b]" />
                <input
                  value={search} onChange={(e) => setSearch(e.target.value)}
                  placeholder="무기명, 영문명, 태그 검색..."
                  className="w-full bg-[#041526]/80 border border-[#0a3050] pl-9 pr-4 py-2 text-[11px] text-white placeholder-[#2a4a6a] focus:outline-none focus:border-[#00d4ff]/50"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {/* 출처 필터 */}
                <div className="flex items-center gap-1">
                  {(['ALL', ...ALL_ORIGINS] as const).map((o) => (
                    <button key={o} onClick={() => setFilterOrigin(o)}
                      className={`px-2 py-0.5 text-[9px] font-black transition-all ${
                        filterOrigin === o
                          ? 'text-[#020b18]'
                          : 'text-[#4a7a9b] bg-[#041526]/50 hover:text-white'
                      }`}
                      style={filterOrigin === o ? { background: o === 'ALL' ? '#00d4ff' : ORIGIN_COLOR[o as WeaponOrigin] } : {}}>
                      {o === 'ALL' ? '전체' : o}
                    </button>
                  ))}
                </div>
                {/* 위협등급 필터 */}
                <div className="flex items-center gap-1">
                  {(['ALL', ...THREAT_LEVELS] as const).map((t) => (
                    <button key={t} onClick={() => setFilterThreat(t)}
                      className={`px-2 py-0.5 text-[9px] font-black transition-all ${
                        filterThreat === t ? 'text-[#020b18]' : 'text-[#4a7a9b] bg-[#041526]/50 hover:text-white'
                      }`}
                      style={filterThreat === t ? { background: t === 'ALL' ? '#00d4ff' : THREAT_COLORS[t as ThreatRating] } : {}}>
                      {t === 'ALL' ? '전위협' : t}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                <select value={filterCat} onChange={(e) => setFilterCat(e.target.value as WeaponCategory | 'ALL')}
                  className="bg-[#041526] border border-[#0a3050] text-[10px] text-[#8ab8d4] px-2 py-1 focus:outline-none">
                  <option value="ALL">전체 분류</option>
                  {ALL_CATEGORIES.map((c) => <option key={c} value={c}>{CATEGORY_KO[c]}</option>)}
                </select>
                <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value as WeaponStatus | 'ALL')}
                  className="bg-[#041526] border border-[#0a3050] text-[10px] text-[#8ab8d4] px-2 py-1 focus:outline-none">
                  <option value="ALL">전체 상태</option>
                  {ALL_STATUSES.map((s) => <option key={s} value={s}>{STATUS_KO[s]}</option>)}
                </select>
                <span className="flex items-center text-[10px] text-[#4a7a9b] ml-1">{filtered.length}건</span>
              </div>
            </div>

            {/* 카드 목록 */}
            <div className="space-y-2 max-h-[calc(100vh-320px)] overflow-y-auto pr-1">
              {filtered.map((w) => (
                <motion.button key={w.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  onClick={() => setSelectedWeapon(selectedWeapon?.id === w.id ? null : w)}
                  className={`w-full text-left clip-corner border transition-all p-3 group ${
                    selectedWeapon?.id === w.id
                      ? 'bg-[#041526] border-[#00d4ff]/40'
                      : 'bg-[#020e1f]/80 border-[#0a3050] hover:border-[#00d4ff]/20 hover:bg-[#041526]/60'
                  }`}>
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 flex items-center justify-center text-[9px] font-black rounded shrink-0"
                      style={{ background: `${ORIGIN_COLOR[w.origin]}20`, color: ORIGIN_COLOR[w.origin] }}>
                      {w.origin}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <span className="text-[13px] font-black text-white">{w.name}</span>
                        <span className="text-[9px] text-[#4a7a9b]">{w.nameEng}</span>
                        <div className="ml-auto flex items-center gap-1">
                          <span className="text-[8px] font-black px-1.5 py-0.5"
                            style={{ color: THREAT_COLORS[w.threatRating], background: `${THREAT_COLORS[w.threatRating]}15` }}>
                            {w.threatRating}
                          </span>
                          <span className="text-[8px] font-black px-1.5 py-0.5"
                            style={{ color: STATUS_COLOR[w.status], background: `${STATUS_COLOR[w.status]}15` }}>
                            {STATUS_KO[w.status]}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-[8px] font-black px-1.5 py-0.5"
                          style={{ color: CATEGORY_COLOR[w.category], background: `${CATEGORY_COLOR[w.category]}15` }}>
                          {CATEGORY_KO[w.category]}
                        </span>
                        {w.specs.range && (
                          <span className="text-[9px] text-[#4a7a9b]">사거리 {w.specs.range}</span>
                        )}
                      </div>
                      <p className="text-[10px] text-[#6a9ab8] line-clamp-2">{w.description}</p>
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {w.tags.slice(0, 4).map((t) => (
                          <span key={t} className="text-[8px] text-[#2a5a7a] bg-[#041526] px-1.5 py-0.5">#{t}</span>
                        ))}
                      </div>
                    </div>
                    <ChevronRight className={`w-3.5 h-3.5 text-[#2a4a6a] shrink-0 transition-transform mt-1 ${selectedWeapon?.id === w.id ? 'rotate-90 text-[#00d4ff]' : 'group-hover:translate-x-0.5'}`} />
                  </div>
                </motion.button>
              ))}
              {filtered.length === 0 && (
                <div className="py-16 text-center text-[#2a4a6a] text-sm">검색 결과 없음</div>
              )}
            </div>
          </div>

          {/* 상세 패널 */}
          <AnimatePresence>
            {selectedWeapon && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="md:flex-1 w-full md:w-auto"
              >
                <WeaponDetailPanel weapon={selectedWeapon} onClose={() => setSelectedWeapon(null)} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* ══════════════════════════════ TAB: 국가별 방산 현황 ══════════════════════════════ */}
      {tab === 'countries' && (
        <div className="flex gap-5">
          {/* 국가 목록 */}
          <div className={`flex-1 min-w-0 space-y-3 ${selectedCountry ? 'hidden md:block md:w-[38%] md:flex-none' : ''}`}>
            {COUNTRY_PROFILES.map((cp) => (
              <button key={cp.code} onClick={() => setSelectedCountry(selectedCountry?.code === cp.code ? null : cp)}
                className={`w-full text-left clip-corner border p-4 transition-all group ${
                  selectedCountry?.code === cp.code
                    ? 'bg-[#041526] border-[#00d4ff]/40'
                    : 'bg-[#020e1f]/80 border-[#0a3050] hover:border-[#00d4ff]/20 hover:bg-[#041526]/60'
                }`}>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{cp.flag}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-base font-black text-white">{cp.nameKo}</span>
                      {cp.nuclearStatus === 'CONFIRMED' && (
                        <span className="text-[8px] font-black px-1.5 py-0.5 text-[#ff2d55] bg-[#ff2d55]/15">☢ 핵보유</span>
                      )}
                      {cp.nuclearStatus === 'NATO_SHARING' && (
                        <span className="text-[8px] font-black px-1.5 py-0.5 text-[#ffcc00] bg-[#ffcc00]/15">NATO 핵공유</span>
                      )}
                    </div>
                    <div className="grid grid-cols-3 gap-2 mb-2">
                      <div>
                        <div className="text-[8px] text-[#4a7a9b]">국방예산</div>
                        <div className="text-[12px] font-black" style={{ color: cp.color }}>${cp.budget2024}B</div>
                        <div className="text-[8px] text-[#4a7a9b]">GDP {cp.budgetGdpPct}%</div>
                      </div>
                      <div>
                        <div className="text-[8px] text-[#4a7a9b]">병력</div>
                        <div className="text-[12px] font-black text-white">{cp.personnel}만</div>
                        <div className="text-[8px] text-[#4a7a9b]">예비군 {cp.reservePersonnel}만</div>
                      </div>
                      <div>
                        <div className="text-[8px] text-[#4a7a9b]">방산수출</div>
                        <div className="text-[12px] font-black text-[#00ff88]">${cp.exportVolume2024}B</div>
                        <div className="text-[8px] text-[#4a7a9b]">수입 ${cp.importVolume2024}B</div>
                      </div>
                    </div>
                    <p className="text-[10px] text-[#6a9ab8] line-clamp-2">{cp.description}</p>
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 text-[#2a4a6a] shrink-0 transition-transform mt-1 ${selectedCountry?.code === cp.code ? 'rotate-90 text-[#00d4ff]' : 'group-hover:translate-x-0.5'}`} />
                </div>
              </button>
            ))}
          </div>

          {/* 국가 상세 패널 */}
          <AnimatePresence>
            {selectedCountry && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="md:flex-1 w-full md:w-auto"
              >
                <CountryDetailPanel profile={selectedCountry} onClose={() => setSelectedCountry(null)} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* ══════════════════════════════ TAB: 방산업체 ══════════════════════════════ */}
      {tab === 'industry' && (
        <div className="space-y-3">
          {['ROK', 'USA', 'CHINA', 'RUSSIA'].map((origin) => {
            const list = CONTRACTORS.filter((c) => c.countryCode === origin)
            if (!list.length) return null
            return (
              <div key={origin}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: ORIGIN_COLOR[origin as WeaponOrigin] }} />
                  <span className="text-[11px] font-black tracking-[0.12em]" style={{ color: ORIGIN_COLOR[origin as WeaponOrigin] }}>
                    {ORIGIN_KO[origin as WeaponOrigin]} 방산업체
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 mb-4">
                  {list.map((c) => (
                    <div key={c.id} className="clip-corner bg-[#020e1f]/80 border border-[#0a3050] p-4 hover:border-[#00d4ff]/20 transition-all">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="text-sm font-black text-white mb-0.5">{c.name}</div>
                          <div className="text-[9px] text-[#4a7a9b]">{c.country}</div>
                        </div>
                        {c.stockSymbol && (
                          <span className="text-[8px] font-mono text-[#00d4ff] bg-[#00d4ff]/10 px-1.5 py-0.5">{c.stockSymbol}</span>
                        )}
                      </div>
                      <div className="grid grid-cols-3 gap-2 mb-3 pb-3 border-b border-[#0a3050]">
                        <div>
                          <div className="text-[8px] text-[#4a7a9b]">매출</div>
                          <div className="text-[13px] font-black text-white">${c.revenue2024}B</div>
                        </div>
                        <div>
                          <div className="text-[8px] text-[#4a7a9b]">방산매출</div>
                          <div className="text-[13px] font-black" style={{ color: ORIGIN_COLOR[origin as WeaponOrigin] }}>${c.defenseRevenue2024}B</div>
                        </div>
                        <div>
                          <div className="text-[8px] text-[#4a7a9b]">임직원</div>
                          <div className="text-[13px] font-black text-white">{c.employees.toLocaleString()}</div>
                        </div>
                      </div>
                      <div className="mb-2">
                        <div className="text-[8px] text-[#4a7a9b] mb-1">주요 제품</div>
                        <div className="flex flex-wrap gap-1">
                          {c.keyProducts.slice(0, 4).map((p) => (
                            <span key={p} className="text-[8px] text-[#4a7a9b] bg-[#041526] px-1.5 py-0.5">{p}</span>
                          ))}
                          {c.keyProducts.length > 4 && (
                            <span className="text-[8px] text-[#2a4a6a]">+{c.keyProducts.length - 4}</span>
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="text-[8px] text-[#4a7a9b] mb-1">수출 시장</div>
                        <div className="text-[9px] text-[#6a9ab8]">{c.exportMarkets.slice(0, 5).join(', ')}{c.exportMarkets.length > 5 ? ' 외' : ''}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* ══════════════════════════════ TAB: K-방산 수출 ══════════════════════════════ */}
      {tab === 'exports' && (
        <div className="space-y-6">
          {/* 연도별 수출 차트 */}
          <div className="clip-corner bg-[#041526]/60 border border-[#0a3050] p-5">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-4 h-4 text-[#00ff88]" />
              <span className="text-[11px] font-black tracking-[0.12em] text-[#00ff88]">K-방산 수출 추이 (2015~2024, USD 억 달러)</span>
            </div>
            <div className="flex items-end gap-2 h-36">
              {K_DEFENSE_EXPORT.map((d) => {
                const max = Math.max(...K_DEFENSE_EXPORT.map((x) => x.value))
                const pct = (d.value / max) * 100
                return (
                  <div key={d.year} className="flex-1 flex flex-col items-center gap-1 group relative">
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#020b18] border border-[#00d4ff]/20 px-2 py-1 text-[8px] text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                      {d.highlight}
                    </div>
                    <div className="text-[8px] font-black text-[#00ff88]">${d.value}B</div>
                    <div className="w-full rounded-sm transition-all"
                      style={{ height: `${pct}%`, background: d.year >= 2022 ? '#00ff88' : '#00ff8840', minHeight: 4 }} />
                    <div className="text-[8px] text-[#4a7a9b]">{d.year}</div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* 주요 수출 계약 */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Package className="w-4 h-4 text-[#00d4ff]" />
              <span className="text-[11px] font-black tracking-[0.12em] text-[#00d4ff]">주요 방산 수출 계약 (2020~2026)</span>
            </div>
            <div className="space-y-2">
              {EXPORT_DEALS.sort((a, b) => b.valueUsd - a.valueUsd).map((deal) => (
                <div key={deal.id} className="clip-corner bg-[#020e1f]/80 border border-[#0a3050] p-4 hover:border-[#00d4ff]/20 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="text-center shrink-0">
                      <div className="text-[8px] text-[#4a7a9b]">판매국</div>
                      <div className="text-[11px] font-black" style={{ color: ORIGIN_COLOR[deal.seller === '대한민국' ? 'ROK' : deal.seller === '미국' ? 'USA' : 'CHINA'] }}>{deal.seller}</div>
                      <div className="text-[8px] text-[#4a7a9b] mt-0.5">→</div>
                      <div className="text-[8px] text-[#4a7a9b]">구매국</div>
                      <div className="text-[11px] font-black text-white">{deal.buyer}</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="text-[13px] font-black text-white leading-tight">{deal.item}</div>
                        <div className="text-right shrink-0">
                          <div className="text-[16px] font-black text-[#00ff88]">${deal.valueUsd}B</div>
                          <div className="text-[8px] text-[#4a7a9b]">USD {deal.valueUsd * 100}억</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[8px] font-black px-1.5 py-0.5"
                          style={{ color: DEAL_STATUS_COLOR[deal.status], background: `${DEAL_STATUS_COLOR[deal.status]}15` }}>
                          {DEAL_STATUS_KO[deal.status]}
                        </span>
                        <span className="text-[8px] text-[#4a7a9b]">{deal.category}</span>
                        <span className="text-[8px] text-[#4a7a9b]">계약 {deal.signedYear}년</span>
                        <span className="text-[8px] text-[#4a7a9b]">납품 {deal.deliveryYear}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ── 무기 상세 패널 ─────────────────────────────────────────────────────────────

function WeaponDetailPanel({ weapon: w, onClose }: { weapon: WeaponSystem; onClose: () => void }) {
  const specEntries = Object.entries(w.specs).filter(([, v]) => v)
  const specLabels: Record<string, string> = {
    range: '사거리', speed: '속도', payload: '탑재량', length: '전장',
    weight: '중량', propulsion: '추진방식', guidance: '유도방식',
    ceiling: '실용상승한도', crew: '승무원', displacement: '배수량',
    armament: '무장', quantity: '보유수량', firstDeployed: '최초배치',
    manufacturer: '제조사', warhead: '탄두', accuracy: '명중정확도', altitude: '요격고도',
  }

  return (
    <div className="h-[calc(100vh-280px)] overflow-y-auto clip-corner bg-[#041526]/90 border border-[#0a3050] sticky top-4"
      style={{ borderTopColor: THREAT_COLORS[w.threatRating] }}>
      <div className="h-1" style={{ background: THREAT_COLORS[w.threatRating] }} />
      <div className="p-5">
        {/* 헤더 */}
        <div className="flex items-start justify-between gap-2 mb-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="text-[8px] font-black px-2 py-0.5"
                style={{ color: ORIGIN_COLOR[w.origin], background: `${ORIGIN_COLOR[w.origin]}15`, border: `1px solid ${ORIGIN_COLOR[w.origin]}30` }}>
                {ORIGIN_KO[w.origin]}
              </span>
              <span className="text-[8px] font-black px-2 py-0.5"
                style={{ color: CATEGORY_COLOR[w.category], background: `${CATEGORY_COLOR[w.category]}15` }}>
                {CATEGORY_KO[w.category]}
              </span>
              <span className="text-[8px] font-black px-2 py-0.5"
                style={{ color: STATUS_COLOR[w.status], background: `${STATUS_COLOR[w.status]}15` }}>
                {STATUS_KO[w.status]}
              </span>
            </div>
            <h2 className="text-xl font-black text-white">{w.name}</h2>
            <div className="text-[11px] text-[#4a7a9b]">{w.nameEng}{w.designation ? ` (${w.designation})` : ''}</div>
          </div>
          <button onClick={onClose} className="p-1.5 text-[#4a7a9b] hover:text-white transition-colors shrink-0">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 위협 등급 */}
        <div className="flex items-center gap-3 mb-4 p-3 border"
          style={{ borderColor: `${THREAT_COLORS[w.threatRating]}30`, background: `${THREAT_COLORS[w.threatRating]}08` }}>
          <div>
            <div className="text-[8px] text-[#4a7a9b]">위협 등급</div>
            <div className="text-lg font-black" style={{ color: THREAT_COLORS[w.threatRating] }}>{w.threatRating}</div>
          </div>
          <div className="border-l border-[#0a3050] pl-3">
            <div className="text-[8px] text-[#4a7a9b]">정보 신뢰도</div>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex-1 h-1.5 bg-[#0a3050] w-24">
                <div className="h-full bg-[#00d4ff]" style={{ width: `${w.confidence}%` }} />
              </div>
              <span className="text-[11px] font-black text-[#00d4ff]">{w.confidence}%</span>
            </div>
          </div>
          <div className="border-l border-[#0a3050] pl-3 ml-auto text-right">
            <div className="text-[8px] text-[#4a7a9b]">최종 업데이트</div>
            <div className="text-[9px] text-white font-mono">{w.lastUpdated}</div>
          </div>
        </div>

        {/* 설명 */}
        <p className="text-[11px] text-[#8ab8d4] mb-4 leading-relaxed">{w.description}</p>

        {/* 주요 제원 */}
        {specEntries.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-1.5 mb-2">
              <Zap className="w-3 h-3 text-[#ffcc00]" />
              <span className="text-[9px] font-black tracking-[0.15em] text-[#ffcc00]">주요 제원</span>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {specEntries.map(([key, value]) => (
                <div key={key} className="border-b border-[#0a3050] pb-1.5">
                  <div className="text-[8px] text-[#4a7a9b]">{specLabels[key] || key}</div>
                  <div className="text-[11px] font-bold text-white">{value as string}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 상세 설명 */}
        <div className="mb-4">
          <div className="flex items-center gap-1.5 mb-2">
            <Cpu className="w-3 h-3 text-[#00d4ff]" />
            <span className="text-[9px] font-black tracking-[0.15em] text-[#00d4ff]">상세 분석</span>
          </div>
          <div className="text-[10px] text-[#6a9ab8] leading-relaxed whitespace-pre-wrap">
            {w.detail.replace(/^#{1,3} .+$/gm, (m) => `\n${m.replace(/^#{1,3} /, '').toUpperCase()}\n`)
              .replace(/\*\*(.+?)\*\*/g, '$1')
              .trim()}
          </div>
        </div>

        {/* 태그 */}
        <div className="flex flex-wrap gap-1 mb-4">
          {w.tags.map((t) => (
            <span key={t} className="text-[8px] text-[#2a5a7a] bg-[#041526] border border-[#0a3050] px-1.5 py-0.5">#{t}</span>
          ))}
        </div>

        {/* 출처 */}
        <div>
          <div className="text-[8px] text-[#4a7a9b] mb-1">정보 출처</div>
          <div className="flex flex-wrap gap-1">
            {w.sources.map((s) => (
              <span key={s} className="text-[8px] text-[#4a7a9b]">{s}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── 국가 상세 패널 ─────────────────────────────────────────────────────────────

function CountryDetailPanel({ profile: cp, onClose }: { profile: CountryDefenseProfile; onClose: () => void }) {
  const relatedWeapons = WEAPONS.filter((w) => w.origin === cp.code).slice(0, 6)

  return (
    <div className="h-[calc(100vh-280px)] overflow-y-auto clip-corner bg-[#041526]/90 border border-[#0a3050] sticky top-4"
      style={{ borderTopColor: cp.color }}>
      <div className="h-1" style={{ background: cp.color }} />
      <div className="p-5">
        {/* 헤더 */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{cp.flag}</span>
            <div>
              <h2 className="text-xl font-black text-white">{cp.nameKo}</h2>
              <div className="text-[10px] text-[#4a7a9b]">{cp.name}</div>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-[#4a7a9b] hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 핵심 지표 */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {[
            { label: '국방예산 (2024)', value: `$${cp.budget2024}B`, sub: `GDP ${cp.budgetGdpPct}%`, color: cp.color },
            { label: '현역 병력', value: `${cp.personnel}만 명`, sub: `예비군 ${cp.reservePersonnel}만 명`, color: '#8ab8d4' },
            { label: '방산 수출', value: `$${cp.exportVolume2024}B`, sub: '연간', color: '#00ff88' },
            { label: '방산 수입', value: `$${cp.importVolume2024}B`, sub: '연간', color: '#ffcc00' },
          ].map((kpi) => (
            <div key={kpi.label} className="bg-[#020e1f]/80 border border-[#0a3050] p-3">
              <div className="text-[8px] text-[#4a7a9b] mb-0.5">{kpi.label}</div>
              <div className="text-[16px] font-black" style={{ color: kpi.color }}>{kpi.value}</div>
              <div className="text-[8px] text-[#4a7a9b]">{kpi.sub}</div>
            </div>
          ))}
        </div>

        {/* 설명 */}
        <p className="text-[11px] text-[#8ab8d4] mb-4 leading-relaxed">{cp.description}</p>

        {/* 핵심 전력 */}
        <div className="mb-4">
          <div className="text-[9px] font-black tracking-[0.12em] mb-2" style={{ color: cp.color }}>핵심 전력</div>
          <div className="space-y-1">
            {cp.keyCapabilities.map((c) => (
              <div key={c} className="flex items-start gap-2 text-[10px] text-[#6a9ab8]">
                <span className="text-[#00d4ff] mt-0.5 shrink-0">›</span>{c}
              </div>
            ))}
          </div>
        </div>

        {/* 최근 구매/조달 */}
        <div className="mb-4">
          <div className="text-[9px] font-black tracking-[0.12em] text-[#ffcc00] mb-2">최근 구매·조달</div>
          <div className="space-y-1">
            {cp.recentProcurement.map((p) => (
              <div key={p} className="flex items-start gap-2 text-[10px] text-[#6a9ab8]">
                <span className="text-[#ffcc00] mt-0.5 shrink-0">›</span>{p}
              </div>
            ))}
          </div>
        </div>

        {/* 주요 수출 */}
        {cp.exportHighlights.length > 0 && (
          <div className="mb-4">
            <div className="text-[9px] font-black tracking-[0.12em] text-[#00ff88] mb-2">주요 수출 계약</div>
            <div className="space-y-2">
              {cp.exportHighlights.map((e) => (
                <div key={e.item} className="bg-[#020e1f]/80 border border-[#0a3050] p-2.5">
                  <div className="flex justify-between items-start gap-2 mb-1">
                    <div className="text-[9px] text-[#4a7a9b]">{e.buyer} · {e.year}년</div>
                    <div className="text-[11px] font-black text-[#00ff88]">{e.value}</div>
                  </div>
                  <div className="text-[10px] text-[#8ab8d4]">{e.item}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 관련 무기 */}
        {relatedWeapons.length > 0 && (
          <div>
            <div className="text-[9px] font-black tracking-[0.12em] text-[#00d4ff] mb-2">관련 무기체계 ({WEAPONS.filter((w) => w.origin === cp.code).length}종)</div>
            <div className="space-y-1">
              {relatedWeapons.map((w) => (
                <div key={w.id} className="flex items-center gap-2 bg-[#020e1f]/80 border border-[#0a3050] px-3 py-2">
                  <span className="text-[8px] px-1.5 py-0.5" style={{ color: CATEGORY_COLOR[w.category], background: `${CATEGORY_COLOR[w.category]}15` }}>{CATEGORY_KO[w.category]}</span>
                  <span className="text-[10px] font-bold text-white">{w.name}</span>
                  <span className="ml-auto text-[8px] font-black" style={{ color: THREAT_COLORS[w.threatRating] }}>{w.threatRating}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
