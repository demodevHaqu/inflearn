'use client'

/**
 * YouTube 영상 플레이어 컴포넌트
 */
interface YouTubePlayerProps {
  videoId: string
  title?: string
  autoplay?: boolean
  className?: string
}

export function YouTubePlayer({ 
  videoId, 
  title = "YouTube 영상",
  autoplay = false,
  className = ""
}: YouTubePlayerProps) {
  console.log('[YouTubePlayer] 렌더링:', videoId)
  
  const params = new URLSearchParams()
  if (autoplay) params.set('autoplay', '1')
  // 권장: modestbranding, rel=0로 추천영상 최소화, origin은 SSR/CSR 혼용 고려해 생략
  params.set('modestbranding', '1')
  params.set('rel', '0')
  const embedUrl = `https://www.youtube.com/embed/${videoId}${params.toString() ? `?${params.toString()}` : ''}`

  return (
    <div className={`relative aspect-video w-full overflow-hidden rounded-lg ${className}`}>
      <iframe
        src={embedUrl}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        onLoad={() => console.log('[YouTubePlayer] iframe 로드 완료:', { videoId })}
        onError={() => console.error('[YouTubePlayer] iframe 로드 실패:', { videoId, embedUrl })}
        className="absolute inset-0 h-full w-full"
      />
    </div>
  )
}

