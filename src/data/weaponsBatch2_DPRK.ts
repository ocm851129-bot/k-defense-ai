import type { WeaponSystem } from './weapons'
const w = (id:string,name:string,nameEng:string,cat:WeaponSystem['category'],origin:WeaponSystem['origin'],status:WeaponSystem['status'],threat:WeaponSystem['threatRating'],desc:string,specs:WeaponSystem['specs'],tags:string[],sources:string[],img?:string,wiki?:string,conf=75): WeaponSystem=>({id,name,nameEng,category:cat,origin,status,threatRating:threat,description:desc,detail:`## ${nameEng}\n\n${desc}\n\n### 주요 제원\n${Object.entries(specs).filter(([,v])=>v).map(([k,v])=>`- ${k}: ${v}`).join('\n')}`,specs,confidence:conf,lastUpdated:'2026-07-01',relatedIntelIds:[],tags,sources,imageUrl:img,wikiUrl:wiki})

export const WEAPONS_BATCH2_DPRK: WeaponSystem[] = [

  // ── ICBM ─────────────────────────────────────────────────────────────────
  w('dprk-i001','화성-14형 ICBM','Hwasong-14 ICBM','ICBM','DPRK','OPERATIONAL','CRITICAL',
    '북한 최초 ICBM급 탄도미사일. 2017년 2차례 시험발사 성공. 사거리 10,000km+ 추정. 미 본토 타격 가능.',
    {range:'10,000km+(추정)',payload:'핵탄두 1개',propulsion:'액체연료 2단',firstDeployed:'2017년',manufacturer:'2기지·국방과학원'},
    ['화성14','ICBM','미본토타격','핵미사일'],['38North','CSIS','IISS'],
    undefined,'https://en.wikipedia.org/wiki/Hwasong-14',70),

  w('dprk-i002','화성-15형 ICBM','Hwasong-15 ICBM','ICBM','DPRK','OPERATIONAL','CRITICAL',
    '화성-14 개량형. 1단 대형 엔진 클러스터링. 사거리 13,000km+. 미 동부까지 타격 가능. 2017년 11월 시험.',
    {range:'13,000km+(추정)',payload:'핵탄두(MaRV 가능)',propulsion:'백두엔진 2기 클러스터',firstDeployed:'2017년',manufacturer:'국방과학원'},
    ['화성15','ICBM','13000km','핵'],['38North','CSIS'],undefined,'https://en.wikipedia.org/wiki/Hwasong-15',72),

  w('dprk-i003','화성-17형 ICBM','Hwasong-17 ICBM','ICBM','DPRK','OPERATIONAL','CRITICAL',
    '세계 최대 도로기동 ICBM. 11축 TEL 탑재. 사거리 15,000km+ 추정. MIRV 가능 대형 탄두 탑재.',
    {range:'15,000km+(추정)',payload:'MIRV 가능',propulsion:'액체연료 대형엔진',firstDeployed:'2022년',manufacturer:'국방과학원'},
    ['화성17','ICBM','MIRV','세계최대','11축TEL'],['38North','CSIS'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Hwasong-17_ICBM.jpg/320px-Hwasong-17_ICBM.jpg',
    'https://en.wikipedia.org/wiki/Hwasong-17',75),

  w('dprk-i004','화성-18형 고체ICBM','Hwasong-18 Solid-Fuel ICBM','ICBM','DPRK','OPERATIONAL','CRITICAL',
    '북한 최초 고체연료 ICBM. 발사 준비 시간 대폭 단축. 은닉·기습 발사 용이. 2023년 4월 시험발사.',
    {range:'15,000km+(추정)',payload:'핵탄두',propulsion:'고체연료 3단',firstDeployed:'2023년',manufacturer:'국방과학원'},
    ['화성18','고체ICBM','기습발사','2023'],['38North','CSIS','국방부'],undefined,'https://en.wikipedia.org/wiki/Hwasong-18',78),

  w('dprk-i005','화성-19형 ICBM','Hwasong-19 ICBM','ICBM','DPRK','DEVELOPMENT','CRITICAL',
    '화성-18 후속 고체연료 대형 ICBM. 2024년 10월 시험. 더 큰 탄두·사거리 목표.',
    {range:'15,000km+(추정)',propulsion:'고체연료',firstDeployed:'2024년',manufacturer:'국방과학원'},
    ['화성19','ICBM','고체연료','2024'],['38North','CSIS'],undefined,undefined,65),

  // ── IRBM/MRBM ────────────────────────────────────────────────────────────
  w('dprk-ir001','화성-10형 (무수단)','Hwasong-10 (Musudan) IRBM','IRBM','DPRK','OPERATIONAL','CRITICAL',
    '구소련 R-27 기반 중거리 탄도미사일. 사거리 3,000km+. 괌 타격 가능. 다수 시험 실패 기록.',
    {range:'3,500km(추정)',payload:'650kg',propulsion:'액체연료',firstDeployed:'2010년대',manufacturer:'국방과학원'},
    ['화성10','무수단','IRBM','괌타격'],['IISS','38North'],undefined,'https://en.wikipedia.org/wiki/Hwasong-10',65),

  w('dprk-ir002','화성-12형 IRBM','Hwasong-12 IRBM','IRBM','DPRK','OPERATIONAL','CRITICAL',
    '중거리 탄도미사일. 사거리 4,500km+. 괌·일본 타격 사정권. 2017년 3차례 일본 상공 통과 비행.',
    {range:'4,500km',payload:'650kg',propulsion:'액체연료 1단',firstDeployed:'2017년',manufacturer:'국방과학원'},
    ['화성12','IRBM','괌','일본상공'],['38North','CSIS'],undefined,'https://en.wikipedia.org/wiki/Hwasong-12',72),

  w('dprk-ir003','화성-16나형 극초음속','Hwasong-16B Hypersonic MRBM','IRBM','DPRK','DEVELOPMENT','CRITICAL',
    '극초음속 활공탄두(HGV) 탑재 중거리 탄도미사일. 2024년 시험. 요격 어려운 기동탄두.',
    {range:'4,000km+(추정)',payload:'HGV 활공탄두',propulsion:'고체연료',firstDeployed:'2024년',manufacturer:'국방과학원'},
    ['화성16나','극초음속','HGV','요격불가'],['38North','CSIS'],undefined,undefined,60),

  // ── SRBM ─────────────────────────────────────────────────────────────────
  w('dprk-s001','화성-5형 (스커드-B)','Hwasong-5 (Scud-B) SRBM','SRBM','DPRK','OPERATIONAL','HIGH',
    '소련 스커드-B 기반 단거리 탄도미사일. 사거리 300km. 이란·이라크·이집트 등 수출. 한국 전역 타격.',
    {range:'300km',payload:'985kg',propulsion:'액체연료',firstDeployed:'1985년',manufacturer:'국방과학원',quantity:'수백 기'},
    ['화성5','스커드B','300km','수출'],['Jane\'s','IISS'],undefined,'https://en.wikipedia.org/wiki/Hwasong-5',80),

  w('dprk-s002','화성-6형 (스커드-C)','Hwasong-6 (Scud-C) SRBM','SRBM','DPRK','OPERATIONAL','HIGH',
    '화성-5 사거리 연장형. 500km. 탄두 경량화로 사거리 확보. 대량 배치.',
    {range:'500km',payload:'770kg',propulsion:'액체연료',firstDeployed:'1990년대',manufacturer:'국방과학원',quantity:'수백 기'},
    ['화성6','스커드C','500km'],['IISS','Jane\'s'],undefined,'https://en.wikipedia.org/wiki/Hwasong-6',78),

  w('dprk-s003','화성-9형 (스커드-ER)','Hwasong-9 (Scud-ER) SRBM','SRBM','DPRK','OPERATIONAL','HIGH',
    '화성-6 연장형. 사거리 1,000km. 연장 연료통·축소 탄두. 일본 전역 타격 가능.',
    {range:'1,000km',payload:'500kg',propulsion:'액체연료',firstDeployed:'2000년대',manufacturer:'국방과학원'},
    ['화성9','스커드ER','1000km','일본'],['38North','IISS'],undefined,'https://en.wikipedia.org/wiki/Hwasong-9',72),

  w('dprk-s004','KN-23 단거리 탄도미사일','KN-23 SRBM (Iskander-type)','SRBM','DPRK','OPERATIONAL','CRITICAL',
    '러시아 이스칸데르 유사 준탄도미사일. 저고도 비행·기동 탄두. 요격 극히 어려움. 대량 배치.',
    {range:'600km',payload:'500kg',propulsion:'고체연료',firstDeployed:'2019년',manufacturer:'국방과학원'},
    ['KN-23','이스칸데르형','준탄도','기동탄두','요격불가'],['38North','CSIS','국방부'],undefined,'https://en.wikipedia.org/wiki/KN-23',82),

  w('dprk-s005','KN-24 단거리 탄도미사일','KN-24 SRBM (ATACMS-type)','SRBM','DPRK','OPERATIONAL','CRITICAL',
    '미국 ATACMS 유사 단거리 탄도미사일. 2발 TEL 발사. 사거리 400km. 2020~2022년 다수 시험.',
    {range:'400km',payload:'500kg',propulsion:'고체연료',firstDeployed:'2020년',manufacturer:'국방과학원'},
    ['KN-24','ATACMS형','단거리','고체연료'],['38North','CSIS'],undefined,'https://en.wikipedia.org/wiki/KN-24',78),

  w('dprk-s006','KN-25 600mm 초대형방사포','KN-25 600mm Super-Large MLRS','MLRS','DPRK','OPERATIONAL','CRITICAL',
    '600mm 구경 초대형 방사포. 사실상 단거리 탄도미사일급. 한국 전역 타격. 러시아 우크라이나 공급 의혹.',
    {range:'400km',payload:'핵탄두 탑재 가능(추정)',propulsion:'고체연료 로켓',firstDeployed:'2019년',manufacturer:'국방과학원',quantity:'다수'},
    ['KN-25','600mm','초대형방사포','러시아수출의혹'],['38North','CSIS','우크라이나국방부'],undefined,'https://en.wikipedia.org/wiki/KN-25',75),

  w('dprk-s007','화성-11가형 (단거리)','Hwasong-11A SRBM','SRBM','DPRK','OPERATIONAL','HIGH',
    '소형 고체연료 단거리 탄도미사일. 이스칸데르형과 유사. 150~200km 사거리.',
    {range:'200km',propulsion:'고체연료',firstDeployed:'2014년',manufacturer:'국방과학원'},
    ['화성11가','단거리','고체연료'],['38North'],undefined,undefined,65),

  w('dprk-s008','화성-11나형','Hwasong-11B SRBM','SRBM','DPRK','OPERATIONAL','HIGH',
    '화성-11 계열 개량형. 사거리 450km. 정밀도 향상.',
    {range:'450km',propulsion:'고체연료',firstDeployed:'2019년',manufacturer:'국방과학원'},
    ['화성11나','단거리'],['38North','CSIS'],undefined,undefined,65),

  // ── SLBM ─────────────────────────────────────────────────────────────────
  w('dprk-sl001','북극성-1형 SLBM','Pukguksong-1 (KN-11) SLBM','SLBM','DPRK','OPERATIONAL','CRITICAL',
    '고체연료 잠수함발사탄도미사일. 신포급 잠수함 탑재. 2016년 수중발사 시험 성공. 사거리 1,200km.',
    {range:'1,200km',payload:'650kg(핵탄두)',propulsion:'고체연료 2단',firstDeployed:'2016년',manufacturer:'국방과학원'},
    ['북극성1','SLBM','잠수함','고체연료'],['38North','Jane\'s'],undefined,'https://en.wikipedia.org/wiki/Pukguksong-1',72),

  w('dprk-sl002','북극성-2형 지상발사형','Pukguksong-2 (KN-15) MRBM','IRBM','DPRK','OPERATIONAL','CRITICAL',
    '북극성-1 기반 지상발사 콜드런치 중거리미사일. 고체연료. 사거리 2,000km+.',
    {range:'2,000km',payload:'핵탄두',propulsion:'고체연료 2단',firstDeployed:'2017년',manufacturer:'국방과학원'},
    ['북극성2','KN-15','지상발사','고체연료'],['38North'],undefined,'https://en.wikipedia.org/wiki/Pukguksong-2',70),

  w('dprk-sl003','북극성-3형 SLBM','Pukguksong-3 SLBM','SLBM','DPRK','DEVELOPMENT','CRITICAL',
    '북극성-1 성능개량. 사거리 1,900km+. 2019년 수중발사 시험. 신형 신포-C급 잠수함 탑재 예정.',
    {range:'1,900km+(추정)',propulsion:'고체연료',firstDeployed:'개발중',manufacturer:'국방과학원'},
    ['북극성3','SLBM','수중발사'],['38North','CSIS'],undefined,'https://en.wikipedia.org/wiki/Pukguksong-3',65),

  w('dprk-sl004','북극성-4형 SLBM','Pukguksong-4 SLBM','SLBM','DPRK','DEVELOPMENT','CRITICAL',
    '2020년 10월 당창건기념열병식 공개. 북극성-3 개량. 대형화.',
    {range:'2,500km+(추정)',propulsion:'고체연료',firstDeployed:'개발중',manufacturer:'국방과학원'},
    ['북극성4','SLBM'],['38North'],undefined,undefined,55),

  w('dprk-sl005','북극성-5형 SLBM','Pukguksong-5 SLBM','SLBM','DPRK','DEVELOPMENT','CRITICAL',
    '2021년 1월 당대회 열병식 공개. 최대형 SLBM. 다탄두 가능성 주목.',
    {range:'3,000km+(추정)',propulsion:'고체연료',firstDeployed:'개발중',manufacturer:'국방과학원'},
    ['북극성5','SLBM','대형'],['38North'],undefined,undefined,50),

  // ── 순항미사일 ────────────────────────────────────────────────────────────
  w('dprk-c001','화살-1형 전략순항미사일','Hwasal-1 Strategic Cruise Missile','CRUISE','DPRK','OPERATIONAL','HIGH',
    '북한 독자 개발 지상발사 순항미사일. 2022~2023년 다수 시험. 사거리 1,500km. 핵탄두 탑재 주장.',
    {range:'1,500km(주장)',propulsion:'터보팬 또는 터보제트',guidance:'INS+GPS(추정)',firstDeployed:'2022년',manufacturer:'국방과학원'},
    ['화살1','순항미사일','1500km','핵탑재주장'],['38North','국방부'],undefined,undefined,65),

  w('dprk-c002','화살-2형 전략순항미사일','Hwasal-2 Strategic Cruise Missile','CRUISE','DPRK','OPERATIONAL','HIGH',
    '화살-1 개량형. 2023년 시험. 사거리 연장·탄두 개선 주장.',
    {range:'2,000km+(주장)',firstDeployed:'2023년',manufacturer:'국방과학원'},
    ['화살2','순항미사일','개량형'],['38North'],undefined,undefined,58),

  w('dprk-c003','청룡 전략순항미사일','Cheongryong Strategic Cruise Missile','CRUISE','DPRK','OPERATIONAL','HIGH',
    '북한 수중발사(잠수함·수중발사관) 순항미사일. 2023년 시험.',
    {range:'1,500km+(주장)',propulsion:'터보팬',firstDeployed:'2023년',manufacturer:'국방과학원'},
    ['청룡','수중발사','순항미사일','잠수함'],['38North','국방부'],undefined,undefined,60),

  // ── 극초음속 ─────────────────────────────────────────────────────────────
  w('dprk-h001','화성-8형 극초음속','Hwasong-8 Hypersonic Missile','IRBM','DPRK','DEVELOPMENT','CRITICAL',
    '북한 최초 극초음속 활공탄두 탑재 탄도미사일. 2021년 9월 시험. 연료암풀화 기술 적용.',
    {range:'1,500km(추정)',payload:'HGV 탄두',propulsion:'액체연료+HGV',firstDeployed:'개발중',manufacturer:'국방과학원'},
    ['화성8','극초음속','HGV','2021'],['38North','CSIS'],undefined,'https://en.wikipedia.org/wiki/Hwasong-8',60),

  // ── 지대공 방공 ──────────────────────────────────────────────────────────
  w('dprk-sa001','번개-5 지대공미사일','Pongae-5 (KN-06) SAM','SAM','DPRK','OPERATIONAL','HIGH',
    '한국의 S-300 급 장거리 지대공미사일. 중거리 탄도미사일·항공기 요격 주장. 2016년 시험.',
    {range:'150km(추정)',altitude:'25km',firstDeployed:'2016년(추정)',manufacturer:'국방과학원'},
    ['번개5','KN-06','S-300급','북한방공'],['38North','CSIS'],undefined,'https://en.wikipedia.org/wiki/Pongae-5',62),

  w('dprk-sa002','번개-6 지대공미사일','Pongae-6 SAM','SAM','DPRK','DEVELOPMENT','HIGH',
    '번개-5 개량형. 2020년 10월 열병식 공개. S-400급 성능 주장.',
    {range:'200km+(추정)',altitude:'30km',firstDeployed:'개발중',manufacturer:'국방과학원'},
    ['번개6','S-400급','방공'],['38North'],undefined,undefined,50),

  w('dprk-sa003','번개-9 장거리 방공','Pongae-9 Long-Range SAM','SAM','DPRK','DEVELOPMENT','HIGH',
    '2023년 공개 북한 신형 장거리 방공미사일. 세부 제원 불명.',
    {firstDeployed:'개발중',manufacturer:'국방과학원'},
    ['번개9','장거리방공','신형'],['38North'],undefined,undefined,45),

  w('dprk-sa004','KN-02 단거리 SAM','KN-02 (Toksa) Short-Range SAM','SAM','DPRK','OPERATIONAL','MED',
    '소련 SS-21 토치카 기반 단거리 지대지·지대공 겸용. 고체연료. 정밀도 향상.',
    {range:'120km',propulsion:'고체연료',firstDeployed:'2000년대',manufacturer:'국방과학원'},
    ['KN-02','토치카형','단거리','고체'],['Jane\'s','IISS'],undefined,'https://en.wikipedia.org/wiki/KN-02_Toksa',68),

  // ── 전차·기갑 ─────────────────────────────────────────────────────────────
  w('dprk-t001','포풍호 4형 전차','Pokpung-ho IV MBT','GROUND','DPRK','OPERATIONAL','HIGH',
    '북한 최신형 주력전차. 115mm/125mm 혼용 추정. 복합장갑·증가반응장갑. 정밀 수 불명.',
    {weight:'44t(추정)',armament:'125mm 활강포(추정)·12.7mm·7.62mm',crew:'4명',firstDeployed:'2000년대',manufacturer:'용성기계연합기업소'},
    ['포풍호','북한전차','4형','주력전차'],['38North','IISS'],undefined,'https://en.wikipedia.org/wiki/Pokpung-ho',60),

  w('dprk-t002','M-2020 신형 전차','M-2020 Next-Gen MBT','GROUND','DPRK','OPERATIONAL','HIGH',
    '2020년 10월 열병식 공개 신형 대형 전차. 러시아 T-14 아르마타 유사 설계. 반응장갑·자동장전.',
    {weight:'50t+(추정)',armament:'125mm 이상 활강포(추정)',crew:'3명(추정)',firstDeployed:'2020년(추정)',manufacturer:'불명'},
    ['M-2020','신형전차','북한','열병식'],['38North','CSIS'],undefined,undefined,45),

  w('dprk-t003','천마호 (215형) 전차','Chonma-Ho (Type 215) MBT','GROUND','DPRK','OPERATIONAL','HIGH',
    '소련 T-62 기반 개량형. 다수 파생형 운용. 한국군 대비 열세이나 수량 우세.',
    {weight:'38t',armament:'115mm U-5TS 활강포·12.7mm·7.62mm',crew:'4명',firstDeployed:'1980년대',manufacturer:'용성기계연합',quantity:'800여 대'},
    ['천마호','T-62기반','북한전차','215형'],['Jane\'s','IISS'],undefined,undefined,72),

  w('dprk-t004','M1978 주체포 (170mm)','M1978 Koksan 170mm SPG','ARTILLERY','DPRK','OPERATIONAL','HIGH',
    '170mm 세계 최대 구경 자주포. 사거리 60km(로켓보조). 서울 전역 포격 가능. 비무장지대 배치.',
    {weight:'46t',armament:'170mm 주체포',crew:'6명',range:'60km(로켓보조탄)',firstDeployed:'1978년',manufacturer:'북한 군수'},
    ['주체포','M1978','170mm','코크산','장사정포'],['Jane\'s','IISS'],undefined,'https://en.wikipedia.org/wiki/M1978_Koksan',80),

  w('dprk-t005','M1989 240mm 방사포','M1989 240mm MLRS','MLRS','DPRK','OPERATIONAL','HIGH',
    '240mm 12연장 방사포. 사거리 60km. 서울 등 수도권 타격 가능. 갱도 은폐 운용.',
    {weight:'43t',armament:'240mm 로켓 12발',range:'60km',firstDeployed:'1989년',manufacturer:'북한 군수',quantity:'500+ 문'},
    ['M1989','240mm','방사포','수도권타격'],['Jane\'s','38North'],undefined,undefined,75),

  w('dprk-t006','KN-09 300mm 방사포','KN-09 300mm MLRS','MLRS','DPRK','OPERATIONAL','HIGH',
    '300mm 방사포. 사거리 200km. GPS 유도탄 가능. 한국 전역 타격 사정권. 2014년 등장.',
    {weight:'45t',armament:'300mm 로켓 8발',range:'200km',guidance:'GPS 유도(일부)',firstDeployed:'2014년',manufacturer:'국방과학원'},
    ['KN-09','300mm','방사포','200km'],['38North','CSIS'],undefined,'https://en.wikipedia.org/wiki/KN-09',72),

  w('dprk-t007','VTT-323 병력수송 장갑차','VTT-323 APC','GROUND','DPRK','OPERATIONAL','MED',
    '중국 Type 63 기반 병력수송차. 다수 파생형. 수상 도하 능력. 북한 기계화부대 핵심.',
    {weight:'14.3t',armament:'14.5mm KPV 2연장·7.62mm',crew:'3+10명',speed:'40km/h',firstDeployed:'1970년대',manufacturer:'북한 군수',quantity:'2,000여 대'},
    ['VTT-323','APC','중국기반','기계화'],['Jane\'s','IISS'],undefined,undefined,75),

  w('dprk-t008','M2010 자주포','M2010 152mm SPH','ARTILLERY','DPRK','OPERATIONAL','MED',
    '152mm 자주포. 구소련 2S3 아카치야 유사 개량형.',
    {weight:'28t(추정)',armament:'152mm 곡사포',crew:'4명',range:'24km',firstDeployed:'2010년대',manufacturer:'북한 군수'},
    ['M2010','152mm','자주포'],['38North'],undefined,undefined,58),

  w('dprk-t009','보병전투차 M2009','M2009 IFV','GROUND','DPRK','OPERATIONAL','MED',
    '북한 독자 개발 보병전투차. 30mm 기관포 추정. 2009년 열병식 첫 공개.',
    {weight:'17t(추정)',armament:'30mm 기관포(추정)',crew:'3+7명',firstDeployed:'2009년',manufacturer:'북한 군수'},
    ['M2009','IFV','보병전투차'],['38North'],undefined,undefined,55),

  w('dprk-t010','AT-1 새별 대전차미사일','AT-1 Saebyol ATGM','GROUND','DPRK','OPERATIONAL','MED',
    '9M14 말류트카 기반 북한 대전차미사일. 2세대 수동유도. 차량·보병 발사형.',
    {range:'3km',guidance:'SACLOS',firstDeployed:'1970년대',manufacturer:'북한 군수'},
    ['새별','대전차미사일','AT-1','SACLOS'],['Jane\'s'],undefined,undefined,72),

  // ── 해군 ─────────────────────────────────────────────────────────────────
  w('dprk-n001','신포급 잠수함 (SSBN)','Sinpo-class SSBN','SUBMARINE','DPRK','OPERATIONAL','CRITICAL',
    'SLBM 발사 가능 핵잠수함급. 북극성-1/3형 탑재. 2021년 신형 잠수함 추가 건조 확인.',
    {displacement:'2,000t(추정)',armament:'북극성-1 SLBM 1발·어뢰관',crew:'불명',speed:'불명',firstDeployed:'2014년(시험)'},
    ['신포급','SSBN','SLBM','핵잠수함'],['38North','CSIS'],undefined,'https://en.wikipedia.org/wiki/Sinpo-class_submarine',62),

  w('dprk-n002','로미오급 잠수함','Romeo-class Submarine','SUBMARINE','DPRK','OPERATIONAL','HIGH',
    '소련 로미오급 재래식 잠수함 20척+ 운용. 노후화됐으나 어뢰·기뢰 위협. 일부 SLBM 개조 시도.',
    {displacement:'1,830t',armament:'533mm 어뢰관 8문·기뢰',crew:'54명',speed:'16노트',firstDeployed:'1970년대',manufacturer:'소련→북한 면허',quantity:'20척+'},
    ['로미오급','잠수함','북한해군','어뢰'],['Jane\'s','IISS'],undefined,'https://en.wikipedia.org/wiki/Romeo-class_submarine',75),

  w('dprk-n003','상어급 잠수함','Sang-O class Submarine','SUBMARINE','DPRK','OPERATIONAL','HIGH',
    '연안잠수함. 40척 이상 운용. 특수전 침투·기뢰부설. 1996년 강릉침투 사건 사용.',
    {displacement:'370t',armament:'533mm 어뢰관 2문·기뢰·특수전대원',crew:'불명',firstDeployed:'1990년대',quantity:'40척+'},
    ['상어급','연안잠수함','특수전','기뢰'],['38North','Jane\'s'],undefined,'https://en.wikipedia.org/wiki/Sang-O-class_submarine',72),

  w('dprk-n004','유고급 반잠수정','Yugo-class Midget Submarine','SUBMARINE','DPRK','OPERATIONAL','MED',
    '초소형 잠수정. 30척+. 특수전 침투·기뢰. 2010년 천안함 폭침 사용 추정.',
    {displacement:'110t',armament:'어뢰 2발·기뢰',crew:'6~8명',firstDeployed:'1970년대',quantity:'30척+'},
    ['유고급','반잠수정','특수전','천안함'],['38North','합참'],undefined,'https://en.wikipedia.org/wiki/Yugo-class_submarine',75),

  w('dprk-n005','남포급 프리깃','Nampo-class Frigate','NAVAL','DPRK','OPERATIONAL','MED',
    '북한 최대 수상전투함. 100mm 함포·C-801 대함미사일 탑재. 동해·서해 배치.',
    {displacement:'1,650t',armament:'100mm 함포·C-801 대함·어뢰관',crew:'180명',speed:'25노트',firstDeployed:'1980년대',quantity:'2척'},
    ['남포급','프리깃','북한해군','C-801'],['Jane\'s','IISS'],undefined,undefined,70),

  w('dprk-n006','나진급 프리깃','Najin-class Frigate','NAVAL','DPRK','OPERATIONAL','MED',
    '북한 국산 설계 프리깃. 2척 운용. 노후화. 100mm 2연장 함포·어뢰.',
    {displacement:'1,500t',armament:'100mm 2연장·25mm·어뢰관',crew:'200명',speed:'25노트',firstDeployed:'1973년',quantity:'2척'},
    ['나진급','프리깃','북한해군'],['Jane\'s','IISS'],undefined,'https://en.wikipedia.org/wiki/Najin-class_frigate',72),

  w('dprk-n007','소호급 초계함','Soho-class Corvette','NAVAL','DPRK','OPERATIONAL','MED',
    '소형 초계함. 북한 소형 함정 주력. 대함미사일·100mm 함포. 서해 NLL 대치.',
    {displacement:'680t',armament:'100mm 함포·SS-N-2 스틱스·어뢰관',crew:'80명',speed:'30노트',quantity:'4척'},
    ['소호급','초계함','북한해군','스틱스'],['Jane\'s'],undefined,undefined,70),

  w('dprk-n008','화성급 고속정','Hwasong-class Fast Attack Craft','NAVAL','DPRK','OPERATIONAL','MED',
    '미사일 고속정. 구소련 오사-I급 기반. C-201/801 대함미사일 탑재. 기습공격 전술.',
    {displacement:'235t',armament:'C-201/C-801 대함미사일 4발',crew:'30명',speed:'40노트',quantity:'10척+'},
    ['화성급','미사일고속정','북한해군'],['Jane\'s','IISS'],undefined,undefined,68),

  w('dprk-n009','반잠수식 특수전 선박','Semi-Submersible Infiltration Vessel','NAVAL','DPRK','OPERATIONAL','HIGH',
    '해수면 근접 저피탐 침투 선박. 특수전 요원 해상 침투용. 레이더 탐지 어려움.',
    {displacement:'불명',crew:'불명',speed:'불명(추정 30노트+)',firstDeployed:'1990년대'},
    ['반잠수정','특수전','침투','저피탐'],['합참','38North'],undefined,undefined,65),

  // ── 공군 ─────────────────────────────────────────────────────────────────
  w('dprk-af001','MiG-29 전투기','MiG-29 Fulcrum (KPAF)','AIRCRAFT','DPRK','OPERATIONAL','HIGH',
    '북한 최강 전투기. 40기 운용. 러시아제 4세대. R-73·R-27 공대공미사일 탑재. 주력 제공전투기.',
    {speed:'마하 2.25',range:'2,100km',ceiling:'18,000m',crew:'1명',armament:'R-73·R-27·30mm GSh-30-1',firstDeployed:'1988년',manufacturer:'미코얀',quantity:'40기'},
    ['MiG-29','북한공군','4세대','제공전투기'],['IISS','38North'],'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/VVS_100th_IMG_0691_%287727464290%29_%28cropped%29.jpg/330px-VVS_100th_IMG_0691_%287727464290%29_%28cropped%29.jpg','https://en.wikipedia.org/wiki/Mikoyan_MiG-29',78),

  w('dprk-af002','MiG-23 전투기','MiG-23 Flogger (KPAF)','AIRCRAFT','DPRK','OPERATIONAL','MED',
    '가변익 전투기. 56기 운용. 노후화. R-23 공대공·Kh-23 공대지. 수리부품 부족.',
    {speed:'마하 2.3',range:'1,900km',crew:'1명',armament:'R-23·R-60·Kh-23·23mm GSh-23L',firstDeployed:'1984년',manufacturer:'미코얀',quantity:'56기'},
    ['MiG-23','가변익','북한공군','노후'],['IISS','Jane\'s'],undefined,undefined,72),

  w('dprk-af003','MiG-21bis 전투기','MiG-21bis Fishbed-N (KPAF)','AIRCRAFT','DPRK','OPERATIONAL','LOW',
    '구형 초음속 전투기. 150기 운용. 극도로 노후화. 수리부품 부족으로 가동률 낮음.',
    {speed:'마하 2.1',range:'1,300km',crew:'1명',armament:'R-3S·R-60·K-13·23mm GSh-23L',firstDeployed:'1970년대',quantity:'150기'},
    ['MiG-21','북한공군','노후','저가동률'],['IISS','Jane\'s'],undefined,undefined,70),

  w('dprk-af004','Su-25 공격기','Su-25 Frogfoot (KPAF)','AIRCRAFT','DPRK','OPERATIONAL','HIGH',
    '지상군 근접지원 공격기. 34기 운용. Kh-25·Kh-29·S-24 로켓. 대지공격 주력.',
    {speed:'975km/h',range:'1,850km',crew:'1명',armament:'Kh-25·Kh-29·30mm GSh-30-2·FAB-500',firstDeployed:'1987년',quantity:'34기'},
    ['Su-25','공격기','근접지원','북한공군'],['IISS','38North'],undefined,undefined,75),

  w('dprk-af005','H-5 폭격기 (IL-28형)','H-5 Beagle (KPAF)','AIRCRAFT','DPRK','OPERATIONAL','MED',
    '중국 H-5(Il-28 복제). 제트 폭격기. 80기 운용. 노후화. 화학탄·핵폭탄 투하 플랫폼.',
    {speed:'900km/h',range:'2,400km',crew:'3명',armament:'FAB-250·핵폭탄(추정)·23mm 2문',firstDeployed:'1970년대',quantity:'80기'},
    ['H-5','IL-28','폭격기','핵투하','북한공군'],['Jane\'s','IISS'],undefined,undefined,68),

  w('dprk-af006','An-2 콜트 특수전기','An-2 Colt (Special Operations)','AIRCRAFT','DPRK','OPERATIONAL','HIGH',
    '소련제 복엽기. 저공 레이더회피 침투. 특수전 요원·화학무기 살포 임무. 300기+ 보유.',
    {speed:'258km/h',range:'845km',crew:'2+12명(특수전)',armament:'없음(화학탄 옵션)',firstDeployed:'1960년대',quantity:'300기+'},
    ['An-2','콜트','특수전','저공침투','레이더회피'],['Jane\'s','IISS'],undefined,'https://en.wikipedia.org/wiki/Antonov_An-2',80),

  w('dprk-af007','MiG-17 전투기','MiG-17 Fresco (KPAF)','AIRCRAFT','DPRK','OPERATIONAL','LOW',
    '구형 아음속 전투기. 아직 100기+ 유지. 극도로 노후. 실제 전투 효용 매우 낮음.',
    {speed:'마하 0.94',range:'1,470km',crew:'1명',armament:'37mm·23mm 기관포',firstDeployed:'1960년대',quantity:'100기+'},
    ['MiG-17','노후','북한공군','아음속'],['IISS'],undefined,undefined,60),

  // ── 소화기 ───────────────────────────────────────────────────────────────
  w('dprk-sa001','58식 소총 (AK-47 복제)','Type 58 Assault Rifle','RIFLE','DPRK','OPERATIONAL','MED',
    '소련 AK-47 복제 북한 표준소총. 7.62mm×39mm. 북한군 보병 기본화기.',
    {caliber:'7.62×39mm',weight:'4.3kg',fireRate:'600rpm',capacity:'30발',firstDeployed:'1958년',manufacturer:'북한 군수'},
    ['58식','AK-47','북한소총','7.62mm'],['Jane\'s','IISS'],'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/AK-47_type_II_Part_DM-ST-89-01131.jpg/320px-AK-47_type_II_Part_DM-ST-89-01131.jpg','https://en.wikipedia.org/wiki/AK-47',82),

  w('dprk-sa002','68식 소총 (AKM 복제)','Type 68 Assault Rifle','RIFLE','DPRK','OPERATIONAL','MED',
    '소련 AKM 복제. 스탬핑 방식. 7.62mm. 58식 후속.',
    {caliber:'7.62×39mm',weight:'3.6kg',fireRate:'600rpm',capacity:'30발',firstDeployed:'1968년',manufacturer:'북한 군수'},
    ['68식','AKM','북한소총'],['Jane\'s','IISS'],'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/AK-47_type_II_Part_DM-ST-89-01131.jpg/320px-AK-47_type_II_Part_DM-ST-89-01131.jpg','https://en.wikipedia.org/wiki/AKM',80),

  w('dprk-sa003','88식 소총','Type 88 Assault Rifle','RIFLE','DPRK','OPERATIONAL','MED',
    '북한 독자 개발 5.45mm 돌격소총. AK-74 유사 설계. 현재 북한군 주력 개인화기.',
    {caliber:'5.45×39mm',weight:'3.4kg',fireRate:'650rpm',capacity:'30발',firstDeployed:'1988년',manufacturer:'북한 군수'},
    ['88식','5.45mm','북한표준소총','AK74형'],['Jane\'s','38North'],undefined,'https://en.wikipedia.org/wiki/Baedu-san_assault_rifle',78),

  w('dprk-sa004','백두산 권총','Baekdu-san Pistol','PISTOL','DPRK','OPERATIONAL','LOW',
    'TT-33 토카레프 기반 북한 표준 군용권총. 7.62mm×25mm. 장교 지급.',
    {caliber:'7.62×25mm Tokarev',weight:'850g',capacity:'8발',firstDeployed:'1950년대',manufacturer:'북한 군수'},
    ['백두산','권총','토카레프','북한장교'],['Jane\'s'],undefined,undefined,78),

  w('dprk-sa005','천마호 권총','Chonma Pistol','PISTOL','DPRK','OPERATIONAL','LOW',
    '북한 독자 설계 9mm 권총. 장교·보안원 지급. 글록 유사 설계.',
    {caliber:'9×19mm',weight:'700g',capacity:'15발',firstDeployed:'2000년대',manufacturer:'북한 군수'},
    ['천마','9mm','권총','북한'],['38North'],undefined,undefined,60),

  w('dprk-sa006','RPG-7 대전차 로켓','RPG-7 (DPRK copy)','LAUNCHER','DPRK','OPERATIONAL','HIGH',
    '소련 RPG-7 복제. 북한 전보병 분대 기본 대전차 무기. 수만 정 보유.',
    {caliber:'40mm(로켓),85mm(탄두)',weight:'7kg',range:'300m(유효)',firstDeployed:'1960년대',manufacturer:'북한 군수',quantity:'수만 정'},
    ['RPG-7','대전차로켓','보병','북한'],['Jane\'s','IISS'],undefined,undefined,82),

  w('dprk-sa007','62식 경기관총','Type 62 Light Machine Gun','MG','DPRK','OPERATIONAL','MED',
    '소련 RP-46 기반 7.62mm 경기관총. 분대 화력지원.',
    {caliber:'7.62×54mmR',weight:'8.9kg',fireRate:'650rpm',capacity:'250발 탄통',firstDeployed:'1960년대',manufacturer:'북한 군수'},
    ['62식','경기관총','7.62mm','북한'],['Jane\'s'],undefined,undefined,75),

  w('dprk-sa008','북한형 F-7 저격소총','Type 85 Sniper Rifle','SNIPER','DPRK','OPERATIONAL','MED',
    '소련 SVD 드라구노프 복제 저격소총. 7.62mm. 저격수 표준 화기.',
    {caliber:'7.62×54mmR',weight:'4.3kg',range:'800m(유효)',capacity:'10발',firstDeployed:'1980년대',manufacturer:'북한 군수'},
    ['드라구노프','SVD','저격소총','북한'],['Jane\'s'],undefined,undefined,75),

  w('dprk-sa009','화염방사기 북한형','M1978 Flame Thrower','LAUNCHER','DPRK','OPERATIONAL','LOW',
    '소련 LPO-50 기반 보병 화염방사기. 특수지형 전투용.',
    {range:'65m',firstDeployed:'1970년대',manufacturer:'북한 군수'},
    ['화염방사기','보병','특수전'],['Jane\'s'],undefined,undefined,65),

  // ── 사이버·비대칭 ─────────────────────────────────────────────────────────
  w('dprk-cyber001','라자루스 그룹 사이버 무기','Lazarus Group Cyber Weapons','CYBER','DPRK','OPERATIONAL','CRITICAL',
    '북한 정찰총국 산하 사이버전 부대. WannaCry·소니픽처스해킹·방산사이버침투·가상화폐 탈취. 세계 최고 수준.',
    {firstDeployed:'2010년대',manufacturer:'정찰총국 121국'},
    ['라자루스','사이버무기','해킹','가상화폐탈취','WannaCry'],['미FBI','사이버사령부','국정원'],undefined,'https://en.wikipedia.org/wiki/Lazarus_Group',85),

  w('dprk-cyber002','킴수키 (APT43) 해킹그룹','Kimsuky (APT43) Cyber Espionage','CYBER','DPRK','OPERATIONAL','CRITICAL',
    '북한 정찰총국 산하 사이버첩보 그룹. 한국 정부·방산·연구기관 집중 해킹. 스피어피싱 주특기.',
    {firstDeployed:'2012년(활동)',manufacturer:'정찰총국'},
    ['킴수키','APT43','사이버첩보','한국표적','스피어피싱'],['국정원','FBI','CISA'],undefined,'https://en.wikipedia.org/wiki/Kimsuky',82),

  w('dprk-cyber003','EMP 전자기폭탄','EMP Electromagnetic Pulse Device','CYBER','DPRK','DEVELOPMENT','CRITICAL',
    '핵폭발·비핵 EMP 장치 개발 추진. 한국 전자장비·통신망 마비 목적. 세부 사양 불명.',
    {firstDeployed:'개발중(추정)',manufacturer:'국방과학원'},
    ['EMP','전자기폭탄','전자전','한국마비'],['합참','국방과학연구원'],undefined,undefined,45),

  w('dprk-etc001','GPS 재밍 시스템','GPS Jamming System','CYBER','DPRK','OPERATIONAL','HIGH',
    '고출력 GPS 재밍 장치. 비무장지대 및 서해에서 한국·항공기 GPS 교란 실시. 2010년대 수차례 사용.',
    {range:'100km+(추정)',firstDeployed:'2012년(첫 대규모사용)',manufacturer:'북한 군수'},
    ['GPS재밍','전자전','항법교란','서해'],['합참','방위사업청'],undefined,undefined,80),

  w('dprk-etc002','정찰위성 만리경-1','Malligyong-1 Military Reconnaissance Satellite','SATELLITE','DPRK','OPERATIONAL','HIGH',
    '북한 최초 군사정찰위성. 2023년 11월 발사 성공. 저해상도 EO 카메라. 한미 군사기지 촬영 주장.',
    {altitude:'500km(LEO)',firstDeployed:'2023년',manufacturer:'국가항공우주기술총국'},
    ['만리경','정찰위성','북한','2023년발사'],['38North','CSIS','국방부'],undefined,undefined,75),

]
