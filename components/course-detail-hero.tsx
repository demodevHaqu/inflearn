import { Star, Users, Clock, Award, Globe, BarChart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { Course } from "@/lib/types"

interface CourseDetailHeroProps {
  course: Course
}

export function CourseDetailHero({ course }: CourseDetailHeroProps) {
  console.log('[CourseDetailHero] 렌더링:', course.title)
  
  return (
    <div className="border-b bg-gradient-to-br from-primary/5 via-background to-background">
      <div className="container py-8 md:py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* 왼쪽: 강의 정보 */}
          <div className="lg:col-span-2">
            <div className="flex flex-wrap gap-2 mb-4">
              {course.tags?.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="mb-4 text-3xl font-bold leading-tight md:text-4xl">
              {course.title}
            </h1>

            <p className="mb-6 text-lg text-muted-foreground">
              {course.description}
            </p>

            <div className="flex flex-wrap items-center gap-6 mb-6">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-lg font-semibold">{course.rating}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  ({course.reviewCount.toLocaleString()}개 평가)
                </span>
              </div>

              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-5 w-5" />
                <span>{course.studentCount.toLocaleString()}명 수강중</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <BarChart className="h-4 w-4" />
                <span>
                  {course.level === 'beginner' && '초급'}
                  {course.level === 'intermediate' && '중급'}
                  {course.level === 'advanced' && '고급'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <span>{course.language}</span>
              </div>
              {course.certificate && (
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  <span>수료증 제공</span>
                </div>
              )}
            </div>
          </div>

          {/* 오른쪽: 수강 신청 카드 */}
          <div className="lg:sticky lg:top-20 lg:self-start">
            <Card className="overflow-hidden">
              <div className="relative aspect-video bg-muted">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="mb-6">
                  <div className="flex items-baseline gap-3 mb-2">
                    {course.discount && (
                      <Badge variant="destructive" className="text-base">
                        {course.discount}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold">{course.price}</span>
                    {course.originalPrice && (
                      <span className="text-lg text-muted-foreground line-through">
                        {course.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <Button size="lg" className="w-full text-lg">
                    {course.price === '무료' ? '무료 수강 신청' : '수강 신청'}
                  </Button>
                  <Button size="lg" variant="outline" className="w-full">
                    장바구니
                  </Button>
                </div>

                <div className="mt-4 text-center text-sm text-muted-foreground">
                  30일 환불 보장
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

