// ============================================================================
// Import 섹션
// ============================================================================
import { Header } from "@/components/header"
import { RoadmapCard } from "@/components/roadmap-card"
import { getAllRoadmaps } from "@/lib/mock-data"

// ============================================================================
// 로드맵 페이지 컴포넌트
// ============================================================================
export default function RoadmapPage() {
  // 로드맵 데이터 가져오기
  const roadmaps = getAllRoadmaps()
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ====================================================================
          헤더 영역
          ==================================================================== */}
      <Header />

      {/* ====================================================================
          메인 콘텐츠 영역
          ==================================================================== */}
      <main className="py-5 px-4 md:px-20 lg:px-40">
        <div className="max-w-none">
          {/* ================================================================
              페이지 헤더
              ================================================================ */}
          <div className="mb-4 p-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Learning Roadmaps
            </h1>
            <p className="text-sm text-gray-600 max-w-2xl">
              Structured learning paths to guide you through various tech domains.
            </p>
          </div>

          {/* ================================================================
              로드맵 카드 그리드
              ================================================================ */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
            {roadmaps.map((roadmap) => (
              <RoadmapCard key={roadmap.id} roadmap={roadmap} />
            ))}
          </div>
        </div>
      </main>

      {/* ====================================================================
          푸터 영역
          ==================================================================== */}
      <footer className="border-t bg-muted/50 py-12">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-4">
            {/* 브랜드 정보 */}
            <div>
              <div className="mb-4 flex items-center gap-2">
                <span className="text-xl font-bold">인프런</span>
              </div>
              <p className="text-sm text-muted-foreground">성장을 위한 최고의 온라인 강의 플랫폼</p>
            </div>

            {/* 강의 카테고리 링크 */}
            <div>
              <h4 className="mb-4 font-semibold">강의</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>개발·프로그래밍</li>
                <li>데이터 사이언스</li>
                <li>크리에이티브</li>
                <li>직무·마케팅</li>
              </ul>
            </div>

            {/* 서비스 링크 */}
            <div>
              <h4 className="mb-4 font-semibold">서비스</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>로드맵</li>
                <li>커뮤니티</li>
                <li>멘토링</li>
                <li>기업교육</li>
              </ul>
            </div>

            {/* 고객지원 링크 */}
            <div>
              <h4 className="mb-4 font-semibold">고객지원</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>공지사항</li>
                <li>자주 묻는 질문</li>
                <li>문의하기</li>
                <li>이용약관</li>
              </ul>
            </div>
          </div>

          {/* 저작권 정보 */}
          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            © 2025 인프런. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
