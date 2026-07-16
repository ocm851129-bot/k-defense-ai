import type { WeaponSystem } from './weapons'
const w = (id:string,name:string,nameEng:string,cat:WeaponSystem['category'],origin:WeaponSystem['origin'],status:WeaponSystem['status'],threat:WeaponSystem['threatRating'],desc:string,specs:WeaponSystem['specs'],tags:string[],sources:string[],img?:string,wiki?:string,conf=88): WeaponSystem=>({id,name,nameEng,category:cat,origin,status,threatRating:threat,description:desc,detail:`## ${nameEng}\n\n${desc}\n\n### 주요 제원\n${Object.entries(specs).filter(([,v])=>v).map(([k,v])=>`- ${k}: ${v}`).join('\n')}`,specs,confidence:conf,lastUpdated:'2026-07-01',relatedIntelIds:[],tags,sources,imageUrl:img,wikiUrl:wiki})

export const WEAPONS_BATCH9_UAV_MISSILES: WeaponSystem[] = [

  // ── 미국 UAV/드론 ─────────────────────────────────────────────────────────
  w('uav-usa001','MQ-9A 리퍼 공격 UAV','MQ-9A Reaper MALE UCAV','UAV','USA','OPERATIONAL','LOW',
    '미 공군 주력 공격 UAV. 헬파이어 AGM-114R 4발+GBU-12. 아프간·이라크·시리아 광범위 실전.',
    {speed:'482km/h',ceiling:'15,240m',armament:'AGM-114R 헬파이어 4발+GBU-12·GBU-38',firstDeployed:'2007년',manufacturer:'제너럴아토믹스',quantity:'300기+'},
    ['MQ-9','리퍼','공격UAV','헬파이어','아프간'],['제너럴아토믹스','USAF'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/MQ-9_Reaper_taxies.jpg/320px-MQ-9_Reaper_taxies.jpg',
    'https://en.wikipedia.org/wiki/General_Atomics_MQ-9_Reaper',98),

  w('uav-usa002','RQ-4B 글로벌호크','RQ-4B Global Hawk HALE ISR UAV','UAV','USA','OPERATIONAL','LOW',
    '고고도 장기체공 무인정찰기. 42시간 체공. SAR·EO·SIGINT. 한국·NATO·일본 등 수출.',
    {speed:'574km/h',ceiling:'18,288m',armament:'없음(ISR)',firstDeployed:'2001년',manufacturer:'노스롭그루먼',quantity:'45기+'},
    ['RQ-4B','글로벌호크','HALE','ISR','42시간'],['노스롭그루먼','USAF'],
    undefined,'https://en.wikipedia.org/wiki/Northrop_Grumman_RQ-4_Global_Hawk',97),

  w('uav-usa003','MQ-4C 트리톤 해상정찰','MQ-4C Triton BAMS','UAV','USA','OPERATIONAL','LOW',
    '해상 광역 감시·정찰 UAV. P-8 포세이돈 보완. 24시간 광역 해상 감시.',
    {speed:'575km/h',ceiling:'16,764m',armament:'없음(해상ISR)',firstDeployed:'2023년',manufacturer:'노스롭그루먼'},
    ['MQ-4C','트리톤','해상정찰','BAMS','P-8보완'],['노스롭그루먼','미해군'],
    undefined,'https://en.wikipedia.org/wiki/Northrop_Grumman_MQ-4C_Triton',90),

  w('uav-usa004','RQ-170 센티넬 스텔스 UAV','RQ-170 Sentinel Stealth UAV','UAV','USA','OPERATIONAL','LOW',
    '스텔스 고고도 정찰UAV. 빈라덴 작전 감시. 이란 추락 사례(2011년). 세부 제원 비밀.',
    {ceiling:'15,240m(추정)',armament:'없음(ISR)',firstDeployed:'2007년(추정)',manufacturer:'록히드 스컹크웍스'},
    ['RQ-170','센티넬','스텔스UAV','빈라덴','비밀'],['록히드','USAF'],
    undefined,'https://en.wikipedia.org/wiki/Lockheed_Martin_RQ-170_Sentinel',75),

  w('uav-usa005','X-47B 스텔스 UCAV','X-47B Unmanned Combat Air Vehicle','UAV','USA','OPERATIONAL','LOW',
    '노스롭그루먼 항모 발진 스텔스 UCAV. 세계 최초 항모 자율 이착함(2013년). 현재 연구용.',
    {speed:'불명(아음속)',ceiling:'12,190m(추정)',armament:'내부무장창 2개',firstDeployed:'2011년(시험)',manufacturer:'노스롭그루먼'},
    ['X-47B','스텔스UCAV','항모발진','자율이착함','노스롭'],['노스롭그루먼','미해군'],
    undefined,'https://en.wikipedia.org/wiki/Northrop_Grumman_X-47B',80),

  w('uav-usa006','MQ-25 스팅레이 공중급유기','MQ-25 Stingray Carrier-based Tanker UAV','UAV','USA','DEVELOPMENT','LOW',
    '미 해군 항모 탑재 무인급유기. F/A-18·F-35C·EA-18G 공중급유. 2025년 전력화 예정.',
    {speed:'불명',armament:'없음(급유)',firstDeployed:'2025년(예상)',manufacturer:'보잉'},
    ['MQ-25','스팅레이','무인급유','항모','F-35C급유'],['보잉','미해군'],
    undefined,'https://en.wikipedia.org/wiki/Boeing_MQ-25_Stingray',78),

  w('uav-usa007','Anduril 발키리 XQ-58A','XQ-58A Valkyrie Loyal Wingman UAV','UAV','USA','DEVELOPMENT','LOW',
    '저비용 충성 윙맨 UAV. F-35와 협동비행 시험. SDB·AIM-120 내부 탑재. 재사용·소모형.',
    {speed:'마하 0.85',ceiling:'13,716m',armament:'SDB·AIM-120(내부)',firstDeployed:'2019년(시험)',manufacturer:'크레이토스'},
    ['XQ-58A','발키리','충성윙맨','F-35협동','저비용'],['크레이토스','USAF'],
    undefined,'https://en.wikipedia.org/wiki/Kratos_XQ-58_Valkyrie',78),

  w('uav-usa008','AeroVironment 워스피','AeroVironment Wasp AE Nano UAV','UAV','USA','OPERATIONAL','LOW',
    '소형 배낭 소지 나노UAV. 27g·항속 40km. 분대급 즉각 정찰.',
    {speed:'30km/h',range:'5km',armament:'없음(정찰)',firstDeployed:'2010년대',manufacturer:'AeroVironment'},
    ['WASP','나노드론','분대급','소형UAV'],['AeroVironment','USSOCOM'],undefined,undefined,80),

  // ── 중국 UAV ──────────────────────────────────────────────────────────────
  w('uav-chn001','CH-5 레인보우 공격UAV','CH-5 Rainbow Attack UAV','UAV','CHINA','OPERATIONAL','HIGH',
    'CH-4 상위형. 탑재량 1t. AR-2·레이저폭탄·C-705K. MQ-9급 중국 UCAV.',
    {speed:'300km/h',ceiling:'10,000m',armament:'AR-2·레이저유도폭탄·C-705K',firstDeployed:'2015년',manufacturer:'CASC'},
    ['CH-5','레인보우','공격UAV','MQ-9급','중국'],['CASC','중국군'],
    undefined,'https://en.wikipedia.org/wiki/CASC_Rainbow_5',80),

  w('uav-chn002','AVIC 윙룽 II','Wing Loong II (Pterodactyl II) Attack UAV','UAV','CHINA','OPERATIONAL','HIGH',
    'AVIC 익룡 II 공격UAV. UAE·이집트·파키스탄 수출. 12발 무장. MQ-9 대응.',
    {speed:'370km/h',ceiling:'9,000m',armament:'AR-1·AR-2·YJ·레이저폭탄 최대12발',firstDeployed:'2017년',manufacturer:'AVIC'},
    ['윙룽II','익룡II','공격UAV','수출','중국'],['AVIC','수출국'],
    undefined,'https://en.wikipedia.org/wiki/AVIC_Wing_Loong_II',80),

  // ── 이스라엘 UAV ──────────────────────────────────────────────────────────
  w('uav-isr001','헤르메스 900 ISR UAV','Hermes 900 Medium Altitude UAV','UAV','ISRAEL','OPERATIONAL','LOW',
    '엘비트 중고도 정찰UAV. 36시간 체공. EO/IR·SAR·COMINT. 브라질·칠레·멕시코 수출.',
    {speed:'220km/h',ceiling:'9,144m',armament:'없음(ISR)',firstDeployed:'2012년',manufacturer:'엘비트 시스템'},
    ['헤르메스900','엘비트','ISR UAV','36시간','수출'],['엘비트','이스라엘군'],
    undefined,'https://en.wikipedia.org/wiki/Elbit_Hermes_900',88),

  w('uav-isr002','하롭 SEAD 자폭드론','Harop SEAD/DEAD Loitering Munition','UAV','ISRAEL','OPERATIONAL','HIGH',
    'IAI 하롭. 레이더 방사 탐색 후 자폭. SEAD 임무. 아제르바이잔 2020 카라바흐 전쟁 실전.',
    {speed:'250km/h',ceiling:'5,000m',payload:'23kg HEAT',armament:'반레이더 자폭',firstDeployed:'2010년대',manufacturer:'IAI'},
    ['하롭','SEAD','자폭드론','카라바흐','반레이더'],['IAI','이스라엘군'],
    undefined,'https://en.wikipedia.org/wiki/IAI_Harop',88),

  // ── 이란 UAV ──────────────────────────────────────────────────────────────
  w('uav-irn001','샤헤드-136 자폭드론','HESA Shahed-136 Loitering Munition','UAV','IRAN','OPERATIONAL','HIGH',
    '삼각날개 자폭드론. 러시아 우크라이나 전쟁 대량 공급. 사거리 2,500km. 저비용 공중타격.',
    {speed:'185km/h',range:'2,500km',payload:'50kg HE',firstDeployed:'2021년',manufacturer:'HESA'},
    ['샤헤드136','이란드론','우크라이나공급','자폭','삼각날개'],['HESA','러시아군'],
    undefined,'https://en.wikipedia.org/wiki/HESA_Shahed_136',90),

  w('uav-irn002','아바빌-3 무장 UAV','Ababil-3 Armed UAV','UAV','IRAN','OPERATIONAL','HIGH',
    '이란 무장 전술UAV. 예멘 후티·헤즈볼라 공급. 500kg 탑재. 대함·지상 타격.',
    {speed:'290km/h',ceiling:'4,500m',armament:'500kg 폭탄 또는 공대지',firstDeployed:'2010년대',manufacturer:'HESA'},
    ['아바빌3','이란','예멘후티','헤즈볼라','무장드론'],['HESA','후티','헤즈볼라'],
    undefined,'https://en.wikipedia.org/wiki/HESA_Ababil',78),

  // ── 미사일 모음 (글로벌) ─────────────────────────────────────────────────
  w('mis-usa001','BGM-109 토마호크 블록 V','BGM-109 Tomahawk Block V Land-Attack Cruise Missile','CRUISE','USA','OPERATIONAL','LOW',
    '미 해군 표준 SLCM. 블록 V: MARITIME(대함)+JMEWS 관통탄두 옵션. 1,600km 사거리.',
    {range:'1,600km',speed:'마하 0.73',payload:'450kg HE 또는 JMEWS',guidance:'INS+TERCOM+GPS+EO',firstDeployed:'2021년(BlkV)',manufacturer:'레이시온'},
    ['토마호크','블록V','SLCM','1600km','대함겸용'],['레이시온','미해군'],
    undefined,'https://en.wikipedia.org/wiki/Tomahawk_(missile)',99),

  w('mis-usa002','LRASM 장거리 대함순항','AGM-158C LRASM Anti-Ship Missile','ASM','USA','OPERATIONAL','LOW',
    'JASSM 기반 장거리 스텔스 대함미사일. 370km+. 자율표적선택. F/A-18·B-1B·F-35 탑재.',
    {range:'370km+',speed:'마하 0.8',payload:'450kg PBXN',guidance:'INS+GPS+IIR+AI 자율표적',firstDeployed:'2019년',manufacturer:'록히드마틴'},
    ['LRASM','AGM-158C','스텔스대함','자율표적','F-35'],['록히드마틴','미해군'],
    undefined,'https://en.wikipedia.org/wiki/AGM-158C_LRASM',92),

  w('mis-usa003','JASSM-ER 공대지 순항','AGM-158B JASSM-ER','CRUISE','USA','OPERATIONAL','LOW',
    '저피탐 공대지 순항미사일 연장형. 1,000km. F-35·F-15·B-2·B-52 탑재. 우크라이나 F-16 논의.',
    {range:'1,000km',speed:'마하 0.75',payload:'454kg 관통·파편탄두',guidance:'INS+GPS+IIR',firstDeployed:'2014년',manufacturer:'록히드마틴'},
    ['JASSM-ER','AGM-158B','1000km','스텔스','저피탐'],['록히드마틴','USAF'],
    undefined,'https://en.wikipedia.org/wiki/AGM-158_JASSM',97),

  w('mis-usa004','하이드라 70 로켓','Hydra 70 FFAR Unguided Rocket','ASM','USA','OPERATIONAL','LOW',
    '70mm 접이식 핀 항공로켓. 헬기·UH-60·AH-64 탑재. 다수 탄두 선택(HEAT·파편·연막).',
    {caliber:'70mm',range:'8km',firstDeployed:'1950년대',manufacturer:'레이시온·General Dynamics'},
    ['하이드라70','FFAR','70mm로켓','헬기탑재'],['미군','NATO'],
    undefined,'https://en.wikipedia.org/wiki/Hydra_70',88),

  w('mis-usa005','GBU-39/B SDB 소형직격탄','GBU-39/B Small Diameter Bomb','ASM','USA','OPERATIONAL','LOW',
    '소형 정밀유도폭탄. 110kg. F-35 내부 8발 탑재. GPS+INS. 사거리 110km(활공).',
    {range:'110km',payload:'93kg 관통탄두',guidance:'GPS+INS',firstDeployed:'2006년',manufacturer:'보잉'},
    ['GBU-39','SDB','소형폭탄','F-35내부','110km'],['보잉','USAF'],
    undefined,'https://en.wikipedia.org/wiki/GBU-39_Small_Diameter_Bomb',95),

  w('mis-usa006','GBU-57A/B MOP 지하벙커파괴','GBU-57A/B Massive Ordnance Penetrator','ASM','USA','OPERATIONAL','LOW',
    '13.6t 초대형 지하시설 관통폭탄. 60m 지하 콘크리트 관통. B-2 전용. 이란 핵시설 타격 목적.',
    {range:'없음(자유낙하)',payload:'13,600kg(2,400kg 폭발물)',guidance:'GPS+INS',firstDeployed:'2012년',manufacturer:'보잉'},
    ['GBU-57','MOP','지하벙커파괴','13.6t','이란핵'],['보잉','USAF'],
    undefined,'https://en.wikipedia.org/wiki/GBU-57_Massive_Ordnance_Penetrator',90),

  w('mis-usa007','AGM-65 매버릭','AGM-65D/G Maverick AGM','ASM','USA','OPERATIONAL','LOW',
    '다목적 공대지 미사일. TV·IR·레이저 버전. 전차·벙커·함정. 1972년부터 현역. 세계 30국 운용.',
    {range:'25km',payload:'57·136kg HE·SAP',guidance:'TV 또는 IIR 또는 레이저',firstDeployed:'1972년',manufacturer:'레이시온'},
    ['매버릭','AGM-65','다목적공대지','TV유도','세계30국'],['레이시온','USAF'],
    undefined,'https://en.wikipedia.org/wiki/AGM-65_Maverick',93),

  w('mis-usa008','AIM-9X 블록 II 사이드와인더','AIM-9X Block II Sidewinder AAM','AAM','USA','OPERATIONAL','LOW',
    '단거리 공대공미사일 최신형. 오프보어사이트 90°+. 잠금 전 발사(LOAL). 조종사 헬멧지시.',
    {range:'35km',speed:'마하 3+',guidance:'IR 영상 탐색기',firstDeployed:'2015년(Blk II)',manufacturer:'레이시온'},
    ['AIM-9X','사이드와인더','HOBS','오프보어사이트','IR'],['레이시온','미공군'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/AIM_9L_Sidewinder_%28modified%29_copy.jpg/330px-AIM_9L_Sidewinder_%28modified%29_copy.jpg','https://en.wikipedia.org/wiki/AIM-9_Sidewinder',97),

  w('mis-usa009','AIM-120D 암람','AIM-120D AMRAAM Active Radar AAM','AAM','USA','OPERATIONAL','LOW',
    'AIM-120 최신형. 사거리 180km. 데이터링크·능동레이더. 세계 표준 BVRAAM. F-35 내부 탑재.',
    {range:'180km',speed:'마하 4',guidance:'INS+데이터링크+능동레이더',firstDeployed:'2014년(D)',manufacturer:'레이시온',quantity:'세계 40국+ 운용'},
    ['AIM-120D','암람','BVRAAM','180km','세계표준'],['레이시온','미공군'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/20180328_AIM-120_Udvar-Hazy.jpg/330px-20180328_AIM-120_Udvar-Hazy.jpg','https://en.wikipedia.org/wiki/AIM-120_AMRAAM',99),

  w('mis-nato001','MICA-NG 공대공','MICA-NG New Generation AAM','AAM','NATO','DEVELOPMENT','LOW',
    'MBDA MICA 후속. 이중모드(능동레이더+IIR) 탐색기. 라팔·타이푼 탑재 예정. 2026년 서비스.',
    {range:'80km',speed:'마하 4',guidance:'능동레이더+IIR 듀얼',firstDeployed:'2026년(예상)',manufacturer:'MBDA'},
    ['MICA-NG','차세대공대공','MBDA','라팔','타이푼'],['MBDA'],
    undefined,'https://en.wikipedia.org/wiki/MBDA_MICA',78),

  // ── 대함 미사일 모음 ─────────────────────────────────────────────────────
  w('mis-multi001','하푼 블록 II+ ER','AGM-84N Harpoon Block II+ ER Anti-Ship','SSM','USA','OPERATIONAL','LOW',
    '하푼 사거리 연장형. 270km. GPS+능동레이더. F/A-18·P-8·함정·지상 발사.',
    {range:'270km',speed:'마하 0.75',payload:'222kg HE',guidance:'GPS+능동레이더',firstDeployed:'2015년',manufacturer:'보잉'},
    ['하푼','블록II+ER','대함미사일','270km','다목적발사'],['보잉','미해군'],
    undefined,'https://en.wikipedia.org/wiki/Harpoon_(missile)',93),

  w('mis-multi002','KEPD-350K 타우러스 (한국)','Taurus KEPD-350K Air-Launched Cruise Missile','CRUISE','NATO','OPERATIONAL','HIGH',
    'F-15K 탑재 KEPD-350 한국형. 500km 사거리. BROACH 탄두. 지하벙커 관통. 2016년 전력화.',
    {range:'500km',speed:'마하 0.95',payload:'BROACH 관통탄두',firstDeployed:'2016년',manufacturer:'MBDA 독일·스페인'},
    ['타우러스','KEPD-350K','F-15K','500km','한국운용'],['MBDA','한국공군'],
    undefined,'https://en.wikipedia.org/wiki/Taurus_KEPD_350',95),

  w('mis-multi003','RIM-162 ESSM','RIM-162 ESSM Block 2 Evolved Sea Sparrow','SAM','NATO','OPERATIONAL','LOW',
    '함정용 발전형 씨스패로우. 쿼드팩 VLS 탑재. 50km 사거리. 대함미사일·드론 방어.',
    {range:'50km',speed:'마하 4',guidance:'능동레이더(Blk2)',firstDeployed:'2020년(Blk2)',manufacturer:'레이시온·MBDA'},
    ['ESSM','씨스패로우','함정방공','쿼드팩VLS'],['레이시온','NATO'],
    undefined,'https://en.wikipedia.org/wiki/RIM-162_ESSM',90),

  w('mis-multi004','RIM-116 RAM','RIM-116 Rolling Airframe Missile CIWS','SAM','USA','OPERATIONAL','LOW',
    '함정 근접방어 미사일. 9km. IR+수동레이더 이중유도. 독일·한국·이집트 운용.',
    {range:'9km',speed:'마하 2.0',guidance:'IR+수동레이더',firstDeployed:'1993년',manufacturer:'레이시온·MBDA'},
    ['RAM','RIM-116','함정CIWS','근접방어','한국운용'],['레이시온','MBDA','한국해군'],
    undefined,'https://en.wikipedia.org/wiki/RIM-116_Rolling_Airframe_Missile',92),

  w('mis-multi005','팰렁크스 CIWS','Phalanx Block 1B CIWS','SAM','USA','OPERATIONAL','LOW',
    '20mm 6연장 가틀링 함정방어 CIWS. 분당 4,500발. 포 기반. 한국·일본·영국 등 운용.',
    {caliber:'20mm M168 가틀링',fireRate:'4,500rpm',range:'1,500m',firstDeployed:'1978년',manufacturer:'레이시온'},
    ['팰렁크스','CIWS','20mm','함정방어','가틀링'],['레이시온','미해군','한국해군'],
    undefined,'https://en.wikipedia.org/wiki/Phalanx_CIWS',95),

  // ── 핵·전략 무기 ──────────────────────────────────────────────────────────
  w('nuc-usa001','B61-12 전술핵폭탄','B61-12 Nuclear Gravity Bomb','NUCLEAR','USA','OPERATIONAL','CRITICAL',
    '미 최신 정밀유도 전술핵폭탄. F-35 내부·NATO 공유 F-16 탑재. 핀 부착 GPS 유도. 0.3~50kt 가변.',
    {payload:'0.3~50kt 가변',guidance:'INS+GPS+핀 키트',firstDeployed:'2023년',manufacturer:'텍사스 핵무기연구소'},
    ['B61-12','전술핵','F-35','NATO공유','정밀유도핵'],['DoE','USAF','NATO'],
    undefined,'https://en.wikipedia.org/wiki/B61_nuclear_bomb',90),

  w('nuc-usa002','W76-2 저출력 핵탄두','W76-2 Low-Yield Nuclear Warhead','NUCLEAR','USA','OPERATIONAL','CRITICAL',
    '오하이오급 SSBN 트라이던트 II 탑재 저출력 옵션. 5kt. 러시아 전술핵 대응 억지력.',
    {payload:'~5kt',firstDeployed:'2019년',manufacturer:'산디아국립연구소'},
    ['W76-2','저출력핵','트라이던트','SSBN','전술억지'],['미해군','DoE'],
    undefined,'https://en.wikipedia.org/wiki/W76',80),

  w('nuc-rus001','포세이돈 핵어뢰 (Status-6)','Poseidon (Status-6) Nuclear Torpedo/UUV','NUCLEAR','RUSSIA','DEVELOPMENT','CRITICAL',
    '핵추진 핵탄두 수중드론. 2Mt 탄두. 100m 수심 무제한 사거리. 항모전단·연안도시 타격.',
    {range:'10,000km+(추정)',speed:'185km/h(추정)',payload:'2Mt 핵탄두+방사성 잔류물',firstDeployed:'개발중(2027년+)',manufacturer:'루빈설계국'},
    ['포세이돈','Status-6','핵어뢰','UUV','2Mt'],['러시아해군','CSIS'],
    undefined,'https://en.wikipedia.org/wiki/Status-6_Oceanic_Multipurpose_System',65),

  // ── 위성·우주 ─────────────────────────────────────────────────────────────
  w('sat-usa001','GPS Block IIIA 위성','GPS Block IIIA Navigation Satellite','SATELLITE','USA','OPERATIONAL','LOW',
    'GPS 위성 3세대. 정밀도 3배 향상. M코드 신호 재밍저항. 러시아·중국 위성항법 재밍 대응.',
    {altitude:'20,200km(MEO)',firstDeployed:'2018년(Block IIIA)',manufacturer:'록히드마틴'},
    ['GPS','BlkIIIA','항법위성','M코드','재밍저항'],['록히드마틴','USSF'],
    undefined,'https://en.wikipedia.org/wiki/GPS_Block_IIIA',90),

  w('sat-usa002','AEHF 군사통신위성','AEHF Advanced Extremely High Frequency Satellite','SATELLITE','USA','OPERATIONAL','LOW',
    '미 차세대 EHF 군사통신위성. 핵환경 생존 통신. 핵전쟁 상황에서도 지휘통제 유지.',
    {altitude:'35,786km(GEO)',firstDeployed:'2010년',manufacturer:'록히드마틴',quantity:'6기'},
    ['AEHF','군사통신위성','핵생존','EHF','지휘통제'],['록히드마틴','USSF'],
    undefined,'https://en.wikipedia.org/wiki/Advanced_Extremely_High_Frequency',90),

  w('sat-usa003','SBIRS 조기경보위성','SBIRS Space-Based Infrared System','SATELLITE','USA','OPERATIONAL','LOW',
    '탄도미사일 발사 10초내 탐지. GEO·HEO 궤도. 핵미사일 방어 최전선.',
    {altitude:'GEO+HEO 궤도',firstDeployed:'2011년',manufacturer:'록히드마틴',quantity:'6기+'},
    ['SBIRS','조기경보위성','탄도미사일탐지','10초','핵방어'],['록히드마틴','USSF'],
    undefined,'https://en.wikipedia.org/wiki/Space-Based_Infrared_System',92),

  w('sat-chn001','중국 북두 항법위성 (BeiDou-3)','BeiDou-3 Global Navigation Satellite System','SATELLITE','CHINA','OPERATIONAL','HIGH',
    '중국 독자 위성항법 시스템. 35기 위성. 정밀도 GPS 동등. 군사·민수 이중용도.',
    {altitude:'MEO·GEO·IGSO',firstDeployed:'2020년(글로벌완성)',manufacturer:'CAST',quantity:'35기'},
    ['북두','BeiDou-3','항법위성','GPS대응','이중용도'],['CNSA','중국군'],
    undefined,'https://en.wikipedia.org/wiki/BeiDou',90),

  // ── 레이저·지향성에너지 ──────────────────────────────────────────────────
  w('laser-usa001','HELIOS 해군 레이저 무기','HELIOS High Energy Laser Integrated Optical Dazzler','GROUND','USA','OPERATIONAL','LOW',
    '미 구축함 탑재 60kW 레이저 무기. UAV·소형선박 무력화. 영구 비용 절감. USS 프리블 탑재.',
    {firstDeployed:'2022년',manufacturer:'록히드마틴'},
    ['HELIOS','레이저무기','60kW','드론대응','해군'],['록히드마틴','미해군'],
    undefined,'https://en.wikipedia.org/wiki/HELIOS_(laser_weapon)',85),

  w('laser-usa002','LAWS 해병대 레이저','LAWS Laser Weapon System (USS Ponce)','GROUND','USA','OPERATIONAL','LOW',
    '미 해군 지향성에너지 무기. 30kW. 소형보트·UAV·소형항공기 무력화. 페르시아만 실전.',
    {firstDeployed:'2014년',manufacturer:'레이시온'},
    ['LAWS','레이저무기','30kW','페르시아만','실전'],['레이시온','미해군'],
    undefined,'https://en.wikipedia.org/wiki/Laser_Weapon_System',85),

  w('laser-isr001','아이언 빔 레이저 방공','Iron Beam High Energy Laser','SAM','ISRAEL','OPERATIONAL','HIGH',
    '이스라엘 100kW급 레이저 방공. 드론·로켓·박격포탄 요격. 아이언돔 보완. 2023년 실전배치.',
    {firstDeployed:'2023년',manufacturer:'라파엘·엘비트'},
    ['아이언빔','레이저방공','100kW','드론요격','이스라엘'],['라파엘','엘비트','이스라엘군'],
    undefined,'https://en.wikipedia.org/wiki/Iron_Beam',85),

  // ── 전자전 ────────────────────────────────────────────────────────────────
  w('ew-usa001','EC-130H 컴패스 콜 전자전기','EC-130H Compass Call EW Aircraft','AIRCRAFT','USA','OPERATIONAL','LOW',
    '미 공군 전자전 항공기. 적 통신·레이더·지휘통제 재밍. C-130H 플랫폼. 이라크·아프간 실전.',
    {speed:'643km/h',range:'6,740km',crew:'13명',firstDeployed:'1982년',manufacturer:'록히드·L3Harris'},
    ['EC-130H','컴패스콜','전자전','재밍','C-130'],['L3Harris','USAF'],
    undefined,'https://en.wikipedia.org/wiki/EC-130_Compass_Call',90),

  w('ew-usa002','RC-135V/W 리벳 조인트 SIGINT','RC-135V/W Rivet Joint SIGINT Aircraft','AIRCRAFT','USA','OPERATIONAL','LOW',
    '전략 신호정보 수집 항공기. 전자정보(ELINT)+통신정보(COMINT). 영국·호주도 운용.',
    {speed:'868km/h',range:'14,816km',crew:'27~32명',firstDeployed:'1961년',manufacturer:'보잉·L3Harris'},
    ['RC-135','리벳조인트','SIGINT','정보수집','NATO'],['L3Harris','USAF'],
    undefined,'https://en.wikipedia.org/wiki/Boeing_RC-135',92),

  w('ew-rus001','크라수하-4 전자전 시스템','Krasukha-4 Electronic Warfare System','GROUND','RUSSIA','OPERATIONAL','HIGH',
    '러시아 지상 광대역 재밍 시스템. SAR 위성·AWACS·드론 재밍. 시리아·우크라이나 실전.',
    {range:'300km(재밍)',firstDeployed:'2014년',manufacturer:'KRET'},
    ['크라수하4','전자전','러시아','위성재밍','AWACS재밍'],['KRET','러시아군'],
    undefined,'https://en.wikipedia.org/wiki/Krasukha_(electronic_warfare)',82),

  w('ew-chn001','DZ-9000 광대역 재밍기','DZ-9000 Broadband Jammer','GROUND','CHINA','OPERATIONAL','HIGH',
    '중국 지상 전자전 재밍 시스템. 통신·레이더·GPS 교란. 대만해협 훈련 사용.',
    {range:'200km+(추정)',firstDeployed:'2010년대',manufacturer:'중국국방과기집단'},
    ['DZ-9000','전자전','중국','GPS재밍','대만해협'],['중국군'],
    undefined,undefined,60),

]
