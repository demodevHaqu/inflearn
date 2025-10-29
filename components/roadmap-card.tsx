"use client"

import Image from "next/image"
import { Roadmap } from "@/lib/types"
import { Badge } from "@/components/ui/badge"

interface RoadmapCardProps {
  roadmap: Roadmap
}

export function RoadmapCard({ roadmap }: RoadmapCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg bg-white border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer">
      {/* ====================================================================
          카드 내용 영역 - 반응형 디자인 적용
          ==================================================================== */}
      <div className="flex flex-col sm:flex-row h-auto sm:h-[171px]">
        {/* 텍스트 영역 - 모바일에서는 전체 너비, 데스크톱에서는 고정 너비 */}
        <div className="flex-1 sm:w-[608px] p-4 flex flex-col justify-between">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-gray-900 leading-tight">
              {roadmap.title}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {roadmap.description}
            </p>
          </div>
        </div>

        {/* 이미지 영역 - 모바일에서는 전체 너비, 데스크톱에서는 고정 크기 */}
        <div className="w-full sm:w-[171px] h-48 sm:h-[171px] relative shrink-0">
          <Image
            src={roadmap.image}
            alt={roadmap.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 171px"
            priority={false}
          />
        </div>
      </div>

      {/* ====================================================================
          호버 오버레이
          ==================================================================== */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
    </div>
  )
}
