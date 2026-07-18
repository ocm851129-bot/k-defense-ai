import type { WeaponSystem } from './weapons'
const w = (id:string,name:string,nameEng:string,cat:WeaponSystem['category'],origin:WeaponSystem['origin'],status:WeaponSystem['status'],threat:WeaponSystem['threatRating'],desc:string,specs:WeaponSystem['specs'],tags:string[],sources:string[],img?:string,wiki?:string,conf=90): WeaponSystem=>({id,name,nameEng,category:cat,origin,status,threatRating:threat,description:desc,detail:`## ${nameEng}\n\n${desc}\n\n### 주요 제원\n${Object.entries(specs).filter(([,v])=>v).map(([k,v])=>`- ${k}: ${v}`).join('\n')}`,specs,confidence:conf,lastUpdated:'2026-07-03',relatedIntelIds:[],tags,sources,imageUrl:img,wikiUrl:wiki})

export const WEAPONS_BATCH33_GLOBAL_EXPAND: WeaponSystem[] = [

  // ── 소화기 추가 ──────────────────────────────────────────────────────
  w('sa-g001','HK416 독일 돌격소총','HK416 A7 Assault Rifle Germany HK','GROUND','GERMANY','OPERATIONAL','LOW',
    'H&K HK416. 단기통식 가스. USMC·노르웨이·프랑스 표준. 오사마 빈라덴 제거 작전 사용.',
    {weight:'3.6kg',caliber:'5.56×45mm NATO',capacity:'30발',fireRate:'900rpm',manufacturer:'헤클러&코흐'},
    ['HK416','독일소총','USMC','프랑스표준','빈라덴작전'],['헤클러코흐','특수부대'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/HK416-A5.jpg/320px-HK416-A5.jpg','https://en.wikipedia.org/wiki/Heckler_%26_Koch_HK416',92),

  w('sa-g002','FN SCAR-L Mk16 소총','FN SCAR-L Mk16 Assault Rifle Belgium','GROUND','BELGIUM','OPERATIONAL','MED',
    'FN SCAR-L 5.56mm. SOCOM 채택. 모듈식 설계. 다수 특수부대 운용.',
    {weight:'3.04kg',caliber:'5.56×45mm',capacity:'30발',fireRate:'625rpm',manufacturer:'FN 에르스탈'},
    ['SCAR-L','Mk16','FN','SOCOM','벨기에'],['FN에르스탈','SOCOM'],
    undefined,'https://en.wikipedia.org/wiki/FN_SCAR',85),

  w('sa-g003','Tavor TAR-21 이스라엘','Tavor TAR-21 Bullpup Assault Rifle Israel','GROUND','ISRAEL','OPERATIONAL','MED',
    '이스라엘 타보르 불펍 소총. IDF 표준. 짧지만 긴 총열. 도시전 최적.',
    {weight:'3.27kg',caliber:'5.56×45mm',capacity:'30발',manufacturer:'IWI'},
    ['타보르','불펍','이스라엘','IDF표준','도시전'],['IWI','IDF'],
    undefined,'https://en.wikipedia.org/wiki/IWI_Tavor_TAR-21',88),

  w('sa-g004','K1A 단축소총 한국','K1A Submachine Gun Korea Compact','GROUND','ROK','OPERATIONAL','LOW',
    '한국 K1A 기관단총/단축소총. 5.56mm 불펍 유사. 특수전·기갑·해군 지급.',
    {weight:'2.87kg',caliber:'5.56×45mm',capacity:'30발',fireRate:'700rpm',manufacturer:'S&T모티브'},
    ['K1A','한국기관단총','특수전','기갑','해군'],['S&T모티브','육군'],
    undefined,'https://en.wikipedia.org/wiki/K1A',85),

  w('sa-g005','M249 분대지원화기','M249 SAW Squad Automatic Weapon USA','GROUND','BELGIUM','OPERATIONAL','MED',
    '미 M249 분대지원화기. FN Minimi 기반. 200발 탄띠. 보병분대 화력 핵심.',
    {weight:'7.5kg',caliber:'5.56×45mm',capacity:'200발 탄띠',fireRate:'750rpm',manufacturer:'FN에르스탈'},
    ['M249','SAW','분대지원화기','FN미니미','200발탄띠'],['FN에르스탈','미육군'],
    undefined,'https://en.wikipedia.org/wiki/M249_light_machine_gun',88),

  w('sa-g006','M82A1 바렛 대물저격소총','M82A1 Barrett .50 Cal Anti-Material Sniper','GROUND','USA','OPERATIONAL','MED',
    '바렛 M82A1 .50구경 반자동 대물 저격소총. 경장갑·엔진 파괴. 2,000m 유효 사거리.',
    {weight:'14kg',caliber:'.50 BMG(12.7×99mm)',range:'2,000m(유효)',firstDeployed:'1982년',manufacturer:'바렛 파이어암즈'},
    ['M82A1','바렛','대물저격','50구경','경장갑파괴'],['바렛','미군·특수부대'],
    undefined,'https://en.wikipedia.org/wiki/Barrett_M82',90),

  w('sa-g007','RPG-29 이란 헤즈볼라','RPG-29 Vampir Anti-Tank Russia Iran','GROUND','RUSSIA','OPERATIONAL','HIGH',
    'RPG-29. 탠덤 탄두. 메르카바 Mk4 관통 성공 사례(레바논 2006). 헤즈볼라·하마스 보유.',
    {weight:'18.8kg',payload:'탠덤 HEAT',range:'500m',firstDeployed:'1989년'},
    ['RPG-29','탠덤탄두','메르카바관통','헤즈볼라','2006레바논'],['러시아','이란'],
    undefined,'https://en.wikipedia.org/wiki/RPG-29',82),

  w('sa-g008','Milkor MGL 40mm 유탄발사기','Milkor MGL 40mm Multiple Grenade Launcher','GROUND','SOUTH_AFRICA','OPERATIONAL','MED',
    '남아공 밀코어 MGL 6발 회전식 유탄발사기. 전 세계 경찰·군 채택.',
    {weight:'5.3kg',caliber:'40×46mm',capacity:'6발',range:'375m',manufacturer:'밀코어'},
    ['MGL','유탄발사기','남아공','6발회전식','전세계채택'],['밀코어'],
    undefined,'https://en.wikipedia.org/wiki/Milkor_MGL',80),

  // ── 추가 방공 체계 ────────────────────────────────────────────────────
  w('ad-add001','아이언피스트 이스라엘 APS','Iron Fist Active Protection System Israel','GROUND','ISRAEL','OPERATIONAL','HIGH',
    '엘빗 아이언피스트. EFP 자폭 방호. M2 브래들리 탑재 미국 실험. 중량부담 없음.',
    {firstDeployed:'2014년',manufacturer:'엘빗'},
    ['아이언피스트','APS','이스라엘','EFP방호','브래들리'],['엘빗','미육군'],
    undefined,undefined,80),

  w('ad-add002','SHORAD L-SHORAD 미육군','L-SHORAD Indirect Fire Protection USA','SAM','USA','DEVELOPMENT','MED',
    '미 육군 스트라이커 기반 단거리 방공. 스팅어·레이시온 위험 SHORAD 레이더.',
    {range:'5km+',firstDeployed:'2022년(초도)',manufacturer:'레이시언'},
    ['L-SHORAD','단거리방공','스트라이커','미육군'],['레이시언','미육군'],
    undefined,undefined,78),

  w('ad-add003','StarStreak 영국 단거리 MANPADS','StarStreak HVM Lightweight MANPADs UK','SAM','UK','OPERATIONAL','MED',
    '영국 스타스트릭. 마하 3.5 레이저빔 유도. 우크라이나 공급. 초음속 표적 요격 가능.',
    {speed:'마하 3.5',range:'7km',firstDeployed:'1997년',manufacturer:'탈레스UK'},
    ['스타스트릭','영국MANPADS','레이저빔','우크라이나','마하3.5'],['탈레스UK','영국군'],
    undefined,'https://en.wikipedia.org/wiki/Starstreak_missile',85),

  w('ad-add004','스팅어 FIM-92F 미국 MANPADS','FIM-92F Stinger Block 1 Upgrade USA','SAM','USA','OPERATIONAL','HIGH',
    '미국 스팅어 최신 블록1 개량. IIR 탐색기·교란 저항. 우크라이나·아프간·리비아 실전.',
    {range:'8km',speed:'마하 2.2',firstDeployed:'1981년(F형: 2003년)',manufacturer:'레이시언'},
    ['스팅어','FIM-92F','MANPADS','IIR','우크라이나'],['레이시언','미군'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Voorzijde_van_een_Stinger_lanceerbuis_met_richt-afvuurapparatuur_%282086-065-004%29.jpg/330px-Voorzijde_van_een_Stinger_lanceerbuis_met_richt-afvuurapparatuur_%282086-065-004%29.jpg','https://en.wikipedia.org/wiki/FIM-92_Stinger',92),

  w('ad-add005','HQ-17A 단거리방공 중국','HQ-17A Tor-M2KM Derivative China','SAM','CHINA','OPERATIONAL','HIGH',
    '중국 Tor-M2 기반 단거리방공. HQ-17. 드론·순항미사일 대응. 차량 탑재.',
    {range:'15km',ceiling:'10km',firstDeployed:'2020년대',manufacturer:'CASIC'},
    ['HQ-17A','중국단거리방공','TOR기반','드론방어'],['CASIC','PLA'],
    undefined,undefined,75),

  // ── 추가 함정 ─────────────────────────────────────────────────────────
  w('ship-add001','K300 한국 고속상륙정','Landing Craft Air Cushion LCAC Korea','SHIP','ROK','OPERATIONAL','LOW',
    '한국 공기부양 고속상륙정. 50노트. 상륙전 핵심. 독도함 탑재 운용.',
    {displacement:'170t(만재)',speed:'50노트',firstDeployed:'2000년대',manufacturer:'현대중공업'},
    ['LCAC','공기부양','고속상륙정','독도함탑재'],['현대중공업','해군'],
    undefined,undefined,80),

  w('ship-add002','이탈리아 FREMM 카를로베르가미니','FREMM Bergamini Carlo Bergamini Italy','SHIP','NATO','OPERATIONAL','MED',
    '이탈리아 카를로베르가미니함. FREMM 1번함. Aster 15/30·MILAS.',
    {displacement:'6,700t',armament:'Aster 15/30·MILAS',crew:'200명',firstDeployed:'2013년',manufacturer:'핀칸티에리'},
    ['카를로베르가미니','이탈리아FREMM','Aster30','MILAS'],['핀칸티에리','이탈리아해군'],
    undefined,undefined,82),

  w('ship-add003','노르웨이 프리드쇼프 난센 호위함','Fridtjof Nansen-class Frigate Norway Aegis','SHIP','NORWAY','OPERATIONAL','HIGH',
    '노르웨이 이지스 호위함. SPY-1F 소형 이지스. NSM·ESSM. 5척.',
    {displacement:'5,290t',armament:'NSM·ESSM·76mm·Mk41 VLS',crew:'120명',firstDeployed:'2006년',quantity:'5척',manufacturer:'나반티아'},
    ['난센급','노르웨이이지스','SPY-1F','NSM'],['나반티아','노르웨이해군'],
    undefined,'https://en.wikipedia.org/wiki/Fridtjof_Nansen-class_frigate',88),

  w('ship-add004','그리스 HYDRA급 호위함','Hydra-class MEKO 200HN Greece Frigate','SHIP','GREECE','OPERATIONAL','MED',
    '그리스 MEKO 200HN 호위함. 하푼·SM-1·STIR. 4척. 터키 억제.',
    {displacement:'3,360t',armament:'하푼·SM-1·Mk41·RIM-7·76mm',crew:'173명',firstDeployed:'1992년',quantity:'4척',manufacturer:'TKMS·엘레프시스'},
    ['하이드라급','그리스호위함','MEKO200','터키억제'],['TKMS','그리스해군'],
    undefined,undefined,80),

  // ── 추가 지상무기 ─────────────────────────────────────────────────────
  w('gd-add001','체코 DANA 차륜형 자주포','DANA 152mm Wheeled SPH Czech Slovakia','ARTILLERY','CZECH','OPERATIONAL','LOW',
    '체코슬로바키아 DANA 152mm 차륜형. 1977년. 구소련 계열국 수출. 우크라이나 공급.',
    {weight:'29.25t',armament:'152mm D-20 곡사포',crew:'4명',range:'18km',firstDeployed:'1977년',manufacturer:'ZTS TEES'},
    ['DANA','체코자주포','152mm','차륜형','우크라이나'],['ZTS TEES','우크라이나'],
    undefined,'https://en.wikipedia.org/wiki/vz._77_DANA',80),

  w('gd-add002','스웨덴 Archer 자주포 우크라이나','Archer FH77BW SPH Sweden Ukraine','ARTILLERY','SWEDEN','OPERATIONAL','LOW',
    '스웨덴 아처 자주포. 우크라이나 공급. 6발 20초 연사. 완전 자동 운용.',
    {weight:'30t',armament:'155mm/52구경장',crew:'3명',range:'60km(ER탄)',firstDeployed:'2009년(스웨덴)',manufacturer:'BAE Systems'},
    ['아처','스웨덴자주포','우크라이나','자동운용','60km'],['BAE Systems','스웨덴군'],
    undefined,'https://en.wikipedia.org/wiki/Archer_(artillery_system)',88),

  w('gd-add003','AH-64D 아파치 롱보우 네덜란드','AH-64D Apache Longbow Netherlands Recon','HELICOPTER','USA','OPERATIONAL','HIGH',
    '네덜란드 아파치 롱보우. 롱보우 FCR 레이더. 말리·아프간 실전.',
    {speed:'293km/h',crew:'2명',armament:'30mm·헬파이어·하이드라',firstDeployed:'1998년(네덜란드)',quantity:'28기',manufacturer:'보잉'},
    ['아파치롱보우','네덜란드','FCR레이더','말리','아프간'],['보잉','네덜란드군'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/AH-64D_Apache_Longbow.jpg/320px-AH-64D_Apache_Longbow.jpg','https://en.wikipedia.org/wiki/Boeing_AH-64_Apache',85),

  w('gd-add004','폴란드 K2PL 한국형 흑표','K2PL Black Panther Poland Polish Version','GROUND','ROK','DEVELOPMENT','HIGH',
    '폴란드 K2PL. 한화-폴란드 공동개발 K2 개량형. 1,000대. 2026년 생산 목표.',
    {weight:'57t',armament:'120mm 활강포·APS·폴란드특화장비',firstDeployed:'2026년(목표)',quantity:'1,000대(계획)',manufacturer:'현대로템·PGZ'},
    ['K2PL','폴란드K2','한화','1000대','공동개발'],['현대로템','PGZ'],
    undefined,undefined,82),

  w('gd-add005','이집트 K9 비즈르 자주포','K9 Bisr Egypt 200 SPH Export','ARTILLERY','ROK','OPERATIONAL','LOW',
    '이집트 K9 비즈르. 200대. 아랍 최초 K9 수출. 사막 특화 환경.',
    {weight:'47t',armament:'155mm/52구경장',firstDeployed:'2023년(이집트)',quantity:'200대(계획)',manufacturer:'한화에어로스페이스'},
    ['K9비즈르','이집트','200대','한국수출','아랍최초'],['한화에어로스페이스','이집트군'],
    undefined,undefined,85),

  // ── 기타 추가 무기 ─────────────────────────────────────────────────────
  w('misc-001','MH-60R 시호크 대잠헬기','MH-60R Seahawk ASW Helicopter USN','HELICOPTER','USA','OPERATIONAL','HIGH',
    '미 해군 최신 대잠헬기. APS-153·HELRAS소나·MK54어뢰. 다수 동맹국 수출.',
    {speed:'270km/h',crew:'4명',armament:'MK54 어뢰·AGM-114 헬파이어·M60D',firstDeployed:'2001년',quantity:'300기+',manufacturer:'시코르스키'},
    ['MH-60R','시호크','대잠헬기','APS-153','MK54'],['시코르스키','USN'],
    undefined,'https://en.wikipedia.org/wiki/Sikorsky_SH-60_Seahawk',90),

  w('misc-002','H145M HForce 다목적헬기','H145M HForce Armed Helicopter Germany','HELICOPTER','GERMANY','OPERATIONAL','MED',
    '에어버스 H145M HForce. 경무장 다목적. 70mm 로켓·스파이크·기관총. 독일·노르웨이 등.',
    {speed:'238km/h',crew:'1~2명',armament:'70mm 로켓·스파이크·12.7mm',firstDeployed:'2017년(독일)',manufacturer:'에어버스헬리콥터'},
    ['H145M','HForce','독일헬기','스파이크','다목적무장'],['에어버스','독일군'],
    undefined,undefined,82),

  w('misc-003','ScanEagle 정찰드론 미국','ScanEagle UAV Boeing Insitu Tactical Recon','UAV','USA','OPERATIONAL','MED',
    '보잉 인시투 스캔이글. 사출식 발진. 해군·육군·동맹국 전술 정찰. 20시간 체공.',
    {ceiling:'5.9km',speed:'148km/h',firstDeployed:'2005년',manufacturer:'보잉 인시투'},
    ['스캔이글','전술정찰드론','사출발진','20시간'],['보잉인시투','USN·육군'],
    undefined,'https://en.wikipedia.org/wiki/Boeing_Insitu_ScanEagle',85),

  w('misc-004','Spike ER2 대전차미사일 확장','Spike-ER2 Anti-Tank 16km Israel Extended','MISSILE','ISRAEL','OPERATIONAL','HIGH',
    '스파이크 ER2 최장사거리. 16km. EO/IIR 이중 탐색기. F/A-18·CH-47 탑재.',
    {range:'16km',firstDeployed:'2019년',manufacturer:'라파엘'},
    ['스파이크ER2','16km','대전차','이스라엘','헬기탑재'],['라파엘','IDF'],
    undefined,undefined,85),

  w('misc-005','GMLRS-ER 정밀로켓 연장','GMLRS-ER Extended Range 150km HIMARS','MISSILE','USA','DEVELOPMENT','HIGH',
    'GMLRS 사거리 연장형. 150km. HIMARS·M270 탑재. ATACMS와 중간 사거리.',
    {range:'150km',firstDeployed:'2024년+(IOC)',manufacturer:'록히드마틴'},
    ['GMLRS-ER','150km','HIMARS','정밀로켓','연장형'],['록히드마틴','미육군'],
    undefined,undefined,80),

  w('misc-006','VAMPIRE 우크라이나 대드론','VAMPIRE Counter-UAV System Ukraine USA','GROUND','USA','OPERATIONAL','MED',
    '미국 VAMPIRE 대드론 시스템. 70mm APKWS 레이저유도. 픽업트럭 탑재. 우크라이나 공급.',
    {range:'5km',firstDeployed:'2022년(우크라이나)',manufacturer:'L3Harris'},
    ['VAMPIRE','대드론','우크라이나','APKWS','픽업트럭'],['L3Harris','미육군'],
    undefined,undefined,80),

  w('misc-007','SHORAD VSHORAD 벨기에 미스트랄','Mistral VSHORAD Belgium Ground Platform','SAM','FRANCE','OPERATIONAL','MED',
    '벨기에 미스트랄 4연장 차량 탑재 VSHORAD. NATO 표준. 드론·헬기 대응.',
    {firstDeployed:'2000년대',manufacturer:'MBDA'},
    ['미스트랄','벨기에','VSHORAD','4연장','드론대응'],['MBDA','벨기에군'],
    undefined,undefined,78),

  w('misc-008','일본 03式 중거리SAM 개량','03 Chū-SAM Kai Ballistic Missile Defense Japan','SAM','JAPAN','DEVELOPMENT','HIGH',
    '일본 03식 중거리 SAM 개량형. 사거리 100km+. 이지스함 SM-3 보완.',
    {range:'100km+(개량)',firstDeployed:'2025년(목표)',manufacturer:'미쓰비시·도시바'},
    ['03식개량','일본방공','탄도미사일대응','SM-3보완'],['미쓰비시','항공자위대'],
    undefined,undefined,75),

  w('misc-009','SHORAD 50kW 고에너지레이저 독일','60kW HEL Rheinmetall High Energy Laser Germany','GROUND','GERMANY','DEVELOPMENT','MED',
    '라인메탈 60kW 레이저 방공. 소형드론·박격포 요격. 2022년 20kW→60kW 시험 성공.',
    {firstDeployed:'2023년(시험)',manufacturer:'Rheinmetall'},
    ['라인메탈레이저','60kW','독일','고에너지레이저','드론요격'],['Rheinmetall','독일군'],
    undefined,undefined,75),

  w('misc-010','한국 천궁-II 수출 사우디','Cheongung-II M-SAM Saudi Arabia Export','SAM','ROK','DEVELOPMENT','HIGH',
    '천궁-II 사우디 수출. 2024년 38억불 계약. 한국 방산 역대 최대 단일 계약.',
    {range:'40km',ceiling:'20km',firstDeployed:'2025년+(사우디)',manufacturer:'LIG넥스원·한화시스템'},
    ['천궁II','사우디수출','38억불','한국방산최대','M-SAM'],['LIG넥스원','사우디'],
    undefined,undefined,90),

  w('misc-011','그리스 T-80U 전차 구소련','T-80U Greece Soviet-Era Tank Acquisition','GROUND','RUSSIA','OPERATIONAL','MED',
    '그리스 T-80U. 소련 붕괴 후 취득. 525대. NATO내 유일 러시아제 주력전차 보유국.',
    {weight:'46t',armament:'125mm 2A46-M1+AT-8',crew:'3명',firstDeployed:'1990년대(그리스)',quantity:'525대',manufacturer:'하리코프'},
    ['T-80U','그리스','구소련전차','NATO','유일'],['하리코프','그리스육군'],
    undefined,undefined,78),

  w('misc-012','핀란드 K9FIN 모르스 자주포','K9FIN Moukari SPH Finland 48 Guns','ARTILLERY','ROK','OPERATIONAL','LOW',
    '핀란드 K9FIN. 48문. 러시아 국경 강화. 우크라이나 전쟁 후 신속 도입.',
    {weight:'47t',armament:'155mm/52구경장',range:'54km(ERBB)',firstDeployed:'2023년(핀란드)',quantity:'48문',manufacturer:'한화에어로스페이스'},
    ['K9FIN','핀란드','모르스','48문','러시아국경'],['한화에어로스페이스','핀란드군'],
    undefined,undefined,90),

  w('misc-013','에스토니아 K9A2 자주포','K9A2 Estonia Baltic State SAM Contract','ARTILLERY','ROK','DEVELOPMENT','LOW',
    '에스토니아 K9A2 계약. 발트 3국 중 첫 K9. 러시아 억제.',
    {firstDeployed:'2025년+(에스토니아)',manufacturer:'한화에어로스페이스'},
    ['K9A2','에스토니아','발트3국','러시아억제'],['한화에어로스페이스','에스토니아군'],
    undefined,undefined,82),

  w('misc-014','루마니아 F-16 우크라이나 우회','F-16AM Block 15 Romania Ukraine Transfer','AIRCRAFT','USA','OPERATIONAL','HIGH',
    '루마니아 F-16AM. 우크라이나 훈련 기지 지원. 비직접 전투 지원.',
    {speed:'마하 2.0',crew:'1명',firstDeployed:'2023년(루마니아)'},
    ['F-16AM','루마니아','우크라이나훈련지원','NATO'],['루마니아공군'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/F-16_June_2008.jpg/330px-F-16_June_2008.jpg','https://en.wikipedia.org/wiki/General_Dynamics_F-16_Fighting_Falcon',80),

  w('misc-015','Leopard 1A5 우크라이나 독일 구형','Leopard 1A5 Ukraine German Old Tanks','GROUND','GERMANY','OPERATIONAL','LOW',
    '독일·벨기에·덴마크 레오파르트 1A5 우크라이나 공급. 200대+. 성능 부족 논란.',
    {weight:'42.4t',armament:'105mm L7A3',crew:'4명',firstDeployed:'1987년(A5)/2023년(우크라이나)',quantity:'200대+(우크라이나)',manufacturer:'KMW'},
    ['레오파르트1A5','우크라이나','독일','200대','구형논란'],['KMW','우크라이나군'],
    undefined,undefined,80),

  w('misc-016','T-72M1 폴란드 체코 우크라이나','T-72M1 Poland Czech Ukraine Donation','GROUND','RUSSIA','OPERATIONAL','HIGH',
    '폴란드·체코 T-72M1 대규모 우크라이나 공급. 러시아 전차 대응 구소련 전차.',
    {weight:'41.5t',armament:'125mm 2A46M',crew:'3명',firstDeployed:'1973년(기본)/1993년(M1R)'},
    ['T-72M1','폴란드체코','우크라이나공급','구소련전차'],['폴란드체코','우크라이나군'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Alabino05042017-40.jpg/330px-Alabino05042017-40.jpg','https://en.wikipedia.org/wiki/T-72',80),

]
