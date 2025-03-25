import {cart, removeFromCart} from '../../data/cart.js';
import {products, getProduct} from '../../data/products.js';

function renderOrdersummary() {
let cartSummaryHTML = '';

cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });
  cartSummaryHTML += `
  <div class="cart-item-container
      js-cart-item-container-${matchingProduct.id}">
      

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            Ksh${matchingProduct.price}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>
      </div>
    </div>
  `;
});

 let productPrice = 0;
 let paymentSummaryHTML;


  cart.forEach((cartItem) => {
   const product = getProduct(cartItem.productId);
   
    productPrice += product.price * cartItem.quantity; 
  });
  const tax = productPrice * 0.1;
  const total = productPrice + tax;

   paymentSummaryHTML = `
   <div class="payment-summary-title js-payment-summary">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${cart.length}):</div>
            <div class="payment-summary-money">Ksh ${productPrice} </div>
          </div>

          <div class="payment-summary-row">
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">Ksh ${productPrice} </div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">Ksh ${tax}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">Ksh ${total}</div>
          </div>

          <button class="place-order-button button-primary js-place-order">
            Place your order
          </button>
  `;


document.querySelector('.js-order-summary')
  .innerHTML = cartSummaryHTML;
  
document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHTML;

document.querySelector(".js-place-order").addEventListener("click", async () => {
  const phone = prompt("Enter your M-Pesa number:");
  const amount = 1606; // Replace with actual order total

  if (!phone) return alert("Phone number is required!");

  try {
      const response = await fetch("http://localhost:3000/stkpush", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone, amount }),
      });

      const result = await response.json();
      if (result.success) {
          alert("STK Push Sent! Enter M-Pesa PIN to complete payment.");
      } else {
          alert("Error: " + result.error);
      }
  } catch (error) {
      alert("Network error. Try again.");
  }
});

document.querySelectorAll('.js-delete-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.remove();
      renderOrdersummary();
      
    });
  });
};
renderOrdersummary();
