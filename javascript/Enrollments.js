import { isAdmin } from "/work/displayIfLogin.js";
isAdmin();


const Enrollments = JSON.parse(localStorage.getItem('Enrollments')) || [];
let courses = JSON.parse(localStorage.getItem('courses')) || [];
const students = JSON.parse(localStorage.getItem('Students')) || [];
//DOM  Elements 
const EnrollmentsBodyEl = document.getElementById('Enrollments-Body');
const totalEnrollments=document.getElementById("total-students");
    


function saveToLocalStorage(data) {
    try {
        localStorage.setItem('Enrollments', JSON.stringify(data));
    } catch (error) {   
        console.error('LocalStorage error:', error);
        alert('Error saving data to browser storage!');
    }
}

function renderEnrollments() {
    try {
        EnrollmentsBodyEl.innerHTML = '';
        
        Enrollments.forEach((enrollment,index) => {
            let StudentToEdit = students.find((student) => student.id == enrollment.StudentID);  
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <div class="wrapper">
                        <div class="bell" id="bell-${index}">
                            <div class="anchor material-icons layer-1">notifications_active</div>
                            <div class="anchor material-icons layer-2">notifications</div>
                            <div class="anchor material-icons layer-3">notifications</div>
                        </div>
                    </div>
                </td>  
                <td>${StudentToEdit.name}</td>
                <td>${enrollment.CourseTitle}</td>
                <td class="action-buttons">
                    <button class="Accept-btn" onclick="handleRequests('${enrollment.StudentID}','${enrollment.CourseTitle}')">Accept</button>
                    <button class="Reject-btn" onclick=handleRequests(${enrollment.StudentID})>Reject</button>
                </td>
            `;
            EnrollmentsBodyEl.appendChild(row);
        });

    } catch (error) {
        console.error('Error rendering Enrollments:', error);
    }
}


function handleRequests(sid,ctitle){
console.log(sid);
console.log(students)

 let StudentToEdit = students.find((student) => student.id == sid);
console.log(StudentToEdit);

if (StudentToEdit) {
    if (ctitle) {
        StudentToEdit.courses.push({ctitle,progress:0});
        alert(`Enrollment accepted for student id ${sid}`);

    } else {
       alert(`Enrollment rejected for student id ${sid}`);
    }
    
try {
    localStorage.setItem('Students', JSON.stringify(students));
} catch (error) {   
    console.error('LocalStorage error:', error);
    alert('Error saving data to browser storage!');
}

const index=Enrollments.findIndex((enrollment)=>enrollment.StudentID===sid);
Enrollments.splice(index,1);
saveToLocalStorage(Enrollments);
setInterval(() => {
    EnrollmentsBodyEl.classList.add("hidden");
  }, 1000);


}}


renderEnrollments();