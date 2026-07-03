import type { WeaponSystem } from './weapons'
const w = (id:string,name:string,nameEng:string,cat:WeaponSystem['category'],origin:WeaponSystem['origin'],status:WeaponSystem['status'],threat:WeaponSystem['threatRating'],desc:string,specs:WeaponSystem['specs'],tags:string[],sources:string[],img?:string,wiki?:string,conf=90): WeaponSystem=>({id,name,nameEng,category:cat,origin,status,threatRating:threat,description:desc,detail:`## ${nameEng}\n\n${desc}\n\n### 주요 제원\n${Object.entries(specs).filter(([,v])=>v).map(([k,v])=>`- ${k}: ${v}`).join('\n')}`,specs,confidence:conf,lastUpdated:'2026-07-01',relatedIntelIds:[],tags,sources,imageUrl:img,wikiUrl:wiki})

export const WEAPONS_EXP_ROK2: WeaponSystem[] = [

  // ── ROK 추가 지상 전력 ─────────────────────────────────────────────────────
  w('rok2-g001','K1 88전차','K1 88-Tank MBT','GROUND','ROK','OPERATIONAL','MED',
    '한국 최초 독자 개발 주력전차. M48A5K 대체. 1988년 서울올림픽에서 이름을 딴 K1. 1,000여대 운용.',
    {weight:'51.1톤',armament:'M68A1 105mm 강선포·M60D·M2HB',crew:'4명',speed:'65km/h',propulsion:'MTU MB 871 Ka-501 1,200hp',firstDeployed:'1987년',manufacturer:'현대정공(현대로템)',quantity:'1,027대'},
    ['K1','88전차','한국최초전차','현대로템','M48대체'],['현대로템','육군'],
    undefined,'https://en.wikipedia.org/wiki/K1_88-Tank',92),

  w('rok2-g002','K277 장갑차','K277 KAAV Armored Personnel Carrier','GROUND','ROK','OPERATIONAL','LOW',
    '한국형 M113A1 장갑차. 육군 기계화보병 표준 병력수송장갑차. K21 도입 전 주력. 2,000대 이상 운용.',
    {weight:'12톤',armament:'K6 12.7mm',crew:'3명+11명',speed:'65km/h',firstDeployed:'1977년',manufacturer:'기아기계(현 현대로템)',quantity:'2,000대+'},
    ['K277','장갑차','M113기반','기계화보병','병력수송'],['육군'],
    undefined,undefined,85),

  w('rok2-g003','KAAV-II 상륙돌격장갑차','KAAV-II Amphibious Assault Vehicle','GROUND','ROK','DEVELOPMENT','MED',
    'AAV-7 후속 국산 상륙돌격장갑차. 수중방호강화·RWS 탑재. 2028년 배치 목표. 해병대 상륙력 핵심.',
    {weight:'28톤(목표)',crew:'3+21명',speed:'13km/h(수상)',firstDeployed:'2028년(예정)',manufacturer:'한화에어로스페이스'},
    ['KAAV-II','상륙돌격','해병대','수상기동','2028'],['해병대','한화에어로스페이스'],
    undefined,undefined,72),

  w('rok2-g004','차륜형 자주포 K105A1','K105A1 Wheeled Self-Propelled Howitzer','ARTILLERY','ROK','OPERATIONAL','MED',
    'K1000 5ton 트럭 기반 105mm 차륜형 자주포. 공수부대·예비군 지원. 경량·고기동.',
    {armament:'105mm M101A1 곡사포',range:'15km',crew:'5명',speed:'90km/h(도로)',firstDeployed:'2021년',manufacturer:'한화에어로스페이스'},
    ['K105A1','차륜형자주포','105mm','공수','예비군'],['육군','한화에어로스페이스'],
    undefined,undefined,85),

  w('rok2-g005','비궁 ATGM','Raybolt (Bigung) Anti-Tank Guided Missile','GROUND','ROK','OPERATIONAL','MED',
    '보병 휴대용 3세대 대전차유도미사일. 발사후망각. 사거리 2.5km. 현궁 이전 도입. 후속은 현궁.',
    {range:'2,500m',payload:'탠덤 HEAT',guidance:'적외선 반수동',firstDeployed:'2005년',manufacturer:'LIG넥스원'},
    ['비궁','ATGM','대전차','적외선','보병'],['육군','LIG넥스원'],
    undefined,undefined,80),

  w('rok2-g006','K30 비호 자주대공포','K30 Biho SPAAG','GROUND','ROK','OPERATIONAL','MED',
    '30mm 트윈 자주대공포. 신궁 MANPADS 통합(비호복합). 저고도 드론·헬기 대응. 육군 야전 방공.',
    {armament:'30mm 2연장 기관포+신궁 MANPADS',range:'3km(포)',altitude:'2km',crew:'3명',firstDeployed:'1999년',manufacturer:'두산DST(현 한화에어로스페이스)'},
    ['K30','비호','자주대공포','30mm','드론대응'],['육군','한화에어로스페이스'],
    undefined,'https://en.wikipedia.org/wiki/K30_Biho',88),

  w('rok2-g007','천마 단거리 지대공미사일','Cheonma (KM-SAM) SHORAD','SAM','ROK','OPERATIONAL','MED',
    '러시아 9K330 Tor 기반 한국형 야전 단거리 방공. 사거리 10km. 육군 전방 방공의 핵심.',
    {range:'10km',altitude:'5km',guidance:'레이더+적외선',firstDeployed:'2000년',manufacturer:'LIG넥스원'},
    ['천마','SHORAD','야전방공','KM-SAM','LIG넥스원'],['육군','LIG넥스원'],
    undefined,'https://en.wikipedia.org/wiki/Cheonma',85),

  w('rok2-g008','K-SAAM 함대공미사일','Korean Ship-to-Air Missile','SAM','ROK','OPERATIONAL','MED',
    '한국 국산 단거리 함대공미사일. 인천급 FFX 탑재. 사거리 10km. 해궁 하위체계.',
    {range:'10km',altitude:'4km',guidance:'능동레이더',firstDeployed:'2011년',manufacturer:'LIG넥스원'},
    ['K-SAAM','함대공','단거리','인천급','FFX'],['해군','LIG넥스원'],
    undefined,undefined,82),

  w('rok2-g009','해궁 함대공미사일','Haegung (K-VLS SAM)','SAM','ROK','OPERATIONAL','MED',
    '한국 국산 함정 수직발사 단거리 대공미사일. 사거리 20km. 세종대왕급 Batch II 탑재.',
    {range:'20km',altitude:'10km',guidance:'능동레이더',firstDeployed:'2020년',manufacturer:'LIG넥스원'},
    ['해궁','K-VLS','함대공','수직발사','세종대왕'],['해군','LIG넥스원'],
    undefined,undefined,85),

  w('rok2-n001','인천급 호위함 (FFX-I)','Incheon-class FFX-I Frigate','NAVAL','ROK','OPERATIONAL','MED',
    '한국 차기 호위함 1차. 2,300톤. K-SAM·해성·청상어. 6척 취역. FFX-II로 개량.',
    {displacement:'2,300톤',length:'114m',crew:'140명',armament:'OTO76mm·K-SAM·해성·청상어',propulsion:'CODOG',firstDeployed:'2013년',manufacturer:'현대중공업',quantity:'6척'},
    ['인천급','FFX-I','호위함','한국해군','2300톤'],['해군','현대중공업'],
    undefined,'https://en.wikipedia.org/wiki/Incheon-class_frigate',90),

  w('rok2-n002','대구급 호위함 (FFX-II)','Daegu-class FFX-II Frigate','NAVAL','ROK','OPERATIONAL','MED',
    '인천급 개량형 FFX-II. 해궁 탑재·IRST. 2,800톤. 4척 취역. 선체 소음 개선.',
    {displacement:'2,800톤',length:'122m',crew:'140명',armament:'해궁·해성·청상어·76mm',propulsion:'CODOG',firstDeployed:'2018년',manufacturer:'현대중공업·대우조선',quantity:'4척'},
    ['대구급','FFX-II','호위함','해궁','2800톤'],['해군'],
    undefined,undefined,90),

  w('rok2-n003','청해진급 기뢰부설함','Cheonghaeiin-class Minelayer','NAVAL','ROK','OPERATIONAL','LOW',
    '한국 해군 기뢰부설함. 한반도 연안 기뢰전 대비. 해양 거부 전략의 일환.',
    {displacement:'3,000톤',armament:'기뢰 360개·40mm 기관포',firstDeployed:'1996년',manufacturer:'대우조선'},
    ['기뢰부설함','청해진','한국해군','기뢰전','해양거부'],['해군'],
    undefined,undefined,75),

  w('rok2-n004','손원일급 잠수함 (장보고-II)','Son Won-il class (Chang Bogo-II) SSK','SUBMARINE','ROK','OPERATIONAL','MED',
    '한국 1,800톤급 재래식 잠수함. 독일 212급 기반. 9척 취역. 하푼·중어뢰·기뢰. AIP 탑재.',
    {displacement:'1,800톤(수중)',length:'65.3m',crew:'40명',armament:'하푼·MK48 533mm 어뢰·기뢰',propulsion:'MTU 디젤+연료전지 AIP',firstDeployed:'2007년',manufacturer:'대우조선(현 한화오션)',quantity:'9척'},
    ['손원일급','장보고II','잠수함','AIP','한국해군'],['해군','한화오션'],
    undefined,'https://en.wikipedia.org/wiki/Son_Won-il-class_submarine',92),

  w('rok2-a001','T-50 골든이글','T-50 Golden Eagle Advanced Trainer','AIRCRAFT','ROK','OPERATIONAL','LOW',
    '초음속 고등훈련기. KAI-록히드마틴 공동. FA-50 경공격기 기반. 인도네시아·태국·이라크 수출.',
    {speed:'마하 1.5',range:'1,851km',crew:'2명',propulsion:'GE F404-GE-102 13,000lbf',firstDeployed:'2005년',manufacturer:'KAI',quantity:'100기+(한국)/수출 포함 200기+'},
    ['T-50','골든이글','초음속훈련기','KAI','수출'],['공군','KAI'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/ROKAF_T-50_Golden_Eagle.jpg/320px-ROKAF_T-50_Golden_Eagle.jpg',
    'https://en.wikipedia.org/wiki/KAI_T-50_Golden_Eagle',95),

  w('rok2-a002','E-737 피스아이','E-737 Peace Eye AEW&C','AIRCRAFT','ROK','OPERATIONAL','LOW',
    '보잉 737 기반 공중조기경보기. 4기 운용. MESA 레이더. 반경 500km 항공·해상 동시감시.',
    {speed:'850km/h',range:'6,482km',crew:'10명+',payload:'MESA 레이더',firstDeployed:'2011년',manufacturer:'보잉',quantity:'4기'},
    ['E-737','피스아이','AWACS','MESA','조기경보'],['공군','보잉'],
    undefined,'https://en.wikipedia.org/wiki/Boeing_737_AEW%26C',97),

  w('rok2-a003','P-3CK 오리온','P-3CK Orion Maritime Patrol','AIRCRAFT','ROK','OPERATIONAL','LOW',
    '한국 해군 해상초계기. 8기 운용. MK46·하푼 탑재. P-8A 포세이돈으로 교체 계획.',
    {speed:'750km/h',range:'8,945km',crew:'11명',armament:'MK46 어뢰·AGM-84 하푼',firstDeployed:'1996년(한국)',manufacturer:'록히드마틴(개조)',quantity:'8기'},
    ['P-3CK','오리온','해상초계','한국해군','P-8대체예정'],['해군'],
    undefined,'https://en.wikipedia.org/wiki/Lockheed_P-3_Orion',90),

  w('rok2-a004','CN-235 해양초계기','CN-235 Maritime Patrol Aircraft','AIRCRAFT','ROK','OPERATIONAL','LOW',
    '터보프롭 해양초계·수송기. 10기 이상 운용. 해안 감시·SAR·어로감시.',
    {speed:'440km/h',range:'4,630km',crew:'2+임무요원',firstDeployed:'1993년(한국)',manufacturer:'CASA·IPTN(인도네시아)',quantity:'10기+'},
    ['CN-235','해양초계','터보프롭','한국해군','SAR'],['해군','해경'],
    undefined,undefined,85),

  w('rok2-a005','수리온 상륙기동헬기','KUH-1 Marineon Amphibious Helicopter','HELICOPTER','ROK','OPERATIONAL','LOW',
    '수리온 해병대 상륙기동헬기형. 해수 환경 내식성 강화. 대구급 함정 탑재 가능.',
    {weight:'8,300kg',speed:'259km/h',range:'480km',crew:'2+15명',firstDeployed:'2017년',manufacturer:'KAI',quantity:'40기+'},
    ['마리온','수리온해병형','상륙헬기','해병대','KAI'],['해병대','KAI'],
    undefined,undefined,88),

  w('rok2-a006','500MD 공격헬기','500MD Defender (ROK)','HELICOPTER','ROK','RETIRED','LOW',
    '한국 육군항공 기존 경공격헬기. TOW 대전차미사일 탑재. 수리온·LAH로 단계 교체 중.',
    {speed:'241km/h',range:'483km',armament:'TOW×4·7.62mm 기관총',firstDeployed:'1976년(한국)',manufacturer:'MD헬리콥터스',quantity:'200기+(단계감축)'},
    ['500MD','경공격헬기','TOW','육군항공','LAH교체'],['육군항공'],
    undefined,undefined,88),

  w('rok2-m001','한국형 전술함대지미사일 KTSSM-I','KTSSM-I Tactical SSM','SRBM','ROK','OPERATIONAL','MED',
    '북한 장사정포 진지 정밀 타격. 사거리 180km. HIMARS급. 천무 발사대 호환.',
    {range:'180km',payload:'500kg',guidance:'GPS+INS',firstDeployed:'2017년',manufacturer:'한화에어로스페이스'},
    ['KTSSM-I','전술지대지','장사정포타격','천무','정밀'],['육군','한화에어로스페이스'],
    undefined,undefined,88),

  w('rok2-m002','천룡 KALCM 공대지순항','KALCM Cheonryong Air-Launched Cruise Missile','ASM','ROK','OPERATIONAL','HIGH',
    '한국 국산 공대지 순항미사일. F-35A·FA-50 탑재 예정. 8m 이중화 탄두. 사거리 500~800km.',
    {range:'500~800km',payload:'8m 관통 이중탄두',guidance:'INS+GPS+IIR',firstDeployed:'2023년',manufacturer:'LIG넥스원'},
    ['KALCM','천룡','공대지순항','F-35탑재','국산'],['공군','LIG넥스원'],
    undefined,undefined,85),

  w('rok2-m003','철매-II 패트리어트 연동 SAM','Cheolmae-II PAC-2 Equivalent SAM','SAM','ROK','OPERATIONAL','LOW',
    '패트리어트 PAC-2와 연동 운용하는 한국형 보완 방공체계. 사거리 40km. 복합 방공망 구성.',
    {range:'40km',altitude:'15km',guidance:'반능동레이더',firstDeployed:'2012년',manufacturer:'한화시스템'},
    ['철매II','PAC-2연동','방공','한국형SAM','복합방공'],['공군','한화시스템'],
    undefined,undefined,80),

  w('rok2-uav001','캐비어-150 정찰드론','Caviar-150 MALE Reconnaissance UAV','UAV','ROK','OPERATIONAL','LOW',
    '국산 중고도 장기체공 정찰드론. EO/SAR 탑재. 국방과학연구소 개발. 24시간 체공.',
    {ceiling:'9,000m',range:'1,200km',speed:'200km/h',payload:'EO/IR/SAR',firstDeployed:'2021년',manufacturer:'한국항공우주연구원·ADD'},
    ['캐비어-150','정찰드론','MALE','SAR','국산UAV'],['육군','ADD'],
    undefined,undefined,78),

  w('rok2-uav002','군단급 무인기 Night Intruder 600','Night Intruder 600 Corps UAV','UAV','ROK','OPERATIONAL','LOW',
    '군단 수준 전술 정찰드론. EO·IR·ELINT 탑재. 야간 침투 정찰 임무.',
    {ceiling:'5,000m',range:'200km',payload:'EO/IR/ELINT',firstDeployed:'2009년',manufacturer:'한국항공우주산업'},
    ['NI-600','군단급드론','정찰','야간','ELINT'],['육군'],
    undefined,undefined,80),

  w('rok2-sat001','군 정찰위성 3호 (SAR-2)','Military Reconnaissance Satellite No.3 SAR','SATELLITE','ROK','OPERATIONAL','LOW',
    '2025년 발사 3번째 군 정찰위성. SAR 방식 2번째. 1·2호와 교차 운용으로 재방문 간격 단축.',
    {altitude:'500km LEO',guidance:'SAR 합성개구레이더',firstDeployed:'2025년',manufacturer:'한화시스템'},
    ['군정찰위성3호','SAR','우주','정찰','재방문단축'],['방위사업청','한화시스템'],
    undefined,undefined,82),

]

