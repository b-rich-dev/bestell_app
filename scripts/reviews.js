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



function addNewReview() {
    const name = document.getElementById('name_input').value.trim();
    const comment = document.getElementById('comment_input').value.trim();
    const rating = parseInt(document.getElementById('rating_input').value);

    if (!name || !comment || isNaN(rating)) {
        myReviewToast();
        return;
    }

    const newReview = {
        name,
        comment,
        rating,
        date: new Date().toLocaleDateString('de-DE')
    };

    reviews.unshift(newReview);
    saveReviewsToLocalStorage();
    window.dispatchEvent(new Event('reviewsUpdated'));
    renderReviewsContent(); // Aktualisiert auch den Durchschnitt
    renderAllReviews();

    // Felder leeren
    document.getElementById('name_input').value = '';
    document.getElementById('comment_input').value = '';
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


// function calculateAverageRating() {
//     if (reviews.length === 0) return 0;

//     const total = reviews.reduce((sum, review) => sum + review.rating, 0);
//     const average = total / reviews.length;

//     return average.toFixed(1);
// }