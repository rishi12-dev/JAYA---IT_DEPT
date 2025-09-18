

// Year Tab Switching
const yearTabs = document.querySelectorAll('.year-tab');
const syllabusContents = document.querySelectorAll('.syllabus-content');

yearTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs and contents
        yearTabs.forEach(t => t.classList.remove('active'));
        syllabusContents.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding content
        tab.classList.add('active');
        const yearId = tab.getAttribute('data-year') + '-year';
        document.getElementById(yearId).classList.add('active');
        
        // Reset semester tabs to first semester when year changes
        const activeContent = document.getElementById(yearId);
        const semesterTabs = activeContent.querySelectorAll('.semester-tab');
        const semesterContents = activeContent.querySelectorAll('.semester-content');
        
        semesterTabs.forEach(t => t.classList.remove('active'));
        semesterContents.forEach(c => c.classList.remove('active'));
        
        if (semesterTabs.length > 0) {
            semesterTabs[0].classList.add('active');
            semesterContents[0].classList.add('active');
        }
    });
});

function toggleMenu() {
    const nav = document.getElementById('nav-links');
    nav.classList.toggle('show');
  }
  
  

// Semester Tab Switching
document.querySelectorAll('.syllabus-content').forEach(content => {
    content.addEventListener('click', (e) => {
        if (e.target.classList.contains('semester-tab')) {
            const semesterTabs = content.querySelectorAll('.semester-tab');
            const semesterContents = content.querySelectorAll('.semester-content');
            
            semesterTabs.forEach(t => t.classList.remove('active'));
            semesterContents.forEach(c => c.classList.remove('active'));
            
            e.target.classList.add('active');
            const semesterId = e.target.getAttribute('data-semester');
            content.querySelector(`#${semesterId}`).classList.add('active');
        }
    });
});

// Subject Accordion
document.querySelectorAll('.subject-header').forEach(header => {
    header.addEventListener('click', () => {
        const item = header.parentElement;
        const details = item.querySelector('.subject-details');
        const icon = header.querySelector('i');
        
        details.classList.toggle('active');
        icon.classList.toggle('fa-chevron-down');
        icon.classList.toggle('fa-chevron-up');
    });
});

// Animation on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.subject-item, .syllabus-content');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial state for animation
document.querySelectorAll('.subject-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);



