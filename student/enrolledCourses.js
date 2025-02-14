import { isLogin } from "../work/displayIfLogin.js";

isLogin();

document.addEventListener('DOMContentLoaded', function() {

    let courses = JSON.parse(localStorage.getItem('courses')) || [];
    let studentCourses = (getCookie("currentUser")).courses || [];
    const enrolledCourses = courses.filter(course =>
        studentCourses.some(St_Course => St_Course.ctitle === course.title)
    );
    console.log(enrolledCourses);
    let courseContainer = document.getElementById('course-list');
    courseContainer.innerHTML = ''; 
    
    if (enrolledCourses.length > 0) {
        enrolledCourses.forEach(course => {
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

        let viewButton = document.createElement('button');
                viewButton.textContent = "view";
                viewButton.style.backgroundColor = "navy";
                viewButton.style.color = "white";
                viewButton.style.cursor = "default";
                viewButton.addEventListener("click", function() {
                    window.location.href = `/student/course/course.html?id=${course.id}`;
            });
            
        courseInfo.appendChild(courseTitle);
        courseInfo.appendChild(courseDescription);
        courseInfo.appendChild(viewButton);
        courseCard.appendChild(courseImage);
        courseCard.appendChild(courseInfo);
        courseContainer.appendChild(courseCard);
        });
    }else{
 
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



