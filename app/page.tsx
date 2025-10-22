import { Header } from "@/components/header"
import { CategoryNav } from "@/components/category-nav"
import { FeaturedBanner } from "@/components/featured-banner"
import { CourseSection } from "@/components/course-section"

const popularCourses = [
  {
    id: "1",
    title: "스프링 부트와 JPA 실무 완전 정복 로드맵",
    instructor: "김영한",
    thumbnail: "/spring-boot-coding.jpg",
    price: "₩99,000",
    originalPrice: "₩165,000",
    rating: 4.9,
    reviewCount: 2847,
    studentCount: 15234,
    tags: ["Spring", "JPA"],
    discount: "40%",
  },
  {
    id: "2",
    title: "React 완벽 가이드 with Redux, Next.js, TypeScript",
    instructor: "박지훈",
    thumbnail: "/react-javascript-code.png",
    price: "₩77,000",
    originalPrice: "₩110,000",
    rating: 4.8,
    reviewCount: 1923,
    studentCount: 12456,
    tags: ["React", "TypeScript"],
    discount: "30%",
  },
  {
    id: "3",
    title: "파이썬 데이터 분석 마스터 클래스",
    instructor: "이수진",
    thumbnail: "/python-data-analysis.png",
    price: "₩55,000",
    rating: 4.7,
    reviewCount: 1456,
    studentCount: 8934,
    tags: ["Python", "데이터분석"],
  },
  {
    id: "4",
    title: "AWS 클라우드 인프라 구축 실전 가이드",
    instructor: "최민수",
    thumbnail: "/aws-cloud-infrastructure.jpg",
    price: "₩88,000",
    originalPrice: "₩132,000",
    rating: 4.9,
    reviewCount: 987,
    studentCount: 6543,
    tags: ["AWS", "DevOps"],
    discount: "33%",
  },
]

const newCourses = [
  {
    id: "5",
    title: "ChatGPT와 함께하는 AI 프롬프트 엔지니어링",
    instructor: "정하늘",
    thumbnail: "/ai-chatgpt-prompt.jpg",
    price: "₩44,000",
    rating: 4.8,
    reviewCount: 234,
    studentCount: 1234,
    tags: ["AI", "ChatGPT"],
  },
  {
    id: "6",
    title: "Figma로 시작하는 UI/UX 디자인 입문",
    instructor: "강민지",
    thumbnail: "/figma-ui-ux-design.jpg",
    price: "₩33,000",
    rating: 4.6,
    reviewCount: 456,
    studentCount: 2345,
    tags: ["Figma", "UI/UX"],
  },
  {
    id: "7",
    title: "Node.js 백엔드 개발 완전 정복",
    instructor: "박준영",
    thumbnail: "/nodejs-backend-development.jpg",
    price: "₩66,000",
    originalPrice: "₩99,000",
    rating: 4.7,
    reviewCount: 678,
    studentCount: 3456,
    tags: ["Node.js", "Backend"],
    discount: "33%",
  },
  {
    id: "8",
    title: "SQL 데이터베이스 설계와 최적화",
    instructor: "윤서연",
    thumbnail: "/sql-database-design.jpg",
    price: "₩55,000",
    rating: 4.8,
    reviewCount: 890,
    studentCount: 4567,
    tags: ["SQL", "Database"],
  },
]

const freeCourses = [
  {
    id: "9",
    title: "HTML/CSS 기초부터 반응형 웹까지",
    instructor: "김태희",
    thumbnail: "/html-css-responsive-web.jpg",
    price: "무료",
    rating: 4.5,
    reviewCount: 3456,
    studentCount: 23456,
    tags: ["HTML", "CSS"],
  },
  {
    id: "10",
    title: "Git & GitHub 입문 가이드",
    instructor: "이준호",
    thumbnail: "/git-github-version-control.jpg",
    price: "무료",
    rating: 4.6,
    reviewCount: 2345,
    studentCount: 18765,
    tags: ["Git", "GitHub"],
  },
  {
    id: "11",
    title: "JavaScript 기초 문법 완성",
    instructor: "박소영",
    thumbnail: "/javascript-basics-programming.jpg",
    price: "무료",
    rating: 4.7,
    reviewCount: 4567,
    studentCount: 34567,
    tags: ["JavaScript"],
  },
  {
    id: "12",
    title: "프로그래밍 입문자를 위한 알고리즘",
    instructor: "최동욱",
    thumbnail: "/algorithm-programming-basics.jpg",
    price: "무료",
    rating: 4.4,
    reviewCount: 1234,
    studentCount: 12345,
    tags: ["알고리즘"],
  },
]

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <CategoryNav />
      <FeaturedBanner />

      <CourseSection
        title="🔥 지금 가장 인기있는 강의"
        description="수강생들이 가장 많이 선택한 베스트 강의"
        courses={popularCourses}
      />

      <div className="border-t" />

      <CourseSection title="✨ 새로 나온 강의" description="최신 트렌드를 반영한 신규 강의" courses={newCourses} />

      <div className="border-t" />

      <CourseSection title="🎁 무료 강의" description="부담없이 시작하는 무료 강의" courses={freeCourses} />

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
