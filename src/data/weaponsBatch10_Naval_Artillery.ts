import type { WeaponSystem } from './weapons'
const w = (id:string,name:string,nameEng:string,cat:WeaponSystem['category'],origin:WeaponSystem['origin'],status:WeaponSystem['status'],threat:WeaponSystem['threatRating'],desc:string,specs:WeaponSystem['specs'],tags:string[],sources:string[],img?:string,wiki?:string,conf=88): WeaponSystem=>({id,name,nameEng,category:cat,origin,status,threatRating:threat,description:desc,detail:`## ${nameEng}\n\n${desc}\n\n### 주요 제원\n${Object.entries(specs).filter(([,v])=>v).map(([k,v])=>`- ${k}: ${v}`).join('\n')}`,specs,confidence:conf,lastUpdated:'2026-07-01',relatedIntelIds:[],tags,sources,imageUrl:img,wikiUrl:wiki})

export const WEAPONS_BATCH10_NAVAL_ARTILLERY: WeaponSystem[] = [

  // ── 미국 해군 수상함 ──────────────────────────────────────────────────────
  w('nav-usa001','제럴드 포드급 항모 (CVN-78)','USS Gerald R. Ford CVN-78','NAVAL','USA','OPERATIONAL','LOW',
    '세계 최강 핵항모. 100,000t+. EMALS 전자기사출. 90기 탑재. F-35C 통합. 2017년 취역.',
    {displacement:'100,000t+',armament:'F-35C·F/A-18E/F·EA-18G 90기+·ESSM·SM-6·팰렁크스·RAM',crew:'4,539명',speed:'30노트+',firstDeployed:'2017년',manufacturer:'헌팅턴 잉걸스'},
    ['포드급','CVN-78','핵항모','EMALS','세계최강'],['HII','미해군'],
    undefined,'https://en.wikipedia.org/wiki/USS_Gerald_R._Ford',99),

  w('nav-usa002','줌월트급 구축함 (DDG-1000)','USS Zumwalt DDG-1000 Destroyer','NAVAL','USA','OPERATIONAL','LOW',
    '스텔스 구축함. 15,000t. 155mm AGS 함포(퇴역예정)→레일건·레이저 전환 예정. 3척.',
    {displacement:'15,000t',armament:'155mm AGS×2(→레일건 전환계획)·Mk57 VLS 80셀',crew:'147명',speed:'30노트',firstDeployed:'2016년',manufacturer:'바스 아이언웍스'},
    ['줌월트','DDG-1000','스텔스구축함','레일건','레이저'],['바스 아이언웍스','미해군'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/USS_Zumwalt_%28DDG-1000%29_steams_through_the_Atlantic_Ocean_%28161017-N-ZW825-058%29.jpg/320px-USS_Zumwalt_%28DDG-1000%29_steams_through_the_Atlantic_Ocean_%28161017-N-ZW825-058%29.jpg','https://en.wikipedia.org/wiki/Zumwalt-class_destroyer',90),

  w('nav-usa003','알레이버크급 플라이트 III','Arleigh Burke-class Flight III Destroyer','NAVAL','USA','OPERATIONAL','LOW',
    '미 주력 이지스 구축함. 플라이트 III: SPY-6 레이더·SM-6·SM-3 Blk IIA. 96척+.',
    {displacement:'9,700t',armament:'VLS 96셀·SM-6·SM-3·하푼·5인치 62구경',crew:'330명',speed:'30노트',firstDeployed:'2021년(Flt III)',manufacturer:'HII·배스 아이언웍스'},
    ['알레이버크','Flt III','이지스구축함','SPY-6','SM-6'],['HII','바스','미해군'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/USS_Arleigh_Burke.jpg/320px-USS_Arleigh_Burke.jpg','https://en.wikipedia.org/wiki/Arleigh_Burke-class_destroyer',99),


  w('nav-usa004','타이콘데로가급 순양함','Ticonderoga-class Cruiser','NAVAL','USA','OPERATIONAL','LOW',
    '미 이지스 순양함. SPY-1A/B·Mk41 VLS 122셀·SM-2/6. 22척→퇴역 진행 중. DDG 대체.',
    {displacement:'9,800t',armament:'Mk41 VLS 122셀·SM-2/6·하푼·5인치',crew:'400명',speed:'32노트',firstDeployed:'1983년',manufacturer:'잉걸스·바스'},
    ['타이콘데로가','이지스순양함','Mk41 VLS','SM-2','퇴역중'],['잉걸스','미해군'],
    undefined,'https://en.wikipedia.org/wiki/Ticonderoga-class_cruiser',90),

  w('nav-usa005','오하이오급 SSBN 핵잠수함','Ohio-class SSBN','SUBMARINE','USA','OPERATIONAL','CRITICAL',
    '미 전략핵잠수함. 트라이던트 II D5 SLBM 24발. 14척 운용. SSBN 4척→SSGN(토마호크 154발) 개조.',
    {displacement:'18,750t',armament:'트라이던트 II D5 SLBM×24',crew:'155명',speed:'25노트',firstDeployed:'1981년',manufacturer:'제너럴다이나믹스 Electric Boat',quantity:'14척SSBN+4척SSGN'},
    ['오하이오급','SSBN','트라이던트II','핵전략잠수함'],['EB','미해군'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/USS_Ohio_%28SSGN-726%29_-_DN-SD-05-12025.JPEG/320px-USS_Ohio_%28SSGN-726%29_-_DN-SD-05-12025.JPEG','https://en.wikipedia.org/wiki/Ohio-class_submarine',99),

  w('nav-usa006','버지니아급 핵잠수함 블록 V','Virginia-class Block V SSN','SUBMARINE','USA','OPERATIONAL','HIGH',
    '미 주력 공격핵잠수함 최신형. VPM 4개 추가 VLS(65발 토마호크). 7,900t.',
    {displacement:'7,900t',armament:'토마호크×65+·Mk48 어뢰·하푼',crew:'135명',speed:'25노트',firstDeployed:'2004년(Blk V: 2025년)',manufacturer:'제너럴다이나믹스 EB·HII'},
    ['버지니아급','Blk V','SSN','65발토마호크','AUKUS'],['EB','미해군'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Virginia_class_submarine.jpg/320px-Virginia_class_submarine.jpg','https://en.wikipedia.org/wiki/Virginia-class_submarine',97),

  w('nav-usa007','콘스텔레이션급 신형 호위함','Constellation-class FFG(X) Frigate','NAVAL','USA','DEVELOPMENT','LOW',
    'FFG(X) 미국 신형 호위함. FREMM 기반. SM-2·ESSM·NSM·MH-60R. 2027년 전력화.',
    {displacement:'7,400t',armament:'SM-2·ESSM Blk2·NSM·Mk41 VLS 32셀·MH-60R',crew:'200명',speed:'26노트',firstDeployed:'2027년(예상)',manufacturer:'피어슨·마리네테'},
    ['콘스텔레이션급','FFG(X)','미국호위함','FREMM기반','신형'],['피어슨','미해군'],
    undefined,'https://en.wikipedia.org/wiki/Constellation-class_frigate',78),

  w('nav-usa008','리토럴 전투함 (LCS)','Freedom/Independence-class LCS','NAVAL','USA','OPERATIONAL','LOW',
    '소형 연안전투함. 두 설계형(프리덤·인디펜던스). 교체형 임무모듈. 55mm·SeaRAM.',
    {displacement:'3,000~3,500t',armament:'57mm MK110·SeaRAM·임무모듈(대수·대기뢰·대잠)',crew:'50명(+임무팀40)',speed:'46노트',firstDeployed:'2008년',manufacturer:'록히드·제너럴다이나믹스'},
    ['LCS','리토럴전투함','연안','모듈방식','55mm'],['록히드','GD','미해군'],
    undefined,'https://en.wikipedia.org/wiki/Littoral_combat_ship',85),

  // ── 일본 해군 ─────────────────────────────────────────────────────────────
  w('nav-jpn001','가가함 DDH-184 (경항모 개조)','JS Kaga DDH-184 Light Carrier','NAVAL','JAPAN','OPERATIONAL','MED',
    '이즈모급 2번함. F-35B 탑재를 위한 스키점프 제거·갑판 개조. 사실상 경항모.',
    {displacement:'27,000t',armament:'F-35B 최대 28기·SeaRAM·CIWS',crew:'500명',speed:'30노트',firstDeployed:'2017년',manufacturer:'재팬마린유나이티드'},
    ['가가함','DDH-184','경항모','F-35B','일본'],['해자대','재팬마린'],
    undefined,'https://en.wikipedia.org/wiki/JS_Kaga',90),

  w('nav-jpn002','콩고급 이지스 구축함','JDS Kongou-class Aegis Destroyer','NAVAL','JAPAN','OPERATIONAL','HIGH',
    '일본 이지스 1세대. 미국 SPY-1D·SM-3 Blk IA/IB 탑재. 4척 운용. BMD 핵심.',
    {displacement:'9,500t',armament:'SM-3·SM-2·하푼·VLS 90셀·ASROC',crew:'307명',speed:'30노트',firstDeployed:'1993년',manufacturer:'미쓰비시·이시카와지마',quantity:'4척'},
    ['콩고급','이지스','SM-3','BMD','일본'],['미쓰비시','해자대'],
    undefined,'https://en.wikipedia.org/wiki/Kongō-class_destroyer',92),

  // ── 인도 해군 ─────────────────────────────────────────────────────────────
  w('nav-ind001','INS 비크라마디탸 항모','INS Vikramaditya R33 Aircraft Carrier','NAVAL','INDIA','OPERATIONAL','MED',
    '소련 키예프급 개조 인도 항모. MiG-29K 16기. 44,500t. 2013년 취역.',
    {displacement:'44,500t',armament:'MiG-29K 16기+·BAE 시 해리어·AK-630·카쉬탄',crew:'1,600명',speed:'30노트',firstDeployed:'2013년',manufacturer:'세베로드빈스크(러시아개조)'},
    ['비크라마디탸','인도항모','MiG-29K','키예프급','러시아개조'],['인도해군'],
    undefined,'https://en.wikipedia.org/wiki/INS_Vikramaditya',85),

  // ── 자주포·야포 추가 모음 ────────────────────────────────────────────────
  w('art-usa001','M1299 ERCA 자주포','XM1299 Extended Range Cannon Artillery SPH','ARTILLERY','USA','DEVELOPMENT','LOW',
    'M109A7 기반 58구경장 강화포신. 사거리 70km+ 목표. 2026년 전력화 예정. 자동 장전.',
    {weight:'45t',armament:'155mm XM907/58구경장',crew:'3명(자동)',range:'70km+(예상)',firstDeployed:'2026년(예상)',manufacturer:'BAE Systems'},
    ['ERCA','XM1299','58구경장','자주포','70km'],['BAE Systems','USARMY'],
    undefined,'https://en.wikipedia.org/wiki/M109_howitzer',72),

  w('art-ger001','RCH-155 바퀴형 자주포','RCH-155 Wheeled Self-Propelled Howitzer','ARTILLERY','GERMANY','OPERATIONAL','LOW',
    'Rheinmetall 차륜형 155mm 자주포. HX3 트럭 탑재. 분당 10발 자동. 우크라이나 공급 논의.',
    {weight:'35t',armament:'155mm/52구경장 자동장전',crew:'2명(자동)',range:'54km(V-LAP)',speed:'110km/h',firstDeployed:'2024년',manufacturer:'Rheinmetall·KMW'},
    ['RCH-155','차륜형자주포','독일','자동장전','우크라이나'],['Rheinmetall','독일군'],
    undefined,'https://en.wikipedia.org/wiki/RCH_155',82),

  w('art-swe001','아처 자주포','Archer FH77BW L52 SPH','ARTILLERY','SWEDEN','OPERATIONAL','LOW',
    '사브-보포스 차륜형 자주포. 6×6. 분당 20발(초기 폭발). 사거리 60km. 노르웨이·스웨덴·우크라이나.',
    {weight:'30t',armament:'155mm/52구경장 FH-77BW',crew:'3명(자동)',range:'60km(V-LAP)',speed:'70km/h',firstDeployed:'2009년',manufacturer:'BAE Systems 스웨덴'},
    ['아처','FH77BW','차륜형자주포','20발','스웨덴'],['BAE Systems','스웨덴군'],
    undefined,'https://en.wikipedia.org/wiki/Archer_(artillery_system)',88),

  w('art-isr001','ATMOS 2000 자주포','ATMOS 2000 Autonomous Truck Mounted Howitzer','ARTILLERY','ISRAEL','OPERATIONAL','LOW',
    '이스라엘 엘비트 차량탑재 155mm 자주포. 완전자동. 4명→자동→2명. 인도·아제르바이잔 수출.',
    {weight:'24t',armament:'155mm/52구경장',crew:'2명(자동)',range:'41km',speed:'90km/h',firstDeployed:'2000년대',manufacturer:'엘비트'},
    ['ATMOS','이스라엘자주포','155mm','자동','수출'],['엘비트','이스라엘군'],
    undefined,'https://en.wikipedia.org/wiki/ATMOS_2000',82),

  w('art-chn001','PLZ-45/08 자주포 수출형','PLZ-45/08 Export SPH 155mm','ARTILLERY','CHINA','OPERATIONAL','MED',
    '중국 155mm 자주포 수출형. 쿠웨이트·알제리·방글라데시 수출. 사거리 39km.',
    {weight:'32t',armament:'155mm/45구경장',crew:'5명',range:'39km',firstDeployed:'1990년대(수출)',manufacturer:'북방공업 Norinco'},
    ['PLZ-45','중국자주포','155mm','수출','쿠웨이트'],['Norinco','중국군'],
    undefined,'https://en.wikipedia.org/wiki/PLZ-45',80),

  w('art-kor001','XK9 차기자주포','XK9 Next Generation SPH 155mm','ARTILLERY','ROK','DEVELOPMENT','MED',
    '한국 차세대 자주포. K9A2 후속. 완전자율 발사·보급·정비 무인화 목표. 2030년대 예상.',
    {weight:'45t(예상)',armament:'155mm/52구경장 이상',crew:'2명(자동화)',firstDeployed:'2035년(예상)',manufacturer:'한화에어로스페이스'},
    ['XK9','차기자주포','무인화','한국','차세대'],['한화에어로스페이스','방위사업청'],
    undefined,undefined,50),

  // ── 글로벌 해군 추가 ──────────────────────────────────────────────────────
  w('nav-fra001','포르빈급 방공 구축함','French Forbin-class Destroyer (Horizon)','NAVAL','FRANCE','OPERATIONAL','LOW',
    '프랑스·이탈리아 공동 지평선급 방공함. Aster 15/30·76mm OTO. 프랑스 2척.',
    {displacement:'7,050t',armament:'Aster 15/30 VLS 48셀·76mm OTO·MM40 엑조세',crew:'200명',speed:'29노트',firstDeployed:'2008년',manufacturer:'DCNS(나발그룹)'},
    ['포르빈급','지평선','방공구축함','Aster30','프랑스이탈리아'],['나발그룹','프랑스해군'],
    undefined,'https://en.wikipedia.org/wiki/Forbin-class_destroyer',88),

  w('nav-ger001','F125 바덴-뷔르템베르크급 호위함','Type F125 Baden-Württemberg Frigate','NAVAL','GERMANY','OPERATIONAL','LOW',
    '독일 새 다목적 호위함. 7,200t. 장기임무(2년) 설계. 76mm·RAM·ESSM. 4척 건조.',
    {displacement:'7,200t',armament:'76mm OTO·RAM·ESSM·하푼·토마호크옵션',crew:'120명',speed:'26노트',firstDeployed:'2019년',manufacturer:'TKMS'},
    ['F125','바덴뷔르템베르크','독일호위함','장기임무'],['TKMS','독일해군'],
    undefined,'https://en.wikipedia.org/wiki/Type_F125_frigate',85),

  w('nav-ita001','카보우르급 LHD (이탈리아)','ITS Trieste LHD L9890','NAVAL','NATO','OPERATIONAL','LOW',
    '이탈리아 신형 강습상륙함. 38,000t. F-35B 탑재 가능. 2022년 취역.',
    {displacement:'38,000t',armament:'F-35B 최대 20기·AV-8B·Aster 15·76mm',crew:'1,100명',speed:'25노트',firstDeployed:'2022년',manufacturer:'핀칸티에리'},
    ['트리에스테','이탈리아LHD','F-35B','강습상륙'],['핀칸티에리','이탈리아해군'],
    undefined,'https://en.wikipedia.org/wiki/ITS_Trieste_(L_9890)',82),

  w('nav-aus001','호바트급 이지스 구축함','HMAS Hobart-class Destroyer (AIR 9000)','NAVAL','AUSTRALIA','OPERATIONAL','LOW',
    '호주 이지스 구축함. 7,000t. SM-2·ESSM·ASROC·하푼. 3척 운용.',
    {displacement:'7,000t',armament:'SM-2·ESSM·ASROC·Mk41 VLS 48셀·하푼',crew:'186명',speed:'28노트',firstDeployed:'2017년',manufacturer:'ASC(호주)'},
    ['호바트급','이지스','호주구축함','SM-2','ESSM'],['ASC','호주해군'],
    undefined,'https://en.wikipedia.org/wiki/Hobart-class_destroyer',90),

  w('nav-ind002','INS 첸나이 (P-15B)','INS Chennai P-15B Destroyer','NAVAL','INDIA','OPERATIONAL','MED',
    '인도 최신 비사크하팟남급 구축함. 7,400t. 브라모스·바락-8·16셀 VLS. 2022년 취역.',
    {displacement:'7,400t',armament:'브라모스 SSM·바락-8 VLS 48셀·100mm·헬기2기',crew:'300명',speed:'30노트',firstDeployed:'2016년',manufacturer:'MDL 뭄바이'},
    ['비사크하팟남급','P-15B','인도구축함','브라모스','바락8'],['MDL','인도해군'],
    undefined,'https://en.wikipedia.org/wiki/Visakhapatnam-class_destroyer',82),

  w('nav-tur001','이스탄불급 호위함 (TF-100)','TCG Istanbul TF-100 Frigate','NAVAL','TURKEY','OPERATIONAL','MED',
    '터키 독자 개발 신형 호위함. 3,000t. 하르픈 대함·RAM·76mm. 2023년 취역.',
    {displacement:'3,000t',armament:'하르픈·RAM·76mm OTO·어뢰',crew:'150명',speed:'28노트',firstDeployed:'2023년',manufacturer:'이스탄불조선소'},
    ['이스탄불급','TF-100','터키호위함','국산','하르픈'],['이스탄불조선','터키해군'],
    undefined,'https://en.wikipedia.org/wiki/Istanbul-class_frigate',82),

  // ── 잠수함 추가 ───────────────────────────────────────────────────────────
  w('sub-fra001','르 트리옹팡급 SSBN','Le Triomphant-class SSBN','SUBMARINE','FRANCE','OPERATIONAL','CRITICAL',
    '프랑스 전략핵잠수함. M51 SLBM 16발. 4척 운용. 드골 항모와 함께 독립핵억지력.',
    {displacement:'14,335t',armament:'M51 SLBM×16(TN75 핵탄두)',crew:'111명',speed:'25노트',firstDeployed:'1997년',manufacturer:'나발그룹',quantity:'4척'},
    ['트리옹팡급','프랑스SSBN','M51','독립핵억지','4척'],['나발그룹','프랑스해군'],
    undefined,'https://en.wikipedia.org/wiki/Le_Triomphant-class_submarine',92),

  w('sub-uk001','뱅가드급 SSBN','HMS Vanguard-class SSBN','SUBMARINE','UK','OPERATIONAL','CRITICAL',
    '영국 핵전략잠수함. 트라이던트 II D5 SLBM 최대 16발. 4척 중 항상 1척 순찰.',
    {displacement:'15,900t',armament:'트라이던트 II D5×16·스피어피시 어뢰',crew:'135명',speed:'25노트',firstDeployed:'1993년',manufacturer:'VSEL(BAE)',quantity:'4척'},
    ['뱅가드급','영국SSBN','트라이던트','핵억지','4척'],['BAE Systems','영국해군'],
    undefined,'https://en.wikipedia.org/wiki/Vanguard-class_submarine',95),

  w('sub-chn001','096형 SSBN (탕급)','Type 096 Tang-class SSBN','SUBMARINE','CHINA','DEVELOPMENT','CRITICAL',
    '중국 차세대 전략핵잠수함. JL-3 SLBM 24발 탑재 목표. 094A 후속. 2030년대 취역.',
    {displacement:'20,000t+(추정)',armament:'JL-3 SLBM×24',crew:'120명(추정)',firstDeployed:'2030년대(예상)',manufacturer:'보하이조선소'},
    ['096형','탕급','중국SSBN','JL-3','차세대'],['DoD','38North'],
    undefined,'https://en.wikipedia.org/wiki/Type_096_submarine',55),

  w('sub-ind001','아리한트급 SSBN','INS Arihant-class SSBN','SUBMARINE','INDIA','OPERATIONAL','CRITICAL',
    '인도 핵추진 핵전략잠수함. K-15 사가리카 SLBM 12발. 2016년 취역. K-4(3,500km) 개발.',
    {displacement:'6,000t',armament:'K-15 사가리카 SLBM×12·어뢰관',crew:'95명',speed:'24노트',firstDeployed:'2016년',manufacturer:'SSBN 힌두스탄조선'},
    ['아리한트','인도SSBN','K-15','사가리카','핵잠수함'],['인도해군','DRDO'],
    undefined,'https://en.wikipedia.org/wiki/INS_Arihant',80),

  w('sub-pak001','아고스타-90B 잠수함','Agosta-90B AIP Submarine (Pakistan)','SUBMARINE','PAKISTAN','OPERATIONAL','HIGH',
    '프랑스 아고스타 AIP형 파키스탄 건조. 3척. 어뢰+하푼 UGM-84 발사. MESMA AIP.',
    {displacement:'1,760t',armament:'533mm 어뢰관 4문·SM-39 엑조세·하푼',crew:'36명',speed:'17노트',firstDeployed:'2008년(3번함)',manufacturer:'프랑스→파키스탄 면허'},
    ['아고스타90B','파키스탄잠수함','AIP','MESMA','면허생산'],['DCNS','파키스탄해군'],
    undefined,'https://en.wikipedia.org/wiki/Agosta-class_submarine',80),

  // ── 기뢰·어뢰 ────────────────────────────────────────────────────────────
  w('torp-usa001','MK-48 ADCAP 어뢰','Mk-48 ADCAP Mod 7 Heavy Torpedo','NAVAL','USA','OPERATIONAL','LOW',
    '미 핵잠수함 표준 533mm 중어뢰. 50km 사거리. 능동/수동 음향 유도. 수상함도 타격.',
    {weight:'1,676kg',range:'50km',speed:'55노트',guidance:'능동/수동 음향',firstDeployed:'1988년(ADCAP)',manufacturer:'레이시온'},
    ['Mk-48','ADCAP','중어뢰','미해군','핵잠수함'],['레이시온','미해군'],
    undefined,'https://en.wikipedia.org/wiki/Mark_48_torpedo',95),

  w('torp-uk001','스피어피시 어뢰','Spearfish Heavyweight Torpedo','NAVAL','UK','OPERATIONAL','LOW',
    '영국 핵잠수함 표준 533mm 중어뢰. 유선유도+능동/수동 음향. 65노트. 고속 표적 대응.',
    {weight:'1,850kg',range:'54km',speed:'65노트',guidance:'유선+능동/수동음향',firstDeployed:'1992년',manufacturer:'BAE Systems'},
    ['스피어피시','영국어뢰','533mm','65노트','핵잠수함'],['BAE','영국해군'],
    undefined,'https://en.wikipedia.org/wiki/Spearfish_(torpedo)',90),

  w('torp-fra001','F21 아르테미스 어뢰','F21 Artemis Heavyweight Torpedo','NAVAL','FRANCE','OPERATIONAL','LOW',
    '프랑스 신형 중어뢰. 수피랑급·르르동탕블 탑재. 50km+. 능동/수동·유선 복합.',
    {weight:'1,300kg',range:'50km+',speed:'50노트',guidance:'유선+능동/수동',firstDeployed:'2015년',manufacturer:'DCNS'},
    ['F21','아르테미스','프랑스어뢰','수피랑급'],['DCNS','프랑스해군'],
    undefined,undefined,85),

  w('mine-usa001','콰이크스트라이크 함정기뢰','Quickstrike Sea Mine','NAVAL','USA','OPERATIONAL','LOW',
    '폭탄형 기뢰. MK-62/63/64·Mk-65. 저주파·자기·수압 퓨즈. 자항기뢰 JDAM 키트.',
    {firstDeployed:'1980년대',manufacturer:'GD·레이시온'},
    ['콰이크스트라이크','기뢰','항공투하','자항기뢰'],['미해군'],
    undefined,'https://en.wikipedia.org/wiki/Quickstrike_mine',82),

  // ── 상륙전력 ──────────────────────────────────────────────────────────────
  w('amp-usa001','LCAC 공기부양정','Landing Craft Air Cushion','NAVAL','USA','OPERATIONAL','LOW',
    '고속 공기부양정. M1·LAV·험비 수송. 75노트. 세계 공기부양정 중 최고 탑재량.',
    {displacement:'200t(탑재)',armament:'20mm·12.7mm·스팅어',crew:'5명',speed:'75노트',firstDeployed:'1987년',manufacturer:'텍스트론 마린'},
    ['LCAC','공기부양정','75노트','M1탑재','상륙'],['텍스트론','미해군'],
    undefined,'https://en.wikipedia.org/wiki/LCAC',90),

  w('amp-usa002','SSC 선상전투함 (EFV 후속)','ACV LCAC Successor Amphibious Vehicle','NAVAL','USA','OPERATIONAL','LOW',
    'LCAC 후속 선상공기부양정(SCAC/SSC). 더 빠른 속도·더 많은 화물. 차세대 강습상륙.',
    {firstDeployed:'2025년(예상)',manufacturer:'텍스트론 마린'},
    ['LCAC후속','SSC','공기부양정','차세대상륙'],['텍스트론','미해군'],undefined,undefined,65),

  // ── 글로벌 레이더·방공 시스템 ────────────────────────────────────────────
  w('radar-usa001','AN/TPY-2 X밴드 레이더','AN/TPY-2 X-Band Radar (Forward-Based Mode)','GROUND','USA','OPERATIONAL','LOW',
    'THAAD 전진배치 탐색레이더. 사거리 3,000km. 한국·일본·걸프·이스라엘 배치.',
    {range:'3,000km',firstDeployed:'2006년',manufacturer:'레이시온'},
    ['AN/TPY-2','X밴드레이더','THAAD','전진배치','한국일본'],['레이시온','미군'],
    undefined,'https://en.wikipedia.org/wiki/AN/TPY-2',92),

  w('radar-usa002','SPY-6 이지스 레이더','AN/SPY-6 Air and Missile Defense Radar','NAVAL','USA','OPERATIONAL','LOW',
    '알레이버크 Flt III 탑재 차세대 이지스 레이더. 기존 SPY-1 대비 35배 탐지능력. BMD 특화.',
    {range:'불명(분류)',firstDeployed:'2021년',manufacturer:'레이시온'},
    ['SPY-6','AMDR','이지스레이더','FlightIII','BMD'],['레이시온','미해군'],
    undefined,'https://en.wikipedia.org/wiki/AN/SPY-6',90),

  w('radar-isr001','EL/M-2080 그린 파인 레이더','EL/M-2080 Green Pine Ballistic Missile Defense Radar','GROUND','ISRAEL','OPERATIONAL','HIGH',
    '이스라엘 탄도미사일 추적 레이더. 애로우 시스템 연동. X밴드. 500km 탐지.',
    {range:'500km',firstDeployed:'1990년대',manufacturer:'ELTA Systems'},
    ['그린파인','탄도미사일레이더','이스라엘','애로우','500km'],['ELTA','이스라엘군'],
    undefined,'https://en.wikipedia.org/wiki/Green_Pine_(radar)',88),

]
