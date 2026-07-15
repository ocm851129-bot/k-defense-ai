import type { WeaponSystem } from './weapons'
const w = (id:string,name:string,nameEng:string,cat:WeaponSystem['category'],origin:WeaponSystem['origin'],status:WeaponSystem['status'],threat:WeaponSystem['threatRating'],desc:string,specs:WeaponSystem['specs'],tags:string[],sources:string[],img?:string,wiki?:string,conf=90): WeaponSystem=>({id,name,nameEng,category:cat,origin,status,threatRating:threat,description:desc,detail:`## ${nameEng}\n\n${desc}\n\n### 주요 제원\n${Object.entries(specs).filter(([,v])=>v).map(([k,v])=>`- ${k}: ${v}`).join('\n')}`,specs,confidence:conf,lastUpdated:'2026-07-03',relatedIntelIds:[],tags,sources,imageUrl:img,wikiUrl:wiki})

export const WEAPONS_BATCH28_GROUND_FORCES: WeaponSystem[] = [

  // ── 미국 지상군 추가 ──────────────────────────────────────────────────
  w('gf-usa001','M1A2 SEPv3 에이브람스','M1A2 SEPv3 Abrams MBT USA','GROUND','USA','OPERATIONAL','HIGH',
    '최신 에이브람스 개량형. 레이저 경보기·개선 통신·외부 전원 확대. 전투증명. 우크라이나 공급.',
    {weight:'73t',armament:'120mm M256 활강포·M2HB·M240',crew:'4명',speed:'67km/h',firstDeployed:'2020년(SEPv3)',quantity:'4,400여대',manufacturer:'제너럴다이나믹스'},
    ['M1A2SEPv3','에이브람스','미국전차','우크라이나'],['제너럴다이나믹스','미육군'],
    undefined,'https://en.wikipedia.org/wiki/M1_Abrams',95),

  w('gf-usa002','M10 부커 경전차','M10 Booker Combat Vehicle USA','GROUND','USA','OPERATIONAL','MED',
    '미 육군 신형 경전차. 82공수 사단 배치. 105mm M35. 코만치·브래들리 대안. 2024년 전력화.',
    {weight:'38.8t',armament:'105mm M35 강선포·M2HB·M240',crew:'4명',firstDeployed:'2024년',manufacturer:'제너럴다이나믹스'},
    ['M10','부커','경전차','105mm','82공수'],['제너럴다이나믹스','미육군'],
    undefined,'https://en.wikipedia.org/wiki/M10_Booker',85),

  w('gf-usa003','M2A4 브래들리 IFV','M2A4 Bradley Infantry Fighting Vehicle','GROUND','USA','OPERATIONAL','HIGH',
    '브래들리 최신 A4. 25mm M242 체인건·TOW-2B. 디지털화. 우크라이나 공급 핵심.',
    {weight:'33.7t',armament:'25mm M242·TOW-2B·7.62mm',crew:'3+6명',speed:'60km/h',firstDeployed:'1981년(A4: 2022년)',manufacturer:'BAE Systems'},
    ['M2A4','브래들리','IFV','25mm','우크라이나'],['BAE','미육군'],
    undefined,'https://en.wikipedia.org/wiki/Bradley_fighting_vehicle',90),

  w('gf-usa004','XM30 차기 IFV 미국','XM30 Mechanized Infantry Combat Vehicle USA','GROUND','USA','DEVELOPMENT','MED',
    '브래들리 대체 XM30. 50mm 포탑·APS·하이브리드 구동. 2030년대 전력화 목표.',
    {weight:'40t(추정)',armament:'50mm XM913 채인건·미사일',firstDeployed:'2030년대',manufacturer:'미 선정 예정'},
    ['XM30','MICV','브래들리대체','50mm','차기IFV'],['미육군'],
    undefined,undefined,65),

  w('gf-usa005','스트라이커 M1128 MGS','M1128 Stryker Mobile Gun System','GROUND','USA','OPERATIONAL','MED',
    '스트라이커 105mm 자주포 탑재형. 8×8. 공수 가능. MGS는 퇴역 예정. C-130 수송 가능.',
    {weight:'19.2t',armament:'105mm M68 강선포',crew:'3명',speed:'100km/h',firstDeployed:'2002년(MGS: 2006년)',manufacturer:'제너럴다이나믹스'},
    ['스트라이커','MGS','105mm','C-130수송','8x8'],['제너럴다이나믹스','미육군'],
    undefined,'https://en.wikipedia.org/wiki/M1128_Mobile_Gun_System',82),

  w('gf-usa006','M109A7 팔라딘 신형','M109A7 Paladin Howitzer USA','ARTILLERY','USA','OPERATIONAL','MED',
    'M109 최신 팔라딘. 디지털 사격통제. 30km(BB탄)/40km(ER탄). 자체 탄약보급차(AMMO) 짝',
    {weight:'40t',armament:'155mm M284/52구경장',crew:'4명',range:'40km(ER탄)',firstDeployed:'2015년',manufacturer:'BAE Systems'},
    ['M109A7','팔라딘','자주포','155mm','디지털'],['BAE','미육군'],
    undefined,'https://en.wikipedia.org/wiki/M109_howitzer',88),

  w('gf-usa007','HIMARS 고기동포병','M142 HIMARS Multiple Rocket System','MLRS','USA','OPERATIONAL','HIGH',
    '고기동 다연장로켓. M270 절반 탑재. GMLRS·ATACMS. 우크라이나 전세 역전 핵심.',
    {weight:'16.4t',armament:'GMLRS×6발 또는 ATACMS×2발',range:'300km(ATACMS)',firstDeployed:'2005년',manufacturer:'록히드마틴'},
    ['HIMARS','M142','다연장로켓','GMLRS','우크라이나역전'],['록히드마틴','미육군'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/HIMARS_-_missile_launched.jpg/330px-HIMARS_-_missile_launched.jpg','https://en.wikipedia.org/wiki/M142_HIMARS',98),

  // ── 러시아 지상군 추가 ────────────────────────────────────────────────
  w('gf-rus001','T-90M 프로르이브-3 전차','T-90M Proryv-3 MBT Russia','GROUND','RUSSIA','OPERATIONAL','HIGH',
    'T-90 최신 프로르이브-3. 우크라이나 실전 투입 주력. 개선 복합장갑·Kontakt-5 ERA. SOSNA-U 조준.',
    {weight:'48t',armament:'125mm 2A46M-4·코넷·ATGM',crew:'3명',speed:'60km/h',firstDeployed:'2016년',quantity:'100여대(추가 증산)',manufacturer:'우랄바곤자보드'},
    ['T-90M','프로르이브3','러시아전차','우크라이나','125mm'],['우랄바곤자보드','러시아군'],
    undefined,'https://en.wikipedia.org/wiki/T-90',88),

  w('gf-rus002','T-14 아르마타 전차','T-14 Armata Next-Gen MBT Russia','GROUND','RUSSIA','DEVELOPMENT','CRITICAL',
    '러시아 4세대 전차. 무인포탑·APS 아프가니트·네트워크 전투. 우크라이나 소수 투입. 대량생산 지연.',
    {weight:'55t',armament:'125mm 2A82-1M/152mm(예정)',crew:'3명(전차 앞 캡슐)',firstDeployed:'2022년(소량)',manufacturer:'우랄바곤자보드'},
    ['T-14','아르마타','무인포탑','4세대전차','아프가니트'],['우랄바곤자보드','러시아국방부'],
    undefined,'https://en.wikipedia.org/wiki/T-14_Armata',75),

  w('gf-rus003','BMP-3 개량형 러시아','BMP-3 IFV Russia Upgraded','GROUND','RUSSIA','OPERATIONAL','HIGH',
    'BMP-3 개량형. 100mm포+30mm 동축. 코넷-EM ATGM. 우크라이나 대규모 손실에도 생산 지속.',
    {weight:'22.7t',armament:'100mm 2A70·30mm 2A72·코넷-EM',crew:'3+7명',speed:'70km/h',firstDeployed:'1987년(개량: 2000년대)',quantity:'700여대',manufacturer:'쿠르간마시나'},
    ['BMP-3','러시아IFV','100mm','코넷EM','우크라이나'],['쿠르간마시나','러시아군'],
    undefined,'https://en.wikipedia.org/wiki/BMP-3',85),

  w('gf-rus004','2S35 콜리치야-SV','2S35 Koalitsiya-SV Self-Propelled Howitzer','ARTILLERY','RUSSIA','OPERATIONAL','HIGH',
    '러시아 차세대 자주포. 152mm/52구경장. 80km(글라이드탄). 자동 장전. 우크라이나 투입.',
    {weight:'48t',armament:'152mm 2A88/52구경장',crew:'2명(자동)',range:'80km(AS21글라이드)',firstDeployed:'2020년(소량)',manufacturer:'우랄바곤자보드'},
    ['2S35','콜리치야','자주포','152mm','80km'],['우랄바곤자보드','러시아군'],
    undefined,'https://en.wikipedia.org/wiki/2S35_Koalitsiya-SV',80),

  w('gf-rus005','TOS-1A 솔린트세뽀크','TOS-1A Solntsepyok Thermobaric MLRS','MLRS','RUSSIA','OPERATIONAL','HIGH',
    '러시아 전차 차체 기반 열압력 다연장로켓. 우크라이나 도시 공격 대량 사용. 220mm.',
    {weight:'44.3t',armament:'220mm 열압력 로켓 24발',range:'6km',firstDeployed:'1999년(A형)',manufacturer:'OJSC 옴스크'},
    ['TOS-1A','솔린트세뽀크','열압력','MLRS','우크라이나'],['OJSC','러시아군'],
    undefined,'https://en.wikipedia.org/wiki/TOS-1',85),

  w('gf-rus006','Buk-M2 방공시스템','Buk-M2 SA-17 Grizzly SAM','SAM','RUSSIA','OPERATIONAL','HIGH',
    'Buk-M2 9M317 미사일. 우크라이나 교전 다수. MH17 격추 모델(M1 계열). 사거리 45km.',
    {range:'45km',ceiling:'25km',firstDeployed:'2008년(M2)',manufacturer:'NPO Almaz'},
    ['BukM2','SA-17','방공','러시아SAM','우크라이나'],['Almaz','러시아군'],
    undefined,'https://en.wikipedia.org/wiki/Buk_missile_system',85),

  // ── 중국 지상군 추가 ────────────────────────────────────────────────
  w('gf-chn001','ZTZ-99A 전차','ZTZ-99A Type 99A MBT China','GROUND','CHINA','OPERATIONAL','HIGH',
    '중국 주력 3세대 전차. FY-4 ERA·NERA 복합장갑. 2000hp. HJ-12 ATGM 발사 가능.',
    {weight:'58t',armament:'125mm ZPT-98A 활강포·QJC-88',crew:'3명',speed:'80km/h',firstDeployed:'2011년(99A)',quantity:'1,200여대(추정)',manufacturer:'NORINCO'},
    ['ZTZ-99A','99A형전차','중국전차','FY-4ERA'],['NORINCO','PLA'],
    undefined,'https://en.wikipedia.org/wiki/Type_99_tank',85),

  w('gf-chn002','ZBD-04A 보병전투차','ZBD-04A IFV China','GROUND','CHINA','OPERATIONAL','HIGH',
    '중국 BMP-3 설계 영향 IFV. 100mm+30mm. 수륙양용. HJ-73C ATGM.',
    {weight:'21t',armament:'100mm 2A70형+30mm 2A72형',crew:'3+7명',firstDeployed:'2010년(04A)',manufacturer:'NORINCO'},
    ['ZBD-04A','중국IFV','수륙양용','100mm'],['NORINCO','PLA'],
    undefined,undefined,82),

  w('gf-chn003','PLZ-52 자주포 수출형','PLZ-52 PzH-2000 China Export SPH','ARTILLERY','CHINA','OPERATIONAL','LOW',
    '중국 155mm 수출형 자주포. 쿠웨이트 도입. 52구경장. K9 대항마.',
    {weight:'45t',armament:'155mm/52구경장',crew:'5명',range:'53km(ER탄)',firstDeployed:'2015년(쿠웨이트)',manufacturer:'NORINCO'},
    ['PLZ-52','중국자주포','쿠웨이트','수출'],['NORINCO'],
    undefined,undefined,75),

  w('gf-chn004','HJ-10 헬리본 대전차','HJ-10 Air-to-Ground ATGM China Heli','MISSILE','CHINA','OPERATIONAL','HIGH',
    '중국 헬기 탑재 대전차미사일. 8km. IIR+레이저 복합. Z-10·Z-19 탑재.',
    {range:'8km',payload:'HEAT 탠덤',firstDeployed:'2009년',manufacturer:'NORINCO'},
    ['HJ-10','중국ATGM','헬기탑재','Z-10'],['NORINCO','PLA'],
    undefined,undefined,80),

  // ── 유럽 지상군 추가 ────────────────────────────────────────────────
  w('gf-eu001','레오파르트 2A8 독일','Leopard 2A8 MBT Germany','GROUND','GERMANY','DEVELOPMENT','HIGH',
    '레오파르트 2 최신 A8. 하드킬 APS·개선 복합장갑·디지털화. 2024년 양산 시작. 우크라이나 계기 가속.',
    {weight:'60t',armament:'120mm L55A1·7.62mm×2',crew:'4명',speed:'72km/h',firstDeployed:'2024년(A8)',manufacturer:'KNDS/Rheinmetall'},
    ['레오파르트2A8','독일전차','APS','우크라이나'],['Rheinmetall','독일군'],
    undefined,'https://en.wikipedia.org/wiki/Leopard_2',90),

  w('gf-eu002','챌린저 3 영국','Challenger 3 MBT UK Upgrade','GROUND','UK','DEVELOPMENT','HIGH',
    'CR2 챌린저 2 대폭 개량. 독일 Rheinmetall 120mm 활강포 교체(최초). 3000발 TESS. 2025년 목표.',
    {weight:'70t',armament:'120mm Rh-120 L55A1(신형)',crew:'4명',firstDeployed:'2025년(목표)',manufacturer:'Rheinmetall·BAE Systems'},
    ['챌린저3','영국전차','120mm활강포','업그레이드'],['Rheinmetall','BAE','영국군'],
    undefined,'https://en.wikipedia.org/wiki/Challenger_3',85),

  w('gf-eu003','EBRC 재규어 프랑스','EBRC Jaguar Wheeled Recce Vehicle France','GROUND','FRANCE','OPERATIONAL','MED',
    '프랑스 차세대 차륜형 정찰전투차. 40mm CTAS+스파이크LR2. 2×2 운용 소대.',
    {weight:'25t',armament:'40mm CTAS+스파이크LR2',crew:'3명',speed:'90km/h',firstDeployed:'2021년',manufacturer:'넥스터·탈레스·르노트럭'},
    ['재규어','EBRC','프랑스','40mm CTAS','정찰전투차'],['넥스터','프랑스군'],
    undefined,'https://en.wikipedia.org/wiki/EBRC_Jaguar',85),

  w('gf-eu004','CV90 Mark IV 스칸디나비아','CV90 Mk IV IFV Scandinavia','GROUND','NATO','DEVELOPMENT','MED',
    'CV90 최신 마크 IV. 40mm+미사일+APS. 스웨덴·노르웨이·핀란드·덴마크 표준화.',
    {weight:'35t',armament:'40mm Bushmaster III+미사일+APS',crew:'3+8명',firstDeployed:'2025년+(목표)',manufacturer:'BAE Systems 스웨덴'},
    ['CV90MkIV','스칸디나비아IFV','40mm','APS'],['BAE','스칸디나비아군'],
    undefined,undefined,78),

  w('gf-eu005','PzH-2000 우크라이나 공급형','PzH-2000 Panzerhaubitze Ukraine Supply','ARTILLERY','GERMANY','OPERATIONAL','HIGH',
    '독일 PzH-2000. 우크라이나 공급 독일·네덜란드 합동. 실전에서 뛰어난 성능 증명.',
    {weight:'55.3t',armament:'155mm L52·NATO표준',crew:'5명',range:'56km(Excalibur)',firstDeployed:'1998년',quantity:'18대(우크라이나)',manufacturer:'Krauss-Maffei'},
    ['PzH-2000','독일자주포','우크라이나','56km'],['Krauss-Maffei','독일군'],
    undefined,'https://en.wikipedia.org/wiki/PzH_2000',90),

  w('gf-eu006','제라드 3 핀란드 방공','ItO 2005 NASAMS Finland','SAM','FINLAND','OPERATIONAL','MED',
    '핀란드 NASAMS 지대공미사일. 러시아 국경 방어. AMRAAM ER 탑재. 핀란드 NATO 가입 후 강화.',
    {range:'60km+(AMRAAM ER)',firstDeployed:'2011년',manufacturer:'콩스베르크·레이시언'},
    ['핀란드NASAMS','지대공','AMRAAM ER','핀란드','러시아국경'],['콩스베르크','핀란드군'],
    undefined,undefined,85),

  // ── 이스라엘 지상군 ─────────────────────────────────────────────────
  w('gf-isr001','메르카바 Mk4M 전차','Merkava Mk4M Trophy MBT Israel','GROUND','ISRAEL','OPERATIONAL','HIGH',
    '이스라엘 최강 전차. 트로피 APS. 가자 도심전 핵심. 전차 내 인원 운반 칸 보유.',
    {weight:'65t',armament:'120mm MG253 활강포·60mm 박격포',crew:'4명',speed:'64km/h',firstDeployed:'2004년(Mk4)/2011년(Mk4M)',manufacturer:'엘타·이스라엘 방산'},
    ['메르카바Mk4M','트로피APS','이스라엘전차','가자전쟁'],['이스라엘 방산','IDF'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Merkava_4m_Meil_Ruach.jpg/320px-Merkava_4m_Meil_Ruach.jpg',
    'https://en.wikipedia.org/wiki/Merkava',95),

  w('gf-isr002','에이탄 차륜형 IFV','Eitan 8x8 APC Israel','GROUND','ISRAEL','OPERATIONAL','MED',
    '이스라엘 최초 차륜형 IFV. 30mm Samson Mk2+트로피 경량. 메르카바 대체 목적.',
    {weight:'35t',armament:'30mm MK44 부슈마스터+스파이크LR',crew:'3+9명',speed:'90km/h',firstDeployed:'2023년',manufacturer:'이스라엘 방산'},
    ['에이탄','이스라엘IFV','8x8','트로피경량'],['이스라엘방산','IDF'],
    undefined,'https://en.wikipedia.org/wiki/Eitan_(APC)',85),

  w('gf-isr003','로켓 아이언빔 레이저','Iron Beam High Energy Laser Israel','SAM','ISRAEL','DEVELOPMENT','HIGH',
    '아이언빔 고에너지 레이저. 100kW. 단거리 로켓·드론·박격포 요격. 아이언돔 보완.',
    {range:'7km',firstDeployed:'2023년(시험)',manufacturer:'라파엘'},
    ['아이언빔','레이저방공','이스라엘','100kW','대드론'],['라파엘','이스라엘군'],
    undefined,'https://en.wikipedia.org/wiki/Iron_Beam',82),

  // ── 인도 지상군 ─────────────────────────────────────────────────────
  w('gf-ind001','아르준 MBT MK2','Arjun MBT Mk2 India Main Battle Tank','GROUND','INDIA','OPERATIONAL','MED',
    '인도 독자 개발 전차. Mk2 개량. DRDO·HAL 합작. 125mm·KANCHAN 장갑. 수출 준비 중.',
    {weight:'68t',armament:'120mm 강선포(Mk1)/125mm(Mk2추정)',crew:'4명',firstDeployed:'2004년(Mk1)/2015년(Mk2)',quantity:'248대',manufacturer:'DRDO·HVF'},
    ['아르준','인도전차','KANCHAN장갑','DRDO'],['DRDO','인도육군'],
    undefined,'https://en.wikipedia.org/wiki/Arjun_(tank)',75),

  w('gf-ind002','K9 바즈라-T 인도','K9 Vajra-T SPH India L&T License','ARTILLERY','ROK','OPERATIONAL','LOW',
    '한국 K9 인도 면허생산형. L&T 제조. 100대 계약. 파키스탄·중국 국경 배치 강화.',
    {weight:'47t',armament:'155mm/52구경장',crew:'5명',range:'40km(BB탄)',firstDeployed:'2019년(인도)',quantity:'100대(계획)',manufacturer:'L&T(면허)'},
    ['K9Vajra-T','인도K9','L&T','파키스탄국경'],['L&T','한화에어로스페이스','인도육군'],
    undefined,undefined,88),

  // ── 중동 지상군 ──────────────────────────────────────────────────────
  w('gf-me001','M1A2S 에이브람스 사우디','M1A2S Abrams Saudi Arabia FMS','GROUND','USA','OPERATIONAL','HIGH',
    '사우디 M1A2S. 373대. 예멘 전투 실전. 도시전·이란제 ATGM에 손실 발생.',
    {weight:'73t',armament:'120mm M256·CITV·RWS',crew:'4명',firstDeployed:'1995년(사우디)',quantity:'373대',manufacturer:'제너럴다이나믹스'},
    ['M1A2S','사우디에이브람스','예멘전쟁','FMS'],['제너럴다이나믹스','RSLF'],
    undefined,undefined,85),

  w('gf-me002','레클레르 UAE 이집트','Leclerc MBT UAE/Egypt Export','GROUND','FRANCE','OPERATIONAL','MED',
    '프랑스 레클레르 UAE 390대. 예멘 전투 투입. 이집트 도입 논의. 오토마틱 자동장전.',
    {weight:'54.5t',armament:'120mm CN120-26/52 활강포',crew:'3명(자동장전)',speed:'72km/h',firstDeployed:'1996년(UAE)',quantity:'390대(UAE)',manufacturer:'넥스터'},
    ['레클레르','UAE','예멘','자동장전','프랑스전차'],['넥스터','UAE군'],
    undefined,'https://en.wikipedia.org/wiki/AMX-56_Leclerc',82),

  // ── 특수전 무기 ─────────────────────────────────────────────────────
  w('gf-sf001','M4A1 Block II SOPMOD','M4A1 SOPMOD Block II US SOCOM','GROUND','USA','OPERATIONAL','MED',
    '미 특수전 M4A1. 다중 레일·야시경·소음기·AN/PEQ-15. SOF 표준 소총.',
    {weight:'2.52kg(빈몸)',caliber:'5.56×45mm NATO',capacity:'30발',range:'500m(유효)',manufacturer:'콜트·FNH USA'},
    ['M4A1','SOPMOD','특수전','SOCOM','소음기'],['콜트','FNH','미특수전'],
    undefined,'https://en.wikipedia.org/wiki/M4_carbine',92),

  w('gf-sf002','SCAR-H Mk.17 FNH','SCAR-H Mk17 7.62mm SOCOM Rifle','GROUND','USA','OPERATIONAL','MED',
    'FNH SCAR-H 7.62mm. 미 해군 특수전(DEVGRU). DMR 겸용. 정밀·돌격 이중 역할.',
    {weight:'3.58kg',caliber:'7.62×51mm NATO',capacity:'20발',manufacturer:'FN 에르스탈'},
    ['SCAR-H','Mk17','7.62mm','SOCOM','특수전'],['FN에르스탈','미특수전'],
    undefined,'https://en.wikipedia.org/wiki/FN_SCAR',88),

  w('gf-sf003','K11 복합소총 한국','K11 Dual-Mode Multi-Purpose Assault Rifle','GROUND','ROK','OPERATIONAL','MED',
    '한국 복합소총. 5.56mm+20mm 공중폭발탄. 적 엄폐물 뒤 타격. 2010년 전력화. 신뢰성 논란.',
    {weight:'6.1kg',caliber:'5.56mm(하부)+20mm(상부)',firstDeployed:'2010년',manufacturer:'S&T모티브'},
    ['K11','복합소총','공중폭발탄','20mm','한국'],['S&T모티브','육군'],
    'https://upload.wikimedia.org/wikipedia/commons/d/d6/Daewoo_K11_Rifle_noBG.png','https://en.wikipedia.org/wiki/K11_air_burst_weapon',80),

  w('gf-sf004','K14 저격소총 한국','K14 7.62mm Sniper Rifle Korea','GROUND','ROK','OPERATIONAL','LOW',
    '한국 국산 저격소총. 7.62mm. 볼트액션. 800m 유효. 특수부대·저격수 지급.',
    {weight:'5.95kg',caliber:'7.62×51mm NATO',range:'800m(유효)',manufacturer:'S&T모티브'},
    ['K14','저격소총','7.62mm','한국특수전'],['S&T모티브','육군'],
    undefined,undefined,85),

  w('gf-sf005','K2C1 단축형 소총','K2C1 Compact Assault Rifle Korea','GROUND','ROK','OPERATIONAL','MED',
    'K2 소총 단축형. 특수전·차량병·경호용. 접이식 개머리판. 시가전 최적.',
    {weight:'2.86kg',caliber:'5.56×45mm',capacity:'30발',manufacturer:'S&T모티브'},
    ['K2C1','단축소총','특수전','K2파생'],['S&T모티브','특수전사령부'],
    undefined,undefined,88),

  // ── 공병·지원 무기 ─────────────────────────────────────────────────
  w('gf-eng001','M88A2 구난전차 허큘리스','M88A2 Hercules Armored Recovery USA','GROUND','USA','OPERATIONAL','LOW',
    'M1 에이브람스 전용 구난전차. 70t 인양 능력. 전세계 동맹국 도입.',
    {weight:'63t',armament:'없음(구난기)',crew:'3명',firstDeployed:'1997년(A2)',manufacturer:'BAE Systems'},
    ['M88A2','구난전차','허큘리스','에이브람스지원'],['BAE','미육군'],
    undefined,'https://en.wikipedia.org/wiki/M88_Recovery_Vehicle',85),

  w('gf-eng002','APKWS 레이저유도로켓','APKWS Advanced Precision Kill Weapon System','MISSILE','USA','OPERATIONAL','MED',
    '비유도 2.75인치 로켓 개량 정밀유도형. 저비용 정밀. AH-64·F-16·F/A-18 탑재.',
    {range:'5km',payload:'2.3kg',firstDeployed:'2012년',manufacturer:'BAE Systems'},
    ['APKWS','레이저유도로켓','저비용정밀','2.75인치'],['BAE','미군'],
    undefined,undefined,88),

  w('gf-eng003','Rheinmetall KF51 판터','Rheinmetall KF51 Panther Next-Gen MBT','GROUND','GERMANY','DEVELOPMENT','HIGH',
    '라인메탈 차세대 전차. 130mm L51 활강포·자동장전. 레오파르트 2 후계 경쟁.',
    {weight:'59t',armament:'130mm L51·RWS·드론',crew:'3명(무인포탑)',firstDeployed:'2025년+(예정)',manufacturer:'Rheinmetall'},
    ['KF51','판터','차세대전차','130mm','라인메탈'],['Rheinmetall'],
    undefined,'https://en.wikipedia.org/wiki/KF51_Panther',80),

  w('gf-eng004','MGM-168 ATACMS 2 Block IVA','MGM-168 ATACMS Block IVA Tactical Missile','MISSILE','USA','OPERATIONAL','HIGH',
    'ATACMS 최신 블록IVA. 300km. GPS+INS. 이스칸데르 대응 정밀 타격.',
    {range:'300km',payload:'230kg 단일탄두',firstDeployed:'2004년',manufacturer:'록히드마틴'},
    ['ATACMS','블록IVA','300km','정밀타격'],['록히드마틴','미육군'],
    undefined,'https://en.wikipedia.org/wiki/MGM-140_ATACMS',90),

  w('gf-eng005','XM1299 ERCA 확장포병','XM1299 ERCA Extended Range Cannon Artillery','ARTILLERY','USA','DEVELOPMENT','MED',
    '미 육군 확장사거리 자주포. 58구경장 155mm. 70km+ 사거리. M109A7 플랫폼 기반.',
    {armament:'155mm/58구경장',range:'70km+(신탄)',firstDeployed:'2025년+(목표)',manufacturer:'BAE Systems'},
    ['XM1299','ERCA','확장포병','70km','미국자주포'],['BAE','미육군'],
    undefined,undefined,70),

  w('gf-eng006','K600 전투공병장갑차','K600 Combat Engineer Vehicle Korea','GROUND','ROK','DEVELOPMENT','MED',
    '한국 독자 개발 전투공병장갑차. 장갑불도저·굴삭기·폭발물처리. K21 기반.',
    {weight:'28t',firstDeployed:'2025년(목표)',manufacturer:'현대로템'},
    ['K600','공병장갑차','전투공병','CEV','한국'],['현대로템','공병'],
    undefined,undefined,68),

  w('gf-eng007','Leopard 2 AVLB 독일','Leguan Bridge Layer Germany Leopard 2','GROUND','GERMANY','OPERATIONAL','LOW',
    '레오파르트 2 기반 가교전차. 레구안 26m 교량. NATO 표준. 우크라이나 지원 논의.',
    {weight:'55t',armament:'없음',crew:'2명',firstDeployed:'2000년대',manufacturer:'Krauss-Maffei'},
    ['레구안','가교전차','레오파르트2기반','교량전차'],['Krauss-Maffei','독일군'],
    undefined,undefined,82),

  w('gf-eng008','M1150 돌파차량 미국','M1150 Assault Breacher Vehicle USA','GROUND','USA','OPERATIONAL','MED',
    '지뢰제거·폭파물 돌파 전용. M1A1 차체. MICLIC 라인차지 탑재. 상륙작전·지뢰원 돌파.',
    {weight:'70t',armament:'MICLIC 라인차지·M8A1플라우',crew:'2명',firstDeployed:'2008년',manufacturer:'제너럴다이나믹스'},
    ['M1150','돌파차량','ABV','지뢰제거','상륙작전'],['제너럴다이나믹스','USMC'],
    undefined,'https://en.wikipedia.org/wiki/M1150_Assault_Breacher_Vehicle',82),

  // ── 자폭드론·로비치 무기 ─────────────────────────────────────────────
  w('gf-loi001','스위치블레이드 600 자폭드론','Switchblade 600 Loitering Munition USA','UAV','USA','OPERATIONAL','HIGH',
    '배낭 휴대 자폭드론. 40km+ 비행. 장갑 관통탄두. 우크라이나 공급. 전차 공격 가능.',
    {range:'40km',armament:'탠덤 HEAT',firstDeployed:'2021년',manufacturer:'AeroVironment'},
    ['스위치블레이드600','자폭드론','배낭형','우크라이나'],['AeroVironment','미육군'],
    undefined,'https://en.wikipedia.org/wiki/AeroVironment_Switchblade',88),

  w('gf-loi002','하로프 자폭드론 이스라엘','Harop Loitering Munition Israel IAI','UAV','ISRAEL','OPERATIONAL','HIGH',
    'IAI 하로프 자폭드론. 자율 레이더 탐색·공격. 1,000km 체공. 아제르바이잔 나고르노 사용.',
    {range:'1,000km+',armament:'23kg HEAT',firstDeployed:'2009년',manufacturer:'IAI'},
    ['하로프','이스라엘자폭드론','IAI','레이더','아제르바이잔'],['IAI','이스라엘군'],
    undefined,'https://en.wikipedia.org/wiki/IAI_Harop',88),

  w('gf-loi003','WB 워메이트 폴란드','WB Warmate Loitering Munition Poland','UAV','POLAND','OPERATIONAL','MED',
    '폴란드 WB 워메이트. 5.5kg 탄두. 60분 체공. 우크라이나 공급. 15개국 수출.',
    {range:'30km',armament:'HEAT·열압력',firstDeployed:'2017년',manufacturer:'WB Electronics'},
    ['워메이트','폴란드자폭드론','WB','우크라이나'],['WB Electronics'],
    undefined,undefined,82),

  w('gf-loi004','샤헤드-136 이란','Shahed-136 Geranium-2 Iran UAV','UAV','IRAN','OPERATIONAL','HIGH',
    '이란 자폭드론. 러시아에 대량 공급 (게라늄-2). 우크라이나 인프라 공격 핵심. 소형·저비용.',
    {range:'2,000km+',armament:'50kg 탄두',firstDeployed:'2021년(이란)/2022년(러시아)',manufacturer:'이란 항공산업'},
    ['샤헤드136','이란드론','게라늄2','러시아공급','우크라이나'],['이란국방부','러시아'],
    undefined,'https://en.wikipedia.org/wiki/HESA_Shahed_136',85),

  w('gf-loi005','란셋-3M 러시아 자폭','Lancet-3M Loitering Munition Russia','UAV','RUSSIA','OPERATIONAL','HIGH',
    '러시아 ZALA 에어로 란셋. 우크라이나에서 대규모 사용. 전차·레이더·포병 표적.',
    {range:'40km',armament:'3kg 탠덤 HEAT',firstDeployed:'2022년(실전)',manufacturer:'ZALA Aero/칼라슈니코프'},
    ['란셋3M','러시아자폭','ZALA','우크라이나'],['ZALA','칼라슈니코프그룹'],
    undefined,undefined,85),

]
