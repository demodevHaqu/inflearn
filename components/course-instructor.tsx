import { Star, Users, BookOpen } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import type { InstructorInfo } from "@/lib/types"

interface CourseInstructorProps {
  instructor: InstructorInfo
}

export function CourseInstructor({ instructor }: CourseInstructorProps) {
  console.log('[CourseInstructor] 렌더링:', instructor.name)

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold">강사 소개</h2>
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-6 md:flex-row">
            <Avatar className="h-24 w-24">
              <AvatarImage src={instructor.avatar} alt={instructor.name} />
              <AvatarFallback className="text-2xl">
                {instructor.name[0]}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <h3 className="mb-1 text-xl font-bold">{instructor.name}</h3>
              <p className="mb-4 text-muted-foreground">{instructor.title}</p>

              <div className="flex flex-wrap gap-6 mb-4">
                {instructor.rating && (
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{instructor.rating}</span>
                    <span className="text-sm text-muted-foreground">
                      강사 평점
                    </span>
                  </div>
                )}
                {instructor.courseCount && (
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">
                      {instructor.courseCount}개
                    </span>
                    <span className="text-sm text-muted-foreground">
                      강의
                    </span>
                  </div>
                )}
                {instructor.studentCount && (
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">
                      {instructor.studentCount.toLocaleString()}명
                    </span>
                    <span className="text-sm text-muted-foreground">
                      수강생
                    </span>
                  </div>
                )}
              </div>

              <p className="text-sm leading-relaxed text-muted-foreground">
                {instructor.bio}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

