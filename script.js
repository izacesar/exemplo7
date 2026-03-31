const loginSection = document.getElementById("loginSection");
const appSection = document.getElementById("appSection");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const userNameDisplay = document.getElementById("userNameDisplay");
const productName = document.getElementById("productName");
const productPrice = document.getElementById("productPrice");
const addBtn = document.getElementById("addBtn");
const cartList = document.getElementById("cartList");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function app(user) {
  loginSection.classList.add("hidden");
  appSection.classList.remove("hidden");
  userNameDisplay.textContent = user;
}

function login() {
  loginSection.classList.remove("hidden");
  appSection.classList.add("hidden");
}

function carrinho() {
  cartList.innerHTML = "";

  cart.forEach((item, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      ${item.nome} - R$ ${item.preco}
      <button onclick="removeItem(${index})">X</button>
    `;

    cartList.appendChild(li);
  });
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
   carrinho();
}

window.onload = () => {
  const user = localStorage.getItem("user");

  if (user) {
    app(user);
  } else {
    login();
  }

   carrinho();
};

// LOGIN
loginBtn.onclick = () => {
  const username = usernameInput.value;
  const password = passwordInput.value;

  if (!username || !password) {
    alert("Preencha todos os campos!");
    return;
  }

  localStorage.setItem("user", username);
  app(username);
};

// LOGOUT
logoutBtn.onclick = () => {
  localStorage.removeItem("user");
  login();
};

addBtn.onclick = () => {
  const nome = productName.value;
  const preco = productPrice.value;

  if (!nome || !preco) {
    alert("Preencha os campos!");
    return;
  }

  cart.push({ nome, preco });
  localStorage.setItem("cart", JSON.stringify(cart));

  productName.value = "";
  productPrice.value = "";

   carrinho();
};

window.addEventListener("storage", (event) => {
  // LOGIN / LOGOUT
  if (event.key === "user") {
    const user = localStorage.getItem("user");

    if (user) {
      app(user);
    } else {
      login();
    }
  }

  // CARRINHO
  if (event.key === "cart") {
    cart = JSON.parse(localStorage.getItem("cart")) || [];
     carrinho();
  }
});