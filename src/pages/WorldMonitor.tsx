import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Globe, Layers, AlertTriangle, Shield, Wifi, Zap, DollarSign,
  Radio, X, Activity,
  Crosshair, Lock, Flame, BarChart3,
} from 'lucide-react'

// ── 투영 ─────────────────────────────────────────────────────────────────────
const W = 1000, H = 480
const project = (lat: number, lon: number) => ({
  x: ((lon + 180) / 360) * W,
  y: ((90 - lat) / 180) * H,
})

// ── 레이어 정의 ───────────────────────────────────────────────────────────────
export type LayerId = 'conflicts' | 'bases' | 'nuclear' | 'cyber' | 'military' | 'hotspots' | 'economic' | 'outages'

const LAYERS: { id: LayerId; label: string; color: string; icon: React.ElementType; ko: string }[] = [
  { id: 'conflicts', label: 'Conflicts',  color: '#ff2d55', icon: Flame,      ko: '분쟁지역' },
  { id: 'bases',     label: 'Mil.Bases',  color: '#00d4ff', icon: Shield,     ko: '군사기지' },
  { id: 'nuclear',   label: 'Nuclear',    color: '#ff6b35', icon: Zap,        ko: '핵시설'   },
  { id: 'cyber',     label: 'Cyber',      color: '#c084fc', icon: Lock,       ko: '사이버'   },
  { id: 'military',  label: 'Military',   color: '#00ff88', icon: Crosshair,  ko: '군사동향' },
  { id: 'hotspots',  label: 'Hotspots',   color: '#ffcc00', icon: AlertTriangle, ko: '위험지역' },
  { id: 'economic',  label: 'Economic',   color: '#38bdf8', icon: DollarSign, ko: '경제요충' },
  { id: 'outages',   label: 'Outages',    color: '#94a3b8', icon: Wifi,       ko: '인프라장애' },
]

// ── 이동 경로 (군사 자산 이동 추적) ──────────────────────────────────────────
interface MovementTrack {
  id: string
  type: 'NAVAL' | 'AIR' | 'MISSILE' | 'GROUND'
  label: string; labelKo: string
  color: string
  points: [number, number][]  // [lat, lon][]
  speed?: string
  asset?: string
  active: boolean
}

const MOVEMENT_TRACKS: MovementTrack[] = [
  // 항모전단 이동
  {
    id:'mv001', type:'NAVAL', label:'USS Theodore Roosevelt CSG', labelKo:'루스벨트 항모전단 (서태평양)', color:'#00d4ff',
    points:[[21.3, 157.8],[22.0, 145.0],[24.0, 135.0],[26.5, 128.0],[30.0, 122.0]],
    speed:'18노트', asset:'CVN-71 + 이지스함 5척 + 잠수함 2척', active:true,
  },
  {
    id:'mv002', type:'NAVAL', label:'Russia Black Sea Fleet', labelKo:'러시아 흑해함대 초계', color:'#ff6b35',
    points:[[44.6, 33.5],[44.0, 31.5],[43.5, 30.0],[43.0, 28.5]],
    speed:'12노트', asset:'소형전투함 4척', active:true,
  },
  {
    id:'mv003', type:'NAVAL', label:'China PLAN Exercise', labelKo:'중국 해군 대만해협 기동', color:'#ffcc00',
    points:[[24.5, 119.0],[23.5, 120.5],[22.0, 121.5],[21.0, 122.0],[23.0, 123.0]],
    speed:'15노트', asset:'항모 산둥함+구축함 6척', active:true,
  },
  {
    id:'mv004', type:'NAVAL', label:'JMSDF Destroyer Flotilla', labelKo:'일본 해상자위대 훈련', color:'#00ff88',
    points:[[34.0, 129.5],[33.0, 131.0],[32.0, 132.5],[31.0, 131.0]],
    speed:'20노트', asset:'이지스 DDG 2척+DD 4척', active:true,
  },
  {
    id:'mv005', type:'NAVAL', label:'Houthi Red Sea Patrols', labelKo:'후티 홍해 초계', color:'#ff2d55',
    points:[[15.5, 42.5],[14.0, 43.0],[13.0, 44.0],[12.5, 45.0]],
    speed:'8노트', asset:'소형 함정·고속단정 다수', active:true,
  },
  // 항공 경로
  {
    id:'mv006', type:'AIR', label:'US B-52 Arctic Patrol', labelKo:'미 B-52 북극 순항', color:'#00d4ff',
    points:[[40.0, -96.0],[55.0, -100.0],[68.0, -80.0],[75.0, -30.0],[70.0, 10.0],[65.0, 20.0]],
    speed:'마하 0.86', asset:'B-52H 스트라토포트리스 2대', active:true,
  },
  {
    id:'mv007', type:'AIR', label:'Russia Tu-160 Arctic', labelKo:'러시아 Tu-160 북극 초계', color:'#ff6b35',
    points:[[55.7, 37.6],[65.0, 50.0],[72.0, 60.0],[78.0, 20.0],[72.0, 0.0],[68.0, -5.0]],
    speed:'마하 0.9', asset:'Tu-160 화이트 스완 2대', active:true,
  },
  {
    id:'mv008', type:'AIR', label:'China H-6K ADIZ Intrusion', labelKo:'중국 H-6K 대만 ADIZ 침범', color:'#ffcc00',
    points:[[25.0, 120.0],[23.0, 121.5],[21.5, 123.0],[20.0, 122.0]],
    speed:'마하 0.75', asset:'H-6K 폭격기 4대', active:true,
  },
  // 미사일 궤적 (발사 시뮬레이션)
  {
    id:'mv009', type:'MISSILE', label:'DPRK Hwasong-18 Trajectory (Sim)', labelKo:'화성-18 ICBM 궤적 (시뮬)', color:'#ff2d55',
    points:[[39.7, 124.7],[55.0, 155.0],[65.0, 180.0],[55.0, -150.0],[35.0, -120.0]],
    speed:'마하 20+', asset:'화성-18 ICBM (MIRV)', active:false,
  },
  // 지상 이동
  {
    id:'mv010', type:'GROUND', label:'Russian Forces Kursk Oblast', labelKo:'러시아군 쿠르스크 집결', color:'#ff6b35',
    points:[[50.5, 36.5],[51.0, 35.0],[51.5, 34.0],[51.8, 33.5]],
    speed:'35km/h', asset:'제41군 BTG 4개 집결', active:true,
  },
  {
    id:'mv011', type:'GROUND', label:'Ukraine Armored Counterattack', labelKo:'우크라이나 기갑 반격 축선', color:'#38bdf8',
    points:[[48.5, 35.0],[49.0, 36.5],[49.5, 37.5],[50.0, 38.0]],
    speed:'20km/h', asset:'제82공수여단+전차 Leopard 2', active:true,
  },
]

// ── 이벤트 마커 ───────────────────────────────────────────────────────────────
interface WorldEvent {
  id: string
  layer: LayerId
  lat: number; lon: number
  label: string; labelKo: string
  country: string
  severity: 'CRITICAL' | 'HIGH' | 'MED' | 'LOW'
  desc: string
  lastUpdate: string
  casualties?: string
  source?: string
  timeline?: { time: string; event: string }[]
  relatedIds?: string[]
}

const SEV_COLOR = { CRITICAL: '#ff2d55', HIGH: '#ff6b35', MED: '#ffcc00', LOW: '#94a3b8' }

const WORLD_EVENTS: WorldEvent[] = [
  // ── 분쟁 (CONFLICTS) ──────────────────────────────────────────────────────
  { id:'c001', layer:'conflicts', lat:48.5,  lon:32.0,   label:'Ukraine War',          labelKo:'우크라이나 전쟁',
    country:'🇺🇦 우크라이나', severity:'CRITICAL',
    desc:'러시아-우크라이나 전면전. 드론 공격 급증. Kharkiv·Zaporizhzhia 전선 교전 지속. 러시아 오레슈니크 미사일 사용.',
    lastUpdate:'5분 전', casualties:'~1,100,000명 사상(추정)', source:'ISW',
    timeline:[
      { time:'2026-06-28 06:34', event:'드네프르강 교량 드론 타격, 민간 차량 3대 피격' },
      { time:'2026-06-28 04:12', event:'Kharkiv 방향 러시아군 소규모 기계화 전진 격퇴' },
      { time:'2026-06-27 22:45', event:'러시아 Kh-101 순항미사일 7발 키이우 방향 발사, 5발 요격' },
      { time:'2026-06-27 18:30', event:'Zaporizhzhia 핵발전소 지역 포격, IAEA 우려 표명' },
      { time:'2026-06-27 08:00', event:'우크라이나 F-16 편대 러시아 방공 SA-17 포대 타격 성공' },
    ],
    relatedIds:['m006','o004']
  },
  { id:'c002', layer:'conflicts', lat:31.5,  lon:34.5,   label:'Gaza Conflict',        labelKo:'가자 분쟁',
    country:'🇮🇱 이스라엘/가자', severity:'CRITICAL',
    desc:'이스라엘-하마스 교전 지속. 가자 남부 라파흐 군사작전 진행 중. 인도주의 위기 심화.',
    lastUpdate:'12분 전', casualties:'~48,000명 사망', source:'UN OCHA',
    timeline:[
      { time:'2026-06-28 07:20', event:'IDF 가자시티 북부 표적 정밀 타격 (7건)' },
      { time:'2026-06-28 03:50', event:'하마스 카삼 로켓 이스라엘 남부 발사, 아이언돔 요격' },
      { time:'2026-06-27 20:00', event:'UN 인도주의 트럭 100대 가자 북부 진입 허가' },
      { time:'2026-06-27 15:00', event:'카타르 중재 휴전 협상 결렬 보도' },
    ]
  },
  { id:'c003', layer:'conflicts', lat:15.0,  lon:31.0,   label:'Sudan Civil War',      labelKo:'수단 내전',
    country:'🇸🇩 수단', severity:'CRITICAL',
    desc:'RSF vs SAF 내전. 하르툼 전투 지속. 2,500만 명 인도주의 위기. 최대 규모 난민 사태.',
    lastUpdate:'1시간 전', casualties:'~150,000명 사망', source:'ACLED',
    timeline:[
      { time:'2026-06-28 02:00', event:'하르툼 북부 교전. RSF 시가전 지속' },
      { time:'2026-06-27 14:00', event:'UN 식량 원조 트럭 RSF 저지로 차단' },
      { time:'2026-06-26', event:'다르푸르 남부 공습, 민간인 사상자 발생' },
    ]
  },
  { id:'c004', layer:'conflicts', lat:13.5,  lon:2.0,    label:'Sahel Insurgency',     labelKo:'사헬 반란',              country:'🌍 말리/니제르/부르키나파소', severity:'HIGH', desc:'이슬람 무장세력 활동 증가. 러시아 바그너 그룹 대체 전력 활동.', lastUpdate:'2시간 전', source:'ECOWAS' },
  { id:'c005', layer:'conflicts', lat:15.5,  lon:38.5,   label:'Tigray/Amhara',        labelKo:'에티오피아 분쟁',        country:'🇪🇹 에티오피아', severity:'HIGH', desc:'암하라 지역 민병대 vs 연방군 교전. 휴전 협정 불안정.', lastUpdate:'3시간 전', source:'UN' },
  { id:'c006', layer:'conflicts', lat:34.0,  lon:71.0,   label:'Afghan Conflict',      labelKo:'아프가니스탄 분쟁',      country:'🇦🇫 아프가니스탄', severity:'HIGH', desc:'탈레반 통치 하 IS-K 테러 활동 지속. 국경 지역 긴장 고조.', lastUpdate:'4시간 전', source:'UN Assistance Mission' },
  { id:'c007', layer:'conflicts', lat:4.0,   lon:31.0,   label:'South Sudan',          labelKo:'남수단 분쟁',            country:'🇸🇸 남수단', severity:'MED', desc:'부족 간 충돌 및 무장세력 활동. 인도주의 상황 악화.', lastUpdate:'5시간 전', source:'UNMISS' },
  { id:'c008', layer:'conflicts', lat:17.0,  lon:44.0,   label:'Yemen Civil War',      labelKo:'예멘 내전',              country:'🇾🇪 예멘', severity:'HIGH', desc:'후티 반군 홍해 선박 공격 지속. 이스라엘-미국 반격 작전 진행.', lastUpdate:'30분 전', source:'USCENTCOM' },
  { id:'c009', layer:'conflicts', lat:18.5,  lon:97.0,   label:'Myanmar Civil War',    labelKo:'미얀마 내전',            country:'🇲🇲 미얀마', severity:'HIGH', desc:'군사정권 vs 저항세력(PDF+소수민족). 여러 지역 동시 교전.', lastUpdate:'2시간 전', source:'Assistance Association for Myanmar' },
  { id:'c010', layer:'conflicts', lat:5.5,   lon:-4.0,   label:'W.Africa Instability', labelKo:'서아프리카 불안',        country:'🌍 코트디부아르', severity:'MED', desc:'코트디부아르 북부 국경 지역 무장세력 침투.', lastUpdate:'6시간 전', source:'ECOWAS' },

  // ── 군사기지 (BASES) ──────────────────────────────────────────────────────
  { id:'b001', layer:'bases', lat:13.5,  lon:144.8, label:'Andersen AFB / Naval Base Guam', labelKo:'앤더슨 공군기지 (괌)', country:'🇺🇸 미국', severity:'HIGH', desc:'미 태평양군 핵심 전진기지. B-2·B-52 전략폭격기 순환 배치.', lastUpdate:'현재', source:'USINDOPACOM' },
  { id:'b002', layer:'bases', lat:37.09, lon:127.03, label:'Camp Humphreys', labelKo:'캠프 험프리스', country:'🇺🇸🇰🇷 한미', severity:'HIGH', desc:'세계 최대 해외 미군기지. 주한미군 사령부 위치.', lastUpdate:'현재', source:'USFK' },
  { id:'b003', layer:'bases', lat:26.3,  lon:127.8,  label:'Kadena AB / Okinawa', labelKo:'가데나 공군기지', country:'🇺🇸🇯🇵 미일', severity:'HIGH', desc:'인도태평양 최대 미 공군기지. F-15·KC-135 상시 배치.', lastUpdate:'현재', source:'USAF' },
  { id:'b004', layer:'bases', lat:1.35,  lon:103.82, label:'Sembawang Naval Base', labelKo:'셈바왕 해군기지', country:'🇸🇬 싱가포르', severity:'MED', desc:'미 해군 7함대 로지스틱 허브. 순환 배치 지원.', lastUpdate:'현재', source:'US Navy' },
  { id:'b005', layer:'bases', lat:51.5,  lon:-1.8,   label:'RAF Fairford', labelKo:'RAF 페어포드', country:'🇬🇧 영국', severity:'MED', desc:'NATO 전략 항공기 순환 기지. B-1 랜서 유럽 작전 지원.', lastUpdate:'현재', source:'RAF' },
  { id:'b006', layer:'bases', lat:36.5,  lon:28.0,   label:'Incirlik AB', labelKo:'인시를리크 공군기지', country:'🇹🇷 터키', severity:'HIGH', desc:'NATO B61 전술핵 약 50발 보관. 중동 작전 핵심 기지.', lastUpdate:'현재', source:'NATO' },
  { id:'b007', layer:'bases', lat:39.9,  lon:116.4,  label:'Beijing Military Region', labelKo:'베이징 군구', country:'🇨🇳 중국', severity:'HIGH', desc:'PLA 전략지원부대 사령부. 핵·사이버·우주 전력 통합 지휘.', lastUpdate:'현재', source:'IISS' },
  { id:'b008', layer:'bases', lat:43.1,  lon:131.9,  label:'Pacific Fleet HQ', labelKo:'러시아 태평양함대', country:'🇷🇺 러시아', severity:'HIGH', desc:'블라디보스토크 태평양함대 사령부. 핵잠수함 기지.', lastUpdate:'현재', source:'IISS' },
  { id:'b009', layer:'bases', lat:11.5,  lon:43.1,   label:'Camp Lemonnier', labelKo:'레모니어 기지 (지부티)', country:'🇺🇸 미국/🇩🇯 지부티', severity:'MED', desc:'아프리카-중동 작전 허브. 드론 기지 포함.', lastUpdate:'현재', source:'AFRICOM' },
  { id:'b010', layer:'bases', lat:-20.5, lon:57.3,   label:'Diego Garcia', labelKo:'디에고 가르시아', country:'🇬🇧🇺🇸 영미', severity:'HIGH', desc:'인도양 핵심 전략기지. B-2·핵탄도미사일 핵 전략 자산 지원.', lastUpdate:'현재', source:'DoD' },

  // ── 핵시설 (NUCLEAR) ──────────────────────────────────────────────────────
  { id:'n001', layer:'nuclear', lat:40.0,  lon:124.7, label:'Dongchang-ri ICBM Base', labelKo:'동창리 ICBM 발사장', country:'🇰🇵 북한', severity:'CRITICAL', desc:'화성-17·18 ICBM 발사 시설. 2024년 2차례 발사. 연료 주입 감지.', lastUpdate:'48분 전', source:'NGA/CSIS' },
  { id:'n002', layer:'nuclear', lat:39.0,  lon:126.5, label:'Yongbyon Nuclear Complex', labelKo:'영변 핵단지', country:'🇰🇵 북한', severity:'CRITICAL', desc:'플루토늄·우라늄 농축 동시 운영. 5MW 원자로 재가동 확인.', lastUpdate:'1시간 전', source:'IAEA/38 North' },
  { id:'n003', layer:'nuclear', lat:42.6,  lon:74.8,  label:'Russia ICBM Bases (Siberia)', labelKo:'러시아 ICBM 기지', country:'🇷🇺 러시아', severity:'CRITICAL', desc:'사르마트 ICBM 전진 배치. 핵 태세 격상 신호 감지.', lastUpdate:'현재', source:'FAS/SIPRI' },
  { id:'n004', layer:'nuclear', lat:29.0,  lon:71.0,  label:'Pakistan Nuclear Arsenal', labelKo:'파키스탄 핵 시설', country:'🇵🇰 파키스탄', severity:'HIGH', desc:'핵탄두 160~170발 보유 추정. 인도와 긴장 상시 고조.', lastUpdate:'현재', source:'SIPRI' },
  { id:'n005', layer:'nuclear', lat:28.0,  lon:75.0,  label:'India Nuclear Sites', labelKo:'인도 핵 시설', country:'🇮🇳 인도', severity:'HIGH', desc:'핵탄두 170발 추정. 아그니-V ICBM 전력화 진행.', lastUpdate:'현재', source:'SIPRI' },
  { id:'n006', layer:'nuclear', lat:30.0,  lon:34.0,  label:'Dimona Research Reactor', labelKo:'디모나 핵 연구소', country:'🇮🇱 이스라엘', severity:'HIGH', desc:'이스라엘 비공식 핵 프로그램 핵심. 핵탄두 90발 추정.', lastUpdate:'현재', source:'FAS' },
  { id:'n007', layer:'nuclear', lat:32.0,  lon:53.0,  label:'Iran Natanz / Fordow', labelKo:'이란 나탄즈·포르도', country:'🇮🇷 이란', severity:'CRITICAL', desc:'우라늄 60% 농축 진행 중. 핵 개발 추정 1~2개월 임박.', lastUpdate:'2시간 전', source:'IAEA' },

  // ── 사이버 위협 (CYBER) ───────────────────────────────────────────────────
  { id:'cy001', layer:'cyber', lat:55.7,  lon:37.6,  label:'APT28 / APT29 (Russia)', labelKo:'러시아 APT 그룹', country:'🇷🇺 러시아', severity:'CRITICAL', desc:'NATO 회원국 정부·인프라 타겟 사이버 공격 급증. 선거 개입 작전.', lastUpdate:'15분 전', source:'CISA' },
  { id:'cy002', layer:'cyber', lat:39.9,  lon:116.4, label:'APT41 / Volt Typhoon', labelKo:'중국 Volt Typhoon', country:'🇨🇳 중국', severity:'CRITICAL', desc:'미국 핵심 인프라 침투 지속. 수도·전력·통신 시스템 사전 포지셔닝.', lastUpdate:'30분 전', source:'FBI/NSA' },
  { id:'cy003', layer:'cyber', lat:39.0,  lon:125.7, label:'Lazarus Group (DPRK)', labelKo:'라자루스 그룹 (북한)', country:'🇰🇵 북한', severity:'HIGH', desc:'가상화폐 탈취 2024년 $1.4B. 방산·핵 기술 해킹 지속.', lastUpdate:'1시간 전', source:'US Treasury/Mandiant' },
  { id:'cy004', layer:'cyber', lat:32.0,  lon:53.0,  label:'IRGC Cyber Command', labelKo:'이란 사이버 사령부', country:'🇮🇷 이란', severity:'HIGH', desc:'이스라엘·사우디 인프라 공격. OT/SCADA 시스템 타겟.', lastUpdate:'2시간 전', source:'CISA' },
  { id:'cy005', layer:'cyber', lat:37.5,  lon:127.0, label:'Korea Cyber HQ', labelKo:'한국 사이버 작전 사령부', country:'🇰🇷 한국', severity:'MED', desc:'북한 해킹 일평균 1.5백만 회 공격 탐지. 방산·금융 타겟.', lastUpdate:'현재', source:'KISA' },

  // ── 군사 동향 (MILITARY) ──────────────────────────────────────────────────
  { id:'m001', layer:'military', lat:23.0,  lon:115.0, label:'China Taiwan Strait Exercise', labelKo:'중국 대만해협 훈련', country:'🇨🇳 중국', severity:'CRITICAL', desc:'PLA 동부전구 대규모 훈련. 항모 2척+잠수함 8척+전투기 150기 투입.', lastUpdate:'20분 전', source:'US INDOPACOM' },
  { id:'m002', layer:'military', lat:22.0,  lon:120.0, label:'Taiwan ADIZ Intrusions', labelKo:'대만 방공식별구역 침범', country:'🇨🇳 중국', severity:'HIGH', desc:'이번 주 ADIZ 침범 32회. 전략폭격기 H-6K 포함.', lastUpdate:'10분 전', source:'Taiwan MND' },
  { id:'m003', layer:'military', lat:70.0,  lon:30.0,  label:'Russia Arctic Patrol', labelKo:'러시아 북극 초계', country:'🇷🇺 러시아', severity:'HIGH', desc:'Tu-160 전략폭격기 북극 순항. NATO 요격기 대응 발진.', lastUpdate:'40분 전', source:'Norwegian AF' },
  { id:'m004', layer:'military', lat:37.5,  lon:127.0, label:'ROK-US Joint Drills', labelKo:'한미 연합훈련', country:'🇰🇷🇺🇸 한미', severity:'MED', desc:'Freedom Edge 24 연합훈련. 항모전단+핵잠수함 참가.', lastUpdate:'현재', source:'ROK JCS' },
  { id:'m005', layer:'military', lat:12.5,  lon:45.0,  label:'Houthi Red Sea Attacks', labelKo:'후티 홍해 공격', country:'🇾🇪 예멘/후티', severity:'HIGH', desc:'2024년 이후 상선 100척+ 공격. 이스라엘·미국 반격 공습 진행.', lastUpdate:'35분 전', source:'CENTCOM' },
  { id:'m006', layer:'military', lat:55.7,  lon:37.6,  label:'Russia Ukraine Offensive', labelKo:'러시아 우크라이나 공세', country:'🇷🇺 러시아', severity:'CRITICAL', desc:'오레슈니크 중거리탄도미사일 우크라이나 타격. 핵 위협 수위 격상.', lastUpdate:'25분 전', source:'ISW/UA Army' },
  { id:'m007', layer:'military', lat:35.5,  lon:139.5, label:'Japan MSDF Exercise', labelKo:'일본 해상 훈련', country:'🇯🇵🇺🇸 미일', severity:'MED', desc:'미일 해상자위대 연합 대잠전 훈련. 이지스함 4척 참가.', lastUpdate:'1시간 전', source:'JMSDF' },

  // ── 위험지역 (HOTSPOTS) ───────────────────────────────────────────────────
  { id:'h001', layer:'hotspots', lat:23.0,  lon:120.0, label:'Taiwan Strait', labelKo:'대만해협', country:'🇨🇳🇹🇼 중국/대만', severity:'CRITICAL', desc:'세계 최고 위험 지역. 중국 통일 압박 vs 대만 주권. 미국 전략적 모호성 유지.', lastUpdate:'현재', source:'CFR' },
  { id:'h002', layer:'hotspots', lat:38.0,  lon:128.0, label:'Korean Peninsula DMZ', labelKo:'한반도 비무장지대', country:'🇰🇵🇰🇷 남북한', severity:'CRITICAL', desc:'북한 ICBM 고도화. 오물풍선 도발. 러북 군사협력 심화.', lastUpdate:'현재', source:'38North' },
  { id:'h003', layer:'hotspots', lat:27.0,  lon:89.0,  label:'India-China LAC', labelKo:'인도-중국 국경', country:'🇮🇳🇨🇳 인도/중국', severity:'HIGH', desc:'실제통제선(LAC) 인근 군사 대치 지속. 갈완 계곡 긴장.', lastUpdate:'현재', source:'India MOD' },
  { id:'h004', layer:'hotspots', lat:27.0,  lon:76.0,  label:'India-Pakistan LOC', labelKo:'인도-파키스탄 통제선', country:'🇮🇳🇵🇰 인도/파키스탄', severity:'HIGH', desc:'카슈미르 LOC 교전 산발. 핵보유국 간 긴장 관리.', lastUpdate:'현재', source:'Line of Control' },
  { id:'h005', layer:'hotspots', lat:10.0,  lon:109.0, label:'South China Sea', labelKo:'남중국해', country:'🇨🇳 중국 vs 아세안', severity:'HIGH', desc:'중국 인공섬 군사화 강화. 필리핀-중국 해양 충돌 빈발.', lastUpdate:'현재', source:'CSIS/AMTI' },
  { id:'h006', layer:'hotspots', lat:26.0,  lon:57.0,  label:'Strait of Hormuz', labelKo:'호르무즈 해협', country:'🇮🇷 이란 vs 서방', severity:'HIGH', desc:'전세계 석유 20% 통과. 이란 봉쇄 위협. 미 해군 상시 초계.', lastUpdate:'현재', source:'EIA' },
  { id:'h007', layer:'hotspots', lat:60.0,  lon:28.0,  label:'Finland-Russia Border', labelKo:'핀란드-러시아 국경', country:'🇫🇮🇷🇺 핀란드/러시아', severity:'MED', desc:'NATO 신규 회원 핀란드. 러시아 국경 군사 긴장 증가.', lastUpdate:'현재', source:'NATO' },

  // ── 경제 요충 (ECONOMIC) ──────────────────────────────────────────────────
  { id:'e001', layer:'economic', lat:1.3,   lon:104.0, label:'Strait of Malacca', labelKo:'말라카 해협', country:'🇸🇬🇲🇾 싱가포르/말레이시아', severity:'HIGH', desc:'전세계 교역 25% 통과. 중국 석유 80% 의존. 봉쇄 시 글로벌 경제 대혼란.', lastUpdate:'현재', source:'IMO' },
  { id:'e002', layer:'economic', lat:12.5,  lon:43.5,  label:'Bab-el-Mandeb', labelKo:'밥엘만데브 해협', country:'🇩🇯 지부티', severity:'CRITICAL', desc:'후티 공격으로 수에즈 운하 이용 40% 감소. 해상 보험료 급등.', lastUpdate:'현재', source:'Lloyd\'s' },
  { id:'e003', layer:'economic', lat:30.5,  lon:32.3,  label:'Suez Canal', labelKo:'수에즈 운하', country:'🇪🇬 이집트', severity:'HIGH', desc:'글로벌 컨테이너 교역 12% 담당. 후티 위기로 우회 비용 급증.', lastUpdate:'현재', source:'SCA' },
  { id:'e004', layer:'economic', lat:58.0,  lon:-5.0,  label:'GIUK Gap (NATO)', labelKo:'GIUK 갭', country:'🇬🇧🇮🇸🇳🇴 영국/아이슬란드/노르웨이', severity:'HIGH', desc:'러시아 핵잠수함 대서양 접근로. NATO ASW 초계 강화.', lastUpdate:'현재', source:'NATO' },
  { id:'e005', layer:'economic', lat:9.5,   lon:-80.0, label:'Panama Canal', labelKo:'파나마 운하', country:'🇵🇦 파나마', severity:'MED', desc:'가뭄으로 통행 선박 40% 감소. 중국 영향력 확대 우려.', lastUpdate:'현재', source:'ACP' },
  { id:'e006', layer:'economic', lat:34.0,  lon:130.0, label:'Korean Strait / SLOC', labelKo:'한국해협 항로', country:'🇰🇷🇯🇵 한국/일본', severity:'MED', desc:'동북아 에너지·교역 핵심 항로. 분쟁 시 봉쇄 가능성.', lastUpdate:'현재', source:'CSIS' },

  // ── 인프라 장애 (OUTAGES) ─────────────────────────────────────────────────
  { id:'o001', layer:'outages', lat:52.0,  lon:20.0,  label:'Baltic Sea Cable Cut', labelKo:'발트해 해저케이블 절단', country:'🇵🇱🇫🇮🇸🇪 폴란드/핀란드/스웨덴', severity:'HIGH', desc:'발트해 해저 통신케이블 2건 절단. 러시아 연루 의심. NATO 수사 중.', lastUpdate:'6시간 전', source:'EU/NATO' },
  { id:'o002', layer:'outages', lat:31.0,  lon:30.0,  label:'Red Sea Cable Damage', labelKo:'홍해 해저케이블 손상', country:'🇪🇬 이집트', severity:'HIGH', desc:'후티 공격으로 홍해 해저케이블 4건 손상. 중동-유럽 인터넷 25% 저하.', lastUpdate:'현재', source:'TeleGeography' },
  { id:'o003', layer:'outages', lat:37.5,  lon:127.0, label:'DPRK GPS Jamming', labelKo:'북한 GPS 교란', country:'🇰🇵 북한', severity:'HIGH', desc:'수도권·공항 GPS 교란 신호 감지. 항공기 수십 대 영향.', lastUpdate:'2시간 전', source:'국토교통부' },
  { id:'o004', layer:'outages', lat:50.0,  lon:30.0,  label:'Ukraine Power Grid', labelKo:'우크라이나 전력망', country:'🇺🇦 우크라이나', severity:'CRITICAL', desc:'러시아 미사일 공격으로 전력망 60% 파괴. 민간 전력 공급 불안정.', lastUpdate:'1시간 전', source:'Ukrenergo' },
]

// ── 자동 업데이트 이벤트 ──────────────────────────────────────────────────────
interface LiveAlert {
  id: string; time: string; layer: LayerId
  title: string; severity: WorldEvent['severity']
  location: string
}

const ALERT_POOL: Omit<LiveAlert, 'id' | 'time'>[] = [
  { layer:'conflicts', title:'우크라이나 동부 미사일 공격 탐지', severity:'CRITICAL', location:'도네츠크' },
  { layer:'military',  title:'중국 해군 함정 대만해협 통과', severity:'HIGH', location:'대만해협' },
  { layer:'nuclear',   title:'영변 원자로 냉각탑 증기 감지', severity:'HIGH', location:'북한 영변' },
  { layer:'cyber',     title:'라자루스 그룹 한국 방산 해킹 시도', severity:'HIGH', location:'서울' },
  { layer:'hotspots',  title:'남중국해 중국-필리핀 선박 충돌', severity:'MED', location:'황옌다오' },
  { layer:'military',  title:'러시아 Tu-160 북극해 초계 확인', severity:'MED', location:'바렌츠해' },
  { layer:'economic',  title:'수에즈 운하 대형 화물선 통행 거부', severity:'MED', location:'수에즈' },
  { layer:'cyber',     title:'APT41 미국 전력망 침투 시도 탐지', severity:'CRITICAL', location:'텍사스' },
  { layer:'outages',   title:'발트해 통신케이블 추가 절단 의심', severity:'HIGH', location:'핀란드만' },
  { layer:'conflicts', title:'가자 지구 북부 교전 재개', severity:'HIGH', location:'가자 북부' },
  { layer:'military',  title:'한미 연합 항모전단 서해 진입', severity:'MED', location:'서해' },
  { layer:'nuclear',   title:'이란 포르도 시설 원심분리기 추가 가동', severity:'CRITICAL', location:'이란 포르도' },
]

function genTime() {
  return new Date().toLocaleTimeString('ko-KR', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
}

// ── 육지 점 (InteractiveWorldMap 기반 확장) ───────────────────────────────────
const LAND_DOTS: [number, number][] = [
  // 한반도
  [37,126],[37,127],[37,128],[36,127],[36,128],[35,129],[34,128],[35,127],
  [38,125],[38,126],[39,125],[39,126],[40,124],[40,125],[41,125],[41,126],
  // 일본
  [36,138],[36,137],[35,137],[35,136],[35,135],[34,134],[33,131],[32,130],
  [31,131],[33,132],[34,133],[36,136],[37,137],[38,140],[39,141],[40,141],
  [41,141],[42,142],[43,141],[44,143],[43,144],[26,128],[26,127],[27,128],
  // 중국 동부
  [40,116],[39,117],[38,115],[37,114],[36,114],[35,113],[34,112],[32,112],
  [30,114],[28,115],[26,113],[24,113],[22,113],[32,120],[33,120],[34,119],
  [35,117],[36,120],[38,117],[39,118],[40,119],[41,121],[42,122],[43,122],
  [44,123],[45,122],[46,125],[47,124],[48,123],[49,126],[50,128],[45,128],
  // 중국 서부/내륙
  [35,104],[36,103],[38,105],[40,107],[42,107],[43,108],[44,109],[46,108],
  [48,106],[50,100],[30,104],[28,104],[26,102],[24,102],[22,101],[20,100],
  [22,108],[24,108],[26,106],[28,107],[30,107],[32,109],[34,108],[36,108],
  // 러시아 극동·시베리아
  [55,135],[57,137],[58,140],[59,143],[60,142],[61,141],[62,140],[63,143],
  [50,136],[51,136],[52,137],[53,138],[54,136],[48,135],[47,134],[46,133],
  [45,132],[44,131],[50,140],[52,141],[54,142],[56,138],[60,150],[62,152],
  [64,158],[62,160],[60,162],[58,160],[56,158],[54,156],[52,154],[50,152],
  // 러시아 유럽
  [55,37],[56,37],[57,35],[58,34],[59,30],[60,30],[61,28],[62,28],
  [63,30],[64,40],[65,45],[66,50],[65,55],[64,60],[63,62],[62,65],
  [60,60],[58,58],[56,58],[54,55],[52,53],[50,50],[50,45],[52,45],
  [54,48],[56,48],[58,50],[60,50],[62,50],[64,52],[55,73],[56,75],
  [57,72],[58,70],[59,68],[60,65],[62,60],[64,57],[65,60],[66,62],
  [67,64],[68,67],[69,68],[70,68],[68,60],[66,55],[64,55],[62,55],
  // 중앙아시아
  [42,70],[44,72],[46,74],[48,76],[50,78],[48,80],[46,80],[44,78],
  [42,72],[40,68],[38,66],[40,64],[42,62],[44,60],[46,62],[48,64],
  // 인도
  [28,77],[26,80],[24,82],[22,80],[20,78],[18,76],[16,74],[14,74],
  [12,77],[10,78],[8,77],[14,78],[16,80],[18,78],[20,76],[22,72],
  [24,72],[26,74],[28,72],[30,74],[32,74],[28,75],[26,76],[24,74],
  // 동남아
  [20,100],[18,100],[16,100],[14,99],[12,99],[10,99],[8,100],[10,100],
  [12,101],[14,101],[16,102],[18,104],[20,102],[22,104],[22,106],[20,106],
  [18,106],[16,108],[14,108],[12,108],[10,107],[12,104],[14,104],[16,104],
  // 인도네시아
  [0,108],[0,110],[0,112],[-2,110],[-2,112],[-2,114],[-4,114],[-4,116],
  [-6,107],[-6,108],[-6,110],[-6,112],[2,110],[2,112],[4,114],[4,116],
  // 중동
  [35,36],[34,36],[32,36],[30,34],[28,34],[26,36],[24,38],[22,40],
  [24,42],[26,44],[28,46],[30,48],[32,46],[34,42],[36,40],[38,40],
  [36,36],[34,38],[32,44],[30,50],[28,48],[24,56],[22,58],[20,58],
  [18,56],[20,60],[22,60],[24,58],[36,54],[34,50],[32,48],[30,52],
  // 아프리카
  [36,8],[34,8],[32,10],[30,10],[28,12],[26,14],[24,14],[22,14],
  [20,14],[18,14],[16,12],[14,12],[12,14],[10,14],[8,14],[6,14],
  [4,12],[2,12],[0,10],[-2,10],[-4,12],[-6,12],[-8,14],[-10,16],
  [-12,16],[-14,14],[-16,14],[-18,14],[-20,16],[-22,18],[-24,18],
  [-26,20],[-28,20],[-30,20],[-32,20],[-34,20],[-34,22],[-32,24],
  [-30,26],[-28,28],[-26,28],[-24,26],[-22,26],[-20,24],[-18,24],
  [-16,22],[-14,22],[-12,20],[-10,20],[-8,20],[-6,20],[-4,18],
  [-2,18],[0,16],[2,16],[4,18],[6,18],[8,18],[10,20],[12,20],
  [14,22],[16,22],[18,22],[20,22],[22,22],[24,24],[26,24],[28,26],
  [30,28],[32,28],[34,30],[36,28],[8,4],[6,4],[4,4],[2,4],
  [0,8],[2,8],[4,8],[6,8],[8,8],[10,8],[12,8],[14,10],
  // 유럽
  [48,18],[50,18],[52,18],[54,18],[52,20],[50,20],[48,20],[46,18],
  [44,18],[42,18],[40,18],[48,16],[50,14],[52,14],[54,14],[56,14],
  [58,16],[60,18],[62,22],[60,24],[58,26],[56,22],[54,20],[52,22],
  [50,22],[48,22],[46,20],[44,20],[42,20],[40,20],[40,22],[42,24],
  [44,24],[46,24],[48,24],[50,24],[52,24],[54,22],[56,24],[58,22],
  [56,28],[54,28],[52,26],[50,26],[48,26],[46,26],[44,26],[42,26],
  [42,28],[44,28],[46,28],[48,28],[44,22],[42,22],[40,24],[38,26],
  [38,22],[38,24],[36,14],[36,6],[44,6],[46,6],[48,6],[50,6],
  [52,8],[54,10],[56,10],[58,10],[60,10],[62,10],[64,12],[66,14],
  [68,16],[70,20],[68,22],[66,18],[64,18],[62,18],[60,16],[58,14],
  [56,16],[54,16],[52,12],[50,10],[48,10],[46,10],[44,10],[42,10],
  [40,10],[42,12],[44,12],[46,12],[48,12],[50,12],[52,10],[54,12],
  [56,12],[58,12],[38,16],[40,16],[42,16],[44,14],[46,14],[48,14],
  // 북미
  [48,-90],[50,-90],[52,-90],[54,-90],[56,-88],[58,-86],[60,-84],
  [62,-82],[64,-80],[66,-78],[66,-74],[64,-76],[62,-78],
  [60,-80],[58,-78],[56,-76],[54,-76],[52,-78],[50,-78],[48,-78],
  [46,-76],[44,-76],[42,-78],[40,-76],[38,-76],[36,-76],[34,-76],
  [32,-80],[30,-82],[28,-82],[26,-80],[24,-80],[30,-88],[32,-88],
  [34,-88],[36,-88],[38,-90],[40,-90],[42,-90],[44,-90],[46,-92],
  [48,-92],[50,-94],[52,-96],[54,-98],[56,-100],[58,-102],[60,-104],
  [48,-94],[46,-94],[44,-92],[42,-92],[40,-92],[38,-92],[36,-92],
  [34,-92],[32,-92],[30,-92],[28,-90],[34,-94],[36,-96],[38,-98],
  [40,-98],[42,-98],[44,-98],[46,-98],[48,-98],[50,-100],[52,-102],
  [44,-100],[42,-100],[40,-100],[38,-100],[36,-100],[34,-100],[32,-100],
  [44,-104],[42,-104],[40,-104],[38,-106],[36,-106],[34,-106],[32,-106],
  [44,-108],[42,-108],[40,-108],[38,-108],[36,-108],[34,-108],[44,-112],
  [42,-112],[40,-112],[38,-112],[36,-110],[46,-122],[48,-122],[50,-120],
  [52,-118],[50,-124],[48,-124],[46,-124],[44,-124],[42,-124],[40,-124],
  [46,-120],[44,-120],[42,-120],[40,-120],[44,-116],[42,-116],[40,-116],
  [44,-118],[42,-118],[40,-118],[50,-96],[52,-94],[54,-96],[56,-92],
  [60,-96],[62,-94],[64,-96],[62,-110],[60,-110],[58,-110],[56,-110],
  [54,-110],[60,-130],[58,-130],[56,-130],[54,-126],[52,-126],[50,-126],
  [58,-134],[56,-134],[54,-132],[52,-130],[60,-140],[58,-138],[56,-136],
  [62,-140],[60,-136],[58,-136],[62,-144],[62,-150],[60,-150],[58,-152],
  // 남미
  [10,-75],[8,-75],[6,-75],[4,-74],[2,-74],[0,-76],[-2,-78],[-4,-80],
  [-6,-78],[-8,-76],[-10,-76],[-12,-74],[-14,-74],[-16,-72],[-18,-70],
  [-20,-68],[-22,-68],[-24,-68],[-26,-68],[-28,-70],[-30,-70],[-32,-70],
  [-34,-70],[-36,-72],[-38,-72],[-40,-72],[-42,-72],[-44,-72],[-46,-74],
  [-48,-74],[-50,-74],[-52,-72],[-54,-70],[-10,-36],[-12,-38],[-14,-40],
  [-16,-40],[-18,-40],[-20,-42],[-22,-44],[-24,-46],[-26,-48],[-28,-48],
  [-30,-50],[-32,-52],[-16,-44],[-14,-44],[-12,-44],[-10,-40],[-8,-36],
  [-6,-36],[-4,-38],[-2,-44],[0,-50],[2,-52],[4,-52],[6,-56],[8,-62],
  [10,-62],[12,-72],[14,-88],[16,-90],[18,-92],[20,-90],[22,-88],[24,-82],
  // 호주
  [-28,114],[-26,114],[-24,114],[-22,114],[-20,116],[-18,124],[-16,130],
  [-14,130],[-12,130],[-14,136],[-12,136],[-14,142],[-16,142],[-18,140],
  [-20,140],[-22,138],[-24,136],[-26,134],[-28,132],[-30,130],[-32,130],
  [-34,128],[-34,130],[-32,136],[-30,136],[-28,136],[-26,136],[-24,138],
  [-22,142],[-24,144],[-26,146],[-28,148],[-30,148],[-32,148],[-34,150],
  [-36,150],[-38,148],[-40,148],[-38,144],[-36,140],[-38,142],[-36,136],
  [-34,136],[-32,140],[-30,140],[-28,140],[-26,140],[-24,142],[-22,146],
  // 아이슬란드/북극
  [65,-18],[64,-20],[64,-22],[65,-24],[66,-18],[64,-16],
  [78,16],[80,20],[82,24],[80,28],[78,24],[76,20],
]

// ── 메인 컴포넌트 ─────────────────────────────────────────────────────────────
export default function WorldMonitor() {
  const svgRef = useRef<SVGSVGElement>(null)
  const [activeLayers, setActiveLayers] = useState<Set<LayerId>>(
    new Set(['conflicts', 'bases', 'nuclear', 'cyber', 'military', 'hotspots', 'economic', 'outages'])
  )
  const [selectedEvent, setSelectedEvent] = useState<WorldEvent | null>(null)
  const [liveAlerts, setLiveAlerts] = useState<LiveAlert[]>([])
  const [pulse, setPulse] = useState(0)
  const [hovered, setHovered] = useState<string | null>(null)
  const [filterSeverity, setFilterSeverity] = useState<WorldEvent['severity'] | 'ALL'>('ALL')
  const [cursorPos, setCursorPos] = useState<{ lat: number; lon: number } | null>(null)
  const [statsTab, setStatsTab] = useState<'feed' | 'stats'>('feed')
  const [showTracks, setShowTracks] = useState(true)
  const [trackPhase, setTrackPhase] = useState(0)

  // 이동 경로 애니메이션 위상
  useEffect(() => {
    const id = setInterval(() => setTrackPhase(p => (p + 1) % 100), 80)
    return () => clearInterval(id)
  }, [])

  // 맥박 애니메이션
  useEffect(() => {
    const id = setInterval(() => setPulse(p => p + 1), 800)
    return () => clearInterval(id)
  }, [])

  // 실시간 경보 생성
  useEffect(() => {
    const generate = () => {
      const tpl = ALERT_POOL[Math.floor(Math.random() * ALERT_POOL.length)]
      const alert: LiveAlert = { ...tpl, id: `al-${Date.now()}`, time: genTime() }
      setLiveAlerts(prev => [alert, ...prev].slice(0, 20))
    }
    generate()
    const id = setInterval(generate, 6000 + Math.random() * 4000)
    return () => clearInterval(id)
  }, [])

  // 마우스 좌표 → 위경도
  const handleMouseMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    const svg = svgRef.current
    if (!svg) return
    const rect = svg.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * W
    const y = ((e.clientY - rect.top) / rect.height) * H
    const lat = 90 - (y / H) * 180
    const lon = (x / W) * 360 - 180
    setCursorPos({ lat, lon })
  }, [])

  const toggleLayer = (id: LayerId) => {
    setActiveLayers(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const visibleEvents = WORLD_EVENTS.filter(e =>
    activeLayers.has(e.layer) &&
    (filterSeverity === 'ALL' || e.severity === filterSeverity)
  )

  const getLayerColor = (id: LayerId) => LAYERS.find(l => l.id === id)?.color ?? '#00d4ff'

  const statsByLayer = LAYERS.map(l => ({
    ...l,
    count: WORLD_EVENTS.filter(e => e.layer === l.id).length,
    critical: WORLD_EVENTS.filter(e => e.layer === l.id && e.severity === 'CRITICAL').length,
  }))

  return (
    <div className="min-h-screen bg-[#020b18] flex flex-col">
      {/* ── 헤더 ── */}
      <div className="border-b border-[#0a3050] bg-[#041526]/60 backdrop-blur-sm px-4 md:px-6 py-3">
        <div className="max-w-screen-2xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#00d4ff]/10 border border-[#00d4ff]/30 flex items-center justify-center">
              <Globe className="w-4 h-4 text-[#00d4ff]" />
            </div>
            <div>
              <p className="text-[9px] font-black tracking-[0.3em] text-[#00d4ff]/60 uppercase">K-Defense AI · Global Monitor</p>
              <h1 className="text-lg font-black text-white tracking-wide leading-none">세계 군사·안보 실시간 모니터</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* 심각도 필터 */}
            <div className="hidden sm:flex items-center gap-1">
              {(['ALL', 'CRITICAL', 'HIGH', 'MED', 'LOW'] as const).map(s => (
                <button key={s} onClick={() => setFilterSeverity(s)}
                  className={`text-[8px] font-black px-2 py-1 transition-all ${
                    filterSeverity === s ? 'text-[#020b18]' : 'text-[#4a7a9b] hover:text-white'
                  }`}
                  style={filterSeverity === s ? { background: s === 'ALL' ? '#00d4ff' : SEV_COLOR[s] } : {}}>
                  {s === 'ALL' ? '전체' : s}
                </button>
              ))}
            </div>
            {/* 이동경로 토글 */}
            <button onClick={() => setShowTracks(v => !v)}
              className={`hidden sm:flex items-center gap-1.5 text-[8px] font-black px-2 py-1.5 border transition-all ${
                showTracks ? 'text-[#00ff88] border-[#00ff88]/30 bg-[#00ff88]/10' : 'text-[#4a7a9b] border-[#0a3050]'
              }`}>
              <Radio className="w-3 h-3" /> 이동경로
            </button>
            {/* 라이브 인디케이터 */}
            <div className="flex items-center gap-1.5 px-2 py-1 bg-[#00ff88]/10 border border-[#00ff88]/20">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse" />
              <span className="text-[8px] font-black text-[#00ff88]">LIVE</span>
            </div>
            <div className="flex items-center gap-1.5 text-[9px] font-black text-[#00d4ff]">
              <Activity className="w-3 h-3" />
              <span>{visibleEvents.length}개 이벤트</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── 메인 레이아웃 ── */}
      <div className="flex-1 flex flex-col xl:flex-row gap-0 max-w-screen-2xl mx-auto w-full">

        {/* 레이어 패널 (좌측) */}
        <div className="xl:w-52 xl:min-w-52 border-r border-[#0a3050] bg-[#020e1f]/60 p-3 space-y-1">
          <div className="text-[8px] font-black tracking-[0.2em] text-[#4a7a9b] uppercase mb-3 flex items-center gap-1.5">
            <Layers className="w-3 h-3" /> 레이어
          </div>
          {LAYERS.map(layer => {
            const Icon = layer.icon
            const isOn = activeLayers.has(layer.id)
            const count = WORLD_EVENTS.filter(e => e.layer === layer.id).length
            return (
              <button key={layer.id} onClick={() => toggleLayer(layer.id)}
                className={`w-full flex items-center gap-2 px-2.5 py-2 transition-all text-left clip-corner-sm border ${
                  isOn ? 'border-transparent' : 'border-[#0a3050] opacity-40'
                }`}
                style={isOn ? { background: `${layer.color}12`, borderColor: `${layer.color}30` } : {}}>
                <Icon className="w-3.5 h-3.5 shrink-0" style={{ color: isOn ? layer.color : '#4a7a9b' }} />
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-black" style={{ color: isOn ? layer.color : '#4a7a9b' }}>{layer.ko}</div>
                  <div className="text-[8px] text-[#2a4a6a]">{layer.label}</div>
                </div>
                <span className="text-[8px] font-black shrink-0" style={{ color: isOn ? layer.color : '#2a4a6a' }}>{count}</span>
              </button>
            )
          })}

          {/* 전체/해제 */}
          <div className="flex gap-1 pt-2 border-t border-[#0a3050]">
            <button onClick={() => setActiveLayers(new Set(LAYERS.map(l => l.id)))}
              className="flex-1 text-[8px] font-black text-[#00d4ff] hover:bg-[#00d4ff]/10 py-1.5 transition-all">
              전체 ON
            </button>
            <button onClick={() => setActiveLayers(new Set())}
              className="flex-1 text-[8px] font-black text-[#4a7a9b] hover:bg-[#4a7a9b]/10 py-1.5 transition-all">
              전체 OFF
            </button>
          </div>
        </div>

        {/* 지도 (중앙) */}
        <div className="flex-1 min-w-0 relative bg-[#020b18]">
          <svg
            ref={svgRef}
            viewBox={`0 0 ${W} ${H}`}
            className="w-full h-full select-none cursor-crosshair"
            style={{ maxHeight: '62vh' }}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setCursorPos(null)}
          >
            {/* 해양 배경 */}
            <rect width={W} height={H} fill="#020b18" />

            {/* 경위도 그리드 */}
            {[-60,-30,0,30,60].map(lat => {
              const p = project(lat, -180)
              return (
                <g key={lat}>
                  <line x1={0} y1={p.y} x2={W} y2={p.y} stroke="#00d4ff" strokeOpacity="0.04" strokeWidth="0.5" />
                  <text x={4} y={p.y - 2} fontSize="5.5" fill="#1a3a5a">{lat}°</text>
                </g>
              )
            })}
            {[-150,-120,-90,-60,-30,0,30,60,90,120,150].map(lon => {
              const p = project(0, lon)
              return (
                <line key={lon} x1={p.x} y1={0} x2={p.x} y2={H}
                  stroke="#00d4ff" strokeOpacity="0.04" strokeWidth="0.5" />
              )
            })}

            {/* 육지 점 */}
            {LAND_DOTS.map(([lat, lon], i) => {
              const p = project(lat, lon)
              return <rect key={i} x={p.x - 1.2} y={p.y - 1.2} width={2.4} height={2.4} fill="#0d2a40" />
            })}

            {/* ── 이동 경로 ── */}
            {showTracks && MOVEMENT_TRACKS.filter(t => t.active).map(track => {
              const pts = track.points.map(([lat, lon]) => project(lat, lon))
              const pathD = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ')
              // 애니메이션 점 위치
              const prog = (trackPhase / 100)
              const segCount = pts.length - 1
              const segIdx = Math.min(Math.floor(prog * segCount), segCount - 1)
              const segProg = (prog * segCount) - segIdx
              const p1 = pts[segIdx], p2 = pts[Math.min(segIdx + 1, pts.length - 1)]
              const dotX = p1.x + (p2.x - p1.x) * segProg
              const dotY = p1.y + (p2.y - p1.y) * segProg
              const TRACK_ICON = { NAVAL: '◆', AIR: '▲', MISSILE: '⬟', GROUND: '■' }

              return (
                <g key={track.id}>
                  {/* 경로 선 */}
                  <path d={pathD} fill="none" stroke={track.color}
                    strokeWidth={track.type === 'MISSILE' ? 0.8 : 1.2}
                    strokeDasharray={track.type === 'AIR' ? '6,3' : track.type === 'MISSILE' ? '4,4' : '8,4'}
                    opacity="0.45" />
                  {/* 웨이포인트 */}
                  {pts.map((p, i) => (
                    <circle key={i} cx={p.x} cy={p.y} r={i === 0 || i === pts.length-1 ? 3 : 1.5}
                      fill={track.color} opacity={i === 0 || i === pts.length-1 ? 0.8 : 0.4} />
                  ))}
                  {/* 이동 점 */}
                  <g>
                    <circle cx={dotX} cy={dotY} r={7} fill="none" stroke={track.color} strokeWidth="0.5" opacity="0.25" />
                    <circle cx={dotX} cy={dotY} r={4} fill={`${track.color}40`} stroke={track.color} strokeWidth="1"
                      style={{ filter: `drop-shadow(0 0 5px ${track.color})` }} />
                    <text x={dotX} y={dotY + 3.5} textAnchor="middle" fontSize="5" fill={track.color} fontWeight="bold">
                      {TRACK_ICON[track.type]}
                    </text>
                  </g>
                  {/* 라벨 (첫 포인트) */}
                  <text x={pts[0].x + 6} y={pts[0].y - 4} fontSize="6" fill={track.color} opacity="0.7" fontWeight="bold">
                    {track.labelKo}
                  </text>
                </g>
              )
            })}

            {/* 이벤트 마커 */}
            {visibleEvents.map(ev => {
              const p = project(ev.lat, ev.lon)
              const color = SEV_COLOR[ev.severity]
              const layerColor = getLayerColor(ev.layer)
              const isSel = selectedEvent?.id === ev.id
              const isHov = hovered === ev.id
              const pulseOdd = pulse % 2 === 0

              return (
                <g key={ev.id}
                  onMouseEnter={() => setHovered(ev.id)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => setSelectedEvent(s => s?.id === ev.id ? null : ev)}
                  className="cursor-pointer">

                  {/* 맥박 원 */}
                  {(isSel || isHov || ev.severity === 'CRITICAL') && (
                    <circle cx={p.x} cy={p.y}
                      r={pulseOdd ? 14 : 10}
                      fill="none" stroke={color}
                      strokeWidth="0.7" opacity={pulseOdd ? 0.3 : 0.15}
                      style={{ transition: 'r 0.4s ease, opacity 0.4s ease' }}
                    />
                  )}
                  {ev.severity === 'CRITICAL' && (
                    <circle cx={p.x} cy={p.y}
                      r={pulseOdd ? 20 : 16}
                      fill="none" stroke={color}
                      strokeWidth="0.4" opacity={pulseOdd ? 0.15 : 0.05}
                    />
                  )}

                  {/* 메인 마커 */}
                  <circle cx={p.x} cy={p.y}
                    r={isSel || isHov ? 7 : 5}
                    fill={`${color}25`}
                    stroke={color}
                    strokeWidth={isSel ? 2 : 1}
                    style={{ filter: `drop-shadow(0 0 ${isSel ? 8 : 4}px ${color})`, transition: 'r 0.15s' }}
                  />

                  {/* 레이어 색 내부 점 */}
                  <circle cx={p.x} cy={p.y} r={2.5} fill={layerColor} opacity={0.9} />

                  {/* 라벨 (호버 시) */}
                  {(isHov || isSel) && (
                    <g>
                      <rect x={p.x + 9} y={p.y - 8} width={Math.min(ev.labelKo.length * 5.8 + 6, 120)} height={16}
                        rx="2" fill="#041526" stroke={color} strokeWidth="0.5" opacity="0.95" />
                      <text x={p.x + 12} y={p.y + 3} fontSize="7.5" fill={color} fontWeight="bold">
                        {ev.labelKo}
                      </text>
                    </g>
                  )}
                </g>
              )
            })}
          </svg>

          {/* 좌표 표시 */}
          {cursorPos && (
            <div className="absolute bottom-2 left-2 text-[8px] font-mono text-[#2a4a6a]">
              {cursorPos.lat.toFixed(2)}°{cursorPos.lat >= 0 ? 'N' : 'S'} {Math.abs(cursorPos.lon).toFixed(2)}°{cursorPos.lon >= 0 ? 'E' : 'W'}
            </div>
          )}

          {/* 범례 */}
          <div className="absolute bottom-2 right-2 flex items-center gap-3 bg-[#020b18]/80 border border-[#0a3050] px-3 py-1.5">
            {Object.entries(SEV_COLOR).map(([s, c]) => (
              <div key={s} className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full" style={{ background: c }} />
                <span className="text-[7px] text-[#4a7a9b]">{s}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 우측 패널 */}
        <div className="xl:w-80 xl:min-w-80 border-l border-[#0a3050] bg-[#020e1f]/60 flex flex-col">

          {/* 탭 */}
          <div className="flex border-b border-[#0a3050]">
            {[
              { id: 'feed' as const, label: '실시간 피드', icon: Radio },
              { id: 'stats' as const, label: '통계', icon: BarChart3 },
            ].map(({ id, label, icon: Icon }) => (
              <button key={id} onClick={() => setStatsTab(id)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-[9px] font-black transition-all border-b-2 -mb-px ${
                  statsTab === id ? 'text-[#00d4ff] border-[#00d4ff]' : 'text-[#4a7a9b] border-transparent hover:text-[#8ab8d4]'
                }`}>
                <Icon className="w-3 h-3" />{label}
              </button>
            ))}
          </div>

          {/* 선택 이벤트 상세 */}
          <AnimatePresence>
            {selectedEvent && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="border-b border-[#0a3050] overflow-hidden"
                style={{ borderTopColor: SEV_COLOR[selectedEvent.severity] }}
              >
                <div className="h-0.5" style={{ background: SEV_COLOR[selectedEvent.severity] }} />
                <div className="p-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                        <span className="text-[7px] font-black px-1.5 py-0.5"
                          style={{ color: getLayerColor(selectedEvent.layer), background: `${getLayerColor(selectedEvent.layer)}15` }}>
                          {LAYERS.find(l => l.id === selectedEvent.layer)?.ko}
                        </span>
                        <span className="text-[7px] font-black px-1.5 py-0.5"
                          style={{ color: SEV_COLOR[selectedEvent.severity], background: `${SEV_COLOR[selectedEvent.severity]}15` }}>
                          {selectedEvent.severity}
                        </span>
                      </div>
                      <div className="text-[12px] font-black text-white leading-tight">{selectedEvent.labelKo}</div>
                      <div className="text-[9px] text-[#4a7a9b]">{selectedEvent.country}</div>
                    </div>
                    <button onClick={() => setSelectedEvent(null)} className="text-[#4a7a9b] hover:text-white ml-1 shrink-0">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-[9px] text-[#8ab8d4] leading-relaxed mb-2">{selectedEvent.desc}</p>
                  <div className="space-y-1 text-[8px] mb-2">
                    {selectedEvent.casualties && (
                      <div className="flex justify-between border-b border-[#0a3050]/50 pb-1">
                        <span className="text-[#4a7a9b]">피해 규모</span>
                        <span className="font-black text-[#ff6b35]">{selectedEvent.casualties}</span>
                      </div>
                    )}
                    <div className="flex justify-between border-b border-[#0a3050]/50 pb-1">
                      <span className="text-[#4a7a9b]">좌표</span>
                      <span className="font-mono text-[#00d4ff]">{selectedEvent.lat.toFixed(2)}°{selectedEvent.lat>=0?'N':'S'} {Math.abs(selectedEvent.lon).toFixed(2)}°{selectedEvent.lon>=0?'E':'W'}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#0a3050]/50 pb-1">
                      <span className="text-[#4a7a9b]">최종 업데이트</span>
                      <span className="text-[#00ff88]">{selectedEvent.lastUpdate}</span>
                    </div>
                    {selectedEvent.source && (
                      <div className="flex justify-between">
                        <span className="text-[#4a7a9b]">출처</span>
                        <span className="text-[#4a7a9b]">{selectedEvent.source}</span>
                      </div>
                    )}
                  </div>

                  {/* 타임라인 */}
                  {selectedEvent.timeline && selectedEvent.timeline.length > 0 && (
                    <div>
                      <div className="text-[7px] font-black tracking-[0.15em] text-[#00d4ff] mb-1.5 flex items-center gap-1">
                        <Activity className="w-2.5 h-2.5" /> 타임라인
                      </div>
                      <div className="space-y-1.5 relative">
                        <div className="absolute left-[5px] top-0 bottom-0 w-px bg-[#0a3050]" />
                        {selectedEvent.timeline.map((item, i) => (
                          <div key={i} className="flex gap-2 pl-3 relative">
                            <div className="absolute left-[2px] top-[5px] w-[7px] h-[7px] rounded-full bg-[#00d4ff]/60 border border-[#00d4ff]/30 shrink-0" />
                            <div>
                              <div className="text-[7px] font-mono text-[#2a5a7a]">{item.time}</div>
                              <div className="text-[8px] text-[#6a9ab8] leading-tight">{item.event}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 관련 이동 경로 */}
                  {(() => {
                    const related = MOVEMENT_TRACKS.filter(t =>
                      selectedEvent.relatedIds?.includes(t.id) ||
                      t.points.some(([lat, lon]) =>
                        Math.abs(lat - selectedEvent.lat) < 5 && Math.abs(lon - selectedEvent.lon) < 8
                      )
                    )
                    if (!related.length) return null
                    return (
                      <div className="mt-2">
                        <div className="text-[7px] font-black tracking-[0.15em] text-[#00ff88] mb-1 flex items-center gap-1">
                          <Radio className="w-2.5 h-2.5" /> 인근 이동 경로
                        </div>
                        {related.map(t => (
                          <div key={t.id} className="flex items-center gap-2 text-[8px] py-1 border-b border-[#0a3050]/30">
                            <div className="w-2 h-2 rounded-full shrink-0" style={{ background: t.color }} />
                            <span className="text-[#6a9ab8] flex-1 truncate">{t.labelKo}</span>
                            <span className="text-[#2a4a6a] shrink-0">{t.speed}</span>
                          </div>
                        ))}
                      </div>
                    )
                  })()}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 피드 / 통계 탭 콘텐츠 */}
          <div className="flex-1 overflow-y-auto">
            {statsTab === 'feed' ? (
              <div className="p-2 space-y-1">
                {liveAlerts.map((alert, i) => {
                  const Icon = LAYERS.find(l => l.id === alert.layer)?.icon ?? AlertTriangle
                  const color = LAYERS.find(l => l.id === alert.layer)?.color ?? '#00d4ff'
                  return (
                    <motion.div key={alert.id}
                      initial={i === 0 ? { opacity: 0, x: 20 } : false}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex gap-2 p-2 border border-[#0a3050]/50 hover:border-[#00d4ff]/20 transition-all">
                      <div className="w-5 h-5 flex items-center justify-center shrink-0 mt-0.5"
                        style={{ color }}>
                        <Icon className="w-3 h-3" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                          <span className="text-[7px] font-black px-1 py-0.5"
                            style={{ color: SEV_COLOR[alert.severity], background: `${SEV_COLOR[alert.severity]}15` }}>
                            {alert.severity}
                          </span>
                          <span className="text-[7px] text-[#2a4a6a]">{alert.layer.toUpperCase()}</span>
                          <span className="text-[7px] font-mono text-[#2a4a6a] ml-auto">{alert.time}</span>
                        </div>
                        <div className="text-[9px] text-[#8ab8d4] font-bold">{alert.title}</div>
                        <div className="text-[7px] text-[#4a7a9b]">{alert.location}</div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            ) : (
              <div className="p-3 space-y-2">
                {/* 요약 KPI */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {[
                    { label: '총 이벤트', value: WORLD_EVENTS.length, color: '#00d4ff' },
                    { label: 'CRITICAL', value: WORLD_EVENTS.filter(e => e.severity === 'CRITICAL').length, color: '#ff2d55' },
                    { label: '활성 분쟁', value: WORLD_EVENTS.filter(e => e.layer === 'conflicts').length, color: '#ff6b35' },
                    { label: '핵 위협', value: WORLD_EVENTS.filter(e => e.layer === 'nuclear').length, color: '#ffcc00' },
                  ].map(kpi => (
                    <div key={kpi.label} className="bg-[#041526]/60 border border-[#0a3050] p-2.5">
                      <div className="text-[7px] text-[#4a7a9b] mb-0.5">{kpi.label}</div>
                      <div className="text-[20px] font-black" style={{ color: kpi.color }}>{kpi.value}</div>
                    </div>
                  ))}
                </div>

                {/* 레이어별 통계 */}
                {statsByLayer.map(layer => {
                  const Icon = layer.icon
                  return (
                    <div key={layer.id} className="flex items-center gap-2 py-1.5 border-b border-[#0a3050]/50">
                      <Icon className="w-3 h-3 shrink-0" style={{ color: layer.color }} />
                      <span className="text-[9px] font-black flex-1" style={{ color: layer.color }}>{layer.ko}</span>
                      <div className="flex items-center gap-1.5">
                        {layer.critical > 0 && (
                          <span className="text-[7px] font-black text-[#ff2d55] bg-[#ff2d55]/10 px-1 py-0.5">
                            C:{layer.critical}
                          </span>
                        )}
                        <span className="text-[10px] font-black text-white">{layer.count}</span>
                      </div>
                    </div>
                  )
                })}

                {/* 위협 분포 바 */}
                <div className="mt-3">
                  <div className="text-[8px] font-black text-[#4a7a9b] mb-2">심각도 분포</div>
                  {(['CRITICAL', 'HIGH', 'MED', 'LOW'] as const).map(sev => {
                    const count = WORLD_EVENTS.filter(e => e.severity === sev).length
                    const pct = (count / WORLD_EVENTS.length) * 100
                    return (
                      <div key={sev} className="flex items-center gap-2 mb-1.5">
                        <span className="text-[7px] font-black w-14 text-right" style={{ color: SEV_COLOR[sev] }}>{sev}</span>
                        <div className="flex-1 h-1.5 bg-[#0a3050] rounded-full">
                          <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: SEV_COLOR[sev] }} />
                        </div>
                        <span className="text-[7px] text-[#4a7a9b] w-4 text-right">{count}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── 하단 이벤트 스크롤 바 ── */}
      <div className="border-t border-[#0a3050] bg-[#041526]/40 py-1.5 overflow-hidden">
        <div className="flex items-center gap-0 animate-[scroll_60s_linear_infinite]"
          style={{ width: 'max-content' }}>
          {[...WORLD_EVENTS, ...WORLD_EVENTS].map((ev, i) => {
            const color = SEV_COLOR[ev.severity]
            return (
              <span key={`${ev.id}-${i}`} className="flex items-center gap-2 px-4 text-[8px] whitespace-nowrap border-r border-[#0a3050]">
                <span className="font-black" style={{ color }}>{ev.severity}</span>
                <span className="text-[#8ab8d4]">{ev.labelKo}</span>
                <span className="text-[#2a4a6a]">{ev.country}</span>
              </span>
            )
          })}
        </div>
      </div>
    </div>
  )
}
