"""
K-Defense AI Intelligence Platform — 군사정보 크롤러
==================================================
공개 군사/안보 뉴스 소스에서 데이터를 수집하여
플랫폼 BoardContext 형식으로 변환합니다.

사용법:
  pip install requests beautifulsoup4 lxml feedparser
  python scraper.py [--output board_seed.json]

지원 소스:
  - 38north.org (DPRK 분석, Stimson Center)
  - nknews.org (북한 전문 뉴스)
  - RAND Corporation Korea topics
  - Global Security news
"""

import requests
import feedparser
import json
import re
import time
import argparse
from datetime import datetime
from bs4 import BeautifulSoup
from typing import Optional

HEADERS = {
    "User-Agent": "Mozilla/5.0 (compatible; K-Defense-AI-Scraper/1.0)"
}
TIMEOUT = 10

# ── Source definitions ──────────────────────────────────────────────────────

SOURCES = [
    {
        "name": "38 North",
        "url": "https://www.38north.org/feed/",
        "type": "rss",
        "category": "STRATEGIC",
        "tags": ["38north", "북한분석", "stimson"],
        "threat_level": "HIGH",
    },
    {
        "name": "North Korea News (NK News)",
        "url": "https://www.nknews.org/feed/",
        "type": "rss",
        "category": "THREAT",
        "tags": ["nknews", "북한뉴스"],
        "threat_level": "HIGH",
    },
    {
        "name": "Defense One",
        "url": "https://www.defenseone.com/rss/all/",
        "type": "rss",
        "category": "STRATEGIC",
        "tags": ["방산", "미국방부"],
        "threat_level": "MED",
    },
    {
        "name": "RAND Security",
        "url": "https://www.rand.org/topics/north-korea.xml",
        "type": "rss",
        "category": "STRATEGIC",
        "tags": ["RAND", "정책분석"],
        "threat_level": "MED",
    },
]

KOREA_KEYWORDS = [
    "north korea", "dprk", "pyongyang", "kim jong", "kim yo jong",
    "nuclear", "missile", "icbm", "hwasong", "submarine",
    "cyber", "lazarus", "bureau 121", "hacking",
    "uiju", "malligyong", "reconnaissance", "satellite",
    "military exercise", "ulchi", "foal eagle",
    "한반도", "북한", "김정은", "미사일", "핵",
]


def is_relevant(text: str) -> bool:
    """군사/안보 관련 키워드 필터링"""
    text_lower = text.lower()
    return any(kw in text_lower for kw in KOREA_KEYWORDS)


def clean_html(raw: str) -> str:
    soup = BeautifulSoup(raw, "lxml")
    return re.sub(r'\s+', ' ', soup.get_text()).strip()


def fetch_rss(source: dict) -> list[dict]:
    """RSS 피드 파싱"""
    try:
        feed = feedparser.parse(source["url"])
        results = []
        for entry in feed.entries[:30]:
            title = getattr(entry, "title", "")
            summary = clean_html(getattr(entry, "summary", "") or "")
            content = ""
            if hasattr(entry, "content"):
                content = clean_html(entry.content[0].get("value", ""))
            text_blob = f"{title} {summary} {content}"
            if not is_relevant(text_blob):
                continue

            pub = getattr(entry, "published", "")
            try:
                dt = datetime(*entry.published_parsed[:6]) if entry.get("published_parsed") else datetime.now()
                date_str = dt.strftime("%Y-%m-%d")
            except Exception:
                date_str = datetime.now().strftime("%Y-%m-%d")

            results.append({
                "title": title,
                "summary": summary[:300] if summary else title,
                "content": content or summary,
                "source": source["name"],
                "date": date_str,
                "url": getattr(entry, "link", ""),
                "category": source["category"],
                "tags": source["tags"][:],
                "threat_level": source["threat_level"],
                "confidence": 70,
                "type": "STRATEGIC",
                "status": "ACTIVE",
                "secLevel": "RESTRICTED",
                "author": getattr(entry, "author", source["name"]),
            })
        print(f"  [{source['name']}] {len(results)}건 수집")
        return results
    except Exception as e:
        print(f"  [{source['name']}] 오류: {e}")
        return []


def categorize(item: dict) -> dict:
    """내용 기반 자동 분류"""
    text = f"{item['title']} {item['summary']}".lower()

    if any(w in text for w in ["cyber", "hack", "malware", "lazarus", "it worker"]):
        item["category"] = "CYBER"
        item["type"] = "CYBER"
        item["tags"].append("사이버")
    elif any(w in text for w in ["missile", "icbm", "rocket", "launch", "nuclear", "warhead"]):
        item["category"] = "THREAT"
        item["type"] = "THREAT"
        item["tags"].append("미사일")
        item["threat_level"] = "CRITICAL"
    elif any(w in text for w in ["satellite", "imagery", "airfield", "reconnaissance"]):
        item["category"] = "IMAGE"
        item["type"] = "IMAGE"
        item["tags"].append("위성영상")
    elif any(w in text for w in ["signal", "radar", "frequency", "electronic"]):
        item["category"] = "SIGNAL"
        item["type"] = "SIGNAL"
        item["tags"].append("신호")
    elif any(w in text for w in ["ai", "intelligence", "technology", "chip", "gpu"]):
        item["category"] = "STRATEGIC"
        item["type"] = "STRATEGIC"
        item["tags"].append("기술정보")
    else:
        item["category"] = "STRATEGIC"
        item["type"] = "STRATEGIC"

    return item


def translate_title_hint(title: str) -> str:
    """영어 제목에 한국어 힌트 추가 (간단한 치환)"""
    replacements = {
        "North Korea": "북한",
        "DPRK": "북한(DPRK)",
        "Kim Jong Un": "김정은",
        "Kim Yo Jong": "김여정",
        "Pyongyang": "평양",
        "nuclear": "핵",
        "missile": "미사일",
        "airfield": "공군기지",
        "satellite": "위성",
        "cyber": "사이버",
        "China": "중국",
        "Xi Jinping": "시진핑",
        "G7": "G7",
    }
    result = title
    for en, ko in replacements.items():
        result = result.replace(en, f"{en}({ko})")
    return result


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--output", default="scripts/board_seed.json", help="출력 JSON 파일 경로")
    parser.add_argument("--limit", type=int, default=50, help="최대 수집 건수")
    args = parser.parse_args()

    print("K-Defense AI Intelligence 군사정보 크롤러 시작...")
    print(f"소스: {len(SOURCES)}개, 최대 {args.limit}건\n")

    all_items = []
    for source in SOURCES:
        time.sleep(1)
        items = fetch_rss(source)
        for item in items:
            item = categorize(item)
            item["title"] = translate_title_hint(item["title"])
            all_items.append(item)

    # Deduplicate by title
    seen = set()
    unique = []
    for item in all_items:
        key = item["title"][:60]
        if key not in seen:
            seen.add(key)
            unique.append(item)

    unique = unique[:args.limit]
    unique.sort(key=lambda x: x["date"], reverse=True)

    output = {
        "scraped_at": datetime.now().isoformat(),
        "total": len(unique),
        "items": unique,
    }

    with open(args.output, "w", encoding="utf-8") as f:
        json.dump(output, f, ensure_ascii=False, indent=2)

    print(f"\n✓ 완료: {len(unique)}건 → {args.output}")
    print("다음 명령으로 프론트엔드에 적용:")
    print("  node scripts/inject-data.mjs")


if __name__ == "__main__":
    main()
