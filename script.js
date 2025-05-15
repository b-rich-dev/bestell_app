function init() {
    renderMainContent();
    renderFoodSelectionContent();
    renderAverageRatingOnHome();
}


function renderAverageRatingOnHome() {
    getReviewsFromLocalStorage();
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


function renderCategory(container, category, getContentFn) {
    container.innerHTML = "";
    for (let i = 0; i < myDishes.length; i++) {
        for (let j = 0; j < myDishes[i][category].length; j++) {
            container.innerHTML += getContentFn(i, j);
        }
    }
}


function renderFoodSelectionContent() {
    const containers = {
        appetizer: document.getElementById('appetizer_container'),
        mainCourse: document.getElementById('main_course_container'),
        desserts: document.getElementById('desserts_container')
    };

    renderCategory(containers.appetizer, 'appetizer', getAppetizerContent);
    renderCategory(containers.mainCourse, 'mainCourse', getMainCourseContent);
    renderCategory(containers.desserts, 'desserts', getDessertsContent);
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


function forEachDish(callback) {
    let categories = ['appetizer', 'mainCourse', 'desserts'];
    for (let i = 0; i < myDishes.length; i++) {
        for (let c = 0; c < categories.length; c++) {
            let dishes = myDishes[i][categories[c]];
            for (let j = 0; j < dishes.length; j++) {
                callback(dishes[j]);
            }
        }
    }
}


function updateCart() {
    if (isCartEmpty()) {
        document.getElementById('cart_container').innerHTML = getEmptyCart();
    } else {
        renderCart();
    }
}


function addOne(dishName) {
    forEachDish(dish => {
        if (dish.name === dishName) {
            dish.amount++;
            renderCart();
        }
    });
}


function removeOne(dishName) {
    forEachDish(dish => {
        if (dish.name === dishName && dish.amount > 0) {
            dish.amount--;
            updateCart();
        }
    });
}


function removeAllFromDish(dishName) {
    forEachDish(dish => {
        if (dish.name === dishName && dish.amount > 0) {
            dish.amount = 0;
        }
    });
    updateCart();
}


function isCartEmpty() {
    let empty = true;
    forEachDish(dish => {
        if (dish.amount > 0) empty = false;
    });
    return empty;
}


function sendOrder() {
    forEachDish(dish => {
        dish.amount = 0;
    });
    myToast();
    document.getElementById('cart_container').innerHTML = getEmptyCart();
}


function calculatePrices(dishes) {
    const subtotal = dishes.reduce((sum, dish) => sum + (dish.amount * dish.price), 0);
    return { subtotal, total: subtotal + deliveryFee };
}


function getValidDishes() {
    return myDishes.flatMap(group =>
        ['appetizer', 'mainCourse', 'desserts'].flatMap(category =>
            group[category].filter(dish => dish.amount > 0)
        )
    );
}


function renderCart() {
    const validDishes = getValidDishes();
    const { subtotal, total } = calculatePrices(validDishes);
    const cartContainer = document.getElementById('cart_container');

    cartContainer.innerHTML =
        validDishes.map(getSelectedDishes).join('') + getCosts(subtotal, deliveryFee, total);

    cartContainer.scrollTop = cartContainer.scrollHeight;
}


function myToast() {
    let toast = document.getElementById("toast");

    toast.className = "show";

    setTimeout(function () { toast.className = toast.className.replace("show", ""); }, 3000);
}


function toggleButtonState(button, basket) {
    button.classList.toggle("close");
    basket.classList.toggle("close");
}


function toggleBasketState(basket, wrapper, content) {
    if (basket && content && wrapper) {
        basket.classList.toggle('fixed');
        basket.classList.toggle('close');
        basket.classList.toggle('sticky');
        content.classList.toggle('full_content');
        content.classList.toggle('content');
        wrapper.classList.toggle('basket_close');
    }
}


function toggleBasket() {
    const basket = document.querySelector('.basket_wrapper');
    const wrapper = document.querySelector('.content_wrapper');
    const content = document.getElementById('content');
    const button = document.getElementById("cart_button");

    if (button) {
        toggleButtonState(button, basket);
    } else {
        toggleBasketState(basket, wrapper, content);
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


function addCartButton() {
    const button = document.createElement("button");
    button.innerText = "Warenkorb";
    button.id = "cart_button";
    button.className = "cart_button";
    button.onclick = toggleBasket;

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


function renderAverageRatingOnHome() {
    getReviewsFromLocalStorage();
    const avg = calculateAverageRating();
    const element = document.getElementById('average_rating_home');
    if (element) {
        element.innerHTML = getAverageRatingOnHome(avg);
    }
}


window.addEventListener('reviewsUpdated', () => {
    if (window.location.pathname.includes('index.html')) {
        renderAverageRatingOnHome();
    }
});