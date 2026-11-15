
document.addEventListener('DOMContentLoaded', () => {

    const CART_KEY = 'cart';

    // =====================================
    // GET CART FROM LOCAL STORAGE
    // =====================================

    function getCart() {
        try {
            const savedCart = localStorage.getItem(CART_KEY);

            if (!savedCart) {
                return {};
            }

            const cart = JSON.parse(savedCart);

            if (!cart || typeof cart !== 'object' || Array.isArray(cart)) {
                return {};
            }

            return cart;

        } catch (error) {
            console.error('Error reading cart:', error);
            return {};
        }
    }


    // =====================================
    // SAVE CART TO LOCAL STORAGE
    // =====================================

    function saveCart(cart) {
        try {
            localStorage.setItem(CART_KEY, JSON.stringify(cart));
            updateCartCount();

        } catch (error) {
            console.error('Error saving cart:', error);
            alert('Could not save your cart.');
        }
    }


    // =====================================
    // UPDATE NAVIGATION CART COUNTER
    // =====================================

    function updateCartCount() {
        const counter = document.getElementById('cart-count');

        if (!counter) {
            return;
        }

        const cart = getCart();

        let count = 0;

        Object.values(cart).forEach(item => {
            count += Number(item.quantity) || 0;
        });

        counter.textContent = count;
    }


    // =====================================
    // GET BACKEND REMOVE URL
    // =====================================

    function getRemoveUrl(productId) {
        const cartItems = document.getElementById('cart-items');

        if (!cartItems) {
            return null;
        }

        const urlTemplate = cartItems.dataset.removeUrl;

        if (!urlTemplate) {
            console.error('Remove URL is missing from cart.html');
            return null;
        }

        return urlTemplate.replace(
            /0\/?$/,
            encodeURIComponent(productId)
        );
    }


    // =====================================
    // ADD PRODUCTS TO CART
    // =====================================

    const addToCartForms = document.querySelectorAll('.add-to-cart-form');

    addToCartForms.forEach(form => {

        form.addEventListener('submit', () => {

            const id = form.dataset.id;
            const name = form.dataset.name;
            const price = Number(form.dataset.price);
            const image = form.dataset.image;

            if (!id || !name || !Number.isFinite(price)) {
                console.error('Invalid product information.');
                return;
            }

            const cart = getCart();

            if (cart[id]) {
                cart[id].quantity += 1;

            } else {
                cart[id] = {
                    id: id,
                    name: name,
                    price: price,
                    image: image,
                    quantity: 1
                };
            }

            saveCart(cart);

            // The form continues to submit to Django.
            // Django updates the session and redirects to the menu.

        });

    });


    // =====================================
    // FORMAT PRICE
    // =====================================

    function formatPrice(price) {
        return Number(price).toLocaleString('en-US') + ' UZS';
    }


    // =====================================
    // DECREASE PRODUCT QUANTITY
    // =====================================

    async function decreaseQuantity(productId) {

        const cart = getCart();

        if (!cart[productId]) {
            return;
        }

        const removeUrl = getRemoveUrl(productId);

        if (!removeUrl) {
            return;
        }

        // Update localStorage first.

        cart[productId].quantity -= 1;

        // Remove product if quantity becomes zero.

        if (cart[productId].quantity <= 0) {
            delete cart[productId];
        }

        saveCart(cart);

        // Update Django session using your existing view.

        try {
            window.location.href = removeUrl;

        } catch (error) {
            console.error('Error removing product:', error);
        }

    }


    // =====================================
    // DISPLAY CART PRODUCTS
    // =====================================

    function displayCart() {

        const cartItems = document.getElementById('cart-items');
        const cartSubtotal = document.getElementById('cart-subtotal');
        const cartTotal = document.getElementById('cart-total');
        const clearButton = document.getElementById('clear-cart');

        // Only run on the cart page.

        if (!cartItems || !cartSubtotal || !cartTotal) {
            return;
        }

        const cart = getCart();
        const products = Object.values(cart);

        cartItems.innerHTML = '';

        let total = 0;

        // EMPTY CART

        if (products.length === 0) {

            const emptyCart = document.createElement('div');
            emptyCart.className = 'empty-cart';

            const heading = document.createElement('h2');
            heading.textContent = 'Your cart is empty';

            const message = document.createElement('p');
            message.textContent = 'You have not added any products yet.';

            const link = document.createElement('a');
            link.href = '/menu/';
            link.textContent = 'Browse menu';

            emptyCart.append(heading, message, link);

            cartItems.appendChild(emptyCart);

            cartSubtotal.textContent = formatPrice(0);
            cartTotal.textContent = formatPrice(0);

            if (clearButton) {
                clearButton.disabled = true;
            }

            return;
        }

        if (clearButton) {
            clearButton.disabled = false;
        }


        // DISPLAY EACH PRODUCT

        products.forEach(product => {

            const quantity = Number(product.quantity) || 0;
            const price = Number(product.price) || 0;

            const itemTotal = price * quantity;

            total += itemTotal;


            // PRODUCT CONTAINER

            const item = document.createElement('article');
            item.className = 'cart-item';


            // PRODUCT IMAGE

            if (product.image) {

                const image = document.createElement('img');

                image.src = product.image;
                image.alt = product.name;
                image.className = 'cart-item-image';

                item.appendChild(image);

            } else {

                const noImage = document.createElement('div');

                noImage.className = 'cart-item-no-image';
                noImage.textContent = 'No image';

                item.appendChild(noImage);

            }


            // PRODUCT INFORMATION

            const info = document.createElement('div');
            info.className = 'cart-item-info';

            const name = document.createElement('h3');
            name.textContent = product.name;

            const unitPrice = document.createElement('p');
            unitPrice.textContent = formatPrice(price);


            // QUANTITY CONTROLS

            const quantityControls = document.createElement('div');
            quantityControls.className = 'quantity-controls';

            const decreaseButton = document.createElement('button');

            decreaseButton.type = 'button';
            decreaseButton.textContent = '−';
            decreaseButton.title = 'Remove one product';

            const quantityText = document.createElement('span');
            quantityText.textContent = quantity;

            decreaseButton.addEventListener('click', () => {
                decreaseButton.disabled = true;
                decreaseQuantity(product.id);
            });

            quantityControls.append(
                decreaseButton,
                quantityText
            );


            // SUBTOTAL

            const subtotal = document.createElement('p');

            subtotal.textContent = 'Subtotal: ' + formatPrice(itemTotal);


            // BUILD PRODUCT INFORMATION

            info.append(
                name,
                unitPrice,
                quantityControls,
                subtotal
            );


            // TOTAL PRICE FOR THIS PRODUCT

            const itemPrice = document.createElement('div');

            itemPrice.className = 'cart-item-price';
            itemPrice.textContent = formatPrice(itemTotal);


            // ADD TO CART PAGE

            item.append(info, itemPrice);

            cartItems.appendChild(item);

        });


        // UPDATE TOTALS

        cartSubtotal.textContent = formatPrice(total);
        cartTotal.textContent = formatPrice(total);

    }


    // =====================================
    // CLEAR ENTIRE CART
    // =====================================

    const clearButton = document.getElementById('clear-cart');

    if (clearButton) {

        clearButton.addEventListener('click', async () => {

            const cart = getCart();

            const products = Object.entries(cart);

            if (products.length === 0) {
                return;
            }

            const removeUrlTemplate =
                document.getElementById('cart-items').dataset.removeUrl;

            if (!removeUrlTemplate) {
                alert('Remove URL is missing.');
                return;
            }

            clearButton.disabled = true;
            clearButton.textContent = 'Clearing...';

            try {

                // Remove one unit at a time from Django.
                // Requests are sequential to avoid session conflicts.

                for (const [productId, product] of products) {

                    const quantity = Number(product.quantity) || 0;

                    const removeUrl = getRemoveUrl(productId);

                    for (let i = 0; i < quantity; i++) {

                        const response = await fetch(removeUrl, {
                            method: 'GET',
                            credentials: 'same-origin',
                            cache: 'no-store'
                        });

                        if (!response.ok) {
                            throw new Error('Could not clear Django cart.');
                        }

                    }

                }

                // Clear browser storage after backend requests succeed.

                localStorage.removeItem(CART_KEY);

                updateCartCount();
                displayCart();

            } catch (error) {

                console.error('Error clearing cart:', error);

                alert('Could not completely clear your cart. Please refresh and try again.');

            }

            clearButton.disabled = false;
            clearButton.textContent = 'Clear Cart';

        });

    }


    // =====================================
    // INITIALIZE
    // =====================================

    // Check whether an order was successfully completed.

    const orderCompleted =
        new URLSearchParams(window.location.search).get('order') === 'success';

    if (orderCompleted) {

        // Clear localStorage cart.

        localStorage.removeItem(CART_KEY);

        // Remove the success parameter from the URL.

        window.history.replaceState(
            {},
            document.title,
            window.location.pathname
        );

    }

    updateCartCount();
    displayCart();


    // =====================================
    // LISTEN FOR CHANGES IN OTHER TABS
    // =====================================

    window.addEventListener('storage', event => {

        if (event.key === CART_KEY) {
            updateCartCount();
            displayCart();
        }

    });

});
