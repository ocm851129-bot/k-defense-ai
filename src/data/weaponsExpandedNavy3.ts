import type { WeaponSystem } from './weapons'
const w = (id:string,name:string,nameEng:string,cat:WeaponSystem['category'],origin:WeaponSystem['origin'],status:WeaponSystem['status'],threat:WeaponSystem['threatRating'],desc:string,specs:WeaponSystem['specs'],tags:string[],sources:string|string[],wiki?:string,conf=85): WeaponSystem=>({id,name,nameEng,category:cat,origin,status,threatRating:threat,description:desc,detail:`## ${nameEng}\n\n${desc}\n\n### 주요 제원\n${Object.entries(specs).filter(([,v])=>v).map(([k,v])=>`- ${k}: ${v}`).join('\n')}`,specs,confidence:conf,lastUpdated:'2026-07-01',relatedIntelIds:[],tags,sources:Array.isArray(sources)?sources:[sources],wikiUrl:wiki})

export const WEAPONS_EXP_NAVY3: WeaponSystem[] = [
  // ── 미국 함정 추가 ────────────────────────────────────────────────────────
  w('nav-usa001','드와이트 D. 아이젠하워 CVN','USS Dwight D. Eisenhower CVN-69','NAVAL','USA','OPERATIONAL','LOW','니미츠급 3번함. 2023년 중동 파견. 후티 대응 작전 지휘. F/A-18 비행단.',{displacement:'104,600톤',length:'332.9m',firstDeployed:'1977년'},['CVN-69','아이젠하워','니미츠','후티','중동'],'USN',undefined,97),
  w('nav-usa002','로널드 레이건 CVN','USS Ronald Reagan CVN-76','NAVAL','USA','OPERATIONAL','LOW','니미츠급 일본 기지 유일 전진배치 항모. 요코스카 홈포트. 서태평양 억제력.',{displacement:'104,600톤',firstDeployed:'2003년'},['CVN-76','레이건','요코스카','전진배치','서태평양'],'USN',undefined,97),
  w('nav-usa003','DDG-51 알레이버크 함','USS Arleigh Burke DDG-51','NAVAL','USA','OPERATIONAL','LOW','이지스 구축함 시리즈의 1번함. SM-2·SM-3·토마호크. 98척+ 건조 중.',{displacement:'8,315톤',length:'153.8m',armament:'SM-2/3·토마호크·VLS 90셀',firstDeployed:'1991년'},['DDG-51','알레이버크','이지스','1번함','98척'],'USN','https://en.wikipedia.org/wiki/USS_Arleigh_Burke_(DDG-51)',99),
  w('nav-usa004','MCM-1 어벤저 기뢰대항함','Avenger-class MCM','NAVAL','USA','OPERATIONAL','LOW','미 해군 기뢰대항함. 유리섬유 비자성 선체. 소나+ROV 탑재. 페르시아만 운용.',{displacement:'1,312톤',length:'68.4m',crew:'84명',armament:'12.7mm×2·M60',firstDeployed:'1987년',quantity:'8척'},['어벤저MCM','기뢰대항','비자성','페르시아만','ROV'],'USN',undefined,90),
  w('nav-usa005','SSBN 오하이오 SSGN 개조형','USS Ohio SSGN-726','SUBMARINE','USA','OPERATIONAL','LOW','오하이오급 SSBN을 SSGN으로 개조. 토마호크 154발·특수작전부대 탑재. 4척.',{displacement:'18,750톤(수중)',armament:'토마ховк 154발·Mk48어뢰',crew:'154명+66특작대',firstDeployed:'2002년(SSGN)',quantity:'4척'},['오하이오SSGN','토마호크154발','특수작전','SSBN개조','스트라이크'],'USN','https://en.wikipedia.org/wiki/Ohio-class_submarine',97),

  // ── 미국 육해군 소형 함정 ───────────────────────────────────────────────
  w('nav-usa006','MK VI 순찰정','MK VI Patrol Boat','NAVAL','USA','OPERATIONAL','LOW','연안 순찰·항만방어 전용 고속정. M2·Mk38 25mm 탑재. 이란·후티 대응.',{displacement:'60톤',length:'26m',crew:'10명',armament:'Mk38 25mm·M2 12.7mm',firstDeployed:'2015년'},['MK VI','순찰정','연안','이란','후티'],'USN',undefined,85),
  w('nav-usa007','LCU-1700 상륙정','LCU-1700 Landing Craft Utility','NAVAL','USA','OPERATIONAL','LOW','미 해군·해병대 상륙정. M1 전차 1대 또는 170명 수송 가능.',{displacement:'400톤',length:'41.1m',payload:'M1전차1대·170명',firstDeployed:'1974년',quantity:'33척'},['LCU-1700','상륙정','M1전차수송','해병대','상륙작전'],'USN/USMC',undefined,85),

  // ── 영국 함정 추가 ────────────────────────────────────────────────────────
  w('nav-uk001','23형 공작공 호위함','Type 23 Duke-class Frigate','NAVAL','UK','OPERATIONAL','LOW','영국 대잠 호위함. 13척. 2087 소나·시울프 SAM·링크스 헬기. 26형으로 교체 중.',{displacement:'4,900톤',length:'133m',crew:'185명',armament:'씨울프 SAM·링크스 헬기·하푼·114mm',firstDeployed:'1989년',quantity:'13척'},['23형','듀크급','대잠','씨울프','26형교체'],'RN','https://en.wikipedia.org/wiki/Type_23_frigate',92),
  w('nav-uk002','HMS 드레드노트 SSBN (신형)','HMS Dreadnought SSBN (new Dreadnought-class)','SUBMARINE','UK','DEVELOPMENT','LOW','뱅가드급 후속 영국 신형 SSBN. 트라이던트 II D5 16발. 2030년대 취역.',{displacement:'17,000톤+(수중)',armament:'트라이던트 II D5×16',firstDeployed:'2033년(예정)'},['드레드노트급','영국SSBN','트라이던트','뱅가드후속','2033'],'RN',undefined,82),

  // ── 프랑스 함정 추가 ──────────────────────────────────────────────────────
  w('nav-fra001','포르빈급 호위함 (FREMM AAW)','Forbin-class Frigate FREMM Air Defence','NAVAL','FRANCE','OPERATIONAL','LOW','프랑스 방공 FREMM 2척. 아스터-30·시마타르·PAAMS. 지중해 억제력.',{displacement:'6,700톤',length:'152m',crew:'195명',armament:'아스터-30·아스터-15·엑조세·100mm',firstDeployed:'2010년',quantity:'2척(방공형)'},['포르빈급','프랑스','FREMM방공','아스터30','PAAMS'],'프랑스해군',undefined,90),
  w('nav-fra002','루비급 공격잠수함','Rubis-class SSN','SUBMARINE','FRANCE','OPERATIONAL','LOW','프랑스 핵추진 공격잠수함. 6척. 엑조세·토르페유 F17. 슈프렌급으로 교체 중.',{displacement:'2,670톤(수중)',length:'73.6m',crew:'70명',armament:'엑조세 SM39·F17 어뢰',propulsion:'K48 원자로',firstDeployed:'1983년',quantity:'6척'},['루비급','프랑스','SSN','엑조세SM39','슈프렌교체'],'프랑스해군','https://en.wikipedia.org/wiki/Rubis-class_submarine',90),
  w('nav-fra003','슈프렌급 차세대 SSN','Suffren-class SSN (Barracuda)','SUBMARINE','FRANCE','OPERATIONAL','LOW','루비급 후속 핵추진 공격잠수함. SCALP SM-39·Mk46 어뢰·MdCN 순항미사일. 6척 계획.',{displacement:'4,765톤(수중)',length:'99.5m',crew:'65명',armament:'SCALP Naval·MdCN·F21 어뢰',propulsion:'K15 원자로',firstDeployed:'2020년',quantity:'2척+'},['슈프렌급','바라쿠다','프랑스SSN','SCALP','루비후속'],'프랑스해군','https://en.wikipedia.org/wiki/Suffren-class_submarine',90),

  // ── 독일 함정 추가 ──────────────────────────────────────────────────────
  w('nav-deu001','212A급 잠수함','Type 212A AIP Submarine','SUBMARINE','GERMANY','OPERATIONAL','LOW','독일 연료전지 AIP 잠수함. 초정숙. 이탈리아·노르웨이 등 수출. 한국 209급 후속형 참조.',{displacement:'1,830톤(수중)',length:'56m',crew:'27명',armament:'533mm 어뢰 6문·기뢰',propulsion:'HDW 연료전지 AIP',firstDeployed:'2005년',quantity:'6척(독일)'},['212A','독일잠수함','AIP연료전지','초정숙','수출'],'독일해군','https://en.wikipedia.org/wiki/Type_212_submarine',92),

  // ── 이탈리아 함정 추가 ───────────────────────────────────────────────────
  w('nav-ita001','지우세페 가리발디 항모 (퇴역)','Giuseppe Garibaldi STOVL Carrier','NAVAL','MULTI','RETIRED','LOW','이탈리아 첫 항공모함. 13,850톤. AV-8B 해리어·SH-3D 탑재. 2024년 퇴역.',{displacement:'13,850톤',firstDeployed:'1985년'},['가리발디','이탈리아','STOVL항모','해리어','퇴역'],'이탈리아해군',undefined,88),
  w('nav-ita002','키아산 CVH 트리에스테','Trieste LHD (Italy)','NAVAL','MULTI','OPERATIONAL','LOW','이탈리아 신형 다목적 강습상륙함. 3만3천톤. F-35B·AW101·AW189 탑재.',{displacement:'33,000톤',length:'245m',armament:'아스터-15·76mm',firstDeployed:'2022년',quantity:'1척'},['트리에스테','이탈리아','LHD','F-35B','AW101'],'이탈리아해군',undefined,85),

  // ── 스페인 함정 추가 ─────────────────────────────────────────────────────
  w('nav-esp001','알바로 데 바잔급 호위함','Álvaro de Bazán-class Frigate (F100)','NAVAL','MULTI','OPERATIONAL','LOW','이지스 SPY-1D 탑재 스페인 호위함. SM-2·하푼·VL-ASROC. 5척. 노르웨이 난센급 동형.',{displacement:'5,853톤',length:'146.7m',crew:'250명',armament:'SM-2·하푼·ESSM·Mk41 VLS',firstDeployed:'2002년',quantity:'5척'},['알바로데바잔','스페인','이지스','F100','SM-2'],'스페인해군','https://en.wikipedia.org/wiki/%C3%81lvaro_de_Baz%C3%A1n-class_frigate',92),

  // ── 일본 함정 추가 ────────────────────────────────────────────────────────
  w('nav-jpn001','무라사메급 호위함','Murasame-class Destroyer','NAVAL','JAPAN','OPERATIONAL','LOW','일본 이지스 이전 주력 구축함. VLS·하푼·Mk46. 9척. 가가·이즈모급 지원.',{displacement:'5,100톤',length:'151m',crew:'165명',armament:'アスロック VLS·하푼·76mm',firstDeployed:'1996년',quantity:'9척'},['무라사메급','일본','구축함','VLS','9척'],'JMSDF','https://en.wikipedia.org/wiki/Murasame-class_destroyer',90),
  w('nav-jpn002','아키즈키급 구축함','Akizuki-class Destroyer (DD)','NAVAL','JAPAN','OPERATIONAL','LOW','일본 방공 특화 구축함. OPS-50 FCS-3 위상배열. ESSM·Mk41 VLS 32셀. 4척.',{displacement:'6,800톤',length:'150.5m',crew:'200명',armament:'ESSM·Mk41 VLS 32셀·127mm',firstDeployed:'2012년',quantity:'4척'},['아키즈키급','일본','방공구축함','ESSM','FCS-3'],'JMSDF','https://en.wikipedia.org/wiki/Akizuki-class_destroyer',90),
  w('nav-jpn003','하야부사급 고속미사일정','Hayabusa-class Missile Boat','NAVAL','JAPAN','OPERATIONAL','LOW','일본 해상자위대 고속 미사일정. 하푼×4·76mm. 도서 방어 A2/AD 역할. 6척.',{displacement:'240톤',length:'50m',crew:'21명',armament:'하푼×4·76mm·M61 20mm',propulsion:'워터젯 40노트',firstDeployed:'2002년',quantity:'6척'},['하야부사급','일본','고속미사일정','하푼','도서방어'],'JMSDF',undefined,88),

  // ── 인도 함정 추가 ────────────────────────────────────────────────────────
  w('nav-ind001','INS 비샬 항모 (계획)','INS Vishal Future Carrier (IAC-2)','NAVAL','INDIA','DEVELOPMENT','LOW','인도 두번째 자국 항모. CATOBAR 전자기 사출 설계. 6.5만톤. 2035년+ 목표.',{displacement:'65,000톤(목표)',armament:'EMALS·라팔해군형·MiG-29K',firstDeployed:'2035년+(목표)'},['INS비샬','인도항모','CATOBAR','EMALS','2035'],'인도해군',undefined,55),
  w('nav-ind002','INS 타르바르급 호위함','Talwar-class Frigate (India-Russia)','NAVAL','RUSSIA','OPERATIONAL','LOW','러시아 현대급(게파르트) 기반 인도 스텔스 호위함. 칼리브르·브라모스 탑재. 6척.',{displacement:'4,035톤',length:'124.8m',crew:'220명',armament:'브라모스·우란·스틸레토SAM',firstDeployed:'2003년',quantity:'6척'},['타르바르급','인도','러시아기반','브라모스','스텔스'],'인도해군',undefined,80),

  // ── 중국 함정 추가 ────────────────────────────────────────────────────────
  w('nav-chn001','056A형 코르벳','Type 056A Jiangdao Corvette','NAVAL','CHINA','OPERATIONAL','HIGH','중국 1,500톤급 다목적 연안 초계함. 76mm·HHQ-10·YJ-83·Yu-7어뢰. 70척+. 세계 최다.',{displacement:'1,500톤',length:'89m',crew:'78명',armament:'HHQ-10·YJ-83·76mm',firstDeployed:'2013년',quantity:'70척+'},['056A형','장도급','코르벳','세계최다','연안초계'],'중국해군','https://en.wikipedia.org/wiki/Type_056_corvette',85),
  w('nav-chn002','052B 광저우급 구축함','Type 052B Guangzhou DDG','NAVAL','CHINA','OPERATIONAL','HIGH','중국 첫 외제 가스터빈 구축함. 러시아 우크라이나산 가스터빈. HHQ-16 VLS. 2척.',{displacement:'6,500톤',armament:'HHQ-16·YJ-12·100mm',firstDeployed:'2004년',quantity:'2척'},['052B','광저우급','중국구축함','우크라이나가스터빈','HHQ-16'],'중국해군',undefined,80),

  // ── 한국 추가 해군 ────────────────────────────────────────────────────────
  w('nav-rok001','포항급 초계함 (일부 현역)','Pohang-class Corvette (partially active)','NAVAL','ROK','RETIRED','LOW','한국 초계함. 1990년대 주력. 퇴역 진행 중. 인도네시아·이집트 수출.',{displacement:'1,220톤',armament:'76mm·40mm·어뢰',firstDeployed:'1984년',quantity:'18척→감소'},['포항급','한국초계함','퇴역진행','인도네시아수출'],'해군',undefined,85),
  w('nav-rok002','참수리급 고속정','Chamsuri-class PKM','NAVAL','ROK','OPERATIONAL','LOW','한국 해군 고속정. 2010년 천안함 사건 이후 강화. 40mm·20mm 탑재. NLL 초계.',{displacement:'170톤',armament:'40mm·20mm 기관포',firstDeployed:'1978년',quantity:'70척+'},['참수리','고속정','NLL초계','천안함','한국해군'],'해군',undefined,88),
  w('nav-rok003','한국형 경항모 (CVX) 계획','CVX Korean Light Carrier','NAVAL','ROK','DEVELOPMENT','LOW','한국형 경항모 CVX. 3만톤+. F-35B 탑재 설계. 2033년 취역 목표. 예산 논란.',{displacement:'30,000톤+(목표)',armament:'F-35B·해궁·CIWS',firstDeployed:'2033년(목표)'},['CVX','한국경항모','F-35B','예산논란','2033'],'해군',undefined,55),
  w('nav-rok004','독도함·마라도함 강습상륙함','Dokdo/Marado LPH (ROK)','NAVAL','ROK','OPERATIONAL','LOW','한국 1만4천톤 강습상륙함 2척. 독도함(2007)·마라도함(2021). 경항모 검토 중.',{displacement:'14,300톤',length:'199m',crew:'330명',armament:'팰랭크스·RAM·해궁',firstDeployed:'2007년',quantity:'2척'},['독도함','마라도함','LPH','경항모검토','한국해병'],'해군',undefined,95),
]


