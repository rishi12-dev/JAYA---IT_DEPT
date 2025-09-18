document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const adminLoginBtn = document.getElementById('adminLoginBtn');
    const adminPanel = document.getElementById('adminPanel');
    const noticeForm = document.getElementById('noticeForm');
    const logoutBtn = document.getElementById('logoutBtn');
    const noticesList = document.getElementById('noticesList');
    const searchInput = document.getElementById('searchInput');
    const typeFilter = document.getElementById('typeFilter');
    const departmentFilter = document.getElementById('departmentFilter');
    
    // Sample data (in a real app, this would come from a database)
    let notices = [
        {
            id: 1,
            type: 'notice',
            title: 'Semester Exam Schedule',
            content: 'The schedule for the upcoming semester exams has been published. Please check the college website for details.',
            department: 'IT',
            date: '2023-11-15',
            publishedBy: 'Exam Department'
        },
        {
            id: 2,
            type: 'circular',
            title: 'College Annual Day Celebration',
            content: 'All students are invited to participate in the annual day celebrations on December 10th. Cultural programs and competitions will be held.',
            department: 'ALL',
            date: '2023-11-10',
            publishedBy: 'Principal Office'
        },
        {
            id: 3,
            type: 'notice',
            title: 'Project Submission Deadline',
            content: 'Final year students must submit their project reports by November 30th. No extensions will be granted.',
            department: 'IT',
            date: '2023-11-05',
            publishedBy: 'HOD IT'
        }
    ];
    
    // Check if admin is logged in (in a real app, this would be proper authentication)
    let isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
    
    // Initialize the page
    updateAdminPanelVisibility();
    renderNotices(notices);
    
    // Admin login button click
    adminLoginBtn.addEventListener('click', function() {
        if (!isAdminLoggedIn) {
            const password = prompt('Enter admin password:');
            if (password === 'admin123') { // In real app, use proper authentication
                isAdminLoggedIn = true;
                localStorage.setItem('isAdminLoggedIn', 'true');
                updateAdminPanelVisibility();
            } else {
                alert('Incorrect password!');
            }
        } else {
            isAdminLoggedIn = false;
            localStorage.removeItem('isAdminLoggedIn');
            updateAdminPanelVisibility();
        }
    });
    
    // Logout button click
    logoutBtn.addEventListener('click', function() {
        isAdminLoggedIn = false;
        localStorage.removeItem('isAdminLoggedIn');
        updateAdminPanelVisibility();
    });
    
    // Form submission for new notice
    noticeForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const type = document.getElementById('noticeType').value;
        const title = document.getElementById('noticeTitle').value;
        const content = document.getElementById('noticeContent').value;
        const department = document.getElementById('noticeDepartment').value;
        const date = document.getElementById('noticeDate').value;
        
        // Create new notice
        const newNotice = {
            id: Date.now(), // Simple ID generation
            type,
            title,
            content,
            department,
            date,
            publishedBy: 'Admin' // In real app, get actual admin name
        };
        
        // Add to notices array
        notices.unshift(newNotice);
        
        // Re-render notices
        renderNotices(notices);
        
        // Reset form
        noticeForm.reset();
        
        alert('Notice published successfully!');
    });
    
    // Search and filter functionality
    searchInput.addEventListener('input', filterNotices);
    typeFilter.addEventListener('change', filterNotices);
    departmentFilter.addEventListener('change', filterNotices);
    
    // Function to update admin panel visibility
    function updateAdminPanelVisibility() {
        if (isAdminLoggedIn) {
            adminPanel.style.display = 'block';
            adminLoginBtn.innerHTML = '<i class="fas fa-user"></i> Admin';
        } else {
            adminPanel.style.display = 'none';
            adminLoginBtn.innerHTML = '<i class="fas fa-lock"></i> Admin Login';
        }
    }
    
    // Function to render notices
    function renderNotices(noticesToRender) {
        if (noticesToRender.length === 0) {
            noticesList.innerHTML = `
                <div class="no-notices">
                    <i class="fas fa-info-circle" style="font-size: 2rem; margin-bottom: 1rem;"></i>
                    <p>No notices available at the moment.</p>
                </div>
            `;
            return;
        }
        
        noticesList.innerHTML = noticesToRender.map(notice => `
            <div class="notice-card ${notice.type}">
                <div class="notice-title">${notice.title}</div>
                <div class="notice-date">
                    <i class="far fa-calendar-alt"></i> ${formatDate(notice.date)} 
                    <span style="margin-left: 1rem;">
                        <i class="fas fa-user-tie"></i> ${notice.publishedBy}
                    </span>
                </div>
                <div class="notice-department">${notice.department === 'ALL' ? 'All Departments' : notice.department}</div>
                <div class="notice-content">${notice.content}</div>
                ${isAdminLoggedIn ? `
                <div class="notice-actions">
                    <button onclick="deleteNotice(${notice.id})" class="btn-danger" style="padding: 0.3rem 0.8rem; font-size: 0.9rem;">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
                ` : ''}
            </div>
        `).join('');
    }
    
    // Function to filter notices based on search and filters
    function filterNotices() {
        const searchTerm = searchInput.value.toLowerCase();
        const typeFilterValue = typeFilter.value;
        const departmentFilterValue = departmentFilter.value;
        
        const filteredNotices = notices.filter(notice => {
            const matchesSearch = notice.title.toLowerCase().includes(searchTerm) || 
                                 notice.content.toLowerCase().includes(searchTerm);
            const matchesType = !typeFilterValue || notice.type === typeFilterValue;
            const matchesDepartment = !departmentFilterValue || 
                                    notice.department === departmentFilterValue || 
                                    notice.department === 'ALL';
            
            return matchesSearch && matchesType && matchesDepartment;
        });
        
        renderNotices(filteredNotices);
    }
    
    // Function to format date
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }
});

// Global function to delete notice (simplified for this example)
function deleteNotice(id) {
    if (confirm('Are you sure you want to delete this notice?')) {
        // In a real app, this would be an API call to delete from database
        const noticeIndex = window.notices.findIndex(n => n.id === id);
        if (noticeIndex !== -1) {
            window.notices.splice(noticeIndex, 1);
            document.dispatchEvent(new Event('DOMContentLoaded'));
        }
    }
}

// Make notices array available globally for the delete function
window.notices = [];


document.addEventListener('DOMContentLoaded', function() {
    // Banner/Carousel Functionality
    const banner = document.getElementById('banner');
    const slides = document.querySelectorAll('.banner-slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicators = document.getElementById('bannerIndicators');
    const progress = document.getElementById('bannerProgress');
    
    let currentSlide = 0;
    const slideCount = slides.length;
    let slideInterval;
    const intervalTime = 5000; // 5 seconds
    
    // Create indicators
    slides.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.classList.add('indicator');
        if (index === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToSlide(index));
        indicators.appendChild(indicator);
    });
    
    const indicatorDots = document.querySelectorAll('.indicator');
    
    // Initialize banner
    updateBanner();
    startSlideTimer();
    
    // Button controls
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    // Touch events for mobile swiping
    let touchStartX = 0;
    let touchEndX = 0;
    
    banner.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
        clearInterval(slideInterval); // Pause autoplay on touch
    }, { passive: true });
    
    banner.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startSlideTimer(); // Resume autoplay after touch
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left: next slide
            nextSlide();
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right: previous slide
            prevSlide();
        }
    }
    
    // Navigation functions
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slideCount;
        updateBanner();
        resetTimer();
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        updateBanner();
        resetTimer();
    }
    
    function goToSlide(index) {
        currentSlide = index;
        updateBanner();
        resetTimer();
    }
    
    function updateBanner() {
        banner.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Update indicators
        indicatorDots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
        
        // Reset progress bar
        progress.style.width = '0%';
    }
    
    function startSlideTimer() {
        // Clear any existing interval
        clearInterval(slideInterval);
        
        // Start progress bar animation
        let progressWidth = 0;
        const progressInterval = setInterval(() => {
            if (progressWidth >= 100) {
                clearInterval(progressInterval);
            } else {
                progressWidth += 0.5;
                progress.style.width = progressWidth + '%';
            }
        }, intervalTime / 200); // Update bar smoothly
        
        // Set interval for slide change
        slideInterval = setInterval(() => {
            nextSlide();
        }, intervalTime);
    }
    
    function resetTimer() {
        clearInterval(slideInterval);
        progress.style.width = '0%';
        startSlideTimer();
    }
    
    // Stop autoplay when user interacts with controls
    [prevBtn, nextBtn].forEach(btn => {
        btn.addEventListener('mouseenter', () => clearInterval(slideInterval));
        btn.addEventListener('mouseleave', startSlideTimer);
    });
    
    // Pause autoplay when user hovers over banner
    banner.addEventListener('mouseenter', () => clearInterval(slideInterval));
    banner.addEventListener('mouseleave', startSlideTimer);
    
    // Handle visibility change (tab switching)
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            clearInterval(slideInterval);
        } else {
            startSlideTimer();
        }
    });
    
    // Ensure banner resets properly when window is resized
    window.addEventListener('resize', updateBanner);
    
    // Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
});

// ========== NOTIFICATION SYSTEM ========== //

// Check if notifications are supported
function isNotificationSupported() {
    return "Notification" in window;
}

// Request notification permission
function requestNotificationPermission() {
    if (!isNotificationSupported()) return;
    
    Notification.requestPermission().then(permission => {
        if (permission === "granted") {
            console.log("Notification permission granted");
            localStorage.setItem('notificationsEnabled', 'true');
            document.getElementById('notificationPrompt').style.display = 'none';
            
            // Register service worker for push notifications
            registerServiceWorker();
        }
    });
}

// Register service worker
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').then(registration => {
            console.log('ServiceWorker registration successful');
            // Subscribe to push notifications
            subscribeToPush(registration);
        }).catch(err => {
            console.log('ServiceWorker registration failed: ', err);
        });
    }
}

// Show notification prompt after delay
function showNotificationPrompt() {
    // Only show if notifications aren't already enabled
    if (localStorage.getItem('notificationsEnabled') !== 'true' && isNotificationSupported()) {
        setTimeout(() => {
            document.getElementById('notificationPrompt').style.display = 'block';
        }, 5000);
    }
}

// Event listeners for notification buttons
document.getElementById('enableNotificationsBtn')?.addEventListener('click', requestNotificationPermission);
document.getElementById('laterBtn')?.addEventListener('click', () => {
    document.getElementById('notificationPrompt').style.display = 'none';
});

// Show notification when new notice is added
function showNewNoticeNotification(notice) {
    if (Notification.permission === "granted") {
        const notification = new Notification(`New ${notice.type}: ${notice.department}`, {
            body: notice.title,
            icon: 'https://jec.ac.in/wp-content/themes/Jayacollege_2017/images/logo_fav.png',
            vibrate: [200, 100, 200]  // Vibration pattern for mobile
        });
        
        notification.onclick = () => {
            window.focus();
            // You could scroll to the new notice here
        };
    }
}

// ========== MODIFY YOUR EXISTING CODE ========== //

// In your existing code where you handle new notices:
function handleNewNotice(notice) {
    // Your existing code to display the notice...
    
    // Add this to show notification
    if (isNotificationSupported()) {
        showNewNoticeNotification(notice);
    }
}

// Initialize notification system when page loads
document.addEventListener('DOMContentLoaded', () => {
    showNotificationPrompt();
    
    // Your other initialization code...
});