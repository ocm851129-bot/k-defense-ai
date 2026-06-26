import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Settings, Shield, Lock, Globe, Radio, Eye, Cpu,
  AlertTriangle, Play, Pause, RotateCcw, ChevronLeft,
  Activity, Database, Wifi, Video, CheckCircle, XCircle,
  Zap,
} from 'lucide-react'
import {
  useSystem, THREAT_LEVEL_COLORS, MODULE_COLORS,
  type ModuleId, type ThreatLevel, type FirewallMode,
} from '../contexts/SystemContext'
import Toggle from '../components/ui/Toggle'
import RangeSlider from '../components/ui/RangeSlider'
import ConfirmDialog from '../components/ui/ConfirmDialog'

const MODULE_ICONS: Record<ModuleId, typeof Shield> = {
  sol01: Shield, sol02: Lock, sol03: Globe,
  sol04: Radio, sol05: Eye, sol06: Cpu,
}
const MODULE_HREFS: Record<ModuleId, string> = {
  sol01: '/sol/01', sol02: '/sol/02', sol03: '/sol/03',
  sol04: '/sol/04', sol05: '/sol/05', sol06: '/sol/06',
}

const THREAT_LEVELS: ThreatLevel[] = ['NORMAL', 'ELEVATED', 'HIGH', 'CRITICAL']
const FIREWALL_MODES: { mode: FirewallMode; label: string; desc: string }[] = [
  { mode: 'MONITOR', label: '모니터', desc: '탐지만 수행, 차단 없음' },
  { mode: 'BLOCK', label: '차단', desc: '위협 자동 차단' },
  { mode: 'AGGRESSIVE', label: '공격적', desc: '선제 차단 + 반격' },
]

const LOG_COLORS = { INFO: '#00d4ff', WARN: '#ffcc00', CRITICAL: '#ff2d55' }

export default function ControlPanel() {
  const sys = useSystem()
  const [confirm, setConfirm] = useState<null | {
    title: string; message: string; danger?: boolean; confirmLabel?: string; onConfirm: () => void
  }>(null)
  const [activeTab, setActiveTab] = useState<'modules' | 'sectors' | 'system' | 'logs'>('modules')
  const [sectorFilter, setSectorFilter] = useState<'all' | 'active' | 'inactive'>('all')

  const ask = (cfg: typeof confirm) => setConfirm(cfg)

  const modulesArr = Object.values(sys.modules)
  const activeModules = modulesArr.filter((m) => m.active).length
  const activeSectors = sys.sectors.filter((s) => s.active).length

  return (
    <div className="min-h-screen bg-[#020b18] pt-4 pb-20">
      {/* Emergency lockdown banner */}
      {sys.system.emergencyLockdown && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: 'auto' }}
          className="bg-[#ff2d55]/15 border-b-2 border-[#ff2d55] px-6 py-3 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-[#ff2d55] animate-pulse" />
            <span className="text-[12px] font-black tracking-[0.15em] text-[#ff2d55] uppercase">
              비상 봉쇄 발동 중 — 모든 외부 통신 차단
            </span>
          </div>
          <button
            onClick={() => ask({
              title: '비상 봉쇄 해제', danger: true, confirmLabel: '해제 확인',
              message: '비상 봉쇄를 해제합니다. 일반 운영 모드로 복귀합니다.',
              onConfirm: sys.releaseEmergencyLockdown,
            })}
            className="text-[10px] font-black text-[#ff2d55] border border-[#ff2d55]/40 px-3 py-1.5 hover:bg-[#ff2d55]/10 transition-all clip-corner-sm"
          >
            봉쇄 해제
          </button>
        </motion.div>
      )}

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pt-2">
          <div>
            <Link to="/command" className="inline-flex items-center gap-1.5 text-[10px] font-bold text-[#4a7a9b] hover:text-[#00d4ff] mb-3 transition-colors">
              <ChevronLeft className="w-3.5 h-3.5" /> 지휘 센터
            </Link>
            <h1 className="text-3xl font-black text-white flex items-center gap-3">
              <Settings className="w-7 h-7 text-[#00d4ff]" />
              시스템 <span className="text-[#00d4ff] glow-text">제어 센터</span>
            </h1>
          </div>

          {/* Status strip */}
          <div className="hidden md:flex items-center gap-4">
            <div className="text-center">
              <div className="text-xl font-black number-mono" style={{ color: THREAT_LEVEL_COLORS[sys.system.globalThreatLevel] }}>
                {sys.system.globalThreatLevel}
              </div>
              <div className="text-[9px] text-[#4a7a9b]">위협 레벨</div>
            </div>
            <div className="w-px h-8 bg-[#0a3050]" />
            <div className="text-center">
              <div className="text-xl font-black text-[#00d4ff]">{activeModules}/6</div>
              <div className="text-[9px] text-[#4a7a9b]">활성 모듈</div>
            </div>
            <div className="w-px h-8 bg-[#0a3050]" />
            <div className="text-center">
              <div className="text-xl font-black text-[#00ff88]">{activeSectors}/34</div>
              <div className="text-[9px] text-[#4a7a9b]">모니터링 구역</div>
            </div>
            <div className="w-px h-8 bg-[#0a3050]" />
            {/* Sim control */}
            <button
              onClick={sys.toggleSimulation}
              className="clip-corner-sm flex items-center gap-1.5 px-3 py-2 border text-[10px] font-black tracking-[0.1em] transition-all"
              style={{
                borderColor: sys.system.simulationPaused ? '#ffcc0060' : '#00d4ff30',
                color: sys.system.simulationPaused ? '#ffcc00' : '#00d4ff',
                background: sys.system.simulationPaused ? '#ffcc0010' : '#00d4ff08',
              }}
            >
              {sys.system.simulationPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
              {sys.system.simulationPaused ? '재개' : '일시정지'}
            </button>
          </div>
        </div>

        {/* Tab navigation */}
        <div className="flex gap-2 mb-6 border-b border-[#0a3050] pb-1">
          {([
            { key: 'modules', label: 'AI 모듈 제어', icon: Cpu },
            { key: 'sectors', label: '구역 관리', icon: Globe },
            { key: 'system', label: '시스템 설정', icon: Settings },
            { key: 'logs', label: '작전 로그', icon: Activity },
          ] as const).map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-1.5 px-4 py-2 text-[10px] font-black tracking-[0.12em] uppercase transition-all border-b-2 -mb-[5px] ${
                activeTab === key
                  ? 'border-[#00d4ff] text-[#00d4ff]'
                  : 'border-transparent text-[#4a7a9b] hover:text-[#8ab8d4]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </button>
          ))}
        </div>

        {/* ── TAB: MODULES ───────────────────────────────────────────────── */}
        {activeTab === 'modules' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {modulesArr.map((mod) => {
                const Icon = MODULE_ICONS[mod.id]
                const color = MODULE_COLORS[mod.id]
                return (
                  <div
                    key={mod.id}
                    className={`clip-corner bg-[#041526]/80 border p-5 transition-all ${
                      mod.active ? 'border-[#00d4ff]/15' : 'border-[#0a3050] opacity-70'
                    }`}
                    style={mod.active ? { boxShadow: `0 0 20px ${color}10` } : {}}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 clip-corner-sm flex items-center justify-center"
                          style={{ background: `${color}18`, border: `1px solid ${color}30` }}
                        >
                          <Icon className="w-5 h-5" style={{ color }} />
                        </div>
                        <div>
                          <div className="text-[9px] font-black tracking-[0.15em] mb-0.5" style={{ color }}>
                            {mod.id.toUpperCase().replace('SOL', 'SOL-')}
                          </div>
                          <div className="text-[12px] font-bold text-white">{mod.name}</div>
                        </div>
                      </div>
                      <Toggle checked={mod.active} onChange={() => toggleModule(mod.id, sys)} color={color} />
                    </div>

                    {/* Status indicator */}
                    <div className="flex items-center gap-2 mb-4 p-2 bg-[#020b18]/50 border border-[#0a3050]">
                      <div className={`w-2 h-2 rounded-full ${mod.active ? 'animate-pulse' : ''}`}
                        style={{ background: mod.active ? color : '#2a4a5e' }} />
                      <span className="text-[10px] font-mono" style={{ color: mod.active ? color : '#2a4a5e' }}>
                        {mod.active ? 'ONLINE' : 'OFFLINE'}
                      </span>
                      {mod.lastToggled && (
                        <span className="text-[9px] text-[#2a4a5e] ml-auto font-mono">{mod.lastToggled}</span>
                      )}
                    </div>

                    {/* Sensitivity slider */}
                    <div className="mb-4">
                      <RangeSlider
                        value={mod.sensitivity}
                        onChange={(v) => sys.setModuleSensitivity(mod.id, v)}
                        color={color}
                        label="탐지 민감도"
                        disabled={!mod.active}
                      />
                    </div>

                    {/* Refresh rate slider */}
                    <div className="mb-4">
                      <RangeSlider
                        value={mod.refreshRate}
                        onChange={(v) => sys.setModuleRefreshRate(mod.id, v)}
                        min={1} max={60} step={1}
                        color={color}
                        label="갱신 주기"
                        unit="s"
                        disabled={!mod.active}
                      />
                    </div>

                    {/* Go to page */}
                    <Link
                      to={MODULE_HREFS[mod.id]}
                      className="flex items-center justify-center gap-1.5 w-full py-2 text-[10px] font-black tracking-[0.1em] uppercase border transition-all clip-corner-sm"
                      style={{ borderColor: `${color}30`, color }}
                    >
                      상세 제어 <Zap className="w-3 h-3" />
                    </Link>
                  </div>
                )
              })}
            </div>
          </motion.div>
        )}

        {/* ── TAB: SECTORS ──────────────────────────────────────────────── */}
        {activeTab === 'sectors' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            {/* Filter & bulk actions */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex gap-2">
                {(['all', 'active', 'inactive'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setSectorFilter(f)}
                    className={`px-3 py-1.5 text-[9px] font-black tracking-[0.12em] uppercase transition-all clip-corner-sm ${
                      sectorFilter === f
                        ? 'bg-[#00d4ff] text-[#020b18]'
                        : 'border border-[#0a3050] text-[#4a7a9b] hover:border-[#00d4ff]/30'
                    }`}
                  >
                    {f === 'all' ? '전체' : f === 'active' ? '활성' : '비활성'}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => ask({
                    title: '전 구역 활성화',
                    message: '34개 모든 모니터링 구역을 활성화합니다.',
                    onConfirm: () => sys.toggleAllSectors(true),
                  })}
                  className="clip-corner-sm px-3 py-1.5 text-[9px] font-black text-[#00ff88] border border-[#00ff88]/30 hover:bg-[#00ff88]/10 transition-all"
                >
                  전체 활성화
                </button>
                <button
                  onClick={() => ask({
                    title: '전 구역 비활성화', danger: true, confirmLabel: '비활성화',
                    message: '34개 모든 구역 모니터링이 중단됩니다. 보안 공백이 발생할 수 있습니다.',
                    onConfirm: () => sys.toggleAllSectors(false),
                  })}
                  className="clip-corner-sm px-3 py-1.5 text-[9px] font-black text-[#ff2d55] border border-[#ff2d55]/30 hover:bg-[#ff2d55]/10 transition-all"
                >
                  전체 비활성화
                </button>
              </div>
            </div>

            {/* Summary bar */}
            <div className="flex items-center gap-4 p-3 bg-[#041526]/80 border border-[#00d4ff]/10 clip-corner-sm mb-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#00ff88]" />
                <span className="text-[11px] text-[#8ab8d4]">활성 <strong className="text-[#00ff88]">{activeSectors}</strong>개</span>
              </div>
              <div className="w-px h-4 bg-[#0a3050]" />
              <div className="flex items-center gap-2">
                <XCircle className="w-4 h-4 text-[#ff2d55]" />
                <span className="text-[11px] text-[#8ab8d4]">비활성 <strong className="text-[#ff2d55]">{34 - activeSectors}</strong>개</span>
              </div>
              <div className="flex-1 h-1.5 bg-[#0a3050] rounded-full overflow-hidden ml-4">
                <div
                  className="h-full bg-gradient-to-r from-[#00d4ff80] to-[#00d4ff] rounded-full transition-all"
                  style={{ width: `${(activeSectors / 34) * 100}%` }}
                />
              </div>
              <span className="text-[10px] font-mono text-[#00d4ff]">{Math.round((activeSectors / 34) * 100)}%</span>
            </div>

            {/* Sector grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
              {sys.sectors
                .filter((s) =>
                  sectorFilter === 'all' ? true :
                  sectorFilter === 'active' ? s.active : !s.active
                )
                .map((sector) => {
                  const threat = sector.threatScore
                  const tc = threat > 70 ? '#ff2d55' : threat > 40 ? '#ffcc00' : '#00ff88'
                  return (
                    <button
                      key={sector.id}
                      onClick={() => sys.toggleSector(sector.id)}
                      className={`p-3 border text-left transition-all clip-corner-sm hover:scale-[1.02] active:scale-[0.98] ${
                        sector.active
                          ? 'bg-[#041526]/80 border-[#00d4ff]/15'
                          : 'bg-[#020b18]/60 border-[#0a3050] opacity-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[8px] font-black font-mono text-[#4a7a9b]">{sector.id}</span>
                        <div className={`w-1.5 h-1.5 rounded-full ${sector.active ? 'animate-pulse' : ''}`}
                          style={{ background: sector.active ? '#00ff88' : '#2a4a5e' }} />
                      </div>
                      <div className="text-[9px] text-white font-bold leading-tight mb-2">{sector.label}</div>
                      <div className="h-1 bg-[#0a3050] rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all" style={{ width: `${threat}%`, background: tc }} />
                      </div>
                      <div className="text-[8px] font-mono mt-1" style={{ color: tc }}>{Math.round(threat)}</div>
                    </button>
                  )
                })}
            </div>
          </motion.div>
        )}

        {/* ── TAB: SYSTEM ───────────────────────────────────────────────── */}
        {activeTab === 'system' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

              {/* Global Threat Level */}
              <div className="clip-corner bg-[#041526]/80 border border-[#00d4ff]/10 p-5">
                <div className="text-[10px] font-black tracking-[0.2em] text-[#00d4ff] uppercase mb-4">전역 위협 레벨</div>
                <div className="grid grid-cols-4 gap-2">
                  {THREAT_LEVELS.map((level) => {
                    const color = THREAT_LEVEL_COLORS[level]
                    const active = sys.system.globalThreatLevel === level
                    return (
                      <button
                        key={level}
                        onClick={() => ask({
                          title: `위협 레벨 → ${level}`,
                          danger: level === 'CRITICAL',
                          confirmLabel: '변경',
                          message: `전역 위협 레벨을 ${level}로 변경합니다. 모든 모듈에 즉시 적용됩니다.`,
                          onConfirm: () => sys.setGlobalThreatLevel(level),
                        })}
                        className="py-3 text-[10px] font-black tracking-[0.1em] uppercase transition-all clip-corner-sm"
                        style={{
                          color: active ? '#020b18' : color,
                          background: active ? color : `${color}12`,
                          border: `1px solid ${color}${active ? 'ff' : '40'}`,
                          boxShadow: active ? `0 0 12px ${color}60` : 'none',
                        }}
                      >
                        {level}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Firewall Mode */}
              <div className="clip-corner bg-[#041526]/80 border border-[#ff2d55]/15 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Wifi className="w-4 h-4 text-[#ff2d55]" />
                  <span className="text-[10px] font-black tracking-[0.2em] text-[#00d4ff] uppercase">방화벽 모드 (SOL-02)</span>
                </div>
                <div className="space-y-2">
                  {FIREWALL_MODES.map(({ mode, label, desc }) => {
                    const active = sys.system.firewallMode === mode
                    const color = mode === 'MONITOR' ? '#00ff88' : mode === 'BLOCK' ? '#ffcc00' : '#ff2d55'
                    return (
                      <button
                        key={mode}
                        onClick={() => ask({
                          title: `방화벽 → ${label} 모드`,
                          danger: mode === 'AGGRESSIVE',
                          confirmLabel: `${label} 모드 전환`,
                          message: `방화벽을 ${label} 모드(${desc})로 전환합니다.`,
                          onConfirm: () => sys.setFirewallMode(mode),
                        })}
                        className="w-full flex items-center justify-between p-3 border text-left transition-all clip-corner-sm"
                        style={{
                          borderColor: active ? color : '#1a3a5a',
                          background: active ? `${color}10` : 'transparent',
                        }}
                      >
                        <div>
                          <div className="text-[11px] font-bold" style={{ color: active ? color : '#8ab8d4' }}>{label}</div>
                          <div className="text-[9px] text-[#4a7a9b]">{desc}</div>
                        </div>
                        {active && <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: color }} />}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Quick Toggles */}
              <div className="clip-corner bg-[#041526]/80 border border-[#00d4ff]/10 p-5">
                <div className="text-[10px] font-black tracking-[0.2em] text-[#00d4ff] uppercase mb-4">시스템 제어</div>
                <div className="space-y-4">
                  {[
                    {
                      icon: Database,
                      label: '데이터 스트림',
                      desc: sys.system.simulationPaused ? '일시 정지됨' : '실시간 갱신 중',
                      checked: !sys.system.simulationPaused,
                      onChange: sys.toggleSimulation,
                      color: '#00d4ff',
                    },
                    {
                      icon: Wifi,
                      label: '네트워크 격리',
                      desc: sys.system.quarantineActive ? '격리 활성' : '정상 연결',
                      checked: sys.system.quarantineActive,
                      onChange: () => ask({
                        title: sys.system.quarantineActive ? '격리 해제' : '네트워크 격리 활성화',
                        danger: !sys.system.quarantineActive,
                        confirmLabel: sys.system.quarantineActive ? '해제' : '격리 활성화',
                        message: sys.system.quarantineActive
                          ? '네트워크 격리를 해제합니다. 외부 연결이 복구됩니다.'
                          : '네트워크를 격리합니다. 외부 통신이 차단됩니다.',
                        onConfirm: sys.toggleQuarantine,
                      }),
                      color: sys.system.quarantineActive ? '#ff2d55' : '#00d4ff',
                    },
                    {
                      icon: Video,
                      label: '전 카메라 녹화',
                      desc: sys.system.recordingActive ? '녹화 중' : '녹화 중지',
                      checked: sys.system.recordingActive,
                      onChange: sys.toggleRecording,
                      color: '#ff6b35',
                    },
                  ].map(({ icon: Icon, label, desc, checked, onChange, color }) => (
                    <div key={label} className="flex items-center justify-between py-2.5 border-b border-[#0a3050]/50 last:border-0">
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4" style={{ color }} />
                        <div>
                          <div className="text-[12px] font-bold text-white">{label}</div>
                          <div className="text-[10px] text-[#4a7a9b]">{desc}</div>
                        </div>
                      </div>
                      <Toggle checked={checked} onChange={onChange} color={color} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Emergency Actions */}
              <div className="clip-corner bg-[#041526]/80 border border-[#ff2d55]/20 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-4 h-4 text-[#ff2d55]" />
                  <span className="text-[10px] font-black tracking-[0.2em] text-[#ff2d55] uppercase">긴급 작전</span>
                </div>
                <div className="space-y-3">
                  <button
                    onClick={() => sys.requestSatelliteTask()}
                    disabled={sys.system.satelliteTasking}
                    className="w-full flex items-center gap-3 p-3 border border-[#00ff88]/30 text-left transition-all hover:bg-[#00ff88]/5 clip-corner-sm disabled:opacity-50"
                  >
                    {sys.system.satelliteTasking ? (
                      <RotateCcw className="w-4 h-4 text-[#00ff88] animate-spin shrink-0" />
                    ) : (
                      <Globe className="w-4 h-4 text-[#00ff88] shrink-0" />
                    )}
                    <div>
                      <div className="text-[11px] font-bold text-[#00ff88]">
                        {sys.system.satelliteTasking ? '위성 촬영 진행 중...' : '긴급 위성 촬영 요청'}
                      </div>
                      <div className="text-[9px] text-[#4a7a9b]">KSat-12 즉시 투입 (완료 시 자동 해제)</div>
                    </div>
                  </button>

                  <button
                    onClick={() => ask({
                      title: '비상 봉쇄 발동', danger: true, confirmLabel: '봉쇄 발동',
                      message: '비상 봉쇄를 발동합니다. 모든 외부 통신이 차단되고 위협 레벨이 CRITICAL로 격상됩니다. 이 조치는 즉시 작전 로그에 기록됩니다.',
                      onConfirm: sys.triggerEmergencyLockdown,
                    })}
                    disabled={sys.system.emergencyLockdown}
                    className="w-full flex items-center gap-3 p-3 border border-[#ff2d55]/30 text-left transition-all hover:bg-[#ff2d55]/5 clip-corner-sm disabled:opacity-50"
                  >
                    <AlertTriangle className="w-4 h-4 text-[#ff2d55] shrink-0" />
                    <div>
                      <div className="text-[11px] font-bold text-[#ff2d55]">비상 봉쇄 발동</div>
                      <div className="text-[9px] text-[#4a7a9b]">전 시스템 비상 모드 전환</div>
                    </div>
                  </button>

                  <button
                    onClick={() => ask({
                      title: '전 모듈 재시작', danger: true, confirmLabel: '재시작',
                      message: '6개 AI 모듈을 순차적으로 재시작합니다. 재시작 중 약 30초간 탐지 기능이 중단됩니다.',
                      onConfirm: () => {
                        Object.keys(sys.modules).forEach((id, i) => {
                          setTimeout(() => {
                            sys.toggleModule(id as ModuleId)
                            setTimeout(() => sys.toggleModule(id as ModuleId), 1500)
                          }, i * 800)
                        })
                      },
                    })}
                    className="w-full flex items-center gap-3 p-3 border border-[#ffcc00]/30 text-left transition-all hover:bg-[#ffcc00]/5 clip-corner-sm"
                  >
                    <RotateCcw className="w-4 h-4 text-[#ffcc00] shrink-0" />
                    <div>
                      <div className="text-[11px] font-bold text-[#ffcc00]">전 모듈 재시작</div>
                      <div className="text-[9px] text-[#4a7a9b]">순차 재부팅 (~30초 소요)</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── TAB: LOGS ─────────────────────────────────────────────────── */}
        {activeTab === 'logs' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] text-[#4a7a9b]">총 {sys.opLogs.length}건의 작전 기록</span>
              <button
                onClick={() => ask({
                  title: '로그 초기화', danger: true, confirmLabel: '초기화',
                  message: '작전 로그를 모두 삭제합니다.',
                  onConfirm: sys.clearLogs,
                })}
                className="text-[10px] font-bold text-[#ff2d55]/60 hover:text-[#ff2d55] transition-colors"
              >
                로그 초기화
              </button>
            </div>
            <div className="clip-corner bg-[#041526]/80 border border-[#00d4ff]/10">
              {sys.opLogs.map((log, i) => (
                <div
                  key={log.id}
                  className={`flex items-start gap-4 px-4 py-3 border-b border-[#0a3050]/50 last:border-0 ${
                    i === 0 ? 'bg-[#00d4ff]/3' : ''
                  }`}
                >
                  <span className="text-[9px] font-mono text-[#4a7a9b] shrink-0 w-16">{log.timestamp}</span>
                  <span
                    className="text-[8px] font-black px-1.5 py-0.5 shrink-0"
                    style={{ color: LOG_COLORS[log.level], background: `${LOG_COLORS[log.level]}15` }}
                  >
                    {log.level}
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className="text-[11px] font-bold text-white">{log.action}</span>
                    <span className="text-[10px] text-[#4a7a9b] ml-2">→ {log.target}</span>
                  </div>
                  <span
                    className="text-[9px] font-bold shrink-0"
                    style={{ color: log.result === 'SUCCESS' ? '#00ff88' : log.result === 'FAILED' ? '#ff2d55' : '#ffcc00' }}
                  >
                    {log.result}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Confirm Dialog */}
      <ConfirmDialog
        open={!!confirm}
        title={confirm?.title ?? ''}
        message={confirm?.message ?? ''}
        danger={confirm?.danger}
        confirmLabel={confirm?.confirmLabel}
        onConfirm={() => { confirm?.onConfirm(); setConfirm(null) }}
        onCancel={() => setConfirm(null)}
      />
    </div>
  )
}

// Helper to capture sys.toggleModule in the closure
function toggleModule(id: ModuleId, sys: ReturnType<typeof useSystem>) {
  sys.toggleModule(id)
}
