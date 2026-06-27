import type { WeaponSystem } from './weapons'

export const WEAPONS_WORLD: WeaponSystem[] = [

  // ══════════════════════════════════════════════
  // 미국 (USA)
  // ══════════════════════════════════════════════
  {
    id:'w-usa-003', name:'F-35A 라이트닝 II', nameEng:'F-35A Lightning II', designation:'F-35A',
    category:'AIRCRAFT', origin:'USA', status:'OPERATIONAL', threatRating:'HIGH',
    description:'미국 록히드마틴 5세대 스텔스 다목적 전투기. 한국공군 도입 확정 (F-35A 40대).',
    detail:`## F-35A Lightning II\n\n록히드 마틴이 개발한 5세대 단발 스텔스 다목적 전투기. 미 공군의 주력 전투기로 40개국 이상이 운용하거나 도입 예정이다.\n\n### 주요 특징\n- RCS 0.001㎡급 스텔스 설계\n- AN/APG-81 AESA 레이더\n- EW 시스템 내장 (자체 재밍)\n- EOTS·DAS 360도 상황인식\n- 최대 8.1톤 내외 탑재량\n\n### 한반도 관련성\n한국공군 F-35A 40대 도입, 청주기지 운용 중. 북한 방공망 돌파 및 정밀타격 핵심 전력.`,
    specs:{ range:'2,200km(전투행동반경)', speed:'마하 1.6', payload:'8,100kg', length:'15.7m', weight:'13,300kg', propulsion:'F135-PW-100 터보팬', guidance:'GPS/INS/레이저', ceiling:'15,240m', crew:'1명', firstDeployed:'2015년', manufacturer:'록히드 마틴', armament:'AIM-120/AIM-9X/JDAM/SDB' },
    confidence:98, lastUpdated:'2026-05-01', relatedIntelIds:[], tags:['스텔스','5세대','F-35','미공군'], sources:['USAF','Lockheed Martin','Jane\'s'],
  },
  {
    id:'w-usa-004', name:'F-22 랩터', nameEng:'F-22 Raptor', designation:'F-22A',
    category:'AIRCRAFT', origin:'USA', status:'OPERATIONAL', threatRating:'HIGH',
    description:'미국 최고 5세대 공중우세 전투기. 초음속 순항(슈퍼크루즈) 능력 보유.',
    detail:`## F-22 Raptor\n\n록히드 마틴·보잉이 공동 개발한 세계 최초 5세대 전투기. 공중우세에 특화되었으며 185대가 생산되었다.\n\n### 주요 특징\n- AN/APG-77(v)1 AESA 레이더\n- 슈퍼크루즈 마하 1.82\n- 추력편향 노즐로 초기동성\n- 내부 무장창 3개\n\n### 한반도 관련성\n유사 시 오산·군산 등 한반도 전개 가능. 북한 방공망 무력화 임무 수행.`,
    specs:{ range:'2,960km', speed:'마하 2.25', payload:'2,270kg(내부)', length:'18.9m', weight:'19,700kg', propulsion:'F119-PW-100 ×2', ceiling:'19,812m', crew:'1명', firstDeployed:'2005년', manufacturer:'록히드 마틴', armament:'AIM-120/AIM-9/M61A2 20mm' },
    confidence:95, lastUpdated:'2026-04-01', relatedIntelIds:[], tags:['스텔스','공중우세','슈퍼크루즈'], sources:['USAF','GAO'],
  },
  {
    id:'w-usa-005', name:'B-2 스피릿', nameEng:'B-2 Spirit', designation:'B-2A',
    category:'AIRCRAFT', origin:'USA', status:'OPERATIONAL', threatRating:'CRITICAL',
    description:'미국 전익기형 핵·재래식 스텔스 폭격기. 21대 생산, 핵억제 핵심 전력.',
    detail:`## B-2 Spirit\n\n노스롭 그루먼이 개발한 전익기형 스텔스 전략폭격기. 핵폭탄과 재래식 정밀유도폭탄 모두 탑재 가능하다.\n\n### 주요 특징\n- RCS 0.1㎡이하 극비스텔스\n- 사정거리 11,000km 이상(공중급유 무제한)\n- 핵폭탄 B61/B83 탑재 가능\n- 소직경폭탄(SDB) 80발 탑재 가능\n\n### 한반도 관련성\n한반도 긴장 고조 시 괌에서 전개. 대북 확장억제 시위 임무 수행.`,
    specs:{ range:'11,100km', speed:'마하 0.95', payload:'23,000kg', length:'20.9m', weight:'71,700kg', propulsion:'F118-GE-100 ×4', ceiling:'15,200m', crew:'2명', firstDeployed:'1997년', manufacturer:'노스롭 그루먼', armament:'B61핵폭탄/B83/JDAM/SDB II' },
    confidence:90, lastUpdated:'2026-03-01', relatedIntelIds:[], tags:['스텔스','폭격기','핵폭격'], sources:['USAF','DoD'],
  },
  {
    id:'w-usa-006', name:'B-21 레이더', nameEng:'B-21 Raider',
    category:'AIRCRAFT', origin:'USA', status:'TESTING', threatRating:'CRITICAL',
    description:'미국 차세대 스텔스 전략폭격기. B-2 후계기. 2025년부터 전력화 예정.',
    detail:`## B-21 Raider\n\n노스롭 그루먼의 차세대 원거리 스텔스 폭격기. B-2를 대체하며 최대 100대 생산 예정이다.\n\n### 주요 특징\n- 6세대 스텔스 기술 적용\n- 핵·재래식 양용 폭격 능력\n- 유인·무인 겸용 운용 가능\n- 개방형 구조(Open Architecture)\n\n### 전략적 의미\n인도태평양 지역 거부작전 핵심 전력. 중국 A2/AD 돌파 능력.`,
    specs:{ range:'9,000km 이상', speed:'마하 0.9 이상', payload:'미공개', length:'미공개', weight:'미공개', propulsion:'미공개(터보팬 추정)', firstDeployed:'2025~2026년(예정)', manufacturer:'노스롭 그루먼', armament:'핵·재래식 정밀유도폭탄' },
    confidence:55, lastUpdated:'2026-04-01', relatedIntelIds:[], tags:['스텔스','차세대폭격기','6세대'], sources:['USAF','DefenseNews'],
  },
  {
    id:'w-usa-007', name:'MQ-9 리퍼', nameEng:'MQ-9 Reaper',
    category:'UAV', origin:'USA', status:'OPERATIONAL', threatRating:'HIGH',
    description:'미국 주력 무장 공격 드론. 장시간 체공·정밀타격 능력 보유. 한반도 정찰 운용.',
    detail:`## MQ-9 Reaper\n\n제너럴 아토믹스가 개발한 대형 무장 UAV. 중고도 장시간 체공(MALE) 드론으로 정찰·공격 임무를 수행한다.\n\n### 주요 특징\n- 최대 27시간 체공\n- 헬파이어 미사일 14발 탑재\n- MTS-B 광학·적외선 카메라\n- 위성통신 기반 원격 운용\n\n### 한반도 관련성\n오산기지 등 한반도 인근 운용. 북한 이동식 발사대 추적·감시.`,
    specs:{ range:'5,926km', speed:'482km/h', payload:'1,700kg', length:'11m', weight:'4,760kg', propulsion:'터보프롭 900hp', ceiling:'15,240m', firstDeployed:'2007년', manufacturer:'제너럴 아토믹스', armament:'AGM-114 헬파이어×14/GBU-12' },
    confidence:98, lastUpdated:'2026-04-01', relatedIntelIds:[], tags:['드론','MALE','정찰','공격'], sources:['USAF','GA-ASI'],
  },
  {
    id:'w-usa-008', name:'RQ-4 글로벌호크', nameEng:'RQ-4 Global Hawk',
    category:'UAV', origin:'USA', status:'OPERATIONAL', threatRating:'MED',
    description:'미국 고고도 장시간 전략 정찰 드론. 한반도 24시간 정밀 감시 임무 수행.',
    detail:`## RQ-4 Global Hawk\n\n노스롭 그루먼이 개발한 고고도 전략 정찰 UAV. 24시간 이상 체공하며 광역 지역을 정밀 감시한다.\n\n### 주요 특징\n- 고도 18km에서 운용\n- SAR·EO·IR 복합 센서\n- 100,000㎢ 이상/일 촬영\n- 0.3m 해상도 영상 제공\n\n### 한반도 관련성\n오산기지 등에서 운용. 북한 핵·미사일 시설 실시간 감시.`,
    specs:{ range:'22,780km', speed:'575km/h', payload:'1,360kg', length:'13.5m', weight:'14,628kg', propulsion:'AE3007H 터보팬', ceiling:'18,288m', firstDeployed:'2001년', manufacturer:'노스롭 그루먼', armament:'없음(순수정찰)' },
    confidence:98, lastUpdated:'2026-04-01', relatedIntelIds:[], tags:['드론','전략정찰','고고도'], sources:['USAF'],
  },
  {
    id:'w-usa-009', name:'BGM-109 토마호크', nameEng:'BGM-109 Tomahawk',
    category:'CRUISE', origin:'USA', status:'OPERATIONAL', threatRating:'HIGH',
    description:'미국 함발·잠발 장거리 순항미사일. 걸프전 이후 모든 미 주요 작전에 사용.',
    detail:`## BGM-109 Tomahawk\n\n레이시온이 제조하는 장거리 순항미사일. 1991년 걸프전 이후 미군의 대표적 원거리 정밀타격 수단이다.\n\n### 주요 특징\n- TERCOM/DSMAC/GPS 복합 유도\n- 사거리 Block V 기준 1,900km\n- CEP 5~10m\n- 함정·잠수함 발사 가능\n\n### 한반도 관련성\n유사 시 이지스함·잠수함에서 발사, 북한 지휘소·미사일 기지 정밀타격 가능.`,
    specs:{ range:'1,900km(Block V)', speed:'마하 0.75(880km/h)', payload:'450kg(WDU-36)', length:'5.56m', weight:'1,590kg', propulsion:'F107-WR-402 터보팬', guidance:'GPS/TERCOM/DSMAC', warhead:'재래식 450kg/핵(퇴역)', firstDeployed:'1983년', manufacturer:'레이시온', accuracy:'CEP 5~10m' },
    confidence:98, lastUpdated:'2026-05-01', relatedIntelIds:[], tags:['순항미사일','함발','정밀타격'], sources:['US Navy','Raytheon'],
  },
  {
    id:'w-usa-010', name:'M270 HIMARS', nameEng:'M270 HIMARS',
    category:'MLRS', origin:'USA', status:'OPERATIONAL', threatRating:'HIGH',
    description:'미국 고기동 다연장 로켓 시스템. 우크라이나 전쟁에서 결정적 전과 달성.',
    detail:`## M270 / M142 HIMARS\n\n록히드 마틴의 고기동 다연장로켓 시스템. M142는 6발, M270은 12발 발사 가능하다.\n\n### 주요 특징\n- GMLRS 사거리 85km\n- ATACMS 사거리 300km\n- C-130 공중수송 가능(M142)\n- GPS+INS 유도, CEP 5m 이내\n\n### 한반도 관련성\n한국군도 K239 천무를 운용. 북한 장사정포 대응 핵심 전력.`,
    specs:{ range:'300km(ATACMS)', speed:'85km/h(차량)', payload:'GMLRS×6발(M142)', length:'7m(차량)', weight:'16,257kg(M142)', propulsion:'차량(M270)/카트리지로켓', guidance:'GPS/INS', accuracy:'CEP 5m', firstDeployed:'1983년', manufacturer:'록히드 마틴' },
    confidence:98, lastUpdated:'2026-04-01', relatedIntelIds:[], tags:['다연장로켓','HIMARS','ATACMS'], sources:['US Army','Lockheed Martin'],
  },
  {
    id:'w-usa-011', name:'패트리엇 PAC-3', nameEng:'Patriot PAC-3', designation:'MIM-104F',
    category:'SAM', origin:'USA', status:'OPERATIONAL', threatRating:'MED',
    description:'미국 장거리 지대공 미사일 체계. 탄도미사일 요격 핵심 수단. 한국군 운용.',
    detail:`## Patriot PAC-3\n\n레이시온이 제조하는 장거리 지대공 미사일 체계. PAC-3는 HIT-TO-KILL 방식으로 탄도미사일을 직접 충돌 요격한다.\n\n### 주요 특징\n- 탄도미사일 요격 고도 15~40km\n- AN/MPQ-65 레이더\n- 1개 포대당 미사일 32발\n- PAC-3 MSE 사거리 35km\n\n### 한반도 관련성\n주한미군 및 한국군 운용. 북한 SRBM/MRBM 방어 최전선.`,
    specs:{ range:'35km(PAC-3 MSE)', speed:'마하 5 이상', altitude:'15~40km(요격)', weight:'312kg/발', guidance:'능동레이더/INS', firstDeployed:'2003년(PAC-3)', manufacturer:'레이시온/MBDA', accuracy:'Hit-to-Kill' },
    confidence:98, lastUpdated:'2026-04-01', relatedIntelIds:[], tags:['지대공','미사일방어','요격'], sources:['US Army','Raytheon'],
  },
  {
    id:'w-usa-012', name:'THAAD', nameEng:'Terminal High Altitude Area Defense',
    category:'SAM', origin:'USA', status:'OPERATIONAL', threatRating:'MED',
    description:'미 육군 고고도 지역 방어 체계. 경북 성주 배치로 한반도 방어 핵심 역할.',
    detail:`## THAAD\n\n록히드 마틴이 개발한 종말단계 고고도 지역방어 체계. 경북 성주에 배치되어 한반도 탄도미사일 방어 임무 수행 중이다.\n\n### 주요 특징\n- 요격고도 40~150km\n- 사거리 200km\n- AN/TPY-2 X-Band 레이더\n- Hit-to-Kill 직격 요격\n\n### 한반도 관련성\n2017년 성주 배치. 북한 ICBM/IRBM 종말단계 방어.`,
    specs:{ range:'200km', altitude:'40~150km', speed:'마하 8.24', weight:'900kg/발', guidance:'적외선 탐색기+INS', firstDeployed:'2008년', manufacturer:'록히드 마틴', accuracy:'Hit-to-Kill' },
    confidence:98, lastUpdated:'2026-04-01', relatedIntelIds:[], tags:['미사일방어','THAAD','고고도요격'], sources:['MDA','Lockheed Martin'],
  },
  {
    id:'w-usa-013', name:'버지니아급 핵잠수함', nameEng:'Virginia-class SSN',
    category:'SUBMARINE', origin:'USA', status:'OPERATIONAL', threatRating:'CRITICAL',
    description:'미국 최신예 공격핵잠수함. 대함·대지 정밀타격 능력. 한반도 주변 상시 배치.',
    detail:`## Virginia-class SSN\n\n제너럴 다이나믹스·헌팅턴 잉갈스가 공동 건조하는 미 해군의 주력 공격핵잠수함이다.\n\n### 주요 특징\n- 토마호크 40발 탑재(Block V VPM)\n- AN/BQQ-10 소나 시스템\n- 핵 추진으로 무제한 항속\n- MK48 ADCAP 어뢰 운용\n\n### 한반도 관련성\n서해·동해 상시 배치. 북한 함대·시설 대상 선제타격 능력.`,
    specs:{ displacement:'10,200톤(수중)', range:'무제한(핵추진)', speed:'25노트 이상', length:'114.9m', crew:'135명', propulsion:'S9G 원자로', armament:'토마호크×40/MK48어뢰×26', firstDeployed:'2004년', manufacturer:'제너럴 다이나믹스' },
    confidence:95, lastUpdated:'2026-04-01', relatedIntelIds:[], tags:['핵잠수함','공격잠수함','SSN'], sources:['US Navy','GDEB'],
  },
  {
    id:'w-usa-014', name:'제럴드 R. 포드급 항공모함', nameEng:'Gerald R. Ford-class CVN',
    category:'NAVAL', origin:'USA', status:'OPERATIONAL', threatRating:'CRITICAL',
    description:'미국 최신 핵추진 항공모함. 한반도 위기 시 서태평양 전개로 억제력 시현.',
    detail:`## Gerald R. Ford CVN-78\n\n헌팅턴 잉갈스가 건조한 미 해군의 최신 슈퍼항공모함 급이다. 전자기 캐터펄트(EMALS)를 최초 적용했다.\n\n### 주요 특징\n- EMALS 전자기 캐터펄트\n- 항공기 75대 탑재\n- 핵추진 무제한 항속\n- RIM-162 ESSM/CIWS 탑재\n\n### 한반도 관련성\n위기 시 F/A-18, F-35C, EA-18G 투입. 북한 전역 정밀타격 및 공중우세 확보.`,
    specs:{ displacement:'100,000톤', range:'무제한(핵추진)', speed:'30노트 이상', length:'337m', crew:'4,539명', propulsion:'A1B 원자로×2', armament:'F/A-18E/F/F-35C×75대+', firstDeployed:'2017년', manufacturer:'헌팅턴 잉갈스' },
    confidence:95, lastUpdated:'2026-04-01', relatedIntelIds:[], tags:['항공모함','핵추진','CVN'], sources:['US Navy','HII'],
  },
  {
    id:'w-usa-015', name:'M1A2 SEP 에이브람스', nameEng:'M1A2 SEPv3 Abrams',
    category:'GROUND', origin:'USA', status:'OPERATIONAL', threatRating:'HIGH',
    description:'미국 주력 전차. 복합장갑+120mm 주포. 주한미군 운용.',
    detail:`## M1A2 SEPv3 Abrams\n\n제너럴 다이나믹스 랜드 시스템이 제조하는 미국의 3.5세대 주력전차. SEPv3는 사이버 보안 강화·전력관리 시스템 개선 버전이다.\n\n### 주요 특징\n- 120mm M256 활강포\n- 복합장갑(초밥공복합)+ERA\n- 1,500마력 가스터빈 엔진\n- Trophy APS 장착 가능\n\n### 한반도 관련성\n주한미군 2사단 운용. 북한 기갑부대 격퇴 핵심 전력.`,
    specs:{ range:'426km', speed:'67km/h', weight:'66,756kg', length:'9.77m', crew:'4명', propulsion:'AGT1500 가스터빈 1,500hp', armament:'120mm M256×42발+M2 12.7mm', firstDeployed:'1980년(M1)', manufacturer:'제너럴 다이나믹스' },
    confidence:98, lastUpdated:'2026-03-01', relatedIntelIds:[], tags:['전차','MBT','에이브람스'], sources:['US Army','GDLS'],
  },
  {
    id:'w-usa-016', name:'AGM-158 JASSM-ER', nameEng:'AGM-158B JASSM-ER',
    category:'ASM', origin:'USA', status:'OPERATIONAL', threatRating:'HIGH',
    description:'미국 공중발사 장거리 순항미사일. 스텔스 설계로 방공망 돌파 특화.',
    detail:`## AGM-158B JASSM-ER\n\n록히드 마틴이 개발한 스텔스 공중발사 순항미사일(ALCM). ER 버전은 사거리 925km 이상.\n\n### 주요 특징\n- 스텔스 저RCS 설계\n- 사거리 925km 이상\n- INS+GPS+적외선 영상 탐색기\n- CEP 3m 이내\n- F-35, B-1B, F/A-18 탑재`,
    specs:{ range:'925km 이상', speed:'마하 0.85', payload:'450kg 관통탄두', length:'4.27m', weight:'975kg', guidance:'INS/GPS/IIR', accuracy:'CEP 3m', firstDeployed:'2014년', manufacturer:'록히드 마틴' },
    confidence:90, lastUpdated:'2026-04-01', relatedIntelIds:[], tags:['공대지','스텔스미사일','JASSM'], sources:['USAF','Lockheed Martin'],
  },
  {
    id:'w-usa-017', name:'AH-64E 아파치 가디언', nameEng:'AH-64E Apache Guardian',
    category:'HELICOPTER', origin:'USA', status:'OPERATIONAL', threatRating:'HIGH',
    description:'미국 주력 공격헬기. 한국 육군 도입. 대전차·근접지원 핵심 전력.',
    detail:`## AH-64E Apache Guardian\n\n보잉이 제조하는 미국의 주력 공격헬기. E형은 강화된 항전 시스템과 무인기 통제 능력을 갖는다.\n\n### 주요 특징\n- AGM-114 헬파이어×16발\n- 70mm 하이드라 로켓\n- M230 30mm 체인건\n- FLIR/레이저 조준 시스템\n- 무인기 통제 능력`,
    specs:{ range:'476km', speed:'296km/h', payload:'771kg', length:'17.73m', weight:'8,006kg', propulsion:'GE T700-701D ×2', crew:'2명', armament:'헬파이어×16/하이드라70/M230 30mm', firstDeployed:'1986년(A)', manufacturer:'보잉' },
    confidence:98, lastUpdated:'2026-03-01', relatedIntelIds:[], tags:['공격헬기','아파치','대전차'], sources:['US Army','Boeing'],
  },

  // ══════════════════════════════════════════════
  // 러시아 (RUSSIA)
  // ══════════════════════════════════════════════
  {
    id:'w-rus-001', name:'Su-57 펠론', nameEng:'Su-57 Felon', designation:'T-50/PAK FA',
    category:'AIRCRAFT', origin:'RUSSIA', status:'OPERATIONAL', threatRating:'HIGH',
    description:'러시아 5세대 스텔스 전투기. 제한적 실전배치. 소량 생산 중.',
    detail:`## Su-57 Felon\n\n수호이가 개발한 러시아 최초 5세대 스텔스 전투기. 2020년부터 소량이 실전배치되었으나 생산 속도가 느리다.\n\n### 주요 특징\n- 전방위 스텔스 설계\n- Sh121 능동위상배열(AESA) 레이더\n- 초기동성 3D 추력편향\n- 내부 무장창 운용\n- 极초음속 미사일 Kh-47M2 운반 가능`,
    specs:{ range:'3,500km', speed:'마하 2.0', payload:'10,000kg', length:'20.1m', weight:'18,500kg', propulsion:'AL-41F1 ×2 또는 Izdeliye 30', ceiling:'20,000m', crew:'1명', firstDeployed:'2020년', manufacturer:'수호이', armament:'R-77M/R-73/Kh-35/Kh-59' },
    confidence:72, lastUpdated:'2026-04-01', relatedIntelIds:[], tags:['5세대','스텔스','러시아'], sources:['IISS','Janes'],
  },
  {
    id:'w-rus-002', name:'Tu-160M2 블랙잭', nameEng:'Tu-160M2 Blackjack', designation:'Tu-160M2',
    category:'AIRCRAFT', origin:'RUSSIA', status:'OPERATIONAL', threatRating:'CRITICAL',
    description:'러시아 최대 전략폭격기. 핵순항미사일 운반. 가변익 초음속 설계.',
    detail:`## Tu-160M2 Blackjack\n\n투폴레프가 설계한 가변익 초음속 전략폭격기. 세계 최대의 전투기이자 가장 빠른 폭격기다.\n\n### 주요 특징\n- 최고속도 마하 2.05\n- Kh-55/Kh-102 핵순항미사일 탑재\n- 사거리 12,000km\n- 2022년부터 현대화 M2 생산 재개\n\n### 전략적 의미\n러시아 핵3원 공중 전력의 주축. 비행코스에 따라 한반도 타격 가능.`,
    specs:{ range:'12,000km', speed:'마하 2.05', payload:'45,000kg', length:'54.1m', weight:'267,600kg', propulsion:'NK-32 터보팬×4', crew:'4명', firstDeployed:'1987년', manufacturer:'투폴레프', armament:'Kh-55/Kh-102 핵순항미사일×12발' },
    confidence:85, lastUpdated:'2026-04-01', relatedIntelIds:[], tags:['전략폭격기','핵폭격기','가변익'], sources:['IISS','Janes'],
  },
  {
    id:'w-rus-003', name:'Kh-47M2 킨잘', nameEng:'Kh-47M2 Kinzhal',
    category:'ASM', origin:'RUSSIA', status:'OPERATIONAL', threatRating:'CRITICAL',
    description:'러시아 공중발사 극초음속 탄도미사일. 마하 10 이상, 요격 불가 주장.',
    detail:`## Kh-47M2 Kinzhal\n\n러시아가 개발한 공중발사 극초음속 탄도미사일. Iskander 미사일을 공중발사형으로 개조한 것으로 알려져 있다.\n\n### 주요 특징\n- 속도 마하 10 이상\n- 사거리 2,000km 이상\n- MiG-31K/Tu-22M3 탑재\n- 기동탄두(MaRV) 탑재 추정\n- 재래식·핵 양용 가능\n\n### 한반도 위협\n러시아 극동 기지에서 한반도 전역 타격 가능.`,
    specs:{ range:'2,000km 이상', speed:'마하 10+', payload:'재래식·핵 양용', length:'7~8m(추정)', weight:'4,300kg(추정)', propulsion:'고체로켓+관성비행', guidance:'INS+GPS+기동탄두', warhead:'핵/재래식 선택', firstDeployed:'2018년', manufacturer:'이스칸데르 개조' },
    confidence:70, lastUpdated:'2026-04-01', relatedIntelIds:[], tags:['극초음속','공대지','킨잘'], sources:['TASS','IISS','Janes'],
  },
  {
    id:'w-rus-004', name:'9M723 이스칸데르-M', nameEng:'9M723 Iskander-M', designation:'SS-26 Stone',
    category:'SRBM', origin:'RUSSIA', status:'OPERATIONAL', threatRating:'HIGH',
    description:'러시아 전술 탄도미사일. 저고도 비행으로 요격 어려움. 칼리닌그라드 배치.',
    detail:`## 9M723 Iskander-M\n\n콜롬나 기계설계국이 개발한 러시아의 주력 단거리 탄도미사일 체계. 기동탄두로 MD 회피.\n\n### 주요 특징\n- 사거리 500km\n- 비행 최고점 50km(저고도 탄도)\n- 기동탄두(MaRV)로 요격 회피\n- CEP 5~7m 초정밀\n- 이동식 TEL 발사`,
    specs:{ range:'500km', speed:'마하 6~7', payload:'700~750kg', length:'7.3m', weight:'3,800kg', propulsion:'고체로켓', guidance:'INS+DSMAC+레이더', accuracy:'CEP 5~7m', firstDeployed:'2006년', manufacturer:'KBM' },
    confidence:92, lastUpdated:'2026-04-01', relatedIntelIds:[], tags:['단거리탄도','이스칸데르','전술미사일'], sources:['IISS','Janes'],
  },
  {
    id:'w-rus-005', name:'S-500 프로메테우스', nameEng:'S-500 Prometheus', designation:'55R6M',
    category:'SAM', origin:'RUSSIA', status:'OPERATIONAL', threatRating:'CRITICAL',
    description:'러시아 차세대 방공 체계. ICBM·MIRV·극초음속 미사일 요격 주장.',
    detail:`## S-500 Prometheus\n\n알마즈-안테이가 개발한 러시아의 최신 전략방공 체계. S-400의 후속으로 탄도미사일과 극초음속 미사일 요격 능력을 갖는다.\n\n### 주요 특징\n- 사거리 600km 이상\n- 요격 고도 200km\n- ICBM 종말 단계 요격 주장\n- 동시 교전 10개 표적\n- 5세대 스텔스 전투기 탐지 주장`,
    specs:{ range:'600km 이상', altitude:'200km', speed:'마하 20(요격미사일)', guidance:'능동레이더', firstDeployed:'2021년(실험적)', manufacturer:'알마즈-안테이', accuracy:'요격성공률 미공개' },
    confidence:55, lastUpdated:'2026-04-01', relatedIntelIds:[], tags:['지대공','S-500','미사일방어'], sources:['TASS','IISS'],
  },
  {
    id:'w-rus-006', name:'3M22 지르콘', nameEng:'3M22 Zircon', designation:'P-800 개량형',
    category:'CRUISE', origin:'RUSSIA', status:'OPERATIONAL', threatRating:'CRITICAL',
    description:'러시아 함발 극초음속 순항미사일. 마하 9, 항공모함 킬러.',
    detail:`## 3M22 Zircon\n\n러시아가 개발한 함정 발사 극초음속 순항미사일. 2021년 시험 완료, 2022년 실전배치되었다.\n\n### 주요 특징\n- 마하 9 속도\n- 사거리 1,000km\n- 스크램젯 추진\n- 항공모함 킬러 개념\n- 수상함·잠수함 발사 가능`,
    specs:{ range:'1,000km', speed:'마하 9', payload:'미공개', length:'8~10m(추정)', weight:'미공개', propulsion:'스크램젯', guidance:'INS+능동레이더', firstDeployed:'2022년', manufacturer:'NPO 마쉬노스트로에니야' },
    confidence:65, lastUpdated:'2026-04-01', relatedIntelIds:[], tags:['극초음속','함발','지르콘'], sources:['TASS','Janes'],
  },
  {
    id:'w-rus-007', name:'RS-28 사르마트', nameEng:'RS-28 Sarmat', designation:'SS-X-30 Satan II',
    category:'ICBM', origin:'RUSSIA', status:'TESTING', threatRating:'CRITICAL',
    description:'러시아 신형 액체추진 ICBM. MIRV 15기 탑재, 남극 경유 비행 가능.',
    detail:`## RS-28 Sarmat\n\n마케예프 로켓설계국이 개발한 러시아의 차세대 대형 액체연료 ICBM이다. SS-18 사탄의 후계기.\n\n### 주요 특징\n- 사거리 18,000km(무제한 궤도 비행)\n- MIRV 최대 15기\n- 극초음속 활공탄두(Avangard) 탑재 가능\n- 남극 경유 폭발경로 비행\n- 미국 MD 회피 설계`,
    specs:{ range:'18,000km 이상', payload:'MIRV×15기', propulsion:'액체로켓 2단', weight:'208,100kg', firstDeployed:'2023년(제한적)', manufacturer:'마케예프 로켓설계국', warhead:'핵 MIRV 최대 15발' },
    confidence:60, lastUpdated:'2026-04-01', relatedIntelIds:[], tags:['ICBM','MIRV','사르마트','핵'], sources:['MoD Russia','IISS'],
  },
  {
    id:'w-rus-008', name:'T-14 아르마타', nameEng:'T-14 Armata',
    category:'GROUND', origin:'RUSSIA', status:'DEVELOPMENT', threatRating:'HIGH',
    description:'러시아 차세대 주력전차. 무인포탑·APS 탑재. 소량 생산 중.',
    detail:`## T-14 Armata\n\n우랄바곤자보트가 개발한 러시아의 차세대 전차 플랫폼. 무인 포탑과 능동방호 시스템을 갖추었다.\n\n### 주요 특징\n- 무인 원격포탑 (승무원 격리 캡슐)\n- 125mm 2A82-1M 활강포\n- Afganit APS 능동방호\n- 코런덤-BM 수동장갑\n- 전자전 시스템 통합`,
    specs:{ range:'500km', speed:'80~90km/h', weight:'55,000kg', length:'10.8m', crew:'3명(캡슐)', propulsion:'2A82-1M 1,500hp 디젤', armament:'125mm×45발+Kornet AT미사일', firstDeployed:'실전배치 지연', manufacturer:'우랄바곤자보트' },
    confidence:65, lastUpdated:'2026-04-01', relatedIntelIds:[], tags:['전차','무인포탑','아르마타'], sources:['Janes','IISS'],
  },
  {
    id:'w-rus-009', name:'보레이-A급 SSBN', nameEng:'Borei-A class SSBN', designation:'Project 955A',
    category:'SUBMARINE', origin:'RUSSIA', status:'OPERATIONAL', threatRating:'CRITICAL',
    description:'러시아 최신 전략핵잠수함. Bulava SLBM 16발 탑재. 핵3원 해상 전력.',
    detail:`## Borei-A class SSBN\n\n세베로드빈스크 조선소가 건조하는 러시아의 최신 탄도미사일 핵잠수함.\n\n### 주요 특징\n- RSM-56 Bulava SLBM 16발 탑재\n- 수중 배수량 24,000톤\n- 수중 속도 29노트\n- 소음 저감 설계 (자기소거 시스템)\n- 전투 순항 기간 90일 이상`,
    specs:{ displacement:'24,000톤(수중)', range:'무제한(핵추진)', speed:'29노트(수중)', length:'170m', crew:'107명', propulsion:'OK-650B 원자로', armament:'Bulava SLBM×16발+533mm어뢰', firstDeployed:'2013년', manufacturer:'세베로드빈스크' },
    confidence:80, lastUpdated:'2026-04-01', relatedIntelIds:[], tags:['전략핵잠수함','SSBN','Bulava'], sources:['Russian Navy','Janes'],
  },

  // ══════════════════════════════════════════════
  // 중국 (CHINA)
  // ══════════════════════════════════════════════
  {
    id:'w-chn-002', name:'J-20 위룡', nameEng:'J-20 Mighty Dragon', designation:'J-20A',
    category:'AIRCRAFT', origin:'CHINA', status:'OPERATIONAL', threatRating:'HIGH',
    description:'중국 최초 5세대 스텔스 전투기. 2017년 실전배치. 한반도 인근 배치 가능.',
    detail:`## J-20 Mighty Dragon\n\n청두 항공공업이 개발한 중국 최초의 5세대 스텔스 전투기. 2017년 실전배치 이후 수량을 빠르게 늘리고 있다.\n\n### 주요 특징\n- RCS 저감 스텔스 설계\n- AESA 레이더 탑재\n- PL-15 초장거리 AAM 운용\n- 내부 무장창 4개\n- 엔진 독자화 진행 중`,
    specs:{ range:'2,000km(전투행동반경)', speed:'마하 2.0+', payload:'미공개', length:'20.4m', weight:'19,391kg', propulsion:'WS-10C 또는 AL-31F', ceiling:'20,000m', crew:'1명', firstDeployed:'2017년', manufacturer:'청두 항공공업', armament:'PL-15/PL-10' },
    confidence:78, lastUpdated:'2026-05-01', relatedIntelIds:[], tags:['5세대','스텔스','중국','J-20'], sources:['IISS','Janes'],
  },
  {
    id:'w-chn-003', name:'J-35 (FC-31)', nameEng:'J-35 / FC-31', designation:'J-35A',
    category:'AIRCRAFT', origin:'CHINA', status:'TESTING', threatRating:'HIGH',
    description:'중국 2번째 5세대 스텔스 전투기. 함재기 버전 항모 탑재 예정.',
    detail:`## J-35 (FC-31)\n\n선양 항공공업이 개발한 중국의 두 번째 5세대 전투기. 항공모함 탑재용 함재기 버전이 개발되고 있다.\n\n### 주요 특징\n- 쌍발 엔진 함재기 설계\n- Type 003 항공모함 탑재 예정\n- 스텔스 설계 적용\n- PL-15 내부 탑재`,
    specs:{ range:'1,250km(전투)', speed:'마하 1.8', payload:'미공개', length:'17.3m', weight:'17,500kg(추정)', propulsion:'WS-19 ×2(추정)', firstDeployed:'2024~2025년(예정)', manufacturer:'선양 항공공업', armament:'PL-15/PL-10' },
    confidence:55, lastUpdated:'2026-04-01', relatedIntelIds:[], tags:['5세대','함재기','중국'], sources:['IISS'],
  },
  {
    id:'w-chn-004', name:'DF-17', nameEng:'DF-17', designation:'Dongfeng-17',
    category:'IRBM', origin:'CHINA', status:'OPERATIONAL', threatRating:'CRITICAL',
    description:'중국 극초음속 활공탄두(HGV) 탑재 MRBM. 기존 미사일 방어 체계 무력화.',
    detail:`## DF-17\n\n중국이 개발한 극초음속 활공탄두(DF-ZF HGV)를 탑재한 중거리 탄도미사일이다. 2019년 열병식에서 공개되었다.\n\n### 주요 특징\n- 마하 5~10 극초음속 활공\n- 기동탄두로 MD 회피\n- 사거리 1,800~2,500km\n- 재래식·핵 양용 가능\n\n### 한반도 위협\n중국 내륙에서 한반도 전역 타격 가능.`,
    specs:{ range:'1,800~2,500km', speed:'마하 5~10', payload:'극초음속 활공탄두 HGV', propulsion:'고체로켓+활공단계', guidance:'INS+GPS+기동탄두', warhead:'재래식/핵 양용', firstDeployed:'2019년', manufacturer:'CASIC' },
    confidence:75, lastUpdated:'2026-04-01', relatedIntelIds:[], tags:['극초음속','MRBM','HGV','DF-17'], sources:['IISS','CSIS'],
  },
  {
    id:'w-chn-005', name:'055형 구축함', nameEng:'Type 055 Destroyer', designation:'055형',
    category:'NAVAL', origin:'CHINA', status:'OPERATIONAL', threatRating:'HIGH',
    description:'중국 최대 구축함. 112셀 VLS 탑재. 항공모함 호위 및 지역억제 핵심 전력.',
    detail:`## Type 055 Destroyer\n\n중국 해군 최대 구축함(또는 순양함급). 112셀 VLS에 다양한 미사일을 탑재한다.\n\n### 주요 특징\n- VLS 112셀(HHQ-9B SAM/YJ-18 ASCM)\n- Type 346B AESA 레이더\n- CJ-10K 순항미사일\n- 배수량 12,000~13,000톤\n- 항공모함 전단 호위`,
    specs:{ displacement:'13,000톤(만재)', range:'5,000km', speed:'30노트', length:'180m', crew:'310명', propulsion:'가스터빈+디젤(COGAG)', armament:'HHQ-9B SAM/YJ-18/CJ-10K×112셀', firstDeployed:'2020년', manufacturer:'장난조선소' },
    confidence:82, lastUpdated:'2026-04-01', relatedIntelIds:[], tags:['구축함','055형','VLS','중국'], sources:['IISS','PLAN'],
  },
  {
    id:'w-chn-006', name:'DF-21D', nameEng:'DF-21D', designation:'CSS-5 Mod 4',
    category:'IRBM', origin:'CHINA', status:'OPERATIONAL', threatRating:'CRITICAL',
    description:'세계 최초 대함탄도미사일(ASBM). 항공모함 킬러. 서태평양 지역 접근거부.',
    detail:`## DF-21D ASBM\n\n중국이 개발한 세계 최초의 대함탄도미사일. 이동식 항공모함 추적·타격 능력을 가진다.\n\n### 주요 특징\n- 사거리 1,500~2,000km\n- 기동탄두로 이동 항모 추적\n- CEP 20m 이내 (항모 명중 가능)\n- MaRV 탑재\n\n### 한반도 위협\n한국 인근 해역 작전 항모전단 위협.`,
    specs:{ range:'1,500~2,000km', speed:'마하 10+', payload:'기동탄두 600kg', propulsion:'고체로켓 2단', guidance:'INS+레이더능동/위성연동', accuracy:'CEP 20m(추정)', firstDeployed:'2010년', manufacturer:'CASIC' },
    confidence:72, lastUpdated:'2026-04-01', relatedIntelIds:[], tags:['대함탄도미사일','ASBM','항모킬러','DF-21D'], sources:['IISS','RAND'],
  },
  {
    id:'w-chn-007', name:'WZ-7 소아룡', nameEng:'WZ-7 Soaring Dragon',
    category:'UAV', origin:'CHINA', status:'OPERATIONAL', threatRating:'HIGH',
    description:'중국 고고도 정찰 UAV. 한반도 및 동중국해 감시 임무 수행.',
    detail:`## WZ-7 Soaring Dragon\n\n청두 항공공업이 개발한 중국의 고고도 전략 정찰 UAV. 2022년 한반도 인근 운용이 확인되었다.\n\n### 주요 특징\n- 고도 18km 이상 운용\n- SAR·EO·SIGINT 복합 센서\n- 체공 시간 24시간 이상\n- 위성통신 원격 운용`,
    specs:{ range:'7,000km', speed:'750km/h', payload:'2,000kg(추정)', length:'14.3m', weight:'7,500kg(추정)', propulsion:'WS-17 터보팬(추정)', ceiling:'18,000m', firstDeployed:'2021년', manufacturer:'청두 항공공업' },
    confidence:62, lastUpdated:'2026-04-01', relatedIntelIds:[], tags:['드론','정찰UAV','중국'], sources:['IISS'],
  },

  // ══════════════════════════════════════════════
  // 영국 (UK)
  // ══════════════════════════════════════════════
  {
    id:'w-uk-001', name:'유로파이터 타이푼', nameEng:'Eurofighter Typhoon', designation:'FGR4',
    category:'AIRCRAFT', origin:'UK', status:'OPERATIONAL', threatRating:'MED',
    description:'영·독·이·스 4국 공동개발 4.5세대 전투기. NATO 주력 방공 전력.',
    detail:`## Eurofighter Typhoon\n\n영국·독일·이탈리아·스페인이 공동 개발한 4.5세대 다목적 전투기. 우수한 공중전 및 정밀타격 능력을 갖는다.\n\n### 주요 특징\n- 카나드-델타익 설계로 초기동성\n- CAPTOR-E AESA 레이더\n- AESA 탑재 Tranche 4 버전\n- METEOR BVRAAM 운용\n- Storm Shadow 순항미사일 탑재`,
    specs:{ range:'2,900km', speed:'마하 2.0', payload:'7,500kg', length:'15.96m', weight:'11,150kg', propulsion:'EJ200 ×2', ceiling:'19,812m', crew:'1~2명', firstDeployed:'2003년', manufacturer:'BAE/EADS/파인메카니카' },
    confidence:95, lastUpdated:'2026-03-01', relatedIntelIds:[], tags:['전투기','유로파이터','NATO'], sources:['RAF','Eurofighter GmbH'],
  },
  {
    id:'w-uk-002', name:'아스튜트급 핵잠수함', nameEng:'Astute-class SSN',
    category:'SUBMARINE', origin:'UK', status:'OPERATIONAL', threatRating:'HIGH',
    description:'영국 최신 공격핵잠수함. 토마호크 탑재. 한반도 위기 시 인도태평양 배치 가능.',
    detail:`## Astute-class SSN\n\nBAE 시스템스가 건조하는 영국의 최신 핵추진 공격잠수함이다.\n\n### 주요 특징\n- 토마호크 Block IV/V 탑재\n- 수중 소음 최소화 설계\n- 핵추진 무제한 항속\n- Spearfish 어뢰 운용`,
    specs:{ displacement:'7,400톤(수중)', range:'무제한(핵추진)', speed:'30노트 이상', length:'97m', crew:'98명', propulsion:'Rolls-Royce PWR2 원자로', armament:'토마호크×38/Spearfish 어뢰', firstDeployed:'2010년', manufacturer:'BAE 시스템스' },
    confidence:88, lastUpdated:'2026-03-01', relatedIntelIds:[], tags:['핵잠수함','영국','토마호크'], sources:['Royal Navy','Janes'],
  },
  {
    id:'w-uk-003', name:'스톰 섀도우 / SCALP', nameEng:'Storm Shadow / SCALP-EG',
    category:'CRUISE', origin:'UK', status:'OPERATIONAL', threatRating:'HIGH',
    description:'영·불 공동개발 장거리 공중발사 스텔스 순항미사일. 우크라이나에 공급.',
    detail:`## Storm Shadow / SCALP-EG\n\nMBDA가 개발한 장거리 스텔스 공중발사 순항미사일. 영국(Storm Shadow)과 프랑스(SCALP-EG) 양국이 운용하며 우크라이나에도 제공되었다.\n\n### 주요 특징\n- 사거리 560km 이상\n- BROACH 이중 관통탄두\n- 저고도 스텔스 비행\n- 지형추적·FLIR 유도`,
    specs:{ range:'560km 이상', speed:'마하 0.8', payload:'BROACH 450kg', length:'5.1m', weight:'1,300kg', propulsion:'Microturbo TRI-60 터보제트', guidance:'INS/GPS/지형추적/FLIR', accuracy:'CEP 1m', firstDeployed:'2003년', manufacturer:'MBDA' },
    confidence:95, lastUpdated:'2026-04-01', relatedIntelIds:[], tags:['순항미사일','스텔스','Storm Shadow'], sources:['MBDA','RAF'],
  },

  // ══════════════════════════════════════════════
  // 프랑스 (FRANCE)
  // ══════════════════════════════════════════════
  {
    id:'w-fra-001', name:'라팔 F4', nameEng:'Dassault Rafale F4', designation:'Rafale F4',
    category:'AIRCRAFT', origin:'FRANCE', status:'OPERATIONAL', threatRating:'MED',
    description:'프랑스 4.5세대 옴니롤 전투기. 인도, UAE, 그리스 등 수출 성공.',
    detail:`## Dassault Rafale F4\n\n다쏘 항공이 개발한 프랑스 해군·공군 공통 전투기. 옴니롤(모든 임무 수행) 능력을 갖춘 4.5세대기다.\n\n### 주요 특징\n- RBE2-AA AESA 레이더\n- ASMP-A 핵순항미사일 탑재 가능\n- TALIOS 표적지시 포드\n- SPECTRA EW 시스템\n- 핵 억제 임무 수행 가능`,
    specs:{ range:'3,700km', speed:'마하 1.8', payload:'9,500kg', length:'15.3m', weight:'10,600kg', propulsion:'M88-2 ×2', ceiling:'15,240m', crew:'1~2명', firstDeployed:'2004년', manufacturer:'다쏘 항공' },
    confidence:97, lastUpdated:'2026-03-01', relatedIntelIds:[], tags:['전투기','라팔','프랑스','수출'], sources:['French Air Force','Dassault'],
  },

  // ══════════════════════════════════════════════
  // 독일 (GERMANY)
  // ══════════════════════════════════════════════
  {
    id:'w-deu-001', name:'레오파르트 2A7+', nameEng:'Leopard 2A7+',
    category:'GROUND', origin:'GERMANY', status:'OPERATIONAL', threatRating:'HIGH',
    description:'독일 주력전차. 세계 최고 수준 방호력·정밀성. 우크라이나 공급.',
    detail:`## Leopard 2A7+\n\n크라우스-마파이 베그만이 제조하는 독일의 최신 3.5세대 주력전차. 세계에서 가장 많이 수출된 서방 전차 중 하나다.\n\n### 주요 특징\n- 120mm L55A1 활강포\n- 복합 모듈식 장갑\n- 도시전 패키지(APS 준비)\n- 열화상 야시경\n- 1,500hp MTU 디젤 엔진`,
    specs:{ range:'450km', speed:'72km/h', weight:'68,000kg', length:'10.97m', crew:'4명', propulsion:'MTU MB 873 1,500hp', armament:'120mm L55A1×42발+MG3 7.62mm', firstDeployed:'2014년(A7)', manufacturer:'KMW' },
    confidence:97, lastUpdated:'2026-03-01', relatedIntelIds:[], tags:['전차','레오파르트','독일'], sources:['Bundeswehr','KMW'],
  },

  // ══════════════════════════════════════════════
  // 일본 (JAPAN)
  // ══════════════════════════════════════════════
  {
    id:'w-jpn-001', name:'F-35A (항공자위대)', nameEng:'F-35A JASDF', designation:'F-35A',
    category:'AIRCRAFT', origin:'JAPAN', status:'OPERATIONAL', threatRating:'MED',
    description:'일본 항공자위대 F-35A. 147대 도입 확정. 한반도 유사 시 지원 전력.',
    detail:`## F-35A JASDF\n\n일본이 도입하는 F-35A/B. 미쓰비시 중공업이 국내 조립. 총 147대 도입 예정.\n\n### 주요 특징\n- F-35A 105대 + F-35B 42대\n- 미쓰비시 국내 조립\n- JSM(합동타격미사일) 운용 예정\n- 반격능력 전력과 연동`,
    specs:{ range:'2,200km', speed:'마하 1.6', payload:'8,100kg', length:'15.7m', weight:'13,300kg', propulsion:'F135-PW-100', firstDeployed:'2017년(JASDF)', manufacturer:'록히드 마틴/미쓰비시' },
    confidence:98, lastUpdated:'2026-04-01', relatedIntelIds:[], tags:['F-35','일본','JASDF'], sources:['JASDF','MOD Japan'],
  },
  {
    id:'w-jpn-002', name:'10식 전차', nameEng:'Type 10 MBT', designation:'10式戦車',
    category:'GROUND', origin:'JAPAN', status:'OPERATIONAL', threatRating:'MED',
    description:'일본 3.5세대 주력전차. 일본 지형 맞춤 경량 설계. 도로 및 교량 통과 가능.',
    detail:`## Type 10 MBT\n\n미쓰비시가 개발한 일본 자위대의 최신 주력전차. 일본의 협소한 도로망을 고려한 경량 설계가 특징이다.\n\n### 주요 특징\n- 중량 44톤 (다른 3세대 전차 대비 경량)\n- 120mm 활강포\n- C4I 통합 전술 네트워크\n- 모듈식 세라믹 장갑\n- 능동 현가장치`,
    specs:{ range:'500km', speed:'70km/h', weight:'44,000kg', length:'9.42m', crew:'3명', propulsion:'미쓰비시 8V디젤 1,200hp', armament:'120mm L/44×40발', firstDeployed:'2012년', manufacturer:'미쓰비시 중공업' },
    confidence:95, lastUpdated:'2026-03-01', relatedIntelIds:[], tags:['전차','일본','10식'], sources:['JGSDF'],
  },
  {
    id:'w-jpn-003', name:'이즈모급 경항모', nameEng:'Izumo-class DDH (CVL conversion)',
    category:'NAVAL', origin:'JAPAN', status:'OPERATIONAL', threatRating:'MED',
    description:'일본 이즈모급 호위함 항모 개조. F-35B 탑재 예정. 사실상 경항공모함.',
    detail:`## Izumo-class DDH\n\n이즈모·가가 2척을 F-35B 탑재 가능하도록 갑판 내열 개조 중. 일본의 사실상 경항공모함이다.\n\n### 주요 특징\n- F-35B 단거리 이착함 운용\n- 배수량 27,000톤\n- 개조 완료 시 F-35B 14~18대\n- 함대공 미사일 SM-3 탑재 가능`,
    specs:{ displacement:'27,000톤', range:'5,000km', speed:'30노트', length:'248m', crew:'470명', propulsion:'가스터빈 COGAG', armament:'F-35B×14~18대(예정)+ESSM', firstDeployed:'2015년(헬기모함)→개조 중', manufacturer:'IHI/마루마공업' },
    confidence:90, lastUpdated:'2026-04-01', relatedIntelIds:[], tags:['항모','이즈모','F-35B','일본'], sources:['JMSDF','MOD Japan'],
  },

  // ══════════════════════════════════════════════
  // 이스라엘 (ISRAEL)
  // ══════════════════════════════════════════════
  {
    id:'w-isr-001', name:'아이언 돔', nameEng:'Iron Dome', designation:'C-RAM',
    category:'SAM', origin:'ISRAEL', status:'OPERATIONAL', threatRating:'LOW',
    description:'이스라엘 단거리 로켓·포탄 요격 시스템. 가자지구 로켓 대응 90% 요격률.',
    detail:`## Iron Dome\n\n라파엘 시스템과 엘타가 공동 개발한 이동식 단거리 방공 시스템. 단거리 로켓·포탄·박격포탄 요격에 특화되었다.\n\n### 주요 특징\n- Tamir 요격미사일 사용\n- 사거리 4~70km\n- 90% 이상 요격 성공률\n- EL/M-2084 MMR 레이더\n- 요격 비용 $50,000/발(기존 $100,000에서 하락)\n\n### 한반도 적용\n북한 장사정포·방사포 대응 시스템으로 한국 도입 검토.`,
    specs:{ range:'4~70km', altitude:'10~10,000m', speed:'마하 2.2', weight:'90kg/발', guidance:'능동레이더+IIR', accuracy:'90%+(실전)', firstDeployed:'2011년', manufacturer:'라파엘/엘타', armament:'Tamir 미사일×20발/포대' },
    confidence:99, lastUpdated:'2026-04-01', relatedIntelIds:[], tags:['방공','C-RAM','아이언돔','이스라엘'], sources:['IDF','Rafael'],
  },
  {
    id:'w-isr-002', name:'애로우-3', nameEng:'Arrow-3 (Chetz-3)',
    category:'SAM', origin:'ISRAEL', status:'OPERATIONAL', threatRating:'MED',
    description:'이스라엘·미국 공동개발 상층 요격 체계. 탄도미사일 대기권 외 요격.',
    detail:`## Arrow-3\n\nIAI와 보잉이 공동 개발한 이스라엘의 최상층 미사일 방어 체계. 탄도미사일을 대기권 밖에서 요격한다.\n\n### 주요 특징\n- 요격 고도 100km 이상\n- 사거리 2,400km\n- 핵 탄두 탑재 탄도미사일 요격\n- Hit-to-Kill 방식\n- Green Pine 레이더 연동`,
    specs:{ range:'2,400km', altitude:'100~150km', speed:'마하 9', guidance:'적외선 탐색기+INS', firstDeployed:'2017년', manufacturer:'IAI/보잉', accuracy:'Hit-to-Kill' },
    confidence:90, lastUpdated:'2026-04-01', relatedIntelIds:[], tags:['미사일방어','이스라엘','Arrow-3'], sources:['IDF','IAI'],
  },
  {
    id:'w-isr-003', name:'F-35I 아디르', nameEng:'F-35I Adir',
    category:'AIRCRAFT', origin:'ISRAEL', status:'OPERATIONAL', threatRating:'HIGH',
    description:'이스라엘 개조 F-35A. 독자 항전·무장 시스템 통합. 중동 최강 전투력.',
    detail:`## F-35I Adir\n\n이스라엘이 록히드 마틴 F-35A에 독자 항전 시스템을 통합한 버전. '아디르'는 히브리어로 '강력하다'는 뜻이다.\n\n### 주요 특징\n- 이스라엘 독자 EW 및 항전 통합\n- Lizard 레이저 유도 폭탄 통합\n- Spice 2000 정밀유도폭탄\n- 이란 핵 시설 타격 능력 보유`,
    specs:{ range:'2,200km(전투)', speed:'마하 1.6', payload:'8,100kg', length:'15.7m', firstDeployed:'2017년(이스라엘)', manufacturer:'록히드 마틴+이스라엘 독자 개조', armament:'Python-5/Derby/Spice 2000' },
    confidence:92, lastUpdated:'2026-04-01', relatedIntelIds:[], tags:['F-35','이스라엘','스텔스'], sources:['IAF','IDF'],
  },

  // ══════════════════════════════════════════════
  // 인도 (INDIA)
  // ══════════════════════════════════════════════
  {
    id:'w-ind-001', name:'아그니-V', nameEng:'Agni-V ICBM',
    category:'ICBM', origin:'INDIA', status:'OPERATIONAL', threatRating:'HIGH',
    description:'인도 첫 ICBM급 IRBM. 사거리 5,000~8,000km. MIRV 개발 중.',
    detail:`## Agni-V ICBM\n\n인도가 개발한 대륙간 사거리(5,000~8,000km) 탄도미사일이다. 인도의 핵3원 지상 전력의 핵심이다.\n\n### 주요 특징\n- 사거리 5,000~8,000km\n- MIRV 탑재 개발 중\n- 3단 고체 추진\n- 이동식 TEL 운용\n- 1,500kg 핵탄두 탑재`,
    specs:{ range:'5,000~8,000km', payload:'1,500kg(핵)', propulsion:'고체로켓 3단', weight:'50,000kg', length:'17.5m', guidance:'링레이저 자이로+GPS', firstDeployed:'2018년', manufacturer:'DRDO', warhead:'핵 분열/융합' },
    confidence:88, lastUpdated:'2026-04-01', relatedIntelIds:[], tags:['ICBM','인도','핵','Agni'], sources:['DRDO','SIPRI'],
  },
  {
    id:'w-ind-002', name:'테자스 Mk1A', nameEng:'Tejas Mk1A',
    category:'AIRCRAFT', origin:'INDIA', status:'OPERATIONAL', threatRating:'MED',
    description:'인도 자체개발 경전투기. 최신 AESA 레이더·공중급유 능력 추가.',
    detail:`## Tejas Mk1A\n\n인도 항공개발국(ADA)이 개발한 경전투기. Mk1A는 AESA 레이더와 공중급유 탐침을 추가했다.\n\n### 주요 특징\n- GE F404-GE-IN20 엔진\n- EL/M-2052 AESA 레이더\n- BVR 능력(DERBY/METEOR)\n- 공중급유 탐침\n- 83대 추가 도입 계획`,
    specs:{ range:'1,850km', speed:'마하 1.8', payload:'3,500kg', length:'13.2m', weight:'6,500kg', propulsion:'GE F404-GE-IN20', firstDeployed:'2021년(Mk1A)', manufacturer:'HAL/ADA' },
    confidence:85, lastUpdated:'2026-04-01', relatedIntelIds:[], tags:['전투기','인도','테자스'], sources:['IAF','HAL'],
  },

  // ══════════════════════════════════════════════
  // 터키 (TURKEY)
  // ══════════════════════════════════════════════
  {
    id:'w-tur-001', name:'바이락타르 TB2', nameEng:'Bayraktar TB2',
    category:'UAV', origin:'TURKEY', status:'OPERATIONAL', threatRating:'HIGH',
    description:'터키 무장 드론. 우크라이나·아제르바이잔에서 결정적 전과. 20개국 수출.',
    detail:`## Bayraktar TB2\n\n바이카르가 개발한 터키의 전술 무장 드론. 나고르노-카라바흐 전쟁과 우크라이나 전쟁에서 전술 게임체인저로 입증되었다.\n\n### 주요 특징\n- MAM-L 스마트 마이크로 폭탄\n- 최대 체공 27시간\n- 위성통신 원격 제어\n- 저가·고효율 특성\n- 20개국 이상 수출`,
    specs:{ range:'150km(통신 통제)', speed:'220km/h', payload:'150kg', length:'6.5m', weight:'650kg', propulsion:'로탁스 912S 피스톤', ceiling:'8,200m', firstDeployed:'2014년', manufacturer:'바이카르', armament:'MAM-L×4발' },
    confidence:98, lastUpdated:'2026-04-01', relatedIntelIds:[], tags:['드론','TB2','터키','수출'], sources:['Turkish MOD','Baykar'],
  },
  {
    id:'w-tur-002', name:'바이락타르 악은지', nameEng:'Bayraktar Akıncı',
    category:'UAV', origin:'TURKEY', status:'OPERATIONAL', threatRating:'HIGH',
    description:'터키 대형 공격드론. MQ-9급 성능. 터키 핵심 타격 전력.',
    detail:`## Bayraktar Akıncı\n\n바이카르가 개발한 터키의 중고도 장시간 체공 공격 드론. 터키 최대 무인기로 MQ-9 리퍼에 버금가는 성능이다.\n\n### 주요 특징\n- 1,350kg 탑재량\n- 체공 24시간 이상\n- F-16·함정 공격 능력\n- SOM 순항미사일 탑재 가능\n- Aselsan CATS AESA 레이더`,
    specs:{ range:'1,500km', speed:'361km/h', payload:'1,350kg', length:'12.2m', weight:'5,500kg', propulsion:'AI-450C 터보프롭 ×2', ceiling:'13,716m', firstDeployed:'2021년', manufacturer:'바이카르', armament:'MAM-L/C/SOM 순항미사일' },
    confidence:90, lastUpdated:'2026-04-01', relatedIntelIds:[], tags:['드론','Akıncı','터키'], sources:['Turkish MOD','Baykar'],
  },

  // ══════════════════════════════════════════════
  // 이란 (IRAN)
  // ══════════════════════════════════════════════
  {
    id:'w-irn-001', name:'샤헤드-136', nameEng:'Shahed-136', designation:'Geran-2(러시아)',
    category:'UAV', origin:'IRAN', status:'OPERATIONAL', threatRating:'HIGH',
    description:'이란 자폭드론. 러시아가 우크라이나에 대량 사용. 북한 기술이전 의혹.',
    detail:`## Shahed-136\n\n이란이 개발한 자폭형 배회 탄약(Loitering Munition). 러시아가 '게란-2'로 명명하여 우크라이나 인프라 공격에 대량 사용했다.\n\n### 주요 특징\n- 삼각날개(델타익) 설계\n- 50kg 폭발물 탑재\n- 사거리 2,000km\n- 저렴한 제조 비용($20,000)\n- 북한 기술이전 가능성 주목\n\n### 한반도 위협\n북한이 유사 기술로 자폭드론 개발 중으로 평가.`,
    specs:{ range:'2,000km', speed:'185km/h', payload:'50kg', length:'3.5m', weight:'200kg', propulsion:'MD550 피스톤 엔진', guidance:'GPS/INS', firstDeployed:'2021년(이란)/2022년(우크라이나)', manufacturer:'이란 HESA' },
    confidence:95, lastUpdated:'2026-04-01', relatedIntelIds:[], tags:['자폭드론','이란','샤헤드','러시아'], sources:['IISS','ISW'],
  },
  {
    id:'w-irn-002', name:'파테 110/파테흐-360', nameEng:'Fateh-110 / Fateh-360',
    category:'SRBM', origin:'IRAN', status:'OPERATIONAL', threatRating:'HIGH',
    description:'이란 단거리 정밀탄도미사일. 이스라엘·사우디 직접 위협. 헤즈볼라 운용.',
    detail:`## Fateh-110 / Fateh-360\n\n이란이 개발한 단거리 고체 추진 탄도미사일 계열이다. Fateh-360은 최신 개량형으로 정밀도가 향상되었다.\n\n### 주요 특징\n- 사거리 200~700km\n- CEP 50m 이내\n- 고체연료 즉각 발사\n- 헤즈볼라·후티 수출`,
    specs:{ range:'700km(Fateh-360)', speed:'마하 3.5', payload:'650kg', length:'8.86m', weight:'3,450kg', propulsion:'고체로켓', guidance:'INS+GPS+광학', accuracy:'CEP 50m', firstDeployed:'2002년(Fateh-110)', manufacturer:'이란 SHIG' },
    confidence:88, lastUpdated:'2026-04-01', relatedIntelIds:[], tags:['단거리탄도','이란','Fateh'], sources:['IISS'],
  },

  // ══════════════════════════════════════════════
  // 우크라이나 (UKRAINE)
  // ══════════════════════════════════════════════
  {
    id:'w-ukr-001', name:'R-360 넵튠', nameEng:'R-360 Neptune',
    category:'SSM', origin:'UKRAINE', status:'OPERATIONAL', threatRating:'HIGH',
    description:'우크라이나 대함순항미사일. 러시아 기함 모스크바함 격침 실전 증명.',
    detail:`## R-360 Neptune\n\n우크라이나가 자체 개발한 대함 순항미사일. 2022년 4월 러시아 흑해함대 기함 모스크바(Moskva)함을 격침하며 세계적 주목을 받았다.\n\n### 주요 특징\n- 사거리 280~300km\n- 능동레이더 탐색기\n- 해면비행 저고도 접근\n- RK-360 발사 시스템 운용\n- 모스크바함 격침으로 실전 증명`,
    specs:{ range:'300km', speed:'마하 0.85(900km/h)', payload:'150kg(관통)', length:'5.05m', weight:'870kg', propulsion:'터보제트', guidance:'INS+능동레이더', accuracy:'CEP 10m 이내', firstDeployed:'2020년', manufacturer:'Luch Design Bureau' },
    confidence:98, lastUpdated:'2026-04-01', relatedIntelIds:[], tags:['대함미사일','우크라이나','넵튠'], sources:['Ukrainian MoD','Janes'],
  },

  // ══════════════════════════════════════════════
  // 파키스탄 (PAKISTAN)
  // ══════════════════════════════════════════════
  {
    id:'w-pak-001', name:'샤힌-III', nameEng:'Shaheen-III MRBM',
    category:'IRBM', origin:'PAKISTAN', status:'OPERATIONAL', threatRating:'HIGH',
    description:'파키스탄 중거리 탄도미사일. 사거리 2,750km. 인도 전역 타격 가능.',
    detail:`## Shaheen-III MRBM\n\n파키스탄 전략군이 운용하는 중거리 고체연료 탄도미사일. 인도 최동단까지 타격 가능한 사거리를 보유한다.\n\n### 주요 특징\n- 사거리 2,750km\n- 고체연료 TEL 이동발사\n- 핵탄두 탑재 가능\n- MIRV 개발 중`,
    specs:{ range:'2,750km', payload:'1,000kg', propulsion:'고체로켓 2단', guidance:'INS+GPS', firstDeployed:'2015년', manufacturer:'NESCOM', warhead:'핵/재래식' },
    confidence:82, lastUpdated:'2026-04-01', relatedIntelIds:[], tags:['MRBM','파키스탄','핵'], sources:['SIPRI','IISS'],
  },

  // ══════════════════════════════════════════════
  // 대만 (TAIWAN)
  // ══════════════════════════════════════════════
  {
    id:'w-twn-001', name:'F-16V 바이퍼', nameEng:'F-16V Viper', designation:'F-16V Block 70',
    category:'AIRCRAFT', origin:'TAIWAN', status:'OPERATIONAL', threatRating:'MED',
    description:'대만 공군 주력 전투기. F-16A/B 업그레이드 및 66대 신규 도입.',
    detail:`## F-16V Viper\n\n대만 공군이 운용하는 F-16 최신 업그레이드 버전(Block 70/72). AIM-120C-8 AMRAAM 운용 가능하다.\n\n### 주요 특징\n- AN/APG-83 AESA 레이더\n- AIM-120C-8 AMRAAM\n- Link 16 전술 데이터링크\n- JHMCS 헬멧장착조준\n- AGM-154 JSOW 정밀폭탄`,
    specs:{ range:'3,200km', speed:'마하 2.0', payload:'7,700kg', length:'15.09m', weight:'8,573kg', propulsion:'F110-GE-129', firstDeployed:'2021년(V형)', manufacturer:'록히드 마틴' },
    confidence:95, lastUpdated:'2026-04-01', relatedIntelIds:[], tags:['F-16','대만','전투기'], sources:['ROCAF','DSCA'],
  },
  {
    id:'w-twn-002', name:'톈궁-III', nameEng:'Tien Kung III (Sky Bow III)',
    category:'SAM', origin:'TAIWAN', status:'OPERATIONAL', threatRating:'MED',
    description:'대만 자체개발 장거리 지대공 미사일. 탄도미사일 요격 능력 보유.',
    detail:`## Tien Kung III (Sky Bow III)\n\n대만 CSIST가 자체 개발한 장거리 지대공 미사일 체계. 탄도미사일 요격 능력을 갖춘 대만판 패트리엇이다.\n\n### 주요 특징\n- 사거리 200km\n- 탄도미사일 요격 능력\n- 능동위상배열레이더\n- 패트리엇과 유사한 운용 개념`,
    specs:{ range:'200km', altitude:'30km(요격)', speed:'마하 4.5', guidance:'능동레이더', firstDeployed:'2016년', manufacturer:'CSIST' },
    confidence:80, lastUpdated:'2026-03-01', relatedIntelIds:[], tags:['지대공','대만','톈궁'], sources:['ROCAF'],
  },

  // ══════════════════════════════════════════════
  // 스웨덴 (SWEDEN)
  // ══════════════════════════════════════════════
  {
    id:'w-swe-001', name:'JAS-39 그리펜 E', nameEng:'JAS-39E Gripen',
    category:'AIRCRAFT', origin:'SWEDEN', status:'OPERATIONAL', threatRating:'MED',
    description:'스웨덴 4.5세대 경전투기. 저비용 유지·운용. NATO 가입 후 전략적 가치 상승.',
    detail:`## JAS-39E Gripen\n\n사브가 개발한 스웨덴의 다목적 경전투기 최신형. 경제적 운용비용과 단거리 이착륙 능력이 특징이다.\n\n### 주요 특징\n- ES-05 레이블 AESA 레이더\n- METEOR BVRAAM 운용\n- 도로 이착륙 가능\n- 유지비 F-16의 1/3 수준\n- NATO 표준 무장 통합`,
    specs:{ range:'3,200km', speed:'마하 2.0', payload:'5,300kg', length:'14.1m', weight:'7,000kg', propulsion:'GE F414G', firstDeployed:'2019년(E형)', manufacturer:'사브' },
    confidence:95, lastUpdated:'2026-03-01', relatedIntelIds:[], tags:['전투기','그리펜','스웨덴','NATO'], sources:['Saab','Swedish AF'],
  },
]
