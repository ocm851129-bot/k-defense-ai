import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Cpu, Layers, Wifi, Server, Cloud, Zap, Building,
  Radio, X, Activity, BarChart3, Database, Cable, AlertTriangle,
} from 'lucide-react'

// ── 투영 ─────────────────────────────────────────────────────────────────────
const W = 1000, H = 480
const project = (lat: number, lon: number) => ({
  x: ((lon + 180) / 360) * W,
  y: ((90 - lat) / 180) * H,
})

// ── 레이어 정의 ───────────────────────────────────────────────────────────────
export type TechLayerId = 'cables' | 'outages' | 'datacenters' | 'cloudRegions' | 'techHQs' | 'startupHubs' | 'natural'

const TECH_LAYERS: { id: TechLayerId; label: string; color: string; icon: React.ElementType; ko: string }[] = [
  { id: 'cables',      label: 'Sub.Cables',   color: '#00d4ff', icon: Cable,         ko: '해저케이블' },
  { id: 'outages',     label: 'Outages',       color: '#ff2d55', icon: Wifi,          ko: '인프라장애' },
  { id: 'datacenters', label: 'Data Centers',  color: '#00ff88', icon: Server,        ko: '데이터센터' },
  { id: 'cloudRegions',label: 'Cloud Regions', color: '#38bdf8', icon: Cloud,         ko: '클라우드' },
  { id: 'techHQs',     label: 'Tech HQs',      color: '#c084fc', icon: Building,      ko: '빅테크 HQ' },
  { id: 'startupHubs', label: 'Startup Hubs',  color: '#ffcc00', icon: Zap,           ko: '스타트업 허브' },
  { id: 'natural',     label: 'Natural/Risk',  color: '#ff6b35', icon: AlertTriangle, ko: '자연재해' },
]

// ── 이벤트 ───────────────────────────────────────────────────────────────────
interface TechEvent {
  id: string
  layer: TechLayerId
  lat: number; lon: number
  label: string; labelKo: string
  country: string
  severity: 'CRITICAL' | 'HIGH' | 'MED' | 'LOW'
  desc: string
  lastUpdate: string
  detail?: string
  source?: string
}

const SEV_COLOR = { CRITICAL: '#ff2d55', HIGH: '#ff6b35', MED: '#ffcc00', LOW: '#94a3b8' }

const TECH_EVENTS: TechEvent[] = [
  // ── 해저 케이블 ──────────────────────────────────────────────────────────
  { id:'ca001', layer:'cables', lat:52.0, lon:3.0,   label:'BT-Denmark (North Sea)',     labelKo:'북해 해저케이블',         country:'🇬🇧🇩🇰 영국/덴마크', severity:'MED',  desc:'영국-덴마크 구간 해저 통신케이블. NTELOS 포함 유럽 백본.', lastUpdate:'현재', source:'TeleGeography' },
  { id:'ca002', layer:'cables', lat:36.0, lon:-8.0,  label:'FLAG Atlantic-1',            labelKo:'대서양 FLAG 케이블',       country:'🌐 국제', severity:'HIGH', desc:'북미-유럽 핵심 해저 케이블. 전 세계 인터넷 트래픽 35% 처리.', lastUpdate:'현재', source:'ICPC' },
  { id:'ca003', layer:'cables', lat:24.0, lon:60.0,  label:'SEA-ME-WE 5',               labelKo:'SMW5 해저케이블',         country:'🌐 국제', severity:'HIGH', desc:'동남아-중동-서유럽 연결 해저 케이블 시스템. 20,000km.', lastUpdate:'현재', source:'SEA-ME-WE' },
  { id:'ca004', layer:'cables', lat:4.0,  lon:108.0, label:'Asia-America Gateway',       labelKo:'AAG 해저케이블',          country:'🌐 국제', severity:'MED',  desc:'동남아-미국 연결 해저케이블. 한국·일본·홍콩 포함.', lastUpdate:'현재', source:'AAG' },
  { id:'ca005', layer:'cables', lat:24.0, lon:130.0, label:'Pacific Light Cable Network',labelKo:'PLCN 태평양 케이블',     country:'🌐 국제', severity:'MED',  desc:'미국-홍콩 직접 연결 케이블. 구글·페이스북 소유.', lastUpdate:'현재', source:'FCC' },
  { id:'ca006', layer:'cables', lat:35.0, lon:30.0,  label:'Red Sea → Suez Cable',      labelKo:'홍해-수에즈 케이블',     country:'🌐 국제', severity:'CRITICAL', desc:'후티 공격으로 4개 해저케이블 손상. 중동-유럽 인터넷 25% 저하. 복구 작업 중.', lastUpdate:'12시간 전', source:'TeleGeography', detail:'2024년 2월 후티 반군 공격으로 EIG, AAE-1, Seacom, TGN 손상. 수리선 파견 중.' },
  { id:'ca007', layer:'cables', lat:57.0, lon:20.0,  label:'Baltic Sea Cable Cuts',      labelKo:'발트해 케이블 절단',      country:'🇵🇱🇫🇮🇸🇪 폴란드/핀란드/스웨덴', severity:'CRITICAL', desc:'C-Lion1·BCS East-West Interlink 절단. 러시아 연루 의심. NATO 수사.', lastUpdate:'3일 전', source:'EU/NATO', detail:'2024년 10월~11월 중국 선박 추정 의도적 절단. SWIFT 화물선 추적 중.' },
  { id:'ca008', layer:'cables', lat:36.0, lon:128.0, label:'Korea-Japan Cable Network',  labelKo:'한일 해저케이블',        country:'🇰🇷🇯🇵 한국/일본', severity:'MED', desc:'한국-일본 간 총 14개 해저케이블 운용 중. SKB·KT·KDDI 소유.', lastUpdate:'현재', source:'NIA' },
  { id:'ca009', layer:'cables', lat:51.0, lon:-30.0, label:'MAREA (Microsoft+Facebook)', labelKo:'MAREA 대서양 케이블',    country:'🌐 국제', severity:'MED',  desc:'마이크로소프트·페이스북 소유 대서양 케이블. 대역폭 160Tbps.', lastUpdate:'현재', source:'Microsoft' },
  { id:'ca010', layer:'cables', lat:-35.0, lon:25.0, label:'SEACOM (Africa East)',        labelKo:'씨컴 아프리카 동해안',  country:'🌍 아프리카', severity:'MED',  desc:'동아프리카 해안 주요 인터넷 케이블. 인도양 경유.', lastUpdate:'현재', source:'SEACOM' },

  // ── 인프라 장애 ──────────────────────────────────────────────────────────
  { id:'out001', layer:'outages', lat:50.0, lon:30.0,   label:'Ukraine Power/Net Outage', labelKo:'우크라이나 인프라 장애', country:'🇺🇦 우크라이나', severity:'CRITICAL', desc:'러시아 미사일 공격으로 전력망 60% 파괴. 인터넷 40% 다운. 발전소 반복 공습.', lastUpdate:'45분 전', source:'NetBlocks/Ukrenergo' },
  { id:'out002', layer:'outages', lat:23.0, lon:120.0,  label:'Taiwan ADIZ Tensions → Net', labelKo:'대만 중국 사이버 장애', country:'🇹🇼 대만', severity:'HIGH', desc:'PLA 훈련 기간 대만 정부 기관 DDoS 급증. BGP 하이재킹 시도.', lastUpdate:'2시간 전', source:'Taiwan NCC' },
  { id:'out003', layer:'outages', lat:35.5, lon:50.0,   label:'Iran Internet Throttling',  labelKo:'이란 인터넷 규제',      country:'🇮🇷 이란', severity:'HIGH', desc:'이란 정부 인터넷 속도 75% 강제 제한. VPN 차단 강화. 시위 진압 연관.', lastUpdate:'3시간 전', source:'NetBlocks' },
  { id:'out004', layer:'outages', lat:37.5, lon:127.0,  label:'DPRK GPS Jamming → Korea',  labelKo:'북한 GPS 교란 (한국)', country:'🇰🇵 북한→🇰🇷 한국', severity:'HIGH', desc:'수도권·인천공항 GPS 신호 교란. 이번 주 32회. 드론 항법 장애.', lastUpdate:'1시간 전', source:'국토교통부' },
  { id:'out005', layer:'outages', lat:25.0, lon:57.0,   label:'Hormuz Cable Risk Zone',    labelKo:'호르무즈 케이블 위험', country:'🇮🇷 이란', severity:'HIGH', desc:'이란 핵 협상 결렬 시 해저케이블 차단 위협. 중동 전체 인터넷 영향 가능.', lastUpdate:'현재', source:'CSIS' },
  { id:'out006', layer:'outages', lat:9.0,  lon:-11.0,  label:'West Africa Internet Crisis', labelKo:'서아프리카 케이블 장애', country:'🌍 서아프리카', severity:'HIGH', desc:'Mainone·WACS·SAT-3 동시 장애. 서아프리카 14개국 인터넷 50~70% 차단.', lastUpdate:'5일 전', source:'AfriNIC' },

  // ── 데이터센터 ────────────────────────────────────────────────────────────
  { id:'dc001', layer:'datacenters', lat:37.5,  lon:-122.0, label:'Silicon Valley DCs',     labelKo:'실리콘밸리 데이터센터', country:'🇺🇸 미국', severity:'MED',  desc:'Google·Meta·Apple 핵심 데이터센터 클러스터. 글로벌 AI 트레이닝 허브.', lastUpdate:'현재', source:'Datacenter Map' },
  { id:'dc002', layer:'datacenters', lat:47.6,  lon:-122.3, label:'Seattle (AWS/Microsoft)', labelKo:'시애틀 데이터센터',    country:'🇺🇸 미국', severity:'MED',  desc:'AWS us-east-1·us-west-2·Microsoft Azure 서부 허브. 알래스카케이블 연결.', lastUpdate:'현재', source:'AWS' },
  { id:'dc003', layer:'datacenters', lat:51.5,  lon:-0.1,   label:'London Docklands DCs',   labelKo:'런던 도클랜즈 DC',    country:'🇬🇧 영국', severity:'MED',  desc:'유럽 최대 DC 허브. Equinix LD4~LD10. 유럽 금융거래 70% 처리.', lastUpdate:'현재', source:'Uptime Institute' },
  { id:'dc004', layer:'datacenters', lat:52.3,  lon:4.9,    label:'AMS-IX / Amsterdam DCs', labelKo:'암스테르담 인터넷 교환', country:'🇳🇱 네덜란드', severity:'MED',  desc:'AMS-IX: 세계 최대 인터넷 교환 포인트. 피크 트래픽 9.5 Tbps 이상.', lastUpdate:'현재', source:'AMS-IX' },
  { id:'dc005', layer:'datacenters', lat:35.7,  lon:139.7,  label:'Tokyo/Osaka DC Clusters', labelKo:'도쿄/오사카 데이터센터', country:'🇯🇵 일본', severity:'MED',  desc:'아시아태평양 최대 DC 클러스터. Equinix TY 시리즈. 환태평양 허브.', lastUpdate:'현재', source:'Datacenter Map' },
  { id:'dc006', layer:'datacenters', lat:37.5,  lon:127.0,  label:'Seoul IT Complex',        labelKo:'서울 IT 데이터센터',  country:'🇰🇷 한국', severity:'MED',  desc:'SK텔레콤·KT·네이버 데이터센터 클러스터. 동북아 AI 인프라 허브.', lastUpdate:'현재', source:'KISA' },
  { id:'dc007', layer:'datacenters', lat:1.3,   lon:103.8,  label:'Singapore Jurong DC Hub', labelKo:'싱가포르 DC 허브',    country:'🇸🇬 싱가포르', severity:'MED',  desc:'동남아 인터넷 허브. 전력 제한 정책으로 신규 건설 중단 (2019~).', lastUpdate:'현재', source:'BroadGroup' },
  { id:'dc008', layer:'datacenters', lat:25.2,  lon:55.3,   label:'Dubai/UAE Cloud Hub',     labelKo:'두바이 클라우드 허브', country:'🇦🇪 UAE', severity:'MED',  desc:'중동 AI·클라우드 허브. Microsoft+G42 공동 투자 $1.5B. 중동-아프리카 확장 거점.', lastUpdate:'현재', source:'G42/Microsoft' },

  // ── 클라우드 리전 ─────────────────────────────────────────────────────────
  { id:'cl001', layer:'cloudRegions', lat:39.0,  lon:-77.5,  label:'AWS us-east-1 (Virginia)', labelKo:'AWS 버지니아 리전',  country:'🇺🇸 미국', severity:'HIGH', desc:'세계 최대 클라우드 리전. S3·EC2·Lambda 글로벌 트래픽 40% 처리. 장애 시 전세계 영향.', lastUpdate:'현재', source:'AWS' },
  { id:'cl002', layer:'cloudRegions', lat:51.5,  lon:-0.1,   label:'Azure UK South',           labelKo:'Azure 영국 리전',   country:'🇬🇧 영국', severity:'MED',  desc:'MS Azure 유럽 핵심 리전. NATO·UK 정부 클라우드 계약.', lastUpdate:'현재', source:'Microsoft' },
  { id:'cl003', layer:'cloudRegions', lat:52.5,  lon:13.4,   label:'GCP europe-west3',         labelKo:'GCP 독일 프랑크푸르트', country:'🇩🇪 독일', severity:'MED',  desc:'구글 클라우드 유럽 허브. GDPR 컴플라이언트 데이터 처리.', lastUpdate:'현재', source:'Google Cloud' },
  { id:'cl004', layer:'cloudRegions', lat:35.7,  lon:139.7,  label:'AWS ap-northeast-1',       labelKo:'AWS 도쿄 리전',     country:'🇯🇵 일본', severity:'MED',  desc:'아시아태평양 AWS 핵심 리전. 일본 정부·금융 서비스 핵심 인프라.', lastUpdate:'현재', source:'AWS' },
  { id:'cl005', layer:'cloudRegions', lat:37.5,  lon:127.0,  label:'Naver Cloud / AWS Seoul',  labelKo:'서울 클라우드 리전', country:'🇰🇷 한국', severity:'MED',  desc:'AWS ap-northeast-2·네이버클라우드 서울. K-방산·정부 클라우드 핵심.', lastUpdate:'현재', source:'NIPA' },
  { id:'cl006', layer:'cloudRegions', lat:22.5,  lon:114.0,  label:'Alibaba Cloud HK/SZ',      labelKo:'알리바바 홍콩 리전', country:'🇨🇳🇭🇰 중국/홍콩', severity:'HIGH', desc:'중국·홍콩 최대 클라우드. 동남아·아프리카 확장 중. 보안 우려 제기.', lastUpdate:'현재', source:'Alibaba Cloud' },
  { id:'cl007', layer:'cloudRegions', lat:28.6,  lon:77.2,   label:'AWS ap-south-1 (Mumbai)',  labelKo:'AWS 뭄바이 리전',    country:'🇮🇳 인도', severity:'MED',  desc:'인도 클라우드 시장 급성장. AWS·Azure·GCP 동시 확장.', lastUpdate:'현재', source:'AWS' },

  // ── 빅테크 HQ ─────────────────────────────────────────────────────────────
  { id:'hq001', layer:'techHQs', lat:37.5,  lon:-122.0, label:'Google / Alphabet HQ',        labelKo:'구글 본사 (마운틴뷰)', country:'🇺🇸 미국', severity:'LOW',  desc:'구글 본사. Gemini Ultra AI·Google Cloud·YouTube 운영 센터.', lastUpdate:'현재', source:'Google' },
  { id:'hq002', layer:'techHQs', lat:47.6,  lon:-122.3, label:'Microsoft HQ',                 labelKo:'마이크로소프트 본사 (레드먼드)', country:'🇺🇸 미국', severity:'LOW',  desc:'MS 본사. Azure·OpenAI 파트너십·Copilot AI 개발 허브.', lastUpdate:'현재', source:'Microsoft' },
  { id:'hq003', layer:'techHQs', lat:37.3,  lon:-122.0, label:'Apple Park',                   labelKo:'애플 본사 (쿠퍼티노)', country:'🇺🇸 미국', severity:'LOW',  desc:'Apple 본사. iPhone·Mac·AI 개발 및 공급망 관리 센터.', lastUpdate:'현재', source:'Apple' },
  { id:'hq004', layer:'techHQs', lat:40.7,  lon:-74.0,  label:'IBM / Meta NY',                labelKo:'IBM·메타 (뉴욕)', country:'🇺🇸 미국', severity:'LOW',  desc:'IBM Quantum·Meta Reality Labs 동부 거점.', lastUpdate:'현재', source:'IBM/Meta' },
  { id:'hq005', layer:'techHQs', lat:39.9,  lon:116.4,  label:'Baidu / ByteDance / Tencent', labelKo:'바이두·바이트댄스·텐센트 (베이징/선전)', country:'🇨🇳 중국', severity:'HIGH', desc:'중국 AI 3대 기업. Ernie Bot·TikTok AI·Wechat 운영. 정부 AI 전략 연계.', lastUpdate:'현재', source:'SCMP' },
  { id:'hq006', layer:'techHQs', lat:35.7,  lon:139.7,  label:'SoftBank / Sony HQ (Tokyo)',   labelKo:'소프트뱅크·소니 (도쿄)', country:'🇯🇵 일본', severity:'LOW',  desc:'소프트뱅크 AI 투자(Arm·OpenAI)·소니 반도체 전략 본부.', lastUpdate:'현재', source:'SoftBank' },
  { id:'hq007', layer:'techHQs', lat:37.5,  lon:127.0,  label:'Samsung / SK Hynix HQ',        labelKo:'삼성·SK하이닉스 (수원/이천)', country:'🇰🇷 한국', severity:'MED',  desc:'반도체 세계 1·2위. HBM·DRAM·NAND AI 가속기 공급망 핵심.', lastUpdate:'현재', source:'KIET' },
  { id:'hq008', layer:'techHQs', lat:12.9,  lon:77.6,   label:'Infosys / Wipro (Bangalore)',  labelKo:'인도 IT 대기업 (방갈로르)', country:'🇮🇳 인도', severity:'LOW',  desc:'글로벌 IT 서비스 허브. 빅테크 R&D 센터 300+. AI 인력 공급 기지.', lastUpdate:'현재', source:'NASSCOM' },
  { id:'hq009', layer:'techHQs', lat:51.5,  lon:-0.1,   label:'DeepMind / ARM HQ (London)',   labelKo:'딥마인드·ARM (런던)', country:'🇬🇧 영국', severity:'MED',  desc:'구글 딥마인드 AI 연구. ARM Holdings 반도체 설계 본부.', lastUpdate:'현재', source:'TechCrunch' },
  { id:'hq010', layer:'techHQs', lat:52.5,  lon:13.4,   label:'SAP HQ (Berlin/Walldorf)',     labelKo:'SAP 본사 (독일)', country:'🇩🇪 독일', severity:'LOW',  desc:'유럽 최대 소프트웨어 기업. 엔터프라이즈 AI·ERP 글로벌 시장 선도.', lastUpdate:'현재', source:'SAP' },

  // ── 스타트업 허브 ─────────────────────────────────────────────────────────
  { id:'sh001', layer:'startupHubs', lat:37.5,  lon:-122.0, label:'Silicon Valley',           labelKo:'실리콘밸리',         country:'🇺🇸 미국', severity:'LOW',  desc:'세계 1위 스타트업 생태계. VC 투자 2024년 $600B+. AI·반도체·바이오 집중.', lastUpdate:'현재', source:'NVCA' },
  { id:'sh002', layer:'startupHubs', lat:51.5,  lon:-0.1,   label:'London Tech City',         labelKo:'런던 테크시티',      country:'🇬🇧 영국', severity:'LOW',  desc:'유럽 1위 스타트업 허브. 핀테크·AI 집중. 2024년 VC $16B.', lastUpdate:'현재', source:'Tech Nation' },
  { id:'sh003', layer:'startupHubs', lat:52.5,  lon:13.4,   label:'Berlin Tech Ecosystem',    labelKo:'베를린 스타트업',    country:'🇩🇪 독일', severity:'LOW',  desc:'유럽 2위. B2B SaaS·딥테크 강세. 2024년 VC €4B.', lastUpdate:'현재', source:'Atomico' },
  { id:'sh004', layer:'startupHubs', lat:32.0,  lon:34.8,   label:'Tel Aviv / Silicon Wadi',  labelKo:'텔아비브 스타트업', country:'🇮🇱 이스라엘', severity:'MED',  desc:'1인당 스타트업 세계 1위. 사이버보안·드론 방산 AI 특화. 2024년 VC $7B.', lastUpdate:'현재', source:'StartupBlink' },
  { id:'sh005', layer:'startupHubs', lat:37.5,  lon:127.0,  label:'Seoul Pangyo/Gangnam',     labelKo:'서울 판교·강남',    country:'🇰🇷 한국', severity:'LOW',  desc:'K-스타트업 허브. 카카오·네이버 생태계. 2024년 VC ₩3.5조.', lastUpdate:'현재', source:'KDB' },
  { id:'sh006', layer:'startupHubs', lat:22.5,  lon:114.0,  label:'Hong Kong / Shenzhen Bay', labelKo:'홍콩·선전 혁신 허브', country:'🇨🇳🇭🇰 중국/홍콩', severity:'MED',  desc:'하드웨어+핀테크 특화. DJI·화웨이 발원지. 규제 불확실성 증가.', lastUpdate:'현재', source:'HK InnoTech' },
  { id:'sh007', layer:'startupHubs', lat:12.9,  lon:77.6,   label:'Bengaluru Startup Hub',    labelKo:'방갈로르 스타트업', country:'🇮🇳 인도', severity:'LOW',  desc:'인도 AI·SaaS 수도. Flipkart·Razorpay·CRED 발원지. 2024년 VC $10B.', lastUpdate:'현재', source:'Bain India' },
  { id:'sh008', layer:'startupHubs', lat:-23.5, lon:-46.6,  label:'São Paulo Tech',           labelKo:'상파울루 스타트업', country:'🇧🇷 브라질', severity:'LOW',  desc:'중남미 1위. 핀테크 강세. Nubank·iFood. 2024년 VC $3B.', lastUpdate:'현재', source:'LAVCA' },

  // ── 자연재해/위험 ─────────────────────────────────────────────────────────
  { id:'na001', layer:'natural', lat:35.7,  lon:137.0, label:'Japan Earthquake Risk',     labelKo:'일본 지진 위험',     country:'🇯🇵 일본', severity:'HIGH', desc:'난카이 해구 대지진 30년 내 발생 확률 80%. 도쿄 인근 DC 대규모 리스크.', lastUpdate:'현재', source:'JMA' },
  { id:'na002', layer:'natural', lat:14.0,  lon:121.0, label:'Philippines Typhoon Season', labelKo:'필리핀 태풍 시즌', country:'🇵🇭 필리핀', severity:'HIGH', desc:'연간 태풍 20+. 해저케이블 손상 반복. 인터넷 인프라 취약.', lastUpdate:'현재', source:'PAGASA' },
  { id:'na003', layer:'natural', lat:37.5,  lon:-122.0, label:'CA Earthquake/Wildfire',   labelKo:'캘리포니아 재해', country:'🇺🇸 미국', severity:'MED',  desc:'헤이워드 단층 대지진 위험. 산불 DC 냉각 시스템 위협. AWS 복구 계획 강화.', lastUpdate:'현재', source:'USGS' },
  { id:'na004', layer:'natural', lat:0.0,   lon:100.0, label:'Sumatra Subduction Zone',   labelKo:'수마트라 해저지진', country:'🇮🇩 인도네시아', severity:'HIGH', desc:'말라카해협 해저케이블 지진 위험. 2004년 쓰나미 이후 케이블 2회 손상.', lastUpdate:'현재', source:'BMKG' },
  { id:'na005', layer:'natural', lat:28.0,  lon:86.0,  label:'Nepal/India Seismic Zone',  labelKo:'히말라야 지진대', country:'🇳🇵 네팔/🇮🇳 인도', severity:'MED',  desc:'히말라야 지진대. 인도 북부 DC 및 통신 인프라 리스크.', lastUpdate:'현재', source:'IMD' },
  { id:'na006', layer:'natural', lat:20.0,  lon:-97.0, label:'Gulf Mexico Hurricane Zone', labelKo:'멕시코만 허리케인', country:'🇺🇸 미국', severity:'MED',  desc:'카테고리 5 허리케인 위협. 텍사스 허스턴 DC 클러스터 리스크.', lastUpdate:'현재', source:'NOAA' },
]

// ── 해저 케이블 경로 (시각화용 선분) ─────────────────────────────────────────
const CABLE_ROUTES: { from: [number, number]; to: [number, number]; label: string; color: string }[] = [
  { from: [51.5, -5.0], to: [40.7, -74.0], label: 'TAT-14', color: '#00d4ff' },
  { from: [51.5, -5.0], to: [36.0, -8.0],  label: 'REACH', color: '#00d4ff' },
  { from: [36.0, -8.0], to: [24.0, 60.0],  label: 'SEA-ME-WE', color: '#38bdf8' },
  { from: [24.0, 60.0], to: [4.0, 108.0],  label: 'AAG', color: '#38bdf8' },
  { from: [4.0, 108.0], to: [24.0, 130.0], label: 'PLCN', color: '#00d4ff' },
  { from: [24.0, 130.0], to: [37.5, -122.0], label: 'Pacific', color: '#00d4ff' },
  { from: [36.0, 128.0], to: [35.7, 139.7], label: 'KJC', color: '#38bdf8' },
  { from: [12.5, 43.5], to: [36.0, 32.0],  label: 'Red Sea', color: '#ff2d55' },
  { from: [-35.0, 25.0], to: [4.0, 108.0], label: 'SEACOM', color: '#00d4ff' },
  { from: [51.0, 2.0], to: [52.5, 13.4],   label: 'BCS', color: '#ff2d55' },
]

// ── 육지 점 ───────────────────────────────────────────────────────────────────
const LAND_DOTS: [number, number][] = [
  [37,126],[37,127],[37,128],[36,127],[36,128],[35,129],[34,128],[35,127],
  [38,125],[38,126],[39,125],[39,126],[40,124],[40,125],[41,125],[41,126],
  [36,138],[36,137],[35,137],[35,136],[35,135],[34,134],[33,131],[32,130],
  [31,131],[33,132],[34,133],[36,136],[37,137],[38,140],[39,141],[40,141],
  [41,141],[42,142],[43,141],[44,143],[43,144],[26,128],[26,127],[27,128],
  [40,116],[39,117],[38,115],[37,114],[36,114],[35,113],[34,112],[32,112],
  [30,114],[28,115],[26,113],[24,113],[22,113],[32,120],[33,120],[34,119],
  [35,117],[36,120],[38,117],[39,118],[40,119],[41,121],[42,122],[43,122],
  [44,123],[45,122],[46,125],[47,124],[48,123],[49,126],[50,128],[45,128],
  [35,104],[36,103],[38,105],[40,107],[42,107],[43,108],[44,109],[46,108],
  [48,106],[50,100],[30,104],[28,104],[26,102],[24,102],[22,101],[20,100],
  [55,135],[57,137],[58,140],[59,143],[60,142],[61,141],[62,140],[63,143],
  [50,136],[51,136],[52,137],[53,138],[54,136],[48,135],[47,134],[46,133],
  [45,132],[44,131],[50,140],[52,141],[54,142],[56,138],[60,150],[62,152],
  [55,37],[56,37],[57,35],[58,34],[59,30],[60,30],[61,28],[62,28],
  [63,30],[64,40],[65,45],[66,50],[65,55],[64,60],[63,62],[62,65],
  [60,60],[58,58],[56,58],[54,55],[52,53],[50,50],[50,45],[52,45],
  [54,48],[56,48],[58,50],[60,50],[62,50],[64,52],[55,73],[56,75],
  [57,72],[58,70],[59,68],[60,65],[62,60],[64,57],[65,60],[66,62],
  [42,70],[44,72],[46,74],[48,76],[50,78],[48,80],[46,80],[44,78],
  [42,72],[40,68],[38,66],[40,64],[42,62],[44,60],[46,62],[48,64],
  [28,77],[26,80],[24,82],[22,80],[20,78],[18,76],[16,74],[14,74],
  [12,77],[10,78],[8,77],[14,78],[16,80],[18,78],[20,76],[22,72],
  [24,72],[26,74],[28,72],[30,74],[32,74],[28,75],[26,76],[24,74],
  [20,100],[18,100],[16,100],[14,99],[12,99],[10,99],[8,100],[10,100],
  [12,101],[14,101],[16,102],[18,104],[20,102],[22,104],[22,106],[20,106],
  [0,108],[0,110],[0,112],[-2,110],[-2,112],[-2,114],[-4,114],[-4,116],
  [-6,107],[-6,108],[-6,110],[-6,112],[2,110],[2,112],[4,114],[4,116],
  [35,36],[34,36],[32,36],[30,34],[28,34],[26,36],[24,38],[22,40],
  [24,42],[26,44],[28,46],[30,48],[32,46],[34,42],[36,40],[38,40],
  [36,36],[34,38],[32,44],[30,50],[28,48],[24,56],[22,58],[20,58],
  [18,56],[20,60],[22,60],[24,58],[36,54],[34,50],[32,48],[30,52],
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
  [48,18],[50,18],[52,18],[54,18],[52,20],[50,20],[48,20],[46,18],
  [44,18],[42,18],[40,18],[48,16],[50,14],[52,14],[54,14],[56,14],
  [58,16],[60,18],[62,22],[60,24],[58,26],[56,22],[54,20],[52,22],
  [50,22],[48,22],[46,20],[44,20],[42,20],[40,20],[40,22],[42,24],
  [44,24],[46,24],[48,24],[50,24],[52,24],[54,22],[56,24],[58,22],
  [56,28],[54,28],[52,26],[50,26],[48,26],[46,26],[44,26],[42,26],
  [42,28],[44,28],[46,28],[48,28],[44,22],[42,22],[40,24],[38,26],
  [38,22],[38,24],[36,14],[36,6],[44,6],[46,6],[48,6],[50,6],
  [52,8],[54,10],[56,10],[58,10],[60,10],[62,10],[64,12],[66,14],
  [48,-90],[50,-90],[52,-90],[54,-90],[56,-88],[58,-86],[60,-84],
  [62,-82],[64,-80],[66,-78],[66,-74],[64,-76],[62,-78],
  [60,-80],[58,-78],[56,-76],[54,-76],[52,-78],[50,-78],[48,-78],
  [46,-76],[44,-76],[42,-78],[40,-76],[38,-76],[36,-76],[34,-76],
  [32,-80],[30,-82],[28,-82],[26,-80],[24,-80],[30,-88],[32,-88],
  [34,-88],[36,-88],[38,-90],[40,-90],[42,-90],[44,-90],[46,-92],
  [48,-92],[50,-94],[52,-96],[54,-98],[56,-100],[58,-102],[60,-104],
  [34,-94],[36,-96],[38,-98],[40,-98],[42,-98],[44,-98],[46,-98],
  [48,-98],[50,-100],[52,-102],[44,-100],[42,-100],[40,-100],[38,-100],
  [36,-100],[34,-100],[32,-100],[44,-104],[42,-104],[40,-104],[38,-106],
  [36,-106],[34,-106],[32,-106],[46,-122],[48,-122],[50,-120],[52,-118],
  [50,-124],[48,-124],[46,-124],[44,-124],[42,-124],[40,-124],[46,-120],
  [44,-120],[42,-120],[40,-120],[-10,-36],[-12,-38],[-14,-40],
  [-16,-40],[-18,-40],[-20,-42],[-22,-44],[-24,-46],[-26,-48],[-28,-48],
  [-30,-50],[-32,-52],[-10,-40],[-8,-36],[-6,-36],[-4,-38],[-2,-44],
  [10,-62],[12,-72],[14,-88],[16,-90],[18,-92],[20,-90],[22,-88],[24,-82],
  [-28,114],[-26,114],[-24,114],[-22,114],[-20,116],[-18,124],[-16,130],
  [-14,130],[-12,130],[-14,136],[-12,136],[-14,142],[-16,142],[-18,140],
  [-20,140],[-22,138],[-24,136],[-26,134],[-28,132],[-30,130],[-32,130],
  [-34,128],[-34,130],[-32,136],[-30,136],[-28,136],[-26,136],[-24,138],
  [-22,142],[-24,144],[-26,146],[-28,148],[-30,148],[-32,148],[-34,150],
  [-36,150],[-38,148],[-40,148],[-38,144],[-36,140],[-38,142],[-36,136],
  [-34,136],[-32,140],[-30,140],[-28,140],[-26,140],[-24,142],[-22,146],
]

// ── 실시간 알림 풀 ────────────────────────────────────────────────────────────
interface LiveAlert { id: string; time: string; layer: TechLayerId; title: string; severity: TechEvent['severity']; location: string }

const ALERT_POOL: Omit<LiveAlert, 'id' | 'time'>[] = [
  { layer:'cables',       title:'발트해 해저케이블 진동 이상 감지', severity:'HIGH',     location:'핀란드만' },
  { layer:'outages',      title:'우크라이나 전력망 추가 미사일 피격', severity:'CRITICAL', location:'키이우' },
  { layer:'datacenters',  title:'AWS us-east-1 응답 지연 급증', severity:'HIGH',     location:'버지니아' },
  { layer:'cloudRegions', title:'Azure UK South 부분 장애 발생', severity:'MED',      location:'런던' },
  { layer:'techHQs',      title:'삼성전자 HBM4 양산 개시 확인', severity:'LOW',      location:'천안/화성' },
  { layer:'startupHubs',  title:'텔아비브 방산 스타트업 시리즈B $200M', severity:'LOW', location:'텔아비브' },
  { layer:'cables',       title:'홍해 수리선 케이블 복구 작업 재개', severity:'MED',    location:'홍해 북부' },
  { layer:'natural',      title:'일본 오키나와 규모 5.8 지진 발생', severity:'HIGH',   location:'오키나와' },
  { layer:'outages',      title:'이란 인터넷 속도 추가 50% 제한', severity:'HIGH',     location:'테헤란' },
  { layer:'cloudRegions', title:'GCP 도쿄 리전 트래픽 급증 (AI 트레이닝)', severity:'MED', location:'도쿄' },
  { layer:'cables',       title:'서아프리카 Mainone 복구 완료', severity:'LOW',        location:'라고스' },
  { layer:'techHQs',      title:'구글 딥마인드 Gemini Ultra 2 출시', severity:'LOW',   location:'런던/마운틴뷰' },
]

function genTime() {
  return new Date().toLocaleTimeString('ko-KR', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
}

// ── 메인 컴포넌트 ─────────────────────────────────────────────────────────────
export default function TechMonitor() {
  const svgRef = useRef<SVGSVGElement>(null)
  const [activeLayers, setActiveLayers] = useState<Set<TechLayerId>>(
    new Set(['cables', 'outages', 'datacenters', 'cloudRegions', 'techHQs', 'startupHubs', 'natural'])
  )
  const [selectedEvent, setSelectedEvent] = useState<TechEvent | null>(null)
  const [liveAlerts, setLiveAlerts] = useState<LiveAlert[]>([])
  const [pulse, setPulse] = useState(0)
  const [hovered, setHovered] = useState<string | null>(null)
  const [showCables, setShowCables] = useState(true)
  const [statsTab, setStatsTab] = useState<'feed' | 'stats'>('feed')
  const [cursorPos, setCursorPos] = useState<{ lat: number; lon: number } | null>(null)

  useEffect(() => {
    const id = setInterval(() => setPulse(p => p + 1), 800)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const generate = () => {
      const tpl = ALERT_POOL[Math.floor(Math.random() * ALERT_POOL.length)]
      const alert: LiveAlert = { ...tpl, id: `tal-${Date.now()}`, time: genTime() }
      setLiveAlerts(prev => [alert, ...prev].slice(0, 20))
    }
    generate()
    const id = setInterval(generate, 7000 + Math.random() * 5000)
    return () => clearInterval(id)
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    const svg = svgRef.current
    if (!svg) return
    const rect = svg.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * W
    const y = ((e.clientY - rect.top) / rect.height) * H
    setCursorPos({ lat: 90 - (y / H) * 180, lon: (x / W) * 360 - 180 })
  }, [])

  const toggleLayer = (id: TechLayerId) => {
    setActiveLayers(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const visibleEvents = TECH_EVENTS.filter(e => activeLayers.has(e.layer))
  const getLayerColor = (id: TechLayerId) => TECH_LAYERS.find(l => l.id === id)?.color ?? '#00d4ff'

  const statsByLayer = TECH_LAYERS.map(l => ({
    ...l,
    count: TECH_EVENTS.filter(e => e.layer === l.id).length,
    critical: TECH_EVENTS.filter(e => e.layer === l.id && e.severity === 'CRITICAL').length,
  }))

  return (
    <div className="min-h-screen bg-[#020b18] flex flex-col">
      {/* ── 헤더 ── */}
      <div className="border-b border-[#0a3050] bg-[#041526]/60 backdrop-blur-sm px-4 md:px-6 py-3">
        <div className="max-w-screen-2xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#c084fc]/10 border border-[#c084fc]/30 flex items-center justify-center">
              <Cpu className="w-4 h-4 text-[#c084fc]" />
            </div>
            <div>
              <p className="text-[9px] font-black tracking-[0.3em] text-[#c084fc]/60 uppercase">K-Defense AI · Tech Monitor</p>
              <h1 className="text-lg font-black text-white tracking-wide leading-none">글로벌 기술 인프라 실시간 모니터</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setShowCables(v => !v)}
              className={`text-[8px] font-black px-2.5 py-1.5 border transition-all flex items-center gap-1 ${
                showCables ? 'text-[#00d4ff] border-[#00d4ff]/30 bg-[#00d4ff]/10' : 'text-[#4a7a9b] border-[#0a3050]'
              }`}>
              <Cable className="w-3 h-3" /> 케이블 경로
            </button>
            <div className="flex items-center gap-1.5 px-2 py-1 bg-[#c084fc]/10 border border-[#c084fc]/20">
              <div className="w-1.5 h-1.5 rounded-full bg-[#c084fc] animate-pulse" />
              <span className="text-[8px] font-black text-[#c084fc]">LIVE</span>
            </div>
            <div className="flex items-center gap-1.5 text-[9px] font-black text-[#c084fc]">
              <Activity className="w-3 h-3" />
              <span>{visibleEvents.length}개 이벤트</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col xl:flex-row gap-0 max-w-screen-2xl mx-auto w-full">

        {/* 레이어 패널 */}
        <div className="xl:w-52 xl:min-w-52 border-r border-[#0a3050] bg-[#020e1f]/60 p-3 space-y-1">
          <div className="text-[8px] font-black tracking-[0.2em] text-[#4a7a9b] uppercase mb-3 flex items-center gap-1.5">
            <Layers className="w-3 h-3" /> 레이어
          </div>
          {TECH_LAYERS.map(layer => {
            const Icon = layer.icon
            const isOn = activeLayers.has(layer.id)
            const count = TECH_EVENTS.filter(e => e.layer === layer.id).length
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
          <div className="flex gap-1 pt-2 border-t border-[#0a3050]">
            <button onClick={() => setActiveLayers(new Set(TECH_LAYERS.map(l => l.id)))}
              className="flex-1 text-[8px] font-black text-[#c084fc] hover:bg-[#c084fc]/10 py-1.5 transition-all">
              전체 ON
            </button>
            <button onClick={() => setActiveLayers(new Set())}
              className="flex-1 text-[8px] font-black text-[#4a7a9b] hover:bg-[#4a7a9b]/10 py-1.5 transition-all">
              전체 OFF
            </button>
          </div>
        </div>

        {/* 지도 */}
        <div className="flex-1 min-w-0 relative bg-[#020b18]">
          <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`}
            className="w-full h-full select-none cursor-crosshair"
            style={{ maxHeight: '62vh' }}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setCursorPos(null)}>

            <rect width={W} height={H} fill="#020b18" />

            {/* 그리드 */}
            {[-60,-30,0,30,60].map(lat => {
              const p = project(lat, -180)
              return <line key={lat} x1={0} y1={p.y} x2={W} y2={p.y} stroke="#c084fc" strokeOpacity="0.04" strokeWidth="0.5" />
            })}
            {[-150,-120,-90,-60,-30,0,30,60,90,120,150].map(lon => {
              const p = project(0, lon)
              return <line key={lon} x1={p.x} y1={0} x2={p.x} y2={H} stroke="#c084fc" strokeOpacity="0.04" strokeWidth="0.5" />
            })}

            {/* 육지 */}
            {LAND_DOTS.map(([lat, lon], i) => {
              const p = project(lat, lon)
              return <rect key={i} x={p.x - 1.2} y={p.y - 1.2} width={2.4} height={2.4} fill="#0d2240" />
            })}

            {/* 케이블 경로 */}
            {showCables && CABLE_ROUTES.map((cable, i) => {
              const p1 = project(cable.from[0], cable.from[1])
              const p2 = project(cable.to[0], cable.to[1])
              const mx = (p1.x + p2.x) / 2
              const my = Math.min(p1.y, p2.y) - 30
              return (
                <g key={i}>
                  <path
                    d={`M ${p1.x} ${p1.y} Q ${mx} ${my} ${p2.x} ${p2.y}`}
                    fill="none" stroke={cable.color} strokeWidth="0.8"
                    strokeDasharray="4,3" opacity="0.35"
                  />
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
                  {(isSel || isHov || ev.severity === 'CRITICAL') && (
                    <circle cx={p.x} cy={p.y} r={pulseOdd ? 13 : 9}
                      fill="none" stroke={color} strokeWidth="0.6"
                      opacity={pulseOdd ? 0.3 : 0.1}
                      style={{ transition: 'r 0.4s ease' }}
                    />
                  )}
                  <circle cx={p.x} cy={p.y} r={isSel || isHov ? 6 : 4.5}
                    fill={`${layerColor}20`} stroke={layerColor}
                    strokeWidth={isSel ? 1.8 : 1}
                    style={{ filter: `drop-shadow(0 0 ${isSel ? 7 : 3}px ${layerColor})`, transition: 'r 0.15s' }}
                  />
                  {ev.severity === 'CRITICAL' && (
                    <circle cx={p.x} cy={p.y} r={2} fill={color} opacity={0.9} />
                  )}
                  {(isHov || isSel) && (
                    <g>
                      <rect x={p.x + 8} y={p.y - 7} width={Math.min(ev.labelKo.length * 5.5 + 6, 130)} height={14}
                        rx="2" fill="#041526" stroke={layerColor} strokeWidth="0.5" opacity="0.95" />
                      <text x={p.x + 11} y={p.y + 2} fontSize="7" fill={layerColor} fontWeight="bold">{ev.labelKo}</text>
                    </g>
                  )}
                </g>
              )
            })}
          </svg>

          {cursorPos && (
            <div className="absolute bottom-2 left-2 text-[8px] font-mono text-[#2a4a6a]">
              {cursorPos.lat.toFixed(2)}°{cursorPos.lat >= 0 ? 'N' : 'S'} {Math.abs(cursorPos.lon).toFixed(2)}°{cursorPos.lon >= 0 ? 'E' : 'W'}
            </div>
          )}

          <div className="absolute bottom-2 right-2 flex items-center gap-3 bg-[#020b18]/80 border border-[#0a3050] px-3 py-1.5">
            {TECH_LAYERS.map(l => (
              <div key={l.id} className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full" style={{ background: l.color }} />
                <span className="text-[7px] text-[#4a7a9b]">{l.ko}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 우측 패널 */}
        <div className="xl:w-80 xl:min-w-80 border-l border-[#0a3050] bg-[#020e1f]/60 flex flex-col">
          <div className="flex border-b border-[#0a3050]">
            {[
              { id: 'feed' as const, label: '실시간 피드', icon: Radio },
              { id: 'stats' as const, label: '통계', icon: BarChart3 },
            ].map(({ id, label, icon: Icon }) => (
              <button key={id} onClick={() => setStatsTab(id)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-[9px] font-black transition-all border-b-2 -mb-px ${
                  statsTab === id ? 'text-[#c084fc] border-[#c084fc]' : 'text-[#4a7a9b] border-transparent hover:text-[#8ab8d4]'
                }`}>
                <Icon className="w-3 h-3" />{label}
              </button>
            ))}
          </div>

          <AnimatePresence>
            {selectedEvent && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="border-b border-[#0a3050] overflow-hidden">
                <div className="h-0.5" style={{ background: getLayerColor(selectedEvent.layer) }} />
                <div className="p-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                        <span className="text-[7px] font-black px-1.5 py-0.5"
                          style={{ color: getLayerColor(selectedEvent.layer), background: `${getLayerColor(selectedEvent.layer)}15` }}>
                          {TECH_LAYERS.find(l => l.id === selectedEvent.layer)?.ko}
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
                  {selectedEvent.detail && (
                    <div className="bg-[#020b18]/60 border border-[#0a3050] p-2 mb-2">
                      <p className="text-[8px] text-[#6a9ab8] leading-relaxed">{selectedEvent.detail}</p>
                    </div>
                  )}
                  <div className="space-y-1 text-[8px]">
                    <div className="flex justify-between border-b border-[#0a3050]/50 pb-1">
                      <span className="text-[#4a7a9b]">좌표</span>
                      <span className="font-mono text-[#c084fc]">{selectedEvent.lat.toFixed(1)}°N {selectedEvent.lon.toFixed(1)}°E</span>
                    </div>
                    <div className="flex justify-between border-b border-[#0a3050]/50 pb-1">
                      <span className="text-[#4a7a9b]">업데이트</span>
                      <span className="text-[#00ff88]">{selectedEvent.lastUpdate}</span>
                    </div>
                    {selectedEvent.source && (
                      <div className="flex justify-between">
                        <span className="text-[#4a7a9b]">출처</span>
                        <span className="text-[#4a7a9b]">{selectedEvent.source}</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex-1 overflow-y-auto">
            {statsTab === 'feed' ? (
              <div className="p-2 space-y-1">
                {liveAlerts.map((alert, i) => {
                  const layerInfo = TECH_LAYERS.find(l => l.id === alert.layer)
                  const Icon = layerInfo?.icon ?? Database
                  const color = layerInfo?.color ?? '#00d4ff'
                  return (
                    <motion.div key={alert.id}
                      initial={i === 0 ? { opacity: 0, x: 20 } : false}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex gap-2 p-2 border border-[#0a3050]/50 hover:border-[#c084fc]/20 transition-all">
                      <div className="w-5 h-5 flex items-center justify-center shrink-0 mt-0.5" style={{ color }}>
                        <Icon className="w-3 h-3" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                          <span className="text-[7px] font-black px-1 py-0.5"
                            style={{ color: SEV_COLOR[alert.severity], background: `${SEV_COLOR[alert.severity]}15` }}>
                            {alert.severity}
                          </span>
                          <span className="text-[7px] text-[#2a4a6a]">{alert.layer}</span>
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
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {[
                    { label: '총 이벤트', value: TECH_EVENTS.length, color: '#c084fc' },
                    { label: 'CRITICAL', value: TECH_EVENTS.filter(e => e.severity === 'CRITICAL').length, color: '#ff2d55' },
                    { label: '해저케이블', value: TECH_EVENTS.filter(e => e.layer === 'cables').length, color: '#00d4ff' },
                    { label: '인프라장애', value: TECH_EVENTS.filter(e => e.layer === 'outages').length, color: '#ff6b35' },
                  ].map(kpi => (
                    <div key={kpi.label} className="bg-[#041526]/60 border border-[#0a3050] p-2.5">
                      <div className="text-[7px] text-[#4a7a9b] mb-0.5">{kpi.label}</div>
                      <div className="text-[20px] font-black" style={{ color: kpi.color }}>{kpi.value}</div>
                    </div>
                  ))}
                </div>
                {statsByLayer.map(layer => {
                  const Icon = layer.icon
                  return (
                    <div key={layer.id} className="flex items-center gap-2 py-1.5 border-b border-[#0a3050]/50">
                      <Icon className="w-3 h-3 shrink-0" style={{ color: layer.color }} />
                      <span className="text-[9px] font-black flex-1" style={{ color: layer.color }}>{layer.ko}</span>
                      <div className="flex items-center gap-1.5">
                        {layer.critical > 0 && (
                          <span className="text-[7px] font-black text-[#ff2d55] bg-[#ff2d55]/10 px-1 py-0.5">C:{layer.critical}</span>
                        )}
                        <span className="text-[10px] font-black text-white">{layer.count}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 하단 스크롤 바 */}
      <div className="border-t border-[#0a3050] bg-[#041526]/40 py-1.5 overflow-hidden">
        <div className="flex items-center gap-0 animate-[scroll_80s_linear_infinite]" style={{ width: 'max-content' }}>
          {[...TECH_EVENTS, ...TECH_EVENTS].map((ev, i) => {
            const color = getLayerColor(ev.layer)
            return (
              <span key={`${ev.id}-${i}`} className="flex items-center gap-2 px-4 text-[8px] whitespace-nowrap border-r border-[#0a3050]">
                <span className="font-black" style={{ color }}>{ev.layer.toUpperCase()}</span>
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
