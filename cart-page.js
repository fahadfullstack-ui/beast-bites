// Cart Page Functionality
document.addEventListener('DOMContentLoaded', function () {
    displayCartItems();

    // Listen for storage changes (when cart is updated from other pages)
    window.addEventListener('storage', function (e) {
        if (e.key === 'beastBitesCart') {
            displayCartItems();
        }
    });
});

function displayCartItems() {
    const cartItems = cart.getCart();
    const container = document.getElementById('cartItemsContainer');

    if (cartItems.length === 0) {
        container.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <h2>Your cart is empty</h2>
                <p>Add some amazing products to get started!</p>
                <a href="index.html" class="continue-shopping-btn">Start Shopping</a>
            </div>
        `;
        updateCartSummary(0, 0, 0);
        return;
    }

    const itemsHTML = cartItems.map(item => `
        <div class="cart-item" data-product-id="${item.id}">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            
            <div class="cart-item-details">
                <h3 class="cart-item-name">${item.name}</h3>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="updateItemQuantity('${item.id}', ${item.quantity - 1})">−</button>
                    <span class="quantity-value">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateItemQuantity('${item.id}', ${item.quantity + 1})">+</button>
                </div>
            </div>
            
            <div class="cart-item-actions">
                <button class="remove-btn" onclick="removeItem('${item.id}')" title="Remove item">×</button>
                <div class="cart-item-total">$${(item.price * item.quantity).toFixed(2)}</div>
            </div>
        </div>
    `).join('');

    container.innerHTML = `<div class="cart-items">${itemsHTML}</div>`;

    // Update summary
    const subtotal = cart.getCartTotal();
    const tax = subtotal * 0.08; // 8% tax
    const shipping = subtotal >= 70 ? 0 : 0; // Free shipping on subscriptions & orders $70+
    const total = subtotal + tax + shipping;

    updateCartSummary(subtotal, tax, shipping, total);
}

function updateCartSummary(subtotal, tax, shipping, total) {
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('shipping').textContent = shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`;
    document.getElementById('total').textContent = `$${(total || 0).toFixed(2)}`;
}

function updateItemQuantity(productId, newQuantity) {
    if (newQuantity < 1) {
        removeItem(productId);
        return;
    }

    cart.updateQuantity(productId, newQuantity);
    displayCartItems();
}

function removeItem(productId) {
    if (confirm('Are you sure you want to remove this item?')) {
        cart.removeFromCart(productId);
        displayCartItems();
    }
}
