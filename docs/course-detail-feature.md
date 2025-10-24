# 강의 상세 페이지 구현 문서

## 📋 목차
1. [개요](#개요)
2. [구현된 기능](#구현된-기능)
3. [프로젝트 구조 변경사항](#프로젝트-구조-변경사항)
4. [새로 추가된 파일](#새로-추가된-파일)
5. [수정된 파일](#수정된-파일)
6. [기술 스택](#기술-스택)
7. [주요 구현 내용](#주요-구현-내용)
8. [다음 단계](#다음-단계)

---

## 개요

**작업 일자**: 2025-10-24  
**작업 내용**: 인프런 클론 프로젝트에 강의 상세 페이지 기능 추가  
**목적**: 메인 페이지의 강의 카드를 클릭하면 해당 강의의 상세 정보를 볼 수 있는 페이지 구현

---

## 구현된 기능

### ✅ 완료된 기능

1. **타입 시스템 구축**
   - TypeScript 타입 정의 파일 생성
   - Course, Instructor, Review 등 도메인 모델 타입 정의
   - 타입 안정성 확보

2. **Mock 데이터 시스템**
   - 12개 강의의 상세 데이터 생성
   - ID 기반 강의 조회 함수
   - 카테고리별 강의 그룹화 함수
   - 추천 강의 생성 함수

3. **강의 상세 페이지 UI**
   - 강의 정보 Hero 섹션
   - 학습 내용 섹션
   - 커리큘럼 (아코디언 형태)
   - 강사 소개 섹션
   - 수강평 섹션
   - 추천 강의 섹션

4. **라우팅 및 네비게이션**
   - 동적 라우팅 (`/course/[id]`)
   - 메인 페이지에서 상세 페이지로 이동
   - Next.js 15 호환 (params Promise 처리)

5. **로깅 시스템**
   - 모든 주요 컴포넌트에 콘솔 로그 추가
   - 데이터 흐름 추적 가능

---

## 프로젝트 구조 변경사항

### 이전 구조
```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── ui/
│   ├── header.tsx
│   ├── category-nav.tsx
│   ├── course-card.tsx
│   └── course-section.tsx
└── lib/
    └── utils.ts
```

### 현재 구조
```
src/
├── app/
│   ├── course/
│   │   └── [id]/
│   │       └── page.tsx          # 강의 상세 페이지
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── ui/
│   ├── header.tsx
│   ├── category-nav.tsx
│   ├── course-card.tsx            # 수정됨
│   ├── course-section.tsx         # 수정됨
│   ├── course-detail-hero.tsx     # 신규
│   ├── course-curriculum.tsx      # 신규
│   ├── course-learning-outcomes.tsx  # 신규
│   ├── course-instructor.tsx      # 신규
│   ├── course-reviews.tsx         # 신규
│   └── course-recommended.tsx     # 신규
└── lib/
    ├── types.ts                   # 신규
    ├── mock-data.ts               # 신규
    └── utils.ts
```

---

## 새로 추가된 파일

### 1. `lib/types.ts`
**역할**: TypeScript 타입 정의  
**주요 타입**:
- `Course` - 강의 기본 정보 + 상세 정보
- `CourseCurriculum` - 커리큘럼 섹션
- `CourseLesson` - 개별 강의
- `InstructorInfo` - 강사 정보
- `Review` - 수강평
- `Category`, `User`, `CartItem`, `Order` - 향후 확장용

**특징**:
- 재사용 가능한 타입 정의
- 선택적 필드로 유연성 확보
- 도메인 중심 설계

### 2. `lib/mock-data.ts`
**역할**: Mock 데이터 및 데이터 접근 함수  
**주요 함수**:
- `getCourseById(id)` - ID로 강의 조회
- `getCoursesByCategory()` - 카테고리별 그룹화
- `getRecommendedCourses(currentId)` - 추천 강의 생성

**데이터 구조**:
- 12개 강의 (인기 4개, 신규 4개, 무료 4개)
- 각 강의마다 상세 정보 포함
- 실제 Supabase 연동 시 교체 예정

**로깅**:
- 모든 함수에 콘솔 로그 추가
- 데이터 흐름 추적 가능

### 3. `app/course/[id]/page.tsx`
**역할**: 강의 상세 페이지 (동적 라우트)  
**주요 기능**:
- Next.js 15 호환 (async params)
- 404 처리 (notFound)
- SEO 친화적 구조
- 서버 컴포넌트 활용

**컴포넌트 구성**:
```tsx
<Header />
<CourseDetailHero />
<CourseLearningOutcomes />
<CourseCurriculum />
<CourseInstructor />
<CourseReviews />
<CourseRecommended />
<Footer />
```

### 4. `components/course-detail-hero.tsx`
**역할**: 강의 정보 Hero 섹션  
**표시 정보**:
- 강의 제목, 설명
- 평점, 수강생 수
- 난이도, 강의 시간, 언어, 수료증
- 가격 및 할인 정보
- 수강 신청/장바구니 버튼

**특징**:
- 반응형 디자인 (모바일/데스크톱)
- Sticky 수강 신청 카드 (데스크톱)
- Gradient 배경 효과

### 5. `components/course-curriculum.tsx`
**역할**: 커리큘럼 아코디언  
**표시 정보**:
- 섹션별 강의 목록
- 총 강의 수 및 시간
- 무료 미리보기 표시
- 강의별 재생 시간

**특징**:
- shadcn-ui Accordion 사용
- 자동 시간 계산
- 확장/축소 가능

### 6. `components/course-learning-outcomes.tsx`
**역할**: 학습 목표 표시  
**표시 정보**:
- 강의를 통해 배울 수 있는 내용
- 체크 아이콘과 함께 리스트 형태

**특징**:
- 2컬럼 그리드 레이아웃 (반응형)
- CheckCircle 아이콘 사용

### 7. `components/course-instructor.tsx`
**역할**: 강사 소개 섹션  
**표시 정보**:
- 강사 이름, 직함
- 프로필 사진 (Avatar)
- 강사 평점, 강의 수, 수강생 수
- 강사 소개 글

**특징**:
- shadcn-ui Avatar 컴포넌트
- Flexbox 레이아웃 (반응형)

### 8. `components/course-reviews.tsx`
**역할**: 수강평 섹션  
**표시 정보**:
- 전체 평점 및 분포
- 개별 수강평 (사용자, 평점, 댓글, 날짜)
- 도움됨 버튼

**특징**:
- 평점 분포 Progress Bar
- 별점 시각화
- 날짜 포맷팅 (toLocaleDateString)

### 9. `components/course-recommended.tsx`
**역할**: 추천 강의 섹션  
**표시 정보**:
- 현재 강의와 관련된 추천 강의 4개
- CourseCard 재사용

**특징**:
- 4컬럼 그리드 (반응형)
- Link로 클릭 가능

---

## 수정된 파일

### 1. `components/course-card.tsx`
**변경 사항**:
- `id` prop 추가 (선택적)
- Link 래핑을 위한 준비

**변경 이유**:
- 강의 상세 페이지로 이동하기 위해 ID 필요

### 2. `components/course-section.tsx`
**변경 사항**:
- `Course` 타입을 `lib/types.ts`에서 import
- 각 CourseCard를 `Link`로 래핑
- 하드코딩된 타입 정의 제거

**변경 이유**:
- 타입 중앙 관리
- 강의 카드 클릭 시 상세 페이지로 이동

### 3. `app/page.tsx`
**변경 사항**:
- 하드코딩된 강의 데이터 제거 (150줄 → 60줄)
- `getCoursesByCategory()` 함수 사용
- 콘솔 로그 추가

**변경 이유**:
- 코드 재사용성 향상
- 데이터 중앙 관리
- 유지보수성 개선

---

## 기술 스택

### 사용된 기술

#### 프레임워크 & 언어
- **Next.js 15.2.4** - App Router, 동적 라우팅
- **TypeScript 5.x** - 타입 안정성
- **React 19** - UI 라이브러리

#### UI 컴포넌트
- **shadcn-ui** - Card, Button, Badge, Accordion, Avatar, Progress
- **Lucide React** - 아이콘 (Star, Users, Clock, Award 등)
- **Tailwind CSS 4.x** - 스타일링

#### 주요 패턴
- **Server Components** - 기본적으로 모든 페이지/컴포넌트
- **동적 라우팅** - `[id]` 파라미터
- **타입 안정성** - TypeScript 엄격 모드
- **컴포넌트 조합** - 작은 컴포넌트 재사용

---

## 주요 구현 내용

### 1. Next.js 15 호환성

#### 동적 파라미터 처리
```typescript
// ✅ 올바른 방법 (Next.js 15)
export default async function CoursePage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params
  // ...
}
```

**이유**: Next.js 15에서 동적 라우트 파라미터가 Promise로 전달됨

### 2. 타입 시스템 설계

#### 확장 가능한 타입 구조
```typescript
export interface Course {
  // 기본 정보 (필수)
  id: string
  title: string
  instructor: string
  // ...
  
  // 상세 정보 (선택적)
  description?: string
  learningOutcomes?: string[]
  curriculum?: CourseCurriculum[]
  // ...
}
```

**장점**:
- 기본 정보만으로 카드 렌더링 가능
- 상세 페이지는 추가 정보 활용
- 점진적 데이터 로딩 가능

### 3. 컴포넌트 분리 원칙

#### 단일 책임 원칙 (SRP) 적용
- `CourseDetailHero` - Hero 섹션만
- `CourseCurriculum` - 커리큘럼만
- `CourseReviews` - 수강평만

**장점**:
- 테스트 용이
- 재사용 가능
- 유지보수 쉬움

### 4. 로깅 전략

#### 모든 주요 지점에 로그 추가
```typescript
export function CourseDetailHero({ course }: CourseDetailHeroProps) {
  console.log('[CourseDetailHero] 렌더링:', course.title)
  // ...
}
```

**로그 위치**:
- 페이지 진입 시
- 데이터 로딩 시
- 컴포넌트 렌더링 시

**장점**:
- 디버깅 용이
- 데이터 흐름 파악
- 성능 모니터링

### 5. 반응형 디자인

#### Tailwind CSS 브레이크포인트 활용
```tsx
<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
```

**브레이크포인트**:
- `sm:` - 640px 이상
- `md:` - 768px 이상
- `lg:` - 1024px 이상
- `xl:` - 1280px 이상

---

## 코드 품질 검증

### ✅ 린터 검사
- **결과**: 오류 없음
- **검사 파일**: 모든 신규 및 수정 파일
- **도구**: ESLint

### ✅ 코딩 컨벤션 준수
- **네이밍**: PascalCase (컴포넌트), camelCase (함수/변수)
- **Export**: 단일 컴포넌트는 default, 다중 항목은 named
- **스타일링**: Tailwind CSS 우선, inline style 미사용
- **Spacing**: gap 우선, margin 최소화

### ✅ 아키텍처 원칙
- **SOLID 원칙** - SRP (단일 책임)
- **불필요한 추상화 금지** - 로직 없는 래퍼 컴포넌트 없음
- **선언적 프로그래밍** - 명령형 코드 최소화

---

## 다음 단계

### 🔜 단기 목표 (1-2주)

1. **데이터베이스 연동**
   - Supabase 테이블 설계
   - Mock 데이터를 실제 DB로 마이그레이션
   - CRUD API 구현

2. **인증 시스템**
   - 로그인/회원가입 페이지
   - Supabase Auth 연동
   - 보호된 라우트 구현

3. **장바구니 기능**
   - Zustand 상태 관리
   - 장바구니 추가/삭제
   - 로컬 스토리지 저장

### 🎯 중기 목표 (1-2개월)

4. **결제 시스템**
   - 결제 페이지 UI
   - 결제 API 연동 (토스 페이먼츠 등)
   - 주문 내역 관리

5. **수강 페이지**
   - 비디오 플레이어 통합
   - 진도율 추적
   - 북마크 기능

6. **검색 및 필터링**
   - 강의 검색 기능
   - 카테고리별 필터
   - 가격/평점 정렬

### 🚀 장기 목표 (3개월+)

7. **성능 최적화**
   - 이미지 최적화 (Next.js Image)
   - 코드 스플리팅
   - 캐싱 전략

8. **애니메이션**
   - Framer Motion 적용
   - 페이지 전환 효과
   - 마이크로 인터랙션

9. **관리자 페이지**
   - 강의 생성/수정/삭제
   - 수강생 관리
   - 통계 대시보드

---

## 참고 자료

### 관련 문서
- [Next.js 15 문서](https://nextjs.org/docs)
- [shadcn-ui 문서](https://ui.shadcn.com/)
- [Tailwind CSS 문서](https://tailwindcss.com/)

### 프로젝트 규칙
- `docs/docs.md` - 전체 개발 가이드라인
- Memory - SOLID 원칙, 스타일링 규칙

---

## 변경 이력

| 날짜 | 작업자 | 내용 |
|------|--------|------|
| 2025-10-24 | AI Assistant | 초기 강의 상세 페이지 구현 |

---

## 마무리

이번 작업으로 인프런 클론 프로젝트는 다음과 같은 발전을 이루었습니다:

✅ **타입 시스템** - 안정적인 TypeScript 타입 정의  
✅ **데이터 계층** - Mock 데이터 시스템 구축  
✅ **UI 컴포넌트** - 재사용 가능한 컴포넌트 세트  
✅ **라우팅** - 동적 라우팅 및 네비게이션  
✅ **로깅** - 디버깅을 위한 로그 시스템  

다음 단계로 Supabase 연동을 통해 실제 데이터베이스와 연결하여 프로젝트를 더욱 발전시킬 수 있습니다.

