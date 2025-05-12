function init() {
    renderMainContent();
    renderFoodSelectionContent()
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

function toggleBasket() {
    const basket = document.querySelector('.basket_wrapper');
    const wrapper = document.querySelector('.content_wrapper');
    const content = document.getElementById('content');

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



// Diese Funktion wartet, bis das Element im DOM existiert
function waitForElement(selector, callback) {
    const observer = new MutationObserver(() => {
        const element = document.querySelector(selector);
        if (element) {
            observer.disconnect();
            callback(element);
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
}

// Unsere Logik ausführen, wenn basket_wrapper da ist
waitForElement('#basket_wrapper', function (wrapper) {
    const basket = wrapper.querySelector('.basket');
    const content = document.getElementById('content');
    const x = window.matchMedia("(max-width: 840px)");

    function closeCartIfScreenIsSmall(x) {
        if (x.matches) {
            wrapper.classList.add('close');
            basket.classList.add('close');
            basket.classList.toggle('fixed');
            basket.classList.toggle('sticky');
            content.classList.remove('content');
            content.classList.add('full_content');
            addCartButton();

        } else {
            wrapper.classList.remove('close');
            basket.classList.remove('close');
            basket.classList.toggle('fixed');
            basket.classList.toggle('sticky');
            content.classList.remove('full_content');
            content.classList.add('content');
            removeCartButton()
        }
    }

    closeCartIfScreenIsSmall(x);

    x.addEventListener("change", function () {
        closeCartIfScreenIsSmall(x);
    });
});


function addCartButton() {
    const button = document.createElement("button");
    button.innerText = "Warenkorb";
    button.id = "cart_button";
    button.className = "cart_button";
    button.onclick = toggleBasket;

    const currentDiv = document.getElementById("desserts_container");
    if (currentDiv) {
        currentDiv.insertAdjacentElement('afterend', button);
    }
}




function removeCartButton() {
    const element = document.getElementById("cart_button");
    element.remove();
}





function renderImpressumContent() {
    let impressumRef = document.getElementById('impressum')
    impressumRef.innerHTML += getImpressumContent();
}