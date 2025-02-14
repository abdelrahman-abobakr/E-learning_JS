import { isAdmin } from "/work/displayIfLogin.js";
isAdmin();


let courses = JSON.parse(localStorage.getItem('courses')) || [];
let idCount= courses.length ? Math.max(...courses.map(course => course.id)) + 1 : 1;    
let videos = []; 
let pdfs=[];
let editingId=null;
let mood;
let categories = JSON.parse(localStorage.getItem('categories')) || [];
let categoryElement=document.getElementById('category');
categories.forEach((category)=>{
let el = document.createElement("option");
el.textContent = category.title;
el.value = category.title;
categoryElement.appendChild(el);
});

//DOM Elements 
  const title=document.getElementById('title');
  const category=document.getElementById('category');
  const modal = document.getElementById('course-modal');

  const price=document.getElementById('price');
  const duration=document.getElementById('duration');
  const description=document.getElementById('description');
  const instructor=document.getElementById('instructor');
  const image=document.getElementById('image');
  const courseForm=document.getElementById('course-form');
  const videoForm=document.getElementById('video-form');
  const pdfForm=document.getElementById('pdf-form');
  const totalCourses=document.getElementById('total-courses');
  const addVideo=document.getElementById('add-video')
  const addPdf=document.getElementById('add-pdf')
  const addCourseBtn=document.getElementById('add-course-btn')
  const closeBtn=document.querySelector('.close')
  const deleteAll=document.getElementById('delete');
  const coursesBodyEl = document.getElementById('courses-Body');
  const modalTitle = document.getElementById('modal-title');
  const searchInput=document.getElementById('search');


// Event Listners
  deleteAll.addEventListener('click',deleteAllCourses)
  addCourseBtn.addEventListener('click', () => openModal('add'))
  closeBtn.addEventListener('click',closeModal)
  courseForm.addEventListener('submit',handleFormSubmit)
  addPdf.addEventListener('click',addPdfField)
  addVideo.addEventListener('click',addVideoField)
  window.addEventListener('click',(e)=>{
  if(e.target===modal) {closeModal()}})
  searchInput.addEventListener('input', function () {
      searchData(this.value);
  });



// Functions
function addVideoField(titleValue = "", srcValue = "", includeRemoveButton = true) {
  if (typeof titleValue !== "string") titleValue = "";
  if (typeof srcValue !== "string") srcValue = "";

  let container = document.createElement("div");
  container.setAttribute("class", "video-container");

  let titleLabel = document.createElement("label");
  titleLabel.textContent = "Video Title: ";
  titleLabel.setAttribute("class", "labels");

  let title = document.createElement("input");
  title.setAttribute("type", "text");
  title.setAttribute("class", "video-title");
  title.setAttribute("placeholder", "Enter video title");
  title.value = titleValue;

  let srcLabel = document.createElement("label");
  srcLabel.textContent = "Video URL: ";
  srcLabel.setAttribute("class", "labels");

  let src = document.createElement("input");
  src.setAttribute("type", "text");
  src.setAttribute("class", "videos-src");
  src.setAttribute("placeholder", "Enter video URL");
  src.value = srcValue;

  container.appendChild(titleLabel);
  container.appendChild(title);
  container.appendChild(srcLabel);
  container.appendChild(src);

  if (includeRemoveButton) {
    let removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove Video";
    removeBtn.setAttribute("class", "remove-btn");
    removeBtn.onclick = function () {

      container.remove();
    };
    container.appendChild(removeBtn);
  }

  videoForm.appendChild(container);
}

function addPdfField(titleValue = "", srcValue = "",includeRemoveButton=true) {
  if (typeof titleValue !== "string") titleValue = "";
  if (typeof srcValue !== "string") srcValue = "";

  let container = document.createElement('div');
  container.setAttribute('class', 'pdf-container');

  let titleLabel = document.createElement('label');
  titleLabel.setAttribute('class', 'labels');
  titleLabel.setAttribute('for', 'pdf-title');
  titleLabel.textContent = 'Pdf Title: ';
  
  let title = document.createElement('input');
  title.setAttribute('type', 'text');
  title.setAttribute('class', 'pdf-title');
  title.setAttribute('placeholder', 'Enter PDF title');
  title.value = titleValue;

  let srcLabel = document.createElement('label');
  srcLabel.setAttribute('for', 'pdf-src');
  srcLabel.setAttribute('class', 'labels');
  srcLabel.textContent = 'Pdf URL: ';
  
  let src = document.createElement('input');
  src.setAttribute('type', 'text');
  src.setAttribute('class', 'pdf-src');
  src.setAttribute('placeholder', 'Enter PDF URL');
  src.value = srcValue;

  container.appendChild(titleLabel);
  container.appendChild(title);
  container.appendChild(srcLabel);
  container.appendChild(src);

  if (includeRemoveButton) {
    let removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove PDF";
    removeBtn.setAttribute("class", "remove-btn");
    removeBtn.onclick = function () {
      container.remove();  

    
    };
    container.appendChild(removeBtn);
  }

  pdfForm.appendChild(container);
}

  function handleFormSubmit(e){

    e.preventDefault();
    videos = []; 
    const  videoTitles = document.querySelectorAll('.video-title');
    const videoSources = document.querySelectorAll('.videos-src');
        videoTitles.forEach((titleInput, index) => {
            let title = titleInput.value;
            let src = videoSources[index].value;
            if (title && src) {
                videos.push({ title, src });
            }
        });

        let pdfTitles = document.querySelectorAll('.pdf-title');
        let pdfSources = document.querySelectorAll('.pdf-src');
        pdfs = []; 

        pdfTitles.forEach((titleInput, index) => {
            let title = titleInput.value;
            let src = pdfSources[index].value;
            if (title && src) {
                pdfs.push({ title, src });
            }
        });

        if(videos.length===0||pdfs.length===0){
          alert("You Should Add  At Least One Video And One Pdf");
          return;
        }

        let course= {
            id: mood === 'edit' ? editingId : idCount++,           
            title:title.value.toLowerCase(),
            price:price.value,
            category:category.value.toLowerCase(),
            duration:duration.value,
            description:description.value,
            instructor:instructor.value,
            image:image.value,
            videos: videos,
            pdfs:pdfs,
            
            }
            if (mood==='edit') {
              const index = courses.findIndex(c => c.id === editingId);
              courses[index] = course;
            } else {
              let coursesTitle=[];
              courses.forEach((course,index)=>coursesTitle[index]=course.title)
              if(coursesTitle.includes(title.value)){
                alert("You Added This Course Before");
                idCount--;
                return;
               }
              courses.push(course);
            }
          
               
            saveToLocalStorage(courses);
            renderCourses();
            closeModal();

}


  



function saveToLocalStorage(courses) {
    try {
      localStorage.setItem('courses', JSON.stringify(courses));
    } catch (error) {
      console.error('LocalStorage error:', error);
      alert('Error saving data to browser storage!');
    }
  }




  function openModal(action, i) {
    try {
      modal.style.display = 'block';
  
      if (action === 'edit') {
        const courseToEdit=courses.find((course)=>course.id===i);
        modalTitle.textContent = 'Edit Course';
        title.value = courseToEdit.title.toLowerCase();
        price.value = courseToEdit.price;
        category.value =courseToEdit.category.toLowerCase();
        duration.value = courseToEdit.duration;
        description.value = courseToEdit.description;
        instructor.value = courseToEdit.instructor;
        image.value = courseToEdit.image;
  
        courseToEdit.videos.forEach(video => {

          addVideoField(video.title, video.src,true);
        });
    
  
      courseToEdit.pdfs.forEach(pdf => {
          addPdfField(pdf.title, pdf.src,true);
        });
  
        editingId = i;
        mood = 'edit';
  
      } else {
        modalTitle.textContent = 'Add new Course';
        courseForm.reset();
        removeField();
        mood='add';
        editingId = null;
        
      }
    } catch (error) {
      console.error('Error opening modal:', error);
      alert('Error opening form!');
    }
  }

   



  function searchData(value){

    if(!value){
      location.reload(); 

    }
    let table='';
        for(let i=0;i< courses.length;i++){
         if(courses[i].title.includes(value.toLowerCase()) ){
           table= `     <td><img src=${courses[i].image} style=";
          width: 50px;"></td> 
          <td>${courses[i].id}</td>
          <td>${courses[i].title}</td>
          <td>${courses[i].instructor}</td>
          <td>${courses[i].description}</td>
          <td>${courses[i].duration} hours</td>
          <td>$${courses[i].price}</td>
          <td>$${courses[i].category}</td>
          <td class="action-buttons">
            <button class="edit-btn" onclick="openModal('edit',${courses[i].id})">Edit</button>
            <button class="delete-btn" onclick="deleteCourse(${i})">Delete</button>
          </td>
          
  `;

        
         }

        }

       coursesBodyEl.innerHTML=table;

      }


  function closeModal() {
    courseForm.reset();
    modal.style.display = 'none';
    removeField();
  }



 function renderCourses(){
    try {


        coursesBodyEl.innerHTML = '';
     courses.forEach((course,index)=>{

          const row = document.createElement('tr');
          row.innerHTML = `
          <td><img src=${course.image} style=";
          width: 50px; height:50px"></td> 
          <td>${course.id}</td>
          <td>${course.title}</td>
          <td>${course.instructor}</td>
          <td>${course.description}</td>
          <td>${course.duration} hours</td>
          <td>${course.price}</td>
          <td>${course.category}</td>
          <td class="action-buttons">
            <button class="edit-btn" onclick="openModal('edit',${course.id})">Edit</button>
            <button class="delete-btn" onclick="deleteCourse(${index})">Delete</button>
          </td>
          
        ` ;       coursesBodyEl.appendChild(row);
      });
  
      totalCourses.textContent = courses.length;}
     catch (error) {
      console.error('Error rendering courses:', error);
      alert('Error loading course data!');
    }}
  

  
    function removeField() {
      document.querySelectorAll('.video-container, .pdf-container').forEach(container => container.remove());
  }


  function deleteCourse(index) {
    try {
      if (!confirm('Are you sure you want to delete this course?')) return;
      
    courses.splice(index,1)
      saveToLocalStorage(courses);
      renderCourses();
    } catch (error) {
      console.error('Error deleting course:', error);
      alert('Error deleting course!');
    }
  }



  function deleteAllCourses(){
    
  localStorage.clear('courses');
  location.reload(); 

  renderCourses();



  }



  

  document.addEventListener('DOMContentLoaded', renderCourses);

