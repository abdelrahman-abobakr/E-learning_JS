// Store Admins in Local Storage
var Admins = [
  { name: "abdelrahman", email: "abdo@gmail.com", password: "123123" },
  { name: "omar", email: "omar@gmail.com", password: "123123" },
  { name: "heba", email: "heba@gmail.com", password: "123123" },
  { name: "amira", email: "amira@gmail.com", password: "123123" },
];
localStorage.setItem("Admins", JSON.stringify(Admins));

// Initialize student index
var index = JSON.parse(localStorage.getItem("studentIndex")) || 1;
function generateId() {
  let newId = index;
  index++;
  localStorage.setItem("studentIndex", JSON.stringify(index));
  return newId;
}

// Regular expressions for validation
const usernameRegex = /^[a-zA-Z0-9_]{5,}$/;
const passwordRegex = /^[A-Za-z\d@$!%*?&]{5,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Function to assign student
function assignStudent(username, password, email) {
  let Students = JSON.parse(localStorage.getItem("Students")) || [];

  let student = {
    id: generateId(),
    name: username,
    email: email,
    password: password,
    courses: [],
  };

  Students.push(student);
  localStorage.setItem("Students", JSON.stringify(Students));
}

//  Set cookie helper function
function setCookie(name, value, hours) {
  let date = new Date();
  date.setTime(date.getTime() + hours * 60 * 60 * 1000);
  let expires = "expires=" + date.toUTCString();
  document.cookie = `${name}=${JSON.stringify(value)}; ${expires}; path=/`;
}

//            Signup
document.getElementById("SignupForm").addEventListener("submit", function (event) {
  event.preventDefault();

  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let email = document.getElementById("email").value;

  if (!usernameRegex.test(username)) {
    alert("Username must be at least 5 characters long and contain only alphanumeric characters or underscores.");
    return;
  }
  
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  if (!passwordRegex.test(password)) {
    alert("Password must be at least 5 characters long and can include special characters.");
    return;
  }

  assignStudent(username, password, email);
  alert("Sign-up successful!");
  window.location.href = "./login.html";

});

//            Login
function Login(event){
  event.preventDefault();

  let password = document.getElementById("password").value;
  let email = document.getElementById("email").value;

  let students = JSON.parse(localStorage.getItem("Students")) || [];
  let admins = JSON.parse(localStorage.getItem("Admins")) || [];

  let student = students.find((student) => student.email === email && student.password === password);
  let admin = admins.find((admin) => admin.email === email && admin.password === password);

  if (student) {
    setCookie("currentUser", student, 10);
    window.location.href = "../student/maincourses.html";
  } else if (admin) {
    setCookie("currentUser", admin, 10);
    window.location.href = "/html/courses.html";
  } else {
    alert("Invalid email or password.");
  }
}

