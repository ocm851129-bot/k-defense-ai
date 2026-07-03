import type { WeaponSystem } from './weapons'
const w = (id:string,name:string,nameEng:string,cat:WeaponSystem['category'],origin:WeaponSystem['origin'],status:WeaponSystem['status'],threat:WeaponSystem['threatRating'],desc:string,specs:WeaponSystem['specs'],tags:string[],sources:string|string[],wiki?:string,conf=78): WeaponSystem=>({id,name,nameEng,category:cat,origin,status,threatRating:threat,description:desc,detail:`## ${nameEng}\n\n${desc}\n\n### 주요 제원\n${Object.entries(specs).filter(([,v])=>v).map(([k,v])=>`- ${k}: ${v}`).join('\n')}`,specs,confidence:conf,lastUpdated:'2026-07-01',relatedIntelIds:[],tags,sources:Array.isArray(sources)?sources:[sources],wikiUrl:wiki})

export const WEAPONS_EXP_ASIA4: WeaponSystem[] = [
  // ── 일본 추가 ─────────────────────────────────────────────────────────────
  w('jpn2-a001','F-15J/DJ 이글 (일본)','F-15J Eagle (JASDF)','AIRCRAFT','USA','OPERATIONAL','LOW','일항공자위대 주력 제공전투기. 203기 보유. MSIP 업그레이드. J/APG-2 레이더.',{speed:'마하 2.5',range:'3,900km',crew:'1~2명',armament:'AAM-4B·AAM-5·M61A1',firstDeployed:'1981년(일본)',quantity:'203기'},['F-15J','일본','이글','JASDF','제공'],'JASDF','https://en.wikipedia.org/wiki/Mitsubishi_F-15J',92),
  w('jpn2-a002','P-1 해상초계기','Kawasaki P-1 MPA','AIRCRAFT','JAPAN','OPERATIONAL','LOW','일본 독자 개발 터보팬 해상초계기. P-3C 대체. 4발 터보팬. F7 엔진.',{speed:'996km/h',range:'8,000km',crew:'13명',armament:'MK54 어뢰·ASM-2',firstDeployed:'2013년',manufacturer:'가와사키'},['P-1','일본초계기','독자개발','P-3대체','가와사키'],'JMSDF','https://en.wikipedia.org/wiki/Kawasaki_P-1',92),
  w('jpn2-a003','C-2 수송기','Kawasaki C-2 Transport','AIRCRAFT','JAPAN','OPERATIONAL','LOW','일본 독자 개발 전략 수송기. C-130 대체. 1970년대 C-1 후속. 37대 계획.',{speed:'890km/h',range:'10,000km+',crew:'3명',payload:'36톤',firstDeployed:'2016년',manufacturer:'가와사키'},['C-2','일본수송기','독자개발','C-1후속','가와사키'],'JASDF','https://en.wikipedia.org/wiki/Kawasaki_C-2',90),
  w('jpn2-a004','SH-60K 시호크','SH-60K Seahawk (JMSDF)','HELICOPTER','USA','OPERATIONAL','LOW','일본 해상자위대 함재 대잠헬기. UH-60J 기반 개량. HPS-108 소나 탑재. 96기.',{speed:'270km/h',range:'834km',crew:'4명',armament:'Mk54 어뢰·MAD',firstDeployed:'2005년(일본)',quantity:'96기'},['SH-60K','일본','함재헬기','대잠','JMSDF'],'JMSDF',undefined,90),
  w('jpn2-a005','V-22 오스프리 (일본)','V-22B Osprey (JGSDF)','AIRCRAFT','USA','OPERATIONAL','LOW','일본 육상자위대 V-22 17기. 도서 방어·이원 운용. 2020년부터 도입.',{speed:'509km/h',range:'1,627km',crew:'3+24명',firstDeployed:'2020년(일본)',quantity:'17기'},['V-22','오스프리','일본','도서방어','육상자위대'],'JGSDF',undefined,92),
  w('jpn2-n001','아타고급 이지스 구축함','Atago-class Aegis Destroyer DDG','NAVAL','JAPAN','OPERATIONAL','LOW','일본 이지스 구축함 2형. AN/SPY-1D(V)·SM-3 BMD. 2척. 마야급 이전 세대.',{displacement:'10,000톤',length:'165m',crew:'310명',armament:'SM-3·SM-2·VLS 96셀·127mm',firstDeployed:'2007년',quantity:'2척'},['아타고급','일본이지스','SM-3','BMD','DDG'],'JMSDF','https://en.wikipedia.org/wiki/Atago-class_destroyer',92),
  w('jpn2-n002','공고급 이지스 구축함','Kongō-class Aegis Destroyer DDG','NAVAL','JAPAN','OPERATIONAL','LOW','일본 최초 이지스 구축함. 알레이버크급 플라이트1 기반. SM-3 개수. 4척.',{displacement:'9,485톤',length:'161m',crew:'300명',armament:'SM-3·SM-2·VLS 90셀·127mm',firstDeployed:'1993년',quantity:'4척'},['공고급','일본이지스','SM-3','최초이지스','DDG'],'JMSDF','https://en.wikipedia.org/wiki/Kong%C5%8D-class_destroyer',92),
  w('jpn2-n003','오야시오급 잠수함','Oyashio-class SSK','SUBMARINE','JAPAN','OPERATIONAL','LOW','일본 재래식 잠수함. 11척. 하푼·Mk48 탑재. 2030년대 AIP 타이게이급으로 완전 대체 예정.',{displacement:'2,750톤(수중)',length:'81.7m',crew:'69명',armament:'533mm 어뢰·하푼',firstDeployed:'1998년',quantity:'5척(현역)'},['오야시오급','일본잠수함','SSK','하푼','타이게이대체'],'JMSDF',undefined,88),
  w('jpn2-n004','타이게이급 AIP 잠수함','Taigei-class AIP Submarine','SUBMARINE','JAPAN','OPERATIONAL','LOW','일본 최신 AIP 잠수함. 리튬이온 배터리. 3,000톤+. 차세대 대잠 전력.',{displacement:'3,000톤+(수중)',length:'84m',crew:'70명',armament:'533mm 어뢰·하푼',propulsion:'디젤+리튬이온AIP',firstDeployed:'2022년',quantity:'3척+'},['타이게이급','일본잠수함','AIP','리튬이온','최신'],'JMSDF',undefined,90),
  w('jpn2-m001','ASM-1C 공대함미사일','ASM-1C Anti-Ship Missile','ASM','JAPAN','OPERATIONAL','LOW','일본 국산 공대함미사일. F-2 탑재. 사거리 170km. 능동 레이더 탐색기.',{range:'170km',speed:'마하 0.9',payload:'225kg',firstDeployed:'2018년',manufacturer:'미쓰비시'},['ASM-1C','일본','공대함','F-2탑재','미쓰비시'],'JASDF',undefined,82),
  w('jpn2-m002','07식 수직발사 대잠로켓','Type 07 VL-ASROC','NAVAL','JAPAN','OPERATIONAL','LOW','일본 함정 수직발사 대잠로켓. 수중 어뢰 투하. 이지스함·호위함 탑재. 사거리 22km.',{range:'22km',firstDeployed:'2010년',manufacturer:'미쓰비시'},['07식','VL-ASROC','대잠로켓','이지스','수직발사'],'JMSDF',undefined,85),

  // ── 인도 추가 ─────────────────────────────────────────────────────────────
  w('ind3-a001','MiG-29UPG (인도)','MiG-29UPG (IAF India)','AIRCRAFT','RUSSIA','OPERATIONAL','MED','인도 공군 MiG-29 현대화형. 61기. AESA 레이더·공중급유·R-77M 탑재.',{speed:'마하 2.25',firstDeployed:'1987년(인도)',quantity:'61기'},['MiG-29UPG','인도','현대화','AESA','R-77M'],'IAF',undefined,80),
  w('ind3-a002','재규어 IS/IB (인도)','Jaguar IS/IB (IAF India)','AIRCRAFT','MULTI','RETIRED','LOW','인도-영국-프랑스 개발 공격기. 인도 공군 69기. 해상 타격 특화. 2022년 이후 단계 퇴역.',{speed:'1,700km/h',range:'3,524km',crew:'1명',firstDeployed:'1979년(인도)',quantity:'69기→퇴역'},['재규어','인도','영국','퇴역진행','해상타격'],'IAF',undefined,80),
  w('ind3-n001','INS 아리한트 SSBN','INS Arihant SSBN (India)','SUBMARINE','INDIA','OPERATIONAL','LOW','인도 자국 개발 최초 핵추진 탄도미사일 잠수함. K-15 SLBM 4발 또는 K-4 SLBM 탑재.',{displacement:'6,000톤(수중)',length:'112m',crew:'95명',armament:'K-15 SLBM×12 또는 K-4 SLBM×4',propulsion:'83MW 가압수형 원자로',firstDeployed:'2016년'},['인도SSBN','아리한트','K-15','핵억제','자국개발'],'인도해군','https://en.wikipedia.org/wiki/INS_Arihant',80),
  w('ind3-n002','INS 델리급 구축함','Delhi-class Guided Missile Destroyer','NAVAL','INDIA','OPERATIONAL','LOW','인도 독자 개발 구축함. 스틱스·바라크-1 탑재. 3척. 서부함대 기함.',{displacement:'6,700톤',length:'163m',crew:'350명',armament:'스틱스 대함·바라크-1 SAM·100mm',firstDeployed:'1997년',quantity:'3척'},['델리급','인도구축함','스틱스','바라크','독자개발'],'인도해군',undefined,80),
  w('ind3-m001','K-4 잠수함발사탄도미사일','K-4 SLBM (India)','SLBM','INDIA','TESTING','MED','인도 2세대 SLBM. 사거리 3,500km. 아리한트급 탑재. 중국 핵심 도시 타격권.',{range:'3,500km',propulsion:'고체추진',firstDeployed:'시험 중'},['K-4','인도SLBM','3500km','아리한트','중국'],'SFC인도',undefined,70),
  w('ind3-m002','프리트비-III 전술탄도미사일','Prithvi-III Tactical Ballistic Missile','SRBM','INDIA','OPERATIONAL','MED','인도 단거리 탄도미사일. 사거리 350km. 해상발사형 파생. 파키스탄 억제.',{range:'350km',payload:'500kg',propulsion:'액체추진',firstDeployed:'2004년'},['프리트비-III','인도SRBM','파키스탄억제','해상발사'],'SFC인도',undefined,78),

  // ── 인도네시아 (INDONESIA) ────────────────────────────────────────────────
  w('idn-a001','라팔 (인도네시아)','Dassault Rafale (TNI AU)','AIRCRAFT','FRANCE','DEVELOPMENT','LOW','인도네시아 라팔 42기 계약. 2024년 초도. 아세안 최초 라팔 도입국.',{firstDeployed:'2024년',quantity:'42기'},['라팔','인도네시아','아세안최초','다소','TNI'],'인도네시아공군',undefined,88),
  w('idn-a002','F-16C/D (인도네시아)','F-16C/D Block 52+ (TNI AU)','AIRCRAFT','USA','OPERATIONAL','LOW','인도네시아 공군 F-16 33기. 블록 25/52 혼용. 아세안 최대 F-16 보유국 중 하나.',{firstDeployed:'1990년(인도네시아)',quantity:'33기'},['F-16','인도네시아','블록52','아세안','TNI'],'인도네시아공군',undefined,85),
  w('idn-a003','Su-27SK/30MK2 (인도네시아)','Su-27SK/30MK2 (TNI AU)','AIRCRAFT','RUSSIA','OPERATIONAL','MED','인도네시아 공군 Su-27/30 16기. 러시아제 주력 전투기.',{speed:'마하 2.0',firstDeployed:'2003년(인도네시아)',quantity:'16기'},['Su-27','인도네시아','러시아제','TNI'],'인도네시아공군',undefined,80),

  // ── 말레이시아 (MALAYSIA) ─────────────────────────────────────────────────
  w('mys-a001','Su-30MKM (말레이시아)','Su-30MKM (RMAF Malaysia)','AIRCRAFT','RUSSIA','OPERATIONAL','LOW','말레이시아 공군 18기. 헬멧 조준·3D 추력편향. 동남아 최고 성능 전투기 중 하나.',{speed:'마하 2.0',firstDeployed:'2007년(말레이시아)',quantity:'18기'},['Su-30MKM','말레이시아','러시아','3D추력편향','동남아'],'RMAF',undefined,82),
  w('mys-a002','FA-50 (말레이시아)','KAI FA-50 (RMAF Malaysia)','AIRCRAFT','ROK','OPERATIONAL','LOW','말레이시아 FA-50 18기. 한국 경공격기 첫 동남아 수출. K방산 동남아 교두보.',{speed:'마하 1.5',firstDeployed:'2023년(말레이시아)',quantity:'18기'},['FA-50','말레이시아','한국수출','동남아','KAI'],'RMAF',undefined,90),

  // ── 태국 (THAILAND) ───────────────────────────────────────────────────────
  w('tha-a001','F-16A/B (태국)','F-16A/B Block 15 (RTAF)','AIRCRAFT','USA','OPERATIONAL','LOW','태국 공군 F-16 53기. 블록 15 OCU. 동남아 ASEAN 억제.',{firstDeployed:'1988년(태국)',quantity:'53기'},['F-16','태국','블록15','ASEAN','RTAF'],'태국공군',undefined,82),
  w('tha-a002','그리펜 C/D (태국)','Saab JAS 39C/D Gripen (RTAF)','AIRCRAFT','SWEDEN','OPERATIONAL','LOW','태국 공군 그리펜 12기. 아시아 첫 그리펜 운용국. 2011년 도입.',{speed:'마하 2.0',firstDeployed:'2011년(태국)',quantity:'12기'},['그리펜','태국','아시아최초','사브','RTAF'],'태국공군',undefined,88),
  w('tha-n001','차크리 나루에벳 항모','HTMS Chakri Naruebet STOVL Carrier','NAVAL','MULTI','OPERATIONAL','LOW','태국 소형 항공모함. 11,485톤. AV-8S 해리어 운용(현 사실상 불용). 세계 최소 항모 중 하나.',{displacement:'11,485톤',length:'182.6m',armament:'MRLS·하쏜SAM·30mm',firstDeployed:'1997년',quantity:'1척'},['차크리나루에벳','태국항모','최소항모','해리어','STOVL'],'태국해군',undefined,78),

  // ── 베트남 (VIETNAM) ──────────────────────────────────────────────────────
  w('vnm-a001','Su-30MK2V (베트남)','Su-30MK2V (VPAF Vietnam)','AIRCRAFT','RUSSIA','OPERATIONAL','MED','베트남 공군 Su-30 36기+. 남중국해 방어 주력. 크레스탈 Kh-59MK2 탑재.',{speed:'마하 2.0',firstDeployed:'2004년(베트남)',quantity:'36기'},['Su-30MK2','베트남','남중국해','러시아제','Kh-59'],'베트남공군',undefined,78),
  w('vnm-n001','게파르트-3.9급 호위함','Gepard-3.9 Frigate (Vietnam)','NAVAL','RUSSIA','OPERATIONAL','MED','베트남 해군 러시아제 게파르트 호위함. 4척. 칼리브르 대함·우란 대함. 남중국해 방어.',{displacement:'2,100톤',length:'102.2m',crew:'103명',armament:'Kh-35 우란·100mm·갤리온 SAM',firstDeployed:'2011년',quantity:'4척'},['게파르트','베트남','러시아제','남중국해','우란대함'],'베트남해군',undefined,78),

  // ── 필리핀 (PHILIPPINES) ─────────────────────────────────────────────────
  w('phl-a001','FA-50PH (필리핀)','KAI FA-50PH (PAF Philippines)','AIRCRAFT','ROK','OPERATIONAL','LOW','필리핀 공군 FA-50PH 12기. 한국 방산 첫 필리핀 전투기 수출.',{speed:'마하 1.5',firstDeployed:'2015년(필리핀)',quantity:'12기'},['FA-50PH','필리핀','한국수출','KAI','PAF'],'필리핀공군',undefined,88),
  w('phl-n001','호세 리잘급 호위함','Jose Rizal-class Frigate (PN)','NAVAL','ROK','OPERATIONAL','LOW','필리핀 해군 현대중공업 건조 호위함. 2,600톤. 한국 방산 수출.',{displacement:'2,600톤',length:'107.5m',crew:'92명',armament:'76mm·RAM·MSS','firstDeployed':'2020년'},['호세리잘','필리핀','현대중공업','한국수출','호위함'],'필리핀해군',undefined,88),

  // ── 싱가포르 (SINGAPORE) ──────────────────────────────────────────────────
  w('sgp-a001','F-35B (싱가포르)','F-35B Lightning II (RSAF Singapore)','AIRCRAFT','USA','DEVELOPMENT','LOW','싱가포르 F-35B 12기 계약. 2026년 초도. STOVL로 활주로 제약 해소.',{speed:'마하 1.6',firstDeployed:'2026년(예정)',quantity:'12기'},['F-35B','싱가포르','RSAF','STOVL','2026'],'RSAF',undefined,85),
  w('sgp-m001','S-70B-S 시호크 (싱가포르)','S-70B Seahawk (RSN Singapore)','HELICOPTER','USA','OPERATIONAL','LOW','싱가포르 해군 S-70B 6기. 대잠·SAR·대함. 남중국해 방어.',{firstDeployed:'2012년(싱가포르)',quantity:'6기'},['S-70B','싱가포르','대잠','해군','RSN'],'RSN',undefined,85),

  // ── 파키스탄 추가 ─────────────────────────────────────────────────────────
  w('pak2-a001','Mirage III/5 (파키스탄)','Mirage III/5 (PAF)','AIRCRAFT','FRANCE','RETIRED','MED','파키스탄 공군 구형 미라지 100기+. 핵탄두 탑재 가능. 단계 퇴역 중.',{speed:'마하 2.2',firstDeployed:'1967년(파키스탄)',quantity:'100기+'},['미라지','파키스탄','핵탑재가능','구형','단계퇴역'],'PAF',undefined,72),
  w('pak2-m001','라드 공대지 순항미사일','Raad-II Air Launched CM (Pakistan)','CRUISE','PAKISTAN','OPERATIONAL','MED','파키스탄 독자 개발 공대지 순항미사일. 사거리 400km. 핵탄두 탑재 가능. Mirage·JF-17 탑재.',{range:'400km',payload:'핵·재래식',firstDeployed:'2019년'},['라드','파키스탄','공대지','핵탑재가능','JF-17'],'PAF',undefined,70),

  // ── 대만 추가 ─────────────────────────────────────────────────────────────
  w('twn3-a001','IDF 경국 전투기','AIDC F-CK-1 Ching-kuo IDF','AIRCRAFT','TAIWAN','OPERATIONAL','MED','대만 독자 개발 경량 전투기. 미국 기술 지원. 국내 생산. 130기. F-16 보완.',{speed:'마하 1.8',range:'1,100km',crew:'1명',armament:'TC-2 AAM·TK-2 AAM·TC-2N',firstDeployed:'1994년',quantity:'130기'},['경국','IDF','대만독자','F-16보완','TC-2'],'ROCAF','https://en.wikipedia.org/wiki/AIDC_F-CK-1_Ching-kuo',85),
  w('twn3-n001','키드급 구축함','Keelung-class (ex-Kidd) DDG','NAVAL','TAIWAN','OPERATIONAL','MED','미국에서 도입한 키드급 구축함 4척. SM-2·SM-1·하푼 탑재. 대만 주력 수상전투함.',{displacement:'9,790톤',length:'171.9m',crew:'348명',armament:'SM-2·SM-1·하푼·127mm',firstDeployed:'2005년(대만)',quantity:'4척'},['키드급','대만','미국도입','SM-2','주력구축함'],'대만해군',undefined,85),
  w('twn3-n002','성공급 호위함','Cheng Kung-class FFG (Oliver Hazard Perry)','NAVAL','TAIWAN','OPERATIONAL','MED','미국 OHP급 기반 대만 호위함. 8척 건조. SM-1·76mm·하푼.',{displacement:'4,105톤',length:'138m',crew:'217명',armament:'SM-1MR·76mm·하푼',firstDeployed:'1993년',quantity:'8척'},['성공급','대만','OHP기반','SM-1','호위함'],'대만해군',undefined,85),
]



