import React, { useState, useEffect } from 'react'
import { fetchYouTubeVideos, formatTimeAgo } from '../services/youtubeRSS'

interface Video {
  id: string
  title: string
  thumbnail: string
  publishedAt: string
  views?: string
  duration?: string
}

// Fallback videos if RSS feed fails
const fallbackVideos: Video[] = [
  {
    id: 'FzXGJtFSG84',
    title: 'POV European Championship Downhill Track',
    thumbnail: 'https://i.ytimg.com/vi/FzXGJtFSG84/maxresdefault.jpg',
    publishedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    duration: '3:22',
    views: '84 views'
  },
  {
    id: 'catalunya-run',
    title: 'Full Run POV La Catalunya',
    thumbnail: 'https://cloudfront-us-east-2.images.arcpublishing.com/reuters/QV2KNNY3UJJUDLI57LDFXOMTHY.jpg',
    publishedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    duration: '3:35',
    views: '19 views'
  },
  {
    id: 'vallnord',
    title: 'Vallnord Commencal',
    thumbnail: 'https://bikerumor.com/wp-content/uploads/2023/06/2023-lenzerheide-world-cup-dh-rachel-atherton-finals-run.jpg',
    publishedAt: new Date(Date.now() - 3 * 365 * 24 * 60 * 60 * 1000).toISOString(),
    duration: '0:39',
    views: '147 views'
  }
]

export const YouTubeVideos: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>(fallbackVideos)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadVideos()
  }, [])

  const loadVideos = async () => {
    try {
      const fetchedVideos = await fetchYouTubeVideos()
      if (fetchedVideos.length > 0) {
        // Take first 4 videos
        setVideos(fetchedVideos.slice(0, 4))
      }
    } catch (error) {
      console.error('Failed to load YouTube videos, using fallback:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleVideoClick = (videoId: string) => {
    // Check if it's a YouTube video ID (not a placeholder)
    if (videoId.length === 11 && !videoId.includes('-')) {
      window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank')
    }
  }

  return (
    <section id="youtube-videos" className="youtube-videos">
      <div className="container">
        <h2>Latest Videos from @manelic.1</h2>
        <p>Best moments riding bikes, exploring mountains, and championship racing</p>
        <div className="videos-grid">
          {videos.map((video, index) => (
            <div 
              key={video.id} 
              className={`video-item ${index === 0 ? 'featured' : ''}`}
            >
              <div 
                className="video-thumbnail" 
                data-video={video.id}
                onClick={() => handleVideoClick(video.id)}
                style={{ cursor: 'pointer' }}
              >
                <img src={video.thumbnail} alt={video.title} />
                <div className="play-button">▶</div>
                <div className="video-overlay">
                  <h3>{video.title}</h3>
                  <div className="video-stats">
                    {video.duration && <span>{video.duration}</span>}
                    {video.duration && video.views && <span> • </span>}
                    {video.views && <span>{video.views}</span>}
                    {(video.duration || video.views) && <span> • </span>}
                    <span>{formatTimeAgo(video.publishedAt)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="shorts-section">
          <h3>Popular YouTube Shorts</h3>
          <div className="shorts-grid">
            <div className="short-item">
              <div className="short-thumbnail">
                <img src="https://images.singletracks.com/blog/wp-content/uploads/2021/07/0e2d6f45-1e20-4e93-9cf6-78f414da08e5-750x500.jpg" alt="Bike Stand DIY" />
                <div className="short-badge">Shorts</div>
              </div>
              <h4>DIY Bike Stand Build</h4>
              <p>1.3K views</p>
            </div>
            <div className="short-item">
              <div className="short-thumbnail">
                <img src="https://assets.ucimtbworldseries.com/content/contentUploads/TFVp2u1tW9RHw3yWkLpQSmUO4jeeZRCyuY7v9yOb.jpg" alt="European Championship Training" />
                <div className="short-badge">Shorts</div>
              </div>
              <h4>European Championship Training</h4>
              <p>1K views</p>
            </div>
            <div className="short-item">
              <div className="short-thumbnail">
                <img src="https://ep1.pinkbike.org/p5pb9592724/p5pb9592724.jpg" alt="First Day DH Bike" />
                <div className="short-badge">Shorts</div>
              </div>
              <h4>First Day with DH Bike</h4>
              <p>1.1K views</p>
            </div>
          </div>
        </div>

        <div className="channel-cta">
          <h3>Subscribe for More Cycling Content!</h3>
          <p>"Best moments riding bikes. Being, exploring and enjoying the mountains. Best moments with the homies."</p>
          <a href="https://www.youtube.com/@manelic.1" target="_blank" rel="noopener" className="btn-youtube">
            <i className="fab fa-youtube"></i>
            Subscribe to @manelic.1
          </a>
        </div>
      </div>
    </section>
  )
}
