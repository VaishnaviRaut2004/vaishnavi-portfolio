// Run when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {

    // Setup handled by Vercel Serverless Function (Nodemailer)

    // 1. Loader removal
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 500);
        }
    }, 1000); // adjust time as needed

    // 2. Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        once: false,
        offset: 100,
    });

    // 3. Initialize Typed.js
    if (document.getElementById('typed')) {
        new Typed('#typed', {
            strings: [
                'AI/ML Enthusiast', 
                'Software Developer', 
                'Tech Explorer',
                'Problem Solver'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 1500,
            loop: true
        });
    }

    // 4. Initialize Particles.js
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 40,
                    "density": { "enable": true, "value_area": 800 }
                },
                "color": { "value": "#6366f1" },
                "shape": {
                    "type": "circle",
                },
                "opacity": {
                    "value": 0.3,
                    "random": true,
                },
                "size": {
                    "value": 3,
                    "random": true,
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#6366f1",
                    "opacity": 0.2,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": { "enable": true, "mode": "grab" },
                    "onclick": { "enable": true, "mode": "push" },
                    "resize": true
                },
                "modes": {
                    "grab": { "distance": 140, "line_linked": { "opacity": 1 } },
                    "push": { "particles_nb": 4 }
                }
            },
            "retina_detect": true
        });
    }

    // 5. Dark Mode Toggle
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    
    // Check local storage or system preference
    if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        htmlElement.classList.add('dark');
    } else {
        htmlElement.classList.remove('dark');
    }

    themeToggleBtn.addEventListener('click', function() {
        if (htmlElement.classList.contains('dark')) {
            htmlElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
            updateParticlesColor('#6366f1'); // Primary color for light mode
        } else {
            htmlElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
            updateParticlesColor('#ffffff'); // White for dark mode
        }
    });

    // Function to update particles color dynamically
    function updateParticlesColor(color) {
        if(window.pJSDom && window.pJSDom.length > 0) {
            const pJS = window.pJSDom[0].pJS;
            pJS.particles.color.value = color;
            pJS.particles.line_linked.color = color;
            pJS.fn.particlesRefresh();
        }
    }

    // Initialize particle color based on theme
    setTimeout(() => {
        if (htmlElement.classList.contains('dark')) {
            updateParticlesColor('#ffffff');
        }
    }, 500);

    // 6. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    function toggleMenu() {
        mobileMenu.classList.toggle('hidden');
        // small timeout to allow display block to apply before transform
        setTimeout(() => {
            mobileMenu.classList.toggle('translate-x-full');
        }, 10);
    }

    mobileMenuBtn.addEventListener('click', toggleMenu);
    closeMenuBtn.addEventListener('click', toggleMenu);
    mobileLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    // 7. Scroll Progress Bar
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        document.getElementById('scroll-progress').style.width = scrolled + '%';

        // Navbar blur effect on scroll
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('py-2');
            navbar.classList.remove('py-4');
        } else {
            navbar.classList.add('py-4');
            navbar.classList.remove('py-2');
        }

        // Active link highlighting
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // 8. Scroll to Top
    document.getElementById('scrollToTop').addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 9. Form Submission Hook
    const form = document.getElementById("contact-form");

    if (form) {
      form.addEventListener("submit", async function (e) {
        e.preventDefault();

        console.log("FORM SUBMITTED");

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !message) {
          alert("Please fill all fields");
          return;
        }

        try {
          const response = await fetch("/api/contact", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, message })
          });

          const data = await response.json();
          console.log("RESPONSE:", data);

          if (response.ok) {
            alert("✅ Message sent successfully!");
            form.reset();
          } else {
            alert("❌ Failed: " + data.message);
          }
        } catch (error) {
          console.error("ERROR:", error);
          alert("❌ Failed to send message");
        }
      });
    }

    // 10. Hide Resume if not found
    const resumeBtn = document.getElementById('resume-btn');
    if (resumeBtn) {
        fetch('resume.pdf', { method: 'HEAD' })
            .then(res => {
                if (!res.ok) resumeBtn.style.display = 'none';
            })
            .catch(() => {
                // If fetch fails (e.g. CORS on local files or network error), hide the button
                resumeBtn.style.display = 'none';
            });
    }
});
