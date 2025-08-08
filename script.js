document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: 'Milk', price: 25.50 },
        { id: 2, name: 'Bread', price: 18.75 },
        { id: 3, name: 'Cheese', price: 45.00 },
        { id: 4, name: 'Apples', price: 32.20 },
        { id: 5, name: 'Oranges', price: 28.00 },
        { id: 6, name: 'Chicken', price: 75.99 },
        { id: 7, name: 'Rice', price: 55.40 },
        { id: 8, name: 'Tomatoes', price: 15.00 }
    ];

    let cart = [];
    const productList = document.getElementById('product-list');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    productList.addEventListener('click', (e) => {
        const productItem = e.target.closest('.product-item');
        if (productItem) {
            const productId = parseInt(productItem.dataset.id);
            addToCart(productId);
        }
    });

    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        if (product) {
            cart.push(product);
            displayCart();
        }
    }

    function displayCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <span>${item.name}</span>
                <span>R${item.price.toFixed(2)}</span>
            `;
            cartItemsContainer.appendChild(cartItem);
            total += item.price;
        });
        cartTotal.textContent = total.toFixed(2);
    }

    function displayProducts() {
        products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.className = 'product-item';
            productItem.dataset.id = product.id;
            productItem.innerHTML = `
                <p>${product.name}</p>
                <p>R${product.price.toFixed(2)}</p>
            `;
            productList.appendChild(productItem);
        });
    }

    displayProducts();
});
