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

        // Simple search functionality
        const searchForm = document.querySelector('.search-form');
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchTerm = this.querySelector('.search-input').value.toLowerCase();
            const productCards = document.querySelectorAll('.product-card');
            
            productCards.forEach(card => {
                const productName = card.querySelector('.product-name').textContent.toLowerCase();
                const productModel = card.querySelector('.product-model').textContent.toLowerCase();
                
                if (productName.includes(searchTerm) || productModel.includes(searchTerm)) {
                    card.style.display = 'block';
                    // Scroll to the first matching product
                    if (!this.scrolled) {
                        card.scrollIntoView({ behavior: 'smooth' });
                        this.scrolled = true;
                    }
                } else {
                    card.style.display = 'none';
                }
            });
        });
