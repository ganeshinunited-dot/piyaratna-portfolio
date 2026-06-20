document.addEventListener('DOMContentLoaded', () => {
    
    // १. Premium Scroll Animations (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px', // स्क्रिनमा अलिकति देखिने बित्तिकै सुरु हुन
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // HTML मा 'floating', 'reveal' वा 'slide-in' जे भए पनि काम गर्नेछ
                entry.target.classList.add('visible', 'active');
                
                // एनिमेसन एकपटक मात्र देखाउनको लागि (Professional Feel)
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // सबै एनिमेट हुने एलिमेन्टहरूलाई सेलेक्ट गर्ने
    const animatedElements = document.querySelectorAll('.floating, .reveal, .slide-in');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // २. Smooth Rotating Text Effect (CEO Style Transition)
    const roles = [
        "Global Youth Leader",
        "International Peace Ambassador",
        "Social Entrepreneur",
        "Visionary Executive" // एउटा नयाँ रोल थपिएको
    ];
    let roleIndex = 0;
    const rotatingTextEl = document.getElementById('rotating-text');
    
    if (rotatingTextEl) {
        // CSS ट्रान्जिसन JS बाटै सेट गरिएको छ
        rotatingTextEl.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        
        setInterval(() => {
            // बिस्तारै हराउने र माथि सर्ने
            rotatingTextEl.style.opacity = "0";
            rotatingTextEl.style.transform = "translateY(-15px)"; 
            
            setTimeout(() => {
                roleIndex = (roleIndex + 1) % roles.length;
                rotatingTextEl.textContent = roles[roleIndex];
                
                // नयाँ टेक्स्ट तलबाट माथि आउने
                rotatingTextEl.style.transform = "translateY(15px)";
                
                requestAnimationFrame(() => {
                    rotatingTextEl.style.opacity = "1";
                    rotatingTextEl.style.transform = "translateY(0)";
                });
            }, 500); // 500ms कुर्ने
        }, 3500); // हरेक ३.५ सेकेन्डमा परिवर्तन हुने
    }

    // ३. Theme Switcher Logic (Bouncy Animation सहित)
    const themeSwitchButtons = document.querySelectorAll('.switch-btn');
    const switchPill = document.getElementById('switch-pill');
    
    if (themeSwitchButtons.length > 0 && switchPill) {
        themeSwitchButtons.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                const currentTheme = btn.getAttribute('data-theme');
                document.documentElement.setAttribute('data-theme', currentTheme);
                
                // Pill लाई सर्दा आकर्षक 'Bounce' इफेक्ट दिने
                const pillOffset = index * 30; 
                switchPill.style.transform = `translateX(${pillOffset}px)`;
                switchPill.style.transition = "transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)"; 
            });
        });
    }

    // ४. [NEW] Liquid Mouse Parallax Effect (ब्याकग्राउन्ड माउससँगै हल्लिने)
    document.addEventListener('mousemove', (e) => {
        const blobs = document.querySelectorAll('.blob');
        const x = (e.clientX / window.innerWidth - 0.5) * 30; // Max movement 30px
        const y = (e.clientY / window.innerHeight - 0.5) * 30;

        blobs.forEach((blob, index) => {
            const speed = index === 0 ? 1 : -1.5; // फरक-फरक दिशामा हल्लिने
            blob.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    });

    // ५. [NEW] 3D Hover Tilt Effect for Glass Cards (प्रिमियम टच)
    const glassCards = document.querySelectorAll('.glass-card');
    glassCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // माउसको पोजिसन अनुसार कार्ड थोरै ढल्कने (Max 5 degrees)
            const rotateX = ((y - centerY) / centerY) * -5; 
            const rotateY = ((x - centerX) / centerX) * 5;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            card.style.boxShadow = "0 15px 35px rgba(56, 189, 248, 0.2)"; // होभर गर्दा नीलो छाया
        });
        
        card.addEventListener('mouseleave', () => {
            // माउस हटेपछि नर्मल अवस्थामा फर्किने
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            card.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease'; 
            card.style.boxShadow = "0 8px 32px 0 rgba(0, 0, 0, 0.3)"; // पुरानै छाया
        });
        
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'none'; // माउस भित्र हुँदा ट्रान्जिसन अफ गर्ने ताकि तुरुन्तै रियाक्ट गरोस्
        });
    });

});
