const productList = document.getElementById("productList");


const cartButton = document.querySelector(".cart-toggle");
const shoppingCart = document.getElementById("shopping-cart");
const cartItems = document.getElementById("cart-items");

const cart = {};

let products = [];


cartButton.addEventListener("click", () => {
    shoppingCart.classList.toggle("hidden");
});


const getData = async () => {
    try {
        const response = await fetch("./products.json");

        if (!response.ok) {
            console.error("Error from server: " + response.status);
            return;
        }

        products = await response.json();

        console.log(products);

        renderProducts();

    } catch (error) {
        console.error("Error:", error);
    }
};


const renderProducts = () => {

    products.forEach((product) => {

        // Product card
        const article = document.createElement("article");
        article.classList.add("product-card");


        // Badge
        if (product.badge) {

            const badge = document.createElement("span");

            badge.classList.add("badge");

            if (product.badge === "Popular") {
                badge.classList.add("popular");
            }

            else if (product.badge === "New") {
                badge.classList.add("new");
            }

            else if (product.badge === "25% Off") {
                badge.classList.add("sale");
            }

            badge.textContent = product.badge;

            article.appendChild(badge);
        }


        // Product name
        const name = document.createElement("h3");
        name.textContent = product.name;


        // Product image
        const image = document.createElement("img");
        image.src = product.image;
        image.alt = product.imageAlt;


        // Product description
        const desc = document.createElement("p");
        desc.textContent = product.description;


        // Product price
        const price = document.createElement("p");
        price.innerHTML =
            `<strong>Price:</strong> $${product.price.toFixed(2)}`;


        // Buy button
        const buyButton = document.createElement("button");

        buyButton.classList.add("buy-btn");
        buyButton.dataset.product = product.id;
        buyButton.type = "button";
        buyButton.textContent = "Buy";


        // Buy button functionality
        buyButton.addEventListener("click", () => {

            cart[product.id] = (cart[product.id] || 0) + 1;

            renderCart();

            shoppingCart.classList.remove("hidden");
        });


        // Add elements to product card
        article.appendChild(name);
        article.appendChild(image);
        article.appendChild(desc);
        article.appendChild(price);
        article.appendChild(buyButton);

        productList.appendChild(article);
    });
};


const renderCart = () => {

    cartItems.innerHTML = "";

    for (const productId in cart) {

        const product = products.find(
            (product) => product.id === productId
        );

        if (!product) {
            continue;
        }


        // Cart item
        const li = document.createElement("li");
        li.classList.add("cart-item");


        // Product name and price
        const productInfo = document.createElement("span");

        productInfo.textContent =
            `${product.name} - $${product.price.toFixed(2)}`;


        // Quantity controls
        const quantityControls = document.createElement("div");
        quantityControls.classList.add("quantity-controls");


        // Decrease button
        const decreaseButton = document.createElement("button");

        decreaseButton.textContent = "−";
        decreaseButton.type = "button";


        // Quantity
        const quantity = document.createElement("span");

        quantity.textContent = cart[productId];


        // Increase button
        const increaseButton = document.createElement("button");

        increaseButton.textContent = "+";
        increaseButton.type = "button";


        // Decrease quantity
        decreaseButton.addEventListener("click", () => {

            cart[productId]--;

            if (cart[productId] <= 0) {
                delete cart[productId];
            }

            renderCart();
        });


        // Increase quantity
        increaseButton.addEventListener("click", () => {

            cart[productId]++;

            renderCart();
        });


        // Build quantity controls
        quantityControls.appendChild(decreaseButton);
        quantityControls.appendChild(quantity);
        quantityControls.appendChild(increaseButton);


        // Build cart item
        li.appendChild(productInfo);
        li.appendChild(quantityControls);

        cartItems.appendChild(li);
    }
};

getData();