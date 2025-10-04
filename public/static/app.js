// BullRider - Interactive Functionality
// Professional cycling portfolio for Mael Massoutie

document.addEventListener('DOMContentLoaded', function() {
    
    // === SIDE MENU FUNCTIONALITY ===
    const navLogoTrigger = document.getElementById('nav-logo-trigger');
    const sideMenu = document.getElementById('side-menu');
    const sideMenuClose = document.getElementById('side-menu-close');
    const sideMenuOverlay = document.getElementById('side-menu-overlay');
    const sideMenuLinks = document.querySelectorAll('.side-menu-link');

    // Open side menu when clicking logo
    navLogoTrigger?.addEventListener('click', () => {
        sideMenu?.classList.add('active');
        sideMenuOverlay?.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });

    // Close side menu function
    const closeSideMenu = () => {
        sideMenu?.classList.remove('active');
        sideMenuOverlay?.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore scrolling
    };

    // Close side menu when clicking close button
    sideMenuClose?.addEventListener('click', closeSideMenu);

    // Close side menu when clicking overlay
    sideMenuOverlay?.addEventListener('click', closeSideMenu);

    // Close side menu when clicking on a link
    sideMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeSideMenu();
        });
    });

    // Close side menu with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sideMenu?.classList.contains('active')) {
            closeSideMenu();
        }
    });

    // Prevent body scroll when side menu is open (mobile fix)
    let scrollPosition = 0;
    const preventBodyScroll = () => {
        scrollPosition = window.pageYOffset;
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollPosition}px`;
        document.body.style.width = '100%';
    };
    
    const restoreBodyScroll = () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollPosition);
    };

    // Update open/close functions for mobile
    const originalOpen = navLogoTrigger?.onclick;
    navLogoTrigger?.addEventListener('click', () => {
        preventBodyScroll();
    });

    const originalCloseSideMenu = closeSideMenu;
    const closeSideMenuMobile = () => {
        originalCloseSideMenu();
        restoreBodyScroll();
    };

    // Update all close triggers
    sideMenuClose?.removeEventListener('click', closeSideMenu);
    sideMenuClose?.addEventListener('click', closeSideMenuMobile);
    
    sideMenuOverlay?.removeEventListener('click', closeSideMenu);
    sideMenuOverlay?.addEventListener('click', closeSideMenuMobile);
    
    sideMenuLinks.forEach(link => {
        link.removeEventListener('click', closeSideMenu);
        link.addEventListener('click', closeSideMenuMobile);
    });

    // === SMOOTH SCROLLING ===
    const allNavLinks = document.querySelectorAll('.side-menu-link');
    allNavLinks.forEach(link => {
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
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            try {
                const response = await fetch('/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: new URLSearchParams(formData).toString()
                });
                
                if (response.ok) {
                    // Show success message in the form area
                    const formContainer = contactForm.parentElement;
                    const successMessage = document.createElement('div');
                    successMessage.className = 'form-success-message';
                    successMessage.innerHTML = `
                        <div class="success-icon">✓</div>
                        <h3>Message Sent Successfully!</h3>
                        <p>Thank you for reaching out! Mael will get back to you as soon as possible.</p>
                        <p class="success-note">Your message has been received and will be reviewed shortly.</p>
                    `;
                    
                    // Hide form and show success message
                    contactForm.style.display = 'none';
                    formContainer.appendChild(successMessage);
                    
                    // Reset form and restore after 10 seconds
                    setTimeout(() => {
                        contactForm.reset();
                        contactForm.style.display = 'block';
                        successMessage.remove();
                    }, 10000);
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

    // === EASTER EGG - CYCLING ANIMATION ===
    let clickCount = 0;
    const cyclingAnimation = document.querySelector('.cycling-animation');
    
    // Add subtle hover hint for discoverability
    if (cyclingAnimation) {
        // Add hover effect styles
        if (!document.querySelector('#easter-egg-hint-styles')) {
            const hintStyles = document.createElement('style');
            hintStyles.id = 'easter-egg-hint-styles';
            hintStyles.textContent = `
                .cycling-animation {
                    cursor: pointer;
                    transition: all 0.3s ease;
                    position: relative;
                }
                .cycling-animation:hover {
                    transform: scale(1.05);
                    filter: brightness(1.2) drop-shadow(0 0 20px rgba(93, 173, 226, 0.6));
                }
            `;
            document.head.appendChild(hintStyles);
        }
        
        cyclingAnimation.addEventListener('click', () => {
            clickCount++;
            
            // Visual feedback for each click with pulse effect
            cyclingAnimation.style.transform = 'scale(0.95)';
            setTimeout(() => {
                cyclingAnimation.style.transform = '';
            }, 100);
            
            if (clickCount === 5) {
                // Create cycling animation effect
                const cyclingAnimation = document.createElement('div');
                cyclingAnimation.innerHTML = '🚴‍♂️💨';
                cyclingAnimation.style.cssText = `
                    position: fixed;
                    left: -100px;
                    top: 50%;
                    transform: translateY(-50%);
                    font-size: 4rem;
                    z-index: 10000;
                    animation: cycleAcross 3s ease-in-out forwards;
                `;
                
                // Add cycling animation keyframes
                if (!document.querySelector('#cycling-animation')) {
                    const style = document.createElement('style');
                    style.id = 'cycling-animation';
                    style.textContent = `
                        @keyframes cycleAcross {
                            0% { 
                                left: -100px; 
                                transform: translateY(-50%) rotate(0deg) scale(1);
                                opacity: 1;
                            }
                            20% { 
                                transform: translateY(-50%) rotate(10deg) scale(1.2);
                            }
                            40% { 
                                transform: translateY(-50%) rotate(-10deg) scale(1.2);
                            }
                            60% { 
                                transform: translateY(-50%) rotate(10deg) scale(1.2);
                            }
                            80% { 
                                transform: translateY(-50%) rotate(-10deg) scale(1.2);
                            }
                            100% { 
                                left: calc(100% + 100px); 
                                transform: translateY(-50%) rotate(0deg) scale(1);
                                opacity: 1;
                            }
                        }
                        @keyframes wheelSpin {
                            from { transform: rotate(0deg); }
                            to { transform: rotate(1080deg); }
                        }
                    `;
                    document.head.appendChild(style);
                }
                
                document.body.appendChild(cyclingAnimation);
                setTimeout(() => cyclingAnimation.remove(), 3000);
                
                // Add trail effect
                for (let i = 0; i < 5; i++) {
                    setTimeout(() => {
                        const trail = document.createElement('div');
                        trail.textContent = '💨';
                        trail.style.cssText = `
                            position: fixed;
                            left: ${i * 15}%;
                            top: 50%;
                            transform: translateY(-50%);
                            font-size: 2rem;
                            z-index: 9999;
                            opacity: 0.6;
                            animation: fadeOut 1s ease-out forwards;
                        `;
                        
                        if (!document.querySelector('#trail-animation')) {
                            const trailStyle = document.createElement('style');
                            trailStyle.id = 'trail-animation';
                            trailStyle.textContent = `
                                @keyframes fadeOut {
                                    to { opacity: 0; transform: translateY(-50%) scale(0.5); }
                                }
                            `;
                            document.head.appendChild(trailStyle);
                        }
                        
                        document.body.appendChild(trail);
                        setTimeout(() => trail.remove(), 1000);
                    }, i * 200);
                }
                
                // Full page celebration animation after 1 second
                setTimeout(() => {
                    createFullPageCelebration();
                }, 1000);
                
                clickCount = 0;
            }
        });
    }

    // === FULL PAGE CELEBRATION ANIMATION ===
    function createFullPageCelebration() {
        // Create full-page overlay
        const overlay = document.createElement('div');
        overlay.id = 'celebration-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #2c3e50, #34495e, #5dade2);
            z-index: 999999;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            animation: overlayFadeIn 0.5s ease-out;
        `;
        
        // Create celebration content
        const celebrationContent = document.createElement('div');
        celebrationContent.style.cssText = `
            text-align: center;
            color: white;
            animation: celebrationBounce 1s ease-out;
        `;
        
        celebrationContent.innerHTML = `
            <div style="font-size: 6rem; margin-bottom: 2rem; animation: trophySpin 2s ease-in-out infinite;">
                🏆
            </div>
            <h1 style="font-size: 3rem; margin-bottom: 1rem; font-family: 'Montserrat', sans-serif; text-shadow: 0 0 30px rgba(255,255,255,0.5);">
                BullRider Secret Unlocked!
            </h1>
            <p style="font-size: 1.5rem; margin-bottom: 2rem; opacity: 0.9;">
                Mael appreciates curious visitors! 🚴‍♂️💨
            </p>
            <div style="font-size: 4rem; animation: cyclistRide 2s linear infinite;">
                🚴‍♂️ 🚴‍♂️ 🚴‍♂️
            </div>
        `;
        
        overlay.appendChild(celebrationContent);
        
        // Create confetti effect
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            const emojis = ['🎉', '🎊', '⭐', '✨', '🏆', '🚴‍♂️', '💨', '🔥'];
            confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            confetti.style.cssText = `
                position: absolute;
                top: -50px;
                left: ${Math.random() * 100}%;
                font-size: ${Math.random() * 2 + 1}rem;
                animation: confettiFall ${Math.random() * 3 + 2}s linear infinite;
                animation-delay: ${Math.random() * 2}s;
                opacity: ${Math.random() * 0.5 + 0.5};
            `;
            overlay.appendChild(confetti);
        }
        
        // Add animation styles
        if (!document.querySelector('#celebration-styles')) {
            const celebrationStyles = document.createElement('style');
            celebrationStyles.id = 'celebration-styles';
            celebrationStyles.textContent = `
                @keyframes overlayFadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes overlayFadeOut {
                    from { opacity: 1; }
                    to { opacity: 0; }
                }
                @keyframes celebrationBounce {
                    0%, 100% { transform: scale(1); }
                    25% { transform: scale(0.9); }
                    50% { transform: scale(1.1); }
                    75% { transform: scale(0.95); }
                }
                @keyframes trophySpin {
                    0%, 100% { transform: rotate(-10deg) scale(1); }
                    50% { transform: rotate(10deg) scale(1.2); }
                }
                @keyframes cyclistRide {
                    0% { transform: translateX(-50px); }
                    100% { transform: translateX(50px); }
                }
                @keyframes confettiFall {
                    0% { 
                        transform: translateY(0) rotate(0deg); 
                        opacity: 1;
                    }
                    100% { 
                        transform: translateY(100vh) rotate(360deg); 
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(celebrationStyles);
        }
        
        document.body.appendChild(overlay);
        
        // Fade out and remove after 4 seconds
        setTimeout(() => {
            overlay.style.animation = 'overlayFadeOut 0.5s ease-out';
            setTimeout(() => {
                overlay.remove();
            }, 500);
        }, 4000);
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
                
                // Map of placeholder IDs to actual video URLs or channel
                const videoMap = {
                    'FzXGJtFSG84': 'https://www.youtube.com/watch?v=FzXGJtFSG84',
                    'bernex-blue': 'https://www.youtube.com/@manelic.1/videos',
                    'catalunya-run': 'https://www.youtube.com/@manelic.1/videos',
                    'vallnord': 'https://www.youtube.com/@manelic.1/videos'
                };
                
                const targetUrl = videoMap[videoId] || 'https://www.youtube.com/@manelic.1/videos';
                window.open(targetUrl, '_blank');
                
                // Track video click analytics
                console.log(`🎥 Video Click: ${videoId || 'unknown'} -> ${targetUrl}`);
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