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

    // --- Secure Representative Injection ---
    const secureInjected = {
        done: false,
        mouseMoved: false,
        // \u8463\u6ca2\u7adc (董沢竜) split to prevent static analysis
        codes: [33891, 27810, 31452], // 董沢竜

        init() {
            const anchor = document.getElementById('rep-security-anchor');
            if (!anchor) return;

            // 1. Anti-bot: Track mouse movement
            window.addEventListener('mousemove', () => { this.mouseMoved = true; }, { once: true });

            // 2. Delayed Rendering: IntersectionObserver
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !this.done) {
                        this.tryInject(anchor);
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(anchor);
        },

        isBot() {
            // Anti-bot detection layer
            const isHeadless = /HeadlessChrome|bot|crawler|spider|slurp|facebookexternalhit/i.test(navigator.userAgent);
            const isDriver = navigator.webdriver;
            return isHeadless || isDriver;
        },

        tryInject(anchor) {
            // Check bot status + mouse movement
            if (this.isBot()) return; // Abort injection if bot detected

            if (!this.mouseMoved) {
                // If no mouse movement, wait for interaction (another anti-bot layer)
                window.addEventListener('mousemove', () => {
                    this.mouseMoved = true;
                    this.tryInject(anchor);
                }, { once: true });
                return;
            }

            this.done = true;
            this.render(anchor);
        },

        render(anchor) {
            // 3. Prevent DOM scraping: Shadow DOM
            const shadow = anchor.attachShadow({ mode: 'closed' });

            // 4. Prevent text scraping: Canvas
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            // Minimal styling for canvas
            const name = String.fromCharCode(...this.codes);
            const fontSize = 16;
            const fontStack = "'Noto Serif JP', serif";

            // Adjust for high DPI
            const dpr = window.devicePixelRatio || 1;
            canvas.width = 160 * dpr;
            canvas.height = 30 * dpr;
            canvas.style.width = '160px';
            canvas.style.height = '30px';
            ctx.scale(dpr, dpr);

            // Render text
            ctx.fillStyle = '#222222';
            ctx.font = `400 ${fontSize}px ${fontStack}`;
            ctx.textBaseline = 'middle';
            // Split names for better visual fidelity
            const spaceName = name.slice(0, 2) + " " + name.slice(2);
            ctx.fillText(spaceName, 0, 15);

            // Shadow DOM helps hide from search engines/simple scrapers
            shadow.appendChild(canvas);
        }
    };

    secureInjected.init();

    // Scroll to Top functionality
    const scrollTopBtn = document.getElementById('scroll-top');

    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                scrollTopBtn.classList.add('is-visible');
            } else {
                scrollTopBtn.classList.remove('is-visible');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
