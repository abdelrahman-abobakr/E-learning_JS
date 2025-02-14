document.addEventListener('DOMContentLoaded', function() {

    const categories = JSON.parse(localStorage.getItem('categories')) || [];
    const courses = JSON.parse(localStorage.getItem('courses')) || []; // Make sure to load courses too
    const courseList = document.getElementById('course-list');
    if (categories.length) {
        categories.forEach(category => {

            const courseCard = document.createElement('div');
            courseCard.classList.add('course-card');

            const categoryImage = document.createElement('img');
            categoryImage.src = category.image;
            categoryImage.alt = category.title;
            const categoryTitle = document.createElement('h3');
            categoryTitle.textContent = category.title;
            const courseButton = document.createElement('button');
            courseButton.setAttribute('id',category.id);
            courseButton.setAttribute('class','course-button');
            

            courseButton.textContent = 'Learn More';
            courseCard.appendChild(categoryImage);
            courseCard.appendChild(categoryTitle);
            courseCard.appendChild(courseButton);
            courseList.appendChild(courseCard);
            courseButton.onclick = function () {
            const hasCoursesInCategory = courses.filter(course => course.category === category.title);     
            if (hasCoursesInCategory.length > 0) {
                window.location.href = `maincourses.html?category=${encodeURIComponent(category.title)}`;
            } else {
                alert('No courses available in this category.');
            }
            
    } })}

    else {
        courseList.innerHTML = '<p>No categories available</p>';
    }

        })
    


