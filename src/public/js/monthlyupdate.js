document.getElementById('closeMonthlyBtn').addEventListener('click', function(event) {
  const bid = '649f1d1e487f581e1e53370d'; // ID de la caja actual
  
  Swal.fire({
    title: 'Confirmación',
    text: '¿Estás seguro de cerrar la caja mensual?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      const url = `http://localhost:8080/api/box/${bid}/monthly`;
      const method = 'PATCH';

      fetch(url, { method })
        .then(response => response.json())
        .then(data => {
          Swal.fire({
            title: 'Cierre de Caja Mensual',
            text: 'La caja mensual se cerró correctamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          }).then(() => {
            location.reload();
          });
        })
        .catch(error => {
          console.error(error);
          Swal.fire({
            title: 'Error',
            text: 'Hubo un error al cerrar la caja mensual.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        });
    }
  });
});
