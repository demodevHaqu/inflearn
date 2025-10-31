/**
 * YouTube API 관련 유틸리티
 */

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY
const YOUTUBE_CHANNEL_ID = 'UCfZCgp-n4yLLEaX6E30Xh4w'

export interface YouTubeVideo {
  id: string
  title: string
  description: string
  thumbnail: string
  publishedAt: string
}

/**
 * YouTube 채널의 최신 영상 목록을 가져옵니다
 */
export async function getChannelVideos(maxResults: number = 10): Promise<YouTubeVideo[]> {
  console.log('[YouTube API] 채널 영상 가져오기 시작:', YOUTUBE_CHANNEL_ID)
  
  if (!YOUTUBE_API_KEY) {
    console.error('[YouTube API] API 키가 설정되지 않았습니다')
    return []
  }

  try {
    // 1. 채널의 업로드 플레이리스트 ID 가져오기
    const channelResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${YOUTUBE_CHANNEL_ID}&key=${YOUTUBE_API_KEY}`
    )

    if (!channelResponse.ok) {
      console.error('[YouTube API] 채널 정보 가져오기 실패:', channelResponse.status)
      return []
    }

    const channelData = await channelResponse.json()
    console.log('[YouTube API] 채널 데이터:', channelData)

    if (!channelData.items || channelData.items.length === 0) {
      console.error('[YouTube API] 채널을 찾을 수 없습니다')
      return []
    }

    const uploadsPlaylistId = channelData.items[0].contentDetails.relatedPlaylists.uploads
    console.log('[YouTube API] 업로드 플레이리스트 ID:', uploadsPlaylistId)

    // 2. 플레이리스트에서 영상 목록 가져오기
    const playlistResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=${maxResults}&key=${YOUTUBE_API_KEY}`
    )

    if (!playlistResponse.ok) {
      console.error('[YouTube API] 플레이리스트 가져오기 실패:', playlistResponse.status)
      return []
    }

    const playlistData = await playlistResponse.json()
    const totalItems = playlistData.items?.length || 0
    console.log('[YouTube API] 영상 개수:', totalItems)

    if (!playlistData.items || totalItems === 0) {
      console.warn('[YouTube API] 플레이리스트에 영상이 없습니다')
      return []
    }

    const candidateVideos: YouTubeVideo[] = playlistData.items.map((item: any) => ({
      id: item.snippet.resourceId.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.medium?.url || item.snippet.thumbnails?.default?.url,
      publishedAt: item.snippet.publishedAt,
    }))

    // 임베드가 차단된 영상(Private, embeddable=false) 제외
    const ids = candidateVideos.map((v) => v.id).filter(Boolean)
    const idsParam = ids.join(',')
    console.log('[YouTube API] 임베드 가능 여부 확인할 ID 수:', ids.length)

    const statusResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=status&id=${idsParam}&key=${YOUTUBE_API_KEY}`
    )
    if (!statusResponse.ok) {
      console.error('[YouTube API] 상태 조회 실패:', statusResponse.status)
      // 상태 조회 실패 시 후보 목록 그대로 반환 (후단에서 실패 시 플레이어에서만 미노출될 수 있음)
      return candidateVideos
    }

    const statusData = await statusResponse.json()
    const embeddableSet = new Set<string>()
    for (const item of statusData.items || []) {
      const embeddable = item?.status?.embeddable
      const privacy = item?.status?.privacyStatus
      if (embeddable && privacy === 'public') {
        embeddableSet.add(item.id)
      }
    }

    const filtered = candidateVideos.filter((v) => embeddableSet.has(v.id))
    console.log('[YouTube API] 임베드 가능한 영상 수:', filtered.length)

    return filtered

  } catch (error) {
    console.error('[YouTube API] 에러 발생:', error)
    return []
  }
}

/**
 * 특정 영상의 상세 정보를 가져옵니다
 */
export async function getVideoDetails(videoId: string): Promise<YouTubeVideo | null> {
  console.log('[YouTube API] 영상 상세 정보 가져오기:', videoId)
  
  if (!YOUTUBE_API_KEY) {
    console.error('[YouTube API] API 키가 설정되지 않았습니다')
    return null
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${YOUTUBE_API_KEY}`
    )

    if (!response.ok) {
      console.error('[YouTube API] 영상 정보 가져오기 실패:', response.status)
      return null
    }

    const data = await response.json()

    if (!data.items || data.items.length === 0) {
      console.error('[YouTube API] 영상을 찾을 수 없습니다')
      return null
    }

    const item = data.items[0]
    const video: YouTubeVideo = {
      id: item.id,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.high.url,
      publishedAt: item.snippet.publishedAt,
    }

    console.log('[YouTube API] 영상 상세 정보 가져오기 완료:', video.title)
    return video

  } catch (error) {
    console.error('[YouTube API] 에러 발생:', error)
    return null
  }
}

