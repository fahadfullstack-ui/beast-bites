// Shopping Cart Functionality
class ShoppingCart {
    constructor() {
        this.cart = this.loadCart();
        this.updateCartCount();
    }

    loadCart() {
        const cartData = localStorage.getItem('beastBitesCart');
        return cartData ? JSON.parse(cartData) : [];
    }

    saveCart() {
        localStorage.setItem('beastBitesCart', JSON.stringify(this.cart));
        this.updateCartCount();
    }

    addToCart(product) {
        const existingItem = this.cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += product.quantity;
        } else {
            this.cart.push(product);
        }
        
        this.saveCart();
        this.showNotification('Product added to cart!');
        return true;
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
    }

    updateQuantity(productId, quantity) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            item.quantity = parseInt(quantity);
            if (item.quantity <= 0) {
                this.removeFromCart(productId);
            } else {
                this.saveCart();
            }
        }
    }

    getCart() {
        return this.cart;
    }

    getCartCount() {
        return this.cart.reduce((total, item) => total + item.quantity, 0);
    }

    getCartTotal() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    clearCart() {
        this.cart = [];
        this.saveCart();
    }

    updateCartCount() {
        const cartBadge = document.querySelector('.cart-count');
        const count = this.getCartCount();
        
        if (cartBadge) {
            cartBadge.textContent = count;
            cartBadge.style.display = count > 0 ? 'flex' : 'none';
        }
    }

    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 6L9 17l-5-5"/>
                </svg>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Trigger animation
        setTimeout(() => notification.classList.add('show'), 10);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Initialize cart
const cart = new ShoppingCart();

// Add to cart button handler
document.addEventListener('DOMContentLoaded', function() {
    const addToCartBtn = document.querySelector('.add-to-cart');
    
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            // Get product data from the page
            const productData = {
                id: this.dataset.productId || 'product-' + Date.now(),
                name: document.querySelector('.detail-title')?.textContent || 'Product',
                price: parseFloat(document.querySelector('.detail-price-row .price')?.textContent.replace('$', '') || 0),
                image: document.querySelector('.mainSwiper .swiper-slide img')?.src || '',
                quantity: 1
            };
            
            cart.addToCart(productData);
        });
    }

    // Cart icon click handler
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.style.cursor = 'pointer';
        cartIcon.addEventListener('click', function() {
            window.location.href = 'cart.html';
        });
    }
});
