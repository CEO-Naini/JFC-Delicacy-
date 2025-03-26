export let cart = JSON.parse(localStorage.getItem("cart")) || [];

export function addToCart(productId, quantity = 1) {
  const existingItem = cart.find((item) => item.productId === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ productId, quantity });
  }

  localStorage.setItem("cart", JSON.stringify(cart)); // Persist cart
}

export function removeFromCart(productId) {
  cart = cart.filter((item) => item.productId !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
}
