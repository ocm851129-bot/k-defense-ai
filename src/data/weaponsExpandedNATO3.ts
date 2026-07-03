import type { WeaponSystem } from './weapons'
const w = (id:string,name:string,nameEng:string,cat:WeaponSystem['category'],origin:WeaponSystem['origin'],status:WeaponSystem['status'],threat:WeaponSystem['threatRating'],desc:string,specs:WeaponSystem['specs'],tags:string[],sources:string|string[],wiki?:string,conf=85): WeaponSystem=>({id,name,nameEng,category:cat,origin,status,threatRating:threat,description:desc,detail:`## ${nameEng}\n\n${desc}\n\n### 주요 제원\n${Object.entries(specs).filter(([,v])=>v).map(([k,v])=>`- ${k}: ${v}`).join('\n')}`,specs,confidence:conf,lastUpdated:'2026-07-01',relatedIntelIds:[],tags,sources:Array.isArray(sources)?sources:[sources],wikiUrl:wiki})

export const WEAPONS_EXP_NATO3: WeaponSystem[] = [
  // ── 캐나다 (CANADA) ───────────────────────────────────────────────────────
  w('can-a001','CF-18 호넷','CF-18A/B Hornet (RCAF)','AIRCRAFT','MULTI','OPERATIONAL','LOW','캐나다 공군 주력 전투기. F/A-18A 기반. 2025년 F-35A로 교체 예정.',{speed:'마하 1.8',range:'2,002km',crew:'1~2명',firstDeployed:'1982년(캐나다)',quantity:'75기→감소'},['CF-18','캐나다','호넷','F-35대체'],'RCAF','https://en.wikipedia.org/wiki/McDonnell_Douglas_CF-18_Hornet',90),
  w('can-a002','F-35A (캐나다)','F-35A Lightning II (RCAF)','AIRCRAFT','USA','OPERATIONAL','LOW','캐나다 F-35A 88대 계약. 2026년 인도 시작. CF-18 완전 대체.',{speed:'마하 1.6',range:'2,200km',firstDeployed:'2026년(캐나다)',quantity:'88기 계획'},['F-35A','캐나다','CF-18대체','RCAF'],'RCAF',undefined,90),
  w('can-n001','해리파 급 호위함 (CSC)','Halifax-class Frigate (CSC upgrade)','NAVAL','MULTI','OPERATIONAL','LOW','캐나다 해군 표준 호위함. 12척. SM-2·VL-ASROC 업그레이드 중. CSC 프로젝트.',{displacement:'4,800톤',length:'134.1m',crew:'225명',armament:'SM-2·VL-ASROC·57mm·Mk41 VLS',firstDeployed:'1992년',quantity:'12척'},['해리파스급','캐나다','호위함','SM-2','CSC'],'RCN','https://en.wikipedia.org/wiki/Halifax-class_frigate',88),
  w('can-m001','LAV 6.0 경장갑차','LAV 6.0 Light Armoured Vehicle','GROUND','MULTI','OPERATIONAL','LOW','캐나다·사우디·칠레 운용 8×8 차륜형 장갑차. LAV III 업그레이드. 사우디 1만5천대 수출.',{weight:'32.7톤',armament:'25mm M242·TOW ATGM',crew:'3명+7명',speed:'100km/h',firstDeployed:'2017년(6.0)'},['LAV6','경장갑차','캐나다','사우디수출','8×8'],'캐나다군',undefined,88),

  // ── 스페인 (SPAIN) ────────────────────────────────────────────────────────
  w('esp-a001','유로파이터 타이푼 (스페인)','Eurofighter Typhoon (SpAF)','AIRCRAFT','MULTI','OPERATIONAL','LOW','스페인 공군 73기. 미티어·IRIS-T·KEPD350 탑재. 모레혼기지 주력.',{speed:'마하 2.0',range:'2,900km',crew:'1~2명',firstDeployed:'2003년(스페인)',quantity:'73기'},['타이푼','스페인','유로파이터','73기'],'스페인공군',undefined,92),
  w('esp-n001','胡안 카를로스 I 다목적함','Juan Carlos I (L-61) LHD/CV','NAVAL','MULTI','OPERATIONAL','LOW','스페인 다목적 강습상륙함. 스키점프 갑판. F-35B 탑재 가능. 전략 투사 핵심.',{displacement:'27,082톤',length:'231m',crew:'900명+상륙대',armament:'CIWS·12.7mm',firstDeployed:'2010년',quantity:'1척'},['후안카를로스I','스페인항모','F-35B','강습상륙함'],'스페인해군','https://en.wikipedia.org/wiki/SPS_Juan_Carlos_I',90),
  w('esp-m001','레오파르트 2E 전차','Leopard 2E MBT (Spain)','GROUND','GERMANY','OPERATIONAL','LOW','스페인 도입 레오파르트 2E. 독일 2A6 대비 에어컨·추가 방호 강화. 235대.',{weight:'62톤',armament:'120mm L/55 활강포',crew:'4명',speed:'72km/h',firstDeployed:'2003년(스페인)',quantity:'235대'},['레오파르트2E','스페인','독일전차','235대'],'스페인육군',undefined,90),

  // ── 그리스 (GREECE) ───────────────────────────────────────────────────────
  w('grc-a001','F-16C 블록 52+ (그리스)','F-16C/D Block 52+ (HAF)','AIRCRAFT','USA','OPERATIONAL','LOW','그리스 공군 150대. 터키와의 에게해 긴장에서 핵심 전력. VIPER 업그레이드 진행 중.',{speed:'마하 2.0',range:'3,200km',crew:'1~2명',firstDeployed:'2003년(블록52+)',quantity:'150기'},['F-16','그리스','블록52+','에게해','터키대응'],'그리스공군',undefined,90),
  w('grc-a002','라팔 F3R (그리스)','Dassault Rafale F3R (HAF)','AIRCRAFT','FRANCE','OPERATIONAL','LOW','그리스 2021년 라팔 18대 긴급 계약. 24대 추가 발주. 터키 S-400 도입 후 급히 확보.',{speed:'마하 1.8',range:'3,700km',crew:'1~2명',firstDeployed:'2021년(그리스)',quantity:'42기(계획)'},['라팔','그리스','터키대응','에게해','다소'],'그리스공군',undefined,92),
  w('grc-n001','히드라급 호위함','Hydra-class MEKO-200 Frigate','NAVAL','MULTI','OPERATIONAL','LOW','독일 MEKO 200 기반 그리스 호위함. Mk41 VLS·하푼·SM-1MR. 4척 운용.',{displacement:'3,400톤',length:'117m',crew:'173명',armament:'SM-1MR·하푼·76mm·Mk41 VLS',firstDeployed:'1992년',quantity:'4척'},['히드라급','그리스','MEKO200','SM-1MR','호위함'],'그리스해군',undefined,85),

  // ── 노르웨이 (NORWAY) ─────────────────────────────────────────────────────
  w('nor-a001','F-35A (노르웨이)','F-35A Lightning II (RNoAF)','AIRCRAFT','USA','OPERATIONAL','LOW','노르웨이 공군 52대. 2023년 52대 완전 배치. F-16 완전 대체.',{speed:'마하 1.6',range:'2,200km',firstDeployed:'2017년(노르웨이)',quantity:'52기'},['F-35A','노르웨이','F-16대체','RNoAF'],'RNoAF',undefined,97),
  w('nor-m001','NSM 해군 타격미사일','Naval Strike Missile NSM','SSM','NATO','OPERATIONAL','LOW','노르웨이 독자 스텔스 대함미사일. 사거리 185km. 미 해군 LCS 탑재 채택. 저고도 시스키밍.',{range:'185km',speed:'아음속',payload:'120kg 이중목적탄두',guidance:'INS+IIR+GPS',firstDeployed:'2007년',manufacturer:'콩스버그'},['NSM','노르웨이','스텔스대함','LCS탑재','콩스버그'],'노르웨이군','https://en.wikipedia.org/wiki/Naval_Strike_Missile',95),
  w('nor-m002','JSM 합동타격미사일','Joint Strike Missile (F-35 Internal)','ASM','NATO','OPERATIONAL','LOW','F-35 내부 탑재 대함·대지 미사일. NSM 파생. 사거리 280km. F-35 유일 내부 대함미사일.',{range:'280km',guidance:'INS+IIR+GPS',firstDeployed:'2023년',manufacturer:'콩스버그'},['JSM','합동타격','F-35내부','대함','노르웨이'],'RNoAF','https://en.wikipedia.org/wiki/Joint_Strike_Missile',90),
  w('nor-n001','프리초프 난센급 호위함','Fridtjof Nansen-class Frigate','NAVAL','NATO','OPERATIONAL','LOW','이지스 SPY-1F 탑재 노르웨이 호위함. SM-2·ESSM·NSM. 5척 운용.',{displacement:'5,290톤',length:'134m',crew:'120명',armament:'SM-2·ESSM·NSM·57mm·Oto76mm',firstDeployed:'2006년',quantity:'5척'},['난센급','노르웨이','이지스','SM-2','호위함'],'노르웨이해군',undefined,92),

  // ── 덴마크 (DENMARK) ─────────────────────────────────────────────────────
  w('dnk-a001','F-35A (덴마크)','F-35A Lightning II (RDAF)','AIRCRAFT','USA','OPERATIONAL','LOW','덴마크 공군 27대. 2023년 초도배치. F-16 완전 대체 예정.',{speed:'마하 1.6',firstDeployed:'2023년(덴마크)',quantity:'27기'},['F-35A','덴마크','RDAF','F-16대체'],'RDAF',undefined,95),
  w('dnk-n001','아이버흐비트펠트급 호위함','Iver Huitfeldt-class Frigate','NAVAL','MULTI','OPERATIONAL','LOW','덴마크 독자 설계 이지스급 호위함. SM-2·ESSM·하푼. 3척. 우수한 가성비로 주목.',{displacement:'6,640톤',length:'138.7m',crew:'165명',armament:'SM-2·ESSM·하푼·76mm',firstDeployed:'2011년',quantity:'3척'},['아이버흐비트펠트','덴마크','이지스급','SM-2','호위함'],'덴마크해군','https://en.wikipedia.org/wiki/Iver_Huitfeldt-class_frigate',90),

  // ── 네덜란드 (NETHERLANDS) ───────────────────────────────────────────────
  w('nld-n001','드 제번 프로빈치엔급 호위함','De Zeven Provinciën-class APAR Frigate','NAVAL','MULTI','OPERATIONAL','LOW','네덜란드 방공 호위함. APAR·SM-2·ESSM. 4척. 독일·네덜란드 공동 개발.',{displacement:'6,050톤',length:'144.2m',crew:'232명',armament:'SM-2·ESSM·하푼·Mk41 VLS',firstDeployed:'2002년',quantity:'4척'},['드제번','네덜란드','APAR호위함','SM-2','Mk41VLS'],'네덜란드해군','https://en.wikipedia.org/wiki/De_Zeven_Prov%C3%ABnci%C3%ABn-class_frigate',90),

  // ── 벨기에 (BELGIUM) ─────────────────────────────────────────────────────
  w('bel-a001','F-35A (벨기에)','F-35A Lightning II (BAF)','AIRCRAFT','USA','OPERATIONAL','LOW','벨기에 공군 34대. 2025년 배치. F-16 대체. 핵공유 B61-12 임무.',{speed:'마하 1.6',firstDeployed:'2025년(벨기에)',quantity:'34기'},['F-35A','벨기에','핵공유','B61-12','BAF'],'BAF',undefined,92),

  // ── 핀란드 (FINLAND) ─────────────────────────────────────────────────────
  w('fin-a001','F-35A (핀란드)','F-35A Lightning II (FiAF)','AIRCRAFT','USA','DEVELOPMENT','LOW','핀란드 공군 64대. NATO 가입 후 첫 서방 전투기. F/A-18 대체.',{speed:'마하 1.6',firstDeployed:'2026년+(예정)',quantity:'64기'},['F-35A','핀란드','NATO','FiAF','F-18대체'],'FiAF',undefined,90),
  w('fin-m001','K9 천둥 (핀란드)','K9 Thunder (Finnish Army)','ARTILLERY','ROK','OPERATIONAL','LOW','핀란드 도입 K9 자주포. 48문. 러시아 접경 방어 핵심. 한국 방산 수출 성공.',{armament:'155mm 52구경',range:'54km',firstDeployed:'2018년(핀란드)',quantity:'48문'},['K9','핀란드','155mm','자주포','한국방산'],'핀란드육군',undefined,95),

  // ── 에스토니아·라트비아·리투아니아 (발트3국) ──────────────────────────────
  w('est-m001','K9 천둥 (에스토니아)','K9 Thunder (Estonian Army)','ARTILLERY','ROK','OPERATIONAL','LOW','에스토니아 K9 12문 도입. 러시아 국경 방어. 한국 방산의 유럽 진출.',{armament:'155mm',range:'54km',firstDeployed:'2022년',quantity:'12문'},['K9','에스토니아','발트','러시아대응','한국방산'],'에스토니아군',undefined,92),
  w('lat-m001','HIMARS (라트비아)','M142 HIMARS (Latvian Army)','MLRS','USA','OPERATIONAL','LOW','라트비아 HIMARS 6기 도입. 발트 방어의 중요 장거리 타격 능력.',{range:'80km(GMLRS)/300km(ATACMS)',firstDeployed:'2024년(라트비아)',quantity:'6기'},['HIMARS','라트비아','발트','러시아대응','장거리'],'라트비아군',undefined,90),
  w('ltu-m001','PzH 2000 (리투아니아)','PzH 2000 (Lithuanian Army)','ARTILLERY','GERMANY','OPERATIONAL','LOW','리투아니아 PzH 2000 21문. 독일 기증분+자국 도입. 발트 포병 강화.',{armament:'155mm 52구경',range:'56km',firstDeployed:'2022년(리투아니아)',quantity:'21문'},['PzH2000','리투아니아','발트','독일기증','포병'],'리투아니아군',undefined,90),

  // ── 루마니아 (ROMANIA) ───────────────────────────────────────────────────
  w('rou-a001','F-16AM (루마니아)','F-16AM Fighting Falcon (ROAF)','AIRCRAFT','USA','OPERATIONAL','LOW','루마니아 공군 17기. 포르투갈 중고 도입. 흑해 방어 핵심. K2 전차 협상 중.',{speed:'마하 2.0',firstDeployed:'2016년(루마니아)',quantity:'17기'},['F-16AM','루마니아','흑해','포르투갈중고','NATO'],'ROAF',undefined,85),
  w('rou-n001','마라세스티급 호위함','Mărășești-class Frigate','NAVAL','MULTI','RETIRED','LOW','루마니아 해군 구형 호위함. 흑해 운용. 노후화로 대체 논의 중.',{displacement:'5,790톤',length:'144.6m',armament:'P-15 텀핏·SA-N-5·AK-630',firstDeployed:'1985년',quantity:'1척'},['마라세스티','루마니아','흑해','구형호위함'],'루마니아해군',undefined,70),

  // ── 체코 (CZECH REPUBLIC) ───────────────────────────────────────────────
  w('cze-a001','타이푼 (체코)','Eurofighter Typhoon (CzAF)','AIRCRAFT','MULTI','DEVELOPMENT','LOW','체코 공군 24기 계획. MiG-29 대체. 2029년 인도 예정.',{speed:'마하 2.0',firstDeployed:'2029년(예정)',quantity:'24기'},['타이푼','체코','MiG-29대체','NATO'],'체코공군',undefined,80),
  w('cze-m001','K9 천둥 (체코)','K9A1 Thunder (Czech Army)','ARTILLERY','ROK','DEVELOPMENT','LOW','체코 K9 52문 계약. 2024년 최초 인도. 동유럽 K9 수출 확대.',{armament:'155mm',range:'54km',firstDeployed:'2025년(예정)',quantity:'52문'},['K9','체코','동유럽','한국방산'],'체코군',undefined,82),

  // ── 슬로바키아 (SLOVAKIA) ────────────────────────────────────────────────
  w('svk-m001','K2 전차 (슬로바키아 검토)','K2 Black Panther (Slovakia Review)','GROUND','ROK','DEVELOPMENT','LOW','슬로바키아 K2 전차 교체 검토. T-72 대체 후보. 독일 레오파르트와 경쟁.',{weight:'55톤',armament:'120mm 활강포',firstDeployed:'협상 중'},['K2','슬로바키아','T-72대체','동유럽','검토중'],'슬로바키아군',undefined,55),

  // ── 헝가리 (HUNGARY) ─────────────────────────────────────────────────────
  w('hun-m001','레오파르트 2A7+ (헝가리)','Leopard 2A7+ (Hungarian Defence Forces)','GROUND','GERMANY','OPERATIONAL','LOW','헝가리 레오파르트 2A7+ 44대. 2023년 인도 완료. 구형 T-72 완전 대체.',{weight:'64.5톤',armament:'120mm L/55 활강포',firstDeployed:'2020년(헝가리)',quantity:'44대'},['레오파르트2A7+','헝가리','T-72대체','NATO'],'헝가리군',undefined,88),

  // ── 폴란드 추가 ──────────────────────────────────────────────────────────
  w('pol-a002','F-35A (폴란드)','F-35A Lightning II (Polish AF)','AIRCRAFT','USA','DEVELOPMENT','LOW','폴란드 공군 32기 계약. K2·K9과 함께 방위력 획기적 강화. 2024년 초도.',{speed:'마하 1.6',firstDeployed:'2024년',quantity:'32기'},['F-35A','폴란드','방위력강화','NATO','러시아대응'],'폴란드공군',undefined,90),
  w('pol-n001','크라코프 (퇴역) / AW101 헬기','AW101 Merlin Helicopter (Polish Navy)','HELICOPTER','MULTI','OPERATIONAL','LOW','폴란드 해군 AW101 4기. 대잠·CSAR 임무. 발트해 주요 방어 자산.',{speed:'309km/h',range:'1,000km',firstDeployed:'2022년(폴란드)',quantity:'4기'},['AW101','폴란드','대잠헬기','발트해','CSAR'],'폴란드해군',undefined,85),
  w('pol-m001','HIMARS (폴란드)','M142 HIMARS (Polish Army)','MLRS','USA','OPERATIONAL','LOW','폴란드 HIMARS 486기 추가 계약 포함. 세계 최대 HIMARS 구매국 중 하나.',{range:'80km(GMLRS)/300km(ATACMS)',firstDeployed:'2023년(폴란드)',quantity:'20기+(대규모확대)'},['HIMARS','폴란드','세계최대구매','러시아대응','장거리'],'폴란드군',undefined,92),

  // ── 이탈리아 추가 ────────────────────────────────────────────────────────
  w('ita-m001','FREMM 베르가미니급 호위함','FREMM Bergamini-class Frigate (Italian)','NAVAL','MULTI','OPERATIONAL','LOW','이탈리아-프랑스 공동 FREMM 다목적 호위함. 아스터-15·MU90 어뢰. 10척 계획.',{displacement:'6,700톤',length:'144m',crew:'200명',armament:'아스터-15·ASTER-30·Teseo Mk2/A',firstDeployed:'2013년',quantity:'8척'},['FREMM','이탈리아','베르가미니','아스터','다목적호위함'],'이탈리아해군','https://en.wikipedia.org/wiki/FREMM_multipurpose_frigate',92),
  w('ita-m002','B1 켄타우로 105mm 차륜형 구축전차','B1 Centauro Tank Destroyer','GROUND','MULTI','OPERATIONAL','LOW','이탈리아 8×8 105mm 차륜형 구축전차. 60개국 시험. 스페인·오만 수출. 기동성 우수.',{weight:'25톤',armament:'105mm 강선포·7.62mm',crew:'4명',speed:'110km/h',firstDeployed:'1992년'},['켄타우로','이탈리아','105mm','구축전차','8×8'],'이탈리아군','https://en.wikipedia.org/wiki/B1_Centauro',88),

  // ── 포르투갈 (PORTUGAL) ──────────────────────────────────────────────────
  w('prt-a001','F-16AM (포르투갈)','F-16AM Fighting Falcon (PoAF)','AIRCRAFT','USA','OPERATIONAL','LOW','포르투갈 공군 30기. 블록 15MLU 개량. 중고 일부 루마니아 판매.',{speed:'마하 2.0',firstDeployed:'1994년(포르투갈)',quantity:'25기'},['F-16AM','포르투갈','블록15MLU','NATO'],'포르투갈공군',undefined,85),

  // ── 영국 추가 ────────────────────────────────────────────────────────────
  w('uk-a003','바이킹 AS.50 공격헬기 (아파치 AH.64E)','Apache AH-64E (AAC)','HELICOPTER','USA','OPERATIONAL','LOW','영국 육군항공대 아파치 AH-64E 50기. 헬파이어 16발·M230 30mm. 아프간·이라크 검증.',{speed:'293km/h',range:'480km',armament:'헬파이어×16·M230 30mm',firstDeployed:'2001년(영국)',quantity:'50기'},['아파치','영국육군항공','AH-64E','헬파이어','아프간'],'AAC','https://en.wikipedia.org/wiki/Boeing_AH-64_Apache',97),
  w('uk-a004','와일드캣 HMA.2','AgustaWestland AW159 Wildcat HMA.2','HELICOPTER','UK','OPERATIONAL','LOW','영국 해군 함재 다목적 헬기. 50기. 대잠·대함·SAR. 한국 AW159 모델.',{speed:'291km/h',range:'750km',crew:'2+임무요원',armament:'스팅레이·CRV7·AGM-114',firstDeployed:'2015년(영국)',quantity:'50기'},['와일드캣','영국해군','AW159','대잠','한국도입모델'],'RN','https://en.wikipedia.org/wiki/AgustaWestland_AW159',92),
  w('uk-a005','타이푼 FGR4 (추가 정보)','Typhoon FGR4 Nuclear Capable (UK)','AIRCRAFT','UK','OPERATIONAL','LOW','영국 타이푼은 핵공유 임무 없음. 160기 운용. 스톰 섀도·브림스톤·ASRAAM 통합.',{speed:'마하 2.0',quantity:'160기'},['타이푼FGR4','영국','160기','스톰섀도','브림스톤'],'RAF',undefined,95),
  w('uk-n002','45형 구축함','Type 45 Daring-class Destroyer','NAVAL','UK','OPERATIONAL','LOW','영국 방공 구축함. 시바이퍼·ASTER-30. 6척. 전력계통 신뢰성 문제 개선 중.',{displacement:'7,350톤',length:'152.4m',crew:'190명',armament:'시바이퍼·ASTER-30·팰랭크스·114mm',firstDeployed:'2009년',quantity:'6척'},['45형','다링급','영국구축함','시바이퍼','ASTER-30'],'RN','https://en.wikipedia.org/wiki/Type_45_destroyer',95),
  w('uk-n003','26형 글로벌 컴뱃 함','Type 26 City-class Frigate','NAVAL','UK','OPERATIONAL','LOW','영국 차세대 대잠 호위함. Mk41 VLS·2087 소나·Artisan레이더. 캐나다·호주 도입.',{displacement:'6,900톤',length:'149.9m',crew:'157명',armament:'Mk41 VLS·Sea Ceptor·114mm',firstDeployed:'2026년',quantity:'8척(계획)'},['26형','글로벌컴뱃쉽','영국','대잠','캐나다호주도입'],'RN','https://en.wikipedia.org/wiki/Type_26_frigate',88),

  // ── 독일 추가 ────────────────────────────────────────────────────────────
  w('deu-a002','유로파이터 ECR 전자전형','Eurofighter ECR (Electronic Combat Role)','AIRCRAFT','GERMANY','DEVELOPMENT','LOW','독일 전자전 타이푼. HARMng·AARGM-ER·사이드킥 포드. F-18G 그라울러 대체 목표.',{speed:'마하 2.0',range:'2,900km',crew:'1명',firstDeployed:'2028년(예정)',quantity:'15기'},['타이푼ECR','독일','전자전','HARMng','그라울러대체'],'독일공군',undefined,75),
  w('deu-n002','F125 바덴뷔르템베르크 호위함','Type F125 Baden-Württemberg Frigate','NAVAL','GERMANY','OPERATIONAL','LOW','독일 차세대 스태빌라이제이션 호위함. 5 대신 2 교대 운용. RIM-116·76mm. 4척.',{displacement:'7,200톤',length:'149.5m',crew:'190명',armament:'RAM·RGM-84 하푼·76mm',firstDeployed:'2018년',quantity:'4척'},['F125형','독일','바덴뷔르템베르크','호위함','2교대'],'독일해군','https://en.wikipedia.org/wiki/Baden-W%C3%BCrttemberg-class_frigate',85),

  // ── NATO 핵공유 종합 ─────────────────────────────────────────────────────
  w('nato-nuke001','B61-12 핵공유 (NATO)','B61-12 NATO Nuclear Sharing','NUCLEAR','USA','OPERATIONAL','LOW','NATO 5개국(독일·이탈리아·벨기에·네덜란드·터키) 핵공유 임무. F-35A·타이푼 탑재.',{payload:'0.3~50kt 가변위력',firstDeployed:'2023년(B61-12 교체)'},['B61-12','NATO핵공유','5개국','F-35A','핵억제'],'NATO',undefined,95),
]



