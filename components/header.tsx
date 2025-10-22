"use client"

import { Search, Bell, User, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <a href="/" className="flex items-center gap-2">
            
            <span className="text-xl font-bold">인프런</span>
          </a>

          <nav className="hidden md:flex items-center gap-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-1">
                  강의
                  <Menu className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuItem>개발·프로그래밍</DropdownMenuItem>
                <DropdownMenuItem>보안·네트워크</DropdownMenuItem>
                <DropdownMenuItem>데이터 사이언스</DropdownMenuItem>
                <DropdownMenuItem>크리에이티브</DropdownMenuItem>
                <DropdownMenuItem>직무·마케팅</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <a href="/roadmap" className="text-sm font-medium hover:text-primary transition-colors">
              로드맵
            </a>
            <a href="/community" className="text-sm font-medium hover:text-primary transition-colors">
              커뮤니티
            </a>
            <a href="/mentoring" className="text-sm font-medium hover:text-primary transition-colors">
              멘토링
            </a>
          </nav>
        </div>

        <div className="flex flex-1 items-center gap-4 md:max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input type="search" placeholder="배우고 싶은 지식을 검색해보세요" className="w-full pl-9" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
          <Button className="hidden md:flex">로그인</Button>
        </div>
      </div>
    </header>
  )
}
