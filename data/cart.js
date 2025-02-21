export let cart = [{
  productId: 'a82c6bac-3067-4e68-a5ba-d827ac0be010',
  quantity: 2,
},
{
  productId: '77919bbe-0e56-475b-adde-4f24dfed3a04',
  quantity:1
}];
export function addToCart(productId) {
    let matchingItem;
  
        cart.forEach((cartItem) => {
          if (productId === cartItem.productId) {
            matchingItem = cartItem;
          }
        });
  
        if (matchingItem) {
          matchingItem.quantity += 1;
        } else {
          cart.push({
            productId: productId,
            quantity: 1
          });
        } 
  }

