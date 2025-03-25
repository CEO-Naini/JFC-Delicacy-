export function getProduct(productId) {
  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  return matchingProduct;
}
  
  
export const products = [
  {
    id: "8c9c52b5-5a19-4bcb-a5d1-158a74287c53",
    image: "images/products/5 piece chicken.jpeg",
    name: "5 piece chicken",
    rating: {
      stars: 4.5,
      count: 76
    },
    price: 1230
  },
  {
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    image: "images/products/200g chips masala.jpg",
    name: "Chips Masala",
    rating: {
      stars: 4.5,
      count: 87
    },
    price: 200
  },
  {
    id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    image: "images/products/egg fried burger.jpg",
    name: "Egg fried burger",
    rating: {
      stars: 4,
      count: 10
    },
    price: 150
  },
  {
    id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
    image: "images/products/frozen french fries.jpg",
    name: "French fries",
    rating: {
      stars: 4.5,
      count: 56
    },
    price: 430
  },
  {
    id: "54e0eccd-8f36-462b-b68a-8182611d9add",
    image: "images/products/in &out burger.jpg",
    name: " In & Out burger",
    rating: {
      stars: 4.5,
      count: 58
    },
    price: 230
  },
  {
    id: "3ebe75dc-64d2-4137-8860-1f5a963e534b",
    image: "images/products/200g Bhajia.jpeg",
    name: " 200g Bhajia",
    rating: {
      stars: 4.5,
      count: 37
    },
    price: 230
  },
  {
    id: "8c9c52b5-5a19-4bcb-a5d1-158a74287c53",
    image: "images/products/5 piece chicken.jpeg",
    name: "5 piece chicken",
    rating: {
      stars: 4.5,
      count: 76
    },
    price: 1230
  },
  {
    id: "dd82ca78-a18b-4e2a-9250-31e67412f98d",
    image: "images/products/Beef stew with rice.jpeg",
    name: "Beef stew with rice",
    rating: {
      stars: 4.5,
      count: 90
    },
    price: 199
  },
  {
    id: "77919bbe-0e56-475b-adde-4f24dfed3a04",
    image: "images/products/chapo beef.jpeg",
    name: "Chapo beef",
    rating: {
      stars: 4.5,
      count: 144
    },
    price: 120
  },
  {
    id: "3fdfe8d6-9a15-4979-b459-585b0d0545b9",
    image: "images/products/Chips mwitu.jpeg",
    name: "Chips mwitu",
    rating: {
      stars: 4.5,
      count: 30
    },
    price: 199
  },
  {
    id: "58b4fc92-e98c-42aa-8c55-b6b79996769a",
    image: "images/products/pilau beef.jpeg",
    name: "Pilau beef",
    rating: {
      stars: 4.5,
      count: 89
    },
    price: 130
  },
  {
    id: "5968897c-4d27-4872-89f6-5bcb052746d7",
    image: "images/products/matoke fries.jpeg",
    name: "Matoke fries",
    rating: {
      stars: 4.5,
      count: 23
    },
    price: 149
  },
  {
    id: "aad29d11-ea98-41ee-9285-b916638cac4a",
    image: "images/products/scrambled eggs and beef over rice.jpeg",
    name: "Scrambled eggs & beef over rice",
    rating: {
      stars: 4.5,
      count: 30
    },
    price: 299
  },
  {
    id: "04701903-bc79-49c6-bc11-1af7e3651358",
    image: "images/products/kachumbari salad.jpeg",
    name: "Kachumbari salad",
    rating: {
      stars: 4.5,
      count: 56
    },
    price: 189
  },
  {
    id: "901eb2ca-386d-432e-82f0-6fb1ee7bf969",
    image: "images/products/Garlic masala.jpeg",
    name: "Garlic Masala",
    rating: {
      stars: 4.5,
      count: 36
    },
    price: 799
  },
  {
    id: "82bb68d7-ebc9-476a-989c-c78a40ee5cd9",
    image: "images/products/fish and fries.jpeg",
    name: "fish and fries",
    rating: {
      stars: 4,
      count: 60
    },
    price: 299
  },
  {
    id: "c2a82c5e-aff4-435f-9975-517cfaba2ece",
    image: "images/products/Fried chicken.jpeg",
    name: "Fried chicken",
    rating: {
      stars: 4.5,
      count: 84
    },
    price: 999
  },
  {
    id: "6b07d4e7-f540-454e-8a1e-363f25dbae7d",
    image: "images/products/frozen french fries.jpg",
    name: "Frozen french fries",
    rating: {
      stars: 4.5,
      count: 99
    },
    price: 399
  },
  {
    id: "a82c6bac-3067-4e68-a5ba-d827ac0be010",
    image: "images/products/ugali beef.jpeg",
    name: "Ugali beef",
    rating: {
      stars: 4.5,
      count: 52
    },
    price: 120
  },
  {
    id: "3ebe75dc-64d2-4137-8860-1f5a963e534b",
    image: "images/products/200g Bhajia.jpeg",
    name: " 200g Bhajia",
    rating: {
      stars: 4.5,
      count: 37
    },
    price: 230
  },
];