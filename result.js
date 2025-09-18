
// DOM Elements
const adminBtn = document.getElementById('adminBtn');
const adminModal = document.getElementById('adminModal');
const closeModal = document.getElementById('closeModal');
const loginForm = document.getElementById('loginForm');
const adminPanel = document.getElementById('adminPanel');
const fileUpload = document.getElementById('fileUpload');
const resultFile = document.getElementById('resultFile');
const fileInfo = document.getElementById('fileInfo');
const uploadBtn = document.getElementById('uploadBtn');
const successAlert = document.getElementById('successAlert');
const errorAlert = document.getElementById('errorAlert');
const searchForm = document.getElementById('searchForm');
const preloader = document.getElementById('preloader');
const resultContainer = document.getElementById('resultContainer');
const studentName = document.getElementById('studentName');
const displayRoll = document.getElementById('displayRoll');
const displayDob = document.getElementById('displayDob');
const displayDept = document.getElementById('displayDept');
const displaySem = document.getElementById('displaySem');
const marksTable = document.getElementById('marksTable');
const totalMarks = document.getElementById('totalMarks');
const resultStatus = document.getElementById('resultStatus');
const manualRoll = document.getElementById('manualRoll');
const manualName = document.getElementById('manualName');
const subject1 = document.getElementById('subject1');
const subject2 = document.getElementById('subject2');
const subject3 = document.getElementById('subject3');
const subject4 = document.getElementById('subject4');
const subject5 = document.getElementById('subject5');
const subject6 = document.getElementById('subject6');
const saveManualBtn = document.getElementById('saveManualBtn');
const manualSuccessAlert = document.getElementById('manualSuccessAlert');
const chatbotBtn = document.getElementById('chatbotBtn');
const chatbotWindow = document.getElementById('chatbotWindow');
const chatbotClose = document.getElementById('chatbotClose');
const chatbotMessages = document.getElementById('chatbotMessages');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotSend = document.getElementById('chatbotSend');

// // Database for storing results (in a real app, this would be server-side)
// let resultsDatabase = [
//     {
//         rollNumber: "20CS101",
//         name: "John Doe",
//         dob: "2002-05-15",
//         dept: "Computer Science",
//         sem: "V",
//         marks: [
//             { code: "CS8591", subject: "Computer Networks", marks: 92, maxMarks: 100 },
//             { code: "CS8592", subject: "Object Oriented Analysis", marks: 88, maxMarks: 100 },
//             { code: "CS8651", subject: "Internet Programming", marks: 95, maxMarks: 100 },
//             { code: "CS8691", subject: "AI & Machine Learning", marks: 89, maxMarks: 100 },
//             { code: "CS8792", subject: "Cryptography", marks: 90, maxMarks: 100 },
//             { code: "GE8761", subject: "Professional Ethics", marks: 94, maxMarks: 100 }
//         ],
//         total: 548,
//         status: "Pass"
//     },
//     {
//         rollNumber: "20CS102",
//         name: "Jane Smith",
//         dob: "2002-08-22",
//         dept: "Computer Science",
//         sem: "V",
//         marks: [
//             { code: "CS8591", subject: "Computer Networks", marks: 78, maxMarks: 100 },
//             { code: "CS8592", subject: "Object Oriented Analysis", marks: 82, maxMarks: 100 },
//             { code: "CS8651", subject: "Internet Programming", marks: 75, maxMarks: 100 },
//             { code: "CS8691", subject: "AI & Machine Learning", marks: 80, maxMarks: 100 },
//             { code: "CS8792", subject: "Cryptography", marks: 85, maxMarks: 100 },
//             { code: "GE8761", subject: "Professional Ethics", marks: 88, maxMarks: 100 }
//         ],
//         total: 488,
//         status: "Pass"
//     },
//     {
//         rollNumber: "20CS103",
//         name: "Robert Johnson",
//         dob: "2001-12-10",
//         dept: "Computer Science",
//         sem: "V",
//         marks: [
//             { code: "CS8591", subject: "Computer Networks", marks: 45, maxMarks: 100 },
//             { code: "CS8592", subject: "Object Oriented Analysis", marks: 38, maxMarks: 100 },
//             { code: "CS8651", subject: "Internet Programming", marks: 42, maxMarks: 100 },
//             { code: "CS8691", subject: "AI & Machine Learning", marks: 50, maxMarks: 100 },
//             { code: "CS8792", subject: "Cryptography", marks: 48, maxMarks: 100 },
//             { code: "GE8761", subject: "Professional Ethics", marks: 52, maxMarks: 100 }
//         ],
//         total: 275,
//         status: "Fail"
//     }
// ];
let resultsDatabase = JSON.parse(localStorage.getItem('jecResults')) || [
{
rollNumber: "110822205059",
name: "Rishi Goutham",
dob: "2004-05-05",
dept: "Information Technology",
sem: "V",
marks: [
    { code: "CS8591", subject: "Computer Networks", marks: 92, maxMarks: 100 },
    { code: "CS8592", subject: "Object Oriented Analysis", marks: 88, maxMarks: 100 },
    { code: "CS8651", subject: "Internet Programming", marks: 95, maxMarks: 100 },
    { code: "CS8691", subject: "AI & Machine Learning", marks: 89, maxMarks: 100 },
    { code: "CS8792", subject: "Cryptography", marks: 90, maxMarks: 100 },
    { code: "GE8761", subject: "Professional Ethics", marks: 94, maxMarks: 100 }
],
total: 548,
status: "Pass"
},
{
    rollNumber: "110822205088",
    name: "Yuvraj G ",
    dob: "2005-05-25",
    dept: "Information Technology",
    sem: "V",
    marks: [
        { code: "CS8591", subject: "Computer Networks", marks: 92, maxMarks: 100 },
        { code: "CS8592", subject: "Object Oriented Analysis", marks: 88, maxMarks: 100 },
        { code: "CS8651", subject: "Internet Programming", marks: 95, maxMarks: 100 },
        { code: "CS8691", subject: "AI & Machine Learning", marks: 89, maxMarks: 100 },
        { code: "CS8792", subject: "Cryptography", marks: 90, maxMarks: 100 },
        { code: "GE8761", subject: "Professional Ethics", marks: 94, maxMarks: 100 }
    ],
    total: 548,
    status: "Pass"
    },
{
rollNumber: "110822205082",
name: "Uday Kiran",
dob: "2004-12-13",
dept: "Information Technology",
sem: "V",
marks: [
    { code: "CS8591", subject: "Computer Networks", marks: 78, maxMarks: 100 },
    { code: "CS8592", subject: "Object Oriented Analysis", marks: 82, maxMarks: 100 },
    { code: "CS8651", subject: "Internet Programming", marks: 75, maxMarks: 100 },
    { code: "CS8691", subject: "AI & Machine Learning", marks: 80, maxMarks: 100 },
    { code: "CS8792", subject: "Cryptography", marks: 85, maxMarks: 100 },
    { code: "GE8761", subject: "Professional Ethics", marks: 88, maxMarks: 100 }
],
total: 488,
status: "Pass"
}
];

// Update your saveManualBtn event listener to this:
saveManualBtn.addEventListener('click', () => {
const rollNumber = manualRoll.value.trim();
const name = manualName.value.trim();
const dob = "2000-01-01"; // Default DOB for manual entries

// Get all subject marks
const marks = [
{ code: "SUB1", subject: "Subject 1", marks: parseInt(subject1.value) || 0, maxMarks: 100 },
{ code: "SUB2", subject: "Subject 2", marks: parseInt(subject2.value) || 0, maxMarks: 100 },
{ code: "SUB3", subject: "Subject 3", marks: parseInt(subject3.value) || 0, maxMarks: 100 },
{ code: "SUB4", subject: "Subject 4", marks: parseInt(subject4.value) || 0, maxMarks: 100 },
{ code: "SUB5", subject: "Subject 5", marks: parseInt(subject5.value) || 0, maxMarks: 100 },
{ code: "SUB6", subject: "Subject 6", marks: parseInt(subject6.value) || 0, maxMarks: 100 }
];

if (!rollNumber || !name) {
alert('Please enter both roll number and student name');
return;
}

// Calculate total and status
const total = marks.reduce((sum, subject) => sum + subject.marks, 0);
const status = total >= 240 ? 'Pass' : 'Fail'; // 40% of 600 (6 subjects × 100)

// Check if student already exists
const existingIndex = resultsDatabase.findIndex(s => 
s.rollNumber.toLowerCase() === rollNumber.toLowerCase()
);

const newStudent = {
rollNumber,
name,
dob,
dept: "Information Technology", // Default department
sem: "", // Default semester
marks,
total,
status
};

if (existingIndex !== -1) {
// Update existing record
resultsDatabase[existingIndex] = newStudent;
} else {
// Add new record
resultsDatabase.push(newStudent);
}

// Save to localStorage
localStorage.setItem('jecResults', JSON.stringify(resultsDatabase));

// Show success message
manualSuccessAlert.style.display = 'block';
manualSuccessAlert.textContent = `Marks saved successfully for ${rollNumber}!`;

setTimeout(() => {
manualSuccessAlert.style.display = 'none';
}, 3000);

// Clear form
manualRoll.value = '';
manualName.value = '';
subject1.value = '';
subject2.value = '';
subject3.value = '';
subject4.value = '';
subject5.value = '';
subject6.value = '';
});

// Update your searchForm event listener to this:
searchForm.addEventListener('submit', (e) => {
e.preventDefault();
const rollNumber = document.getElementById('rollNumber').value.trim();
const dob = document.getElementById('dob').value;

if (!rollNumber) {
alert('Please enter your roll number');
return;
}

preloader.style.display = 'flex';
resultContainer.style.display = 'none';

// Load fresh data from localStorage
const currentData = JSON.parse(localStorage.getItem('jecResults')) || resultsDatabase;

setTimeout(() => {
// Case-insensitive search for roll number
const student = currentData.find(s => 
    s.rollNumber.toLowerCase() === rollNumber.toLowerCase()
);

preloader.style.display = 'none';

if (student) {
    // If DOB was provided, verify it matches
    if (dob && student.dob !== dob) {
        alert('Roll number and date of birth do not match');
        return;
    }
    
    displayResult(student);
    resultContainer.style.display = 'block';
} else {
    alert(`No result found for roll number: ${rollNumber}. Make sure you've entered it correctly.`);
}
}, 800);
});
// Admin Modal
adminBtn.addEventListener('click', () => {
adminModal.style.display = 'flex';
setTimeout(() => {
adminModal.classList.add('show');
}, 10);
});

closeModal.addEventListener('click', () => {
adminModal.classList.remove('show');
setTimeout(() => {
adminModal.style.display = 'none';
}, 300);
});

// Login Form
loginForm.addEventListener('submit', (e) => {
e.preventDefault();
const username = document.getElementById('username').value;
const password = document.getElementById('password').value;

// Simple validation (in real app, this would be server-side)
if (username === 'admin' && password === 'admin123') {
adminModal.classList.remove('show');
setTimeout(() => {
    adminModal.style.display = 'none';
}, 300);
adminPanel.style.display = 'block';
document.getElementById('username').value = '';
document.getElementById('password').value = '';
} else {
alert('Invalid credentials. Try admin/admin123 for demo.');
}
});

// File Upload
resultFile.addEventListener('change', () => {
if (resultFile.files.length > 0) {
fileInfo.textContent = resultFile.files[0].name;
} else {
fileInfo.textContent = 'No file selected';
}
});

uploadBtn.addEventListener('click', () => {
if (!resultFile.files.length) {
errorAlert.textContent = 'Please select a file first';
errorAlert.style.display = 'block';
setTimeout(() => {
    errorAlert.style.display = 'none';
}, 3000);
return;
}

// Simulate file upload
uploadBtn.disabled = true;
uploadBtn.textContent = 'Uploading...';

setTimeout(() => {
// In a real app, this would parse the file and update the database
successAlert.style.display = 'block';
uploadBtn.disabled = false;
uploadBtn.textContent = 'Upload Results';

setTimeout(() => {
    successAlert.style.display = 'none';
}, 5000);
}, 2000);
});

// Student Search
searchForm.addEventListener('submit', (e) => {
e.preventDefault();
const rollNumber = document.getElementById('rollNumber').value.trim();
const dob = document.getElementById('dob').value;

if (!rollNumber || !dob) {
alert('Please enter both roll number and date of birth');
return;
}

preloader.style.display = 'flex';
resultContainer.style.display = 'none';

// Simulate API call
setTimeout(() => {
const student = resultsDatabase.find(s => 
    s.rollNumber.toLowerCase() === rollNumber.toLowerCase() && s.dob === dob
);

preloader.style.display = 'none';

if (student) {
    displayResult(student);
    resultContainer.style.display = 'block';
} else {
    alert('No result found for the provided details. Try Roll: 20CS101, DOB: 2002-05-15 for demo.');
}
}, 1500);
});

function displayResult(student) {
studentName.textContent = student.name;
displayRoll.textContent = student.rollNumber;
displayDob.textContent = formatDate(student.dob);
displayDept.textContent = student.dept;
displaySem.textContent = student.sem;

// Clear previous marks
marksTable.innerHTML = '';

// Add new marks
let total = 0;
student.marks.forEach(subject => {
const row = document.createElement('tr');
row.innerHTML = `
    <td>${subject.code}</td>
    <td>${subject.subject}</td>
    <td>${subject.marks}</td>
    <td>${subject.maxMarks}</td>
`;
marksTable.appendChild(row);
total += subject.marks;
});

// Calculate pass/fail status (assuming pass mark is 40% of total)
const maxTotal = student.marks.reduce((sum, subject) => sum + subject.maxMarks, 0);
const passMark = maxTotal * 0.4;
const status = total >= passMark ? 'Pass' : 'Fail';

totalMarks.textContent = `${total}/${maxTotal}`;
resultStatus.textContent = status;
resultStatus.className = `result-status ${status.toLowerCase()}`;
}

function formatDate(dateString) {
const date = new Date(dateString);
return date.toLocaleDateString('en-IN', {
year: 'numeric',
month: '2-digit',
day: '2-digit'
});
}

// Manual Entry
saveManualBtn.addEventListener('click', () => {
const rollNumber = manualRoll.value.trim();
const name = manualName.value.trim();
const marks = [
{ code: "SUB1", subject: "Subject 1", marks: parseInt(subject1.value) || 0, maxMarks: 100 },
{ code: "SUB2", subject: "Subject 2", marks: parseInt(subject2.value) || 0, maxMarks: 100 },
{ code: "SUB3", subject: "Subject 3", marks: parseInt(subject3.value) || 0, maxMarks: 100 },
{ code: "SUB4", subject: "Subject 4", marks: parseInt(subject4.value) || 0, maxMarks: 100 },
{ code: "SUB5", subject: "Subject 5", marks: parseInt(subject5.value) || 0, maxMarks: 100 },
{ code: "SUB6", subject: "Subject 6", marks: parseInt(subject6.value) || 0, maxMarks: 100 }
];

if (!rollNumber || !name) {
alert('Please enter both roll number and student name');
return;
}

// Calculate total and status
const total = marks.reduce((sum, subject) => sum + subject.marks, 0);
const maxTotal = marks.reduce((sum, subject) => sum + subject.maxMarks, 0);
const passMark = maxTotal * 0.4;
const status = total >= passMark ? 'Pass' : 'Fail';

// Check if student already exists
const existingIndex = resultsDatabase.findIndex(s => s.rollNumber.toLowerCase() === rollNumber.toLowerCase());

const newStudent = {
rollNumber,
name,
dob: "2000-01-01", // Default DOB for manual entries
dept: "Computer Science", // Default department
sem: "V", // Default semester
marks,
total,
status
};

if (existingIndex !== -1) {
// Update existing record
resultsDatabase[existingIndex] = newStudent;
} else {
// Add new record
resultsDatabase.push(newStudent);
}

// Show success message
manualSuccessAlert.style.display = 'block';
setTimeout(() => {
manualSuccessAlert.style.display = 'none';
}, 3000);

// Clear form
manualRoll.value = '';
manualName.value = '';
subject1.value = '';
subject2.value = '';
subject3.value = '';
subject4.value = '';
subject5.value = '';
subject6.value = '';
});

// Chatbot
chatbotBtn.addEventListener('click', () => {
chatbotWindow.style.display = 'flex';
});

chatbotClose.addEventListener('click', () => {
chatbotWindow.style.display = 'none';
});

chatbotSend.addEventListener('click', sendMessage);
chatbotInput.addEventListener('keypress', (e) => {
if (e.key === 'Enter') {
sendMessage();
}
});

function sendMessage() {
const message = chatbotInput.value.trim();
if (!message) return;

// Add user message
addMessage(message, 'user');
chatbotInput.value = '';

// Generate bot response
setTimeout(() => {
const response = generateResponse(message);
addMessage(response, 'bot');
}, 500);
}

function addMessage(text, sender) {
const message = document.createElement('div');
message.className = `message ${sender}-message`;
message.textContent = text;
chatbotMessages.appendChild(message);
chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function generateResponse(message) {
const lowerMsg = message.toLowerCase();

if (lowerMsg.includes('how to check') || lowerMsg.includes('check result')) {
return "To check your internal assessment result, enter your roll number and date of birth in the search form and click 'Get Result'.";
} else if (lowerMsg.includes('anna university') || lowerMsg.includes('semester result')) {
return "For Anna University semester results, visit the official portal using the link in the Anna University Results section below.";
} else if (lowerMsg.includes('not loading') || lowerMsg.includes('not working')) {
return "If your result isn't loading, please check your details and try again. If the problem persists, contact the examination department at exam@jayaengg.edu or call +91 9876543210.";
} else if (lowerMsg.includes('contact') || lowerMsg.includes('support') || lowerMsg.includes('help')) {
return "You can contact the examination department:\n- Email: exam@jayaengg.edu\n- Phone: +91 9876543210\n- Office: Room 101, Admin Block, 9AM-5PM Mon-Fri";
} else if (lowerMsg.includes('internal') || lowerMsg.includes('assessment')) {
return "Internal assessments are conducted monthly and carry 20% weightage of your total marks. Results are published within 7 days after each assessment.";
} else if (lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg.includes('hey')) {
return "Hello! Welcome to Jaya Engineering College result portal. How can I assist you today?";
} else if (lowerMsg.includes('revaluation') || lowerMsg.includes('recheck')) {
return "For revaluation of internal assessments, submit an application to your department head within 3 days of result publication with a fee of ₹100 per paper.";
} else {
return "I'm sorry, I didn't understand that. I can help with:\n- Checking internal assessment results\n- Anna University results\n- Contacting support\n- Information about revaluation";
}
}

// Initialize with Anna University section open
document.addEventListener('DOMContentLoaded', () => {
// Any initialization code if needed
});


//menu toggel


  

