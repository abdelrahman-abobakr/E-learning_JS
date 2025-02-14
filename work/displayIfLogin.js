function getCookie(name) {
  let cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
      let [key, value] = cookie.split("=");
      if (key === name) return JSON.parse(decodeURIComponent(value));
  }
  return null;
}

function isLogin(){
    let currentUser = getCookie("currentUser");

    if(! currentUser){
        console.log('you are not allowed')
        window.location.href='/work/notAllowed.html';
    }
}

function isAdmin(){
    let currentUser = getCookie("currentUser");
    let admins = JSON.parse(localStorage.getItem("Admins"));

    let currentAdmin = admins.find(admin => admin.email === currentUser.email);

    if(!currentAdmin){
        window.location.href='/work/notAllowed.html';
    }    
}

export {isLogin, isAdmin};