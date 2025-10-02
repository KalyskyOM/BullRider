// BullRider - Interactive Functionality
// Professional cycling portfolio for Mael Massoutie

document.addEventListener('DOMContentLoaded', function() {
    
    // === NAVIGATION FUNCTIONALITY ===
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    hamburger?.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu?.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu?.classList.remove('active');
        });
    });

    // === SMOOTH SCROLLING ===
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // === NAVBAR SCROLL EFFECT ===
  const navbar = document.querySelector('.navbar');
  let lastScrollTop = 0;

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add/remove scrolled class for styling
    if (scrollTop > 100) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    // Hide/show navbar on scroll (only if navbar exists)
    if (navbar) {
      if (scrollTop > lastScrollTop && scrollTop > 200) {
        navbar.style.transform = 'translateY(-100%)';
      } else {
        navbar.style.transform = 'translateY(0)';
      }
    }
    
    lastScrollTop = scrollTop;
  });

    // === SCROLL ANIMATIONS ===
  const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
  };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add scroll animation to sections
    const animatedElements = document.querySelectorAll('section, .achievement, .job, .social-stat');
    animatedElements.forEach(el => {
        el.classList.add('scroll-animate');
        observer.observe(el);
    });

    // === TYPING ANIMATION FOR HERO ===
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        const words = ['Professional Cyclist', 'Enduro Champion', 'BullRider', 'Content Creator'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeWriter() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                heroSubtitle.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                heroSubtitle.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                setTimeout(() => isDeleting = true, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
            }

            const typingSpeed = isDeleting ? 100 : 150;
            setTimeout(typeWriter, typingSpeed);
        }

        // Start typing animation after 2 seconds
        setTimeout(() => {
            heroSubtitle.textContent = '';
            typeWriter();
        }, 2000);
    }

    // === CONTACT FORM HANDLING ===
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            try {
                const response = await axios.post('/api/contact', data);
                
                if (response.data.success) {
                    showNotification('Message sent successfully! Mael will get back to you soon.', 'success');
                    contactForm.reset();
                } else {
                    throw new Error('Failed to send message');
                }
            } catch (error) {
                console.error('Contact form error:', error);
                showNotification('Sorry, there was an error sending your message. Please try again later.', 'error');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    // === NOTIFICATION SYSTEM ===
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

        document.body.appendChild(notification);

        // Add styles if not already present
        if (!document.querySelector('#notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'notification-styles';
            styles.textContent = `
                .notification {
                    position: fixed;
                    top: 100px;
                    right: 20px;
                    z-index: 10000;
                    padding: 1rem 1.5rem;
                    border-radius: 8px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                    transform: translateX(400px);
                    transition: transform 0.3s ease;
                    max-width: 400px;
                }
                .notification-success { background: #27ae60; color: white; }
                .notification-error { background: #e74c3c; color: white; }
                .notification-info { background: #3498db; color: white; }
                .notification.show { transform: translateX(0); }
                .notification-content { display: flex; align-items: center; justify-content: space-between; }
                .notification-close { 
                    background: none; 
                    border: none; 
                    color: inherit; 
                    font-size: 1.5rem; 
                    cursor: pointer; 
                    margin-left: 1rem;
                }
            `;
            document.head.appendChild(styles);
        }

        // Show notification
        setTimeout(() => notification.classList.add('show'), 100);

        // Auto hide after 5 seconds
        const autoHide = setTimeout(() => hideNotification(notification), 5000);

        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            clearTimeout(autoHide);
            hideNotification(notification);
        });

        function hideNotification(notif) {
            notif.classList.remove('show');
            setTimeout(() => notif.remove(), 300);
        }
    }

    // === PERFORMANCE MONITORING ===
    function trackPerformance() {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                const perfData = performance.getEntriesByType('navigation')[0];
                if (perfData) {
                    console.log('🚀 BullRider Performance Metrics:');
                    console.log(`📊 Page Load Time: ${Math.round(perfData.loadEventEnd - perfData.fetchStart)}ms`);
                    console.log(`🔄 DNS Lookup: ${Math.round(perfData.domainLookupEnd - perfData.domainLookupStart)}ms`);
                    console.log(`📡 Server Response: ${Math.round(perfData.responseEnd - perfData.requestStart)}ms`);
                    console.log(`🎨 DOM Content Loaded: ${Math.round(perfData.domContentLoadedEventEnd - perfData.fetchStart)}ms`);
                }
            });
        }
    }

    // === SOCIAL MEDIA ANALYTICS ===
    function trackSocialClicks() {
        const socialLinks = document.querySelectorAll('.social-link, .footer-social a');
        
        socialLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const platform = link.href.includes('instagram') ? 'Instagram' : 
                               link.href.includes('tiktok') ? 'TikTok' : 
                               link.href.includes('youtube') ? 'YouTube' : 'Unknown';
                
                console.log(`🔗 Social Media Click: ${platform}`);
                
                // Here you could integrate with analytics services
                // gtag('event', 'social_click', { platform: platform });
            });
        });
    }

    // === EASTER EGG - CYCLING SOUND EFFECTS ===
    let clickCount = 0;
    const heroTitle = document.querySelector('.hero-title');
    
    if (heroTitle) {
        heroTitle.addEventListener('click', () => {
            clickCount++;
            
            if (clickCount === 5) {
                // Create cycling sound effect (visual representation)
                const soundEffect = document.createElement('div');
                soundEffect.textContent = '🚴‍♂️💨 WHOOSH!';
                soundEffect.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    font-size: 3rem;
                    z-index: 10000;
                    animation: whoosh 2s ease-out forwards;
                `;
                
                // Add animation keyframes
                if (!document.querySelector('#whoosh-animation')) {
                    const style = document.createElement('style');
                    style.id = 'whoosh-animation';
                    style.textContent = `
                        @keyframes whoosh {
                            0% { transform: translate(-50%, -50%) scale(0) rotate(0deg); opacity: 1; }
                            50% { transform: translate(-50%, -50%) scale(1.2) rotate(180deg); opacity: 0.8; }
                            100% { transform: translate(-50%, -50%) scale(0) rotate(360deg); opacity: 0; }
                        }
                    `;
                    document.head.appendChild(style);
                }
                
                document.body.appendChild(soundEffect);
                setTimeout(() => soundEffect.remove(), 2000);
                
                showNotification('🏆 You found the BullRider secret! Mael appreciates curious visitors!', 'success');
                clickCount = 0;
            }
        });
    }

    // === LAZY LOADING FOR IMAGES ===
    function initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for older browsers
            images.forEach(img => {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
            });
        }
    }

    // === YOUTUBE VIDEO FUNCTIONALITY ===
    function initYouTubeVideos() {
        const videoItems = document.querySelectorAll('.video-item');
        
        videoItems.forEach(item => {
            item.addEventListener('click', () => {
                const thumbnail = item.querySelector('.video-thumbnail');
                const videoId = thumbnail.dataset.video;
                
                if (videoId && videoId !== 'bernex-blue' && videoId !== 'catalunya-run' && videoId !== 'vallnord') {
                    // Open actual YouTube video
                    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
                } else {
                    // For placeholder videos, redirect to channel
                    window.open('https://www.youtube.com/@manelic.1', '_blank');
                }
                
                // Track video click analytics
                console.log(`🎥 Video Click: ${videoId || 'placeholder'}`);
            });
        });

        // YouTube Shorts clicks
        const shortItems = document.querySelectorAll('.short-item');
        shortItems.forEach(item => {
            item.addEventListener('click', () => {
                window.open('https://www.youtube.com/@manelic.1', '_blank');
                console.log('📱 YouTube Short clicked');
            });
        });
    }

    // === SUBSCRIBE BUTTON TRACKING ===
    function trackYouTubeSubscriptions() {
        const subscribeButtons = document.querySelectorAll('a[href*="youtube.com/@manelic.1"]');
        
        subscribeButtons.forEach(button => {
            button.addEventListener('click', () => {
                console.log('🔔 YouTube Subscribe button clicked');
                // Here you could integrate with analytics
                // gtag('event', 'subscribe_click', { platform: 'youtube' });
            });
        });
    }

    // === HERO VIDEO STATS UPDATE ===
    function updateVideoStats() {
        // This could be connected to YouTube API for real-time stats
        const stats = {
            videos: 7,
            totalViews: 3400, // Sum of all video views
            subscribers: 14
        };

        console.log('📊 Current YouTube Stats:', stats);
    }

    // === BLOG MODAL FUNCTIONALITY ===
    function initBlogModal() {
        const heroGalleryItem = document.getElementById('hero-story-gallery');
        const blogPreviewBtn = document.getElementById('blog-preview-read');
        const blogModal = document.getElementById('blog-modal');
        const modalClose = document.querySelector('.modal-close');
        
        // Function to open the modal
        const openModal = () => {
            blogModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
            console.log('📖 Blog modal opened: From Zero to Hero story');
        };
        
        if (blogModal) {
            // Open modal when clicking on the "From Zero to Hero" gallery item
            if (heroGalleryItem) {
                heroGalleryItem.addEventListener('click', openModal);
            }
            
            // Open modal when clicking on the blog preview button
            if (blogPreviewBtn) {
                blogPreviewBtn.addEventListener('click', openModal);
            }
            
            // Close modal when clicking the X button
            if (modalClose) {
                modalClose.addEventListener('click', () => {
                    blogModal.classList.remove('active');
                    document.body.style.overflow = 'auto'; // Restore scrolling
                    console.log('📖 Blog modal closed');
                });
            }
            
            // Close modal when clicking outside the content
            blogModal.addEventListener('click', (e) => {
                if (e.target === blogModal) {
                    blogModal.classList.remove('active');
                    document.body.style.overflow = 'auto';
                    console.log('📖 Blog modal closed (clicked outside)');
                }
            });
            
            // Close modal with Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && blogModal.classList.contains('active')) {
                    blogModal.classList.remove('active');
                    document.body.style.overflow = 'auto';
                    console.log('📖 Blog modal closed (Escape key)');
                }
            });
        }
    }

    // === INITIALIZE ALL FEATURES ===
    trackPerformance();
    trackSocialClicks();
    initLazyLoading();
    initYouTubeVideos();
    trackYouTubeSubscriptions();
    updateVideoStats();
    initBlogModal();

    // Add loading animation
    document.body.classList.add('loading');

    // Console welcome message
    console.log(`
🚴‍♂️ Welcome to BullRider - Mael Massoutie's Professional Portfolio!

🏆 Achievement Stats:
- Multiple Enduro Championships
- 500K+ Monthly Social Media Views
- Professional Cyclist at Age 16

🔧 Technical Details:
- Built with Hono Framework
- Deployed on Cloudflare Pages
- SEO Optimized & Mobile Responsive

📞 Contact: Please use the contact form at /#contact
🌐 Follow: @maelmassoutie on all platforms

Developed with ❤️ for cycling excellence.
    `);
});

// === EXTERNAL API INTEGRATIONS ===

// Weather Widget (for cycling conditions)
async function loadWeatherWidget() {
    try {
        // This would integrate with a weather API for Girona, Spain
        // For demo purposes, showing static content
        const weatherContainer = document.querySelector('#weather-widget');
        if (weatherContainer) {
            weatherContainer.innerHTML = `
                <div class="weather-info">
                    <h4>🌤️ Cycling Conditions in Girona</h4>
                    <p>Perfect for training today!</p>
                </div>
            `;
        }
    } catch (error) {
        console.log('Weather widget unavailable');
    }
}

// Social Media Feed Integration
async function loadSocialFeed() {
    try {
        // This would integrate with social media APIs
        // For demo purposes, showing placeholder
        const feedContainer = document.querySelector('#social-feed');
        if (feedContainer) {
            feedContainer.innerHTML = `
                <div class="feed-placeholder">
                    <p>🎥 Latest from @maelmassoutie</p>
                    <p>Follow for daily cycling content!</p>
                </div>
            `;
        }
    } catch (error) {
        console.log('Social feed unavailable');
    }
}

// Initialize external widgets
setTimeout(() => {
    loadWeatherWidget();
    loadSocialFeed();
}, 2000);

// === SERVICE WORKER REGISTRATION (PWA) ===
// Register SW only on production host to avoid dev errors
if ('serviceWorker' in navigator && /netlify\.app$/.test(location.hostname)) {
  window.addEventListener('load', async () => {
    try {
      const res = await fetch('/sw.js', { method: 'HEAD' });
      if (res.ok) {
        await navigator.serviceWorker.register('/sw.js');
        console.log('🔧 Service Worker registered successfully');
      } else {
        // sw.js missing; skip registration silently
      }
    } catch (e) {
      // Network or other error; skip registering to avoid noisy logs
    }
  });
}