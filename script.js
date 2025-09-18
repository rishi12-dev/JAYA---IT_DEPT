// Wait for DOM to fully load before executing script
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Handling
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    
    // Toggle mobile menu when hamburger is clicked
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            // Change hamburger icon
            const icon = hamburger.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Close mobile menu when clicking on a nav link
    const mobileLinks = navLinks?.querySelectorAll('a');
    if (mobileLinks) {
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                // Only execute on mobile view
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('active');
                    const icon = hamburger.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }
    
    // Projects Section Tab Functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabButtons.length && tabContents.length) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Show corresponding content
                const tabId = this.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Smooth scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for navbar height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Explore Button Functionality
    const exploreBtn = document.getElementById('exploreBtn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', function() {
            const syllabusSection = document.getElementById('syllabus');
            if (syllabusSection) {
                window.scrollTo({
                    top: syllabusSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Sticky Navigation on Scroll
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add sticky class when scrolling down
        if (scrollTop > 100) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
        
        // Hide navbar when scrolling down and show when scrolling up (mobile only)
        if (window.innerWidth <= 768) {
            if (scrollTop > lastScrollTop && scrollTop > 300) {
                navbar.style.top = '-80px'; // Hide navbar
            } else {
                navbar.style.top = '0'; // Show navbar
            }
        } else {
            navbar.style.top = '0'; // Always show on desktop
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Add animation on scroll for sections
    const sections = document.querySelectorAll('.section');
    
    const fadeInOnScroll = function() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight - 100) {
                section.classList.add('fade-in');
            }
        });
    };
    
    // Initial check on page load
    fadeInOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', fadeInOnScroll);
    
    // Handle syllabus card hover animations for touch devices
    const syllabusCards = document.querySelectorAll('.syllabus-card');
    
    syllabusCards.forEach(card => {
        // For touch devices
        card.addEventListener('touchstart', function() {
            syllabusCards.forEach(c => c.classList.remove('active-card'));
            this.classList.add('active-card');
        });
        
        // For mouse devices
        card.addEventListener('mouseenter', function() {
            this.classList.add('hover-card');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hover-card');
        });
    });
    
    // Window resize handling
    window.addEventListener('resize', function() {
        // Reset mobile menu when switching to desktop
        if (window.innerWidth > 768) {
            navLinks.classList.remove('active');
            const icon = hamburger?.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
    
    // Image lazy loading
    const images = document.querySelectorAll('img');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    image.src = image.dataset.src || image.src;
                    observer.unobserve(image);
                }
            });
        });
        
        images.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        images.forEach(img => {
            img.src = img.dataset.src || img.src;
        });
    }
    
    // Add necessary CSS for JavaScript-dependent elements
    addDynamicStyles();
});

// Function to add dynamic styles
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* Mobile Navigation Styles */
        @media (max-width: 768px) {
            .nav-links {
                position: fixed;
                top: 80px;
                left: -100%;
                width: 80%;
                height: calc(100vh - 80px);
                background-color: #fff;
                box-shadow: 2px 0 5px rgba(0,0,0,0.1);
                flex-direction: column;
                align-items: flex-start;
                padding: 20px;
                transition: left 0.3s ease;
                z-index: 999;
            }
            
            .nav-links.active {
                left: 0;
            }
            
            .nav-links a {
                margin: 15px 0;
                font-size: 18px;
            }
            
            .navbar.sticky {
                position: fixed;
                top: 0;
                width: 100%;
                background-color: #fff;
                box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                z-index: 1000;
                transition: top 0.3s ease;
            }
        }
        
        /* Animation Classes */
        .fade-in {
            animation: fadeIn 0.6s ease-in forwards;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        /* Card Hover Effects */
        .syllabus-card.hover-card, .syllabus-card.active-card {
            transform: translateY(-10px);
            box-shadow: 0 15px 30px rgba(0,0,0,0.1);
        }
        
        /* Tab Content Animation */
        .tab-content {
            display: none;
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.3s ease, transform 0.3s ease;
        }
        
        .tab-content.active {
            display: flex;
            flex-wrap: wrap;
            opacity: 1;
            transform: translateY(0);
        }
    `;
    
    document.head.appendChild(style);
}

// Navigation menu toggle for mobile
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if(hamburger) {
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
}


