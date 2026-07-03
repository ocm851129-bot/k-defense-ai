import type { WeaponSystem } from './weapons'
const w = (id:string,name:string,nameEng:string,cat:WeaponSystem['category'],origin:WeaponSystem['origin'],status:WeaponSystem['status'],threat:WeaponSystem['threatRating'],desc:string,specs:WeaponSystem['specs'],tags:string[],sources:string[],img?:string,wiki?:string,conf=90): WeaponSystem=>({id,name,nameEng,category:cat,origin,status,threatRating:threat,description:desc,detail:`## ${nameEng}\n\n${desc}\n\n### 주요 제원\n${Object.entries(specs).filter(([,v])=>v).map(([k,v])=>`- ${k}: ${v}`).join('\n')}`,specs,confidence:conf,lastUpdated:'2026-07-03',relatedIntelIds:[],tags,sources,imageUrl:img,wikiUrl:wiki})

export const WEAPONS_BATCH27_MISSILES_SAM: WeaponSystem[] = [

  // ── 극초음속 미사일 ────────────────────────────────────────────────────
  w('ms-hyp001','킨잘 Kh-47M2 극초음속','Kh-47M2 Kinzhal Hypersonic Aero-Ballistic','MISSILE','RUSSIA','OPERATIONAL','CRITICAL',
    '러시아 극초음속 공중발사 탄도미사일. MiG-31BM·Tu-22M3 탑재. 마하 10+. 우크라이나 공격에 사용. PAC-3 요격 논란.',
    {speed:'마하 10+',range:'2,000km',payload:'480kg',firstDeployed:'2017년(선언)/2022년(실전)',manufacturer:'이스칸데르 설계국'},
    ['킨잘','Kh-47M2','극초음속','마하10','MiG-31','우크라이나'],['러시아국방부'],
    undefined,'https://en.wikipedia.org/wiki/Kh-47M2_Kinzhal',78),

  w('ms-hyp002','지르콘 3M22 극초음속대함','3M22 Tsirkon Zircon Hypersonic Cruise','MISSILE','RUSSIA','OPERATIONAL','CRITICAL',
    '러시아 극초음속 순항미사일. 마하 9. 수상함·잠수함 발사. 현존 방공 무력화.',
    {speed:'마하 9',range:'1,000km+',payload:'300~400kg',firstDeployed:'2023년(선언)',manufacturer:'NPO 마시노스트로예니야'},
    ['지르콘','Tsirkon','극초음속','마하9','대함'],['러시아국방부'],
    undefined,'https://en.wikipedia.org/wiki/3M22_Tsirkon',75),

  w('ms-hyp003','LRHW 다크이글 미국','LRHW Dark Eagle Hypersonic USA','MISSILE','USA','DEVELOPMENT','HIGH',
    '미 육군 장거리 극초음속 무기. 글라이드 탄두(C-HGB). 마하 17. 2025년 IOC 목표.',
    {speed:'마하 17+',range:'2,770km+',firstDeployed:'2025년(IOC)',manufacturer:'록히드마틴·다인코프'},
    ['LRHW','다크이글','극초음속','C-HGB','미육군'],['록히드마틴','미육군'],
    undefined,undefined,78),

  w('ms-hyp004','ARRW AGM-183A 극초음속폭탄','AGM-183A ARRW Hypersonic Missile USA','MISSILE','USA','DEVELOPMENT','HIGH',
    '미 공군 극초음속 로켓 부스트 글라이더. B-52·F-15 탑재. 공군 취소 후 추가 시험 지속.',
    {speed:'마하 20+',range:'900km+',firstDeployed:'취소/시험중',manufacturer:'록히드마틴'},
    ['ARRW','AGM-183A','극초음속폭탄','부스트글라이더'],['록히드마틴','USAF'],
    undefined,undefined,65),

  w('ms-hyp005','DF-17 글라이더 중국','DF-17 HGV Hypersonic China','MISSILE','CHINA','OPERATIONAL','CRITICAL',
    '세계 최초 실전배치 극초음속 글라이더. 마하 10. DF-ZF HGV 탑재. 대만·괌 목표.',
    {speed:'마하 10',range:'1,800~2,500km',firstDeployed:'2019년',manufacturer:'중국 방산부'},
    ['DF-17','극초음속','글라이더','중국','대만'],['중국관영매체','CSIS'],
    undefined,'https://en.wikipedia.org/wiki/DF-17',85),

  // ── 탄도미사일 추가 ─────────────────────────────────────────────────
  w('ms-bal001','토마호크 블록V 지상공격','BGM-109G Tomahawk Block V Land Attack','MISSILE','USA','OPERATIONAL','HIGH',
    '토마호크 최신 블록V. JMEWS 전투부·다목표 타격. 함·잠·지상 발사. 우크라이나 공급 논의.',
    {range:'1,600km',payload:'450kg JMEWS',speed:'마하 0.72',firstDeployed:'2021년(블록V)',manufacturer:'레이시언'},
    ['토마호크','블록V','JMEWS','지상공격','순항미사일'],['레이시언','USN'],
    undefined,'https://en.wikipedia.org/wiki/Tomahawk_(missile)',95),

  w('ms-bal002','이스칸데르-M 탄도미사일','9M723 Iskander-M Ballistic Missile','MISSILE','RUSSIA','OPERATIONAL','HIGH',
    '러시아 단거리 정밀탄도미사일. 500km. 기동탄두. 핵 가능. 벨라루스 배치. 우크라이나 공격.',
    {range:'500km',payload:'700kg',accuracy:'5~7m(CEP)',firstDeployed:'2006년',manufacturer:'MIT'},
    ['이스칸데르M','9M723','단거리탄도','기동탄두','벨라루스'],['러시아국방부'],
    undefined,'https://en.wikipedia.org/wiki/9K720_Iskander',85),

  w('ms-bal003','DF-21D 항모킬러 중국','DF-21D Anti-Ship Ballistic Missile','MISSILE','CHINA','OPERATIONAL','CRITICAL',
    '세계 최초 대함 탄도미사일. 마하 10. 1,500km. 기동 항모 추적. 미 항모전단 억제.',
    {speed:'마하 10+',range:'1,500km',payload:'600kg',firstDeployed:'2010년(추정)',manufacturer:'중국 방산부'},
    ['DF-21D','항모킬러','ASBM','대함탄도','중국'],['CSIS','IISS'],
    undefined,'https://en.wikipedia.org/wiki/DF-21',82),

  w('ms-bal004','ATACMS PrSM 정밀타격미사일','PrSM Precision Strike Missile USA','MISSILE','USA','DEVELOPMENT','HIGH',
    'ATACMS 대체 PrSM. 499km+ 사거리. GPS+INS+SAR 복합 유도. M270·HIMARS 발사.',
    {range:'499km+(블록II+)',payload:'추후 결정',firstDeployed:'2023년(초도생산)',manufacturer:'록히드마틴'},
    ['PrSM','ATACMS대체','정밀타격','HIMARS'],['록히드마틴','미육군'],
    undefined,undefined,80),

  w('ms-bal005','브라모스 I·II 인도러시아','BrahMos I/II Supersonic Cruise Missile','MISSILE','INDIA','OPERATIONAL','HIGH',
    '인도·러시아 공동 개발 초음속 순항미사일. 마하 2.8~3.0. 290km(수출형)~500km(개량). 베트남·필리핀 수출.',
    {speed:'마하 2.8~3.0',range:'500km(개량)',payload:'200~300kg',firstDeployed:'2006년',manufacturer:'BrahMos Aerospace'},
    ['브라모스','인도러시아','초음속','수출'],['BrahMos','인도해군'],
    undefined,'https://en.wikipedia.org/wiki/BrahMos',90),

  // ── 지대공미사일 추가 ─────────────────────────────────────────────────
  w('ms-sam001','S-500 프로메테우스','S-500 Prometey Triumfator-M','SAM','RUSSIA','OPERATIONAL','CRITICAL',
    '러시아 최신 전략 방공. 사거리 600km+. 극초음속·궤도 표적 요격 설계. 2021년 부분 배치.',
    {range:'600km+',ceiling:'40km',firstDeployed:'2021년(부분)',manufacturer:'알마즈안테이'},
    ['S-500','프로메테우스','러시아방공','극초음속요격'],['알마즈안테이','러시아국방부'],
    undefined,'https://en.wikipedia.org/wiki/S-500_missile_system',80),

  w('ms-sam002','Iron Dome C-RAM 이스라엘','Iron Dome C-RAM Tamir Interceptor','SAM','ISRAEL','OPERATIONAL','HIGH',
    '이스라엘 아이언돔. 단거리로켓·박격포·드론 요격. 가자·레바논 실전검증. 미국 도입.',
    {range:'70km',speed:'마하 2.2',firstDeployed:'2011년',manufacturer:'라파엘·레이시언'},
    ['아이언돔','이스라엘','Tamir','C-RAM','가자'],['라파엘','이스라엘군'],
    undefined,'https://en.wikipedia.org/wiki/Iron_Dome',95),

  w('ms-sam003','애로우-3 Arrow-3 이스라엘','Arrow-3 Exo-atmospheric Interceptor','SAM','ISRAEL','OPERATIONAL','HIGH',
    '이스라엘 외기권 탄도미사일 요격. 1,200km+ 사거리. 이란 탄도미사일 요격. 독일 도입 결정.',
    {range:'2,400km(탐지)',ceiling:'100km+',firstDeployed:'2017년',manufacturer:'IAI·보잉'},
    ['애로우3','이스라엘','외기권요격','이란대응','독일'],['IAI','보잉','이스라엘국방부'],
    undefined,'https://en.wikipedia.org/wiki/Arrow_3',90),

  w('ms-sam004','데이비드 슬링 스파이더','David\'s Sling Stunner Interceptor','SAM','ISRAEL','OPERATIONAL','HIGH',
    '이스라엘 중거리 방공. 스턴너 요격체. 스커드·V-2급 탄도미사일 요격. 아이언돔·애로우 사이.',
    {range:'300km',firstDeployed:'2017년',manufacturer:'라파엘·레이시언'},
    ['다윗의돌팔매','스턴너','이스라엘방공','중거리'],['라파엘','레이시언'],
    undefined,'https://en.wikipedia.org/wiki/David%27s_Sling',88),

  w('ms-sam005','HQ-9B 홍치 중국 방공','HQ-9B Red Flag Air Defense China','SAM','CHINA','OPERATIONAL','HIGH',
    '중국 S-300 대응형. HQ-9B 개량. 사거리 200km+. 대만 방어·타이완해협 접근거부.',
    {range:'200km+',ceiling:'30km',firstDeployed:'1997년(HQ-9)/2014년(B형)',manufacturer:'CASIC'},
    ['HQ-9B','홍치','중국방공','S-300대응'],['CASIC','PLAAF'],
    undefined,'https://en.wikipedia.org/wiki/HHQ-9',82),

  w('ms-sam006','SAMP/T Aster-30 Block1NT','SAMP/T Aster-30 Block 1NT France Italy','SAM','NATO','OPERATIONAL','HIGH',
    '프랑스·이탈리아 중거리 방공. 블록1NT 탄도미사일 요격. 우크라이나 공급.',
    {range:'100km+(Aster30)',ceiling:'25km',firstDeployed:'2013년(블록NT)',manufacturer:'MBDA'},
    ['SAMP/T','Aster30','유럽방공','우크라이나공급'],['MBDA','프랑스이탈리아군'],
    undefined,'https://en.wikipedia.org/wiki/SAMP/T',88),

  w('ms-sam007','THAAD 고고도방어','THAAD Terminal High Altitude Area Defense','SAM','USA','OPERATIONAL','HIGH',
    'THAAD. 종말단계 고고도 방어. Hit-to-Kill. 한국·UAE·이스라엘 배치.',
    {range:'200km',ceiling:'150km',firstDeployed:'2008년',quantity:'7개 포대(미)',manufacturer:'록히드마틴'},
    ['THAAD','고고도방어','미사일방어','한국배치'],['록히드마틴','미국방부'],
    undefined,'https://en.wikipedia.org/wiki/Terminal_High_Altitude_Area_Defense',95),

  w('ms-sam008','NASAMS 노르웨이','NASAMS Norwegian Advanced SAM','SAM','NORWAY','OPERATIONAL','HIGH',
    '노르웨이 NASAMS. AIM-120 AMRAAM 지상발사형. 우크라이나 공급 핵심. 미국 도입.',
    {range:'25km+(AMRAAM)/100km+(ER)',firstDeployed:'1994년',manufacturer:'콩스베르크·레이시언'},
    ['NASAMS','AMRAAM지상발사','노르웨이','우크라이나'],['콩스베르크','레이시언'],
    undefined,'https://en.wikipedia.org/wiki/NASAMS',90),

  w('ms-sam009','미스트랄 SHORAD 프랑스','Mistral SHORAD Missile France','SAM','FRANCE','OPERATIONAL','MED',
    '프랑스 적외선 유도 단거리 방공. 함정·차량·보병 탑재 다용도. 다수 국가 수출.',
    {range:'6km',ceiling:'3km',weight:'18.7kg',firstDeployed:'1988년',manufacturer:'MBDA'},
    ['미스트랄','SHORAD','프랑스','적외선유도'],['MBDA','프랑스군'],
    undefined,'https://en.wikipedia.org/wiki/Mistral_(missile)',85),

  w('ms-sam010','Buk-M3 미사일 러시아','Buk-M3 SA-17 SAM Russia','SAM','RUSSIA','OPERATIONAL','HIGH',
    'Buk-M3 빅토르 개량. MH17 격추 MH17 사건 모델 후계. 우크라이나 사용. 사거리 70km.',
    {range:'70km',ceiling:'35km',firstDeployed:'2016년(M3)',manufacturer:'러시아 방산'},
    ['Buk-M3','빅토르','러시아방공','우크라이나','MH17'],['러시아국방부'],
    undefined,'https://en.wikipedia.org/wiki/Buk_missile_system',85),

  // ── 대전차 미사일 추가 ─────────────────────────────────────────────────
  w('ms-atm001','자벨린 FGM-148F','FGM-148F Javelin ATGM USA','MISSILE','USA','OPERATIONAL','HIGH',
    '세계 최강 휴대용 대전차미사일. 탑 어택 모드. 최소 사거리 65m. 우크라이나 대규모 공급.',
    {range:'4,750m',payload:'8.4kg 탠덤탄두',weight:'22.3kg',firstDeployed:'1996년',manufacturer:'레이시언/록히드마틴'},
    ['자벨린','FGM-148','대전차','탑어택','우크라이나'],['레이시언','미육군'],
    undefined,'https://en.wikipedia.org/wiki/FGM-148_Javelin',95),

  w('ms-atm002','NLAW ATGM 영국','NLAW Next Generation Light Anti-Tank UK','MISSILE','UK','OPERATIONAL','HIGH',
    'NLAW 차세대 경대전차. 예측비행형(PLOS). 단발 사용·휴대. 우크라이나 대규모 공급. 러시아 전차 격파.',
    {range:'20~800m',payload:'탠덤 HEAT',weight:'12.5kg',firstDeployed:'2002년',manufacturer:'사브·탈레스'},
    ['NLAW','차세대경대전차','예측비행','우크라이나'],['사브','탈레스','영국군'],
    undefined,'https://en.wikipedia.org/wiki/NLAW',90),

  w('ms-atm003','코넷-EM 러시아','Kornet-EM 9M133 ATGM Russia','MISSILE','RUSSIA','OPERATIONAL','HIGH',
    '러시아 레이저 유도 대전차미사일. 두 발 동시 유도. M1 에이브람스 관통 능력. 중동 실전.',
    {range:'8km',payload:'1,200mm 관통(EM)',firstDeployed:'1994년(기본)/2012년(EM)',manufacturer:'KBP'},
    ['코넷EM','9M133','러시아대전차','레이저유도'],['KBP','러시아군'],
    undefined,'https://en.wikipedia.org/wiki/Kornet',85),

  w('ms-atm004','스파이크-LR2 이스라엘','Spike LR2 Anti-Tank Israel 4th Gen','MISSILE','ISRAEL','OPERATIONAL','HIGH',
    '스파이크 4세대 LR2. 사거리 5.5km. 만인 탄두 HEAT+EFP. IDF·독일·한국 도입.',
    {range:'5,500m',payload:'탠덤 HEAT+EFP',firstDeployed:'2019년',manufacturer:'라파엘'},
    ['스파이크LR2','이스라엘','4세대대전차','독일'],['라파엘','IDF'],
    undefined,'https://en.wikipedia.org/wiki/Spike_(missile)',88),

  w('ms-atm005','TOW-2B 에어로 미국','BGM-71F TOW-2B Aero USA','MISSILE','USA','OPERATIONAL','HIGH',
    'TOW 최신형. 2B 에어로 탑 어택. 개량형 탐색기. 전 세계 40개국+ 운용.',
    {range:'4,500m',payload:'탑공격 EFP',firstDeployed:'1987년(2B)/2014년(에어로)',manufacturer:'레이시언'},
    ['TOW-2B','에어로','대전차','탑어택','40개국'],['레이시언','미군'],
    undefined,'https://en.wikipedia.org/wiki/BGM-71_TOW',90),

  w('ms-atm006','HJ-12 홍젠 12 중국','HJ-12 Red Arrow 12 ATGM China','MISSILE','CHINA','OPERATIONAL','HIGH',
    '중국 자벨린 대응형 4세대 대전차미사일. IIR 탐색기. 발사 후 망각. 탑 어택.',
    {range:'4,000m',payload:'HEAT 탠덤',firstDeployed:'2014년',manufacturer:'NORINCO'},
    ['HJ-12','홍젠12','중국자벨린','4세대대전차'],['NORINCO','PLA'],
    undefined,undefined,82),

  // ── 순항미사일 추가 ─────────────────────────────────────────────────
  w('ms-crz001','SCALP-EG/Storm Shadow','SCALP-EG Storm Shadow Air-Launched Cruise','MISSILE','NATO','OPERATIONAL','HIGH',
    '영국·프랑스 공중발사 순항미사일. 550km. BROACH 탄두. 우크라이나 공급 핵심.',
    {range:'550km',payload:'450kg BROACH',speed:'마하 0.9',firstDeployed:'2003년',manufacturer:'MBDA'},
    ['SCALP-EG','스톰쉐도우','순항미사일','우크라이나'],['MBDA','영국프랑스'],
    undefined,'https://en.wikipedia.org/wiki/MBDA_Storm_Shadow',90),

  w('ms-crz002','타우러스 KEPD-350K','Taurus KEPD-350K Air-Launched Cruise Korea','MISSILE','GERMANY','OPERATIONAL','HIGH',
    '독일 타우러스 순항미사일 한국 도입. 500km. 벙커버스터. F-15K 탑재. 북한 전략목표 타격.',
    {range:'500km',payload:'MEPHISTO 481kg',speed:'마하 0.95',firstDeployed:'2013년(한국)',manufacturer:'TAURUS Systems(LFK·SAAB)'},
    ['타우러스','KEPD-350K','한국도입','F-15K','벙커버스터'],['타우러스시스템','방위사업청'],
    undefined,'https://en.wikipedia.org/wiki/Taurus_KEPD_350',90),

  w('ms-crz003','AGM-158 JASSM 미국','AGM-158C LRASM Long Range Anti-Ship','MISSILE','USA','OPERATIONAL','HIGH',
    'JASSM 대함형 LRASM. 완전 자율 표적획득. 800km+. 스텔스. 중국 PLAN 억제.',
    {range:'800km+',payload:'450kg',speed:'마하 0.9',firstDeployed:'2019년',manufacturer:'록히드마틴'},
    ['LRASM','JASSM','대함순항','스텔스','자율'],['록히드마틴','USAF/USN'],
    undefined,'https://en.wikipedia.org/wiki/AGM-158_JASSM',90),

  w('ms-crz004','오닉스 P-800 러시아','P-800 Oniks Onyx Anti-Ship Cruise','MISSILE','RUSSIA','OPERATIONAL','HIGH',
    '러시아 초음속 대함순항미사일. 마하 2.5. 함·잠·기지·공중 발사. 시리아·우크라이나 사용.',
    {speed:'마하 2.5',range:'600km',payload:'200kg',firstDeployed:'2002년',manufacturer:'NPO 마시노스트로예니야'},
    ['P-800','오닉스','러시아대함','초음속','시리아'],['NPO마시노','러시아국방부'],
    undefined,'https://en.wikipedia.org/wiki/P-800_Oniks',85),

  w('ms-crz005','Kh-101/102 러시아 스텔스','Kh-101/102 Stealth Cruise Missile Russia','MISSILE','RUSSIA','OPERATIONAL','HIGH',
    '러시아 스텔스 공중발사 순항미사일. 핵(Kh-102)/재래식(Kh-101). 5,000km. 우크라이나 집중 사용.',
    {range:'5,000km',payload:'400kg(재래식)',speed:'마하 0.9',firstDeployed:'2013년',manufacturer:'라둬르 설계국'},
    ['Kh-101','Kh-102','러시아스텔스','순항','우크라이나'],['라둬르','러시아공군'],
    undefined,'https://en.wikipedia.org/wiki/Kh-101/Kh-102',85),

  // ── 지뢰·장애물 무기 ─────────────────────────────────────────────────
  w('ms-den001','M1A1 PT 탱크지뢰','M1A1 PT Anti-Tank Mine USA','GROUND','USA','OPERATIONAL','LOW',
    '미국 표준 대전차지뢰. 세계 공통 규격. 135kg 압력 기폭. 퇴역 중이나 재고 잔존.',
    {weight:'10.3kg',firstDeployed:'1960년대',manufacturer:'미 육군'},
    ['M1A1','대전차지뢰','PT지뢰'],['미육군'],
    undefined,undefined,75),

  w('ms-den002','PMN-4 이란 북한 지뢰','PMN-4 AP Mine DPRK/Iran','GROUND','RUSSIA','OPERATIONAL','MED',
    '러시아 PMN-4 대인지뢰. 북한·이란 복제 생산. 우크라이나·분쟁지역 광범위 살포.',
    {weight:'0.1kg',firstDeployed:'1990년대',manufacturer:'러시아'},
    ['PMN-4','대인지뢰','북한복제','우크라이나','이란'],['HALO Trust','ICBL'],
    undefined,undefined,70),

  // ── 공대지 미사일 추가 ─────────────────────────────────────────────────
  w('ms-ags001','AGM-88G AARGM-ER 레이더파괴','AGM-88G AARGM-ER Anti-Radiation Missile','MISSILE','USA','DEVELOPMENT','HIGH',
    'HARM 후계 AARGM-ER. 사거리 3배. 이동표적 추적. F-35 내부탑재. 러시아 S-400 킬러.',
    {range:'250km+',speed:'마하 2.0+',firstDeployed:'2023년(IOC)',manufacturer:'노스럽그루먼'},
    ['AARGM-ER','AGM-88G','대방사','레이더파괴','F-35'],['노스럽그루먼','USN'],
    undefined,undefined,82),

  w('ms-ags002','AGM-179A JAGM 합동대전차','AGM-179A JAGM Multi-Mode Seeker','MISSILE','USA','OPERATIONAL','HIGH',
    '헬파이어 대체 JAGM. 밀리미터파+세미액티브레이저+IIR 3중 탐색기. AH-64E 탑재.',
    {range:'16km',payload:'8.0kg',firstDeployed:'2020년',manufacturer:'록히드마틴'},
    ['JAGM','AGM-179A','대전차','3중탐색기','헬파이어대체'],['록히드마틴','미육군'],
    undefined,undefined,85),

  w('ms-ags003','GBU-72 ABFB 번커버스터','GBU-72 Advanced Bunker Buster USA','MISSILE','USA','DEVELOPMENT','HIGH',
    '30,000lb GBU-57 MOP 후계 연구. 더 스마트한 관통 폭탄. 이란·북한 지하시설 대응.',
    {payload:'13,600kg+',firstDeployed:'개발중',manufacturer:'미공군연구소'},
    ['GBU-72','벙커버스터','관통폭탄','지하시설'],['USAF'],
    undefined,undefined,55),

  w('ms-ags004','SDB II GBU-53B 소구경폭탄','GBU-53B SDB-II Stormbreaker USA','MISSILE','USA','OPERATIONAL','HIGH',
    '소구경폭탄II. 밀리파+IIR+반능동레이저 삼중탐색. 이동표적 추적. F-35·F/A-18 탑재.',
    {range:'110km',payload:'93kg',firstDeployed:'2022년',manufacturer:'레이시언'},
    ['SDB-II','GBU-53B','스톰브레이커','이동표적','삼중탐색'],['레이시언','USAF'],
    undefined,undefined,88),

  // ── 핵무기 ─────────────────────────────────────────────────────────────
  w('ms-nuc001','B61-12 핵폭탄','B61-12 Nuclear Gravity Bomb USA','MISSILE','USA','OPERATIONAL','CRITICAL',
    '미국 핵 중력폭탄 최신형. GPS 유도 정밀. 0.3~50kt 가변 위력. F-35A 운용. NATO 핵공유.',
    {payload:'0.3~50kt(가변)',firstDeployed:'2022년',manufacturer:'NNSA/산디아국립연구소'},
    ['B61-12','핵폭탄','NATO핵공유','F-35','GPS정밀핵'],['NNSA','USAF'],
    undefined,'https://en.wikipedia.org/wiki/B61_nuclear_bomb',90),

  w('ms-nuc002','W76-2 저위력 핵탄두','W76-2 Low-Yield SLBM Warhead USA','MISSILE','USA','OPERATIONAL','CRITICAL',
    '트라이던트 II D5 탑재 저위력(5~6kt) 핵탄두. 러시아 전술핵 대응. 2019년 배치.',
    {payload:'5~6kt',firstDeployed:'2019년',manufacturer:'NNSA'},
    ['W76-2','저위력핵','전술핵','트라이던트','러시아대응'],['NNSA','USN'],
    undefined,undefined,85),

  w('ms-nuc003','ASMP-A 핵순항미사일','ASMP-A Nuclear Air-Sol Moyen Portée France','MISSILE','FRANCE','OPERATIONAL','CRITICAL',
    '프랑스 핵순항미사일. 라팔·미라쥬 2000N 탑재. 500km. 100kt 핵탄두. 유럽 핵독립.',
    {range:'500km',payload:'100kt TN81탄두',speed:'마하 3',firstDeployed:'2009년',manufacturer:'MBDA'},
    ['ASMP-A','프랑스핵','순항미사일','100kt'],['MBDA','프랑스공군'],
    undefined,'https://en.wikipedia.org/wiki/ASMP_(missile)',85),

  // ── 대드론·미래무기 ────────────────────────────────────────────────────
  w('ms-fu001','HELIOS 함상 레이저','HELIOS High Energy Laser US Navy','GROUND','USA','OPERATIONAL','MED',
    '미 해군 고에너지 레이저 무기. 60kW. USS 포틀랜드 탑재. 드론·소형 선박 격파.',
    {firstDeployed:'2022년(실전)',manufacturer:'록히드마틴'},
    ['HELIOS','레이저무기','함상레이저','대드론'],['록히드마틴','USN'],
    undefined,undefined,82),

  w('ms-fu002','DE M-SHORAD 지상레이저','DE M-SHORAD Ground-Based Laser USA','SAM','USA','DEVELOPMENT','MED',
    '미 육군 차량탑재 50kW 레이저 방공. 드론·로켓·박격포 요격. 스트라이커 탑재.',
    {firstDeployed:'2023년(시험)',manufacturer:'레이시언'},
    ['DE M-SHORAD','레이저방공','대드론','육군레이저'],['레이시언','미육군'],
    undefined,undefined,75),

  w('ms-fu003','레일건 실험 미국','Railgun EM Launcher USA Prototype','GROUND','USA','RETIRED','LOW',
    '미 해군 레일건 프로젝트. 마하 6 발사. 2021년 예산 삭감 취소. 기술은 극초음속에 흡수.',
    {speed:'마하 6',range:'185km',firstDeployed:'실험(취소)',manufacturer:'BAE Systems'},
    ['레일건','전자기발사','마하6','취소'],['BAE','USN'],
    undefined,'https://en.wikipedia.org/wiki/Railgun',78),

  w('ms-fu004','로열 윙맨 MQ-28A 호주','MQ-28A Ghost Bat Loyal Wingman Australia','UAV','AUSTRALIA','DEVELOPMENT','HIGH',
    '보잉 로열 윙맨 MQ-28A. AI 자율 편대. F-35·F/A-18과 유인-무인협동. 2022년 첫 비행.',
    {speed:'마하 0.9+(추정)',firstDeployed:'2023년(시험)',manufacturer:'보잉 호주'},
    ['MQ-28A','고스트배트','로열윙맨','AI편대','유무인협동'],['보잉','RAAF'],
    undefined,undefined,75),

  w('ms-fu005','S-70 오카호트닉 러시아 UCAV','S-70 Okhotnik Heavy UCAV Russia','UAV','RUSSIA','DEVELOPMENT','HIGH',
    '러시아 중형 스텔스 UCAV. 전익기. Su-57과 편대비행 시험. 핵탑재 가능 논의.',
    {speed:'1,000km/h+(추정)',armament:'폭탄·순항미사일',firstDeployed:'2019년(시험)',manufacturer:'수호이'},
    ['S-70','오카호트닉','러시아UCAV','전익기','Su-57편대'],['수호이','러시아국방부'],
    undefined,undefined,70),

  w('ms-fu006','WZ-8 극초음속정찰기 중국','WZ-8 Hypersonic Reconnaissance UAV China','UAV','CHINA','OPERATIONAL','HIGH',
    '중국 극초음속 정찰 드론. H-6M 탑재 공중발사. 마하 4+. 2019년 열병식 공개.',
    {speed:'마하 4+',ceiling:'30km+',firstDeployed:'2019년(추정)',manufacturer:'CASC'},
    ['WZ-8','극초음속정찰','중국드론','H-6발사'],['CASC','PLAAF'],
    undefined,undefined,68),

]
