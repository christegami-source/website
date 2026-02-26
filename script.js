document.addEventListener('DOMContentLoaded', () => {
    
    // Header Scroll Effect
    const header = document.querySelector('.js-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.js-mobile-menu-btn');
    const globalNav = document.querySelector('.global-nav');
    
    if (mobileMenuBtn && globalNav) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('is-open');
            globalNav.classList.toggle('is-open');
            // Prevent body scroll when menu is open
            document.body.style.overflow = globalNav.classList.contains('is-open') ? 'hidden' : '';
        });

        // Close menu when clicking a link
        const navLinks = globalNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('is-open');
                globalNav.classList.remove('is-open');
                document.body.style.overflow = '';
            });
        });
    }

    // Scroll Animation Observer Setup
    const animationElements = document.querySelectorAll('.js-scroll-animation');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animationElements.forEach(el => {
        scrollObserver.observe(el);
    });
});
