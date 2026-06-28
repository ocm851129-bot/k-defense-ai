import type { WeaponSystem } from './weapons'
const w = (id:string,name:string,nameEng:string,cat:WeaponSystem['category'],origin:WeaponSystem['origin'],status:WeaponSystem['status'],threat:WeaponSystem['threatRating'],desc:string,specs:WeaponSystem['specs'],tags:string[],sources:string[],img?:string,wiki?:string,conf=90): WeaponSystem=>({id,name,nameEng,category:cat,origin,status,threatRating:threat,description:desc,detail:`## ${nameEng}\n\n${desc}\n\n### 주요 제원\n${Object.entries(specs).filter(([,v])=>v).map(([k,v])=>`- ${k}: ${v}`).join('\n')}`,specs,confidence:conf,lastUpdated:'2026-06-28',relatedIntelIds:[],tags,sources,imageUrl:img,wikiUrl:wiki})

export const WEAPONS_MAJOR_POWERS: WeaponSystem[] = [

  // ══════════════════════════════════════════════════════
  // 북한 (DPRK) 추가
  // ══════════════════════════════════════════════════════
  w('dprk-e01','화성-12 중거리탄도미사일','Hwasong-12 IRBM','IRBM','DPRK','OPERATIONAL','CRITICAL',
    '북한 중거리 탄도미사일. 사거리 4,500~5,000km. 괌 타격 능력. 2017년 괌 포위 사격 계획 발표에 사용.',
    {range:'4,500~5,000km',payload:'650kg',propulsion:'액체연료 1단 로켓',firstDeployed:'2017년'},
    ['화성-12','IRBM','괌타격','북한'],['CSIS','GlobalSecurity'],
    undefined,'https://en.wikipedia.org/wiki/Hwasong-12',85),

  w('dprk-e02','화성-14 ICBM','Hwasong-14 ICBM','ICBM','DPRK','OPERATIONAL','CRITICAL',
    '북한 최초 미국 본토 타격 가능 ICBM. 2017년 2차례 시험 발사 성공. 사거리 10,000km+. 알래스카·하와이 사정권.',
    {range:'10,000km+',payload:'500~1,000kg',propulsion:'액체연료 2단',firstDeployed:'2017년'},
    ['화성-14','ICBM','미국본토','북한'],['CSIS','NTI'],
    undefined,'https://en.wikipedia.org/wiki/Hwasong-14',85),

  w('dprk-e03','KN-23 단거리탄도미사일','KN-23 (Hwasong-11Ga) SRBM','SRBM','DPRK','OPERATIONAL','HIGH',
    '러시아 이스칸데르-M 유사형. 저고도 변칙기동. 한국 패트리엇 요격 회피 설계. 사거리 690km. 러시아에 수출(우크라이나 전선 사용 확인).',
    {range:'690km',payload:'500kg',propulsion:'고체연료',firstDeployed:'2019년'},
    ['KN-23','이스칸데르형','변칙기동','러시아수출'],['CSIS','ISW'],
    undefined,'https://en.wikipedia.org/wiki/KN-23',90),

  w('dprk-e04','KN-24 단거리탄도미사일','KN-24 (Hwasong-11Na) SRBM','SRBM','DPRK','OPERATIONAL','HIGH',
    '미국 ATACMs 유사형 단거리탄도미사일. 분리형 탄두. 사거리 400km. 한반도 전역 타격 가능.',
    {range:'400km',payload:'500kg 추정',propulsion:'고체연료',firstDeployed:'2019년'},
    ['KN-24','ATGM형','SRBM','북한'],['CSIS','GlobalSecurity'],
    undefined,'https://en.wikipedia.org/wiki/KN-24',80),

  w('dprk-e05','KN-25 초대형방사포','KN-25 600mm Super-Large MLRS','MLRS','DPRK','OPERATIONAL','HIGH',
    '구경 600mm 세계 최대급 방사포. 사거리 380~400km. 한국 전역 타격. 대량 생산·실전 배치 중.',
    {range:'380~400km',caliber:'600mm',firstDeployed:'2020년'},
    ['KN-25','초대형방사포','600mm','북한'],['CSIS','GlobalSecurity'],
    undefined,undefined,80),

  w('dprk-e06','해일 핵어뢰','Haeil Nuclear-Armed Underwater Vehicle','SUBMARINE','DPRK','TESTING','CRITICAL',
    '북한 무인 핵어뢰. 2023년 시험. 방사성 해일파 생성 목적. 러시아 포세이돈과 유사 개념.',
    {range:'1,000km+(추정)',propulsion:'원자력(주장)/디젤(추정)',firstDeployed:'시험 중'},
    ['해일','핵어뢰','무인수중','북한WMD'],['CSIS','38North'],
    undefined,undefined,45),

  w('dprk-e07','핵무기 WMD','DPRK Nuclear Weapons Arsenal','NUCLEAR','DPRK','OPERATIONAL','CRITICAL',
    '북한 핵탄두 40~50발 보유 추정(2026). 핵 소형화·MIRV화 진행. 전술핵 다종 개발.',
    {payload:'10~250kt(추정 다양)',quantity:'40~50발(추정)',firstDeployed:'2006년(1차 핵실험)'},
    ['북한핵','WMD','핵탄두','MIRV'],['SIPRI','FAS','NTI'],
    undefined,undefined,75),

  w('dprk-e08','곡산 M-1978 자주포','M-1978 Koksan 170mm SPG','ARTILLERY','DPRK','OPERATIONAL','HIGH',
    '170mm 구경 자주포. 사거리 60km(로켓보조). 서울 타격 가능. DMZ 인근 배치. 수량 수백 문.',
    {armament:'170mm 자주포',range:'60km(ERBB탄)',firstDeployed:'1978년',manufacturer:'북한군수'},
    ['곡산','M-1978','자주포','170mm','서울위협'],['GlobalSecurity','Jane\'s'],
    undefined,'https://en.wikipedia.org/wiki/M1978_Koksan'),

  // ══════════════════════════════════════════════════════
  // 러시아 추가
  // ══════════════════════════════════════════════════════
  w('rus-e01','Su-57 스텔스전투기','Sukhoi Su-57 Felon','AIRCRAFT','RUSSIA','OPERATIONAL','CRITICAL',
    '러시아 5세대 스텔스 전투기. 2020년 첫 실전배치. 우크라이나전 제한적 운용. Kh-69 스텔스 순항미사일 내부 탑재.',
    {range:'3,500km',speed:'마하 2.0',payload:'10,000kg',length:'20.1m',weight:'18,000kg',propulsion:'AL-41F1 117S ×2 (32,000lbf 각)',ceiling:'20,000m',crew:'1명',firstDeployed:'2020년',armament:'30mm 기관포+Kh-69/R-77-1/R-74M(내부 탑재)'},
    ['Su-57','스텔스','러시아5세대','Felon'],['Sukhoi','Jane\'s','TASS'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Su-57_Felon_in_flight.jpg/320px-Su-57_Felon_in_flight.jpg',
    'https://en.wikipedia.org/wiki/Sukhoi_Su-57',75),

  w('rus-e02','Su-35S 다목적전투기','Sukhoi Su-35S Flanker-E','AIRCRAFT','RUSSIA','OPERATIONAL','HIGH',
    '러시아 4++ 세대 최강 전투기. TVC(추력편향) 노즐. 이란·중국 수출. 우크라이나전 주력 전투기. L175V Khibiny EW 시스템.',
    {range:'3,600km',speed:'마하 2.25',payload:'8,000kg',length:'21.9m',propulsion:'AL-41F1S ×2 (31,900lbf 각)',ceiling:'18,000m',crew:'1명',firstDeployed:'2014년',armament:'30mm GSh-30-1+R-77/R-74/Kh-31/Kh-35'},
    ['Su-35','Flanker-E','러시아','TVC','이란수출'],['Sukhoi','Jane\'s'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Su-35_Flanker-E.jpg/320px-Su-35_Flanker-E.jpg',
    'https://en.wikipedia.org/wiki/Sukhoi_Su-35',90),

  w('rus-e03','T-14 아르마타 전차','T-14 Armata MBT','GROUND','RUSSIA','TESTING','HIGH',
    '러시아 차세대 전차. 무인포탑·능동방호(아프가닛)·125mm 2A82 활강포. 소수 생산. 우크라이나전 극소수 투입.',
    {weight:'48,000kg',crew:'3명(캡슐화 탑승)',armament:'2A82-1M 125mm 활강포+코르넷EM',propulsion:'A85-3A 1,500hp',speed:'70km/h(도로)',firstDeployed:'2022년(제한적)',manufacturer:'우랄바곤자보트'},
    ['T-14','아르마타','무인포탑','능동방호','러시아차기전차'],['Uralvagonzavod','Jane\'s'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/T-14_Armata_on_2015_Moscow_Victory_Day_Parade.jpg/320px-T-14_Armata_on_2015_Moscow_Victory_Day_Parade.jpg',
    'https://en.wikipedia.org/wiki/T-14_Armata',65),

  w('rus-e04','S-500 프로메테이','S-500 Prometheus SAM System','SAM','RUSSIA','OPERATIONAL','CRITICAL',
    '러시아 신형 대공·반탄도미사일 체계. 극초음속 탄두·저궤도 위성 요격 가능. 사거리 600km. S-400 상위 체계.',
    {range:'600km(대공)/600km(ICBM)',altitude:'200km(위성요격)',guidance:'능동위상배열+다기능레이더',firstDeployed:'2021년(초도)',manufacturer:'알마즈-안테이'},
    ['S-500','프로메테이','요격','극초음속','위성요격'],['러시아국방부','Jane\'s'],
    undefined,'https://en.wikipedia.org/wiki/S-500_missile_system',70),

  w('rus-e05','Kh-47M2 킨잘','Kh-47M2 Kinzhal Hypersonic Missile','IRBM','RUSSIA','OPERATIONAL','CRITICAL',
    '공중발사 극초음속 탄도미사일. 마하 10+. MiG-31K/Tu-22M3 탑재. 우크라이나 키이우 타격 사용. 사거리 2,000km.',
    {range:'2,000km',speed:'마하 10+',payload:'480kg (재래식/핵 겸용)',propulsion:'고체로켓(공중발사)',firstDeployed:'2018년',manufacturer:'라돈·MGK'},
    ['킨잘','Kinzhal','극초음속','공중발사','우크라이나'],['러시아국방부','CSIS'],
    undefined,'https://en.wikipedia.org/wiki/Kh-47M2_Kinzhal',80),

  w('rus-e06','RS-28 사르마트 ICBM','RS-28 Sarmat ICBM','ICBM','RUSSIA','OPERATIONAL','CRITICAL',
    '러시아 차세대 중(重)ICBM. 200톤급. MIRV 최대 15발. 사거리 18,000km. 액체연료. R-36M2 보예보다 대체.',
    {range:'18,000km',payload:'MIRV 최대 15발(10~15Mt급)',propulsion:'액체연료 2단',firstDeployed:'2023년(시험전력화)',manufacturer:'마케예프 설계국'},
    ['사르마트','RS-28','ICBM','MIRV','핵','러시아'],['러시아국방부','FAS','CSIS'],
    undefined,'https://en.wikipedia.org/wiki/RS-28_Sarmat',75),

  w('rus-e07','아반가르드 극초음속활공체','Avangard Hypersonic Glide Vehicle','ICBM','RUSSIA','OPERATIONAL','CRITICAL',
    'UR-100N(SS-19) 탑재 극초음속 활공체. 마하 20+. 현존 요격 불가능. 2019년 실전배치. 핵탄두 탑재.',
    {range:'6,000km+(탄도+활공)',speed:'마하 20~27',payload:'핵탄두(수백kt~수 Mt)',firstDeployed:'2019년'},
    ['아반가르드','Avangard','극초음속활공','요격불가','핵'],['러시아국방부','FAS'],
    undefined,'https://en.wikipedia.org/wiki/Avangard_(hypersonic_glide_vehicle)',70),

  w('rus-e08','오레슈니크 탄도미사일','Oreshnik Hypersonic Ballistic Missile','IRBM','RUSSIA','OPERATIONAL','CRITICAL',
    '신형 중거리 극초음속 탄도미사일. 2024년 11월 우크라이나 드니프로 첫 실전 사용. 마하 10+. MIRV 탑재. INF 조약 탈퇴 후 개발.',
    {range:'5,500km',speed:'마하 10+',payload:'MIRV(재래식/핵)',firstDeployed:'2024년(실전사용)'},
    ['오레슈니크','Oreshnik','MIRV','우크라이나','극초음속'],['러시아국방부','ISW'],
    undefined,undefined,75),

  w('rus-e09','포세이돈 핵어뢰','Poseidon Nuclear-Powered Torpedo','SUBMARINE','RUSSIA','TESTING','CRITICAL',
    '핵추진 무인 핵어뢰. 무제한 사거리. 100Mt 핵탄두(추정). 방사성 해일파 생성. 벨고로트급 잠수함 탑재.',
    {speed:'70~100노트(추정)',propulsion:'소형 원자로',payload:'2Mt 코발트탄두(추정)',firstDeployed:'시험 중'},
    ['포세이돈','Poseidon','핵어뢰','러시아WMD','무제한사거리'],['러시아국방부','FAS'],
    undefined,'https://en.wikipedia.org/wiki/Status-6_Oceanic_Multipurpose_System',50),

  w('rus-e10','Admiral Gorshkov급 호위함','Project 22350 Admiral Gorshkov Frigate','NAVAL','RUSSIA','OPERATIONAL','HIGH',
    '러시아 최신 호위함. Zirkon 극초음속 미사일 탑재. VLS 16셀(칼리브르/지르콘/오닉스). 우크라이나전 홍해 파견.',
    {displacement:'5,400톤',length:'135m',crew:'180명',armament:'Zirkon+Kalibr+Oniks VLS 16셀+130mm함포+Redut SAM',propulsion:'CODAD 65,000hp',speed:'29노트',firstDeployed:'2018년'},
    ['고르시코프','Project 22350','호위함','지르콘','칼리브르'],['러시아해군','Jane\'s'],
    undefined,'https://en.wikipedia.org/wiki/Admiral_Gorshkov-class_frigate',85),

  w('rus-e11','Zircon 지르콘 극초음속미사일','3M22 Zircon Hypersonic Cruise Missile','SSM','RUSSIA','OPERATIONAL','CRITICAL',
    '함정발사 극초음속 순항미사일. 마하 8~9. 사거리 1,000km. 함정·해안 목표 타격. 고르시코프급 탑재.',
    {range:'1,000km',speed:'마하 8~9',payload:'400kg 탄두',firstDeployed:'2022년',manufacturer:'NPO 마쉬노스트로예니야'},
    ['지르콘','Zircon','극초음속','함정발사','마하9'],['러시아해군','CSIS'],
    undefined,'https://en.wikipedia.org/wiki/3M22_Zircon',80),

  // ══════════════════════════════════════════════════════
  // 중국 추가
  // ══════════════════════════════════════════════════════
  w('chn-e01','J-20 스텔스전투기','Chengdu J-20 Mighty Dragon','AIRCRAFT','CHINA','OPERATIONAL','CRITICAL',
    '중국 5세대 스텔스 전투기. 2017년 실전배치. 내부 무장창. WS-15 엔진 장착 중. 대만·미국 항모 억제 핵심 전력.',
    {range:'2,000km+(전투행동반경)',speed:'마하 2.0+',length:'20.3m',weight:'19,400kg',propulsion:'WS-10C 또는 WS-15 ×2',ceiling:'20,000m',crew:'1명',firstDeployed:'2017년',armament:'PL-15+PL-10+YJ-12(내부탑재)'},
    ['J-20','스텔스','중국5세대','척룡','PLA'],['PLA','AVIC','Jane\'s'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/J-20_Mighty_Dragon.jpg/320px-J-20_Mighty_Dragon.jpg',
    'https://en.wikipedia.org/wiki/Chengdu_J-20',80),

  w('chn-e02','J-35A 함재스텔스기','Shenyang J-35A Carrier Fighter','AIRCRAFT','CHINA','DEVELOPMENT','CRITICAL',
    '중국 함재 스텔스 전투기. 푸젠함·쑤저우급 항모 탑재용. 2023년 공개. F-35에 대응하는 5세대 함재기.',
    {speed:'마하 1.8+(추정)',propulsion:'WS-19 ×2(추정)',firstDeployed:'2026~2027년(예정)'},
    ['J-35','FC-31','함재스텔스','중국항모','5세대'],['PLA','Jane\'s'],
    undefined,'https://en.wikipedia.org/wiki/Shenyang_FC-31',60),

  w('chn-e03','DF-17 극초음속 탄도미사일','DF-17 Hypersonic Glide Vehicle','SRBM','CHINA','OPERATIONAL','CRITICAL',
    'DF-ZF 극초음속 활공체 탑재 탄도미사일. 사거리 1,800~2,500km. 마하 5~10. 항공모함 킬러. 2019년 열병식 공개.',
    {range:'1,800~2,500km',speed:'마하 5~10',payload:'DF-ZF HGV(핵/재래식)',firstDeployed:'2019년(열병식)/2022년(배치)'},
    ['DF-17','극초음속','항모킬러','중국','DF-ZF'],['PLA','CSIS'],
    undefined,'https://en.wikipedia.org/wiki/DF-17',75),

  w('chn-e04','DF-26 탄도미사일','DF-26 Intermediate-Range Ballistic Missile','IRBM','CHINA','OPERATIONAL','CRITICAL',
    '핵·재래식 양용 중거리 탄도미사일. 사거리 4,000km. 괌 킬러. 항모 타격 가능. 도로 이동식(TEL).',
    {range:'4,000km',payload:'1,200~1,800kg(핵/재래식 교체)',propulsion:'고체연료',firstDeployed:'2016년'},
    ['DF-26','괌킬러','항모타격','IRBM','중국핵'],['PLA','CSIS','Jane\'s'],
    undefined,'https://en.wikipedia.org/wiki/DF-26',85),

  w('chn-e05','Type 003 푸젠 항모','Type 003 Fujian Aircraft Carrier','NAVAL','CHINA','OPERATIONAL','HIGH',
    '중국 3번째 항모. 최초 CATOBAR(전자기식 사출). 배수량 80,000톤+. 2024년 시험항해. J-35A 탑재 예정.',
    {displacement:'80,000+톤',length:'316m',crew:'2,000+명',armament:'CATOBAR 4개 사출기+HHQ-10+1130CIWS',propulsion:'증기터빈(재래식)',speed:'31노트',firstDeployed:'2024년(시험)'},
    ['푸젠','Type003','항모','CATOBAR','중국해군'],['PLA Navy','Jane\'s'],
    undefined,'https://en.wikipedia.org/wiki/Chinese_aircraft_carrier_Fujian',75),

  w('chn-e06','Type 055 구축함','Type 055 Renhai-class Cruiser/Destroyer','NAVAL','CHINA','OPERATIONAL','HIGH',
    '중국 최대 수상전투함. 배수량 12,000톤. 112셀 VLS(YJ-18/HHQ-9B/Yu-8). 세계 최강 구축함급 중 하나.',
    {displacement:'12,000톤',length:'180m',crew:'280명',armament:'HHQ-9B+YJ-18+YU-8+H/PJ-38 130mm+VLS 112셀',propulsion:'COGAG 가스터빈',speed:'30노트',firstDeployed:'2020년',quantity:'8척(2026년)'},
    ['Type 055','런하이급','중국구축함','VLS','PLA Navy'],['PLA Navy','Jane\'s'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Type_055_DDG_101.jpg/320px-Type_055_DDG_101.jpg',
    'https://en.wikipedia.org/wiki/Type_055_destroyer',85),

  w('chn-e07','HQ-9B 지대공미사일','HQ-9B Surface-to-Air Missile','SAM','CHINA','OPERATIONAL','HIGH',
    '중국 장거리 지대공미사일. S-300 기반. 사거리 250km. 남중국해 인공섬 배치. 수출명 FD-2000.',
    {range:'250km',altitude:'30km',guidance:'능동위상배열 레이더+능동레이더탐색기',firstDeployed:'2007년',manufacturer:'CASIC'},
    ['HQ-9','FD-2000','중국SAM','남중국해','장거리방공'],['PLA','SIPRI'],
    undefined,'https://en.wikipedia.org/wiki/HHQ-9',85),

  w('chn-e08','WZ-7 무인정찰기','CASC WZ-7 Soaring Dragon HALE UAV','UAV','CHINA','OPERATIONAL','HIGH',
    '중국 고고도 장거리 무인정찰기. 글로벌호크 수준. 대만·인도양 전략 정찰. 위성·SIGINT 수집.',
    {range:'7,000km',ceiling:'18,000m',speed:'750km/h',crew:'없음',propulsion:'터보팬 1기',firstDeployed:'2011년'},
    ['WZ-7','천룡','HALE UAV','중국정찰드론'],['PLA','GlobalSecurity'],
    undefined,'https://en.wikipedia.org/wiki/CASC_WZ-7',70),

  // ══════════════════════════════════════════════════════
  // 미국 추가
  // ══════════════════════════════════════════════════════
  w('usa-e01','F-15EX Eagle II','Boeing F-15EX Eagle II','AIRCRAFT','USA','OPERATIONAL','HIGH',
    '미공군 F-15C/D 대체. 22발 AAM 탑재 능력. EPAWSS 전자전 시스템. APG-82 AESA. 2021년 배치.',
    {range:'1,900km',speed:'마하 2.5',payload:'13,300kg(역대 전투기 최대)',length:'19.4m',propulsion:'F110-GE-129 ×2 29,000lbf 각',crew:'1~2명',firstDeployed:'2021년',armament:'AIM-120D×8+AIM-9X+AIM-260(JATM)+JDAM'},
    ['F-15EX','Eagle II','미공군','22발AAM','AESA'],['Boeing','USAF','Jane\'s'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/F-15EX_first_flight.jpg/320px-F-15EX_first_flight.jpg',
    'https://en.wikipedia.org/wiki/Boeing_F-15EX_Eagle_II',95),

  w('usa-e02','B-1B 랜서','B-1B Lancer Strategic Bomber','AIRCRAFT','USA','OPERATIONAL','HIGH',
    '미국 초음속 전략폭격기. 56,000kg 최대 폭탄 탑재. 전통적 재래식 전력 핵심. AGM-158 JASSM 24발 탑재. 괌 배치.',
    {range:'9,400km',speed:'마하 1.25',payload:'56,700kg',length:'44.5m',propulsion:'F101-GE-102 ×4 136kN 각',crew:'4명',firstDeployed:'1986년',armament:'JASSM-ER×24+JDAM×96+GBU-57 MOP'},
    ['B-1B','랜서','전략폭격기','미공군','JASSM'],['USAF','Jane\'s','Wikipedia'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/B-1B_Lancer.jpg/320px-B-1B_Lancer.jpg',
    'https://en.wikipedia.org/wiki/Rockwell_B-1_Lancer',98),

  w('usa-e03','M1A2 SEPv3 에이브람스','M1A2 SEPv3 Abrams MBT','GROUND','USA','OPERATIONAL','HIGH',
    '미국 주력전차 최신 개량형. TUSK 도시전 키트. JTRS 무전. 반응장갑. 우크라이나 31대 공여.',
    {weight:'73,600kg',crew:'4명',armament:'M256 120mm 활강포+M2HB+M240×2',propulsion:'AGT1500 가스터빈 1,500hp',speed:'67km/h(도로)',firstDeployed:'2020년(SEPv3)',manufacturer:'General Dynamics Land Systems'},
    ['M1A2','에이브람스','SEPv3','MBT','우크라이나공여'],['US Army','GDLS','Jane\'s'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/M1A2_Abrams_USMC.jpg/320px-M1A2_Abrams_USMC.jpg',
    'https://en.wikipedia.org/wiki/M1_Abrams',98),

  w('usa-e04','M142 HIMARS','M142 High Mobility Artillery Rocket System','MLRS','USA','OPERATIONAL','HIGH',
    '미국 고기동성 로켓포. GMLRS(70km)+ATACMS(300km)+PrSM(500km+) 탑재. 우크라이나 게임체인저. 43개국 이상 관심.',
    {weight:'16,000kg',range:'70km(GMLRS)/300km(ATACMS)/500km+(PrSM)',capacity:'6발 로켓 또는 ATACMS 2발',propulsion:'FMTV 5톤 트럭',firstDeployed:'2005년',manufacturer:'록히드마틴'},
    ['HIMARS','M142','MLRS','우크라이나','ATACMS','PrSM'],['US Army','록히드마틴','Jane\'s'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/HIMARS_Hohenfels_2022.jpg/320px-HIMARS_Hohenfels_2022.jpg',
    'https://en.wikipedia.org/wiki/M142_HIMARS',99),

  w('usa-e05','AH-64E 아파치 가디언','Boeing AH-64E Apache Guardian Attack Helicopter','HELICOPTER','USA','OPERATIONAL','HIGH',
    '미국 주력 공격헬기 최신형. 헬파이어 16발+히드라 70mm 로켓. 링크스급 UAV 제어. 한국·영국·인도 운용.',
    {weight:'10,433kg(최대이륙)',range:'476km',speed:'293km/h',crew:'2명',armament:'M230 30mm체인건+헬파이어×16+히드라×76',propulsion:'GE T700-GE-701D ×2 1,900shp',firstDeployed:'2011년(E형)'},
    ['AH-64E','아파치','공격헬기','헬파이어','링크스'],['Boeing','US Army','Jane\'s'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/AH-64E_Apache_Guardian_helicopter.jpg/320px-AH-64E_Apache_Guardian_helicopter.jpg',
    'https://en.wikipedia.org/wiki/Boeing_AH-64_Apache',98),

  w('usa-e06','Javelin FGM-148','FGM-148 Javelin Anti-Tank Missile','GROUND','USA','OPERATIONAL','HIGH',
    '미국 3세대 보병 휴대 대전차미사일. 발사 후 망각. 탑공격 모드. 우크라이나 배치 러시아 전차 파괴 핵심 무기.',
    {range:'2,500m(직접)/4,750m(CLU)',payload:'탠덤 HEAT(>750mm RHA)',guidance:'IIR 영상 탐색기',firstDeployed:'1996년',manufacturer:'레이시온+록히드마틴'},
    ['재블린','Javelin','ATGM','우크라이나','발사후망각'],['Raytheon','US Army','Jane\'s'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Javelin_missile_launch.jpg/320px-Javelin_missile_launch.jpg',
    'https://en.wikipedia.org/wiki/FGM-148_Javelin',99),

  w('usa-e07','AGM-158B JASSM-ER','AGM-158B JASSM-ER Cruise Missile','CRUISE','USA','OPERATIONAL','HIGH',
    '미국 장거리 스텔스 공대지 순항미사일. 사거리 900km. F-35·F-15·B-1·B-52 탑재. 대북·대중 핵심 정밀타격 자산.',
    {range:'900km+(ER형)',speed:'마하 0.9',payload:'450kg WDU-42/B 관통탄두',guidance:'GPS+INS+IIR',firstDeployed:'2014년(ER형)',manufacturer:'록히드마틴'},
    ['JASSM-ER','AGM-158','스텔스순항미사일','F-35탑재'],['Lockheed Martin','USAF','Jane\'s'],
    undefined,'https://en.wikipedia.org/wiki/AGM-158_JASSM',95),

  w('usa-e08','Virginia급 핵잠수함','Virginia-class SSN Attack Submarine','SUBMARINE','USA','OPERATIONAL','HIGH',
    '미국 최신 공격 핵잠수함. 척당 3조원+. 토마호크 40발+Mk48어뢰. Block V: VPM 추가(TALMD 65발). AUKUS에 공급 예정.',
    {displacement:'10,200톤(수중)',length:'115m',crew:'135명',armament:'토마호크×40+Mk48×12(Block V TALMD+65)',propulsion:'S9G 원자로 1기',speed:'25+노트(수중)',firstDeployed:'2004년'},
    ['버지니아급','SSN','핵잠수함','AUKUS','토마호크'],['US Navy','Jane\'s'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/USS_Virginia_SSN-774_underway.jpg/320px-USS_Virginia_SSN-774_underway.jpg',
    'https://en.wikipedia.org/wiki/Virginia-class_submarine',95),

  w('usa-e09','Gerald R. Ford급 항모','Gerald R. Ford-class CVN','NAVAL','USA','OPERATIONAL','HIGH',
    '미국 최신 핵추진 항모. EMALS 전자기 사출. 배수량 100,000톤. F-35C+F/A-18E/F+EA-18G 탑재. 1번함 포드함 2017년 취역.',
    {displacement:'100,000+톤',length:'337m',crew:'4,500명(함재기 포함)',armament:'EMALS사출+F-35C×48+FA/18E/F×36+EA-18G×5+E-2D+RIM-162 ESSM',propulsion:'A1B 원자로 2기',speed:'30+노트',firstDeployed:'2017년'},
    ['포드급','CVN','항모','EMALS','미해군'],['US Navy','Jane\'s'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/USS_Gerald_R._Ford_%28CVN-78%29.jpg/320px-USS_Gerald_R._Ford_%28CVN-78%29.jpg',
    'https://en.wikipedia.org/wiki/Gerald_R._Ford-class_aircraft_carrier',97),

  w('usa-e10','SM-6 함대공미사일','RIM-174 SM-6 ERAM','SAM','USA','OPERATIONAL','HIGH',
    '미 해군 최신 함대공미사일. 대공·대함·탄도미사일 3중 요격. 사거리 370km. 이지스 VLS Mk41 탑재. 한국에도 공급.',
    {range:'370km',altitude:'33km',guidance:'능동레이더탐색기(AIM-120 탐색기 유용)',firstDeployed:'2013년',manufacturer:'레이시온'},
    ['SM-6','ERAM','함대공','대함','탄도미사일요격'],['US Navy','Raytheon','Jane\'s'],
    undefined,'https://en.wikipedia.org/wiki/RIM-174_Standard_ERAM',95),

  // ══════════════════════════════════════════════════════
  // 유럽 (UK·프랑스·독일·이탈리아·네덜란드)
  // ══════════════════════════════════════════════════════
  w('uk-e01','Eurofighter Typhoon','Eurofighter Typhoon Multirole Fighter','AIRCRAFT','UK','OPERATIONAL','HIGH',
    '유럽 4개국 공동 개발 4++ 세대 다목적 전투기. 영국·독일·이탈리아·스페인 운용. 사우디·쿠웨이트·카타르·일본 등 수출.',
    {range:'2,900km',speed:'마하 2.0',payload:'9,000kg',length:'15.96m',propulsion:'Eurojet EJ200 ×2 20,000lbf 각',crew:'1~2명',firstDeployed:'2003년',armament:'27mm Mauser+Meteor+IRIS-T+Storm Shadow+Brimstone'},
    ['타이푼','Typhoon','유로파이터','4++세대','수출'],['BAE Systems','Airbus','Jane\'s'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Eurofighter_Typhoon_-_RIAT_2019_%2848264540847%29.jpg/320px-Eurofighter_Typhoon_-_RIAT_2019_%2848264540847%29.jpg',
    'https://en.wikipedia.org/wiki/Eurofighter_Typhoon',97),

  w('uk-e02','Trident II D5 SLBM','UGM-133 Trident II D5 SLBM (UK)','SLBM','UK','OPERATIONAL','CRITICAL',
    '영국 핵억제력 유일 수단. 뱅가드급 SSBN 4척 탑재. 각 최대 8발(12발 가능). 미국 트라이던트와 동일 플랫폼. 사거리 11,300km.',
    {range:'11,300km',payload:'MIRV 최대 8발(40kt 각)',propulsion:'고체연료 3단',firstDeployed:'1994년(영국)'},
    ['트라이던트','Trident','영국핵','SLBM','뱅가드급'],['UK MOD','Jane\'s','FAS'],
    undefined,'https://en.wikipedia.org/wiki/Trident_II',95),

  w('uk-e03','Type 45 Daring급 구축함','Type 45 Daring-class Destroyer','NAVAL','UK','OPERATIONAL','HIGH',
    '영국 최신 방공 구축함. Aster 15/30 48셀. PAAMS 방공 체계. 매우 뛰어난 방공 능력. 6척 운용.',
    {displacement:'7,350톤',length:'152m',crew:'190명',armament:'Aster 15/30(48셀)+114mm 함포+Harpoon+팰링스',propulsion:'IFEP 전기추진',speed:'29노트',firstDeployed:'2009년',quantity:'6척'},
    ['Type 45','대링급','영국구축함','PAAMS','Aster'],['Royal Navy','Jane\'s'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Type_45_HMS_Dragon.jpg/320px-Type_45_HMS_Dragon.jpg',
    'https://en.wikipedia.org/wiki/Type_45_destroyer',90),

  w('fra-e01','Rafale 다목적전투기','Dassault Rafale Multirole Fighter','AIRCRAFT','FRANCE','OPERATIONAL','HIGH',
    '프랑스 4.5세대 다목적 전투기. 인도·이집트·그리스·카타르·UAE·크로아티아 수출 성공. ASMP-A 핵미사일 탑재.',
    {range:'1,850km(전투)',speed:'마하 1.8',payload:'9,500kg',length:'15.3m',propulsion:'Snecma M88-2 ×2 17,000lbf 각',crew:'1~2명',firstDeployed:'2001년',armament:'30mm GIAT 30+Meteor+MICA+SCALP EG+ASMP-A(핵)'},
    ['라팔','Rafale','프랑스','다목적','핵탑재','대규모수출'],['Dassault','FRA AF','Jane\'s'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/French_Air_Force_Rafale_C.jpg/320px-French_Air_Force_Rafale_C.jpg',
    'https://en.wikipedia.org/wiki/Dassault_Rafale',97),

  w('fra-e02','ASMP-A 핵 공대지미사일','ASMP-A Nuclear Air-Launched Cruise Missile','CRUISE','FRANCE','OPERATIONAL','CRITICAL',
    '프랑스 항공기 탑재 핵순항미사일. 라팔·미라주 2000N 탑재. 사거리 500km. TNA 핵탄두 탑재.',
    {range:'500km',speed:'마하 3.0',payload:'TNA 핵탄두(300kt)',firstDeployed:'2009년',manufacturer:'MBDA'},
    ['ASMP-A','프랑스핵','핵순항미사일','라팔탑재'],['DGA','FAS'],
    undefined,'https://en.wikipedia.org/wiki/ASMP_(missile)',88),

  w('fra-e03','Charles de Gaulle 항모','Charles de Gaulle R91 Aircraft Carrier','NAVAL','FRANCE','OPERATIONAL','HIGH',
    '프랑스 핵추진 항모. 유럽 유일 항모(영국 제외). 라팔M+E-2C 호크아이 탑재. 배수량 42,000톤.',
    {displacement:'42,000톤',length:'261.5m',crew:'1,950명',armament:'라팔M×24+E-2C×3+Aster 15+팰링스',propulsion:'K15 원자로 2기 83,000마력',speed:'27노트',firstDeployed:'2001년'},
    ['드골함','Charles de Gaulle','항모','프랑스해군','핵추진'],['French Navy','Jane\'s'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Charles_de_Gaulle_%28R91%29_underway.jpg/320px-Charles_de_Gaulle_%28R91%29_underway.jpg',
    'https://en.wikipedia.org/wiki/French_aircraft_carrier_Charles_de_Gaulle',95),

  w('deu-e01','Leopard 2A7 전차','Leopard 2A7 Main Battle Tank','GROUND','GERMANY','OPERATIONAL','HIGH',
    '독일 최신 레오파르트 2 전차. 폴란드·우크라이나 공여. 세계 최다 수출 MBT 중 하나. 120mm L55A1 활강포.',
    {weight:'68,000kg',crew:'4명',armament:'120mm L55A1 활강포+MG3 7.62mm×2',propulsion:'MTU MB 873 Ka-501 1,500hp',speed:'72km/h(도로)',firstDeployed:'2014년(A7)',manufacturer:'KMW·Rheinmetall',quantity:'3,500+대(전 계열)'},
    ['레오파르트2','Leopard 2A7','독일전차','수출','우크라이나'],['KMW','Rheinmetall','Jane\'s'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Leopard_2A7.jpg/320px-Leopard_2A7.jpg',
    'https://en.wikipedia.org/wiki/Leopard_2',97),

  w('ita-e01','Camo B1 Centauro 장륜전차','B1 Centauro 105mm Wheeled Tank Destroyer','GROUND','MULTI','OPERATIONAL','MED',
    '이탈리아·스페인·요르단 운용 장륜 대전차 차량. 105mm 주포. 8×8 바퀴. 우크라이나 공여.',
    {weight:'26,000kg',crew:'4명',armament:'105mm 저반동 활강포+7.62mm',propulsion:'Iveco 520hp 디젤',speed:'110km/h(도로)',firstDeployed:'1991년'},
    ['첸타우로','Centauro','장륜전차','이탈리아','우크라이나공여'],['Iveco DV','Jane\'s'],
    undefined,'https://en.wikipedia.org/wiki/B1_Centauro',90),

  // ══════════════════════════════════════════════════════
  // 아시아-태평양 (일본·인도·대만·호주)
  // ══════════════════════════════════════════════════════
  w('jpn-e01','F-35B 스텔스기(일본)','Lockheed Martin F-35B (JASDF)','AIRCRAFT','JAPAN','OPERATIONAL','HIGH',
    '일본 항공자위대 도입 F-35B STOVL형. 이즈모급 경항모 개조 후 탑재 예정. 수직이착륙 능력.',
    {range:'1,670km',speed:'마하 1.6',payload:'6,800kg',propulsion:'F135-PW-600 43,000lbf',crew:'1명',firstDeployed:'2023년(일본)',armament:'AIM-120/AIM-9X/JSM/JDAM'},
    ['F-35B','STOVL','일본','이즈모','수직이착륙'],['JASDF','Jane\'s'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/F-35B_vertical_landing.jpg/320px-F-35B_vertical_landing.jpg',
    'https://en.wikipedia.org/wiki/Lockheed_Martin_F-35B_Lightning_II',95),

  w('jpn-e02','이즈모급 경항모','Izumo-class DDH (Light Carrier Conversion)','NAVAL','JAPAN','OPERATIONAL','HIGH',
    '일본 이즈모급 헬기구축함. F-35B 탑재 개조(2025~). 사실상 경항모화. 배수량 26,000톤. 일본 군비확장 상징.',
    {displacement:'26,000톤',length:'248m',crew:'470명',armament:'SeaRAM+CIWS+F-35B×10+SH-60K×5',propulsion:'가스터빈 4기',speed:'30노트',firstDeployed:'2015년(1번함)',quantity:'2척'},
    ['이즈모','DDH','일본경항모','F-35B','군비확장'],['JMSDF','Jane\'s'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/JS_Izumo%28DDH-183%29_underway.jpg/320px-JS_Izumo%28DDH-183%29_underway.jpg',
    'https://en.wikipedia.org/wiki/Izumo-class_helicopter_destroyer',90),

  w('jpn-e03','Type 10 전차','Type 10 Hitomaru MBT','GROUND','JAPAN','OPERATIONAL','HIGH',
    '일본 최신 3세대 주력전차. 44톤(경량 설계). 능동방호·C4I·120mm L44. 도로·산악지형 최적화.',
    {weight:'44,000kg',crew:'3명',armament:'120mm L44 활강포+7.62mm M2',propulsion:'4SA16V 1,200ps',speed:'70km/h',firstDeployed:'2012년',manufacturer:'미쓰비시중공업',quantity:'130+대'},
    ['Type 10','히토마루','일본전차','경량MBT'],['미쓰비시','JGSDF','Jane\'s'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Type_10_Tank_2.jpg/320px-Type_10_Tank_2.jpg',
    'https://en.wikipedia.org/wiki/Type_10_tank',90),

  w('ind-e01','Rafale(인도)','Dassault Rafale (IAF)','AIRCRAFT','INDIA','OPERATIONAL','HIGH',
    '인도 공군 도입 라팔 36대. 2021년 전력화 완료. 히말라야 분쟁지역 배치. SCALP+Meteor+RBE2-AA AESA.',
    {range:'1,850km',speed:'마하 1.8',firstDeployed:'2020년(인도)',quantity:'36대'},
    ['라팔','Rafale','인도공군','히말라야','SCALP'],['Dassault','IAF'],
    undefined,'https://en.wikipedia.org/wiki/Dassault_Rafale',97),

  w('ind-e02','Agni-V ICBM','Agni-V Intercontinental Ballistic Missile','ICBM','INDIA','OPERATIONAL','CRITICAL',
    '인도 최초 ICBM급 탄도미사일. 사거리 5,000~5,500km. 베이징·상하이 타격 가능. MIRV 탑재 개발 중. 2012년 첫 시험.',
    {range:'5,000~5,500km',payload:'1,500kg(단두)/MIRV 개발 중',propulsion:'고체연료 3단',firstDeployed:'2022년(전력화)'},
    ['아그니5','Agni-V','인도ICBM','핵','MIRV'],['DRDO','Jane\'s','FAS'],
    undefined,'https://en.wikipedia.org/wiki/Agni-V',85),

  w('ind-e03','BrahMos 초음속순항미사일','BrahMos PJ-10 Supersonic Cruise Missile','CRUISE','INDIA','OPERATIONAL','HIGH',
    '인도-러시아 합작 초음속 순항미사일. 마하 2.8~3.0. 함발사·공발사·지발사·잠발사 모두 가능. 필리핀·베트남·인도네시아 수출.',
    {range:'290~500km(ER형)',speed:'마하 2.8~3.0',payload:'200~300kg',guidance:'INS+GPS+능동레이더',firstDeployed:'2005년',manufacturer:'BrahMos Aerospace'},
    ['브라모스','BrahMos','초음속','인도러시아합작','필리핀수출'],['BrahMos','Jane\'s'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/BrahMos-Cruise-Missile.jpg/320px-BrahMos-Cruise-Missile.jpg',
    'https://en.wikipedia.org/wiki/BrahMos',95),

  w('twn-e01','F-16V Viper (대만)','Lockheed Martin F-16V Viper (ROCAF)','AIRCRAFT','TAIWAN','OPERATIONAL','HIGH',
    '대만 공군 F-16A/B→V 업그레이드. APG-83 AESA 레이더. AIM-120D+AGM-88. 대중 억제 핵심 전력. 신형 66대 추가 도입.',
    {range:'2,400km',speed:'마하 2.0',payload:'7,700kg',propulsion:'F110-GE-129 29,000lbf',firstDeployed:'2023년(Viper형)',quantity:'141+대(업그레이드)'},
    ['F-16V','Viper','대만','AESA','억제'],['ROCAF','록히드마틴','Jane\'s'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/F-16V_Taiwan.jpg/320px-F-16V_Taiwan.jpg',
    'https://en.wikipedia.org/wiki/General_Dynamics_F-16_Fighting_Falcon_variants#Block_70/72_(F-16V)',90),

  w('twn-e02','Hsiung Feng III 초음속미사일','Hsiung Feng III Supersonic Anti-Ship Missile','SSM','TAIWAN','OPERATIONAL','HIGH',
    '대만 국산 초음속 대함미사일. 마하 2.0. 중국 Type055 구축함 위협용. 해안 발사대·함정 탑재.',
    {range:'150~300km',speed:'마하 2.0',payload:'180kg 반장갑 탄두',guidance:'INS+능동레이더',firstDeployed:'2007년',manufacturer:'CSIST'},
    ['슝펑3','Hsiung Feng III','대만','대함미사일','초음속'],['CSIST','ROC Navy'],
    undefined,'https://en.wikipedia.org/wiki/Hsiung_Feng_III',80),

  // ══════════════════════════════════════════════════════
  // 중동·기타 (이스라엘·사우디·UAE·파키스탄·이란)
  // ══════════════════════════════════════════════════════
  w('isr-e01','Iron Dome 아이언돔','Iron Dome Air Defense System','SAM','ISRAEL','OPERATIONAL','HIGH',
    '이스라엘 단거리 로켓·포탄 요격 체계. 가자·레바논 로켓 수천 발 요격. 미국도 도입 계약. 요격률 90%+.',
    {range:'4~70km',altitude:'10km',fireRate:'초당 수십 발 탐지·요격',guidance:'레이더+타미르 요격미사일',firstDeployed:'2011년',manufacturer:'Rafael+IAI'},
    ['아이언돔','Iron Dome','이스라엘','방공','가자'],['Rafael','IAI','Israel MOD'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Iron_Dome_battery_near_Ashkelon.jpg/320px-Iron_Dome_battery_near_Ashkelon.jpg',
    'https://en.wikipedia.org/wiki/Iron_Dome',97),

  w('isr-e02','Arrow-3 탄도미사일요격','Arrow 3 (Hetz-3) BMD Interceptor','SAM','ISRAEL','OPERATIONAL','CRITICAL',
    '이스라엘-미국 공동 개발 대기권 외 탄도미사일 요격 체계. 이란 ICBM·탄두 요격 가능. 2024년 이란 미사일 요격 성공.',
    {range:'2,400km',altitude:'100~150km(대기권 외)',guidance:'Ku-band 레이더+2단 요격기',firstDeployed:'2017년',manufacturer:'IAI+Boeing'},
    ['Arrow-3','헤츠3','탄도미사일요격','이란요격','이스라엘'],['IAI','Israel MOD'],
    undefined,'https://en.wikipedia.org/wiki/Arrow_3',92),

  w('isr-e03','F-35I Adir (이스라엘)','Lockheed Martin F-35I Adir (IAF)','AIRCRAFT','ISRAEL','OPERATIONAL','HIGH',
    '이스라엘 특수 개량 F-35A. 국산 장비 통합(링크16·EW 시스템). 이란 핵시설 장거리 타격 능력 보유. 50+대 운용 중.',
    {range:'2,200km(급유 시 무제한)',speed:'마하 1.6',payload:'8,100kg',firstDeployed:'2017년',armament:'국산EW+JDAM+파이썬5+AIM-120D+Rocks관통폭탄'},
    ['F-35I','아디르','이스라엘','스텔스','이란타격'],['IAF','록히드마틴'],
    undefined,'https://en.wikipedia.org/wiki/Lockheed_Martin_F-35_Lightning_II_Israeli_variants',95),

  w('pak-e01','JF-17 Thunder (파키스탄)','CAC/PAC JF-17 Thunder','AIRCRAFT','PAKISTAN','OPERATIONAL','MED',
    '파키스탄-중국 합작 전투기. F-16 보완·대체. Block-3는 AESA 레이더+HMDS+IRST. 미얀마·나이지리아·아제르바이잔 수출.',
    {range:'1,352km',speed:'마하 1.6',payload:'3,800kg',propulsion:'RD-93 18,300lbf',firstDeployed:'2007년',armament:'CM-400AKG+PL-5E/PL-12+SD-10'},
    ['JF-17','Thunder','파키스탄중국합작','Block3','수출'],['CAC','PAC','Jane\'s'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/JF-17B_-_AirShow_China_2018.jpg/320px-JF-17B_-_AirShow_China_2018.jpg',
    'https://en.wikipedia.org/wiki/CAC/PAC_JF-17_Thunder',88),

  w('tur-e01','Bayraktar TB2 드론','Bayraktar TB2 UCAV','UAV','TURKEY','OPERATIONAL','HIGH',
    '터키 수출 최강 무장드론. 우크라이나·아제르바이잔·에티오피아 실전. 24시간 체공. MAM-C/MAM-L 스마트 마이크로 폭탄.',
    {ceiling:'8,200m',range:'150km(통신거리)',speed:'130km/h',payload:'150kg(MAM-C 4발 또는 MAM-L 2발)',crew:'없음',propulsion:'Rotax 912iS 100hp',firstDeployed:'2014년',manufacturer:'Baykar'},
    ['TB2','바이락타르','터키드론','우크라이나','아제르바이잔'],['Baykar','Jane\'s'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/TB2_Ukrainian_Armed_Forces.jpg/320px-TB2_Ukrainian_Armed_Forces.jpg',
    'https://en.wikipedia.org/wiki/Bayraktar_TB2',97),

  w('tur-e02','KAAN 전투기 (TAI TF-X)','TAI TF-X KAAN Fighter Jet','AIRCRAFT','TURKEY','DEVELOPMENT','MED',
    '터키 최초 국산 5세대 전투기. 2023년 초도비행. 2028년 배치 목표. F-35 구매 거절 후 개발 가속.',
    {speed:'마하 1.8+(목표)',range:'1,000km+(전투행동반경 목표)',propulsion:'GE F110 ×2(현재)/국산 개발 중(목표)',firstDeployed:'2028년(목표)',manufacturer:'TAI'},
    ['KAAN','TF-X','터키국산전투기','5세대'],['TAI','튀르키예국방부'],
    undefined,'https://en.wikipedia.org/wiki/TAI_TF-X',65),

  w('ira-e01','Fateh-110 탄도미사일','Fateh-110 Short-Range Ballistic Missile (Iran)','SRBM','IRAN','OPERATIONAL','HIGH',
    '이란 고체연료 단거리 탄도미사일. 사거리 300km. 이라크·시리아·예멘 후티에 제공. 이스라엘·사우디 타격 능력.',
    {range:'300km',payload:'650kg',propulsion:'고체연료',guidance:'GPS+INS',firstDeployed:'2002년'},
    ['파테110','Fateh-110','이란','고체연료','SRBM'],['IRGC','CSIS'],
    undefined,'https://en.wikipedia.org/wiki/Fateh-110',80),

  w('sau-e01','F-15SA 전투기 (사우디)','Boeing F-15SA Eagle (RSAF)','AIRCRAFT','MULTI','OPERATIONAL','HIGH',
    '사우디 공군 최신 F-15SA. EPAWSS+APG-63(v)3 AESA. 예멘 공습 주력. 84대 보유.',
    {range:'3,900km',speed:'마하 2.5',payload:'12,000kg',firstDeployed:'2017년',quantity:'84대',armament:'AIM-120C+AIM-9M+GBU-28+JDAM'},
    ['F-15SA','사우디','예멘공습','AESA','미국수출'],['Boeing','RSAF'],
    undefined,'https://en.wikipedia.org/wiki/McDonnell_Douglas_F-15_Eagle_variants#F-15S/SA',90),
]
