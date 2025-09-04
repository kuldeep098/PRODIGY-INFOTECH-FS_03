// Sample Products
const products = [
  { id: 1, name: "T-Shirt", price: 500 },
  { id: 2, name: "Jeans", price: 1200 },
  { id: 3, name: "Shoes", price: 2000 },
  { id: 4, name: "Watch", price: 1500 },
  { id: 5, name: "Shirts", price:1000},
  { id: 6, name:"Slippers",price:1300}
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Load Products
function loadProducts() {
  const productList = document.getElementById("productList");
  productList.innerHTML = "";

  products.forEach(p => {
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
      <h3>${p.name}</h3>
      <p>Price: ₹${p.price}</p>
      <button onclick="addToCart(${p.id}, '${p.name}', ${p.price})">Add to Cart</button>
    `;
    productList.appendChild(div);
  });
}

// Add to Cart
function addToCart(id, name, price) {
  cart.push({ id, name, price });
  updateCart();
}

// Render Cart
function renderCart() {
  const cartItems = document.getElementById("cartItems");
  const totalPrice = document.getElementById("totalPrice");

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    const li = document.createElement("li");
    li.textContent = `${item.name} - ₹${item.price}`;
    li.innerHTML += ` <button onclick="removeFromCart(${index})">❌</button>`;
    cartItems.appendChild(li);
  });

  totalPrice.textContent = total;
  document.getElementById("cartCount").textContent = cart.length;
  localStorage.setItem("cart", JSON.stringify(cart));
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

function updateCart() {
  renderCart();
}

function toggleCart() {
  document.getElementById("cartSection").classList.toggle("hidden");
}

function checkout() {
  if (cart.length === 0) {
    alert("Cart is empty!");
    return;
  }
  alert("✅ Order placed successfully!");
  cart = [];
  updateCart();
}

// Init
loadProducts();
updateCart();
