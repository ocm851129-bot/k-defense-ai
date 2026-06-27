import { useState } from 'react'
import { motion } from 'framer-motion'
import { Cpu, ChevronLeft, AlertTriangle, CheckCircle, ChevronRight, Play, RotateCcw, Trophy, Zap, Clock  } from 'lucide-react'
import { Link } from 'react-router-dom'
import SolControlBar from '../../components/SolControlBar'
import GisOperationsMap from '../../components/GisOperationsMap'
import { useSystem } from '../../contexts/SystemContext'
import ConfirmDialog from '../../components/ui/ConfirmDialog'

type Phase = 'STANDBY' | 'BRIEFING' | 'DECISION' | 'CONSEQUENCE' | 'RESULT'
type Risk   = 'CRITICAL' | 'HIGH' | 'MED' | 'LOW'

interface Choice {
  id: string; label: string; desc: string
  risk: Risk; timeToEffect: string
  immediate: string[]; longterm: string[]
  score: number; aiRecommend: boolean
}

interface Scenario {
  id: string; title: string; situation: string
  urgency: Risk; countdown: string
  intel: { source: string; data: string; confidence: number }[]
  choices: Choice[]
}

const SCENARIOS: Scenario[] = [
  {
    id:'SCN-001', title:'탄도미사일 발사 임박',
    situation:'정찰위성이 북방 이동식 발사대에서 ICBM 연료 주입을 확인했습니다. 발사까지 추정 72분. 한미 연합사령관이 대응 방침을 요청하고 있습니다.',
    urgency:'CRITICAL', countdown:'T-72분',
    intel:[
      {source:'SOL-03 GEOINT', data:'동창리 발사대 4기 연료 주입 확인, 위장망 제거', confidence:94},
      {source:'SOL-04 SIGINT', data:'발사 명령 코드 구조 UHF 신호 포착', confidence:81},
      {source:'SOL-01 전장AI', data:'지원 차량 및 인원 집결 패턴 일치 (발사 D-72hr)', confidence:88},
      {source:'SOL-06 예측모델', data:'ICBM 발사 확률 87%, 목표: 괌/일본', confidence:87},
    ],
    choices:[
      { id:'A', label:'선제 타격 권고', desc:'킬체인 발동, 발사 전 이동식 발사대 타격',
        risk:'HIGH', timeToEffect:'즉시', aiRecommend:false, score:120,
        immediate:['발사대 무력화 가능성 70%','30% 확률로 타격 실패 및 전쟁 격화','국제사회 선제 공격 비판'],
        longterm:['한반도 전면전 위험','동맹국 지지 확보 필요','외교적 고립 가능성'] },
      { id:'B', label:'선택적 MD 배치', desc:'패트리엇+사드+아이기스 연동 강화, 발사 후 요격 준비',
        risk:'MED', timeToEffect:'30분', aiRecommend:true, score:200,
        immediate:['요격 성공률 85% (3단계 레이어)','발사 억제 효과 제한적','아군 피해 없음'],
        longterm:['외교적 카드 유지','동맹 협력 강화','억제력 시연'] },
      { id:'C', label:'외교적 압박 + 경보', desc:'UN 안보리 긴급 소집, 민간 경보 발령, 전시 태세 전환',
        risk:'LOW', timeToEffect:'1시간', aiRecommend:false, score:80,
        immediate:['발사 억제 가능성 낮음','민간 혼란 최소화','외교적 해결 가능성 유지'],
        longterm:['신뢰성 손상 위험','동맹국 우려 표명','시간 지연 효과'] },
    ]
  },
  {
    id:'SCN-002', title:'사이버 국방망 침투',
    situation:'국방부 핵심 인트라넷에서 APT 그룹의 흔적이 발견되었습니다. 작전계획 데이터베이스까지 침투 경로가 확인되었으며 추가 이동이 진행 중입니다.',
    urgency:'CRITICAL', countdown:'T-15분',
    intel:[
      {source:'SOL-02 사이버', data:'내부망 측면이동(Lateral Movement) 탐지, DB 서버 접근 시도', confidence:97},
      {source:'SOL-04 SIGINT', data:'외부 C2 서버 통신 중 (암호화)', confidence:85},
      {source:'SOL-01 전장AI', data:'작전계획 데이터 추출 패턴 일치', confidence:78},
    ],
    choices:[
      { id:'A', label:'전면 네트워크 격리', desc:'국방망 전체 즉시 오프라인 전환',
        risk:'MED', timeToEffect:'즉시', aiRecommend:true, score:180,
        immediate:['침투 즉시 차단','모든 작전 통신 일시 중단','복구 4~8시간 소요'],
        longterm:['데이터 유출 방지','운용 공백 최소화'] },
      { id:'B', label:'허니팟 역추적', desc:'공격자를 허니팟으로 유인하며 역추적',
        risk:'HIGH', timeToEffect:'30분', aiRecommend:false, score:140,
        immediate:['공격자 IP/인프라 확인 가능','유출 위험 30분 지속','기술적 성공 가능성 65%'],
        longterm:['귀속(attribution) 확보','외교·법적 대응 근거','역공 가능'] },
      { id:'C', label:'중요 데이터만 격리', desc:'침투 경로 차단 + DB 서버만 선택적 분리',
        risk:'MED', timeToEffect:'10분', aiRecommend:false, score:110,
        immediate:['작전계획 DB 보호','통신망 유지','침투 경로 완전 차단 미흡'],
        longterm:['잔존 위협 가능성','재침투 위험'] },
    ]
  },
  {
    id:'SCN-003', title:'해상 도발 — 무인 수상함 접근',
    situation:'서해 우리 측 해역에 무장 무인 수상함(USV) 3척이 접근 중입니다. 북방 소속으로 추정되며 12해리 영해 침범까지 약 45분.',
    urgency:'HIGH', countdown:'T-45분',
    intel:[
      {source:'SOL-03 GEOINT', data:'USV 3척 포착, 속도 28노트 북방 소속 특징', confidence:82},
      {source:'SOL-05 IMINT', data:'무장 확인: 기관포 및 수중 기뢰 탑재 추정', confidence:71},
      {source:'SOL-04 SIGINT', data:'원격 제어 신호 탐지 (북방 함대 주파수)', confidence:89},
    ],
    choices:[
      { id:'A', label:'경고 후 강제 퇴거', desc:'해경+해군 출동, 경고 방송 후 물리적 차단',
        risk:'MED', timeToEffect:'20분', aiRecommend:true, score:160,
        immediate:['도발 억제 효과적','충돌 리스크 존재','국제법 절차 준수'],
        longterm:['도발 재발 억제','한미 공조 시연'] },
      { id:'B', label:'전파 교란으로 무력화', desc:'EW 시스템으로 제어 신호 차단, USV 기동 불능화',
        risk:'LOW', timeToEffect:'즉시', aiRecommend:false, score:130,
        immediate:['피해 없이 차단 가능','기술적 성공 불확실','상대방 전파교란 역대응 가능'],
        longterm:['전자전 역량 노출','외교 마찰 소지'] },
      { id:'C', label:'격침 명령', desc:'해군 고속정 투입, 침입 USV 격파',
        risk:'HIGH', timeToEffect:'15분', aiRecommend:false, score:80,
        immediate:['위협 즉시 제거','긴장 고조 위험','오산 시 확전 가능'],
        longterm:['군사 충돌 격화','국제 여론 악화'] },
    ]
  },
]

const RISK_COLORS: Record<Risk,string> = { CRITICAL:'#ff2d55', HIGH:'#ff6b35', MED:'#ffcc00', LOW:'#00ff88' }

const INTEL_SOURCES = [
  { source:'SOL-01 전장 AI',  status:'OK', data:'위협 위험도 87/100, 구역 A-7 이동식 발사대 탐지', weight:35 },
  { source:'SOL-02 사이버',   status:'OK', data:'VPN 취약점 공격 시도, 내부망 정상', weight:20 },
  { source:'SOL-03 GEOINT',  status:'OK', data:'사리원 차량 집결 +340%, 위성 재확인', weight:25 },
  { source:'SOL-04 SIGINT',  status:'OK', data:'이상 UHF 통신 3건, X-Band 미상 신호', weight:15 },
  { source:'SOL-05 IMINT',   status:'OK', data:'장갑차 3대, 무장인원 2명 접근', weight:5 },
]

export default function Sol06() {
  const [mainTab, setMainTab] = useState<'sim'|'ops'>('sim')
  void useSystem()
  const [phase, setPhase] = useState<Phase>('STANDBY')
  const [scnIdx, setScnIdx] = useState(0)
  const [chosen, setChosen] = useState<Choice|null>(null)
  const [confirm, setConfirm] = useState(false)
  const [totalScore, setTotalScore] = useState(0)
  const [results, setResults] = useState<{scn:string;choice:Choice}[]>([])

  const scenario = SCENARIOS[scnIdx]

  const start = () => { setPhase('BRIEFING'); setScnIdx(0); setTotalScore(0); setResults([]); setChosen(null) }
  const reset = () => { setPhase('STANDBY'); setChosen(null); setResults([]) }

  const approveChoice = () => {
    if (!chosen) return
    setConfirm(false)
    setTotalScore(s => s + chosen.score)
    setResults(r => [...r, { scn: scenario.title, choice: chosen }])
    setPhase('CONSEQUENCE')
  }

  const nextScenario = () => {
    if (scnIdx + 1 < SCENARIOS.length) {
      setScnIdx(i => i+1); setChosen(null); setPhase('BRIEFING')
    } else {
      setPhase('RESULT')
    }
  }

  return (
    <div className="min-h-screen bg-[#020b18] pt-3 pb-16 md:pt-4 md:pb-20">
      <div className="max-w-[1600px] mx-auto px-6">
        <SolControlBar moduleId="sol06" />
        <div className="flex items-center gap-3 mb-5">
          <Link to="/command" className="flex items-center gap-1.5 text-[10px] font-bold text-[#4a7a9b] hover:text-[#00d4ff]">
            <ChevronLeft className="w-3.5 h-3.5" /> 지휘 센터
          </Link>
          <div className="w-px h-4 bg-[#0a3050]" />
          <Cpu className="w-4 h-4 text-[#c084fc]" />
          <h1 className="text-lg md:text-xl font-black text-white">SOL-06 <span className="text-[#c084fc]">AI 의사결정 지원 시뮬레이터</span></h1>
        </div>

        {/* 모드 탭 */}
        <div className="flex gap-1 mb-5 border-b border-[#0a3050] pb-0">
          {(['sim','ops'] as const).map(id=>(
            <button key={id} onClick={()=>setMainTab(id)}
              className={mainTab===id?'flex items-center px-4 py-2.5 text-[10px] font-black border-b-2 border-[#c084fc] text-[#c084fc] -mb-px':'flex items-center px-4 py-2.5 text-[10px] font-black border-b-2 border-transparent text-[#4a7a9b] -mb-px'}>
              {id==='sim'?'시뮬레이션':'GIS 운영 지도'}
            </button>
          ))}
        </div>

        {mainTab==='ops' && (
          <GisOperationsMap solId="sol06" title="SOL-06 AI 의사결정 운영 지도"
            activeLayers={['SAM','AIRCRAFT','ARMOR','MISSILE','NAVAL']} color="#c084fc" />
        )}

        {mainTab==='sim' && <>

        {/* ── STANDBY ── */}
        {phase==='STANDBY' && (
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="space-y-5">
            <div className="clip-corner bg-[#041526]/80 border border-[#c084fc]/20 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Cpu className="w-4 h-4 text-[#c084fc]" />
                <span className="text-[11px] font-black tracking-[0.2em] text-[#c084fc]">AI 의사결정 지원 시스템</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-2xl font-black text-white mb-2">위기 대응 의사결정 훈련</h2>
                  <p className="text-[12px] text-[#8ab8d4] leading-relaxed mb-4">
                    3개의 위기 시나리오에서 AI가 제공하는 인텔리전스를 바탕으로
                    최적의 대응을 결정하십시오. AI의 추천 옵션과 각 선택지의
                    즉각적·장기적 결과를 분석하여 최고 점수를 획득하십시오.
                  </p>
                  <div className="space-y-2">
                    {SCENARIOS.map((s,i)=>(
                      <div key={s.id} className="flex items-center gap-2 text-[10px]">
                        <span className="w-5 h-5 flex items-center justify-center font-black shrink-0 rounded-sm"
                          style={{background:`${RISK_COLORS[s.urgency]}20`,color:RISK_COLORS[s.urgency],border:`1px solid ${RISK_COLORS[s.urgency]}40`}}>
                          {i+1}
                        </span>
                        <span className="text-[#8ab8d4]">{s.title} <span style={{color:RISK_COLORS[s.urgency]}}>({s.urgency})</span></span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-black tracking-[0.12em] text-[#c084fc] mb-3">AI 인텔리전스 입력 현황</div>
                  <div className="space-y-2">
                    {INTEL_SOURCES.map(s=>(
                      <div key={s.source} className="flex items-start gap-2 bg-[#020b18]/50 border border-[#0a3050] p-2">
                        <CheckCircle className="w-3 h-3 text-[#00ff88] shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <div className="text-[9px] font-black text-white">{s.source}</div>
                          <div className="text-[8px] text-[#4a7a9b] truncate">{s.data}</div>
                        </div>
                        <div className="text-[8px] font-black text-[#c084fc] shrink-0">{s.weight}%</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <button onClick={start}
                className="mt-6 flex items-center gap-2 px-8 py-3 bg-[#c084fc] text-[#020b18] font-black text-[12px] clip-corner hover:bg-[#d4a0ff]">
                <Play className="w-4 h-4" /> 의사결정 훈련 시작
              </button>
            </div>
          </motion.div>
        )}

        {/* ── BRIEFING ── */}
        {phase==='BRIEFING' && (
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="space-y-5">
            {/* 진행 바 */}
            <div className="flex items-center gap-3">
              {SCENARIOS.map((s,i)=>(
                <div key={s.id} className={`flex-1 h-1.5 rounded-full ${i<=scnIdx?'bg-[#c084fc]':'bg-[#0a3050]'}`} />
              ))}
              <span className="text-[9px] text-[#4a7a9b] shrink-0">{scnIdx+1}/{SCENARIOS.length}</span>
            </div>

            {/* 시나리오 */}
            <div className="clip-corner bg-[#041526]/80 border border-[#c084fc]/20 p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1.5 px-2 py-1 border" style={{borderColor:`${RISK_COLORS[scenario.urgency]}30`,background:`${RISK_COLORS[scenario.urgency]}08`}}>
                  <AlertTriangle className="w-3 h-3" style={{color:RISK_COLORS[scenario.urgency]}} />
                  <span className="text-[9px] font-black" style={{color:RISK_COLORS[scenario.urgency]}}>{scenario.urgency}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[9px] text-[#ffcc00]">
                  <Clock className="w-3 h-3" /> {scenario.countdown}
                </div>
              </div>
              <h2 className="text-xl font-black text-white mb-3">{scenario.title}</h2>
              <p className="text-[12px] text-[#8ab8d4] leading-relaxed mb-5">{scenario.situation}</p>

              {/* 인텔 입력 */}
              <div className="mb-5">
                <div className="text-[9px] font-black tracking-[0.12em] text-[#c084fc] mb-2">AI 인텔리전스 분석 결과</div>
                <div className="space-y-2">
                  {scenario.intel.map((intel,i)=>(
                    <div key={i} className="flex items-start gap-3 bg-[#020b18]/50 border border-[#0a3050] p-3">
                      <div className="text-[8px] font-black px-1.5 py-0.5 shrink-0 text-[#c084fc] bg-[#c084fc]/10">{intel.source}</div>
                      <div className="flex-1 text-[10px] text-[#8ab8d4]">{intel.data}</div>
                      <div className="shrink-0 text-center">
                        <div className="text-[12px] font-black text-[#00ff88]">{intel.confidence}%</div>
                        <div className="text-[7px] text-[#4a7a9b]">신뢰도</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button onClick={()=>setPhase('DECISION')}
                className="flex items-center gap-2 px-6 py-2.5 bg-[#c084fc] text-[#020b18] font-black text-[11px] clip-corner hover:bg-[#d4a0ff]">
                <ChevronRight className="w-4 h-4" /> 대응 방침 결정
              </button>
            </div>
          </motion.div>
        )}

        {/* ── DECISION ── */}
        {phase==='DECISION' && (
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[8px] text-[#4a7a9b]">시나리오 {scnIdx+1}</div>
                <h2 className="text-xl font-black text-white">{scenario.title}</h2>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-[#ffcc00]">
                <Clock className="w-3.5 h-3.5" /> {scenario.countdown} 이내 결정 필요
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {scenario.choices.map(choice=>(
                <motion.div key={choice.id}
                  whileHover={{scale:1.02}} whileTap={{scale:0.98}}
                  onClick={()=>setChosen(c=>c?.id===choice.id?null:choice)}
                  className={`clip-corner border p-5 cursor-pointer transition-all relative ${
                    chosen?.id===choice.id ? 'border-[#c084fc]/50 bg-[#c084fc]/08' : 'border-[#0a3050] bg-[#041526]/60 hover:border-[#c084fc]/20'
                  }`}>
                  {choice.aiRecommend && (
                    <div className="absolute -top-2 left-4 flex items-center gap-1 bg-[#c084fc] text-[#020b18] text-[7px] font-black px-2 py-0.5">
                      <Zap className="w-2 h-2" /> AI 권장
                    </div>
                  )}
                  <div className="mb-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-6 h-6 flex items-center justify-center bg-[#c084fc]/20 text-[#c084fc] font-black text-[11px] rounded-sm">{choice.id}</span>
                      <span className="text-[8px] px-1.5 py-0.5 font-black"
                        style={{color:RISK_COLORS[choice.risk],background:`${RISK_COLORS[choice.risk]}15`}}>
                        리스크: {choice.risk}
                      </span>
                    </div>
                    <h3 className="text-[13px] font-black text-white mb-1">{choice.label}</h3>
                    <p className="text-[10px] text-[#6a9ab8]">{choice.desc}</p>
                  </div>
                  <div className="text-[8px] text-[#4a7a9b] mb-3">효과 발현: {choice.timeToEffect}</div>
                  <div className="mb-2">
                    <div className="text-[8px] font-black text-[#00d4ff] mb-1">즉각 효과</div>
                    {choice.immediate.map((e,i)=>(
                      <div key={i} className="flex items-start gap-1.5 text-[9px] text-[#6a9ab8] mb-0.5">
                        <span className="text-[#00d4ff] shrink-0">›</span>{e}
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="text-[8px] font-black text-[#c084fc] mb-1">장기 영향</div>
                    {choice.longterm.map((e,i)=>(
                      <div key={i} className="flex items-start gap-1.5 text-[9px] text-[#6a9ab8] mb-0.5">
                        <span className="text-[#c084fc] shrink-0">›</span>{e}
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 pt-3 border-t border-[#0a3050] text-right">
                    <span className="text-[9px] text-[#4a7a9b]">예상 점수</span>
                    <span className="text-[14px] font-black text-[#ffcc00] ml-2">+{choice.score}pt</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <button onClick={()=>setPhase('BRIEFING')} className="text-[10px] text-[#4a7a9b] hover:text-white border border-[#0a3050] px-4 py-2">
                ← 브리핑 재확인
              </button>
              <button onClick={()=>chosen&&setConfirm(true)} disabled={!chosen}
                className={`flex items-center gap-2 px-6 py-2.5 font-black text-[11px] clip-corner transition-all ${
                  chosen ? 'bg-[#c084fc] text-[#020b18] hover:bg-[#d4a0ff]' : 'bg-[#0a3050] text-[#2a4a6a] cursor-not-allowed'
                }`}>
                <CheckCircle className="w-4 h-4" /> 방침 승인
              </button>
            </div>
          </motion.div>
        )}

        {/* ── CONSEQUENCE ── */}
        {phase==='CONSEQUENCE' && chosen && (
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="space-y-5">
            <div className="clip-corner bg-[#041526]/80 border border-[#c084fc]/20 p-6">
              <div className="text-[9px] font-black tracking-[0.12em] text-[#c084fc] mb-2">작전 실행 결과</div>
              <h2 className="text-xl font-black text-white mb-4">{scenario.title} — {chosen.label}</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                <div>
                  <div className="text-[9px] font-black text-[#00d4ff] mb-3">즉각 효과 (시뮬레이션)</div>
                  {chosen.immediate.map((e,i)=>(
                    <motion.div key={i} initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}} transition={{delay:i*0.2}}
                      className="flex items-start gap-2 mb-2 bg-[#020b18]/50 border border-[#0a3050] p-2">
                      <span className="text-[#00d4ff] text-[12px] shrink-0">✦</span>
                      <span className="text-[10px] text-[#8ab8d4]">{e}</span>
                    </motion.div>
                  ))}
                </div>
                <div>
                  <div className="text-[9px] font-black text-[#c084fc] mb-3">장기 예측 (AI 시뮬레이션)</div>
                  {chosen.longterm.map((e,i)=>(
                    <motion.div key={i} initial={{opacity:0,x:10}} animate={{opacity:1,x:0}} transition={{delay:0.6+i*0.2}}
                      className="flex items-start gap-2 mb-2 bg-[#020b18]/50 border border-[#0a3050] p-2">
                      <span className="text-[#c084fc] text-[12px] shrink-0">◈</span>
                      <span className="text-[10px] text-[#8ab8d4]">{e}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-[#020b18]/50 border border-[#c084fc]/20 mb-5">
                <div className="flex items-center gap-3">
                  {chosen.aiRecommend
                    ? <><CheckCircle className="w-5 h-5 text-[#00ff88]" /><span className="text-[11px] text-[#00ff88] font-bold">AI 권장 방침 선택 — 최적 대응</span></>
                    : <><AlertTriangle className="w-5 h-5 text-[#ffcc00]" /><span className="text-[11px] text-[#ffcc00] font-bold">비권장 방침 — 리스크 존재</span></>
                  }
                </div>
                <div className="text-right">
                  <div className="text-[9px] text-[#4a7a9b]">이번 시나리오 점수</div>
                  <div className="text-[24px] font-black text-[#ffcc00]">+{chosen.score}pt</div>
                </div>
              </div>

              <button onClick={nextScenario}
                className="flex items-center gap-2 px-6 py-2.5 bg-[#c084fc] text-[#020b18] font-black text-[11px] clip-corner hover:bg-[#d4a0ff]">
                {scnIdx+1<SCENARIOS.length ? <><ChevronRight className="w-4 h-4"/> 다음 시나리오</> : <><Trophy className="w-4 h-4"/> 최종 결과</>}
              </button>
            </div>
          </motion.div>
        )}

        {/* ── RESULT ── */}
        {phase==='RESULT' && (
          <motion.div initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}}
            className="flex items-center justify-center min-h-[50vh]">
            <div className="clip-corner bg-[#041526]/90 border border-[#c084fc]/20 p-10 text-center max-w-xl w-full">
              <Trophy className="w-12 h-12 text-[#ffcc00] mx-auto mb-4" />
              <div className="text-[10px] font-black tracking-[0.2em] text-[#c084fc] mb-1">의사결정 훈련 완료</div>
              <h2 className="text-3xl font-black text-white mb-2">
                {totalScore>=500?'탁월한 판단력':totalScore>=350?'우수한 대응':totalScore>=200?'보통':'재훈련 필요'}
              </h2>
              <div className="text-[36px] font-black text-[#ffcc00] mb-6">{totalScore}<span className="text-base ml-1">pt</span></div>
              <div className="space-y-2 mb-8 text-left">
                {results.map((r,i)=>(
                  <div key={i} className="flex items-start gap-3 bg-[#020b18]/50 border border-[#0a3050] p-3">
                    <span className="text-[8px] font-black w-5 h-5 flex items-center justify-center bg-[#c084fc]/20 text-[#c084fc] rounded-sm shrink-0">{i+1}</span>
                    <div className="flex-1">
                      <div className="text-[10px] font-bold text-white">{r.scn}</div>
                      <div className="text-[9px] text-[#4a7a9b]">{r.choice.label}</div>
                    </div>
                    <div className="text-[#ffcc00] font-black text-[11px]">+{r.choice.score}</div>
                    {r.choice.aiRecommend && <CheckCircle className="w-3.5 h-3.5 text-[#00ff88] shrink-0" />}
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center gap-3">
                <button onClick={()=>{reset();setTimeout(start,100)}}
                  className="flex items-center gap-2 px-6 py-2.5 bg-[#c084fc] text-[#020b18] font-black text-[11px] clip-corner">
                  <RotateCcw className="w-4 h-4" /> 재훈련
                </button>
                <Link to="/command" className="flex items-center gap-2 px-6 py-2.5 border border-[#0a3050] text-[#8ab8d4] font-black text-[11px] clip-corner hover:border-[#00d4ff]/30">
                  지휘 센터
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        <ConfirmDialog
          open={confirm}
          title={`방침 "${chosen?.label}" 승인`}
          message={`선택한 대응 방침을 최종 승인합니다. 이 결정은 즉시 전 시스템에 반영됩니다. 계속하시겠습니까?`}
          danger={chosen?.risk==='HIGH'||chosen?.risk==='CRITICAL'}
          confirmLabel="방침 승인 및 실행"
          onConfirm={approveChoice}
          onCancel={()=>setConfirm(false)}
        />
        </>
        }
      </div>
    </div>
  )
}
