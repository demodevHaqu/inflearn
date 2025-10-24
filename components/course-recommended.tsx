import Link from "next/link"
import { CourseCard } from "@/components/course-card"
import type { Course } from "@/lib/types"

interface CourseRecommendedProps {
  courses: Course[]
}

export function CourseRecommended({ courses }: CourseRecommendedProps) {
  console.log('[CourseRecommended] 렌더링, 추천 강의 수:', courses.length)

  if (courses.length === 0) {
    return null
  }

  return (
    <div className="border-t bg-muted/30 py-12 md:py-16">
      <div className="container">
        <h2 className="mb-8 text-2xl font-bold">이런 강의는 어떠세요?</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {courses.map((course) => (
            <Link key={course.id} href={`/course/${course.id}`}>
              <CourseCard
                title={course.title}
                instructor={course.instructor}
                thumbnail={course.thumbnail}
                price={course.price}
                originalPrice={course.originalPrice}
                rating={course.rating}
                reviewCount={course.reviewCount}
                studentCount={course.studentCount}
                tags={course.tags}
                discount={course.discount}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

