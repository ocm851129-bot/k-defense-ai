import type { WeaponSystem } from './weapons'
const w = (id:string,name:string,nameEng:string,cat:WeaponSystem['category'],origin:WeaponSystem['origin'],status:WeaponSystem['status'],threat:WeaponSystem['threatRating'],desc:string,specs:WeaponSystem['specs'],tags:string[],sources:string[],img?:string,wiki?:string,conf=90): WeaponSystem=>({id,name,nameEng,category:cat,origin,status,threatRating:threat,description:desc,detail:`## ${nameEng}\n\n${desc}\n\n### 주요 제원\n${Object.entries(specs).filter(([,v])=>v).map(([k,v])=>`- ${k}: ${v}`).join('\n')}`,specs,confidence:conf,lastUpdated:'2026-07-03',relatedIntelIds:[],tags,sources,imageUrl:img,wikiUrl:wiki})

export const WEAPONS_BATCH31_EW_CYBER_SPACE: WeaponSystem[] = [

  // ── 전자전 체계 ─────────────────────────────────────────────────────
  w('ew-usa001','AN/ALQ-249 NGJ-MB 차세대재머','AN/ALQ-249 NGJ-MB Electronic Attack Pod','AIRCRAFT','USA','DEVELOPMENT','HIGH',
    '미 해군 차세대 재머 중밴드. F/A-18G 그라울러 교체. DRFM 기반 적응형 재밍.',
    {firstDeployed:'2023년(초도생산)',manufacturer:'레이시언'},
    ['NGJ-MB','차세대재머','그라울러','DRFM','전자전'],['레이시언','USN'],
    undefined,undefined,80),

  w('ew-usa002','EC-37B 컴파스콜 II','EC-37B Compass Call II EW Platform','AIRCRAFT','USA','DEVELOPMENT','HIGH',
    'EC-130H 후계 전자공격기. 걸프스트림 G550 기반. 더 빠르고 높고 멀리 재밍.',
    {firstDeployed:'2024년(목표)',manufacturer:'L3Harris·BAE Systems'},
    ['EC-37B','컴파스콜II','전자공격기','재밍'],['L3Harris','USAF'],
    undefined,undefined,78),

  w('ew-usa003','JAMMER MALD-J','MGM-168A MALD-J Missile Decoy Jammer','MISSILE','USA','OPERATIONAL','HIGH',
    '자율 비행 재밍·미끼 미사일. MALD 개량 재머 버전. 미사일 레이더 기만.',
    {range:'900km',firstDeployed:'2012년(J형)',manufacturer:'레이시언'},
    ['MALD-J','자율재머','미끼미사일','레이더기만'],['레이시언','USAF'],
    undefined,undefined,80),

  w('ew-rus001','크라수하-4 전자전시스템','Krasukha-4 Electronic Warfare Russia','GROUND','RUSSIA','OPERATIONAL','HIGH',
    '러시아 강력 전자전 플랫폼. J/X밴드 레이더 무력화. E-8/AWACS 탐지 거부. 시리아 실전.',
    {firstDeployed:'2012년',manufacturer:'KRET'},
    ['크라수하4','러시아전자전','EW','레이더무력화','AWACS'],['KRET','러시아군'],
    undefined,'https://en.wikipedia.org/wiki/Krasukha_(electronic_warfare_system)',80),

  w('ew-rus002','러시아 Zhitel 통신재머','Zhitel R-330Zh Communications Jammer','GROUND','RUSSIA','OPERATIONAL','HIGH',
    '러시아 Zhitel. GPS·위성통신·SATCOM 재밍. 우크라이나 드론 교란 활용.',
    {range:'100km+(추정)',firstDeployed:'2016년',manufacturer:'KRET'},
    ['Zhitel','러시아통신재머','GPS재밍','드론교란','우크라이나'],['KRET','러시아군'],
    undefined,undefined,78),

  w('ew-chn001','중국 DZ-1000 무인기재머','DZ-1000 UAV Jamming System China','GROUND','CHINA','OPERATIONAL','HIGH',
    '중국 드론 재머. 군집드론 방어. 한국·대만 적용 연구 중.',
    {firstDeployed:'2018년+(추정)',manufacturer:'중국 방산'},
    ['DZ-1000','중국재머','드론재머','군집드론방어'],['중국국방'],
    undefined,undefined,55),

  w('ew-isr001','이스라엘 사이버돔 C2 방어','CyberDome Israel C2 Cyber Defense','GROUND','ISRAEL','OPERATIONAL','HIGH',
    '이스라엘 국가급 사이버 방어 시스템. 군 C2 네트워크 보호. 이란 해킹 방어.',
    {firstDeployed:'2010년대',manufacturer:'엘빗·라파엘·이스라엘 정보부'},
    ['사이버돔','이스라엘사이버','C2방어','이란해킹'],['엘빗','이스라엘군'],
    undefined,undefined,70),

  // ── 우주 무기 ─────────────────────────────────────────────────────────
  w('sp-usa001','GPS 블록 III 위성','GPS Block III Satellite Constellation USA','UAV','USA','OPERATIONAL','HIGH',
    'GPS 블록 III 위성. 정밀도 3배 향상. M코드 군사 신호 보안 강화. ASAT 저항.',
    {firstDeployed:'2018년(3F1)',quantity:'10기(블록III 계획)',manufacturer:'록히드마틴'},
    ['GPS블록III','위성항법','M코드','ASAT저항'],['록히드마틴','USAF'],
    undefined,undefined,90),

  w('sp-usa002','X-37B 우주왕복기','X-37B OTV Space Plane USAF','UAV','USA','OPERATIONAL','MED',
    '미 공군 무인 우주왕복기. 비밀 궤도 임무. 800+일 체공 기록. 정찰·실험·무기 실험 추정.',
    {firstDeployed:'2010년',manufacturer:'보잉'},
    ['X-37B','우주왕복기','비밀임무','궤도실험'],['보잉','USAF'],
    undefined,'https://en.wikipedia.org/wiki/Boeing_X-37',75),

  w('sp-chn001','중국 ASAT SC-19','SC-19 DN-1 ASAT Anti-Satellite China','MISSILE','CHINA','OPERATIONAL','CRITICAL',
    '중국 ASAT 위성요격미사일. 2007년 자국 위성 격추 실험. 저궤도 위성 요격.',
    {ceiling:'865km+(저궤도)',firstDeployed:'2007년(실험)',manufacturer:'CASIC'},
    ['SC-19','DN-1','ASAT','위성요격','중국','2007실험'],['CASIC','PLA'],
    undefined,'https://en.wikipedia.org/wiki/SC-19',80),

  w('sp-rus001','러시아 Nudol PL-19 ASAT','PL-19 Nudol Direct-Ascent ASAT Russia','MISSILE','RUSSIA','OPERATIONAL','CRITICAL',
    '러시아 Nudol 직접상승 위성요격. 2021년 실제 위성 격추 실험. 국제 비난.',
    {firstDeployed:'2021년(실전실험)',manufacturer:'OKB Novator'},
    ['Nudol','PL-19','러시아ASAT','위성격추','2021'],['OKB Novator','러시아국방부'],
    undefined,undefined,78),

  w('sp-usa003','스타링크 군사 응용','Starlink Military Application Ukraine','UAV','USA','OPERATIONAL','HIGH',
    '스페이스X 스타링크 위성인터넷. 우크라이나 전쟁 전술통신 혁명. 러시아 재밍 시도.',
    {firstDeployed:'2022년(우크라이나)',manufacturer:'스페이스X'},
    ['스타링크','우크라이나','군사통신','저궤도위성','SpaceX'],['스페이스X','우크라이나군'],
    undefined,undefined,92),

  w('sp-kor001','한국 군사위성 ANASIS-II','ANASIS-II Korea Military Satellite','UAV','ROK','OPERATIONAL','HIGH',
    '한국 최초 전용 군사위성. 2020년 팰콘9 발사. X밴드 통신. KDX-III·현무미사일 타게팅 지원.',
    {firstDeployed:'2020년',manufacturer:'에어버스 방위우주·탈레스'},
    ['ANASIS-II','한국군사위성','X밴드','현무타게팅'],['에어버스','탈레스','방위사업청'],
    undefined,undefined,90),

  w('sp-jpn001','일본 QZS 미치비키 측위위성','QZSS Michibiki Navigation Japan','UAV','JAPAN','OPERATIONAL','MED',
    '일본 QZSS 준천정위성. 군민 공용. GPS 보완. 이착함·정밀타격 지원. 4기+확장 계획.',
    {firstDeployed:'2010년(QZS-1)',quantity:'4기',manufacturer:'미쓰비시전기'},
    ['QZSS','미치비키','일본위성','GPS보완','정밀타격'],['미쓰비시전기','JAXA'],
    undefined,undefined,85),

  // ── 사이버전 ──────────────────────────────────────────────────────────
  w('cy-usa001','CYBERCOM 악의적 사이버작전','US CYBERCOM Persistent Engagement','GROUND','USA','OPERATIONAL','HIGH',
    '미 사이버사령부 지속교전 독트린. 러시아·중국·북한·이란 사이버 선제대응. 우크라이나 지원.',
    {firstDeployed:'2018년(독트린)',manufacturer:'NSA·CYBERCOM'},
    ['CYBERCOM','사이버전','지속교전','러시아중국북한이란'],['CYBERCOM','NSA'],
    undefined,undefined,80),

  w('cy-isr001','스턱스넷 사이버무기','Stuxnet Cyber Weapon Iran Nuclear','GROUND','ISRAEL','RETIRED','HIGH',
    '이스라엘·미국 공동 개발 이란 핵무기 사보타주 웜바이러스. 나탄즈 원심분리기 1,000기 파괴.',
    {firstDeployed:'2010년(발견)',manufacturer:'NSA·Unit 8200 공동'},
    ['스턱스넷','사이버무기','이란핵','나탄즈','최초사이버전쟁'],['NYT','랭글로이스'],
    undefined,'https://en.wikipedia.org/wiki/Stuxnet',92),

  w('cy-rus001','러시아 sandworm APT 사이버','Sandworm APT Russian GRU Cyber Ops','GROUND','RUSSIA','OPERATIONAL','CRITICAL',
    '러시아 GRU 산드웜 APT. 우크라이나 전력망·기관 공격. NotPetya 랜섬웨어 배포.',
    {firstDeployed:'2015년+(우크라이나전력)',manufacturer:'GRU Unit 74455'},
    ['산드웜','러시아APT','GRU','우크라이나전력망','NotPetya'],['CISA','US-CERT'],
    undefined,undefined,85),

  w('cy-chn001','중국 APT41 복합위협','APT41 China Double Dragon Cyber','GROUND','CHINA','OPERATIONAL','CRITICAL',
    '중국 APT41. 국가+범죄 이중목적. 코로나백신 지재권 절취. 한국 방산 해킹 의혹.',
    {firstDeployed:'2012년+(추정)',manufacturer:'중국 국가안전부 연계'},
    ['APT41','중국사이버','국가해킹','방산지재권','한국해킹의혹'],['FireEye','Mandiant'],
    undefined,undefined,82),

  w('cy-dprk001','북한 Lazarus APT','Lazarus Group North Korea Cyber','GROUND','DPRK','OPERATIONAL','CRITICAL',
    '북한 라자루스 APT. 소니픽처스·방글라데시중앙은행·암호화폐 절취. 외화 조달 핵심.',
    {firstDeployed:'2009년+(추정)',manufacturer:'정찰총국 121국'},
    ['라자루스','북한사이버','정찰총국','소니픽처스','암호화폐탈취'],['FBI','CISA','UN보고서'],
    undefined,'https://en.wikipedia.org/wiki/Lazarus_Group',90),

  w('cy-irn001','이란 APT33 사이버전','APT33 Iran Elfin Cyber Operations','GROUND','IRAN','OPERATIONAL','HIGH',
    '이란 APT33. 사우디 아람코·항공업계 공격. 와이퍼 악성코드. 이란IRGC 연계.',
    {firstDeployed:'2013년+(추정)',manufacturer:'이란 IRGC 연계'},
    ['APT33','이란사이버','아람코','와이퍼','IRGC'],['FireEye','Mandiant'],
    undefined,undefined,80),

  // ── 무인 수중체계 ─────────────────────────────────────────────────────
  w('uv-usa001','ORCA XLUUV 초대형무인잠수함','ORCA XLUUV Extra-Large UUV Boeing','SUBMARINE','USA','DEVELOPMENT','HIGH',
    '보잉 오르카 초대형 무인잠수함. 전뢰·공격·정찰 다목적. 6,500km 자율항행.',
    {displacement:'50t(추정)',range:'6,500km',firstDeployed:'2022년(시험)',manufacturer:'보잉'},
    ['오르카','XLUUV','무인잠수함','자율','보잉'],['보잉','USN'],
    undefined,undefined,75),

  w('uv-usa002','UUV 머크리 기뢰탐지','Knifefish UUV Mine Detection USA','SUBMARINE','USA','DEVELOPMENT','MED',
    '나이프피시 UUV. 함저 기뢰 탐색·식별. LCS 탑재. 인명피해 없는 기뢰전.',
    {firstDeployed:'2020년(시험)',manufacturer:'제너럴다이나믹스 미션시스템'},
    ['나이프피시','UUV','기뢰탐지','LCS탑재'],['GD','USN'],
    undefined,undefined,75),

  w('uv-usa003','Sea Hunter USV 미해군','Sea Hunter ACTUV Autonomous USV','SHIP','USA','DEVELOPMENT','HIGH',
    '미 해군 반자율 수상무인정. 서브 추적 특화. 30일 자율항해. DARPA 개발.',
    {displacement:'145t',speed:'27노트',firstDeployed:'2016년(시험)',manufacturer:'레이시언·DARPA'},
    ['시헌터','ACTUV','자율수상정','잠수함추적'],['레이시언','DARPA','USN'],
    undefined,'https://en.wikipedia.org/wiki/ACTUV',80),

  w('uv-rus001','포세이돈 2M39 핵무인잠수함','Poseidon 2M39 Nuclear UUV Russia','SUBMARINE','RUSSIA','DEVELOPMENT','CRITICAL',
    '러시아 포세이돈 핵 자폭 무인잠수함. 100Mt 수소폭탄 탑재(주장). 마하 70+ 수중속도(주장). 억제 목적.',
    {payload:'100Mt 수소폭탄(주장)',range:'10,000km+(주장)',firstDeployed:'2025년+(예상)',manufacturer:'루빈 설계국'},
    ['포세이돈','핵UUV','러시아핵','2M39','억제'],['러시아국방부'],
    undefined,'https://en.wikipedia.org/wiki/Status-6_Oceanic_Multipurpose_System',65),

  // ── 극초음속 추가 ─────────────────────────────────────────────────────
  w('hv-usa001','HALO극초음속폭격기 이후','Next-Generation Air Dominance NGAD USA','AIRCRAFT','USA','DEVELOPMENT','HIGH',
    '미 공군 차세대 공중지배 플랫폼. F-22 대체 6세대. 초음속 순항·스텔스·AI 조종사 협력.',
    {firstDeployed:'2030년대',manufacturer:'보잉 또는 록히드마틴'},
    ['NGAD','6세대전투기','F-22대체','AI조종','차세대'],['USAF'],
    undefined,undefined,60),

  w('hv-jpn001','일본 Hypersonic Glide Bomb','Japan HGV Hypersonic Standoff Missile','MISSILE','JAPAN','DEVELOPMENT','HIGH',
    '일본 극초음속 글라이더 폭탄. 방위성 개발. 도서 방어·중국 PLAN 억제. 2030년 목표.',
    {speed:'마하 5+(목표)',range:'1,000km+(목표)',firstDeployed:'2030년(목표)',manufacturer:'방위성·미쓰비시'},
    ['일본HGV','극초음속','도서방어','중국억제'],['방위성','미쓰비시'],
    undefined,undefined,65),

  // ── 특수작전 지원 ────────────────────────────────────────────────────
  w('sf-usa001','SOCOM AC-130J 고스트라이더','AC-130J Ghostrider Gunship SOCOM','AIRCRAFT','USA','OPERATIONAL','HIGH',
    '미 SOCOM 신형 건십. 30mm·105mm 측면포·레이저·미사일. 정밀 근접화력지원.',
    {speed:'480km/h',crew:'8명+',armament:'30mm Mk44·105mm M102·레이저유도폭탄',firstDeployed:'2017년',quantity:'37기(계획)',manufacturer:'록히드마틴'},
    ['AC-130J','고스트라이더','건십','SOCOM','근접화력'],['록히드마틴','SOCOM'],
    undefined,'https://en.wikipedia.org/wiki/Lockheed_AC-130',90),

  w('sf-usa002','MC-130J 커맨도 II','MC-130J Commando II Special Ops Support','AIRCRAFT','USA','OPERATIONAL','MED',
    '특수전 침투·보급 항공기. C-130J 개조. 공중급유·해상탈출. 해치 강하.',
    {speed:'643km/h',crew:'4명+',firstDeployed:'2012년',manufacturer:'록히드마틴'},
    ['MC-130J','커맨도II','특수전수송','공중급유','해치강하'],['록히드마틴','SOCOM'],
    undefined,undefined,88),

  w('sf-usa003','MH-47G 치누크 소콤','MH-47G Chinook SOCOM Special Ops','HELICOPTER','USA','OPERATIONAL','HIGH',
    'SOCOM 전용 CH-47G 개조. 야시경·공중급유탐침·DAP 가능. 레이더 통합. 야간침투.',
    {speed:'293km/h',crew:'3+54명',armament:'M134미니건·M60D',firstDeployed:'2000년대',manufacturer:'보잉'},
    ['MH-47G','치누크SOCOM','야간침투','특수전헬기'],['보잉','SOCOM'],
    undefined,undefined,88),

  w('sf-jpn001','일본 특수부대 대테러헬기','SH-60K JMSDF Modified ASW / Japan SOF','HELICOPTER','JAPAN','OPERATIONAL','LOW',
    '일본 해상자위대 대잠헬기 특수전 활용. 초기대테러 지원.',
    {speed:'260km/h',crew:'2+4명',firstDeployed:'2005년',manufacturer:'미쓰비시'},
    ['SH-60K','일본대잠헬기','특수전','JMSDF'],['미쓰비시','JMSDF'],
    undefined,undefined,75),

  w('sf-rok001','한국 특수전 헬기 HH-47','HH-47D ROK Special Forces Helicopter','HELICOPTER','USA','OPERATIONAL','LOW',
    '한국 특수전 지원 CH-47D 개조. 야시·공중급유 추가. 특수전사령부 배치.',
    {speed:'293km/h',crew:'3+',firstDeployed:'2000년대',manufacturer:'보잉·KAI개조'},
    ['HH-47','한국특수전헬기','공중급유','특수전사령부'],['KAI','특수전사령부'],
    undefined,undefined,80),

  // ── 지뢰대응·공병 무기 ─────────────────────────────────────────────────
  w('en-usa001','Buffalo MRAP 지뢰대응','Buffalo MRAP Mine-Resistant Vehicle USA','GROUND','USA','OPERATIONAL','LOW',
    'V선체 지뢰저항 차량. IED 대응 핵심. 이라크·아프간 실전. 60개국+ 수출.',
    {weight:'23t',armament:'없음(구난·탐지)',crew:'2+4명',speed:'105km/h',firstDeployed:'2006년',manufacturer:'Force Protection'},
    ['Buffalo','MRAP','지뢰저항','IED대응','이라크'],['Force Protection','미육군'],
    undefined,'https://en.wikipedia.org/wiki/Buffalo_MRAP',85),

  w('en-rok001','한국 K600 장애물돌파장갑차','K600 Obstacle Breaching Armored Vehicle Korea','GROUND','ROK','DEVELOPMENT','MED',
    'K600 전투공병장갑차. K21 기반. 불도저·굴착·폭파 통합. 2023년 시제.',
    {firstDeployed:'2025년(목표)',manufacturer:'현대로템'},
    ['K600','장애물돌파','공병장갑차','한국'],['현대로템'],
    undefined,undefined,68),

  // ── 미래 무기 개념 ─────────────────────────────────────────────────────
  w('fu-usa001','Collaborative Combat Aircraft CCA','CCA Collaborative Combat Aircraft AI Wingman','UAV','USA','DEVELOPMENT','HIGH',
    '미 공군 협력전투항공기. AI 무인 僚機. F-35·NGAD와 편대비행. 2028년 IOC.',
    {firstDeployed:'2028년(IOC목표)',manufacturer:'제너럴아토믹스·안두릴'},
    ['CCA','협력전투','AI료기','F-35편대','NGAD편대'],['USAF'],
    undefined,undefined,70),

  w('fu-aus001','Ghost Bat CCA 호주 배치','MQ-28A Ghost Bat Loyal Wingman Australia Full','UAV','AUSTRALIA','DEVELOPMENT','HIGH',
    '보잉 고스트배트 호주 배치. AI 편대비행. RAAF F/A-18 Growler·F-35A 협력.',
    {firstDeployed:'2024년+(계획)',manufacturer:'보잉 호주'},
    ['고스트배트','호주','AI편대','보잉','CCA'],['보잉','RAAF'],
    undefined,undefined,72),

  w('fu-eu001','FCAS 유럽 차세대전투시스템','FCAS Future Combat Air System Europe','AIRCRAFT','NATO','DEVELOPMENT','HIGH',
    '프랑스·독일·스페인 FCAS. 6세대 전투기+RCAS 무인기 시스템. 2040년대 목표.',
    {firstDeployed:'2040년대(목표)',manufacturer:'다소·에어버스·인드라'},
    ['FCAS','유럽6세대','다소에어버스','2040년대'],['다소','에어버스','인드라'],
    undefined,'https://en.wikipedia.org/wiki/Future_Combat_Air_System_(France,_Germany_and_Spain)',70),

  w('fu-uk001','템페스트 GCAP 영국','Tempest GCAP UK BAE 6th Gen Fighter','AIRCRAFT','UK','DEVELOPMENT','HIGH',
    '영국 GCAP 6세대 전투기. 일본·이탈리아 협력. AI 파일럿 보조. 2035년 목표.',
    {firstDeployed:'2035년(목표)',manufacturer:'BAE Systems·롤스로이스·레오나르도'},
    ['템페스트','GCAP','6세대','영국','일본이탈리아'],['BAE','롤스로이스','레오나르도'],
    undefined,'https://en.wikipedia.org/wiki/BAE_Systems_Tempest',72),

]
