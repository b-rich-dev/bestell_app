function getMainContent(i) {
    return `<div id="toast">Deine Bestellung wurde ans Restaurant weitergeleitet!</div>
                <div class="content_wrapper">
                    <section id="content" class="content">
                        <img class="pizza_oven_img" src="./assets/img/pizza_oven.jpg" alt="Pizzaofen">
                        <div class="pizza_center">
                            <img class="round_pizza_img" src="./assets/img/limoncello_gelato.jpg" alt="Pizza">
                        </div>
                        <div class="restaurant_info">
                            <h1>Pizza Paradies</h1>
                            <a href="">Bewertung (4,5 von 5 Sternen)</a>
                        </div>
                        <div class="selection">
                            <img src="./assets/icon/arrow.png" alt="Pfeil nach rechts">
                            <a href="#appetizer">Vorspeisen</a>
                            <a href="#main_course">Hauptgerichte</a>
                            <a href="#desserts">Desserts</a>
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
                    <section class="basket_wrapper">
                        <div class="basket">
                            <h1>Warenkorb</h1>
                            <div id="basket" class="basket_item">
                                <b>Pizza Placeholder</b>
                                <div class="calc_zone">
                                    <img onclick="decreaseFromCard()" class="calc_icon" src="./assets/icon/minus.png" alt="Minus">
                                    <p>3x</p>
                                    <img onclick="addToCard()" class="calc_icon" src="./assets/icon/plus.png" alt="Plus">
                                    <p>25.50€</p>
                                    <img onclick="deleteFromCart" class="trash_icon" class="test" src="./assets/icon/trash.png" alt="Papierkorb">
                                </div>
                            </div>
                            <div class="sum_container">
                                <div class="sum">
                                    <p>Zwischensumme</p>
                                    <div class="flex"><p>500</p><p>€</p></div>
                                </div>
                                <div class="sum">
                                    <p>Lieferkosten</p>
                                    <p>5,00€</p>
                                </div>
                                <div class="sum"><b>Gesamt</b>
                                    <div><b>1000</b><b>€</b></div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>`;
}


function getAppetizerContent(i, j) {
    return `<div class="food_item" onclick="addToCard()">
                <div class="food_item_container">
                    <img id="food_img" class="inner_food_img" src="${myDishes[i].appetizer[j].image}" alt="Appetizer">
                    <div class="food_text">
                        <h3>${myDishes[i].appetizer[j].name}</h3>
                        <p>${myDishes[i].appetizer[j].description}</p>
                        <p class="orange">${myDishes[i].appetizer[j].price.toFixed(2)}€</p>
                    </div>
                </div>
                <div class="big_plus_container">
                    <img onclick="addToCard()" class="big_plus" src="./assets/icon/plus.png" alt="Plus">
                </div>
            </div>`;
}


function getMainCourseContent(i, j) {
    return `<div class="food_item" onclick="addToCard()">
                <div class="food_item_container">
                    <img id="food_img" class="inner_food_img" src="${myDishes[i].mainCourse[j].image}" alt="Main Course">
                    <div class="food_text">
                        <h3>${myDishes[i].mainCourse[j].name}</h3>
                        <p>${myDishes[i].mainCourse[j].description}</p>
                        <p class="orange">${myDishes[i].mainCourse[j].price.toFixed(2)}€</p>
                    </div>
                </div>
                <div class="big_plus_container">
                    <img onclick="addToCard()" class="big_plus" src="./assets/icon/plus.png" alt="Plus">
                </div>
            </div>`;
}


function getDessertsContent(i, j) {
    return `<div class="food_item" onclick="addToCard()">
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