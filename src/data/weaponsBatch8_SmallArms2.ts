import type { WeaponSystem } from './weapons'
const w = (id:string,name:string,nameEng:string,cat:WeaponSystem['category'],origin:WeaponSystem['origin'],status:WeaponSystem['status'],threat:WeaponSystem['threatRating'],desc:string,specs:WeaponSystem['specs'],tags:string[],sources:string[],img?:string,wiki?:string,conf=88): WeaponSystem=>({id,name,nameEng,category:cat,origin,status,threatRating:threat,description:desc,detail:`## ${nameEng}\n\n${desc}\n\n### 주요 제원\n${Object.entries(specs).filter(([,v])=>v).map(([k,v])=>`- ${k}: ${v}`).join('\n')}`,specs,confidence:conf,lastUpdated:'2026-07-01',relatedIntelIds:[],tags,sources,imageUrl:img,wikiUrl:wiki})

export const WEAPONS_BATCH8_SMALLARMS2: WeaponSystem[] = [

  // ── 미국 소화기 ──────────────────────────────────────────────────────────
  w('sa2-usa001','HK416 A5 돌격소총','HK416 A5 Assault Rifle','RIFLE','USA','OPERATIONAL','LOW',
    'HK 가스피스톤 AR-15 계열. 미 해병대 IAR·델타포스 주력 소총. 노르웨이·프랑스(HK416F)·독일 채택.',
    {caliber:'5.56×45mm NATO',weight:'3.6kg',fireRate:'700~900rpm',capacity:'30발',firstDeployed:'2005년',manufacturer:'Heckler & Koch'},
    ['HK416','미군특수전','가스피스톤','노르웨이','프랑스'],['HK','USSOCOM'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/HK416-A5.jpg/320px-HK416-A5.jpg','https://en.wikipedia.org/wiki/HK416',95),

  w('sa2-usa002','SIG MCX 스페아 LMG','SIG MCX SPEAR LMG','MG','USA','DEVELOPMENT','LOW',
    'NGSW 차기분대화기 프로그램 선정. 6.8mm×51mm 탄. M249 대체. 빔-투어 규격 NGSW-AR.',
    {caliber:'6.8×51mm Common Cartridge',weight:'5.6kg(LMG)',fireRate:'600rpm',capacity:'드럼 탄창',firstDeployed:'2023년+(채택)'},
    ['NGSW','SIG MCX SPEAR','6.8mm','M249대체','차기분대화기'],['SIG Sauer','USARMY'],undefined,undefined,82),

  w('sa2-usa003','SIG XM5 돌격소총','SIG XM5 NGSW Assault Rifle','RIFLE','USA','DEVELOPMENT','LOW',
    'NGSW-R. M4A1 대체 차기소총. 6.8mm×51mm. SIG XM5 선정(2022년). 서프레서 통합.',
    {caliber:'6.8×51mm',weight:'3.8kg',fireRate:'800rpm',capacity:'20발',firstDeployed:'2023년+(채택)',manufacturer:'SIG Sauer'},
    ['XM5','NGSW-R','M4대체','6.8mm','서프레서'],['SIG Sauer','USARMY'],
    undefined,'https://en.wikipedia.org/wiki/SIG_SPEAR',80),

  w('sa2-usa004','M110 SASS 반자동저격소총','M110 Semi-Automatic Sniper System','SNIPER','USA','OPERATIONAL','LOW',
    '7.62mm 반자동 저격. KAC SR-25 기반. 사거리 800m. M24 SWS 보완.',
    {caliber:'7.62×51mm NATO',weight:'6.94kg',range:'800m',capacity:'10~20발',firstDeployed:'2007년',manufacturer:'Knight\'s Armament'},
    ['M110','SASS','반자동저격','7.62mm','KAC'],['KAC','USARMY'],
    undefined,'https://en.wikipedia.org/wiki/M110_Semi-Automatic_Sniper_System',90),

  w('sa2-usa005','TAC-50 대물저격총','McMillan TAC-50 Anti-Material Rifle','SNIPER','USA','OPERATIONAL','LOW',
    '.50 BMG 볼트액션 대물저격총. 2002년 캐나다 아프간서 2,430m 저격 세계기록. 캐나다·UAE 운용.',
    {caliber:'.50 BMG (12.7×99mm)',weight:'11.8kg',range:'2,400m',capacity:'5발',firstDeployed:'1980년대',manufacturer:'McMillan Firearms'},
    ['TAC-50','대물저격','50BMG','세계기록','캐나다'],['McMillan','캐나다군'],
    undefined,'https://en.wikipedia.org/wiki/McMillan_TAC-50',92),

  w('sa2-usa006','Mk 48 Mod 1 기관총','Mk 48 Mod 1 GPMG','MG','USA','OPERATIONAL','LOW',
    '7.62mm 경량 기관총. SOF 전용. FN Minimi/M249 기반. 특수전사령부 운용.',
    {caliber:'7.62×51mm NATO',weight:'8.2kg',fireRate:'710rpm',range:'1,000m',firstDeployed:'2003년',manufacturer:'FNH USA'},
    ['Mk48','GPMG','특수전','7.62mm','경량'],['FNH','USSOCOM'],undefined,undefined,88),

  w('sa2-usa007','XM250 차기경기관총','XM250 Next Generation Squad Weapon-AR','MG','USA','DEVELOPMENT','LOW',
    'SIG Sauer XM250 6.8mm LMG. NGSW-AR 최종 채택. M249 대체. 2024년 초도생산.',
    {caliber:'6.8×51mm Common Cartridge',weight:'5.9kg',fireRate:'600rpm',firstDeployed:'2024년(초도)',manufacturer:'SIG Sauer'},
    ['XM250','6.8mm','M249대체','NGSW-AR','SIG'],['SIG Sauer','USARMY'],undefined,undefined,80),

  w('sa2-usa008','Glock 19 권총','Glock 19 Compact Pistol','PISTOL','USA','OPERATIONAL','LOW',
    'FBI·CIA·특수전 선호 9mm 컴팩트 권총. 스트라이커 방식. 미 특수전 및 민수시장 세계 1위.',
    {caliber:'9×19mm',weight:'595g',capacity:'15+1발',firstDeployed:'1988년',manufacturer:'Glock(오스트리아)'},
    ['글록19','9mm','특수전','FBI','CIA'],['Glock','USSOCOM'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Glock_17.jpg/320px-Glock_17.jpg','https://en.wikipedia.org/wiki/Glock_19',95),

  // ── 러시아 소화기 ─────────────────────────────────────────────────────────
  w('sa2-rus001','AK-74M 소총','AK-74M Assault Rifle','RIFLE','RUSSIA','OPERATIONAL','MED',
    '소련 말기 5.45mm 표준소총. 플라스틱 개머리판 접철식. 러시아군 여전히 주력 운용 중.',
    {caliber:'5.45×39mm',weight:'3.4kg',fireRate:'650rpm',capacity:'30발',firstDeployed:'1991년',manufacturer:'이즈마쉬(현 칼라쉬니코프)'},
    ['AK-74M','5.45mm','러시아소총','AK계열'],['칼라쉬니코프','러시아군'],
    undefined,'https://en.wikipedia.org/wiki/AK-74M',90),

  w('sa2-rus002','SVD 드라구노프 저격소총','SVD Dragunov Sniper Rifle','SNIPER','RUSSIA','OPERATIONAL','MED',
    '7.62mm 반자동 저격소총. 1963년 채택. 세계 최다 사용 저격소총. 80개국 이상 운용.',
    {caliber:'7.62×54mmR',weight:'4.3kg',range:'800m',capacity:'10발',firstDeployed:'1963년',manufacturer:'이즈마쉬'},
    ['SVD','드라구노프','저격','7.62mm','세계최다'],['이즈마쉬','다수국가'],
    undefined,'https://en.wikipedia.org/wiki/Dragunov_sniper_rifle',95),

  w('sa2-rus003','PKM 기관총','PKM General Purpose MG','MG','RUSSIA','OPERATIONAL','MED',
    '7.62mm 범용기관총. 1969년 채택. 경량·신뢰성 높음. 세계 60개국+ 운용. 우크라이나 양측 사용.',
    {caliber:'7.62×54mmR',weight:'7.5kg',fireRate:'650~750rpm',range:'1,000m(양각대)',firstDeployed:'1969년',manufacturer:'이즈마쉬'},
    ['PKM','기관총','7.62mm','60개국','범용'],['이즈마쉬','다수국가'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/PKM_machine_gun.jpg/320px-PKM_machine_gun.jpg','https://en.wikipedia.org/wiki/PK_machine_gun',92),

  w('sa2-rus004','GSh-18 권총','GSh-18 Pistol','PISTOL','RUSSIA','OPERATIONAL','LOW',
    '18발 폴리머 프레임 권총. 특수합금 관통탄 사용. 러시아군·경찰 지급.',
    {caliber:'9×19mm PBP(특수관통탄)',weight:'590g',capacity:'18+1발',firstDeployed:'2000년',manufacturer:'KBP'},
    ['GSh-18','러시아권총','관통탄','폴리머'],['KBP','러시아군'],
    undefined,'https://en.wikipedia.org/wiki/GSh-18',82),

  // ── 독일 소화기 ───────────────────────────────────────────────────────────
  w('sa2-ger001','G36 KA4 돌격소총','Heckler & Koch G36 KA4','RIFLE','GERMANY','OPERATIONAL','LOW',
    'HK G36 단축형. 독일 연방군 전환 중. 5.56mm. 폴리머 프레임·접이식 조준경.',
    {caliber:'5.56×45mm NATO',weight:'3.63kg',fireRate:'750rpm',capacity:'30발',firstDeployed:'1997년',manufacturer:'Heckler & Koch'},
    ['G36','KA4','독일소총','HK','폴리머'],['HK','독일군'],
    undefined,'https://en.wikipedia.org/wiki/Heckler_%26_Koch_G36',88),

  w('sa2-ger002','HK433 차기소총','HK433 Next Generation Assault Rifle','RIFLE','GERMANY','OPERATIONAL','LOW',
    '독일연방군 G36 대체 선정. AR-18 계열 가스피스톤. HK416·G36 장점 통합. 2021년 채택.',
    {caliber:'5.56×45mm NATO',weight:'3.6kg',fireRate:'700rpm',capacity:'30발',firstDeployed:'2021년',manufacturer:'Heckler & Koch'},
    ['HK433','독일신형소총','G36대체','가스피스톤'],['HK','독일군'],
    undefined,'https://en.wikipedia.org/wiki/HK433',90),

  w('sa2-ger003','G28 M110A1 정밀저격','Heckler & Koch G28 Designated Marksman Rifle','SNIPER','GERMANY','OPERATIONAL','LOW',
    '7.62mm 반자동 지정사수소총. 독일 특수전·미 M110A1 채택.',
    {caliber:'7.62×51mm NATO',weight:'4.9kg',range:'600m',capacity:'10·20발',firstDeployed:'2014년',manufacturer:'Heckler & Koch'},
    ['G28','HK','지정사수','7.62mm','M110A1'],['HK','독일군','미군'],
    undefined,'https://en.wikipedia.org/wiki/Heckler_%26_Koch_G28',90),

  w('sa2-ger004','P30 권총','Heckler & Koch P30 Pistol','PISTOL','GERMANY','OPERATIONAL','LOW',
    '독일 경찰·보안기관 표준 권총. 교체형 그립. DA/SA 방식. 9mm.',
    {caliber:'9×19mm',weight:'730g',capacity:'15+1발',firstDeployed:'2006년',manufacturer:'Heckler & Koch'},
    ['P30','HK','독일경찰','9mm','DA/SA'],['HK','독일경찰'],
    undefined,'https://en.wikipedia.org/wiki/Heckler_%26_Koch_P30',85),

  // ── 이스라엘 소화기 ───────────────────────────────────────────────────────
  w('sa2-isr001','타보르 X95 불펍소총','IWI Tavor X95 Bullpup Rifle','RIFLE','ISRAEL','OPERATIONAL','MED',
    '이스라엘군 표준 불펍소총. 소형·도시전 특화. 5.56mm. 미군 특수전·경찰 인기.',
    {caliber:'5.56×45mm NATO',weight:'3.25kg',length:'590mm(불펍)',fireRate:'750rpm',capacity:'30발',firstDeployed:'2009년',manufacturer:'IWI(이스라엘 웨폰 인더스트리)'},
    ['X95','타보르','불펍','이스라엘','도시전'],['IWI','이스라엘군'],
    undefined,'https://en.wikipedia.org/wiki/IWI_Tavor_X95',92),

  w('sa2-isr002','네게브 NG-7 경기관총','Negev NG-7 Light Machine Gun','MG','ISRAEL','OPERATIONAL','MED',
    '7.62mm 이스라엘 LMG. NG-5(5.56mm)에 이어 개발. 벨트·탄창 겸용.',
    {caliber:'7.62×51mm NATO',weight:'7.95kg',fireRate:'650~850rpm',range:'1,200m',firstDeployed:'2009년',manufacturer:'IWI'},
    ['네게브NG-7','이스라엘','LMG','7.62mm'],['IWI','이스라엘군'],
    undefined,'https://en.wikipedia.org/wiki/IMI_Negev',85),

  w('sa2-isr003','Desert Eagle .50AE 권총','Desert Eagle .50 AE Pistol','PISTOL','ISRAEL','OPERATIONAL','LOW',
    '가스작동 반자동 대구경 권총. .50AE·.44매그넘. 세계적 명성. 경호·수집가·게임 인지도.',
    {caliber:'.50 AE (12.7×33mm)',weight:'1.8kg',capacity:'7발',firstDeployed:'1983년',manufacturer:'IWI·매그넘리서치'},
    ['데저트이글','.50AE','대구경권총','이스라엘'],['IWI','매그넘리서치'],
    undefined,'https://en.wikipedia.org/wiki/Desert_Eagle',92),

  // ── 영국 소화기 ───────────────────────────────────────────────────────────
  w('sa2-uk001','SA80 A3 (L85A3) 소총','L85A3 SA80 Assault Rifle','RIFLE','UK','OPERATIONAL','LOW',
    '영국군 표준 돌격소총 최신 개량. HK 개조(A2→A3). 5.56mm 불펍. 신뢰성 향상.',
    {caliber:'5.56×45mm NATO',weight:'4.5kg',length:'785mm(불펍)',fireRate:'610~775rpm',capacity:'30발',firstDeployed:'2019년(A3)',manufacturer:'HK·BAE Systems'},
    ['L85A3','SA80','영국소총','불펍','HK개조'],['HK','영국군'],
    undefined,'https://en.wikipedia.org/wiki/L85_rifle',82),

  w('sa2-uk002','L129A1 지정사수소총','L129A1 Sharpshooter Designated Marksman Rifle','SNIPER','UK','OPERATIONAL','LOW',
    '7.62mm 반자동 지정사수소총. 아프간전 탈레반 장거리 AK 대응. 로렌스 알리나이 기반.',
    {caliber:'7.62×51mm NATO',weight:'5.1kg',range:'800m',capacity:'20발',firstDeployed:'2010년',manufacturer:'루이스 머신 앤 툴'},
    ['L129A1','영국','지정사수','7.62mm','아프간'],['LMT','영국군'],
    undefined,'https://en.wikipedia.org/wiki/L129A1',88),

  w('sa2-uk003','L110A2 미니미 경기관총','L110A2 Para SAW','MG','UK','OPERATIONAL','LOW',
    'FN Minimi Paratrooper 영국 채택형. 5.56mm. 공수부대·해병대 분대지원화기.',
    {caliber:'5.56×45mm NATO',weight:'6.85kg',fireRate:'800rpm',capacity:'200발 드럼',firstDeployed:'2000년대',manufacturer:'FNH'},
    ['L110A2','미니미','공수부대','영국','5.56mm'],['FNH','영국군'],undefined,undefined,85),

  // ── 프랑스 소화기 ─────────────────────────────────────────────────────────
  w('sa2-fr001','HK416F 소총 (프랑스)','HK416F Assault Rifle (French Army)','RIFLE','FRANCE','OPERATIONAL','LOW',
    'HK416 프랑스 채택형. FAMAS 대체. 5.56mm. 2017년 배치 시작. 레지옹에트랑제르 포함.',
    {caliber:'5.56×45mm NATO',weight:'3.6kg',fireRate:'700~900rpm',capacity:'30발',firstDeployed:'2017년',manufacturer:'HK'},
    ['HK416F','프랑스소총','FAMAS대체','레지옹에트랑제르'],['HK','프랑스군'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/HK416-A5.jpg/320px-HK416-A5.jpg','https://en.wikipedia.org/wiki/HK416',90),

  w('sa2-fr002','FAMAS G2 불펍소총 (구형)','FAMAS G2 Bullpup Rifle','RIFLE','FRANCE','OPERATIONAL','LOW',
    '프랑스 독자 불펍소총. 5.56mm. 1978년 채택. HK416F로 단계적 대체 중.',
    {caliber:'5.56×45mm NATO',weight:'3.8kg',fireRate:'900~1,100rpm',capacity:'25발(전용탄창)',firstDeployed:'1978년',manufacturer:'MAS(국영)'},
    ['FAMAS','불펍','프랑스','5.56mm','단계대체'],['GIAT','프랑스군'],
    undefined,'https://en.wikipedia.org/wiki/FAMAS',88),

  // ── 기타 국가 소화기 ─────────────────────────────────────────────────────
  w('sa2-cze001','CZ 805 브렌 A2 소총','CZ 806 Bren 2 Assault Rifle','RIFLE','NATO','OPERATIONAL','LOW',
    '체코 CZ 브렌 2 돌격소총. 가스피스톤. 5.56mm. 체코군+NATO 다국 채택.',
    {caliber:'5.56×45mm NATO',weight:'3.26kg',fireRate:'750rpm',capacity:'30발',firstDeployed:'2020년',manufacturer:'Česká Zbrojovka'},
    ['브렌2','CZ806','체코소총','NATO','가스피스톤'],['CZ','체코군'],
    undefined,'https://en.wikipedia.org/wiki/CZ_Bren_2',88),

  w('sa2-aut001','슈타이어 AUG A3 M1','Steyr AUG A3 M1 Bullpup','RIFLE','NATO','OPERATIONAL','LOW',
    '오스트리아 불펍소총. 통합 광학 조준기. 40개국 이상 운용. 픽카티니레일 추가(A3).',
    {caliber:'5.56×45mm NATO',weight:'3.9kg',fireRate:'680rpm',capacity:'30발',firstDeployed:'1977년(AUG)·2013년(A3)',manufacturer:'슈타이어 만리허'},
    ['AUG A3','슈타이어','불펍','오스트리아','40개국'],['슈타이어','오스트리아군'],
    undefined,'https://en.wikipedia.org/wiki/Steyr_AUG',92),

  w('sa2-bel001','FN SCAR-H MK17 소총','FN SCAR-H MK17 Assault Rifle','RIFLE','NATO','OPERATIONAL','LOW',
    'FN 스카 USSOCOM 채택. 7.62mm H형(Heavy). 미 특수전·벨기에군·인도 채택.',
    {caliber:'7.62×51mm NATO',weight:'3.6kg',fireRate:'600rpm',capacity:'20발',firstDeployed:'2009년',manufacturer:'FN Herstal'},
    ['SCAR-H','MK17','FN','특수전','7.62mm'],['FN','USSOCOM'],
    undefined,'https://en.wikipedia.org/wiki/FN_SCAR',92),

  w('sa2-bel002','FN SCAR-L MK16 소총','FN SCAR-L MK16 Assault Rifle','RIFLE','NATO','OPERATIONAL','LOW',
    'FN 스카 5.56mm L형(Light). SCAR-H와 플랫폼 공유. 특수전 운용.',
    {caliber:'5.56×45mm NATO',weight:'3.04kg',fireRate:'625rpm',capacity:'30발',firstDeployed:'2009년',manufacturer:'FN Herstal'},
    ['SCAR-L','MK16','FN','5.56mm','특수전'],['FN','USSOCOM'],
    undefined,'https://en.wikipedia.org/wiki/FN_SCAR',90),

  w('sa2-fin001','발멧 RK 95 소총','Valmet RK 95 TP Assault Rifle','RIFLE','NATO','OPERATIONAL','LOW',
    '핀란드 AK 파생형. 7.62mm. 핀란드군 표준. 신뢰성 높음. NATO 가입 전환 중.',
    {caliber:'7.62×39mm',weight:'3.7kg',fireRate:'650~700rpm',capacity:'30발',firstDeployed:'1995년',manufacturer:'발멧(사코)'},
    ['RK95','핀란드소총','AK파생','7.62mm','핀란드'],['사코','핀란드군'],
    undefined,'https://en.wikipedia.org/wiki/Valmet_M82',80),

  w('sa2-sg001','SAR-21 소총','SAR-21 Assault Rifle','RIFLE','NATO','OPERATIONAL','LOW',
    '싱가포르 독자 불펍 소총. 5.56mm. 싱가포르군 표준 소화기. 레이저거리측정 통합.',
    {caliber:'5.56×45mm NATO',weight:'3.82kg',fireRate:'450~650rpm',capacity:'30발',firstDeployed:'1999년',manufacturer:'ST 엔지니어링'},
    ['SAR-21','싱가포르','불펍','레이저','독자개발'],['ST Engineering','싱가포르군'],
    undefined,'https://en.wikipedia.org/wiki/SAR_21',82),

  // ── 저격소총 모음 ─────────────────────────────────────────────────────────
  w('sa2-snp001','CheyTac M200 인터벤션','CheyTac M200 Intervention Anti-Material Rifle','SNIPER','USA','OPERATIONAL','LOW',
    '.408 CheyTac 전용 볼트액션 대물저격총. 사거리 2,300m. 세계기록급 장거리. 특수전 운용.',
    {caliber:'.408 CheyTac',weight:'12.4kg',range:'2,300m',capacity:'7발',firstDeployed:'2001년',manufacturer:'CheyTac'},
    ['CheyTac','M200','대물저격','2300m','408'],['CheyTac','USSOCOM'],
    undefined,'https://en.wikipedia.org/wiki/CheyTac_M200',85),

  w('sa2-snp002','AI AWM 악터스 저격소총','Accuracy International AWM Sniper Rifle','SNIPER','UK','OPERATIONAL','LOW',
    '영국 정밀저격소총. .338 Lapua Mag. 영국·독일·캐나다·스웨덴 등 다수 채택.',
    {caliber:'.338 Lapua Magnum',weight:'6.9kg',range:'1,100m',capacity:'5발',firstDeployed:'1996년',manufacturer:'Accuracy International'},
    ['AWM','Accuracy International','338라푸아','영국저격','NATO'],['AI','영국군'],
    undefined,'https://en.wikipedia.org/wiki/Accuracy_International_AWM',95),

  w('sa2-snp003','Sako TRG-42 저격소총','Sako TRG-42 Sniper Rifle','SNIPER','NATO','OPERATIONAL','LOW',
    '핀란드 볼트액션 저격소총. .338 LM 또는 .300 WM. 특수전·경찰저격대 세계 채택.',
    {caliber:'.338 LM 또는 .300 Win Mag',weight:'5.1kg',range:'1,000m+',capacity:'5발',firstDeployed:'1990년대',manufacturer:'Sako(핀란드)'},
    ['TRG-42','사코','핀란드저격','338LM','경찰저격'],['Sako','다수국가'],
    undefined,'https://en.wikipedia.org/wiki/SAKO_TRG',88),

  // ── 기관총 모음 ───────────────────────────────────────────────────────────
  w('sa2-mg001','M134D 미니건','M134D Minigun 7.62mm','MG','USA','OPERATIONAL','LOW',
    '6연장 가틀링 기관총. 분당 3,000~6,000발. UH-60·AH-64·함정 탑재. 특수전 헬기 필수품.',
    {caliber:'7.62×51mm NATO',weight:'15.9kg',fireRate:'3,000~6,000rpm',firstDeployed:'1962년',manufacturer:'GE·Dillon Aero'},
    ['미니건','M134D','가틀링','헬기탑재','특수전'],['GE','USARMY'],
    undefined,'https://en.wikipedia.org/wiki/M134_Minigun',97),

  w('sa2-mg002','GAU-19/B 3연장 기관총','GAU-19/B .50 Cal Gatling','MG','USA','OPERATIONAL','LOW',
    '3연장 .50 BMG 가틀링. 분당 2,000발. 헬기·JLTV·소형정 탑재. M2 대체 고속 버전.',
    {caliber:'12.7×99mm BMG',weight:'47.6kg',fireRate:'1,000~2,000rpm',firstDeployed:'1983년',manufacturer:'GE·General Dynamics'},
    ['GAU-19','50cal','가틀링','헬기','JLTV'],['GE','USARMY'],
    undefined,'https://en.wikipedia.org/wiki/GAU-19',88),

  w('sa2-mg003','NSV 12.7mm 기관총','NSV 12.7mm Heavy Machine Gun','MG','RUSSIA','OPERATIONAL','MED',
    '소련제 12.7mm HMG. M2 대응. T-72·T-80·T-90 포탑상부 탑재. 러시아군 표준.',
    {caliber:'12.7×108mm',weight:'25kg',fireRate:'700~800rpm',range:'2,000m',firstDeployed:'1971년',manufacturer:'ZID'},
    ['NSV','12.7mm','소련HMG','T-72탑재','러시아'],['ZID','러시아군'],
    undefined,'https://en.wikipedia.org/wiki/NSV_machine_gun',85),

  // ── 유탄발사기 모음 ───────────────────────────────────────────────────────
  w('sa2-gl001','Mk.32 MSGL 유탄발사기','Milkor M32A1 Multi-Shot Grenade Launcher','LAUNCHER','USA','OPERATIONAL','LOW',
    '6연발 회전식 40mm 유탄발사기. 미 해병대·특수전 채택. 남아공 밀코르 원형.',
    {caliber:'40×46mm SR',weight:'5.27kg',range:'400m',capacity:'6발',firstDeployed:'2005년',manufacturer:'Milkor USA'},
    ['M32','MSGL','6연발','40mm','유탄발사기'],['Milkor','USMC','USSOCOM'],
    undefined,'https://en.wikipedia.org/wiki/Milkor_MGL',88),

  w('sa2-gl002','AGS-17 프라마 자동유탄포','AGS-17 Plamya Automatic Grenade Launcher','LAUNCHER','RUSSIA','OPERATIONAL','MED',
    '30mm 자동유탄발사기. 소련 개발. 헬기·차량·삼각대 탑재. 아프간·체첸·우크라이나 실전.',
    {caliber:'30×29mm VG-17',weight:'18kg',fireRate:'350~400rpm',range:'1,700m',firstDeployed:'1971년',manufacturer:'KBP'},
    ['AGS-17','프라마','30mm','자동유탄','소련'],['KBP','러시아군'],
    undefined,'https://en.wikipedia.org/wiki/AGS-17',85),

  w('sa2-gl003','M320 유탄발사기','M320 Grenade Launcher Module','LAUNCHER','USA','OPERATIONAL','LOW',
    '미군 M203 대체 40mm 단발 유탄발사기. M4A1 하부장착 또는 독립 운용 가능.',
    {caliber:'40×46mm SR',weight:'1.41kg(단독)',range:'400m',firstDeployed:'2009년',manufacturer:'H&K USA'},
    ['M320','GLM','40mm','M203대체','M4A1'],['HK USA','USARMY'],
    undefined,'https://en.wikipedia.org/wiki/M320_grenade_launcher',90),

  // ── 권총 모음 ─────────────────────────────────────────────────────────────
  w('sa2-pistol001','SIG P226 권총','SIG Sauer P226 Pistol','PISTOL','NATO','OPERATIONAL','LOW',
    '미 해군 SEAL·영국 SAS 선호 9mm 권총. 더블/싱글액션. 세계 경찰·군 최다 채택 권총 중 하나.',
    {caliber:'9×19mm',weight:'964g',capacity:'15+1발',firstDeployed:'1984년',manufacturer:'SIG Sauer'},
    ['P226','SIG','SEAL','SAS','권총'],['SIG Sauer','USNAVY','영국SAS'],
    undefined,'https://en.wikipedia.org/wiki/SIG_Sauer_P226',95),

  w('sa2-pistol002','Beretta M9A3 권총','Beretta M9A3 Pistol','PISTOL','NATO','OPERATIONAL','LOW',
    'M17 도입 전 미군 표준 권총. 9mm. 이탈리아 베레타. 선택적 세이프티. 15발.',
    {caliber:'9×19mm',weight:'950g',capacity:'15+1발',firstDeployed:'1985년',manufacturer:'Beretta'},
    ['M9A3','베레타','9mm','미군표준','이탈리아'],['Beretta','USARMY'],
    undefined,'https://en.wikipedia.org/wiki/Beretta_M9',90),

  w('sa2-pistol003','HK USP 전술형 권총','Heckler & Koch USP Tactical Pistol','PISTOL','NATO','OPERATIONAL','LOW',
    '독일 HK USP 전술형. 소음기·레이저·라이트 장착 레일. 다양한 구경. 특수전 선호.',
    {caliber:'9mm·.40 S&W·.45 ACP',weight:'748g(9mm)',capacity:'15+1발',firstDeployed:'1993년',manufacturer:'Heckler & Koch'},
    ['USP','HK','전술형권총','소음기','레일'],['HK','특수전부대'],
    undefined,'https://en.wikipedia.org/wiki/Heckler_%26_Koch_USP',88),

  w('sa2-pistol004','Walther P99 권총','Walther P99 Pistol','PISTOL','NATO','OPERATIONAL','LOW',
    '독일 발터 스트라이커 방식 권총. 폴란드 경찰·일부 NATO 경찰 채택. 제임스본드 영화 소도구.',
    {caliber:'9×19mm',weight:'630g',capacity:'16+1발',firstDeployed:'1997년',manufacturer:'Walther'},
    ['P99','발터','9mm','경찰권총','제임스본드'],['Walther','폴란드경찰'],
    undefined,'https://en.wikipedia.org/wiki/Walther_P99',82),

  // ── 개인 보호장비·기타 ─────────────────────────────────────────────────────
  w('sa2-other001','M18 클레이모어 지향성 지뢰','M18A1 Claymore Directional Mine','GROUND','USA','OPERATIONAL','LOW',
    '지향성 파편 대인지뢰. 700개 강철구. 50m 범위 살상. 원격 또는 트립와이어. 실전 필수품.',
    {range:'50m(살상)',weight:'1.6kg',firstDeployed:'1960년',manufacturer:'다수 방산'},
    ['클레이모어','M18A1','지뢰','지향성','대인'],['다수국가군'],
    undefined,'https://en.wikipedia.org/wiki/M18_Claymore_mine',92),

  w('sa2-other002','FGM-172 SRAW','FGM-172 SRAW Short Range Assault Weapon','LAUNCHER','USA','OPERATIONAL','LOW',
    '단거리 1회용 대전차로켓. 141m 자가폭파 또는 탑착공격 모드. M72 LAW 대체.',
    {range:'17~500m',payload:'탄덤 HEAT',firstDeployed:'2002년',manufacturer:'록히드마틴'},
    ['SRAW','FGM-172','단거리대전차','1회용'],['록히드마틴','USARMY'],
    undefined,'https://en.wikipedia.org/wiki/FGM-172_SRAW',80),

  w('sa2-other003','칼 구스타프 M4 (스웨덴)','Carl Gustaf M4 Recoilless Rifle','LAUNCHER','NATO','OPERATIONAL','LOW',
    '84mm 4세대 무반동포. 5.5kg 경량화. 다목적탄·온도보정 조준기. 세계 40국 이상 운용.',
    {caliber:'84mm',weight:'6.6kg(발사기)',range:'1,000m(HEAT)',firstDeployed:'2014년(M4)',manufacturer:'Saab Dynamics'},
    ['M4','칼구스타프','84mm','경량화','40국'],['Saab','다수국가'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Carl_Gustav_M4_%281%29_%28brightened%2C_no_background%29_%28leveled%29.png/330px-Carl_Gustav_M4_%281%29_%28brightened%2C_no_background%29_%28leveled%29.png','https://en.wikipedia.org/wiki/Carl_Gustaf_8.4_cm_recoilless_rifle',92),

  w('sa2-other004','스파이크 SR 단거리 ATGM','Spike-SR Short Range ATGM','LAUNCHER','ISRAEL','OPERATIONAL','MED',
    '분대급 단거리 ATGM. 발사 후 망각. EO 영상. 1.5~2km. 매우 경량·저가.',
    {range:'50~1,500m',guidance:'TV/IR 탐색기',payload:'탄덤 HEAT',firstDeployed:'2016년',manufacturer:'Rafael'},
    ['스파이크SR','분대급','대전차','단거리','경량'],['Rafael','이스라엘군'],
    undefined,'https://en.wikipedia.org/wiki/Spike_(missile)',85),

  w('sa2-other005','RPG-29 불칸 (대전차)','RPG-29 Vampir Anti-Tank Rocket','LAUNCHER','RUSSIA','OPERATIONAL','HIGH',
    '105mm 탠덤 HEAT 대전차 로켓. 에이브람스·챌린저 2 반응장갑 관통. 레바논·이라크 헤즈볼라 사용.',
    {caliber:'105mm',payload:'탠덤 HEAT',range:'500m',firstDeployed:'1989년',manufacturer:'GROMOV KBTM'},
    ['RPG-29','불칸','105mm','탠덤HEAT','에이브람스관통'],['러시아군','헤즈볼라'],
    undefined,'https://en.wikipedia.org/wiki/RPG-29',85),

]
