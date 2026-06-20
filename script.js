document.addEventListener('DOMContentLoaded', () => {
            
    // 1. Rotating Text Effect (टेक्स्ट परिवर्तन हुने एनिमेसन)
    const roles = [
        "Global Youth Leader", 
        "International Peace Ambassador", 
        "Social Entrepreneur", 
        "Visionary Executive"
    ];
    let roleIndex = 0;
    const rotatingTextEl = document.getElementById('rotating-text');
    
    if (rotatingTextEl) {
        rotatingTextEl.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        setInterval(() => {
            rotatingTextEl.style.opacity = "0";
            rotatingTextEl.style.transform = "translateY(-15px)"; 
            
            setTimeout(() => {
                roleIndex = (roleIndex + 1) % roles.length;
                rotatingTextEl.textContent = roles[roleIndex];
                rotatingTextEl.style.transform = "translateY(15px)";
                
                requestAnimationFrame(() => {
                    rotatingTextEl.style.opacity = "1";
                    rotatingTextEl.style.transform = "translateY(0)";
                });
            }, 500); 
        }, 3500); 
    }

    // 2. Theme Switcher Logic (रङ/थिम परिवर्तन गर्ने)
    const themeSwitchButtons = document.querySelectorAll('.switch-btn');
    const switchPill = document.getElementById('switch-pill');
    
    if(themeSwitchButtons.length > 0 && switchPill) {
        themeSwitchButtons.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                const currentTheme = btn.getAttribute('data-theme');
                document.documentElement.setAttribute('data-theme', currentTheme);
                switchPill.style.transform = `translateX(${index * 30}px)`;
                switchPill.style.transition = "transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)"; 
            });
        });
    }
    
    // 3. 3D Hover Tilt Effect for Glass Cards (कम्प्युटरमा माउस लाँदा कार्ड ढल्किने)
    if (window.innerWidth > 768) {
        document.querySelectorAll('.glass-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -5; 
                const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 5;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
                card.style.transition = 'transform 0.5s ease'; 
            });
            card.addEventListener('mouseenter', () => { 
                card.style.transition = 'none'; 
            });
        });
    }
});
