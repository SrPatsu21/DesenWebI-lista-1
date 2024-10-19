// Carregar produtos do arquivo JSON
const products = [
    { "id": 1, "name": "Notebook Dell Inspiron 15 3000", "price": 2999.99, "category": "Notebook", "brand": "Dell", "images": ["images/notebook-dell.jpg"] },
    { "id": 2, "name": "Monitor LG 24' LED Full HD", "price": 899.99, "category": "Monitor", "brand": "LG", "images": ["images/monitor-lg.jpg"] },
    { "id": 3, "name": "Teclado Mecânico Gamer HyperX Alloy FPS", "price": 299.99, "category": "Teclado", "brand": "HyperX", "images": ["images/teclado-hyperx.jpg"] },
    { "id": 4, "name": "Monitor LG 24' LED Full HD", "price": 899.99, "category": "Monitor", "brand": "LG", "images": ["images/monitor-lg.jpg"] },
    { "id": 5, "name": "Notebook Dell Inspiron 15 3000", "price": 2999.99, "category": "Notebook", "brand": "Dell", "images": ["images/notebook-dell.jpg"] },
    { "id": 6, "name": "Monitor LG 24' LED Full HD", "price": 899.99, "category": "Monitor", "brand": "LG", "images": ["images/monitor-lg.jpg"] },
    { "id": 7, "name": "Teclado Mecânico Gamer HyperX Alloy FPS", "price": 299.99, "category": "Teclado", "brand": "HyperX", "images": ["images/teclado-hyperx.jpg"] },
];

document.addEventListener("DOMContentLoaded", function() {
    displayProducts(products);
});

function displayProducts(products) {
    const productContainer = document.getElementById("products");
    productContainer.innerHTML = "";
    products.forEach(product => {
        productContainer.innerHTML += `
            <div class="product">
                <img src="${product.images[0]}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p>Preço: R$ ${product.price.toFixed(2)}</p>
                <button onclick="addToCart(${product.id})">Adicionar ao Carrinho</button>
            </div>
        `;
    });
}

function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const product = products.find(p => p.id === productId);
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Produto adicionado ao carrinho!");
}

function filterProducts() {
    const searchTerm = document.getElementById("search").value.toLowerCase();
    const category = document.getElementById("category").value;
    const filteredProducts = products.filter(p => {
        const matchName = p.name.toLowerCase().includes(searchTerm);
        const matchCategory = category ? p.category === category : true;
        return matchName && matchCategory;
    });
    displayProducts(filteredProducts);
}
