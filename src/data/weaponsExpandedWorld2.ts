import type { WeaponSystem } from './weapons'
const w = (id:string,name:string,nameEng:string,cat:WeaponSystem['category'],origin:WeaponSystem['origin'],status:WeaponSystem['status'],threat:WeaponSystem['threatRating'],desc:string,specs:WeaponSystem['specs'],tags:string[],sources:string[],img?:string,wiki?:string,conf=82): WeaponSystem=>({id,name,nameEng,category:cat,origin,status,threatRating:threat,description:desc,detail:`## ${nameEng}\n\n${desc}\n\n### 주요 제원\n${Object.entries(specs).filter(([,v])=>v).map(([k,v])=>`- ${k}: ${v}`).join('\n')}`,specs,confidence:conf,lastUpdated:'2026-07-01',relatedIntelIds:[],tags,sources,imageUrl:img,wikiUrl:wiki})

export const WEAPONS_EXP_WORLD2: WeaponSystem[] = [

  // ── 미국 추가 2차 ─────────────────────────────────────────────────────────
  w('usa2-a001','F-117A 나이트호크 (퇴역)','F-117A Nighthawk','AIRCRAFT','USA','RETIRED','LOW',
    '세계 최초 스텔스 전술기. 이라크·유고 전선 검증. 2008년 공식 퇴역. 일부 비밀 운용설.',
    {speed:'993km/h',range:'1,720km',crew:'1명',armament:'JDAM·GBU-10·GBU-27',firstDeployed:'1983년',manufacturer:'록히드 스컹크웍스'},
    ['F-117A','스텔스기','나이트호크','퇴역','이라크'],['USAF'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/F-117_Nighthawk_Front_View.jpg/320px-F-117_Nighthawk_Front_View.jpg',
    'https://en.wikipedia.org/wiki/Lockheed_F-117_Nighthawk',97),

  w('usa2-a002','SR-71 블랙버드 (퇴역)','SR-71 Blackbird','AIRCRAFT','USA','RETIRED','LOW',
    '마하 3.3+ 정찰기. 고도 25,900m. 미사일 회피를 가속도로. 1998년 퇴역. 역사상 가장 빠른 유인기.',
    {speed:'마하 3.3+',ceiling:'25,908m',range:'5,400km',crew:'2명',firstDeployed:'1966년',manufacturer:'록히드 스컹크웍스'},
    ['SR-71','블랙버드','마하3.3','정찰기','퇴역'],['USAF','NASA'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Lockheed_SR-71_Blackbird.jpg/320px-Lockheed_SR-71_Blackbird.jpg',
    'https://en.wikipedia.org/wiki/Lockheed_SR-71_Blackbird',99),

  w('usa2-a003','AV-8B 해리어 II (미 해병)','AV-8B Harrier II (USMC)','AIRCRAFT','USA','RETIRED','LOW',
    'V/STOL 수직이착륙 공격기. 강습상륙함 탑재. F-35B 전환 중. 영국 공동 개발.',
    {speed:'1,065km/h',range:'1,360km',crew:'1명',armament:'25mm GAU-12·JDAM·AIM-9',firstDeployed:'1985년',manufacturer:'맥도넬더글라스·BAE',quantity:'80기+(감소 중)'},
    ['AV-8B','해리어','V/STOL','USMC','F-35B교체'],['USMC'],
    undefined,'https://en.wikipedia.org/wiki/McDonnell_Douglas_AV-8B_Harrier_II',90),

  w('usa2-a004','E-2D 어드밴스드 호크아이','E-2D Advanced Hawkeye AEW','AIRCRAFT','USA','OPERATIONAL','LOW',
    '함재 공중조기경보기. 프로펠러형 AWACS. AN/APY-9 360도 레이더. 항모 전단 방공 관제',
    {speed:'626km/h',ceiling:'11,278m',crew:'5명',payload:'AN/APY-9 UHF 레이더',firstDeployed:'1964년(2D형 2014)',manufacturer:'노스럽그러먼',quantity:'75기+'},
    ['E-2D','호크아이','함재AWACS','AN/APY-9','항모방공'],['USN'],
    undefined,'https://en.wikipedia.org/wiki/Northrop_Grumman_E-2_Hawkeye',97),

  w('usa2-a005','MQ-25 스팅레이','MQ-25A Stingray Carrier-based Tanker UAV','UAV','USA','DEVELOPMENT','LOW',
    '함재 무인급유기. F/A-18·F-35C·E-2D 급유. 항모 전단 전투 반경 확장. 2026년 IOC 예정.',
    {range:'700km(작전)',speed:'약 800km/h(순항)',firstDeployed:'2026년(예정)',manufacturer:'보잉'},
    ['MQ-25','스팅레이','무인급유기','함재','항모'],['USN','보잉'],
    undefined,'https://en.wikipedia.org/wiki/Boeing_MQ-25_Stingray',82),

  w('usa2-m001','GBU-57A/B MOP','GBU-57A/B Massive Ordnance Penetrator','ASM','USA','OPERATIONAL','LOW',
    '세계 최대 재래식 관통탄. 무게 13.6톤·관통력 60m 이상 콘크리트. B-2A·B-21 탑재 전용. 이란 핵시설 타격 설계.',
    {payload:'13,608kg(2,400kg 고폭)',range:'직하투하',guidance:'GPS+INS',firstDeployed:'2011년',manufacturer:'보잉'},
    ['GBU-57','MOP','초대형관통폭탄','B-2탑재','이란핵시설'],['USAF','보잉'],
    undefined,'https://en.wikipedia.org/wiki/GBU-57_MOP',95),

  w('usa2-m002','GBU-39 SDB','GBU-39B Small Diameter Bomb','ASM','USA','OPERATIONAL','LOW',
    '250파운드 소형정밀폭탄. GPS+INS. 날개 펴면 사거리 110km. 8발을 F-15E 1개 파일런에 탑재.',
    {payload:'113kg(폭발물 93kg)',range:'110km(날개 전개 시)',guidance:'GPS+INS',firstDeployed:'2006년',manufacturer:'보잉'},
    ['GBU-39','SDB','소형폭탄','GPS유도','F-15E'],['USAF','보잉'],
    undefined,'https://en.wikipedia.org/wiki/GBU-39_Small_Diameter_Bomb',97),

  w('usa2-m003','SDB II','GBU-53/B StormBreaker SDB II','ASM','USA','OPERATIONAL','LOW',
    'SDB 후속 3mode 유도 소형정밀폭탄. MMW레이더+IIR+레이저 복합. 이동표적 자동추적. F-35·F-15EX 탑재.',
    {payload:'93kg',range:'110km',guidance:'밀리파레이더+IIR+레이저(3mode)',firstDeployed:'2019년',manufacturer:'레이시온'},
    ['SDB II','스톰브레이커','3mode유도','이동표적','F-35'],['USAF','레이시온'],
    undefined,'https://en.wikipedia.org/wiki/GBU-53/B_StormBreaker',92),

  w('usa2-m004','AGM-84 하푼 블록 III','AGM-84L Harpoon Block III','SSM','USA','OPERATIONAL','LOW',
    '세계 최다 운용 대함미사일. 30개국+ 운용. 블록 III는 GPS 추가·사거리 280km. 함정·항공기·잠수함 발사.',
    {range:'280km',speed:'마하 0.85',payload:'221kg',guidance:'INS+능동레이더+GPS',firstDeployed:'1977년(블록III 2008)',manufacturer:'보잉'},
    ['하푼','대함미사일','블록III','30개국','다플랫폼'],['USN','보잉'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/AGM-84_Harpoon.jpg/320px-AGM-84_Harpoon.jpg',
    'https://en.wikipedia.org/wiki/AGM-84_Harpoon',99),

  w('usa2-m005','JASSM-XR','AGM-158D JASSM-XR Extended Range','ASM','USA','DEVELOPMENT','LOW',
    'JASSM-ER 후속 초장거리 순항미사일. 사거리 1,600km+. B-21·F-35 탑재. 중국·러시아 방공망 돌파 설계.',
    {range:'1,600km+(추정)',guidance:'GPS+INS+IIR',firstDeployed:'2028년+(예정)',manufacturer:'록히드마틴'},
    ['JASSM-XR','초장거리','공대지','B-21','중국대응'],['USAF','록히드마틴'],
    undefined,undefined,65),

  w('usa2-n001','줌왈트급 극초음속 개조','Zumwalt DDG-1000 Hypersonic Refit','NAVAL','USA','DEVELOPMENT','LOW',
    '줌왈트급 구축함 155mm AGS 제거 후 CPS 극초음속 미사일 8발 탑재 개조. 대중국 타격 억제.',
    {armament:'CPS 극초음속 미사일 8발(예정)',displacement:'15,900톤',firstDeployed:'2025년+(개조)'},
    ['줌왈트','극초음속개조','CPS','대중국','DDG-1000'],['USN'],
    undefined,undefined,75),

  w('usa2-n002','세계포드급 보급함','Supply-class AOE','NAVAL','USA','RETIRED','LOW',
    '미 해군 전속 전투지원함. 항모 전단과 동속 기동하며 연료·탄약·식량 보급. T-AO대체 중.',
    {displacement:'48,800톤',crew:'667명',armament:'팰랭크스·RAM',firstDeployed:'1994년',quantity:'2척(퇴역 진행)'},
    ['AOE','전투지원함','항모전단보급','미해군'],['USN'],
    undefined,undefined,80),

  // ── 러시아 추가 2차 ──────────────────────────────────────────────────────
  w('rus2-a001','Su-25TM 개구리발 공격기','Su-25TM Grach Close Support','AIRCRAFT','RUSSIA','OPERATIONAL','HIGH',
    '소련 A-10급 지상공격기. 체첸·조지아·시리아·우크라이나 전선 운용. Kh-25·Kh-29 탑재.',
    {speed:'950km/h',range:'1,500km',crew:'1명',armament:'30mm GSh-30-2·Kh-25·Kh-29·FAB-500',firstDeployed:'1981년',quantity:'200기+'},
    ['Su-25','개구리발','CAS','우크라이나','지상공격'],['러시아공군'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Sukhoi_Su-25_in_2015.jpg/320px-Sukhoi_Su-25_in_2015.jpg',
    'https://en.wikipedia.org/wiki/Sukhoi_Su-25',88),

  w('rus2-a002','MiG-29 풀크럼 (수출)','MiG-29 Fulcrum (Export)','AIRCRAFT','RUSSIA','OPERATIONAL','MED',
    '소련/러시아 4세대 다목적 전투기. 29개국 수출. 인도·알제리·폴란드·쿠바 등 운용.',
    {speed:'마하 2.25',range:'1,500km',crew:'1명',armament:'30mm GSh-30-1·R-73·R-27',firstDeployed:'1983년',quantity:'세계 800기+'},
    ['MiG-29','풀크럼','수출','4세대','29개국'],['러시아'],
    undefined,'https://en.wikipedia.org/wiki/Mikoyan_MiG-29',88),

  w('rus2-a003','Su-27 플랭커-B','Sukhoi Su-27 Flanker-B','AIRCRAFT','RUSSIA','OPERATIONAL','HIGH',
    '소련 4세대 제공전투기. 초기형 Su-27은 F-15 대항. 중국·인도·우크라이나 등 수출.',
    {speed:'마하 2.35',range:'3,530km',crew:'1명',armament:'30mm·R-73·R-27',firstDeployed:'1985년',quantity:'300기+(러시아)'},
    ['Su-27','플랭커','제공전투기','F-15대항','러시아'],['러시아공군'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Su-27_front_view_2010-05-08_Ryazan.jpg/320px-Su-27_front_view_2010-05-08_Ryazan.jpg',
    'https://en.wikipedia.org/wiki/Sukhoi_Su-27',88),

  w('rus2-m001','P-800 오닉스/야혼트','P-800 Oniks/BrahMos Supersonic','SSM','RUSSIA','OPERATIONAL','HIGH',
    '초음속 대함·대지 순항미사일. 마하 2.5. 함정·잠수함·육상·항공기 발사. 브라모스 원형.',
    {range:'600km',speed:'마하 2.5',payload:'250kg',guidance:'관성+능동레이더',firstDeployed:'2002년',manufacturer:'NPO마쉬노스트로에니야'},
    ['P-800','오닉스','야혼트','초음속대함','브라모스원형'],['러시아해군'],
    undefined,'https://en.wikipedia.org/wiki/P-800_Oniks',88),

  w('rus2-m002','3M-54 칼리브르','3M-54 Kalibr Cruise Missile','CRUISE','RUSSIA','OPERATIONAL','HIGH',
    '러시아 다목적 순항미사일. 함정·잠수함 발사. 사거리 2,500km. 우크라이나 공습 주력 무기.',
    {range:'2,500km',speed:'마하 0.8+마하3(종말)',payload:'450kg',guidance:'INS+GPS+능동레이더',firstDeployed:'2012년',manufacturer:'노바토르'},
    ['칼리브르','러시아순항','우크라이나','함정발사','3M-54'],['러시아해군'],
    undefined,'https://en.wikipedia.org/wiki/3M-54_Kalibr',92),

  w('rus2-m003','Kh-35U Uran 대함순항','Kh-35U Uran Anti-Ship Missile','SSM','RUSSIA','OPERATIONAL','HIGH',
    '러시아판 하푼. 함정·항공기·육상 발사. 사거리 260km. 인도·베트남 등 수출.',
    {range:'260km',speed:'마하 0.85',payload:'145kg',guidance:'INS+능동레이더',firstDeployed:'2003년',manufacturer:'즈베즈다'},
    ['Kh-35','우란','러시아대함','하푼유사','수출'],['러시아해군'],
    undefined,'https://en.wikipedia.org/wiki/Kh-35',85),

  w('rus2-g001','BMP-2','BMP-2 Infantry Fighting Vehicle','GROUND','RUSSIA','OPERATIONAL','MED',
    'BMP-1 후속 보병전투차. 30mm 2A42 기관포·AT-5 미사일. 세계 50개국+ 운용. 우크라이나 전선 대량 손실.',
    {weight:'14톤',armament:'30mm 2A42·AT-5 Spandrel',crew:'3명+7명',speed:'65km/h',firstDeployed:'1980년',quantity:'세계 5,000기+'},
    ['BMP-2','IFV','보병전투차','30mm','우크라이나'],['러시아육군'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/BMP-2_in_the_2010_Moscow_Victory_Day_Parade.jpg/320px-BMP-2_in_the_2010_Moscow_Victory_Day_Parade.jpg',
    'https://en.wikipedia.org/wiki/BMP-2',88),

  w('rus2-g002','BTR-82A 차륜형 장갑차','BTR-82A Wheeled APC','GROUND','RUSSIA','OPERATIONAL','MED',
    'BTR-80 개량형. 14.5mm → 30mm 기관포 탑재. 야간 열영상. 우크라이나 전선 주요 기갑 전력.',
    {weight:'15.4톤',armament:'30mm 2A72+7.62mm PKT',crew:'3명+7명',speed:'90km/h',firstDeployed:'2013년',manufacturer:'아르자마스기계'},
    ['BTR-82A','차륜형APC','우크라이나','30mm','기계화보병'],['러시아육군'],
    undefined,'https://en.wikipedia.org/wiki/BTR-82',85),

  w('rus2-g003','T-80BVM MBT','T-80BVM Gas Turbine MBT','GROUND','RUSSIA','OPERATIONAL','HIGH',
    '가스터빈 주력전차. 콘타크트-5+릴리크-M 능동장갑. 우크라이나 전선 북부 전선 운용.',
    {weight:'46톤',armament:'125mm 2А46М-4+12.7mm',crew:'3명',speed:'80km/h(도로)',propulsion:'GTD-1250 가스터빈 1,250hp',firstDeployed:'1978년(BVM 2017)'},
    ['T-80BVM','가스터빈전차','우크라이나','북부전선','콘타크트-5'],['러시아육군'],
    undefined,'https://en.wikipedia.org/wiki/T-80',85),

  // ── 중국 추가 2차 ─────────────────────────────────────────────────────────
  w('chn2-a001','J-10A/B/C 조룡','J-10 Vigorous Dragon (A/B/C variants)','AIRCRAFT','CHINA','OPERATIONAL','HIGH',
    '중국 독자 3.5~4세대 다목적 전투기. J-10C는 AESA 레이더·WS-10B 엔진. 파키스탄(J-10CE) 수출.',
    {speed:'마하 2.2',range:'1,850km',crew:'1명',armament:'23mm·PL-12·PL-10',firstDeployed:'2003년(A)',quantity:'500기+'},
    ['J-10','조룡','중국전투기','AESA','파키스탄수출'],['PLAAF'],
    undefined,'https://en.wikipedia.org/wiki/Chengdu_J-10',80),

  w('chn2-a002','J-8IIF 핀백','J-8IIF Finback','AIRCRAFT','CHINA','RETIRED','MED',
    '중국 2세대 요격기. 쌍발·단좌. EP-3 충돌 사건(2001) 기체. 현역 감소 중.',
    {speed:'마하 2.2',range:'2,200km',crew:'1명',armament:'23mm·PL-5·PL-8',firstDeployed:'1981년',quantity:'100기+(감소)'},
    ['J-8IIF','핀백','요격기','EP-3충돌','2세대'],['PLAAF'],
    undefined,'https://en.wikipedia.org/wiki/Shenyang_J-8',75),

  w('chn2-n001','란저우급 052C 구축함','Type 052C Luyang II DDG','NAVAL','CHINA','OPERATIONAL','HIGH',
    '중국 첫 본토 AESA 이지스급. HHQ-9×48. 6척 운용. 052D로 단계 전환 중.',
    {displacement:'6,500톤',length:'155m',crew:'280명',armament:'HHQ-9×48·YJ-12·130mm',firstDeployed:'2004년',quantity:'6척'},
    ['052C','루양II','중국이지스','HHQ-9','AESA'],['중국해군'],
    undefined,'https://en.wikipedia.org/wiki/Type_052C_destroyer',80),

  w('chn2-n002','051B 러하이급 구축함','Type 051B Luhai-class DDG','NAVAL','CHINA','OPERATIONAL','MED',
    '중국 과도기 구축함. 냉각공기수직발사 HHQ-7 탑재. 1척 운용. 052C 전 단계.',
    {displacement:'6,100톤',armament:'HHQ-7·YJ-12·100mm',firstDeployed:'1999년',quantity:'1척'},
    ['051B','러하이','구축함','냉전기','중국해군'],['중국해군'],
    undefined,undefined,75),

  w('chn2-n003','053H3 장위이급 호위함','Type 053H3 Jiangwei II-class FF','NAVAL','CHINA','RETIRED','LOW',
    '중국 구형 호위함. HHQ-7 단거리 SAM. 현역 감소 중. 수출형 파키스탄·태국 운용.',
    {displacement:'2,250톤',armament:'HHQ-7·YJ-82·100mm',crew:'170명',firstDeployed:'1998년',quantity:'4척(감소)'},
    ['053H3','장위이급','구형호위함','수출','파키스탄'],['중국해군'],
    undefined,undefined,75),

  w('chn2-n004','071형 옥저급 수송함','Type 071 Yuzhao-class LPD','NAVAL','CHINA','OPERATIONAL','HIGH',
    '중국 강습상륙수송함. 2만 톤. LCAC·헬기·719기수. 중동·아프리카 파병 군사력 투사.',
    {displacement:'20,000톤',length:'210m',armament:'76mm·30mm·HHQ-10',crew:'120명+800상륙군',firstDeployed:'2007년',quantity:'8척+'},
    ['071형','옥저','LPD','상륙수송','파병'],['중국해군'],
    undefined,'https://en.wikipedia.org/wiki/Yuzhao-class_amphibious_transport_dock',82),

  // ── 북한 추가 ─────────────────────────────────────────────────────────────
  w('dprk2-m001','화성-11 카','Hwasong-11Ka (KN-23 Variant)','SRBM','DPRK','OPERATIONAL','HIGH',
    'KN-23 강화형. 탄두 중량 증가·사거리 단축. 러시아 수출 공식 확인된 계열 미사일.',
    {range:'600km(최대)',payload:'탄두 700kg',propulsion:'고체추진',firstDeployed:'2022년'},
    ['화성-11카','KN-23변형','러시아수출','우크라이나','SRBM'],['DPRK군'],
    undefined,undefined,82),

  w('dprk2-m002','새벽별-5 SLBM','Pukguksong-5 SLBM','SLBM','DPRK','TESTING','CRITICAL',
    '북극성-5형 신형 SLBM. 2021년 공개. 사거리 3,000km+ 추정. 개선된 고체연료 및 탄두.',
    {range:'3,000km+(추정)',propulsion:'고체추진',warhead:'핵탄두(추정)',firstDeployed:'시험 중'},
    ['북극성-5','SLBM','신형','핵','잠수함'],['DPRK'],
    undefined,undefined,55),

  w('dprk2-m003','국가핵억제력 전술핵운용부대','DPRK Tactical Nuclear Unit','NUCLEAR','DPRK','OPERATIONAL','CRITICAL',
    '2022년 법제화된 전술핵 선제사용 독트린. KN-23·KN-24·600mm 방사포 탑재 핵탄두 통합 지휘.',
    {quantity:'전술핵 소형화 완성(공식선언)',firstDeployed:'2022년(법제화)'},
    ['전술핵','독트린','법제화','선제사용','KN-23'],['DPRK최고사령부'],
    undefined,undefined,80),

  w('dprk2-g001','선군-915 전차','Songun-915 MBT','GROUND','DPRK','OPERATIONAL','HIGH',
    '북한 현재 최신 추정 주력전차. 폭발반응장갑·열영상·레이저거리계 탑재. T-72 기반 추정.',
    {weight:'44톤(추정)',armament:'125mm 활강포(추정)',crew:'4명',firstDeployed:'2010년대'},
    ['선군-915','북한전차','현대화','폭발반응장갑','최신'],['북한육군'],
    undefined,undefined,45),

  w('dprk2-uav001','전략드론 새별-4형','Sabyol-4 Long-Range UAV','UAV','DPRK','OPERATIONAL','HIGH',
    '북한 공개 장거리 전략드론. 2023년 공개. B-2 유사 전익 설계. 핵·재래식 탑재 가능 주장.',
    {range:'수천km(주장)',payload:'핵탄두 탑재 가능(주장)',firstDeployed:'2023년(공개)'},
    ['새별-4','북한드론','전략UAV','전익기','핵탑재주장'],['DPRK'],
    undefined,undefined,40),

  // ── 인도 추가 ─────────────────────────────────────────────────────────────
  w('ind2-n001','INS 비크란트 항모','INS Vikrant IAC-1 Aircraft Carrier','NAVAL','INDIA','OPERATIONAL','LOW',
    '인도 최초 자국 건조 항공모함. 4만 5천 톤. MiG-29K·LCA 해군형·MH-60 탑재. 2022년 취역.',
    {displacement:'45,000톤',length:'262.5m',crew:'1,600명+비행단',armament:'바락-1·AK-630',propulsion:'GE LM2500+COGAG',firstDeployed:'2022년',manufacturer:'CSL(코친조선)'},
    ['INS비크란트','인도항모','자국건조','MiG-29K','2022취역'],['인도해군'],
    undefined,'https://en.wikipedia.org/wiki/INS_Vikrant_(2022)',95),

  w('ind2-m001','아그니-IV IRBM','Agni-IV IRBM','IRBM','INDIA','OPERATIONAL','HIGH',
    '인도 중거리 탄도미사일. 사거리 4,000km. 중국 심층 타격 가능. 고체추진.',
    {range:'4,000km',payload:'단탄두',propulsion:'2단 고체추진',firstDeployed:'2014년'},
    ['아그니-IV','인도IRBM','중국타격','고체추진'],['SFC'],
    undefined,'https://en.wikipedia.org/wiki/Agni-IV',82),

  // ── 이스라엘 추가 ──────────────────────────────────────────────────────────
  w('isr2-a001','헤츠(애로우)-2','Arrow-2 Endo-Atmospheric SAM','SAM','ISRAEL','OPERATIONAL','LOW',
    '이란 MRBM 요격 설계. 대기권 내 요격. 독일 Arrow-3 도입 전 주력. 2024년 이란 미사일 공격 요격.',
    {range:'90km',altitude:'50km(대기권 내)',guidance:'능동레이더',firstDeployed:'2000년',manufacturer:'IAI·보잉'},
    ['애로우-2','이스라엘','이란요격','2024격추','BMD'],['IDF'],
    undefined,'https://en.wikipedia.org/wiki/Arrow_(Israeli_air_defense)',97),

  w('isr2-m001','스파이크 NLOS','Spike-NLOS Long-Range ATGM','GROUND','ISRAEL','OPERATIONAL','LOW',
    '시선 밖(NLOS) 대전차유도미사일. 사거리 32km. 헬기·차량·선박 발사. 한국 현궁 대체 후보.',
    {range:'32km',payload:'탠덤 HEAT',guidance:'IIR+TV+데이터링크',firstDeployed:'1997년(NLOS 2012)',manufacturer:'라파엘'},
    ['스파이크NLOS','ATGM','32km','라파엘','한국도입'],['IDF','라파엘'],
    undefined,'https://en.wikipedia.org/wiki/Spike_(missile)',92),

  // ── 터키 추가 ─────────────────────────────────────────────────────────────
  w('tur2-a001','KAAN 5세대 전투기','TAI KAAN 5th Gen Fighter','AIRCRAFT','TURKEY','TESTING','LOW',
    '터키 첫 독자 5세대 전투기. 2023년 첫 비행. F-35 대체 목표. GE F110 엔진·국산 AESA 개발 중.',
    {speed:'마하 1.8+(목표)',crew:'1명',firstDeployed:'2028년+(예정)',manufacturer:'TAI·TEI'},
    ['KAAN','터키','5세대','국산전투기','F-35대체'],['터키공군','TAI'],
    undefined,'https://en.wikipedia.org/wiki/TAI_TF-X',75),

  w('tur2-m001','ROKETSAN HİSAR-A+','HISAR-A+ Short-Range SAM','SAM','TURKEY','OPERATIONAL','LOW',
    '터키 국산 단거리 지대공미사일. 사거리 15km. 자국 방산 자립의 성과. UAE 수출.',
    {range:'15km',altitude:'10km',guidance:'능동레이더',firstDeployed:'2018년',manufacturer:'Roketsan·Aselsan'},
    ['HİSAR-A+','터키SAM','국산방공','단거리','UAE수출'],['터키군','Roketsan'],
    undefined,undefined,82),

  // ── 대만 추가 ─────────────────────────────────────────────────────────────
  w('twn2-a001','F-16A/B 블록 20 (대만)','F-16A/B Block 20 (ROCAF)','AIRCRAFT','TAIWAN','OPERATIONAL','MED',
    '대만 공군 구형 F-16 145대. 블록 20은 구형 AN/APG-66레이더. 현재 F-16V(바이퍼)로 업그레이드 중.',
    {speed:'마하 2.0',range:'3,200km',crew:'1~2명',armament:'AIM-9P·AIM-7M·AGM-65',firstDeployed:'1997년(대만)',quantity:'141기(V업그레이드)'},
    ['F-16A/B','대만','블록20','구형','V업그레이드'],['ROCAF'],
    undefined,undefined,88),

  w('twn2-n001','킬딩급 기요나 미사일쾌속정','Kuang Hua VI Missile Corvette','NAVAL','TAIWAN','OPERATIONAL','MED',
    '대만 소형 미사일 쾌속정. 슝펑-III 초음속 대함미사일 4발. 대중국 비대칭 해전 전력.',
    {displacement:'171톤',armament:'슝펑-III×4·76mm',speed:'38노트',firstDeployed:'2010년',quantity:'12척'},
    ['킬딩급','미사일쾌속정','대만','슝펑-III','비대칭'],['대만해군'],
    undefined,undefined,78),

  // ── 호주 추가 ─────────────────────────────────────────────────────────────
  w('aus2-n001','호바트급 이지스 구축함','Hobart-class Aegis DDG (Australia)','NAVAL','AUSTRALIA','OPERATIONAL','LOW',
    '호주 이지스 구축함. AN/SPY-1D(V)·SM-2·ESSM·SM-6 탑재. 3척 운용. 인도·태평양 억제력.',
    {displacement:'7,000톤',length:'147.2m',crew:'186명',armament:'48셀 MK41 VLS(SM-2/ESSM/SM-6)·5인치 Mk45',propulsion:'COGAG',firstDeployed:'2017년',quantity:'3척'},
    ['호바트급','호주이지스','SM-2','SM-6','인도태평양'],['호주해군'],
    undefined,'https://en.wikipedia.org/wiki/Hobart-class_destroyer',92),

  w('aus2-a001','EA-18G 그라울러 (호주)','EA-18G Growler (RAAF)','AIRCRAFT','AUSTRALIA','OPERATIONAL','LOW',
    '호주 공군 미국 외 유일 EA-18G 전자전기 운용국. 12기. 아태지역 전자전 억제력.',
    {speed:'마하 1.8',range:'2,346km',crew:'2명',armament:'AGM-88·ALQ-99·AIM-120',firstDeployed:'2017년(호주)',quantity:'12기'},
    ['EA-18G','그라울러','호주','전자전','RAAF'],['RAAF'],
    undefined,'https://en.wikipedia.org/wiki/Boeing_EA-18G_Growler',95),

  // ── NATO 추가 ────────────────────────────────────────────────────────────
  w('nato2-m001','ASTER-30 블록 1NT','Aster-30 Block 1 NT SAM','SAM','FRANCE','OPERATIONAL','LOW',
    '프랑스·이탈리아 공동 장거리 함대공·ASBM 요격미사일. 사거리 120km. 호바트·FREMM 탑재.',
    {range:'120km',altitude:'25km',speed:'마하 4.5',guidance:'능동레이더',firstDeployed:'2018년(블록1NT)',manufacturer:'MBDA'},
    ['ASTER-30','블록1NT','함대공','ASBM요격','MBDA'],['프랑스해군','이탈리아'],
    undefined,'https://en.wikipedia.org/wiki/Aster_(missile_family)',92),

  w('nato2-m002','IRIS-T SLS 단거리','IRIS-T SLS Short-Range SAM','SAM','GERMANY','OPERATIONAL','LOW',
    'IRIS-T 단거리 지상발사 버전. 사거리 12km. 드론·헬기·항공기 요격. 우크라이나 제공.',
    {range:'12km',altitude:'8km',guidance:'적외선 영상시커',firstDeployed:'2022년(우크라이나)',manufacturer:'딜'},
    ['IRIS-T SLS','단거리SAM','우크라이나','드론요격','딜'],['독일군','우크라이나'],
    undefined,'https://en.wikipedia.org/wiki/IRIS-T',92),

  w('nato2-m003','PzH 2000 자주포','PzH 2000 155mm SPH','ARTILLERY','GERMANY','OPERATIONAL','LOW',
    '독일 155mm/52구경 자주포. 분당 10발. 사거리 56km(ERBB). 우크라이나 제공·전선 사용.',
    {armament:'155mm 52구경 곡사포',range:'56km(ERFB-BB)',weight:'55.3톤',crew:'3명',firstDeployed:'1998년',manufacturer:'KMW'},
    ['PzH2000','독일자주포','155mm','우크라이나','56km'],['독일육군','KMW'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/PzH2000_Bundeswehr.jpg/320px-PzH2000_Bundeswehr.jpg',
    'https://en.wikipedia.org/wiki/PzH_2000',95),

  w('nato2-m004','네덜란드 PRTL 자주대공포','Flakpanzer Gepard SPAAG','GROUND','GERMANY','OPERATIONAL','LOW',
    '35mm 쌍열 자주대공포. 독일 퇴역 후 우크라이나 제공. 샤헤드 드론 요격 성과.',
    {armament:'35mm 연장기관포×2',range:'5.5km',crew:'3명',speed:'65km/h',firstDeployed:'1976년(독일)'},
    ['게파르트','자주대공포','우크라이나','샤헤드요격','35mm'],['우크라이나군'],
    undefined,'https://en.wikipedia.org/wiki/Flakpanzer_Gepard',90),

]
