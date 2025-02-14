let menuBtn = document.querySelector('#menu-btn');
let navbar = document.querySelector('.header .headersection .navbar');
menuBtn.onclick = () => {
    menuBtn.classList.toggle('fa-times');
    navbar.classList.toggle('active');
}

var swiper = new Swiper(".course-slider", {
    spaceBetween: 20,
    grabCursor:true,
    loop:true,
   
    pagination: {
      el: ".swiper-pagination",
      clickable:true,
    },
    breakpoints: {
        640: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      },
  });
  var swiper = new Swiper(".reviews-slider", {
    spaceBetween: 20,
    grabCursor:true,
    loop:true,
   
    pagination: {
      el: ".swiper-pagination",
      clickable:true,
    },
    breakpoints: {
        640: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      },
  });
  document.addEventListener('DOMContentLoaded', function() {
    // Get all the category slides
    const categorySlides = document.querySelectorAll('.swiper-slide');

    // Add click event listener to each slide
    categorySlides.forEach(slide => {
        slide.addEventListener('click', function() {
            // Get the category data from the data-category attribute
            const category = slide.getAttribute('data-category');
            
            // Redirect to the category page
            window.location.href = `../welcomePage/maincategories.html`;  // Assuming the category page is named as the category name
        });
    });
});

