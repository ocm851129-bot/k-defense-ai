// Defense industry database — budgets, exports, contractors, procurement

export interface DefenseContractor {
  id: string
  name: string
  country: string
  countryCode: string
  revenue2024: number   // USD 억 달러
  defenseRevenue2024: number
  employees: number
  keyProducts: string[]
  exportMarkets: string[]
  stockSymbol?: string
}

export interface CountryDefenseProfile {
  code: string
  name: string
  nameKo: string
  flag: string
  color: string
  budget2024: number         // USD 억 달러
  budgetGdpPct: number       // GDP 대비 %
  personnel: number          // 현역 병력 (만 명)
  reservePersonnel: number   // 예비군 (만 명)
  exportVolume2024: number   // 방산 수출액 USD 억 달러
  importVolume2024: number   // 방산 수입액 USD 억 달러
  majorBuyers: string[]
  majorSuppliers: string[]
  nuclearStatus: 'CONFIRMED' | 'SUSPECTED' | 'NONE' | 'NATO_SHARING'
  description: string
  keyCapabilities: string[]
  recentProcurement: string[]
  exportHighlights: { item: string; buyer: string; value: string; year: number }[]
}

export interface ExportDeal {
  id: string
  seller: string
  buyer: string
  item: string
  valueUsd: number    // USD 억 달러
  quantity: string
  signedYear: number
  deliveryYear: string
  status: 'CONTRACTED' | 'DELIVERED' | 'NEGOTIATING' | 'CANCELLED'
  category: string
}

export interface DefenseBudgetTrend {
  year: number
  ROK: number
  DPRK: number
  USA: number
  CHINA: number
  RUSSIA: number
  JAPAN: number
}

// ──────────────────────────────────────────────────────────────────────────────
// 국가별 방산 프로파일
// ──────────────────────────────────────────────────────────────────────────────
export const COUNTRY_PROFILES: CountryDefenseProfile[] = [
  {
    code: 'ROK',
    name: 'Republic of Korea',
    nameKo: '대한민국',
    flag: '🇰🇷',
    color: '#00ff88',
    budget2024: 597,            // USD 597억 달러 (약 80조원)
    budgetGdpPct: 2.8,
    personnel: 50,              // 50만 명
    reservePersonnel: 310,      // 310만 명
    exportVolume2024: 140,      // USD 140억 달러 (역대 최고)
    importVolume2024: 28,
    majorBuyers: ['폴란드', '호주', 'UAE', '사우디', '노르웨이', '핀란드', '이집트'],
    majorSuppliers: ['미국', '이스라엘', '독일'],
    nuclearStatus: 'NONE',
    description: '세계 9위 방산수출국 (2024). K9 자주포·K2 전차·천무 등 K-방산이 글로벌 시장 급성장. 2022년 폴란드 100억 달러 패키지 딜로 유럽 진출 가속.',
    keyCapabilities: [
      'F-35A×40 스텔스 전투기',
      'KF-21 보라매 개발 (4.5세대)',
      '세종대왕급 이지스 구축함 6척',
      'KSS-III 잠수함 (VLS 탑재)',
      'K2 흑표 주력전차',
      'K9 자주포 (18개국 수출)',
      '천무 MLRS',
      '천궁-II 중거리 방공 (UAE 수출)',
      '현무 시리즈 탄도·순항미사일',
      '군 정찰위성 1~5호 계획',
    ],
    recentProcurement: [
      'F-35A 추가 20기 도입 검토',
      'MQ-9B 리퍼 드론 도입',
      '차세대 구축함 KDX-III Batch II 3척',
      '글로벌호크 UAV 운용',
      'SM-6 요격미사일 도입',
      'L-SAM 장거리 방공 개발',
    ],
    exportHighlights: [
      { item: 'K2 전차 1,000대 + K9 자주포 672문 + 천무 288문', buyer: '폴란드', value: '$19B+', year: 2022 },
      { item: '천궁-II 방공체계', buyer: 'UAE', value: '$3.5B', year: 2022 },
      { item: 'K9 자주포 24문', buyer: '호주', value: '$1B', year: 2024 },
      { item: 'FA-50 경전투기 48기', buyer: '폴란드', value: '$3B', year: 2022 },
      { item: 'K9 자주포 + K10 탄약운반차', buyer: '인도', value: '$2B+', year: 2017 },
      { item: 'KF-21 공동개발 (20%)', buyer: '인도네시아', value: '$1.7B', year: 2016 },
    ],
  },

  {
    code: 'DPRK',
    name: 'Democratic Peoples Republic of Korea',
    nameKo: '조선민주주의인민공화국',
    flag: '🇰🇵',
    color: '#ff2d55',
    budget2024: 40,             // 추정 USD 40억 달러 (극비, 4~6% GDP 추정)
    budgetGdpPct: 15,           // GDP 대비 추정
    personnel: 128,             // 128만 명 (세계 4위 군사력 규모)
    reservePersonnel: 600,      // 600만 명+
    exportVolume2024: 10,       // 러시아 포탄·미사일 수출 추정
    importVolume2024: 2,        // 이중용도 기술 밀수 추정
    majorBuyers: ['러시아 (포탄·KN-23)', '이란 (미사일 기술)', '시리아'],
    majorSuppliers: ['러시아 (엔진·소재)', '중국 (이중용도)'],
    nuclearStatus: 'CONFIRMED',
    description: '핵·미사일 개발에 국력 집중. UN 제재 하에서도 사이버 절취·불법 수출로 자금 조달. 2022년부터 러시아에 포탄 수백만 발·KN-23 수출. 2026년 핵탄두 40~80기 추정.',
    keyCapabilities: [
      '핵탄두 40~80기 (추정)',
      '화성-17·18·19형 ICBM',
      '600mm 전술핵 방사포',
      'KN-23·KN-24 정밀 SRBM',
      '화살-2형 전략 순항미사일(2,000km)',
      '만리경 정찰위성 1·2호',
      '소형 무인기 수천 대',
      '170mm 곡산 자주포 300+문',
      '240mm 방사포 200+문',
      '128만 대규모 재래식 병력',
    ],
    recentProcurement: [
      '화성-18형 고체ICBM 양산 (2023~)',
      '600mm 초대형방사포 전술핵 탑재 훈련',
      '만리경-2호 정찰위성 발사 (2024)',
      '러시아로부터 고체ICBM 기술 이전 의혹',
      '자폭형 무인기 대량 생산',
    ],
    exportHighlights: [
      { item: '포탄 수백만 발', buyer: '러시아', value: '$2B+ 추정', year: 2023 },
      { item: 'KN-23 SRBM 다수', buyer: '러시아', value: '추정', year: 2024 },
      { item: '탄도미사일 기술', buyer: '이란·시리아', value: '미상', year: 2020 },
    ],
  },

  {
    code: 'USA',
    name: 'United States of America',
    nameKo: '미합중국',
    flag: '🇺🇸',
    color: '#00d4ff',
    budget2024: 8860,           // USD 8,860억 달러
    budgetGdpPct: 3.5,
    personnel: 144,             // 144만 명 (현역)
    reservePersonnel: 80,
    exportVolume2024: 2380,     // USD 2,380억 달러 (세계 1위)
    importVolume2024: 45,
    majorBuyers: ['한국', '일본', '호주', '이스라엘', '사우디', '대만', '폴란드', 'NATO 동맹'],
    majorSuppliers: ['자국 내 조달 중심'],
    nuclearStatus: 'CONFIRMED',
    description: '세계 최대 방산 강국. 록히드마틴·보잉·RTX·노스롭그루먼이 방산 매출 상위권 독점. 주한미군 2.85만 명 주둔, 핵우산(확장억제) 제공.',
    keyCapabilities: [
      'B-21 레이더 스텔스 폭격기',
      'F-35 전 기종 (A/B/C)',
      '핵항공모함 11척',
      'Virginia급 핵잠수함',
      'THAAD·PAC-3 미사일방어',
      'HIMARS·M270 MLRS',
      'AGM-158 JASSM-ER',
      'SM-6 함대공미사일',
      '차세대 ICBM LGM-35A 센티넬',
      '핵탄두 5,550기 보유',
    ],
    recentProcurement: [
      'B-21 레이더 100기+ 계획',
      'F-35 추가 계약 연간 150기+',
      'NGAD 6세대 전투기 개발',
      '극초음속 무기 AGM-183A ARRW',
      '해상발사핵순항미사일(SLCM-N) 재개',
    ],
    exportHighlights: [
      { item: 'F-35 전기종', buyer: '14개국', value: '$80B+', year: 2024 },
      { item: 'PAC-3 MSE + THAAD', buyer: '폴란드·대만·한국·사우디', value: '$15B+', year: 2023 },
      { item: 'AH-64E 아파치', buyer: '한국·일본·대만', value: '$5B+', year: 2022 },
      { item: 'HIMARS 다연장로켓', buyer: '우크라이나·폴란드·대만 등', value: '$10B+', year: 2022 },
    ],
  },

  {
    code: 'CHINA',
    name: 'Peoples Republic of China',
    nameKo: '중화인민공화국',
    flag: '🇨🇳',
    color: '#ffcc00',
    budget2024: 2360,           // USD 2,360억 달러 (공식. 실제는 더 높음 추정)
    budgetGdpPct: 1.7,          // 공식 수치. 실제 1.7~2.5% 추정
    personnel: 200,             // 200만 명
    reservePersonnel: 150,
    exportVolume2024: 320,      // USD 320억 달러 (세계 3~4위)
    importVolume2024: 35,
    majorBuyers: ['파키스탄', '방글라데시', '미얀마', '이란', '나이지리아', '아프리카'],
    majorSuppliers: ['러시아 (엔진·소재)', '자국 내 급속 발전'],
    nuclearStatus: 'CONFIRMED',
    description: '급속한 군사력 현대화 진행 중. 2030년까지 핵탄두 1,000기 목표(미 국방부). 대만 통일 시나리오에서 핵심 변수. 북한의 최대 지원국으로 한반도 방정식 영향.',
    keyCapabilities: [
      'J-20 5세대 스텔스 전투기',
      '항공모함 3척 (랴오닝·산둥·푸젠)',
      'DF-41 ICBM (MIRV 10기)',
      'DF-17 극초음속 활공체 (HGV)',
      'DF-21D 항모킬러 ASBM',
      'Type 055 만재 12,000톤 구축함',
      '094형 핵잠수함 (JL-3 SLBM)',
      '핵탄두 500기+ (SIPRI 2024)',
      'CJ-100/101 장거리 순항미사일',
      '무인기: WZ-7·TB-001 등',
    ],
    recentProcurement: [
      'J-35 5세대 함재기 개발',
      '핵탄두 연간 100기+ 증가',
      '대형 무인 수상함(USV) 배치',
      'DF-27 극초음속 IRBM 시험',
      '우주 요격 위성(ASAT) 시험',
    ],
    exportHighlights: [
      { item: 'JF-17 전투기 (파키스탄 공동개발)', buyer: '파키스탄·미얀마', value: '$3B+', year: 2022 },
      { item: 'Type 041 잠수함', buyer: '파키스탄·방글라데시', value: '$5B+', year: 2022 },
      { item: 'HQ-9 방공미사일', buyer: '세르비아·이집트·아제르바이잔', value: '$2B', year: 2023 },
      { item: 'WS-15 드론', buyer: '다수 아프리카·중동국', value: '$1B+', year: 2024 },
    ],
  },

  {
    code: 'RUSSIA',
    name: 'Russian Federation',
    nameKo: '러시아 연방',
    flag: '🇷🇺',
    color: '#ff6b35',
    budget2024: 1090,           // USD 1,090억 달러 (GDP 6.7% — 전시 급증)
    budgetGdpPct: 6.7,
    personnel: 100,             // 전시 동원 포함 약 150만 추정
    reservePersonnel: 200,
    exportVolume2024: 95,       // 제재·전쟁으로 수출 급감 (최고 2015년 $147억)
    importVolume2024: 8,        // 북한·이란으로부터 탄약·드론
    majorBuyers: ['인도 (급감 중)', '중국', '이란', '북한 (탄약 수령)'],
    majorSuppliers: ['북한 (포탄·KN-23)', '이란 (샤헤드 드론)'],
    nuclearStatus: 'CONFIRMED',
    description: '우크라이나 전쟁으로 재래식 전력 대규모 소모. 핵 위협 카드 반복 사용. 북한 포탄·미사일 수입으로 전선 유지. 방산 수출 급감하나 핵전력은 유지.',
    keyCapabilities: [
      '핵탄두 6,255기 (세계 1위, SIPRI)',
      'S-400 방공체계',
      'Su-57 5세대 전투기 (소량)',
      'Kinzhal 극초음속 미사일',
      'Zircon 극초음속 순항미사일',
      'Iskander-M SRBM (이스칸데르)',
      '핵잠수함 Borei급 (Bulava SLBM)',
      'RS-28 사르마트 ICBM (Satan-2)',
      'Tu-160M 전략폭격기',
      '샤헤드-136 자폭 드론 (이란산)',
    ],
    recentProcurement: [
      '북한 KN-23 미사일 수입 (우크라이나 전선)',
      '이란 샤헤드 드론 수입 (수천 대)',
      'Su-35S 추가 생산',
      'T-14 아르마타 전차 (극소량 생산)',
    ],
    exportHighlights: [
      { item: 'S-400 방공체계', buyer: '터키·인도·중국', value: '$20B+', year: 2019 },
      { item: 'Su-30MKI', buyer: '인도', value: '$15B+', year: 2020 },
      { item: 'T-90S/MS 전차', buyer: '인도·베트남·알제리', value: '$5B', year: 2021 },
    ],
  },

  {
    code: 'JAPAN',
    name: 'Japan',
    nameKo: '일본',
    flag: '🇯🇵',
    color: '#c084fc',
    budget2024: 780,            // USD 780억 달러 (GDP 2% 목표 달성)
    budgetGdpPct: 2.0,
    personnel: 24.7,            // 24.7만 명
    reservePersonnel: 5.6,
    exportVolume2024: 15,       // 방산수출 규제 완화 후 급증
    importVolume2024: 85,
    majorBuyers: ['호주', '인도', '필리핀', '인도네시아 (방산 협력)'],
    majorSuppliers: ['미국 (F-35·SM-6 등)'],
    nuclearStatus: 'NONE',
    description: '2022~2027년 방위비 2배 증액 계획. GDP 2% 목표 달성. Tomahawk 巡航미사일 도입으로 반격 능력 확보. 방산수출 규제 완화로 적극적 수출 전환.',
    keyCapabilities: [
      'F-35A/B ×147기 계획',
      'DDH형 경항모 2척 (F-35B 탑재 개조)',
      'イージス함 8척 (SM-3·SM-6)',
      'Tomahawk TLAM 400기 도입 계획',
      '12식 지대함 미사일 (사거리 1,000km+ 개발)',
      'Type 10 주력전차',
      '国産극초음속 활공탄(HGV) 개발',
      '이지스 어쇼어 대체 이지스 함',
    ],
    recentProcurement: [
      'Tomahawk Block V 400발 도입 계약',
      'F-35B 42기 추가 도입',
      'SM-6 요격미사일 도입',
      'GPI(글라이드 페이즈 인터셉터) 미일 공동개발',
      'GCAP(차세대전투기) 한·이·영 공동개발',
    ],
    exportHighlights: [
      { item: '신형 호위함 설계 지원', buyer: '호주', value: '협력', year: 2024 },
      { item: '12식 지대함 미사일 수출 검토', buyer: '필리핀', value: '협의 중', year: 2024 },
    ],
  },
]

// ──────────────────────────────────────────────────────────────────────────────
// 주요 방산업체
// ──────────────────────────────────────────────────────────────────────────────
export const CONTRACTORS: DefenseContractor[] = [
  {
    id: 'c-rok-001',
    name: '한화에어로스페이스',
    country: '대한민국',
    countryCode: 'ROK',
    revenue2024: 95,
    defenseRevenue2024: 70,
    employees: 18000,
    keyProducts: ['K9 자주포', 'K239 천무 MLRS', '현무 미사일', 'KF-21 엔진(GE F414)', '천궁 유도탄'],
    exportMarkets: ['폴란드', '인도', '호주', 'UAE', '핀란드', '에스토니아'],
    stockSymbol: '012450.KS',
  },
  {
    id: 'c-rok-002',
    name: 'LIG넥스원',
    country: '대한민국',
    countryCode: 'ROK',
    revenue2024: 28,
    defenseRevenue2024: 26,
    employees: 6500,
    keyProducts: ['현무-2/3 미사일', '해성 미사일', '천궁-II', '비궁', '신궁', '천검'],
    exportMarkets: ['UAE', '사우디', '이라크'],
    stockSymbol: '079550.KS',
  },
  {
    id: 'c-rok-003',
    name: '현대로템',
    country: '대한민국',
    countryCode: 'ROK',
    revenue2024: 38,
    defenseRevenue2024: 20,
    employees: 10000,
    keyProducts: ['K2 흑표 전차', 'K1A2 전차', 'K21 장갑차', '레드백 IFV(수출형)'],
    exportMarkets: ['폴란드', '호주', '노르웨이'],
    stockSymbol: '064350.KS',
  },
  {
    id: 'c-rok-004',
    name: 'KAI (한국항공우주산업)',
    country: '대한민국',
    countryCode: 'ROK',
    revenue2024: 42,
    defenseRevenue2024: 38,
    employees: 11000,
    keyProducts: ['KF-21 보라매', 'FA-50', 'T-50', '수리온 헬기', 'LAH 소형무장헬기'],
    exportMarkets: ['폴란드', '이라크', '필리핀', '태국', '말레이시아', '세네갈'],
    stockSymbol: '047810.KS',
  },
  {
    id: 'c-rok-005',
    name: '한화오션',
    country: '대한민국',
    countryCode: 'ROK',
    revenue2024: 85,
    defenseRevenue2024: 22,
    employees: 13000,
    keyProducts: ['KSS-III 잠수함', 'KDX-III 이지스구축함', 'FFX 인천급 호위함', '기뢰'],
    exportMarkets: ['호주', '캐나다', '폴란드', '네덜란드'],
    stockSymbol: '042660.KS',
  },
  {
    id: 'c-usa-001',
    name: '록히드마틴',
    country: '미국',
    countryCode: 'USA',
    revenue2024: 714,
    defenseRevenue2024: 678,
    employees: 122000,
    keyProducts: ['F-35 라이트닝II', 'F-22 랩터', 'THAAD', 'PAC-3', 'HIMARS', 'C-130J'],
    exportMarkets: ['전 세계 45개국+'],
    stockSymbol: 'LMT',
  },
  {
    id: 'c-usa-002',
    name: '보잉 방위우주',
    country: '미국',
    countryCode: 'USA',
    revenue2024: 590,
    defenseRevenue2024: 295,
    employees: 170000,
    keyProducts: ['F-15EX', 'F/A-18E/F', 'AH-64E 아파치', 'CH-47F 치누크', 'KC-46A', 'P-8'],
    exportMarkets: ['한국', '일본', '인도', '사우디', '카타르'],
    stockSymbol: 'BA',
  },
  {
    id: 'c-usa-003',
    name: 'RTX (레이시온 테크놀로지스)',
    country: '미국',
    countryCode: 'USA',
    revenue2024: 786,
    defenseRevenue2024: 480,
    employees: 185000,
    keyProducts: ['SM-2/3/6 함대공미사일', 'Tomahawk TLAM', 'AMRAAM', 'AIM-9X', 'Stinger'],
    exportMarkets: ['한국', '일본', '사우디', 'NATO 전체'],
    stockSymbol: 'RTX',
  },
  {
    id: 'c-chn-001',
    name: 'AVIC (중국항공공업)',
    country: '중국',
    countryCode: 'CHINA',
    revenue2024: 850,
    defenseRevenue2024: 520,
    employees: 500000,
    keyProducts: ['J-20 스텔스', 'J-16', 'Y-20 수송기', 'JF-17 (파키스탄 합작)', 'WZ-7 UAV'],
    exportMarkets: ['파키스탄', '미얀마', '나이지리아', '방글라데시'],
  },
  {
    id: 'c-rus-001',
    name: '알마즈-안테이',
    country: '러시아',
    countryCode: 'RUSSIA',
    revenue2024: 95,
    defenseRevenue2024: 90,
    employees: 130000,
    keyProducts: ['S-400', 'S-500', 'Buk-M3', 'Tor-M2'],
    exportMarkets: ['중국', '인도', '터키 (제재 대상)', '이란'],
  },
]

// ──────────────────────────────────────────────────────────────────────────────
// 주요 방산 수출 계약 (2020~2026)
// ──────────────────────────────────────────────────────────────────────────────
export const EXPORT_DEALS: ExportDeal[] = [
  {
    id: 'deal-001',
    seller: '대한민국',
    buyer: '폴란드',
    item: 'K2 전차 1,000대 + K9 자주포 672문 + FA-50 48기 + 천무 288문',
    valueUsd: 145,
    quantity: '패키지',
    signedYear: 2022,
    deliveryYear: '2022~2030',
    status: 'CONTRACTED',
    category: '패키지 딜',
  },
  {
    id: 'deal-002',
    seller: '대한민국',
    buyer: 'UAE',
    item: '천궁-II 중거리 방공체계',
    valueUsd: 35,
    quantity: '다수 포대',
    signedYear: 2022,
    deliveryYear: '2023~2026',
    status: 'DELIVERED',
    category: '방공',
  },
  {
    id: 'deal-003',
    seller: '미국',
    buyer: '대만',
    item: 'F-16V 업그레이드 + AH-64E 아파치 + M1A2T 에이브람스',
    valueUsd: 80,
    quantity: 'F-16×66기 업그레이드',
    signedYear: 2020,
    deliveryYear: '2023~2026',
    status: 'CONTRACTED',
    category: '종합패키지',
  },
  {
    id: 'deal-004',
    seller: '미국',
    buyer: '일본',
    item: 'Tomahawk Block V TLAM',
    valueUsd: 23,
    quantity: '400발',
    signedYear: 2023,
    deliveryYear: '2025~2027',
    status: 'CONTRACTED',
    category: '순항미사일',
  },
  {
    id: 'deal-005',
    seller: '미국',
    buyer: '한국',
    item: 'SM-6 함대공·탄도탄 요격미사일',
    valueUsd: 9,
    quantity: '다수',
    signedYear: 2024,
    deliveryYear: '2026~2027',
    status: 'CONTRACTED',
    category: '방공',
  },
  {
    id: 'deal-006',
    seller: '대한민국',
    buyer: '호주',
    item: 'K9 자주포 24문 + K10 탄약운반차',
    valueUsd: 10,
    quantity: '24문',
    signedYear: 2024,
    deliveryYear: '2025~2027',
    status: 'CONTRACTED',
    category: '자주포',
  },
  {
    id: 'deal-007',
    seller: '대한민국',
    buyer: '사우디아라비아',
    item: '천궁-II 방공체계',
    valueUsd: 30,
    quantity: '협상 중',
    signedYear: 2025,
    deliveryYear: '2026~2028',
    status: 'NEGOTIATING',
    category: '방공',
  },
  {
    id: 'deal-008',
    seller: '미국',
    buyer: '이스라엘',
    item: 'F-35I 아디르 추가 + JDAM + SDB',
    valueUsd: 45,
    quantity: 'F-35 50기+',
    signedYear: 2024,
    deliveryYear: '2026~2029',
    status: 'CONTRACTED',
    category: '항공',
  },
  {
    id: 'deal-009',
    seller: '대한민국',
    buyer: '루마니아',
    item: 'K9 자주포 54문',
    valueUsd: 9,
    quantity: '54문',
    signedYear: 2024,
    deliveryYear: '2025~2027',
    status: 'CONTRACTED',
    category: '자주포',
  },
  {
    id: 'deal-010',
    seller: '대한민국',
    buyer: '노르웨이',
    item: 'K2 전차 54대',
    valueUsd: 15,
    quantity: '54대',
    signedYear: 2023,
    deliveryYear: '2025~2028',
    status: 'CONTRACTED',
    category: '기갑',
  },
]

// ──────────────────────────────────────────────────────────────────────────────
// 방산 예산 추이 (2015~2024, USD 억 달러)
// ──────────────────────────────────────────────────────────────────────────────
export const BUDGET_TREND: DefenseBudgetTrend[] = [
  { year: 2015, ROK: 360, DPRK: 35, USA: 5960, CHINA: 1460, RUSSIA: 660, JAPAN: 420 },
  { year: 2016, ROK: 374, DPRK: 35, USA: 6040, CHINA: 1530, RUSSIA: 590, JAPAN: 432 },
  { year: 2017, ROK: 390, DPRK: 36, USA: 6160, CHINA: 1640, RUSSIA: 556, JAPAN: 441 },
  { year: 2018, ROK: 410, DPRK: 37, USA: 6830, CHINA: 1750, RUSSIA: 614, JAPAN: 460 },
  { year: 2019, ROK: 432, DPRK: 37, USA: 7320, CHINA: 1790, RUSSIA: 650, JAPAN: 470 },
  { year: 2020, ROK: 450, DPRK: 38, USA: 7780, CHINA: 1930, RUSSIA: 617, JAPAN: 480 },
  { year: 2021, ROK: 473, DPRK: 38, USA: 8000, CHINA: 2080, RUSSIA: 659, JAPAN: 500 },
  { year: 2022, ROK: 503, DPRK: 39, USA: 8580, CHINA: 2230, RUSSIA: 860, JAPAN: 540 },
  { year: 2023, ROK: 548, DPRK: 39, USA: 8580, CHINA: 2250, RUSSIA: 1090, JAPAN: 694 },
  { year: 2024, ROK: 597, DPRK: 40, USA: 8860, CHINA: 2360, RUSSIA: 1090, JAPAN: 780 },
]

// ──────────────────────────────────────────────────────────────────────────────
// K-방산 수출 실적 추이 (USD 억 달러)
// ──────────────────────────────────────────────────────────────────────────────
export const K_DEFENSE_EXPORT: { year: number; value: number; highlight: string }[] = [
  { year: 2015, value: 35, highlight: '인도 K9 계약' },
  { year: 2016, value: 25, highlight: '인도네시아 KF-21 MOU' },
  { year: 2017, value: 31, highlight: '인도 K9 납품' },
  { year: 2018, value: 28, highlight: '핀란드 K9 계약' },
  { year: 2019, value: 32, highlight: '에스토니아 K9 계약' },
  { year: 2020, value: 30, highlight: 'COVID-19 영향' },
  { year: 2021, value: 72, highlight: '호주 K9 우선협상' },
  { year: 2022, value: 173, highlight: '폴란드 100억+ 달러 딜 체결' },
  { year: 2023, value: 135, highlight: '루마니아·노르웨이 K2·K9' },
  { year: 2024, value: 140, highlight: 'UAE 천궁-II 납품·호주 K9' },
]
