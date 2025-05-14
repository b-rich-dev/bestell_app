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


function handleScreenSizeChange(x, wrapper, basket, content) {
    const isSmall = x.matches;
    wrapper.classList.toggle('close', isSmall);
    basket.classList.toggle('close', isSmall);
    basket.classList.toggle('fixed', !isSmall);
    basket.classList.toggle('sticky', !isSmall);
    content.classList.toggle('full_content', isSmall);
    content.classList.toggle('content', !isSmall);
    isSmall ? addCartButton() : removeCartButton();
}

waitForElement('#basket_wrapper', (wrapper) => {
    const x = window.matchMedia("(max-width: 840px)");
    const elements = {
        basket: wrapper.querySelector('.basket'),
        content: document.getElementById('content')
    };
    handleScreenSizeChange(x, wrapper, elements.basket, elements.content);
    x.addEventListener("change", () => handleScreenSizeChange(x, wrapper, elements.basket, elements.content));
});