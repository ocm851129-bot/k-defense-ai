import type { WeaponSystem } from './weapons'
const w = (id:string,name:string,nameEng:string,cat:WeaponSystem['category'],origin:WeaponSystem['origin'],status:WeaponSystem['status'],threat:WeaponSystem['threatRating'],desc:string,specs:WeaponSystem['specs'],tags:string[],sources:string[],img?:string,wiki?:string,conf=80): WeaponSystem=>({id,name,nameEng,category:cat,origin,status,threatRating:threat,description:desc,detail:`## ${nameEng}\n\n${desc}\n\n### 주요 제원\n${Object.entries(specs).filter(([,v])=>v).map(([k,v])=>`- ${k}: ${v}`).join('\n')}`,specs,confidence:conf,lastUpdated:'2026-07-01',relatedIntelIds:[],tags,sources,imageUrl:img,wikiUrl:wiki})

export const WEAPONS_BATCH5_CHINA2: WeaponSystem[] = [

  // ── ICBM/전략 ─────────────────────────────────────────────────────────────
  w('chn2-i001','DF-41 (동풍-41) ICBM','DF-41 (Dongfeng-41) ICBM','ICBM','CHINA','OPERATIONAL','CRITICAL',
    '중국 최신 고체연료 ICBM. 사거리 14,000km. MIRV 10기. 도로기동·사일로 겸용. 미 전역 타격.',
    {range:'14,000km',payload:'MIRV×10(핵탄두)',propulsion:'고체연료 3단',firstDeployed:'2019년',manufacturer:'중국항천과기집단(CASC)'},
    ['DF-41','동풍41','ICBM','MIRV','고체연료'],['IISS','DoD China Report'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/120%E7%A7%92%E7%9C%8B%E5%A4%A7%E9%98%85%E5%85%B5%E9%9C%87%E6%92%BC%E7%9E%AC%E9%97%B4%EF%BC%811.png/330px-120%E7%A7%92%E7%9C%8B%E5%A4%A7%E9%98%85%E5%85%B5%E9%9C%87%E6%92%BC%E7%9E%AC%E9%97%B4%EF%BC%811.png','https://en.wikipedia.org/wiki/DF-41',78),

  w('chn2-i002','DF-5B ICBM','DF-5B (Dongfeng-5B) ICBM','ICBM','CHINA','OPERATIONAL','CRITICAL',
    '액체연료 사일로 ICBM. MIRV 3~5기. 사거리 13,000km. 최초 중국 MIRV 탑재 ICBM.',
    {range:'13,000km',payload:'MIRV×5(3Mt급)',propulsion:'액체연료 2단',firstDeployed:'2015년(5B)',manufacturer:'CASC',quantity:'20기+'},
    ['DF-5B','ICBM','MIRV','사일로','중국'],['DoD','IISS'],
    undefined,'https://en.wikipedia.org/wiki/DF-5',82),

  w('chn2-i003','DF-31AG ICBM','DF-31AG Road-Mobile ICBM','ICBM','CHINA','OPERATIONAL','CRITICAL',
    'DF-31A 개량형. 도로기동 TEL. 사거리 11,200km. 고체연료. 단탄두 1Mt.',
    {range:'11,200km',payload:'단탄두 1Mt',propulsion:'고체연료',firstDeployed:'2017년',manufacturer:'CASC'},
    ['DF-31AG','ICBM','도로기동','고체'],['DoD','IISS'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/DF-31_ballistic_missiles_20170919.jpg/330px-DF-31_ballistic_missiles_20170919.jpg','https://en.wikipedia.org/wiki/DF-31',80),

  w('chn2-i004','JL-3 SLBM','JL-3 (Julang-3) SLBM','SLBM','CHINA','DEVELOPMENT','CRITICAL',
    '094B·096형 핵잠수함 탑재 신형 SLBM. JL-2 대체. 사거리 10,000km+. MIRV 가능.',
    {range:'10,000km+(추정)',payload:'MIRV 가능',propulsion:'고체연료',firstDeployed:'2025년(예상)',manufacturer:'CASC'},
    ['JL-3','SLBM','중국','핵잠수함','MIRV'],['DoD','38North'],
    undefined,'https://en.wikipedia.org/wiki/JL-3',68),

  w('chn2-i005','DF-ZF 극초음속 활공체','DF-ZF (WU-14) Hypersonic Glide Vehicle','IRBM','CHINA','OPERATIONAL','CRITICAL',
    '극초음속 활공탄두. DF-17 미사일 탑재. 마하 5~10. 기동·채핑. 미사일방어 무력화.',
    {range:'2,000km',speed:'마하 5~10',payload:'재래식 또는 핵',firstDeployed:'2019년(DF-17)',manufacturer:'CASC'},
    ['DF-ZF','WU-14','HGV','극초음속','DF-17'],['DoD','CSIS'],
    undefined,'https://en.wikipedia.org/wiki/DF-ZF',72),

  // ── 중단거리 미사일 ─────────────────────────────────────────────────────
  w('chn2-m001','DF-21D 항모킬러','DF-21D Anti-Ship Ballistic Missile','IRBM','CHINA','OPERATIONAL','CRITICAL',
    '세계 최초 대함탄도미사일(ASBM). 사거리 1,500km. 레이더+IR 탐색기. 항모 직격타격 가능.',
    {range:'1,500km',payload:'반응형 탄두',guidance:'INS+레이더+IIR',firstDeployed:'2015년(추정)',manufacturer:'CASC'},
    ['DF-21D','ASBM','항모킬러','1500km','대함탄도'],['DoD','CSIS'],
    undefined,'https://en.wikipedia.org/wiki/DF-21',82),

  w('chn2-m002','DF-26 중거리 탄도','DF-26 IRBM (Guam Killer)','IRBM','CHINA','OPERATIONAL','CRITICAL',
    '사거리 4,000km 중거리 탄도미사일. 괌 타격 가능(「괌 킬러」). 재래식/핵 겸용. ASBM 기능 보유.',
    {range:'4,000km',payload:'재래식 또는 핵·ASBM',propulsion:'고체연료',firstDeployed:'2016년',manufacturer:'CASC'},
    ['DF-26','괌킬러','IRBM','4000km','재래식핵겸용'],['DoD','IISS'],
    undefined,'https://en.wikipedia.org/wiki/DF-26',80),

  w('chn2-m003','DF-17 극초음속 탄도미사일','DF-17 Hypersonic Ballistic Missile','SRBM','CHINA','OPERATIONAL','CRITICAL',
    'DF-ZF HGV 탑재 단거리 탄도미사일. 사거리 2,000km. 기동. 레이더 추적 불가.',
    {range:'2,000km',speed:'마하 5~10(HGV)',payload:'재래식 또는 핵',firstDeployed:'2019년',manufacturer:'CASC'},
    ['DF-17','극초음속','DF-ZF','HGV','2000km'],['DoD','CSIS'],
    undefined,'https://en.wikipedia.org/wiki/DF-17',78),

  w('chn2-m004','PHL-03 300mm 다연장로켓','PHL-03 300mm MLRS','MLRS','CHINA','OPERATIONAL','HIGH',
    'BM-30 스메르치 기반 중국형 300mm MLRS. 사거리 150km. 수출형 AR3 사거리 220km.',
    {range:'150km',armament:'300mm 로켓 12발',crew:'4명',firstDeployed:'2003년',manufacturer:'Norinco'},
    ['PHL-03','300mm','MLRS','스메르치기반'],['중국군','Norinco'],
    undefined,'https://en.wikipedia.org/wiki/PHL-03',82),

  w('chn2-m005','YJ-12 초음속 대함미사일','YJ-12 Supersonic Anti-Ship Missile','SSM','CHINA','OPERATIONAL','HIGH',
    'Su-30MKK·H-6K 탑재 초음속 대함미사일. 마하 4. 사거리 400km. 항모·대형함 타격.',
    {range:'400km',speed:'마하 4',payload:'300kg AP',guidance:'INS+능동레이더',firstDeployed:'2015년',manufacturer:'HAIG'},
    ['YJ-12','초음속','대함미사일','마하4'],['중국군','DoD'],
    undefined,'https://en.wikipedia.org/wiki/YJ-12',75),

  w('chn2-m006','YJ-18 순항미사일','YJ-18 Anti-Ship Cruise Missile','CRUISE','CHINA','OPERATIONAL','HIGH',
    '잠수함·수상함 VLS 발사 대함+지상공격 겸용. 마하 3(최종단계). 사거리 540km.',
    {range:'540km',speed:'마하 3(종말)',payload:'140kg AP',guidance:'INS+능동레이더',firstDeployed:'2015년',manufacturer:'Haiying'},
    ['YJ-18','대함미사일','잠수함발사','마하3'],['중국해군','DoD'],
    undefined,'https://en.wikipedia.org/wiki/YJ-18',72),

  w('chn2-m007','PL-15 장거리 공대공','PL-15 Beyond Visual Range AAM','AAM','CHINA','OPERATIONAL','HIGH',
    '중국 최강 BVRAAM. 사거리 200km+. 듀얼 펄스 모터·능동 AESA 탐색기. AIM-120D 대응.',
    {range:'200km+',speed:'마하 5',guidance:'INS+데이터링크+능동AESA',firstDeployed:'2015년',manufacturer:'LETRI'},
    ['PL-15','BVRAAM','장거리공대공','AESA','200km'],['중국공군','DoD'],
    undefined,'https://en.wikipedia.org/wiki/PL-15',78),

  w('chn2-m008','PL-21 초장거리 공대공','PL-21 Very Long Range AAM','AAM','CHINA','DEVELOPMENT','HIGH',
    '사거리 400km+ 공대공미사일. AESA 레이더·능동 종말 유도. AWACS·급유기 격추 목적.',
    {range:'400km+(추정)',guidance:'INS+데이터링크+AESA',firstDeployed:'2023년+(추정)',manufacturer:'LETRI'},
    ['PL-21','초장거리','공대공','AWACS킬러'],['DoD','CSIS'],
    undefined,undefined,60),

  w('chn2-m009','CJ-10 지상발사 순항미사일','CJ-10 Ground-Launched Cruise Missile','CRUISE','CHINA','OPERATIONAL','HIGH',
    '중국 Kh-55 기반 전략순항미사일. 사거리 1,500km+. 핵/재래식 겸용. H-6K 공중발사형 CJ-20.',
    {range:'1,500km',speed:'마하 0.8',payload:'500kg HE 또는 핵',guidance:'INS+TERCOM+EO',firstDeployed:'2007년',manufacturer:'HAIG'},
    ['CJ-10','순항미사일','1500km','핵겸용','Kh-55기반'],['중국군','IISS'],
    undefined,'https://en.wikipedia.org/wiki/CJ-10',75),

  // ── 항공기 ────────────────────────────────────────────────────────────────
  w('chn2-af001','J-20 위룡 스텔스 전투기','J-20 Mighty Dragon Stealth Fighter','AIRCRAFT','CHINA','OPERATIONAL','HIGH',
    '중국 최초 5세대 스텔스 전투기. 2022년 국산 WS-15 엔진 장착. 내부무장창·PL-15. 200기+ 운용.',
    {speed:'마하 2.0+',range:'2,000km',crew:'1명',armament:'PL-15·PL-10·CJ-20(내부)',firstDeployed:'2017년',manufacturer:'청두항공기공업그룹',quantity:'250기+'},
    ['J-20','위룡','스텔스','5세대','PL-15'],['중국공군','DoD'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/J-20_at_Airshow_China_2016.jpg/320px-J-20_at_Airshow_China_2016.jpg',
    'https://en.wikipedia.org/wiki/Chengdu_J-20',80),

  w('chn2-af002','FC-31/J-35 5세대 함재기','FC-31/J-35 Carrier-Based Stealth Fighter','AIRCRAFT','CHINA','DEVELOPMENT','HIGH',
    '중국 2번째 5세대 스텔스기. 항모 탑재용. WS-13E 엔진. 푸젠함 탑재 예정. 2025년 전력화 추진.',
    {speed:'마하 1.8+',range:'1,250km',crew:'1명',armament:'PL-15·PL-10',firstDeployed:'2025년(예상)',manufacturer:'선양항공기공업그룹'},
    ['J-35','FC-31','함재기','스텔스','항모'],['중국해군','DoD'],
    undefined,'https://en.wikipedia.org/wiki/Shenyang_FC-31',70),

  w('chn2-af003','J-16 스트라이크 이글형','J-16 Strike Fighter','AIRCRAFT','CHINA','OPERATIONAL','HIGH',
    'Su-27 기반 중국 독자 개발 전폭기. PL-15·YJ-12 통합. 전자전 J-16D. 400기+ 생산.',
    {speed:'마하 2.0',range:'3,900km',crew:'2명',armament:'PL-15·PL-10·YJ-12·레이저유도폭탄',firstDeployed:'2015년',manufacturer:'선양',quantity:'400기+'},
    ['J-16','전폭기','PL-15','YJ-12','중국공군'],['중국공군','IISS'],
    undefined,'https://en.wikipedia.org/wiki/Shenyang_J-16',82),

  w('chn2-af004','J-16D 전자전기','J-16D Electronic Warfare','AIRCRAFT','CHINA','OPERATIONAL','HIGH',
    'J-16 기반 전자전 공격기. 미국 EA-18G 그라울러 대응. ALQ형 재밍포드 탑재.',
    {speed:'마하 2.0',range:'3,200km',crew:'2명',armament:'재밍포드·HARM형 ARMssl',firstDeployed:'2022년',manufacturer:'선양'},
    ['J-16D','전자전','그라울러대응','재밍'],['중국공군','DoD'],
    undefined,'https://en.wikipedia.org/wiki/Shenyang_J-16#J-16D',75),

  w('chn2-af005','H-6K 전략폭격기','H-6K Strategic Bomber','AIRCRAFT','CHINA','OPERATIONAL','HIGH',
    'Tu-16 기반 현대화 폭격기. D-30KP2 엔진 교체. CJ-20 공중발사 순항미사일 6발. 핵탑재.',
    {speed:'마하 0.84',range:'6,000km',crew:'6명',armament:'CJ-20×6·YJ-12·KD-63 순항',firstDeployed:'2011년',manufacturer:'시안항공',quantity:'100기+'},
    ['H-6K','폭격기','CJ-20','중국전략','핵탑재'],['중국공군','IISS'],
    undefined,'https://en.wikipedia.org/wiki/Xian_H-6',85),

  w('chn2-af006','H-6N 공중발사 탄도미사일 폭격기','H-6N Aerial Refuelable Bomber','AIRCRAFT','CHINA','OPERATIONAL','HIGH',
    'H-6K 개량형. 공중급유 프로브. 탄도미사일(DF-21 계열) 또는 극초음속 무기 탑재 가능.',
    {speed:'마하 0.84',range:'8,000km(급유)',crew:'6명',armament:'DF-21형 탄도·CJ-20',firstDeployed:'2019년',manufacturer:'시안항공'},
    ['H-6N','공중급유','폭격기','탄도미사일탑재'],['중국공군','DoD'],
    undefined,undefined,72),

  w('chn2-af007','J-10C 전투기','J-10C Multirole Fighter','AIRCRAFT','CHINA','OPERATIONAL','MED',
    'J-10 C형. AESA 레이더·PL-10 HOBS·PL-15 BVRAAM. 국산 WS-10B 엔진. 300기+ 운용.',
    {speed:'마하 2.2',range:'1,850km',crew:'1명',armament:'PL-10·PL-15·YJ-91·레이저폭탄',firstDeployed:'2015년',manufacturer:'청두',quantity:'300기+'},
    ['J-10C','AESA','PL-15','국산엔진','다목적'],['중국공군'],
    undefined,'https://en.wikipedia.org/wiki/Chengdu_J-10',82),

  w('chn2-af008','Z-20 다목적헬기','Z-20 Utility Helicopter','HELICOPTER','CHINA','OPERATIONAL','MED',
    '중국판 UH-60 블랙호크. 국산 WZ-10 엔진. 기동·특수전·해상구조. 2019년 전력화.',
    {speed:'300km/h',range:'800km',crew:'2+12명',firstDeployed:'2019년',manufacturer:'하얼빈항공기제조'},
    ['Z-20','기동헬기','블랙호크형','중국'],['중국군'],
    undefined,'https://en.wikipedia.org/wiki/Harbin_Z-20',78),

  w('chn2-af009','Z-10 공격헬기','Z-10 Attack Helicopter','HELICOPTER','CHINA','OPERATIONAL','HIGH',
    '중국 독자 개발 공격헬기. HJ-10 대전차미사일·PL-90 공대공·23mm 기관포. 미국 AH-64 대응.',
    {speed:'270km/h',range:'800km',crew:'2명',armament:'23mm 기관포·HJ-10·TY-90·로켓',firstDeployed:'2012년',manufacturer:'창허항공기업'},
    ['Z-10','공격헬기','HJ-10','TY-90','중국군'],['중국군','IISS'],
    undefined,'https://en.wikipedia.org/wiki/CAIC_Z-10',80),

  // ── 해군 ─────────────────────────────────────────────────────────────────
  w('chn2-n001','푸젠함 (003형 항모)','CNS Fujian CV-18 (Type 003 Carrier)','NAVAL','CHINA','OPERATIONAL','HIGH',
    '중국 3번째·최초 전자기사출 항모. 80,000t. J-35·J-15T·KJ-600 AEW탑재. 2024년 해상시험.',
    {displacement:'80,000t',armament:'HHQ-10 CIWS·레일건(연구)·J-35 함재기 60기',crew:'2,000명+',speed:'31노트(추정)',firstDeployed:'2024년(시험)',manufacturer:'강남조선소'},
    ['푸젠함','003형항모','EMALS','J-35','전자기사출'],['중국해군','DoD'],
    undefined,'https://en.wikipedia.org/wiki/Chinese_aircraft_carrier_Fujian',80),

  w('chn2-n002','055형 구축함 렌하이급','Type 055 Destroyer (Renhai-class)','NAVAL','CHINA','OPERATIONAL','HIGH',
    '세계 최강 구축함급. 13,000t. VLS 112셀·YJ-18·HHQ-9B·위성관측 레이더. 8척 운용.',
    {displacement:'13,000t',armament:'VLS 112셀(YJ-18·HHQ-9B·YJ-12B)·H/PJ-38 130mm',crew:'300명',speed:'30노트',firstDeployed:'2020년',manufacturer:'강남·대련조선'},
    ['055형','렌하이','구축함','VLS112','최강'],['중국해군','DoD'],
    undefined,'https://en.wikipedia.org/wiki/Type_055_destroyer',85),

  w('chn2-n003','054A형 호위함','Type 054A Jiangkai-II Frigate','NAVAL','CHINA','OPERATIONAL','HIGH',
    '중국 주력 호위함. 32셀 VLS·YJ-83·HHQ-16. 50척+ 건조. 수출형 054AP.',
    {displacement:'4,000t',armament:'VLS 32셀·YJ-83×8·H/PJ-26 76mm·어뢰',crew:'190명',speed:'27노트',firstDeployed:'2008년',manufacturer:'다수 조선소',quantity:'50척+'},
    ['054A','호위함','VLS32','YJ-83','중국해군'],['중국해군','IISS'],
    undefined,'https://en.wikipedia.org/wiki/Type_054A_frigate',88),

  w('chn2-n004','093B형 핵잠수함','Type 093B Shang-II-class SSGN','SUBMARINE','CHINA','OPERATIONAL','HIGH',
    '개량형 핵추진 다목적잠수함. VLS YJ-18 순항미사일 탑재. 7척 운용.',
    {displacement:'8,000t',armament:'VLS·YJ-18·어뢰관 6문·HY-2형',crew:'100명',speed:'30노트',firstDeployed:'2012년(093B)',manufacturer:'보하이조선소'},
    ['093B형','SSGN','핵잠수함','YJ-18','VLS'],['DoD','중국해군'],
    undefined,'https://en.wikipedia.org/wiki/Type_093_submarine',72),

  w('chn2-n005','094A형 전략핵잠수함','Type 094A Jin-class SSBN','SUBMARINE','CHINA','OPERATIONAL','CRITICAL',
    '전략핵잠수함. JL-2 SLBM 12발. 미 해군 서태평양 핵전력 직접 대응. 6척 운용.',
    {displacement:'11,000t',armament:'JL-2 SLBM×12·어뢰관 6문',crew:'100명',speed:'22노트',firstDeployed:'2007년(094)',manufacturer:'보하이'},
    ['094형','Jin급','SSBN','JL-2','전략핵잠수함'],['중국해군','DoD'],
    undefined,'https://en.wikipedia.org/wiki/Type_094_submarine',80),

  w('chn2-n006','071형 강습상륙함 (위자오급)','Type 071 LPD (Yuzhao-class)','NAVAL','CHINA','OPERATIONAL','HIGH',
    '25,000t 대형상륙함. 공기부양정 4척+헬기. 대만해협·남해 상륙작전 핵심.',
    {displacement:'25,000t',armament:'H/PJ-26 76mm·HHQ-10 CIWS·헬기 4기',crew:'120명+상륙병력800명',speed:'20노트',firstDeployed:'2007년',manufacturer:'광저우조선소',quantity:'8척'},
    ['071형','위자오급','강습상륙','대만해협','상륙작전'],['중국해군','DoD'],
    undefined,'https://en.wikipedia.org/wiki/Type_071_amphibious_transport_dock',85),

  // ── 지상 전차·기갑 ─────────────────────────────────────────────────────
  w('chn2-t001','ZTZ-99A 주력전차','ZTZ-99A (Type 99A) MBT','GROUND','CHINA','OPERATIONAL','HIGH',
    '중국 4세대 주력전차. 125mm ZPT-98A·구동형 ERA·레이저 다즐러. 사거리 2,000m AT-11 가능.',
    {weight:'58t',armament:'125mm ZPT-98A·12.7mm·7.62mm',crew:'3명',speed:'80km/h',firstDeployed:'2011년',manufacturer:'내몽골제1기계집단'},
    ['ZTZ-99A','Type99A','중국전차','125mm','ERA'],['중국군','IISS'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/ZTZ-99A_tank_front_20170902.jpg/330px-ZTZ-99A_tank_front_20170902.jpg','https://en.wikipedia.org/wiki/Type_99_tank',82),

  w('chn2-t002','ZTZ-15 경전차','ZTZ-15 (Type 15) Light Tank','GROUND','CHINA','OPERATIONAL','MED',
    '고원·산악 작전용 경전차. 105mm 강선포·자동장전. 티베트·고원 배치. ZTZ-99 기동 불가 지형 전용.',
    {weight:'33t',armament:'105mm ZPT-83A·12.7mm·7.62mm',crew:'3명',speed:'70km/h',firstDeployed:'2018년',manufacturer:'내몽골제1기계'},
    ['ZTZ-15','경전차','105mm','티베트','고원'],['중국군'],
    undefined,'https://en.wikipedia.org/wiki/Type_15_tank',78),

  w('chn2-t003','ZBD-04A 보병전투차','ZBD-04A IFV','GROUND','CHINA','OPERATIONAL','HIGH',
    'BMP-3 영향 중국 IFV. 100mm 저압포+30mm 기관포 복합. 수상도하. 1,000대+.',
    {weight:'23t',armament:'100mm 저압포+30mm ZPT99·HJ-73C ATGM·7.62mm',crew:'3+7명',speed:'65km/h',firstDeployed:'2010년',manufacturer:'북방공업'},
    ['ZBD-04A','IFV','100mm','30mm','수상도하'],['중국군'],
    undefined,'https://en.wikipedia.org/wiki/ZBD-04',80),

  w('chn2-t004','PLZ-05 자주포 155mm','PLZ-05 SPH 155mm','ARTILLERY','CHINA','OPERATIONAL','HIGH',
    '155mm/52구경장 자주포. K9 유사 성능. 사거리 53km(활성탄). 자동 장전. 수출형 SH15.',
    {weight:'35t',armament:'155mm PL-45/52구경장',crew:'5명',range:'53km(활성탄)',firstDeployed:'2005년',manufacturer:'중국북방공업',quantity:'500+문'},
    ['PLZ-05','155mm','자주포','52구경장','중국'],['중국군','Norinco'],
    undefined,'https://en.wikipedia.org/wiki/PLZ-05',82),

  w('chn2-t005','WZ-551 (92식) 차륜형 장갑차','WZ-551 Type 92 IFV','GROUND','CHINA','OPERATIONAL','MED',
    '6×6 차륜형 IFV. 25mm 기관포·HJ-73C. 수출 대성공. 이라크·파키스탄 등 수출.',
    {weight:'15t',armament:'25mm 기관포·HJ-73C',crew:'3+9명',speed:'100km/h',firstDeployed:'1990년대'},
    ['WZ-551','Type92','차륜형','IFV','수출'],['Norinco','중국군'],
    undefined,'https://en.wikipedia.org/wiki/WZ551',78),

  // ── 대공 방공 ──────────────────────────────────────────────────────────
  w('chn2-s001','HQ-9B 장거리 방공','HQ-9B Long-Range SAM','SAM','CHINA','OPERATIONAL','HIGH',
    '중국 S-300 대응 장거리 방공. 사거리 200km. AESA 레이더. S-400 수입 보완.',
    {range:'200km',altitude:'30km',speed:'마하 4.2',guidance:'TVM+능동',firstDeployed:'2013년',manufacturer:'중국항천'},
    ['HQ-9B','200km','방공','AESA','S-300대응'],['중국군','IISS'],
    undefined,'https://en.wikipedia.org/wiki/HQ-9',80),

  w('chn2-s002','HQ-16B 중거리 방공','HQ-16B Medium-Range SAM','SAM','CHINA','OPERATIONAL','HIGH',
    '러시아 Buk-M2 기반 중거리 방공. 사거리 120km. 함정형(HHQ-16) 054A 탑재.',
    {range:'120km',altitude:'25km',firstDeployed:'2012년',manufacturer:'중국항천'},
    ['HQ-16B','중거리방공','Buk기반','함정형'],['중국군'],
    undefined,'https://en.wikipedia.org/wiki/HQ-16',78),

  w('chn2-s003','HQ-17A 단거리 방공','HQ-17A Short-Range SAM','SAM','CHINA','OPERATIONAL','MED',
    '러시아 Tor-M1 기반 단거리 방공 시스템. 12발 VLS. 드론·순항미사일 대응.',
    {range:'15km',altitude:'10km',firstDeployed:'2018년',manufacturer:'중국항천'},
    ['HQ-17A','단거리방공','드론대응','Tor기반'],['중국군'],undefined,undefined,75),

  // ── UAV/드론 ─────────────────────────────────────────────────────────────
  w('chn2-u001','CH-4B 중고도 공격UAV','CH-4B Rainbow Attack UAV','UAV','CHINA','OPERATIONAL','HIGH',
    'MQ-9 리퍼급 중국 UAV. AR-1·AR-2 미사일·GPS 폭탄 탑재. 이라크·이집트·나이지리아 수출.',
    {speed:'235km/h',ceiling:'8,000m',armament:'AR-1 공대지·AR-2·레이저폭탄',firstDeployed:'2014년',manufacturer:'CASC',quantity:'세계 다수 수출'},
    ['CH-4B','무지개드론','공격UAV','이라크수출','MQ-9급'],['CASC','수출국'],
    undefined,'https://en.wikipedia.org/wiki/CASC_Rainbow_4',82),

  w('chn2-u002','WZ-7 가오샹 정찰UAV','WZ-7 Soaring Dragon HALE UAV','UAV','CHINA','OPERATIONAL','MED',
    '고고도 장기체공 전략정찰UAV. 남중국해 정찰. RQ-4 글로벌호크 대응 개발.',
    {speed:'750km/h',ceiling:'18,000m',armament:'없음(SAR·EO)',firstDeployed:'2011년',manufacturer:'귀주항공'},
    ['WZ-7','소링드래곤','고고도정찰UAV','남중국해'],['중국군'],
    undefined,'https://en.wikipedia.org/wiki/Guizhou_WZ-7',72),

  w('chn2-u003','GJ-11 스텔스 공격UAV','GJ-11 Sharp Sword Stealth UCAV','UAV','CHINA','DEVELOPMENT','HIGH',
    '중국 스텔스 전투UAV. 내부 무장창. J-20과 협동비행 시험. 2013년 공개. B-2 영향 받은 날개형.',
    {speed:'불명',ceiling:'불명',armament:'내부무장창(미공개)',firstDeployed:'개발중',manufacturer:'선양'},
    ['GJ-11','스텔스UCAV','내부무장','J-20협동'],['중국군','DoD'],
    undefined,'https://en.wikipedia.org/wiki/Shenyang_GJ-11',60),

  w('chn2-u004','TB-001 쌍미 공격UAV','TB-001 Twin-Tail Scorpion Attack UAV','UAV','CHINA','OPERATIONAL','MED',
    '쌍발 프롭 대형 공격UAV. TL-7 공대지·50kg 폭탄. 중동 수출 다수.',
    {speed:'200km/h',ceiling:'9,000m',armament:'TL-7 공대지미사일·50kg 폭탄',firstDeployed:'2019년',manufacturer:'텅둔'},
    ['TB-001','쌍미','공격드론','중동수출'],['중국','수출'],undefined,undefined,72),

  w('chn2-u005','DJI 매빅3T 군사 정찰','DJI Matrice 30T Military Recon UAV','UAV','CHINA','OPERATIONAL','MED',
    'DJI 상업용 기반 군사 정찰 드론. 우크라이나 전쟁 양측 대량 사용. 저비용·즉응성.',
    {speed:'82km/h',ceiling:'7,000m',armament:'없음(정찰·투하개조)',firstDeployed:'민수→군용전용 2022년',manufacturer:'DJI'},
    ['DJI','매빅','상업드론','우크라이나','정찰'],['우크라이나군','러시아군'],undefined,undefined,95),

  // ── 소화기 ───────────────────────────────────────────────────────────────
  w('chn2-sa001','QBZ-191 돌격소총','QBZ-191 Assault Rifle','RIFLE','CHINA','OPERATIONAL','MED',
    '중국 차세대 표준 돌격소총. 5.8mm 개량탄·피카티니레일·모듈형. 2019 건국70주년 열병식 공개.',
    {caliber:'5.8×42mm DBP-87',weight:'3.5kg',fireRate:'700rpm',capacity:'30발',firstDeployed:'2019년',manufacturer:'중국북방공업'},
    ['QBZ-191','5.8mm','중국소총','모듈형','신형'],['중국군','Norinco'],
    undefined,'https://en.wikipedia.org/wiki/QBZ-191',82),

  w('chn2-sa002','QBZ-03 돌격소총','QBZ-03 Assault Rifle','RIFLE','CHINA','OPERATIONAL','MED',
    '5.8mm 중국 표준소총. 가스작동·회전폐쇄. QBZ-95 병행 운용.',
    {caliber:'5.8×42mm',weight:'3.5kg',fireRate:'650rpm',capacity:'30발',firstDeployed:'2003년',manufacturer:'Norinco'},
    ['QBZ-03','5.8mm','돌격소총','중국'],['중국군','Norinco'],
    undefined,'https://en.wikipedia.org/wiki/QBZ-03',80),

  w('chn2-sa003','QBU-88 저격소총','QBU-88 Sniper Rifle','SNIPER','CHINA','OPERATIONAL','LOW',
    '5.8mm 반자동 저격소총. 불펍 설계. 800m 유효사거리.',
    {caliber:'5.8×42mm DBP-88',weight:'4.3kg',range:'800m',capacity:'10발',firstDeployed:'1988년',manufacturer:'Norinco'},
    ['QBU-88','5.8mm','저격소총','불펍'],['중국군','Norinco'],undefined,undefined,80),

  w('chn2-sa004','Type 92 권총','Type 92 Pistol','PISTOL','CHINA','OPERATIONAL','LOW',
    '중국군 표준 권총. 9mm·5.8mm 두 버전. 90년대 말 채택. 장교·보안기관 표준.',
    {caliber:'9×19mm 또는 5.8×21mm DAP-92',weight:'760g',capacity:'15발(9mm)',firstDeployed:'1997년',manufacturer:'Norinco'},
    ['92식권총','Type92','5.8mm','9mm','중국권총'],['Norinco','중국군'],
    undefined,'https://en.wikipedia.org/wiki/QSZ-92',82),

  w('chn2-sa005','QJZ-89 중기관총','QJZ-89 Heavy Machine Gun','MG','CHINA','OPERATIONAL','MED',
    '12.7mm 공냉 중기관총. 분리형 사이트. 차량·헬기 탑재형. M2 대응 국산 개발.',
    {caliber:'12.7×108mm',weight:'26.5kg',fireRate:'450~600rpm',range:'2,000m',firstDeployed:'1989년',manufacturer:'Norinco'},
    ['QJZ-89','12.7mm','중기관총','중국'],['Norinco','중국군'],
    undefined,undefined,80),

]
