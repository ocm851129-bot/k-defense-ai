import {
  createContext, useContext, useState, useCallback,
  useEffect, useRef, type ReactNode,
} from 'react'

// ── Types ──────────────────────────────────────────────────────────────────

export type ThreatLevel = 'NORMAL' | 'ELEVATED' | 'HIGH' | 'CRITICAL'
export type FirewallMode = 'MONITOR' | 'BLOCK' | 'AGGRESSIVE'
export type ModuleId = 'sol01' | 'sol02' | 'sol03' | 'sol04' | 'sol05' | 'sol06'

export interface ModuleState {
  id: ModuleId
  name: string
  active: boolean
  sensitivity: number   // 0–100
  refreshRate: number   // seconds
  lastToggled: string
}

export interface SectorState {
  id: string
  label: string
  active: boolean
  threatScore: number
}

export interface OpLog {
  id: string
  timestamp: string
  operator: string
  action: string
  target: string
  result: 'SUCCESS' | 'FAILED' | 'PENDING'
  level: 'INFO' | 'WARN' | 'CRITICAL'
}

export interface SystemState {
  globalThreatLevel: ThreatLevel
  simulationPaused: boolean
  firewallMode: FirewallMode
  quarantineActive: boolean
  satelliteTasking: boolean
  recordingActive: boolean
  approvalPending: boolean
  scenarioApproved: string | null
  emergencyLockdown: boolean
}

// ── Context ────────────────────────────────────────────────────────────────

interface SystemContextType {
  modules: Record<ModuleId, ModuleState>
  sectors: SectorState[]
  system: SystemState
  opLogs: OpLog[]

  // Module controls
  toggleModule: (id: ModuleId) => void
  setModuleSensitivity: (id: ModuleId, value: number) => void
  setModuleRefreshRate: (id: ModuleId, value: number) => void

  // Sector controls
  toggleSector: (sectorId: string) => void
  toggleAllSectors: (active: boolean) => void

  // System controls
  setGlobalThreatLevel: (level: ThreatLevel) => void
  toggleSimulation: () => void
  setFirewallMode: (mode: FirewallMode) => void
  toggleQuarantine: () => void
  requestSatelliteTask: () => void
  toggleRecording: () => void
  approveScenario: (scenarioId: string) => void
  triggerEmergencyLockdown: () => void
  releaseEmergencyLockdown: () => void

  // Log
  clearLogs: () => void
}

const SystemContext = createContext<SystemContextType | null>(null)

// ── Initial data ───────────────────────────────────────────────────────────

const INITIAL_MODULES: Record<ModuleId, ModuleState> = {
  sol01: { id: 'sol01', name: '전장 인텔리전스 AI', active: true,  sensitivity: 78, refreshRate: 2, lastToggled: '' },
  sol02: { id: 'sol02', name: '사이버 위협 탐지',   active: true,  sensitivity: 92, refreshRate: 1, lastToggled: '' },
  sol03: { id: 'sol03', name: 'GEOINT 분석',        active: true,  sensitivity: 65, refreshRate: 30, lastToggled: '' },
  sol04: { id: 'sol04', name: 'SIGINT 처리',         active: true,  sensitivity: 80, refreshRate: 5, lastToggled: '' },
  sol05: { id: 'sol05', name: '광학 영상 AI',        active: false, sensitivity: 70, refreshRate: 1, lastToggled: '' },
  sol06: { id: 'sol06', name: '전략 의사결정 AI',    active: true,  sensitivity: 85, refreshRate: 60, lastToggled: '' },
}

const SECTOR_REGIONS = [
  '북방 경계 A','북방 경계 B','북방 경계 C','북방 경계 D',
  'DMZ 동부','DMZ 서부','DMZ 중부','DMZ 특수',
  '서해 북부','서해 중부','서해 남부','서해 도서',
  '동해 북부','동해 중부','동해 남부','동해 원양',
  '남방 해역 A','남방 해역 B','남방 해역 C','남방 해역 D',
  '내륙 방공 A','내륙 방공 B','내륙 방공 C','내륙 방공 D',
  '사이버 망 A','사이버 망 B','사이버 망 C','사이버 망 D',
  '위성 추적 A','위성 추적 B','위성 추적 C','위성 추적 D',
  '특수 작전 A','특수 작전 B',
]

function makeTimestamp() {
  return new Date().toLocaleTimeString('ko-KR', { hour12: false })
}

function makeLog(action: string, target: string, level: OpLog['level'] = 'INFO', result: OpLog['result'] = 'SUCCESS'): OpLog {
  return {
    id: Math.random().toString(36).slice(2),
    timestamp: makeTimestamp(),
    operator: 'OPERATOR',
    action,
    target,
    result,
    level,
  }
}

// ── Provider ───────────────────────────────────────────────────────────────

export function SystemProvider({ children }: { children: ReactNode }) {
  const [modules, setModules] = useState(INITIAL_MODULES)
  const [sectors, setSectors] = useState<SectorState[]>(() =>
    SECTOR_REGIONS.map((label, i) => ({
      id: `SEC-${String(i + 1).padStart(2, '0')}`,
      label,
      active: i < 28,
      threatScore: Math.floor(Math.random() * 60 + 10),
    }))
  )
  const [system, setSystem] = useState<SystemState>({
    globalThreatLevel: 'HIGH',
    simulationPaused: false,
    firewallMode: 'BLOCK',
    quarantineActive: false,
    satelliteTasking: false,
    recordingActive: true,
    approvalPending: true,
    scenarioApproved: null,
    emergencyLockdown: false,
  })
  const [opLogs, setOpLogs] = useState<OpLog[]>([
    makeLog('시스템 초기화', 'ALL MODULES', 'INFO'),
    makeLog('방화벽 모드 설정', 'SOL-02 BLOCK MODE', 'INFO'),
    makeLog('위협 레벨 갱신', 'GLOBAL → HIGH', 'WARN'),
  ])

  const addLog = useCallback((log: OpLog) => {
    setOpLogs((prev) => [log, ...prev].slice(0, 200))
  }, [])

  // ── Module controls ──

  const toggleModule = useCallback((id: ModuleId) => {
    setModules((prev) => {
      const next = { ...prev, [id]: { ...prev[id], active: !prev[id].active, lastToggled: makeTimestamp() } }
      addLog(makeLog(
        next[id].active ? '모듈 활성화' : '모듈 비활성화',
        next[id].name,
        next[id].active ? 'INFO' : 'WARN',
      ))
      return next
    })
  }, [addLog])

  const setModuleSensitivity = useCallback((id: ModuleId, value: number) => {
    setModules((prev) => ({ ...prev, [id]: { ...prev[id], sensitivity: value } }))
    addLog(makeLog('민감도 조정', `${INITIAL_MODULES[id].name} → ${value}%`))
  }, [addLog])

  const setModuleRefreshRate = useCallback((id: ModuleId, value: number) => {
    setModules((prev) => ({ ...prev, [id]: { ...prev[id], refreshRate: value } }))
  }, [])

  // ── Sector controls ──

  const toggleSector = useCallback((sectorId: string) => {
    setSectors((prev) => prev.map((s) => {
      if (s.id !== sectorId) return s
      const next = { ...s, active: !s.active }
      addLog(makeLog(
        next.active ? '구역 활성화' : '구역 비활성화',
        `${sectorId} ${next.label}`,
        next.active ? 'INFO' : 'WARN',
      ))
      return next
    }))
  }, [addLog])

  const toggleAllSectors = useCallback((active: boolean) => {
    setSectors((prev) => prev.map((s) => ({ ...s, active })))
    addLog(makeLog(active ? '전 구역 활성화' : '전 구역 비활성화', 'ALL SECTORS', active ? 'INFO' : 'CRITICAL'))
  }, [addLog])

  // ── System controls ──

  const setGlobalThreatLevel = useCallback((level: ThreatLevel) => {
    setSystem((prev) => ({ ...prev, globalThreatLevel: level }))
    addLog(makeLog('위협 레벨 변경', `GLOBAL → ${level}`, level === 'CRITICAL' || level === 'HIGH' ? 'CRITICAL' : 'WARN'))
  }, [addLog])

  const toggleSimulation = useCallback(() => {
    setSystem((prev) => {
      const next = !prev.simulationPaused
      addLog(makeLog(next ? '시뮬레이션 일시정지' : '시뮬레이션 재개', 'DATA STREAM', 'WARN'))
      return { ...prev, simulationPaused: next }
    })
  }, [addLog])

  const setFirewallMode = useCallback((mode: FirewallMode) => {
    setSystem((prev) => ({ ...prev, firewallMode: mode }))
    addLog(makeLog('방화벽 모드 변경', `SOL-02 → ${mode}`, mode === 'AGGRESSIVE' ? 'CRITICAL' : 'WARN'))
  }, [addLog])

  const toggleQuarantine = useCallback(() => {
    setSystem((prev) => {
      const next = !prev.quarantineActive
      addLog(makeLog(next ? '격리 모드 활성화' : '격리 해제', 'NETWORK QUARANTINE', next ? 'CRITICAL' : 'INFO'))
      return { ...prev, quarantineActive: next }
    })
  }, [addLog])

  const requestSatelliteTask = useCallback(() => {
    setSystem((prev) => ({ ...prev, satelliteTasking: true }))
    addLog(makeLog('위성 촬영 요청', 'KSat-12 EMERGENCY TASK', 'INFO'))
    setTimeout(() => {
      setSystem((prev) => ({ ...prev, satelliteTasking: false }))
      addLog(makeLog('위성 촬영 완료', 'KSat-12 DATA RECEIVED', 'INFO'))
    }, 8000)
  }, [addLog])

  const toggleRecording = useCallback(() => {
    setSystem((prev) => {
      const next = !prev.recordingActive
      addLog(makeLog(next ? '녹화 시작' : '녹화 중지', 'ALL CAMERAS', next ? 'INFO' : 'WARN'))
      return { ...prev, recordingActive: next }
    })
  }, [addLog])

  const approveScenario = useCallback((scenarioId: string) => {
    setSystem((prev) => ({ ...prev, approvalPending: false, scenarioApproved: scenarioId }))
    addLog(makeLog('시나리오 승인', `${scenarioId} APPROVED`, 'CRITICAL'))
  }, [addLog])

  const triggerEmergencyLockdown = useCallback(() => {
    setSystem((prev) => ({ ...prev, emergencyLockdown: true, globalThreatLevel: 'CRITICAL' }))
    addLog(makeLog('비상 봉쇄 발동', 'EMERGENCY LOCKDOWN INITIATED', 'CRITICAL'))
  }, [addLog])

  const releaseEmergencyLockdown = useCallback(() => {
    setSystem((prev) => ({ ...prev, emergencyLockdown: false }))
    addLog(makeLog('비상 봉쇄 해제', 'LOCKDOWN RELEASED', 'WARN'))
  }, [addLog])

  const clearLogs = useCallback(() => {
    setOpLogs([makeLog('로그 초기화', 'OP LOG CLEARED', 'INFO')])
  }, [])

  // ── Threat score drift ──
  const driftRef = useRef(0)
  useEffect(() => {
    if (system.simulationPaused) return
    const id = setInterval(() => {
      driftRef.current++
      if (driftRef.current % 4 === 0) {
        setSectors((prev) =>
          prev.map((s) =>
            s.active
              ? { ...s, threatScore: Math.min(100, Math.max(0, s.threatScore + (Math.random() - 0.48) * 6)) }
              : s
          )
        )
      }
    }, 2000)
    return () => clearInterval(id)
  }, [system.simulationPaused])

  return (
    <SystemContext.Provider value={{
      modules, sectors, system, opLogs,
      toggleModule, setModuleSensitivity, setModuleRefreshRate,
      toggleSector, toggleAllSectors,
      setGlobalThreatLevel, toggleSimulation, setFirewallMode,
      toggleQuarantine, requestSatelliteTask, toggleRecording,
      approveScenario, triggerEmergencyLockdown, releaseEmergencyLockdown,
      clearLogs,
    }}>
      {children}
    </SystemContext.Provider>
  )
}

export function useSystem() {
  const ctx = useContext(SystemContext)
  if (!ctx) throw new Error('useSystem must be inside SystemProvider')
  return ctx
}

export const THREAT_LEVEL_COLORS: Record<ThreatLevel, string> = {
  NORMAL: '#00ff88',
  ELEVATED: '#ffcc00',
  HIGH: '#ff6b35',
  CRITICAL: '#ff2d55',
}

export const MODULE_COLORS: Record<ModuleId, string> = {
  sol01: '#00d4ff',
  sol02: '#ff2d55',
  sol03: '#00ff88',
  sol04: '#ffcc00',
  sol05: '#ff6b35',
  sol06: '#c084fc',
}
