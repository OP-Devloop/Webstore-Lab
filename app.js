const cartButton = document.querySelector(".cart-toggle");
const shoppingCart = document.getElementById("shopping-cart");
const cartItems = document.getElementById("cart-items");

cartButton.addEventListener("click", () => {
    shoppingCart.classList.toggle("hidden");
});

const cart = {};

function formatName(name) {
  return name
    .replace(/-/g, " ")
    .replace(/\b\w/g, letter => letter.toUpperCase());
}

function renderCart() {
  cartItems.innerHTML = "";

  for (const product in cart) {
    const li = document.createElement("li");
    li.className = "cart-item";

    li.innerHTML = `
      <span>${formatName(product)}</span>
      <div class="quantity-controls">
        <button class="decrease" data-product="${product}">−</button>
        <span>${cart[product]}</span>
        <button class="increase" data-product="${product}">+</button>
      </div>
    `;

    cartItems.appendChild(li);
  }

  document.querySelectorAll(".increase").forEach(button => {
    button.addEventListener("click", () => {
      cart[button.dataset.product]++;
      renderCart();
    });
  });

  document.querySelectorAll(".decrease").forEach(button => {
    button.addEventListener("click", () => {
      const product = button.dataset.product;
      cart[product]--;

      if (cart[product] <= 0) {
        delete cart[product];
      }

      renderCart();
    });
  });
}

document.querySelectorAll(".buy-btn").forEach(button => {
  button.addEventListener("click", () => {
    const product = button.dataset.product;

    cart[product] = (cart[product] || 0) + 1;

    renderCart();
    shoppingCart.classList.remove("hidden");
  });
});