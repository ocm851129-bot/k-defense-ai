import type { WeaponSystem } from './weapons'
const w = (id:string,name:string,nameEng:string,cat:WeaponSystem['category'],origin:WeaponSystem['origin'],status:WeaponSystem['status'],threat:WeaponSystem['threatRating'],desc:string,specs:WeaponSystem['specs'],tags:string[],sources:string[],img?:string,wiki?:string,conf=88): WeaponSystem=>({id,name,nameEng,category:cat,origin,status,threatRating:threat,description:desc,detail:`## ${nameEng}\n\n${desc}\n\n### 주요 제원\n${Object.entries(specs).filter(([,v])=>v).map(([k,v])=>`- ${k}: ${v}`).join('\n')}`,specs,confidence:conf,lastUpdated:'2026-07-01',relatedIntelIds:[],tags,sources,imageUrl:img,wikiUrl:wiki})

export const WEAPONS_EXP_EUROPE: WeaponSystem[] = [

  // ── 영국 (UK) ─────────────────────────────────────────────────────────────
  w('uk-a001','타이푼 FGR4','Eurofighter Typhoon FGR4','AIRCRAFT','UK','OPERATIONAL','LOW',
    '영국 공군 주력 다목적 전투기. 유로파이터 4개국 공동개발. 미티어·브림스톤·스톰 섀도 탑재.',
    {speed:'마하 2.0',range:'2,900km',ceiling:'19,812m',crew:'1~2명',armament:'27mm 기관포·미티어·ASRAAM·브림스톤·스톰섀도',firstDeployed:'2003년',manufacturer:'BAE시스템즈'},
    ['타이푼','유로파이터','FGR4','미티어','영국공군'],['RAF','BAE시스템즈'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Typhoon_FGR4_%28ZK349%29.jpg/320px-Typhoon_FGR4_%28ZK349%29.jpg',
    'https://en.wikipedia.org/wiki/Eurofighter_Typhoon',95),

  w('uk-a002','F-35B 라이트닝 II (영국)','F-35B Lightning II (RAF/RN)','AIRCRAFT','UK','OPERATIONAL','LOW',
    '영국 공군·해군 탑재 F-35B. 퀸엘리자베스 항모 탑재. MBDA 미티어·브림스톤 통합 예정.',
    {speed:'마하 1.6',range:'1,670km',crew:'1명',armament:'AIM-132 ASRAAM·미티어·Paveway IV',firstDeployed:'2018년(영국)',manufacturer:'록히드마틴',quantity:'48기+'},
    ['F-35B','영국','퀸엘리자베스','STOVL','항모'],['RAF','RN'],
    undefined,'https://en.wikipedia.org/wiki/Lockheed_Martin_F-35_Lightning_II',97),

  w('uk-a003','퀸엘리자베스급 항모','HMS Queen Elizabeth-class CVF','NAVAL','UK','OPERATIONAL','LOW',
    '영국 최대 수상전투함. 6.5만 톤. F-35B 36대 탑재 가능. 2척 운용. 영국 해군 전략 핵심.',
    {displacement:'65,000톤',length:'284m',crew:'679+비행단1,600',armament:'팰랭크스CIWS×3·30mm 기관포·미스트랄',propulsion:'기계식+전기추진',firstDeployed:'2017년',manufacturer:'BAE시스템즈',quantity:'2척'},
    ['퀸엘리자베스','항모','CVF','F-35B','영국해군'],['RN','BAE'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/HMS_Queen_Elizabeth_%28R08%29_in_the_Solent_in_2018_%28cropped%29.jpg/320px-HMS_Queen_Elizabeth_%28R08%29_in_the_Solent_in_2018_%28cropped%29.jpg',
    'https://en.wikipedia.org/wiki/Queen_Elizabeth-class_aircraft_carrier',97),

  w('uk-a004','아스튜트급 핵잠수함','Astute-class SSN','SUBMARINE','UK','OPERATIONAL','LOW',
    '영국 최신 핵추진 공격잠수함. 7척 건조 중. 토마호크·스피어피시 어뢰. 트라이던트 후속 지원.',
    {displacement:'7,400톤(수중)',length:'97m',crew:'98명',armament:'토마호크×16·스피어피시 어뢰',propulsion:'PWR2 원자로',firstDeployed:'2010년',manufacturer:'BAE시스템즈',quantity:'5척(+2 건조)'},
    ['아스튜트급','SSN','핵추진','영국잠수함','토마호크'],['RN','BAE'],
    undefined,'https://en.wikipedia.org/wiki/Astute-class_submarine',95),

  w('uk-a005','뱅가드급 SSBN (트라이던트)','Vanguard-class SSBN Trident','SUBMARINE','UK','OPERATIONAL','LOW',
    '영국 핵억제 잠수함. 트라이던트 II D5 16발. 영국 유일 핵무기 운반 수단. 24시간 순찰 체계.',
    {displacement:'15,980톤(수중)',length:'149.9m',crew:'135명',armament:'트라이던트 II D5 SLBM×16',propulsion:'PWR2 원자로',firstDeployed:'1993년',quantity:'4척'},
    ['뱅가드급','SSBN','트라이던트','영국핵','핵억제'],['RN'],
    undefined,'https://en.wikipedia.org/wiki/Vanguard-class_submarine',97),

  w('uk-m001','스톰 섀도 / SCALP-EG','Storm Shadow / SCALP-EG Cruise Missile','CRUISE','UK','OPERATIONAL','LOW',
    '영국·프랑스 공동 스텔스 공대지 순항미사일. 사거리 560km+. 우크라이나 제공·실전 사용. F-35·타이푼 탑재.',
    {range:'560km+',speed:'마하 0.8',payload:'450kg 탠덤 탄두',guidance:'INS+지형추적+IIR',firstDeployed:'2003년',manufacturer:'MBDA'},
    ['스톰섀도','SCALP','공대지순항','우크라이나','스텔스'],['RAF','MBDA'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/RAF_Museum%2C_Colindale%2C_London_-_DSC06025.JPG/330px-RAF_Museum%2C_Colindale%2C_London_-_DSC06025.JPG','https://en.wikipedia.org/wiki/Storm_Shadow',97),

  w('uk-m002','브림스톤 2','Brimstone 2 ASM','ASM','UK','OPERATIONAL','LOW',
    '밀리미터파 레이더+레이저 복합 유도 공대지미사일. 이동표적 자동추적. 타이푼·토네이도 탑재. 우크라이나 제공.',
    {range:'12km(저고도)/60km(고고도)',payload:'6.3kg 성형작약',guidance:'밀리파레이더+SAL',firstDeployed:'2005년(2형 2016)',manufacturer:'MBDA'},
    ['브림스톤','밀리미터파','공대지','이동표적','우크라이나'],['RAF','MBDA'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Missile_MBDA_Brimstone.jpg/330px-Missile_MBDA_Brimstone.jpg','https://en.wikipedia.org/wiki/Brimstone_(missile)',95),

  w('uk-m003','AIM-132 ASRAAM','AIM-132 ASRAAM Short-Range AAM','AAM','UK','OPERATIONAL','LOW',
    '영국 개발 단거리 IR 유도 AAM. 마하 3+. 헬멧 연동 사격. 타이푼·F-35B 탑재.',
    {range:'50km',speed:'마하 3+',guidance:'적외선 영상시커',firstDeployed:'1998년',manufacturer:'MBDA'},
    ['ASRAAM','영국AAM','단거리','적외선','F-35'],['RAF','MBDA'],
    undefined,'https://en.wikipedia.org/wiki/AIM-132_ASRAAM',92),

  w('uk-g001','챌린저 3 전차','Challenger 3 MBT','GROUND','UK','OPERATIONAL','LOW',
    '챌린저 2 전면 업그레이드형. 120mm 활강포(기존 강선포 교체)·EPOS 능동방호·디지털화. 148대 개조 계획.',
    {weight:'66.5톤',armament:'120mm 활강포·GPMG',crew:'4명',speed:'56km/h',propulsion:'CV12 1,200hp 디젤',firstDeployed:'2027년(예정)',manufacturer:'BAE시스템즈·레인메탈'},
    ['챌린저3','영국전차','120mm활강포','EPOS','업그레이드'],['영국육군','BAE'],
    undefined,'https://en.wikipedia.org/wiki/Challenger_2',90),

  // ── 프랑스 (FRANCE) ────────────────────────────────────────────────────────
  w('fra-a001','라팔 F4 (Multi)','Dassault Rafale F4','AIRCRAFT','FRANCE','OPERATIONAL','LOW',
    '프랑스 4.5세대 다목적 전투기. 그리스·이집트·인도·카타르·UAE 수출 성공. ASMPA 핵순항 탑재.',
    {speed:'마하 1.8',range:'3,700km',crew:'1~2명',armament:'30mm·MICA·미티어·SCALP·ASMPA',firstDeployed:'2004년',manufacturer:'다소항공',quantity:'230기+(수출 포함)'},
    ['라팔','프랑스전투기','ASMPA','4.5세대','수출성공'],['프랑스공군','다소'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Rafale_F3R_-_12%E2%80%BAGA_-_Cambrai_%28cropped%29.jpg/320px-Rafale_F3R_-_12%E2%80%BAGA_-_Cambrai_%28cropped%29.jpg',
    'https://en.wikipedia.org/wiki/Dassault_Rafale',97),

  w('fra-a002','드골급 항공모함','Charles de Gaulle-class CVN','NAVAL','FRANCE','OPERATIONAL','LOW',
    '프랑스 핵추진 항공모함. 라팔 해군형·호크아이 탑재. 유럽 유일 핵추진 항모.',
    {displacement:'42,500톤',length:'261.5m',crew:'1,950명+비행단',armament:'아스터15·20mm·CIWS',propulsion:'K15 원자로 ×2',firstDeployed:'2001년',quantity:'1척'},
    ['드골','핵추진항모','CVN','라팔해군형','유럽유일'],['프랑스해군'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Charles_De_Gaulle_at_sea.jpg/320px-Charles_De_Gaulle_at_sea.jpg',
    'https://en.wikipedia.org/wiki/French_aircraft_carrier_Charles_de_Gaulle',97),

  w('fra-a003','ASMPA 핵순항미사일','ASMP-A Nuclear Air-Launched Cruise','CRUISE','FRANCE','OPERATIONAL','LOW',
    '프랑스 공중발사 핵순항미사일. 라팔·미라지 2000N 탑재. 사거리 500km. TNA 핵탄두(100kt).',
    {range:'500km',speed:'마하 3',payload:'TNA 핵탄두 100kt',guidance:'INS+지형추적',firstDeployed:'2009년',manufacturer:'MBDA'},
    ['ASMPA','프랑스핵미사일','공중발사','라팔','핵억제'],['프랑스공군','MBDA'],
    undefined,'https://en.wikipedia.org/wiki/ASMP',95),

  w('fra-a004','M51 SLBM','M51 SLBM','SLBM','FRANCE','OPERATIONAL','LOW',
    '프랑스 르트리옹팡급 SSBN 탑재 SLBM. 사거리 10,000km. MIRV 6기(100kt). 프랑스 핵억제 해상요소.',
    {range:'10,000km',payload:'MIRV 6기 100kt',propulsion:'3단 고체추진',firstDeployed:'2010년',manufacturer:'에어로제트·CNES'},
    ['M51','SLBM','프랑스핵','르트리옹팡','핵억제'],['프랑스해군'],
    undefined,'https://en.wikipedia.org/wiki/M51_(missile)',95),

  w('fra-m001','미티어 공대공미사일','MBDA Meteor BVRAAM','AAM','FRANCE','OPERATIONAL','LOW',
    '유럽 공동개발 최강 BVR AAM. 무연소 구역(NEZ) 60km. 램제트 추진. 사거리 200km+.',
    {range:'200km+',speed:'마하 4+',guidance:'능동레이더+INS+데이터링크',firstDeployed:'2016년',manufacturer:'MBDA'},
    ['미티어','BVR AAM','램제트','NEZ','유럽최강'],['MBDA','RAF','프랑스'],
    undefined,'https://en.wikipedia.org/wiki/Meteor_(missile)',98),

  w('fra-m002','엑조세 AM39','Exocet AM39 Anti-Ship Missile','ASM','FRANCE','OPERATIONAL','LOW',
    '세계 최다 수출 대함미사일. 포클랜드 전쟁 검증. 사거리 70km. 40개국 운용.',
    {range:'70km',speed:'마하 0.93',payload:'165kg 반갑옷 관통',guidance:'INS+능동레이더',firstDeployed:'1974년',manufacturer:'MBDA'},
    ['엑조세','대함미사일','포클랜드','수출1위','40개국'],['MBDA'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Exocet_MM38_p1230157.jpg/320px-Exocet_MM38_p1230157.jpg',
    'https://en.wikipedia.org/wiki/Exocet',98),

  w('fra-g001','르클레르 전차','Leclerc MBT','GROUND','FRANCE','OPERATIONAL','LOW',
    '프랑스 3세대 주력전차. 자동장전 3인승. UAE 수출(436대). 120mm 활강포. 세계 최고 수준 MBT.',
    {weight:'56.5톤',armament:'120mm CN120-26 활강포·12.7mm',crew:'3명',speed:'72km/h',propulsion:'SACM V8X 1,500hp',firstDeployed:'1992년',manufacturer:'넥스터',quantity:'200기(프랑스)/436기(UAE)'},
    ['르클레르','프랑스전차','3세대','자동장전','UAE수출'],['프랑스육군','넥스터'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Leclerc_T10.jpg/320px-Leclerc_T10.jpg',
    'https://en.wikipedia.org/wiki/Leclerc_tank',95),

  // ── 독일 (GERMANY) ──────────────────────────────────────────────────────────
  w('deu-a001','타이푼 ECR Tranche 4','Typhoon Tranche 4 (Eurofighter)','AIRCRAFT','GERMANY','DEVELOPMENT','LOW',
    '독일 공군 Tranche 4 타이푼. 전자전 파생형(EK) 포함. 토네이도 후속. 2030년 전력화 목표.',
    {speed:'마하 2.0',range:'2,900km',crew:'1~2명',armament:'27mm·미티어·IRIS-T·KEPD 350',firstDeployed:'2030년(예정)',manufacturer:'유로파이터 컨소시엄'},
    ['타이푼T4','독일공군','EK','전자전','토네이도후속'],['독일공군','유로파이터'],
    undefined,'https://en.wikipedia.org/wiki/Eurofighter_Typhoon',85),

  w('deu-a002','레오파르트 2A8 전차','Leopard 2A8 MBT','GROUND','GERMANY','OPERATIONAL','LOW',
    '독일 3세대+ 주력전차 최신형. 능동방호(Trophy) 탑재. 19개국 운용·우크라이나 제공.',
    {weight:'64.5톤',armament:'120mm Rh120 L/55A1 활강포·MG3',crew:'4명',speed:'72km/h',propulsion:'MTU 890 1,500hp',firstDeployed:'2024년',manufacturer:'KNDS(KMW·넥스터)'},
    ['레오파르트2A8','독일전차','Trophy','우크라이나','19개국'],['독일육군','KNDS'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Leopard_2_A7_der_Bundeswehr_-_Recht.jpg/320px-Leopard_2_A7_der_Bundeswehr_-_Recht.jpg',
    'https://en.wikipedia.org/wiki/Leopard_2',97),

  w('deu-m001','IRIS-T SLM','IRIS-T SLM Medium-Range SAM','SAM','GERMANY','OPERATIONAL','LOW',
    '독일 독자 중거리 지대공미사일. 사거리 40km. 우크라이나 제공·전력망 방어 성과. 레이더+지휘차 통합.',
    {range:'40km',altitude:'20km',guidance:'적외선 영상시커',firstDeployed:'2022년(우크라이나)',manufacturer:'딜빌이 / Diehl'},
    ['IRIS-T SLM','독일방공','우크라이나','중거리SAM','전력망방어'],['독일군','딜'],
    undefined,'https://en.wikipedia.org/wiki/IRIS-T',95),

  w('deu-m002','KEPD 350 타우루스','KEPD 350 Taurus Cruise Missile','CRUISE','GERMANY','OPERATIONAL','LOW',
    '독일·스웨덴 공동 스텔스 공대지 순항미사일. 사거리 500km. 우크라이나 제공 논란(독일 거부).',
    {range:'500km',speed:'마하 0.9',payload:'481kg 탠덤 탄두',guidance:'INS+지형추적+IIR',firstDeployed:'2005년',manufacturer:'MBDA·딜'},
    ['타우루스','KEPD350','순항미사일','우크라이나논란','스텔스'],['독일공군','스페인'],
    undefined,'https://en.wikipedia.org/wiki/Taurus_KEPD_350',95),

  w('deu-n001','작센급 방공 호위함','Sachsen-class Air Defense Frigate F124','NAVAL','GERMANY','OPERATIONAL','LOW',
    '독일 해군 방공 특화 호위함. APAR 능동위상배열 레이더·SM-2·RAM. 3척 운용.',
    {displacement:'5,600톤',length:'143m',crew:'255명',armament:'SM-2 블록IIIA·RAM·76mm 함포',propulsion:'CODOG 가스터빈+디젤',firstDeployed:'2004년',quantity:'3척'},
    ['작센급','독일호위함','APAR','SM-2','방공'],['독일해군'],
    undefined,'https://en.wikipedia.org/wiki/Sachsen-class_frigate',90),

  // ── 스웨덴 (SWEDEN) ─────────────────────────────────────────────────────────
  w('swe-a001','그리펜 E','Saab Gripen E','AIRCRAFT','SWEDEN','OPERATIONAL','LOW',
    '스웨덴 4.5세대 경량 다목적 전투기. 넓은 기지 호환성. NATO 가입으로 F-35와 협동. 15분 재출격.',
    {speed:'마하 2.0',range:'3,200km',crew:'1명',armament:'27mm BK27·미티어·IRIS-T·KEPD350',firstDeployed:'2022년(E형)',manufacturer:'사브'},
    ['그리펜E','스웨덴','경량전투기','사브','NATO'],['스웨덴공군','사브'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Gripen_E_39-7_-_RIAT_2023.jpg/320px-Gripen_E_39-7_-_RIAT_2023.jpg',
    'https://en.wikipedia.org/wiki/Saab_JAS_39_Gripen',95),

  w('swe-m001','RBS-15 대함미사일','RBS-15 Mk.III Anti-Ship Missile','SSM','SWEDEN','OPERATIONAL','LOW',
    '스웨덴 장거리 대함·대지 순항미사일. 사거리 300km+. GPS+능동레이더. 그리펜·함정 발사 가능.',
    {range:'300km+',speed:'마하 0.9',payload:'200kg 반갑옷탄두',guidance:'GPS+INS+능동레이더',firstDeployed:'1985년(Mk.III 2004)',manufacturer:'사브-보포스다이나믹스'},
    ['RBS-15','스웨덴대함','Mk.III','그리펜','함정발사'],['스웨덴해군','사브'],
    undefined,'https://en.wikipedia.org/wiki/RBS-15',88),

  // ── 우크라이나 (UKRAINE) ───────────────────────────────────────────────────
  w('ukr-m001','R-360 넵튠 대함미사일','R-360 Neptune Anti-Ship Missile','SSM','UKRAINE','OPERATIONAL','MED',
    '우크라이나 독자 개발 대함순항미사일. 2022년 4월 러시아 순양함 모스크바 격침. 사거리 300km.',
    {range:'300km',speed:'마하 0.9',payload:'150kg',guidance:'INS+능동레이더',firstDeployed:'2020년',manufacturer:'루흐설계국'},
    ['넵튠','R-360','대함미사일','모스크바격침','우크라이나'],['우크라이나군'],
    undefined,'https://en.wikipedia.org/wiki/R-360_Neptune',95),

  w('ukr-m002','무인수상정 USV 공격형','Sea Baby / Magura V5 USV Attack','NAVAL','UKRAINE','OPERATIONAL','MED',
    '우크라이나 자체 개발 폭발물 탑재 자율 무인수상정. 케르치 대교·러시아 상륙함 공격. 저비용 비대칭 무기.',
    {range:'1,000km+(추정)',payload:'300~450kg 폭발물',speed:'80km/h',firstDeployed:'2022년'},
    ['Sea Baby','Magura','USV','무인수상정','비대칭'],['우크라이나해군'],
    undefined,undefined,88),

  w('ukr-a001','Tu-141 Strizh 개조 드론','Tu-141 Strizh Recon Drone (Modified)','UAV','UKRAINE','OPERATIONAL','MED',
    '소련 정찰드론을 자폭·타격용으로 개조. 모스크바 등 러시아 영토 심층 타격에 사용.',
    {range:'1,000km+(수정)',speed:'1,100km/h',payload:'폭발물(개조)',firstDeployed:'2022년(개조)',manufacturer:'소련제 개조'},
    ['Tu-141','스트리쥐','우크라이나드론','러시아본토','개조'],['우크라이나군'],
    undefined,undefined,82),

  // ── NATO 공동 ────────────────────────────────────────────────────────────
  w('nato-m001','SPEAR 3 (영/이)','SPEAR 3 Air-Launched Mini-Cruise Missile','ASM','UK','DEVELOPMENT','LOW',
    '소형 공중발사 순항미사일. F-35 내부 탑재(4발). 사거리 140km. 광대역 다표적 교전.',
    {range:'140km',speed:'마하 0.9+',payload:'소형 탄두',guidance:'GPS+INS+데이터링크',firstDeployed:'2028년(예정)',manufacturer:'MBDA'},
    ['SPEAR3','소형순항미사일','F-35내부','영국','MBDA'],['RAF','MBDA'],
    undefined,undefined,72),

  w('nato-m002','JNLWD 비살상 지향성에너지','JNLWD Active Denial System','GROUND','USA','OPERATIONAL','LOW',
    '파장 95GHz 밀리미터파 지향성에너지 비살상 군중통제. 피부 표면 열감각 자극. 작전적 활용 확대.',
    {range:'1,000m',speed:'광속',firstDeployed:'2010년(ADS)',manufacturer:'레이시온·노스럽그러먼'},
    ['ADS','지향성에너지','비살상','밀리미터파','군중통제'],['USMC','JNLWD'],
    undefined,undefined,80),

  w('nato-m003','SHORAD 아이언돔 (US Army)','Iron Dome C-RAM (US Army Eval)','SAM','USA','TESTING','LOW',
    '이스라엘제 아이언돔 미국 육군 평가 도입. 우크라이나 제공·카운터-드론 역할.',
    {range:'70km',altitude:'10km',guidance:'능동레이더',firstDeployed:'2020년(미군평가)',manufacturer:'라파엘·레이시온'},
    ['아이언돔','미국육군','SHORAD','드론요격','우크라이나'],['US Army','이스라엘'],
    undefined,undefined,80),

  // ── 이탈리아 (Italy) ────────────────────────────────────────────────────────
  w('ita-a001','유로파이터 타이푼 (이탈리아)','Eurofighter Typhoon (Italian AF)','AIRCRAFT','MULTI','OPERATIONAL','LOW',
    '이탈리아 공군 타이푼 96대. 미티어·MBDA 아스람 통합. Tranche 3 최신 전력화.',
    {speed:'마하 2.0',range:'2,900km',crew:'1~2명',armament:'미티어·IRIS-T·스톰섀도',firstDeployed:'2004년(이탈리아)',quantity:'96기'},
    ['타이푼','이탈리아','유로파이터','미티어','Tranche3'],['이탈리아공군'],
    undefined,'https://en.wikipedia.org/wiki/Eurofighter_Typhoon',93),

  w('ita-n001','카보우르급 항모','Cavour-class Aircraft Carrier (F-35B)','NAVAL','MULTI','OPERATIONAL','LOW',
    '이탈리아 STOVL 경항모. F-35B 탑재 개조 완료. 27,100톤. 지중해 NATO 작전 핵심.',
    {displacement:'27,100톤',length:'244m',crew:'830+비행단',armament:'ASTER-15·76mm Oto·팰랭크스',firstDeployed:'2008년(F-35B 2022)',manufacturer:'핀칸티에리',quantity:'1척'},
    ['카보우르','이탈리아항모','F-35B','경항모','NATO'],['이탈리아해군'],
    undefined,'https://en.wikipedia.org/wiki/Italian_aircraft_carrier_Cavour',92),

  // ── 네덜란드 (Netherlands) ───────────────────────────────────────────────────
  w('nld-a001','F-35A (네덜란드)','F-35A Lightning II (RNLAF)','AIRCRAFT','USA','OPERATIONAL','LOW',
    '네덜란드 공군 F-35A 52대. B61-12 핵공유 임무 수행. NATO 핵공유 프로그램.',
    {speed:'마하 1.6',range:'2,200km',crew:'1명',firstDeployed:'2023년(작전)',quantity:'52기'},
    ['F-35A','네덜란드','핵공유','B61-12','NATO'],['네덜란드공군'],
    undefined,'https://en.wikipedia.org/wiki/Lockheed_Martin_F-35_Lightning_II',95),

  // ── 폴란드 (Poland) ─────────────────────────────────────────────────────────
  w('pol-a001','K2 흑표 (폴란드)','K2 Black Panther (Polish Army)','GROUND','ROK','OPERATIONAL','LOW',
    '폴란드 도입 한국산 K2 전차. 2022년 1,000대 계약. 초도 180대 인도 완료. K2PL 현지생산 계획.',
    {weight:'55톤',armament:'120mm 55구경 활강포',crew:'3명',speed:'70km/h',firstDeployed:'2022년(폴란드)',manufacturer:'현대로템',quantity:'180대(인도)+820대(예정)'},
    ['K2','폴란드','흑표','수출','현대로템'],['폴란드육군','현대로템'],
    undefined,'https://en.wikipedia.org/wiki/K2_Black_Panther',97),

  w('pol-a002','K9 천둥 (폴란드)','K9A1 Thunder (Polish Army)','ARTILLERY','ROK','OPERATIONAL','LOW',
    '폴란드 도입 K9 자주포. 2022년 672문 계약. 초도물량 배치 완료. K9PL 라이센스 생산 예정.',
    {armament:'155mm 52구경 곡사포',range:'54km',weight:'47톤',firstDeployed:'2023년(폴란드)',manufacturer:'한화에어로스페이스',quantity:'672문(계획)'},
    ['K9','폴란드','천둥','수출','한화에어로스페이스'],['폴란드육군','한화'],
    undefined,'https://en.wikipedia.org/wiki/K9_Thunder',97),

]
