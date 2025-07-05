document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const closeMenuBtn = document.querySelector('.close-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
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
        document.querySelector('.cart-sidebar').classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Cart Toggle
    const cartIcon = document.querySelector('.cart-icon');
    const closeCartBtn = document.querySelector('.close-cart');
    const cartSidebar = document.querySelector('.cart-sidebar');
    
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

    // Cart Functionality
    const cartItems = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total');
    const checkoutBtn = document.querySelector('.checkout-btn');
    const emptyCart = document.querySelector('.empty-cart');
    const cartCount = document.querySelector('.cart-count');
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    const notification = document.querySelector('.notification');
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    function updateCart() {
        // Update cart count
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
        
        // Update cart sidebar
        if (cart.length === 0) {
            emptyCart.style.display = 'flex';
            cartTotal.style.display = 'none';
            checkoutBtn.style.display = 'none';
            cartItems.innerHTML = '';
        } else {
            emptyCart.style.display = 'none';
            cartTotal.style.display = 'block';
            checkoutBtn.style.display = 'block';
            
            cartItems.innerHTML = '';
            cart.forEach((item, index) => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <div class="cart-item-img">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="cart-item-details">
                        <h3 class="cart-item-title">${item.name}</h3>
                        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                        <div class="cart-item-actions">
                            <button class="quantity-btn minus" data-index="${index}">-</button>
                            <span class="quantity">${item.quantity}</span>
                            <button class="quantity-btn plus" data-index="${index}">+</button>
                            <span class="remove-item" data-index="${index}"><i class="fas fa-trash"></i></span>
                        </div>
                    </div>
                `;
                cartItems.appendChild(cartItem);
            });
            
            // Calculate totals
            const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
            document.querySelector('.subtotal').textContent = `$${subtotal.toFixed(2)}`;
            document.querySelector('.total').textContent = `$${subtotal.toFixed(2)}`;
        }
        
        // Save to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    
    // Add to cart
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-title').textContent;
            const productPrice = parseFloat(productCard.querySelector('.current-price').textContent.replace('$', ''));
            const productImage = productCard.querySelector('.product-image img').src;
            
            // Check if item already in cart
            const existingItem = cart.find(item => item.name === productName);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    name: productName,
                    price: productPrice,
                    image: productImage,
                    quantity: 1
                });
            }
            
            updateCart();
            showNotification(`${productName} added to cart`);
        });
    });
    
    // Cart item actions
    cartItems.addEventListener('click', function(e) {
        if (e.target.classList.contains('minus') || e.target.closest('.minus')) {
            const index = e.target.classList.contains('minus') ? 
                e.target.dataset.index : e.target.closest('.minus').dataset.index;
            if (cart[index].quantity > 1) {
                cart[index].quantity -= 1;
            } else {
                cart.splice(index, 1);
            }
            updateCart();
        }
        
        if (e.target.classList.contains('plus') || e.target.closest('.plus')) {
            const index = e.target.classList.contains('plus') ? 
                e.target.dataset.index : e.target.closest('.plus').dataset.index;
            cart[index].quantity += 1;
            updateCart();
        }
        
        if (e.target.classList.contains('remove-item') || e.target.closest('.remove-item')) {
            const index = e.target.classList.contains('remove-item') ? 
                e.target.dataset.index : e.target.closest('.remove-item').dataset.index;
            cart.splice(index, 1);
            updateCart();
        }
    });
    
    // Checkout
    checkoutBtn.addEventListener('click', function() {
        alert('Proceeding to checkout!');
        cart = [];
        updateCart();
    });
    
    // Notification
    function showNotification(message) {
        notification.querySelector('.notification-message').textContent = message;
        notification.classList.add('active');
        setTimeout(() => {
            notification.classList.remove('active');
        }, 3000);
    }
    
    // Initialize cart
    updateCart();
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input').value;
            // Here you would typically send the email to your server
            alert(`Thank you for subscribing with ${email}!`);
            this.reset();
        });
    }
});
