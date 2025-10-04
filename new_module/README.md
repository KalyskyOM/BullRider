# Cycling Race Dashboard

An interactive cycling race dashboard module that displays rider profiles and race results with a beautiful dark theme design. Built as a responsive, data-driven web interface that matches the exact design from the original cycling dashboard.

## 🏁 Currently Completed Features

### ✅ Rider Profile Display
- **Dynamic rider header** with name, level, discipline, and location
- **Key statistics overview**: Season rank, total points, and win rate
- **Achievement cards** showing:
  - Championship wins with trophy icon
  - Podium finishes with medal icon  
  - Performance trend with chart icon
  - Elite level status with bolt icon

### ✅ Race Results Table
- **Interactive results table** with sortable race data
- **Position highlighting**: 1st (gold), 2nd (silver), 3rd (bronze)
- **Comprehensive race information**: Date, event, category, position, time
- **Responsive design** that works on all screen sizes

### ✅ Performance Chart Modal
- **Interactive performance visualization** using Chart.js
- **Clickable Performance Trend card** opens detailed chart modal
- **Dual data series**: % from category winner and % from fastest male
- **Professional chart styling** matching dark theme design
- **Responsive modal** with smooth animations and keyboard navigation

### ✅ Championship Wins Modal
- **Comprehensive race results** from verified CSV data
- **Clickable Championship Wins card** opens detailed wins modal
- **Organized data display**: Race wins, championships, and podiums
- **Summary statistics** showing total counts
- **Source verification** with links to official results
- **Professional table styling** with position badges and hover effects

### ✅ Data Management System
- **RESTful Table API integration** for dynamic data loading
- **Fallback system** with default data when API is unavailable
- **Real-time updates** via refresh functionality
- **Single rider focus** displaying Mael Massoutie Bover's profile

### ✅ Visual Design
- **Exact color matching** from the original dashboard
- **Dark theme** with gradient backgrounds and translucent cards
- **Icon integration** using Font Awesome for achievement types
- **Smooth hover effects** and responsive animations
- **Professional typography** with Inter font family

## 🚀 Functional Entry Points

### Main Interface
- **`index.html`**: Primary dashboard interface
- **`setup-data.html`**: Data initialization utility (optional)

### API Endpoints (RESTful Table API)
- **GET** `/tables/riders` - List all riders with pagination
- **GET** `/tables/riders/{id}` - Get specific rider details
- **GET** `/tables/race_results` - List all race results
- **GET** `/tables/race_results/{id}` - Get specific race result
- **POST** `/tables/riders` - Add new rider
- **POST** `/tables/race_results` - Add new race result
- **PUT** `/tables/riders/{id}` - Update rider information
- **DELETE** `/tables/riders/{id}` - Remove rider

### JavaScript Methods
```javascript
// Access the dashboard instance
window.dashboard

// Add sample data
window.addSampleRider()
window.addSampleRaceResult(riderId)

// Dashboard methods
dashboard.displayRider()
dashboard.refreshData()
dashboard.addRider(riderData)
dashboard.addRaceResult(resultData)
dashboard.openPerformanceModal()
dashboard.closePerformanceModal()
dashboard.openChampionshipModal()
dashboard.closeChampionshipModal()
```

## 📊 Data Models & Structure

### Riders Table Schema
```json
{
  "id": "text",
  "name": "text", 
  "level": "text",
  "discipline": "text",
  "location": "text",
  "season_rank": "number",
  "total_points": "number",
  "win_rate": "number",
  "championship_wins": "number",
  "podium_finishes": "text",
  "performance_trend": "text",
  "elite_level": "text",
  "avg_finish_position": "number",
  "best_lap_time": "text",
  "races_completed": "text"
}
```

### Race Results Table Schema
```json
{
  "id": "text",
  "rider_id": "text",
  "date": "text",
  "event": "text", 
  "category": "text",
  "position": "text",
  "time": "text",
  "is_winner": "bool",
  "event_type": "text",
  "season": "text"
}
```

## 🚧 Features Not Yet Implemented

- **Advanced filtering** by season, event type, or category
- **Additional chart types** (bar charts, pie charts for category breakdown)
- **Export functionality** for race results (PDF, CSV)
- **Multi-language support** for international riders
- **Photo/avatar uploads** for rider profiles
- **Season comparison** tools and analytics
- **Admin panel** for bulk data management
- **Email notifications** for new race results
- **Social sharing** integration
- **Print-friendly** layouts

## 🛠️ Recommended Next Steps

### Phase 1: Enhanced Analytics
1. **Add Chart.js integration** for performance visualization
2. **Implement season comparison** charts
3. **Create win-rate trends** over time
4. **Add lap time analytics** with best/average/worst times

### Phase 2: Advanced Features  
1. **Implement advanced filtering** system
2. **Add search functionality** across riders and events
3. **Create export options** for data analysis
4. **Build admin dashboard** for data management

### Phase 3: Social Features
1. **Add rider photo uploads** via file input
2. **Implement social sharing** buttons
3. **Add rider profile editing** functionality
4. **Add comment system** for race results

## 🎯 Project Goals

This dashboard serves as a comprehensive cycling race management system that:
- **Showcases rider achievements** in an engaging visual format
- **Provides real-time race result tracking** with historical data
- **Maintains professional aesthetics** matching industry standards
- **Offers scalable data management** through RESTful APIs
- **Focuses on single rider profile** with comprehensive data display

## 💡 Technical Highlights

- **Modern ES6+ JavaScript** with class-based architecture
- **Chart.js integration** for professional data visualization
- **Modal system** with backdrop blur and smooth animations
- **Responsive CSS Grid** and Flexbox layouts
- **Async/await pattern** for clean API interactions
- **Error handling** with graceful fallbacks
- **Semantic HTML5** structure for accessibility
- **CSS custom properties** for maintainable theming
- **Progressive enhancement** approach

## 🔧 Development Setup

1. Open `index.html` in your browser to view the dashboard
2. Use `setup-data.html` to initialize the database (optional)
3. The dashboard works with default data even without API access
4. For live data, ensure the RESTful Table API is available

## 📱 Browser Compatibility

- **Modern browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile responsive**: iOS Safari, Chrome Mobile, Samsung Internet
- **Progressive enhancement**: Works without JavaScript (basic layout)

---

*This interactive cycling dashboard demonstrates modern web development techniques while maintaining the exact visual design of professional cycling race management systems.*