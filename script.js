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