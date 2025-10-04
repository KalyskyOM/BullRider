interface YouTubeVideo {
  id: string
  title: string
  thumbnail: string
  publishedAt: string
  views?: string
  duration?: string
}

// YouTube channel ID for @manelic.1
const CHANNEL_ID = 'UC1UU2Q0X3hkOFdwOGd0a0R0'

// RSS feed URL
const RSS_FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`

// CORS proxy to fetch RSS feed (since YouTube RSS doesn't support CORS)
const CORS_PROXY = 'https://api.allorigins.win/raw?url='

export async function fetchYouTubeVideos(): Promise<YouTubeVideo[]> {
  try {
    const response = await fetch(`${CORS_PROXY}${encodeURIComponent(RSS_FEED_URL)}`)
    const xmlText = await response.text()
    
    // Parse XML
    const parser = new DOMParser()
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml')
    
    // Get all entry elements
    const entries = xmlDoc.querySelectorAll('entry')
    
    const videos: YouTubeVideo[] = []
    
    entries.forEach((entry) => {
      const videoId = entry.querySelector('videoId')?.textContent || ''
      const title = entry.querySelector('title')?.textContent || ''
      const published = entry.querySelector('published')?.textContent || ''
      
      if (videoId && title) {
        videos.push({
          id: videoId,
          title: title,
          thumbnail: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
          publishedAt: published,
          views: undefined, // RSS doesn't provide view count
          duration: undefined // RSS doesn't provide duration
        })
      }
    })
    
    return videos
  } catch (error) {
    console.error('Error fetching YouTube RSS feed:', error)
    return []
  }
}

export function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffInMs = now.getTime() - date.getTime()
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
  
  if (diffInDays === 0) return 'Today'
  if (diffInDays === 1) return '1 day ago'
  if (diffInDays < 7) return `${diffInDays} days ago`
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} week${Math.floor(diffInDays / 7) > 1 ? 's' : ''} ago`
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} month${Math.floor(diffInDays / 30) > 1 ? 's' : ''} ago`
  return `${Math.floor(diffInDays / 365)} year${Math.floor(diffInDays / 365) > 1 ? 's' : ''} ago`
}

// Get total video count from RSS feed (RSS provides up to 15 most recent)
export async function getVideoCount(): Promise<number> {
  try {
    const videos = await fetchYouTubeVideos()
    // Note: RSS only shows 15 most recent videos, so this might not be the total channel count
    return videos.length
  } catch (error) {
    console.error('Error getting video count:', error)
    return 7 // Fallback to hardcoded value
  }
}
