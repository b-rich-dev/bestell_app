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
