document.getElementById("logout-btn").onclick = function () {
    deleteCookie("currentUser");
    window.location.href = "/work/login.html";
};

function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}
