import { isAdmin } from "/work/displayIfLogin.js";
isAdmin();

const Students = JSON.parse(localStorage.getItem('Students')) || [];

//DOM  Elements 
const StudentsBodyEl=document.getElementById('student-Body');
const totalStudents=document.getElementById("total-students");
const totalCoursesEnrolled=document.getElementById("Enrolled");



function renderStudentProgress(){
    try {


        StudentsBodyEl.innerHTML ='';
        Students.forEach((student) => {
            courseCount=0;
            courseCount+=student.courses.length;
          const row = document.createElement('tr');
          row.innerHTML = `
          <td>${student.id}</td>
          <td>${student.name}</td>
          <td>${student.email}</td>
          <td>${student.courses.map((c)=>c.ctitle).join(', ')}</td>
          <td>${student.courses.length}</td>
        `;
        StudentsBodyEl.appendChild(row);
      });
      totalStudents.textContent=Students.length;
      totalCoursesEnrolled.textContent=courseCount;

    } catch (error) {
        console.error('Error rendering data:', error);
    }
  }


renderStudentProgress();