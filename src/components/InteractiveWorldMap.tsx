import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Shield, Lock, Globe, Radio, Eye, Cpu, Zap, AlertTriangle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useSystem } from '../contexts/SystemContext'

// ── 메르카토르 투영 ─────────────────────────────────────────────────────────
const W = 1000, H = 480
const project = (lat: number, lon: number) => ({
  x: ((lon + 180) / 360) * W,
  y: ((90 - lat) / 180) * H,
})

// ── 육지 점 데이터 (lat, lon) ───────────────────────────────────────────────
const LAND_DOTS: [number, number][] = [
  // 한반도
  [37,126],[37,127],[37,128],[36,127],[36,128],[35,129],[34,128],[35,127],
  [38,125],[38,126],[39,125],[39,126],[40,124],[40,125],[41,125],[41,126],
  // 일본
  [36,138],[36,137],[35,137],[35,136],[35,135],[34,134],[33,131],[32,130],
  [31,131],[33,132],[34,133],[36,136],[37,137],[38,140],[39,141],[40,141],
  [41,141],[42,142],[43,141],[44,143],[43,144],[26,128],[26,127],[27,128],
  // 중국
  [40,116],[39,117],[38,115],[37,114],[36,114],[35,113],[34,112],[32,112],
  [30,114],[28,115],[26,113],[24,113],[22,113],[32,120],[33,120],[34,119],
  [35,117],[36,120],[38,117],[39,118],[40,119],[41,121],[42,122],[43,122],
  [44,123],[45,122],[46,125],[47,124],[48,123],[49,126],[50,128],[45,128],
  [44,128],[43,126],[35,104],[36,103],[38,105],[40,107],[42,107],[43,108],
  [44,109],[46,108],[48,106],[50,100],[30,104],[28,104],[26,102],[24,102],
  [22,101],[20,100],[22,108],[24,108],[26,106],[28,107],[30,107],[32,109],
  [34,108],[36,108],[38,106],[40,108],[24,116],[22,111],[20,109],[28,113],
  // 러시아 극동
  [55,135],[57,137],[58,140],[59,143],[60,142],[61,141],[62,140],[63,143],
  [50,136],[51,136],[52,137],[53,138],[54,136],[48,135],[47,134],[46,133],
  [45,132],[44,131],[50,140],[52,141],[54,142],[56,138],[60,150],[62,152],
  [64,158],[62,160],[60,162],[58,160],[56,158],[54,156],[52,154],[50,152],
  // 러시아 유럽
  [55,37],[56,37],[57,35],[58,34],[59,30],[60,30],[61,28],[62,28],
  [63,30],[64,40],[65,45],[66,50],[65,55],[64,60],[63,62],[62,65],
  [60,60],[58,58],[56,58],[54,55],[52,53],[50,50],[50,45],[52,45],
  [54,48],[56,48],[58,50],[60,50],[62,50],[64,52],[55,73],[56,75],
  [57,72],[58,70],[59,68],[60,65],[62,60],[64,57],[65,60],[66,62],
  [67,64],[68,67],[69,68],[70,68],[68,60],[66,55],[64,55],[62,55],
  // 몽골
  [46,100],[47,102],[48,104],[47,106],[46,108],[45,108],[44,106],[44,104],
  [45,100],[46,96],[48,98],[50,96],[48,92],[46,92],[44,92],[44,96],
  // 중앙아시아
  [42,70],[44,72],[46,74],[48,76],[50,78],[48,80],[46,80],[44,78],
  [42,72],[40,68],[38,66],[40,64],[42,62],[44,60],[46,62],[48,64],
  // 인도
  [28,77],[26,80],[24,82],[22,80],[20,78],[18,76],[16,74],[14,74],
  [12,77],[10,78],[8,77],[14,78],[16,80],[18,78],[20,76],[22,72],
  [24,72],[26,74],[28,72],[30,74],[32,74],[28,75],[26,76],[24,74],
  // 인도차이나/동남아
  [20,100],[18,100],[16,100],[14,99],[12,99],[10,99],[8,100],[10,100],
  [12,101],[14,101],[16,102],[18,104],[20,102],[22,104],[22,106],[20,106],
  [18,106],[16,108],[14,108],[12,108],[10,107],[12,104],[14,104],[16,104],
  // 인도네시아
  [0,108],[0,110],[0,112],[-2,110],[-2,112],[-2,114],[-4,114],[-4,116],
  [-6,107],[-6,108],[-6,110],[-6,112],[2,110],[2,112],[4,114],[4,116],
  // 중동
  [35,36],[34,36],[32,36],[30,34],[28,34],[26,36],[24,38],[22,40],
  [24,42],[26,44],[28,46],[30,48],[32,46],[34,42],[36,40],[38,40],
  [36,36],[34,38],[32,44],[30,50],[28,48],[24,56],[22,58],[20,58],
  [18,56],[20,60],[22,60],[24,58],[36,54],[34,50],[32,48],[30,52],
  // 아프리카
  [36,8],[34,8],[32,10],[30,10],[28,12],[26,14],[24,14],[22,14],
  [20,14],[18,14],[16,12],[14,12],[12,14],[10,14],[8,14],[6,14],
  [4,12],[2,12],[0,10],[-2,10],[-4,12],[-6,12],[-8,14],[-10,16],
  [-12,16],[-14,14],[-16,14],[-18,14],[-20,16],[-22,18],[-24,18],
  [-26,20],[-28,20],[-30,20],[-32,20],[-34,20],[-34,22],[-32,24],
  [-30,26],[-28,28],[-26,28],[-24,26],[-22,26],[-20,24],[-18,24],
  [-16,22],[-14,22],[-12,20],[-10,20],[-8,20],[-6,20],[-4,18],
  [-2,18],[0,16],[2,16],[4,18],[6,18],[8,18],[10,20],[12,20],
  [14,22],[16,22],[18,22],[20,22],[22,22],[24,24],[26,24],[28,26],
  [30,28],[32,28],[34,30],[36,28],[8,4],[6,4],[4,4],[2,4],
  [0,8],[2,8],[4,8],[6,8],[8,8],[10,8],[12,8],[14,10],
  [0,20],[2,20],[4,22],[6,22],[8,22],[10,22],[12,22],[14,20],
  [36,14],[34,14],[32,14],[30,16],[28,16],[26,16],[24,16],[22,16],
  // 유럽
  [48,18],[50,18],[52,18],[54,18],[52,20],[50,20],[48,20],[46,18],
  [44,18],[42,18],[40,18],[48,16],[50,14],[52,14],[54,14],[56,14],
  [58,16],[60,18],[62,22],[60,24],[58,26],[56,22],[54,20],[52,22],
  [50,22],[48,22],[46,20],[44,20],[42,20],[40,20],[40,22],[42,24],
  [44,24],[46,24],[48,24],[50,24],[52,24],[54,22],[56,24],[58,22],
  [56,28],[54,28],[52,26],[50,26],[48,26],[46,26],[44,26],[42,26],
  [42,28],[44,28],[46,28],[48,28],[44,22],[42,22],[40,24],[38,26],
  [38,22],[38,24],[36,14],[36,6],[44,6],[46,6],[48,6],[50,6],
  [52,8],[54,10],[56,10],[58,10],[60,10],[62,10],[64,12],[66,14],
  [68,16],[70,20],[68,22],[66,18],[64,18],[62,18],[60,16],[58,14],
  [56,16],[54,16],[52,12],[50,10],[48,10],[46,10],[44,10],[42,10],
  [40,10],[42,12],[44,12],[46,12],[48,12],[50,12],[52,10],[54,12],
  [56,12],[58,12],[38,16],[40,16],[42,16],[44,14],[46,14],[48,14],
  // 북미
  [48,-90],[50,-90],[52,-90],[54,-90],[56,-88],[58,-86],[60,-84],
  [62,-82],[64,-80],[66,-78],[68,-76],[66,-74],[64,-76],[62,-78],
  [60,-80],[58,-78],[56,-76],[54,-76],[52,-78],[50,-78],[48,-78],
  [46,-76],[44,-76],[42,-78],[40,-76],[38,-76],[36,-76],[34,-76],
  [32,-80],[30,-82],[28,-82],[26,-80],[24,-80],[30,-88],[32,-88],
  [34,-88],[36,-88],[38,-90],[40,-90],[42,-90],[44,-90],[46,-92],
  [48,-92],[50,-94],[52,-96],[54,-98],[56,-100],[58,-102],[60,-104],
  [48,-94],[46,-94],[44,-92],[42,-92],[40,-92],[38,-92],[36,-92],
  [34,-92],[32,-92],[30,-92],[28,-90],[34,-94],[36,-96],[38,-98],
  [40,-98],[42,-98],[44,-98],[46,-98],[48,-98],[50,-100],[52,-102],
  [44,-100],[42,-100],[40,-100],[38,-100],[36,-100],[34,-100],[32,-100],
  [44,-104],[42,-104],[40,-104],[38,-106],[36,-106],[34,-106],[32,-106],
  [44,-108],[42,-108],[40,-108],[38,-108],[36,-108],[34,-108],[44,-112],
  [42,-112],[40,-112],[38,-112],[36,-110],[46,-122],[48,-122],[50,-120],
  [52,-118],[50,-124],[48,-124],[46,-124],[44,-124],[42,-124],[40,-124],
  [46,-120],[44,-120],[42,-120],[40,-120],[44,-116],[42,-116],[40,-116],
  [44,-118],[42,-118],[40,-118],[50,-96],[52,-94],[54,-96],[56,-92],
  [60,-96],[62,-94],[64,-96],[62,-110],[60,-110],[58,-110],[56,-110],
  [54,-110],[60,-130],[58,-130],[56,-130],[54,-126],[52,-126],[50,-126],
  [58,-134],[56,-134],[54,-132],[52,-130],[60,-140],[58,-138],[56,-136],
  [62,-140],[60,-136],[58,-136],[62,-144],[62,-150],[60,-150],[58,-152],
  [60,-148],[62,-148],[64,-150],[64,-148],[64,-146],[64,-144],[64,-142],
  [64,-162],[62,-165],[60,-162],[58,-158],[56,-158],[54,-158],[52,-156],
  [50,-130],[48,-126],[66,-160],[68,-162],[70,-160],[68,-156],[70,-148],
  [70,-152],[70,-146],[70,-142],[70,-138],[70,-134],[70,-130],[68,-130],
  [66,-140],[68,-140],[66,-150],[68,-150],[70,-126],[70,-122],[70,-118],
  [70,-114],[70,-110],[70,-106],[70,-100],[70,-94],[70,-88],[70,-82],
  [72,-80],[74,-76],[72,-90],[72,-100],[72,-110],[72,-120],[72,-130],
  [72,-140],[74,-90],[74,-100],[74,-110],[74,-120],[74,-130],[68,-85],
  // 멕시코/중앙아메리카
  [30,-110],[28,-110],[26,-110],[24,-108],[22,-106],[20,-105],[18,-95],
  [16,-92],[14,-90],[12,-86],[10,-84],[18,-98],[20,-100],[22,-102],[24,-104],
  // 남미
  [10,-72],[8,-72],[6,-72],[4,-74],[2,-74],[0,-76],[-2,-78],[-4,-80],
  [-6,-80],[-8,-78],[-10,-76],[-12,-76],[-14,-76],[-16,-74],[-18,-70],
  [-20,-70],[-22,-68],[-24,-66],[-26,-66],[-28,-68],[-30,-70],[-32,-72],
  [-34,-72],[-36,-72],[-38,-72],[-40,-72],[-42,-72],[-44,-72],[-46,-72],
  [-48,-72],[-50,-72],[-52,-70],[-54,-68],[-56,-68],[-58,-66],[-56,-66],
  [0,-60],[-2,-60],[-4,-60],[-6,-60],[-8,-60],[-10,-60],[-12,-58],
  [-14,-56],[-16,-56],[-18,-56],[-20,-56],[-22,-52],[-24,-50],[-10,-52],
  [-8,-52],[-6,-50],[-4,-48],[-2,-50],[-12,-64],[-10,-64],[-8,-62],
  [2,-60],[4,-60],[6,-60],[8,-64],[10,-66],[8,-62],[6,-62],[4,-62],
  [2,-62],[0,-64],[2,-66],[4,-66],[6,-66],[8,-68],[10,-70],[8,-70],
  [6,-68],[4,-68],[2,-68],[0,-68],[-2,-68],[-4,-68],[-6,-66],[-8,-66],
  [-10,-66],[-12,-66],[-14,-66],[-16,-66],[-18,-66],[-20,-66],[-22,-64],
  [-24,-62],[-26,-62],[-28,-62],[-30,-62],[-32,-64],[-34,-64],[-36,-64],
  [-38,-64],[-40,-64],[-4,-42],[-6,-42],[-8,-40],[-10,-40],[-12,-40],
  [-14,-42],[-16,-42],[-18,-44],[-20,-42],[-22,-44],[-24,-46],
  // 호주
  [-24,114],[-24,116],[-24,118],[-24,120],[-24,122],[-24,124],
  [-26,114],[-26,116],[-26,118],[-26,120],[-26,122],[-26,124],[-26,126],
  [-28,114],[-28,116],[-28,118],[-28,120],[-28,122],[-28,124],[-28,126],
  [-28,128],[-28,130],[-30,116],[-30,118],[-30,120],[-30,122],[-30,124],
  [-30,126],[-30,128],[-30,130],[-32,116],[-32,118],[-32,120],[-32,122],
  [-32,124],[-32,126],[-32,128],[-32,130],[-32,132],[-32,134],[-32,136],
  [-34,118],[-34,120],[-34,122],[-34,138],[-34,140],[-36,136],[-36,138],
  [-36,140],[-36,142],[-36,144],[-36,146],[-36,148],[-38,140],[-38,142],
  [-38,144],[-38,146],[-38,148],[-40,144],[-40,146],[-40,148],[-42,144],
  [-42,146],[-42,148],[-20,134],[-20,136],[-20,138],[-22,134],[-22,136],
  [-22,138],[-22,140],[-24,134],[-24,136],[-24,138],[-24,140],[-24,142],
  [-26,132],[-26,134],[-26,136],[-26,138],[-26,140],[-26,142],[-26,144],
  [-28,132],[-28,134],[-28,136],[-28,138],[-28,140],[-28,142],[-28,144],
  [-28,146],[-30,132],[-30,134],[-30,136],[-30,138],[-30,140],[-30,142],
  [-30,144],[-30,146],[-30,148],[-14,132],[-14,134],[-16,132],[-16,134],
  [-16,136],[-18,130],[-18,132],[-18,134],[-18,136],[-18,138],[-20,130],
  [-20,132],[-12,136],[-12,134],[-12,132],[-14,136],
  // 뉴질랜드
  [-36,174],[-38,175],[-40,175],[-42,172],[-44,170],[-46,168],
  // 영국/아이슬란드/스칸디나비아
  [56,-6],[57,-4],[58,-3],[57,-2],[56,-2],[55,-2],[54,-2],[53,-2],
  [52,-2],[51,-1],[51,0],[52,1],[53,1],[54,0],[64,-22],[65,-20],[66,-18],
  [65,-16],[64,-14],[63,-20],[64,-18],[65,-14],[66,-22],
  [58,6],[58,8],[58,10],[59,6],[59,8],[59,10],[60,6],[60,8],[60,10],
  [61,6],[61,8],[61,10],[62,6],[62,8],[62,10],[63,8],[63,10],[63,12],
  [64,14],[65,14],[65,16],[66,16],[67,16],[68,18],[69,18],[70,24],[70,28],
]

// ── 도시 목록 ──────────────────────────────────────────────────────────────
const CITIES = [
  { label:'SEOUL',      lat:37.5,  lon:127.0,  color:'#00ff88', r:3.5, key:true  },
  { label:'PYONGYANG',  lat:39.0,  lon:125.7,  color:'#ff2d55', r:3.5, key:true  },
  { label:'BEIJING',    lat:39.9,  lon:116.4,  color:'#ffcc00', r:3,   key:true  },
  { label:'TOKYO',      lat:35.7,  lon:139.7,  color:'#00d4ff', r:3,   key:true  },
  { label:'WASHINGTON', lat:38.9,  lon:-77.1,  color:'#00d4ff', r:3,   key:true  },
  { label:'MOSCOW',     lat:55.7,  lon:37.6,   color:'#ff6b35', r:3,   key:true  },
  { label:'TEHRAN',     lat:35.7,  lon:51.4,   color:'#ff6b35', r:2.5, key:false },
  { label:'LONDON',     lat:51.5,  lon:-0.1,   color:'#8ab8d4', r:2.5, key:false },
  { label:'BERLIN',     lat:52.5,  lon:13.4,   color:'#8ab8d4', r:2,   key:false },
  { label:'NEW DELHI',  lat:28.6,  lon:77.2,   color:'#8ab8d4', r:2.5, key:false },
  { label:'SINGAPORE',  lat:1.3,   lon:103.8,  color:'#00ff88', r:2,   key:false },
  { label:'TAIPEI',     lat:25.0,  lon:121.5,  color:'#00d4ff', r:2,   key:false },
  { label:'GUAM',       lat:13.5,  lon:144.8,  color:'#00d4ff', r:2,   key:false },
  { label:'VLADIVOSTOK',lat:43.1,  lon:131.9,  color:'#ff6b35', r:2,   key:false },
  { label:'DONGCHANG-RI',lat:40.0, lon:124.7,  color:'#ff2d55', r:2.5, key:true  },
]

// ── 어택 아크 ──────────────────────────────────────────────────────────────
const ARCS = [
  { from:{lat:39.0,lon:125.7}, to:{lat:37.5,lon:127.0},  color:'#ff2d55', speed:0.8 },
  { from:{lat:39.0,lon:125.7}, to:{lat:35.7,lon:139.7},  color:'#ff6b35', speed:0.6 },
  { from:{lat:39.0,lon:125.7}, to:{lat:13.5,lon:144.8},  color:'#ff2d55', speed:0.45 },
  { from:{lat:40.0,lon:116.4}, to:{lat:37.5,lon:127.0},  color:'#ffcc00', speed:0.7 },
  { from:{lat:55.7,lon:37.6},  to:{lat:50.0,lon:28.0},   color:'#c084fc', speed:0.5 },
  { from:{lat:35.7,lon:51.4},  to:{lat:32.0,lon:35.0},   color:'#ff6b35', speed:0.6 },
  { from:{lat:40.0,lon:124.7}, to:{lat:37.5,lon:127.0},  color:'#ff2d55', speed:1.0 },
]

// ── 위협 지역 ──────────────────────────────────────────────────────────────
const SOL_META = {
  'SOL-01': { label:'전장 AI',   color:'#00d4ff', icon:Shield, href:'/sol/01' },
  'SOL-02': { label:'사이버',    color:'#ff2d55', icon:Lock,   href:'/sol/02' },
  'SOL-03': { label:'GEOINT',   color:'#00ff88', icon:Globe,  href:'/sol/03' },
  'SOL-04': { label:'SIGINT',   color:'#ffcc00', icon:Radio,  href:'/sol/04' },
  'SOL-05': { label:'IMINT',    color:'#ff6b35', icon:Eye,    href:'/sol/05' },
  'SOL-06': { label:'의사결정', color:'#c084fc', icon:Cpu,   href:'/sol/06' },
} as const

const REGIONS = [
  { id:'EAST_ASIA',      label:'동아시아',   labelEn:'EAST ASIA',       threat:'CRITICAL' as const, color:'#ff2d55', center:{lat:37.5,lon:127},  zoom:{lat1:28,lon1:110,lat2:48,lon2:148},
    activeSols:['SOL-01','SOL-03','SOL-04','SOL-05'] as const,
    events:['이동식 발사대 탐지 (A-7구역)','사리원 차량 집결 +340%','UHF 이상 신호 포착','드론 무리 DMZ 접근 확인'] },
  { id:'MIDDLE_EAST',    label:'중동',        labelEn:'MIDDLE EAST',     threat:'HIGH' as const,     color:'#ff6b35', center:{lat:30,lon:45},   zoom:{lat1:12,lon1:32,lat2:42,lon2:68},
    activeSols:['SOL-02','SOL-04','SOL-06'] as const,
    events:['사이버 공격 페이로드 탐지','UAS 위협 급증 보고','비대칭 전력 집결'] },
  { id:'EAST_EUROPE',    label:'동유럽',      labelEn:'EAST EUROPE',     threat:'HIGH' as const,     color:'#ff6b35', center:{lat:50,lon:28},   zoom:{lat1:42,lon1:14,lat2:60,lon2:42},
    activeSols:['SOL-02','SOL-04'] as const,
    events:['사이버 인프라 공격 지속','전자전 활동 증가','위성 재밍 시도'] },
  { id:'SOUTH_CHINA_SEA',label:'남중국해',    labelEn:'SOUTH CHINA SEA', threat:'HIGH' as const,     color:'#ff6b35', center:{lat:12,lon:114},  zoom:{lat1:2,lon1:100,lat2:25,lon2:128},
    activeSols:['SOL-01','SOL-03'] as const,
    events:['항모전단 기동 탐지','대함미사일 훈련 관측','영해 침범 선박 식별'] },
  { id:'CYBER',          label:'사이버공간',  labelEn:'CYBERSPACE',      threat:'CRITICAL' as const, color:'#ff2d55', center:{lat:52,lon:0},    zoom:{lat1:45,lon1:-10,lat2:60,lon2:15},
    activeSols:['SOL-02','SOL-06'] as const,
    events:['국방망 침투 시도 1,247건/일','APT 그룹 활동 급증','AI 기반 피싱 캠페인 탐지'] },
]

const LEVEL_COLORS = { CRITICAL:'#ff2d55', HIGH:'#ff6b35', MED:'#ffcc00', LOW:'#00ff88' }

// ── 캔버스 렌더러 ──────────────────────────────────────────────────────────
function useMapCanvas(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const frameRef = useRef(0)
  const particlesRef = useRef(ARCS.map(() => ({ t: Math.random() })))

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let stopped = false

    const arcBezier = (from: {lat:number,lon:number}, to: {lat:number,lon:number}) => {
      const p1 = project(from.lat, from.lon)
      const p2 = project(to.lat, to.lon)
      const mx = (p1.x + p2.x) / 2
      const my = (p1.y + p2.y) / 2 - 50
      return { p1, p2, cp: { x: mx, y: my } }
    }
    const bezierPoint = (p1: {x:number,y:number}, cp: {x:number,y:number}, p2: {x:number,y:number}, t: number) => ({
      x: (1-t)**2 * p1.x + 2*(1-t)*t * cp.x + t**2 * p2.x,
      y: (1-t)**2 * p1.y + 2*(1-t)*t * cp.y + t**2 * p2.y,
    })

    const draw = () => {
      if (stopped) return
      const W2 = canvas.width, H2 = canvas.height
      const sx = W2 / W, sy = H2 / H

      // Background
      ctx.fillStyle = '#020b18'
      ctx.fillRect(0, 0, W2, H2)

      // Ocean gradient
      const grad = ctx.createRadialGradient(W2*0.73, H2*0.33, 0, W2*0.5, H2*0.5, W2*0.7)
      grad.addColorStop(0, 'rgba(0,40,80,0.25)')
      grad.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, W2, H2)

      // Graticule lines (30° intervals)
      ctx.strokeStyle = 'rgba(0,212,255,0.06)'
      ctx.lineWidth = 0.5
      for (let lon = -180; lon <= 180; lon += 30) {
        const x = ((lon + 180) / 360) * W2
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H2); ctx.stroke()
      }
      for (let lat = -90; lat <= 90; lat += 30) {
        const y = ((90 - lat) / 180) * H2
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W2, y); ctx.stroke()
      }
      // Equator highlight
      const eqY = (90 / 180) * H2
      ctx.strokeStyle = 'rgba(0,212,255,0.12)'
      ctx.lineWidth = 0.8
      ctx.beginPath(); ctx.moveTo(0, eqY); ctx.lineTo(W2, eqY); ctx.stroke()

      // Land dots
      LAND_DOTS.forEach(([lat, lon]) => {
        const px = ((lon + 180) / 360) * W2
        const py = ((90 - lat) / 180) * H2
        ctx.fillStyle = 'rgba(20,80,130,0.9)'
        ctx.fillRect(px - 1, py - 1, 3.5 * sx, 3.5 * sy)
      })

      // Korea highlight glow
      const koreaPos = project(37.5, 127)
      const gk = ctx.createRadialGradient(koreaPos.x*sx, koreaPos.y*sy, 0, koreaPos.x*sx, koreaPos.y*sy, 60*sx)
      gk.addColorStop(0, 'rgba(255,45,85,0.12)')
      gk.addColorStop(1, 'rgba(255,45,85,0)')
      ctx.fillStyle = gk
      ctx.fillRect(0, 0, W2, H2)

      // Attack arcs + animated particles
      frameRef.current++
      particlesRef.current = particlesRef.current.map((p, i) => {
        const arc = ARCS[i]
        const newT = (p.t + arc.speed * 0.004) % 1
        return { t: newT }
      })

      ARCS.forEach((arc, i) => {
        const { p1, p2, cp } = arcBezier(arc.from, arc.to)
        // Draw arc path
        ctx.beginPath()
        ctx.moveTo(p1.x * sx, p1.y * sy)
        ctx.quadraticCurveTo(cp.x * sx, cp.y * sy, p2.x * sx, p2.y * sy)
        ctx.strokeStyle = arc.color + '40'
        ctx.lineWidth = 0.8
        ctx.setLineDash([4, 4])
        ctx.stroke()
        ctx.setLineDash([])

        // Animated dot
        const pt = bezierPoint(
          { x: p1.x * sx, y: p1.y * sy },
          { x: cp.x * sx, y: cp.y * sy },
          { x: p2.x * sx, y: p2.y * sy },
          particlesRef.current[i].t,
        )
        ctx.beginPath()
        ctx.arc(pt.x, pt.y, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = arc.color
        ctx.shadowBlur = 8
        ctx.shadowColor = arc.color
        ctx.fill()
        ctx.shadowBlur = 0
      })

      // Cities
      CITIES.forEach(city => {
        const p = project(city.lat, city.lon)
        const cx = p.x * sx, cy = p.y * sy

        if (city.key) {
          // Outer ring
          ctx.beginPath()
          ctx.arc(cx, cy, city.r * 2.2, 0, Math.PI * 2)
          ctx.strokeStyle = city.color + '30'
          ctx.lineWidth = 0.8
          ctx.stroke()
          // Pulse ring (animated)
          const pulse = (Math.sin(frameRef.current * 0.04 + CITIES.indexOf(city)) + 1) / 2
          ctx.beginPath()
          ctx.arc(cx, cy, city.r * (2.5 + pulse * 2), 0, Math.PI * 2)
          ctx.strokeStyle = city.color + Math.floor(20 + pulse * 40).toString(16).padStart(2, '0')
          ctx.lineWidth = 0.5
          ctx.stroke()
        }

        // Core dot
        ctx.beginPath()
        ctx.arc(cx, cy, city.r * sx, 0, Math.PI * 2)
        ctx.fillStyle = city.color
        ctx.shadowBlur = 10
        ctx.shadowColor = city.color
        ctx.fill()
        ctx.shadowBlur = 0

        // Label
        ctx.fillStyle = city.color + 'cc'
        ctx.font = `bold ${Math.max(7, 8 * sx)}px monospace`
        ctx.textAlign = 'center'
        ctx.fillText(city.label, cx, cy - city.r * sx - 3)
      })

      // Threat region glows
      REGIONS.forEach(region => {
        const c = project(region.center.lat, region.center.lon)
        const cx = c.x * sx, cy = c.y * sy
        const pulse = (Math.sin(frameRef.current * 0.05 + REGIONS.indexOf(region) * 1.5) + 1) / 2
        const color = LEVEL_COLORS[region.threat]

        const rg = ctx.createRadialGradient(cx, cy, 0, cx, cy, 40 * sx * (1 + pulse * 0.3))
        rg.addColorStop(0, color + '18')
        rg.addColorStop(1, color + '00')
        ctx.fillStyle = rg
        ctx.fillRect(0, 0, W2, H2)

        // Ring
        ctx.beginPath()
        ctx.arc(cx, cy, 18 * sx, 0, Math.PI * 2)
        ctx.strokeStyle = color + '60'
        ctx.lineWidth = 1
        ctx.stroke()
      })

      // Scan line
      const scanY = ((frameRef.current * 1.2) % H2)
      const sg = ctx.createLinearGradient(0, scanY - 30, 0, scanY + 2)
      sg.addColorStop(0, 'rgba(0,212,255,0)')
      sg.addColorStop(1, 'rgba(0,212,255,0.04)')
      ctx.fillStyle = sg
      ctx.fillRect(0, scanY - 30, W2, 32)

      requestAnimationFrame(draw)
    }

    draw()
    return () => { stopped = true }
  }, [canvasRef])
}

// ── 메인 컴포넌트 ──────────────────────────────────────────────────────────
export default function InteractiveWorldMap() {
  const sys = useSystem()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [dims, setDims] = useState({ w: 800, h: 400 })
  const [selected, setSelected] = useState<typeof REGIONS[number] | null>(null)
  const [viewBox, setViewBox] = useState(`0 0 ${W} ${H}`)
  const [hovered, setHovered] = useState<string | null>(null)

  useMapCanvas(canvasRef)

  // 컨테이너 크기 감지
  useEffect(() => {
    const ro = new ResizeObserver(entries => {
      for (const e of entries) {
        const { width } = e.contentRect
        setDims({ w: width, h: Math.round(width * 0.46) })
      }
    })
    if (containerRef.current) ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [])

  const zoomTo = useCallback((region: typeof REGIONS[number]) => {
    const p1 = project(region.zoom.lat2, region.zoom.lon1)
    const p2 = project(region.zoom.lat1, region.zoom.lon2)
    const px = Math.max(0, p1.x - 20)
    const py = Math.max(0, p1.y - 20)
    const pw = Math.min(W - px, (p2.x - p1.x) + 40)
    const ph = Math.min(H - py, (p2.y - p1.y) + 40)
    setViewBox(`${px} ${py} ${pw} ${ph}`)
    setSelected(region)
  }, [])

  const resetZoom = useCallback(() => {
    setViewBox(`0 0 ${W} ${H}`)
    setSelected(null)
  }, [])

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden" style={{ height: dims.h || 400, minHeight: 280 }}>
      {/* 캔버스 배경 */}
      <canvas
        ref={canvasRef}
        width={dims.w}
        height={dims.h || 400}
        className="absolute inset-0 w-full h-full"
      />

      {/* SVG 인터랙티브 오버레이 */}
      <svg
        viewBox={viewBox}
        className="absolute inset-0 w-full h-full"
        style={{ transition: 'all 0.7s cubic-bezier(0.4,0,0.2,1)' }}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* 위협 지역 클릭 오버레이 */}
        {REGIONS.map(region => {
          const c = project(region.center.lat, region.center.lon)
          const color = LEVEL_COLORS[region.threat]
          const isHov = hovered === region.id
          const isSel = selected?.id === region.id
          return (
            <g key={region.id}
              className="cursor-pointer"
              onClick={() => isSel ? resetZoom() : zoomTo(region)}
              onMouseEnter={() => setHovered(region.id)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* 클릭 영역 */}
              <circle cx={c.x} cy={c.y} r={22} fill="transparent" />
              {/* 호버 링 */}
              {(isHov || isSel) && (
                <circle cx={c.x} cy={c.y} r={20}
                  fill={color + '12'} stroke={color} strokeWidth="0.8" strokeOpacity="0.8" />
              )}
              {/* 코어 */}
              <circle cx={c.x} cy={c.y} r={isSel ? 5 : 4}
                fill={color}
                style={{ filter: `drop-shadow(0 0 ${isSel ? 6 : 4}px ${color})` }}
              />
              {/* SOL 미니 인디케이터 */}
              {region.activeSols.slice(0, 3).map((solId, i) => {
                const meta = SOL_META[solId]
                const angle = (i / 3) * Math.PI * 2 - Math.PI / 2
                return (
                  <circle key={solId}
                    cx={c.x + Math.cos(angle) * 14}
                    cy={c.y + Math.sin(angle) * 14}
                    r={2.2}
                    fill={meta.color}
                    style={{ filter: `drop-shadow(0 0 3px ${meta.color})` }}
                  />
                )
              })}
              {/* 레이블 */}
              <text x={c.x} y={c.y + 30} textAnchor="middle"
                fontSize="6.5" fill={color} fontWeight="bold" fillOpacity={isHov || isSel ? 1 : 0.7}>
                {region.label}
              </text>
            </g>
          )
        })}
      </svg>

      {/* HUD 오버레이 */}
      <div className="absolute top-2 left-3 flex items-center gap-1.5 pointer-events-none">
        <div className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse" />
        <span className="text-[8px] font-mono text-[#00ff88] tracking-widest">GLOBAL THREAT MONITOR // LIVE</span>
      </div>
      <div className="absolute top-2 right-3 flex items-center gap-2.5 pointer-events-none">
        {Object.entries(LEVEL_COLORS).map(([lvl, col]) => (
          <div key={lvl} className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: col }} />
            <span className="text-[7px] text-[#4a7a9b] font-mono">{lvl}</span>
          </div>
        ))}
      </div>
      <div className="absolute bottom-2 left-3 text-[7px] font-mono text-[#2a4a6a] pointer-events-none">
        {REGIONS.length} ZONES ACTIVE · {CITIES.length} NODES · {ARCS.length} THREAT VECTORS
      </div>

      {/* 줌 리셋 */}
      {selected && (
        <button onClick={resetZoom}
          className="absolute top-2 left-1/2 -translate-x-1/2 text-[9px] font-black text-[#00d4ff] border border-[#00d4ff]/30 px-3 py-1 bg-[#020b18]/80 backdrop-blur hover:bg-[#00d4ff]/10 transition-all z-10">
          ← 전체 지도
        </button>
      )}

      {!selected && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[8px] text-[#4a7a9b] font-mono pointer-events-none">
          위협 지역 클릭 → 확대 · SOL 상세
        </div>
      )}

      {/* 지역 상세 패널 */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-0 right-0 bottom-0 w-52 bg-[#020b18]/96 backdrop-blur border-l border-[#00d4ff]/15 overflow-y-auto z-20"
          >
            <div className="p-3">
              <div className="flex items-start justify-between mb-2.5">
                <div>
                  <div className="text-[7px] font-black tracking-[0.15em] mb-0.5" style={{ color: selected.color }}>
                    {selected.labelEn}
                  </div>
                  <div className="text-[14px] font-black text-white">{selected.label}</div>
                </div>
                <button onClick={resetZoom} className="text-[#4a7a9b] hover:text-white p-0.5">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* 위협 등급 */}
              <div className="flex items-center gap-2 mb-2.5 px-2 py-1.5 border"
                style={{ borderColor: `${selected.color}30`, background: `${selected.color}08` }}>
                <AlertTriangle className="w-3 h-3 shrink-0" style={{ color: selected.color }} />
                <div>
                  <div className="text-[7px] text-[#4a7a9b]">위협 등급</div>
                  <div className="text-[12px] font-black" style={{ color: selected.color }}>{selected.threat}</div>
                </div>
              </div>

              {/* 활성 SOL */}
              <div className="mb-2.5">
                <div className="text-[7px] font-black tracking-[0.12em] text-[#00d4ff] mb-1.5">가동 AI 시스템</div>
                <div className="space-y-1">
                  {selected.activeSols.map(solId => {
                    const meta = SOL_META[solId]
                    const Icon = meta.icon
                    const mod = sys.modules[solId.toLowerCase().replace('-', '') as keyof typeof sys.modules]
                    const active = mod?.active ?? true
                    return (
                      <Link key={solId} to={meta.href}
                        className="flex items-center gap-1.5 px-2 py-1 border transition-all hover:bg-[#041526]"
                        style={{ borderColor: `${meta.color}30` }}>
                        <div className="w-4 h-4 flex items-center justify-center rounded-sm shrink-0"
                          style={{ background: `${meta.color}15` }}>
                          <Icon className="w-2.5 h-2.5" style={{ color: meta.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[7px] font-black" style={{ color: meta.color }}>{solId}</div>
                          <div className="text-[8px] text-white">{meta.label}</div>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className={`w-1 h-1 rounded-full ${active ? 'animate-pulse' : ''}`}
                            style={{ background: active ? meta.color : '#2a4a5e' }} />
                          <Zap className="w-2 h-2" style={{ color: meta.color }} />
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>

              {/* 위협 이벤트 */}
              <div>
                <div className="text-[7px] font-black tracking-[0.12em] text-[#ff6b35] mb-1.5">탐지 이벤트</div>
                <div className="space-y-1">
                  {selected.events.map((ev, i) => (
                    <div key={i} className="flex items-start gap-1 text-[8px] text-[#6a9ab8]">
                      <span className="text-[#ff6b35] shrink-0 mt-0.5">›</span>
                      <span>{ev}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
