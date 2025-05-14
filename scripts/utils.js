// function calculateAverageRating() {
//     if (!reviews || reviews.length === 0) return 0;

//     const total = reviews.reduce((sum, r) => sum + Number(r.rating || 0), 0);
//     return (total / reviews.length).toFixed(1); // z. B. "4.3"
// }

function calculateAverageRating() {
    if(!reviews || reviews.length === 0) return "0.0";
    const sum = reviews.reduce((total, r) => total + r.rating, 0);
    return (sum / reviews.length).toFixed(1);
}
