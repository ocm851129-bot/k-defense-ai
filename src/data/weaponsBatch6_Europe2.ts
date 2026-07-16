import type { WeaponSystem } from './weapons'
const w = (id:string,name:string,nameEng:string,cat:WeaponSystem['category'],origin:WeaponSystem['origin'],status:WeaponSystem['status'],threat:WeaponSystem['threatRating'],desc:string,specs:WeaponSystem['specs'],tags:string[],sources:string[],img?:string,wiki?:string,conf=88): WeaponSystem=>({id,name,nameEng,category:cat,origin,status,threatRating:threat,description:desc,detail:`## ${nameEng}\n\n${desc}\n\n### 주요 제원\n${Object.entries(specs).filter(([,v])=>v).map(([k,v])=>`- ${k}: ${v}`).join('\n')}`,specs,confidence:conf,lastUpdated:'2026-07-01',relatedIntelIds:[],tags,sources,imageUrl:img,wikiUrl:wiki})

export const WEAPONS_BATCH6_EUROPE2: WeaponSystem[] = [

  // ── 영국 ─────────────────────────────────────────────────────────────────
  w('uk2-af001','타이푼 F3 (유로파이터)','Eurofighter Typhoon FGR4 (RAF)','AIRCRAFT','UK','OPERATIONAL','LOW',
    '영국 공군 유로파이터. 미티어·AIM-132 ASRAAM·스톰 섀도우. 최신 E-스캔 CAPTOR-E 레이더 업그레이드.',
    {speed:'마하 2.0',range:'2,900km',crew:'1~2명',armament:'미티어·AIM-132·스톰섀도우·브림스톤',firstDeployed:'2007년',manufacturer:'BAE Systems',quantity:'160기'},
    ['타이푼','유로파이터','FGR4','미티어','스톰섀도우'],['BAE Systems','RAF'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/RAF_Eurofighter_EF-2000_Typhoon_F2_Lofting-1.jpg/330px-RAF_Eurofighter_EF-2000_Typhoon_F2_Lofting-1.jpg','https://en.wikipedia.org/wiki/Eurofighter_Typhoon',95),

  w('uk2-af002','F-35B 라이트닝 II (영국)','F-35B Lightning II (RAF/RN)','AIRCRAFT','UK','OPERATIONAL','LOW',
    '영국 공군·해군 공동 운용. 퀸 엘리자베스급 항모 탑재. 48기 도입 완료.',
    {speed:'마하 1.6',range:'1,670km',crew:'1명',armament:'AIM-132·AIM-120·스톰섀도우·브림스톤·GBU-12',firstDeployed:'2018년',manufacturer:'록히드마틴',quantity:'48기'},
    ['F-35B','영국','퀸엘리자베스','항모','스텔스'],['록히드마틴','RAF','RN'],undefined,undefined,97),

  w('uk2-m001','스톰 섀도우 / SCALP-EG','Storm Shadow/SCALP-EG ALCM','CRUISE','UK','OPERATIONAL','HIGH',
    'MBDA 장거리 공중발사 순항미사일. 사거리 560km. BROACH 탄두(지하 관통). 우크라이나 공급.',
    {range:'560km',speed:'마하 0.8',payload:'BROACH 관통·파편 탄두',guidance:'INS+TERCOM+IIR',firstDeployed:'2003년',manufacturer:'MBDA'},
    ['스톰섀도우','SCALP-EG','ALCM','우크라이나','관통탄두'],['MBDA','RAF','우크라이나'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/RAF_Museum%2C_Colindale%2C_London_-_DSC06025.JPG/330px-RAF_Museum%2C_Colindale%2C_London_-_DSC06025.JPG','https://en.wikipedia.org/wiki/Storm_Shadow',95),

  w('uk2-m002','브림스톤 2 대전차미사일','Brimstone 2 Anti-Armor Missile','ASM','UK','OPERATIONAL','HIGH',
    'Tornardo/Typhoon/Reaper 탑재. 밀리미터파 레이더+IR 이중 탐색기. 이동표적 자동 추적.',
    {range:'60km(공중)',payload:'탠덤 HEAT·EFP',guidance:'mmW 레이더+IR',firstDeployed:'2016년',manufacturer:'MBDA'},
    ['브림스톤2','mmW','대전차','이동표적','자동추적'],['MBDA','RAF'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Missile_MBDA_Brimstone.jpg/330px-Missile_MBDA_Brimstone.jpg','https://en.wikipedia.org/wiki/Brimstone_(missile)',93),

  w('uk2-m003','미티어 (영국)','Meteor BVRAAM (RAF)','AAM','UK','OPERATIONAL','LOW',
    'MBDA 미티어 영국 공군 운용. 마하 4+. 200km+. No-Escape Zone 최대. Typhoon·F-35 탑재.',
    {range:'200km+',speed:'마하 4+',guidance:'INS+데이터링크+능동레이더',firstDeployed:'2016년',manufacturer:'MBDA'},
    ['미티어','영국','Typhoon','F-35','BVRAAM'],['MBDA','RAF'],
    undefined,'https://en.wikipedia.org/wiki/Meteor_(missile)',97),

  w('uk2-n001','퀸 엘리자베스함 (R08)','HMS Queen Elizabeth R08 Aircraft Carrier','NAVAL','UK','OPERATIONAL','LOW',
    '영국 최대 항공모함. 65,000t. F-35B 36기 탑재. 팰렁크스·팔스 30mm·미사일 방어. 2017년 취역.',
    {displacement:'65,000t',armament:'팰렁크스 CIWS·팔스 30mm·F-35B 36기',crew:'1,600명',speed:'25노트',firstDeployed:'2017년',manufacturer:'BAE Systems'},
    ['퀸엘리자베스','R08','영국항모','F-35B','65000t'],['영국해군'],
    undefined,'https://en.wikipedia.org/wiki/HMS_Queen_Elizabeth_(R08)',97),

  w('uk2-n002','프린스 오브 웨일스함 (R09)','HMS Prince of Wales R09','NAVAL','UK','OPERATIONAL','LOW',
    '퀸 엘리자베스급 2번함. 자매함 동급 성능. 2019년 취역.',
    {displacement:'65,000t',armament:'팰렁크스·팔스·F-35B 36기',crew:'1,600명',speed:'25노트',firstDeployed:'2019년',manufacturer:'BAE Systems'},
    ['프린스오브웨일스','R09','영국항모'],['영국해군'],
    undefined,'https://en.wikipedia.org/wiki/HMS_Prince_of_Wales_(R09)',95),

  w('uk2-n003','데어링급 구축함 (Type 45)','Type 45 Destroyer (Daring-class)','NAVAL','UK','OPERATIONAL','LOW',
    '영국 방공 구축함. SAMPSON AESA 레이더·Aster 15/30 방공. 6척 운용.',
    {displacement:'7,350t',armament:'Aster 15/30 VLS 48셀·114mm·팰렁크스',crew:'191명',speed:'29노트',firstDeployed:'2009년',manufacturer:'BAE Systems',quantity:'6척'},
    ['Type45','Daring급','구축함','Aster30','SAMPSON'],['BAE Systems','영국해군'],
    undefined,'https://en.wikipedia.org/wiki/Type_45_destroyer',95),

  w('uk2-n004','아스튜트급 핵잠수함','Astute-class Nuclear Submarine','SUBMARINE','UK','OPERATIONAL','HIGH',
    '7,400t 핵추진 공격잠수함. 스피어피시 중어뢰·토마호크 SLCM. 7척 건조 중.',
    {displacement:'7,400t',armament:'스피어피시 어뢰·토마호크 SLCM·하푼',crew:'98명',speed:'30노트',firstDeployed:'2010년',manufacturer:'BAE Systems',quantity:'4척(+3건조)'},
    ['아스튜트급','핵잠수함','토마호크','영국해군'],['BAE Systems','영국해군'],
    undefined,'https://en.wikipedia.org/wiki/Astute-class_submarine',93),

  w('uk2-t001','챌린저 3 전차','Challenger 3 MBT','GROUND','UK','DEVELOPMENT','LOW',
    '챌린저 2 성능개량형. 신형 포탑·120mm 활강포(L55A1)·AESA 열상·APS. 148대 개량.',
    {weight:'66t',armament:'120mm L55A1 활강포·7.62mm×2',crew:'4명',speed:'59km/h',firstDeployed:'2025년(예상)',manufacturer:'레오나르도·Rheinmetall',quantity:'148대(개량)'},
    ['챌린저3','MBT','120mm','APS','영국전차'],['BAE Systems','영국육군'],
    undefined,'https://en.wikipedia.org/wiki/Challenger_3',80),

  // ── 프랑스 ───────────────────────────────────────────────────────────────
  w('fr2-af001','라팔 F4 전투기','Rafale F4 Multirole Fighter','AIRCRAFT','FRANCE','OPERATIONAL','LOW',
    '프랑스 다목적 전투기 최신형. AESA RBE2 레이더·미티어·MICA-NG. 핵탑재(ASMP-A). 100기+ 해외 수주.',
    {speed:'마하 1.8',range:'3,700km',crew:'1~2명',armament:'미티어·MICA-NG·SCALP-EG·ASMP-A 핵·30mm GIAT',firstDeployed:'2001년',manufacturer:'다소항공',quantity:'220기+(프랑스)+수출'},
    ['라팔','F4','다소','미티어','ASMP-A핵'],['다소','프랑스공군'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Rafale_F3-R_2018.jpg/320px-Rafale_F3-R_2018.jpg',
    'https://en.wikipedia.org/wiki/Dassault_Rafale',97),

  w('fr2-af002','넥스터 CAESAR 155mm 자주포','CAESAR 155mm Wheeled SPH','ARTILLERY','FRANCE','OPERATIONAL','LOW',
    'CAMIONHmated 6×6 자주포. 자주 이동·자동발사. 사거리 42km. 우크라이나·인도네시아·사우디 수출.',
    {weight:'18.5t',armament:'155mm/52구경장 TR-F1',crew:'5명',range:'42km',speed:'100km/h',firstDeployed:'2003년',manufacturer:'넥스터'},
    ['CAESAR','155mm','차륜형자주포','우크라이나수출','넥스터'],['넥스터','프랑스군'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/French_Caesar_self-propelled_howitzer_in_Iraq.jpg/330px-French_Caesar_self-propelled_howitzer_in_Iraq.jpg','https://en.wikipedia.org/wiki/CAESAR_self-propelled_howitzer',95),

  w('fr2-m001','ASMP-A 핵순항미사일','ASMP-A Nuclear Air-to-Surface Missile','CRUISE','FRANCE','OPERATIONAL','CRITICAL',
    '프랑스 공중발사 핵순항미사일. 라팔·미라쥬 2000N 탑재. 300kt 핵탄두. 사거리 500km+.',
    {range:'500km+',speed:'마하 3',payload:'300kt 핵탄두',firstDeployed:'2009년',manufacturer:'MBDA'},
    ['ASMP-A','핵미사일','프랑스','300kt','라팔'],['MBDA','프랑스군'],
    undefined,'https://en.wikipedia.org/wiki/ASMP_(missile)',90),

  w('fr2-m002','MBDA 미티어 (프랑스)','Meteor BVRAAM (France)','AAM','FRANCE','OPERATIONAL','LOW',
    'MBDA 미티어 프랑스 운용. 라팔 F3R+ 탑재. 200km+. 유럽 최강 BVRAAM.',
    {range:'200km+',speed:'마하 4+',firstDeployed:'2019년',manufacturer:'MBDA'},
    ['미티어','프랑스','라팔','F3R','BVRAAM'],['MBDA','프랑스공군'],
    undefined,'https://en.wikipedia.org/wiki/Meteor_(missile)',95),

  w('fr2-n001','드골함 핵추진 항모','FS Charles de Gaulle Aircraft Carrier','NAVAL','FRANCE','OPERATIONAL','HIGH',
    '프랑스 핵추진 항공모함. 42,000t. 라팔M·호크아이 AEW 운용. 유럽 유일 핵항모.',
    {displacement:'42,000t',armament:'라팔M 40기·호크아이·Aster 15·20mm·CIWS',crew:'1,950명',speed:'27노트',firstDeployed:'2001년',manufacturer:'DCNS(나발그룹)'},
    ['드골','핵항모','프랑스','라팔M','유럽유일'],['나발그룹','프랑스해군'],
    undefined,'https://en.wikipedia.org/wiki/French_aircraft_carrier_Charles_de_Gaulle',97),

  w('fr2-n002','아킬랭급 핵잠수함 (SNA)','Suffren-class Nuclear Submarine (Barracuda)','SUBMARINE','FRANCE','OPERATIONAL','HIGH',
    '프랑스 신형 핵추진 공격잠수함. 바라쿠다급. 5,300t. SCALP Naval·F21 어뢰. 6척 건조.',
    {displacement:'5,300t',armament:'SCALP Naval·F21 어뢰·SM39 엑조세',crew:'65명',speed:'25노트',firstDeployed:'2022년',manufacturer:'나발그룹',quantity:'2척(+4건조)'},
    ['쉬프랑급','바라쿠다','핵잠수함','SCALP Naval','프랑스'],['나발그룹','프랑스해군'],
    undefined,'https://en.wikipedia.org/wiki/Suffren-class_submarine',90),

  w('fr2-t001','르클레르 XLR 전차','Leclerc XLR MBT','GROUND','FRANCE','DEVELOPMENT','LOW',
    '르클레르 성능개량형. APS 준비·디지털화·UV-IR 센서. 200대 개량. 2025년+.',
    {weight:'56t',armament:'120mm CN120-26 활강포·12.7mm·7.62mm',crew:'3명',speed:'72km/h',firstDeployed:'2025년(예상)',manufacturer:'넥스터'},
    ['르클레르XLR','프랑스전차','120mm','APS준비'],['넥스터','프랑스군'],
    undefined,'https://en.wikipedia.org/wiki/Leclerc_tank',82),

  w('fr2-m003','엑조세 AM39 공대함','Exocet AM39 Anti-Ship Missile','ASM','FRANCE','OPERATIONAL','HIGH',
    '유명 공대함 순항미사일. 포클랜드 전쟁 활약. 라팔·슈퍼에탕다르 탑재. 세계 최다 수출 대함미사일.',
    {range:'70km',speed:'마하 0.93',payload:'165kg AP',guidance:'INS+능동레이더',firstDeployed:'1978년',manufacturer:'MBDA'},
    ['엑조세','AM39','대함미사일','포클랜드','수출왕'],['MBDA','프랑스해군'],
    undefined,'https://en.wikipedia.org/wiki/Exocet',95),

  // ── 독일 ──────────────────────────────────────────────────────────────────
  w('de2-t001','레오파르트 2A7+ 전차','Leopard 2A7+ MBT','GROUND','GERMANY','OPERATIONAL','LOW',
    '독일·NATO 최신 주력전차. 능동방호·FLW200 원격무장 옵션. 우크라이나 공급(2A6).',
    {weight:'67t',armament:'120mm/L55A1·MG3 7.62mm·FLW200',crew:'4명',speed:'72km/h',firstDeployed:'2014년',manufacturer:'Rheinmetall KMW',quantity:'NATO 운용 3,500+대'},
    ['레오파르트2A7+','독일전차','120mm','APS','우크라이나'],['Rheinmetall','KMW','독일군'],
    undefined,'https://en.wikipedia.org/wiki/Leopard_2',97),

  w('de2-t002','푸마 IFV','Puma IFV Advanced Infantry Fighting Vehicle','GROUND','GERMANY','OPERATIONAL','LOW',
    '독일 3세대 IFV. 30mm MK30-2/ABM 공중폭발탄·스파이크LR2. 전면 APS 준비. 400대 도입.',
    {weight:'43t',armament:'30mm MK30-2/ABM·스파이크LR2·7.62mm',crew:'3+6명',speed:'70km/h',firstDeployed:'2015년',manufacturer:'Rheinmetall·KMW',quantity:'350대+'},
    ['푸마','독일IFV','30mm','공중폭발탄','스파이크'],['Rheinmetall','독일군'],
    undefined,'https://en.wikipedia.org/wiki/Puma_(IFV)',90),

  w('de2-af001','유로파이터 타이푼 (독일)','Eurofighter Typhoon (Luftwaffe)','AIRCRAFT','GERMANY','OPERATIONAL','LOW',
    '독일 공군 유로파이터. 141기 운용. AESA CAPTOR-E 업그레이드. 타우러스 KEPD 350 탑재.',
    {speed:'마하 2.0',range:'2,900km',crew:'1명',armament:'미티어·AIM-9X·타우러스KEPD350·BWS',firstDeployed:'2004년',manufacturer:'Eurofighter GmbH',quantity:'141기'},
    ['타이푼','독일공군','CAPTOR-E','타우러스'],['Eurofighter','독일공군'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/RAF_Eurofighter_EF-2000_Typhoon_F2_Lofting-1.jpg/330px-RAF_Eurofighter_EF-2000_Typhoon_F2_Lofting-1.jpg','https://en.wikipedia.org/wiki/Eurofighter_Typhoon',95),

  w('de2-m001','PzH2000 155mm 자주포','PzH2000 Self-Propelled Howitzer','ARTILLERY','GERMANY','OPERATIONAL','LOW',
    '세계 최고 자주포. 155mm/52구경장·자동 탄약 처리(분당 13발). 사거리 56km. 우크라이나 지원.',
    {weight:'55.3t',armament:'155mm L52 곡사포',crew:'3명',range:'56km(V-LAP)',speed:'60km/h',firstDeployed:'1998년',manufacturer:'Rheinmetall·KMW',quantity:'250+문'},
    ['PzH2000','155mm','자주포','분당13발','우크라이나지원'],['Rheinmetall','독일군'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Lithuanian_PzH_2000_%282%29.jpg/330px-Lithuanian_PzH_2000_%282%29.jpg','https://en.wikipedia.org/wiki/PzH_2000',97),

  w('de2-m002','IRIS-T SLM 방공','IRIS-T SLM Ground-Based Air Defense','SAM','GERMANY','OPERATIONAL','LOW',
    '독일 독자 지상 발사 IRIS-T. 사거리 40km. 우크라이나 지원 핵심 방공무기. 적극 주목.',
    {range:'40km',altitude:'20km',speed:'마하 3',guidance:'IR 탐색기',firstDeployed:'2022년(우크라이나)',manufacturer:'Diehl Defence'},
    ['IRIS-T SLM','방공','우크라이나지원','40km','독일'],['Diehl','독일군'],
    undefined,'https://en.wikipedia.org/wiki/IRIS-T',90),

  w('de2-n001','U-212A 잠수함 (독일)','Type 212A Submarine (Germany)','SUBMARINE','GERMANY','OPERATIONAL','LOW',
    'AIP 연료전지 잠수함. 1,830t. 매우 정숙. 이탈리아·한국(214)과 공동 개발. 독일 6척.',
    {displacement:'1,830t',armament:'533mm 어뢰관 6문·DM2A4 어뢰',crew:'27명',speed:'20노트',firstDeployed:'2005년',manufacturer:'TKMS',quantity:'6척'},
    ['U-212A','AIP','잠수함','연료전지','정숙'],['TKMS','독일해군'],
    undefined,'https://en.wikipedia.org/wiki/Type_212_submarine',93),

  w('de2-t003','Lynx KF41 IFV (독일)','Lynx KF41 IFV','GROUND','GERMANY','OPERATIONAL','LOW',
    'Rheinmetall 신형 IFV. 35mm 또는 50mm 포탑. 헝가리·호주 대규모 수주.',
    {weight:'44t',armament:'35mm MK35·스파이크LR2·7.62mm',crew:'3+8명',speed:'65km/h',firstDeployed:'2025년(헝가리)',manufacturer:'Rheinmetall'},
    ['Lynx KF41','IFV','Rheinmetall','헝가리','수출'],['Rheinmetall'],
    undefined,'https://en.wikipedia.org/wiki/Lynx_KF41',82),

  // ── 이탈리아 ─────────────────────────────────────────────────────────────
  w('it2-af001','유로파이터 타이푼 (이탈리아)','Eurofighter Typhoon (Italy AMI)','AIRCRAFT','NATO','OPERATIONAL','LOW',
    '이탈리아 공군 타이푼. 96기. 미티어·AIM-120C. CAPTOR-E 업그레이드 예정.',
    {speed:'마하 2.0',range:'2,900km',crew:'1명',armament:'미티어·AIM-120C·IRIS-T',firstDeployed:'2004년',manufacturer:'Eurofighter',quantity:'96기'},
    ['타이푼','이탈리아','유로파이터'],['이탈리아공군'],'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/RAF_Eurofighter_EF-2000_Typhoon_F2_Lofting-1.jpg/330px-RAF_Eurofighter_EF-2000_Typhoon_F2_Lofting-1.jpg','https://en.wikipedia.org/wiki/Eurofighter_Typhoon',90),

  w('it2-n001','카보우르 STOVL 항모','ITS Cavour STOVL Aircraft Carrier','NAVAL','NATO','OPERATIONAL','LOW',
    '이탈리아 STOVL 항모. 27,000t. F-35B 탑재 가능(2021년 개조). AV-8B+ 선행 운용.',
    {displacement:'27,000t',armament:'F-35B 20기+·Aster 15·76mm OTO',crew:'830명',speed:'28노트',firstDeployed:'2008년',manufacturer:'핀칸티에리'},
    ['카보우르','이탈리아','STOVL항모','F-35B'],['핀칸티에리','이탈리아해군'],
    undefined,'https://en.wikipedia.org/wiki/Italian_aircraft_carrier_Cavour',90),

  // ── 스웨덴 ───────────────────────────────────────────────────────────────
  w('swe2-af001','그리펜 E (JAS 39E)','JAS 39E Gripen Multirole Fighter','AIRCRAFT','SWEDEN','OPERATIONAL','LOW',
    '스웨덴 사브 그리펜 E형. 미티어 통합. AESA ES-05 레이더. 브라질·스위스·핀란드 수주.',
    {speed:'마하 2.0',range:'3,000km',crew:'1명',armament:'미티어·IRIS-T·사이드윈더·영상유도폭탄',firstDeployed:'2021년',manufacturer:'사브'},
    ['그리펜E','JAS39E','스웨덴','미티어','수출'],['사브','스웨덴공군'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Saab_JAS_39_Gripen_at_Kaivopuisto_Air_Show%2C_June_2017_%28altered%29_copy.jpg/330px-Saab_JAS_39_Gripen_at_Kaivopuisto_Air_Show%2C_June_2017_%28altered%29_copy.jpg','https://en.wikipedia.org/wiki/Saab_JAS_39_Gripen',90),

  w('swe2-m001','RBS-15 대함미사일','RBS-15 Mk3 Anti-Ship Missile','SSM','SWEDEN','OPERATIONAL','LOW',
    '스웨덴 함대함·공대함·지대함 다목적 순항미사일. 사거리 400km. 지상공격 가능.',
    {range:'400km',speed:'마하 0.9',payload:'200kg',guidance:'INS+GPS+IIR',firstDeployed:'2004년(Mk3)',manufacturer:'사브·다이나믹스'},
    ['RBS-15','스웨덴','대함미사일','400km'],['사브','스웨덴해군'],
    undefined,'https://en.wikipedia.org/wiki/RBS-15',88),

  // ── 노르웨이 ─────────────────────────────────────────────────────────────
  w('nor2-m001','NSM (해군타격미사일)','NSM Naval Strike Missile','SSM','NATO','OPERATIONAL','LOW',
    '노르웨이 콩스베르그 대함·지상 순항미사일. 사거리 185km. IR 탐색기. 미 해군 함정 탑재(NSM).',
    {range:'185km',speed:'마하 0.95',payload:'125kg HE',guidance:'INS+GPS+IIR',firstDeployed:'2012년',manufacturer:'콩스베르그'},
    ['NSM','노르웨이','콩스베르그','대함미사일','미해군탑재'],['콩스베르그','노르웨이해군'],
    undefined,'https://en.wikipedia.org/wiki/Naval_Strike_Missile',90),

  w('nor2-m002','JSM (합동타격미사일)','JSM Joint Strike Missile','ASM','NATO','OPERATIONAL','LOW',
    'NSM 기반 F-35 내부 무장창 탑재형. 570km 사거리. 항공기·함정·지상 타격.',
    {range:'570km',speed:'마하 0.95',guidance:'INS+GPS+IIR',firstDeployed:'2023년',manufacturer:'콩스베르그'},
    ['JSM','F-35내부탑재','570km','노르웨이'],['콩스베르그','노르웨이'],
    undefined,'https://en.wikipedia.org/wiki/Joint_Strike_Missile',88),

  // ── 네덜란드 ─────────────────────────────────────────────────────────────
  w('nl2-af001','F-35A (네덜란드)','F-35A Lightning II (Royal Netherlands AF)','AIRCRAFT','NATO','OPERATIONAL','LOW',
    '네덜란드 공군 F-35A. 52기 도입. 이전 F-16 대체. 2023년 완전전력화.',
    {speed:'마하 1.6',range:'2,220km',crew:'1명',armament:'AIM-120D·AIM-9X·GBU-12·JSM',firstDeployed:'2019년',manufacturer:'록히드마틴',quantity:'52기'},
    ['F-35A','네덜란드','스텔스','F-16대체'],['록히드마틴','RNLAF'],undefined,undefined,95),

  // ── 폴란드 ───────────────────────────────────────────────────────────────
  w('pol2-t001','K2PL 전차 (폴란드)','K2PL Main Battle Tank (Poland)','GROUND','NATO','DEVELOPMENT','LOW',
    '한국 K2 기반 폴란드 수출형. 820대 면허생산. 폴란드 현지 ERA·능동방호 적용.',
    {weight:'58t',armament:'120mm 활강포·12.7mm·APS',crew:'3명',firstDeployed:'2026년(예상)',manufacturer:'현대로템·폴란드 현지'},
    ['K2PL','폴란드','820대','면허생산','한국수출'],['현대로템','폴란드군'],undefined,undefined,82),

  w('pol2-a001','K239 천무 (폴란드)','K239 Chunmoo MLRS (Poland Homar-K)','MLRS','NATO','OPERATIONAL','LOW',
    '폴란드 수출 천무(호마르-K). 288대 계약. 2023년 인도 시작. NATO 동부 방어 핵심.',
    {armament:'239mm+131mm 혼용',range:'80km',firstDeployed:'2023년',manufacturer:'한화에어로스페이스'},
    ['호마르K','천무폴란드','288대','NATO동부방어'],['한화에어로스페이스','폴란드군'],undefined,undefined,95),

  // ── NATO/다국 공용 ────────────────────────────────────────────────────────
  w('nato2-m001','Aster 30 Block 1NT 방공','Aster 30 Block 1NT SAM','SAM','NATO','OPERATIONAL','LOW',
    '유럽 MBDA 공동 개발 장거리 방공. 탄도미사일 하강단계 요격. Horizon·FREMM·SAMP/T 운용.',
    {range:'120km',altitude:'30km',speed:'마하 4.5',guidance:'능동레이더',firstDeployed:'2010년',manufacturer:'MBDA'},
    ['Aster30','블록1NT','방공','BMD','NATO'],['MBDA','NATO'],
    undefined,'https://en.wikipedia.org/wiki/Aster_(missile)',90),

  w('nato2-m002','CAMM-ER 차세대 방공','CAMM-ER Common Anti-Air Modular Missile Extended Range','SAM','NATO','OPERATIONAL','LOW',
    'MBDA 차세대 중단거리 방공. 사거리 45km. 콜드런치·다중 플랫폼 호환.',
    {range:'45km',firstDeployed:'2023년',manufacturer:'MBDA'},
    ['CAMM-ER','NATO방공','콜드런치','MBDA'],['MBDA','영국','이탈리아'],
    undefined,'https://en.wikipedia.org/wiki/CAMM',85),

  w('nato2-m003','SPEAR 3 소형 정밀 순항','SPEAR 3 Small Precision Effect at Range Capability','ASM','NATO','DEVELOPMENT','LOW',
    'MBDA SPEAR 3. 내부무장창 탑재용 소형 순항미사일. F-35 8발 탑재. 사거리 180km.',
    {range:'180km',speed:'마하 0.85',guidance:'INS+GPS+IIR',firstDeployed:'2026년(예상)',manufacturer:'MBDA'},
    ['SPEAR3','F-35내부','소형순항','8발탑재'],['MBDA','RAF'],
    undefined,'https://en.wikipedia.org/wiki/SPEAR_(missile)',78),

  w('nato2-t001','에이브람스 M1A2 (폴란드)','M1A2 SEPv3 Abrams (Poland)','GROUND','NATO','OPERATIONAL','LOW',
    '폴란드 도입 에이브람스. 250대 계약. 미 구형 재고 M1A1 먼저 인도, SEPv3 순차 도입.',
    {weight:'66.8t',armament:'120mm M256A1',crew:'4명',firstDeployed:'2023년(폴란드)',manufacturer:'제너럴다이나믹스'},
    ['에이브람스','폴란드','250대','NATO강화'],['제너럴다이나믹스','폴란드군'],undefined,undefined,92),

  w('nato2-m004','AGM-88E AARGM-ER 대레이더미사일','AGM-88E AARGM-ER Anti-Radiation Missile','ASM','NATO','OPERATIONAL','LOW',
    '개량형 HARM. GPS+수동 레이더 유도 복합. 사거리 270km. F/A-18E·F-35 탑재. 우크라이나 F-16 공급.',
    {range:'270km',guidance:'GPS+IIR+수동레이더',firstDeployed:'2022년(AARGM-ER)',manufacturer:'노스롭그루먼'},
    ['AARGM-ER','AGM-88E','대레이더미사일','HARM후속','우크라이나F-16'],['노스롭그루먼','미해군','NATO'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/AGM-88_HARM_on_F-4G.jpg/330px-AGM-88_HARM_on_F-4G.jpg','https://en.wikipedia.org/wiki/AGM-88_HARM',90),

  // ── 스페인 ────────────────────────────────────────────────────────────────
  w('esp2-af001','유로파이터 타이푼 (스페인)','Eurofighter Typhoon (Spanish Air Force)','AIRCRAFT','NATO','OPERATIONAL','LOW',
    '스페인 공군 타이푼. 73기. 미티어·AIM-9X·타우러스 탑재.',
    {speed:'마하 2.0',range:'2,900km',crew:'1명',armament:'미티어·AIM-9X·타우러스',firstDeployed:'2003년',manufacturer:'EADS·CASA',quantity:'73기'},
    ['타이푼','스페인','유로파이터'],['스페인공군'],'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/RAF_Eurofighter_EF-2000_Typhoon_F2_Lofting-1.jpg/330px-RAF_Eurofighter_EF-2000_Typhoon_F2_Lofting-1.jpg','https://en.wikipedia.org/wiki/Eurofighter_Typhoon',90),

  // ── 핀란드 ────────────────────────────────────────────────────────────────
  w('fin2-af001','F-35A (핀란드)','F-35A Lightning II (Finland)','AIRCRAFT','NATO','OPERATIONAL','LOW',
    '핀란드 공군 F-35A. 64기 계약. F/A-18 대체. NATO 가입 후 첫 신규 전투기 도입. 2025년+.',
    {speed:'마하 1.6',range:'2,220km',crew:'1명',armament:'AIM-120D·AIM-9X·SDB II·GBU-31',firstDeployed:'2025년(예상)',manufacturer:'록히드마틴',quantity:'64기'},
    ['F-35A','핀란드','NATO','64기','2025년'],['록히드마틴','핀란드공군'],undefined,undefined,88),

  // ── 그리스 ────────────────────────────────────────────────────────────────
  w('gr2-af001','라팔 F3R (그리스)','Rafale F3R (Hellenic Air Force)','AIRCRAFT','NATO','OPERATIONAL','LOW',
    '그리스 라팔 18기 도입. 2021~2022년 인도. 터키 F-16v 대응.',
    {speed:'마하 1.8',range:'3,700km',crew:'1명',armament:'미티어·MICA·SCALP·ASMP-A',firstDeployed:'2021년',manufacturer:'다소',quantity:'18기+6(중고)+18(신규)'},
    ['라팔','그리스','터키대응','다소'],['다소','그리스공군'],'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Rafale_-_RIAT_2009_%283751416421%29.jpg/330px-Rafale_-_RIAT_2009_%283751416421%29.jpg','https://en.wikipedia.org/wiki/Dassault_Rafale',95),

  // ── 벨기에 ───────────────────────────────────────────────────────────────
  w('bel2-af001','F-35A (벨기에)','F-35A Lightning II (Belgium)','AIRCRAFT','NATO','DEVELOPMENT','LOW',
    '벨기에 공군 F-35A. 34기 계약. F-16 AM 대체. 2023년 인도 시작.',
    {speed:'마하 1.6',crew:'1명',firstDeployed:'2023년(초도)',manufacturer:'록히드마틴',quantity:'34기'},
    ['F-35A','벨기에','F-16대체'],['록히드마틴','벨기에공군'],undefined,undefined,90),

  // ── 체코 ─────────────────────────────────────────────────────────────────
  w('cze2-af001','F-35A (체코)','F-35A Lightning II (Czech Republic)','AIRCRAFT','NATO','DEVELOPMENT','LOW',
    '체코 F-35A 24기 계약. JAS-39 그리펜 대체. NATO 동부 방어 강화.',
    {speed:'마하 1.6',crew:'1명',firstDeployed:'2027년(예상)',manufacturer:'록히드마틴',quantity:'24기'},
    ['F-35A','체코','그리펜대체','NATO동부'],['록히드마틴','체코공군'],undefined,undefined,85),

]
