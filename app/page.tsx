import { Header } from "@/components/header"
import { CategoryNav } from "@/components/category-nav"
import { FeaturedBanner } from "@/components/featured-banner"
import { CourseSection } from "@/components/course-section"
import { getCoursesByCategory } from "@/lib/mock-data"

export default function Home() {
  console.log('[HomePage] 렌더링 시작')
  
  const { popular, newCourses, free } = getCoursesByCategory()
  
  console.log('[HomePage] 강의 데이터 로딩 완료')
  console.log('[HomePage] 인기 강의:', popular.length, '개')
  console.log('[HomePage] 신규 강의:', newCourses.length, '개')
  console.log('[HomePage] 무료 강의:', free.length, '개')
  return (
    <div className="min-h-screen">
      <Header />
      <CategoryNav />
      <FeaturedBanner />

      <CourseSection
        title="🔥 지금 가장 인기있는 강의"
        description="수강생들이 가장 많이 선택한 베스트 강의"
        courses={popular}
      />

      <div className="border-t" />

      <CourseSection 
        title="✨ 새로 나온 강의" 
        description="최신 트렌드를 반영한 신규 강의" 
        courses={newCourses} 
      />

      <div className="border-t" />

      <CourseSection 
        title="🎁 무료 강의" 
        description="부담없이 시작하는 무료 강의" 
        courses={free} 
      />

      <footer className="border-t bg-muted/50 py-12">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center gap-2">
                
                <span className="text-xl font-bold">인프런</span>
              </div>
              <p className="text-sm text-muted-foreground">성장을 위한 최고의 온라인 강의 플랫폼</p>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">강의</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>개발·프로그래밍</li>
                <li>데이터 사이언스</li>
                <li>크리에이티브</li>
                <li>직무·마케팅</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">서비스</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>로드맵</li>
                <li>커뮤니티</li>
                <li>멘토링</li>
                <li>기업교육</li>
              </ul>
            </div>
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
          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            © 2025 인프런. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
