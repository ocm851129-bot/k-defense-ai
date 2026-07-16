import type { WeaponSystem } from './weapons'
const w = (id:string,name:string,nameEng:string,cat:WeaponSystem['category'],origin:WeaponSystem['origin'],status:WeaponSystem['status'],threat:WeaponSystem['threatRating'],desc:string,specs:WeaponSystem['specs'],tags:string[],sources:string[],img?:string,wiki?:string,conf=85): WeaponSystem=>({id,name,nameEng,category:cat,origin,status,threatRating:threat,description:desc,detail:`## ${nameEng}\n\n${desc}\n\n### 주요 제원\n${Object.entries(specs).filter(([,v])=>v).map(([k,v])=>`- ${k}: ${v}`).join('\n')}`,specs,confidence:conf,lastUpdated:'2026-07-01',relatedIntelIds:[],tags,sources,imageUrl:img,wikiUrl:wiki})

export const WEAPONS_BATCH11_GROUND: WeaponSystem[] = [

  // ── 이탈리아 지상 ─────────────────────────────────────────────────────────
  w('gnd-ita001','아리에테 C2 전차','C1 Ariete C2 MBT','GROUND','NATO','OPERATIONAL','LOW','이탈리아 주력전차. 120mm 44구경 활강포·TURMS 사격통제. 스파이크 ER 통합 추진.',{weight:'54t',armament:'120mm RF 44구경·12.7mm·7.62mm',crew:'4명',speed:'65km/h',firstDeployed:'1995년',manufacturer:'오토멜라라·피아트'},['아리에테C2','이탈리아전차','120mm'],['이탈리아군'],undefined,'https://en.wikipedia.org/wiki/C1_Ariete',82),
  w('gnd-ita002','프레챠 IFV','Freccia IFV 25mm','GROUND','NATO','OPERATIONAL','LOW','이탈리아 신형 IFV. 25mm 기관포·스파이크LR. 핀마카니카/이베코 개발.',{weight:'26t',armament:'25mm 기관포·스파이크LR',crew:'3+8명',speed:'70km/h',firstDeployed:'2009년',manufacturer:'핀마카니카'},['프레챠','IFV','이탈리아','25mm'],['핀마카니카','이탈리아군'],undefined,'https://en.wikipedia.org/wiki/VBM_Freccia',82),

  // ── 스페인 지상 ───────────────────────────────────────────────────────────
  w('gnd-esp001','레오파르트 2A4 스페인','Leopard 2A4 Spain','GROUND','NATO','OPERATIONAL','LOW','독일 레오파르트 2A4 스페인 운용형. 235대. 120mm L44.',{weight:'55t',armament:'120mm L44·7.62mm×2',crew:'4명',firstDeployed:'1995년',manufacturer:'Rheinmetall',quantity:'235대'},['레오파르트','스페인전차','120mm'],['스페인군'],'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Leopard_2_A7V_313_Bad_Frankenhausen_2024.JPG/330px-Leopard_2_A7V_313_Bad_Frankenhausen_2024.JPG','https://en.wikipedia.org/wiki/Leopard_2',85),
  w('gnd-esp002','AMV 8×8 (스페인 VBCI형)','AMV 8x8 VBCI Spain','GROUND','NATO','OPERATIONAL','LOW','핀란드 AMV 기반 스페인 도입 8×8 장갑차. 롤스로이스 엔진.',{weight:'26t',crew:'2+11명',speed:'105km/h',firstDeployed:'2010년대',manufacturer:'Patria'},['AMV','8x8','스페인','장갑차'],['Patria','스페인군'],undefined,undefined,80),

  // ── 캐나다 지상 ───────────────────────────────────────────────────────────
  w('gnd-can001','레오파르트 2A6M 캐나다','Leopard 2A6M (Canada)','GROUND','NATO','OPERATIONAL','LOW','독일제 레오파르트 2A6 캐나다 운용. 아프간 전쟁 실전. 82대 보유.',{weight:'63t',armament:'120mm L55·7.62mm×2',crew:'4명',firstDeployed:'2007년(캐나다)',quantity:'82대'},['레오파르트','캐나다','아프간실전'],['캐나다군'],'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Leopard_2_A7V_313_Bad_Frankenhausen_2024.JPG/330px-Leopard_2_A7V_313_Bad_Frankenhausen_2024.JPG','https://en.wikipedia.org/wiki/Leopard_2',88),
  w('gnd-can002','LAV 6.0 장갑차','LAV 6.0 Armored Vehicle','GROUND','NATO','OPERATIONAL','LOW','캐나다 차세대 LAV. 8×8. 30mm 기관포. 이집트·사우디 수출. 500대+.',{weight:'30.5t',armament:'M242 30mm·7.62mm',crew:'3+8명',speed:'100km/h',firstDeployed:'2017년',manufacturer:'GD 캐나다'},['LAV6','캐나다','30mm','8x8'],['제너럴다이나믹스','캐나다군'],undefined,'https://en.wikipedia.org/wiki/LAV_6.0',88),

  // ── 네덜란드 지상 ─────────────────────────────────────────────────────────
  w('gnd-nl001','레오파르트 2A6 네덜란드','Leopard 2A6 Netherlands','GROUND','NATO','OPERATIONAL','LOW','네덜란드 레오파르트 2A6. 우크라이나 일부 지원.',{weight:'62.3t',armament:'120mm L55·7.62mm×2',crew:'4명',firstDeployed:'2000년대',quantity:'61대(현역)+우크라이나지원'},['레오파르트','네덜란드','우크라이나지원'],['네덜란드군'],'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Leopard_2_A7V_313_Bad_Frankenhausen_2024.JPG/330px-Leopard_2_A7V_313_Bad_Frankenhausen_2024.JPG','https://en.wikipedia.org/wiki/Leopard_2',88),

  // ── 인도 지상 ─────────────────────────────────────────────────────────────
  w('gnd-ind001','T-90S 비쉬마 전차','T-90S Bhishma MBT (India)','GROUND','INDIA','OPERATIONAL','HIGH','러시아 T-90S 면허생산 인도형. 1,657대. 파키스탄 대응.',{weight:'46t',armament:'125mm 2A46M-4·12.7mm·7.62mm',crew:'3명',speed:'60km/h',firstDeployed:'2001년',manufacturer:'HVF(면허생산)',quantity:'1,657대'},['T-90S','비쉬마','인도전차','면허생산'],['HVF','인도육군'],'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/T-90M.jpg/330px-T-90M.jpg','https://en.wikipedia.org/wiki/T-90S_Bhishma',85),
  w('gnd-ind002','BMP-2 사라트 IFV','BMP-2 Sarath IFV (India)','GROUND','INDIA','OPERATIONAL','MED','소련 BMP-2 면허생산 인도형. 1,400대+. 30mm 기관포.',{weight:'14t',armament:'30mm 2A42·7.62mm·AT-5',crew:'3+7명',firstDeployed:'1988년',manufacturer:'OFB(면허생산)',quantity:'1,400대+'},['BMP-2','사라트','인도IFV','30mm'],['OFB','인도육군'],undefined,undefined,82),
  w('gnd-ind003','K9 바즈라 자주포','K9 Vajra-T 155mm SPH (India)','ARTILLERY','INDIA','OPERATIONAL','LOW','한국 K9 인도 현지생산형(L&T). 100대 계약. 파키스탄 국경 배치.',{weight:'47t',armament:'155mm/52구경장',crew:'5명',range:'40km',firstDeployed:'2019년',manufacturer:'L&T(면허생산)',quantity:'100대'},['K9바즈라','인도자주포','L&T면허','파키스탄국경'],['L&T','한화에어로스페이스','인도육군'],undefined,undefined,88),

  // ── 파키스탄 지상 ─────────────────────────────────────────────────────────
  w('gnd-pak001','알 칼리드-I 전차','Al-Khalid-I MBT (Pakistan)','GROUND','PAKISTAN','OPERATIONAL','HIGH','중국 기술 기반 파키스탄 주력전차. 125mm 활강포·ERA. 600대 운용.',{weight:'48t',armament:'125mm ZPT-98A·12.7mm·7.62mm',crew:'3명',speed:'72km/h',firstDeployed:'2001년',manufacturer:'HIT Heavy Industries',quantity:'600대'},['알칼리드','파키스탄전차','중국기반','125mm'],['HIT','파키스탄군'],undefined,'https://en.wikipedia.org/wiki/Al-Khalid_tank',78),
  w('gnd-pak002','알 자라르 전차','Al-Zarrar Tank (Upgraded T-59)','GROUND','PAKISTAN','OPERATIONAL','MED','중국 T-54/55 개량형. 125mm 활강포·ERA 추가. 예비사단 운용.',{weight:'40t',armament:'125mm 활강포·12.7mm',crew:'4명',firstDeployed:'2004년',manufacturer:'HIT'},['알자라르','T-55개량','파키스탄'],['HIT','파키스탄군'],undefined,undefined,75),

  // ── 대만 지상 ─────────────────────────────────────────────────────────────
  w('gnd-twn001','M1A2T 에이브람스 대만','M1A2T Abrams (Taiwan)','GROUND','TAIWAN','OPERATIONAL','LOW','대만 에이브람스 M1A2T. 108대 계약. 2024년 인도 시작. 중국 상륙 저지용.',{weight:'66.8t',armament:'120mm M256A1',crew:'4명',firstDeployed:'2024년(대만)',manufacturer:'제너럴다이나믹스',quantity:'108대'},['M1A2T','대만전차','에이브람스','중국상륙저지'],['제너럴다이나믹스','대만군'],undefined,undefined,92),
  w('gnd-twn002','M60A3TTS 전차 대만','M60A3TTS Taiwan','GROUND','TAIWAN','OPERATIONAL','LOW','M60A3 열상조준경 탑재형. 대만 주력전차 중 하나. 460대.',{weight:'52.6t',armament:'105mm M68A1·12.7mm·7.62mm',crew:'4명',firstDeployed:'1980년대',quantity:'460대'},['M60A3','대만','105mm','열상'],['대만군'],undefined,undefined,80),
  w('gnd-twn003','CM-11 용호전차 대만','CM-11 Brave Tiger MBT','GROUND','TAIWAN','OPERATIONAL','LOW','M60A3+M48A5 혼합형 대만 독자 개량전차. 100대.',{weight:'50t',armament:'105mm M68·7.62mm×2',crew:'4명',firstDeployed:'1990년',manufacturer:'NCSIST',quantity:'100대'},['CM-11','용호전차','대만독자'],['NCSIST','대만군'],undefined,undefined,78),

  // ── 호주 지상 ─────────────────────────────────────────────────────────────
  w('gnd-aus001','M1A1 에이브람스 호주','M1A1 Abrams (Australia)','GROUND','AUSTRALIA','OPERATIONAL','LOW','호주 육군 M1A1 에이브람스. 59대. SEP 개량 추진.',{weight:'65t',armament:'120mm M256A1',crew:'4명',firstDeployed:'2007년',manufacturer:'제너럴다이나믹스',quantity:'59대'},['M1A1','호주전차','에이브람스'],['제너럴다이나믹스','호주육군'],undefined,undefined,88),
  w('gnd-aus002','AS-LAV 장갑차 호주','AS-LAV Australia','GROUND','AUSTRALIA','OPERATIONAL','LOW','미국 LAV-25 기반 호주형. 25mm M242. 1990년대 도입.',{weight:'14.5t',armament:'M242 25mm·7.62mm',crew:'3+6명',firstDeployed:'1994년',quantity:'257대'},['AS-LAV','호주','25mm','장갑차'],['호주육군'],undefined,undefined,82),

  // ── 사우디아라비아 지상 ───────────────────────────────────────────────────
  w('gnd-sar001','M1A2S 에이브람스 사우디','M1A2S Abrams (Saudi Arabia)','GROUND','NATO','OPERATIONAL','LOW','사우디 에이브람스. 373대. SEPv2 사우디 특화형.',{weight:'67t',armament:'120mm M256A1',crew:'4명',firstDeployed:'2009년',quantity:'373대'},['M1A2S','사우디전차','에이브람스'],['제너럴다이나믹스','사우디군'],undefined,undefined,88),
  w('gnd-sar002','LAV-25 사우디','LAV-25 Saudi Arabia','GROUND','NATO','OPERATIONAL','LOW','사우디 경보병 차량화 LAV-25. 1,100대+.',{weight:'14.5t',armament:'M242 25mm',crew:'3+6명',quantity:'1,100대+'},['LAV-25','사우디','경보병'],['사우디군'],undefined,undefined,80),

  // ── UAE 지상 ──────────────────────────────────────────────────────────────
  w('gnd-uae001','렉라이터 전차 (UAE)','Leclerc MBT UAE','GROUND','NATO','OPERATIONAL','LOW','프랑스 르클레르 UAE 수출형. 436대. 사막개량',{weight:'56t',armament:'120mm CN120-26·12.7mm·7.62mm',crew:'3명',firstDeployed:'1994년',manufacturer:'GIAT',quantity:'436대'},['르클레르','UAE','사막개량','120mm'],['GIAT','UAE군'],undefined,undefined,85),

  // ── 이집트 지상 ───────────────────────────────────────────────────────────
  w('gnd-egy001','M1A1 에이브람스 이집트','M1A1 Abrams Egypt','GROUND','NATO','OPERATIONAL','LOW','이집트 에이브람스. 미국 공동생산(General Dynamics 이집트공장). 1,360대.',{weight:'65t',armament:'120mm M256A1',crew:'4명',firstDeployed:'1988년',manufacturer:'GD이집트공장',quantity:'1,360대'},['M1A1','이집트전차','공동생산'],['GD','이집트군'],undefined,undefined,88),
  w('gnd-egy002','M60A3 이집트','M60A3 Egypt','GROUND','NATO','OPERATIONAL','MED','미국 M60A3 이집트 운용. 900대. 예비전력.',{weight:'52.6t',armament:'105mm M68',crew:'4명',quantity:'900대'},['M60A3','이집트','105mm'],['이집트군'],undefined,undefined,80),

  // ── 브라질 지상 ───────────────────────────────────────────────────────────
  w('gnd-bra001','레오파르트 1A5 브라질','Leopard 1A5 BR','GROUND','NATO','OPERATIONAL','LOW','독일 레오파르트 1A5 브라질 운용. 220대. FILA 사격통제.',{weight:'42.4t',armament:'105mm L7A3',crew:'4명',firstDeployed:'1997년',quantity:'220대'},['레오파르트1','브라질','105mm'],['브라질군'],undefined,undefined,82),
  w('gnd-bra002','VBTP-MR 과라니 장갑차','VBTP-MR Guarani 6x6 APC','GROUND','NATO','OPERATIONAL','LOW','브라질 독자 개발 6×6 차륜형 장갑차. 수출형도 개발. 1,500대 목표.',{weight:'17t',crew:'2+11명',speed:'110km/h',firstDeployed:'2012년',manufacturer:'IVECO Brasil'},['과라니','브라질','6x6','차륜형'],['IVECO','브라질군'],undefined,'https://en.wikipedia.org/wiki/VBTP-MR_Guarani',78),

  // ── 멕시코 지상 ───────────────────────────────────────────────────────────
  w('gnd-mex001','DN-XI 군마 전차','DN-XI Marmon-Herrington Panther Tank','GROUND','NATO','OPERATIONAL','LOW','멕시코 독자 개발 경전차. 105mm 저압포. 소량 운용.',{weight:'28t',armament:'105mm 저압포',crew:'4명',firstDeployed:'1996년'},['DN-XI','멕시코','경전차'],['멕시코군'],undefined,undefined,65),

  // ── 이란 지상 ─────────────────────────────────────────────────────────────
  w('gnd-irn001','카라르 전차','Karrar MBT (Iran)','GROUND','IRAN','OPERATIONAL','HIGH','이란 독자 개발 주력전차 주장. T-72 기반 개량. 실제 수량 불명.',{weight:'52t(추정)',armament:'125mm 활강포·12.7mm',crew:'3명',firstDeployed:'2017년',manufacturer:'이란 국방군수부'},['카라르','이란전차','T-72기반','독자주장'],['이란국방부'],undefined,'https://en.wikipedia.org/wiki/Karrar_(tank)',55),
  w('gnd-irn002','졸파가르 전차','Zulfiqar-3 MBT (Iran)','GROUND','IRAN','OPERATIONAL','HIGH','이란 독자 개발 전차. T-72+T-80+M60 기술 혼합 주장. 1993년 첫 공개.',{weight:'50t(추정)',armament:'125mm 활강포',crew:'3명',firstDeployed:'1993년'},['졸파가르','이란전차','혼합기술'],['이란군'],undefined,'https://en.wikipedia.org/wiki/Zulfiqar_tank',58),
  w('gnd-irn003','BMP-2 이란 운용형','BMP-2 (Iran Boragh)','GROUND','IRAN','OPERATIONAL','MED','소련 BMP-2 이란 복제·개량형(보라). 수백 대 운용.',{weight:'14t',armament:'73mm 2A28 또는 23mm 2A7',crew:'3+7명',firstDeployed:'1990년대'},['보라','BMP-2','이란IFV'],['이란군'],undefined,undefined,68),

  // ── 튀르키예 지상 ─────────────────────────────────────────────────────────
  w('gnd-tur001','레오파르트 2A4 터키','Leopard 2A4 Turkey','GROUND','TURKEY','OPERATIONAL','MED','터키 레오파르트 2A4. 시리아 내전 일부 격파. 339대 운용.',{weight:'55t',armament:'120mm L44',crew:'4명',quantity:'339대'},['레오파르트2A4','터키','시리아'],['터키군'],'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Leopard_2_A7V_313_Bad_Frankenhausen_2024.JPG/330px-Leopard_2_A7V_313_Bad_Frankenhausen_2024.JPG','https://en.wikipedia.org/wiki/Leopard_2',85),
  w('gnd-tur002','M60T 사브라 전차','M60T Sabra (Turkey)','GROUND','TURKEY','OPERATIONAL','MED','M60A3 이스라엘 IMI 개량형 터키 운용. 120mm 활강포·ERA.',{weight:'59t',armament:'120mm MG-253 활강포·ERA',crew:'4명',firstDeployed:'2002년',manufacturer:'IMI'},['M60T','사브라','터키전차','120mm이스라엘'],['IMI','터키군'],undefined,'https://en.wikipedia.org/wiki/M60T_Sabra',82),
  w('gnd-tur003','키르피 MRAP','Kirpi MRAP','GROUND','TURKEY','OPERATIONAL','LOW','터키 독자 개발 MRAP. IED 방호. 쿠르드 반군 작전 실전. 수출 성공.',{weight:'14t',crew:'2+8명',speed:'110km/h',firstDeployed:'2009년',manufacturer:'BMC'},['키르피','MRAP','터키','IED방호'],['BMC','터키군'],undefined,'https://en.wikipedia.org/wiki/Kirpi_(MRAP)',82),
  w('gnd-tur004','ACV-15 IFV 터키','ACV-15 Armored Combat Vehicle','GROUND','TURKEY','OPERATIONAL','MED','미국 AIFV 기반 터키 면허생산 IFV. 25mm 기관포. 850대.',{weight:'14.7t',armament:'25mm Oerlikon·7.62mm·TOW',crew:'3+9명',firstDeployed:'1988년',quantity:'850대'},['ACV-15','터키IFV','25mm','면허생산'],['FNSS','터키군'],undefined,undefined,80),

  // ── 그리스 지상 ───────────────────────────────────────────────────────────
  w('gnd-gr001','레오파르트 2HEL 그리스','Leopard 2HEL Greece','GROUND','NATO','OPERATIONAL','LOW','그리스 레오파르트 2A6·2A4 개량형 170대.',{weight:'62.5t',armament:'120mm L55',crew:'4명',quantity:'170대'},['레오파르트2HEL','그리스전차','120mm'],['그리스군'],'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Leopard_2_A7V_313_Bad_Frankenhausen_2024.JPG/330px-Leopard_2_A7V_313_Bad_Frankenhausen_2024.JPG','https://en.wikipedia.org/wiki/Leopard_2',85),
  w('gnd-gr002','M48A5 그리스','M48A5 Patton Greece','GROUND','NATO','OPERATIONAL','LOW','그리스 M48A5 개량형. 파튼 계열. 350대 예비.',{weight:'49.7t',armament:'105mm M68',crew:'4명',quantity:'350대(예비)'},['M48A5','파튼','그리스'],['그리스군'],undefined,undefined,75),

  // ── 루마니아 지상 ─────────────────────────────────────────────────────────
  w('gnd-rom001','TR-85M1 비존 전차','TR-85M1 Bizon MBT','GROUND','NATO','OPERATIONAL','MED','루마니아 독자 개발 전차. T-55 기반 현대화. 100mm 강선포. NATO 회원국 중 독특한 전차.',{weight:'50t',armament:'100mm D-10TS 강선포·14.5mm·7.62mm',crew:'4명',firstDeployed:'1986년(M1:1999년)',quantity:'254대'},['TR-85M1','루마니아전차','100mm','NATO'],['루마니아군'],undefined,'https://en.wikipedia.org/wiki/TR-85',75),

  // ── 폴란드 지상 (추가) ────────────────────────────────────────────────────
  w('gnd-pol001','PT-91 트바르디 전차','PT-91 Twardy MBT (Poland)','GROUND','NATO','OPERATIONAL','MED','T-72M 폴란드 개량형. ERA·열상·사격통제. 말레이시아 수출.',{weight:'45.9t',armament:'125mm 2A46 활강포·12.7mm·7.62mm',crew:'3명',firstDeployed:'1993년',quantity:'232대(+말레이시아 수출)'},['PT-91','트바르디','폴란드','T-72개량'],['폴란드군'],'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Alabino05042017-40.jpg/330px-Alabino05042017-40.jpg','https://en.wikipedia.org/wiki/PT-91',82),
  w('gnd-pol002','KTO 로소막 장갑차','KTO Rosomak APC','GROUND','NATO','OPERATIONAL','LOW','핀란드 AMV 기반 폴란드 면허생산. 690대. 25mm 기관포.',{weight:'22t',armament:'Mk44 25mm·7.62mm',crew:'2+8명',speed:'100km/h',firstDeployed:'2004년',manufacturer:'Rosomak SA'},['로소막','폴란드','AMV기반','25mm'],['Rosomak SA','폴란드군'],undefined,'https://en.wikipedia.org/wiki/Rosomak',82),

  // ── 우크라이나 지상 ───────────────────────────────────────────────────────
  w('gnd-ukr001','T-84U 오플로트 전차','T-84U Oplot MBT (Ukraine)','GROUND','UKRAINE','OPERATIONAL','HIGH','우크라이나 독자 개발 주력전차. T-80 기반. 복합장갑·능동방호 코미트-3. 태국 수출.',{weight:'51t',armament:'125mm KBA-3 활강포·12.7mm·7.62mm',crew:'3명',speed:'70km/h',firstDeployed:'1999년',manufacturer:'하르키우 기계제작소'},['T-84U','오플로트','우크라이나전차','태국수출'],['하르키우기계','우크라이나군'],undefined,'https://en.wikipedia.org/wiki/T-84',80),
  w('gnd-ukr002','BTR-4E 부크세타브스카 IFV','BTR-4E Bucephalus IFV','GROUND','UKRAINE','OPERATIONAL','HIGH','우크라이나 독자 IFV. 30mm 기관포·AT-13 대전차미사일. 나이지리아·이라크 수출.',{weight:'17t',armament:'30mm ZTM-1·AT-13',crew:'3+7명',firstDeployed:'2008년',manufacturer:'하르키우기계'},['BTR-4E','우크라이나IFV','30mm','수출'],['하르키우기계','우크라이나군'],undefined,'https://en.wikipedia.org/wiki/BTR-4',78),

  // ── 스위스 지상 ───────────────────────────────────────────────────────────
  w('gnd-swi001','Pz87 레오파르트 스위스','Pz 87 Leo (Leopard 2A4 Switzerland)','GROUND','NATO','OPERATIONAL','LOW','스위스 레오파르트 2A4 운용. 130대. 중립국이나 고성능 전차 보유.',{weight:'55t',armament:'120mm L44',crew:'4명',quantity:'130대'},['레오파르트','스위스','중립국'],['스위스군'],'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Leopard_2_A7V_313_Bad_Frankenhausen_2024.JPG/330px-Leopard_2_A7V_313_Bad_Frankenhausen_2024.JPG','https://en.wikipedia.org/wiki/Leopard_2',85),

  // ── 노르웨이 지상 ─────────────────────────────────────────────────────────
  w('gnd-nor001','레오파르트 2A7NO 노르웨이','Leopard 2A7NO Norway','GROUND','NATO','DEVELOPMENT','LOW','노르웨이 레오파르트 2 최신 개량. 54대. APS 통합 예정.',{weight:'67t',armament:'120mm L55A1',crew:'4명',firstDeployed:'2025년(예상)',quantity:'54대'},['레오파르트2A7NO','노르웨이','APS'],['Rheinmetall','노르웨이군'],'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Leopard_2_A7V_313_Bad_Frankenhausen_2024.JPG/330px-Leopard_2_A7V_313_Bad_Frankenhausen_2024.JPG','https://en.wikipedia.org/wiki/Leopard_2',78),

  // ── 덴마크 지상 ───────────────────────────────────────────────────────────
  w('gnd-dnk001','레오파르트 2A7DK 덴마크','Leopard 2A7DK Denmark','GROUND','NATO','OPERATIONAL','LOW','덴마크 레오파르트 2A7 44대. 적극 우크라이나 지원.',{weight:'66t',armament:'120mm L55A1',crew:'4명',firstDeployed:'2023년',quantity:'44대'},['레오파르트2A7DK','덴마크','우크라이나지원'],['덴마크군'],'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Leopard_2_A7V_313_Bad_Frankenhausen_2024.JPG/330px-Leopard_2_A7V_313_Bad_Frankenhausen_2024.JPG','https://en.wikipedia.org/wiki/Leopard_2',88),

  // ── 핀란드 지상 ───────────────────────────────────────────────────────────
  w('gnd-fin001','레오파르트 2A6FIN 핀란드','Leopard 2A6FIN Finland','GROUND','NATO','OPERATIONAL','LOW','핀란드 레오파르트 2A6. 200대. NATO 가입 후 군사력 급강화.',{weight:'62.3t',armament:'120mm L55',crew:'4명',quantity:'200대'},['레오파르트2A6','핀란드','200대','NATO'],['핀란드군'],'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Leopard_2_A7V_313_Bad_Frankenhausen_2024.JPG/330px-Leopard_2_A7V_313_Bad_Frankenhausen_2024.JPG','https://en.wikipedia.org/wiki/Leopard_2',88),

  // ── 체코 지상 ─────────────────────────────────────────────────────────────
  w('gnd-cze001','T-72M4CZ 전차','T-72M4CZ Czech Republic','GROUND','NATO','OPERATIONAL','MED','T-72 체코 개량형. 프랑스 TURMS 사격통제·독일 MTU 엔진. 30대.',{weight:'48t',armament:'125mm 2A46M',crew:'3명',firstDeployed:'2004년',quantity:'30대'},['T-72M4CZ','체코전차','프랑스사격통제'],['체코군'],'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Alabino05042017-40.jpg/330px-Alabino05042017-40.jpg','https://en.wikipedia.org/wiki/T-72',78),

  // ── 슬로바키아 지상 ───────────────────────────────────────────────────────
  w('gnd-svk001','T-72M1 슬로바키아','T-72M1 Slovakia','GROUND','NATO','OPERATIONAL','MED','슬로바키아 T-72M1. 우크라이나 지원으로 보유량 감소.',{armament:'125mm 2A46',crew:'3명',quantity:'30대(우크라이나지원후)'},['T-72M1','슬로바키아','우크라이나지원'],['슬로바키아군'],'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Alabino05042017-40.jpg/330px-Alabino05042017-40.jpg','https://en.wikipedia.org/wiki/T-72',80),

  // ── 포르투갈 지상 ─────────────────────────────────────────────────────────
  w('gnd-por001','레오파르트 2A6 포르투갈','Leopard 2A6 Portugal','GROUND','NATO','OPERATIONAL','LOW','포르투갈 레오파르트 2A6. 37대.',{weight:'62.3t',armament:'120mm L55',crew:'4명',quantity:'37대'},['레오파르트','포르투갈','37대'],['포르투갈군'],'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Leopard_2_A7V_313_Bad_Frankenhausen_2024.JPG/330px-Leopard_2_A7V_313_Bad_Frankenhausen_2024.JPG','https://en.wikipedia.org/wiki/Leopard_2',82),

  // ── 헝가리 지상 ───────────────────────────────────────────────────────────
  w('gnd-hun001','레오파르트 2A7+ 헝가리','Leopard 2A7+ Hungary','GROUND','NATO','OPERATIONAL','LOW','헝가리 레오파르트 2A7+ 44대 도입. 2024년부터.',{weight:'67t',armament:'120mm L55A1',crew:'4명',firstDeployed:'2023년',quantity:'44대'},['레오파르트2A7','헝가리','44대'],['Rheinmetall','헝가리군'],'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Leopard_2_A7V_313_Bad_Frankenhausen_2024.JPG/330px-Leopard_2_A7V_313_Bad_Frankenhausen_2024.JPG','https://en.wikipedia.org/wiki/Leopard_2',85),
  w('gnd-hun002','Lynx KF41 헝가리','Lynx KF41 IFV Hungary','GROUND','NATO','DEVELOPMENT','LOW','Rheinmetall Lynx KF41 헝가리 218대 계약. 현지생산.',{weight:'44t',armament:'35mm MK35·스파이크LR2',crew:'3+8명',firstDeployed:'2025년(예상)',manufacturer:'Rheinmetall Hungary',quantity:'218대'},['Lynx','헝가리','IFV','Rheinmetall'],['Rheinmetall','헝가리군'],undefined,undefined,82),

  // ── 루마니아 지상 추가 ────────────────────────────────────────────────────
  w('gnd-rom002','레오파르트 2A8 루마니아','Leopard 2A8 Romania','GROUND','NATO','DEVELOPMENT','LOW','루마니아 레오파르트 2A8 200대 계약(2024년). 최신형.',{firstDeployed:'2026년+(예상)',quantity:'200대(계약)'},['레오파르트2A8','루마니아','200대','신규'],['Rheinmetall','루마니아군'],'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Leopard_2_A7V_313_Bad_Frankenhausen_2024.JPG/330px-Leopard_2_A7V_313_Bad_Frankenhausen_2024.JPG','https://en.wikipedia.org/wiki/Leopard_2',80),

  // ── 모로코 지상 ───────────────────────────────────────────────────────────
  w('gnd-mar001','M1A1 에이브람스 모로코','M1A1 Abrams Morocco SA','GROUND','NATO','OPERATIONAL','LOW','모로코 M1A1 에이브람스 222대. 북아프리카 최강 기갑력.',{weight:'65t',armament:'120mm M256A1',crew:'4명',firstDeployed:'2012년',quantity:'222대'},['M1A1','모로코','북아프리카'],['제너럴다이나믹스','모로코군'],undefined,undefined,85),

  // ── 쿠웨이트 지상 ────────────────────────────────────────────────────────
  w('gnd-kwt001','M1A2 에이브람스 쿠웨이트','M1A2 Abrams Kuwait','GROUND','NATO','OPERATIONAL','LOW','쿠웨이트 에이브람스 M1A2. 218대.',{weight:'66.8t',armament:'120mm M256A1',crew:'4명',firstDeployed:'1994년',quantity:'218대'},['M1A2','쿠웨이트','에이브람스'],['GD','쿠웨이트군'],undefined,undefined,85),

  // ── 이라크 지상 ───────────────────────────────────────────────────────────
  w('gnd-irq001','M1A1M 에이브람스 이라크','M1A1M Abrams Iraq','GROUND','NATO','OPERATIONAL','MED','이라크군 M1A1. 140대. IS전 실전. 일부 격파·파괴.',{weight:'65t',armament:'120mm M256A1',crew:'4명',firstDeployed:'2011년',quantity:'140대'},['M1A1','이라크','IS전','실전'],['GD','이라크군'],undefined,undefined,80),

  // ── 요르단 지상 ───────────────────────────────────────────────────────────
  w('gnd-jor001','찰린저 1 요르단','Challenger 1 (Al-Hussein) Jordan','GROUND','NATO','OPERATIONAL','LOW','영국 챌린저 1 요르단 수출. 392대. 알-후세인으로 개명.',{weight:'62t',armament:'120mm L11A5 강선포',crew:'4명',quantity:'392대'},['챌린저1','요르단','알후세인','수출'],['요르단군'],undefined,'https://en.wikipedia.org/wiki/Al-Hussein_(tank)',80),

  // ── 아르헨티나 지상 ───────────────────────────────────────────────────────
  w('gnd-arg001','TAM 경전차 아르헨티나','TAM Light Tank Argentina','GROUND','NATO','OPERATIONAL','LOW','아르헨티나 독자 개발 경전차. 독일 Marder 기반. 105mm 강선포. 200대.',{weight:'30t',armament:'105mm Rh-105-30 강선포',crew:'4명',firstDeployed:'1979년',manufacturer:'TAMSE',quantity:'200대'},['TAM','아르헨티나','경전차','105mm'],['TAMSE','아르헨티나군'],undefined,'https://en.wikipedia.org/wiki/TAM_(tank)',75),

  // ── 이스라엘 지상 추가 ────────────────────────────────────────────────────
  w('gnd-isr001','나메르 HAPC 중병력수송차','Namer Heavy APC (Israel)','GROUND','ISRAEL','OPERATIONAL','LOW','메르카바 기반 중병력수송차. 세계 최강 방호력 APC. 트로피 능동방호.',{weight:'60t',armament:'12.7mm·40mm·트로피APS',crew:'3+9명',firstDeployed:'2008년',manufacturer:'MANTAK'},['나메르','이스라엘APC','트로피','최강방호'],['MANTAK','이스라엘군'],undefined,'https://en.wikipedia.org/wiki/Namer',92),
  w('gnd-isr002','아이언 비전 능동방호','Trophy Active Protection System (APS)','GROUND','ISRAEL','OPERATIONAL','LOW','라파엘 트로피 능동방호. 로켓·미사일 가로채기. M1A2·레오파르트·메르카바 탑재.',{firstDeployed:'2010년',manufacturer:'라파엘'},['트로피','APS','능동방호','M1A2','메르카바'],['라파엘','이스라엘군','미육군'],undefined,'https://en.wikipedia.org/wiki/Trophy_(countermeasures)',95),
  w('gnd-isr003','에이탄 차륜형 APC','Eitan 8x8 Wheeled APC','GROUND','ISRAEL','OPERATIONAL','LOW','이스라엘 최신 8×8 중장갑 APC. 30mm 기관포 원격무장. 트로피 APS.',{weight:'35t',armament:'30mm 기관포 RCWS·12.7mm·트로피APS',crew:'3+9명',speed:'90km/h',firstDeployed:'2020년'},['에이탄','이스라엘APC','8x8','트로피'],['이스라엘군'],undefined,'https://en.wikipedia.org/wiki/Eitan_(APC)',82),

  // ── 싱가포르 지상 ────────────────────────────────────────────────────────
  w('gnd-sg001','레오파르트 2A4 싱가포르','Leopard 2A4 Singapore','GROUND','NATO','OPERATIONAL','LOW','싱가포르 레오파르트 2A4SG. 66대. 도시전 개조.',{weight:'55t',armament:'120mm L44',crew:'4명',firstDeployed:'2007년',quantity:'66대'},['레오파르트','싱가포르','도시전개조'],['싱가포르군'],'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Leopard_2_A7V_313_Bad_Frankenhausen_2024.JPG/330px-Leopard_2_A7V_313_Bad_Frankenhausen_2024.JPG','https://en.wikipedia.org/wiki/Leopard_2',85),
  w('gnd-sg002','IFV-25 Bionix 싱가포르','Bionix II IFV Singapore','GROUND','NATO','OPERATIONAL','LOW','싱가포르 독자 IFV. 25mm 기관포·AT-5. 800대.',{weight:'23t',armament:'25mm EX-35·7.62mm·AT-5',crew:'3+7명',speed:'70km/h',firstDeployed:'1997년',quantity:'800대'},['Bionix II','싱가포르IFV','25mm'],['ST Engineering','싱가포르군'],undefined,'https://en.wikipedia.org/wiki/Bionix',85),

  // ── 말레이시아 지상 ───────────────────────────────────────────────────────
  w('gnd-mys001','PT-91M 페닝가트 전차','PT-91M Pendekar MBT (Malaysia)','GROUND','NATO','OPERATIONAL','MED','폴란드 PT-91M 말레이시아 수출. 48대. 동남아 최강 전차.',{weight:'46t',armament:'125mm 2A46M',crew:'3명',firstDeployed:'2005년',quantity:'48대'},['PT-91M','말레이시아','페닝가트','동남아최강'],['폴란드군수','말레이시아군'],undefined,'https://en.wikipedia.org/wiki/PT-91#PT-91M',80),

  // ── 태국 지상 ─────────────────────────────────────────────────────────────
  w('gnd-tha001','T-84U 오플로트-T 태국','T-84 Oplot-T Thailand','GROUND','NATO','OPERATIONAL','MED','우크라이나 T-84U 오플로트 태국 49대 도입. 납품 지연 논란.',{weight:'51t',armament:'125mm KBA-3',crew:'3명',firstDeployed:'2015년',quantity:'49대'},['오플로트','태국','우크라이나수출','납품지연'],['우크라이나','태국군'],undefined,undefined,72),

  // ── 인도네시아 지상 ───────────────────────────────────────────────────────
  w('gnd-idn001','레오파르트 2A4 인도네시아','Leopard 2A4 Indonesia','GROUND','NATO','OPERATIONAL','LOW','독일 레오파르트 2A4 인도네시아 103대. 동남아 최다 레오파르트.',{weight:'55t',armament:'120mm L44',crew:'4명',firstDeployed:'2014년',quantity:'103대'},['레오파르트','인도네시아','동남아최다'],['인도네시아군'],'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Leopard_2_A7V_313_Bad_Frankenhausen_2024.JPG/330px-Leopard_2_A7V_313_Bad_Frankenhausen_2024.JPG','https://en.wikipedia.org/wiki/Leopard_2',85),

  // ── 베트남 지상 ───────────────────────────────────────────────────────────
  w('gnd-vnm001','T-90SK 베트남','T-90SK Vietnam','GROUND','NATO','OPERATIONAL','HIGH','러시아 T-90S 베트남 도입. 64대. 중국 남중국해 긴장 대응.',{weight:'46.5t',armament:'125mm 2A46M-4',crew:'3명',firstDeployed:'2019년',quantity:'64대'},['T-90SK','베트남','중국대응','남중국해'],['러시아','베트남군'],'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/T-90M.jpg/330px-T-90M.jpg','https://en.wikipedia.org/wiki/T-90',82),

]
