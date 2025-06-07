document.addEventListener('DOMContentLoaded', () => {
  const cart = [];
  const list = document.getElementById('product-list');
  const cartCount = document.getElementById('cart-count');
  const cartDetails = document.getElementById('cart-details');
  const cartIcon = document.getElementById('cart');

  function renderCartDetails() {
    cartDetails.innerHTML = '<h2>Cart</h2>';
    cart.forEach(item => {
      const div = document.createElement('div');
      div.textContent = `${item.name} - $${item.price.toFixed(2)}`;
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
});
