import type { WeaponSystem } from './weapons'
const w = (id:string,name:string,nameEng:string,cat:WeaponSystem['category'],origin:WeaponSystem['origin'],status:WeaponSystem['status'],threat:WeaponSystem['threatRating'],desc:string,specs:WeaponSystem['specs'],tags:string[],sources:string[],img?:string,wiki?:string,conf=80): WeaponSystem=>({id,name,nameEng,category:cat,origin,status,threatRating:threat,description:desc,detail:`## ${nameEng}\n\n${desc}\n\n### 주요 제원\n${Object.entries(specs).filter(([,v])=>v).map(([k,v])=>`- ${k}: ${v}`).join('\n')}`,specs,confidence:conf,lastUpdated:'2026-07-01',relatedIntelIds:[],tags,sources,imageUrl:img,wikiUrl:wiki})

export const WEAPONS_EXP_CHINA: WeaponSystem[] = [

  // ── 탄도·순항 미사일 ────────────────────────────────────────────────────────
  w('chn-m001','DF-41 ICBM','DF-41 (CSS-X-20) ICBM','ICBM','CHINA','OPERATIONAL','CRITICAL',
    '중국 최신 3단 고체추진 ICBM. MIRV 10기. 사거리 14,000km+. 미국 전역 타격. 이동식+사일로 이중 배치.',
    {range:'14,000~15,000km',payload:'MIRV 10기',propulsion:'3단 고체추진',firstDeployed:'2017년',manufacturer:'CASIC'},
    ['DF-41','ICBM','MIRV','고체추진','미국위협'],['중국전략지원부대','PLARF'],
    undefined,'https://en.wikipedia.org/wiki/DF-41',80),

  w('chn-m002','DF-5B ICBM','DF-5B (CSS-4) ICBM','ICBM','CHINA','OPERATIONAL','CRITICAL',
    '중국 초기 MIRV 장착 ICBM. 사거리 13,000km. 사일로 배치. 3탄두 MIRV. 구형이나 여전히 핵억제력.',
    {range:'13,000km',payload:'MIRV 3기',propulsion:'2단 액체추진',firstDeployed:'1981년(5B 2015)',quantity:'20기 추정'},
    ['DF-5B','ICBM','MIRV','사일로','핵억제'],['PLARF'],
    undefined,'https://en.wikipedia.org/wiki/DF-5',78),

  w('chn-m003','DF-31AG ICBM','DF-31AG Mobile ICBM','ICBM','CHINA','OPERATIONAL','CRITICAL',
    'DF-31 이동식 ICBM 최신형. 8축 TEL. 단탄두 또는 소형 MIRV. 사거리 11,200km.',
    {range:'11,200km',payload:'단탄두 또는 MIRV',propulsion:'3단 고체추진',firstDeployed:'2018년'},
    ['DF-31AG','ICBM','이동식','TEL','고체추진'],['PLARF'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/DF-31_ballistic_missiles_20170919.jpg/330px-DF-31_ballistic_missiles_20170919.jpg','https://en.wikipedia.org/wiki/DF-31',78),

  w('chn-m004','JL-3 SLBM','JL-3 (CSS-NX-20) SLBM','SLBM','CHINA','OPERATIONAL','CRITICAL',
    '094A형 SSBN 탑재 신형 SLBM. 사거리 10,000km+. MIRV 3~6기. JL-2의 후속. 중국 해상 핵억제 핵심.',
    {range:'10,000km+',payload:'MIRV 3~6기',propulsion:'3단 고체추진',firstDeployed:'2023년 추정'},
    ['JL-3','SLBM','094A','SSBN','핵억제'],['중국해군'],
    undefined,undefined,70),

  w('chn-m005','DF-26 IRBM','DF-26 (CSS-18) IRBM','IRBM','CHINA','OPERATIONAL','CRITICAL',
    '"괌 킬러". 사거리 4,000km. 핵·재래식 복합. 대함 탄도미사일(ASBM) 역할. 이동식 TEL.',
    {range:'4,000km',payload:'1,200~1,800kg(핵·재래식)',propulsion:'2단 고체추진',firstDeployed:'2015년',manufacturer:'CASIC'},
    ['DF-26','괌킬러','IRBM','ASBM','핵재래식'],['PLARF'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/DF-26_during_2015_parade.jpg/320px-DF-26_during_2015_parade.jpg',
    'https://en.wikipedia.org/wiki/DF-26',82),

  w('chn-m006','DF-21D 대함탄도미사일','DF-21D (CSS-5 Mod-4) ASBM','IRBM','CHINA','OPERATIONAL','CRITICAL',
    '"항모킬러" ASBM. 기동 재진입체(MaRV). 사거리 1,500km. 항모전단 고가치 표적 타격 설계.',
    {range:'1,500km',payload:'600kg 기동탄두',propulsion:'2단 고체추진',guidance:'레이더+INS',firstDeployed:'2010년'},
    ['DF-21D','ASBM','항모킬러','MaRV','대함탄도'],['PLARF'],
    undefined,'https://en.wikipedia.org/wiki/DF-21',82),

  w('chn-m007','DF-17 극초음속','DF-17 HGV Ballistic Missile','SRBM','CHINA','OPERATIONAL','CRITICAL',
    '세계 최초 실전배치 극초음속 활공체(DF-ZF) 탑재 탄도미사일. 사거리 2,500km. 미·일 MD 돌파.',
    {range:'2,500km',speed:'마하 10+',payload:'기동 탄두(DF-ZF HGV)',firstDeployed:'2019년',manufacturer:'CASIC'},
    ['DF-17','극초음속','HGV','DF-ZF','MD돌파'],['PLARF'],
    undefined,'https://en.wikipedia.org/wiki/DF-17',82),

  w('chn-m008','YJ-18 대함순항미사일','YJ-18 Anti-Ship Cruise Missile','SSM','CHINA','OPERATIONAL','HIGH',
    '러시아 클럽-K 기반 대함순항미사일. 사거리 540km. 마지막 20km는 마하 3 초음속 돌진.',
    {range:'540km',speed:'마하 0.8+마하3(종말)',payload:'300kg',guidance:'능동레이더+INS',firstDeployed:'2015년'},
    ['YJ-18','대함미사일','초음속종말','클럽-K','수상함'],['중국해군'],
    undefined,'https://en.wikipedia.org/wiki/YJ-18',80),

  w('chn-m009','HQ-9B 장거리 SAM','HQ-9B Long-Range SAM','SAM','CHINA','OPERATIONAL','HIGH',
    'S-300 기반 중국 독자 장거리 지대공미사일. 사거리 260km. 파키스탄·우즈베키스탄·터키(거부) 수출.',
    {range:'260km',altitude:'30km',guidance:'능동레이더',firstDeployed:'2000년(9B 2015)',manufacturer:'CASIC'},
    ['HQ-9B','장거리SAM','S-300기반','수출','중국방공'],['PLA육군공군'],
    undefined,'https://en.wikipedia.org/wiki/HQ-9',78),

  w('chn-m010','PL-15 공대공미사일','PL-15 Beyond Visual Range AAM','AAM','CHINA','OPERATIONAL','HIGH',
    'J-20 내부 탑재 BVR AAM. 사거리 200km+. 능동레이더+INS. 미 AIM-120 능가 평가. 미국 AIM-260 개발 촉진.',
    {range:'200km+',speed:'마하 5',guidance:'능동레이더+INS+데이터링크',firstDeployed:'2016년',manufacturer:'CASIC'},
    ['PL-15','BVR AAM','J-20','200km','미국능가'],['PLAAF'],
    undefined,'https://en.wikipedia.org/wiki/PL-15',78),

  w('chn-m011','YJ-12B 초음속 대함','YJ-12B Supersonic ASCM','ASM','CHINA','OPERATIONAL','HIGH',
    '마하 4 초음속 공대함미사일. J-16·H-6K 탑재. 사거리 400km. 대함 종심 타격.',
    {range:'400km',speed:'마하 4',payload:'200kg 이상',guidance:'능동레이더',firstDeployed:'2015년'},
    ['YJ-12B','초음속대함','공대함','H-6K','마하4'],['PLAAF'],
    undefined,undefined,72),

  // ── 전투기·항공기 ────────────────────────────────────────────────────────
  w('chn-a001','J-20 청룡','J-20 Mighty Dragon','AIRCRAFT','CHINA','OPERATIONAL','CRITICAL',
    '중국 최초 5세대 스텔스 전투기. WS-15 엔진 점진 교체. PL-15·YJ-12 내부탑재. F-22 대항마.',
    {speed:'마하 2.0+(추정)',range:'1,200km(추정)',ceiling:'20,000m(추정)',crew:'1명',armament:'PL-15·PL-10·YJ-12 내부탑재',firstDeployed:'2017년',manufacturer:'청두항공공업집단',quantity:'200기+(추정)'},
    ['J-20','청룡','5세대','스텔스','중국전투기'],['PLAAF'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/J-20_at_Airshow_China_2016.jpg/320px-J-20_at_Airshow_China_2016.jpg',
    'https://en.wikipedia.org/wiki/Chengdu_J-20',78),

  w('chn-a002','J-35A 함재 스텔스기','J-35A (FC-31) Carrier-based Stealth','AIRCRAFT','CHINA','OPERATIONAL','HIGH',
    'F-35 대항마 5세대 함재 스텔스기. 복젠급 항모 탑재. 2022년 첫 비행·2024년 공식 공개. 수출형 개발 중.',
    {speed:'마하 1.8+(추정)',range:'1,000km+(추정)',crew:'1명',armament:'PL-15·PL-10 내부탑재',firstDeployed:'2024년(추정)',manufacturer:'선양항공공업집단'},
    ['J-35A','FC-31','5세대','항모기','복젠'],['중국해군'],
    undefined,'https://en.wikipedia.org/wiki/Shenyang_FC-31',70),

  w('chn-a003','J-16 플랭커-DF','J-16 Flanker-DF','AIRCRAFT','CHINA','OPERATIONAL','HIGH',
    'Su-30 기반 다목적 전투기 개량형. J-16D 전자전형 파생. YJ-12·PL-15 탑재. PLAAF 주력.',
    {speed:'마하 2.0',range:'3,900km',crew:'2명',armament:'30mm·PL-15·PL-10·YJ-12B',firstDeployed:'2015년',manufacturer:'선양항공',quantity:'200기+'},
    ['J-16','플랭커','다목적','J-16D','전자전'],['PLAAF'],
    undefined,'https://en.wikipedia.org/wiki/Shenyang_J-16',80),

  w('chn-a004','J-11B 플랭커','J-11B Flanker-L','AIRCRAFT','CHINA','OPERATIONAL','HIGH',
    'Su-27SK 역설계 기반 중국판. WS-10A 엔진 장착. 가용성 논란. PLAAF 대규모 운용.',
    {speed:'마하 2.35',range:'3,530km',crew:'1명',armament:'30mm·PL-12·PL-8',firstDeployed:'2000년',quantity:'200기+'},
    ['J-11B','플랭커','Su-27역설계','WS-10','중국'],['PLAAF'],
    undefined,'https://en.wikipedia.org/wiki/Shenyang_J-11',78),

  w('chn-a005','J-15 비상어','J-15 Flying Shark','AIRCRAFT','CHINA','OPERATIONAL','HIGH',
    '랴오닝·산동함 함재전투기. Su-33 기반. 스키점프 발진 방식. 최대 탑재량 제한 단점.',
    {speed:'마하 2.0',range:'3,500km',crew:'1명',armament:'30mm·PL-12·YJ-12',firstDeployed:'2012년',quantity:'50기+'},
    ['J-15','비상어','함재기','랴오닝','Su-33기반'],['중국해군'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Shenyang_J-15_on_carrier.jpg/320px-Shenyang_J-15_on_carrier.jpg',
    'https://en.wikipedia.org/wiki/Shenyang_J-15',78),

  w('chn-a006','J-10C 맹룡','J-10C Vigorous Dragon','AIRCRAFT','CHINA','OPERATIONAL','HIGH',
    'AESA 레이더·DSI 흡입구·WS-10B 엔진 장착 J-10 최신형. PL-15 탑재. 파키스탄 수출(J-10CE).',
    {speed:'마하 2.2',range:'1,850km',crew:'1명',armament:'23mm·PL-15·PL-10',firstDeployed:'2016년',quantity:'200기+'},
    ['J-10C','맹룡','AESA','파키스탄수출','PL-15'],['PLAAF'],
    undefined,'https://en.wikipedia.org/wiki/Chengdu_J-10',80),

  w('chn-a007','H-6K 폭격기','H-6K Badger Bomber','AIRCRAFT','CHINA','OPERATIONAL','HIGH',
    'Tu-16 기반 중국 전략폭격기 현대화형. D-30KP2 엔진·AESA. CJ-10·YJ-12 6발 탑재. 괌 타격권.',
    {speed:'1,050km/h',range:'8,000km',ceiling:'13,000m',crew:'4명',armament:'CJ-10 순항미사일·YJ-12×6',firstDeployed:'1968년(K형 2011)',manufacturer:'시안항공'},
    ['H-6K','폭격기','CJ-10','전략타격','괌'],['PLAAF'],
    undefined,'https://en.wikipedia.org/wiki/Xian_H-6',82),

  w('chn-a008','H-20 스텔스 폭격기','H-20 Stealth Bomber','AIRCRAFT','CHINA','DEVELOPMENT','HIGH',
    'B-2 유사 전익 스텔스 전략폭격기. 2025년 공식 확인·2027년 전후 공개 예상. 핵·재래식 복합.',
    {range:'8,500km+(추정)',speed:'아음속 추정',armament:'핵순항미사일·장거리폭탄(예정)',firstDeployed:'2027년+(예정)',manufacturer:'시안항공'},
    ['H-20','스텔스폭격기','전익기','전략폭격','핵억제'],['PLAAF'],
    undefined,undefined,60),

  w('chn-a009','WZ-7 고공정찰기','WZ-7 Soaring Dragon HALE UAV','UAV','CHINA','OPERATIONAL','HIGH',
    '연료전지 추진 고고도 장기체공 정찰기. 미국 U-2 유사. 남중국해·일본해 감시에 운용.',
    {ceiling:'18,000m+(추정)',range:'7,000km+(추정)',firstDeployed:'2011년',manufacturer:'귀안항공'},
    ['WZ-7','소링드래곤','HALE','정찰','남중국해'],['PLAAF'],
    undefined,undefined,65),

  w('chn-a010','TB-001 쌍미 무인기','TB-001 Twin-tail UAV (MALE)','UAV','CHINA','OPERATIONAL','MED',
    '쌍미익 중고도 장기체공 무인기. 레이저 유도폭탄·AR-2 공대지미사일 탑재. 수출형 활발.',
    {ceiling:'9,000m',range:'2,000km',speed:'200km/h',payload:'100kg',firstDeployed:'2019년',manufacturer:'청두에어크래프트'},
    ['TB-001','중고도UAV','MALE','AR-2','수출'],['PLAAF','수출'],
    undefined,undefined,72),

  // ── 지상 전력 ──────────────────────────────────────────────────────────────
  w('chn-g001','99A 주력전차','ZTZ-99A MBT','GROUND','CHINA','OPERATIONAL','HIGH',
    '중국 3세대+ 주력전차. 125mm 고압 활강포·자동장전·FY-4 반응장갑. 러시아 T-90 수준 평가.',
    {weight:'58톤',armament:'125mm ZPT-98 활강포·12.7mm',crew:'3명',speed:'70km/h',propulsion:'1,500hp 터보디젤',firstDeployed:'2011년',manufacturer:'617공장'},
    ['99A','ZTZ-99A','중국전차','3세대+','반응장갑'],['PLA육군'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/China_ZTZ99A_main_battle_tank_2.jpg/320px-China_ZTZ99A_main_battle_tank_2.jpg',
    'https://en.wikipedia.org/wiki/Type_99_tank',80),

  w('chn-g002','15식 경전차','ZTQ-15 Light Tank','GROUND','CHINA','OPERATIONAL','HIGH',
    '고원·산악 작전 특화 경전차. 105mm 포. 티베트·운남 배치. 대인도 억제 역할.',
    {weight:'36톤',armament:'105mm 강선포·7.62mm',crew:'3명',speed:'70km/h',propulsion:'1,000hp 터보디젤',firstDeployed:'2018년',manufacturer:'617공장'},
    ['ZTQ-15','경전차','고원','티베트','대인도'],['PLA육군'],
    undefined,'https://en.wikipedia.org/wiki/ZTQ-15',78),

  w('chn-g003','04A식 IFV','ZBD-04A IFV','GROUND','CHINA','OPERATIONAL','HIGH',
    '30mm 기관포+HJ-73C 대전차미사일 탑재 보병전투차. 러시아 BMP-3 유사. 도하 가능.',
    {weight:'24톤',armament:'30mm 기관포+HJ-73C ATGM',crew:'3명+7명',speed:'65km/h(도로)/12km/h(수상)',firstDeployed:'2009년'},
    ['ZBD-04A','IFV','보병전투차','30mm','도하'],['PLA육군'],
    undefined,undefined,75),

  w('chn-g004','PHL-03 다연장로켓','PHL-03 300mm MLRS','MLRS','CHINA','OPERATIONAL','HIGH',
    '러시아 스메르치 기반 300mm 다연장로켓. 사거리 130km. 12발. 클러스터·단일탄두 선택.',
    {range:'130km',armament:'300mm 로켓 12발',firstDeployed:'2003년',manufacturer:'NORINCO'},
    ['PHL-03','300mm','MLRS','스메르치기반','장거리'],['PLA육군'],
    undefined,undefined,80),

  w('chn-g005','PLC-09 자주포','PLZ-05A 155mm SPH','ARTILLERY','CHINA','OPERATIONAL','HIGH',
    '155mm/52구경 자주곡사포. 자동장전. 사거리 40km(표준)/53km(RAP). K9 유사 사양.',
    {armament:'155mm 52구경 곡사포',range:'53km(RAP)',weight:'35톤',firstDeployed:'2005년(05A 2015)',manufacturer:'일기계공'},
    ['PLZ-05A','자주포','155mm','자동장전','중국포병'],['PLA육군'],
    undefined,'https://en.wikipedia.org/wiki/PLZ-05',78),

  // ── 해군 전력 ──────────────────────────────────────────────────────────────
  w('chn-nav001','복젠급 항공모함','Fujian-class CV','NAVAL','CHINA','OPERATIONAL','HIGH',
    '중국 첫 전자기 사출(EMALS) 항모. 8만 톤+. 3번 사출기. J-35A·J-15·무인기 탑재. 2024년 해상 시험 완료.',
    {displacement:'80,000톤+',length:'316m',crew:'약 2,000+비행단',armament:'HHQ-10 SAM·1130mm CIWS',propulsion:'재래식 증기터빈(원자력 추정)',firstDeployed:'2024년(해상시험)',manufacturer:'강난조선소'},
    ['복젠','CV-18','항모','EMALS','J-35A'],['중국해군'],
    undefined,'https://en.wikipedia.org/wiki/Chinese_aircraft_carrier_Fujian',75),

  w('chn-nav002','055형 만재 구축함','Type 055 Renhai-class Destroyer','NAVAL','CHINA','OPERATIONAL','HIGH',
    '중국 최대 수상전투함. 1만 2천 톤+. 112셀 VLS·HHQ-9B·YJ-18. 알레이버크급 능가 평가.',
    {displacement:'12,000톤+',length:'180m',crew:'300명',armament:'112셀 VLS(HHQ-9B·YJ-18·HHQ-10)·130mm 함포',propulsion:'가스터빈 CODAG',firstDeployed:'2020년',manufacturer:'강난·대련조선소',quantity:'8척+'},
    ['055형','런하이급','구축함','112VLS','알레이버크능가'],['중국해군'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Chinese_Navy_Type_055_destroyer.jpg/320px-Chinese_Navy_Type_055_destroyer.jpg',
    'https://en.wikipedia.org/wiki/Type_055_destroyer',82),

  w('chn-nav003','052D형 이지스급 구축함','Type 052D Luyang III-class DDG','NAVAL','CHINA','OPERATIONAL','HIGH',
    '중국판 이지스 구축함. 64셀 VLS·AESA 위상배열 레이더. 27척 이상 운용. 세계 최다 이지스급.',
    {displacement:'7,500톤',length:'156m',crew:'280명',armament:'64셀 VLS(HHQ-9·YJ-18·CJ-10)·130mm',firstDeployed:'2014년',manufacturer:'강난·황푸조선소',quantity:'27척+'},
    ['052D형','루양III','이지스급','64VLS','대량건조'],['중국해군'],
    undefined,'https://en.wikipedia.org/wiki/Type_052D_destroyer',82),

  w('chn-nav004','096형 SSBN (Tang급)','Type 096 SSBN (Tang-class)','SUBMARINE','CHINA','DEVELOPMENT','CRITICAL',
    '094형 후속 차세대 SSBN. JL-3 SLBM 24발 탑재 예정. 2030년대 전력화 목표.',
    {displacement:'20,000톤+(추정)',armament:'JL-3 SLBM 24발(예정)',firstDeployed:'2030년대(예정)'},
    ['096형','Tang급','SSBN','JL-3','핵억제'],['중국해군'],
    undefined,undefined,55),

  w('chn-nav005','093B형 공격잠수함','Type 093B Shang-class SSN','SUBMARINE','CHINA','OPERATIONAL','HIGH',
    '개량형 핵추진 공격잠수함. YJ-18 대함미사일 탑재. 6척 운용 추정. 소음 수준 개선 지속.',
    {displacement:'7,000톤(수중)',armament:'어뢰·YJ-18 대함미사일·기뢰',propulsion:'핵추진',firstDeployed:'2016년'},
    ['093B형','상급','SSN','핵추진','YJ-18'],['중국해군'],
    undefined,'https://en.wikipedia.org/wiki/Shang-class_submarine',70),

  w('chn-nav006','075형 강습상륙함','Type 075 Yushen-class LHD','NAVAL','CHINA','OPERATIONAL','HIGH',
    '중국 최대 강습상륙함. 4만 톤. 헬기 30대 탑재. 대만·남중국해 상륙작전 설계. 3척 운용.',
    {displacement:'40,000톤',length:'237m',armament:'HHQ-10·30mm CIWS',propulsion:'디젤·증기터빈',firstDeployed:'2021년',quantity:'3척'},
    ['075형','유선급','LHD','강습상륙함','대만'],['중국해군'],
    undefined,'https://en.wikipedia.org/wiki/Yushen-class_landing_helicopter_dock',80),

  w('chn-nav007','076형 전자기사출 상륙함','Type 076 CATOBAR LHD','NAVAL','CHINA','DEVELOPMENT','HIGH',
    'EMALS 전자기 사출 탑재 강습상륙함. J-35 운용 가능 설계. 세계 최초 CATOBAR 상륙함.',
    {displacement:'50,000톤+(추정)',armament:'EMALS·J-35B·무인기(예정)',firstDeployed:'2027년+(예정)'},
    ['076형','CATOBAR','EMALS','J-35B','세계최초'],['중국해군'],
    undefined,undefined,55),

  // ── 우주·사이버 ───────────────────────────────────────────────────────────
  w('chn-space001','스타링크 대항 레이저 위성','Anti-Satellite Laser Weapon (DN-3)','SATELLITE','CHINA','TESTING','CRITICAL',
    '동전-3 ASAT 시스템. 위성 요격 능력. 2007년 SC-19 테스트로 세계 우주 안보 경고. 레이저 ASAT 개발 중.',
    {altitude:'대기권 밖 LEO 대상',firstDeployed:'시험 중',manufacturer:'CASIC'},
    ['ASAT','위성요격','동전-3','우주전','레이저'],['PLA전략지원부대'],
    undefined,undefined,65),

  w('chn-space002','베이더우-3 위성항법','BeiDou-3 GPS Alternative','SATELLITE','CHINA','OPERATIONAL','MED',
    '중국 독자 위성항법시스템. 35기 위성. 정밀도 GPS급. 군사용 암호화 신호 별도. 미국 GPS 의존 탈피.',
    {altitude:'MEO·GEO·IGSO 복합',quantity:'35기',firstDeployed:'2020년(전세계서비스)',manufacturer:'중국우주기술연구원'},
    ['베이더우-3','GPS대안','위성항법','중국독자','군사용'],['PLA전략지원부대'],
    undefined,'https://en.wikipedia.org/wiki/BeiDou',90),

]
