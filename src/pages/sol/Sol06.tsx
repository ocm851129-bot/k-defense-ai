import { useState } from 'react'
import { motion } from 'framer-motion'
import { Cpu, ChevronLeft, BarChart2, AlertTriangle, CheckCircle, Clock, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import SolControlBar from '../../components/SolControlBar'
import { useSystem } from '../../contexts/SystemContext'
import ConfirmDialog from '../../components/ui/ConfirmDialog'

const SCENARIOS = [
  {
    id: 'SCN-A',
    title: '시나리오 A: 선제 방어 강화',
    desc: '현재 위협 패턴을 기반으로 북방 경계 방어력을 즉시 강화하는 시나리오',
    probability: 78,
    risk: 'MED',
    timeline: '즉시',
    pros: ['위협 억제력 증가', '선제 대응 가능', '아군 피해 최소화'],
    cons: ['자원 집중으로 타 구역 공백', '외교적 긴장 가능성'],
    recommended: true,
  },
  {
    id: 'SCN-B',
    title: '시나리오 B: 감시 강화 + 대기',
    desc: '추가 정보 수집을 위해 현 상태를 유지하며 감시 자산을 증강하는 시나리오',
    probability: 65,
    risk: 'LOW',
    timeline: '6~12시간',
    pros: ['정보 불확실성 해소', '과잉대응 방지'],
    cons: ['대응 시간 지연', '기회의 창 소실 가능'],
    recommended: false,
  },
  {
    id: 'SCN-C',
    title: '시나리오 C: 전면 방어 태세',
    desc: '모든 방어 자산을 최대 경계 상태로 전환하는 시나리오',
    probability: 42,
    risk: 'HIGH',
    timeline: '즉시',
    pros: ['최대 억제력', '모든 위협 동시 대응'],
    cons: ['자원 과소비', '지속 불가능', '오판 가능성'],
    recommended: false,
  },
]

const INTEL_INPUTS = [
  { source: 'SOL-01 전장 AI', status: 'OK', data: '위협 위험도 87/100, 구역 A-7 이동식 발사대 탐지', weight: 35 },
  { source: 'SOL-02 사이버 방어', status: 'OK', data: 'VPN 취약점 공격 시도, 내부망 정상', weight: 20 },
  { source: 'SOL-03 GEOINT', status: 'OK', data: '사리원 차량 집결 +340%, 위성 재확인 15:23', weight: 25 },
  { source: 'SOL-04 SIGINT', status: 'OK', data: '이상 UHF 통신 3건, X-Band 미상 신호 탐지', weight: 15 },
  { source: 'SOL-05 IMINT', status: 'OK', data: '장갑차량 3대 탐지, 무장인원 2명 접근', weight: 5 },
]

const RISK_COLORS: Record<string, string> = {
  CRITICAL: '#ff2d55', HIGH: '#ff6b35', MED: '#ffcc00', LOW: '#00ff88',
}

export default function Sol06() {
  const sys = useSystem()
  const [selectedScenario, setSelectedScenario] = useState('SCN-A')
  const [approveConfirm, setApproveConfirm] = useState(false)
  const scenario = SCENARIOS.find((s) => s.id === selectedScenario)!
  const isApproved = sys.system.scenarioApproved === selectedScenario

  return (
    <div className="min-h-screen bg-[#020b18] pt-6 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <Link to="/" className="inline-flex items-center gap-2 text-[11px] font-bold text-[#4a7a9b] hover:text-[#00d4ff] tracking-[0.1em] mb-8 transition-colors">
          <ChevronLeft className="w-4 h-4" /> 메인으로 돌아가기
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[9px] font-black tracking-[0.2em] text-[#c084fc] bg-[#c084fc]/10 px-2 py-1">SOL-06</span>
            <div className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse" />
            <span className="text-[10px] text-[#00ff88] font-bold tracking-[0.15em]">AI PROCESSING</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-2">
            전략 <span className="text-[#c084fc] glow-text">의사결정 AI</span>
          </h1>
          <p className="text-sm text-[#4a7a9b]">종합 인텔리전스 분석 · 시나리오 생성 · 대응 방안 제시</p>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left: Intel Inputs */}
          <div className="xl:col-span-1 space-y-4">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
              className="clip-corner bg-[#041526]/80 border border-[#00d4ff]/10 p-5">
              <div className="flex items-center gap-2 mb-4">
                <Cpu className="w-4 h-4 text-[#c084fc]" />
                <span className="text-[10px] font-black tracking-[0.2em] text-[#00d4ff] uppercase">인텔리전스 입력 현황</span>
              </div>
              <div className="space-y-3">
                {INTEL_INPUTS.map((inp) => (
                  <div key={inp.source} className="p-3 border border-[#0a3050]">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-bold text-white">{inp.source}</span>
                      <CheckCircle className="w-3.5 h-3.5 text-[#00ff88]" />
                    </div>
                    <p className="text-[9px] text-[#4a7a9b] mb-2 leading-relaxed">{inp.data}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1 bg-[#0a3050] rounded-full overflow-hidden">
                        <div className="h-full bg-[#c084fc] rounded-full" style={{ width: `${inp.weight * 3}%` }} />
                      </div>
                      <span className="text-[9px] text-[#c084fc] font-mono">가중치 {inp.weight}%</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Overall threat level */}
              <div className="mt-4 p-3 bg-[#ff2d55]/8 border border-[#ff2d55]/20">
                <div className="text-[9px] font-black text-[#ff2d55] tracking-[0.15em] mb-1">종합 위협 판단</div>
                <div className="text-2xl font-black text-[#ff2d55] number-mono">87 / 100</div>
                <div className="text-[9px] text-[#4a7a9b] mt-0.5">HIGH ALERT — 즉각 대응 필요</div>
              </div>
            </motion.div>
          </div>

          {/* Right: Scenarios + Decision */}
          <div className="xl:col-span-2 space-y-4">
            {/* Scenario Selection */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
              className="clip-corner bg-[#041526]/80 border border-[#00d4ff]/10 p-5">
              <div className="flex items-center gap-2 mb-4">
                <BarChart2 className="w-4 h-4 text-[#c084fc]" />
                <span className="text-[10px] font-black tracking-[0.2em] text-[#00d4ff] uppercase">AI 생성 시나리오</span>
              </div>
              <div className="space-y-2">
                {SCENARIOS.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedScenario(s.id)}
                    className={`w-full text-left p-4 border transition-all ${
                      selectedScenario === s.id
                        ? 'border-[#c084fc]/40 bg-[#c084fc]/5'
                        : 'border-[#0a3050] hover:border-[#c084fc]/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-black text-[#c084fc]">{s.id}</span>
                        {s.recommended && (
                          <span className="text-[8px] font-black bg-[#00ff88]/15 text-[#00ff88] px-1.5 py-0.5">AI 권고</span>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[9px] font-black" style={{ color: RISK_COLORS[s.risk] }}>위험도: {s.risk}</span>
                        <span className="text-[10px] font-black text-white">{s.probability}%</span>
                      </div>
                    </div>
                    <div className="text-[11px] font-bold text-white mb-0.5">{s.title}</div>
                    <div className="text-[10px] text-[#4a7a9b]">{s.desc}</div>
                    <div className="mt-2 h-1 bg-[#0a3050] rounded-full overflow-hidden">
                      <div className="h-full bg-[#c084fc] rounded-full transition-all" style={{ width: `${s.probability}%` }} />
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Selected Scenario Detail */}
            <motion.div
              key={selectedScenario}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="clip-corner bg-[#041526]/80 border border-[#c084fc]/20 p-5">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-4 h-4 text-[#c084fc]" />
                <span className="text-[10px] font-black tracking-[0.2em] text-[#c084fc] uppercase">선택 시나리오 상세 분석</span>
                <span className="ml-auto flex items-center gap-1.5 text-[9px] text-[#4a7a9b]">
                  <Clock className="w-3 h-3" /> 대응 시간: {scenario.timeline}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-[9px] font-black text-[#00ff88] tracking-[0.15em] uppercase mb-2">장점</div>
                  <ul className="space-y-1.5">
                    {scenario.pros.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-[11px] text-[#8ab8d4]">
                        <CheckCircle className="w-3 h-3 text-[#00ff88] mt-0.5 shrink-0" />{p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-[9px] font-black text-[#ff2d55] tracking-[0.15em] uppercase mb-2">단점</div>
                  <ul className="space-y-1.5">
                    {scenario.cons.map((c) => (
                      <li key={c} className="flex items-start gap-2 text-[11px] text-[#8ab8d4]">
                        <AlertTriangle className="w-3 h-3 text-[#ff2d55] mt-0.5 shrink-0" />{c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-4 bg-[#020b18]/60 border border-[#0a3050] p-4 font-mono text-[11px] leading-relaxed text-[#8ab8d4]">
                <span className="text-[#c084fc]">[DECISION-AI]</span> {scenario.id} 선택됨<br /><br />
                전체 인텔리전스 소스 통합 분석 결과: 현 위협 수준 87/100. SOL-01~05 데이터 가중 평균 적용.
                {scenario.recommended
                  ? ' 현 상황에서 가장 균형 잡힌 대응책으로 평가됩니다. 즉각 시행을 권고합니다.'
                  : ' 추가 정보 확보 후 재평가 권고.'}
                <span className="cursor-blink">_</span>
              </div>

              {isApproved ? (
                <div className="mt-4 flex items-center gap-2 p-3 bg-[#00ff88]/10 border border-[#00ff88]/30 clip-corner-sm">
                  <CheckCircle className="w-4 h-4 text-[#00ff88]" />
                  <span className="text-[11px] font-black text-[#00ff88]">승인됨 — 시나리오 {selectedScenario} 시행 중</span>
                </div>
              ) : (
                <button
                  onClick={() => setApproveConfirm(true)}
                  className="clip-corner mt-4 w-full flex items-center justify-center gap-2 py-3 bg-[#c084fc] text-[#020b18] text-[11px] font-black tracking-[0.15em] uppercase hover:bg-[#d0a0ff] transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                  {sys.system.approvalPending ? '지휘관 승인 요청 전송' : '승인 요청'}
                </button>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      <SolControlBar moduleId="sol06">
        <div className="bg-[#020b18]/60 border border-[#0a3050] p-4 clip-corner-sm">
          <div className="text-[9px] font-black tracking-[0.15em] text-[#4a7a9b] uppercase mb-2">승인 상태</div>
          <div className="text-[11px] font-black" style={{ color: sys.system.scenarioApproved ? '#00ff88' : '#ffcc00' }}>
            {sys.system.scenarioApproved ? `${sys.system.scenarioApproved} 승인됨` : '승인 대기 중'}
          </div>
          <div className="text-[9px] text-[#4a7a9b] mt-1">
            {sys.system.approvalPending ? '지휘관 결재 필요' : '결재 완료'}
          </div>
        </div>
      </SolControlBar>

      <ConfirmDialog
        open={approveConfirm}
        title={`시나리오 ${selectedScenario} 승인`}
        danger
        confirmLabel="승인 및 시행"
        message={`${scenario.title}을 승인하고 시행합니다. 이 조치는 작전 로그에 기록되며 즉시 실행됩니다.`}
        onConfirm={() => { sys.approveScenario(selectedScenario); setApproveConfirm(false) }}
        onCancel={() => setApproveConfirm(false)}
      />
    </div>
  )
}
