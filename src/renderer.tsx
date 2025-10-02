import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children }) => {
  return (
    <html lang="es">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Primary SEO Meta Tags */}
        <title>Mael Massoutie - BullRider | Professional Cyclist & Enduro Champion</title>
        <meta name="title" content="Mael Massoutie - BullRider | Professional Cyclist & Enduro Champion" />
        <meta name="description" content="16-year-old professional cyclist Mael Massoutie. Multiple Enduro champion with 500K+ social media views. Available for sponsorships and collaborations." />
        <meta name="keywords" content="Mael Massoutie, BullRider, professional cyclist, enduro champion, cycling, mountain bike, MTB, España, Catalunya, Girona, sponsorship" />
        <meta name="author" content="Mael Massoutie" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://bullrider.pages.dev/" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bullrider.pages.dev/" />
        <meta property="og:title" content="Mael Massoutie - BullRider | Professional Cyclist & Enduro Champion" />
        <meta property="og:description" content="16-year-old professional cyclist Mael Massoutie. Multiple Enduro champion with 500K+ social media views. Available for sponsorships and collaborations." />
        <meta property="og:image" content="https://bullrider.pages.dev/static/og-image.jpg" />
        <meta property="og:site_name" content="BullRider - Mael Massoutie" />
        <meta property="og:locale" content="es_ES" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://bullrider.pages.dev/" />
        <meta property="twitter:title" content="Mael Massoutie - BullRider | Professional Cyclist & Enduro Champion" />
        <meta property="twitter:description" content="16-year-old professional cyclist Mael Massoutie. Multiple Enduro champion with 500K+ social media views. Available for sponsorships and collaborations." />
        <meta property="twitter:image" content="https://bullrider.pages.dev/static/og-image.jpg" />
        
        {/* Favicon */}
        <link rel="icon" type="image/x-icon" href="/static/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png" />
        
        {/* Structured Data - Person Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Mael Massoutie",
            "alternateName": "BullRider",
            "description": "Professional cyclist and Enduro champion from Girona, Spain",
            "birthDate": "2009-01-28",
            "gender": "Male",
            "nationality": "Spanish",
            "jobTitle": "Professional Cyclist",
            "url": "https://bullrider.pages.dev",
            "image": "https://bullrider.pages.dev/static/mael-photo.jpg",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "R. Maria Pare Plaret N9",
              "addressLocality": "Girona",
              "addressCountry": "ES"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "url": "https://bullrider.pages.dev/#contact",
              "contactType": "professional"
            },
            "sameAs": [
              "https://www.instagram.com/maelmassoutie",
              "https://www.tiktok.com/@maelmassoutie",
              "https://www.youtube.com/@maelmassoutie"
            ],
            "award": [
              "Copa de España Enduro Champion 2025",
              "Copa de Catalunya Enduro Champion 2025",
              "Copa de Catalunya Enduro Champion 2024"
            ],
            "knowsLanguage": ["es", "ca", "en"],
            "sport": "Cycling",
            "hasOccupation": {
              "@type": "Occupation",
              "name": "Professional Cyclist",
              "description": "Enduro and downhill mountain bike racing"
            }
          })}
        </script>

        {/* Structured Data - Organization Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "BullRider",
            "url": "https://bullrider.pages.dev",
            "logo": "https://bullrider.pages.dev/static/logo.png",
            "description": "Professional cycling portfolio and personal brand of Mael Massoutie",
            "founder": {
              "@type": "Person",
              "name": "Mael Massoutie"
            },
            "sameAs": [
              "https://www.instagram.com/maelmassoutie",
              "https://www.tiktok.com/@maelmassoutie",
              "https://www.youtube.com/@maelmassoutie"
            ]
          })}
        </script>

        {/* Performance and Analytics */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&family=Montserrat:wght@400;600;700;800&display=swap" rel="stylesheet" />
        
        {/* Stylesheets */}
        <link href="/static/style.css" rel="stylesheet" />
        <link href="/static/cycling-gallery.css" rel="stylesheet" />
        <link href="/static/youtube-videos.css" rel="stylesheet" />
        <link href="/static/latest-blog.css" rel="stylesheet" />
        <link href="/static/race-performance.css" rel="stylesheet" />
        <link href="/static/blog-modal.css" rel="stylesheet" />
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/static/hero-bg.jpg" as="image" />
        <link rel="preload" href="/static/style.css" as="style" />
      </head>
      <body>
        {/* Navigation */}
        <nav className="navbar">
          <div className="nav-container">
            <div className="nav-logo">
              <a href="/">
                <span className="logo-text">Bull<strong>Rider</strong></span>
              </a>
            </div>
            <ul className="nav-menu">
              <li><a href="#about" className="nav-link">About</a></li>
              <li><a href="#achievements" className="nav-link">Achievements</a></li>
              <li><a href="#race-performance" className="nav-link">Performance</a></li>
              <li><a href="#latest-blog" className="nav-link">Latest Blog</a></li>
              <li><a href="#experience" className="nav-link">Experience</a></li>
              <li><a href="#youtube-videos" className="nav-link">Videos</a></li>
              <li><a href="#cycling-gallery" className="nav-link">Gallery</a></li>
              <li><a href="#social-media" className="nav-link">Social Media</a></li>
              <li><a href="#contact" className="nav-link">Contact</a></li>
            </ul>
            <div className="hamburger">
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main>
          {children}
        </main>

        {/* Footer */}
        <footer className="footer">
          <div className="container">
            <div className="footer-content">
              <div className="footer-section">
                <h3>BullRider</h3>
                <p>Professional cycling portfolio of Mael Massoutie</p>
                <div className="footer-social">
                  <a href="https://www.instagram.com/maelmassoutie" target="_blank" rel="noopener" aria-label="Instagram">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="https://www.tiktok.com/@maelmassoutie" target="_blank" rel="noopener" aria-label="TikTok">
                    <i className="fab fa-tiktok"></i>
                  </a>
                  <a href="https://www.youtube.com/@maelmassoutie" target="_blank" rel="noopener" aria-label="YouTube">
                    <i className="fab fa-youtube"></i>
                  </a>
                </div>
              </div>
              <div className="footer-section">
                <h4>Quick Links</h4>
                <ul>
                  <li><a href="#about">About</a></li>
                  <li><a href="#achievements">Achievements</a></li>
                  <li><a href="#race-performance">Performance</a></li>
                  <li><a href="#latest-blog">Latest Blog</a></li>
                  <li><a href="#experience">Experience</a></li>
                  <li><a href="#youtube-videos">Videos</a></li>
                  <li><a href="#cycling-gallery">Gallery</a></li>
                  <li><a href="#contact">Contact</a></li>
                </ul>
              </div>
              <div className="footer-section">
                <h4>Contact Info</h4>
                <p>For inquiries, please use the contact form.</p>
                <p><i className="fas fa-map-marker-alt"></i> Girona, Spain</p>
              </div>
            </div>
            <div className="footer-bottom">
              <p>&copy; 2024 BullRider - Mael Massoutie. All rights reserved.</p>
              <p>Professional cyclist • Enduro Champion • Digital Content Creator</p>
            </div>
          </div>
        </footer>

        {/* JavaScript */}
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script src="/static/app.js"></script>
      </body>
    </html>
  )
})