import type { WeaponCategory } from '../data/weapons'

interface Props {
  category: WeaponCategory
  name: string
  color?: string
}

// 상세 도면 - 부품 레이블이 있는 기술 도면 스타일
export default function WeaponSchematic({ category, name, color = '#00d4ff' }: Props) {
  const c = color
  const labelStyle = { fill: '#8ab8d4', fontSize: '5px', fontFamily: 'monospace' }
  const lineStyle = { stroke: c, strokeWidth: '0.5', strokeDasharray: '2,1', opacity: 0.5 }

  const schematics: Partial<Record<WeaponCategory, React.ReactNode>> = {

    // ── 전투기 상세 도면 ─────────────────────────────────
    AIRCRAFT: (
      <svg viewBox="0 0 280 160" className="w-full">
        <defs>
          <marker id="arr" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto">
            <polyline points="0,0 4,2 0,4" fill="none" stroke={c} strokeWidth="0.8"/>
          </marker>
        </defs>
        {/* 동체 */}
        <polygon points="140,18 115,80 125,82 125,105 155,105 155,82 165,80" fill={c+'12'} stroke={c} strokeWidth="1"/>
        {/* 주익 */}
        <polygon points="115,80 60,95 70,105 125,90" fill={c+'10'} stroke={c} strokeWidth="0.8"/>
        <polygon points="165,80 220,95 210,105 155,90" fill={c+'10'} stroke={c} strokeWidth="0.8"/>
        {/* 수평미익 */}
        <polygon points="125,100 95,108 100,113 128,106" fill={c+'15'} stroke={c} strokeWidth="0.8"/>
        <polygon points="155,100 185,108 180,113 152,106" fill={c+'15'} stroke={c} strokeWidth="0.8"/>
        {/* 수직미익 */}
        <polygon points="138,82 140,55 142,82 140,85" fill={c+'20'} stroke={c} strokeWidth="0.8"/>
        {/* 엔진 */}
        <ellipse cx="140" cy="112" rx="10" ry="6" fill={c+'20'} stroke={c} strokeWidth="1"/>
        {/* 조종석 */}
        <ellipse cx="140" cy="45" rx="8" ry="6" fill={c+'30'} stroke={c} strokeWidth="0.8"/>
        {/* 미사일 하드포인트 */}
        <rect x="80" y="96" width="12" height="4" fill={c+'25'} stroke={c} strokeWidth="0.5" rx="2"/>
        <rect x="188" y="96" width="12" height="4" fill={c+'25'} stroke={c} strokeWidth="0.5" rx="2"/>
        {/* 레이더 */}
        <ellipse cx="140" cy="20" rx="6" ry="4" fill={c+'15'} stroke={c} strokeWidth="1"/>

        {/* 치수선 */}
        <line x1="60" y1="120" x2="220" y2="120" {...lineStyle} markerEnd="url(#arr)" markerStart="url(#arr)"/>
        <text x="140" y="128" textAnchor="middle" {...labelStyle}>전장 15.7m</text>
        <line x1="250" y1="80" x2="250" y2="20" {...lineStyle}/>
        <text x="258" y="52" {...labelStyle} transform="rotate(-90,258,52)">전고 5.1m</text>

        {/* 부품 레이블 */}
        <line x1="148" y1="40" x2="165" y2="30" {...lineStyle}/>
        <text x="166" y="28" {...labelStyle}>AN/APG-77 AESA 레이더</text>
        <line x1="148" y1="46" x2="170" y2="46" {...lineStyle}/>
        <text x="172" y="48" {...labelStyle}>조종석 (HOTAS)</text>
        <line x1="75" y1="93" x2="55" y2="85" {...lineStyle}/>
        <text x="20" y="84" {...labelStyle}>AIM-120 AMRAAM</text>
        <line x1="140" y1="106" x2="160" y2="118" {...lineStyle}/>
        <text x="162" y="120" {...labelStyle}>F119-PW-100 터보팬</text>
        <line x1="125" y1="103" x2="105" y2="115" {...lineStyle}/>
        <text x="55" y="117" {...labelStyle}>전방동체 연료탱크</text>
        <line x1="140" y1="58" x2="160" y2="60" {...lineStyle}/>
        <text x="162" y="62" {...labelStyle}>EW 재밍 포드</text>
      </svg>
    ),

    // ── 탄도미사일 상세 도면 ─────────────────────────────
    ICBM: (
      <svg viewBox="0 0 280 160" className="w-full">
        {/* 미사일 본체 */}
        <polygon points="140,8 132,35 132,130 148,130 148,35" fill={c+'10'} stroke={c} strokeWidth="1"/>
        {/* 탄두부 */}
        <polygon points="132,35 128,50 152,50 148,35" fill={c+'20'} stroke={c} strokeWidth="0.8"/>
        {/* 추진기 */}
        <polygon points="132,130 128,148 152,148 148,130" fill={c+'18'} stroke={c} strokeWidth="0.8"/>
        {/* 분리판 */}
        <line x1="128" y1="60" x2="152" y2="60" stroke={c} strokeWidth="0.8"/>
        <line x1="128" y1="90" x2="152" y2="90" stroke={c} strokeWidth="0.8"/>
        {/* 핀 */}
        <polygon points="132,115 115,130 130,128" fill={c+'18'} stroke={c} strokeWidth="0.8"/>
        <polygon points="148,115 165,130 150,128" fill={c+'18'} stroke={c} strokeWidth="0.8"/>
        {/* 노즐 */}
        <ellipse cx="140" cy="148" rx="12" ry="5" fill={c+'20'} stroke={c} strokeWidth="1"/>
        <ellipse cx="140" cy="153" rx="8" ry="4" fill={c+'30'} stroke={c} strokeWidth="0.8"/>

        {/* 내부 구조 (점선) */}
        <rect x="133" y="37" width="14" height="22" fill="none" stroke={c} strokeWidth="0.4" strokeDasharray="2,1"/>
        <rect x="133" y="62" width="14" height="27" fill="none" stroke={c} strokeWidth="0.4" strokeDasharray="2,1"/>
        <rect x="133" y="92" width="14" height="35" fill="none" stroke={c} strokeWidth="0.4" strokeDasharray="2,1"/>

        {/* 레이블 */}
        <line x1="128" y1="22" x2="90" y2="15" stroke={c} strokeWidth="0.5" strokeDasharray="2,1" opacity="0.6"/>
        <text x="20" y="14" style={labelStyle}>핵 또는 재래식 탄두</text>
        <line x1="128" y1="48" x2="90" y2="50" stroke={c} strokeWidth="0.5" strokeDasharray="2,1" opacity="0.6"/>
        <text x="20" y="52" style={labelStyle}>탄두부 (RV)</text>
        <line x1="128" y1="75" x2="90" y2="75" stroke={c} strokeWidth="0.5" strokeDasharray="2,1" opacity="0.6"/>
        <text x="20" y="78" style={labelStyle}>유도·항법 시스템</text>
        <line x1="128" y1="108" x2="90" y2="105" stroke={c} strokeWidth="0.5" strokeDasharray="2,1" opacity="0.6"/>
        <text x="20" y="108" style={labelStyle}>추진 연료 탱크</text>
        <line x1="148" y1="140" x2="180" y2="140" stroke={c} strokeWidth="0.5" strokeDasharray="2,1" opacity="0.6"/>
        <text x="182" y="142" style={labelStyle}>고체/액체 추진기관</text>
        <line x1="165" y1="127" x2="180" y2="120" stroke={c} strokeWidth="0.5" strokeDasharray="2,1" opacity="0.6"/>
        <text x="182" y="122" style={labelStyle}>기동핀 (Fin)</text>

        {/* 치수 */}
        <line x1="165" y1="8" x2="165" y2="148" stroke={c} strokeWidth="0.4" strokeDasharray="2,1" opacity="0.4"/>
        <text x="170" y="80" style={labelStyle} transform="rotate(-90,170,80)">전장 {name.includes('화성') ? '22m' : name.includes('민병대') || name.includes('Minuteman') ? '18.2m' : '20m'}</text>
      </svg>
    ),

    // ── 잠수함 상세 도면 ─────────────────────────────────
    SUBMARINE: (
      <svg viewBox="0 0 280 160" className="w-full">
        {/* 선체 */}
        <ellipse cx="140" cy="85" rx="100" ry="32" fill={c+'10'} stroke={c} strokeWidth="1"/>
        {/* 세일 (함교) */}
        <rect x="120" y="50" width="40" height="38" rx="5" fill={c+'18'} stroke={c} strokeWidth="1"/>
        {/* 잠망경 */}
        <line x1="130" y1="50" x2="130" y2="30" stroke={c} strokeWidth="1.2"/>
        <line x1="130" y1="30" x2="140" y2="30" stroke={c} strokeWidth="1.2"/>
        <circle cx="140" cy="30" r="2.5" fill={c+'40'} stroke={c} strokeWidth="0.8"/>
        {/* 통신 안테나 */}
        <line x1="142" y1="50" x2="142" y2="25" stroke={c} strokeWidth="0.8"/>
        <line x1="148" y1="50" x2="148" y2="28" stroke={c} strokeWidth="0.8"/>
        {/* 함수 소나 돔 */}
        <ellipse cx="42" cy="85" rx="15" ry="20" fill={c+'15'} stroke={c} strokeWidth="1"/>
        {/* 추진기 */}
        <ellipse cx="235" cy="85" rx="10" ry="18" fill={c+'20'} stroke={c} strokeWidth="1"/>
        <line x1="240" y1="75" x2="255" y2="68" stroke={c} strokeWidth="1.2"/>
        <line x1="240" y1="85" x2="258" y2="85" stroke={c} strokeWidth="1.2"/>
        <line x1="240" y1="95" x2="255" y2="102" stroke={c} strokeWidth="1.2"/>
        {/* 수평타 */}
        <polygon points="218,76 240,76 235,68 220,70" fill={c+'15'} stroke={c} strokeWidth="0.8"/>
        <polygon points="218,94 240,94 235,102 220,100" fill={c+'15'} stroke={c} strokeWidth="0.8"/>
        {/* 수직타 */}
        <polygon points="230,78 245,78 248,70 233,68" fill={c+'18'} stroke={c} strokeWidth="0.8"/>
        {/* 내부 격실 구분선 */}
        <line x1="70" y1="66" x2="70" y2="104" stroke={c} strokeWidth="0.4" strokeDasharray="2,1" opacity="0.5"/>
        <line x1="110" y1="58" x2="110" y2="112" stroke={c} strokeWidth="0.4" strokeDasharray="2,1" opacity="0.5"/>
        <line x1="162" y1="57" x2="162" y2="113" stroke={c} strokeWidth="0.4" strokeDasharray="2,1" opacity="0.5"/>
        <line x1="200" y1="65" x2="200" y2="105" stroke={c} strokeWidth="0.4" strokeDasharray="2,1" opacity="0.5"/>
        {/* 어뢰 발사관 */}
        <rect x="42" y="75" width="25" height="4" fill={c+'25'} stroke={c} strokeWidth="0.5"/>
        <rect x="42" y="85" width="25" height="4" fill={c+'25'} stroke={c} strokeWidth="0.5"/>
        <rect x="42" y="95" width="25" height="4" fill={c+'25'} stroke={c} strokeWidth="0.5"/>

        {/* 레이블 */}
        <line x1="42" y1="65" x2="20" y2="45" stroke={c} strokeWidth="0.5" strokeDasharray="2,1" opacity="0.6"/>
        <text x="5" y="43" style={labelStyle}>소나 돔</text>
        <line x1="55" y1="78" x2="25" y2="78" stroke={c} strokeWidth="0.5" strokeDasharray="2,1" opacity="0.6"/>
        <text x="5" y="80" style={labelStyle}>어뢰 발사관</text>
        <line x1="130" y1="30" x2="100" y2="15" stroke={c} strokeWidth="0.5" strokeDasharray="2,1" opacity="0.6"/>
        <text x="60" y="13" style={labelStyle}>잠망경/안테나</text>
        <line x1="135" y1="52" x2="135" y2="20" stroke={c} strokeWidth="0.5" strokeDasharray="2,1" opacity="0.6"/>
        <text x="170" y="130" style={labelStyle}>원자로/추진 시스템</text>
        <line x1="180" y1="85" x2="170" y2="127" stroke={c} strokeWidth="0.5" strokeDasharray="2,1" opacity="0.6"/>
        <text x="215" y="120" style={labelStyle}>추진기</text>
        <line x1="240" y1="85" x2="240" y2="118" stroke={c} strokeWidth="0.5" strokeDasharray="2,1" opacity="0.6"/>
      </svg>
    ),

    // ── 전차 상세 도면 ────────────────────────────────────
    GROUND: (
      <svg viewBox="0 0 280 160" className="w-full">
        {/* 차체 */}
        <rect x="35" y="90" width="210" height="42" rx="4" fill={c+'10'} stroke={c} strokeWidth="1"/>
        {/* 포탑 */}
        <ellipse cx="140" cy="82" rx="45" ry="28" fill={c+'15'} stroke={c} strokeWidth="1"/>
        {/* 주포 */}
        <rect x="175" y="78" width="80" height="8" rx="2" fill={c+'20'} stroke={c} strokeWidth="1"/>
        <rect x="250" y="79" width="5" height="6" rx="1" fill={c+'30'} stroke={c} strokeWidth="0.8"/>
        {/* 포탑 상세 */}
        <ellipse cx="130" cy="73" rx="15" ry="10" fill={c+'20'} stroke={c} strokeWidth="0.8"/>
        {/* ERA 블록 */}
        {[50,70,90,180,200,220].map((x,i) => (
          <rect key={i} x={x} y="87" width="12" height="8" fill={c+'15'} stroke={c} strokeWidth="0.5" rx="1"/>
        ))}
        {/* 궤도 */}
        {[45,65,85,105,125,145,165,185,205,225].map((x,i) => (
          <circle key={i} cx={x} cy="128" r="10" fill={c+'12'} stroke={c} strokeWidth="0.8"/>
        ))}
        {[45,65,85,105,125,145,165,185,205,225].map((x,i) => (
          <circle key={i} cx={x} cy="128" r="5" fill={c+'25'} stroke={c} strokeWidth="0.5"/>
        ))}
        <rect x="35" y="120" width="210" height="8" fill={c+'08'} stroke={c} strokeWidth="0.5"/>
        {/* 조준경 */}
        <rect x="118" y="64" width="14" height="8" rx="2" fill={c+'25'} stroke={c} strokeWidth="0.8"/>
        {/* 큐폴라 */}
        <ellipse cx="145" cy="64" rx="10" ry="7" fill={c+'22'} stroke={c} strokeWidth="0.8"/>
        {/* 기관총 */}
        <line x1="153" y1="64" x2="172" y2="62" stroke={c} strokeWidth="1.5"/>

        {/* 레이블 */}
        <line x1="250" y1="78" x2="268" y2="60" stroke={c} strokeWidth="0.5" strokeDasharray="2,1" opacity="0.6"/>
        <text x="230" y="57" style={labelStyle}>120mm 활강포</text>
        <line x1="130" y1="58" x2="110" y2="42" stroke={c} strokeWidth="0.5" strokeDasharray="2,1" opacity="0.6"/>
        <text x="65" y="40" style={labelStyle}>복합장갑 (ERA/복합소재)</text>
        <line x1="145" y1="57" x2="165" y2="42" stroke={c} strokeWidth="0.5" strokeDasharray="2,1" opacity="0.6"/>
        <text x="167" y="40" style={labelStyle}>차장 큐폴라</text>
        <line x1="95" y1="92" x2="75" y2="78" stroke={c} strokeWidth="0.5" strokeDasharray="2,1" opacity="0.6"/>
        <text x="30" y="76" style={labelStyle}>반응장갑 (ERA)</text>
        <line x1="85" y1="128" x2="60" y2="148" stroke={c} strokeWidth="0.5" strokeDasharray="2,1" opacity="0.6"/>
        <text x="20" y="152" style={labelStyle}>고무패드 궤도</text>
        <line x1="140" y1="110" x2="160" y2="148" stroke={c} strokeWidth="0.5" strokeDasharray="2,1" opacity="0.6"/>
        <text x="162" y="152" style={labelStyle}>디젤 엔진 1,500hp</text>
      </svg>
    ),

    // ── 수상함 상세 도면 ─────────────────────────────────
    NAVAL: (
      <svg viewBox="0 0 280 160" className="w-full">
        {/* 선체 */}
        <polygon points="20,100 25,78 255,78 260,100 260,110 20,110" fill={c+'08'} stroke={c} strokeWidth="1"/>
        {/* 상부 구조물 */}
        <rect x="80" y="56" width="120" height="24" fill={c+'14'} stroke={c} strokeWidth="0.8"/>
        {/* 브리지 */}
        <rect x="105" y="40" width="70" height="18" fill={c+'18'} stroke={c} strokeWidth="0.8"/>
        {/* 마스트 */}
        <line x1="140" y1="20" x2="140" y2="40" stroke={c} strokeWidth="1.5"/>
        <line x1="120" y1="25" x2="160" y2="25" stroke={c} strokeWidth="1"/>
        {/* 레이더 */}
        <ellipse cx="140" cy="18" rx="12" ry="5" fill={c+'20'} stroke={c} strokeWidth="0.8"/>
        <ellipse cx="140" cy="12" rx="6" ry="3" fill={c+'30'} stroke={c} strokeWidth="0.8"/>
        {/* 함수포 */}
        <rect x="32" y="72" width="30" height="7" rx="2" fill={c+'20'} stroke={c} strokeWidth="0.8"/>
        <line x1="30" y1="75" x2="18" y2="70" stroke={c} strokeWidth="1.5"/>
        {/* VLS 셀 */}
        {[88,100,112,124,136,148,160].map((x,i) => (
          <rect key={i} x={x} y="57" width="10" height="22" fill={c+'18'} stroke={c} strokeWidth="0.5"/>
        ))}
        {/* 미사일 (VLS) */}
        {[90,102,114,126,138,150,162].map((x,i) => (
          <polygon key={i} points={`${x},57 ${x+3},50 ${x+6},57`} fill={c+'30'} stroke={c} strokeWidth="0.4"/>
        ))}
        {/* 헬기 갑판 */}
        <rect x="210" y="78" width="50" height="22" fill={c+'10'} stroke={c} strokeWidth="0.5" strokeDasharray="3,2"/>
        <text x="235" y="92" textAnchor="middle" style={{...labelStyle, fontSize:'6px'}}>헬기 갑판</text>
        {/* CIWS */}
        <circle cx="75" cy="74" r="6" fill={c+'18'} stroke={c} strokeWidth="0.8"/>
        <line x1="75" y1="68" x2="65" y2="58" stroke={c} strokeWidth="1.2"/>
        {/* 어뢰 발사관 */}
        <rect x="28" y="90" width="15" height="6" fill={c+'22'} stroke={c} strokeWidth="0.5"/>
        <rect x="237" y="90" width="15" height="6" fill={c+'22'} stroke={c} strokeWidth="0.5"/>

        {/* 레이블 */}
        <line x1="140" y1="12" x2="165" y2="5" stroke={c} strokeWidth="0.5" strokeDasharray="2,1" opacity="0.6"/>
        <text x="167" y="7" style={labelStyle}>AN/SPY-6 레이더</text>
        <line x1="18" y1="70" x2="5" y2="55" stroke={c} strokeWidth="0.5" strokeDasharray="2,1" opacity="0.6"/>
        <text x="3" y="52" style={labelStyle}>Mk45 5인치포</text>
        <line x1="100" y1="57" x2="80" y2="42" stroke={c} strokeWidth="0.5" strokeDasharray="2,1" opacity="0.6"/>
        <text x="30" y="40" style={labelStyle}>Mk41 VLS (미사일 격납)</text>
        <line x1="65" y1="62" x2="50" y2="48" stroke={c} strokeWidth="0.5" strokeDasharray="2,1" opacity="0.6"/>
        <text x="20" y="46" style={labelStyle}>Phalanx CIWS</text>
        <line x1="28" y1="93" x2="8" y2="108" stroke={c} strokeWidth="0.5" strokeDasharray="2,1" opacity="0.6"/>
        <text x="3" y="112" style={labelStyle}>MK32 어뢰관</text>
      </svg>
    ),

    // ── UAV 상세 도면 ─────────────────────────────────────
    UAV: (
      <svg viewBox="0 0 280 160" className="w-full">
        {/* 동체 */}
        <ellipse cx="140" cy="80" rx="25" ry="10" fill={c+'15'} stroke={c} strokeWidth="1"/>
        {/* 주익 */}
        <polygon points="115,80 30,72 25,78 30,84 115,80" fill={c+'10'} stroke={c} strokeWidth="0.8"/>
        <polygon points="165,80 250,72 255,78 250,84 165,80" fill={c+'10'} stroke={c} strokeWidth="0.8"/>
        {/* V꼬리날개 */}
        <polygon points="140,90 115,115 130,112" fill={c+'12'} stroke={c} strokeWidth="0.8"/>
        <polygon points="140,90 165,115 150,112" fill={c+'12'} stroke={c} strokeWidth="0.8"/>
        {/* 카메라 포드 */}
        <ellipse cx="140" cy="92" rx="10" ry="6" fill={c+'20'} stroke={c} strokeWidth="1"/>
        <circle cx="140" cy="95" r="4" fill={c+'30'} stroke={c} strokeWidth="0.8"/>
        <circle cx="140" cy="95" r="2" fill={c+'50'} stroke={c} strokeWidth="0.5"/>
        {/* 엔진 */}
        <ellipse cx="140" cy="70" rx="8" ry="5" fill={c+'20'} stroke={c} strokeWidth="0.8"/>
        <rect x="132" y="65" width="16" height="8" rx="2" fill={c+'15'} stroke={c} strokeWidth="0.5"/>
        {/* 위성 안테나 */}
        <ellipse cx="128" cy="74" rx="8" ry="4" fill={c+'20'} stroke={c} strokeWidth="0.8" transform="rotate(-20,128,74)"/>
        {/* 무기 포드 */}
        <rect x="60" y="78" width="20" height="6" rx="2" fill={c+'22'} stroke={c} strokeWidth="0.5"/>
        <rect x="200" y="78" width="20" height="6" rx="2" fill={c+'22'} stroke={c} strokeWidth="0.5"/>
        {/* 전자식 EO/IR */}
        <circle cx="155" cy="82" r="5" fill={c+'18'} stroke={c} strokeWidth="0.8"/>

        {/* 위성 링크 */}
        <line x1="128" y1="70" x2="128" y2="45" stroke={c} strokeWidth="0.5" strokeDasharray="3,2" opacity="0.4"/>
        <circle cx="128" cy="40" r="4" fill="none" stroke={c} strokeWidth="0.5" strokeDasharray="2,1" opacity="0.5"/>
        <text x="110" y="35" style={labelStyle}>위성 링크</text>

        {/* 레이블 */}
        <line x1="140" y1="95" x2="170" y2="118" stroke={c} strokeWidth="0.5" strokeDasharray="2,1" opacity="0.6"/>
        <text x="172" y="122" style={labelStyle}>EO/IR 카메라 볼</text>
        <line x1="30" y1="78" x2="10" y2="62" stroke={c} strokeWidth="0.5" strokeDasharray="2,1" opacity="0.6"/>
        <text x="3" y="59" style={labelStyle}>복합재 주익</text>
        <line x1="60" y1="80" x2="40" y2="100" stroke={c} strokeWidth="0.5" strokeDasharray="2,1" opacity="0.6"/>
        <text x="10" y="104" style={labelStyle}>AGM-114 헬파이어</text>
        <line x1="140" y1="66" x2="160" y2="48" stroke={c} strokeWidth="0.5" strokeDasharray="2,1" opacity="0.6"/>
        <text x="162" y="46" style={labelStyle}>터보프롭 엔진</text>
        <line x1="118" y1="113" x2="95" y2="130" stroke={c} strokeWidth="0.5" strokeDasharray="2,1" opacity="0.6"/>
        <text x="60" y="134" style={labelStyle}>V형 꼬리날개</text>
      </svg>
    ),

    // ── SAM 상세 도면 ─────────────────────────────────────
    SAM: (
      <svg viewBox="0 0 280 160" className="w-full">
        {/* 발사대 차량 */}
        <rect x="30" y="105" width="90" height="25" rx="3" fill={c+'12'} stroke={c} strokeWidth="0.8"/>
        {/* 발사관 */}
        <rect x="35" y="80" width="80" height="28" rx="2" fill={c+'18'} stroke={c} strokeWidth="1"/>
        {/* 미사일 4발 */}
        {[42,55,68,81].map((x,i) => (
          <g key={i}>
            <polygon points={`${x},80 ${x+5},55 ${x+10},80`} fill={c+'20'} stroke={c} strokeWidth="0.6"/>
            <circle cx={x+5} cy="53" r="2.5" fill={c+'40'} stroke={c} strokeWidth="0.5"/>
          </g>
        ))}
        {/* 레이더 */}
        <rect x="150" y="95" width="100" height="20" rx="2" fill={c+'15'} stroke={c} strokeWidth="0.8"/>
        <line x1="200" y1="95" x2="200" y2="65" stroke={c} strokeWidth="1.2"/>
        {/* 위상 배열 레이더 */}
        <rect x="178" y="48" rx="3" width="44" height="18" fill={c+'20'} stroke={c} strokeWidth="1"/>
        {[182,188,194,200,206,212,218].map((x,i) => (
          <line key={i} x1={x} y1="48" x2={x} y2="66" stroke={c} strokeWidth="0.4" opacity="0.6"/>
        ))}
        {/* 빔 */}
        <line x1="178" y1="57" x2="90" y2="30" stroke={c} strokeWidth="0.6" strokeDasharray="3,2" opacity="0.5"/>
        <line x1="222" y1="57" x2="150" y2="15" stroke={c} strokeWidth="0.6" strokeDasharray="3,2" opacity="0.5"/>
        {/* 목표 */}
        <polygon points="130,18 125,28 135,28" fill="none" stroke="#ff2d55" strokeWidth="0.8"/>
        <circle cx="130" cy="18" r="6" fill="none" stroke="#ff2d55" strokeWidth="0.4" strokeDasharray="2,1"/>
        {/* 요격 경로 */}
        <path d="M55,68 Q90,30 130,20" fill="none" stroke={c} strokeWidth="0.5" strokeDasharray="2,1" opacity="0.4"/>

        {/* 차륜 */}
        {[45,75,160,190].map((x,i) => (
          <circle key={i} cx={x} cy="132" r="7" fill={c+'12'} stroke={c} strokeWidth="0.8"/>
        ))}

        {/* 레이블 */}
        <line x1="55" y1="55" x2="20" y2="40" stroke={c} strokeWidth="0.5" strokeDasharray="2,1" opacity="0.6"/>
        <text x="3" y="38" style={labelStyle}>요격 미사일</text>
        <line x1="200" y1="48" x2="220" y2="30" stroke={c} strokeWidth="0.5" strokeDasharray="2,1" opacity="0.6"/>
        <text x="222" y="28" style={labelStyle}>AESA 탐지 레이더</text>
        <line x1="130" y1="18" x2="150" y2="8" stroke={c} strokeWidth="0.5" strokeDasharray="2,1" opacity="0.5"/>
        <text x="152" y="8" style={labelStyle} fill="#ff2d55">표적</text>
        <line x1="45" y1="130" x2="25" y2="148" stroke={c} strokeWidth="0.5" strokeDasharray="2,1" opacity="0.6"/>
        <text x="3" y="152" style={labelStyle}>8×8 이동식 발사차량</text>
      </svg>
    ),
  }

  const categoryMap: Record<WeaponCategory, WeaponCategory> = {
    ICBM:'ICBM', IRBM:'ICBM', SRBM:'ICBM', SLBM:'ICBM', NUCLEAR:'ICBM',
    CRUISE:'CRUISE', ASM:'CRUISE', AAM:'CRUISE', SSM:'CRUISE',
    AIRCRAFT:'AIRCRAFT', HELICOPTER:'HELICOPTER',
    NAVAL:'NAVAL', SUBMARINE:'SUBMARINE',
    GROUND:'GROUND', ARTILLERY:'GROUND', MLRS:'MLRS',
    SAM:'SAM', UAV:'UAV', SATELLITE:'UAV', CYBER:'CYBER',
    PISTOL:'GROUND', RIFLE:'GROUND', SMG:'GROUND',
    SNIPER:'GROUND', MG:'GROUND', SHOTGUN:'GROUND', LAUNCHER:'MLRS',
    MISSILE:'CRUISE', SHIP:'NAVAL',
  }

  const key = categoryMap[category]
  const render = schematics[key] ?? schematics['AIRCRAFT']

  return (
    <div className="w-full bg-[#020b18]/80 border border-[#0a3050] p-3 rounded">
      <div className="text-[8px] font-black tracking-widest text-[#4a7a9b] mb-2 text-center">
        TECHNICAL SCHEMATIC — {name.toUpperCase()}
      </div>
      {render}
      <div className="flex items-center gap-3 mt-2 pt-2 border-t border-[#0a3050]">
        <div className="flex items-center gap-1">
          <div className="w-3 h-0.5 border-t border-dashed" style={{ borderColor: c, opacity: 0.6 }}/>
          <span className="text-[7px] text-[#4a7a9b]">참조선</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-1.5 rounded-sm" style={{ background: c+'20', border: `1px solid ${c}` }}/>
          <span className="text-[7px] text-[#4a7a9b]">구조물</span>
        </div>
        <div className="text-[7px] text-[#4a7a9b] ml-auto">기밀 해제 도면 · 교육용</div>
      </div>
    </div>
  )
}
