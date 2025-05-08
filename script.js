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
    appetizerContentRef.innerHTML = "";
    let mainCourseContentRef = document.getElementById('main_course_container');
    mainCourseContentRef.innerHTML = "";
    let dessertsContentRef = document.getElementById('desserts_container');
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