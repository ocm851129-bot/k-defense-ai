import { useRef, useEffect } from 'react'

// ── 위치 데이터 ───────────────────────────────────────────────────────────────

interface Loc {
  id: string; label: string
  lat: number; lon: number
  color: string; r: number; pulse: boolean
}

const LOCS: Loc[] = [
  { id: 'SEO', label: 'SEOUL',       lat: 37.5,  lon: 127.0,  color: '#00ff88', r: 5, pulse: true  },
  { id: 'PYO', label: 'PYONGYANG',   lat: 39.0,  lon: 125.7,  color: '#ff2d55', r: 6, pulse: true  },
  { id: 'BEI', label: 'BEIJING',     lat: 39.9,  lon: 116.4,  color: '#ffcc00', r: 4, pulse: true  },
  { id: 'MOS', label: 'MOSCOW',      lat: 55.7,  lon: 37.6,   color: '#ff6b35', r: 4, pulse: false },
  { id: 'WDC', label: 'WASHINGTON',  lat: 38.9,  lon: -77.0,  color: '#00d4ff', r: 4, pulse: false },
  { id: 'TOK', label: 'TOKYO',       lat: 35.7,  lon: 139.7,  color: '#00ff88', r: 3, pulse: false },
  { id: 'GUA', label: 'GUAM',        lat: 13.5,  lon: 144.8,  color: '#00d4ff', r: 3, pulse: false },
  { id: 'LON', label: 'LONDON',      lat: 51.5,  lon: -0.1,   color: '#00d4ff', r: 3, pulse: false },
  { id: 'SIN', label: 'SINGAPORE',   lat: 1.3,   lon: 103.8,  color: '#00ff88', r: 3, pulse: false },
  { id: 'SYD', label: 'SYDNEY',      lat: -33.9, lon: 151.2,  color: '#00ff88', r: 2, pulse: false },
  { id: 'DEL', label: 'NEW DELHI',   lat: 28.6,  lon: 77.2,   color: '#ffcc00', r: 3, pulse: false },
  { id: 'DKY', label: 'DONGCHANG-RI',lat: 40.0,  lon: 124.7,  color: '#ff2d55', r: 3, pulse: true  },
]

interface ArcDef {
  from: string; to: string
  color: string; speed: number; phase: number
}

const ARC_DEFS: ArcDef[] = [
  { from: 'PYO', to: 'SEO', color: '#ff2d55', speed: 0.00055, phase: 0.00 },
  { from: 'PYO', to: 'TOK', color: '#ff6b35', speed: 0.00040, phase: 0.30 },
  { from: 'PYO', to: 'GUA', color: '#ff6b35', speed: 0.00032, phase: 0.55 },
  { from: 'PYO', to: 'WDC', color: '#ff2d55', speed: 0.00025, phase: 0.72 },
  { from: 'DKY', to: 'SEO', color: '#ff2d55', speed: 0.00048, phase: 0.15 },
  { from: 'MOS', to: 'PYO', color: '#c084fc', speed: 0.00038, phase: 0.45 },
  { from: 'BEI', to: 'SEO', color: '#ffcc00', speed: 0.00042, phase: 0.62 },
]

// 대륙 윤곽 (위도/경도 클러스터)
const LAND_DOTS: [number, number][] = [
  // 한반도
  [38,125],[37,126],[36,127],[37,128],[39,124],[40,125],[41,126],[35,129],[34,128],
  // 일본
  [35,135],[35,137],[34,133],[33,131],[36,138],[38,140],[40,141],[43,141],[44,143],
  [31,131],[32,130],[26,128],
  // 중국 동부
  [40,116],[39,117],[38,115],[37,114],[36,114],[35,113],[34,112],[32,112],[30,114],
  [28,115],[26,113],[24,113],[22,113],[32,120],[33,120],[34,119],[35,117],[36,120],
  [38,117],[39,118],[40,119],[41,121],[42,122],[43,122],[44,123],[45,122],[46,125],
  [47,124],[48,123],[49,126],[50,128],[51,130],[45,128],[44,128],[43,126],
  // 중국 서부/북부
  [35,104],[36,103],[38,105],[40,107],[42,107],[43,108],[44,109],[46,108],[48,106],
  [50,100],[30,104],[28,104],[26,102],[24,102],[22,101],[20,100],
  // 러시아 극동
  [55,135],[57,137],[58,140],[59,143],[60,142],[61,141],[62,140],[63,143],
  [50,136],[51,136],[52,137],[53,138],[54,136],
  [48,135],[47,134],[46,133],[45,132],[44,131],
  // 몽골/시베리아
  [48,108],[50,108],[52,107],[54,106],[56,104],[58,102],[60,100],
  [50,94],[52,93],[54,92],[56,91],[58,90],[60,89],[62,88],[64,87],[66,86],
  // 동남아
  [20,100],[18,102],[16,103],[14,101],[12,100],[10,99],[8,98],[6,100],
  [14,108],[13,109],[12,108],[11,107],[10,106],[9,105],[8,104],
  [1,104],[3,101],[5,100],[7,99],[6,116],[5,115],[4,114],[3,113],
  // 인도
  [28,77],[25,82],[22,82],[20,82],[18,82],[15,80],[12,78],[10,78],[8,77],
  [24,72],[22,72],[20,72],[18,73],[15,74],[12,75],[25,87],[22,87],[20,86],[18,84],
  [20,76],[22,76],[25,76],[28,75],[30,74],[32,74],[34,74],
  // 중동
  [36,36],[34,36],[32,35],[30,34],[28,34],[24,38],[22,40],[20,42],[18,42],
  [36,38],[34,38],[32,38],[30,38],[28,38],[32,44],[30,44],[28,44],[26,44],[24,44],
  [36,44],[34,44],[36,50],[34,50],[32,50],[30,50],[28,52],[26,54],
  // 유럽 (간략)
  [50,14],[52,14],[54,14],[56,10],[58,8],[60,6],[62,8],[64,12],[66,14],
  [48,16],[46,14],[44,14],[42,12],[40,14],[38,15],[36,14],[38,22],[40,22],
  [42,22],[44,22],[46,22],[48,22],[50,22],[52,22],[54,22],
  [44,24],[46,24],[48,24],[50,24],[52,18],[54,18],[56,18],[48,18],[46,16],
  [52,4],[51,3],[50,3],[49,2],[48,2],[47,7],[46,7],[45,8],[44,8],[43,6],[42,4],
  [40,4],[38,2],[36,2],[36,0],[38,0],[40,0],[42,2],
  // 아프리카 (간략)
  [36,2],[34,4],[32,6],[30,8],[28,8],[26,8],[24,8],[22,8],[20,8],[18,8],
  [16,8],[14,8],[12,8],[10,8],[8,8],[6,8],[4,8],[2,8],[0,8],
  [2,10],[4,12],[6,14],[8,16],[10,18],[12,18],[14,18],[16,16],
  [-2,10],[-4,12],[-6,12],[-8,14],[-10,16],[-12,16],[-14,18],[-16,18],[-18,18],
  [-20,18],[-22,18],[-24,18],[-26,18],[-28,18],[-30,18],[-32,18],[-34,18],
  [0,30],[2,32],[4,32],[6,34],[8,36],[10,38],[12,40],[14,40],
  [-10,40],[-12,40],[-14,40],[-16,38],[-18,36],[-20,36],[-22,36],
  [30,32],[28,34],[26,34],[24,36],[22,38],[20,38],[18,38],[16,38],
  // 북아메리카 동부
  [40,-74],[42,-71],[44,-68],[46,-64],[48,-62],[50,-58],[52,-56],
  [38,-76],[36,-76],[34,-78],[32,-80],[30,-82],[28,-82],[26,-80],[24,-80],
  [44,-76],[46,-72],[48,-68],[50,-64],[52,-56],[54,-52],[56,-52],
  [38,-78],[40,-78],[42,-76],[44,-72],[46,-68],
  [44,-64],[46,-64],[48,-62],[50,-60],
  // 호주
  [-16,136],[-18,138],[-20,140],[-22,142],[-24,144],[-26,146],[-28,148],[-30,150],
  [-32,150],[-34,150],[-36,148],[-38,146],[-34,138],[-32,136],[-30,132],
  [-28,122],[-26,114],[-24,114],[-22,114],[-20,118],[-18,122],[-16,128],[-14,130],
  [-12,132],[-14,136],[-16,136],[-12,136],[-12,138],[-14,142],[-16,144],
]

// ── 헬퍼 ─────────────────────────────────────────────────────────────────────

function hexAlpha(hex: string, a: number) {
  const n = Math.round(a * 255)
  return hex + n.toString(16).padStart(2, '0')
}

function bezierPt(t: number, x0: number, y0: number, x1: number, y1: number, x2: number, y2: number) {
  const m = 1 - t
  return { x: m * m * x0 + 2 * m * t * x1 + t * t * x2, y: m * m * y0 + 2 * m * t * y1 + t * t * y2 }
}

// ── 메인 컴포넌트 ─────────────────────────────────────────────────────────────

export default function GlobeVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef    = useRef<number>(0)
  const stateRef  = useRef({
    rot: -130,           // 초기 회전: 동아시아 중심
    arcPhases: ARC_DEFS.map((a) => a.phase),
    lastTime: 0,
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    // DPI 대응
    const SIZE = 480
    const DPR  = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width  = SIZE * DPR
    canvas.height = SIZE * DPR
    canvas.style.width  = SIZE + 'px'
    canvas.style.height = SIZE + 'px'
    ctx.scale(DPR, DPR)

    const cx = SIZE / 2
    const cy = SIZE / 2
    const R  = SIZE * 0.37

    // ── 3D 투영 ──────────────────────────────────────────────────────────────

    function project(lat: number, lon: number) {
      const φ = (lat * Math.PI) / 180
      const λ = ((lon + stateRef.current.rot) * Math.PI) / 180
      const x =  Math.cos(φ) * Math.sin(λ)
      const y =  Math.sin(φ)
      const z =  Math.cos(φ) * Math.cos(λ)
      return { sx: cx + x * R, sy: cy - y * R, z, visible: z > -0.08 }
    }

    // ── 위도선·경도선 ─────────────────────────────────────────────────────────

    function drawGridLines() {
      // 위도선
      for (let lat = -75; lat <= 75; lat += 15) {
        ctx.beginPath()
        let first = true
        for (let lon = 0; lon <= 362; lon += 2) {
          const p = project(lat, lon)
          if (!p.visible) { first = true; continue }
          first ? (ctx.moveTo(p.sx, p.sy), (first = false)) : ctx.lineTo(p.sx, p.sy)
        }
        const isEq = lat === 0
        ctx.strokeStyle = isEq ? 'rgba(0,212,255,0.20)' : 'rgba(0,212,255,0.07)'
        ctx.lineWidth    = isEq ? 0.8 : 0.4
        ctx.stroke()
      }
      // 경도선
      for (let lon = 0; lon < 360; lon += 15) {
        ctx.beginPath()
        let first = true
        for (let lat = -88; lat <= 88; lat += 2) {
          const p = project(lat, lon)
          if (!p.visible) { first = true; continue }
          first ? (ctx.moveTo(p.sx, p.sy), (first = false)) : ctx.lineTo(p.sx, p.sy)
        }
        ctx.strokeStyle = 'rgba(0,212,255,0.07)'
        ctx.lineWidth    = 0.4
        ctx.stroke()
      }
    }

    // ── 대륙 점 ───────────────────────────────────────────────────────────────

    function drawLandDots() {
      for (const [lat, lon] of LAND_DOTS) {
        const p = project(lat, lon)
        if (!p.visible) continue
        const alpha = 0.15 + 0.25 * p.z
        ctx.beginPath()
        ctx.arc(p.sx, p.sy, 1.2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0,212,255,${alpha.toFixed(2)})`
        ctx.fill()
      }
    }

    // ── 궤도 링 ───────────────────────────────────────────────────────────────

    function drawOrbit(rMul: number, incDeg: number, phase: number, color: string) {
      const or  = R * rMul
      const inc = (incDeg * Math.PI) / 180
      const SEGS = 120

      for (let i = 0; i < SEGS; i++) {
        const θ1 = ((i / SEGS) * Math.PI * 2) + phase
        const θ2 = (((i + 1) / SEGS) * Math.PI * 2) + phase
        const z1  = Math.sin(θ1) * Math.sin(inc)
        const depth = (z1 + 1) / 2         // 0=뒤 1=앞
        const alpha = 0.08 + 0.22 * depth

        const x1 = cx + or * Math.cos(θ1)
        const y1 = cy - or * Math.sin(θ1) * Math.cos(inc)
        const x2 = cx + or * Math.cos(θ2)
        const y2 = cy - or * Math.sin(θ2) * Math.cos(inc)

        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.strokeStyle = hexAlpha(color, alpha)
        ctx.lineWidth = 1
        ctx.stroke()
      }

      // 위성 점
      const sx = cx + or * Math.cos(phase)
      const sy = cy - or * Math.sin(phase) * Math.cos(inc)
      ctx.save()
      ctx.shadowBlur  = 10
      ctx.shadowColor = color
      ctx.beginPath()
      ctx.arc(sx, sy, 2.5, 0, Math.PI * 2)
      ctx.fillStyle = color
      ctx.fill()
      ctx.restore()
    }

    // ── 아크 그리기 ───────────────────────────────────────────────────────────

    function drawArc(
      x1: number, y1: number, x2: number, y2: number,
      color: string, progress: number,
    ) {
      const mx  = (x1 + x2) / 2
      const my  = (y1 + y2) / 2
      const dx  = mx - cx
      const dy  = my - cy
      const dl  = Math.sqrt(dx * dx + dy * dy) || 1
      const chord = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
      const lift  = chord * 0.48
      const cpX   = mx + (dx / dl) * lift
      const cpY   = my + (dy / dl) * lift

      const STEPS = 80
      const pts = Array.from({ length: STEPS + 1 }, (_, i) =>
        bezierPt(i / STEPS, x1, y1, cpX, cpY, x2, y2),
      )
      const end = Math.max(1, Math.floor(STEPS * progress))

      // 트레일
      ctx.beginPath()
      ctx.moveTo(pts[0].x, pts[0].y)
      for (let i = 1; i <= end; i++) ctx.lineTo(pts[i].x, pts[i].y)

      const grad = ctx.createLinearGradient(x1, y1, pts[end].x, pts[end].y)
      grad.addColorStop(0,   hexAlpha(color, 0))
      grad.addColorStop(0.5, hexAlpha(color, 0.35))
      grad.addColorStop(1,   color)
      ctx.strokeStyle = grad
      ctx.lineWidth   = 1.6
      ctx.stroke()

      // 선두 파티클
      const tip = pts[end]
      ctx.save()
      ctx.shadowBlur  = 14
      ctx.shadowColor = color
      ctx.beginPath()
      ctx.arc(tip.x, tip.y, 3.5, 0, Math.PI * 2)
      ctx.fillStyle = color
      ctx.fill()
      // 작은 코어
      ctx.beginPath()
      ctx.arc(tip.x, tip.y, 1.5, 0, Math.PI * 2)
      ctx.fillStyle = '#ffffff'
      ctx.fill()
      ctx.restore()
    }

    // ── 위치 마커 ─────────────────────────────────────────────────────────────

    function drawMarkers(time: number) {
      for (const loc of LOCS) {
        const p = project(loc.lat, loc.lon)
        if (!p.visible) continue

        const pulseFactor = loc.pulse
          ? 1 + 0.5 * Math.sin(time * 0.003 + loc.lat)
          : 1

        // 바깥 링
        if (loc.pulse) {
          ctx.beginPath()
          ctx.arc(p.sx, p.sy, loc.r * 3.5 * pulseFactor, 0, Math.PI * 2)
          ctx.strokeStyle = hexAlpha(loc.color, 0.25)
          ctx.lineWidth   = 1
          ctx.stroke()

          ctx.beginPath()
          ctx.arc(p.sx, p.sy, loc.r * 2, 0, Math.PI * 2)
          ctx.strokeStyle = hexAlpha(loc.color, 0.4)
          ctx.lineWidth   = 0.8
          ctx.stroke()
        }

        // 메인 도트
        ctx.save()
        ctx.shadowBlur  = 16
        ctx.shadowColor = loc.color
        ctx.beginPath()
        ctx.arc(p.sx, p.sy, loc.r, 0, Math.PI * 2)
        ctx.fillStyle = loc.color
        ctx.fill()
        ctx.restore()

        // 코어
        ctx.beginPath()
        ctx.arc(p.sx, p.sy, loc.r * 0.45, 0, Math.PI * 2)
        ctx.fillStyle = '#ffffff'
        ctx.fill()

        // 레이블 (앞면 충분히 보일 때만)
        if (p.z > 0.25) {
          ctx.font      = `bold 8px "Courier New", monospace`
          ctx.fillStyle = hexAlpha(loc.color, 0.85)
          ctx.textAlign = 'left'
          ctx.fillText(loc.label, p.sx + loc.r + 4, p.sy + 3)
        }
      }
    }

    // ── HUD 오버레이 ──────────────────────────────────────────────────────────

    function drawHUD(time: number) {
      const blink = Math.sin(time * 0.002) > 0

      // 코너 브래킷
      const pad = 12
      const len = 18
      ctx.strokeStyle = 'rgba(0,212,255,0.4)'
      ctx.lineWidth   = 1.5
      const corners = [[pad,pad],[SIZE-pad,pad],[pad,SIZE-pad],[SIZE-pad,SIZE-pad]] as const
      for (const [x, y] of corners) {
        const sx = x === pad ? 1 : -1
        const sy = y === pad ? 1 : -1
        ctx.beginPath()
        ctx.moveTo(x + sx * len, y); ctx.lineTo(x, y); ctx.lineTo(x, y + sy * len)
        ctx.stroke()
      }

      // 상단 타이틀
      ctx.font      = 'bold 9px "Courier New", monospace'
      ctx.fillStyle = 'rgba(0,212,255,0.7)'
      ctx.textAlign = 'center'
      ctx.fillText('K-DEFENSE AI · GLOBAL THREAT MONITOR', cx, 24)

      // 라이브 배지
      if (blink) {
        ctx.beginPath()
        ctx.arc(pad + 6, SIZE - pad - 6, 3.5, 0, Math.PI * 2)
        ctx.fillStyle = '#ff2d55'
        ctx.fill()
      }
      ctx.font      = 'bold 8px "Courier New", monospace'
      ctx.fillStyle = 'rgba(255,45,85,0.8)'
      ctx.textAlign = 'left'
      ctx.fillText('● LIVE', pad + 14, SIZE - pad - 3)

      // 하단 좌표
      const rot = ((-stateRef.current.rot % 360) + 360) % 360
      ctx.font      = '8px "Courier New", monospace'
      ctx.fillStyle = 'rgba(0,212,255,0.45)'
      ctx.textAlign = 'right'
      ctx.fillText(`LON ${rot.toFixed(1)}°  LAT 35.0°N`, SIZE - pad, SIZE - pad - 3)

      // 스캔 라인
      const scanY = ((time * 0.05) % SIZE)
      const scanGrad = ctx.createLinearGradient(0, scanY - 40, 0, scanY + 40)
      scanGrad.addColorStop(0,   'rgba(0,212,255,0)')
      scanGrad.addColorStop(0.5, 'rgba(0,212,255,0.04)')
      scanGrad.addColorStop(1,   'rgba(0,212,255,0)')
      ctx.fillStyle = scanGrad
      ctx.fillRect(0, scanY - 40, SIZE, 80)
    }

    // ── 메인 렌더 루프 ────────────────────────────────────────────────────────

    function frame(time: number) {
      const s  = stateRef.current
      const dt = time - s.lastTime
      s.lastTime = time

      // 회전 속도: 약 4분에 1회전
      s.rot = (s.rot + dt * 0.006) % 360

      // 아크 위상 진행
      s.arcPhases = s.arcPhases.map((ph, i) => {
        const next = ph + ARC_DEFS[i].speed * dt
        return next >= 1 ? next - 1 : next
      })

      ctx.clearRect(0, 0, SIZE, SIZE)

      // 1. 글로브 베이스
      const bg = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.25, R * 0.05, cx, cy, R)
      bg.addColorStop(0, '#0d2c48')
      bg.addColorStop(0.55, '#071d30')
      bg.addColorStop(1, '#020b18')
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2)
      ctx.fillStyle = bg; ctx.fill()

      // 2. 대기권 글로우
      const atm = ctx.createRadialGradient(cx, cy, R * 0.88, cx, cy, R * 1.22)
      atm.addColorStop(0, 'rgba(0,212,255,0.22)')
      atm.addColorStop(0.4, 'rgba(0,212,255,0.08)')
      atm.addColorStop(1,   'rgba(0,212,255,0)')
      ctx.beginPath(); ctx.arc(cx, cy, R * 1.22, 0, Math.PI * 2)
      ctx.fillStyle = atm; ctx.fill()

      // 3. 글로브 클립 영역 안에 그리드·대륙
      ctx.save()
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.clip()
      drawGridLines()
      drawLandDots()
      ctx.restore()

      // 4. 글로브 테두리
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(0,212,255,0.38)'; ctx.lineWidth = 1.5; ctx.stroke()

      // 5. 궤도 링 (3개)
      drawOrbit(1.12,  22,  time * 0.00030, '#00d4ff')
      drawOrbit(1.22, -14, -time * 0.00022, '#c084fc')
      drawOrbit(1.07,  58,  time * 0.00018, '#00ff88')

      // 6. 아크
      for (let i = 0; i < ARC_DEFS.length; i++) {
        const arc  = ARC_DEFS[i]
        const from = LOCS.find((l) => l.id === arc.from)!
        const to   = LOCS.find((l) => l.id === arc.to)!
        const p1   = project(from.lat, from.lon)
        const p2   = project(to.lat,   to.lon)
        if (!p1.visible || !p2.visible) continue
        drawArc(p1.sx, p1.sy, p2.sx, p2.sy, arc.color, s.arcPhases[i])
      }

      // 7. 마커
      drawMarkers(time)

      // 8. HUD
      drawHUD(time)

      rafRef.current = requestAnimationFrame(frame)
    }

    rafRef.current = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ width: 480, height: 480, display: 'block' }}
    />
  )
}
