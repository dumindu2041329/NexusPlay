// ===== DOM Elements =====
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const filterBtns = document.querySelectorAll('.filter-btn');
const gameCards = document.querySelectorAll('.game-card');
const testimonialCards = document.querySelectorAll('.testimonial-card');
const carouselDots = document.querySelectorAll('.dot');
const newsletterForm = document.getElementById('newsletterForm');
const formMessage = document.getElementById('formMessage');
const particles = document.getElementById('particles');
const backToTopBtn = document.getElementById('backToTop');

// ===== Navbar Scroll Effect & Back To Top Visibility =====
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    if (backToTopBtn) {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    }
});

// ===== Mobile Navigation =====
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile nav when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ===== Smooth Scroll for Navigation Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Active Navigation Link on Scroll =====
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active');
            } else {
                navLink.classList.remove('active');
            }
        }
    });
});

// ===== Animated Counter =====
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    });
};

// ===== Intersection Observer for Animations =====
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-on-scroll');
            
            // Trigger counter animation when hero stats are visible
            if (entry.target.classList.contains('hero-stats')) {
                animateCounters();
            }
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.game-card, .feature-card, .tournament-card, .pricing-card, .hero-stats').forEach(el => {
    observer.observe(el);
});

// ===== Games Filter =====
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        gameCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ===== Testimonials Carousel =====
let currentTestimonial = 0;
const totalTestimonials = testimonialCards.length;

const showTestimonial = (index) => {
    testimonialCards.forEach((card, i) => {
        card.classList.remove('active');
        carouselDots[i].classList.remove('active');
    });
    
    testimonialCards[index].classList.add('active');
    carouselDots[index].classList.add('active');
};

const nextTestimonial = () => {
    currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
    showTestimonial(currentTestimonial);
};

// Auto-rotate testimonials
setInterval(nextTestimonial, 5000);

// Click on dots to navigate
carouselDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentTestimonial = index;
        showTestimonial(currentTestimonial);
    });
});

// ===== Countdown Timer =====
const countdownDate = new Date('2024-12-15T00:00:00').getTime();

const updateCountdown = () => {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');

    if (distance < 0) {
        clearInterval(countdownInterval);
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
    }
};

const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();

// ===== Newsletter Form =====
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input[type="email"]').value;
    
    // Simulate form submission
    formMessage.textContent = 'Subscribing...';
    formMessage.className = 'form-message';
    
    setTimeout(() => {
        formMessage.textContent = '🎮 Welcome to the game! Check your email for exclusive rewards.';
        formMessage.className = 'form-message success';
        newsletterForm.reset();
        
        // Clear message after 5 seconds
        setTimeout(() => {
            formMessage.textContent = '';
        }, 5000);
    }, 1500);
});

// ===== Particle Animation =====
const createParticles = () => {
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particles.appendChild(particle);
    }
};

createParticles();

// ===== Back To Top Button Click (Slow Scroll) =====
const smoothScrollToTop = (duration = 1500) => {
    const startY = window.scrollY || window.pageYOffset;
    const startTime = performance.now();

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = easeOutCubic(progress);
        const newY = startY * (1 - ease);

        window.scrollTo(0, newY);

        if (elapsed < duration) {
            requestAnimationFrame(animate);
        }
    };

    requestAnimationFrame(animate);
};

if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        smoothScrollToTop(1500); // 1.5s slow scroll
    });
}

// ===== Parallax Effect on Mouse Move =====
const heroVisual = document.querySelector('.hero-visual');
const floatingCards = document.querySelectorAll('.float-card');

document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;

    floatingCards.forEach((card, index) => {
        const speed = (index + 1) * 10;
        const x = mouseX * speed;
        const y = mouseY * speed;
        card.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// ===== Typing Effect for Hero Title =====
const typeWriter = (element, text, speed = 100) => {
    let i = 0;
    element.textContent = '';
    
    const type = () => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    };
    
    type();
};

// ===== Glow Effect on Buttons =====
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        btn.style.setProperty('--x', `${x}px`);
        btn.style.setProperty('--y', `${y}px`);
    });
});

// ===== Lazy Loading Images =====
const lazyImages = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// ===== Tilt Effect on Game Cards =====
const tiltCards = document.querySelectorAll('.game-card, .pricing-card');

tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===== Sound Effects (Optional - requires audio files) =====
const playHoverSound = () => {
    // Uncomment and add sound file for hover effects
    // const audio = new Audio('hover.mp3');
    // audio.volume = 0.1;
    // audio.play();
};

document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', playHoverSound);
});

// ===== Console Easter Egg =====
console.log('%c🎮 NEXUSPLAY', 'font-size: 40px; font-weight: bold; color: #00f0ff; text-shadow: 0 0 10px #00f0ff;');
console.log('%cWelcome, gamer! Ready to dominate?', 'font-size: 14px; color: #a0a0b0;');

// ===== Preloader (Optional) =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Initialize animations after load
    setTimeout(() => {
        document.querySelectorAll('.hero-content > *').forEach((el, index) => {
            el.style.animation = `fadeInUp 0.6s ease forwards ${index * 0.1}s`;
        });
    }, 100);
});

// ===== Keyboard Navigation =====
document.addEventListener('keydown', (e) => {
    // Press 'Escape' to close mobile nav
    if (e.key === 'Escape') {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// ===== Performance Optimization =====
// Debounce scroll events
const debounce = (func, wait = 10) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Throttle mouse events
const throttle = (func, limit = 100) => {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    // Add loaded class for animations
    document.body.classList.add('dom-loaded');
    
    // Initialize tooltips, modals, or other components here
    console.log('NexusPlay initialized successfully! 🎮');
});
