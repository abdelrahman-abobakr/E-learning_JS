import { isLogin } from "/work/displayIfLogin.js";

isLogin();

document.addEventListener("DOMContentLoaded", () => {
  const getQueryParam = (param) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  };

  const fetchCourseDetails = () => {
    const courseId = parseInt(getQueryParam("id"));
    const courses = JSON.parse(localStorage.getItem("courses")) || [];
    const course = courses.find((c) => c.id === courseId);

    const courseInfo = document.getElementById("courseInfo");
    const videosList = document.getElementById("videosList");
    const pdfsList = document.getElementById("pdfsList");

    if (course) {
      courseInfo.innerHTML = `
        <div class="course-header">
          <h1>${course.title}</h1>
            <img src=${course.image} alt="Course Image" class="course-image">

          <p >${course.description}</p>
        </div>
      `;

      if (course.videos?.length) {
        videosList.innerHTML = course.videos
          .map(
            (video) => `
          <li class="video-item">
            <h2>${video.title}</h2>
            <div class="video-container">
              <iframe width="100%" height="500" src="${video.src}" frameborder="0" allowfullscreen></iframe>
            </div>
          </li>
        `
          )
          .join("");
      } else {
        videosList.innerHTML = `<li class="empty">No videos available.</li>`;
      }

      if (course.pdfs?.length) {
        pdfsList.innerHTML = course.pdfs
          .map(
            (pdf) => `
          <li class="pdf-item">
            <h2>${pdf.title}</h2>
            <div class="pdf-container">
              <object data="${pdf.src}" type="application/pdf" width="100%" height="500px">
                <p>Your browser does not support PDFs. <a href="${pdf.src}" target="_blank">Download the PDF</a>.</p>
              </object>
            </div>
          </li>
        `
          )
          .join("");
      } else {
        pdfsList.innerHTML = `<li class="empty">No PDFs available.</li>`;
      }
    } else {
      courseInfo.innerHTML = `<p class="error">Course not found.</p>`;
    }
  };

  fetchCourseDetails();
});


