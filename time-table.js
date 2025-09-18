
document.addEventListener('DOMContentLoaded', function() {
    const yearButtons = document.querySelectorAll('.year-btn');
    const timetableContainers = document.querySelectorAll('.timetable-container');

    // Function to show selected timetable
    function showTimetable(year) {
        // Hide all timetables
        timetableContainers.forEach(container => {
            container.classList.remove('show');
        });
        
        // Show selected timetable
        const selectedTimetable = document.getElementById(`year${year}-timetable`);
        if (selectedTimetable) {
            selectedTimetable.classList.add('show');
        }
    }

    // Set up click event listeners for year buttons
    yearButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            yearButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get the year from data attribute
            const year = this.getAttribute('data-year');
            
            // Show the corresponding timetable
            showTimetable(year);
        });
    });

    // Initialize with first year timetable visible
    showTimetable('1');
    document.querySelector('.year-btn[data-year="1"]').classList.add('active');

    // Add hover effects to table rows
    const tableRows = document.querySelectorAll('.timetable tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.005)';
            this.style.boxShadow = '0 3px 10px rgba(0,0,0,0.1)';
            this.style.zIndex = '10';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
            this.style.zIndex = '1';
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const downloadBtn = document.getElementById('downloadBtn');
    const progressBar = downloadBtn.querySelector('.download-progress');
    
    // URL to your timetable PDF file - replace with your actual PDF path
    const pdfURL = "path/to/your/timetable.pdf"; // Example: "/assets/timetables/CS2023timetable.pdf"
    const fileName = "Timetable_2023_2024.pdf"; // The name file will have when downloaded
    
    downloadBtn.addEventListener('click', function() {
        // Prevent multiple clicks
        if (downloadBtn.classList.contains('downloading') || 
            downloadBtn.classList.contains('complete')) {
            return;
        }
        
        // Start download visual feedback
        downloadBtn.classList.add('downloading');
        downloadBtn.querySelector('.download-text').textContent = 'Downloading';
        
        // Start downloading the PDF
        downloadPDF(pdfURL, fileName);
    });
    
    function downloadComplete() {
        downloadBtn.classList.remove('downloading');
        downloadBtn.classList.add('complete');
        downloadBtn.querySelector('.download-text').textContent = 'Downloaded!';
        
        // Reset button after a delay
        setTimeout(function() {
            downloadBtn.classList.remove('complete');
            downloadBtn.querySelector('.download-text').textContent = 'Download Timetable';
            progressBar.style.width = '0%';
        }, 3000);
    }
    
    function downloadPDF(fileURL, fileName) {
        // Create XHR request to fetch the PDF
        const xhr = new XMLHttpRequest();
        xhr.open('GET', fileURL, true);
        xhr.responseType = 'blob';
        
        // Track download progress
        xhr.onprogress = function(event) {
            if (event.lengthComputable) {
                const percentComplete = (event.loaded / event.total) * 100;
                progressBar.style.width = percentComplete + '%';
            }
        };
        
        // Handle errors
        xhr.onerror = function() {
            alert('Error: Could not download the timetable. Please try again later.');
            downloadBtn.classList.remove('downloading');
            progressBar.style.width = '0%';
            downloadBtn.querySelector('.download-text').textContent = 'Download Failed';
            
            setTimeout(function() {
                downloadBtn.querySelector('.download-text').textContent = 'Try Again';
            }, 2000);
        };
        
        // Process download completion
        xhr.onload = function() {
            if (xhr.status === 200) {
                // Download completed successfully
                const blob = xhr.response;
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = fileName;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                // Update UI to show completion
                downloadComplete();
            } else {
                // Server responded with an error
                alert('Error: Could not download the timetable (Status: ' + xhr.status + ')');
                downloadBtn.classList.remove('downloading');
                progressBar.style.width = '0%';
                downloadBtn.querySelector('.download-text').textContent = 'Download Failed';
                
                setTimeout(function() {
                    downloadBtn.querySelector('.download-text').textContent = 'Try Again';
                }, 2000);
            }
        };
        
        // Send the request to download the file
        xhr.send();
    }
    
    // Add mobile touch effect
    downloadBtn.addEventListener('touchstart', function() {
        downloadBtn.style.transform = 'scale(0.95)';
    });
    
    downloadBtn.addEventListener('touchend', function() {
        downloadBtn.style.transform = 'scale(1)';
    });
});

function toggleMenu() {
    const nav = document.getElementById('nav-links');
    nav.classList.toggle('show');
  }
  