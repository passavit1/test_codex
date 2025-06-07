document.addEventListener('DOMContentLoaded', () => {
  const cart = [];
  const list = document.getElementById('product-list');
  const cartCount = document.getElementById('cart-count');
  const cartDetails = document.getElementById('cart-details');
  const cartIcon = document.getElementById('cart');

  function renderCartDetails() {
    cartDetails.innerHTML = '<h2>Cart</h2>';
    if (cart.length === 0) {
      cartDetails.innerHTML += '<p>Your cart is empty</p>';
      return;
    }
    cart.forEach((item, index) => {
      const div = document.createElement('div');
      div.className = 'cart-item';
      div.innerHTML = `
        ${item.name} - $${item.price.toFixed(2)}
        <button class="delete-btn" data-index="${index}">Delete</button>
      `;
      cartDetails.appendChild(div);
    });
  }

  fetch('/api/products')
    .then(res => res.json())
    .then(products => {
      products.forEach(p => {
        const div = document.createElement('div');
        div.className = 'product';
        div.innerHTML = `
          <h3>${p.name}</h3>
          <p>$${p.price.toFixed(2)}</p>
          <button>Add to Cart</button>
        `;
        const btn = div.querySelector('button');
        btn.addEventListener('click', () => {
          cart.push(p);
          cartCount.textContent = cart.length;
          renderCartDetails();
          cartDetails.classList.remove('hidden');
        });
        list.appendChild(div);
      });
    });

  cartIcon.addEventListener('click', () => {
    cartDetails.classList.toggle('hidden');
  });

  cartDetails.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
      const idx = parseInt(e.target.dataset.index, 10);
      cart.splice(idx, 1);
      cartCount.textContent = cart.length;
      renderCartDetails();
    }
  });
});
