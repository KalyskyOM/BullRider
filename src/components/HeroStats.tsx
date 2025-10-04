import React, { useState, useEffect } from 'react'
import { getVideoCount } from '../services/youtubeRSS'

export const HeroStats: React.FC = () => {
  const [videoCount, setVideoCount] = useState(7) // Default fallback
  const [totalViews] = useState('3.4K+') // Manually set - RSS doesn't provide this

  useEffect(() => {
    loadVideoCount()
  }, [])

  const loadVideoCount = async () => {
    const count = await getVideoCount()
    setVideoCount(count)
  }

  return (
    <div className="hero-stats">
      <div className="stat">
        <span className="stat-number">{videoCount}</span>
        <span className="stat-label">YouTube Videos</span>
      </div>
      <div className="stat">
        <span className="stat-number">{totalViews}</span>
        <span className="stat-label">Total Views</span>
      </div>
      <div className="stat">
        <span className="stat-number">Multiple</span>
        <span className="stat-label">Championships</span>
      </div>
    </div>
  )
}
