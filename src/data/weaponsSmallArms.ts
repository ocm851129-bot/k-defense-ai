// ══════════════════════════════════════════════════════════════════════════════
// 소화기 데이터베이스 — 권총·소총·기관총·저격총·기관단총·유탄발사기
// 출처: Wikipedia, Jane's Infantry Weapons, IISS Military Balance
// 이미지: Wikimedia Commons (CC-licensed)
// ══════════════════════════════════════════════════════════════════════════════
import type { WeaponSystem } from './weapons'

const sa = (
  id: string, name: string, nameEng: string,
  category: WeaponSystem['category'],
  origin: WeaponSystem['origin'],
  status: WeaponSystem['status'],
  threat: WeaponSystem['threatRating'],
  desc: string, specs: WeaponSystem['specs'],
  tags: string[], sources: string[],
  imageUrl?: string, wikiUrl?: string,
  confidence = 95, detail = ''
): WeaponSystem => ({
  id, name, nameEng, category, origin, status, threatRating: threat,
  description: desc,
  detail: detail || `## ${nameEng}\n\n${desc}\n\n### 주요 제원\n${Object.entries(specs).filter(([,v])=>v).map(([k,v])=>`- ${k}: ${v}`).join('\n')}`,
  specs, confidence, lastUpdated: '2026-06-28',
  relatedIntelIds: [], tags, sources, imageUrl, wikiUrl,
})

export const WEAPONS_SMALL_ARMS: WeaponSystem[] = [

  // ════════════════════════════════════════════════════════
  // 대한민국 소화기
  // ════════════════════════════════════════════════════════

  sa('sa-rok-001','K5 권총','Daewoo K5 Pistol (DP51)','PISTOL','ROK','OPERATIONAL','LOW',
    '대한민국 표준 군용 권총. 대우정밀(현 S&T모티브) 개발. 9mm Parabellum. 1990년 채택. 한국군 장교·헌병 표준 장비. 더블/싱글액션 방식.',
    {weight:'760g(장전)', length:'190mm', caliber:'9×19mm Parabellum', capacity:'13+1발', range:'50m(유효)', propulsion:'DA/SA', manufacturer:'S&T모티브', firstDeployed:'1990년'},
    ['권총','K5','DP51','대한민국','9mm'],['S&T모티브','Jane\'s','Wikipedia'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/K5_%EC%B4%9D.jpg/320px-K5_%EC%B4%9D.jpg',
    'https://en.wikipedia.org/wiki/Daewoo_DP51',95,
    `## 대우 K5 (DP51)\n\n대우정밀공업(현 S&T모티브)이 개발한 대한민국 최초의 국산 군용 권총. 더블/싱글액션(DA/SA) 방식으로 안전성이 높다.\n\n### 주요 특징\n- 9×19mm Parabellum 탄약\n- 13+1발 탄창 (더블스택)\n- 더블액션/싱글액션 복합\n- 한국군 장교·헌병 표준 지급\n- 민수 수출명 DP51\n\n### 운용 현황\n한국군 전 병과 장교 계층 및 헌병대 지급. 수출: 미국·캐나다 민수 시장(DP51 브랜드). 현재 K5 Compact 개발 중.`),

  sa('sa-rok-002','K2 소총','K2 Assault Rifle','RIFLE','ROK','OPERATIONAL','MED',
    '대한민국 표준 돌격소총. 5.56mm NATO. 1984년 배치. K2C1으로 현대화 중. 한국군 약 200만 정 운용. 가스작동식 롤링볼트 방식.',
    {weight:'3.26kg(탄창제외)', length:'980mm(전개)', caliber:'5.56×45mm NATO', capacity:'30발', range:'460m(유효)', fireRate:'700~900rpm', propulsion:'가스작동식 롤링볼트', manufacturer:'S&T모티브', firstDeployed:'1984년'},
    ['소총','K2','한국군','5.56mm','돌격소총'],['S&T모티브','Jane\'s','Wikipedia'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/K2_rifle_%281%29.jpg/320px-K2_rifle_%281%29.jpg',
    'https://en.wikipedia.org/wiki/Daewoo_K2',97,
    `## K2 돌격소총\n\n국방과학연구소(ADD)와 대우정밀이 공동 개발. M16을 대체한 한국군 표준 개인화기.\n\n### 주요 특징\n- 가스작동식 롤링볼트 방식 (AR-18 계열)\n- 폴딩 개머리판 (내부 스프링 내장) — 세계적으로 독특한 설계\n- 단발/3점사/연발 선택\n- K201 유탄발사기 장착 가능\n- 영하 50°C~영상 60°C 극한 환경 동작\n\n### 개량형 (K2C1)\n- 피카티니 레일 시스템 추가\n- 조정간/개머리판 개량\n- 2016년부터 신병·특수부대 우선 보급`),

  sa('sa-rok-003','K2C1 소총','K2C1 Carbine','RIFLE','ROK','OPERATIONAL','MED',
    'K2 소총의 현대화 개량형. 피카티니 레일, 개량형 접이식 개머리판, 야간 광학장비 호환. 2016년부터 단계적 교체 중.',
    {weight:'3.5kg(탄창제외)', length:'838mm(전개)/614mm(접이)', caliber:'5.56×45mm NATO', capacity:'30발', fireRate:'700~900rpm', manufacturer:'S&T모티브', firstDeployed:'2016년'},
    ['소총','K2C1','현대화','피카티니레일','한국군'],['S&T모티브','ADD'],
    undefined,'https://en.wikipedia.org/wiki/K2C1'),

  sa('sa-rok-004','K1A 기관단총','K1A Submachine Gun / Carbine','SMG','ROK','OPERATIONAL','LOW',
    '한국군 전차승무원·특수부대·헌병 전투용. 5.56mm NATO. 1981년 채택. 절충된 기관단총/카빈 형태. K2보다 250mm 짧아 차량 운용 유리.',
    {weight:'2.87kg(탄창제외)', length:'838mm(전개)/653mm(접이)', caliber:'5.56×45mm NATO', capacity:'30발', range:'250m(유효)', fireRate:'700~900rpm', manufacturer:'S&T모티브', firstDeployed:'1981년'},
    ['기관단총','K1A','카빈','전차승무원','특수부대'],['Jane\'s','Wikipedia'],
    undefined,'https://en.wikipedia.org/wiki/K1_(submachine_gun)'),

  sa('sa-rok-005','K7 소음기관단총','K7 Silenced Submachine Gun','SMG','ROK','OPERATIONAL','MED',
    '한국군 특수부대 전용 소음기관단총. 9mm. 2003년 채택. 707 특임대·UDT/SEAL 등 특수부대 운용. 일체형 소음기 내장.',
    {weight:'2.8kg(소음기 포함)', length:'580mm(전개)', caliber:'9×19mm', capacity:'30발', fireRate:'900rpm(추정)', manufacturer:'S&T모티브', firstDeployed:'2003년'},
    ['기관단총','K7','소음','특수부대','707특임대'],['Jane\'s'],
    undefined,'https://en.wikipedia.org/wiki/K7_submachine_gun'),

  sa('sa-rok-006','K14 저격소총','K14 Sniper Rifle','SNIPER','ROK','OPERATIONAL','HIGH',
    '한국 국산 볼트액션 저격소총. 7.62mm NATO. 800~1,000m 유효사거리. 한국군 저격수 표준 장비. 2013년 배치. 임무에 따라 스코프 교체 가능.',
    {weight:'6.2kg(스코프 포함)', length:'1,170mm', caliber:'7.62×51mm NATO', capacity:'10발', range:'1,000m(유효)', propulsion:'볼트액션', manufacturer:'S&T모티브', firstDeployed:'2013년'},
    ['저격소총','K14','7.62mm','볼트액션','한국군저격'],['S&T모티브','ADD'],
    undefined,'https://en.wikipedia.org/wiki/K14_sniper_rifle'),

  sa('sa-rok-007','K6 중기관총','K6 Heavy Machine Gun','MG','ROK','OPERATIONAL','HIGH',
    '한국 국산 12.7mm 중기관총. 미국 M2HB의 영향을 받은 설계. K1·K200 장갑차 동축·거치 운용. 한국군 표준 중기관총.',
    {weight:'38.1kg(삼각대 제외)', length:'1,654mm', caliber:'12.7×99mm NATO(.50 BMG)', fireRate:'450~600rpm', range:'1,800m(유효)', manufacturer:'S&T모티브', firstDeployed:'1990년대'},
    ['기관총','K6','12.7mm','중기관총','K200장갑차'],['Jane\'s'],
    undefined,'https://en.wikipedia.org/wiki/K6_heavy_machine_gun'),

  sa('sa-rok-008','K12 다목적기관총','K12 GPMG','MG','ROK','OPERATIONAL','MED',
    '한국 국산 7.62mm 다목적기관총(GPMG). M60을 대체. 보병용·차량 거치용. 2014년 배치.',
    {weight:'8.5kg', length:'1,233mm', caliber:'7.62×51mm NATO', fireRate:'700~900rpm', range:'800m(유효)', manufacturer:'S&T모티브', firstDeployed:'2014년'},
    ['기관총','K12','GPMG','7.62mm'],['Jane\'s'],
    undefined,'https://en.wikipedia.org/wiki/K12_machine_gun'),

  sa('sa-rok-009','K11 복합형 소총','K11 Air Burst Weapon','RIFLE','ROK','OPERATIONAL','HIGH',
    '세계 최초 양산된 스마트 공중폭발탄 복합소총. 5.56mm 소총 + 20mm 공중폭발탄 발사기 복합. 은엄폐 목표 타격 가능. 레이저 거리 측정기 내장.',
    {weight:'6.1kg(장전)', length:'860mm', caliber:'5.56mm + 20mm 공중폭발탄', fireRate:'단발(20mm)/700rpm(5.56mm)', manufacturer:'S&T모티브', firstDeployed:'2010년'},
    ['복합소총','K11','20mm','공중폭발탄','스마트무기'],['S&T모티브','ADD','Jane\'s'],
    undefined,'https://en.wikipedia.org/wiki/K11_multi-purpose_individual_weapon',90),

  sa('sa-rok-010','K201 유탄발사기','K201 Grenade Launcher','LAUNCHER','ROK','OPERATIONAL','MED',
    'K2/K2C1 소총 하부 장착형 40mm 유탄발사기. 미국 M203과 유사. 한국군 표준 유탄발사기.',
    {weight:'1.36kg(단독)', length:'375mm', caliber:'40×46mm', capacity:'1발', range:'400m(유효)', manufacturer:'S&T모티브', firstDeployed:'1980년대'},
    ['유탄발사기','K201','40mm','한국군','M203계열'],['Jane\'s'],
    undefined,'https://en.wikipedia.org/wiki/K201_grenade_launcher'),

  // ════════════════════════════════════════════════════════
  // 미국 소화기
  // ════════════════════════════════════════════════════════

  sa('sa-usa-001','Glock 17 Gen5','Glock 17 Gen5 Pistol','PISTOL','USA','OPERATIONAL','LOW',
    '세계 최다 판매 군용 권총. 오스트리아 Glock GmbH 제조. 60개국 이상 군경 운용. 폴리머 프레임으로 경량. 미군 XM17 사업 참여.',
    {weight:'625g(탄창제외)/905g(장전)', length:'202mm', caliber:'9×19mm Parabellum', capacity:'17+1발', range:'50m(유효)', propulsion:'Safe Action (스트라이커)', manufacturer:'Glock GmbH (오스트리아)', firstDeployed:'1982년(Gen1)/2017년(Gen5)'},
    ['권총','Glock','9mm','글록','세계최다판매'],['Glock','Jane\'s','Wikipedia'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Glock_17.jpg/320px-Glock_17.jpg',
    'https://en.wikipedia.org/wiki/Glock_17',99,
    `## Glock 17 Gen5\n\n오스트리아 Glock GmbH가 설계한 세계적 베스트셀러 권총. 폴리머 프레임과 Safe Action 방식으로 안전·경량·신뢰성을 동시에 달성.\n\n### 주요 특징\n- 폴리머 프레임 (철보다 80% 경량)\n- Safe Action 트리거 (3중 안전장치)\n- 17발 더블스택 탄창\n- 피카티니 레일 (Gen4+ 표준)\n- 유지보수 부품 약 34개 (업계 최소)\n\n### Gen5 개선사항\n- 플루티드(홈파임) 배럴\n- 앞부분 손잡이 홈 제거\n- 두 방향 탄창 멈치\n- nDLC 표면 처리 (내식성 강화)\n\n### 세계 운용 현황\n60개국+ 군경 채택. 미국 경찰 65%+ 운용. 한국 경찰청도 도입 검토 중.`),

  sa('sa-usa-002','SIG Sauer M17 (P320)','SIG Sauer M17/M18 (P320)','PISTOL','USA','OPERATIONAL','LOW',
    '미군 현행 표준 권총. SIG Sauer P320 기반. 2017년 M9(베레타) 공식 대체. 미 육군·공군·해병대 채택. M17(풀사이즈)/M18(컴팩트) 두 버전.',
    {weight:'833g(장전)', length:'203mm(M17)', caliber:'9×19mm Parabellum', capacity:'17+1발(M17)/21+1발(확장)', propulsion:'스트라이커 방식', manufacturer:'SIG Sauer Inc. (미국)', firstDeployed:'2017년'},
    ['권총','M17','SIG','P320','미군표준'],['US Army','SIG Sauer','Jane\'s'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/SIG_SAUER_P320_pistol.jpg/320px-SIG_SAUER_P320_pistol.jpg',
    'https://en.wikipedia.org/wiki/SIG_Sauer_M17',97,
    `## SIG Sauer M17 / M18\n\n미군 Modular Handgun System(MHS) 사업에서 베레타 M9 후계로 선정. SIG Sauer P320 기반.\n\n### 주요 특징\n- 모듈식 설계 (그립/프레임 분리·교체)\n- M17(풀사이즈 배럴)/M18(컴팩트)\n- 배럴과 슬라이드 교체만으로 구경 변경 가능\n- 제조사 보증 무제한 실사격 신뢰성\n\n### MHS 사업 결과\n- 계약금액: $580M(소총+권총 복합)\n- 2017년 1월 선정 발표\n- 2018년부터 82공수사단 최초 배치\n- 2023년까지 전군 M9 완전 대체 목표`),

  sa('sa-usa-003','Beretta M9','Beretta M9 Pistol','PISTOL','USA','OPERATIONAL','LOW',
    '미군 1985~2017년 표준 권총. 이탈리아 베레타 92FS 기반. M17로 대체 중이나 일부 부대 계속 운용. 40여 개국 군경 채택.',
    {weight:'945g(장전)', length:'217mm', caliber:'9×19mm', capacity:'15+1발', propulsion:'DA/SA', manufacturer:'베레타(이탈리아)/Beretta USA', firstDeployed:'1985년'},
    ['권총','M9','베레타','Beretta','9mm','미군'],['Beretta','US DoD','Wikipedia'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Beretta_M9_pistol.jpg/320px-Beretta_M9_pistol.jpg',
    'https://en.wikipedia.org/wiki/Beretta_M9'),

  sa('sa-usa-004','Colt M1911A1','Colt M1911A1 Pistol','PISTOL','USA','OPERATIONAL','LOW',
    '미군 1911~1985년 표준 권총. .45 ACP 탄약. 존 브라우닝 설계 걸작. 제1·2차세계대전·한국전쟁·베트남전 사용. 현재도 일부 특수부대 운용.',
    {weight:'1,105g(장전)', length:'216mm', caliber:'.45 ACP (11.43×23mm)', capacity:'7+1발', propulsion:'싱글액션', manufacturer:'콜트(Colt Defense)', firstDeployed:'1911년'},
    ['권총','M1911','콜트','45구경','클래식'],['Colt','Wikipedia','Jane\'s'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/M1911A1.jpg/320px-M1911A1.jpg',
    'https://en.wikipedia.org/wiki/M1911_pistol'),

  sa('sa-usa-005','Desert Eagle','Desert Eagle Mark XIX','PISTOL','USA','OPERATIONAL','LOW',
    '세계 최대 상업용 세미자동 권총. .50AE·.44매그넘·.357매그넘 지원. IMI(이스라엘)/Magnum Research 공동 개발. 영화·게임에서 상징적 무기.',
    {weight:'2,050g(.50AE)', length:'269mm', caliber:'.50 AE / .44 Mag / .357 Mag', capacity:'7발(.50AE)', propulsion:'가스작동식(권총 중 특이)', manufacturer:'Magnum Research / IMI', firstDeployed:'1983년'},
    ['권총','데저트이글','Desert Eagle','50AE','매그넘','영화'],['Magnum Research','Wikipedia'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Desert_Eagle_50_AE.jpg/320px-Desert_Eagle_50_AE.jpg',
    'https://en.wikipedia.org/wiki/Desert_Eagle',90,
    `## Desert Eagle Mark XIX\n\nMagnum Research(미국)와 IMI(이스라엘)가 공동 개발한 가스작동식 대구경 반자동 권총. 권총으로는 드문 가스작동 방식.\n\n### 주요 특징\n- .50 AE / .44 Magnum / .357 Magnum 세 구경 지원\n- 가스작동식(권총 중 매우 이례적)\n- 배럴 교체로 구경 변경 가능\n- 스테인리스·티타늄 마감 옵션\n\n### 문화적 영향\n- 영화 [매트릭스], [이퀄리브리엄], 게임 [CS:GO] 등 수십 편 등장\n- 실용적이기보단 컬렉터·스포츠 사격용\n- 강력한 반동으로 군경 실용 채택은 극히 드묾`),

  sa('sa-usa-006','M4A1 카빈','M4A1 Carbine','RIFLE','USA','OPERATIONAL','HIGH',
    '미군 현행 표준 돌격소총. M16의 카빈화. 약 90만 정 미군 운용. SOPMOD 키트로 전술 개량. 5.56mm NATO. 세계 50개국+ 운용.',
    {weight:'3.0kg(탄창제외)', length:'838mm(전개)/757mm(접이)', caliber:'5.56×45mm NATO', capacity:'30발', range:'500m(유효)', fireRate:'700~950rpm', manufacturer:'콜트/대니얼 디펜스/FN', firstDeployed:'1994년'},
    ['소총','M4A1','미군','5.56mm','카빈','SOPMOD'],['US Army','Colt','FN','Jane\'s'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/M4-Carbine-Sand.jpg/320px-M4-Carbine-Sand.jpg',
    'https://en.wikipedia.org/wiki/M4_carbine',99,
    `## M4A1 카빈\n\n미군 개인화기 체계의 핵심. M16A2 소총의 카빈(단축)화 버전으로 1994년 채택.\n\n### SOPMOD (Special Operations Peculiar Modification) 키트\n- AN/PEQ-2A 레이저 조준기\n- AN/PAQ-4C 적외선 레이저\n- TA01NSN 4× ACOG 광학 조준경\n- M203 또는 M320 유탄발사기\n- SureFire M600 전술 손전등\n- HK AG-C EGLM\n\n### M4A1 vs M4 차이\n- M4A1: 완전 자동(Automatic) 가능\n- M4: 단발·3점사(Burst)만 가능\n- 현재 신규 생산분은 모두 M4A1`),

  sa('sa-usa-007','M16A4 소총','M16A4 Rifle','RIFLE','USA','OPERATIONAL','HIGH',
    '미 해병대 주력 소총. M4 카빈과 병용. 풀 배럴(20인치)로 사거리 우수. 5.56mm NATO. 피카티니 레일 RIS 표준.',
    {weight:'3.26kg(탄창제외)', length:'1,006mm', caliber:'5.56×45mm NATO', capacity:'30발', range:'550m(유효)/3,600m(최대)', fireRate:'800rpm', manufacturer:'FN Manufacturing USA', firstDeployed:'1997년(A4)'},
    ['소총','M16','미해병대','5.56mm'],['USMC','FN','Wikipedia'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/M16A4_M203.jpg/320px-M16A4_M203.jpg',
    'https://en.wikipedia.org/wiki/M16_rifle'),

  sa('sa-usa-008','HK416 소총','Heckler & Koch HK416','RIFLE','USA','OPERATIONAL','HIGH',
    '미 육군 특수부대(Delta Force·SEAL Team 6) 주력 소총. M4A1 대체 중. 노르웨이·독일·프랑스군 표준. 오사마 빈 라덴 사살 작전 사용.',
    {weight:'3.49kg(탄창제외)', length:'854mm(D14.5RS)', caliber:'5.56×45mm NATO', capacity:'30발', range:'300~500m(유효)', fireRate:'700~900rpm', manufacturer:'Heckler & Koch', firstDeployed:'2004년'},
    ['소총','HK416','특수부대','독일','HK','빈라덴'],['H&K','USSOCOM','Jane\'s'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/HK416-A5.jpg/320px-HK416-A5.jpg',
    'https://en.wikipedia.org/wiki/HK416',98,
    `## HK416\n\nH&K가 미 특수작전부대 요청으로 개발. M4A1의 가스직동식을 가스피스톤 방식으로 교체해 신뢰성 대폭 향상.\n\n### M4A1 대비 개선점\n- 가스피스톤 방식 (가스직동 대비 탄소 퇴적 70% 감소)\n- 더 긴 부품 수명 (배럴 교체 주기 2.5배)\n- 물·모래·먼지 환경 신뢰성 강화\n\n### 유명 작전\n- 2011년 넵튠 스피어 작전(오사마 빈라덴 사살) SEAL Team 6 사용\n- DEVGRU (SEAL Team 6) 표준 소총\n\n### 채택 국가\n- 미국: Delta Force, SEAL Team 6, FBI HRT\n- 독일: KSK 특수부대\n- 노르웨이: FSK 특수부대\n- 프랑스: 육군 표준 (HK416F, 2017년)\n- 한국: 특수부대 일부 도입`),

  sa('sa-usa-009','M249 SAW','M249 Squad Automatic Weapon','MG','USA','OPERATIONAL','MED',
    '미군 분대 자동화기(SAW). FN Minimi 기반. 5.56mm. 경기관총 역할. 이라크·아프간전 주력 지원화기. 분대 화력지원 핵심.',
    {weight:'7.5kg(빈총)', length:'1,041mm', caliber:'5.56×45mm NATO', capacity:'200발(드럼)/100발(박스)', fireRate:'750~1,000rpm', range:'600m(유효)', manufacturer:'FN Manufacturing USA', firstDeployed:'1984년'},
    ['기관총','M249','SAW','FN Minimi','분대자동화기','이라크전'],['FN','US Army','Wikipedia'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/M249_SAW_-_Horizontal.jpg/320px-M249_SAW_-_Horizontal.jpg',
    'https://en.wikipedia.org/wiki/M249_light_machine_gun'),

  sa('sa-usa-010','M240 기관총','M240 General Purpose Machine Gun','MG','USA','OPERATIONAL','HIGH',
    '미군 7.62mm 다목적기관총. FN MAG 기반. 보병·차량·항공기 거치. 이라크·아프간 주력 화력지원. M60 대체.',
    {weight:'12.5kg', length:'1,232mm', caliber:'7.62×51mm NATO', capacity:'100발 벨트', fireRate:'650~950rpm', range:'1,100m(유효)/3,725m(최대)', manufacturer:'FN Manufacturing USA', firstDeployed:'1977년(미 기갑)/1995년(보병)'},
    ['기관총','M240','GPMG','7.62mm','차량거치'],['FN','US Army','Jane\'s'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/M240_machine_gun.jpg/320px-M240_machine_gun.jpg',
    'https://en.wikipedia.org/wiki/M240_machine_gun'),

  sa('sa-usa-011','M2HB 중기관총','M2HB Browning Heavy Machine Gun','MG','USA','OPERATIONAL','HIGH',
    '브라우닝 설계 12.7mm 중기관총. 1933년 이후 현재까지 운용. 세계 최장수 군용 화기 중 하나. 차량·함정·항공기 거치. 100여 개국 운용.',
    {weight:'38.1kg', length:'1,653mm', caliber:'12.7×99mm NATO(.50 BMG)', fireRate:'450~600rpm', range:'1,830m(유효)/6,764m(최대)', manufacturer:'General Dynamics', firstDeployed:'1933년'},
    ['기관총','M2HB','브라우닝','12.7mm','50구경','중기관총'],['US Army','General Dynamics','Wikipedia'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/M2HB_60-6914A.jpg/320px-M2HB_60-6914A.jpg',
    'https://en.wikipedia.org/wiki/M2_machine_gun'),

  sa('sa-usa-012','M82A1 저격소총','Barrett M82A1 Anti-Materiel Rifle','SNIPER','USA','OPERATIONAL','HIGH',
    '배럿 .50 BMG 반자동 저격소총. 대물저격총(AMR). 1,800m 유효사거리. 폭발물 처리·레이더·항공기 타이어 저격 가능. 20여 개국 운용.',
    {weight:'13.4kg', length:'1,448mm', caliber:'.50 BMG (12.7×99mm)', capacity:'10발', range:'1,800m(유효)/6,800m(최대)', propulsion:'반자동 가스작동', manufacturer:'Barrett Firearms Manufacturing', firstDeployed:'1989년'},
    ['저격소총','Barrett','M82','50BMG','대물저격','AMR'],['Barrett','US Marines','Jane\'s'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Barrett_M82A1_USMC.jpg/320px-Barrett_M82A1_USMC.jpg',
    'https://en.wikipedia.org/wiki/Barrett_M82',97,
    `## Barrett M82A1\n\nRonnie Barrett이 설계한 .50 BMG 대물저격총. 세계 최초 양산 반자동 대물저격총.\n\n### 주요 특징\n- 반동 감쇄 시스템 (2중 머즐 브레이크 + 슬라이딩 배럴)\n- 10발 더블스택 탄창\n- 유효사거리 1,800m / 최대 6,800m\n- M903 SLAP탄 사용 시 관통력 극대화\n\n### 운용 임무\n- 대물저격 (레이더·차량 타이어·항공기 엔진)\n- EOD(폭발물처리) 지원\n- 경장갑 차량 저격\n- 걸프전·아프간전·이라크전 실전 사용\n\n### 파생형\n- M82A1A: 미 해병대 표준\n- M82A1M: 개량형\n- M107: 미 육군 정식 명칭\n- M82A2: 불펍 버전 (단종)`),

  sa('sa-usa-013','M24 저격소총','M24 Sniper Weapon System','SNIPER','USA','OPERATIONAL','HIGH',
    '미군 표준 볼트액션 저격총. 레밍턴 700 기반. 7.62mm NATO. 800m 유효사거리. 2009년 M2010으로 부분 대체.',
    {weight:'5.4kg(스코프 포함)', length:'1,092mm', caliber:'7.62×51mm NATO', capacity:'5+1발', range:'800m(유효)', propulsion:'볼트액션', manufacturer:'Remington Arms', firstDeployed:'1988년'},
    ['저격소총','M24','레밍턴','볼트액션','7.62mm'],['US Army','Remington','Wikipedia'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/M24_Sniper_Weapon_System.jpg/320px-M24_Sniper_Weapon_System.jpg',
    'https://en.wikipedia.org/wiki/M24_sniper_weapon_system'),

  sa('sa-usa-014','MP5 기관단총','Heckler & Koch MP5','SMG','USA','OPERATIONAL','MED',
    'H&K 롤러 지연식 기관단총. 1966년 이후 세계 최다 운용 기관단총 중 하나. 40개국+ 특수부대·경찰 표준.',
    {weight:'2.54kg(탄창제외)', length:'680mm(전개)/490mm(접이)', caliber:'9×19mm Parabellum', capacity:'30발', fireRate:'800rpm', range:'100~200m', manufacturer:'Heckler & Koch', firstDeployed:'1966년'},
    ['기관단총','MP5','HK','특수부대','경찰','SWAT'],['H&K','Jane\'s','Wikipedia'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Heckler_%26_Koch_MP5A3.jpg/320px-Heckler_%26_Koch_MP5A3.jpg',
    'https://en.wikipedia.org/wiki/Heckler_%26_Koch_MP5',98,
    `## HK MP5\n\nH&K의 롤러 지연 폐쇄식 기관단총. 9mm 권총탄을 사용하는 클로즈드 볼트 방식으로 정확도 우수.\n\n### 파생형 (30+ 모델)\n- MP5A2: 고정 개머리판\n- MP5A3: 접이식 개머리판\n- MP5K: 초단축 (PDW)\n- MP5SD: 일체형 소음기\n- MP5/10: 10mm Auto\n- MP5/40: .40 S&W\n\n### 세계 운용\n- 독일 GSG9, 영국 SAS, 미국 FBI HRT, SEAL 팀\n- 한국 707 특임대\n- 30개국+ 60개+ 경찰·군 특수부대\n\n### 특징\n- 클로즈드 볼트: 정확도 높지만 먼지에 취약\n- 롤러 지연: 간단한 구조\n- 반동 제어 우수`),

  sa('sa-usa-015','M203 유탄발사기','M203 Grenade Launcher','LAUNCHER','USA','OPERATIONAL','MED',
    'M16/M4 하부 장착형 40mm 유탄발사기. 1969년 배치. 세계 표준 총기 부착 유탄발사기. 한국 K201의 원형.',
    {weight:'1.36kg(단독)', length:'380mm', caliber:'40×46mm', capacity:'1발', range:'400m(직사)/350m(에어버스트)', manufacturer:'AAI Corp / L3 Technologies', firstDeployed:'1969년'},
    ['유탄발사기','M203','40mm','M16','M4','베트남전'],['US Army','Jane\'s','Wikipedia'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/M203-afmil.jpg/320px-M203-afmil.jpg',
    'https://en.wikipedia.org/wiki/M203_grenade_launcher'),

  // ════════════════════════════════════════════════════════
  // 소련·러시아 소화기
  // ════════════════════════════════════════════════════════

  sa('sa-rus-001','AK-47 돌격소총','AK-47 Assault Rifle','RIFLE','RUSSIA','OPERATIONAL','HIGH',
    '역사상 가장 많이 생산된 돌격소총. 1947년 칼라시니코프 설계. 약 1억 정 생산. 세계 최다 운용 소화기. 단순·견고·저렴.',
    {weight:'4.3kg(장전)', length:'880mm', caliber:'7.62×39mm', capacity:'30발', range:'400m(유효)', fireRate:'600rpm', propulsion:'가스작동식 롤링볼트', manufacturer:'칼라시니코프(이즈마시)', firstDeployed:'1949년'},
    ['소총','AK-47','AK','칼라시니코프','7.62mm','소련','1억정'],['Jane\'s','Wikipedia','IISS'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/AK-47_type_II_Part_DM-ST-89-01131.jpg/320px-AK-47_type_II_Part_DM-ST-89-01131.jpg',
    'https://en.wikipedia.org/wiki/AK-47',99,
    `## AK-47 (Avtomat Kalashnikova 1947)\n\n미하일 칼라시니코프가 1947년 설계. 세계에서 가장 많이 생산되고 운용되는 돌격소총.\n\n### 설계 철학\n- 극도의 단순성: 부품 8개로 분해\n- 극한 환경 신뢰성: 모래·진흙·물 속 작동\n- 저렴한 생산비: 다수 국가 라이선스 생산\n- AK-47 → AKM → AK-74 → AK-12로 계보\n\n### 생산 현황\n- 추정 총 생산량: 7,500만~1억 정\n- 50개국+ 정규군 채택\n- 비정규군·테러단체 가장 선호하는 무기\n\n### 우크라이나 전쟁에서\n- 러시아군 AK-74M / AK-12 주력\n- 우크라이나군도 AK-74 계열 대량 운용\n- 서방 M4/HK416 도입으로 비율 변화 중`),

  sa('sa-rus-002','AK-74M 소총','AK-74M Assault Rifle','RIFLE','RUSSIA','OPERATIONAL','HIGH',
    '러시아 현행 표준 돌격소총. AK-47의 5.45mm 개량형. 1974년 이후 소련·러시아군 주력. AK-74M은 폴딩 개머리판 추가판.',
    {weight:'3.3kg(탄창제외)', length:'943mm(전개)/704mm(접이)', caliber:'5.45×39mm', capacity:'30발', range:'500m(유효)', fireRate:'600rpm', manufacturer:'칼라시니코프 콘체른', firstDeployed:'1974년(AK-74)/1991년(AK-74M)'},
    ['소총','AK-74','5.45mm','러시아군','칼라시니코프'],['Jane\'s','Wikipedia'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/AK-74M_Kalashnikov.jpg/320px-AK-74M_Kalashnikov.jpg',
    'https://en.wikipedia.org/wiki/AK-74'),

  sa('sa-rus-003','RPG-7 대전차 로켓','RPG-7 Anti-Tank Rocket Launcher','LAUNCHER','RUSSIA','OPERATIONAL','HIGH',
    '세계 최다 운용 대전차 로켓 발사기. 1961년 이후 현재까지 운용. 약 900만 정 생산. 저가·단순·효과적.',
    {weight:'7kg(로켓 포함)', length:'950mm', caliber:'40mm(발사관)/85mm(탄두)', range:'200~500m(대전차)/920m(최대)', penetration:'500mm RHA(기본탄두)', manufacturer:'바줄트 기업(러시아)', firstDeployed:'1961년'},
    ['로켓','RPG-7','대전차','비정규전','소련','테러'],['Jane\'s','Wikipedia','SIPRI'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/RPG-7_detached_warheads_2.jpg/320px-RPG-7_detached_warheads_2.jpg',
    'https://en.wikipedia.org/wiki/RPG-7',98,
    `## RPG-7 (Reaktivnyy Protivotankovy Granatomyot)\n\n소련의 대전차 로켓 발사기. 세계에서 가장 많이 사용된 대전차 무기.\n\n### 주요 특징\n- 재사용 가능한 발사관 + 일회용 로켓탄\n- 다양한 탄두 선택 가능:\n  - PG-7V: 기본 HEAT 탄두 (500mm 관통)\n  - PG-7VR: 탠덤 HEAT (650mm 관통, 폭발반응장갑 무력화)\n  - OG-7V: 대인/파편 탄두\n  - TBG-7V: 열압력(thermobaric) 탄두\n\n### 우크라이나 전쟁 활용\n- 양측 모두 대량 사용\n- 드론 공격 방어에도 활용 사례\n- 서방 NLAW·재블린과 혼용\n\n### 세계 확산\n- 비정규전 단체 선호 (저렴·구하기 쉬움)\n- 분쟁 지역 75개국+ 확산`),

  sa('sa-rus-004','Dragunov SVD 저격소총','Dragunov SVD Sniper Rifle','SNIPER','RUSSIA','OPERATIONAL','HIGH',
    '소련·러시아 표준 반자동 지정사수소총(DMR). 7.62×54mmR. 800m 유효. 1963년 이후 50개국 이상 운용.',
    {weight:'4.31kg(광학조준경 포함)', length:'1,225mm', caliber:'7.62×54mmR', capacity:'10발', range:'800m(유효)/1,300m(최대)', propulsion:'반자동 가스작동', manufacturer:'이즈마시(현 칼라시니코프)', firstDeployed:'1963년'},
    ['저격소총','SVD','드라구노프','7.62mm','소련','DMR'],['Jane\'s','Wikipedia'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Dragunov_SVD.jpg/320px-Dragunov_SVD.jpg',
    'https://en.wikipedia.org/wiki/Dragunov_sniper_rifle'),

  sa('sa-rus-005','PK/PKM 기관총','PK/PKM General Purpose Machine Gun','MG','RUSSIA','OPERATIONAL','HIGH',
    '칼라시니코프 설계 7.62mm 다목적기관총. PKM은 개량된 경량화 버전. 소련·러시아·동구권 표준 GPMG. 80개국+ 운용.',
    {weight:'9kg(PKM, 빈총)', length:'1,160mm', caliber:'7.62×54mmR', capacity:'100~250발 벨트', fireRate:'650~750rpm', range:'1,000m(유효)', manufacturer:'칼라시니코프', firstDeployed:'1961년(PK)/1969년(PKM)'},
    ['기관총','PK','PKM','칼라시니코프','GPMG','7.62mm'],['Jane\'s','Wikipedia'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/PKM_machine_gun.jpg/320px-PKM_machine_gun.jpg',
    'https://en.wikipedia.org/wiki/PK_machine_gun'),

  // ════════════════════════════════════════════════════════
  // 독일 소화기
  // ════════════════════════════════════════════════════════

  sa('sa-deu-001','HK G36 소총','Heckler & Koch G36','RIFLE','GERMANY','OPERATIONAL','MED',
    '독일 연방군 표준 돌격소총. 1997~2020년 주력. 5.56mm NATO. 폴리머 소재. G36C(카빈)/G36K(단축) 파생형. 스페인·멕시코·사우디 운용.',
    {weight:'3.63kg(탄창제외)', length:'998mm(전개)/758mm(접이)', caliber:'5.56×45mm NATO', capacity:'30발', range:'200~500m(유효)', fireRate:'750rpm', manufacturer:'Heckler & Koch', firstDeployed:'1997년'},
    ['소총','G36','HK','독일군','5.56mm'],['H&K','Bundeswehr','Wikipedia'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/HK_G36.jpg/320px-HK_G36.jpg',
    'https://en.wikipedia.org/wiki/Heckler_%26_Koch_G36'),

  sa('sa-deu-002','HK433 소총 (G95K)','Heckler & Koch HK433 (G95K)','RIFLE','GERMANY','OPERATIONAL','MED',
    '독일 차기 표준 소총. G36 대체. 2023년 독일 연방군 정식 채택(G95K). 모듈식 설계. 폴딩 개머리판.',
    {weight:'3.2kg(탄창제외)', length:'900mm(전개)/700mm(접이)', caliber:'5.56×45mm NATO', capacity:'30발', manufacturer:'Heckler & Koch', firstDeployed:'2023년'},
    ['소총','HK433','G95K','독일차기소총','차세대'],['H&K','Bundeswehr'],
    undefined,'https://en.wikipedia.org/wiki/HK433'),

  sa('sa-deu-003','HK MP7 기관단총','Heckler & Koch MP7','SMG','GERMANY','OPERATIONAL','MED',
    '개인방호무기(PDW) 기관단총. 4.6×30mm 전용탄 방탄복 관통. 한국·독일·영국 특수부대 운용. MP5 후계자.',
    {weight:'1.9kg(탄창제외)', length:'638mm(전개)/340mm(접이)', caliber:'4.6×30mm HK', capacity:'20/30/40발', fireRate:'950rpm', range:'100~200m', manufacturer:'Heckler & Koch', firstDeployed:'2001년'},
    ['기관단총','MP7','PDW','HK','특수부대'],['H&K','Jane\'s','Wikipedia'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/MP7A1_GER.jpg/320px-MP7A1_GER.jpg',
    'https://en.wikipedia.org/wiki/Heckler_%26_Koch_MP7'),

  // ════════════════════════════════════════════════════════
  // 벨기에·FN Herstal 소화기
  // ════════════════════════════════════════════════════════

  sa('sa-bel-001','FN SCAR-H 소총','FN SCAR-H (Mk 17 Mod 0)','RIFLE','USA','OPERATIONAL','HIGH',
    'FN SCAR 중형(Heavy) 버전. 7.62mm NATO. 미 특수작전사령부(USSOCOM) 채택. 모듈식·신뢰성·정확도 우수.',
    {weight:'3.58kg(탄창제외)', length:'889mm(전개)/635mm(접이)', caliber:'7.62×51mm NATO', capacity:'20발', range:'700m(유효)', fireRate:'625rpm', manufacturer:'FN Herstal (벨기에)', firstDeployed:'2009년(USSOCOM)'},
    ['소총','SCAR','FN','7.62mm','특수작전','USSOCOM'],['FN Herstal','USSOCOM','Jane\'s'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/FN_SCAR-H.jpg/320px-FN_SCAR-H.jpg',
    'https://en.wikipedia.org/wiki/FN_SCAR'),

  sa('sa-bel-002','FN P90 기관단총','FN P90 Personal Defense Weapon','SMG','MULTI','OPERATIONAL','MED',
    'FN Herstal 개발 PDW 기관단총. 5.7×28mm 전용탄 방탄복 관통. 50발 수평 탑재 탄창. 미 비밀경호국(USSS)·NATO 운용.',
    {weight:'2.6kg(장전)', length:'500mm', caliber:'5.7×28mm', capacity:'50발(수평식 탄창)', fireRate:'900rpm', range:'150~200m', manufacturer:'FN Herstal (벨기에)', firstDeployed:'1990년'},
    ['기관단총','P90','FN','PDW','5.7mm','비밀경호'],['FN Herstal','USSS','Wikipedia'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/FN_P90_GBB_01.jpg/320px-FN_P90_GBB_01.jpg',
    'https://en.wikipedia.org/wiki/FN_P90'),

  // ════════════════════════════════════════════════════════
  // 이스라엘 소화기
  // ════════════════════════════════════════════════════════

  sa('sa-isr-001','IMI Uzi 기관단총','IMI Uzi Submachine Gun','SMG','ISRAEL','OPERATIONAL','MED',
    '이스라엘 설계 오픈볼트 기관단총. 1950년대 이후 세계적 판매. 모사드·이스라엘군 표준. 90개국 군경 운용.',
    {weight:'3.5kg(장전)', length:'650mm(전개)/470mm(접이)', caliber:'9×19mm Parabellum', capacity:'25/32발', fireRate:'600rpm', range:'100~200m', manufacturer:'IMI / UZI Systems', firstDeployed:'1954년'},
    ['기관단총','Uzi','이스라엘','모사드','UZI'],['IMI','Wikipedia'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/UZI_1.JPG/320px-UZI_1.JPG',
    'https://en.wikipedia.org/wiki/Uzi'),

  sa('sa-isr-002','Tavor TAR-21 소총','IMI Tavor TAR-21','RIFLE','ISRAEL','OPERATIONAL','HIGH',
    '이스라엘 현행 표준 돌격소총. 불펍 설계. 2009년 M16 대체. 5.56mm. X95로 개량 중. 인도군 채택.',
    {weight:'3.27kg(탄창제외)', length:'725mm', caliber:'5.56×45mm NATO', capacity:'30발', range:'300~500m(유효)', fireRate:'750~900rpm', manufacturer:'IWI(이스라엘무기산업)', firstDeployed:'2006년'},
    ['소총','Tavor','TAR-21','불펍','이스라엘','IWI'],['IWI','IDF','Jane\'s'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Tavor_TAR-21.JPG/320px-Tavor_TAR-21.JPG',
    'https://en.wikipedia.org/wiki/IMI_Tavor_TAR-21'),

  // ════════════════════════════════════════════════════════
  // 체코 소화기
  // ════════════════════════════════════════════════════════

  sa('sa-cze-001','CZ 75 권총','CZ 75 Pistol','PISTOL','MULTI','OPERATIONAL','LOW',
    '체코 CZ-UHERSKÝ BROD 개발. 세계 명작 권총 중 하나. 16+1발. DA/SA. 100개국+ 운용.',
    {weight:'1,000g(장전)', length:'206mm', caliber:'9×19mm Parabellum', capacity:'16+1발', propulsion:'DA/SA', manufacturer:'CZ (체코)', firstDeployed:'1975년'},
    ['권총','CZ75','체코','9mm'],['CZ','Wikipedia'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/CZ_75_SP-01_Shadow_Pistol.jpg/320px-CZ_75_SP-01_Shadow_Pistol.jpg',
    'https://en.wikipedia.org/wiki/CZ_75'),

  // ════════════════════════════════════════════════════════
  // 스위스 소화기
  // ════════════════════════════════════════════════════════

  sa('sa-sui-001','SIG SG 550 소총','SIG SG 550 (Sturmgewehr 90)','RIFLE','MULTI','OPERATIONAL','MED',
    '스위스 표준 돌격소총. Stgw 90. 5.56mm. 신뢰성·정확도 세계 최고 수준. 투명 탄창으로 잔탄 확인 가능.',
    {weight:'4.1kg(탄창제외)', length:'998mm(전개)/772mm(접이)', caliber:'5.56×45mm NATO', capacity:'20/30발(투명 탄창)', fireRate:'700rpm', manufacturer:'SIG Arms AG(현 SIG Sauer)', firstDeployed:'1990년'},
    ['소총','SIG','SG550','스위스군','5.56mm'],['SIG Sauer','Swiss Army','Wikipedia'],
    undefined,'https://en.wikipedia.org/wiki/SIG_SG_550'),

  // ════════════════════════════════════════════════════════
  // 영국 소화기
  // ════════════════════════════════════════════════════════

  sa('sa-uk-001','SA80 L85A3 소총','SA80 L85A3 Rifle','RIFLE','UK','OPERATIONAL','MED',
    '영국 표준 돌격소총. 불펍 설계. 5.56mm NATO. H&K가 L85A2 개량 후 신뢰성 향상. L85A3는 2021년 피카티니 레일 확장.',
    {weight:'3.82kg(탄창제외)', length:'709mm', caliber:'5.56×45mm NATO', capacity:'30발', range:'400m(유효)', fireRate:'610~775rpm', manufacturer:'H&K (영국군 용역)', firstDeployed:'1985년(L85A1)/2021년(A3)'},
    ['소총','SA80','L85A3','영국군','불펍'],['British Army','H&K','Wikipedia'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/L85A3.jpg/320px-L85A3.jpg',
    'https://en.wikipedia.org/wiki/SA80'),

  // ════════════════════════════════════════════════════════
  // 북한 소화기
  // ════════════════════════════════════════════════════════

  sa('sa-dprk-001','68식 권총','Type 68 Pistol (North Korea)','PISTOL','DPRK','OPERATIONAL','LOW',
    '북한 표준 군용 권총. 소련 토카레프 TT-33 기반 북한 자체 생산판. 7.62×25mm. 북한군 장교 표준 지급.',
    {weight:'800g(장전)', length:'195mm', caliber:'7.62×25mm Tokarev', capacity:'8+1발', manufacturer:'조선인민군 군수', firstDeployed:'1968년'},
    ['권총','68식','북한','토카레프','7.62mm'],['Jane\'s','GlobalSecurity'],
    undefined,'https://en.wikipedia.org/wiki/Type_68_pistol_(North_Korea)'),

  sa('sa-dprk-002','58식 소총','Type 58 Assault Rifle','RIFLE','DPRK','OPERATIONAL','HIGH',
    '북한 AK-47 복제판. 7.62×39mm. 1958년 소련 기술 이전 후 자체 생산. 북한군 주력 개인화기. 수출로 분쟁지역 확산.',
    {weight:'4.3kg', length:'880mm', caliber:'7.62×39mm', capacity:'30발', fireRate:'600rpm', manufacturer:'북한 군수공업', firstDeployed:'1958년'},
    ['소총','58식','북한AK','AK복제','7.62mm','수출'],['Jane\'s','GlobalSecurity'],
    undefined,'https://en.wikipedia.org/wiki/Type_58_assault_rifle'),

  sa('sa-dprk-003','88식 소총','Type 88 Assault Rifle','RIFLE','DPRK','OPERATIONAL','HIGH',
    '북한 자체 설계 5.45mm 돌격소총. AK-74 영향. 1988년 개발. 폴딩 개머리판. 북한군 신세대 개인화기.',
    {weight:'3.2kg', length:'860mm(전개)', caliber:'5.45×39mm', capacity:'30발', fireRate:'600rpm', manufacturer:'북한 군수공업', firstDeployed:'1988년'},
    ['소총','88식','북한','5.45mm','AK74계열'],['Jane\'s','GlobalSecurity'],
    undefined,'https://en.wikipedia.org/wiki/Type_88_assault_rifle_(North_Korea)'),

  sa('sa-dprk-004','14.5mm 중기관총','KPV Type 60 Heavy Machine Gun','MG','DPRK','OPERATIONAL','HIGH',
    '소련 KPV 14.5mm 중기관총 북한 복제. ZPU-1/2/4 방공 포탑 장착. 경장갑·저공 방공 핵심. 분쟁지역 수출.',
    {weight:'49.1kg(단독)', caliber:'14.5×114mm', fireRate:'600rpm', range:'2,000m(대공)/3,000m(대지)', manufacturer:'북한 군수공업', firstDeployed:'1960년대'},
    ['기관총','14.5mm','KPV','방공','대공','북한수출'],['Jane\'s','GlobalSecurity'],
    undefined),

  // ════════════════════════════════════════════════════════
  // 중국 소화기
  // ════════════════════════════════════════════════════════

  sa('sa-chn-001','QBZ-95 소총','QBZ-95 Assault Rifle (Type 95)','RIFLE','CHINA','OPERATIONAL','HIGH',
    '중국 현행 표준 돌격소총. 5.8mm DBP87 탄약. 1997년 배치. 불펍 설계. PLA·무장경찰 표준.',
    {weight:'3.25kg(탄창제외)', length:'745mm', caliber:'5.8×42mm DBP87', capacity:'30발', range:'400m(유효)', fireRate:'650rpm', manufacturer:'노린코(NORINCO)', firstDeployed:'1997년'},
    ['소총','QBZ-95','중국군','5.8mm','불펍','PLA'],['PLA','NORINCO','Jane\'s'],
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/QBZ-95-1.jpg/320px-QBZ-95-1.jpg',
    'https://en.wikipedia.org/wiki/QBZ-95'),

  sa('sa-chn-002','QSZ-92 권총','QSZ-92 Pistol (Type 92)','PISTOL','CHINA','OPERATIONAL','LOW',
    '중국 표준 군용 권총. 9mm / 5.8mm 복합 운용. PLA 장교 표준 지급. 2000년 채택.',
    {weight:'760g(9mm 버전)', length:'190mm', caliber:'9×19mm / 5.8×21mm DAP92', capacity:'15발(9mm)', manufacturer:'노린코(NORINCO)', firstDeployed:'2000년'},
    ['권총','QSZ-92','중국군','9mm'],['PLA','NORINCO'],
    undefined,'https://en.wikipedia.org/wiki/QSZ-92'),

  sa('sa-chn-003','QBZ-191 소총','QBZ-191 Assault Rifle','RIFLE','CHINA','OPERATIONAL','HIGH',
    '중국 차세대 표준 소총. QBZ-95 후계. 5.8mm. 인체공학 개선. 2020 열병식 첫 등장. 특수부대 우선 배치 중.',
    {weight:'3.5kg(추정)', length:'920mm(전개)/720mm(접이)', caliber:'5.8×42mm DBP87', capacity:'30발', manufacturer:'NORINCO', firstDeployed:'2020년(시험배치)'},
    ['소총','QBZ-191','중국차기소총','PLA차기무기'],['PLA','GlobalSecurity'],
    undefined,'https://en.wikipedia.org/wiki/QBZ-191',75),

]
