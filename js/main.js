// Gustav's Main JavaScript
// Handles navigation, hero slider, animations, and interactions

// ===================================
// Header Scroll Effect
// ===================================
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ===================================
// Hero Slider
// ===================================
const heroSlides = document.querySelectorAll('.hero-slide');
const sliderPrev = document.querySelector('.slider-prev');
const sliderNext = document.querySelector('.slider-next');
let currentSlide = 0;
let slideInterval;

function showSlide(index) {
    heroSlides.forEach(slide => slide.classList.remove('active'));
    heroSlides[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % heroSlides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + heroSlides.length) % heroSlides.length;
    showSlide(currentSlide);
}

// Auto-advance slides
function startSlideshow() {
    slideInterval = setInterval(nextSlide, 5000);
}

function stopSlideshow() {
    clearInterval(slideInterval);
}

// Slider controls
if (sliderNext) {
    sliderNext.addEventListener('click', () => {
        stopSlideshow();
        nextSlide();
        startSlideshow();
    });
}

if (sliderPrev) {
    sliderPrev.addEventListener('click', () => {
        stopSlideshow();
        prevSlide();
        startSlideshow();
    });
}

// Start slideshow
startSlideshow();

// Pause on hover
const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroSection.addEventListener('mouseenter', stopSlideshow);
    heroSection.addEventListener('mouseleave', startSlideshow);
}

// ===================================
// Smooth Scrolling
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 100;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Mobile Menu Toggle
// ===================================
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        });
    });
}

// ===================================
// AOS (Animate On Scroll) Init
// ===================================
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 400,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });
}

// ===================================
// Scroll Indicator
// ===================================
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '1';
        }
    });
}

// ===================================
// Intersection Observer for Lazy Loading
// ===================================
const lazyImages = document.querySelectorAll('img[data-src]');

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
} else {
    // Fallback for browsers that don't support IntersectionObserver
    lazyImages.forEach(img => {
        img.src = img.dataset.src;
    });
}

// ===================================
// Form Validation (if contact form exists)
// ===================================
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Add your form submission logic here
        const formData = new FormData(contactForm);

        // Example: Send to backend or show success message
        alert('Thank you for your message! We\'ll get back to you soon.');
        contactForm.reset();
    });
}

// Newsletter form handler
const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = newsletterForm.querySelector('input[type="email"]').value;

        // Show success message
        alert(`Thank you for subscribing! We'll send exclusive offers and updates to ${email}`);
        newsletterForm.reset();
    });
}

// ===================================
// External Link Handling
// ===================================
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.setAttribute('rel', 'noopener noreferrer');
});

// ===================================
// Performance Optimization
// ===================================
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll handler
const debouncedScrollHandler = debounce(() => {
    // Add any additional scroll-based functionality here
}, 100);

window.addEventListener('scroll', debouncedScrollHandler);

// ===================================
// Console Welcome Message
// ===================================
console.log(
    '%cWelcome to Gustav\'s! 🍺',
    'font-size: 20px; font-weight: bold; color: #D4AF37;'
);
console.log(
    '%cBuilt with Bavarian pride in Leavenworth, WA',
    'font-size: 12px; color: #6B1F3A;'
);

// ===================================
// Menu Tabs Logic
// ===================================
const menuTabs = document.querySelectorAll('.menu-tab');
const menuCategories = document.querySelectorAll('.menu-category');

if (menuTabs.length > 0) {
    menuTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and categories
            menuTabs.forEach(t => t.classList.remove('active'));
            menuCategories.forEach(c => c.classList.remove('active'));

            // Add active class to clicked tab and target category
            tab.classList.add('active');
            const targetId = tab.getAttribute('data-target');
            const targetCategory = document.getElementById(targetId);
            if (targetCategory) {
                targetCategory.classList.add('active');
            }
        });
    });
}

// ===================================
// Video Volume Toggle
// ===================================
const volumeToggle = document.getElementById('volume-toggle');
const volumeIcon = document.getElementById('volume-icon');
const heroVideo = document.getElementById('hero-video');

if (volumeToggle && heroVideo) {
    volumeToggle.addEventListener('click', () => {
        heroVideo.muted = !heroVideo.muted;

        if (heroVideo.muted) {
            volumeIcon.classList.remove('fa-volume-up');
            volumeIcon.classList.add('fa-volume-mute');
        } else {
            volumeIcon.classList.remove('fa-volume-mute');
            volumeIcon.classList.add('fa-volume-up');
        }
    });
}
