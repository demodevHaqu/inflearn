'use client'

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight } from "lucide-react"
import { useState } from "react"
import { submitLead } from "@/app/actions/lead"
import { toast } from "sonner"

export function FeaturedBanner() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // 핵심 로그: 사용자가 신청 모달에서 제출 시도
    console.log("[EnrollModal] submit_clicked", { name, email })
    setSubmitting(true)
    
    try {
      // 서버 액션 호출하여 노션에 저장
      const result = await submitLead(name, email)
      
      if (result.success) {
        // 핵심 로그: 저장 성공
        console.log("[EnrollModal] submit_success", { name, email })
        toast.success("강의 신청이 완료되었습니다!", {
          description: "빠른 시일 내에 연락드리겠습니다.",
        })
        setOpen(false)
        setName("")
        setEmail("")
      } else {
        // 핵심 로그: 저장 실패
        console.error("[EnrollModal] submit_failed", { error: result.error })
        toast.error("신청 실패", {
          description: result.error || "알 수 없는 오류가 발생했습니다.",
        })
      }
    } catch (err) {
      // 핵심 로그: 예외 발생
      console.error("[EnrollModal] submit_error", err)
      toast.error("신청 실패", {
        description: "네트워크 오류가 발생했습니다. 다시 시도해주세요.",
      })
    } finally {
      setSubmitting(false)
    }
  }
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
            <Button size="lg" className="gap-2" onClick={() => { console.log("[EnrollModal] open_clicked"); setOpen(true) }}>
              강의 신청하기
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              무료 강의 보기
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>강의 신청</DialogTitle>
            <DialogDescription>
              노션 데이터베이스로 저장할 정보를 입력해주세요.
            </DialogDescription>
          </DialogHeader>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">이름</Label>
              <Input id="name" placeholder="홍길동" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">이메일</Label>
              <Input id="email" type="email" placeholder="user@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={submitting}>
                {submitting ? "전송 중..." : "신청하기"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
