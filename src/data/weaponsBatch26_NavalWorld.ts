import type { WeaponSystem } from './weapons'
const w = (id:string,name:string,nameEng:string,cat:WeaponSystem['category'],origin:WeaponSystem['origin'],status:WeaponSystem['status'],threat:WeaponSystem['threatRating'],desc:string,specs:WeaponSystem['specs'],tags:string[],sources:string[],img?:string,wiki?:string,conf=90): WeaponSystem=>({id,name,nameEng,category:cat,origin,status,threatRating:threat,description:desc,detail:`## ${nameEng}\n\n${desc}\n\n### 주요 제원\n${Object.entries(specs).filter(([,v])=>v).map(([k,v])=>`- ${k}: ${v}`).join('\n')}`,specs,confidence:conf,lastUpdated:'2026-07-03',relatedIntelIds:[],tags,sources,imageUrl:img,wikiUrl:wiki})

export const WEAPONS_BATCH26_NAVAL_WORLD: WeaponSystem[] = [

  // ── 미국 해군 추가 ────────────────────────────────────────────────────
  w('nw-usa001','USS Gerald R. Ford CVN-78','USS Gerald R. Ford CVN-78 Supercarrier','SHIP','USA','OPERATIONAL','HIGH',
    '세계 최대 항공모함. EMALS 전자기 발사시스템. 75기 탑재. 4,500명. 핵 추진. 차세대 CVN-79~81 건조 중.',
    {displacement:'100,000t',armament:'F-35C×48·E-2D·CMV-22B·CIWS',crew:'4,539명',firstDeployed:'2017년',manufacturer:'헌팅턴잉걸스'},
    ['포드함','CVN-78','핵추진항모','EMALS','슈퍼캐리어'],['헌팅턴잉걸스','USN'],
    undefined,'https://en.wikipedia.org/wiki/USS_Gerald_R._Ford',98),

  w('nw-usa002','줌왈트급 DDG-1000','DDG-1000 Zumwalt-class Destroyer','SHIP','USA','OPERATIONAL','HIGH',
    '미 차세대 스텔스 구축함. 155mm AGS 자동포·레이더 반사 최소화 설계. 3척 취역. 극초음속미사일 탑재 개조 중.',
    {displacement:'15,656t',armament:'155mm AGS·RGM-109·RIM-162 ESSM·Mk57 VLS',crew:'148명',firstDeployed:'2016년',quantity:'3척',manufacturer:'바스아이언웍스'},
    ['줌왈트','DDG-1000','스텔스구축함','155mm','극초음속'],['바스','USN'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/USS_Zumwalt_%28DDG-1000%29_steams_through_the_Atlantic_Ocean_%28161017-N-ZW825-058%29.jpg/320px-USS_Zumwalt_%28DDG-1000%29_steams_through_the_Atlantic_Ocean_%28161017-N-ZW825-058%29.jpg','https://en.wikipedia.org/wiki/Zumwalt-class_destroyer',90),

  w('nw-usa003','버지니아급 SSN 블록5','Virginia-class SSN Block V Submarine','SUBMARINE','USA','OPERATIONAL','HIGH',
    '버지니아급 블록5. 페이로드 모듈(VPM) 추가 40기 토마호크. AUKUS 협력 기반. 128셀 VLS.',
    {displacement:'10,200t(블록5)',armament:'토마호크×128·Mk48 어뢰',crew:'135명',firstDeployed:'2020년(블록5)',manufacturer:'제너럴다이나믹스/HII'},
    ['버지니아급','블록5','공격핵잠','VPM','AUKUS'],['GD','USN'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Virginia_class_submarine.jpg/320px-Virginia_class_submarine.jpg','https://en.wikipedia.org/wiki/Virginia-class_submarine',95),

  w('nw-usa004','컨스텔레이션급 FFG-62','FFG-62 Constellation-class Frigate','SHIP','USA','DEVELOPMENT','MED',
    '미 해군 신형 호위함. FREMM 기반. SM-2·NSM·Mk41 VLS 32셀. 2026년 취역 목표.',
    {displacement:'7,400t',armament:'SM-2·NSM·Mk41 VLS 32셀·MH-60',crew:'200명',firstDeployed:'2026년(예정)',quantity:'20척(계획)',manufacturer:'파르피드마린'},
    ['컨스텔레이션','FFG-62','호위함','FREMM기반'],['파르피드마린','USN'],
    undefined,undefined,82),

  w('nw-usa005','시울프급 SSN-21','Seawolf-class SSN Attack Submarine','SUBMARINE','USA','OPERATIONAL','HIGH',
    '미 최강 핵추진 공격잠수함. 냉전 말기 설계. 8개 어뢰관·50발. 가장 조용하고 빠른 잠수함.',
    {displacement:'9,137t',armament:'Mk48×50·토마호크·하푼',crew:'126명',firstDeployed:'1997년',quantity:'3척',manufacturer:'제너럴다이나믹스'},
    ['시울프','SSN-21','공격핵잠','가장조용한'],['GD','USN'],
    undefined,'https://en.wikipedia.org/wiki/Seawolf-class_submarine',95),

  // ── 중국 해군 추가 ────────────────────────────────────────────────────
  w('nw-chn001','푸젠함 CV-18 항모','Fujian CV-18 Carrier China CATOBAR','SHIP','CHINA','OPERATIONAL','HIGH',
    '중국 3번째 항모. 전자기 발사(EMALS 유사) 최초 적용. 80기 탑재. J-35·J-15T 운용.',
    {displacement:'80,000t+(추정)',armament:'J-35·J-15T·HHQ-10 CIWS',crew:'3,000명+(추정)',firstDeployed:'2024년',manufacturer:'강남조선'},
    ['푸젠함','CV-18','CATOBAR','J-35','중국항모'],['강남조선','PLAN'],
    undefined,'https://en.wikipedia.org/wiki/Chinese_aircraft_carrier_Fujian',85),

  w('nw-chn002','055형 만톤 구축함','Type 055 Renhai-class Destroyer','SHIP','CHINA','OPERATIONAL','HIGH',
    '중국 최강 구축함. 12,000t급. 112셀 VLS. HHQ-9B·YJ-18A. 미 티콘데로가급 초과.',
    {displacement:'12,000t',armament:'HHQ-9B·YJ-18A·HHQ-10·112셀VLS',crew:'280명',firstDeployed:'2020년',quantity:'8척',manufacturer:'강남/다련조선'},
    ['055형','렌하이급','만톤구축함','112셀VLS'],['강남조선','PLAN'],
    undefined,'https://en.wikipedia.org/wiki/Renhai-class_cruiser',90),

  w('nw-chn003','096형 핵잠수함','Type 096 SSBN China Next-Gen','SUBMARINE','CHINA','DEVELOPMENT','HIGH',
    '중국 차세대 탄도미사일 핵잠수함. JL-3 24발 탑재(추정). 2025년+ 취역 예상. 094 대체.',
    {displacement:'18,000t+(추정)',armament:'JL-3×24',firstDeployed:'2025년+(추정)',manufacturer:'후루다오조선'},
    ['096형','SSBN','JL-3','핵잠','핵억제'],['후루다오','PLAN'],
    undefined,undefined,60),

  w('nw-chn004','054A형 자위함','Type 054A Jiangkai-class Frigate','SHIP','CHINA','OPERATIONAL','HIGH',
    '중국 표준 호위함. 32셀 HHQ-16·YJ-83·H/PJ-26 100mm. 파키스탄·방글라데시 수출.',
    {displacement:'4,053t',armament:'HHQ-16×32·YJ-83×8·100mm포',crew:'165명',firstDeployed:'2007년',quantity:'30척',manufacturer:'중국각 조선소'},
    ['054A','자위함','호위함','파키스탄수출'],['중국조선','PLAN'],
    undefined,'https://en.wikipedia.org/wiki/Type_054A_frigate',88),

  w('nw-chn005','022형 미사일정','Type 022 Houbei-class Missile Boat','SHIP','CHINA','OPERATIONAL','MED',
    '중국 초고속 미사일 쌍동선. YJ-83 8발. 220노트. 연안 타격. 대만해협 봉쇄 핵심.',
    {displacement:'220t',armament:'YJ-83×8·30mm CIWS',crew:'12명',speed:'100km/h(54노트)',firstDeployed:'2004년',quantity:'60척',manufacturer:'중국각 조선소'},
    ['022형','호우베이','미사일정','쌍동선','대만해협'],['PLAN'],
    undefined,'https://en.wikipedia.org/wiki/Type_022_missile_boat',82),

  // ── 러시아 해군 추가 ────────────────────────────────────────────────
  w('nw-rus001','보레이-A급 SSBN','Borei-A class SSBN Russia','SUBMARINE','RUSSIA','OPERATIONAL','HIGH',
    '러시아 차세대 탄도미사일 핵잠수함. Bulava 16발. 4세대. 2027년까지 10척 취역 목표.',
    {displacement:'24,000t',armament:'RSM-56 Bulava×16·어뢰관 6문',crew:'107명',firstDeployed:'2012년',quantity:'5척+건조중',manufacturer:'세베로드빈스크'},
    ['보레이A','SSBN','불라바','핵잠','러시아핵'],['세베로드빈스크','러시아해군'],
    undefined,'https://en.wikipedia.org/wiki/Borei-class_submarine',88),

  w('nw-rus002','야센-M급 SSGN','Yasen-M class SSGN Russia','SUBMARINE','RUSSIA','OPERATIONAL','HIGH',
    '러시아 최신 다목적 핵잠수함. 32셀 Kalibr·Onyx·Zircon. 냉전 이후 최강 러시아 잠수함.',
    {displacement:'13,800t',armament:'Kalibr·Onyx·Zircon×32·어뢰관 10문',crew:'90명',firstDeployed:'2013년',quantity:'5척+건조중',manufacturer:'세베로드빈스크'},
    ['야센M','SSGN','지르콘','칼리버','러시아핵잠'],['세베로드빈스크','러시아해군'],
    undefined,'https://en.wikipedia.org/wiki/Yasen-class_submarine',88),

  w('nw-rus003','키로프급 순양함 나히모프','Kirov-class Battlecruiser Nakhimov Refit','SHIP','RUSSIA','DEVELOPMENT','HIGH',
    '러시아 나히모프 키로프급 개조 복귀. Zircon·Kalibr·S-500 통합. 2026년 복귀 예상. 세계 최대 순양함.',
    {displacement:'28,000t',armament:'Zircon·Kalibr·P-700 그라닛·S-500',crew:'727명',firstDeployed:'1988년(나히모프)/2026년(재복귀)',manufacturer:'발틱조선'},
    ['나히모프','키로프급','지르콘','S-500','전투순양함'],['발틱조선','러시아해군'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Kirov-class_battlecruiser.jpg/330px-Kirov-class_battlecruiser.jpg','https://en.wikipedia.org/wiki/Kirov-class_battlecruiser',72),

  w('nw-rus004','카라칼 Kilo-III급 636.3','Project 636.3 Kilo-III Submarine','SUBMARINE','RUSSIA','OPERATIONAL','HIGH',
    '킬로 3세대 개량형. 6셀 Kalibr 크루즈미사일. 시리아·우크라이나 공격에 사용.',
    {displacement:'3,950t',armament:'Kalibr-PL×6·어뢰관 6문',crew:'52명',firstDeployed:'2014년(636.3)',quantity:'6척(흑해함대)',manufacturer:'크라스노야르스크'},
    ['636.3','킬로III','칼리버','흑해함대','우크라이나'],['크라스노야르스크','러시아해군'],
    undefined,'https://en.wikipedia.org/wiki/Kilo-class_submarine',88),

  // ── 유럽 해군 추가 ────────────────────────────────────────────────────
  w('nw-eu001','퀸 엘리자베스급 항모','HMS Queen Elizabeth CVF Carrier','SHIP','UK','OPERATIONAL','HIGH',
    '영국 신형 항공모함. F-35B 36기 탑재. 65,000t. STOVL. 2017년 취역.',
    {displacement:'65,000t',armament:'F-35B×36·Phalanx CIWS·Sea Ceptor',crew:'1,600명',firstDeployed:'2017년',quantity:'2척',manufacturer:'BAE Systems'},
    ['퀸엘리자베스','항모','F-35B','영국항모','STOVL'],['BAE','영국해군'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/HMS_Queen_Elizabeth_%28R08%29_in_the_Solent_in_2018_%28cropped%29.jpg/320px-HMS_Queen_Elizabeth_%28R08%29_in_the_Solent_in_2018_%28cropped%29.jpg','https://en.wikipedia.org/wiki/Queen_Elizabeth-class_aircraft_carrier',95),

  w('nw-eu002','프레데릭급 FREMM 이탈리아','FREMM Bergamini-class Frigate Italy','SHIP','NATO','OPERATIONAL','MED',
    '이탈리아 FREMM 호위함. Aster 15/30·MILAS 대잠. 10척 계획. 프랑스 Bretagne급과 설계공유.',
    {displacement:'6,700t',armament:'Aster 15/30·MILAS·127mm OTO',crew:'200명',firstDeployed:'2013년',quantity:'10척(계획)',manufacturer:'핀칸티에리'},
    ['FREMM','이탈리아','베르가미니','Aster30'],['핀칸티에리','이탈리아해군'],
    undefined,'https://en.wikipedia.org/wiki/FREMM_multipurpose_frigate',88),

  w('nw-eu003','F125 바덴-뷔르템베르크급','F125 Baden-Württemberg Frigate Germany','SHIP','GERMANY','OPERATIONAL','MED',
    '독일 최신 호위함. 7,200t. 해상 안보·지속작전 최적화. RAM·Harpoon. 4척 취역.',
    {displacement:'7,200t',armament:'하푼 블록 II·RAM·127mm AG자동포',crew:'120명(최소화)',firstDeployed:'2019년',quantity:'4척',manufacturer:'TKMS'},
    ['F125','독일호위함','바덴뷔르템베르크'],['TKMS','독일해군'],
    undefined,'https://en.wikipedia.org/wiki/Baden-W%C3%BCrttemberg-class_frigate',85),

  w('nw-eu004','오르카급 핵잠 프랑스','Suffren-class Barracuda SSGN France','SUBMARINE','FRANCE','OPERATIONAL','HIGH',
    '프랑스 차세대 핵추진 공격잠수함. Barracuda. SCALP Naval·Black Shark. 6척 계획.',
    {displacement:'5,300t',armament:'SCALP Naval·F21 어뢰',crew:'63명',firstDeployed:'2022년',quantity:'2척+건조중',manufacturer:'나발그룹'},
    ['쉬프랑','바라쿠다','SSGN','프랑스핵잠','SCALP'],['나발그룹','프랑스해군'],
    undefined,'https://en.wikipedia.org/wiki/Suffren-class_submarine',90),

  w('nw-eu005','호르헤 후안급 호위함 스페인','Álvaro de Bazán F-100 Frigate Spain','SHIP','SPAIN','OPERATIONAL','HIGH',
    '스페인 F-100 이지스 호위함. SPY-1D 레이더. SM-2·Harpoon. 5척. 호주 ANZAC급 설계 기반.',
    {displacement:'5,802t',armament:'SM-2·하푼·SM-1·48셀 Mk41 VLS',crew:'250명',firstDeployed:'2002년',quantity:'5척',manufacturer:'나반티아'},
    ['F-100','스페인','이지스','SPY-1D','SM-2'],['나반티아','스페인해군'],
    undefined,'https://en.wikipedia.org/wiki/%C3%81lvaro_de_Baz%C3%A1n-class_frigate',88),

  w('nw-eu006','HNLMS 드 젤란드 호위함','HNLMS De Zeven Provinciën frigate Netherlands','SHIP','NETHERLANDS','OPERATIONAL','HIGH',
    '네덜란드 방공 호위함. SM-2·ESSM·Harpoon. 발트해·NATO 핵심 방공.',
    {displacement:'6,048t',armament:'SM-2·ESSM·하푼·127mm',crew:'202명',firstDeployed:'2002년',quantity:'4척',manufacturer:'방·리에더'},
    ['드젤란드','네덜란드','방공호위함','SM-2'],['네덜란드해군'],
    undefined,'https://en.wikipedia.org/wiki/De_Zeven_Provinci%C3%ABn-class_frigate',85),

  // ── 일본 해군 추가 ────────────────────────────────────────────────────
  w('nw-jpn001','마야급 이지스함','DDG-179 Maya Aegis Destroyer Japan','SHIP','JAPAN','OPERATIONAL','HIGH',
    '일본 최신 이지스 구축함. SM-3 블록IIA. BMD 능력. SPY-6(예정) 업그레이드.',
    {displacement:'8,200t',armament:'SM-3 블록IIA·SM-2·RUM-139·96셀 VLS',crew:'300명',firstDeployed:'2020년',quantity:'2척',manufacturer:'JMU'},
    ['마야급','이지스','SM-3','BMD','일본'],['JMU','해상자위대'],
    undefined,'https://en.wikipedia.org/wiki/Maya-class_destroyer',90),

  w('nw-jpn002','이즈모급 경항모 개조','JS Izumo DDH-183 to CVL Conversion','SHIP','JAPAN','DEVELOPMENT','HIGH',
    '이즈모 헬기호위함 경항모 개조. F-35B 탑재. 2028년 완전 개조 목표. 헌법 논란.',
    {displacement:'27,000t',armament:'F-35B×12·Sea RAM·SeaSparrow',crew:'520명',firstDeployed:'2015년(DDH)/2024년(개조)',manufacturer:'JMU'},
    ['이즈모','경항모','F-35B','일본항모','개조'],['JMU','해상자위대'],
    undefined,'https://en.wikipedia.org/wiki/JS_Izumo',88),

  w('nw-jpn003','소류급 재래식 잠수함','Sōryū-class Submarine Japan AIP','SUBMARINE','JAPAN','OPERATIONAL','HIGH',
    '일본 재래식 최강 잠수함. AIP(스털링) 탑재. 89식 어뢰·하푼. 적 잠수함 추적 탁월.',
    {displacement:'4,200t(수중)',armament:'89식 어뢰·RGM-84 하푼',crew:'65명',firstDeployed:'2009년',quantity:'12척',manufacturer:'가와사키/미쓰비시'},
    ['소류급','AIP','일본잠수함','스털링'],['가와사키','해상자위대'],
    undefined,'https://en.wikipedia.org/wiki/S%C5%8Dry%C5%AB-class_submarine',90),

  // ── 인도 해군 ─────────────────────────────────────────────────────────
  w('nw-ind001','INS 비크란트 항모','INS Vikrant CVN India','SHIP','INDIA','OPERATIONAL','HIGH',
    '인도 독자 건조 첫 항공모함. 45,000t. MiG-29K·해상 Ka-31. 중국 항모에 대응.',
    {displacement:'45,000t',armament:'MiG-29K×26·Ka-31·AK-630 CIWS',crew:'1,700명',firstDeployed:'2022년',manufacturer:'코친조선'},
    ['비크란트','인도항모','독자건조','MiG-29K'],['코친조선','인도해군'],
    undefined,'https://en.wikipedia.org/wiki/INS_Vikrant_(2013)',88),

  w('nw-ind002','아리한트급 SSBN 인도','INS Arihant SSBN India','SUBMARINE','INDIA','OPERATIONAL','HIGH',
    '인도 최초 핵추진 탄도미사일 잠수함. K-15 사가리카 12발. 러시아 기술 지원.',
    {displacement:'6,000t',armament:'K-15 사가리카×12(또는 K-4×4)',crew:'95명',firstDeployed:'2016년',manufacturer:'비사카파트남'},
    ['아리한트','인도SSBN','K-15','핵억제'],['인도해군','DRDO'],
    undefined,'https://en.wikipedia.org/wiki/Arihant-class_submarine',80),

  // ── 이스라엘 해군 ─────────────────────────────────────────────────────
  w('nw-isr001','사르 6급 코르벳','Sa\'ar 6-class Corvette Israel','SHIP','ISRAEL','OPERATIONAL','HIGH',
    '이스라엘 최신 코르벳. 독일 MEKO-A100 기반. C-Dome 방공·가브리엘 V 대함. 4척 취역.',
    {displacement:'1,900t',armament:'C-Dome·가브리엘V·바라크-8',crew:'70명',firstDeployed:'2020년',quantity:'4척',manufacturer:'TKMS·이스라엘'},
    ['사르6','코르벳','C-Dome','가브리엘V'],['TKMS','이스라엘해군'],
    undefined,'https://en.wikipedia.org/wiki/Sa%27ar_6-class_corvette',88),

  w('nw-isr002','돌핀 II 잠수함','Dolphin II-class Submarine Israel','SUBMARINE','ISRAEL','OPERATIONAL','HIGH',
    '이스라엘 돌핀 II급 잠수함. AIP. 핵순항미사일 탑재 의혹. 이란 억제 핵심.',
    {displacement:'1,900t',armament:'포세이돈어뢰·하푼·핵순항미사일(의혹)',crew:'35명',firstDeployed:'2014년',quantity:'3척',manufacturer:'TKMS'},
    ['돌핀II','이스라엘잠수함','AIP','핵의혹'],['TKMS','이스라엘해군'],
    undefined,'https://en.wikipedia.org/wiki/Dolphin-class_submarine',80),

  // ── 북한 해군 ─────────────────────────────────────────────────────────
  w('nw-dprk001','영웅급 SLBM 잠수함','Hero Kim Kun Ok SSBN DPRK','SUBMARINE','DPRK','DEVELOPMENT','CRITICAL',
    '북한 최초 전술핵 탄도잠수함. 2023년 9월 진수. 구형 재래식 잠수함 개조. 실전 능력 의문.',
    {displacement:'2,000t+(추정)',armament:'북극성-3·4형 SLBM',crew:'추정 60명',firstDeployed:'2023년(진수)',manufacturer:'신포조선소'},
    ['영웅함','DPRK잠수함','SLBM','북극성','북한핵'],['북한조선중앙','38North'],
    undefined,undefined,55),

  w('nw-dprk002','신포급 Romeo 개조 잠수함','Sinpo-class Modified Romeo Submarine','SUBMARINE','DPRK','OPERATIONAL','HIGH',
    '북한 Romeo급 잠수함 SLBM 발사 개조형. 북극성-1 SLBM 시험발사. 수중 발사 능력.',
    {displacement:'1,800t(추정)',armament:'북극성-1 SLBM×1~2',firstDeployed:'2015년(SLBM시험)',manufacturer:'신포조선소'},
    ['신포급','북한잠수함','북극성1','SLBM개조'],['38North','CSIS'],
    undefined,undefined,65),

  // ── 이란 해군 ─────────────────────────────────────────────────────────
  w('nw-irn001','이란 파테-110A 대함미사일','Fateh-110A Anti-Ship Missile Iran','MISSILE','IRAN','OPERATIONAL','HIGH',
    '이란 Fateh-110 단거리 탄도미사일 대함형. 300km. 호르무즈 해협 봉쇄 핵심. 후티에 공급.',
    {range:'300km',payload:'650kg',firstDeployed:'2010년대',manufacturer:'이란 방위부'},
    ['파테110A','이란','대함미사일','호르무즈','후티'],['이란국방부','IRGC'],
    undefined,undefined,72),

  w('nw-irn002','이란 퀼라아트급 잠수함','Ghadir-class Midget Submarine Iran','SUBMARINE','IRAN','OPERATIONAL','HIGH',
    '이란 가디르급 소형 잠수함. 21척 이상. 호르무즈 해협 기뢰부설·어뢰 공격. 비대칭 해전.',
    {displacement:'120t',armament:'533mm 어뢰관 2문',crew:'18명',firstDeployed:'2007년',quantity:'21척',manufacturer:'이란 해군'},
    ['가디르급','이란잠수함','소형잠수함','호르무즈'],['IRGC','이란해군'],
    undefined,undefined,75),

  // ── 터키 해군 ─────────────────────────────────────────────────────────
  w('nw-tur001','밀게름급 호위함 터키','Milgem-class Corvette Turkey','SHIP','TURKEY','OPERATIONAL','MED',
    '터키 독자 개발 코르벳. 2,400t. Harpoon·RAM·CIWS. 파키스탄·우크라이나 수출.',
    {displacement:'2,400t',armament:'하푼·RIM-116·Mk56 VLS·OTO76mm',crew:'100명',firstDeployed:'2011년',quantity:'4척+',manufacturer:'이스탄불조선'},
    ['밀게름','터키코르벳','독자개발','파키스탄수출'],['이스탄불조선','터키해군'],
    undefined,'https://en.wikipedia.org/wiki/Milgem-class_corvette',85),

  w('nw-tur002','아나돌루 경항모 터키','TCG Anadolu L-400 LHD Turkey','SHIP','TURKEY','OPERATIONAL','MED',
    '터키 LHD 상륙함. 스페인 후안카를로스 I 기반. TB3 무인기 탑재 최초. F-35B 대신 UCAV.',
    {displacement:'27,079t',armament:'TB3 UCAV×50·시호크·AK-630',crew:'550명+',firstDeployed:'2023년',manufacturer:'세데프'},
    ['아나돌루','터키경항모','TB3','LHD'],['세데프','터키해군'],
    undefined,'https://en.wikipedia.org/wiki/TCG_Anadolu',85),

  // ── 기타 주요 해군 ────────────────────────────────────────────────────
  w('nw-aus001','Hunter급 호위함 호주','Hunter-class BAE26 Frigate Australia','SHIP','AUSTRALIA','DEVELOPMENT','MED',
    '호주 차세대 호위함. BAE Type 26 기반. 26셀 Mk41·SM-2·CAMM. 9척 계획. 2030년 취역.',
    {displacement:'9,900t',armament:'SM-2·CAMM·MU90 어뢰·MH-60R',crew:'200명',firstDeployed:'2031년(예정)',quantity:'9척(계획)',manufacturer:'BAE Systems'},
    ['헌터급','호주','Type26기반','SM-2','CAMM'],['BAE','호주해군'],
    undefined,undefined,78),

  w('nw-bra001','리아추엘루급 잠수함 브라질','Riachuelo-class SSK Submarine Brazil','SUBMARINE','BRAZIL','OPERATIONAL','MED',
    '브라질 나발그룹 협력 잠수함. F21 어뢰·엑조세 SM39. 5척 계획. 핵잠 SSBN 개발 중.',
    {displacement:'2,000t',armament:'F21 어뢰·SM39 엑조세',crew:'45명',firstDeployed:'2022년',quantity:'5척(계획)',manufacturer:'Itaguaí조선/나발그룹'},
    ['리아추엘루','브라질잠수함','나발그룹'],['나발그룹','브라질해군'],
    undefined,undefined,80),

  w('nw-sgp001','인빈시블급 잠수함 싱가포르','Invincible-class Submarine Singapore','SUBMARINE','SINGAPORE','DEVELOPMENT','MED',
    '싱가포르 차세대 잠수함. 독일 Type 218SG. AIP·리튬이온. IDAS 미사일.',
    {displacement:'2,000t',armament:'IDAS·어뢰',crew:'28명',firstDeployed:'2024년+(예정)',quantity:'4척',manufacturer:'TKMS'},
    ['인빈시블','싱가포르','Type218SG','AIP'],['TKMS','싱가포르해군'],
    undefined,undefined,82),

  w('nw-pkd001','파키스탄 아고스타-90B 핵어뢰','Agosta-90B Hamza Pakistan Extended','SUBMARINE','FRANCE','OPERATIONAL','HIGH',
    '파키스탄 3번 아고스타. 핵 어뢰 옵션. 인도 억제 핵심.',
    {displacement:'1,760t',armament:'어뢰관 4문·SM-39 엑조세',crew:'36명',firstDeployed:'2008년'},
    ['아고스타90B','파키스탄','핵어뢰','인도억제'],['나발그룹','파키스탄해군'],
    undefined,undefined,75),

  // ── 수상함 무기 추가 ─────────────────────────────────────────────────
  w('nw-wpn001','하푼 블록II 대함미사일','RGM-84L Harpoon Block II Anti-Ship Missile','MISSILE','USA','OPERATIONAL','HIGH',
    '세계 가장 많이 사용되는 대함미사일. 100개국+ 운용. 지상·함·잠·공 발사형. GPS 추가.',
    {range:'280km(블록II)',payload:'221kg 반갑입자탄두',speed:'마하 0.85',firstDeployed:'1977년(블록II: 2000년대)',manufacturer:'보잉'},
    ['하푼','블록II','대함미사일','100개국'],['보잉','USN'],
    undefined,'https://en.wikipedia.org/wiki/Harpoon_(missile)',95),

  w('nw-wpn002','NSM 해군타격미사일','Naval Strike Missile NSM Norway','MISSILE','NORWAY','OPERATIONAL','HIGH',
    '노르웨이 콩스베르크 스텔스 대함미사일. 200kg 탄두. 해면밀착비행. 리투아니아·독일·미국 도입.',
    {range:'200km',payload:'125kg',speed:'마하 0.9',firstDeployed:'2012년',manufacturer:'콩스베르크'},
    ['NSM','노르웨이','스텔스대함','해면밀착'],['콩스베르크','노르웨이해군'],
    undefined,'https://en.wikipedia.org/wiki/Naval_Strike_Missile',90),

  w('nw-wpn003','엑조세 AM-39 Block3','Exocet AM-39 Block 3 Anti-Ship','MISSILE','FRANCE','OPERATIONAL','HIGH',
    '프랑스 엑조세 대함미사일 개량형. 180km. GPS+INS+능동레이더. 공중·함·잠수함 발사형.',
    {range:'180km(AM39)',payload:'165kg',speed:'마하 0.9',firstDeployed:'2007년(블록3)',manufacturer:'MBDA'},
    ['엑조세','AM-39','프랑스대함','대함미사일'],['MBDA','프랑스해군'],
    undefined,'https://en.wikipedia.org/wiki/Exocet',90),

  w('nw-wpn004','청상어 경어뢰 한국','Blue Shark K745 Lightweight Torpedo ROK','MISSILE','ROK','OPERATIONAL','MED',
    '한국 독자 개발 경어뢰. 헬기·P-3C·대잠헬기 탑재. 호밍 유도. 속도 45노트.',
    {weight:'280kg',range:'19km',speed:'45노트',firstDeployed:'2004년',manufacturer:'LIG넥스원'},
    ['청상어','한국어뢰','경어뢰','대잠','K745'],['LIG넥스원','해군'],
    undefined,undefined,88),

  w('nw-wpn005','홍상어 대잠어뢰','Cheongsang Red Shark ASROC Korea','MISSILE','ROK','OPERATIONAL','HIGH',
    '한국 함발사 대잠로켓. 이지스함 탑재. 20km+ 사거리. 청상어 어뢰 투하.',
    {range:'20km+',firstDeployed:'2011년',manufacturer:'LIG넥스원'},
    ['홍상어','대잠로켓','ASROC','이지스함','한국'],['LIG넥스원','해군'],
    undefined,undefined,85),

  w('nw-wpn006','Mk41 VLS 수직발사','Mk41 Vertical Launch System Universal','MISSILE','USA','OPERATIONAL','HIGH',
    '미국 표준 수직발사시스템. 세계 30여국 도입. SM-2·SM-3·SM-6·토마호크·ESSM 호환.',
    {armament:'SM-2/3/6·토마호크·ESSM',firstDeployed:'1986년',manufacturer:'록히드마틴'},
    ['Mk41','VLS','수직발사','SM-2','토마호크'],['록히드마틴','USN'],
    undefined,'https://en.wikipedia.org/wiki/Mark_41_Vertical_Launching_System',98),

  w('nw-wpn007','팔랑크스 CIWS','Phalanx CIWS Close-In Weapon System','GROUND','USA','OPERATIONAL','HIGH',
    '미국 20mm 개틀링포 대미사일 방어. 4,500rpm. 세계 최다 함정 탑재 CIWS.',
    {armament:'20mm M61A1 6연장',range:'1,500m',fireRate:'4,500rpm',firstDeployed:'1980년',manufacturer:'레이시언'},
    ['팔랑크스','CIWS','20mm','방미사일','함정방어'],['레이시언','USN'],
    undefined,'https://en.wikipedia.org/wiki/Phalanx_CIWS',95),

  w('nw-wpn008','SM-6 블록1B 다목적미사일','SM-6 Block 1B Multi-Mission Missile','MISSILE','USA','OPERATIONAL','HIGH',
    'SM-6 개량형. 대함·대공·탄도미사일 요격 3중 역할. 사거리 400km. 극초음속 목표 요격 연구.',
    {range:'400km+(추정)',firstDeployed:'2013년(SM-6)/2021년(블록1B)',manufacturer:'레이시언'},
    ['SM-6','블록1B','다목적','대함','탄도미사일요격'],['레이시언','USN'],
    undefined,'https://en.wikipedia.org/wiki/RIM-174_Standard_ERAM',88),

  w('nw-wpn009','모스키트 SS-N-22 대함','P-270 Moskit Sunburn Anti-Ship Missile','MISSILE','RUSSIA','OPERATIONAL','HIGH',
    '러시아 초음속 대함미사일. 마하 2.8. 중국 PLAN 도입. 미 항모 위협.',
    {speed:'마하 2.8',range:'250km',payload:'300kg',firstDeployed:'1984년',manufacturer:'라둬르 설계국'},
    ['모스키트','Sunburn','초음속대함','P-270'],['러시아','PLAN수출'],
    undefined,'https://en.wikipedia.org/wiki/P-270_Moskit',82),

  w('nw-wpn010','이스라엘 C-Dome 함상방공','C-Dome Naval Iron Dome CIWS','SAM','ISRAEL','OPERATIONAL','HIGH',
    '아이언돔의 함상형. 사르 6급 코르벳 탑재. 드론·미사일·로켓 요격. 가자 해상 방어.',
    {range:'70km',firstDeployed:'2020년',manufacturer:'라파엘'},
    ['C-Dome','함상아이언돔','이스라엘','대드론','해상방어'],['라파엘','이스라엘해군'],
    undefined,undefined,88),

]
