# Deer for U: ARCHIVE

**상명대학교 2026 대동제 공식 모바일 웹** · [deer4you.site](https://deer4you.site) 

축제 현장에서 부스·지도·일정·공지·이벤트·분실물·굿즈를 한 번에 볼 수 있는 **모바일 퍼스트** 서비스입니다.

---

## Role

**Frontend** — 강대훈 , 차영건

---

## Tech Stack

`Next.js 16` · `React 19` · `TypeScript` · `Tailwind CSS v4` · `Naver Maps API` · `React Compiler`

---

## Highlights

- **하이브리드 데이터** — 부스·일정은 정적 데이터, 공지·이벤트·분실물·굿즈는 REST API → API 장애 시에도 핵심 정보 유지
- **부스 통합 라우팅** — 체험/푸드트럭/외부/총학 ID 충돌 방지를 위한 offset 기반 URL 설계
- **지도 UX** — Naver Maps + 카테고리 필터 + **커스텀 Bottom Sheet** (viewport·하단 nav 높이 반영)
- **구역 미니맵** — SVG 오버레이로 A/B/C·추가 구역 부스 위치 하이라이트
- **관리자 CMS** — JWT access/refresh, 401 시 자동 토큰 갱신, 공지·이벤트·분실물·굿즈 CRUD
- **이벤트 Presentation Layer** — API 응답 → UI 모델 변환 + 이벤트별 static override (썸네일·혜택·유의사항)

---

## Features

| 영역 | 구현 |
|------|------|
| 부스 | 필터·검색(URL sync, debounce), 상세·미니맵 |
| 지도 | POI 마커, 바텀시트 목록 |
| 일정 | 2일차 탭, 타임테이블, 라인업 |
| 동적 | 공지·이벤트·분실물·굿즈 (API) |
| Admin | FormData 업로드, React Quill |

---

## Architecture

### Overview

Next.js App Router 기반으로 **참가자 앱 `(user)`** 과 **관리자 CMS `admin`** 을 route group으로 분리했습니다.  
자주 바뀌지 않는 축제 정보(부스·일정·지도 POI)는 **정적 데이터**, 운영 중 갱신되는 콘텐츠(공지·이벤트·분실물·굿즈)는 **REST API**로 가져오는 하이브리드 구조입니다.

```
┌──────────────────────────────────────────────────────────────────┐
│                     Next.js 16 (App Router)                       │
├─────────────────────────────┬────────────────────────────────────┤
│      (user) 참가자 앱        │           admin 운영 CMS            │
│  max-w-md 모바일 레이아웃     │  동일 셸 + JWT 쿠키 인증            │
│  Header / BottomNavBar       │  notice · event · lost · goods     │
├─────────────────────────────┴────────────────────────────────────┤
│  src/api/          apiFetchJson (공용) · adminFetch (관리자)      │
├──────────────────────────────┬───────────────────────────────────┤
│  src/data/festival/          │  Backend REST API                   │
│  부스 · 푸드트럭 · 일정 · POI  │  /notices /events /lost-items …   │
└──────────────────────────────┴───────────────────────────────────┘
```

### Route Structure

```
src/app/
├── (user)/                 # 참가자 — 홈, 부스, 지도, 일정, 공지, 이벤트, 분실물, 굿즈
├── admin/                  # 관리자 — login + CRUD
    └── (afterLogin)/       # 인증 후 notice / event / lost / goods
```

### Data Layer

| 구분 | 소스 | 경로 예시 | 비고 |
|------|------|-----------|------|
| 정적 | TypeScript 모듈 | `src/data/festival/` | 체험·푸드트럭·외부·총학 부스, `scheduleData.ts` |
| 동적 | REST API | `src/api/*.ts` | `NEXT_PUBLIC_API_BASE_URL` 기준 |
| 프론트 어댑터 | 변환 레이어 | `event/_data/eventData.ts`, `lost-and-found/_data/` | API 스키마 → UI 모델, 이벤트 ID별 override |

### API Layer

**`apiFetchJson`** (`src/api/client.ts`)

- 서버 컴포넌트: `fetch` + `next: { revalidate: N }` (이벤트·분실물 목록 등)
- 클라이언트: 일반 `fetch` (공지 티커 등)
- `NEXT_PUBLIC_API_BASE_URL` 미설정 시 즉시 throw

**`adminFetch`** (`src/api/admin/client.ts`)

- `Authorization: Bearer {accessToken}` (js-cookie)
- **401** → `POST /auth/refresh` 로 토큰 갱신 후 원 요청 1회 재시도 (`isRefreshing`으로 중복 refresh 방지)
- `FormData` 업로드 시 `Content-Type` 자동 제거
- 갱신 실패 시 쿠키 삭제 + `/admin/login` 리다이렉트

### Rendering Strategy

| 페이지 | 방식 | 이유 |
|--------|------|------|
| 이벤트·분실물 목록/상세 | Server Component + `apiFetchJson` | 초기 로드·SEO, ISR |
| 부스 목록 | Client + `Suspense` | URL 쿼리 기반 검색/필터 |
| 지도 | Client | Naver Maps DOM, Bottom Sheet 드래그 |
| 홈 공지 티커 | Client | 마운트 후 `fetch /notices` |
| 일정·부스 상세(정적) | RSC + static import | API 없이 즉시 렌더 |

### Caching

| 리소스 | 전략 |
|--------|------|
| 이벤트·분실물 목록 | `revalidate: 300` |
| 이벤트 상세 | `revalidate: 0` |
| 공지·굿즈 | `cache: "no-store"` |
| 부스·일정·지도 POI | 빌드 타임 정적 import |

---

## Getting Started

```bash
npm install
npm run dev
```

### Environment Variables

| Variable | Required | Usage |
|----------|----------|-------|
| `NEXT_PUBLIC_API_BASE_URL` | ✅ | REST API base |
| `NEXT_PUBLIC_NAVER_MAP_CLIENT_ID` | 지도 사용 시 | Naver Maps SDK |

---

## Credits

| 팀 | 역할 |
|----|------|
| 개발팀 | Front End — 차영건, 강대훈 / Back End — 곽문수 / Infra — 신예준 |
| 관리팀 | Lead — 김태우, 최수빈 |
| 디자인팀 | Lead — 도현우 / Designer — 김강현 |
