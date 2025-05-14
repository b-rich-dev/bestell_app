function init() {
    renderMainContent();
    renderFoodSelectionContent();
    renderAverageRatingOnHome(); // Neu hinzufügen
}

function renderAverageRatingOnHome() {
    getReviewsFromLocalStorage(); // Bewertungen laden
    const avgRatingElement = document.getElementById('average_rating_home');
    if (avgRatingElement) {
        avgRatingElement.innerHTML = `
            <span>Durchschnittliche Bewertung: <strong>${calculateAverageRating()} / 5</strong> ⭐️</span>
        `;
    }
}


function renderMainContent() {
    let allContentRef = document.getElementById('main_content');
    allContentRef.innerHTML = "";

    for (let i = 0; i < myDishes.length; i++) {
        allContentRef.innerHTML += getMainContent(i);
    }
}


function renderFoodSelectionContent() {
    let appetizerContentRef = document.getElementById('appetizer_container');
    let mainCourseContentRef = document.getElementById('main_course_container');
    let dessertsContentRef = document.getElementById('desserts_container');

    appetizerContentRef.innerHTML = "";
    mainCourseContentRef.innerHTML = "";
    dessertsContentRef.innerHTML = "";

    for (let i = 0; i < myDishes.length; i++) {
        for (let j = 0; j < myDishes[i].appetizer.length; j++) {
            appetizerContentRef.innerHTML += getAppetizerContent(i, j);
        }
        for (let j = 0; j < myDishes[i].mainCourse.length; j++) {
            mainCourseContentRef.innerHTML += getMainCourseContent(i, j);
        }
        for (let j = 0; j < myDishes[i].desserts.length; j++) {
            dessertsContentRef.innerHTML += getDessertsContent(i, j);
        }
    }
}


function increaseAmount(i, j, category) {
    myDishes[i][category][j].amount++;

    const basket = document.querySelector('.basket_wrapper');

    if (basket && basket.classList.contains('close')) {
        toggleBasket();
    }

    renderCart();
}


function decreaseAmount(i, j, category) {
    myDishes[i][category][j].amount--;
    renderCart();
}


function addOne(dishName) {
    for (let i = 0; i < myDishes.length; i++) {
        let categories = ['appetizer', 'mainCourse', 'desserts'];
        for (let c = 0; c < categories.length; c++) {
            let dishes = myDishes[i][categories[c]];
            for (let j = 0; j < dishes.length; j++) {
                if (dishes[j].name === dishName) {
                    dishes[j].amount++;
                    renderCart();
                    return;
                }
            }
        }
    }
}

function removeOne(dishName) {
    for (let i = 0; i < myDishes.length; i++) {
        let categories = ['appetizer', 'mainCourse', 'desserts'];
        for (let c = 0; c < categories.length; c++) {
            let dishes = myDishes[i][categories[c]];
            for (let j = 0; j < dishes.length; j++) {
                if (dishes[j].name === dishName) {
                    if (dishes[j].amount > 0) {
                        dishes[j].amount--;
                        if (isCartEmpty()) {
                            document.getElementById('cart_container').innerHTML = getEmptyCart();
                        } else {
                            renderCart();
                        }
                    }
                    return;
                }
            }
        }
    }

}


function isCartEmpty() {
    for (let i = 0; i < myDishes.length; i++) {
        let categories = ['appetizer', 'mainCourse', 'desserts'];
        for (let c = 0; c < categories.length; c++) {
            let dishes = myDishes[i][categories[c]];
            for (let j = 0; j < dishes.length; j++) {
                if (dishes[j].amount > 0) {
                    return false;
                }
            }
        }
    }
    return true;
}


function deleteAllFromCart() {
    for (let i = 0; i < myDishes.length; i++) {
        let categories = ['appetizer', 'mainCourse', 'desserts'];
        for (let c = 0; c < categories.length; c++) {
            let dishes = myDishes[i][categories[c]];
            for (let j = 0; j < dishes.length; j++) {
                dishes[j].amount = 0;
            }
        }
    }
    document.getElementById('cart_container').innerHTML = getEmptyCart();
}


function sendOrder() {
    for (let i = 0; i < myDishes.length; i++) {
        let categories = ['appetizer', 'mainCourse', 'desserts'];
        for (let c = 0; c < categories.length; c++) {
            let dishes = myDishes[i][categories[c]];
            for (let j = 0; j < dishes.length; j++) {
                dishes[j].amount = 0;
                myToast();
            }
        }
    }
    document.getElementById('cart_container').innerHTML = getEmptyCart();
}


function renderCart() {
    let cartContent = "";
    let mySubtotal = 0;
    let totalPrice = 0;

    for (let i = 0; i < myDishes.length; i++) {
        let dishGroup = myDishes[i];
        let categories = ['appetizer', 'mainCourse', 'desserts'];

        for (let c = 0; c < categories.length; c++) {
            let category = categories[c];
            let dishes = dishGroup[category];

            for (let j = 0; j < dishes.length; j++) {
                let dish = dishes[j];
                if (dish.amount > 0) {
                    cartContent += getSelectedDishes(dish);
                    mySubtotal += dish.amount * dish.price;
                    totalPrice = mySubtotal + deliveryFee;
                }
            }
        }
    }

    cartContent += getCosts(mySubtotal, deliveryFee, totalPrice);
    document.getElementById('cart_container').innerHTML = cartContent;
    const container = document.querySelector('.cart_container');
    container.scrollTop = container.scrollHeight;
}


function myToast() {
    let toast = document.getElementById("toast");

    toast.className = "show";

    setTimeout(function () { toast.className = toast.className.replace("show", ""); }, 3000);
}


// const basket = document.querySelector('.basket_wrapper');
// const content = document.querySelector('.content');

// function toggleBasket() {
//     const basket = document.querySelector('.basket_wrapper');
//     const wrapper = document.querySelector('.content_wrapper');
//     const content = document.getElementById('content');
//     const button = document.getElementById("cart_button");

//     if (basket) {
//         basket.classList.toggle('fixed');
//         basket.classList.toggle('close');
//         content.classList.toggle('full_content');
//     }

//     if (wrapper) {
//         wrapper.classList.toggle('basket_close');
//         basket.classList.toggle('sticky');
//         content.classList.toggle('content');
//     }

//     if (button) {
//         button.classList.toggle("cart-hidden");
//     }
// }


function toggleBasket() {
    const basket = document.querySelector('.basket_wrapper');
    const wrapper = document.querySelector('.content_wrapper');
    const content = document.getElementById('content');
    const button = document.getElementById("cart_button");

    if (button) {
        button.classList.toggle("basket_wrapper.close");
        basket.classList.toggle('close');
    } else {
        if (basket) {
            basket.classList.toggle('fixed');
            basket.classList.toggle('close');
            content.classList.toggle('full_content');
        }

        if (wrapper) {
            wrapper.classList.toggle('basket_close');
            basket.classList.toggle('sticky');
            content.classList.toggle('content');
        }



    }
}





window.addEventListener('scroll', () => {
    const basket = document.querySelector('.basket_wrapper');

    if (basket) {
        if (window.scrollY >= 80) {
            basket.classList.add('scrolled');
        } else {
            basket.classList.remove('scrolled');
        }
    }
});



// const wrapper = document.querySelector('.basket_wrapper');
// const x = window.matchMedia("(max-width: 840px)")

// function myFunction(x) {
//     if (x.matches) {
//         wrapper.classList.add('close');
//     } else {
//         wrapper.classList.remove('close');
//     }
// }

// myFunction(x);


// // Attach listener function on state changes
// x.addEventListener("change", function() {
//   myFunction(x);
// });


// das war zuletzt
// function waitForElement(selector, callback) {
//     // Nur auf der Startseite ausführen
//     const path = window.location.pathname;
//     if (path !== "/" && !path.endsWith("/index.html")) {
//         console.info("waitForElement wird auf dieser Seite nicht ausgeführt:", path);
//         return;
//     }

//     // Sicherstellen, dass document.body existiert
//     if (!document.body) {
//         console.warn("document.body nicht verfügbar – Observer wird nicht gestartet.");
//         return;
//     }

//     const observer = new MutationObserver(() => {
//         const element = document.querySelector(selector);
//         if (element) {
//             observer.disconnect();
//             callback(element);
//         }
//     });

//     observer.observe(document.body, { childList: true, subtree: true });
// }


// function waitForElement(selector, callback) {
//     // Sicherstellen, dass document.body existiert
//     if (!document.body) {
//         console.warn("document.body nicht verfügbar – Observer wird nicht gestartet.");
//         return;
//     }

//     const observer = new MutationObserver(() => {
//         const element = document.querySelector(selector);
//         if (element) {
//             observer.disconnect();
//             callback(element);
//         }
//     });

//     observer.observe(document.body, { childList: true, subtree: true });
// }

// Diese Funktion wartet, bis das Element im DOM existiert


function addCartButton() {
    const button = document.createElement("button");
    button.innerText = "Warenkorb";
    button.id = "cart_button";
    button.className = "cart_button";
    button.onclick = toggleBasket;

    // const currentDiv = document.getElementById("desserts_container");
    // if (currentDiv) {
    //     currentDiv.insertAdjacentElement('afterend', button);
    // }

    document.body.appendChild(button);
}




function removeCartButton() {
    const element = document.getElementById("cart_button");
    if (element) {
        element.remove();
    }
}


window.addEventListener("scroll", () => {
    const button = document.getElementById("cart_button");
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    const fullHeight = document.body.scrollHeight;

    if (button) {
        if (scrollY + viewportHeight >= fullHeight - 100) {
            button.classList.add("shrink");
        } else {
            button.classList.remove("shrink");
        }
    }
});



function renderImpressumContent() {
    let impressumRef = document.getElementById('impressum')
    impressumRef.innerHTML += getImpressumContent();
}


// function renderAverageRatingOnHome() {
//     const avg = calculateAverageRating();
//     document.getElementById('average_rating_home').innerHTML = `
//         <h1>Pizza Paradies</h1>
//         <a href="./reviews.html"><b>Bewertung (${avg} ⭐️ von 5 Sternen)</b></a>`;
// }

function renderAverageRatingOnHome() {
    getReviewsFromLocalStorage(); // Bewertungen NEU laden
    const avg = calculateAverageRating();
    const element = document.getElementById('average_rating_home');
    if(element) {
        element.innerHTML = `
        <h1>Pizza Paradies</h1>
        <a href="./reviews.html"><b>Bewertung (${avg} ⭐️ von 5 Sternen)</b></a>`;
    }
}


window.addEventListener('reviewsUpdated', () => {
    if(window.location.pathname.includes('index.html')) {
        renderAverageRatingOnHome();
    }
});
// window.onload = function () {
//     renderAverageRatingOnHome();
// };
