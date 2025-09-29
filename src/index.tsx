import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'
import { renderer } from './renderer'

const app = new Hono()

// Enable CORS for all routes
app.use('*', cors())

// Serve static files
app.use('/static/*', serveStatic({ root: './public' }))
app.use('/assets/*', serveStatic({ root: './public' }))

// Use renderer middleware
app.use(renderer)

// Main page route
app.get('/', (c) => {
  return c.render(
    <div>
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Mael Massoutie</h1>
          <p className="hero-subtitle">Professional Cyclist • Champion • BullRider</p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">500K+</span>
              <span className="stat-label">Monthly Views</span>
            </div>
            <div className="stat">
              <span className="stat-number">16</span>
              <span className="stat-label">Years Old</span>
            </div>
            <div className="stat">
              <span className="stat-number">Multiple</span>
              <span className="stat-label">Championships</span>
            </div>
          </div>
          <div className="hero-actions">
            <a href="#contact" className="btn-primary">Contact Me</a>
            <a href="#achievements" className="btn-secondary">View Achievements</a>
          </div>
        </div>
        <div className="hero-image">
          <div className="cycling-animation"></div>
        </div>
      </section>

      <section id="about" className="about">
        <div className="container">
          <h2>About Mael</h2>
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
              <span>Instagram</span>
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
                <div className="contact-item">
                  <i className="icon-phone"></i>
                  <span>+34 682 501 701</span>
                </div>
                <div className="contact-item">
                  <i className="icon-location"></i>
                  <span>R. Maria Pare Plaret N9, Girona, Spain</span>
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
                  <textarea id="message" name="message" rows="5" required></textarea>
                </div>
                <button type="submit" className="btn-primary">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
})

// API route for contact form
app.post('/api/contact', async (c) => {
  const formData = await c.req.json()
  
  // In production, you would integrate with email service like SendGrid or Resend
  console.log('Contact form submission:', formData)
  
  return c.json({ 
    success: true, 
    message: 'Thank you for your message. Mael will get back to you soon!' 
  })
})

// Sitemap route for SEO
app.get('/sitemap.xml', (c) => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://bullrider.pages.dev/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://bullrider.pages.dev/#about</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://bullrider.pages.dev/#achievements</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>`

  c.header('Content-Type', 'application/xml')
  return c.text(sitemap)
})

// Robots.txt route for SEO
app.get('/robots.txt', (c) => {
  const robots = `User-agent: *
Allow: /

Sitemap: https://bullrider.pages.dev/sitemap.xml`

  c.header('Content-Type', 'text/plain')
  return c.text(robots)
})

export default app