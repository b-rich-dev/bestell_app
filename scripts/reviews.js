function initReviews() {
    getReviewsFromLocalStorage();
    renderReviewsContent();
    renderAllReviews();
    headerMenuOff();
}


function getReviewsFromLocalStorage() {
    const storedReviews = localStorage.getItem('reviews');
    if (storedReviews) {
        reviews = JSON.parse(storedReviews);
    }
}


function saveReviewsToLocalStorage() {
    localStorage.setItem('reviews', JSON.stringify(reviews));
}


function renderReviewsContent() {
    const reviewsRef = document.getElementById('reviews_content');
    if (reviewsRef) {
        reviewsRef.innerHTML = getReviewsContent();
    }
}


function renderAllReviews() {
    const reviewsList = document.getElementById('all_reviews');
    if (reviewsList) {
        reviewsList.innerHTML = '';
        reviews.forEach((review, index) => {
            reviewsList.innerHTML += getSingleReview(index);
        });
    }
}


function checkEnter(event, index) {
    if (event.key === "Enter") {
        addNewReview(index);
    }
}


function resetFormFields() {
    document.getElementById('name_input').value = '';
    document.getElementById('comment_input').value = '';
}


function createNewReview(name, comment, rating) {
    return {
        name,
        comment,
        rating,
        date: new Date().toLocaleDateString('de-DE')
    };
}


function addNewReview() {
    const name = document.getElementById('name_input').value.trim();
    const comment = document.getElementById('comment_input').value.trim();
    const rating = parseInt(document.getElementById('rating_input').value);

    if (!name || !comment || isNaN(rating)) return myReviewToast();

    reviews.unshift(createNewReview(name, comment, rating));
    saveReviewsToLocalStorage();
    window.dispatchEvent(new Event('reviewsUpdated'));
    renderReviewsContent();
    renderAllReviews();
    resetFormFields();
}


function calculateAverageRating() {
    if (!reviews.length) return '0.0';
    const sum = reviews.reduce((total, review) => total + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
}


function myReviewToast() {
    let reviewToast = document.getElementById("review_toast");
    reviewToast.classList.add("review_show");

    setTimeout(() => {
        reviewToast.classList.remove("review_show");
    }, 3000);
}