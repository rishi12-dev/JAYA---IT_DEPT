// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.innerHTML = navLinks.classList.contains('active') ? 
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Back to Top Button
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    backToTop.classList.toggle('active', window.scrollY > 300);
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Tab Functionality
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');
        
        // Remove active class from all buttons and contents
        tabBtns.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        btn.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    });
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
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

// Explore Button Animation
const exploreBtn = document.getElementById('exploreBtn');
exploreBtn.addEventListener('click', () => {
    window.scrollTo({
        top: document.getElementById('syllabus').offsetTop - 80,
        behavior: 'smooth'
    });
});

// Animate elements when they come into view
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.syllabus-card, .faculty-card, .lab-card');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if(elementPosition < windowHeight - 100) {
            element.style.animation = 'fadeInUp 0.5s ease forwards';
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyD9rAXYYPUUQi3aeszHnhhPcCWv4SjXJU",
    authDomain: "jaya-it-dept-de4fd.firebaseapp.com",
    projectId: "jaya-it-dept-de4fd",
    messagingSenderId: "67285506736",
    appId: "1:67285506736:web:7b0ecb2b61816d114dccd1"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Init messaging
  const messaging = firebase.messaging();
  
  // Register the service worker
  navigator.serviceWorker.register("/firebase-messaging-sw.js")
  .then((registration) => {
    messaging.useServiceWorker(registration);
    console.log("Service Worker registered.");
  
    // Ask for notification permission
    messaging.requestPermission()
      .then(() => {
        console.log("Notification permission granted.");
        return messaging.getToken({
          vapidKey: "DN0KLrInpyZlYjXcR7uZfU44nSNC-kKzarPHWygHE"
        });
      })
      .then((token) => {
        console.log("Device Token:", token);
        // You can now use this token to send messages
      })
      .catch((err) => {
        console.log("Error getting permission or token", err);
      });
  
  }).catch((err) => {
    console.error("Service Worker registration failed:", err);
  });
  
  // Handle foreground messages
  messaging.onMessage((payload) => {
    console.log("Message received: ", payload);
    alert(payload.notification.title + ": " + payload.notification.body);
  });
  
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification permission granted.");
    } else {
      console.log("Notification permission denied or dismissed.");
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