// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const closeMenuBtn = document.querySelector('.close-menu');
const overlay = document.querySelector('.overlay');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
});

closeMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
});

overlay.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
});

// Cart Functionality
const cartIcon = document.querySelector('.cart-icon');
const cartSidebar = document.querySelector('.cart-sidebar');
const closeCartBtn = document.querySelector('.close-cart');
const cartCount = document.querySelector('.cart-count');
const cartItemsContainer = document.querySelector('.cart-items');
const emptyCartMessage = document.querySelector('.empty-cart');
const cartTotalSection = document.querySelector('.cart-total');
const checkoutBtn = document.querySelector('.checkout-btn');
const notification = document.querySelector('.notification');

let cart = [];
let favorites = [];

// Toggle cart sidebar
cartIcon.addEventListener('click', () => {
    cartSidebar.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
});

closeCartBtn.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
});

// Show notification
function showNotification(message, type = 'success') {
    const notificationMessage = document.querySelector('.notification-message');
    notificationMessage.textContent = message;
    notification.className = 'notification';
    notification.classList.add('active', type);
    
    setTimeout(() => {
        notification.classList.remove('active');
    }, 3000);
}

// Add to cart functionality
const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const productCard = e.target.closest('.product-card');
        const productId = productCard.dataset.id || Math.floor(Math.random() * 1000);
        const productTitle = productCard.querySelector('.product-title').textContent;
        const productPrice = parseFloat(productCard.querySelector('.current-price').textContent.replace('$', ''));
        const productImage = productCard.querySelector('.product-image img').src;
        const productCategory = productCard.querySelector('.product-category').textContent;

        // Check if product already in cart
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: productId,
                title: productTitle,
                price: productPrice,
                image: productImage,
                category: productCategory,
                quantity: 1
            });
        }

        updateCart();
        showNotification(`${productTitle} added to cart`);
    });
});

// Update cart UI
function updateCart() {
    // Update cart count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Update cart items
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        emptyCartMessage.style.display = 'flex';
        cartTotalSection.style.display = 'none';
        checkoutBtn.style.display = 'none';
    } else {
        emptyCartMessage.style.display = 'none';
        cartTotalSection.style.display = 'block';
        checkoutBtn.style.display = 'flex';

        let subtotal = 0;

        cart.forEach(item => {
            subtotal += item.price * item.quantity;

            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'cart-item';
            cartItemElement.innerHTML = `
                <div class="cart-item-img">
                    <img src="${item.image}" alt="${item.title}">
                </div>
                <div class="cart-item-details">
                    <h3 class="cart-item-title">${item.title}</h3>
                    <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                    <div class="cart-item-actions">
                        <button class="quantity-btn minus">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn plus">+</button>
                        <button class="remove-item">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;

            cartItemsContainer.appendChild(cartItemElement);

            // Add event listeners to quantity buttons
            const minusBtn = cartItemElement.querySelector('.minus');
            const plusBtn = cartItemElement.querySelector('.plus');
            const removeBtn = cartItemElement.querySelector('.remove-item');
            const quantityDisplay = cartItemElement.querySelector('.quantity');

            minusBtn.addEventListener('click', () => {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                    quantityDisplay.textContent = item.quantity;
                    updateCart();
                }
            });

            plusBtn.addEventListener('click', () => {
                item.quantity += 1;
                quantityDisplay.textContent = item.quantity;
                updateCart();
            });

            removeBtn.addEventListener('click', () => {
                cart = cart.filter(cartItem => cartItem.id !== item.id);
                updateCart();
                showNotification(`${item.title} removed from cart`, 'error');
            });
        });

        // Update totals
        const shipping = 0; // Free shipping
        const total = subtotal + shipping;

        document.querySelector('.subtotal').textContent = `$${subtotal.toFixed(2)}`;
        document.querySelector('.total').textContent = `$${total.toFixed(2)}`;
    }
}

// Favorite functionality
const favoriteButtons = document.querySelectorAll('.favorite');
favoriteButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        const productCard = e.target.closest('.product-card');
        const productId = productCard.dataset.id || Math.floor(Math.random() * 1000);
        const productTitle = productCard.querySelector('.product-title').textContent;

        if (button.classList.contains('active')) {
            button.classList.remove('active');
            favorites = favorites.filter(id => id !== productId);
            showNotification(`${productTitle} removed from favorites`, 'error');
        } else {
            button.classList.add('active');
            favorites.push(productId);
            showNotification(`${productTitle} added to favorites`);
        }
    });
});

// Filter functionality
const filterBtn = document.querySelector('.filter-btn');
filterBtn.addEventListener('click', () => {
    const selectedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked')).map(cb => cb.value);
    const selectedBrands = Array.from(document.querySelectorAll('input[name="brand"]:checked')).map(cb => cb.value);
    const maxPrice = parseFloat(document.querySelector('.price-range').value);

    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const cardCategory = card.dataset.category;
        const cardBrand = card.dataset.brand;
        const cardPrice = parseFloat(card.dataset.price);

        const categoryMatch = selectedCategories.includes(cardCategory);
        const brandMatch = selectedBrands.includes(cardBrand);
        const priceMatch = cardPrice <= maxPrice;

        if (categoryMatch && brandMatch && priceMatch) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

// Sort functionality
const sortSelect = document.getElementById('sort-products');
sortSelect.addEventListener('change', () => {
    const sortValue = sortSelect.value;
    const productsGrid = document.querySelector('.products-grid');
    const productCards = Array.from(document.querySelectorAll('.product-card'));

    productCards.sort((a, b) => {
        const aPrice = parseFloat(a.dataset.price);
        const bPrice = parseFloat(b.dataset.price);
        const aTitle = a.querySelector('.product-title').textContent.toLowerCase();
        const bTitle = b.querySelector('.product-title').textContent.toLowerCase();

        switch (sortValue) {
            case 'price-low':
                return aPrice - bPrice;
            case 'price-high':
                return bPrice - aPrice;
            case 'name-asc':
                return aTitle.localeCompare(bTitle);
            case 'name-desc':
                return bTitle.localeCompare(aTitle);
            default:
                return 0;
        }
    });

    // Re-append sorted products
    productCards.forEach(card => productsGrid.appendChild(card));
});

// Price range display
const priceRange = document.querySelector('.price-range');
const priceValues = document.querySelectorAll('.price-values span');

priceRange.addEventListener('input', () => {
    priceValues[1].textContent = `$${priceRange.value}`;
});
