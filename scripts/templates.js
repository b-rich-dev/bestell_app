function getMainContent() {
    return `<div id="toast">Deine Bestellung wurde ans Restaurant weitergeleitet!</div>
            <div id="content_wrapper" class="content_wrapper">
                <section id="content" class="content">
                    <img class="pizza_oven_img" src="./assets/img/pizza_oven.jpg" alt="Pizzaofen">
                    <div class="pizza_center">
                        <img class="round_logo" src="./assets/img/pizza_logo.png" alt="Logo">
                    </div>
                    <div id="average_rating_home" class="restaurant_info">
                        
                    </div>
                    <div class="selection">
                        <img src="./assets/icon/arrow.png" alt="Pfeil nach rechts">
                        <div class="selection_text">
                            <a href="#appetizer">Vorspeisen</a>
                            <a href="#main_course">Hauptgerichte</a>
                            <a href="#desserts">Desserts</a>
                        </div>    
                    </div>
                    <img class="food_img" src="./assets/img/carpaccio_1.jpg" alt="Vorspeisen">
                    <h2 id="appetizer">Vorspeisen</h2>
                    <div id="appetizer_container" class="food_container">
                            
                    </div>
                    <img class="food_img" src="./assets/img/pizza_salami.jpg" alt="Pizza">
                    <h2 id="main_course">Hauptgerichte</h2>
                    <div id="main_course_container" class="food_container">
                        
                    </div>
                    <img class="food_img" src="./assets/img/cannoli.jpg" alt="Dessert">
                    <h2 id="desserts">Desserts</h2>
                    <div id="desserts_container" class="food_container">
                        
                    </div>
                </section>
                <section id="basket_wrapper" class="basket_wrapper">
                    <div class="basket">
                        <h1>Warenkorb</h1>
                        <div id="cart_container" class="cart_container">
                            <div class="empty_cart">
                                <img src="./assets/img/bag.png" alt="Warenkorb">
                                <p>Wähle leckere Gerichte aus der Karte!</p>
                            </div>    
                        </div>
                    </div>
                </section>
            </div>`;
}


function getAppetizerContent(i, j) {
    return `<div class="food_item" onclick="increaseAmount(${i}, ${j}, 'appetizer')">
                <div class="food_item_container">
                    <img id="food_img" class="inner_food_img" src="${myDishes[i].appetizer[j].image}" alt="Appetizer">
                    <div class="food_text">
                        <h3>${myDishes[i].appetizer[j].name}</h3>
                        <p>${myDishes[i].appetizer[j].description}</p>
                        <p class="orange">${myDishes[i].appetizer[j].price.toFixed(2)}€</p>
                    </div>
                </div>
                <div class="big_plus_container">
                    <img class="big_plus" src="./assets/icon/plus.png" alt="Plus">
                </div>
            </div>`;
}


function getMainCourseContent(i, j) {
    return `<div class="food_item" onclick="increaseAmount(${i}, ${j}, 'mainCourse')">
                <div class="food_item_container">
                    <img id="food_img" class="inner_food_img" src="${myDishes[i].mainCourse[j].image}" alt="Main Course">
                    <div class="food_text">
                        <h3>${myDishes[i].mainCourse[j].name}</h3>
                        <p>${myDishes[i].mainCourse[j].description}</p>
                        <p class="orange">${myDishes[i].mainCourse[j].price.toFixed(2)}€</p>
                    </div>
                </div>
                <div class="big_plus_container">
                    <img class="big_plus" src="./assets/icon/plus.png" alt="Plus">
                </div>
            </div>`;
}


function getDessertsContent(i, j) {
    return `<div class="food_item" onclick="increaseAmount(${i}, ${j}, 'desserts')">
                <div class="food_item_container">
                    <img id="food_img" class="inner_food_img" src="${myDishes[i].desserts[j].image}" alt="Desserts">
                    <div class="food_text">
                        <h3>${myDishes[i].desserts[j].name}</h3>
                        <p>${myDishes[i].desserts[j].description}</p>
                        <p class="orange">${myDishes[i].desserts[j].price.toFixed(2)}€</p>
                    </div>
                </div>
                <div class="big_plus_container">
                    <img class="big_plus" src="./assets/icon/plus.png" alt="Plus">
                </div>
            </div>`;
}


function getSelectedDishes(dish) {
    return `<div id="basket" class="basket_item">
                <b>${dish.name}</b>
                <div class="calc_zone">
                    <img onclick="removeOne('${dish.name}')" class="calc_icon" src="./assets/icon/minus.png" alt="Minus">
                    <p>${dish.amount}x</p>
                    <img onclick="addOne('${dish.name}')" class="calc_icon" src="./assets/icon/plus.png" alt="Plus">
                    <p>${(dish.amount * dish.price).toFixed(2)}€</p>
                    <img onclick="removeAllFromDish('${ dish.name }')" class="trash_icon" class="test" src="./assets/icon/trash.png" alt="Papierkorb">
                </div>
            </div>`;
}


function getCosts(mySubtotal, deliveryFee, totalPrice) {
    return `<div class="sum_container">
                <div class="sum">
                    <p>Zwischensumme</p>
                    <p>${mySubtotal.toFixed(2)}€</p>
                </div>
                <div class="sum">
                    <p>Lieferkosten</p>
                    <p>${deliveryFee.toFixed(2)}€</p>
                </div>
                <div class="sum">
                    <h3>Gesamt</h3>
                    <h3>${totalPrice.toFixed(2)}€</h3>
                </div>
                <div class="order">
                    <button onclick="sendOrder()">Bestellen!</button>
                </div>
            </div>`;
}


function getEmptyCart() {
    return `<div class="empty_cart">
                <img src="./assets/img/bag.png" alt="Warenkorb">
                <p>Wähle leckere Gerichte aus der Karte!</p>
            </div> `;
}


function getImpressumContent() {
    return `<div class="impressum_container">
                <h1>Impressum</h1>

                <p>Eugen Birich<br />
                    Mittlauer Weg 36<br />
                    63571 Gelnhausen</p>

                <h2>Kontakt</h2>
                <p>Telefon: 01751032571<br />
                    E-Mail: lex8787@web.de</p>

                <p>Quelle: <a href="https://www.e-recht24.de">e-recht24.de</a></p>
                <p>Bildquellen und Urheberrechtshinweise:</p>
                <p>Alle Bilder sind von Pixabay, Lizenz: Pixabay License</p>
            </div>`
}


function getReviewsContent() {
    return `
        <div class="reviews_container">
            <h1>Bewertungen</h1>
            <div class="average_rating">
                Durchschnittliche Bewertung: <span id="average_rating">${calculateAverageRating()}</span>/5 ⭐
            </div>
            
            <div class="add_review">
                <input type="text" id="name_input" placeholder="Ihr Name">
                <textarea id="comment_input" placeholder="Ihr Kommentar"></textarea>
                <select id="rating_input">
                    <option value="5">⭐ ⭐ ⭐ ⭐ ⭐</option>
                    <option value="4">⭐ ⭐ ⭐ ⭐</option>
                    <option value="3">⭐ ⭐ ⭐</option>
                    <option value="2">⭐ ⭐</option>
                    <option value="1">⭐</option>
                </select>
                <button onclick="addNewReview()">Bewertung absenden</button>
            </div>
            
            <div id="all_reviews" class="reviews_list"></div>
            <div id="review_toast">Bitte alles ausfüllen!</div>
        </div>
    `;
}


function getSingleReview(index) {
    const review = reviews[index];
    return `
        <div class="review">
            <h3>${review.name}</h3>
            <div class="rating">${'⭐'.repeat(review.rating)}</div>
            <p>${review.comment}</p>
            <small>${review.date}</small>
        </div>
    `;
}


function getReviews(index) {
    const review = reviews[index];
    return `
        <div class="review">
            <h2>${review.name}</h2>
            <div class="rating">Bewertung: ${'⭐️'.repeat(review.rating)}</div>
            <div class="date">${review.date}</div>
            <p class="comment">${review.comment}</p>
        </div>
    `;
}


function getAverageRatingOnHome(avg) {
    return `
        <h1>Pizza Paradies</h1>
        <a href="./reviews.html"><b>Bewertung (${avg} ⭐️ von 5 Sternen)</b></a>`;
}