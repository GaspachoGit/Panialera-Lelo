const btnDelete = document.querySelectorAll('.btn-add-to-cart');

btnDelete.forEach((btn) => {
  btn.addEventListener('click', (event) => {
    event.preventDefault();

    const productId = event.target.dataset.productId;

    const url = `http://localhost:8080/api/products/${productId}`;

    fetch(url, {
      method: 'DELETE'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al eliminar el producto');
        }
        console.log('Producto eliminado');
      })
      .catch(error => {
        console.error(error);
      });
  });
});