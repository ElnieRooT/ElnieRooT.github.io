document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Loader & Init ---
    window.addEventListener('load', () => {
        setTimeout(() => {
            const loader = document.getElementById('loader');
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
                initGSAPAnimations();
            }, 600);
        }, 1000); // Artificial delay for premium feel
    });

    // --- 2. Particles.js Config ---
    if(document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: { value: 40, density: { enable: true, value_area: 800 } },
                color: { value: ["#ffffff", "#00D084", "#3B82F6"] },
                shape: { type: "circle" },
                opacity: { value: 0.2, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false } },
                size: { value: 3, random: true },
                line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.05, width: 1 },
                move: { enable: true, speed: 1, direction: "none", random: true, straight: false, out_mode: "out", bounce: false }
            },
            interactivity: {
                detect_on: "canvas",
                events: { onhover: { enable: true, mode: "bubble" }, onclick: { enable: false }, resize: true },
                modes: { bubble: { distance: 200, size: 6, duration: 2, opacity: 0.5, speed: 3 } }
            },
            retina_detect: true
        });
    }

    // --- 3. Animations ---
    AOS.init({
        duration: 800,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic'
    });

    function initGSAPAnimations() {
        gsap.fromTo('.gs-reveal', 
            { y: 50, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out" }
        );
    }

    // --- 4. Scroll UI (Progress bar, Navbar, Back to Top) ---
    const progressBar = document.getElementById('scroll-progress');
    const navbar = document.querySelector('.navbar');
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        // Progress Bar
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';

        // Navbar blur intensity
        if (winScroll > 50) {
            navbar.style.background = 'rgba(5, 5, 5, 0.9)';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.background = 'rgba(5, 5, 5, 0.7)';
            navbar.style.boxShadow = 'none';
        }

        // Back to top visibility
        if (winScroll > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --- 5. Statistic Counter Animation ---
    const counters = document.querySelectorAll('.stat-counter');
    const speed = 100;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                
                const updateCount = () => {
                    const count = +counter.innerText;
                    const inc = target / speed;
                    if (count < target) {
                        counter.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 15);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCount();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));

    // --- 6. Compatibility Checker Form Logic ---
    const checkerForm = document.getElementById('checker-form');
    const checkerResult = document.getElementById('checker-result');

    if(checkerForm) {
        checkerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = checkerForm.querySelector('button');
            const originalText = btn.innerText;
            
            // Simulate processing
            btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Checking Data...';
            btn.disabled = true;

            setTimeout(() => {
                checkerForm.style.display = 'none';
                checkerResult.classList.remove('d-none');
                
                // Add tiny animation to result
                gsap.fromTo(checkerResult, {scale: 0.8, opacity: 0}, {scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)"});
            }, 1500);
        });
    }
});
