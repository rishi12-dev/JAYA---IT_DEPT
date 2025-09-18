// Mobile Menu Toggle
const menuBtn = document.getElementById('menuBtn');
const mainNav = document.getElementById('mainNav');

menuBtn.addEventListener('click', () => {
mainNav.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('nav ul li a').forEach(link => {
link.addEventListener('click', () => {
 if (window.innerWidth <= 768) {
     mainNav.classList.remove('active');
 }
});
});

// Course Filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const courseCards = document.querySelectorAll('.course-card');

filterBtns.forEach(btn => {
btn.addEventListener('click', () => {
 // Remove active class from all buttons
 filterBtns.forEach(b => b.classList.remove('active'));
 // Add active class to clicked button
 btn.classList.add('active');
 
 const filter = btn.dataset.filter;
 
 courseCards.forEach(card => {
     if (filter === 'all' || card.dataset.category.includes(filter)) {
         card.style.display = 'block';
     } else {
         card.style.display = 'none';
     }
 });
});
});

// Download Resources Functionality
const downloadModal = document.getElementById('downloadModal');
const modalMessage = document.getElementById('modalMessage');
const confirmDownload = document.getElementById('confirmDownload');
const cancelDownload = document.getElementById('cancelDownload');
let currentResource = null;

// Resource data with file links
const resourceFiles = {
'python-basics': { name: 'Python Basics Notes', file: 'https://cwh-full-next-space.fra1.cdn.digitaloceanspaces.com/notes/Python_Complete_Notes.pdf' },
'python-oop': { name: 'OOP in Python', file: 'python-oop.pdf' },
'python-datascience': { name: 'Python for Data Science', file: 'python-datascience.pdf' },
'python-django': { name: 'Django Framework Notes', file: 'python-django.pdf' },
'java-fundamentals': { name: 'Java Fundamentals', file: 'https://cwh-full-next-space.fra1.cdn.digitaloceanspaces.com/notes/Java_Complete_Notes.pdf' },
'java-advanced': { name: 'Advanced Java Concepts', file: 'java-advanced.pdf' },
'java-spring': { name: 'Spring Framework Notes', file: 'java-spring.pdf' },
'java-collections': { name: 'Java Collections', file: 'java-collections.pdf' },
'web-htmlcss': { name: 'HTML & CSS Cheat Sheet', file: 'https://cwh-full-next-space.fra1.cdn.digitaloceanspaces.com/notes/HTML_Complete_Notes.pdf' },
'web-javascript': { name: 'JavaScript Notes', file: 'web-javascript.pdf' },
'web-react': { name: 'React.js Concepts', file: 'web-react.pdf' },
'web-nodejs': { name: 'Node.js Basics', file: 'web-nodejs.pdf' },
'ds-arrays': { name: 'Arrays & Linked Lists', file: 'https://cwh-full-next-space.fra1.cdn.digitaloceanspaces.com/notes/DSA_CompleteNotes.pdf' },
'ds-trees': { name: 'Trees & Graphs', file: 'ds-trees.pdf' },
'ds-sorting': { name: 'Sorting Algorithms', file: 'ds-sorting.pdf' },
'ds-dp': { name: 'Dynamic Programming', file: 'ds-dp.pdf' }
};

// Set up download buttons
document.querySelectorAll('.download-btn').forEach(btn => {
btn.addEventListener('click', function() {
 const resourceId = this.dataset.resource;
 currentResource = resourceId;

 // Update modal message
 modalMessage.textContent = `Are you sure you want to download "${resourceFiles[resourceId].name}"?`;

 // Show modal
 downloadModal.style.display = 'flex';
});
});

// Confirm download
confirmDownload.addEventListener('click', () => {
if (currentResource) {
 // Open PDF in new tab
 window.open(resourceFiles[currentResource].file, '_blank');

 // Close modal
 downloadModal.style.display = 'none';
 currentResource = null;
}
});

// Cancel download
cancelDownload.addEventListener('click', () => {
downloadModal.style.display = 'none';
currentResource = null;
});

// Close modal when clicking outside the box
downloadModal.addEventListener('click', (e) => {
if (e.target === downloadModal) {
 downloadModal.style.display = 'none';
 currentResource = null;
}
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
anchor.addEventListener('click', function(e) {
 e.preventDefault();
 
 const targetId = this.getAttribute('href');
 const targetElement = document.querySelector(targetId);
 
 if (targetElement) {
     window.scrollTo({
         top: targetElement.offsetTop - 70,
         behavior: 'smooth'
     });
 }
});
});

// Highlight active section in navigation
window.addEventListener('scroll', () => {
const scrollPosition = window.scrollY + 100;

document.querySelectorAll('section').forEach(section => {
 const sectionTop = section.offsetTop;
 const sectionHeight = section.offsetHeight;
 const sectionId = section.getAttribute('id');
 
 if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
     document.querySelectorAll('nav ul li a').forEach(link => {
         link.classList.remove('active');
         if (link.getAttribute('href') === `#${sectionId}`) {
             link.classList.add('active');
         }
     });
 }
});
});

// Initialize with all courses visible
window.addEventListener('DOMContentLoaded', () => {
// Set first filter as active by default
document.querySelector('.filter-btn[data-filter="all"]').classList.add('active');

// Show all courses initially
courseCards.forEach(card => {
 card.style.display = 'block';
});
});
