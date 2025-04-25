document.addEventListener("DOMContentLoaded", () => {
    const productList = document.getElementById("product-list");
  
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const products = await res.json();
  
        products.forEach(product => {
          const card = document.createElement("div");
          card.className = "bg-white p-4 rounded shadow";
  
          card.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="h-40 mx-auto mb-2 object-contain">
            <h4 class="font-bold text-lg">${product.title}</h4>
            <p class="text-sm">${product.description.substring(0, 100)}...</p>
            <p class="text-blue-600 font-bold mt-2">$${product.price}</p>
            <button class="add-to-cart bg-green-500 text-white px-4 py-2 mt-2 rounded" data-id="${product.id}">Add to Cart</button>
          `;
  
          productList.appendChild(card);
        });
  
        setupAddToCart();
      } catch (error) {
        console.error("Error loading products:", error);
      }
    };
  
    const cart = [];
  
    function setupAddToCart() {
      const buttons = document.querySelectorAll(".add-to-cart");
      buttons.forEach(btn => {
        btn.addEventListener("click", () => {
          const id = btn.getAttribute("data-id");
          const product = cart.find(p => p.id == id);
          if (product) {
            product.qty += 1;
          } else {
            cart.push({ id, qty: 1 });
          }
          alert("Item added to cart!");
        });
      });
    }
  
    document.getElementById("view-cart").addEventListener("click", () => {
      let summary = "🛒 Cart Summary:\n";
      cart.forEach(item => {
        summary += `Product ID: ${item.id}, Qty: ${item.qty}\n`;
      });
      alert(summary || "Cart is empty");
    });
  
    fetchProducts();
  });
  