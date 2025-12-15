   const products = [
  { id: 1, name: "Food Package", price: 20, img: "img/food.jpg" },
  { id: 2, name: "Clean Water", price: 15, img: "img/water.jpg" },
  { id: 3, name: "School Supplies", price: 25, img: "img/school.jpg" },
  { id: 4, name: "Medical Aid", price: 30, img: "img/medical.jpg" },
  { id: 5, name: "Warm Blanket", price: 18, img: "img/blanket.jpg" },
  { id: 6, name: "Hygiene Kit", price: 12, img: "img/hygiene.jpg" },
  { id: 7, name: "Emergency Shelter", price: 40, img: "img/shelter.jpg" },
  { id: 8, name: "Child Nutrition", price: 22, img: "img/nutrition.jpg" },
  { id: 9, name: "Disaster Relief", price: 35, img: "img/disaster.jpg" },
  { id: 10, name: "Education Support", price: 50, img: "img/education.jpg" }
];


let cart = [];

const gallery = document.getElementById("productGallery");
const cartList = document.getElementById("cartList");
const cartCount = document.getElementById("cartCount");
const checkoutBtn = document.getElementById("checkoutBtn");

products.forEach(p => {
  gallery.innerHTML += `
    <div class="col-md-4 mb-4">
      <div class="card text-center">
       <img src="${p.img}">
        <div class="card-body">
          <h5>${p.name}</h5>
          <p>$${p.price}</p>
          <button class="btn btn-outline-primary" onclick="addToCart(${p.id})">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  `;
});

function addToCart(id) {
  cart.push(products.find(p => p.id === id));
  updateCart();
}

function updateCart() {
  cartList.innerHTML = "";
  cart.forEach(item => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.innerHTML = `
      <span class="cart-name">${item.name}</span>
      <span class="cart-price">$${item.price}</span>
    `;
    cartList.appendChild(li);
  });
  cartCount.textContent = cart.length;
  checkoutBtn.disabled = cart.length === 0;
}

checkoutBtn.onclick = () => {
  document.getElementById("checkoutSection").classList.remove("d-none");
};

document.getElementById("checkoutForm").onsubmit = e => {
  e.preventDefault();

  const phone = document.getElementById("phone").value;
  const zip = document.getElementById("zip").value;

  if (isNaN(phone) || zip.length > 6) {
    alert("Invalid phone number or ZIP code");
    return;
  }

  let total = cart.reduce((sum, i) => sum + i.price, 0);
  let discount = cart.length >= 3 ? total * 0.1 : 0;
  let finalTotal = total - discount;

  document.getElementById("confirmationText").innerHTML = `
    Items: ${cart.length}<br>
    Total: $${total.toFixed(2)}<br>
    Discount: $${discount.toFixed(2)}<br>
    <strong>Final Amount: $${finalTotal.toFixed(2)}</strong>
  `;

  new bootstrap.Modal(document.getElementById("confirmationModal")).show();
};
