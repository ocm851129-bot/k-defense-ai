import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Eye, AlertTriangle, CheckCircle, ChevronLeft, Users, Truck, Target } from 'lucide-react'
import { Link } from 'react-router-dom'
import SolControlBar from '../../components/SolControlBar'
import { useSystem } from '../../contexts/SystemContext'

const CAMERA_FEEDS = [
  { id: 'CAM-01', loc: '경계 Gate-A', status: 'ACTIVE', detections: 2, alert: true },
  { id: 'CAM-02', loc: '북방 감시초소', status: 'ACTIVE', detections: 0, alert: false },
  { id: 'CAM-03', loc: '해안선 West-2', status: 'ACTIVE', detections: 1, alert: true },
  { id: 'CAM-04', loc: 'DMZ 관측소', status: 'RECORDING', detections: 0, alert: false },
  { id: 'CAM-05', loc: '드론 T-7 실시간', status: 'LIVE', detections: 3, alert: true },
  { id: 'CAM-06', loc: '적외선 IR-C9', status: 'ACTIVE', detections: 0, alert: false },
]

const DETECTIONS = [
  { time: '14:54:22', cam: 'CAM-05', type: '차량', subtype: '장갑차량', count: 3, confidence: 96, action: '추적 중' },
  { time: '14:53:47', cam: 'CAM-01', type: '인원', subtype: '무장 인원', count: 2, confidence: 88, action: '경보 발령' },
  { time: '14:51:19', cam: 'CAM-03', type: '선박', subtype: '소형 고속정', count: 1, confidence: 91, action: '해안경비 통보' },
  { time: '14:49:55', cam: 'CAM-01', type: '인원', subtype: '민간인 추정', count: 1, confidence: 72, action: '관찰 중' },
  { time: '14:47:33', cam: 'CAM-05', type: '항공기', subtype: 'UAV 소형', count: 1, confidence: 84, action: '경보 발령' },
]

const OBJECT_STATS = [
  { icon: Users, label: '인원 탐지', value: 3, color: '#ff6b35' },
  { icon: Truck, label: '차량 탐지', value: 4, color: '#ffcc00' },
  { icon: Target, label: '위협 알림', value: 3, color: '#ff2d55' },
  { icon: Eye, label: '활성 카메라', value: 6, color: '#00d4ff' },
]

function SimulatedVideoFeed({ id, alert }: { id: string; alert: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)
  const frameRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const W = canvas.width
    const H = canvas.height

    const draw = () => {
      frameRef.current++
      // Noise background
      const imgData = ctx.createImageData(W, H)
      for (let i = 0; i < imgData.data.length; i += 4) {
        const v = Math.floor(Math.random() * 15)
        imgData.data[i] = v
        imgData.data[i + 1] = v + 5
        imgData.data[i + 2] = v + 10
        imgData.data[i + 3] = 255
      }
      ctx.putImageData(imgData, 0, 0)

      // Grid overlay
      ctx.strokeStyle = 'rgba(0,212,255,0.08)'
      ctx.lineWidth = 0.5
      for (let x = 0; x < W; x += 20) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke() }
      for (let y = 0; y < H; y += 20) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke() }

      if (alert) {
        // Detection box
        const blink = Math.floor(frameRef.current / 15) % 2 === 0
        ctx.strokeStyle = blink ? '#ff2d55' : 'rgba(255,45,85,0.3)'
        ctx.lineWidth = 1.5
        ctx.strokeRect(30, 25, 45, 60)
        ctx.strokeStyle = blink ? '#ff2d55' : 'rgba(255,45,85,0.3)'
        ctx.font = '7px monospace'
        ctx.fillStyle = blink ? '#ff2d55' : 'rgba(255,45,85,0.5)'
        ctx.fillText('TARGET', 30, 22)
        ctx.fillText('96%', 60, 95)
      }

      // Scanline
      const scanY = (frameRef.current * 2) % H
      ctx.strokeStyle = 'rgba(0,212,255,0.15)'
      ctx.lineWidth = 1
      ctx.beginPath(); ctx.moveTo(0, scanY); ctx.lineTo(W, scanY); ctx.stroke()

      // Corner brackets
      ctx.strokeStyle = 'rgba(0,212,255,0.5)'
      ctx.lineWidth = 1
      const corners = [[0, 0], [W - 10, 0], [0, H - 10], [W - 10, H - 10]]
      corners.forEach(([cx, cy]) => {
        ctx.beginPath()
        ctx.moveTo(cx, cy + 8); ctx.lineTo(cx, cy); ctx.lineTo(cx + 8, cy); ctx.stroke()
      })

      ctx.font = '6px monospace'
      ctx.fillStyle = 'rgba(0,212,255,0.6)'
      ctx.fillText(id, 3, H - 3)
      ctx.fillText(new Date().toTimeString().slice(0, 8), W - 44, H - 3)

      animRef.current = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(animRef.current)
  }, [id, alert])

  return <canvas ref={canvasRef} width={120} height={90} className="w-full" />
}

export default function Sol05() {
  const sys = useSystem()
  const [activeTab, setActiveTab] = useState<'grid' | 'detections'>('grid')
  const [sensitivity, setSensitivity] = useState(70)

  return (
    <div className="min-h-screen bg-[#020b18] pt-6 pb-0">
      <div className="max-w-7xl mx-auto px-6">
        <Link to="/" className="inline-flex items-center gap-2 text-[11px] font-bold text-[#4a7a9b] hover:text-[#00d4ff] tracking-[0.1em] mb-8 transition-colors">
          <ChevronLeft className="w-4 h-4" /> 메인으로 돌아가기
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[9px] font-black tracking-[0.2em] text-[#ff6b35] bg-[#ff6b35]/10 px-2 py-1">SOL-05</span>
            <div className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse" />
            <span className="text-[10px] text-[#00ff88] font-bold tracking-[0.15em]">VISION ONLINE</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-2">
            광학 영상 <span className="text-[#ff6b35] glow-text">AI 분석</span>
          </h1>
          <p className="text-sm text-[#4a7a9b]">실시간 객체 탐지 · 행동 패턴 분석 · 자동 경보</p>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="grid grid-cols-4 gap-3 mb-6">
          {OBJECT_STATS.map(({ icon: Icon, label, value, color }) => (
            <div key={label} className="clip-corner-sm bg-[#041526]/80 border border-[#00d4ff]/10 p-4 text-center">
              <Icon className="w-4 h-4 mx-auto mb-2" style={{ color }} />
              <div className="text-2xl font-black number-mono" style={{ color }}>{value}</div>
              <div className="text-[9px] text-[#4a7a9b] mt-0.5">{label}</div>
            </div>
          ))}
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-4">
          {(['grid', 'detections'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-[10px] font-black tracking-[0.15em] uppercase transition-all ${
                activeTab === tab
                  ? 'bg-[#ff6b35] text-[#020b18]'
                  : 'border border-[#0a3050] text-[#4a7a9b] hover:border-[#ff6b35]/40 hover:text-[#ff6b35]'
              }`}
            >
              {tab === 'grid' ? '카메라 그리드' : '탐지 로그'}
            </button>
          ))}
        </div>

        {activeTab === 'grid' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {CAMERA_FEEDS.map((cam) => (
              <div key={cam.id}
                className={`clip-corner-sm bg-[#041526]/80 border p-3 ${cam.alert ? 'border-[#ff2d55]/30' : 'border-[#00d4ff]/10'}`}>
                <SimulatedVideoFeed id={cam.id} alert={cam.alert} />
                <div className="mt-2 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-bold text-white">{cam.id}</div>
                    <div className="text-[9px] text-[#4a7a9b]">{cam.loc}</div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={`text-[8px] font-black ${
                      cam.status === 'LIVE' ? 'text-[#ff2d55]' : cam.status === 'ACTIVE' ? 'text-[#00ff88]' : 'text-[#ffcc00]'
                    }`}>{cam.status}</span>
                    {cam.detections > 0 && (
                      <span className="text-[8px] text-[#ff6b35] font-bold">{cam.detections}건 탐지</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === 'detections' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="clip-corner bg-[#041526]/80 border border-[#00d4ff]/10 p-5">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-4 h-4 text-[#ff6b35]" />
              <span className="text-[10px] font-black tracking-[0.2em] text-[#00d4ff] uppercase">객체 탐지 로그</span>
            </div>
            <table className="w-full text-[11px]">
              <thead>
                <tr className="border-b border-[#0a3050]">
                  {['시각', '카메라', '유형', '세부', '수량', '신뢰도', '조치'].map((h) => (
                    <th key={h} className="text-left py-2 pr-3 text-[9px] font-black tracking-[0.1em] text-[#4a7a9b] uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {DETECTIONS.map((d, i) => (
                  <tr key={i} className="border-b border-[#0a3050]/40">
                    <td className="py-2.5 pr-3 font-mono text-[#4a7a9b]">{d.time}</td>
                    <td className="py-2.5 pr-3 text-[#00d4ff] font-mono">{d.cam}</td>
                    <td className="py-2.5 pr-3 text-[#8ab8d4]">{d.type}</td>
                    <td className="py-2.5 pr-3 text-[#8ab8d4]">{d.subtype}</td>
                    <td className="py-2.5 pr-3 text-center">
                      <span className="text-white font-black">{d.count}</span>
                    </td>
                    <td className="py-2.5 pr-3">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-1 bg-[#0a3050] rounded-full overflow-hidden">
                          <div className="h-full bg-[#ff6b35]" style={{ width: `${d.confidence}%` }} />
                        </div>
                        <span className="font-mono text-[#ff6b35]">{d.confidence}%</span>
                      </div>
                    </td>
                    <td className="py-2.5">
                      <span className="text-[9px] font-bold text-[#ffcc00]">{d.action}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}

        {/* AI Summary */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="mt-5 clip-corner bg-[#041526]/80 border border-[#ff6b35]/15 p-5">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="w-4 h-4 text-[#ff6b35]" />
            <span className="text-[10px] font-black tracking-[0.2em] text-[#ff6b35] uppercase">AI 영상 분석 요약</span>
          </div>
          <div className="bg-[#020b18]/60 border border-[#0a3050] p-4 font-mono text-[11px] leading-relaxed text-[#8ab8d4]">
            <span className="text-[#ff6b35]">[IMINT-AI v2.1]</span> 실시간 분석 중 — 6개 카메라 활성<br /><br />
            <span className="text-[#ff2d55]">▶ ALERT:</span> CAM-05 드론 T-7 — 구역 내 차량 3대 탐지. YOLO v9 모델 기반 장갑차량 유형 분류. 이전 12시간 이동 경로와 비교 분석 중.<br /><br />
            <span className="text-[#ffcc00]">▶ WARNING:</span> CAM-01 무장 인원 2명 접근. 행동 패턴 분석: 은폐 행동 66%, 정찰 행동 34% 추정. 경비 강화 권고.<span className="cursor-blink">_</span>
          </div>
        </motion.div>
      </div>

      <SolControlBar moduleId="sol05">
        <div className="bg-[#020b18]/60 border border-[#0a3050] p-4 clip-corner-sm">
          <div className="text-[9px] font-black tracking-[0.15em] text-[#4a7a9b] uppercase mb-2">감지 민감도</div>
          <input type="range" min={20} max={100} value={sensitivity}
            onChange={(e) => setSensitivity(Number(e.target.value))}
            className="w-full accent-[#ff6b35] mb-1" />
          <div className="text-[10px] font-black text-[#ff6b35]">{sensitivity}%</div>
        </div>
        <div className="bg-[#020b18]/60 border border-[#0a3050] p-4 clip-corner-sm">
          <div className="text-[9px] font-black tracking-[0.15em] text-[#4a7a9b] uppercase mb-2">녹화 상태</div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${sys.system.recordingActive ? 'bg-[#ff2d55] animate-pulse' : 'bg-[#2a4a5e]'}`} />
            <span className="text-[11px] font-black text-white">{sys.system.recordingActive ? '● REC' : '■ 중지'}</span>
          </div>
          <button onClick={sys.toggleRecording} className="mt-2 text-[9px] font-bold text-[#4a7a9b] hover:text-white transition-colors">
            {sys.system.recordingActive ? '녹화 중지' : '녹화 시작'}
          </button>
        </div>
      </SolControlBar>
    </div>
  )
}
