document.addEventListener('DOMContentLoaded', () => {
  fetch('/api/products')
    .then(res => res.json())
    .then(products => {
      const list = document.getElementById('product-list');
      products.forEach(p => {
        const div = document.createElement('div');
        div.className = 'product';
        div.innerHTML = `
          <h3>${p.name}</h3>
          <p>$${p.price.toFixed(2)}</p>
          <button>Add to Cart</button>
        `;
        list.appendChild(div);
      });
    });
});
