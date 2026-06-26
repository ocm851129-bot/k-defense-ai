import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Wifi, AlertTriangle, Shield, Server, Activity, ChevronLeft, Eye } from 'lucide-react'
import { Link } from 'react-router-dom'
import SolControlBar from '../../components/SolControlBar'
import { useSystem } from '../../contexts/SystemContext'
import ConfirmDialog from '../../components/ui/ConfirmDialog'

const ATTACK_LOG = [
  { time: '14:51:03', src: '185.220.101.x', type: 'SQL Injection', target: '국방인트라넷 로그인', status: 'BLOCKED', severity: 'HIGH' },
  { time: '14:49:47', src: '45.142.212.x', type: 'Brute Force', target: 'SSH Admin Gateway', status: 'BLOCKED', severity: 'MED' },
  { time: '14:48:22', src: '91.108.4.x', type: 'Zero-Day Exploit', target: 'VPN Concentrator', status: 'ANALYZING', severity: 'CRITICAL' },
  { time: '14:46:11', src: '192.42.116.x', type: 'Port Scan', target: 'DMZ Perimeter', status: 'MONITORED', severity: 'LOW' },
  { time: '14:44:55', src: '51.15.43.x', type: 'DDoS SYN Flood', target: '작전통신망 API', status: 'MITIGATED', severity: 'HIGH' },
  { time: '14:43:17', src: '104.244.76.x', type: 'Phishing Payload', target: '메일 서버', status: 'QUARANTINED', severity: 'MED' },
]

const NODES = [
  { id: 'FW-01', label: '외부 방화벽', x: 50, y: 30, ok: true },
  { id: 'IDS-01', label: 'IDS/IPS', x: 50, y: 50, ok: true },
  { id: 'DMZ', label: 'DMZ', x: 50, y: 70, ok: true },
  { id: 'VPN', label: 'VPN Gateway', x: 20, y: 55, ok: false },
  { id: 'INTRA', label: '내부망', x: 80, y: 55, ok: true },
  { id: 'AICORE', label: 'AI 분석 코어', x: 50, y: 85, ok: true },
]

const STATUS_COLORS: Record<string, string> = {
  BLOCKED: '#00ff88',
  MITIGATED: '#00d4ff',
  MONITORED: '#ffcc00',
  ANALYZING: '#ff6b35',
  QUARANTINED: '#c084fc',
}
const SEV_COLORS: Record<string, string> = {
  CRITICAL: '#ff2d55',
  HIGH: '#ff6b35',
  MED: '#ffcc00',
  LOW: '#00ff88',
}

function NetworkTopology() {
  return (
    <svg viewBox="0 0 100 120" className="w-full max-w-[280px] mx-auto">
      <line x1="50" y1="30" x2="50" y2="50" stroke="#00d4ff" strokeOpacity="0.3" strokeWidth="0.5" />
      <line x1="50" y1="50" x2="50" y2="70" stroke="#00d4ff" strokeOpacity="0.3" strokeWidth="0.5" />
      <line x1="50" y1="55" x2="20" y2="55" stroke="#ff2d55" strokeOpacity="0.5" strokeWidth="0.5" strokeDasharray="2,1" />
      <line x1="50" y1="55" x2="80" y2="55" stroke="#00d4ff" strokeOpacity="0.3" strokeWidth="0.5" />
      <line x1="50" y1="70" x2="50" y2="85" stroke="#00d4ff" strokeOpacity="0.3" strokeWidth="0.5" />
      {NODES.map((n) => (
        <g key={n.id}>
          <circle cx={n.x} cy={n.y} r="5" fill={n.ok ? '#00d4ff18' : '#ff2d5518'} stroke={n.ok ? '#00d4ff' : '#ff2d55'} strokeWidth="0.5" />
          <text x={n.x} y={n.y + 9} textAnchor="middle" fontSize="4" fill="#8ab8d4">{n.id}</text>
        </g>
      ))}
      <text x="50" y="10" textAnchor="middle" fontSize="5" fill="#4a7a9b">인터넷</text>
      <circle cx="50" cy="15" r="4" fill="none" stroke="#ff2d55" strokeWidth="0.5" strokeDasharray="1,1" />
    </svg>
  )
}

function ThreatMeter({ value }: { value: number }) {
  const [cur, setCur] = useState(0)
  useEffect(() => {
    const t = setTimeout(() => setCur(value), 300)
    return () => clearTimeout(t)
  }, [value])
  const color = cur > 70 ? '#ff2d55' : cur > 40 ? '#ffcc00' : '#00ff88'
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-28 h-28">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          <circle cx="50" cy="50" r="40" fill="none" stroke="#0a3050" strokeWidth="8" />
          <circle cx="50" cy="50" r="40" fill="none" stroke={color} strokeWidth="8"
            strokeDasharray={`${cur * 2.51} 251`}
            style={{ transition: 'stroke-dasharray 1.5s ease, stroke 0.5s' }} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center rotate-0">
          <span className="text-2xl font-black number-mono" style={{ color }}>{cur}</span>
          <span className="text-[8px] text-[#4a7a9b] font-bold">THREAT LEVEL</span>
        </div>
      </div>
    </div>
  )
}

const FW_COLORS: Record<string, string> = {
  MONITOR: '#00ff88', BLOCK: '#ffcc00', AGGRESSIVE: '#ff2d55',
}
const FW_LABELS: Record<string, string> = {
  MONITOR: '모니터', BLOCK: '차단', AGGRESSIVE: '공격적',
}

export default function Sol02() {
  const sys = useSystem()
  const [blockConfirm, setBlockConfirm] = useState<null | { ip: string }>(null)
  const [blockedIPs, setBlockedIPs] = useState<string[]>([])

  const fwColor = FW_COLORS[sys.system.firewallMode]

  return (
    <div className="min-h-screen bg-[#020b18] pt-6 pb-0">
      <div className="max-w-7xl mx-auto px-6">
        <Link to="/" className="inline-flex items-center gap-2 text-[11px] font-bold text-[#4a7a9b] hover:text-[#00d4ff] tracking-[0.1em] mb-8 transition-colors">
          <ChevronLeft className="w-4 h-4" /> 메인으로 돌아가기
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[9px] font-black tracking-[0.2em] text-[#ff2d55] bg-[#ff2d55]/10 px-2 py-1">SOL-02</span>
            <div className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse" />
            <span className="text-[10px] text-[#00ff88] font-bold tracking-[0.15em]">DEFENDING</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-2">
            사이버 <span className="text-[#ff2d55] glow-text">위협 탐지</span>
          </h1>
          <p className="text-sm text-[#4a7a9b]">AI 기반 침투 탐지 · 자동 격리 · 실시간 대응</p>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-1 space-y-4">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
              className="clip-corner bg-[#041526]/80 border border-[#ff2d55]/15 p-5">
              <div className="text-[10px] font-black tracking-[0.2em] text-[#ff2d55] uppercase mb-4">위협 위험도 지수</div>
              <ThreatMeter value={73} />
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
              className="clip-corner bg-[#041526]/80 border border-[#00d4ff]/10 p-5">
              <div className="text-[10px] font-black tracking-[0.2em] text-[#00d4ff] uppercase mb-3">네트워크 토폴로지</div>
              <NetworkTopology />
              <div className="flex items-center gap-4 mt-3 justify-center">
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#00d4ff]" /><span className="text-[9px] text-[#4a7a9b]">정상</span></div>
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#ff2d55]" /><span className="text-[9px] text-[#4a7a9b]">위협 감지</span></div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}
              className="clip-corner bg-[#041526]/80 border border-[#00d4ff]/10 p-5">
              <div className="text-[10px] font-black tracking-[0.2em] text-[#00d4ff] uppercase mb-4">방어 현황</div>
              {[
                { icon: Shield, label: '차단된 공격', value: '1,247', color: '#00ff88' },
                { icon: Eye, label: '모니터링 중', value: '34', color: '#ffcc00' },
                { icon: Server, label: '격리 파일', value: '8', color: '#c084fc' },
                { icon: Wifi, label: '차단 IP', value: '312', color: '#ff2d55' },
              ].map(({ icon: Icon, label, value, color }) => (
                <div key={label} className="flex items-center justify-between py-2 border-b border-[#0a3050]/50 last:border-0">
                  <div className="flex items-center gap-2">
                    <Icon className="w-3.5 h-3.5" style={{ color }} />
                    <span className="text-[11px] text-[#8ab8d4]">{label}</span>
                  </div>
                  <span className="text-[13px] font-black number-mono" style={{ color }}>{value}</span>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="xl:col-span-2 space-y-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
              className="grid grid-cols-3 gap-3">
              {[
                { label: '오늘 차단', value: '1,247', color: '#00ff88' },
                { label: '분석 중', value: '3', color: '#ffcc00' },
                { label: '평균 대응', value: '0.8s', color: '#00d4ff' },
              ].map(({ label, value, color }) => (
                <div key={label} className="clip-corner-sm bg-[#041526]/80 border border-[#00d4ff]/10 p-4 text-center">
                  <div className="text-2xl font-black number-mono mb-1" style={{ color }}>{value}</div>
                  <div className="text-[9px] text-[#4a7a9b]">{label}</div>
                </div>
              ))}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="clip-corner bg-[#041526]/80 border border-[#00d4ff]/10 p-5">
              <div className="flex items-center gap-2 mb-4">
                <Activity className="w-4 h-4 text-[#ff2d55]" />
                <span className="text-[10px] font-black tracking-[0.2em] text-[#00d4ff] uppercase">공격 탐지 로그</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-[10px]">
                  <thead>
                    <tr className="border-b border-[#0a3050]">
                      {['시각', '출발지 IP', '공격 유형', '대상', '상태', '위험도'].map((h) => (
                        <th key={h} className="text-left py-2 pr-3 text-[9px] font-black tracking-[0.1em] text-[#4a7a9b] uppercase">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {ATTACK_LOG.map((a, i) => (
                      <tr key={i} className="border-b border-[#0a3050]/40 hover:bg-[#ff2d55]/3">
                        <td className="py-2 pr-3 font-mono text-[#4a7a9b]">{a.time}</td>
                        <td className="py-2 pr-3 font-mono text-[#8ab8d4]">{a.src}</td>
                        <td className="py-2 pr-3 text-[#8ab8d4]">{a.type}</td>
                        <td className="py-2 pr-3 text-[#4a7a9b]">{a.target}</td>
                        <td className="py-2 pr-3">
                          <span className="text-[8px] font-black px-1.5 py-0.5" style={{ color: STATUS_COLORS[a.status], background: `${STATUS_COLORS[a.status]}15` }}>{a.status}</span>
                        </td>
                        <td className="py-2">
                          <span className="text-[8px] font-black" style={{ color: SEV_COLORS[a.severity] }}>{a.severity}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="clip-corner bg-[#041526]/80 border border-[#ff2d55]/15 p-5">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-4 h-4 text-[#ff2d55]" />
                <span className="text-[10px] font-black tracking-[0.2em] text-[#ff2d55] uppercase">AI 위협 대응 권고</span>
              </div>
              <div className="bg-[#020b18]/60 border border-[#0a3050] p-4 font-mono text-[11px] leading-relaxed text-[#8ab8d4]">
                <span className="text-[#ff2d55]">[CYBER-DEFENSE AI]</span> Zero-Day 탐지 — VPN Concentrator 즉시 격리 권고<br />
                <br />
                패턴 분류: CVE-2025-XXXX 계열 취약점 악용 시도 (신뢰도 88%). 공격자 IP 클러스터 분석 결과 APT 그룹 패턴과 94% 일치. 자동 방화벽 규칙 적용 완료.<br />
                <br />
                <span className="text-[#00ff88]">▶ 자동 조치:</span> 해당 IP /24 블록 차단, 패킷 덤프 저장, 보안관제센터 알림 전송<span className="cursor-blink">_</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Firewall mode control in-page */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          className="clip-corner bg-[#041526]/80 border border-[#00d4ff]/10 p-5 mt-4">
          <div className="flex items-center gap-2 mb-4">
            <Wifi className="w-4 h-4 text-[#ff2d55]" />
            <span className="text-[10px] font-black tracking-[0.2em] text-[#00d4ff] uppercase">방화벽 모드 직접 제어</span>
            <span className="ml-auto text-[10px] font-black px-2 py-0.5" style={{ color: fwColor, background: `${fwColor}15` }}>
              현재: {FW_LABELS[sys.system.firewallMode]}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-4">
            {(['MONITOR', 'BLOCK', 'AGGRESSIVE'] as const).map((mode) => {
              const c = FW_COLORS[mode]
              const active = sys.system.firewallMode === mode
              return (
                <button key={mode} onClick={() => sys.setFirewallMode(mode)}
                  className="py-3 text-[10px] font-black uppercase transition-all clip-corner-sm"
                  style={{ color: active ? '#020b18' : c, background: active ? c : `${c}12`, border: `1px solid ${c}${active ? '' : '40'}` }}>
                  {FW_LABELS[mode]}
                </button>
              )
            })}
          </div>

          {/* IP quick-block */}
          <div className="border-t border-[#0a3050] pt-4">
            <div className="text-[9px] font-black tracking-[0.15em] text-[#4a7a9b] uppercase mb-3">공격 IP 즉시 차단</div>
            <div className="space-y-1.5">
              {ATTACK_LOG.slice(0, 3).map((a) => (
                <div key={a.src} className="flex items-center justify-between p-2 border border-[#0a3050]">
                  <span className="text-[10px] font-mono text-[#8ab8d4]">{a.src}</span>
                  <span className="text-[9px] text-[#4a7a9b] mx-3">{a.type}</span>
                  {blockedIPs.includes(a.src) ? (
                    <span className="text-[9px] font-black text-[#ff2d55]">차단됨</span>
                  ) : (
                    <button onClick={() => setBlockConfirm({ ip: a.src })}
                      className="text-[9px] font-black text-[#ff2d55] border border-[#ff2d55]/30 px-2 py-1 hover:bg-[#ff2d55]/10 transition-all clip-corner-sm">
                      차단
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <SolControlBar moduleId="sol02">
        <div className="bg-[#020b18]/60 border border-[#0a3050] p-4 clip-corner-sm">
          <div className="text-[9px] font-black tracking-[0.15em] text-[#4a7a9b] uppercase mb-2">방화벽 모드</div>
          <div className="text-xl font-black" style={{ color: fwColor }}>{FW_LABELS[sys.system.firewallMode]}</div>
          <div className="text-[9px] text-[#4a7a9b] mt-1">{blockedIPs.length}개 IP 차단됨</div>
        </div>
      </SolControlBar>

      <ConfirmDialog
        open={!!blockConfirm}
        title={`IP 차단: ${blockConfirm?.ip}`}
        message={`${blockConfirm?.ip}를 방화벽에 즉시 추가합니다. 해당 IP에서의 모든 트래픽이 차단됩니다.`}
        danger
        confirmLabel="차단 실행"
        onConfirm={() => { setBlockedIPs((p) => [...p, blockConfirm!.ip]); setBlockConfirm(null) }}
        onCancel={() => setBlockConfirm(null)}
      />
    </div>
  )
}
