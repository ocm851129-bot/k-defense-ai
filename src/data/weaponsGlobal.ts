// ══════════════════════════════════════════════════════════════════════════════
// 전세계 무기체계 대규모 데이터베이스
// 출처: Wikipedia, GlobalSecurity.org, ODIN WEG, CSIS Missile Threat, SIPRI
// 수집일: 2026-06-27
// ══════════════════════════════════════════════════════════════════════════════
import type { WeaponSystem } from './weapons'

// 공통 유틸: 간단한 WeaponSystem 생성 헬퍼
const w = (
  id: string, name: string, nameEng: string,
  category: WeaponSystem['category'],
  origin: WeaponSystem['origin'],
  status: WeaponSystem['status'],
  threat: WeaponSystem['threatRating'],
  desc: string,
  specs: WeaponSystem['specs'],
  tags: string[],
  sources: string[],
  confidence = 85,
  detail = ''
): WeaponSystem => ({
  id, name, nameEng, category, origin, status, threatRating: threat,
  description: desc,
  detail: detail || `## ${nameEng}\n\n${desc}\n\n### 주요 제원\n${Object.entries(specs).filter(([,v])=>v).map(([k,v])=>`- ${k}: ${v}`).join('\n')}`,
  specs, confidence, lastUpdated:'2026-06-27',
  relatedIntelIds:[], tags, sources,
})

export const WEAPONS_GLOBAL: WeaponSystem[] = [

  // ════════════════════════════════════════════════════════
  // 러시아 — 전차 / 장갑차 (Wikipedia, GlobalSecurity)
  // ════════════════════════════════════════════════════════

  w('g-rus-001','T-72B3M 전차','T-72B3M Obr. 2016 MBT','GROUND','RUSSIA','OPERATIONAL','HIGH',
    '러시아 주력 전차. 3세대 개량형. 우크라이나 전쟁에서 대량 손실. 2,000~5,000대 운용 추정.',
    {weight:'46,000kg',length:'9.53m',crew:'3명',propulsion:'V-92S2F 1,130hp 디젤',speed:'72km/h',range:'550km',armament:'2A46M5 125mm 활강포+PKT 7.62mm+NSVT 12.7mm',firstDeployed:'2016년(B3M)',manufacturer:'우랄바곤자보트',quantity:'2,000~5,000대(운용)'},
    ['T-72','러시아','전차','우크라이나전쟁'],['Wikipedia','IISS'],90),

  w('g-rus-002','T-80BVM 전차','T-80BVM MBT','GROUND','RUSSIA','OPERATIONAL','HIGH',
    '가스터빈 엔진 주력전차. 콘탁트-5 ERA 장착. 북한·파키스탄에도 수출.',
    {weight:'46,000kg',crew:'3명',propulsion:'GTD-1250G 가스터빈 1,250hp',speed:'80km/h',range:'440km',armament:'2A46M-4 125mm+Reflex-M ATGM',firstDeployed:'1985년(T-80U)/2017년(BVM)',manufacturer:'옴스크전차공장',quantity:'~3,000대'},
    ['T-80','러시아','가스터빈전차'],['Wikipedia'],85),

  w('g-rus-003','T-90M 프로리프 전차','T-90M Proryv-3 MBT','GROUND','RUSSIA','OPERATIONAL','HIGH',
    '러시아 최신 생산 전차. 칼리나 열화상+Relikt ERA+자동장전. 인도·알제리 수출.',
    {weight:'48,000kg',crew:'3명',propulsion:'V-92S2F2 1,130hp',speed:'72km/h',armament:'2A46M-5 125mm+Kornet ATGM+Relikt ERA',firstDeployed:'2021년',manufacturer:'우랄바곤자보트',quantity:'600+대(T-90M)'},
    ['T-90M','러시아','3.5세대전차'],['Wikipedia','IISS'],88),

  w('g-rus-004','BMP-3 보병전투차','BMP-3 Infantry Fighting Vehicle','GROUND','RUSSIA','OPERATIONAL','HIGH',
    '러시아 주력 보병전투차. 100mm 포+30mm 기관포+3발 ATGM. 수영 가능.',
    {weight:'18,700kg',crew:'3+7명',propulsion:'UTD-29M 500hp 디젤',speed:'70km/h',range:'600km',armament:'2A70 100mm포+2A72 30mm기관포+AT-10 ATGM',firstDeployed:'1987년',manufacturer:'쿠르간마쉬자보트',quantity:'~600대'},
    ['BMP-3','IFV','러시아'],['Wikipedia'],90),

  w('g-rus-005','BMP-2M 보병전투차','BMP-2M IFV','GROUND','RUSSIA','OPERATIONAL','MED',
    'BMP-2 개량형. 바흐차-U 포탑. 30mm 기관포+ATGM. 1,000대 이상 운용.',
    {weight:'14,800kg',crew:'3+7명',armament:'2A42 30mm기관포+AT-5 ATGM',firstDeployed:'1980년(BMP-2)',manufacturer:'쿠르간마쉬자보트',quantity:'1,000+대'},
    ['BMP-2','IFV','러시아'],['Wikipedia'],85),

  w('g-rus-006','2S19M2 므스타-S 자주포','2S19M2 Msta-S 152mm SPH','ARTILLERY','RUSSIA','OPERATIONAL','HIGH',
    '러시아 주력 152mm 자주곡사포. 분당 8발. GPS/GLONASS 유도. 450대 운용.',
    {weight:'43,240kg',crew:'5명',armament:'2A64 152mm 곡사포',speed:'60km/h',range:'500km',propulsion:'V-84A 840hp',firstDeployed:'1989년(Msta)/2006년(M2)',manufacturer:'우랄바곤자보트',quantity:'450+대'},
    ['므스타','자주포','러시아','152mm'],['Wikipedia'],90),

  w('g-rus-007','2S7M 피온 203mm 자주포','2S7M Malka 203mm SPH','ARTILLERY','RUSSIA','OPERATIONAL','HIGH',
    '203mm 대구경 자주포. 사거리 55.5km(로켓보조). 핵포탄 운용 가능. 125대 운용.',
    {weight:'46,500kg',crew:'7명',armament:'2A44 203mm포',range:'55.5km(ERFB)',firstDeployed:'1983년',manufacturer:'키로프스키 자보드',quantity:'125대'},
    ['피온','203mm','자주포','핵포탄'],['Wikipedia'],85),

  w('g-rus-008','TOS-1A 솔른체표크 열압력 발사기','TOS-1A Solntsepyok 220mm Thermobaric MRL','MLRS','RUSSIA','OPERATIONAL','CRITICAL',
    '열압력(연료공기) 무기 탑재 다연장로켓. 도시전·벙커·참호 제거에 특화. 36대 운용.',
    {weight:'44,300kg',crew:'3명',armament:'MO.1.01.04 220mm 열압력탄×24발',range:'6km',firstDeployed:'2001년',manufacturer:'옴스크전송기공장',quantity:'36대'},
    ['TOS-1A','열압력','연료공기폭탄','러시아'],['Wikipedia'],92),

  w('g-rus-009','9K720 이스칸데르-M SRBM','9K720 Iskander-M SRBM System','SRBM','RUSSIA','OPERATIONAL','CRITICAL',
    '러시아 전술미사일 핵심. 사거리 500km·CEP 5~7m·핵재래식양용. 12개 여단 배치.',
    {range:'500km',speed:'마하 6~7',payload:'700~750kg',guidance:'INS+DSMAC+레이더',accuracy:'CEP 5~7m',propulsion:'고체로켓',firstDeployed:'2006년',manufacturer:'KBM 콜롬나'},
    ['이스칸데르','SRBM','러시아','기동탄두','핵'],['Wikipedia','CSIS'],92),

  w('g-rus-010','9K37M1 부크-M1 SAM','Buk-M1 (SA-11 Gadfly) Medium SAM','SAM','RUSSIA','OPERATIONAL','HIGH',
    'MH17 격추 미사일. 사거리 42km 중거리 지대공. 310대 발사대 운용.',
    {range:'42km',altitude:'25km',speed:'마하 3',guidance:'SARH·반능동레이더',firstDeployed:'1988년(M1)',manufacturer:'알마즈-안테이',quantity:'310+대 발사대'},
    ['부크','Buk','SAM','중거리방공','MH17'],['Wikipedia'],90),

  w('g-rus-011','9A52-4 토네이도-S 300mm MRL','9A52-4 Tornado-S 300mm Multiple Rocket Launcher','MLRS','RUSSIA','OPERATIONAL','HIGH',
    'BM-30 스메르치 후계. GPS/INS 유도. 사거리 120km. 200대 배치.',
    {range:'120km',armament:'300mm×12발',guidance:'GPS+INS',propulsion:'로켓+차량',firstDeployed:'2016년',manufacturer:'모토비힌스키 자보드',quantity:'200+대'},
    ['토네이도-S','300mm','MRL','러시아'],['Wikipedia'],85),

  w('g-rus-012','BTR-82A 장갑차','BTR-82A Armored Personnel Carrier','GROUND','RUSSIA','OPERATIONAL','MED',
    'BTR-80 개량형. 14.5mm→30mm 기관포 업그레이드. 2023년 250대 생산 계획.',
    {weight:'15,000kg',crew:'3+7명',armament:'2A72 30mm기관포+PKTM 7.62mm',speed:'80km/h',range:'600km',propulsion:'KAMAZ-740 300hp',firstDeployed:'2013년',manufacturer:'아르자마스기계공장',quantity:'1,200+대'},
    ['BTR-82A','APC','러시아'],['Wikipedia'],88),

  w('g-rus-013','9K33 오사 SAM','9K33M3 Osa-AKM (SA-8 Gecko) SAM','SAM','RUSSIA','OPERATIONAL','MED',
    '단거리 이동식 지대공미사일. 자체 레이더 탑재. 100대 운용.',
    {range:'15km',altitude:'5km',guidance:'단계식 무선유도',firstDeployed:'1972년',manufacturer:'Fakel MKB',quantity:'100대'},
    ['오사','OSA','SAM','단거리방공'],['Wikipedia'],80),

  w('g-rus-014','9M133 코넷 ATGM','9M133 Kornet (AT-14 Spriggan) ATGM','GROUND','RUSSIA','OPERATIONAL','HIGH',
    '러시아 최신 대전차미사일. 레이저 빔 탑승 유도. 사거리 5.5km. 직사+연기 관통.',
    {range:'5,500m',payload:'고탄력+열압력 선택',guidance:'레이저 빔 탑승',firstDeployed:'1998년',manufacturer:'KBP 툴라'},
    ['코넷','ATGM','대전차미사일','러시아'],['Wikipedia'],92),

  // ════════════════════════════════════════════════════════
  // 러시아 — 항공 (Wikipedia)
  // ════════════════════════════════════════════════════════

  w('g-rus-015','Su-25SM3 폭격기','Su-25SM3 Frogfoot Close Air Support','AIRCRAFT','RUSSIA','OPERATIONAL','HIGH',
    '러시아 대지공격 전투기. 우크라이나전쟁에서 광범위 사용. 약 200대 운용.',
    {range:'1,250km',speed:'마하 0.82',payload:'4,400kg',crew:'1명',propulsion:'R-195 ×2',firstDeployed:'1981년(Su-25)/2014년(SM3)',manufacturer:'수호이',armament:'GSh-30-2 30mm포+Kh-25/Kh-29/Kh-58'},
    ['Su-25','러시아','근접지원기','우크라이나'],['Wikipedia'],90),

  w('g-rus-016','Su-34 풀백 전폭기','Su-34 Fullback Strike Fighter','AIRCRAFT','RUSSIA','OPERATIONAL','HIGH',
    '러시아 주력 전폭기. 병렬 2인승. 정밀타격 핵심. 100대 운용. 우크라이나전쟁 대량 사용.',
    {range:'4,000km',speed:'마하 1.8',payload:'8,000kg',crew:'2명(병렬)',propulsion:'AL-31FM1 ×2',ceiling:'17,000m',firstDeployed:'2014년',manufacturer:'수호이',armament:'GSh-30-1 30mm+Kh-31/Kh-35/Kh-59/KAB 유도폭탄'},
    ['Su-34','풀백','전폭기','러시아'],['Wikipedia'],88),

  w('g-rus-017','Mi-28NM 나이트 헌터','Mi-28NM Night Hunter Attack Helicopter','HELICOPTER','RUSSIA','OPERATIONAL','HIGH',
    '러시아 주력 공격헬기 최신형. 야간전·악천후 전천후 능력. 100+대 운용.',
    {range:'450km',speed:'300km/h',propulsion:'VK-2500 2,200hp ×2',crew:'2명',firstDeployed:'2019년(NM)',manufacturer:'밀 헬리콥터 공장',armament:'2A42 30mm+9M120-1 Ataka ATGM+S-8 80mm 로켓'},
    ['Mi-28','공격헬기','나이트헌터','러시아'],['Wikipedia'],88),

  w('g-rus-018','Ka-52 앨리게이터 헬기','Ka-52 Alligator Attack Helicopter','HELICOPTER','RUSSIA','OPERATIONAL','HIGH',
    '러시아 공격헬기. 동축 로터. 이집트·사우디 수출. 우크라이나전쟁 사용.',
    {range:'1,110km',speed:'315km/h',crew:'2명',propulsion:'VK-2500 2,200hp ×2',firstDeployed:'2011년',manufacturer:'카모프',armament:'2A42 30mm+Vikhr ATGM+B-8V20 80mm로켓'},
    ['Ka-52','앨리게이터','공격헬기','러시아'],['Wikipedia'],90),

  // ════════════════════════════════════════════════════════
  // 중국 (PLA) — 지상/항공/해군 (Wikipedia)
  // ════════════════════════════════════════════════════════

  w('g-chn-001','96A형 주력전차','Type 96A MBT (ZTZ96A)','GROUND','CHINA','OPERATIONAL','HIGH',
    '중국 주력 전차 (수량). 3세대. 2,000+대 운용. 수출용 저가 모델.',
    {weight:'43,000kg',crew:'3명',propulsion:'150HB 1,000hp 디젤',speed:'65km/h',range:'400km',armament:'125mm 활강포+오토로더+12.7mm HMG',firstDeployed:'1997년(96)/2005년(96A)',manufacturer:'중국 북방공업(NORINCO)',quantity:'2,000+대'},
    ['96A형','ZTZ96A','중국전차','PLA'],['Wikipedia'],85),

  w('g-chn-002','15형 경전차','Type 15 Light Tank (ZTQ-15)','GROUND','CHINA','OPERATIONAL','HIGH',
    '고원·산악 지형 특화 경전차. 서장(티베트)·인도 국경 배치. 500+대.',
    {weight:'33,000kg',crew:'3명',armament:'105mm 활강포+오토로더',propulsion:'1,000hp 디젤',speed:'72km/h',firstDeployed:'2018년',manufacturer:'NORINCO',quantity:'500+대'},
    ['15형경전차','ZTQ-15','고원전차','중국'],['Wikipedia'],85),

  w('g-chn-003','PCL-181 155mm 차륜형 자주포','PCL-181 155mm Wheeled Self-Propelled Howitzer','ARTILLERY','CHINA','OPERATIONAL','HIGH',
    '트럭 탑재 155mm 자주포. 중국 포병 주력. 사거리 50km. 630대 운용.',
    {weight:'25,000kg',crew:'5명',armament:'155mm/52구경 곡사포',range:'50km(사정거리)',propulsion:'디젤 6×6 트럭',firstDeployed:'2018년',manufacturer:'NORINCO',quantity:'630대'},
    ['PCL-181','155mm','자주포','중국'],['Wikipedia'],88),

  w('g-chn-004','HQ-9B 장거리 SAM','HQ-9B Long-Range Surface-to-Air Missile','SAM','CHINA','OPERATIONAL','HIGH',
    '중국판 S-300. 사거리 200km. 055형 구축함·지상 배치. 파키스탄·터키에 수출 시도.',
    {range:'200km',altitude:'30km',guidance:'능동레이더',firstDeployed:'1997년(HQ-9)/2016년(HQ-9B)',manufacturer:'CASIC',quantity:'1,000+발사대'},
    ['HQ-9','중국SAM','장거리방공'],['Wikipedia'],85),

  w('g-chn-005','HJ-12 대전차미사일','HJ-12 Anti-Tank Guided Missile','GROUND','CHINA','OPERATIONAL','HIGH',
    '중국 javelin급 3세대 ATGM. 발사 후 망각(Fire-and-forget). 사거리 4km.',
    {range:'4,000m',payload:'탠덤 HEAT',guidance:'적외선 영상 탐색기',firstDeployed:'2014년',manufacturer:'NORINCO'},
    ['HJ-12','대전차미사일','중국','FNF'],['Wikipedia'],82),

  w('g-chn-006','J-10C 전투기','J-10C Vigorous Dragon Fighter','AIRCRAFT','CHINA','OPERATIONAL','HIGH',
    '중국 단발 4.5세대 다목적 전투기. AESA 레이더·PL-15 운용. 파키스탄 수출.',
    {range:'1,850km',speed:'마하 2.0',payload:'7,000kg',crew:'1명',propulsion:'WS-10B 추력편향',firstDeployed:'2018년(C형)',manufacturer:'청두항공',armament:'PL-15/PL-10/YJ-91'},
    ['J-10C','중국전투기','4.5세대'],['Wikipedia'],85),

  w('g-chn-007','J-15T 함재기','J-15T Carrier Fighter (CATOBAR)','AIRCRAFT','CHINA','OPERATIONAL','HIGH',
    '푸젠함 탑재 캐터펄트 발진 함재기. J-15 개량형. 2025년 배치.',
    {range:'3,500km',speed:'마하 2.0+',propulsion:'WS-10H ×2',firstDeployed:'2025년',manufacturer:'선양항공',armament:'PL-15/PL-10/YJ-15T'},
    ['J-15T','함재기','중국','푸젠함'],['Wikipedia'],78),

  w('g-chn-008','J-36 차세대 전투기','J-36 Next Generation Fighter','AIRCRAFT','CHINA','TESTING','HIGH',
    '2024년 12월 첫 비행 포착. 6세대 추정. 삼각익·전익기 혼합 설계.',
    {firstDeployed:'시험비행 중(2024~)',manufacturer:'청두항공'},
    ['J-36','6세대','차세대전투기','중국'],['GlobalSecurity'],45),

  w('g-chn-009','Y-20 대형 수송기','Y-20 Xian Large Transport Aircraft','AIRCRAFT','CHINA','OPERATIONAL','MED',
    '중국 첫 독자 대형 수송기. 66톤 탑재. 50+대 운용. 중국 전략적 공중수송 능력.',
    {range:'7,800km',speed:'917km/h',payload:'66,000kg',crew:'4명',propulsion:'WS-20 또는 D-30KP2 ×4',firstDeployed:'2016년',manufacturer:'시안항공',quantity:'80+대'},
    ['Y-20','대형수송기','중국'],['Wikipedia'],88),

  w('g-chn-010','H-6K 폭격기','H-6K Badger Strategic Bomber','AIRCRAFT','CHINA','OPERATIONAL','HIGH',
    '중국 Tu-16 기반 전략폭격기. CJ-10A 순항미사일 6발. 사거리 3,000km.',
    {range:'3,500km',speed:'1,050km/h',payload:'9,000kg',crew:'4명',propulsion:'D-30KP2 ×2',firstDeployed:'2009년(K형)',manufacturer:'시안항공',armament:'CJ-10A 순항미사일×6발'},
    ['H-6K','중국폭격기','전략폭격'],['Wikipedia'],88),

  w('g-chn-011','055형 구축함 (난창급)','Type 055 Renhai-class Destroyer','NAVAL','CHINA','OPERATIONAL','HIGH',
    '중국 최대 구축함. VLS 112셀. 이지스급에 버금가는 능력. 8척 취역.',
    {displacement:'13,000톤',speed:'30노트',length:'180m',crew:'310명',propulsion:'COGAG 가스터빈',armament:'VLS 112셀(HHQ-9B/YJ-18/CJ-10K)+H/PJ-38 130mm포',firstDeployed:'2020년',manufacturer:'장난조선소',quantity:'8척(2026)'},
    ['055형','난창급','구축함','중국','VLS'],['Wikipedia'],90),

  w('g-chn-012','093형 핵공격잠수함','Type 093 Shang-class Nuclear Attack Submarine','SUBMARINE','CHINA','OPERATIONAL','HIGH',
    '중국 2세대 핵추진 공격잠수함. 8척 운용. 대함미사일·어뢰 탑재.',
    {displacement:'6,000톤(수중)',speed:'30노트',propulsion:'원자로 1기',armament:'533mm어뢰관+YJ-18/YJ-12ALCM',firstDeployed:'2006년',manufacturer:'홀루다오조선소',quantity:'8척(093/093A/093B)'},
    ['093형','핵잠수함','중국','SSN'],['Wikipedia'],80),

  w('g-chn-013','094형 전략핵잠수함 (진급)','Type 094 Jin-class SSBN','SUBMARINE','CHINA','OPERATIONAL','CRITICAL',
    '중국 핵3원 해상 전력. JL-2 SLBM 12발. 6척 운용. 보하이해 순찰.',
    {displacement:'11,000톤(수중)',speed:'20노트',propulsion:'원자로 1기',armament:'JL-2/JL-3 SLBM×12발+533mm어뢰관',firstDeployed:'2007년',manufacturer:'홀루다오조선소',quantity:'6척'},
    ['094형','진급','SSBN','중국','JL-2'],['Wikipedia'],80),

  w('g-chn-014','JL-3 잠수함발사탄도미사일','JL-3 SLBM (CSS-NX-20)','SLBM','CHINA','OPERATIONAL','CRITICAL',
    '중국 최신 SLBM. 사거리 12,000km+. 094A/096형 탑재. MIRV 가능.',
    {range:'12,000km+',payload:'MIRV 탑재 가능',propulsion:'고체로켓 3단',firstDeployed:'2019년(시험)/2021년(배치)',manufacturer:'CASIC'},
    ['JL-3','SLBM','중국','핵3원'],['Wikipedia'],75),

  w('g-chn-015','WZ-10 공격헬기','WZ-10 (Z-10) Attack Helicopter','HELICOPTER','CHINA','OPERATIONAL','HIGH',
    '중국 독자개발 공격헬기. HJ-10 ATGM·TY-90 AAM 탑재. 200+대 운용.',
    {range:'800km',speed:'270km/h',crew:'2명',propulsion:'WZ-9 960hp ×2',firstDeployed:'2012년',manufacturer:'창허항공',armament:'HJ-10 ATGM+TY-90 AAM+23mm포',quantity:'200+대'},
    ['WZ-10','Z-10','공격헬기','중국'],['Wikipedia'],85),

  // ════════════════════════════════════════════════════════
  // 북한 (DPRK) — 지상/항공 (Wikipedia, IISS)
  // ════════════════════════════════════════════════════════

  w('g-dprk-001','선군호 전차','Seongun-ho MBT','GROUND','DPRK','OPERATIONAL','HIGH',
    '북한 최신 독자개발 주력전차. 2020년 노동당 창건 열병식에서 첫 공개. T-14급 추정.',
    {weight:'약 50~55톤(추정)',armament:'120mm 이상 활강포(추정)+ATGM+ERA',firstDeployed:'2020년(공개)',manufacturer:'북한 독자'},
    ['선군호','북한전차','주체무기'],['Wikipedia','IISS'],40),

  w('g-dprk-002','M-1978 곡산 170mm 자주포','M-1978 Koksan 170mm Self-Propelled Gun','ARTILLERY','DPRK','OPERATIONAL','HIGH',
    '세계 최대급 자주포. 170mm. 사거리 60km. 서울 직접 타격 가능. 1985년 공개.',
    {armament:'170mm 자주포',range:'60km',firstDeployed:'1978년(추정)',manufacturer:'북한 독자'},
    ['곡산포','170mm','북한','장사정포'],['GlobalSecurity'],72),

  w('g-dprk-003','KN-09 300mm 방사포','KN-09 300mm Multiple Rocket Launcher','MLRS','DPRK','OPERATIONAL','HIGH',
    '러시아 BM-30 스메르치 유사 300mm MRL. 사거리 200km. GPS 유도 가능.',
    {range:'200km',armament:'300mm ×8발',guidance:'GPS 유도(추정)',firstDeployed:'2013년(추정)'},
    ['KN-09','300mm','방사포','북한'],['CSIS'],70),

  w('g-dprk-004','M-1977 122mm 방사포','M-1977 122mm MRL','MLRS','DPRK','OPERATIONAL','HIGH',
    '소련 BM-21 기반 122mm 방사포. 사거리 40km. 수천 문 보유. 서울 타격 가능.',
    {range:'40km',armament:'122mm ×40발',quantity:'수천 문',firstDeployed:'1977년'},
    ['122mm방사포','북한','장사정포'],['IISS'],80),

  w('g-dprk-005','MiG-29 전투기','MiG-29 Fulcrum Fighter (KPAF)','AIRCRAFT','DPRK','OPERATIONAL','MED',
    '북한 최강 전투기. 30~40대 보유. 구 소련제. 노후화 심각하나 여전히 위협.',
    {range:'1,430km',speed:'마하 2.25',crew:'1명',propulsion:'RD-33 ×2',firstDeployed:'1988년(북한 도입)',manufacturer:'미코얀-구레비치',quantity:'30~40대'},
    ['MiG-29','북한공군','풀크럼'],['Wikipedia','IISS'],72),

  w('g-dprk-006','H-5 폭격기','H-5 (Il-28) Beagle Bomber (KPAF)','AIRCRAFT','DPRK','OPERATIONAL','MED',
    '소련 Il-28 기반 구식 폭격기. 80+대 보유. 재래식·핵 투발 가능.',
    {range:'2,400km',speed:'900km/h',crew:'3명',propulsion:'VK-1A ×2',quantity:'80+대'},
    ['H-5','Il-28','북한폭격기'],['IISS'],65),

  w('g-dprk-007','KN-06 지대공미사일','KN-06 (Pongae-5) SAM System','SAM','DPRK','OPERATIONAL','HIGH',
    'S-300 유사 북한 독자 개발 장거리 SAM. 2016년 공개. 사거리 100km 추정.',
    {range:'100km+(추정)',altitude:'30km+(추정)',firstDeployed:'2016년(공개)',manufacturer:'북한 독자'},
    ['KN-06','봉개-5','북한SAM'],['CSIS','IISS'],55),

  w('g-dprk-008','고래급 탄도미사일 잠수함','Gorae-class SSBN (8.24 Yongung)','SUBMARINE','DPRK','OPERATIONAL','CRITICAL',
    '북한 소형 탄도미사일 잠수함. 2021년 북극성-3 발사. 추가 건조 진행 중.',
    {displacement:'2,000톤(추정)',armament:'북극성 SLBM ×1~2발+어뢰관',firstDeployed:'2019년(8.24영웅함)',manufacturer:'신포조선소'},
    ['고래급','SSBN','북한','신포'],['Wikipedia','CSIS'],55),

  // ════════════════════════════════════════════════════════
  // 대한민국 — 추가 무기 (Wikipedia)
  // ════════════════════════════════════════════════════════

  w('g-rok-001','K21 보병전투차','K21 KNIFV Infantry Fighting Vehicle','GROUND','ROK','OPERATIONAL','MED',
    '한국 독자개발 40mm 포 탑재 IFV. 수상 부유 가능. 900+대 운용.',
    {weight:'25,600kg',crew:'3+9명',armament:'K40 40mm 기관포+현궁 ATGM',propulsion:'두산 700hp 디젤',speed:'70km/h',firstDeployed:'2009년',manufacturer:'한화에어로스페이스',quantity:'900+대'},
    ['K21','IFV','보병전투차','한국'],['Wikipedia'],95),

  w('g-rok-002','K9A2 썬더 자주포','K9A2 Thunder 155mm Self-Propelled Howitzer','ARTILLERY','ROK','OPERATIONAL','HIGH',
    '자동장전·분당 6~10발. 세계 10개국 수출. 노르웨이·폴란드·호주·인도 등.',
    {weight:'47,000kg',crew:'3~5명',armament:'KH179 155mm 52구경+오토로더',propulsion:'두산 1,000hp 디젤',speed:'67km/h',range:'480km',firstDeployed:'1999년(K9)/2022년(A2)',manufacturer:'한화에어로스페이스',quantity:'1,000+대(한국+수출)'},
    ['K9','K9A2','썬더','자주포','한국','수출'],['Wikipedia'],98),

  w('g-rok-003','천무 K239 다연장로켓','K239 Cheonmoo Multiple Rocket Launcher','MLRS','ROK','OPERATIONAL','HIGH',
    '한국 독자 227mm MLRS. ATACMS 등가 탄 발사 가능. 아랍에미리트·사우디 수출.',
    {range:'80km(KTSSM기준)',armament:'227mm ×12발',propulsion:'차량+로켓',guidance:'GPS+INS',firstDeployed:'2014년',manufacturer:'한화에어로스페이스',quantity:'200+대'},
    ['K239','천무','MLRS','한국'],['Wikipedia'],92),

  w('g-rok-004','현궁 대전차미사일','Hyungung (AT-3K) ATGM','GROUND','ROK','OPERATIONAL','HIGH',
    '한국 독자 발사 후 망각 ATGM. 사거리 2.5km. K21 IFV 탑재 및 휴대형.',
    {range:'2,500m',payload:'탠덤 HEAT',guidance:'적외선 영상 탐색기',firstDeployed:'2015년',manufacturer:'LIG넥스원'},
    ['현궁','AT-3K','대전차미사일','한국','FNF'],['Wikipedia'],90),

  w('g-rok-005','차세대 이지스 구축함 (KDX-III Batch II)','KDX-III Batch II Next-Generation Aegis Destroyer','NAVAL','ROK','DEVELOPMENT','HIGH',
    '세종대왕급 후계 이지스 구축함. SPY-6 AESA 레이더·탄도미사일방어 강화. 3척 예정.',
    {displacement:'11,000톤+(추정)',armament:'SPY-6 레이더+SM-3/SM-6+K-VLS',firstDeployed:'2030년대 목표',manufacturer:'현대중공업'},
    ['KDX-III Batch II','이지스','구축함','한국'],['Wikipedia'],65),

  w('g-rok-006','KF-X 인도네시아형 IFX','KFX/IFX Joint Fighter (Indonesia)','AIRCRAFT','ROK','DEVELOPMENT','MED',
    '한국-인도네시아 공동개발 KF-21. 인도네시아 IFX 명칭. 분담금 지연으로 계획 조정 중.',
    {firstDeployed:'2026~2030년(목표)',manufacturer:'KAI+PT DI'},
    ['IFX','인도네시아','KF-21','공동개발'],['Wikipedia'],70),

  w('g-rok-007','FA-50 경전투기','KAI FA-50 Golden Eagle Light Fighter','AIRCRAFT','ROK','OPERATIONAL','MED',
    'T-50 파생 경전투기. 마하 1.5. 12개국 수출. 폴란드 48대·이라크 24대 등.',
    {range:'1,850km',speed:'마하 1.5',payload:'2,457kg',crew:'1명',propulsion:'GE F404-GE-102',firstDeployed:'2011년',manufacturer:'한국항공우주산업(KAI)',quantity:'60+대(한국)+수출'},
    ['FA-50','경전투기','T-50','한국','수출'],['Wikipedia'],97),

  w('g-rok-008','K1A2 전차','K1A2 Main Battle Tank','GROUND','ROK','OPERATIONAL','MED',
    'K1 개량형 3세대 전차. 한국 육군 주력(K2 보완). 1,027대 운용.',
    {weight:'53,200kg',crew:'4명',armament:'KM68A1 105mm 강선포→120mm 개조 가능',propulsion:'MTU MB 871 Ka-501 1,200hp',speed:'65km/h',firstDeployed:'1999년',manufacturer:'현대로템',quantity:'1,027대'},
    ['K1A2','전차','한국','주력전차'],['Wikipedia'],95),

  // ════════════════════════════════════════════════════════
  // 미국 추가 — 미사일/UAV/특수무기
  // ════════════════════════════════════════════════════════

  w('g-usa-001','FGM-148 재블린 ATGM','FGM-148 Javelin Anti-Tank Missile','GROUND','USA','OPERATIONAL','HIGH',
    '발사 후 망각 ATGM. 상부 공격 능력. 우크라이나 전쟁 아이콘. 세계 20개국+.',
    {range:'2,500m(직접)/4,000m(상부)',payload:'탠덤 HEAT',guidance:'적외선 영상+FNF',firstDeployed:'1996년',manufacturer:'레이시온·록히드마틴',armament:'상부공격 및 직접공격 선택'},
    ['재블린','ATGM','FGM-148','우크라이나'],['Wikipedia'],99),

  w('g-usa-002','MQ-1C 그레이 이글','MQ-1C Gray Eagle UAS','UAV','USA','OPERATIONAL','HIGH',
    'MQ-9 리퍼 소형 버전. 한국 육군 도입. 헬파이어 4발 탑재. 체공 25시간.',
    {range:'4,000km',speed:'280km/h',payload:'350kg',crew:'없음(원격)',propulsion:'터보차저 피스톤',ceiling:'8,839m',firstDeployed:'2009년',manufacturer:'제너럴아토믹스',armament:'AGM-114 헬파이어×4'},
    ['MQ-1C','그레이이글','UAV','미국','한국도입'],['Wikipedia'],95),

  w('g-usa-003','PrSM 정밀타격미사일','PrSM Precision Strike Missile (MGM-168)','CRUISE','USA','OPERATIONAL','HIGH',
    'ATACMS 후계. HIMARS 탑재. 사거리 500km+. 2023년 첫 배치. 한국 도입 예상.',
    {range:'500km+',guidance:'GPS+INS+SAR탐색기',firstDeployed:'2023년(초도)',manufacturer:'록히드마틴',armament:'단탄두 또는 집속폭발'},
    ['PrSM','MGM-168','HIMARS','ATACMS후계'],['Wikipedia'],82),

  w('g-usa-004','GBU-57A/B 대형관통폭탄 (MOP)','GBU-57A/B Massive Ordnance Penetrator (MOP)','ASM','USA','OPERATIONAL','CRITICAL',
    '13.6톤 초대형 지하벙커 관통폭탄. B-2·B-21 전용. 이란·북한 지하핵시설 타격 설계.',
    {payload:'2,400kg 고폭',length:'6.2m',weight:'13,608kg',propulsion:'중력 자유낙하',guidance:'GPS',firstDeployed:'2012년',manufacturer:'보잉',armament:'지하 61m 관통'},
    ['MOP','GBU-57','벙커버스터','B-2','B-21'],['Wikipedia'],92),

  w('g-usa-005','SM-3 Block IIA 요격미사일','SM-3 Block IIA Ballistic Missile Interceptor','SAM','USA','OPERATIONAL','HIGH',
    '이지스 함정 발사 ICBM 요격 미사일. 일본 공동개발. 요격고도 1,500km. 한국 세종대왕급 탑재 예정.',
    {range:'700km',altitude:'1,500km',speed:'마하 15',guidance:'대기외 요격',firstDeployed:'2017년(IIA)',manufacturer:'레이시온·미쓰비시전기'},
    ['SM-3','이지스','ICBM요격','일본공동개발'],['Wikipedia'],92),

  w('g-usa-006','AGM-183A ARRW 극초음속미사일','AGM-183A Air-Launched Rapid Response Weapon (ARRW)','ASM','USA','TESTING','CRITICAL',
    '미국 공중발사 극초음속 활공탄두. B-52 탑재. 마하 20 목표. 2024년 시험 진행 중.',
    {range:'925km+(추정)',speed:'마하 20(목표)',propulsion:'고체로켓부스터+HGV',firstDeployed:'개발 중(2024~)',manufacturer:'록히드마틴'},
    ['ARRW','극초음속','미국','B-52','HGV'],['Wikipedia'],60),

  w('g-usa-007','MQ-25 스팅레이 급유드론','MQ-25 Stingray Carrier-Based UAV Tanker','UAV','USA','TESTING','MED',
    '미국 첫 함재 급유 드론. F/A-18·F-35·E-2에 공중급유. 2026년 IOC 예정.',
    {firstDeployed:'2026년(목표)',manufacturer:'보잉',armament:'없음(급유 전용)'},
    ['MQ-25','급유드론','함재UAV','미국'],['Wikipedia'],70),

  // ════════════════════════════════════════════════════════
  // 인도 (INDIA) — 추가
  // ════════════════════════════════════════════════════════

  w('g-ind-001','아르준 Mk1A 전차','Arjun Mk1A MBT','GROUND','INDIA','OPERATIONAL','MED',
    '인도 독자 3세대 주력전차. 120mm 강선포. 주요 개량 추가. 118대 발주.',
    {weight:'68,500kg',crew:'4명',armament:'120mm 강선포+12.7mm HMG',propulsion:'MTU MB 838 1,400hp',speed:'70km/h',firstDeployed:'2022년(Mk1A)',manufacturer:'CVRDE·HVF'},
    ['아르준','인도전차','Mk1A'],['Wikipedia'],85),

  w('g-ind-002','프리트비 II SRBM','Prithvi-II Short-Range Ballistic Missile','SRBM','INDIA','OPERATIONAL','HIGH',
    '인도 액체연료 단거리 탄도미사일. 사거리 350km. 육군 운용. 핵재래식 양용.',
    {range:'350km',payload:'500~1,000kg',propulsion:'액체로켓 단단',guidance:'INS+터미널',firstDeployed:'2003년',manufacturer:'DRDO·BDL'},
    ['프리트비','인도','SRBM','핵'],['Wikipedia'],88),

  w('g-ind-003','브라모스 초음속 순항미사일','BrahMos Supersonic Cruise Missile','CRUISE','INDIA','OPERATIONAL','HIGH',
    '인도-러시아 공동개발. 마하 2.8~3.0. 지상·함정·잠수함·항공기 발사. 필리핀 수출.',
    {range:'300~400km',speed:'마하 2.8~3.0',payload:'200~300kg 관통탄두',propulsion:'터보제트+고체부스터',guidance:'INS+능동레이더',firstDeployed:'2006년(지상)',manufacturer:'BrahMos Aerospace'},
    ['브라모스','BrahMos','초음속','인도러시아'],['Wikipedia'],95),

  w('g-ind-004','INS 비크란트 항공모함','INS Vikrant (R11) Aircraft Carrier','NAVAL','INDIA','OPERATIONAL','HIGH',
    '인도 첫 국산 항공모함. 2022년 취역. MiG-29K·LCA 테자스 탑재. 스키점프 방식.',
    {displacement:'45,000톤',speed:'28노트',length:'262m',crew:'1,600명',propulsion:'가스터빈+디젤 CODAG',armament:'MiG-29K×26+LCA Mk1+카몹(BAE Sea Harrier)',firstDeployed:'2022년',manufacturer:'코친조선소'},
    ['비크란트','인도항공모함','INS','국산항모'],['Wikipedia'],92),

  // ════════════════════════════════════════════════════════
  // 영국 추가
  // ════════════════════════════════════════════════════════

  w('g-uk-001','챌린저 3 전차','Challenger 3 MBT','GROUND','UK','DEVELOPMENT','HIGH',
    '챌린저 2 대폭 개량. AESA 레이더+능동방호+사이드 ERA. 2025년부터 148대 개조.',
    {weight:'65,000kg',crew:'4명',armament:'L30A1 120mm 강선포(→L55A1로 교체예정)',propulsion:'Perkins CV12-6A 1,200hp',firstDeployed:'2025년(목표)',manufacturer:'레이시온UK·BAE'},
    ['챌린저3','영국전차','MBT'],['Wikipedia'],78),

  w('g-uk-002','MBDA 미티어 AAM','MBDA Meteor Beyond Visual Range AAM','AAM','UK','OPERATIONAL','HIGH',
    '유럽 공동개발 램제트 BVR AAM. 사거리 100km+. 모든 유럽 5세대 전투기 탑재.',
    {range:'100km+',speed:'마하 4+',guidance:'능동레이더+INS+데이터링크',firstDeployed:'2016년',manufacturer:'MBDA(영국·프랑스·독일·이탈리아·스페인·스웨덴)'},
    ['미티어','MBDA','AAM','유럽','BVR'],['Wikipedia'],95),

  // ════════════════════════════════════════════════════════
  // 프랑스 추가
  // ════════════════════════════════════════════════════════

  w('g-fra-001','르클레르 전차','Leclerc Main Battle Tank','GROUND','FRANCE','OPERATIONAL','HIGH',
    '프랑스 3세대 주력전차. 자동장전 120mm. 아랍에미리트 수출. 2026년 개량 예정.',
    {weight:'54,500kg',crew:'3명',armament:'CN120-26/52 120mm 활강포+오토로더',propulsion:'SACM UDV8×8 1,500hp 디젤+가스터빈',speed:'71km/h',range:'550km',firstDeployed:'1992년',manufacturer:'Nexter',quantity:'220대(프랑스)+436대(UAE)'},
    ['르클레르','프랑스전차','3세대MBT'],['Wikipedia'],92),

  w('g-fra-002','M51 SLBM','M51 Submarine-Launched Ballistic Missile','SLBM','FRANCE','OPERATIONAL','CRITICAL',
    '프랑스 핵3원 해상 전력. 트리옹팡급 탑재. 사거리 10,000km. MIRV 10발.',
    {range:'10,000km+',payload:'MIRV 10발',propulsion:'3단 고체로켓',firstDeployed:'2010년(M51.1)',manufacturer:'ArianeGroup'},
    ['M51','SLBM','프랑스핵','트리옹팡'],['Wikipedia'],90),

  // ════════════════════════════════════════════════════════
  // 독일 추가
  // ════════════════════════════════════════════════════════

  w('g-deu-001','IRIS-T SLM 지대공미사일','IRIS-T SLM Medium-Range SAM','SAM','GERMANY','OPERATIONAL','MED',
    '독일 독자 중거리 지대공미사일 시스템. 우크라이나 공급으로 유명해짐. 이집트·스웨덴 수출.',
    {range:'40km',altitude:'20km',guidance:'적외선 영상 탐색기+INS',firstDeployed:'2014년(SLM)',manufacturer:'Diehl Defence'},
    ['IRIS-T SLM','독일SAM','우크라이나지원'],['Wikipedia'],88),

  w('g-deu-002','PUMA IFV','Puma Infantry Fighting Vehicle','GROUND','GERMANY','OPERATIONAL','HIGH',
    '독일 최신 보병전투차. 30mm 기관포+스파이크 ATGM. 모듈식 방호.',
    {weight:'43,000kg',crew:'3+6명',armament:'MK30-2/ABM 30mm+스파이크 LR2 ATGM',propulsion:'MTU V10 1,000hp',speed:'70km/h',firstDeployed:'2015년',manufacturer:'KMW·Rheinmetall',quantity:'350대(독일)'},
    ['PUMA','IFV','독일','보병전투차'],['Wikipedia'],92),

  // ════════════════════════════════════════════════════════
  // 일본 추가
  // ════════════════════════════════════════════════════════

  w('g-jpn-001','12식 지대함미사일 개량형','Type 12 SSM (Extended Range)','SSM','JAPAN','DEVELOPMENT','HIGH',
    '일본 지대함→지대지 전환 개량형. 사거리 1,000km+. 반격능력 핵심 전력.',
    {range:'1,000km+',propulsion:'터보제트+고체부스터',guidance:'INS+GPS+DSMAC+능동레이더',firstDeployed:'2026년(목표)',manufacturer:'미쓰비시중공업'},
    ['12식SSM','지대함미사일','일본','반격능력'],['Wikipedia'],80),

  w('g-jpn-002','03식 중거리 SAM','Type 03 Chu-SAM (Chū-SAM)','SAM','JAPAN','OPERATIONAL','MED',
    '일본 자체개발 중거리 SAM. 패트리엇 사이의 레이어 방어. 50km 사거리.',
    {range:'50km',altitude:'10km',guidance:'능동레이더',firstDeployed:'2003년',manufacturer:'미쓰비시전기·도시바'},
    ['03식SAM','중거리지대공','일본'],['Wikipedia'],90),

  w('g-jpn-003','88식 지대함미사일','Type 88 SSM','SSM','JAPAN','OPERATIONAL','MED',
    '일본 지대함 미사일. 사거리 150km. 하파이어 계열. 자위대 연안방어.',
    {range:'150km',propulsion:'터보제트',guidance:'INS+능동레이더',firstDeployed:'1992년',manufacturer:'미쓰비시중공업'},
    ['88식SSM','지대함','일본해안방어'],['Wikipedia'],90),

  // ════════════════════════════════════════════════════════
  // 이스라엘 추가
  // ════════════════════════════════════════════════════════

  w('g-isr-001','메르카바 Mk4M 전차','Merkava Mk4M Barak MBT','GROUND','ISRAEL','OPERATIONAL','HIGH',
    '이스라엘 독자 최강 전차. Trophy APS 표준 탑재. 후방 탑승구. 가자전쟁 실전.',
    {weight:'65,000kg',crew:'4명',armament:'MG253 120mm 활강포×46발',propulsion:'GD883 1,500hp 디젤',speed:'64km/h',firstDeployed:'2004년(Mk4)/2016년(Mk4M)',manufacturer:'IMI Systems',quantity:'600+대'},
    ['메르카바','이스라엘전차','Trophy APS','가자전쟁'],['Wikipedia'],98),

  w('g-isr-002','라파엘 스파이크 ATGM','Rafael Spike ATGM Family','GROUND','ISRAEL','OPERATIONAL','HIGH',
    '이스라엘 스파이크 ATGM 패밀리. Spike-LR2(4km)/ER2(10km)/NLOS(32km). 40개국 수출.',
    {range:'4,000~32,000m(모델별)',payload:'탠덤 HEAT·EFP',guidance:'적외선 영상+FNF+데이터링크',firstDeployed:'1997년(Spike-LR)',manufacturer:'라파엘'},
    ['스파이크','ATGM','이스라엘','수출'],['Wikipedia'],98),

  w('g-isr-003','IAI 헤론 TP MALE UAV','IAI Heron TP (Eitan) MALE UAV','UAV','ISRAEL','OPERATIONAL','HIGH',
    '이스라엘 최대 무장 UAV. 체공 36시간. 한국·독일·인도 운용.',
    {range:'7,400km',speed:'220km/h',payload:'2,700kg',crew:'없음',propulsion:'Pratt & Whitney PT6A-67A 1,200hp',ceiling:'13,716m',firstDeployed:'2010년',manufacturer:'IAI'},
    ['헤론TP','에이탄','MALE UAV','이스라엘'],['Wikipedia'],90),

  // ════════════════════════════════════════════════════════
  // 터키 추가
  // ════════════════════════════════════════════════════════

  w('g-tur-001','알타이 전차','Altay Main Battle Tank','GROUND','TURKEY','DEVELOPMENT','MED',
    '터키 독자 3.5세대 전차. 독일 Leopard 기술 기반. 한국 파워팩 채택 논의.',
    {weight:'65,000kg',crew:'4명',armament:'120mm 활강포',propulsion:'MTU MT883 1,500hp(목표)',firstDeployed:'2025년(예정)',manufacturer:'BMC·Roketsan'},
    ['알타이','터키전차','독자MBT'],['Wikipedia'],70),

  w('g-tur-002','로케트산 SOM-B2 순항미사일','Roketsan SOM-B2 Cruise Missile','CRUISE','TURKEY','OPERATIONAL','HIGH',
    '터키 독자 공대지 순항미사일. 사거리 250km. 침투탄두. F-16·F-35I·KAAN 탑재.',
    {range:'250km',payload:'230kg 침투탄두',propulsion:'터보제트',guidance:'INS+GPS+IIR',firstDeployed:'2019년',manufacturer:'로케트산'},
    ['SOM-B2','터키','순항미사일','KAAN'],['Wikipedia'],85),

  // ════════════════════════════════════════════════════════
  // 폴란드 추가
  // ════════════════════════════════════════════════════════

  w('g-pol-001','K9PL 크랩 자주포','K9PL Krab 155mm Self-Propelled Howitzer','ARTILLERY','ROK','OPERATIONAL','HIGH',
    '한국 K9 기반 폴란드 국산화 버전. 60+대 운용. 우크라이나에 18대 이전.',
    {weight:'47,000kg',armament:'155mm 52구경 곡사포',firstDeployed:'2021년(PL)',manufacturer:'한화에어로스페이스+HSW 폴란드',quantity:'60+대'},
    ['K9PL','크랩','폴란드','K방산'],['Wikipedia'],92),

  // ════════════════════════════════════════════════════════
  // 오스트레일리아 추가
  // ════════════════════════════════════════════════════════

  w('g-aus-001','AUKUS 핵잠수함 SSN-AUKUS','AUKUS SSN Nuclear Attack Submarine','SUBMARINE','AUSTRALIA','DEVELOPMENT','HIGH',
    '미국·영국·호주 AUKUS 협약으로 건조하는 핵추진 잠수함. 2030년대 호주 취역 예정.',
    {displacement:'8,000~10,000톤(추정)',propulsion:'원자로 1기(영국형)',armament:'MK48어뢰+토마호크',firstDeployed:'2030년대(목표)',manufacturer:'BAE·ASC·빠른 건설'},
    ['AUKUS','호주핵잠수함','SSN','3국협약'],['Wikipedia'],55),

  // ════════════════════════════════════════════════════════
  // 사우디아라비아 추가
  // ════════════════════════════════════════════════════════

  w('g-sau-001','Typhoon 전투기 (사우디)','Eurofighter Typhoon (Royal Saudi Air Force)','AIRCRAFT','MULTI','OPERATIONAL','HIGH',
    '사우디 공군 72대 운용. Tranche 2/3. 예멘 전쟁 실전 투입.',
    {range:'2,900km',speed:'마하 2.0',payload:'7,500kg',crew:'1~2명',firstDeployed:'2009년(사우디)',quantity:'72대(사우디)'},
    ['유로파이터','사우디아라비아','Typhoon'],['Wikipedia'],90),

  // ════════════════════════════════════════════════════════
  // 이란 추가
  // ════════════════════════════════════════════════════════

  w('g-irn-001','카라르 자폭드론','Kara ar (Karrar) Loitering Munition','UAV','IRAN','OPERATIONAL','HIGH',
    '이란 제트추진 자폭드론. 마하 0.9. 1,800km 사거리. 핵시설 공격 능력 주장.',
    {range:'1,800km',speed:'마하 0.9',payload:'재래식 탄두',propulsion:'터보제트',firstDeployed:'2010년',manufacturer:'이란 HESA'},
    ['카라르','이란드론','제트추진드론'],['Wikipedia'],60),

  w('g-irn-002','BM-25 무수단 (수출형)','BM-25 Musudan (Hwasong-10 Export)','IRBM','IRAN','SUSPECTED','HIGH',
    '이란이 도입한 것으로 추정되는 북한 무수단(화성-10) 기반 IRBM.',
    {range:'2,500km',payload:'1,250kg',propulsion:'액체로켓',firstDeployed:'추정(2010년대)',manufacturer:'북한→이란'},
    ['무수단','북한이란협력','IRBM'],['CSIS'],40),

  // ════════════════════════════════════════════════════════
  // NATO / 다국적 무기
  // ════════════════════════════════════════════════════════

  w('g-nato-001','MBDA CAMM/CAMM-ER SAM','CAMM / CAMM-ER Surface-to-Air Missile','SAM','NATO','OPERATIONAL','MED',
    '영국·이탈리아 공동개발 중거리 SAM. 수직발사·능동레이더. 사거리 45~70km.',
    {range:'45km(CAMM)/70km(CAMM-ER)',guidance:'능동레이더+INS',firstDeployed:'2018년(CAMM)',manufacturer:'MBDA'},
    ['CAMM','CAMM-ER','NATO','영국','이탈리아'],['Wikipedia'],88),

  w('g-nato-002','M2 브래들리 IFV 업그레이드','M2A4E1 Bradley Infantry Fighting Vehicle','GROUND','USA','OPERATIONAL','HIGH',
    'M2 브래들리 최신 개량형. 25mm 부시마스터. 우크라이나 공급. 3,400+대 운용.',
    {weight:'30,000kg',crew:'3+6명',armament:'M242 25mm 부시마스터+TOW-2B ATGM',propulsion:'Cummins VTA-903T 600hp',speed:'61km/h',firstDeployed:'1981년(M2)/2023년(A4E1)',manufacturer:'BAE Systems',quantity:'3,400+대(미국)'},
    ['브래들리','IFV','M2','미국','우크라이나'],['Wikipedia'],98),

  w('g-nato-003','레오파르트 2A8 전차','Leopard 2A8 Main Battle Tank','GROUND','GERMANY','DEVELOPMENT','HIGH',
    '레오파르트 2 최신 버전. Trophy/AMAP APS·개량 장갑. 독일·스웨덴 도입 예정.',
    {weight:'68,000kg+(추정)',crew:'4명',armament:'120mm L55A1 활강포',propulsion:'MTU MB 873 Ka-501 1,500hp',firstDeployed:'2026~2027년(목표)',manufacturer:'KMW·Rheinmetall'},
    ['레오파르트2A8','독일','MBT','APS'],['Wikipedia'],72),

]
