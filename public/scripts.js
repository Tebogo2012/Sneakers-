document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('button');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const product = button.parentElement.querySelector('p').innerText;
            addToCart(product);
        });
    });
});

function addToCart(product) {
    // Add the product to the cart (this could be done via an API call to the server)
    alert(`${product} added to cart!`);
}
