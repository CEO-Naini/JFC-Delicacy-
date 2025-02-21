import { cart } from "../data/cart";
import { products } from "../data/products.js";

let cartSummaryHTML = "";

cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    let matchingProduct;
    products.forEach((product) => {
        if (productId === productId) {
            matchingProduct = product;
        }
    });


    cartSummaryHTML += `
   <div class="cart-item-container">

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                Ksh ${matchingProduct.price}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary">
                    Delete
                  </span>
                </div>
              </div>
            </div>
          </div> 

    `;
});
import {cart } from "../data/cart";
import{products} from "../data/products.js";

let cartSummaryHTML = "";

cart.forEach((cartItem) => {
const productId = cartItem.productId;

let matchingProduct;
products.forEach( (product) => {
 if (productId === productId){
    matchingProduct = product;
 }
});


 cartSummaryHTML += `
   <div class="cart-item-container">

      <div class="cart-item-details-grid">
    <img class="product-image"
        src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                Ksh ${matchingProduct.price}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary">
                    Delete
                  </span>
                </div>
              </div>
            </div>
          </div> 

    `;
});

document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

