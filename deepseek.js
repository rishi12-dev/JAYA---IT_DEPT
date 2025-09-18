// ======================
// Firebase Initialization
// ======================
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const auth = firebase.auth();
  const messaging = firebase.messaging();
  
  // ======================
  // Notification Setup
  // ======================
  function requestNotificationPermission() {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
        getFCMToken();
      }
    });
  }
  
  function getFCMToken() {
    messaging.getToken().then(token => {
      console.log('FCM Token:', token);
      // Store token in database for targeted notifications
      if (auth.currentUser) {
        db.collection('users').doc(auth.currentUser.uid).update({
          fcmToken: token
        });
      }
    }).catch(err => {
      console.error('Error getting FCM token:', err);
    });
  }
  
  // Handle incoming notifications
  messaging.onMessage(payload => {
    console.log('Message received:', payload);
    showNotification(payload.notification.title, payload.notification.body);
  });
  
  function showNotification(title, body) {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, { body });
    }
  }
  
  // ======================
  // Existing Code (Modified)
  // ======================
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
      
      // Initialize with empty array (will be populated from Firestore)
      window.notices = [];
      
      // Check authentication state
      auth.onAuthStateChanged(user => {
          if (user) {
              isAdminLoggedIn = true;
              localStorage.setItem('isAdminLoggedIn', 'true');
              updateAdminPanelVisibility();
              loadNotices();
          } else {
              isAdminLoggedIn = false;
              localStorage.removeItem('isAdminLoggedIn');
              updateAdminPanelVisibility();
          }
      });
      
      // Request notification permission on page load
      requestNotificationPermission();
      
      // Admin login button click (updated with Firebase Auth)
      adminLoginBtn.addEventListener('click', function() {
          if (!isAdminLoggedIn) {
              const email = prompt('Enter admin email:');
              const password = prompt('Enter admin password:');
              
              auth.signInWithEmailAndPassword(email, password)
                  .then(userCredential => {
                      isAdminLoggedIn = true;
                      localStorage.setItem('isAdminLoggedIn', 'true');
                      updateAdminPanelVisibility();
                  })
                  .catch(error => {
                      alert('Login failed: ' + error.message);
                  });
          } else {
              auth.signOut()
                  .then(() => {
                      isAdminLoggedIn = false;
                      localStorage.removeItem('isAdminLoggedIn');
                      updateAdminPanelVisibility();
                  });
          }
      });
      
      // Form submission for new notice (updated with Firestore)
      noticeForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          const type = document.getElementById('noticeType').value;
          const title = document.getElementById('noticeTitle').value;
          const content = document.getElementById('noticeContent').value;
          const department = document.getElementById('noticeDepartment').value;
          const date = document.getElementById('noticeDate').value;
          
          // Create new notice in Firestore
          db.collection('notices').add({
              type,
              title,
              content,
              department,
              date,
              publishedBy: auth.currentUser.email,
              timestamp: firebase.firestore.FieldValue.serverTimestamp()
          })
          .then(docRef => {
              // Send notification to students
              sendNotificationToStudents({
                  type,
                  title,
                  content,
                  department
              });
              
              noticeForm.reset();
              alert('Notice published successfully!');
          })
          .catch(error => {
              console.error('Error adding notice:', error);
              alert('Error publishing notice');
          });
      });
      
      // Load notices from Firestore
      function loadNotices() {
          db.collection('notices')
              .orderBy('timestamp', 'desc')
              .onSnapshot(snapshot => {
                  window.notices = [];
                  snapshot.forEach(doc => {
                      window.notices.push({
                          id: doc.id,
                          ...doc.data()
                      });
                  });
                  renderNotices(window.notices);
              });
      }
      
      // Send notification to students
      async function sendNotificationToStudents(notice) {
          const message = {
              notification: {
                  title: `New ${notice.type}: ${notice.title}`,
                  body: notice.content.substring(0, 100) + (notice.content.length > 100 ? '...' : '')
              },
              topic: notice.department.toLowerCase()
          };
          
          try {
              await fetch('https://fcm.googleapis.com/fcm/send', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': 'key=YOUR_SERVER_KEY'
                  },
                  body: JSON.stringify(message)
              });
          } catch (error) {
              console.error('Error sending notification:', error);
          }
      }
      
      // Delete notice function (updated with Firestore)
      function deleteNotice(id) {
          if (confirm('Are you sure you want to delete this notice?')) {
              db.collection('notices').doc(id).delete()
                  .then(() => {
                      console.log('Notice deleted successfully');
                  })
                  .catch(error => {
                      console.error('Error deleting notice:', error);
                      alert('Error deleting notice');
                  });
          }
      }
      
      // Rest of your existing functions (renderNotices, filterNotices, etc.) remain the same
      // ...
  });
  
  // Service Worker Registration for Push Notifications
  if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/firebase-messaging-sw.js')
          .then(registration => {
              console.log('Service Worker registered');
              firebase.messaging().useServiceWorker(registration);
          })
          .catch(err => {
              console.error('Service Worker registration failed:', err);
          });
  }

  // Register the service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/firebase-messaging-sw.js')
      .then(registration => {
        console.log('Service Worker registered:', registration);
        
        // Initialize Firebase Messaging with the service worker
        firebase.messaging().useServiceWorker(registration);
      })
      .catch(err => {
        console.error('Service Worker registration failed:', err);
      });
  }