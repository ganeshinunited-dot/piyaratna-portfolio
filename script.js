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
