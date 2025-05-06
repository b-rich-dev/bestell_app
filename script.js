function init() {
    renderMainContent();
    renderAppetizerContent();
    renderMainCourseContent();
    renderDessertsContent();
}


function renderMainContent() {
    let allContentRef = document.getElementById('main_content');
    allContentRef.innerHTML = "";

    for (let i = 0; i < myDishes.length; i++) {
        allContentRef.innerHTML += getMainContent(i);
    }
}


function renderAppetizerContent() {
    let appetizerContentRef = document.getElementById('appetizer_container');
    appetizerContentRef.innerHTML = "";

    for (let i = 0; i < myDishes.length; i++) {
        for (let j = 0; j < myDishes[i].appetizer.length; j++) {
            appetizerContentRef.innerHTML += getAppetizerContent(i, j);
        }
    }
}


function renderMainCourseContent() {
    let mainCourseContentRef = document.getElementById('main_course_container');
        mainCourseContentRef.innerHTML = "";

    for (let i = 0; i < myDishes.length; i++) {
        for (let j = 0; j < myDishes[i].mainCourse.length; j++) {
            mainCourseContentRef.innerHTML += getMainCourseContent(i, j);
        }
    }
}


function renderDessertsContent() {
    let dessertsContentRef = document.getElementById('desserts_container');
        dessertsContentRef.innerHTML = "";

    for (let i = 0; i < myDishes.length; i++) {
        for (let j = 0; j < myDishes[i].desserts.length; j++) {
            dessertsContentRef.innerHTML += getDessertsContent(i, j);
        }
    }
}






function myToast() {
    let toast = document.getElementById("toast");

    toast.className = "show";

    setTimeout(function () { toast.className = toast.className.replace("show", ""); }, 3000);
}