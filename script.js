// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const closeMenuBtn = document.querySelector('.close-menu');
const overlay = document.createElement('div');
overlay.className = 'overlay';
document.body.appendChild(overlay);

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.add('active');
    overlay.style.display = 'block';
    document.body.style.overflow = 'hidden';
});

closeMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    overlay.style.display = 'none';
    document.body.style.overflow = '';
});

overlay.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    overlay.style.display = 'none';
    document.body.style.overflow = '';
});

// Mobile Submenu Toggle
const mobileDropdowns = document.querySelectorAll('.mobile-menu-dropdown > a');

mobileDropdowns.forEach(dropdown => {
    dropdown.addEventListener('click', (e) => {
        e.preventDefault();
        const submenu = dropdown.nextElementSibling;
        submenu.classList.toggle('active');
        dropdown.querySelector('i').classList.toggle('fa-chevron-up');
    });
});

// Search Toggle
const searchToggle = document.querySelector('.search-toggle');
const searchBox = document.querySelector('.search-box');

searchToggle.addEventListener('click', () => {
    searchBox.style.display = searchBox.style.display === 'block' ? 'none' : 'block';
});

// Close search box when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-container')) {
        searchBox.style.display = 'none';
    }
});

// Header Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Quick View Modal
const quickViewBtns = document.querySelectorAll('.quick-view-btn');
const modal = document.getElementById('quickViewModal');
const closeModal = document.querySelector('.close-modal');

quickViewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const productCard = btn.closest('.product-card');
        const productImage = productCard.querySelector('.product-image img').src;
        const productTitle = productCard.querySelector('.product-title').textContent;
        const currentPrice = productCard.querySelector('.current-price').textContent;
        const originalPrice = productCard.querySelector('.original-price')?.textContent || '';
        const ratingStars = productCard.querySelector('.stars').innerHTML;
        const ratingCount = productCard.querySelector('.rating-count').textContent;
        
        modal.querySelector('.modal-product-image img').src = productImage;
        modal.querySelector('.product-title').textContent = productTitle;
        modal.querySelector('.current-price').textContent = currentPrice;
        modal.querySelector('.original-price').textContent = originalPrice;
        modal.querySelector('.stars').innerHTML = ratingStars;
        modal.querySelector('.rating-count').textContent = ratingCount;
        
        // Sample product description
        modal.querySelector('.product-description').textContent = 
            `The ${productTitle} delivers exceptional performance with cutting-edge technology. ` +
            `Designed for the modern home, it offers seamless integration and stunning visuals.`;
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = '';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
});

// Quantity Selector
const quantityMinus = document.querySelector('.quantity-btn.minus');
const quantityPlus = document.querySelector('.quantity-btn.plus');
const quantityInput = document.querySelector('.quantity-selector input');

quantityMinus.addEventListener('click', () => {
    let value = parseInt(quantityInput.value);
    if (value > 1) {
        quantityInput.value = value - 1;
    }
});

quantityPlus.addEventListener('click', () => {
    let value = parseInt(quantityInput.value);
    quantityInput.value = value + 1;
});

// Color Selection
const colorOptions = document.querySelectorAll('.color-option');

colorOptions.forEach(option => {
    option.addEventListener('click', () => {
        colorOptions.forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');
    });
});

// Add to Cart Functionality
const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
const cartCount = document.querySelector('.cart-count');

addToCartBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        let count = parseInt(cartCount.textContent);
        cartCount.textContent = count + 1;
        
        // Add animation to cart icon
        const cartBtn = document.querySelector('.cart-btn');
        cartBtn.classList.add('animate');
        setTimeout(() => {
            cartBtn.classList.remove('animate');
        }, 500);
    });
});

// Wishlist Toggle
const wishlistBtns = document.querySelectorAll('.wishlist-btn');

wishlistBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const icon = btn.querySelector('i');
        if (icon.classList.contains('far')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            icon.style.color = 'var(--red)';
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            icon.style.color = '';
        }
    });
});

// Initialize Swiper for testimonials if needed
// const swiper = new Swiper('.testimonials-slider', {
//     loop: true,
//     slidesPerView: 1,
//     spaceBetween: 30,
//     pagination: {
//         el: '.swiper-pagination',
//         clickable: true,
//     },
//     breakpoints: {
//         768: {
//             slidesPerView: 2,
//         },
//         992: {
//             slidesPerView: 3,
//         }
//     }
// });
