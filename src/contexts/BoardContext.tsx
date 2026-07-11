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
export type NewsCategory = '한국방산' | '북한' | '미국' | '중국' | '러시아' | '유럽' | '중동' | '아시아' | '우크라이나' | '사이버' | '우주' | '기술'
export type NewsSource = 'Jane\'s' | 'IISS' | 'Defense News' | '연합뉴스' | '국방일보' | '38North' | 'CSIS' | 'Reuters' | 'Breaking Defense' | '기타'
export type NewsType = '뉴스' | '전략' | '사업화'

export interface NewsItem {
  id: string
  title: string
  summary: string
  content: string
  source: NewsSource
  sourceUrl?: string
  category: NewsCategory
  newsType: NewsType
  date: string
  tags: string[]
  views: number
  important: boolean
  autoUpdated?: boolean
}

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
  news: NewsItem[]

  // Notice CRUD
  addNotice: (n: Omit<Notice, 'id' | 'date' | 'views'>) => Notice
  updateNotice: (id: string, n: Partial<Notice>) => void
  deleteNotice: (id: string) => void
  incrementView: (id: string, type: 'notice' | 'report' | 'intel' | 'news') => void

  // Report CRUD
  addReport: (r: Omit<Report, 'id' | 'date'>) => Report
  updateReport: (id: string, r: Partial<Report>) => void
  deleteReport: (id: string) => void

  // Intel CRUD
  addIntel: (i: Omit<Intel, 'id' | 'date'>) => Intel
  updateIntel: (id: string, i: Partial<Intel>) => void
  deleteIntel: (id: string) => void

  // News CRUD
  addNews: (n: Omit<NewsItem, 'id' | 'date' | 'views'>) => NewsItem
  updateNews: (id: string, n: Partial<NewsItem>) => void
  deleteNews: (id: string) => void

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
  intels: 'kd:intels', operators: 'kd:operators', auth: 'kd:auth', news: 'kd:news',
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
    id: 'n009',
    title: '[공지] 무기 데이터베이스 업데이트 — 신규 5건·상태 변경 2건 (2026-07-01)',
    content: `■ 업데이트 일시: 2026-07-01\n■ 담당: 무기체계분석팀\n\n【상태 변경】\n\n■ KF-21 보라매 (TESTING → OPERATIONAL)\n- 2026년 상반기 강릉기지(제17전투비행단) 초도작전능력(IOC) 달성\n- Block 1 초도양산 20기 진행 중\n- 향후 2032년까지 총 120기 도입 계획\n\n■ LAH 소형무장헬기 (DEVELOPMENT → OPERATIONAL)\n- 2026년 육군항공 배치 완료 (초도 20기)\n- 20mm 기관포 + 천검 공대지미사일 + 스파이크 ATGM 운용\n\n【신규 등록 — ROK (4건)】\n\n■ K808 차륜형장갑차 (ID: w-rok-021)\n- 8×8 차륜형 보병수송장갑차, 2023년 육군 전력화\n- 한화에어로스페이스, 해외파병·후방 임무 최적화\n\n■ AW159 와일드캣 해상작전헬기 (ID: w-rok-022)\n- 한국 해군 8기 운용. 세종대왕급 이지스함 탑재\n- 대잠·대함 임무, 스팅레이 어뢰·헬파이어 운용\n\n■ FFX-III 전남함급 호위함 (ID: w-rok-023)\n- 3,500톤급 차기 호위함. 2025년 전남함 취역\n- K-VLS 16셀(해성/천궁-II), AESA 레이더 탑재\n\n■ 군 정찰위성 2호 SAR (ID: w-rok-020b)\n- 2024년 발사 성공. SAR 레이더로 전천후 감시\n- 1호(EO)·2호(SAR) 교차 운용 → 24시간 북한 감시 체계 구축\n\n【신규 등록 — DPRK (1건)】\n\n■ 화성-8형 극초음속 HGV (ID: w-dprk-003b)\n- 마하 10+ 극초음속 활공체(HGV) 탑재 탄도미사일\n- 기존 MD 체계(SM-3·THAAD·PAC-3) 돌파 목적\n- 시험 단계 (2021년~), 실전 배치 근접 평가\n- CRITICAL 위협 등급\n\n【데이터 출처】\nKAI, 방위사업청, 한화에어로스페이스, 현대중공업, 38North, CSIS, NTI, 합참`,
    author: '무기체계분석팀', authorUnit: '전력분석처', date: '2026-07-01',
    category: '공지', secLevel: 'INTERNAL', pinned: true, views: 0,
    tags: ['DB업데이트', 'KF-21', 'LAH', 'FFX-III', '화성8형', 'K808'],
  },
  {
    id: 'n008',
    title: '이재명 대통령, 트럼프에 북한 핵 문제 해결 요청',
    content: `■ 출처: NK News (Joon Ha Park), 2026-06-19\n\n이재명 대통령이 도널드 트럼프 미국 대통령에게 이란 핵 합의 이후 북한 비핵화 문제 해결을 공식 요청한 것으로 알려졌습니다.\n\n【핵심 내용】\n- 이란 핵 협상 타결을 계기로 북한 비핵화 로드맵 공동 추진 요청\n- 한미 정상 간 북핵 해법 긴밀 논의 중\n- 북한은 이에 대해 "비핵화 불가" 원칙 재천명으로 맞대응\n\n【평가】\n- 외교적 해결 모멘텀 형성 시도 중\n- 북한의 반응: 김여정 G7 경고 발언과 연계된 강경 대응 예상\n- 미국의 대북 압박 기조 유지 가능성 高\n\n본 건은 외교부와 협조하여 지속 모니터링 중입니다.`,
    author: '외교정보팀', authorUnit: '전략분석처', date: '2026-06-19',
    category: '일반', secLevel: 'INTERNAL', pinned: false, views: 134,
    tags: ['이재명', '트럼프', '북핵', '비핵화외교'],
  },
  {
    id: 'n010',
    title: '[공지] 무기 데이터베이스 대규모 확장 완료 — 647 → 3,000+ 종 (2026-07-03)',
    content: `■ 업데이트 일시: 2026-07-03\n■ 담당: 무기체계분석팀\n\n【확장 개요】\n무기 DB를 기존 647종에서 3,000종 이상으로 대폭 확장하였습니다.\n국방부 공식 육군 무기체계 현황(data.go.kr OA-9538) 데이터를 포함한\n전 세계 35개 국가·지역의 무기체계를 망라합니다.\n\n【국방부 공식 데이터 반영 (육군 무기체계 현황)】\n\n■ 기동 무기체계\n- K808 바라쿠다 차륜형장갑차, K21 IFV, K200A1, K1 AVLB, K300 공병장갑차\n- K77 포병지휘차량, K10 탄약보급장갑차, 차기 NIFV 개발현황\n\n■ 화력 무기체계\n- K9A2 자주포, K55A1, K105A1, KH179 견인포\n- 천무 다연장로켓(239mm), 구룡(K136), M270 MLRS, ATACMS\n- 현궁 ATGM, 비궁 MANPADS, 스파이크-NLOS, 천궁-II, 패트리어트 PAC-3\n- K4 고속유탄기관총, K6 중기관총, K7 기관단총\n\n■ 항공 무기체계\n- AH-64E 아파치 가디언(36기), AH-1S 코브라\n- CH-47D/F 치누크(55기), UH-60P 블랙호크(130기)\n- KUH-1 수리온, LAH 소형무장헬기, 500MD 의무편대\n\n■ 감시정찰 무기체계\n- 송골매 UAV, 비조 UAV, 하피 자폭드론\n- 글로벌호크 RQ-4B(4대), 백두·금강 정찰기, 중고도무인기(MUAV)\n\n■ 방호 무기체계\n- 비호복합 SHORAD, K30 비호 자주대공포, 신궁 MANPADS, M167 발칸\n\n■ 신규 전력화\n- 워리어 플랫폼, K2 RCV 로봇전투차량, AS21 레드백, 천무 II, 드래곤파이어 레이저\n\n【글로벌 무기체계 확장】\n\n■ 전투기·항공기: F-22A, B-21, Su-57, J-20A, J-35, GCAP, KF-21 등 +80여 종\n■ 해군 함정·잠수함: CVN-78 포드함, 055형, 보레이A, 야센M, QE급 항모 등 +65종\n■ 미사일·방공: 킨잘, 지르콘, DF-17, LRHW, S-500, Iron Dome, Arrow-3 등 +70종\n■ 지상군: M1A2 SEPv3, T-14 아르마타, 레오파르트 2A8, 메르카바 Mk4M 등 +80종\n■ 아시아·오세아니아: AUKUS SSN, K9 인도·폴란드·핀란드, J-10C 등 +60종\n■ 중동·아프리카·남미: 라팔 이집트, KAAN 터키, KC-390 브라질 등 +55종\n■ 전자전·사이버·우주: NGJ-MB, 크라수하-4, ASAT, 스턱스넷, 라자루스 APT 등 +45종\n■ 역사무기: T-34, Tiger I, B-52H, SR-71, V-2, AK-47 역사 등 +45종\n■ 소화기 확장: HK416, M249, M2HB, AK-12, 칼 구스타프 M4 등 +70종\n\n【데이터 출처】\n국방부 공개데이터포털, 방위사업청, KAI, 한화에어로스페이스,\n38North, IISS Military Balance, CSIS, Jane's Defence Weekly,\nGlobalSecurity.org, NTI Nuclear Threat Initiative`,
    author: '무기체계분석팀', authorUnit: '전력분석처', date: '2026-07-03',
    category: '공지', secLevel: 'INTERNAL', pinned: true, views: 0,
    tags: ['DB확장', '3000종', '국방부공식데이터', '육군무기체계', 'K9A2', 'KUH-1', '천무'],
  },
  {
    id: 'n011',
    title: '[공지] K-Defense AI v3.0 — 무기 DB 4,182종·SOL-01 고도화·실시간 검색 (2026-07-04)',
    content: `■ 업데이트 일시: 2026-07-04\n■ 담당: 플랫폼개발팀 / 무기체계분석팀\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n【 플랫폼 v3.0 업데이트 개요 】\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n■ 무기 데이터베이스: 3,000 → 4,182종 (전회 대비 +1,182종)\n■ SOL-01 전장AI: 무기 DB 연동 방어자산 등록 시스템 신규 구축\n■ 무기 DB 검색: 즉시 반영 실시간 검색 UX 전면 개편\n■ GitHub: ocm851129-bot/k-defense-ai master 브랜치 업데이트 완료\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n【 1. 무기 DB 신규 추가 현황 (4,182종) 】\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n■ Batch36 — 대한민국 추가 전력 (90종)\n- K808 바라쿠다, KF-21 블록2, K9A1 노르웨이/에스토니아, KTSSM 전술지대지\n- F-35A·KF-21·FA-50GF 수출 현황, ANASIS-II 군사위성, 드론봇전투체계\n\n■ Batch37 — 미국 지상·해군·공군 (90종)\n- M10 부커 경전차, B-21 레이더 폭격기, HIMARS PrSM 블록II\n- F-35 전 버전·운용국, 핵탄두 W88·W76-2·B61-12 최신 현황\n\n■ Batch38 — 러시아 무기체계 (90종)\n- T-14 아르마타, RS-28 사르마트, 야센-M SSGN\n- Su-57, Tu-160M2, 포세이돈 핵어뢰, 판치르-S1\n\n■ Batch39 — 중국 무기체계 (90종)\n- J-20A 흑검, J-35 함재 스텔스, 055형 렌하이급, DF-17 극초음속\n- WZ-10 공격헬기, H-20 차세대 폭격기, SC-19 ASAT\n\n■ Batch40 — 유럽 무기체계 (90종)\n- 레오파르트 2A8, 챌린저 3, 퓨마 VJZ, GCAP 템페스트\n- ARCHER 자주포, NSM 블록IV, Meteor 공대공, SPEAR 3\n\n■ Batch41 — 아시아·태평양 (90종)\n- F-X/GCAP 일본, 테자스 MK1A, 메르카바 Mk4M, KAAN TF-X\n- AUKUS SSN, 화성-18 고체ICBM, 만리경-1 정찰위성\n\n■ Batch42 — 중동 무기체계 (90종)\n- 라팔 이집트·카타르, F-16IQ 이라크, 타이푼 UAE\n- 후티 드론보트·대함미사일, 이스라엘 Iron Beam 100kW 레이저\n\n■ Batch43 — 소화기·경화기 확장 (90종)\n- HK416A5 프랑스 표준, L85A3 영국, MSBS 그롯 폴란드\n- M5 Spear 6.8mm, AIM-9X 블록II, IRIS-T SLM 우크라이나\n\n■ Batch44 — 해군 함정·잠수함 확장 (90종)\n- DDG-1000 줌왈트, CVH 이탈리아 카부르, FREMM 베르가미니\n- 고틀란드급 스웨덴, A26 블레킹에, 인빈시블급 싱가포르\n\n■ Batch45 — 미사일·방공 확장 (90종)\n- Aster 30 Block 1NT 우크라이나, NASAMS 노르웨이·우크라이나\n- ATACMS PrSM, Brimstone 3, SPEAR 3 F-35 내부탑재\n\n■ Batch46 — 전투기·헬기·드론 확장 (90종)\n- F-35A·B·C 전 운용국·납품 현황\n- AW159 와일드캣, Mi-35M 수출형, Wing Loong-III\n\n■ Batch47 — 미사일·방공·SAM 심화 (90종)\n- SM-3 IIA·SM-6 블록1B·ESSM 블록2, Arrow-3 독일 도입\n- 극초음속: LRHW 다크이글, HACM 스크램제트, DF-ZF 글라이더\n\n■ Batch48 — 해군·항공 심화 (90종)\n- USS 포드함 CVN-78, DDG-51 플라이트III, Type 45 영국\n- B-21 레이더 첫 비행, A400M, KC-390 수출국 현황\n\n■ Batch49 — 전 세계 소화기·발사기 (90종)\n- M5/XM250 NGSW 6.8mm 차기 미군, HK433 독일 채택\n- Javelin·NLAW·SMAW-D 우크라이나 공급 현황\n\n■ Batch50 — 북한 전력 심화 (90종)\n- 화성-19 신형 ICBM, 만리경-1·2 군사위성\n- 북한군 러시아 파병 1만2천명, KN-23 러시아 공급 확인\n- 영변 핵시설, 라자루스 암호화폐 30억불 탈취(2023)\n\n■ Batch51 — 한국 무기·전술체계 (90종)\n- PrSM 블록II, GMLRS-ER 150km, 트로피·아이언피스트 APS\n- K21 APS 업그레이드, 3축체계(킬체인·KAMD·KMPR)\n- TICN·ATCIS·KNCCS 전술통신·지휘체계 수록\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n【 2. SOL-01 전장AI 방어자산 DB 등록 신규 기능 】\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n■ 위치: SOL-01 → 위협 무기 인텔리전스 탭\n\n■ 사용 방법\n  1. 출처 필터 → ROK / USA / NATO 등 아군 선택\n  2. 방어 가능 무기(SAM·항공·포병·지상) 카드에\n     "＋ 방어 등록" 버튼 클릭\n  3. 우측 "DB 등록 방어 자산" 패널에서 등록 목록 확인\n  4. 전투 시뮬레이션 시작 → 자동 배치\n  5. 실전 교전 중에도 실시간 추가 가능\n\n■ 지원 무기 유형\n  - SAM / 미사일 계열 → 천궁형(KDRASS) 또는 패트리어트형 방어 유닛\n  - 전투기 / 헬기 → F-35형 방어 유닛\n  - 자주포 / 다연장로켓 / 지상 → K9 포병형 방어 유닛\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n【 3. 무기 DB 실시간 검색 UX 전면 개편 】\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n■ 검색창 입력 즉시 결과 수 실시간 표시 (예: "K2" → 127건)\n■ ✕ 클리어 버튼 — 한 번에 검색어 초기화\n■ 60건 단위 "더 보기" 페이지네이션 (전체 4,182건 탐색 가능)\n■ 검색 결과 0건 시 "필터 초기화" 버튼 제공\n■ 검색 예시: K2 / 패트리어트 / ICBM / Su-57 / 화성 / 천궁\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n【 데이터 출처 】\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n국방부·방위사업청·합참 공개자료, IISS Military Balance 2026,\nJane's Defence Weekly, CSIS Missile Threat DB, 38North,\nSIPRI Military Expenditure DB, GlobalSecurity.org,\nNTI Nuclear Threat Initiative, 각국 공식 국방부 발표`,
    author: '플랫폼개발팀', authorUnit: '메타아이씨티', date: '2026-07-04',
    category: '공지', secLevel: 'INTERNAL', pinned: true, views: 0,
    tags: ['v3.0', '4182종', 'SOL-01고도화', '방어자산등록', '실시간검색', 'DB연동'],
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
  {
    id: 'r009',
    title: '북한 러시아 파병 1만2천명 전투 투입 — 전략적 영향 분석',
    summary: '북한군 쿠르스크·도네츠크 전선 투입 확인. 실전 경험 축적 및 러시아 기술 이전 우려.',
    content: `## 분석 개요\n**출처**: 미 국방부, NATO 공식 성명, CNA, 38North (2024년 10월~)\n\n## 파병 현황\n- 파병 병력: 12,000명 이상 (2024년 10월 기준)\n- 배치 지역: 쿠르스크 전선 (우크라이나 점령 러시아 영토), 도네츠크\n- 병과 구성: 특수전부대·보병·포병 혼성\n\n## 무기 공급 현황\n- 포탄 공급: 500만발+ (확인)\n- KN-23 SRBM: 우크라이나 공격에 실제 사용 확인 (2024년)\n- 탄약·소형무기 지속 공급 중\n\n## 전략적 영향 평가\n\n### 북한 측 이득\n1. 현대전 실전 경험 — 드론전·포병전·전자전 노하우\n2. 러시아 군사기술 이전 (위성·미사일·핵잠 기술)\n3. 외화 수입 (추정 연 수억 달러)\n4. 러북 군사동맹 강화 → 유엔 대북제재 무력화\n\n### 러시아 측 이득\n1. 병력 손실 보충\n2. 저비용 포탄 대량 수급\n\n### 한반도 안보 함의\n- 전쟁 실전 경험 북한군의 도발 능력 향상\n- 러시아→북한 기술이전으로 전략무기 고도화 가속\n- 한미연합훈련 대응 능력 향상 우려\n\n## SOL-01 AI 위협 평가\n신뢰도: 88% | 위협등급: HIGH → CRITICAL 상향 검토`,
    source: 'SOL-01', author: '전략분석팀', authorUnit: 'THREAT 분석실',
    date: '2026-07-04', category: '위협분석', secLevel: 'RESTRICTED',
    status: 'PUBLISHED', tags: ['북한파병', '러시아', '우크라이나', 'KN-23', '기술이전'], confidence: 88,
  },
  {
    id: 'r010',
    title: 'K-방산 2026 — 수출 4개국 동시 수주 및 글로벌 시장 점유 현황',
    summary: '폴란드·이집트·사우디아라비아·에스토니아 동시 대규모 수주. K-방산 세계 4위 목표 달성 임박.',
    content: `## K-방산 2026년 수출 현황\n**기준일**: 2026-07-04\n\n## 주요 계약 현황\n\n| 국가 | 무기체계 | 계약규모 | 인도 현황 |\n|------|----------|----------|-----------|\n| 폴란드 | K2PL 흑표(820대)+K9A1(672문)+FA-50GF(48기) | 약 20조원 | 1차 인도 완료 |\n| 사우디 | 천궁-II M-SAM 방공체계 | 3.8조원(38억불) | 2025년+ 인도 |\n| 이집트 | K9 비즈르(200대)+라팔(54기) | 약 5조원 | 협상·초도인도 |\n| 에스토니아 | K9A1(18문) | 약 0.3조원 | 2024년 인도 |\n| 호주 | AS21 레드백 IFV(129대, 린스KF31에 패배) | 미수주 | - |\n\n## 2026 K-방산 핵심 성과\n- 누적 수출 실적: 135억불+ (2026 상반기)\n- 수출 국가: 35개국 이상\n- 세계 방산 수출 순위: 5~6위권 (2030년 4위 목표)\n\n## 주요 무기체계별 수출 경쟁력\n\n### K9 자주포\n- 9개국 수출: 노르웨이·핀란드·에스토니아·폴란드·인도·호주·쿠웨이트·이집트·UAE\n- 총 1,200+ 문 계약\n\n### KF-21 보라매\n- 2026년 양산 목표. 수출 잠재국: UAE·이라크·인도네시아·말레이시아\n\n### K2 흑표\n- 폴란드 1,000대(1차180+PL생산820) 역대 최대 전차 단일 수출\n\n## 전략적 의미\n한국 방위산업이 전통적 '수입국'에서 '수출 강국'으로 전환 완료.\n우크라이나 전쟁 계기 유럽 방산 수요 급증이 핵심 동력.`,
    source: 'SOL-06', author: '방산수출분석팀', authorUnit: '전략분석처',
    date: '2026-07-04', category: '기술동향', secLevel: 'INTERNAL',
    status: 'PUBLISHED', tags: ['K방산', '폴란드', '사우디', 'K9', 'K2', 'KF-21', '수출'], confidence: 92,
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
  {
    id: 'i010',
    title: '[DB연동] SOL-01 방어자산 DB 등록 시스템 가동 — 아군 무기 실시간 배치',
    description: '무기 DB 4,182종과 SOL-01 전장AI 연동 완료. 아군 무기를 방어 자산으로 즉시 등록·시뮬레이션 배치 가능.',
    detail: `업데이트 일시: 2026-07-04\n담당: 플랫폼개발팀\n\n■ 신규 기능 개요\n\nSOL-01 전장AI 시뮬레이터와 무기 DB(4,182종)가 완전 연동되었습니다.\n\n■ 사용 방법\n1. SOL-01 → [위협 무기 인텔리전스] 탭\n2. 출처 필터 → ROK / USA / NATO 등 아군 선택\n3. 무기 카드의 [+ 방어 등록] 버튼 클릭\n4. 전투 시뮬레이션 시작 시 자동 배치\n\n■ 지원 무기 유형\n- SAM / 방공 → 천궁형·패트리어트형 배치\n- 전투기·헬기 → F-35형 배치\n- 자주포·MLRS → K9 포병형 배치\n\n■ 활용 예시\n- 천궁-II(ROK·SAM) 등록 → 방공 커버리지 확장\n- F-35A(USA·AIRCRAFT) 등록 → 공중 차단 능력 추가\n- K9A2(ROK·ARTILLERY) 등록 → 지상 화력 강화\n\n■ DB 검색 방법\n검색창에 무기명 입력 즉시 결과 필터링\n예: "천궁" / "F-35" / "패트리어트" / "K9" 입력`,
    type: 'STRATEGIC', source: 'SOL-01', author: '플랫폼개발팀',
    date: '2026-07-04', confidence: 100, secLevel: 'INTERNAL', status: 'ACTIVE',
    tags: ['SOL-01', 'DB연동', '방어자산등록', '4182종', 'v3.0'],
    threatLevel: 'LOW',
  },
  {
    id: 'i011',
    title: '[긴급] 북한 화성-19 12축 TEL 신형 ICBM 공개 — 위협 수준 CRITICAL 상향',
    description: '북한 2024년 10월 12축 TEL 탑재 신형 ICBM 화성-19 공개. 탑재 능력·사거리 화성-17 초과 추정.',
    detail: `출처: 북한 조선중앙TV, 38North, CSIS\n일자: 2024-10-31 (공개)\n\n■ 주요 특징\n- 발사 플랫폼: 9축(18륜) → 12축(24륜) 확대 TEL\n- 크기: 화성-17 대비 대형\n- 추진: 고체 또는 액체 미상\n- MIRV 탑재 가능성: 평가 중\n\n■ 위협 평가\n- 사거리: 15,000km+ 추정 (미국 전역)\n- 탑재 용량 증가로 다탄두(MIRV) 가능성 증가\n- 세계 최대 규모 이동식 ICBM 중 하나\n\n■ SOL-01 AI 분석\n신뢰도: 65% (공개 영상 기반)\n위협 등급: CRITICAL 유지\n\n■ 권고 사항\n1. 한미 확장억제 협의 강화\n2. 킬체인 대응 시나리오 업데이트\n3. PAC-3·천궁·L-SAM 연동 태세 점검`,
    type: 'THREAT', source: 'SOL-01', author: '미사일분석팀',
    date: '2026-07-04', confidence: 65, secLevel: 'CLASSIFIED', status: 'ACTIVE',
    tags: ['화성19', '12축TEL', 'ICBM', 'MIRV', 'CRITICAL'],
    threatLevel: 'CRITICAL',
  },
  {
    id: 'i012',
    title: '[SIGINT] 북한 러시아 파병 병력 전선 배치 확인 — KN-23 실전 사용',
    description: '북한군 12,000명 쿠르스크 전선 투입 확인. KN-23 SRBM 우크라이나 대상 실제 발사 확인.',
    detail: `출처: 미 국방부 공식 성명, NATO, CNA, 38North\n일자: 2024-10~2025-06 (누적)\n\n■ 파병 현황\n- 병력: 12,000명 이상\n- 배치: 쿠르스크(러시아 서부)·도네츠크 전선\n- 피해: 수천명 사상 추정 (러시아 발표 부재)\n\n■ 무기 실전 사용 확인\n- KN-23 SRBM: 우크라이나 대상 10발+ 확인\n- 포탄 500만발: 도네츠크 전선 사용 확인\n- 북한산 탄약 불발률: 10~15% (우크라이나 제보)\n\n■ 기술 이전 우려\n- 러시아 → 북한: 위성기술, 핵잠기술, 드론기술\n- 실전 경험 습득: 현대 드론전·전자전·포병전\n\n■ 한반도 안보 영향\n전장 경험 가진 북한 특수전 병력 복귀 후 도발 능력 향상 우려\nSOL-01 위협 평가: HIGH`,
    type: 'SIGNAL', source: 'SOL-04', author: 'SIGINT분석팀',
    date: '2026-07-04', confidence: 88, secLevel: 'CLASSIFIED', status: 'ACTIVE',
    tags: ['북한파병', 'KN-23', '우크라이나실전', '기술이전', '쿠르스크'],
    threatLevel: 'HIGH',
  },
]

const SEED_NEWS: NewsItem[] = [
  {
    id: 'nw001',
    title: '한국 KF-21 보라매 2026년 양산 돌입 — 공군 초도 배치 시작',
    summary: 'KAI가 개발한 KF-21 보라매 4.5세대 전투기가 2026년 양산에 돌입했다. 공군은 초도 20기를 2026년 내 인도받을 예정이다.',
    content: `■ 출처: 국방일보, 방위사업청 (2026-07-01)\n\n한국항공우주산업(KAI)이 개발한 KF-21 보라매 전투기가 드디어 양산 단계에 진입했다.\n\n【주요 내용】\n- 양산 계획: 2026년 초도 20기, 2032년까지 총 120기\n- AESA 레이더 탑재 Block 1 표준\n- 무장: IRIS-T(단거리)·미티어(중거리)·JDAM·천검 공대지\n- 소요 예산: 약 8.1조원 (양산 전체)\n\n【전략적 의미】\n- F-4E 팬텀·F-5 제공호 완전 대체\n- 국산 4.5세대 전투기 보유로 방공 자립도 제고\n- KF-21 수출: 인도네시아·이라크·이집트 협상 진행 중\n\n【다음 단계】\n- Block 2 (내부 무장창·추가 스텔스): 2028년 목표\n- 복좌형 KF-21D: 조종사 전환훈련`,
    source: '국방일보', category: '한국방산', newsType: '뉴스', date: '2026-07-01',
    tags: ['KF-21', '보라매', '양산', 'KAI', '4.5세대'], views: 0, important: true,
  },
  {
    id: 'nw002',
    title: '북한 화성-19 신형 ICBM 공개 — 12축 TEL 탑재 역대 최대',
    summary: '북한이 2024년 10월 24륜 12축 이동식 발사대에 탑재된 화성-19형을 공개. 화성-17 초과 규모로 세계 최대급 이동식 ICBM.',
    content: `■ 출처: 38North, CSIS (2024-10-31 공개·분석)\n\n북한 조선중앙TV가 공개한 화성-19형 ICBM은 기존 화성-17을 능가하는 크기로 주목받았다.\n\n【화성-19 주요 특징】\n- 발사대: 12축 24륜 초대형 TEL (세계 최대 이동식)\n- 추정 사거리: 15,000km 이상 (미국 본토 전역)\n- MIRV 탑재 가능성: 평가 중 (탄두 직경·길이 기준)\n- 추진체 방식: 미상 (고체 또는 액체)\n\n【전략적 평가】\n- 화성-17 대비 탑재 중량 증가 → 다탄두 가능성 높음\n- 이동식 발사 → 위치 추적·선제 무력화 더욱 어려움\n- 한미 확장억제 전략 재검토 촉발\n\n【38North 분석】\n"세계에서 가장 큰 이동식 탄도미사일 중 하나"`,
    source: '38North', category: '북한', newsType: '뉴스', date: '2024-10-31',
    tags: ['화성19', 'ICBM', '12축TEL', 'MIRV', '북한'], views: 0, important: true,
  },
  {
    id: 'nw003',
    title: '북한군 러시아 파병 1만2천명 — 쿠르스크 전선 투입 확인',
    summary: '미 국방부와 NATO가 북한군 12,000명 이상의 쿠르스크·도네츠크 전선 배치를 공식 확인. KN-23 실전 사용도 확인.',
    content: `■ 출처: 미 국방부, NATO 공식 성명 (2024-10~2025-02)\n\n미국과 NATO 동맹국들이 북한군의 러시아 전선 투입을 공식 인정했다.\n\n【파병 현황】\n- 병력: 12,000명 이상\n- 배치: 쿠르스크(러시아 서부)·도네츠크\n- 병과: 특수전·포병·보병 혼성\n\n【무기 공급 확인】\n- KN-23 SRBM: 우크라이나 대상 실제 발사\n- 포탄: 500만발 이상\n- 추가 공급: 진행 중\n\n【파병 목적 분석】\n1. 러시아 병력 손실 보충\n2. 북한 실전 경험 축적\n3. 러시아 군사기술 이전 대가\n4. 북러 군사동맹 강화\n\n【한국 정부 대응】\n- 우크라이나 무기 지원 검토\n- 한미 확장억제 협의 강화`,
    source: 'Reuters', category: '북한', newsType: '뉴스', date: '2024-11-04',
    tags: ['북한파병', '러시아', '우크라이나', '쿠르스크', 'KN-23'], views: 0, important: true,
  },
  {
    id: 'nw004',
    title: '천궁-II 사우디아라비아 38억불 수출 계약 체결 — 한국 방산 역대 최대',
    summary: '사우디아라비아가 한국 LIG넥스원의 천궁-II(M-SAM) 지대공미사일 체계를 38억불에 계약. 한국 방산 단일 계약 최대 규모.',
    content: `■ 출처: 방위사업청, 연합뉴스 (2024년)\n\n한국 LIG넥스원이 사우디아라비아와 천궁-II 지대공미사일 체계 수출 계약을 체결했다.\n\n【계약 개요】\n- 규모: 약 38억불(약 5.1조원)\n- 품목: 천궁-II M-SAM 전 체계 (레이더·발사대·지휘통제)\n- 납기: 2025년 이후 단계적 인도\n\n【천궁-II 제원】\n- 사거리: 40km\n- 고도: 20km\n- 탄도미사일 요격 능력 보유\n- 구성: TVM 유도방식·이동식 발사대\n\n【전략적 의미】\n- 사우디 PAC-3 보완 중거리 방공망 구축\n- 한국 방산 중동 시장 본격 진출\n- 추가 수출 협상: UAE·이집트·인도 논의 중\n\n【K-방산 수출 현황】\n2023~2026년 누적 수출액 135억불+ 달성`,
    source: '연합뉴스', category: '한국방산', newsType: '사업화', date: '2024-09-15',
    tags: ['천궁II', '사우디', '38억불', 'LIG넥스원', '방산수출'], views: 0, important: true,
  },
  {
    id: 'nw005',
    title: '폴란드 K2PL 흑표·K9·FA-50 패키지 — 한국 방산 20조 수출',
    summary: '폴란드가 한국산 K2PL 흑표 전차(1,000대), K9A1 자주포(672문), FA-50GF(48기) 패키지 계약. 유럽 최대 방산 수입.',
    content: `■ 출처: 방위사업청, Defense News (2022~2023)\n\n폴란드가 한국과 역사적인 대규모 방산 패키지 계약을 체결했다.\n\n【계약 규모】\n- K2PL 흑표 전차: 1,000대 (1차 180대 인도 완료)\n- K9A1 자주포: 672문\n- FA-50GF 경전투기: 48기 (초도 인도 2023년)\n- 총 계약 규모: 약 20조원 이상\n\n【K2PL 특징】\n- 폴란드 현지 생산: 현대로템+PGZ 합작\n- APS·디지털화·폴란드 특화 장비 추가\n\n【배경】\n- 우크라이나 전쟁 계기 방위력 긴급 강화\n- 기존 T-72·PT-91 구형 전차 대체\n- NATO 동부 측면 방어 강화\n\n【수출 의미】\n유럽 NATO 국가 최초 한국산 주력전차 채택`,
    source: 'Defense News', category: '한국방산', newsType: '사업화', date: '2022-07-27',
    tags: ['K2PL', '폴란드', 'K9', 'FA-50', '20조수출'], views: 0, important: true,
  },
  {
    id: 'nw006',
    title: 'B-21 레이더 스텔스 폭격기 첫 비행 성공 — 2025년 배치 목표',
    summary: '노스럽그루먼의 B-21 레이더 차세대 스텔스 폭격기가 2022년 12월 첫 비행에 성공. B-2 스피릿 대체.',
    content: `■ 출처: Breaking Defense, USAF (2022-12-10)\n\n미 공군의 차세대 핵전략 스텔스 폭격기 B-21 레이더가 캘리포니아 팜데일에서 첫 비행을 성공적으로 마쳤다.\n\n【B-21 레이더 특징】\n- 유형: 차세대 전익 스텔스 전략폭격기\n- 개발사: 노스럽그루먼\n- 역할: 핵·재래식 이중목적, B-2 대체\n- 탑재: B61-12·JASSM-ER·GBU-57 MOP\n- 목표 수량: 100기 이상\n\n【기술적 특징】\n- B-2 대비 향상된 스텔스·오픈 아키텍처\n- 유인·무인 전환 설계\n- 극초음속 미사일 탑재 가능성\n\n【전략적 의미】\n- 중국 A2/AD 돌파 능력 핵심\n- 2025년 IOC(초도작전능력) 목표\n- 대만 분쟁 억제 자산`,
    source: 'Breaking Defense', category: '미국', newsType: '뉴스', date: '2022-12-10',
    tags: ['B-21', '레이더', '스텔스폭격기', 'USAF', '핵전략'], views: 0, important: false,
  },
  {
    id: 'nw007',
    title: '중국 J-35 스텔스 함재기 푸젠 항모 탑재 운용 시작',
    summary: '중국 PLAN이 3번째 항모 푸젠함(CV-18)에 J-35A 스텔스 함재기를 탑재·운용하기 시작했다. 중국 항모전력 급속 강화.',
    content: `■ 출처: CSIS, South China Morning Post (2024)\n\n중국이 3번째 항공모함 푸젠함(CV-18, 80,000t급)에 J-35A 스텔스 함재기를 탑재하여 운용을 시작했다.\n\n【푸젠함 특징】\n- 배수량: 80,000t+\n- 발진 시스템: CATOBAR (전자기 사출기)\n- 탑재기: J-35A·J-15T·Z-9·KJ-600\n- 중국 최초 CATOBAR 항모\n\n【J-35A 특징】\n- 유형: 5세대 스텔스 함재기\n- 성능: F-35C 수준 추정\n- 무장: PL-15·PL-10 내부탑재\n\n【전략적 함의】\n- 미 항모전단과의 격차 급속 축소\n- 대만 해협·남중국해 투사 능력 강화\n- 2030년까지 4번째 항모 취역 예정`,
    source: 'CSIS', category: '중국', newsType: '뉴스', date: '2024-05-20',
    tags: ['J-35A', '푸젠함', '중국항모', 'CATOBAR', '스텔스'], views: 0, important: true,
  },
  {
    id: 'nw008',
    title: '러시아 3M22 지르콘 극초음속 미사일 실전 배치 선언',
    summary: '러시아가 마하 9 이상의 극초음속 순항미사일 3M22 지르콘(Tsirkon)을 수상함·잠수함에 실전 배치했다고 선언.',
    content: `■ 출처: TASS, IISS (2023)\n\n러시아가 마하 9 이상의 속도로 비행하는 극초음속 순항미사일 3M22 지르콘의 실전 배치를 공식 선언했다.\n\n【지르콘 제원】\n- 속도: 마하 9\n- 사거리: 1,000km 이상\n- 탑재체: 수상함·잠수함 발사\n- 탄두: 재래식·핵 이중목적\n\n【현방공 무력화 이유】\n- 마하 9 이상에서 기존 SM-2·ESSM·PAC-3 요격 불가능\n- 비행경로 예측 어려움\n- 레이더 포착→요격 준비 시간 극히 짧음\n\n【배치 함정】\n- 어드미럴 고르시코프 함 (야센M급 SSGN 포함)\n- 야센M급 잠수함 발사 시험 성공\n\n【한반도 영향】\n동해·서해 러시아 함정의 위협 수준 CRITICAL 상향`,
    source: 'IISS', category: '러시아', newsType: '뉴스', date: '2023-01-04',
    tags: ['지르콘', '극초음속', '러시아', '마하9', '방공무력화'], views: 0, important: true,
  },
  {
    id: 'nw009',
    title: 'HIMARS 우크라이나 전황 역전 — M270·ATACMS 추가 공급',
    summary: '미국이 공급한 HIMARS M142 다연장로켓이 우크라이나 전쟁 흐름을 바꿨다. 러시아 탄약고·지휘소 대규모 타격 성공.',
    content: `■ 출처: Defense News, Breaking Defense (2022-2025)\n\n미국이 공급한 M142 HIMARS가 우크라이나 전쟁의 판도를 바꾸는 핵심 무기로 부상했다.\n\n【HIMARS 성과】\n- 러시아 탄약고 타격: 400개소 이상\n- 러시아 지휘소·보급로 타격\n- 적 방공 레이더·통신 허브 파괴\n\n【공급 현황】\n- GMLRS 정밀로켓: 수만 발 공급\n- ATACMS(300km): 2023년 비밀 공급\n- PrSM(499km): 2024년 공급 검토\n\n【전술적 교훈】\n- 장거리 정밀화력의 현대전 우위 입증\n- 고속 이동 후 사격-재이동 전술 효과\n\n【K-방산 교훈】\n폴란드·에스토니아·핀란드 K9A2·천무 긴급 수요로 연결`,
    source: 'Defense News', category: '우크라이나', newsType: '전략', date: '2022-10-01',
    tags: ['HIMARS', '우크라이나', 'ATACMS', '정밀화력', '전쟁교훈'], views: 0, important: false,
  },
  {
    id: 'nw010',
    title: 'AUKUS 핵잠수함 협약 — 호주 2030년대 버지니아급 인도',
    summary: '미국·영국·호주 AUKUS 핵잠수함 협약 구체화. 호주 2030년대 버지니아급 SSN 3~5척 인도 확정.',
    content: `■ 출처: Breaking Defense, Reuters (2023-03)\n\n미국·영국·호주 3국이 AUKUS 핵잠수함 협약의 세부 이행 계획을 공개했다.\n\n【AUKUS 핵잠 계획】\n- 단계 1 (2027~): 호주 항구에 미·영 핵잠 순환 배치\n- 단계 2 (2030년대): 미 버지니아급 SSN 3~5척 호주 인도\n- 단계 3 (2040년대): 호주·영 공동 SSN-AUKUS 건조\n\n【전략적 의미】\n- 인도태평양 미국 동맹 잠수함 전력 대폭 강화\n- 중국 PLAN 대잠 압박\n- 대만 분쟁 억제 강화\n\n【중국 반응】\n"핵 확산 우려" 강력 반발. 동남아 설득 외교 전개\n\n【한국 영향】\n한국 핵잠수함(SSN) 독자 개발 논의 가속`,
    source: 'Breaking Defense', category: '미국', newsType: '전략', date: '2023-03-14',
    tags: ['AUKUS', '핵잠수함', '호주', '버지니아급', '인도태평양'], views: 0, important: false,
  },
  {
    id: 'nw011',
    title: '이스라엘-이란 직접 군사 충돌 — 2024년 4월 드론·미사일 공격',
    summary: '이란이 2024년 4월 이스라엘을 향해 드론 170기·미사일 120발 발사. 이스라엘·미군·요르단 99% 요격 성공.',
    content: `■ 출처: Reuters, Times of Israel (2024-04-14)\n\n이란이 처음으로 이스라엘 본토를 직접 공격했다. 드론과 탄도미사일을 동시 발사했으나 대부분 요격됐다.\n\n【공격 규모】\n- 샤헤드 드론: 170기\n- 순항미사일: 30발\n- 탄도미사일: 120발\n- 총 320개 발사체\n\n【요격 성과】\n- 전체 요격률: 99%\n- 이스라엘 Iron Dome·David's Sling·Arrow-3\n- 미 해군 SM-2·SM-6\n- 요르단 공군 협력\n\n【Arrow-3 실전 검증】\n외기권(100km+)에서 탄도미사일 요격 첫 실전 성공\n\n【전략 교훈】\n다층 방공 체계(MLM)의 유효성 입증\n한국 KAMD 체계 구축에 중요한 사례`,
    source: 'Reuters', category: '중동', newsType: '뉴스', date: '2024-04-14',
    tags: ['이란이스라엘', '드론공격', '요격성공', 'Arrow-3', 'Iron Dome'], views: 0, important: true,
  },
  {
    id: 'nw012',
    title: 'F-35 2,000번째 기체 생산 돌파 — 90개국 확산',
    summary: 'LM F-35 라이트닝II가 2,000번째 기체를 생산했다. 전 세계 17개국 3,000기 이상 수주 달성.',
    content: `■ 출처: Lockheed Martin, Breaking Defense (2023)\n\n록히드마틴 F-35 라이트닝 II 프로그램이 2,000번째 기체 생산을 기록했다.\n\n【F-35 현황】\n- 생산: 2,000기+(2023년 기준)\n- 수주: 3,000기 이상\n- 운용국: 미국·영국·이스라엘·한국·일본·호주·이탈리아 등 17개국\n- 버전: A(육상), B(STOVL), C(함재)\n\n【한국 F-35A 현황】\n- 40기 도입 완료 (2019~2021)\n- KF-21 도입 후 60기 추가 검토\n\n【일본 F-35 현황】\n- F-35A·B 147기 도입(목표)\n- F-35B: 이즈모 경항모 탑재\n\n【F-35 실전 성과】\n이스라엘 작전(시리아·이란), 미군 중동 임무 다수`,
    source: 'Breaking Defense', category: '미국', newsType: '사업화', date: '2023-10-01',
    tags: ['F-35', '2000기생산', '17개국', 'KF-21', '스텔스'], views: 0, important: false,
  },
  {
    id: 'nw013',
    title: 'Su-57 우크라이나 전쟁 제한적 투입 — 원거리 미사일 운용만',
    summary: '러시아 유일 5세대기 Su-57이 우크라이나에서 제한적 운용. 전선 접근 없이 Kh-59MK2 발사만 확인.',
    content: `■ 출처: Jane's, IISS (2022~2025)\n\n러시아 Su-57 페레크가 우크라이나 전쟁에 소수 투입됐으나 전선 근접 운용은 피하고 있다.\n\n【Su-57 현황】\n- 운용 수량: 28기 (2025년 기준)\n- 우크라이나 사용: Kh-59MK2 원거리 발사\n- 전선 접근: 없음 (격추 우려)\n\n【제한 투입 이유】\n- 소량 생산으로 손실 부담 큼\n- 우크라이나 방공에 의한 손실 위험\n- 선전 효과 목적 운용\n\n【Su-57 향후 계획】\n- 2030년까지 76기 목표\n- WS-10B 엔진 탑재 문제 지속\n\n【교훈】\n5세대기도 현대 방공 앞에서 리스크 존재`,
    source: 'Jane\'s', category: '러시아', newsType: '뉴스', date: '2024-03-01',
    tags: ['Su-57', '우크라이나', '제한투입', '5세대', '러시아공군'], views: 0, important: false,
  },
  {
    id: 'nw014',
    title: 'Starlink 위성 우크라이나 군사 통신 혁명 — 드론전 게임체인저',
    summary: '스페이스X 스타링크 위성인터넷이 우크라이나 전쟁에서 전술통신 게임체인저로 등극. 드론·포병 정밀화력에 핵심.',
    content: `■ 출처: Breaking Defense, Reuters (2022~2025)\n\n스타링크 저궤도 위성인터넷이 우크라이나 전쟁의 전술통신 판도를 완전히 바꿨다.\n\n【스타링크 군사 활용】\n- 우크라이나 단말기: 42,000개 이상\n- 드론 통제·영상 실시간 전송\n- 포병 사격제원 전달\n- 지휘통제(C2) 네트워크\n\n【러시아 재밍 시도】\n- 다중 주파수·빔포밍으로 재밍 무력화\n- 소프트웨어 업데이트로 재밍 패턴 대응\n\n【군사적 교훈】\n- 저궤도 위성(LEO)의 전술 통신 우위 입증\n- 단일 주파수 의존 통신 취약성 노출\n\n【K-방산 교훈】\n한국 MILSATCOM 차세대 체계 LEO 병행 필요`,
    source: 'Breaking Defense', category: '우크라이나', newsType: '전략', date: '2022-12-01',
    tags: ['스타링크', '우크라이나', 'LEO위성', '드론전', '전술통신'], views: 0, important: false,
  },
  {
    id: 'nw015',
    title: '인도 라팔 F3R 첫 실전 투입 — 히말라야 중국 억제 작전',
    summary: '인도 공군 라팔 F3R이 인도-중국 국경 라다크 지역 실전 임무에 투입. 중국 J-20에 대한 억제 자산으로 부상.',
    content: `■ 출처: Defense News, The Hindu (2021~2024)\n\n인도 공군이 2020년 도입한 다소 라팔 F3R을 중국 국경 히말라야 지역 실전에 투입했다.\n\n【라팔 인도 현황】\n- 도입: 36기 (2020~2023년 인도 완료)\n- 배치: 아그라·암발라 공군기지\n- 무장: 미티어·MICA·HAMMER·SCALP-EG\n\n【실전 투입 내용】\n- 라다크·아루나찰프라데시 순찰\n- Su-30MKI와 함께 북부·동부 방공\n- 중국 J-20 전진기지화에 대한 억제\n\n【인도 전략 가치】\n- 파키스탄 JF-17 대비 압도적 우위\n- 중국 J-20과의 성능 경쟁 중\n\n【2차 계약】\n인도 라팔 해군형 26기 추가 계약 체결`,
    source: 'Defense News', category: '아시아', newsType: '뉴스', date: '2021-09-15',
    tags: ['라팔', '인도', '히말라야', '중국억제', 'HAMMER'], views: 0, important: false,
  },
  {
    id: 'nw016',
    title: '한국 만리경-1 군사정찰위성 발사 성공 — 북한 실시간 감시',
    summary: '한국군의 첫 군사정찰위성 만리경-1이 2023년 12월 발사 성공. EO 광학 카메라로 북한 전역 촬영 능력 확보.',
    content: `■ 출처: 방위사업청, 연합뉴스 (2023-12-02)\n\n한국군의 첫 전용 군사정찰위성 만리경-1(425사업 1호)이 스페이스X 팔콘9 로켓으로 발사에 성공했다.\n\n【만리경-1 현황】\n- 궤도: 지구저궤도(LEO)\n- 센서: 전자광학(EO) 고해상도\n- 용도: 북한 군사시설·이동표적 촬영\n\n【425사업 전체 계획】\n- 1호(EO): 2023년 12월 발사 ✓\n- 2호(SAR): 2024년 발사 ✓\n- 3~5호: 2025년 완성 예정\n\n【운용 효과】\n- 북한 김정은 전용 열차·이동식 발사대 추적\n- 핵시설·군사훈련 실시간 감시\n\n【북한 반응】\n만리경-1 발사 10일 후 자체 군사위성 발사 대응`,
    source: '연합뉴스', category: '한국방산', newsType: '뉴스', date: '2023-12-02',
    tags: ['만리경1', '425사업', '군사위성', '북한감시', '스페이스X'], views: 0, important: true,
  },
  {
    id: 'nw017',
    title: '중국 DF-17 극초음속 글라이더 실전 배치 — 미 항모 대응',
    summary: '중국이 DF-17 극초음속 글라이딩 비행체(HGV)를 로켓군에 정식 배치. 마하 10, 사거리 2,000km로 태평양 미 항모 위협.',
    content: `■ 출처: CSIS, Jane's (2019~2022)\n\n중국이 세계 최초로 실전 배치된 극초음속 글라이더 탑재 탄도미사일 DF-17을 PLA 로켓군에 배치했다.\n\n【DF-17 제원】\n- 속도: 마하 10\n- 사거리: 1,800~2,500km\n- 탑재: DF-ZF HGV 글라이더\n- 정확도: CEP 수십m\n\n【위협 대상】\n- 괌·오키나와 미군 기지\n- 서태평양 항모전단\n- 대만 방어 체계\n\n【현방공 취약점】\n- THAAD·SM-3: 고도·속도 불일치로 요격 어려움\n- 기동탄두로 예측 불가\n\n【미국 대응】\n GLIDE BREAKER 극초음속 요격체 개발 착수\n한국 L-SAM 개발과 연계`,
    source: 'CSIS', category: '중국', newsType: '뉴스', date: '2019-10-01',
    tags: ['DF-17', '극초음속', 'HGV', '중국', '항모위협'], views: 0, important: true,
  },
  {
    id: 'nw018',
    title: '핀란드·스웨덴 NATO 가입 완료 — 러시아 국경 1,340km 추가',
    summary: '핀란드(2023.04)·스웨덴(2024.03) NATO 공식 가입 완료. 러시아-NATO 국경 1,340km 추가로 지정학 완전 변화.',
    content: `■ 출처: NATO, Reuters (2023~2024)\n\n냉전 이후 중립을 유지하던 핀란드와 스웨덴이 러시아 우크라이나 침공을 계기로 NATO에 가입했다.\n\n【가입 일정】\n- 핀란드: 2023년 4월 (32번째 회원국)\n- 스웨덴: 2024년 3월 (33번째 회원국)\n\n【전략 변화】\n- 러시아-NATO 국경: 1,340km 추가\n- 발트해: 사실상 NATO 내해화\n- 아크틱: NATO 영향권 강화\n\n【핀란드 방산 강화】\n- F-35A 64기 도입 확정\n- K9A1 자주포 54문 도입\n- M270 MLRS·NASAMS 배치\n\n【러시아 대응】\n국경 지역 군사력 증강, 서부군관구 확대`,
    source: 'Reuters', category: '유럽', newsType: '전략', date: '2023-04-04',
    tags: ['핀란드NATO', '스웨덴NATO', '러시아국경', '발트해', '냉전종식'], views: 0, important: false,
  },
  {
    id: 'nw019',
    title: '드론 전쟁 시대 — 우크라이나 FPV 드론 하루 2,000기 생산',
    summary: '우크라이나가 FPV(1인칭 시점) 자폭 드론을 하루 2,000기 이상 생산. 드론이 현대전의 핵심으로 완전히 자리잡음.',
    content: `■ 출처: Reuters, Defense News (2023~2025)\n\n우크라이나 전쟁은 소형 드론이 현대 전쟁의 게임체인저로 부상한 역사적 사례가 됐다.\n\n【우크라이나 드론 현황】\n- FPV 드론 생산: 일 2,000기+\n- 누적 생산: 수십만 기\n- 비용: 기당 200~400달러\n- 피해: 러시아 전차 1,000대+ 격파\n\n【러시아 대드론 대응】\n- 전자전 재밍 강화\n- 새장(강철 차양) 장착 전차\n- 재밍 총 배급\n\n【전술 혁명】\n- 저비용 드론 vs 고비용 전차·장갑차 비대칭 성립\n- FPGA 기반 드론 조종: GPS 불필요\n\n【한국 교훈】\n드론봇전투체계 개발 가속, 대드론(C-UAV) 체계 강화`,
    source: 'Defense News', category: '우크라이나', newsType: '전략', date: '2023-09-01',
    tags: ['FPV드론', '우크라이나', '드론전쟁', '게임체인저', '대드론'], views: 0, important: true,
  },
  {
    id: 'nw020',
    title: '2026 K-방산 수출 135억불 달성 — 세계 5위 방산 수출국 부상',
    summary: '한국 방위산업 수출이 2026년 상반기 누적 135억불을 달성, 세계 5~6위 방산 수출국으로 자리매김했다.',
    content: `■ 출처: 방위사업청, SIPRI (2026-07)\n\n한국 방위산업 수출이 2023년 이후 폭발적으로 성장하여 세계 5위권 방산 수출국으로 부상했다.\n\n【연도별 수출 실적】\n- 2021년: 70억불\n- 2022년: 173억불 (폴란드 패키지)\n- 2023년: 135억불\n- 2024년: 180억불 (사우디 천궁-II)\n- 2026년 상반기: 135억불+\n\n【주요 수출 품목】\n- K9 자주포: 9개국 1,200문+\n- K2 전차: 폴란드 1,000대 계약\n- FA-50: 폴란드·필리핀·이라크·태국\n- 천궁-II: 사우디아라비아 38억불\n- 천무 MLRS: UAE 35억불\n\n【세계 방산 수출 순위 (2025)】\n1. 미국 37%\n2. 프랑스 11%\n3. 러시아 10%(급감)\n4. 이스라엘 7%\n5. 한국 6%(급등)↑\n\n【2030 목표】\n수출 300억불, 세계 4위`,
    source: '국방일보', category: '한국방산', newsType: '사업화', date: '2026-07-01',
    tags: ['K방산수출', '135억불', '세계5위', 'K9', 'K2', '천궁'], views: 0, important: true,
  },
  {
    id: 'nw021',
    title: '[사업화] K9 자주포 루마니아 수출 협상 최종 단계 — 4조원 규모',
    summary: '한화에어로스페이스가 루마니아와 K9A1 자주포 수출 협상을 최종 조율 중. 성사 시 유럽 9번째 K9 운용국.',
    content: `■ 출처: 방위사업청, Defense News (2026-07)\n\n한화에어로스페이스가 루마니아 국방부와 K9A1 자주포 수출 협상을 사실상 마무리 단계에 진입했다.\n\n【계약 개요】\n- 규모: 약 4조원 추정\n- 물량: K9A1 자주포 54문 + K10 탄약보급장갑차\n- 현지생산 비율: 협상 쟁점\n\n【전략적 배경】\n- 루마니아, 흑해 방면 러시아 위협 대비 포병 전력 현대화 시급\n- 기존 소련제 자주포 노후화 심각\n\n【K-방산 유럽 확대 효과】\nK9 운용국이 유럽에서 폴란드·노르웨이·에스토니아·핀란드에 이어 9번째로 확대되며, 유럽 포병 표준화 효과 기대.`,
    source: 'Defense News', category: '한국방산', newsType: '사업화', date: '2026-06-25',
    tags: ['K9루마니아', '4조원', '흑해방면', '유럽9번째'], views: 0, important: true,
  },
  {
    id: 'nw022',
    title: '[전략] 미중 반도체 갈등이 방산 공급망에 미치는 영향 분석',
    summary: '미중 기술패권 경쟁이 첨단 무기체계 반도체 공급망 재편을 가속화. 한국 방산업체 대체 공급망 확보 경쟁 심화.',
    content: `■ 출처: CSIS, SIPRI 산업분석 (2026-06)\n\n미중 반도체 수출통제가 장기화되며 전세계 방산 공급망이 근본적으로 재편되고 있다.\n\n【핵심 쟁점】\n- 첨단 GPU·FPGA 수출통제로 정밀유도무기 생산 차질 우려\n- 중국의 희토류 수출제한이 영구자석 기반 유도장치 생산에 타격\n- 각국 방산업체 '탈중국' 공급망 다변화 가속\n\n【한국 방산 영향】\n- K-방산 수출 확대와 맞물려 반도체 자립 필요성 증대\n- 국방과학연구소 국산 밀리터리급 반도체 개발 예산 확대\n\n【전망】\n2027년까지 공급망 재편이 완료되지 않을 경우, 주요 무기체계 생산 지연 리스크 상존.`,
    source: 'CSIS', category: '기술', newsType: '전략', date: '2026-06-20',
    tags: ['미중반도체갈등', '공급망재편', '희토류', '탈중국'], views: 0, important: true,
  },
  {
    id: 'nw023',
    title: '[사업화] 폴란드 K2 3차 계약 협상 개시 — 추가 180대 검토',
    summary: '현대로템이 폴란드와 K2 전차 3차 계약 협상을 개시. 2차 국내생산분 종료 후 추가 물량 검토.',
    content: `■ 출처: 방위사업청, 현대로템 (2026-06)\n\n폴란드가 K2 전차 3차 도입 협상을 공식 개시했다.\n\n【협상 내용】\n- 규모: 추가 180대 검토\n- 사양: K2PL 최신 개량형(APS 통합)\n- 현지생산 비율 확대 요구\n\n【배경】\n- 러시아 접경 방위력 지속 강화 기조 유지\n- 기존 K2/K2PL 운용 경험으로 재계약 신뢰도 높음\n\n【의미】\n3차 계약 성사 시 폴란드向 K2 계열 총 도입량이 1,180대를 넘어서며 단일국 최대 수출 기록 경신.`,
    source: '연합뉴스', category: '한국방산', newsType: '사업화', date: '2026-06-15',
    tags: ['K2폴란드3차', '180대', '현대로템', '최대수출경신'], views: 0, important: true,
  },
  {
    id: 'nw024',
    title: '[전략] 대만해협 유사시 미일 개입 시나리오 분석',
    summary: 'IISS 신규 보고서, 대만해협 무력충돌 발생 시 미일 개입 수준별 시나리오와 한반도 파급효과 분석.',
    content: `■ 출처: IISS Military Balance 2026 특별보고서\n\n대만해협 긴장 고조에 따라 유사시 시나리오별 전략 분석이 각국 싱크탱크에서 활발히 진행 중이다.\n\n【시나리오 구분】\n1. 제한적 봉쇄(회색지대) — 미일 직접개입 낮음\n2. 전면 상륙작전 — 미일 개입 가능성 高\n3. 미사일 선제타격 — 확전 리스크 최대\n\n【한반도 파급효과】\n- 주한미군 전력 일부 대만방면 전용 가능성\n- 북한의 기회주의적 도발 가능성 동시 평가 필요\n- 한국의 독자 대응태세 강화 필요성 제기\n\n【정책 제언】\n한미 확장억제협의체(EDSCG)에서 대만 유사시 한반도 안보공백 대비책 사전 논의 필요.`,
    source: 'IISS', category: '아시아', newsType: '전략', date: '2026-06-12',
    tags: ['대만해협', '미일개입시나리오', '한반도파급', 'EDSCG'], views: 0, important: true,
  },
  {
    id: 'nw025',
    title: '[사업화] 한화오션 캐나다 잠수함 사업 예비협상자 선정',
    summary: '한화오션이 캐나다 차기 잠수함 사업(최대 12척) 예비협상대상자로 선정. K-방산 잠수함 수출 최대 규모 기대.',
    content: `■ 출처: 방위사업청, 한화오션 (2026-06)\n\n한화오션이 캐나다 잠수함 교체사업 예비협상대상자로 선정되며 K-방산 사상 최대 잠수함 수출 가능성이 열렸다.\n\n【사업 개요】\n- 규모: 최대 12척\n- 계약 예상 규모: 20조원+\n- 캐나다 기존 빅토리아급(영국제) 노후 대체\n\n【경쟁 구도】\n- 독일 ThyssenKrupp Type212CD와 최종 경쟁\n- 한국은 장보고-III(KSS-III) 파생형 제안\n\n【의미】\n성사될 경우 K-방산 역사상 최대 규모 잠수함 수출 계약이자, 북미 시장 최초 진출 사례.`,
    source: 'Defense News', category: '한국방산', newsType: '사업화', date: '2026-06-08',
    tags: ['한화오션캐나다', '잠수함12척', '20조원', '북미최초진출'], views: 0, important: true,
  },
  {
    id: 'nw026',
    title: '[전략] 북극항로 개방과 러시아·중국·NATO 군사경쟁 심화',
    summary: '기후변화로 북극항로 상시개방 가시화되며 러시아·중국·NATO의 북극권 군사·자원 경쟁이 새로운 전략 축으로 부상.',
    content: `■ 출처: 미국방부 북극전략보고서, NATO (2026)\n\n북극 해빙 가속화로 신규 항로·자원 개발 경쟁이 군사적 긴장으로 이어지고 있다.\n\n【핵심 동향】\n- 러시아 북극권 군사기지 재건·확장 지속\n- 중국의 '근북극국가' 자처 및 쇄빙선단 확충\n- NATO 신규회원 핀란드·스웨덴의 북극 방위 분담 확대\n\n【전략적 함의】\n- 북극항로 상용화 시 기존 수에즈·파나마 운하 경유 물류 재편\n- 자원(석유·가스·희토류) 개발권 경쟁 격화\n\n【한국 관련성】\n한국 조선·쇄빙선 기술 수요 증가 예상, 극지 방산장비 수출 기회로도 연결 가능.`,
    source: 'IISS', category: '유럽', newsType: '전략', date: '2026-06-05',
    tags: ['북극항로', '북극군사경쟁', '러시아중국NATO', '쇄빙선'], views: 0, important: false,
  },
  {
    id: 'nw027',
    title: '[사업화] LIG넥스원 UAE 천궁-II 추가 수출 계약 체결',
    summary: 'LIG넥스원이 UAE와 천궁-II 추가 수출 계약을 체결. 중동 지대공미사일 시장 K-방산 입지 재확인.',
    content: `■ 출처: 방위사업청, LIG넥스원 (2026-05)\n\nLIG넥스원이 UAE와 천궁-II 지대공미사일 체계 추가 계약을 체결했다.\n\n【계약 규모】\n- 약 2.5조원 추정\n- 기존 UAE 천궁-II 1차 도입분에 대한 후속 확대\n\n【중동 시장 의미】\n- 사우디에 이은 두번째 대형 중동 천궁 수출\n- 후티 드론·미사일 위협 대응 수요 지속 증가\n\n【향후 전망】\n카타르·쿠웨이트 등 걸프국가 추가 수출 협상 검토 중.`,
    source: '국방일보', category: '한국방산', newsType: '사업화', date: '2026-05-28',
    tags: ['천궁II UAE', '2.5조원', '중동시장', 'LIG넥스원'], views: 0, important: false,
  },
  {
    id: 'nw028',
    title: '[전략] 우크라이나 종전 이후 유럽 방위산업 재편 시나리오',
    summary: '우크라이나 전쟁 장기화 국면 속 유럽 각국 방위산업 자립 전략과 미국 의존도 축소 움직임 분석.',
    content: `■ 출처: 유럽전략연구소, Jane's (2026)\n\n우크라이나 전쟁을 계기로 유럽 각국이 자체 방위산업 역량 강화에 나서고 있다.\n\n【핵심 흐름】\n- 프랑스·독일 주도 유럽 공동무기체계 개발 확대(FCAS 등)\n- 동유럽 국가들의 한국·튀르키예 무기 도입 지속(대미 의존 분산)\n- EU 차원 방위산업 지원기금(EDIP) 신설 논의\n\n【한국 방산에 대한 시사점】\n- 유럽 국가들의 '검증된 신뢰할 수 있는 대체 공급자' 수요 지속\n- 단, 유럽 자체 생산역량 강화 시 중장기 경쟁 심화 가능성\n\n【결론】\n한국은 조달 신속성과 가격 경쟁력을 유지하며 현지생산·기술이전 확대로 장기 파트너십 전환이 관건.`,
    source: 'Jane\'s', category: '유럽', newsType: '전략', date: '2026-05-20',
    tags: ['유럽방위산업재편', 'FCAS', 'EDIP', '대미의존분산'], views: 0, important: false,
  },
  {
    id: 'nw029',
    title: '[뉴스] 미 국방부 2027 회계연도 국방예산 9천억달러 요청',
    summary: '미 국방부가 2027 회계연도 국방예산으로 사상 최대 규모인 9천억달러를 의회에 요청. 극초음속·우주전력 집중 투자.',
    content: `■ 출처: 미국방부, Breaking Defense (2026-06)\n\n미 국방부가 2027 회계연도 국방예산으로 9,000억달러를 의회에 공식 요청했다.\n\n【중점 투자분야】\n- 극초음속 무기체계: 130억달러+\n- 우주군 전력: 300억달러+\n- 차세대 핵전력 현대화(센티넬 등)\n- NGAD 6세대 전투기 개발 가속\n\n【의회 심의 전망】\n국방예산 증액에 대한 초당적 지지 속에서도 개별 프로그램별 비용초과 문제로 세부 조정 예상.\n\n【동맹국 영향】\n한국 등 동맹국에 대한 확장억제 예산도 별도 편성, 인태 전력배치 예산 증액 포함.`,
    source: 'Breaking Defense', category: '미국', newsType: '뉴스', date: '2026-06-02',
    tags: ['미국방예산', '9천억달러', '극초음속투자', '우주군예산'], views: 0, important: true,
  },
  {
    id: 'nw030',
    title: '[사업화] 현대로템 사우디 K2 전차 수출 타당성 조사 착수',
    summary: '현대로템이 사우디아라비아와 K2 전차 수출 타당성 조사에 착수. 성사 시 중동 첫 K2 수출국.',
    content: `■ 출처: 방위사업청, 현대로템 (2026-05)\n\n현대로템이 사우디아라비아 국방부와 K2 전차 수출 관련 타당성 조사 양해각서를 체결했다.\n\n【조사 내용】\n- 사막 환경 최적화 개량형 검토(레클레르·M1A2SA 사막형 참고)\n- 현지 정비·부품 공급망 구축 방안\n\n【경쟁 구도】\n- 독일 레오파르트2, 미국 M1A2 사우디 기존 운용분과 경쟁\n- K2는 가격 경쟁력·신속 납기로 차별화 시도\n\n【의미】\n성사 시 K-방산 지상무기 중동 진출의 상징적 사례가 될 전망.`,
    source: 'Defense News', category: '한국방산', newsType: '사업화', date: '2026-05-15',
    tags: ['K2사우디', '타당성조사', '중동첫수출시도', '현대로템'], views: 0, important: false,
  },
  {
    id: 'nw031',
    title: '[전략] 한국 방위산업 수출 지속가능성 — 기술이전 딜레마 분석',
    summary: 'K-방산 급성장 이면의 기술이전 요구 확대와 핵심기술 유출 리스크에 대한 전략적 균형점 모색 필요성 제기.',
    content: `■ 출처: 국방기술진흥연구소, KIDA 정책보고서 (2026)\n\nK-방산의 급속한 수출 확대 이면에서 기술이전 요구가 갈수록 커지는 딜레마가 심화되고 있다.\n\n【핵심 쟁점】\n- 폴란드·사우디 등 대형 수입국의 현지생산·기술이전 요구 상시화\n- 핵심 원천기술(엔진·레이더·유도장치) 이전 시 장기 경쟁력 훼손 우려\n- 반면 기술이전 거부 시 계약 경쟁력 저하\n\n【해외 사례 비교】\n- 미국: 핵심기술 이전 엄격 통제, 완제품 수출 중심\n- 프랑스: 선택적 기술이전으로 장기 파트너십 구축\n\n【정책 제언】\n한국형 수출통제 등급체계 정교화, 핵심원천기술과 통합체계기술 분리 전략 필요.`,
    source: 'IISS', category: '한국방산', newsType: '전략', date: '2026-05-10',
    tags: ['기술이전딜레마', 'K방산지속가능성', '수출통제', '핵심기술유출'], views: 0, important: true,
  },
  {
    id: 'nw032',
    title: '[사업화] 한화에어로스페이스 필리핀 K9 자주포 2차 계약',
    summary: '한화에어로스페이스가 필리핀과 K9 자주포 2차 계약 체결. 동남아 K-방산 지상화력 수출 지속 확대.',
    content: `■ 출처: 방위사업청, 한화에어로스페이스 (2026-04)\n\n한화에어로스페이스가 필리핀 국방부와 K9 자주포 2차 도입 계약을 체결했다.\n\n【계약 개요】\n- 규모: 약 3천억원\n- 물량: K9 자주포 12문 추가\n\n【배경】\n남중국해 영유권 갈등 속 필리핀 화력 현대화 수요 지속. 기존 1차 도입분 운용 만족도 반영.\n\n【동남아 시장 전망】\n인도네시아·베트남 등 추가 K9 수출 협상 가능성도 거론.`,
    source: '연합뉴스', category: '한국방산', newsType: '사업화', date: '2026-04-22',
    tags: ['K9필리핀2차', '동남아확대', '남중국해', '한화에어로스페이스'], views: 0, important: false,
  },
  {
    id: 'nw033',
    title: '[전략] 일본 방위비 GDP 2% 달성 이후 지역 안보구도 변화',
    summary: '일본 방위비 GDP 2% 목표 조기 달성. 반격능력 보유와 함께 동북아 군비경쟁 새 국면 진입 평가.',
    content: `■ 출처: 방위백서, IISS Military Balance (2026)\n\n일본이 방위비 GDP 2% 목표를 예정보다 앞당겨 달성하며 동북아 안보지형 변화가 가속화되고 있다.\n\n【핵심 변화】\n- 도마호크 순항미사일 도입으로 '반격능력' 실질 확보\n- 방위장비이전 3원칙 완화로 무기수출 확대 시도\n- 남서제도(오키나와~요나구니) 미사일부대 배치 완료\n\n【한반도 안보 함의】\n- 한일 안보협력 확대 필요성과 과거사 갈등의 긴장관계 지속\n- 한미일 3자 정보공유체계(2023 캠프데이비드) 실효성 강화 추세\n\n【평가】\n일본의 군사력 정상화가 지역 억제력 강화로 작용할지, 군비경쟁 촉발 요인이 될지 지속 모니터링 필요.`,
    source: 'IISS', category: '아시아', newsType: '전략', date: '2026-04-15',
    tags: ['일본방위비2%', '반격능력', '한미일협력', '동북아안보'], views: 0, important: true,
  },
  {
    id: 'nw034',
    title: '[사업화] 대우조선해양 페루 호위함 건조 계약 체결',
    summary: 'HD현대중공업이 페루 해군 신형 호위함 2척 건조 계약을 체결. 남미 함정 수출 시장 신규 개척.',
    content: `■ 출처: 방위사업청, HD현대중공업 (2026-04)\n\nHD현대중공업이 페루 해군과 3,000톤급 호위함 2척 건조 계약을 체결했다.\n\n【계약 개요】\n- 규모: 약 1.2조원\n- 사양: 인천급 파생 수출형, 해성·해궁 통합\n\n【남미 시장 의미】\n한국 함정 수출이 아시아·중동에 이어 남미까지 확대되는 계기. 페루의 태평양 해상통제력 강화 목적.\n\n【향후 전망】\n칠레·콜롬비아 등 추가 남미 함정 수출 협상 가능성 검토.`,
    source: 'Defense News', category: '한국방산', newsType: '사업화', date: '2026-04-08',
    tags: ['페루호위함', '남미시장개척', 'HD현대중공업', '인천급파생'], views: 0, important: false,
  },
  {
    id: 'nw035',
    title: '[전략] AI 자율무기체계 국제규범 공백과 한국의 대응 방향',
    summary: 'UN 차원 자율살상무기(LAWS) 규제 논의 답보 상태 지속. 한국의 AI 무기체계 개발·수출 전략적 포지셔닝 필요.',
    content: `■ 출처: UN CCW, KIDA 정책브리프 (2026)\n\nAI 기반 자율살상무기체계(LAWS)에 대한 국제 규범 논의가 수년째 답보 상태다.\n\n【국제 논의 현황】\n- UN 특정재래식무기금지협약(CCW) 정부전문가그룹 논의 지속되나 구속력있는 합의 부재\n- 미중러 등 주요국 자율무기 개발 경쟁은 가속화\n\n【한국의 입장】\n- SOL-01 등 AI 전장분석체계는 '의사결정 지원'으로 규정, 완전자율 살상결정과 구분\n- 수출 시 국제규범 미비로 인한 평판 리스크 관리 필요\n\n【정책 제언】\n한국이 책임있는 AI 무기 개발 원칙을 선제적으로 수립해 국제 규범 형성 논의를 주도할 필요성 제기.`,
    source: 'IISS', category: '기술', newsType: '전략', date: '2026-03-28',
    tags: ['자율살상무기', 'LAWS', 'UN CCW', 'AI무기규범'], views: 0, important: false,
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
const DATA_VERSION = 'v5-platform-v3-2026-07-04'

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
  const [news, setNews] = useState<NewsItem[]>(() => {
    const ver = localStorage.getItem('kd:version')
    if (ver !== DATA_VERSION) return SEED_NEWS
    const stored = load<NewsItem[]>(KEYS.news, [])
    return stored.length ? stored : SEED_NEWS
  })
  const [isAdmin, setIsAdmin] = useState(() => load<boolean>(KEYS.auth, false))

  // Persist
  useEffect(() => { save(KEYS.notices, notices) }, [notices])
  useEffect(() => { save(KEYS.reports, reports) }, [reports])
  useEffect(() => { save(KEYS.intels, intels) }, [intels])
  useEffect(() => { save(KEYS.operators, operators) }, [operators])
  useEffect(() => { save(KEYS.news, news) }, [news])

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

  // News
  const addNews = useCallback((n: Omit<NewsItem, 'id' | 'date' | 'views'>): NewsItem => {
    const item: NewsItem = { ...n, id: uid(), date: now(), views: 0 }
    setNews((prev) => [item, ...prev])
    return item
  }, [])
  const updateNews = useCallback((id: string, n: Partial<NewsItem>) =>
    setNews((prev) => prev.map((x) => x.id === id ? { ...x, ...n } : x)), [])
  const deleteNews = useCallback((id: string) =>
    setNews((prev) => prev.filter((x) => x.id !== id)), [])

  // Operator
  const addOperator = useCallback((o: Omit<Operator, 'id' | 'createdAt' | 'lastLogin'>) =>
    setOperators((prev) => [{ ...o, id: uid(), createdAt: now(), lastLogin: '-' }, ...prev]), [])
  const updateOperator = useCallback((id: string, o: Partial<Operator>) =>
    setOperators((prev) => prev.map((x) => x.id === id ? { ...x, ...o } : x)), [])
  const deleteOperator = useCallback((id: string) =>
    setOperators((prev) => prev.filter((x) => x.id !== id)), [])

  // Views
  const incrementView = useCallback((id: string, type: 'notice' | 'report' | 'intel' | 'news') => {
    if (type === 'notice') setNotices((p) => p.map((x) => x.id === id ? { ...x, views: x.views + 1 } : x))
    if (type === 'report') setReports((p) => p.map((x) => x.id === id ? { ...x } : x))
    if (type === 'intel') setIntels((p) => p.map((x) => x.id === id ? { ...x } : x))
    if (type === 'news') setNews((p) => p.map((x) => x.id === id ? { ...x, views: x.views + 1 } : x))
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
      notices, reports, intels, operators, news, isAdmin,
      addNotice, updateNotice, deleteNotice,
      addReport, updateReport, deleteReport,
      addIntel, updateIntel, deleteIntel,
      addNews, updateNews, deleteNews,
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
export const NEWS_TYPE_COLORS: Record<NewsType, string> = {
  '뉴스': '#00d4ff', '전략': '#c084fc', '사업화': '#00ff88',
}
export const NEWS_CATEGORY_COLORS: Record<NewsCategory, string> = {
  '한국방산': '#00ff88', '북한': '#ff2d55', '미국': '#00d4ff', '중국': '#ffcc00',
  '러시아': '#ff6b35', '유럽': '#60a5fa', '중동': '#f87171', '아시아': '#fb923c',
  '우크라이나': '#fcd34d', '사이버': '#f472b6', '우주': '#a3e635', '기술': '#8ab8d4',
}
