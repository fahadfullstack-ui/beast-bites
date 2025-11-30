// Checkout Page Functionality
document.addEventListener('DOMContentLoaded', function () {
    displayOrderSummary();
    setupPaymentMethods();
    setupPlaceOrder();

    // Check if cart is empty
    const cartItems = cart.getCart();
    if (cartItems.length === 0) {
        alert('Your cart is empty!');
        window.location.href = 'index.html';
    }
});

function displayOrderSummary() {
    const cartItems = cart.getCart();
    const container = document.getElementById('orderItems');

    const itemsHTML = cartItems.map(item => `
        <div class="order-item">
            <img src="${item.image}" alt="${item.name}" class="order-item-image">
            <div class="order-item-details">
                <div class="order-item-name">${item.name}</div>
                <div class="order-item-quantity">Qty: ${item.quantity}</div>
            </div>
            <div class="order-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
        </div>
    `).join('');

    container.innerHTML = itemsHTML;

    // Calculate totals
    const subtotal = cart.getCartTotal();
    const tax = subtotal * 0.08;
    const shipping = 0; // Free shipping
    const total = subtotal + tax;

    document.getElementById('checkoutSubtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('checkoutTax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('checkoutShipping').textContent = 'FREE';
    document.getElementById('checkoutTotal').textContent = `$${total.toFixed(2)}`;
}

function setupPaymentMethods() {
    const paymentMethods = document.querySelectorAll('.payment-method');

    paymentMethods.forEach(method => {
        method.addEventListener('click', function () {
            paymentMethods.forEach(m => m.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function setupPlaceOrder() {
    const placeOrderBtn = document.getElementById('placeOrderBtn');

    placeOrderBtn.addEventListener('click', function (e) {
        e.preventDefault();

        // Validate form
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;
        const city = document.getElementById('city').value;
        const state = document.getElementById('state').value;
        const zip = document.getElementById('zip').value;

        if (!firstName || !lastName || !email || !phone || !address || !city || !state || !zip) {
            alert('Please fill in all required fields');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Simulate order placement
        placeOrderBtn.textContent = 'Processing...';
        placeOrderBtn.disabled = true;

        setTimeout(() => {
            // Clear cart
            cart.clearCart();

            // Show success message
            alert('Order placed successfully! Thank you for your purchase.');

            // Redirect to home
            window.location.href = 'index.html';
        }, 2000);
    });
}
