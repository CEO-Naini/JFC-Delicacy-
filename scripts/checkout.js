import { cart, removeFromCart } from "../../data/cart.js";

async function getProduct(productId) {
  const response = await fetch(`http://localhost:4000/api/products/${productId}`);
  return response.json();
}

async function renderOrderSummary() {
  let cartSummaryHTML = "";
  let totalPrice = 0;

  for (const cartItem of cart) {
    const product = await getProduct(cartItem.productId);
    totalPrice += cartItem.quantity * product.price;

    cartSummaryHTML += `
      <div class="cart-item-container js-cart-item-container-${product.id}">
        <div class="cart-item-details-grid">
          <img class="product-image" src="${product.image}">
          <div class="cart-item-details">
            <div class="product-name">${product.name}</div>
            <div class="product-price">Ksh ${product.price}</div>
            <div class="product-quantity">
              <span>Quantity: <span class="quantity-label">${cartItem.quantity}</span></span>
              <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${product.id}">Delete</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  let tax = totalPrice * 0.1;
  let grandTotal = totalPrice + tax;

  document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;
  document.querySelector(".js-items-count").textContent = cart.length;
  document.querySelectorAll(".js-total-price").forEach(el => el.textContent = totalPrice.toFixed(2));
  document.querySelector(".js-tax").textContent = tax.toFixed(2);
  document.querySelector(".js-grand-total").textContent = grandTotal.toFixed(2);

  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);
      renderOrderSummary();
    });
  });
}

// Function to handle order placement
// Function to handle order placement
async function placeOrder() {
  if (cart.length === 0) {
    alert("Your cart is empty. Add items before placing an order.");
    return;
  }

  const confirmOrder = confirm("Are you sure you want to place this order?");
  if (!confirmOrder) return;

  try {
    const userId = localStorage.getItem("user_id"); // Get user ID from local storage

    if (!userId) {
      alert("User not logged in!");
      return;
    }

    for (const cartItem of cart) {
      const orderData = {
        user_id: userId,  // Include user ID
        product_id: cartItem.productId,
        quantity: cartItem.quantity,
      };

      const response = await fetch("http://localhost:4000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Failed to place order");
      }
    }

    alert("Order placed successfully!");
    cart.length = 0; // Clear the cart
    renderOrderSummary();
  } catch (error) {
    console.error("Error placing order:", error);
    alert("An error occurred while placing the order. Please try again.");
  }
}



// Add event listener to the place order button
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".js-place-order").addEventListener("click", placeOrder);
});

// Load cart data
renderOrderSummary();
