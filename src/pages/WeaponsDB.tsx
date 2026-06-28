import { useState, useMemo, useEffect, useRef } from 'react'
import { Search, Globe, TrendingUp, ChevronRight, X, Crosshair, Zap, Cpu, BarChart3, Building2, Package, FileText, Layers, Play, RotateCcw } from 'lucide-react'
import WeaponSilhouette from '../components/WeaponSilhouette'
import WeaponSchematic from '../components/WeaponSchematic'
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
const ALL_ORIGINS: WeaponOrigin[] = ['ROK', 'DPRK', 'USA', 'CHINA', 'RUSSIA', 'UK', 'FRANCE', 'GERMANY', 'JAPAN', 'ISRAEL', 'TURKEY', 'IRAN', 'AUSTRALIA', 'NATO', 'MULTI']
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
    <div className="min-h-screen px-3 md:px-6 py-6 md:py-8 max-w-7xl mx-auto">

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
      <div className="flex items-center gap-0.5 mb-4 md:mb-6 border-b border-[#0a3050] overflow-x-auto pb-0 -mx-3 md:mx-0 px-3 md:px-0">
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

// ── 무기 데모 캔버스 ──────────────────────────────────────────────────────────
function WeaponDemoCanvas({ weapon: w }: { weapon: WeaponSystem }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef   = useRef<number>(0)
  const [running, setRunning] = useState(false)
  const progRef = useRef(0)

  const color = CATEGORY_COLOR[w.category] || '#00d4ff'
  const threatColor = THREAT_COLORS[w.threatRating]

  const runDemo = () => {
    setRunning(true)
    progRef.current = 0
  }

  const resetDemo = () => {
    setRunning(false)
    progRef.current = 0
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawBase(ctx, canvas.width, canvas.height)
  }

  const drawBase = (ctx: CanvasRenderingContext2D, W: number, H: number) => {
    ctx.fillStyle = '#020b18'
    ctx.fillRect(0, 0, W, H)
    // Grid
    ctx.strokeStyle = 'rgba(0,212,255,0.06)'
    ctx.lineWidth = 0.5
    for (let x = 0; x < W; x += 40) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke() }
    for (let y = 0; y < H; y += 40) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke() }
    // Ground line
    ctx.strokeStyle = '#1a3a2a'
    ctx.lineWidth = 1.5
    ctx.beginPath(); ctx.moveTo(0, H-30); ctx.lineTo(W, H-30); ctx.stroke()
    // Range bar bg
    ctx.fillStyle = 'rgba(0,212,255,0.05)'
    ctx.fillRect(10, H-20, W-20, 8)
    // Origin dot
    ctx.beginPath()
    ctx.arc(30, H-32, 5, 0, Math.PI*2)
    ctx.fillStyle = '#00ff88'
    ctx.fill()
    ctx.fillStyle = '#8ab8d4'
    ctx.font = '9px monospace'
    ctx.fillText('LAUNCH', 20, H-38)
    // Target
    ctx.fillStyle = '#ff2d55'
    ctx.fillText('TARGET', W-65, H-38)
    ctx.beginPath()
    ctx.arc(W-30, H-32, 5, 0, Math.PI*2)
    ctx.fillStyle = '#ff2d55'
    ctx.fill()
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const W = canvas.width, H = canvas.height
    drawBase(ctx, W, H)
  }, [w])

  useEffect(() => {
    if (!running) { cancelAnimationFrame(animRef.current); return }
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const W = canvas.width, H = canvas.height
    const speed = w.category === 'ICBM' || w.category === 'IRBM' ? 0.4 : w.category === 'CRUISE' ? 0.6 : 0.8

    const tick = () => {
      progRef.current = Math.min(1, progRef.current + speed * 0.008)
      const t = progRef.current
      drawBase(ctx, W, H)

      const sx = 30, sy = H-32
      const ex = W-30, ey = H-32
      const peakY = w.category === 'ICBM' || w.category === 'IRBM' ? 15 : w.category === 'CRUISE' ? H*0.6 : H*0.4

      // Trail
      ctx.beginPath()
      for (let i = 0; i <= t; i += 0.01) {
        const px = sx + (ex-sx)*i
        const py = sy + (ey-sy)*i - Math.sin(Math.PI*i) * (sy - peakY)
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py)
      }
      ctx.strokeStyle = color + '60'
      ctx.lineWidth = 1.5
      ctx.setLineDash([4, 3])
      ctx.stroke()
      ctx.setLineDash([])

      // Current position
      const cx = sx + (ex-sx)*t
      const cy = sy + (ey-sy)*t - Math.sin(Math.PI*t) * (sy - peakY)
      ctx.beginPath(); ctx.arc(cx, cy, 5, 0, Math.PI*2)
      ctx.fillStyle = color
      ctx.shadowBlur = 12; ctx.shadowColor = color
      ctx.fill(); ctx.shadowBlur = 0

      // Range progress bar
      ctx.fillStyle = color
      ctx.fillRect(10, H-20, (W-20)*t, 8)
      ctx.fillStyle = '#8ab8d4'; ctx.font = '8px monospace'
      const rangeText = w.specs.range || '정보없음'
      ctx.fillText(`사거리: ${rangeText} | 진행: ${Math.round(t*100)}%`, 14, H-13)

      if (t >= 1) {
        // Impact
        ctx.beginPath(); ctx.arc(ex, ey, 12, 0, Math.PI*2)
        ctx.fillStyle = threatColor + '40'
        ctx.fill()
        ctx.beginPath(); ctx.arc(ex, ey, 6, 0, Math.PI*2)
        ctx.fillStyle = threatColor
        ctx.fill()
        ctx.fillStyle = '#fff'; ctx.font = 'bold 10px monospace'
        ctx.fillText('IMPACT', ex-25, ey-18)
        setRunning(false)
        return
      }
      animRef.current = requestAnimationFrame(tick)
    }
    animRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animRef.current)
  }, [running, w, color, threatColor])

  return (
    <div className="space-y-3">
      <canvas ref={canvasRef} width={480} height={220} className="w-full rounded border border-[#0a3050] bg-[#020b18]" />
      {/* 스펙 바 */}
      <div className="grid grid-cols-2 gap-2">
        {[
          { label:'사거리',   val: w.specs.range     || '미공개', color:'#00d4ff' },
          { label:'속도',     val: w.specs.speed     || '미공개', color:'#ffcc00' },
          { label:'탑재량',   val: w.specs.payload   || '미공개', color:'#ff6b35' },
          { label:'정확도',   val: w.specs.accuracy  || `신뢰도 ${w.confidence}%`, color:'#00ff88' },
        ].map(item => (
          <div key={item.label} className="bg-[#020b18]/60 border border-[#0a3050] px-3 py-2">
            <div className="text-[8px] text-[#4a7a9b]">{item.label}</div>
            <div className="text-[11px] font-black" style={{ color: item.color }}>{item.val}</div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <button onClick={runDemo} disabled={running}
          className={`flex items-center gap-1.5 px-4 py-2 font-black text-[10px] clip-corner-sm transition-all ${running ? 'opacity-50 cursor-not-allowed bg-[#041526] border border-[#0a3050] text-[#4a7a9b]' : 'bg-[#00d4ff] text-[#020b18] hover:bg-[#00eeff]'}`}>
          <Play className="w-3.5 h-3.5" />
          {running ? '시뮬레이션 중...' : '발사 시뮬레이션'}
        </button>
        <button onClick={resetDemo}
          className="flex items-center gap-1.5 px-4 py-2 font-black text-[10px] border border-[#0a3050] text-[#4a7a9b] hover:text-white clip-corner-sm transition-all">
          <RotateCcw className="w-3.5 h-3.5" />
          초기화
        </button>
        <span className="text-[9px] text-[#2a4a6a] ml-auto">교육·훈련 목적 시뮬레이션</span>
      </div>
    </div>
  )
}

// ── 무기 상세 패널 ─────────────────────────────────────────────────────────────
function WeaponDetailPanel({ weapon: w, onClose }: { weapon: WeaponSystem; onClose: () => void }) {
  const [tab, setTab] = useState<'overview'|'specs'|'schematic'|'demo'>('overview')
  const [imgError, setImgError] = useState(false)
  const specEntries = Object.entries(w.specs).filter(([, v]) => v)
  const specLabels: Record<string, string> = {
    range:'사거리', speed:'속도', payload:'탑재량', length:'전장',
    weight:'중량', propulsion:'추진방식', guidance:'유도방식',
    ceiling:'실용상승한도', crew:'승무원', displacement:'배수량',
    armament:'무장', quantity:'보유수량', firstDeployed:'최초배치',
    manufacturer:'제조사', warhead:'탄두', accuracy:'명중정확도', altitude:'요격고도',
    caliber:'구경·탄약', capacity:'탄창용량', fireRate:'발사속도', penetration:'관통력',
  }
  const color = CATEGORY_COLOR[w.category]

  const TABS = [
    { id:'overview'  as const, label:'개요', icon:FileText },
    { id:'specs'     as const, label:'제원', icon:Zap },
    { id:'schematic' as const, label:'도면', icon:Layers },
    { id:'demo'      as const, label:'데모', icon:Play },
  ]

  return (
    <div className="h-[calc(100vh-280px)] flex flex-col clip-corner bg-[#041526]/90 border border-[#0a3050] sticky top-4"
      style={{ borderTopColor: THREAT_COLORS[w.threatRating] }}>
      <div className="h-1 shrink-0" style={{ background: THREAT_COLORS[w.threatRating] }} />

      {/* ── 헤더 ── */}
      <div className="px-4 pt-4 pb-3 shrink-0 border-b border-[#0a3050]">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap mb-1">
              <span className="text-[8px] font-black px-2 py-0.5"
                style={{ color:ORIGIN_COLOR[w.origin], background:`${ORIGIN_COLOR[w.origin]}15`, border:`1px solid ${ORIGIN_COLOR[w.origin]}30` }}>
                {ORIGIN_KO[w.origin]}
              </span>
              <span className="text-[8px] font-black px-2 py-0.5"
                style={{ color, background:`${color}15` }}>
                {CATEGORY_KO[w.category]}
              </span>
              <span className="text-[8px] font-black px-2 py-0.5"
                style={{ color:STATUS_COLOR[w.status], background:`${STATUS_COLOR[w.status]}15` }}>
                {STATUS_KO[w.status]}
              </span>
              <span className="text-[8px] font-black px-2 py-0.5"
                style={{ color:THREAT_COLORS[w.threatRating], background:`${THREAT_COLORS[w.threatRating]}15` }}>
                {w.threatRating}
              </span>
              {w.wikiUrl && (
                <a href={w.wikiUrl} target="_blank" rel="noopener noreferrer"
                  className="text-[8px] font-black px-2 py-0.5 text-[#4a7a9b] hover:text-[#00d4ff] border border-[#0a3050] hover:border-[#00d4ff]/30 transition-all">
                  Wikipedia ↗
                </a>
              )}
            </div>
            <h2 className="text-lg font-black text-white leading-tight">{w.name}</h2>
            <div className="text-[10px] text-[#4a7a9b]">{w.nameEng}{w.designation ? ` · ${w.designation}` : ''}</div>
          </div>
          <button onClick={onClose} className="p-1.5 text-[#4a7a9b] hover:text-white shrink-0">
            <X className="w-4 h-4" />
          </button>
        </div>
        {/* 탭 */}
        <div className="flex gap-0.5">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setTab(id)}
              className={`flex items-center gap-1 px-2.5 py-1.5 text-[9px] font-black transition-all border-b-2 ${
                tab===id ? 'border-current text-[#00d4ff]' : 'border-transparent text-[#4a7a9b] hover:text-[#8ab8d4]'
              }`}>
              <Icon className="w-3 h-3" />{label}
            </button>
          ))}
        </div>
      </div>

      {/* ── 탭 콘텐츠 ── */}
      <div className="flex-1 overflow-y-auto">

        {/* 개요 탭 */}
        {tab==='overview' && (
          <div className="p-4 space-y-4">
            {/* 실사 이미지 or 실루엣 */}
            <div className="bg-[#020b18]/60 border border-[#0a3050] p-3 relative overflow-hidden">
              {w.imageUrl && !imgError ? (
                <div className="relative">
                  <img
                    src={w.imageUrl}
                    alt={w.nameEng}
                    className="w-full object-contain max-h-40 rounded"
                    style={{ background: '#010810' }}
                    onError={() => setImgError(true)}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#020b18] to-transparent h-8" />
                  <div className="absolute bottom-1 right-2 text-[7px] text-[#2a4a6a]">© Wikimedia Commons</div>
                </div>
              ) : (
                <WeaponSilhouette category={w.category} color={color} className="max-h-32" />
              )}
            </div>
            {/* 신뢰도·업데이트 */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-[#020b18]/50 border border-[#0a3050] p-2.5">
                <div className="text-[8px] text-[#4a7a9b] mb-1.5">정보 신뢰도</div>
                <div className="h-1.5 bg-[#0a3050] rounded-full mb-1">
                  <div className="h-full bg-[#00d4ff] rounded-full" style={{ width:`${w.confidence}%` }} />
                </div>
                <div className="text-[11px] font-black text-[#00d4ff]">{w.confidence}%</div>
              </div>
              <div className="bg-[#020b18]/50 border border-[#0a3050] p-2.5">
                <div className="text-[8px] text-[#4a7a9b] mb-1">최종 업데이트</div>
                <div className="text-[11px] font-black text-white font-mono">{w.lastUpdated}</div>
                <div className="text-[8px] text-[#4a7a9b]">출처: {w.sources.join(', ')}</div>
              </div>
            </div>
            {/* 설명 */}
            <p className="text-[11px] text-[#8ab8d4] leading-relaxed">{w.description}</p>
            {/* 상세 분석 */}
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <Cpu className="w-3 h-3 text-[#00d4ff]" />
                <span className="text-[9px] font-black tracking-[0.15em] text-[#00d4ff]">상세 분석</span>
              </div>
              <div className="text-[10px] text-[#6a9ab8] leading-relaxed whitespace-pre-wrap bg-[#020b18]/40 border border-[#0a3050] p-3">
                {w.detail.replace(/^#{1,3} .+$/gm, m => `\n▶ ${m.replace(/^#{1,3} /, '').toUpperCase()}\n`)
                  .replace(/\*\*(.+?)\*\*/g, '$1').trim()}
              </div>
            </div>
            {/* 태그 */}
            <div className="flex flex-wrap gap-1">
              {w.tags.map(t => (
                <span key={t} className="text-[8px] text-[#2a5a7a] bg-[#041526] border border-[#0a3050] px-1.5 py-0.5">#{t}</span>
              ))}
            </div>
          </div>
        )}

        {/* 제원 탭 */}
        {tab==='specs' && (
          <div className="p-4 space-y-3">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-3.5 h-3.5" style={{ color }} />
              <span className="text-[10px] font-black tracking-[0.15em]" style={{ color }}>상세 제원표</span>
            </div>
            {specEntries.length > 0 ? (
              <div className="space-y-0">
                {specEntries.map(([key, value], i) => (
                  <div key={key} className={`flex items-center px-3 py-2.5 ${i%2===0?'bg-[#041526]/60':'bg-[#020b18]/40'} border-b border-[#0a3050]/50`}>
                    <div className="w-28 text-[9px] text-[#4a7a9b] shrink-0">{specLabels[key] || key}</div>
                    <div className="text-[11px] font-bold text-white">{value as string}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-[#4a7a9b] text-[11px]">제원 정보 미분류</div>
            )}
            {/* 핵심 제원 시각화 */}
            {w.specs.range && (
              <div className="mt-4 bg-[#020b18]/60 border border-[#0a3050] p-3">
                <div className="text-[9px] text-[#4a7a9b] mb-2">사거리 비교 (최대 15,000km 기준)</div>
                {[
                  { label:w.name, range: w.specs.range, color },
                  { label:'패트리엇 PAC-3', range:'35km', color:'#00d4ff' },
                  { label:'토마호크', range:'1,900km', color:'#ffcc00' },
                ].map((item, i) => {
                  const km = parseInt(item.range.replace(/[^0-9]/g,'')) || 0
                  const pct = Math.min(100, (km/15000)*100)
                  return (
                    <div key={i} className="flex items-center gap-2 mb-1.5">
                      <div className="w-24 text-[8px] text-[#4a7a9b] truncate">{item.label}</div>
                      <div className="flex-1 h-2 bg-[#0a3050] rounded-full">
                        <div className="h-full rounded-full transition-all" style={{ width:`${pct}%`, background:item.color }} />
                      </div>
                      <div className="text-[8px] font-mono w-20 text-right" style={{ color:item.color }}>{item.range}</div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* 도면 탭 */}
        {tab==='schematic' && (
          <div className="p-4 space-y-3">
            <div className="flex items-center gap-2 mb-3">
              <Layers className="w-3.5 h-3.5" style={{ color }} />
              <span className="text-[10px] font-black tracking-[0.15em]" style={{ color }}>기술 도면 (교육용)</span>
            </div>
            <WeaponSchematic category={w.category} name={w.name} color={color} />
            {/* 부품 해설 */}
            <div className="bg-[#020b18]/60 border border-[#0a3050] p-3">
              <div className="text-[9px] font-black text-[#4a7a9b] mb-2">주요 구성 요소</div>
              <div className="grid grid-cols-2 gap-1.5">
                {(w.category==='AIRCRAFT'||w.category==='HELICOPTER' ? [
                  '레이더 시스템','조종석·항전','추진 엔진','무장·하드포인트',
                  '연료 시스템','EW 전자전','착륙 장치','조종 시스템'
                ]:w.category==='ICBM'||w.category==='IRBM'||w.category==='SRBM'?[
                  '탄두(핵/재래식)','유도 시스템','추진 기관','연료 탱크',
                  '분리 메커니즘','기동핀(Fin)','텔레메트리','보안 자폭장치'
                ]:w.category==='NAVAL'?[
                  '함포·VLS','레이더 시스템','추진 시스템','선체 구조',
                  '함교·CIC','전자전 시스템','헬기 갑판','어뢰 발사관'
                ]:w.category==='SUBMARINE'?[
                  '소나 돔','어뢰 발사관','잠항타','원자로/엔진',
                  '잠망경·안테나','VLS 미사일','추진기','선체 압력각'
                ]:['구조물','추진 시스템','유도 시스템','탄두','무장','전자 장비','탐색기','발사 메커니즘']
                ).map((part,i)=>(
                  <div key={i} className="flex items-center gap-1.5 text-[9px] text-[#6a9ab8]">
                    <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background:color }} />
                    {part}
                  </div>
                ))}
              </div>
            </div>
            <div className="text-[8px] text-[#2a4a6a] text-center">
              ※ 본 도면은 공개 자료 기반 교육용 개요 도면입니다. 기밀 상세 제원은 포함되지 않습니다.
            </div>
          </div>
        )}

        {/* 데모 탭 */}
        {tab==='demo' && (
          <div className="p-4 space-y-3">
            <div className="flex items-center gap-2 mb-3">
              <Play className="w-3.5 h-3.5" style={{ color }} />
              <span className="text-[10px] font-black tracking-[0.15em]" style={{ color }}>비행 궤적 시뮬레이션</span>
            </div>
            <WeaponDemoCanvas weapon={w} />
            <div className="bg-[#020b18]/60 border border-[#0a3050] p-3">
              <div className="text-[9px] font-black text-[#4a7a9b] mb-2">운용 시나리오</div>
              <div className="space-y-1">
                {(w.category==='ICBM'||w.category==='IRBM'||w.category==='SRBM' ? [
                  '적 레이더 탐지 전 발사 준비 완료','TEL 이동 후 위장 진지 확보',
                  '지휘부 명령 수신 후 발사','MIRV 탄두 분리 및 각개 유도','종말 단계 기동 회피'
                ]:w.category==='AIRCRAFT'||w.category==='HELICOPTER' ? [
                  '기지 이륙 후 공중급유 수행','적 방공망 저고도 침투','목표 지역 접근 및 표적 획득',
                  '정밀유도폭탄/미사일 투하','탈출 기동 및 귀환'
                ]:w.category==='CRUISE' ? [
                  '항공기/함정/잠수함 발사','지형 추적 저고도 비행','GPS+INS 복합 유도',
                  '표적 직전 FLIR 최종 유도','정밀 타격 후 폭발'
                ]:[
                  '임무 할당 및 표적 정보 수신','발사대 전개 및 추적 레이더 연동',
                  '교전 명령 수신 후 발사','종말 단계 능동 레이더 추적','Hit-to-Kill 직격'
                ]).map((step,i)=>(
                  <div key={i} className="flex items-start gap-2 text-[9px] text-[#6a9ab8]">
                    <span className="text-[#00d4ff] font-black shrink-0">{i+1}.</span>{step}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
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
