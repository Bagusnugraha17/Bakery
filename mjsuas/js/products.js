// Products data
const products = {
    cakes: [
        {
            id: 1,
            name: "Chocolate Cake",
            price: "Rp 150,000",
            image: "images/cake1.jpg",
            description: "Rich chocolate cake with creamy frosting"
        },
        // Add more cake products
    ],
    breads: [
        {
            id: 10,
            name: "Japanese Milk Bread",
            price: "Rp 45,000",
            image: "images/bread1.jpg",
            description: "Soft and fluffy Japanese-style milk bread"
        },
        // Add more bread products
    ],
    cookies: [
        {
            id: 20,
            name: "Matcha Cookies",
            price: "Rp 35,000",
            image: "images/cookie1.jpg",
            description: "Crispy matcha flavored cookies"
        },
        // Add more cookie products
    ]
};

// Load products function
function loadProducts(category) {
    const container = document.querySelector(`#${category} .row`);
    if (!container) return;
    
    container.innerHTML = products[category].map(product => `
        <div class="col-md-4 mb-4">
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}" class="img-fluid">
                <div class="product-info">
                    <h5>${product.name}</h5>
                    <p class="product-price">${product.price}</p>
                    <p class="product-description">${product.description}</p>
                    <button class="btn add-to-cart" data-id="${product.id}">Add to Cart</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Initialize products on page load
document.addEventListener('DOMContentLoaded', function() {
    // Load all product categories
    Object.keys(products).forEach(category => {
        loadProducts(category);
    });
    
    // Add to cart functionality
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = e.target.dataset.id;
            addToCart(productId);
        }
    });
});

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productId) {
    // Find product in all categories
    let product = null;
    for (const category in products) {
        product = products[category].find(p => p.id == productId);
        if (product) break;
    }
    
    if (product) {
        const existingItem = cart.find(item => item.id == productId);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        
        // Show notification
        showNotification(`${product.name} added to cart!`);
    }
}

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px;
        border-radius: 5px;
        z-index: 10000;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}