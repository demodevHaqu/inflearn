import { CourseCard } from "./course-card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface Course {
  id: string
  title: string
  instructor: string
  thumbnail: string
  price: string
  originalPrice?: string
  rating: number
  reviewCount: number
  studentCount: number
  tags?: string[]
  discount?: string
}

interface CourseSectionProps {
  title: string
  description?: string
  courses: Course[]
}

export function CourseSection({ title, description, courses }: CourseSectionProps) {
  return (
    <section className="py-12">
      <div className="container">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold md:text-3xl">{title}</h2>
            {description && <p className="mt-2 text-muted-foreground">{description}</p>}
          </div>
          <Button variant="ghost" className="hidden gap-2 md:flex">
            전체보기
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {courses.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>
        <div className="mt-6 flex justify-center md:hidden">
          <Button variant="ghost" className="gap-2">
            전체보기
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
