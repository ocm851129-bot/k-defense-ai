import type { WeaponSystem } from './weapons'
const w = (id:string,name:string,nameEng:string,cat:WeaponSystem['category'],origin:WeaponSystem['origin'],status:WeaponSystem['status'],threat:WeaponSystem['threatRating'],desc:string,specs:WeaponSystem['specs'],tags:string[],sources:string[],img?:string,wiki?:string,conf=85): WeaponSystem=>({id,name,nameEng,category:cat,origin,status,threatRating:threat,description:desc,detail:`## ${nameEng}\n\n${desc}\n\n### 주요 제원\n${Object.entries(specs).filter(([,v])=>v).map(([k,v])=>`- ${k}: ${v}`).join('\n')}`,specs,confidence:conf,lastUpdated:'2026-07-01',relatedIntelIds:[],tags,sources,imageUrl:img,wikiUrl:wiki})

export const WEAPONS_BATCH4_RUSSIA2: WeaponSystem[] = [

  // ── ICBM/전략미사일 ──────────────────────────────────────────────────────
  w('rus2-i001','RS-28 사르마트 ICBM','RS-28 Sarmat ICBM','ICBM','RUSSIA','OPERATIONAL','CRITICAL',
    '세계 최중량 ICBM. 탑재중량 10t. 다탄두(MIRV 15기). 아방가르드 극초음속 탑재 가능. 사거리 18,000km.',
    {range:'18,000km',payload:'10t MIRV×15 또는 아방가르드',propulsion:'액체연료 2단',firstDeployed:'2022년',manufacturer:'마케예프 설계국'},
    ['사르마트','RS-28','ICBM','세계최중량','MIRV'],['러시아국방부','38North'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Sarmat-launch.webm/330px--Sarmat-launch.webm.jpg','https://en.wikipedia.org/wiki/RS-28_Sarmat',80),

  w('rus2-i002','RS-24 야르스 ICBM','RS-24 Yars ICBM','ICBM','RUSSIA','OPERATIONAL','CRITICAL',
    '고체연료 도로기동 ICBM. MIRV 4기. 사거리 12,000km. 러시아 핵 3축 핵심. 대량 배치.',
    {range:'12,000km',payload:'MIRV×4(~300kt)',propulsion:'고체연료 3단',firstDeployed:'2010년',manufacturer:'MIT 모스크바 열공학연구소',quantity:'180기+'},
    ['야르스','RS-24','ICBM','고체','도로기동'],['IISS','러시아국방부'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/RS-24_Yars.webm/330px--RS-24_Yars.webm.jpg','https://en.wikipedia.org/wiki/RS-24_Yars',88),

  w('rus2-i003','R-36M2 보예보다 (SS-18)','R-36M2 Voevoda (SS-18 Satan)','ICBM','RUSSIA','OPERATIONAL','CRITICAL',
    '액체연료 사일로 ICBM. MIRV 10기×750kt. 사거리 16,000km. 사르마트가 대체 중. 세계 최대 탑재량.',
    {range:'16,000km',payload:'MIRV×10(750kt)',propulsion:'액체연료 2단',firstDeployed:'1988년',manufacturer:'유즈노예 설계국',quantity:'46기(사르마트 대체중)'},
    ['보예보다','SS-18','Satan','ICBM','MIRV'],['IISS','Jane\'s'],
    undefined,'https://en.wikipedia.org/wiki/R-36_(missile)',88),

  w('rus2-i004','토폴-M (SS-27) ICBM','Topol-M (SS-27 Sickle-B) ICBM','ICBM','RUSSIA','OPERATIONAL','CRITICAL',
    '고체연료 사일로·도로기동 ICBM. 사거리 11,000km. 단탄두 550kt. 야르스로 업그레이드 중.',
    {range:'11,000km',payload:'단탄두 550kt',propulsion:'고체연료 3단',firstDeployed:'1997년',manufacturer:'MIT',quantity:'78기'},
    ['토폴M','SS-27','ICBM','고체','사일로'],['IISS','Jane\'s'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/%D0%98%D1%81%D0%BF%D1%8B%D1%82%D0%B0%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9-%D0%BF%D1%83%D1%81%D0%BA-%D1%80%D0%B0%D0%BA%D0%B5%D1%82%D1%8B-%C2%AB%D0%A2%D0%BE%D0%BF%D0%BE%D0%BB%D1%8C-%D0%9C%C2%BB-%D0%BD%D0%B0-%D0%BA%D0%BE%D1%81%D0%BC%D0%BE%D0%B4%D1%80%D0%BE%D0%BC%D0%B5-%D0%9F%D0%BB%D0%B5%D1%81%D0%B5%D1%86%D0%BA.gif/330px-%D0%98%D1%81%D0%BF%D1%8B%D1%82%D0%B0%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9-%D0%BF%D1%83%D1%81%D0%BA-%D1%80%D0%B0%D0%BA%D0%B5%D1%82%D1%8B-%C2%AB%D0%A2%D0%BE%D0%BF%D0%BE%D0%BB%D1%8C-%D0%9C%C2%BB-%D0%BD%D0%B0-%D0%BA%D0%BE%D1%81%D0%BC%D0%BE%D0%B4%D1%80%D0%BE%D0%BC%D0%B5-%D0%9F%D0%BB%D0%B5%D1%81%D0%B5%D1%86%D0%BA.gif','https://en.wikipedia.org/wiki/RT-2PM2_Topol-M',88),

  w('rus2-i005','아방가르드 극초음속 활공체','Avangard Hypersonic Glide Vehicle','ICBM','RUSSIA','OPERATIONAL','CRITICAL',
    '핵탄두 탑재 극초음속 활공체. UR-100N·RS-28 탑재. 마하 20+. 기동으로 미사일 방어 무력화.',
    {range:'6,000km+(활공)',speed:'마하 20+(HGV)',payload:'핵탄두',firstDeployed:'2019년',manufacturer:'NPO 마쉬노스트로예니야'},
    ['아방가르드','HGV','극초음속','핵','마사일방어무력화'],['러시아국방부','CSIS'],
    undefined,'https://en.wikipedia.org/wiki/Avangard_(hypersonic_glide_vehicle)',80),

  w('rus2-i006','불라바 (SS-N-32) SLBM','Bulava (SS-N-32) SLBM','SLBM','RUSSIA','OPERATIONAL','CRITICAL',
    '보레이급 핵잠수함 탑재 SLBM. 고체연료. MIRV 6기. 사거리 9,300km. 러시아 해상 핵전력 핵심.',
    {range:'9,300km',payload:'MIRV×6(150kt)',propulsion:'고체연료 3단',firstDeployed:'2012년',manufacturer:'MIT',quantity:'160기+'},
    ['불라바','SS-N-32','SLBM','보레이급','MIRV'],['IISS','러시아해군'],
    'https://upload.wikimedia.org/wikipedia/commons/6/6f/Bulava_SLBM_launched_by_Yuri_Dolgoruky_submarine_%28cropped%29.jpg','https://en.wikipedia.org/wiki/Bulava_(missile)',88),

  // ── 항공기 ────────────────────────────────────────────────────────────────
  w('rus2-af001','Su-57 펠론','Su-57 Felon Stealth Fighter','AIRCRAFT','RUSSIA','OPERATIONAL','HIGH',
    '러시아 5세대 스텔스 전투기. 초음속 순항·이중 와이드밴드 능동위상배열 레이더. 내부 무장창.',
    {speed:'마하 2.0',range:'3,500km',ceiling:'20,000m',crew:'1명',armament:'Kh-59MK2·R-37M·R-77-1·30mm GSh-30-1',firstDeployed:'2020년',manufacturer:'수호이',quantity:'40기+'},
    ['Su-57','펠론','5세대','스텔스','러시아'],['러시아공군','Jane\'s'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Su-57_at_MAKS-2019.jpg/320px-Su-57_at_MAKS-2019.jpg',
    'https://en.wikipedia.org/wiki/Sukhoi_Su-57',80),

  w('rus2-af002','Su-35S 슈퍼플랭커','Su-35S Super Flanker','AIRCRAFT','RUSSIA','OPERATIONAL','HIGH',
    '4.5세대 초기동 전투기. 추력편향 노즐·이바르스(IBAR) 능동위상배열 레이더. R-37M 400km 공대공.',
    {speed:'마하 2.25',range:'3,600km',ceiling:'18,000m',crew:'1명',armament:'R-37M·R-77-1·Kh-31P·30mm GSh-30-1',firstDeployed:'2014년',manufacturer:'수호이',quantity:'150기+'},
    ['Su-35S','슈퍼플랭커','4.5세대','추력편향','R-37M'],['러시아공군','IISS'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Russian_Air_Force%2C_RF-81719%2C_Sukhoi_Su-35S_%2849581740157%29.jpg/330px-Russian_Air_Force%2C_RF-81719%2C_Sukhoi_Su-35S_%2849581740157%29.jpg','https://en.wikipedia.org/wiki/Sukhoi_Su-35',88),

  w('rus2-af003','Su-34 풀백 폭격기','Su-34 Fullback Strike Fighter','AIRCRAFT','RUSSIA','OPERATIONAL','HIGH',
    'Su-27 기반 전폭기. 나란히 앉는 복좌 조종석. Kh-59·Kh-101 공대지. 우크라이나 전쟁 주요 타격기.',
    {speed:'마하 1.8',range:'4,000km',ceiling:'17,000m',crew:'2명',armament:'Kh-59·Kh-31·Kh-101·FAB-500M62·30mm GSh-30-1',firstDeployed:'2006년',manufacturer:'수호이',quantity:'140기'},
    ['Su-34','풀백','전폭기','복좌','우크라이나전쟁'],['러시아공군','IISS'],
    undefined,'https://en.wikipedia.org/wiki/Sukhoi_Su-34',88),

  w('rus2-af004','Tu-160M2 블랙잭','Tu-160M2 Blackjack Strategic Bomber','AIRCRAFT','RUSSIA','OPERATIONAL','CRITICAL',
    '세계 최대 전략폭격기 재생산. 가변익. Kh-101/102 순항미사일 12발 탑재. 핵·재래식 이중용도.',
    {speed:'마하 2.05',range:'12,300km',ceiling:'15,000m',crew:'4명',armament:'Kh-101/102×12발·Kh-555·Kh-55',firstDeployed:'2022년(M2)',manufacturer:'카잔항공기생산협회',quantity:'20기+'},
    ['Tu-160','블랙잭','전략폭격기','가변익','Kh-101'],['러시아공군','IISS'],
    undefined,'https://en.wikipedia.org/wiki/Tupolev_Tu-160',90),

  w('rus2-af005','Tu-22M3M 백파이어','Tu-22M3M Backfire-C Bomber','AIRCRAFT','RUSSIA','OPERATIONAL','HIGH',
    'Tu-22M3 현대화형. Kh-32 대함미사일·Kh-101 순항미사일 통합. 전략·전술 이중 역할.',
    {speed:'마하 1.88',range:'6,800km',crew:'4명',armament:'Kh-32×3발·Kh-22·Kh-101·FAB-3000',firstDeployed:'2021년(M3M)',manufacturer:'카잔',quantity:'66기'},
    ['Tu-22M3M','백파이어','폭격기','Kh-32','대함'],['러시아공군','IISS'],
    undefined,'https://en.wikipedia.org/wiki/Tupolev_Tu-22M',85),

  w('rus2-af006','Tu-95MSM 베어','Tu-95MSM Bear-H Bomber','AIRCRAFT','RUSSIA','OPERATIONAL','HIGH',
    '터보프롭 전략폭격기. 1950년대 설계 현역 운용. Kh-101/102 6발+Kh-55 16발. 핵억지 핵심.',
    {speed:'925km/h',range:'15,000km',crew:'7명',armament:'Kh-101/102×6발+Kh-55×10발',firstDeployed:'1955년(MSM:2020년대)',manufacturer:'툴라',quantity:'55기'},
    ['Tu-95','베어','전략폭격기','Kh-101','핵억지'],['러시아공군','IISS'],
    undefined,'https://en.wikipedia.org/wiki/Tupolev_Tu-95',90),

  w('rus2-af007','Su-25SM3 프로그풋','Su-25SM3 Frogfoot','AIRCRAFT','RUSSIA','OPERATIONAL','MED',
    'Su-25 현대화형. SOLT-25 열상·위성유도 폭탄·Kh-25ML 레이저 유도. 우크라이나 CAS 임무.',
    {speed:'950km/h',range:'1,400km',crew:'1명',armament:'Kh-25ML·B-8 80mm 로켓·30mm GSh-30-2',firstDeployed:'2014년',manufacturer:'수호이·우란',quantity:'70기+'},
    ['Su-25SM3','프로그풋','CAS','우크라이나','근접지원'],['러시아공군'],undefined,undefined,82),

  w('rus2-af008','MiG-31K BM 미그-31K','MiG-31K Kinzhal Carrier','AIRCRAFT','RUSSIA','OPERATIONAL','HIGH',
    'Kh-47M2 킨잘 극초음속미사일 발사 전용기. MiG-31BM 개조. 2018년 실전 배치.',
    {speed:'마하 2.83',range:'3,000km',crew:'2명',armament:'Kh-47M2 킨잘 1발',firstDeployed:'2018년',manufacturer:'미코얀',quantity:'10기+'},
    ['MiG-31K','킨잘캐리어','극초음속','킨잘'],['러시아공군','CSIS'],
    undefined,'https://en.wikipedia.org/wiki/Mikoyan_MiG-31',85),

  // ── 순항·극초음속 미사일 ──────────────────────────────────────────────────
  w('rus2-m001','Kh-47M2 킨잘 극초음속미사일','Kh-47M2 Kinzhal Hypersonic Missile','ASM','RUSSIA','OPERATIONAL','CRITICAL',
    '이스칸데르 기반 공중발사 극초음속 탄도미사일. 마하 10+. 우크라이나 실전 사용. 2,000km 사거리.',
    {range:'2,000km',speed:'마하 10+',payload:'재래식 또는 핵탄두',guidance:'INS+GPS',firstDeployed:'2018년',manufacturer:'이스칸데르 설계'},
    ['킨잘','Kh-47M2','극초음속','마하10','우크라이나'],['러시아국방부','CSIS'],
    undefined,'https://en.wikipedia.org/wiki/Kh-47M2_Kinzhal',80),

  w('rus2-m002','3M22 치르콘 극초음속 순항','3M22 Zircon Hypersonic Cruise Missile','CRUISE','RUSSIA','OPERATIONAL','CRITICAL',
    '함정·잠수함 발사 극초음속 순항미사일. 마하 8+. 사거리 1,000km. 항모 킬러. 2022년 실전.',
    {range:'1,000km',speed:'마하 8+',payload:'재래식 또는 핵',guidance:'INS+능동레이더',firstDeployed:'2022년',manufacturer:'NPO 마쉬노스트로예니야'},
    ['치르콘','3M22','극초음속','항모킬러','마하8'],['러시아해군','CSIS'],
    undefined,'https://en.wikipedia.org/wiki/3M22_Zircon',78),

  w('rus2-m003','Kh-101/102 스텔스 순항미사일','Kh-101/102 Stealth Cruise Missile','CRUISE','RUSSIA','OPERATIONAL','CRITICAL',
    '저피탐 전략순항미사일. 재래식(101)/핵(102). 사거리 5,500km. Tu-95·Tu-160 탑재. 우크라이나 대량 사용.',
    {range:'5,500km',speed:'마하 0.77',payload:'재래식 400kg 또는 핵탄두',guidance:'INS+TERCOM+EO',firstDeployed:'2013년',manufacturer:'Raduga'},
    ['Kh-101','Kh-102','스텔스순항','5500km','우크라이나'],['러시아공군','CSIS'],
    undefined,'https://en.wikipedia.org/wiki/Kh-101_and_Kh-102',88),

  w('rus2-m004','이스칸데르-M','Iskander-M SRBM','SRBM','RUSSIA','OPERATIONAL','HIGH',
    '고체연료 준탄도미사일. 기동탄두. 사거리 500km. CEP 2m급. 우크라이나·조지아 실전. NATO 핵심 위협.',
    {range:'500km',speed:'마하 7',payload:'단두 480kg·핵탄두',guidance:'INS+GLONASS+DSMAC',firstDeployed:'2006년',manufacturer:'KBM',quantity:'300기+'},
    ['이스칸데르','Iskander-M','SRBM','기동탄두','500km'],['러시아군','IISS'],
    undefined,'https://en.wikipedia.org/wiki/9K720_Iskander',95),

  w('rus2-m005','이스칸데르-K 순항미사일','Iskander-K Cruise Missile','CRUISE','RUSSIA','OPERATIONAL','HIGH',
    '이스칸데르 발사대에서 운용하는 단거리 순항미사일(R-500/9M728). 지형대조 유도. 500km+.',
    {range:'500km+',guidance:'INS+TERCOM',firstDeployed:'2013년',manufacturer:'Novator'},
    ['이스칸데르K','R-500','9M728','순항미사일'],['러시아군'],undefined,undefined,80),

  w('rus2-m006','Kh-32 대함순항미사일','Kh-32 Anti-Ship Cruise Missile','ASM','RUSSIA','OPERATIONAL','HIGH',
    'Tu-22M3 탑재. Kh-22 대체. 마하 4.6, 고도 40km 강하 공격. 항모전단 공격 특화.',
    {range:'1,000km',speed:'마하 4.6',altitude:'40km(최고',payload:'500kg AP 탄두',guidance:'관성+능동레이더',firstDeployed:'2016년',manufacturer:'Raduga'},
    ['Kh-32','대함미사일','Tu-22M3','마하4','항모대응'],['러시아군','IISS'],
    undefined,'https://en.wikipedia.org/wiki/Kh-22',80),

  w('rus2-m007','P-800 오닉스 대함미사일','P-800 Oniks Anti-Ship Missile','SSM','RUSSIA','OPERATIONAL','HIGH',
    '초음속 대함순항미사일. 마하 2.5. 함·잠수함·해안 발사. Bastion-P 체계 이용. 우크라이나 실전.',
    {range:'600km',speed:'마하 2.5',payload:'250kg AP',guidance:'INS+능동레이더',firstDeployed:'2002년',manufacturer:'NPO 마쉬노스트로예니야'},
    ['오닉스','P-800','대함미사일','초음속','바스티온'],['러시아해군','CSIS'],
    undefined,'https://en.wikipedia.org/wiki/P-800_Oniks',88),

  w('rus2-m008','칼리브르 SLCM','3M-14 Kalibr Land-Attack Cruise Missile','CRUISE','RUSSIA','OPERATIONAL','HIGH',
    '잠수함·수상함 발사 지상공격 순항미사일. 마하 0.8. 사거리 2,500km. 카스피해에서 시리아 타격.',
    {range:'2,500km',speed:'마하 0.8',payload:'450kg HE',guidance:'INS+TERCOM+EO',firstDeployed:'2012년',manufacturer:'Novator'},
    ['칼리브르','3M-14','SLCM','시리아','카스피해'],['러시아해군','CSIS'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/3M-54E1.jpg/330px-3M-54E1.jpg','https://en.wikipedia.org/wiki/Kalibr_(missile_family)',93),

  w('rus2-m009','Kh-55SM 핵순항미사일','Kh-55SM Strategic Cruise Missile','CRUISE','RUSSIA','OPERATIONAL','CRITICAL',
    'Tu-95·Tu-160 탑재 핵순항미사일. 3,000km 사거리. 200kt 핵탄두. Kh-101으로 대체 중.',
    {range:'3,000km',speed:'마하 0.77',payload:'200kt 핵탄두',firstDeployed:'1984년',manufacturer:'Raduga'},
    ['Kh-55SM','핵순항미사일','Tu-95','Tu-160','전략'],['러시아공군','IISS'],
    undefined,undefined,88),

  // ── 지대공 방공 ──────────────────────────────────────────────────────────
  w('rus2-s001','S-500 프로메테우스','S-500 Prometey Air Defense System','SAM','RUSSIA','OPERATIONAL','CRITICAL',
    '세계 최장거리 방공 시스템. 탄도미사일·위성·극초음속 탄두 요격. 사거리 600km. 2021년 첫 연대 배치.',
    {range:'600km',altitude:'200km+',speed:'마하 7+(탄)',guidance:'능동레이더',firstDeployed:'2021년',manufacturer:'Almaz-Antey'},
    ['S-500','프로메테우스','최장거리방공','위성요격','극초음속대응'],['러시아국방부','CSIS'],
    undefined,'https://en.wikipedia.org/wiki/S-500_missile_system',75),

  w('rus2-s002','S-400 트리움프','S-400 Triumf Air Defense System','SAM','RUSSIA','OPERATIONAL','CRITICAL',
    '러시아 장거리 방공시스템. 사거리 400km. 동시 36목표 교전. 중국·인도·터키 수출. 40개국 수요.',
    {range:'400km',altitude:'30km',speed:'마하 14(탄)',guidance:'능동레이더+반능동',firstDeployed:'2007년',manufacturer:'Almaz-Antey',quantity:'18개 연대+'},
    ['S-400','트리움프','400km','방공','터키수출'],['러시아군','IISS'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/%D0%A1-400_%C2%AB%D0%A2%D1%80%D0%B8%D1%83%D0%BC%D1%84%C2%BB.JPG/330px-%D0%A1-400_%C2%AB%D0%A2%D1%80%D0%B8%D1%83%D0%BC%D1%84%C2%BB.JPG','https://en.wikipedia.org/wiki/S-400_missile_system',97),

  w('rus2-s003','S-350E 비탸지','S-350E Vityaz SAM','SAM','RUSSIA','OPERATIONAL','HIGH',
    '중거리 방공시스템. S-300 대체. 12발 16연장 VLS. 스텔스기·드론 대응 특화.',
    {range:'120km',altitude:'30km',firstDeployed:'2019년',manufacturer:'Almaz-Antey'},
    ['S-350','비탸지','중거리방공','스텔스대응'],['러시아군'],undefined,undefined,78),

  w('rus2-s004','판치르-S2 단거리방공','Pantsir-S2 SPAAGM','SAM','RUSSIA','OPERATIONAL','HIGH',
    '30mm 기관포+미사일 복합 단거리 방공. 사거리 20km. 대드론·순항미사일 방어. 시리아 실전.',
    {range:'20km',altitude:'15km',armament:'2A38M 30mm 기관포×2+미사일 12발',firstDeployed:'2015년',manufacturer:'KBP'},
    ['판치르S2','SPAAG','복합방공','대드론','시리아'],['러시아군','IISS'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/MAKS_Airshow_2013_%28Ramenskoye_Airport%2C_Russia%29_%28521-05%29.jpg/330px-MAKS_Airshow_2013_%28Ramenskoye_Airport%2C_Russia%29_%28521-05%29.jpg','https://en.wikipedia.org/wiki/Pantsir_missile_system',88),

  w('rus2-s005','토르-M2E 단거리 방공','Tor-M2E Short-Range SAM','SAM','RUSSIA','OPERATIONAL','HIGH',
    '자주 단거리 지대공미사일. 사거리 16km. 저고도 항공기·드론 대응. 우크라이나 실전 운용.',
    {range:'16km',altitude:'10km',firstDeployed:'2016년',manufacturer:'Antey'},
    ['토르M2','단거리방공','드론대응','우크라이나'],['러시아군'],undefined,'https://en.wikipedia.org/wiki/Tor_missile_system',88),

  w('rus2-s006','부크-M3 중거리 방공','Buk-M3 Medium-Range SAM','SAM','RUSSIA','OPERATIONAL','HIGH',
    'MH17 격추 부크의 최신형. 사거리 70km. 6발 ULVPU 탑재. 스텔스 및 고기동 표적 대응.',
    {range:'70km',altitude:'35km',firstDeployed:'2017년',manufacturer:'Fakel'},
    ['부크M3','중거리방공','70km','스텔스대응'],['러시아군','IISS'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Buk-M1-2_air_defence_system_in_2010.jpg/330px-Buk-M1-2_air_defence_system_in_2010.jpg','https://en.wikipedia.org/wiki/Buk_missile_system',85),

  // ── 전차·기갑 ─────────────────────────────────────────────────────────────
  w('rus2-t001','T-14 아르마타 전차','T-14 Armata MBT','GROUND','RUSSIA','DEVELOPMENT','HIGH',
    '무인 포탑 T-14. 승무원 3명 장갑 캡슐. 2A82-1M 125mm 120발·능동방호(아프가니트). 2016년 퍼레이드.',
    {weight:'55t',armament:'125mm 2A82-1M·12.7mm PKMT·7.62mm PKT',crew:'3명(캡슐)',speed:'75km/h',firstDeployed:'2023년(소량)',manufacturer:'우랄바곤자보드'},
    ['T-14','아르마타','무인포탑','능동방호','차세대전차'],['러시아군','Jane\'s'],
    undefined,'https://en.wikipedia.org/wiki/T-14_Armata',75),

  w('rus2-t002','T-90M 프랴로베크 전차','T-90M Proryv-3 MBT','GROUND','RUSSIA','OPERATIONAL','HIGH',
    'T-90 최신 개량형. 콘탁트-5 ERA·르리쪼 열상·125mm 2A46M-4. 우크라이나 배치 주력.',
    {weight:'48t',armament:'125mm 2A46M-4·12.7mm NSVT·7.62mm PKT',crew:'3명',speed:'65km/h',firstDeployed:'2020년',manufacturer:'우랄바곤자보드'},
    ['T-90M','프랴로베크','ERA','열상','우크라이나'],['러시아군','IISS'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/T-90M.jpg/330px-T-90M.jpg','https://en.wikipedia.org/wiki/T-90',88),

  w('rus2-t003','T-80BVM 전차','T-80BVM MBT','GROUND','RUSSIA','OPERATIONAL','HIGH',
    'T-80 가스터빈 전차 현대화형. 렐릭트 ERA·소스나-U 열상·KONTAKT-5. 극지 작전 적합.',
    {weight:'46.5t',armament:'125mm 2A46M-4',crew:'3명',speed:'80km/h',firstDeployed:'2017년',manufacturer:'우랄바곤자보드'},
    ['T-80BVM','가스터빈','ERA','극지작전'],['러시아군'],undefined,undefined,85),

  w('rus2-t004','T-72B3M 전차','T-72B3M MBT','GROUND','RUSSIA','OPERATIONAL','MED',
    'T-72B3 추가 개량. 반응장갑·소스나-U 열상·Shtora-1 광전자방어. 우크라이나 전쟁 주력.',
    {weight:'46t',armament:'125mm 2A46M-5·12.7mm·7.62mm',crew:'3명',speed:'60km/h',firstDeployed:'2016년',manufacturer:'우랄바곤자보드'},
    ['T-72B3M','우크라이나','주력전차','ERA'],['러시아군','IISS'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Alabino05042017-40.jpg/330px-Alabino05042017-40.jpg','https://en.wikipedia.org/wiki/T-72',88),

  w('rus2-t005','BMP-3M 보병전투차','BMP-3M IFV Upgrade','GROUND','RUSSIA','OPERATIONAL','MED',
    'BMP-3 현대화형. 100mm 2A70+30mm 2A72 복합 무장. 수상도하 능력.',
    {weight:'19.4t',armament:'100mm 2A70·30mm 2A72·7.62mm PKT',crew:'3+7명',speed:'70km/h',firstDeployed:'2003년(M)',manufacturer:'KBP'},
    ['BMP-3M','IFV','100mm','30mm','수상도하'],['러시아군','IISS'],
    undefined,'https://en.wikipedia.org/wiki/BMP-3',88),

  w('rus2-t006','BMP-2M 투달 IFV','BMP-2M Berezhok IFV','GROUND','RUSSIA','OPERATIONAL','MED',
    'BMP-2 베레죠크 무장 개량. 4발 AT-14 코르네트 대전차미사일 추가. 30mm 보유.',
    {weight:'14.5t',armament:'30mm 2A42·AT-14 코르네트×4·7.62mm PKT',crew:'3+7명',speed:'65km/h',firstDeployed:'2011년',manufacturer:'KBP'},
    ['BMP-2M','베레죠크','코르네트','IFV'],['러시아군'],undefined,undefined,85),

  w('rus2-t007','T-15 아르마타 HIFV','T-15 Armata HIFV','GROUND','RUSSIA','DEVELOPMENT','HIGH',
    'T-14 플랫폼 기반 중보병전투차. Bumerang VBM 포탑·30mm AU-220M 원격무장. 2016년 퍼레이드.',
    {weight:'50t',armament:'57mm AU-220M 또는 30mm 2A42·코르네트',crew:'2+9명',firstDeployed:'개발중',manufacturer:'우랄바곤자보드'},
    ['T-15','아르마타','HIFV','57mm','차세대'],['러시아군'],undefined,'https://en.wikipedia.org/wiki/T-15_Armata',70),

  // ── 자주포·야포 ───────────────────────────────────────────────────────────
  w('rus2-a001','2S19M2 무스타-S 자주포','2S19M2 Msta-S Self-Propelled Howitzer','ARTILLERY','RUSSIA','OPERATIONAL','HIGH',
    '152mm 자주포. 자동 탄약처리. 분당 8발. Krasnopol 레이저 유도탄 운용. 우크라이나 전쟁 광범위 사용.',
    {weight:'42t',armament:'152mm 2A64M2 곡사포',crew:'5명',range:'29km(HE)·20km(Krasnopol)',firstDeployed:'2006년(M2)',manufacturer:'우랄트란스마쉬'},
    ['2S19M2','무스타S','152mm','Krasnopol','자주포'],['러시아군','IISS'],
    undefined,'https://en.wikipedia.org/wiki/2S19_Msta',88),

  w('rus2-a002','2S35 코알리치야-SV 자주포','2S35 Koalitsiya-SV SPH','ARTILLERY','RUSSIA','DEVELOPMENT','HIGH',
    '155mm/52구경장 이중 포신(원형)→단일 포신으로 변경. 분당 16발 자동 장전. 사거리 80km(활성탄).',
    {weight:'48t',armament:'152mm 2A88 곡사포',crew:'3명(자동)',range:'40km(HE)·80km(활성탄)',firstDeployed:'2022년(소량)',manufacturer:'우랄트란스마쉬'},
    ['코알리치야','2S35','자동장전','80km','자주포'],['러시아군'],undefined,'https://en.wikipedia.org/wiki/2S35_Koalitsiya-SV',72),

  w('rus2-a003','2S3M 아카치야 자주포','2S3M Akatsiya SPH 152mm','ARTILLERY','RUSSIA','OPERATIONAL','MED',
    '152mm 자주포. 수천 문 배치. 노후화이나 여전히 주력. Krasnopol 운용.',
    {weight:'27.5t',armament:'152mm 2A33M 곡사포',crew:'4명',range:'17.3km(HE)',firstDeployed:'1971년',manufacturer:'우랄트란스마쉬',quantity:'1,000+문'},
    ['2S3','아카치야','152mm','구형자주포'],['러시아군','IISS'],
    undefined,'https://en.wikipedia.org/wiki/2S3_Akatsiya',82),

  w('rus2-a004','BM-30 스메르치 MLRS','BM-30 Smerch 300mm MLRS','MLRS','RUSSIA','OPERATIONAL','HIGH',
    '300mm 12연장 다연장로켓. 사거리 120km(기본)·90km(자탄). 정밀유도 로켓 버전 개발.',
    {weight:'43.7t',armament:'300mm 로켓 12발',crew:'4명',range:'120km',firstDeployed:'1989년',manufacturer:'NPO 스플라브',quantity:'200+대'},
    ['BM-30','스메르치','300mm','MLRS','120km'],['러시아군','IISS'],
    undefined,'https://en.wikipedia.org/wiki/BM-30_Smerch',88),

  // ── 해군 수상함 ──────────────────────────────────────────────────────────
  w('rus2-n001','키로프급 순양함 표트르 벨리키','Pyotr Velikiy Kirov-class Battlecruiser','NAVAL','RUSSIA','OPERATIONAL','HIGH',
    '세계 유일 현역 핵추진 순양함. 표트르 벨리키 1척 운용. S-300F·P-700 그라니트 대함미사일 20발.',
    {displacement:'28,000t',armament:'P-700 그라니트×20·S-300F·AK-130 130mm·기타',crew:'728명',speed:'31노트',firstDeployed:'1998년(표트르)',manufacturer:'발틱조선소'},
    ['표트르벨리키','키로프급','핵추진순양함','P-700','그라니트'],['러시아해군','IISS'],
    undefined,'https://en.wikipedia.org/wiki/Kirov-class_battlecruiser',88),

  w('rus2-n002','마샬 우스티노프 (슬라바급)','Marshal Ustinov Slava-class Cruiser','NAVAL','RUSSIA','OPERATIONAL','HIGH',
    '슬라바급 2번함. 모스크바함(2022년 우크라이나에 격침) 자매함. P-1000 벌칸 대함 16발.',
    {displacement:'12,000t',armament:'P-1000 벌칸×16·S-300F·AK-130 130mm',crew:'510명',speed:'32노트',firstDeployed:'1986년',manufacturer:'61 코뮤나르조선소'},
    ['마샬우스티노프','슬라바급','P-1000','벌칸','순양함'],['러시아해군','IISS'],
    undefined,'https://en.wikipedia.org/wiki/Slava-class_cruiser',88),

  w('rus2-n003','야센-M급 핵잠수함','Yasen-M class SSGN','SUBMARINE','RUSSIA','OPERATIONAL','CRITICAL',
    '러시아 최신 핵추진 다목적 잠수함. 칼리브르·오닉스·치르콘 발사. 10발 VLS. 카잔함 운용 중.',
    {displacement:'13,800t',armament:'칼리브르·오닉스·치르콘×40발·어뢰관 8문',crew:'64명',speed:'35노트(잠항)',firstDeployed:'2021년',manufacturer:'세베로드빈스크조선소'},
    ['야센M','SSGN','핵잠수함','칼리브르','치르콘'],['러시아해군','IISS'],
    undefined,'https://en.wikipedia.org/wiki/Yasen-class_submarine',85),

  w('rus2-n004','보레이-A급 SSBN','Borei-A class SSBN','SUBMARINE','RUSSIA','OPERATIONAL','CRITICAL',
    '최신 핵전략잠수함. 불라바 SLBM 16발. 스텔스 향상. 블라디미르 대공 등 운용.',
    {displacement:'24,000t',armament:'불라바 SLBM×16',crew:'107명',speed:'27노트',firstDeployed:'2021년(Borei-A)',manufacturer:'세베로드빈스크'},
    ['보레이A','SSBN','불라바','전략핵잠수함'],['러시아해군','IISS'],
    undefined,'https://en.wikipedia.org/wiki/Borei-class_submarine',88),

  w('rus2-n005','그레미야시치급 호위함','Gremyashchy-class Corvette','NAVAL','RUSSIA','OPERATIONAL','HIGH',
    '프로젝트 20385 코르벳. 칼리브르·오닉스 VLS·Pantsir-M 방공. 2022년 전력화.',
    {displacement:'2,300t',armament:'칼리브르/오닉스 VLS 8셀·57mm AK-176MA·Pantsir-M',crew:'100명',speed:'30노트',firstDeployed:'2020년',manufacturer:'세베르나야 베르프'},
    ['그레미야시치급','코르벳','칼리브르','Pantsir-M'],['러시아해군'],undefined,undefined,78),

  w('rus2-n006','소브레멘니급 구축함','Sovremenny-class Destroyer','NAVAL','RUSSIA','OPERATIONAL','HIGH',
    '대함·대공 구축함. P-270 모스킷 초음속 대함 2×4발. 러시아·중국 운용.',
    {displacement:'7,900t',armament:'P-270 모스킷×8·SA-N-7·130mm AK-130·어뢰',crew:'344명',speed:'32노트',firstDeployed:'1980년대'},
    ['소브레멘니급','구축함','모스킷','대함'],['러시아해군','중국해군'],
    undefined,'https://en.wikipedia.org/wiki/Sovremenny-class_destroyer',82),

  // ── 소화기 ───────────────────────────────────────────────────────────────
  w('rus2-sa001','AK-12 돌격소총','AK-12 Assault Rifle','RIFLE','RUSSIA','OPERATIONAL','MED',
    'AK-74M 후속 5.45mm 돌격소총. 피카티니레일·조절식 개머리판. 러시아군 신규 지급 중.',
    {caliber:'5.45×39mm',weight:'3.3kg',fireRate:'600rpm',capacity:'30발',firstDeployed:'2018년',manufacturer:'칼라쉬니코프'},
    ['AK-12','5.45mm','러시아표준소총','피카티니'],['칼라쉬니코프','러시아군'],
    undefined,'https://en.wikipedia.org/wiki/AK-12',90),

  w('rus2-sa002','AK-15 7.62mm 돌격소총','AK-15 Assault Rifle 7.62mm','RIFLE','RUSSIA','OPERATIONAL','MED',
    'AK-12의 7.62×39mm 버전. 특수부대·수출 수요. AK-12와 90% 부품 공유.',
    {caliber:'7.62×39mm',weight:'3.5kg',fireRate:'600rpm',capacity:'30발',firstDeployed:'2018년',manufacturer:'칼라쉬니코프'},
    ['AK-15','7.62mm','돌격소총','특수부대'],['칼라쉬니코프'],undefined,undefined,88),

  w('rus2-sa003','SVCh-54 저격소총','SVCh-54 Sniper Rifle','SNIPER','RUSSIA','OPERATIONAL','LOW',
    '.338 Lapua Magnum 러시아 신형 저격소총. 정밀도·사거리 SVD 대비 대폭 향상.',
    {caliber:'.338 Lapua Magnum',weight:'4.3kg',range:'1,500m',capacity:'10발',firstDeployed:'2020년대',manufacturer:'칼라쉬니코프'},
    ['SVCh-54','338라푸아','저격소총','러시아신형'],['칼라쉬니코프'],undefined,undefined,80),

  w('rus2-sa004','PKP 페체네그 기관총','PKP Pecheneg General Purpose MG','MG','RUSSIA','OPERATIONAL','MED',
    'PKM 개량형. 공냉 배럴(교환 불필요)·광학 마운트. 7.62×54mmR. 러시아 특수부대 애용.',
    {caliber:'7.62×54mmR',weight:'8.2kg',fireRate:'650rpm',range:'1,500m',firstDeployed:'2001년',manufacturer:'Degtyaryov Plant'},
    ['페체네그','PKP','기관총','7.62mm','특수부대'],['러시아군'],
    undefined,'https://en.wikipedia.org/wiki/PKP_Pecheneg',88),

  w('rus2-sa005','KSVK 12.7mm 볼트액션 저격총','KSVK 12.7mm Anti-Material Rifle','SNIPER','RUSSIA','OPERATIONAL','LOW',
    '12.7×108mm 볼트액션 대물저격총. 불펍 설계. 경장갑·벙커 파괴. 러시아 특수부대 운용.',
    {caliber:'12.7×108mm',weight:'12kg',range:'1,500m',capacity:'5발',firstDeployed:'1990년대',manufacturer:'Degtyaryov'},
    ['KSVK','12.7mm','대물저격총','불펍'],['러시아군'],undefined,undefined,80),

  // ── UAV/드론 ──────────────────────────────────────────────────────────────
  w('rus2-u001','오를란-10 전술UAV','Orlan-10 Tactical UAV','UAV','RUSSIA','OPERATIONAL','MED',
    '대대·여단급 전술정찰UAV. 포병 관측·EW 중계. 우크라이나 전쟁 가장 흔히 격추된 러시아 드론.',
    {speed:'150km/h',ceiling:'5,000m',armament:'없음(정찰)',firstDeployed:'2010년대',manufacturer:'특수기술센터'},
    ['오를란10','전술UAV','포병관측','우크라이나'],['러시아군'],
    undefined,'https://en.wikipedia.org/wiki/Orlan-10',82),

  w('rus2-u002','란체트-3 자폭드론','Lancet-3 Loitering Munition','UAV','RUSSIA','OPERATIONAL','HIGH',
    '정밀 자폭드론. TV 유도·광전자 탐색기. 우크라이나 포병·장갑차·레이더 타격 다수.',
    {speed:'110km/h',range:'40km',payload:'3kg HE',firstDeployed:'2021년',manufacturer:'ZALA Aero'},
    ['란체트3','자폭드론','우크라이나','포병타격'],['러시아군','ZALA'],
    undefined,'https://en.wikipedia.org/wiki/ZALA_Lancet',85),

  w('rus2-u003','샤헤드-136형 자폭드론','Shahed-136 type Kamikaze UAV','UAV','RUSSIA','OPERATIONAL','HIGH',
    '이란제 샤헤드-136 도입·라이선스 생산(게란-2). 삼각날개·왕복엔진. 우크라이나 대량 사용.',
    {speed:'185km/h',range:'2,500km',payload:'50kg HE',firstDeployed:'2022년(우크라이나)',manufacturer:'이란→러시아 생산'},
    ['샤헤드136','게란2','자폭드론','이란','우크라이나'],['러시아군','CSIS'],
    undefined,'https://en.wikipedia.org/wiki/HESA_Shahed_136',88),

]
