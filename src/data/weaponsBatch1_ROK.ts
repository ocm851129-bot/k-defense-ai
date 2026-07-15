import type { WeaponSystem } from './weapons'
const w = (id:string,name:string,nameEng:string,cat:WeaponSystem['category'],origin:WeaponSystem['origin'],status:WeaponSystem['status'],threat:WeaponSystem['threatRating'],desc:string,specs:WeaponSystem['specs'],tags:string[],sources:string[],img?:string,wiki?:string,conf=90): WeaponSystem=>({id,name,nameEng,category:cat,origin,status,threatRating:threat,description:desc,detail:`## ${nameEng}\n\n${desc}\n\n### 주요 제원\n${Object.entries(specs).filter(([,v])=>v).map(([k,v])=>`- ${k}: ${v}`).join('\n')}`,specs,confidence:conf,lastUpdated:'2026-07-01',relatedIntelIds:[],tags,sources,imageUrl:img,wikiUrl:wiki})

export const WEAPONS_BATCH1_ROK: WeaponSystem[] = [

  // ── 전차·기갑 ──────────────────────────────────────────────────────────────
  w('rok-t001','K1A2 전차','K1A2 MBT','GROUND','ROK','OPERATIONAL','MED',
    'K1 전차의 3차 개량형. 열상조준경·디지털 전장관리시스템 탑재. 105mm 강선포. 한국군 주력 전차 중 하나.',
    {weight:'51.1t',armament:'105mm KM68A1 강선포·M60D 7.62mm·M2HB 12.7mm',crew:'4명',speed:'65km/h',range:'500km',firstDeployed:'2001년',manufacturer:'현대로템',quantity:'1,000여 대'},
    ['K1A2','전차','105mm','기갑','한국군'],['현대로템','육군'],'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/K1A2_MBT.jpg/320px-K1A2_MBT.jpg','https://en.wikipedia.org/wiki/K1_88-Tank',92),

  w('rok-t002','K2 흑표','K2 Black Panther MBT','GROUND','ROK','OPERATIONAL','MED',
    '한국 독자 개발 4세대 주력전차. 120mm 활강포·자동장전장치·능동방호시스템(APS). 세계 최고 수준 전차.',
    {weight:'55t',armament:'120mm CN08 활강포·7.62mm 공축·12.7mm 포탑상부',crew:'3명',speed:'70km/h(도로)',range:'450km',firstDeployed:'2014년',manufacturer:'현대로템·S&T모티브',quantity:'260여 대(1차)'},
    ['K2','흑표','흑표전차','120mm','APS','4세대'],['현대로템','방위사업청'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/K2_Black_Panther.jpg/320px-K2_Black_Panther.jpg',
    'https://en.wikipedia.org/wiki/K2_Black_Panther',98),

  w('rok-t003','K2PIP 흑표 성능개량','K2 PIP Black Panther Upgrade','GROUND','ROK','DEVELOPMENT','MED',
    'K2 2차 성능개량. 국산 파워팩(엔진·변속기) 최종 적용. APS 2세대·디지털화 강화. 2026년 양산 목표.',
    {weight:'58t(예상)',armament:'120mm CN08+·7.62mm·12.7mm',crew:'3명',firstDeployed:'2026년(예상)',manufacturer:'현대로템'},
    ['K2PIP','흑표','성능개량','국산파워팩'],['현대로템','방위사업청'],undefined,undefined,80),

  w('rok-t004','K1 ARV 구난전차','K1 Armored Recovery Vehicle','GROUND','ROK','OPERATIONAL','LOW',
    'K1 전차 차체 기반 전차구난차. 인양 크레인·도저 블레이드·윈치 장착. 전장 파손 전차 구난·견인.',
    {weight:'52t',crew:'4명',speed:'60km/h',firstDeployed:'1990년대',manufacturer:'현대로템',armament:'7.62mm 기관총'},
    ['K1ARV','구난전차','공병','기갑지원'],['현대로템','육군'],undefined,undefined,88),

  w('rok-t005','K288A1 구난장갑차','K288A1 Armored Recovery Vehicle','GROUND','ROK','OPERATIONAL','LOW',
    'K200 계열 보병전투차 기반 장갑구난차. 소형 크레인·윈치 장착. 기계화 부대 지원 구난 임무.',
    {weight:'13t',crew:'3명',speed:'70km/h',manufacturer:'현대로템',firstDeployed:'1990년대'},
    ['K288','구난','장갑차','기계화'],['육군'],undefined,undefined,85),

  w('rok-t006','K21 보병전투차','K21 Infantry Fighting Vehicle','GROUND','ROK','OPERATIONAL','MED',
    '한국 독자 개발 4세대 IFV. 40mm 기관포·AT-III 대전차미사일 옵션. 하이브리드 부력 도하 능력.',
    {weight:'25t',armament:'40mm KCB 기관포·7.62mm·스파이크 ATM 옵션',crew:'3+9명',speed:'70km/h',range:'500km',firstDeployed:'2009년',manufacturer:'한화에어로스페이스',quantity:'900여 대'},
    ['K21','IFV','40mm','보병전투차','도하'],['한화에어로스페이스','방위사업청'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/K21_IFV.jpg/320px-K21_IFV.jpg',
    'https://en.wikipedia.org/wiki/K21',96),

  w('rok-t007','K200A1 장갑차','K200A1 Armored Personnel Carrier','GROUND','ROK','OPERATIONAL','LOW',
    'K200 기본형 개량. 한국군 기계화보병 핵심 병력수송장갑차. 다양한 파생형 운용 중.',
    {weight:'13.5t',armament:'K6 12.7mm 또는 K4 40mm 유탄기관총',crew:'3+9명',speed:'74km/h',range:'500km',firstDeployed:'1986년(A1:1990년대)',manufacturer:'한화에어로스페이스',quantity:'2,300여 대'},
    ['K200','APC','장갑차','기계화','병력수송'],['한화에어로스페이스','육군'],'https://upload.wikimedia.org/wikipedia/commons/5/5d/2011.7.5_%EC%88%98%EA%B8%B0%EC%82%AC_%EC%A0%80%ED%83%84%EC%86%8C%EB%85%B9%EC%83%89%EC%84%B1%EC%9E%A5_%287633933564%29.jpg','https://en.wikipedia.org/wiki/K200_KIFV',90),

  w('rok-t008','K21-105 경전차','K21-105 Light Tank','GROUND','ROK','DEVELOPMENT','MED',
    'K21 차체에 105mm 저반동 포탑 탑재 경전차. 공수부대·산악전 지원용. 수출 시장 겨냥.',
    {weight:'28t(예상)',armament:'105mm 저반동포',crew:'3명',firstDeployed:'개발중',manufacturer:'한화에어로스페이스'},
    ['K21-105','경전차','공수','105mm','수출'],['한화에어로스페이스'],'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/K21_IFV.jpg/320px-K21_IFV.jpg','https://en.wikipedia.org/wiki/K21',75),

  w('rok-t009','K808 차륜형장갑차 (천호)','K808 Wheeled APC (Cheonho)','GROUND','ROK','OPERATIONAL','LOW',
    '8×8 차륜형 장갑차. 기동성·유지비 우수. 평화유지작전·국내 경계 임무. 2020년 전력화.',
    {weight:'19.5t',armament:'K6 12.7mm·K4 40mm 옵션',crew:'2+9명',speed:'100km/h',range:'800km',firstDeployed:'2020년',manufacturer:'현대로템',quantity:'600대(목표)'},
    ['K808','차륜형','8x8','천호','장갑차'],['현대로템','방위사업청'],undefined,undefined,90),

  w('rok-t010','K806 차륜형장갑차','K806 Wheeled APC 6x6','GROUND','ROK','OPERATIONAL','LOW',
    '6×6 소형 차륜형 장갑차. K808과 함께 전력화. 경보병·수색 임무 특화.',
    {weight:'15t',armament:'K6 12.7mm',crew:'2+6명',speed:'100km/h',firstDeployed:'2020년',manufacturer:'현대로템'},
    ['K806','차륜형','6x6','장갑차','경보병'],['현대로템'],'https://upload.wikimedia.org/wikipedia/commons/f/fc/ROKA_K808_APC_river_crossing_training_-_March_2021.jpg','https://en.wikipedia.org/wiki/K808',88),

  w('rok-t011','AS21 레드백','AS21 Redback IFV','GROUND','ROK','DEVELOPMENT','MED',
    '한화디펜스-호주 공동 개발 한국형 차세대 IFV. 호주 LAND 400 Phase 3 수주 목표. 능동방호·복합장갑.',
    {weight:'42t',armament:'30mm 기관포·스파이크LR2·7.62mm',crew:'3+8명',speed:'65km/h',firstDeployed:'2025년(호주)',manufacturer:'한화에어로스페이스'},
    ['레드백','AS21','IFV','호주','차세대'],['한화에어로스페이스','호주육군'],undefined,'https://en.wikipedia.org/wiki/Redback_(IFV)',85),

  w('rok-t012','K531 105mm 자주포','K531 Self-Propelled Howitzer 105mm','ARTILLERY','ROK','OPERATIONAL','LOW',
    'M113 차체 기반 105mm 자주포. 공수부대·도서 방어 지원. 경량·공수 가능.',
    {weight:'12t',armament:'105mm M101 곡사포',crew:'5명',range:'300km',firstDeployed:'1980년대',manufacturer:'한화에어로스페이스',quantity:'200여 문'},
    ['K531','105mm','자주포','공수','도서'],['한화에어로스페이스','육군'],undefined,undefined,85),

  // ── 자주포·야포 ───────────────────────────────────────────────────────────
  w('rok-a001','K9A1 자주포','K9A1 Thunder Self-Propelled Howitzer','ARTILLERY','ROK','OPERATIONAL','MED',
    'K9 1차 성능개량. 자동화 사격통제·항법장치 개선. 분당 6~8발 속사. 세계 최대 자주포 수출국.',
    {weight:'47t',armament:'155mm/52구경장 곡사포',crew:'5명',range:'40km(RAP탄)',speed:'67km/h',firstDeployed:'2018년',manufacturer:'한화에어로스페이스',quantity:'1,200여 문(국내+수출)'},
    ['K9A1','천둥','자주포','155mm','수출'],['한화에어로스페이스','방위사업청'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/K9_Thunder.jpg/320px-K9_Thunder.jpg',
    'https://en.wikipedia.org/wiki/K9_Thunder',97),

  w('rok-a002','K9A2 자주포','K9A2 Thunder Self-Propelled Howitzer','ARTILLERY','ROK','DEVELOPMENT','MED',
    'K9 2차 성능개량. 완전 자동 장전·무인 포탑 옵션 연구. 사격 준비 시간 단축. 2027년 전력화 목표.',
    {weight:'47t',armament:'155mm/52구경장(자동장전)',crew:'3명(자동화)',firstDeployed:'2027년(예상)',manufacturer:'한화에어로스페이스'},
    ['K9A2','천둥','자동장전','무인포탑'],['한화에어로스페이스'],undefined,undefined,78),

  w('rok-a003','K10 탄약운반차','K10 Armored Ammunition Resupply Vehicle','ARTILLERY','ROK','OPERATIONAL','LOW',
    'K9 자주포 전용 장갑 탄약보급차. 자동 탄약이송 시스템. K9과 동일 차체. 전장 지속 사격 지원.',
    {weight:'47t',armament:'7.62mm 기관총',crew:'3명',speed:'67km/h',firstDeployed:'2003년',manufacturer:'한화에어로스페이스',quantity:'300여 대'},
    ['K10','탄약운반차','K9','자주포지원'],['한화에어로스페이스'],'https://upload.wikimedia.org/wikipedia/commons/0/0a/K10_ARV.jpg','https://en.wikipedia.org/wiki/K10_ammunition_resupply_vehicle',90),

  w('rok-a004','K55A1 자주포','K55A1 Self-Propelled Howitzer','ARTILLERY','ROK','OPERATIONAL','LOW',
    'M109A2 성능개량형. 한국화 사격통제장치·항법장치 장착. 155mm/23구경장. 예비사단 운용.',
    {weight:'27.5t',armament:'155mm/23구경장 M126 곡사포',crew:'6명',range:'18km',firstDeployed:'1986년(A1:2000년대)',manufacturer:'한화에어로스페이스',quantity:'1,040여 문'},
    ['K55','자주포','155mm','M109','예비'],['한화에어로스페이스','육군'],undefined,undefined,88),

  w('rok-a005','KH179 견인 곡사포','KH179 Towed Howitzer 155mm','ARTILLERY','ROK','OPERATIONAL','LOW',
    '155mm/45구경장 견인 곡사포. 국산화 개발. 예비전력·도서 방어 배치.',
    {weight:'8.5t',armament:'155mm/45구경장',crew:'8명',range:'30km(RAP)',firstDeployed:'1983년',manufacturer:'삼양화학(현 한화)',quantity:'500여 문'},
    ['KH179','견인포','155mm','야포'],['한화','육군'],undefined,undefined,85),

  w('rok-a006','K242 자주박격포','K242 Self-Propelled Mortar 107mm','ARTILLERY','ROK','OPERATIONAL','LOW',
    'K200 차체 기반 107mm 자주박격포. 보병연대 직접지원. 1980년대 전력화.',
    {weight:'13t',armament:'107mm M30 박격포',crew:'5명',range:'10km',firstDeployed:'1980년대',manufacturer:'한화에어로스페이스'},
    ['K242','자주박격포','107mm','보병지원'],['한화에어로스페이스','육군'],undefined,undefined,82),

  w('rok-a007','K281 자주박격포','K281 Self-Propelled Mortar 81mm','ARTILLERY','ROK','OPERATIONAL','LOW',
    'K200 차체 기반 81mm 자주박격포. 대대급 직접지원. 경장갑 보호.',
    {weight:'12t',armament:'81mm KM29 박격포',crew:'4명',firstDeployed:'1980년대',manufacturer:'한화에어로스페이스'},
    ['K281','81mm','자주박격포'],['한화에어로스페이스','육군'],undefined,undefined,80),

  // ── 다연장로켓 ───────────────────────────────────────────────────────────
  w('rok-r001','K136 구룡 다연장로켓','K136 Kooryong 130mm MLRS','MLRS','ROK','OPERATIONAL','MED',
    '36연장 130mm 다연장로켓시스템. K200 차체 기반. 36발 동시 발사 전지역 제압. 비무장지대 근접배치.',
    {weight:'25t',armament:'130mm 로켓 36발',crew:'3명',range:'36km',speed:'60km/h',firstDeployed:'1982년',manufacturer:'한화에어로스페이스·풍산',quantity:'200여 대'},
    ['K136','구룡','다연장','130mm','MLRS'],['한화에어로스페이스','육군'],undefined,'https://en.wikipedia.org/wiki/Kooryong',90),

  w('rok-r002','K239 천무 다연장로켓','K239 Chunmoo MLRS','MLRS','ROK','OPERATIONAL','HIGH',
    '한국 독자 개발 차세대 MLRS. 131mm·239mm 로켓 혼용. 정밀유도·스마트탄. 폴란드 수출 계약(288대).',
    {weight:'24t',armament:'239mm KTSSM·131mm 유도로켓 혼용',crew:'3명',range:'80km(239mm)·45km(131mm)',speed:'70km/h',firstDeployed:'2015년',manufacturer:'한화에어로스페이스',quantity:'200여 대+'},
    ['K239','천무','MLRS','정밀유도','폴란드수출'],['한화에어로스페이스','방위사업청'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/K239_Chunmoo_MLRS.jpg/320px-K239_Chunmoo_MLRS.jpg',
    'https://en.wikipedia.org/wiki/Chunmoo',97),

  w('rok-r003','KTSSM-I (전술지대지미사일)','KTSSM-I Tactical Surface-to-Surface Missile','MLRS','ROK','OPERATIONAL','HIGH',
    '천무 발사대에서 운용. 단거리 정밀 탄도미사일. GPS·INS 복합유도. 북한 장사정포 타격 전용.',
    {weight:'400kg(탄)',range:'180km',payload:'100kg',guidance:'GPS+INS',firstDeployed:'2022년',manufacturer:'한화에어로스페이스'},
    ['KTSSM','천무','전술지대지','장사정포대응','정밀타격'],['한화에어로스페이스','방위사업청'],'https://upload.wikimedia.org/wikipedia/commons/8/84/Hanwha_CTM-290_tactical_ballistic_missile.jpg','https://en.wikipedia.org/wiki/CTM-290',90),

  w('rok-r004','KTSSM-II','KTSSM-II Extended Range Tactical Missile','MLRS','ROK','DEVELOPMENT','HIGH',
    'KTSSM 개량형. 사거리 290km 이상 확장. 정밀도·파괴력 향상. 2025년 체계개발.',
    {range:'290km+',guidance:'GPS+INS+영상',firstDeployed:'2028년(예상)',manufacturer:'한화에어로스페이스'},
    ['KTSSM-II','천무','확장형','장거리'],['한화에어로스페이스'],'https://upload.wikimedia.org/wikipedia/commons/8/84/Hanwha_CTM-290_tactical_ballistic_missile.jpg','https://en.wikipedia.org/wiki/CTM-290',75),

  // ── 지대공미사일 ─────────────────────────────────────────────────────────
  w('rok-s001','천궁-I (M-SAM)','Cheongung I M-SAM','SAM','ROK','OPERATIONAL','HIGH',
    '한국 독자 개발 중거리 지대공미사일. 상승단계 요격·TVM 유도. 항공기·순항미사일 요격.',
    {range:'40km',altitude:'15km',speed:'마하 4',guidance:'TVM(추적유도)',firstDeployed:'2012년',manufacturer:'LIG넥스원',quantity:'6개 포대'},
    ['천궁','M-SAM','지대공','중거리','요격'],['LIG넥스원','방위사업청'],undefined,'https://en.wikipedia.org/wiki/Cheongung',93),

  w('rok-s002','천궁-II (M-SAM2)','Cheongung II M-SAM2','SAM','ROK','OPERATIONAL','HIGH',
    '천궁 성능개량 2형. 탄도미사일 하강단계 요격 능력 추가. AESA 레이더·개량 탄체. UAE 수출(35억불).',
    {range:'40km',altitude:'20km',speed:'마하 4.5+',guidance:'TVM+능동레이더 복합',firstDeployed:'2020년',manufacturer:'LIG넥스원',quantity:'12개 포대+수출'},
    ['천궁II','M-SAM2','탄도미사일요격','UAE수출'],['LIG넥스원','방위사업청'],undefined,undefined,95),

  w('rok-s003','L-SAM','L-SAM Long-Range SAM','SAM','ROK','DEVELOPMENT','HIGH',
    '한국 장거리 지대공미사일. 사드급 상층방어. 탄도미사일 대기권 외 요격 목표. 2028년 전력화.',
    {range:'150km+',altitude:'60km(상층)',guidance:'능동 레이더+IR',firstDeployed:'2028년(예상)',manufacturer:'LIG넥스원·한화'},
    ['L-SAM','장거리','상층방어','사드급','탄도미사일'],['LIG넥스원','방위사업청'],'https://upload.wikimedia.org/wikipedia/commons/5/5f/Long-range_Surface-to-Air_Missile.jpg','https://en.wikipedia.org/wiki/L-SAM',75),

  w('rok-s004','신궁 MANPADS','Shingung MANPADS','SAM','ROK','OPERATIONAL','MED',
    '한국 독자 개발 휴대용 지대공미사일. 적외선 유도. 저고도 항공기·헬기 요격. 2004년 전력화.',
    {range:'7km',altitude:'3.5km',speed:'마하 2+',guidance:'IR(적외선 추적)',firstDeployed:'2004년',manufacturer:'LIG넥스원',quantity:'다수'},
    ['신궁','MANPADS','휴대용','지대공','보병'],['LIG넥스원','방위사업청'],'https://upload.wikimedia.org/wikipedia/commons/a/a7/Promotional_booklet_of_the_Republic_of_Korea_Armed_Forces_2019_-_Chiron_%28Shingung%29_%28cropped%29.png','https://en.wikipedia.org/wiki/Chiron_(missile)',90),

  w('rok-s005','비호 복합 대공체계','Biyeong Complex Air Defense System','SAM','ROK','OPERATIONAL','MED',
    '30mm 비호 자주대공포에 신궁 미사일 4발 통합. 저고도 복합 방공. 전방부대 배치.',
    {range:'7km(미사일)·3km(포)',speed:'65km/h',crew:'3명',firstDeployed:'2010년대',manufacturer:'한화에어로스페이스·LIG넥스원'},
    ['비호복합','CIWS','대공','30mm','신궁'],['한화에어로스페이스','LIG넥스원'],'https://upload.wikimedia.org/wikipedia/commons/e/ef/US_Army_photo_160803-A-VV548-006_Standing_Watch_together.jpg','https://en.wikipedia.org/wiki/K30_Biho',88),

  w('rok-s006','K30 비호 자주대공포','K30 Biho SPAAG','SAM','ROK','OPERATIONAL','MED',
    '30mm 2연장 자주대공포. K200 차체. 저고도 항공기·헬기·드론 대응. 전자광학 추적.',
    {weight:'24t',armament:'30mm KCB 기관포 2문',crew:'3명',speed:'70km/h',range:'3km(유효)',firstDeployed:'2002년',manufacturer:'한화에어로스페이스'},
    ['K30','비호','SPAAG','30mm','자주대공'],['한화에어로스페이스','육군'],'https://upload.wikimedia.org/wikipedia/commons/e/ef/US_Army_photo_160803-A-VV548-006_Standing_Watch_together.jpg','https://en.wikipedia.org/wiki/K30_Biho',88),

  w('rok-s007','천마 단거리 지대공미사일','Chunma Short-Range SAM','SAM','ROK','OPERATIONAL','MED',
    '국산 단거리 지대공미사일. 트레일러 탑재·차량 기동. IR+레이더 복합 유도. 1990년대 전력화.',
    {range:'9km',altitude:'5km',speed:'마하 2.6',guidance:'IR+SARH',firstDeployed:'1990년대',manufacturer:'삼성탈레스(현 한화시스템)',quantity:'100여 기'},
    ['천마','단거리','지대공','SAM'],['한화시스템','육군'],'https://upload.wikimedia.org/wikipedia/commons/2/2e/%EC%9C%A1%EA%B5%B0_%287438813574%29.jpg','https://ko.wikipedia.org/wiki/천마_(미사일)',85),

  w('rok-s008','패트리어트 PAC-3 MSE','Patriot PAC-3 MSE','SAM','ROK','OPERATIONAL','HIGH',
    '미제 PAC-3 MSE 도입. 한국 방공망 핵심 중층방어. 탄도미사일·항공기 요격. 8개 포대 운용.',
    {range:'60km',altitude:'25km',speed:'마하 5',guidance:'능동레이더 유도',firstDeployed:'2008년(PAC-2)·2016년(PAC-3)',manufacturer:'레이시온·록히드마틴',quantity:'8개 포대'},
    ['패트리어트','PAC-3','MSE','탄도미사일요격','방공'],['레이시온','미국','방위사업청'],'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/U-s-service-members-stand-by-a-patriot-missile-battery-in-gaziantep-turkey.jpg/330px-U-s-service-members-stand-by-a-patriot-missile-battery-in-gaziantep-turkey.jpg','https://en.wikipedia.org/wiki/MIM-104_Patriot',97),

  w('rok-s009','M-SAM3 (천궁-III)','M-SAM3 Cheongung III','SAM','ROK','DEVELOPMENT','HIGH',
    '천궁-II 후속. 다중동시교전·능동위상배열 레이더. 사거리 60km 이상. 2030년대 전력화 목표.',
    {range:'60km+',altitude:'30km+',firstDeployed:'2030년대',manufacturer:'LIG넥스원'},
    ['천궁III','M-SAM3','차세대','방공'],['LIG넥스원','방위사업청'],undefined,undefined,65),

  // ── 대전차 무기 ─────────────────────────────────────────────────────────
  w('rok-at001','현궁 대전차미사일','Hyungoong Anti-Tank Missile','GROUND','ROK','OPERATIONAL','MED',
    '한국 독자 개발 단거리 대전차미사일. IR 영상유도·발사 후 망각. 수직 공격 능력. 차량·도보 이동형.',
    {range:'2.5km',payload:'탠덤 HEAT',guidance:'IR 영상',weight:'14.5kg(발사기)',firstDeployed:'2015년',manufacturer:'LIG넥스원'},
    ['현궁','ATGM','대전차','발사후망각','IR'],['LIG넥스원','방위사업청'],'https://upload.wikimedia.org/wikipedia/commons/2/22/AT-1K_Raybolt.png','https://en.wikipedia.org/wiki/Raybolt',90),

  w('rok-at002','비궁 경대전차미사일','Bigung Light Anti-Tank Missile','GROUND','ROK','OPERATIONAL','MED',
    '소형 경량 대전차미사일. 분대급 운용. 헬기·UAV 탑재 가능. 현궁보다 저비용.',
    {range:'2km',weight:'4.3kg(탄)',guidance:'IR 유도',firstDeployed:'2018년',manufacturer:'한화에어로스페이스'},
    ['비궁','경대전차','분대급','소형ATGM'],['한화에어로스페이스','방위사업청'],undefined,undefined,85),

  w('rok-at003','천검 대전차미사일','Cheongeom ATGM','GROUND','ROK','OPERATIONAL','MED',
    '한국형 헬기 탑재 공대지 대전차미사일. LAH(소형무장헬기) 탑재. IR 영상유도. 2020년대 전력화.',
    {range:'8km',guidance:'IR 영상 유도',weight:'50kg',firstDeployed:'2020년대',manufacturer:'LIG넥스원'},
    ['천검','공대지','헬기','대전차','LAH'],['LIG넥스원','육군항공'],undefined,undefined,82),

  w('rok-at004','스파이크-LR2 대전차미사일','Spike-LR2 ATGM','GROUND','ROK','OPERATIONAL','MED',
    '이스라엘제 스파이크 LR2 도입. K21 IFV 탑재. 발사 후 망각·EO 유도. 사거리 5.5km.',
    {range:'5.5km',guidance:'EO/IR 광섬유 유도',payload:'탠덤 HEAT+EFP',firstDeployed:'2020년대',manufacturer:'Rafael(이스라엘)'},
    ['스파이크','LR2','이스라엘','K21','대전차'],['Rafael','방위사업청'],undefined,undefined,90),

  // ── 미사일 (지대지·순항) ─────────────────────────────────────────────────
  w('rok-m001','현무-2A 탄도미사일','Hyunmoo-2A SRBM','SRBM','ROK','OPERATIONAL','HIGH',
    '사거리 300km 단거리 탄도미사일. 1단 고체추진. GPS+INS 복합유도. 북한 전역 타격 가능.',
    {range:'300km',payload:'500kg',guidance:'GPS+INS',propulsion:'고체연료 1단',firstDeployed:'2009년',manufacturer:'LIG넥스원·현대위아',quantity:'다수'},
    ['현무-2A','SRBM','탄도미사일','300km'],['LIG넥스원','방위사업청'],undefined,'https://en.wikipedia.org/wiki/Hyunmoo',92),

  w('rok-m002','현무-2B 탄도미사일','Hyunmoo-2B MRBM','SRBM','ROK','OPERATIONAL','HIGH',
    '사거리 500km 준중거리 탄도미사일. 북한 전역·중국 동북부 타격 권역. 개량 탄두·정밀도.',
    {range:'500km',payload:'500kg',guidance:'GPS+INS',propulsion:'고체연료',firstDeployed:'2015년',manufacturer:'LIG넥스원'},
    ['현무-2B','500km','탄도미사일'],['LIG넥스원','방위사업청'],undefined,undefined,90),

  w('rok-m003','현무-2C 탄도미사일','Hyunmoo-2C MRBM','SRBM','ROK','OPERATIONAL','HIGH',
    '사거리 800km. 북한 전역+중국 황해·동해 연안 타격. 2017년 전력화. 핵탄두 탑재 연구.',
    {range:'800km',payload:'500kg',guidance:'GPS+INS+종말유도',firstDeployed:'2017년',manufacturer:'LIG넥스원'},
    ['현무-2C','800km','탄도미사일','핵옵션'],['LIG넥스원','방위사업청'],undefined,undefined,90),

  w('rok-m004','현무-3A 순항미사일','Hyunmoo-3A LACM','CRUISE','ROK','OPERATIONAL','HIGH',
    '사거리 500km 지상발사 순항미사일. 지형대조+GPS 복합유도. CEP 수 m급 정밀타격.',
    {range:'500km',payload:'500kg',guidance:'TERCOM+GPS+영상',speed:'마하 0.8',firstDeployed:'2006년',manufacturer:'LIG넥스원'},
    ['현무-3A','순항미사일','LACM','500km','정밀'],['LIG넥스원','방위사업청'],'https://upload.wikimedia.org/wikipedia/commons/9/9e/Hyunmoo-3_missile_carrier.jpg','https://en.wikipedia.org/wiki/Hyunmoo-3',92),

  w('rok-m005','현무-3B 순항미사일','Hyunmoo-3B LACM','CRUISE','ROK','OPERATIONAL','HIGH',
    '사거리 1,000km 순항미사일. 중국 북부·일본 전역 타격 권역. 현무-3A 개량형.',
    {range:'1,000km',payload:'500kg',guidance:'TERCOM+GPS',speed:'마하 0.8',firstDeployed:'2010년',manufacturer:'LIG넥스원'},
    ['현무-3B','1000km','순항미사일'],['LIG넥스원','방위사업청'],'https://upload.wikimedia.org/wikipedia/commons/9/9e/Hyunmoo-3_missile_carrier.jpg','https://en.wikipedia.org/wiki/Hyunmoo-3',90),

  w('rok-m006','현무-3C 순항미사일','Hyunmoo-3C LACM','CRUISE','ROK','OPERATIONAL','HIGH',
    '사거리 1,500km 순항미사일. 한국 전략 타격 핵심 자산. 지하벙커 관통 특수탄두.',
    {range:'1,500km',payload:'500kg',guidance:'TERCOM+GPS+IIR',speed:'마하 0.8',firstDeployed:'2012년',manufacturer:'LIG넥스원'},
    ['현무-3C','1500km','순항미사일','전략'],['LIG넥스원','방위사업청'],'https://upload.wikimedia.org/wikipedia/commons/9/9e/Hyunmoo-3_missile_carrier.jpg','https://en.wikipedia.org/wiki/Hyunmoo-3',88),

  w('rok-m007','현무-4-1 탄도미사일','Hyunmoo-4-1 Ballistic Missile','SRBM','ROK','OPERATIONAL','CRITICAL',
    '2t 초대형 탄두 탄도미사일. 지하 갱도·벙커 파괴 전용. 북한 전쟁지도부 겨냥 응징보복 수단.',
    {range:'300km',payload:'2,000kg',guidance:'GPS+INS',firstDeployed:'2020년',manufacturer:'LIG넥스원'},
    ['현무-4-1','2t탄두','벙커파괴','응징보복','전략타격'],['LIG넥스원','방위사업청'],undefined,undefined,90),

  w('rok-m008','현무-4-2 탄도미사일','Hyunmoo-4-2 Ballistic Missile','SRBM','ROK','OPERATIONAL','CRITICAL',
    '4t 초대형 탄두 탄도미사일. 세계 최대급 재래식 탄두. 산악 지하벙커 관통 파괴.',
    {range:'300km',payload:'4,000kg',guidance:'GPS+INS',firstDeployed:'2021년',manufacturer:'LIG넥스원'},
    ['현무-4-2','4t탄두','초대형','벙커파괴'],['LIG넥스원','방위사업청'],undefined,undefined,88),

  w('rok-m009','현무-4-4 준중거리 탄도미사일','Hyunmoo-4-4 MRBM','IRBM','ROK','DEVELOPMENT','CRITICAL',
    '사거리 1,000km+ 준중거리 탄도미사일. 고체연료 다단계. 핵탄두 운반 능력 검토.',
    {range:'1,000km+',payload:'1,000kg+',propulsion:'고체연료 다단',firstDeployed:'2025년(예상)',manufacturer:'LIG넥스원'},
    ['현무-4-4','준중거리','MRBM','1000km'],['LIG넥스원','방위사업청'],undefined,undefined,80),

  w('rok-m010','현무-5 (한국형 ICBM)','Hyunmoo-5 ICBM-class','ICBM','ROK','DEVELOPMENT','CRITICAL',
    '사거리 5,000km+ 중장거리 탄도미사일 개발 추진. 핵 억지력 확보 목적. 고체 다단계 추진.',
    {range:'5,000km+(예상)',propulsion:'고체연료 3단(예상)',firstDeployed:'2030년대(예상)',manufacturer:'LIG넥스원·ADD'},
    ['현무-5','ICBM급','장거리','핵억지','전략'],['ADD','방위사업청'],undefined,undefined,60),

  // ── 해군 수상함 ──────────────────────────────────────────────────────────
  w('rok-n001','세종대왕함 (DDG-991)','ROKS Sejong the Great DDG-991','NAVAL','ROK','OPERATIONAL','HIGH',
    '이지스 구축함. 미국 SPY-1D(V) 이지스 레이더. 현무-3 순항·해성-II 함대지. SM-2/SM-6 운용 가능.',
    {displacement:'11,000t',armament:'127mm 함포·KVLS 80셀·SM-2·현무-3·해성-II·K-CIWS',crew:'300명',speed:'30노트',range:'5,500해리',firstDeployed:'2008년',manufacturer:'현대중공업'},
    ['세종대왕','이지스','DDG','구축함','SM-2'],['현대중공업','해군'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/ROKS_Sejong_the_Great_%28DDG-991%29.jpg/320px-ROKS_Sejong_the_Great_%28DDG-991%29.jpg',
    'https://en.wikipedia.org/wiki/Sejong_the_Great-class_destroyer',97),

  w('rok-n002','왕건함 (DDG-992)','ROKS Wang Geon DDG-992','NAVAL','ROK','OPERATIONAL','HIGH',
    '세종대왕급 2번함. 2번함부터 개량형 이지스 소프트웨어. BMD 능력 부분 보유.',
    {displacement:'11,000t',armament:'127mm·KVLS 80셀·SM-2·현무-3·해성',crew:'300명',speed:'30노트',firstDeployed:'2010년',manufacturer:'현대중공업'},
    ['왕건함','DDG-992','이지스','세종대왕급'],['현대중공업','해군'],undefined,undefined,95),

  w('rok-n003','서애류성룡함 (DDG-993)','ROKS Seoae Ryu Seong-ryong DDG-993','NAVAL','ROK','OPERATIONAL','HIGH',
    '세종대왕급 3번함. 3척 이지스함 중 최신 소프트웨어 탑재. BMD 업그레이드.',
    {displacement:'11,000t',armament:'127mm·KVLS 80셀·SM-2/6·현무-3',crew:'300명',speed:'30노트',firstDeployed:'2012년',manufacturer:'대우조선해양'},
    ['서애류성룡','DDG-993','이지스'],['대우조선해양','해군'],undefined,undefined,95),

  w('rok-n004','이지스함 차세대 (KDX-IIIA)','KDX-IIIA Next-Gen Aegis Destroyer','NAVAL','ROK','DEVELOPMENT','HIGH',
    '차세대 이지스 구축함. 국산 AESA 레이더(KAMS)·L-SAM 함정형·전술탄도미사일 요격. 2030년 전력화.',
    {displacement:'12,000t(예상)',armament:'국산AESA·L-SAM함정형·현무-III·SM-6',firstDeployed:'2030년(예상)',manufacturer:'HD현대중공업·한화오션'},
    ['KDX-IIIA','차세대이지스','KAMS','BMD','국산'],['방위사업청','해군'],undefined,undefined,72),

  w('rok-n005','충무공이순신함 (DDH-975)','ROKS Chungmugong Yi Sun-sin DDH-975','NAVAL','ROK','OPERATIONAL','MED',
    '충무공이순신급 1번함. SM-2 Block IIIA·하푼·청상어·VLS 탑재. 전천후 방공·대잠 구축함.',
    {displacement:'5,520t',armament:'127mm·VLS 32셀·SM-2·하푼·청상어·K-CIWS',crew:'200명',speed:'29노트',firstDeployed:'2003년',manufacturer:'현대중공업'},
    ['충무공이순신','DDH','구축함','SM-2','한국해군'],['현대중공업','해군'],'https://upload.wikimedia.org/wikipedia/commons/6/65/ROKS_Yi_SunShin_DDH-975.jpg','https://en.wikipedia.org/wiki/Chungmugong_Yi_Sun-sin-class_destroyer',93),

  w('rok-n006','문무대왕함 (DDH-976)','ROKS Munmu the Great DDH-976','NAVAL','ROK','OPERATIONAL','MED',
    '충무공이순신급 2번함. 2번함부터 K-VLS 8셀 추가.',
    {displacement:'5,520t',armament:'127mm·VLS 32셀+K-VLS 8셀·SM-2·하푼',crew:'200명',speed:'29노트',firstDeployed:'2005년',manufacturer:'현대중공업'},
    ['문무대왕','DDH-976','구축함'],['현대중공업','해군'],'https://upload.wikimedia.org/wikipedia/commons/6/65/ROKS_Yi_SunShin_DDH-975.jpg','https://en.wikipedia.org/wiki/Chungmugong_Yi_Sun-sin-class_destroyer',92),

  w('rok-n007','대조영함 (DDH-977)','ROKS Daejogyeong DDH-977','NAVAL','ROK','OPERATIONAL','MED',
    '충무공이순신급 3번함.',
    {displacement:'5,520t',armament:'127mm·VLS 32셀·SM-2·하푼·청상어',crew:'200명',firstDeployed:'2007년',manufacturer:'한진중공업'},
    ['대조영','DDH-977','구축함'],['한진중공업','해군'],'https://upload.wikimedia.org/wikipedia/commons/6/65/ROKS_Yi_SunShin_DDH-975.jpg','https://en.wikipedia.org/wiki/Chungmugong_Yi_Sun-sin-class_destroyer',92),

  w('rok-n008','왕인함 (DDH-978)','ROKS Wang In DDH-978','NAVAL','ROK','OPERATIONAL','MED',
    '충무공이순신급 4번함.',
    {displacement:'5,520t',armament:'127mm·VLS 32셀·SM-2·하푼·청상어',crew:'200명',firstDeployed:'2008년',manufacturer:'대우조선해양'},
    ['왕인함','DDH-978','구축함'],['대우조선해양','해군'],'https://upload.wikimedia.org/wikipedia/commons/6/65/ROKS_Yi_SunShin_DDH-975.jpg','https://en.wikipedia.org/wiki/Chungmugong_Yi_Sun-sin-class_destroyer',92),

  w('rok-n009','강감찬함 (DDH-979)','ROKS Gang Gam-chan DDH-979','NAVAL','ROK','OPERATIONAL','MED',
    '충무공이순신급 5번함.',
    {displacement:'5,520t',armament:'127mm·VLS 32셀·SM-2·하푼·청상어',crew:'200명',firstDeployed:'2008년',manufacturer:'현대중공업'},
    ['강감찬','DDH-979','구축함'],['현대중공업','해군'],'https://upload.wikimedia.org/wikipedia/commons/6/65/ROKS_Yi_SunShin_DDH-975.jpg','https://en.wikipedia.org/wiki/Chungmugong_Yi_Sun-sin-class_destroyer',92),

  w('rok-n010','최영함 (DDH-981)','ROKS Choe Yeong DDH-981','NAVAL','ROK','OPERATIONAL','MED',
    '충무공이순신급 6번함(마지막). SM-2 Blk IIIA 최신 소프트웨어.',
    {displacement:'5,520t',armament:'127mm·VLS 32셀·SM-2·하푼·청상어',crew:'200명',firstDeployed:'2011년',manufacturer:'한진중공업'},
    ['최영함','DDH-981','구축함'],['한진중공업','해군'],'https://upload.wikimedia.org/wikipedia/commons/6/65/ROKS_Yi_SunShin_DDH-975.jpg','https://en.wikipedia.org/wiki/Chungmugong_Yi_Sun-sin-class_destroyer',92),

  w('rok-n011','인천함 (FFX-811)','ROKS Incheon FFX-811','NAVAL','ROK','OPERATIONAL','MED',
    '인천급(FFX-I) 1번함. 국산 신형 호위함. VLS·청상어·해성 탑재. 스텔스 선형.',
    {displacement:'3,300t',armament:'127mm·VLS 16셀·해성-I·청상어·CIWS',crew:'140명',speed:'30노트',firstDeployed:'2013년',manufacturer:'현대중공업'},
    ['인천함','FFX','호위함','인천급'],['현대중공업','해군'],'https://upload.wikimedia.org/wikipedia/commons/5/5e/20130626_%EB%8C%80%ED%95%9C%ED%95%B4%ED%98%91_%EC%A0%84%EC%8A%B9%ED%96%89%EC%82%AC_%284%29_%289460603621%29.jpg','https://en.wikipedia.org/wiki/Incheon-class_frigate',92),

  w('rok-n012','경기함 (FFX-812)','ROKS Gyeonggi FFX-812','NAVAL','ROK','OPERATIONAL','MED',
    '인천급 2번함.',
    {displacement:'3,300t',armament:'127mm·VLS 16셀·해성-I·청상어',crew:'140명',firstDeployed:'2014년',manufacturer:'현대중공업'},
    ['경기함','FFX-812','호위함'],['현대중공업','해군'],'https://upload.wikimedia.org/wikipedia/commons/5/5e/20130626_%EB%8C%80%ED%95%9C%ED%95%B4%ED%98%91_%EC%A0%84%EC%8A%B9%ED%96%89%EC%82%AC_%284%29_%289460603621%29.jpg','https://en.wikipedia.org/wiki/Incheon-class_frigate',90),

  w('rok-n013','전북함 (FFX-813)','ROKS Jeonbuk FFX-813','NAVAL','ROK','OPERATIONAL','MED',
    '인천급 3번함.',
    {displacement:'3,300t',armament:'127mm·VLS 16셀·해성-I·청상어',crew:'140명',firstDeployed:'2015년',manufacturer:'대우조선해양'},
    ['전북함','FFX-813','호위함'],['대우조선해양','해군'],'https://upload.wikimedia.org/wikipedia/commons/5/5e/20130626_%EB%8C%80%ED%95%9C%ED%95%B4%ED%98%91_%EC%A0%84%EC%8A%B9%ED%96%89%EC%82%AC_%284%29_%289460603621%29.jpg','https://en.wikipedia.org/wiki/Incheon-class_frigate',90),

  w('rok-n014','충북함 (FFX-821)','ROKS Chungbuk FFX-821 (FFX-II)','NAVAL','ROK','OPERATIONAL','MED',
    '대구급(FFX-II) 1번함. 인천급 개량형. 홍상어 ASROC·장거리 대공미사일 탑재.',
    {displacement:'3,600t',armament:'127mm·K-VLS 24셀·SM-2·홍상어·해성·CIWS',crew:'140명',speed:'30노트',firstDeployed:'2018년',manufacturer:'현대중공업'},
    ['대구급','FFX-II','호위함','홍상어','SM-2'],['현대중공업','해군'],'https://upload.wikimedia.org/wikipedia/commons/0/0f/ROKS_Seoul_%28FFG-821%29_underway_in_the_Yellow_Sea_during_the_commemoration_of_the_73rd_anniversary_of_the_Battle_of_Incheon_on_14_September_2023_%28cropped%29.jpg','https://en.wikipedia.org/wiki/Daegu-class_frigate',93),

  w('rok-n015','충남함 (FFX-831)','ROKS Chungnam FFX-831 (FFX-III)','NAVAL','ROK','DEVELOPMENT','MED',
    'FFX-III 천안급 1번함. 스텔스 선형 강화·국산 AESA 레이더·해성-III 탑재 예정. 건조 중.',
    {displacement:'4,500t(예상)',armament:'VLS 48셀·AESA레이더·해성-III·홍상어',crew:'140명',firstDeployed:'2027년(예상)',manufacturer:'HD현대중공업'},
    ['천안급','FFX-III','차세대호위함','AESA'],['HD현대중공업','해군'],undefined,undefined,75),

  w('rok-n016','윤영하함 (PKG-711)','ROKS Yun Yeong-ha PKG-711','NAVAL','ROK','OPERATIONAL','MED',
    '윤영하급 고속유도탄함 1번함. 해성-I 함대함 4발·76mm 함포. 18척 건조. 2002년 연평해전 영웅 헌정.',
    {displacement:'440t',armament:'76mm OTO·해성-I 4발·30mm CIWS·어뢰',crew:'40명',speed:'40노트',firstDeployed:'2008년',manufacturer:'STX조선해양'},
    ['윤영하급','PKG','고속유도탄함','해성','연평해전'],['STX조선','해군'],undefined,'https://en.wikipedia.org/wiki/Yun_Youngha-class_patrol_vessel',93),

  w('rok-n017','독도함 (LPH-6111)','ROKS Dokdo LPH-6111','NAVAL','ROK','OPERATIONAL','MED',
    '독도급 대형수송함. F-35B 탑재 가능 구조(경항모 전환 후보). 수직착륙기·헬기 운용 가능.',
    {displacement:'19,000t',armament:'CIWS·해성·팰렁크스',crew:'330명+상륙병력700명',speed:'22노트',firstDeployed:'2007년',manufacturer:'한진중공업'},
    ['독도함','LPH','수송함','경항모','상륙작전'],['한진중공업','해군'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Dokdo_LPH.jpg/320px-Dokdo_LPH.jpg',
    'https://en.wikipedia.org/wiki/ROKS_Dokdo',95),

  w('rok-n018','마라도함 (LPH-6112)','ROKS Marado LPH-6112','NAVAL','ROK','OPERATIONAL','MED',
    '독도급 2번함. 독도함 대비 개량. F-35B 탑재 검토. 한국 경항모 사업 논의.',
    {displacement:'19,500t',armament:'CIWS·RIM-116·해성',crew:'330명+상륙병력700명',speed:'22노트',firstDeployed:'2021년',manufacturer:'한진중공업'},
    ['마라도함','LPH-6112','경항모','수송함'],['한진중공업','해군'],'https://upload.wikimedia.org/wikipedia/commons/4/4d/ROKS_Dokdo_%28LPH_6111%29_-_Invincible_Spirit.jpg','https://en.wikipedia.org/wiki/Dokdo-class_amphibious_assault_ship',95),

  w('rok-n019','도산안창호함 (SS-083)','ROKS Dosan Ahn Chang-ho SS-083','SUBMARINE','ROK','OPERATIONAL','HIGH',
    '장보고-III Batch-I 1번함. 3,000t급 국산 잠수함. 수직발사관 6셀(현무-2B·해성-III). 리튬이온 배터리.',
    {displacement:'3,600t(수중)',armament:'수직발사관 6셀·어뢰관 8문·현무-2B·해성-III',crew:'50명',speed:'20노트(수중)',firstDeployed:'2021년',manufacturer:'대우조선해양'},
    ['도산안창호','장보고III','잠수함','SLBM','현무-2B'],['대우조선해양','해군'],undefined,'https://en.wikipedia.org/wiki/Dosan_Ahn_Chang-ho-class_submarine',95),

  w('rok-n020','안무함 (SS-085)','ROKS Ahn Mu SS-085','SUBMARINE','ROK','OPERATIONAL','HIGH',
    '장보고-III Batch-I 2번함. SS-083과 동급.',
    {displacement:'3,600t',armament:'수직발사관 6셀·어뢰관 8문',crew:'50명',firstDeployed:'2022년',manufacturer:'현대중공업'},
    ['안무함','장보고III','잠수함'],['현대중공업','해군'],undefined,undefined,93),

  w('rok-n021','장보고-I급 잠수함 (SS-061~069)','Chang Bogo-class Submarine (Type 209)','SUBMARINE','ROK','OPERATIONAL','MED',
    'Type 209/1200 기반 국산 건조 잠수함. 9척 운용. 어뢰관 8문. 재래식 추진.',
    {displacement:'1,200t',armament:'533mm 어뢰관 8문·Mk37 어뢰',crew:'33명',speed:'22노트(수중)',firstDeployed:'1993년',manufacturer:'대우조선해양·현대중공업',quantity:'9척'},
    ['장보고I','209형','잠수함','1200t'],['대우조선해양','해군'],'https://upload.wikimedia.org/wikipedia/commons/6/6c/ROKS_Park_Wi.jpg','https://en.wikipedia.org/wiki/Chang_Bogo-class_submarine',90),

  w('rok-n022','손원일급 잠수함 (SS-072~079)','Son Won-il-class Submarine (Type 214)','SUBMARINE','ROK','OPERATIONAL','HIGH',
    'Type 214 기반 AIP 잠수함. 수소연료전지(AIP). 어뢰관 8문+하푼 캡슐발사. 장기 잠항.',
    {displacement:'1,800t',armament:'533mm 어뢰관 8문·하푼 UGM-84',crew:'27명',speed:'20노트',firstDeployed:'2007년',manufacturer:'대우조선해양·현대중공업',quantity:'9척'},
    ['손원일급','214형','AIP','잠수함','하푼'],['대우조선해양','해군'],'https://upload.wikimedia.org/wikipedia/commons/4/49/ROKS_Yun_Bonggil_%28SS_077%29_190605-N-SS370-0028.jpg','https://en.wikipedia.org/wiki/Son_Won-il-class_submarine',93),

  w('rok-n023','해성-I 함대함미사일','Haeseong I Anti-Ship Missile','SSM','ROK','OPERATIONAL','HIGH',
    '국산 함대함 순항미사일. 터보팬 추진. GPS+TERCOM+IIR 유도. 수상함·PKG 탑재.',
    {range:'150km',speed:'마하 0.9',payload:'250kg',guidance:'TERCOM+GPS+IIR',firstDeployed:'2003년',manufacturer:'LIG넥스원'},
    ['해성I','함대함','순항미사일','국산'],['LIG넥스원','해군'],'https://upload.wikimedia.org/wikipedia/commons/0/03/Hae_fung.jpg','https://en.wikipedia.org/wiki/Haeseong',92),

  w('rok-n024','해성-II 함대지 순항미사일','Haeseong II Land-Attack Cruise Missile','CRUISE','ROK','OPERATIONAL','HIGH',
    '해성-I 지상타격 개량형. 함정 발사 지상공격용. GPS+TERCOM. 사거리 500km.',
    {range:'500km',speed:'마하 0.9',payload:'500kg',guidance:'TERCOM+GPS+IIR',firstDeployed:'2015년',manufacturer:'LIG넥스원'},
    ['해성II','함대지','순항미사일','500km'],['LIG넥스원','해군'],'https://upload.wikimedia.org/wikipedia/commons/0/03/Hae_fung.jpg','https://en.wikipedia.org/wiki/Haeseong',90),

  w('rok-n025','해성-III 잠수함발사 순항미사일','Haeseong III SLCM','CRUISE','ROK','OPERATIONAL','HIGH',
    '잠수함 수직발사관 발사 지상공격 순항미사일. 도산안창호급 탑재. 사거리 1,000km+.',
    {range:'1,000km+',guidance:'TERCOM+GPS+IIR',propulsion:'터보팬',firstDeployed:'2021년',manufacturer:'LIG넥스원'},
    ['해성III','SLCM','잠수함','순항미사일','1000km'],['LIG넥스원','해군'],'https://upload.wikimedia.org/wikipedia/commons/0/03/Hae_fung.jpg','https://en.wikipedia.org/wiki/Haeseong',88),

  w('rok-n026','홍상어 대잠로켓','Hongsangeo Anti-Submarine Rocket','NAVAL','ROK','OPERATIONAL','MED',
    '국산 함정발사 대잠로켓(ASROC 대체). 청상어 경어뢰 탑재 로켓. 사거리 20km. FFX-II 탑재.',
    {range:'20km',payload:'청상어 경어뢰',guidance:'INS',firstDeployed:'2016년',manufacturer:'LIG넥스원'},
    ['홍상어','ASROC','대잠','로켓','청상어'],['LIG넥스원','해군'],undefined,undefined,90),

  w('rok-n027','청상어 경어뢰','Cheongsan-eo Light Torpedo','NAVAL','ROK','OPERATIONAL','MED',
    '국산 항공투하·함정발사 경어뢰. 324mm. 능동/수동 음향 유도. P-3·링스헬기·FFX 탑재.',
    {weight:'280kg(탄)',range:'19km',speed:'45노트',guidance:'능동/수동 음향',firstDeployed:'2004년',manufacturer:'LIG넥스원'},
    ['청상어','경어뢰','324mm','대잠'],['LIG넥스원','해군'],undefined,'https://en.wikipedia.org/wiki/Cheong-sangeo',90),

  w('rok-n028','백상어 중어뢰','Baeksang-eo Heavy Torpedo','NAVAL','ROK','OPERATIONAL','HIGH',
    '국산 잠수함 발사 중어뢰. 533mm. 능동/수동 음향+항적 유도. 장보고급 탑재.',
    {weight:'1,360kg',range:'35km',speed:'45노트',guidance:'능동/수동/항적',firstDeployed:'2015년',manufacturer:'LIG넥스원'},
    ['백상어','중어뢰','533mm','잠수함'],['LIG넥스원','해군'],undefined,undefined,88),

  // ── 공군 항공기 ──────────────────────────────────────────────────────────
  w('rok-af001','KF-21 보라매 블록1','KF-21 Boramae Block 1','AIRCRAFT','ROK','DEVELOPMENT','HIGH',
    '한국 독자 개발 4.5세대 전투기. 2022년 첫 비행. 2026년 초도비행대대. AESA 레이더·IRST·스텔스 외장무장창.',
    {speed:'마하 1.8',range:'2,900km',ceiling:'18,000m',crew:'1명(복좌2명)',armament:'미티어·AIM-120·GBU-54·슬래머 등',firstDeployed:'2026년(예상)',manufacturer:'KAI',quantity:'120기(1차)'},
    ['KF-21','보라매','한국형전투기','4.5세대','AESA'],['KAI','공군','방위사업청'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/KF-21_boramae_1st_flight.jpg/320px-KF-21_boramae_1st_flight.jpg',
    'https://en.wikipedia.org/wiki/KAI_KF-21_Boramae',95),

  w('rok-af002','KF-21 보라매 블록2','KF-21 Boramae Block 2','AIRCRAFT','ROK','DEVELOPMENT','HIGH',
    '보라매 2형. 내부 무장창·재밍포드·스텔스 강화. 사실상 5세대 수준. 2030년대 전력화 목표.',
    {speed:'마하 1.8+',range:'3,000km',firstDeployed:'2032년(예상)',manufacturer:'KAI'},
    ['KF-21','보라매','블록2','내부무장창','스텔스'],['KAI','방위사업청'],undefined,undefined,70),

  w('rok-af003','F-35A 라이트닝 II (공군)','F-35A Lightning II (ROKAF)','AIRCRAFT','ROK','OPERATIONAL','LOW',
    '한국 공군 5세대 스텔스 전투기. 40기 도입 완료(2019~2021년). 청주기지·서산기지 배치.',
    {speed:'마하 1.6',range:'2,220km',ceiling:'15,240m',crew:'1명',armament:'AIM-120D·AIM-9X·GBU-31·SDB II',firstDeployed:'2019년',manufacturer:'록히드마틴',quantity:'40기'},
    ['F-35A','스텔스','5세대','한국공군'],['록히드마틴','공군'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/F-35A_ROKAF.jpg/320px-F-35A_ROKAF.jpg',
    'https://en.wikipedia.org/wiki/Lockheed_Martin_F-35_Lightning_II',98),

  w('rok-af004','F-35A 2차 도입','F-35A Block 4 ROKAF Lot 2','AIRCRAFT','ROK','OPERATIONAL','LOW',
    'F-35A 블록4 추가 20기 도입. 2024~2025년 인도. 총 60기 보유 예정.',
    {speed:'마하 1.6',range:'2,220km',crew:'1명',armament:'B61-12(NATO 공유 검토)·AIM-120D',firstDeployed:'2024년',manufacturer:'록히드마틴',quantity:'20기'},
    ['F-35A','블록4','2차도입','한국공군'],['록히드마틴','공군'],undefined,undefined,95),

  w('rok-af005','F-15K 슬램이글','F-15K Slam Eagle','AIRCRAFT','ROK','OPERATIONAL','LOW',
    '미국 F-15E 개량형. 한국 공군 주력 타격기. SLAM-ER 장거리 공대지·타우러스 KEPD 350 탑재.',
    {speed:'마하 2.5',range:'4,400km',ceiling:'18,000m',crew:'2명',armament:'SLAM-ER·타우러스 KEPD·AIM-120C·GBU-28',firstDeployed:'2005년',manufacturer:'보잉',quantity:'61기'},
    ['F-15K','슬램이글','타우러스','SLAM-ER','한국공군'],['보잉','공군'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/F-15K.jpg/320px-F-15K.jpg',
    'https://en.wikipedia.org/wiki/Boeing_F-15K_Slam_Eagle',97),

  w('rok-af006','KF-16C/D 블록52+','KF-16C/D Block 52+','AIRCRAFT','ROK','OPERATIONAL','LOW',
    '한국형 F-16C/D. AESA 레이더(AN/APG-83) 업그레이드 진행중. 사거리 연장·정밀무기 통합.',
    {speed:'마하 2.0',range:'3,200km',crew:'1~2명',armament:'AIM-120C·AIM-9X·JDAM·Maverick·SLAM-ER',firstDeployed:'1995년',manufacturer:'KAI·록히드마틴',quantity:'134기'},
    ['KF-16','블록52+','AESA업그레이드','한국공군'],['KAI','록히드마틴','공군'],'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/F-16_June_2008.jpg/330px-F-16_June_2008.jpg','https://en.wikipedia.org/wiki/General_Dynamics_F-16_Fighting_Falcon',93),

  w('rok-af007','FA-50 경공격기','FA-50 Golden Eagle Light Combat Aircraft','AIRCRAFT','ROK','OPERATIONAL','LOW',
    'T-50 기반 경공격기. AESA 레이더·AIM-9L 공대공·Mk82 폭탄. 폴란드·이라크·필리핀 수출.',
    {speed:'마하 1.5',range:'1,851km',ceiling:'14,630m',crew:'2명',armament:'20mm M61A1·AIM-9L·Mk82·JDAM·LAU-61',firstDeployed:'2013년',manufacturer:'KAI',quantity:'60기+수출'},
    ['FA-50','경공격기','T-50','폴란드수출','한국'],['KAI','공군'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/FA-50_ROKAF.jpg/320px-FA-50_ROKAF.jpg',
    'https://en.wikipedia.org/wiki/KAI_T-50_Golden_Eagle',95),

  w('rok-af008','T-50 골든이글 고등훈련기','T-50 Golden Eagle Advanced Trainer','AIRCRAFT','ROK','OPERATIONAL','LOW',
    '한국 독자 개발(KAI+록히드마틴) 초음속 고등훈련기. F-16 조종사 전환 훈련. 다국 수출.',
    {speed:'마하 1.5',range:'1,851km',crew:'2명',armament:'공대공·공대지 기본 통합',firstDeployed:'2005년',manufacturer:'KAI',quantity:'60기+수출'},
    ['T-50','골든이글','훈련기','초음속','KAI수출'],['KAI','공군'],'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/ROKAF_T-50_Golden_Eagle.jpg/320px-ROKAF_T-50_Golden_Eagle.jpg','https://en.wikipedia.org/wiki/KAI_T-50_Golden_Eagle',95),

  w('rok-af009','E-737 피스아이 AEW&C','E-737 Peace Eye AEW&C','AIRCRAFT','ROK','OPERATIONAL','HIGH',
    '보잉 737 기반 공중조기경보통제기(AEW&C). 360도 MESA 레이더. 공중지휘통제 핵심 자산. 4기 보유.',
    {speed:'900km/h',range:'6,500km',crew:'19명(전술요원 포함)',armament:'없음(지휘통제)',firstDeployed:'2011년',manufacturer:'보잉',quantity:'4기'},
    ['E-737','피스아이','AEW&C','조기경보','MESA레이더'],['보잉','공군'],undefined,'https://en.wikipedia.org/wiki/Boeing_737_AEW%26C',97),

  w('rok-af010','KC-330 시그너스 공중급유기','KC-330 Cygnus Tanker','AIRCRAFT','ROK','OPERATIONAL','LOW',
    'A330 MRTT 기반 공중급유수송기. 4기 도입. 비접촉 급유·승객 수송 겸용.',
    {speed:'880km/h',range:'14,800km',crew:'6명',armament:'없음',firstDeployed:'2019년',manufacturer:'에어버스',quantity:'4기'},
    ['KC-330','시그너스','공중급유','A330','MRTT'],['에어버스','공군'],undefined,'https://en.wikipedia.org/wiki/Airbus_A330_MRTT',95),

  w('rok-af011','KT-1 웅비 기본훈련기','KT-1 Woong-Bee Basic Trainer','AIRCRAFT','ROK','OPERATIONAL','LOW',
    '한국 독자 개발 프로펠러 기본훈련기. 터보프롭 엔진. 인도네시아·터키·페루 수출.',
    {speed:'648km/h',range:'1,720km',crew:'2명',firstDeployed:'2000년',manufacturer:'KAI',quantity:'85기+수출'},
    ['KT-1','웅비','기본훈련기','터보프롭','KAI'],['KAI','공군'],undefined,'https://en.wikipedia.org/wiki/KAI_KT-1',92),

  w('rok-af012','C-130J 허큘리스 수송기','C-130J Hercules (ROKAF)','AIRCRAFT','ROK','OPERATIONAL','LOW',
    '록히드마틴 C-130J 도입. 공수·전술수송. 공군 4기 운용. C-130H 대체.',
    {speed:'643km/h',range:'6,850km',crew:'3~5명',armament:'없음',firstDeployed:'2014년',manufacturer:'록히드마틴',quantity:'4기'},
    ['C-130J','수송기','공수','록히드마틴'],['록히드마틴','공군'],undefined,undefined,93),

  w('rok-af013','RQ-4B 글로벌호크 (공군)','RQ-4B Global Hawk (ROKAF)','UAV','ROK','OPERATIONAL','LOW',
    '미국 글로벌호크 고고도 장기체공 무인정찰기. 4기 도입. 북한 전역 실시간 감시.',
    {speed:'574km/h',range:'22,780km',ceiling:'18,000m',armament:'없음(정찰)',firstDeployed:'2019년',manufacturer:'노스롭그루먼',quantity:'4기'},
    ['글로벌호크','RQ-4B','무인정찰','고고도','한국공군'],['노스롭그루먼','공군'],undefined,'https://en.wikipedia.org/wiki/Northrop_Grumman_RQ-4_Global_Hawk',97),

  // ── 육군항공·헬기 ─────────────────────────────────────────────────────────
  w('rok-h001','AH-64E 아파치 가디언','AH-64E Apache Guardian','HELICOPTER','ROK','OPERATIONAL','HIGH',
    '미국 AH-64E 공격헬기 36기 도입. 롱보우 레이더·AGM-114 헬파이어·하이드라 70 로켓.',
    {speed:'293km/h',range:'1,900km',crew:'2명',armament:'30mm M230·AGM-114·AIM-92·하이드라70',firstDeployed:'2016년',manufacturer:'보잉',quantity:'36기'},
    ['아파치','AH-64E','공격헬기','헬파이어','롱보우'],['보잉','육군'],undefined,'https://en.wikipedia.org/wiki/Boeing_AH-64_Apache',97),

  w('rok-h002','KUH-1 수리온','KUH-1 Surion','HELICOPTER','ROK','OPERATIONAL','MED',
    '한국 독자 개발 기동헬기. KAI+에어버스 협력. 군용·경찰·소방·해경 다목적 운용.',
    {speed:'259km/h',range:'480km',crew:'2+12명',armament:'M134 미니건·70mm 로켓(무장형)',firstDeployed:'2013년',manufacturer:'KAI',quantity:'200기+'},
    ['수리온','KUH-1','기동헬기','국산헬기','KAI'],['KAI','육군'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Surion_helicopter.jpg/320px-Surion_helicopter.jpg',
    'https://en.wikipedia.org/wiki/KAI_KUH-1_Surion',95),

  w('rok-h003','LAH 소형무장헬기','LAH Light Armed Helicopter','HELICOPTER','ROK','DEVELOPMENT','MED',
    '한국형 경무장헬기. KAI 개발. AH-6i 대체. 천검 미사일·FLIR·20mm 기관포. 2025년 전력화.',
    {speed:'250km/h',range:'440km',crew:'2명',armament:'20mm 기관포·천검 ATGM·70mm 로켓',firstDeployed:'2025년',manufacturer:'KAI'},
    ['LAH','소형무장헬기','천검','국산','KAI'],['KAI','방위사업청'],undefined,'https://en.wikipedia.org/wiki/KAI_LAH',85),

  w('rok-h004','CH-47D 치누크 (한국군)','CH-47D Chinook (ROKA)','HELICOPTER','ROK','OPERATIONAL','LOW',
    '중형 수송헬기. 18기 운용. 병력 수송·물자 공수·야포 슬링 수송.',
    {speed:'298km/h',range:'741km',crew:'3+33명',armament:'M134·M60D',firstDeployed:'1990년대',manufacturer:'보잉',quantity:'18기'},
    ['치누크','CH-47D','수송헬기','중형','보잉'],['보잉','육군'],undefined,undefined,90),

  w('rok-h005','UH-60P 블랙호크','UH-60P Black Hawk (ROKA)','HELICOPTER','ROK','OPERATIONAL','LOW',
    '한국형 UH-60P(국산화). 기동헬기. 병력·물자 수송. KAI 면허생산.',
    {speed:'294km/h',range:'592km',crew:'2+11명',armament:'M60D·M134 옵션',firstDeployed:'1990년대',manufacturer:'KAI(면허생산)',quantity:'130여 기'},
    ['블랙호크','UH-60P','기동헬기','KAI면허'],['KAI','육군'],undefined,undefined,90),

  // ── 소화기·개인화기 ──────────────────────────────────────────────────────
  w('rok-sa001','K2C 소총','K2C Assault Rifle','RIFLE','ROK','OPERATIONAL','MED',
    'K2 소총 단축형. 접철식 개머리판 제거·총열 단축. 특수부대·차량 승무원 운용.',
    {caliber:'5.56×45mm NATO',weight:'2.86kg',length:'869mm(접이)',fireRate:'700~900rpm',capacity:'30발',firstDeployed:'2015년',manufacturer:'S&T모티브'},
    ['K2C','카빈','특수부대','단축형'],['S&T모티브','육군'],undefined,undefined,90),

  w('rok-sa002','K2C1 소총','K2C1 Assault Rifle','RIFLE','ROK','OPERATIONAL','MED',
    'K2C 피카티니레일 추가형. 각종 부착물 장착 가능. 부대 전환 공급 중.',
    {caliber:'5.56×45mm NATO',weight:'2.9kg',capacity:'30발',fireRate:'700~900rpm',firstDeployed:'2018년',manufacturer:'S&T모티브'},
    ['K2C1','피카티니','소총','특수부대'],['S&T모티브','특전사'],undefined,undefined,90),

  w('rok-sa003','K11 복합형 소총','K11 Air Burst Weapon System','RIFLE','ROK','OPERATIONAL','MED',
    '5.56mm 소총+20mm 공중폭발탄 이중 발사기. 세계 최초 양산형 OCSW. 레이저거리측정기·디지털 조준.',
    {caliber:'5.56mm+20mm 공중폭발탄',weight:'6.1kg',capacity:'30+6발',range:'500m(공중폭발)',firstDeployed:'2010년',manufacturer:'S&T모티브·삼성탈레스'},
    ['K11','복합소총','공중폭발탄','20mm','첨단보병'],['S&T모티브','육군'],undefined,'https://en.wikipedia.org/wiki/K11_OCSW',90),

  w('rok-sa004','K14 저격소총','K14 Sniper Rifle','SNIPER','ROK','OPERATIONAL','LOW',
    '한국 독자 개발 7.62mm 저격소총. 볼트액션. 야간조준경·소음기 장착 가능. 특전사·저격수 운용.',
    {caliber:'7.62×51mm NATO',weight:'5.5kg',length:'1,130mm',range:'800m(유효)',capacity:'10발',firstDeployed:'2014년',manufacturer:'S&T모티브'},
    ['K14','저격소총','7.62mm','특전사'],['S&T모티브','특전사'],undefined,'https://en.wikipedia.org/wiki/K14_(sniper_rifle)',88),

  w('rok-sa005','K7 소음 기관단총','K7 Silenced SMG','SMG','ROK','OPERATIONAL','LOW',
    '한국 독자 개발 소음 기관단총. 아음속 탄 전용. 특수전·경호 임무. 피카티니레일.',
    {caliber:'9×19mm Parabellum',weight:'3kg',length:'720mm',fireRate:'1,100rpm',capacity:'30발',firstDeployed:'2003년',manufacturer:'S&T모티브'},
    ['K7','소음기관단총','SMG','특수전','소음'],['S&T모티브','특전사'],undefined,'https://en.wikipedia.org/wiki/K7_(submachine_gun)',88),

  w('rok-sa006','K1A 기관단총','K1A Submachine Carbine','SMG','ROK','OPERATIONAL','MED',
    '5.56mm 기관단총형 카빈. 접철식 신축 개머리판. 기갑·공수부대 보조화기.',
    {caliber:'5.56×45mm NATO',weight:'2.87kg',length:'838mm(전개)',fireRate:'700~900rpm',capacity:'30발',firstDeployed:'1982년',manufacturer:'대우정밀(현 S&T모티브)'},
    ['K1A','기관단총','카빈','기갑','공수'],['S&T모티브','육군'],undefined,'https://en.wikipedia.org/wiki/K1_(submachine_gun)',88),

  w('rok-sa007','K3 경기관총','K3 Light Machine Gun','MG','ROK','OPERATIONAL','MED',
    '5.56mm 분대 지원 경기관총. M249 SAW 유사 설계. 접철식 양각대·드럼/박스 탄창.',
    {caliber:'5.56×45mm NATO',weight:'6.85kg',fireRate:'700~900rpm',range:'1,000m',capacity:'200발 드럼 또는 30발 탄창',firstDeployed:'1990년',manufacturer:'S&T모티브'},
    ['K3','경기관총','LMG','분대지원','5.56mm'],['S&T모티브','육군'],undefined,'https://en.wikipedia.org/wiki/K3_(light_machine_gun)',88),

  w('rok-sa008','K6 중기관총','K6 Heavy Machine Gun','MG','ROK','OPERATIONAL','MED',
    '한국 국산 12.7mm 중기관총. M2HB 대체. 항공기·경장갑 차량 대응. 수냉식 배럴 교환.',
    {caliber:'12.7×99mm NATO',weight:'38kg',fireRate:'450~600rpm',range:'2,000m(유효)',firstDeployed:'2000년',manufacturer:'S&T모티브'},
    ['K6','중기관총','12.7mm','HMG','국산'],['S&T모티브','육군'],undefined,undefined,88),

  w('rok-sa009','K4 고속유탄기관총','K4 Automatic Grenade Launcher','LAUNCHER','ROK','OPERATIONAL','MED',
    '40mm 자동유탄기관총. 장갑차·정위치 배치. M19 대체. 1,500m 유효사거리.',
    {caliber:'40mm×53mm',weight:'35kg',fireRate:'350rpm',range:'1,500m',firstDeployed:'1998년',manufacturer:'S&T모티브'},
    ['K4','유탄기관총','40mm','장갑차탑재'],['S&T모티브','육군'],undefined,undefined,88),

  w('rok-sa010','K201 유탄발사기','K201 Under-Barrel Grenade Launcher','LAUNCHER','ROK','OPERATIONAL','LOW',
    'K2 소총 하부 장착형 40mm 유탄발사기. 단발 볼트액션. 최대 400m.',
    {caliber:'40×46mm SR',weight:'1.36kg',range:'400m(최대)',firstDeployed:'1990년대',manufacturer:'S&T모티브'},
    ['K201','유탄발사기','40mm','K2부착'],['S&T모티브','육군'],undefined,undefined,88),

  // ── UAV/무인기 ───────────────────────────────────────────────────────────
  w('rok-u001','송골매 (RQ-101)','RQ-101 Songolmae UAV','UAV','ROK','OPERATIONAL','LOW',
    '대대급 무인정찰기. 이중추진 터보프롭. 전방감시·표적지시. 2000년대 전력화.',
    {speed:'185km/h',ceiling:'4,500m',armament:'없음(전기광학/IR)',firstDeployed:'2002년',manufacturer:'대한항공'},
    ['송골매','RQ-101','무인정찰','대대급'],['대한항공','육군'],undefined,undefined,85),

  w('rok-u002','KUS-9 전술무인기','KUS-9 Tactical UAV','UAV','ROK','OPERATIONAL','LOW',
    '여단·사단급 전술무인기. EO/IR·합성개구레이더(SAR) 센서. 48시간 장기체공 가능.',
    {speed:'130km/h',ceiling:'4,600m',armament:'없음(감시)',firstDeployed:'2015년',manufacturer:'한국항공우주산업(KAI)'},
    ['KUS-9','전술UAV','장기체공','SAR'],['KAI','육군'],undefined,undefined,83),

  w('rok-u003','KUS-FC 전술공격드론','KUS-FC Tactical Attack UAV','UAV','ROK','DEVELOPMENT','MED',
    '천무 발사대 발사 전술공격드론. 미니 순항미사일 개념. 50km+ 표적타격. 군집비행 연구.',
    {range:'100km+',payload:'폭발탄두',firstDeployed:'2026년(예상)',manufacturer:'KAI·LIG넥스원'},
    ['KUS-FC','공격드론','천무','군집','UAV'],['KAI','방위사업청'],undefined,undefined,72),

  w('rok-u004','해상작전헬기 AW-159 와일드캣','AW-159 Wildcat (ROKS)','HELICOPTER','ROK','OPERATIONAL','MED',
    '해군 함정 탑재 해상작전헬기. 8기 도입. 청상어 어뢰·시스쿠아 대함미사일 탑재.',
    {speed:'291km/h',range:'777km',crew:'2+1명',armament:'청상어 경어뢰·Sea Skua 대함미사일',firstDeployed:'2016년',manufacturer:'레오나르도(AW)',quantity:'8기'},
    ['와일드캣','AW-159','해상작전헬기','청상어'],['레오나르도','해군'],undefined,'https://en.wikipedia.org/wiki/AgustaWestland_AW159_Wildcat',92),

  w('rok-u005','링스 Mk.99 해상작전헬기','Lynx Mk.99 Naval Helicopter','HELICOPTER','ROK','OPERATIONAL','MED',
    '영국 웨스트랜드 링스 해군형. 12기 운용. 청상어·MK-46 어뢰 탑재.',
    {speed:'282km/h',range:'590km',crew:'2~3명',armament:'MK-46 어뢰·청상어',firstDeployed:'1991년',manufacturer:'레오나르도(WHL)',quantity:'12기'},
    ['링스','Mk.99','해상작전헬기','구축함탑재'],['레오나르도','해군'],undefined,undefined,88),

  // ── 기타 주요 전력 ───────────────────────────────────────────────────────
  w('rok-etc001','타우러스 KEPD 350 공대지 순항미사일','Taurus KEPD 350 ALCM','CRUISE','ROK','OPERATIONAL','HIGH',
    '독일 MBDA 타우러스 KEPD 350. F-15K 탑재. 사거리 500km. 지하벙커 관통 2단계 탄두.',
    {range:'500km',payload:'MEPHISTO 2단계 관통탄두',guidance:'TERCOM+GPS+IIR',speed:'마하 0.95',firstDeployed:'2016년',manufacturer:'MBDA·독일',quantity:'다수(도입)'},
    ['타우러스','KEPD350','공대지','벙커관통','F-15K'],['MBDA','공군'],undefined,'https://en.wikipedia.org/wiki/Taurus_KEPD_350',95),

  w('rok-etc002','SLAM-ER 공대지 미사일','AGM-84H SLAM-ER','ASM','ROK','OPERATIONAL','HIGH',
    '보잉 SLAM-ER. F-15K·KF-16 탑재. GPS+IIR 유도. 사거리 270km 정밀지상타격.',
    {range:'270km',payload:'360kg WDU-40/B',guidance:'GPS+IIR',firstDeployed:'2007년',manufacturer:'보잉',quantity:'다수'},
    ['SLAM-ER','AGM-84H','공대지','F-15K','정밀타격'],['보잉','공군'],undefined,'https://en.wikipedia.org/wiki/AGM-84_Harpoon',93),

  w('rok-etc003','스파이스-2000 정밀폭탄','SPICE-2000 Precision Bomb','ASM','ROK','OPERATIONAL','HIGH',
    '이스라엘 Rafael SPICE-2000. F-15K 탑재. 2,000lb 정밀유도폭탄. 영상대조+GPS 유도.',
    {payload:'900kg',range:'100km',guidance:'GPS+IIR 영상대조',firstDeployed:'2016년',manufacturer:'Rafael(이스라엘)'},
    ['SPICE-2000','정밀폭탄','이스라엘','F-15K'],['Rafael','공군'],undefined,undefined,90),

  w('rok-etc004','미티어 공대공미사일','Meteor BVRAAM','AAM','ROK','OPERATIONAL','HIGH',
    '유럽 MBDA 미티어 초장거리 공대공미사일. KF-21 탑재 예정. 최대 200km 사거리. 무동력 No-Escape Zone 최대.',
    {range:'200km+',speed:'마하 4+',guidance:'능동레이더(AESA)',firstDeployed:'KF-21 전력화 시',manufacturer:'MBDA'},
    ['미티어','공대공','BVRAAM','KF-21','장거리'],['MBDA','공군'],undefined,'https://en.wikipedia.org/wiki/Meteor_(missile)',92),

  w('rok-etc005','K917 교량전차','K917 Armored Vehicle Launched Bridge','GROUND','ROK','OPERATIONAL','LOW',
    'K1 전차 차체 기반 자주 교량전차. 30m 단주교 또는 조립교 부설 가능. 도하작전 지원.',
    {weight:'54t',crew:'2명',speed:'60km/h',firstDeployed:'1990년대',manufacturer:'현대로템',armament:'없음'},
    ['K917','교량전차','AVLB','도하','공병'],['현대로템','육군'],undefined,undefined,85),

  w('rok-etc006','K600 공병전투차','K600 Combat Engineering Vehicle','GROUND','ROK','OPERATIONAL','LOW',
    'K1 차체 기반 공병전투차. 지뢰제거롤러·불도저 블레이드 탑재. 장애물 개척.',
    {weight:'54t',crew:'4명',speed:'60km/h',firstDeployed:'2000년대',manufacturer:'현대로템',armament:'12.7mm'},
    ['K600','공병전투차','지뢰제거','현대로템'],['현대로템','육군'],undefined,undefined,83),

  w('rok-etc007','비호-II 소형 무인전투차','Biho-II Unmanned Combat Vehicle','GROUND','ROK','DEVELOPMENT','MED',
    '소형 무인지상차량(UGV). 30mm 기관포·대전차미사일 탑재. 전방 감시·타격 임무. 2027년 시험.',
    {weight:'4t(예상)',armament:'30mm·현궁 ATGM',firstDeployed:'2028년(예상)',manufacturer:'한화에어로스페이스'},
    ['무인전투차','UGV','자율','드론','국산'],['한화에어로스페이스','방위사업청'],undefined,undefined,65),

  w('rok-etc008','K-드론봄버','K-Drone Bomber Kamikaze UAV','UAV','ROK','DEVELOPMENT','MED',
    '한국형 카미카제 자폭드론. 저비용 고정밀 공격. 군집비행 적용 연구. 북한 장사정포 대응.',
    {range:'100km',payload:'파편+폭발탄',firstDeployed:'2026년(예상)',manufacturer:'한화에어로스페이스·LIG넥스원'},
    ['카미카제','자폭드론','UAV','군집','국산'],['한화에어로스페이스','방위사업청'],undefined,undefined,65),

  w('rok-etc009','해룡 수중무인기','Haeryong UUV','NAVAL','ROK','DEVELOPMENT','LOW',
    '해군 무인수중운반체(UUV). 기뢰 제거·수중 감시. 잠수함 발사 가능 설계.',
    {range:'100km(배터리)',firstDeployed:'2026년(예상)',manufacturer:'LIG넥스원·한화오션'},
    ['해룡','UUV','무인잠수정','기뢰제거'],['LIG넥스원','해군'],undefined,undefined,70),

  w('rok-etc010','425사업 정찰위성','425 Project SAR/EO Reconnaissance Satellite','SATELLITE','ROK','OPERATIONAL','LOW',
    '한국 군사정찰위성. SAR 1기+EO 4기(총5기). 2023~2025년 발사. 한반도 90분 주기 감시.',
    {altitude:'500km(LEO)',firstDeployed:'2023년(1호기)',manufacturer:'KAI·KARI·에어버스DS',quantity:'5기(계획)'},
    ['425사업','군사위성','SAR','정찰위성','한반도감시'],['KAI','국방부'],undefined,undefined,88),

  w('rok-etc011','천리안-2B 해양위성 (군 활용)','GEO-KOMPSAT-2B (Military Use)','SATELLITE','ROK','OPERATIONAL','LOW',
    '정지궤도 해양관측위성. 군 해양·기상 정보 활용. 북한 해상 활동 감시 보조.',
    {altitude:'36,000km(GEO)',firstDeployed:'2020년',manufacturer:'KAI·KARI'},
    ['천리안','위성','해양관측','군활용'],['KARI','기상청','해군'],undefined,undefined,80),

  w('rok-etc012','K-방공 레이더 (TPS-830K)','TPS-830K 3D Air Search Radar','GROUND','ROK','OPERATIONAL','LOW',
    '국산 3D 방공 탐색레이더. 이동형. 스텔스 탐지 능력. 산악 통합방공망 구성.',
    {range:'450km',altitude:'30km(탐지)',firstDeployed:'2010년대',manufacturer:'한화시스템'},
    ['TPS-830K','방공레이더','3D','국산','스텔스탐지'],['한화시스템','공군'],undefined,undefined,85),

  w('rok-etc013','광개토대왕함 (DDH-971)','ROKS Gwanggaeto the Great DDH-971','NAVAL','ROK','OPERATIONAL','MED',
    '광개토대왕급(KDX-I) 1번함. 한국 최초 이지스급 구축함 선행. 미국제 RGM-84 하푼·SM-1 탑재.',
    {displacement:'3,900t',armament:'127mm·SM-1·하푼·청상어·CIWS',crew:'170명',speed:'30노트',firstDeployed:'1998년',manufacturer:'현대중공업'},
    ['광개토대왕','KDX-I','구축함','SM-1'],['현대중공업','해군'],'https://upload.wikimedia.org/wikipedia/commons/a/a6/2009%EB%85%845%EC%9B%9415%EC%9D%BC_%ED%95%B4%EA%B5%B0_1%ED%95%A8%EB%8C%80%ED%9B%88%EB%A0%A8_%287193824738%29.jpg','https://en.wikipedia.org/wiki/Gwanggaeto_the_Great-class_destroyer',90),

  w('rok-etc014','을지문덕함 (DDH-972)','ROKS Eulji Mundeok DDH-972','NAVAL','ROK','OPERATIONAL','MED',
    '광개토대왕급 2번함.',
    {displacement:'3,900t',armament:'127mm·SM-1·하푼·청상어',crew:'170명',firstDeployed:'1999년',manufacturer:'대우조선해양'},
    ['을지문덕','DDH-972','KDX-I'],['대우조선해양','해군'],'https://upload.wikimedia.org/wikipedia/commons/a/a6/2009%EB%85%845%EC%9B%9415%EC%9D%BC_%ED%95%B4%EA%B5%B0_1%ED%95%A8%EB%8C%80%ED%9B%88%EB%A0%A8_%287193824738%29.jpg','https://en.wikipedia.org/wiki/Gwanggaeto_the_Great-class_destroyer',90),

  w('rok-etc015','양만춘함 (DDH-973)','ROKS Yang Man-chun DDH-973','NAVAL','ROK','OPERATIONAL','MED',
    '광개토대왕급 3번함.',
    {displacement:'3,900t',armament:'127mm·SM-1·하푼·청상어',crew:'170명',firstDeployed:'2000년',manufacturer:'현대중공업'},
    ['양만춘','DDH-973','KDX-I'],['현대중공업','해군'],'https://upload.wikimedia.org/wikipedia/commons/a/a6/2009%EB%85%845%EC%9B%9415%EC%9D%BC_%ED%95%B4%EA%B5%B0_1%ED%95%A8%EB%8C%80%ED%9B%88%EB%A0%A8_%287193824738%29.jpg','https://en.wikipedia.org/wiki/Gwanggaeto_the_Great-class_destroyer',90),

  w('rok-etc016','K방산 수출 천무 폴란드형','K239 Chunmoo Export (Poland)','MLRS','ROK','OPERATIONAL','HIGH',
    '폴란드 수출형 천무. 288대 계약(2022년). 현지 면허생산 포함. NATO 탄약 호환.',
    {armament:'NATO 표준 239mm 로켓+ATACMS 호환',range:'80km~300km',firstDeployed:'2023년(폴란드)',manufacturer:'한화에어로스페이스'},
    ['천무수출','폴란드','K방산','288대'],['한화에어로스페이스','폴란드군'],undefined,undefined,97),

  w('rok-etc017','K9A1 수출형 (폴란드 크랩2)','K9A1 Export (Poland Krab II)','ARTILLERY','ROK','OPERATIONAL','MED',
    '폴란드 수출형 K9A1. 현지 생산. 648문 계약. 우크라이나 지원 배경 수요 급증.',
    {weight:'47t',armament:'155mm/52구경장',firstDeployed:'2022년(폴란드)',manufacturer:'한화에어로스페이스·HSW(폴란드)'},
    ['K9','폴란드수출','크랩II','648문'],['한화에어로스페이스','폴란드군'],undefined,undefined,97),

  w('rok-etc018','천궁-II 수출형 (UAE)','M-SAM2 Export (UAE)','SAM','ROK','OPERATIONAL','HIGH',
    'UAE 수출 천궁-II. 35억 달러 규모 최대 방산 수출 계약(2022년). UAE 방공망 핵심 구성.',
    {range:'40km',altitude:'20km',firstDeployed:'2024년(UAE)',manufacturer:'LIG넥스원'},
    ['천궁II','UAE수출','35억달러','방공','최대수출'],['LIG넥스원','UAE공군'],undefined,undefined,97),

  w('rok-etc019','FA-50PL 수출형 (폴란드)','FA-50PL Export (Poland)','AIRCRAFT','ROK','OPERATIONAL','LOW',
    'FA-50 폴란드 수출형. 48기 계약. AESA·미티어 통합. 2023년 인도 개시.',
    {speed:'마하 1.5',armament:'미티어·AIM-9X·JDAM·AGM-65',firstDeployed:'2023년(폴란드)',manufacturer:'KAI',quantity:'48기'},
    ['FA-50PL','폴란드수출','48기','방산'],['KAI','폴란드공군'],'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/FA-50_ROKAF.jpg/320px-FA-50_ROKAF.jpg','https://en.wikipedia.org/wiki/KAI_T-50_Golden_Eagle',97),

  w('rok-etc020','K2PL 수출형 전차 (폴란드)','K2PL Export (Poland)','GROUND','ROK','DEVELOPMENT','MED',
    '폴란드 수출형 K2 전차. 820대 면허생산 계약. 폴란드 ERA·능동방호 현지사양. 2026년 양산 예정.',
    {weight:'58t(예상)',armament:'120mm 활강포·APS',firstDeployed:'2026년(예상)',manufacturer:'현대로템·폴란드 현지'},
    ['K2PL','폴란드수출','820대','전차수출'],['현대로템','폴란드군'],undefined,undefined,85),

]
