import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, ChevronLeft, Radar, Target, AlertTriangle, Play, RotateCcw, Trophy, Map } from 'lucide-react'
import { Link } from 'react-router-dom'
import SolControlBar from '../../components/SolControlBar'
import { useSystem } from '../../contexts/SystemContext'
import GisOperationsMap from '../../components/GisOperationsMap'

// ── 타입 ──────────────────────────────────────────────────────────────────────
type UnitType = 'MLRS' | 'TANK' | 'UAV' | 'MISSILE' | 'AIRCRAFT'
type DefType  = 'PATRIOT' | 'KDRASS' | 'F35' | 'ARTILLERY'
type Phase    = 'STANDBY' | 'ACTIVE' | 'RESULT'

interface EnemyUnit {
  id: string; type: UnitType; x: number; y: number
  hp: number; maxHp: number; speed: number
  label: string; threat: number; engaged: boolean
}

interface DefUnit {
  id: string; type: DefType; x: number; y: number
  label: string; ammo: number; maxAmmo: number
  cooldown: number; range: number; color: string
}

interface BattleLog {
  time: string; msg: string; type: 'INTERCEPT' | 'BREACH' | 'DEPLOY' | 'WARN'
}

// ── 상수 ──────────────────────────────────────────────────────────────────────
const GRID_COLS = 24
const GRID_ROWS = 16
const CELL_SIZE_DESKTOP = 38
const CELL_SIZE_MOBILE  = 26
const isMobile = () => typeof window !== 'undefined' && window.innerWidth < 768
const CELL_SIZE = isMobile() ? CELL_SIZE_MOBILE : CELL_SIZE_DESKTOP

const ENEMY_TEMPLATES: Record<UnitType, Omit<EnemyUnit,'id'|'x'|'y'|'engaged'>> = {
  MLRS:     { type:'MLRS',     hp:2,  maxHp:2,  speed:1, label:'이동식발사대', threat:10 },
  TANK:     { type:'TANK',     hp:4,  maxHp:4,  speed:0.7, label:'전차',     threat:7  },
  UAV:      { type:'UAV',      hp:1,  maxHp:1,  speed:2, label:'드론',      threat:5  },
  MISSILE:  { type:'MISSILE',  hp:1,  maxHp:1,  speed:3, label:'탄도미사일', threat:15 },
  AIRCRAFT: { type:'AIRCRAFT', hp:2,  maxHp:2,  speed:2.5, label:'전투기',   threat:8  },
}

const DEF_TEMPLATES: DefUnit[] = [
  { id:'PAT-1', type:'PATRIOT',   x:8,  y:14, label:'패트리엇',  ammo:8,  maxAmmo:8,  cooldown:0, range:6, color:'#00d4ff' },
  { id:'PAT-2', type:'PATRIOT',   x:16, y:14, label:'패트리엇',  ammo:8,  maxAmmo:8,  cooldown:0, range:6, color:'#00d4ff' },
  { id:'KDR-1', type:'KDRASS',    x:4,  y:13, label:'천궁-II',  ammo:12, maxAmmo:12, cooldown:0, range:4, color:'#00ff88' },
  { id:'KDR-2', type:'KDRASS',    x:12, y:13, label:'천궁-II',  ammo:12, maxAmmo:12, cooldown:0, range:4, color:'#00ff88' },
  { id:'KDR-3', type:'KDRASS',    x:20, y:13, label:'천궁-II',  ammo:12, maxAmmo:12, cooldown:0, range:4, color:'#00ff88' },
  { id:'F35-1', type:'F35',       x:6,  y:15, label:'F-35',     ammo:4,  maxAmmo:4,  cooldown:0, range:8, color:'#c084fc' },
  { id:'F35-2', type:'F35',       x:18, y:15, label:'F-35',     ammo:4,  maxAmmo:4,  cooldown:0, range:8, color:'#c084fc' },
  { id:'ART-1', type:'ARTILLERY', x:11, y:15, label:'K9 자주포', ammo:20, maxAmmo:20, cooldown:0, range:5, color:'#ffcc00' },
]

const WAVE_CONFIGS = [
  { wave:1, label:'1파: 드론 정찰',    units:[{type:'UAV' as UnitType,count:4},{type:'UAV' as UnitType,count:2}]  },
  { wave:2, label:'2파: 이동식발사대', units:[{type:'MLRS' as UnitType,count:2},{type:'UAV' as UnitType,count:3}]  },
  { wave:3, label:'3파: 기갑+항공',    units:[{type:'TANK' as UnitType,count:3},{type:'AIRCRAFT' as UnitType,count:2}] },
  { wave:4, label:'4파: 탄도미사일',   units:[{type:'MISSILE' as UnitType,count:3},{type:'MLRS' as UnitType,count:2},{type:'UAV' as UnitType,count:4}] },
  { wave:5, label:'5파: 총공세',       units:[{type:'MISSILE' as UnitType,count:4},{type:'AIRCRAFT' as UnitType,count:3},{type:'TANK' as UnitType,count:3},{type:'MLRS' as UnitType,count:2}] },
]

const UNIT_ICONS: Record<UnitType, string>  = { MLRS:'🚀', TANK:'🛡', UAV:'✈', MISSILE:'⚡', AIRCRAFT:'🛩' }
const THREAT_COLORS: Record<UnitType, string> = {
  MLRS:'#ff2d55', TANK:'#ff6b35', UAV:'#ffcc00', MISSILE:'#ff2d55', AIRCRAFT:'#ff6b35',
}

function genEnemyUnit(type: UnitType, wave: number): EnemyUnit {
  const tpl = ENEMY_TEMPLATES[type]
  return {
    ...tpl,
    id: `E-${Date.now()}-${Math.random()}`,
    x: Math.floor(Math.random() * (GRID_COLS - 2)) + 1,
    y: 0,
    hp: tpl.hp + Math.floor(wave / 2),
    maxHp: tpl.hp + Math.floor(wave / 2),
    engaged: false,
  }
}

const now = () => new Date().toLocaleTimeString('ko-KR', { hour12:false, hour:'2-digit', minute:'2-digit', second:'2-digit' })

// ── 상세 패널 ─────────────────────────────────────────────────────────────────
const SENSOR_FEEDS = [
  { id:'RADAR-A4', type:'지상 레이더', status:'ACTIVE',   signal:92 },
  { id:'SAT-KS12', type:'위성 광학',   status:'ACTIVE',   signal:87 },
  { id:'DRONE-T7', type:'무인기',       status:'SCANNING', signal:74 },
  { id:'EW-NODE3', type:'전자전 센서', status:'ACTIVE',   signal:96 },
  { id:'ACC-B2',   type:'음향 센서',   status:'STANDBY',  signal:45 },
  { id:'IR-C9',    type:'적외선',       status:'ACTIVE',   signal:88 },
]

export default function Sol01() {
  const sys = useSystem()
  const mod = sys.modules.sol01
  const [phase, setPhase] = useState<Phase>('STANDBY')
  const [wave, setWave]   = useState(0)
  const [enemies, setEnemies] = useState<EnemyUnit[]>([])
  const [defenses, setDefenses] = useState<DefUnit[]>(DEF_TEMPLATES.map(d => ({ ...d })))
  const [selected, setSelected] = useState<DefUnit | null>(null)
  const [logs, setLogs]   = useState<BattleLog[]>([])
  const [score, setScore] = useState(0)
  const [breached, setBreached] = useState(0)
  const [intercepts, setIntercepts] = useState(0)
  const [explosions, setExplosions] = useState<{id:string;x:number;y:number}[]>([])
  const tickRef = useRef<ReturnType<typeof setInterval>|null>(null)
  const addLog = useCallback((msg: string, type: BattleLog['type']) => {
    setLogs(l => [{ time: now(), msg, type }, ...l].slice(0, 30))
  }, [])

  const spawnWave = useCallback((waveIdx: number) => {
    const cfg = WAVE_CONFIGS[waveIdx]
    if (!cfg) return
    const units: EnemyUnit[] = []
    cfg.units.forEach(({ type, count }) => {
      for (let i = 0; i < count; i++) units.push(genEnemyUnit(type, waveIdx + 1))
    })
    setEnemies(prev => [...prev, ...units])
    addLog(`${cfg.label} 진입 — ${units.length}개 표적`, 'WARN')
  }, [addLog])

  const startSimulation = () => {
    setPhase('ACTIVE')
    setWave(0)
    setEnemies([])
    setDefenses(DEF_TEMPLATES.map(d => ({ ...d })))
    setLogs([])
    setScore(0); setBreached(0); setIntercepts(0)
    setExplosions([])
    addLog('가상전투 시뮬레이션 시작 — 전 방어시스템 ONLINE', 'DEPLOY')
    setTimeout(() => spawnWave(0), 1500)
  }

  const resetSim = () => {
    setPhase('STANDBY')
    setWave(0); setEnemies([]); setLogs([])
    setScore(0); setBreached(0); setIntercepts(0)
    setExplosions([]); setSelected(null)
    if (tickRef.current) clearInterval(tickRef.current)
  }

  // 방어 유닛 클릭 → 표적 지정 자동 교전
  const handleDefClick = (def: DefUnit) => {
    setSelected(prev => prev?.id === def.id ? null : def)
  }

  // 적 유닛 클릭 → 선택된 방어 유닛이 공격
  const handleEnemyClick = (enemy: EnemyUnit) => {
    if (!selected || selected.ammo <= 0 || selected.cooldown > 0) return
    const dist = Math.hypot(enemy.x - selected.x, enemy.y - selected.y)
    if (dist > selected.range) { addLog(`사거리 초과 — ${enemy.label} 교전 불가`, 'WARN'); return }

    const hit = Math.random() > 0.25
    setDefenses(prev => prev.map(d =>
      d.id === selected.id ? { ...d, ammo: d.ammo - 1, cooldown: 3 } : d
    ))
    if (hit) {
      setEnemies(prev => {
        const updated = prev.map(e => e.id === enemy.id ? { ...e, hp: e.hp - 1, engaged: true } : e)
        return updated.filter(e => {
          if (e.id === enemy.id && e.hp - 1 <= 0) {
            setExplosions(ex => [...ex, { id: e.id, x: e.x, y: e.y }])
            setTimeout(() => setExplosions(ex => ex.filter(x => x.id !== e.id)), 800)
            setScore(s => s + e.threat * 10)
            setIntercepts(n => n + 1)
            addLog(`${selected.label} → ${enemy.label} 격추 (${e.type})`, 'INTERCEPT')
            return false
          }
          return true
        })
      })
    } else {
      addLog(`${selected.label} → ${enemy.label} 교전 — 미스`, 'WARN')
    }
  }

  // 게임 틱
  useEffect(() => {
    if (phase !== 'ACTIVE') return
    tickRef.current = setInterval(() => {
      setEnemies(prev => {
        const next = prev.map(e => ({ ...e, y: e.y + e.speed * 0.4 }))
        const breachedNow = next.filter(e => e.y >= GRID_ROWS)
        if (breachedNow.length > 0) {
          breachedNow.forEach(e => {
            addLog(`⚠ ${e.label} 방어선 돌파!`, 'BREACH')
            setBreached(n => n + 1)
            setScore(s => Math.max(0, s - e.threat * 5))
          })
        }
        return next.filter(e => e.y < GRID_ROWS)
      })
      // 쿨다운 감소
      setDefenses(prev => prev.map(d => ({ ...d, cooldown: Math.max(0, d.cooldown - 1) })))
    }, 600)
    return () => { if (tickRef.current) clearInterval(tickRef.current) }
  }, [phase, addLog])

  // 웨이브 전환
  useEffect(() => {
    if (phase !== 'ACTIVE') return
    if (enemies.length === 0 && wave < WAVE_CONFIGS.length) {
      const nextWave = wave + (wave === 0 ? 0 : 1)
      if (nextWave < WAVE_CONFIGS.length) {
        const timer = setTimeout(() => {
          setWave(nextWave)
          spawnWave(nextWave)
        }, nextWave === 0 ? 0 : 3000)
        return () => clearTimeout(timer)
      } else {
        setPhase('RESULT')
      }
    }
  }, [enemies.length, wave, phase, spawnWave])

  const progress = wave < WAVE_CONFIGS.length ? ((wave) / WAVE_CONFIGS.length) * 100 : 100
  const [mainTab, setMainTab] = useState<'sim'|'ops'>('sim')

  return (
    <div className="min-h-screen bg-[#020b18] pt-3 pb-16 md:pt-4 md:pb-20">
      <div className="max-w-[1600px] mx-auto px-3 md:px-6">
        <SolControlBar moduleId="sol01" />
        <div className="flex items-center gap-3 mb-4">
          <Link to="/command" className="flex items-center gap-1.5 text-[10px] font-bold text-[#4a7a9b] hover:text-[#00d4ff] transition-colors">
            <ChevronLeft className="w-3.5 h-3.5" /> 지휘 센터
          </Link>
          <div className="w-px h-4 bg-[#0a3050]" />
          <Shield className="w-4 h-4 text-[#00d4ff]" />
          <h1 className="text-lg md:text-xl font-black text-white">SOL-01 <span className="text-[#00d4ff]">전장 AI</span></h1>
        </div>

        {/* 모드 탭 */}
        <div className="flex gap-1 mb-5 border-b border-[#0a3050] pb-0">
          {[
            { id:'sim' as const, label:'가상전투 시뮬레이터', icon:Radar },
            { id:'ops' as const, label:'GIS 운영 지도', icon:Map },
          ].map(({id,label,icon:Icon})=>(
            <button key={id} onClick={()=>setMainTab(id)}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-[10px] font-black tracking-[0.1em] border-b-2 -mb-px transition-all ${mainTab===id?'text-[#00d4ff] border-[#00d4ff]':'text-[#4a7a9b] border-transparent hover:text-[#8ab8d4]'}`}>
              <Icon className="w-3.5 h-3.5" />{label}
            </button>
          ))}
        </div>

        {/* GIS 운영 지도 탭 */}
        {mainTab==='ops' && (
          <GisOperationsMap solId="sol01" title="SOL-01 전장 AI 운영 지도"
            activeLayers={['SAM','AIRCRAFT','ARMOR','MISSILE','NAVAL']} color="#00d4ff" />
        )}

        {mainTab==='sim' && <div>

        {/* ── STANDBY ── */}
        {phase === 'STANDBY' && (
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} className="space-y-5">
            {/* 미션 브리핑 */}
            <div className="clip-corner bg-[#041526]/80 border border-[#00d4ff]/15 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Radar className="w-4 h-4 text-[#00d4ff]" />
                <span className="text-[11px] font-black tracking-[0.2em] text-[#00d4ff]">가상전투 브리핑</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-2xl font-black text-white mb-2">한반도 방공 작전</h2>
                  <p className="text-[12px] text-[#8ab8d4] leading-relaxed mb-4">
                    북방 위협이 감지되었습니다. 5개 파로 구성된 적 전력이 남방 방어선을 향해 진입 중입니다.
                    패트리엇, 천궁-II, F-35, K9 자주포를 운용해 모든 위협을 격퇴하십시오.
                    탄도미사일·이동식발사대를 최우선 교전 대상으로 지정하십시오.
                  </p>
                  <div className="space-y-2">
                    {WAVE_CONFIGS.map(cfg => (
                      <div key={cfg.wave} className="flex items-center gap-2 text-[10px]">
                        <span className="w-5 h-5 bg-[#ff2d55]/15 border border-[#ff2d55]/30 flex items-center justify-center text-[#ff2d55] font-black shrink-0">{cfg.wave}</span>
                        <span className="text-[#8ab8d4]">{cfg.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-black tracking-[0.12em] text-[#00d4ff] mb-3">가용 방어 자산</div>
                  <div className="grid grid-cols-2 gap-2">
                    {DEF_TEMPLATES.filter((d,i,a) => a.findIndex(x=>x.type===d.type)===i).map(d => (
                      <div key={d.type} className="bg-[#020b18]/60 border border-[#0a3050] p-2.5">
                        <div className="text-[11px] font-black mb-0.5" style={{ color: d.color }}>{d.label}</div>
                        <div className="text-[9px] text-[#4a7a9b]">사거리 {d.range} 격자 · 탄약 {d.maxAmmo}발</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <button onClick={startSimulation}
                className="mt-6 flex items-center gap-2 px-8 py-3 bg-[#00d4ff] text-[#020b18] font-black text-[12px] tracking-[0.12em] clip-corner hover:bg-[#00eeff] transition-colors">
                <Play className="w-4 h-4" /> 전투 시뮬레이션 시작
              </button>
            </div>

            {/* 센서 피드 */}
            <div className="clip-corner bg-[#041526]/80 border border-[#00d4ff]/15 p-4">
              <div className="text-[10px] font-black tracking-[0.15em] text-[#00d4ff] mb-3">실시간 센서 피드</div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                {SENSOR_FEEDS.map(s => (
                  <div key={s.id} className="bg-[#020b18]/60 border border-[#0a3050] p-2.5">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${s.status==='ACTIVE'?'bg-[#00ff88] animate-pulse':s.status==='SCANNING'?'bg-[#ffcc00]':'bg-[#4a7a9b]'}`} />
                      <span className="text-[8px] font-mono text-[#4a7a9b]">{s.id}</span>
                    </div>
                    <div className="text-[9px] text-white font-bold mb-1">{s.type}</div>
                    <div className="h-1 bg-[#0a3050] rounded-full">
                      <div className="h-full bg-[#00d4ff] rounded-full" style={{ width:`${s.signal}%` }} />
                    </div>
                    <div className="text-[8px] text-[#00d4ff] mt-0.5">{s.signal}%</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ── ACTIVE ── */}
        {phase === 'ACTIVE' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 md:gap-4">
            {/* 전술 지도 */}
            <div className="xl:col-span-3">
              <div className="clip-corner bg-[#041526]/80 border border-[#00d4ff]/15 overflow-hidden">
                <div className="px-4 py-2 border-b border-[#0a3050] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Target className="w-3.5 h-3.5 text-[#ff2d55]" />
                    <span className="text-[10px] font-black text-[#00d4ff] tracking-[0.12em]">전술 지도 — {WAVE_CONFIGS[wave]?.label}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-[9px] text-[#00ff88]">격추 <strong>{intercepts}</strong></span>
                    <span className="text-[9px] text-[#ff2d55]">돌파 <strong>{breached}</strong></span>
                    <span className="text-[9px] text-[#ffcc00]">점수 <strong>{score}</strong></span>
                    <button onClick={resetSim} className="text-[9px] text-[#4a7a9b] hover:text-white border border-[#0a3050] px-2 py-0.5">
                      <RotateCcw className="w-3 h-3 inline mr-1" />중단
                    </button>
                  </div>
                </div>

                {/* 웨이브 진행 */}
                <div className="px-4 py-1.5 border-b border-[#0a3050] flex items-center gap-3">
                  <span className="text-[9px] text-[#4a7a9b]">파 진행</span>
                  <div className="flex-1 h-1.5 bg-[#0a3050] rounded-full">
                    <div className="h-full bg-[#00d4ff] rounded-full transition-all" style={{ width:`${progress}%` }} />
                  </div>
                  <span className="text-[9px] text-[#00d4ff] font-mono">{wave+1}/{WAVE_CONFIGS.length}</span>
                </div>

                {/* 모바일 힌트 */}
                <div className="md:hidden text-center text-[9px] text-[#4a7a9b] py-1 border-b border-[#0a3050]">← 좌우로 스크롤하여 전장 확인 →</div>

                {/* 그리드 전장 */}
                <div className="p-2 md:p-3 overflow-auto">
                  <div className="relative mx-auto" style={{
                    width: GRID_COLS * CELL_SIZE,
                    height: GRID_ROWS * CELL_SIZE,
                    background: `repeating-linear-gradient(#00d4ff08 0px, #00d4ff08 1px, transparent 1px, transparent ${CELL_SIZE}px), repeating-linear-gradient(90deg, #00d4ff08 0px, #00d4ff08 1px, transparent 1px, transparent ${CELL_SIZE}px)`,
                  }}>
                    {/* DMZ 라인 */}
                    <div className="absolute left-0 right-0 flex items-center"
                      style={{ top: CELL_SIZE * 5, height: CELL_SIZE }}>
                      <div className="absolute left-0 right-0 border-t border-dashed border-[#ff2d55]/50" />
                      <span className="absolute right-2 text-[8px] text-[#ff2d55] font-bold bg-[#041526] px-1">NORTH</span>
                      <span className="absolute right-2 top-4 text-[8px] text-[#00ff88] font-bold bg-[#041526] px-1">SOUTH</span>
                    </div>

                    {/* 적 유닛 */}
                    <AnimatePresence>
                      {enemies.map(e => (
                        <motion.button key={e.id}
                          initial={{ opacity:0, scale:0.5 }}
                          animate={{ opacity:1, scale:1 }}
                          exit={{ opacity:0, scale:1.5 }}
                          onClick={() => handleEnemyClick(e)}
                          className="absolute flex flex-col items-center cursor-crosshair group"
                          style={{
                            left: e.x * CELL_SIZE,
                            top:  e.y * CELL_SIZE,
                            transform: 'translate(-50%,-50%)',
                            width: CELL_SIZE,
                          }}>
                          <div className="relative">
                            {selected && (
                              <div className="absolute inset-0 rounded-full border border-[#ff2d55] scale-150 animate-pulse opacity-60" />
                            )}
                            <div className="w-7 h-7 rounded flex items-center justify-center text-base"
                              style={{ background:`${THREAT_COLORS[e.type]}20`, border:`1px solid ${THREAT_COLORS[e.type]}` }}>
                              {UNIT_ICONS[e.type]}
                            </div>
                          </div>
                          <div className="h-1 w-6 bg-[#0a3050] rounded-full mt-0.5">
                            <div className="h-full bg-[#ff2d55] rounded-full" style={{ width:`${(e.hp/e.maxHp)*100}%` }} />
                          </div>
                          <span className="text-[7px] text-[#ff2d55] font-bold">{e.label}</span>
                        </motion.button>
                      ))}
                    </AnimatePresence>

                    {/* 폭발 이펙트 */}
                    <AnimatePresence>
                      {explosions.map(ex => (
                        <motion.div key={ex.id}
                          initial={{ scale:0, opacity:1 }}
                          animate={{ scale:3, opacity:0 }}
                          exit={{ opacity:0 }}
                          className="absolute pointer-events-none flex items-center justify-center"
                          style={{ left: ex.x * CELL_SIZE, top: ex.y * CELL_SIZE, transform:'translate(-50%,-50%)' }}>
                          <div className="w-8 h-8 rounded-full bg-[#ff6b35]/40 border border-[#ffcc00]" />
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    {/* 방어 유닛 */}
                    {defenses.map(d => (
                      <button key={d.id}
                        onClick={() => handleDefClick(d)}
                        className="absolute flex flex-col items-center"
                        style={{
                          left: d.x * CELL_SIZE,
                          top:  d.y * CELL_SIZE,
                          transform: 'translate(-50%,-50%)',
                          width: CELL_SIZE,
                        }}>
                        {/* 사거리 원 */}
                        {selected?.id === d.id && (
                          <div className="absolute rounded-full border border-dashed pointer-events-none"
                            style={{
                              width: d.range * CELL_SIZE * 2,
                              height: d.range * CELL_SIZE * 2,
                              left: '50%', top: '50%',
                              transform: 'translate(-50%,-50%)',
                              borderColor: `${d.color}60`,
                            }} />
                        )}
                        <div className={`w-7 h-7 rounded flex items-center justify-center text-[10px] font-black transition-all`}
                          style={{
                            background:`${d.color}20`,
                            border:`1px solid ${d.color}`,
                            outline: selected?.id===d.id ? `2px solid ${d.color}` : 'none',
                            opacity: d.ammo <= 0 ? 0.4 : 1,
                          }}>
                          <span style={{ color: d.color }}>◉</span>
                        </div>
                        <span className="text-[7px] font-bold" style={{ color: d.color }}>{d.label}</span>
                        <span className="text-[6px] text-[#4a7a9b]">{d.ammo}발</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 조작 안내 */}
                <div className="px-4 pb-2 flex items-center gap-4 text-[9px] text-[#4a7a9b]">
                  <span>1. 방어 유닛 클릭 → 선택 (사거리 표시)</span>
                  <span>2. 적 유닛 클릭 → 교전 명령</span>
                  <span style={{ color: selected ? '#00ff88' : '#4a7a9b' }}>
                    {selected ? `▶ ${selected.label} 선택됨 — 적 클릭` : '방어 유닛 선택 대기 중'}
                  </span>
                </div>
              </div>
            </div>

            {/* 우측 패널 */}
            <div className="xl:col-span-1 space-y-3">
              {/* 현황 */}
              <div className="clip-corner bg-[#041526]/80 border border-[#00d4ff]/15 p-4">
                <div className="text-[9px] font-black tracking-[0.12em] text-[#00d4ff] mb-3">전투 현황</div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label:'점수', value:score, color:'#ffcc00' },
                    { label:'격추', value:intercepts, color:'#00ff88' },
                    { label:'돌파', value:breached, color:'#ff2d55' },
                    { label:'잔여 표적', value:enemies.length, color:'#00d4ff' },
                  ].map(k => (
                    <div key={k.label} className="bg-[#020b18]/50 border border-[#0a3050] p-2 text-center">
                      <div className="text-[8px] text-[#4a7a9b]">{k.label}</div>
                      <div className="text-xl font-black" style={{ color:k.color }}>{k.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 방어 자산 상태 */}
              <div className="clip-corner bg-[#041526]/80 border border-[#00d4ff]/15 p-4">
                <div className="text-[9px] font-black tracking-[0.12em] text-[#00d4ff] mb-3">방어 자산 상태</div>
                <div className="space-y-1.5">
                  {defenses.map(d => (
                    <div key={d.id} className={`flex items-center gap-2 px-2 py-1.5 border cursor-pointer transition-all ${selected?.id===d.id?'border-current':'border-[#0a3050]'}`}
                      style={selected?.id===d.id?{borderColor:`${d.color}60`,background:`${d.color}08`}:{}}
                      onClick={() => handleDefClick(d)}>
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: d.cooldown > 0 ? '#ffcc00' : d.ammo > 0 ? '#00ff88' : '#ff2d55' }} />
                      <span className="text-[9px] font-bold flex-1" style={{ color:d.color }}>{d.label}</span>
                      <div className="flex items-center gap-1">
                        <div className="h-1.5 w-12 bg-[#0a3050] rounded-full">
                          <div className="h-full bg-current rounded-full" style={{ width:`${(d.ammo/d.maxAmmo)*100}%`, color:d.color, background:d.color }} />
                        </div>
                        <span className="text-[8px] font-mono" style={{ color:d.color }}>{d.ammo}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 전투 로그 */}
              <div className="clip-corner bg-[#041526]/80 border border-[#00d4ff]/15 p-4">
                <div className="text-[9px] font-black tracking-[0.12em] text-[#00d4ff] mb-3">전투 로그</div>
                <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                  {logs.map((log, i) => (
                    <div key={i} className="flex gap-1.5 text-[9px]">
                      <span className="text-[#2a4a6a] font-mono shrink-0">{log.time}</span>
                      <span className={log.type==='INTERCEPT'?'text-[#00ff88]':log.type==='BREACH'?'text-[#ff2d55]':log.type==='WARN'?'text-[#ffcc00]':'text-[#00d4ff]'}>
                        {log.msg}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── RESULT ── */}
        {phase === 'RESULT' && (
          <motion.div initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }}
            className="flex items-center justify-center min-h-[50vh]">
            <div className="clip-corner bg-[#041526]/90 border border-[#00d4ff]/20 p-10 text-center max-w-lg w-full">
              <Trophy className="w-12 h-12 text-[#ffcc00] mx-auto mb-4" />
              <div className="text-[10px] font-black tracking-[0.2em] text-[#00d4ff] mb-1">전투 종료</div>
              <h2 className="text-3xl font-black text-white mb-2">
                {breached <= 2 ? '작전 성공' : breached <= 5 ? '부분 성공' : '방어선 붕괴'}
              </h2>
              <div className={`text-base font-bold mb-6 ${breached<=2?'text-[#00ff88]':breached<=5?'text-[#ffcc00]':'text-[#ff2d55]'}`}>
                {breached<=2?'모든 위협이 격퇴되었습니다.':breached<=5?'일부 위협이 돌파에 성공했습니다.':'방어선이 돌파되었습니다. 재작전이 필요합니다.'}
              </div>
              <div className="grid grid-cols-3 gap-3 mb-8">
                {[
                  { label:'최종 점수', value:score, color:'#ffcc00', unit:'pt' },
                  { label:'격추 수',   value:intercepts, color:'#00ff88', unit:'기' },
                  { label:'돌파 수',   value:breached, color:'#ff2d55', unit:'기' },
                ].map(k => (
                  <div key={k.label} className="bg-[#020b18]/50 border border-[#0a3050] p-3">
                    <div className="text-[9px] text-[#4a7a9b]">{k.label}</div>
                    <div className="text-2xl font-black" style={{ color:k.color }}>{k.value}<span className="text-sm ml-1">{k.unit}</span></div>
                  </div>
                ))}
              </div>
              <button onClick={() => { resetSim(); setTimeout(startSimulation, 100) }}
                className="flex items-center gap-2 mx-auto px-6 py-2.5 bg-[#00d4ff] text-[#020b18] font-black text-[11px] clip-corner hover:bg-[#00eeff] transition-colors">
                <RotateCcw className="w-4 h-4" /> 재도전
              </button>
            </div>
          </motion.div>
        )}

        {/* 비활성 경고 */}
        {!mod?.active && phase === 'STANDBY' && (
          <div className="mt-4 flex items-center gap-2 text-[10px] text-[#ffcc00] border border-[#ffcc00]/20 p-3 bg-[#ffcc00]/05">
            <AlertTriangle className="w-3.5 h-3.5" />
            SOL-01 모듈이 비활성 상태입니다. <Link to="/control" className="underline">제어 센터</Link>에서 활성화하면 실시간 데이터가 연동됩니다.
          </div>
        )}
        </div>}
      </div>
    </div>
  )
}
