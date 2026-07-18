import type { WeaponSystem } from './weapons'
const w = (id:string,name:string,nameEng:string,cat:WeaponSystem['category'],origin:WeaponSystem['origin'],status:WeaponSystem['status'],threat:WeaponSystem['threatRating'],desc:string,specs:WeaponSystem['specs'],tags:string[],sources:string[],img?:string,wiki?:string,conf=90): WeaponSystem=>({id,name,nameEng,category:cat,origin,status,threatRating:threat,description:desc,detail:`## ${nameEng}\n\n${desc}\n\n### 주요 제원\n${Object.entries(specs).filter(([,v])=>v).map(([k,v])=>`- ${k}: ${v}`).join('\n')}`,specs,confidence:conf,lastUpdated:'2026-07-01',relatedIntelIds:[],tags,sources,imageUrl:img,wikiUrl:wiki})

export const WEAPONS_BATCH3_USA2: WeaponSystem[] = [

  // ── 육군 전차·기갑 ───────────────────────────────────────────────────────
  w('usa2-t001','M1A2 SEPv3 에이브람스','M1A2 SEPv3 Abrams MBT','GROUND','USA','OPERATIONAL','LOW',
    'M1A2 3차 성능개량. 배터리 강화·레이저경보·능동방호 준비(APS). 차세대 NGAP 탄약 운용.',
    {weight:'66.8t',armament:'120mm M256A1·M2HB 12.7mm·M240 7.62mm×2',crew:'4명',speed:'67km/h',range:'426km',firstDeployed:'2020년',manufacturer:'제너럴다이나믹스',quantity:'750대+'},
    ['M1A2SEPv3','에이브람스','120mm','APS준비','미육군'],['제너럴다이나믹스','USARMY'],
    undefined,'https://en.wikipedia.org/wiki/M1_Abrams',97),

  w('usa2-t002','M1A2 SEPv4 에이브람스','M1A2 SEPv4 Abrams MBT','GROUND','USA','DEVELOPMENT','LOW',
    '에이브람스 최신 개량. 레이저 레이더·능동방호(APS 통합)·하이브리드 전기 보조추진. 2025년 예정.',
    {weight:'68t(예상)',armament:'120mm M256A2·APS 통합',crew:'4명',firstDeployed:'2025년(예상)',manufacturer:'제너럴다이나믹스'},
    ['M1A2SEPv4','에이브람스','APS','최신개량'],['제너럴다이나믹스'],undefined,undefined,80),

  w('usa2-t003','M10 부커 경전차','M10 Booker Light Tank','GROUND','USA','OPERATIONAL','LOW',
    '미 육군 재도입 경전차. 82nd 공수사단·기보 여단 배속. 105mm 강선포. 공수 가능 여부 검토.',
    {weight:'38t',armament:'105mm XM35 강선포·M240B 7.62mm',crew:'4명',speed:'65km/h',firstDeployed:'2024년',manufacturer:'제너럴다이나믹스',quantity:'504대(계획)'},
    ['M10','부커','경전차','105mm','공수부대'],['제너럴다이나믹스','USARMY'],undefined,'https://en.wikipedia.org/wiki/M10_Booker',90),

  w('usa2-t004','M2A4 브래들리 IFV','M2A4 Bradley IFV','GROUND','USA','OPERATIONAL','LOW',
    'M2 브래들리 최신 개량형. 25mm M242 기관포·TOW2B 대전차미사일·레이저경보수신기.',
    {weight:'33.8t',armament:'25mm M242·TOW2B·7.62mm M240C',crew:'3+6명',speed:'66km/h',firstDeployed:'2020년',manufacturer:'BAE Systems',quantity:'3,500+대'},
    ['M2A4','브래들리','IFV','25mm','TOW'],['BAE Systems','USARMY'],'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Bradley_IFV.jpg/320px-Bradley_IFV.jpg','https://en.wikipedia.org/wiki/Bradley_fighting_vehicle',93),

  w('usa2-t005','M3A3 카발리 브래들리','M3A3 Bradley Cavalry Fighting Vehicle','GROUND','USA','OPERATIONAL','LOW',
    '브래들리 기병형. 보병 대신 증가연료·탄약. 기병 정찰 임무 특화.',
    {weight:'33t',armament:'25mm M242·TOW2B·7.62mm',crew:'3+2명(승객 없음)',speed:'66km/h',firstDeployed:'2000년',manufacturer:'BAE Systems'},
    ['M3A3','카발리','브래들리','정찰','기병'],['BAE Systems','USARMY'],undefined,undefined,90),

  w('usa2-t006','스트라이커 DVH','Stryker DVH (Double-V Hull)','GROUND','USA','OPERATIONAL','LOW',
    'V형 선저 스트라이커. IED 방호 강화. 8×8 차륜형. 보병전투·지휘통제·박격포 등 10개 파생형.',
    {weight:'19t',armament:'12.7mm·40mm·CROWS-J',crew:'2+9명',speed:'100km/h',range:'500km',firstDeployed:'2011년',manufacturer:'제너럴다이나믹스',quantity:'4,000+대'},
    ['스트라이커','DVH','8x8','IED방호','차륜형'],['제너럴다이나믹스','USARMY'],undefined,'https://en.wikipedia.org/wiki/Stryker',93),

  w('usa2-t007','스트라이커 SHORAD','Stryker IM-SHORAD','SAM','USA','OPERATIONAL','LOW',
    '스트라이커 차체 통합형 단거리 방공. FIM-92 스팅어+AGM-114 헬파이어·30mm. 드론·헬기 대응.',
    {weight:'19t',armament:'스팅어 4발·헬파이어 6발·30mm M230LF',crew:'4명',firstDeployed:'2022년',manufacturer:'보잉·레이시온'},
    ['스트라이커SHORAD','단거리방공','IM-SHORAD','드론대응'],['보잉','레이시온','USARMY'],undefined,undefined,88),

  w('usa2-t008','암트랙 AAV7A1','AAV7A1 Amphibious Assault Vehicle','GROUND','USA','OPERATIONAL','LOW',
    '미 해병대 상륙돌격장갑차. 수상·상륙 능력. 4,000대+. Mk.19 유탄기관총·M2HB.',
    {weight:'29.1t',armament:'Mk.19 40mm·M2HB 12.7mm',crew:'3+21명',speed:'72km/h(도로)·13km/h(수상)',firstDeployed:'1972년',manufacturer:'BAE Systems',quantity:'1,300대+'},
    ['AAV7','암트랙','상륙장갑차','해병대','수상'],['BAE Systems','USMC'],undefined,'https://en.wikipedia.org/wiki/AAV-7',88),

  w('usa2-t009','ACV 1.1 상륙전투차','ACV 1.1 Amphibious Combat Vehicle','GROUND','USA','OPERATIONAL','LOW',
    'AAV7 후속 상륙전투차. 8×8 차륜형. BAE/이베코. 해상 기동·상륙 능력. 2020년대 전력화.',
    {weight:'34t',armament:'Mk.19 또는 12.7mm·연막',crew:'3+13명',speed:'104km/h(도로)',firstDeployed:'2020년',manufacturer:'BAE Systems·이베코',quantity:'200대+'},
    ['ACV','상륙전투차','해병대','8x8'],['BAE Systems','USMC'],undefined,'https://en.wikipedia.org/wiki/ACV_(vehicle)',90),

  w('usa2-t010','M113A3 장갑병력수송차','M113A3 APC','GROUND','USA','OPERATIONAL','LOW',
    '세계 최다 생산 APC. 80,000대+ 생산. 미군·동맹국 광범위 운용. 다수 파생형.',
    {weight:'12.3t',armament:'M2HB 12.7mm',crew:'2+11명',speed:'67km/h',firstDeployed:'1960년',manufacturer:'BAE Systems(구 FMC)',quantity:'세계 80,000+대'},
    ['M113','APC','병력수송','장갑차','베스트셀러'],['BAE Systems','USARMY'],undefined,'https://en.wikipedia.org/wiki/M113_armored_personnel_carrier',90),

  // ── 육군 자주포·포병 ─────────────────────────────────────────────────────
  w('usa2-a001','M109A7 팔라딘','M109A7 Paladin SPH','ARTILLERY','USA','OPERATIONAL','LOW',
    'M109 최신형 팔라딘. 155mm/39구경장. 디지털 사격통제·자동 탄약처리. 2015년부터 전력화.',
    {weight:'43.5t',armament:'155mm M284 곡사포',crew:'4명',range:'30km(ERFB탄)',speed:'61km/h',firstDeployed:'2015년',manufacturer:'BAE Systems',quantity:'580대+'},
    ['M109A7','팔라딘','자주포','155mm','디지털'],['BAE Systems','USARMY'],
    undefined,'https://en.wikipedia.org/wiki/M109_howitzer',95),

  w('usa2-a002','M777A2 견인 곡사포','M777A2 Lightweight Howitzer','ARTILLERY','USA','OPERATIONAL','LOW',
    '39구경장 155mm 초경량 견인포. 4.2t. 헬기 공수 가능. GPS 정밀유도탄(Excalibur) 운용. 우크라이나 지원.',
    {weight:'4,218kg',armament:'155mm/39구경장',crew:'8명',range:'40km(Excalibur)',firstDeployed:'2005년',manufacturer:'BAE Systems',quantity:'1,100+문'},
    ['M777','경량곡사포','엑스칼리버','공수가능','우크라이나지원'],['BAE Systems','USARMY','USMC'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/M777_howitzer_rear.jpg/330px-M777_howitzer_rear.jpg','https://en.wikipedia.org/wiki/M777_howitzer',97),

  w('usa2-a003','엑스칼리버 Ib 정밀유도포탄','M982 Excalibur Ib GPS Shell','ARTILLERY','USA','OPERATIONAL','LOW',
    '155mm GPS+INS 정밀유도포탄. CEP 4m. 사거리 57km. M777·M109·K9 운용. 우크라이나 전쟁 실전.',
    {range:'57km',payload:'10kg 파편탄두',guidance:'GPS+INS',firstDeployed:'2007년',manufacturer:'레이시온·BAE Systems'},
    ['엑스칼리버','GPS포탄','정밀유도','M982','155mm'],['레이시온','USARMY'],'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/XM982_Excalibur_inert_%28cropped%29.jpg/330px-XM982_Excalibur_inert_%28cropped%29.jpg','https://en.wikipedia.org/wiki/M982_Excalibur',97),

  w('usa2-a004','ERCA (확장사거리 자주포)','XM1299 ERCA Extended Range Cannon Artillery','ARTILLERY','USA','DEVELOPMENT','LOW',
    'M109 기반 58구경장 강화 포신 자주포. 사거리 70km+(엑스칼리버 ER). 2026년 전력화 목표.',
    {weight:'45t',armament:'155mm/58구경장',crew:'3명(자동화)',range:'70km+(ERAP)',firstDeployed:'2026년(예상)',manufacturer:'BAE Systems'},
    ['ERCA','XM1299','확장사거리','자주포','58구경장'],['BAE Systems','USARMY'],undefined,undefined,75),

  w('usa2-a005','M270A1 MLRS','M270A1 Multiple Launch Rocket System','MLRS','USA','OPERATIONAL','LOW',
    '12연장 227mm 다연장로켓시스템. M31 GMLRS·ATACMS·PrSM 운용. NATO 표준 플랫폼.',
    {weight:'24.7t',armament:'GMLRS 12발·ATACMS 2발 또는 PrSM',crew:'3명',speed:'64km/h',firstDeployed:'1983년',manufacturer:'록히드마틴',quantity:'1,200+대'},
    ['M270','MLRS','다연장로켓','ATACMS','GMLRS'],['록히드마틴','USARMY'],
    undefined,'https://en.wikipedia.org/wiki/M270_Multiple_Launch_Rocket_System',95),

  w('usa2-a006','M142 하이마스','M142 HIMARS','MLRS','USA','OPERATIONAL','LOW',
    '6발 차량탑재 MLRS. 105km/h 기동. 우크라이나 전쟁 주력 전장타격 무기. GMLRS·ATACMS·PrSM 운용.',
    {weight:'16.3t',armament:'GMLRS 6발·ATACMS 1발·PrSM',crew:'3명',speed:'105km/h',firstDeployed:'2005년',manufacturer:'록히드마틴',quantity:'540+대'},
    ['HIMARS','하이마스','M142','GMLRS','우크라이나'],['록히드마틴','USARMY'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/HIMARS_test_fire.jpg/320px-HIMARS_test_fire.jpg',
    'https://en.wikipedia.org/wiki/M142_HIMARS',99),

  w('usa2-a007','ATACMS MGM-140 전술미사일','MGM-140 ATACMS Tactical Missile','MLRS','USA','OPERATIONAL','LOW',
    'HIMARS·M270 발사 단거리 탄도미사일. 블록 IA: 사거리 270km. 자탄 또는 단일 탄두. 우크라이나 운용.',
    {range:'270km(Blk IA)',payload:'자탄 300발 또는 500lb 단일탄두',guidance:'INS+GPS',firstDeployed:'1991년(걸프전)',manufacturer:'록히드마틴'},
    ['ATACMS','MGM-140','HIMARS','전술미사일','우크라이나'],['록히드마틴','USARMY'],
    undefined,'https://en.wikipedia.org/wiki/MGM-140_ATACMS',97),

  w('usa2-a008','PrSM Increment 1 정밀타격미사일','PrSM Increment 1 Precision Strike Missile','MLRS','USA','OPERATIONAL','LOW',
    'ATACMS 후속. 사거리 500km+(Incr.4 목표). HIMARS·M270 발사. 2023년 전력화. 대함 능력(Incr.2).',
    {range:'500km(Incr.2)',payload:'100kg 단두',guidance:'GPS+INS+멀티스펙트럴',firstDeployed:'2023년',manufacturer:'록히드마틴'},
    ['PrSM','정밀타격미사일','HIMARS','ATACMS후속','500km'],['록히드마틴','USARMY'],
    undefined,'https://en.wikipedia.org/wiki/Precision_Strike_Missile',90),

  w('usa2-a009','M109A8 팔라딘 IE','M109A8 Paladin IE Self-Propelled Howitzer','ARTILLERY','USA','DEVELOPMENT','LOW',
    'M109A7 PIM(팔라딘 통합관리) 후속. 향상된 디지털 사격통제·ATC 자동표적계산.',
    {weight:'44t',armament:'155mm M284 곡사포',crew:'4명',firstDeployed:'2027년(예상)',manufacturer:'BAE Systems'},
    ['M109A8','팔라딘IE','자주포','디지털화'],['BAE Systems','USARMY'],undefined,undefined,70),

  // ── 육군 대공 방공 ────────────────────────────────────────────────────────
  w('usa2-s001','패트리어트 PAC-3 MSE','MIM-104F Patriot PAC-3 MSE','SAM','USA','OPERATIONAL','LOW',
    'PAC-3 미사일 세그먼트 강화형. 탄도미사일+순항미사일 요격. 사거리 35km+. 세계 20개국 운용.',
    {range:'35km',altitude:'25km',speed:'마하 5',guidance:'능동레이더 직격',firstDeployed:'2008년',manufacturer:'록히드마틴',quantity:'세계 240+ 포대'},
    ['PAC-3','MSE','패트리어트','탄도미사일','동맹국'],['록히드마틴','레이시온','USARMY'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/U-s-service-members-stand-by-a-patriot-missile-battery-in-gaziantep-turkey.jpg/330px-U-s-service-members-stand-by-a-patriot-missile-battery-in-gaziantep-turkey.jpg','https://en.wikipedia.org/wiki/Patriot_(missile)',98),

  w('usa2-s002','THAAD 사드','THAAD Terminal High Altitude Area Defense','SAM','USA','OPERATIONAL','LOW',
    '종말단계 고고도 방공. 탄도미사일 대기권 내외 요격. 7개 포대. 한국·사우디·UAE 배치.',
    {range:'200km',altitude:'150km',speed:'마하 8+',guidance:'적외선 탐색기',firstDeployed:'2008년',manufacturer:'록히드마틴',quantity:'7개 포대'},
    ['THAAD','사드','고고도방공','탄도미사일요격'],['록히드마틴','USARMY'],
    undefined,'https://en.wikipedia.org/wiki/Terminal_High_Altitude_Area_Defense',99),

  w('usa2-s003','IFPC 통합방공화력통제','IFPC Indirect Fire Protection Capability','SAM','USA','DEVELOPMENT','LOW',
    '미군 차세대 드론·순항미사일 통합방어체계. EPC 레이저+미사일 복합. 2027년 예정.',
    {firstDeployed:'2027년(예상)',manufacturer:'레이시온·보잉'},
    ['IFPC','통합방공','드론방어','레이저복합'],['레이시온','보잉','USARMY'],undefined,undefined,65),

  w('usa2-s004','SHORAD M-SHORAD','M-SHORAD Maneuver Short Range Air Defense','SAM','USA','OPERATIONAL','LOW',
    '스트라이커 기반 기동단거리방공. FIM-92 스팅어+AGM-114L 롱보우헬파이어·30mm. 2022년 전력화.',
    {range:'8km(스팅어)',firstDeployed:'2022년',manufacturer:'보잉'},
    ['M-SHORAD','스트라이커','단거리방공','스팅어'],['보잉','USARMY'],undefined,undefined,88),

  w('usa2-s005','FIM-92 스팅어 MANPADS','FIM-92 Stinger MANPADS','SAM','USA','OPERATIONAL','LOW',
    '보병 휴대용 지대공미사일. 적외선 추적. 사거리 8km. 아프간·우크라이나 실전. 72개국 운용.',
    {range:'8km',altitude:'3.8km',speed:'마하 2.2',guidance:'IR 추적',firstDeployed:'1981년',manufacturer:'레이시온',quantity:'세계 다수'},
    ['스팅어','MANPADS','FIM-92','휴대용','우크라이나'],['레이시온','USARMY'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Voorzijde_van_een_Stinger_lanceerbuis_met_richt-afvuurapparatuur_%282086-065-004%29.jpg/330px-Voorzijde_van_een_Stinger_lanceerbuis_met_richt-afvuurapparatuur_%282086-065-004%29.jpg','https://en.wikipedia.org/wiki/FIM-92_Stinger',98),

  // ── 헬기 ─────────────────────────────────────────────────────────────────
  w('usa2-h001','AH-64E 아파치 가디언','AH-64E Apache Guardian','HELICOPTER','USA','OPERATIONAL','LOW',
    '미 육군 주력 공격헬기. 롱보우 레이더·헬파이어·하이드라 70. 링크 16 데이터링크. 한국·일본 등 운용.',
    {speed:'293km/h',range:'1,900km(페리)',crew:'2명',armament:'30mm M230L·AGM-114R·AIM-92·하이드라70',firstDeployed:'2011년',manufacturer:'보잉',quantity:'800+기'},
    ['AH-64E','아파치가디언','공격헬기','롱보우','헬파이어'],['보잉','USARMY'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/AH-64D_apache.jpg/320px-AH-64D_apache.jpg',
    'https://en.wikipedia.org/wiki/Boeing_AH-64_Apache',99),

  w('usa2-h002','UH-60M 블랙호크','UH-60M Black Hawk','HELICOPTER','USA','OPERATIONAL','LOW',
    'UH-60M 최신형. 향상 기어박스·엔진·디지털조종석. 병력수송·의료후송·특수전. 4,500기+.',
    {speed:'294km/h',range:'592km',crew:'2+11명',armament:'M134 미니건·GAU-19',firstDeployed:'2006년',manufacturer:'시코르스키',quantity:'4,500기+'},
    ['UH-60M','블랙호크','기동헬기','특수전'],['시코르스키','USARMY'],
    undefined,'https://en.wikipedia.org/wiki/Sikorsky_UH-60_Black_Hawk',97),

  w('usa2-h003','CH-47F 치누크','CH-47F Chinook','HELICOPTER','USA','OPERATIONAL','LOW',
    'CH-47 최신형. 디지털 조종석·향상 엔진. 중형 화물·병력·야포 슬링 수송. 590기+ 운용.',
    {speed:'298km/h',range:'741km',crew:'3+33명·화물10.9t',armament:'M134·M60D',firstDeployed:'2006년',manufacturer:'보잉',quantity:'590기+'},
    ['CH-47F','치누크','수송헬기','슬링','보잉'],['보잉','USARMY'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/CH-47_assigned_to_3rd_General_Support_Aviation_Battalion%2C_82nd_Combat_Aviation_Brigade.jpg/330px-CH-47_assigned_to_3rd_General_Support_Aviation_Battalion%2C_82nd_Combat_Aviation_Brigade.jpg','https://en.wikipedia.org/wiki/Boeing_CH-47_Chinook',97),

  w('usa2-h004','MH-60M 블랙호크 (SOAR)','MH-60M Black Hawk (160th SOAR)','HELICOPTER','USA','OPERATIONAL','LOW',
    '미 특수전 항공연대(160th SOAR) 운용 개량형. 야간투시경·항법·피탐회피 강화. 빈라덴 작전 사용.',
    {speed:'294km/h',range:'600km+',crew:'4+11명',armament:'M134·GAU-19·AGM-114',firstDeployed:'2005년',manufacturer:'시코르스키'},
    ['MH-60M','SOAR','특수전헬기','야간작전'],['시코르스키','SOCOM'],undefined,undefined,90),

  w('usa2-h005','MH-47G 치누크 (SOAR)','MH-47G Chinook (160th SOAR)','HELICOPTER','USA','OPERATIONAL','LOW',
    '160th SOAR 특수전 대형헬기. 공중급유 프로브·야간비행 능력 강화. 장거리 침투 수송.',
    {speed:'298km/h',range:'1,100km+(공중급유)',crew:'4+36명',armament:'M134·M60·GAU-19',firstDeployed:'2000년대',manufacturer:'보잉'},
    ['MH-47G','SOAR','특수전','공중급유','장거리침투'],['보잉','SOCOM'],undefined,undefined,88),

  w('usa2-h006','OH-58D 카이오와 워리어','OH-58D Kiowa Warrior','HELICOPTER','USA','OPERATIONAL','LOW',
    '경정찰·표적지시 헬기. 마스트 탑재 레이더·FLIR. 2017년 퇴역 시작. FARA로 대체 예정.',
    {speed:'237km/h',range:'555km',crew:'2명',armament:'AGM-114·AIM-92·70mm 로켓',firstDeployed:'1991년',manufacturer:'벨',quantity:'퇴역중'},
    ['OH-58D','카이오와','정찰헬기','표적지시'],['벨','USARMY'],undefined,'https://en.wikipedia.org/wiki/Bell_OH-58_Kiowa',85),

  // ── 육군 지상 대전차 ─────────────────────────────────────────────────────
  w('usa2-at001','BGM-71 TOW2B','BGM-71F TOW-2B ATGM','GROUND','USA','OPERATIONAL','LOW',
    'TOW 최신형. 상부공격(EFP) 탄두. 와이어 유도. 3,750m. 험비·브래들리·헬기 탑재.',
    {range:'3,750m',payload:'EFP 2중 탄두',guidance:'와이어 SACLOS',firstDeployed:'1992년',manufacturer:'레이시온'},
    ['TOW2B','대전차미사일','ATGM','EFP','상부공격'],['레이시온','USARMY'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Hires_090509-A-4842R-001a.jpg/330px-Hires_090509-A-4842R-001a.jpg','https://en.wikipedia.org/wiki/BGM-71_TOW',95),

  w('usa2-at002','FGM-148 재블린','FGM-148 Javelin ATGM','GROUND','USA','OPERATIONAL','LOW',
    '발사 후 망각 ATGM. 적외선 영상 탐색기. 상부 공격 모드. 우크라이나 전쟁 대활약. 세계 최강 ATGM.',
    {range:'4,750m',payload:'탠덤 HEAT 또는 EFP',guidance:'IR 영상 탐색기',firstDeployed:'1996년',manufacturer:'레이시온·록히드마틴',quantity:'세계 다수'},
    ['재블린','FGM-148','ATGM','발사후망각','우크라이나'],['레이시온','USARMY','USMC'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Javelin_Missile_System.jpg/320px-Javelin_Missile_System.jpg',
    'https://en.wikipedia.org/wiki/FGM-148_Javelin',99),

  w('usa2-at003','M3 칼 구스타프 무반동포','M3 Carl Gustaf Recoilless Rifle','GROUND','USA','OPERATIONAL','LOW',
    '스웨덴제 84mm 무반동포. 미 특수전·공수부대 주력 대전차 화기. 다양한 탄종 운용.',
    {caliber:'84mm',weight:'7.5kg(발사기)',range:'1,000m(HEAT)',firstDeployed:'1990년대(미군)',manufacturer:'Saab(스웨덴)'},
    ['칼구스타프','M3','무반동포','84mm','특수전'],['Saab','USSOCOM','USARMY'],'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Carl_Gustav_M4_%281%29_%28brightened%2C_no_background%29_%28leveled%29.png/330px-Carl_Gustav_M4_%281%29_%28brightened%2C_no_background%29_%28leveled%29.png','https://en.wikipedia.org/wiki/Carl_Gustaf_8.4_cm_recoilless_rifle',92),

  w('usa2-at004','M72 LAW 경대전차로켓','M72 LAW Light Anti-Armor Weapon','LAUNCHER','USA','OPERATIONAL','LOW',
    '1회용 66mm 경대전차로켓. 경량·저비용. 비정규전·도시전 특화. 50년+ 운용. 개량형 지속 공급.',
    {caliber:'66mm',weight:'2.5kg',range:'300m(HEAT)',firstDeployed:'1963년',manufacturer:'탈레스'},
    ['M72','LAW','1회용','경대전차','66mm'],['탈레스','USARMY'],undefined,'https://en.wikipedia.org/wiki/M72_LAW',88),

  // ── 소화기 ───────────────────────────────────────────────────────────────
  w('usa2-sa001','M4A1 카빈','M4A1 Carbine','RIFLE','USA','OPERATIONAL','LOW',
    '미군 표준 개인화기. 5.56mm. 14.5인치 총열. SOPMOD 부착물. 세계 최다 운용 돌격소총 중 하나.',
    {caliber:'5.56×45mm NATO',weight:'2.8kg',length:'838mm(개머리 전개)',fireRate:'700~950rpm',capacity:'30발',firstDeployed:'1994년',manufacturer:'콜트·FNH USA'},
    ['M4A1','카빈','5.56mm','미군표준','SOPMOD'],['콜트','FNH','USARMY'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/M4-Carbine-Sand.jpg/320px-M4-Carbine-Sand.jpg','https://en.wikipedia.org/wiki/M4_carbine',97),

  w('usa2-sa002','M27 IAR 분대자동소총','M27 IAR Infantry Automatic Rifle','MG','USA','OPERATIONAL','LOW',
    'HK416 기반 미 해병대 분대자동소총. M249 대체. 5.56mm. 정확도·신뢰성 우수.',
    {caliber:'5.56×45mm NATO',weight:'3.6kg',fireRate:'700~900rpm',capacity:'30발',firstDeployed:'2011년',manufacturer:'HK(독일)'},
    ['M27','IAR','해병대','HK416','분대자동소총'],['HK','USMC'],undefined,'https://en.wikipedia.org/wiki/M27_IAR',92),

  w('usa2-sa003','M249 SAW 분대지원화기','M249 Squad Automatic Weapon','MG','USA','OPERATIONAL','LOW',
    '5.56mm 분대지원화기. FN Minimi 기반. 200발 드럼. 분대급 화력 지원. 이라크·아프간 실전.',
    {caliber:'5.56×45mm NATO',weight:'6.83kg',fireRate:'750~1,000rpm',range:'1,000m',capacity:'200발 드럼·30발 탄창',firstDeployed:'1984년',manufacturer:'FNH USA'},
    ['M249','SAW','분대지원화기','FN Minimi'],['FNH','USARMY','USMC'],
    undefined,'https://en.wikipedia.org/wiki/M249_light_machine_gun',93),

  w('usa2-sa004','M240B 중기관총','M240B GPMG','MG','USA','OPERATIONAL','LOW',
    'FN MAG 기반 7.62mm 범용기관총. 차량·헬기·보병 탑재. 미군 표준 GPMG.',
    {caliber:'7.62×51mm NATO',weight:'12.5kg',fireRate:'650~950rpm',range:'1,800m',firstDeployed:'1977년',manufacturer:'FNH USA'},
    ['M240B','GPMG','7.62mm','FN MAG'],['FNH','USARMY'],
    undefined,'https://en.wikipedia.org/wiki/M240_machine_gun',95),

  w('usa2-sa005','M2A1 중기관총','M2A1 Browning Heavy Machine Gun','MG','USA','OPERATIONAL','LOW',
    'M2HB 개량형. 신속교환 총열(QCB)·고정 헤드스페이스. 12.7mm. 차량·함정·방어진지 탑재.',
    {caliber:'12.7×99mm NATO',weight:'38kg',fireRate:'450~600rpm',range:'2,000m(유효)',firstDeployed:'2011년(A1)',manufacturer:'콜트·FNH USA'},
    ['M2A1','브라우닝','12.7mm','중기관총','QCB'],['콜트','USARMY'],
    undefined,'https://en.wikipedia.org/wiki/M2_Browning',95),

  w('usa2-sa006','M110A1 저격소총','M110A1 SDMR Sniper Rifle','SNIPER','USA','OPERATIONAL','LOW',
    'G28 기반 7.62mm 반자동 저격소총. 사거리 600m. 분대급 정밀사격. 공중강하 가능.',
    {caliber:'7.62×51mm NATO',weight:'3.8kg',range:'600m(유효)',capacity:'10발',firstDeployed:'2019년',manufacturer:'HK(독일)'},
    ['M110A1','저격소총','7.62mm','G28기반','공수'],['HK','USARMY'],undefined,undefined,90),

  w('usa2-sa007','M2010 강화저격소총','M2010 Enhanced Sniper Rifle','SNIPER','USA','OPERATIONAL','LOW',
    '.300 Winchester Magnum 저격소총. 사거리 1,200m. 아프간 산악전 대응 개발. 음파억제기 장착.',
    {caliber:'.300 Win Mag',weight:'7.6kg',range:'1,200m',capacity:'5발',firstDeployed:'2011년',manufacturer:'레밍턴'},
    ['M2010','저격소총','.300WM','아프간','음파억제기'],['레밍턴','USARMY'],undefined,'https://en.wikipedia.org/wiki/M2010_Enhanced_Sniper_Rifle',90),

  w('usa2-sa008','Barrett M82A1 대물저격총','Barrett M82A1 Anti-Material Rifle','SNIPER','USA','OPERATIONAL','LOW',
    '12.7mm 반자동 대물저격총. 사거리 1,800m. 경장갑·EO 센서·레이더 파괴. 50 BMG.',
    {caliber:'12.7×99mm BMG',weight:'14kg',range:'1,800m',capacity:'10발',firstDeployed:'1980년대',manufacturer:'Barrett'},
    ['Barrett','M82','대물저격','12.7mm','BMG'],['Barrett','USARMY','SOCOM'],
    undefined,'https://en.wikipedia.org/wiki/Barrett_M82',93),

  w('usa2-sa009','M17/M18 모듈러핸드건 (SIG P320)','M17/M18 Modular Handgun (SIG P320)','PISTOL','USA','OPERATIONAL','LOW',
    'SIG P320 기반 미군 표준 권총 교체. M9 베레타 대체. 9mm. 모듈형 플레임 그립.',
    {caliber:'9×19mm NATO',weight:'833g(M17)',capacity:'17+1발(M17)·21+1발(M17)',firstDeployed:'2017년',manufacturer:'SIG Sauer'},
    ['M17','M18','SIG P320','미군권총','모듈형'],['SIG Sauer','USARMY'],
    undefined,'https://en.wikipedia.org/wiki/SIG_Sauer_P320',95),

  w('usa2-sa010','MK19 자동유탄기관총','Mk.19 Automatic Grenade Launcher','LAUNCHER','USA','OPERATIONAL','LOW',
    '40mm×53mm 자동유탄기관총. 차량·해군함정·고정진지 탑재. 분당 325~375발. HEDP탄.',
    {caliber:'40×53mm HV',weight:'34kg',fireRate:'375rpm',range:'1,500m',firstDeployed:'1966년',manufacturer:'전반 방산'},
    ['Mk19','유탄기관총','40mm','차량탑재'],['USARMY','USMC'],
    undefined,'https://en.wikipedia.org/wiki/Mk_19_grenade_launcher',90),

  // ── 무인기(육군 UAV) ────────────────────────────────────────────────────
  w('usa2-u001','MQ-1C 그레이 이글','MQ-1C Gray Eagle UAV','UAV','USA','OPERATIONAL','LOW',
    '미 육군 전용 중고도 장기체공 UAV. Predator B 기반. 헬파이어 4발·GBU-44. 사단급 ISR.',
    {speed:'280km/h',ceiling:'8,969m',armament:'AGM-114 헬파이어 4발·GBU-44',firstDeployed:'2009년',manufacturer:'제너럴아토믹스',quantity:'160+기'},
    ['MQ-1C','그레이이글','육군UAV','헬파이어','ISR'],['제너럴아토믹스','USARMY'],
    undefined,'https://en.wikipedia.org/wiki/General_Atomics_MQ-1C_Gray_Eagle',95),

  w('usa2-u002','RQ-7B 섀도우','RQ-7B Shadow UAV','UAV','USA','OPERATIONAL','LOW',
    '여단전투단 배속 전술정찰 UAV. 활주로 이착륙·EO/IR 카메라. 6시간 체공.',
    {speed:'204km/h',ceiling:'4,572m',armament:'없음(감시)',firstDeployed:'2004년',manufacturer:'Textron Systems'},
    ['RQ-7','섀도우','전술UAV','여단급'],['Textron','USARMY'],
    undefined,'https://en.wikipedia.org/wiki/AAI_RQ-7_Shadow',88),

  w('usa2-u003','AeroVironment 스위치블레이드 300','Switchblade 300 Loitering Munition','UAV','USA','OPERATIONAL','LOW',
    '1회용 배낭 발사 소형 자폭드론. 15분 체공. 대인·경장갑 임무. 우크라이나 공급.',
    {speed:'157km/h',range:'10km',payload:'파편탄두',firstDeployed:'2012년',manufacturer:'AeroVironment'},
    ['스위치블레이드300','자폭드론','배낭','우크라이나'],['AeroVironment','USARMY'],
    undefined,'https://en.wikipedia.org/wiki/AeroVironment_Switchblade',90),

  w('usa2-u004','AeroVironment 스위치블레이드 600','Switchblade 600 Loitering Munition','UAV','USA','OPERATIONAL','LOW',
    '대전차 자폭드론. 스위치블레이드 300 대형. 대전차 탄두(재블린급). 40분 체공.',
    {speed:'178km/h',range:'40km',payload:'대전차 탄두',firstDeployed:'2022년',manufacturer:'AeroVironment'},
    ['스위치블레이드600','자폭드론','대전차','40분체공'],['AeroVironment','USARMY'],undefined,undefined,88),

  w('usa2-u005','ALTIUS-600 배낭 UAV','ALTIUS-600 Tactical UAV','UAV','USA','OPERATIONAL','LOW',
    '튜브 발사 다목적 전술UAV. 정찰·재밍·공격 임무 변환. 4시간 체공. 특수전 운용.',
    {speed:'150km/h',range:'440km',firstDeployed:'2021년',manufacturer:'ANDURIL Industries'},
    ['ALTIUS-600','튜브발사','다목적UAV','특수전'],['ANDURIL','USSOCOM'],undefined,undefined,82),

  // ── 지상전투지원 ─────────────────────────────────────────────────────────
  w('usa2-g001','허마 아크틱카트 LTATV','Humvee LTATV Polaris DAGOR','GROUND','USA','OPERATIONAL','LOW',
    '공수 가능 소형 전술차량. UH-60 내부 수송. 특수전·정찰 임무.',
    {weight:'1.7t',crew:'3~9명',speed:'128km/h',firstDeployed:'2016년',manufacturer:'Polaris'},
    ['DAGOR','LTATV','소형전술차','공수'],['Polaris','USSOCOM'],undefined,undefined,85),

  w('usa2-g002','JLTV 통합경전술차량','JLTV Joint Light Tactical Vehicle','GROUND','USA','OPERATIONAL','LOW',
    'HMMWV 험비 대체. 장갑강화·IED 방호. 험비 대비 2.5배 보호. CROWS-J 원격무장 탑재.',
    {weight:'6.4t',crew:'2+4명',speed:'110km/h',armament:'CROWS-J (7.62mm~40mm)',firstDeployed:'2016년',manufacturer:'Oshkosh Defense',quantity:'50,000대(목표)'},
    ['JLTV','험비대체','장갑','IED방호','Oshkosh'],['Oshkosh','USARMY','USMC'],
    undefined,'https://en.wikipedia.org/wiki/Joint_Light_Tactical_Vehicle',93),

  w('usa2-g003','HMMWV 험비 (M1151)','M1151 HMMWV Humvee','GROUND','USA','OPERATIONAL','LOW',
    '고기동 다목적 차량. 280,000대+ 생산. 280개 파생형. M2HB·TOW·재블린 탑재형.',
    {weight:'4.4t',crew:'1+4명',speed:'113km/h',armament:'M2HB 또는 Mk19',firstDeployed:'1984년',manufacturer:'AM General',quantity:'280,000+대'},
    ['HMMWV','험비','다목적차량','M1151'],['AM General','USARMY'],
    undefined,'https://en.wikipedia.org/wiki/Humvee',95),

  w('usa2-g004','M1087A1 FMTV 전술트럭','M1087A1 FMTV Tactical Truck','GROUND','USA','OPERATIONAL','LOW',
    '2.5t~10t 중형 전술트럭 계열. 표준화 포드 방식. 공병·병참·포병지원.',
    {weight:'5.6t(M1087)',crew:'3명',speed:'100km/h',firstDeployed:'1996년',manufacturer:'Oshkosh'},
    ['FMTV','전술트럭','병참','공병지원'],['Oshkosh','USARMY'],undefined,undefined,85),

  w('usa2-g005','M88A2 구난전차','M88A2 Hercules ARV','GROUND','USA','OPERATIONAL','LOW',
    'M1 에이브람스 구난 전용. 35t 크레인·윈치. 전장 파손 전차 수습. 이라크 전쟁 활약.',
    {weight:'62.4t',crew:'4명',armament:'12.7mm M2HB',firstDeployed:'1997년',manufacturer:'BAE Systems'},
    ['M88A2','구난전차','ARV','에이브람스지원'],['BAE Systems','USARMY'],undefined,'https://en.wikipedia.org/wiki/M88_Recovery_Vehicle',90),

  w('usa2-g006','SMAW 공격·돌파 무반동포','M141 SMAW Bunker Defeat Munition','LAUNCHER','USA','OPERATIONAL','LOW',
    '83mm 2연장 무반동포. 벙커파괴·장갑관통. 해병대 주력. 아프간 동굴 전투 활약.',
    {caliber:'83mm',weight:'7.3kg',range:'500m(로켓)·700m(RSP)',firstDeployed:'1984년',manufacturer:'Talley Defense'},
    ['SMAW','벙커파괴','해병대','83mm','무반동포'],['Talley','USMC'],undefined,'https://en.wikipedia.org/wiki/Shoulder-launched_Multipurpose_Assault_Weapon',88),

]
