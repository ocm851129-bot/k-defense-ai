import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, AlertTriangle, MapPin } from 'lucide-react'

// ── GIS 투영 (한반도 중심 Mercator) ──────────────────────────────────────────
// 한반도 중심: 38N, 127.5E  /  viewBox: 37~41N, 124~131E
const LAT_MIN = 34.5, LAT_MAX = 42.5, LON_MIN = 123, LON_MAX = 132

const W = 600, H = 500

const gis = (lat: number, lon: number) => ({
  x: ((lon - LON_MIN) / (LON_MAX - LON_MIN)) * W,
  y: H - ((lat - LAT_MIN) / (LAT_MAX - LAT_MIN)) * H,
})

const reverseGis = (x: number, y: number) => ({
  lat: LAT_MIN + ((H - y) / H) * (LAT_MAX - LAT_MIN),
  lon: LON_MIN + (x / W) * (LON_MAX - LON_MIN),
})

// ── 지형지물 (도시, 기지, DMZ) ───────────────────────────────────────────────
const CITIES = [
  { id:'SEO', label:'서울',     lat:37.55, lon:126.98, type:'city',  color:'#00ff88' },
  { id:'PYO', label:'평양',     lat:39.02, lon:125.75, type:'enemy', color:'#ff2d55' },
  { id:'INC', label:'인천',     lat:37.46, lon:126.71, type:'city',  color:'#00ff88' },
  { id:'BUS', label:'부산',     lat:35.18, lon:129.08, type:'city',  color:'#00ff88' },
  { id:'DAE', label:'대구',     lat:35.87, lon:128.60, type:'city',  color:'#00ff88' },
  { id:'GWJ', label:'광주',     lat:35.16, lon:126.85, type:'city',  color:'#00ff88' },
  { id:'KAE', label:'개성',     lat:37.97, lon:126.55, type:'neutral','color':'#ffcc00' },
  { id:'WON', label:'원산',     lat:39.15, lon:127.44, type:'enemy', color:'#ff6b35' },
  { id:'NAM', label:'남포',     lat:38.74, lon:125.41, type:'enemy', color:'#ff6b35' },
  { id:'HAM', label:'함흥',     lat:39.92, lon:127.54, type:'enemy', color:'#ff6b35' },
  { id:'DNG', label:'동창리',   lat:39.66, lon:124.71, type:'threat',color:'#ff2d55' },
  { id:'TOK', label:'도쿄',     lat:35.69, lon:139.69, type:'ally',  color:'#00d4ff' },
  { id:'BSE', label:'블라디보스토크', lat:43.11, lon:131.90, type:'neutral','color':'#ff6b35' },
]

const BASES = [
  { id:'osan',  label:'오산 공군기지',   lat:37.09, lon:127.03, type:'ROK_US' },
  { id:'kunsan',label:'군산 공군기지',   lat:35.90, lon:126.62, type:'ROK_US' },
  { id:'camp',  label:'캠프 험프리스',   lat:36.96, lon:127.03, type:'ROK_US' },
  { id:'daegu', label:'대구 육군기지',   lat:35.87, lon:128.59, type:'ROK' },
  { id:'jinhae',label:'진해 해군기지',   lat:35.14, lon:128.66, type:'ROK' },
  { id:'suwon', label:'수원 공군기지',   lat:37.24, lon:127.01, type:'ROK' },
  { id:'dprk1', label:'신의주 방공기지', lat:40.08, lon:124.38, type:'DPRK' },
  { id:'dprk2', label:'순안 공군기지',   lat:39.22, lon:125.67, type:'DPRK' },
  { id:'dprk3', label:'갈마 공항',       lat:39.17, lon:127.47, type:'DPRK' },
]

// ── 유닛 타입 ─────────────────────────────────────────────────────────────────
export type UnitSide = 'ROK' | 'US'  | 'DPRK'
export type UnitType = 'SAM' | 'AIRCRAFT' | 'ARMOR' | 'NAVAL' | 'MISSILE' | 'EW' | 'INTEL'

export interface GisUnit {
  id: string; label: string; side: UnitSide; type: UnitType
  lat: number; lon: number; active: boolean
  range?: number // km
  status: 'READY' | 'ENGAGED' | 'DAMAGED' | 'DESTROYED'
}

const UNIT_ICONS: Record<UnitType, string> = {
  SAM:'⬡', AIRCRAFT:'▲', ARMOR:'■', NAVAL:'◆', MISSILE:'⬟', EW:'◉', INTEL:'◈'
}

const SIDE_COLORS: Record<UnitSide, string> = {
  ROK:'#00ff88', US:'#00d4ff', DPRK:'#ff2d55'
}

const STATUS_OPACITY: Record<GisUnit['status'], number> = {
  READY:1, ENGAGED:0.9, DAMAGED:0.6, DESTROYED:0.3
}

// ── 초기 유닛 배치 ────────────────────────────────────────────────────────────
const INITIAL_UNITS: GisUnit[] = [
  // ROK/US 방어 전력
  { id:'u01', label:'패트리엇 1포대', side:'ROK', type:'SAM',      lat:37.54, lon:126.97, active:true, range:35,  status:'READY' },
  { id:'u02', label:'패트리엇 2포대', side:'ROK', type:'SAM',      lat:36.98, lon:127.04, active:true, range:35,  status:'READY' },
  { id:'u03', label:'THAAD',          side:'US',  type:'SAM',      lat:35.98, lon:128.45, active:true, range:200, status:'READY' },
  { id:'u04', label:'천궁 1포대',     side:'ROK', type:'SAM',      lat:37.70, lon:127.10, active:true, range:40,  status:'READY' },
  { id:'u05', label:'F-35A 편대',     side:'ROK', type:'AIRCRAFT', lat:36.72, lon:127.49, active:true, range:500, status:'READY' },
  { id:'u06', label:'F-16C 편대',     side:'US',  type:'AIRCRAFT', lat:37.09, lon:127.03, active:true, range:550, status:'READY' },
  { id:'u07', label:'K1A2 전차대대',  side:'ROK', type:'ARMOR',    lat:37.95, lon:126.87, active:true, range:20,  status:'READY' },
  { id:'u08', label:'이지스함 KDX-3', side:'ROK', type:'NAVAL',    lat:37.40, lon:124.80, active:true, range:400, status:'READY' },
  { id:'u09', label:'SIGINT 기지',    side:'ROK', type:'EW',       lat:37.35, lon:127.90, active:true, range:300, status:'READY' },
  { id:'u10', label:'정찰드론',       side:'US',  type:'INTEL',    lat:37.09, lon:127.03, active:true, range:600, status:'READY' },
  // DPRK 위협 전력
  { id:'d01', label:'화성-17 TEL',   side:'DPRK', type:'MISSILE',  lat:39.66, lon:124.71, active:true, range:15000, status:'READY' },
  { id:'d02', label:'KN-23 TEL',     side:'DPRK', type:'MISSILE',  lat:38.72, lon:125.41, active:true, range:800,   status:'READY' },
  { id:'d03', label:'장사정포 포진지',side:'DPRK', type:'ARMOR',    lat:38.22, lon:126.89, active:true, range:54,    status:'READY' },
  { id:'d04', label:'MiG-29 편대',   side:'DPRK', type:'AIRCRAFT', lat:39.22, lon:125.67, active:true, range:300,   status:'READY' },
  { id:'d05', label:'S-300 포대',    side:'DPRK', type:'SAM',      lat:39.02, lon:125.75, active:true, range:150,   status:'READY' },
  { id:'d06', label:'해군 경비함정', side:'DPRK', type:'NAVAL',    lat:38.10, lon:124.60, active:true, range:80,    status:'READY' },
]

// ── 위협 이벤트 ──────────────────────────────────────────────────────────────
interface ThreatEvent {
  id: string; time: string; msg: string; level: 'CRITICAL'|'HIGH'|'MED'
  lat: number; lon: number
}

function genTime() { return new Date().toLocaleTimeString('ko-KR',{hour12:false,hour:'2-digit',minute:'2-digit',second:'2-digit'}) }

// ── 메인 GIS 운영 지도 ──────────────────────────────────────────────────────
interface Props {
  solId?: string
  activeLayers?: ('SAM'|'AIRCRAFT'|'ARMOR'|'NAVAL'|'MISSILE'|'EW'|'INTEL')[]
  title?: string
  color?: string
}

export default function GisOperationsMap({ solId: _solId, activeLayers, title = '작전 지도', color = '#00d4ff' }: Props) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [units, setUnits] = useState<GisUnit[]>(INITIAL_UNITS)
  const [selected, setSelected] = useState<GisUnit|null>(null)
  const [events, setEvents] = useState<ThreatEvent[]>([])
  const [showRange, setShowRange] = useState(true)
  const [dragging, setDragging] = useState<string|null>(null)
  const [cursorCoord, setCursorCoord] = useState<{lat:number;lon:number}|null>(null)
  const [pulse, setPulse] = useState(0)
  const [showLayer, setShowLayer] = useState<Record<string, boolean>>({
    SAM:true, AIRCRAFT:true, ARMOR:true, NAVAL:true, MISSILE:true, EW:true, INTEL:true,
    cities:true, bases:true, dmz:true,
  })

  useEffect(() => {
    const id = setInterval(() => setPulse(p=>p+1), 1500)
    return () => clearInterval(id)
  }, [])

  // 위협 이벤트 생성
  useEffect(() => {
    const id = setInterval(() => {
      const dprk = units.filter(u=>u.side==='DPRK'&&u.active)
      if (!dprk.length) return
      const u = dprk[Math.floor(Math.random()*dprk.length)]
      const msgs: {msg:string; level:ThreatEvent['level']}[] = [
        { msg:`${u.label} 이동 감지`, level:'HIGH' },
        { msg:`${u.label} 활성화 신호`, level:'CRITICAL' },
        { msg:`${u.label} 인근 레이더 방사`, level:'MED' },
      ]
      const m = msgs[Math.floor(Math.random()*msgs.length)]
      setEvents(prev=>[{
        id:`ev-${Date.now()}`, time:genTime(), msg:m.msg, level:m.level,
        lat:u.lat+( Math.random()-0.5)*0.1, lon:u.lon+(Math.random()-0.5)*0.1
      },...prev].slice(0,12))
    }, 4000)
    return () => clearInterval(id)
  }, [units])

  const handleMouseMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    const svg = svgRef.current; if (!svg) return
    const rect = svg.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width * W
    const y = (e.clientY - rect.top)  / rect.height * H
    setCursorCoord(reverseGis(x, y))

    if (dragging) {
      setUnits(prev=>prev.map(u=>{
        if (u.id!==dragging) return u
        const coord = reverseGis(x, y)
        return {...u, lat:parseFloat(coord.lat.toFixed(4)), lon:parseFloat(coord.lon.toFixed(4))}
      }))
    }
  }, [dragging])

  const toggleUnit = (unitId: string) => {
    setUnits(prev=>prev.map(u=>u.id===unitId ? {...u, active:!u.active} : u))
    addEvent(`유닛 상태 전환: ${units.find(u=>u.id===unitId)?.label}`, 'MED', 38.5, 127)
  }

  const addEvent = (msg: string, level: ThreatEvent['level'], lat: number, lon: number) => {
    setEvents(prev=>[{id:`ev-${Date.now()}`, time:genTime(), msg, level, lat, lon}, ...prev].slice(0,12))
  }

  const visibleUnits = units.filter(u => {
    if (activeLayers && !activeLayers.includes(u.type)) return false
    return showLayer[u.type]
  })

  const LEVEL_C = { CRITICAL:'#ff2d55', HIGH:'#ff6b35', MED:'#ffcc00' }

  return (
    <div className="flex flex-col lg:flex-row gap-3 w-full">
      {/* ── 지도 패널 ── */}
      <div className="flex-1 min-w-0">
        <div className="clip-corner bg-[#041526]/80 border overflow-hidden" style={{ borderColor:`${color}20` }}>
          {/* 지도 헤더 */}
          <div className="flex items-center justify-between px-3 py-2 border-b border-[#0a3050]">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5" style={{ color }} />
              <span className="text-[10px] font-black tracking-[0.15em]" style={{ color }}>{title} — GIS OPERATIONS</span>
            </div>
            <div className="flex items-center gap-2">
              {cursorCoord && (
                <span className="text-[8px] font-mono text-[#4a7a9b]">
                  {cursorCoord.lat.toFixed(3)}N {cursorCoord.lon.toFixed(3)}E
                </span>
              )}
              <button onClick={()=>setShowRange(v=>!v)}
                className={`text-[8px] font-black px-2 py-0.5 border transition-all ${showRange?'border-current':'border-[#0a3050] text-[#4a7a9b]'}`}
                style={showRange?{color, borderColor:color}:{}}>
                사거리
              </button>
            </div>
          </div>

          {/* SVG GIS 지도 */}
          <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`}
            className="w-full cursor-crosshair select-none"
            style={{ maxHeight:'480px', background:'#020b18' }}
            onMouseMove={handleMouseMove}
            onMouseUp={()=>setDragging(null)}
            onMouseLeave={()=>{setDragging(null); setCursorCoord(null)}}
          >
            {/* 배경 그리드 */}
            {Array.from({length:10}).map((_,i)=>{
              const lat = LAT_MIN + (i/(10-1))*(LAT_MAX-LAT_MIN)
              const p = gis(lat, LON_MIN)
              return (
                <g key={i}>
                  <line x1="0" y1={p.y} x2={W} y2={p.y} stroke="#00d4ff" strokeOpacity="0.05" strokeWidth="0.5"/>
                  <text x="3" y={p.y-2} fontSize="6" fill="#2a4a6a">{lat.toFixed(1)}°N</text>
                </g>
              )
            })}
            {Array.from({length:10}).map((_,i)=>{
              const lon = LON_MIN + (i/(10-1))*(LON_MAX-LON_MIN)
              const p = gis(LAT_MIN, lon)
              return (
                <g key={i}>
                  <line x1={p.x} y1="0" x2={p.x} y2={H} stroke="#00d4ff" strokeOpacity="0.05" strokeWidth="0.5"/>
                  <text x={p.x+2} y={H-2} fontSize="6" fill="#2a4a6a">{lon.toFixed(1)}°E</text>
                </g>
              )
            })}

            {/* DMZ 라인 */}
            {showLayer.dmz && (() => {
              const p1 = gis(38.3, 124.6), p2 = gis(38.2, 130.5)
              return (
                <g>
                  <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
                    stroke="#ff2d55" strokeWidth="1.5" strokeDasharray="6,4" opacity="0.7"/>
                  <text x={(p1.x+p2.x)/2} y={(p1.y+p2.y)/2-5}
                    textAnchor="middle" fontSize="7" fill="#ff2d55" fontWeight="bold">━━ DMZ ━━</text>
                </g>
              )
            })()}

            {/* NLL */}
            {(() => {
              const p1 = gis(37.7, 124.5), p2 = gis(37.8, 126.8)
              return (
                <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
                  stroke="#ffcc00" strokeWidth="1" strokeDasharray="4,3" opacity="0.5"/>
              )
            })()}

            {/* 도시 */}
            {showLayer.cities && CITIES.map(city=>{
              const p = gis(city.lat, city.lon)
              return (
                <g key={city.id}>
                  <circle cx={p.x} cy={p.y} r={3.5} fill={city.color} opacity="0.8"
                    style={{ filter:`drop-shadow(0 0 4px ${city.color})` }}/>
                  <text x={p.x+5} y={p.y+3} fontSize="7" fill={city.color} fontWeight="bold">{city.label}</text>
                </g>
              )
            })}

            {/* 기지 */}
            {showLayer.bases && BASES.map(base=>{
              const p = gis(base.lat, base.lon)
              const c = base.type==='DPRK'?'#ff2d55':base.type==='ROK_US'?'#00d4ff':'#00ff88'
              return (
                <g key={base.id}>
                  <rect x={p.x-5} y={p.y-5} width={10} height={10} fill={c+'20'} stroke={c}
                    strokeWidth="0.8" transform={`rotate(45,${p.x},${p.y})`}/>
                  <text x={p.x+8} y={p.y+4} fontSize="6" fill={c} opacity="0.7">{base.label}</text>
                </g>
              )
            })}

            {/* 유닛 사거리 원 */}
            {showRange && visibleUnits.filter(u=>u.active&&u.range).map(u=>{
              const p = gis(u.lat, u.lon)
              const c = SIDE_COLORS[u.side]
              const rangeKm = u.range || 0
              const degLat = rangeKm / 111
              const pEdge = gis(u.lat + degLat, u.lon)
              const radius = Math.abs(p.y - pEdge.y)
              return (
                <circle key={`r-${u.id}`} cx={p.x} cy={p.y} r={Math.min(radius, 300)}
                  fill="none" stroke={c} strokeWidth="0.5" strokeDasharray="3,3"
                  opacity={u.id===selected?.id?0.4:0.15}/>
              )
            })}

            {/* 위협 이벤트 마커 */}
            {events.slice(0,5).map(ev=>{
              const p = gis(ev.lat, ev.lon)
              const c = LEVEL_C[ev.level]
              const pIdx = (pulse + events.indexOf(ev)) % 3
              return (
                <g key={ev.id}>
                  <circle cx={p.x} cy={p.y} r={6+(pIdx*2)} fill="none" stroke={c}
                    strokeWidth="0.5" opacity={0.5-pIdx*0.15}/>
                </g>
              )
            })}

            {/* 유닛 */}
            {visibleUnits.map(u=>{
              const p = gis(u.lat, u.lon)
              const c = SIDE_COLORS[u.side]
              const isSel = selected?.id===u.id
              return (
                <g key={u.id} style={{ opacity: STATUS_OPACITY[u.status] }}
                  onMouseDown={()=>{ setDragging(u.id); setSelected(u) }}
                  onClick={()=>setSelected(s=>s?.id===u.id?null:u)}
                  className="cursor-pointer">
                  {isSel && <circle cx={p.x} cy={p.y} r={12} fill="none" stroke={c} strokeWidth="1" opacity="0.5"/>}
                  <circle cx={p.x} cy={p.y} r={u.active?7:5}
                    fill={u.active?c+'25':'#1a2a3a'}
                    stroke={c} strokeWidth={isSel?1.5:0.8}
                    style={u.active?{ filter:`drop-shadow(0 0 5px ${c})` }:{}}/>
                  <text x={p.x} y={p.y+3.5} textAnchor="middle" fontSize="7"
                    fill={u.active?c:'#2a4a6a'} fontWeight="bold">
                    {UNIT_ICONS[u.type]}
                  </text>
                  <text x={p.x} y={p.y+16} textAnchor="middle" fontSize="5.5"
                    fill={c} opacity="0.8">{u.label}</text>
                  {!u.active && (
                    <line x1={p.x-5} y1={p.y-5} x2={p.x+5} y2={p.y+5} stroke="#ff2d55" strokeWidth="1" opacity="0.5"/>
                  )}
                </g>
              )
            })}
          </svg>

          {/* 범례 */}
          <div className="flex items-center gap-4 px-3 py-1.5 border-t border-[#0a3050] flex-wrap">
            {Object.entries(UNIT_ICONS).map(([type, icon])=>(
              <button key={type} onClick={()=>setShowLayer(l=>({...l,[type]:!l[type]}))}
                className={`flex items-center gap-1 text-[7px] transition-all ${showLayer[type]?'opacity-100':'opacity-30'}`}>
                <span className="text-xs">{icon}</span>
                <span className="text-[#4a7a9b]">{type}</span>
              </button>
            ))}
            <div className="flex items-center gap-2 ml-auto">
              {Object.entries(SIDE_COLORS).map(([side, c])=>(
                <div key={side} className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full" style={{background:c}}/>
                  <span className="text-[7px] text-[#4a7a9b]">{side}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── 우측 패널 ── */}
      <div className="w-full lg:w-64 space-y-2">
        {/* 선택 유닛 상세 */}
        <AnimatePresence>
          {selected && (
            <motion.div initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}} exit={{opacity:0}}
              className="clip-corner bg-[#041526]/90 border p-3"
              style={{ borderColor:`${SIDE_COLORS[selected.side]}30` }}>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="text-[8px] font-black mb-0.5" style={{color:SIDE_COLORS[selected.side]}}>{selected.side} · {selected.type}</div>
                  <div className="text-[12px] font-black text-white">{selected.label}</div>
                </div>
                <button onClick={()=>setSelected(null)} className="text-[#4a7a9b] hover:text-white">
                  <X className="w-3 h-3" />
                </button>
              </div>
              <div className="space-y-1.5 text-[9px]">
                <div className="flex justify-between border-b border-[#0a3050] pb-1">
                  <span className="text-[#4a7a9b]">좌표</span>
                  <span className="font-mono text-[#00d4ff]">{selected.lat.toFixed(3)}N {selected.lon.toFixed(3)}E</span>
                </div>
                <div className="flex justify-between border-b border-[#0a3050] pb-1">
                  <span className="text-[#4a7a9b]">상태</span>
                  <span className={`font-black ${selected.status==='READY'?'text-[#00ff88]':selected.status==='ENGAGED'?'text-[#ffcc00]':'text-[#ff2d55]'}`}>{selected.status}</span>
                </div>
                {selected.range && (
                  <div className="flex justify-between border-b border-[#0a3050] pb-1">
                    <span className="text-[#4a7a9b]">사거리</span>
                    <span className="text-[#ffcc00] font-black">{selected.range}km</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-[#4a7a9b]">가동</span>
                  <button onClick={()=>toggleUnit(selected.id)}
                    className={`text-[8px] font-black px-2 py-0.5 transition-all ${selected.active?'text-[#ff2d55] border border-[#ff2d55]/30':'text-[#00ff88] border border-[#00ff88]/30'}`}>
                    {selected.active?'비활성화':'활성화'}
                  </button>
                </div>
                <div className="text-[8px] text-[#4a7a9b]">드래그로 유닛 이동 가능</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 위협 이벤트 피드 */}
        <div className="clip-corner bg-[#041526]/80 border border-[#0a3050] p-3">
          <div className="flex items-center gap-1.5 mb-2">
            <AlertTriangle className="w-3 h-3 text-[#ff2d55]" />
            <span className="text-[9px] font-black text-[#ff2d55]">실시간 위협 피드</span>
            <div className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse ml-auto"/>
          </div>
          <div className="space-y-1.5 max-h-52 overflow-y-auto">
            {events.map(ev=>(
              <div key={ev.id} className="flex gap-2 text-[8px] border-b border-[#0a3050]/50 pb-1 last:border-0">
                <span className="text-[#2a4a6a] font-mono shrink-0">{ev.time}</span>
                <div>
                  <span className="font-black px-1 mr-1" style={{color:LEVEL_C[ev.level],background:`${LEVEL_C[ev.level]}15`}}>{ev.level}</span>
                  <span className="text-[#8ab8d4]">{ev.msg}</span>
                  <div className="text-[#2a4a6a] mt-0.5">{ev.lat.toFixed(3)}N {ev.lon.toFixed(3)}E</div>
                </div>
              </div>
            ))}
            {events.length===0 && <div className="text-center text-[#2a4a6a] py-4">이벤트 대기 중...</div>}
          </div>
        </div>

        {/* 전력 요약 */}
        <div className="clip-corner bg-[#041526]/80 border border-[#0a3050] p-3">
          <div className="text-[9px] font-black text-[#00d4ff] mb-2">전력 현황</div>
          {(['ROK','US','DPRK'] as UnitSide[]).map(side=>{
            const total = units.filter(u=>u.side===side)
            const active = total.filter(u=>u.active)
            return (
              <div key={side} className="mb-2">
                <div className="flex justify-between text-[8px] mb-0.5">
                  <span style={{color:SIDE_COLORS[side]}} className="font-black">{side}</span>
                  <span className="text-[#4a7a9b]">{active.length}/{total.length} 활성</span>
                </div>
                <div className="h-1.5 bg-[#0a3050] rounded-full">
                  <div className="h-full rounded-full" style={{width:`${(active.length/Math.max(1,total.length))*100}%`, background:SIDE_COLORS[side]}}/>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
