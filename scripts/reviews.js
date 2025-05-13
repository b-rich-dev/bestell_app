function initReviews() {
    getReviewsFromLocalStorage();
    renderReviewsContent();
    renderReviews();
}


function renderReviewsContent() {
    let reviewsRef = document.getElementById('reviews_content');
    reviewsRef.innerHTML = "";
    reviewsRef.innerHTML += getReviewsContent();
    // for (let i = 0; i < reviews.length; i++) {
    //     reviewsRef.innerHTML += getReviewsContent(i);
    // }
}

function renderReviews(index) {

    let reviewsRef = document.getElementById('all_reviews');
    reviewsRef.innerHTML = "";

    for (let i = 0; i < reviews.length; i++) {
        reviewsRef.innerHTML += getReviews(i);
    }
}


function checkEnter(event, index) {
    if (event.key === "Enter") {
        addNewComment(index);
    }
}



function addNewComment(index) {
    let nameInputRef = document.getElementById('name_input' + (index));
    let commentInputRef = document.getElementById('comment_input' + (index));
    let nameValue = nameInputRef.value.trim();
    let commentValue = commentInputRef.value.trim();

    if (commentValue || nameValue === "") {
        myReviewToast()
        return;
    }

    const newComment = {
        name: nameValue,
        comment: commentValue
    };

    reviews[index].unshift(newComment);

    saveToLocalStorage();
    renderReviews(index)
    renderBooksTemplate();

    commentInputRef.value = "";
}


function myReviewToast() {
    let reviewToast = document.getElementById("review_toast");

    reviewToast.className = "review_show";

    setTimeout(function () { reviewToast.className = reviewToast.className.replace("review_", ""); }, 3000);
}