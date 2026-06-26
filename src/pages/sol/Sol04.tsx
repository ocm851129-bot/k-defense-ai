import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Radio, Zap, Activity, ChevronLeft, Cpu, BarChart2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import SolControlBar from '../../components/SolControlBar'
import { useSystem } from '../../contexts/SystemContext'
import Toggle from '../../components/ui/Toggle'

const SIGNAL_DATA = [
  { freq: '1.215 GHz', type: 'L-Band 레이더', source: '북부 방향', power: -42, classification: '지상 레이더', confidence: 91 },
  { freq: '9.3 GHz', type: 'X-Band 해상 레이더', source: '서해 해상', power: -58, classification: '해군 레이더', confidence: 87 },
  { freq: '2.4 GHz', type: 'Wi-Fi 스펙트럼', source: '민간 지역', power: -65, classification: '민간 통신', confidence: 99 },
  { freq: '420 MHz', type: 'UHF 통신', source: '북부 구역', power: -49, classification: '군 무선통신', confidence: 78 },
  { freq: '14.5 GHz', type: 'Ku-Band 위성', source: '정지궤도', power: -71, classification: '위성 데이터링크', confidence: 95 },
  { freq: '8.5 GHz', type: 'X-Band 미상', source: '북동 방향', power: -45, classification: '미분류 — 분석 중', confidence: 43 },
]

const COMM_INTERCEPTS = [
  { time: '14:53:11', freq: '420.125 MHz', encoded: true, duration: '4m 22s', pattern: 'UHF VOICE', anomaly: true },
  { time: '14:50:44', freq: '8.512 GHz', encoded: true, duration: '0.3s', pattern: 'BURST TX', anomaly: true },
  { time: '14:47:29', freq: '2.437 GHz', encoded: false, duration: '12m 5s', pattern: 'WIFI 802.11', anomaly: false },
  { time: '14:44:02', freq: '14.5 GHz', encoded: true, duration: '8m 11s', pattern: 'SAT UPLINK', anomaly: false },
  { time: '14:41:57', freq: '420.075 MHz', encoded: true, duration: '1m 48s', pattern: 'UHF VOICE', anomaly: true },
]

function SpectrumAnalyzer() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)
  const dataRef = useRef<number[]>(Array.from({ length: 120 }, () => Math.random() * 60 + 20))

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    const draw = () => {
      const W = canvas.width
      const H = canvas.height
      ctx.clearRect(0, 0, W, H)

      // Background
      ctx.fillStyle = '#020b18'
      ctx.fillRect(0, 0, W, H)

      // Grid lines
      ctx.strokeStyle = 'rgba(0,212,255,0.05)'
      ctx.lineWidth = 0.5
      for (let i = 0; i <= 10; i++) {
        ctx.beginPath(); ctx.moveTo(0, (H / 10) * i); ctx.lineTo(W, (H / 10) * i); ctx.stroke()
      }

      // Animate data
      dataRef.current = dataRef.current.map((v, i) => {
        const spike = [20, 35, 65, 90, 105].includes(i)
        const base = spike ? Math.random() * 30 + 50 : Math.random() * 20 + 10
        return v * 0.85 + base * 0.15
      })

      // Draw spectrum
      const grd = ctx.createLinearGradient(0, 0, 0, H)
      grd.addColorStop(0, 'rgba(0,212,255,0.8)')
      grd.addColorStop(1, 'rgba(0,212,255,0.1)')
      ctx.fillStyle = grd
      ctx.beginPath()
      ctx.moveTo(0, H)
      dataRef.current.forEach((v, i) => {
        const x = (i / 120) * W
        const y = H - (v / 100) * H * 0.85
        if (i === 0) ctx.lineTo(x, y); else ctx.lineTo(x, y)
      })
      ctx.lineTo(W, H)
      ctx.closePath()
      ctx.fill()

      // Spike labels
      ctx.font = '8px monospace'
      ctx.fillStyle = '#00d4ff'
      ;[
        { i: 20, label: '420M' },
        { i: 35, label: '1.2G' },
        { i: 65, label: '2.4G' },
        { i: 90, label: '8.5G' },
        { i: 105, label: '14.5G' },
      ].forEach(({ i, label }) => {
        const x = (i / 120) * W
        const y = H - (dataRef.current[i] / 100) * H * 0.85
        ctx.fillText(label, x - 12, y - 5)
      })

      animRef.current = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(animRef.current)
  }, [])

  return <canvas ref={canvasRef} width={600} height={150} className="w-full rounded" />
}

const FREQ_BANDS = ['L-Band (1~2GHz)', 'S-Band (2~4GHz)', 'C-Band (4~8GHz)', 'X-Band (8~12GHz)', 'Ku-Band (12~18GHz)', 'UHF (300~3000MHz)']

export default function Sol04() {
  const sys = useSystem()
  const [selected, setSelected] = useState<number | null>(null)
  const [activeBands, setActiveBands] = useState<Record<string, boolean>>(
    Object.fromEntries(FREQ_BANDS.map((b) => [b, true]))
  )
  const [recording, setRecording] = useState(sys.system.recordingActive)

  return (
    <div className="min-h-screen bg-[#020b18] pt-6 pb-0">
      <div className="max-w-7xl mx-auto px-6">
        <Link to="/" className="inline-flex items-center gap-2 text-[11px] font-bold text-[#4a7a9b] hover:text-[#00d4ff] tracking-[0.1em] mb-8 transition-colors">
          <ChevronLeft className="w-4 h-4" /> 메인으로 돌아가기
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[9px] font-black tracking-[0.2em] text-[#ffcc00] bg-[#ffcc00]/10 px-2 py-1">SOL-04</span>
            <div className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse" />
            <span className="text-[10px] text-[#00ff88] font-bold tracking-[0.15em]">LISTENING</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-2">
            신호 <span className="text-[#ffcc00] glow-text">인텔리전스 SIGINT</span>
          </h1>
          <p className="text-sm text-[#4a7a9b]">전자기 신호 분류 · 통신 패턴 분석 · 이상 신호 탐지</p>
        </motion.div>

        <div className="space-y-5">
          {/* Spectrum Analyzer */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="clip-corner bg-[#041526]/80 border border-[#00d4ff]/10 p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#ffcc00]" />
                <span className="text-[10px] font-black tracking-[0.2em] text-[#00d4ff] uppercase">실시간 스펙트럼 분석기</span>
                <div className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse" />
              </div>
              <div className="flex gap-4 text-[9px] text-[#4a7a9b] font-mono">
                <span>범위: 300MHz ~ 18GHz</span>
                <span>해상도: 10MHz</span>
              </div>
            </div>
            <SpectrumAnalyzer />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Signal Classification */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
              className="clip-corner bg-[#041526]/80 border border-[#00d4ff]/10 p-5">
              <div className="flex items-center gap-2 mb-4">
                <Cpu className="w-4 h-4 text-[#ffcc00]" />
                <span className="text-[10px] font-black tracking-[0.2em] text-[#00d4ff] uppercase">신호 분류 결과</span>
              </div>
              <div className="space-y-2">
                {SIGNAL_DATA.map((sig, i) => (
                  <div
                    key={i}
                    onClick={() => setSelected(selected === i ? null : i)}
                    className={`p-3 border cursor-pointer transition-all ${
                      selected === i ? 'border-[#ffcc00]/40 bg-[#ffcc00]/5' : 'border-[#0a3050] hover:border-[#00d4ff]/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-bold text-white font-mono">{sig.freq}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1 bg-[#0a3050] rounded-full overflow-hidden">
                          <div className="h-full bg-[#ffcc00] rounded-full" style={{ width: `${sig.confidence}%` }} />
                        </div>
                        <span className="text-[9px] font-mono text-[#ffcc00]">{sig.confidence}%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-[#4a7a9b]">{sig.type} · {sig.source}</span>
                      <span className={`text-[9px] font-bold ${sig.classification.includes('분석') ? 'text-[#ff6b35]' : 'text-[#8ab8d4]'}`}>
                        {sig.classification}
                      </span>
                    </div>
                    {selected === i && (
                      <div className="mt-2 pt-2 border-t border-[#0a3050] text-[9px] text-[#4a7a9b] font-mono">
                        전력: {sig.power} dBm · AI 분류 신뢰도: {sig.confidence}%
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Intercept Log */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="clip-corner bg-[#041526]/80 border border-[#00d4ff]/10 p-5">
              <div className="flex items-center gap-2 mb-4">
                <Radio className="w-4 h-4 text-[#ffcc00]" />
                <span className="text-[10px] font-black tracking-[0.2em] text-[#00d4ff] uppercase">통신 수신 로그</span>
              </div>
              <div className="space-y-2 mb-5">
                {COMM_INTERCEPTS.map((c, i) => (
                  <div key={i} className={`p-3 border ${c.anomaly ? 'border-[#ff6b35]/30 bg-[#ff6b35]/5' : 'border-[#0a3050]'}`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[9px] font-mono text-[#4a7a9b]">{c.time}</span>
                      <div className="flex items-center gap-1.5">
                        {c.anomaly && <Zap className="w-3 h-3 text-[#ff6b35]" />}
                        <span className={`text-[9px] font-black ${c.encoded ? 'text-[#ff6b35]' : 'text-[#00ff88]'}`}>
                          {c.encoded ? 'ENCRYPTED' : 'PLAIN'}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[10px] font-mono text-white">{c.freq}</span>
                      <span className="text-[10px] text-[#4a7a9b]">{c.pattern} · {c.duration}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[#0a3050]">
                {[
                  { icon: BarChart2, label: '수신 신호', value: '6', color: '#ffcc00' },
                  { icon: Zap, label: '이상 신호', value: '3', color: '#ff6b35' },
                  { icon: Radio, label: '암호화', value: '80%', color: '#c084fc' },
                ].map(({ icon: Icon, label, value, color }) => (
                  <div key={label} className="text-center">
                    <Icon className="w-4 h-4 mx-auto mb-1" style={{ color }} />
                    <div className="text-lg font-black number-mono" style={{ color }}>{value}</div>
                    <div className="text-[8px] text-[#4a7a9b]">{label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Frequency band controls */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          className="clip-corner bg-[#041526]/80 border border-[#00d4ff]/10 p-5 mt-4">
          <div className="flex items-center gap-2 mb-4">
            <Radio className="w-4 h-4 text-[#ffcc00]" />
            <span className="text-[10px] font-black tracking-[0.2em] text-[#00d4ff] uppercase">주파수 대역 필터</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {FREQ_BANDS.map((band) => (
              <div key={band} className="flex items-center justify-between p-2.5 border border-[#0a3050] clip-corner-sm">
                <span className="text-[9px] text-[#8ab8d4] font-mono">{band}</span>
                <Toggle checked={activeBands[band]} onChange={() => setActiveBands((p) => ({ ...p, [band]: !p[band] }))} color="#ffcc00" size="sm" />
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#0a3050]">
            <div>
              <span className="text-[10px] text-[#4a7a9b]">신호 녹음</span>
              <div className="text-[9px] text-[#2a4a5e]">{recording ? '녹음 중' : '중지됨'}</div>
            </div>
            <Toggle checked={recording} onChange={() => setRecording((r) => !r)} color="#ff6b35" />
          </div>
        </motion.div>
      </div>

      <SolControlBar moduleId="sol04">
        <div className="bg-[#020b18]/60 border border-[#0a3050] p-4 clip-corner-sm">
          <div className="text-[9px] font-black tracking-[0.15em] text-[#4a7a9b] uppercase mb-2">활성 대역</div>
          <div className="text-2xl font-black text-[#ffcc00] number-mono">
            {Object.values(activeBands).filter(Boolean).length}/{FREQ_BANDS.length}
          </div>
          <div className="text-[9px] text-[#4a7a9b] mt-1">{recording ? '● 녹음 중' : '■ 녹음 중지'}</div>
        </div>
      </SolControlBar>
    </div>
  )
}
