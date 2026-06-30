import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, ChevronLeft, Radar, Target, AlertTriangle, Play, RotateCcw, Map, Brain, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import SolControlBar from '../../components/SolControlBar'
import { useSystem } from '../../contexts/SystemContext'
import GisOperationsMap from '../../components/GisOperationsMap'

// ── 타입 ──────────────────────────────────────────────────────────────────────
type UnitType  = 'MLRS' | 'TANK' | 'UAV' | 'MISSILE' | 'AIRCRAFT'
type DefType   = 'PATRIOT' | 'KDRASS' | 'F35' | 'ARTILLERY'
type Phase     = 'STANDBY' | 'ACTIVE' | 'RESULT'
type Difficulty = 'EASY' | 'NORMAL' | 'HARD'
type GradeKey  = 'S' | 'A' | 'B' | 'C' | 'D'

interface EnemyUnit {
  id: string; type: UnitType; x: number; y: number
  hp: number; maxHp: number; speed: number
  label: string; threat: number; engaged: boolean
  dx: number
}
interface DefUnit {
  id: string; type: DefType; x: number; y: number
  label: string; ammo: number; maxAmmo: number
  cooldown: number; range: number; color: string
  kills: number; shots: number
}
interface BattleLog {
  time: string; msg: string; type: 'INTERCEPT' | 'BREACH' | 'DEPLOY' | 'WARN'
}
interface Projectile {
  id: string; x1: number; y1: number; x2: number; y2: number
  color: string; hit: boolean; born: number
}
interface WaveStat {
  wave: number; label: string; spawned: number; intercepted: number; breached: number
}

// ── 상수 ──────────────────────────────────────────────────────────────────────
const GRID_COLS = 24
const GRID_ROWS = 16
const CS = typeof window !== 'undefined' && window.innerWidth < 768 ? 26 : 38  // cell size

const DIFF: Record<Difficulty, { label: string; color: string; cntMul: number; spdMul: number; hpMul: number; miss: number; resupply: number; desc: string }> = {
  EASY:   { label:'쉬움',   color:'#00ff88', cntMul:0.7, spdMul:0.8, hpMul:0.8, miss:0.15, resupply:0.5,  desc:'적 70% 전력 · 재보급 50%' },
  NORMAL: { label:'보통',   color:'#ffcc00', cntMul:1.0, spdMul:1.0, hpMul:1.0, miss:0.25, resupply:0.3,  desc:'기본 전력 · 재보급 30%' },
  HARD:   { label:'어려움', color:'#ff2d55', cntMul:1.5, spdMul:1.3, hpMul:1.3, miss:0.35, resupply:0.1,  desc:'적 150% 전력 · 재보급 10%' },
}

const ENEMY_TPL: Record<UnitType, Omit<EnemyUnit, 'id'|'x'|'y'|'engaged'|'dx'>> = {
  MLRS:     { type:'MLRS',     hp:2, maxHp:2, speed:1,   label:'이동식발사대', threat:10 },
  TANK:     { type:'TANK',     hp:4, maxHp:4, speed:0.7, label:'전차',        threat:7  },
  UAV:      { type:'UAV',      hp:1, maxHp:1, speed:2,   label:'드론',        threat:5  },
  MISSILE:  { type:'MISSILE',  hp:1, maxHp:1, speed:3,   label:'탄도미사일',  threat:15 },
  AIRCRAFT: { type:'AIRCRAFT', hp:2, maxHp:2, speed:2.5, label:'전투기',      threat:8  },
}

const DEF_TPL: DefUnit[] = [
  { id:'PAT-1', type:'PATRIOT',   x:8,  y:14, label:'패트리엇',  ammo:8,  maxAmmo:8,  cooldown:0, range:6, color:'#00d4ff', kills:0, shots:0 },
  { id:'PAT-2', type:'PATRIOT',   x:16, y:14, label:'패트리엇',  ammo:8,  maxAmmo:8,  cooldown:0, range:6, color:'#00d4ff', kills:0, shots:0 },
  { id:'KDR-1', type:'KDRASS',    x:4,  y:13, label:'천궁-II',  ammo:12, maxAmmo:12, cooldown:0, range:4, color:'#00ff88', kills:0, shots:0 },
  { id:'KDR-2', type:'KDRASS',    x:12, y:13, label:'천궁-II',  ammo:12, maxAmmo:12, cooldown:0, range:4, color:'#00ff88', kills:0, shots:0 },
  { id:'KDR-3', type:'KDRASS',    x:20, y:13, label:'천궁-II',  ammo:12, maxAmmo:12, cooldown:0, range:4, color:'#00ff88', kills:0, shots:0 },
  { id:'F35-1', type:'F35',       x:6,  y:15, label:'F-35',     ammo:4,  maxAmmo:4,  cooldown:0, range:8, color:'#c084fc', kills:0, shots:0 },
  { id:'F35-2', type:'F35',       x:18, y:15, label:'F-35',     ammo:4,  maxAmmo:4,  cooldown:0, range:8, color:'#c084fc', kills:0, shots:0 },
  { id:'ART-1', type:'ARTILLERY', x:11, y:15, label:'K9 자주포', ammo:20, maxAmmo:20, cooldown:0, range:5, color:'#ffcc00', kills:0, shots:0 },
]

const WAVES = [
  { wave:1, label:'1파: 드론 정찰',    units:[{type:'UAV'      as UnitType,count:4},{type:'UAV'     as UnitType,count:2}] },
  { wave:2, label:'2파: 이동식발사대', units:[{type:'MLRS'     as UnitType,count:2},{type:'UAV'     as UnitType,count:3}] },
  { wave:3, label:'3파: 기갑+항공',    units:[{type:'TANK'     as UnitType,count:3},{type:'AIRCRAFT'as UnitType,count:2}] },
  { wave:4, label:'4파: 탄도미사일',   units:[{type:'MISSILE'  as UnitType,count:3},{type:'MLRS'    as UnitType,count:2},{type:'UAV' as UnitType,count:4}] },
  { wave:5, label:'5파: 총공세',       units:[{type:'MISSILE'  as UnitType,count:4},{type:'AIRCRAFT'as UnitType,count:3},{type:'TANK' as UnitType,count:3},{type:'MLRS' as UnitType,count:2}] },
]

const TERRAIN = [
  { x:5,  y:9,  label:'서울',  kind:'ally'    as const },
  { x:3,  y:10, label:'인천',  kind:'ally'    as const },
  { x:19, y:9,  label:'강릉',  kind:'ally'    as const },
  { x:12, y:11, label:'대전',  kind:'ally'    as const },
  { x:3,  y:2,  label:'평양',  kind:'enemy'   as const },
  { x:16, y:1,  label:'원산',  kind:'enemy'   as const },
  { x:10, y:4,  label:'개성',  kind:'neutral' as const },
]

const UNIT_ICON: Record<UnitType, string> = { MLRS:'🚀', TANK:'🛡', UAV:'✈', MISSILE:'⚡', AIRCRAFT:'🛩' }
const THREAT_COLOR: Record<UnitType, string> = {
  MLRS:'#ff2d55', TANK:'#ff6b35', UAV:'#ffcc00', MISSILE:'#ff0040', AIRCRAFT:'#ff6b35',
}
const SENSOR_FEEDS = [
  { id:'RADAR-A4', type:'지상 레이더', status:'ACTIVE',   signal:92 },
  { id:'SAT-KS12', type:'위성 광학',   status:'ACTIVE',   signal:87 },
  { id:'DRONE-T7', type:'무인기',       status:'SCANNING', signal:74 },
  { id:'EW-NODE3', type:'전자전 센서', status:'ACTIVE',   signal:96 },
  { id:'ACC-B2',   type:'음향 센서',   status:'STANDBY',  signal:45 },
  { id:'IR-C9',    type:'적외선',       status:'ACTIVE',   signal:88 },
]
const GRADE_COLOR: Record<GradeKey, string> = { S:'#ffcc00', A:'#00ff88', B:'#00d4ff', C:'#ff9500', D:'#ff2d55' }

const nowStr = () => new Date().toLocaleTimeString('ko-KR', { hour12:false, hour:'2-digit', minute:'2-digit', second:'2-digit' })

function makeEnemy(type: UnitType, waveIdx: number, diff: Difficulty): EnemyUnit {
  const tpl = ENEMY_TPL[type]
  const d   = DIFF[diff]
  return {
    ...tpl,
    id:     `E-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    x:      Math.floor(Math.random() * (GRID_COLS - 4)) + 2,
    y:      0,
    hp:     Math.ceil((tpl.hp + Math.floor(waveIdx / 2)) * d.hpMul),
    maxHp:  Math.ceil((tpl.hp + Math.floor(waveIdx / 2)) * d.hpMul),
    speed:  tpl.speed * d.spdMul,
    engaged: false,
    dx:     type === 'AIRCRAFT' ? (Math.random() > 0.5 ? 0.25 : -0.25) : 0,
  }
}

// ── 컴포넌트 ──────────────────────────────────────────────────────────────────
export default function Sol01() {
  const sys = useSystem()
  const mod = sys.modules.sol01

  // core state
  const [phase,      setPhase]      = useState<Phase>('STANDBY')
  const [wave,       setWave]       = useState(-1)   // -1 = not yet started
  const [difficulty, setDifficulty] = useState<Difficulty>('NORMAL')
  const [autoMode,   setAutoMode]   = useState(true)
  const [mainTab,    setMainTab]    = useState<'sim'|'ops'>('sim')

  // battle state
  const [enemies,    setEnemies]    = useState<EnemyUnit[]>([])
  const [defenses,   setDefenses]   = useState<DefUnit[]>(DEF_TPL.map(d => ({ ...d })))
  const [selected,   setSelected]   = useState<DefUnit | null>(null)
  const [logs,       setLogs]       = useState<BattleLog[]>([])
  const [score,      setScore]      = useState(0)
  const [breached,   setBreached]   = useState(0)
  const [intercepts, setIntercepts] = useState(0)
  const [explosions, setExplosions] = useState<{ id: string; x: number; y: number }[]>([])
  const [projectiles,setProjectiles]= useState<Projectile[]>([])
  const [waveStats,  setWaveStats]  = useState<WaveStat[]>([])

  // refs — read inside interval without stale closures
  const enemiesRef   = useRef<EnemyUnit[]>([])
  const defensesRef  = useRef<DefUnit[]>([])
  const autoModeRef  = useRef(true)
  const tickRef      = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => { enemiesRef.current   = enemies   }, [enemies])
  useEffect(() => { defensesRef.current  = defenses  }, [defenses])
  useEffect(() => { autoModeRef.current  = autoMode  }, [autoMode])

  const addLog = useCallback((msg: string, type: BattleLog['type']) => {
    setLogs(l => [{ time: nowStr(), msg, type }, ...l].slice(0, 40))
  }, [])

  const fireProjectile = useCallback((x1:number,y1:number,x2:number,y2:number,color:string,hit:boolean) => {
    const id = `P-${Date.now()}-${Math.random().toString(36).slice(2)}`
    const p: Projectile = { id, x1, y1, x2, y2, color, hit, born: Date.now() }
    setProjectiles(prev => [...prev, p])
    setTimeout(() => setProjectiles(prev => prev.filter(x => x.id !== id)), 480)
  }, [])

  const spawnWave = useCallback((idx: number, diff: Difficulty) => {
    const cfg = WAVES[idx]
    if (!cfg) return
    const d = DIFF[diff]
    const units: EnemyUnit[] = []
    cfg.units.forEach(({ type, count }) => {
      const n = Math.ceil(count * d.cntMul)
      for (let i = 0; i < n; i++) units.push(makeEnemy(type, idx + 1, diff))
    })
    setEnemies(prev => [...prev, ...units])
    setWaveStats(prev => [...prev, { wave: idx + 1, label: cfg.label, spawned: units.length, intercepted: 0, breached: 0 }])
    addLog(`${cfg.label} 진입 — ${units.length}개 표적 [${d.label}]`, 'WARN')
  }, [addLog])

  // ── 시작 / 리셋 ─────────────────────────────────────────────────────────────
  const startSimulation = () => {
    if (tickRef.current) clearInterval(tickRef.current)
    setPhase('ACTIVE')
    setWave(-1)
    setEnemies([])
    setDefenses(DEF_TPL.map(d => ({ ...d })))
    setSelected(null)
    setLogs([])
    setScore(0); setBreached(0); setIntercepts(0)
    setExplosions([]); setProjectiles([]); setWaveStats([])
    addLog('가상전투 시뮬레이션 시작 — 전 방어 시스템 ONLINE', 'DEPLOY')
  }

  const resetSim = () => {
    if (tickRef.current) clearInterval(tickRef.current)
    setPhase('STANDBY')
    setWave(-1); setEnemies([]); setDefenses(DEF_TPL.map(d => ({ ...d })))
    setSelected(null); setLogs([])
    setScore(0); setBreached(0); setIntercepts(0)
    setExplosions([]); setProjectiles([]); setWaveStats([])
  }

  // ── 웨이브 전환 ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== 'ACTIVE') return
    // initial spawn (wave === -1) or next wave (enemies cleared)
    if (wave === -1 || (enemies.length === 0 && wave >= 0)) {
      const nextIdx = wave + 1
      if (nextIdx >= WAVES.length) {
        setPhase('RESULT')
        return
      }
      const delay = wave === -1 ? 1500 : 3000
      const timer = setTimeout(() => {
        if (wave !== -1) {
          // 재보급
          const rate = DIFF[difficulty].resupply
          setDefenses(prev => prev.map(d => ({
            ...d, ammo: Math.min(d.maxAmmo, d.ammo + Math.floor(d.maxAmmo * rate))
          })))
          addLog(`━━ 재보급 완료 (+${Math.round(rate * 100)}%) ━━`, 'DEPLOY')
        }
        setWave(nextIdx)
        spawnWave(nextIdx, difficulty)
      }, delay)
      return () => clearTimeout(timer)
    }
  }, [phase, wave, enemies.length, difficulty, spawnWave, addLog])

  // ── 게임 틱 (600ms) ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== 'ACTIVE') return
    const miss = DIFF[difficulty].miss

    tickRef.current = setInterval(() => {
      const curEnemies  = [...enemiesRef.current]
      const curDefenses = [...defensesRef.current]
      const isAuto      = autoModeRef.current

      // 1. 적 이동
      const moved = curEnemies.map(e => ({
        ...e,
        x: Math.max(0.5, Math.min(GRID_COLS - 1.5, e.x + e.dx)),
        y: e.y + e.speed * 0.4,
      }))

      // 2. 돌파 판정
      const breachedUnits = moved.filter(e => e.y >= GRID_ROWS)
      let activeEnemies   = moved.filter(e => e.y < GRID_ROWS)
      let breachPenalty   = 0
      let breachCount     = 0

      breachedUnits.forEach(e => {
        addLog(`⚠ ${e.label} 방어선 돌파!`, 'BREACH')
        breachCount++
        breachPenalty += e.threat * 5
      })
      if (breachCount > 0) {
        setBreached(n => n + breachCount)
        setScore(s => Math.max(0, s - breachPenalty))
        setWaveStats(prev => prev.map((ws, i) =>
          i === prev.length - 1 ? { ...ws, breached: ws.breached + breachCount } : ws
        ))
      }

      // 3. 쿨다운 감소
      const updatedDefs = curDefenses.map(d => ({ ...d, cooldown: Math.max(0, d.cooldown - 1) }))

      // 4. AI 자동 교전
      if (isAuto) {
        let tickKills    = 0
        let scoreGain    = 0

        updatedDefs.forEach((def, di) => {
          if (def.cooldown > 0 || def.ammo <= 0) return
          const inRange = activeEnemies.filter(e =>
            Math.hypot(e.x - def.x, e.y - def.y) <= def.range
          )
          if (inRange.length === 0) return

          // 우선순위: 위협도 × 3 + 방어선 근접도 × 5
          const target = [...inRange].sort((a, b) =>
            (b.threat * 3 + b.y * 5) - (a.threat * 3 + a.y * 5)
          )[0]

          const hit = Math.random() > miss
          fireProjectile(def.x, def.y, target.x, target.y, def.color, hit)
          updatedDefs[di] = { ...def, ammo: def.ammo - 1, cooldown: 3, shots: def.shots + 1 }

          if (hit) {
            const ti = activeEnemies.findIndex(e => e.id === target.id)
            if (ti >= 0) {
              activeEnemies[ti] = { ...activeEnemies[ti], hp: activeEnemies[ti].hp - 1, engaged: true }
              if (activeEnemies[ti].hp <= 0) {
                const killed = activeEnemies[ti]
                setExplosions(ex => [...ex, { id: killed.id, x: killed.x, y: killed.y }])
                setTimeout(() => setExplosions(ex => ex.filter(x => x.id !== killed.id)), 800)
                scoreGain += killed.threat * 10
                tickKills++
                updatedDefs[di] = { ...updatedDefs[di], kills: updatedDefs[di].kills + 1 }
                addLog(`[AI] ${def.label} → ${killed.label} 격추`, 'INTERCEPT')
                activeEnemies.splice(ti, 1)
              }
            }
          }
        })

        if (tickKills > 0) {
          setIntercepts(n => n + tickKills)
          setScore(s => s + scoreGain)
          setWaveStats(prev => prev.map((ws, i) =>
            i === prev.length - 1 ? { ...ws, intercepted: ws.intercepted + tickKills } : ws
          ))
        }
      }

      setEnemies(activeEnemies)
      setDefenses(updatedDefs)
    }, 600)

    return () => { if (tickRef.current) clearInterval(tickRef.current) }
  }, [phase, difficulty, addLog, fireProjectile])

  // ── 수동 교전 ─────────────────────────────────────────────────────────────────
  const handleDefClick = (def: DefUnit) => {
    setSelected(prev => prev?.id === def.id ? null : def)
  }

  const handleEnemyClick = (enemy: EnemyUnit) => {
    if (!selected || selected.ammo <= 0 || selected.cooldown > 0) return
    const dist = Math.hypot(enemy.x - selected.x, enemy.y - selected.y)
    if (dist > selected.range) {
      addLog(`사거리 초과 — ${enemy.label} 교전 불가`, 'WARN'); return
    }
    const hit = Math.random() > DIFF[difficulty].miss
    fireProjectile(selected.x, selected.y, enemy.x, enemy.y, selected.color, hit)
    setDefenses(prev => prev.map(d =>
      d.id === selected.id ? { ...d, ammo: d.ammo - 1, cooldown: 3, shots: d.shots + 1 } : d
    ))
    if (hit) {
      setEnemies(prev => {
        const next = prev.map(e => e.id === enemy.id ? { ...e, hp: e.hp - 1, engaged: true } : e)
        return next.filter(e => {
          if (e.id === enemy.id && e.hp <= 0) {
            setExplosions(ex => [...ex, { id: e.id, x: e.x, y: e.y }])
            setTimeout(() => setExplosions(ex => ex.filter(x => x.id !== e.id)), 800)
            setScore(s => s + e.threat * 10)
            setIntercepts(n => n + 1)
            setDefenses(prev2 => prev2.map(d =>
              d.id === selected.id ? { ...d, kills: d.kills + 1 } : d
            ))
            setWaveStats(prev2 => prev2.map((ws, i) =>
              i === prev2.length - 1 ? { ...ws, intercepted: ws.intercepted + 1 } : ws
            ))
            addLog(`[수동] ${selected.label} → ${enemy.label} 격추`, 'INTERCEPT')
            return false
          }
          return true
        })
      })
    } else {
      addLog(`${selected.label} → ${enemy.label} 교전 — 미스`, 'WARN')
    }
  }

  // ── 결과 계산 ─────────────────────────────────────────────────────────────────
  const totalShots  = defenses.reduce((s, d) => s + d.shots, 0)
  const accuracy    = totalShots > 0 ? Math.round((intercepts / totalShots) * 100) : 0
  const grade: GradeKey = breached === 0 ? 'S' : breached <= 2 ? 'A' : breached <= 4 ? 'B' : breached <= 6 ? 'C' : 'D'
  const gradeLabel  = { S:'완벽', A:'우수', B:'양호', C:'보통', D:'미흡' }
  const progress    = wave < 0 ? 0 : Math.min(100, ((wave + 1) / WAVES.length) * 100)

  // ── 렌더 ─────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#020b18] pt-3 pb-16 md:pt-4 md:pb-20">
      <div className="max-w-[1600px] mx-auto px-3 md:px-6">
        <SolControlBar moduleId="sol01" />

        {/* 헤더 */}
        <div className="flex items-center gap-3 mb-4">
          <Link to="/command" className="flex items-center gap-1.5 text-[10px] font-bold text-[#4a7a9b] hover:text-[#00d4ff] transition-colors">
            <ChevronLeft className="w-3.5 h-3.5" /> 지휘 센터
          </Link>
          <div className="w-px h-4 bg-[#0a3050]" />
          <Shield className="w-4 h-4 text-[#00d4ff]" />
          <h1 className="text-lg md:text-xl font-black text-white">SOL-01 <span className="text-[#00d4ff]">전장 AI</span></h1>
        </div>

        {/* 탭 */}
        <div className="flex gap-1 mb-5 border-b border-[#0a3050]">
          {[{ id:'sim' as const, label:'가상전투 시뮬레이터', icon:Radar }, { id:'ops' as const, label:'GIS 운영 지도', icon:Map }].map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setMainTab(id)}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-[10px] font-black tracking-[0.1em] border-b-2 -mb-px transition-all ${mainTab === id ? 'text-[#00d4ff] border-[#00d4ff]' : 'text-[#4a7a9b] border-transparent hover:text-[#8ab8d4]'}`}>
              <Icon className="w-3.5 h-3.5" />{label}
            </button>
          ))}
        </div>

        {mainTab === 'ops' && (
          <GisOperationsMap solId="sol01" title="SOL-01 전장 AI 운영 지도"
            activeLayers={['SAM','AIRCRAFT','ARMOR','MISSILE','NAVAL']} color="#00d4ff" />
        )}

        {mainTab === 'sim' && <>

          {/* ══════════════ STANDBY ══════════════ */}
          {phase === 'STANDBY' && (
            <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} className="space-y-5">
              <div className="clip-corner bg-[#041526]/80 border border-[#00d4ff]/15 p-6">
                <div className="flex items-center gap-2 mb-5">
                  <Radar className="w-4 h-4 text-[#00d4ff]" />
                  <span className="text-[11px] font-black tracking-[0.2em] text-[#00d4ff]">가상전투 브리핑</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* 좌측: 브리핑 + 난이도 + 시작 */}
                  <div>
                    <h2 className="text-2xl font-black text-white mb-2">한반도 방공 작전</h2>
                    <p className="text-[12px] text-[#8ab8d4] leading-relaxed mb-5">
                      5개 파로 구성된 북방 위협이 남방 방어선을 향해 진입 중입니다.
                      <span className="text-[#00d4ff]"> AI 자동 교전</span>이 우선순위 기반으로 표적을 격추합니다.
                      수동 클릭으로 고위협 표적에 즉시 개입하십시오.
                    </p>

                    {/* 난이도 */}
                    <div className="mb-5">
                      <div className="text-[9px] font-black tracking-[0.12em] text-[#4a7a9b] mb-2">난이도 선택</div>
                      <div className="flex gap-2">
                        {(Object.keys(DIFF) as Difficulty[]).map(d => (
                          <button key={d} onClick={() => setDifficulty(d)}
                            className="flex-1 p-2.5 text-center border transition-all"
                            style={difficulty === d
                              ? { borderColor: DIFF[d].color, background: `${DIFF[d].color}12` }
                              : { borderColor: '#0a3050' }}>
                            <div className="text-[11px] font-black mb-0.5"
                              style={{ color: difficulty === d ? DIFF[d].color : '#8ab8d4' }}>
                              {DIFF[d].label}
                            </div>
                            <div className="text-[8px] text-[#4a7a9b]">{DIFF[d].desc}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 파 목록 */}
                    <div className="space-y-1.5 mb-5">
                      {WAVES.map(w => (
                        <div key={w.wave} className="flex items-center gap-2 text-[10px]">
                          <span className="w-5 h-5 bg-[#ff2d55]/10 border border-[#ff2d55]/30 flex items-center justify-center text-[#ff2d55] font-black shrink-0">{w.wave}</span>
                          <span className="text-[#8ab8d4]">{w.label}</span>
                        </div>
                      ))}
                    </div>

                    <button onClick={startSimulation}
                      className="flex items-center gap-2 px-8 py-3 bg-[#00d4ff] text-[#020b18] font-black text-[12px] tracking-[0.12em] clip-corner hover:bg-[#00eeff] transition-colors">
                      <Play className="w-4 h-4" /> 전투 시뮬레이션 시작
                    </button>
                  </div>

                  {/* 우측: 방어 자산 + 고도화 안내 */}
                  <div>
                    <div className="text-[10px] font-black tracking-[0.12em] text-[#00d4ff] mb-3">가용 방어 자산</div>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {DEF_TPL.filter((d, i, a) => a.findIndex(x => x.type === d.type) === i).map(d => (
                        <div key={d.type} className="bg-[#020b18]/60 border border-[#0a3050] p-2.5">
                          <div className="text-[11px] font-black mb-0.5" style={{ color: d.color }}>{d.label}</div>
                          <div className="text-[9px] text-[#4a7a9b]">사거리 {d.range} · 탄약 {d.maxAmmo}발</div>
                        </div>
                      ))}
                    </div>
                    <div className="bg-[#00d4ff]/04 border border-[#00d4ff]/15 p-3 space-y-1.5">
                      <div className="text-[9px] font-black text-[#00d4ff] mb-2 tracking-[0.1em]">▶ 고도화 기능</div>
                      {[
                        ['🤖','AI 자동 교전 — 위협도·방어선 근접도 우선순위 기반'],
                        ['🎯','수동 오버라이드 — 방어 유닛 선택 후 적 클릭'],
                        ['💥','발사체 시각화 — 실시간 탄도 궤적 SVG 렌더'],
                        ['🗺','지형 마커 — 한반도 도시·DMZ·임진강 표시'],
                        ['📦','파간 재보급 — 난이도별 탄약 자동 보충'],
                        ['📊','상세 결과 — S~D 등급·파별 통계·무기 효율'],
                      ].map(([icon, text]) => (
                        <div key={text} className="flex items-start gap-2 text-[9px] text-[#8ab8d4]">
                          <span>{icon}</span><span>{text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
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

          {/* ══════════════ ACTIVE ══════════════ */}
          {phase === 'ACTIVE' && (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
              {/* 전술 지도 */}
              <div className="lg:col-span-3">
                <div className="clip-corner bg-[#041526]/80 border border-[#00d4ff]/15 overflow-hidden">
                  {/* 상단 바 */}
                  <div className="px-4 py-2 border-b border-[#0a3050] flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <Target className="w-3.5 h-3.5 text-[#ff2d55]" />
                      <span className="text-[10px] font-black text-[#00d4ff] tracking-[0.1em]">
                        {wave >= 0 && wave < WAVES.length ? WAVES[wave].label : '준비 중'}
                      </span>
                      <span className="text-[8px] px-1.5 py-0.5 border"
                        style={{ borderColor:`${DIFF[difficulty].color}40`, color:DIFF[difficulty].color }}>
                        {DIFF[difficulty].label}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[9px] text-[#00ff88]">격추 <b>{intercepts}</b></span>
                      <span className="text-[9px] text-[#ff2d55]">돌파 <b>{breached}</b></span>
                      <span className="text-[9px] text-[#ffcc00]">점수 <b>{score}</b></span>
                      {/* AI 토글 */}
                      <button onClick={() => setAutoMode(a => !a)}
                        className={`flex items-center gap-1 text-[9px] font-black px-2 py-0.5 border transition-all ${autoMode ? 'border-[#00d4ff]/50 text-[#00d4ff] bg-[#00d4ff]/10' : 'border-[#0a3050] text-[#4a7a9b]'}`}>
                        <Brain className="w-3 h-3" />{autoMode ? 'AI ON' : 'AI OFF'}
                      </button>
                      <button onClick={resetSim}
                        className="text-[9px] text-[#4a7a9b] hover:text-white border border-[#0a3050] px-2 py-0.5 transition-colors">
                        <RotateCcw className="w-3 h-3 inline mr-1" />중단
                      </button>
                    </div>
                  </div>

                  {/* 파 진행 */}
                  <div className="px-4 py-1.5 border-b border-[#0a3050] flex items-center gap-3">
                    <span className="text-[9px] text-[#4a7a9b]">파 진행</span>
                    <div className="flex-1 h-1.5 bg-[#0a3050] rounded-full">
                      <div className="h-full bg-[#00d4ff] rounded-full transition-all" style={{ width:`${progress}%` }} />
                    </div>
                    <span className="text-[9px] text-[#00d4ff] font-mono">{Math.max(0,wave+1)}/{WAVES.length}</span>
                    {autoMode && (
                      <span className="text-[8px] text-[#00d4ff] animate-pulse flex items-center gap-0.5">
                        <Zap className="w-2.5 h-2.5" />자동교전
                      </span>
                    )}
                  </div>

                  <div className="md:hidden text-center text-[9px] text-[#4a7a9b] py-1 border-b border-[#0a3050]">← 스크롤하여 전장 확인 →</div>

                  {/* 그리드 전장 */}
                  <div className="p-2 md:p-3 overflow-auto">
                    <div className="relative mx-auto" style={{
                      width:  GRID_COLS * CS,
                      height: GRID_ROWS * CS,
                      background: `repeating-linear-gradient(#00d4ff06 0px,#00d4ff06 1px,transparent 1px,transparent ${CS}px),repeating-linear-gradient(90deg,#00d4ff06 0px,#00d4ff06 1px,transparent 1px,transparent ${CS}px)`,
                    }}>

                      {/* 지형 마커 */}
                      {TERRAIN.map(t => (
                        <div key={t.label} className="absolute pointer-events-none flex flex-col items-center"
                          style={{ left: t.x * CS, top: t.y * CS, transform:'translate(-50%,-50%)' }}>
                          <div className={`w-2 h-2 rounded-full border ${t.kind==='ally'?'border-[#00ff88]/50 bg-[#00ff88]/15':t.kind==='enemy'?'border-[#ff2d55]/50 bg-[#ff2d55]/15':'border-[#ffcc00]/50 bg-[#ffcc00]/15'}`} />
                          <span className={`text-[7px] font-bold mt-0.5 ${t.kind==='ally'?'text-[#00ff88]/50':t.kind==='enemy'?'text-[#ff2d55]/50':'text-[#ffcc00]/50'}`}>{t.label}</span>
                        </div>
                      ))}

                      {/* 임진강 */}
                      <div className="absolute left-0 right-0 pointer-events-none"
                        style={{ top: CS * 7, height:2, background:'linear-gradient(90deg,transparent,#1a648860,#1a648880,#1a648860,transparent)' }} />

                      {/* DMZ */}
                      <div className="absolute left-0 right-0 pointer-events-none"
                        style={{ top: CS * 5, height: CS }}>
                        <div className="absolute left-0 right-0 border-t border-dashed border-[#ff2d55]/40" />
                        <span className="absolute right-2 text-[8px] text-[#ff2d55]/70 font-bold bg-[#041526] px-1">NORTH</span>
                        <span className="absolute right-2 top-4 text-[8px] text-[#00ff88]/70 font-bold bg-[#041526] px-1">SOUTH</span>
                      </div>

                      {/* 발사체 SVG */}
                      <svg className="absolute inset-0 pointer-events-none overflow-visible"
                        style={{ width: GRID_COLS * CS, height: GRID_ROWS * CS }}>
                        {projectiles.map(p => (
                          <line key={p.id}
                            x1={p.x1 * CS} y1={p.y1 * CS}
                            x2={p.x2 * CS} y2={p.y2 * CS}
                            stroke={p.hit ? p.color : '#555'}
                            strokeWidth={p.hit ? 2 : 1}
                            strokeOpacity={0.85}
                            strokeDasharray={p.hit ? '5 3' : '2 5'}
                          />
                        ))}
                      </svg>

                      {/* 적 유닛 */}
                      <AnimatePresence>
                        {enemies.map(e => (
                          <motion.button key={e.id}
                            initial={{ opacity:0, scale:0.4 }}
                            animate={{ opacity:1, scale:1 }}
                            exit={{ opacity:0, scale:1.8 }}
                            onClick={() => handleEnemyClick(e)}
                            className="absolute flex flex-col items-center cursor-crosshair"
                            style={{ left: e.x * CS, top: e.y * CS, transform:'translate(-50%,-50%)', width: CS }}>
                            {selected && (
                              <div className="absolute inset-0 rounded-full border border-[#ff2d55] scale-[1.6] animate-pulse opacity-50" />
                            )}
                            <div className="w-7 h-7 rounded flex items-center justify-center text-base"
                              style={{
                                background: `${THREAT_COLOR[e.type]}18`,
                                border: `1.5px solid ${THREAT_COLOR[e.type]}`,
                                boxShadow: e.engaged ? `0 0 10px ${THREAT_COLOR[e.type]}50` : 'none',
                              }}>
                              {UNIT_ICON[e.type]}
                            </div>
                            <div className="h-1 w-6 bg-[#0a3050] rounded-full mt-0.5">
                              <div className="h-full bg-[#ff2d55] rounded-full transition-all"
                                style={{ width:`${(e.hp / e.maxHp) * 100}%` }} />
                            </div>
                            <span className="text-[7px] text-[#ff2d55] font-bold leading-none">{e.label}</span>
                          </motion.button>
                        ))}
                      </AnimatePresence>

                      {/* 폭발 */}
                      <AnimatePresence>
                        {explosions.map(ex => (
                          <motion.div key={ex.id}
                            initial={{ scale:0, opacity:1 }}
                            animate={{ scale:4, opacity:0 }}
                            transition={{ duration:0.7, ease:'easeOut' }}
                            className="absolute pointer-events-none"
                            style={{ left: ex.x * CS, top: ex.y * CS, transform:'translate(-50%,-50%)' }}>
                            <div className="w-8 h-8 rounded-full"
                              style={{ background:'radial-gradient(circle,#ffcc0070 0%,#ff6b3540 55%,transparent 75%)' }} />
                          </motion.div>
                        ))}
                      </AnimatePresence>

                      {/* 방어 유닛 */}
                      {defenses.map(d => (
                        <button key={d.id}
                          onClick={() => handleDefClick(d)}
                          className="absolute flex flex-col items-center transition-transform hover:scale-110"
                          style={{ left: d.x * CS, top: d.y * CS, transform:'translate(-50%,-50%)', width: CS }}>
                          {selected?.id === d.id && (
                            <div className="absolute rounded-full border border-dashed pointer-events-none animate-pulse"
                              style={{
                                width: d.range * CS * 2, height: d.range * CS * 2,
                                left:'50%', top:'50%', transform:'translate(-50%,-50%)',
                                borderColor:`${d.color}50`,
                              }} />
                          )}
                          <div className="w-7 h-7 rounded flex items-center justify-center"
                            style={{
                              background:`${d.color}18`,
                              border:`1.5px solid ${d.color}`,
                              outline: selected?.id === d.id ? `2px solid ${d.color}` : 'none',
                              opacity: d.ammo <= 0 ? 0.25 : 1,
                              boxShadow: d.cooldown === 0 && d.ammo > 0 ? `0 0 8px ${d.color}35` : 'none',
                            }}>
                            <span className="text-[10px] font-black" style={{ color: d.color }}>◉</span>
                          </div>
                          <span className="text-[7px] font-bold leading-none mt-0.5" style={{ color: d.color }}>{d.label}</span>
                          <span className="text-[6px] text-[#4a7a9b]">{d.ammo}발</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 하단 안내 */}
                  <div className="px-4 pb-2 flex items-center flex-wrap gap-3 text-[9px]">
                    {autoMode
                      ? <span className="text-[#00d4ff]">▶ AI 자동 교전 중 — 방어 유닛 클릭 후 적 클릭으로 수동 오버라이드</span>
                      : <>
                          <span className="text-[#4a7a9b]">1. 방어 유닛 클릭 → 선택</span>
                          <span className="text-[#4a7a9b]">2. 적 클릭 → 교전</span>
                          <span style={{ color: selected ? '#00ff88' : '#4a7a9b' }}>
                            {selected ? `▶ ${selected.label} 선택됨` : '방어 유닛 선택 대기'}
                          </span>
                        </>
                    }
                  </div>
                </div>
              </div>

              {/* 우측 패널 */}
              <div className="lg:col-span-1 space-y-3">
                {/* 전투 현황 */}
                <div className="clip-corner bg-[#041526]/80 border border-[#00d4ff]/15 p-4">
                  <div className="text-[9px] font-black tracking-[0.12em] text-[#00d4ff] mb-3">전투 현황</div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label:'점수',     value:score,        color:'#ffcc00' },
                      { label:'격추',     value:intercepts,   color:'#00ff88' },
                      { label:'돌파',     value:breached,     color:'#ff2d55' },
                      { label:'잔여 표적', value:enemies.length, color:'#00d4ff' },
                    ].map(k => (
                      <div key={k.label} className="bg-[#020b18]/50 border border-[#0a3050] p-2 text-center">
                        <div className="text-[8px] text-[#4a7a9b]">{k.label}</div>
                        <div className="text-xl font-black" style={{ color:k.color }}>{k.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 방어 자산 */}
                <div className="clip-corner bg-[#041526]/80 border border-[#00d4ff]/15 p-4">
                  <div className="text-[9px] font-black tracking-[0.12em] text-[#00d4ff] mb-3">방어 자산 상태</div>
                  <div className="space-y-1.5">
                    {defenses.map(d => (
                      <div key={d.id}
                        className="flex items-center gap-2 px-2 py-1.5 border cursor-pointer transition-all"
                        style={selected?.id === d.id
                          ? { borderColor:`${d.color}50`, background:`${d.color}08` }
                          : { borderColor:'#0a3050' }}
                        onClick={() => handleDefClick(d)}>
                        <div className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ background: d.cooldown > 0 ? '#ffcc00' : d.ammo > 0 ? '#00ff88' : '#ff2d55' }} />
                        <span className="text-[9px] font-bold flex-1 truncate" style={{ color: d.color }}>{d.label}</span>
                        <div className="h-1.5 w-10 bg-[#0a3050] rounded-full shrink-0">
                          <div className="h-full rounded-full transition-all"
                            style={{ width:`${(d.ammo / d.maxAmmo) * 100}%`, background: d.color }} />
                        </div>
                        <span className="text-[7px] font-mono w-5 text-right" style={{ color: d.color }}>{d.ammo}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 전투 로그 */}
                <div className="clip-corner bg-[#041526]/80 border border-[#00d4ff]/15 p-4">
                  <div className="text-[9px] font-black tracking-[0.12em] text-[#00d4ff] mb-3">전투 로그</div>
                  <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
                    {logs.map((log, i) => (
                      <div key={i} className="flex gap-1.5 text-[9px]">
                        <span className="text-[#2a4a6a] font-mono shrink-0">{log.time}</span>
                        <span className={
                          log.type==='INTERCEPT'?'text-[#00ff88]':
                          log.type==='BREACH'?'text-[#ff2d55]':
                          log.type==='WARN'?'text-[#ffcc00]':'text-[#00d4ff]'}>
                          {log.msg}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ══════════════ RESULT ══════════════ */}
          {phase === 'RESULT' && (
            <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} className="space-y-4">
              {/* 메인 카드 */}
              <div className="clip-corner bg-[#041526]/90 border border-[#00d4ff]/20 p-8">
                <div className="flex items-start gap-8 flex-wrap">
                  <div className="flex-1 min-w-[200px]">
                    <div className="text-[10px] font-black tracking-[0.2em] text-[#00d4ff] mb-1">전투 종료</div>
                    <h2 className="text-3xl font-black text-white mb-1">
                      {breached===0?'완전 격퇴':breached<=2?'작전 성공':breached<=5?'부분 성공':'방어선 붕괴'}
                    </h2>
                    <div className={`text-sm font-bold mb-6 ${breached===0?'text-[#ffcc00]':breached<=2?'text-[#00ff88]':breached<=5?'text-[#ffcc00]':'text-[#ff2d55]'}`}>
                      {breached===0?'단 한 기도 돌파하지 못했습니다. 완벽한 방어!':
                       breached<=2?'모든 주요 위협이 격퇴되었습니다.':
                       breached<=5?'일부 위협이 돌파에 성공했습니다.':'방어선이 돌파되었습니다.'}
                    </div>
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      {[
                        { label:'최종 점수', value:score,      color:'#ffcc00', unit:'pt' },
                        { label:'격추 수',   value:intercepts, color:'#00ff88', unit:'기' },
                        { label:'돌파 수',   value:breached,   color:'#ff2d55', unit:'기' },
                      ].map(k => (
                        <div key={k.label} className="bg-[#020b18]/50 border border-[#0a3050] p-3">
                          <div className="text-[9px] text-[#4a7a9b]">{k.label}</div>
                          <div className="text-2xl font-black" style={{ color:k.color }}>
                            {k.value}<span className="text-sm ml-1">{k.unit}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => { resetSim(); setTimeout(startSimulation, 80) }}
                        className="flex items-center gap-2 px-6 py-2.5 bg-[#00d4ff] text-[#020b18] font-black text-[11px] clip-corner hover:bg-[#00eeff] transition-colors">
                        <RotateCcw className="w-4 h-4" /> 재도전
                      </button>
                      <button onClick={resetSim}
                        className="flex items-center gap-2 px-4 py-2.5 border border-[#0a3050] text-[#4a7a9b] font-black text-[11px] hover:text-white transition-colors">
                        <ChevronLeft className="w-4 h-4" /> 브리핑
                      </button>
                    </div>
                  </div>

                  {/* 등급 */}
                  <div className="text-center min-w-[100px]">
                    <div className="text-[9px] text-[#4a7a9b] mb-1">작전 등급</div>
                    <div className="text-8xl font-black leading-none" style={{ color: GRADE_COLOR[grade] }}>{grade}</div>
                    <div className="text-[10px] font-black mt-1" style={{ color: GRADE_COLOR[grade] }}>{gradeLabel[grade]}</div>
                    <div className="mt-3 space-y-1 text-[8px] text-[#4a7a9b]">
                      <div>명중률 <span className="text-white font-bold">{accuracy}%</span></div>
                      <div>총 발사 <span className="text-white font-bold">{totalShots}발</span></div>
                      <div>{DIFF[difficulty].label} 모드</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 파별 통계 */}
              <div className="clip-corner bg-[#041526]/80 border border-[#00d4ff]/15 p-5">
                <div className="text-[10px] font-black tracking-[0.12em] text-[#00d4ff] mb-4">파별 전투 통계</div>
                <div className="overflow-x-auto">
                  <table className="w-full text-[9px]">
                    <thead>
                      <tr className="text-[#4a7a9b] border-b border-[#0a3050]">
                        {['파','출격','격추','돌파','격퇴율'].map(h => (
                          <th key={h} className={`py-1.5 font-bold ${h==='파'?'text-left':'text-right'}`}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {waveStats.map(ws => {
                        const rate = ws.spawned > 0 ? Math.round((ws.intercepted / ws.spawned) * 100) : 0
                        return (
                          <tr key={ws.wave} className="border-b border-[#0a3050]/40">
                            <td className="py-1.5 text-[#8ab8d4]">{ws.label}</td>
                            <td className="text-right text-white font-mono">{ws.spawned}</td>
                            <td className="text-right font-mono text-[#00ff88]">{ws.intercepted}</td>
                            <td className="text-right font-mono" style={{ color: ws.breached > 0 ? '#ff2d55' : '#4a7a9b' }}>{ws.breached}</td>
                            <td className="text-right font-mono">
                              <span style={{ color: rate >= 80 ? '#00ff88' : rate >= 50 ? '#ffcc00' : '#ff2d55' }}>{rate}%</span>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 무기 효율 */}
              <div className="clip-corner bg-[#041526]/80 border border-[#00d4ff]/15 p-5">
                <div className="text-[10px] font-black tracking-[0.12em] text-[#00d4ff] mb-4">방어 자산 효율</div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {defenses.map(d => {
                    const acc = d.shots > 0 ? Math.round((d.kills / d.shots) * 100) : 0
                    return (
                      <div key={d.id} className="bg-[#020b18]/50 border border-[#0a3050] p-3">
                        <div className="text-[10px] font-black mb-1" style={{ color: d.color }}>{d.label}</div>
                        <div className="text-[8px] text-[#4a7a9b] mb-2">
                          발사 {d.shots} / 격추 <span style={{ color:'#00ff88' }}>{d.kills}</span>
                        </div>
                        <div className="h-1.5 bg-[#0a3050] rounded-full mb-1">
                          <div className="h-full rounded-full transition-all" style={{ width:`${acc}%`, background: d.color }} />
                        </div>
                        <div className="text-[10px] font-black"
                          style={{ color: acc >= 70 ? '#00ff88' : acc >= 40 ? '#ffcc00' : '#ff2d55' }}>{acc}%</div>
                      </div>
                    )
                  })}
                </div>
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
        </>}
      </div>
    </div>
  )
}
