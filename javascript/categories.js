import { isAdmin } from "/work/displayIfLogin.js";
isAdmin();

let categories = JSON.parse(localStorage.getItem('categories')) || [];
let idCount= categories.length ? Math.max(...categories.map(categories => categories.id)) + 1 : 1;    
let editingId=null;
let mood;

//DOM Elements 
const title=document.getElementById('title');

const modal = document.getElementById('category-modal');
const modalTitle = document.getElementById('modal-title');

const categoryForm=document.getElementById('category-form');
const addCategoryeBtn=document.getElementById('add-category-btn');
const deleteAll=document.getElementById('delete');
const closeBtn=document.querySelector('.close')
const categoryBodyEl = document.getElementById('category-Body');
const totalCategories=document.getElementById('total-categories');
const searchInput=document.getElementById('search');
const image=document.getElementById('img');
const description=document.getElementById('Desc');


// Event Listners
  deleteAll.addEventListener('click',deleteAllCategories)
  addCategoryeBtn.addEventListener('click', () => openModal('add'))
  closeBtn.addEventListener('click',closeModal)
  categoryForm.addEventListener('submit',handleFormSubmit)
  window.addEventListener('click',(e)=>{
  if(e.target===modal) {closeModal()}})
  searchInput.addEventListener('input', function () {
    searchData(this.value);
  });

 
// function to handle form submit 
  function handleFormSubmit(e){
    e.preventDefault();

let category= {
    id: mood === 'edit' ? editingId : idCount++,  
      title:title.value,
      image:image.value,
      description:description.value,
      }


  if (mood==='edit') {
    const index = categories.findIndex(c => c.id === editingId);
    categories[index] = category;
  } else {
    let categoriesTitle=[];
              categories.forEach((category,index)=>categoriesTitle[index]=category.title)
              if(categoriesTitle.includes(title.value)){
                alert("You Added This Category Before");
                idCount--;
                return;
               } 
    categories.push(category);
  }


saveToLocalStorage(categories);
closeModal();
renderCategories();

}


// function save categories to localstorage
function saveToLocalStorage(categories) {
    try {
      localStorage.setItem('categories', JSON.stringify(categories));
    } catch (error) {
      console.error('LocalStorage error:', error);
      alert('Error saving data to browser storage!');
    }
  }



  function searchData(value){

    if(!value){
      location.reload(); 

    }
    let table='';
        for(let i=0;i< categories.length;i++){
         if(categories[i].title.includes(value.toLowerCase()) ){
           table= `
            <td><img src=${categories[i].image} style="border-radius: 50%;
          width: 50px;"></td>  
          <td>${categories[i].id}</td>
          <td>${categories[i].title}</td>
          <td>${categories[i].description}</td>
          <td class="action-buttons">
            <button class="edit-btn" onclick="openModal('edit',${categories[i].id})">Edit</button>
            <button class="delete-btn" onclick="deleteCategory(${i})">Delete</button>
          </td>
          
  `;

        
         }

        }

       categoryBodyEl.innerHTML=table;

      }


function openModal(action,i){
   try {
        modal.style.display = 'block';
      if (action === 'edit') {
        const categoryToEdit=categories.find((category)=>category.id===i);
        modalTitle.textContent = 'Edit category';
        title.value =categoryToEdit.title.toLowerCase(); 
        image.value = categoryToEdit.image.toLowerCase(); 
        description.value = categoryToEdit.description.toLowerCase(); 
        editingId=i;
        mood='edit';}
        else {
          modalTitle.textContent = 'Add new category';
          categoryForm.reset();
          mood='add';
        editingId = null;
        }
      } catch (error) {
        console.error('Error opening modal:', error);
        alert('Error opening form!');
      }


  
}

function closeModal() {
  modal.style.display = 'none';
}


 function renderCategories(){
    try {


        categoryBodyEl.innerHTML = '';
        categories.forEach((category,index) => {
          const row = document.createElement('tr');
          row.innerHTML = `
          <td><img src=${category.image} style="border-radius: 50%;
          width: 50px;"></td>  
          <td>${category.id}</td>
          <td>${category.title}</td>
          <td>${category.description}</td>
            <td class="action-buttons">
            <button class="edit-btn" onclick="openModal('edit',${category.id})">Edit</button>
            <button class="delete-btn" onclick="deleteCategory(${index})">Delete</button>
          </td>
        `;
        categoryBodyEl.appendChild(row);
      });
      totalCategories.textContent=categories.length;

    } catch (error) {
      console.error('Error rendering categories:', error);
      //    alert('Error loading categories data!');
    }
  }



  function deleteCategory(index) {
    try {
      if (!confirm('Are you sure you want to delete this categories?')) return;
      
    categories.splice(index,1)
      saveToLocalStorage(categories);
      renderCategories();
    } catch (error) {
      console.error('Error deleting categories:', error);
      alert('Error deleting category!');
    }
  }
  
  
function deleteAllCategories(){
  
localStorage.clear('categories');
location.reload(); 

renderCategories();



}
  document.addEventListener('DOMContentLoaded', renderCategories);

document.getElementById("logout-btn").addEventListener("click", function(){
  document.cookie = "currentUser=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
});