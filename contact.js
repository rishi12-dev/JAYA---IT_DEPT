// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Form validation and submission
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value.trim();
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            if (!validateEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            if (phone && !validatePhone(phone)) {
                alert('Please enter a valid phone number.');
                return;
            }
            
            // Simulate form submission (in a real scenario, this would be an AJAX call)
            console.log('Form submitted:', { name, email, phone, subject, message });
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Email validation function
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Phone validation function
    function validatePhone(phone) {
        const re = /^[0-9]{10}$/;
        return re.test(phone);
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Current year for footer copyright
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = yearElement.textContent.replace('2025', currentYear);
    }
    
    // Social media links - open in new tab
    document.querySelectorAll('.social-links a').forEach(link => {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    });
    
    // External links - open in new tab
    document.querySelectorAll('.footer-links a').forEach(link => {
        if (link.hostname !== window.location.hostname) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });
    
    // Responsive navigation (for mobile)
    const navToggle = document.createElement('button');
    navToggle.className = 'nav-toggle';
    navToggle.innerHTML = '<i class="fas fa-bars"></i>';
    
    const navContainer = document.querySelector('.nav-container');
    if (navContainer) {
        const navLinks = document.querySelector('.nav-links');
        
        // Insert toggle button before the navigation
        navContainer.insertBefore(navToggle, navLinks);
        
        // Toggle navigation on click
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.innerHTML = navLinks.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
        
        // Close navigation when a link is clicked (for mobile)
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('active');
                    navToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            });
        });
    }
});