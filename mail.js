// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAPYzjQzHar5H2mmobR6dkDWml5pUAR-T4",
    authDomain: "workforce-ms.firebaseapp.com",
    databaseURL: "https://workforce-ms-default-rtdb.firebaseio.com",
    projectId: "workforce-ms",
    storageBucket: "workforce-ms.appspot.com",
    messagingSenderId: "1070252157346",
    appId: "1:1070252157346:web:791c2176ccd98c7ec1aafb",
    measurementId: "G-MDC15KJJB1"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const AttendanceDB = firebase.database().ref("Attendance");

// Event listener for the attendance form submission
document.getElementById("Attendance").addEventListener("submit", submitForm);

function submitForm(e) {
    e.preventDefault();

    var name = getElementVal("Name");
    var entryTime = getElementVal("Entry_Time");
    var date = getElementVal("Date");
    console.log(name, entryTime, date);

    saveMessages(name, entryTime, date);

    document.querySelector('.alert').style.display = "block";
    setTimeout(() => {
        document.querySelector('.alert').style.display = "none";
    }, 3000);

    document.getElementById("Attendance").reset();
}

// Function to get element values
const getElementVal = (id) => { 
    return document.getElementById(id).value;
};

// Function to save attendance data to Firebase
const saveMessages = (name, entryTime, date) => {
    var newAttendance = AttendanceDB.push();
    newAttendance.set({
        Name: name,
        Entry_Time: entryTime,
        Date: date,
    });
};