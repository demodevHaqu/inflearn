import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { CourseDetailHero } from "@/components/course-detail-hero"
import { CourseLearningOutcomes } from "@/components/course-learning-outcomes"
import { CourseCurriculum } from "@/components/course-curriculum"
import { CourseInstructor } from "@/components/course-instructor"
import { CourseReviews } from "@/components/course-reviews"
import { CourseRecommended } from "@/components/course-recommended"
import { getCourseById, getRecommendedCourses } from "@/lib/mock-data"
import { getChannelVideos } from "@/lib/youtube"

interface CoursePageProps {
  params: Promise<{ id: string }>
}

export default async function CoursePage({ params }: CoursePageProps) {
  // Next.js 15에서 params는 Promise로 전달됨
  const { id } = await params
  
  console.log('[CoursePage] 강의 ID:', id)
  
  const course = getCourseById(id)

  if (!course) {
    console.log('[CoursePage] 강의를 찾을 수 없음:', id)
    notFound()
  }

  const recommendedCourses = getRecommendedCourses(course.id)
  
  // YouTube 채널에서 최신 영상 가져오기
  let youtubeVideoId: string | undefined
  try {
    console.log('[CoursePage] YouTube 영상 가져오기 시작')
    const videos = await getChannelVideos(1) // 최신 영상 1개만
    if (videos.length > 0) {
      youtubeVideoId = videos[0].id
      console.log('[CoursePage] YouTube 영상 ID:', youtubeVideoId)
      console.log('[CoursePage] YouTube 영상 제목:', videos[0].title)
    } else {
      console.log('[CoursePage] YouTube 영상을 찾을 수 없습니다')
    }
  } catch (error) {
    console.error('[CoursePage] YouTube 영상 가져오기 실패:', error)
  }

  console.log('[CoursePage] 강의 로딩 완료:', course.title)

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero 섹션 */}
      <CourseDetailHero course={course} youtubeVideoId={youtubeVideoId} />

      {/* 메인 콘텐츠 */}
      <div className="container py-12">
        <div className="flex flex-col gap-12">
          {/* 학습 내용 */}
          {course.learningOutcomes && course.learningOutcomes.length > 0 && (
            <CourseLearningOutcomes outcomes={course.learningOutcomes} />
          )}

          {/* 커리큘럼 */}
          {course.curriculum && course.curriculum.length > 0 && (
            <CourseCurriculum curriculum={course.curriculum} />
          )}

          {/* 강사 소개 */}
          {course.instructorInfo && (
            <CourseInstructor instructor={course.instructorInfo} />
          )}

          {/* 수강평 */}
          {course.reviews && course.reviews.length > 0 && (
            <CourseReviews
              reviews={course.reviews}
              rating={course.rating}
              reviewCount={course.reviewCount}
            />
          )}
        </div>
      </div>

      {/* 추천 강의 */}
      <CourseRecommended courses={recommendedCourses} />

      {/* Footer */}
      <footer className="border-t bg-muted/50 py-12">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <span className="text-xl font-bold">인프런</span>
              </div>
              <p className="text-sm text-muted-foreground">
                성장을 위한 최고의 온라인 강의 플랫폼
              </p>
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

