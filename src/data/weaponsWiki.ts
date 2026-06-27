// ══════════════════════════════════════════════════════════════════════════════
// 위키백과·SIPRI·CSIS 기반 전세계 무기 데이터베이스 (2025~2026 기준)
// 출처: Wikipedia, CSIS Missile Threat, SIPRI, Jane's Defence
// ══════════════════════════════════════════════════════════════════════════════
import type { WeaponSystem } from './weapons'

export const WEAPONS_WIKI: WeaponSystem[] = [

  // ════════════════════════════════════════════════════════
  // 대한민국 (ROK) — Wikipedia 기반 업데이트
  // ════════════════════════════════════════════════════════

  {
    id:'w-rok-w01', name:'KF-21 보라매', nameEng:'KAI KF-21 Boramae', designation:'KF-21',
    category:'AIRCRAFT', origin:'ROK', status:'DEVELOPMENT', threatRating:'HIGH',
    description:'한국 최초 국산 4.5세대 전투기. 2026년 9월 실전배치 예정. 한국항공우주산업(KAI) 개발.',
    detail:`## KAI KF-21 보라매\n\n한국이 독자 개발한 쌍발 초음속 다목적 전투기. 전남 사천 KAI 공장에서 양산 중이며 강릉기지 배치 예정.\n\n### 주요 제원 (Wikipedia)\n- 최고속도: 마하 1.8 이상 (2024년 5월 시험 달성)\n- AESA 레이더: 한화시스템 APY-016K (탐지거리 150~200km)\n- 엔진: GE F414-GE-400K ×2\n- 무장: Meteor AAM, IRIS-T, AIM-120, KALCM 천룡\n- 외부 하드포인트 10개, 탑재량 7,700kg\n\n### 운용 현황 (2026)\n- Block I 40대 발주, 양산 2024년 7월 시작\n- 2026년 9월 강릉기지 최초 배치 계획\n- Block III: 스텔스 다목적 전투기로 발전 예정`,
    specs:{ range:'1,000km(전투행동반경)', speed:'마하 1.8+', payload:'7,700kg', length:'16.9m', weight:'11,000kg', propulsion:'GE F414-GE-400K ×2(각 22,000파운드)', guidance:'APY-016K AESA레이더', ceiling:'12,192m+', crew:'1~2명', firstDeployed:'2026년 9월(예정)', manufacturer:'한국항공우주산업(KAI)', armament:'Meteor/IRIS-T/AIM-120/KALCM 천룡/GBU-12' },
    confidence:92, lastUpdated:'2026-06-27', relatedIntelIds:[], tags:['KF-21','보라매','국산전투기','4.5세대','KAI'], sources:['Wikipedia','KAI','ROKAF'],
  },
  {
    id:'w-rok-w02', name:'현무-2C', nameEng:'Hyunmoo-2C SRBM',
    category:'SRBM', origin:'ROK', status:'OPERATIONAL', threatRating:'HIGH',
    description:'사거리 800km, CEP 1~5m 초정밀 단거리 탄도미사일. 북한 전역 타격 가능.',
    detail:`## 현무-2C\n\n한국 국방과학연구소(ADD)가 개발한 단거리 탄도미사일 계열 최신형. 탄두 중량이 줄었지만 사거리와 정확도가 대폭 향상됐다.\n\n### 주요 제원 (Wikipedia 기반)\n- 사거리: 800km\n- 탄두 중량: 500kg\n- CEP(원형오차): 1~5m\n- 추진: 고체로켓\n- 유도: 말단단계 정밀유도\n\n### 전략적 의미\nCEP 1~5m는 세계 최고 수준의 탄도미사일 정밀도. 북한 지휘소·벙커 정밀타격 가능.`,
    specs:{ range:'800km', payload:'500kg 탄두', propulsion:'고체로켓', guidance:'말단단계 정밀유도', accuracy:'CEP 1~5m', firstDeployed:'2017년', manufacturer:'한화·LIG넥스원' },
    confidence:95, lastUpdated:'2026-06-27', relatedIntelIds:[], tags:['현무','탄도미사일','정밀타격','SRBM'], sources:['Wikipedia','ADD'],
  },
  {
    id:'w-rok-w03', name:'현무-3C', nameEng:'Hyunmoo-3C Cruise Missile',
    category:'CRUISE', origin:'ROK', status:'OPERATIONAL', threatRating:'HIGH',
    description:'사거리 1,500km 국산 순항미사일. 지형추적 비행으로 북한 전역 + 주변국 타격.',
    detail:`## 현무-3C 순항미사일\n\n한국이 독자 개발한 아음속 지형추적 순항미사일 계열의 최장거리 버전.\n\n### 주요 제원\n- 사거리: 1,500km\n- 탄두: 500kg\n- 추진: 터보팬 엔진\n- 유도: 지형추적(TRN)+GPS+INS\n- 비행 고도: 저고도(10~30m) 지형추적\n\n### 운용 현황\n2012년 배치. 지상·함정·항공기 발사 가능. 현무-3D(3,000km) 개발 중.`,
    specs:{ range:'1,500km', payload:'500kg', propulsion:'터보팬', guidance:'지형추적+GPS+INS', firstDeployed:'2012년', manufacturer:'한화에어로스페이스' },
    confidence:92, lastUpdated:'2026-06-27', relatedIntelIds:[], tags:['현무-3C','순항미사일','1500km'], sources:['Wikipedia','CSIS'],
  },
  {
    id:'w-rok-w04', name:'현무-4', nameEng:'Hyunmoo-4 Ballistic Missile',
    category:'SRBM', origin:'ROK', status:'OPERATIONAL', threatRating:'HIGH',
    description:'2톤 초대형 탄두 탑재 탄도미사일. 지하 벙커·지휘소 직접 관통 설계.',
    detail:`## 현무-4\n\n한국이 개발한 고위력 탄도미사일. 2톤 이상의 대형 관통 탄두를 탑재해 북한 지하 핵시설·지휘소 파괴에 특화.\n\n### 주요 제원 (Wikipedia)\n- 사거리: 800km\n- 탄두: 2,500kg (최대 2톤 이상)\n- 추진: 고체로켓 2단\n- 유도: 관성항법+말단\n\n### 전략적 의의\n비핵 수단으로 북한 핵시설 타격 가능한 "킬체인" 핵심 전력.`,
    specs:{ range:'800km', payload:'2,500kg 관통탄두', propulsion:'고체로켓 2단', firstDeployed:'2020년(시험)', manufacturer:'LIG넥스원·한화', warhead:'고폭 관통탄두(벙커버스터)' },
    confidence:88, lastUpdated:'2026-06-27', relatedIntelIds:[], tags:['현무-4','벙커버스터','킬체인'], sources:['Wikipedia','ADD'],
  },
  {
    id:'w-rok-w05', name:'현무-4.4 (SLBM)', nameEng:'Hyunmoo-4.4 SLBM',
    category:'SLBM', origin:'ROK', status:'OPERATIONAL', threatRating:'HIGH',
    description:'한국 첫 잠수함발사탄도미사일. 도산안창호함 탑재, 2021년 시험 성공.',
    detail:`## 현무-4.4 SLBM\n\n한국이 자체 개발한 잠수함발사 탄도미사일. 2021년 9월 도산안창호함에서 수중발사 시험에 성공했다.\n\n### 주요 제원\n- 사거리: 500km 이상\n- 탑재함: KSS-III 도산안창호급 (K-VLS 6셀)\n- 추진: 고체로켓\n- 미국·영국 이외 비핵 잠발 탄도미사일 개발 세계 7번째`,
    specs:{ range:'500km+', propulsion:'고체로켓', firstDeployed:'2021년(시험)', manufacturer:'ADD·LIG넥스원', armament:'K-VLS 6셀 탑재' },
    confidence:90, lastUpdated:'2026-06-27', relatedIntelIds:[], tags:['SLBM','현무','잠수함발사','KSS-III'], sources:['Wikipedia'],
  },
  {
    id:'w-rok-w06', name:'현무-5', nameEng:'Hyunmoo-5 Ballistic Missile',
    category:'IRBM', origin:'ROK', status:'DEVELOPMENT', threatRating:'CRITICAL',
    description:'사거리 3,000km, 탄두 8톤 초대형 비핵 탄도미사일. 전 세계적으로 유례없는 탄두 중량.',
    detail:`## 현무-5\n\n한국이 개발 중인 극대형 탄두 탑재 중거리 탄도미사일. 세계에서 비핵 탄도미사일 중 가장 무거운 탄두를 탑재한다.\n\n### 주요 제원 (Wikipedia)\n- 사거리: 3,000km\n- 탄두 중량: 8,000kg (8톤!)\n- 추진: 고체로켓 2단\n- 목표: 북한 전지하화된 핵시설 파괴\n\n### 의의\n"비핵 탄도미사일에 8톤 탄두는 전례 없다" — Wikipedia 인용. 2025년 말 배치 목표.`,
    specs:{ range:'3,000km', payload:'8,000kg(세계최대 비핵탄두)', propulsion:'고체로켓 2단', firstDeployed:'2025년(목표)', manufacturer:'LIG넥스원', warhead:'8톤 관통·폭발탄두' },
    confidence:80, lastUpdated:'2026-06-27', relatedIntelIds:[], tags:['현무-5','초대형탄두','한국전략미사일'], sources:['Wikipedia','ADD'],
  },
  {
    id:'w-rok-w07', name:'K2 흑표', nameEng:'K2 Black Panther MBT',
    category:'GROUND', origin:'ROK', status:'OPERATIONAL', threatRating:'HIGH',
    description:'한국 4세대 주력전차. 260대 한국 운용, 폴란드 180대 수출. 세계 최고 수준 전차.',
    detail:`## K2 흑표 주력전차\n\n현대로템이 제작하는 한국형 4세대 주력전차. 폴란드에 대규모 수출 성사로 K-방산 대표 품목이 됐다.\n\n### 주요 제원 (Wikipedia)\n- 중량: 56톤\n- 주포: CN08 120mm 55구경 활강포 (40발, 오토로더 16발)\n- 엔진: HD현대인프라코어 DV27K 1,500hp (배치2)\n- 속도: 70km/h(도로)/50km/h(야지)\n- 항속: 450km\n- 장갑: MIL-12560H 강판+탄화규소 세라믹+ERA/NERA\n- APS: KAPS(미구현), 소프트킬 연막탄 구현\n\n### 수출 현황 (2025)\n- 한국군: 260대 운용\n- 폴란드: 2025년 11월까지 180대 납품\n- 페루: 2025년 12월 54대 발주`,
    specs:{ range:'450km', speed:'70km/h', weight:'56,000kg', length:'10.8m', crew:'3명', propulsion:'DV27K 1,500hp 디젤', armament:'120mm CN08 55구경×40발+K6 12.7mm HMG', firstDeployed:'2014년', manufacturer:'현대로템' },
    confidence:99, lastUpdated:'2026-06-27', relatedIntelIds:[], tags:['K2','흑표','주력전차','K방산수출','현대로템'], sources:['Wikipedia','Hyundai Rotem'],
  },
  {
    id:'w-rok-w08', name:'KSS-III 도산안창호급', nameEng:'KSS-III Dosan Ahn Changho-class SSK',
    category:'SUBMARINE', origin:'ROK', status:'OPERATIONAL', threatRating:'HIGH',
    description:'한국 최대 독자개발 잠수함. SLBM 6발 탑재. 2026년 첫 태평양 횡단 임무 성공.',
    detail:`## KSS-III 도산안창호급 잠수함\n\n한화오션·HD현대중공업이 건조하는 한국 최초 탄도미사일 탑재 잠수함. 2026년 5월 태평양 횡단으로 캐나다까지 항행했다.\n\n### 주요 제원 (Wikipedia)\n- 배수량: 3,600톤 (Batch II)\n- 전장: 89.3m\n- K-VLS 6셀 → 현무-4.4 SLBM 6발\n- 어뢰: 533mm 발사관 ×6\n- 추진: AIP(공기독립추진)+디젤전기\n\n### 운용 현황\n1번함 도산안창호(SS-083) 2021년 취역. 2026년 첫 태평양 횡단 완료.`,
    specs:{ displacement:'3,600톤(Batch II)', range:'11,000km+', speed:'20노트(수중)', length:'89.3m', crew:'50명', propulsion:'AIP+디젤전기', armament:'현무-4.4 SLBM×6+533mm어뢰×6', firstDeployed:'2021년', manufacturer:'한화오션·HD현대중공업' },
    confidence:95, lastUpdated:'2026-06-27', relatedIntelIds:[], tags:['KSS-III','도산안창호','SLBM','잠수함'], sources:['Wikipedia','ROKN'],
  },
  {
    id:'w-rok-w09', name:'세종대왕급 이지스 구축함', nameEng:'Sejong the Great-class KDX-III Destroyer',
    category:'NAVAL', origin:'ROK', status:'OPERATIONAL', threatRating:'MED',
    description:'한국형 이지스 구축함. SPY-1D 레이더·SM-2/3 탑재. 탄도미사일 방어 능력.',
    detail:`## 세종대왕급 (KDX-III) 이지스 구축함\n\n한국 해군 최대 수상 전투함. 이지스 전투체계와 SM-2/SM-3를 탑재해 탄도미사일 방어 능력 보유.\n\n### 주요 제원 (Wikipedia)\n- 만재배수량: 11,000톤\n- 주포: Mk45 5인치(127mm)\n- VLS: Mk41 80셀(SM-2/SM-3) + 한국형 VLS 48셀\n- AN/SPY-1D 레이더\n- 대잠: 어뢰, ASROC\n- 헬기: 2대\n\n### Batch II 계획\n3척 추가 건조 예정. 개량형 SPY-6 레이더 탑재 예정.`,
    specs:{ displacement:'11,000톤', range:'5,500km', speed:'30노트', length:'165.9m', crew:'300명', propulsion:'가스터빈 COGAG', armament:'Mk41 VLS 80셀+K-VLS 48셀+127mm포', firstDeployed:'2008년', manufacturer:'현대중공업' },
    confidence:98, lastUpdated:'2026-06-27', relatedIntelIds:[], tags:['세종대왕','이지스','KDX-III','구축함'], sources:['Wikipedia','ROKN'],
  },
  {
    id:'w-rok-w10', name:'천궁-II (M-SAM2)', nameEng:'Cheongung-II (M-SAM2)',
    category:'SAM', origin:'ROK', status:'OPERATIONAL', threatRating:'LOW',
    description:'한국 독자개발 중거리 지대공미사일. 아랍에미리트에 4조원대 수출 성공.',
    detail:`## 천궁-II (M-SAM2)\n\nLIG넥스원이 개발한 한국형 중거리 지대공미사일 체계. 러시아 S-400 대신 UAE가 4조원대 계약을 체결하며 K-방산 최대 수출 기록을 세웠다.\n\n### 주요 특징\n- 요격고도: 20km\n- 사거리: 40km\n- 능동위상배열 레이더\n- 탄도미사일 요격 능력\n- UAE 계약: $3.5B (한국 최대 단일 무기 수출)`,
    specs:{ range:'40km', altitude:'20km', speed:'마하 4.5', guidance:'능동레이더', firstDeployed:'2015년(M-SAM1)/2022년(M-SAM2)', manufacturer:'LIG넥스원', accuracy:'요격성공률 미공개' },
    confidence:96, lastUpdated:'2026-06-27', relatedIntelIds:[], tags:['천궁','M-SAM','지대공','UAE수출'], sources:['Wikipedia','LIG넥스원'],
  },
  {
    id:'w-rok-w11', name:'KALCM 천룡', nameEng:'KALCM Cheonryong Air-Launched Cruise Missile',
    category:'ASM', origin:'ROK', status:'OPERATIONAL', threatRating:'HIGH',
    description:'한국 공중발사 순항미사일. 8m 관통 이중탄두. KF-21·FA-50 탑재 예정.',
    detail:`## KALCM 천룡 (Cheonryong)\n\nLIG넥스원·한화에어로스페이스가 제작하는 한국형 공중발사 순항미사일. 2025년 6월 FA-50에서 첫 시험발사 성공.\n\n### 주요 제원 (Wikipedia)\n- 사거리: 500~800km\n- 탄두: 이중단계 관통탄두 (콘크리트 8m 관통)\n- 추진: 터보제트\n- 유도: INS+GPS+지형추적+DSMAC\n- 탑재기: KF-21 (Block II), FA-50, F-15K`,
    specs:{ range:'500~800km', payload:'이중관통탄두(콘크리트 8m)', propulsion:'터보제트', guidance:'INS+GPS+지형추적+DSMAC', firstDeployed:'2025년(시험)', manufacturer:'LIG넥스원·한화에어로스페이스' },
    confidence:88, lastUpdated:'2026-06-27', relatedIntelIds:[], tags:['KALCM','천룡','공대지','순항미사일'], sources:['Wikipedia','LIG넥스원'],
  },

  // ════════════════════════════════════════════════════════
  // 북한 (DPRK) — 위키백과·CSIS·GlobalSecurity 기반
  // ════════════════════════════════════════════════════════

  {
    id:'w-dprk-w01', name:'화성-18형', nameEng:'Hwasong-18 ICBM',
    category:'ICBM', origin:'DPRK', status:'OPERATIONAL', threatRating:'CRITICAL',
    description:'북한 최초 고체연료 ICBM. 2023년 배치. 사거리 15,000km, 연료주입 불필요로 기습발사 가능.',
    detail:`## 화성-18형 ICBM\n\n북한이 개발한 최초의 고체연료 ICBM으로 2023년 4월 13일 첫 시험, 2023년 12월 실전배치 선언.\n\n### 주요 제원 (Wikipedia)\n- 전장: 약 25m\n- 직경: 약 2.1m\n- 중량: 55~60톤\n- 사거리: 15,000km 이상\n- 추진: 3단 고체로켓\n- 발사: 9축 TEL 냉발사\n- 탄두: 핵탄두 탑재 가능, MIRV 추정\n\n### 전략적 의미\n고체연료로 발사 전 연료주입 시간 불필요 → 선제타격 회피 능력 대폭 향상. 미국 전역 타격 가능.`,
    specs:{ range:'15,000km+', payload:'핵탄두(MIRV 가능)', propulsion:'3단 고체로켓', length:'25m', weight:'55,000~60,000kg', firstDeployed:'2023년 12월', warhead:'핵(추정)', guidance:'관성항법' },
    confidence:85, lastUpdated:'2026-06-27', relatedIntelIds:[], tags:['화성-18','ICBM','고체연료','북한'], sources:['Wikipedia','CSIS Missile Threat'],
  },
  {
    id:'w-dprk-w02', name:'화성-19형', nameEng:'Hwasong-19 ICBM',
    category:'ICBM', origin:'DPRK', status:'OPERATIONAL', threatRating:'CRITICAL',
    description:'2024년 10월 시험. 화성-18 개량형. 세계 최대 도로이동 ICBM. MIRV 4~5발 탑재 추정.',
    detail:`## 화성-19형 ICBM\n\n2024년 10월 31일 첫 시험발사. 화성-18을 기반으로 더 크고 무거운 탄두를 탑재하도록 개량된 최신형 ICBM.\n\n### 주요 제원 (Wikipedia)\n- 전장: 28m 이상 (세계 최대 도로이동 ICBM)\n- 중량: 80,000kg 이상\n- 사거리: 15,000km 이상 (미국 본토 타격 가능)\n- 추진: 3단 고체로켓\n- 발사차량: 11축 TEL\n- 탄두: MIRV 4~5발 추정\n- 북한 공식 표현: "최종판 ICBM"`,
    specs:{ range:'15,000km+', payload:'MIRV 4~5발(추정)', propulsion:'3단 고체로켓', length:'28m+', weight:'80,000kg+', firstDeployed:'2024년', warhead:'핵 MIRV', guidance:'관성항법' },
    confidence:78, lastUpdated:'2026-06-27', relatedIntelIds:[], tags:['화성-19','ICBM','최신형','MIRV','2024'], sources:['Wikipedia','CSIS'],
  },
  {
    id:'w-dprk-w03', name:'화성-17형', nameEng:'Hwasong-17 ICBM (Monster ICBM)',
    category:'ICBM', origin:'DPRK', status:'OPERATIONAL', threatRating:'CRITICAL',
    description:'액체연료 ICBM 최대급. 22바퀴 TEL. 사거리 15,000km, 탑재량 2,000~3,500kg.',
    detail:`## 화성-17형 ICBM\n\n2022년 3월 시험발사. 세계 최대급 도로이동 ICBM 중 하나. 22바퀴 TEL 차량 운용.\n\n### 주요 제원 (Wikipedia)\n- 전장: 24~26m\n- 직경: 2.4~2.9m\n- 중량: 80,000~150,000kg\n- 사거리: 15,000km 이상\n- 탑재량: 2,000~3,500kg\n- 추진: 액체로켓 2단\n- 발사차량: 22바퀴 TEL`,
    specs:{ range:'15,000km+', payload:'2,000~3,500kg', propulsion:'액체로켓 2단', length:'24~26m', weight:'80,000~150,000kg', firstDeployed:'2022년(시험)', warhead:'핵탄두', guidance:'관성항법' },
    confidence:82, lastUpdated:'2026-06-27', relatedIntelIds:[], tags:['화성-17','ICBM','괴물ICBM','액체연료'], sources:['Wikipedia','CSIS'],
  },
  {
    id:'w-dprk-w04', name:'화성-16B (극초음속 IRBM)', nameEng:'Hwasong-16B Hypersonic IRBM',
    category:'IRBM', origin:'DPRK', status:'OPERATIONAL', threatRating:'CRITICAL',
    description:'2024~2025년 시험 고체연료 IRBM. 극초음속 활공탄두(HGV) 탑재.',
    detail:`## 화성-16B 극초음속 IRBM\n\n2024~2025년 시험된 북한 신형 고체연료 중거리 탄도미사일. 극초음속 활공탄두 탑재로 요격 어려움.\n\n### 주요 제원\n- 사거리: 3,000~5,500km\n- 탄두: 극초음속 활공탄두(HGV)\n- 추진: 고체로켓\n- 속도: 마하 10 이상(활공 단계)\n\n### 위협\n기동 활공탄두로 기존 MD 시스템 회피 가능. 한국·일본·괌 전역 타격.`,
    specs:{ range:'3,000~5,500km', payload:'극초음속 활공탄두', propulsion:'고체로켓', firstDeployed:'2024~2025년', warhead:'재래식/핵 추정' },
    confidence:65, lastUpdated:'2026-06-27', relatedIntelIds:[], tags:['화성-16B','IRBM','극초음속','HGV','북한'], sources:['Wikipedia','CSIS'],
  },
  {
    id:'w-dprk-w05', name:'KN-25 초대형 방사포', nameEng:'KN-25 (600mm Super-Large MLRS)',
    category:'MLRS', origin:'DPRK', status:'OPERATIONAL', threatRating:'HIGH',
    description:'구경 600mm 초대형 방사포. 사거리 380km. 사실상 단거리 탄도미사일급.',
    detail:`## KN-25 초대형 방사포\n\n북한이 개발한 600mm 초대형 방사포. 사실상 단거리 탄도미사일에 준하는 성능으로 전술핵 탑재 가능성이 제기된다.\n\n### 주요 제원 (Wikipedia·CSIS)\n- 구경: 600mm (세계 최대급)\n- 사거리: 380km\n- 8발 탑재 이동식 발사대\n- 전술핵 탑재 가능 주장\n- 250개 발사대 배치 (CSIS 추정)`,
    specs:{ range:'380km', propulsion:'고체로켓', firstDeployed:'2019년', warhead:'재래식/전술핵 주장', quantity:'250개 발사대(추정)' },
    confidence:80, lastUpdated:'2026-06-27', relatedIntelIds:[], tags:['KN-25','600mm','초대형방사포','북한'], sources:['Wikipedia','CSIS'],
  },
  {
    id:'w-dprk-w06', name:'화살-2 (순항미사일)', nameEng:'Hwasal-2 Cruise Missile',
    category:'CRUISE', origin:'DPRK', status:'OPERATIONAL', threatRating:'HIGH',
    description:'북한 장거리 순항미사일. 사거리 1,800~2,000km. 핵탄두 탑재 주장.',
    detail:`## 화살-2 순항미사일\n\n2023년 첫 공개된 북한의 전략 순항미사일. 미국 토마호크에 유사한 설계. 전략핵 무기 목적으로 개발됐다고 주장.\n\n### 주요 제원 (Wikipedia)\n- 사거리: 1,800~2,000km\n- 탄두: 핵탄두 주장 (재래식 가능)\n- 저고도 지형추적 비행\n- 대함·대지 양용 가능`,
    specs:{ range:'1,800~2,000km', propulsion:'터보팬(추정)', guidance:'INS+지형추적', firstDeployed:'2023년', warhead:'핵(주장)/재래식' },
    confidence:55, lastUpdated:'2026-06-27', relatedIntelIds:[], tags:['화살-2','순항미사일','북한','전략핵'], sources:['Wikipedia','CSIS'],
  },
  {
    id:'w-dprk-w07', name:'북극성-3 SLBM', nameEng:'Pukguksong-3 SLBM',
    category:'SLBM', origin:'DPRK', status:'OPERATIONAL', threatRating:'CRITICAL',
    description:'북한 3세대 잠수함발사탄도미사일. 고체연료. 신포급 잠수함 탑재.',
    detail:`## 북극성-3 SLBM\n\n2019년 첫 시험발사. 고체연료를 사용해 즉각 발사가 가능한 북한 SLBM 3세대 모델.\n\n### 주요 제원 (Wikipedia)\n- 추진: 고체로켓\n- 발사: 냉발사(Cold launch) 방식\n- 탑재함: 신포급(고래급) SSB\n- 핵탄두 탑재 가능`,
    specs:{ propulsion:'고체로켓', firstDeployed:'2019년(시험)', warhead:'핵탄두', guidance:'관성항법' },
    confidence:72, lastUpdated:'2026-06-27', relatedIntelIds:[], tags:['북극성-3','SLBM','잠수함발사','북한'], sources:['Wikipedia','CSIS'],
  },

  // ════════════════════════════════════════════════════════
  // 미국 (USA) — Wikipedia 추가 업데이트
  // ════════════════════════════════════════════════════════

  {
    id:'w-usa-w01', name:'B-52H 스트라토포트리스', nameEng:'B-52H Stratofortress',
    category:'AIRCRAFT', origin:'USA', status:'OPERATIONAL', threatRating:'CRITICAL',
    description:'미국 전략핵폭격기. 60년 이상 운용. 한반도 핵억제 임무 수행 (BUFF).',
    detail:`## B-52H Stratofortress\n\n보잉이 제작한 미국의 장거리 전략폭격기. 1955년 첫 비행 후 현재도 주력으로 운용되며 2050년대까지 운용 예정.\n\n### 주요 제원\n- 사거리: 14,162km\n- 탑재량: 32,000kg\n- 핵폭탄·ALCM·JASSM-ER 탑재\n- AESA 레이더 업그레이드 중\n\n### 한반도 관련성\n위기 시 괌에서 출격, 한반도 핵억제 임무. 연간 수차례 한국 방문 훈련.`,
    specs:{ range:'14,162km', speed:'1,046km/h', payload:'32,000kg', length:'48.5m', weight:'83,250kg', propulsion:'TF33-PW-103C ×8', crew:'5명', firstDeployed:'1955년', manufacturer:'보잉', armament:'B61핵폭탄/ALCM/JASSM-ER/JDAM' },
    confidence:99, lastUpdated:'2026-06-27', relatedIntelIds:[], tags:['B-52','전략폭격기','핵억제','BUFF'], sources:['Wikipedia','USAF'],
  },
  {
    id:'w-usa-w02', name:'LGM-30G 미닛맨 III', nameEng:'LGM-30G Minuteman III ICBM',
    category:'ICBM', origin:'USA', status:'OPERATIONAL', threatRating:'CRITICAL',
    description:'미국 유일 운용 중 지상발사 ICBM. 사일로 400기. 핵3원 지상 전력.',
    detail:`## LGM-30G Minuteman III ICBM\n\n미국이 운용하는 유일한 지상발사 ICBM. 150개 사일로에 배치, 경보즉시발사(LoW) 태세 유지.\n\n### 주요 제원\n- 사거리: 13,000km\n- MIRV 최대 3발\n- 추진: 3단 고체로켓\n- 반응 시간: 수분 이내\n- 후계 ICBM: LGM-35A 센티넬(개발 중)`,
    specs:{ range:'13,000km', payload:'MIRV ×3발', propulsion:'3단 고체로켓', length:'18.2m', weight:'35,300kg', firstDeployed:'1970년', manufacturer:'보잉', warhead:'W87-0/1 핵탄두(475kt)', guidance:'아드반스드 관성항법' },
    confidence:99, lastUpdated:'2026-06-27', relatedIntelIds:[], tags:['미닛맨','ICBM','핵3원','사일로'], sources:['Wikipedia','USAF'],
  },
  {
    id:'w-usa-w03', name:'트라이던트 II D5', nameEng:'UGM-133A Trident II D5 SLBM',
    category:'SLBM', origin:'USA', status:'OPERATIONAL', threatRating:'CRITICAL',
    description:'미국 오하이오급 SSBN 탑재 SLBM. 사거리 11,000km+, MIRV 8발. 핵3원 핵심.',
    detail:`## UGM-133A Trident II D5\n\n록히드 마틴이 제조하는 미국의 주력 SLBM. 오하이오급 14척에 탑재, 각 잠수함당 최대 24발 보유 가능.\n\n### 주요 제원\n- 사거리: 11,300km 이상\n- MIRV 최대 14발(조약상 8발)\n- CEP 90m 이내\n- 3단 고체로켓\n- 영국 뱅가드급에도 탑재`,
    specs:{ range:'11,300km+', payload:'MIRV ×8발(조약기준)', propulsion:'3단 고체로켓', length:'13.4m', weight:'58,500kg', firstDeployed:'1990년', manufacturer:'록히드 마틴', warhead:'W76-1/W88 핵탄두', guidance:'스텔라 관성항법' },
    confidence:99, lastUpdated:'2026-06-27', relatedIntelIds:[], tags:['트라이던트','SLBM','핵3원','오하이오급'], sources:['Wikipedia','US Navy'],
  },
  {
    id:'w-usa-w04', name:'M142 HIMARS', nameEng:'M142 High Mobility Artillery Rocket System',
    category:'MLRS', origin:'USA', status:'OPERATIONAL', threatRating:'HIGH',
    description:'고기동 다연장로켓. 우크라이나 전쟁 결정적 전과. C-130 공수 가능.',
    detail:`## M142 HIMARS\n\n록히드 마틴의 경량 고기동 다연장로켓. M270의 절반 중량으로 C-130 공수가 가능해 신속 전개 능력이 뛰어나다.\n\n### 주요 제원\n- GMLRS: 사거리 85km, CEP 5m\n- ATACMS Block IA: 사거리 300km\n- PrSM: 사거리 500km+(개발 중)\n- 탑재 로켓: 6발\n\n### 실전 성과\n우크라이나 전쟁에서 러시아 탄약고·교량 정밀타격으로 전황 전환.`,
    specs:{ range:'300km(ATACMS)/500km+(PrSM)', speed:'85km/h', payload:'6발(GMLRS)', length:'7m(차량)', weight:'16,257kg', propulsion:'차량+로켓', guidance:'GPS+INS', accuracy:'CEP 5m(GMLRS)', firstDeployed:'2005년', manufacturer:'록히드 마틴' },
    confidence:99, lastUpdated:'2026-06-27', relatedIntelIds:[], tags:['HIMARS','다연장로켓','ATACMS','우크라이나'], sources:['Wikipedia','US Army'],
  },

  // ════════════════════════════════════════════════════════
  // 중국 (CHINA) — Wikipedia PLA 기반
  // ════════════════════════════════════════════════════════

  {
    id:'w-chn-w01', name:'99A식 주력전차', nameEng:'Type 99A MBT (ZTZ-99A)',
    category:'GROUND', origin:'CHINA', status:'OPERATIONAL', threatRating:'HIGH',
    description:'중국 최신 3.5세대 주력전차. 125mm 자동장전 주포. 2024년 GL-6 APS 장착.',
    detail:`## Type 99A (ZTZ-99A) 주력전차\n\n중국 노린코(NORINCO)가 제작하는 PLA의 주력전차. 2024년 9월 GL-6 능동방호시스템(APS)이 장착된 모습이 포착됐다.\n\n### 주요 제원 (Wikipedia·ArmyRecognition)\n- 주포: 125mm 활강포 (분당 10발, 오토로더)\n- 장갑: RHA 1,000mm 이상(화학에너지 기준)\n- 엔진: HP150 1,500hp 디젤\n- 속도: 80km/h(도로)\n- 1,300대+ 운용 (Type 99·99A 합산)\n- 2024년 GL-6 하드킬 APS 장착`,
    specs:{ range:'600km', speed:'80km/h', weight:'54,000kg', length:'11m', crew:'3명', propulsion:'HP150 1,500hp 디젤', armament:'125mm 활강포+12.7mm HMG+7.62mm MG', firstDeployed:'2001년(Type 99)/2010년대(99A)', manufacturer:'노린코(NORINCO)' },
    confidence:85, lastUpdated:'2026-06-27', relatedIntelIds:[], tags:['99A형전차','중국','ZTZ-99A','PLA'], sources:['Wikipedia','ArmyRecognition'],
  },
  {
    id:'w-chn-w02', name:'J-16 다목적 전투기', nameEng:'J-16 Flanker-G Strike Fighter',
    category:'AIRCRAFT', origin:'CHINA', status:'OPERATIONAL', threatRating:'HIGH',
    description:'중국 Su-27 계열 4.5세대 다목적 전투기. AESA 레이더 탑재. PL-15 운용.',
    detail:`## J-16 Flanker-G\n\n선양항공이 J-11BS를 기반으로 자체 개발한 4.5세대 쌍발 다목적 전투기. 중국 공군 주력 타격 전력.\n\n### 주요 특징\n- AESA 레이더 탑재\n- PL-15 초장거리 AAM(사거리 200km+) 운용\n- YJ-91/YJ-12 대레이더/대함미사일 탑재\n- 400대+ 운용(2024)\n- 전자전 재밍 포드 운용 능력`,
    specs:{ range:'3,900km', speed:'마하 2.0+', payload:'8,000kg', length:'21.9m', weight:'17,500kg', propulsion:'AL-31F 또는 WS-10 ×2', crew:'2명', firstDeployed:'2013년', manufacturer:'선양항공', armament:'PL-15/PL-10/YJ-12/YJ-91/JDAM류' },
    confidence:88, lastUpdated:'2026-06-27', relatedIntelIds:[], tags:['J-16','중국','다목적전투기','PL-15'], sources:['Wikipedia','PLAAF'],
  },
  {
    id:'w-chn-w03', name:'PHL-16 다연장로켓', nameEng:'PHL-16 Multiple Rocket Launcher',
    category:'MLRS', origin:'CHINA', status:'OPERATIONAL', threatRating:'HIGH',
    description:'중국 모듈식 다연장로켓. 300mm/370mm/750mm 호환. PLA 120대+ 운용.',
    detail:`## PHL-16 다연장로켓\n\n중국 노린코가 개발한 모듈식 다연장로켓 시스템. 300mm·370mm·750mm 로켓을 동일 플랫폼에 탑재 가능.\n\n### 주요 제원 (Wikipedia)\n- 구경: 300/370/750mm 교환 가능\n- 사거리: 300mm(70km)/370mm(130km)/750mm(150~300km)\n- 운용 수: 120+대\n- 차량: 8×8 자주식`,
    specs:{ range:'70~300km(탄종에 따라)', payload:'로켓 발사관 모듈식', propulsion:'고체로켓+차량', firstDeployed:'2019년', manufacturer:'노린코(NORINCO)', quantity:'120+대' },
    confidence:80, lastUpdated:'2026-06-27', relatedIntelIds:[], tags:['PHL-16','중국','다연장로켓','모듈식'], sources:['Wikipedia','PLAGF'],
  },
  {
    id:'w-chn-w04', name:'DF-26 중거리 탄도미사일', nameEng:'DF-26 IRBM (Guam Killer)',
    category:'IRBM', origin:'CHINA', status:'OPERATIONAL', threatRating:'CRITICAL',
    description:'사거리 4,000km "괌 킬러". 핵·재래식 양용, 항모 대함 타격 능력.',
    detail:`## DF-26 (동풍-26)\n\n중국 CASIC가 개발한 중거리 탄도미사일. "괌 킬러(Guam Killer)"로 불리며 재래식·핵 양용, 대지·대함 양용 능력을 갖는다.\n\n### 주요 제원\n- 사거리: 3,000~4,500km\n- 탄두: 핵 또는 재래식 (1,200~1,800kg)\n- 이동식 TEL 발사\n- 기동탄두(MaRV)로 항공모함 추적 가능\n- 2024년 기준 600발+ 배치 (DF-21D와 합산)`,
    specs:{ range:'3,000~4,500km', payload:'1,200~1,800kg', propulsion:'고체로켓 2단', guidance:'INS+레이더', firstDeployed:'2015년', manufacturer:'CASIC', warhead:'핵/재래식 양용' },
    confidence:82, lastUpdated:'2026-06-27', relatedIntelIds:[], tags:['DF-26','괌킬러','IRBM','대함','중국'], sources:['Wikipedia','CSIS','DoD'],
  },
  {
    id:'w-chn-w05', name:'052D형 구축함 (쿤밍급)', nameEng:'Type 052D Destroyer (Kunming-class)',
    category:'NAVAL', origin:'CHINA', status:'OPERATIONAL', threatRating:'HIGH',
    description:'중국 이지스형 구축함. AESA 레이더·64셀 VLS. 30척 이상 운용.',
    detail:`## Type 052D 구축함 (쿤밍급)\n\n중국 장난조선소가 건조하는 중국형 이지스 구축함. Type 346A 능동위상배열레이더와 64셀 VLS를 탑재한다.\n\n### 주요 제원\n- 배수량: 7,500톤(만재)\n- VLS: 64셀(HHQ-9/YJ-18/CJ-10)\n- 주포: H/PJ-38 130mm\n- Type 346A AESA 레이더\n- 30척 이상 운용(2025)`,
    specs:{ displacement:'7,500톤', range:'4,500km', speed:'30노트', length:'157m', crew:'280명', propulsion:'COGAG 가스터빈', armament:'HHQ-9/YJ-18/CJ-10 ×64셀+130mm포', firstDeployed:'2013년', manufacturer:'장난조선소' },
    confidence:88, lastUpdated:'2026-06-27', relatedIntelIds:[], tags:['052D형','구축함','중국','이지스형','VLS'], sources:['Wikipedia','PLAN'],
  },
  {
    id:'w-chn-w06', name:'항공모함 푸젠함', nameEng:'Fujian-class Aircraft Carrier CV-18',
    category:'NAVAL', origin:'CHINA', status:'OPERATIONAL', threatRating:'HIGH',
    description:'중국 3번째 항공모함. 전자기 캐터펄트(EMALS) 최초 탑재. 2025년 취역.',
    detail:`## 항공모함 푸젠함 (CV-18)\n\n중국이 자체 설계·건조한 3번째 항공모함. 전자기 캐터펄트를 채택한 최초의 중국 항모이며 J-35A 스텔스 함재기를 탑재한다.\n\n### 주요 제원\n- 배수량: 80,000톤+\n- 함재기: J-15T, J-35A(스텔스) 예정\n- 전자기 캐터펄트(EMALS) 4기\n- 2025년 전력화 완료`,
    specs:{ displacement:'80,000톤+', range:'무제한(통상추진)', speed:'31노트', length:'316m', crew:'2,000명+', propulsion:'통상추진(蒸汽터빈)', armament:'J-15T/J-35A×60+/HHQ-10SAM', firstDeployed:'2025년', manufacturer:'장남조선소' },
    confidence:80, lastUpdated:'2026-06-27', relatedIntelIds:[], tags:['푸젠','항공모함','EMALS','J-35A','중국'], sources:['Wikipedia','PLAN','DoD2024'],
  },

  // ════════════════════════════════════════════════════════
  // 러시아 (RUSSIA) — Wikipedia 업데이트
  // ════════════════════════════════════════════════════════

  {
    id:'w-rus-w01', name:'9M723 이스칸데르-M SRBM', nameEng:'9M723 Iskander-M SRBM',
    category:'SRBM', origin:'RUSSIA', status:'OPERATIONAL', threatRating:'HIGH',
    description:'러시아 전술 탄도미사일. 사거리 500km, CEP 5~7m. 칼리닌그라드 배치로 NATO 위협.',
    detail:`## 9M723 Iskander-M\n\n콜롬나 기계설계국(KBM)이 개발한 러시아 주력 단거리 탄도미사일. 기동탄두(MaRV)로 요격을 어렵게 만든다.\n\n### 주요 제원 (Wikipedia)\n- 사거리: 500km\n- CEP: 5~7m (초정밀)\n- 최고점: 50km (저탄도 비행)\n- 기동탄두: 요격 회피\n- 사거리는 INF 조약상 한계(1987~2019) 이내로 설계\n- 재래식·핵 양용`,
    specs:{ range:'500km', speed:'마하 6~7', payload:'700~750kg', length:'7.3m', weight:'3,800kg', propulsion:'고체로켓', guidance:'INS+DSMAC+레이더', accuracy:'CEP 5~7m', firstDeployed:'2006년', manufacturer:'KBM', warhead:'재래식/핵 양용' },
    confidence:95, lastUpdated:'2026-06-27', relatedIntelIds:[], tags:['이스칸데르','SRBM','러시아','기동탄두'], sources:['Wikipedia','IISS'],
  },
  {
    id:'w-rus-w02', name:'Su-35S 플랭커-E', nameEng:'Su-35S Flanker-E',
    category:'AIRCRAFT', origin:'RUSSIA', status:'OPERATIONAL', threatRating:'HIGH',
    description:'러시아 4.5세대 공중우세 전투기. 추력편향 노즐. 수호이 최고 생산형.',
    detail:`## Su-35S Flanker-E\n\n수호이가 개발한 러시아 4.5세대 다목적 전투기. 3D 추력편향 노즐로 초기동성을 갖추고 있다.\n\n### 주요 제원 (Wikipedia)\n- 사거리: 3,600km\n- 최고속도: 마하 2.25\n- 이리스-E PESA 레이더\n- 추력편향 노즐(TVC)\n- 이란·중국·이집트 수출\n- 140+대 러시아 운용`,
    specs:{ range:'3,600km', speed:'마하 2.25', payload:'8,000kg', length:'21.9m', weight:'18,400kg', propulsion:'AL-41F1S ×2(추력편향)', ceiling:'20,000m', crew:'1명', firstDeployed:'2014년', manufacturer:'수호이', armament:'R-77M/R-73M/Kh-59/Kh-31' },
    confidence:90, lastUpdated:'2026-06-27', relatedIntelIds:[], tags:['Su-35S','러시아','4.5세대','추력편향'], sources:['Wikipedia','Russian AF'],
  },
  {
    id:'w-rus-w03', name:'K-300P 바스티온-P', nameEng:'K-300P Bastion-P Anti-Ship Missile System',
    category:'SSM', origin:'RUSSIA', status:'OPERATIONAL', threatRating:'HIGH',
    description:'러시아 해안 방어 대함 순항미사일. P-800 오닉스 탑재. 사거리 600km.',
    detail:`## K-300P Bastion-P (바스티온-P)\n\nP-800 오닉스(SS-N-26) 초음속 대함미사일을 탑재하는 러시아 해안 방어 체계.\n\n### 주요 제원\n- 미사일: P-800 오닉스 (마하 2.5)\n- 사거리: 300~600km\n- 고도: 저고도 해면비행\n- 이동식 차량 탑재\n- 크림반도 배치 (흑해 장악)`,
    specs:{ range:'300~600km', speed:'마하 2.5(P-800 오닉스)', payload:'300kg 관통탄두', propulsion:'터보제트+고체부스터', guidance:'INS+능동레이더', firstDeployed:'2010년', manufacturer:'NPO 마쉬노스트로에니야' },
    confidence:88, lastUpdated:'2026-06-27', relatedIntelIds:[], tags:['바스티온','P-800','오닉스','대함미사일','러시아'], sources:['Wikipedia','Russian MOD'],
  },
  {
    id:'w-rus-w04', name:'오레쉬닉 (신형 MRBM)', nameEng:'Oreshnik MRBM (RS-26)',
    category:'IRBM', origin:'RUSSIA', status:'OPERATIONAL', threatRating:'CRITICAL',
    description:'2024년 11월 우크라이나 실전사용. 마하 10+ 극초음속. 핵·재래식 양용 신형 미사일.',
    detail:`## 오레쉬닉 (Oreshnik)\n\n2024년 11월 21일 러시아가 우크라이나 드니프로에 실전 사용한 신형 극초음속 중거리 탄도미사일. RS-26 야르스 개조 버전으로 추정.\n\n### 주요 특징\n- 2024년 11월 첫 실전 사용\n- 속도: 마하 10+ (탄두 분리 후)\n- 핵 또는 재래식 탄두 양용\n- 다수의 기동탄두 탑재\n- 기존 방공망으로 요격 불가 주장`,
    specs:{ range:'5,000~5,500km(추정)', speed:'마하 10+(탄두)', propulsion:'고체로켓(RS-26 계열)', firstDeployed:'2024년 11월(실전)', warhead:'핵/재래식 양용', guidance:'관성항법+기동탄두' },
    confidence:55, lastUpdated:'2026-06-27', relatedIntelIds:[], tags:['오레쉬닉','러시아','극초음속','실전사용2024'], sources:['Wikipedia','Reuters','Russian MOD'],
  },

  // ════════════════════════════════════════════════════════
  // 이스라엘 (ISRAEL) — 추가
  // ════════════════════════════════════════════════════════

  {
    id:'w-isr-w01', name:'데이비드 슬링', nameEng:'David\'s Sling (Magic Wand)',
    category:'SAM', origin:'ISRAEL', status:'OPERATIONAL', threatRating:'MED',
    description:'이스라엘-미국 공동개발 중거리 방공체계. 스터너 요격미사일. 탄도·순항미사일 요격.',
    detail:`## 데이비드 슬링 (David\'s Sling)\n\nIAI/엘타와 레이시온이 공동 개발한 중거리 방공체계. 이란·헤즈볼라의 중거리 미사일 및 순항미사일 위협에 대응.\n\n### 주요 제원\n- 요격 범위: 40~300km\n- 요격 고도: 15~45km\n- 요격미사일: Stunner (소형, 고기동)\n- 2017년 작전배치, 2024년 레바논전 실전 사용`,
    specs:{ range:'40~300km', altitude:'15~45km', speed:'마하 6+(스터너)', guidance:'능동레이더+적외선', firstDeployed:'2017년', manufacturer:'IAI/라파엘+레이시온', accuracy:'실전검증(2024)' },
    confidence:95, lastUpdated:'2026-06-27', relatedIntelIds:[], tags:['데이비드슬링','이스라엘','방공','Stunner'], sources:['Wikipedia','IDF','Rafael'],
  },
  {
    id:'w-isr-w02', name:'하피 드론 (자폭 UAV)', nameEng:'IAI Harop Loitering Munition',
    category:'UAV', origin:'ISRAEL', status:'OPERATIONAL', threatRating:'HIGH',
    description:'이스라엘 IAI 배회형 자폭 탄약. 레이더 방사 탐지·자폭. 아제르바이잔이 카라바흐 전쟁 사용.',
    detail:`## IAI Harop 자폭 드론\n\nIAI(이스라엘 항공우주산업)이 개발한 배회형 자폭 탄약(Loitering Munition). 적 레이더 방사 신호를 자동 추적·자폭.\n\n### 주요 제원\n- 체공 시간: 6시간+\n- 사거리: 1,000km\n- 탄두: 23kg\n- 수동·자동 혼합 운용\n- 아제르바이잔: 2020년 카라바흐 전쟁에서 아르메니아 방공망 파괴에 결정적 역할`,
    specs:{ range:'1,000km', speed:'417km/h', payload:'23kg', length:'2.5m', weight:'135kg', propulsion:'터보제트', ceiling:'4,500m', firstDeployed:'2009년', manufacturer:'IAI(이스라엘 항공우주산업)' },
    confidence:92, lastUpdated:'2026-06-27', relatedIntelIds:[], tags:['Harop','자폭드론','배회형탄약','이스라엘'], sources:['Wikipedia','IAI'],
  },

  // ════════════════════════════════════════════════════════
  // 우크라이나 (UKRAINE)
  // ════════════════════════════════════════════════════════

  {
    id:'w-ukr-w01', name:'R-360 넵튠 대함미사일', nameEng:'R-360 Neptune Anti-Ship Cruise Missile',
    category:'SSM', origin:'UKRAINE', status:'OPERATIONAL', threatRating:'HIGH',
    description:'2022년 4월 러시아 기함 모스크바함 격침. 사거리 300km 대함 순항미사일.',
    detail:`## R-360 Neptune\n\n우크라이나 루츠 설계국이 개발한 대함 순항미사일. 2022년 4월 13일 러시아 흑해함대 기함 모스크바(12,000톤)를 격침시켜 세계를 놀라게 했다.\n\n### 주요 제원 (Wikipedia)\n- 사거리: 280~300km\n- 속도: 마하 0.85 (900km/h)\n- 탄두: 150kg 관통탄두\n- 유도: INS + 능동레이더 탐색기\n- 해면 비행(저고도)\n- CEP: 10m 이내\n\n### 역사적 전과\n모스크바함 격침은 흑해 전략 균형을 바꿨으며, 유도 대함미사일의 현대전 효과를 증명.`,
    specs:{ range:'300km', speed:'마하 0.85', payload:'150kg 관통탄두', length:'5.05m', weight:'870kg', propulsion:'터보제트+고체부스터', guidance:'INS+능동레이더', accuracy:'CEP 10m', firstDeployed:'2020년', manufacturer:'루츠 설계국' },
    confidence:99, lastUpdated:'2026-06-27', relatedIntelIds:[], tags:['넵튠','대함미사일','우크라이나','모스크바격침'], sources:['Wikipedia','Ukrainian MOD'],
  },

  // ════════════════════════════════════════════════════════
  // 폴란드 (추가 — K2·K9 수출 수령국)
  // ════════════════════════════════════════════════════════

  {
    id:'w-pol-w01', name:'K2PL 흑표 (폴란드)', nameEng:'K2PL Black Panther (Poland)',
    category:'GROUND', origin:'ROK', status:'OPERATIONAL', threatRating:'HIGH',
    description:'폴란드 K2 흑표 수출형. 2025년 11월까지 180대 납품 완료. 한-폴 방산협력 핵심.',
    detail:`## K2PL 흑표 (폴란드 운용)\n\n한국 현대로템의 K2 흑표를 폴란드에 수출한 버전. 2022년 계약, 2025년 11월까지 180대 납품 완료. 폴란드는 추가 820대 K2PL을 자국 생산 예정.\n\n### 주요 특징\n- 기존 K2 제원과 동일\n- 폴란드 현지화(PL-01 파생형 목표)\n- 나토 표준 통신·암호화 장비 통합\n- 폴란드 방산 자립화 기반 계약`,
    specs:{ range:'450km', speed:'70km/h', weight:'56,000kg', length:'10.8m', crew:'3명', propulsion:'1,500hp 디젤', armament:'120mm 활강포+12.7mm HMG', firstDeployed:'2022년(폴란드)', manufacturer:'현대로템', quantity:'180대 납품(2025년 11월 기준)' },
    confidence:98, lastUpdated:'2026-06-27', relatedIntelIds:[], tags:['K2PL','폴란드','K방산수출','흑표'], sources:['Wikipedia','Hyundai Rotem','Polish MOD'],
  },

  // ════════════════════════════════════════════════════════
  // 인도 (INDIA) — 추가
  // ════════════════════════════════════════════════════════

  {
    id:'w-ind-w01', name:'아스트라 Mk2 AAM', nameEng:'Astra Mk2 Beyond Visual Range AAM',
    category:'AAM', origin:'INDIA', status:'TESTING', threatRating:'MED',
    description:'인도 독자개발 초시거리 공대공 미사일. 사거리 160km. 테자스·SU-30MKI 탑재.',
    detail:`## Astra Mk2 BVR AAM\n\nDRDO(인도국방연구개발기구)가 개발 중인 초시거리 공대공 미사일. AIM-120 AMRAAM, PL-15와 경쟁하는 수준을 목표로 한다.\n\n### 주요 제원\n- 사거리: 160km (Mk2)\n- 속도: 마하 4.5+\n- 능동레이더 탐색기\n- 테자스 Mk1A·Su-30MKI 탑재`,
    specs:{ range:'160km(Mk2)', speed:'마하 4.5+', guidance:'능동레이더+INS', firstDeployed:'2024년(시험)', manufacturer:'DRDO·BDL' },
    confidence:72, lastUpdated:'2026-06-27', relatedIntelIds:[], tags:['Astra','인도','BVR','공대공'], sources:['Wikipedia','DRDO'],
  },

  // ════════════════════════════════════════════════════════
  // 이란 (IRAN) — 추가
  // ════════════════════════════════════════════════════════

  {
    id:'w-irn-w01', name:'파테 360 (Fateh-360)', nameEng:'Fateh-360 Short-Range Ballistic Missile',
    category:'SRBM', origin:'IRAN', status:'OPERATIONAL', threatRating:'HIGH',
    description:'이란 최신 정밀 SRBM. 사거리 700km, CEP 50m. 헤즈볼라·후티에 수출.',
    detail:`## Fateh-360\n\n이란이 개발한 Fateh 계열 최신 단거리 탄도미사일. 이스라엘·사우디를 직접 위협하며 헤즈볼라와 예멘 후티 반군에 공급되고 있다.\n\n### 주요 제원\n- 사거리: 700km\n- CEP: 50m 이내\n- 고체연료·즉각 발사\n- 이란혁명수비대(IRGC) 운용`,
    specs:{ range:'700km', speed:'마하 3.5', payload:'650kg', propulsion:'고체로켓', guidance:'INS+GPS+광학', accuracy:'CEP 50m', firstDeployed:'2020년경', manufacturer:'이란 SHIG', warhead:'재래식' },
    confidence:85, lastUpdated:'2026-06-27', relatedIntelIds:[], tags:['Fateh-360','이란','SRBM','헤즈볼라'], sources:['Wikipedia','IISS'],
  },
]
