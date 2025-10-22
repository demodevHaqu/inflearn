import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function FeaturedBanner() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
      <div className="container py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl text-balance">
            성장을 위한
            <br />
            <span className="text-primary">최고의 온라인 강의</span>
          </h1>
          <p className="mb-8 text-lg text-muted-foreground md:text-xl text-pretty">
            개발부터 디자인, 마케팅까지. 실무 전문가의 검증된 강의로 당신의 커리어를 성장시키세요.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="gap-2">
              강의 둘러보기
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              무료 강의 보기
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
