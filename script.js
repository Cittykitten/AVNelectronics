// Initialize Swiper
const swiper = new Swiper('.swiper', {
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});

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

// Initialize GSAP animations
gsap.registerPlugin(ScrollTrigger);

// Animate elements on scroll
gsap.utils.toArray('.hidden').forEach((element) => {
    gsap.from(element, {
        scrollTrigger: {
            trigger: element,
            start: "top 80%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power2.out"
    });
});

// More advanced animations for specific sections
// Features section animation
gsap.from(".feature-card", {
    scrollTrigger: {
        trigger: ".features",
        start: "top 70%",
        toggleActions: "play none none none"
    },
    opacity: 0,
    y: 50,
    duration: 0.8,
    stagger: 0.2,
    ease: "back.out(1)"
});

// Products section animation
gsap.from(".product-card", {
    scrollTrigger: {
        trigger: ".products",
        start: "top 70%",
        toggleActions: "play none none none"
    },
    opacity: 0,
    y: 50,
    duration: 0.8,
    stagger: 0.15,
    ease: "power2.out"
});

// Newsletter animation
gsap.from(".newsletter", {
    scrollTrigger: {
        trigger: ".newsletter",
        start: "top 80%",
        toggleActions: "play none none none"
    },
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "elastic.out(1, 0.5)"
});

// Header animation on scroll
gsap.to("header", {
    scrollTrigger: {
        trigger: "body",
        start: "50px top",
        toggleActions: "play none none none"
    },
    backgroundColor: "rgba(255,255,255,0.9)",
    backdropFilter: "blur(10px)",
    duration: 0.5,
    ease: "power2.out"
});

// Search Functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('header-search-form');
    const searchInput = document.getElementById('header-search-input');
    const searchBtn = document.querySelector('.header-search-btn');
    const suggestionsContainer = document.querySelector('.search-suggestions');
    const header = document.querySelector('header');

    // Sample product data (replace with your actual data or API call)
    const products = [
        { id: 1, name: "Quantum X Series TV", model: "QX-65UHD", category: "Smart TVs", image: "https://via.placeholder.com/150" },
        { id: 2, name: "Crystal 4K HDR TV", model: "CR-55HDR", category: "Smart TVs", image: "https://via.placeholder.com/150" },
        { id: 3, name: "Surround 7.1 Audio System", model: "SR-7100", category: "Audio", image: "https://via.placeholder.com/150" },
        { id: 4, name: "SoundBar Pro", model: "SB-PRO32", category: "Audio", image: "https://via.placeholder.com/150" },
        { id: 5, name: "Smart Hub", model: "SH-CONTROL", category: "Smart Home", image: "https://via.placeholder.com/150" }
    ];

    // Toggle search on mobile
    searchBtn.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            header.classList.toggle('mobile-search-active');
            if (header.classList.contains('mobile-search-active')) {
                searchInput.focus();
            }
        }
    });

    // Handle search input
    searchInput.addEventListener('input', function() {
        const term = this.value.trim().toLowerCase();
        showSuggestions(term);
    });

    // Handle form submission
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const term = searchInput.value.trim();
        if (term) {
            window.location.href = `/search.html?q=${encodeURIComponent(term)}`;
        }
    });

    // Show search suggestions
    function showSuggestions(term) {
        if (term.length < 2) {
            suggestionsContainer.style.display = 'none';
            return;
        }

        const filtered = products.filter(product => 
            product.name.toLowerCase().includes(term) || 
            product.model.toLowerCase().includes(term) ||
            product.category.toLowerCase().includes(term)
        );

        if (filtered.length > 0) {
            suggestionsContainer.innerHTML = filtered.map(product => `
                <div class="search-suggestion-item" data-id="${product.id}">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="suggestion-text">
                        <h4>${product.name}</h4>
                        <p>${product.model} • ${product.category}</p>
                    </div>
                </div>
            `).join('');

            suggestionsContainer.style.display = 'block';
            
            // Add click handlers to suggestions
            document.querySelectorAll('.search-suggestion-item').forEach(item => {
                item.addEventListener('click', function() {
                    const productId = this.getAttribute('data-id');
                    window.location.href = `/product.html?id=${productId}`;
                });
            });
        } else {
            suggestionsContainer.innerHTML = '<div class="search-suggestion-item">No results found</div>';
            suggestionsContainer.style.display = 'block';
        }
    }

    // Close suggestions when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.header-search-container')) {
            suggestionsContainer.style.display = 'none';
        }
    });
});
