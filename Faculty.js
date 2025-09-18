
        // Initialize AOS (Animate On Scroll)
        AOS.init({
            duration: 800,
            once: true,
            easing: 'ease-in-out'
        });

        // Mobile Menu Toggle
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('navLinks');
        
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.innerHTML = navLinks.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if(targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if(targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if(navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
                    }
                }
            });
        });

        // Scroll down button
        document.getElementById('scrollDown').addEventListener('click', () => {
            window.scrollTo({
                top: document.getElementById('faculty').offsetTop - 70,
                behavior: 'smooth'
            });
        });

        // Add floating animation to faculty cards on hover
        const facultyCards = document.querySelectorAll('.faculty-card');
        facultyCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
                card.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.15)';
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
                card.style.boxShadow = '';
            });
        });
    