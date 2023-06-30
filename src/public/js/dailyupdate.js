document.getElementById('closeDailyBtn').addEventListener('click', function(event) {
  const bid = '649f1d1e487f581e1e53370d'; // ID de la caja actual
  const url = `http://localhost:8080/api/box/${bid}/daily`;
  const method = 'PATCH';
  
  Swal.fire({
    title: 'Cerrar caja',
    text: '¿Estás seguro de cerrar la caja?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, cerrar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(url, { method })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          Swal.fire('Caja cerrada', 'La caja ha sido cerrada exitosamente', 'success').then(() => {
            location.reload();
          });
        })
        .catch(error => {
          console.error(error);
          Swal.fire('Error', 'Ocurrió un error al cerrar la caja', 'error');
        });
    }
  });
});
