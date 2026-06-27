import { useState } from 'react'
import { Settings, Zap, AlertTriangle, ChevronUp, ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useSystem, MODULE_COLORS, type ModuleId } from '../contexts/SystemContext'
import { useAlerts } from '../contexts/AlertContext'
import Toggle from './ui/Toggle'
import RangeSlider from './ui/RangeSlider'
import ConfirmDialog from './ui/ConfirmDialog'

interface Props {
  moduleId: ModuleId
  children?: React.ReactNode  // extra controls injected per page
}

export default function SolControlBar({ moduleId, children }: Props) {
  const sys = useSystem()
  const { addAlert } = useAlerts()
  const [open, setOpen] = useState(typeof window !== 'undefined' && window.innerWidth >= 768)
  const [confirmOff, setConfirmOff] = useState(false)

  const mod = sys.modules[moduleId]
  const color = MODULE_COLORS[moduleId]

  const handleToggle = () => {
    if (mod.active) {
      setConfirmOff(true)
    } else {
      sys.toggleModule(moduleId)
      addAlert({ level: 'INFO', title: `${mod.name} 활성화`, message: '모듈이 정상 가동됩니다.', source: moduleId.toUpperCase().replace('sol', 'SOL-') })
    }
  }

  return (
    <>
      <div className="border-t border-[#00d4ff]/10 bg-[#041526]/60 backdrop-blur-sm">
        {/* Toggle bar */}
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between px-6 py-3 hover:bg-[#00d4ff]/3 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Settings className="w-4 h-4 text-[#00d4ff]" />
            <span className="text-[10px] font-black tracking-[0.2em] text-[#00d4ff] uppercase">
              모듈 제어 패널 — {mod.name}
            </span>
            <div
              className={`flex items-center gap-1.5 px-2 py-0.5 text-[8px] font-black ${
                mod.active ? 'text-[#00ff88]' : 'text-[#ff2d55]'
              }`}
              style={{ background: mod.active ? '#00ff8815' : '#ff2d5515' }}
            >
              <div className={`w-1 h-1 rounded-full ${mod.active ? 'bg-[#00ff88] animate-pulse' : 'bg-[#ff2d55]'}`} />
              {mod.active ? 'ONLINE' : 'OFFLINE'}
            </div>
          </div>
          {open ? <ChevronDown className="w-4 h-4 text-[#4a7a9b]" /> : <ChevronUp className="w-4 h-4 text-[#4a7a9b]" />}
        </button>

        {/* Control body */}
        {open && (
          <div className="px-3 md:px-6 pb-4 md:pb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 md:gap-4">

              {/* Module power */}
              <div className="bg-[#020b18]/60 border border-[#0a3050] p-4 clip-corner-sm">
                <div className="text-[9px] font-black tracking-[0.15em] text-[#4a7a9b] uppercase mb-3">모듈 전원</div>
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-bold text-white">
                    {mod.active ? '가동 중' : '중단됨'}
                  </span>
                  <Toggle checked={mod.active} onChange={handleToggle} color={color} />
                </div>
                {mod.lastToggled && (
                  <div className="text-[9px] text-[#2a4a5e] font-mono mt-2">최근 변경: {mod.lastToggled}</div>
                )}
              </div>

              {/* Sensitivity */}
              <div className="bg-[#020b18]/60 border border-[#0a3050] p-4 clip-corner-sm">
                <div className="text-[9px] font-black tracking-[0.15em] text-[#4a7a9b] uppercase mb-3">탐지 민감도</div>
                <RangeSlider
                  value={mod.sensitivity}
                  onChange={(v) => sys.setModuleSensitivity(moduleId, v)}
                  color={color}
                  disabled={!mod.active}
                />
                <div className="text-[9px] text-[#4a7a9b] mt-2">
                  {mod.sensitivity < 40 ? '낮음 — 오탐지 최소화' : mod.sensitivity < 70 ? '보통 — 균형 모드' : '높음 — 최대 탐지'}
                </div>
              </div>

              {/* Refresh rate */}
              <div className="bg-[#020b18]/60 border border-[#0a3050] p-4 clip-corner-sm">
                <div className="text-[9px] font-black tracking-[0.15em] text-[#4a7a9b] uppercase mb-3">데이터 갱신 주기</div>
                <RangeSlider
                  value={mod.refreshRate}
                  onChange={(v) => sys.setModuleRefreshRate(moduleId, v)}
                  min={1} max={60} step={1}
                  color={color}
                  unit="s"
                  disabled={!mod.active}
                />
                <div className="text-[9px] text-[#4a7a9b] mt-2">
                  {mod.refreshRate <= 5 ? '실시간' : mod.refreshRate <= 15 ? '빠름' : '표준'} 갱신
                </div>
              </div>

              {/* Quick links */}
              <div className="bg-[#020b18]/60 border border-[#0a3050] p-4 clip-corner-sm">
                <div className="text-[9px] font-black tracking-[0.15em] text-[#4a7a9b] uppercase mb-3">빠른 이동</div>
                <div className="space-y-2">
                  <Link
                    to="/control"
                    className="flex items-center gap-2 text-[11px] text-[#8ab8d4] hover:text-[#00d4ff] transition-colors"
                  >
                    <Settings className="w-3.5 h-3.5" /> 제어 센터
                  </Link>
                  <Link
                    to="/command"
                    className="flex items-center gap-2 text-[11px] text-[#8ab8d4] hover:text-[#00d4ff] transition-colors"
                  >
                    <Zap className="w-3.5 h-3.5" /> 지휘 센터
                  </Link>
                  <button
                    onClick={() => addAlert({
                      level: 'INFO',
                      title: `${mod.name} 수동 보고`,
                      message: '운영자 수동 보고 — 정상 운용 확인',
                      source: moduleId.toUpperCase().replace('sol', 'SOL-'),
                    })}
                    className="flex items-center gap-2 text-[11px] text-[#8ab8d4] hover:text-[#00ff88] transition-colors"
                  >
                    <AlertTriangle className="w-3.5 h-3.5" /> 수동 보고 전송
                  </button>
                </div>
              </div>

              {/* Extra controls injected from parent page */}
              {children}
            </div>
          </div>
        )}
      </div>

      <ConfirmDialog
        open={confirmOff}
        title={`${mod.name} 비활성화`}
        message={`${mod.name}를 비활성화합니다. 해당 모듈의 탐지 기능이 중단됩니다.`}
        danger
        confirmLabel="비활성화"
        onConfirm={() => {
          sys.toggleModule(moduleId)
          addAlert({ level: 'HIGH', title: `${mod.name} 비활성화`, message: '모듈이 중단되었습니다. 즉시 복구를 권고합니다.', source: moduleId.toUpperCase().replace('sol', 'SOL-') })
          setConfirmOff(false)
        }}
        onCancel={() => setConfirmOff(false)}
      />
    </>
  )
}
