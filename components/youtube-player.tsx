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
  
  const embedUrl = `https://www.youtube.com/embed/${videoId}${autoplay ? '?autoplay=1' : ''}`

  return (
    <div className={`relative aspect-video w-full overflow-hidden rounded-lg ${className}`}>
      <iframe
        src={embedUrl}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 h-full w-full"
      />
    </div>
  )
}

