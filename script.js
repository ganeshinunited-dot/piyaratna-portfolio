document.addEventListener('DOMContentLoaded', () => {
    
    // Intersection Observer for slide-in and floating animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once visible if you want it to happen only once
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Select all elements that need to animate in
    const floatingElements = document.querySelectorAll('.floating');
    floatingElements.forEach(el => {
        observer.observe(el);
    });

    // Simple Parallax Effect for Background Orbs based on mouse movement (optional enhancement)
    // Disabled on mobile via CSS pointer-events or display:none for performance
    const parallaxBg = document.getElementById('parallax-bg');
    if (parallaxBg && window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth - e.pageX * 2) / 100;
            const y = (window.innerHeight - e.pageY * 2) / 100;

            const orbs = document.querySelectorAll('.orb');
            orbs.forEach((orb, index) => {
                // Different speed for different orbs
                const speed = (index + 1) * 2; 
                orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
            });
        });
    }

    // Rotating Text Effect
    const roles = [
        "Global Youth Leader",
        "International Peace Ambassador",
        "Social Entrepreneur"
    ];
    let roleIndex = 0;
    const rotatingTextEl = document.getElementById('rotating-text');
    
    if (rotatingTextEl) {
        setInterval(() => {
            rotatingTextEl.classList.add('fade-out');
            setTimeout(() => {
                roleIndex = (roleIndex + 1) % roles.length;
                rotatingTextEl.textContent = roles[roleIndex];
                rotatingTextEl.classList.remove('fade-out');
            }, 500); // Wait for fade out (matches CSS transition)
        }, 3000); // Change text every 3 seconds
    }

});
