// Audio product filtering
document.addEventListener('DOMContentLoaded', function() {
    const filterBtn = document.querySelector('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    filterBtn.addEventListener('click', function() {
        // Get selected categories
        const selectedCategories = [];
        document.querySelectorAll('input[name="category"]:checked').forEach(checkbox => {
            selectedCategories.push(checkbox.value);
        });
        
        // Get selected brands
        const selectedBrands = [];
        document.querySelectorAll('input[name="brand"]:checked').forEach(checkbox => {
            selectedBrands.push(checkbox.value);
        });
        
        // Get selected features
        const selectedFeatures = [];
        document.querySelectorAll('input[name="feature"]:checked').forEach(checkbox => {
            selectedFeatures.push(checkbox.value);
        });
        
        // Get price range
        const priceRange = document.querySelector('.price-range').value;
        
        // Filter products
        productCards.forEach(card => {
            const category = card.dataset.category;
            const brand = card.dataset.brand;
            const features = card.dataset.feature.split(' ');
            const price = parseFloat(card.dataset.price);
            
            const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(category);
            const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(brand);
            const featureMatch = selectedFeatures.length === 0 || 
                selectedFeatures.some(feature => features.includes(feature));
            const priceMatch = price <= priceRange;
            
            if (categoryMatch && brandMatch && featureMatch && priceMatch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
    
    // Sort products
    const sortSelect = document.getElementById('sort-products');
    sortSelect.addEventListener('change', function() {
        const productsContainer = document.querySelector('.products-grid');
        const productCards = Array.from(document.querySelectorAll('.product-card'));
        
        productCards.sort((a, b) => {
            const aPrice = parseFloat(a.dataset.price);
            const bPrice = parseFloat(b.dataset.price);
            const aName = a.querySelector('.product-title').textContent;
            const bName = b.querySelector('.product-title').textContent;
            
            switch(this.value) {
                case 'price-low':
                    return aPrice - bPrice;
                case 'price-high':
                    return bPrice - aPrice;
                case 'name-asc':
                    return aName.localeCompare(bName);
                case 'name-desc':
                    return bName.localeCompare(aName);
                default:
                    return 0;
            }
        });
        
        // Re-append sorted products
        productCards.forEach(card => {
            productsContainer.appendChild(card);
        });
    });
});
