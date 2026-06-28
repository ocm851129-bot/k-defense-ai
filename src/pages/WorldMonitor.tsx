import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Globe, AlertTriangle, Shield, Wifi, Zap, DollarSign,
  Radio, X, Lock, Flame, BarChart3,
  Crosshair, Clock, MapPin, TrendingUp, Eye,
} from 'lucide-react'

const W = 1000, H = 480
const project = (lat: number, lon: number) => ({
  x: ((lon + 180) / 360) * W,
  y: ((90 - lat) / 180) * H,
})

export type LayerId = 'conflicts' | 'bases' | 'nuclear' | 'cyber' | 'military' | 'hotspots' | 'economic' | 'outages'

const LAYERS: { id: LayerId; label: string; color: string; icon: React.ElementType; ko: string }[] = [
  { id: 'conflicts', label: 'CONFLICTS',  color: '#ff2d55', icon: Flame,         ko: '분쟁' },
  { id: 'bases',     label: 'MIL.BASES',  color: '#00d4ff', icon: Shield,        ko: '군사기지' },
  { id: 'nuclear',   label: 'NUCLEAR',    color: '#ff6b35', icon: Zap,           ko: '핵시설' },
  { id: 'cyber',     label: 'CYBER',      color: '#c084fc', icon: Lock,          ko: '사이버' },
  { id: 'military',  label: 'MILITARY',   color: '#00ff88', icon: Crosshair,     ko: '군사동향' },
  { id: 'hotspots',  label: 'HOTSPOTS',   color: '#ffcc00', icon: AlertTriangle, ko: '위험지역' },
  { id: 'economic',  label: 'ECONOMIC',   color: '#38bdf8', icon: DollarSign,    ko: '경제요충' },
  { id: 'outages',   label: 'OUTAGES',    color: '#94a3b8', icon: Wifi,          ko: '장애' },
]

// ── 이동 경로 ─────────────────────────────────────────────────────────────────
interface Track { id: string; type: 'NAVAL'|'AIR'|'MISSILE'|'GROUND'; ko: string; color: string; points:[number,number][]; speed:string; asset:string; active:boolean }

const TRACKS: Track[] = [
  { id:'t1', type:'NAVAL', ko:'USS Theodore Roosevelt 항모전단', color:'#00d4ff',
    points:[[21.3,157.8],[22.0,145.0],[24.0,135.0],[26.5,128.0],[30.0,122.0]], speed:'18kt', asset:'CVN-71 + 이지스 5척', active:true },
  { id:'t2', type:'NAVAL', ko:'중국 해군 대만해협 기동', color:'#ffcc00',
    points:[[24.5,119.0],[23.5,120.5],[22.0,121.5],[21.0,122.0],[23.0,123.0]], speed:'15kt', asset:'항모 산둥함 + 구축함 6척', active:true },
  { id:'t3', type:'NAVAL', ko:'후티 홍해 초계', color:'#ff2d55',
    points:[[15.5,42.5],[14.0,43.0],[13.0,44.0],[12.5,45.0]], speed:'8kt', asset:'소형함·고속단정', active:true },
  { id:'t4', type:'AIR', ko:'미 B-52 북극 순항', color:'#00d4ff',
    points:[[40.0,-96.0],[55.0,-100.0],[68.0,-80.0],[75.0,-30.0],[70.0,10.0],[65.0,20.0]], speed:'마하 0.86', asset:'B-52H 2대', active:true },
  { id:'t5', type:'AIR', ko:'러시아 Tu-160 북극 초계', color:'#ff6b35',
    points:[[55.7,37.6],[65.0,50.0],[72.0,60.0],[78.0,20.0],[72.0,0.0]], speed:'마하 0.9', asset:'Tu-160 화이트스완 2대', active:true },
  { id:'t6', type:'AIR', ko:'중국 H-6K ADIZ 침범', color:'#ffcc00',
    points:[[25.0,120.0],[23.0,121.5],[21.5,123.0],[20.0,122.0]], speed:'마하 0.75', asset:'H-6K 4대', active:true },
  { id:'t7', type:'GROUND', ko:'러시아군 쿠르스크 집결', color:'#ff6b35',
    points:[[50.5,36.5],[51.0,35.0],[51.5,34.0],[51.8,33.5]], speed:'35km/h', asset:'제41군 BTG 4개 집결', active:true },
  { id:'t8', type:'GROUND', ko:'우크라이나 기갑 반격', color:'#38bdf8',
    points:[[48.5,35.0],[49.0,36.5],[49.5,37.5],[50.0,38.0]], speed:'20km/h', asset:'Leopard 2 + 제82공수여단', active:true },
]

// ── 이벤트 ───────────────────────────────────────────────────────────────────
interface Evt {
  id:string; layer:LayerId; lat:number; lon:number; labelKo:string; country:string
  severity:'CRITICAL'|'HIGH'|'MED'|'LOW'; desc:string; lastUpdate:string
  casualties?:string; source?:string
  timeline?:{time:string;event:string}[]
}
const SEV={ CRITICAL:'#ff2d55', HIGH:'#ff6b35', MED:'#ffcc00', LOW:'#94a3b8' } as const

const EVENTS: Evt[] = [
  { id:'c01',layer:'conflicts',lat:48.5,lon:32.0,labelKo:'우크라이나 전쟁',country:'🇺🇦 우크라이나',severity:'CRITICAL',
    desc:'러시아-우크라이나 전면전. 드론 공격 급증. Kharkiv·Zaporizhzhia 전선 교전 지속.',lastUpdate:'4분 전',casualties:'~110만 명 사상',source:'ISW',
    timeline:[{time:'06:34',event:'드네프르강 교량 드론 타격'},{time:'04:12',event:'Kharkiv 기계화 전진 격퇴'},{time:'어제 22:45',event:'Kh-101 7발 발사 → 5발 요격'}]},
  { id:'c02',layer:'conflicts',lat:31.5,lon:34.5,labelKo:'가자 분쟁',country:'🇮🇱 이스라엘/가자',severity:'CRITICAL',
    desc:'이스라엘-하마스 교전. 가자 남부 작전 진행.',lastUpdate:'11분 전',casualties:'~48,000명 사망',source:'UN OCHA',
    timeline:[{time:'07:20',event:'IDF 가자시티 북부 7건 타격'},{time:'03:50',event:'카삼 로켓 발사 → 아이언돔 요격'}]},
  { id:'c03',layer:'conflicts',lat:15.0,lon:31.0,labelKo:'수단 내전',country:'🇸🇩 수단',severity:'CRITICAL',desc:'RSF vs SAF 내전. 2,500만 명 인도주의 위기.',lastUpdate:'1시간 전',casualties:'~15만 명 사망',source:'ACLED'},
  { id:'c04',layer:'conflicts',lat:13.5,lon:2.0,labelKo:'사헬 반란',country:'🌍 말리/니제르',severity:'HIGH',desc:'IS 계열 무장세력 활동 급증. 바그너 후계 아프리카 군단 활동.',lastUpdate:'2시간 전',source:'ECOWAS'},
  { id:'c05',layer:'conflicts',lat:17.0,lon:44.0,labelKo:'예멘/후티',country:'🇾🇪 예멘',severity:'HIGH',desc:'후티 홍해 선박 공격 지속. 이스라엘·미국 반격 공습.',lastUpdate:'28분 전',source:'CENTCOM'},
  { id:'c06',layer:'conflicts',lat:18.5,lon:97.0,labelKo:'미얀마 내전',country:'🇲🇲 미얀마',severity:'HIGH',desc:'군사정권 vs 저항세력 PDF. 여러 지역 동시 교전.',lastUpdate:'2시간 전',source:'PDF'},
  { id:'b01',layer:'bases',lat:13.5,lon:144.8,labelKo:'앤더슨 공군기지 (괌)',country:'🇺🇸 미국',severity:'HIGH',desc:'미 태평양군 핵심 전진기지. B-2·B-52 전략폭격기 순환배치.',lastUpdate:'현재',source:'USINDOPACOM'},
  { id:'b02',layer:'bases',lat:37.09,lon:127.03,labelKo:'캠프 험프리스',country:'🇺🇸🇰🇷 한미',severity:'HIGH',desc:'세계 최대 해외 미군기지. 주한미군 사령부.',lastUpdate:'현재',source:'USFK'},
  { id:'b03',layer:'bases',lat:26.3,lon:127.8,labelKo:'가데나 공군기지',country:'🇺🇸🇯🇵 미일',severity:'HIGH',desc:'인도태평양 최대 미 공군기지. F-15·KC-135 상시배치.',lastUpdate:'현재',source:'USAF'},
  { id:'b04',layer:'bases',lat:1.35,lon:103.82,labelKo:'셈바왕 해군기지',country:'🇸🇬 싱가포르',severity:'MED',desc:'미 해군 7함대 로지스틱 허브.',lastUpdate:'현재',source:'US Navy'},
  { id:'b05',layer:'bases',lat:51.5,lon:-1.8,labelKo:'RAF 페어포드',country:'🇬🇧 영국',severity:'MED',desc:'NATO 전략폭격기 순환기지. B-1 랜서 유럽 작전.',lastUpdate:'현재',source:'RAF'},
  { id:'b06',layer:'bases',lat:36.5,lon:28.0,labelKo:'인시를리크 공군기지',country:'🇹🇷 터키',severity:'HIGH',desc:'NATO 핵무기 약 50발 보관. 중동 작전 핵심.',lastUpdate:'현재',source:'NATO'},
  { id:'b07',layer:'bases',lat:43.1,lon:131.9,labelKo:'러시아 태평양함대 (블라디보스토크)',country:'🇷🇺 러시아',severity:'HIGH',desc:'태평양함대 사령부. 핵잠수함 기지.',lastUpdate:'현재',source:'IISS'},
  { id:'b08',layer:'bases',lat:-20.5,lon:57.3,labelKo:'디에고 가르시아',country:'🇬🇧🇺🇸 영미',severity:'HIGH',desc:'인도양 핵심 전략기지. B-2·핵전략 자산 지원.',lastUpdate:'현재',source:'DoD'},
  { id:'n01',layer:'nuclear',lat:40.0,lon:124.7,labelKo:'동창리 ICBM 발사장',country:'🇰🇵 북한',severity:'CRITICAL',desc:'화성-17·18 ICBM 발사 시설. 연료 주입 감지.',lastUpdate:'52분 전',source:'NGA',
    timeline:[{time:'09:15',event:'위성 열영상: TEL 4기 노출 확인'},{time:'전일 18:30',event:'연료주입 차량 집결 포착'}]},
  { id:'n02',layer:'nuclear',lat:39.0,lon:126.5,labelKo:'영변 핵단지',country:'🇰🇵 북한',severity:'CRITICAL',desc:'플루토늄·우라늄 농축 동시 운영. 5MW 원자로 재가동.',lastUpdate:'1시간 전',source:'IAEA/38North'},
  { id:'n03',layer:'nuclear',lat:32.0,lon:53.0,labelKo:'이란 나탄즈·포르도',country:'🇮🇷 이란',severity:'CRITICAL',desc:'우라늄 60% 농축 진행. 핵 개발 임계 1~2개월 추정.',lastUpdate:'2시간 전',source:'IAEA'},
  { id:'n04',layer:'nuclear',lat:42.6,lon:74.8,labelKo:'러시아 ICBM 기지 (시베리아)',country:'🇷🇺 러시아',severity:'CRITICAL',desc:'사르마트 ICBM 전진 배치. 핵 태세 격상 신호.',lastUpdate:'현재',source:'FAS/SIPRI'},
  { id:'n05',layer:'nuclear',lat:29.0,lon:71.0,labelKo:'파키스탄 핵 시설',country:'🇵🇰 파키스탄',severity:'HIGH',desc:'핵탄두 160~170발. 인도와 긴장 상시.',lastUpdate:'현재',source:'SIPRI'},
  { id:'n06',layer:'nuclear',lat:28.0,lon:75.0,labelKo:'인도 핵 시설',country:'🇮🇳 인도',severity:'HIGH',desc:'핵탄두 170발. 아그니-V ICBM 전력화.',lastUpdate:'현재',source:'SIPRI'},
  { id:'cy01',layer:'cyber',lat:55.7,lon:37.6,labelKo:'APT28/29 (러시아)',country:'🇷🇺 러시아',severity:'CRITICAL',desc:'NATO 회원국 정부·인프라 사이버 공격 급증. 선거 개입.',lastUpdate:'14분 전',source:'CISA'},
  { id:'cy02',layer:'cyber',lat:39.9,lon:116.4,labelKo:'Volt Typhoon (중국)',country:'🇨🇳 중국',severity:'CRITICAL',desc:'미국 핵심 인프라 침투. 수도·전력·통신 사전 포지셔닝.',lastUpdate:'31분 전',source:'FBI/NSA'},
  { id:'cy03',layer:'cyber',lat:39.0,lon:125.7,labelKo:'라자루스 그룹 (북한)',country:'🇰🇵 북한',severity:'HIGH',desc:'가상화폐 탈취 2024년 $1.4B. 방산 기술 해킹.',lastUpdate:'1시간 전',source:'US Treasury'},
  { id:'cy04',layer:'cyber',lat:32.0,lon:53.0,labelKo:'IRGC 사이버 사령부',country:'🇮🇷 이란',severity:'HIGH',desc:'이스라엘·사우디 인프라 공격. OT/SCADA 타겟.',lastUpdate:'2시간 전',source:'CISA'},
  { id:'m01',layer:'military',lat:23.0,lon:115.0,labelKo:'중국 대만해협 훈련',country:'🇨🇳 중국',severity:'CRITICAL',desc:'PLA 동부전구 대규모 훈련. 항모 2척+전투기 150기+잠수함 8척.',lastUpdate:'19분 전',source:'INDOPACOM',
    timeline:[{time:'08:00',event:'항모 산둥함 바시 해협 통과'},{time:'06:30',event:'J-20 4대 대만 ADIZ 진입'},{time:'05:15',event:'Type 055 구축함 전투형태 진형'}]},
  { id:'m02',layer:'military',lat:70.0,lon:30.0,labelKo:'러시아 Tu-160 북극 초계',country:'🇷🇺 러시아',severity:'HIGH',desc:'Tu-160 화이트 스완 북극 순항. NATO 요격기 발진.',lastUpdate:'41분 전',source:'Norwegian AF'},
  { id:'m03',layer:'military',lat:37.5,lon:127.0,labelKo:'한미 연합훈련',country:'🇰🇷🇺🇸 한미',severity:'MED',desc:'Freedom Shield 연합훈련. 항모전단+핵잠수함 참가.',lastUpdate:'현재',source:'ROK JCS'},
  { id:'m04',layer:'military',lat:12.5,lon:45.0,labelKo:'후티 홍해 선박 공격',country:'🇾🇪 후티',severity:'HIGH',desc:'상선 100척+ 공격. 이스라엘·미국 반격 공습.',lastUpdate:'35분 전',source:'CENTCOM'},
  { id:'h01',layer:'hotspots',lat:23.0,lon:120.0,labelKo:'대만해협',country:'🇨🇳🇹🇼 중국/대만',severity:'CRITICAL',desc:'세계 최고 위험 지역. 중국 통일 압박 vs 대만 주권.',lastUpdate:'현재',source:'CFR'},
  { id:'h02',layer:'hotspots',lat:38.0,lon:128.0,labelKo:'한반도 DMZ',country:'🇰🇵🇰🇷 남북한',severity:'CRITICAL',desc:'북한 ICBM 고도화. 러북 군사협력 심화.',lastUpdate:'현재',source:'38North'},
  { id:'h03',layer:'hotspots',lat:27.0,lon:89.0,labelKo:'인도-중국 LAC',country:'🇮🇳🇨🇳 인도/중국',severity:'HIGH',desc:'실제통제선 군사 대치. 갈완 계곡 긴장.',lastUpdate:'현재',source:'India MOD'},
  { id:'h04',layer:'hotspots',lat:10.0,lon:109.0,labelKo:'남중국해',country:'🇨🇳 중국 vs ASEAN',severity:'HIGH',desc:'중국 인공섬 군사화. 필리핀-중국 해양 충돌.',lastUpdate:'현재',source:'CSIS'},
  { id:'h05',layer:'hotspots',lat:26.0,lon:57.0,labelKo:'호르무즈 해협',country:'🇮🇷 이란',severity:'HIGH',desc:'전세계 석유 20% 통과. 봉쇄 위협.',lastUpdate:'현재',source:'EIA'},
  { id:'e01',layer:'economic',lat:1.3,lon:104.0,labelKo:'말라카 해협',country:'🇸🇬🇲🇾 싱가포르',severity:'HIGH',desc:'교역량 25% 통과. 중국 석유 80% 의존.',lastUpdate:'현재',source:'IMO'},
  { id:'e02',layer:'economic',lat:12.5,lon:43.5,labelKo:'밥엘만데브 해협',country:'🇩🇯 지부티',severity:'CRITICAL',desc:'후티 공격으로 수에즈 이용 40% 감소.',lastUpdate:'현재',source:'Lloyd\'s'},
  { id:'e03',layer:'economic',lat:30.5,lon:32.3,labelKo:'수에즈 운하',country:'🇪🇬 이집트',severity:'HIGH',desc:'컨테이너 교역 12% 담당. 우회 비용 급증.',lastUpdate:'현재',source:'SCA'},
  { id:'e04',layer:'economic',lat:9.5,lon:-80.0,labelKo:'파나마 운하',country:'🇵🇦 파나마',severity:'MED',desc:'가뭄으로 통행 40% 감소. 중국 영향력 확대.',lastUpdate:'현재',source:'ACP'},
  { id:'e05',layer:'economic',lat:34.0,lon:130.0,labelKo:'한국해협 SLOC',country:'🇰🇷🇯🇵 한일',severity:'MED',desc:'동북아 에너지·교역 핵심 항로.',lastUpdate:'현재',source:'CSIS'},
  { id:'o01',layer:'outages',lat:52.0,lon:20.0,labelKo:'발트해 케이블 절단',country:'🇵🇱🇫🇮 폴란드/핀란드',severity:'HIGH',desc:'발트해 해저케이블 절단. 러시아 연루 의심. NATO 수사.',lastUpdate:'6시간 전',source:'EU/NATO'},
  { id:'o02',layer:'outages',lat:50.0,lon:30.0,labelKo:'우크라이나 전력망',country:'🇺🇦 우크라이나',severity:'CRITICAL',desc:'러시아 미사일로 전력망 60% 파괴.',lastUpdate:'1시간 전',source:'Ukrenergo'},
  { id:'o03',layer:'outages',lat:37.5,lon:127.0,labelKo:'북한 GPS 교란',country:'🇰🇵 북한→🇰🇷 한국',severity:'HIGH',desc:'수도권·인천공항 GPS 신호 교란 32회.',lastUpdate:'2시간 전',source:'국토교통부'},
]

// ── 실시간 알림 ───────────────────────────────────────────────────────────────
interface Alert { id:string; time:string; layer:LayerId; title:string; severity:Evt['severity']; loc:string }
const ALERT_TEMPLATES: Omit<Alert,'id'|'time'>[] = [
  {layer:'conflicts',title:'우크라이나 드론 공격 — 드니프로 발전소 피격',severity:'CRITICAL',loc:'드니프로'},
  {layer:'military', title:'중국 J-20 편대 대만 ADIZ 진입 확인',severity:'HIGH',loc:'대만 ADIZ'},
  {layer:'nuclear',  title:'영변 원자로 냉각탑 증기 감지 (위성)',severity:'HIGH',loc:'북한 영변'},
  {layer:'cyber',    title:'라자루스 그룹 방산기업 스피어피싱 탐지',severity:'HIGH',loc:'서울'},
  {layer:'hotspots', title:'남중국해 필리핀 해경 선박 중국 차단 사건',severity:'MED',loc:'황옌다오'},
  {layer:'military', title:'러시아 Tu-160 바렌츠해 핵순항 훈련 확인',severity:'MED',loc:'바렌츠해'},
  {layer:'economic', title:'홍해 우회로 컨테이너 운임 전주比 +12%',severity:'MED',loc:'수에즈/희망봉'},
  {layer:'cyber',    title:'Volt Typhoon 미국 괌 전력 인프라 침투 시도',severity:'CRITICAL',loc:'괌'},
  {layer:'outages',  title:'발트해 추가 케이블 이상 신호 탐지',severity:'HIGH',loc:'핀란드만'},
  {layer:'conflicts',title:'가자 지구 북부 교전 재개 — 사망자 발생',severity:'HIGH',loc:'가자 북부'},
  {layer:'military', title:'한미 연합 항모전단 서해 진입',severity:'MED',loc:'서해'},
  {layer:'nuclear',  title:'이란 포르도 원심분리기 IR-6 추가 가동',severity:'CRITICAL',loc:'이란 포르도'},
  {layer:'hotspots', title:'북한 오물 풍선 7시간 동안 600개 이상 살포',severity:'HIGH',loc:'DMZ'},
  {layer:'military', title:'러시아 흑해함대 미사일 발사 준비 동향 포착',severity:'HIGH',loc:'흑해'},
  {layer:'cyber',    title:'APT28 독일 의회 서버 침투 시도 — 차단',severity:'HIGH',loc:'베를린'},
]

const LAND: [number,number][] = [
  [37,126],[37,127],[37,128],[36,127],[36,128],[35,129],[34,128],[35,127],
  [38,125],[38,126],[39,125],[39,126],[40,124],[40,125],[41,125],[41,126],
  [36,138],[36,137],[35,137],[35,136],[35,135],[34,134],[33,131],[32,130],
  [31,131],[33,132],[34,133],[36,136],[37,137],[38,140],[39,141],[40,141],[41,141],[42,142],[43,141],[44,143],[43,144],[26,128],[26,127],[27,128],
  [40,116],[39,117],[38,115],[37,114],[36,114],[35,113],[34,112],[32,112],[30,114],[28,115],[26,113],[24,113],[22,113],[32,120],[33,120],[34,119],
  [35,117],[36,120],[38,117],[39,118],[40,119],[41,121],[42,122],[43,122],[44,123],[45,122],[46,125],[47,124],[48,123],[49,126],[50,128],[45,128],
  [35,104],[36,103],[38,105],[40,107],[42,107],[43,108],[44,109],[46,108],[48,106],[50,100],[30,104],[28,104],[26,102],[24,102],[22,101],[20,100],
  [55,135],[57,137],[58,140],[59,143],[60,142],[61,141],[62,140],[63,143],[50,136],[51,136],[52,137],[53,138],[54,136],[48,135],[47,134],[46,133],[45,132],[44,131],[50,140],[52,141],[54,142],[56,138],[60,150],[62,152],
  [55,37],[56,37],[57,35],[58,34],[59,30],[60,30],[61,28],[62,28],[63,30],[64,40],[65,45],[66,50],[65,55],[64,60],[63,62],[62,65],
  [60,60],[58,58],[56,58],[54,55],[52,53],[50,50],[50,45],[52,45],[54,48],[56,48],[58,50],[60,50],[62,50],[64,52],[55,73],[56,75],[57,72],[58,70],[59,68],[60,65],[62,60],[64,57],[65,60],[66,62],[67,64],[68,67],[69,68],[70,68],
  [42,70],[44,72],[46,74],[48,76],[50,78],[48,80],[46,80],[44,78],[42,72],[40,68],[38,66],[40,64],[42,62],[44,60],[46,62],[48,64],
  [28,77],[26,80],[24,82],[22,80],[20,78],[18,76],[16,74],[14,74],[12,77],[10,78],[8,77],[14,78],[16,80],[18,78],[20,76],[22,72],[24,72],[26,74],[28,72],[30,74],[32,74],
  [20,100],[18,100],[16,100],[14,99],[12,99],[10,99],[8,100],[10,100],[12,101],[14,101],[16,102],[18,104],[20,102],[22,104],[22,106],[20,106],[18,106],[16,108],[14,108],[12,108],[10,107],
  [0,108],[0,110],[0,112],[-2,110],[-2,112],[-2,114],[-4,114],[-4,116],[-6,107],[-6,108],[-6,110],[-6,112],[2,110],[2,112],[4,114],[4,116],
  [35,36],[34,36],[32,36],[30,34],[28,34],[26,36],[24,38],[22,40],[24,42],[26,44],[28,46],[30,48],[32,46],[34,42],[36,40],[38,40],[36,36],[34,38],[32,44],[30,50],[28,48],[24,56],[22,58],[20,58],[18,56],[20,60],[22,60],[24,58],[36,54],[34,50],[32,48],[30,52],
  [36,8],[34,8],[32,10],[30,10],[28,12],[26,14],[24,14],[22,14],[20,14],[18,14],[16,12],[14,12],[12,14],[10,14],[8,14],[6,14],[4,12],[2,12],[0,10],[-2,10],[-4,12],[-6,12],[-8,14],[-10,16],[-12,16],[-14,14],[-16,14],[-18,14],[-20,16],[-22,18],[-24,18],[-26,20],[-28,20],[-30,20],[-32,20],[-34,20],[-34,22],[-32,24],[-30,26],[-28,28],[-26,28],[-24,26],[-22,26],[-20,24],[-18,24],[-16,22],[-14,22],[-12,20],[-10,20],[-8,20],[-6,20],[-4,18],[-2,18],[0,16],[2,16],[4,18],[6,18],[8,18],[10,20],[12,20],[14,22],[16,22],[18,22],[20,22],[22,22],[24,24],[26,24],[28,26],[30,28],[32,28],[34,30],[36,28],[8,4],[6,4],[4,4],[2,4],[0,8],[2,8],[4,8],[6,8],[8,8],[10,8],[12,8],[14,10],
  [48,18],[50,18],[52,18],[54,18],[52,20],[50,20],[48,20],[46,18],[44,18],[42,18],[40,18],[48,16],[50,14],[52,14],[54,14],[56,14],[58,16],[60,18],[62,22],[60,24],[58,26],[56,22],[54,20],[52,22],[50,22],[48,22],[46,20],[44,20],[42,20],[40,20],[40,22],[42,24],[44,24],[46,24],[48,24],[50,24],[52,24],[54,22],[56,24],[58,22],[56,28],[54,28],[52,26],[50,26],[48,26],[46,26],[44,26],[42,26],[42,28],[44,28],[46,28],[48,28],[44,22],[42,22],[40,24],[38,26],[38,22],[38,24],[44,6],[46,6],[48,6],[50,6],[52,8],[54,10],[56,10],[58,10],[60,10],[62,10],[64,12],[66,14],[68,16],[70,20],[68,22],[66,18],[64,18],[62,18],[60,16],[58,14],[56,16],[54,16],[52,12],[50,10],[48,10],[46,10],[44,10],[42,10],[40,10],[42,12],[44,12],[46,12],[48,12],[50,12],[52,10],[54,12],[56,12],[58,12],[38,16],[40,16],[42,16],[44,14],[46,14],[48,14],
  [48,-90],[50,-90],[52,-90],[54,-90],[56,-88],[58,-86],[60,-84],[62,-82],[64,-80],[66,-78],[66,-74],[64,-76],[62,-78],[60,-80],[58,-78],[56,-76],[54,-76],[52,-78],[50,-78],[48,-78],[46,-76],[44,-76],[42,-78],[40,-76],[38,-76],[36,-76],[34,-76],[32,-80],[30,-82],[28,-82],[26,-80],[24,-80],[30,-88],[32,-88],[34,-88],[36,-88],[38,-90],[40,-90],[42,-90],[44,-90],[46,-92],[48,-92],[50,-94],[52,-96],[54,-98],[56,-100],[58,-102],[60,-104],[34,-94],[36,-96],[38,-98],[40,-98],[42,-98],[44,-98],[46,-98],[48,-98],[50,-100],[52,-102],[44,-100],[42,-100],[40,-100],[38,-100],[36,-100],[34,-100],[32,-100],[44,-104],[42,-104],[40,-104],[38,-106],[36,-106],[34,-106],[32,-106],[44,-108],[42,-108],[40,-108],[38,-108],[36,-108],[34,-108],[44,-112],[42,-112],[40,-112],[38,-112],[36,-110],[46,-122],[48,-122],[50,-120],[52,-118],[50,-124],[48,-124],[46,-124],[44,-124],[42,-124],[40,-124],[46,-120],[44,-120],[42,-120],[40,-120],[44,-116],[42,-116],[40,-116],[44,-118],[42,-118],[40,-118],[50,-96],[52,-94],[54,-96],[56,-92],[60,-96],[62,-94],[64,-96],[62,-110],[60,-110],[58,-110],[56,-110],[54,-110],[60,-130],[58,-130],[56,-130],[54,-126],[52,-126],[50,-126],[58,-134],[56,-134],[54,-132],[52,-130],[60,-140],[58,-138],[56,-136],
  [-10,-36],[-12,-38],[-14,-40],[-16,-40],[-18,-40],[-20,-42],[-22,-44],[-24,-46],[-26,-48],[-28,-48],[-30,-50],[-32,-52],[-10,-40],[-8,-36],[-6,-36],[-4,-38],[-2,-44],[10,-62],[12,-72],[14,-88],[16,-90],[18,-92],[20,-90],[22,-88],[24,-82],
  [-28,114],[-26,114],[-24,114],[-22,114],[-20,116],[-18,124],[-16,130],[-14,130],[-12,130],[-14,136],[-12,136],[-14,142],[-16,142],[-18,140],[-20,140],[-22,138],[-24,136],[-26,134],[-28,132],[-30,130],[-32,130],[-34,128],[-34,130],[-32,136],[-30,136],[-28,136],[-26,136],[-24,138],[-22,142],[-24,144],[-26,146],[-28,148],[-30,148],[-32,148],[-34,150],[-36,150],[-38,148],[-40,148],[-38,144],[-36,140],[-38,142],[-36,136],[-34,136],[-32,140],[-30,140],[-28,140],[-26,140],[-24,142],[-22,146],
  [65,-18],[64,-20],[64,-22],[65,-24],[66,-18],[64,-16],[78,16],[80,20],[82,24],[80,28],[78,24],[76,20],
]

function genTime() { return new Date().toLocaleTimeString('ko-KR',{hour12:false,hour:'2-digit',minute:'2-digit',second:'2-digit'}) }
function genDate() { return new Date().toLocaleDateString('ko-KR',{month:'2-digit',day:'2-digit'}) + ' ' + genTime() }

export default function WorldMonitor() {
  const svgRef = useRef<SVGSVGElement>(null)
  const [activeLayers, setActiveLayers] = useState<Set<LayerId>>(new Set(['conflicts','bases','nuclear','cyber','military','hotspots','economic','outages']))
  const [selected, setSelected] = useState<Evt|null>(null)
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [pulse, setPulse] = useState(0)
  const [hovered, setHovered] = useState<string|null>(null)
  const [showTracks, setShowTracks] = useState(true)
  const [trackPhase, setTrackPhase] = useState(0)
  const [filterSev, setFilterSev] = useState<Evt['severity']|'ALL'>('ALL')
  const [cursor, setCursor] = useState<{lat:number;lon:number}|null>(null)
  const [now, setNow] = useState(genDate())
  const [critCount, setCritCount] = useState(0)

  useEffect(() => { const id = setInterval(() => setPulse(p=>p+1), 700); return ()=>clearInterval(id) }, [])
  useEffect(() => { const id = setInterval(() => setTrackPhase(p=>(p+1)%120), 60); return ()=>clearInterval(id) }, [])
  useEffect(() => { const id = setInterval(() => setNow(genDate()), 1000); return ()=>clearInterval(id) }, [])

  // 실시간 경보 생성 (변동 간격)
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    const fire = () => {
      const tpl = ALERT_TEMPLATES[Math.floor(Math.random()*ALERT_TEMPLATES.length)]
      const a: Alert = { ...tpl, id:`al-${Date.now()}`, time: genTime() }
      setAlerts(prev => [a,...prev].slice(0,30))
      setCritCount(c => a.severity==='CRITICAL' ? c+1 : c)
      timer = setTimeout(fire, 4000 + Math.random()*8000)
    }
    timer = setTimeout(fire, 1500)
    return () => clearTimeout(timer)
  }, [])

  const handleSvgMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    const r = svgRef.current!.getBoundingClientRect()
    const x = ((e.clientX-r.left)/r.width)*W, y = ((e.clientY-r.top)/r.height)*H
    setCursor({ lat: 90-(y/H)*180, lon:(x/W)*360-180 })
  }, [])

  const toggleLayer = (id: LayerId) => setActiveLayers(prev => { const n=new Set(prev); n.has(id)?n.delete(id):n.add(id); return n })

  const visible = EVENTS.filter(e => activeLayers.has(e.layer) && (filterSev==='ALL'||e.severity===filterSev))
  const layerColor = (id:LayerId) => LAYERS.find(l=>l.id===id)?.color??'#00d4ff'

  // SEV 카운터
  const sevCount = { CRITICAL: EVENTS.filter(e=>e.severity==='CRITICAL').length, HIGH: EVENTS.filter(e=>e.severity==='HIGH').length, MED: EVENTS.filter(e=>e.severity==='MED').length, LOW: EVENTS.filter(e=>e.severity==='LOW').length }

  return (
    <div className="min-h-screen bg-[#010a14] flex flex-col font-mono">
      {/* ══ TOPBAR ══════════════════════════════════════════════════════════════ */}
      <div className="border-b border-[#00d4ff]/10 bg-[#020c1a] px-4 py-2 flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" />
            <span className="text-[8px] font-black tracking-[0.3em] text-[#00ff88]">LIVE</span>
          </div>
          <div className="w-px h-4 bg-[#0a3050]" />
          <Globe className="w-3.5 h-3.5 text-[#00d4ff]" />
          <span className="text-[9px] font-black tracking-[0.25em] text-white uppercase">K-Defense AI · World Threat Monitor</span>
        </div>
        <div className="flex items-center gap-4 text-[8px]">
          {/* SEV 카운터 */}
          {(Object.entries(sevCount) as [Evt['severity'],number][]).map(([s,n])=>(
            <div key={s} className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full" style={{background:SEV[s]}}/>
              <span style={{color:SEV[s]}} className="font-black">{s}</span>
              <span className="text-[#4a7a9b] font-black">{n}</span>
            </div>
          ))}
          <div className="w-px h-4 bg-[#0a3050]" />
          <span className="text-[#4a7a9b] font-mono">{now} KST</span>
          {critCount > 0 && (
            <div className="flex items-center gap-1 px-2 py-0.5 bg-[#ff2d55]/15 border border-[#ff2d55]/40 animate-pulse">
              <AlertTriangle className="w-2.5 h-2.5 text-[#ff2d55]" />
              <span className="text-[#ff2d55] text-[8px] font-black">CRITICAL ×{critCount}</span>
            </div>
          )}
        </div>
      </div>

      {/* ══ FILTER BAR ══════════════════════════════════════════════════════════ */}
      <div className="border-b border-[#0a2030] bg-[#010d1a] px-4 py-1.5 flex items-center gap-3 shrink-0 overflow-x-auto">
        <div className="flex items-center gap-1 shrink-0">
          <span className="text-[7px] text-[#4a7a9b] tracking-widest uppercase mr-1">레이어</span>
          {LAYERS.map(l => (
            <button key={l.id} onClick={()=>toggleLayer(l.id)}
              className="flex items-center gap-1 px-2 py-0.5 text-[7px] font-black transition-all border"
              style={activeLayers.has(l.id)
                ? {color:l.color,borderColor:`${l.color}40`,background:`${l.color}10`}
                : {color:'#2a4a6a',borderColor:'#0a2030',background:'transparent'}}>
              {l.ko}
            </button>
          ))}
        </div>
        <div className="w-px h-4 bg-[#0a3050] shrink-0" />
        <div className="flex items-center gap-1 shrink-0">
          <span className="text-[7px] text-[#4a7a9b] tracking-widest uppercase mr-1">심각도</span>
          {(['ALL','CRITICAL','HIGH','MED','LOW'] as const).map(s=>(
            <button key={s} onClick={()=>setFilterSev(s)}
              className="px-2 py-0.5 text-[7px] font-black transition-all border"
              style={filterSev===s
                ? {color:'#010a14',background:s==='ALL'?'#00d4ff':SEV[s],borderColor:'transparent'}
                : {color:'#2a4a6a',borderColor:'#0a2030'}}>
              {s==='ALL'?'전체':s}
            </button>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-2 shrink-0">
          <button onClick={()=>setShowTracks(v=>!v)}
            className="flex items-center gap-1 px-2 py-0.5 text-[7px] font-black border transition-all"
            style={showTracks?{color:'#00ff88',borderColor:'#00ff8830',background:'#00ff8810'}:{color:'#2a4a6a',borderColor:'#0a2030'}}>
            <Radio className="w-2.5 h-2.5" /> 이동경로
          </button>
          <span className="text-[7px] text-[#4a7a9b]">{visible.length}개 표시</span>
        </div>
      </div>

      {/* ══ MAIN ════════════════════════════════════════════════════════════════ */}
      <div className="flex-1 flex min-h-0">

        {/* 지도 */}
        <div className="flex-1 relative bg-[#010a14] overflow-hidden">
          <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`}
            className="w-full h-full select-none cursor-crosshair"
            style={{maxHeight:'calc(100vh - 120px)'}}
            onMouseMove={handleSvgMove}
            onMouseLeave={()=>setCursor(null)}>

            {/* 심해색 배경 */}
            <defs>
              <radialGradient id="bgGrad" cx="50%" cy="50%" r="70%">
                <stop offset="0%" stopColor="#021428"/>
                <stop offset="100%" stopColor="#010810"/>
              </radialGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="blur"/>
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>
            <rect width={W} height={H} fill="url(#bgGrad)"/>

            {/* 위경도 그리드 */}
            {[-60,-30,0,30,60].map(lat=>{
              const p=project(lat,-180)
              return <g key={lat}>
                <line x1={0} y1={p.y} x2={W} y2={p.y} stroke="#00d4ff" strokeOpacity="0.05" strokeWidth="0.5"/>
                <text x={4} y={p.y-2} fontSize="5" fill="#0d3550" fontFamily="monospace">{lat>0?'+':''}{lat}°</text>
              </g>
            })}
            {[-150,-120,-90,-60,-30,0,30,60,90,120,150].map(lon=>{
              const p=project(0,lon)
              return <line key={lon} x1={p.x} y1={0} x2={p.x} y2={H} stroke="#00d4ff" strokeOpacity="0.04" strokeWidth="0.5"/>
            })}

            {/* 육지 */}
            {LAND.map(([lat,lon],i)=>{
              const p=project(lat,lon)
              return <rect key={i} x={p.x-1.4} y={p.y-1.4} width={2.8} height={2.8} fill="#0a2035" rx="0.3"/>
            })}

            {/* 이동 경로 */}
            {showTracks && TRACKS.filter(t=>t.active).map(track=>{
              const pts=track.points.map(([la,lo])=>project(la,lo))
              const d=pts.map((p,i)=>`${i===0?'M':'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')
              const prog=(trackPhase/120)
              const sc=pts.length-1
              const si=Math.min(Math.floor(prog*sc),sc-1)
              const sp=(prog*sc)-si
              const p1=pts[si],p2=pts[Math.min(si+1,pts.length-1)]
              const dx=p1.x+(p2.x-p1.x)*sp, dy=p1.y+(p2.y-p1.y)*sp
              const ICONS={NAVAL:'◆',AIR:'▲',MISSILE:'⬟',GROUND:'■'}
              return <g key={track.id}>
                <path d={d} fill="none" stroke={track.color}
                  strokeWidth={track.type==='AIR'?0.7:0.9}
                  strokeDasharray={track.type==='AIR'?'5,3':track.type==='MISSILE'?'3,4':'7,3'}
                  opacity="0.35"/>
                {pts.map((p,i)=><circle key={i} cx={p.x} cy={p.y} r={i===0||i===pts.length-1?2.5:1.2} fill={track.color} opacity={i===0||i===pts.length-1?0.7:0.3}/>)}
                <circle cx={dx} cy={dy} r={8} fill="none" stroke={track.color} strokeWidth="0.5" opacity="0.2"/>
                <circle cx={dx} cy={dy} r={4} fill={`${track.color}30`} stroke={track.color} strokeWidth="1"
                  style={{filter:`drop-shadow(0 0 4px ${track.color})`}}/>
                <text x={dx} y={dy+3.5} textAnchor="middle" fontSize="5" fill={track.color} fontWeight="bold">{ICONS[track.type]}</text>
              </g>
            })}

            {/* 이벤트 마커 */}
            {visible.map(ev=>{
              const p=project(ev.lat,ev.lon)
              const c=SEV[ev.severity], lc=layerColor(ev.layer)
              const isSel=selected?.id===ev.id, isHov=hovered===ev.id
              const po=pulse%2===0
              return <g key={ev.id} onMouseEnter={()=>setHovered(ev.id)} onMouseLeave={()=>setHovered(null)}
                onClick={()=>setSelected(s=>s?.id===ev.id?null:ev)} className="cursor-pointer">
                {ev.severity==='CRITICAL'&&<circle cx={p.x} cy={p.y} r={po?18:13} fill="none" stroke={c} strokeWidth="0.5" opacity={po?0.2:0.08} style={{transition:'r 0.4s ease'}}/>}
                {(isSel||isHov||ev.severity==='CRITICAL')&&<circle cx={p.x} cy={p.y} r={po?12:9} fill="none" stroke={c} strokeWidth="0.7" opacity={po?0.35:0.15} style={{transition:'r 0.4s ease'}}/>}
                <circle cx={p.x} cy={p.y} r={isSel||isHov?6:4.5}
                  fill={`${c}20`} stroke={c} strokeWidth={isSel?2:1}
                  style={{filter:`drop-shadow(0 0 ${isSel?8:4}px ${c})`,transition:'r 0.15s'}}/>
                <circle cx={p.x} cy={p.y} r={2} fill={lc} opacity={0.9}/>
                {(isHov||isSel)&&<g>
                  <rect x={p.x+8} y={p.y-8} width={ev.labelKo.length*5.8+8} height={16} rx="2" fill="#020c1a" stroke={c} strokeWidth="0.5" opacity="0.97"/>
                  <text x={p.x+12} y={p.y+3} fontSize="7.5" fill={c} fontWeight="bold" fontFamily="monospace">{ev.labelKo}</text>
                </g>}
              </g>
            })}
          </svg>

          {/* 좌하단 좌표 */}
          <div className="absolute bottom-2 left-2 text-[7px] font-mono text-[#1a3a50] pointer-events-none">
            {cursor ? `${cursor.lat.toFixed(3)}°${cursor.lat>=0?'N':'S'} ${Math.abs(cursor.lon).toFixed(3)}°${cursor.lon>=0?'E':'W'}` : 'CURSOR —'}
          </div>

          {/* 범례 */}
          <div className="absolute bottom-2 right-2 flex items-center gap-3 bg-[#010d1a]/90 border border-[#0a2030] px-3 py-1.5 backdrop-blur">
            {(Object.entries(SEV) as [Evt['severity'],string][]).map(([s,c])=>(
              <div key={s} className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full" style={{background:c}}/>
                <span className="text-[6px] font-mono" style={{color:c}}>{s}</span>
              </div>
            ))}
          </div>

          {/* 스캔 라인 효과 */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background:'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,212,255,0.008) 2px, rgba(0,212,255,0.008) 4px)',
          }}/>
        </div>

        {/* ══ 우측 패널 ══ */}
        <div className="w-72 border-l border-[#0a2030] bg-[#010c18] flex flex-col overflow-hidden">

          {/* 선택 이벤트 상세 */}
          <AnimatePresence>
            {selected && (
              <motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}} exit={{opacity:0,height:0}}
                className="border-b border-[#0a2030] overflow-hidden shrink-0">
                <div className="h-0.5" style={{background:SEV[selected.severity]}}/>
                <div className="p-3 max-h-64 overflow-y-auto">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                        <span className="text-[6px] font-black px-1.5 py-0.5 font-mono"
                          style={{color:layerColor(selected.layer),background:`${layerColor(selected.layer)}15`}}>
                          {LAYERS.find(l=>l.id===selected.layer)?.ko?.toUpperCase()}
                        </span>
                        <span className="text-[6px] font-black px-1.5 py-0.5"
                          style={{color:SEV[selected.severity],background:`${SEV[selected.severity]}15`}}>
                          {selected.severity}
                        </span>
                      </div>
                      <div className="text-[11px] font-black text-white">{selected.labelKo}</div>
                      <div className="text-[8px] text-[#4a7a9b]">{selected.country}</div>
                    </div>
                    <button onClick={()=>setSelected(null)} className="text-[#2a4a6a] hover:text-white">
                      <X className="w-3 h-3"/>
                    </button>
                  </div>
                  <p className="text-[8px] text-[#6a9ab8] leading-relaxed mb-2">{selected.desc}</p>
                  <div className="space-y-0.5 text-[7px] mb-2">
                    {selected.casualties&&<div className="flex justify-between py-0.5 border-b border-[#0a2030]">
                      <span className="text-[#4a7a9b]">피해</span><span className="text-[#ff6b35] font-black">{selected.casualties}</span></div>}
                    <div className="flex justify-between py-0.5 border-b border-[#0a2030]">
                      <span className="text-[#4a7a9b]">좌표</span>
                      <span className="text-[#00d4ff] font-mono">{selected.lat.toFixed(2)}°{selected.lat>=0?'N':'S'} {Math.abs(selected.lon).toFixed(2)}°{selected.lon>=0?'E':'W'}</span></div>
                    <div className="flex justify-between py-0.5 border-b border-[#0a2030]">
                      <span className="text-[#4a7a9b]">업데이트</span><span className="text-[#00ff88]">{selected.lastUpdate}</span></div>
                    {selected.source&&<div className="flex justify-between py-0.5">
                      <span className="text-[#4a7a9b]">출처</span><span className="text-[#4a7a9b]">{selected.source}</span></div>}
                  </div>
                  {selected.timeline&&selected.timeline.length>0&&(
                    <div>
                      <div className="text-[6px] font-black tracking-widest text-[#00d4ff] mb-1.5 flex items-center gap-1">
                        <Clock className="w-2 h-2"/> TIMELINE
                      </div>
                      <div className="space-y-1.5 relative pl-3">
                        <div className="absolute left-[4px] top-0 bottom-0 w-px bg-[#0a2030]"/>
                        {selected.timeline.map((item,i)=>(
                          <div key={i} className="relative">
                            <div className="absolute -left-[9px] top-[3px] w-[5px] h-[5px] rounded-full bg-[#00d4ff]/50 border border-[#00d4ff]/30"/>
                            <div className="text-[6px] font-mono text-[#1a3a50]">{item.time}</div>
                            <div className="text-[7px] text-[#6a9ab8]">{item.event}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {/* 연관 이동경로 */}
                  {(() => {
                    const rel=TRACKS.filter(t=>t.active&&t.points.some(([la,lo])=>Math.abs(la-selected.lat)<6&&Math.abs(lo-selected.lon)<10))
                    if(!rel.length) return null
                    return <div className="mt-2">
                      <div className="text-[6px] font-black tracking-widest text-[#00ff88] mb-1 flex items-center gap-1">
                        <Radio className="w-2 h-2"/> 인근 이동경로
                      </div>
                      {rel.map(t=><div key={t.id} className="flex items-center gap-1.5 text-[7px] py-0.5 border-b border-[#0a2030]/50">
                        <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{background:t.color}}/>
                        <span className="text-[#6a9ab8] flex-1 truncate">{t.ko}</span>
                        <span className="text-[#2a4a6a]">{t.speed}</span>
                      </div>)}
                    </div>
                  })()}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 실시간 알림 피드 */}
          <div className="flex items-center justify-between px-3 py-1.5 border-b border-[#0a2030] shrink-0">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse"/>
              <span className="text-[7px] font-black tracking-widest text-[#4a7a9b]">LIVE FEED</span>
            </div>
            <span className="text-[6px] text-[#2a4a6a] font-mono">{alerts.length}건</span>
          </div>

          <div className="flex-1 overflow-y-auto">
            {alerts.map((a,i)=>{
              const lc=layerColor(a.layer)
              const L=LAYERS.find(l=>l.id===a.layer)
              const Icon=L?.icon??AlertTriangle
              return (
                <motion.div key={a.id} initial={i===0?{opacity:0,x:20}:false} animate={{opacity:1,x:0}} transition={{duration:0.25}}
                  className="flex gap-2 px-3 py-2 border-b border-[#0a2030]/50 hover:bg-[#00d4ff]/3 transition-all">
                  <div className="shrink-0 mt-0.5" style={{color:lc}}>
                    <Icon className="w-3 h-3"/>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 mb-0.5">
                      <span className="text-[6px] font-black px-1 py-0.5" style={{color:SEV[a.severity],background:`${SEV[a.severity]}15`}}>{a.severity}</span>
                      <span className="text-[6px] text-[#1a3a50] font-mono ml-auto">{a.time}</span>
                    </div>
                    <div className="text-[8px] text-[#8ab8d4] font-bold leading-tight">{a.title}</div>
                    <div className="text-[6px] text-[#2a4a6a] mt-0.5 flex items-center gap-1">
                      <MapPin className="w-2 h-2"/>{a.loc}
                    </div>
                  </div>
                </motion.div>
              )
            })}
            {alerts.length===0&&(
              <div className="flex flex-col items-center justify-center h-32 text-[#1a3a50]">
                <Eye className="w-5 h-5 mb-2"/>
                <span className="text-[8px]">신호 대기 중...</span>
              </div>
            )}
          </div>

          {/* 하단 통계 */}
          <div className="border-t border-[#0a2030] p-3 shrink-0">
            <div className="text-[6px] font-black tracking-widest text-[#4a7a9b] mb-2 flex items-center gap-1">
              <BarChart3 className="w-2.5 h-2.5"/> THREAT DISTRIBUTION
            </div>
            <div className="space-y-1.5">
              {LAYERS.map(l=>{
                const cnt=EVENTS.filter(e=>e.layer===l.id).length
                const pct=(cnt/Math.max(EVENTS.length,1))*100
                return <div key={l.id} className="flex items-center gap-2">
                  <div className="w-12 text-[6px] font-mono shrink-0" style={{color:l.color}}>{l.ko}</div>
                  <div className="flex-1 h-1 bg-[#0a2030] rounded-full">
                    <div className="h-full rounded-full transition-all" style={{width:`${pct}%`,background:l.color}}/>
                  </div>
                  <div className="text-[6px] font-mono text-[#4a7a9b] w-4 text-right">{cnt}</div>
                </div>
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ══ 하단 스크롤 티커 ════════════════════════════════════════════════════ */}
      <div className="border-t border-[#0a2030] bg-[#010c18] py-1 overflow-hidden shrink-0 flex items-center gap-2">
        <div className="flex items-center gap-1 px-3 shrink-0">
          <TrendingUp className="w-2.5 h-2.5 text-[#ff2d55]"/>
          <span className="text-[6px] text-[#ff2d55] font-black tracking-widest">BREAKING</span>
        </div>
        <div className="flex items-center gap-0 overflow-hidden flex-1">
          <div className="flex items-center gap-0 animate-[scroll_50s_linear_infinite] whitespace-nowrap">
            {[...EVENTS,...EVENTS].map((e,i)=>(
              <span key={i} className="flex items-center gap-2 px-5 text-[7px] border-r border-[#0a2030] font-mono">
                <span className="font-black" style={{color:SEV[e.severity]}}>{e.severity}</span>
                <span className="text-[#6a9ab8]">{e.labelKo}</span>
                <span className="text-[#2a4a6a]">{e.country}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
