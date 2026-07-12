import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock, ChevronLeft, AlertTriangle, Wifi, Server, Zap, Play, RotateCcw, Trophy, CheckCircle, XCircle, Database, Skull } from 'lucide-react'
import { Link } from 'react-router-dom'
import SolControlBar from '../../components/SolControlBar'
import GisOperationsMap from '../../components/GisOperationsMap'
import WeaponIntelPanel from '../../components/sol/WeaponIntelPanel'
import { useSystem } from '../../contexts/SystemContext'
import { WEAPONS, ORIGIN_KO, type WeaponSystem } from '../../data/weapons'

// ── 타입 ──────────────────────────────────────────────────────────────────────
type AttackType = 'SQLI' | 'DDOS' | 'ZERODAY' | 'RANSOMWARE' | 'APT' | 'PHISHING'
type Response   = 'BLOCK' | 'ISOLATE' | 'PATCH' | 'COUNTER' | 'ANALYZE'
type Phase      = 'STANDBY' | 'ACTIVE' | 'RESULT'

interface CyberAttack {
  id: string
  type: AttackType
  src: string
  target: string
  severity: 'CRITICAL' | 'HIGH' | 'MED' | 'LOW'
  timeLeft: number
  maxTime: number
  resolved: boolean
  failed: boolean
  label: string
  correctResponses: Response[]
  hint: string
  attacker?: WeaponSystem
}

interface NodeStatus {
  id: string; label: string; x: number; y: number
  health: number; maxHealth: number; online: boolean; underAttack: boolean
}

const ATTACK_TEMPLATES: Record<AttackType, Omit<CyberAttack,'id'|'src'|'target'|'timeLeft'|'resolved'|'failed'>> = {
  SQLI:       { type:'SQLI',       severity:'HIGH',     maxTime:12, label:'SQL Injection',    correctResponses:['BLOCK','PATCH'],     hint:'데이터베이스 쿼리 무결성 위반' },
  DDOS:       { type:'DDOS',       severity:'HIGH',     maxTime:10, label:'DDoS 플러딩',      correctResponses:['BLOCK','ISOLATE'],   hint:'초당 200Gbps 트래픽 급증' },
  ZERODAY:    { type:'ZERODAY',    severity:'CRITICAL', maxTime:8,  label:'Zero-Day 익스플로잇', correctResponses:['ISOLATE','PATCH'],  hint:'미패치 취약점 CVE-2025-XXXX' },
  RANSOMWARE: { type:'RANSOMWARE', severity:'CRITICAL', maxTime:7,  label:'랜섬웨어',          correctResponses:['ISOLATE','BLOCK'],   hint:'파일 암호화 진행 중' },
  APT:        { type:'APT',        severity:'CRITICAL', maxTime:15, label:'APT 침투',          correctResponses:['ANALYZE','COUNTER'], hint:'지속적 지능형 위협 탐지' },
  PHISHING:   { type:'PHISHING',   severity:'MED',      maxTime:15, label:'스피어 피싱',       correctResponses:['BLOCK','ANALYZE'],   hint:'첨부파일 실행 탐지' },
}

const SEV_COLORS: Record<string, string> = { CRITICAL:'#ff2d55', HIGH:'#ff6b35', MED:'#ffcc00', LOW:'#00ff88' }

const SRCS = ['185.220.101.x','45.142.212.x','91.108.4.x','104.244.76.x','51.15.43.x','192.42.116.x','103.85.24.x']
const TARGETS = ['국방인트라넷','VPN Gateway','지휘통신망','작전데이터DB','메일 서버','위성제어시스템','AI 분석 코어']

const RESPONSES: { id: Response; label: string; color: string; desc: string }[] = [
  { id:'BLOCK',    label:'차단',      color:'#00ff88', desc:'트래픽 및 접속 즉시 차단' },
  { id:'ISOLATE',  label:'격리',      color:'#ff6b35', desc:'감염 시스템 네트워크 분리' },
  { id:'PATCH',    label:'패치',      color:'#00d4ff', desc:'취약점 긴급 패치 적용' },
  { id:'COUNTER',  label:'역추적',    color:'#c084fc', desc:'공격 출처 추적 및 반격' },
  { id:'ANALYZE',  label:'심층분석',  color:'#ffcc00', desc:'악성코드 역공학 분석' },
]

const INIT_NODES: NodeStatus[] = [
  { id:'FW',      label:'외부 방화벽',  x:50,  y:10, health:100, maxHealth:100, online:true,  underAttack:false },
  { id:'IDS',     label:'IDS/IPS',      x:50,  y:28, health:100, maxHealth:100, online:true,  underAttack:false },
  { id:'DMZ',     label:'DMZ',          x:50,  y:46, health:100, maxHealth:100, online:true,  underAttack:false },
  { id:'VPN',     label:'VPN GW',       x:20,  y:38, health:100, maxHealth:100, online:true,  underAttack:false },
  { id:'INTRA',   label:'내부망',        x:80,  y:38, health:100, maxHealth:100, online:true,  underAttack:false },
  { id:'DB',      label:'작전 DB',       x:30,  y:60, health:100, maxHealth:100, online:true,  underAttack:false },
  { id:'AI',      label:'AI 코어',       x:70,  y:60, health:100, maxHealth:100, online:true,  underAttack:false },
]

const WAVE_DEF = [
  { attacks:2, types:['SQLI','DDOS'] as AttackType[] },
  { attacks:3, types:['PHISHING','DDOS','ZERODAY'] as AttackType[] },
  { attacks:3, types:['RANSOMWARE','APT','SQLI'] as AttackType[] },
  { attacks:4, types:['APT','ZERODAY','RANSOMWARE','DDOS'] as AttackType[] },
]

const now = () => new Date().toLocaleTimeString('ko-KR',{hour12:false,hour:'2-digit',minute:'2-digit',second:'2-digit'})

function genAttack(type: AttackType, threatPool: WeaponSystem[]): CyberAttack {
  const t = ATTACK_TEMPLATES[type]
  const matching = threatPool.filter(w => w.threatRating === t.severity)
  const pool = matching.length > 0 ? matching : threatPool
  const attacker = pool.length > 0 ? pool[Math.floor(Math.random() * pool.length)] : undefined
  return {
    ...t,
    id: `ATK-${Date.now()}-${Math.random()}`,
    src: SRCS[Math.floor(Math.random()*SRCS.length)],
    target: TARGETS[Math.floor(Math.random()*TARGETS.length)],
    timeLeft: t.maxTime,
    resolved: false,
    failed: false,
    attacker,
  }
}

export default function Sol02() {
  const [mainTab, setMainTab] = useState<'sim'|'ops'|'db'>('sim')
  const sys = useSystem()
  const mod = sys.modules.sol02

  // DB 연동 — 사이버 위협행위자 (CYBER 카테고리, 적대국 출처)
  const cyberThreats = useMemo(() =>
    WEAPONS.filter(w => w.category === 'CYBER' && ['DPRK', 'RUSSIA', 'CHINA', 'IRAN'].includes(w.origin)),
  [])
  const topCyberThreats = useMemo(() =>
    cyberThreats.filter(w => w.threatRating === 'CRITICAL' || w.threatRating === 'HIGH').slice(0, 6),
  [cyberThreats])
  const [phase, setPhase] = useState<Phase>('STANDBY')
  const [wave, setWave]   = useState(0)
  const [attacks, setAttacks] = useState<CyberAttack[]>([])
  const [nodes, setNodes] = useState<NodeStatus[]>(INIT_NODES.map(n=>({...n})))
  const [score, setScore] = useState(0)
  const [blocked, setBlocked] = useState(0)
  const [failed, setFailed] = useState(0)
  const [selected, setSelected] = useState<CyberAttack|null>(null)
  const [systemDmg, setSystemDmg] = useState(0)
  const [logs, setLogs] = useState<{time:string;msg:string;ok:boolean}[]>([])
  const tickRef = useRef<ReturnType<typeof setInterval>|null>(null)

  const addLog = useCallback((msg:string, ok:boolean) => {
    setLogs(l => [{time:now(),msg,ok},...l].slice(0,25))
  }, [])

  const spawnWave = useCallback((waveIdx: number) => {
    const cfg = WAVE_DEF[waveIdx]
    if (!cfg) return
    const newAtks = cfg.types.slice(0,cfg.attacks).map(t => genAttack(t, cyberThreats))
    setAttacks(prev => [...prev, ...newAtks])
    addLog(`Wave ${waveIdx+1}: ${cfg.attacks}건의 사이버 공격 감지됨`, false)
  }, [addLog, cyberThreats])

  const start = () => {
    setPhase('ACTIVE'); setWave(0)
    setAttacks([]); setNodes(INIT_NODES.map(n=>({...n})))
    setScore(0); setBlocked(0); setFailed(0); setSystemDmg(0); setLogs([])
    setTimeout(() => spawnWave(0), 1000)
  }

  const reset = () => {
    setPhase('STANDBY'); setAttacks([]); setNodes(INIT_NODES.map(n=>({...n})))
    setScore(0); setBlocked(0); setFailed(0); setSystemDmg(0)
    setLogs([]); setSelected(null)
    if (tickRef.current) clearInterval(tickRef.current)
  }

  const respond = (response: Response) => {
    if (!selected) return
    const isCorrect = selected.correctResponses.includes(response)
    const pts = isCorrect ? (selected.severity==='CRITICAL'?200:selected.severity==='HIGH'?120:60) : -30
    setScore(s => Math.max(0, s+pts))
    if (isCorrect) {
      setBlocked(b => b+1)
      addLog(`✓ [${selected.label}] ${RESPONSES.find(r=>r.id===response)?.label} 조치 — 차단 성공`, true)
    } else {
      addLog(`✗ [${selected.label}] 잘못된 조치 — 부분 차단`, false)
    }
    setAttacks(prev => prev.map(a => a.id===selected.id ? {...a, resolved:true} : a))
    setSelected(null)
  }

  // 타이머 틱
  useEffect(() => {
    if (phase !== 'ACTIVE') return
    tickRef.current = setInterval(() => {
      setAttacks(prev => {
        const updated = prev.map(a => {
          if (a.resolved || a.failed) return a
          const newTime = a.timeLeft - 1
          if (newTime <= 0) {
            const dmg = a.severity==='CRITICAL'?20:a.severity==='HIGH'?12:6
            setSystemDmg(d => Math.min(100, d+dmg))
            setFailed(f => f+1)
            setScore(s => Math.max(0, s-50))
            addLog(`⚠ [${a.label}] 대응 실패 — 시스템 피해 ${dmg}%`, false)
            // 노드 피해
            setNodes(ns => ns.map(n => {
              if (n.label === a.target || Math.random()<0.3) {
                return { ...n, health: Math.max(0, n.health-dmg), underAttack:true }
              }
              return n
            }))
            return { ...a, failed:true, timeLeft:0 }
          }
          return { ...a, timeLeft: newTime }
        })
        return updated
      })
    }, 1000)
    return () => { if (tickRef.current) clearInterval(tickRef.current) }
  }, [phase, addLog])

  // 노드 underAttack 리셋
  useEffect(() => {
    const id = setInterval(() => {
      setNodes(ns => ns.map(n => ({ ...n, underAttack: false })))
    }, 2000)
    return () => clearInterval(id)
  }, [])

  // 웨이브 전환
  useEffect(() => {
    if (phase !== 'ACTIVE') return
    const active = attacks.filter(a => !a.resolved && !a.failed)
    if (active.length === 0 && attacks.length > 0) {
      const next = wave + 1
      if (next < WAVE_DEF.length) {
        const t = setTimeout(() => { setWave(next); setAttacks([]); spawnWave(next) }, 3000)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setPhase('RESULT'), 1500)
        return () => clearTimeout(t)
      }
    }
  }, [attacks, wave, phase, spawnWave])

  const activeAtks = attacks.filter(a => !a.resolved && !a.failed)
  const totalNodes = nodes.length
  const onlineNodes = nodes.filter(n => n.health > 0).length

  return (
    <div className="min-h-screen bg-[#020b18] pt-3 pb-16 md:pt-4 md:pb-20">
      <div className="max-w-[1600px] mx-auto px-6">
        <SolControlBar moduleId="sol02" />
        <div className="flex items-center gap-3 mb-5">
          <Link to="/command" className="flex items-center gap-1.5 text-[10px] font-bold text-[#4a7a9b] hover:text-[#00d4ff] transition-colors">
            <ChevronLeft className="w-3.5 h-3.5" /> 지휘 센터
          </Link>
          <div className="w-px h-4 bg-[#0a3050]" />
          <Lock className="w-4 h-4 text-[#ff2d55]" />
          <h1 className="text-lg md:text-xl font-black text-white">SOL-02 <span className="text-[#ff2d55]">사이버 방어</span></h1>
        </div>

        {/* 모드 탭 */}
        <div className="flex gap-1 mb-5 border-b border-[#0a3050] pb-0 overflow-x-auto">
          {([{ id:'sim' as const, label:'시뮬레이션' }, { id:'ops' as const, label:'GIS 운영 지도' }, { id:'db' as const, label:'위협행위자 인텔리전스' }]).map(({id,label})=>(
            <button key={id} onClick={()=>setMainTab(id)}
              className={mainTab===id?'flex items-center px-4 py-2.5 text-[10px] font-black border-b-2 border-[#ff2d55] text-[#ff2d55] -mb-px whitespace-nowrap':'flex items-center px-4 py-2.5 text-[10px] font-black border-b-2 border-transparent text-[#4a7a9b] -mb-px whitespace-nowrap'}>
              {label}
            </button>
          ))}
        </div>

        {mainTab==='ops' && (
          <GisOperationsMap solId="sol02" title="SOL-02 사이버 방어 운영 지도"
            activeLayers={['SAM','EW','INTEL']} color="#ff2d55" />
        )}

        {mainTab==='db' && (
          <WeaponIntelPanel title="사이버 위협행위자 DB" color="#ff2d55" categories={['CYBER']}
            defaultOrigin="DPRK" originOptions={['ALL','DPRK','RUSSIA','CHINA','IRAN','USA','ROK','NATO']} />
        )}

        {mainTab==='sim' && <>

        {phase === 'STANDBY' && (
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="space-y-5">
            <div className="clip-corner bg-[#041526]/80 border border-[#ff2d55]/20 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Wifi className="w-4 h-4 text-[#ff2d55]" />
                <span className="text-[11px] font-black tracking-[0.2em] text-[#ff2d55]">사이버 방어 훈련 브리핑</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-2xl font-black text-white mb-2">사이버 공격 격퇴 작전</h2>
                  <p className="text-[12px] text-[#8ab8d4] leading-relaxed mb-4">
                    적 해커 그룹이 4개 파 연속 사이버 공격을 감행합니다.
                    각 공격 유형에 맞는 올바른 대응 조치(차단·격리·패치·역추적·분석)를 선택해
                    방어 시스템을 지키십시오. 대응 시간이 초과되면 시스템이 피해를 입습니다.
                  </p>
                  <div className="space-y-1.5">
                    {WAVE_DEF.map((w,i) => (
                      <div key={i} className="flex items-center gap-2 text-[10px]">
                        <span className="w-5 h-5 bg-[#ff2d55]/15 border border-[#ff2d55]/30 flex items-center justify-center text-[#ff2d55] font-black">{i+1}</span>
                        <span className="text-[#8ab8d4]">{w.attacks}건 동시 공격 — {w.types.join(', ')}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-black tracking-[0.12em] text-[#ff2d55] mb-3">대응 옵션</div>
                  <div className="space-y-2">
                    {RESPONSES.map(r => (
                      <div key={r.id} className="flex items-start gap-2 bg-[#020b18]/50 border border-[#0a3050] p-2.5">
                        <div className="w-2 h-2 rounded-full mt-1 shrink-0" style={{background:r.color}} />
                        <div>
                          <div className="text-[10px] font-black" style={{color:r.color}}>{r.label}</div>
                          <div className="text-[9px] text-[#4a7a9b]">{r.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <button onClick={start}
                className="mt-6 flex items-center gap-2 px-8 py-3 bg-[#ff2d55] text-white font-black text-[12px] tracking-[0.12em] clip-corner hover:bg-[#ff4466] transition-colors">
                <Play className="w-4 h-4" /> 사이버 방어 훈련 시작
              </button>
            </div>

            {/* DB 연동 — 실시간 사이버 위협 행위자 */}
            <div className="clip-corner bg-[#041526]/80 border border-[#ff2d55]/20 p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Skull className="w-3.5 h-3.5 text-[#ff2d55]" />
                  <span className="text-[10px] font-black tracking-[0.15em] text-[#ff2d55]">DB 연동 — 주요 사이버 위협 행위자 ({cyberThreats.length}종)</span>
                </div>
                <button onClick={() => setMainTab('db')} className="text-[9px] text-[#00d4ff] hover:underline">전체 보기 →</button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                {topCyberThreats.map(w => {
                  const tc = w.threatRating === 'CRITICAL' ? '#ff2d55' : '#ff6b35'
                  return (
                    <div key={w.id} className="text-left bg-[#020b18]/60 border border-[#ff2d55]/20 p-2.5">
                      <div className="text-[9px] font-black mb-1 leading-tight" style={{ color: tc }}>{w.name}</div>
                      <div className="text-[8px] text-[#4a7a9b] mb-1">{ORIGIN_KO[w.origin] ?? w.origin}</div>
                      <div className="mt-1 text-[7px] font-black px-1 py-0.5 inline-block border" style={{ color: tc, borderColor: `${tc}50` }}>{w.threatRating}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )}

        {phase === 'ACTIVE' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4">
            {/* 네트워크 토폴로지 */}
            <div className="xl:col-span-1">
              <div className="clip-corner bg-[#041526]/80 border border-[#ff2d55]/15 p-4 mb-4">
                <div className="text-[9px] font-black tracking-[0.12em] text-[#ff2d55] mb-3">네트워크 현황</div>
                <div className="relative" style={{height:220}}>
                  <svg viewBox="0 0 100 80" className="w-full h-full">
                    {/* 연결선 */}
                    {[['FW','IDS'],['IDS','DMZ'],['DMZ','VPN'],['DMZ','INTRA'],['VPN','DB'],['INTRA','AI']].map(([a,b]) => {
                      const n1 = nodes.find(n=>n.id===a)!
                      const n2 = nodes.find(n=>n.id===b)!
                      return <line key={`${a}-${b}`} x1={n1.x} y1={n1.y} x2={n2.x} y2={n2.y}
                        stroke="#00d4ff" strokeOpacity="0.2" strokeWidth="0.5" />
                    })}
                    {nodes.map(n => (
                      <g key={n.id}>
                        {n.underAttack && <circle cx={n.x} cy={n.y} r={8} fill="none" stroke="#ff2d55" strokeWidth="0.8" strokeOpacity="0.6" className="animate-pulse" />}
                        <circle cx={n.x} cy={n.y} r={5}
                          fill={n.health<=0?'#2a2a2a':n.underAttack?'#ff2d55':`#00d4ff`}
                          fillOpacity="0.2"
                          stroke={n.health<=0?'#2a2a2a':n.underAttack?'#ff2d55':'#00d4ff'}
                          strokeWidth="0.8" />
                        <text x={n.x} y={n.y+1.5} textAnchor="middle" fontSize="3.5"
                          fill={n.health<=0?'#4a7a9b':'white'} fontWeight="bold">
                          {n.id}
                        </text>
                        <text x={n.x} y={n.y+10} textAnchor="middle" fontSize="3"
                          fill={n.health<=0?'#ff2d55':'#4a7a9b'}>{n.label}</text>
                      </g>
                    ))}
                  </svg>
                </div>
                <div className="text-[8px] text-[#4a7a9b] mt-1">노드 상태: {onlineNodes}/{totalNodes} 온라인</div>
              </div>

              {/* 시스템 피해 */}
              <div className="clip-corner bg-[#041526]/80 border border-[#ff2d55]/15 p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[9px] font-black text-[#ff2d55]">시스템 피해도</span>
                  <span className="text-[12px] font-black" style={{color:systemDmg>60?'#ff2d55':systemDmg>30?'#ffcc00':'#00ff88'}}>{systemDmg}%</span>
                </div>
                <div className="h-2 bg-[#0a3050] rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all"
                    style={{width:`${systemDmg}%`, background:systemDmg>60?'#ff2d55':systemDmg>30?'#ffcc00':'#00ff88'}} />
                </div>
                <div className="grid grid-cols-3 gap-2 mt-3">
                  {[{l:'차단',v:blocked,c:'#00ff88'},{l:'실패',v:failed,c:'#ff2d55'},{l:'점수',v:score,c:'#ffcc00'}].map(k=>(
                    <div key={k.l} className="text-center">
                      <div className="text-[9px] text-[#4a7a9b]">{k.l}</div>
                      <div className="text-[15px] font-black" style={{color:k.c}}>{k.v}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 로그 */}
              <div className="clip-corner bg-[#041526]/80 border border-[#ff2d55]/15 p-4">
                <div className="text-[9px] font-black text-[#ff2d55] mb-2">방어 로그</div>
                <div className="space-y-1 max-h-40 overflow-y-auto">
                  {logs.map((l,i)=>(
                    <div key={i} className="flex gap-1.5 text-[8px]">
                      <span className="text-[#2a4a6a] shrink-0">{l.time}</span>
                      <span className={l.ok?'text-[#00ff88]':'text-[#ff6b35]'}>{l.msg}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 공격 큐 + 대응 패널 */}
            <div className="xl:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-[#ff2d55] tracking-[0.12em]">
                  WAVE {wave+1} — 활성 공격 {activeAtks.length}건
                </span>
                <button onClick={reset} className="text-[9px] text-[#4a7a9b] hover:text-white border border-[#0a3050] px-3 py-1">
                  <RotateCcw className="w-3 h-3 inline mr-1" />중단
                </button>
              </div>

              {/* 공격 카드 */}
              <div className="grid grid-cols-1 gap-3">
                <AnimatePresence>
                  {attacks.map(atk => (
                    <motion.div key={atk.id}
                      initial={{opacity:0,y:10}} animate={{opacity:1,y:0}}
                      exit={{opacity:0,scale:0.9}}
                      onClick={() => !atk.resolved && !atk.failed && setSelected(s=>s?.id===atk.id?null:atk)}
                      className={`clip-corner border p-4 cursor-pointer transition-all ${
                        atk.resolved ? 'border-[#00ff88]/20 opacity-40' :
                        atk.failed   ? 'border-[#ff2d55]/20 opacity-40' :
                        selected?.id===atk.id ? 'border-[#ff2d55]/50 bg-[#ff2d55]/05' :
                        'border-[#0a3050] bg-[#041526]/60 hover:border-[#ff2d55]/30'
                      }`}>
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-[8px] font-black px-1.5 py-0.5"
                              style={{color:SEV_COLORS[atk.severity],background:`${SEV_COLORS[atk.severity]}15`}}>
                              {atk.severity}
                            </span>
                            {atk.resolved && <CheckCircle className="w-3 h-3 text-[#00ff88]" />}
                            {atk.failed && <XCircle className="w-3 h-3 text-[#ff2d55]" />}
                          </div>
                          <div className="text-[12px] font-black text-white">{atk.label}</div>
                        </div>
                        {!atk.resolved && !atk.failed && (
                          <div className={`text-[14px] font-black font-mono ${atk.timeLeft<=3?'text-[#ff2d55] animate-pulse':'text-[#ffcc00]'}`}>
                            {atk.timeLeft}s
                          </div>
                        )}
                      </div>
                      {!atk.resolved && !atk.failed && (
                        <div className="h-1 bg-[#0a3050] rounded-full mb-2">
                          <div className="h-full rounded-full transition-all"
                            style={{
                              width:`${(atk.timeLeft/atk.maxTime)*100}%`,
                              background: atk.timeLeft<=3?'#ff2d55':atk.timeLeft<=6?'#ffcc00':'#00ff88'
                            }} />
                        </div>
                      )}
                      <div className="text-[9px] text-[#4a7a9b]">출처 IP: {atk.src}</div>
                      <div className="text-[9px] text-[#4a7a9b]">표적: {atk.target}</div>
                      {atk.attacker && (
                        <div className="text-[9px] mt-1 flex items-center gap-1">
                          <Database className="w-2.5 h-2.5 text-[#ff2d55]/70 shrink-0" />
                          <span className="text-[#ff6b35]">DB 매칭: <b>{atk.attacker.name}</b> ({ORIGIN_KO[atk.attacker.origin] ?? atk.attacker.origin})</span>
                        </div>
                      )}
                      <div className="text-[9px] text-[#8ab8d4] mt-1">힌트: {atk.hint}</div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {activeAtks.length === 0 && attacks.length > 0 && (
                  <div className="col-span-2 text-center py-8 text-[11px] text-[#00ff88]">
                    <CheckCircle className="w-8 h-8 mx-auto mb-2" />
                    웨이브 완료 — 다음 웨이브 준비 중...
                  </div>
                )}
              </div>

              {/* 대응 패널 */}
              <AnimatePresence>
                {selected && (
                  <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}}
                    className="clip-corner bg-[#041526]/90 border border-[#ff2d55]/30 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="text-[8px] text-[#4a7a9b]">대응 조치 선택</div>
                        <div className="text-[13px] font-black text-white">{selected.label}</div>
                      </div>
                      <span className="text-[10px] text-[#4a7a9b]">남은 시간: {selected.timeLeft}s</span>
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                      {RESPONSES.map(r => (
                        <button key={r.id} onClick={() => respond(r.id)}
                          className="flex flex-col items-center gap-1 py-3 border transition-all hover:scale-105 clip-corner-sm"
                          style={{borderColor:`${r.color}40`,background:`${r.color}08`}}>
                          <Zap className="w-4 h-4" style={{color:r.color}} />
                          <span className="text-[9px] font-black" style={{color:r.color}}>{r.label}</span>
                          <span className="text-[7px] text-[#4a7a9b] text-center leading-tight">{r.desc}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {!selected && activeAtks.length > 0 && (
                <div className="text-center py-4 text-[10px] text-[#4a7a9b]">
                  <AlertTriangle className="w-4 h-4 mx-auto mb-1 text-[#ffcc00]" />
                  공격 카드를 클릭하여 대응 조치를 선택하십시오
                </div>
              )}
            </div>
          </div>
        )}

        {phase === 'RESULT' && (
          <motion.div initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}}
            className="flex items-center justify-center min-h-[50vh]">
            <div className="clip-corner bg-[#041526]/90 border border-[#ff2d55]/20 p-10 text-center max-w-lg w-full">
              <Trophy className="w-12 h-12 text-[#ffcc00] mx-auto mb-4" />
              <div className="text-[10px] font-black tracking-[0.2em] text-[#ff2d55] mb-1">사이버 방어 훈련 종료</div>
              <h2 className="text-3xl font-black text-white mb-2">
                {systemDmg<20?'완벽 방어':systemDmg<50?'방어 성공':systemDmg<80?'부분 실패':'시스템 붕괴'}
              </h2>
              <div className={`text-base font-bold mb-6 ${systemDmg<20?'text-[#00ff88]':systemDmg<50?'text-[#ffcc00]':'text-[#ff2d55]'}`}>
                시스템 피해도: {systemDmg}%
              </div>
              <div className="grid grid-cols-3 gap-3 mb-8">
                {[{l:'최종 점수',v:score,c:'#ffcc00',u:'pt'},{l:'차단 성공',v:blocked,c:'#00ff88',u:'건'},{l:'대응 실패',v:failed,c:'#ff2d55',u:'건'}].map(k=>(
                  <div key={k.l} className="bg-[#020b18]/50 border border-[#0a3050] p-3">
                    <div className="text-[9px] text-[#4a7a9b]">{k.l}</div>
                    <div className="text-2xl font-black" style={{color:k.c}}>{k.v}<span className="text-sm ml-1">{k.u}</span></div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center gap-3">
                <button onClick={() => { reset(); setTimeout(start,100) }}
                  className="flex items-center gap-2 px-6 py-2.5 bg-[#ff2d55] text-white font-black text-[11px] clip-corner hover:bg-[#ff4466] transition-colors">
                  <RotateCcw className="w-4 h-4" /> 재훈련
                </button>
                <Link to="/command" className="flex items-center gap-2 px-6 py-2.5 border border-[#0a3050] text-[#8ab8d4] font-black text-[11px] clip-corner hover:border-[#00d4ff]/30 transition-colors">
                  <Server className="w-4 h-4" /> 지휘 센터
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        {!mod?.active && phase === 'STANDBY' && (
          <div className="mt-4 flex items-center gap-2 text-[10px] text-[#ffcc00] border border-[#ffcc00]/20 p-3">
            <AlertTriangle className="w-3.5 h-3.5" />
            SOL-02 모듈 비활성. <Link to="/control" className="underline">제어 센터</Link>에서 활성화하세요.
          </div>
        )}
        </>}
      </div>
    </div>
  )
}
