import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Radio, Activity, ChevronLeft, Play, RotateCcw, Trophy, Lock, Unlock  } from 'lucide-react'
import { Link } from 'react-router-dom'
import SolControlBar from '../../components/SolControlBar'
import GisOperationsMap from '../../components/GisOperationsMap'
import { useSystem } from '../../contexts/SystemContext'

type Phase = 'STANDBY' | 'ACTIVE' | 'RESULT'

interface Signal {
  id: string; freq: string; freqNum: number
  type: string; source: string; power: number
  classification: string; confidence: number
  anomaly: boolean; intercepted: boolean; decoded: boolean
  priority: 'CRITICAL' | 'HIGH' | 'MED' | 'LOW'
  decodeOptions: string[]; correctDecode: string; hint: string
  timeLeft: number; maxTime: number
}

const SIGNAL_POOL: Omit<Signal,'id'|'intercepted'|'decoded'|'timeLeft'>[] = [
  { freq:'420.125 MHz', freqNum:420, type:'UHF 군용',    source:'북부 구역',  power:-42, classification:'군 무선통신',    confidence:91, anomaly:true,  priority:'CRITICAL', maxTime:15,
    decodeOptions:['발사 준비 명령','기상 관측 통신','민간 무선','식별 불가'], correctDecode:'발사 준비 명령', hint:'암호화 UHF 버스트 통신' },
  { freq:'8.512 GHz',  freqNum:8512, type:'X-Band 레이더', source:'북동 방향', power:-45, classification:'방공 레이더',   confidence:78, anomaly:true,  priority:'HIGH',     maxTime:18,
    decodeOptions:['방공 레이더 추적','기상 레이더','선박 항법','위성 링크'], correctDecode:'방공 레이더 추적', hint:'8~12GHz 대역 미상 신호' },
  { freq:'14.5 GHz',   freqNum:14500, type:'Ku-Band 위성', source:'정지궤도', power:-71, classification:'위성 링크',     confidence:95, anomaly:false, priority:'MED',      maxTime:25,
    decodeOptions:['군사 위성 통신','민간 방송','GPS 신호','항법 위성'], correctDecode:'군사 위성 통신', hint:'암호화 버스트 업링크' },
  { freq:'1.215 GHz',  freqNum:1215, type:'L-Band 레이더', source:'서해',    power:-58, classification:'해상 레이더',   confidence:87, anomaly:true,  priority:'HIGH',     maxTime:20,
    decodeOptions:['해상 레이더','항공 레이더','GPS 교란기','위성 추적'], correctDecode:'항공 레이더', hint:'L-Band 수중음향 연동 신호' },
  { freq:'2.4 GHz',    freqNum:2400, type:'Wi-Fi 스펙트럼', source:'민간',    power:-65, classification:'민간 통신',    confidence:99, anomaly:false, priority:'LOW',      maxTime:30,
    decodeOptions:['민간 와이파이','군용 드론 링크','전자전 노이즈','미확인'], correctDecode:'민간 와이파이', hint:'802.11 표준 패턴' },
  { freq:'162 MHz',    freqNum:162, type:'VHF 해상',     source:'서해 해상', power:-53, classification:'해안 경비',    confidence:72, anomaly:true,  priority:'HIGH',     maxTime:18,
    decodeOptions:['해안 경비 통신','어선 통신','군 잠수함 통신','미확인'], correctDecode:'군 잠수함 통신', hint:'비정상 VHF 패턴 감지' },
]

const PRIORITY_COLORS: Record<string,string> = { CRITICAL:'#ff2d55', HIGH:'#ff6b35', MED:'#ffcc00', LOW:'#00ff88' }

function genSignal(): Signal {
  const tpl = SIGNAL_POOL[Math.floor(Math.random()*SIGNAL_POOL.length)]
  return {
    ...tpl,
    id: `SIG-${Date.now()}-${Math.random()}`,
    intercepted: false, decoded: false,
    timeLeft: tpl.maxTime,
  }
}

const now = () => new Date().toLocaleTimeString('ko-KR',{hour12:false,hour:'2-digit',minute:'2-digit',second:'2-digit'})

function SpectrumCanvas({ signals }: { signals: Signal[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)
  const dataRef = useRef<number[]>(Array.from({length:200},()=>Math.random()*20+5))

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let stopped = false
    const draw = () => {
      if (stopped) return
      const W=canvas.width, H=canvas.height
      ctx.fillStyle='#020b18'; ctx.fillRect(0,0,W,H)
      // grid
      ctx.strokeStyle='rgba(0,212,255,0.06)'; ctx.lineWidth=0.5
      for(let i=0;i<=10;i++){ctx.beginPath();ctx.moveTo(0,(H/10)*i);ctx.lineTo(W,(H/10)*i);ctx.stroke()}
      // animate data
      dataRef.current = dataRef.current.map((v,i)=>{
        // signal peaks at known positions
        const spikes = [20,55,80,120,160,185]
        const spike = spikes.some(s=>Math.abs(i-s)<3)
        const base = spike ? Math.random()*45+35 : Math.random()*15+5
        return v*0.8+base*0.2
      })
      // injected signal spikes
      signals.forEach((sig,si) => {
        const pos = Math.floor((si/signals.length)*200)
        for(let j=-2;j<=2;j++) {
          if(pos+j>=0&&pos+j<200) dataRef.current[pos+j]=Math.random()*35+(sig.anomaly?60:30)
        }
      })
      // draw bars
      const grd=ctx.createLinearGradient(0,0,0,H)
      grd.addColorStop(0,'#00d4ff'); grd.addColorStop(0.5,'#00ff88'); grd.addColorStop(1,'#00d4ff22')
      ctx.fillStyle=grd
      dataRef.current.forEach((v,i)=>{
        const barH=(v/100)*H
        ctx.fillRect((i/200)*W,H-barH,W/200*0.8,barH)
      })
      animRef.current = requestAnimationFrame(draw)
    }
    draw()
    return () => { stopped=true; cancelAnimationFrame(animRef.current) }
  }, [signals])

  return <canvas ref={canvasRef} width={600} height={100} className="w-full rounded" />
}

export default function Sol04() {
  const sys = useSystem()
  const [mainTab, setMainTab] = useState<'sim'|'ops'>('sim')
  void sys.modules.sol04
  const [phase, setPhase] = useState<Phase>('STANDBY')
  const [signals, setSignals] = useState<Signal[]>([])
  const [selected, setSelected] = useState<Signal|null>(null)
  const [score, setScore] = useState(0)
  const [decoded, setDecoded] = useState(0)
  const [missed, setMissed] = useState(0)
  const [logs, setLogs] = useState<{time:string;msg:string;ok:boolean}[]>([])
  const [waveCount, setWaveCount] = useState(0)
  const MAX_WAVES = 4

  const addLog = useCallback((msg:string,ok:boolean)=>{
    setLogs(l=>[{time:now(),msg,ok},...l].slice(0,20))
  },[])

  const spawnSignals = useCallback((wave:number) => {
    const count = 2 + wave
    const newSigs = Array.from({length:Math.min(count,6)},()=>genSignal())
    setSignals(prev=>[...prev,...newSigs])
    addLog(`Wave ${wave+1}: ${newSigs.length}개 신호 탐지됨`, true)
  },[addLog])

  const start = () => {
    setPhase('ACTIVE'); setSignals([]); setScore(0); setDecoded(0); setMissed(0)
    setLogs([]); setSelected(null); setWaveCount(0)
    setTimeout(()=>spawnSignals(0),1000)
  }
  const reset = () => {
    setPhase('STANDBY'); setSignals([]); setScore(0); setDecoded(0)
    setMissed(0); setLogs([]); setSelected(null); setWaveCount(0)
  }

  const interceptSignal = (sig: Signal) => {
    setSignals(prev=>prev.map(s=>s.id===sig.id?{...s,intercepted:true}:s))
    setSelected(sig)
    addLog(`신호 포착: ${sig.freq} (${sig.source})`, true)
  }

  const decodeSignal = (answer: string) => {
    if (!selected) return
    const correct = answer === selected.correctDecode
    const pts = correct ? (selected.priority==='CRITICAL'?300:selected.priority==='HIGH'?180:90) : -40
    setScore(s=>Math.max(0,s+pts))
    if (correct) {
      setDecoded(d=>d+1)
      addLog(`✓ [${selected.freq}] 해독 성공: "${answer}" (+${pts}pt)`, true)
    } else {
      addLog(`✗ [${selected.freq}] 오판독: "${answer}"`, false)
    }
    setSignals(prev=>prev.map(s=>s.id===selected.id?{...s,decoded:true}:s))
    setSelected(null)
  }

  // 타이머
  useEffect(()=>{
    if(phase!=='ACTIVE') return
    const id=setInterval(()=>{
      setSignals(prev=>{
        const next=prev.map(s=>{
          if(s.decoded||s.intercepted===false&&s.timeLeft<=0) return s
          if(!s.intercepted){
            const t=s.timeLeft-1
            if(t<=0){
              if(s.anomaly){setMissed(m=>m+1);addLog(`⚠ ${s.freq} 신호 소실 — 포착 실패`,false)}
              return {...s,timeLeft:0,decoded:true}
            }
            return {...s,timeLeft:t}
          }
          return s
        })
        return next
      })
    },1000)
    return ()=>clearInterval(id)
  },[phase,addLog])

  // 웨이브
  useEffect(()=>{
    if(phase!=='ACTIVE') return
    const active=signals.filter(s=>!s.decoded&&s.timeLeft>0)
    if(active.length===0 && signals.length>0){
      const next=waveCount+1
      if(next<MAX_WAVES){
        const t=setTimeout(()=>{setWaveCount(next);setSignals([]);spawnSignals(next)},2500)
        return ()=>clearTimeout(t)
      } else {
        const t=setTimeout(()=>setPhase('RESULT'),1500)
        return ()=>clearTimeout(t)
      }
    }
  },[signals,waveCount,phase,spawnSignals])

  const activeSignals=signals.filter(s=>!s.decoded&&s.timeLeft>0)

  return (
    <div className="min-h-screen bg-[#020b18] pt-3 pb-16 md:pt-4 md:pb-20">
      <div className="max-w-[1600px] mx-auto px-6">
        <SolControlBar moduleId="sol04" />
        <div className="flex items-center gap-3 mb-5">
          <Link to="/command" className="flex items-center gap-1.5 text-[10px] font-bold text-[#4a7a9b] hover:text-[#00d4ff]">
            <ChevronLeft className="w-3.5 h-3.5" /> 지휘 센터
          </Link>
          <div className="w-px h-4 bg-[#0a3050]" />
          <Radio className="w-4 h-4 text-[#ffcc00]" />
          <h1 className="text-lg md:text-xl font-black text-white">SOL-04 <span className="text-[#ffcc00]">SIGINT · 신호 포착 및 해독</span></h1>
        </div>

        {/* 모드 탭 */}
        <div className="flex gap-1 mb-5 border-b border-[#0a3050] pb-0">
          {[{id:'sim',label:'시뮬레이션'},{id:'ops',label:'GIS 운영 지도'}].map(({id,label})=>(
            <button key={id} onClick={()=>setMainTab(id as 'sim'|'ops')}
              className={mainTab===id?'flex items-center px-4 py-2.5 text-[10px] font-black border-b-2 border-[#ffcc00] text-[#ffcc00] -mb-px':'flex items-center px-4 py-2.5 text-[10px] font-black border-b-2 border-transparent text-[#4a7a9b] -mb-px'}>
              {label}
            </button>
          ))}
        </div>

        {mainTab==='ops' && (
          <GisOperationsMap solId="sol04" title="SOL-04 SIGINT 신호 운영 지도"
            activeLayers={['EW','INTEL','SAM']} color="#ffcc00" />
        )}

        {mainTab==='sim' && <>


        {phase==='STANDBY' && (
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}
            className="clip-corner bg-[#041526]/80 border border-[#ffcc00]/20 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-4 h-4 text-[#ffcc00]" />
              <span className="text-[11px] font-black tracking-[0.2em] text-[#ffcc00]">SIGINT 임무 브리핑</span>
            </div>
            <h2 className="text-2xl font-black text-white mb-2">전자정보 수집 작전</h2>
            <p className="text-[12px] text-[#8ab8d4] leading-relaxed mb-6">
              적 전자기 스펙트럼에서 이상 신호를 탐지, 포착, 해독하는 훈련입니다.
              4개 파에 걸쳐 등장하는 신호를 제한 시간 내 포착하고 올바른 신호 분류를 선택하십시오.
              CRITICAL/HIGH 우선순위 이상 신호를 중점 포착하십시오.
            </p>
            <button onClick={start}
              className="flex items-center gap-2 px-8 py-3 bg-[#ffcc00] text-[#020b18] font-black text-[12px] clip-corner hover:bg-[#ffe033]">
              <Play className="w-4 h-4" /> SIGINT 임무 시작
            </button>
          </motion.div>
        )}

        {phase==='ACTIVE' && (
          <div className="space-y-4">
            {/* 스펙트럼 */}
            <div className="clip-corner bg-[#041526]/80 border border-[#ffcc00]/15 p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-[#ffcc00]" />
                  <span className="text-[9px] font-black tracking-[0.15em] text-[#ffcc00]">실시간 전자기 스펙트럼 — WAVE {waveCount+1}</span>
                </div>
                <button onClick={reset} className="text-[9px] text-[#4a7a9b] hover:text-white border border-[#0a3050] px-3 py-1">
                  <RotateCcw className="w-3 h-3 inline mr-1" />중단
                </button>
              </div>
              <SpectrumCanvas signals={activeSignals} />
              <div className="flex justify-between text-[8px] text-[#2a4a6a] mt-1">
                <span>100 MHz</span><span>500 MHz</span><span>1 GHz</span><span>5 GHz</span><span>15 GHz</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4">
              {/* 신호 목록 */}
              <div className="xl:col-span-2">
                <div className="text-[9px] font-black text-[#ffcc00] mb-3">탐지된 신호 — 활성 {activeSignals.length}건</div>
                <div className="grid grid-cols-1 gap-3">
                  <AnimatePresence>
                    {signals.map(sig=>(
                      <motion.div key={sig.id} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
                        className={`clip-corner border p-3 transition-all ${
                          sig.decoded?'border-[#0a3050] opacity-40':
                          sig.intercepted&&!sig.decoded?'border-[#ffcc00]/40 bg-[#ffcc00]/05':
                          sig.timeLeft<=0?'border-[#ff2d55]/20 opacity-30':
                          'border-[#0a3050] bg-[#041526]/60'
                        }`}>
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="flex items-center gap-1.5 mb-0.5">
                              <span className="text-[8px] font-black px-1.5 py-0.5"
                                style={{color:PRIORITY_COLORS[sig.priority],background:`${PRIORITY_COLORS[sig.priority]}15`}}>
                                {sig.priority}
                              </span>
                              {sig.anomaly && <span className="text-[8px] text-[#ff2d55]">⚠ 이상</span>}
                            </div>
                            <div className="text-[12px] font-black text-white">{sig.freq}</div>
                          </div>
                          {!sig.decoded && sig.timeLeft>0 && (
                            <div className={`text-[16px] font-black font-mono ${sig.timeLeft<=3?'text-[#ff2d55] animate-pulse':sig.timeLeft<=6?'text-[#ffcc00]':'text-[#00ff88]'}`}>
                              {sig.intercepted?<Lock className="w-4 h-4 text-[#ffcc00]"/>:`${sig.timeLeft}s`}
                            </div>
                          )}
                        </div>
                        {!sig.decoded && sig.timeLeft>0 && (
                          <div className="h-1 bg-[#0a3050] rounded-full mb-2">
                            <div style={{width:`${(sig.timeLeft/sig.maxTime)*100}%`,background:sig.timeLeft<=3?'#ff2d55':sig.timeLeft<=6?'#ffcc00':'#00ff88'}}
                              className="h-full rounded-full transition-all" />
                          </div>
                        )}
                        <div className="text-[9px] text-[#4a7a9b] mb-0.5">출처: {sig.source} | {sig.type}</div>
                        <div className="text-[9px] text-[#4a7a9b] mb-2">신뢰도: {sig.confidence}% | 전력: {sig.power} dBm</div>
                        {!sig.intercepted && !sig.decoded && sig.timeLeft>0 && (
                          <button onClick={()=>interceptSignal(sig)}
                            className="w-full flex items-center justify-center gap-1.5 py-1.5 border border-[#ffcc00]/30 text-[9px] font-black text-[#ffcc00] hover:bg-[#ffcc00]/10 transition-all clip-corner-sm">
                            <Radio className="w-3 h-3" /> 신호 포착
                          </button>
                        )}
                        {sig.intercepted && !sig.decoded && (
                          <div className="text-[9px] text-[#ffcc00] flex items-center gap-1.5">
                            <Lock className="w-3 h-3" /> 포착됨 — 해독 대기
                          </div>
                        )}
                        {sig.decoded && (
                          <div className="text-[9px] text-[#00ff88] flex items-center gap-1.5">
                            <Unlock className="w-3 h-3" /> 해독 완료
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              {/* 해독 패널 + 통계 */}
              <div className="space-y-4">
                <AnimatePresence>
                  {selected && (
                    <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0}}
                      className="clip-corner bg-[#041526]/90 border border-[#ffcc00]/30 p-4">
                      <div className="text-[9px] font-black text-[#ffcc00] mb-1">신호 해독</div>
                      <div className="text-[12px] font-black text-white mb-1">{selected.freq}</div>
                      <div className="text-[9px] text-[#4a7a9b] mb-3">힌트: {selected.hint}</div>
                      <div className="space-y-2">
                        {selected.decodeOptions.map(opt=>(
                          <button key={opt} onClick={()=>decodeSignal(opt)}
                            className="w-full text-left px-3 py-2 border border-[#0a3050] text-[10px] text-[#8ab8d4] hover:border-[#ffcc00]/40 hover:text-[#ffcc00] hover:bg-[#ffcc00]/05 transition-all clip-corner-sm">
                            {opt}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                {!selected && (
                  <div className="clip-corner bg-[#041526]/80 border border-[#ffcc00]/15 p-4 text-center py-8">
                    <Radio className="w-6 h-6 text-[#2a4a6a] mx-auto mb-2" />
                    <div className="text-[10px] text-[#4a7a9b]">신호를 포착하면 해독 패널이 활성화됩니다</div>
                  </div>
                )}

                {/* 통계 */}
                <div className="clip-corner bg-[#041526]/80 border border-[#ffcc00]/15 p-4">
                  <div className="text-[9px] font-black text-[#ffcc00] mb-3">수집 현황</div>
                  <div className="grid grid-cols-2 gap-2">
                    {[{l:'점수',v:score,c:'#ffcc00'},{l:'해독',v:decoded,c:'#00ff88'},{l:'소실',v:missed,c:'#ff2d55'},{l:'웨이브',v:`${waveCount+1}/${MAX_WAVES}`,c:'#00d4ff'}].map(k=>(
                      <div key={k.l} className="text-center bg-[#020b18]/50 border border-[#0a3050] p-2">
                        <div className="text-[8px] text-[#4a7a9b]">{k.l}</div>
                        <div className="text-[16px] font-black" style={{color:k.c}}>{k.v}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 로그 */}
                <div className="clip-corner bg-[#041526]/80 border border-[#ffcc00]/15 p-4">
                  <div className="text-[9px] font-black text-[#ffcc00] mb-2">수집 로그</div>
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
          </div>
        )}

        {phase==='RESULT' && (
          <motion.div initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}}
            className="flex items-center justify-center min-h-[50vh]">
            <div className="clip-corner bg-[#041526]/90 border border-[#ffcc00]/20 p-10 text-center max-w-lg w-full">
              <Trophy className="w-12 h-12 text-[#ffcc00] mx-auto mb-4" />
              <div className="text-[10px] font-black tracking-[0.2em] text-[#ffcc00] mb-1">SIGINT 임무 종료</div>
              <h2 className="text-3xl font-black text-white mb-6">
                {missed===0?'완전 수집':missed<=2?'임무 성공':'수집 실패'}
              </h2>
              <div className="grid grid-cols-3 gap-3 mb-8">
                {[{l:'최종 점수',v:score,c:'#ffcc00',u:'pt'},{l:'해독 완료',v:decoded,c:'#00ff88',u:'건'},{l:'신호 소실',v:missed,c:'#ff2d55',u:'건'}].map(k=>(
                  <div key={k.l} className="bg-[#020b18]/50 border border-[#0a3050] p-3">
                    <div className="text-[9px] text-[#4a7a9b]">{k.l}</div>
                    <div className="text-2xl font-black" style={{color:k.c}}>{k.v}<span className="text-sm ml-1">{k.u}</span></div>
                  </div>
                ))}
              </div>
              <button onClick={()=>{reset();setTimeout(start,100)}}
                className="flex items-center gap-2 mx-auto px-6 py-2.5 bg-[#ffcc00] text-[#020b18] font-black text-[11px] clip-corner">
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
