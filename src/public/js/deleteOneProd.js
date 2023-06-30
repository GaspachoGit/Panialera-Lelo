document.addEventListener('DOMContentLoaded', () => {
  const btnDelete = document.querySelectorAll('.btn-delete');

  btnDelete.forEach((btn) => {
    btn.addEventListener('click', (event) => {
      event.preventDefault();

      const productId = event.target.dataset.productId;

      const url = `http://localhost:8080/api/products/${productId}`;

      // Mostrar alerta de confirmación
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción eliminará el producto',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          fetch(url, {
            method: 'DELETE'
          })
            .then(response => {
              if (!response.ok) {
                throw new Error('Error al eliminar el producto');
              }
              // Producto eliminado correctamente
              Swal.fire('¡Eliminado!', 'El producto ha sido eliminado.', 'success')
                .then(() => {
                  // Actualizar la página
                  location.reload();
                });
            })
            .catch(error => {
              console.error(error);
              Swal.fire('Error', 'Se produjo un error al eliminar el producto.', 'error');
            });
        }
      });
    });
  });
});

