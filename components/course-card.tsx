import { Star, Users } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface CourseCardProps {
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

export function CourseCard({
  title,
  instructor,
  thumbnail,
  price,
  originalPrice,
  rating,
  reviewCount,
  studentCount,
  tags = [],
  discount,
}: CourseCardProps) {
  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <div className="relative aspect-video overflow-hidden bg-muted">
        <img
          src={thumbnail || "/placeholder.svg"}
          alt={title}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
        {discount && (
          <Badge className="absolute right-2 top-2 bg-destructive text-destructive-foreground">{discount}</Badge>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="mb-2 line-clamp-2 text-base font-semibold leading-snug">{title}</h3>
        <p className="mb-3 text-sm text-muted-foreground">{instructor}</p>

        <div className="mb-3 flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
          <span className="text-sm text-muted-foreground">({reviewCount})</span>
        </div>

        {tags.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t p-4">
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>{studentCount.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-2">
          {originalPrice && <span className="text-sm text-muted-foreground line-through">{originalPrice}</span>}
          <span className="text-lg font-bold text-primary">{price}</span>
        </div>
      </CardFooter>
    </Card>
  )
}
