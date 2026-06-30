import type { WeaponSystem } from './weapons'
const w = (id:string,name:string,nameEng:string,cat:WeaponSystem['category'],origin:WeaponSystem['origin'],status:WeaponSystem['status'],threat:WeaponSystem['threatRating'],desc:string,specs:WeaponSystem['specs'],tags:string[],sources:string[],img?:string,wiki?:string,conf=82): WeaponSystem=>({id,name,nameEng,category:cat,origin,status,threatRating:threat,description:desc,detail:`## ${nameEng}\n\n${desc}\n\n### 주요 제원\n${Object.entries(specs).filter(([,v])=>v).map(([k,v])=>`- ${k}: ${v}`).join('\n')}`,specs,confidence:conf,lastUpdated:'2026-07-01',relatedIntelIds:[],tags,sources,imageUrl:img,wikiUrl:wiki})

export const WEAPONS_EXP_ASIA: WeaponSystem[] = [

  // ── 일본 (JAPAN) ──────────────────────────────────────────────────────────
  w('jpn-a001','F-35A (일본)','F-35A Lightning II (JASDF)','AIRCRAFT','JAPAN','OPERATIONAL','LOW',
    '일본 항공자위대 F-35A 105대+F-35B 42대 도입 계획. 미쓰비시 라이센스 조립. 청주기지 유사 역할.',
    {speed:'마하 1.6',range:'2,200km',crew:'1명',armament:'AIM-120D·AIM-9X·JDAM',firstDeployed:'2017년(일본)',manufacturer:'미쓰비시(록히드라이센스)',quantity:'42기+(F-35A)+F-35B'},
    ['F-35A','일본','항공자위대','미쓰비시','청주유사'],['JASDF','미쓰비시'],
    undefined,'https://en.wikipedia.org/wiki/Lockheed_Martin_F-35_Lightning_II',97),

  w('jpn-a002','F-2 전투기','Mitsubishi F-2 Support Fighter','AIRCRAFT','JAPAN','OPERATIONAL','LOW',
    'F-16 기반 일·미 공동 개발 다목적 지원전투기. ASM-2·AAM-4 운용. 탄소섬유 복합소재 광폭 주익.',
    {speed:'마하 2.0',range:'2,900km',crew:'1~2명',armament:'20mm M61·AAM-4·ASM-2',firstDeployed:'2000년',manufacturer:'미쓰비시',quantity:'90기'},
    ['F-2','일본전투기','F-16파생','ASM-2','일미공동'],['JASDF','미쓰비시'],
    undefined,'https://en.wikipedia.org/wiki/Mitsubishi_F-2',92),

  w('jpn-a003','F-X (차세대 전투기)','F-X Next Generation Fighter (Japan)','AIRCRAFT','JAPAN','DEVELOPMENT','LOW',
    'F-2 후속 일·영·이탈리아 공동 차세대 스텔스 전투기 GCAP. 2035년 전력화 목표.',
    {speed:'마하 2.5+(목표)',crew:'1명',armament:'신형 AAM·JNAAM(예정)',firstDeployed:'2035년(목표)',manufacturer:'미쓰비시·BAE·레오나르도'},
    ['F-X','GCAP','차세대전투기','일영이탈','2035'],['JASDF','미쓰비시','BAE'],
    undefined,'https://en.wikipedia.org/wiki/Global_Combat_Air_Programme',75),

  w('jpn-a004','이즈모급 경항모 개조','JS Izumo-class STOVL Carrier','NAVAL','JAPAN','OPERATIONAL','LOW',
    '헬기호위함에서 F-35B 탑재 경항모 개조. 2023년 개조 완료. 일본 전후 최초 항공모함 회귀.',
    {displacement:'27,000톤',length:'248m',crew:'470명',armament:'SeaRAM·20mm CIWS·12.7mm',propulsion:'가스터빈·디젤',firstDeployed:'2015년(경항모개조2023)',manufacturer:'IHI마린유나이티드',quantity:'2척'},
    ['이즈모','일본경항모','F-35B','DDH','일본해군'],['해상자위대'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/JS_Izumo_%28DDH-183%29_2.jpg/320px-JS_Izumo_%28DDH-183%29_2.jpg',
    'https://en.wikipedia.org/wiki/JS_Izumo',95),

  w('jpn-a005','마야급 이지스 구축함','Maya-class Aegis Destroyer','NAVAL','JAPAN','OPERATIONAL','LOW',
    '일본 최신 이지스 구축함. SM-3 BMD+SM-6. 공동교전능력(CEC). BMD 역할 강화. 한국 세종대왕급 유사.',
    {displacement:'10,250톤',length:'170m',crew:'300명',armament:'VLS 96셀(SM-3·SM-6)·Mk45 127mm',propulsion:'COGAG 가스터빈',firstDeployed:'2020년',manufacturer:'JMU',quantity:'2척'},
    ['마야급','일본이지스','SM-3','SM-6','BMD'],['해상자위대','JMU'],
    undefined,'https://en.wikipedia.org/wiki/Maya-class_destroyer',95),

  w('jpn-m001','ASM-3A 초음속 대함미사일','ASM-3A Supersonic Anti-Ship Missile','ASM','JAPAN','OPERATIONAL','LOW',
    '일본 독자 개발 마하 3 초음속 공대함미사일. F-2 탑재. 사거리 200km+. 대중국 억제력.',
    {range:'200km+',speed:'마하 3',guidance:'능동레이더+INS',firstDeployed:'2023년',manufacturer:'미쓰비시'},
    ['ASM-3A','초음속대함','일본','F-2','마하3'],['JASDF','미쓰비시'],
    undefined,undefined,80),

  w('jpn-m002','12식 지대함 개량형','Type-12 Surface-to-Ship Missile (Extended)','SSM','JAPAN','OPERATIONAL','LOW',
    '사거리 1,000km+ 개량 지대함미사일. 반격능력의 핵심. 도서 방어·장거리 타격 전략 구현.',
    {range:'1,000km+',speed:'아음속',guidance:'INS+지형추적+능동레이더',firstDeployed:'2024년(개량형)',manufacturer:'미쓰비시'},
    ['12식개량','일본','반격능력','지대함','장거리'],['육상자위대','미쓰비시'],
    undefined,undefined,80),

  w('jpn-g001','10식 전차','Type 10 MBT','GROUND','JAPAN','OPERATIONAL','LOW',
    '일본 독자 3세대+ 주력전차. 44톤 경량화(도서수송 가능). 120mm 활강포·C4I 네트워크.',
    {weight:'44톤',armament:'120mm JM33 활강포·74식 12.7mm',crew:'3명',speed:'70km/h',propulsion:'4쿼드V8 추진 1,200hp',firstDeployed:'2012년',manufacturer:'미쓰비시'},
    ['10식전차','일본','44톤','도서방어','3세대+'],['육상자위대','미쓰비시'],
    undefined,'https://en.wikipedia.org/wiki/Type_10_tank',90),

  // ── 인도 (INDIA) ─────────────────────────────────────────────────────────
  w('ind-a001','라팔 MH (인도)','Dassault Rafale MH (IAF)','AIRCRAFT','INDIA','OPERATIONAL','LOW',
    '인도 공군 최신 전투기. 36대 도입·추가 114대 협상. 파키스탄·중국 억제 양면 역할.',
    {speed:'마하 1.8',range:'3,700km',crew:'1~2명',armament:'미티어·MICA·SCALP·30mm',firstDeployed:'2020년',manufacturer:'다소·HAL',quantity:'36기'},
    ['라팔','인도','IAF','파키스탄대응','다소'],['인도공군'],
    undefined,'https://en.wikipedia.org/wiki/Dassault_Rafale',95),

  w('ind-a002','수호이 Su-30MKI','Sukhoi Su-30MKI (IAF)','AIRCRAFT','INDIA','OPERATIONAL','LOW',
    '인도 공군 주력 다목적 전투기. 브라모스 탑재 가능 개조. 270대+. 중국·파키스탄 대응.',
    {speed:'마하 2.0',range:'3,000km',crew:'2명',armament:'30mm·R-77·R-73·브라모스·크리스탈메이즈',firstDeployed:'2002년(인도)',manufacturer:'HAL(수호이라이센스)',quantity:'270기+'},
    ['Su-30MKI','인도공군','브라모스탑재','HAL','270기'],['IAF','HAL'],
    undefined,'https://en.wikipedia.org/wiki/Sukhoi_Su-30MKI',92),

  w('ind-a003','테자스 Mk1A','HAL Tejas Mk1A LCA','AIRCRAFT','INDIA','OPERATIONAL','LOW',
    '인도 독자 경량 전투기. AESA·공중급유·BVR AAM. 83대 계약. 자립 방위산업 핵심 프로젝트.',
    {speed:'마하 1.8',range:'3,000km',crew:'1명',armament:'23mm R73·MICA·DRDO ASTRA',firstDeployed:'2016년(Mk1A 2024)',manufacturer:'HAL',quantity:'83대(계약)'},
    ['테자스','인도전투기','Mk1A','HAL','자립국방'],['IAF','HAL'],
    undefined,'https://en.wikipedia.org/wiki/HAL_Tejas',85),

  w('ind-m001','브라모스 초음속 대함','BrahMos PJ-10 Supersonic ASCM','SSM','INDIA','OPERATIONAL','LOW',
    '인도·러시아 공동 개발 초음속 대함·대지 미사일. 마하 2.8~3. 함정·육상·공중(Su-30) 발사 가능.',
    {range:'450km(지상)/300km(함정)',speed:'마하 2.8~3',payload:'200~300kg',guidance:'INS+능동레이더',firstDeployed:'2006년',manufacturer:'브라모스에어로스페이스'},
    ['브라모스','초음속대함','인도러시아','마하3','Su-30'],['인도해군·육군·공군'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/BrahMos_at_DefExpo_India_2010.jpg/320px-BrahMos_at_DefExpo_India_2010.jpg',
    'https://en.wikipedia.org/wiki/BrahMos',92),

  w('ind-m002','아그니-V ICBM','Agni-V ICBM','ICBM','INDIA','OPERATIONAL','MED',
    '인도 첫 ICBM급 탄도미사일. 사거리 5,500~8,000km. 중국 전역 타격권. MIRV 개발 중.',
    {range:'5,500~8,000km',payload:'단탄두 1.5톤(MIRV 개발 중)',propulsion:'3단 고체추진',firstDeployed:'2018년',manufacturer:'DRDO'},
    ['아그니-V','인도ICBM','중국타격','MIRV개발','DRDO'],['SFC인도'],
    undefined,'https://en.wikipedia.org/wiki/Agni-V',85),

  w('ind-g001','아르주나 Mk1A 전차','Arjun Mk1A MBT','GROUND','INDIA','OPERATIONAL','LOW',
    '인도 독자 3세대 주력전차. 120mm 강선포·반응장갑·레이저 경보. 아직 T-90S 보완 역할.',
    {weight:'68.5톤',armament:'120mm 강선포·12.7mm',crew:'4명',speed:'60km/h',propulsion:'MTU 870 Ka-501 1,400hp',firstDeployed:'2004년(Mk1A 2021)',manufacturer:'CVRDE·HVF'},
    ['아르주나','인도전차','Mk1A','독자개발','T-90보완'],['인도육군'],
    undefined,'https://en.wikipedia.org/wiki/Arjun_(tank)',78),

  // ── 이스라엘 (ISRAEL) ────────────────────────────────────────────────────
  w('isr-a001','F-35I 아디르','F-35I Adir (IAF)','AIRCRAFT','ISRAEL','OPERATIONAL','LOW',
    '이스라엘 특화 F-35A. 정보수집·EW 시스템 추가·국산 전자전 통합. 실전 중동 스텔스 공습 사용.',
    {speed:'마하 1.6',range:'2,200km',crew:'1명',armament:'AIM-120D·SPICE·제리코III',firstDeployed:'2017년(이스라엘)',manufacturer:'록히드마틴+엘빗',quantity:'50기+'},
    ['F-35I','아디르','이스라엘','스텔스','중동공습'],['IAF'],
    undefined,'https://en.wikipedia.org/wiki/Lockheed_Martin_F-35_Lightning_II',97),

  w('isr-a002','F-15I 라암','F-15I Ra\'am (IAF)','AIRCRAFT','ISRAEL','OPERATIONAL','LOW',
    'F-15E 이스라엘 특화형. 이란 핵시설 타격 설계. JASSM 탑재 논의. 중동 전역 장거리 타격 핵심.',
    {speed:'마하 2.5',range:'4,450km(증가연료)',crew:'2명',armament:'Python-5·Derby·JDAM·소구경폭탄',firstDeployed:'1998년',manufacturer:'보잉',quantity:'25기'},
    ['F-15I','라암','이스라엘','이란타격','장거리'],['IAF'],
    undefined,'https://en.wikipedia.org/wiki/McDonnell_Douglas_F-15E_Strike_Eagle',95),

  w('isr-m001','아이언돔','Iron Dome C-RAM/SAM','SAM','ISRAEL','OPERATIONAL','LOW',
    '단거리 로켓·박격포 요격체계. 가자 전쟁·레바논 분쟁 전선 검증. 요격 성공률 90%+. 우크라이나 2기 제공.',
    {range:'70km',altitude:'10km',guidance:'능동레이더 ELTA EL/M-2084',firstDeployed:'2011년',manufacturer:'라파엘·엘타'},
    ['아이언돔','이스라엘','로켓요격','가자','90%성공률'],['이스라엘군'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Iron_Dome_battery_near_Ashdod.jpg/320px-Iron_Dome_battery_near_Ashdod.jpg',
    'https://en.wikipedia.org/wiki/Iron_Dome',98),

  w('isr-m002','다윗의 돌팔매','David\'s Sling / Magic Wand SAM','SAM','ISRAEL','OPERATIONAL','LOW',
    '중거리 탄도미사일·순항미사일 요격. 아이언돔(단거리)과 애로우(고고도) 사이. 메테오르급 탄도미사일 대응.',
    {range:'300km',altitude:'15~30km',guidance:'능동레이더 시커',firstDeployed:'2017년',manufacturer:'라파엘·레이시온'},
    ['다윗의돌팔매','매직완드','중거리요격','이스라엘','라파엘'],['IDF'],
    undefined,'https://en.wikipedia.org/wiki/David%27s_Sling',95),

  w('isr-m003','애로우-3','Arrow-3 Exoatmospheric SAM','SAM','ISRAEL','OPERATIONAL','LOW',
    '대기권 외 고고도 ICBM·IRBM 요격. 이란 탄도미사일 방어 설계. 독일 도입 결정(2023).',
    {range:'2,400km+',altitude:'100km+(대기권외)',guidance:'직격요격(HitToKill)',firstDeployed:'2017년',manufacturer:'IAI·보잉'},
    ['애로우-3','이스라엘','ICBM요격','이란','독일도입'],['IDF','IAI'],
    undefined,'https://en.wikipedia.org/wiki/Arrow_(Israeli_air_defense)',95),

  w('isr-m004','제리코 III ICBM','Jericho III ICBM','ICBM','ISRAEL','SUSPECTED','HIGH',
    '이스라엘 추정 ICBM. 핵탄두 탑재 추정. 공식 미확인. 사거리 6,500~11,500km 추정.',
    {range:'6,500~11,500km(추정)',payload:'핵탄두(추정)',propulsion:'3단 고체추진(추정)',firstDeployed:'2011년(추정)'},
    ['제리코III','이스라엘핵','ICBM','비확인','핵억제'],['이스라엘국방부'],
    undefined,undefined,55),

  w('isr-g001','메르카바 Mk4M 전차','Merkava Mk4M MBT','GROUND','ISRAEL','OPERATIONAL','LOW',
    '이스라엘 전차. Trophy(윈드브레이커) APS 최초 탑재. 승무원 보호 최우선 설계. 가자 전쟁 검증.',
    {weight:'65톤',armament:'120mm MG253 활강포·7.62mm×3',crew:'4명',speed:'64km/h',propulsion:'GD883 1,500hp',firstDeployed:'2004년(Mk4M 2012)',manufacturer:'IMI시스템즈·엘빗'},
    ['메르카바Mk4M','이스라엘전차','Trophy APS','가자전쟁','승무원보호'],['IDF'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Merkava-4-latrun-2-2.jpg/320px-Merkava-4-latrun-2-2.jpg',
    'https://en.wikipedia.org/wiki/Merkava',97),

  w('isr-uav001','헤론 TP 무인기','Heron TP MALE UAV','UAV','ISRAEL','OPERATIONAL','LOW',
    '이스라엘 대형 MALE 무인기. 헬파이어·소형폭탄 탑재. 독일·인도 운용. 30시간 체공.',
    {ceiling:'14,000m',range:'1,400km',speed:'220km/h',payload:'헬파이어·SDB',firstDeployed:'2007년',manufacturer:'IAI'},
    ['헤론TP','이스라엘','MALE UAV','독일','30시간'],['IAI','독일'],
    undefined,'https://en.wikipedia.org/wiki/IAI_Heron',88),

  // ── 터키 (TURKEY) ──────────────────────────────────────────────────────────
  w('tur-a001','바이락타르 TB2','Bayraktar TB2 MALE UAV','UAV','TURKEY','OPERATIONAL','MED',
    '아제르바이잔·우크라이나·나이지리아 등 전쟁에서 효과 입증한 터키 MALE 무인기. 저비용 정밀타격.',
    {ceiling:'7,620m',range:'1,500km',speed:'130km/h',armament:'MAM-L·MAM-C·TEBER 레이저유도탄',firstDeployed:'2014년',manufacturer:'바이칼',quantity:'세계 30개국+ 수출'},
    ['바이락타르TB2','터키드론','우크라이나','아제르바이잔','저비용'],['터키군','바이칼'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Bayraktar_TB2.jpg/320px-Bayraktar_TB2.jpg',
    'https://en.wikipedia.org/wiki/Bayraktar_TB2',95),

  w('tur-a002','아쿤쥐 HALE UAV','Bayraktar Akıncı HALE UAV','UAV','TURKEY','OPERATIONAL','MED',
    '터키 대형 HALE 전략 무인기. 총 1,350kg 무장. 크루즈미사일·유도폭탄·공대공미사일 운용.',
    {ceiling:'13,716m',range:'7,500km',speed:'361km/h',payload:'크루즈미사일·SOM·HGK',firstDeployed:'2021년',manufacturer:'바이칼'},
    ['아쿤쥐','터키HALE','전략UAV','크루즈미사일','바이칼'],['터키군','바이칼'],
    undefined,'https://en.wikipedia.org/wiki/Bayraktar_Akıncı',85),

  w('tur-g001','알타이 전차','Altay MBT','GROUND','TURKEY','TESTING','MED',
    '터키 독자 3세대+ 주력전차. K2 파워팩(한화에어로스페이스). 우리나라 기술 이전 포함.',
    {weight:'60톤',armament:'120mm 활강포·12.7mm·7.62mm',crew:'4명',speed:'65km/h',propulsion:'한화에어로스페이스 파워팩 1,500hp',firstDeployed:'2026년+(예정)',manufacturer:'BMC·한화에어로스페이스'},
    ['알타이','터키전차','K2파워팩','한화','독자개발'],['터키육군','BMC'],
    undefined,'https://en.wikipedia.org/wiki/Altay_(tank)',78),

  w('tur-m001','SOM 공대지 순항미사일','SOM-J Air-to-Surface Cruise Missile','ASM','TURKEY','OPERATIONAL','MED',
    '터키 독자 스텔스 공대지 순항미사일. F-16·아쿤쥐 탑재. 사거리 250km. 이란·그리스 억제.',
    {range:'250km',speed:'아음속',payload:'235kg 단일탄두',guidance:'INS+IIR',firstDeployed:'2012년',manufacturer:'Roketsan'},
    ['SOM','터키','순항미사일','F-16탑재','스텔스'],['터키공군','Roketsan'],
    undefined,'https://en.wikipedia.org/wiki/SOM_(missile)',82),

  // ── 이란 (IRAN) ──────────────────────────────────────────────────────────
  w('irn-m001','파타흐-1 극초음속','Fattah-1 Hypersonic Missile','SRBM','IRAN','TESTING','CRITICAL',
    '이란 발표 첫 극초음속 미사일. 마하 15. 사거리 1,400km. 2023년 공개. 실제 능력 과장 의혹.',
    {range:'1,400km',speed:'마하 15(주장)',payload:'핵·재래식(추정)',firstDeployed:'2023년(공개)'},
    ['파타흐-1','이란','극초음속','의혹','마하15'],['이란IRGC'],
    undefined,undefined,45),

  w('irn-m002','샤헤드-136 카미카제 드론','Shahed-136 Loitering Munition','UAV','IRAN','OPERATIONAL','HIGH',
    '이란제 자폭 드론. 러시아(게란-2)·예멘 후티·가자 하마스 사용. 우크라이나 전력망 공습 주력.',
    {range:'2,000km+',speed:'185km/h',payload:'40~50kg',propulsion:'MD-550 피스톤',firstDeployed:'2019년(수출 2022)'},
    ['샤헤드-136','이란드론','카미카제','러시아수출','우크라이나'],['이란IRGC','러시아'],
    undefined,'https://en.wikipedia.org/wiki/HESA_Shahed_136',90),

  w('irn-m003','파드 M14 단거리 탄도','Fateh-110 / Zolfaghar SRBM','SRBM','IRAN','OPERATIONAL','HIGH',
    '이란 고체추진 단거리 탄도미사일 계열. 사거리 300~700km. 이스라엘·이라크 미군기지 타격 사용.',
    {range:'300~700km',payload:'450kg',propulsion:'고체추진',guidance:'INS+GPS',firstDeployed:'2002년(졸파가르 2016)'},
    ['파테흐-110','이란SRBM','미군기지타격','이스라엘','이라크'],['이란군'],
    undefined,'https://en.wikipedia.org/wiki/Fateh-110',80),

  // ── 파키스탄 (PAKISTAN) ───────────────────────────────────────────────────
  w('pak-m001','샤힌-III MRBM','Shaheen-III MRBM','IRBM','PAKISTAN','OPERATIONAL','HIGH',
    '파키스탄 최장거리 탄도미사일. 사거리 2,750km. 인도 남부·안다만 제도 타격 가능. 핵탄두 탑재.',
    {range:'2,750km',payload:'핵탄두(추정)',propulsion:'2단 고체추진',firstDeployed:'2015년'},
    ['샤힌-III','파키스탄','MRBM','인도대응','핵'],['파키스탄육군'],
    undefined,'https://en.wikipedia.org/wiki/Shaheen-III',75),

  w('pak-a001','JF-17 선더 블록 III','JF-17 Thunder Block III (PAF)','AIRCRAFT','PAKISTAN','OPERATIONAL','MED',
    '파키스탄·중국 공동 개발 경량 다목적 전투기. AESA레이더·IRST·헬멧 조준기. 카타르 수출 논의.',
    {speed:'마하 1.6',range:'3,000km',crew:'1~2명',armament:'23mm·PL-5EII·CM-400AKG',firstDeployed:'2007년(블록III 2019)',manufacturer:'PAC·CAC',quantity:'170기+'},
    ['JF-17','선더','파키스탄','중파공동','블록III'],['PAF'],
    undefined,'https://en.wikipedia.org/wiki/CAC/PAC_JF-17_Thunder',82),

  // ── 대만 (TAIWAN) ──────────────────────────────────────────────────────────
  w('twn-a001','F-16V 바이퍼 (대만)','F-16V Viper (ROCAF)','AIRCRAFT','TAIWAN','OPERATIONAL','MED',
    '대만 공군 F-16 APG-83 AESA 업그레이드형. 141대 개조. AIM-120D·AGM-84L 운용. 중국 억제.',
    {speed:'마하 2.0',range:'3,200km',crew:'1명',armament:'AIM-120D·AIM-9X·AGM-84L',firstDeployed:'1997년(V형 2023)',manufacturer:'록히드마틴',quantity:'141기'},
    ['F-16V','바이퍼','대만','141기','중국억제'],['ROCAF'],
    undefined,'https://en.wikipedia.org/wiki/General_Dynamics_F-16_Fighting_Falcon',90),

  w('twn-m001','윈펑 순항미사일','Yunfeng Cruise Missile','CRUISE','TAIWAN','SUSPECTED','MED',
    '대만 추정 장거리 지대지 순항미사일. 사거리 1,200~2,000km. 중국 심층 타격 반격 능력. 비공식.',
    {range:'1,200~2,000km(추정)',guidance:'INS+지형추적+GPS',firstDeployed:'미공개'},
    ['윈펑','대만순항미사일','반격능력','중국억제','비공식'],['대만국방부'],
    undefined,undefined,45),

  w('twn-m002','슝펑 III 초음속 대함','Hsiung Feng III Supersonic ASM','SSM','TAIWAN','OPERATIONAL','MED',
    '대만 독자 개발 초음속 대함미사일. 마하 2~3. 해군 함정·육상 발사대. 중국 055형 대응 설계.',
    {range:'300km+',speed:'마하 2~3',guidance:'INS+능동레이더',firstDeployed:'2007년',manufacturer:'NCSIST'},
    ['슝펑III','대만','초음속대함','055형대응','마하3'],['대만해군'],
    undefined,'https://en.wikipedia.org/wiki/Hsiung_Feng_III',80),

  // ── 호주 (AUSTRALIA) ─────────────────────────────────────────────────────
  w('aus-a001','F-35A (호주)','F-35A Lightning II (RAAF)','AIRCRAFT','AUSTRALIA','OPERATIONAL','LOW',
    '호주 공군 F-35A 72대. 아시아태평양 최대 F-35 운용국 중 하나. AUKUS 3국 중 항공 전력.',
    {speed:'마하 1.6',range:'2,200km',crew:'1명',armament:'AIM-120D·AIM-9X·JDAM·SDB',firstDeployed:'2018년(호주)',quantity:'72기'},
    ['F-35A','호주','RAAF','AUKUS','아태지역'],['RAAF'],
    undefined,'https://en.wikipedia.org/wiki/Lockheed_Martin_F-35_Lightning_II',96),

  w('aus-n001','콜린스급 잠수함 (임시)','Collins-class SSK','SUBMARINE','AUSTRALIA','OPERATIONAL','LOW',
    '호주 재래식 잠수함. AUKUS 핵잠수함 확보 전까지 운용. 6척. 토마호크 탑재 개조 예정.',
    {displacement:'3,353톤(수중)',length:'77.8m',crew:'42명',armament:'Mk48 어뢰·하푼',propulsion:'디젤-전기',firstDeployed:'1996년',quantity:'6척'},
    ['콜린스급','호주잠수함','AUKUS전까지','SSK','토마호크개조'],['호주해군'],
    undefined,'https://en.wikipedia.org/wiki/Collins-class_submarine',90),

  w('aus-n002','AUKUS SSN (버지니아 로테이션)','AUKUS Nuclear Submarine Program','SUBMARINE','AUSTRALIA','DEVELOPMENT','LOW',
    '미·영·호주 AUKUS 핵잠수함 협정. 2027년부터 미 버지니아급 로테이션 배치·2030년대 호주용 SSN-AUKUS 건조.',
    {displacement:'10,000톤+(SSN-AUKUS)',armament:'토마호크·미크26 어뢰',firstDeployed:'2027년(로테이션)',manufacturer:'BAE시스템즈·헌팅턴·ASC'},
    ['AUKUS','핵잠수함','호주','버지니아로테이션','SSN-AUKUS'],['호주해군','USN','RN'],
    undefined,'https://en.wikipedia.org/wiki/AUKUS',90),

]
