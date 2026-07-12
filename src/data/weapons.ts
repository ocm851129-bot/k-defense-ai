// Weapon system database — ROK · DPRK · Allied · Global reference systems
import { WEAPONS_WORLD } from './weaponsWorld'
import { WEAPONS_WIKI } from './weaponsWiki'
import { WEAPONS_GLOBAL } from './weaponsGlobal'
import { WEAPONS_SMALL_ARMS } from './weaponsSmallArms'
import { WEAPONS_ROK } from './weaponsROK'
import { WEAPONS_MAJOR_POWERS } from './weaponsMajorPowers'
import { WEAPONS_EXP_USA } from './weaponsExpandedUSA'
import { WEAPONS_EXP_RUSSIA } from './weaponsExpandedRussia'
import { WEAPONS_EXP_CHINA } from './weaponsExpandedChina'
import { WEAPONS_EXP_EUROPE } from './weaponsExpandedEurope'
import { WEAPONS_EXP_ASIA } from './weaponsExpandedAsia'
import { WEAPONS_EXP_ROK2 } from './weaponsExpandedROK2'
import { WEAPONS_EXP_WORLD2 } from './weaponsExpandedWorld2'
import { WEAPONS_EXP_USA3 } from './weaponsExpandedUSA3'
import { WEAPONS_EXP_NATO3 } from './weaponsExpandedNATO3'
import { WEAPONS_EXP_MENA } from './weaponsExpandedMENA'
import { WEAPONS_EXP_ASIA4 } from './weaponsExpandedAsia4'
import { WEAPONS_EXP_GLOBAL3 } from './weaponsExpandedGlobal3'
import { WEAPONS_EXP_NAVY3 } from './weaponsExpandedNavy3'
import { WEAPONS_EXP_MISSILES3 } from './weaponsExpandedMissiles3'
import { WEAPONS_BATCH1_ROK } from './weaponsBatch1_ROK'
import { WEAPONS_BATCH2_DPRK } from './weaponsBatch2_DPRK'
import { WEAPONS_BATCH3_USA2 } from './weaponsBatch3_USA2'
import { WEAPONS_BATCH4_RUSSIA2 } from './weaponsBatch4_Russia2'
import { WEAPONS_BATCH5_CHINA2 } from './weaponsBatch5_China2'
import { WEAPONS_BATCH6_EUROPE2 } from './weaponsBatch6_Europe2'
import { WEAPONS_BATCH7_ASIAPAC2 } from './weaponsBatch7_AsiaPac2'
import { WEAPONS_BATCH8_SMALLARMS2 } from './weaponsBatch8_SmallArms2'
import { WEAPONS_BATCH9_UAV_MISSILES } from './weaponsBatch9_UAV_Missiles'
import { WEAPONS_BATCH10_NAVAL_ARTILLERY } from './weaponsBatch10_Naval_Artillery'
import { WEAPONS_BATCH11_GROUND } from './weaponsBatch11_Ground'
import { WEAPONS_BATCH12_MISSILES2 } from './weaponsBatch12_Missiles2'
import { WEAPONS_BATCH13_AIRCRAFT2 } from './weaponsBatch13_Aircraft2'
import { WEAPONS_BATCH14_GLOBAL } from './weaponsBatch14_Global'
import { WEAPONS_BATCH15_COMPREHENSIVE } from './weaponsBatch15_Comprehensive'
import { WEAPONS_BATCH16_MENA_AFRICA } from './weaponsBatch16_MENA_Africa'
import { WEAPONS_BATCH17_HISTORICAL_MODERN } from './weaponsBatch17_HistoricalModern'
import { WEAPONS_BATCH18_ASIA3 } from './weaponsBatch18_Asia3'
import { WEAPONS_BATCH19_EUROPE3 } from './weaponsBatch19_Europe3'
import { WEAPONS_BATCH20_NAVAL_COMPLETE } from './weaponsBatch20_NavalComplete'
import { WEAPONS_BATCH21_ARTILLERY2 } from './weaponsBatch21_Artillery2'
import { WEAPONS_BATCH22_SMALLARMS3 } from './weaponsBatch22_SmallArms3'
import { WEAPONS_BATCH23_MISSILES3 } from './weaponsBatch23_Missiles3'
import { WEAPONS_BATCH24_ROK_MND } from './weaponsBatch24_ROK_MND'
import { WEAPONS_BATCH25_GLOBAL_AIRCRAFT } from './weaponsBatch25_GlobalAircraft'
import { WEAPONS_BATCH26_NAVAL_WORLD } from './weaponsBatch26_NavalWorld'
import { WEAPONS_BATCH27_MISSILES_SAM } from './weaponsBatch27_MissilesSAM'
import { WEAPONS_BATCH28_GROUND_FORCES } from './weaponsBatch28_GroundForces'
import { WEAPONS_BATCH29_ASIA_OCEANIA } from './weaponsBatch29_AsiaOceania'
import { WEAPONS_BATCH30_ME_AFRICA_LATAM } from './weaponsBatch30_MEAfricaLatAm'
import { WEAPONS_BATCH31_EW_CYBER_SPACE } from './weaponsBatch31_EWCyberSpace'
import { WEAPONS_BATCH32_HISTORICAL } from './weaponsBatch32_Historical'
import { WEAPONS_BATCH33_GLOBAL_EXPAND } from './weaponsBatch33_GlobalExpand'
import { WEAPONS_BATCH34_SMALL_ARMS_EXPAND } from './weaponsBatch34_SmallArmsExpand'
import { WEAPONS_BATCH35_FINAL_EXPAND } from './weaponsBatch35_FinalExpand'
import { WEAPONS_BATCH36_ROK_EXTRA } from './weaponsBatch36_ROK_Extra'
import { WEAPONS_BATCH37_USA_EXTRA } from './weaponsBatch37_USA_Extra'
import { WEAPONS_BATCH38_RUSSIA_EXTRA } from './weaponsBatch38_Russia_Extra'
import { WEAPONS_BATCH39_CHINA_EXTRA } from './weaponsBatch39_China_Extra'
import { WEAPONS_BATCH40_EUROPE_EXTRA } from './weaponsBatch40_Europe_Extra'
import { WEAPONS_BATCH41_ASIA_EXTRA } from './weaponsBatch41_Asia_Extra'
import { WEAPONS_BATCH42_MIDDLE_EAST } from './weaponsBatch42_MiddleEast'
import { WEAPONS_BATCH43_SMALL_ARMS2 } from './weaponsBatch43_SmallArms2'
import { WEAPONS_BATCH44_NAVAL_EXPAND2 } from './weaponsBatch44_NavalExpand2'
import { WEAPONS_BATCH45_MISSILES_EXPAND2 } from './weaponsBatch45_MissilesExpand2'
import { WEAPONS_BATCH46_AIR_EXPAND2 } from './weaponsBatch46_AirExpand2'
import { WEAPONS_BATCH47_GROUND_EXTRA } from './weaponsBatch47_GroundExtra'
import { WEAPONS_BATCH48_NAVAL_AIR } from './weaponsBatch48_NavalAir'
import { WEAPONS_BATCH49_GLOBAL_SMALL_ARMS } from './weaponsBatch49_GlobalSmallArms'
import { WEAPONS_BATCH50_DPRK_EXTRA } from './weaponsBatch50_DPRK_Extra'
import { WEAPONS_BATCH51_GLOBAL_MISC } from './weaponsBatch51_GlobalMisc'
import { WEAPONS_BATCH52_SPACE_NAVAL_MISC } from './weaponsBatch52_SpaceNavalMisc'
import { WEAPONS_BATCH53_UKRAINE_TAIWAN_ASIA } from './weaponsBatch53_UkraineTaiwanAsia'
import { WEAPONS_BATCH54_AIR_SUPPORT_ATGM } from './weaponsBatch54_AirSupportATGM'
import { WEAPONS_BATCH55_NAVAL_SAM_SMALLARMS } from './weaponsBatch55_NavalSAMSmallArms'
import { WEAPONS_BATCH56_NUCLEAR_COASTAL_AIR } from './weaponsBatch56_NuclearCoastalAir'
import { WEAPONS_BATCH57_AFRICA_CENTRAL_ASIA } from './weaponsBatch57_AfricaCentralAsia'
import { WEAPONS_BATCH58_COLDWAR_LEGACY } from './weaponsBatch58_ColdWarLegacy'
import { WEAPONS_BATCH59_SUBMARINES_MINES } from './weaponsBatch59_SubmarinesMines'
import { WEAPONS_BATCH60_LATEST_2026 } from './weaponsBatch60_Latest2026'
import { WEAPONS_BATCH61_TRAINING_LOGISTICS } from './weaponsBatch61_TrainingLogistics'
import { WEAPONS_BATCH62_MISSILES_GROUND_EXTRA } from './weaponsBatch62_MissilesGroundExtra'
import { WEAPONS_BATCH63_BALTIC_NORDIC_MISC } from './weaponsBatch63_BalticNordicMisc'
import { WEAPONS_BATCH64_CYBER_SPACE_MENA } from './weaponsBatch64_CyberSpaceMENA'
import { WEAPONS_BATCH65_RECON_RADAR_FUZE } from './weaponsBatch65_ReconRadarFuze'
import { WEAPONS_BATCH66_ARTILLERY_ARMOR_REGIONAL } from './weaponsBatch66_ArtilleryArmorRegional'
import { WEAPONS_BATCH67_CARRIERS_BOMBERS_PGM } from './weaponsBatch67_CarriersBombersPGM'
import { WEAPONS_BATCH68_HISTORICAL_NAVAL_FINAL } from './weaponsBatch68_HistoricalNavalFinal'
import { WEAPONS_BATCH69_SUPPORT_VIP_MARINE } from './weaponsBatch69_SupportVIPMarine'
import { WEAPONS_BATCH70_MULTINATIONAL_FINAL } from './weaponsBatch70_MultinationalFinal'
import { WEAPONS_BATCH71_FINAL_SWEEP1 } from './weaponsBatch71_FinalSweep1'
import { WEAPONS_BATCH72_FINAL_SWEEP2 } from './weaponsBatch72_FinalSweep2'
import { WEAPONS_BATCH73_FINAL_5000 } from './weaponsBatch73_Final5000'
import { WEAPONS_BATCH74_ROUND_OUT } from './weaponsBatch74_RoundOut'
import { WEAPONS_BATCH75_EXSOVIET_MISC } from './weaponsBatch75_ExSovietMisc'
import { WEAPONS_BATCH76_WORLD_NAVY_AIR_GROUND } from './weaponsBatch76_WorldNavyAirGround'
import { WEAPONS_BATCH77_MUNITIONS_SENSORS } from './weaponsBatch77_MunitionsSensors'

export type WeaponCategory =
  | 'ICBM' | 'IRBM' | 'SRBM' | 'CRUISE' | 'SLBM'
  | 'SAM' | 'AAM' | 'ASM' | 'SSM' | 'MISSILE'
  | 'AIRCRAFT' | 'HELICOPTER'
  | 'NAVAL' | 'SUBMARINE' | 'SHIP'
  | 'GROUND' | 'ARTILLERY' | 'MLRS'
  | 'UAV' | 'SATELLITE' | 'NUCLEAR' | 'CYBER'
  | 'PISTOL' | 'RIFLE' | 'SMG' | 'SNIPER' | 'MG' | 'SHOTGUN' | 'LAUNCHER'

export type WeaponOrigin =
  | 'ROK' | 'DPRK' | 'USA' | 'RUSSIA' | 'CHINA'
  | 'UK' | 'FRANCE' | 'GERMANY' | 'JAPAN' | 'INDIA'
  | 'ISRAEL' | 'TURKEY' | 'IRAN' | 'PAKISTAN' | 'TAIWAN'
  | 'AUSTRALIA' | 'SWEDEN' | 'UKRAINE' | 'NATO' | 'MULTI'
  | 'EGYPT' | 'INDONESIA' | 'SPAIN' | 'POLAND' | 'NORWAY'
  | 'BRAZIL' | 'SOUTH_AFRICA' | 'SINGAPORE' | 'THAILAND' | 'MALAYSIA'
  | 'CZECH' | 'NETHERLANDS' | 'BELGIUM' | 'GREECE' | 'FINLAND'
export type WeaponStatus = 'OPERATIONAL' | 'DEVELOPMENT' | 'TESTING' | 'SUSPECTED' | 'RETIRED'
export type ThreatRating = 'CRITICAL' | 'HIGH' | 'MED' | 'LOW'

export interface WeaponSpecs {
  range?: string
  speed?: string
  payload?: string
  length?: string
  weight?: string
  propulsion?: string
  guidance?: string
  ceiling?: string
  crew?: string
  displacement?: string
  armament?: string
  quantity?: string
  firstDeployed?: string
  manufacturer?: string
  warhead?: string
  accuracy?: string
  altitude?: string
  // 소화기 전용 스펙
  caliber?: string
  capacity?: string
  fireRate?: string
  penetration?: string
}

export interface WeaponSystem {
  id: string
  name: string
  nameEng: string
  designation?: string
  category: WeaponCategory
  origin: WeaponOrigin
  status: WeaponStatus
  threatRating: ThreatRating
  description: string
  detail: string
  specs: WeaponSpecs
  confidence: number
  lastUpdated: string
  relatedIntelIds: string[]
  tags: string[]
  sources: string[]
  imageUrl?: string
  wikiUrl?: string
}

export const CATEGORY_KO: Record<WeaponCategory, string> = {
  ICBM: '대륙간탄도미사일',
  IRBM: '중거리탄도미사일',
  SRBM: '단거리탄도미사일',
  CRUISE: '순항미사일',
  SLBM: '잠수함발사탄도미사일',
  SAM: '지대공미사일',
  AAM: '공대공미사일',
  ASM: '공대지·공대함미사일',
  SSM: '함대함미사일',
  AIRCRAFT: '전투기·공격기',
  HELICOPTER: '헬리콥터',
  NAVAL: '수상함',
  SUBMARINE: '잠수함',
  GROUND: '기갑·장갑',
  ARTILLERY: '자주포·야포',
  MLRS: '다연장로켓',
  UAV: '무인기',
  SATELLITE: '위성',
  NUCLEAR: '핵·WMD',
  CYBER: '사이버 무기',
  PISTOL: '권총',
  RIFLE: '소총·돌격소총',
  SMG: '기관단총',
  SNIPER: '저격소총',
  MG: '기관총',
  SHOTGUN: '산탄총',
  LAUNCHER: '유탄·로켓 발사기',
  MISSILE: '미사일',
  SHIP: '수상함',
}

export const CATEGORY_COLOR: Record<WeaponCategory, string> = {
  ICBM: '#ff2d55', IRBM: '#ff2d55', SRBM: '#ff6b35', SLBM: '#ff2d55',
  CRUISE: '#ff6b35', SAM: '#00d4ff', AAM: '#00d4ff', ASM: '#ffcc00',
  SSM: '#ffcc00', AIRCRAFT: '#00ff88', HELICOPTER: '#00ff88',
  NAVAL: '#00d4ff', SUBMARINE: '#4a9eff', GROUND: '#a8ff78',
  ARTILLERY: '#ffcc00', MLRS: '#ffcc00', UAV: '#c084fc',
  SATELLITE: '#00d4ff', NUCLEAR: '#ff2d55', CYBER: '#ff2d55',
  PISTOL: '#f472b6', RIFLE: '#86efac', SMG: '#a3e635',
  SNIPER: '#fbbf24', MG: '#fb923c', SHOTGUN: '#94a3b8', LAUNCHER: '#f87171',
  MISSILE: '#ff6b35', SHIP: '#00d4ff',
}

export const ORIGIN_COLOR: Record<WeaponOrigin, string> = {
  ROK: '#00ff88', DPRK: '#ff2d55', USA: '#00d4ff',
  RUSSIA: '#ff6b35', CHINA: '#ffcc00',
  UK: '#60a5fa', FRANCE: '#818cf8', GERMANY: '#94a3b8',
  JAPAN: '#f472b6', INDIA: '#fb923c', ISRAEL: '#a3e635',
  TURKEY: '#f87171', IRAN: '#4ade80', PAKISTAN: '#34d399',
  TAIWAN: '#38bdf8', AUSTRALIA: '#fbbf24', SWEDEN: '#c084fc',
  UKRAINE: '#fcd34d', NATO: '#00d4ff', MULTI: '#e2e8f0',
  EGYPT: '#d4a017', INDONESIA: '#cc0001', SPAIN: '#aa151b',
  POLAND: '#dc143c', NORWAY: '#ef2b2d', BRAZIL: '#009c3b',
  SOUTH_AFRICA: '#007a4d', SINGAPORE: '#ee2536', THAILAND: '#a51931',
  MALAYSIA: '#cc0001', CZECH: '#d7141a', NETHERLANDS: '#ae1c28',
  BELGIUM: '#fdda24', GREECE: '#0d5eaf', FINLAND: '#003580',
}

export const ORIGIN_KO: Record<WeaponOrigin, string> = {
  ROK: '대한민국', DPRK: '북한', USA: '미국',
  RUSSIA: '러시아', CHINA: '중국',
  UK: '영국', FRANCE: '프랑스', GERMANY: '독일',
  JAPAN: '일본', INDIA: '인도', ISRAEL: '이스라엘',
  TURKEY: '터키', IRAN: '이란', PAKISTAN: '파키스탄',
  TAIWAN: '대만', AUSTRALIA: '호주', SWEDEN: '스웨덴',
  UKRAINE: '우크라이나', NATO: 'NATO', MULTI: '다국',
  EGYPT: '이집트', INDONESIA: '인도네시아', SPAIN: '스페인',
  POLAND: '폴란드', NORWAY: '노르웨이', BRAZIL: '브라질',
  SOUTH_AFRICA: '남아프리카공화국', SINGAPORE: '싱가포르', THAILAND: '태국',
  MALAYSIA: '말레이시아', CZECH: '체코', NETHERLANDS: '네덜란드',
  BELGIUM: '벨기에', GREECE: '그리스', FINLAND: '핀란드',
}

export const STATUS_KO: Record<WeaponStatus, string> = {
  OPERATIONAL: '실전배치',
  DEVELOPMENT: '개발중',
  TESTING: '시험평가',
  SUSPECTED: '의심/추정',
  RETIRED: '퇴역',
}

export const STATUS_COLOR: Record<WeaponStatus, string> = {
  OPERATIONAL: '#00ff88',
  DEVELOPMENT: '#ffcc00',
  TESTING: '#00d4ff',
  SUSPECTED: '#ff6b35',
  RETIRED: '#4a7a9b',
}

export const THREAT_COLORS: Record<ThreatRating, string> = {
  CRITICAL: '#ff2d55',
  HIGH: '#ff6b35',
  MED: '#ffcc00',
  LOW: '#00ff88',
}

// ──────────────────────────────────────────────────────────────────────────────
// WEAPON DATABASE
// ──────────────────────────────────────────────────────────────────────────────
export const WEAPONS: WeaponSystem[] = [

  // ── 대한민국 탄도·순항미사일 ────────────────────────────────────────────────

  {
    id: 'w-rok-001',
    name: '현무-2A',
    nameEng: 'Hyunmoo-2A',
    designation: 'CTM-II',
    category: 'SRBM',
    origin: 'ROK',
    status: 'OPERATIONAL',
    threatRating: 'HIGH',
    description: '사거리 300km급 지대지 탄도미사일. 북한 전역 타격 가능.',
    detail: `## 현무-2A 단거리탄도미사일

한국형 독자 탄도미사일 현무 시리즈의 2세대 파생형. 1990년대 후반 개발 완료 후 실전 배치되었으며, 단거리 정밀타격 임무를 수행한다.

### 주요 특징
- 고폭·관통 복합 탄두 탑재 가능
- 이동식 발사대(TEL) 운용으로 생존성 확보
- GPS/INS 복합 유도방식으로 정밀도 향상
- 북한 전방 배치 기지 및 핵심 군사 목표 타격 임무

### 운용 현황
수도권 방어 및 전방 타격 임무에 육군 미사일 여단이 운용 중. 개량형 현무-2B/C로 단계적 교체 진행 중.`,
    specs: {
      range: '300km',
      payload: '500kg 고폭탄두',
      propulsion: '고체 추진',
      guidance: 'GPS+INS 복합 유도',
      accuracy: 'CEP 30m 이하',
      firstDeployed: '2009년',
      manufacturer: 'LIG넥스원',
    },
    confidence: 92,
    lastUpdated: '2026-06-01',
    relatedIntelIds: [],
    tags: ['탄도미사일', '지대지', '현무', '정밀타격'],
    sources: ['KIDA', '방위사업청', 'GlobalSecurity.org'],
  },

  {
    id: 'w-rok-002',
    name: '현무-2B',
    nameEng: 'Hyunmoo-2B',
    category: 'SRBM',
    origin: 'ROK',
    status: 'OPERATIONAL',
    threatRating: 'HIGH',
    description: '사거리 500km급 탄도미사일. 평양 이북 전역 타격 가능.',
    detail: `## 현무-2B 단거리탄도미사일

현무-2A의 사거리 연장형. 사거리 500km로 평양을 포함한 북한 주요 도시와 군사기지를 전방위 타격할 수 있다.

### 주요 특징
- 사거리 500km — 현무-2A 대비 67% 연장
- 탄두 중량 1톤급 고폭 또는 관통 탄두
- 개량된 INS+GPS 복합 유도로 정밀도 향상
- 이동식 발사차량(TEL) 운용

### 전략적 의미
미사일지침 개정 이전 최대 사거리 모델. 북한 핵심 지도부 벙커 타격을 위한 관통 탄두 개발이 병행됨.`,
    specs: {
      range: '500km',
      payload: '1,000kg',
      propulsion: '고체 추진',
      guidance: 'GPS+INS',
      accuracy: 'CEP 30m 이하',
      firstDeployed: '2012년',
      manufacturer: 'LIG넥스원',
    },
    confidence: 90,
    lastUpdated: '2026-06-01',
    relatedIntelIds: [],
    tags: ['탄도미사일', '지대지', '현무'],
    sources: ['방위사업청', 'KIDA'],
  },

  {
    id: 'w-rok-003',
    name: '현무-2C',
    nameEng: 'Hyunmoo-2C',
    category: 'SRBM',
    origin: 'ROK',
    status: 'OPERATIONAL',
    threatRating: 'HIGH',
    description: '사거리 800km급 탄도미사일. 미사일 지침 개정 후 사거리 대폭 연장.',
    detail: `## 현무-2C 단거리탄도미사일

2021년 한미 미사일 지침 완전 해제 이후 사거리를 800km까지 늘린 현무-2 계열 최신형. 북한 전역은 물론 주변국 위협에도 대응 가능한 사거리를 확보했다.

### 주요 특징
- 사거리 800km — 북한 전역 + 동북아 주요 목표 타격 가능
- 2톤급 대형 탄두 탑재 가능 (벙커버스터 포함)
- 마하 6~8의 고속 재진입으로 요격 회피 능력 향상
- 저고도 기동 능력으로 미사일 방어 돌파 가능

### 전략 억제력
한국형 3축 체계의 킬체인(Kill Chain)에서 핵심 타격 수단. 북한 지도부 및 핵·미사일 시설 정밀타격 임무 부여.`,
    specs: {
      range: '800km',
      payload: '2,000kg',
      propulsion: '고체 추진',
      guidance: 'GPS+INS+지형대조',
      accuracy: 'CEP 30m 이하',
      firstDeployed: '2022년',
      manufacturer: 'LIG넥스원',
    },
    confidence: 88,
    lastUpdated: '2026-06-01',
    relatedIntelIds: [],
    tags: ['탄도미사일', '지대지', '현무', '킬체인'],
    sources: ['방위사업청', '연합뉴스', 'CSIS'],
  },

  {
    id: 'w-rok-004',
    name: '현무-3C',
    nameEng: 'Hyunmoo-3C',
    designation: 'TAURUS 계열',
    category: 'CRUISE',
    origin: 'ROK',
    status: 'OPERATIONAL',
    threatRating: 'HIGH',
    description: '사거리 1,500km급 아음속 지대지 순항미사일. 정밀 종말 유도.',
    detail: `## 현무-3C 순항미사일

한국 독자 개발 순항미사일 시리즈의 최대 사거리형. 사거리 1,500km로 중국·러시아 극동 지역까지 타격 가능하다. 저고도 지형추적비행으로 레이더 탐지를 회피한다.

### 주요 특징
- 사거리 1,500km — 동아시아 전역 타격권
- 저고도 지형추적 비행 (고도 30~50m)
- DSMAC(디지털 장면 매칭) 종말 유도로 CEP 1~2m
- 지상 차량 및 수상함 발사 모두 지원

### 운용 형태
육군 미사일 여단, 해군 함정 발사형(해성-III 계열), 공군 공대지형(천룡) 개발이 병행됨.`,
    specs: {
      range: '1,500km',
      speed: '마하 0.8~0.9',
      payload: '500kg',
      length: '6.0m',
      propulsion: '터보팬 엔진',
      guidance: 'INS+GPS+DSMAC',
      accuracy: 'CEP 1~2m',
      firstDeployed: '2012년',
      manufacturer: '한화에어로스페이스',
    },
    confidence: 85,
    lastUpdated: '2026-05-15',
    relatedIntelIds: [],
    tags: ['순항미사일', '지대지', '현무', '장거리'],
    sources: ['방위사업청', 'IISS', 'CSIS Missile Defense Project'],
  },

  {
    id: 'w-rok-005',
    name: '현무-4',
    nameEng: 'Hyunmoo-4',
    category: 'SRBM',
    origin: 'ROK',
    status: 'OPERATIONAL',
    threatRating: 'HIGH',
    description: '2톤 초대형 고폭 탄두 탑재 전술 탄도미사일. 지하 벙커 파괴 특화.',
    detail: `## 현무-4 전술탄도미사일

북한 지하 벙커 및 핵심 지하시설 파괴에 특화된 탄도미사일. 2톤급 초대형 관통 탄두를 탑재해 콘크리트 수십 m를 관통할 수 있다.

### 주요 특징
- 탄두 중량 2톤 — 재래식 탄도미사일 최대급
- 관통형 탄두로 지하 60m 이상 벙커 파괴 가능
- 사거리 800km
- 2021년 국군의 날 열병식에서 최초 공개

### 전략적 역할
김정은 지도부 및 핵심 군사 지하시설에 대한 '참수 작전' 개념에서의 핵심 수단. 한국형 3축 체계 킬체인의 핵심 전력.`,
    specs: {
      range: '800km',
      payload: '2,000kg 관통 탄두',
      propulsion: '고체 추진',
      guidance: 'GPS+INS',
      firstDeployed: '2021년',
      manufacturer: '한화에어로스페이스',
    },
    confidence: 87,
    lastUpdated: '2026-06-01',
    relatedIntelIds: [],
    tags: ['탄도미사일', '벙커버스터', '대지하시설', '킬체인'],
    sources: ['방위사업청', '국방부', 'IISS Military Balance'],
  },

  {
    id: 'w-rok-006',
    name: '현무-5',
    nameEng: 'Hyunmoo-5',
    category: 'SRBM',
    origin: 'ROK',
    status: 'TESTING',
    threatRating: 'HIGH',
    description: '8~9톤 극초대형 탄두 탑재 탄도미사일. 핵급 파괴력의 재래식 무기.',
    detail: `## 현무-5 극초대형 탄두 탄도미사일

8~9톤에 달하는 초대형 탄두를 탑재한 탄도미사일로, 핵무기에 준하는 파괴력을 재래식으로 구현하는 것을 목표로 한다. 2023년 시험발사 성공.

### 주요 특징
- 탄두 중량 8~9톤 — 세계 최대급 재래식 탄두
- 직경 약 1.5m의 초대형 탄두
- 지하 100m 이상 시설 파괴 가능 추정
- 재래식 핵 억제력 개념 구현

### 개발 배경
북한의 전술핵 사용에 대한 비대칭 억제 수단. 핵무기를 사용하지 않고도 북한 핵심 지하시설을 파괴할 수 있는 재래식 수단 확보 목적.`,
    specs: {
      range: '수백 km 추정',
      payload: '8,000~9,000kg',
      propulsion: '고체 추진',
      guidance: 'GPS+INS',
      firstDeployed: '개발/시험 중',
      manufacturer: '한화에어로스페이스',
    },
    confidence: 75,
    lastUpdated: '2026-05-20',
    relatedIntelIds: [],
    tags: ['탄도미사일', '초대형탄두', '킬체인', '비핵억제'],
    sources: ['연합뉴스', 'CSIS', '국방부 발표'],
  },

  {
    id: 'w-rok-007',
    name: 'KTSSM-II',
    nameEng: 'Korea Tactical Surface-to-Surface Missile II',
    designation: 'KTSSM-II',
    category: 'SRBM',
    origin: 'ROK',
    status: 'DEVELOPMENT',
    threatRating: 'MED',
    description: '북한 장사정포 진지 정밀 타격 특화 한국형 전술 지대지 미사일.',
    detail: `## KTSSM-II 한국형 전술지대지미사일

수도권 위협의 핵심인 북한 장사정포 진지와 방사포 발사지점을 신속 정밀 타격하기 위해 개발 중인 전술 미사일. 발사 후 수 분 내 목표 타격이 가능한 빠른 반응 속도가 특징이다.

### 주요 특징
- 북한 장사정포(170mm 곡산, 240mm 방사포) 진지 타격 특화
- 사거리 120~180km 추정
- 전술 이동식 발사대에서 다연장 발사
- 열압력탄·관통탄 등 다목적 탄두

### 개발 현황
2020년대 중반 전력화 목표. 기존 K-239 천무와 연동하여 북한 장사정포 위협에 대한 대화력전 능력 확보.`,
    specs: {
      range: '120~180km 추정',
      payload: '500kg',
      propulsion: '고체 추진',
      guidance: 'GPS+INS',
      firstDeployed: '2026~2027년 예정',
      manufacturer: 'LIG넥스원',
    },
    confidence: 72,
    lastUpdated: '2026-04-10',
    relatedIntelIds: [],
    tags: ['전술미사일', '장사정포대응', '대화력전'],
    sources: ['방위사업청', 'KIDA'],
  },

  {
    id: 'w-rok-008',
    name: '해성-III',
    nameEng: 'Haeseong-III',
    category: 'SLBM',
    origin: 'ROK',
    status: 'OPERATIONAL',
    threatRating: 'HIGH',
    description: '잠수함 발사형 순항미사일. 도산안창호급 잠수함에 탑재.',
    detail: `## 해성-III 잠수함발사순항미사일

한국 최초의 잠수함 발사 순항미사일(SLCM). 도산안창호급(KSS-III) 잠수함의 수직발사관(VLS)에서 발사되며, 은밀한 제2격 능력을 한국에 부여한다.

### 주요 특징
- 사거리 1,000km 이상
- 수직발사관(VLS) 6기에서 발사
- 지형추적비행으로 레이더 회피
- 한국형 3축 체계 제2격 수단

### 전략적 의미
북한의 선제공격으로 지상 발사대가 제압되더라도 잠수함에서 보복 타격이 가능한 제2격 능력 확보. 핵억제 개념의 재래식 구현.`,
    specs: {
      range: '1,000km 이상',
      speed: '마하 0.8',
      propulsion: '터보팬',
      guidance: 'INS+GPS+DSMAC',
      firstDeployed: '2021년',
      manufacturer: 'LIG넥스원',
    },
    confidence: 83,
    lastUpdated: '2026-05-01',
    relatedIntelIds: [],
    tags: ['순항미사일', '잠수함발사', '제2격', '해성'],
    sources: ['방위사업청', 'IISS', '해군 발표'],
  },

  {
    id: 'w-rok-009',
    name: '천궁-II',
    nameEng: 'Cheongung-II (M-SAM2)',
    designation: 'KM-SAM Block-II',
    category: 'SAM',
    origin: 'ROK',
    status: 'OPERATIONAL',
    threatRating: 'LOW',
    description: '탄도미사일 요격 능력을 갖춘 한국형 중거리 지대공미사일.',
    detail: `## 천궁-II 중거리 지대공미사일

한국형 중거리 지대공미사일 체계. 탄도미사일 요격 능력을 갖추고 있으며, 사우디아라비아·UAE 등에 수출 성공하며 K-방산 대표 수출 품목이 됐다.

### 주요 특징
- 사거리 40km, 요격 고도 15~25km
- 탄도미사일(SRBM) 요격 가능
- 능동위상배열(AESA) 레이더 탑재
- 다중 표적 동시 교전 가능

### 수출 현황
- UAE: 2022년 4조원 규모 수출 계약
- 사우디아라비아: 협상 진행 중
- 폴란드: 구매 관심 표명`,
    specs: {
      range: '40km',
      altitude: '15~25km',
      guidance: '능동 레이더 시커',
      manufacturer: 'LIG넥스원 / 한화시스템',
      firstDeployed: '2020년',
      quantity: '다수 포대 운용 중',
    },
    confidence: 95,
    lastUpdated: '2026-06-10',
    relatedIntelIds: [],
    tags: ['지대공', '탄도탄요격', 'K-방산수출', 'M-SAM'],
    sources: ['방위사업청', 'UAE 국방부', 'KIDA'],
  },

  {
    id: 'w-rok-010',
    name: 'L-SAM',
    nameEng: 'Long-range Surface-to-Air Missile',
    designation: 'L-SAM',
    category: 'SAM',
    origin: 'ROK',
    status: 'DEVELOPMENT',
    threatRating: 'LOW',
    description: '사드급 요격 고도를 목표로 하는 한국형 장거리 지대공미사일.',
    detail: `## L-SAM 장거리지대공미사일

미국 사드(THAAD)에 준하는 요격 고도를 목표로 개발 중인 한국형 고고도 미사일방어체계. 사드 의존도를 줄이고 독자 방어 능력을 확보하는 것이 목표다.

### 주요 특징
- 요격 고도 50~60km 이상 (사드: 40~150km)
- 탄도미사일 종말단계 요격
- 한국형 미사일방어(KAMD) 상층 방어 담당
- 개량형 AESA 레이더 탑재

### 개발 일정
2020년대 후반 전력화 목표. 패트리어트(PAC-3), 천궁-II와 함께 중·고층 3단계 방어망 구성 예정.`,
    specs: {
      altitude: '50~60km 이상',
      guidance: '직격 요격(Hit-to-Kill)',
      manufacturer: 'LIG넥스원',
      firstDeployed: '2028년 이후 예정',
    },
    confidence: 70,
    lastUpdated: '2026-04-01',
    relatedIntelIds: [],
    tags: ['지대공', '고고도방어', 'KAMD', '미사일방어'],
    sources: ['방위사업청', 'KIDA', '국방부'],
  },

  // ── 대한민국 항공전력 ────────────────────────────────────────────────────────

  {
    id: 'w-rok-011',
    name: 'F-35A 라이트닝 II',
    nameEng: 'F-35A Lightning II',
    category: 'AIRCRAFT',
    origin: 'USA',
    status: 'OPERATIONAL',
    threatRating: 'LOW',
    description: '한국 공군 주력 스텔스 전투기. 40기 보유, 추가 도입 예정.',
    detail: `## F-35A 라이트닝 II (한국 공군)

미 록히드마틴이 개발한 5세대 스텔스 전투기. 한국 공군은 2021년부터 F-35A를 인수받아 현재 40기를 운용 중이다. 추가 20기 도입을 검토 중.

### 한국 공군 운용 현황
- 제17전투비행단 (청주 공군기지) 배치
- 북한 종심 타격 및 스텔스 침투 임무
- 공대지 정밀 타격 (JDAM, JSOW, SDB 등)
- 전자전 능력 — AN/APG-81 AESA 레이더

### 주요 임무
킬체인(Kill Chain)의 핵심 유인 타격 수단. 스텔스 특성을 활용한 종심 침투 정밀 타격 및 제공권 확보.`,
    specs: {
      range: '전투행동반경 1,100km',
      speed: '마하 1.6',
      ceiling: '18,300m',
      crew: '1명',
      armament: '25mm 기관포, AIM-120, AIM-9X, JDAM, SDB',
      manufacturer: '록히드마틴 (미국)',
      quantity: '40기 (추가 20기 도입 검토)',
      firstDeployed: '2021년 (한국)',
    },
    confidence: 98,
    lastUpdated: '2026-06-01',
    relatedIntelIds: [],
    tags: ['스텔스', '5세대', '전투기', '공군', '킬체인'],
    sources: ['한국 공군', '방위사업청', 'USAF'],
  },

  {
    id: 'w-rok-012',
    name: 'KF-21 보라매',
    nameEng: 'KF-21 Boramae',
    designation: 'KF-X',
    category: 'AIRCRAFT',
    origin: 'ROK',
    status: 'OPERATIONAL',
    threatRating: 'LOW',
    description: '한국형 4.5세대 전투기. 2026년 강릉기지 초도작전능력(IOC) 달성. 120기 양산 착수.',
    detail: `## KF-21 보라매

한국항공우주산업(KAI)이 개발한 한국 최초의 초음속 전투기. 4.5세대 전투기로 분류되며 스텔스 특성을 일부 갖췄다. 인도네시아가 공동 개발에 참여했다.

### 운용 현황 (2026년 6월)
- 2022년 7월 초도비행 성공
- **2026년 상반기 IOC(초도작전능력) 획득 완료** — 강릉기지 제17전투비행단 배치
- Block 1 양산 20기 진행 중
- 2032년까지 120기 국내 도입 계획

### 주요 특징
- 내부 무장창 없음 (Block 1/2, 외부 파일런)
- AN/APG-83 SABR AESA 레이더 탑재
- GE F414-GE-400K 엔진 ×2
- Block 3에서 내부 무장창·스텔스 특성 강화 예정

### 수출 전망
대당 약 800억원 수준으로 F-35 대비 경쟁력 있는 가격. 말레이시아·UAE·폴란드 수출 협상 진행 중.`,
    specs: {
      range: '전투행동반경 900km',
      speed: '마하 1.81',
      ceiling: '16,000m',
      crew: '1명 (복좌형 2명)',
      length: '16.9m',
      armament: '20mm 기관포, AIM-120C, 미티어, 천검-II, JDAM-ER',
      manufacturer: 'KAI (한국항공우주산업)',
      firstDeployed: '2026년 (강릉기지 IOC)',
      quantity: '20기 초도양산 / 120기 계획',
    },
    confidence: 97,
    lastUpdated: '2026-06-30',
    relatedIntelIds: [],
    tags: ['4.5세대', '전투기', '국산', 'KAI', 'KFX', 'IOC달성'],
    sources: ['KAI', '방위사업청', '공군', '연합뉴스'],
  },

  {
    id: 'w-rok-013',
    name: 'F-15K 슬램이글',
    nameEng: 'F-15K Slam Eagle',
    category: 'AIRCRAFT',
    origin: 'USA',
    status: 'OPERATIONAL',
    threatRating: 'LOW',
    description: '한국 공군 최강의 공중타격 플랫폼. 59기 운용. JASSM 탑재.',
    detail: `## F-15K 슬램이글 (한국 공군)

미국 F-15E 스트라이크이글의 한국 맞춤형 파생형. 강력한 공대지 타격 능력과 장거리 타격 능력을 갖춘 한국 공군의 핵심 다목적 전투기다.

### 주요 특징
- JASSM-ER(사거리 925km) 탑재 능력
- 현무-3/해성-II 등 한국형 무장 통합
- AN/APG-63(V)1 레이더
- 최대 탑재량 11,100kg

### 전략적 역할
장거리 정밀타격 임무 — 북한 지도부, 핵·미사일 시설 타격. JASSM-ER로 비행금지구역 진입 없이 종심 타격 가능.`,
    specs: {
      range: '전투행동반경 1,900km (증가연료탱크 장착 시)',
      speed: '마하 2.5',
      ceiling: '18,200m',
      crew: '2명',
      armament: '20mm 기관포, AIM-9X, AIM-120, JASSM-ER, JDAM, 현무-3',
      manufacturer: '보잉 (미국)',
      quantity: '59기',
      firstDeployed: '2005년 (한국)',
    },
    confidence: 97,
    lastUpdated: '2026-06-01',
    relatedIntelIds: [],
    tags: ['전투기', '장거리타격', 'JASSM', '공군'],
    sources: ['한국 공군', 'USAF', 'GlobalSecurity'],
  },

  {
    id: 'w-rok-014',
    name: 'AH-64E 아파치 가디언',
    nameEng: 'AH-64E Apache Guardian',
    category: 'HELICOPTER',
    origin: 'USA',
    status: 'OPERATIONAL',
    threatRating: 'LOW',
    description: '한국 육군 주력 공격헬기. 36기 운용. 전차 킬러.',
    detail: `## AH-64E 아파치 가디언 (한국 육군)

세계 최강의 공격헬기로 불리는 AH-64 아파치의 최신형. 한국 육군은 2016년부터 36기를 도입해 운용 중이다.

### 주요 특징
- AGM-114 헬파이어 미사일 최대 16발 탑재
- AN/APG-78 파이어컨트롤 레이더
- 적외선/주간 카메라 복합 사격통제시스템
- 특수작전 지원 및 장갑차 파괴 임무

### 대북 운용 개념
DMZ 근방 북한 기갑 돌파 시 반기갑 임무. 전차 대당 헬파이어 1발로 무력화 가능. 아파치 1기로 전차 최대 16대 파괴 가능.`,
    specs: {
      range: '전투행동반경 480km',
      speed: '295km/h',
      ceiling: '6,400m',
      crew: '2명',
      armament: '30mm M230 기관포, AGM-114 헬파이어×16, 하이드라 70 로켓',
      manufacturer: '보잉 (미국)',
      quantity: '36기',
      firstDeployed: '2016년 (한국)',
    },
    confidence: 98,
    lastUpdated: '2026-06-01',
    relatedIntelIds: [],
    tags: ['공격헬기', '반기갑', '아파치', '육군'],
    sources: ['한국 육군', '보잉', 'KIDA'],
  },

  // ── 대한민국 지상전력 ────────────────────────────────────────────────────────

  {
    id: 'w-rok-015',
    name: 'K2 흑표',
    nameEng: 'K2 Black Panther',
    category: 'GROUND',
    origin: 'ROK',
    status: 'OPERATIONAL',
    threatRating: 'LOW',
    description: '한국 독자 개발 3세대+ 주력전차. 세계 최고 수준의 성능.',
    detail: `## K2 흑표 주력전차

현대로템이 개발한 한국 독자 3세대+ 주력전차. 2014년 전력화 후 560여 대를 운용 중이다. 폴란드에 1,000대 수출 계약을 맺으며 K-방산 최대 수출 성공 사례가 됐다.

### 주요 특징
- 120mm 55구경장 활강포 (국산화)
- 자동장전장치로 분당 10발 발사
- 복합 반응장갑 + APS(능동방호시스템)
- 1,500마력 디젤 엔진, 자동변속기
- 최고속도 70km/h (도로), 48km/h (야지)

### 수출 성과
- 폴란드: 2022년 1,000대 계약 (약 19조원)
- 노르웨이, 루마니아 등 추가 수출 논의 중`,
    specs: {
      weight: '55톤',
      armament: '120mm 활강포, 12.7mm 기관총, 7.62mm 공축기관총',
      crew: '3명',
      speed: '70km/h (도로)',
      manufacturer: '현대로템',
      quantity: '560여 대 (2026년 기준)',
      firstDeployed: '2014년',
    },
    confidence: 99,
    lastUpdated: '2026-06-01',
    relatedIntelIds: [],
    tags: ['전차', 'K-방산', '3세대', '흑표', '수출'],
    sources: ['현대로템', '육군', 'IISS Military Balance'],
  },

  {
    id: 'w-rok-016',
    name: 'K9 천둥',
    nameEng: 'K9 Thunder',
    category: 'ARTILLERY',
    origin: 'ROK',
    status: 'OPERATIONAL',
    threatRating: 'LOW',
    description: '세계 최다 수출 자주포. 18개국 운용. 155mm/52구경.',
    detail: `## K9 천둥 자주곡사포

한화에어로스페이스가 개발한 155mm 자주곡사포. 세계에서 가장 많이 수출된 자주포로, 18개국 이상에서 운용 중이다.

### 주요 특징
- 155mm/52구경장 곡사포
- 사거리 40km (일반탄) / 54km (ERFB-BB탄)
- 분당 최대 6발 (3분간)
- 자동 사격통제 시스템
- 1,000마력 엔진

### 수출 현황 (주요)
인도, 폴란드, 핀란드, 노르웨이, 에스토니아, 호주, 이집트, 터키, 루마니아 등 18개국+`,
    specs: {
      armament: '155mm/52구경 곡사포',
      range: '54km (최대)',
      weight: '47톤',
      crew: '5명',
      speed: '67km/h',
      manufacturer: '한화에어로스페이스',
      quantity: '세계 1,800+대 운용',
      firstDeployed: '1999년 (한국)',
    },
    confidence: 99,
    lastUpdated: '2026-06-01',
    relatedIntelIds: [],
    tags: ['자주포', 'K-방산', '수출', '포병'],
    sources: ['한화에어로스페이스', 'IISS', 'GlobalSecurity'],
  },

  {
    id: 'w-rok-017',
    name: 'K239 천무',
    nameEng: 'K239 Chunmoo',
    category: 'MLRS',
    origin: 'ROK',
    status: 'OPERATIONAL',
    threatRating: 'LOW',
    description: '한국형 다연장로켓. 130mm~239mm·KTSSM 통합 발사 가능.',
    detail: `## K239 천무 다연장로켓

한화에어로스페이스가 개발한 한국형 다연장로켓. 다양한 구경의 로켓과 전술지대지미사일(KTSSM)을 통합 발사할 수 있는 모듈형 설계가 특징이다.

### 주요 특징
- 239mm 로켓 6발 (사거리 80km)
- 130mm 로켓 20발 (사거리 36km)
- KTSSM-I 연동 (사거리 80km)
- GPS+INS 정밀 유도
- 자동 사격통제 시스템

### 수출 현황
폴란드, UAE, 사우디아라비아 등에 수출. 폴란드는 K9과 함께 천무 288문 계약.`,
    specs: {
      range: '80km (239mm)',
      crew: '3명',
      manufacturer: '한화에어로스페이스',
      firstDeployed: '2015년',
      quantity: '다수 포대 운용',
    },
    confidence: 97,
    lastUpdated: '2026-06-01',
    relatedIntelIds: [],
    tags: ['다연장로켓', 'MLRS', 'K-방산', '천무'],
    sources: ['한화에어로스페이스', '육군', 'IISS'],
  },

  // ── 대한민국 해상전력 ────────────────────────────────────────────────────────

  {
    id: 'w-rok-018',
    name: '세종대왕급 이지스 구축함',
    nameEng: 'Sejong the Great-class (KDX-III)',
    designation: 'KDX-III',
    category: 'NAVAL',
    origin: 'ROK',
    status: 'OPERATIONAL',
    threatRating: 'LOW',
    description: '한국 해군 최강 이지스 구축함. AN/SPY-1D 레이더, 128셀 VLS.',
    detail: `## 세종대왕급 이지스 구축함 (KDX-III)

현대중공업이 건조한 한국 해군의 이지스 구축함. 미국 알레이버크급 이지스함과 동급의 능력을 갖춘 동아시아 최강 수준의 수상 전투함이다.

### 주요 특징
- AN/SPY-1D(V) 이지스 레이더 (1,000km 탐지)
- 128셀 Mk41 수직발사시스템(VLS)
- SM-2 Block IIIB 방공미사일
- SM-6 탄도탄 요격 미사일 (Batch II)
- 현무-3 순항미사일, 해성-III 탑재

### 보유 현황
- KDX-III: 세종대왕함, 율곡이이함, 서애류성룡함 (3척)
- KDX-III Batch II: 정조대왕함 (2023년 취역), 추가 2척 건조 중`,
    specs: {
      displacement: '11,000톤 (만재)',
      armament: '127mm 함포, 128셀 VLS (SM-2/SM-6/ASROC), 해성 함대함미사일, 어뢰',
      crew: '300명',
      speed: '30노트 이상',
      length: '165.9m',
      manufacturer: '현대중공업',
      quantity: '6척 (3+3, Batch I/II)',
      firstDeployed: '2008년 (세종대왕함)',
    },
    confidence: 99,
    lastUpdated: '2026-06-01',
    relatedIntelIds: [],
    tags: ['이지스', '구축함', '해군', 'KDX-III', 'BMD'],
    sources: ['해군', '현대중공업', 'IISS'],
  },

  {
    id: 'w-rok-019',
    name: '도산안창호급 잠수함',
    nameEng: 'Dosan Ahn Changho-class (KSS-III)',
    designation: 'KSS-III',
    category: 'SUBMARINE',
    origin: 'ROK',
    status: 'OPERATIONAL',
    threatRating: 'LOW',
    description: '한국 최초 3,000톤급 잠수함. 수직발사관(VLS) 탑재, 해성-III 운용.',
    detail: `## 도산안창호급 잠수함 (KSS-III)

대우조선해양(現 한화오션)이 건조한 한국 최초의 3,000톤급 중형 잠수함. 6기의 수직발사관(VLS)에서 해성-III 순항미사일을 발사할 수 있어 한국에 제2격(second strike) 능력을 부여한다.

### 주요 특징
- 수직발사관(VLS) 6기 — 해성-III 순항미사일 탑재
- 리튬이온 배터리(AIP) 탑재로 수중 지속력 향상
- 533mm 어뢰발사관 10문
- 중어뢰, 기뢰, 하푼 블록 II 탑재 가능

### 보유 현황
- Batch I: 도산안창호함 (2021), 안무함 (2023), 신채호함 (건조중)
- Batch II: 사거리/탑재량 향상형 3척 추가 계획`,
    specs: {
      displacement: '3,358톤 (수중)',
      armament: 'VLS 6셀 (해성-III), 어뢰발사관 10문, 하푼 블록II',
      crew: '50명',
      length: '83.5m',
      manufacturer: '한화오션 (前 대우조선해양)',
      quantity: '3척 (Batch I)',
      firstDeployed: '2021년 (도산안창호함)',
    },
    confidence: 97,
    lastUpdated: '2026-06-01',
    relatedIntelIds: ['w-rok-008'],
    tags: ['잠수함', '제2격', 'VLS', 'KSS-III', '해성-III'],
    sources: ['해군', '한화오션', 'IISS'],
  },

  // ── 지상 기갑·장갑 추가 전력 ────────────────────────────────────────────────

  {
    id: 'w-rok-021',
    name: 'K808 차륜형장갑차',
    nameEng: 'K808 Wheeled APC',
    category: 'GROUND',
    origin: 'ROK',
    status: 'OPERATIONAL',
    threatRating: 'LOW',
    description: '8×8 차륜형 보병수송장갑차. K21 IFV 보완·해외파병 전력. 한화에어로스페이스.',
    detail: `## K808 차륜형 장갑차

한화에어로스페이스(前 한화디펜스)가 개발한 8×8 차륜형 장갑차. 궤도형 K21 IFV보다 도로 기동성이 우수하고 해외 파병·후방 지역 임무에 적합하다.

### 주요 특징
- 8×8 전륜구동, 독립 현수장치
- 최대탑재 11명 (승무원 2+병사 9)
- 방호수준 STANAG 4569 Level 2 이상
- K6 12.7mm 중기관총 원격사격통제(RWS) 기본
- 수출형(자국명 K806 4×4 포함) 폴란드·UAE 수출 협상

### 운용 현황
2023년부터 육군 배치 시작. 해외파병부대 및 후방 지역 임무 전력으로 활용.`,
    specs: {
      weight: '21,000kg(전투중량)',
      length: '7.5m',
      crew: '2+9명',
      armament: 'K6 12.7mm RWS 또는 40mm 기관포 옵션',
      propulsion: '두산 D2840 300hp',
      speed: '100km/h(도로)',
      firstDeployed: '2023년',
      manufacturer: '한화에어로스페이스',
    },
    confidence: 90,
    lastUpdated: '2026-06-30',
    relatedIntelIds: [],
    tags: ['장갑차', '차륜형', 'APC', '한화', '해외파병'],
    sources: ['한화에어로스페이스', '방위사업청', 'Jane\'s'],
  },

  // ── 해상 추가 전력 ────────────────────────────────────────────────────────────

  {
    id: 'w-rok-022',
    name: 'AW159 와일드캣',
    nameEng: 'AgustaWestland AW159 Wildcat',
    category: 'HELICOPTER',
    origin: 'UK',
    status: 'OPERATIONAL',
    threatRating: 'LOW',
    description: '한국 해군 해상작전헬기 Mk.1. 세종대왕급·이지스함 탑재. 대잠·대함 임무.',
    detail: `## AW159 와일드캣 해상작전헬기 (한국 해군)

레오나르도(구 아구스타웨스트랜드)의 AW159를 기반으로 한국 해군이 도입한 해상작전헬기. 세종대왕급 이지스 구축함 및 인천급 호위함에 탑재돼 대잠·대함 임무를 수행한다.

### 주요 특징
- 최대 이륙중량 6,100kg, 최고 속도 291km/h
- SELEX ES-3100 능동/수동 소나, 디핑소나 탑재
- AGM-114 헬파이어·스팅레이 어뢰 운용
- 해상 탐색 레이더 및 FLIR/EO 탑재

### 운용 현황
한국 해군 8기 운용(2025년 기준). 세종대왕급 KDX-III Batch II 탑재 확대.`,
    specs: {
      weight: '6,100kg(최대이륙)',
      range: '750km',
      speed: '291km/h',
      crew: '2명+임무요원',
      armament: 'AGM-114 헬파이어·Mk.11 스팅레이 어뢰·M3M 12.7mm',
      propulsion: 'LHTEC CTS800-4N 1,361shp ×2',
      firstDeployed: '2015년(영국)/2017년(한국)',
      manufacturer: '레오나르도(이탈리아)',
      quantity: '8기(한국 해군)',
    },
    confidence: 88,
    lastUpdated: '2026-06-30',
    relatedIntelIds: [],
    tags: ['해상작전헬기', '대잠', '한국해군', 'AW159', '와일드캣'],
    sources: ['한국해군', 'Jane\'s', '레오나르도'],
  },

  {
    id: 'w-rok-023',
    name: 'FFX-III 전남함',
    nameEng: 'FFX-III Jeonnam-class Frigate',
    designation: 'FFX Batch III',
    category: 'NAVAL',
    origin: 'ROK',
    status: 'OPERATIONAL',
    threatRating: 'LOW',
    description: '한국 차기 호위함 3차 사업. 3,500톤급. VLS·천궁-II·해성·대잠 통합.',
    detail: `## FFX-III 차기호위함 (전남함급)

인천급(FFX-I/II) 후속으로 개발된 한국 차세대 호위함. 배수량 3,500톤급으로 이전 배치 대비 대폭 향상된 대잠·방공 능력을 갖췄다.

### 주요 특징
- 배수량 3,500톤 (FFX-II 2,800톤 대비 증가)
- 한국형 VLS(K-VLS) 16셀 — 해성·천궁-II 통합
- KSONAR-15 소나 탑재, 향상된 대잠 능력
- 능동위상배열(AESA) 레이더 탑재
- 무인수상정(USV)·무인수중정(UUV) 운용 지원

### 전력화 현황
전남함 2025년 취역, 2번함 이후 추가 건조 중. 6척 확보 계획.`,
    specs: {
      displacement: '3,500톤(만재)',
      length: '130m',
      crew: '140명',
      armament: '76mm 함포·K-VLS 16셀(해성/천궁-II)·청상어 경어뢰·해성-II 함대함',
      propulsion: 'CODOG 32,000마력',
      speed: '30노트',
      firstDeployed: '2025년(전남함)',
      manufacturer: '현대중공업',
      quantity: '6척 계획',
    },
    confidence: 87,
    lastUpdated: '2026-06-30',
    relatedIntelIds: [],
    tags: ['호위함', 'FFX', '차기호위함', '한국해군', 'VLS'],
    sources: ['한국해군', '방위사업청', '현대중공업'],
  },

  // ── 군 위성 ───────────────────────────────────────────────────────────────────

  {
    id: 'w-rok-020',
    name: '군 정찰위성 1호',
    nameEng: 'Military Reconnaissance Satellite No.1',
    category: 'SATELLITE',
    origin: 'ROK',
    status: 'OPERATIONAL',
    threatRating: 'LOW',
    description: '2023년 발사 한국 최초 군 전용 정찰위성. 스페이스X 팰컨9 발사.',
    detail: `## 군 정찰위성 1호

2023년 12월 스페이스X 팰컨9으로 발사한 한국 최초의 군 전용 정찰위성. 고해상도 전자광학(EO)·적외선(IR) 카메라를 탑재해 북한 핵·미사일 시설을 상시 감시한다.

### 주요 특징
- 해상도 30cm급 전자광학 카메라
- 적외선 감시로 야간·악천후 촬영 가능
- 저궤도 500km 전후 운용
- 5호기까지 발사 계획 (SAR 위성 포함)

### 전략적 의미
북한 핵·미사일 시설 독자 감시 능력 확보. 美 정보자산 의존도 감소. 한국형 3축 체계 '킬체인'의 표적 획득 수단.`,
    specs: {
      altitude: '500km 저궤도',
      guidance: 'EO/IR 광학 카메라',
      manufacturer: '한국항공우주연구원 / 민간 협력',
      firstDeployed: '2023년 12월',
      quantity: '1호기 운용 중 (5호기까지 계획)',
    },
    confidence: 92,
    lastUpdated: '2026-06-01',
    relatedIntelIds: [],
    tags: ['정찰위성', '우주', '킬체인', '감시'],
    sources: ['방위사업청', '스페이스X', '연합뉴스'],
  },

  {
    id: 'w-rok-020b',
    name: '군 정찰위성 2호 (SAR)',
    nameEng: 'Military Reconnaissance Satellite No.2 (SAR)',
    category: 'SATELLITE',
    origin: 'ROK',
    status: 'OPERATIONAL',
    threatRating: 'LOW',
    description: '2024년 발사 SAR(합성개구레이더) 위성. 구름·야간 관통 전천후 감시.',
    detail: `## 군 정찰위성 2호 (SAR)

2024년 발사한 한국 두 번째 군 전용 정찰위성. 1호기의 전자광학(EO) 방식과 달리 SAR(합성개구레이더)를 탑재해 구름, 야간, 악천후에도 지상 목표를 감시할 수 있다.

### 1호 EO 위성 대비 차별성
- SAR 레이더로 **날씨·야간·구름 무관** 전천후 촬영
- 지하 구조물 일부 탐지 가능
- 1호(EO)·2호(SAR) 교차 운용으로 감시 공백 최소화

### 전략적 의미
1~2호기 복합 운용으로 북한 핵·미사일 시설 24시간 감시 체계 구축. 미 정찰자산(KH-13 등) 의존도 감소. 3~5호기는 광학+SAR 혼합 구성 예정.`,
    specs: {
      altitude: '500km 저궤도',
      guidance: 'SAR 합성개구레이더',
      manufacturer: '한화시스템 / 한국항공우주연구원',
      firstDeployed: '2024년',
      quantity: '2호기 운용 중 (5호기까지 계획)',
    },
    confidence: 88,
    lastUpdated: '2026-06-30',
    relatedIntelIds: ['w-rok-020'],
    tags: ['정찰위성', 'SAR', '우주', '전천후감시', '킬체인'],
    sources: ['방위사업청', '한화시스템', '연합뉴스'],
  },

  // ══════════════════════════════════════════════════════════════════════════════
  // 북한 (DPRK)
  // ══════════════════════════════════════════════════════════════════════════════

  {
    id: 'w-dprk-001',
    name: '화성-17형',
    nameEng: 'Hwasong-17',
    designation: 'ICBM',
    category: 'ICBM',
    origin: 'DPRK',
    status: 'OPERATIONAL',
    threatRating: 'CRITICAL',
    description: '사거리 15,000km+ 액체추진 ICBM. 미국 전토 타격 가능. MIRV 추정.',
    detail: `## 화성-17형 대륙간탄도미사일

북한이 개발한 액체 추진 ICBM. 2022년 11월 완전 성공 시험발사 이후 실전 배치됐다. 미국 전역을 사정권에 두는 세계 최대급 이동식 ICBM이다.

### 제원 및 특징
- 사거리 15,000km 이상 — 미국 동부해안 타격 가능
- 다탄두 각개 유도 방식(MIRV) 탑재 추정
- 이동식 발사차량(TEL) 11축 운용 — 세계 최대
- 액체 연료로 발사 준비 시간이 길어 선제타격 취약점 있음

### 위협 평가
MIRV 탑재 시 미사일 방어망(MD) 돌파력 대폭 상승. 미 MD 체계를 포화시킬 수 있는 최초의 북한 ICBM으로 평가.`,
    specs: {
      range: '15,000km 이상',
      length: '약 24m',
      payload: '핵탄두 1~3기 (MIRV 추정)',
      propulsion: '액체 추진 2단',
      quantity: '다수 배치 (정확한 수량 미상)',
      firstDeployed: '2022년',
      warhead: '핵탄두 (추정 500~1,000kt)',
    },
    confidence: 88,
    lastUpdated: '2026-06-20',
    relatedIntelIds: ['i006', 'i013'],
    tags: ['ICBM', '핵', '미국위협', 'MIRV', '이동식'],
    sources: ['38North', 'CSIS Missile Defense Project', 'NTI', 'UN 전문가 패널'],
  },

  {
    id: 'w-dprk-002',
    name: '화성-18형',
    nameEng: 'Hwasong-18',
    designation: 'ICBM (고체)',
    category: 'ICBM',
    origin: 'DPRK',
    status: 'OPERATIONAL',
    threatRating: 'CRITICAL',
    description: '고체 추진 ICBM. 발사 준비 수십 분 — 선제 탐지·타격 극도로 어려움.',
    detail: `## 화성-18형 고체 추진 ICBM

2023년 4월 첫 시험발사에 성공한 북한 최초의 고체 추진 ICBM. 액체 추진 방식 대비 연료 주입 시간이 획기적으로 단축돼(수 시간 → 수십 분) 한국·미국의 킬체인 수행을 크게 어렵게 한다.

### 핵심 위협 — 고체 추진의 전략적 의미
- 연료 사전 충전 불필요 → **발사 직전까지 위성 감시에 포착 안 됨**
- TEL 이동 후 수십 분 내 발사 가능
- 분산 배치·은닉 용이 → 선제타격 목표 식별 어려움

### 기술 평가
러시아의 기술 지원 의혹. 북한이 러시아에 포탄·KN-23을 공급하고 고체 ICBM 기술을 받았을 가능성 (UN 전문가 패널 보고). 2026년 현재 이동식 발사대 7대 집결 포착.`,
    specs: {
      range: '15,000km 이상',
      length: '약 26m',
      payload: '핵탄두 (추정)',
      propulsion: '고체 추진 3단',
      quantity: '10기 이상 추정',
      firstDeployed: '2023년',
      warhead: '핵탄두 (추정)',
    },
    confidence: 85,
    lastUpdated: '2026-06-20',
    relatedIntelIds: ['i006', 'i013'],
    tags: ['ICBM', '고체추진', '핵', '킬체인회피', 'CRITICAL'],
    sources: ['38North', 'CSIS', 'NTI', '38North 위성영상 분석'],
  },

  {
    id: 'w-dprk-003',
    name: '화성-19형',
    nameEng: 'Hwasong-19',
    designation: 'ICBM',
    category: 'ICBM',
    origin: 'DPRK',
    status: 'SUSPECTED',
    threatRating: 'CRITICAL',
    description: '2024년 시험발사. 화성-18 후속 최신 고체 ICBM. 정보 제한적.',
    detail: `## 화성-19형 ICBM

2024년 시험발사 정보가 알려진 화성-18의 후속 고체 추진 ICBM. 사거리 및 제원이 화성-18보다 향상됐을 것으로 평가되나 정보가 제한적이다.

### 알려진 정보
- 2024년 시험발사 기록
- 화성-18 대비 개량형으로 추정
- 탄두 중량 또는 사거리 향상 추정

### 평가
북한의 ICBM 기술 고도화 속도가 예상보다 빠름. 매년 신형 ICBM을 개발·시험하는 패턴 지속.`,
    specs: {
      range: '15,000km+ 추정',
      propulsion: '고체 추진 (추정)',
      warhead: '핵탄두 (추정)',
      firstDeployed: '시험 단계',
    },
    confidence: 60,
    lastUpdated: '2026-05-01',
    relatedIntelIds: [],
    tags: ['ICBM', '핵', '신형', '추정'],
    sources: ['38North', 'CSIS', 'NTI'],
  },

  {
    id: 'w-dprk-003b',
    name: '화성-8형 극초음속',
    nameEng: 'Hwasong-8 Hypersonic Glide Vehicle',
    designation: 'HGV',
    category: 'IRBM',
    origin: 'DPRK',
    status: 'TESTING',
    threatRating: 'CRITICAL',
    description: '극초음속 활공체(HGV) 탑재 탄도미사일. 마하 10+, 기동 회피로 MD 돌파.',
    detail: `## 화성-8형 극초음속 활공체

2021년 첫 시험발사가 알려진 북한의 극초음속 활공체(Hypersonic Glide Vehicle) 탑재 미사일. 종말 단계에서 마하 10 이상의 속도로 수평 기동하여 기존 미사일방어(MD) 체계 돌파를 목표로 한다.

### 핵심 위협 — 극초음속 기동
- 마하 10 이상의 속도 + 종말 수평 기동
- 기존 SM-3·THAAD·패트리어트 PAC-3 요격 극히 어려움
- 탄두 분리 후 활공 단계 추적 불가
- 한·미 MD 체계의 구조적 취약점 노출

### 개발 현황 (2026년)
2021~2022년 연속 시험. 2025년 이후 실전 배치 근접 평가. 러시아 극초음속 기술(아방가르드·킨잘) 일부 기술 이전 의혹.`,
    specs: {
      range: '1,000km 이상 추정',
      speed: '마하 10+',
      payload: '핵탄두 탑재 추정',
      propulsion: '액체 추진 부스터 + 활공체',
      guidance: '관성+기동 활공',
      firstDeployed: '시험 단계 (2021년~)',
      warhead: '핵탄두 (추정)',
    },
    confidence: 65,
    lastUpdated: '2026-06-30',
    relatedIntelIds: ['w-dprk-002'],
    tags: ['극초음속', 'HGV', 'MD돌파', '기동탄두', 'CRITICAL'],
    sources: ['38North', 'CSIS', 'NTI', '합참'],
  },

  {
    id: 'w-dprk-004',
    name: '화성-12형',
    nameEng: 'Hwasong-12',
    designation: 'IRBM',
    category: 'IRBM',
    origin: 'DPRK',
    status: 'OPERATIONAL',
    threatRating: 'CRITICAL',
    description: '사거리 4,500km IRBM. 괌·하와이 타격 가능. 2017년 일본 상공 비행.',
    detail: `## 화성-12형 중거리탄도미사일

2017년 실전 배치된 단일 단계 중거리 탄도미사일. 2017년 8월과 9월 일본 홋카이도 상공을 통과하는 도발 비행으로 국제사회에 충격을 줬다.

### 주요 특징
- 사거리 4,500km — 괌(3,400km) 타격 가능
- 1단 액체 추진 (노동 미사일 파생)
- 핵탄두 탑재 가능
- 평균 고도 600~770km의 포물선 탄도

### 전략적 위협
주한미군 증원 경로인 괌 기지를 직접 타격할 수 있어 미군 전략예비대에 직접 위협. 2022년 이후 연속 시험발사 재개.`,
    specs: {
      range: '4,500km',
      payload: '핵탄두 추정',
      propulsion: '액체 추진 단단',
      firstDeployed: '2017년',
      warhead: '핵탄두 추정',
    },
    confidence: 90,
    lastUpdated: '2026-04-01',
    relatedIntelIds: [],
    tags: ['IRBM', '핵', '괌위협', '일본'],
    sources: ['38North', 'CSIS', 'UN 안보리'],
  },

  {
    id: 'w-dprk-005',
    name: 'KN-23',
    nameEng: 'KN-23',
    designation: 'SRBM',
    category: 'SRBM',
    origin: 'DPRK',
    status: 'OPERATIONAL',
    threatRating: 'HIGH',
    description: '러시아 이스칸데르 유사 단거리 탄도미사일. 변칙 궤도로 패트리어트 돌파.',
    detail: `## KN-23 단거리탄도미사일

러시아 이스칸데르-M을 모방한 것으로 추정되는 북한 최신 단거리 탄도미사일. 변칙 비행 궤도로 패트리어트 등 기존 방어체계를 회피하는 능력이 주목된다.

### 핵심 위협 — 변칙 비행 궤도
- 최고 고도 50km 이하로 저고도 비행
- 종말 단계에서 기동(풀업·핀 제어)으로 요격 회피
- 기존 패트리어트 PAC-3의 요격 가능 여부 불확실

### 러시아 수출
북한이 러시아에 KN-23을 대량 수출한 것으로 알려짐. 러-우크라이나 전쟁에서 실전 사용 중.`,
    specs: {
      range: '450~900km (사거리 연장형)',
      payload: '500kg 이상',
      propulsion: '고체 추진',
      guidance: '관성+GPS+종말유도',
      warhead: '재래식 또는 전술핵 추정',
      firstDeployed: '2019년',
    },
    confidence: 92,
    lastUpdated: '2026-06-10',
    relatedIntelIds: ['i009'],
    tags: ['SRBM', '변칙궤도', '요격회피', '이스칸데르', '러시아수출'],
    sources: ['38North', 'CSIS', 'NTI', 'IISS'],
  },

  {
    id: 'w-dprk-006',
    name: 'KN-24',
    nameEng: 'KN-24',
    designation: 'SRBM',
    category: 'SRBM',
    origin: 'DPRK',
    status: 'OPERATIONAL',
    threatRating: 'HIGH',
    description: '미국 ATACMS 유사 전술 탄도미사일. 주한미군 기지 정밀 타격 특화.',
    detail: `## KN-24 전술탄도미사일

미국의 ATACMS를 모방한 것으로 추정되는 북한 단거리 탄도미사일. 주한미군 기지, 공군기지, 항만 등 전략 목표를 정밀 타격하기 위한 무기로 평가된다.

### 주요 특징
- 사거리 400km — 남한 전역 타격 가능
- 정밀 유도로 오산, 군산, 부산 등 미군 기지 직접 타격
- 전술핵 탑재 가능성 (김정은 언급)
- 고체 추진으로 발사 준비 빠름

### 위협 시나리오
전쟁 개시와 동시에 KN-24로 주한미군 핵심 비행장과 항만을 타격해 미군 증원을 차단하는 A2/AD 전략.`,
    specs: {
      range: '400km',
      propulsion: '고체 추진',
      guidance: '관성+GPS',
      warhead: '재래식 또는 전술핵',
      firstDeployed: '2019년',
    },
    confidence: 88,
    lastUpdated: '2026-06-01',
    relatedIntelIds: [],
    tags: ['SRBM', '전술탄도미사일', '주한미군위협', 'A2AD'],
    sources: ['38North', 'CSIS', 'NTI'],
  },

  {
    id: 'w-dprk-007',
    name: '600mm 초대형방사포',
    nameEng: '600mm Super-Large MLRS',
    category: 'MLRS',
    origin: 'DPRK',
    status: 'OPERATIONAL',
    threatRating: 'CRITICAL',
    description: '탄도미사일 특성 가진 "방사포". 사거리 600km, 전술핵 탑재 확인.',
    detail: `## 600mm 초대형 방사포

북한이 "방사포"로 분류하지만 실질적으로 단거리 탄도미사일 특성을 가진 무기체계. UN 결의 위반 여부를 회피하기 위한 명칭으로 사용된 것으로 분석된다.

### 핵심 위협
- 사거리 600km — 남한 전역 + 일본 큐슈 일부 타격 가능
- **전술핵 탑재 공식 확인** (김정은 지도 하 핵 탑재 훈련)
- 변칙 비행 궤도로 방어 회피
- 이동식 발사대 다수 보유

### 위협 분류 재평가
UN·한국 당국은 이를 SRBM과 동등 위협으로 재분류. 사거리·탑재중량·유도 정밀도 모두 KN-23과 유사.`,
    specs: {
      range: '600km',
      payload: '전술핵 또는 고폭탄두',
      propulsion: '고체 추진',
      guidance: '관성+위성',
      firstDeployed: '2021년',
      warhead: '전술핵 탑재 확인',
    },
    confidence: 90,
    lastUpdated: '2026-06-15',
    relatedIntelIds: ['i006'],
    tags: ['방사포', '전술핵', '600mm', '변칙궤도', 'CRITICAL'],
    sources: ['38North', 'CSIS', 'NK News', 'KCNA'],
  },

  {
    id: 'w-dprk-008',
    name: '화살-2형',
    nameEng: 'Hwasal-2',
    category: 'CRUISE',
    origin: 'DPRK',
    status: 'OPERATIONAL',
    threatRating: 'HIGH',
    description: '전략 순항미사일. 사거리 2,000km. 핵탄두 탑재 가능.',
    detail: `## 화살-2형 전략 순항미사일

북한이 2023년 공개한 전략 순항미사일. 사거리 2,000km로 일본 전역과 괌에 근접하는 타격권을 가진다.

### 주요 특징
- 사거리 2,000km — 일본 전역 타격 가능
- 저고도 지형추적비행으로 레이더 탐지 회피
- 핵탄두 탑재 가능성 (북한 공식 발표)
- 함선·잠수함 발사 가능성

### 평가
기존 탄도미사일 방어망을 우회하는 새로운 위협. 한·미 미사일방어(MD)는 탄도미사일 요격에 최적화돼 있어 순항미사일 위협에 취약점 노출.`,
    specs: {
      range: '2,000km',
      propulsion: '터보팬 추정',
      guidance: '지형추적+관성',
      warhead: '핵탄두 추정',
      firstDeployed: '2023년',
    },
    confidence: 78,
    lastUpdated: '2026-05-01',
    relatedIntelIds: [],
    tags: ['순항미사일', '전략', '핵', '일본위협'],
    sources: ['38North', 'CSIS', 'KCNA'],
  },

  {
    id: 'w-dprk-009',
    name: '북극성-3형',
    nameEng: 'Pukguksong-3',
    designation: 'SLBM',
    category: 'SLBM',
    origin: 'DPRK',
    status: 'TESTING',
    threatRating: 'CRITICAL',
    description: '잠수함 발사 탄도미사일. 사거리 1,900km. 은밀 제2격 능력.',
    detail: `## 북극성-3형 잠수함발사탄도미사일

북한이 개발한 고체 추진 잠수함발사탄도미사일(SLBM). 신포급 잠수함에서 발사 가능하며, 은밀한 핵 공격 능력(제2격)을 북한에 부여할 수 있다.

### 주요 특징
- 사거리 1,900km — 일본 전역 타격 가능
- 고체 추진으로 발사 준비 신속
- 냉발사 방식(콜드런치) — 잠수함 내 가스 압력으로 발사 후 점화
- 핵탄두 탑재 가능

### 운반 플랫폼 문제
신포급 잠수함(1,500~2,000톤 추정)의 수중 작전 능력이 제한적이며 소음이 커 조기 탐지 위험이 있음. 그러나 신형 잠수함 건조 중.`,
    specs: {
      range: '1,900km',
      propulsion: '고체 추진',
      warhead: '핵탄두 추정',
      firstDeployed: '시험 단계 (2019년~)',
    },
    confidence: 80,
    lastUpdated: '2026-04-01',
    relatedIntelIds: [],
    tags: ['SLBM', '잠수함발사', '제2격', '핵', '북극성'],
    sources: ['38North', 'CSIS', 'NTI'],
  },

  {
    id: 'w-dprk-010',
    name: 'MiG-29 펄크럼',
    nameEng: 'MiG-29 Fulcrum',
    category: 'AIRCRAFT',
    origin: 'RUSSIA',
    status: 'OPERATIONAL',
    threatRating: 'MED',
    description: '북한 최정예 전투기. 40기 보유 추정. 유지·정비 한계 심각.',
    detail: `## MiG-29 펄크럼 (북한 공군)

소련제 4세대 전투기. 북한은 1980년대 말 소련에서 도입해 현재 30~40기를 운용 중인 것으로 추정된다. 가장 현대적인 북한 전투기이지만, 부품 부족으로 실질 가동률이 매우 낮다.

### 북한 운용 현황
- 추정 보유: 30~40기
- 주 배치: 순천 공군기지
- 부품 부족으로 실질 가동률 30% 이하 추정
- 조종사 비행 시간 극히 부족

### 위협 평가
한국 F-35A, F-15K와 1:1 교전에서 열세. 그러나 다수의 AN-2 저고도 침투기와 결합 시 수도권 방공에 부담 가능성.`,
    specs: {
      range: '전투행동반경 700km',
      speed: '마하 2.3',
      ceiling: '18,000m',
      crew: '1명',
      armament: '30mm 기관포, R-27·R-73 공대공미사일',
      quantity: '30~40기 (추정)',
      firstDeployed: '1988년 (북한)',
    },
    confidence: 70,
    lastUpdated: '2026-04-01',
    relatedIntelIds: [],
    tags: ['전투기', '북한공군', 'MiG', '소련제'],
    sources: ['38North', 'IISS Military Balance', 'GlobalSecurity'],
  },

  {
    id: 'w-dprk-011',
    name: 'IL-28 비글',
    nameEng: 'IL-28 Beagle',
    category: 'AIRCRAFT',
    origin: 'RUSSIA',
    status: 'OPERATIONAL',
    threatRating: 'HIGH',
    description: '우의주 기지 31대 집결 확인. 핵탄두 운반 가능 구형 폭격기.',
    detail: `## IL-28 비글 (북한 공군)

소련제 쌍발 제트 폭격기. 1950년대 기술이지만 북한은 이를 핵탄두 운반 수단으로 유지하고 있다. 2026년 38North 위성영상 분석에서 우의주 공군기지에 31대 집결이 확인됐다.

### 위협 포인트
- 핵탄두 운반 가능 폭격기로 활용 추정
- 사거리 2,400km — 남한 전역 + 일본 서부 타격 가능
- 활주로 2,500m → 2,800m 확장으로 이·착륙 안정성 향상
- 저속·저고도 비행으로 레이더 탐지 어렵지 않지만 요격 회피 전술 가능

### 38North 분석 (2026년)
우의주 기지 활주로 2,500m → 2,800m 확장 완료. MiG-29, IL-76 항공기도 수용 가능한 규모로 현대화.`,
    specs: {
      range: '전투행동반경 1,200km',
      speed: '800km/h',
      ceiling: '12,300m',
      crew: '3명',
      armament: '23mm 기관포, 핵/재래식 폭탄 최대 3,000kg',
      quantity: '31대 (우의주 기지 위성영상 확인)',
      firstDeployed: '1950년대 (북한 도입)',
    },
    confidence: 90,
    lastUpdated: '2026-06-20',
    relatedIntelIds: ['i001'],
    tags: ['폭격기', '핵운반', '우의주', 'IL-28', '북한공군'],
    sources: ['38North 위성영상', 'IISS Military Balance', 'GlobalSecurity'],
  },

  {
    id: 'w-dprk-012',
    name: '만리경-2호',
    nameEng: 'Malligyong-2',
    category: 'SATELLITE',
    origin: 'DPRK',
    status: 'OPERATIONAL',
    threatRating: 'HIGH',
    description: '해상도 0.5m급 정찰위성. 하루 16회 한반도 상공 통과. 주한미군 기지 촬영.',
    detail: `## 만리경-2호 정찰위성

북한이 2024년 발사한 2세대 정찰위성. 해상도 0.5m급의 광학 카메라를 탑재해 주한미군 기지, 한국 항공모함, 미사일 부대 등을 정기 촬영하는 것으로 분석된다.

### 주요 특징 (SOL-03 분석)
- 궤도 고도: 약 500km 저궤도
- 하루 한반도 통과 횟수: 16회
- 해상도: 0.5m급 — 차량·미사일 발사대 식별 가능
- 주한미군 주요 기지 정기 촬영 확인

### 위협적 활용
북한이 한국·미군의 전략 자산 움직임을 실시간 추적해 ICBM·전술핵 타격 좌표를 업데이트하는 데 사용 가능. 아울러 미 항공모함 전단 위치 파악에도 활용 가능.`,
    specs: {
      altitude: '약 500km 저궤도',
      guidance: '광학(EO) 카메라',
      quantity: '1호·2호 (2기 운용)',
      firstDeployed: '2024년 (만리경-2호)',
    },
    confidence: 87,
    lastUpdated: '2026-06-20',
    relatedIntelIds: ['i008'],
    tags: ['정찰위성', '북한', '만리경', '감시', '주한미군'],
    sources: ['38North', 'CSIS', 'SOL-03 분석', 'NTI'],
  },

  {
    id: 'w-dprk-013',
    name: '소형 무인기',
    nameEng: 'Small UAV',
    category: 'UAV',
    origin: 'DPRK',
    status: 'OPERATIONAL',
    threatRating: 'HIGH',
    description: '대량 보유 자폭·정찰 무인기. 2022년 수도권 침범 37회 확인.',
    detail: `## 북한 소형 무인기 전력

북한은 수천 대의 소형 무인기를 보유한 것으로 추정된다. 2022년 12월 수도권 침범 사건에서 정찰 목적의 무인기 5대가 서울 상공까지 진입해 충격을 줬다.

### 운용 형태
- **정찰형**: 고도 2~3km 비행, 카메라 탑재
- **자폭형**: 폭발물 탑재, 고가치 목표 자폭 공격
- **전파교란형**: GPS 재머 탑재, 아군 통신 교란

### 위협 현황 (SOL-04 분석)
- 소형 무인기 침범: 37회 (최근 12개월)
- 군 무인기 규모: 8회 포착
- 심야 활동: 74%

### 방어 한계
저고도·저속·소형으로 기존 방공체계 탐지 한계. 드론킬러 개발 시급.`,
    specs: {
      range: '500km 추정 (장거리형)',
      speed: '100~200km/h',
      payload: '폭발물 또는 카메라',
      quantity: '수천 대 추정',
    },
    confidence: 80,
    lastUpdated: '2026-06-10',
    relatedIntelIds: ['i010'],
    tags: ['무인기', 'UAV', '자폭', '정찰', '침범'],
    sources: ['합참', 'SOL-04', 'KIDA', '연합뉴스'],
  },

  {
    id: 'w-dprk-014',
    name: '170mm 곡산 자주포',
    nameEng: '170mm Koksan Self-Propelled Gun',
    category: 'ARTILLERY',
    origin: 'DPRK',
    status: 'OPERATIONAL',
    threatRating: 'HIGH',
    description: '사거리 54km 장사정포. 수도권 직접 위협. 300문+ 배치.',
    detail: `## 170mm 곡산 자주포

북한이 독자 개발한 세계 최대 구경 자주포 중 하나. 사거리 54km로 비무장지대(DMZ)에서 서울을 직접 타격할 수 있다. 수도권을 '불바다'로 만들 수 있는 심리적·물리적 위협 수단이다.

### 수도권 위협
- DMZ 기준 서울까지 직선거리: 40~60km
- 170mm 곡산 사거리 54km → **서울 중심부 직접 타격 가능**
- 300문 이상 전방 배치 추정
- 특수 로켓 보조 탄약으로 60~70km 가능

### 방어 대응
한국 육군 대화력전 개념: KTSSM·천무·공군 타격으로 발사 원점 격멸. 그러나 선제 발사 수십 분 내 서울에 수만 발 낙하 가능.`,
    specs: {
      range: '54km (최대)',
      armament: '170mm 자주포',
      quantity: '300문+ 추정',
      firstDeployed: '1970년대',
    },
    confidence: 85,
    lastUpdated: '2026-05-01',
    relatedIntelIds: [],
    tags: ['장사정포', '수도권위협', '포병', '곡산'],
    sources: ['KIDA', 'GlobalSecurity', 'IISS Military Balance'],
  },

  {
    id: 'w-dprk-015',
    name: '240mm 방사포',
    nameEng: '240mm Multiple Rocket Launcher',
    category: 'MLRS',
    origin: 'DPRK',
    status: 'OPERATIONAL',
    threatRating: 'HIGH',
    description: '사거리 65km 방사포. 수도권 대량 타격 수단. 200+ 문 전방 배치.',
    detail: `## 240mm 방사포

북한 전방 포병의 핵심 대량 화력 수단. 22연장 또는 12연장 발사관을 탑재해 수십 초 내에 대량 로켓을 발사할 수 있다.

### 주요 특징
- 사거리 65km — 서울 전역 타격 가능
- 22발 동시 발사 → 수십 초 내 대량 포격
- 화학탄, 산탄형 자탄, 일반 고폭탄두 탑재 가능
- 200문 이상 DMZ 인근 배치

### 수도권 위협 시나리오
개전 초기 240mm 방사포 집중 발사 시 단 수 분 내 서울 및 수도권에 수천 발의 로켓이 낙하할 수 있음. 민간 피해 및 조기 공황 유도 전술.`,
    specs: {
      range: '65km',
      armament: '240mm 로켓 12~22발',
      quantity: '200문+ (전방)',
      firstDeployed: '1980년대',
    },
    confidence: 88,
    lastUpdated: '2026-05-01',
    relatedIntelIds: [],
    tags: ['방사포', '수도권위협', 'MLRS', '대량화력'],
    sources: ['KIDA', 'GlobalSecurity', 'IISS'],
  },

  {
    id: 'w-dprk-016',
    name: '전술핵 탄두',
    nameEng: 'Tactical Nuclear Warhead',
    category: 'NUCLEAR',
    origin: 'DPRK',
    status: 'OPERATIONAL',
    threatRating: 'CRITICAL',
    description: '40~80기 핵탄두 보유 추정. 전술핵 소형화 공식 발표. 연 6~8기 추가 생산.',
    detail: `## 북한 핵탄두 전력

북한은 2006년부터 총 6회의 핵실험을 실시했으며, 현재 40~80기의 핵탄두를 보유한 것으로 추정된다. 고농축우라늄(HEU) 생산을 지속 확대하고 있어 핵탄두 수는 빠르게 증가할 것으로 전망된다.

### 핵탄두 현황
- 추정 보유 수: 40~80기 (기관별 상이)
- 연간 생산 능력: 6~8기 추정
- 소형화: KN-23, 600mm 방사포 등에 탑재 가능 크기로 소형화 완료 (북한 공식 발표)
- HEU 생산: 연변·강선 등 다수 시설에서 생산 중

### 전술핵 독트린
김정은은 전술핵 선제 사용 원칙을 법제화(2022년). 전시 초기 한·미 군사력 집결지 및 지휘부에 전술핵 선제 사용 가능성.`,
    specs: {
      quantity: '40~80기 추정 (2026년)',
      warhead: 'HEU/플루토늄 복합형',
      manufacturer: '핵무기연구소 (영변 등)',
      firstDeployed: '2006년 (첫 핵실험)',
    },
    confidence: 75,
    lastUpdated: '2026-06-20',
    relatedIntelIds: ['i014'],
    tags: ['핵', 'WMD', '전술핵', 'HEU', '소형화', 'CRITICAL'],
    sources: ['SIPRI', 'NTI', 'IAEA', '38North', '합참'],
  },

  {
    id: 'w-dprk-017',
    name: '라자루스 그룹 사이버 역량',
    nameEng: 'Lazarus Group Cyber Capability',
    category: 'CYBER',
    origin: 'DPRK',
    status: 'OPERATIONAL',
    threatRating: 'CRITICAL',
    description: '북한 국가지원 해킹 그룹. 공급망 침투·금융절도·WMD 자금 조달.',
    detail: `## 라자루스 그룹 (Lazarus Group)

북한 정찰총국 산하 국가 지원 사이버 공격 조직. 전 세계 금융기관, 암호화폐 거래소, 방산업체를 대상으로 대규모 사이버 공격을 감행해 WMD 개발 자금을 조달한다.

### 주요 공격 방식
- **스피어 피싱**: 방산·금융·IT 기업 직원 대상 맞춤형 피싱
- **공급망 공격**: 소프트웨어 업데이트 채널 감염
- **암호화폐 절도**: 2022년 이후 연간 5~10억 달러 절도 추정
- **Zero-Day 악용**: CVE-2025-44721 등 최신 취약점 즉각 악용

### 재정 규모
UN 전문가 패널 추산: 2017~2025년 누적 30억 달러 이상 절취. 이 자금이 북한 핵·미사일 개발에 직접 투입.`,
    specs: {
      manufacturer: '정찰총국 121국 (추정)',
      quantity: '해킹 인원 1,700~6,000명 추정',
    },
    confidence: 88,
    lastUpdated: '2026-06-20',
    relatedIntelIds: ['i007', 'i012', 'i015'],
    tags: ['사이버', '해킹', '라자루스', 'APT', '공급망', 'WMD자금'],
    sources: ['FBI', 'CISA', 'UN 전문가 패널', 'Mandiant'],
  },

  // ══════════════════════════════════════════════════════════════════════════════
  // 주변국 참조 전력
  // ══════════════════════════════════════════════════════════════════════════════

  {
    id: 'w-usa-001',
    name: 'THAAD',
    nameEng: 'Terminal High Altitude Area Defense',
    designation: 'AN/TPY-2',
    category: 'SAM',
    origin: 'USA',
    status: 'OPERATIONAL',
    threatRating: 'LOW',
    description: '경북 성주 배치 고고도 탄도탄 요격체계. 사드 레이더 탐지거리 1,800km.',
    detail: `## THAAD (사드) 주한미군 배치

록히드마틴이 개발한 고고도 미사일방어체계. 주한미군은 2017년 경북 성주에 1개 포대를 배치했다.

### 주요 제원
- 요격 고도 40~150km (중층·고층 방어)
- 직격 요격 방식(HIT-TO-KILL)
- AN/TPY-2 레이더: 탐지거리 1,800km — 중국 대부분 커버 가능
- 요격탄: 48발 (8연장 발사대 6기)

### 한반도 방어 역할
천궁-II(중층), 패트리어트(하층)와 함께 3단계 방어망 구성. ICBM의 하강 단계에서 요격.

### 중국 반발
중국은 AN/TPY-2 레이더의 중국 탐지 능력을 문제 삼아 강력 항의. 사드 배치로 한·중 관계 장기 갈등.`,
    specs: {
      altitude: '40~150km',
      range: '탐지 1,800km',
      guidance: '직격 요격(Hit-to-Kill)',
      manufacturer: '록히드마틴 (미국)',
      quantity: '1개 포대 (성주)',
      firstDeployed: '2017년 (성주)',
    },
    confidence: 99,
    lastUpdated: '2026-06-01',
    relatedIntelIds: [],
    tags: ['THAAD', '사드', '주한미군', '탄도탄방어', 'MD'],
    sources: ['USFK', '록히드마틴', '방위부'],
  },

  {
    id: 'w-usa-002',
    name: 'B-52H 스트라토포트리스',
    nameEng: 'B-52H Stratofortress',
    category: 'AIRCRAFT',
    origin: 'USA',
    status: 'OPERATIONAL',
    threatRating: 'LOW',
    description: '전략폭격기. 핵·재래식 겸용. 한반도 전개 시 대북 전략 메시지 발신.',
    detail: `## B-52H 스트라토포트리스 (한반도 전개)

미 공군 전략폭격기. 핵 및 재래식 임무 겸용으로 한반도 위기 시 '확장억제' 신호 발신을 위해 정기 전개된다.

### 한반도 전개 의미
- 핵탄두 탑재 B61 중력폭탄 및 AGM-86 ALCM 운반 능력
- 전개 자체가 대북 핵 억제 메시지
- BUFF(Big Ugly Fat Fellow) — 핵전력 상징
- 한·미 연합훈련 시 정기 전개

### 제원 (B-52H)
- 사거리 16,000km (무급유)
- 탑재량 31,750kg
- AGM-86B 핵 순항미사일 20발 탑재 가능`,
    specs: {
      range: '16,000km (무급유)',
      speed: '1,000km/h',
      ceiling: '15,000m',
      crew: '5명',
      armament: 'AGM-86 ALCM, B61 핵폭탄, JDAM, JSOW',
      manufacturer: '보잉 (미국)',
    },
    confidence: 99,
    lastUpdated: '2026-06-01',
    relatedIntelIds: [],
    tags: ['전략폭격기', '미국', '핵억제', '확장억제', 'B-52'],
    sources: ['USAF', '국방부'],
  },

  {
    id: 'w-chn-001',
    name: 'DF-41',
    nameEng: 'Dongfeng-41',
    designation: 'CSS-X-20',
    category: 'ICBM',
    origin: 'CHINA',
    status: 'OPERATIONAL',
    threatRating: 'HIGH',
    description: '중국 최강 ICBM. MIRV 10기 탑재. 사거리 12,000~15,000km.',
    detail: `## DF-41 동풍-41 ICBM

중국이 개발한 고체 추진 ICBM. 최대 10기의 MIRV 핵탄두를 탑재해 미국 전역을 타격할 수 있다.

### 주요 특징
- 사거리 12,000~15,000km
- MIRV 최대 10기 탑재
- 이동식 발사대(TEL) 및 사일로 이중 배치
- 발사 준비 시간 단축으로 생존성 향상

### 한반도 관련성
중국의 DF-41 전력 확충은 미국의 확장억제 신뢰성에 영향. 중국이 북한 문제에서 한·미의 압박 수단을 제한하는 배경 전력.`,
    specs: {
      range: '12,000~15,000km',
      payload: 'MIRV 최대 10기',
      propulsion: '고체 추진 3단',
      firstDeployed: '2017년',
    },
    confidence: 82,
    lastUpdated: '2026-05-01',
    relatedIntelIds: [],
    tags: ['ICBM', '중국', 'MIRV', 'DF-41'],
    sources: ['IISS', 'CSIS', 'NTI'],
  },
  ...WEAPONS_WORLD,
  ...WEAPONS_WIKI,
  ...WEAPONS_GLOBAL,
  ...WEAPONS_SMALL_ARMS,
  ...WEAPONS_ROK,
  ...WEAPONS_MAJOR_POWERS,
  ...WEAPONS_EXP_USA,
  ...WEAPONS_EXP_RUSSIA,
  ...WEAPONS_EXP_CHINA,
  ...WEAPONS_EXP_EUROPE,
  ...WEAPONS_EXP_ASIA,
  ...WEAPONS_EXP_ROK2,
  ...WEAPONS_EXP_WORLD2,
  ...WEAPONS_EXP_USA3,
  ...WEAPONS_EXP_NATO3,
  ...WEAPONS_EXP_MENA,
  ...WEAPONS_EXP_ASIA4,
  ...WEAPONS_EXP_GLOBAL3,
  ...WEAPONS_EXP_NAVY3,
  ...WEAPONS_EXP_MISSILES3,
  ...WEAPONS_BATCH1_ROK,
  ...WEAPONS_BATCH2_DPRK,
  ...WEAPONS_BATCH3_USA2,
  ...WEAPONS_BATCH4_RUSSIA2,
  ...WEAPONS_BATCH5_CHINA2,
  ...WEAPONS_BATCH6_EUROPE2,
  ...WEAPONS_BATCH7_ASIAPAC2,
  ...WEAPONS_BATCH8_SMALLARMS2,
  ...WEAPONS_BATCH9_UAV_MISSILES,
  ...WEAPONS_BATCH10_NAVAL_ARTILLERY,
  ...WEAPONS_BATCH11_GROUND,
  ...WEAPONS_BATCH12_MISSILES2,
  ...WEAPONS_BATCH13_AIRCRAFT2,
  ...WEAPONS_BATCH14_GLOBAL,
  ...WEAPONS_BATCH15_COMPREHENSIVE,
  ...WEAPONS_BATCH16_MENA_AFRICA,
  ...WEAPONS_BATCH17_HISTORICAL_MODERN,
  ...WEAPONS_BATCH18_ASIA3,
  ...WEAPONS_BATCH19_EUROPE3,
  ...WEAPONS_BATCH20_NAVAL_COMPLETE,
  ...WEAPONS_BATCH21_ARTILLERY2,
  ...WEAPONS_BATCH22_SMALLARMS3,
  ...WEAPONS_BATCH23_MISSILES3,
  ...WEAPONS_BATCH24_ROK_MND,
  ...WEAPONS_BATCH25_GLOBAL_AIRCRAFT,
  ...WEAPONS_BATCH26_NAVAL_WORLD,
  ...WEAPONS_BATCH27_MISSILES_SAM,
  ...WEAPONS_BATCH28_GROUND_FORCES,
  ...WEAPONS_BATCH29_ASIA_OCEANIA,
  ...WEAPONS_BATCH30_ME_AFRICA_LATAM,
  ...WEAPONS_BATCH31_EW_CYBER_SPACE,
  ...WEAPONS_BATCH32_HISTORICAL,
  ...WEAPONS_BATCH33_GLOBAL_EXPAND,
  ...WEAPONS_BATCH34_SMALL_ARMS_EXPAND,
  ...WEAPONS_BATCH35_FINAL_EXPAND,
  ...WEAPONS_BATCH36_ROK_EXTRA,
  ...WEAPONS_BATCH37_USA_EXTRA,
  ...WEAPONS_BATCH38_RUSSIA_EXTRA,
  ...WEAPONS_BATCH39_CHINA_EXTRA,
  ...WEAPONS_BATCH40_EUROPE_EXTRA,
  ...WEAPONS_BATCH41_ASIA_EXTRA,
  ...WEAPONS_BATCH42_MIDDLE_EAST,
  ...WEAPONS_BATCH43_SMALL_ARMS2,
  ...WEAPONS_BATCH44_NAVAL_EXPAND2,
  ...WEAPONS_BATCH45_MISSILES_EXPAND2,
  ...WEAPONS_BATCH46_AIR_EXPAND2,
  ...WEAPONS_BATCH47_GROUND_EXTRA,
  ...WEAPONS_BATCH48_NAVAL_AIR,
  ...WEAPONS_BATCH49_GLOBAL_SMALL_ARMS,
  ...WEAPONS_BATCH50_DPRK_EXTRA,
  ...WEAPONS_BATCH51_GLOBAL_MISC,
  ...WEAPONS_BATCH52_SPACE_NAVAL_MISC,
  ...WEAPONS_BATCH53_UKRAINE_TAIWAN_ASIA,
  ...WEAPONS_BATCH54_AIR_SUPPORT_ATGM,
  ...WEAPONS_BATCH55_NAVAL_SAM_SMALLARMS,
  ...WEAPONS_BATCH56_NUCLEAR_COASTAL_AIR,
  ...WEAPONS_BATCH57_AFRICA_CENTRAL_ASIA,
  ...WEAPONS_BATCH58_COLDWAR_LEGACY,
  ...WEAPONS_BATCH59_SUBMARINES_MINES,
  ...WEAPONS_BATCH60_LATEST_2026,
  ...WEAPONS_BATCH61_TRAINING_LOGISTICS,
  ...WEAPONS_BATCH62_MISSILES_GROUND_EXTRA,
  ...WEAPONS_BATCH63_BALTIC_NORDIC_MISC,
  ...WEAPONS_BATCH64_CYBER_SPACE_MENA,
  ...WEAPONS_BATCH65_RECON_RADAR_FUZE,
  ...WEAPONS_BATCH66_ARTILLERY_ARMOR_REGIONAL,
  ...WEAPONS_BATCH67_CARRIERS_BOMBERS_PGM,
  ...WEAPONS_BATCH68_HISTORICAL_NAVAL_FINAL,
  ...WEAPONS_BATCH69_SUPPORT_VIP_MARINE,
  ...WEAPONS_BATCH70_MULTINATIONAL_FINAL,
  ...WEAPONS_BATCH71_FINAL_SWEEP1,
  ...WEAPONS_BATCH72_FINAL_SWEEP2,
  ...WEAPONS_BATCH73_FINAL_5000,
  ...WEAPONS_BATCH74_ROUND_OUT,
  ...WEAPONS_BATCH75_EXSOVIET_MISC,
  ...WEAPONS_BATCH76_WORLD_NAVY_AIR_GROUND,
  ...WEAPONS_BATCH77_MUNITIONS_SENSORS,
]
