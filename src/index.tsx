import { createRoot } from 'react-dom/client'
import React from 'react'

const App = () => {
  return (
    <div>
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Mael Massoutie</h1>
          <p className="hero-subtitle">Professional Cyclist • Champion • BullRider</p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">7</span>
              <span className="stat-label">YouTube Videos</span>
            </div>
            <div className="stat">
              <span className="stat-number">3.4K+</span>
              <span className="stat-label">Total Views</span>
            </div>
            <div className="stat">
              <span className="stat-number">Multiple</span>
              <span className="stat-label">Championships</span>
            </div>
          </div>
          <div className="hero-actions">
            <a href="#youtube-videos" className="btn-primary">Watch Videos</a>
            <a href="https://www.youtube.com/@manelic.1" target="_blank" rel="noopener" className="btn-secondary">
              <i className="fab fa-youtube"></i> Subscribe
            </a>
            <a href="#achievements" className="btn-secondary">View Achievements</a>
          </div>
        </div>
        <div className="hero-image">
          <div className="cycling-animation"></div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section id="sponsors" className="sponsors">
        <div className="container">
          <h2 className="centered-title">Sponsors & Partners</h2>
          <p className="sponsors-subtitle">Proudly supported by industry-leading brands</p>

          <div className="sponsors-grid">
            <a className="sponsor-card" href="https://galfer.eu/" target="_blank" rel="noopener noreferrer" aria-label="Galfer Brakes">
              <div className="sponsor-logo-wrap">
                <img className="sponsor-logo" alt="Galfer Logo" src="https://galfer.eu/wp-content/uploads/2021/03/galfer-logo.svg" />
              </div>
              <div className="sponsor-meta">
                <h3>GALFER</h3>
                <span>Performance Braking Systems</span>
              </div>
            </a>

            <a className="sponsor-card" href="https://www.crankbrothers.com/" target="_blank" rel="noopener noreferrer" aria-label="Crankbrothers">
              <div className="sponsor-logo-wrap">
                <img className="sponsor-logo" alt="Crankbrothers Logo" src="https://cdn.shopify.com/s/files/1/0700/2657/6326/files/Crankbrothers-Logo-Black_360x.png" />
              </div>
              <div className="sponsor-meta">
                <h3>crankbrothers</h3>
                <span>Wheels • Pedals • Components</span>
              </div>
            </a>
          </div>

          <div className="sponsors-cta">
            <a className="btn-primary" href="#contact">Become a Sponsor</a>
          </div>
        </div>
      </section>

      <section id="about" className="about">
        <div className="container">
          <h2>About Mael, Age 16</h2>
          <div className="about-grid">
            <div className="about-text">
              <p className="lead">
                "Siempre he pensado que el talento y la suerte no existen; lo único real es la disciplina. 
                Las oportunidades no son al azar, se construyen cuando uno entrega el 100% de sí mismo."
              </p>
              <p>
                From a very young age, I discovered a passion that has accompanied me all these years. 
                At 16 years old, I have a clear purpose: to become a professional cyclist.
              </p>
              <p>
                I have grown up training with dedication, learning from each race and working with 
                perseverance to improve. Each step on this path has taught me that results come 
                with effort, commitment and perseverance.
              </p>
              <div className="about-highlights">
                <div className="highlight">
                  <i className="icon-trophy"></i>
                  <span>National Podiums</span>
                </div>
                <div className="highlight">
                  <i className="icon-social"></i>
                  <span>500K+ Social Media Views</span>
                </div>
                <div className="highlight">
                  <i className="icon-growth"></i>
                  <span>Growing Trajectory</span>
                </div>
              </div>
            </div>
            <div className="about-skills">
              <h3>Skills & Languages</h3>
              <div className="skills-grid">
                <div className="skill">
                  <span className="skill-name">Catalán</span>
                  <div className="skill-level native"></div>
                </div>
                <div className="skill">
                  <span className="skill-name">Castellano</span>
                  <div className="skill-level native"></div>
                </div>
                <div className="skill">
                  <span className="skill-name">English</span>
                  <div className="skill-level advanced"></div>
                </div>
                <div className="skill">
                  <span className="skill-name">Public Speaking</span>
                  <div className="skill-level expert"></div>
                </div>
                <div className="skill">
                  <span className="skill-name">Social Media Management</span>
                  <div className="skill-level expert"></div>
                </div>
                <div className="skill">
                  <span className="skill-name">Graphic Design</span>
                  <div className="skill-level intermediate"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="achievements" className="achievements">
        <div className="container">
          <h2>Championship Achievements</h2>
          <div className="achievements-timeline">
            <div className="achievement">
              <div className="achievement-year">2025</div>
              <div className="achievement-content">
                <h3>🏆 Campeón - Copa de España Enduro</h3>
                <p>Spain Cup Enduro Champion</p>
              </div>
            </div>
            <div className="achievement">
              <div className="achievement-year">2025</div>
              <div className="achievement-content">
                <h3>🏆 Campeón - Copa de Catalunya Enduro</h3>
                <p>Catalunya Cup Enduro Champion</p>
              </div>
            </div>
            <div className="achievement">
              <div className="achievement-year">2025</div>
              <div className="achievement-content">
                <h3>🥉 3º Campeonato de Catalunya Enduro</h3>
                <p>3rd Place Catalunya Enduro Championship</p>
              </div>
            </div>
            <div className="achievement">
              <div className="achievement-year">2024</div>
              <div className="achievement-content">
                <h3>🏆 Campeón - Copa de Catalunya Enduro</h3>
                <p>Catalunya Cup Enduro Champion</p>
              </div>
            </div>
            <div className="achievement">
              <div className="achievement-year">2024</div>
              <div className="achievement-content">
                <h3>🥉 3º Campeonato de Catalunya Enduro</h3>
                <p>3rd Place Catalunya Enduro Championship</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="race-performance" className="race-performance">
        <div className="container">
          <h2 className="centered-title">Race Performance</h2>
          <p>Real-time racing data and performance analytics</p>
          
          <div className="performance-dashboard">
            <div className="performance-header">
              <div className="rider-info">
                <h3>Mael MASSOUTIE BOVER</h3>
                <div className="rider-details">
                  <span className="category">Elite • Enduro</span>
                  <span className="location">Girona, Spain</span>
                </div>
              </div>
            </div>
            <div className="performance-stats">
              <div className="stat-item">
                <span className="stat-label">Season Rank</span>
                <span className="stat-value">#1</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Points</span>
                <span className="stat-value">485</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Win Rate</span>
                <span className="stat-value">78%</span>
              </div>
            </div>
            
            <div className="performance-grid">
              <div className="performance-card">
                <div className="card-icon">🏆</div>
                <div className="card-content">
                  <h4>Championship Wins</h4>
                  <div className="card-value">5</div>
                  <p>Copa de España & Catalunya</p>
                </div>
              </div>
              
              <div className="performance-card">
                <div className="card-icon">🥇</div>
                <div className="card-content">
                  <h4>Podium Finishes</h4>
                  <div className="card-value">12+</div>
                  <p>Consistent top-3 results</p>
                </div>
              </div>
              
              <div className="performance-card">
                <div className="card-icon">📈</div>
                <div className="card-content">
                  <h4>Performance Trend</h4>
                  <div className="card-value">↗️</div>
                  <p>Continuously improving</p>
                </div>
              </div>
              
              <div className="performance-card">
                <div className="card-icon">⚡</div>
                <div className="card-content">
                  <h4>Elite Level</h4>
                  <div className="card-value">Scratch</div>
                  <p>Competing with pros</p>
                </div>
              </div>
            </div>
            
            <div className="recent-results">
              <h4>Recent Race Results</h4>
              <div className="results-table">
                <div className="result-header">
                  <span>Date</span>
                  <span>Event</span>
                  <span>Category</span>
                  <span>Position</span>
                  <span>Time</span>
                </div>
                
                <div className="result-row">
                  <span>08 Sept 2024</span>
                  <span>Copa de Catalunya Enduro</span>
                  <span>Elite</span>
                  <span className="position-1">1st</span>
                  <span>2:45:32</span>
                </div>
                
                <div className="result-row">
                  <span>24 March 2024</span>
                  <span>Copa de España Enduro</span>
                  <span>Elite</span>
                  <span className="position-1">1st</span>
                  <span>3:12:18</span>
                </div>
                
                <div className="result-row">
                  <span>15 March 2024</span>
                  <span>Campeonato Catalunya</span>
                  <span>Elite</span>
                  <span className="position-3">3rd</span>
                  <span>2:58:44</span>
                </div>
                
                <div className="result-row">
                  <span>20 Feb 2024</span>
                  <span>Copa Catalunya Enduro</span>
                  <span>Elite</span>
                  <span className="position-1">1st</span>
                  <span>2:41:09</span>
                </div>
              </div>
            </div>
            
            <div className="performance-stats">
              <div className="stat-item">
                <span className="stat-label">Avg. Finish Position</span>
                <span className="stat-value">1.8</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Best Lap Time</span>
                <span className="stat-value">2:41:09</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Races Completed</span>
                <span className="stat-value">25+</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Championship Points</span>
                <span className="stat-value">485</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="latest-blog" className="latest-blog">
        <div className="container">
          <h2 className="centered-title">Latest Blog</h2>
          <p>Discover the inspiring journey and insights from the trail</p>
          
          <div className="blog-preview-card">
            <div className="blog-preview-image">
              <img 
                src="https://page.gensparksite.com/v1/base64_upload/b49543c410aaac1e42dce09c5a1500e2" 
                alt="From Zero to Hero - Mael's Journey"
                className="blog-preview-img"
              />
              <div className="blog-preview-overlay">
                <span className="blog-category">Featured Story</span>
                <span className="blog-read-time">8 min read</span>
              </div>
            </div>
            
            <div className="blog-preview-content">
              <h3 className="blog-preview-title">From Zero to Hero: My Journey to Spanish Enduro Champion</h3>
              <p className="blog-preview-excerpt">
                "I've always believed that talent and luck don't exist. The only thing that's real is discipline." 
                Discover how a five-year-old kid on a trail bike became the Spanish Enduro Champion through dedication, 
                perseverance, and an unwavering commitment to excellence.
              </p>
              
              <div className="blog-preview-meta">
                <span className="blog-author">By Mael Massoutie</span>
                <span className="blog-date">Latest</span>
              </div>
              
              <button className="blog-preview-btn" id="blog-preview-read">
                <i className="fas fa-book-open"></i>
                Read Full Story
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="experience" className="experience">
        <div className="container">
          <h2>Professional Experience</h2>
          <div className="experience-grid">
            <div className="job">
              <div className="job-period">2024-2026</div>
              <div className="job-content">
                <h3>Monitor de Trial i XCO</h3>
                <p className="company">Club BTT Fornells</p>
                <p>Teaching trial and XCO techniques to young cyclists</p>
              </div>
            </div>
            <div className="job">
              <div className="job-period">Current</div>
              <div className="job-content">
                <h3>Ayudante de Mecánica</h3>
                <p className="company">Dosofftrack - Girona</p>
                <p>Bicycle mechanics assistant and technical support</p>
              </div>
            </div>
            <div className="job">
              <div className="job-period">Seasonal</div>
              <div className="job-content">
                <h3>Jardinero</h3>
                <p className="company">Landscaping Work</p>
                <p>Seasonal landscaping and outdoor maintenance</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="youtube-videos" className="youtube-videos">
        <div className="container">
          <h2>🎥 Latest Videos from @manelic.1</h2>
          <p>Best moments riding bikes, exploring mountains, and championship racing</p>
          <div className="videos-grid">
            <div className="video-item featured">
              <div className="video-thumbnail" data-video="FzXGJtFSG84">
                <img src="https://i.ytimg.com/vi/FzXGJtFSG84/maxresdefault.jpg" alt="European Championship POV" />
                <div className="play-button">▶</div>
                <div className="video-overlay">
                  <h3>POV European Championship Downhill Track</h3>
                  <div className="video-stats">
                    <span>3:22</span> • <span>84 views</span> • <span>1 month ago</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="video-item">
              <div className="video-thumbnail" data-video="bernex-blue">
                <img src="https://images.singletracks.com/blog/wp-content/uploads/2025/09/sitewrap_702926_right_1170.jpg" alt="Bernex Blue Line" />
                <div className="play-button">▶</div>
                <div className="video-overlay">
                  <h3>BERNEX Blue Line</h3>
                  <div className="video-stats">
                    <span>2:25</span> • <span>40 views</span> • <span>1 month ago</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="video-item">
              <div className="video-thumbnail" data-video="catalunya-run">
                <img src="https://cloudfront-us-east-2.images.arcpublishing.com/reuters/QV2KNNY3UJJUDLI57LDFXOMTHY.jpg" alt="Full Run Catalunya" />
                <div className="play-button">▶</div>
                <div className="video-overlay">
                  <h3>Full Run POV La Catalunya</h3>
                  <div className="video-stats">
                    <span>3:35</span> • <span>19 views</span> • <span>1 month ago</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="video-item">
              <div className="video-thumbnail" data-video="vallnord">
                <img src="https://bikerumor.com/wp-content/uploads/2023/06/2023-lenzerheide-world-cup-dh-rachel-atherton-finals-run.jpg" alt="Vallnord Commencal" />
                <div className="play-button">▶</div>
                <div className="video-overlay">
                  <h3>Vallnord Commencal</h3>
                  <div className="video-stats">
                    <span>0:39</span> • <span>147 views</span> • <span>3 years ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="shorts-section">
            <h3>🔥 Popular YouTube Shorts</h3>
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

      <section id="cycling-gallery" className="cycling-gallery">
        <div className="container">
          <h2>Cycling Journey</h2>
          <p>Experience the thrill and passion of professional cycling through Mael's world</p>
          <div className="gallery-grid">
            <div className="gallery-item clickable" id="hero-story-gallery">
              <div className="gallery-image">
                <div className="gallery-overlay">
                  <h3 className="gallery-title">From Zero to Hero</h3>
                  <p className="gallery-description">The inspiring journey from beginner to Spanish Enduro Champion</p>
                </div>
              </div>
            </div>
            <div className="gallery-item">
              <div className="gallery-image">
                <div className="gallery-overlay">
                  <h3 className="gallery-title">Natural Terrain</h3>
                  <p className="gallery-description">Racing through European championship courses</p>
                </div>
              </div>
            </div>
            <div className="gallery-item">
              <div className="gallery-image">
                <div className="gallery-overlay">
                  <h3 className="gallery-title">Bernex Trails</h3>
                  <p className="gallery-description">Exploring the famous Bernex blue line trails</p>
                </div>
              </div>
            </div>
            <div className="gallery-item">
              <div className="gallery-image">
                <div className="gallery-overlay">
                  <h3 className="gallery-title">Catalunya Racing</h3>
                  <p className="gallery-description">Full runs through Catalunya's technical courses</p>
                </div>
              </div>
            </div>
            <div className="gallery-item">
              <div className="gallery-image">
                <div className="gallery-overlay">
                  <h3 className="gallery-title">Training Sessions</h3>
                  <p className="gallery-description">Daily training building championship-level skills</p>
                </div>
              </div>
            </div>
            <div className="gallery-item">
              <div className="gallery-image">
                <div className="gallery-overlay">
                  <h3 className="gallery-title">Vallnord Adventures</h3>
                  <p className="gallery-description">Riding with Commencal bikes in Vallnord</p>
                </div>
              </div>
            </div>
            <div className="gallery-item">
              <div className="gallery-image">
                <div className="gallery-overlay">
                  <h3 className="gallery-title">YT Review</h3>
                  <p className="gallery-description">Professional bike testing and review sessions</p>
                </div>
              </div>
            </div>
            <div className="gallery-item">
              <div className="gallery-image">
                <div className="gallery-overlay">
                  <h3 className="gallery-title">Racing Mental Tips</h3>
                  <p className="gallery-description">Mental preparation and focus techniques for competitive racing</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="social-media" className="social-media">
        <div className="container">
          <h2>Digital Presence</h2>
          <div className="social-stats">
            <div className="social-stat">
              <h3>500,000+</h3>
              <p>Monthly Video Views</p>
            </div>
            <div className="social-stat">
              <h3>Multi-Platform</h3>
              <p>TikTok, Instagram, YouTube</p>
            </div>
            <div className="social-stat">
              <h3>Brand Aligned</h3>
              <p>Young, Consistent, Cycling Values</p>
            </div>
          </div>
          <div className="social-links">
            <a href="https://www.tiktok.com/@maelmassoutie" target="_blank" rel="noopener" className="social-link tiktok">
              <i className="icon-tiktok"></i>
              <span>TikTok</span>
            </a>
            <a href="https://www.instagram.com/maelmassoutie" target="_blank" rel="noopener" className="social-link instagram">
              <i className="icon-instagram"></i>
              <span>@maelmassoutie</span>
            </a>
            <a href="https://www.youtube.com/@maelmassoutie" target="_blank" rel="noopener" className="social-link youtube">
              <i className="icon-youtube"></i>
              <span>YouTube</span>
            </a>
          </div>
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="container">
          <h2>Get in Touch</h2>
          <div className="contact-grid">
            <div className="contact-info">
              <h3>Ready for Professional Opportunities</h3>
              <p>
                Looking for sponsorships, collaborations, or professional cycling opportunities. 
                Let's discuss how we can work together.
              </p>
              <div className="contact-details">
                <div className="contact-item">
                  <i className="icon-email"></i>
                  <span>maelmassoutie@gmail.com</span>
                </div>
              </div>
            </div>
            <div className="contact-form">
              <h3>Send a Message</h3>
              <form id="contactForm">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" name="name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" required />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <select id="subject" name="subject" required>
                    <option value="">Select a subject</option>
                    <option value="sponsorship">Sponsorship Opportunity</option>
                    <option value="collaboration">Collaboration</option>
                    <option value="media">Media Inquiry</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" rows={5} required></textarea>
                </div>
                <button type="submit" className="btn-primary">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Modal */}
      <div id="blog-modal" className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="modal-content">
          <div className="modal-header">
            <button 
              className="modal-close" 
              aria-label="Close modal"
              title="Close"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
          <div className="modal-body">
            <article className="blog-article">
              <div className="blog-hero">
                <img 
                  src="https://page.gensparksite.com/v1/base64_upload/b49543c410aaac1e42dce09c5a1500e2" 
                  alt="Mael Massoutie racing - Spanish Enduro Champion"
                  className="blog-hero-img"
                />
                <div className="blog-hero-overlay">
                  <h1>From Zero to Hero: My Journey to Spanish Enduro Champion</h1>
                  <p className="blog-byline">By Mael Massoutie</p>
                </div>
              </div>
              
              <div className="blog-content">
                <div className="blog-intro">
                  <p>I've always believed that talent and luck don't exist. The only thing that's real is discipline. Opportunities aren't random—they're built when you give 100% of yourself. This mindset has shaped everything I've become, and today, I want to share the story of how a five-year-old kid on a trail bike became the Spanish Enduro Champion.</p>
                </div>

                <h2>The Beginning: A Five-Year-Old's Passion</h2>
                <p>I can still remember the feeling—small hands gripping oversized handlebars, feet barely reaching the pedals, and the pure joy of riding down trails that seemed like mountains to my five-year-old self. From that very first ride, something clicked. It wasn't just fun; it was a calling. While other kids moved from hobby to hobby, I knew I had found something special.</p>
                
                <p>Those early years weren't about competition or championships. They were about falling in love with the bike, with the dirt, with the freedom of the trails. Every weekend, every free moment, I was riding. My parents probably thought it was just a phase, but I was building the foundation of what would become my life's purpose.</p>

                <h2>Growing Through Trial: The Foundation Years</h2>
                <p>As I grew older, my passion evolved. I started working as a Trial and XCO monitor at Club BTT Fornells, teaching younger riders the same skills that had captivated me years before. There's something powerful about sharing what you love—it deepens your own understanding and commitment. Watching kids experience that same spark I had felt reminded me why I started this journey.</p>
                
                <p>I also spent time as a mechanic's assistant at Dosofftrack in Girona. Getting my hands dirty, understanding every component of my bike, learning how each adjustment could shave seconds off a run—this wasn't just a job. It was education. I learned that being a great rider meant understanding your machine inside and out.</p>

                <h2>The Turning Point: Dedication Meets Opportunity</h2>
                <p>At 16, I made a decision that would change everything. I set a clear goal: to become a professional cyclist. Not "maybe one day" or "if things work out." No. A concrete, unwavering commitment. I started training with real dedication, treating every ride as if it mattered, because it did.</p>

                <h2>The Climb: 2024 Season</h2>
                <p>2024 was my breakthrough year, but it didn't start with victories—it started with lessons.</p>
                
                <p>In February, at the first Copa de España race in Olívar, I finished 4th out of 10 riders. Not a podium, but a solid start. Two weeks later in March, at Sant Andreu de la Barca for Copa de España #2, I placed 18th out of 31 riders. That was a wake-up call. I could have been discouraged, but instead, I used it as fuel.</p>
                
                <p>The rest of the season, I worked relentlessly. I analyzed every run, every corner, every mistake. I trained when I was tired. I rode when it rained. And the results started coming.</p>
                
                <p>By the end of 2024, I had become the <strong>Copa de Catalunya Enduro Champion</strong> and secured <strong>3rd place in the Campeonato de Catalunya</strong>. The kid who placed 18th had transformed into a champion. But I wasn't satisfied. I knew I could go further.</p>

                <h2>The Summit: 2025 Season</h2>
                <p>2025 was the year everything aligned. I came into the season stronger, smarter, and hungrier than ever.</p>
                
                <p><strong>February 2025</strong> - Copa de España #1 at Sant Andreu de la Barca: I finished <strong>4th out of 31 riders</strong>, placing in the top 91% of the field with a time of 3:11.53. Solid, but I knew I had more to give.</p>
                
                <p><strong>March 2025</strong> - Copa de España #1: Another 4th place finish, this time with 3:16.13. Consistency was building, and I was knocking on the podium's door.</p>
                
                <p><strong>August 2025</strong> - UEC European Continental Championships at La Molina: This was the big one. Racing against the best young riders in Europe, I placed in the top 50% of the field. Competing at this level, against international competition, showed me I belonged among the elite.</p>
                
                <p>The culmination of all this work? I became the <strong>2025 Spanish Enduro Champion (Copa de España)</strong> and repeated as <strong>Copa de Catalunya Enduro Champion</strong>. I also improved to <strong>3rd in the Campeonato de Catalunya Enduro 2025</strong>.</p>

                <h2>The Numbers Tell a Story</h2>
                <p>Looking at my progression tells you everything you need to know about discipline:</p>
                <ul>
                  <li><strong>2024</strong>: Started at 18th place, finished as regional champion</li>
                  <li><strong>2025</strong>: Consistent top-5 finishes, Spanish champion, European-level competitor</li>
                  <li><strong>Performance trend</strong>: From mid-pack to podium regular in just one year</li>
                </ul>
                
                <p>This wasn't magic. This was showing up every single day, even when progress felt invisible. This was choosing the bike over parties, training over sleeping in, discipline over comfort.</p>

                <h2>Beyond the Bike: Building a Complete Package</h2>
                <p>My journey hasn't just been about racing. I've built a digital presence that reaches over 500,000 monthly views across TikTok, Instagram, and YouTube (@maelmassoutie). I've learned to speak publicly, manage social media, and even do graphic design.</p>
                
                <p>Why? Because being a modern athlete means being a complete package. It means understanding that you're not just a rider—you're a brand, a story, an inspiration to others. Every video, every post, every interaction is another opportunity to show people what's possible when you commit fully to your dreams.</p>

                <h2>What I've Learned: The Real Lessons</h2>
                <p>Looking back from five years old to 16, from my first wobbly trail ride to Spanish Champion and European competitor, here's what this journey has taught me:</p>
                
                <p><strong>Setbacks are setups.</strong> That 18th place finish in March 2024? It didn't define me—it refined me. Every disappointing result became data, every mistake became a lesson.</p>
                
                <p><strong>Consistency beats intensity.</strong> I didn't become a champion through one heroic effort. I became a champion through thousands of ordinary days where I chose discipline over distraction.</p>
                
                <p><strong>The podium is built in the hours no one sees.</strong> For every race result you see, there are hundreds of hours of training, maintenance, recovery, and mental preparation that you don't.</p>
                
                <p><strong>Talent doesn't exist—only work.</strong> People see the championships and think I'm "talented." They don't see the 5am wake-ups, the crashes, the doubts, the days when my body screamed at me to stop but I kept going.</p>

                <h2>What's Next: The Road Ahead</h2>
                <p>This isn't the end of my story; it's just the beginning. At 16, with a Spanish championship, regional titles, and European competition experience under my belt, I'm hungrier than ever. My goal remains crystal clear: to become a professional cyclist.</p>
                
                <p>Every pedal stroke, every race, every sacrifice is a step toward that dream. I'm not chasing talent or waiting for luck. I'm building something real through discipline, day after day.</p>

                <h2>A Message to Young Riders</h2>
                <p>To everyone reading this, especially young riders wondering if they have what it takes: You do. But only if you're willing to give everything.</p>
                
                <p>Stop waiting for the perfect moment, the perfect conditions, the perfect circumstances. Start now. Be disciplined. Be consistent. Be relentless.</p>
                
                <p>When you finish 18th, come back and fight for 4th. When you get 4th, come back and fight for 1st. When you win regionally, fight for national. When you win nationally, take on Europe. Never stop climbing.</p>
                
                <p>The journey from zero to hero isn't a straight line—it's a mountain of effort, a trail of setbacks, and a finish line that keeps moving forward. There will be days when you place 18th and wonder if it's worth it. Trust me: it is. Because that 18th place is where champions are made.</p>
                
                <p>The question isn't whether you have what it takes. The question is: are you willing to do what it takes?</p>
                
                <p>See you on the podium.</p>

                <div className="blog-footer">
                  <hr />
                  <p><em>Mael Massoutie is a 16-year-old Spanish Enduro Champion (2025), Copa de Catalunya Champion (2024-2025), and international DH-Enduro rider from Girona. Follow his journey on social media @maelmassoutie.</em></p>
                  
                  <div className="blog-social">
                    <a href="https://www.instagram.com/maelmassoutie" target="_blank" rel="noopener">
                      <i className="fab fa-instagram"></i> @maelmassoutie
                    </a>
                    <a href="https://www.tiktok.com/@maelmassoutie" target="_blank" rel="noopener">
                      <i className="fab fa-tiktok"></i> TikTok
                    </a>
                    <a href="https://www.youtube.com/@manelic.1" target="_blank" rel="noopener">
                      <i className="fab fa-youtube"></i> YouTube
                    </a>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  )
}

const container = document.getElementById('app')
if (container) {
  const root = createRoot(container)
  root.render(<App />)
}