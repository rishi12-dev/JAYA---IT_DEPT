// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const icon = themeToggle.querySelector('i');

// Check for saved theme preference or use preferred color scheme
const savedTheme = localStorage.getItem('theme') || 
                  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

// Apply the saved theme
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
}

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
});

// CGPA Calculator Functionality
const semesters = [];
const addSemesterBtn = document.getElementById('addSemester');
const calculateCGPABtn = document.getElementById('calculateCGPA');
const semesterList = document.getElementById('semesterList');
const cgpaResult = document.getElementById('cgpaResult');

addSemesterBtn.addEventListener('click', () => {
    const gpa = parseFloat(document.getElementById('semesterGPA').value);
    const credits = parseInt(document.getElementById('semesterCredits').value);
    
    if (isNaN(gpa) || isNaN(credits)) {
        alert('Please enter valid GPA and credits');
        return;
    }
    
    if (gpa < 0 || gpa > 4) {
        alert('GPA must be between 0 and 4');
        return;
    }
    
    if (credits <= 0) {
        alert('Credits must be greater than 0');
        return;
    }
    
    semesters.push({ gpa, credits });
    updateSemesterList();
    
    // Clear inputs
    document.getElementById('semesterGPA').value = '';
    document.getElementById('semesterCredits').value = '';
});

function updateSemesterList() {
    semesterList.innerHTML = '';
    
    if (semesters.length === 0) {
        semesterList.innerHTML = '<p>No semesters added yet</p>';
        return;
    }
    
    semesters.forEach((sem, index) => {
        const semItem = document.createElement('div');
        semItem.className = 'semester-item';
        semItem.innerHTML = `
            <span>Semester ${index + 1}: GPA ${sem.gpa.toFixed(2)}, Credits ${sem.credits}</span>
            <button class="delete-semester" data-index="${index}"><i class="fas fa-trash"></i></button>
        `;
        semesterList.appendChild(semItem);
    });
    
    // Add event listeners to delete buttons
    document.querySelectorAll('.delete-semester').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.closest('button').dataset.index);
            semesters.splice(index, 1);
            updateSemesterList();
        });
    });
}

calculateCGPABtn.addEventListener('click', () => {
    if (semesters.length === 0) {
        alert('Please add at least one semester');
        return;
    }
    
    let totalCredits = 0;
    let totalGradePoints = 0;
    
    semesters.forEach(sem => {
        totalGradePoints += sem.gpa * sem.credits;
        totalCredits += sem.credits;
    });
    
    const cgpa = totalGradePoints / totalCredits;
    
    cgpaResult.innerHTML = `
        <p>Your CGPA is: <strong>${cgpa.toFixed(2)}</strong></p>
        <p>Total Credits: ${totalCredits}</p>
    `;
    cgpaResult.classList.add('show');
});

// Unit Converter Functionality
const convertBtn = document.getElementById('convertBtn');
const converterResult = document.getElementById('converterResult');

convertBtn.addEventListener('click', () => {
    const value = parseFloat(document.getElementById('converterValue').value);
    const fromUnit = document.getElementById('converterFrom').value;
    const toUnit = document.getElementById('converterTo').value;
    
    if (isNaN(value)) {
        alert('Please enter a valid number');
        return;
    }
    
    let result;
    
    // Length conversions
    if (['cm', 'm', 'km', 'in', 'ft', 'mi'].includes(fromUnit) && 
        ['cm', 'm', 'km', 'in', 'ft', 'mi'].includes(toUnit)) {
        result = convertLength(value, fromUnit, toUnit);
    }
    // Temperature conversions
    else if (['°C', '°F', 'K'].includes(fromUnit) && 
             ['°C', '°F', 'K'].includes(toUnit)) {
        result = convertTemperature(value, fromUnit, toUnit);
    }
    // Weight conversions
    else if (['g', 'kg', 'lb'].includes(fromUnit) && 
             ['g', 'kg', 'lb'].includes(toUnit)) {
        result = convertWeight(value, fromUnit, toUnit);
    }
    else {
        alert('Cannot convert between different measurement types');
        return;
    }
    
    converterResult.innerHTML = `
        <p>${value} ${fromUnit} = <strong>${result.toFixed(4)} ${toUnit}</strong></p>
    `;
    converterResult.classList.add('show');
});

function convertLength(value, fromUnit, toUnit) {
    // Convert to meters first
    let meters;
    switch (fromUnit) {
        case 'cm': meters = value / 100; break;
        case 'm': meters = value; break;
        case 'km': meters = value * 1000; break;
        case 'in': meters = value * 0.0254; break;
        case 'ft': meters = value * 0.3048; break;
        case 'mi': meters = value * 1609.344; break;
    }
    
    // Convert from meters to target unit
    switch (toUnit) {
        case 'cm': return meters * 100;
        case 'm': return meters;
        case 'km': return meters / 1000;
        case 'in': return meters / 0.0254;
        case 'ft': return meters / 0.3048;
        case 'mi': return meters / 1609.344;
    }
}

function convertTemperature(value, fromUnit, toUnit) {
    // Convert to Celsius first
    let celsius;
    switch (fromUnit) {
        case '°C': celsius = value; break;
        case '°F': celsius = (value - 32) * 5/9; break;
        case 'K': celsius = value - 273.15; break;
    }
    
    // Convert from Celsius to target unit
    switch (toUnit) {
        case '°C': return celsius;
        case '°F': return (celsius * 9/5) + 32;
        case 'K': return celsius + 273.15;
    }
}

function convertWeight(value, fromUnit, toUnit) {
    // Convert to grams first
    let grams;
    switch (fromUnit) {
        case 'g': grams = value; break;
        case 'kg': grams = value * 1000; break;
        case 'lb': grams = value * 453.592; break;
    }
    
    // Convert from grams to target unit
    switch (toUnit) {
        case 'g': return grams;
        case 'kg': return grams / 1000;
        case 'lb': return grams / 453.592;
    }
}

// Notes Functionality with Local Storage
const notesContainer = document.getElementById('notesContainer');
const saveNoteBtn = document.getElementById('saveNote');
let notes = JSON.parse(localStorage.getItem('notes')) || [];
let editNoteId = null;

// Display existing notes on page load
function displayNotes() {
    notesContainer.innerHTML = '';
    
    if (notes.length === 0) {
        notesContainer.innerHTML = '<p>No notes yet. Add your first note!</p>';
        return;
    }
    
    notes.forEach((note, index) => {
        const noteCard = document.createElement('div');
        noteCard.className = 'note-card';
        noteCard.innerHTML = `
            <h3 class="note-title">${note.title}</h3>
            <span class="note-date">${new Date(note.date).toLocaleString()}</span>
            <div class="note-content">${note.content}</div>
            <div class="note-actions">
                <button class="note-btn edit-btn" data-id="${index}"><i class="fas fa-edit"></i> Edit</button>
                <button class="note-btn delete-btn" data-id="${index}"><i class="fas fa-trash"></i> Delete</button>
                <button class="note-btn download-btn" data-id="${index}"><i class="fas fa-download"></i> Download</button>
            </div>
        `;
        notesContainer.appendChild(noteCard);
    });
    
    // Add event listeners to action buttons
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.closest('button').dataset.id);
            editNote(id);
        });
    });
    
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.closest('button').dataset.id);
            deleteNote(id);
        });
    });
    
    document.querySelectorAll('.download-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.closest('button').dataset.id);
            downloadNote(id);
        });
    });
}

function saveNote() {
    const title = document.getElementById('noteTitle').value.trim();
    const content = document.getElementById('noteContent').value.trim();
    
    if (!title || !content) {
        alert('Please enter both title and content');
        return;
    }
    
    const now = new Date();
    
    if (editNoteId !== null) {
        // Update existing note
        notes[editNoteId] = { title, content, date: now };
        editNoteId = null;
    } else {
        // Add new note
        notes.push({ title, content, date: now });
    }
    
    // Save to local storage
    localStorage.setItem('notes', JSON.stringify(notes));
    
    // Refresh display
    displayNotes();
    
    // Clear form
    document.getElementById('noteTitle').value = '';
    document.getElementById('noteContent').value = '';
    
    // Change button text back if it was in edit mode
    saveNoteBtn.textContent = 'Save Note';
}

function editNote(id) {
    const note = notes[id];
    document.getElementById('noteTitle').value = note.title;
    document.getElementById('noteContent').value = note.content;
    editNoteId = id;
    saveNoteBtn.textContent = 'Update Note';
    
    // Scroll to form
    document.getElementById('noteTitle').focus();
}

function deleteNote(id) {
    if (confirm('Are you sure you want to delete this note?')) {
        notes.splice(id, 1);
        localStorage.setItem('notes', JSON.stringify(notes));
        displayNotes();
    }
}

function downloadNote(id) {
    const note = notes[id];
    const content = `${note.title}\n\n${note.content}\n\nCreated: ${new Date(note.date).toLocaleString()}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${note.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_note.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

saveNoteBtn.addEventListener('click', saveNote);

// Motivational Quote Functionality
const quoteText = document.getElementById('quoteText');
const quoteAuthor = document.getElementById('quoteAuthor');
const refreshQuoteBtn = document.getElementById('refreshQuote');

function fetchQuote() {
    fetch('https://type.fit/api/quotes')
        .then(response => response.json())
        .then(data => {
            const randomQuote = data[Math.floor(Math.random() * data.length)];
            quoteText.textContent = `"${randomQuote.text}"`;
            quoteAuthor.textContent = randomQuote.author || 'Unknown';
        })
        .catch(error => {
            console.error('Error fetching quote:', error);
            quoteText.textContent = '"The only way to do great work is to love what you do."';
            quoteAuthor.textContent = 'Steve Jobs';
        });
}

refreshQuoteBtn.addEventListener('click', fetchQuote);

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    updateSemesterList();
    displayNotes();
    fetchQuote();
});


function toggleMenu() {
    const nav = document.getElementById('nav-links');
    nav.classList.toggle('show');
  }