import type { WeaponSystem } from './weapons'
const w = (id:string,name:string,nameEng:string,cat:WeaponSystem['category'],origin:WeaponSystem['origin'],status:WeaponSystem['status'],threat:WeaponSystem['threatRating'],desc:string,specs:WeaponSystem['specs'],tags:string[],sources:string|string[],wiki?:string,conf=75): WeaponSystem=>({id,name,nameEng,category:cat,origin,status,threatRating:threat,description:desc,detail:`## ${nameEng}\n\n${desc}\n\n### 주요 제원\n${Object.entries(specs).filter(([,v])=>v).map(([k,v])=>`- ${k}: ${v}`).join('\n')}`,specs,confidence:conf,lastUpdated:'2026-07-01',relatedIntelIds:[],tags,sources:Array.isArray(sources)?sources:[sources],wikiUrl:wiki})

export const WEAPONS_EXP_MENA: WeaponSystem[] = [
  // ── 사우디아라비아 (SAUDI ARABIA) ─────────────────────────────────────────
  w('sau-a001','F-15SA 사우디 이글','F-15SA Strike Eagle (RSAF)','AIRCRAFT','USA','OPERATIONAL','LOW','사우디 공군 84대. F-15S 업그레이드형. 예멘 내전 공습 주력. APG-63V3 AESA.',{speed:'마하 2.5',range:'3,900km',crew:'2명',armament:'JASSM·AIM-120·하푼',firstDeployed:'2016년',quantity:'84기'},['F-15SA','사우디','이글','예멘','RSAF'],'RSAF',undefined,90),
  w('sau-a002','타이푼 (사우디)','Eurofighter Typhoon (RSAF Saudi)','AIRCRAFT','MULTI','OPERATIONAL','LOW','사우디 공군 타이푼 72대. 2국 협정 논란 뚫고 2009~2017년 인도. 미티어·스톰섀도.',{speed:'마하 2.0',range:'2,900km',firstDeployed:'2009년(사우디)',quantity:'72기'},['타이푼','사우디','RSAF','예멘','72기'],'RSAF',undefined,88),
  w('sau-a003','토네이도 IDS (사우디)','Panavia Tornado IDS (RSAF)','AIRCRAFT','MULTI','RETIRED','LOW','사우디 공군 구형 토네이도. 예멘 공습 사용. 타이푼·F-15SA로 대체 중.',{speed:'마하 2.2',range:'3,890km',crew:'2명',firstDeployed:'1986년(사우디)',quantity:'50기+(감소)'},['토네이도','사우디','구형','예멘','타이푼대체'],'RSAF',undefined,82),
  w('sau-m001','천궁-II M-SAM (사우디)','Cheongung-II M-SAM (Saudi Arabia)','SAM','ROK','OPERATIONAL','LOW','사우디 천궁-II 도입. 수억달러 계약. 한국 방산 수출 최대 단일 계약 중 하나.',{range:'40km',altitude:'25km',guidance:'능동레이더',firstDeployed:'2023년(사우디)',manufacturer:'LIG넥스원'},['천궁-II','사우디','M-SAM','한국방산','최대수출'],'사우디군',undefined,88),
  w('sau-n001','알 리야드급 호위함','Al Riyadh-class Frigate (Saudi)','NAVAL','MULTI','OPERATIONAL','LOW','프랑스 스텔스 호위함. ASTER-15·엑조세 MM40·76mm. 3척. 홍해·걸프 방어.',{displacement:'4,650톤',length:'133m',crew:'145명',armament:'ASTER-15·MM40 엑조세·76mm',firstDeployed:'2002년',quantity:'3척'},['알리야드','사우디','스텔스호위함','ASTER-15','홍해'],'사우디해군',undefined,82),
  w('sau-g001','레오파르트 2A7+ (사우디)','Leopard 2A7+ (Saudi National Guard)','GROUND','GERMANY','OPERATIONAL','LOW','사우디 국가방위군 레오파르트 2A7+ 200대. 예멘 국경 방어.',{weight:'64.5톤',armament:'120mm L/55',firstDeployed:'2015년(사우디)',quantity:'200대'},['레오파르트2A7','사우디','국가방위군','예멘','국경방어'],'사우디군',undefined,82),
  w('sau-m002','AGM-84 하푼 (사우디)','AGM-84 Harpoon (RSAF)','ASM','USA','OPERATIONAL','LOW','사우디 공군 F-15SA·토네이도 탑재. 이란 해상전력 억제.',{range:'280km',speed:'마하 0.85',firstDeployed:'사우디도입'},['하푼','사우디','이란억제','F-15SA','대함'],'RSAF',undefined,85),

  // ── 아랍에밀리트 (UAE) ────────────────────────────────────────────────────
  w('uae-a001','F-16E/F 블록 60 사막팰컨','F-16E/F Block 60 Desert Falcon (UAEAF)','AIRCRAFT','USA','OPERATIONAL','LOW','UAE 전용 F-16 최고 사양. APG-80 AESA·내부 FLIR·증가 연료. 80기.',{speed:'마하 2.0',range:'4,220km',crew:'1~2명',armament:'AIM-120C·JDAM·하푼',firstDeployed:'2005년',quantity:'80기'},['F-16E/F','사막팰컨','UAE','블록60','APG-80'],'UAE공군','https://en.wikipedia.org/wiki/General_Dynamics_F-16_Fighting_Falcon',92),
  w('uae-a002','라팔 (UAE)','Dassault Rafale (UAE AF)','AIRCRAFT','FRANCE','OPERATIONAL','LOW','UAE 라팔 80대 계약. 2023년 초도 인도. F-35 불발 후 대안. 미티어 탑재.',{speed:'마하 1.8',firstDeployed:'2023년(UAE)',quantity:'80기'},['라팔','UAE','F-35불발','다소','미티어'],'UAE공군',undefined,90),
  w('uae-m001','천궁-II M-SAM (UAE)','Cheongung-II M-SAM (UAE)','SAM','ROK','OPERATIONAL','LOW','UAE 천궁-II 최초 수출국. 2022년 4조원 계약. 한국 방산 사상 최대 수출.',{range:'40km',guidance:'능동레이더',firstDeployed:'2022년(UAE)',manufacturer:'LIG넥스원'},['천궁-II','UAE','최초수출국','4조원','한국최대수출'],'UAE군',undefined,90),
  w('uae-m002','르클레르 전차 (UAE)','Leclerc MBT (UAE Army)','GROUND','FRANCE','OPERATIONAL','LOW','UAE 르클레르 436대. 세계 최대 르클레르 수출 계약. 사막 운용 최적화.',{weight:'56.5톤',armament:'120mm 활강포',firstDeployed:'1994년(UAE)',quantity:'436대'},['르클레르','UAE','436대','세계최대수출','사막'],'UAE군',undefined,88),

  // ── 이집트 (EGYPT) ─────────────────────────────────────────────────────────
  w('egy-a001','라팔 (이집트)','Dassault Rafale (EAF Egypt)','AIRCRAFT','FRANCE','OPERATIONAL','LOW','이집트 라팔 54대. 아프리카·중동 최초 라팔 도입국. 2015년 계약.',{speed:'마하 1.8',firstDeployed:'2015년(이집트)',quantity:'54기'},['라팔','이집트','아프리카최초','다소','2015'],'이집트공군',undefined,90),
  w('egy-a002','F-16C/D (이집트)','F-16C/D (EAF Egypt)','AIRCRAFT','USA','OPERATIONAL','LOW','이집트 공군 220기+. 중동 최대 F-16 보유국 중 하나. 리비아·가자 억제.',{speed:'마하 2.0',firstDeployed:'1982년(이집트)',quantity:'220기+'},['F-16','이집트','220기','중동최대','대형'],'이집트공군',undefined,88),
  w('egy-m001','K9 천둥 (이집트)','K9 Thunder (Egyptian Army)','ARTILLERY','ROK','OPERATIONAL','LOW','이집트 K9 200문 계약. 2023년 계약. 리비아 국경·수단 억제.',{armament:'155mm',range:'54km',firstDeployed:'2024년(이집트)',quantity:'200문(계획)'},['K9','이집트','200문','한국방산','리비아'],'이집트군',undefined,82),
  w('egy-n001','미스트랄급 헬기항모 (이집트)','Mistral-class LHD (Egyptian Navy)','NAVAL','FRANCE','OPERATIONAL','LOW','프랑스 미스트랄급 2척. 이집트가 러시아 대신 구매. 지중해·홍해 전략 투사.',{displacement:'21,300톤',length:'199m',armament:'시마타르SAM·20mm',firstDeployed:'2015년(이집트)',quantity:'2척'},['미스트랄','이집트','헬기항모','러시아대신','프랑스'],'이집트해군','https://en.wikipedia.org/wiki/Mistral-class_amphibious_assault_ship',90),

  // ── 카타르 (QATAR) ─────────────────────────────────────────────────────────
  w('qat-a001','라팔 EQ (카타르)','Dassault Rafale EQ (QAF)','AIRCRAFT','FRANCE','OPERATIONAL','LOW','카타르 라팔 36대. 엑조세·SCALP 탑재. 중동 최고 사양 라팔.',{speed:'마하 1.8',firstDeployed:'2021년(카타르)',quantity:'36기'},['라팔EQ','카타르','SCALP','엑조세','중동'],'카타르공군',undefined,92),
  w('qat-a002','타이푼 (카타르)','Eurofighter Typhoon (QAF)','AIRCRAFT','MULTI','OPERATIONAL','LOW','카타르 타이푼 24대. 라팔과 복합 운용. 걸프 억제력.',{speed:'마하 2.0',firstDeployed:'2021년(카타르)',quantity:'24기'},['타이푼','카타르','라팔병행','걸프'],'카타르공군',undefined,88),

  // ── 쿠웨이트 (KUWAIT) ─────────────────────────────────────────────────────
  w('kwt-a001','유로파이터 타이푼 (쿠웨이트)','Eurofighter Typhoon (Kuwaiti AF)','AIRCRAFT','MULTI','OPERATIONAL','LOW','쿠웨이트 타이푼 28대. 스톰섀도·BVRAAM. 걸프 방어.',{speed:'마하 2.0',firstDeployed:'2020년(쿠웨이트)',quantity:'28기'},['타이푼','쿠웨이트','걸프','스톰섀도'],'쿠웨이트공군',undefined,85),
  w('kwt-m001','BMP-3 (쿠웨이트)','BMP-3 IFV (Kuwait)','GROUND','RUSSIA','OPERATIONAL','LOW','쿠웨이트 BMP-3 415대. 걸프전 이후 대규모 도입. 사막 운용.',{weight:'18.7톤',armament:'100mm+30mm',crew:'3+7명',firstDeployed:'1993년(쿠웨이트)',quantity:'415대'},['BMP-3','쿠웨이트','415대','사막','걸프전후'],'쿠웨이트군',undefined,85),

  // ── 바레인 (BAHRAIN) ─────────────────────────────────────────────────────
  w('bhr-a001','F-16C/D (바레인)','F-16C/D Block 40 (Bahrain AF)','AIRCRAFT','USA','OPERATIONAL','LOW','바레인 공군 F-16 22기. 미 5함대 모국. 페르시아만 방어.',{firstDeployed:'1990년(바레인)',quantity:'22기'},['F-16','바레인','5함대','페르시아만'],'바레인공군',undefined,85),

  // ── 이란 추가 ─────────────────────────────────────────────────────────────
  w('irn-a001','F-14A 톰캣 (이란)','F-14A Tomcat (IRIAF Iran)','AIRCRAFT','USA','OPERATIONAL','MED','이란 혁명 전 미국에서 도입한 F-14A. 80기 도입·30기 운용 추정. AIM-54 피닉스 보유.',{speed:'마하 2.34',range:'2,960km',crew:'2명',armament:'AIM-54·AIM-7·AIM-9',firstDeployed:'1976년(이란)',quantity:'30기(추정)'},['F-14A','이란','톰캣','AIM-54','혁명전도입'],'IRIAF',undefined,60),
  w('irn-a002','MiG-29 (이란)','MiG-29 (IRIAF Iran)','AIRCRAFT','RUSSIA','OPERATIONAL','MED','이란 MiG-29 25기. 걸프전 이라크 도피기 접수. 구소련제.',{speed:'마하 2.25',firstDeployed:'1991년(이란)',quantity:'25기(추정)'},['MiG-29','이란','이라크도피기','소련제'],'IRIAF',undefined,60),
  w('irn-m001','사에게흐-2 극초음속','Saeqeh-2 Hypersonic Missile (Claimed)','CRUISE','IRAN','SUSPECTED','HIGH','이란 주장 극초음속 미사일. 마하 14. 실제 능력 의문. 이스라엘 공격 시 사용 주장.',{range:'1,400km(주장)',speed:'마하 14(주장)',firstDeployed:'2023년(주장)'},['사에게흐-2','이란','주장극초음속','이스라엘','의혹'],'이란IRGC',undefined,40),
  w('irn-m002','가더 대함미사일','Qader Anti-Ship Cruise Missile','SSM','IRAN','OPERATIONAL','HIGH','이란 국산 대함순항미사일. 사거리 300km. 호르무즈 해협 해상통제 억제력.',{range:'300km',speed:'아음속',payload:'200kg',firstDeployed:'2011년',manufacturer:'이란항공우주'},['가더','이란대함','호르무즈','대함억제','국산'],'이란해군',undefined,72),
  w('irn-m003','에마드 MRBM','Emad MRBM (Iran)','IRBM','IRAN','OPERATIONAL','CRITICAL','이란 정밀유도 중거리 탄도미사일. 사거리 1,700km. 이스라엘·사우디 전역 타격권.',{range:'1,700km',payload:'750kg',propulsion:'액체추진',guidance:'GPS+INS 정밀',firstDeployed:'2015년'},['에마드','이란MRBM','이스라엘위협','정밀','1700km'],'이란IRGC',undefined,78),
  w('irn-a003','카라르 전투드론','Karrar Combat UAV (Iran)','UAV','IRAN','OPERATIONAL','HIGH','이란 국산 제트추진 전투드론. 마하 0.9. 대함·공대지 미사일 탑재. 러시아 이전 예상.',{speed:'900km/h',range:'3,000km+',payload:'대함·공대지미사일',firstDeployed:'2010년'},['카라르','이란드론','제트추진','러시아이전','전투UAV'],'이란IRGC',undefined,60),

  // ── 이라크 (IRAQ) ─────────────────────────────────────────────────────────
  w('irq-a001','F-16IQ (이라크)','F-16IQ Fighting Falcon (IrAF)','AIRCRAFT','USA','OPERATIONAL','LOW','이라크 공군 F-16IQ 33기. ISIS 격퇴 주력. 미국 지원 재건 전력.',{firstDeployed:'2015년(이라크)',quantity:'33기'},['F-16IQ','이라크','ISIS','재건','미국지원'],'이라크공군',undefined,82),
  w('irq-a002','Su-25 (이라크)','Su-25 Grach (IrAF)','AIRCRAFT','RUSSIA','OPERATIONAL','MED','이라크 공군 Su-25 5기+. 2014년 러시아 긴급 지원. ISIS 대응 CAS 임무.',{speed:'950km/h',firstDeployed:'2014년(이라크)',quantity:'5기+'},['Su-25','이라크','러시아지원','ISIS','CAS'],'이라크공군',undefined,72),

  // ── 시리아 (SYRIA) ─────────────────────────────────────────────────────────
  w('syr-a001','Su-22M4 피터 (시리아)','Su-22M4 Fitter (SyAAF)','AIRCRAFT','RUSSIA','OPERATIONAL','HIGH','시리아 공군 구형 소련제 전폭기. 화학무기 투하 의혹. 미국·이스라엘 공격 목표.',{speed:'마하 1.7',firstDeployed:'1987년(시리아)',quantity:'25기(추정)'},['Su-22','시리아','화학무기의혹','미공격','소련제'],'시리아공군',undefined,60),
  w('syr-m001','S-300PM2 판파보리트 (시리아)','S-300PM2 (Syria)','SAM','RUSSIA','OPERATIONAL','HIGH','러시아 2018년 제공 S-300PM2. 이스라엘 공습 억제 역할. 효과 제한적 평가.',{range:'250km',altitude:'27km',firstDeployed:'2018년(시리아)',manufacturer:'알마즈-안테이'},['S-300PM2','시리아','러시아지원','이스라엘억제','제한적효과'],'시리아군',undefined,65),

  // ── 리비아 (LIBYA) ────────────────────────────────────────────────────────
  w('lby-uav001','바이락타르 TB2 (리비아)','Bayraktar TB2 (Libya, Turkey-supplied)','UAV','TURKEY','OPERATIONAL','MED','터키가 트리폴리 정부에 공급한 TB2. 리비아 내전 결정적 역할. 러시아 판체르-S1 격파.',{range:'1,500km',armament:'MAM-C/L',firstDeployed:'2019년(리비아)'},['TB2','리비아','터키공급','내전','판체르격파'],'리비아GNA',undefined,85),

  // ── 모로코 (MOROCCO) ──────────────────────────────────────────────────────
  w('mar-a001','F-16C/D (모로코)','F-16C/D Block 52+ (RMAF)','AIRCRAFT','USA','OPERATIONAL','LOW','모로코 공군 F-16 23기. 추가 25기 계약. 알제리·사헬 억제.',{firstDeployed:'2011년(모로코)',quantity:'23기+25기(추가)'},['F-16','모로코','블록52+','알제리','사헬'],'모로코공군',undefined,85),
  w('mar-a002','라팔 (모로코)','Dassault Rafale (RMAF Morocco)','AIRCRAFT','FRANCE','OPERATIONAL','LOW','모로코 라팔 24기 계약. 2024년 인도 시작. 아프리카 두번째 라팔 운용국.',{firstDeployed:'2024년(모로코)',quantity:'24기'},['라팔','모로코','아프리카','24기','다소'],'모로코공군',undefined,88),

  // ── 알제리 (ALGERIA) ──────────────────────────────────────────────────────
  w('alg-a001','Su-30MKA (알제리)','Su-30MKA (Algerian AF)','AIRCRAFT','RUSSIA','OPERATIONAL','MED','알제리 공군 Su-30MKA 44기. 러시아제 복좌 전투기. 모로코 대응.',{speed:'마하 2.0',firstDeployed:'2007년(알제리)',quantity:'44기'},['Su-30MKA','알제리','러시아제','모로코대응','복좌'],'알제리공군',undefined,80),
  w('alg-m001','S-400 (알제리 협상)','S-400 (Algeria - in negotiation)','SAM','RUSSIA','DEVELOPMENT','MED','알제리 S-400 도입 협상 중. 실현 시 NATO 우려. 아프리카 최초 S-400.',{range:'400km',firstDeployed:'협상 중'},['S-400','알제리','협상중','아프리카최초','NATO우려'],'알제리군',undefined,50),

  // ── 예멘 후티 (HOUTHI) ────────────────────────────────────────────────────
  w('hth-m001','수수미 대함순항미사일 (후티)','Houthi Al-Mandeb ASM','SSM','IRAN','OPERATIONAL','HIGH','이란 지원 후티 반군 대함·대지 미사일. 홍해 상선·군함 공격. 팔레스타인 연대 명목.',{range:'500km+(추정)',payload:'250kg',firstDeployed:'2023년(홍해공격)'},['후티','홍해공격','이란지원','대함','상선공격'],'후티반군',undefined,78),
  w('hth-uav001','샤헤드 드론 (후티)','Houthi Shahed-136 variant','UAV','IRAN','OPERATIONAL','HIGH','이란제 샤헤드 계열 드론 후티 운용. 사우디·이스라엘·홍해 상선 공격.',{range:'2,000km',payload:'40~50kg',firstDeployed:'2019년(후티)'},['샤헤드후티','이란제','홍해','사우디공격','상선'],'후티반군',undefined,75),
]


