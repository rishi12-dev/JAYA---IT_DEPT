document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    const years = document.querySelectorAll('.animate-year');
    years.forEach(year => {
        year.style.opacity = '1';
    });
    
    const semesters = document.querySelectorAll('.animate-semester');
    semesters.forEach(sem => {
        sem.style.opacity = '1';
    });
    
    const items = document.querySelectorAll('.animate-item');
    items.forEach(item => {
        item.style.opacity = '1';
    });
    
    // Add pulse animation to download buttons on hover
    const downloadBtns = document.querySelectorAll('.download-btn');
    downloadBtns.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.animation = 'pulse 0.5s ease';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.animation = '';
        });
        btn.addEventListener('animationend', () => {
            btn.style.animation = '';
        });
    });
    
    // Toggle year sections
    const yearHeaders = document.querySelectorAll('.year-header');
    yearHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const yearContainer = this.parentElement;
            const semesterCards = this.nextElementSibling;
            
            if (this.classList.contains('collapsed')) {
                this.classList.remove('collapsed');
                semesterCards.style.display = 'grid';
            } else {
                this.classList.add('collapsed');
                semesterCards.style.display = 'none';
            }
        });
    });
});

function toggleMenu() {
    const nav = document.querySelector('.nav-links');
    nav.classList.toggle('show');
  }