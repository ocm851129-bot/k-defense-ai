import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'

export type AlertLevel = 'CRITICAL' | 'HIGH' | 'MED' | 'INFO'

export interface Alert {
  id: string
  level: AlertLevel
  title: string
  message: string
  source: string
  timestamp: string
  read: boolean
}

interface AlertContextType {
  alerts: Alert[]
  unreadCount: number
  addAlert: (alert: Omit<Alert, 'id' | 'timestamp' | 'read'>) => void
  markRead: (id: string) => void
  markAllRead: () => void
  latestToast: Alert | null
  dismissToast: () => void
}

const AlertContext = createContext<AlertContextType | null>(null)

const LEVEL_COLORS: Record<AlertLevel, string> = {
  CRITICAL: '#ff2d55',
  HIGH: '#ff6b35',
  MED: '#ffcc00',
  INFO: '#00d4ff',
}

const AUTO_ALERTS: Omit<Alert, 'id' | 'timestamp' | 'read'>[] = [
  { level: 'HIGH', title: '이동식 발사대 포착', message: '구역 A-7 레이더 탐지 — SOL-01 분석 중', source: 'SOL-01' },
  { level: 'CRITICAL', title: 'Zero-Day 공격 탐지', message: 'VPN 게이트웨이 취약점 악용 시도 차단', source: 'SOL-02' },
  { level: 'MED', title: '위성 영상 갱신', message: '사리원 북부 KSat-12 재확인 완료', source: 'SOL-03' },
  { level: 'HIGH', title: '이상 신호 탐지', message: '420MHz 대역 암호화 UHF 신호 포착', source: 'SOL-04' },
  { level: 'MED', title: '객체 탐지 경보', message: 'CAM-05 구역 내 차량 집결 감지', source: 'SOL-05' },
  { level: 'INFO', title: 'AI 시나리오 갱신', message: '시나리오 A 권고 신뢰도 78%→82% 상향', source: 'SOL-06' },
  { level: 'CRITICAL', title: '사이버 침투 시도', message: '국방 인트라넷 SQL 인젝션 차단 완료', source: 'SOL-02' },
  { level: 'HIGH', title: '해안선 접근 감지', message: '서해 해상 소형 고속정 1척 식별', source: 'SOL-05' },
]

export function AlertProvider({ children }: { children: ReactNode }) {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [latestToast, setLatestToast] = useState<Alert | null>(null)
  const [toastQueue, setToastQueue] = useState<Alert[]>([])

  const addAlert = useCallback((alert: Omit<Alert, 'id' | 'timestamp' | 'read'>) => {
    const now = new Date()
    const newAlert: Alert = {
      ...alert,
      id: Math.random().toString(36).slice(2),
      timestamp: now.toTimeString().slice(0, 8),
      read: false,
    }
    setAlerts((prev) => [newAlert, ...prev].slice(0, 50))
    setToastQueue((prev) => [...prev, newAlert])
  }, [])

  const markRead = useCallback((id: string) => {
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, read: true } : a)))
  }, [])

  const markAllRead = useCallback(() => {
    setAlerts((prev) => prev.map((a) => ({ ...a, read: true })))
  }, [])

  const dismissToast = useCallback(() => {
    setLatestToast(null)
  }, [])

  // Process toast queue
  useEffect(() => {
    if (toastQueue.length > 0 && !latestToast) {
      const [next, ...rest] = toastQueue
      setLatestToast(next)
      setToastQueue(rest)
      const t = setTimeout(() => setLatestToast(null), 5000)
      return () => clearTimeout(t)
    }
  }, [toastQueue, latestToast])

  // Auto-generate alerts every 12–20 seconds
  useEffect(() => {
    const schedule = () => {
      const delay = 12000 + Math.random() * 8000
      return setTimeout(() => {
        const template = AUTO_ALERTS[Math.floor(Math.random() * AUTO_ALERTS.length)]
        addAlert(template)
        schedule()
      }, delay)
    }
    // First alert after 4 seconds
    const first = setTimeout(() => addAlert(AUTO_ALERTS[0]), 4000)
    const recurring = schedule()
    return () => {
      clearTimeout(first)
      clearTimeout(recurring)
    }
  }, [addAlert])

  const unreadCount = alerts.filter((a) => !a.read).length

  return (
    <AlertContext.Provider value={{ alerts, unreadCount, addAlert, markRead, markAllRead, latestToast, dismissToast }}>
      {children}
    </AlertContext.Provider>
  )
}

export function useAlerts() {
  const ctx = useContext(AlertContext)
  if (!ctx) throw new Error('useAlerts must be inside AlertProvider')
  return ctx
}

export { LEVEL_COLORS }
