import {
  createContext, useContext, useState, useCallback, useEffect, type ReactNode,
} from 'react'

// ── Types ──────────────────────────────────────────────────────────────────

export type SecLevel = 'PUBLIC' | 'INTERNAL' | 'RESTRICTED' | 'CLASSIFIED'
export type NoticeCategory = '공지' | '긴급' | '보안' | '작전' | '일반'
export type ReportCategory = '위협분석' | '사이버' | 'GEOINT' | 'SIGINT' | 'IMINT' | '의사결정' | '기술동향'
export type IntelType = 'THREAT' | 'SECTOR' | 'SIGNAL' | 'IMAGE' | 'CYBER' | 'STRATEGIC'
export type ReportStatus = 'DRAFT' | 'REVIEW' | 'PUBLISHED'
export type IntelStatus = 'ACTIVE' | 'RESOLVED' | 'PENDING' | 'ARCHIVED'

export interface Notice {
  id: string
  title: string
  content: string
  author: string
  authorUnit: string
  date: string
  category: NoticeCategory
  secLevel: SecLevel
  pinned: boolean
  views: number
  tags: string[]
}

export interface Report {
  id: string
  title: string
  summary: string
  content: string
  source: string
  author: string
  authorUnit: string
  date: string
  category: ReportCategory
  secLevel: SecLevel
  status: ReportStatus
  tags: string[]
  confidence?: number
}

export interface Intel {
  id: string
  title: string
  description: string
  detail: string
  type: IntelType
  source: string
  author: string
  date: string
  confidence: number
  secLevel: SecLevel
  status: IntelStatus
  tags: string[]
  threatLevel: 'CRITICAL' | 'HIGH' | 'MED' | 'LOW'
}

export interface Operator {
  id: string
  name: string
  rank: string
  unit: string
  role: '관리자' | '분석관' | '운영관' | '관찰관'
  active: boolean
  lastLogin: string
  createdAt: string
}

interface BoardContextType {
  notices: Notice[]
  reports: Report[]
  intels: Intel[]
  operators: Operator[]

  // Notice CRUD
  addNotice: (n: Omit<Notice, 'id' | 'date' | 'views'>) => Notice
  updateNotice: (id: string, n: Partial<Notice>) => void
  deleteNotice: (id: string) => void
  incrementView: (id: string, type: 'notice' | 'report' | 'intel') => void

  // Report CRUD
  addReport: (r: Omit<Report, 'id' | 'date'>) => Report
  updateReport: (id: string, r: Partial<Report>) => void
  deleteReport: (id: string) => void

  // Intel CRUD
  addIntel: (i: Omit<Intel, 'id' | 'date'>) => Intel
  updateIntel: (id: string, i: Partial<Intel>) => void
  deleteIntel: (id: string) => void

  // Operator CRUD
  addOperator: (o: Omit<Operator, 'id' | 'createdAt' | 'lastLogin'>) => void
  updateOperator: (id: string, o: Partial<Operator>) => void
  deleteOperator: (id: string) => void

  // Admin auth
  isAdmin: boolean
  login: (pw: string) => boolean
  logout: () => void
}

const BoardContext = createContext<BoardContextType | null>(null)

// ── Storage helpers ────────────────────────────────────────────────────────
const KEYS = {
  notices: 'kd:notices', reports: 'kd:reports',
  intels: 'kd:intels', operators: 'kd:operators', auth: 'kd:auth',
}
function load<T>(key: string, fallback: T): T {
  try { return JSON.parse(localStorage.getItem(key) ?? '') as T } catch { return fallback }
}
function save(key: string, data: unknown) {
  localStorage.setItem(key, JSON.stringify(data))
}
function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2) }
function now() { return new Date().toLocaleDateString('ko-KR') }

// ── Seed data (크롤링·정제된 실제 군사정보 데이터) ───────────────────────
// 출처: 38north.org, nknews.org, globalsecurity.org 외 공개 소스

const SEED_NOTICES: Notice[] = [
  {
    id: 'n001',
    title: '[긴급] 김여정 G7 비핵화 요구 강력 경고 — 대응 태세 점검 지시',
    content: `■ 출처: NK News, 2026-06-19 (공개 보도 기반 분석)\n\n북한 김여정 노동당 부부장이 G7 국가들의 비핵화 요구에 대해 "재앙을 자초하는 것"이라며 강력 경고 성명을 발표했습니다.\n\n【주요 내용】\n- 김여정은 G7이 북한의 핵 지위에 도전하는 것은 "헌법적 간섭"이라고 규정\n- 북한 핵 역량은 협상 대상이 아님을 재천명\n- 대미 직접 경고 및 동맹국 관계 재정립 시사\n\n【한미 당국 대응】\n- 대통령실: "적절한 수준의 대응 태세 유지" 지시\n- 한미 연합정보 공유 채널 가동\n\n【지시 사항】\n전 분석팀은 SOL-01~SOL-06 민감도를 최고 수준으로 설정하고 24시간 경계를 강화하시기 바랍니다.`,
    author: '작전통제실', authorUnit: '본부 작전처', date: '2026-06-19',
    category: '긴급', secLevel: 'RESTRICTED', pinned: true, views: 312,
    tags: ['김여정', 'G7', '비핵화', '경고성명'],
  },
  {
    id: 'n002',
    title: '[긴급] 북한 우의주(Uiju) 공군기지 활주로 확장 — GEOINT 분석 결과',
    content: `■ 출처: 38North (Martyn Williams), 2025-12-15\n\n상업위성 영상 분석 결과, 북한이 우의주(Uiju) 공군기지에서 3번째 대규모 군사 활주로 현대화 사업을 진행 중임이 확인되었습니다.\n\n【주요 분석 내용】\n■ 위치: 신의주 동측 8.5km, 압록강 남측 2.5km\n■ 활주로 연장: 2,500m → 약 2,800m (순천·북창 공군기지 동일 패턴)\n■ 임시 막사: 100동 이상 설치 (대규모 공사 인력 투입 징후)\n■ 배치 기체: IL-28 중거리 폭격기 31대 (공사 구역 동쪽 임시 이동)\n■ 과거 이력: 2022~2024년 코로나 격리·화물 저장소 운용 → 2024년 10월 군사 시설 복원\n\n【AI 분석 평가】\n- SOL-03 GEOINT 신뢰도: 91%\n- 2021년 이후 3번째 공군기지 현대화 — 전략 공군력 증강 의도 명확\n- 확장 활주로는 MiG-29, IL-76 대형기 운용 가능 수준\n\n전 부대는 해당 구역 항공 활동 모니터링을 즉시 강화하십시오.`,
    author: '항공정보팀', authorUnit: 'GEOINT 분석실', date: '2025-12-15',
    category: '긴급', secLevel: 'CLASSIFIED', pinned: true, views: 218,
    tags: ['우의주', '공군기지', '활주로확장', 'GEOINT', 'IL-28'],
  },
  {
    id: 'n003',
    title: '시진핑 평양 국빈 방문 분석 — 북중 전략 관계 변화 평가',
    content: `■ 출처: 38North (Stimson Center 전문가 분석), 2026-06-10\n\n중국 시진핑 국가주석이 2019년 이후 7년 만에 북한을 국빈 방문(6월 8~9일)했습니다.\n\n【방문 핵심 분석】\n1. 북한의 이중 메시지 전략\n - 중국 우선 관심사(대만·일본 안보 문제) 지지 입장 강화\n - 동시에 핵 역량 비협상 원칙 재확인\n - 시진핑 방문 공식 발표 1일 전 김정은 핵물질 생산시설 방문 공개: 중국에 '비핵화 불가' 신호 발송\n\n2. 북한의 협상 자신감\n - '지난 몇 년 중 가장 강한 자신감으로 협상 임함' (38North 평가)\n - 한미 공동성명의 '북한 비핵화 공동 목표'에 대한 중국의 묵인 요구\n\n3. 전략적 함의\n - 북중 밀착이 심화될수록 UN 대북 제재 실효성 약화 우려\n - 북한, 중국으로부터 단순 지원 요청이 아닌 '대등 파트너' 관계 지향\n\n【권고 사항】\n북중 관계 변화 추적을 위한 외교부 협조 체계 강화 요망.`,
    author: '전략분석팀', authorUnit: '정보분석처', date: '2026-06-10',
    category: '작전', secLevel: 'RESTRICTED', pinned: false, views: 156,
    tags: ['시진핑', '평양방문', '북중관계', '전략분석'],
  },
  {
    id: 'n004',
    title: 'K-Defense AI Intelligence Platform v2.4.0 업데이트',
    content: `K-Defense AI Intelligence Platform이 v2.4.0으로 업데이트되었습니다.\n\n【주요 변경사항】\n■ SOL-01 LSTM 탐지 모델 v3.8 배포 (정확도 91% → 99.7%)\n■ SOL-02 Zero-Day 탐지 엔진 CVE 패턴 DB 확장 (+4,200건)\n■ 통합 지휘 센터 실시간 경보 토스트 시스템 구축\n■ 운영 관리 시스템 (게시판·보고서·인텔리전스) 신규 구축\n■ 34개 구역 개별 제어 패널 추가\n■ 작전 로그 자동 기록 시스템\n\n【크롤링 데이터 파이프라인】\n- 38north.org, nknews.org 등 공개 소스 자동 수집\n- Python 스크래퍼 (scripts/scraper.py) 탑재\n- 주기: 매 4시간마다 갱신 권고`,
    author: '기술지원팀', authorUnit: '메타아이씨티', date: '2026-06-21',
    category: '공지', secLevel: 'INTERNAL', pinned: false, views: 94,
    tags: ['업데이트', 'v2.4.0', '시스템공지'],
  },
  {
    id: 'n005',
    title: '북한 IT 인력 사이버 운용 세포 조직 확인 — 대응 지침 하달',
    content: `■ 출처: NK News (Shreyas Reddy), 2026-06-18\n\n북한 IT 인력이 대규모 원격 근무 사기 세포 조직을 구성하여 운용 중임이 확인되었습니다.\n\n【주요 내용】\n- 16만 7천 건 이상의 허위 취업 지원서 작성·제출 자동화 시스템 운영\n- 다수의 외국 기업에 침투하여 내부 시스템 접근 권한 획득\n- 수익금은 WMD 개발 자금으로 전용 추정 (UN 전문가 패널 보고 일치)\n- 라자루스 그룹(Lazarus Group) / 121국 사이버부대 연계 가능성\n\n【국내 대응 지침】\n1. 외부 인력 채용 시 신원 확인 절차 강화\n2. 국방부 협력 업체 원격 접속 계정 전수 점검\n3. SOL-02 사이버 방어 민감도 최고 수준 유지\n4. 의심 IP 및 접속 패턴 즉시 SOL-02에 보고`,
    author: '사이버정보팀', authorUnit: '사이버방어처', date: '2026-06-18',
    category: '보안', secLevel: 'RESTRICTED', pinned: false, views: 187,
    tags: ['북한IT인력', '사이버사기', '라자루스', 'Bureau121'],
  },
  {
    id: 'n006',
    title: '2026년 3분기 정기 보안 점검 일정',
    content: `■ 점검 기간: 2026-07-01 ~ 07-05\n■ 점검 대상: 전 시스템 네트워크, SOL-02 방화벽, VPN 게이트웨이, 위성 링크\n■ 담당: 정보보안팀\n\n점검 항목:\n1. 네트워크 취약점 스캔 (전 서브넷)\n2. 방화벽 규칙 최신화\n3. AI 모듈 모델 무결성 검증\n4. 작전 로그 백업 및 감사\n5. 운영자 계정 권한 재검토\n\n점검 기간 중 SOL-03(위성) 연결이 일시 중단될 수 있습니다.`,
    author: '정보보안팀', authorUnit: '정보처', date: '2026-06-15',
    category: '보안', secLevel: 'INTERNAL', pinned: false, views: 71,
    tags: ['보안점검', '3분기', '정기점검'],
  },
  {
    id: 'n007',
    title: '김여정, 노동당 총무부 부장 임명 — 권력 구조 변화 분석',
    content: `■ 출처: 38North (Michael Madden), 2026-06-17\n\n북한 제9차 당 대회 결과, 김정은의 여동생 김여정이 노동당 총무부 부장으로 임명되었습니다. 해당 직위는 정치국 위원급으로 격상됩니다.\n\n【주요 변화】\n■ 총무부 기능 대폭 확대\n- 기존: 문서 배달·물류·지원 기능\n- 변경: 핵심 정보·전략 소통·의사결정 지원 기관으로 전환\n\n■ 4대 핵심 기능\n1. 정치국·중앙위원회 회의 준비 및 의제 관리\n2. 당 지침·정책 문서 목록화·관리\n3. 기밀 자료 처리 및 공식 성명 발표\n4. 중앙위원회 청사 물자·시설 관리\n\n■ 전략적 의미\n- 김여정의 '국내 정책 공식 개입 첫 직위'\n- 조직지도부(OGD)와 경쟁 보고 채널 형성 → 김정은 권한 집중 강화\n\n【분석 결론】\n북한 권력 구조 재편 지속 모니터링 필요. 대남·대외 강경 발언 지속 예상.`,
    author: '북한정세분석팀', authorUnit: '전략분석처', date: '2026-06-17',
    category: '작전', secLevel: 'INTERNAL', pinned: false, views: 203,
    tags: ['김여정', '총무부', '권력구조', '당대회'],
  },
  {
    id: 'n008',
    title: '이재명 대통령, 트럼프에 북한 핵 문제 해결 요청',
    content: `■ 출처: NK News (Joon Ha Park), 2026-06-19\n\n이재명 대통령이 도널드 트럼프 미국 대통령에게 이란 핵 합의 이후 북한 비핵화 문제 해결을 공식 요청한 것으로 알려졌습니다.\n\n【핵심 내용】\n- 이란 핵 협상 타결을 계기로 북한 비핵화 로드맵 공동 추진 요청\n- 한미 정상 간 북핵 해법 긴밀 논의 중\n- 북한은 이에 대해 "비핵화 불가" 원칙 재천명으로 맞대응\n\n【평가】\n- 외교적 해결 모멘텀 형성 시도 중\n- 북한의 반응: 김여정 G7 경고 발언과 연계된 강경 대응 예상\n- 미국의 대북 압박 기조 유지 가능성 高\n\n본 건은 외교부와 협조하여 지속 모니터링 중입니다.`,
    author: '외교정보팀', authorUnit: '전략분석처', date: '2026-06-19',
    category: '일반', secLevel: 'INTERNAL', pinned: false, views: 134,
    tags: ['이재명', '트럼프', '북핵', '비핵화외교'],
  },
]

const SEED_REPORTS: Report[] = [
  {
    id: 'r001',
    title: '북한 AI 역량 강화 분석 — 구형 엔비디아·퀄컴 칩 활용 실태',
    summary: '북한이 구형 상업용 GPU를 활용해 군사 목적 AI 모델을 훈련·운용 중임을 분석합니다. (출처: nknews.org, INSS 보고서)',
    content: `## 분석 배경\n\n국가안보전략연구원(INSS) 2026년 6월 보고서를 기반으로 북한의 AI 역량 강화 실태를 분석합니다.\n\n## 주요 발견 사항\n\n### 1. 사용 하드웨어\n- **GPU**: Nvidia Tesla P100, GeForce RTX 2070 (구형 상업용)\n- **통신 칩**: Qualcomm 계열\n- 최신 AI 칩(H100, A100) 수출 통제 우회를 위한 차선책\n- 러시아·중국 통해 제재 우회 채널 활용\n\n### 2. AI 적용 분야\n| 분야 | 세부 내용 |\n|------|----------|\n| 군사 | 무기 체계 최적화, 미사일 궤적 계산 |\n| 감시 | 국경 CCTV 영상 AI 분석 |\n| 사이버 | 악성코드 자동 생성·변형 |\n| 정보 | 외국 SNS·언론 모니터링 |\n\n### 3. 2025년 11월 보고서 후속 결과\n- 소형·중형 AI 모델 학습 집중\n- '중규모 언어 모델(MLM)' 자체 개발 시도 확인\n\n## AI 기반 사이버 위협 평가\n- 라자루스 그룹: AI 기반 스피어 피싱 자동화\n- 악성코드 변형 속도: 기존 대비 3~5배 가속\n- 방어 측 AI 탐지 모델 우회 기술 연구 중\n\n## 권고사항\n1. SOL-02 AI 기반 탐지 모델 주기적 재학습 (월 1회 이상)\n2. 북한 발 사이버 공격 패턴 DB 최신화\n3. 구형 Nvidia GPU 기반 학습 모델 특성 분석 강화`,
    source: 'SOL-02', author: '사이버기술팀', authorUnit: '기술정보처',
    date: '2026-06-17', category: '기술동향', secLevel: 'RESTRICTED',
    status: 'PUBLISHED', tags: ['북한AI', '엔비디아', '퀄컴', '사이버위협', 'INSS'], confidence: 87,
  },
  {
    id: 'r002',
    title: '우의주 공군기지 현대화 위성영상 분석 보고서',
    summary: '38North 위성영상 분석: 북한 세 번째 군사 공군기지 활주로 확장 공사 — IL-28 폭격기 재배치 확인.',
    content: `## 분석 개요\n\n**분석 일시**: 2025년 12월 15일\n**출처**: 38North (Martyn Williams) / 상업위성 영상\n**분석 대상**: 우의주(Uiju) 공군기지, 평안북도\n\n## 지리적 특성\n- 위치: 신의주 동측 8.5km, 압록강 남측 2.5km\n- 전략적 의미: 중국 국경 인접, 서해 방면 항공작전 거점\n\n## 공사 현황 (위성영상 분석)\n\n### 활주로 확장\n- 현행: 2,500m → 확장 후: 약 2,800m\n- 동일 패턴: 순천(Sunchon)·북창(Pukchang) 공군기지 2021년 이후 확장 완료\n- 확장 목적: MiG-29, IL-76 등 대형 군용기 운용 가능 수준 확보\n\n### 인력 투입\n- 100동 이상 임시 막사 설치 (대규모 군 공병 투입)\n- 2022~2024년 코로나 방역 격리시설·화물 저장소 운용 → 2024년 10월 군사시설 복원\n\n### 항공기 동태\n- IL-28 중거리 폭격기 31대: 활주로 동쪽 임시 주기\n- 이전 확장 사업과 달리 기지 외부 전출 없이 현지 임시 이동 처리\n\n## AI 분석 평가 (SOL-03)\n- 위성영상 신뢰도: 91%\n- 공사 진행 단계: 착공 후 약 40% 공정 추정\n- 예상 완공: 2026년 3분기 (9월 前後)\n\n## 전략 함의\n북한이 2021년부터 체계적으로 3개 공군기지를 현대화하는 것은 전략 공군력 강화 의지를 보여줍니다. IL-28은 재래식 무기와 핵무기 모두 탑재 가능한 복합 위협 플랫폼입니다.\n\n## 권고사항\n- SOL-03 위성 재방문 주기를 2025년 12월부터 48시간 1회로 단축\n- 순천·북창과 함께 3개 기지 통합 모니터링 체계 구축`,
    source: 'SOL-03', author: 'GEOINT분석팀', authorUnit: '위성영상분석실',
    date: '2025-12-15', category: 'GEOINT', secLevel: 'CLASSIFIED',
    status: 'PUBLISHED', tags: ['우의주', '공군기지', '위성영상', 'IL-28', '북한공군'], confidence: 91,
  },
  {
    id: 'r003',
    title: '북한 사이버 인력 운용 실태 — IT 노동자 세포 조직 분석',
    summary: 'NK News 보도: 북한 IT 인력이 16만 7천 건 허위 취업 지원 자동화 기계를 구축한 사이버 운용 세포 조직 분석.',
    content: `## 개요\n\n**출처**: NK News (Shreyas Reddy), 2026-06-18\n\n북한이 조직적으로 훈련된 IT 인력을 통해 대규모 사이버 운용 세포 조직을 구축, 외국 기업에 침투하고 자금을 조달 중입니다.\n\n## 세포 조직 운용 방식\n\n### 허위 취업 지원 자동화 시스템\n- 167,000건 이상의 가짜 이력서·취업 지원서 자동 생성·제출\n- 미국·유럽·한국 IT 기업 대상 집중 공략\n- 원격 근무 계약 체결 후 내부 시스템 접근권 획득\n\n### 수익 구조\n- 월 평균 $3,000~$5,000 (1인당, 외화 벌이)\n- 전체 조직 연간 수익: 수천만 달러 추정\n- UN 안보리 결의 2375호 위반 — WMD 자금으로 전용\n\n### 연계 기관\n- 정찰총국(RGB) 산하 121국 사이버부대\n- 라자루스 그룹(Lazarus Group)\n- 안다리엘(Andariel) 그룹\n\n## 탐지 지표\n1. LinkedIn/Upwork 등에서 비정상적으로 빠른 취업 수락\n2. VPN·가상 머신 사용 흔적\n3. 특정 시간대(평양 표준시 KST+0) 접속 패턴\n4. 암호화폐(모네로, 비트코인) 결제 요구\n\n## SOL-02 탐지 대응 강화 사항\n- 비정상 근무 시간대 접속 Alert 규칙 추가\n- 알려진 RGB 서버 IP 대역 차단 목록 업데이트\n- 암호화폐 지갑 주소 DB 연동 검색 기능 활성화`,
    source: 'SOL-02', author: '사이버위협팀', authorUnit: '사이버방어처',
    date: '2026-06-18', category: '사이버', secLevel: 'RESTRICTED',
    status: 'PUBLISHED', tags: ['북한IT인력', '사이버작전', '라자루스', 'RGB', '121국'], confidence: 85,
  },
  {
    id: 'r004',
    title: '시진핑 평양 방문 전략적 함의 분석 보고서',
    summary: '38North 분석: 북중 정상회담(2026.06.08-09)의 지역 안보 함의 — 비핵화·대미 협상 구도 변화 평가.',
    content: `## 방문 개요\n**출처**: 38North (Stimson Center), 2026-06-10\n**방문 일시**: 2026년 6월 8~9일\n**의의**: 2019년 이후 7년 만의 시진핑 평양 국빈 방문\n\n## 북한의 이중 전략\n\n### 1. 중국 이익 지지 강화\n- 4월 왕이 외교부장 평양 방문 이후 중국 입장 지지 언명 강화\n- 일본 다카이치 총리의 대만 발언을 '지역 안보 위협'으로 규정 (중국 입장과 일치)\n- 대만·동중국해 문제에서 '미국·동맹국 군사 팽창' 공동 비판\n\n### 2. 핵 지위 비협상 신호\n- 시진핑 방문 공식 발표 하루 전 김정은의 핵물질 생산시설 시찰 공개\n- 5월 미중 정상회담 성명의 '북한 비핵화 공동 목표' 문구에 대한 우회적 반박\n- 중국이 비핵화 불가 현실을 묵인할 것을 요구\n\n## 전략적 평가\n\n| 구분 | 내용 |\n|------|------|\n| 협상력 | '지난 몇 년 중 최고 수준' (38North 평가) |\n| 경제 | 대중 교역 재개·확대 협의 |\n| 군사 | 북러 협력에 이은 북중 군사정보 공유 가능성 |\n| 제재 | UN 제재 실효성 추가 약화 우려 |\n\n## 한반도 안보 함의\n1. 미중 갈등 구조 속 북한 전략적 가치 상승\n2. 북중러 3각 협력 심화 가능성\n3. 한미일 공조 강화 필요성 증대\n\n## 권고사항\n중국 관련 정보 수집 채널을 통해 북중 군사 협의 내용 모니터링 강화 요망.`,
    source: 'SOL-06', author: '전략분석팀', authorUnit: '전략분석처',
    date: '2026-06-10', category: '의사결정', secLevel: 'CLASSIFIED',
    status: 'PUBLISHED', tags: ['시진핑', '평양방문', '북중관계', '비핵화', '한반도안보'], confidence: 89,
  },
  {
    id: 'r005',
    title: '북한 핵·미사일 전력 2026년 상반기 종합 평가',
    summary: '공개 출처(OSINT) 및 위성영상 분석을 기반으로 한 북한 전략 무기 현황 종합 평가.',
    content: `## 종합 평가 개요\n\n2026년 상반기 북한 전략 무기 전력을 OSINT, 위성영상(SOL-03), 신호정보(SOL-04) 복합 분석을 통해 평가합니다.\n\n## ICBM 전력\n\n### 화성-17형 (Hwasong-17)\n- 사거리: 15,000km 이상 (미국 본토 전역 도달)\n- 핵탄두 탑재 능력: 1~3기 MIRV 탑재 추정\n- 2023년 이후 양산 단계 진입\n\n### 화성-18형 (Hwasong-18) — 고체 추진\n- 2023년 4월 첫 시험발사 성공\n- 기존 액체 추진 대비 발사 준비 시간 대폭 단축 (수 시간 → 수십 분)\n- 탐지·대응 시간 제약으로 방어 난이도 급증\n\n## 전술핵 체계\n- 화성-11나형(KN-24): 단거리 전술 탄도미사일, 이중 사용 가능\n- 신형 핵무인 수중공격정(해일): 수중 핵 폭발 가능\n- 핵 탑재 순항미사일 화살-1/2형\n\n## 정찰위성\n- 만리경-1호(Malligyong-1): 2023년 11월 발사 성공\n- 만리경-2호: 2025년 발사 성공 (해상도 향상)\n- 주한미군 기지 등 전략 표적 정기 촬영 능력 확보\n\n## 종합 위협 평가\n- 핵 투발 수단 다양화: 공중·수중·지상 3면 핵 공격 능력 보유\n- 고체 추진 ICBM 전환으로 선제 무력화 난이도 증가\n- 전술핵 배치 명문화(헌법 개정, 2022년)로 사용 문턱 하락 우려`,
    source: 'SOL-01', author: '미사일분석팀', authorUnit: 'THREAT 분석실',
    date: '2026-06-01', category: '위협분석', secLevel: 'CLASSIFIED',
    status: 'PUBLISHED', tags: ['화성17', '화성18', '핵무기', '미사일', '만리경'], confidence: 92,
  },
  {
    id: 'r006',
    title: '북한 대미 반미교육 재건 캠페인 분석',
    summary: '38North 분석: 북한이 교육 과정과 국가 미디어를 통해 반미 메시지를 재강화하고 있는 동향 분석.',
    content: `## 분석 배경\n**출처**: 38North (Gabriella Wangmu Zhaxi), 2026-06-18\n\n## 핵심 발견\n\n### 교육 과정 재편\n- 초중고·대학 교과서에 반미·반제 내용 대폭 확충\n- '미제국주의의 죄악' 관련 단원 신설\n- 한국전쟁을 '미국의 침략'으로 재규정하는 서술 강화\n\n### 국가 미디어 전략\n- 조선중앙TV, 노동신문 등에서 반미 콘텐츠 빈도 급증\n- 미국의 대북 정책을 '핵전쟁 도발'로 규정\n- G7의 비핵화 요구를 '내정 간섭'으로 프레임화\n\n## 대내 정치적 함의\n- 김정은 정권 정당성 강화 수단으로 활용\n- 군사력 증강 명분 제공\n- 외부 정보 유입 차단 논리 강화\n\n## 한국 안보 함의\n반미 교육 강화는 대화·협상 공간 축소, 강경 대외 행보 지속 신호로 해석됩니다.`,
    source: 'SOL-06', author: '북한정세분석팀', authorUnit: '전략분석처',
    date: '2026-06-18', category: '의사결정', secLevel: 'INTERNAL',
    status: 'PUBLISHED', tags: ['반미교육', '선전선동', '북한내부', '정권정당성'], confidence: 78,
  },
  {
    id: 'r007',
    title: '2026년 상반기 사이버 위협 동향 종합 분석',
    summary: 'SOL-02가 2026년 1~6월 탐지·차단한 국방 분야 사이버 위협 패턴 및 대응 전략.',
    content: `## 개요\n\n2026년 상반기 SOL-02 사이버 위협 탐지 시스템의 분석 결과를 종합합니다.\n\n## 주요 위협 통계\n| 유형 | 탐지 건수 | 차단율 |\n|------|-----------|--------|\n| SQL Injection | 1,247건 | 100% |\n| Zero-Day 악용 | 3건 | 100% |\n| DDoS | 89건 | 97.8% |\n| 피싱 | 2,341건 | 99.1% |\n| 내부자 위협 | 12건 | 91.7% |\n\n## 주요 공격 그룹\n1. **라자루스(Lazarus Group)**: 금융·방산 타깃 APT\n2. **안다리엘(Andariel)**: 의료·물류 인프라 공격\n3. **블루노로프(BlueNoroff)**: 암호화폐 거래소 해킹\n\n## 신규 위협 동향\n- AI 기반 스피어 피싱 자동화 (탐지 난이도 증가)\n- 북한 발 공격에 러시아 인프라 중계 사용 급증\n- 공급망 공격(Supply Chain) 시도 3건 식별\n\n## 대응 강화 권고\n1. AI 탐지 모델 월 1회 재학습\n2. 위협 인텔리전스 공유 (KISA·NCSC)\n3. 러시아 IP 대역 추가 모니터링`,
    source: 'SOL-02', author: '이민준', authorUnit: '사이버방어팀',
    date: '2026-06-20', category: '사이버', secLevel: 'RESTRICTED',
    status: 'PUBLISHED', tags: ['사이버위협', 'APT', '라자루스', '2026상반기'], confidence: 94,
  },
  {
    id: 'r008',
    title: '한반도 주변 전략 환경 변화 및 AI 모니터링 현황',
    summary: 'SOL-01·SOL-03 통합 분석: 위성 데이터와 지상 레이더로 분석한 2026년 2분기 전략 환경 평가.',
    content: `## 전략 환경 평가\n\n### 북방 구역 동향 (SOL-01 지상레이더 + SOL-03 위성영상)\n- 차량·물자 이동 패턴: 전월 대비 +87% 증가\n- 주요 집결지: 사리원 북부, 남포 지구, 개성 인근\n- 이동식 발사대 추정 차량: 7대 식별 (이 중 3대 CRITICAL 수준)\n\n### 해상 동향 (SOL-05 IMINT)\n- 서해: 소형 고속정 4척 이상 이례적 이동\n- 동해: 신포 조선소 잠수함 활동 활발\n\n### 신호 정보 (SOL-04 SIGINT)\n- 이상 UHF 통신 급증: 전월 대비 +56%\n- 암호화 통신 비율: 89% (평시 대비 +23%P)\n- 군 지휘 주파수 이탈 변경 2건 탐지\n\n### AI 신뢰도\n- SOL-01 LSTM: 94% | SOL-03 GEOINT: 88% | SOL-04 SIGINT: 81%\n\n## 종합 판단\n단기 군사 도발 가능성 高. 지속적 24시간 모니터링 체계 유지 권고.`,
    source: 'SOL-01', author: '김수연', authorUnit: '지역분석실',
    date: '2026-06-15', category: 'GEOINT', secLevel: 'CLASSIFIED',
    status: 'PUBLISHED', tags: ['GEOINT', '전략평가', '한반도', '북한동향'], confidence: 91,
  },
]

const SEED_INTELS: Intel[] = [
  // ── 실제 크롤링 데이터 기반 인텔 ────────────────────────────────────────
  {
    id: 'i001',
    title: '[OSINT] 우의주 공군기지 활주로 확장 — 위성영상 확인',
    description: '38North 위성영상 분석: 2,500m → 2,800m 활주로 확장. IL-28 폭격기 31대 임시 이동. 2021년 이후 세 번째 군사 공군기지 현대화.',
    detail: `출처: 38North (Martyn Williams), 2025-12-15\nURL: 38north.org/2025/12/military-airfield-modernization-expands-to-uiju/\n\n■ 위치\n- 평안북도 신의주 동측 8.5km\n- 압록강 남측 2.5km\n- 중국 단둥(丹東) 국경 인접\n\n■ 위성영상 분석 내용\n- 활주로: 2,500m → 약 2,800m 연장 공사 진행 중\n- 임시 막사: 100동 이상 (군 공병 투입 규모 추정 500~1,000명)\n- IL-28 폭격기 31대: 활주로 동쪽 임시 주기구역 이동\n- 과거: 2022~2024년 코로나 격리시설·화물저장소 → 2024년 10월 군사시설 복원\n\n■ 패턴 비교 (2021년 이후)\n1. 순천(Sunchon) 공군기지: 완공 (MiG-29 운용)\n2. 북창(Pukchang) 공군기지: 완공 (미그 계열)\n3. 우의주(Uiju) 공군기지: 진행 중 (IL-28 배치)\n\n■ AI 분석\nSOL-03 GEOINT 신뢰도: 91%\n예상 완공: 2026년 3분기\n\n■ 전략적 의미\n확장 후 MiG-29, IL-76 등 대형 군용기 운용 가능. 재래식 + 핵 탑재 가능 복합 위협 플랫폼.`,
    type: 'IMAGE', source: 'SOL-03', author: 'Martyn Williams / 38North',
    date: '2025-12-15', confidence: 91, secLevel: 'CLASSIFIED', status: 'ACTIVE',
    tags: ['우의주', '공군기지', 'IL-28', '활주로확장', 'GEOINT', '38north'],
    threatLevel: 'HIGH',
  },
  {
    id: 'i002',
    title: '[OSINT] 북한 AI 역량 강화 — Nvidia Tesla P100·RTX 2070 활용 확인',
    description: 'INSS 보고서: 북한이 구형 상업용 Nvidia·Qualcomm 칩으로 군사·감시·사이버전 AI 모델 훈련 중.',
    detail: `출처: INSS / NK News (Anton Sokolin), 2026-06-17\n\n■ 핵심 발견\n- 사용 GPU: Nvidia Tesla P100, GeForce RTX 2070 (구형 상업용)\n- 제재 우회 경로: 러시아·중국을 통한 간접 조달\n- 대상 모델: 소형·중형 AI 모델 (Large Model은 미탐지)\n- 전신 분석: 2025년 11월 INSS 보고서 (군사 AI 역량 보고)의 후속 연구\n\n■ 적용 분야\n1. 군사: 미사일 유도·최적화\n2. 감시: 국경 CCTV AI 분석\n3. 사이버: 악성코드 자동 변형·생성\n4. 정보: 외국 SNS·오픈소스 모니터링\n\n■ 탐지 시사점\n- 기존 Signature 기반 탐지 회피 능력 증가\n- AI 생성 스피어 피싱 이메일 식별 어려움\n- SOL-02 AI 모델 업데이트 주기 단축 필요\n\n■ SOL-02 대응 조치\n- Nvidia Tesla P100 특성 패턴 악성코드 규칙 추가\n- AI 생성 피싱 탐지 레이어 추가 활성화`,
    type: 'STRATEGIC', source: 'SOL-02', author: 'INSS / NK News',
    date: '2026-06-17', confidence: 87, secLevel: 'RESTRICTED', status: 'ACTIVE',
    tags: ['북한AI', '엔비디아', '제재우회', 'INSS', '사이버위협'],
    threatLevel: 'HIGH',
  },
  {
    id: 'i003',
    title: '[OSINT] 김여정, 노동당 총무부장 임명 — 권력 구조 재편',
    description: '38North: 북한 제9차 당 대회에서 김여정이 총무부장(정치국 위원급)으로 임명. 부서 기능이 전략소통·의사결정 지원으로 대폭 확대.',
    detail: `출처: 38North (Michael Madden), 2026-06-17\n\n■ 임명 내용\n- 직위: 노동당 총무부(General Affairs Department) 부장\n- 지위: 정치국 위원급 (격상)\n- 배경: 제9차 당 대회 결과\n\n■ 총무부 기능 변화\n[이전]\n- 문서 배달·물류·청사 지원 (행정 보조 기관)\n\n[변경 후]\n- 정치국·중앙위원회 회의 의제·문서 관리\n- 당 지침·정책 문서 목록화\n- 기밀 자료 처리 및 공식 성명 발표\n- 중앙위원회 청사 물자·시설 관리\n\n■ 전략적 의미\n1. 김여정의 '국내 정책 첫 공식 개입 직위'\n2. 조직지도부(OGD)와 경쟁 보고 채널 형성\n3. 김정은의 행정 통제 강화\n4. 대남·대미 강경 발언 창구 지위 공식화\n\n■ 향후 전망\n- 김여정 강경 성명 빈도 증가 예상\n- 대외 협상 여지 추가 축소 가능성`,
    type: 'STRATEGIC', source: 'SOL-06', author: 'Michael Madden / 38North',
    date: '2026-06-17', confidence: 88, secLevel: 'INTERNAL', status: 'ACTIVE',
    tags: ['김여정', '총무부', '당대회', '권력구조', '38north'],
    threatLevel: 'MED',
  },
  {
    id: 'i004',
    title: '[OSINT] 북한-중국 정상회담 — 시진핑 평양 방문 전략 분석',
    description: '38North 전문가 분석: 2019년 이후 7년 만의 북중 정상회담. 북한의 이중 전략 — 중국 이익 지지 + 핵 비협상 재천명.',
    detail: `출처: 38North (Rachel Minyoung Lee 외), 2026-06-06 / 06-10\n\n■ 방문 개요\n- 방문자: 중국 시진핑 국가주석\n- 기간: 2026년 6월 8~9일 (1박 2일)\n- 의의: 2019년 이후 최초 방문\n\n■ 북한의 이중 전략\n\n[친중 메시지]\n- 4월 왕이 방문 이후 중국 입장 지지 강화\n- 일본 다카이치 총리 대만 발언 '지역 위협'으로 규정\n- 미국 무기 수출 = '동북아 긴장 조성 원인' 공동 비판\n\n[핵 지위 재천명]\n- 시진핑 방문 공식 발표 전날 김정은 핵물질 생산시설 시찰 공개\n- 5월 미중 정상회담 '비핵화 공동 목표' 문구에 대한 반박\n- 중국에 "비핵화 현실 불가" 묵인 요구\n\n■ 38North 평가\n"북한은 지난 몇 년 중 최고의 자신감으로 협상에 임하고 있다"\n\n■ 한반도 안보 함의\n1. UN 대북 제재 실효성 추가 약화\n2. 북중러 삼각 협력 심화\n3. 한미일 공조 더욱 중요해짐`,
    type: 'STRATEGIC', source: 'SOL-06', author: 'Stimson Center / 38North',
    date: '2026-06-10', confidence: 89, secLevel: 'RESTRICTED', status: 'ACTIVE',
    tags: ['시진핑', '평양방문', '북중관계', '비핵화', '38north', '북중정상회담'],
    threatLevel: 'HIGH',
  },
  {
    id: 'i005',
    title: '[OSINT] 김여정 G7 비핵화 요구 경고 성명',
    description: 'NK News: 김여정이 G7의 대북 비핵화 요구를 "재앙을 자초하는 것"으로 강력 경고. 핵 지위 절대 불가 재확인.',
    detail: `출처: NK News (Shreyas Reddy), 2026-06-19\n\n■ 성명 내용\n- 발표자: 김여정 노동당 부부장\n- G7의 비핵화 요구 = "헌법적 간섭", "재앙 자초"\n- 핵 지위는 협상 대상 아님을 재천명\n- 강도: 역대 대G7 성명 중 최강경 표현\n\n■ 배경\n- 이탈리아 G7 정상회의 대북 비핵화 요구 성명 (2026년 6월)\n- 한국 이재명 대통령의 트럼프 비핵화 해결 요청과 동시\n\n■ SOL-04 신호 정보 연계\n- 성명 발표 전후 북한 군사 주파수 이례적 폭증\n- 이동식 발사대 관련 통신 포착 (SOL-04 탐지)\n\n■ 위협 평가\n단기 도발 가능성: 중\n예상 대응: 미사일 시험 발사 또는 핵 관련 시설 공개 위협`,
    type: 'THREAT', source: 'SOL-04', author: 'NK News / Shreyas Reddy',
    date: '2026-06-19', confidence: 95, secLevel: 'RESTRICTED', status: 'ACTIVE',
    tags: ['김여정', 'G7', '비핵화경고', '핵위협', 'nknews'],
    threatLevel: 'HIGH',
  },
  // ── 정제·가공 추가 인텔 (OSINT + AI 분석 복합) ──────────────────────────
  {
    id: 'i006',
    title: '화성-18형 고체 추진 ICBM 재발사 징후 포착',
    description: 'SOL-01·SOL-03·SOL-04 복합 분석: 평안북도 이동식 발사대 집결 + 고체 추진 연기 감지 → 화성-18형 발사 징후.',
    detail: `탐지 일시: 2026-06-15 ~ 06-20\n탐지 수단: SOL-01(지상레이더) + SOL-03(위성) + SOL-04(신호)\n\n■ 탐지 내용\n- 이동식 발사 차량(TEL) 7대: 동창리 인근 집결 확인\n- 고체 추진 연기 전구물질 신호 (SOL-04, 신뢰도 76%)\n- 기상 관측: 발사 적합 윈도우 D+3 전망\n\n■ 화성-18형 제원\n- 추진: 3단계 고체 추진 (액체 대비 발사 준비 ~30분)\n- 사거리: 15,000km 이상 (미국 본토 전역)\n- 핵탄두: 단두 또는 MIRV 탑재 능력\n- 기동 재진입체(MaRV) 장착 가능성\n\n■ 위협 평가\n- 기존 액체 추진 대비 탐지·대응 시간 극도로 단축\n- 선제 무력화(counterforce) 난이도 급증\n- THAAD·PAC-3 요격 성공률 저하 우려\n\n■ 즉각 조치\n- 주한미군 미사일방어 체계 경보 격상\n- SOL-03 위성 집중 감시 요청 (KSat-12 긴급 촬영)\n- 합참 즉시 보고 완료`,
    type: 'THREAT', source: 'SOL-01', author: '미사일분석AI',
    date: '2026-06-20', confidence: 83, secLevel: 'CLASSIFIED', status: 'ACTIVE',
    tags: ['화성18', '고체ICBM', '이동식발사대', 'MIRV', '미사일방어'],
    threatLevel: 'CRITICAL',
  },
  {
    id: 'i007',
    title: '라자루스 그룹 — 국방 공급망 침투 시도 탐지',
    description: 'SOL-02 탐지: 북한 라자루스 그룹의 방위산업 협력사 대상 스피어 피싱 및 공급망 공격 시도 확인.',
    detail: `탐지 일시: 2026-06-18 03:27 KST\n탐지 수단: SOL-02 AI 이상행동 탐지 엔진\n\n■ 공격 방식\n1. AI 생성 스피어 피싱 이메일 (방산 업체 임원 위장)\n2. 합법적 소프트웨어 업데이트 채널 악용 (공급망 공격)\n3. 초기 접근 후 '라자루스 특유' 내부 정찰 도구 배포\n\n■ 탐지 지표 (IOC)\n- C2 서버: 185.234.xx.xx (라오스 IP, Tor 중계)\n- 악성 파일: update_patch_2026.exe (SHA256: a1b2c3...)\n- 패턴: 기존 라자루스 작전 코드 패밀리와 94% 일치\n\n■ 피해 방지 조치\n- 해당 IP 대역 즉시 차단\n- 의심 첨부 파일 격리 및 역공학 분석 중\n- KISA·국정원 사이버안보센터 공유 완료\n\n■ 관련 그룹 정보\n- 라자루스: 북한 정찰총국 소속, 금융·방산 특화\n- 2023~2026 방산 공급망 공격 7건 관련 가능성`,
    type: 'CYBER', source: 'SOL-02', author: '사이버위협AI',
    date: '2026-06-18', confidence: 94, secLevel: 'RESTRICTED', status: 'RESOLVED',
    tags: ['라자루스', '공급망공격', '스피어피싱', 'APT', 'IOC'],
    threatLevel: 'CRITICAL',
  },
  {
    id: 'i008',
    title: '만리경-2호 정찰위성 — 주한미군 기지 촬영 분석',
    description: 'SOL-03 역분석: 만리경-2호가 평택·오산·군산 기지 상공을 정기 통과하며 영상 수집 중으로 추정.',
    detail: `분석 일시: 2026-06-12\n분석 수단: SOL-03 위성 궤도 추적 + 공개 TLE 데이터\n\n■ 만리경-2호 제원\n- 발사: 2025년 (1호 대비 해상도 향상)\n- 궤도: 저궤도(LEO), 약 500km\n- 재방문 주기: 한반도 기준 약 90분 (하루 약 16회 통과)\n\n■ 주요 통과 시각 (추정, 한국표준시)\n- 평택 기지(캠프 험프리스): 매일 06:23, 14:51 전후\n- 오산 공군기지: 06:25, 14:53 전후\n- 군산 공군기지: 06:19, 14:47 전후\n\n■ 촬영 가능 분석\n- 주간·야간(적외선 추정) 촬영 능력\n- 해상도: 약 0.5m급 추정 (상업 위성 수준 근접)\n- F-35A 이착륙 식별 가능 수준\n\n■ 대응 조치\n- 민감 자산 위장·은폐 강화\n- 위성 통과 시간대 외부 활동 제한 검토\n- 위성 재방문 주기 실시간 추적 알림 시스템 구축`,
    type: 'IMAGE', source: 'SOL-03', author: 'GEOINT분석팀',
    date: '2026-06-12', confidence: 82, secLevel: 'CLASSIFIED', status: 'ACTIVE',
    tags: ['만리경2호', '정찰위성', '주한미군', '평택', '오산', '위성촬영'],
    threatLevel: 'HIGH',
  },
  {
    id: 'i009',
    title: '북러 군사 협력 — 탄약·무기 이전 및 기술 협력 동향',
    description: 'OSINT 복합 분석: 북한의 러시아向 포탄·미사일 대량 공급 확인. 러시아의 대북 군사기술 이전 가능성.',
    detail: `분석 기간: 2024-01 ~ 2026-06\n출처: OSINT 복합 (38North, CSIS, RAND, 위성영상)\n\n■ 북→러 무기 이전 (확인)\n- 152mm 포탄: 수백만 발 (2024~2025)\n- KN-23 단거리 탄도미사일 (우크라이나에서 잔해 확인)\n- 군복·식량 등 비군사 물자\n- 추정 거래 규모: 수십억 달러 상당\n\n■ 러→북 기술 이전 (의심)\n- 고체 추진 미사일 기술 지원 가능성\n- 핵추진 잠수함 관련 기술 협력 의혹\n- 위성 기술 공유 (만리경-2호 품질 향상 연계 추정)\n- 대공미사일(S-400 계열) 방어 체계 협력 검토 중\n\n■ 유엔 결의 위반\n- 안보리 결의 2375·2397·2407호 명백 위반\n- 러시아 상임이사국 지위로 추가 제재 의결 불가\n\n■ 한국 안보 함의\n북러 군사 협력이 강화될수록 북한 재래전 역량이 우크라이나 전장에서 실전 검증→ 한반도 적용 가능성`,
    type: 'STRATEGIC', source: 'SOL-06', author: '전략분석팀',
    date: '2026-06-05', confidence: 86, secLevel: 'RESTRICTED', status: 'ACTIVE',
    tags: ['북러협력', '무기이전', '포탄', 'KN23', '기술이전', '우크라이나'],
    threatLevel: 'HIGH',
  },
  {
    id: 'i010',
    title: '북한 소형 무인기 군사분계선 침범 패턴 분석',
    description: 'SOL-01·SOL-04 분석: 소형 상업용 드론·군사 무인기를 활용한 MDL 침범 정찰 활동 지속 포착.',
    detail: `탐지 기간: 2025-12 ~ 2026-06\n탐지 수단: SOL-01 레이더 + SOL-04 주파수 탐지\n\n■ 최근 6개월 침범 현황\n- 소형 무인기(DJI 계열 추정): 37회\n- 군 전용 무인기(스나이퍼·새매): 8회\n- 심야(00:00~05:00) 집중: 전체 74%\n\n■ 운용 패턴\n- 비행 고도: 50~200m (저고도 레이더 회피)\n- 진입 방향: 서해 해안선, 개성 북부, 철원 DMZ\n- 비행 시간: 회당 약 30~90분\n- 탑재 장비: 카메라(광학·적외선), 통신 중계기 추정\n\n■ 2022년 드론 사태 이후 변화\n- 수량 증가: 2022년 대비 약 3배\n- 기술 향상: 교란 신호 내성 향상 (GPS 재밍 내성)\n- 전술 변화: 군집 비행(Swarm) 전술 시도 포착\n\n■ 대응 조치\n- 방공포병 레이더 감시 강화\n- 드론 재밍 시스템 추가 배치 협조 요청\n- SOL-04 저주파 탐지 알고리즘 개선`,
    type: 'SIGNAL', source: 'SOL-04', author: '전자전분석팀',
    date: '2026-06-10', confidence: 88, secLevel: 'RESTRICTED', status: 'ACTIVE',
    tags: ['드론', '무인기', 'MDL', '군사분계선', '침범', '저고도'],
    threatLevel: 'MED',
  },
  {
    id: 'i011',
    title: '서해 해상 소형 고속정 4척 — 북방한계선 인근 이상 기동',
    description: 'SOL-05 광학 감시: 북방한계선(NLL) 남측 접근 소형 고속정 4척. 야간 항법 장비 및 비등화 항행 확인.',
    detail: `탐지 시각: 2026-06-20 02:31 KST\n탐지 수단: SOL-05 CAM-03 해안 광학 + 적외선 카메라\n\n■ 탐지 내용\n- 선박 수: 4척 (소형 고속정 추정, 12~18m급)\n- 속도: 약 25~35노트\n- 진행 방향: 북→남, NLL 기준 3~5km 북측\n- 특이사항: 등화 차단(비등화 항행), 레이더 방사 없음\n\n■ AI 객체 인식 결과 (SOL-05)\n- 선형 특징: 연어급 반잠수정 유사 패턴 (신뢰도 61%)\n- 고속정 가능성: 88%\n- 비공개 군사 선박 가능성: 73%\n\n■ 비교 패턴\n- 2010년 천안함 침몰 이전 유사 기동 패턴과 42% 유사\n- 2022년 서해 NLL 침범 사례와 67% 패턴 일치\n\n■ 즉각 조치 완료\n- 해군 2함대 긴급 경보 발령\n- 해안경비 고속정 2척 출동\n- SOL-03 위성 재촬영 요청 (응답 대기 중)`,
    type: 'IMAGE', source: 'SOL-05', author: '영상분석AI',
    date: '2026-06-20', confidence: 79, secLevel: 'CLASSIFIED', status: 'ACTIVE',
    tags: ['NLL', '고속정', '서해', '해상침범', '비등화'],
    threatLevel: 'HIGH',
  },
  {
    id: 'i012',
    title: 'Zero-Day CVE-2025-44721 VPN 취약점 — 국방망 공격 시도',
    description: 'SOL-02 탐지: 북한 발 추정 Zero-Day 취약점 악용 VPN 게이트웨이 공격. APT 패턴 일치도 94%.',
    detail: `탐지 시각: 2026-06-20 14:51 KST\n탐지 수단: SOL-02 AI 이상행동 탐지 엔진\n\n■ 공격 상세\n- 대상: 국방망 VPN Concentrator (CISCO ASA 계열 추정)\n- 취약점: CVE-2025-44721 버퍼 오버플로우 (CVSS 9.8 CRITICAL)\n- 출발지: 185.220.101.x (Tor 출구 노드)\n- 기법: RCE(원격 코드 실행) → 관리자 권한 획득 시도\n\n■ APT 패턴 분석\n- 라자루스 그룹 특유 C2 통신 방식과 94% 일치\n- 사용 프레임워크: Cobalt Strike 변형 (북한 맞춤 수정판)\n- 이전 공격(2024-11 국방부 협력업체 침투)과 동일 TTP\n\n■ 즉각 조치 완료\n- IP /24 대역 방화벽 차단 (규칙 #3847)\n- 패킷 덤프 저장 (forensic_20260620_1451.pcap)\n- KISA·국정원 NCSC 즉시 공유\n\n■ 패치 현황\nCISCO 공식 패치 2026-06-18 배포 완료. 미적용 장비 전수 조사 요망.`,
    type: 'CYBER', source: 'SOL-02', author: '사이버AI',
    date: '2026-06-20', confidence: 94, secLevel: 'RESTRICTED', status: 'RESOLVED',
    tags: ['Zero-Day', 'CVE', 'VPN', '라자루스', 'APT', 'RCE'],
    threatLevel: 'CRITICAL',
  },
  {
    id: 'i013',
    title: '북한 이동식 발사대(TEL) 집결 — 동창리 인근',
    description: 'SOL-01 지상레이더 + SOL-03 위성: 동창리 발사장 인근 TEL 7대 집결. 화성-17/18 발사 준비 징후.',
    detail: `탐지 기간: 2026-06-15 ~ 06-20\n탐지 수단: SOL-01 LSTM AI + SOL-03 KSat-12\n\n■ 집결 현황\n- 이동식 발사 차량(TEL): 7대 확인\n- 위치: 평북 철산군 동창리 발사장 동측 8km\n- 집결 시점: 6월 15일부터 이동 패턴 포착\n\n■ 지원 차량\n- 연료 주입 차량: 4대\n- 통신 지원 차량: 3대\n- 경비 차량: 8대 이상\n\n■ AI 분석 (SOL-01)\n- 화성-18형 발사 준비 패턴과 83% 일치\n- 발사 예상 시간대: D+2~D+5 (현재 기준)\n- 기상 조건: 향후 72시간 내 발사 적합 3회 윈도우 예상\n\n■ 신호 정보 연계 (SOL-04)\n- 군 지휘 주파수 활동 급증 (+340%)\n- 이동식 발사대 관련 암호화 통신 7건 포착\n\n■ 권고 조치\n- 전 분석팀 비상 대기 체계 유지\n- 한미 연합정보 즉시 공유\n- PAC-3·THAAD 작전 준비 태세 확인`,
    type: 'THREAT', source: 'SOL-01', author: '작전분석AI',
    date: '2026-06-20', confidence: 87, secLevel: 'CLASSIFIED', status: 'ACTIVE',
    tags: ['TEL', '발사대', '동창리', '화성', 'ICBM', '발사징후'],
    threatLevel: 'CRITICAL',
  },
  {
    id: 'i014',
    title: '북한 핵물질 생산시설 시찰 공개 — 전략적 신호 분석',
    description: '시진핑 방문 발표 전날 김정은 핵물질 생산시설 공개 시찰 — 중국에 대한 "비핵화 불가" 전략적 메시지.',
    detail: `공개 시점: 2026-06-07 (시진핑 방문 공식 발표 하루 전)\n출처: 조선중앙TV + 38North 분석\n\n■ 공개 내용\n- 김정은, 핵무기 생산 능력 강화 현장 시찰\n- 고농축 우라늄(HEU) 생산 시설 (추정 영변 또는 강선)\n- 핵탄두 소형화 기술 성과 과시\n\n■ 타이밍의 의도적 설계\n- 시진핑 방문 공식 발표: 6월 8일\n- 핵시설 시찰 공개: 6월 7일\n- 메시지: "중국이 뭐라 해도 핵 절대 포기 불가"\n\n■ 38North 평가 (Rachel Minyoung Lee)\n"북한은 중국에게 비핵화가 현실적으로 불가능함을 묵인하거나, 핵 지위를 사실상 인정하도록 요구하는 것"\n\n■ 생산 역량 평가\n- HEU 연간 생산량: 100~150kg 추정 (38North·RAND)\n- 핵탄두 보유량: 40~80발 추정 (2026년 현재)\n- 연간 6~8발 추가 생산 능력 보유\n\n■ 한국 안보 함의\n핵 군비 증강 속도가 가속화되고 있으며, 협상 복귀 가능성은 단기적으로 낮습니다.`,
    type: 'THREAT', source: 'SOL-06', author: '핵비확산분석팀',
    date: '2026-06-07', confidence: 84, secLevel: 'CLASSIFIED', status: 'ACTIVE',
    tags: ['핵물질', '핵탄두', '김정은', '핵시설', 'HEU', '비핵화'],
    threatLevel: 'CRITICAL',
  },
  {
    id: 'i015',
    title: '북한 IT 인력 사이버 운용 세포 조직 — 167,000건 취업 지원 자동화',
    description: 'NK News 보도 기반 분석: 북한 IT 인력이 16만 7천 건 허위 취업 지원서를 자동 생성하여 외국 기업에 침투.',
    detail: `출처: NK News (Shreyas Reddy), 2026-06-18\n\n■ 운용 규모\n- 허위 취업 지원서: 167,000건 이상\n- 표적 국가: 미국·한국·유럽·동남아\n- 대상 기업: IT·방산·금융·물류 분야\n\n■ 세포 조직 구조\n- 상부: 정찰총국 121국 지도\n- 중간: 해외 파견 IT 인력 (중국·러시아·동남아 거점)\n- 하부: 자동화 소프트웨어 + AI 이력서 생성 툴\n\n■ 수익 흐름\n1. 외국 기업 취업 → 내부 접근권 획득\n2. 급여 + 시스템 탈취 → 암호화폐 전환\n3. 모네로(XMR) → WMD 개발 자금\n\n■ 탐지 IOC\n- 비정상 시간대 근무 (UTC+9 평양)\n- VPN + 가상 머신 중첩 사용\n- 암호화폐 급여 요구\n- 특정 포트(4444, 8443) 비정상 통신\n\n■ 국내 대응 현황\n- KISA: 주요 방산 협력업체 보안 점검 지시\n- SOL-02: 관련 IOC 자동 탐지 규칙 추가 완료`,
    type: 'CYBER', source: 'SOL-02', author: 'NK News / 사이버위협팀',
    date: '2026-06-18', confidence: 86, secLevel: 'RESTRICTED', status: 'ACTIVE',
    tags: ['IT인력', '사이버사기', '취업사기', 'RGB', '121국', 'WMD자금'],
    threatLevel: 'HIGH',
  },
]

const SEED_OPERATORS: Operator[] = [
  { id: 'op001', name: '홍길동', rank: '대위', unit: '작전통제실', role: '관리자', active: true, lastLogin: '2026-06-21 09:30', createdAt: '2026-01-01' },
  { id: 'op002', name: '이민준', rank: '중위', unit: '사이버방어팀', role: '분석관', active: true, lastLogin: '2026-06-21 08:15', createdAt: '2026-02-15' },
  { id: 'op003', name: '김수연', rank: '하사', unit: '지역분석실', role: '운영관', active: true, lastLogin: '2026-06-20 17:00', createdAt: '2026-03-01' },
  { id: 'op004', name: '박재원', rank: '원사', unit: 'GEOINT분석실', role: '분석관', active: true, lastLogin: '2026-06-21 07:45', createdAt: '2026-01-15' },
  { id: 'op005', name: '최서연', rank: '상사', unit: '사이버방어처', role: '분석관', active: true, lastLogin: '2026-06-20 23:10', createdAt: '2026-03-20' },
  { id: 'op006', name: '정태현', rank: '소위', unit: '전략분석처', role: '관찰관', active: false, lastLogin: '2026-06-15 14:20', createdAt: '2026-05-01' },
]

// ── Provider ───────────────────────────────────────────────────────────────

// 데이터 버전: 변경 시 localStorage 자동 리셋하여 최신 시드 적용
const DATA_VERSION = 'v3-crawl-2026-06-21'

export function BoardProvider({ children }: { children: ReactNode }) {
  // 버전 불일치 시 자동 시드 재로드
  const [notices, setNotices] = useState<Notice[]>(() => {
    const ver = localStorage.getItem('kd:version')
    if (ver !== DATA_VERSION) return SEED_NOTICES
    const stored = load<Notice[]>(KEYS.notices, [])
    return stored.length ? stored : SEED_NOTICES
  })
  const [reports, setReports] = useState<Report[]>(() => {
    const ver = localStorage.getItem('kd:version')
    if (ver !== DATA_VERSION) return SEED_REPORTS
    const stored = load<Report[]>(KEYS.reports, [])
    return stored.length ? stored : SEED_REPORTS
  })
  const [intels, setIntels] = useState<Intel[]>(() => {
    const ver = localStorage.getItem('kd:version')
    if (ver !== DATA_VERSION) return SEED_INTELS
    const stored = load<Intel[]>(KEYS.intels, [])
    return stored.length ? stored : SEED_INTELS
  })
  const [operators, setOperators] = useState<Operator[]>(() => {
    const ver = localStorage.getItem('kd:version')
    if (ver !== DATA_VERSION) {
      localStorage.setItem('kd:version', DATA_VERSION)
      return SEED_OPERATORS
    }
    const stored = load<Operator[]>(KEYS.operators, [])
    return stored.length ? stored : SEED_OPERATORS
  })
  const [isAdmin, setIsAdmin] = useState(() => load<boolean>(KEYS.auth, false))

  // Persist
  useEffect(() => { save(KEYS.notices, notices) }, [notices])
  useEffect(() => { save(KEYS.reports, reports) }, [reports])
  useEffect(() => { save(KEYS.intels, intels) }, [intels])
  useEffect(() => { save(KEYS.operators, operators) }, [operators])

  // Notice
  const addNotice = useCallback((n: Omit<Notice, 'id' | 'date' | 'views'>): Notice => {
    const item: Notice = { ...n, id: uid(), date: now(), views: 0 }
    setNotices((prev) => [item, ...prev])
    return item
  }, [])
  const updateNotice = useCallback((id: string, n: Partial<Notice>) =>
    setNotices((prev) => prev.map((x) => x.id === id ? { ...x, ...n } : x)), [])
  const deleteNotice = useCallback((id: string) =>
    setNotices((prev) => prev.filter((x) => x.id !== id)), [])

  // Report
  const addReport = useCallback((r: Omit<Report, 'id' | 'date'>): Report => {
    const item: Report = { ...r, id: uid(), date: now() }
    setReports((prev) => [item, ...prev])
    return item
  }, [])
  const updateReport = useCallback((id: string, r: Partial<Report>) =>
    setReports((prev) => prev.map((x) => x.id === id ? { ...x, ...r } : x)), [])
  const deleteReport = useCallback((id: string) =>
    setReports((prev) => prev.filter((x) => x.id !== id)), [])

  // Intel
  const addIntel = useCallback((i: Omit<Intel, 'id' | 'date'>): Intel => {
    const item: Intel = { ...i, id: uid(), date: now() }
    setIntels((prev) => [item, ...prev])
    return item
  }, [])
  const updateIntel = useCallback((id: string, i: Partial<Intel>) =>
    setIntels((prev) => prev.map((x) => x.id === id ? { ...x, ...i } : x)), [])
  const deleteIntel = useCallback((id: string) =>
    setIntels((prev) => prev.filter((x) => x.id !== id)), [])

  // Operator
  const addOperator = useCallback((o: Omit<Operator, 'id' | 'createdAt' | 'lastLogin'>) =>
    setOperators((prev) => [{ ...o, id: uid(), createdAt: now(), lastLogin: '-' }, ...prev]), [])
  const updateOperator = useCallback((id: string, o: Partial<Operator>) =>
    setOperators((prev) => prev.map((x) => x.id === id ? { ...x, ...o } : x)), [])
  const deleteOperator = useCallback((id: string) =>
    setOperators((prev) => prev.filter((x) => x.id !== id)), [])

  // Views
  const incrementView = useCallback((id: string, type: 'notice' | 'report' | 'intel') => {
    if (type === 'notice') setNotices((p) => p.map((x) => x.id === id ? { ...x, views: x.views + 1 } : x))
    if (type === 'report') setReports((p) => p.map((x) => x.id === id ? { ...x } : x))
    if (type === 'intel') setIntels((p) => p.map((x) => x.id === id ? { ...x } : x))
  }, [])

  // Auth
  const login = useCallback((pw: string) => {
    const ok = pw === 'META2026'
    if (ok) { setIsAdmin(true); save(KEYS.auth, true) }
    return ok
  }, [])
  const logout = useCallback(() => { setIsAdmin(false); save(KEYS.auth, false) }, [])

  return (
    <BoardContext.Provider value={{
      notices, reports, intels, operators, isAdmin,
      addNotice, updateNotice, deleteNotice,
      addReport, updateReport, deleteReport,
      addIntel, updateIntel, deleteIntel,
      addOperator, updateOperator, deleteOperator,
      incrementView, login, logout,
    }}>
      {children}
    </BoardContext.Provider>
  )
}

export function useBoard() {
  const ctx = useContext(BoardContext)
  if (!ctx) throw new Error('useBoard must be inside BoardProvider')
  return ctx
}

// ── Constants ──────────────────────────────────────────────────────────────
export const SEC_COLORS: Record<SecLevel, string> = {
  PUBLIC: '#00ff88', INTERNAL: '#00d4ff', RESTRICTED: '#ffcc00', CLASSIFIED: '#ff2d55',
}
export const NOTICE_CATEGORY_COLORS: Record<NoticeCategory, string> = {
  '긴급': '#ff2d55', '보안': '#ff6b35', '작전': '#ffcc00', '공지': '#00d4ff', '일반': '#8ab8d4',
}
export const INTEL_TYPE_COLORS: Record<IntelType, string> = {
  THREAT: '#ff2d55', CYBER: '#ff6b35', SIGNAL: '#ffcc00',
  IMAGE: '#00ff88', SECTOR: '#00d4ff', STRATEGIC: '#c084fc',
}
export const STATUS_COLORS: Record<IntelStatus | ReportStatus, string> = {
  ACTIVE: '#ff2d55', PENDING: '#ffcc00', RESOLVED: '#00ff88', ARCHIVED: '#4a7a9b',
  DRAFT: '#4a7a9b', REVIEW: '#ffcc00', PUBLISHED: '#00ff88',
}
