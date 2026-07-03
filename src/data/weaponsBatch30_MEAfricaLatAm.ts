import type { WeaponSystem } from './weapons'
const w = (id:string,name:string,nameEng:string,cat:WeaponSystem['category'],origin:WeaponSystem['origin'],status:WeaponSystem['status'],threat:WeaponSystem['threatRating'],desc:string,specs:WeaponSystem['specs'],tags:string[],sources:string[],img?:string,wiki?:string,conf=90): WeaponSystem=>({id,name,nameEng,category:cat,origin,status,threatRating:threat,description:desc,detail:`## ${nameEng}\n\n${desc}\n\n### 주요 제원\n${Object.entries(specs).filter(([,v])=>v).map(([k,v])=>`- ${k}: ${v}`).join('\n')}`,specs,confidence:conf,lastUpdated:'2026-07-03',relatedIntelIds:[],tags,sources,imageUrl:img,wikiUrl:wiki})

export const WEAPONS_BATCH30_ME_AFRICA_LATAM: WeaponSystem[] = [

  // ── 이란 무기 추가 ────────────────────────────────────────────────────
  w('me-irn001','이란 카라르 UCAV','Karrar Long-Range Attack UAV Iran','UAV','IRAN','OPERATIONAL','HIGH',
    '이란 카라르 제트추진 자폭드론. 예멘·시리아 실전. 이스라엘 공격(2024년 4월) 참가.',
    {speed:'900km/h+(추정)',range:'1,000km+(추정)',armament:'폭탄·미사일',firstDeployed:'2010년',manufacturer:'이란 방위산업부'},
    ['카라르','이란UCAV','제트드론','이스라엘공격','2024'],['이란국방부'],
    undefined,undefined,72),

  w('me-irn002','이란 파테-360 탄도미사일','Fattah-1 Hypersonic Iran Ballistic','MISSILE','IRAN','DEVELOPMENT','HIGH',
    '이란 파타 극초음속 탄도미사일. 마하 13 주장. 기동탄두. 이스라엘·미군기지 위협.',
    {speed:'마하 13+(주장)',range:'1,400km',firstDeployed:'2023년(공개)',manufacturer:'이란 방위산업부'},
    ['파타','이란극초음속','마하13','이스라엘위협'],['이란국방부'],
    undefined,undefined,55),

  w('me-irn003','이란 샤헤드-238 제트자폭','Shahed-238 Jet-Powered Kamikaze Iran','UAV','IRAN','DEVELOPMENT','HIGH',
    '샤헤드-136 후계 제트형. 속도 2배+. 요격 어려움. 러시아 공급 예상.',
    {speed:'500km/h+(추정)',range:'2,000km+(추정)',firstDeployed:'2023년+(예상)',manufacturer:'이란 항공산업'},
    ['샤헤드238','제트자폭드론','이란','러시아공급예상'],['이란국방부'],
    undefined,undefined,58),

  w('me-irn004','이란 하이바르쉐칸 탄도미사일','Kheibar Shekan Ballistic Missile Iran','MISSILE','IRAN','OPERATIONAL','HIGH',
    '이란 고체 중거리 탄도미사일. 2,000km. 이스라엘 사정권. 2022년 공개.',
    {range:'2,000km',propulsion:'고체',firstDeployed:'2022년(공개)',manufacturer:'이란 방위산업부'},
    ['하이바르쉐칸','이란탄도','2000km','이스라엘사정권'],['이란TV','IISS'],
    undefined,undefined,70),

  // ── 이스라엘 무기 추가 ─────────────────────────────────────────────────
  w('me-isr001','하마스 RPG-7 개량형','RPG-7 Yasin-105 Hamas Anti-Tank','MISSILE','MULTI','OPERATIONAL','HIGH',
    '하마스 야신-105 이스라엘 메르카바 대응 RPG. 105mm. 가자 전쟁 대전차 주력.',
    {payload:'105mm HEAT',range:'500m',firstDeployed:'2000년대(하마스)',manufacturer:'이란 지원'},
    ['야신105','RPG','하마스','메르카바대응','가자'],['IDF','Jane\'s'],
    undefined,undefined,75),

  w('me-isr002','이스라엘 Barak-8 해상방공','Barak-8 Naval Air Defense Israel-India','SAM','ISRAEL','OPERATIONAL','HIGH',
    '이스라엘·인도 공동 개발 해상방공. 70km. MRSAM 인도 수출형. 인도함·PLAN 위협.',
    {range:'70km',ceiling:'16km',firstDeployed:'2016년',manufacturer:'IAI·DRDO·BDL'},
    ['바라크8','이스라엘인도','해상방공','MRSAM'],['IAI','인도해군'],
    undefined,'https://en.wikipedia.org/wiki/Barak_8',88),

  w('me-isr003','이스라엘 드론 스워밍','Israel Drone Swarming AI System','UAV','ISRAEL','DEVELOPMENT','HIGH',
    '이스라엘 AI 드론 군집 시스템. 수백 기 자율협동. 가자 사용 일부 사례.',
    {firstDeployed:'2022년+(가자)',manufacturer:'Elbit·라파엘'},
    ['드론스워밍','이스라엘AI','군집드론','가자'],['엘빗','라파엘'],
    undefined,undefined,72),

  // ── 사우디 UAE 무기 ─────────────────────────────────────────────────
  w('me-sau001','UAE 팔콘아이 SAT 위성','Falcon Eye UAE Military Satellite','UAV','MULTI','OPERATIONAL','MED',
    'UAE 군사 광학위성. 에어버스 제조. 50cm 해상도. 지역 감시·이란 모니터링.',
    {firstDeployed:'2020년(2번째)',manufacturer:'에어버스 방위'},
    ['팔콘아이','UAE위성','군사위성','이란감시'],['에어버스','UAE'],
    undefined,undefined,80),

  w('me-sau002','사우디 엠브라에르 A-29 슈퍼투카노','A-29 Super Tucano Saudi Arabia COIN','AIRCRAFT','BRAZIL','OPERATIONAL','LOW',
    '사우디 슈퍼투카노 경공격기. 예멘 반군 공습. 20mm+로켓+JDAM. COIN 작전 핵심.',
    {speed:'590km/h',crew:'2명',armament:'20mm FN M3P·LAU-61·Mk82',firstDeployed:'2015년(사우디)',manufacturer:'엠브라에르'},
    ['슈퍼투카노','A-29','사우디','예멘COIN','공습'],['엠브라에르','RSAF'],
    undefined,undefined,80),

  w('me-sau003','UAE 라이트닝 II T-346','T-346A Leonardo Trainer UAE','AIRCRAFT','NATO','OPERATIONAL','LOW',
    'UAE 레오나르도 M-346 고등훈련기. 24기. Rafale·F-35 전환 훈련 기반.',
    {speed:'마하 1.15',crew:'2명',firstDeployed:'2017년(UAE)',quantity:'24기',manufacturer:'레오나르도'},
    ['M-346','UAE훈련기','레오나르도','고등훈련기'],['레오나르도','UAEAF'],
    undefined,undefined,82),

  // ── 이집트 무기 ──────────────────────────────────────────────────────
  w('me-egy001','이집트 라팔 F3R','Rafale F3R Egypt Air Force Fighter','AIRCRAFT','FRANCE','OPERATIONAL','HIGH',
    '이집트 라팔. 24기+30기 추가. 프랑스 최대 수출 성과. 리비아 작전.',
    {speed:'마하 1.8',crew:'1명',armament:'미티어·MICA·SCALP-EG',firstDeployed:'2015년(이집트)',quantity:'54기(계획)',manufacturer:'다소'},
    ['라팔','이집트','다소','54기','리비아'],['다소','이집트공군'],
    undefined,undefined,90),

  w('me-egy002','이집트 M1A1SA 전차','M1A1SA Abrams Egypt 1300+ Tanks','GROUND','USA','OPERATIONAL','HIGH',
    '이집트 M1A1SA. 1,360대. 가장 많은 에이브람스 운용국. FMS+공동생산.',
    {weight:'63t',armament:'120mm M256',crew:'4명',firstDeployed:'1988년(이집트)',quantity:'1,360대',manufacturer:'미국·이집트 공동'},
    ['M1A1SA','이집트에이브람스','1360대','FMS','공동생산'],['제너럴다이나믹스','이집트육군'],
    undefined,undefined,88),

  // ── 터키 추가 무기 ─────────────────────────────────────────────────────
  w('me-tur001','이메이 KAAN 5세대 전투기','KAAN TF-X 5th Gen Fighter Turkey','AIRCRAFT','TURKEY','DEVELOPMENT','HIGH',
    '터키 독자 5세대 전투기. 2023년 첫 비행. AESA·내부무장창. 2026년 양산.',
    {speed:'마하 1.8+(추정)',crew:'1명',armament:'내부무장창·IRIS-T·AMRAAM',firstDeployed:'2026년(목표)',manufacturer:'TAI'},
    ['KAAN','터키5세대','TF-X','TAI','독자전투기'],['TAI','터키공군'],
    undefined,'https://en.wikipedia.org/wiki/TAI_TF-X',82),

  w('me-tur002','SOM 공대지순항미사일 터키','SOM-J Cruise Missile Turkey F-35','MISSILE','TURKEY','OPERATIONAL','MED',
    '터키 SOM 공대지 순항미사일. F-16·F-35(J형) 탑재. 250km. IR 탐색기. NATO 스탠드오프.',
    {range:'250km',payload:'230kg',firstDeployed:'2014년',manufacturer:'TÜBİTAK SAGE'},
    ['SOM-J','터키순항미사일','F-35탑재','스탠드오프'],['TÜBİTAK','터키공군'],
    undefined,undefined,82),

  // ── 아프리카 무기 ──────────────────────────────────────────────────────
  w('af-nga001','나이지리아 A-29 슈퍼투카노 COIN','A-29 Super Tucano Nigeria Counter-Terror','AIRCRAFT','BRAZIL','OPERATIONAL','MED',
    '나이지리아 슈퍼투카노 6기. 보코하람·반군 COIN 작전. 미 대외군사판매(FMS) 논란.',
    {speed:'590km/h',crew:'2명',armament:'20mm·MAU-132·Mk82',firstDeployed:'2021년(나이지리아)',quantity:'6기',manufacturer:'엠브라에르·L3'},
    ['슈퍼투카노','나이지리아','보코하람','COIN','FMS'],['엠브라에르','나이지리아공군'],
    undefined,undefined,78),

  w('af-eth001','에티오피아 Orlan-10 러시아드론','Orlan-10 Drone Ethiopia Russia Supply','UAV','RUSSIA','OPERATIONAL','MED',
    '에티오피아 러시아 오를란-10 드론 수입. 티그레이 전쟁 정찰. 비서방 드론 사용 증가.',
    {ceiling:'5km',range:'120km',firstDeployed:'2020년(에티오피아)',manufacturer:'스페츠기드로아비아테크니카'},
    ['오를란10','에티오피아','러시아드론','티그레이전쟁'],['러시아','에티오피아군'],
    undefined,undefined,70),

  w('af-lib001','LNA 미라지 F1 리비아','Mirage F1 Libya LNA Air Force','AIRCRAFT','FRANCE','OPERATIONAL','LOW',
    '리비아 동부군(LNA) 구형 미라쥬 F1. 가다피 시대 유산. 일부 운용 가능 상태.',
    {speed:'마하 2.2',crew:'1명',firstDeployed:'1978년(리비아)'},
    ['미라쥬F1','리비아','LNA','가다피유산'],['IISS'],
    undefined,undefined,55),

  // ── 브라질 무기 ──────────────────────────────────────────────────────
  w('la-bra001','AMX 그리핀 브라질','AMX A-1 Gripen NG Brazil Fighter','AIRCRAFT','SWEDEN','DEVELOPMENT','MED',
    '브라질 그리펜 NG. 36기 계약. 2019년 초도기 인도. 기술이전·현지생산 포함.',
    {speed:'마하 2.0',crew:'1명(A)/2명(B)',armament:'A-Darter·Derby·IRIS-T',firstDeployed:'2019년(브라질)',quantity:'36기',manufacturer:'사브·엠브라에르'},
    ['그리펜NG','브라질','36기','기술이전','엠브라에르'],['사브','브라질공군'],
    undefined,undefined,85),

  w('la-bra002','브라질 KC-390 밀레니엄','KC-390 Millennium Transport Brazil','AIRCRAFT','BRAZIL','OPERATIONAL','MED',
    '엠브라에르 KC-390. 브라질 독자 군수송기. C-130 대체. 포르투갈·네덜란드·체코 수출.',
    {speed:'870km/h',crew:'2+80명',armament:'없음(수송)',firstDeployed:'2019년',quantity:'22기(수출포함)',manufacturer:'엠브라에르'},
    ['KC-390','브라질수송기','엠브라에르','C-130대체'],['엠브라에르','브라질공군'],
    undefined,'https://en.wikipedia.org/wiki/Embraer_KC-390',85),

  w('la-bra003','오사우루 차륜형 IFV 브라질','Guarani VBTP-MR 6x6 APC Brazil','GROUND','BRAZIL','OPERATIONAL','LOW',
    '브라질 과라니 6×6 APC. 1,200대 계획. 30mm Cockerill 탑재형도 존재. 레바논 PKO 투입.',
    {weight:'19.5t',armament:'12.7mm 또는 30mm Cockerill',crew:'3+11명',speed:'110km/h',firstDeployed:'2012년',manufacturer:'IVECO·브라질'},
    ['과라니','브라질APC','VBTP','PKO','레바논'],['IVECO','브라질군'],
    undefined,'https://en.wikipedia.org/wiki/VBTP-MR_Guarani',78),

  // ── 멕시코 무기 ─────────────────────────────────────────────────────
  w('la-mex001','멕시코 세스나 사이테이션 정찰기','Cessna Citation 560 ISR Mexico Air Force','AIRCRAFT','USA','OPERATIONAL','LOW',
    '멕시코 공군 세스나 Citation 기반 정찰·ISR. 마약 카르텔 감시.',
    {speed:'760km/h',crew:'2명',firstDeployed:'2000년대',manufacturer:'세스나'},
    ['세스나Citation','멕시코정찰기','ISR','카르텔감시'],['멕시코공군'],
    undefined,undefined,65),

  // ── 콜롬비아 무기 ─────────────────────────────────────────────────────
  w('la-col001','콜롬비아 OV-10 브론코 COIN','OV-10 Bronco Colombia Counter-Narco','AIRCRAFT','USA','OPERATIONAL','LOW',
    '콜롬비아 OV-10 대마약·COIN 작전. 아마존 정글 저고도 작전 특화.',
    {speed:'452km/h',crew:'2명',armament:'7.62mm×4·로켓·네이팜',firstDeployed:'1990년대(콜롬비아)'},
    ['OV-10','브론코','콜롬비아','대마약','COIN'],['콜롬비아군'],
    undefined,undefined,70),

  // ── 중동 기타 무기 ───────────────────────────────────────────────────
  w('me-qat001','카타르 레클레르 전차','Leclerc MBT Qatar Import French Export','GROUND','FRANCE','OPERATIONAL','MED',
    '카타르 레클레르 전차 계약. 446대(2022). 세계 최대 레클레르 수출.',
    {weight:'54.5t',armament:'120mm 활강포',crew:'3명',firstDeployed:'2024년+(예정)',quantity:'446대(계획)',manufacturer:'넥스터'},
    ['레클레르','카타르','446대','프랑스수출','최대'],['넥스터','카타르육군'],
    undefined,undefined,82),

  w('me-kuw001','쿠웨이트 K9A1 자주포','K9A1 Doha Kuwait SPH Korean Export','ARTILLERY','ROK','OPERATIONAL','LOW',
    '쿠웨이트 K9A1 도하. 48문. 한국 방산 중동 진출 성과.',
    {weight:'47t',armament:'155mm/52구경장',crew:'5명',firstDeployed:'2022년(쿠웨이트)',quantity:'48문',manufacturer:'한화에어로스페이스'},
    ['K9A1','쿠웨이트','도하','한국방산','중동수출'],['한화에어로스페이스','쿠웨이트군'],
    undefined,undefined,88),

  w('me-jor001','요르단 유로코프터 AS532 쿠거','AS532 Cougar Jordan Special Forces Heli','HELICOPTER','FRANCE','OPERATIONAL','LOW',
    '요르단 특수전 수송헬기. AS532 쿠거. 중동 평화유지·특수작전 핵심.',
    {speed:'260km/h',crew:'2+24명',firstDeployed:'1990년대(요르단)',manufacturer:'에어버스헬리콥터'},
    ['AS532','쿠거','요르단','특수전헬기'],['에어버스','요르단군'],
    undefined,undefined,75),

  w('me-irq001','이라크 F-16IQ','F-16IQ Block 52 Iraq Air Force','AIRCRAFT','USA','OPERATIONAL','MED',
    '이라크 F-16IQ 블록52. 36기. IS 공습 핵심. 이란과의 복잡한 안보지형.',
    {speed:'마하 2.0',crew:'1명',armament:'AIM-120·JDAM·AGM-65',firstDeployed:'2015년(이라크)',quantity:'36기(목표)',manufacturer:'록히드마틴'},
    ['F-16IQ','이라크','블록52','IS공습'],['록히드마틴','이라크공군'],
    undefined,undefined,82),

  // ── 아프가니스탄(탈레반 노획) ──────────────────────────────────────────
  w('me-afg001','탈레반 UH-60 노획 블랙호크','UH-60 Blackhawk Taliban Captured Afghanistan','HELICOPTER','USA','OPERATIONAL','LOW',
    '탈레반 미군 철수 후 노획 UH-60 50여기. 운용 능력 불확실. 이란·중국 기술 분석 가능성.',
    {speed:'296km/h',firstDeployed:'2021년(탈레반 노획)',quantity:'50기+(노획)'},
    ['UH-60','탈레반노획','아프가니스탄','미군장비'],['NPR','SIGAR'],
    undefined,undefined,55),

  // ── 예멘 후티 무기 ─────────────────────────────────────────────────────
  w('me-yem001','후티 드론보트 대함 공격','Houthi USV Drone Boat Anti-Ship Attack','UAV','IRAN','OPERATIONAL','HIGH',
    '후티 이란 지원 수상 드론(USV). 선박 충돌 자폭. 홍해 선박 공격 핵심.',
    {range:'500km+(추정)',armament:'폭발물 직격',firstDeployed:'2022년+',manufacturer:'이란 지원'},
    ['후티드론보트','USV','홍해공격','이란지원','자폭'],['후티','이란IRGC'],
    undefined,undefined,70),

  w('me-yem002','후티 Al-Mandab-1 대함미사일','Houthi Al-Mandab-1 Anti-Ship Missile Yemen','MISSILE','IRAN','OPERATIONAL','HIGH',
    '후티 반군 이란계 대함미사일. C-802 파생·중개형. 홍해·아덴만 선박 공격.',
    {range:'150km',firstDeployed:'2016년+',manufacturer:'이란 파생'},
    ['알-만답1','후티대함','홍해','이란제미사일'],['IRGC','후티'],
    undefined,undefined,65),

  // ── 한국 방산 수출 사례 ────────────────────────────────────────────────
  w('exp-rok001','FA-50 필리핀 경전투기','FA-50PH Fighting Eagle Philippines','AIRCRAFT','ROK','OPERATIONAL','MED',
    'FA-50 필리핀 수출. 12기. 남중국해 영유권 분쟁 대응 핵심.',
    {speed:'마하 1.5',crew:'2명',armament:'20mm·AIM-9',firstDeployed:'2015년(필리핀)',quantity:'12기',manufacturer:'KAI'},
    ['FA-50PH','필리핀','KAI','남중국해','12기'],['KAI','필리핀공군'],
    undefined,undefined,88),

  w('exp-rok002','K9 폴란드 수출','K9A1 K9PL Krab Successor Poland 672門','ARTILLERY','ROK','OPERATIONAL','LOW',
    '폴란드 K9 대규모 수출. 672문 계약. 유럽 방산 최대 계약 중 하나. 우크라이나 전쟁 촉발.',
    {weight:'47t',armament:'155mm/52구경장',range:'54km(ERBB)',firstDeployed:'2022년(폴란드)',quantity:'672문',manufacturer:'한화에어로스페이스·HSW'},
    ['K9A1','폴란드','672문','최대계약','우크라이나전쟁계기'],['한화에어로스페이스','HSW'],
    undefined,undefined,92),

  w('exp-rok003','천무 아랍에미리트','Chunmoo MLRS UAE Export Contract','MLRS','ROK','OPERATIONAL','HIGH',
    '천무 UAE 수출. 2022년 35억불 계약. 한국 방산 최대 수출. 중동 시장 개척.',
    {armament:'239mm 로켓',range:'80km',firstDeployed:'2022년+(UAE)',manufacturer:'한화에어로스페이스'},
    ['천무','UAE','35억불','한국방산최대수출'],['한화에어로스페이스','UAE군'],
    undefined,undefined,90),

  w('exp-rok004','한국 방산 수출 2023 135억불','Korea Defense Export 13.5 Billion USD 2023','GROUND','ROK','OPERATIONAL','LOW',
    '2023년 한국 방산수출 135억불 달성. 폴란드·이집트·UAE·호주·인도 등 30개국+ 공급.',
    {firstDeployed:'2023년(수출실적)',manufacturer:'한화·KAI·현대로템·LIG넥스원'},
    ['한국방산수출','135억불','세계4위','K방산'],['방위사업청','KOTRA'],
    undefined,undefined,95),

]
