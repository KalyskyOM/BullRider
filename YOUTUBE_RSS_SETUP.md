# YouTube RSS Feed Integration

## Overview
The site now automatically fetches the latest videos from your YouTube channel using RSS feeds. Videos are updated dynamically when users visit the page.

## How It Works
1. **RSS Feed Parsing**: Fetches YouTube channel RSS feed (up to 15 most recent videos)
2. **Automatic Updates**: No manual code changes needed when you upload new videos
3. **Fallback Videos**: Shows hardcoded videos if RSS feed fails to load
4. **CORS Proxy**: Uses `allorigins.win` to bypass CORS restrictions

## Getting Your Channel ID

Your channel handle is `@manelic.1`, but the RSS feed requires a Channel ID (starts with `UC...`).

### Method 1: From YouTube Studio
1. Go to [YouTube Studio](https://studio.youtube.com)
2. Click on "Settings" → "Channel" → "Advanced settings"
3. Copy your Channel ID (starts with `UC`)

### Method 2: From Channel Page Source
1. Go to `https://www.youtube.com/@manelic.1`
2. Right-click → View Page Source
3. Search for `"channelId"` or `"externalId"`
4. Copy the ID that starts with `UC`

### Method 3: Using a Tool
Visit: `https://commentpicker.com/youtube-channel-id.php`
Enter: `@manelic.1`

## Configuration

Once you have your Channel ID, update the file:
`src/services/youtubeRSS.ts`

Replace:
```typescript
const CHANNEL_HANDLE = '@manelic.1'
```

With:
```typescript
const CHANNEL_ID = 'UC_YOUR_ACTUAL_CHANNEL_ID_HERE'
const RSS_FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`
```

And update the `fetchYouTubeVideos` function to use the direct URL:
```typescript
export async function fetchYouTubeVideos(): Promise<YouTubeVideo[]> {
  try {
    const response = await fetch(`${CORS_PROXY}${encodeURIComponent(RSS_FEED_URL)}`)
    // ... rest of the code
  }
}
```

## Features
- ✅ Automatically shows latest 4 videos
- ✅ Displays video thumbnails
- ✅ Shows "time ago" for each video
- ✅ Fallback to hardcoded videos if RSS fails
- ✅ Click to open video on YouTube
- ✅ No API key required
- ✅ No quota limits

## Limitations
- RSS feed only provides 15 most recent videos
- No view count or duration from RSS (would need YouTube API for that)
- Requires CORS proxy for client-side fetching

## Alternative: YouTube Data API v3
For more features (view counts, durations, likes, etc.), consider using the YouTube Data API:
- Requires API key (free tier: 10,000 units/day)
- Provides full video metadata
- More reliable than RSS parsing

## Testing
1. Upload a new video to your YouTube channel
2. Wait a few minutes for RSS feed to update
3. Refresh your website
4. New video should appear automatically

## Troubleshooting
- **Videos not loading**: Check browser console for errors
- **CORS errors**: CORS proxy might be down, try alternative: `https://corsproxy.io/?`
- **Wrong videos showing**: Verify Channel ID is correct
- **Fallback videos showing**: RSS feed fetch failed, check network tab
