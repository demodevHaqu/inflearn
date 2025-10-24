import { ChevronDown, Clock, PlayCircle } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import type { CourseCurriculum as CourseCurriculumType } from "@/lib/types"

interface CourseCurriculumProps {
  curriculum: CourseCurriculumType[]
}

export function CourseCurriculum({ curriculum }: CourseCurriculumProps) {
  console.log('[CourseCurriculum] 렌더링, 섹션 수:', curriculum.length)

  const totalLessons = curriculum.reduce(
    (sum, section) => sum + section.lessons.length,
    0
  )
  const totalDuration = curriculum.reduce(
    (sum, section) =>
      sum +
      section.lessons.reduce((lessonSum, lesson) => {
        const [hours = '0', minutes = '0'] = lesson.duration.split(':')
        return lessonSum + parseInt(hours) * 60 + parseInt(minutes)
      }, 0),
    0
  )

  const hours = Math.floor(totalDuration / 60)
  const minutes = totalDuration % 60

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">커리큘럼</h2>
        <div className="text-sm text-muted-foreground">
          총 {curriculum.length}개 섹션 • {totalLessons}개 강의 • {hours}시간{' '}
          {minutes}분
        </div>
      </div>

      <Accordion type="multiple" className="space-y-2">
        {curriculum.map((section, index) => {
          const sectionDuration = section.lessons.reduce((sum, lesson) => {
            const [hours = '0', minutes = '0'] = lesson.duration.split(':')
            return sum + parseInt(hours) * 60 + parseInt(minutes)
          }, 0)
          const sectionHours = Math.floor(sectionDuration / 60)
          const sectionMinutes = sectionDuration % 60

          return (
            <AccordionItem
              key={section.id}
              value={section.id}
              className="border rounded-lg"
            >
              <AccordionTrigger className="px-4 hover:no-underline hover:bg-muted/50">
                <div className="flex items-center justify-between w-full pr-4">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold">
                      섹션 {index + 1}. {section.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{section.lessons.length}개 강의</span>
                    <span>
                      {sectionHours > 0 && `${sectionHours}시간 `}
                      {sectionMinutes}분
                    </span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="space-y-2">
                  {section.lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <PlayCircle className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{lesson.title}</span>
                        {lesson.isFree && (
                          <Badge variant="outline" className="text-xs">
                            무료
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{lesson.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
    </div>
  )
}

