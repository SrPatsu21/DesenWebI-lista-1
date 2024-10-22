const products =
    fetch('http://127.0.0.1:5500/exercicio-06/data/products.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }).then(data=>{
        return data;
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    }
    );

async function displayProducts(produc) {
    const productContainer = document.getElementById("products");
    productContainer.innerHTML = "";
    produc.then(data=>{
            data.forEach(product => {
                productContainer.innerHTML += `
                    <div class="product">
                        <img src="${product.images[0]}" alt="${product.name}">
                        <h2>${product.name}</h2>
                        <p>Preço: R$ ${product.price.toFixed(2)}</p>
                        <button onclick="addToCart(${product.id})">Adicionar ao Carrinho</button>
                    </div>
                `;
            })
        }
    )
}

async function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    products.then(data=>{
        const product = data.find(p => p.id === productId);
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Produto adicionado ao carrinho!");
    });
}

function filterProducts() {
    const searchTerm = document.getElementById("search").value.toLowerCase();
    const category = document.getElementById("category").value;
    const productContainer = document.getElementById("products");
    productContainer.innerHTML = "";
    products.then(data=>{
        const filteredProducts = data.filter(p => {
            const matchName = p.name.toLowerCase().includes(searchTerm);
            const matchCategory = category ? p.category === category : true;
            return matchName && matchCategory;
        });
        filteredProducts.forEach(product => {
            productContainer.innerHTML += `
                <div class="product">
                    <img src="${product.images[0]}" alt="${product.name}">
                    <h2>${product.name}</h2>
                    <p>Preço: R$ ${product.price.toFixed(2)}</p>
                    <button onclick="addToCart(${product.id})">Adicionar ao Carrinho</button>
                </div>
            `;
        });
    });
}

displayProducts(products);