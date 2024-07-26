document.addEventListener('DOMContentLoaded', function() {
    const cart = [];
    const products = document.querySelectorAll('.add-to-cart');
    const cartContainer = document.querySelector('.cart');
    const totalPriceElement = document.getElementById('total-price');

    products.forEach(product => {
        product.addEventListener('click', function() {
            const name = this.getAttribute('data-name');
            const price = parseFloat(this.getAttribute('data-price'));
            addItemToCart(name, price);
            displayCart();
        });
    });

    function addItemToCart(name, price) {
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].name === name) {
                cart[i].quantity++;
                return;
            }
        }
        cart.push({ name, price, quantity: 1 });
    }

    function removeItemFromCart(name) {
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].name === name) {
                cart[i].quantity--;
                if (cart[i].quantity === 0) {
                    cart.splice(i, 1);
                }
                return;
            }
        }
    }

    function displayCart() {
        cartContainer.innerHTML = '';
        let totalPrice = 0;

        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <span>${item.name} ($${item.price}) x ${item.quantity}</span>
                <button data-name="${item.name}">Remove</button>
            `;
            cartContainer.appendChild(cartItem);
            totalPrice += item.price * item.quantity;

            cartItem.querySelector('button').addEventListener('click', function() {
                removeItemFromCart(item.name);
                displayCart();
            });
        });

        totalPriceElement.innerText = totalPrice.toFixed(2);
    }
});
