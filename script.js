document.addEventListener('DOMContentLoaded', () => {

    
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
       
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

   
    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.querySelector('i').classList.replace('fa-times', 'fa-bars');
        });
    });

    
    const faders = document.querySelectorAll('.fade-in-up');
    
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            btn.style.opacity = '0.8';
            
            const formData = new FormData(form);
            
            formData.append("access_key", "000fe769-5460-4d5c-8e0b-e6a82bf42b43");

            try {
                const response = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    body: formData
                });
                
                const data = await response.json();
                
                if (data.success) {
                    btn.innerHTML = 'Message Sent! <i class="fas fa-check"></i>';
                    btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                    form.reset();
                } else {
                    btn.innerHTML = 'Error Sending! <i class="fas fa-times"></i>';
                    btn.style.background = '#ef4444';
                }
            } catch (error) {
                btn.innerHTML = 'Error Sending! <i class="fas fa-times"></i>';
                btn.style.background = '#ef4444';
            }
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                btn.style.opacity = '1';
            }, 3000);
        });
    }
});
