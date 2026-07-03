import type { WeaponSystem } from './weapons'
const w = (id:string,name:string,nameEng:string,cat:WeaponSystem['category'],origin:WeaponSystem['origin'],status:WeaponSystem['status'],threat:WeaponSystem['threatRating'],desc:string,specs:WeaponSystem['specs'],tags:string[],sources:string[],img?:string,wiki?:string,conf=90): WeaponSystem=>({id,name,nameEng,category:cat,origin,status,threatRating:threat,description:desc,detail:`## ${nameEng}\n\n${desc}\n\n### 주요 제원\n${Object.entries(specs).filter(([,v])=>v).map(([k,v])=>`- ${k}: ${v}`).join('\n')}`,specs,confidence:conf,lastUpdated:'2026-07-03',relatedIntelIds:[],tags,sources,imageUrl:img,wikiUrl:wiki})

export const WEAPONS_BATCH29_ASIA_OCEANIA: WeaponSystem[] = [

  // ── 호주 무기체계 ─────────────────────────────────────────────────────
  w('ao-aus001','AUKUS 핵잠수함 SSN','AUKUS SSN Nuclear Submarine Australia','SUBMARINE','AUSTRALIA','DEVELOPMENT','HIGH',
    'AUKUS 협정 핵추진 공격잠수함. 미 버지니아급 + 영 아스튜트급 기반. 2030년대 도입.',
    {displacement:'10,000t(추정)',armament:'토마호크·Spearfish어뢰',firstDeployed:'2030년대',manufacturer:'ASC/BAE/제너럴다이나믹스'},
    ['AUKUS','호주핵잠','버지니아급','아스튜트'],['AUKUS파트너십'],
    undefined,undefined,65),

  w('ao-aus002','AS21 레드백 IFV 호주','AS21 Redback IFV Australia Contract','GROUND','ROK','DEVELOPMENT','MED',
    '호주 IFV 경쟁 수주. 한화 AS21 레드백 선정(2023). 129대. $3.3B 계약.',
    {weight:'42t',armament:'30mm Bushmaster II+스파이크LR2',crew:'3+8명',firstDeployed:'2027년(예정)',quantity:'129대',manufacturer:'한화디펜스 호주'},
    ['레드백','호주IFV','한화','129대','$3.3B'],['한화디펜스','호주군'],
    undefined,undefined,90),

  w('ao-aus003','E/F-18F 슈퍼호넷 호주','F/A-18F Super Hornet RAAF','AIRCRAFT','USA','OPERATIONAL','HIGH',
    '호주 슈퍼호넷. F-111 대체. 24기. Wedgetail와 연계 방공.',
    {speed:'마하 1.8',crew:'2명',armament:'JDAM·하푼·AIM-120',firstDeployed:'2010년(호주)',quantity:'24기',manufacturer:'보잉'},
    ['슈퍼호넷','호주','F/A-18F','F-111대체'],['보잉','RAAF'],
    undefined,undefined,88),

  w('ao-aus004','AS-90 호위함 프리깃','Arafura-class OPV Australia Replaced','SHIP','AUSTRALIA','DEVELOPMENT','LOW',
    '아라푸라급 해양순찰함. 2,000t. Mk41 VLS 없음. 8척. 해역감시·국경순찰.',
    {displacement:'1,900t',armament:'57mm 포·SeaCeptor(미정)',crew:'40명',firstDeployed:'2022년(초도)',quantity:'8척',manufacturer:'오스탈'},
    ['아라푸라급','호주OPV','해양순찰','오스탈'],['오스탈','호주해군'],
    undefined,undefined,78),

  w('ao-aus005','Nulka 능동미끼 호주','Nulka Active Missile Decoy Australia','MISSILE','AUSTRALIA','OPERATIONAL','MED',
    '호주 미국 공동 개발 함정 능동미끼. 적 레이더 유인. 이지스함 탑재.',
    {firstDeployed:'2004년',manufacturer:'BAE Systems 호주'},
    ['Nulka','능동미끼','호주','미끼미사일'],['BAE호주','USN'],
    undefined,undefined,78),

  // ── 일본 지상군 추가 ─────────────────────────────────────────────────
  w('ao-jpn001','10식 전차 일본','Type 10 MBT Japan 44t','GROUND','JAPAN','OPERATIONAL','HIGH',
    '일본 4세대 44t 소형 전차. 4세대 복합장갑·C4I 내장·능동 서스펜션. 신칸센 운반 가능.',
    {weight:'44t',armament:'120mm 44구경장 활강포',crew:'3명(자동장전)',speed:'70km/h',firstDeployed:'2012년',quantity:'130여대',manufacturer:'미쓰비시중공업'},
    ['10식전차','일본전차','4세대','44t','신칸센'],['미쓰비시','육상자위대'],
    undefined,'https://en.wikipedia.org/wiki/Type_10',90),

  w('ao-jpn002','89식 보병전투차','Type 89 IFV Japan Mechanized','GROUND','JAPAN','OPERATIONAL','MED',
    '일본 독자 개발 IFV. 35mm+79식 ATGM. 극소량 생산(89대). 비용 과다로 한계.',
    {weight:'26.5t',armament:'35mm KDE+79식ATGM+7.62mm',crew:'3+7명',firstDeployed:'1989년',quantity:'89대',manufacturer:'미쓰비시'},
    ['89식IFV','일본IFV','35mm','79식ATGM','소량생산'],['미쓰비시','육상자위대'],
    undefined,'https://en.wikipedia.org/wiki/Type_89_IFV',82),

  w('ao-jpn003','19식 차륜형자주포','Type 19 Wheeled SPH Japan 155mm','ARTILLERY','JAPAN','OPERATIONAL','LOW',
    '일본 차륜형 155mm 자주포. 도로 기동성 탁월. 26t. 사거리 50km(ER탄).',
    {weight:'25.3t',armament:'155mm/52구경장',crew:'3~4명(자동)',range:'50km(ER탄)',firstDeployed:'2019년',manufacturer:'미쓰비시'},
    ['19식자주포','일본차륜형포','155mm'],['미쓰비시','육상자위대'],
    undefined,undefined,85),

  w('ao-jpn004','12식 개량형 지대함미사일','Type 12 Kai Anti-Ship Missile Extended','MISSILE','JAPAN','DEVELOPMENT','HIGH',
    '12식 지대함 개량형. 사거리 1,000km+. 남서제도 방위. 중국 함정 억제.',
    {range:'1,000km+',firstDeployed:'2026년(목표)',manufacturer:'미쓰비시'},
    ['12식개량','일본대함','1000km','남서제도','중국억제'],['미쓰비시','방위성'],
    undefined,undefined,82),

  w('ao-jpn005','03식 중거리방공미사일','Type 03 Chū-SAM Mid-Range SAM Japan','SAM','JAPAN','OPERATIONAL','HIGH',
    '일본 독자 중거리 지대공. 103km 사거리. 탄도미사일 요격 능력(개량형). J/MPQ-X 레이더.',
    {range:'103km',ceiling:'20km',firstDeployed:'2007년',manufacturer:'미쓰비시·도시바'},
    ['03식SAM','일본방공','중거리지대공','탄도미사일'],['미쓰비시','항공자위대'],
    undefined,'https://en.wikipedia.org/wiki/Type_03_Chū-SAM',85),

  // ── 인도 지상군 추가 ─────────────────────────────────────────────────
  w('ao-ind001','피나카 MLRS 인도','Pinaka MLRS India Guided Extended','MLRS','INDIA','OPERATIONAL','HIGH',
    '인도 독자 MLRS. 유도형 사거리 90km. 신호유도+GPS. 중국·파키스탄 국경 배치.',
    {armament:'214mm 로켓 12발',range:'90km(유도형)',firstDeployed:'2006년(기본)/2020년(유도)',manufacturer:'DRDO·솔라인더스트리'},
    ['피나카','인도MLRS','유도형','90km','중국국경'],['DRDO','인도육군'],
    undefined,'https://en.wikipedia.org/wiki/Pinaka_(rocket)',82),

  w('ao-ind002','ATAGS 진보형 견인포','ATAGS Advanced Towed Artillery Gun India','ARTILLERY','INDIA','DEVELOPMENT','MED',
    '인도 독자 개발 155mm/58구경장 견인곡사포. 사거리 48km. 보포스 대체.',
    {armament:'155mm/58구경장',range:'48km',firstDeployed:'2022년(시험)',manufacturer:'DRDO·Bharat Forge'},
    ['ATAGS','인도견인포','155mm','보포스대체'],['DRDO','Bharat Forge'],
    undefined,undefined,75),

  w('ao-ind003','BMP-2 사라스 인도','BMP-2 Sarath IFV India License','GROUND','RUSSIA','OPERATIONAL','MED',
    '인도 BMP-2 면허생산. 사라스. 2,400대. 파키스탄·중국 국경 배치. 지속 개량.',
    {weight:'14.3t',armament:'30mm 2A42+AT-4',crew:'3+7명',firstDeployed:'1987년(인도)',quantity:'2,400대',manufacturer:'OFB'},
    ['BMP-2','사라스','인도IFV','면허생산'],['OFB','인도육군'],
    undefined,undefined,82),

  w('ao-ind004','LCH 프라찬다 공격헬기','LCH Prachanda Light Combat Helicopter India','HELICOPTER','INDIA','OPERATIONAL','MED',
    '인도 독자 개발 경공격헬기. 고고도 작전(5,000m). 20mm Nexter 기관포·70mm 로켓.',
    {speed:'268km/h',crew:'2명',armament:'20mm THL-20·70mm 로켓',firstDeployed:'2022년',manufacturer:'HAL'},
    ['LCH','프라찬다','인도공격헬기','HAL','고고도'],['HAL','IAF·인도육군'],
    undefined,undefined,80),

  // ── 대만 무기 추가 ─────────────────────────────────────────────────────
  w('ao-twn001','웅펑-III 초음속대함미사일','Hsiung Feng III Supersonic Anti-Ship Missile','MISSILE','TAIWAN','OPERATIONAL','HIGH',
    '대만 독자 초음속 대함미사일. 마하 2+. 수상함·잠수함·지상 발사. 중국 함대 대응 핵심.',
    {speed:'마하 2+',range:'400km+(추정)',payload:'180kg',firstDeployed:'2012년',manufacturer:'중산과학연구원'},
    ['웅펑III','대만대함','초음속','마하2','중국억제'],['중산과학연구원','대만해군'],
    undefined,'https://en.wikipedia.org/wiki/Hsiung_Feng_III',80),

  w('ao-twn002','티엔궁-III 방공미사일','Tien Kung III Sky Bow III Taiwan SAM','SAM','TAIWAN','OPERATIONAL','HIGH',
    '대만 독자 중장거리 방공. 사거리 200km+. 능동레이더 유도. 중국 탄도미사일 요격.',
    {range:'200km+',ceiling:'30km',firstDeployed:'2003년(III)',manufacturer:'중산과학연구원'},
    ['티엔궁III','대만방공','200km','탄도미사일요격'],['중산과학연구원','대만공군'],
    undefined,'https://en.wikipedia.org/wiki/Sky_Bow_III',80),

  w('ao-twn003','CM-34 30mm 보병전투차','CM-34 30mm IFV Taiwan','GROUND','TAIWAN','OPERATIONAL','MED',
    '대만 독자 30mm 보병전투차. CM-32 기반. 30mm Mk44 부슈마스터. 2022년부터 배치.',
    {weight:'21t',armament:'30mm Mk44 Bushmaster',crew:'3+9명',firstDeployed:'2022년',manufacturer:'CSIST'},
    ['CM-34','대만IFV','30mm','부슈마스터'],['CSIST','대만육군'],
    undefined,undefined,80),

  w('ao-twn004','AH-64E 아파치 대만','AH-64E Apache Guardian Taiwan Army','HELICOPTER','USA','OPERATIONAL','HIGH',
    '대만 육군 아파치 E형. 30기. 반둥 상륙 저지 핵심. 헬파이어·하이드라.',
    {speed:'293km/h',crew:'2명',armament:'30mm M230·헬파이어',firstDeployed:'2014년(대만)',quantity:'30기',manufacturer:'보잉'},
    ['아파치E','대만','30기','헬파이어','반둥저지'],['보잉','대만육군'],
    undefined,undefined,88),

  // ── 싱가포르 무기 ─────────────────────────────────────────────────────
  w('ao-sgp001','F-35B 싱가포르','F-35B STOVL Singapore Air Force','AIRCRAFT','USA','DEVELOPMENT','HIGH',
    '싱가포르 F-35B 선정. 12기 계약. 구형 F-16C 대체. 2030년 도입.',
    {speed:'마하 1.6',crew:'1명',armament:'AIM-120D·GBU-12',firstDeployed:'2030년(예정)',quantity:'12기',manufacturer:'록히드마틴'},
    ['F-35B','싱가포르','STOVL','F-16대체'],['록히드마틴','싱가포르공군'],
    undefined,undefined,85),

  w('ao-sgp002','레오파르트 2SG 싱가포르','Leopard 2SG Singapore Army Tank','GROUND','GERMANY','OPERATIONAL','HIGH',
    '싱가포르 레오파르트 2SG. 제한된 도시환경 최적화. 디지털화·ISAF 배치 경험.',
    {weight:'62t',armament:'120mm L55',crew:'4명',firstDeployed:'2007년',quantity:'96대',manufacturer:'KNDS'},
    ['레오파르트2SG','싱가포르전차','도시전','96대'],['KNDS','싱가포르육군'],
    undefined,undefined,85),

  // ── 태국 무기 ─────────────────────────────────────────────────────────
  w('ao-tha001','VT-4 전차 태국','VT-4 MBT Thailand Chinese Import','GROUND','CHINA','OPERATIONAL','MED',
    '태국 VT-4 전차 중국 수입. 49대. 125mm+FY-II ERA+능동방호. 성능 논란.',
    {weight:'52t',armament:'125mm ZPT-98A+ATGM',crew:'3명',firstDeployed:'2018년(태국)',quantity:'49대',manufacturer:'NORINCO'},
    ['VT-4','태국전차','중국수입','125mm'],['NORINCO','태국육군'],
    undefined,'https://en.wikipedia.org/wiki/VT-4',75),

  w('ao-tha002','그리펜 C/D 태국','JAS 39C/D Gripen Thailand Air Force','AIRCRAFT','SWEDEN','OPERATIONAL','MED',
    '태국 그리펜 12기. AIM-120·Derby·Derby ER. 중간 규모 공군 현대화.',
    {speed:'마하 2.0',crew:'1명(C)/2명(D)',armament:'AIM-120·Derby·Rb.74',firstDeployed:'2011년(태국)',quantity:'12기',manufacturer:'사브'},
    ['그리펜','태국','12기','AIM-120'],['사브','태국공군'],
    undefined,undefined,82),

  // ── 말레이시아 무기 ─────────────────────────────────────────────────
  w('ao-mys001','PT-91M 전차 말레이시아','PT-91M Pendekar MBT Malaysia','GROUND','POLAND','OPERATIONAL','MED',
    '폴란드 PT-91 말레이시아 수출형. 48대. 125mm·동야간. 동남아 최강 전차 중 하나.',
    {weight:'47t',armament:'125mm 2A46M-1+ERA Erawa-2',crew:'3명',firstDeployed:'2010년(말레이시아)',quantity:'48대',manufacturer:'부마르-워브르진'},
    ['PT-91M','펜데카르','말레이시아전차','폴란드수출'],['부마르','말레이시아육군'],
    undefined,'https://en.wikipedia.org/wiki/PT-91',80),

  w('ao-mys002','Su-30MKM 말레이시아','Su-30MKM Flanker Malaysia Air Force','AIRCRAFT','RUSSIA','OPERATIONAL','HIGH',
    '말레이시아 Su-30MKM. 18기. R-77·Kh-31A·KAB-500T. 인도·알제리형과 유사.',
    {speed:'마하 2.0',crew:'2명',armament:'R-77·Kh-31A·R-73',firstDeployed:'2007년(말레이시아)',quantity:'18기',manufacturer:'수호이'},
    ['Su-30MKM','말레이시아','Flanker','R-77'],['수호이','말레이시아공군'],
    undefined,undefined,82),

  // ── 인도네시아 무기 추가 ─────────────────────────────────────────────
  w('ao-idn001','레오파르트 2A4 인도네시아','Leopard 2A4 Indonesia Army Tank','GROUND','GERMANY','OPERATIONAL','HIGH',
    '인도네시아 레오파르트 2A4. 43대+A4 더치형. 독일·네덜란드 재수출.',
    {weight:'55.2t',armament:'120mm L44 활강포',crew:'4명',firstDeployed:'2013년(인도네시아)',quantity:'61대',manufacturer:'KNDS·FNSS'},
    ['레오파르트2A4','인도네시아전차','독일수출'],['KNDS','인도네시아육군'],
    undefined,undefined,82),

  w('ao-idn002','KF-21 인도네시아 분담금','KF-21 Indonesia Partner Payment Dispute','AIRCRAFT','ROK','DEVELOPMENT','MED',
    '인도네시아 KF-21 공동개발 분담금 지연 문제. 20% 분담 미납. 협상 진행 중.',
    {firstDeployed:'2030년대(인도네시아)',manufacturer:'KAI'},
    ['KF-21','인도네시아','분담금','협상'],['KAI','방위사업청'],
    undefined,undefined,55),

  w('ao-idn003','PINDAD 아나오아 IFV 인니','PINDAD Anoa APC Indonesia','GROUND','INDONESIA','OPERATIONAL','LOW',
    '인도네시아 독자 개발 APC. PINDAD. 6×6. 12.7mm. 동남아 자국 방산 대표',
    {weight:'14.4t',armament:'12.7mm M2HB',crew:'3+10명',speed:'90km/h',firstDeployed:'2009년',manufacturer:'PT PINDAD'},
    ['아나오아','인도네시아APC','PINDAD','6x6'],['PT PINDAD','인도네시아군'],
    undefined,'https://en.wikipedia.org/wiki/Anoa_(APC)',78),

  // ── 북한 추가 무기 ─────────────────────────────────────────────────────
  w('ao-dprk001','KN-23 북한 단거리탄도','KN-23 Hwasong-11Ga SRBM DPRK','MISSILE','DPRK','OPERATIONAL','CRITICAL',
    '북한 이스칸데르형 SRBM. 저고도 풀업 기동. PAC-3 회피 설계. 러시아 공급 의혹.',
    {range:'600km',payload:'500kg+',speed:'마하 7+',firstDeployed:'2019년',manufacturer:'북한 제2경제위원회'},
    ['KN-23','북한이스칸데르','화성11','풀업기동','러시아공급'],['38North','CSIS','IISS'],
    undefined,undefined,82),

  w('ao-dprk002','화성-18 고체ICBM','Hwasong-18 Solid-Fuel ICBM DPRK','MISSILE','DPRK','OPERATIONAL','CRITICAL',
    '북한 최초 고체추진 ICBM. 발사 준비 시간 단축. 이동발사대. 미국 본토 타격 가능.',
    {range:'15,000km+(추정)',payload:'핵탄두',propulsion:'고체 3단',firstDeployed:'2023년(시험)',manufacturer:'북한 제2경제위원회'},
    ['화성18','북한고체ICBM','이동발사','핵','미국타격'],['북한TV','38North'],
    undefined,undefined,72),

  w('ao-dprk003','북한 포병 자주포 170mm','M-1978 Koksan 170mm SPH DPRK','ARTILLERY','DPRK','OPERATIONAL','HIGH',
    '북한 170mm 자주포. 세계 최장 비유도 자주포. 60km. 수도권 사정권.',
    {weight:'47t',armament:'170mm M-46형 포',crew:'6명',range:'60km',firstDeployed:'1978년',manufacturer:'북한 군수공업'},
    ['M-1978','Koksan','170mm','북한자주포','수도권위협'],['북한','38North'],
    undefined,'https://en.wikipedia.org/wiki/M1978_Koksan',78),

  w('ao-dprk004','북한 600mm 초대형방사포','KN-25 600mm Super-Large MLRS DPRK','MLRS','DPRK','OPERATIONAL','CRITICAL',
    '북한 600mm 초대형 방사포. 핵탄두 탑재 가능. 사거리 380km+. 러시아 공급.',
    {armament:'600mm 방사포',range:'380km+',firstDeployed:'2019년',manufacturer:'북한 군수공업'},
    ['KN-25','600mm','초대형방사포','북한','러시아공급','핵'],['38North','CSIS'],
    undefined,undefined,78),

  w('ao-dprk005','비대칭 잠수함 소형 특수전용','DPRK Midget Submarine SOF Infiltration','SUBMARINE','DPRK','OPERATIONAL','HIGH',
    '북한 소형잠수함. 특수전 침투·기뢰부설. 1997년 강릉 좌초 사례. 30여척 운용.',
    {displacement:'130t(추정)',armament:'어뢰·기뢰·침투요원',firstDeployed:'1970년대',quantity:'30척+'},
    ['북한소형잠수함','특수전침투','기뢰','강릉사건'],['국방부','합참'],
    undefined,undefined,75),

  // ── 중앙아시아·기타 ─────────────────────────────────────────────────
  w('ao-kaz001','Su-30SM 카자흐스탄','Su-30SM Kazakhstan Air Force','AIRCRAFT','RUSSIA','OPERATIONAL','MED',
    '카자흐스탄 Su-30SM. 12기. CSTO 회원. 러시아 장비 주력.',
    {speed:'마하 2.0',crew:'2명',armament:'R-77·R-73·Kh-31',firstDeployed:'2015년(카자흐스탄)',quantity:'12기',manufacturer:'수호이'},
    ['Su-30SM','카자흐스탄','CSTO','러시아장비'],['수호이','카자흐스탄공군'],
    undefined,undefined,78),

  w('ao-azb001','바이락타르 TB2 아제르바이잔','Bayraktar TB2 Azerbaijan Nagorno-Karabakh','UAV','TURKEY','OPERATIONAL','HIGH',
    '아제르바이잔 TB2. 나고르노-카라바흐 전쟁 핵심. 아르메니아 방공·지상군 제압.',
    {ceiling:'7.5km',armament:'MAM-L×4·MAM-C',firstDeployed:'2020년(카라바흐)',manufacturer:'바이카르'},
    ['TB2','바이락타르','아제르바이잔','카라바흐','터키드론'],['바이카르','아제르바이잔군'],
    undefined,'https://en.wikipedia.org/wiki/Bayraktar_TB2',90),

  w('ao-uzb001','BMP-2 우즈베키스탄','BMP-2 Uzbekistan Upgraded Soviet Stock','GROUND','RUSSIA','OPERATIONAL','LOW',
    '우즈베키스탄 구소련 BMP-2 재고. 상당수 보관. 일부 현대화 작업.',
    {weight:'14.3t',armament:'30mm 2A42',firstDeployed:'구소련 시대',quantity:'250여대'},
    ['BMP-2','우즈베키스탄','구소련','중앙아시아'],['우즈베키스탄군'],
    undefined,undefined,65),

  // ── 남태평양 ─────────────────────────────────────────────────────────
  w('ao-png001','P-3K2 뉴질랜드 해초기','P-3K2 Orion New Zealand RNZAF','AIRCRAFT','USA','OPERATIONAL','LOW',
    '뉴질랜드 P-3K2 오라이언. 업그레이드 해초기. P-8A로 교체 예정. 남태평양 감시.',
    {speed:'761km/h',crew:'11명',armament:'MK54 어뢰·하푼',firstDeployed:'2012년(K2)',quantity:'6기',manufacturer:'록히드'},
    ['P-3K2','뉴질랜드','남태평양','해상초계','P-8대체예정'],['록히드','뉴질랜드공군'],
    undefined,undefined,80),

  // ── 대한민국 추가 전력 ──────────────────────────────────────────────
  w('ao-rok001','차기 잠수함(KSS-IV)','KSS-IV Next-Generation SSN-type Korea','SUBMARINE','ROK','DEVELOPMENT','HIGH',
    '한국 차세대 잠수함 KSS-IV. 핵잠 수준 4,000t 이상. 리튬이온·연료전지 하이브리드. 2035년 목표.',
    {displacement:'4,000t+(목표)',firstDeployed:'2035년+',manufacturer:'대우조선/현대중공업'},
    ['KSS-IV','차기잠수함','한국핵잠논의','4000t'],['해군','방위사업청'],
    undefined,undefined,60),

  w('ao-rok002','KDDX 한국형 차기 구축함','KDDX Korean Next Destroyer 8200t','SHIP','ROK','DEVELOPMENT','HIGH',
    '한국 차기 이지스 구축함 KDDX. 8,200t. 능동배열·레이저·레일건 검토. 2030년대 취역.',
    {displacement:'8,200t',armament:'128셀 K-VLS·SM-3·레이저(검토)',firstDeployed:'2030년대',manufacturer:'현대중공업/대우조선'},
    ['KDDX','차기구축함','한국이지스','8200t','레이저'],['해군','방위사업청'],
    undefined,undefined,68),

  w('ao-rok003','국산 경항모(CLIC)','CVX Korean Light Carrier STOVL','SHIP','ROK','DEVELOPMENT','HIGH',
    '한국 경항모 사업. 30,000t. F-35B 20기 탑재. 2036년 취역 목표. 예산 논란 진행 중.',
    {displacement:'30,000t',armament:'F-35B×20·CIWS·VLS',firstDeployed:'2036년(목표)',manufacturer:'HD현대중공업'},
    ['CVX','한국경항모','F-35B','30000t','항모'],['해군','방위사업청'],
    undefined,undefined,60),

  w('ao-rok004','상어급 214형 잠수함','Type 214 Chang Bogo-II Korea AIP Sub','SUBMARINE','ROK','OPERATIONAL','HIGH',
    '한국 209급 후계 214형 AIP 잠수함. 1,800t. 리튬이온 업그레이드. 9척 운용 중.',
    {displacement:'1,830t',armament:'533mm 어뢰관 8문·UGM-84 하푼',crew:'27명',firstDeployed:'2007년',quantity:'9척',manufacturer:'대우조선해양'},
    ['214형','AIP잠수함','장보고II','1830t'],['대우조선','해군'],
    undefined,'https://en.wikipedia.org/wiki/Type_214_submarine',88),

  w('ao-rok005','광개토-III 이지스 구축함','KDX-III Batch II Sejong Class Destroyer','SHIP','ROK','DEVELOPMENT','HIGH',
    '세종대왕함 배치2. 128셀 K-VLS·SM-3 블록IIA. KDDX 이전 중간 전력화.',
    {displacement:'11,000t',armament:'SM-3 블록IIA·SM-2·128셀 K-VLS',crew:'300명',firstDeployed:'2024년(광개토-III Batch2)',manufacturer:'현대중공업'},
    ['광개토III','KDX-III배치2','128셀','SM-3'],['현대중공업','해군'],
    undefined,undefined,85),

]
