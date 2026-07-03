import type { WeaponSystem } from './weapons'
const w = (id:string,name:string,nameEng:string,cat:WeaponSystem['category'],origin:WeaponSystem['origin'],status:WeaponSystem['status'],threat:WeaponSystem['threatRating'],desc:string,specs:WeaponSystem['specs'],tags:string[],sources:string|string[],wiki?:string,conf=75): WeaponSystem=>({id,name,nameEng,category:cat,origin,status,threatRating:threat,description:desc,detail:`## ${nameEng}\n\n${desc}\n\n### 주요 제원\n${Object.entries(specs).filter(([,v])=>v).map(([k,v])=>`- ${k}: ${v}`).join('\n')}`,specs,confidence:conf,lastUpdated:'2026-07-01',relatedIntelIds:[],tags,sources:Array.isArray(sources)?sources:[sources],wikiUrl:wiki})

export const WEAPONS_EXP_GLOBAL3: WeaponSystem[] = [
  // ── 브라질 (BRAZIL) ───────────────────────────────────────────────────────
  w('bra-a001','그리펜 E (브라질)','Saab JAS 39E Gripen (FAB)','AIRCRAFT','SWEDEN','OPERATIONAL','LOW','브라질 공군 그리펜 E 36기 계약. 현지 생산. 라틴아메리카 최고 성능 전투기.',{speed:'마하 2.0',firstDeployed:'2023년(브라질)',quantity:'36기'},['그리펜E','브라질','라틴아메리카','사브','현지생산'],'FAB브라질공군','https://en.wikipedia.org/wiki/Saab_JAS_39_Gripen',88),
  w('bra-n001','미나스 제라이스급 (브라질 항모 퇴역)','NAe São Paulo CV (retired)','NAVAL','MULTI','RETIRED','LOW','브라질 해군 구형 항공모함. 전 프랑스 포크항모. 2017년 퇴역. 잠시 해양 테마파크 계획.',{displacement:'32,800톤',firstDeployed:'2001년(브라질)',quantity:'퇴역'},['브라질항모','포크급','퇴역','상파울루'],'브라질해군',undefined,85),
  w('bra-n002','타만다레급 호위함','Tamandaré-class Corvette (Brazil)','NAVAL','MULTI','DEVELOPMENT','LOW','브라질 신형 초계함급. TKMS 컨소시엄. CAMM SAM·76mm. 2026년 취역 목표.',{displacement:'2,800톤',armament:'CAMM·76mm Oto·A244S',firstDeployed:'2026년(예정)'},['타만다레','브라질','CAMM','신형초계함'],'브라질해군',undefined,72),
  w('bra-m001','A-Dex 공대지 미사일','A-Dex Air-to-Ground Missile (Brazil)','ASM','MULTI','DEVELOPMENT','LOW','브라질 그리펜 탑재 독자 공대지 무장 개발. 협정상 기술 이전 조건.',{firstDeployed:'개발 중'},['A-Dex','브라질','공대지','그리펜','독자개발'],'FAB',undefined,50),

  // ── 아르헨티나 (ARGENTINA) ────────────────────────────────────────────────
  w('arg-a001','F-16AM (아르헨티나)','F-16AM Fighting Falcon (Argentina)','AIRCRAFT','USA','OPERATIONAL','LOW','아르헨티나 공군 F-16 24기. 덴마크 중고. 포클랜드 분쟁 이후 서방 전투기 복귀.',{firstDeployed:'2024년(아르헨티나)',quantity:'24기'},['F-16AM','아르헨티나','덴마크중고','포클랜드','서방복귀'],'아르헨티나공군',undefined,88),
  w('arg-a002','미라지 IIIEA (퇴역)','Mirage IIIEA (Argentina AF)','AIRCRAFT','FRANCE','RETIRED','LOW','포클랜드 전쟁 영국 항모 공격에 참전. 2015년 퇴역. 엑조세 미사일 탑재.',{speed:'마하 2.2',firstDeployed:'1972년(아르헨티나)'},['미라지III','아르헨티나','포클랜드','엑조세','퇴역'],'아르헨티나공군',undefined,90),

  // ── 칠레 (CHILE) ────────────────────────────────────────────────────────
  w('chl-a001','F-16C/D (칠레)','F-16C/D Block 52+ (FACh)','AIRCRAFT','USA','OPERATIONAL','LOW','칠레 공군 46기. 라틴아메리카 최대 F-16 보유국.',{speed:'마하 2.0',firstDeployed:'2006년(칠레)',quantity:'46기'},['F-16','칠레','라틴아메리카최대','블록52'],'칠레공군',undefined,88),

  // ── 콜롬비아 (COLOMBIA) ──────────────────────────────────────────────────
  w('col-a001','카라 (콜롬비아 드론)','IAI Heron (Colombian AF)','UAV','ISRAEL','OPERATIONAL','LOW','콜롬비아 공군 IAI 헤론 운용. 게릴라 감시·마약 근절 작전.',{ceiling:'10,000m',range:'350km',firstDeployed:'2011년(콜롬비아)'},['헤론','콜롬비아','IAI','게릴라감시','마약'],'콜롬비아군',undefined,72),

  // ── 남아프리카공화국 (SOUTH AFRICA) ─────────────────────────────────────
  w('zaf-a001','그리펜 C/D (남아공)','Saab JAS 39C/D Gripen (SAAF)','AIRCRAFT','SWEDEN','OPERATIONAL','LOW','남아공 공군 26기. 아프리카 최고 성능 전투기. 콜롬비아·싱가포르 훈련 지원.',{speed:'마하 2.0',firstDeployed:'2008년(남아공)',quantity:'26기'},['그리펜','남아공','아프리카최고','사브','SAAF'],'남아공공군',undefined,85),
  w('zaf-m001','G6 로이카트 155mm 견인포','G6 Rhino 155mm SPH','ARTILLERY','MULTI','OPERATIONAL','LOW','남아공 6×6 자주포. 사거리 40km. UAE·오만·인도 수출. 사막전에서 검증.',{armament:'155mm 45구경 곡사포',range:'40km(BB탄)',weight:'47톤',firstDeployed:'1988년'},['G6','로이카트','남아공','6×6','사막전'],'남아공군',undefined,80),

  // ── 나이지리아 (NIGERIA) ─────────────────────────────────────────────────
  w('nga-a001','알파제트 (나이지리아)','Alpha Jet (NAF Nigeria)','AIRCRAFT','FRANCE','OPERATIONAL','LOW','나이지리아 공군 알파제트 15기. 보코하람 대테러 작전. 지상공격·훈련 겸용.',{speed:'1,000km/h',firstDeployed:'1981년(나이지리아)',quantity:'15기'},['알파제트','나이지리아','보코하람','대테러','지상공격'],'나이지리아공군',undefined,70),

  // ── 에티오피아 (ETHIOPIA) ────────────────────────────────────────────────
  w('eth-a001','Su-27 (에티오피아)','Su-27 (ETAF Ethiopia)','AIRCRAFT','RUSSIA','OPERATIONAL','MED','에티오피아 공군 Su-27 7기. 에리트레아 전쟁·내전 사용. 아프리카 소수 Su-27 운용국.',{speed:'마하 2.35',firstDeployed:'1998년(에티오피아)',quantity:'7기'},['Su-27','에티오피아','아프리카','에리트레아전쟁'],'에티오피아공군',undefined,65),

  // ── 러시아 3차 추가 ───────────────────────────────────────────────────────
  w('rus3-a001','MiG-35 풀크럼-F','MiG-35 Fulcrum-F','AIRCRAFT','RUSSIA','OPERATIONAL','MED','MiG-29M 파생 4++ 세대. 러시아 내수+이집트 수출 시도. Zhuk-A AESA 레이더.',{speed:'마하 2.25',range:'2,000km',crew:'1명',armament:'30mm·R-77M·R-74',firstDeployed:'2019년'},['MiG-35','풀크럼-F','4++세대','이집트수출시도','AESA'],'러시아공군','https://en.wikipedia.org/wiki/Mikoyan_MiG-35',72),
  w('rus3-a002','Yak-141 (취소)','Yakovlev Yak-141 V/STOL (cancelled)','AIRCRAFT','RUSSIA','RETIRED','LOW','소련 초음속 수직이착륙 전투기. 냉전 붕괴로 취소. F-35B에 기술 일부 제공 의혹.',{speed:'마하 1.7',firstDeployed:'개발 취소(1992년)'},['Yak-141','VTOL','소련','취소','F-35B의혹'],'소련해군','https://en.wikipedia.org/wiki/Yakovlev_Yak-141',80),
  w('rus3-m001','Kh-15 핵 ASM','Kh-15 Nuclear Air-Launched Missile','CRUISE','RUSSIA','OPERATIONAL','HIGH','Tu-22M3 탑재 단거리 핵 ASM. 마하 5. 고고도 투하 후 폭발. 사거리 300km.',{range:'300km',speed:'마하 5',payload:'핵탄두(150kt) 또는 재래식',firstDeployed:'1988년',manufacturer:'Raduga'},['Kh-15','핵ASM','Tu-22M','마하5','소련'],'러시아공군',undefined,82),
  w('rus3-g001','T-55 (수출형)','T-55 MBT (Export)','GROUND','RUSSIA','RETIRED','MED','소련 냉전 전차. 세계 100개국+ 수출. 우크라이나·중동·아프리카 등 현재도 일부 운용.',{weight:'36톤',armament:'100mm D-10T2S',crew:'4명',speed:'50km/h',firstDeployed:'1958년',quantity:'세계 수천대(감소)'},['T-55','소련전차','100개국','수출','냉전'],'다수국가','https://en.wikipedia.org/wiki/T-55',92),
  w('rus3-g002','T-62 (러시아 예비)','T-62 MBT (Russia reserves)','GROUND','RUSSIA','OPERATIONAL','MED','소련 2세대 전차. 우크라이나 전선 재운용 확인. 창고에서 꺼낸 1960년대 전차.',{weight:'37.5톤',armament:'115mm U-5TS 활강포',crew:'4명',speed:'50km/h',firstDeployed:'1961년'},['T-62','소련','우크라이나재운용','창고','2세대'],'러시아예비군',undefined,88),
  w('rus3-g003','2S3 아카치야 자주포','2S3 Akatsiya 152mm SPH','ARTILLERY','RUSSIA','OPERATIONAL','HIGH','소련 152mm 자주곡사포. 우크라이나 전선 대량 운용. 사거리 18km(표준)/30km(RAP).',{armament:'152mm 2А33 곡사포',range:'18~30km',weight:'27.5톤',crew:'4명',firstDeployed:'1971년'},['2S3아카치야','우크라이나','152mm','소련자주포','러시아'],'러시아육군',undefined,88),
  w('rus3-m002','P-270 모스킷 대함','P-270 Moskit Sunburn ASM','SSM','RUSSIA','OPERATIONAL','HIGH','마하 2.9 초음속 대함미사일. 중국 구축함 탑재. 나토 최고위협 대함무기 중 하나.',{range:'250km',speed:'마하 2.9',payload:'150kg 반갑옷탄두',guidance:'능동레이더+INS',firstDeployed:'1984년',manufacturer:'라둥가'},['모스킷','P-270','Sunburn','초음속','중국탑재'],'러시아군',undefined,82),

  // ── 중국 3차 추가 ─────────────────────────────────────────────────────────
  w('chn3-a001','J-7 어검','J-7 Airguard (MiG-21 derivative)','AIRCRAFT','CHINA','RETIRED','MED','MiG-21 역설계 중국판. 세계 40개국 수출. J-7G AESA 최신형. 현재 감소 중.',{speed:'마하 2.2',firstDeployed:'1965년',quantity:'300기+(감소)'},['J-7','MiG-21역설계','중국','40개국수출','감소'],'PLAAF','https://en.wikipedia.org/wiki/Chengdu_J-7',85),
  w('chn3-a002','H-6N 공중급유·핵탑재','H-6N Refueling/Nuclear Capable Bomber','AIRCRAFT','CHINA','OPERATIONAL','HIGH','공중급유 수신·DF-21D 대함탄도미사일 탑재 H-6 개량형. 항모킬러 플랫폼.',{speed:'1,050km/h',range:'8,000km+(급유)',crew:'4명',armament:'DF-21D 대함탄도미사일',firstDeployed:'2019년',manufacturer:'시안항공'},['H-6N','공중급유','DF-21D','항모킬러','핵'],'PLAAF',undefined,78),
  w('chn3-n001','055형 2번함 이후','Type 055 Nanchang and sisterships','NAVAL','CHINA','OPERATIONAL','HIGH','055형 8척 건조 완료. 남창함·라싸함·다롄함 등. 세계 최강 구축함 중 하나.',{displacement:'12,000톤+',length:'180m',armament:'112셀 VLS',firstDeployed:'2020년',quantity:'8척+'},['055형','난창','라싸','다롄','8척'],'중국해군',undefined,82),
  w('chn3-n002','랴오닝 항모','Liaoning CV-16','NAVAL','CHINA','OPERATIONAL','HIGH','구소련 바랴그함 개조 첫 항모. J-15 탑재. 스키점프 발진. 훈련함+전투 능력 겸비.',{displacement:'60,900톤',length:'304.5m',crew:'2,000+비행단',armament:'HHQ-10·1130mm CIWS',firstDeployed:'2012년',quantity:'1척'},['랴오닝','CV-16','중국항모','J-15','바랴그개조'],'중국해군','https://en.wikipedia.org/wiki/Chinese_aircraft_carrier_Liaoning',90),
  w('chn3-n003','산둥 항모','Shandong CV-17','NAVAL','CHINA','OPERATIONAL','HIGH','중국 첫 자국 설계 항모. 랴오닝 개량형. 스키점프. J-15·J-35 혼합 탑재 가능.',{displacement:'70,000톤',length:'315m',crew:'2,000+비행단',armament:'HHQ-10·HHQ-7·1130mm',firstDeployed:'2019년',quantity:'1척'},['산둥','CV-17','자국설계항모','J-15','스키점프'],'중국해군','https://en.wikipedia.org/wiki/Chinese_aircraft_carrier_Shandong',88),
  w('chn3-m001','HQ-16B 지대공미사일','HQ-16B Lieying SAM','SAM','CHINA','OPERATIONAL','HIGH','러시아 Buk-M1 기반 중국판 중거리 SAM. 사거리 70km. 함정용 HHQ-16 파생.',{range:'70km',altitude:'25km',guidance:'세미능동+능동레이더',firstDeployed:'2011년(B형 2015)'},['HQ-16B','중국','중거리SAM','Buk기반','70km'],'PLA육군',undefined,80),
  w('chn3-m002','반잠·어뢰','China Yu-6 Torpedo','NAVAL','CHINA','OPERATIONAL','HIGH','중국 533mm 전자음향 유도 어뢰. 러시아 TEST-71 기반. 핵 또는 재래식 탄두. 잠수함 탑재.',{range:'45km',speed:'50노트',guidance:'능동/수동 소나',firstDeployed:'2005년',manufacturer:'중국선박공업'},['Yu-6','중국어뢰','TEST-71기반','잠수함','533mm'],'중국해군',undefined,75),

  // ── 북한 3차 추가 ─────────────────────────────────────────────────────────
  w('dprk3-a001','MiG-21비스 (북한)','MiG-21bis (KPAF)','AIRCRAFT','RUSSIA','OPERATIONAL','MED','북한 공군 150기 추정. 세계에서 가장 많은 MiG-21 운용국 중 하나. 유지 어려움.',{speed:'마하 2.05',firstDeployed:'1970년대(북한)',quantity:'150기(추정)'},['MiG-21비스','북한','150기','MiG-21최다보유','유지어려움'],'KPAF',undefined,60),
  w('dprk3-a002','MiG-23ML (북한)','MiG-23ML Flogger (KPAF)','AIRCRAFT','RUSSIA','OPERATIONAL','MED','북한 공군 MiG-23 56기 추정. 가변익. 부품 부족으로 가동률 낮음.',{speed:'마하 2.35',firstDeployed:'1980년대(북한)',quantity:'56기(추정)'},['MiG-23','북한','가변익','부품부족','KPAF'],'KPAF',undefined,55),
  w('dprk3-g001','포흥-호 자주방공포','M1992 SPAAG Twin 37mm','GROUND','DPRK','OPERATIONAL','MED','북한 37mm 쌍열 자주대공포. 자국 개발. 보병 방호 및 드론 대응.',{armament:'37mm 쌍열 기관포',crew:'4명',firstDeployed:'1990년대'},['M1992','북한방공','37mm','쌍열','자주대공'],'북한육군',undefined,55),
  w('dprk3-g002','선군-916 장갑차','Songun-916 APC','GROUND','DPRK','OPERATIONAL','MED','북한 독자 보병전투차. 30mm 기관포 추정. 외형은 BMP-3 유사.',{weight:'20톤(추정)',armament:'30mm 기관포+대전차미사일(추정)',crew:'3+7명(추정)',firstDeployed:'2010년대'},['선군-916','북한APC','BMP-3유사','독자개발'],'북한육군',undefined,40),
  w('dprk3-m001','KN-21 초음속 미사일 (추정)','KN-21 Hypersonic (Suspected)','SRBM','DPRK','SUSPECTED','HIGH','2022년 김정은 공개 신형 무기. 극초음속 주장. 실제 능력 확인 불가.',{speed:'마하 5+(주장)',firstDeployed:'추정'},['KN-21','북한극초음속','주장','실증불가','2022공개'],'DPRK',undefined,35),

  // ── 우크라이나 추가 ────────────────────────────────────────────────────────
  w('ukr2-a001','MiG-29 (우크라이나)','MiG-29MU1 (Ukrainian AF)','AIRCRAFT','RUSSIA','OPERATIONAL','MED','우크라이나 공군 MiG-29 50기+. 구소련 유산. F-16 도입 전까지 주력. 러시아 공습 방어.',{speed:'마하 2.25',firstDeployed:'1983년(우크라이나)',quantity:'50기+'},['MiG-29','우크라이나','소련유산','F-16대기','러시아공습'],'우크라이나공군',undefined,82),
  w('ukr2-a002','F-16AM (우크라이나)','F-16AM (Ukrainian AF - from donors)','AIRCRAFT','USA','OPERATIONAL','MED','2024년 네덜란드·덴마크 F-16 공여. 소수 전력화. 러시아 공습 요격에 활용.',{speed:'마하 2.0',firstDeployed:'2024년(우크라이나)',quantity:'20기+(증가)'},['F-16AM','우크라이나','네덜란드덴마크공여','러시아요격','2024'],'우크라이나공군',undefined,90),
  w('ukr2-m001','HUR 해상자살드론 (우크라이나)','MAGURA V5 Naval Suicide Drone','NAVAL','UKRAINE','OPERATIONAL','MED','마구라 V5 해상자폭드론. 케르치 대교·코네비체급 공격. 홍해 공격 개념 검증.',{range:'1,000km+',payload:'300kg 폭발물',speed:'80km/h',firstDeployed:'2022년'},['마구라V5','우크라이나','자폭드론','해상','케르치'],'우크라이나군',undefined,88),
  w('ukr2-m002','스투가나-P 대전차미사일','Stuhna-P ATGM (Ukraine)','GROUND','UKRAINE','OPERATIONAL','MED','우크라이나 독자 레이저 유도 대전차미사일. T-90 포함 러시아 전차 격파 다수.',{range:'5,500m',payload:'탠덤 HEAT',guidance:'레이저+반자동',firstDeployed:'2011년'},['스투가나','우크라이나ATGM','T-90격파','레이저','독자'],'우크라이나군',undefined,85),
  w('ukr2-m003','보그다나 155mm 자주포','Bogdana 155mm SPH (Ukraine)','ARTILLERY','UKRAINE','OPERATIONAL','MED','우크라이나 독자 155mm 바퀴형 자주포. 사거리 42km. NATO 탄 호환. 소량 생산.',{armament:'155mm 52구경',range:'42km',firstDeployed:'2018년'},['보그다나','우크라이나','155mm','독자','NATO탄'],'우크라이나군',undefined,82),

  // ── 스웨덴·핀란드 추가 ─────────────────────────────────────────────────────
  w('swe2-a001','그리펜 C/D (스웨덴 현역)','Saab JAS 39C/D Gripen (SwAF)','AIRCRAFT','SWEDEN','OPERATIONAL','LOW','스웨덴 공군 70기. 그리펜 E 전환 중. NATO 가입 후 표준화 예정.',{speed:'마하 2.0',firstDeployed:'1997년',quantity:'70기'},['그리펜C/D','스웨덴','NATO','그리펜E전환','70기'],'스웨덴공군',undefined,92),
  w('swe2-m001','아처 포병 시스템','Archer Self-Propelled Howitzer','ARTILLERY','SWEDEN','OPERATIONAL','LOW','볼보 트럭 기반 155mm 자동화 자주포. 사격 후 이동(shoot-and-scoot). 노르웨이 공동.',{armament:'155mm 52구경 FH77BD',range:'40km(표준)/60km(BB)',firstDeployed:'2009년(스웨덴)',manufacturer:'BAE시스템즈'},['아처','스웨덴','155mm','자동화','shoot-and-scoot'],'스웨덴군','https://en.wikipedia.org/wiki/Archer_(artillery_system)',90),
  w('fin2-m001','K9 천둥 (핀란드2차)','K9A1 Thunder Batch 2 (FDF)','ARTILLERY','ROK','OPERATIONAL','LOW','핀란드 K9 2차 도입. 총 48문. 러시아 국경 800km 방어의 핵심 화력.',{armament:'155mm 52구경',range:'54km',firstDeployed:'2021년(핀란드)',quantity:'48문(총)'},['K9','핀란드2차','48문','러시아국경','한국방산'],'핀란드군',undefined,92),

  // ── 호주·뉴질랜드 추가 ─────────────────────────────────────────────────────
  w('aus3-a001','슈퍼호넷 F/A-18F (호주)','F/A-18F Super Hornet (RAAF)','AIRCRAFT','USA','OPERATIONAL','LOW','호주 공군 슈퍼호넷 24기. F-111 퇴역 대안으로 도입. F-35A 도입 전 유지.',{speed:'마하 1.8',firstDeployed:'2010년(호주)',quantity:'24기'},['F-18F','호주','슈퍼호넷','F-111대체','RAAF'],'RAAF',undefined,92),
  w('nzl-a001','P-8A 포세이돈 (뉴질랜드)','P-8A Poseidon (RNZAF)','AIRCRAFT','USA','OPERATIONAL','LOW','뉴질랜드 공군 P-8A 4기. P-3K2 오리온 대체. 남태평양 해상감시.',{speed:'907km/h',firstDeployed:'2023년(뉴질랜드)',quantity:'4기'},['P-8A','뉴질랜드','P-3대체','남태평양','해상감시'],'RNZAF',undefined,92),
]


