import type { WeaponSystem } from './weapons'
const w = (id:string,name:string,nameEng:string,cat:WeaponSystem['category'],origin:WeaponSystem['origin'],status:WeaponSystem['status'],threat:WeaponSystem['threatRating'],desc:string,specs:WeaponSystem['specs'],tags:string[],sources:string[],img?:string,wiki?:string,conf=85): WeaponSystem=>({id,name,nameEng,category:cat,origin,status,threatRating:threat,description:desc,detail:`## ${nameEng}\n\n${desc}\n\n### 주요 제원\n${Object.entries(specs).filter(([,v])=>v).map(([k,v])=>`- ${k}: ${v}`).join('\n')}`,specs,confidence:conf,lastUpdated:'2026-07-01',relatedIntelIds:[],tags,sources,imageUrl:img,wikiUrl:wiki})

export const WEAPONS_BATCH7_ASIAPAC2: WeaponSystem[] = [

  // ── 일본 ─────────────────────────────────────────────────────────────────
  w('jpn2-af001','F-35A (일본 공자대)','F-35A Lightning II (JASDF)','AIRCRAFT','JAPAN','OPERATIONAL','LOW',
    '일항공자위대 F-35A. 105기 계약(A형 63기+B형 42기). 미쓰비시 면허생산. 2018년부터 전력화.',
    {speed:'마하 1.6',range:'2,220km',crew:'1명',armament:'AIM-120D·AIM-9X·GBU-31·JSM',firstDeployed:'2018년',manufacturer:'록히드마틴·미쓰비시중공업',quantity:'105기(계획)'},
    ['F-35A','일본','JASDF','미쓰비시면허','F-15J대체'],['록히드마틴','미쓰비시','공자대'],
    undefined,'https://en.wikipedia.org/wiki/Lockheed_Martin_F-35_Lightning_II',97),

  w('jpn2-af002','F-35B (일본 해자대·헬기호위함)','F-35B Lightning II (JMSDF/JASDF)','AIRCRAFT','JAPAN','OPERATIONAL','LOW',
    '이즈모급 경항모 탑재용 42기 계약. 이즈모함 STOVL 개조 공사 완료. 2024년 탑재비행 시험.',
    {speed:'마하 1.6',range:'1,670km',crew:'1명',armament:'AIM-120D·AIM-9X·JSM',firstDeployed:'2024년(탑재시험)',manufacturer:'록히드마틴·미쓰비시',quantity:'42기(계획)'},
    ['F-35B','이즈모','경항모','일본','STOVL'],['록히드마틴','해자대'],undefined,undefined,90),

  w('jpn2-af003','F-2A 지원전투기','Mitsubishi F-2A Support Fighter','AIRCRAFT','JAPAN','OPERATIONAL','LOW',
    'F-16C 기반 미쓰비시 F-2. J/APG-2 국산 AESA 레이더. ASM-2 대함미사일. 90기 운용.',
    {speed:'마하 2.0',range:'2,900km',crew:'1~2명',armament:'AAM-3·AAM-4·ASM-2·BLU-109',firstDeployed:'2000년',manufacturer:'미쓰비시·록히드마틴',quantity:'90기'},
    ['F-2A','미쓰비시','일본전투기','AESA','ASM-2'],['미쓰비시','공자대'],
    undefined,'https://en.wikipedia.org/wiki/Mitsubishi_F-2',93),

  w('jpn2-af004','F-15J(改) MSP 개량','F-15JSI Modernized Super Interceptor','AIRCRAFT','JAPAN','DEVELOPMENT','LOW',
    'F-15J 98기 MSP 개량. 능동 AESA AN/APG-82V1·JSM 통합·전자전 강화. 2024년 본격화.',
    {speed:'마하 2.5',range:'4,600km',crew:'1명',armament:'AAM-4B·AIM-120D·JSM·AAM-5B',firstDeployed:'2024년(개량)',manufacturer:'미쓰비시·보잉'},
    ['F-15JSI','MSP개량','AESA','JSM','일본'],['미쓰비시','공자대'],'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/F-15C_Eagle_from_the_44th_Fighter_Squadron_flies_during_a_routine_training_exercise_April_15%2C_2019.jpg/330px-F-15C_Eagle_from_the_44th_Fighter_Squadron_flies_during_a_routine_training_exercise_April_15%2C_2019.jpg','https://en.wikipedia.org/wiki/McDonnell_Douglas_F-15_Eagle',82),

  w('jpn2-af005','F-3 (차세대 전투기 GCAP)','F-3 GCAP Next Generation Fighter','AIRCRAFT','JAPAN','DEVELOPMENT','LOW',
    '일본·영국·이탈리아 공동 개발 GCAP(글로벌전투항공프로그램). 6세대급. 2035년 전력화 목표.',
    {speed:'마하 2.0+(추정)',crew:'1명',firstDeployed:'2035년(예상)',manufacturer:'미쓰비시·BAE·레오나르도'},
    ['F-3','GCAP','6세대','일영이','차세대전투기'],['미쓰비시','BAE','레오나르도'],
    undefined,'https://en.wikipedia.org/wiki/Global_Combat_Air_Programme',72),

  w('jpn2-m001','12식 지대함 개량형','Type 12 SSM Improved','SSM','JAPAN','OPERATIONAL','HIGH',
    '일본 지대함 개량형. 사거리 1,000km. 함대함·지상발사. 2026년 전력화. 적 기지반격능력 핵심.',
    {range:'1,000km+',speed:'마하 0.9+',guidance:'INS+GPS+TERCOM+IIR',firstDeployed:'2026년(예상)',manufacturer:'미쓰비시중공업'},
    ['12식개량','지대함','반격능력','1000km','일본'],['미쓰비시','방위성'],
    undefined,'https://en.wikipedia.org/wiki/Type_12_surface-to-ship_missile',82),

  w('jpn2-m002','JSM (일본 F-35 탑재)','JSM Joint Strike Missile (JASDF)','ASM','JAPAN','OPERATIONAL','LOW',
    '노르웨이 JSM 일본 도입. F-35A 내부 무장창 탑재. 사거리 570km. 2023년부터 도입.',
    {range:'570km',speed:'마하 0.95',guidance:'INS+GPS+IIR',firstDeployed:'2023년(일본)',manufacturer:'콩스베르그'},
    ['JSM','일본','F-35내부','570km','반격능력'],['콩스베르그','공자대'],
    undefined,'https://en.wikipedia.org/wiki/Joint_Strike_Missile',90),

  w('jpn2-m003','토마호크 (일본 도입)','Tomahawk BGM-109 (JMSDF/JGSDF)','CRUISE','JAPAN','DEVELOPMENT','HIGH',
    '미국 토마호크 Block V 400발 도입. 함정·지상 발사. 사거리 1,600km. 적기지반격 핵심 자산.',
    {range:'1,600km',payload:'450kg',guidance:'INS+GPS+TERCOM+EO',firstDeployed:'2025년(예상)',manufacturer:'레이시온'},
    ['토마호크','일본도입','400발','반격능력','함정발사'],['레이시온','해자대'],
    undefined,'https://en.wikipedia.org/wiki/Tomahawk_(missile)',88),

  w('jpn2-n001','이즈모함 DDH-183 (경항모)','JS Izumo DDH-183 (Light Carrier)','NAVAL','JAPAN','OPERATIONAL','MED',
    '이즈모급 1번함. F-35B 탑재를 위한 갑판 개조 완료. 사실상 경항모. 27,000t.',
    {displacement:'27,000t',armament:'F-35B 최대 28기·SeaRAM·CIWS·20mm',crew:'520명',speed:'30노트',firstDeployed:'2015년',manufacturer:'이시카와지마하리마'},
    ['이즈모','DDH-183','경항모','F-35B','일본해자대'],['해자대','이시카와지마'],
    undefined,'https://en.wikipedia.org/wiki/JS_Izumo',93),

  w('jpn2-n002','마야급 이지스함','JS Maya-class Aegis Destroyer','NAVAL','JAPAN','OPERATIONAL','HIGH',
    '최신 일본 이지스함. BMD 능력·SPY-1D(V) 레이더·SM-6·SM-3 Blk IIA. 2척 운용.',
    {displacement:'10,250t',armament:'SM-3 Blk IIA·SM-6·VLS 96셀·하푼·ASROC',crew:'300명',speed:'30노트',firstDeployed:'2020년',manufacturer:'재팬마린유나이티드'},
    ['마야급','이지스','SM-3','SM-6','BMD'],['재팬마린','해자대'],
    undefined,'https://en.wikipedia.org/wiki/Maya-class_destroyer',95),

  w('jpn2-n003','아타고급 이지스함','JS Atago-class Aegis Destroyer','NAVAL','JAPAN','OPERATIONAL','HIGH',
    '일본 이지스 구축함 2세대. BMD 업그레이드. SM-3 Blk IA. 2척 운용.',
    {displacement:'10,000t',armament:'SM-3·SM-2·하푼·ASROC·VLS 96셀',crew:'300명',speed:'30노트',firstDeployed:'2007년',manufacturer:'미쓰비시중공업',quantity:'2척'},
    ['아타고급','이지스','SM-3','BMD','해자대'],['미쓰비시','해자대'],
    undefined,'https://en.wikipedia.org/wiki/Atago-class_destroyer',93),

  w('jpn2-t001','10식 전차','Type 10 MBT','GROUND','JAPAN','OPERATIONAL','LOW',
    '일본 독자 4세대 전차. 44t 경량화. 네트워크 전투관리·능동방호 준비. 사격 중 이동 가능.',
    {weight:'44t',armament:'120mm 44구경 활강포·12.7mm·7.62mm',crew:'3명',speed:'70km/h',firstDeployed:'2012년',manufacturer:'미쓰비시중공업',quantity:'200대+'},
    ['10식전차','일본전차','네트워크','경량화','4세대'],['미쓰비시','육자대'],
    undefined,'https://en.wikipedia.org/wiki/Type_10_tank',90),

  w('jpn2-t002','89식 보병전투차','Type 89 IFV','GROUND','JAPAN','OPERATIONAL','LOW',
    '일본 독자 IFV. 35mm 기관포·79식 대전차미사일. 고가·소수 운용(68대).',
    {weight:'26.5t',armament:'35mm KDE·79식 ATGM·7.62mm',crew:'3+7명',speed:'70km/h',firstDeployed:'1989년',manufacturer:'미쓰비시중공업',quantity:'68대'},
    ['89식IFV','일본','35mm','소수운용'],['미쓰비시','육자대'],
    undefined,'https://en.wikipedia.org/wiki/Type_89_IFV',85),

  w('jpn2-s001','03式 중거리 지대공','Type 03 Chu-SAM SHORAD','SAM','JAPAN','OPERATIONAL','MED',
    '일본 독자 중거리 지대공. 사거리 90km. 레이더+광전자 복합 유도. 패트리어트 보완.',
    {range:'90km',altitude:'10km',firstDeployed:'2003년',manufacturer:'미쓰비시중공업'},
    ['03식','Chu-SAM','중거리방공','일본독자'],['미쓰비시','육자대'],
    undefined,'https://en.wikipedia.org/wiki/Type_03_Chu-SAM',82),

  // ── 인도 ──────────────────────────────────────────────────────────────────
  w('ind2-af001','라팔 (인도 공군)','Rafale EH (Indian Air Force)','AIRCRAFT','INDIA','OPERATIONAL','LOW',
    '인도 공군 라팔. 36기 + 추가 26기 계약. 스칼프·미카 NG. 파키스탄·중국 대응.',
    {speed:'마하 1.8',range:'3,700km',crew:'1~2명',armament:'MICA NG·미티어·SCALP·HAMMER',firstDeployed:'2020년',manufacturer:'다소',quantity:'36기+26기'},
    ['라팔','인도공군','36기','중국파키스탄대응','다소'],['다소','인도공군'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Rafale_-_RIAT_2009_%283751416421%29.jpg/330px-Rafale_-_RIAT_2009_%283751416421%29.jpg','https://en.wikipedia.org/wiki/Dassault_Rafale',95),

  w('ind2-af002','Su-30MKI 전투기','Su-30MKI Flanker-H (IAF)','AIRCRAFT','INDIA','OPERATIONAL','HIGH',
    '러시아·인도 공동 커스터마이징 Su-30. 265기 면허생산(HAL). 브라모스·아스트라 통합.',
    {speed:'마하 2.0',range:'3,000km',crew:'2명',armament:'R-77·R-73·브라모스·아스트라 Mk1·Kh-59MK',firstDeployed:'2002년',manufacturer:'HAL·수호이',quantity:'265기+'},
    ['Su-30MKI','인도공군','HAL','브라모스','265기'],['HAL','IAF'],
    undefined,'https://en.wikipedia.org/wiki/Sukhoi_Su-30MKI',90),

  w('ind2-af003','테자스 Mk1A 전투기','Tejas Mk1A Light Combat Aircraft','AIRCRAFT','INDIA','DEVELOPMENT','MED',
    'HAL 독자 경전투기 최신형. AESA 레이더·AMCA BVRAAM·RBE2 레이더. 83기 추가 계약.',
    {speed:'마하 1.8',range:'3,000km',crew:'1명',armament:'아스트라 Mk2·BVR·파이톤5·레이저폭탄',firstDeployed:'2024년(Mk1A)',manufacturer:'HAL',quantity:'83기(계약)'},
    ['테자스','Mk1A','인도전투기','HAL','국산'],['HAL','인도공군'],
    undefined,'https://en.wikipedia.org/wiki/HAL_Tejas',78),

  w('ind2-m001','BrahMos 브라모스 블록III','BrahMos Block III Supersonic Cruise Missile','CRUISE','INDIA','OPERATIONAL','HIGH',
    '인도·러시아 합작 초음속 순항미사일. 마하 2.8. 지상·함정·공중·잠수함 발사. 사거리 400km+.',
    {range:'400km+',speed:'마하 2.8',payload:'200~300kg HEAT/HE',guidance:'INS+GPS+능동레이더',firstDeployed:'2006년',manufacturer:'브라모스항공우주'},
    ['브라모스','초음속','마하2.8','지상함공잠','인도러시아'],['브라모스항공우주','인도군'],
    undefined,'https://en.wikipedia.org/wiki/BrahMos',95),

  w('ind2-m002','아그니-V ICBM','Agni-V ICBM','ICBM','INDIA','OPERATIONAL','CRITICAL',
    '인도 최초 ICBM급. 사거리 5,500km+. MIRV 개발 중. 중국 전역 타격 가능.',
    {range:'5,500km',payload:'1.5t 단탄두 또는 MIRV 개발중',propulsion:'고체연료 3단',firstDeployed:'2023년(배치)',manufacturer:'DRDO'},
    ['아그니V','ICBM','인도','5500km','중국견제'],['DRDO','인도전략군'],
    undefined,'https://en.wikipedia.org/wiki/Agni-V',85),

  w('ind2-n001','INS 비크란트 (항모)','INS Vikrant R11 Aircraft Carrier','NAVAL','INDIA','OPERATIONAL','MED',
    '인도 독자 건조 항공모함. 45,000t. MiG-29K·Ka-31·MH-60R 운용. 2022년 취역.',
    {displacement:'45,000t',armament:'MiG-29K 16기+·Ka-31·Barak 8',crew:'1,700명',speed:'28노트',firstDeployed:'2022년',manufacturer:'CSIL 코친'},
    ['비크란트','인도항모','MiG-29K','독자건조','2022년'],['인도해군','CSIL'],
    undefined,'https://en.wikipedia.org/wiki/INS_Vikrant_(R11)',88),

  w('ind2-t001','아르준 Mk1A 전차','Arjun Mk1A MBT','GROUND','INDIA','OPERATIONAL','MED',
    '인도 독자 주력전차 개량형. 120mm 강선포·복합장갑·ERA·레이저경보. 118대 주문.',
    {weight:'68.5t',armament:'120mm 강선포·12.7mm·7.62mm',crew:'4명',speed:'72km/h',firstDeployed:'2021년',manufacturer:'HVF 체나이'},
    ['아르준Mk1A','인도전차','120mm','ERA','국산'],['HVF','인도육군'],
    undefined,'https://en.wikipedia.org/wiki/Arjun_(tank)',78),

  // ── 파키스탄 ─────────────────────────────────────────────────────────────
  w('pak2-m001','샤힌-III MRBM','Shaheen-III MRBM','IRBM','PAKISTAN','OPERATIONAL','CRITICAL',
    '파키스탄 최장거리 탄도미사일. 사거리 2,750km. 인도 전역 타격. 핵탄두 탑재.',
    {range:'2,750km',payload:'핵탄두',propulsion:'고체연료 2단',firstDeployed:'2015년',manufacturer:'NESCOM'},
    ['샤힌III','파키스탄MRBM','2750km','인도대응','핵'],['IISS','파키스탄군'],
    undefined,'https://en.wikipedia.org/wiki/Shaheen-III',75),

  w('pak2-m002','바부르 순항미사일','Babur (Hatf-7) Cruise Missile','CRUISE','PAKISTAN','OPERATIONAL','HIGH',
    '지상·함정·잠수함 발사 순항미사일. 사거리 700km. TERCOM+GPS. 핵/재래식.',
    {range:'700km',speed:'마하 0.8',guidance:'INS+TERCOM+GPS',firstDeployed:'2007년',manufacturer:'NESCOM'},
    ['바부르','Hatf-7','순항미사일','700km','파키스탄'],['NESCOM','파키스탄군'],
    undefined,'https://en.wikipedia.org/wiki/Babur_(missile)',72),

  w('pak2-af001','JF-17 썬더 블록III','JF-17 Thunder Block III','AIRCRAFT','PAKISTAN','OPERATIONAL','MED',
    '중국·파키스탄 합작 경전투기. SD-10A BVRAAM·PL-5E. 블록III: AESA·디지털조종석.',
    {speed:'마하 1.8',range:'3,000km',crew:'1명',armament:'SD-10A·PL-5E·CM-400AKG',firstDeployed:'2021년(Blk III)',manufacturer:'PAC·CAC',quantity:'150기+'},
    ['JF-17블록III','파키스탄','중국합작','AESA','SD-10A'],['PAC','파키스탄공군'],
    undefined,'https://en.wikipedia.org/wiki/CAC/PAC_JF-17_Thunder',82),

  // ── 이스라엘 ──────────────────────────────────────────────────────────────
  w('isr2-af001','F-35I 아디르','F-35I Adir (Israeli AF)','AIRCRAFT','ISRAEL','OPERATIONAL','LOW',
    '이스라엘 특화 F-35A. 국산 전자전·EW·디코이 시스템 통합. 50기+ 운용. 이란 타격 능력.',
    {speed:'마하 1.6',range:'2,220km+',crew:'1명',armament:'AIM-120D·AIM-9X·SDB II·스파이스·라파엘 미사일',firstDeployed:'2017년',manufacturer:'록히드마틴·이스라엘항공우주',quantity:'50기+'},
    ['F-35I','아디르','이스라엘','국산EW','이란타격'],['록히드마틴','이스라엘공군'],
    undefined,'https://en.wikipedia.org/wiki/Lockheed_Martin_F-35_Lightning_II#Israel',97),

  w('isr2-m001','애로우-3 탄도미사일방어','Arrow 3 ABM System','SAM','ISRAEL','OPERATIONAL','CRITICAL',
    '탄도미사일 대기권 외 요격. 사거리 2,400km. 핵탑재 IRBM 요격 가능. 미국 공동 개발·지원.',
    {range:'2,400km',altitude:'100km+(대기권외)',speed:'마하 9',guidance:'능동 레이더',firstDeployed:'2017년',manufacturer:'IAI·보잉'},
    ['애로우3','탄도미사일방어','대기권외','이란ICBM대응','미이스라엘'],['IAI','보잉','이스라엘군'],
    undefined,'https://en.wikipedia.org/wiki/Arrow_3',90),

  w('isr2-m002','아이언 돔 방공','Iron Dome Air Defense System','SAM','ISRAEL','OPERATIONAL','HIGH',
    '단거리 로켓·박격포 요격 방공. 70km 범위. 90%+ 성공률. 가자지구 수천 발 요격. 세계 최다 실전.',
    {range:'70km',altitude:'10km',speed:'마하 2.2',guidance:'능동 레이더',firstDeployed:'2011년',manufacturer:'라파엘·IAI',quantity:'10개 포대+'},
    ['아이언돔','방공','로켓요격','가자','세계최다실전'],['라파엘','IAI','이스라엘군'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Iron_Dome_battery_near_Ashdod.jpg/320px-Iron_Dome_battery_near_Ashdod.jpg',
    'https://en.wikipedia.org/wiki/Iron_Dome',99),

  w('isr2-m003','데이비드 슬링 방공','David\'s Sling (Magic Wand) Defense','SAM','ISRAEL','OPERATIONAL','HIGH',
    '중단거리 탄도·순항미사일·대규모 포격 요격. 사거리 300km. 아이언돔·애로우 사이 방공층.',
    {range:'300km',altitude:'15km',speed:'마하 7.5',guidance:'능동레이더+IR',firstDeployed:'2017년',manufacturer:'라파엘·레이시온'},
    ['데이비드슬링','매직완드','중단거리방공','이스라엘'],['라파엘','레이시온','이스라엘군'],
    undefined,'https://en.wikipedia.org/wiki/David%27s_Sling',90),

  w('isr2-m004','스파이크 NLOS 대전차','Spike NLOS Anti-Tank Missile','ASM','ISRAEL','OPERATIONAL','HIGH',
    '사거리 25km 비가시선 대전차미사일. 이미지·TV 유도. 함정·헬기·차량·보병 발사. 세계 35국 수출.',
    {range:'25km',guidance:'EO/IR 영상+인터넷',payload:'탠덤 HEAT·EFP',firstDeployed:'2004년',manufacturer:'라파엘'},
    ['스파이크NLOS','25km','비가시선','대전차','35국수출'],['라파엘','이스라엘군'],
    undefined,'https://en.wikipedia.org/wiki/Spike_NLOS',95),

  w('isr2-m005','SPICE 2000 정밀폭탄','SPICE-2000 Precision Guided Bomb','ASM','ISRAEL','OPERATIONAL','HIGH',
    'GPS+IIR 영상대조 정밀유도폭탄. F-15·F-16·F-35 탑재. CEP 3m. 이스라엘·한국·인도 운용.',
    {range:'100km',payload:'900kg(2000lb)',guidance:'GPS+IIR 영상대조',firstDeployed:'2007년',manufacturer:'라파엘'},
    ['SPICE-2000','정밀폭탄','영상대조','한국운용'],['라파엘','이스라엘공군'],
    undefined,'https://en.wikipedia.org/wiki/SPICE_(bomb)',90),

  w('isr2-t001','메르카바 Mk4M 전차','Merkava Mk4M Windbreaker MBT','GROUND','ISRAEL','OPERATIONAL','LOW',
    '세계 최강 전차 중 하나. 트로피 능동방호·전방 엔진 승무원 보호. 120mm·M240·60mm 박격포.',
    {weight:'65t',armament:'120mm MG253 활강포·M240 7.62mm·M2HB 12.7mm·60mm 박격포',crew:'4명',speed:'64km/h',firstDeployed:'2012년(Mk4M)',manufacturer:'이스라엘 군수',quantity:'2,200대+'},
    ['메르카바Mk4M','트로피APS','전방엔진','120mm','최강전차'],['IMI','이스라엘군'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Merkava_Mk_4M.jpg/320px-Merkava_Mk_4M.jpg',
    'https://en.wikipedia.org/wiki/Merkava',99),

  // ── 터키 ──────────────────────────────────────────────────────────────────
  w('tur2-af001','바이락타르 TB2 공격UAV','Bayraktar TB2 Attack UAV','UAV','TURKEY','OPERATIONAL','HIGH',
    '터키 독자 개발 중고도 공격UAV. 마이크로 스마트 탄·MAM-L. 우크라이나·리비아·나고르노카라바흐 실전.',
    {speed:'130km/h',ceiling:'7,620m',armament:'MAM-L·MAM-C·소형 스마트탄',firstDeployed:'2015년',manufacturer:'바이락타르',quantity:'세계 20국+ 수출'},
    ['TB2','바이락타르','터키드론','우크라이나','실전'],['바이락타르','터키군'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Bayraktar_TB2_MSPO2021.jpg/320px-Bayraktar_TB2_MSPO2021.jpg',
    'https://en.wikipedia.org/wiki/Bayraktar_TB2',98),

  w('tur2-af002','바이락타르 아큰즈 (TB3)','Bayraktar AKINCI Tier-II MALE UAV','UAV','TURKEY','OPERATIONAL','HIGH',
    'TB2 상위형. 1~1.35t 탑재. 우크라이나수출. TB3 함재형 개발중. 인공위성 연동.',
    {speed:'361km/h',ceiling:'13,716m',armament:'MAM·Cirit·KGK·SOM-A',firstDeployed:'2021년',manufacturer:'바이락타르'},
    ['아큰즈','AKINCI','TB3','대형드론','터키'],['바이락타르','터키군'],
    undefined,'https://en.wikipedia.org/wiki/Bayraktar_Akıncı',88),

  w('tur2-t001','알타이 전차','Altay Main Battle Tank','GROUND','TURKEY','DEVELOPMENT','MED',
    '터키 독자 4세대 전차. 한국 현대로템 협력(K2 기반 기술). 125mm. 2024년 소량 생산 시작.',
    {weight:'65t',armament:'120mm 또는 125mm 활강포·12.7mm',crew:'4명',firstDeployed:'2023년(소량)',manufacturer:'BMC·현대로템협력'},
    ['알타이','터키전차','K2기반','독자개발','현대로템협력'],['BMC','터키군'],
    undefined,'https://en.wikipedia.org/wiki/Altay_(tank)',75),

  w('tur2-m001','SOM 공대지 순항미사일','SOM-B2 Stand-Off Missile','CRUISE','TURKEY','OPERATIONAL','MED',
    '터키 독자 개발 공대지 순항미사일. 사거리 800km. F-4E·F-16 탑재. INS+TERCOM+IIR.',
    {range:'800km',speed:'마하 0.9',payload:'HE 탄두',guidance:'INS+TERCOM+IIR',firstDeployed:'2016년',manufacturer:'Roketsan'},
    ['SOM','터키순항미사일','800km','F-16탑재','독자개발'],['Roketsan','터키공군'],
    undefined,'https://en.wikipedia.org/wiki/SOM_(missile)',80),

  // ── 대만 ──────────────────────────────────────────────────────────────────
  w('twn2-af001','F-16V 바이퍼 (대만)','F-16V Viper (Taiwan ROCAF)','AIRCRAFT','TAIWAN','OPERATIONAL','LOW',
    '대만 F-16BU→V 개량. AESA AN/APG-83. 141기 개량+66기 신규 도입(F-16C/D). 중국 대응 핵심.',
    {speed:'마하 2.0',range:'3,200km',crew:'1~2명',armament:'AIM-120D·AIM-9X·JDAM·HARM',firstDeployed:'2021년(V형)',manufacturer:'록히드마틴',quantity:'207기'},
    ['F-16V','대만','AESA','바이퍼','중국대응'],['록히드마틴','대만공군'],
    undefined,'https://en.wikipedia.org/wiki/General_Dynamics_F-16_Fighting_Falcon',93),

  w('twn2-m001','윈펑 (만검) 순항미사일','Yun Feng Long-Range Cruise Missile','CRUISE','TAIWAN','OPERATIONAL','HIGH',
    '대만 독자 개발 장거리 순항미사일. 사거리 1,200km+. 중국 내륙 타격 능력. 비밀 프로젝트.',
    {range:'1,200km+(추정)',speed:'마하 3+(추정)',guidance:'INS+GPS+TERCOM',firstDeployed:'2021년(추정)',manufacturer:'중산과학연구원'},
    ['윈펑','만검','대만순항미사일','1200km','중국내륙'],['중산과학연구원','대만군'],
    undefined,'https://en.wikipedia.org/wiki/Yunfeng_missile',60),

  w('twn2-m002','애로우 하피쿠스 지대함','Hsiung Feng III Supersonic Anti-Ship Missile','SSM','TAIWAN','OPERATIONAL','HIGH',
    '웅봉-III 초음속 대함미사일. 마하 2.0. 사거리 200km. 연안 방어 핵심. 함 및 이동발사.',
    {range:'200km',speed:'마하 2.0',guidance:'INS+능동레이더',firstDeployed:'2015년',manufacturer:'중산과학연구원'},
    ['웅봉III','대만대함','초음속','200km','연안방어'],['중산과학연구원','대만해군'],
    undefined,'https://en.wikipedia.org/wiki/Hsiung_Feng_III',78),

  // ── 호주 ──────────────────────────────────────────────────────────────────
  w('aus2-af001','F-35A (호주 RAAF)','F-35A Lightning II (RAAF)','AIRCRAFT','AUSTRALIA','OPERATIONAL','LOW',
    '호주 왕립공군 F-35A. 72기 도입. F/A-18A/B 대체. 2019년 전력화 시작.',
    {speed:'마하 1.6',range:'2,220km',crew:'1명',armament:'AIM-120D·AIM-9X·JSM·JDAM',firstDeployed:'2019년',manufacturer:'록히드마틴',quantity:'72기'},
    ['F-35A','호주','RAAF','72기','스텔스'],['록히드마틴','호주공군'],
    undefined,'https://en.wikipedia.org/wiki/Lockheed_Martin_F-35_Lightning_II',95),

  w('aus2-n001','핵잠수함 AUKUS','AUKUS SSN Nuclear Submarine Program','SUBMARINE','AUSTRALIA','DEVELOPMENT','HIGH',
    'AUKUS 조약 핵추진잠수함. 미 버지니아급 조기 인도+영국 SSN-AUKUS 협력 설계. 2030년대 예상.',
    {displacement:'10,000t+(예상)',armament:'토마호크·Mk48 어뢰',crew:'100명',firstDeployed:'2031년(예상)',manufacturer:'ASC·BAE Systems·버지니아급'},
    ['AUKUS','핵잠수함','호주','버지니아급','2030년대'],['BAE Systems','미해군','호주'],
    undefined,'https://en.wikipedia.org/wiki/AUKUS',75),

  w('aus2-t001','AS21 레드백 (호주)','AS21 Redback IFV (Australia)','GROUND','AUSTRALIA','DEVELOPMENT','LOW',
    '한화에어로스페이스 AS21 레드백 호주 LAND 400 Phase 3 우선협상대상자 선정(2023년). 129대.',
    {weight:'42t',armament:'30mm 기관포·스파이크LR2',crew:'3+8명',firstDeployed:'2027년(예상)',manufacturer:'한화에어로스페이스'},
    ['레드백','호주','129대','LAND400','한화'],['한화에어로스페이스','호주육군'],
    undefined,'https://en.wikipedia.org/wiki/Redback_(IFV)',82),

]
