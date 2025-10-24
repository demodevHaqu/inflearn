import { Star, ThumbsUp } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { Review } from "@/lib/types"

interface CourseReviewsProps {
  reviews: Review[]
  rating: number
  reviewCount: number
}

export function CourseReviews({
  reviews,
  rating,
  reviewCount,
}: CourseReviewsProps) {
  console.log('[CourseReviews] 렌더링, 리뷰 수:', reviews.length)

  // 평점 분포 계산 (실제로는 서버에서 받아와야 함)
  const ratingDistribution = {
    5: 70,
    4: 20,
    3: 7,
    2: 2,
    1: 1,
  }

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold">수강평</h2>

      {/* 평점 요약 */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="grid gap-8 md:grid-cols-2">
            {/* 전체 평점 */}
            <div className="flex flex-col items-center justify-center p-6 text-center">
              <div className="mb-2 text-5xl font-bold">{rating}</div>
              <div className="mb-2 flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <div className="text-sm text-muted-foreground">
                {reviewCount.toLocaleString()}개 평가
              </div>
            </div>

            {/* 평점 분포 */}
            <div className="space-y-2">
              {Object.entries(ratingDistribution)
                .reverse()
                .map(([stars, percentage]) => (
                  <div key={stars} className="flex items-center gap-3">
                    <div className="flex items-center gap-1 w-16">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{stars}</span>
                    </div>
                    <Progress value={percentage} className="flex-1" />
                    <span className="w-12 text-right text-sm text-muted-foreground">
                      {percentage}%
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 리뷰 목록 */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-6">
              <div className="flex gap-4">
                <Avatar>
                  <AvatarImage src={review.userAvatar} alt={review.userName} />
                  <AvatarFallback>{review.userName[0]}</AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="mb-2 flex items-center justify-between">
                    <div>
                      <div className="font-semibold">{review.userName}</div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(review.date).toLocaleDateString('ko-KR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="mb-3 text-sm leading-relaxed">
                    {review.comment}
                  </p>

                  <Button variant="ghost" size="sm" className="gap-2">
                    <ThumbsUp className="h-4 w-4" />
                    도움됨 {review.helpful || 0}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

