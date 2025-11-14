console.log("JS Connected!");

const products = [
  { name: "Men Polo", category: "Polo", price: 15000, img: "images/polo1.jpg" },
  { name: "Men Polo", category: "Polo", price: 15000, img: "images/polo2.jpg" },
  { name: "Men Polo", category: "Polo", price: 15000, img: "images/polo3.jpg" },
  { name: "Men Polo", category: "Polo", price: 15000, img: "images/polo6.jpg" },
  { name: "Men Hoodie", category: "Hoodie", price: 25000, img: "images/hod1.jpg" },

  { name: "Men Luxury Sweatshirt", category: "Sweatshirt", price: 20000, img: "images/swe1.jpg" },
  { name: "Men Joggers", category: "Joggers", price: 28000, img: "images/jog1.jpg" },
  { name: "Men Joggers", category: "Joggers", price: 27000, img: "images/jog2.jpg" },
  { name: "Men Combo Short", category: "Short", price: 30000, img: "images/co1.jpg" },
  { name: "Men Combo Short", category: "Short", price: 30000, img: "images/co2.jpg" },

  { name: "Men Baggy Trousers", category: "Trousers", price: 29000, img: "images/tro1.jpg" },
  { name: "Men Baggy Trousers", category: "Trousers", price: 28000, img: "images/tro2.jpg" },
  { name: "Men Baggy Trousers", category: "Trousers", price: 28000, img: "images/tro3.jpg" },
  { name: "Men Ice Neckchain", category: "ice", price: 150000, img: "images/ic1.jpg" },
  { name: "Men Ice Neckchain", category: "ice", price: 150000, img: "images/ic2.jpg" },

  { name: "Men Jean Short", category: "Short", price: 16000, img: "images/sh1.jpg" },
  { name: "Men Jean Short", category: "Short", price: 16000, img: "images/sh2.jpg" },
  { name: "Men Jean Short", category: "Short", price: 16000, img: "images/sh3.jpg" },
  { name: "Men Sneaker", category: "Sneaker", price: 45000, img: "images/sn1.jpg" },
  { name: "Men Sneaker", category: "Sneaker", price: 80000, img: "images/sn2.jpg" },

  { name: "Men Watch", category: "Watch", price: 35000, img: "images/wat1.jpg" },
  { name: "Men Watch", category: "Watch", price: 38000, img: "images/wat2.jpg" },
  { name: "Men Watch", category: "Watch", price: 28000, img: "images/wat3.jpg" },
  { name: "Unisex Up and Down", category: "up", price: 50000, img: "images/up1.jpg" },
  { name: "Unisex Up and Down", category: "up", price: 50000, img: "images/up2.jpg" },

  { name: "Men Pam", category: "Pam", price: 28000, img: "images/pam1.jpg" },
  { name: "Men Pam", category: "Pam", price: 28000, img: "images/pam2.jpg" },
  { name: "Men Pam", category: "Pam", price: 29000, img: "images/pam3.jpg" },
  { name: "Men Shoe", category: "sea", price: 50000, img: "images/se1.jpg" },
  { name: "Men Shoe", category: "sea", price: 130000, img: "images/se2.jpg" },
  { name: "Men Designer Shirt", category: "shirt", price: 22000, img: "images/shi1.jpg" },
  { name: "Men Designer Shirt", category: "shirt", price: 22000, img: "images/shi2.jpg" },
];

// DOM Elements
const productContainer = document.querySelector(".product-container");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");

// Cart
let cart = [];

// Display Products
function displayProducts(list) {
  productContainer.innerHTML = "";
  list.forEach((prod, index) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${prod.img}" alt="${prod.name}">
      <h3>${prod.name}</h3>
      <p>₦${prod.price.toLocaleString()}</p>
      <button onclick="addToCart(${index})">Add to Cart</button>
    `;
    productContainer.appendChild(card);
  });
}

// Add to Cart
function addToCart(index) {
  cart.push(products[index]);
  alert(`${products[index].name} added to cart!`);
  renderCart();
}

// Filter Products
function filterProducts() {
  const searchVal = searchInput.value.toLowerCase();
  const categoryVal = categoryFilter.value;
  const filtered = products.filter(p => 
    p.name.toLowerCase().includes(searchVal) && (categoryVal ? p.category === categoryVal : true)
  );
  displayProducts(filtered);
}

// Cart Functions
function toggleCart() {
  document.getElementById("cartSidebar").classList.toggle("active");
  renderCart();
}
function renderCart() {
  const cartItemsDiv = document.getElementById("cartItems");
  const cartCount = document.getElementById("cartCount");
  const cartTotal = document.getElementById("cartTotal");

  cartItemsDiv.innerHTML = "";
  let total = 0;

  cart.forEach((item, i) => {
    total += item.price;
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <span>${item.name} - ₦${item.price.toLocaleString()}</span>
      <button onclick="removeFromCart(${i})">X</button>
    `;
    cartItemsDiv.appendChild(div);
  });

  cartCount.textContent = cart.length;
  cartTotal.textContent = total.toLocaleString();
}
function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
}
function checkout() {
  if (cart.length === 0) return alert("Cart is empty!");

  // Build cart message
  let message = "Hello, I want to place an order:\n\n";
  let total = 0;
  cart.forEach((item, i) => {
    message += `${i + 1}. ${item.name} - ₦${item.price.toLocaleString()}\n`;
    total += item.price;
  });
  message += `\nTotal: ₦${total.toLocaleString()}`;

  // Encode message for URL
  const encodedMessage = encodeURIComponent(message);

  const whatsappNumber = "2348103140192";

  window.open(`https://wa.me/${+2348103140192}?text=${encodedMessage}`, "_blank");

  // Clear cart
  cart = [];
  renderCart();
}


// Event Listeners
searchInput.addEventListener("input", filterProducts);
categoryFilter.addEventListener("change", filterProducts);

// Initial display
displayProducts(products);
