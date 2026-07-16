import type { WeaponSystem } from './weapons'
const w = (id:string,name:string,nameEng:string,cat:WeaponSystem['category'],origin:WeaponSystem['origin'],status:WeaponSystem['status'],threat:WeaponSystem['threatRating'],desc:string,specs:WeaponSystem['specs'],tags:string[],sources:string[],img?:string,wiki?:string,conf=90): WeaponSystem=>({id,name,nameEng,category:cat,origin,status,threatRating:threat,description:desc,detail:`## ${nameEng}\n\n${desc}\n\n### 주요 제원\n${Object.entries(specs).filter(([,v])=>v).map(([k,v])=>`- ${k}: ${v}`).join('\n')}`,specs,confidence:conf,lastUpdated:'2026-07-03',relatedIntelIds:[],tags,sources,imageUrl:img,wikiUrl:wiki})

export const WEAPONS_BATCH32_HISTORICAL: WeaponSystem[] = [

  // ── 냉전기 핵무기 ──────────────────────────────────────────────────────
  w('hist-nuc001','투폴레프 Tu-4 소련 최초 핵폭격기','Tu-4 Bull First Soviet Nuclear Bomber','AIRCRAFT','RUSSIA','RETIRED','HIGH',
    '소련 B-29 역설계 최초 전략폭격기. 1947년. 핵폭탄 투발 능력. 냉전 서막.',
    {speed:'558km/h',crew:'11명',firstDeployed:'1947년',manufacturer:'투폴레프'},
    ['Tu-4','소련핵','역설계','B-29복제','냉전서막'],['투폴레프','소련공군'],
    undefined,'https://en.wikipedia.org/wiki/Tupolev_Tu-4',90),

  w('hist-nuc002','B-52H 스트라토포트레스 현역','B-52H Stratofortress Still Active USA','AIRCRAFT','USA','OPERATIONAL','HIGH',
    '1955년 첫 비행 B-52H. 2050년+ 운용 예정. 세계 최장수 폭격기. ALCM·JASSM·B61 탑재.',
    {speed:'마하 0.86',crew:'5명',armament:'ALCM·JASSM-ER·B61-12·JDAM',firstDeployed:'1955년(H형: 1962년)',quantity:'76기',manufacturer:'보잉'},
    ['B-52H','70년폭격기','스트라토포트레스','현역'],['보잉','USAF'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Boeing_B-52H_Stratofortress.jpg/320px-Boeing_B-52H_Stratofortress.jpg',
    'https://en.wikipedia.org/wiki/Boeing_B-52_Stratofortress',95),

  w('hist-nuc003','이반 차르 핵폭탄','Tsar Bomba AN602 Most Powerful Nuke','MISSILE','RUSSIA','RETIRED','CRITICAL',
    '인류 역사 최강 핵폭탄. 50Mt. 1961년 시험. 폭발 반경 35km. 지구상 최대 단일 폭발.',
    {payload:'50 메가톤(TNT)',firstDeployed:'1961년(실험·이후 폐기)',manufacturer:'소련 핵무기 설계국'},
    ['차르봄바','AN602','50메가톤','인류최강','1961년'],['소련핵무기설계국'],
    undefined,'https://en.wikipedia.org/wiki/Tsar_Bomba',92),

  w('hist-nuc004','B-36 피스메이커 퇴역','B-36 Peacemaker Strategic Bomber USA','AIRCRAFT','USA','RETIRED','HIGH',
    '최초 대륙간 전략폭격기. 6발 피스톤+4발 제트 혼합. 핵폭탄 탑재 가능. 1955년 퇴역.',
    {speed:'672km/h',crew:'15명',firstDeployed:'1948년',manufacturer:'컨베어'},
    ['B-36','피스메이커','대륙간폭격기','퇴역','피스톤'],['컨베어','USAF'],
    undefined,'https://en.wikipedia.org/wiki/Convair_B-36_Peacemaker',88),

  // ── 2차 세계대전 ──────────────────────────────────────────────────────
  w('hist-ww2001','M4 셔먼 전차','M4 Sherman Medium Tank WWII','GROUND','USA','RETIRED','MED',
    '2차대전 미국 주력 전차. 8만6000대 생산. 연합군 전술기동 핵심. 노르망디~태평양 전선.',
    {weight:'30.3t',armament:'75mm M3 또는 76mm M1A1',crew:'5명',speed:'48km/h',firstDeployed:'1942년'},
    ['M4셔먼','2차대전','연합군전차','8만6000대','75mm'],['미육군'],
    undefined,'https://en.wikipedia.org/wiki/M4_Sherman',95),

  w('hist-ww2002','Tiger I 독일 전차','Tiger I Panzerkampfwagen VI WWII','GROUND','GERMANY','RETIRED','HIGH',
    '독일 2차대전 중전차. 88mm 강력포. 연합군 전차를 멀리서 압도. 그러나 신뢰성·숫자 부족.',
    {weight:'57t',armament:'88mm KwK 36 L/56',crew:'5명',speed:'38km/h',firstDeployed:'1942년'},
    ['Tiger I','독일전차','88mm','2차대전','중전차'],['독일군'],
    undefined,'https://en.wikipedia.org/wiki/Tiger_I',92),

  w('hist-ww2003','T-34/85 소련 전차','T-34/85 Soviet WWII Medium Tank','GROUND','RUSSIA','RETIRED','HIGH',
    '소련 T-34 개량형. 85mm ZIS-S-53. 11만5000대 생산. 동부전선 역전의 상징.',
    {weight:'32t',armament:'85mm ZIS-S-53',crew:'5명',speed:'55km/h',firstDeployed:'1944년(85형)'},
    ['T-34','소련전차','85mm','동부전선','11만5000대'],['소련군'],
    undefined,'https://en.wikipedia.org/wiki/T-34',95),

  w('hist-ww2004','Spitfire Mk.IX 영국 전투기','Supermarine Spitfire Mk IX WWII Fighter','AIRCRAFT','UK','RETIRED','HIGH',
    '영국 스핏파이어 Mk.IX. 메르린 엔진·타원익. 영국 전투(Battle of Britain) 주역. 2만4000대 생산.',
    {speed:'656km/h',crew:'1명',armament:'20mm Hispano Mk.II×2+7.7mm×4',firstDeployed:'1942년(IX형)'},
    ['스핏파이어','영국전투기','전투기전투','타원익','메르린'],['영국공군'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Supermarine_Spitfire_%28just_the_plane%29.jpg/320px-Supermarine_Spitfire_%28just_the_plane%29.jpg',
    'https://en.wikipedia.org/wiki/Supermarine_Spitfire',95),

  w('hist-ww2005','Bf 109 E 독일 전투기','Messerschmitt Bf 109E Emil WWII Fighter','AIRCRAFT','GERMANY','RETIRED','HIGH',
    '독일 Bf109E. 영국 전투 주역. DB 601 엔진. 3만5000대+ 생산. 에이스 파일럿 양성.',
    {speed:'570km/h',crew:'1명',armament:'20mm MG FF×2+7.92mm×2',firstDeployed:'1937년(E형)'},
    ['Bf109E','메서슈미트','독일전투기','영국전투','DB601'],['독일공군'],
    undefined,'https://en.wikipedia.org/wiki/Messerschmitt_Bf_109',92),

  w('hist-ww2006','B-17 플라잉 포트리스','B-17G Flying Fortress Strategic Bomber','AIRCRAFT','USA','RETIRED','HIGH',
    '미국 4발 전략폭격기. 독일 본토 폭격 핵심. 12,731대. 방어력 탁월. 고고도 정밀폭격.',
    {speed:'462km/h',crew:'10명',armament:'12.7mm×13·폭탄 2,722kg',firstDeployed:'1938년(G형: 1944년)'},
    ['B-17','플라잉포트레스','4발폭격기','독일폭격','12731대'],['보잉','USAAF'],
    undefined,'https://en.wikipedia.org/wiki/Boeing_B-17_Flying_Fortress',92),

  w('hist-ww2007','V-2 로켓 독일','V-2 Aggregat-4 Ballistic Missile WWII','MISSILE','GERMANY','RETIRED','HIGH',
    '세계 최초 탄도미사일. 폰 브라운 설계. 런던·앤트워프 공격. 현대 미사일의 어머니.',
    {range:'320km',payload:'975kg Amatol',speed:'마하 4',firstDeployed:'1944년'},
    ['V-2','탄도미사일기원','폰브라운','런던','나치독일'],['나치독일'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/V2_rocket_diagram.jpg/250px-V2_rocket_diagram.jpg',
    'https://en.wikipedia.org/wiki/V-2_rocket',95),

  w('hist-ww2008','P-51D 무스탕 전투기','P-51D Mustang Long Range Fighter USA','AIRCRAFT','USA','RETIRED','HIGH',
    '미국 P-51D. 메르린 엔진. 베를린까지 엄호비행. B-17 엄호 역전. 에이스 다수 양산.',
    {speed:'703km/h',crew:'1명',armament:'12.7mm M2×6',firstDeployed:'1944년(D형)'},
    ['P-51D','무스탕','베를린엄호','메르린','미국전투기'],['USAAF'],
    undefined,'https://en.wikipedia.org/wiki/North_American_P-51_Mustang',92),

  w('hist-ww2009','MG 42 독일 기관총','MG 42 German Machine Gun WWII','GROUND','GERMANY','RETIRED','HIGH',
    '독일 MG 42 범용기관총. 분당 1200발. "히틀러의 버즈소." 현재도 설계 계승(MG3).',
    {weight:'11.57kg',caliber:'7.92mm Mauser',fireRate:'1,200rpm',firstDeployed:'1942년'},
    ['MG42','독일기관총','1200rpm','히틀러버즈소','MG3계승'],['독일군'],
    undefined,'https://en.wikipedia.org/wiki/MG_42',92),

  w('hist-ww2010','M1 개런드 반자동소총','M1 Garand Semi-Auto Rifle WWII USA','GROUND','USA','RETIRED','LOW',
    '세계 최초 채용 반자동소총. 2차대전 미군 표준. 아이젠하워 "전쟁을 이긴 무기."',
    {weight:'4.37kg',caliber:'30-06 스프링필드',capacity:'8발 클립',firstDeployed:'1937년'},
    ['M1개런드','반자동소총','미국','2차대전','클립'],['스프링필드'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/M1_Garand_rifle_USA_noBG_new.png/330px-M1_Garand_rifle_USA_noBG_new.png','https://en.wikipedia.org/wiki/M1_Garand',88),

  // ── 한국전쟁 무기 ─────────────────────────────────────────────────────
  w('hist-kor001','MiG-15 한국전쟁','MiG-15 Fagot Korea War Soviet Jet','AIRCRAFT','RUSSIA','RETIRED','HIGH',
    '한국전쟁 MiG-15. 소련 제트전투기. 처음 F-86와 제트 공중전. 북한군 조종.',
    {speed:'1,076km/h',crew:'1명',armament:'23mm NR-23×2+37mm N-37',firstDeployed:'1949년'},
    ['MiG-15','한국전쟁','소련제트','F-86대결','북한'],['소련','북한공군'],
    undefined,'https://en.wikipedia.org/wiki/Mikoyan-Gurevich_MiG-15',90),

  w('hist-kor002','F-86 세이버 한국전쟁','F-86A/F Sabre USAF Korea War Fighter','AIRCRAFT','USA','RETIRED','HIGH',
    '미 F-86 세이버. MiG-15 대결 MiG 앨리. 10:1 격추비 달성. 미 제트전투 역사 시작.',
    {speed:'1,100km/h',crew:'1명',armament:'12.7mm M3×6',firstDeployed:'1949년'},
    ['F-86','세이버','한국전쟁','MiG앨리','10:1'],['USAF'],
    undefined,'https://en.wikipedia.org/wiki/North_American_F-86_Sabre',90),

  w('hist-kor003','T-34/85 북한 기갑','T-34/85 DPRK Armor Korea War','GROUND','RUSSIA','RETIRED','HIGH',
    '북한군 T-34/85. 1950년 6월 남침 핵심. 초기 미 보병 M20 바주카로는 무력. M4A3E8로 대응.',
    {weight:'32t',armament:'85mm ZIS-S-53',firstDeployed:'1950년(북한)',quantity:'240대(남침 당시)'},
    ['T-34','북한','6.25전쟁','남침','기갑'],['소련','북한군'],
    undefined,undefined,90),

  w('hist-kor004','M26 퍼싱 한국전쟁','M26 Pershing Heavy Tank Korea War','GROUND','USA','RETIRED','MED',
    'T-34/85 대응 미군 중전차. 90mm포. 인천상륙 이후 투입. 한국전쟁 반전 기여.',
    {weight:'41.9t',armament:'90mm M3 주포',crew:'5명',firstDeployed:'1944년(2차대전)/1950년(한국전)'},
    ['M26','퍼싱','한국전쟁','T-34대응','90mm'],['미육군'],
    undefined,'https://en.wikipedia.org/wiki/M26_Pershing',85),

  // ── 베트남전 ─────────────────────────────────────────────────────────
  w('hist-viet001','F-4E 팬텀 II 베트남','F-4E Phantom II Vietnam War Fighter-Bomber','AIRCRAFT','USA','RETIRED','HIGH',
    'F-4 팬텀 II. 베트남전 주력. AIM-7 스패로우 미사일 전기. 5,195대 생산. 11개국 수출.',
    {speed:'마하 2.23',crew:'2명',armament:'20mm M61A1·AIM-7·AIM-9·Mk82',firstDeployed:'1960년'},
    ['F-4E','팬텀II','베트남전','5195대','AIM-7'],['맥도넬더글러스'],
    undefined,'https://en.wikipedia.org/wiki/McDonnell_Douglas_F-4_Phantom_II',92),

  w('hist-viet002','UH-1D 휴이 베트남','UH-1D Iroquois Huey Vietnam Helicopter','HELICOPTER','USA','RETIRED','MED',
    '베트남전 상징 헬기. 의무후송·기동·공격. 베트남전 공중 기동전 혁명.',
    {speed:'217km/h',crew:'2+14명',armament:'M60D·M134 미니건',firstDeployed:'1959년'},
    ['UH-1','휴이','베트남전','의무후송','헬기혁명'],['벨'],
    undefined,'https://en.wikipedia.org/wiki/Bell_UH-1_Iroquois',92),

  w('hist-viet003','AK-47 북베트남 표준소총','AK-47 North Vietnam Viet Cong Assault Rifle','GROUND','RUSSIA','RETIRED','HIGH',
    '칼라슈니코프 AK-47. 베트남 공산군 표준. 정글 신뢰성 최고. 7000만 정 생산. 최다 생산 소총.',
    {weight:'4.3kg',caliber:'7.62×39mm',capacity:'30발',fireRate:'600rpm',firstDeployed:'1947년'},
    ['AK-47','칼라슈니코프','베트남','7000만정','최다생산'],['이제프스크조병창'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/AK-47_type_II_Part_DM-ST-89-01131.jpg/320px-AK-47_type_II_Part_DM-ST-89-01131.jpg','https://en.wikipedia.org/wiki/AK-47',95),

  // ── 냉전기 주요 무기 ─────────────────────────────────────────────────
  w('hist-cw001','SR-71 블랙버드','SR-71 Blackbird Mach 3 Recon USA','AIRCRAFT','USA','RETIRED','HIGH',
    '마하 3.2 고고도 정찰기. 격추 기록 없음. 1990년 퇴역. 여전히 기록 보유.',
    {speed:'마하 3.2+',ceiling:'25,900m',crew:'2명',firstDeployed:'1966년'},
    ['SR-71','블랙버드','마하3.2','고고도정찰','격추없음'],['록히드 스컹크웍스','USAF'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/SR-71_Blackbird.jpg/320px-SR-71_Blackbird.jpg',
    'https://en.wikipedia.org/wiki/Lockheed_SR-71_Blackbird',98),

  w('hist-cw002','U-2 고고도정찰기','U-2 Dragon Lady Recon USA USAF CIA','AIRCRAFT','USA','OPERATIONAL','HIGH',
    'U-2 현역. 1956년 취역 후 60년+ 운용. 소련 격추 파워스 사건. 현재도 U-2S 운용 중.',
    {ceiling:'21,300m',crew:'1명',firstDeployed:'1956년'},
    ['U-2','드래곤레이디','고고도정찰','파워스사건','현역'],['록히드 스컹크웍스','CIA·USAF'],
    undefined,'https://en.wikipedia.org/wiki/Lockheed_U-2',92),

  w('hist-cw003','B-1B 란서 전략폭격기','B-1B Lancer Low-Observable Bomber USA','AIRCRAFT','USA','OPERATIONAL','HIGH',
    'B-1B 가변익 전략폭격기. 내부 폭탄창 56,700kg. JASSM-ER·B61. 중동·유럽 임무.',
    {speed:'마하 1.25',crew:'4명',armament:'JASSM-ER·JDAM·GBU-28',firstDeployed:'1986년',quantity:'45기',manufacturer:'록웰'},
    ['B-1B','란서','가변익폭격기','대용량탄'],['록웰','USAF'],
    undefined,'https://en.wikipedia.org/wiki/Rockwell_B-1_Lancer',90),

  w('hist-cw004','F-117 나이트호크 스텔스','F-117A Nighthawk Stealth Fighter USA','AIRCRAFT','USA','RETIRED','HIGH',
    '세계 최초 스텔스 전투기. 걸프전 100% 임무 달성. 세르비아 격추 사례. 2008년 퇴역.',
    {speed:'마하 0.92',crew:'1명',armament:'GBU-27·GBU-10',firstDeployed:'1983년'},
    ['F-117','나이트호크','최초스텔스','걸프전','세르비아격추'],['록히드 스컹크웍스','USAF'],
    undefined,'https://en.wikipedia.org/wiki/Lockheed_F-117_Nighthawk',92),

  w('hist-cw005','SS-20 소련 중거리핵','RSD-10 Pioneer SS-20 Soviet IRBM','MISSILE','RUSSIA','RETIRED','CRITICAL',
    '소련 SS-20 피오니르 IRBM. INF 조약으로 1991년 전량 폐기. NATO 위기 촉발.',
    {range:'5,000km',payload:'핵탄두 3개(MIRV)',firstDeployed:'1977년'},
    ['SS-20','피오니르','소련IRBM','INF조약','NATO위기'],['소련'],
    undefined,'https://en.wikipedia.org/wiki/RSD-10_Pioneer',88),

  w('hist-cw006','M1 에이브람스 걸프전','M1A1 Abrams Gulf War 1991 Desert Storm','GROUND','USA','RETIRED','HIGH',
    'M1A1 걸프전 첫 대규모 실전. 이라크 T-72 일방적 격파. 아군 피격 0. 제4세대 전차 기준점.',
    {weight:'63t',armament:'120mm M256 활강포',crew:'4명',firstDeployed:'1991년(걸프전실전)'},
    ['M1A1','걸프전','사막의폭풍','T-72격파','아군피격0'],['미육군'],
    undefined,undefined,92),

  // ── 특별 카테고리: 노획·역설계 무기 ─────────────────────────────────────
  w('hist-cap001','중국 J-11 Su-27 복제','J-11B Su-27SK Reverse Engineered China','AIRCRAFT','CHINA','OPERATIONAL','HIGH',
    '러시아 Su-27SK 면허생산 후 무단 역설계. 중국산 엔진·레이더 교체. 러시아 항의. 200기+.',
    {speed:'마하 2.35',crew:'1명',armament:'PL-12·PL-8·30mm GSh-30-1',firstDeployed:'2000년(J-11)/2007년(B형)',quantity:'200기+',manufacturer:'선양항공'},
    ['J-11B','Su-27복제','중국역설계','무단카피','200기'],['선양항공','PLAAF'],
    undefined,'https://en.wikipedia.org/wiki/Shenyang_J-11',80),

  w('hist-cap002','북한 SA-2 KN-06 복제','KN-06 Pongae SA-2 Derivative DPRK SAM','SAM','DPRK','OPERATIONAL','HIGH',
    '북한 S-75/SA-2 계열 개량형. 사거리 150km 주장. 저고도 대응 추가.',
    {range:'150km(주장)',firstDeployed:'2017년(공개)',manufacturer:'북한 제2경제위원회'},
    ['KN-06','봉개','북한SA-2','역설계','사거리150'],['38North','CSIS'],
    undefined,undefined,65),

  // ── 다국적·특수무기 ─────────────────────────────────────────────────
  w('hist-mul001','F-4E 팬텀 이스라엘','F-4E Kurnass Israel Air Force Phantom','AIRCRAFT','USA','RETIRED','HIGH',
    '이스라엘 팬텀. 욤키푸르전 에이스 활약. F-16 전환 전 주력. 파이썬 3 탑재 개량.',
    {firstDeployed:'1969년(이스라엘)'},
    ['팬텀','이스라엘','욤키푸르전','쿠르나스'],['IAF'],
    undefined,undefined,85),

  w('hist-mul002','밀라노 ATGM 걸프전','Milan ATGM France Gulf War Anti-Tank','MISSILE','FRANCE','RETIRED','MED',
    '프랑스 밀라노 2세대 대전차. 걸프전·포클랜드·아프간 다수 실전. 3세대로 교체 중.',
    {range:'3km',payload:'HEAT',firstDeployed:'1972년'},
    ['밀라노','ATGM','걸프전','포클랜드','2세대대전차'],['MBDA','프랑스군'],
    undefined,'https://en.wikipedia.org/wiki/MILAN',82),

  w('hist-mul003','OTR-21 토치카 퇴역임박','OTR-21 Tochka-U SS-21 Scarab Russia Ukraine','MISSILE','RUSSIA','OPERATIONAL','HIGH',
    '소련 구형 SRBM. 우크라이나 양측 모두 사용. 정밀도 낮아 민간 피해 논란.',
    {range:'120km',payload:'482kg',firstDeployed:'1975년'},
    ['토치카U','SS-21','OTR-21','우크라이나양측','민간피해'],['소련·우크라이나·러시아'],
    undefined,'https://en.wikipedia.org/wiki/OTR-21_Tochka',80),

  w('hist-mul004','K1 전차 한국전쟁 직후 개발','K1 88-Tank First Korean MBT 1985','GROUND','ROK','RETIRED','MED',
    '한국 최초 독자 개발 전차. 미국 XM1 기술 이전. 1985년 배치. K1A2까지 진화.',
    {weight:'51.1t',armament:'105mm KM68A1 강선포',crew:'4명',firstDeployed:'1985년'},
    ['K1전차','한국최초전차','88전차','105mm','1985년'],['현대정공','국방부'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/K1A2_MBT.jpg/320px-K1A2_MBT.jpg','https://en.wikipedia.org/wiki/K1_88-Tank',88),

  w('hist-mul005','포클랜드 해전 엑조세','Exocet AM-39 Falklands War 1982','MISSILE','FRANCE','RETIRED','HIGH',
    '1982년 포클랜드 해전 슈퍼 에탕다르 발사 엑조세. 셰필드함·아틀란틱 컨베이어함 격침.',
    {range:'70km(AM-39)',payload:'165kg',firstDeployed:'1976년'},
    ['엑조세','포클랜드','1982년','셰필드','대함미사일역사'],['MBDA','아르헨티나'],
    undefined,undefined,90),

  w('hist-mul006','베트남전 AIM-4 팰콘 실패','AIM-4 Falcon Heat-Seeking Missile Vietnam','MISSILE','USA','RETIRED','LOW',
    'AIM-4 팰콘. 베트남전 공중전에서 MiG 요격 실패. 팔로우업 없음. 미사일 신화 붕괴.',
    {range:'8km',firstDeployed:'1956년'},
    ['AIM-4','팰콘','베트남실패','공중전역사','미사일신뢰성'],['USAF'],
    undefined,'https://en.wikipedia.org/wiki/Hughes_AIM-4_Falcon',75),

]
