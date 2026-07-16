import type { WeaponSystem } from './weapons'
const w = (id:string,name:string,nameEng:string,cat:WeaponSystem['category'],origin:WeaponSystem['origin'],status:WeaponSystem['status'],threat:WeaponSystem['threatRating'],desc:string,specs:WeaponSystem['specs'],tags:string[],sources:string[],img?:string,wiki?:string,conf=90): WeaponSystem=>({id,name,nameEng,category:cat,origin,status,threatRating:threat,description:desc,detail:`## ${nameEng}\n\n${desc}\n\n### 주요 제원\n${Object.entries(specs).filter(([,v])=>v).map(([k,v])=>`- ${k}: ${v}`).join('\n')}`,specs,confidence:conf,lastUpdated:'2026-07-03',relatedIntelIds:[],tags,sources,imageUrl:img,wikiUrl:wiki})

export const WEAPONS_BATCH25_GLOBAL_AIRCRAFT: WeaponSystem[] = [

  // ── 미국 전투기 추가 ─────────────────────────────────────────────────────
  w('ga-usa001','F-22A 랩터','F-22A Raptor Air Superiority Fighter','AIRCRAFT','USA','OPERATIONAL','HIGH',
    '세계 유일 완전 스텔스 5세대 공중우세 전투기. 초음속 순항(마하 1.8). AIM-120D 6발 내부탑재. 생산 중단.',
    {speed:'마하 2.25',crew:'1명',armament:'AIM-120D×6·AIM-9X×2·20mm M61A2',firstDeployed:'2005년',quantity:'186기',manufacturer:'록히드마틴'},
    ['F-22','랩터','공중우세','5세대','스텔스'],['록히드마틴','USAF'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/F-22_Raptor_edit1_%28cropped%29.jpg/320px-F-22_Raptor_edit1_%28cropped%29.jpg',
    'https://en.wikipedia.org/wiki/Lockheed_Martin_F-22_Raptor',98),

  w('ga-usa002','A-10C 썬더볼트 II','A-10C Thunderbolt II CAS','AIRCRAFT','USA','OPERATIONAL','MED',
    '대지공격 전용기. 30mm GAU-8 개틀링포. 근접항공지원(CAS) 최강. 방어력 탁월. 퇴역 연기 중.',
    {speed:'706km/h',crew:'1명',armament:'30mm GAU-8 Avenger·매버릭·MK82',firstDeployed:'1977년',quantity:'281기',manufacturer:'페어차일드리퍼블릭'},
    ['A-10','썬더볼트','GAU-8','CAS','대지공격'],['페어차일드','USAF'],
    undefined,'https://en.wikipedia.org/wiki/Fairchild_Republic_A-10_Thunderbolt_II',90),

  w('ga-usa003','B-21 레이더 스텔스폭격기','B-21 Raider Stealth Bomber','AIRCRAFT','USA','DEVELOPMENT','HIGH',
    '차세대 핵전략 스텔스 폭격기. B-2 대체. 극초음속·핵폭탄 탑재. 100기 이상 생산 계획.',
    {speed:'아음속(스텔스)',armament:'핵폭탄·재래식 정밀유도폭탄',firstDeployed:'2025년(예정)',manufacturer:'노스럽그루먼'},
    ['B-21','레이더','스텔스폭격기','핵'],['노스럽그루먼','USAF'],
    undefined,'https://en.wikipedia.org/wiki/Northrop_Grumman_B-21_Raider',90),

  w('ga-usa004','EA-18G 그라울러','EA-18G Growler Electronic Warfare','AIRCRAFT','USA','OPERATIONAL','HIGH',
    'F/A-18F 기반 전자전기. 적 레이더·통신 재밍. USN 핵심 SEAD. ALQ-99→NGJ-MB 전환 중.',
    {speed:'마하 1.8',crew:'2명',armament:'AGM-88 HARM·AIM-120·AN/ALQ-99',firstDeployed:'2009년',quantity:'160기',manufacturer:'보잉'},
    ['EA-18G','그라울러','전자전','재밍','SEAD'],['보잉','USN'],
    undefined,'https://en.wikipedia.org/wiki/Boeing_EA-18G_Growler',90),

  w('ga-usa005','P-8A 포세이돈','P-8A Poseidon Maritime Patrol','AIRCRAFT','USA','OPERATIONAL','HIGH',
    '보잉 737 기반 해상초계기. 어뢰·하푼 탑재. 잠수함 추적. 동맹국 수출 인기.',
    {speed:'907km/h',crew:'9명',armament:'MK54 어뢰·AGM-84 하푼',firstDeployed:'2013년',manufacturer:'보잉'},
    ['P-8A','포세이돈','해상초계','잠수함추적'],['보잉','USN'],
    undefined,'https://en.wikipedia.org/wiki/Boeing_P-8_Poseidon',95),

  w('ga-usa006','MQ-9B 시가디언','MQ-9B SeaGuardian Maritime UAV','UAV','USA','OPERATIONAL','HIGH',
    'MQ-9 리퍼 해상 파생형. 35시간 체공. 해상 감시·대잠. 동맹국 수출.',
    {ceiling:'15km',speed:'370km/h',armament:'GBU-12·AGM-114 헬파이어',firstDeployed:'2020년',manufacturer:'GA-ASI'},
    ['MQ-9B','시가디언','해상UAV','대잠','정찰'],['GA-ASI','USN'],
    undefined,undefined,88),

  w('ga-usa007','MV-22B 오스프리','MV-22B Osprey Tiltrotor','AIRCRAFT','USA','OPERATIONAL','MED',
    '틸트로터 수직이착륙 수송기. 수평 비행 속도+헬기 이착륙 결합. USMC 핵심 상륙 전력.',
    {speed:'509km/h',crew:'3+24명',armament:'7.62mm M240·12.7mm',firstDeployed:'2007년',quantity:'400여기',manufacturer:'보잉·벨'},
    ['MV-22','오스프리','틸트로터','USMC','수직이착륙'],['보잉','벨','USMC'],
    undefined,'https://en.wikipedia.org/wiki/Bell_Boeing_V-22_Osprey',88),

  // ── 러시아 전투기 추가 ─────────────────────────────────────────────────
  w('ga-rus001','Su-57 페레크','Su-57 Felon 5th Gen Fighter','AIRCRAFT','RUSSIA','OPERATIONAL','HIGH',
    '러시아 유일 5세대 전투기. AESA 레이더·내부 무장창. 우크라이나 전쟁 제한적 투입. 양산 지연.',
    {speed:'마하 2.0',crew:'1명',armament:'R-77M·Kh-58UShKE·30mm GSh-30-1',firstDeployed:'2020년',quantity:'28기(2025)',manufacturer:'수호이'},
    ['Su-57','페레크','5세대','러시아스텔스'],['수호이','러시아공군'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Sukhoi_Design_Bureau%2C_054%2C_Sukhoi_T-50_%28Su-57_prototype%29_%2849581303977%29.jpg/330px-Sukhoi_Design_Bureau%2C_054%2C_Sukhoi_T-50_%28Su-57_prototype%29_%2849581303977%29.jpg','https://en.wikipedia.org/wiki/Sukhoi_Su-57',82),

  w('ga-rus002','Tu-22M3 역화염','Tu-22M3 Backfire-C Bomber','AIRCRAFT','RUSSIA','OPERATIONAL','HIGH',
    '러시아 중거리 전략폭격기. 가변익. Kh-22/32 대함미사일 탑재. 우크라이나 공격에 적극 사용.',
    {speed:'마하 1.88',crew:'4명',armament:'Kh-22/32·Kh-15·핵폭탄',firstDeployed:'1983년',quantity:'60여기',manufacturer:'투폴레프'},
    ['Tu-22M3','백파이어','중폭격기','Kh-32','가변익'],['투폴레프','러시아공군'],
    undefined,'https://en.wikipedia.org/wiki/Tupolev_Tu-22M',85),

  w('ga-rus003','Su-34 풀백 업그레이드','Su-34M Fullback Strike Fighter Upgrade','AIRCRAFT','RUSSIA','OPERATIONAL','HIGH',
    'Su-27 기반 2인승 전폭기 개량형. 우크라이나 글라이드폭탄(KAB-500S·FAB-500M62) 집중 사용. 생산 증가 중.',
    {speed:'마하 1.8',crew:'2명(나란히)',armament:'Kh-59MK·KAB-500·FAB-500·Kh-31',firstDeployed:'2006년',quantity:'140여기',manufacturer:'수호이'},
    ['Su-34','풀백','전폭기','글라이드폭탄','우크라이나'],['수호이','러시아공군'],
    undefined,'https://en.wikipedia.org/wiki/Sukhoi_Su-34',88),

  w('ga-rus004','MiG-31BM 폭스하운드','MiG-31BM Foxhound Interceptor','AIRCRAFT','RUSSIA','OPERATIONAL','HIGH',
    '러시아 고속 요격기. 마하 2.83. Kh-47M2 킨잘 극초음속 미사일 발사. 우크라이나 요격에 사용.',
    {speed:'마하 2.83',crew:'2명',armament:'R-37M·Kh-47M2 킨잘·R-33',firstDeployed:'1981년(BM: 2000년대)',quantity:'250여기',manufacturer:'미그'},
    ['MiG-31BM','폭스하운드','요격기','킨잘','마하2.83'],['미그','러시아공군'],
    undefined,'https://en.wikipedia.org/wiki/Mikoyan_MiG-31',85),

  // ── 중국 전투기 추가 ─────────────────────────────────────────────────
  w('ga-chn001','J-20A 흑검','J-20A Mighty Dragon 5th Gen Fighter','AIRCRAFT','CHINA','OPERATIONAL','HIGH',
    '중국 유일 5세대 스텔스. 강화형 J-20A(WS-15 엔진). AESA·내부무장창. 대만·남중국해 억제.',
    {speed:'마하 2.0+(추정)',crew:'1명',armament:'PL-15·PL-10·중력폭탄',firstDeployed:'2017년',quantity:'200여기(추정)',manufacturer:'청두항공'},
    ['J-20','흑검','5세대','중국스텔스','PL-15'],['청두항공','PLAAF'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/J-20_at_CCAS2022_%2820220827103424%29.jpg/330px-J-20_at_CCAS2022_%2820220827103424%29.jpg','https://en.wikipedia.org/wiki/Chengdu_J-20',80),

  w('ga-chn002','J-16 전폭기','J-16 Multi-Role Strike Fighter','AIRCRAFT','CHINA','OPERATIONAL','HIGH',
    'Su-30MKK 기반 중국 독자 개발 다목적 전폭기. AESA·PL-15·YJ-12. PLAAF 핵심 타격전력.',
    {speed:'마하 2.0',crew:'2명',armament:'PL-15·YJ-12·KD-88·LS-6',firstDeployed:'2013년',quantity:'500여기',manufacturer:'선양항공'},
    ['J-16','전폭기','PL-15','YJ-12','중국'],['선양항공','PLAAF'],
    undefined,'https://en.wikipedia.org/wiki/Shenyang_J-16',85),

  w('ga-chn003','J-35 스텔스함재기','J-35A Carrier-Based Stealth Fighter','AIRCRAFT','CHINA','OPERATIONAL','HIGH',
    '중국 차세대 항모탑재 스텔스기. 복좌J-35 수출형도 개발 중. 푸젠 항모 탑재 시작.',
    {speed:'마하 1.8+(추정)',crew:'1명',armament:'PL-15·PL-10·정밀폭탄',firstDeployed:'2023년(푸젠)',manufacturer:'선양항공'},
    ['J-35','스텔스','함재기','항모','중국'],['선양항공','PLAN'],
    undefined,undefined,72),

  w('ga-chn004','H-6K 전략폭격기','H-6K Badger Strategic Bomber','AIRCRAFT','CHINA','OPERATIONAL','HIGH',
    'Tu-16 기반 중국 전략폭격기. CJ-10A 순항미사일 6발 탑재. D-30KP2 엔진. 괌 타격 가능.',
    {speed:'마하 0.85',crew:'4명',armament:'CJ-10A×6·핵폭탄',range:'3,500km(외부탱크)',firstDeployed:'2009년(K형)',quantity:'100여기',manufacturer:'시안항공'},
    ['H-6K','폭격기','CJ-10A','괌타격','전략폭격'],['시안항공','PLAAF'],
    undefined,'https://en.wikipedia.org/wiki/Xian_H-6',85),

  // ── 유럽 전투기 추가 ─────────────────────────────────────────────────
  w('ga-eu001','타이푼 트란슈 4','Eurofighter Typhoon Tranche 4','AIRCRAFT','NATO','DEVELOPMENT','HIGH',
    '유로파이터 트란슈 4. E-SCAN AESA·MBDA 미티어·ALARM SEAD. 쿠웨이트·카타르·이탈리아 공군 도입 예정.',
    {speed:'마하 2.0',crew:'1명',armament:'미티어·AMRAAM·ASRAAM·브림스톤',firstDeployed:'2025년(목표)',manufacturer:'에어버스/BAE/레오나르도'},
    ['타이푼','트란슈4','유로파이터','미티어','AESA'],['에어버스','BAE','레오나르도'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/RAF_Eurofighter_EF-2000_Typhoon_F2_Lofting-1.jpg/330px-RAF_Eurofighter_EF-2000_Typhoon_F2_Lofting-1.jpg','https://en.wikipedia.org/wiki/Eurofighter_Typhoon',88),

  w('ga-eu002','다소 라팔 F4','Dassault Rafale F4 Multirole','AIRCRAFT','FRANCE','OPERATIONAL','HIGH',
    '라팔 F4 표준. AESA RBE2 레이더·타레스 스펙트라 EW. SCALP-EG·미티어·핵미사일(ASMP-A). 인도·이집트 수출.',
    {speed:'마하 1.8',crew:'1명(복좌형별도)',armament:'ASMP-A·미티어·SCALP-EG·mica',firstDeployed:'2021년(F4)',quantity:'100여기(프랑스)',manufacturer:'다소'},
    ['라팔F4','다소','ASMP-A','미티어','인도수출'],['다소','프랑스공군'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Rafale_-_RIAT_2009_%283751416421%29.jpg/330px-Rafale_-_RIAT_2009_%283751416421%29.jpg','https://en.wikipedia.org/wiki/Dassault_Rafale',92),

  w('ga-eu003','그리펜 E','JAS 39E Gripen E Fighter','AIRCRAFT','SWEDEN','OPERATIONAL','HIGH',
    '스웨덴 단발 4.5세대. 스파이-7 AESA. 에어버스 미티어 탑재. 브라질·헝가리 수출. 우크라이나 요청.',
    {speed:'마하 2.0',crew:'1명',armament:'미티어·AIM-9L·SDB II',firstDeployed:'2020년(스웨덴/E형)',manufacturer:'사브'},
    ['그리펜E','JAS39E','스웨덴','미티어','AESA'],['사브','스웨덴공군'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Saab_JAS_39_Gripen_at_Kaivopuisto_Air_Show%2C_June_2017_%28altered%29_copy.jpg/330px-Saab_JAS_39_Gripen_at_Kaivopuisto_Air_Show%2C_June_2017_%28altered%29_copy.jpg','https://en.wikipedia.org/wiki/Saab_JAS_39_Gripen',90),

  w('ga-eu004','토네이도 IDS 독일','Tornado IDS Germany Nuclear','AIRCRAFT','NATO','OPERATIONAL','MED',
    '독일 공군 핵폭탄 운반 임무 특화 토네이도. B61-12 탑재. F-35A로 교체 중.',
    {speed:'마하 2.2',crew:'2명',armament:'B61-12·타우러스·HARM',firstDeployed:'1983년(독일)',quantity:'90여기(순감)',manufacturer:'파나비아'},
    ['토네이도','독일','B61-12','핵공유','NATO핵'],['파나비아','독일공군'],
    undefined,'https://en.wikipedia.org/wiki/Panavia_Tornado',78),

  w('ga-eu005','사브 JAS 39C/D 체코','JAS 39C/D Gripen Czech Air Force','AIRCRAFT','SWEDEN','OPERATIONAL','MED',
    '체코 임차 그리펜. 14기. NATO 표준 무장 통합. 2024년 임차 계약 연장.',
    {speed:'마하 2.0',crew:'1명',armament:'AIM-120·AIM-9·Bk.90',firstDeployed:'2005년(체코)',quantity:'14기',manufacturer:'사브'},
    ['그리펜','체코','임차','JAS39C'],['사브','체코공군'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Saab_JAS_39_Gripen_at_Kaivopuisto_Air_Show%2C_June_2017_%28altered%29_copy.jpg/330px-Saab_JAS_39_Gripen_at_Kaivopuisto_Air_Show%2C_June_2017_%28altered%29_copy.jpg','https://en.wikipedia.org/wiki/Saab_JAS_39_Gripen',85),

  // ── 아시아 전투기 추가 ─────────────────────────────────────────────────
  w('ga-as001','HAL 테자스 MK1A','HAL Tejas MK1A Light Fighter India','AIRCRAFT','INDIA','OPERATIONAL','MED',
    '인도 독자 개발 경전투기 개량형. AESA·에어-에어 공중급유·DRDO 미사일 통합. 83기 양산.',
    {speed:'마하 1.8',crew:'1명',armament:'Python-5·Derby·BVR·Mk82',firstDeployed:'2023년(MK1A)',quantity:'83기(계획)',manufacturer:'HAL'},
    ['테자스MK1A','인도','HAL','AESA','경전투기'],['HAL','IAF'],
    undefined,'https://en.wikipedia.org/wiki/HAL_Tejas',80),

  w('ga-as002','F-2A 지원전투기 일본','F-2A Support Fighter Japan','AIRCRAFT','JAPAN','OPERATIONAL','MED',
    'F-16 기반 일본 독자 개발. 62% 일본 독자부품. J/APG-2 AESA. ASM-2 대함미사일 탑재. 2035년 F-X로 교체.',
    {speed:'마하 2.0',crew:'1명(A형)',armament:'ASM-2×4·AIM-120·AIM-9X',firstDeployed:'2000년',quantity:'94기',manufacturer:'미쓰비시'},
    ['F-2A','지원전투기','일본','F-16기반','ASM-2'],['미쓰비시','항공자위대'],
    undefined,'https://en.wikipedia.org/wiki/Mitsubishi_F-2',88),

  w('ga-as003','F-X GCAP 국제전투기','Global Combat Air Programme GCAP','AIRCRAFT','NATO','DEVELOPMENT','HIGH',
    '일본·영국·이탈리아 공동 6세대 전투기. 2035년 목표. AI·무인 편대비행·극초음속.',
    {firstDeployed:'2035년(목표)',manufacturer:'BAE Systems·IHI·레오나르도'},
    ['GCAP','6세대','일본영국이탈리아','AI전투기'],['BAE','IHI','레오나르도'],
    undefined,undefined,65),

  w('ga-as004','KF-X/IFX 남아시아형','KF-21 Export Variant Asia','AIRCRAFT','ROK','DEVELOPMENT','MED',
    'KF-21 수출형. 인도네시아·이라크·이집트 잠재 고객. 완전 국산 4.5세대 수출 경쟁력.',
    {speed:'마하 1.81',crew:'1명',firstDeployed:'2030년대(수출)',manufacturer:'KAI'},
    ['KF-21수출','KF-X','아시아전투기수출'],['KAI','방위사업청'],
    undefined,undefined,65),

  w('ga-as005','F-16V 블록70 대만','F-16V Block 70 Taiwan Air Force','AIRCRAFT','USA','OPERATIONAL','HIGH',
    '대만 F-16V 업그레이드. APG-83 AESA·링크16. 66기 신규+141기 업그레이드. 대중 억제.',
    {speed:'마하 2.0',crew:'1명',armament:'AIM-120D·AIM-9X·GBU-31',firstDeployed:'2021년(대만V)',quantity:'207기(목표)',manufacturer:'록히드마틴'},
    ['F-16V','대만','APG-83','블록70','AESA'],['록히드마틴','ROCAF'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/F-16_June_2008.jpg/330px-F-16_June_2008.jpg','https://en.wikipedia.org/wiki/General_Dynamics_F-16_Fighting_Falcon',90),

  w('ga-as006','라팔 F3R 인도','Rafale F3R India Air Force','AIRCRAFT','FRANCE','OPERATIONAL','HIGH',
    '인도 공군 라팔. 36기 도입. 히말라야 고고도 작전. 파키스탄·중국 억제. HAMMER 폭탄 탑재.',
    {speed:'마하 1.8',crew:'1명',armament:'미티어·MICA·HAMMER·SCALP',firstDeployed:'2020년(인도)',quantity:'36기',manufacturer:'다소'},
    ['라팔','인도','36기','HAMMER','히말라야'],['다소','IAF'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Rafale_-_RIAT_2009_%283751416421%29.jpg/330px-Rafale_-_RIAT_2009_%283751416421%29.jpg','https://en.wikipedia.org/wiki/Dassault_Rafale',90),

  // ── 중동 전투기 ─────────────────────────────────────────────────────
  w('ga-me001','F-15SA 이글 사우디','F-15SA Eagle Saudi Arabia','AIRCRAFT','USA','OPERATIONAL','HIGH',
    '사우디 F-15SA. 84기+FMS. AESA·컨포멀탱크·JDAM·SDB. 예멘 공습 주력.',
    {speed:'마하 2.5',crew:'1명',armament:'AIM-120D·GBU-31·SDB·AIM-9X',firstDeployed:'2012년',quantity:'84기',manufacturer:'보잉'},
    ['F-15SA','사우디','예멘공습','AESA','이글'],['보잉','RSAF'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/F-15C_Eagle_from_the_44th_Fighter_Squadron_flies_during_a_routine_training_exercise_April_15%2C_2019.jpg/330px-F-15C_Eagle_from_the_44th_Fighter_Squadron_flies_during_a_routine_training_exercise_April_15%2C_2019.jpg','https://en.wikipedia.org/wiki/McDonnell_Douglas_F-15_Eagle',88),

  w('ga-me002','라팔 카타르','Rafale F3R Qatar Emirate Force','AIRCRAFT','FRANCE','OPERATIONAL','HIGH',
    '카타르 라팔. 36기. 중동 최신 라팔. 미티어·SCALP EG. 유럽 비축 대안.',
    {speed:'마하 1.8',crew:'1명',armament:'미티어·SCALP EG·MICA',firstDeployed:'2021년(카타르)',quantity:'36기',manufacturer:'다소'},
    ['라팔','카타르','36기','미티어'],['다소','QEAF'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Rafale_-_RIAT_2009_%283751416421%29.jpg/330px-Rafale_-_RIAT_2009_%283751416421%29.jpg','https://en.wikipedia.org/wiki/Dassault_Rafale',88),

  w('ga-me003','F-15EX 이스라엘 요청','F-15EX Eagle II Israel','AIRCRAFT','USA','DEVELOPMENT','HIGH',
    '이스라엘 F-15EX 차세대 이글 도입 논의. 구형 F-15C/D 대체. APG-82 AESA.',
    {speed:'마하 2.5',crew:'1명',armament:'AIM-120D·GBU-28 벙커버스터',firstDeployed:'2025년+(이스라엘)',manufacturer:'보잉'},
    ['F-15EX','이스라엘','이글II','APG-82'],['보잉','IAF'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/F-15C_Eagle_from_the_44th_Fighter_Squadron_flies_during_a_routine_training_exercise_April_15%2C_2019.jpg/330px-F-15C_Eagle_from_the_44th_Fighter_Squadron_flies_during_a_routine_training_exercise_April_15%2C_2019.jpg','https://en.wikipedia.org/wiki/McDonnell_Douglas_F-15_Eagle',68),

  // ── 훈련기/기타 항공 ─────────────────────────────────────────────────
  w('ga-tr001','T-7A 레드호크','T-7A Red Hawk Trainer USAF','AIRCRAFT','USA','DEVELOPMENT','MED',
    '미 공군 차세대 훈련기. 보잉 설계. 디지털 조종석. F-35A 전환훈련 최적화.',
    {speed:'마하 1.3',crew:'2명',firstDeployed:'2024년(예정)',quantity:'351기(계획)',manufacturer:'보잉'},
    ['T-7A','레드호크','훈련기','F-35전환'],['보잉','USAF'],
    undefined,undefined,75),

  w('ga-tr002','TA-50 블록20','TA-50 Block 20 Advanced Trainer','AIRCRAFT','ROK','OPERATIONAL','MED',
    'T-50 기반 고등훈련기 개량형. 경공격 임무 추가. 이라크·필리핀·태국 수출.',
    {speed:'마하 1.5',crew:'2명',armament:'20mm·AIM-9·Mk82',firstDeployed:'2014년(블록20)',manufacturer:'KAI'},
    ['TA-50','블록20','고등훈련기','수출'],['KAI'],
    undefined,undefined,88),

  w('ga-tr003','M-346 LIFS 이탈리아','M-346 LIFS Advanced Trainer Italy','AIRCRAFT','NATO','OPERATIONAL','MED',
    '레오나르도 M-346. 이탈리아·이스라엘·폴란드·싱가포르 채택. 라팔·타이푼 전환 최적화.',
    {speed:'마하 1.15',crew:'2명',firstDeployed:'2012년',manufacturer:'레오나르도'},
    ['M-346','이탈리아','고등훈련기','레오나르도'],['레오나르도'],
    undefined,undefined,85),

  // ── 해상초계/대잠 ─────────────────────────────────────────────────────
  w('ga-mp001','CN-235 해상초계기','CN-235 MPA Maritime Patrol','AIRCRAFT','NATO','OPERATIONAL','LOW',
    '스페인·인도네시아 공동 개발. 한국·아랍에미리트·브루나이 등 해상초계 운용.',
    {speed:'460km/h',crew:'2+10명',armament:'어뢰·폭뢰·하푼',firstDeployed:'1988년',manufacturer:'CASA/PT DI'},
    ['CN-235','해상초계','스페인','인도네시아','대잠'],['CASA','PT DI','ROK해군'],
    undefined,'https://en.wikipedia.org/wiki/CASA/IPTN_CN-235',82),

  w('ga-mp002','P-1 가와사키 해초기','P-1 Maritime Patrol Aircraft Japan','AIRCRAFT','JAPAN','OPERATIONAL','HIGH',
    '일본 독자 개발 4발 터보팬 해초기. P-3C 대체. 국산 소나 부이·어뢰. 인도·독일 수출 논의.',
    {speed:'996km/h',crew:'13명',armament:'어뢰·ASM-1C·폭뢰',firstDeployed:'2013년',quantity:'33기',manufacturer:'가와사키'},
    ['P-1','일본','해상초계','독자개발','P-3대체'],['가와사키','JMSDF'],
    undefined,'https://en.wikipedia.org/wiki/Kawasaki_P-1',88),

  w('ga-mp003','ATL-2 브레게','ATL-2 Atlantique France Maritime Patrol','AIRCRAFT','FRANCE','OPERATIONAL','MED',
    '프랑스 해초기. ATL-2 개량. 대잠·정찰·ISAR·EO/IR. 2035년 ATL-3 교체 예정.',
    {speed:'648km/h',crew:'12명',armament:'MK46 어뢰·AM-39 엑조세',firstDeployed:'1989년(ATL-2)',quantity:'22기',manufacturer:'브레게/다소'},
    ['ATL-2','대서양','프랑스해초기','대잠'],['다소','프랑스해군'],
    undefined,undefined,80),

  // ── 전자전·특수임무 항공 ───────────────────────────────────────────────
  w('ga-ew001','EC-130H 콤파스콜','EC-130H Compass Call EW Aircraft','AIRCRAFT','USA','OPERATIONAL','HIGH',
    '미 공군 정밀 전자공격기. 통신 재밍·항법방해. ISR 지원. 중동·우크라이나 간접 지원.',
    {speed:'602km/h',crew:'10명+',armament:'없음(전자공격 전용)',firstDeployed:'1983년',quantity:'14기',manufacturer:'록히드'},
    ['EC-130H','콤파스콜','전자공격','EW','재밍'],['록히드','USAF'],
    undefined,undefined,85),

  w('ga-ew002','RC-135V 리벳조인트','RC-135V Rivet Joint SIGINT','AIRCRAFT','USA','OPERATIONAL','HIGH',
    '미 공군 신호정보수집기. 국가급 SIGINT. 우크라이나 전쟁 흑해 상공 상시 운용.',
    {speed:'860km/h',crew:'33명',armament:'없음',firstDeployed:'1964년',quantity:'17기',manufacturer:'보잉'},
    ['RC-135','리벳조인트','SIGINT','신호정보','흑해'],['보잉','USAF'],
    undefined,'https://en.wikipedia.org/wiki/Boeing_RC-135',90),

  w('ga-ew003','E-7A 웨지테일','E-7A Wedgetail AEW&C','AIRCRAFT','USA','OPERATIONAL','HIGH',
    '보잉 737-700 기반 공중조기경보기. 호주·터키·한국(E-7A 도입 논의) 운용.',
    {speed:'855km/h',crew:'12명',armament:'없음',firstDeployed:'2009년',quantity:'6기(호주)',manufacturer:'보잉'},
    ['E-7A','웨지테일','조기경보','AEW&C'],['보잉','RAAF'],
    undefined,'https://en.wikipedia.org/wiki/Boeing_E-7',88),

  w('ga-ew004','A-50U 말러 러시아','A-50U Mainstay AWACS Russia','AIRCRAFT','RUSSIA','OPERATIONAL','HIGH',
    '러시아 A-50 AWACS 개량형. Shmel-2 레이더. 우크라이나 전쟁 폴란드 인근 운용. 우크라이나 드론에 손상 사례.',
    {speed:'800km/h',crew:'15명',armament:'없음',firstDeployed:'2011년(U형)',quantity:'9기',manufacturer:'베리에프'},
    ['A-50U','러시아AWACS','말러','Shmel-2'],['베리에프','러시아공군'],
    undefined,'https://en.wikipedia.org/wiki/Beriev_A-50',80),

  // ── 무인전투기(UCAV) ─────────────────────────────────────────────────
  w('ga-ucav001','MQ-25A 스팅레이','MQ-25A Stingray Carrier Tanker UAV','UAV','USA','DEVELOPMENT','HIGH',
    '미 해군 최초 함재 무인 공중급유기. F-35C·F/A-18E/F 급유. CVN 탑재. 2026년 전력화.',
    {firstDeployed:'2026년(예정)',manufacturer:'보잉'},
    ['MQ-25A','스팅레이','무인급유기','함재UAV'],['보잉','USN'],
    undefined,undefined,82),

  w('ga-ucav002','바이락타르 TB3','Bayraktar TB3 Naval UCAV','UAV','TURKEY','DEVELOPMENT','HIGH',
    '터키 함재형 TB3. 터키 경항모 TCG 아나돌루 탑재. 마그나고 엔진. 100시간 체공.',
    {ceiling:'12km',armament:'MAM-C·MAM-L·미니로켓',firstDeployed:'2023년(시험)',manufacturer:'바이카르'},
    ['TB3','바이락타르','함재드론','아나돌루'],['바이카르','터키해군'],
    undefined,undefined,80),

  w('ga-ucav003','Wing Loong II 익룡-II 수출','Wing Loong II Export UCAV','UAV','CHINA','OPERATIONAL','HIGH',
    '중국 CASC 익룡-II. 중동·아프리카·중앙아시아 수출. 예멘·리비아·이라크 실전 사용.',
    {ceiling:'9km',armament:'AR-1·AR-2·LS-6',firstDeployed:'2017년',manufacturer:'CASC'},
    ['익룡II','중국드론','수출','UCAV'],['CASC','중국공군'],
    undefined,'https://en.wikipedia.org/wiki/CASC_Rainbow',80),

  w('ga-ucav004','크라노스 UCAV 그리스','Kranos UCAV Greece HAI','UAV','GREECE','DEVELOPMENT','LOW',
    '그리스 독자 개발 UCAV. HAI 설계. UCAV 자체 개발 야심 프로젝트. 초기 단계.',
    {firstDeployed:'2030년대(예상)',manufacturer:'HAI(헬레닉 항공산업)'},
    ['크라노스','그리스','UCAV','HAI'],['HAI'],
    undefined,undefined,50),

  w('ga-ucav005','나라이나 MALE UAV 인도','Rustom-II MALE UAV India','UAV','INDIA','DEVELOPMENT','MED',
    '인도 독자 중고도장기체공무인기. 드론 수입 대체. AESA 레이더·정밀타격. 글로벌호크 대체 목표.',
    {ceiling:'9km',armament:'레이저유도폭탄·미사일(계획)',firstDeployed:'2024년(예정)',manufacturer:'DRDO'},
    ['Rustom-II','인도MALE','무인기','DRDO'],['DRDO','HAL'],
    undefined,undefined,68),

  // ── 공중급유기·수송기 ────────────────────────────────────────────────
  w('ga-tan001','KC-46A 페가수스','KC-46A Pegasus Tanker USAF','AIRCRAFT','USA','OPERATIONAL','MED',
    'KC-135 대체 공중급유기. 보잉 767 기반. 멀티포인트 급유. 이스라엘·일본·이탈리아 도입.',
    {speed:'914km/h',crew:'2+',armament:'없음',firstDeployed:'2019년',quantity:'100여기(USAF)',manufacturer:'보잉'},
    ['KC-46A','페가수스','공중급유','급유기'],['보잉','USAF'],
    undefined,'https://en.wikipedia.org/wiki/Boeing_KC-46_Pegasus',88),

  w('ga-tan002','A330 MRTT 다목적급유기','A330 MRTT Multi-Role Tanker Transport','AIRCRAFT','NATO','OPERATIONAL','MED',
    '에어버스 A330 기반. 111t 연료. 9개국 운용. NATO 핵심 공중급유 자산.',
    {speed:'880km/h',crew:'3+',firstDeployed:'2007년',quantity:'80여기(누계)',manufacturer:'에어버스'},
    ['A330MRTT','급유기','에어버스','NATO급유'],['에어버스','NATO'],
    undefined,'https://en.wikipedia.org/wiki/Airbus_A330_MRTT',90),

  w('ga-tan003','IL-78M2 므라스미야','IL-78M2 Midas Tanker Russia','AIRCRAFT','RUSSIA','OPERATIONAL','MED',
    '러시아 공중급유기. IL-76 기반. Tu-22M3·Su-24·Su-34 급유. 알제리 수출.',
    {speed:'800km/h',crew:'6명',firstDeployed:'1987년(M형)',manufacturer:'일류신'},
    ['IL-78','므라스미야','러시아급유기','Il-76기반'],['일류신','러시아공군'],
    undefined,undefined,80),

  // ── 대폭격기/전략자산 ────────────────────────────────────────────────
  w('ga-bom001','B-2A 스피릿','B-2A Spirit Stealth Bomber','AIRCRAFT','USA','OPERATIONAL','HIGH',
    '세계 유일 전익 스텔스 전략폭격기. MOP(GBU-57) 30,000lb 벙커버스터 탑재. 21기.',
    {speed:'마하 0.95',crew:'2명',armament:'B61-12·B83·GBU-57 MOP',firstDeployed:'1997년',quantity:'19기(가동)',manufacturer:'노스럽그루먼'},
    ['B-2','스피릿','스텔스폭격기','전략자산','MOP'],['노스럽그루먼','USAF'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/B-2_Spirit_original.jpg/320px-B-2_Spirit_original.jpg',
    'https://en.wikipedia.org/wiki/Northrop_Grumman_B-2_Spirit',98),

  w('ga-bom002','Tu-160M2 백조','Tu-160M2 Blackjack Upgraded Bomber','AIRCRAFT','RUSSIA','OPERATIONAL','HIGH',
    '세계 최대 가변익 전략폭격기 개량형. Kh-101·Kh-555 순항미사일 12발. 핵전력 핵심.',
    {speed:'마하 2.05',crew:'4명',armament:'Kh-101×12·Kh-555·핵폭탄',range:'12,300km',firstDeployed:'1987년(원형)/2022년(M2)',quantity:'16기',manufacturer:'카잔항공'},
    ['Tu-160M2','백조','전략폭격기','Kh-101','가변익'],['카잔항공','러시아공군'],
    undefined,'https://en.wikipedia.org/wiki/Tupolev_Tu-160',85),

  w('ga-bom003','H-20 차세대 폭격기','H-20 Stealth Bomber China','AIRCRAFT','CHINA','DEVELOPMENT','HIGH',
    '중국 차세대 스텔스 전략폭격기. B-2 유사 전익기. 핵·재래식 이중목적. 2025년 공개 예상.',
    {range:'10,000km+(추정)',armament:'CJ-100·핵폭탄',firstDeployed:'2027년+(추정)',manufacturer:'시안항공'},
    ['H-20','중국스텔스폭격기','핵','전익기'],['시안항공','PLAAF'],
    undefined,undefined,60),

  w('ga-bom004','XB-70A 발키리 (퇴역)','XB-70A Valkyrie Prototype Retired','AIRCRAFT','USA','RETIRED','LOW',
    '마하 3 실험 전략폭격기. 1960년대 미국. 2기 제작. 현재 박물관 전시. 폐기.',
    {speed:'마하 3.05',crew:'2명',firstDeployed:'1964년(시험)',manufacturer:'노스 아메리칸'},
    ['XB-70','발키리','마하3','퇴역','실험기'],['노스아메리칸','USAF'],
    undefined,'https://en.wikipedia.org/wiki/North_American_XB-70_Valkyrie',90),

  // ── 헬기 추가 ─────────────────────────────────────────────────────────
  w('ga-hel001','UH-72A 라코타','UH-72A Lakota Light Helicopter USA','HELICOPTER','USA','OPERATIONAL','LOW',
    'EC-145 기반 미육군 경헬기. 훈련·후송·경계. 403기 도입.',
    {speed:'246km/h',crew:'2+6명',firstDeployed:'2007년',quantity:'403기',manufacturer:'에어버스헬리콥터'},
    ['UH-72A','라코타','경헬기','미육군'],['에어버스','미육군'],
    undefined,undefined,85),

  w('ga-hel002','NH90 NFH 해군형','NH90 NFH Naval Helicopter Europe','HELICOPTER','NATO','OPERATIONAL','MED',
    '유럽 NH90 해군형. 영국 외 다수 유럽국 운용. AW101 대체.',
    {speed:'301km/h',crew:'2+20명(TTH)/4명(NFH)',armament:'무장 가능',firstDeployed:'2006년',manufacturer:'NHI'},
    ['NH90','NFH','나토헬기','해군헬기'],['NHI','유럽해군'],
    undefined,'https://en.wikipedia.org/wiki/NHIndustries_NH90',82),

  w('ga-hel003','AW101 멀린 영국','AW101 Merlin HM2 UK ASW','HELICOPTER','UK','OPERATIONAL','MED',
    '영국 해군 대잠헬기. 소나 탑재·토픽도·스팅레이 어뢰. 항모 운용.',
    {speed:'309km/h',crew:'4+24명',armament:'스팅레이 어뢰·Mk11 폭뢰',firstDeployed:'1999년',quantity:'30여기',manufacturer:'레오나르도/AW'},
    ['AW101','멀린','영국대잠헬기','항모헬기'],['레오나르도','영국해군'],
    undefined,'https://en.wikipedia.org/wiki/AgustaWestland_AW101',88),

  w('ga-hel004','Z-20 블랙호크 중국','Z-20 Utility Helicopter China','HELICOPTER','CHINA','OPERATIONAL','MED',
    'UH-60 역설계 기반 중국 범용헬기. Y9T 터보샤프트. 고원작전 능력. 티베트 배치.',
    {speed:'300km/h',crew:'2+13명',firstDeployed:'2019년',manufacturer:'하얼빈항공'},
    ['Z-20','중국블랙호크','범용헬기','티베트'],['하얼빈항공','PLA'],
    undefined,undefined,80),

  w('ga-hel005','Mi-35M 하인드 E','Mi-35M Hind E Export Attack Helo','HELICOPTER','RUSSIA','OPERATIONAL','HIGH',
    'Mi-24 대폭 개량. 단축익·야시·Ataka ATGM. 아프리카·중동 수출. 나이지리아·이라크 운용.',
    {speed:'310km/h',crew:'2+8명',armament:'12.7mm YakB·Ataka-V·S-8',firstDeployed:'2005년',manufacturer:'미그 로스토프'},
    ['Mi-35M','하인드E','공격헬기','수출'],['미그','러시아수출'],
    undefined,'https://en.wikipedia.org/wiki/Mil_Mi-24',82),

  w('ga-hel006','RAH-66 코만치 (취소)','RAH-66 Comanche Stealth Scout Helo','HELICOPTER','USA','RETIRED','LOW',
    '미 육군 스텔스 정찰헬기. 2004년 취소. 예산 초과·개념변화. 대신 UAV로 대체.',
    {speed:'324km/h',crew:'2명',firstDeployed:'취소(2004)',manufacturer:'보잉·시코르스키'},
    ['코만치','RAH-66','스텔스헬기','취소'],['보잉','시코르스키'],
    undefined,'https://en.wikipedia.org/wiki/Boeing%E2%80%93Sikorsky_RAH-66_Comanche',80),

]
