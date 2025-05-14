function calculateAverageRating() {
    if (!reviews || reviews.length === 0) return "0.0";
    const sum = reviews.reduce((total, r) => total + r.rating, 0);
    return (sum / reviews.length).toFixed(1);
}
