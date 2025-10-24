// Header scroll effect
let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', function() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Slide up header when scrolling down, slide down when scrolling up
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        header.classList.add('slide-up');
    } else {
        header.classList.remove('slide-up');
    }
    
    lastScrollTop = scrollTop;
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            // Close Bootstrap mobile menu if open
            const navbarToggler = document.querySelector('.navbar-toggler');
            const navbarCollapse = document.querySelector('.navbar-collapse');
            
            if (navbarToggler && navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
            
            // Scroll to section
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll-triggered animations for feature cards
document.addEventListener('DOMContentLoaded', function () {
    // Create Intersection Observer for feature cards
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add delay based on card position
                const delay = index * 150;
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, delay);
                
                // Stop observing this card once animated
                cardObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe all feature cards with data-animate-on-scroll attribute
    const animateCards = document.querySelectorAll('[data-animate-on-scroll]');
    animateCards.forEach(card => {
        cardObserver.observe(card);
    });
});

// Animation for other elements when they come into view
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Observe sections for animation
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Form animations (if we add forms later)
document.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });
});

// Testimonials Carousel
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.testimonials-carousel');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    const cards = document.querySelectorAll('.testimonial-card');
    
    if (!carousel || !prevBtn || !nextBtn || cards.length === 0) return;
    
    let currentIndex = 0;
    const cardWidth = cards[0].offsetWidth;
    const gap = 30; // Gap between cards
    const cardsToShow = window.innerWidth > 992 ? 2 : 1;
    const maxIndex = Math.max(0, cards.length - cardsToShow);
    
    function updateCarousel() {
        const offset = currentIndex * (cardWidth + gap);
        carousel.style.transform = `translateX(-${offset}px)`;
    }
    
    nextBtn.addEventListener('click', () => {
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateCarousel();
        }
    });
    
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            currentIndex = 0;
            updateCarousel();
        }, 250);
    });
    
    // Auto-play carousel (optional)
    let autoPlayInterval = setInterval(() => {
        if (currentIndex < maxIndex) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateCarousel();
    }, 5000);
    
    // Pause auto-play on hover
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoPlayInterval);
    });
    
    carousel.addEventListener('mouseleave', () => {
        autoPlayInterval = setInterval(() => {
            if (currentIndex < maxIndex) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            updateCarousel();
        }, 5000);
    });
});

// Programs Carousel
document.addEventListener('DOMContentLoaded', function() {
    const programsCarousel = document.querySelector('.programs-carousel');
    const programPrevBtn = document.querySelector('.program-prev');
    const programNextBtn = document.querySelector('.program-next');
    const programCards = document.querySelectorAll('.program-card');
    
    if (!programsCarousel || !programPrevBtn || !programNextBtn || programCards.length === 0) return;
    
    let programCurrentIndex = 0;
    
    function getCardsToShow() {
        if (window.innerWidth > 992) return 3;
        if (window.innerWidth > 768) return 2;
        return 1;
    }
    
    function updateProgramsCarousel() {
        const cardWidth = programCards[0].offsetWidth;
        const gap = 30;
        const offset = programCurrentIndex * (cardWidth + gap);
        programsCarousel.style.transform = `translateX(-${offset}px)`;
    }
    
    programNextBtn.addEventListener('click', () => {
        const cardsToShow = getCardsToShow();
        const maxIndex = Math.max(0, programCards.length - cardsToShow);
        if (programCurrentIndex < maxIndex) {
            programCurrentIndex++;
            updateProgramsCarousel();
        }
    });
    
    programPrevBtn.addEventListener('click', () => {
        if (programCurrentIndex > 0) {
            programCurrentIndex--;
            updateProgramsCarousel();
        }
    });
    
    let programResizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(programResizeTimer);
        programResizeTimer = setTimeout(() => {
            programCurrentIndex = 0;
            updateProgramsCarousel();
        }, 250);
    });
});
