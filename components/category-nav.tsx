"use client"

import { Button } from "@/components/ui/button"
import { Code, Shield, Database, Palette, Briefcase, Sparkles } from "lucide-react"

const categories = [
  { icon: Code, label: "개발·프로그래밍", color: "text-blue-600" },
  { icon: Shield, label: "보안·네트워크", color: "text-green-600" },
  { icon: Database, label: "데이터 사이언스", color: "text-purple-600" },
  { icon: Palette, label: "크리에이티브", color: "text-pink-600" },
  { icon: Briefcase, label: "직무·마케팅", color: "text-orange-600" },
  { icon: Sparkles, label: "AI", color: "text-indigo-600" },
]

export function CategoryNav() {
  return (
    <div className="border-b bg-card">
      <div className="container">
        <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-hide">
          {categories.map((category) => (
            <Button key={category.label} variant="ghost" className="flex items-center gap-2 whitespace-nowrap">
              <category.icon className={`h-4 w-4 ${category.color}`} />
              <span className="text-sm">{category.label}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
