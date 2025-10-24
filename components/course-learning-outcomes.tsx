import { CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface CourseLearningOutcomesProps {
  outcomes: string[]
}

export function CourseLearningOutcomes({
  outcomes,
}: CourseLearningOutcomesProps) {
  console.log('[CourseLearningOutcomes] 렌더링, 항목 수:', outcomes.length)

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold">무엇을 배우나요?</h2>
      <Card>
        <CardContent className="p-6">
          <div className="grid gap-4 md:grid-cols-2">
            {outcomes.map((outcome, index) => (
              <div key={index} className="flex gap-3">
                <CheckCircle className="h-5 w-5 flex-shrink-0 text-primary mt-0.5" />
                <span className="text-sm leading-relaxed">{outcome}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

