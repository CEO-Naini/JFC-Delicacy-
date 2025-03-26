import { cart, addToCart } from '../data/cart.js';

let productsHTML = '';

async function fetchProducts() {
  try {
    const response = await fetch('http://localhost:4000/api/products');
    if (!response.ok) throw new Error('Failed to fetch products');

    const products = await response.json();

    products.forEach((product) => {
      productsHTML += `
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image" src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-price">Ksh${product.price}</div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector" data-product-id="${product.id}">
              ${Array.from({ length: 10 }, (_, i) => `<option value="${i + 1}">${i + 1}</option>`).join('')}
            </select>
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
      `;
    });

    document.querySelector('.js-products-grid').innerHTML = productsHTML;
    attachEventListeners();
  } catch (error) {
    console.error('Error loading products:', error);
  }
}

fetchProducts();

function updateCartQuantity() {
  let cartQuantity = cart.reduce((total, cartItem) => total + cartItem.quantity, 0);
  document.querySelector('.js-cart-quantity').textContent = cartQuantity;
}

function attachEventListeners() {
  document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      const quantity = parseInt(
        document.querySelector(`.js-quantity-selector[data-product-id="${productId}"]`).value,
        10
      );

      addToCart(productId, quantity);
      updateCartQuantity();

      // Show added message
      const addedMessage = document.createElement("div");
      addedMessage.classList.add("added-message");
      addedMessage.textContent = "Added to cart!";
      button.parentElement.appendChild(addedMessage);

      setTimeout(() => addedMessage.remove(), 2000);
    });
  });
}
