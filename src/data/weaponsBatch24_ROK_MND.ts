import type { WeaponSystem } from './weapons'
const w = (id:string,name:string,nameEng:string,cat:WeaponSystem['category'],origin:WeaponSystem['origin'],status:WeaponSystem['status'],threat:WeaponSystem['threatRating'],desc:string,specs:WeaponSystem['specs'],tags:string[],sources:string[],img?:string,wiki?:string,conf=90): WeaponSystem=>({id,name,nameEng,category:cat,origin,status,threatRating:threat,description:desc,detail:`## ${nameEng}\n\n${desc}\n\n### 주요 제원\n${Object.entries(specs).filter(([,v])=>v).map(([k,v])=>`- ${k}: ${v}`).join('\n')}`,specs,confidence:conf,lastUpdated:'2026-07-03',relatedIntelIds:[],tags,sources,imageUrl:img,wikiUrl:wiki})

// ── 국방부 육군 무기체계 현황 (data.go.kr OA-9538 기반) ──────────────────────
export const WEAPONS_BATCH24_ROK_MND: WeaponSystem[] = [

  // ══ 기동 무기체계 ════════════════════════════════════════════════════════════
  w('mnd-mob001','K808 바라쿠다 차륜형장갑차','K808 Barracuda 8x8 APC','GROUND','ROK','OPERATIONAL','LOW',
    '한국 육군 차세대 차륜형 장갑차. 8×8 구동. K21 대체 목적. 지상전투시스템 핵심. 방호·기동 균형.',
    {weight:'20t',armament:'K6 12.7mm 또는 K4 40mm',crew:'3+9명',speed:'100km/h',range:'800km',firstDeployed:'2020년',manufacturer:'현대로템'},
    ['K808','바라쿠다','차륜형장갑차','8x8'],['국방부','현대로템','육군본부'],
    undefined,'https://en.wikipedia.org/wiki/K808',92),

  w('mnd-mob002','K21 보병전투차량','K21 Infantry Fighting Vehicle','GROUND','ROK','OPERATIONAL','MED',
    '한국 육군 표준 IFV. 40mm 자동포·현궁 대전차미사일. 알루미늄+복합장갑. 도하 능력 보유.',
    {weight:'25.6t',armament:'40mm 기관포·7.62mm·현궁ATGM',crew:'3+9명',speed:'70km/h',range:'450km',firstDeployed:'2009년',manufacturer:'두산DST',quantity:'900여대'},
    ['K21','보병전투차량','IFV','40mm','현궁'],['두산DST','방위사업청','육군'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/K21_IFV.jpg/320px-K21_IFV.jpg',
    'https://en.wikipedia.org/wiki/K21_IFV',95),

  w('mnd-mob003','K200A1 장갑차','K200A1 APC Upgrade','GROUND','ROK','OPERATIONAL','LOW',
    'K200 장갑차 개량형. 엔진·변속기 업그레이드. K6 12.7mm 탑재. 보병 수송 주력. 노후화로 K21/K808 전환 중.',
    {weight:'13.5t',armament:'K6 12.7mm HMG',crew:'3+9명',speed:'74km/h',range:'480km',firstDeployed:'1985년(A1: 1993년)',manufacturer:'한국기계연구소→현대로템',quantity:'2,800여대'},
    ['K200A1','장갑차','APC','보병수송'],['국방부','방위사업청'],
    undefined,'https://en.wikipedia.org/wiki/K200_APC',88),

  w('mnd-mob004','M48A5K 전차 퇴역','M48A5K Patton ROK Retired','GROUND','ROK','RETIRED','LOW',
    '한국군 M48 패튼 최종 개량형. 105mm 강선포·엔진 업그레이드. 2023년까지 전량 퇴역 완료.',
    {weight:'52t',armament:'105mm M68 강선포',crew:'4명',firstDeployed:'1975년(K형)',manufacturer:'크라이슬러/현지 개량'},
    ['M48A5K','패튼','퇴역전차','105mm'],['국방부'],
    undefined,'https://en.wikipedia.org/wiki/M48_Patton',80),

  w('mnd-mob005','K10 탄약보급장갑차','K10 Armored Resupply Vehicle','GROUND','ROK','OPERATIONAL','LOW',
    'K9 자주포 전용 탄약보급장갑차. 무인 자동 이송. 전장 보급 능력 혁신. K9와 1:1 세트 운용.',
    {weight:'47t',armament:'없음(보급 전용)',crew:'3명',speed:'60km/h',firstDeployed:'2004년',manufacturer:'삼성테크윈(현 한화에어로스페이스)',quantity:'100여대'},
    ['K10','탄약보급','ARV','K9세트'],['한화에어로스페이스','육군'],
    undefined,undefined,90),

  w('mnd-mob006','K1 구난전차','K1 Armored Recovery Vehicle','GROUND','ROK','OPERATIONAL','LOW',
    'K1 전차 기반 구난장갑차. 20t 윈치·크레인 탑재. 전장 파손 전차 견인·구난.',
    {weight:'52t',armament:'없음(구난 전용)',crew:'3명',firstDeployed:'1992년',manufacturer:'현대정공'},
    ['K1ARV','구난전차','회수차량'],['국방부','현대로템'],
    undefined,undefined,85),

  w('mnd-mob007','K1 전차교량','K1 Armored Vehicle-Launched Bridge','GROUND','ROK','OPERATIONAL','LOW',
    'K1 전차 차체 기반 가교전차. 20m 가교 발진. 전술 도하 지원.',
    {weight:'54t',armament:'없음',crew:'2명',firstDeployed:'1994년',manufacturer:'현대정공'},
    ['K1AVLB','가교전차','교량전차','도하지원'],['국방부'],
    undefined,undefined,85),

  w('mnd-mob008','K300 공병장갑차','K300 Combat Engineering Vehicle','GROUND','ROK','OPERATIONAL','LOW',
    '지뢰탐지·제거·공병작업 전용 장갑차. K200 기반. 지뢰원 통로 개척.',
    {weight:'14t',armament:'K6 12.7mm',crew:'3+4명',firstDeployed:'1990년대',manufacturer:'현대로템'},
    ['K300','공병장갑차','지뢰제거','CEV'],['국방부'],
    undefined,undefined,80),

  w('mnd-mob009','K77 포병지휘차량','K77 Fire Direction Center Vehicle','GROUND','ROK','OPERATIONAL','LOW',
    'K9 자주포 지휘통제차량. C4I 연동. 실시간 사격 제원 계산·전달. 첨단 포병 지휘체계.',
    {weight:'30t',armament:'없음',crew:'4~6명',firstDeployed:'2000년대',manufacturer:'한화시스템'},
    ['K77','포병지휘','FDC','C4I','포병'],['한화시스템','육군포병'],
    undefined,undefined,88),

  w('mnd-mob010','차기보병전투장갑차(NIFV)','Next-Generation IFV ROK','GROUND','ROK','DEVELOPMENT','MED',
    'K21 후계 차기보병전투장갑차. 30mm 이상 주포·복합장갑·APS. 2030년대 전력화 목표. 현대로템 개발 중.',
    {weight:'30t(목표)',armament:'30mm이상 기관포·미사일',firstDeployed:'2030년대',manufacturer:'현대로템'},
    ['NIFV','차기IFV','보병전투장갑차','차세대'],['방위사업청','현대로템'],
    undefined,undefined,65),

  // ══ 화력 무기체계 ════════════════════════════════════════════════════════════
  w('mnd-fire001','K9A2 자주포','K9A2 Thunder SPH Upgrade','ARTILLERY','ROK','OPERATIONAL','LOW',
    'K9 자주포 2차 성능개량. 자동장전장치·디지털 사격통제 강화. 사거리 54km(ERBB탄). 수출 최다 자주포.',
    {weight:'47t',armament:'155mm/52구경장',crew:'3명(자동장전)',range:'54km(ERBB)',firstDeployed:'2023년',manufacturer:'한화에어로스페이스'},
    ['K9A2','자주포','155mm','ERBB','자동장전'],['한화에어로스페이스','방위사업청'],
    undefined,'https://en.wikipedia.org/wiki/K9_Thunder',95),

  w('mnd-fire002','K55A1 자주포','K55A1 Paladin ROK Upgrade','ARTILLERY','ROK','OPERATIONAL','LOW',
    'M109A2 기반 한국 개량형. 한국형 사격통제장치·디지털화. K9 보조 전력.',
    {weight:'27.5t',armament:'155mm M185 곡사포',crew:'4명',range:'24km(M107탄)/30km(RAP)',firstDeployed:'1986년(K55)/2000년대(A1)',manufacturer:'삼성테크윈'},
    ['K55A1','M109','자주포','155mm'],['국방부'],
    undefined,'https://en.wikipedia.org/wiki/K55_howitzer',85),

  w('mnd-fire003','K105 자주호','K105A1 Howitzer Motor Carriage','ARTILLERY','ROK','OPERATIONAL','LOW',
    'KM101 차체에 105mm M101A1 탑재 한국형 기동포. 공수·산악 작전 적합. 경보병사단 배치.',
    {weight:'11.5t',armament:'105mm M101A1 곡사포',crew:'5명',range:'11km',firstDeployed:'1990년대',manufacturer:'창원병기창'},
    ['K105','자주포','105mm','경보병','공수'],['국방부'],
    undefined,undefined,82),

  w('mnd-fire004','KH179 견인곡사포','KH179 155mm Towed Howitzer','ARTILLERY','ROK','OPERATIONAL','LOW',
    '한국 독자 개발 155mm 견인곡사포. K9 이전 주력 화포. 일부 국가 수출.',
    {weight:'7.4t',armament:'155mm/39구경장',crew:'9명',range:'30km(RAP)',firstDeployed:'1983년',manufacturer:'삼성테크윈'},
    ['KH179','견인포','155mm','견인곡사포'],['국방부','삼성테크윈'],
    undefined,undefined,82),

  w('mnd-fire005','천무 다연장로켓','Chunmoo Multiple Launch Rocket System','MLRS','ROK','OPERATIONAL','HIGH',
    '한국 차세대 다연장로켓. 130mm/230mm/239mm 복합 운용. GPS/INS 유도. 도심 타격 정밀도. 폴란드·UAE 수출.',
    {weight:'26t(차량)',armament:'130mm×40발 또는 239mm×6발',range:'80km(239mm)',firstDeployed:'2013년',manufacturer:'한화에어로스페이스',quantity:'60여문'},
    ['천무','MLRS','다연장로켓','130mm','239mm','폴란드수출'],['한화에어로스페이스','방위사업청'],
    undefined,'https://en.wikipedia.org/wiki/Chunmoo_rocket_system',95),

  w('mnd-fire006','구룡 다연장로켓','Gureong K136 MLRS','MLRS','ROK','OPERATIONAL','MED',
    '한국 구형 다연장로켓. 130mm 36연장. 분리탄두. 북한 전방 기지·집결 지역 타격 주력.',
    {weight:'24t',armament:'130mm×36발',range:'36km',firstDeployed:'1981년',manufacturer:'한화'},
    ['구룡','K136','MLRS','130mm','36연장'],['국방부'],
    undefined,'https://en.wikipedia.org/wiki/Kooryong',80),

  w('mnd-fire007','비궁 대공미사일','Bigungs MANPADS Korea','SAM','ROK','OPERATIONAL','MED',
    '한국 독자 개발 휴대용 대공미사일. 이중 파장 IR 탐색기. 저속·저고도 표적 대응.',
    {weight:'18.5kg(발사기 포함)',range:'7km',ceiling:'3.5km',firstDeployed:'2016년',manufacturer:'LIG넥스원'},
    ['비궁','MANPADS','휴대대공','IR'],['LIG넥스원','방위사업청'],
    undefined,undefined,88),

  w('mnd-fire008','천궁-II 중거리방공','M-SAM II Cheongung-II','SAM','ROK','OPERATIONAL','HIGH',
    '한국형 중거리 지대공미사일 2차 개량. TVM 유도. 탄도미사일 요격 능력 추가. 사우디·UAE 수출.',
    {weight:'400kg(미사일)',range:'40km',ceiling:'20km',firstDeployed:'2020년',manufacturer:'LIG넥스원'},
    ['천궁II','M-SAM','중거리방공','탄도미사일요격'],['LIG넥스원','방위사업청'],
    undefined,'https://en.wikipedia.org/wiki/Cheongung',92),

  w('mnd-fire009','현궁 대전차미사일','Hyunmoo-2 ATGM Hyungung','MISSILE','ROK','OPERATIONAL','MED',
    '한국 독자 개발 3세대 대전차미사일. 이중 모드(자동/반자동). K21 IFV 탑재 및 보병 휴대형.',
    {weight:'20kg(미사일)',range:'2.5km',firstDeployed:'2015년',manufacturer:'LIG넥스원'},
    ['현궁','ATGM','대전차미사일','K21'],['LIG넥스원','방위사업청'],
    undefined,undefined,90),

  w('mnd-fire010','스파이크-NLOS','Spike NLOS Anti-Tank Missile','MISSILE','ISRAEL','OPERATIONAL','HIGH',
    '이스라엘 스파이크 NLOS. 한국 육군 도입. 25km 비가시선 정밀 타격. TV/IR 이중 탐색기.',
    {weight:'71kg(미사일)',range:'25km',firstDeployed:'2010년대(한국)',manufacturer:'라파엘'},
    ['스파이크NLOS','대전차','비가시선','25km'],['라파엘','LIG넥스원','육군'],
    undefined,'https://en.wikipedia.org/wiki/Spike_(missile)',88),

  w('mnd-fire011','K4 고속유탄기관총','K4 40mm Automatic Grenade Launcher','GROUND','ROK','OPERATIONAL','LOW',
    '한국 독자 개발 40mm 자동유탄발사기. 보병분대 및 차량 탑재. 분당 350발.',
    {weight:'22kg',armament:'40mm 유탄',range:'1,500m(유효)/2,200m(최대)',fireRate:'350rpm',firstDeployed:'1993년',manufacturer:'S&T모티브'},
    ['K4','유탄기관총','40mm','자동유탄'],['S&T모티브','국방부'],
    undefined,undefined,88),

  w('mnd-fire012','K6 중기관총','K6 12.7mm Heavy Machine Gun','GROUND','ROK','OPERATIONAL','LOW',
    '한국 M2HB 면허생산 개량형. 12.7mm. 차량·전차·헬기 탑재. 경장갑 및 대공 제압.',
    {weight:'38.2kg',caliber:'12.7×99mm NATO',fireRate:'450~600rpm',range:'1,800m(유효)',firstDeployed:'1990년대',manufacturer:'S&T모티브'},
    ['K6','중기관총','12.7mm','M2HB','면허생산'],['S&T모티브','국방부'],
    undefined,undefined,88),

  w('mnd-fire013','K7 기관단총','K7 9mm Submachine Gun','GROUND','ROK','OPERATIONAL','LOW',
    '특수부대용 소음기관단총. K5 권총과 동일 9mm 탄약 사용. 특수전 침투 작전 적합.',
    {weight:'2.2kg',caliber:'9×19mm',capacity:'30발',fireRate:'1,100rpm',range:'200m',firstDeployed:'2003년',manufacturer:'S&T모티브'},
    ['K7','기관단총','SMG','소음기','특수부대'],['S&T모티브','특수전사령부'],
    undefined,undefined,85),

  w('mnd-fire014','M270 MLRS 한국군','M270 MLRS ROK Army','MLRS','USA','OPERATIONAL','HIGH',
    '미국 M270 다연장로켓 한국군 도입형. 227mm 12연장. ATACMS 지대지미사일 발사 가능. 장거리 정밀타격.',
    {weight:'25t',armament:'227mm×12발 또는 ATACMS×2발',range:'300km(ATACMS)',firstDeployed:'1998년(한국)',quantity:'58문',manufacturer:'록히드마틴'},
    ['M270','MLRS','227mm','ATACMS','장거리로켓'],['록히드마틴','주한미군','육군'],
    undefined,'https://en.wikipedia.org/wiki/M270_Multiple_Launch_Rocket_System',90),

  w('mnd-fire015','ATACMS 지대지미사일','MGM-140 ATACMS ROK','MISSILE','USA','OPERATIONAL','HIGH',
    '미국 육군전술미사일 한국군 도입. 사거리 300km. GPS 유도 정밀타격. 북한 주요 표적 억제력.',
    {weight:'1,670kg',range:'300km',payload:'단일탄두 160kg 또는 집속탄',firstDeployed:'2000년대(한국)',manufacturer:'록히드마틴'},
    ['ATACMS','지대지','300km','GPS','정밀타격'],['록히드마틴','방위사업청'],
    undefined,'https://en.wikipedia.org/wiki/MGM-140_ATACMS',90),

  w('mnd-fire016','패트리어트 PAC-3 한국','Patriot PAC-3 ROK Air Defense','SAM','USA','OPERATIONAL','HIGH',
    '한국 공군 운용 PAC-3 MSE. 탄도미사일 직격요격(Hit-to-Kill). 수도권 핵심 방어.',
    {range:'40km',ceiling:'25km',firstDeployed:'2008년(PAC-2)/2022년(PAC-3MSE)',manufacturer:'레이시언'},
    ['PAC-3','패트리어트','탄도미사일방어','수도권방어'],['레이시언','공군'],
    undefined,'https://en.wikipedia.org/wiki/MIM-104_Patriot',92),

  // ══ 항공 무기체계 ════════════════════════════════════════════════════════════
  w('mnd-air001','AH-64E 아파치 가디언','AH-64E Apache Guardian ROK','HELICOPTER','USA','OPERATIONAL','HIGH',
    '한국 육군항공 주력 공격헬기. E형(최신). 360도 레이더·헬파이어 16발. 무인기 통제 기능.',
    {speed:'293km/h',crew:'2명',armament:'30mm M230 체인건·헬파이어·하이드라70',firstDeployed:'2016년(한국)',quantity:'36기',manufacturer:'보잉'},
    ['아파치','AH-64E','공격헬기','헬파이어','36기'],['보잉','육군항공'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/AH-64_Apache.JPG/320px-AH-64_Apache.JPG',
    'https://en.wikipedia.org/wiki/Boeing_AH-64_Apache',95),

  w('mnd-air002','AH-1S 코브라','AH-1S Cobra ROK Army','HELICOPTER','USA','OPERATIONAL','MED',
    '한국 육군 구형 공격헬기. TOW 대전차미사일·20mm 발칸 탑재. AH-64E 전환 중.',
    {speed:'277km/h',crew:'2명',armament:'20mm M197·TOW ATGM·2.75인치 로켓',firstDeployed:'1978년(한국)',quantity:'60여기',manufacturer:'벨'},
    ['AH-1S','코브라','공격헬기','TOW'],['벨','육군항공'],
    undefined,'https://en.wikipedia.org/wiki/Bell_AH-1_Cobra',80),

  w('mnd-air003','CH-47D/F 치누크','CH-47D/F Chinook ROK Army','HELICOPTER','USA','OPERATIONAL','LOW',
    '한국 육군 대형 수송헬기. 특수전·중장비 수송. D형 및 F형 혼용. 55기 운용.',
    {speed:'293km/h',crew:'3+55명(최대)',armament:'없음(구난총 제외)',firstDeployed:'1986년(한국)',quantity:'55기',manufacturer:'보잉'},
    ['CH-47','치누크','수송헬기','대형헬기'],['보잉','육군항공'],
    undefined,'https://en.wikipedia.org/wiki/Boeing_CH-47_Chinook',90),

  w('mnd-air004','UH-60P 블랙호크','UH-60P Black Hawk ROK Army','HELICOPTER','USA','OPERATIONAL','LOW',
    '한국 KAI 면허생산 UH-60. 병력 수송·부상자 후송·특수전. 약 130기 운용.',
    {speed:'296km/h',crew:'2+11명',firstDeployed:'1990년(한국)',quantity:'130여기',manufacturer:'KAI(면허)/시코르스키'},
    ['UH-60P','블랙호크','수송헬기','면허생산'],['KAI','시코르스키','육군항공'],
    undefined,'https://en.wikipedia.org/wiki/Sikorsky_UH-60_Black_Hawk',90),

  w('mnd-air005','KUH-1 수리온','KUH-1 Surion Korean Utility Helicopter','HELICOPTER','ROK','OPERATIONAL','LOW',
    '한국 독자 개발 기동헬기. KAI·에어버스헬리콥터 공동개발. 의무후송·VIP·공격형 파생형 존재.',
    {speed:'259km/h',crew:'2+11명',firstDeployed:'2013년',quantity:'200여기',manufacturer:'KAI'},
    ['수리온','KUH-1','기동헬기','국산헬기'],['KAI','방위사업청'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/KUH-1_Surion.jpg/320px-KUH-1_Surion.jpg',
    'https://en.wikipedia.org/wiki/KAI_KUH-1_Surion',95),

  w('mnd-air006','LAH 소형무장헬기','LAH Light Armed Helicopter ROK','HELICOPTER','ROK','DEVELOPMENT','MED',
    '한국 독자 개발 소형무장헬기. AH-1S 대체. KAI 개발. 20mm 기관포·헬파이어·스타스트릭.',
    {speed:'280km/h',crew:'2명',armament:'20mm기관포·헬파이어·스타스트릭',firstDeployed:'2023년(초도생산)',manufacturer:'KAI'},
    ['LAH','소형무장헬기','AH-1S대체','국산공격헬기'],['KAI','방위사업청'],
    undefined,undefined,88),

  w('mnd-air007','500MD 의무편대','MD 500 Defender ROK Utility','HELICOPTER','USA','OPERATIONAL','LOW',
    '한국 육군 경헬기. 정찰·연락·훈련 목적. 500MD 개량형 일부 TOW 탑재. 노후화 진행 중.',
    {speed:'282km/h',crew:'2+3명',firstDeployed:'1977년(한국)',quantity:'200여기',manufacturer:'MD헬리콥터스'},
    ['500MD','경헬기','정찰헬기','TOW'],['MD헬리콥터스','육군항공'],
    undefined,undefined,70),

  // ══ 감시정찰 무기체계 ════════════════════════════════════════════════════════
  w('mnd-isr001','송골매 무인기','Songolmae UAV Tactical','UAV','ROK','OPERATIONAL','MED',
    '한국 육군 전술 무인항공기. 실시간 영상 전송. 전방 감시·표적획득. K-UAV 1세대.',
    {speed:'150km/h',ceiling:'4.5km',firstDeployed:'2002년',manufacturer:'대한항공'},
    ['송골매','UAV','전술무인기','감시정찰'],['대한항공','육군'],
    undefined,undefined,80),

  w('mnd-isr002','비조 무인기','Bijo UAV Reconnaissance','UAV','ROK','OPERATIONAL','MED',
    '한국 육군 포병 정찰 무인기. 화포 탄착 관측·전투피해평가. 발사형 소형.',
    {ceiling:'1km',firstDeployed:'2000년대',manufacturer:'한국항공우주'},
    ['비조','UAV','포병정찰','탄착관측'],['국방부','육군포병'],
    undefined,undefined,75),

  w('mnd-isr003','하피 자폭드론','Harpy Anti-Radiation Drone ROK','UAV','ISRAEL','OPERATIONAL','HIGH',
    '이스라엘 하피 대레이더 자폭드론. 적 방공레이더 자동 탐색·공격. 한국 도입.',
    {speed:'450km/h',range:'500km',ceiling:'5km',firstDeployed:'1990년대',manufacturer:'이스라엘 항공산업(IAI)'},
    ['하피','자폭드론','대레이더','SEAD','UAV'],['IAI','공군'],
    undefined,'https://en.wikipedia.org/wiki/IAI_Harpy',82),

  w('mnd-isr004','글로벌호크 고고도무인기','RQ-4B Global Hawk ROK','UAV','USA','OPERATIONAL','HIGH',
    '한국 공군 도입 RQ-4B 글로벌호크. 20km 고고도 장기 감시. 전략 정찰. 북한 전역 커버.',
    {ceiling:'20km',speed:'575km/h',firstDeployed:'2019년(한국)',quantity:'4대',manufacturer:'노스럽그루먼'},
    ['글로벌호크','RQ-4B','고고도무인기','전략정찰'],['노스럽그루먼','공군'],
    undefined,'https://en.wikipedia.org/wiki/Northrop_Grumman_RQ-4_Global_Hawk',90),

  w('mnd-isr005','백두 정찰기','Baekdu RC-800 SIGINT Aircraft','AIRCRAFT','ROK','OPERATIONAL','HIGH',
    '한국 공군 신호정보수집기. 금강·백두 정찰기 쌍두마차. 북한 통신·전자신호 수집.',
    {crew:'다수(정보관)',firstDeployed:'1990년대',manufacturer:'대한항공 개조'},
    ['백두','정찰기','SIGINT','신호정보'],['공군','정보사'],
    undefined,undefined,75),

  w('mnd-isr006','금강 정찰기','Keumgang RC-800 IMINT Aircraft','AIRCRAFT','ROK','OPERATIONAL','HIGH',
    '한국 공군 영상정보수집기. 고해상도 전자광학·적외선 센서. 북한 지상군 동향 감시.',
    {crew:'다수(정보관)',firstDeployed:'1990년대',manufacturer:'대한항공 개조'},
    ['금강','정찰기','IMINT','영상정보'],['공군','정보사'],
    undefined,undefined,75),

  w('mnd-isr007','중고도 무인기(MUAV)','MUAV Medium-Altitude UAV ROK','UAV','ROK','DEVELOPMENT','MED',
    '한국 독자 개발 중고도 장기체공 무인기. 6~12시간 체공. 실시간 SAR·EO/IR. 2024년 전력화 목표.',
    {ceiling:'10km',firstDeployed:'2024년(예정)',manufacturer:'대한항공·LIG넥스원'},
    ['MUAV','중고도무인기','SAR','장기체공'],['방위사업청','대한항공'],
    undefined,undefined,75),

  // ══ 방호 무기체계 ════════════════════════════════════════════════════════════
  w('mnd-prot001','비호복합 단거리방공','Biho Combined SHORAD System','SAM','ROK','OPERATIONAL','MED',
    '자주대공포+신궁 복합 단거리방공. K30 비호 30mm 자주대공포에 신궁 미사일 추가.',
    {ceiling:'3km',range:'5.5km(미사일)/3km(포)',firstDeployed:'2013년',manufacturer:'한화디펜스'},
    ['비호복합','SHORAD','단거리방공','자주대공포','신궁'],['한화디펜스','방위사업청'],
    undefined,undefined,88),

  w('mnd-prot002','K30 비호 자주대공포','K30 Biho 30mm SPAAG','SAM','ROK','OPERATIONAL','MED',
    '한국 독자 개발 30mm 자주대공포. 쌍열포탑. K21 차체 기반. 분당 600발. 저고도 방공.',
    {weight:'25.6t',armament:'30mm 쌍열 자동포',ceiling:'3km',range:'3km',firstDeployed:'1999년',manufacturer:'한화디펜스'},
    ['K30','비호','SPAAG','30mm','자주대공'],['한화디펜스','국방부'],
    undefined,'https://en.wikipedia.org/wiki/K30_Biho',88),

  w('mnd-prot003','신궁 휴대대공미사일','Shingung MANPADS Korea','SAM','ROK','OPERATIONAL','MED',
    '한국 독자 개발 2세대 휴대대공미사일. IIR 탐색기(전방위). 재머 저항성. 비호복합 탑재.',
    {weight:'23kg(발사기)',range:'7km',ceiling:'3.5km',firstDeployed:'2004년',manufacturer:'LIG넥스원'},
    ['신궁','MANPADS','휴대대공','IIR'],['LIG넥스원','방위사업청'],
    undefined,'https://en.wikipedia.org/wiki/Shingung',88),

  w('mnd-prot004','M167 발칸','M167 VADS Anti-Aircraft Gun ROK','GROUND','USA','OPERATIONAL','LOW',
    '미국 M167 발칸 대공포 한국군 운용. 20mm 6연장 회전포신. 후방 기지 방공.',
    {armament:'20mm M168 발칸',ceiling:'1.5km',range:'1,200m(유효)',firstDeployed:'1970년대(한국)',manufacturer:'제너럴 일렉트릭'},
    ['M167','발칸','대공포','VADS'],['국방부'],
    undefined,undefined,70),

  // ══ 워리어 플랫폼·신규 전력화 ════════════════════════════════════════════
  w('mnd-new001','워리어 플랫폼','Warrior Platform ROK Soldier System','GROUND','ROK','OPERATIONAL','LOW',
    '한국 육군 워리어 플랫폼. 전투원 통합 전투 시스템. 개인 피탄도 최소화 탄도복·야시경·단말기.',
    {firstDeployed:'2022년(1단계)',manufacturer:'한화테크윈·LIG넥스원 컨소시엄'},
    ['워리어플랫폼','전투원시스템','스마트솔져'],['국방부','육군'],
    undefined,undefined,85),

  w('mnd-new002','K2 로봇전투차량(RCV)','K2 Robot Combat Vehicle ROK','GROUND','ROK','DEVELOPMENT','MED',
    '한국 유·무인 복합전투 로봇전투차량. K21 화력+자율주행. 인명 피해 최소화 미래 전투.',
    {weight:'20t(목표)',armament:'30mm 원격무장스테이션',firstDeployed:'2030년대',manufacturer:'현대로템'},
    ['RCV','로봇전투차량','유무인복합','미래전'],['방위사업청','현대로템'],
    undefined,undefined,65),

  w('mnd-new003','레드백 장갑차 (수출형)','AS21 Redback IFV Export','GROUND','ROK','DEVELOPMENT','LOW',
    '한화 AS21 레드백 호주 수출 경쟁형. 30mm 포탑·APS·50t급. IFV 수출 차기 주자.',
    {weight:'42t',armament:'30mm 기관포·스파이크LR2',crew:'3+8명',firstDeployed:'2025년(호주 결정)',manufacturer:'한화디펜스'},
    ['레드백','AS21','호주IFV','수출','한화'],['한화디펜스'],
    undefined,undefined,72),

  w('mnd-new004','천무 II 장거리다연장','Chunmoo-II Extended Range MLRS','MLRS','ROK','DEVELOPMENT','HIGH',
    '천무 후계 장거리 다연장로켓. 300km+ 사거리 목표. 정밀유도 탄두. ATACMS 대체.',
    {range:'300km+(목표)',firstDeployed:'2027년(목표)',manufacturer:'한화에어로스페이스'},
    ['천무II','장거리MLRS','300km','정밀유도'],['한화에어로스페이스','방위사업청'],
    undefined,undefined,60),

  w('mnd-new005','드래곤파이어 대드론','Dragon Fire Counter-UAV ROK','GROUND','ROK','DEVELOPMENT','MED',
    '고에너지 레이저 드론 격추 체계. 30kW급. 저비용 대드론. 전력화 단계.',
    {firstDeployed:'2025년(시험)',manufacturer:'한화시스템·LIG넥스원'},
    ['대드론','레이저','C-UAV','드래곤파이어'],['한화시스템','방위사업청'],
    undefined,undefined,65),

  w('mnd-new006','K21-105 경전차','K21-105 Light Tank ROK','GROUND','ROK','DEVELOPMENT','MED',
    'K21 차체 기반 105mm 경전차. 도서·산악 지역 작전. 공중 수송 가능. 2023년 시제.',
    {weight:'26t',armament:'105mm 강선포',crew:'3명',manufacturer:'현대로템'},
    ['K21-105','경전차','105mm','공중수송'],['현대로템','방위사업청'],
    undefined,undefined,70),

  // ══ 공군 지원 전력 ════════════════════════════════════════════════════════
  w('mnd-af001','F-35A 스텔스전투기 한국','F-35A Lightning II ROK','AIRCRAFT','USA','OPERATIONAL','HIGH',
    '한국 공군 스텔스 전투기. 40기 도입. 핵폭탄 운반 가능(B61). 북한 핵 억제 핵심.',
    {speed:'마하 1.6',crew:'1명',armament:'25mm·AIM-120·GBU-31·B61옵션',firstDeployed:'2019년(한국)',quantity:'40기',manufacturer:'록히드마틴'},
    ['F-35A','스텔스','한국공군','B61','40기'],['록히드마틴','방위사업청'],
    undefined,'https://en.wikipedia.org/wiki/Lockheed_Martin_F-35_Lightning_II',95),

  w('mnd-af002','KF-21 보라매','KF-21 Boramae Fighter','AIRCRAFT','ROK','DEVELOPMENT','HIGH',
    '한국 독자 개발 4.5세대 전투기. 레이더 반사 감소·AESA 레이더·IRIS-T·미티어 탑재. 2026년 양산 목표.',
    {speed:'마하 1.81',crew:'1명(복좌형 별도)',armament:'미티어·IRIS-T·GBU-38',firstDeployed:'2026년(목표)',manufacturer:'KAI'},
    ['KF-21','보라매','4.5세대','국산전투기','AESA'],['KAI','방위사업청'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/KF-21_prototype_1.jpg/320px-KF-21_prototype_1.jpg',
    'https://en.wikipedia.org/wiki/KAI_KF-21_Boramae',95),

  w('mnd-af003','FA-50 경전투기','FA-50 Fighting Eagle Light Fighter','AIRCRAFT','ROK','OPERATIONAL','MED',
    'T-50 기반 경전투기. 20mm 기관포·AIM-9·Mk82. 폴란드·필리핀·이라크 수출.',
    {speed:'마하 1.5',crew:'2명',armament:'20mm M61A1·AIM-9·Mk82·GBU-38',firstDeployed:'2013년',quantity:'60기',manufacturer:'KAI'},
    ['FA-50','파이팅이글','경전투기','폴란드수출','T-50'],['KAI','방위사업청'],
    undefined,'https://en.wikipedia.org/wiki/KAI_T-50_Golden_Eagle',90),

  // ══ 해군 핵심 전력 ════════════════════════════════════════════════════════
  w('mnd-navy001','세종대왕급 이지스함','KDX-III Sejong Daewang-class Destroyer','SHIP','ROK','OPERATIONAL','HIGH',
    '한국 이지스 구축함 1번함. SPY-1D 레이더. SM-2·KVLS 수직발사. 북한·중국 탄도미사일 추적.',
    {displacement:'11,000t',armament:'SM-2·현무-3C·홍상어·K-VLS 128셀',crew:'300명',firstDeployed:'2008년',quantity:'3척(batch1)+3척(batch2)',manufacturer:'현대중공업·대우조선'},
    ['세종대왕','이지스','KDX-III','SM-2','KVLS'],['현대중공업','해군'],
    undefined,'https://en.wikipedia.org/wiki/Sejong_the_Great-class_destroyer',95),

  w('mnd-navy002','장보고-III 잠수함','KSS-III Jangbogo-III Submarine','SUBMARINE','ROK','OPERATIONAL','HIGH',
    '한국 독자 개발 3천톤급 잠수함. 수직발사관 6셀(현무-2C). AIP+리튬이온전지. 핵잠격차 보완.',
    {displacement:'3,600t',armament:'현무-2C·청상어어뢰·하푼',crew:'50명',firstDeployed:'2021년',quantity:'9척(목표)',manufacturer:'대우조선해양'},
    ['장보고III','KSS-III','잠수함','수직발사','현무'],['대우조선','해군'],
    undefined,'https://en.wikipedia.org/wiki/Jangbogo-III-class_submarine',92),

  w('mnd-navy003','독도함 상륙함','LPH-6111 Dokdo Amphibious Ship','SHIP','ROK','OPERATIONAL','MED',
    '한국 경항모급 상륙함. 항공기·수직이착륙기 탑재 가능. 상륙전 지원·재난구호.',
    {displacement:'18,800t',armament:'CIWS·미스트랄·함포',crew:'330명+병력700명',firstDeployed:'2007년',quantity:'1척(+마라도함)',manufacturer:'한진중공업'},
    ['독도함','상륙함','LPH','경항모','독도'],['한진중공업','해군'],
    undefined,'https://en.wikipedia.org/wiki/Korean_amphibious_assault_ship_Dokdo',88),

  // ══ 전략 미사일 ════════════════════════════════════════════════════════════
  w('mnd-strat001','현무-4 탄도미사일','Hyunmoo-4 Ballistic Missile','MISSILE','ROK','OPERATIONAL','HIGH',
    '한국 최강 전술탄도미사일. 사거리 800km. 탄두 중량 2t. 지하벙커 관통 목적. 김정은 지하시설 타격.',
    {range:'800km',payload:'2,000kg',propulsion:'고체 2단',firstDeployed:'2020년',manufacturer:'ADD·LIG넥스원'},
    ['현무4','탄도미사일','800km','2t탄두','벙커버스터'],['ADD','방위사업청'],
    undefined,undefined,80),

  w('mnd-strat002','현무-5 초대형탄도미사일','Hyunmoo-5 Monster Ballistic Missile','MISSILE','ROK','DEVELOPMENT','HIGH',
    '한국 초대형 탄도미사일. 탄두 중량 8~9t. 도심 전체 초토화 가능. 북한 핵 보복 억제.',
    {range:'3,000km+(추정)',payload:'8,000~9,000kg',propulsion:'고체',firstDeployed:'2023년(시험)',manufacturer:'ADD'},
    ['현무5','초대형탄두','8t','한국전략미사일','핵억제'],['ADD'],
    undefined,undefined,70),

  w('mnd-strat003','현무-3C 순항미사일','Hyunmoo-3C Cruise Missile 1500km','MISSILE','ROK','OPERATIONAL','HIGH',
    '한국 최장거리 순항미사일. 사거리 1,500km. 지형대조·GPS 복합유도. 평양~베이징 타격 가능.',
    {range:'1,500km',payload:'500kg',speed:'마하 0.9',firstDeployed:'2010년대',manufacturer:'ADD·LIG넥스원'},
    ['현무3C','순항미사일','1500km','스텔스','TERCOM'],['ADD','방위사업청'],
    undefined,undefined,78),

]
