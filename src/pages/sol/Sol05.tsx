import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, AlertTriangle, ChevronLeft, Play, RotateCcw, Trophy, Users, Truck, Target, Crosshair  } from 'lucide-react'
import { Link } from 'react-router-dom'
import SolControlBar from '../../components/SolControlBar'
import GisOperationsMap from '../../components/GisOperationsMap'
import WeaponIntelPanel from '../../components/sol/WeaponIntelPanel'
import { useSystem } from '../../contexts/SystemContext'
import { WEAPONS, type WeaponSystem, type WeaponCategory } from '../../data/weapons'

type Phase = 'STANDBY' | 'ACTIVE' | 'RESULT'
type ObjectType = '인원' | '차량' | '장갑차' | '미사일발사대' | '항공기' | '선박'
type ThreatLevel = 'HOSTILE' | 'SUSPICIOUS' | 'CIVILIAN' | 'UNKNOWN'

interface Detection {
  id: string
  camId: string; camLabel: string
  objType: ObjectType; count: number
  x: number; y: number  // position in video feed (%)
  confidence: number
  classified: boolean
  userChoice: ThreatLevel | null
  correctAnswer: ThreatLevel
  timeLeft: number; maxTime: number
  hint: string
  linkedWeapon?: WeaponSystem
}

// DB 연동 — 표적 유형별 실제 무기체계 매칭 카테고리
const OBJ_CATEGORY_MAP: Partial<Record<ObjectType, WeaponCategory[]>> = {
  '장갑차': ['GROUND'],
  '차량': ['GROUND', 'ARTILLERY', 'MLRS'],
  '미사일발사대': ['SRBM', 'MLRS', 'ICBM', 'IRBM'],
  '항공기': ['AIRCRAFT', 'UAV'],
  '선박': ['NAVAL', 'SUBMARINE'],
}

function pickTargetWeapon(objType: ObjectType, threat: ThreatLevel): WeaponSystem | undefined {
  const cats = OBJ_CATEGORY_MAP[objType]
  if (!cats || (threat !== 'HOSTILE' && threat !== 'SUSPICIOUS')) return undefined
  const pool = WEAPONS.filter(w => cats.includes(w.category) && ['DPRK', 'RUSSIA', 'CHINA'].includes(w.origin))
  return pool.length > 0 ? pool[Math.floor(Math.random() * pool.length)] : undefined
}

const CAMERAS = [
  { id:'CAM-01', loc:'경계 Gate-A', active:true },
  { id:'CAM-02', loc:'북방 감시초소', active:true },
  { id:'CAM-03', loc:'해안선 West-2', active:true },
  { id:'CAM-04', loc:'DMZ 관측소', active:false },
  { id:'CAM-05', loc:'드론 T-7 실시간', active:true },
  { id:'CAM-06', loc:'적외선 IR-C9', active:true },
]

const DETECTION_POOL: Omit<Detection,'id'|'classified'|'userChoice'|'timeLeft'>[] = [
  { camId:'CAM-05', camLabel:'드론 T-7', objType:'장갑차', count:3, x:35, y:45, confidence:96, maxTime:12, correctAnswer:'HOSTILE',    hint:'식별 번호 없음, 위장 도색, 무장 확인' },
  { camId:'CAM-01', camLabel:'Gate-A',  objType:'인원',   count:2, x:60, y:50, confidence:88, maxTime:15, correctAnswer:'HOSTILE',    hint:'야간 잠복 자세, 소총 휴대' },
  { camId:'CAM-03', camLabel:'해안선',  objType:'선박',   count:1, x:70, y:40, confidence:91, maxTime:12, correctAnswer:'SUSPICIOUS',  hint:'AIS 미등록, 고속 접근 중' },
  { camId:'CAM-06', camLabel:'IR-C9',  objType:'인원',   count:1, x:45, y:55, confidence:72, maxTime:18, correctAnswer:'CIVILIAN',   hint:'비무장, 민간 복장, 허용 구역' },
  { camId:'CAM-05', camLabel:'드론',   objType:'항공기', count:1, x:50, y:30, confidence:84, maxTime:10, correctAnswer:'HOSTILE',    hint:'군용 드론, 정찰 패턴, 수색 중' },
  { camId:'CAM-02', camLabel:'북방초소',objType:'차량',   count:4, x:40, y:60, confidence:79, maxTime:15, correctAnswer:'SUSPICIOUS',  hint:'군용 차량이나 번호판 불명' },
  { camId:'CAM-01', camLabel:'Gate-A', objType:'미사일발사대', count:1, x:55, y:45, confidence:93, maxTime:8, correctAnswer:'HOSTILE', hint:'이동식 발사대 형태, 레이더 연동' },
  { camId:'CAM-04', camLabel:'DMZ',    objType:'인원',   count:5, x:30, y:50, confidence:65, maxTime:20, correctAnswer:'UNKNOWN',    hint:'야간 열화상, 신원 미확인' },
]

const THREAT_COLORS: Record<ThreatLevel,string> = {
  HOSTILE:'#ff2d55', SUSPICIOUS:'#ffcc00', CIVILIAN:'#00ff88', UNKNOWN:'#00d4ff'
}
const THREAT_LABELS: Record<ThreatLevel,string> = {
  HOSTILE:'적대 세력', SUSPICIOUS:'의심 표적', CIVILIAN:'민간인', UNKNOWN:'미확인'
}
const OBJ_ICONS: Record<ObjectType,React.ElementType> = {
  '인원':Users, '차량':Truck, '장갑차':Target, '미사일발사대':AlertTriangle, '항공기':Eye, '선박':Crosshair
}

const now = () => new Date().toLocaleTimeString('ko-KR',{hour12:false,hour:'2-digit',minute:'2-digit',second:'2-digit'})

function SimFeed({ det, onClick }: { det: Detection; onClick: ()=>void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)
  const frameRef = useRef(0)

  useEffect(()=>{
    const canvas=canvasRef.current; if(!canvas) return
    const ctx=canvas.getContext('2d')!
    const W=canvas.width,H=canvas.height
    let stopped=false
    const draw=()=>{
      if(stopped) return
      frameRef.current++
      const imgData=ctx.createImageData(W,H)
      for(let i=0;i<imgData.data.length;i+=4){
        const v=Math.floor(Math.random()*12)
        imgData.data[i]=v; imgData.data[i+1]=v+4; imgData.data[i+2]=v+8; imgData.data[i+3]=255
      }
      ctx.putImageData(imgData,0,0)
      // overlay grid
      ctx.strokeStyle='rgba(0,212,255,0.06)'; ctx.lineWidth=0.5
      for(let x=0;x<W;x+=15){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke()}
      for(let y=0;y<H;y+=15){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke()}
      // detection box
      const bx=det.x/100*W, by=det.y/100*H
      const bw=30,bh=25
      ctx.strokeStyle=det.classified?(det.userChoice?THREAT_COLORS[det.userChoice]:'#00ff88'):'#ffcc00'
      ctx.lineWidth=1.5; ctx.strokeRect(bx-bw/2,by-bh/2,bw,bh)
      ctx.strokeStyle=ctx.strokeStyle+'60'; ctx.lineWidth=0.5
      ctx.strokeRect(bx-bw/2-3,by-bh/2-3,bw+6,bh+6)
      // confidence bar
      ctx.fillStyle='rgba(0,0,0,0.5)'; ctx.fillRect(bx-bw/2,by+bh/2,bw,8)
      ctx.fillStyle='#00ff88'; ctx.fillRect(bx-bw/2,by+bh/2,bw*(det.confidence/100),8)
      // scanning effect
      const scan=(frameRef.current*2)%H
      ctx.strokeStyle='rgba(0,212,255,0.15)'; ctx.lineWidth=1
      ctx.beginPath(); ctx.moveTo(0,scan); ctx.lineTo(W,scan); ctx.stroke()
      animRef.current=requestAnimationFrame(draw)
    }
    draw()
    return ()=>{stopped=true;cancelAnimationFrame(animRef.current)}
  },[det])

  return (
    <div onClick={onClick} className="relative cursor-crosshair">
      <canvas ref={canvasRef} width={160} height={120} className="w-full rounded" />
      <div className="absolute top-1 left-1 text-[7px] font-mono text-[#00d4ff] bg-black/50 px-1">{det.camLabel}</div>
      <div className="absolute top-1 right-1 text-[7px] font-mono text-[#00ff88] bg-black/50 px-1">LIVE</div>
      {!det.classified && (
        <div className="absolute bottom-1 left-0 right-0 text-center">
          <span className="text-[8px] font-black text-[#ffcc00] bg-black/60 px-2">분류 필요</span>
        </div>
      )}
    </div>
  )
}

export default function Sol05() {
  const sys = useSystem()
  const [mainTab, setMainTab] = useState<'sim'|'ops'|'db'>('sim')
  void sys.modules.sol05
  const [phase, setPhase] = useState<Phase>('STANDBY')
  const [detections, setDetections] = useState<Detection[]>([])
  const [selected, setSelected] = useState<Detection|null>(null)
  const [score, setScore] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [wrong, setWrong] = useState(0)
  const [missed, setMissed] = useState(0)
  const [logs, setLogs] = useState<{time:string;msg:string;ok:boolean}[]>([])
  const [waveIdx, setWaveIdx] = useState(0)
  const MAX_WAVES = 3

  const addLog=useCallback((msg:string,ok:boolean)=>{
    setLogs(l=>[{time:now(),msg,ok},...l].slice(0,20))
  },[])

  const spawnDetections=useCallback((wave:number)=>{
    const count=3+wave
    const pool=[...DETECTION_POOL].sort(()=>Math.random()-0.5).slice(0,Math.min(count,6))
    const newDets:Detection[]=pool.map(d=>({
      ...d,id:`DET-${Date.now()}-${Math.random()}`,
      classified:false,userChoice:null,timeLeft:d.maxTime,
      linkedWeapon: pickTargetWeapon(d.objType, d.correctAnswer),
    }))
    setDetections(newDets)
    addLog(`Wave ${wave+1}: ${newDets.length}개 표적 탐지됨`, true)
  },[addLog])

  const start=()=>{
    setPhase('ACTIVE'); setDetections([]); setScore(0); setCorrect(0); setWrong(0)
    setMissed(0); setLogs([]); setSelected(null); setWaveIdx(0)
    setTimeout(()=>spawnDetections(0),1000)
  }
  const reset=()=>{
    setPhase('STANDBY'); setDetections([]); setScore(0); setCorrect(0)
    setWrong(0); setMissed(0); setLogs([]); setSelected(null); setWaveIdx(0)
  }

  const classify=(choice:ThreatLevel)=>{
    if(!selected) return
    const ok=choice===selected.correctAnswer
    const pts=ok?(selected.correctAnswer==='HOSTILE'?200:selected.correctAnswer==='SUSPICIOUS'?120:80):-50
    setScore(s=>Math.max(0,s+pts))
    if(ok){setCorrect(c=>c+1);addLog(`✓ [${selected.camLabel}] ${THREAT_LABELS[choice]} — 정확 분류 (+${pts}pt)`,true)}
    else{setWrong(w=>w+1);addLog(`✗ [${selected.camLabel}] 오분류 (정답: ${THREAT_LABELS[selected.correctAnswer]})`,false)}
    setDetections(prev=>prev.map(d=>d.id===selected.id?{...d,classified:true,userChoice:choice}:d))
    setSelected(null)
  }

  useEffect(()=>{
    if(phase!=='ACTIVE') return
    const id=setInterval(()=>{
      setDetections(prev=>prev.map(d=>{
        if(d.classified) return d
        const t=d.timeLeft-1
        if(t<=0){
          setMissed(m=>m+1)
          addLog(`⚠ [${d.camLabel}] ${d.objType} 분류 시간 초과`,false)
          return {...d,classified:true,timeLeft:0,userChoice:'UNKNOWN'}
        }
        return {...d,timeLeft:t}
      }))
    },1000)
    return ()=>clearInterval(id)
  },[phase,addLog])

  useEffect(()=>{
    if(phase!=='ACTIVE') return
    const allDone=detections.length>0&&detections.every(d=>d.classified)
    if(allDone){
      const next=waveIdx+1
      if(next<MAX_WAVES){
        const t=setTimeout(()=>{setWaveIdx(next);spawnDetections(next)},2000)
        return ()=>clearTimeout(t)
      } else {
        const t=setTimeout(()=>setPhase('RESULT'),1500)
        return ()=>clearTimeout(t)
      }
    }
  },[detections,waveIdx,phase,spawnDetections])

  const activeDets=detections.filter(d=>!d.classified&&d.timeLeft>0)

  return (
    <div className="min-h-screen bg-[#020b18] pt-3 pb-16 md:pt-4 md:pb-20">
      <div className="max-w-[1600px] mx-auto px-6">
        <SolControlBar moduleId="sol05" />
        <div className="flex items-center gap-3 mb-5">
          <Link to="/command" className="flex items-center gap-1.5 text-[10px] font-bold text-[#4a7a9b] hover:text-[#00d4ff]">
            <ChevronLeft className="w-3.5 h-3.5" /> 지휘 센터
          </Link>
          <div className="w-px h-4 bg-[#0a3050]" />
          <Eye className="w-4 h-4 text-[#ff6b35]" />
          <h1 className="text-lg md:text-xl font-black text-white">SOL-05 <span className="text-[#ff6b35]">IMINT · 영상정보 표적 분류</span></h1>
        </div>

        {/* 모드 탭 */}
        <div className="flex gap-1 mb-5 border-b border-[#0a3050] pb-0 overflow-x-auto">
          {(['sim','ops','db'] as const).map(id=>(
            <button key={id} onClick={()=>setMainTab(id)}
              className={mainTab===id?'flex items-center px-4 py-2.5 text-[10px] font-black border-b-2 border-[#ff6b35] text-[#ff6b35] -mb-px whitespace-nowrap':'flex items-center px-4 py-2.5 text-[10px] font-black border-b-2 border-transparent text-[#4a7a9b] -mb-px whitespace-nowrap'}>
              {id==='sim'?'시뮬레이션':id==='ops'?'GIS 운영 지도':'표적 식별 인텔리전스'}
            </button>
          ))}
        </div>

        {mainTab==='ops' && (
          <GisOperationsMap solId="sol05" title="SOL-05 IMINT 감시 운영 지도"
            activeLayers={['INTEL','EW','AIRCRAFT']} color="#ff6b35" />
        )}

        {mainTab==='db' && (
          <WeaponIntelPanel title="표적 식별 인텔리전스 DB" color="#ff6b35"
            categories={['GROUND','ARTILLERY','MLRS','SRBM','ICBM','IRBM','AIRCRAFT','UAV','NAVAL','SUBMARINE']}
            defaultOrigin="DPRK" originOptions={['ALL','DPRK','RUSSIA','CHINA']} />
        )}

        {mainTab==='sim' && <>

        {phase==='STANDBY' && (
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}
            className="clip-corner bg-[#041526]/80 border border-[#ff6b35]/20 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Eye className="w-4 h-4 text-[#ff6b35]" />
              <span className="text-[11px] font-black tracking-[0.2em] text-[#ff6b35]">IMINT 임무 브리핑</span>
            </div>
            <h2 className="text-2xl font-black text-white mb-2">실시간 영상정보 표적 분류</h2>
            <p className="text-[12px] text-[#8ab8d4] leading-relaxed mb-4">
              6개 감시 카메라에서 실시간으로 표적이 탐지됩니다. 각 표적을
              <strong className="text-[#ff2d55]"> 적대 세력</strong> /
              <strong className="text-[#ffcc00]"> 의심 표적</strong> /
              <strong className="text-[#00ff88]"> 민간인</strong> /
              <strong className="text-[#00d4ff]"> 미확인</strong> 으로 분류하십시오.
              잘못된 분류는 감점, 시간 초과는 표적 손실입니다.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mb-6">
              {CAMERAS.map(c=>(
                <div key={c.id} className={`p-2 border text-center ${c.active?'border-[#00ff88]/20':'border-[#0a3050] opacity-40'}`}>
                  <div className={`w-2 h-2 rounded-full mx-auto mb-1 ${c.active?'bg-[#00ff88] animate-pulse':'bg-[#4a7a9b]'}`} />
                  <div className="text-[9px] font-bold text-white">{c.id}</div>
                  <div className="text-[8px] text-[#4a7a9b]">{c.loc}</div>
                </div>
              ))}
            </div>
            <button onClick={start}
              className="flex items-center gap-2 px-8 py-3 bg-[#ff6b35] text-white font-black text-[12px] clip-corner hover:bg-[#ff8050]">
              <Play className="w-4 h-4" /> IMINT 훈련 시작
            </button>
          </motion.div>
        )}

        {phase==='ACTIVE' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4">
            {/* 영상 피드 그리드 */}
            <div className="xl:col-span-2">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-black text-[#ff6b35] tracking-[0.12em]">
                  WAVE {waveIdx+1}/{MAX_WAVES} — 분류 대기 {activeDets.length}건
                </span>
                <button onClick={reset} className="text-[9px] text-[#4a7a9b] hover:text-white border border-[#0a3050] px-3 py-1">
                  <RotateCcw className="w-3 h-3 inline mr-1" />중단
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <AnimatePresence>
                  {detections.map(det=>{
                    const ObjIcon=OBJ_ICONS[det.objType]
                    return (
                      <motion.div key={det.id} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
                        className={`clip-corner border transition-all ${
                          det.classified?'border-[#0a3050] opacity-50':
                          selected?.id===det.id?'border-[#ff6b35]/50':'border-[#0a3050] hover:border-[#ff6b35]/20'
                        }`}>
                        <SimFeed det={det} onClick={()=>!det.classified&&setSelected(s=>s?.id===det.id?null:det)} />
                        <div className="p-2">
                          <div className="flex items-center gap-1.5 mb-1">
                            <ObjIcon className="w-3 h-3 text-[#ff6b35]" />
                            <span className="text-[10px] font-black text-white">{det.objType} {det.count}개</span>
                          </div>
                          <div className="text-[8px] text-[#4a7a9b]">신뢰도 {det.confidence}%</div>
                          {!det.classified && (
                            <div className="mt-1 h-1 bg-[#0a3050] rounded-full">
                              <div style={{width:`${(det.timeLeft/det.maxTime)*100}%`,background:det.timeLeft<=3?'#ff2d55':det.timeLeft<=5?'#ffcc00':'#ff6b35'}}
                                className="h-full rounded-full transition-all" />
                            </div>
                          )}
                          {det.classified && det.userChoice && (
                            <div className="mt-1 text-[8px] font-black px-1.5 py-0.5 inline-block"
                              style={{color:THREAT_COLORS[det.userChoice],background:`${THREAT_COLORS[det.userChoice]}15`}}>
                              {THREAT_LABELS[det.userChoice]}
                            </div>
                          )}
                          {det.classified && det.linkedWeapon && (
                            <div className="mt-1 text-[7px] text-[#4a7a9b]">DB 매칭: {det.linkedWeapon.name}</div>
                          )}
                        </div>
                      </motion.div>
                    )
                  })}
                </AnimatePresence>
              </div>
            </div>

            {/* 분류 패널 + 통계 */}
            <div className="space-y-4">
              <AnimatePresence>
                {selected && (
                  <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0}}
                    className="clip-corner bg-[#041526]/90 border border-[#ff6b35]/30 p-4">
                    <div className="text-[9px] font-black text-[#ff6b35] mb-2">표적 분류</div>
                    <div className="text-[12px] font-black text-white mb-1">{selected.objType} × {selected.count}</div>
                    <div className="text-[9px] text-[#4a7a9b] mb-1">{selected.camLabel} | 신뢰도 {selected.confidence}%</div>
                    <div className="text-[9px] text-[#8ab8d4] mb-3 italic">"{selected.hint}"</div>
                    <div className="grid grid-cols-2 gap-2">
                      {(Object.entries(THREAT_LABELS) as [ThreatLevel,string][]).map(([lvl,label])=>(
                        <button key={lvl} onClick={()=>classify(lvl)}
                          className="py-2 border font-black text-[10px] transition-all hover:scale-105 clip-corner-sm"
                          style={{borderColor:`${THREAT_COLORS[lvl]}40`,background:`${THREAT_COLORS[lvl]}08`,color:THREAT_COLORS[lvl]}}>
                          {label}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {!selected && (
                <div className="clip-corner bg-[#041526]/80 border border-[#ff6b35]/15 p-4 text-center py-8">
                  <Eye className="w-6 h-6 text-[#2a4a6a] mx-auto mb-2" />
                  <div className="text-[10px] text-[#4a7a9b]">표적 영상을 클릭하여 분류를 시작하세요</div>
                </div>
              )}

              <div className="clip-corner bg-[#041526]/80 border border-[#ff6b35]/15 p-4">
                <div className="text-[9px] font-black text-[#ff6b35] mb-3">분류 현황</div>
                <div className="grid grid-cols-2 gap-2">
                  {[{l:'점수',v:score,c:'#ffcc00'},{l:'정확',v:correct,c:'#00ff88'},{l:'오류',v:wrong,c:'#ffcc00'},{l:'손실',v:missed,c:'#ff2d55'}].map(k=>(
                    <div key={k.l} className="text-center bg-[#020b18]/50 border border-[#0a3050] p-2">
                      <div className="text-[8px] text-[#4a7a9b]">{k.l}</div>
                      <div className="text-[16px] font-black" style={{color:k.c}}>{k.v}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="clip-corner bg-[#041526]/80 border border-[#ff6b35]/15 p-4">
                <div className="text-[9px] font-black text-[#ff6b35] mb-2">분류 로그</div>
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
          </div>
        )}

        {phase==='RESULT' && (
          <motion.div initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}}
            className="flex items-center justify-center min-h-[50vh]">
            <div className="clip-corner bg-[#041526]/90 border border-[#ff6b35]/20 p-10 text-center max-w-lg w-full">
              <Trophy className="w-12 h-12 text-[#ffcc00] mx-auto mb-4" />
              <div className="text-[10px] font-black tracking-[0.2em] text-[#ff6b35] mb-1">IMINT 훈련 종료</div>
              <h2 className="text-3xl font-black text-white mb-6">
                {wrong+missed===0?'완벽 분류':correct>wrong+missed?'분류 성공':'분류 실패'}
              </h2>
              <div className="grid grid-cols-3 gap-3 mb-8">
                {[{l:'최종 점수',v:score,c:'#ffcc00',u:'pt'},{l:'정확 분류',v:correct,c:'#00ff88',u:'건'},{l:'오류+손실',v:wrong+missed,c:'#ff2d55',u:'건'}].map(k=>(
                  <div key={k.l} className="bg-[#020b18]/50 border border-[#0a3050] p-3">
                    <div className="text-[9px] text-[#4a7a9b]">{k.l}</div>
                    <div className="text-2xl font-black" style={{color:k.c}}>{k.v}<span className="text-sm ml-1">{k.u}</span></div>
                  </div>
                ))}
              </div>
              <button onClick={()=>{reset();setTimeout(start,100)}}
                className="flex items-center gap-2 mx-auto px-6 py-2.5 bg-[#ff6b35] text-white font-black text-[11px] clip-corner">
                <RotateCcw className="w-4 h-4" /> 재훈련
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