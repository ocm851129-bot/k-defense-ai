import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Crosshair, Plus, Pencil, Trash2, X, Search, ChevronLeft,
  LogOut, Shield, Clock, User, CheckCircle, AlertTriangle,
} from 'lucide-react'
import {
  useWeapons, DEFAULT_ACCOUNTS, ROLE_COLOR, ROLE_PERMISSIONS,
  type OperatorRole,
} from '../../contexts/WeaponsContext'
import {
  WEAPONS as SEED, CATEGORY_KO, CATEGORY_COLOR, ORIGIN_COLOR, ORIGIN_KO,
  STATUS_KO, STATUS_COLOR, THREAT_COLORS,
  type WeaponCategory, type WeaponOrigin, type WeaponStatus, type ThreatRating,
} from '../../data/weapons'
import ConfirmDialog from '../../components/ui/ConfirmDialog'

// ── 상수 ───────────────────────────────────────────────────────────────────────

const ALL_CATS   = Object.keys(CATEGORY_KO) as WeaponCategory[]
const ALL_ORIGINS: WeaponOrigin[]  = ['ROK', 'DPRK', 'USA', 'CHINA', 'RUSSIA']
const ALL_STATUSES: WeaponStatus[] = ['OPERATIONAL', 'DEVELOPMENT', 'TESTING', 'SUSPECTED', 'RETIRED']
const THREAT_LEVELS: ThreatRating[]= ['CRITICAL', 'HIGH', 'MED', 'LOW']

const ACTION_COLORS: Record<string, string> = { CREATE: '#00ff88', UPDATE: '#00d4ff', DELETE: '#ff2d55' }
const ACTION_KO: Record<string, string>     = { CREATE: '등록', UPDATE: '수정', DELETE: '삭제' }

// ── 로그인 게이트 ─────────────────────────────────────────────────────────────

function LoginGate() {
  const { loginOperator } = useWeapons()
  const [selectedId, setSelectedId] = useState(DEFAULT_ACCOUNTS[0].id)
  const [pin, setPin] = useState('')
  const [err, setErr] = useState(false)

  function submit() {
    if (!loginOperator(selectedId, pin)) {
      setErr(true); setTimeout(() => setErr(false), 1500)
    }
    setPin('')
  }

  const account = DEFAULT_ACCOUNTS.find((a) => a.id === selectedId)!

  return (
    <div className="min-h-screen bg-[#020b18] flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="clip-corner bg-[#041526]/90 border border-[#00d4ff]/20 p-8 w-full max-w-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 bg-[#00d4ff]/20 rotate-45" />
            <Crosshair className="absolute inset-0 m-auto w-4 h-4 text-[#00d4ff]" />
          </div>
          <div>
            <div className="text-[9px] font-black tracking-[0.25em] text-[#00d4ff]/70 uppercase">Weapons CMS</div>
            <div className="text-[13px] font-black text-white">운영자 로그인</div>
          </div>
        </div>

        {/* 계정 선택 */}
        <div className="mb-4">
          <label className="text-[9px] font-black text-[#4a7a9b] uppercase tracking-[0.1em] block mb-2">운영자 선택</label>
          <select
            value={selectedId} onChange={(e) => setSelectedId(e.target.value)}
            className="w-full bg-[#020b18] border border-[#0a3050] text-[13px] text-white px-4 py-3 outline-none focus:border-[#00d4ff]/50">
            {DEFAULT_ACCOUNTS.map((a) => (
              <option key={a.id} value={a.id}>
                {a.rank} {a.name} — {a.unit} ({a.role})
              </option>
            ))}
          </select>
          {account && (
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[9px] font-black px-2 py-0.5"
                style={{ color: ROLE_COLOR[account.role], background: `${ROLE_COLOR[account.role]}15` }}>
                {account.role}
              </span>
              <span className="text-[9px] text-[#4a7a9b]">
                등록 {ROLE_PERMISSIONS[account.role].create ? '✓' : '✗'} · 수정 {ROLE_PERMISSIONS[account.role].edit ? '✓' : '✗'} · 삭제 {ROLE_PERMISSIONS[account.role].delete ? '✓' : '✗'}
              </span>
            </div>
          )}
        </div>

        {/* PIN */}
        <div className="mb-2">
          <label className="text-[9px] font-black text-[#4a7a9b] uppercase tracking-[0.1em] block mb-2">PIN</label>
          <input
            type="password" value={pin}
            onChange={(e) => setPin(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && submit()}
            className={`w-full bg-[#020b18] border text-[13px] text-white px-4 py-3 outline-none transition-colors tracking-[0.5em] ${err ? 'border-[#ff2d55]' : 'border-[#0a3050] focus:border-[#00d4ff]/50'}`}
            placeholder="• • • •"
          />
          {err && <p className="text-[10px] text-[#ff2d55] mt-1.5">PIN이 올바르지 않습니다.</p>}
        </div>
        <p className="text-[9px] text-[#2a4a5e] mb-5">기본 PIN: 1234</p>

        <button onClick={submit}
          className="clip-corner w-full py-3 bg-[#00d4ff] text-[#020b18] text-[11px] font-black tracking-[0.12em] uppercase hover:bg-[#00eeff] transition-colors">
          로그인
        </button>
        <Link to="/admin" className="block text-center mt-3 text-[10px] text-[#4a7a9b] hover:text-[#00d4ff] transition-colors">
          ← 관리자 대시보드
        </Link>
      </motion.div>
    </div>
  )
}

// ── 빈 폼 ───────────────────────────────────────────────────────────────────────

function emptyForm() {
  return {
    name: '', nameEng: '', designation: '',
    category: 'SRBM' as WeaponCategory,
    origin: 'ROK' as WeaponOrigin,
    status: 'OPERATIONAL' as WeaponStatus,
    threatRating: 'MED' as ThreatRating,
    description: '', detail: '',
    confidence: 80,
    lastUpdated: new Date().toISOString().slice(0, 10),
    tags: '', sources: '',
    // specs
    range: '', speed: '', payload: '', length: '', weight: '',
    propulsion: '', guidance: '', ceiling: '', crew: '',
    displacement: '', armament: '', quantity: '',
    firstDeployed: '', manufacturer: '', warhead: '', accuracy: '',
  }
}
type FormState = ReturnType<typeof emptyForm>

// ── 메인 CMS ───────────────────────────────────────────────────────────────────

export default function WeaponsAdmin() {
  const {
    weapons, changeLogs, currentOperator, logoutOperator,
    addWeapon, updateWeapon, deleteWeapon,
    canCreate, canEdit, canDelete,
  } = useWeapons()

  if (!currentOperator) return <LoginGate />

  const [search, setSearch] = useState('')
  const [filterOrigin, setFilterOrigin] = useState<WeaponOrigin | 'ALL'>('ALL')
  const [filterThreat, setFilterThreat] = useState<ThreatRating | 'ALL'>('ALL')
  const [activeTab, setActiveTab] = useState<'list' | 'logs'>('list')

  const [editId,     setEditId]     = useState<string | null>(null)
  const [showForm,   setShowForm]   = useState(false)
  const [form,       setForm]       = useState<FormState>(emptyForm())
  const [deleteId,   setDeleteId]   = useState<string | null>(null)
  const [saved,      setSaved]      = useState(false)

  const filtered = useMemo(() => {
    return weapons.filter((w) => {
      if (filterOrigin !== 'ALL' && w.origin !== filterOrigin) return false
      if (filterThreat !== 'ALL' && w.threatRating !== filterThreat) return false
      if (search) {
        const q = search.toLowerCase()
        return w.name.toLowerCase().includes(q) ||
          w.nameEng.toLowerCase().includes(q) ||
          w.tags.some((t) => t.toLowerCase().includes(q))
      }
      return true
    })
  }, [weapons, search, filterOrigin, filterThreat])

  function openCreate() {
    setForm(emptyForm())
    setEditId(null)
    setShowForm(true)
  }

  function openEdit(id: string) {
    const w = weapons.find((x) => x.id === id)!
    setForm({
      name: w.name, nameEng: w.nameEng, designation: w.designation ?? '',
      category: w.category, origin: w.origin, status: w.status, threatRating: w.threatRating,
      description: w.description, detail: w.detail,
      confidence: w.confidence, lastUpdated: w.lastUpdated,
      tags: w.tags.join(', '), sources: w.sources.join(', '),
      range: w.specs.range ?? '', speed: w.specs.speed ?? '',
      payload: w.specs.payload ?? '', length: w.specs.length ?? '',
      weight: w.specs.weight ?? '', propulsion: w.specs.propulsion ?? '',
      guidance: w.specs.guidance ?? '', ceiling: w.specs.ceiling ?? '',
      crew: w.specs.crew ?? '', displacement: w.specs.displacement ?? '',
      armament: w.specs.armament ?? '', quantity: w.specs.quantity ?? '',
      firstDeployed: w.specs.firstDeployed ?? '', manufacturer: w.specs.manufacturer ?? '',
      warhead: w.specs.warhead ?? '', accuracy: w.specs.accuracy ?? '',
    })
    setEditId(id)
    setShowForm(true)
  }

  function submit() {
    const tags    = form.tags.split(',').map((t) => t.trim()).filter(Boolean)
    const sources = form.sources.split(',').map((s) => s.trim()).filter(Boolean)
    const specs = {
      range: form.range || undefined, speed: form.speed || undefined,
      payload: form.payload || undefined, length: form.length || undefined,
      weight: form.weight || undefined, propulsion: form.propulsion || undefined,
      guidance: form.guidance || undefined, ceiling: form.ceiling || undefined,
      crew: form.crew || undefined, displacement: form.displacement || undefined,
      armament: form.armament || undefined, quantity: form.quantity || undefined,
      firstDeployed: form.firstDeployed || undefined, manufacturer: form.manufacturer || undefined,
      warhead: form.warhead || undefined, accuracy: form.accuracy || undefined,
    }
    const base = {
      name: form.name, nameEng: form.nameEng,
      designation: form.designation || undefined,
      category: form.category, origin: form.origin,
      status: form.status, threatRating: form.threatRating,
      description: form.description, detail: form.detail,
      confidence: form.confidence, lastUpdated: form.lastUpdated,
      relatedIntelIds: [], tags, sources, specs,
    }
    if (editId) {
      updateWeapon(editId, base)
    } else {
      addWeapon(base)
    }
    setShowForm(false)
    setEditId(null)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const f = (key: keyof FormState, val: string | number) =>
    setForm((prev) => ({ ...prev, [key]: val }))

  const weaponToDelete = weapons.find((w) => w.id === deleteId)

  return (
    <div className="min-h-screen bg-[#020b18]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">

        {/* ── 헤더 ── */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Crosshair className="w-4 h-4 text-[#ff6b35]" />
              <span className="text-[9px] font-black tracking-[0.25em] text-[#ff6b35] uppercase">Weapons CMS</span>
            </div>
            <h1 className="text-2xl font-black text-white">무기 데이터베이스 <span className="text-[#ff6b35]">관리</span></h1>
          </div>
          <div className="flex items-center gap-3">
            {/* 세션 정보 */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#041526] border border-[#0a3050] clip-corner-sm">
              <User className="w-3 h-3 text-[#4a7a9b]" />
              <span className="text-[10px] font-bold text-white">{currentOperator.rank} {currentOperator.name}</span>
              <span className="text-[8px] font-black px-1.5 py-0.5"
                style={{ color: ROLE_COLOR[currentOperator.role], background: `${ROLE_COLOR[currentOperator.role]}20` }}>
                {currentOperator.role}
              </span>
            </div>
            <Link to="/admin" className="text-[10px] text-[#4a7a9b] hover:text-[#00d4ff] transition-colors">대시보드</Link>
            <button onClick={logoutOperator}
              className="flex items-center gap-1.5 text-[10px] font-bold text-[#ff2d55]/70 hover:text-[#ff2d55] transition-colors">
              <LogOut className="w-3.5 h-3.5" /> 로그아웃
            </button>
          </div>
        </div>

        {/* ── 권한 배너 ── */}
        <div className="flex items-center gap-4 mb-5 px-4 py-2.5 bg-[#041526]/60 border border-[#0a3050] text-[10px]">
          <Shield className="w-3.5 h-3.5 text-[#4a7a9b] shrink-0" />
          <span className="text-[#4a7a9b]">현재 권한:</span>
          {[
            { label: '등록', ok: canCreate },
            { label: '수정', ok: canEdit },
            { label: '삭제', ok: canDelete },
          ].map(({ label, ok }) => (
            <span key={label} className={`flex items-center gap-1 font-bold ${ok ? 'text-[#00ff88]' : 'text-[#2a4a6a]'}`}>
              {ok ? <CheckCircle className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />} {label}
            </span>
          ))}
          <span className="ml-auto text-[#2a4a6a]">총 {weapons.length}종 · 조회 {filtered.length}건</span>
        </div>

        {/* ── 저장 토스트 ── */}
        <AnimatePresence>
          {saved && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="fixed top-24 right-6 z-50 flex items-center gap-2 px-4 py-2.5 bg-[#00ff88] text-[#020b18] text-[11px] font-black clip-corner">
              <CheckCircle className="w-4 h-4" /> 저장 완료
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── 탭 ── */}
        <div className="flex items-center gap-1 border-b border-[#0a3050] mb-5">
          {[
            { id: 'list', label: `무기 목록 (${weapons.length})` },
            { id: 'logs', label: `변경 로그 (${changeLogs.length})` },
          ].map(({ id, label }) => (
            <button key={id} onClick={() => setActiveTab(id as 'list' | 'logs')}
              className={`px-4 py-2.5 text-[11px] font-black tracking-[0.08em] border-b-2 -mb-px transition-all ${
                activeTab === id ? 'text-[#ff6b35] border-[#ff6b35]' : 'text-[#4a7a9b] border-transparent hover:text-[#8ab8d4]'
              }`}>
              {label}
            </button>
          ))}
        </div>

        {/* ══════════════ TAB: 목록 ══════════════ */}
        {activeTab === 'list' && (
          <div className="flex gap-5">

            {/* 좌: 목록 */}
            <div className={`flex-1 min-w-0 ${showForm ? 'hidden md:block md:flex-none md:w-[45%]' : ''}`}>
              {/* 툴바 */}
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <div className="relative flex-1 min-w-[160px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#4a7a9b]" />
                  <input value={search} onChange={(e) => setSearch(e.target.value)}
                    placeholder="이름·태그 검색..."
                    className="w-full bg-[#041526]/80 border border-[#0a3050] pl-9 pr-3 py-2 text-[11px] text-white placeholder-[#2a4a6a] focus:outline-none focus:border-[#00d4ff]/40" />
                </div>
                <select value={filterOrigin} onChange={(e) => setFilterOrigin(e.target.value as WeaponOrigin | 'ALL')}
                  className="bg-[#041526] border border-[#0a3050] text-[10px] text-[#8ab8d4] px-2 py-2 focus:outline-none">
                  <option value="ALL">전체 국가</option>
                  {ALL_ORIGINS.map((o) => <option key={o} value={o}>{ORIGIN_KO[o]}</option>)}
                </select>
                <select value={filterThreat} onChange={(e) => setFilterThreat(e.target.value as ThreatRating | 'ALL')}
                  className="bg-[#041526] border border-[#0a3050] text-[10px] text-[#8ab8d4] px-2 py-2 focus:outline-none">
                  <option value="ALL">전체 위협</option>
                  {THREAT_LEVELS.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
                {canCreate && (
                  <button onClick={openCreate}
                    className="flex items-center gap-1.5 px-3 py-2 bg-[#ff6b35] text-[#020b18] text-[10px] font-black clip-corner-sm hover:bg-[#ff8a55] transition-colors shrink-0">
                    <Plus className="w-3.5 h-3.5" /> 무기 등록
                  </button>
                )}
              </div>

              {/* 테이블 */}
              <div className="space-y-1 max-h-[calc(100vh-300px)] overflow-y-auto pr-1">
                {filtered.map((w) => (
                  <div key={w.id}
                    className={`clip-corner border p-3 transition-all ${
                      editId === w.id
                        ? 'bg-[#041526] border-[#ff6b35]/40'
                        : 'bg-[#020e1f]/80 border-[#0a3050] hover:border-[#0a3050]/80'
                    }`}>
                    <div className="flex items-center gap-2">
                      {/* 국가 배지 */}
                      <div className="w-8 h-7 flex items-center justify-center text-[8px] font-black shrink-0"
                        style={{ background: `${ORIGIN_COLOR[w.origin]}20`, color: ORIGIN_COLOR[w.origin] }}>
                        {w.origin}
                      </div>
                      {/* 이름 */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[12px] font-black text-white">{w.name}</span>
                          <span className="text-[9px] text-[#4a7a9b] truncate">{w.nameEng}</span>
                        </div>
                        <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                          <span className="text-[7px] font-black px-1.5 py-0.5"
                            style={{ color: CATEGORY_COLOR[w.category], background: `${CATEGORY_COLOR[w.category]}15` }}>
                            {CATEGORY_KO[w.category]}
                          </span>
                          <span className="text-[7px] font-black px-1.5 py-0.5"
                            style={{ color: STATUS_COLOR[w.status], background: `${STATUS_COLOR[w.status]}15` }}>
                            {STATUS_KO[w.status]}
                          </span>
                          <span className="text-[7px] font-black px-1.5 py-0.5"
                            style={{ color: THREAT_COLORS[w.threatRating], background: `${THREAT_COLORS[w.threatRating]}15` }}>
                            {w.threatRating}
                          </span>
                          {w.id.startsWith('w-custom') && (
                            <span className="text-[7px] font-black px-1.5 py-0.5 text-[#ffcc00] bg-[#ffcc00]/10">커스텀</span>
                          )}
                        </div>
                      </div>
                      {/* 버튼 */}
                      <div className="flex items-center gap-1 shrink-0">
                        {canEdit && (
                          <button onClick={() => openEdit(w.id)}
                            className="flex items-center gap-1 px-2 py-1 text-[9px] font-black text-[#00d4ff] border border-[#00d4ff]/20 hover:bg-[#00d4ff]/10 transition-all clip-corner-sm">
                            <Pencil className="w-3 h-3" /> 수정
                          </button>
                        )}
                        {canDelete && (
                          <button onClick={() => setDeleteId(w.id)}
                            className="flex items-center gap-1 px-2 py-1 text-[9px] font-black text-[#ff2d55]/70 border border-[#ff2d55]/20 hover:bg-[#ff2d55]/10 hover:text-[#ff2d55] transition-all clip-corner-sm">
                            <Trash2 className="w-3 h-3" /> 삭제
                          </button>
                        )}
                        {!canEdit && !canDelete && (
                          <span className="text-[8px] text-[#2a4a6a]">읽기 전용</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {filtered.length === 0 && (
                  <div className="py-16 text-center text-[#2a4a6a]">검색 결과 없음</div>
                )}
              </div>
            </div>

            {/* 우: 등록·수정 폼 */}
            <AnimatePresence>
              {showForm && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="md:flex-1 w-full"
                >
                  <WeaponForm
                    form={form} setField={f}
                    isEdit={!!editId}
                    onSubmit={submit}
                    onCancel={() => { setShowForm(false); setEditId(null) }}
                    canSubmit={editId ? canEdit : canCreate}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* ══════════════ TAB: 변경 로그 ══════════════ */}
        {activeTab === 'logs' && (
          <div className="space-y-2">
            {changeLogs.length === 0 && (
              <div className="py-20 text-center text-[#2a4a6a] text-sm">변경 기록이 없습니다.</div>
            )}
            {changeLogs.map((log) => (
              <div key={log.id} className="flex items-start gap-3 px-4 py-3 bg-[#020e1f]/80 border border-[#0a3050] clip-corner">
                <div className="w-12 text-center shrink-0">
                  <span className="text-[8px] font-black px-1.5 py-0.5"
                    style={{ color: ACTION_COLORS[log.action], background: `${ACTION_COLORS[log.action]}15` }}>
                    {ACTION_KO[log.action]}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[12px] font-black text-white">{log.weaponName}</span>
                  {log.detail && <span className="text-[10px] text-[#4a7a9b] ml-2">{log.detail}</span>}
                </div>
                <div className="text-right shrink-0">
                  <div className="flex items-center gap-1.5 justify-end mb-0.5">
                    <User className="w-3 h-3 text-[#4a7a9b]" />
                    <span className="text-[10px] font-bold text-white">{log.operatorName}</span>
                    <span className="text-[8px] font-black px-1 py-0.5"
                      style={{ color: ROLE_COLOR[log.operatorRole], background: `${ROLE_COLOR[log.operatorRole]}15` }}>
                      {log.operatorRole}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 justify-end text-[9px] text-[#2a4a6a]">
                    <Clock className="w-2.5 h-2.5" />
                    <span className="font-mono">{log.timestamp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 삭제 확인 */}
      <ConfirmDialog
        open={!!deleteId}
        title="무기 데이터 삭제"
        message={`"${weaponToDelete?.name}"을(를) 영구 삭제합니다. 복구할 수 없습니다.`}
        danger confirmLabel="삭제"
        onConfirm={() => { if (deleteId) deleteWeapon(deleteId); setDeleteId(null) }}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  )
}

// ── 무기 등록·수정 폼 ──────────────────────────────────────────────────────────

interface WeaponFormProps {
  form: FormState
  setField: (key: keyof FormState, val: string | number) => void
  isEdit: boolean
  onSubmit: () => void
  onCancel: () => void
  canSubmit: boolean
}

function WeaponForm({ form, setField, isEdit, onSubmit, onCancel, canSubmit }: WeaponFormProps) {
  const ALL_CATS = Object.keys(CATEGORY_KO) as WeaponCategory[]

  const inp = (key: keyof FormState, label: string, placeholder?: string, type: string = 'text') => (
    <div>
      <label className="block text-[8px] font-black text-[#4a7a9b] uppercase tracking-[0.1em] mb-1">{label}</label>
      <input type={type} value={form[key] as string}
        onChange={(e) => setField(key, type === 'number' ? Number(e.target.value) : e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#020b18] border border-[#0a3050] text-[11px] text-white px-3 py-2 focus:outline-none focus:border-[#00d4ff]/40 placeholder-[#2a4a6a]" />
    </div>
  )

  const sel = <K extends keyof FormState>(key: K, label: string, options: { value: string; label: string }[]) => (
    <div>
      <label className="block text-[8px] font-black text-[#4a7a9b] uppercase tracking-[0.1em] mb-1">{label}</label>
      <select value={form[key] as string} onChange={(e) => setField(key, e.target.value)}
        className="w-full bg-[#020b18] border border-[#0a3050] text-[11px] text-white px-3 py-2 focus:outline-none focus:border-[#00d4ff]/40">
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  )

  return (
    <div className="clip-corner bg-[#041526]/90 border border-[#ff6b35]/20 h-[calc(100vh-280px)] overflow-y-auto sticky top-4">
      <div className="h-0.5 bg-[#ff6b35]" />
      <div className="p-5">
        {/* 폼 헤더 */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="text-[8px] font-black text-[#ff6b35] tracking-[0.2em] uppercase mb-0.5">
              {isEdit ? '무기 수정' : '신규 무기 등록'}
            </div>
            <div className="text-[11px] text-[#4a7a9b]">* 항목은 필수 입력</div>
          </div>
          <button onClick={onCancel} className="p-1.5 text-[#4a7a9b] hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4">
          {/* 기본 정보 */}
          <Section title="기본 정보">
            <div className="grid grid-cols-2 gap-3">
              {inp('name',       '한국어명 *')}
              {inp('nameEng',    '영문명 *')}
              {inp('designation','제식명 / NATO 코드')}
              {inp('lastUpdated','최종 업데이트', '2026-06-27')}
            </div>
          </Section>

          {/* 분류 */}
          <Section title="분류">
            <div className="grid grid-cols-2 gap-3">
              {sel('category', '무기 분류 *', ALL_CATS.map((c) => ({ value: c, label: `${c} — ${CATEGORY_KO[c]}` })))}
              {sel('origin',   '국가 *',       ALL_ORIGINS.map((o) => ({ value: o, label: `${o} (${ORIGIN_KO[o]})` })))}
              {sel('status',   '배치 상태 *',  ALL_STATUSES.map((s) => ({ value: s, label: `${STATUS_KO[s]}` })))}
              {sel('threatRating', '위협 등급 *', THREAT_LEVELS.map((t) => ({ value: t, label: t })))}
            </div>
          </Section>

          {/* 설명 */}
          <Section title="설명">
            <div className="space-y-3">
              <div>
                <label className="block text-[8px] font-black text-[#4a7a9b] uppercase tracking-[0.1em] mb-1">한줄 설명 *</label>
                <input value={form.description} onChange={(e) => setField('description', e.target.value)}
                  placeholder="무기의 핵심 특징을 한 문장으로..."
                  className="w-full bg-[#020b18] border border-[#0a3050] text-[11px] text-white px-3 py-2 focus:outline-none focus:border-[#00d4ff]/40 placeholder-[#2a4a6a]" />
              </div>
              <div>
                <label className="block text-[8px] font-black text-[#4a7a9b] uppercase tracking-[0.1em] mb-1">상세 분석</label>
                <textarea value={form.detail} onChange={(e) => setField('detail', e.target.value)}
                  rows={6} placeholder="마크다운 지원. ## 소제목, **굵게** 등 사용 가능..."
                  className="w-full bg-[#020b18] border border-[#0a3050] text-[11px] text-white px-3 py-2 focus:outline-none focus:border-[#00d4ff]/40 placeholder-[#2a4a6a] resize-y" />
              </div>
            </div>
          </Section>

          {/* 주요 제원 */}
          <Section title="주요 제원">
            <div className="grid grid-cols-2 gap-3">
              {inp('range',        '사거리',     '예: 1,500km')}
              {inp('speed',        '속도',       '예: 마하 2.5')}
              {inp('payload',      '탑재량/탄두','예: 500kg')}
              {inp('warhead',      '탄두 종류',  '예: 핵탄두 추정')}
              {inp('propulsion',   '추진방식',   '예: 고체 추진')}
              {inp('guidance',     '유도방식',   '예: GPS+INS')}
              {inp('accuracy',     '명중정확도', '예: CEP 30m')}
              {inp('length',       '전장',       '예: 16.9m')}
              {inp('weight',       '중량',       '예: 47톤')}
              {inp('crew',         '승무원',     '예: 3명')}
              {inp('armament',     '무장',       '예: 30mm 기관포, JDAM')}
              {inp('quantity',     '보유 수량',  '예: 40기')}
              {inp('manufacturer', '제조사',     '예: 한화에어로스페이스')}
              {inp('firstDeployed','최초 배치',  '예: 2023년')}
              {inp('ceiling',      '고도 (항공)','예: 18,000m')}
              {inp('displacement', '배수량 (함선)','예: 11,000톤')}
            </div>
          </Section>

          {/* 평가 */}
          <Section title="정보 평가">
            <div>
              <label className="block text-[8px] font-black text-[#4a7a9b] uppercase tracking-[0.1em] mb-1">
                신뢰도: <span className="text-[#00d4ff]">{form.confidence}%</span>
              </label>
              <input type="range" min={10} max={100} step={5} value={form.confidence}
                onChange={(e) => setField('confidence', Number(e.target.value))}
                className="w-full accent-[#00d4ff]" />
              <div className="flex justify-between text-[8px] text-[#2a4a6a]">
                <span>10% 추정</span><span>55% 중간</span><span>100% 확실</span>
              </div>
            </div>
          </Section>

          {/* 태그·출처 */}
          <Section title="태그 및 출처">
            <div className="space-y-3">
              {inp('tags',    '태그 (쉼표 구분)', '핵, ICBM, 이동식, ...')}
              {inp('sources', '출처 (쉼표 구분)', '38North, IISS, CSIS, ...')}
            </div>
          </Section>
        </div>

        {/* 저장 버튼 */}
        <div className="flex gap-2 mt-6 pt-4 border-t border-[#0a3050]">
          <button onClick={onCancel}
            className="flex-1 py-2.5 border border-[#0a3050] text-[10px] font-black text-[#4a7a9b] hover:border-[#00d4ff]/30 hover:text-[#00d4ff] transition-all clip-corner-sm">
            취소
          </button>
          {canSubmit ? (
            <button onClick={onSubmit}
              className="flex-1 py-2.5 bg-[#ff6b35] text-[#020b18] text-[10px] font-black clip-corner-sm hover:bg-[#ff8a55] transition-colors">
              {isEdit ? '수정 저장' : '무기 등록'}
            </button>
          ) : (
            <div className="flex-1 py-2.5 bg-[#0a3050] text-[#2a4a6a] text-[10px] font-black clip-corner-sm text-center">
              권한 없음
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[8px] font-black text-[#ff6b35]/80 tracking-[0.2em] uppercase mb-2 pb-1 border-b border-[#0a3050]">
        {title}
      </div>
      {children}
    </div>
  )
}
