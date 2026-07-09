// Salma Café - Landing Page JavaScript
// Interactividad, animaciones y funcionalidad

document.addEventListener('DOMContentLoaded', () => {
    // ============================================
    // HEADER SCROLL EFFECT
    // ============================================
    const header = document.getElementById('header');
    
    const handleHeaderScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleHeaderScroll);
    handleHeaderScroll(); // Check on load
    
    // ============================================
    // MOBILE NAVIGATION
    // ============================================
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobileNav');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav__link, .mobile-nav__cta');
    
    const toggleMobileNav = () => {
        hamburger.classList.toggle('active');
        mobileNav.classList.toggle('active');
        document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    };
    
    hamburger.addEventListener('click', toggleMobileNav);
    
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileNav.classList.contains('active')) {
                toggleMobileNav();
            }
        });
    });
    
    // ============================================
    // MENU TABS
    // ============================================
    const menuTabs = document.querySelectorAll('.menu__tab');
    const menuCategories = document.querySelectorAll('.menu__category');
    
    menuTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.getAttribute('data-tab');
            
            // Update active tab
            menuTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Update active category
            menuCategories.forEach(category => {
                category.classList.remove('active');
                if (category.id === targetTab) {
                    category.classList.add('active');
                    
                    // Animate items in
                    const items = category.querySelectorAll('.menu__item');
                    items.forEach((item, index) => {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                            item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                        }, index * 50);
                    });
                }
            });
        });
    });
    
    // ============================================
    // INTERSECTION OBSERVER - SCROLL ANIMATIONS
    // ============================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Stagger animation for grid items
                const staggerDelay = entry.target.closest('.diferenciales__grid, .testimonios__grid, .momentos__grid');
                if (staggerDelay) {
                    const siblings = Array.from(staggerDelay.children);
                    const index = siblings.indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                }
            }
        });
    }, observerOptions);
    
    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        fadeInObserver.observe(el);
    });
    
    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ============================================
    // FORM TO WHATSAPP
    // ============================================
    const contactForm = document.getElementById('contactForm');
    const whatsappNumber = '5491158506004';
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nombre = document.getElementById('nombre').value;
            const telefono = document.getElementById('telefono').value;
            const motivo = document.getElementById('motivo').value;
            const mensaje = document.getElementById('mensaje').value;
            
            // Build WhatsApp message
            let whatsappMessage = `Hola! Soy ${nombre}.`;
            
            if (motivo) {
                const motivoText = {
                    'reserva': 'Quiero reservar una mesa',
                    'consulta': 'Tengo una consulta',
                    'evento': 'Quiero organizar un evento',
                    'otro': 'Otra consulta'
                };
                whatsappMessage += ` ${motivoText[motivo] || motivo}.`;
            }
            
            if (mensaje) {
                whatsappMessage += ` ${mensaje}`;
            }
            
            whatsappMessage += ` (Mi teléfono: ${telefono})`;
            
            // Encode message
            const encodedMessage = encodeURIComponent(whatsappMessage);
            
            // Open WhatsApp
            window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
            
            // Reset form
            contactForm.reset();
            
            // Show success feedback
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<span>✓ ¡Mensaje enviado!</span>';
            btn.style.backgroundColor = '#25D366';
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.backgroundColor = '';
            }, 3000);
        });
    }
    
    // ============================================
    // GALLERY HOVER EFFECTS
    // ============================================
    const galleryItems = document.querySelectorAll('.galeria__item');
    
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.zIndex = '10';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.zIndex = '';
        });
    });
    
    // ============================================
    // PARALLAX EFFECT FOR HERO
    // ============================================
    const heroImg = document.querySelector('.hero__img');
    
    if (heroImg) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            if (scrolled < window.innerHeight) {
                heroImg.style.transform = `scale(1.05) translateY(${scrolled * 0.3}px)`;
            }
        });
    }
    
    // ============================================
    // COUNTER ANIMATION FOR STATS
    // ============================================
    const animateCounter = (element, target, duration = 2000) => {
        let start = 0;
        const increment = target / (duration / 16);
        
        const updateCounter = () => {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };
        
        updateCounter();
    };
    
    // Observe stats section
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.estrella__detail-number');
                statNumbers.forEach(stat => {
                    const text = stat.textContent;
                    if (text.includes('h')) {
                        // 24h - keep as is
                    } else if (text.includes('%')) {
                        // 100% - keep as is
                    } else if (text.includes('°')) {
                        // 75° - keep as is
                    }
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const estrellaDetails = document.querySelector('.estrella__details');
    if (estrellaDetails) {
        statsObserver.observe(estrellaDetails);
    }
    
    // ============================================
    // ACTIVE NAV LINK ON SCROLL
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    
    const highlightNavLink = () => {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };
    
    window.addEventListener('scroll', highlightNavLink);
    
    // ============================================
    // MENU ITEM HOVER SOUND EFFECT (OPTIONAL)
    // ============================================
    // Uncomment if you want subtle hover effects
    // const menuItems = document.querySelectorAll('.menu__item');
    // menuItems.forEach(item => {
    //     item.addEventListener('mouseenter', () => {
    //         item.style.transform = 'translateY(-4px) scale(1.02)';
    //     });
    //     item.addEventListener('mouseleave', () => {
    //         item.style.transform = '';
    //     });
    // });
    
    // ============================================
    // SCROLL PROGRESS INDICATOR
    // ============================================
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, var(--terracotta), var(--mustard));
        z-index: 1001;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = `${scrollPercent}%`;
    });
    
    // ============================================
    // LAZY LOAD IMAGES
    // ============================================
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '100px'
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // ============================================
    // KEYBOARD ACCESSIBILITY
    // ============================================
    document.addEventListener('keydown', (e) => {
        // Close mobile nav with Escape key
        if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
            toggleMobileNav();
        }
    });
    
    // ============================================
    // PERFORMANCE: THROTTLE SCROLL EVENTS
    // ============================================
    let ticking = false;
    
    const throttledScroll = () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleHeaderScroll();
                highlightNavLink();
                ticking = false;
            });
            ticking = true;
        }
    };
    
    // Replace scroll listeners with throttled version
    window.removeEventListener('scroll', handleHeaderScroll);
    window.removeEventListener('scroll', highlightNavLink);
    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    // ============================================
    // INITIALIZE
    // ============================================
    console.log('☕ Salma Café - Landing Page loaded successfully');
    
    // Trigger initial animations after a short delay
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});