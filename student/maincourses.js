import { isLogin, isAdmin } from "../work/displayIfLogin.js";


document.addEventListener('DOMContentLoaded', function() {
    isLogin();

    let courses = JSON.parse(localStorage.getItem('courses')) || [];
    let courseContainer = document.getElementById('course-list');
    courseContainer.innerHTML = ''; 
    if (courses.length > 0) {
        courses.forEach(course => {
        let courseCard = document.createElement('div');
        courseCard.classList.add('course-card');
        let courseImage = document.createElement('img');
            courseImage.src = course.image || ''; 
            courseImage.alt = course.title;

        let courseInfo = document.createElement('div');
            courseInfo.classList.add('course-info');

        let courseTitle = document.createElement('h3');
            courseTitle.textContent = course.title;
        let courseDescription = document.createElement('p');
            courseDescription.textContent = course.description || 'No description available.';

        let coursePrice = document.createElement('span');
            coursePrice.classList.add('course-price');
            coursePrice.textContent = course.price > 0 ? course.price : 'Free';


        let enrollButton = document.createElement('button');

            enrollButton.textContent = 'Enroll';
            let status = getStatus(course);

            if (status === 'pending') {
                enrollButton.textContent = "Pending";
                enrollButton.style.backgroundColor = "gray";
                enrollButton.disabled = true; 
            } else if (status === 'enrolled') {
                enrollButton.textContent = "view";
                enrollButton.style.backgroundColor = "navy";
                enrollButton.style.color = "white";
                enrollButton.style.cursor = "default";
            }
            enrollButton.addEventListener("click", function() {
                enroll(course, enrollButton, paymentButton);
            });
            


        let paymentButton = document.createElement('button');
            paymentButton.textContent = 'Purchase';
            paymentButton.style.marginTop = '5px';
            paymentButton.style.display = "none";

        courseInfo.appendChild(courseTitle);
        courseInfo.appendChild(courseDescription);
        courseInfo.appendChild(coursePrice);
        courseInfo.appendChild(enrollButton);
        courseInfo.appendChild(paymentButton);
        courseCard.appendChild(courseImage);
        courseCard.appendChild(courseInfo);
        courseContainer.appendChild(courseCard);
        });
    }
 else 
 {
 
        let noCoursesMessage = document.createElement('p');
        noCoursesMessage.textContent = 'No courses available.';
        courseContainer.appendChild(noCoursesMessage);
    }
});


function getCookie(name) {
    let cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
        let [key, value] = cookie.split("=");
        if (key === name) return JSON.parse(decodeURIComponent(value));
    }
    return null;
}

// helper function to set the cookies of current user
function setCookie(name, value, hours) {
    let date = new Date();
    date.setTime(date.getTime() + (hours * 60 * 60 * 1000)); // Time in milliseconds
    let expires = "expires=" + date.toUTCString();
  
    document.cookie = `${name}=${JSON.stringify(value)}; ${expires}; path=/`;
}


// making enrollment request object

function makeEnrollment(studentId, courseTitle){
    let Enrollments = JSON.parse(localStorage.getItem("Enrollments")) || [];

    let enrollment = {
        StudentID: studentId,
        CourseTitle: courseTitle,
    };

    Enrollments.push(enrollment);
    localStorage.setItem("Enrollments", JSON.stringify(Enrollments));
}


function getStatus(course){

    let currentuser = getCookie("currentUser");
    let enrollments = JSON.parse(localStorage.getItem("Enrollments")) ||[];
    let enrolledCourse = enrollments.find(enrollment => enrollment.StudentID === currentuser.id && enrollment.CourseTitle === course.title);
    let joinedCourse = currentuser.courses.find(studentCourse => studentCourse.ctitle === course.title );

    if(currentuser.courses.find(studentCourse => studentCourse.ctitle === course.title )){
        return 'enrolled';
    }
    if(enrolledCourse){
        return 'pending';
    }else{
        return 'notEnrolled';
    }
}


function enroll(course, enrollButton, paymentButton){
    
    let currentStudent = getCookie("currentUser");
    if(getStatus(course) === "notEnrolled"){
        enrollButton.textContent = "enroll";
        enrollButton.style.backgroundColor = "navy";  
        enrollButton.style.cursor = "default";  
        
        if(course.price == '0'){
            enrollButton.textContent = "Pending";
            enrollButton.style.backgroundColor = "gray";
            enrollButton.disabled = true; 
            makeEnrollment(currentStudent.id, course.title);    
        }else{
            enrollButton.textContent = "Pending";
            enrollButton.style.backgroundColor = "gray";
            enrollButton.disabled = true; 
            paymentButton.style.display = "";
            paymentButton.addEventListener("click", function(event){
                window.location.href = `/student/payment.html?price=${course.price}&title=${course.title}`;
            });
        }

        enrollButton.onclick = () => { 
            window.location.href = `/student/course.html?courseId=${course.id}`;
        };
    }else if(getStatus(course)=== 'enrolled'){
        enrollButton.textContent = "view";
        enrollButton.style.backgroundColor = "navy";  
        enrollButton.style.color = "white";  
        enrollButton.style.cursor = "default";
        window.location.href = `/student/course/course.html?id=${course.id}`;
    }else{
        enrollButton.textContent = "Pending";
        enrollButton.style.backgroundColor = "gray";
        enrollButton.disabled = true; 
    }
}