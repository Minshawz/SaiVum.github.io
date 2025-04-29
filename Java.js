let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(el) {
  const card = el.closest(".card");
  if (!card) return;

  const name = card.querySelector("h1")?.innerText || "Unnamed Item"; 
  const image = card.querySelector("img")?.src || "";
  const description = card.querySelector("p#extra")?.innerText || "";

  const item = { name, image, description };
  cart.push(item);

  localStorage.setItem("cart", JSON.stringify(cart)); 

  const cartMessageDiv = document.createElement("div");
  cartMessageDiv.style.position = "fixed";
  cartMessageDiv.style.top = "20px";   
  cartMessageDiv.style.right = "20px"; 
  cartMessageDiv.style.zIndex = "1000";
  cartMessageDiv.style.width = "clamp(152px, 28dvw, 320px)";  
  cartMessageDiv.style.height = "clamp(57px, 10.5dvw, 120px)";   // kai was here (●'◡'●)👍
  cartMessageDiv.style.backgroundImage = "url('popout.png')";
  cartMessageDiv.style.backgroundSize = "cover"; 
  cartMessageDiv.style.backgroundRepeat = "no-repeat";
  cartMessageDiv.style.backgroundPosition = "center";
  cartMessageDiv.style.borderRadius = "0";
  cartMessageDiv.style.backgroundColor = "transparent";

  document.body.appendChild(cartMessageDiv);

  setTimeout(() => {
    cartMessageDiv.remove();
  }, 3000);
}

function renderCart() {
  const cartDisplay = document.getElementById("cart-display");
  const priceSection = document.getElementById("price-breakdown");
  if (!cartDisplay || !priceSection) return;

  cartDisplay.innerHTML = "";
  priceSection.innerHTML = "";

  if (cart.length === 0) {
    cartDisplay.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  let totalCost = 0;

  cart.forEach(item => {
    const priceMatch = item.description.match(/\$([\d\.]+)/);
    if (priceMatch) {
      totalCost += parseFloat(priceMatch[1]);
    }
  });

  priceSection.innerHTML = `<h2>Total: $${totalCost.toFixed(2)}</h2>`;

  const list = document.createElement("ul");

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <img src="${item.image}" style="width:30px;height:30px;"> 
      <strong>${item.name}</strong> 
      <p>${item.description}</p>
      <button onclick="removeFromCart(${index})" style="
        
      " 
      
      >Remove</button>
    `; //background-color: #ff4d4d;
       // color: white;
       // border: none;
       // padding: 8px 16px;
       // margin-top: 5px;
       // border-radius: 6px; 
       // cursor: pointer;
       // font-size: 14px;
        //transition: background-color 0.3s;
        
        //onmouseover="this.style.backgroundColor='#e60000'" 
      //onmouseout="this.style.backgroundColor='#ff4d4d'"
      
    list.appendChild(li);
  });

  cartDisplay.appendChild(list);
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart)); 
  renderCart();
}

document.addEventListener("DOMContentLoaded", () => {
  renderCart();
});

