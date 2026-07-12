import { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, Camera, ChevronLeft, Target, Eye, Play, RotateCcw, Trophy, Zap, CheckCircle  } from 'lucide-react'
import { Link } from 'react-router-dom'
import SolControlBar from '../../components/SolControlBar'
import GisOperationsMap from '../../components/GisOperationsMap'
import WeaponIntelPanel from '../../components/sol/WeaponIntelPanel'
import { useSystem } from '../../contexts/SystemContext'
import { WEAPONS, CATEGORY_KO, type WeaponSystem, type WeaponCategory } from '../../data/weapons'

// ── 타입 ──────────────────────────────────────────────────────────────────────
type Phase = 'STANDBY' | 'ACTIVE' | 'RESULT'
type RiskLevel = 'CRITICAL' | 'HIGH' | 'MED' | 'LOW'
type TaskStatus = 'PENDING' | 'IMAGING' | 'ANALYZED' | 'MISSED'

interface IntelTarget {
  id: string; name: string; type: string
  lat: string; lng: string; area: string
  risk: RiskLevel; change: string; lastUpdate: string
  imgResolution: string; taskStatus: TaskStatus
  timeWindow: number; maxTime: number
  findings: string[]; priority: number
  linkedWeapon?: WeaponSystem
}

interface SatPass {
  id: string; sat: string; time: string; coverage: string; res: string
  status: 'SCHEDULED' | 'TASKED' | 'IMAGING' | 'COMPLETED'
  targetId: string | null
}

const RISK_COLORS: Record<RiskLevel, string> = {
  CRITICAL: '#ff2d55', HIGH: '#ff6b35', MED: '#ffcc00', LOW: '#00ff88',
}

// DB 연동 — 관측지점별 실제 위협 무기체계 매칭 (사이트 위치는 창작, 무기 데이터는 실제 DB)
const SITE_TEMPLATES: Omit<IntelTarget, 'findings' | 'risk' | 'linkedWeapon'>[] = [
  { id:'GT-001', name:'동창리 발사장',  type:'ICBM 발사 시설', lat:'40.0N', lng:'124.7E', area:'북한 서해', change:'+340%', lastUpdate:'', imgResolution:'0.3m', taskStatus:'PENDING', timeWindow:18, maxTime:18, priority:1 },
  { id:'GT-002', name:'순안 공항',      type:'군용 항공기지', lat:'39.0N', lng:'125.7E', area:'평양 북부',  change:'+55%',  lastUpdate:'', imgResolution:'0.5m', taskStatus:'PENDING', timeWindow:22, maxTime:22, priority:2 },
  { id:'GT-003', name:'남포 항만',       type:'해군 기지',     lat:'38.7N', lng:'125.4E', area:'서해 해안',  change:'+28%',  lastUpdate:'', imgResolution:'0.5m', taskStatus:'PENDING', timeWindow:25, maxTime:25, priority:3 },
  { id:'GT-004', name:'사리원 기지',     type:'지상군 집결지', lat:'38.5N', lng:'125.8E', area:'황해도',    change:'+87%',  lastUpdate:'', imgResolution:'1.0m', taskStatus:'PENDING', timeWindow:30, maxTime:30, priority:4 },
  { id:'GT-005', name:'개성 공단',       type:'민군 경계 지점', lat:'37.9N', lng:'126.5E', area:'DMZ 인근', change:'+12%',  lastUpdate:'', imgResolution:'1.0m', taskStatus:'PENDING', timeWindow:35, maxTime:35, priority:5 },
]
const SITE_CATEGORIES: WeaponCategory[][] = [
  ['ICBM', 'SRBM', 'IRBM'],
  ['AIRCRAFT'],
  ['NAVAL', 'SUBMARINE'],
  ['GROUND', 'ARTILLERY', 'MLRS'],
  ['SATELLITE', 'CYBER'],
]

function pickDprkWeapon(categories: WeaponCategory[]): WeaponSystem | undefined {
  const pool = WEAPONS.filter(w => w.origin === 'DPRK' && categories.includes(w.category))
  const critical = pool.filter(w => w.threatRating === 'CRITICAL' || w.threatRating === 'HIGH')
  const finalPool = critical.length > 0 ? critical : pool
  return finalPool.length > 0 ? finalPool[Math.floor(Math.random() * finalPool.length)] : undefined
}

function buildInitialTargets(): IntelTarget[] {
  return SITE_TEMPLATES.map((site, i) => {
    const weapon = pickDprkWeapon(SITE_CATEGORIES[i])
    const findings = weapon
      ? [weapon.description, `연계 무기체계: ${weapon.name} (${CATEGORY_KO[weapon.category]})`, ...weapon.tags.slice(0, 2).map(t => `태그: ${t}`)]
      : ['관측 데이터 수집 중']
    return { ...site, risk: weapon?.threatRating ?? 'MED', findings, linkedWeapon: weapon }
  })
}

const INIT_SATS: SatPass[] = [
  { id:'SAT-KS12', sat:'KSat-12', time:'15:23', coverage:'한반도 전역',   res:'0.3m', status:'SCHEDULED', targetId:null },
  { id:'SAT-KS07', sat:'KSat-07', time:'16:45', coverage:'서해 및 황해',  res:'0.5m', status:'SCHEDULED', targetId:null },
  { id:'SAT-KS03', sat:'KSat-03', time:'17:12', coverage:'북한 중부',     res:'0.5m', status:'SCHEDULED', targetId:null },
  { id:'SAT-US01', sat:'USA-WV3', time:'14:55', coverage:'한반도 북부',   res:'0.3m', status:'SCHEDULED', targetId:null },
]

const now = () => new Date().toLocaleTimeString('ko-KR',{hour12:false,hour:'2-digit',minute:'2-digit',second:'2-digit'})

export default function Sol03() {
  const sys = useSystem()
  const [mainTab, setMainTab] = useState<'sim'|'ops'|'db'>('sim')
  void sys.modules.sol03
  const initialTargets = useMemo(() => buildInitialTargets(), [])
  const [phase, setPhase] = useState<Phase>('STANDBY')
  const [targets, setTargets] = useState<IntelTarget[]>(initialTargets.map(t=>({...t})))
  const [sats, setSats] = useState<SatPass[]>(INIT_SATS.map(s=>({...s})))
  const [selectedTarget, setSelectedTarget] = useState<IntelTarget|null>(null)
  const [selectedSat, setSelectedSat] = useState<SatPass|null>(null)
  const [score, setScore] = useState(0)
  const [analyzed, setAnalyzed] = useState(0)
  const [missed, setMissed] = useState(0)
  const [logs, setLogs] = useState<{time:string;msg:string;ok:boolean}[]>([])
  const [phase2Done, setPhase2Done] = useState(false)

  const addLog = useCallback((msg:string,ok:boolean)=>{
    setLogs(l=>[{time:now(),msg,ok},...l].slice(0,20))
  },[])

  const start = () => {
    setPhase('ACTIVE')
    setTargets(initialTargets.map(t=>({...t,lastUpdate:now()})))
    setSats(INIT_SATS.map(s=>({...s})))
    setScore(0); setAnalyzed(0); setMissed(0); setLogs([]); setPhase2Done(false)
    addLog('위성 정찰 임무 시작 — 5개 우선 표적 대기 중', true)
  }

  const reset = () => {
    setPhase('STANDBY'); setTargets(initialTargets.map(t=>({...t})))
    setSats(INIT_SATS.map(s=>({...s}))); setScore(0); setAnalyzed(0); setMissed(0)
    setLogs([]); setSelectedTarget(null); setSelectedSat(null)
  }

  // 표적에 위성 투입 명령
  const taskSatellite = () => {
    if (!selectedSat || !selectedTarget) return
    if (selectedSat.status !== 'SCHEDULED') { addLog('해당 위성은 이미 임무 중', false); return }
    if (selectedTarget.taskStatus !== 'PENDING') { addLog('이미 촬영 계획된 표적', false); return }

    setSats(prev => prev.map(s => s.id===selectedSat.id ? {...s,status:'TASKED',targetId:selectedTarget.id} : s))
    setTargets(prev => prev.map(t => t.id===selectedTarget.id ? {...t,taskStatus:'IMAGING'} : t))
    addLog(`${selectedSat.sat} → ${selectedTarget.name} 촬영 임무 할당`, true)

    // 촬영 시뮬레이션 (3~6초)
    const delay = 3000 + Math.random()*3000
    setTimeout(() => {
      const pts = selectedTarget.risk==='CRITICAL'?250:selectedTarget.risk==='HIGH'?150:75
      setSats(prev => prev.map(s => s.id===selectedSat.id ? {...s,status:'COMPLETED'} : s))
      setTargets(prev => prev.map(t => t.id===selectedTarget.id
        ? {...t, taskStatus:'ANALYZED', lastUpdate:now()}
        : t))
      setScore(s => s+pts)
      setAnalyzed(a => a+1)
      addLog(`✓ ${selectedTarget.name} 영상 분석 완료 (+${pts}pt)`, true)
    }, delay)

    setSelectedSat(null); setSelectedTarget(null)
  }

  // 타임 윈도우 감소
  useEffect(() => {
    if (phase !== 'ACTIVE') return
    const id = setInterval(() => {
      setTargets(prev => prev.map(t => {
        if (t.taskStatus !== 'PENDING') return t
        const newTime = t.timeWindow - 1
        if (newTime <= 0) {
          setMissed(m => m+1)
          addLog(`⚠ ${t.name} 촬영 시간 초과 — 정보 손실`, false)
          return { ...t, taskStatus:'MISSED', timeWindow:0 }
        }
        return { ...t, timeWindow: newTime }
      }))
    }, 1500)
    return () => clearInterval(id)
  }, [phase, addLog])

  // 완료 체크
  useEffect(() => {
    if (phase !== 'ACTIVE') return
    const done = targets.every(t => t.taskStatus==='ANALYZED' || t.taskStatus==='MISSED')
    if (done && !phase2Done) {
      setPhase2Done(true)
      setTimeout(() => setPhase('RESULT'), 1500)
    }
  }, [targets, phase, phase2Done])

  const pendingTargets = targets.filter(t=>t.taskStatus==='PENDING')
  void sats.filter(s=>s.status==='SCHEDULED') // freeSats - reserved

  return (
    <div className="min-h-screen bg-[#020b18] pt-3 pb-16 md:pt-4 md:pb-20">
      <div className="max-w-[1600px] mx-auto px-6">
        <SolControlBar moduleId="sol03" />
        <div className="flex items-center gap-3 mb-5">
          <Link to="/command" className="flex items-center gap-1.5 text-[10px] font-bold text-[#4a7a9b] hover:text-[#00d4ff]">
            <ChevronLeft className="w-3.5 h-3.5" /> 지휘 센터
          </Link>
          <div className="w-px h-4 bg-[#0a3050]" />
          <Globe className="w-4 h-4 text-[#00ff88]" />
          <h1 className="text-lg md:text-xl font-black text-white">SOL-03 <span className="text-[#00ff88]">GEOINT · 위성 정찰 임무</span></h1>
        </div>

        {/* 모드 탭 */}
        <div className="flex gap-1 mb-5 border-b border-[#0a3050] pb-0 overflow-x-auto">
          {[{id:'sim',label:'시뮬레이션'},{id:'ops',label:'GIS 운영 지도'},{id:'db',label:'표적 인텔리전스'}].map(({id,label})=>(
            <button key={id} onClick={()=>setMainTab(id as 'sim'|'ops'|'db')}
              className={mainTab===id?'flex items-center px-4 py-2.5 text-[10px] font-black border-b-2 border-[#00ff88] text-[#00ff88] -mb-px whitespace-nowrap':'flex items-center px-4 py-2.5 text-[10px] font-black border-b-2 border-transparent text-[#4a7a9b] -mb-px whitespace-nowrap'}>
              {label}
            </button>
          ))}
        </div>

        {mainTab==='ops' && (
          <GisOperationsMap solId="sol03" title="SOL-03 GEOINT 위성 운영 지도"
            activeLayers={['INTEL','EW']} color="#00ff88" />
        )}

        {mainTab==='db' && (
          <WeaponIntelPanel title="정찰 표적 인텔리전스 DB" color="#00ff88"
            categories={['ICBM','SRBM','IRBM','SLBM','SATELLITE','SUBMARINE','NUCLEAR','AIRCRAFT','NAVAL','GROUND','ARTILLERY','MLRS']}
            defaultOrigin="DPRK" originOptions={['ALL','DPRK','RUSSIA','CHINA']} />
        )}

        {mainTab==='sim' && <>


        {phase === 'STANDBY' && (
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}
            className="clip-corner bg-[#041526]/80 border border-[#00ff88]/20 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Camera className="w-4 h-4 text-[#00ff88]" />
              <span className="text-[11px] font-black tracking-[0.2em] text-[#00ff88]">GEOINT 임무 브리핑</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-2xl font-black text-white mb-2">위성 정찰 임무 할당</h2>
                <p className="text-[12px] text-[#8ab8d4] leading-relaxed mb-4">
                  긴급 정보 요구가 발생했습니다. 가용한 정찰위성을 5개 우선 표적에 할당하여
                  영상 정보를 획득하십시오. 각 표적의 촬영 가능 시간이 초과되기 전에
                  위성을 투입해야 합니다. 우선순위와 위성 해상도를 고려하여 최적 배치를 결정하십시오.
                </p>
                <div className="space-y-1.5">
                  {initialTargets.map(t => (
                    <div key={t.id} className="flex items-center gap-2 text-[10px]">
                      <span className="w-5 h-5 flex items-center justify-center font-black rounded-sm shrink-0"
                        style={{background:`${RISK_COLORS[t.risk]}20`,color:RISK_COLORS[t.risk],border:`1px solid ${RISK_COLORS[t.risk]}40`}}>
                        {t.priority}
                      </span>
                      <span className="text-[#8ab8d4]">{t.name} — {t.risk} ({t.area})</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-[10px] font-black tracking-[0.12em] text-[#00ff88] mb-3">가용 위성 자산</div>
                <div className="space-y-2">
                  {INIT_SATS.map(s => (
                    <div key={s.id} className="flex items-center gap-3 bg-[#020b18]/50 border border-[#0a3050] p-2.5">
                      <Camera className="w-3.5 h-3.5 text-[#00ff88]" />
                      <div className="flex-1">
                        <div className="text-[11px] font-bold text-white">{s.sat}</div>
                        <div className="text-[9px] text-[#4a7a9b]">{s.coverage} | 해상도 {s.res}</div>
                      </div>
                      <div className="text-[9px] text-[#00ff88]">{s.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <button onClick={start}
              className="mt-6 flex items-center gap-2 px-8 py-3 bg-[#00ff88] text-[#020b18] font-black text-[12px] clip-corner hover:bg-[#33ffaa] transition-colors">
              <Play className="w-4 h-4" /> 정찰 임무 시작
            </button>
          </motion.div>
        )}

        {phase === 'ACTIVE' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-5">
            {/* 표적 목록 */}
            <div className="xl:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-[#00ff88] tracking-[0.12em]">
                  우선 표적 목록 — 대기 {pendingTargets.length} / 분석완료 {analyzed} / 기회손실 {missed}
                </span>
                <button onClick={reset} className="text-[9px] text-[#4a7a9b] hover:text-white border border-[#0a3050] px-3 py-1">
                  <RotateCcw className="w-3 h-3 inline mr-1" />중단
                </button>
              </div>
              <div className="space-y-3">
                {targets.map(t => (
                  <motion.div key={t.id} layout
                    onClick={() => t.taskStatus==='PENDING' && setSelectedTarget(s=>s?.id===t.id?null:t)}
                    className={`clip-corner border p-4 transition-all ${
                      t.taskStatus==='ANALYZED' ? 'border-[#00ff88]/20 opacity-50' :
                      t.taskStatus==='MISSED'   ? 'border-[#ff2d55]/20 opacity-40' :
                      t.taskStatus==='IMAGING'  ? 'border-[#ffcc00]/40 bg-[#ffcc00]/03' :
                      selectedTarget?.id===t.id ? `border-current bg-[#041526]` :
                      'border-[#0a3050] bg-[#041526]/60 hover:border-[#00ff88]/20 cursor-pointer'
                    }`}
                    style={selectedTarget?.id===t.id?{borderColor:`${RISK_COLORS[t.risk]}50`}:{}}>
                    <div className="flex items-start gap-4">
                      {/* 지도 스팟 */}
                      <div className="w-14 h-14 shrink-0 flex items-center justify-center rounded"
                        style={{background:`${RISK_COLORS[t.risk]}10`,border:`1px solid ${RISK_COLORS[t.risk]}30`}}>
                        <Target className="w-6 h-6" style={{color:RISK_COLORS[t.risk]}} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <div>
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-[8px] font-black px-1.5 py-0.5"
                                style={{color:RISK_COLORS[t.risk],background:`${RISK_COLORS[t.risk]}15`}}>
                                {t.risk}
                              </span>
                              <span className="text-[8px] text-[#4a7a9b]">P{t.priority}</span>
                              {t.taskStatus==='ANALYZED' && <CheckCircle className="w-3 h-3 text-[#00ff88]" />}
                              {t.taskStatus==='IMAGING'  && <Eye className="w-3 h-3 text-[#ffcc00] animate-pulse" />}
                              {t.taskStatus==='MISSED'   && <span className="text-[8px] text-[#ff2d55]">기회손실</span>}
                            </div>
                            <div className="text-[14px] font-black text-white">{t.name}</div>
                            <div className="text-[9px] text-[#4a7a9b]">{t.type} | {t.area} | {t.lat}, {t.lng}</div>
                          </div>
                          {t.taskStatus==='PENDING' && (
                            <div className="text-right shrink-0">
                              <div className={`text-[20px] font-black font-mono ${t.timeWindow<=5?'text-[#ff2d55] animate-pulse':t.timeWindow<=10?'text-[#ffcc00]':'text-[#00ff88]'}`}>
                                {t.timeWindow}s
                              </div>
                              <div className="text-[8px] text-[#4a7a9b]">촬영 가능</div>
                            </div>
                          )}
                        </div>
                        {t.taskStatus==='PENDING' && (
                          <div className="h-1 bg-[#0a3050] rounded-full mb-2">
                            <div className="h-full rounded-full transition-all"
                              style={{width:`${(t.timeWindow/t.maxTime)*100}%`,background:t.timeWindow<=5?'#ff2d55':t.timeWindow<=10?'#ffcc00':'#00ff88'}} />
                          </div>
                        )}
                        <div className="text-[9px] text-[#6a9ab8]">변화량: <strong style={{color:RISK_COLORS[t.risk]}}>{t.change}</strong> | 해상도 요구: {t.imgResolution}</div>
                        {(t.taskStatus==='ANALYZED' || t.taskStatus==='IMAGING') && (
                          <div className="mt-2 space-y-0.5">
                            {t.findings.map((f,i) => (
                              <div key={i} className="flex items-start gap-1.5 text-[9px] text-[#6a9ab8]">
                                <span className="text-[#00ff88] shrink-0">›</span>{f}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* 우측: 위성 + 임무 할당 */}
            <div className="space-y-4">
              {/* 위성 상태 */}
              <div className="clip-corner bg-[#041526]/80 border border-[#00ff88]/15 p-4">
                <div className="text-[9px] font-black tracking-[0.12em] text-[#00ff88] mb-3">위성 자산 현황</div>
                <div className="space-y-2">
                  {sats.map(s => (
                    <button key={s.id}
                      onClick={() => s.status==='SCHEDULED' && setSelectedSat(p=>p?.id===s.id?null:s)}
                      disabled={s.status!=='SCHEDULED'}
                      className={`w-full text-left p-2.5 border transition-all clip-corner-sm ${
                        selectedSat?.id===s.id ? 'border-[#00ff88]/50 bg-[#00ff88]/08' :
                        s.status==='SCHEDULED' ? 'border-[#0a3050] hover:border-[#00ff88]/30 cursor-pointer' :
                        'border-[#0a3050] opacity-50 cursor-default'
                      }`}>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          s.status==='COMPLETED'?'bg-[#00ff88]':
                          s.status==='IMAGING'||s.status==='TASKED'?'bg-[#ffcc00] animate-pulse':'bg-[#00d4ff]'
                        }`} />
                        <div className="flex-1">
                          <div className="text-[10px] font-black text-white">{s.sat}</div>
                          <div className="text-[8px] text-[#4a7a9b]">{s.coverage} | {s.res}</div>
                        </div>
                        <span className={`text-[8px] font-black ${
                          s.status==='COMPLETED'?'text-[#00ff88]':
                          s.status==='TASKED'||s.status==='IMAGING'?'text-[#ffcc00]':'text-[#00d4ff]'
                        }`}>
                          {s.status==='SCHEDULED'?'대기':s.status==='TASKED'?'투입됨':s.status==='IMAGING'?'촬영중':'완료'}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 임무 할당 */}
              <AnimatePresence>
                {(selectedSat || selectedTarget) && (
                  <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0}}
                    className="clip-corner bg-[#041526]/90 border border-[#00ff88]/30 p-4">
                    <div className="text-[9px] font-black text-[#00ff88] mb-3">임무 할당</div>
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center gap-2 text-[10px]">
                        <Camera className="w-3 h-3 text-[#00ff88]" />
                        <span className="text-[#4a7a9b]">위성:</span>
                        <span className={selectedSat?'text-[#00ff88] font-bold':'text-[#2a4a6a]'}>
                          {selectedSat?.sat ?? '선택 안됨'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px]">
                        <Target className="w-3 h-3 text-[#ff6b35]" />
                        <span className="text-[#4a7a9b]">표적:</span>
                        <span className={selectedTarget?'text-[#ff6b35] font-bold':'text-[#2a4a6a]'}>
                          {selectedTarget?.name ?? '선택 안됨'}
                        </span>
                      </div>
                    </div>
                    <button onClick={taskSatellite}
                      disabled={!selectedSat||!selectedTarget}
                      className={`w-full flex items-center justify-center gap-2 py-2.5 font-black text-[10px] clip-corner-sm transition-all ${
                        selectedSat&&selectedTarget
                          ? 'bg-[#00ff88] text-[#020b18] hover:bg-[#33ffaa]'
                          : 'bg-[#0a3050] text-[#2a4a6a] cursor-not-allowed'
                      }`}>
                      <Zap className="w-3.5 h-3.5" /> 임무 투입
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* 점수 / 통계 */}
              <div className="clip-corner bg-[#041526]/80 border border-[#00ff88]/15 p-4">
                <div className="text-[9px] font-black text-[#00ff88] mb-3">임무 현황</div>
                <div className="grid grid-cols-3 gap-2">
                  {[{l:'점수',v:score,c:'#ffcc00'},{l:'분석완료',v:analyzed,c:'#00ff88'},{l:'기회손실',v:missed,c:'#ff2d55'}].map(k=>(
                    <div key={k.l} className="text-center bg-[#020b18]/50 border border-[#0a3050] p-2">
                      <div className="text-[8px] text-[#4a7a9b]">{k.l}</div>
                      <div className="text-[18px] font-black" style={{color:k.c}}>{k.v}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 로그 */}
              <div className="clip-corner bg-[#041526]/80 border border-[#00ff88]/15 p-4">
                <div className="text-[9px] font-black text-[#00ff88] mb-2">임무 로그</div>
                <div className="space-y-1 max-h-36 overflow-y-auto">
                  {logs.map((l,i)=>(
                    <div key={i} className="flex gap-1.5 text-[8px]">
                      <span className="text-[#2a4a6a] shrink-0">{l.time}</span>
                      <span className={l.ok?'text-[#00ff88]':'text-[#ff6b35]'}>{l.msg}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {phase === 'RESULT' && (
          <motion.div initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}}
            className="flex items-center justify-center min-h-[50vh]">
            <div className="clip-corner bg-[#041526]/90 border border-[#00ff88]/20 p-10 text-center max-w-lg w-full">
              <Trophy className="w-12 h-12 text-[#ffcc00] mx-auto mb-4" />
              <div className="text-[10px] font-black tracking-[0.2em] text-[#00ff88] mb-1">GEOINT 임무 완료</div>
              <h2 className="text-3xl font-black text-white mb-2">
                {missed===0?'완벽한 정찰':missed<=1?'임무 성공':missed<=2?'부분 성공':'임무 실패'}
              </h2>
              <div className="grid grid-cols-3 gap-3 mb-8">
                {[{l:'최종 점수',v:score,c:'#ffcc00',u:'pt'},{l:'분석 완료',v:analyzed,c:'#00ff88',u:'건'},{l:'기회 손실',v:missed,c:'#ff2d55',u:'건'}].map(k=>(
                  <div key={k.l} className="bg-[#020b18]/50 border border-[#0a3050] p-3">
                    <div className="text-[9px] text-[#4a7a9b]">{k.l}</div>
                    <div className="text-2xl font-black" style={{color:k.c}}>{k.v}<span className="text-sm ml-1">{k.u}</span></div>
                  </div>
                ))}
              </div>
              <button onClick={()=>{reset();setTimeout(start,100)}}
                className="flex items-center gap-2 mx-auto px-6 py-2.5 bg-[#00ff88] text-[#020b18] font-black text-[11px] clip-corner">
                <RotateCcw className="w-4 h-4" /> 재임무
              </button>
            </div>
          </motion.div>
        )}
        </>
        }
      </div>
    </div>
  )
}
