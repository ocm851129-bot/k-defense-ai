import {
  createContext, useContext, useState, useCallback, useEffect, type ReactNode,
} from 'react'
import { WEAPONS as SEED_WEAPONS, type WeaponSystem } from '../data/weapons'
import { type Operator } from './BoardContext'

// ── 권한 정의 ──────────────────────────────────────────────────────────────────

export type OperatorRole = '관리자' | '분석관' | '운영관' | '관찰관'

export const ROLE_PERMISSIONS: Record<OperatorRole, { create: boolean; edit: boolean; delete: boolean }> = {
  관리자: { create: true,  edit: true,  delete: true  },
  분석관: { create: true,  edit: true,  delete: false },
  운영관: { create: false, edit: true,  delete: false },
  관찰관: { create: false, edit: false, delete: false },
}

export const ROLE_COLOR: Record<OperatorRole, string> = {
  관리자: '#ff2d55',
  분석관: '#00d4ff',
  운영관: '#00ff88',
  관찰관: '#4a7a9b',
}

// ── 변경 로그 ──────────────────────────────────────────────────────────────────

export interface WeaponChangeLog {
  id: string
  weaponId: string
  weaponName: string
  action: 'CREATE' | 'UPDATE' | 'DELETE'
  operatorId: string
  operatorName: string
  operatorRole: OperatorRole
  timestamp: string
  detail?: string
}

// ── 세션 사용자 ────────────────────────────────────────────────────────────────

export interface WeaponOperator {
  id: string
  name: string
  rank: string
  unit: string
  role: OperatorRole
}

// 기본 계정 목록 (BoardContext operators와 연동)
export const DEFAULT_ACCOUNTS: (WeaponOperator & { pin: string })[] = [
  { id: 'op001', name: '홍길동', rank: '대위',  unit: '작전통제실',   role: '관리자', pin: '1234' },
  { id: 'op002', name: '이민준', rank: '중위',  unit: '사이버방어팀', role: '분석관', pin: '1234' },
  { id: 'op003', name: '김수연', rank: '하사',  unit: '지역분석실',   role: '운영관', pin: '1234' },
  { id: 'op004', name: '박재원', rank: '원사',  unit: 'GEOINT분석실', role: '분석관', pin: '1234' },
  { id: 'op005', name: '최서연', rank: '상사',  unit: '사이버방어처', role: '분석관', pin: '1234' },
  { id: 'op006', name: '정태현', rank: '소위',  unit: '전략분석처',   role: '관찰관', pin: '1234' },
]

// ── Context 타입 ───────────────────────────────────────────────────────────────

interface WeaponsContextType {
  weapons: WeaponSystem[]
  changeLogs: WeaponChangeLog[]
  currentOperator: WeaponOperator | null

  // 인증
  loginOperator: (id: string, pin: string) => boolean
  logoutOperator: () => void

  // CRUD
  addWeapon: (w: Omit<WeaponSystem, 'id'>) => WeaponSystem
  updateWeapon: (id: string, patch: Partial<WeaponSystem>) => void
  deleteWeapon: (id: string) => void

  // 권한 플래그
  canCreate: boolean
  canEdit: boolean
  canDelete: boolean
}

const WeaponsContext = createContext<WeaponsContextType | null>(null)

const LS_WEAPONS = 'kd:weapons:v1'
const LS_LOGS    = 'kd:weapons:logs:v1'
const LS_SESSION = 'kd:weapons:session:v1'

function loadWeapons(): WeaponSystem[] {
  try {
    const raw = localStorage.getItem(LS_WEAPONS)
    if (raw) return JSON.parse(raw)
  } catch { /* noop */ }
  return SEED_WEAPONS
}

function loadLogs(): WeaponChangeLog[] {
  try {
    const raw = localStorage.getItem(LS_LOGS)
    if (raw) return JSON.parse(raw)
  } catch { /* noop */ }
  return []
}

function loadSession(): WeaponOperator | null {
  try {
    const raw = localStorage.getItem(LS_SESSION)
    if (raw) return JSON.parse(raw)
  } catch { /* noop */ }
  return null
}

function genId() {
  return `w-custom-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

function nowKst() {
  return new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })
}

export function WeaponsProvider({ children }: { children: ReactNode }) {
  const [weapons, setWeapons]             = useState<WeaponSystem[]>(loadWeapons)
  const [changeLogs, setChangeLogs]       = useState<WeaponChangeLog[]>(loadLogs)
  const [currentOperator, setCurrentOperator] = useState<WeaponOperator | null>(loadSession)

  useEffect(() => { localStorage.setItem(LS_WEAPONS, JSON.stringify(weapons)) }, [weapons])
  useEffect(() => { localStorage.setItem(LS_LOGS, JSON.stringify(changeLogs)) }, [changeLogs])

  const perms = currentOperator ? ROLE_PERMISSIONS[currentOperator.role] : { create: false, edit: false, delete: false }

  function appendLog(log: Omit<WeaponChangeLog, 'id'>) {
    setChangeLogs((prev) => [{ ...log, id: genId() }, ...prev].slice(0, 200))
  }

  const loginOperator = useCallback((id: string, pin: string) => {
    const account = DEFAULT_ACCOUNTS.find((a) => a.id === id && a.pin === pin)
    if (!account) return false
    const op: WeaponOperator = { id: account.id, name: account.name, rank: account.rank, unit: account.unit, role: account.role }
    setCurrentOperator(op)
    localStorage.setItem(LS_SESSION, JSON.stringify(op))
    return true
  }, [])

  const logoutOperator = useCallback(() => {
    setCurrentOperator(null)
    localStorage.removeItem(LS_SESSION)
  }, [])

  const addWeapon = useCallback((w: Omit<WeaponSystem, 'id'>): WeaponSystem => {
    const weapon: WeaponSystem = { ...w, id: genId() }
    setWeapons((prev) => [weapon, ...prev])
    if (currentOperator) {
      appendLog({
        weaponId: weapon.id, weaponName: weapon.name, action: 'CREATE',
        operatorId: currentOperator.id, operatorName: `${currentOperator.rank} ${currentOperator.name}`,
        operatorRole: currentOperator.role, timestamp: nowKst(),
        detail: `${weapon.category} / ${weapon.origin} / ${weapon.status}`,
      })
    }
    return weapon
  }, [currentOperator])

  const updateWeapon = useCallback((id: string, patch: Partial<WeaponSystem>) => {
    setWeapons((prev) => prev.map((w) => w.id === id ? { ...w, ...patch } : w))
    if (currentOperator) {
      const keys = Object.keys(patch).join(', ')
      appendLog({
        weaponId: id, weaponName: patch.name ?? id, action: 'UPDATE',
        operatorId: currentOperator.id, operatorName: `${currentOperator.rank} ${currentOperator.name}`,
        operatorRole: currentOperator.role, timestamp: nowKst(),
        detail: `변경 필드: ${keys}`,
      })
    }
  }, [currentOperator])

  const deleteWeapon = useCallback((id: string) => {
    const target = weapons.find((w) => w.id === id)
    setWeapons((prev) => prev.filter((w) => w.id !== id))
    if (currentOperator && target) {
      appendLog({
        weaponId: id, weaponName: target.name, action: 'DELETE',
        operatorId: currentOperator.id, operatorName: `${currentOperator.rank} ${currentOperator.name}`,
        operatorRole: currentOperator.role, timestamp: nowKst(),
      })
    }
  }, [currentOperator, weapons])

  return (
    <WeaponsContext.Provider value={{
      weapons, changeLogs, currentOperator,
      loginOperator, logoutOperator,
      addWeapon, updateWeapon, deleteWeapon,
      canCreate: perms.create,
      canEdit:   perms.edit,
      canDelete: perms.delete,
    }}>
      {children}
    </WeaponsContext.Provider>
  )
}

export function useWeapons() {
  const ctx = useContext(WeaponsContext)
  if (!ctx) throw new Error('useWeapons must be used within WeaponsProvider')
  return ctx
}
